export interface AnalisisBacklogQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface AnalisisBacklogQuizDefinition {
  key: string;
  title: string;
  questions: AnalisisBacklogQuizQuestion[];
}

export const analisisBacklogQuizBank: Record<string, AnalisisBacklogQuizDefinition> = {
  'elicitacion': {
    key: 'elicitacion',
    title: 'Quiz: Técnicas de Elicitación',
    questions: [
      {
        prompt: "¿Qué significa 'Elicitar' requisitos?",
        options: ["Escribir código en base a suposiciones", "Extraer, descubrir y sacar a la luz los requerimientos hablando con stakeholders", "Copiar los requerimientos de otro sistema similar", "Firmar el contrato de presupuesto"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué técnica de elicitación es mejor para obtener opiniones de 500 usuarios finales dispersos en varios países?",
        options: ["Entrevistas 1 a 1", "Observación directa (Shadowing)", "Encuestas y Cuestionarios", "Sesiones JAD"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el objetivo principal del 'Análisis de Brechas' (Gap Analysis)?",
        options: ["Descubrir la diferencia entre el estado actual (cómo se hacen las cosas hoy) y el estado futuro deseado", "Encontrar bugs en el código antiguo", "Comparar los sueldos del equipo de desarrollo", "Calcular el tiempo que tomará corregir errores"],
        correctIndex: 0
      }
    ]
  },
  'user-stories': {
    key: 'user-stories',
    title: 'Quiz: Historias de Usuario',
    questions: [
      {
        prompt: "¿Cuál es la estructura estándar de una Historia de Usuario?",
        options: ["Como [rol], quiero [acción] para [beneficio/valor]", "Función [X]: Hace [Y] en el tiempo [Z]", "El sistema deberá [acción técnica compleja]", "Dado [X] cuando [Y] entonces [Z]"],
        correctIndex: 0
      },
      {
        prompt: "Según el acrónimo INVEST, una historia de usuario debe ser:",
        options: ["Integrada, Novedosa, Variada, Estimable, Segura, Testeable", "Independiente, Negociable, Valiosa, Estimable, Pequeña (Small), Testeable", "Inicial, Normal, Validada, Escrita, Sensible, Terminada", "Importante, Necesaria, Verificada, Estricta, Sencilla, Tolerante"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa la 'S' en el método de priorización MoSCoW?",
        options: ["Should Have (Debería tener, importante pero no crítico)", "Safe (Debe ser seguro)", "Small (Debe ser pequeño)", "Simple (Debe ser simple)"],
        correctIndex: 0
      },
      {
        prompt: "Los Criterios de Aceptación sirven para:",
        options: ["Aceptar al cliente en las reuniones", "Definir las condiciones técnicas de la base de datos", "Definir claramente en qué momento consideramos la historia de usuario como 'Terminada' y correcta", "Estimar el tiempo en horas"],
        correctIndex: 2
      }
    ]
  },
  'estimacion': {
    key: 'estimacion',
    title: 'Quiz: Validación y Estimación',
    questions: [
      {
        prompt: "¿Cuál es una técnica efectiva y económica para validar requerimientos antes de programar?",
        options: ["Construir toda la base de datos", "Prototipado rápido (Wireframes / Mockups)", "Hacer un diagrama UML a nivel de código", "Configurar los servidores de producción"],
        correctIndex: 1
      },
      {
        prompt: "En el Planning Poker, ¿qué estiman típicamente los Puntos de Historia (Story Points)?",
        options: ["Cantidad de horas exactas que tomará la tarea", "Cantidad de líneas de código que habrá que escribir", "El esfuerzo, la complejidad y la incertidumbre de la tarea relativos a otras tareas", "El presupuesto económico de la tarea"],
        correctIndex: 2
      },
      {
        prompt: "¿Por qué se utiliza frecuentemente la sucesión de Fibonacci (1, 2, 3, 5, 8, 13...) en estimación ágil?",
        options: ["Porque es mágica y adivina el tiempo exacto", "Para reflejar que la incertidumbre crece a medida que la tarea es más grande, evitando el falso sentido de precisión", "Porque es el único método permitido por Scrum", "Para que sea imposible calcular las horas"],
        correctIndex: 1
      }
    ]
  }
};
