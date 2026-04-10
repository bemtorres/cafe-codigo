/**
 * Resaltado de líneas y detección de lenguaje compartido por CodeBlock y CodeBlockMulti.
 */

export function normalizeLangHint(l: string | undefined): string | undefined {
  if (!l) return undefined;
  const x = l.trim().toLowerCase();
  if (x === 'rb' || x === 'ry') return 'ruby';
  return l.trim();
}

export function detectLang(src: string) {
  const s = String(src ?? '');

  if (/\bAlgoritmo\b/i.test(s) && /\bFinAlgoritmo\b/i.test(s)) return 'pseint';
  const pseintHits = [
    /\bSi\b.+\bEntonces\b/i,
    /\bSino\b/i,
    /\bFinSi\b/i,
    /\bSegun\b/i,
    /\bFinSegun\b/i,
    /\bMientras\b.+\bHacer\b/i,
    /\bFinMientras\b/i,
    /\bPara\b.+\bHasta\b/i,
    /\bFinPara\b/i,
    /\bEscribir\b/i,
    /\bLeer\b/i,
    /\bDefinir\b.+\bComo\b/i,
    /\bMOD\b/,
  ];
  if (pseintHits.filter((r) => r.test(s)).length >= 2) return 'pseint';

  if (/#include\s*</.test(s) || /\bstd::\w+/.test(s) || /\b(cout|cin|cerr|clog|endl)\b/.test(s)) return 'cpp';
  if (/\bConsole\.Write(Line)?\b/.test(s) || /\busing System\b/.test(s) || /\bnamespace\b/.test(s)) return 'csharp';
  if (/\bfun main\b/.test(s) || (/\bprintln\b/.test(s) && !/\bSystem\.out\b/.test(s))) return 'kotlin';
  if (
    /@Test\b/.test(s) ||
    /@BeforeEach\b/.test(s) ||
    /@AfterEach\b/.test(s) ||
    /\bassertEquals\b/.test(s) ||
    /\bassertThrows\b/.test(s) ||
    /import org\.junit/.test(s) ||
    /import static org\.junit/.test(s)
  )
    return 'java';
  if (/\bpublic class\b/.test(s) || /\bSystem\.out\.print/.test(s) || /\bimport java\./.test(s)) return 'java';
  if (/\belsif\b/.test(s) || /\bunless\b/.test(s)) return 'ruby';
  if (/\bputs\b/.test(s) && /\b(end|def|do)\b/.test(s)) return 'ruby';

  if (/\bmatch\b/.test(s) && /\bcase\s/.test(s)) return 'python';

  if (/\bdef \w+\(/.test(s) || (/\bimport \w/.test(s) && /\bprint\(/.test(s))) return 'python';
  if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN)\b/i.test(s)) return 'sql';
  if (/<\/?[a-z][a-z0-9]*[\s>]/i.test(s) && /<!DOCTYPE|<html|<div|<p |<h[1-6]|<span/i.test(s)) return 'html';
  if (/\{[\s\S]*?:[\s\S]*?\}/.test(s) && /[.#]?\w+\s*\{/.test(s)) return 'css';
  if (/\b(const|let|var|function|=>|document\.|console\.log|async|await)\b/.test(s)) return 'javascript';

  return 'java';
}

export const langColors: Record<string, string> = {
  pseint: '#45B3E0',
  csharp: '#9B4F96',
  kotlin: '#F18E33',
  cpp: '#00599C',
  java: '#f59e0b',
  python: '#3572A5',
  javascript: '#F7DF1E',
  ruby: '#CC342D',
  typescript: '#3178C6',
  html: '#E34F26',
  css: '#1572B6',
  bash: '#4EAA25',
  sql: '#2980b9',
  cmd: '#888888',
  json: '#13aa52',
};

export const idePalettes: Record<string, { bg: string; txt: string; kw: string; str: string; func: string; type: string; op: string }> = {
  java: { bg: '#2b2b2b', txt: '#a9b7c6', kw: '#cc7832', str: '#6a8759', func: '#ffc66d', type: '#a9b7c6', op: '#a9b7c6' },
  csharp: { bg: '#1e1e1e', txt: '#d4d4d4', kw: '#569cd6', str: '#d69d85', func: '#dcdcaa', type: '#4ec9b0', op: '#b4b4b4' },
  python: { bg: '#282c34', txt: '#abb2bf', kw: '#c678dd', str: '#98c379', func: '#61afef', type: '#e5c07b', op: '#c678dd' },
  javascript: { bg: '#1e1e1e', txt: '#9cdcfe', kw: '#569cd6', str: '#ce9178', func: '#dcdcaa', type: '#4ec9b0', op: '#d4d4d4' },
  json: { bg: '#1e1e1e', txt: '#d4d4d4', kw: '#569cd6', str: '#ce9178', func: '#4ec9b0', type: '#569cd6', op: '#d4d4d4' },
  typescript: { bg: '#1e1e1e', txt: '#9cdcfe', kw: '#569cd6', str: '#ce9178', func: '#dcdcaa', type: '#4ec9b0', op: '#d4d4d4' },
  sql: { bg: '#1e1e1e', txt: '#d4d4d4', kw: '#569cd6', str: '#ce9178', func: '#dcdcaa', type: '#4ec9b0', op: '#d4d4d4' },
  html: { bg: '#1e1e1e', txt: '#d4d4d4', kw: '#569cd6', str: '#ce9178', func: '#dcdcaa', type: '#4ec9b0', op: '#d4d4d4' },
  css: { bg: '#1e1e1e', txt: '#d4d4d4', kw: '#569cd6', str: '#ce9178', func: '#dcdcaa', type: '#4ec9b0', op: '#d4d4d4' },
  pseint: { bg: '#ffffff', txt: '#000000', kw: '#0000FF', str: '#A31515', func: '#000000', type: '#008080', op: '#000000' },
  ruby: { bg: '#2d1f1f', txt: '#e8dcc8', kw: '#ff6b6b', str: '#98d8aa', func: '#f9e79f', type: '#7ec8e3', op: '#c9b8a8' },
};

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

type Token = { re: RegExp; cls: string };

function tokenize(src: string, tokens: Token[]): string {
  let out = '';
  let i = 0;
  while (i < src.length) {
    let matched = false;
    for (const tok of tokens) {
      const m = tok.re.exec(src.slice(i));
      if (m && m.index === 0) {
        out += `<span class="${tok.cls}">${escape(m[0])}</span>`;
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += escape(src[i]);
      i++;
    }
  }
  return out;
}

function highlightPseint(line: string): string {
  return tokenize(line, [
    { re: /\/\/.*/, cls: 'hl-comment' },
    { re: /"[^"]*"|'[^']*'/, cls: 'hl-str' },
    {
      re: /\b(Algoritmo|FinAlgoritmo|Definir|Como|Escribir|Leer|Si|Entonces|Sino|FinSi|Mientras|Hacer|FinMientras|Para|Hasta|Con Paso|FinPara|Segun|De Otro Modo|FinSegun|Funcion|FinFuncion|Verdadero|Falso|Y|O|No|MOD|DIV)\b/i,
      cls: 'hl-kw',
    },
    { re: /\b(Entero|Real|Caracter|Logico|Cadena)\b/i, cls: 'hl-type' },
    { re: /\b\d+\.?\d*\b/, cls: 'hl-num' },
  ]);
}

function highlightJava(line: string): string {
  return tokenize(line, [
    { re: /\/\/.*/, cls: 'hl-comment' },
    { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, cls: 'hl-str' },
    { re: /@\w+/, cls: 'hl-annotation' },
    {
      re: /\b(public|private|protected|static|final|void|class|interface|enum|extends|implements|import|package|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|instanceof|this|super|abstract|synchronized|volatile|native|transient|strictfp|assert|record|sealed|permits|var)\b/,
      cls: 'hl-kw',
    },
    {
      re: /\b(int|long|double|float|boolean|char|byte|short|String|Integer|Long|Double|Boolean|List|Map|Set|Optional|Object|Number|ArrayList|HashMap|HashSet|Arrays|Collections)\b/,
      cls: 'hl-type',
    },
    { re: /\b(\w+)(?=\s*\()/, cls: 'hl-func' },
    { re: /\b\d+\.?\d*[LlFfDd]?\b/, cls: 'hl-num' },
  ]);
}

function highlightPython(line: string): string {
  return tokenize(line, [
    { re: /#.*/, cls: 'hl-comment' },
    {
      re: /"""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'/,
      cls: 'hl-str',
    },
    { re: /@\w+/, cls: 'hl-annotation' },
    {
      re: /\b(def|class|import|from|as|return|if|elif|else|match|case|for|while|in|not|and|or|is|None|True|False|try|except|finally|raise|with|pass|break|continue|yield|lambda|global|nonlocal|del|assert|async|await)\b/,
      cls: 'hl-kw',
    },
    {
      re: /\b(print|input|len|range|int|str|float|bool|list|dict|set|tuple|type|isinstance|enumerate|zip|map|filter|sorted|reversed|open|super|self|cls)\b/,
      cls: 'hl-func',
    },
    { re: /\b\d+\.?\d*\b/, cls: 'hl-num' },
  ]);
}

function highlightRuby(line: string): string {
  return tokenize(line, [
    { re: /#.*/, cls: 'hl-comment' },
    { re: /"(?:[^"\\]|\\.)*"|'(?:[^"\\]|\\.)*'/, cls: 'hl-str' },
    { re: /:\w+/, cls: 'hl-type' },
    {
      re: /\b(def|end|class|module|if|else|elsif|unless|case|when|then|begin|rescue|ensure|retry|redo|next|break|return|yield|self|super|nil|true|false|and|or|not|alias|undef|do|in|until|while|for|BEGIN|END)\b/,
      cls: 'hl-kw',
    },
    { re: /\bdefined\?/, cls: 'hl-kw' },
    {
      re: /\b(puts|print|p|require|require_relative|include|extend|attr_reader|attr_writer|attr_accessor|initialize|new|map|each|select|reject|inspect|length|size|chomp|strip|gsub|split|join|push|pop|keys|values|freeze|dup|clone|open|read|write)\b/,
      cls: 'hl-func',
    },
    { re: /@[a-zA-Z_]\w*/, cls: 'hl-annotation' },
    { re: /\$\w+/, cls: 'hl-attr' },
    { re: /\b(\w+)(?=\s*\()/, cls: 'hl-func' },
    { re: /\b0x[0-9a-fA-F]+|\b\d+\.?\d*\b/, cls: 'hl-num' },
  ]);
}

function highlightCpp(line: string): string {
  return tokenize(line, [
    { re: /\/\/.*/, cls: 'hl-comment' },
    { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)'/, cls: 'hl-str' },
    { re: /^#.*/, cls: 'hl-kw' },
    {
      re: /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq|override|final)\b/,
      cls: 'hl-kw',
    },
    {
      re: /\b(std|string|vector|map|set|list|deque|array|unique_ptr|shared_ptr|optional|variant|cout|cin|cerr|clog|endl|string_view|size_t|int64_t|uint32_t)\b/,
      cls: 'hl-type',
    },
    { re: /\b(\w+)(?=\s*\()/, cls: 'hl-func' },
    { re: /\b0x[0-9a-fA-F]+|\b\d+\.?\d*[fFlLuUzZ]*\b/, cls: 'hl-num' },
  ]);
}

function highlightCsharp(line: string): string {
  return tokenize(line, [
    { re: /\/\/.*/, cls: 'hl-comment' },
    { re: /"(?:[^"\\]|\\.)*"/, cls: 'hl-str' },
    { re: /\[(\w+)\]/, cls: 'hl-annotation' },
    {
      re: /\b(public|private|protected|internal|static|readonly|sealed|abstract|override|virtual|class|interface|enum|struct|record|namespace|using|new|return|if|else|for|foreach|while|do|switch|case|break|continue|try|catch|finally|throw|in|out|ref|params|var|void|this|base|async|await|get|set|init|required)\b/,
      cls: 'hl-kw',
    },
    {
      re: /\b(int|long|double|float|bool|char|byte|string|String|object|decimal|List|Dictionary|Array|IEnumerable|Task|Console|Math|StringBuilder|DateTime)\b/,
      cls: 'hl-type',
    },
    { re: /\b(\w+)(?=\s*\()/, cls: 'hl-func' },
    { re: /\b\d+\.?\d*[fFdDmMuUlL]*\b/, cls: 'hl-num' },
  ]);
}

function highlightSql(line: string): string {
  return tokenize(line, [
    { re: /--.*/, cls: 'hl-comment' },
    { re: /'(?:[^'\\]|\\.)*'/, cls: 'hl-str' },
    {
      re: /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|CROSS|ON|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT|OFFSET|UNION|INTO|VALUES|SET|AS|AND|OR|NOT|IN|BETWEEN|LIKE|IS|NULL|DISTINCT|ALL|EXISTS|CASE|WHEN|THEN|ELSE|END|TABLE|VIEW|DATABASE|PRIMARY|FOREIGN|KEY|REFERENCES|UNIQUE|CHECK|DEFAULT|BEGIN|COMMIT|ROLLBACK)\b/i,
      cls: 'hl-kw',
    },
    {
      re: /\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|CONCAT|SUBSTRING|LENGTH|UPPER|LOWER|TRIM|NOW|DATE|YEAR|MONTH|DAY|CAST|CONVERT|ROUND|ABS|FLOOR|CEILING)\b/i,
      cls: 'hl-func',
    },
    { re: /\b\d+\.?\d*\b/, cls: 'hl-num' },
  ]);
}

function highlightJs(line: string): string {
  return tokenize(line, [
    { re: /\/\/.*/, cls: 'hl-comment' },
    { re: /`[^`]*`|"(?:[^"\\]|\\.)*"|'(?:[^"\\]|\\.)*'/, cls: 'hl-str' },
    {
      re: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|import|export|from|default|typeof|instanceof|in|of|delete|void|async|await|yield|static|get|set)\b/,
      cls: 'hl-kw',
    },
    { re: /\b(true|false|null|undefined|NaN|Infinity|this|super)\b/, cls: 'hl-type' },
    {
      re: /\b(console|document|window|Array|Object|String|Number|Boolean|Math|Date|JSON|Promise|Map|Set|localStorage|fetch|setTimeout|setInterval)\b/,
      cls: 'hl-func',
    },
    { re: /\b(\w+)(?=\s*\()/, cls: 'hl-func' },
    { re: /\b\d+\.?\d*\b/, cls: 'hl-num' },
  ]);
}

function highlightHtml(line: string): string {
  return tokenize(line, [
    { re: /<!--[\s\S]*?-->/, cls: 'hl-comment' },
    { re: /"[^"]*"|'[^']*'/, cls: 'hl-str' },
    { re: /<\/?[\w-]+/, cls: 'hl-tag' },
    { re: /[\w-]+(?=\s*=)/, cls: 'hl-attr' },
  ]);
}

function highlightJson(line: string): string {
  return tokenize(line, [
    { re: /"(?:[^"\\]|\\.)*"/, cls: 'hl-str' },
    { re: /\b(true|false|null)\b/, cls: 'hl-kw' },
    { re: /\b(ObjectId)\b(?=\s*\()/, cls: 'hl-func' },
    { re: /\b\d+\.?\d*\b/, cls: 'hl-num' },
  ]);
}

function highlightCss(line: string): string {
  return tokenize(line, [
    { re: /\/\*[\s\S]*?\*\//, cls: 'hl-comment' },
    { re: /"[^"]*"|'[^']*'/, cls: 'hl-str' },
    { re: /@[\w-]+/, cls: 'hl-kw' },
    { re: /#[0-9a-fA-F]{3,8}\b/, cls: 'hl-num' },
    { re: /\b\d+\.?\d*(?:px|em|rem|vh|vw|%|s|ms|deg|fr|pt|cm|mm)?\b/, cls: 'hl-num' },
    { re: /[\w-]+(?=\s*:)/, cls: 'hl-attr' },
    { re: /[.#]?[\w-]+(?=\s*\{)/, cls: 'hl-tag' },
  ]);
}

export function highlightLine(line: string, lang: string): string {
  switch (lang) {
    case 'pseint':
      return highlightPseint(line);
    case 'java':
    case 'kotlin':
      return highlightJava(line);
    case 'csharp':
      return highlightCsharp(line);
    case 'cpp':
      return highlightCpp(line);
    case 'python':
      return highlightPython(line);
    case 'ruby':
      return highlightRuby(line);
    case 'sql':
      return highlightSql(line);
    case 'javascript':
    case 'typescript':
      return highlightJs(line);
    case 'json':
      return highlightJson(line);
    case 'html':
      return highlightHtml(line);
    case 'css':
      return highlightCss(line);
    default:
      return escape(line);
  }
}

export function resolveFinalLang(lang: string | undefined, code: string, isPSeIntCode: boolean): string {
  const n = normalizeLangHint(lang);
  if (n) return n;
  if (isPSeIntCode) return 'pseint';
  return detectLang(code);
}
