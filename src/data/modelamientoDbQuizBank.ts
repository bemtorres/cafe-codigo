export const modelamientoDbQuizBank: Record<string, any> = {
  'conceptos-basicos': {
    title: 'Conceptos Básicos de Modelamiento',
    questions: [
      {
        prompt: '¿Cuál es el propósito principal del modelamiento de datos?',
        options: [
          'Crear la interfaz gráfica de la aplicación',
          'Escribir el código en JavaScript o Python',
          'Planificar qué datos se guardarán y cómo se relacionan antes de programar',
          'Aumentar la velocidad del internet de la base de datos'
        ],
        correctIndex: 2,
      },
      {
        prompt: 'El proceso de extraer del mundo real solo la información necesaria para el sistema se conoce como...',
        options: [
          'Inserción',
          'Abstracción',
          'Compilación',
          'Normalización'
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Por qué no es recomendable empezar a crear tablas directamente sin un modelo previo?',
        options: [
          'Porque la base de datos consume más RAM',
          'No hay problema, de hecho es la mejor práctica',
          'Porque si está mal diseñada, el sistema no escalará y causará problemas graves a futuro',
          'Porque los lenguajes de programación no lo permiten'
        ],
        correctIndex: 2,
      }
    ]
  },
  'entidad-relacion': {
    title: 'Diagrama Entidad-Relación',
    questions: [
      {
        prompt: 'En el Modelo E-R, las Entidades suelen representarse en los diagramas como...',
        options: [
          'Círculos',
          'Triángulos',
          'Rectángulos',
          'Rombos'
        ],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué es un Atributo Clave (Primary Key)?',
        options: [
          'El atributo numérico más grande',
          'Un atributo que identifica de manera única a cada instancia de la entidad',
          'Cualquier atributo de texto, como un nombre o apellido',
          'El atributo utilizado para crear contraseñas'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Si tenemos "Mecánico" y "Coche", y el mecánico "Repara" el coche. ¿Qué representa la palabra "Repara" en el modelo E-R?',
        options: [
          'Una Entidad',
          'Un Atributo',
          'Una Relación',
          'Una Llave Foránea'
        ],
        correctIndex: 2,
      }
    ]
  },
  'modelo-relacional': {
    title: 'El Modelo Relacional',
    questions: [
      {
        prompt: 'Cuando pasamos del Diagrama E-R al Modelo Relacional, una Entidad generalmente se convierte en...',
        options: [
          'Una Columna',
          'Una Tabla',
          'Una Fila',
          'Una Celda'
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué es una Llave Foránea (Foreign Key)?',
        options: [
          'Una columna que contiene la Primary Key de otra tabla para crear una conexión',
          'Una columna que debe dejarse siempre vacía',
          'La contraseña utilizada para conectarse a la Base de Datos',
          'Un identificador que no se puede utilizar en consultas SQL'
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Si cada "Piloto" maneja un solo "Avión", y queremos enlazarlos, ¿dónde colocaríamos idealmente la Llave Foránea si seguimos el modelo relacional?',
        options: [
          'En ambas tablas como una nueva Primary Key',
          'En el sistema operativo',
          'En una de las tablas, para apuntar hacia el ID de la otra',
          'Las llaves foráneas no sirven para relacionar tablas'
        ],
        correctIndex: 2,
      }
    ]
  },
  'normalizacion': {
    title: 'Normalización',
    questions: [
      {
        prompt: '¿Cuál es el principal problema que busca resolver la Normalización?',
        options: [
          'El color de los diagramas E-R',
          'La redundancia de datos y las anomalías de actualización',
          'La falta de lenguajes de programación modernos',
          'La conversión de Bases de Datos a Excel'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Según la Primera Forma Normal (1NF), ¿qué afirmación es correcta?',
        options: [
          'Una celda puede contener una lista separada por comas',
          'Toda celda de una tabla debe tener un valor atómico (indivisible)',
          'No se necesitan Primary Keys para cumplir la 1NF',
          'Es obligatorio crear 5 tablas para cada entidad'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Si un atributo normal depende de otro atributo que no es la llave primaria, ¿qué regla de normalización estamos violando?',
        options: [
          '1NF (Primera Forma Normal)',
          '2NF (Segunda Forma Normal)',
          '3NF (Tercera Forma Normal)',
          'Ninguna, es una buena práctica relacional'
        ],
        correctIndex: 2,
      }
    ]
  }
};
