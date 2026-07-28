import type { Slide } from '../../../types/slides';

export const variablesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '2. Inputs y Variables 📦',
    subtitle: 'Almacenamiento de datos, tipado dinámico, input() y formateo con f-strings',
    badge: 'Python · Lección 2',
    content: 'Las variables permiten guardar información en la memoria de tu equipo para usarla y transformarla a lo largo del programa.',
    bulletPoints: [
      '📦 Creación de variables con el operador de asignación `=`',
      '🏷️ Tipado dinámico: Python detecta el tipo automáticamente',
      '📥 Lectura de datos desde teclado con `input()`',
      '✨ Formateo moderno y limpio con f-strings'
    ],
    keyTakeaway: 'Las variables y los inputs convierten scripts estáticos en programas interactivos con el usuario.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Tipos de Datos Primitivos y Tipado Dinámico',
    badge: 'Fundamentos',
    content: 'En Python no necesitas declarar el tipo de dato explícitamente (como en C# o Java). La variable se adapta al valor que le asignas.',
    bulletPoints: [
      '`int`: Números enteros (ej. `puntos = 100`)',
      '`float`: Números decimales (ej. `pi = 3.1416`)',
      '`str`: Cadenas de texto entre comillas (ej. `nombre = "Ana"`)',
      '`bool`: Valores lógicos `True` o `False`'
    ],
    codeSnippet: {
      filename: 'tipado_dinamico.py',
      lang: 'python',
      code: `# Asignación inicial
mi_variable = 10         # int
print(type(mi_variable)) # <class 'int'>

# Cambiamos el valor y tipo sobre la misma variable
mi_variable = "Ahora soy texto"
print(type(mi_variable)) # <class 'str'>`,
      explanation: 'Python permite reasignar diferentes tipos de datos a una misma variable en tiempo de ejecución.'
    },
    keyTakeaway: 'El tipado dinámico brinda agilidad, pero exige mantener claridad en los nombres de variables.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Entrada de Datos con input()',
    badge: 'Interacción',
    content: 'La función `input("Mensaje: ")` detiene el programa y espera a que el usuario escriba algo en la terminal.',
    bulletPoints: [
      '⚠️ REGLA CRÍTICA: `input()` siempre devuelve un dato de tipo texto (`str`)',
      'Para operar numéricamente debes convertir la entrada con `int()` o `float()`',
      'Si intentas realizar operaciones aritméticas con un `str` no convertido obtendrás un `TypeError` o una concatenación'
    ],
    codeSnippet: {
      filename: 'entrada_usuario.py',
      lang: 'python',
      code: `# Lectura de edad
edad_txt = input("¿Cuántos años tienes? ")

# Conversión explícita a entero
edad = int(edad_txt)
print(f"El próximo año tendrás {edad + 1} años")

# Lectura y conversión directa a flotante
precio = float(input("Precio del producto: "))
print(f"Precio con 10% dcto: {precio * 0.9}")`,
      explanation: 'Siempre convierte input() al tipo numérico correcto antes de realizar operaciones matemáticas.'
    },
    keyTakeaway: 'Usa `int(input(...))` para enteros y `float(input(...))` para importes con decimales.'
  },
  {
    id: 4,
    type: 'diagram',
    title: '5 Formas de Imprimir con print()',
    badge: 'Comparativa',
    content: 'Existen múltiples maneras de combinar variables y texto en Python. f-strings es la recomendación oficial de la industria.',
    visualChart: {
      headers: ['Método', 'Ejemplo de Sintaxis', 'Ventajas / Desventajas'],
      rows: [
        ['1. Con Comas', '`print("Hola", nombre)`', 'Sencillo, pero print agrega espacios automáticamente'],
        ['2. Concatenación +', '`print("Hola " + nombre)`', 'Frágil; rompe si el valor no es un string explícito'],
        ['3. f-strings', '`print(f"Hola {nombre}")`', '✅ Excelente legibilidad, velocidad y formateo en línea'],
        ['4. Método .format()', '`"Hola {}".format(nombre)`', 'Útil para plantillas de texto reutilizables'],
        ['5. Método .join()', '`" ".join([a, b])`', 'Ideal para unir listas de texto con un separador']
      ]
    },
    keyTakeaway: 'Los f-strings (`f"..."`) son más legibles, limpios y eficientes que la concatenación tradicional.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Formateo Avanzado con f-strings',
    badge: 'Formateo f-string',
    content: 'Los f-strings te permiten aplicar modificadores de formato a números decimales y porcentajes dentro del texto.',
    bulletPoints: [
      '`{precio:.2f}`: Redondea a 2 decimales',
      '`{porcentaje:.0%}`: Convierte una tasa decimal (ej. 0.85) a porcentaje `85%`',
      'Permite incluir expresiones matemáticas directamente: `{a + b}`'
    ],
    codeSnippet: {
      filename: 'fstring_formato.py',
      lang: 'python',
      code: `precio = 12.5
progreso = 0.8321

# Redondear decimales
print(f"Precio: {precio:.2f} USD")   # Output: Precio: 12.50 USD

# Porcentaje sin decimales
print(f"Progreso: {progreso:.0%}")  # Output: Progreso: 83%`,
      explanation: 'El especificador :.2f asegura dos decimales fijos en montos de dinero.'
    },
    keyTakeaway: 'Aprovecha las especificaciones de formato f-string para presentar reportes limpios.'
  },
  {
    id: 6,
    type: 'project',
    title: '💻 Ejercicio: Calculadora de Edad Futurista',
    badge: 'Misión Práctica',
    content: 'Desarrolla un programa interactivo que solicite el año de nacimiento del usuario y calcule su edad en el año actual.',
    bulletPoints: [
      '1. Solicitar el año de nacimiento mediante `input()`',
      '2. Convertir la entrada a entero con `int()`',
      '3. Calcular la edad restando del año actual (2026)',
      '4. Imprimir la respuesta formateada con un f-string'
    ],
    codeSnippet: {
      filename: 'calculadora_edad.py',
      lang: 'python',
      code: `nacimiento_txt = input("¿En qué año naciste? ")
nacimiento = int(nacimiento_txt)
anio_actual = 2026

edad = anio_actual - nacimiento
print(f"🎉 En {anio_actual} tienes o cumplirás {edad} años.")`,
      explanation: 'Un flujo completo de entrada, procesamiento numérico y salida formateada.'
    },
    keyTakeaway: '¡Has construido tu primer programa interactivo que procesa datos de usuario!'
  }
];
