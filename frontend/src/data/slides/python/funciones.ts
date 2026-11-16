import type { Slide } from '../../../types/slides';

export const funcionesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9. Modularización con Funciones 🧩',
    subtitle: 'Reutilizando código y dividiendo problemas con def, return y lambdas',
    badge: 'Python · Lección 9',
    content: 'Una función es un bloque de código reutilizable diseñado para realizar una tarea específica cuando se le invoca.',
    bulletPoints: [
      '🧩 Definición con la palabra clave `def` y los dos puntos `:`',
      '📥 Parámetros de entrada y argumentos con valores por defecto',
      '📤 Retorno de resultados mediante la instrucción `return`',
      '🌐 Alcance de variables (Scope local vs global)',
      '⚡ Funciones anónimas de una línea con `lambda`'
    ],
    keyTakeaway: 'Las funciones aplican el principio DRY (Don\'t Repeat Yourself) para mantener tu código modular.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Declaración def y Retorno de Valores return',
    badge: 'Sintaxis de Funciones',
    content: 'Las funciones reciben datos mediante parámetros y devuelven resultados procesados con `return`.',
    bulletPoints: [
      'Si una función no incluye `return`, devuelve `None` de forma implícita (como `print()`)',
      'Puedes asignar valores predeterminados a parámetros: `def saludar(nombre="Visitante"):`',
      'Docstrings (`"""..."""`) permiten documentar la función dentro de la propia sintaxis'
    ],
    codeSnippet: {
      filename: 'funcion_basica.py',
      lang: 'python',
      code: `def calcular_total(precio, impuesto=0.19):
    """Calcula el precio final incluyendo el IVA."""
    return precio * (1 + impuesto)

# Invocación con argumento por defecto (19%)
total1 = calcular_total(100)
print(f"Total 1: \${total1:.2f}")

# Invocación sobrescribiendo el parámetro opcional
total2 = calcular_total(100, impuesto=0.08)
print(f"Total 2: \${total2:.2f}")`,
      explanation: 'impuesto tiene valor 0.19 si no se proporciona explicitamente al llamar a la función.'
    },
    keyTakeaway: 'Utiliza `return` cuando necesites reutilizar el resultado en el resto del programa.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Alcance de Variables (Local vs Global Scope)',
    badge: 'Scope y Memoria',
    content: 'Las variables creadas dentro de una función solo existen dentro de ella (scope local).',
    bulletPoints: [
      'Las variables locales no se pueden leer fuera de la función',
      'Las variables globales se leen desde cualquier lugar, pero no deben abusarse',
      'Evita usar la palabra clave `global` a menos que sea estrictamente indispensable'
    ],
    codeSnippet: {
      filename: 'scope_demo.py',
      lang: 'python',
      code: `descuento_global = 0.10  # Variable Global

def aplicar_descuento(precio):
    ahorro_local = precio * descuento_global  # Variable Local
    return precio - ahorro_local

print(aplicar_descuento(50)) # 45.0
# print(ahorro_local)        # ❌ NameError: 'ahorro_local' is not defined`,
      explanation: 'ahorro_local desaparece en cuanto la función termina su ejecución.'
    },
    keyTakeaway: 'Mantén el estado de las variables encapsulado dentro de las funciones.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Funciones Anónimas: lambda',
    badge: 'Expresiones Lambda',
    content: 'Para funciones pequeñas de una sola línea, Python ofrece las expresiones `lambda`.',
    bulletPoints: [
      'Sintaxis: `lambda parametro1, parametro2: expresion`',
      'Devuelven el resultado de la expresión automáticamente (sin escribir `return`)',
      'Comunes como argumentos en funciones como `map()`, `filter()` o `.sort(key=...)` '
    ],
    codeSnippet: {
      filename: 'lambda_ejemplo.py',
      lang: 'python',
      code: `# Función normal
def duplicar(x):
    return x * 2

# Equivalente con lambda
duplicar_lambda = lambda x: x * 2

print(duplicar(5))        # 10
print(duplicar_lambda(5)) # 10`,
      explanation: 'lambda crea funciones concisas en una sola línea.'
    },
    keyTakeaway: 'Usa `lambda` para operaciones matemáticas cortas o transformaciones de listas inmediatas.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Funciones 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en este módulo:',
    bulletPoints: [
      '✅ `def nombre_funcion(parametros):` define la instrucción',
      '✅ `return` entrega la respuesta calculada y detiene la función',
      '✅ Los parámetros por defecto hacen flexibles las invocaciones',
      '✅ Scope: Las variables locales viven únicamente dentro de la función',
      '✅ `lambda` permite escribir funciones simples inline en una sola línea'
    ],
    keyTakeaway: '¡Excelente! Escribir funciones limpias te permitirá modularizar programas complejos.'
  }
];
