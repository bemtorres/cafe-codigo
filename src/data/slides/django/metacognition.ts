import type { MetaReflectionQuestion } from '../../../types/slides';

export type { MetaReflectionQuestion };

function createBaseGenericQuestions(): MetaReflectionQuestion[] {
  return [
    {
      id: 1,
      category: 'Generic',
      title: '1. Estrategia de Aprendizaje',
      questionText: '¿Qué método personal utilizaste para conectar la sintaxis de clases de Python con las tablas relacionales de SQL?',
      promptHint: 'Pensar en analogías visuales (clase = tabla, atributo = columna) ayuda a procesar el mapeo del ORM.',
      keyTakeaway: 'Visualizar el impacto físico en la base de datos convierte el código abstracto en comprensión sólida.'
    },
    {
      id: 2,
      category: 'Generic',
      title: '2. Gestión de Complejidad',
      questionText: '¿En qué concepto sentiste mayor duda (diferencia null vs blank, relaciones o tipos de campos) y cómo lo aclaraste?',
      promptHint: 'Identificar el punto exacto de confusión es el primer paso para dominar la ingeniería de software.',
      keyTakeaway: 'Resolver la duda técnica antes de pasar a la práctica previene bugs costosos en producción.'
    },
    {
      id: 3,
      category: 'Generic',
      title: '3. Conexión de Aprendizajes',
      questionText: '¿Cómo se complementa lo que aprendiste hoy con tus conocimientos previos de bases de datos relacionales o programación orientada a objetos?',
      promptHint: 'El ORM unifica la orientación a objetos con el modelo relacional de SQL.',
      keyTakeaway: 'El puente entre objetos y tablas es la habilidad central de cualquier desarrollador backend.'
    },
    {
      id: 4,
      category: 'Generic',
      title: '4. Aplicación Práctica Inmediata',
      questionText: '¿Qué modelo de tu proyecto personal diseñarás primero aplicando las buenas prácticas de tipos e integridad vistas hoy?',
      promptHint: 'Definir un modelo real con CharField, DecimalField y timestamps consolida tu aprendizaje en menos de 24 horas.',
      keyTakeaway: 'Escribir modelos reales en models.py fija la memoria muscular y el criterio técnico.'
    }
  ];
}

export function getMetaQuestionsForLesson(lessonSlug: string): MetaReflectionQuestion[] {
  const base = createBaseGenericQuestions();
  let specific: MetaReflectionQuestion[] = [];

  switch (lessonSlug) {
    case 'modelo-bd':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Magia vs la Realidad del ORM',
          questionText: '¿Por qué es fundamental que un desarrollador profesional inspeccione el SQL generado con sqlmigrate en lugar de tratar al ORM como una caja negra?',
          promptHint: 'Piensa en optimización de índices, tipos de datos físicos y consumo de recursos en bases de datos con millones de filas.',
          keyTakeaway: 'Entender el SQL subyacente te distingue de un aficionado: te convierte en un ingeniero backend de alto rendimiento.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Integridad y Dinero',
          questionText: '¿Qué consecuencias catastróficas tendría para una empresa utilizar FloatField en lugar de DecimalField en su módulo de facturación?',
          promptHint: 'Recuerda el error de coma flotante IEEE 754 y cómo micro-centavos pueden descuadrar balances financieros y auditorías fiscales.',
          keyTakeaway: 'La precisión matemática fija es un requisito innegociable en sistemas monetarios y transaccionales.'
        },
        {
          id: 7,
          category: 'CourseSpecific',
          title: '7. Políticas de Borrado (on_delete)',
          questionText: '¿Qué criterio aplicarías para decidir entre CASCADE y PROTECT en una relación entre Clientes y Facturas de compra?',
          promptHint: 'Si un cliente pide eliminar su cuenta, ¿qué debe pasar con las facturas históricas emitidas legalmente?',
          keyTakeaway: 'PROTECT o SET_NULL protegen la trazabilidad legal y financiera impidiendo borrados catastróficos.'
        },
        {
          id: 8,
          category: 'CourseSpecific',
          title: '8. La Regla de Oro de Django',
          questionText: '¿Cómo explicarías a otro programador por qué nunca se debe colocar null=True en un campo CharField o TextField?',
          promptHint: 'Reflexiona sobre la ambigüedad de tener dos representaciones distintas de la ausencia de dato: cadena vacía "" vs NULL en SQL.',
          keyTakeaway: 'Unificar los estados vacíos con solo blank=True evita consultas confusas y bugs sutiles en los filtros del ORM.'
        }
      ];
      break;
    case 'modelo-bd-step':
    case 'modelo-bd/step':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Migraciones Incrementales vs Todo de Golpe',
          questionText: '¿Por qué dividir la evolución de la base de datos en fases atómicas (catálogo -> ventas -> clientes -> restricciones) es el estándar de la industria?',
          promptHint: 'Piensa en despliegues continuos, rollback de versiones, facilidad de pruebas y reducción del riesgo de bloquear tablas críticas.',
          keyTakeaway: 'Las migraciones atómicas e incrementales permiten que el software crezca de forma modular, segura y sin interrupciones operativas.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. El Valor del Snapshot Financiero',
          questionText: '¿Qué impacto legal y contable tendría en una auditoría de tu empresa si los precios de las boletas históricas dependieran del catálogo actual?',
          promptHint: 'Si subes los precios el próximo mes, ¿qué pasaría con los balances contables de ventas cerradas hace un año?',
          keyTakeaway: 'El principio del snapshot protege la verdad histórica del negocio: lo que se vendió a un precio queda congelado para siempre.'
        },
        {
          id: 7,
          category: 'CourseSpecific',
          title: '7. Modificación Segura en Producción',
          questionText: '¿Cómo aplicarás la estrategia de null=True al incorporar nuevas relaciones sobre tablas que ya tienen cientos de miles de registros en producción?',
          promptHint: 'Recuerda que una columna NOT NULL sin valor por defecto detiene el despliegue y exige valores obligatorios ficticios.',
          keyTakeaway: 'Usar null=True para nuevas claves foráneas permite migraciones limpias con ALTER TABLE instantáneos sin downtime.'
        },
        {
          id: 8,
          category: 'CourseSpecific',
          title: '8. Idempotencia y apps.get_model()',
          questionText: '¿Por qué la regla de oro de Django exige usar apps.get_model() en lugar de importar clases de models.py dentro de migraciones con RunPython?',
          promptHint: '¿Qué ocurriría si dentro de 2 años un nuevo desarrollador corre las migraciones desde cero y el modelo models.py ya no tiene los mismos campos?',
          keyTakeaway: 'apps.get_model() congela el estado histórico de los modelos al momento exacto de esa migración, garantizando reproducibilidad perpetua.'
        }
      ];
      break;
    case 'modelo-bd-vehiculos':
    case 'modelo-bd/vehiculos':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Preservación de Bienes Físicos con SET_NULL',
          questionText: '¿Por qué la elección de SET_NULL frente a CASCADE es una decisión financiera y operativa fundamental en modelos que representan activos empresariales?',
          promptHint: 'Reflexiona sobre qué ocurriría contable y legalmente si la eliminación de un usuario conductor borrara también del inventario un camión valorado en decenas de miles de dólares.',
          keyTakeaway: 'SET_NULL protege la existencia de activos físicos desconectándolos temporalmente del conductor sin destruir su historial ni su valor patrimonial.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Auditoría Previa con sqlmigrate',
          questionText: '¿Qué riesgos corres en un equipo de desarrollo profesional si aplicas migraciones a ciegas sin antes revisar el SQL con sqlmigrate?',
          promptHint: 'Piensa en bloqueos de tablas pesadas, creación de índices no deseados o tipos de datos incompatibles en motores de producción como PostgreSQL.',
          keyTakeaway: 'sqlmigrate permite auditar los comandos DDL reales antes de que toquen el servidor, evitando sorpresas y caídas de servicio.'
        },
        {
          id: 7,
          category: 'CourseSpecific',
          title: '7. Transacciones Atómicas en Seeding',
          questionText: '¿Qué consecuencias tendría para las pruebas de tu equipo si el controlador con Faker falla a mitad de camino sin usar transaction.atomic()?',
          promptHint: 'Si el script crea 50 pilotos pero explota antes de los vehículos, ¿en qué estado queda la base de datos de pruebas?',
          keyTakeaway: 'transaction.atomic() asegura la integridad: o se crea la flota completa y coherente, o se cancela todo limpiamente mediante un rollback.'
        },
        {
          id: 8,
          category: 'CourseSpecific',
          title: '8. Seguridad y Control de Entorno en Seeders',
          questionText: '¿Por qué es indispensable bloquear endpoints de generación masiva con Faker verificando if not settings.DEBUG?',
          promptHint: '¿Qué pasaría si un usuario curioso o un bot encuentra la URL de generación masiva en el servidor de producción?',
          keyTakeaway: 'Cualquier controlador que altere o inserte datos artificiales debe estar estrictamente deshabilitado fuera de entornos de desarrollo.'
        }
      ];
      break;
    default:
      specific = [];
      break;
  }

  return [...base, ...specific];
}
