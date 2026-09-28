import type { QuizQuestion, InteractionType } from '../../../types/slides';

export type { QuizQuestion, InteractionType };

export const modeloBdQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿En Django, definir blank=True altera físicamente la columna en la base de datos SQL permitiendo valores NULL?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! blank solo valida formularios y el admin en Python. Para permitir valores nulos a nivel de base de datos SQL se debe usar null=True.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Por qué se debe usar obligatoriamente models.DecimalField en lugar de models.FloatField para almacenar precios o dinero?',
    options: [
      'Porque FloatField produce micro-errores de redondeo binario (IEEE 754) que descuadran cuentas contables',
      'Porque FloatField solo soporta números enteros en PostgreSQL',
      'Porque DecimalField no ocupa espacio en disco',
      'Porque FloatField está descontinuado en Python 3'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Los números float sufren imprecisión binaria (0.1 + 0.2 = 0.30000000000000004). DecimalField garantiza precisión fija exacta.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (3/5) · FillInTheBlank',
    questionText: '¿Qué comando de Django permite auditar el código SQL exacto que generará una migración sin ejecutarla físicamente?',
    code: `python manage.py ________ blog 0001`,
    options: ['sqlmigrate', 'makemigrations', 'migrate', 'inspectdb'],
    correctOption: 0,
    explanation: '¡CORRECTO! python manage.py sqlmigrate <app> <numero> traduce la migración a código SQL puro según tu motor de base de datos.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Relaciona cada tipo de relación con su impacto físico en la base de datos SQL:',
    pairs: [
      { id: 'p1', left: 'ForeignKey (1 a N)', right: 'Columna física _id en tabla hija + índice B-Tree' },
      { id: 'p2', left: 'OneToOneField (1 a 1)', right: 'Columna física _id con restricción UNIQUE' },
      { id: 'p3', left: 'ManyToManyField (N a M)', right: 'Tercera tabla intermedia (Join Table) con 2 FKs' }
    ],
    explanation: '¡EXCELENTE! Has conectado con precisión cómo cada relación de Django se materializa físicamente en el motor relacional.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué error de diseño y buena práctica presenta este campo de modelo?',
    code: `titulo = models.CharField(max_length=120, null=True, blank=True)`,
    options: [
      'Django desaconseja null=True en CharField para evitar tener dos valores vacíos diferentes ("" y NULL)',
      'Falta definir primary_key=True',
      'max_length no puede superar 100 caracteres',
      'No se puede combinar max_length con blank=True'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! La regla de oro oficial de Django prohíbe null=True en campos de texto (CharField y TextField). Para campos opcionales solo debe usarse blank=True.'
  }
];

export const modeloBdStepQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: '¿En un sistema de ventas, es una buena práctica omitir el campo precio_unitario en DetalleBoleta y leer siempre detalle.producto.precio en vivo?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! Es un error financiero grave. Violaría el principio de snapshot: si el precio del producto sube en el futuro, las ventas históricas de meses anteriores alterarían su valor indebidamente.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: 'Al agregar una nueva ForeignKey de Cliente a una tabla Boleta con 50.000 ventas previas en producción, ¿por qué es indispensable usar null=True?',
    options: [
      'Para que la base de datos ejecute ALTER TABLE ... ADD COLUMN ... NULL sin bloquear la tabla ni exigir valores por defecto forzados',
      'Porque Django no soporta claves foráneas en tablas con más de 100 filas',
      'Para que las boletas se borren automáticamente si el cliente no existe',
      'Porque null=True convierte la columna en tipo VARCHAR'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Si la columna no admite nulos (null=False), la migración se detiene exigiendo un valor por defecto que no existe para ventas anónimas previas.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: '¿Qué flag de makemigrations crea un archivo de migración en blanco para programar una migración de datos con RunPython?',
    code: `python manage.py makemigrations ventas ________ --name sembrar_datos`,
    options: ['--empty', '--fake', '--merge', '--dry-run'],
    correctOption: 0,
    explanation: '¡CORRECTO! El flag --empty genera el andamiaje básico de migración sin operaciones DDL automáticas, listo para usar migrations.RunPython.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona cada herramienta de migración y modelo con su rol técnico fundamental:',
    pairs: [
      { id: 'p1', left: 'on_delete=models.PROTECT', right: 'Impide borrar el registro padre si tiene hijos' },
      { id: 'p2', left: 'models.CheckConstraint', right: 'Valida reglas matemáticas a nivel de motor SQL' },
      { id: 'p3', left: 'migrations.RunPython', right: 'Ejecuta siembra de datos con apps.get_model()' }
    ],
    explanation: '¡EXCELENTE! Has relacionado con maestría los tres pilares de integridad en migraciones evolutivas.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué error crítico de arquitectura presenta esta función dentro de una migración de datos?',
    code: `def sembrar(apps, schema_editor):
    from ventas.models import Categoria  # ❌ ERROR
    Categoria.objects.create(nombre="Bebidas")`,
    options: [
      'Nunca se debe importar el modelo directamente; se debe usar Categoria = apps.get_model("ventas", "Categoria")',
      'Falta importar django.db.models',
      'No se pueden usar métodos ORM dentro de una migración',
      'create() está prohibido en migraciones de datos'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Si importas el modelo directamente desde models.py, la migración fallará en el futuro si el modelo cambia de campos. apps.get_model() usa el estado histórico exacto de esa migración.'
  }
];

export const modeloBdVehiculosQuiz: QuizQuestion[] = [
  {
    id: 1,
    type: 'TrueFalse',
    question: 'En la relación de flota, usar on_delete=models.SET_NULL (con null=True) evita que los camiones se borren de la base de datos si se da de baja a un piloto.',
    options: ['Verdadero', 'Falso'],
    correctOption: 0,
    explanation: '¡CORRECTO! models.SET_NULL convierte el campo piloto_asignado_id a NULL en la base de datos sin destruir el vehículo, protegiendo los activos físicos de la empresa.'
  },
  {
    id: 2,
    type: 'MultipleChoice',
    question: '¿Qué comando de Django permite inspeccionar el código SQL real (CREATE TABLE o ALTER TABLE) antes de ejecutar migrate?',
    options: [
      'python manage.py sqlmigrate <app> <migracion>',
      'python manage.py showmigrations --sql',
      'python manage.py makemigrations --dry-run',
      'python manage.py dbshell --preview'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! sqlmigrate muestra con total precisión las sentencias SQL que tu motor (PostgreSQL, SQLite, MySQL) recibirá al ejecutar la migración.'
  },
  {
    id: 3,
    type: 'MatchPairs',
    question: 'Empareja cada herramienta o concepto con su responsabilidad en el proyecto de flota:',
    pairs: [
      { left: 'models.SET_NULL', right: 'Preserva vehículos si despiden al piloto' },
      { left: 'TextChoices', right: 'Define estados estándar (DISPONIBLE, EN_RUTA)' },
      { left: 'CheckConstraint', right: 'Valida en SQL que el kilometraje sea >= 0' },
      { left: 'Faker("es_ES")', right: 'Genera nombres y datos realistas en español' }
    ],
    explanation: '¡Excelente! Cada herramienta atiende una capa clave: integridad relacional, reglas del motor y productividad de pruebas.'
  },
  {
    id: 4,
    type: 'FillInTheBlank',
    question: 'Para asegurar que la creación de múltiples registros con Faker sea atómica (todo o nada), envolvemos el proceso en "with transaction.____():".',
    correctAnswer: 'atomic',
    acceptableAnswers: ['atomic', 'atomic()'],
    explanation: '¡CORRECTO! transaction.atomic() abre una transacción de base de datos; si ocurre cualquier excepción, realiza un ROLLBACK total.'
  },
  {
    id: 5,
    type: 'FindTheBug',
    question: '¿Por qué la siguiente vista es una vulnerabilidad crítica de seguridad?',
    codeSnippet: `# flota/views.py
def poblar_flota(request):
    fake = Faker()
    # Genera 1000 pilotos y vehiculos sin validar nada
    for _ in range(1000):
        ...
    return HttpResponse("Listo")`,
    options: [
      'No tiene protección de entorno (if not settings.DEBUG) ni control de autenticación, permitiendo que cualquiera sature la BD en producción',
      'Faker no puede usarse dentro de un archivo views.py',
      'Falta importar django.db.models',
      'HttpResponse no soporta texto simple'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Los endpoints de generación de datos falsos deben estar estrictamente bloqueados con if not settings.DEBUG o requerir permisos administrativos de staff.'
  }
];

export function getQuizForLesson(lessonSlug: string): QuizQuestion[] {
  switch (lessonSlug) {
    case 'modelo-bd':
      return modeloBdQuiz;
    case 'modelo-bd-step':
    case 'modelo-bd/step':
      return modeloBdStepQuiz;
    case 'modelo-bd-vehiculos':
    case 'modelo-bd/vehiculos':
      return modeloBdVehiculosQuiz;
    default:
      return modeloBdQuiz;
  }
}
