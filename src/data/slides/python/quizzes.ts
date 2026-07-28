import type { QuizQuestion, InteractionType } from '../../../types/slides';

export type { QuizQuestion, InteractionType };

// 🎯 BANCO DE QUIZ 1: TEXTO Y CONVERSIONES
export const textoYConversionesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/10) · TrueFalse',
    questionText: '¿La función input() en Python siempre devuelve una cadena de texto (str), sin importar lo que el usuario escriba?',
    code: `num = input("Ingresa tu número de identificación: ")\nprint(type(num))  # ¿Es siempre <class 'str'>?`,
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! En Python, input() siempre retorna un str. Para tratar la entrada como entero debes convertirlo explícitamente con int().'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/10) · MultipleChoice',
    questionText: '¿Qué expresión en Python extrae exactamente los primeros 3 caracteres del texto s = "Python"?',
    code: `s = "Python"\nsub = s[ :3 ]  # Queremos obtener "Pyt"`,
    options: ['s[1:3]', 's[:3]', 's[3:]', 's[0,3]'],
    correctOption: 1,
    explanation: '¡CORRECTO! s[:3] toma desde el índice 0 hasta antes del 3 (índices 0, 1 y 2).'
  },
  {
    id: 3,
    kind: 'ReorderSequence',
    title: '🧪 Quiz (3/10) · ReorderSequence',
    questionText: 'Toca los bloques en orden para construir la instrucción de lectura y limpieza de datos:',
    tokens: ['.strip()', 'usuario =', 'input("Usuario: ")', '.lower()'],
    correctOrder: ['usuario =', 'input("Usuario: ")', '.strip()', '.lower()'],
    explanation: '¡EXCELENTE! La secuencia asigna la variable, ejecuta el input y aplica la limpieza en cadena.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/10) · MatchPairs',
    questionText: 'Toca un método de la izquierda y luego su definición correcta a la derecha:',
    pairs: [
      { id: 'p1', left: 'len(s)', right: 'Cuenta el total de caracteres' },
      { id: 'p2', left: '.strip()', right: 'Remueve espacios al inicio y al final' },
      { id: 'p3', left: '.upper()', right: 'Transforma el texto a MAYÚSCULAS' },
      { id: 'p4', left: '.isdigit()', right: 'Verifica si el texto es solo numérico' }
    ],
    explanation: '¡PERFECTO! Has conectado cada método de Python con su función correspondiente.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (5/10) · FillInTheBlank',
    questionText: 'Completa la función requerida para convertir el texto "150" a un número entero:',
    code: `num_txt = "150"\nnum_int = ____(num_txt)  # ¿Qué función convierte a entero?`,
    options: ['int', 'str', 'bool', 'float'],
    correctOption: 0,
    explanation: '¡CORRECTO! int("150") convierte el texto a número entero en Python.'
  },
  {
    id: 6,
    kind: 'PredictOutput',
    title: '🧪 Quiz (6/10) · PredictOutput',
    questionText: '¿Cuál será la salida exacta impresa en consola al ejecutar este código?',
    code: `s = "Café y Código"\nprint(len(s))`,
    options: ['10', '12', '13', '15'],
    correctOption: 2,
    explanation: '¡CORRECTO! len() cuenta letras, tildes y espacios en blanco. "Café y Código" tiene 13 caracteres.'
  },
  {
    id: 7,
    kind: 'FindTheBug',
    title: '🧪 Quiz (7/10) · FindTheBug',
    questionText: '¿Por qué este código genera un error tipo TypeError al ejecutarse?',
    code: `edad = input("Tu edad: ")\ntotal = edad + 10  # ❌ TypeError!`,
    options: [
      'Falta un paréntesis en print',
      'input() devuelve str y no se puede sumar un str con un int',
      'La función input() no existe en Python 3',
      'La variable edad debe escribirse en mayúsculas'
    ],
    correctOption: 1,
    explanation: '¡CORRECTO! Debes convertir la entrada con int(edad) antes de realizar sumas numéricas.'
  },
  {
    id: 8,
    kind: 'TrueFalse',
    title: '🧪 Quiz (8/10) · TrueFalse (Sí / No)',
    questionText: '¿Las cadenas de texto en Python se pueden modificar directamente sobre el mismo índice (ej: s[0] = "H")?',
    code: `s = "hola"\ns[0] = "H"  # ¿Es esto permitido en Python?`,
    correctAnswer: false,
    labels: { trueText: 'SÍ', falseText: 'NO' },
    explanation: '¡CORRECTO! NO se puede. Las cadenas en Python son inmutables. Para cambiar una letra debes crear una nueva cadena.'
  },
  {
    id: 9,
    kind: 'ReorderSequence',
    title: '🧪 Quiz (9/10) · ReorderSequence',
    questionText: 'Ordena las fichas para construir un f-string de correo corporativo @cafeycodigo.org:',
    tokens: ['f"{nom[:3]}', '@cafeycodigo.org"', 'correo =', '.{anio}', '}"'],
    correctOrder: ['correo =', 'f"{nom[:3]}', '.{anio}', '@cafeycodigo.org"', '}"'],
    explanation: '¡FANTÁSTICO! Los f-strings permiten interpolar variables y rebanadas (slicing) fácilmente.'
  },
  {
    id: 10,
    kind: 'MatchPairs',
    title: '🧪 Quiz (10/10) · MatchPairs',
    questionText: 'Conecta cada expresión con su resultado de evaluación booleana o tipo de dato:',
    pairs: [
      { id: 'm1', left: 'type("123")', right: "<class 'str'>" },
      { id: 'm2', left: 'type(123)', right: "<class 'int'>" },
      { id: 'm3', left: 'bool("")', right: 'False' },
      { id: 'm4', left: 'bool("hola")', right: 'True' }
    ],
    explanation: '¡EXCELENTE! Dominas los tipos de datos, inspección con type() y evaluación booleana.'
  }
];

// 🎯 BANCO DE QUIZ 2: CONDICIONALES
export const condicionalesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/10) · TrueFalse',
    questionText: '¿En Python, la instrucción else requiere escribir una condición lógica propia después del signo dos puntos?',
    code: `edad = 20\nif edad >= 18:\n    print("Mayor")\nelse:  # ¿Puede llevar condición aquí?\n    print("Menor")`,
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! else NO acepta condiciones. Se ejecuta automáticamente cuando la condición previa es False.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/10) · MultipleChoice',
    questionText: '¿Qué palabra reservada se utiliza en Python para encadenar condiciones secuenciales alternativas?',
    options: ['elseif', 'else if', 'elif', 'then'],
    correctOption: 2,
    explanation: '¡CORRECTO! En Python la palabra exacta es elif (abreviatura de else if).'
  },
  {
    id: 3,
    kind: 'ReorderSequence',
    title: '🧪 Quiz (3/10) · ReorderSequence',
    questionText: 'Toca los bloques en orden para construir la estructura condicional de verificación de mayoría de edad:',
    tokens: ['print("Aprobado")', 'edad = 20', 'if edad >= 18:', 'else:'],
    correctOrder: ['edad = 20', 'if edad >= 18:', 'print("Aprobado")', 'else:'],
    explanation: '¡EXCELENTE! Primero asignas la variable, luego abres el if, ejecutas su bloque e incluyes el else.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/10) · MatchPairs',
    questionText: 'Conecta cada operador condicional con su función matemática/lógica:',
    pairs: [
      { id: 'p1', left: '==', right: 'Compara si dos valores son iguales' },
      { id: 'p2', left: '!=', right: 'Verifica si dos valores son distintos' },
      { id: 'p3', left: 'and', right: 'Exige que ambas condiciones sean True' },
      { id: 'p4', left: 'or', right: 'Requiere que al menos una sea True' }
    ],
    explanation: '¡PERFECTO! Has vinculado los operadores relacionales y lógicos con sus definiciones.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (5/10) · FillInTheBlank',
    questionText: 'Completa el operador lógico requerido para invertir el resultado booleano (convertir False a True):',
    code: `conectado = False\nif ____ conectado:\n    print("Por favor inicia sesión")`,
    options: ['not', 'no', 'invert', 'false'],
    correctOption: 0,
    explanation: '¡CORRECTO! not False se evalúa como True en la condición.'
  },
  {
    id: 6,
    kind: 'PredictOutput',
    title: '🧪 Quiz (6/10) · PredictOutput',
    questionText: '¿Cuál será la salida impresa exacta en consola al ejecutar este código?',
    code: `x = 15\nif x > 10 and x < 20:\n    print("En rango")\nelse:\n    print("Fuera de rango")`,
    options: ['En rango', 'Fuera de rango', 'SyntaxError', 'Ninguna salida'],
    correctOption: 0,
    explanation: '¡CORRECTO! 15 > 10 es True y 15 < 20 es True. True and True resulta True.'
  },
  {
    id: 7,
    kind: 'FindTheBug',
    title: '🧪 Quiz (7/10) · FindTheBug',
    questionText: '¿Por qué este código genera un IndentationError al ejecutarse?',
    code: `temperatura = 35\nif temperatura > 30:\nprint("Hace calor")  # ❌ IndentationError!`,
    options: [
      'La variable temperatura no lleva comillas',
      'El print debe llevar 4 espacios de sangría (indentación) bajo el if',
      'El número 30 debe ser un string "30"',
      'Falta la palabra clave else'
    ],
    correctOption: 1,
    explanation: '¡CORRECTO! En Python los bloques dentro de un if DEBEN llevar indentación (sangría).'
  },
  {
    id: 8,
    kind: 'TrueFalse',
    title: '🧪 Quiz (8/10) · TrueFalse (Sí / No)',
    questionText: '¿En una evaluación con or, si la primera condición es True, Python ejecuta el bloque sin evaluar la segunda?',
    code: `dia = "sábado"\nif dia == "sábado" or dia == "domingo":\n    print("Fin de semana")`,
    correctAnswer: true,
    labels: { trueText: 'SÍ', falseText: 'NO' },
    explanation: '¡CORRECTO! Se le conoce como evaluación de cortocircuito (short-circuit evaluation).'
  },
  {
    id: 9,
    kind: 'ReorderSequence',
    title: '🧪 Quiz (9/10) · ReorderSequence',
    questionText: 'Ordena los bloques para construir la verificación de descuento para estudiante O jubilado:',
    tokens: ['if es_estudiante', 'print("Aplica descuento")', 'or es_jubilado:', 'descuento = True'],
    correctOrder: ['if es_estudiante', 'or es_jubilado:', 'print("Aplica descuento")', 'descuento = True'],
    explanation: '¡FANTÁSTICO! El operador or permite conceder el beneficio con cualquiera de los dos perfiles.'
  },
  {
    id: 10,
    kind: 'MatchPairs',
    title: '🧪 Quiz (10/10) · MatchPairs',
    questionText: 'Asocia cada expresión lógica compleja con su resultado final:',
    pairs: [
      { id: 'm1', left: 'not True', right: 'False' },
      { id: 'm2', left: 'True and False', right: 'False' },
      { id: 'm3', left: 'False or True', right: 'True' },
      { id: 'm4', left: '10 == 10', right: 'True' }
    ],
    explanation: '¡EXCELENTE! Dominas a la perfección la evaluación de expresiones lógicas en Python.'
  }
];

export function getQuizForLesson(lessonSlug: string): QuizQuestion[] {
  switch (lessonSlug) {
    case 'condicionales': return condicionalesQuiz;
    case 'texto-y-conversiones': return textoYConversionesQuiz;
    default: return condicionalesQuiz;
  }
}
