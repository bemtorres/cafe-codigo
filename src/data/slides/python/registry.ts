import type { Slide } from './texto-y-conversiones';
import { getQuizForLesson, type QuizQuestion } from './quizzes';
import { getMetaQuestionsForLesson, type MetaReflectionQuestion } from './metacognition';

import { textoYConversionesSlides } from './texto-y-conversiones';
import { condicionalesSlides } from './condicionales';

export { getQuizForLesson, type QuizQuestion };
export { getMetaQuestionsForLesson, type MetaReflectionQuestion };

// --- DIAPOSITIVAS: INTRODUCCIÓN ---
export const introduccionSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Bienvenido a Python 🐍',
    subtitle: 'El lenguaje más popular del mundo para Desarrollo, IA y Ciencia de Datos',
    badge: 'Módulo 1 · Introducción',
    content: 'Python es un lenguaje de programación multiparadigma, de sintaxis limpia y extremadamente legible, diseñado para hacer el desarrollo rápido y accesible.',
    bulletPoints: [
      '🐍 Lenguaje interpretado, dinámico y multiparadigma',
      '✨ Sintaxis basada en sangría legible por humanos',
      '🤖 Ecosistema líder en Inteligencia Artificial y Web',
      '🌐 Comunidad global masiva con miles de librerías'
    ],
    keyTakeaway: 'Python prioriza la legibilidad del código: "Simple es mejor que complejo" (Zen de Python).'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. ¿Por qué aprender Python en 2026?',
    badge: 'Ventajas del Lenguaje',
    content: 'Python combina simplicidad pedagógica para principiantes con poder industrial para construir sistemas reales de inteligencia artificial, automación y backend.',
    bulletPoints: [
      'Curva de aprendizaje suave: escribe en minutos lo que en otros lenguajes toma horas',
      'Versatilidad total: Backend (FastAPI, Django), Data Science (Pandas), IA (PyTorch)',
      'Gran demanda laboral en startups, grandes tecnológicas e investigación científica'
    ],
    codeSnippet: {
      filename: 'hola_mundo.py',
      lang: 'python',
      code: `# Tu primer programa en Python
nombre = "Desarrollador"
print(f"¡Hola, {nombre}! Bienvenido a Café y Código ☕✨")`,
      explanation: 'Una sola línea con print() basta para mostrar mensajes en pantalla en Python.'
    },
    keyTakeaway: 'No necesitas configurar archivos complejos ni clases maestras solo para imprimir una frase.'
  },
  {
    id: 3,
    type: 'diagram',
    title: '2. ¿Cómo ejecuta el código Python?',
    badge: 'Proceso Interno',
    content: 'Python es un lenguaje interpretado: tu código fuente (.py) se traduce a bytecode (.pyc) y la Máquina Virtual de Python (PVM) lo ejecuta instrucción por instrucción.',
    bulletPoints: [
      'El intérprete lee tu archivo de texto plano línea por línea',
      'Detecta errores de sintaxis antes de la ejecución',
      'Permite la ejecución interactiva en consola (REPL) en tiempo real'
    ],
    visualChart: {
      headers: ['Etapa', 'Archivo / Proceso', 'Resultado'],
      rows: [
        ['1. Código Fuente', 'script.py', 'Texto plano escrito por el programador'],
        ['2. Compilación Interna', 'Bytecode (PVM)', 'Instrucciones intermedias optimizadas'],
        ['3. Ejecución', 'Consola / Terminal', 'Salida visible o interacción con el usuario']
      ]
    },
    keyTakeaway: 'El intérprete de Python elimina la fase manual de compilación previa haciendo las pruebas inmediatas.'
  },
  {
    id: 4,
    type: 'summary',
    title: '3. El Zen de Python (PEP 20)',
    badge: 'Filosofía de Código',
    content: 'Un conjunto de 19 principios del software escrito por Tim Peters que guía las decisiones del lenguaje.',
    bulletPoints: [
      'Bello es mejor que feo | Explícito es mejor que implícito',
      'Simple es mejor que complejo | La legibilidad cuenta',
      'Frente a la ambigüedad, rechaza la tentación de adivinar'
    ],
    keyTakeaway: 'Adoptar la filosofía Zen te convertirá en un programador Pythonista elegante.'
  }
];

// --- DIAPOSITIVAS: VARIABLES Y TIPOS ---
export const variablesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Variables y Tipos de Datos 📦',
    subtitle: 'Guardando y categorizando información en memoria',
    badge: 'Módulo 2 · Variables',
    content: 'Una variable es un contenedor nombrado en la memoria del computador que almacena datos que tu programa puede modificar y reutilizar.',
    bulletPoints: [
      '📦 Asignación con el operador igual `=`',
      '🔢 Tipos primitivos: int, float, str, bool',
      '🏷️ Tipado dinámico: Python infiere el tipo automáticamente',
      '📐 Nombres descriptivos con notación `snake_case`'
    ],
    keyTakeaway: 'Las variables le dan memoria y flexibilidad a tus programas.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Tipos de Datos Primitivos',
    badge: 'Fundamentos de Memoria',
    content: 'Python posee 4 tipos de datos numéricos y de texto fundamentales para construir cualquier algoritmo.',
    bulletPoints: [
      '`int`: Números enteros sin decimales (ej. `25`, `-5`)',
      '`float`: Números reales con punto decimal (ej. `3.1416`, `19.99`)',
      '`str`: Cadenas de texto entre comillas (ej. `"Python"`, `'Código'`)',
      '`bool`: Valores de verdad lógica (`True` o `False`)'
    ],
    codeSnippet: {
      filename: 'tipos_primitivos.py',
      lang: 'python',
      code: `edad = 25              # int
precio = 19.99         # float
curso = "Python 3"      # str
es_activo = True       # bool

print(type(edad))      # <class 'int'>
print(type(precio))    # <class 'float'>`,
      explanation: 'La función tipo type() nos permite verificar el tipo de dato que contiene una variable.'
    },
    keyTakeaway: 'Python administra la memoria de las variables automáticamente (Garbage Collector).'
  },
  {
    id: 3,
    type: 'diagram',
    title: '2. Reglas de Nomenclatura (snake_case)',
    badge: 'Buenas Prácticas',
    content: 'Escribir nombres de variables claros es la primera regla para producir código mantenible en equipos.',
    bulletPoints: [
      'Usa minúsculas separadas por guion bajo: `nombre_usuario` (PEP 8)',
      'No comiences con números ni uses palabras reservadas (`if`, `class`, `for`)',
      'Sensible a mayúsculas: `total` y `Total` son dos variables distintas'
    ],
    visualChart: {
      headers: ['Nombre de Variable', 'Estado PEP 8', 'Motivo / Corrección'],
      rows: [
        ['`total_compra`', '✅ Excelente', 'Claro, en español y en snake_case'],
        ['`1er_lugar`', '❌ Error Sintaxis', 'No puede empezar con números ➔ `primer_lugar`'],
        ['`class`', '❌ Error Sintaxis', 'Palabra reservada del lenguaje ➔ `clase_curso`']
      ]
    },
    keyTakeaway: 'Escribe variables cuyo nombre explique por sí mismo el dato que contienen.'
  }
];

// --- DIAPOSITIVAS: BUCLES ---
export const buclesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Bucles y Repetición 🔄',
    subtitle: 'Automatizando tareas repetitivas con for y while',
    badge: 'Módulo 5 · Bucles',
    content: 'Los bucles permiten ejecutar un mismo bloque de código múltiples veces sin necesidad de duplicar instrucciones manualmente.',
    bulletPoints: [
      '🔁 `for`: Iteración determinada sobre rangos o colecciones',
      '⏳ `while`: Repetición condicionada basada en True / False',
      '⚡ `break` y `continue`: Control de flujo en iteración',
      '🔢 `range()`: Generación eficiente de secuencias numéricas'
    ],
    keyTakeaway: 'Los bucles eliminan el código redundante y potencian la automatización.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Bucle for y la función range()',
    badge: 'Iteración Definida',
    content: 'El bucle for en Python itera sobre los elementos de una secuencia o rango definido.',
    bulletPoints: [
      '`range(n)` genera números desde 0 hasta n-1',
      '`range(inicio, fin, paso)` permite controlar el incremento',
      'Ideal para recorrer listas, textos o repetir N veces una acción'
    ],
    codeSnippet: {
      filename: 'bucle_for.py',
      lang: 'python',
      code: `# Imprimir los números del 1 al 5
for i in range(1, 6):
    print(f"Número de iteración: {i}")

# Iterar sobre una lista de frutas
frutas = ["manzana", "banana", "café"]
for f in frutas:
    print(f"Fruta: {f}")`,
      explanation: 'El bucle for extrae un elemento en cada paso y lo asigna a la variable f.'
    },
    keyTakeaway: 'range(start, stop) nunca incluye el número final de alto (stop).'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Bucle while y Control con break / continue',
    badge: 'Iteración Condicionada',
    content: 'Un bucle while se repite MIENTRAS su condición sea verdadera. `break` interrumpe el bucle e `continue` salta a la siguiente vuelta.',
    bulletPoints: [
      'Cuidado con los bucles infinitos: asegura que la condición cambie a False',
      '`break` detiene de inmediato la ejecución del bucle',
      '`continue` ignora el resto del código y salta al siguiente ciclo'
    ],
    codeSnippet: {
      filename: 'bucle_while.py',
      lang: 'python',
      code: `contador = 0
while contador < 5:
    contador += 1
    if contador == 3:
        continue  # Salta el 3
    print(f"Contador: {contador}")`,
      explanation: 'Cuando contador es 3, continue salta la impresión y pasa al 4.'
    },
    keyTakeaway: 'Usa while cuando no sepas exactamente cuántas iteraciones se necesitarán.'
  }
];

// --- DIAPOSITIVAS: LISTAS ---
export const listasSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Listas y Colecciones 📋',
    subtitle: 'Almacenando secuencias mutables de elementos',
    badge: 'Módulo 6 · Listas',
    content: 'Las listas en Python son colecciones ordenadas y mutables de elementos que pueden contener cualquier tipo de dato.',
    bulletPoints: [
      '📋 Sintaxis con corchetes `[elem1, elem2]`',
      '🔢 Índices basados en cero `lista[0]` e índices negativos `lista[-1]`',
      '🛠️ Métodos esenciales: `.append()`, `.pop()`, `.sort()`',
      '✂️ Notación de rebanado (Slicing): `lista[inicio:fin]`'
    ],
    keyTakeaway: 'Las listas son el pilar fundamental para organizar colecciones de datos en Python.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Métodos Principales de Listas',
    badge: 'Manipulación de Colecciones',
    content: 'Python ofrece potentes métodos integrados para modificar y consultar listas en tiempo real.',
    bulletPoints: [
      '`.append(val)`: Agrega un elemento al final de la lista',
      '`.pop(idx)`: Elimina y retorna el elemento en el índice indicado',
      '`.sort()`: Ordena los elementos de menor a mayor',
      '`len(lista)`: Retorna la cantidad total de elementos'
    ],
    codeSnippet: {
      filename: 'metodos_listas.py',
      lang: 'python',
      code: `frutas = ["manzana", "pera"]
frutas.append("naranja")  # Agrega al final
print(frutas)             # ['manzana', 'pera', 'naranja']

eliminado = frutas.pop(0) # Elimina 'manzana'
print(f"Eliminado: {eliminado}")`,
      explanation: 'append modifica la lista directamente agregando el nuevo item al final.'
    },
    keyTakeaway: 'Las listas son mutables: puedes modificar sus elementos sin crear una nueva variable.'
  }
];

// --- DIAPOSITIVAS: DICCIONARIOS ---
export const diccionariosSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Diccionarios Clave-Valor 🔑',
    subtitle: 'Estructuras de datos asociativas y mapeo rápido',
    badge: 'Módulo 7 · Diccionarios',
    content: 'Los diccionarios (`dict`) permiten almacenar datos organizados por parejas de Clave y Valor para accesos ultra rápidos.',
    bulletPoints: [
      '🔑 Sintaxis con llaves `{ "clave": valor }`',
      '⚡ Búsqueda eficiente por clave `dict["clave"]` o `dict.get("clave")`',
      '🔄 Métodos de iteración: `.keys()`, `.values()`, `.items()`',
      '🛠️ Modificación y adición de llaves al vuelo'
    ],
    keyTakeaway: 'Los diccionarios representan información estructurada igual a objetos JSON o registros de BD.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Acceso y Métodos Seguros',
    badge: 'Manejo de Claves',
    content: 'Acceder a una clave inexistente con corchetes genera un `KeyError`. Usar `.get()` evita el fallo retornando `None`.',
    bulletPoints: [
      '`dict.get("clave", defecto)`: Consulta segura sin romper el programa',
      '`dict.items()`: Retorna pares (clave, valor) para iterar en bucles for',
      'Las claves deben ser inmutables (cadenas, números o tuplas)'
    ],
    codeSnippet: {
      filename: 'diccionario_ejemplo.py',
      lang: 'python',
      code: `usuario = {"nombre": "Ana", "rol": "Dev", "puntos": 150}

# Consulta segura
email = usuario.get("email", "no_registrado@mail.com")
print(email) # no_registrado@mail.com

for clave, valor in usuario.items():
    print(f"{clave}: {valor}")`,
      explanation: 'get() retorna el valor por defecto si la clave no existe en el diccionario.'
    },
    keyTakeaway: 'Usa .get() cuando no tengas certeza de la existencia de una clave en el diccionario.'
  }
];

// --- DIAPOSITIVAS: FUNCIONES ---
export const funcionesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Modularización con Funciones 🧩',
    subtitle: 'Reutilizando código y dividiendo problemas complejos',
    badge: 'Módulo 8 · Funciones',
    content: 'Una función es un bloque de código reutilizable diseñado para realizar una tarea específica cuando se le invoca.',
    bulletPoints: [
      '🧩 Definición con la palabra clave `def`',
      '📥 Parámetros de entrada y argumentos por defecto',
      '📤 Retorno de resultados con `return`',
      '🌐 Alcance de variables (Scope local vs global)'
    ],
    keyTakeaway: 'Las funciones evitan repetir código (Principio DRY: Don\'t Repeat Yourself).'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Declaración y Retorno (def & return)',
    badge: 'Sintaxis de Funciones',
    content: 'Las funciones reciben datos a través de parámetros y entregan resultados mediante la instrucción `return`.',
    bulletPoints: [
      'Si no colocas `return`, la función devuelve `None` por defecto',
      'Puedes asignar valores por defecto a los parámetros (ej. `impuesto=0.19`)',
      'Las funciones bien escritas deben tener una sola responsabilidad'
    ],
    codeSnippet: {
      filename: 'funciones_demo.py',
      lang: 'python',
      code: `def calcular_total(precio, impuesto=0.19):
    """Calcula el precio final con IVA."""
    return precio * (1 + impuesto)

total = calcular_total(100)
print(f"Total a pagar: ${total:.2f}")  # $119.00`,
      explanation: 'El parámetro impuesto tiene un valor predeterminado del 19% si no se envía.'
    },
    keyTakeaway: 'Utiliza docstrings ("""...""") para documentar el propósito de cada función.'
  }
];

// --- DIAPOSITIVAS: POO ---
export const pooSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Programación Orientada a Objetos 🏛️',
    subtitle: 'Modelando el mundo real mediante Clases y Objetos',
    badge: 'Módulo 15 · POO',
    content: 'La POO es un paradigma que organiza el código en torno a Objetos (entidades con datos y comportamientos) creados a partir de Clases (moldes).',
    bulletPoints: [
      '🏛️ `class`: El molde o plantilla para instanciar objetos',
      '⚙️ `__init__`: El constructor especial que inicializa atributos',
      '👤 `self`: Referencia a la instancia concreta del objeto',
      '🛡️ Encapsulamiento, Herencia y Polimorfismo'
    ],
    keyTakeaway: 'La POO facilita la creación de aplicaciones escalables y mantenibles a gran escala.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Clases, Atributos y Métodos',
    badge: 'Estructura Principal',
    content: 'Una clase define los atributos (características) y métodos (acciones) que compartirán todos sus objetos.',
    bulletPoints: [
      'El método `__init__` se ejecuta automáticamente al crear un nuevo objeto',
      '`self` debe ser siempre el primer parámetro de todos los métodos',
      'Instanciación: `mi_objeto = NombreClase(argumentos)`'
    ],
    codeSnippet: {
      filename: 'poo_ejemplo.py',
      lang: 'python',
      code: `class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.saldo = saldo_inicial

    def depositar(self, monto):
        self.saldo += monto
        print(f"Depositado ${monto}. Saldo actual: ${self.saldo}")

cuenta_juan = CuentaBancaria("Juan", 500)
cuenta_juan.depositar(200) # Saldo: $700`,
      explanation: '__init__ inicializa el titular y saldo de cuenta_juan cuando se instancia.'
    },
    keyTakeaway: 'Cada objeto instanciado posee su propio estado independiente de los demás objetos.'
  }
];

// --- DIAPOSITIVAS GENÉRICAS PARA CUALQUIER OTRO MÓDULO ---
export function createGenericModuleSlides(slug: string): Slide[] {
  const formattedTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return [
    {
      id: 1,
      type: 'cover',
      title: `${formattedTitle} en Python 🚀`,
      subtitle: `Aprende los fundamentos y mejores prácticas de ${formattedTitle}`,
      badge: `Módulo · ${formattedTitle}`,
      content: `Explora el módulo interactivo de ${formattedTitle} en Python con ejemplos de código real y ejercicios prácticos.`,
      bulletPoints: [
        '🚀 Conceptos clave y sintaxis moderna de Python 3.12+',
        '💡 Patrones de diseño y recomendaciones PEP 8',
        '🧪 Evaluaciones interactivas y ejercicios en tiempo real',
        '☕ Código preparado para tus proyectos reales'
      ],
      keyTakeaway: 'Dominar este módulo impulsará tus habilidades como desarrollador Pythonista.'
    },
    {
      id: 2,
      type: 'concept',
      title: `1. Fundamentos de ${formattedTitle}`,
      badge: 'Conceptos Esenciales',
      content: `Aprende cómo funciona ${formattedTitle} y cómo aplicarlo en tus scripts diarios.`,
      bulletPoints: [
        'Sintaxis limpia y optimizada para producción',
        'Evita errores comunes de tipado y lógica',
        'Buenas prácticas recomendadas por la comunidad'
      ],
      codeSnippet: {
        filename: `${slug.replace(/-/g, '_')}_demo.py`,
        lang: 'python',
        code: `# Ejemplo práctico de ${formattedTitle}
print(f"--- Dominando {formattedTitle} en Python ---")
# Tu código profesional va aquí`,
        explanation: `Ejemplo de inicio rápido para probar ${formattedTitle}.`
      },
      keyTakeaway: 'La práctica constante en código real es la mejor forma de afianzar conocimientos.'
    }
  ];
}

// --- REGISTRO CENTRAL DE TODAS LAS LECCIONES ---
export function getSlidesForLesson(lessonSlug: string): Slide[] {
  switch (lessonSlug) {
    case 'introduccion': return introduccionSlides;
    case 'variables': return variablesSlides;
    case 'texto-y-conversiones': return textoYConversionesSlides;
    case 'condicionales': return condicionalesSlides;
    case 'bucles': return buclesSlides;
    case 'listas': return listasSlides;
    case 'diccionarios': return diccionariosSlides;
    case 'funciones': return funcionesSlides;
    case 'poo': return pooSlides;
    default: return createGenericModuleSlides(lessonSlug);
  }
}
