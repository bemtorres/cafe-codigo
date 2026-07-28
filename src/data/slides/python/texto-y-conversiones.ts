export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  badge?: string;
  type: 'cover' | 'concept' | 'code' | 'diagram' | 'project' | 'summary' | 'quiz_q' | 'quiz_results';
  content?: string;
  bulletPoints?: string[];
  codeSnippet?: {
    filename: string;
    lang: string;
    code: string;
    explanation?: string;
  };
  keyTakeaway?: string;
  visualChart?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export const textoYConversionesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '3. Texto y Tipos Básicos en Python',
    subtitle: 'Aprende a dominar str(), int(), bool() y métodos avanzados de cadenas',
    badge: 'Python · Lección 3',
    content: 'En esta presentación interactiva verás paso a paso cómo Python maneja el texto, cómo convertir tipos de datos sin errores y las herramientas más utilizadas en la industria.',
    bulletPoints: [
      '🔤 Tipo de dato str (cadenas de caracteres)',
      '🔄 Funciones de conversión: int(), float(), str(), bool()',
      '📏 Medir longitud con len() e indexación [0] / [-1]',
      '💻 Proyecto real: Generador de correos corporativos'
    ]
  },
  {
    id: 2,
    type: 'concept',
    title: '🗺️ Temario y Objetivos de la Lección',
    badge: 'Temario',
    content: 'Lo que aprenderás en las siguientes diapositivas:',
    bulletPoints: [
      '1. Inspeccionar tipos de datos con type()',
      '2. Medir longitud de cadenas con len()',
      '3. Indexación [0] y [-1] para acceder a caracteres',
      '4. Rebanadas (Slicing) con [:3] y [2:]',
      '5. Métodos de limpieza: upper(), lower(), strip(), split(), join()',
      '6. Validación con isdigit() y proyecto integrador final'
    ],
    keyTakeaway: '🎯 Cada concepto se explica con código ejecutable e ilustraciones visuales.'
  },
  {
    id: 3,
    type: 'concept',
    title: 'Constructores vs Propiedades: str(), int(), bool()',
    badge: 'Fundamentos',
    content: 'En Python, str("13"), int("123") o bool(1) son funciones incorporadas (constructores) que convierten un valor al tipo deseado.',
    bulletPoints: [
      'str(x) → Convierte cualquier valor a texto.',
      'int(x) → Interpreta el texto como un número entero.',
      'float(x) → Interpreta el texto como decimal.',
      'bool(x) → Devuelve True o False según reglas de verdad.'
    ],
    codeSnippet: {
      filename: 'conversiones.py',
      lang: 'python',
      code: `# De texto a entero\nn = int("123")\nprint(n + 1)  # 124\n\n# Evaluaciones con bool()\nprint(bool(""))     # False\nprint(bool("hola")) # True`,
      explanation: 'input() siempre devuelve un str. Conviértelo con int() o float() antes de hacer cálculos.'
    },
    keyTakeaway: '💡 REGLA DE ORO: input() siempre retorna un str. Conviértelo explícitamente.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Inspeccionar variables con type()',
    badge: 'Herramientas',
    content: 'La función type() te dice exactamente el tipo de dato que contiene una variable.',
    bulletPoints: [
      'Verifica si una entrada sigue siendo texto o si ya se convirtió a número.',
      'Muestra <class \'str\'> para cadenas y <class \'int\'> para enteros.',
      'Indispensable para depurar errores tipo TypeError.'
    ],
    codeSnippet: {
      filename: 'type_check.py',
      lang: 'python',
      code: `dato = input("Escribí un número: ")\nprint(type(dato))  # <class 'str'>\n\nnumero = int(dato)\nprint(type(numero))  # <class 'int'>`,
      explanation: 'type() es tu mejor aliado durante la depuración de programas.'
    },
    keyTakeaway: '🔍 Usa type(x) en tu código cuando recibas errores inesperados de tipo.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Medir la longitud de un texto con len()',
    badge: 'Medición',
    content: 'Un str es una secuencia ordenada de caracteres. len(cadena) cuenta cuántos caracteres contiene.',
    bulletPoints: [
      'Cuenta letras, números, espacios en blanco y símbolos.',
      'Cada espacio visible u oculto cuenta como 1 carácter.',
      'Una cadena vacía "" tiene longitud 0.'
    ],
    codeSnippet: {
      filename: 'longitud_cadenas.py',
      lang: 'python',
      code: `usuario = "Ana"\nfrase = "Café y Código"\n\nprint(len(usuario))  # 3\nprint(len(frase))    # 13 (incluye espacios)\nprint(len(""))       # 0`,
      explanation: 'len() es clave para validar si una clave cumple con la longitud mínima requerida.'
    },
    keyTakeaway: '📏 len() cuenta TODO: letras, números, símbolos y espacios en blanco.'
  },
  {
    id: 6,
    type: 'diagram',
    title: 'Indexación: Acceder a Caracteres [0] y [-1]',
    badge: 'Indexación',
    content: 'Cada carácter en una cadena tiene una posición. Los índices positivos empiezan en 0 y los negativos en -1.',
    bulletPoints: [
      'Índice positivo [0]: Primer carácter de la cadena.',
      'Índice negativo [-1]: Último carácter de la cadena.'
    ],
    visualChart: {
      headers: ['Índice Positivo', '[0]', '[1]', '[2]', '[3]', '[4]', '[5]'],
      rows: [
        ['Carácter', 'P', 'y', 't', 'h', 'o', 'n'],
        ['Índice Negativo', '[-6]', '[-5]', '[-4]', '[-3]', '[-2]', '[-1]']
      ]
    },
    codeSnippet: {
      filename: 'indices.py',
      lang: 'python',
      code: `s = "Python"\nprint(s[0])   # 'P' (Primer carácter)\nprint(s[-1])  # 'n' (Último carácter)`,
      explanation: 'Los índices negativos ahorran calcular len(s) - 1 para obtener la última letra.'
    },
    keyTakeaway: '⚠️ Cuidado: s[0] en una cadena vacía "" provocará IndexError.'
  },
  {
    id: 7,
    type: 'code',
    title: 'Rebanadas o Slicing: [:3] y [2:len(s)]',
    badge: 'Slicing',
    content: 'El slicing extrae fragmentos usando variable[inicio:fin]. El límite "fin" es EXCLUSIVO.',
    bulletPoints: [
      '[:3] → Desde el inicio (0) hasta antes del índice 3 (índices 0, 1 y 2).',
      '[2:] → Desde el índice 2 hasta el final de la cadena.',
      '[1:-1] → Desde la segunda letra hasta antes de la última.'
    ],
    codeSnippet: {
      filename: 'slicing.py',
      lang: 'python',
      code: `sku = "PY-4821"\nprefijo = sku[:2]   # 'PY'\nnumero = sku[3:]    # '4821'`,
      explanation: 'La notación [inicio:fin] nunca incluye el carácter en el índice fin.'
    },
    keyTakeaway: '✂️ Recuerda: el límite final siempre es exclusivo. [:3] toma 0, 1 y 2.'
  },
  {
    id: 8,
    type: 'concept',
    title: 'Transformar Mayúsculas y Minúsculas',
    badge: 'Métodos str',
    content: 'Las cadenas son INMUTABLES. upper() y lower() devuelven un NUEVO texto transformado.',
    bulletPoints: [
      'upper() → Todo en MAYÚSCULAS.',
      'lower() → Todo en minúsculas (ideal para normalizar entradas).',
      'capitalize() → Solo primera letra en mayúscula.'
    ],
    codeSnippet: {
      filename: 'mayusculas.py',
      lang: 'python',
      code: `texto = "café y código"\nprint(texto.upper())  # "CAFÉ Y CÓDIGO"\n\nres = input("Continuar? (S/N): ").lower()\nif res == "s": print("¡OK!")`,
      explanation: 'Normalizar textos con .lower() antes de comparar evita fallos con "S" o "s".'
    },
    keyTakeaway: '✨ upper() y lower() no modifican la variable original; generan una cadena nueva.'
  },
  {
    id: 9,
    type: 'code',
    title: 'Limpieza de Espacios Invisibles con strip()',
    badge: 'Limpieza',
    content: 'strip() remueve espacios accidentales al inicio y al final de una cadena de texto.',
    bulletPoints: [
      'strip() → Limpia espacios a la izquierda y derecha.',
      'lstrip() / rstrip() → Limpia solo un lado.',
      'strip(".") → Remueve caracteres específicos pasados por parámetro.'
    ],
    codeSnippet: {
      filename: 'strip_demo.py',
      lang: 'python',
      code: `entrada = "   hola@cafeycodigo.org   "\nlimpio = entrada.strip()\nprint(limpio)  # "hola@cafeycodigo.org"\n\nusuario = input("Usuario: ").strip().lower()`,
      explanation: 'Combinar .strip().lower() al recibir datos de input() previene errores comunes.'
    },
    keyTakeaway: '🧹 Aplica siempre .strip() al leer entradas de usuario.'
  },
  {
    id: 10,
    type: 'concept',
    title: 'Trocear, Unir y Validar: split(), join(), isdigit()',
    badge: 'Avanzado',
    content: 'Métodos integrados para convertir listas en cadenas, cadenas en listas y validar dígitos.',
    bulletPoints: [
      'split(sep) → Divide un texto en lista según el separador.',
      '"sep".join(lista) → Une elementos de lista en texto.',
      'isdigit() → Devuelve True si el string contiene solo dígitos 0-9.'
    ],
    codeSnippet: {
      filename: 'split_join.py',
      lang: 'python',
      code: `csv = "ana,lucas,diego"\nnombres = csv.split(",")\nprint(nombres)  # ['ana', 'lucas', 'diego']\n\nprint("123".isdigit())  # True`,
      explanation: 'split() y join() son esenciales para trabajar con datos delimitados por comas.'
    },
    keyTakeaway: '🛠️ isdigit() permite validar si un texto es entero antes de llamar a int().'
  },
  {
    id: 11,
    type: 'project',
    title: '💻 Proyecto (1/2): Generador de Correos - Requerimientos',
    badge: 'Proyecto Práctico',
    content: 'Desarrollaremos un generador automático de correos corporativos @cafeycodigo.org.',
    bulletPoints: [
      '1. Solicitar Nombre, Apellido, Correo Personal y Edad.',
      '2. Limpiar espacios con .strip() y normalizar con .lower().',
      '3. Validar que la edad contenga solo dígitos usando .isdigit().',
      '4. Calcular el año de nacimiento (año actual - edad).',
      '5. Formato: 3 letras nombre + 2 letras apellido + . + año + @cafeycodigo.org'
    ],
    keyTakeaway: '📋 Este proyecto integra input, strip, lower, isdigit, int, date y slicing.'
  },
  {
    id: 12,
    type: 'code',
    title: '💻 Proyecto (2/2): Código e Implementación Completa',
    badge: 'Código Proyecto',
    content: 'Código completo en Python:',
    codeSnippet: {
      filename: 'correo_corporativo.py',
      lang: 'python',
      code: `from datetime import date\n\nnombre = input("Nombre: ").strip().lower()\napellido = input("Apellido: ").strip().lower()\nedad_txt = input("Edad: ").strip()\n\nif not edad_txt.isdigit():\n    print("❌ Error: Edad inválida.")\nelse:\n    edad = int(edad_txt)\n    anio = date.today().year - edad\n    usuario = f"{nombre[:3]}{apellido[-2:]}.{anio}"\n    print("Correo:", usuario + "@cafeycodigo.org")`,
      explanation: 'Combina slicing [:3], [-2:], f-strings, conversiones e inspección de datos.'
    },
    keyTakeaway: '🎉 ¡En solo 10 líneas tienes una aplicación funcional lista para producción!'
  },
  {
    id: 13,
    type: 'summary',
    title: '⚡ Cheatsheet (1/2): Conversión, Longitud y Slicing',
    badge: 'Cheatsheet',
    content: 'Resumen de funciones de conversión e inspección:',
    bulletPoints: [
      '🔄 int("5"), str(10), float("3.14"), bool(1)',
      '📏 len(s) → Cuenta total de caracteres',
      '📌 s[0] (primera letra), s[-1] (última letra)',
      '✂️ s[:3] (primeros 3 caracteres), s[2:] (desde el 2 al final)'
    ],
    keyTakeaway: '💡 Mantén esta hoja a mano para consultar la sintaxis rápida.'
  },
  {
    id: 14,
    type: 'summary',
    title: '⚡ Cheatsheet (2/2): Métodos de Transformación y Limpieza',
    badge: 'Cheatsheet',
    content: 'Resumen de métodos de cadenas:',
    bulletPoints: [
      '🔠 s.upper(), s.lower(), s.capitalize(), s.title()',
      '🧹 s.strip() → Limpia espacios en ambos extremos',
      '🧩 s.split(",") → String a Lista | ", ".join(lista) → Lista a String',
      '🔢 s.isdigit() → Verifica si contiene solo números'
    ],
    keyTakeaway: '🚀 ¡Has completado todas las diapositivas teóricas y prácticas de la lección!'
  }
];
