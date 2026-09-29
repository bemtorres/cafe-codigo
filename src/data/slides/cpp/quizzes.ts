import type { QuizQuestion, InteractionType } from '../../../types/slides';

export type { QuizQuestion, InteractionType };

// ============================================================================
// 1. INTRODUCCIÓN A C++
// ============================================================================
export const introduccionQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: '¿C++ es un lenguaje compilado directamente a código máquina nativo, a diferencia de lenguajes como Python que requieren un intérprete en tiempo de ejecución?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! El compilador traduce el código fuente directamente a instrucciones binarias que el microprocesador ejecuta sin intermediarios.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Cuál es la función obligatoria que busca el sistema operativo para iniciar la ejecución de un programa en C++?',
    options: ['start()', 'int main()', 'init()', 'run()'],
    correctOption: 1,
    explanation: '¡CORRECTO! int main() es el punto de entrada canónico exigido por el estándar de C++.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para imprimir mensajes en la consola a través del flujo estándar de C++, usamos el objeto std::______ junto al operador <<.',
    code: `std::____ << "Hola Mundo\\n";`,
    options: ['cout', 'cin', 'print', 'write'],
    correctOption: 0,
    explanation: '¡CORRECTO! std::cout representa el flujo de salida hacia la consola (Console Output).'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja cada fase del ciclo de vida de C++ con su responsabilidad:',
    pairs: [
      { id: 'p1', left: 'Preprocesador (#)', right: 'Incluye cabeceras y procesa macros antes de compilar' },
      { id: 'p2', left: 'Compilador (g++)', right: 'Traduce código fuente a código objeto (.o / .obj)' },
      { id: 'p3', left: 'Enlazador (Linker)', right: 'Une código objeto y librerías para producir el .exe' }
    ],
    explanation: '¡EXCELENTE! Estas tres etapas automáticas componen el proceso de compilación en C++.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué error provocará que el siguiente código falle al compilar?',
    code: `#include <iostream>
int main() {
    std::cout << "Aprendiendo C++"
    return 0;
}`,
    options: [
      'Falta el punto y coma (;) al final de la línea de std::cout',
      'No se puede retornar 0 en main',
      'Las comillas dobles están prohibidas',
      'iostream debe escribirse con mayúsculas'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! En C++, el punto y coma (;) es estrictamente obligatorio para finalizar cada sentencia.'
  }
];

// ============================================================================
// 2. VARIABLES Y MEMORIA
// ============================================================================
export const variablesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Qué tipo de dato primitivo almacena un solo carácter entre comillas simples en C++ y suele ocupar 1 byte?',
    options: ['char', 'std::string', 'int', 'byte'],
    correctOption: 0,
    explanation: '¡CORRECTO! char almacena exactamente un carácter ASCII (ej. \'A\') ocupando 1 solo byte.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: 'Si declaras una variable local como `int x;` sin inicializarla, ¿C++ le asigna automáticamente el valor 0?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO Y MUY PELIGROSO! En C++, una variable local no inicializada contiene "basura de memoria", es decir, el valor residual que había en ese casillero de la RAM.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Desafío (3/5) · PredictOutput',
    questionText: '¿Qué imprimirá el siguiente programa?',
    code: `const int LIMITE = 10;
// LIMITE = 20;
std::cout << LIMITE + 5;`,
    options: ['15', '25', 'Error de compilación', '10'],
    correctOption: 0,
    explanation: '¡CORRECTO! LIMITE es constante inmutable (10), por lo que 10 + 5 produce 15 en pantalla.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (4/5) · FillInTheBlank',
    questionText: 'La palabra reservada introducida en C++11 para pedirle al compilador que deduzca automáticamente el tipo de una variable es ______.',
    code: `____ pi = 3.14159; // El compilador deduce double`,
    options: ['auto', 'var', 'let', 'deduce'],
    correctOption: 0,
    explanation: '¡CORRECTO! auto deduce el tipo basándose en la expresión de inicialización.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Desafío (5/5) · MatchPairs',
    questionText: 'Empareja el tipo de dato con su tamaño típico en arquitecturas de 64 bits:',
    pairs: [
      { id: 'p1', left: 'bool', right: '1 byte' },
      { id: 'p2', left: 'int', right: '4 bytes (32 bits)' },
      { id: 'p3', left: 'double', right: '8 bytes (64 bits)' }
    ],
    explanation: '¡CORRECTO! Conocer el tamaño de los tipos es la base de la eficiencia en C++.'
  }
];

// ============================================================================
// 3. ENTRADA Y SALIDA (IO)
// ============================================================================
export const ioQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: '¿El operador de extracción `std::cin >> palabra;` lee una línea completa incluyendo espacios en blanco?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! cin >> se detiene en el primer espacio en blanco o tabulador. Para leer líneas completas con espacios usamos std::getline().'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: 'Si después de hacer `std::cin >> edad;` necesitas leer un nombre completo con `std::getline(std::cin, nombre);`, ¿qué instrucción debes colocar en medio?',
    options: [
      'std::cin.ignore(); para descartar el salto de línea residual',
      'std::cin.close();',
      'std::cout.flush();',
      'system("cls");'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! cin.ignore() descarta el \'\\n\' residual que el operador >> dejó en el buffer de entrada.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'La función para leer texto con espacios hasta encontrar un salto de línea es std::______.',
    code: `std::_______(std::cin, miTexto);`,
    options: ['getline', 'readline', 'scan', 'read'],
    correctOption: 0,
    explanation: '¡CORRECTO! std::getline lee la línea completa desde el flujo de entrada.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja el operador u objeto con su dirección en el flujo:',
    pairs: [
      { id: 'p1', left: 'std::cout <<', right: 'Envía información hacia la pantalla' },
      { id: 'p2', left: 'std::cin >>', right: 'Recibe datos desde el teclado hacia una variable' },
      { id: 'p3', left: '\\n', right: 'Salto de línea rápido sin forzar flush' }
    ],
    explanation: '¡EXCELENTE! Recuerda las flechas: << sale, >> entra.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Cuál es el error en este código de lectura?',
    code: `int precio;
std::cin << precio;`,
    options: [
      'Usa el operador << en lugar del operador de extracción >> para cin',
      'cin no puede leer enteros',
      'precio debe ser double obligatoriamente',
      'Falta include <vector>'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Para cin se utiliza >> (extracción), no << (inserción).'
  }
];

// ============================================================================
// 4. OPERADORES
// ============================================================================
export const operadoresQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'PredictOutput',
    title: '🧪 Desafío (1/5) · PredictOutput',
    questionText: '¿Cuál es el resultado exacto de la siguiente expresión en C++?',
    code: `int resultado = 7 / 2;
std::cout << resultado;`,
    options: ['3', '3.5', '4', 'Error de tipo'],
    correctOption: 0,
    explanation: '¡CORRECTO! División entre dos enteros en C++ trunca los decimales y produce 3.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué operador se utiliza para obtener el residuo de una división entera en C++?',
    options: ['%', '//', 'mod', 'rem'],
    correctOption: 0,
    explanation: '¡CORRECTO! El operador módulo % devuelve el resto exacto de la división entera.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Desafío (3/5) · TrueFalse',
    questionText: 'En una expresión con `cond1 && cond2`, si `cond1` es falsa, ¿C++ evalúa de todas formas `cond2`?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! C++ usa cortocircuito (short-circuit): si el primer término de un AND es falso, descarta el segundo inmediatamente.'
  },
  {
    id: 4,
    kind: 'PredictOutput',
    title: '🧪 Desafío (4/5) · PredictOutput',
    questionText: '¿Qué valor se almacena en la variable b tras esta operación?',
    code: `int a = 5;
int b = ++a;`,
    options: ['6', '5', '7', 'Error'],
    correctOption: 0,
    explanation: '¡CORRECTO! El pre-incremento (++a) suma 1 antes de entregar el valor, por lo que b recibe 6.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué trampa contiene este condicional?',
    code: `int vidas = 0;
if (vidas = 3) {
    std::cout << "Sigue vivo";
}`,
    options: [
      'Usa un solo = (asignación en lugar de comparación ==), asignando 3 y evaluando como verdadero',
      'vidas debe ser booleano',
      'No se pueden usar números en if',
      'Falta la cláusula else'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! vidas = 3 asigna el valor 3 a la variable. Como 3 es distinto de 0, el if siempre se ejecuta como verdadero.'
  }
];

// ============================================================================
// 5. CONDICIONALES
// ============================================================================
export const condicionalesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Qué palabra reservada se usa para evitar el "fall-through" y salir inmediatamente de un bloque switch-case?',
    options: ['break;', 'exit;', 'return;', 'stop;'],
    correctOption: 0,
    explanation: '¡CORRECTO! break; interrumpe el switch y salta a la primera instrucción fuera del bloque.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: 'En C++, ¿cualquier número entero distinto de 0 es evaluado como verdadero en un condicional if?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! 0 es false; cualquier otro valor (positivo o negativo) se interpreta como true.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Desafío (3/5) · PredictOutput',
    questionText: '¿Qué imprime el siguiente operador ternario?',
    code: `int edad = 20;
std::string res = (edad >= 18) ? "Adulto" : "Menor";
std::cout << res;`,
    options: ['Adulto', 'Menor', '20', 'Error'],
    correctOption: 0,
    explanation: '¡CORRECTO! Como 20 >= 18 es verdadero, el ternario selecciona la primera opción ("Adulto").'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja la estructura condicional con su caso ideal de uso:',
    pairs: [
      { id: 'p1', left: 'if / else if / else', right: 'Rangos numéricos o condiciones booleanas complejas' },
      { id: 'p2', left: 'switch / case', right: 'Menús con valores discretos fijos (enteros o caracteres)' },
      { id: 'p3', left: 'Operador ? :', right: 'Asignaciones de valor condicionales en una sola línea' }
    ],
    explanation: '¡EXCELENTE! Seleccionar la estructura correcta hace tu código limpio y legible.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (5/5) · FillInTheBlank',
    questionText: 'La cláusula opcional en un switch que captura cualquier valor no previsto en los cases es ______.',
    code: `switch (opc) {
    case 1: break;
    _______: std::cout << "Inválido"; break;
}`,
    options: ['default', 'else', 'other', 'catch'],
    correctOption: 0,
    explanation: '¡CORRECTO! default: se ejecuta si ninguno de los cases anteriores coincide.'
  }
];

// ============================================================================
// 6. CICLOS Y BUCLES
// ============================================================================
export const ciclosQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Cuál es el único bucle en C++ que garantiza que su cuerpo se ejecutará al menos una vez?',
    options: ['do-while', 'while', 'for', 'range-for'],
    correctOption: 0,
    explanation: '¡CORRECTO! do-while evalúa la condición al final del bloque, garantizando una primera ejecución.'
  },
  {
    id: 2,
    kind: 'PredictOutput',
    title: '🧪 Desafío (2/5) · PredictOutput',
    questionText: '¿Cuántas veces imprimirá "Hola" este bucle?',
    code: `for (int i = 0; i < 4; ++i) {
    std::cout << "Hola ";
}`,
    options: ['4 veces (i = 0, 1, 2, 3)', '3 veces', '5 veces', 'Infinitas veces'],
    correctOption: 0,
    explanation: '¡CORRECTO! Con i = 0, 1, 2, 3 se cumple la condición i < 4, totalizando 4 iteraciones.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Desafío (3/5) · TrueFalse',
    questionText: '¿La instrucción continue termina el bucle por completo?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! continue solo salta la iteración actual y avanza a la siguiente. La que termina el bucle por completo es break.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja la instrucción de control con su efecto:',
    pairs: [
      { id: 'p1', left: 'break', right: 'Sale inmediatamente del bucle actual' },
      { id: 'p2', left: 'continue', right: 'Omite el resto de la iteración y avanza a la siguiente' },
      { id: 'p3', left: 'bucle infinito', right: 'Ocurre cuando la condición de salida nunca se vuelve falsa' }
    ],
    explanation: '¡CORRECTO! Controlar el flujo de bucles previene cuelgues del programa.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué problema tiene este bucle while?',
    code: `int contador = 1;
while (contador <= 5) {
    std::cout << contador << "\\n";
}`,
    options: [
      'Es un bucle infinito porque contador nunca se incrementa',
      'while no soporta comparaciones <=',
      'contador debe ser float',
      'Faltan comas en el encabezado'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Al olvidar incrementar contador (++contador;), la condición 1 <= 5 siempre es verdadera.'
  }
];

// ============================================================================
// 7. COLECCIONES
// ============================================================================
export const coleccionesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Por qué los arreglos en C++ se indexan comenzando en 0?',
    options: [
      'Porque el índice representa el desplazamiento (offset) en memoria desde la dirección base',
      'Por una limitación visual de la consola',
      'Porque C++ no reconoce el número 1 al iniciar',
      'Para ahorrar memoria en el disco duro'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! arreglo[0] significa "desplazamiento 0 desde la dirección inicial de memoria".'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: '¿Los elementos de un arreglo en C++ se almacenan en casilleros contiguos en la memoria RAM?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! La memoria contigua es la clave que permite el acceso instantáneo O(1) por índice.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para recorrer una colección completa en C++ moderno sin usar índices usamos el bucle range-based ______.',
    code: `____ (int x : miArreglo) { std::cout << x; }`,
    options: ['for', 'foreach', 'while', 'iterate'],
    correctOption: 0,
    explanation: '¡CORRECTO! En C++ se usa la misma palabra clave for con la sintaxis de dos puntos.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja cada contenedor con su característica principal:',
    pairs: [
      { id: 'p1', left: 'Arreglo Tradicional', right: 'Tamaño fijo en compilación, vive en el stack' },
      { id: 'p2', left: 'std::vector', right: 'Dinámico, crece automáticamente, vive en el heap' },
      { id: 'p3', left: 'std::array', right: 'Arreglo fijo seguro de la STL que conoce su tamaño' }
    ],
    explanation: '¡EXCELENTE! Seleccionar el contenedor adecuado es fundamental en C++.'
  },
  {
    id: 5,
    kind: 'PredictOutput',
    title: '🧪 Desafío (5/5) · PredictOutput',
    questionText: '¿Qué imprime este recorrido range-based?',
    code: `int lista[] = {10, 20, 30};
for (int val : lista) {
    if (val == 20) std::cout << "*";
}`,
    options: ['*', '10', '20', '***'],
    correctOption: 0,
    explanation: '¡CORRECTO! Solo cuando val coincide exactamente con 20 imprime el asterisco *.'
  }
];

// ============================================================================
// 7.1 ARREGLOS FIJOS (ARRAY)
// ============================================================================
export const arrayQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'PredictOutput',
    title: '🧪 Desafío (1/5) · PredictOutput',
    questionText: 'Si defines `int datos[5] = {10, 20, 30};`, ¿cuál es el valor de datos[4]?',
    options: [
      '0 (C++ rellena con ceros los elementos no especificados en una lista inicializadora)',
      'Basura de memoria',
      '30',
      'Error de compilación'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Cuando inicializas parcialmente un arreglo con { }, los elementos restantes se inicializan en 0 automáticamente.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: '¿El operador de corchetes `arreglo[i]` verifica si el índice `i` está dentro del rango válido del arreglo?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! El operador [ ] no verifica límites por razones de velocidad pura, lo que puede provocar Buffer Overflow si no tienes cuidado.'
  },
  {
    id: 3,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (3/5) · MultipleChoice',
    questionText: '¿Qué es un "Buffer Overflow" en C++?',
    options: [
      'Escribir o leer fuera de los límites de memoria asignados al arreglo',
      'Llenar el disco duro con archivos ejecutables',
      'Imprimir demasiadas líneas en consola',
      'Un error al compilar con números negativos'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Acceder más allá del límite reservado sobrescribe memoria vecina y es un riesgo de seguridad crítico.'
  },
  {
    id: 4,
    kind: 'FindTheBug',
    title: '🧪 Desafío (4/5) · FindTheBug',
    questionText: '¿Qué error contiene este bucle de recorrido?',
    code: `int numeros[4] = {1, 2, 3, 4};
for (int i = 0; i <= 4; ++i) {
    std::cout << numeros[i];
}`,
    options: [
      'Accede a numeros[4] cuando el último índice válido es 3 (índice fuera de rango)',
      'i debe empezar en 1',
      'Faltan llaves en el arreglo',
      'cout no puede imprimir enteros'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! En un arreglo de tamaño 4, los índices van de 0 a 3. La condición debe ser i < 4.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Desafío (5/5) · MatchPairs',
    questionText: 'Empareja la expresión con su validez en C++:',
    pairs: [
      { id: 'p1', left: 'int a[3] = {1, 2, 3};', right: 'Válido: Inicialización completa' },
      { id: 'p2', left: 'int a[] = {4, 5};', right: 'Válido: El compilador deduce tamaño 2' },
      { id: 'p3', left: 'a[10] = 5; (en tamaño 3)', right: 'Comportamiento Indefinido (Buffer Overflow)' }
    ],
    explanation: '¡EXCELENTE! Mantener la disciplina en los límites de memoria es vital.'
  }
];

// ============================================================================
// 7.2 STD::VECTOR
// ============================================================================
export const vectorQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Qué método de std::vector se usa para agregar un nuevo elemento al final de la colección?',
    options: ['push_back()', 'append()', 'add()', 'insert_end()'],
    correctOption: 0,
    explanation: '¡CORRECTO! push_back() añade el elemento al final y expande la memoria si es necesario.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: '¿El método `vector.at(indice)` lanza una excepción si intentas acceder a un índice fuera de rango?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! A diferencia de [ ], .at() valida los límites y lanza std::out_of_range ante accesos inválidos.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Desafío (3/5) · PredictOutput',
    questionText: '¿Qué devuelve `vec.size()` después del siguiente código?',
    code: `std::vector<int> vec = {10, 20, 30};
vec.push_back(40);
vec.pop_back();
std::cout << vec.size();`,
    options: ['3', '4', '2', '0'],
    correctOption: 0,
    explanation: '¡CORRECTO! Inicialmente tiene 3, sube a 4 con push_back y vuelve a 3 con pop_back.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (4/5) · FillInTheBlank',
    questionText: 'Para consultar si un vector no contiene ningún elemento usamos el método booleano ______().',
    code: `if (miVector.______()) { std::cout << "Vacío"; }`,
    options: ['empty', 'is_empty', 'clear', 'null'],
    correctOption: 0,
    explanation: '¡CORRECTO! empty() devuelve true si el tamaño del vector es 0.'
  },
  {
    id: 5,
    kind: 'MatchPairs',
    title: '🧪 Desafío (5/5) · MatchPairs',
    questionText: 'Empareja el concepto de vector con su significado:',
    pairs: [
      { id: 'p1', left: 'size()', right: 'Cantidad actual de elementos con datos reales' },
      { id: 'p2', left: 'capacity()', right: 'Espacio total de casilleros reservados en memoria RAM' },
      { id: 'p3', left: 'clear()', right: 'Elimina todos los elementos del vector dejándolo en size 0' }
    ],
    explanation: '¡EXCELENTE! Comprender size vs capacity te permite entender cómo C++ gestiona la memoria dinámica.'
  }
];

// ============================================================================
// 7.3 ARREGLOS 2D / MATRICES (PAC-MAN)
// ============================================================================
export const arrayGameQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: 'En una matriz bidimensional declarada como `char mapa[FILAS][COLUMNAS];`, ¿cuál es el orden correcto para acceder a una celda?',
    options: [
      'mapa[fila][columna] (coordenadas Y, X)',
      'mapa[columna][fila]',
      'mapa[X, Y]',
      'mapa(columna, fila)'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! El primer corchete indica la fila horizontal (eje Y) y el segundo la columna vertical (eje X).'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: '¿Se necesitan dos bucles for anidados para recorrer por completo todas las celdas de una matriz 2D?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! El bucle externo recorre cada fila y el interno recorre cada columna dentro de esa fila.'
  },
  {
    id: 3,
    kind: 'PredictOutput',
    title: '🧪 Desafío (3/5) · PredictOutput',
    questionText: '¿Qué carácter se imprime en este código?',
    code: `char tablero[2][2] = {
    {'A', 'B'},
    {'C', 'D'}
};
std::cout << tablero[1][0];`,
    options: ['C', 'A', 'B', 'D'],
    correctOption: 0,
    explanation: '¡CORRECTO! Fila 1 (segunda fila) y Columna 0 (primera columna) corresponde al carácter \'C\'.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja el elemento del juego con su representación en la matriz:',
    pairs: [
      { id: 'p1', left: '\'#\'', right: 'Muro o pared que impide el paso' },
      { id: 'p2', left: '\'.\'', right: 'Punto de comida que suma puntaje' },
      { id: 'p3', left: '\'C\'', right: 'Posición actual de Pac-Man' }
    ],
    explanation: '¡EXCELENTE! Usar caracteres como sprites en consola es la forma clásica de aprender videojuegos.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué paso crítico falta antes de mover a Pac-Man a una nueva coordenada?',
    code: `pacmanX += dx;
pacmanY += dy;
mapa[pacmanY][pacmanX] = 'C';`,
    options: [
      'Validar si la casilla destino tiene un muro (\'#\') antes de actualizar la posición',
      'No se pueden sumar enteros a las coordenadas',
      'El mapa debe ser booleano',
      'Falta llamar a exit()'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Sin validar colisiones primero, Pac-Man atravesará paredes o saldrá de los límites de la matriz.'
  }
];

// ============================================================================
// 7.4 VECTOR CRUD (EXAMEN)
// ============================================================================
export const arrayExamenQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Qué método de std::vector se usa para eliminar un elemento en una posición específica utilizando un iterador?',
    options: ['erase()', 'remove()', 'delete()', 'drop()'],
    correctOption: 0,
    explanation: '¡CORRECTO! vec.erase(vec.begin() + i) elimina el elemento en el índice i y compacta el vector.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: '¿La operación de actualizar un elemento por índice (`vec[pos] = nuevoDato;`) tiene complejidad O(1) de tiempo constante?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! Gracias a la memoria contigua, saltar a un índice específico es instantáneo.'
  },
  {
    id: 3,
    kind: 'MatchPairs',
    title: '🧪 Desafío (3/5) · MatchPairs',
    questionText: 'Empareja cada operación CRUD con su implementación en vector:',
    pairs: [
      { id: 'p1', left: 'Create', right: 'vector.push_back(elemento)' },
      { id: 'p2', left: 'Read', right: 'for (const auto& item : vector)' },
      { id: 'p3', left: 'Delete', right: 'vector.erase(vector.begin() + pos)' }
    ],
    explanation: '¡EXCELENTE! Este es el patrón CRUD estándar en la STL de C++.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (4/5) · FillInTheBlank',
    questionText: 'Para obtener un iterador al primer elemento del vector usamos el método vec.______().',
    code: `vec.erase(vec.______() + indice);`,
    options: ['begin', 'front', 'start', 'first'],
    correctOption: 0,
    explanation: '¡CORRECTO! begin() devuelve un iterador apuntando al primer elemento del contenedor.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué ocurre si ejecutas `vec.erase(vec.begin() + 10);` en un vector que solo tiene 3 elementos?',
    options: [
      'Provoca comportamiento indefinido o caída del programa (segmentation fault)',
      'Simplemente no hace nada',
      'Devuelve false',
      'Borra el último elemento automáticamente'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Borrar fuera del rango de iteradores válidos corrompe la ejecución del programa.'
  }
];

// ============================================================================
// 8. FUNCIONES Y REFERENCIAS
// ============================================================================
export const funcionesQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Qué símbolo se coloca junto al tipo del parámetro para indicar que se pasa por Referencia y no por Valor?',
    options: ['&', '*', '%', '@'],
    correctOption: 0,
    explanation: '¡CORRECTO! `void fn(int& x)` recibe la referencia directa al casillero original sin hacer copias.'
  },
  {
    id: 2,
    kind: 'PredictOutput',
    title: '🧪 Desafío (2/5) · PredictOutput',
    questionText: '¿Qué valor imprimirá x al finalizar?',
    code: `void duplicar(int n) {
    n = n * 2;
}
int main() {
    int x = 5;
    duplicar(x);
    std::cout << x;
}`,
    options: [
      '5 (n se pasó por valor, por lo que duplicar solo modificó una copia)',
      '10',
      '0',
      'Error de compilación'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Al no tener el operador &, la función recibe una copia y x en main permanece inalterado.'
  },
  {
    id: 3,
    kind: 'TrueFalse',
    title: '🧪 Desafío (3/5) · TrueFalse',
    questionText: '¿Pasar un vector grande con `const std::vector<int>& v` evita hacer copias pesadas en memoria y previene modificaciones accidentales?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! Es el patrón canónico de C++: máxima velocidad con la seguridad de la inmutabilidad.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja el operador con su significado en gestión de memoria:',
    pairs: [
      { id: 'p1', left: '&variable', right: 'Obtiene la dirección de memoria donde reside la variable' },
      { id: 'p2', left: 'int* ptr', right: 'Declara una variable puntero para guardar direcciones' },
      { id: 'p3', left: '*ptr', right: 'Desreferencia: accede al valor dentro de la dirección apuntada' }
    ],
    explanation: '¡EXCELENTE! & obtiene la dirección, * la abre.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (5/5) · FillInTheBlank',
    questionText: 'Si una función no debe devolver ningún valor al llamador, se define con el tipo de retorno ______.',
    code: `____ saludar() { std::cout << "Hola"; }`,
    options: ['void', 'null', 'none', 'empty'],
    correctOption: 0,
    explanation: '¡CORRECTO! void indica explícitamente la ausencia de valor de retorno.'
  }
];

// ============================================================================
// 9. POO BÁSICO
// ============================================================================
export const pooBasicoQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Cuál es el modificador de acceso por defecto de los miembros en una `class` en C++ si no se especifica nada?',
    options: ['private', 'public', 'protected', 'package'],
    correctOption: 0,
    explanation: '¡CORRECTO! En C++, las clases tienen todos sus miembros privados por defecto (a diferencia de struct que son públicos).'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: 'En C++, ¿la definición de una clase DEBE terminar obligatoriamente con un punto y coma después de la llave de cierre (`};`)?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! Olvidar el punto y coma en `};` es uno de los errores más comunes al definir clases en C++.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'El método especial que tiene el mismo nombre de la clase y se ejecuta automáticamente al instanciar un objeto es el ______.',
    code: `class Auto { public: ____() { ... } };`,
    options: ['Constructor', 'Destructor', 'Getter', 'Setter'],
    correctOption: 0,
    explanation: '¡CORRECTO! El constructor inicializa los atributos y reserva recursos para el nuevo objeto.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja el modificador de acceso con su nivel de visibilidad:',
    pairs: [
      { id: 'p1', left: 'public', right: 'Accesible desde cualquier función fuera de la clase' },
      { id: 'p2', left: 'private', right: 'Accesible únicamente por los métodos de la propia clase' },
      { id: 'p3', left: 'protected', right: 'Accesible por la clase y sus clases derivadas por herencia' }
    ],
    explanation: '¡EXCELENTE! El encapsulamiento es el primer pilar de la programación orientada a objetos.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué fallará este código al intentar acceder a saldo?',
    code: `class Cuenta {
    double saldo;
public:
    Cuenta(double s) { saldo = s; }
};
int main() {
    Cuenta c(100);
    std::cout << c.saldo;
}`,
    options: [
      'saldo es private por defecto y no puede leerse directamente desde main',
      'No se pueden pasar números al constructor',
      'saldo debe ser un string',
      'c debe declararse con auto'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Como saldo quedó antes de public:, es privado. Se necesita un método getter público como c.getSaldo().'
  }
];

// ============================================================================
// 10. POO PILARES (HERENCIA Y POLIMORFISMO)
// ============================================================================
export const pooPilaresQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (1/5) · MultipleChoice',
    questionText: '¿Qué palabra clave debe agregarse a un método en la clase base para permitir que las clases derivadas lo sobreescriban polimórficamente?',
    options: ['virtual', 'override', 'abstract', 'dynamic'],
    correctOption: 0,
    explanation: '¡CORRECTO! virtual activa la tabla de despacho dinámico (vtable) en tiempo de ejecución.'
  },
  {
    id: 2,
    kind: 'TrueFalse',
    title: '🧪 Desafío (2/5) · TrueFalse',
    questionText: '¿Una clase con al menos una función virtual pura (`virtual void f() = 0;`) se convierte en una clase abstracta que no puede instanciarse?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! Las funciones virtuales puras convierten la clase en una interfaz abstracta que exige ser implementada por las hijas.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para que el compilador verifique que realmente estás sobreescribiendo un método virtual de la clase base, añadimos la palabra reservada ______.',
    code: `void atacar() const ________ { ... }`,
    options: ['override', 'overload', 'virtual', 'implements'],
    correctOption: 0,
    explanation: '¡CORRECTO! override introducido en C++11 detecta errores tipográficos en las firmas de métodos sobreescritos.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja el concepto de POO avanzada con su definición:',
    pairs: [
      { id: 'p1', left: 'Herencia', right: 'Reutilizar código creando una clase derivada (Hija : Base)' },
      { id: 'p2', left: 'Polimorfismo', right: 'Misma interfaz invocada sobre distintos objetos con acciones distintas' },
      { id: 'p3', left: 'Destructor Virtual', right: 'Garantiza la liberación correcta de memoria de la clase hija' }
    ],
    explanation: '¡EXCELENTE! Estos son los fundamentos de la arquitectura de software profesional en C++.'
  },
  {
    id: 5,
    kind: 'PredictOutput',
    title: '🧪 Desafío (5/5) · PredictOutput',
    questionText: 'Si Base tiene `virtual void saludar() { cout << "Base"; }` y Derivada tiene `void saludar() override { cout << "Derivada"; }`, ¿qué imprime `Base* b = new Derivada(); b->saludar();`?',
    options: [
      'Derivada (gracias al despacho dinámico de virtual)',
      'Base',
      'Error de tipos',
      'Nada'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Como saludar() es virtual, C++ ejecuta el método de la clase real instanciada (Derivada).'
  }
];

// ============================================================================
// MAPA CANÓNICO Y RESOLUTOR DE QUIZZES PARA C++
// ============================================================================
const QUIZZES_BY_LESSON: Record<string, QuizQuestion[]> = {
  'introduccion': introduccionQuiz,
  'variables': variablesQuiz,
  'io': ioQuiz,
  'operadores': operadoresQuiz,
  'condicionales': condicionalesQuiz,
  'ciclos': ciclosQuiz,
  'colecciones': coleccionesQuiz,
  'array': arrayQuiz,
  'vector': vectorQuiz,
  'array-game': arrayGameQuiz,
  'array-examen': arrayExamenQuiz,
  'funciones': funcionesQuiz,
  'poo-basico': pooBasicoQuiz,
  'poo-pilares': pooPilaresQuiz,
};

export function getQuizForLesson(lessonSlug: string): QuizQuestion[] {
  const normalizedSlug = lessonSlug.replace(/^\/+|\/+$/g, '');
  return QUIZZES_BY_LESSON[normalizedSlug] || introduccionQuiz;
}
