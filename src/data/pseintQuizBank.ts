export type PseintQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type PseintQuizDefinition = {
  key: string;
  title: string;
  questions: PseintQuizQuestion[];
};

export const pseintQuizBank: Record<string, PseintQuizDefinition> = {
  introduccion: {
    key: 'introduccion',
    title: 'Quiz: Introducción a PSeInt',
    questions: [
      {
        id: 'intro-1',
        prompt: '¿Para qué sirve PSeInt?',
        options: [
          'Para aprender lógica de programación con pseudocódigo en español',
          'Para ejecutar programas reales en el sistema operativo',
          'Para reemplazar completamente a los lenguajes de programación',
          'Para crear sitios web sin lógica',
        ],
        correctIndex: 0,
      },
      {
        id: 'intro-2',
        prompt: '¿Qué significa “configuración flexible” en PSeInt?',
        options: [
          'Que el lenguaje cambia según tu curso o preferencias',
          'Que PSeInt no necesita semicolones nunca',
          'Que no se deben definir variables antes de usarlas',
          'Que no existen comentarios',
        ],
        correctIndex: 0,
      },
      {
        id: 'intro-3',
        prompt: '¿Cuál es una regla del “guía” de esta plataforma para `Definir` variables?',
        options: [
          'Cada variable debe declararse con su tipo antes de usarse',
          'Las variables se crean automáticamente al primer uso',
          'Las variables no tienen tipo',
          'Se declaran al final del algoritmo',
        ],
        correctIndex: 0,
      },
      {
        id: 'intro-4',
        prompt: '¿Con qué carácter deben terminar las instrucciones en esta guía?',
        options: ['Coma (,)', 'Punto (.)', 'Dos puntos (:)', 'Punto y coma (;)'],
        correctIndex: 3,
      },
      {
        id: 'intro-5',
        prompt: 'En `Escribir`, ¿cómo se concatenan texto y variables?',
        options: [
          'Con un punto (.)',
          'Con un signo +',
          'Separando con coma (,)',
          'Con un guion (-)',
        ],
        correctIndex: 2,
      },
      {
        id: 'intro-6',
        prompt: '¿Cómo se escriben los comentarios de una línea en PSeInt?',
        options: ['/* comentario */', '# comentario', '// comentario', '<!-- comentario -->'],
        correctIndex: 2,
      },
      {
        id: 'intro-7',
        prompt: '¿Dónde pueden aparecer comentarios?',
        options: [
          'Solo como primera línea del algoritmo',
          'Solo al final del archivo',
          'Como línea entera o al final de una instrucción',
          'Solo dentro de bloques Si',
        ],
        correctIndex: 2,
      },
      {
        id: 'intro-8',
        prompt: '¿Qué palabra clave marca el final del algoritmo?',
        options: ['FinProceso', 'FinAlgoritmo', 'Final', 'Terminar'],
        correctIndex: 1,
      },
      {
        id: 'intro-9',
        prompt: '¿Para qué sirve `Leer`?',
        options: [
          'Muestra datos en pantalla',
          'Recibe datos desde el teclado mientras el programa se ejecuta',
          'Define variables con tipo',
          'Evalúa condiciones',
        ],
        correctIndex: 1,
      },
      {
        id: 'intro-10',
        prompt: '¿Qué debe cumplirse para que un algoritmo sea válido según la guía?',
        options: [
          'Usar `Algoritmo` y `FinAlgoritmo`',
          'No usar `Definir`',
          'No terminar instrucciones con `;`',
          'Reemplazar `Leer` por asignaciones',
        ],
        correctIndex: 0,
      },
    ],
  },
  metodologia: {
    key: 'metodologia',
    title: 'Quiz: Metodología (EPS + Pólya)',
    questions: [
      {
        id: 'met-1',
        prompt: 'EPS significa...',
        options: ['Entrada–Proceso–Salida', 'Ejecución–Plan–Solución', 'Error–Proceso–Sistema', 'Entrada–Salida–Final'],
        correctIndex: 0,
      },
      {
        id: 'met-2',
        prompt: '¿Qué corresponde a la “Entrada” en EPS?',
        options: [
          'Datos que el programa necesita (por ejemplo, valores ingresados)',
          'Los resultados finales del programa',
          'Solo las condiciones del algoritmo',
          'Las funciones ya implementadas',
        ],
        correctIndex: 0,
      },
      {
        id: 'met-3',
        prompt: '¿Qué corresponde al “Proceso” en EPS?',
        options: [
          'Operaciones o cálculos que transforman los datos',
          'Mensajes y salida en pantalla',
          'La validación de que el usuario sea mayor de edad',
          'La definición de variables sin cálculos',
        ],
        correctIndex: 0,
      },
      {
        id: 'met-4',
        prompt: '¿Qué corresponde a la “Salida” en EPS?',
        options: [
          'Resultados que el programa entrega',
          'La lista de variables declaradas',
          'Los bucles del programa',
          'Las condiciones del `Si`',
        ],
        correctIndex: 0,
      },
      {
        id: 'met-5',
        prompt: 'En esta plataforma, la estructura principal es...',
        options: [
          'Proceso ... FinProceso',
          'Algoritmo ... FinAlgoritmo',
          'Si ... FinSi',
          'Leer ... FinLeer',
        ],
        correctIndex: 1,
      },
      {
        id: 'met-6',
        prompt: '¿Cuál es el Paso 1 del método para resolver problemas informáticos (según la página)?',
        options: [
          'Definir variables',
          'Leer datos',
          'Analizar el problema (comprender qué se debe hacer)',
          'Mostrar resultados',
        ],
        correctIndex: 2,
      },
      {
        id: 'met-7',
        prompt: '¿Qué paso corresponde a la instrucción `Leer` (Entrada)?',
        options: ['Paso 2', 'Paso 3', 'Paso 4', 'Paso 5'],
        correctIndex: 1,
      },
      {
        id: 'met-8',
        prompt: 'En el ejemplo de suma, ¿dónde se calcula `resultado = a + b`?',
        options: ['En la “Entrada”', 'En el “Proceso”', 'En la “Salida”', 'No se calcula en el ejemplo'],
        correctIndex: 1,
      },
      {
        id: 'met-9',
        prompt: '¿Por qué usar esta metodología ayuda a programar mejor?',
        options: [
          'Porque organiza el pensamiento y reduce errores',
          'Porque evita que tengas que entender condiciones',
          'Porque hace que el código sea invisible',
          'Porque elimina la necesidad de variables',
        ],
        correctIndex: 0,
      },
      {
        id: 'met-10',
        prompt: '¿Qué herramienta educativa se usa para aprender la lógica en español?',
        options: ['Python', 'PSeInt', 'Java', 'HTML'],
        correctIndex: 1,
      },
    ],
  },
  variables: {
    key: 'variables',
    title: 'Quiz: Variables en PSeInt',
    questions: [
      {
        id: 'var-1',
        prompt: '¿Qué es una variable, según la página?',
        options: [
          'Un espacio en memoria para guardar datos',
          'Un comentario que no se ejecuta',
          'Un operador matemático',
          'Un tipo de bucle',
        ],
        correctIndex: 0,
      },
      {
        id: 'var-2',
        prompt: '¿Qué debes hacer antes de usar una variable en esta guía?',
        options: [
          'Declararla con `Definir` y su tipo',
          'No declararla nunca',
          'Definirla después de `Escribir`',
          'Reemplazarla por comillas',
        ],
        correctIndex: 0,
      },
      {
        id: 'var-3',
        prompt: '¿Qué tipo sirve para números sin decimales?',
        options: ['Real', 'Entero', 'Caracter', 'Logico'],
        correctIndex: 1,
      },
      {
        id: 'var-4',
        prompt: '¿Qué tipo sirve para números con decimales?',
        options: ['Entero', 'Caracter', 'Real', 'Logico'],
        correctIndex: 2,
      },
      {
        id: 'var-5',
        prompt: '¿Qué tipo sirve para texto (cadenas)?',
        options: ['Caracter', 'Logico', 'Entero', 'Real'],
        correctIndex: 0,
      },
      {
        id: 'var-6',
        prompt: '¿Qué tipo representa valores de verdad?',
        options: ['Entero', 'Real', 'Logico', 'Caracter'],
        correctIndex: 2,
      },
      {
        id: 'var-7',
        prompt: '¿Cuál es la sintaxis para definir una variable? (forma correcta)',
        options: [
          'Definir nombreVariable Como Tipo;',
          'Definir nombreVariable Tipo;',
          'Crear nombreVariable = Tipo;',
          'Leer nombreVariable Como Tipo;',
        ],
        correctIndex: 0,
      },
      {
        id: 'var-8',
        prompt: '¿Cómo concatenas texto y variables usando `Escribir`?',
        options: ['Con `+`', 'Con coma `,`', 'Con `*`', 'Con dos puntos `:`'],
        correctIndex: 1,
      },
      {
        id: 'var-9',
        prompt: 'En la página de variables, ¿qué operador se usa para asignar un valor a una variable?',
        options: ['=', '<-', '<>', '>='],
        correctIndex: 1,
      },
      {
        id: 'var-10',
        prompt: '¿Qué ocurre si intentas usar una variable que no fue declarada con `Definir`?',
        options: [
          'Puede fallar el algoritmo o generar un error',
          'El programa la crea automáticamente como Caracter',
          'El programa ignora toda la línea',
          'El programa reemplaza por 0 automáticamente sin errores',
        ],
        correctIndex: 0,
      },
    ],
  },
  leer: {
    key: 'leer',
    title: 'Quiz: Leer en PSeInt',
    questions: [
      {
        id: 'leer-1',
        prompt: '¿Qué hace la instrucción `Leer`?',
        options: [
          'Muestra un valor en pantalla',
          'Recibe un dato desde el teclado y lo guarda en una variable',
          'Define variables con tipo',
          'Evalúa condiciones con `Si`',
        ],
        correctIndex: 1,
      },
      {
        id: 'leer-2',
        prompt: 'Antes de usar `Leer`, la variable debe estar...',
        options: ['Sin tipo', 'Definida con `Definir`', 'Entre comillas', 'Duplicada'],
        correctIndex: 1,
      },
      {
        id: 'leer-3',
        prompt: '¿En qué momento el programa guarda el valor ingresado?',
        options: [
          'Al presionar Enter en el teclado',
          'Al presionar Escape',
          'Cuando el programa termina',
          'Al escribir el punto y coma (;)',
        ],
        correctIndex: 0,
      },
      {
        id: 'leer-4',
        prompt: 'Si una variable es de tipo numérico (Entero/Real), ¿qué debe ingresar el usuario?',
        options: [
          'Un número válido',
          'Cualquier texto aunque sea letra',
          'Solo espacios',
          'Solo el nombre de otra variable',
        ],
        correctIndex: 0,
      },
      {
        id: 'leer-5',
        prompt: '¿Qué sintaxis representa leer una variable “edad”?',
        options: ['Leer edad', 'Leer edad;', 'Escribir edad;', 'Definir edad;'],
        correctIndex: 1,
      },
      {
        id: 'leer-6',
        prompt: 'En el ejemplo de “Leer diferentes tipos”, ¿qué tipo se usa para `altura`?',
        options: ['Entero', 'Caracter', 'Real', 'Logico'],
        correctIndex: 2,
      },
      {
        id: 'leer-7',
        prompt: 'En la página, ¿cómo se define la regla “Punto y coma”?',
        options: [
          'Cada instrucción termina con `;`',
          'Cada instrucción termina con `:`',
          'Solo las variables terminan con `;`',
          'No se usan `;` en PSeInt',
        ],
        correctIndex: 0,
      },
      {
        id: 'leer-8',
        prompt: '¿Para qué se usa el `Escribir` antes de `Leer` en los ejemplos?',
        options: [
          'Para mostrar al usuario el mensaje que debe completar',
          'Para ejecutar el algoritmo',
          'Para terminar el programa',
          'Para declarar variables nuevas',
        ],
        correctIndex: 0,
      },
      {
        id: 'leer-9',
        prompt: 'Si se declara `nombre Como Caracter;` y luego se hace `Leer nombre;`, ¿qué guarda el programa?',
        options: ['Un número', 'Un texto ingresado por el usuario', 'Verdadero/Falso', 'Ningún valor'],
        correctIndex: 1,
      },
      {
        id: 'leer-10',
        prompt: '¿Qué significa que el valor se “guarda en la variable indicada”?',
        options: [
          'Se pierde al final',
          'Se asigna a la variable que pasaste en `Leer`',
          'Se guarda solo si coincide con el tipo',
          'Se muestra directamente sin variable',
        ],
        correctIndex: 1,
      },
    ],
  },
  matematicas: {
    key: 'matematicas',
    title: 'Quiz: Matemáticas en PSeInt',
    questions: [
      {
        id: 'mat-1',
        prompt: '¿Qué operador se usa para la suma?',
        options: ['-', '+', '*', '^'],
        correctIndex: 1,
      },
      {
        id: 'mat-2',
        prompt: '¿Qué operador se usa para la resta?',
        options: ['-', '+', '/', '^'],
        correctIndex: 0,
      },
      {
        id: 'mat-3',
        prompt: '¿Qué operador se usa para la multiplicación?',
        options: ['*', '+', '/', '^'],
        correctIndex: 0,
      },
      {
        id: 'mat-4',
        prompt: '¿Qué operador se usa para la división?',
        options: ['/', '-', '*', 'MOD'],
        correctIndex: 0,
      },
      {
        id: 'mat-5',
        prompt: '¿Qué operador se usa para la potencia (exponente)?',
        options: ['^', '$', '**', 'POT'],
        correctIndex: 0,
      },
      {
        id: 'mat-6',
        prompt: '¿Cuál es la fórmula del área de un rectángulo (según el ejercicio)?',
        options: ['base + altura', 'base - altura', 'base * altura', 'base / altura'],
        correctIndex: 2,
      },
      {
        id: 'mat-7',
        prompt: '¿Cómo se calcula el promedio de tres notas en la página?',
        options: ['(nota1 + nota2 + nota3) / 3', 'nota1 + nota2 + nota3', '(nota1 - nota2 - nota3) / 3', '3 / (nota1 + nota2 + nota3)'],
        correctIndex: 0,
      },
      {
        id: 'mat-8',
        prompt: 'La conversión de Celsius a Fahrenheit usa: F = ... (según la página).',
        options: ['C * 9/5 + 32', 'C + 9/5 + 32', 'C * (9 + 5) + 32', 'C / 9/5 + 32'],
        correctIndex: 0,
      },
      {
        id: 'mat-9',
        prompt: 'Para el área de un cuadrado, ¿qué operación se usa en el ejercicio?',
        options: ['lado + lado', 'lado ^ 2', '4 * lado', 'lado / 2'],
        correctIndex: 1,
      },
      {
        id: 'mat-10',
        prompt: '¿Por qué se recomienda usar `Real` en el ejercicio del área del rectángulo?',
        options: [
          'Porque el área puede tener decimales',
          'Porque Entero no permite usar operadores',
          'Porque Real solo sirve para texto',
          'Porque `Leer` no acepta Entero',
        ],
        correctIndex: 0,
      },
    ],
  },
  condicionales: {
    key: 'condicionales',
    title: 'Quiz: Condicionales (Si) en PSeInt',
    questions: [
      {
        id: 'con-1',
        prompt: '¿Qué es una “condición” en un programa?',
        options: [
          'Una instrucción que siempre se ejecuta',
          'Una expresión que se evalúa como Verdadero o Falso',
          'Un tipo de variable',
          'Un operador matemático',
        ],
        correctIndex: 1,
      },
      {
        id: 'con-2',
        prompt: '¿Qué significa el operador `>=`?',
        options: [
          'Menor o igual que',
          'Mayor o igual que',
          'Diferente de',
          'Igual a',
        ],
        correctIndex: 1,
      },
      {
        id: 'con-3',
        prompt: '¿Qué significa el operador `<>`?',
        options: ['Igual a', 'Diferente de', 'Menor que', 'Mayor que'],
        correctIndex: 1,
      },
      {
        id: 'con-4',
        prompt: '¿Cuál es el final correcto de un `Si`?',
        options: ['FinSi', 'FinMientras', 'FinPara', 'FinAlgoritmo'],
        correctIndex: 0,
      },
      {
        id: 'con-5',
        prompt: '¿Qué etiqueta se usa para la alternativa en un `Si` con “Sino”?',
        options: ['Sino', 'Entonces', 'FinSino', 'Otra'],
        correctIndex: 0,
      },
      {
        id: 'con-6',
        prompt: 'En el ejemplo “MayorDeEdad”, si `edad >= 18`, ¿qué escribe el programa?',
        options: ['Aún no puedes votar', 'Puedes votar', 'Eres menor de edad', 'No hay condición'],
        correctIndex: 1,
      },
      {
        id: 'con-7',
        prompt: 'En el ejercicio “Par o impar”, ¿cuál condición determina par?',
        options: ['num MOD 2 = 0', 'num MOD 2 = 1', 'num MOD 2 <> 0', 'num / 2 = 0'],
        correctIndex: 0,
      },
      {
        id: 'con-8',
        prompt: 'En la estructura `Si ... Entonces ... Sino ... FinSi`, ¿qué parte se ejecuta cuando la condición es falsa?',
        options: ['La rama de Entonces', 'La rama de Sino', 'Nunca se ejecuta nada', 'Se ejecuta FinSi'],
        correctIndex: 1,
      },
      {
        id: 'con-9',
        prompt: '¿Qué operador se usa para evaluar igualdad?',
        options: ['=', '<>', '!=', '<='],
        correctIndex: 0,
      },
      {
        id: 'con-10',
        prompt: '¿Por qué conviene probar casos distintos en ejercicios con Si?',
        options: [
          'Para verificar que cada rama produce el resultado esperado',
          'Porque mejora la velocidad del programa',
          'Porque elimina la necesidad de condiciones',
          'Porque evita que exista salida',
        ],
        correctIndex: 0,
      },
    ],
  },
  repeticion: {
    key: 'repeticion',
    title: 'Quiz: Repetición (Bucles) en PSeInt',
    questions: [
      {
        id: 'rep-1',
        prompt: 'En un bucle tipo `Mientras`, ¿la condición se evalúa antes o después de ejecutar el bloque?',
        options: ['Después', 'Antes', 'Solo una vez al final', 'Nunca'],
        correctIndex: 1,
      },
      {
        id: 'rep-2',
        prompt: 'En el bucle `Mientras ... Hacer ... FinMientras`, ¿qué palabra clave termina el ciclo?',
        options: ['FinMientras', 'FinPara', 'Hasta Que', 'FinAlgoritmo'],
        correctIndex: 0,
      },
      {
        id: 'rep-3',
        prompt: '`Repetir ... Hasta Que` se ejecuta como mínimo:',
        options: ['0 veces', '1 vez', '2 veces', 'exactamente n veces'],
        correctIndex: 1,
      },
      {
        id: 'rep-4',
        prompt: 'En `Repetir ... Hasta Que condicion`, ¿cuándo se revisa la condición?',
        options: ['Al inicio', 'Al final', 'Nunca', 'Solo al presionar Limpiar'],
        correctIndex: 1,
      },
      {
        id: 'rep-5',
        prompt: '¿Para qué se usa `Para` cuando ya sabes cuántas veces repetir (contador)?',
        options: [
          'Para iterar por un rango con un contador',
          'Para evitar condiciones',
          'Para reemplazar a `Leer`',
          'Para que el programa termine',
        ],
        correctIndex: 0,
      },
      {
        id: 'rep-6',
        prompt: 'En el ejemplo de “sumar 1 a n” con `Para`, ¿qué representa `i`?',
        options: ['El valor leído de entrada', 'El contador del bucle', 'La suma final', 'La condición del ciclo'],
        correctIndex: 1,
      },
      {
        id: 'rep-7',
        prompt: 'En `Mientras`, ¿por qué es importante actualizar la variable de control dentro del ciclo?',
        options: [
          'Para evitar un bucle infinito',
          'Para borrar la salida',
          'Para declarar variables',
          'Para cambiar el tipo del programa',
        ],
        correctIndex: 0,
      },
      {
        id: 'rep-8',
        prompt: 'En el ejemplo de `Mientras num <> 0`, ¿qué ocurre cuando `num` vale 0?',
        options: [
          'El ciclo se detiene y no ejecuta el bloque',
          'El ciclo sigue igual',
          'El ciclo se reinicia',
          'El programa termina inmediatamente sin salida',
        ],
        correctIndex: 0,
      },
      {
        id: 'rep-9',
        prompt: 'En el bucle `Para i = 1 Hasta n Hacer`, ¿qué significa “Hasta n”?',
        options: [
          'El rango llega hasta n (según la sintaxis del bucle)',
          'La condición es falsa cuando i = n',
          'El bucle no usa contador',
          'Solo se ejecuta si i es primo',
        ],
        correctIndex: 0,
      },
      {
        id: 'rep-10',
        prompt: 'Si querés repetir un bloque hasta que ocurra algo, ¿qué bucle conviene más?',
        options: ['Mientras', 'Repetir', 'Para', 'Si'],
        correctIndex: 1,
      },
    ],
  },
};

