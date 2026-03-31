import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

function normalizeKeyword(s) {
  return String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

const KEYWORDS = [
  'Algoritmo',
  'FinAlgoritmo',
  'Definir',
  'Como',
  'Entero',
  'Real',
  'Logico',
  'Caracter',
  'Leer',
  'Escribir',
  'Si',
  'Entonces',
  'Sino',
  'FinSi',
  'Mientras',
  'Hacer',
  'FinMientras',
  'Verdadero',
  'Falso',
  'Y',
  'O',
  'No',
];

const HELP = Object.freeze({
  ALGORITMO: 'Inicia un algoritmo. Ej: Algoritmo MiAlgoritmo',
  FINALGORITMO: 'Finaliza el algoritmo.',
  DEFINIR: 'Declara una variable. Ej: Definir x Como Entero;',
  COMO: 'Parte de la declaración. Ej: Definir x Como Entero;',
  ENTERO: 'Tipo numérico entero.',
  REAL: 'Tipo numérico con decimales.',
  LOGICO: 'Tipo booleano (Verdadero/Falso).',
  CARACTER: 'Tipo texto (cadena).',
  LEER: 'Lee un valor del usuario y lo guarda en una variable. Ej: Leer x;',
  ESCRIBIR: 'Imprime texto/variables. Separa con comas. Ej: Escribir "Hola", x;',
  SI: 'Condicional. Ej: Si x > 0 Entonces ... FinSi',
  ENTONCES: 'Marca el inicio del bloque del Si.',
  SINO: 'Bloque alternativo del Si.',
  FINSI: 'Cierra el condicional Si.',
  MIENTRAS: 'Bucle con condición. Ej: Mientras x < 10 Hacer ... FinMientras',
  HACER: 'Marca el inicio del bloque de Mientras.',
  FINMIENTRAS: 'Cierra el bucle Mientras.',
  VERDADERO: 'Literal lógico (true).',
  FALSO: 'Literal lógico (false).',
  Y: 'Operador lógico AND.',
  O: 'Operador lógico OR.',
  NO: 'Operador lógico NOT.',
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
      'Definir variable',
      'Definir ${1:variable} Como ${2|Entero,Real,Logico,Caracter|};',
      'Declara una variable.'
    ),
    mk('Leer', 'Leer ${1:variable};', 'Lee un valor para una variable.'),
    mk('Escribir', 'Escribir "${1:texto}";', 'Imprime texto en salida.'),
    mk('Escribir (texto + variable)', 'Escribir "${1:texto}", ${2:variable};', 'Imprime concatenando con coma.'),
    mk('Asignación <-', '${1:var} <- ${2:expresion};', 'Asigna el resultado de una expresión.'),
    mk('Asignación =', '${1:var} = ${2:expresion};', 'Asigna el resultado de una expresión (en este simulador).'),
    mk(
      'Si ... Entonces ... FinSi',
      ['Si ${1:condicion} Entonces', '\t$0', 'FinSi'].join('\n'),
      'Estructura condicional.'
    ),
    mk(
      'Si ... Sino ... FinSi',
      ['Si ${1:condicion} Entonces', '\t${2:// ...}', 'Sino', '\t$0', 'FinSi'].join('\n'),
      'Condicional con bloque alternativo.'
    ),
    mk(
      'Mientras ... Hacer ... FinMientras',
      ['Mientras ${1:condicion} Hacer', '\t$0', 'FinMientras'].join('\n'),
      'Bucle Mientras.'
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
          [/".*?"/, 'string'],
          [/\b(Verdadero|Falso)\b/i, 'constant'],
          [/\b(Entero|Real|Logico|Caracter)\b/i, 'type'],
          [
            /\b(Algoritmo|FinAlgoritmo|Definir|Como|Leer|Escribir|Si|Entonces|Sino|FinSi|Mientras|Hacer|FinMientras|Y|O|No)\b/i,
            'keyword',
          ],
          [/[0-9]+(\.[0-9]+)?/, 'number'],
          [/[a-zA-Z_ÁÉÍÓÚÜÑáéíóúüñ][\wÁÉÍÓÚÜÑáéíóúüñ]*/, 'identifier'],
          [/[()]/, '@brackets'],
          [/[+\-*/^=<>]/, 'operator'],
        ],
      },
    });

    monaco.languages.setLanguageConfiguration(languageId, {
      comments: { lineComment: '//' },
      brackets: [
        ['(', ')'],
      ],
      autoClosingPairs: [
        { open: '"', close: '"' },
        { open: '(', close: ')' },
      ],
      surroundingPairs: [
        { open: '"', close: '"' },
        { open: '(', close: ')' },
      ],
    });

    const snippets = makeSnippets(monaco);

    monaco.languages.registerCompletionItemProvider(languageId, {
      triggerCharacters: [' ', '<', '-', '"'],
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
    /** Evita que >= <= se vean como un solo símbolo (ligaduras) */
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
    const selection = ed.getSelection();
    if (!selection) return;
    ed.executeEdits('insert-snippet', [
      { range: selection, text, forceMoveMarkers: true },
    ]);
  }

  return { monaco, editor, insertSnippet };
}

