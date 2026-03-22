export interface PythonQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface PythonQuizDefinition {
  key: string;
  title: string;
  questions: PythonQuizQuestion[];
}

export const pythonQuizBank: Record<string, PythonQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: El Comienzo en Python',
    questions: [
      {
        prompt: "¿Cuál es la función en Python para imprimir un mensaje?",
        options: ["echo()", "console.log()", "print()", "write()"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo se llama el 'modo interactivo' de Python que se abre por consola al poner solo python?",
        options: ["Shell", "REPL", "Bash", "PSeInt Mode"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando sirve para ver la versión de Python instalada?",
        options: ["python --v", "python -version", "python --version", "python --v-number"],
        correctIndex: 2
      }
    ]
  },
  'variables': {
    key: 'variables',
    title: 'Quiz: Inputs y Variables',
    questions: [
      {
        prompt: "¿Qué función se usa para pedirle datos al usuario por consola en Python?",
        options: ["read()", "input()", "get()", "scan()"],
        correctIndex: 1
      },
      {
        prompt: "Si pedimos un número con input(), ¿en qué tipo de dato llega siempre por defecto?",
        options: ["int (Entero)", "float (Decimal)", "str (Texto)", "bool (Booleano)"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo convertimos la palabra '10' al número 10 real en Python?",
        options: ["toInt('10')", "convert('10', int)", "int('10')", "stringtoint('10')"],
        correctIndex: 2
      }
    ]
  },
  'listas': {
    key: 'listas',
    title: 'Quiz: Listas y Tuplas',
    questions: [
      {
        prompt: "¿Cuál es el método para añadir un nuevo elemento al final de una lista?",
        options: ["list.add()", "list.push()", "list.append()", "list.insert_last()"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la diferencia principal entre una Lista [] y una Tupla () ?",
        options: ["La lista el indexada, la tupla no", "La lista es mutable (se cambia), la tupla es inmutable (fija)", "Las tuplas solo aceptan números", "Las listas son infinitas, las tuplas no"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando eliminaría el último elemento de una lista de nombre 'items'?",
        options: ["items.delete()", "items.remove_last()", "items.pop()", "del items[0]"],
        correctIndex: 2
      }
    ]
  },
  'diccionarios': {
    key: 'diccionarios',
    title: 'Quiz: Diccionarios de Python',
    questions: [
      {
        prompt: "¿Cómo se define un diccionario vacío?",
        options: ["dict = ()", "dict = []", "dict = {}", "dict = set()"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo accedemos al valor 'Chile' de este dict: data = {'pais': 'Chile'} ?",
        options: ["data['pais']", "data.pais", "data(pais)", "data.get('Chile')"],
        correctIndex: 0
      },
      {
        prompt: "En un diccionario, los elementos se guardan por pares de...",
        options: ["Índice y Valor", "Clave y Valor", "Nombre e ID", "Tipo y Texto"],
        correctIndex: 1
      }
    ]
  },
  'condicionales': {
    key: 'condicionales',
    title: 'Quiz: Lógica Python (If)',
    questions: [
      {
        prompt: "¿Cuál es la palabra clave para un 'Sino Si' en Python?",
        options: ["elseif", "else if", "elif", "otherwise"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo se definen los bloques de código (lo que está adentro) de un if?",
        options: ["Con llaves {}", "Con la palabra then", "Con indentación (espacios/tabs)", "Con corchetes []"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo se escribe el operador lógico AND en Python?",
        options: ["&&", "&", "and", "And"],
        correctIndex: 2
      }
    ]
  },
  'bucles': {
    key: 'bucles',
    title: 'Quiz: Bucles (For/While)',
    questions: [
      {
        prompt: "¿Cómo repetimos un código 5 veces usando range()?",
        options: ["for i in range(5):", "for i from 1 to 5:", "while (5):", "range(5).each(i):"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es el comando para romper o detener un bucle de inmediato?",
        options: ["stop", "kill", "exit", "break"],
        correctIndex: 3
      },
      {
        prompt: "¿Qué comando sirve para saltar la iteración actual e ir directo a la próxima?",
        options: ["skip", "continue", "next", "jump"],
        correctIndex: 1
      }
    ]
  },
  'funciones': {
    key: 'funciones',
    title: 'Quiz: Funciones Python',
    questions: [
      {
        prompt: "¿Palabra reservada para definir funciones?",
        options: ["function", "func", "def", "lambda"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué significa 'args' en una función?",
        options: ["Argumentos", "Arreglos", "Acciones", "Aritmética"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo se devuelve un valor desde una función?",
        options: ["return", "send", "give", "back"],
        correctIndex: 0
      }
    ]
  },
  'list-comprehension': {
    key: 'list-comprehension',
    title: 'Quiz: List Comprehension',
    questions: [
      {
        prompt: "¿Es válido escribir [x for x in list if x % 2 == 0] ?",
        options: ["No, Python no soporta if en listas", "Sí, es una forma compacta de filtrar", "Solo si x es float", "No, falta una lambda"],
        correctIndex: 1
      }
    ]
  },
  'poo': {
    key: 'poo',
    title: 'Quiz: Clases en Python',
    questions: [
      {
        prompt: "¿Cuál es el 'primer' parámetro que debe recibir casi todo método de clase para referirse a sí mismo?",
        options: ["this", "it", "self", "me"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el nombre del método constructor?",
        options: ["class()", "constructor()", "__init__()", "init()"],
        correctIndex: 2
      }
    ]
  }
};
