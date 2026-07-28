import type { Slide } from '../../../types/slides';

export const introduccionSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '1. El Comienzo: ¡Hola, Serpiente! 🐍',
    subtitle: 'Historia, filosofía Zen, instalación y tu primer programa en Python',
    badge: 'Python · Lección 1',
    content: 'Bienvenido al curso de Python. En este módulo aprenderás el origen del lenguaje, su filosofía de diseño, la importancia de la indentación y cómo ejecutar tu primer script.',
    bulletPoints: [
      '🐍 Creado por Guido van Rossum en 1991 (inspirado en Monty Python)',
      '✨ Legibilidad ante todo: "Simple es mejor que complejo"',
      '📏 La indentación es obligatoria para definir bloques de código',
      '⚡ Consola interactiva (REPL) para probar expresiones en tiempo real'
    ],
    keyTakeaway: 'Python es el lenguaje preferido para Ciencia de Datos, Backend e IA por su sintaxis clara.'
  },
  {
    id: 2,
    type: 'concept',
    title: '¿Por qué Python en 2026?',
    badge: 'Ventajas del Lenguaje',
    content: 'Python se ha consolidado como el estándar de la industria gracias a su diseño expresivo y un ecosistema masivo de librerías.',
    bulletPoints: [
      'Curva de aprendizaje suave: código legible que parece pseudocódigo en inglés',
      'Multiparadigma: admite desarrollo orientado a objetos, funcional y estructurado',
      'Baterías incluidas: una inmensa biblioteca estándar lista para usar'
    ],
    codeSnippet: {
      filename: 'hola_mundo.py',
      lang: 'python',
      code: `# Tu primer script en Python
nombre = "Programador Python"
print(f"¡Hola, {nombre}! Bienvenido a Café y Código ☕")`,
      explanation: 'print() muestra mensajes en pantalla de forma directa sin requerir boilerplate.'
    },
    keyTakeaway: 'Python elimina la complejidad de sintaxis innecesaria para enfocarse en la resolución de problemas.'
  },
  {
    id: 3,
    type: 'diagram',
    title: '¿Cómo Ejecuta Python tu Código?',
    badge: 'Arquitectura Interna',
    content: 'Python es un lenguaje interpretado: traduce tu script (.py) a bytecode (.pyc) y lo ejecuta en la Máquina Virtual de Python (PVM).',
    bulletPoints: [
      'El intérprete procesa el código fuente paso a paso',
      'Genera bytecode optimizado en memoria',
      'Permite la ejecución multiplataforma transparente en Windows, Mac y Linux'
    ],
    visualChart: {
      headers: ['Fase', 'Archivo / Componente', 'Descripción'],
      rows: [
        ['1. Código Fuente', 'script.py', 'Texto plano escrito por el desarrollador'],
        ['2. Compilación Interna', 'Bytecode (.pyc)', 'Traducción a instrucciones intermedias'],
        ['3. Interpretación', 'Python Virtual Machine (PVM)', 'Ejecución y salida en consola en tiempo real']
      ]
    },
    keyTakeaway: 'No necesitas compilar manualmente tus programas; Python lo hace de forma interactiva.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'La Indentación es Sagrada 📏',
    badge: 'Regla de Sintaxis',
    content: 'A diferencia de lenguajes como C, C++ o Java que usan llaves {}, Python utiliza la sangría (indentación) para estructurar los bloques de código.',
    bulletPoints: [
      'Usa 4 espacios por cada nivel de sangría (estándar PEP 8)',
      'Todos los bloques (if, for, def) requieren dos puntos : al inicio',
      'Un error en la sangría provocará un IndentationError de sintaxis'
    ],
    codeSnippet: {
      filename: 'indentacion.py',
      lang: 'python',
      code: `print("Esto siempre se ejecuta")
if True:
    print("Esto está indentado (dentro del bloque IF)")
print("Esto está fuera del IF")`,
      explanation: 'Los espacios indican a Python qué instrucciones pertenecen al bloque superior.'
    },
    keyTakeaway: 'La indentación obligatoria garantiza que todo el código escrito en Python sea limpio y legible.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Modo Interactivo (REPL)',
    badge: 'Terminal Interactiva',
    content: 'El REPL (Read-Eval-Print Loop) te permite ejecutar instrucciones de Python al instante en tu terminal sin crear archivos.',
    bulletPoints: [
      'Escribe `python` en tu consola para iniciar la sesión',
      'Ideal como calculadora o para experimentar con funciones sencillas',
      'Sal con `exit()` o Ctrl+Z (Windows) / Ctrl+D (Mac/Linux)'
    ],
    codeSnippet: {
      filename: 'Consola REPL',
      lang: 'python',
      code: `>>> 2 + 2
4
>>> canal = "Café y Código"
>>> canal.upper()
'CAFÉ Y CÓDIGO'
>>> print("Python " * 3)
Python Python Python `,
      explanation: 'El REPL evalúa cada expresión inmediatamente después de presionar Enter.'
    },
    keyTakeaway: 'Usa el REPL para hacer pruebas rápidas antes de agregar código a tus archivos del proyecto.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen y Próximos Pasos 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en esta introducción a Python:',
    bulletPoints: [
      '✅ Guido van Rossum creó Python con enfoque en la claridad humana',
      '✅ Se usa en Automatización, Data Science, Backend y Web',
      '✅ La indentación con 4 espacios define la jerarquía del código',
      '✅ El intérprete ejecuta bytecode a través de la PVM'
    ],
    keyTakeaway: 'En la siguiente lección aprenderemos a interactuar con el usuario usando variables e inputs.'
  }
];
