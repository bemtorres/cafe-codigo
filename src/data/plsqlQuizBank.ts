export const plsqlQuizBank: Record<string, any> = {
  'intro-plsql': {
    title: 'Bloques Anónimos y PL/SQL',
    questions: [
      {
        prompt: '¿Cuál es la principal diferencia entre SQL normal y PL/SQL (o T-SQL)?',
        options: [
          'SQL es más rápido que PL/SQL',
          'PL/SQL añade estructuras de control de flujo (IF, FOR, WHILE) e iteración a SQL',
          'SQL solo funciona en Oracle y PL/SQL en MySQL',
          'No hay diferencia, son sinónimos'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Un "Bloque Anónimo" en PL/SQL...',
        options: [
          'Es un bloque de código que no se guarda en la base de datos de forma permanente',
          'Es un tipo de dato encriptado para contraseñas',
          'Es un hacker atacando el sistema',
          'Es una función que puede ser llamada desde otros programas'
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Las secciones principales de un bloque de PL/SQL son:',
        options: [
          'START, RUN, STOP',
          'DECLARE, BEGIN, EXCEPTION, END',
          'IMPORT, EXECUTE, CATCH',
          'SELECT, FROM, WHERE'
        ],
        correctIndex: 1,
      }
    ]
  },
  'procedimientos': {
    title: 'Procedimientos Almacenados',
    questions: [
      {
        prompt: '¿Qué es un Stored Procedure (Procedimiento Almacenado)?',
        options: [
          'Una copia de seguridad programada',
          'Un bloque de código PL/SQL compilado y guardado permanentemente en la Base de Datos',
          'Un error del servidor que ocurre al buscar datos',
          'El manual de usuario del motor de base de datos'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Una ventaja importante de usar Procedimientos Almacenados en vez de mandar queries nativos desde el backend (Java, Node) es...',
        options: [
          'Hacen que la app no use memoria RAM',
          'Cuestan menos dinero en la licencia de la Base de Datos',
          'Mejoran el rendimiento al precompilar el código y reducen el tráfico de red',
          'Permiten que cualquiera pueda ver los datos sin permisos'
        ],
        correctIndex: 2,
      },
      {
        prompt: 'Los Procedimientos pueden tener parámetros de entrada (IN) y de salida (OUT).',
        options: [
          'Verdadero',
          'Falso'
        ],
        correctIndex: 0,
      }
    ]
  },
  'funciones': {
    title: 'Funciones (UDF)',
    questions: [
      {
        prompt: '¿Cuál es la diferencia MÁS importante entre un Procedimiento y una Función en la base de datos?',
        options: [
          'Las Funciones son más rápidas',
          'Los Procedimientos pueden realizar operaciones complejas de negocio, pero una Función SIEMPRE debe retornar (RETURN) un valor',
          'Las Funciones no pueden usar variables',
          'No hay diferencia, es solo convención de nombres'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Debido a que una Función retorna un valor directamente, podemos usarla dentro de un...',
        options: [
          'Stored Procedure',
          'Bloque Anónimo',
          'Dentro de un simple SELECT',
          'Todas las anteriores'
        ],
        correctIndex: 3,
      },
      {
        prompt: '¿Es una buena práctica crear una función que modifique datos (INSERT, UPDATE) masivamente?',
        options: [
          'Sí, es la única forma de hacerlo',
          'No, las funciones suelen escribirse para calcular y retornar, el DML pesado se reserva a los Procedimientos'
        ],
        correctIndex: 1,
      }
    ]
  },
  'triggers': {
    title: 'Disparadores (Triggers)',
    questions: [
      {
        prompt: 'Un Trigger o Disparador es...',
        options: [
          'Un tipo de tabla especial',
          'Un error crítico de conexión',
          'Un bloque PL/SQL que se ejecuta AUTOMÁTICAMENTE cuando ocurre un evento (INSERT, UPDATE o DELETE)',
          'Un botón en la interfaz de usuario'
        ],
        correctIndex: 2,
      },
      {
        prompt: 'Si quisieras guardar un registro en una "tabla de auditoría" o "historial" cada vez que se actualiza el sueldo de un empleado, usarías:',
        options: [
          'Un Procedure manual',
          'Un Trigger tipo AFTER UPDATE en la tabla Empleados',
          'Un JOIN complejo',
          'Una Función recursiva'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Tratando con Triggers, solemos tener acceso a dos "pseduotablas" temporales para ver el valor antiguo y el nuevo. Se llaman...',
        options: [
          'PAST y FUTURE',
          'OLD y NEW (o INSERTED y DELETED en SQL Server)',
          'BEFORE y AFTER',
          'IN y OUT'
        ],
        correctIndex: 1,
      }
    ]
  }
};
