export interface DesarrolloIaQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface DesarrolloIaQuizDefinition {
  key: string;
  title: string;
  questions: DesarrolloIaQuizQuestion[];
}

export const desarrolloIaQuizBank: Record<string, DesarrolloIaQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: No Dependencia de la IA',
    questions: [
      {
        prompt: "¿Cuál es el rol principal que debe cumplir la IA en las etapas iniciales de aprendizaje?",
        options: [
          "Sustituir el análisis y la creación de código por completo.",
          "Cumplir un rol de apoyo y aceleración, no de reemplazo del razonamiento.",
          "Escribir todo el código y dejar que el desarrollador solo lo ejecute.",
          "Ninguno, las IAs no sirven para programar."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Qué síntoma demuestra una clara dependencia de la Inteligencia Artificial?",
        options: [
          "Ser capaz de programar en un bloc de notas sin internet.",
          "La incapacidad de explicar el código propio y justificar las estructuras de datos elegidas.",
          "Saber cómo funciona un try/except en detalle.",
          "Detectar errores lógicos simples de forma autónoma."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál de las siguientes acciones es evidencia de un uso responsable de la IA?",
        options: [
          "Aceptar cualquier sugerencia de Copilot sin analizarla.",
          "Copiar y pegar código ciegamente si el programa funciona visualmente.",
          "Poder modificar el código, explicar cada bloque y detectar errores simples sin apoyo externo.",
          "Usar la IA para que resuelva todos los errores de sintaxis sin leer los mensajes del compilador."
        ],
        correctIndex: 2
      }
    ]
  },
  'seguridad-datos': {
    key: 'seguridad-datos',
    title: 'Quiz: Seguridad y Privacidad',
    questions: [
      {
        prompt: "¿Qué tipo de información NUNCA debe compartirse con una IA en entornos de desarrollo públicos?",
        options: [
          "Estructuras de datos vacías o firmas de métodos.",
          "Pseudocódigo conceptual sobre algoritmos de ordenamiento.",
          "Credenciales, API keys, datos personales reales o código propietario confidencial.",
          "Mensajes de error genéricos del compilador."
        ],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es una acción recomendada para proteger la privacidad al programar con IA?",
        options: [
          "Subir bases de datos completas de producción para que la IA entienda el esquema.",
          "Sanitizar los prompts reemplazando credenciales y datos reales por variables ficticias o dummy.",
          "Confiar en que todas las IAs protegen la información por defecto y no guardan registros.",
          "Compartir el código de negocio central de un cliente bajo acuerdo de confidencialidad."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Qué configuración en los IDEs o plugins de IA ayuda a proteger la propiedad intelectual?",
        options: [
          "Desactivar la telemetría y el uso del código local para entrenar modelos públicos.",
          "Aumentar el tamaño del archivo de historial de chat.",
          "Activar el autocompletado en todos los archivos del sistema operativo.",
          "Usar conexiones VPN sin cifrado."
        ],
        correctIndex: 0
      }
    ]
  },
  'prompting-y-tokens': {
    key: 'prompting-y-tokens',
    title: 'Quiz: Prompting y Ahorro de Tokens',
    questions: [
      {
        prompt: "¿Qué problema genera saturar la ventana de contexto de la IA con código irrelevante?",
        options: [
          "Que las respuestas sean más rápidas.",
          "Mayor probabilidad de alucinaciones del modelo y degradación en la precisión de las respuestas.",
          "Que la IA aprenda mejor sobre el negocio.",
          "No tiene ningún impacto, el contexto es ilimitado."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la forma más eficiente de alimentar el contexto en herramientas como Cursor o Antigravity?",
        options: [
          "Cargar la carpeta raíz del sistema operativo.",
          "Usar selectores de contexto selectivos (ej. indicando el archivo exacto con @ en el chat).",
          "Copiar y pegar todo el código fuente del proyecto en un solo prompt largo.",
          "No pasarle ningún código y escribir prompts muy generales."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué se recomienda abrir nuevos chats en lugar de continuar una sola conversación larga?",
        options: [
          "Para evitar que la IA recuerde el rol que le diste al inicio.",
          "Porque el historial largo acumula tokens que se reenvían en cada pregunta, desperdiciando recursos y acumulando ruido.",
          "Porque los chats largos se borran automáticamente cada 5 minutos.",
          "No tiene importancia, es una preferencia estética únicamente."
        ],
        correctIndex: 1
      }
    ]
  },
  'validacion-codigo': {
    key: 'validacion-codigo',
    title: 'Quiz: Checklist de Validación',
    questions: [
      {
        prompt: "Antes de aceptar el código generado por la IA, ¿por qué es crítico revisar si copia datos sin validar?",
        options: [
          "Para asegurar que el código sea lo más corto posible.",
          "Para evitar que se introduzcan vulnerabilidades de seguridad o excepciones en ejecución por entradas no controladas.",
          "Para verificar si el código cumple con las guías de estilo estéticas.",
          "Porque la IA no sabe escribir funciones de validación."
        ],
        correctIndex: 1
      },
      {
        prompt: "¿A qué se refiere la verificación sobre si el código de la IA 'modifica la estructura de datos original'?",
        options: [
          "A validar que no haya efectos secundarios indeseados (mutaciones) que rompan el flujo de datos predecible en la aplicación.",
          "A revisar que el código esté en el lenguaje de programación correcto.",
          "A comprobar si el código compila o no en el IDE.",
          "A borrar todas las variables globales."
        ],
        correctIndex: 0
      },
      {
        prompt: "¿Quién es el responsable técnico y ético final ante fallas o brechas en el código entregado?",
        options: [
          "La empresa creadora del asistente de IA (ej. Microsoft, OpenAI).",
          "El cliente que solicitó el software.",
          "El programador que revisó, aceptó e integró el código en la base de código.",
          "Nadie, el código de IA se considera libre de responsabilidades."
        ],
        correctIndex: 2
      }
    ]
  }
};
