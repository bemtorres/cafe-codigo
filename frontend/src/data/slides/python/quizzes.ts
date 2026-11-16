import type { QuizQuestion, InteractionType } from '../../../types/slides';

export type { QuizQuestion, InteractionType };

// 🎯 LECCIÓN 1: INTRODUCCIÓN A PYTHON
export const introduccionQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿En Python la indentación (sangría) es solo estética y no altera el funcionamiento del código?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! La indentación en Python es obligatoria para definir la estructura de bloques.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Quién fue el creador del lenguaje Python y en qué año se lanzó públicamente?',
    options: [
      'Guido van Rossum (1991)',
      'James Gosling (1995)',
      'Dennis Ritchie (1972)',
      'Bjarne Stroustrup (1985)'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Guido van Rossum creó Python y lo lanzó en 1991.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué salida imprime esta instrucción en la consola?',
    code: `print("Python " * 3)`,
    options: ['Python 3', 'Python Python Python ', 'Error de tipos', 'PythonPythonPython'],
    correctOption: 1,
    explanation: '¡CORRECTO! Multiplicar un string por un entero repite la cadena ese número de veces.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Relaciona el término con su concepto correspondiente:',
    pairs: [
      { id: 'p1', left: 'REPL', right: 'Consola interactiva para probar código al instante' },
      { id: 'p2', left: 'Bytecode', right: 'Instrucciones intermedias (.pyc) ejecutadas por la PVM' },
      { id: 'p3', left: 'PEP 8', right: 'Guía oficial de estilo para escribir código Pythonista' }
    ],
    explanation: '¡EXCELENTE! Has conectado los conceptos clave de la arquitectura de Python.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué error producirá este código al ejecutarse?',
    code: `if True:\nprint("Hola")`,
    options: ['SyntaxError', 'IndentationError', 'TypeError', 'NameError'],
    correctOption: 1,
    explanation: '¡CORRECTO! Falta la sangría de 4 espacios dentro del bloque if.'
  }
];

// 🎯 LECCIÓN 2: VARIABLES E INPUTS
export const variablesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿La función input() devuelve siempre una cadena de texto (str)?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Para realizar operaciones numéricas se requiere int() o float().'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Cuál es la forma más limpia y moderna de inyectar variables dentro de un texto en Python?',
    options: ['f-strings: f"Hola {nombre}"', 'Concatenación: "Hola " + nombre', 'Format: "Hola {}".format(nombre)', 'Comas: print("Hola", nombre)'],
    correctOption: 0,
    explanation: '¡CORRECTO! Los f-strings ofrecen máxima velocidad y legibilidad.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué salida genera esta especificación de formato f-string?',
    code: `precio = 15.5\nprint(f"Total: \${precio:.2f}")`,
    options: ['Total: $15.5', 'Total: $15.50', 'Total: $15', 'Total: $15.500'],
    correctOption: 1,
    explanation: '¡CORRECTO! :.2f redondea y asegura exactamente 2 decimales.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa el código para convertir el año ingresado a entero:',
    code: `anio_txt = input("Año: ")\nanio = ____(anio_txt)`,
    options: ['int', 'float', 'str', 'bool'],
    correctOption: 0,
    explanation: '¡CORRECTO! int() convierte texto a entero.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Por qué este código arroja un TypeError?',
    code: `edad = input("Edad: ")\nsiguiente = edad + 1`,
    options: [
      'No se puede sumar un entero con un texto retornado por input() sin convertirlo previamente',
      'La variable edad debe ir en mayúsculas',
      'El signo + no existe en Python',
      'Falta la palabra clave let'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Debes hacer int(edad) antes de sumar numéricamente.'
  }
];

// 🎯 LECCIÓN 3: TEXTO Y CONVERSIONES
export const textoYConversionesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿Las cadenas de texto (str) en Python son inmutables?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! No se pueden modificar en el lugar (ej: s[0] = "A" falla).'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Qué método remueve espacios al inicio y al final de una cadena?',
    options: ['.strip()', '.clean()', '.trim()', '.cut()'],
    correctOption: 0,
    explanation: '¡CORRECTO! .strip() elimina espacios en blanco iniciales y finales.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué imprime s[:3] para s = "Python"?',
    code: `s = "Python"\nprint(s[:3])`,
    options: ['Pyt', 'Pyth', 'ytho', 'P'],
    correctOption: 0,
    explanation: '¡CORRECTO! s[:3] toma desde el índice 0 hasta antes del 3 (índices 0, 1 y 2).'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Asocia el método de cadenas con su propósito:',
    pairs: [
      { id: 'm1', left: 'upper()', right: 'Convierte el texto a MAYÚSCULAS' },
      { id: 'm2', left: 'isdigit()', right: 'Verifica si el string solo contiene números' },
      { id: 'm3', left: 'split(",")', right: 'Divide una cadena en lista por separador' }
    ],
    explanation: '¡PERFECTO! Has conectado los métodos de str.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (5/5) · FillInTheBlank',
    questionText: 'Completa la función para obtener la longitud de una cadena:',
    code: `cadena = "Hola"\ntotal = ____(cadena)`,
    options: ['len', 'count', 'size', 'length'],
    correctOption: 0,
    explanation: '¡CORRECTO! len() cuenta los caracteres.'
  }
];

// 🎯 LECCIÓN 4: CONDICIONALES
export const condicionalesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: 'En una evaluación con "or", ¿es suficiente con que una sola condición sea True para que la expresión completa resulte True?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Con or basta una condición True.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Cuál es la palabra clave en Python para encadenar condicionales alternativas (else if)?',
    options: ['elif', 'elseif', 'else if', 'case'],
    correctOption: 0,
    explanation: '¡CORRECTO! elif es la palabra reservada oficial en Python.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué resultado se imprimirá en consola?',
    code: `x = 10\nif x > 15:\n    print("A")\nelif x >= 10:\n    print("B")\nelse:\n    print("C")`,
    options: ['A', 'B', 'C', 'B y C'],
    correctOption: 1,
    explanation: '¡CORRECTO! 10 >= 10 es True en la primera coincidencia del elif.'
  },
  {
    id: 4,
    kind: 'FindTheBug',
    title: '🧪 Quiz (4/5) · FindTheBug',
    questionText: '¿Qué operador debe usarse para comparar igualdad de valores en un if?',
    code: `if nombre = "Ana":  # ❌ Error de sintaxis!`,
    options: ['== (doble igual)', '=', '===', 'is equal'],
    correctOption: 0,
    explanation: '¡CORRECTO! == es el operador de comparación, mientras que = asigna variables.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Quiz (5/5) · MatchPairs',
    questionText: 'Conecta cada operador con su significado:',
    pairs: [
      { id: 'o1', left: 'and', right: 'Todas las condiciones deben ser verdaderas' },
      { id: 'o2', left: 'not', right: 'Invierte el valor lógico (True -> False)' },
      { id: 'o3', left: '!=', right: 'Evalúa si dos valores son diferentes' }
    ],
    explanation: '¡EXCELENTE! Operadores lógicos y de comparación identificados.'
  }
];

// 🎯 LECCIÓN 5: MATCH / CASE
export const matchCaseQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿La estructura match/case requiere la instrucción "break" al final de cada caso para evitar el fall-through?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! En Python match/case no requiere break; sale automáticamente al ejecutar el case coincidente.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Qué símbolo actúa como comodín por defecto (default) en un bloque match/case?',
    options: ['case _:', 'case default:', 'case *:', 'case else:'],
    correctOption: 0,
    explanation: '¡CORRECTO! `case _:` es el wildcard por defecto.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué imprime este código?',
    code: `codigo = 404\nmatch codigo:\n    case 200 | 201: print("OK")\n    case 404: print("No encontrado")\n    case _: print("Otro")`,
    options: ['OK', 'No encontrado', 'Otro', 'SyntaxError'],
    correctOption: 1,
    explanation: '¡CORRECTO! 404 coincide con el segundo case.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: '¿Qué versión mínima de Python se requiere para usar match/case?',
    options: ['Python 3.10', 'Python 3.6', 'Python 3.8', 'Python 2.7'],
    correctOption: 0,
    explanation: '¡CORRECTO! Fue introducido en Python 3.10 (PEP 634).'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Quiz (5/5) · MatchPairs',
    questionText: 'Relaciona la sintaxis de match/case:',
    pairs: [
      { id: 'mc1', left: 'case A | B:', right: 'Agrupa dos alternativas en un solo caso (OR)' },
      { id: 'mc2', left: 'case x if x > 10:', right: 'Guarda condicional con cláusula if' },
      { id: 'mc3', left: 'case _:', right: 'Comodín que captura cualquier valor restante' }
    ],
    explanation: '¡PERFECTO! Dominas la sintaxis moderna de pattern matching.'
  }
];

// 🎯 LECCIÓN 6: BUCLES
export const buclesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'PredictOutput',
    title: '🧪 Quiz (1/5) · PredictOutput',
    questionText: '¿Cuántas iteraciones realizará este bucle for?',
    code: `for i in range(1, 5):\n    print(i)`,
    options: ['4 iteraciones (1, 2, 3, 4)', '5 iteraciones (1, 2, 3, 4, 5)', '3 iteraciones', '4 iteraciones (0, 1, 2, 3)'],
    correctOption: 0,
    explanation: '¡CORRECTO! range(1, 5) incluye 1, 2, 3 y 4. El límite final 5 no se incluye.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Qué instrucción salta la iteración actual y pasa inmediatamente a la siguiente vuelta del bucle?',
    options: ['continue', 'break', 'pass', 'skip'],
    correctOption: 0,
    explanation: '¡CORRECTO! continue salta al siguiente ciclo.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Quiz (3/5) · TrueFalse',
    questionText: '¿La cláusula else en un bucle for/while se ejecuta si el bucle fue interrumpido con un break?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! El else del bucle se ejecuta SOLO si el bucle terminó sin haber encontrado un break.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa la instrucción para detener un bucle while de forma inmediata:',
    code: `while True:\n    if listo:\n        ____  # Detener bucle`,
    options: ['break', 'continue', 'exit', 'stop'],
    correctOption: 0,
    explanation: '¡CORRECTO! break interrumpe y cancela el bucle.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Por qué este bucle se vuelve infinito?',
    code: `c = 1\nwhile c <= 5:\n    print(c)`,
    options: ['Falta incrementar la variable c (ej: c += 1) dentro del bloque', 'while no acepta <=', 'Falta los dos puntos :', 'c debe ser string'],
    correctOption: 0,
    explanation: '¡CORRECTO! Si no actualizas la variable de control, la condición siempre será True.'
  }
];

// 🎯 LECCIÓN 7: LISTAS Y TUPLAS
export const listasQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿Las tuplas en Python son inmutables y no permiten modificar sus elementos tras ser creadas?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Intentar modificar `tupla[0] = 5` lanzará un TypeError.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Qué método agrega un elemento al final de una lista?',
    options: ['.append()', '.push()', '.add()', '.insert()'],
    correctOption: 0,
    explanation: '¡CORRECTO! .append() agrega un item al final.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué elemento retorna frutas[-1] para `frutas = ["a", "b", "c"]`?',
    code: `frutas = ["a", "b", "c"]\nprint(frutas[-1])`,
    options: ['c', 'a', 'b', 'IndexError'],
    correctOption: 0,
    explanation: '¡CORRECTO! Los índices negativos cuentan desde el final. -1 es el último elemento ("c").'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Relaciona el método de listas:',
    pairs: [
      { id: 'l1', left: 'pop()', right: 'Elimina y retorna el último elemento' },
      { id: 'l2', left: 'sort()', right: 'Ordena la lista en el lugar (in-place)' },
      { id: 'l3', left: 'remove(val)', right: 'Elimina la primera ocurrencia de un valor' }
    ],
    explanation: '¡EXCELENTE! Métodos de listas repasados.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (5/5) · FillInTheBlank',
    questionText: 'Completa la sintaxis para desempaquetar la tupla punto:',
    code: `punto = (10, 20)\nx, ____ = punto`,
    options: ['y', 'z', 'val', 'point'],
    correctOption: 0,
    explanation: '¡CORRECTO! x, y asigna 10 a x y 20 a y.'
  }
];

// 🎯 LECCIÓN 8: DICCIONARIOS
export const diccionariosQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Qué método de diccionario permite consultar una clave evitando errores tipo KeyError si no existe?',
    options: ['.get()', '.find()', '.fetch()', '.search()'],
    correctOption: 0,
    explanation: '¡CORRECTO! .get("clave", por_defecto) no rompe el programa si la clave no existe.'
  },
  {
    id: 2,
    kind: 'PredictOutput',
    title: '🧪 Quiz (2/5) · PredictOutput',
    questionText: '¿Qué imprime este bucle?',
    code: `d = {"a": 1, "b": 2}\nfor k, v in d.items():\n    if k == "b": print(v)`,
    options: ['2', 'b', '1', 'KeyError'],
    correctOption: 0,
    explanation: '¡CORRECTO! .items() retorna pares (clave, valor). Para "b" su valor es 2.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Quiz (3/5) · TrueFalse',
    questionText: '¿Las claves de un diccionario en Python pueden ser listas mutables?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! Las claves deben ser inmutables (strings, números, tuplas).'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa el método para obtener solo las claves de un diccionario:',
    code: `usuario = {"nom": "Ana"}\nks = usuario.____()`,
    options: ['keys', 'values', 'items', 'get'],
    correctOption: 0,
    explanation: '¡CORRECTO! .keys() retorna la vista de claves.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué excepción ocurre al ejecutar `datos["inexistente"]` sin usar `.get()`?',
    code: `datos = {"a": 1}\nval = datos["b"]`,
    options: ['KeyError', 'IndexError', 'ValueError', 'TypeError'],
    correctOption: 0,
    explanation: '¡CORRECTO! Buscar una clave inexistente con corchetes lanza KeyError.'
  }
];

// 🎯 LECCIÓN 9: FUNCIONES
export const funcionesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Qué devuelve explícitamente una función en Python si no incluye la palabra clave `return`?',
    options: ['None', '0', 'False', 'Undefined'],
    correctOption: 0,
    explanation: '¡CORRECTO! Sin return, la función retorna el valor especial None.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Quiz (2/5) · TrueFalse',
    questionText: '¿Las variables creadas dentro de una función son accesibles desde fuera de ella (scope global)?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! Las variables locales solo existen durante la ejecución de la función.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Quiz (3/5) · PredictOutput',
    questionText: '¿Qué resultado devuelve esta función lambda?',
    code: `doble = lambda x: x * 2\nprint(doble(7))`,
    options: ['14', '7', 'x * 2', 'TypeError'],
    correctOption: 0,
    explanation: '¡CORRECTO! lambda x: x * 2 multiplica el argumento por 2.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa la palabra clave para definir una función:',
    code: `____ sumar(a, b):\n    return a + b`,
    options: ['def', 'function', 'fn', 'func'],
    correctOption: 0,
    explanation: '¡CORRECTO! `def` declara funciones en Python.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Quiz (5/5) · MatchPairs',
    questionText: 'Asocia el término de funciones:',
    pairs: [
      { id: 'f1', left: 'def', right: 'Palabra clave de declaración' },
      { id: 'f2', left: 'return', right: 'Devuelve un resultado y finaliza la función' },
      { id: 'f3', left: 'docstring', right: 'Documentación multilínea """..."""' }
    ],
    explanation: '¡PERFECTO! Elementos de funciones repasados.'
  }
];

// 🎯 LECCIÓN 10: TRY / EXCEPT
export const tryExceptQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Qué bloque se ejecuta SIEMPRE en un try/except, independientemente de si ocurrió una excepción o no?',
    options: ['finally', 'else', 'except', 'catch'],
    correctOption: 0,
    explanation: '¡CORRECTO! `finally` se ejecuta siempre para limpieza de recursos.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Quiz (2/5) · TrueFalse',
    questionText: '¿El bloque `else` dentro de un try/except corre únicamente cuando NO ocurrieron excepciones?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! `else` se ejecuta si la rama `try` terminó sin errores.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (3/5) · FillInTheBlank',
    questionText: 'Completa la instrucción para lanzar manualmente una excepción:',
    code: `if edad < 0:\n    ____ ValueError("Edad inválida")`,
    options: ['raise', 'throw', 'error', 'emit'],
    correctOption: 0,
    explanation: '¡CORRECTO! `raise` dispara excepciones en Python.'
  },
  {
    id: 4,
    kind: 'PredictOutput',
    title: '🧪 Quiz (4/5) · PredictOutput',
    questionText: '¿Qué mensaje se imprimirá?',
    code: `try:\n    n = int("abc")\nexcept ValueError:\n    print("Error de conversion")`,
    options: ['Error de conversion', 'ValueError', 'abc', 'Ninguno'],
    correctOption: 0,
    explanation: '¡CORRECTO! int("abc") lanza ValueError y el except imprime "Error de conversion".'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué excepción se produce al dividir entre cero en Python?',
    options: ['ZeroDivisionError', 'ArithmeticError', 'DivideByZeroException', 'NullPointerError'],
    correctOption: 0,
    explanation: '¡CORRECTO! ZeroDivisionError es la excepción oficial de Python.'
  }
];

// 🎯 LECCIÓN 11: LIST COMPREHENSION
export const listComprehensionQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'PredictOutput',
    title: '🧪 Quiz (1/5) · PredictOutput',
    questionText: '¿Qué lista genera esta expresión?',
    code: `res = [x * 2 for x in range(3)]\nprint(res)`,
    options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[1, 2, 3]'],
    correctOption: 0,
    explanation: '¡CORRECTO! range(3) es 0, 1, 2. Multiplicados por 2 genera [0, 2, 4].'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Dónde se coloca la cláusula `if` para filtrar elementos en una List Comprehension?',
    options: [
      'Al final de la expresión: `[x for x in lista if x > 0]`',
      'Al inicio: `[if x > 0 x for x in lista]`',
      'Fuera de los corchetes',
      'Python no permite filtros en List Comprehension'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! El filtro if va al final dentro de los corchetes.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Quiz (3/5) · TrueFalse',
    questionText: '¿List Comprehension es generalmente más rápida y limpia que construir listas con un bucle for y .append()?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Está optimizada a nivel de bytecode en Python.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa la sintaxis para extraer números pares:',
    code: `pares = [n for n in range(10) if n % 2 ____ 0]`,
    options: ['==', '=', 'is', 'equals'],
    correctOption: 0,
    explanation: '¡CORRECTO! == evalúa si el resto es igual a 0.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Quiz (5/5) · MatchPairs',
    questionText: 'Asocia el tipo de comprensión:',
    pairs: [
      { id: 'lc1', left: '[x for x in items]', right: 'List Comprehension (retorna list)' },
      { id: 'lc2', left: '{k: v for k, v in items}', right: 'Dict Comprehension (retorna dict)' },
      { id: 'lc3', left: '{x for x in items}', right: 'Set Comprehension (retorna set sin duplicados)' }
    ],
    explanation: '¡EXCELENTE! Tipos de comprensión identificados.'
  }
];

// 🎯 LECCIÓN 12: PROYECTO SALAS DE CINE
export const practicaRegistrosCineQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Qué estructura de datos es idónea para representar la grilla 2D de asientos del cine?',
    options: ['Lista de listas (matriz 2D)', 'Un solo número entero', 'Un string plano', 'Una tupla inmutable'],
    correctOption: 0,
    explanation: '¡CORRECTO! Las listas anidadas representan filas y columnas.'
  },
  {
    id: 2,
    kind: 'PredictOutput',
    title: '🧪 Quiz (2/5) · PredictOutput',
    questionText: 'Si `asientos[0][1] = "X"`, ¿qué posición se modificó?',
    options: ['Fila 1, Asiento 2 (base 0)', 'Fila 2, Asiento 1', 'Fila 0, Asiento 0', 'Fila 1, Asiento 1'],
    correctOption: 0,
    explanation: '¡CORRECTO! Índice 0 es la primera fila e índice 1 es el segundo asiento.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Quiz (3/5) · TrueFalse',
    questionText: '¿Debemos restar 1 a la fila ingresada por el usuario para convertir su opción de base 1 a índice de lista base 0?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Los usuarios piensan en base 1, las listas en Python usan base 0.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa la creación de una fila de 4 asientos libres:',
    code: `fila = ["O"] ____ 4`,
    options: ['*', '+', 'x', '**'],
    correctOption: 0,
    explanation: '¡CORRECTO! ["O"] * 4 repite la lista creando ["O", "O", "O", "O"].'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué error ocurrirá si el usuario pide la fila 10 en una matriz de 3 filas?',
    options: ['IndexError', 'ValueError', 'KeyError', 'TypeError'],
    correctOption: 0,
    explanation: '¡CORRECTO! Acceder a un índice mayor al tamaño de la lista causa IndexError.'
  }
];

// 🎯 LECCIÓN 13: PROYECTO CRUD EXPENDEDORA
export const crudProductosExpendedoraQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MatchPairs',
    title: '🧪 Quiz (1/5) · MatchPairs',
    questionText: 'Asocia las siglas del patrón CRUD con su función:',
    pairs: [
      { id: 'c1', left: 'Create', right: 'Agregar nuevos productos al catálogo' },
      { id: 'c2', left: 'Read', right: 'Listar y consultar productos' },
      { id: 'c3', left: 'Update', right: 'Modificar precio o reponer stock' },
      { id: 'c4', left: 'Delete', right: 'Eliminar productos descontinuados' }
    ],
    explanation: '¡PERFECTO! Operaciones CRUD identificadas.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Quiz (2/5) · TrueFalse',
    questionText: '¿El método `.pop("A1")` en un diccionario borra la clave y retorna su contenido?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! `.pop()` elimina y devuelve la entidad.'
  },
  {
    id: 3,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (3/5) · MultipleChoice',
    questionText: '¿Cómo verificamos si un código de producto ya existe en el inventario antes de agregarlo?',
    options: ['if codigo in inventario:', 'if inventario.has(codigo):', 'if codigo == inventario:', 'if inventario.contains(codigo):'],
    correctOption: 0,
    explanation: '¡CORRECTO! El operador `in` verifica existencia de claves en diccionarios.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa para normalizar el código ingresado a mayúsculas sin espacios:',
    code: `cod = input("Código: ").strip().____()`,
    options: ['upper', 'lower', 'capitalize', 'title'],
    correctOption: 0,
    explanation: '¡CORRECTO! .upper() convierte las letras a mayúsculas.'
  },
  {
    id: 5,
    kind: 'PredictOutput',
    title: '🧪 Quiz (5/5) · PredictOutput',
    questionText: '¿Qué hace `inv["A1"]["stock"] += 5`?',
    options: ['Suma 5 unidades al stock del producto A1', 'Crea una lista con 5', 'Reemplaza el precio por 5', 'Lanza un error de sintaxis'],
    correctOption: 0,
    explanation: '¡CORRECTO! Accede a la propiedad anidada stock y la incrementa en 5.'
  }
];

// 🎯 LECCIÓN 14: POO
export const pooQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Cuál es el nombre del método constructor especial que se ejecuta automáticamente al instanciar un objeto?',
    options: ['__init__', '__construct__', 'new', 'init'],
    correctOption: 0,
    explanation: '¡CORRECTO! __init__ es el constructor oficial en Python.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Quiz (2/5) · TrueFalse',
    questionText: '¿El primer parámetro de todos los métodos de instancia en una clase debe ser obligatoriamente `self`?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! `self` hace referencia a la instancia concreta sobre la cual se opera.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (3/5) · FillInTheBlank',
    questionText: 'Completa la palabra reservada para crear una plantilla de objeto:',
    code: `____ Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre`,
    options: ['class', 'struct', 'object', 'interface'],
    correctOption: 0,
    explanation: '¡CORRECTO! `class` define la estructura en POO.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Asocia el pilar de la POO:',
    pairs: [
      { id: 'p1', left: 'Encapsulamiento', right: 'Protección de atributos internos con guiones bajos (_ y __)' },
      { id: 'p2', left: 'Herencia', right: 'Creación de subclases que heredan estado y comportamiento de un padre' },
      { id: 'p3', left: 'Polimorfismo', right: 'Sobrescritura de métodos para respuestas personalizadas' }
    ],
    explanation: '¡PERFECTO! Pilares POO repasados.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué error ocurrirá si llamas a un atributo privado `__password` desde fuera de la clase?',
    options: ['AttributeError', 'TypeError', 'PrivateError', 'KeyError'],
    correctOption: 0,
    explanation: '¡CORRECTO! Name mangling hace que acceder a `obj.__password` lance AttributeError.'
  }
];

// 🎯 LECCIÓN 15: MÓDULOS Y PIP
export const modulosQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Qué es PyPI?',
    options: ['El repositorio oficial centralizado de paquetes de software en Python', 'Un compilador de C++', 'El IDE oficial de Python', 'Un comando de Linux'],
    correctOption: 0,
    explanation: '¡CORRECTO! PyPI es el Python Package Index.'
  },
  {
    id: 2,
    kind: 'PredictOutput',
    title: '🧪 Quiz (2/5) · PredictOutput',
    questionText: '¿Qué comando genera un archivo requirements.txt con las librerías instaladas?',
    options: ['pip freeze > requirements.txt', 'pip export requirements.txt', 'pip save requirements.txt', 'python requirements.txt'],
    correctOption: 0,
    explanation: '¡CORRECTO! `pip freeze > requirements.txt` vuelca las dependencias.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Quiz (3/5) · TrueFalse',
    questionText: '¿Cualquier archivo .py guardado en la carpeta de tu proyecto se puede importar como un módulo?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! En Python cualquier script .py es un módulo importable.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa el comando para instalar un paquete desde PyPI:',
    code: `____ install requests`,
    options: ['pip', 'python', 'npm', 'get'],
    correctOption: 0,
    explanation: '¡CORRECTO! `pip install` descarga e instala paquetes.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Quiz (5/5) · MatchPairs',
    questionText: 'Relaciona la librería estándar con su función:',
    pairs: [
      { id: 'm1', left: 'math', right: 'Funciones matemáticas (sqrt, pi, ceil)' },
      { id: 'm2', left: 'random', right: 'Generación de números y selecciones aleatorias' },
      { id: 'm3', left: 'datetime', right: 'Manejo de fechas, horas y deltas' }
    ],
    explanation: '¡EXCELENTE! Librerías estándar reconocidas.'
  }
];

// 🎯 LECCIÓN 16: ENTORNOS VIRTUALES
export const entornosVirtualesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿La carpeta .venv generada por un entorno virtual debe incluirse siempre en el repositorio Git?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! La carpeta .venv debe agregarse a .gitignore; solo se sube requirements.txt.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Qué comando nativo de Python 3 crea un nuevo entorno virtual llamado .venv?',
    options: ['python -m venv .venv', 'pip create .venv', 'python new venv', 'virtualenv make .venv'],
    correctOption: 0,
    explanation: '¡CORRECTO! `python -m venv .venv` es el comando oficial.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (3/5) · FillInTheBlank',
    questionText: 'Completa la instrucción para desactivar un entorno virtual activo:',
    code: `(.venv) PS C:\\mi_app> ____`,
    options: ['deactivate', 'exit', 'stop', 'quit'],
    correctOption: 0,
    explanation: '¡CORRECTO! `deactivate` sale del entorno virtual.'
  },
  {
    id: 4,
    kind: 'PredictOutput',
    title: '🧪 Quiz (4/5) · PredictOutput',
    questionText: '¿Cómo sabes en la terminal que un entorno virtual está activo?',
    options: ['Aparece el prefijo (.venv) al inicio del prompt', 'La pantalla cambia a color verde', 'Python muestra un mensaje sonoro', 'Se abre una nueva ventana de navegador'],
    correctOption: 0,
    explanation: '¡CORRECTO! El prompt de la terminal antepone `(.venv)`.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Quiz (5/5) · MatchPairs',
    questionText: 'Relaciona el comando con su objetivo:',
    pairs: [
      { id: 'ev1', left: 'python -m venv .venv', right: 'Crea el entorno virtual aislado' },
      { id: 'ev2', left: 'pip install -r requirements.txt', right: 'Instala todas las dependencias del proyecto' },
      { id: 'ev3', left: 'deactivate', right: 'Desactiva el entorno y regresa al Python global' }
    ],
    explanation: '¡EXCELENTE! Comandos de venv aprendidos.'
  }
];

// 🎯 LECCIÓN 17: MANEJO DE ARCHIVOS
export const manejoArchivosQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Qué modo de apertura debes usar con open() si deseas agregar datos al final sin borrar el contenido anterior?',
    options: ["'a' (append)", "'w' (write)", "'r' (read)", "'x' (exclusive)"],
    correctOption: 0,
    explanation: "¡CORRECTO! El modo 'a' anexa datos al final sin borrar nada."
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Quiz (2/5) · TrueFalse',
    questionText: '¿El bloque `with open(...) as f:` asegura que el archivo se cierre automáticamente al terminar, incluso si ocurre un error?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! `with` actúa como context manager garantizando el cierre del recurso.'
  },
  {
    id: 3,
    kind: 'FindTheBug',
    title: '🧪 Quiz (3/5) · FindTheBug',
    questionText: '¿Qué excepción se lanza si intentas abrir en modo lectura ("r") un archivo que no existe en el disco?',
    options: ['FileNotFoundError', 'KeyError', 'IndexError', 'IOClosedError'],
    correctOption: 0,
    explanation: '¡CORRECTO! FileNotFoundError es la excepción arrojada por open() en modo r.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (4/5) · FillInTheBlank',
    questionText: 'Completa el parámetro recomendado para garantizar soporte de tildes y caracteres especiales:',
    code: `with open("archivo.txt", "w", encoding="____") as f:`,
    options: ['utf-8', 'ascii', 'latin1', 'binary'],
    correctOption: 0,
    explanation: '¡CORRECTO! encoding="utf-8" soporta caracteres internacionales.'
  },
  {
    id: 5,
    kind: 'PredictOutput',
    title: '🧪 Quiz (5/5) · PredictOutput',
    questionText: '¿Qué hace el modo "w"?',
    options: ['Sobrescribe completamente el archivo o lo crea si no existe', 'Lee el archivo sin modificarlo', 'Lanza un error si el archivo ya existe', 'Imprime el contenido en consola'],
    correctOption: 0,
    explanation: '¡CORRECTO! El modo "w" trunca (borra) el archivo previo antes de escribir.'
  }
];

// 🎯 LECCIÓN 18: SEGURIDAD Y CALIDAD: BANDIT + SONARQUBE
export const seguridadBanditSonarqubeQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (1/5) · MultipleChoice',
    questionText: '¿Cuál es la función principal de la herramienta Bandit en Python?',
    options: ['Escanear el código en busca de fallas y vulnerabilidades de seguridad (SAST)', 'Formatear espacios e indentaciones', 'Compilar el código a ejecutable .exe', 'Ejecutar pruebas unitarias'],
    correctOption: 0,
    explanation: '¡CORRECTO! Bandit es un analizador estático enfocado en ciberseguridad para Python.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Quiz (2/5) · TrueFalse',
    questionText: '¿Usar eval(input(...)) se considera una práctica insegura susceptible a Ejecución Remota de Código (RCE)?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! eval() ejecuta cualquier instrucción arbitraria que el usuario introduzca.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (3/5) · FillInTheBlank',
    questionText: 'Completa el comando para ejecutar un escaneo recursivo de seguridad con Bandit:',
    code: `bandit -r ____`,
    options: ['.', 'main.py', 'all', 'scan'],
    correctOption: 0,
    explanation: '¡CORRECTO! `bandit -r .` escanea recursivamente el directorio actual.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Asocia cada herramienta de calidad:',
    pairs: [
      { id: 's1', left: 'Bandit', right: 'Escáner de seguridad y vulnerabilidades (SAST)' },
      { id: 's2', left: 'Black', right: 'Formateador automático de código según PEP 8' },
      { id: 's3', left: 'SonarQube', right: 'Plataforma para medir Deuda Técnica, Smells y Cobertura' }
    ],
    explanation: '¡PERFECTO! Herramientas de calidad identificadas.'
  },
  {
    id: 5,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (5/5) · MultipleChoice',
    questionText: '¿Dónde se deben almacenar las contraseñas y claves API en lugar de dejarlas en el código fuente (hardcoded)?',
    options: ['En Variables de Entorno (ej. con os.getenv)', 'En comentarios del archivo .py', 'En el nombre de la variable', 'En un string global'],
    correctOption: 0,
    explanation: '¡CORRECTO! Cargar secretos desde Variables de Entorno es una regla de oro de ciberseguridad.'
  }
];

// 🌐 MAPEO CENTRALIZADO DE QUIZ SEGÚN LECCIÓN
export function getQuizForLesson(lessonSlug: string): QuizQuestion[] {
  switch (lessonSlug) {
    case 'introduccion': return introduccionQuiz;
    case 'variables': return variablesQuiz;
    case 'texto-y-conversiones': return textoYConversionesQuiz;
    case 'condicionales': return condicionalesQuiz;
    case 'match-case': return matchCaseQuiz;
    case 'bucles': return buclesQuiz;
    case 'listas': return listasQuiz;
    case 'diccionarios': return diccionariosQuiz;
    case 'funciones': return funcionesQuiz;
    case 'try-except': return tryExceptQuiz;
    case 'list-comprehension': return listComprehensionQuiz;
    case 'practica-registros-cine': return practicaRegistrosCineQuiz;
    case 'crud-productos-expendedora': return crudProductosExpendedoraQuiz;
    case 'poo': return pooQuiz;
    case 'modulos': return modulosQuiz;
    case 'entornos-virtuales': return entornosVirtualesQuiz;
    case 'manejo-archivos': return manejoArchivosQuiz;
    case 'seguridad-bandit-sonarqube': return seguridadBanditSonarqubeQuiz;
    default: return introduccionQuiz;
  }
}
