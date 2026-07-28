import type { Slide } from '../../../types/slides';

export const listComprehensionSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '11. List Comprehension ⚡',
    subtitle: 'Creando y filtrando listas de forma concisa y pythonista',
    badge: 'Python · Lección 11',
    content: 'List Comprehension es una sintaxis compacta y expresiva para construir nuevas listas a partir de iterables en una sola línea.',
    bulletPoints: [
      '⚡ Sintaxis: `[expresion for item in iterable]`',
      '🔍 Filtrado opcional: `[expresion for item in iterable if condicion]`',
      '🏎️ Mayor velocidad de ejecución que los bucles `for` tradicionales con `.append()`',
      '🔑 Comprensión de diccionarios: `{clave: valor for item in iterable}`'
    ],
    keyTakeaway: 'List Comprehension es una de las características más amadas y distintivas del estilo Pythonista.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Comparativa: Bucle Tradicional vs List Comprehension',
    badge: 'Sintaxis',
    content: 'Reemplaza 4 líneas de código repetitivo por una sola expresión legible.',
    bulletPoints: [
      'Tradicional: Requiere crear una lista vacía `[]` y llamar a `.append()` en cada ciclo',
      'List Comprehension: Define la transformación e iteración dentro de los propios corchetes `[]`'
    ],
    codeSnippet: {
      filename: 'comparativa_list_comp.py',
      lang: 'python',
      code: `numeros = [1, 2, 3, 4, 5]

# Forma tradicional con for
cuadrados_trad = []
for n in numeros:
    cuadrados_trad.append(n ** 2)

# Forma Pythonista con List Comprehension
cuadrados_comp = [n ** 2 for n in numeros]

print(cuadrados_comp) # [1, 4, 9, 16, 25]`,
      explanation: '[n ** 2 for n in numeros] crea directamente la lista de cuadrados.'
    },
    keyTakeaway: 'La sintaxis inline reduce el código boilerplate manteniendo alta legibilidad.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Filtrado Condicional con if',
    badge: 'Filtros Inline',
    content: 'Puedes incluir un filtro `if` al final de la expresión para incluir únicamente los elementos que cumplan una condición.',
    bulletPoints: [
      'Sintaxis: `[expresion for item in iterable if condicion]`',
      'Solo se transforman e incluyen los items donde el `if` sea True'
    ],
    codeSnippet: {
      filename: 'filtrado_comp.py',
      lang: 'python',
      code: `edades = [12, 25, 17, 30, 15, 40]

# Extraer únicamente mayores de edad
mayores = [e for e in edades if e >= 18]
print(mayores)  # [25, 30, 40]

# Normalizar y filtrar nombres que empiezan con 'A'
nombres = ["Ana", "Pedro", "alberto", "Beatriz"]
nombres_a = [n.capitalize() for n in nombres if n.lower().startswith('a')]
print(nombres_a)  # ['Ana', 'Alberto']`,
      explanation: 'El filtro if e >= 18 descarta los menores antes de agregarlos a la lista final.'
    },
    keyTakeaway: 'List Comprehension permite transformar y filtrar colecciones simultáneamente.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Dictionary Comprehension (Comprensión de Diccionarios)',
    badge: 'Variante Dict',
    content: 'La misma sintaxis se extiende a diccionarios usando llaves `{}` y especificando pares `clave: valor`.',
    codeSnippet: {
      filename: 'dict_comp.py',
      lang: 'python',
      code: `productos = ["café", "té", "agua"]
precios = [2.5, 1.8, 1.0]

# Crear diccionario combinando con zip()
menu = {prod: prec for prod, prec in zip(productos, precios)}
print(menu)  # {'café': 2.5, 'té': 1.8, 'agua': 1.0}`,
      explanation: 'zip() une las listas y la comprensión crea el diccionario al vuelo.'
    },
    keyTakeaway: 'Usa `{k: v for ...}` para transformar o filtrar estructuras de mapas de forma veloz.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de List Comprehension 🎯',
    badge: 'Resumen',
    content: 'Puntos clave del módulo:',
    bulletPoints: [
      '✅ `[expr for item in lista]` genera listas transformadas al instante',
      '✅ Agrega `if condicion` al final para filtrar elementos',
      '✅ Reemplaza patrones extensos de `lista.append()`',
      '✅ Usa `{k: v for ...}` para comprensiones de diccionarios'
    ],
    keyTakeaway: '¡Excelente! Escribir List Comprehensions le dará un estilo 100% Pythonista a tu código.'
  }
];
