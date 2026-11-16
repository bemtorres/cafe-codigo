export interface C4QuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface C4QuizDefinition {
  key: string;
  title: string;
  questions: C4QuizQuestion[];
}

export const c4QuizBank: Record<string, C4QuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: Introducción a C4',
    questions: [
      {
        prompt: "¿Quién es el creador del Modelo C4?",
        options: ["Robert C. Martin", "Simon Brown", "Philippe Kruchten", "Martin Fowler"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa C4?",
        options: ["Code, Classes, Components, Context", "Context, Containers, Components, Code", "Classes, Containers, Clusters, Code", "Context, Control, Coordination, Code"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el objetivo principal del Modelo C4?",
        options: ["Generar código automáticamente", "Reemplazar UML por completo", "Crear diagramas de arquitectura claros, estructurados y fáciles de entender", "Documentar solo la capa base de datos"],
        correctIndex: 2
      },
      {
        prompt: "En la analogía de Google Maps de Simon Brown, ¿qué representa el Contexto?",
        options: ["Ver una casa de cerca", "Ver el continente (vista panorámica)", "Ver el país de arriba", "Ver una calle específica"],
        correctIndex: 1
      }
    ]
  },
  'contexto': {
    key: 'contexto',
    title: 'Quiz: Nivel 1 - Contexto',
    questions: [
      {
        prompt: "¿Qué muestra el diagrama de Contexto?",
        options: ["Las clases o funciones del sistema", "El panorama general: usuarios, el sistema y otros sistemas externos", "La estructura interna del software", "El detalle del código fuente"],
        correctIndex: 1
      },
      {
        prompt: "¿Debería haber detalles tecnológicos (como 'Spring Boot' o 'MySQL') en el diagrama de Contexto?",
        options: ["Sí, siempre", "Solo si el cliente lo exige", "No, debe ser un diagrama de alto nivel entendible por personas no técnicas", "Sí, es obligatorio"],
        correctIndex: 2
      },
      {
        prompt: "¿Para quién está dirigido principalmente el diagrama de Contexto?",
        options: ["Para desarrolladores junior", "Para cualquier persona: desarrolladores, PMs, clientes, stakeholders", "Exclusivamente para DevOps", "Solo para bases de datos"],
        correctIndex: 1
      }
    ]
  },
  'contenedores': {
    key: 'contenedores',
    title: 'Quiz: Nivel 2 - Contenedores',
    questions: [
      {
        prompt: "¿Qué es un 'Contenedor' en el Modelo C4?",
        options: ["Estrictamente un contenedor de Docker", "Una aplicación ejecutable o base de datos por separado (ej: SPA, microservicio, BD)", "Una clase de programación", "Una carpeta del sistema"],
        correctIndex: 1
      },
      {
        prompt: "¿Se incluyen decisiones tecnológicas en el diagrama de Contenedores?",
        options: ["No, sigue siendo agnóstico a la tecnología", "Sí, aquí se muestran las tecnologías principales (ej: React, Spring Boot, PostgreSQL)", "Solo en la terminal", "Solo el lenguaje de programación, sin los frameworks"],
        correctIndex: 1
      },
      {
        prompt: "¿Es correcto que un sistema tenga un solo contenedor?",
        options: ["No, siempre debe haber al menos dos", "Sí, si el sistema es un gran monolito que se despliega como una sola unidad", "No, cada clase debe ser un contenedor", "Es ilegal"],
        correctIndex: 1
      }
    ]
  },
  'componentes': {
    key: 'componentes',
    title: 'Quiz: Nivel 3 - Componentes',
    questions: [
      {
        prompt: "¿Qué muestra un diagrama de Componentes?",
        options: ["Cómo los contenedores se comunican", "En piezas lógicas y funcionales dentro de un único Contenedor (controladores, repositorios)", "El código fuente exacto", "Los servidores físicos"],
        correctIndex: 1
      },
      {
        prompt: "¿Es obligatorio hacer diagramas de Componentes para todos los contenedores?",
        options: ["Sí, para todo el sistema", "No, solo es recomendado si el contenedor es muy complejo", "Solo para las bases de datos", "Nunca se debe hacer"],
        correctIndex: 1
      },
      {
        prompt: "¿A quién le interesa el diagrama de Componentes?",
        options: ["Al cliente final", "Principalmente a los desarrolladores y arquitectos de software", "A marketing", "A recursos humanos"],
        correctIndex: 1
      }
    ]
  },
  'codigo': {
    key: 'codigo',
    title: 'Quiz: Nivel 4 - Código',
    questions: [
      {
        prompt: "¿Por qué el nivel de Código suele saltarse o generarse automáticamente en C4?",
        options: ["Porque no es útil en ningún escenario", "Porque cambia tan rápido que el diagrama quedaría desactualizado casi de inmediato", "Porque no se puede dibujar código", "Porque así lo dice el estándar ISO"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué tipo de diagrama de UML se usa si queremos detallar una pieza de código (Nivel 4)?",
        options: ["Casos de Uso", "Diagrama de Clases UML", "Diagrama de Despliegue UML", "Diagrama de Gantt"],
        correctIndex: 1
      },
      {
        prompt: "Simon Brown recomienda para el nivel de Código:",
        options: ["Hacerlo siempre a mano", "Usar UML solo si se pueden generar los diagramas a partir del código, u omitirlo del todo", "Dibujarlo en paint cada día", "Guardarlo en excel"],
        correctIndex: 1
      }
    ]
  }
};
