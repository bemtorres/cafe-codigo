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
  'texto-y-conversiones': {
    key: 'texto-y-conversiones',
    title: 'Quiz: Texto y conversiones (str, int, bool)',
    questions: [
      {
        prompt: "¿Qué devuelve int('42') en Python?",
        options: ["El texto '42'", "El entero 42", "Un error siempre", "El float 42.0"],
        correctIndex: 1,
      },
      {
        prompt: "¿Cuál es el resultado de str(3.14)?",
        options: ["314", "3.14 como número", "La cadena '3.14'", "None"],
        correctIndex: 2,
      },
      {
        prompt: "¿Qué imprime: print(bool('')) ?",
        options: ["True", "False", "None", "Error"],
        correctIndex: 1,
      },
      {
        prompt: "¿Qué método de str quita espacios al inicio y al final?",
        options: [".trim()", ".strip()", ".clean()", ".remove_spaces()"],
        correctIndex: 1,
      },
      {
        prompt: "Si s = 'a,b,c', ¿qué devuelve s.split(',')?",
        options: [
          "Un string 'abc'",
          "La lista ['a', 'b', 'c']",
          "Una tupla ('a', 'b', 'c')",
          "Error",
        ],
        correctIndex: 1,
      },
    ],
  },
  'listas': {
    key: 'listas',
    title: 'Quiz: Análisis de Listas y Tuplas',
    questions: [
      {
        prompt: "Si queremos acceder al precio del primer producto (Laptop) usando productos[0], ¿cuál expresión es la correcta?",
        options: ["productos[0][1]", "productos[0][2]", "productos[0][3]", "productos[0][4]"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué índice de la tupla representa la categoría de un producto (ej: 'Electrónica')?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la categoría del producto productos[3] (Escritorio de Madera) en la lista?",
        options: ["Electrónica", "Oficina", "Cocina", "Salud"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué retorna la expresión productos[-1][1] en la consola de Python?",
        options: ["'Laptop'", "'Cafetera de Goteo'", "'Audífonos Bluetooth'", "Lanza un IndexError"],
        correctIndex: 1
      },
      {
        prompt: "Si ejecutas la instrucción: productos[2][4] = 60, ¿qué sucede?",
        options: [
          "El stock del Teclado Mecánico cambia exitosamente a 60",
          "Se crea una nueva tupla en el inventario",
          "Lanza un TypeError porque las tuplas son inmutables",
          "Se elimina el producto de la lista"
        ],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo obtenemos el stock de los 'Audífonos Bluetooth' (ubicados en el índice 4)?",
        options: ["productos[4][2]", "productos[4][3]", "productos[4][4]", "productos[4][0]"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el código identificador (ID) del producto productos[1] (Silla Ergonómica)?",
        options: ["'PROD01'", "'PROD02'", "'PROD03'", "'PROD04'"],
        correctIndex: 1
      },
      {
        prompt: "Para saber cuántos productos diferentes existen en la lista de inventario, ¿qué función usamos?",
        options: ["size(productos)", "productos.length()", "len(productos)", "count(productos)"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el valor del primer elemento de la tupla productos[5]?",
        options: ["'PROD06'", "'Cafetera de Goteo'", "60.00", "'Cocina'"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál de los productos del catálogo tiene el menor precio unitario (mas_barato)?",
        options: ["Teclado Mecánico", "Escritorio de Madera", "Cafetera de Goteo", "Audífonos Bluetooth"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el precio unitario del producto más caro (Laptop) del catálogo?",
        options: ["150.00", "250.00", "850.00", "120.00"],
        correctIndex: 2
      },
      {
        prompt: "Si sumamos el stock total de los productos de categoría 'Oficina' (25 de Silla y 10 de Escritorio), ¿cuál es el total?",
        options: ["15", "25", "35", "50"],
        correctIndex: 2
      },
      {
        prompt: "Si la variable 'mas_barato' contiene la tupla de la Cafetera, ¿qué expresión nos devuelve su nombre?",
        options: ["mas_barato[0]", "mas_barato[1]", "mas_barato[2]", "mas_barato[3]"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuántos productos diferentes en el catálogo pertenecen a la categoría 'Electrónica'?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1
      },
      {
        prompt: "Si ejecutas productos.append(('PROD07', 'Mouse', 25.0, 'Electrónica', 100)), ¿cuál será el largo final de la lista?",
        options: ["5", "6", "7", "8"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué tipo de dato estructurado de Python es productos[0]?",
        options: ["lista", "tupla", "diccionario", "conjunto"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué tipo de dato es la variable contenedora 'productos'?",
        options: ["lista", "tupla", "diccionario", "string"],
        correctIndex: 0
      },
      {
        prompt: "Si haces un slicing de la lista: recorte = productos[1:4], ¿cuántos elementos tendrá la nueva lista 'recorte'?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el valor almacenado en productos[0][4] (stock de Laptop)?",
        options: ["850.00", "15", "'PROD01'", "'Electrónica'"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué string devuelve la expresión productos[3][1]?",
        options: ["'Teclado Mecánico'", "'Escritorio de Madera'", "'Silla Ergonómica'", "'Cafetera de Goteo'"],
        correctIndex: 1
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
  'try-except': {
    key: 'try-except',
    title: 'Quiz: try / except',
    questions: [
      {
        prompt: "¿Qué palabras clave se usan para capturar errores en Python?",
        options: ["catch / throw", "try / except", "begin / rescue", "do / done"],
        correctIndex: 1,
      },
      {
        prompt: "Si int('hola') falla, ¿qué tipo de excepción es lo más típico?",
        options: ["KeyError", "TypeError", "ValueError", "SyntaxError"],
        correctIndex: 2,
      },
      {
        prompt: "El bloque `else` en try/except se ejecuta cuando…",
        options: [
          "Siempre, al final",
          "Solo si hubo una excepción",
          "Solo si el try terminó sin excepción",
          "Nunca existe en Python",
        ],
        correctIndex: 2,
      },
      {
        prompt: "¿Para qué sirve `finally`?",
        options: [
          "Solo para cerrar el programa",
          "Se ejecuta siempre (haya error o no), al salir del try/except",
          "Es sinónimo de except",
          "Solo se usa en bucles",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Cómo lanzás vos una excepción explícitamente?",
        options: ["throw Error()", "raise ValueError('mensaje')", "except up", "panic()"],
        correctIndex: 1,
      },
    ],
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
  },
  'manejo-archivos': {
    key: 'manejo-archivos',
    title: 'Quiz: Lectura y Escritura de Archivos',
    questions: [
      {
        prompt: "¿Cuál es la ventaja principal de usar 'with open()' al manejar archivos?",
        options: ["Hace que la lectura sea más rápida", "Cierra automáticamente el archivo, incluso si ocurre un error", "No requiere importar el módulo os", "Permite comprimir el archivo automáticamente"],
        correctIndex: 1
      },
      {
        prompt: "Si queremos AÑADIR texto al final de un archivo existente sin borrar su contenido, ¿qué modo usamos?",
        options: ["'w' (write)", "'r' (read)", "'a' (append)", "'x' (exclusive)"],
        correctIndex: 2
      },
      {
        prompt: "En el módulo 'csv', ¿cómo configuramos un delimitador personalizado como punto y coma?",
        options: ["csv.writer(f, split=';')", "csv.writer(f, separator=';')", "csv.writer(f, delimiter=';')", "csv.writer(f, symbol=';')"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué formato es preferible para guardar configuraciones complejas o diccionarios anidados en Python?",
        options: ["CSV", "TXT", "JSON", "XML"],
        correctIndex: 2
      },
      {
        prompt: "En el módulo 'json', ¿para qué sirve el parámetro 'indent=4' en json.dump()?",
        options: ["Para comprimir el archivo", "Para dar un formato visual ordenado y legible con sangrías", "Para encriptar los datos", "Para limitar el número de claves"],
        correctIndex: 1
      }
    ]
  },
  'seguridad-bandit-sonarqube': {
    key: 'seguridad-bandit-sonarqube',
    title: 'Quiz: Seguridad y Calidad con Bandit y SonarQube',
    questions: [
      {
        prompt: "¿Cuál es el propósito principal de la herramienta Bandit?",
        options: ["Optimizar la velocidad de ejecución de Python", "Encontrar vulnerabilidades de seguridad específicas en código Python", "Subir el código a producción automáticamente", "Dar formato al código según PEP 8"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué tipo de error detectará preferentemente SonarQube pero que Bandit podría ignorar?",
        options: ["Uso inseguro de eval()", "Contraseñas escritas en texto plano (hardcoded)", "Complejidad cognitiva alta y código duplicado (code smells)", "Deserialización peligrosa con pickle"],
        correctIndex: 2
      },
      {
        prompt: "Si Bandit encuentra un uso de 'eval()' en tu código, ¿cómo lo clasifica típicamente?",
        options: ["Error de compilación", "Advertencia de baja prioridad", "Vulnerabilidad / Riesgo de seguridad (High Severity)", "Sugerencia estética"],
        correctIndex: 2
      },
      {
        prompt: "¿A qué se refiere el término 'Code Smell' (olor de código) en SonarQube?",
        options: ["Código que produce errores de sintaxis", "Código que vulnera la seguridad del servidor", "Síntoma de mal diseño que dificulta el mantenimiento del software", "Código escrito en un idioma diferente"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo se complementan Bandit y SonarQube en un flujo profesional (CI/CD)?",
        options: ["SonarQube reemplaza a Bandit por completo", "Bandit analiza vulnerabilidades rápidas de Python y SonarQube evalúa la calidad y salud global del repositorio", "Bandit compila el código y SonarQube lo ejecuta en producción", "No se pueden usar juntos porque causan conflictos de dependencias"],
        correctIndex: 1
      }
    ]
  },
  'entornos-virtuales': {
    key: 'entornos-virtuales',
    title: 'Quiz: Entornos Virtuales en Python',
    questions: [
      {
        prompt: "¿Cuál es el propósito principal de un entorno virtual en Python?",
        options: ["Hacer que el código corra el doble de rápido", "Crear una copia del sistema operativo", "Aislar las librerías de un proyecto para evitar conflictos de versiones", "Ejecutar programas en la nube de forma gratuita"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué comando estándar crea un entorno virtual llamado '.venv' en Python 3?",
        options: ["python create venv .venv", "python -m venv .venv", "pip install virtualenv .venv", "venv make .venv"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se activa un entorno virtual en Windows usando PowerShell?",
        options: ["source .venv/bin/activate", ".venv\\Scripts\\Activate.ps1", "start .venv", "pip activate .venv"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué sucede cuando instalas una librería con PIP mientras el entorno virtual está activo?",
        options: ["Se instala en todo tu sistema operativo globalmente", "Se instala únicamente dentro de la carpeta del entorno virtual del proyecto", "Se sube directamente a internet", "Falla el comando porque requiere permisos de administrador"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo desactivas un entorno virtual activo de vuelta a tu terminal global?",
        options: ["exit", "deactivate", "stop venv", "pip uninstall venv"],
        correctIndex: 1
      }
    ]
  }
};
