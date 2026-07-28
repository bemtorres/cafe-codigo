import type { Slide } from './texto-y-conversiones';

export const condicionalesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Tomando Decisiones en Python 🚦',
    subtitle: 'Control de Flujo: if, else, elif, operadores and, or, not y evaluación de condiciones',
    badge: 'Módulo 4 · Condicionales',
    content: 'Las condicionales son el corazón de la lógica de programación: permiten que tu código tome caminos diferentes en función de si algo es verdadero (True) o falso (False).',
    bulletPoints: [
      '🚦 Decisiones dinámicas basadas en expresiones booleanas',
      '📐 Indentación obligatoria (4 espacios) para definir bloques',
      '🔀 Evaluación en cascada con if, elif y else',
      '⚡ Combinación lógica avanzada con and, or y not'
    ],
    keyTakeaway: 'Sin condicionales, los programas ejecutarían siempre la misma secuencia lineal sin adaptarse a los datos del usuario.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. La Estructura Básica: Solo if',
    badge: 'Sintaxis Fundamental',
    content: 'Un bloque if evalúa una condición booleana. Si el resultado es True, ejecuta el código indentado a continuación. Si es False, Python omite el bloque por completo.',
    bulletPoints: [
      'La palabra clave `if` va seguida de la condición y termina con dos puntos `:`',
      'El bloque de código interno DEBE llevar 4 espacios de sangría (indentación)',
      'Si la condición es False y no hay `else`, la ejecución continúa en la siguiente línea fuera del if'
    ],
    codeSnippet: {
      filename: 'solo_if.py',
      lang: 'python',
      code: `# --- 1. Comparación numérica ---
temperatura = 32
if temperatura > 30:
    print("🔥 Hace mucho calor fuera")

# --- 2. Comparación de texto ---
codigo_respuesta = "OK"
if codigo_respuesta == "OK":
    print("✅ Operación aprobada exitosamente")`,
      explanation: 'Solo si la temperatura supera los 30 grados se imprimirá el mensaje en pantalla.'
    },
    keyTakeaway: 'En Python, la indentación determina la pertenencia estructural de las instrucciones al bloque condicional.'
  },
  {
    id: 3,
    type: 'diagram',
    title: '2. Dos Caminos Excluyentes: if ... else',
    badge: 'Bifurcación Doble',
    content: 'Cuando necesitas garantizar que siempre se ejecute uno de dos bloques alternativos: la ruta if si la condición es verdadera (True), o la ruta else por defecto si es falsa.',
    bulletPoints: [
      'El bloque `else` no lleva condición propia; captura todos los casos donde el `if` fue False',
      'Las ramas `if` y `else` son mutuamente excluyentes: jamás se ejecutarán ambas a la vez',
      'Perfecto para validaciones de acceso, paridad o verificación de stock'
    ],
    codeSnippet: {
      filename: 'if_else_ejemplo.py',
      lang: 'python',
      code: `edad = 16

if edad >= 18:
    print("🔑 Acceso concedido: Mayor de edad")
else:
    print("⛔ Acceso restringido: Menor de edad")`,
      explanation: 'Como edad es 16 (menor a 18), la condición es False y se ejecuta directamente el bloque else.'
    },
    visualChart: {
      headers: ['Condición (edad >= 18)', 'Evaluación Booleana', 'Ruta Ejecutada en Consola'],
      rows: [
        ['16 >= 18', 'False', '➡️ Bloque else ("Acceso restringido")'],
        ['20 >= 18', 'True', '➡️ Bloque if ("Acceso concedido")']
      ]
    },
    keyTakeaway: 'Un if...else asegura que el programa tome exactamente uno de dos caminos posibles.'
  },
  {
    id: 4,
    type: 'concept',
    title: '3. Decisiones Múltiples: if ... elif ... else',
    badge: 'Evaluación en Cascada',
    content: 'Para evaluar múltiples alternativas secuenciales. Python verifica de arriba a abajo y ejecuta la PRIMERA condición que sea True, ignorando todas las demás.',
    bulletPoints: [
      'Puedes encadenar cuantos `elif` (abreviación de "else if") necesites',
      'Una vez que se cumple un `elif`, Python sale de toda la estructura condicional',
      'El `else` final es opcional y actúa como red de seguridad para casos no contemplados'
    ],
    codeSnippet: {
      filename: 'evaluacion_notas.py',
      lang: 'python',
      code: `nota = 85

if nota >= 90:
    print("🏆 Excelente (A)")
elif nota >= 80:
    print("👍 Muy Bueno (B)")
elif nota >= 70:
    print("👌 Aprobado (C)")
else:
    print("📚 Necesitas reforzar conocimientos")`,
      explanation: 'Como 85 >= 80 es True, se imprime "Muy Bueno (B)" y se omiten los bloques siguientes.'
    },
    keyTakeaway: 'El orden de las condiciones en un if...elif importa: coloca siempre las más específicas primero.'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Operadores Lógicos: and (Y Lógico)',
    badge: 'Combinación Estricta',
    content: 'El operador `and` conecta dos o más expresiones. Requiere que TODAS las condiciones sean verdaderas (True) al mismo tiempo para que el resultado final sea True.',
    bulletPoints: [
      'True and True ➔ True',
      'True and False ➔ False',
      'Ideal para verificar credenciales (usuario Y contraseña) o rangos numéricos'
    ],
    codeSnippet: {
      filename: 'operador_and.py',
      lang: 'python',
      code: `usuario = "admin"
password = "supersecreto"

# Ambas condiciones deben ser verdaderas a la vez
if usuario == "admin" and password == "supersecreto":
    print("🔓 Sesión iniciada como Administrador")
else:
    print("❌ Credenciales incorrectas")`,
      explanation: 'Si la clave no coincide, el resultado de and pasa a ser False y cae en el bloque else.'
    },
    keyTakeaway: 'El operador and exige cumplimiento total de todas las condiciones vinculadas.'
  },
  {
    id: 6,
    type: 'code',
    title: '5. Operadores Lógicos: or (O Lógico)',
    badge: 'Flexibilidad de Requisitos',
    content: 'El operador `or` evalúa dos o más condiciones. Es suficiente con que AL MENOS UNA de ellas sea True para que toda la expresión resulte True.',
    bulletPoints: [
      'False or True ➔ True',
      'False or False ➔ False',
      'Útil para descuentos por perfil (Estudiante O Jubilado) o días de fin de semana'
    ],
    codeSnippet: {
      filename: 'operador_or.py',
      lang: 'python',
      code: `dia = "sábado"

# Con que se cumpla uno de los dos días es suficiente
if dia == "sábado" or dia == "domingo":
    print("🎉 Disfruta tu fin de semana")
else:
    print("💻 Día laboral de programación")`,
      explanation: 'Como dia es "sábado", la primera parte se cumple (True) y no necesita evaluar más.'
    },
    keyTakeaway: 'El operador or flexibiliza el control de flujo requiriendo una sola coincidencia exitosa.'
  },
  {
    id: 7,
    type: 'concept',
    title: '6. Inversión Lógica: El Operador not',
    badge: 'Negación Booleana',
    content: 'El operador `not` invierte el valor lógico de cualquier expresión: convierte un True en False y un False en True.',
    bulletPoints: [
      '`not True` ➔ False',
      '`not False` ➔ True',
      'Muy práctico para verificar variables de estado activas/inactivas o listas vacías'
    ],
    codeSnippet: {
      filename: 'operador_not.py',
      lang: 'python',
      code: `sesion_activa = False

if not sesion_activa:
    print("⚠️ Redirigiendo a la pantalla de inicio de sesión...")`,
      explanation: 'not False se convierte en True, por lo que el mensaje de alerta se imprime correctamente.'
    },
    keyTakeaway: 'El operador not permite escribir condiciones negativas de forma limpia y legible.'
  },
  {
    id: 8,
    type: 'summary',
    title: '7. Resumen de Operadores Relacionales',
    badge: 'Tabla de Referencia',
    content: 'Revisión rápida de todos los operadores matemáticos de comparación utilizados en condicionales.',
    bulletPoints: [
      '`==` Igual a (compara valores, no confundir con `=` asignación)',
      '`!=` Diferente de / Distinto a',
      '`>` Mayor que | `<` Menor que',
      '`>=` Mayor o igual | `<=` Menor o igual'
    ],
    visualChart: {
      headers: ['Operador', 'Nombre', 'Expresión Ejemplo', 'Resultado Booleano'],
      rows: [
        ['==', 'Igualdad', '"python" == "python"', 'True'],
        ['!=', 'Desigualdad', '10 != 10', 'False'],
        ['>=', 'Mayor o igual', '18 >= 18', 'True'],
        ['<=', 'Menor o igual', '5 <= 2', 'False']
      ]
    },
    keyTakeaway: '¡Excelente! Ahora estás listo para crear programas interactivos con control de flujo profesional.'
  }
];
