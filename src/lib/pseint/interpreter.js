const DEFAULT_LIMITS = Object.freeze({
  maxSteps: 50_000,
});

function normalizeKeyword(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

/** Quita comentarios // de una línea (respeta cadenas entre comillas dobles). Usado por el intérprete para ignorar comentarios. */
function stripInlineComment(line) {
  let inString = false;
  for (let i = 0; i < line.length - 1; i++) {
    const ch = line[i];
    if (ch === '"') inString = !inString;
    if (!inString && line[i] === '/' && line[i + 1] === '/') {
      return line.slice(0, i).trimEnd();
    }
  }
  return line;
}

function splitTopLevelCommas(s) {
  const parts = [];
  let cur = '';
  let depth = 0;
  let inString = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"') {
      inString = !inString;
      cur += ch;
      continue;
    }
    if (!inString) {
      if (ch === '(') depth++;
      else if (ch === ')') depth = Math.max(0, depth - 1);
      else if (ch === ',' && depth === 0) {
        parts.push(cur.trim());
        cur = '';
        continue;
      }
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

function tokenizeExpr(expr) {
  const tokens = [];
  const s = expr.trim();
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === '"') {
      let j = i + 1;
      let str = '';
      while (j < s.length) {
        const cj = s[j];
        if (cj === '"') break;
        str += cj;
        j++;
      }
      if (j >= s.length) throw new Error('Cadena sin cerrar (")');
      tokens.push({ type: 'string', value: str });
      i = j + 1;
      continue;
    }

    const two = s.slice(i, i + 2);
    if (two === '<=' || two === '>=' || two === '<>') {
      tokens.push({ type: 'op', value: two });
      i += 2;
      continue;
    }

    if ('()+-*/^=<>' .includes(ch)) {
      if (ch === '(' || ch === ')') tokens.push({ type: 'paren', value: ch });
      else tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }

    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s[i + 1] ?? ''))) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const num = Number(s.slice(i, j));
      if (Number.isNaN(num)) throw new Error(`Número inválido: ${s.slice(i, j)}`);
      tokens.push({ type: 'number', value: num });
      i = j;
      continue;
    }

    if (/[A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ]/.test(ch)) {
      let j = i + 1;
      while (j < s.length && /[A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]/.test(s[j])) j++;
      const raw = s.slice(i, j);
      const kw = normalizeKeyword(raw);
      if (kw === 'Y' || kw === 'O' || kw === 'NO') {
        tokens.push({ type: 'op', value: kw });
      } else if (kw === 'VERDADERO' || kw === 'FALSO') {
        tokens.push({ type: 'bool', value: kw === 'VERDADERO' });
      } else {
        tokens.push({ type: 'ident', value: raw });
      }
      i = j;
      continue;
    }

    throw new Error(`Carácter inesperado en expresión: ${JSON.stringify(ch)}`);
  }
  return tokens;
}

const OP_INFO = Object.freeze({
  // precedence: higher binds tighter
  NO: { prec: 5, assoc: 'right', arity: 1 },
  'u-': { prec: 5, assoc: 'right', arity: 1 },
  '^': { prec: 4, assoc: 'right', arity: 2 },
  '*': { prec: 3, assoc: 'left', arity: 2 },
  '/': { prec: 3, assoc: 'left', arity: 2 },
  '+': { prec: 2, assoc: 'left', arity: 2 },
  '-': { prec: 2, assoc: 'left', arity: 2 },
  '=': { prec: 1, assoc: 'left', arity: 2 },
  '<>': { prec: 1, assoc: 'left', arity: 2 },
  '<': { prec: 1, assoc: 'left', arity: 2 },
  '>': { prec: 1, assoc: 'left', arity: 2 },
  '<=': { prec: 1, assoc: 'left', arity: 2 },
  '>=': { prec: 1, assoc: 'left', arity: 2 },
  Y: { prec: 0, assoc: 'left', arity: 2 },
  O: { prec: 0, assoc: 'left', arity: 2 },
});

function toRpn(tokens) {
  const output = [];
  const ops = [];

  let prev = null;
  for (const t of tokens) {
    if (t.type === 'number' || t.type === 'string' || t.type === 'bool' || t.type === 'ident') {
      output.push(t);
      prev = t;
      continue;
    }

    if (t.type === 'paren') {
      if (t.value === '(') ops.push(t);
      else {
        while (ops.length && ops[ops.length - 1].type !== 'paren') output.push(ops.pop());
        if (!ops.length) throw new Error('Paréntesis desbalanceados');
        ops.pop(); // remove '('
      }
      prev = t;
      continue;
    }

    if (t.type === 'op') {
      let op = t.value;
      // unary minus
      if (op === '-' && (!prev || (prev.type === 'op') || (prev.type === 'paren' && prev.value === '('))) {
        op = 'u-';
      }
      if (!OP_INFO[op]) throw new Error(`Operador no soportado: ${op}`);
      const cur = { type: 'op', value: op };

      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top.type !== 'op') break;
        const a = OP_INFO[cur.value];
        const b = OP_INFO[top.value];
        const shouldPop =
          (a.assoc === 'left' && a.prec <= b.prec) ||
          (a.assoc === 'right' && a.prec < b.prec);
        if (!shouldPop) break;
        output.push(ops.pop());
      }
      ops.push(cur);
      prev = cur;
      continue;
    }

    throw new Error(`Token inesperado: ${t.type}`);
  }

  while (ops.length) {
    const top = ops.pop();
    if (top.type === 'paren') throw new Error('Paréntesis desbalanceados');
    output.push(top);
  }
  return output;
}

function asNumber(v) {
  const n = typeof v === 'number' ? v : Number(v);
  if (Number.isNaN(n)) throw new Error(`No se puede convertir a número: ${JSON.stringify(v)}`);
  return n;
}

function evalRpn(rpn, ctx) {
  const stack = [];
  for (const t of rpn) {
    if (t.type === 'number' || t.type === 'string' || t.type === 'bool') {
      stack.push(t.value);
      continue;
    }
    if (t.type === 'ident') {
      const key = t.value;
      if (!Object.prototype.hasOwnProperty.call(ctx.vars, key)) {
        throw new Error(`Variable no definida: ${key}`);
      }
      stack.push(ctx.vars[key]);
      continue;
    }
    if (t.type === 'op') {
      const info = OP_INFO[t.value];
      if (!info) throw new Error(`Operador no soportado: ${t.value}`);
      if (stack.length < info.arity) throw new Error('Expresión inválida');

      if (info.arity === 1) {
        const a = stack.pop();
        if (t.value === 'NO') stack.push(!Boolean(a));
        else if (t.value === 'u-') stack.push(-asNumber(a));
        else throw new Error(`Operador unario no soportado: ${t.value}`);
        continue;
      }

      const b = stack.pop();
      const a = stack.pop();

      switch (t.value) {
        case '+': {
          if (typeof a === 'string' || typeof b === 'string') stack.push(String(a) + String(b));
          else stack.push(asNumber(a) + asNumber(b));
          break;
        }
        case '-':
          stack.push(asNumber(a) - asNumber(b));
          break;
        case '*':
          stack.push(asNumber(a) * asNumber(b));
          break;
        case '/':
          stack.push(asNumber(a) / asNumber(b));
          break;
        case '^':
          stack.push(Math.pow(asNumber(a), asNumber(b)));
          break;
        case '=':
          stack.push(a === b);
          break;
        case '<>':
          stack.push(a !== b);
          break;
        case '<':
          stack.push(asNumber(a) < asNumber(b));
          break;
        case '>':
          stack.push(asNumber(a) > asNumber(b));
          break;
        case '<=':
          stack.push(asNumber(a) <= asNumber(b));
          break;
        case '>=':
          stack.push(asNumber(a) >= asNumber(b));
          break;
        case 'Y':
          stack.push(Boolean(a) && Boolean(b));
          break;
        case 'O':
          stack.push(Boolean(a) || Boolean(b));
          break;
        default:
          throw new Error(`Operador no soportado: ${t.value}`);
      }
      continue;
    }
    throw new Error(`Token inesperado: ${t.type}`);
  }
  if (stack.length !== 1) throw new Error('Expresión inválida');
  return stack[0];
}

function parseLineStatement(rawLine, lineNo) {
  const line = rawLine.trim();
  if (!line) return null;

  const kw = normalizeKeyword(line.split(/\s+/)[0]);

  if (kw === 'ALGORITMO' || kw === 'FINALGORITMO') return { type: 'noop', lineNo };

  // Definir x Como Entero;
  if (kw === 'DEFINIR') {
    const m = line.match(/^Definir\s+([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s+Como\s+([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ]+)\s*;?$/i);
    if (!m) throw new Error(`Sintaxis inválida de Definir (línea ${lineNo})`);
    return { type: 'declare', name: m[1], varType: normalizeKeyword(m[2]), lineNo };
  }

  // Leer x;
  if (kw === 'LEER') {
    const m = line.match(/^Leer\s+([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*;?$/i);
    if (!m) throw new Error(`Sintaxis inválida de Leer (línea ${lineNo})`);
    return { type: 'read', name: m[1], lineNo };
  }

  // Escribir "Hola", x;
  if (kw === 'ESCRIBIR') {
    const rest = line.replace(/^Escribir\s+/i, '').replace(/;?\s*$/, '');
    const parts = splitTopLevelCommas(rest).filter(Boolean);
    if (!parts.length) throw new Error(`Escribir sin argumentos (línea ${lineNo})`);
    return { type: 'write', parts, lineNo };
  }

  // assignment: a <- expr;
  // a <- expr;
  let assign = line.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*<-\s*(.+?)\s*;?$/);
  if (assign) return { type: 'assign', name: assign[1], expr: assign[2], lineNo };

  // a = expr; (conveniencia para el simulador)
  assign = line.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*=\s*(.+?)\s*;?$/);
  if (assign) return { type: 'assign', name: assign[1], expr: assign[2], lineNo };

  throw new Error(`Instrucción no soportada (línea ${lineNo}): ${rawLine}`);
}

function parseBlock(lines, startIdx, endKeywordSet) {
  const body = [];
  let i = startIdx;
  while (i < lines.length) {
    const { text, lineNo } = lines[i];
    const trimmed = text.trim();
    const first = normalizeKeyword(trimmed.split(/\s+/)[0] ?? '');

    if (endKeywordSet.has(first)) {
      return { body, nextIdx: i, endKeyword: first };
    }

    if (!trimmed) {
      i++;
      continue;
    }

    const kw = first;
    if (kw === 'SI') {
      const m = trimmed.match(/^Si\s+(.+?)\s+Entonces\s*$/i);
      if (!m) throw new Error(`Sintaxis inválida de Si (línea ${lineNo})`);
      const thenPart = parseBlock(lines, i + 1, new Set(['SINO', 'FINSI']));
      let elseBody = [];
      let nextIdx = thenPart.nextIdx;
      if (thenPart.endKeyword === 'SINO') {
        const elsePart = parseBlock(lines, nextIdx + 1, new Set(['FINSI']));
        elseBody = elsePart.body;
        nextIdx = elsePart.nextIdx;
      }
      // consume FINSI
      if (normalizeKeyword(lines[nextIdx].text.trim().split(/\s+/)[0] ?? '') !== 'FINSI') {
        throw new Error(`Falta FinSi (cerca de línea ${lineNo})`);
      }
      body.push({ type: 'if', cond: m[1], thenBody: thenPart.body, elseBody, lineNo });
      i = nextIdx + 1;
      continue;
    }

    if (kw === 'MIENTRAS') {
      const m = trimmed.match(/^Mientras\s+(.+?)\s+Hacer\s*$/i);
      if (!m) throw new Error(`Sintaxis inválida de Mientras (línea ${lineNo})`);
      const inner = parseBlock(lines, i + 1, new Set(['FINMIENTRAS']));
      // consume FINMIENTRAS
      body.push({ type: 'while', cond: m[1], body: inner.body, lineNo });
      i = inner.nextIdx + 1;
      continue;
    }

    if (kw === 'FINMIENTRAS' || kw === 'FINSI' || kw === 'SINO') {
      return { body, nextIdx: i, endKeyword: kw };
    }

    const stmt = parseLineStatement(trimmed, lineNo);
    if (stmt && stmt.type !== 'noop') body.push(stmt);
    i++;
  }

  return { body, nextIdx: i, endKeyword: null };
}

function defaultValueForType(varType) {
  switch (varType) {
    case 'ENTERO':
      return 0;
    case 'REAL':
      return 0;
    case 'LOGICO':
      return false;
    case 'CARACTER':
      return '';
    default:
      return null;
  }
}

function coerceInputToType(raw, varType) {
  const s = String(raw ?? '');
  switch (varType) {
    case 'ENTERO': {
      const n = parseInt(s, 10);
      if (Number.isNaN(n)) throw new Error(`Entrada inválida para Entero: ${JSON.stringify(s)}`);
      return n;
    }
    case 'REAL': {
      const n = Number(s.replace(',', '.'));
      if (Number.isNaN(n)) throw new Error(`Entrada inválida para Real: ${JSON.stringify(s)}`);
      return n;
    }
    case 'LOGICO': {
      const k = normalizeKeyword(s.trim());
      if (k === 'VERDADERO') return true;
      if (k === 'FALSO') return false;
      throw new Error(`Entrada inválida para Logico (usa Verdadero/Falso): ${JSON.stringify(s)}`);
    }
    case 'CARACTER':
    default:
      return s;
  }
}

function makeEvalExpr(ctx) {
  return (expr, lineNo) => {
    try {
      const tokens = tokenizeExpr(expr);
      const rpn = toRpn(tokens);
      return evalRpn(rpn, ctx);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(`Error en expresión (línea ${lineNo}): ${msg}`);
    }
  };
}

async function execStatements(stmts, ctx) {
  for (const st of stmts) {
    ctx.steps++;
    if (ctx.steps > ctx.limits.maxSteps) throw new Error(`Límite de pasos excedido (${ctx.limits.maxSteps}). ¿Bucle infinito?`);

    switch (st.type) {
      case 'declare': {
        ctx.types[st.name] = st.varType;
        if (!Object.prototype.hasOwnProperty.call(ctx.vars, st.name)) {
          ctx.vars[st.name] = defaultValueForType(st.varType);
        }
        break;
      }
      case 'assign': {
        if (!Object.prototype.hasOwnProperty.call(ctx.vars, st.name)) {
          throw new Error(`Asignación a variable no definida: ${st.name} (línea ${st.lineNo})`);
        }
        const val = ctx.evalExpr(st.expr, st.lineNo);
        ctx.vars[st.name] = val;
        break;
      }
      case 'write': {
        const out = st.parts
          .map((p) => {
            const pt = p.trim();
            if (pt.startsWith('"') && pt.endsWith('"') && pt.length >= 2) return pt.slice(1, -1);
            const v = ctx.evalExpr(pt, st.lineNo);
            return typeof v === 'boolean' ? (v ? 'Verdadero' : 'Falso') : String(v);
          })
          .join('');
        ctx.onOutput(out);
        break;
      }
      case 'read': {
        if (!Object.prototype.hasOwnProperty.call(ctx.vars, st.name)) {
          throw new Error(`Leer a variable no definida: ${st.name} (línea ${st.lineNo})`);
        }
        const t = ctx.types[st.name] ?? 'CARACTER';
        const raw = await ctx.onInput(`Ingrese ${st.name}:`);
        ctx.vars[st.name] = coerceInputToType(raw, t);
        break;
      }
      case 'if': {
        const condVal = Boolean(ctx.evalExpr(st.cond, st.lineNo));
        if (condVal) await execStatements(st.thenBody, ctx);
        else await execStatements(st.elseBody, ctx);
        break;
      }
      case 'while': {
        while (Boolean(ctx.evalExpr(st.cond, st.lineNo))) {
          ctx.steps++;
          if (ctx.steps > ctx.limits.maxSteps) throw new Error(`Límite de pasos excedido (${ctx.limits.maxSteps}). ¿Bucle infinito?`);
          await execStatements(st.body, ctx);
        }
        break;
      }
      default:
        throw new Error(`Nodo no soportado: ${st.type}`);
    }
  }
}

function buildProgram(code) {
  const rawLines = String(code ?? '').replace(/\r\n/g, '\n').split('\n');
  const lines = rawLines.map((l, idx) => ({ text: stripInlineComment(l), lineNo: idx + 1 }));
  const parsed = parseBlock(lines, 0, new Set());
  return parsed.body;
}

/**
 * Ejecuta un subset de PSeInt en JS (modo simulador).
 *
 * Soporta:
 * - Comentarios con // (línea completa o al final de una instrucción)
 * - Definir x Como Entero/Real/Logico/Caracter;
 * - Asignación: x = expr;
 * - Leer x;
 * - Escribir ...;
 * - Si ... Entonces / Sino / FinSi
 * - Mientras ... Hacer / FinMientras
 *
 * @param {string} code
 * @param {{
 *  stdinLines?: string[],
 *  onOutput?: (line: string) => void,
 *  onInput?: (promptText: string) => Promise<string>,
 *  limits?: { maxSteps?: number }
 * }} [opts]
 */
export async function runPSeInt(code, opts = {}) {
  const program = buildProgram(code);
  const stdin = Array.isArray(opts.stdinLines) ? [...opts.stdinLines] : [];
  const onOutput = typeof opts.onOutput === 'function' ? opts.onOutput : () => {};

  const onInput =
    typeof opts.onInput === 'function'
      ? opts.onInput
      : async (promptText) => {
          const v = globalThis.prompt ? globalThis.prompt(promptText) : null;
          return v ?? '';
        };

  const limits = { ...DEFAULT_LIMITS, ...(opts.limits ?? {}) };

  const ctx = {
    vars: Object.create(null),
    types: Object.create(null),
    steps: 0,
    limits,
    onOutput,
    onInput: async (promptText) => {
      if (stdin.length) return stdin.shift();
      return onInput(promptText);
    },
  };
  ctx.evalExpr = makeEvalExpr(ctx);

  // pre-scan variables to allow "Definir" to initialize and assignments to validate
  for (const st of program) {
    if (st.type === 'declare') {
      ctx.types[st.name] = st.varType;
      ctx.vars[st.name] = defaultValueForType(st.varType);
    }
  }

  await execStatements(program, ctx);

  return { vars: { ...ctx.vars } };
}

/**
 * Crea un runner "pausable" para simular PSeInt:
 * - Se detiene en cada `Leer` esperando `provideInput(...)`
 * - Permite "Paso" (step) y "Continuar" (run hasta input o fin)
 *
 * @param {string} code
 * @param {{
 *  onOutput?: (line: string) => void,
 *  limits?: { maxSteps?: number }
 * }} [opts]
 */
export function createPSeIntRunner(code, opts = {}) {
  const program = buildProgram(code);
  const onOutput = typeof opts.onOutput === 'function' ? opts.onOutput : () => {};
  const limits = { ...DEFAULT_LIMITS, ...(opts.limits ?? {}) };

  const ctx = {
    vars: Object.create(null),
    types: Object.create(null),
    steps: 0,
    limits,
    onOutput,
    evalExpr: null,
  };
  ctx.evalExpr = makeEvalExpr(ctx);

  // Inicializa variables declaradas (igual que PSeInt: existen tras Definir)
  for (const st of program) {
    if (st.type === 'declare') {
      ctx.types[st.name] = st.varType;
      ctx.vars[st.name] = defaultValueForType(st.varType);
    }
  }

  const stack = [{ kind: 'block', stmts: program, ip: 0 }];
  let waiting = null; // { name, varType, lineNo }

  function bumpSteps() {
    ctx.steps++;
    if (ctx.steps > ctx.limits.maxSteps) {
      throw new Error(`Límite de pasos excedido (${ctx.limits.maxSteps}). ¿Bucle infinito?`);
    }
  }

  function currentLocation() {
    if (waiting) return { lineNo: waiting.lineNo };
    for (let i = stack.length - 1; i >= 0; i--) {
      const f = stack[i];
      if (f.kind === 'block') {
        const st = f.stmts[Math.max(0, f.ip - 1)];
        if (st?.lineNo) return { lineNo: st.lineNo };
      } else if (f.kind === 'while') {
        return { lineNo: f.node.lineNo };
      }
    }
    return { lineNo: null };
  }

  function stepInternal() {
    if (waiting) {
      return { status: 'need_input', ...waiting, prompt: `Ingrese ${waiting.name}:` };
    }

    while (stack.length) {
      const top = stack[stack.length - 1];

      // While controller frame
      if (top.kind === 'while') {
        bumpSteps();
        const condVal = Boolean(ctx.evalExpr(top.node.cond, top.node.lineNo));
        if (!condVal) {
          stack.pop();
          return { status: 'stepped', kind: 'while_end', lineNo: top.node.lineNo };
        }
        // ejecutar cuerpo: al terminar volveremos aquí para re-chequear
        stack.push({ kind: 'block', stmts: top.node.body, ip: 0 });
        return { status: 'stepped', kind: 'while_check', lineNo: top.node.lineNo };
      }

      // Block frame
      if (top.ip >= top.stmts.length) {
        stack.pop();
        continue;
      }

      const st = top.stmts[top.ip];
      top.ip++;

      bumpSteps();

      switch (st.type) {
        case 'declare': {
          ctx.types[st.name] = st.varType;
          if (!Object.prototype.hasOwnProperty.call(ctx.vars, st.name)) {
            ctx.vars[st.name] = defaultValueForType(st.varType);
          }
          return { status: 'stepped', kind: 'declare', lineNo: st.lineNo };
        }
        case 'assign': {
          if (!Object.prototype.hasOwnProperty.call(ctx.vars, st.name)) {
            throw new Error(`Asignación a variable no definida: ${st.name} (línea ${st.lineNo})`);
          }
          ctx.vars[st.name] = ctx.evalExpr(st.expr, st.lineNo);
          return { status: 'stepped', kind: 'assign', lineNo: st.lineNo };
        }
        case 'write': {
          const out = st.parts
            .map((p) => {
              const pt = p.trim();
              if (pt.startsWith('"') && pt.endsWith('"') && pt.length >= 2) return pt.slice(1, -1);
              const v = ctx.evalExpr(pt, st.lineNo);
              return typeof v === 'boolean' ? (v ? 'Verdadero' : 'Falso') : String(v);
            })
            .join('');
          ctx.onOutput(out);
          return { status: 'stepped', kind: 'write', lineNo: st.lineNo };
        }
        case 'read': {
          if (!Object.prototype.hasOwnProperty.call(ctx.vars, st.name)) {
            throw new Error(`Leer a variable no definida: ${st.name} (línea ${st.lineNo})`);
          }
          const t = ctx.types[st.name] ?? 'CARACTER';
          waiting = { name: st.name, varType: t, lineNo: st.lineNo };
          return { status: 'need_input', ...waiting, prompt: `Ingrese ${st.name}:` };
        }
        case 'if': {
          const condVal = Boolean(ctx.evalExpr(st.cond, st.lineNo));
          stack.push({ kind: 'block', stmts: condVal ? st.thenBody : st.elseBody, ip: 0 });
          return { status: 'stepped', kind: 'if', lineNo: st.lineNo };
        }
        case 'while': {
          // control frame that re-checks each time
          stack.push({ kind: 'while', node: st });
          return { status: 'stepped', kind: 'while_start', lineNo: st.lineNo };
        }
        default:
          throw new Error(`Nodo no soportado: ${st.type}`);
      }
    }

    return { status: 'done', lineNo: currentLocation().lineNo };
  }

  function provideInput(raw) {
    if (!waiting) throw new Error('No hay una lectura (Leer) esperando entrada.');
    const { name, varType, lineNo } = waiting;
    ctx.vars[name] = coerceInputToType(raw, varType);
    waiting = null;
    return { status: 'input_applied', name, lineNo };
  }

  async function runUntilPause() {
    while (true) {
      const r = stepInternal();
      if (r.status === 'need_input' || r.status === 'done') return r;
      // sigue
      await Promise.resolve();
    }
  }

  return {
    step: () => stepInternal(),
    run: () => runUntilPause(),
    provideInput,
    getVars: () => ({ ...ctx.vars }),
    getLocation: () => currentLocation(),
  };
}

