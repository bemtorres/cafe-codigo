export interface VisionProductoQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface VisionProductoQuizDefinition {
  key: string;
  title: string;
  questions: VisionProductoQuizQuestion[];
}

export const visionProductoQuizBank: Record<string, VisionProductoQuizDefinition> = {
  'ciclos-de-vida': {
    key: 'ciclos-de-vida',
    title: 'Quiz: Ciclos de Vida del Software',
    questions: [
      {
        prompt: "¿Cuál es una característica principal del ciclo de vida en Cascada (Predictivo)?",
        options: ["Se entrega software funcional en periodos de 2 semanas", "Es un proceso lineal y secuencial donde cada fase depende de la anterior", "Permite cambios rápidos en los requerimientos sin costo alto", "No requiere documentación detallada al inicio"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué tipo de proyecto suele ser ideal el ciclo de vida en Cascada?",
        options: ["Proyectos innovadores donde el usuario final no sabe lo que quiere", "Desarrollo de una app móvil para un startup de IA", "Proyectos donde los requerimientos son fijos, críticos e inmutables (ej. software médico o de aviación)", "Cualquier proyecto web moderno"],
        correctIndex: 2
      },
      {
        prompt: "Las metodologías Ágiles (Adaptativas) se destacan por:",
        options: ["Largar entregas parciales y frecuentes que permiten adaptarse al cambio", "Desarrollar todo el software y mostrarlo un año después", "Requerir un contrato escrito inmodificable", "No utilizar reuniones"],
        correctIndex: 0
      }
    ]
  },
  'inicio-y-usuario': {
    key: 'inicio-y-usuario',
    title: 'Quiz: Inicio y Usuarios',
    questions: [
      {
        prompt: "¿Quiénes son los 'Stakeholders' en un proyecto de software?",
        options: ["Solo los desarrolladores y testers", "Cualquier persona, grupo o empresa afectada por el proyecto o con interés en él", "El servidor donde se aloja el sistema", "Únicamente el cliente que paga el proyecto"],
        correctIndex: 1
      },
      {
        prompt: "El 'Elevator Pitch' o Visión del Producto sirve para:",
        options: ["Escribir código más rápido", "Resumir el propósito, el cliente, el problema y el valor principal del producto en muy poco tiempo", "Describir arquitecturas en 4+1", "Definir las tablas de la base de datos"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es un 'User Persona'?",
        options: ["El administrador del sistema IT", "Un arquetipo ficticio que representa a una parte de los usuarios reales, basado en datos o investigaciones", "El inversor de la compañía", "El documento donde firman los requerimientos"],
        correctIndex: 1
      },
      {
        prompt: "Un Mapa de Empatía ayuda a entender al usuario preguntándonos:",
        options: ["Qué framework de frontend prefiere", "Qué piensa, siente, ve, dice y hace el usuario respecto a su problema", "Cuánta memoria RAM tiene en su PC", "Cuánto está dispuesto a pagarnos"],
        correctIndex: 1
      }
    ]
  },
  'requisitos': {
    key: 'requisitos',
    title: 'Quiz: Ingeniería de Requisitos',
    questions: [
      {
        prompt: "¿Qué es la Ingeniería de Requisitos?",
        options: ["Programar las bases de datos de inmediato", "El proceso de descubrir, documentar y mantener lo que el software debe hacer y sus restricciones", "Adivinar lo que el usuario quiere basado en la intuición", "Elegir entre React o Vue"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál de los siguientes es un Requisito Funcional?",
        options: ["El sistema debe soportar 100,000 usuarios concurrentes sin caerse", "El color de fondo debe ser #F1F5F9", "El usuario debe poder recuperar su contraseña mediante un enlace enviado a su correo", "El sistema debe estar escrito en Java 17"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál de los siguientes es un Requisito No Funcional?",
        options: ["Un paciente puede agendar citas desde la aplicación móvil", "El sistema debe cargar la página principal en menos de 2 segundos", "El cliente puede añadir productos al carrito", "El administrador puede banear cuentas que violen los TOS"],
        correctIndex: 1
      },
      {
        prompt: "Una regla general de los requisitos es que deben ser:",
        options: ["Claros, medibles, no ambiguos y verificables", "Vagos, para interpretarlos como el dev quiera", "Escritos en código C++", "Opcionales"],
        correctIndex: 0
      }
    ]
  }
};
