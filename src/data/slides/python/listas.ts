import type { Slide } from '../../../types/slides';

export const listasSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7. Listas y Tuplas 📋',
    subtitle: 'Almacenando secuencias de datos mutables e inmutables',
    badge: 'Python · Lección 7',
    content: 'Las listas y tuplas permiten agrupar múltiples elementos dentro de una sola variable de manera ordenada.',
    bulletPoints: [
      '📋 Listas: Colecciones mutables con sintaxis de corchetes `[a, b, c]`',
      '🔒 Tuplas: Colecciones inmutables con sintaxis de paréntesis `(a, b, c)`',
      '🔢 Índices de acceso base-cero `[0]` e índices negativos `[-1]`',
      '✂️ Rebanado (Slicing): Extraer sublistas con `lista[inicio:fin]`'
    ],
    keyTakeaway: 'Las listas y tuplas son los pilares fundamentales para manejar secuencias en Python.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Listas: Mutabilidad e Indexación',
    badge: 'Fundamentos',
    content: 'Una lista es una secuencia ordenada de elementos modificables (mutables). Puede almacenar cualquier tipo de dato.',
    bulletPoints: [
      'Indexación positiva `[0]` a `[len-1]` | Indexación negativa `[-1]` (último item)',
      'Mutabilidad: Puedes modificar un valor asignando directamente `lista[0] = nuevo_valor`',
      'Slicing: `lista[1:4]` extrae los elementos de los índices 1, 2 y 3'
    ],
    codeSnippet: {
      filename: 'listas_basico.py',
      lang: 'python',
      code: `frutas = ["manzana", "banana", "cereza"]

# Modificación directa
frutas[0] = "frutilla"
print(frutas)  # ['frutilla', 'banana', 'cereza']

# Acceso negativo y slicing
print(frutas[-1])   # 'cereza'
print(frutas[:2])   # ['frutilla', 'banana']`,
      explanation: 'Las listas permiten cambiar su contenido sin necesidad de crear una nueva variable.'
    },
    keyTakeaway: 'Las listas son mutables: se pueden alterar en el lugar (in-place).'
  },
  {
    id: 3,
    type: 'code',
    title: 'Métodos Esenciales de Listas',
    badge: 'Métodos Mutadores',
    content: 'Python provee métodos integrados para agregar, eliminar y ordenar elementos.',
    bulletPoints: [
      '`.append(val)`: Agrega un elemento al final de la lista',
      '`.insert(pos, val)`: Inserta un elemento en la posición especificada',
      '`.pop(idx)`: Elimina y retorna el elemento en el índice (por defecto el último)',
      '`.remove(val)`: Elimina la primera ocurrencia del valor',
      '`.sort()`: Ordena los elementos en lugar (in-place)'
    ],
    codeSnippet: {
      filename: 'metodos_listas.py',
      lang: 'python',
      code: `numeros = [4, 1, 9, 2]

numeros.append(5)      # [4, 1, 9, 2, 5]
numeros.sort()         # [1, 2, 4, 5, 9]

ultimo = numeros.pop() # Elimina 9 y lo guarda
print(f"Eliminado: {ultimo}, Lista final: {numeros}")`,
      explanation: 'sort() modifica directamente la lista original.'
    },
    keyTakeaway: '`append()` y `pop()` permiten usar una lista en Python como una Pila (LIFO).'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Tuplas: Colecciones Inmutables 🔒',
    badge: 'Tuplas',
    content: 'Una tupla es una secuencia ordenada pero INMUTABLE. Una vez creada, sus elementos no se pueden modificar, agregar ni eliminar.',
    bulletPoints: [
      'Sintaxis con paréntesis: `coordenadas = (10.5, -73.2)`',
      'Más rápidas y ligeras en memoria que las listas',
      'Desempaquetado de tuplas: `x, y = coordenadas`',
      'Protegen datos sensibles o constantes de ser alterados por error'
    ],
    codeSnippet: {
      filename: 'tuplas_demo.py',
      lang: 'python',
      code: `punto = (10, 20)

# Desempaquetado elegante
x, y = punto
print(f"X: {x}, Y: {y}")

# Intento de modificación ➔ TypeError
# punto[0] = 15  # ❌ TypeError: 'tuple' object does not support item assignment`,
      explanation: 'Las tuplas lanzan TypeError si intentas modificar sus elementos.'
    },
    keyTakeaway: 'Usa tuplas para datos fijos como coordenadas, dimensiones o configuraciones.'
  },
  {
    id: 5,
    type: 'diagram',
    title: 'Comparativa: Listas vs Tuplas',
    badge: 'Tabla Comparativa',
    content: 'Diferencias clave entre `list` y `tuple` en Python.',
    visualChart: {
      headers: ['Característica', 'Lista [ ]', 'Tupla ( )'],
      rows: [
        ['Mutabilidad', '✅ Mutable (se puede modificar)', '🔒 Inmutable (fija)'],
        ['Rendimiento', 'Ligeramente más lenta', '⚡ Más rápida y ligera en memoria'],
        ['Uso común', 'Colecciones dinámicas de elementos', 'Registros fijos, coordenadas y retornos múltiples'],
        ['Métodos', 'Abundantes (.append, .sort, .pop)', 'Limitados (.count, .index)']
      ]
    },
    keyTakeaway: 'Regla general: Usa Listas si el tamaño o contenido cambiará; usa Tuplas si la información es fija.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de Listas y Tuplas 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en este módulo:',
    bulletPoints: [
      '✅ Listas `[ ]`: Ordenadas, mutables y con indexación cero',
      '✅ Métodos mutadores: `.append()`, `.pop()`, `.remove()`, `.sort()`',
      '✅ Slicing `[inicio:fin]` extrae fragmentos sin modificar la lista original',
      '✅ Tuplas `( )`: Inmutables, más eficientes y aptas para desempaquetado `a, b = tuple`'
    ],
    keyTakeaway: '¡Excelente! Ya dominas la manipulación de secuencias dinámicas y fijas en Python.'
  }
];
