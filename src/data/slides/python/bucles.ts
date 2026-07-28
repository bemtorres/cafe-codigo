import type { Slide } from '../../../types/slides';

export const buclesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '6. Bucles y Repetición 🔄',
    subtitle: 'Automatizando procesos repetitivos con for y while',
    badge: 'Python · Lección 6',
    content: 'Los bucles permiten repetir la ejecución de un bloque de código sin necesidad de duplicar instrucciones manualmente.',
    bulletPoints: [
      '🔁 `for`: Iteración sobre secuencias, listas y rangos definidos',
      '⏳ `while`: Repetición condicionada mientras se cumpla una expresión True',
      '⚡ `break` y `continue`: Interrupción y salto de iteración',
      '🔢 `range(inicio, fin, paso)`: Generador de secuencias numéricas'
    ],
    keyTakeaway: 'Los bucles eliminan la redundancia y son la base de la automatización en desarrollo.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Bucle for y la función range()',
    badge: 'Iteración Definida',
    content: 'El bucle `for` en Python itera sobre cada elemento de una secuencia o rango generado por `range()`.',
    bulletPoints: [
      '`range(n)`: Genera números de `0` a `n-1`',
      '`range(start, stop)`: Genera desde `start` hasta antes de `stop`',
      '`range(start, stop, step)`: Incrementa o decrementa por `step`'
    ],
    codeSnippet: {
      filename: 'bucle_for.py',
      lang: 'python',
      code: `# Imprimir los números del 1 al 5
for i in range(1, 6):
    print(f"Iteración N°: {i}")

# Recorrer una lista de textos
frutas = ["manzana", "banana", "café"]
for f in frutas:
    print(f"Item: {f}")`,
      explanation: 'range(1, 6) genera los números 1, 2, 3, 4 y 5. El límite superior 6 no se incluye.'
    },
    keyTakeaway: 'Recordatorio importante: El valor de stop en range() nunca es incluido.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Bucle while (Iteración Condicionada)',
    badge: 'Condición Dinámica',
    content: 'El bucle `while` ejecuta su contenido MIENTRAS la condición especificada evalúe a `True`.',
    bulletPoints: [
      'Ideal cuando no conoces la cantidad exacta de iteraciones de antemano',
      '⚠️ Cuidado con los bucles infinitos: asegúrate de actualizar la variable de control dentro del bloque'
    ],
    codeSnippet: {
      filename: 'bucle_while.py',
      lang: 'python',
      code: `contador = 1

while contador <= 5:
    print(f"Contador actual: {contador}")
    contador += 1  # Incremento fundamental para evitar bucle infinito

print("¡Bucle finalizado exitosamente!")`,
      explanation: 'El bucle se repite mientras contador sea menor o igual a 5.'
    },
    keyTakeaway: 'Usa `while` para menús interactivos o procesos que esperan una entrada de usuario específica.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Control de Flujo: break y continue',
    badge: 'Control en Bucles',
    content: '`break` y `continue` alteran la ejecución normal del bucle durante la iteración.',
    bulletPoints: [
      '`break`: Sale inmediatamente del bucle, terminando todas las iteraciones restantes',
      '`continue`: Salta el resto del código en el ciclo actual y pasa a la siguiente vuelta'
    ],
    codeSnippet: {
      filename: 'break_continue.py',
      lang: 'python',
      code: `# Ejemplo con continue (omitir impares)
for num in range(1, 6):
    if num % 2 != 0:
        continue  # Salta los impares
    print(f"Número par: {num}")

# Ejemplo con break (detener al encontrar 3)
for num in range(1, 10):
    if num == 3:
        break     # Cancela el bucle
    print(f"Valor: {num}")`,
      explanation: 'continue salta la impresión de los impares; break detiene la secuencia al llegar a 3.'
    },
    keyTakeaway: '`break` interrumpe todo el bucle; `continue` salta solo la vuelta actual.'
  },
  {
    id: 5,
    type: 'diagram',
    title: 'Cláusula else en Bucles (for...else / while...else)',
    badge: 'Característica Pythonista',
    content: 'En Python, los bucles pueden llevar una cláusula `else`. Se ejecuta SOLO si el bucle terminó normalmente (sin haber ejecutado un `break`).',
    visualChart: {
      headers: ['Caso de Ejecución', '¿Ocurrió break?', '¿Se ejecuta la rama else?'],
      rows: [
        ['Bucle completó todas sus vueltas', '❌ No', '✅ SÍ (Ejecuta else)'],
        ['Se activó la instrucción break', '✅ Sí', '❌ NO (Omite else)']
      ]
    },
    codeSnippet: {
      filename: 'busqueda_for_else.py',
      lang: 'python',
      code: `nombres = ["Ana", "Pedro", "Diego"]
buscado = "Carlos"

for n in nombres:
    if n == buscado:
        print("Encontrado!")
        break
else:
    print("❌ El elemento no se encuentra en la lista.")`,
      explanation: 'Como "Carlos" no está en la lista, nunca se activa el break y se ejecuta el else final.'
    },
    keyTakeaway: '`for...else` es ideal para algoritmos de búsqueda sin banderas o flags booleanas auxiliares.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de Bucles 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en este módulo:',
    bulletPoints: [
      '✅ `for` itera secuencias y rangos con `range(inicio, fin, paso)`',
      '✅ `while` repite código mientras su condición se mantenga `True`',
      '✅ `break` detiene de inmediato el bucle',
      '✅ `continue` ignora el resto de la iteración actual',
      '✅ `else` en bucles corre únicamente si no hubo un `break`'
    ],
    keyTakeaway: '¡Excelente! Ahora puedes procesar colecciones de datos masivas con bucles en Python.'
  }
];
