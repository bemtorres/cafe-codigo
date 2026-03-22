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
      },
      {
        prompt: "¿Cuál de estos es un comentario válido en Python?",
        options: ["// Comentario", "/* Comentario */", "# Comentario", "-- Comentario"],
        correctIndex: 2
      },
      {
        prompt: "Python es un lenguaje...",
        options: ["Compilado", "De bajo nivel", "Interpretado", "Solo para móviles"],
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
      },
      {
        prompt: "¿Cuál de estos nombres de variable es INVÁLIDO en Python?",
        options: ["mi_variable", "_secreto", "2items", "NombreUsuario"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el resultado de: print(type(3.14)) ?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'number'>"],
        correctIndex: 1
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
        options: ["La lista es indexada, la tupla no", "La lista es mutable (se cambia), la tupla es inmutable (fija)", "Las tuplas solo aceptan números", "Las listas son infinitas, las tuplas no"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando eliminaría el último elemento de una lista de nombre 'items'?",
        options: ["items.delete()", "items.remove_last()", "items.pop()", "del items[0]"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué imprime: lista = [1, 2, 3]; print(lista[-1]) ?",
        options: ["1", "3", "Error", "2"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo obtenemos la longitud (cantidad de elementos) de una lista x?",
        options: ["x.size()", "x.length", "len(x)", "count(x)"],
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
      },
      {
        prompt: "¿Cómo eliminamos una clave 'edad' de un diccionario 'user'?",
        options: ["user.remove('edad')", "del user['edad']", "user.pop_key('edad')", "user['edad'] = None"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué método devuelve todas las CLAVES de un diccionario?",
        options: [".values()", ".items()", ".keys()", ".all()"],
        correctIndex: 2
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
      },
      {
        prompt: "¿Qué operador se usa para comparar si dos valores son IGUALES?",
        options: ["=", "==", "===", "is"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el resultado de: print(not True) ?",
        options: ["True", "False", "None", "Error"],
        correctIndex: 1
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
      },
      {
        prompt: "¿Qué imprime range(2, 5)?",
        options: ["[2, 3, 4, 5]", "[2, 3, 4]", "[3, 4, 5]", "[2, 5]"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el riesgo principal de un bucle 'while True:' sin un break?",
        options: ["No pasará nada", "Error de sintaxis", "Bucle infinito (bloqueo)", "Se ejecuta solo una vez"],
        correctIndex: 2
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
      },
      {
        prompt: "¿Cómo se llama a una función que se define a sí misma (en una línea) sin nombre?",
        options: ["Mini-function", "Lambda", "Direct func", "In-line"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué sucede si una función no tiene un 'return' explícito?",
        options: ["Da error", "Devuelve 0", "Devuelve None", "Devuelve False"],
        correctIndex: 2
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
      },
      {
        prompt: "¿Qué crea: [i*i for i in range(3)] ?",
        options: ["[1, 4, 9]", "[0, 1, 4]", "[0, 1, 2]", "[1, 2, 3]"],
        correctIndex: 1
      },
      {
        prompt: "La List Comprehension es generalmente más... que un bucle for tradicional.",
        options: ["Lenta", "Difícil de leer siempre", "Rápida y compacta", "Innecesaria"],
        correctIndex: 2
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
      },
      {
        prompt: "¿Cómo se crea una instancia de la clase 'Usuario'?",
        options: ["u = new Usuario()", "u = Usuario()", "u = create Usuario", "u = Usuario.new()"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es la 'Herencia' en POO?",
        options: ["Borrar una clase", "Que una clase reciba métodos y atributos de otra", "Guardar datos en disco", "Un tipo de variable"],
        correctIndex: 1
      }
    ]
  },
  'modulos': {
    key: 'modulos',
    title: 'Quiz: Módulos y PIP',
    questions: [
      {
        prompt: "¿Cuál es la palabra clave para traer código de otro archivo o librería?",
        options: ["use", "require", "import", "fetch"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué significa PIP?",
        options: ["Python Install Program", "Pip Installs Packages", "Program Interface Python", "Preferred Install Provider"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se instala una librería externa como 'requests'?",
        options: ["python install requests", "pip install requests", "get requests", "install requests"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo importas SOLO la función 'random' del módulo 'math'? (Nota: ejemplo irreal)",
        options: ["import random from math", "from math import random", "math.import(random)", "using math.random"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué archivo se usa comúnmente para listar todas las dependencias de un proyecto Python?",
        options: ["dependencies.json", "packages.txt", "requirements.txt", "setup.py"],
        correctIndex: 2
      }
    ]
  }
};
