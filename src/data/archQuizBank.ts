export interface ArchQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface ArchQuizDefinition {
  key: string;
  title: string;
  questions: ArchQuizQuestion[];
}

export const archQuizBank: Record<string, ArchQuizDefinition> = {
  'intro-4-1': {
    key: 'intro-4-1',
    title: 'Quiz: El Modelo 4+1',
    questions: [
      {
        prompt: "¿Quién propuso el modelo de vistas 4+1?",
        options: ["Robert C. Martin", "Philippe Kruchten", "Martin Fowler", "Linus Torvalds"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el objetivo principal de usar múltiples vistas en arquitectura?",
        options: ["Hacer que el proyecto sea más caro", "Describir el sistema desde diferentes perspectivas para diferentes interesados (stakeholders)", "Ocultar errores de código", "Generar más documentación por kilo"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa el '+1' en el modelo 4+1?",
        options: ["Un programador extra", "La vista de Escenarios (Casos de Uso)", "Una base de datos adicional", "El manual de usuario"],
        correctIndex: 1
      },
      {
        prompt: "¿Es este modelo exclusivo para Java?",
        options: ["Sí", "No, es independiente del lenguaje y la tecnología", "Solo para C#", "Solo para sistemas embebidos"],
        correctIndex: 1
      },
      {
        prompt: "¿A qué ayuda este modelo principalmente?",
        options: ["A organizar el pensamiento y la comunicación sobre el diseño del sistema", "A escribir el Main más rápido", "A instalar librerías", "A elegir el color del logo"],
        correctIndex: 0
      }
    ]
  },
  'escenarios': {
    key: 'escenarios',
    title: 'Quiz: Vista de Escenarios',
    questions: [
      {
        prompt: "¿Cuál es la función de la vista de Escenarios?",
        options: ["Mostrar el hardware", "Ilustrar cómo funcionan las otras 4 vistas trabajando juntas mediante casos de uso", "Definir los colores de la UI", "Listar los nombres de los servidores"],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué se considera el 'corazón' del modelo?",
        options: ["Porque es la vista más larga", "Porque valida y unifica el resto de las vistas", "Porque la dibujan los jefes", "Porque no usa diagramas"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué diagramas de UML se suelen usar aquí?",
        options: ["Diagramas de Clase", "Diagramas de Casos de Uso", "Diagramas de Despliegue", "Diagramas de Componentes"],
        correctIndex: 1
      },
      {
        prompt: "Un escenario describe...",
        options: ["El sueldo de los desarrolladores", "Una interacción específica del usuario con el sistema", "La velocidad de la RAM", "El lenguaje de programación"],
        correctIndex: 1
      },
      {
        prompt: "¿A quién le interesa principalmente esta vista?",
        options: ["Solo a los programadores", "A usuarios finales, analistas y arquitectos", "Al personal de limpieza", "A los proveedores de hardware"],
        correctIndex: 1
      }
    ]
  },
  'vista-logica': {
    key: 'vista-logica',
    title: 'Quiz: Vista Lógica',
    questions: [
      {
        prompt: "¿Qué describe la Vista Lógica?",
        options: ["El hardware del servidor", "La funcionalidad que el sistema proporciona a los usuarios (clases, objetos)", "La velocidad de red", "La jerarquía de carpetas"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el diagrama de UML más común en esta vista?",
        options: ["Despliegue", "Clases", "Componentes", "Actividad"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué concepto de POO es clave en esta vista?",
        options: ["La abstracción y el encapsulamiento", "La memoria RAM", "El disco duro", "La conexión WiFi"],
        correctIndex: 0
      },
      {
        prompt: "La vista lógica se centra en el...",
        options: ["Dónde corre", "Qué hace el sistema internamente", "Cómo se compila", "Cómo se conecta"],
        correctIndex: 1
      },
      {
        prompt: "¿De qué se encarga esta vista principalmente?",
        options: ["De los hilos de ejecución", "De descomponer el sistema en abstracciones funcionales", "De las versiones de las librerías", "De la IP del servidor"],
        correctIndex: 1
      }
    ]
  },
  'vista-desarrollo': {
    key: 'vista-desarrollo',
    title: 'Quiz: Vista de Desarrollo',
    questions: [
      {
        prompt: "¿Qué aspecto del sistema cubre la Vista de Desarrollo?",
        options: ["El hardware físico", "La organización real de los módulos de software en el entorno de desarrollo", "Los hilos de la CPU", "Los casos de uso"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama también a esta vista?",
        options: ["Vista de Procesos", "Vista de Implementación", "Vista Lógica", "Vista de Usuario"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué diagramas UML se ven aquí?",
        options: ["Diagramas de Componentes y de Paquetes", "Diagramas de Clase", "Diagramas de Casos de Uso", "Diagramas de Despliegue"],
        correctIndex: 0
      },
      {
        prompt: "¿A quién le interesa más la vista de desarrollo?",
        options: ["Al cliente final", "A los programadores y gestores de configuración", "Al dueño del datacenter", "Al diseñador gráfico"],
        correctIndex: 1
      },
      {
        prompt: "Esta vista ayuda a entender...",
        options: ["La escalabilidad del servidor", "Cómo está estructurado el código fuente y sus dependencias", "La lógica de negocio", "El presupuesto"],
        correctIndex: 1
      }
    ]
  },
  'vista-proceso': {
    key: 'vista-proceso',
    title: 'Quiz: Vista de Proceso',
    questions: [
      {
        prompt: "¿De qué trata la Vista de Proceso?",
        options: ["De los diagramas de clase", "De los aspectos dinámicos: hilos, concurrencia y sincronización", "Del hardware", "De la lista de tareas de Jira"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es una preocupación clave en esta vista?",
        options: ["La escalabilidad, el rendimiento y la disponibilidad", "El color de los botones", "El nombre de las variables", "El manual de instalación"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué diagramas UML ayudan a ilustrar esta vista?",
        options: ["Secuencia, Actividad, Estados", "Componentes", "Despliegue", "Paquetes"],
        correctIndex: 0
      },
      {
        prompt: "Un 'proceso' en esta vista es...",
        options: ["Una clase", "Un flujo de control independiente (thread o proceso de SO)", "Un archivo de texto", "Un commit"],
        correctIndex: 1
      },
      {
        prompt: "¿Con qué vista se relaciona para saber dónde corren esos procesos?",
        options: ["Lógica", "Física", "Desarrollo", "Escenarios"],
        correctIndex: 1
      }
    ]
  },
  'vista-fisica': {
    key: 'vista-fisica',
    title: 'Quiz: Vista Física',
    questions: [
      {
        prompt: "¿Qué describe la Vista Física?",
        options: ["El código Java", "El mapeo del software sobre el hardware (servidores, redes)", "La base de datos lógica", "Los requerimientos"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se le llama también?",
        options: ["Vista de Despliegue", "Vista Lógica", "Vista de Desarrollo", "Vista de Escenarios"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es el diagrama UML estrella de esta vista?",
        options: ["Clases", "Despliegue", "Componentes", "Secuencia"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué elementos aparecen en un diagrama de despliegue?",
        options: ["Clases y Atributos", "Nodos (Servidores) y conexiones de red", "Interfaces", "Casos de uso"],
        correctIndex: 1
      },
      {
        prompt: "¿A quién le interesa principalmente esta vista?",
        options: ["A los desarrolladores frontend", "A los ingenieros de sistemas (DevOps) y de infraestructura", "A los analistas de requisitos", "Al equipo de marketing"],
        correctIndex: 1
      }
    ]
  },
  'diagramas-clases': {
    key: 'diagramas-clases',
    title: 'Quiz: Diagramas de Clases',
    questions: [
      {
        prompt: "En UML, ¿qué compartimentos tiene el rectángulo de una clase?",
        options: ["Solo el nombre", "Nombre, atributos y métodos", "Solo código", "Solo relaciones"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa '-' delante de un atributo como - titulo: String?",
        options: ["Público", "Privado", "Protegido", "Estático"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se reconoce un constructor en el diagrama?",
        options: ["Tiene tipo de retorno void", "Se llama igual que la clase y sin tipo de retorno", "Siempre es privado", "Lleva <<interface>>"],
        correctIndex: 1
      },
      {
        prompt: "En Java, si un atributo es boolean, ¿cómo se llama el getter?",
        options: ["getPrestado()", "isPrestado()", "hasPrestado()", "checkPrestado()"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué representa el diamante ◆ (lleno) en un diagrama UML?",
        options: ["Herencia", "Composición — la parte no existe sin el todo", "Interface", "Asociación débil"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué relación implica 'class Libro extends Publicacion'?",
        options: ["Composición", "Herencia — Libro es una Publicacion", "Interface", "Asociación"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué diferencia tiene una interface vs una clase abstracta en Java?",
        options: ["No hay diferencia", "Una interface no tiene constructores ni atributos con estado", "Una interface es más lenta", "Una interface siempre es privada"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuántas interfaces puede implementar una clase en Java?",
        options: ["Solo una", "Ninguna", "Múltiples", "Depende del compilador"],
        correctIndex: 2
      },
      {
        prompt: "En el diagrama, ¿cómo se representa una interface?",
        options: ["Con <<interface>> en la cabecera y flecha punteada", "Con un círculo", "Con un cuadrado negro", "No se puede representar"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es la diferencia entre asociación (◇) y composición (◆)?",
        options: ["No hay diferencia", "Asociación: la parte sobrevive al todo. Composición: la parte muere con el todo", "Composición es más rápida", "Asociación solo sirve para interfaces"],
        correctIndex: 1
      }
    ]
  },
  'conclusion': {
    key: 'conclusion',
    title: 'Quiz: Repaso General',
    questions: [
      {
        prompt: "¿Cuántas vistas hay en total en el modelo de Kruchten?",
        options: ["1", "4", "5 (4 principales + escenarios)", "10"],
        correctIndex: 2
      },
      {
        prompt: "Si quiero saber cómo se conectan los servidores, miro la vista...",
        options: ["Física", "Lógica", "Proceso", "Desarrollo"],
        correctIndex: 0
      },
      {
        prompt: "Si quiero ver el diseño de mis clases POO, miro la vista...",
        options: ["Física", "Lógica", "Desarrollo", "Escenarios"],
        correctIndex: 1
      },
      {
        prompt: "¿Se deben usar siempre todas las vistas?",
        options: ["Sí, es obligatorio", "No, se usan las que aporten valor según la complejidad del sistema", "Solo si el cliente paga extra", "Solo en proyectos de C#"],
        correctIndex: 1
      },
      {
        prompt: "El modelo 4+1 es un estándar de...",
        options: ["Programación", "Documentación de arquitectura de software", "Testeo", "Ventas"],
        correctIndex: 1
      }
    ]
  }
};
