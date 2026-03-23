export interface ScrumQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface ScrumQuizDefinition {
  key: string;
  title: string;
  questions: ScrumQuizQuestion[];
}

export const scrumQuizBank: Record<string, ScrumQuizDefinition> = {
  'marco-scrum': {
    key: 'marco-scrum',
    title: 'Quiz: El Marco Scrum',
    questions: [
      {
        prompt: "¿Quién es el responsable de maximizar el valor del producto y gestionar el Product Backlog?",
        options: ["Scrum Master", "Product Owner", "Jefe de Proyecto", "Developers"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el propósito principal de la Daily Scrum?",
        options: ["Reportar el estado al cliente", "Inspeccionar el progreso hacia el Sprint Goal y adaptar el plan de las siguientes 24 horas", "Criticar el código de los compañeros", "Asignar nuevas tareas que no estaban planificadas"],
        correctIndex: 1
      },
      {
        prompt: "En Scrum, ¿qué es un Sprint?",
        options: ["Un contenedor para todos los demás eventos, de duración fija (usualmente 1 a 4 semanas) donde se crea un incremento de producto terminado", "Correr rápidamente en la oficina", "Una reunión de 8 horas al final del proyecto", "La fase donde solo se testea el código"],
        correctIndex: 0
      }
    ]
  },
  'diseno-sprints': {
    key: 'diseno-sprints',
    title: 'Quiz: Sprints y Prototipado',
    questions: [
      {
        prompt: "¿Qué es el Sprint Backlog?",
        options: ["Todas las ideas locas que se le ocurren al cliente", "El conjunto de elementos del Product Backlog seleccionados para el Sprint, más un plan para entregarlos", "El historial de errores (bugs) del sistema", "Las vacaciones del equipo"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué sirve crear Wireframes o Mockups antes de programar durante el Sprint?",
        options: ["Para gastar presupuesto y justificar horas", "Para visualizar la solución, alinear expectativas con el Product Owner y validar ideas rápidamente", "Para tener algo que imprimir y colgar en la pared", "Para evitar hacer código de backend"],
        correctIndex: 1
      },
      {
        prompt: "Un 'Incremento de Producto' significa que...",
        options: ["La aplicación aumentó su tamaño en Megabytes", "Se completó un paso abstracto hacia el objetivo final, y este incremento debe ser utilizable y estar potencialmente listo para ser lanzado", "El equipo trabajó horas extra ese mes", "Se ha añadido un nuevo servidor a la infraestructura"],
        correctIndex: 1
      }
    ]
  },
  'presentacion-mejora': {
    key: 'presentacion-mejora',
    title: 'Quiz: Review y Mejora Continua',
    questions: [
      {
        prompt: "¿Qué ocurre durante la Sprint Review (Revisión del Sprint)?",
        options: ["El equipo revisa qué salió mal en sus relaciones personales", "El Scrum Team y los stakeholders inspeccionan el resultado del Sprint y determinan futuras adaptaciones", "El Product Owner aprueba o rechaza unilateralmente al equipo", "Se estima el Product Backlog para el próximo año"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el objetivo principal de la Sprint Retrospective (Retrospectiva)?",
        options: ["Culpar a quien rompió el entorno de producción", "Planificar formas de aumentar la calidad y efectividad del equipo en el próximo Sprint", "Demostrar el software funcionando al cliente", "Definir quién será despedido si no se cumplió la meta"],
        correctIndex: 1
      },
      {
        prompt: "Si los stakeholders dan un feedback crítico negativo durante la Review, el equipo ágil debe:",
        options: ["Llorar y abandonar el proyecto", "Agradecer el feedback, analizarlo como una oportunidad de adaptación y añadirlo al Product Backlog si corresponde", "Decirle a los stakeholders que están equivocados porque los Developers tienen razón", "Ocultar el error bajo la alfombra"],
        correctIndex: 1
      }
    ]
  }
};
