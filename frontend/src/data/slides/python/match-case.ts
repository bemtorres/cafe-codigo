import type { Slide } from '../../../types/slides';

export const matchCaseSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '5. match / case: Patrón Estructural 🔀',
    subtitle: 'El sustituto moderno de switch en Python 3.10+',
    badge: 'Python · Lección 5',
    content: 'Introducido en Python 3.10 (PEP 634), `match...case` ofrece una forma elegante y legible de comparar un valor contra múltiples patrones posibles.',
    bulletPoints: [
      '🔀 Sintaxis clara para dispatching de comandos y menús',
      '🎯 Wildcard `case _:` como comodín por defecto (fall-through)',
      '🔀 Tubería `|` para agrupar múltiples patrones en una sola línea',
      '🛡️ Guardas con `if` para filtrar condiciones sobre el patrón'
    ],
    keyTakeaway: '`match...case` reemplaza extensas cadenas de `if...elif` con un código estructurado como una tabla.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Sintaxis Mínima y Comodín (_)',
    badge: 'Sintaxis Básica',
    content: 'El patrón evalúa la variable en el `match` y busca el primer `case` que encaje. El guion bajo `_` captura cualquier valor restante.',
    bulletPoints: [
      'Requiere Python 3.10 o superior',
      'Cada `case` se ejecuta de forma aislada (no requiere `break` como C/Java)',
      '`case _:` actúa como la rama `default` o `else`'
    ],
    codeSnippet: {
      filename: 'esqueleto_match.py',
      lang: 'python',
      code: `comando = "iniciar"

match comando:
    case "iniciar":
        print("🚀 Sistema iniciando...")
    case "detener":
        print("🛑 Sistema detenido")
    case _:
        print("❓ Comando no reconocido")`,
      explanation: 'Python evalúa "iniciar", encuentra la coincidencia en el primer case y sale automáticamente.'
    },
    keyTakeaway: 'A diferencia de C++, en Python NO existe el fall-through implícito; solo entra al case coincidente.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Múltiples Patrones con el Operador OR (|)',
    badge: 'Agrupación de Casos',
    content: 'Puedes combinar varios valores posibles en un solo `case` separándolos con la tubería `|` (OR lógico).',
    bulletPoints: [
      'Evita duplicar código cuando diferentes opciones requieren la misma acción',
      'Muy útil para procesar códigos HTTP o días laborables vs fin de semana'
    ],
    codeSnippet: {
      filename: 'codigos_http.py',
      lang: 'python',
      code: `codigo_http = 404

match codigo_http:
    case 200 | 201:
        print("✅ Solicitud exitosa (OK)")
    case 400 | 422:
        print("⚠️ Error en los datos enviados")
    case 401 | 403:
        print("🔒 Error de permisos o autenticación")
    case 404:
        print("❌ Recurso no encontrado")
    case _:
        print("🚨 Error de servidor o desconocido")`,
      explanation: 'La tubería | permite agrupaciones como 200 o 201 en un único bloque.'
    },
    keyTakeaway: 'Usa `|` para agrupar respuestas o comandos con comportamiento idéntico.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Guardas de Condición (Guards con if)',
    badge: 'Filtros Avanzados',
    content: 'Un `case` puede incluir una cláusula `if` (llamada guarda) que debe ser True para que el caso coincida.',
    bulletPoints: [
      'Formato: `case patrón if condición_adicional:`',
      'Permite evaluar valores dentro de un rango numérico o reglas de negocio complejas'
    ],
    codeSnippet: {
      filename: 'guardas_match.py',
      lang: 'python',
      code: `temperatura = 35

match temperatura:
    case t if t >= 40:
        print("🔥 Calor extremo: Alerta roja")
    case t if t >= 30:
        print("☀️ Día caluroso: Usa bloqueador solar")
    case t if t <= 0:
        print("❄️ Temperatura bajo cero")
    case _:
        print("🌡️ Temperatura templada")`,
      explanation: 'Asigna el valor a t y evalúa la condición de guarda antes de entrar al bloque.'
    },
    keyTakeaway: 'Las guardas con `if` combinan el pattern matching con la flexibilidad condicional.'
  },
  {
    id: 5,
    type: 'diagram',
    title: '¿Cuándo usar match/case vs if/elif/else?',
    badge: 'Guía de Diseño',
    content: 'Criterios para elegir la mejor estructura en tus programas.',
    visualChart: {
      headers: ['Criterio', 'Usar match / case', 'Usar if / elif / else'],
      rows: [
        ['Evaluación principal', 'Comparar un valor contra múltiples opciones fijas o patrones', 'Condiciones complejas con múltiples variables heterogéneas'],
        ['Legibilidad', 'Excelente para menús, comandos y estados HTTP', 'Adecuado para rangos de edad o combinaciones and/or'],
        ['Compatibilidad', 'Requiere Python 3.10+', 'Compatible con cualquier versión de Python']
      ]
    },
    keyTakeaway: 'Usa `match...case` cuando tengas un valor central comparado contra múltiples patrones discretos.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de match / case 🎯',
    badge: 'Resumen',
    content: 'Puntos clave del pattern matching en Python:',
    bulletPoints: [
      '✅ `match valor:` inicia la estructura de comparación',
      '✅ `case "opcion":` define los caminos específicos',
      '✅ `case _:` reemplaza a `else` / `default` para capturar cualquier otro caso',
      '✅ `case A | B:` permite evaluar alternativas en una misma línea',
      '✅ `case x if x > 10:` agrega condiciones lógicas adicionales'
    ],
    keyTakeaway: '`match...case` es una herramienta clave del Python moderno para escribir código más limpio y profesional.'
  }
];
