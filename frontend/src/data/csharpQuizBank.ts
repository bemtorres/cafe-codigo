export type CSharpQuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type CSharpQuizDefinition = {
  key: string;
  title: string;
  questions: CSharpQuizQuestion[];
};

export const csharpQuizBank: Record<string, CSharpQuizDefinition> = {
  introduccion: {
    key: 'introduccion',
    title: 'Quiz: Introducción a C#',
    questions: [
      {
        id: 'intro-1',
        prompt: '¿Qué empresa desarrolló originalmente C#?',
        options: ['Google', 'Apple', 'Microsoft', 'Oracle'],
        correctIndex: 2,
      },
      {
        id: 'intro-2',
        prompt: '¿Cómo se llama la función principal por la que inicia un programa de consola en C#?',
        options: ['Start()', 'Init()', 'Main()', 'Run()'],
        correctIndex: 2,
      },
      {
        id: 'intro-3',
        prompt: 'C# es un lenguaje fuertemente tipado. ¿Qué significa esto?',
        options: [
          'Que debes escribir mucho código duro.',
          'Que las variables deben tener un tipo definido (ej. int, string) que no cambia arbitrariamente.',
          'Que solo funciona en Windows.',
          'Que no permite usar números.'
        ],
        correctIndex: 1,
      },
      {
        id: 'intro-4',
        prompt: '¿Con qué carácter deben terminar casi todas las sentencias en C#?',
        options: ['Punto (.)', 'Punto y coma (;)', 'Coma (,)', 'Dos puntos (:)'],
        correctIndex: 1,
      },
      {
        id: 'intro-5',
        prompt: '¿Para qué sirve "using System;"?',
        options: [
          'Para importar herramientas esenciales como Console.',
          'Para apagar el sistema operativo.',
          'Para definir el inicio del programa.',
          'Para crear una variable de sistema.'
        ],
        correctIndex: 0,
      }
    ],
  },
  variables: {
    key: 'variables',
    title: 'Quiz: Variables y Tipos de Datos',
    questions: [
      {
        id: 'var-1',
        prompt: '¿Qué tipo de dato usarías para almacenar un número entero como la edad?',
        options: ['string', 'bool', 'int', 'double'],
        correctIndex: 2,
      },
      {
        id: 'var-2',
        prompt: '¿Cuál es la forma correcta de declarar e inicializar un string?',
        options: [
          'string nombre = "Juan";',
          'string nombre = \'Juan\';',
          'str nombre = "Juan";',
          'String nombre = Juan;'
        ],
        correctIndex: 0,
      },
      {
        id: 'var-3',
        prompt: '¿Para qué sirve la palabra reservada "var"?',
        options: [
          'Para crear variables globales.',
          'Para que el compilador deduzca el tipo de dato automáticamente.',
          'Para evitar errores lógicos.',
          'Es lo mismo que "const".'
        ],
        correctIndex: 1,
      },
      {
        id: 'var-4',
        prompt: 'Una variable de tipo "bool" solo puede almacenar:',
        options: [
          'Números del 0 al 9.',
          'Textos cortos.',
          'true o false.',
          'Valores nulos.'
        ],
        correctIndex: 2,
      },
      {
        id: 'var-5',
        prompt: 'Si declaras "int numero;", ¿qué valor tiene por defecto en C# (si es campo de clase)?',
        options: ['null', '0', '-1', '1'],
        correctIndex: 1,
      }
    ],
  },
  io: {
    key: 'io',
    title: 'Quiz: Entrada/Salida',
    questions: [
      {
        id: 'io-1',
        prompt: '¿Qué instrucción se usa para mostrar texto en pantalla con un salto de línea?',
        options: ['Console.Read()', 'Console.Write()', 'Console.WriteLine()', 'Print()'],
        correctIndex: 2,
      },
      {
        id: 'io-2',
        prompt: '¿Qué instrucción se usa para leer lo que el usuario escribe en consola hasta presionar Enter?',
        options: ['Console.Read()', 'Console.ReadLine()', 'Console.Input()', 'Console.Scan()'],
        correctIndex: 1,
      },
      {
        id: 'io-3',
        prompt: 'Console.ReadLine() siempre devuelve un dato de tipo:',
        options: ['int', 'double', 'char', 'string'],
        correctIndex: 3,
      },
      {
        id: 'io-4',
        prompt: '¿Cómo conviertes un texto "25" a un número entero (int)?',
        options: ['Con double.Parse()', 'Con int.Parse() o Convert.ToInt32()', 'Con (int)"25"', 'No se puede'],
        correctIndex: 1,
      },
      {
        id: 'io-5',
        prompt: '¿Qué ocurre si el usuario escribe "hola" en vez de un número y hacemos int.Parse()?',
        options: [
          'Guarda el valor 0.',
          'Guarda el valor de la longitud del texto.',
          'Lanza una interrupción o Excepción que detiene el programa.',
          'Muestra un mensaje genérico.'
        ],
        correctIndex: 2,
      }
    ],
  },
  operadores: {
    key: 'operadores',
    title: 'Quiz: Operadores',
    questions: [
      {
        id: 'op-1',
        prompt: '¿Qué operador se utiliza para obtener el residuo de una división entera?',
        options: ['/', '*', '%', 'MOD'],
        correctIndex: 2,
      },
      {
        id: 'op-2',
        prompt: '¿Qué significa "x++"?',
        options: [
          'Incrementa x en 1.',
          'Suma x consigo mismo.',
          'Compara si x es positivo.',
          'Asigna un valor aleatorio a x.'
        ],
        correctIndex: 0,
      },
      {
        id: 'op-3',
        prompt: 'El operador relacional lógico para verificar "Igualdad" entre A y B es:',
        options: ['A = B', 'A == B', 'A != B', 'A <> B'],
        correctIndex: 1,
      },
      {
        id: 'op-4',
        prompt: '¿Qué hace el operador lógico "&&" (AND)?',
        options: [
          'Devuelve true si AL MENOS UNA condición es true.',
          'Devuelve true SOLO si AMBAS condiciones son true.',
          'Invierte el valor de true a false.',
          'Suma lógicamente dos textos.'
        ],
        correctIndex: 1,
      },
      {
        id: 'op-5',
        prompt: '¿Qué hace el operador lógico "||" (OR)?',
        options: [
          'Devuelve true si AL MENOS UNA condición es true.',
          'Devuelve true SOLO si AMBAS condiciones son true.',
          'Devuelve false siempre.',
          'Compara si dos números son impares.'
        ],
        correctIndex: 0,
      }
    ]
  },
  condicionales: {
    key: 'condicionales',
    title: 'Quiz: Condicionales (Toma de Decisiones)',
    questions: [
      {
        id: 'cond-1',
        prompt: 'La estructura "if" se ejecuta...',
        options: [
          'Solo si la condición entre paréntesis evalúa a true.',
          'Siempre al menos una vez.',
          'Solo si hay un condicional else.',
          'Múltiples veces consecutivas.'
        ],
        correctIndex: 0,
      },
      {
        id: 'cond-2',
        prompt: '¿Qué estructura es mejor para evaluar si una variable tiene uno de varios valores exactos (ej: menú)?',
        options: ['if anidado', 'switch', 'while', 'for'],
        correctIndex: 1,
      },
      {
        id: 'cond-3',
        prompt: 'En un "switch", cada caso manejado (case) debe terminar obligatoriamente con:',
        options: ['return', 'continue', 'break', 'fin'],
        correctIndex: 2,
      },
      {
        id: 'cond-4',
        prompt: '¿Para qué sirve "else" en un bloque if-else?',
        options: [
          'Para forzar a salir del programa.',
          'Para evaluar otra condición adicional obligatoria.',
          'Para proveer el bloque de código que se ejecuta si la condición original es falsa.',
          'Para evitar errores de sintaxis.'
        ],
        correctIndex: 2,
      },
      {
        id: 'cond-5',
        prompt: '¿Es posible encadenar múltiples validaciones usando "else if"?',
        options: [
          'Sí, C# lo permite sin límite.',
          'No, solo se puede usar if y else.',
          'Sí, pero máximo se permiten 3.',
          'No, es mejor usar "try/catch" para eso.'
        ],
        correctIndex: 0,
      }
    ]
  },
  ciclos: {
    key: 'ciclos',
    title: 'Quiz: Ciclos (While, for)',
    questions: [
      {
        id: 'ciclo-1',
        prompt: 'Un ciclo "while" repite su bloque...',
        options: [
          'Mientras la condición sea false.',
          'Mientras la condición sea verdadera (true).',
          'Exactamente 10 veces siempre.',
          'Hasta que el usuario cierre la ventana.'
        ],
        correctIndex: 1,
      },
      {
        id: 'ciclo-2',
        prompt: 'La gran diferencia entre "while" y "do-while" es que "do-while":',
        options: [
          'No evalúa condiciones.',
          'Se ejecuta siempre AL MENOS una vez, evaluando al final.',
          'Es más rápido en procesamiento.',
          'Solo sirve para números enteros.'
        ],
        correctIndex: 1,
      },
      {
        id: 'ciclo-3',
        prompt: 'El ciclo "for" agrupa clásicamente tres partes en una línea:',
        options: [
          'Inicialización, Excepción, Termino.',
          'Inicialización, Condición e Incremento/Paso.',
          'If, Else, Break.',
          'Variables, Constantes, Retorno.'
        ],
        correctIndex: 1,
      },
      {
        id: 'ciclo-4',
        prompt: '¿Qué hace la instrucción "break" dentro de un ciclo?',
        options: [
          'Rompe y sale del ciclo por completo.',
          'Detiene la ejecución del programa completo.',
          'Rompe la iteración actual y salta a la siguiente (continuar).',
          'Rompe el compilador generando un error.'
        ],
        correctIndex: 0,
      },
      {
        id: 'ciclo-5',
        prompt: '¿Qué pasa si en un ciclo while olvidas modificar la variable de control (incrementarla)?',
        options: [
          'C# la incrementa automáticamente.',
          'El programa lanza un error limpio.',
          'Generas un bucle infinito que colgará la ejecución.',
          'El ciclo no se ejecutará ni una vez.'
        ],
        correctIndex: 2,
      }
    ]
  },
  colecciones: {
    key: 'colecciones',
    title: 'Quiz: Arreglos y Listas',
    questions: [
      {
        id: 'col-1',
        prompt: '¿Qué característica principal tiene un Arreglo tradicional (Array) en C#?',
        options: [
          'Puede almacenar diferentes tipos de datos mezclados.',
          'Su tamaño es fijo y no puede modificarse tras crearse.',
          'Nunca usa corchetes [ ].',
          'Es más lento que almacenar variables una por una.'
        ],
        correctIndex: 1,
      },
      {
        id: 'col-2',
        prompt: '¿Cuál es el índice del FIRMER elemento en un Arreglo?',
        options: ['1', '-1', '0', 'Depende de cómo se declare'],
        correctIndex: 2,
      },
      {
        id: 'col-3',
        prompt: '¿Por qué preferimos a menudo "List<T>" sobre los Arreglos?',
        options: [
          'Porque List crece dinámicamente según lo necesites con `.Add()`.',
          'Porque son estructuralmente más rápidos que los arreglos fijos.',
          'Porque evitan usar bucles.',
          'Porque solo existen en versiones viejas de .NET.'
        ],
        correctIndex: 0,
      },
      {
        id: 'col-4',
        prompt: '¿Qué bucle está especialmente diseñado para iterar uno por uno los elementos de una colección sin preocuparnos de índices?',
        options: ['while', 'do-while', 'switch', 'foreach'],
        correctIndex: 3,
      },
      {
        id: 'col-5',
        prompt: 'En una lista `inventario` de tipo List<string>, ¿cómo eliminamos un elemento llamado "Espada"?',
        options: [
          'inventario.Remove("Espada");',
          'inventario.Delete("Espada");',
          'Remove(inventario, "Espada");',
          'inventario["Espada"] = null;'
        ],
        correctIndex: 0,
      }
    ]
  },
  funciones: {
    key: 'funciones',
    title: 'Quiz: Funciones / Métodos',
    questions: [
      {
        id: 'fun-1',
        prompt: 'Un método en programación nos permite:',
        options: [
          'Empaquetar y reutilizar un bloque de código bajo un nombre.',
          'Crear variables que vivan para siempre.',
          'Hacer que el código corra más lento a propósito.',
          'Conectar automáticamente la base de datos.'
        ],
        correctIndex: 0,
      },
      {
        id: 'fun-2',
        prompt: '¿Qué palabra reservada se usa para indicar que un método NO devuelve ningún valor?',
        options: ['null', 'empty', 'none', 'void'],
        correctIndex: 3,
      },
      {
        id: 'fun-3',
        prompt: '¿Qué se utiliza obligatoriamente para devolver un resultado final desde un método (ej: que devuelve un int)?',
        options: ['return', 'break', 'yield final', 'output'],
        correctIndex: 0,
      },
      {
        id: 'fun-4',
        prompt: '¿Qué son los "parámetros" en método?',
        options: [
          'Son las palabras clave de C#.',
          'Son las variables temporales que el método recibe entre paréntesis para trabajar.',
          'Son los errores lanzados por el compilador.',
          'Son comentarios especiales de la comunidad.'
        ],
        correctIndex: 1,
      },
      {
        id: 'fun-5',
        prompt: 'Si un método se define como "int Multiplicar(int a, int b)", ¿qué debes entregarle al llamarlo?',
        options: [
          'Nada, se auto-asignan.',
          'Dos arrays de enteros.',
          'Mínimo un entero y un booleano.',
          'Dos valores o variables enteras.'
        ],
        correctIndex: 3,
      }
    ]
  },
  'poo-basico': {
    key: 'poo-basico',
    title: 'Quiz: Clases y Objetos',
    questions: [
      {
        id: 'poob-1',
        prompt: '¿Cuál es la relación principal entre Clase y Objeto?',
        options: [
          'Son exactamente lo mismo.',
          'La Clase es el plano/molde, el Objeto es la unidad concreta surgida de ella.',
          'El Objeto es el plano general, y la Clase es lo que se instancia.',
          'Las clases solo guardan variables numéricas.'
        ],
        correctIndex: 1,
      },
      {
        id: 'poob-2',
        prompt: '¿Qué palabra reservada de C# se utiliza para crear (instanciar) un nuevo Objeto?',
        options: ['create', 'make', 'new', 'instantiate'],
        correctIndex: 2,
      },
      {
        id: 'poob-3',
        prompt: '¿Qué es un Constructor?',
        options: [
          'Una herramienta externa de Microsoft.',
          'Un método con el mismo nombre de la clase que se ejecuta al instanciar el objeto.',
          'Una clase especial para borrar objetos en memoria.',
          'El método Main de una aplicación.'
        ],
        correctIndex: 1,
      },
      {
        id: 'poob-4',
        prompt: '¿Para qué sirve el concepto de Encapsulamiento (ej. uso de "private" y propiedades con "get/set")?',
        options: [
          'Para proteger el estado interno del objeto y evitar modificaciones corruptas.',
          'Para encriptar el código fuente frente a piratas informáticos.',
          'Para comprimir la memoria RAM del equipo.',
          'Para evitar declarar variables.'
        ],
        correctIndex: 0,
      },
      {
        id: 'poob-5',
        prompt: 'Si una propiedad tiene `{ get; private set; }`:',
        options: [
          'Nadie puede leerla.',
          'Cualquiera puede leerla o modificarla.',
          'Se puede leer desde afuera, pero solo se puede modificar desde dentro de su propia Clase.',
          'Solo se puede modificar una vez en todo el ciclo de vida.'
        ],
        correctIndex: 2,
      }
    ]
  },
  'poo-pilares': {
    key: 'poo-pilares',
    title: 'Quiz: Herencia, Polimorfismo e Interfaces',
    questions: [
      {
        id: 'poop-1',
        prompt: '¿Qué nos permite lograr la Herencia en POO?',
        options: [
          'Crear una clase base e hijas que hereden y reutilicen sus campos y métodos.',
          'Duplicar el código en cada archivo automáticamente.',
          'Heredar errores silenciosamente al sistema.',
          'Compilar más rápido.'
        ],
        correctIndex: 0,
      },
      {
        id: 'poop-2',
        prompt: 'En C#, si quieres que la clase Gato herede de Animal, ¿qué operador usas?',
        options: ['class Gato extends Animal', 'class Gato inherits Animal', 'class Gato : Animal', 'class Gato <- Animal'],
        correctIndex: 2,
      },
      {
        id: 'poop-3',
        prompt: 'Polimorfismo significa...',
        options: [
          'Cambiar el tipo de una variable int a string directamente.',
          'La capacidad de redefinir métodos heredados (usando override) logrando comportamientos diferentes.',
          'Tener muchas variables del mismo nombre en un método.',
          'Tener formas abstractas de la web.'
        ],
        correctIndex: 1,
      },
      {
        id: 'poop-4',
        prompt: '¿Qué palabra reservada usas en la clase BASE para decir "los hijos pueden sobrescribir este método"?',
        options: ['override', 'base', 'virtual', 'static'],
        correctIndex: 2,
      },
      {
        id: 'poop-5',
        prompt: 'Una Interface en C# se usa frecuentemente como:',
        options: [
          'Una clase con todos los métodos ya programados para ahorrar trabajo.',
          'Un contrato obligatorio; quien herede la interfaz DEBE implementar dichos métodos.',
          'Una librería gráfica interactiva.',
          'Una base de datos SQLite.'
        ],
        correctIndex: 1,
      }
    ]
  }
};
