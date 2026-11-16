export const sqlQuizBank: Record<string, any> = {
  'intro-sql': {
    title: 'El Mundo de las Tablas',
    questions: [
      {
        prompt: '¿Qué significan las siglas SQL?',
        options: [
          'Simple Query Language',
          'Structured Query Language',
          'System Question Logic',
          'Sequential Query List'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'SQL se utiliza principalmente para interactuar con Bases de Datos...',
        options: [
          'NoSQL',
          'Orientadas a Objetos',
          'Relacionales',
          'En Memoria Cache'
        ],
        correctIndex: 2,
      },
      {
        prompt: '¿Cuál de las siguientes operaciones NO pertenece al grupo clásico CRUD (Create, Read, Update, Delete) en bases de datos?',
        options: [
          'INSERT',
          'COMPRESS',
          'UPDATE',
          'DELETE'
        ],
        correctIndex: 1,
      }
    ]
  },
  'select-basico': {
    title: 'Sentencia SELECT',
    questions: [
      {
        prompt: '¿Qué palabra clave usamos para filtrar los resultados de un SELECT según una o más condiciones?',
        options: [
          'FILTER',
          'WHEN',
          'WHERE',
          'IF'
        ],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué símbolo se usa en un SELECT para pedir "todas las columnas" de una tabla?',
        options: [
          '%',
          '*',
          '#',
          'ALL'
        ],
        correctIndex: 1,
      },
      {
        prompt: 'Si quisieras ordenar los resultados alfabéticamente por nombre, ¿qué cláusula agregarías al final?',
        options: [
          'SORT BY nombre',
          'ORDER ALPHABETIC',
          'ORDER BY nombre ASC',
          'GROUP BY nombre'
        ],
        correctIndex: 2,
      }
    ]
  },
  'joins': {
    title: 'Relaciones y JOINs',
    questions: [
      {
        prompt: '¿Para qué sirve principalmente la cláusula JOIN?',
        options: [
          'Para unir los resultados de dos bases de datos completamente distintas',
          'Para combinar filas de dos o más tablas basándose en una columna compartida',
          'Para borrar tablas redundantes',
          'Para crear nombres alternativos a las columnas'
        ],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué tipo de JOIN devuelve SOLO las filas donde hay una coincidencia en ambas tablas?',
        options: [
          'LEFT JOIN',
          'RIGHT JOIN',
          'INNER JOIN',
          'FULL OUTER JOIN'
        ],
        correctIndex: 2,
      },
      {
        prompt: 'Si quisieras una lista de TODOS los clientes (incluso si no han hecho compras) junto con la información de sus compras (si las tienen). ¿Qué JOIN usarías?',
        options: [
          'INNER JOIN',
          'LEFT JOIN (desde la tabla Clientes)',
          'CROSS JOIN',
          'No se puede hacer con un JOIN'
        ],
        correctIndex: 1,
      }
    ]
  },
  'agregacion': {
    title: 'Cálculos y Group By',
    questions: [
      {
        prompt: '¿Qué función matemática debes usar si quieres contar cuántas filas devuelve una consulta?',
        options: [
          'SUM()',
          'TOTAL()',
          'COUNT()',
          'MAX()'
        ],
        correctIndex: 2,
      },
      {
        prompt: 'Si quieres saber el salario promedio de los empleados de cada departamento usando AVG(salario). ¿Qué cláusula necesitas para agrupar las filas por departamento?',
        options: [
          'GROUP BY',
          'ORDER BY',
          'SORT BY',
          'JOIN BY'
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Es igual que el WHERE, pero se utiliza para filtrar los resultados agrupados DESPUÉS de haber aplicado agregaciones. Se llama...',
        options: [
          'FILTER',
          'HAVING',
          'GROUP_WHERE',
          'CHECK'
        ],
        correctIndex: 1,
      }
    ]
  }
};
