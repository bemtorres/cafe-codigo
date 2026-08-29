const DEFAULT_LIMITS = Object.freeze({
  maxSteps: 100_000,
});

function normalizeKeyword(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();
}

function normalizeVarName(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/** Quita comentarios // y /* ... *\/ respetando cadenas entre comillas */
function stripComments(code) {
  let result = '';
  let inString = false;
  let inBlockComment = false;
  const s = String(code ?? '');

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const next = s[i + 1];

    if (inBlockComment) {
      if (ch === '*' && next === '/') {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      result += ch;
      if (ch === '"' || ch === "'") {
        inString = false;
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      result += ch;
      continue;
    }

    if (ch === '/' && next === '*') {
      inBlockComment = true;
      i++;
      continue;
    }

    if (ch === '/' && next === '/') {
      // comentario de línea: saltar hasta el salto de línea
      while (i < s.length && s[i] !== '\n') {
        i++;
      }
      if (i < s.length) result += '\n';
      continue;
    }

    result += ch;
  }
  return result;
}

function splitTopLevelCommas(s) {
  const parts = [];
  let cur = '';
  let depth = 0;
  let inString = false;
  let strChar = '';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inString) {
      cur += ch;
      if (ch === strChar) inString = false;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      strChar = ch;
      cur += ch;
      continue;
    }

    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1);
    else if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

// ─────────────────────────────────────────────────────────────
// PARSER Y EVALUADOR DE EXPRESIONES
// ─────────────────────────────────────────────────────────────

function tokenizeExpr(expr) {
  const tokens = [];
  const s = String(expr ?? '').trim();
  let i = 0;

  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Cadenas con comillas dobles o simples
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      let str = '';
      while (j < s.length && s[j] !== quote) {
        str += s[j];
        j++;
      }
      if (j >= s.length) throw new Error('Cadena sin cerrar');
      tokens.push({ type: 'string', value: str });
      i = j + 1;
      continue;
    }

    // Operadores de 2 caracteres
    const two = s.slice(i, i + 2);
    if (two === '<=' || two === '>=' || two === '<>' || two === '!=' || two === '==' || two === '&&' || two === '||' || two === '**' || two === '<-') {
      tokens.push({ type: 'op', value: two });
      i += 2;
      continue;
    }

    // Operadores de 1 carácter y puntuación
    if ('()[],+-*/^=<>%~!&|'.includes(ch)) {
      if (ch === '(' || ch === ')' || ch === '[' || ch === ']') {
        tokens.push({ type: 'paren', value: ch });
      } else if (ch === ',') {
        tokens.push({ type: 'comma', value: ',' });
      } else {
        tokens.push({ type: 'op', value: ch });
      }
      i++;
      continue;
    }

    // Números (enteros y decimales)
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(s[i + 1] ?? ''))) {
      let j = i + 1;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const num = Number(s.slice(i, j));
      if (Number.isNaN(num)) throw new Error(`Número inválido: ${s.slice(i, j)}`);
      tokens.push({ type: 'number', value: num });
      i = j;
      continue;
    }

    // Identificadores, palabras clave y funciones
    if (/[A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ]/.test(ch)) {
      let j = i + 1;
      while (j < s.length && /[A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]/.test(s[j])) j++;
      const raw = s.slice(i, j);
      const kw = normalizeKeyword(raw);

      if (kw === 'Y' || kw === 'AND') tokens.push({ type: 'op', value: 'Y' });
      else if (kw === 'O' || kw === 'OR') tokens.push({ type: 'op', value: 'O' });
      else if (kw === 'NO' || kw === 'NOT') tokens.push({ type: 'op', value: 'NO' });
      else if (kw === 'MOD') tokens.push({ type: 'op', value: 'MOD' });
      else if (kw === 'VERDADERO' || kw === 'TRUE' || kw === 'V') tokens.push({ type: 'bool', value: true });
      else if (kw === 'FALSO' || kw === 'FALSE' || kw === 'F') tokens.push({ type: 'bool', value: false });
      else tokens.push({ type: 'ident', value: raw, norm: normalizeVarName(raw) });

      i = j;
      continue;
    }

    throw new Error(`Carácter inesperado en expresión: ${JSON.stringify(ch)}`);
  }

  return tokens;
}

class ExprParser {
  constructor(tokens, ctx) {
    this.tokens = tokens;
    this.ctx = ctx;
    this.pos = 0;
  }

  peek() {
    return this.tokens[this.pos] || null;
  }

  next() {
    return this.tokens[this.pos++] || null;
  }

  parse() {
    if (!this.tokens.length) return null;
    const result = this.parseOr();
    if (this.pos < this.tokens.length) {
      throw new Error(`Token inesperado al final de la expresión: ${this.peek().value}`);
    }
    return result;
  }

  parseOr() {
    let left = this.parseAnd();
    while (this.peek() && (this.peek().value === 'O' || this.peek().value === '||' || this.peek().value === '|')) {
      this.next();
      const right = this.parseAnd();
      left = Boolean(left) || Boolean(right);
    }
    return left;
  }

  parseAnd() {
    let left = this.parseEquality();
    while (this.peek() && (this.peek().value === 'Y' || this.peek().value === '&&' || this.peek().value === '&')) {
      this.next();
      const right = this.parseEquality();
      left = Boolean(left) && Boolean(right);
    }
    return left;
  }

  parseEquality() {
    let left = this.parseRelational();
    while (this.peek() && (this.peek().value === '=' || this.peek().value === '==' || this.peek().value === '<>' || this.peek().value === '!=')) {
      const op = this.next().value;
      const right = this.parseRelational();
      if (op === '=' || op === '==') left = (left === right);
      else left = (left !== right);
    }
    return left;
  }

  parseRelational() {
    let left = this.parseAddSub();
    while (this.peek() && (this.peek().value === '<' || this.peek().value === '<=' || this.peek().value === '>' || this.peek().value === '>=')) {
      const op = this.next().value;
      const right = this.parseAddSub();
      const numA = asNumber(left);
      const numB = asNumber(right);
      if (op === '<') left = numA < numB;
      else if (op === '<=') left = numA <= numB;
      else if (op === '>') left = numA > numB;
      else if (op === '>=') left = numA >= numB;
    }
    return left;
  }

  parseAddSub() {
    let left = this.parseMulDiv();
    while (this.peek() && (this.peek().value === '+' || this.peek().value === '-')) {
      const op = this.next().value;
      const right = this.parseMulDiv();
      if (op === '+') {
        if (typeof left === 'string' || typeof right === 'string') {
          left = String(left) + String(right);
        } else {
          left = asNumber(left) + asNumber(right);
        }
      } else {
        left = asNumber(left) - asNumber(right);
      }
    }
    return left;
  }

  parseMulDiv() {
    let left = this.parsePower();
    while (this.peek() && (this.peek().value === '*' || this.peek().value === '/' || this.peek().value === '%' || this.peek().value === 'MOD')) {
      const op = this.next().value;
      const right = this.parsePower();
      const numA = asNumber(left);
      const numB = asNumber(right);
      if (op === '*') left = numA * numB;
      else if (op === '/') {
        if (numB === 0) throw new Error('División por cero');
        left = numA / numB;
      } else {
        if (numB === 0) throw new Error('Módulo por cero');
        left = numA % numB;
      }
    }
    return left;
  }

  parsePower() {
    let left = this.parseUnary();
    if (this.peek() && (this.peek().value === '^' || this.peek().value === '**')) {
      this.next();
      const right = this.parsePower(); // derecha asociativa
      left = Math.pow(asNumber(left), asNumber(right));
    }
    return left;
  }

  parseUnary() {
    const token = this.peek();
    if (token && (token.value === '-' || token.value === '+')) {
      this.next();
      const val = this.parseUnary();
      return token.value === '-' ? -asNumber(val) : asNumber(val);
    }
    if (token && (token.value === 'NO' || token.value === '!' || token.value === '~')) {
      this.next();
      const val = this.parseUnary();
      return !Boolean(val);
    }
    return this.parsePrimary();
  }

  parsePrimary() {
    const token = this.peek();
    if (!token) throw new Error('Expresión incompleta');

    if (token.type === 'number' || token.type === 'string' || token.type === 'bool') {
      this.next();
      return token.value;
    }

    if (token.type === 'paren' && token.value === '(') {
      this.next();
      const val = this.parseOr();
      if (!this.peek() || this.peek().value !== ')') throw new Error("Falta ')'");
      this.next();
      return val;
    }

    if (token.type === 'ident') {
      this.next();
      const identName = token.value;
      const normKey = token.norm;

      // Llamada a Función matemática o nativa
      if (this.peek() && this.peek().value === '(') {
        this.next(); // consume '('
        const args = [];
        if (this.peek() && this.peek().value !== ')') {
          args.push(this.parseOr());
          while (this.peek() && this.peek().type === 'comma') {
            this.next(); // consume ','
            args.push(this.parseOr());
          }
        }
        if (!this.peek() || this.peek().value !== ')') throw new Error("Falta ')' tras llamada a función");
        this.next(); // consume ')'

        return this.evalFunctionCall(identName, args);
      }

      // Acceso a Arreglo / Matriz: arreglo[i] o arreglo(i) o matriz[i, j]
      if (this.peek() && (this.peek().value === '[' || this.peek().value === '(')) {
        const closeParen = this.peek().value === '[' ? ']' : ')';
        this.next();
        const indices = [asNumber(this.parseOr())];
        while (this.peek() && this.peek().type === 'comma') {
          this.next();
          indices.push(asNumber(this.parseOr()));
        }
        if (!this.peek() || this.peek().value !== closeParen) throw new Error(`Falta '${closeParen}'`);
        this.next();

        return this.ctx.getArrayElement(normKey, indices);
      }

      // Variable estándar
      return this.ctx.getVar(normKey, identName);
    }

    throw new Error(`Token inesperado: ${token.value}`);
  }

  evalFunctionCall(fnName, args) {
    const fn = normalizeKeyword(fnName);
    switch (fn) {
      case 'RC':
      case 'RAIZ':
        return Math.sqrt(asNumber(args[0]));
      case 'ABS':
        return Math.abs(asNumber(args[0]));
      case 'TRUNC':
        return Math.trunc(asNumber(args[0]));
      case 'REDON':
        return Math.round(asNumber(args[0]));
      case 'AZAR': {
        const limit = asNumber(args[0]);
        return Math.floor(Math.random() * limit);
      }
      case 'ALEATORIO': {
        const min = asNumber(args[0]);
        const max = asNumber(args[1]);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      case 'SEN':
        return Math.sin(asNumber(args[0]));
      case 'COS':
        return Math.cos(asNumber(args[0]));
      case 'TAN':
        return Math.tan(asNumber(args[0]));
      case 'ASEN':
        return Math.asin(asNumber(args[0]));
      case 'ACOS':
        return Math.acos(asNumber(args[0]));
      case 'ATAN':
        return Math.atan(asNumber(args[0]));
      case 'LN':
        return Math.log(asNumber(args[0]));
      case 'EXP':
        return Math.exp(asNumber(args[0]));
      case 'LONGITUD':
        return String(args[0] ?? '').length;
      case 'MAYUSCULAS':
        return String(args[0] ?? '').toUpperCase();
      case 'MINUSCULAS':
        return String(args[0] ?? '').toLowerCase();
      case 'SUBCADENA': {
        const str = String(args[0] ?? '');
        const p1 = asNumber(args[1]);
        const p2 = asNumber(args[2]);
        // PSeInt usa índices base 1
        const start = Math.max(0, p1 - 1);
        const end = Math.min(str.length, p2);
        return str.slice(start, end);
      }
      case 'CONCATENAR':
        return args.map((a) => String(a ?? '')).join('');
      case 'CONVERTIRANUMERO':
        return Number(String(args[0]).replace(',', '.'));
      case 'CONVERTIRATEXTO':
        return String(args[0] ?? '');
      default:
        throw new Error(`Función no soportada: ${fnName}`);
    }
  }
}

function asNumber(v) {
  const n = typeof v === 'number' ? v : Number(String(v ?? '').replace(',', '.'));
  if (Number.isNaN(n)) throw new Error(`No se puede convertir a número: ${JSON.stringify(v)}`);
  return n;
}

// ─────────────────────────────────────────────────────────────
// PARSER DE SENTENCIAS Y BLOQUES
// ─────────────────────────────────────────────────────────────

function parseLineStatement(rawLine, lineNo) {
  const line = rawLine.trim();
  if (!line) return null;

  const firstToken = line.split(/\s+/)[0];
  const kw = normalizeKeyword(firstToken);

  if (kw === 'ALGORITMO' || kw === 'PROCESO' || kw === 'FINALGORITMO' || kw === 'FINPROCESO') {
    return { type: 'noop', lineNo };
  }

  if (kw === 'BORRAR' || kw === 'LIMPIAR') {
    const rest = normalizeKeyword(line);
    if (rest.includes('PANTALLA')) {
      return { type: 'clear', lineNo };
    }
  }

  if (kw === 'ESPERAR') {
    return { type: 'wait', lineNo };
  }

  // Dimension arreglo[tam] / Dimension matriz[f, c]
  if (kw === 'DIMENSION' || kw === 'DIMENSIONAR') {
    const rest = line.replace(/^(Dimension|Dimensionar)\s+/i, '').replace(/;?\s*$/, '');
    const decls = splitTopLevelCommas(rest);
    const arrays = decls.map((d) => {
      const m = d.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*\[(.+?)\]$/) ||
                d.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*\((.+?)\)$/);
      if (!m) throw new Error(`Sintaxis inválida en Dimension: ${d} (línea ${lineNo})`);
      const dims = splitTopLevelCommas(m[2]);
      return { name: m[1], dims, norm: normalizeVarName(m[1]) };
    });
    return { type: 'dimension', arrays, lineNo };
  }

  // Definir var1, var2 Como Tipo;
  if (kw === 'DEFINIR') {
    const m = line.match(/^Definir\s+(.+?)\s+Como\s+([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ]+)\s*;?$/i);
    if (!m) throw new Error(`Sintaxis inválida de Definir (línea ${lineNo})`);
    const varNames = splitTopLevelCommas(m[1]);
    const varType = normalizeKeyword(m[2]);
    return { type: 'declare', names: varNames, varType, lineNo };
  }

  // Leer var1, var2;
  if (kw === 'LEER') {
    const rest = line.replace(/^Leer\s+/i, '').replace(/;?\s*$/, '');
    const names = splitTopLevelCommas(rest).filter(Boolean);
    if (!names.length) throw new Error(`Leer sin variables (línea ${lineNo})`);
    return { type: 'read', names, lineNo };
  }

  // Escribir [Sin Saltar] ... [Sin Saltar];
  if (kw === 'ESCRIBIR' || kw === 'IMPRIMIR' || kw === 'MOSTRAR') {
    let rest = line.replace(/^(Escribir|Imprimir|Mostrar)\s+/i, '').replace(/;?\s*$/, '').trim();
    let sinSaltar = false;

    if (/^Sin\s+Saltar\s+/i.test(rest) || /^Sin\s+Bajar\s+/i.test(rest)) {
      sinSaltar = true;
      rest = rest.replace(/^Sin\s+(Saltar|Bajar)\s+/i, '');
    } else if (/\s+Sin\s+(Saltar|Bajar)$/i.test(rest)) {
      sinSaltar = true;
      rest = rest.replace(/\s+Sin\s+(Saltar|Bajar)$/i, '');
    }

    const parts = splitTopLevelCommas(rest).filter(Boolean);
    if (!parts.length) throw new Error(`Escribir sin argumentos (línea ${lineNo})`);
    return { type: 'write', parts, sinSaltar, lineNo };
  }

  // Asignación a arreglo: vector[i] <- expr; o matriz[i, j] = expr;
  let arrAssign = line.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*\[(.+?)\]\s*(<-|=|:=)\s*(.+?)\s*;?$/) ||
                  line.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*\((.+?)\)\s*(<-|=|:=)\s*(.+?)\s*;?$/);
  if (arrAssign) {
    const dims = splitTopLevelCommas(arrAssign[2]);
    return { type: 'assign_array', name: arrAssign[1], norm: normalizeVarName(arrAssign[1]), indices: dims, expr: arrAssign[4], lineNo };
  }

  // Asignación estándar: var <- expr; o var = expr; o var := expr;
  let assign = line.match(/^([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*(<-|=|:=)\s*(.+?)\s*;?$/);
  if (assign) {
    return { type: 'assign', name: assign[1], norm: normalizeVarName(assign[1]), expr: assign[3], lineNo };
  }

  throw new Error(`Instrucción no soportada (línea ${lineNo}): ${rawLine}`);
}

function parseBlock(lines, startIdx, endKeywordSet) {
  const body = [];
  let i = startIdx;

  while (i < lines.length) {
    const { text, lineNo } = lines[i];
    const trimmed = text.trim();
    if (!trimmed) {
      i++;
      continue;
    }

    const firstToken = trimmed.split(/\s+/)[0];
    const kw = normalizeKeyword(firstToken);

    if (endKeywordSet.has(kw)) {
      return { body, nextIdx: i, endKeyword: kw };
    }

    // 1. SI ... ENTONCES ... SINO ... FINSI
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

      if (nextIdx >= lines.length || normalizeKeyword(lines[nextIdx].text.trim().split(/\s+/)[0] ?? '') !== 'FINSI') {
        throw new Error(`Falta FinSi para el Si de la línea ${lineNo}`);
      }

      body.push({ type: 'if', cond: m[1], thenBody: thenPart.body, elseBody, lineNo });
      i = nextIdx + 1;
      continue;
    }

    // 2. MIENTRAS ... HACER ... FINMIENTRAS
    if (kw === 'MIENTRAS') {
      const m = trimmed.match(/^Mientras\s+(.+?)\s+Hacer\s*$/i);
      if (!m) throw new Error(`Sintaxis inválida de Mientras (línea ${lineNo})`);
      const inner = parseBlock(lines, i + 1, new Set(['FINMIENTRAS']));
      if (inner.nextIdx >= lines.length || normalizeKeyword(lines[inner.nextIdx].text.trim().split(/\s+/)[0] ?? '') !== 'FINMIENTRAS') {
        throw new Error(`Falta FinMientras para el Mientras de la línea ${lineNo}`);
      }
      body.push({ type: 'while', cond: m[1], body: inner.body, lineNo });
      i = inner.nextIdx + 1;
      continue;
    }

    // 3. REPETIR ... HASTA QUE <condicion>
    if (kw === 'REPETIR') {
      const inner = parseBlock(lines, i + 1, new Set(['HASTA']));
      if (inner.nextIdx >= lines.length) {
        throw new Error(`Falta 'Hasta Que' para el Repetir de la línea ${lineNo}`);
      }
      const untilLine = lines[inner.nextIdx].text.trim();
      const m = untilLine.match(/^Hasta\s+Que\s+(.+?)\s*;?$/i);
      if (!m) throw new Error(`Sintaxis inválida en Hasta Que (línea ${lines[inner.nextIdx].lineNo})`);
      body.push({ type: 'repeat', cond: m[1], body: inner.body, lineNo });
      i = inner.nextIdx + 1;
      continue;
    }

    // 4. PARA <var> <- <ini> HASTA <fin> [CON PASO <paso>] HACER ... FINPARA
    if (kw === 'PARA') {
      const m = trimmed.match(/^Para\s+([A-Za-z_ÁÉÍÓÚÜÑáéíóúüñ][A-Za-z0-9_ÁÉÍÓÚÜÑáéíóúüñ]*)\s*(?:<-|=|:=)\s*(.+?)\s+Hasta\s+(.+?)(?:\s+Con\s+Paso\s+(.+?))?\s+Hacer\s*$/i);
      if (!m) throw new Error(`Sintaxis inválida en Para (línea ${lineNo}). Formato: Para i <- 1 Hasta 10 [Con Paso 1] Hacer`);
      const varName = m[1];
      const startExpr = m[2];
      const endExpr = m[3];
      const stepExpr = m[4] || null;

      const inner = parseBlock(lines, i + 1, new Set(['FINPARA']));
      if (inner.nextIdx >= lines.length || normalizeKeyword(lines[inner.nextIdx].text.trim().split(/\s+/)[0] ?? '') !== 'FINPARA') {
        throw new Error(`Falta FinPara para el Para de la línea ${lineNo}`);
      }

      body.push({
        type: 'for',
        varName,
        norm: normalizeVarName(varName),
        startExpr,
        endExpr,
        stepExpr,
        body: inner.body,
        lineNo,
      });
      i = inner.nextIdx + 1;
      continue;
    }

    // 5. SEGUN <expr> HACER ... [CASO val: ...] [DE OTRO MODO: ...] FINSEGUN
    if (kw === 'SEGUN') {
      const m = trimmed.match(/^Segun\s+(.+?)\s+Hacer\s*$/i);
      if (!m) throw new Error(`Sintaxis inválida en Segun (línea ${lineNo})`);
      const targetExpr = m[1];

      const cases = [];
      let defaultBody = [];
      let j = i + 1;
      let currentCaseValues = null;
      let currentCaseLines = [];

      while (j < lines.length) {
        const curText = lines[j].text.trim();
        const curFirst = normalizeKeyword(curText.split(/\s+/)[0] ?? '');

        if (curFirst === 'FINSEGUN') {
          if (currentCaseValues !== null) {
            const parsedCase = parseBlock(currentCaseLines, 0, new Set());
            if (currentCaseValues === 'DEFAULT') defaultBody = parsedCase.body;
            else cases.push({ values: currentCaseValues, body: parsedCase.body });
          }
          break;
        }

        // Caso "1:" o "1, 2:" o "De Otro Modo:"
        const caseMatch = curText.match(/^(?:Caso\s+)?(.+?)\s*:\s*$/i);
        const defaultMatch = curText.match(/^(?:De\s+Otro\s+Modo|Sino)\s*:\s*$/i);

        if (defaultMatch) {
          if (currentCaseValues !== null) {
            const parsedCase = parseBlock(currentCaseLines, 0, new Set());
            if (currentCaseValues === 'DEFAULT') defaultBody = parsedCase.body;
            else cases.push({ values: currentCaseValues, body: parsedCase.body });
          }
          currentCaseValues = 'DEFAULT';
          currentCaseLines = [];
          j++;
          continue;
        }

        if (caseMatch && !curText.includes('<-') && !curText.includes('=')) {
          if (currentCaseValues !== null) {
            const parsedCase = parseBlock(currentCaseLines, 0, new Set());
            if (currentCaseValues === 'DEFAULT') defaultBody = parsedCase.body;
            else cases.push({ values: currentCaseValues, body: parsedCase.body });
          }
          currentCaseValues = splitTopLevelCommas(caseMatch[1]);
          currentCaseLines = [];
          j++;
          continue;
        }

        if (currentCaseValues !== null) {
          currentCaseLines.push(lines[j]);
        }
        j++;
      }

      if (j >= lines.length) throw new Error(`Falta FinSegun para el Segun de la línea ${lineNo}`);

      body.push({
        type: 'switch',
        expr: targetExpr,
        cases,
        defaultBody,
        lineNo,
      });
      i = j + 1;
      continue;
    }

    const stmt = parseLineStatement(trimmed, lineNo);
    if (stmt && stmt.type !== 'noop') body.push(stmt);
    i++;
  }

  return { body, nextIdx: i, endKeyword: null };
}

function defaultValueForType(varType) {
  const t = normalizeKeyword(varType);
  switch (t) {
    case 'ENTERO':
    case 'ENTEROS':
    case 'NUMERO':
    case 'NUMEROS':
    case 'NUMERICO':
    case 'REAL':
    case 'REALES':
      return 0;
    case 'LOGICO':
    case 'LOGICOS':
    case 'BOOLEANO':
      return false;
    case 'CARACTER':
    case 'CARACTERES':
    case 'TEXTO':
    case 'CADENA':
    case 'STRING':
      return '';
    default:
      return 0;
  }
}

function coerceInputToType(raw, varType) {
  const s = String(raw ?? '').trim();
  const t = normalizeKeyword(varType);

  switch (t) {
    case 'ENTERO':
    case 'ENTEROS': {
      const n = parseInt(s, 10);
      if (Number.isNaN(n)) return 0;
      return n;
    }
    case 'REAL':
    case 'REALES':
    case 'NUMERO':
    case 'NUMEROS':
    case 'NUMERICO': {
      const n = Number(s.replace(',', '.'));
      if (Number.isNaN(n)) return 0;
      return n;
    }
    case 'LOGICO':
    case 'LOGICOS':
    case 'BOOLEANO': {
      const k = normalizeKeyword(s);
      if (k === 'VERDADERO' || k === 'V' || k === 'TRUE' || k === '1') return true;
      return false;
    }
    default:
      return s;
  }
}

function createExecutionContext(onOutput, onClear, limits) {
  const vars = Object.create(null);
  const types = Object.create(null);
  const arrays = Object.create(null);

  const ctx = {
    vars,
    types,
    arrays,
    steps: 0,
    limits,
    onOutput,
    onClear: typeof onClear === 'function' ? onClear : () => {},

    getVar(normKey, rawName) {
      if (Object.prototype.hasOwnProperty.call(vars, normKey)) {
        return vars[normKey];
      }
      // Autodeclaración dinámica
      vars[normKey] = 0;
      return 0;
    },

    setVar(normKey, val) {
      vars[normKey] = val;
    },

    initArray(normKey, dims) {
      arrays[normKey] = { dims, data: new Map() };
    },

    getArrayElement(normKey, indices) {
      const arr = arrays[normKey];
      if (!arr) return 0;
      const key = indices.join(',');
      return arr.data.get(key) ?? 0;
    },

    setArrayElement(normKey, indices, val) {
      if (!arrays[normKey]) {
        arrays[normKey] = { dims: [10], data: new Map() };
      }
      const key = indices.join(',');
      arrays[normKey].data.set(key, val);
    },

    evalExpr(exprStr, lineNo) {
      try {
        const tokens = tokenizeExpr(exprStr);
        const parser = new ExprParser(tokens, ctx);
        return parser.parse();
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        throw new Error(`Error en expresión (línea ${lineNo}): ${msg}`);
      }
    },
  };

  return ctx;
}

function buildProgram(code) {
  const cleanCode = stripComments(code);
  const rawLines = cleanCode.replace(/\r\n/g, '\n').split('\n');
  const lines = rawLines.map((l, idx) => ({ text: l, lineNo: idx + 1 }));
  const parsed = parseBlock(lines, 0, new Set());
  return parsed.body;
}

// ─────────────────────────────────────────────────────────────
// RUNNER INTERACTIVO Y PASO A PASO
// ─────────────────────────────────────────────────────────────

export function createPSeIntRunner(code, opts = {}) {
  const program = buildProgram(code);
  const onOutput = typeof opts.onOutput === 'function' ? opts.onOutput : () => {};
  const onClear = typeof opts.onClear === 'function' ? opts.onClear : () => {};
  const limits = { ...DEFAULT_LIMITS, ...(opts.limits ?? {}) };

  const ctx = createExecutionContext(onOutput, onClear, limits);

  // Inicialización de variables declaradas en Definir
  for (const st of program) {
    if (st.type === 'declare') {
      st.names.forEach((rawName) => {
        const norm = normalizeVarName(rawName);
        ctx.types[norm] = st.varType;
        ctx.vars[norm] = defaultValueForType(st.varType);
      });
    }
  }

  const stack = [{ kind: 'block', stmts: program, ip: 0 }];
  let pendingInputs = []; // Cola de { name, lineNo, varType }
  let currentWaiting = null;

  function bumpSteps() {
    ctx.steps++;
    if (ctx.steps > ctx.limits.maxSteps) {
      throw new Error(`Límite de pasos excedido (${ctx.limits.maxSteps}). ¿Bucle infinito?`);
    }
  }

  function stepInternal() {
    if (pendingInputs.length > 0) {
      currentWaiting = pendingInputs.shift();
      return {
        status: 'need_input',
        name: currentWaiting.name,
        lineNo: currentWaiting.lineNo,
        prompt: `Ingrese ${currentWaiting.name}:`,
      };
    }
    currentWaiting = null;

    while (stack.length) {
      const top = stack[stack.length - 1];

      // 1. FRAME WHILE (Mientras)
      if (top.kind === 'while') {
        bumpSteps();
        const condVal = Boolean(ctx.evalExpr(top.node.cond, top.node.lineNo));
        if (!condVal) {
          stack.pop();
          return { status: 'stepped', kind: 'while_end', lineNo: top.node.lineNo };
        }
        stack.push({ kind: 'block', stmts: top.node.body, ip: 0 });
        return { status: 'stepped', kind: 'while_check', lineNo: top.node.lineNo };
      }

      // 2. FRAME REPEAT (Repetir)
      if (top.kind === 'repeat') {
        bumpSteps();
        if (top.firstPass) {
          top.firstPass = false;
          stack.push({ kind: 'block', stmts: top.node.body, ip: 0 });
          return { status: 'stepped', kind: 'repeat_start', lineNo: top.node.lineNo };
        }
        // En PSeInt: 'Hasta Que condicion' repite MIENTRAS sea FALSA, termina cuando es VERDADERA
        const condVal = Boolean(ctx.evalExpr(top.node.cond, top.node.lineNo));
        if (condVal) {
          stack.pop();
          return { status: 'stepped', kind: 'repeat_end', lineNo: top.node.lineNo };
        }
        stack.push({ kind: 'block', stmts: top.node.body, ip: 0 });
        return { status: 'stepped', kind: 'repeat_loop', lineNo: top.node.lineNo };
      }

      // 3. FRAME FOR (Para)
      if (top.kind === 'for') {
        bumpSteps();
        if (top.firstPass) {
          top.firstPass = false;
          top.current = asNumber(ctx.evalExpr(top.node.startExpr, top.node.lineNo));
          top.end = asNumber(ctx.evalExpr(top.node.endExpr, top.node.lineNo));
          if (top.node.stepExpr) {
            top.step = asNumber(ctx.evalExpr(top.node.stepExpr, top.node.lineNo));
          } else {
            top.step = top.current <= top.end ? 1 : -1;
          }
          ctx.setVar(top.node.norm, top.current);
        } else {
          top.current += top.step;
          ctx.setVar(top.node.norm, top.current);
        }

        const shouldContinue = top.step > 0 ? top.current <= top.end : top.current >= top.end;
        if (!shouldContinue) {
          stack.pop();
          return { status: 'stepped', kind: 'for_end', lineNo: top.node.lineNo };
        }

        stack.push({ kind: 'block', stmts: top.node.body, ip: 0 });
        return { status: 'stepped', kind: 'for_loop', lineNo: top.node.lineNo };
      }

      // 4. FRAME BLOCK (Lista de sentencias)
      if (top.ip >= top.stmts.length) {
        stack.pop();
        continue;
      }

      const st = top.stmts[top.ip];
      top.ip++;
      bumpSteps();

      switch (st.type) {
        case 'clear': {
          ctx.onClear();
          return { status: 'stepped', kind: 'clear', lineNo: st.lineNo };
        }
        case 'wait': {
          return { status: 'stepped', kind: 'wait', lineNo: st.lineNo };
        }
        case 'declare': {
          st.names.forEach((rawName) => {
            const norm = normalizeVarName(rawName);
            ctx.types[norm] = st.varType;
            ctx.vars[norm] = defaultValueForType(st.varType);
          });
          return { status: 'stepped', kind: 'declare', lineNo: st.lineNo };
        }
        case 'dimension': {
          st.arrays.forEach((arr) => {
            const resolvedDims = arr.dims.map((d) => asNumber(ctx.evalExpr(d, st.lineNo)));
            ctx.initArray(arr.norm, resolvedDims);
          });
          return { status: 'stepped', kind: 'dimension', lineNo: st.lineNo };
        }
        case 'assign': {
          const val = ctx.evalExpr(st.expr, st.lineNo);
          ctx.setVar(st.norm, val);
          return { status: 'stepped', kind: 'assign', lineNo: st.lineNo };
        }
        case 'assign_array': {
          const val = ctx.evalExpr(st.expr, st.lineNo);
          const resolvedIndices = st.indices.map((idxExpr) => asNumber(ctx.evalExpr(idxExpr, st.lineNo)));
          ctx.setArrayElement(st.norm, resolvedIndices, val);
          return { status: 'stepped', kind: 'assign_array', lineNo: st.lineNo };
        }
        case 'write': {
          const out = st.parts
            .map((p) => {
              const pt = p.trim();
              if ((pt.startsWith('"') && pt.endsWith('"')) || (pt.startsWith("'") && pt.endsWith("'"))) {
                return pt.slice(1, -1);
              }
              const v = ctx.evalExpr(pt, st.lineNo);
              return typeof v === 'boolean' ? (v ? 'Verdadero' : 'Falso') : String(v ?? '');
            })
            .join('');
          ctx.onOutput(out, !st.sinSaltar);
          return { status: 'stepped', kind: 'write', lineNo: st.lineNo };
        }
        case 'read': {
          pendingInputs = st.names.map((rawName) => ({
            name: rawName,
            norm: normalizeVarName(rawName),
            varType: ctx.types[normalizeVarName(rawName)] || 'CARACTER',
            lineNo: st.lineNo,
          }));
          currentWaiting = pendingInputs.shift();
          return {
            status: 'need_input',
            name: currentWaiting.name,
            lineNo: currentWaiting.lineNo,
            prompt: `Ingrese ${currentWaiting.name}:`,
          };
        }
        case 'if': {
          const condVal = Boolean(ctx.evalExpr(st.cond, st.lineNo));
          stack.push({ kind: 'block', stmts: condVal ? st.thenBody : st.elseBody, ip: 0 });
          return { status: 'stepped', kind: 'if', lineNo: st.lineNo };
        }
        case 'while': {
          stack.push({ kind: 'while', node: st });
          return { status: 'stepped', kind: 'while_start', lineNo: st.lineNo };
        }
        case 'repeat': {
          stack.push({ kind: 'repeat', node: st, firstPass: true });
          return { status: 'stepped', kind: 'repeat_start', lineNo: st.lineNo };
        }
        case 'for': {
          stack.push({ kind: 'for', node: st, firstPass: true });
          return { status: 'stepped', kind: 'for_start', lineNo: st.lineNo };
        }
        case 'switch': {
          const targetVal = ctx.evalExpr(st.expr, st.lineNo);
          let matched = false;
          for (const c of st.cases) {
            for (const vExpr of c.values) {
              const vVal = ctx.evalExpr(vExpr, st.lineNo);
              if (vVal === targetVal) {
                stack.push({ kind: 'block', stmts: c.body, ip: 0 });
                matched = true;
                break;
              }
            }
            if (matched) break;
          }
          if (!matched && st.defaultBody.length) {
            stack.push({ kind: 'block', stmts: st.defaultBody, ip: 0 });
          }
          return { status: 'stepped', kind: 'switch', lineNo: st.lineNo };
        }
        default:
          throw new Error(`Nodo no soportado: ${st.type}`);
      }
    }

    return { status: 'done' };
  }

  function provideInput(raw) {
    if (!currentWaiting) throw new Error('No hay una lectura (Leer) esperando entrada.');
    const { norm, varType, lineNo } = currentWaiting;
    ctx.setVar(norm, coerceInputToType(raw, varType));
    const processedName = currentWaiting.name;
    currentWaiting = null;
    return { status: 'input_applied', name: processedName, lineNo };
  }

  async function runUntilPause() {
    while (true) {
      const r = stepInternal();
      if (r.status === 'need_input' || r.status === 'done') return r;
      await Promise.resolve();
    }
  }

  return {
    step: () => stepInternal(),
    run: () => runUntilPause(),
    provideInput,
    getVars: () => ({ ...ctx.vars }),
  };
}

export async function runPSeInt(code, opts = {}) {
  const onOutput = typeof opts.onOutput === 'function' ? opts.onOutput : () => {};
  const onClear = typeof opts.onClear === 'function' ? opts.onClear : () => {};
  const runner = createPSeIntRunner(code, { onOutput, onClear, limits: opts.limits });
  const stdin = Array.isArray(opts.stdinLines) ? [...opts.stdinLines] : [];

  while (true) {
    const res = runner.step();
    if (res.status === 'done') break;
    if (res.status === 'need_input') {
      const nextVal = stdin.length ? stdin.shift() : '';
      runner.provideInput(nextVal);
    }
  }

  return { vars: runner.getVars() };
}
