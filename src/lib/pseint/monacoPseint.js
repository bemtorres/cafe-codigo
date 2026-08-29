import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

function normalizeKeyword(s) {
  return String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

const KEYWORDS = [
  'Algoritmo',
  'FinAlgoritmo',
  'Proceso',
  'FinProceso',
  'Definir',
  'Como',
  'Entero',
  'Real',
  'Logico',
  'Caracter',
  'Texto',
  'Cadena',
  'Numero',
  'Numerico',
  'Booleano',
  'Leer',
  'Escribir',
  'Imprimir',
  'Mostrar',
  'Sin',
  'Saltar',
  'Bajar',
  'Si',
  'Entonces',
  'Sino',
  'FinSi',
  'Mientras',
  'Hacer',
  'FinMientras',
  'Repetir',
  'Hasta',
  'Que',
  'Para',
  'FinPara',
  'Con',
  'Paso',
  'Segun',
  'FinSegun',
  'Caso',
  'De',
  'Otro',
  'Modo',
  'Dimension',
  'Dimensionar',
  'Borrar',
  'Limpiar',
  'Pantalla',
  'Esperar',
  'Verdadero',
  'Falso',
  'Y',
  'O',
  'No',
  'Mod',
  'Rc',
  'Raiz',
  'Abs',
  'Trunc',
  'Redon',
  'Azar',
  'Aleatorio',
  'Sen',
  'Cos',
  'Tan',
  'Ln',
  'Exp',
  'Longitud',
  'Mayusculas',
  'Minusculas',
  'Subcadena',
];

const HELP = Object.freeze({
  ALGORITMO: 'Inicia un algoritmo. Ej: Algoritmo MiAlgoritmo',
  FINALGORITMO: 'Finaliza el algoritmo.',
  PROCESO: 'Inicia un proceso o algoritmo. Ej: Proceso MiProceso',
  FINPROCESO: 'Finaliza el proceso.',
  DEFINIR: 'Declara una o varias variables. Ej: Definir x, y Como Entero;',
  COMO: 'Parte de la declaración. Ej: Definir x Como Entero;',
  ENTERO: 'Tipo numérico entero (sin decimales).',
  REAL: 'Tipo numérico con decimales.',
  NUMERO: 'Tipo numérico general.',
  NUMERICO: 'Tipo numérico general.',
  LOGICO: 'Tipo booleano (Verdadero / Falso).',
  BOOLEANO: 'Tipo booleano (Verdadero / Falso).',
  CARACTER: 'Tipo texto (cadena de caracteres).',
  TEXTO: 'Tipo texto (cadena).',
  CADENA: 'Tipo texto (cadena).',
  LEER: 'Lee uno o varios valores ingresados por el usuario. Ej: Leer a, b;',
  ESCRIBIR: 'Muestra texto o variables en pantalla. Ej: Escribir "Hola", x;',
  IMPRIMIR: 'Sinónimo de Escribir.',
  MOSTRAR: 'Sinónimo de Escribir.',
  SALTAR: 'Usado con "Sin Saltar" para escribir sin salto de línea al final.',
  SI: 'Estructura condicional. Ej: Si x > 0 Entonces ... FinSi',
  ENTONCES: 'Marca el inicio del bloque verdadero del Si.',
  SINO: 'Bloque alternativo falso del Si.',
  FINSI: 'Cierra el condicional Si.',
  MIENTRAS: 'Bucle que se repite mientras la condición sea verdadera. Ej: Mientras i <= 10 Hacer ... FinMientras',
  HACER: 'Marca el inicio del bloque de bucle.',
  FINMIENTRAS: 'Cierra el bucle Mientras.',
  REPETIR: 'Bucle que ejecuta al menos una vez hasta que la condición se cumpla. Ej: Repetir ... Hasta Que x = 0',
  HASTA: 'Indica el límite superior o condición de término.',
  QUE: 'Parte de "Hasta Que" en bucles Repetir.',
  PARA: 'Bucle con contador. Ej: Para i <- 1 Hasta 10 Con Paso 1 Hacer ... FinPara',
  FINPARA: 'Cierra el bucle Para.',
  PASO: 'Indica el incremento en el bucle Para. Ej: Con Paso 2',
  SEGUN: 'Estructura de selección múltiple (Switch). Ej: Segun opc Hacer 1: ... De Otro Modo: ... FinSegun',
  FINSEGUN: 'Cierra la estructura Segun.',
  CASO: 'Opción dentro de la estructura Segun.',
  DIMENSION: 'Declara un arreglo o matriz. Ej: Dimension vector[10];',
  DIMENSIONAR: 'Sinónimo de Dimension.',
  BORRAR: 'Usado con "Borrar Pantalla" para limpiar la consola.',
  LIMPIAR: 'Usado con "Limpiar Pantalla" para limpiar la consola.',
  VERDADERO: 'Literal lógico (true).',
  FALSO: 'Literal lógico (false).',
  Y: 'Operador lógico AND.',
  O: 'Operador lógico OR.',
  NO: 'Operador lógico NOT.',
  MOD: 'Operador módulo (resto de división entera). Ej: 10 MOD 3',
  RC: 'Raíz cuadrada. Ej: RC(16) -> 4',
  RAIZ: 'Raíz cuadrada. Ej: RAIZ(25) -> 5',
  ABS: 'Valor absoluto. Ej: ABS(-5) -> 5',
  TRUNC: 'Trunca la parte decimal de un número. Ej: TRUNC(4.8) -> 4',
  REDON: 'Redondea al entero más cercano. Ej: REDON(4.6) -> 5',
  AZAR: 'Genera un entero aleatorio entre 0 y x-1. Ej: AZAR(10)',
  ALEATORIO: 'Genera un entero aleatorio entre min y max. Ej: ALEATORIO(1, 6)',
  LONGITUD: 'Retorna la cantidad de caracteres de un texto. Ej: LONGITUD("hola") -> 4',
  MAYUSCULAS: 'Convierte un texto a mayúsculas.',
  MINUSCULAS: 'Convierte un texto a minúsculas.',
  SUBCADENA: 'Extrae un fragmento de texto. Ej: SUBCADENA("PSeInt", 1, 3) -> "PSe"',
});

function makeSnippets(monaco) {
  const Snippet = monaco.languages.CompletionItemKind.Snippet;
  const Keyword = monaco.languages.CompletionItemKind.Keyword;

  const mk = (label, insertText, documentation, kind = Snippet) => ({
    label,
    kind,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText,
    documentation,
  });

  return [
    mk(
      'Algoritmo ... FinAlgoritmo',
      ['Algoritmo ${1:NombreAlgoritmo}', '\t$0', 'FinAlgoritmo'].join('\n'),
      'Estructura base del algoritmo.'
    ),
    mk(
      'Definir variable(s)',
      'Definir ${1:variable} Como ${2|Entero,Real,Logico,Caracter,Texto|};',
      'Declara una o varias variables con su tipo de dato.'
    ),
    mk('Leer variable', 'Leer ${1:variable};', 'Lee un valor ingresado por el usuario.'),
    mk('Escribir', 'Escribir "${1:texto}";', 'Imprime texto en la consola.'),
    mk('Escribir (texto + variable)', 'Escribir "${1:texto}: ", ${2:variable};', 'Imprime concatenando texto y variable.'),
    mk('Escribir Sin Saltar', 'Escribir Sin Saltar "${1:texto}: ";', 'Imprime sin salto de línea al final.'),
    mk('Asignación <-', '${1:var} <- ${2:expresion};', 'Asigna el valor de una expresión.'),
    mk(
      'Si ... Entonces ... FinSi',
      ['Si ${1:condicion} Entonces', '\t$0', 'FinSi'].join('\n'),
      'Estructura condicional simple.'
    ),
    mk(
      'Si ... Sino ... FinSi',
      ['Si ${1:condicion} Entonces', '\t${2:// caso verdadero}', 'Sino', '\t$0', 'FinSi'].join('\n'),
      'Estructura condicional con bloque alternativo.'
    ),
    mk(
      'Mientras ... Hacer ... FinMientras',
      ['Mientras ${1:condicion} Hacer', '\t$0', 'FinMientras'].join('\n'),
      'Bucle que se repite mientras la condición sea verdadera.'
    ),
    mk(
      'Repetir ... Hasta Que',
      ['Repetir', '\t$0', 'Hasta Que ${1:condicion};'].join('\n'),
      'Bucle que ejecuta al menos una vez hasta que la condición sea verdadera.'
    ),
    mk(
      'Para ... Hacer ... FinPara',
      ['Para ${1:i} <- ${2:1} Hasta ${3:10} Con Paso ${4:1} Hacer', '\t$0', 'FinPara'].join('\n'),
      'Bucle con variable de control y paso de incremento.'
    ),
    mk(
      'Segun ... Hacer ... FinSegun',
      [
        'Segun ${1:variable} Hacer',
        '\t1:',
        '\t\t${2:Escribir "Opción 1";}',
        '\t2:',
        '\t\t${3:Escribir "Opción 2";}',
        '\tDe Otro Modo:',
        '\t\t${4:Escribir "Opción no válida";}',
        'FinSegun',
      ].join('\n'),
      'Estructura de selección múltiple según el valor de una variable.'
    ),
    mk(
      'Dimension arreglo',
      'Dimension ${1:vector}[${2:10}];',
      'Declara un arreglo de tamaño fijo.'
    ),
    ...KEYWORDS.map((k) => ({
      label: k,
      kind: Keyword,
      insertText: k,
      documentation: HELP[normalizeKeyword(k)] ?? '',
    })),
  ];
}

export async function createMonacoPSeIntEditor(container, initialValue) {
  const monaco = await import('monaco-editor');

  self.MonacoEnvironment = {
    getWorker() {
      return new EditorWorker();
    },
  };

  const languageId = 'pseint';

  if (!monaco.languages.getLanguages().some((l) => l.id === languageId)) {
    monaco.languages.register({ id: languageId });

    monaco.languages.setMonarchTokensProvider(languageId, {
      defaultToken: '',
      ignoreCase: true,
      tokenizer: {
        root: [
          [/\/\/.*$/, 'comment'],
          [/\/\*[\s\S]*?\*\//, 'comment'],
          [/".*?"/, 'string'],
          [/'.*?'/, 'string'],
          [/\b(Verdadero|Falso|V|F|True|False)\b/i, 'constant'],
          [/\b(Entero|Enteros|Real|Reales|Numero|Numeros|Numerico|Numericos|Logico|Logicos|Booleano|Caracter|Caracteres|Texto|Cadena|String)\b/i, 'type'],
          [
            /\b(Algoritmo|FinAlgoritmo|Proceso|FinProceso|Definir|Como|Leer|Escribir|Imprimir|Mostrar|Sin|Saltar|Bajar|Si|Entonces|Sino|FinSi|Mientras|Hacer|FinMientras|Repetir|Hasta|Que|Para|FinPara|Con|Paso|Segun|FinSegun|Caso|De|Otro|Modo|Dimension|Dimensionar|Borrar|Limpiar|Pantalla|Esperar|Y|O|No|Mod|Rc|Raiz|Abs|Trunc|Redon|Azar|Aleatorio|Sen|Cos|Tan|Ln|Exp|Longitud|Mayusculas|Minusculas|Subcadena)\b/i,
            'keyword',
          ],
          [/[0-9]+(\.[0-9]+)?/, 'number'],
          [/[a-zA-Z_ÁÉÍÓÚÜÑáéíóúüñ][\wÁÉÍÓÚÜÑáéíóúüñ]*/, 'identifier'],
          [/[()\[\]]/, '@brackets'],
          [/[+\-*/^=<>%~!&|:]+/, 'operator'],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration(languageId, {
      comments: { lineComment: '//', blockComment: ['/*', '*/'] },
      brackets: [
        ['(', ')'],
        ['[', ']'],
      ],
      autoClosingPairs: [
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: '(', close: ')' },
        { open: '[', close: ']' },
      ],
      surroundingPairs: [
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: '(', close: ')' },
        { open: '[', close: ']' },
      ],
    });

    const snippets = makeSnippets(monaco);

    monaco.languages.registerCompletionItemProvider(languageId, {
      triggerCharacters: [' ', '<', '-', '"', '[', '('],
      provideCompletionItems() {
        return { suggestions: snippets };
      },
    });

    monaco.languages.registerHoverProvider(languageId, {
      provideHover(model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return null;
        const key = normalizeKeyword(word.word);
        const help = HELP[key];
        if (!help) return null;
        return {
          range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
          contents: [
            { value: `**${word.word}**` },
            { value: help },
          ],
        };
      },
    });
  }

  const editor = monaco.editor.create(container, {
    value: initialValue ?? '',
    language: languageId,
    theme: 'vs',
    fontSize: 14,
    lineHeight: 22,
    fontLigatures: false,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    renderWhitespace: 'selection',
    wordWrap: 'on',
    automaticLayout: true,
    tabSize: 2,
  });

  editor.addAction({
    id: 'pseint.format-min',
    label: 'Formatear (simple)',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF],
    run(ed) {
      const v = ed.getValue().replace(/\t/g, '  ');
      ed.setValue(v);
    },
  });

  function insertSnippet(text) {
    const ed = editor;
    ed.focus();
    const contrib = ed.getContribution('snippetController2');
    if (contrib && typeof contrib.insert === 'function') {
      contrib.insert(text);
    } else {
      const selection = ed.getSelection();
      if (!selection) return;
      ed.executeEdits('insert-snippet', [
        { range: selection, text, forceMoveMarkers: true },
      ]);
    }
  }

  return { monaco, editor, insertSnippet };
}
