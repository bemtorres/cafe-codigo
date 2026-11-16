import type { Slide } from '../../../types/slides';

export const modeloBdStepSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '6. Paso a Paso: Sistema de Boletas y Migraciones Evolutivas 🧾',
    subtitle: 'Construcción real de un Punto de Venta (POS) en 5 fases de migración progresivas',
    badge: 'Django · Lección 6',
    content: 'En el software real las bases de datos nunca se crean de un solo golpe. Aprende a evolucionar un esquema de datos desde el inventario hasta la facturación blindada sin romper datos en producción.',
    bulletPoints: [
      '🧱 Fase 1 (0001): Catálogo base de Categoria y Producto con models.PROTECT',
      '🧾 Fase 2 (0002): Transacciones de venta con Boleta y DetalleBoleta (Principio del Snapshot)',
      '👤 Fase 3 (0003): Clave foránea opcional de Cliente sobre tablas con datos reales (null=True)',
      '🛡️ Fase 4 (0004): Blindaje de integridad con CheckConstraint y cálculo automático en save()',
      '🌱 Fase 5 (0005): Migración de datos ejecutable con RunPython y apps.get_model()'
    ],
    keyTakeaway: 'Un buen ingeniero backend sabe diseñar esquemas de datos que crecen y se adaptan al negocio sin interrumpir la operación ni corromper registros.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. Hoja de Ruta: De Inventario a Facturación Blindada',
    badge: 'Metodología Evolutiva',
    content: 'Un sistema comercial real crece por módulos. Cada fase representa una necesidad concreta de negocio y genera su propio archivo de migración aislado y testeable:',
    visualChart: {
      headers: ['Fase / Migración', 'Objetivo de Negocio', 'Modelos Creados / Modificados', 'Concepto Clave'],
      rows: [
        ['Fase 1 (0001)', 'Inventario Maestro', 'Categoria, Producto', 'on_delete=models.PROTECT'],
        ['Fase 2 (0002)', 'Ventas y Facturación', 'Boleta, DetalleBoleta', 'Snapshot de precios históricos'],
        ['Fase 3 (0003)', 'Programa de Clientes', 'Cliente, Boleta (cliente_id)', 'null=True, blank=True en producción'],
        ['Fase 4 (0004)', 'Blindaje de Reglas', 'DetalleBoleta (CheckConstraint)', 'Validación a nivel de motor SQL'],
        ['Fase 5 (0005)', 'Sembrado de Datos', 'Categoria (Data Migration)', 'RunPython con apps.get_model()']
      ]
    },
    keyTakeaway: 'Separar los cambios en migraciones atómicas facilita la auditoría, previene bloqueos de tablas y permite hacer rollback limpio si algo falla.'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Paso 1: Definir el Catálogo Base (Categoria y Producto)',
    badge: 'Fase 1 · models.py',
    content: 'Comenzamos en la aplicación "ventas" creando los dos modelos fundacionales. Nota la importancia de on_delete=models.PROTECT para evitar orfandad.',
    bulletPoints: [
      'Categoria modela las agrupaciones maestras con nombre único y descripción opcional',
      'Producto almacena precios con DecimalField(max_digits=10, decimal_places=2) para precisión bancaria',
      'db_index=True en nombre acelera las búsquedas por texto en el punto de venta',
      'on_delete=models.PROTECT impide eliminar categorías si aún tienen productos activos'
    ],
    codeSnippet: {
      filename: 'ventas/models.py',
      lang: 'python',
      code: `from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=150, db_index=True)
    codigo_barra = models.CharField(max_length=30, unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT,  # 🛡️ Impide borrar categoría si tiene productos
        related_name='productos'
    )

    def __str__(self):
        return f"{self.nombre} (\${self.precio})"`,
      explanation: 'PROTECT impide que un empleado elimine una categoría si ya tiene productos asignados, previniendo orfandad de datos.'
    },
    keyTakeaway: 'on_delete=models.PROTECT es la defensa número 1 contra la eliminación accidental de categorías con stock activo.'
  },
  {
    id: 4,
    type: 'code',
    title: '3. Paso 1: Generar y Auditar Migración 0001_initial',
    badge: 'Fase 1 · Terminal',
    content: 'Ejecuta los comandos en la terminal para crear la migración y auditar qué sentencias SQL ejecutará el motor relacional.',
    bulletPoints: [
      '1. makemigrations: Escanea models.py y genera el archivo 0001_initial.py',
      '2. sqlmigrate ventas 0001: Muestra el código SQL puro sin tocar la base de datos',
      '3. migrate: Ejecuta físicamente las sentencias DDL en SQLite o PostgreSQL',
      'Inspeccionar el SQL generado es la mejor práctica para asegurar tipos e índices óptimos'
    ],
    codeSnippet: {
      filename: 'terminal.sh',
      lang: 'bash',
      code: `# 1. Detectar los modelos y generar el archivo de migración
python manage.py makemigrations ventas
# Migrations for 'ventas':
#   ventas/migrations/0001_initial.py
#     - Create model Categoria
#     - Create model Producto

# 2. Auditar el código SQL puro antes de tocar la base de datos
python manage.py sqlmigrate ventas 0001
# CREATE TABLE "ventas_categoria" ("id" bigint NOT NULL PRIMARY KEY, ...);
# CREATE TABLE "ventas_producto" ("id" bigint NOT NULL PRIMARY KEY, "categoria_id" bigint NOT NULL REFERENCES ...);

# 3. Aplicar las tablas físicas
python manage.py migrate
# Applying ventas.0001_initial... OK`,
      explanation: 'sqlmigrate te permite verificar las claves primarias, foráneas e índices creados en PostgreSQL o SQLite.'
    },
    keyTakeaway: 'Siempre audita con sqlmigrate en entornos empresariales antes de aplicar cambios en servidores de staging o producción.'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Paso 2: Transacciones de Venta (Boleta y DetalleBoleta)',
    badge: 'Fase 2 · models.py',
    content: 'Modelamos la venta con el patrón Maestro-Detalle: una Boleta agrupa la compra general y DetalleBoleta desglosa cada ítem vendido.',
    bulletPoints: [
      'Boleta (Maestro): Folio único con db_index=True, fecha, hora y total acumulado',
      'DetalleBoleta (Detalle): Relación 1 a N con Boleta y con Producto',
      'on_delete=models.CASCADE en Boleta: Si se anula la boleta, se eliminan sus líneas hijas',
      'on_delete=models.PROTECT en Producto: Nunca se puede borrar un producto que fue vendido en el pasado'
    ],
    codeSnippet: {
      filename: 'ventas/models.py',
      lang: 'python',
      code: `from django.utils import timezone
from django.db import models

class Boleta(models.Model):
    folio = models.CharField(max_length=20, unique=True, db_index=True)
    fecha = models.DateField(default=timezone.now)
    hora = models.TimeField(default=timezone.now)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Boleta #{self.folio} - \${self.total}"


class DetalleBoleta(models.Model):
    boleta = models.ForeignKey(
        Boleta,
        on_delete=models.CASCADE,
        related_name='detalles'
    )
    producto = models.ForeignKey(
        'Producto',
        on_delete=models.PROTECT,
        related_name='ventas_detalle'
    )
    # ⚠️ REGLA DE ARQUITECTURA: Congelar precio exacto
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.PositiveIntegerField(default=1)
    total_linea = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad}x {self.producto.nombre} (\${self.total_linea})"`,
      explanation: 'Boleta usa CASCADE en DetalleBoleta: si se anula la boleta completa, sus líneas hijas se eliminan en cascada.'
    },
    keyTakeaway: 'El detalle nunca debe depender únicamente del precio del producto; debe congelar su propio precio de venta.'
  },
  {
    id: 6,
    type: 'diagram',
    title: '5. El Principio del Snapshot (Instantánea de Precios) 📸',
    badge: 'Arquitectura Financiera',
    content: '¿Por qué DetalleBoleta DEBE tener su propio campo precio_unitario en lugar de consultar producto.precio?',
    visualChart: {
      headers: ['Enfoque', 'Implementación', '¿Qué ocurre al subir los precios en 6 meses?', 'Veredicto'],
      rows: [
        ['❌ Error Novato', 'Sin precio en detalle; consulta `detalle.producto.precio`', 'Las boletas emitidas el año pasado aumentan su total mágicamente', 'Fraude contable y descuadre de auditoría fiscal'],
        ['✅ Regla Snapshot', 'Campo `precio_unitario` propio en `DetalleBoleta`', 'Las boletas históricas mantienen inalterable el valor exacto pagado', 'Integridad contable certificada y trazabilidad real']
      ]
    },
    keyTakeaway: 'Una transacción histórica NUNCA debe mutar por cambios futuros en el catálogo maestro de precios.'
  },
  {
    id: 7,
    type: 'code',
    title: '6. Paso 2: Generar y Aplicar Migración 0002',
    badge: 'Fase 2 · Terminal',
    content: 'Generamos la segunda migración incremental y la aplicamos sobre la base de datos existente.',
    bulletPoints: [
      'Django detecta automáticamente que Categoria y Producto no cambiaron y solo crea Boleta y DetalleBoleta',
      'Genera claves foráneas hacia las tablas ya existentes con integridad referencial',
      'showmigrations permite verificar qué migraciones han sido aplicadas con [X]'
    ],
    codeSnippet: {
      filename: 'terminal.sh',
      lang: 'bash',
      code: `# 1. Crear la migración para Boleta y DetalleBoleta
python manage.py makemigrations ventas
# Migrations for 'ventas':
#   ventas/migrations/0002_boleta_detalleboleta.py
#     - Create model Boleta
#     - Create model DetalleBoleta

# 2. Aplicar la migración de ventas
python manage.py migrate
# Applying ventas.0002_boleta_detalleboleta... OK

# 3. Comprobar que ambas migraciones están activas
python manage.py showmigrations ventas
# [X] 0001_initial
# [X] 0002_boleta_detalleboleta`,
      explanation: 'showmigrations con [X] confirma que la base de datos física está sincronizada con el código.'
    },
    keyTakeaway: 'Cada migración nueva construye sobre la anterior sin alterar las tablas ya existentes.'
  },
  {
    id: 8,
    type: 'code',
    title: '7. Paso 3: Agregar Cliente sin Romper Ventas Anónimas',
    badge: 'Fase 3 · models.py',
    content: 'El negocio añade un CRM de fidelización de clientes. Muchas ventas siguen siendo de público general que no entrega sus datos.',
    bulletPoints: [
      'Cliente almacena identificación fiscal única (RUT/DNI), nombre y datos de contacto',
      'cliente en Boleta se declara con null=True para admitir ventas anónimas en SQL',
      'blank=True permite dejar el cliente vacío en los formularios del punto de venta',
      'on_delete=models.SET_NULL evita que al borrar un cliente se eliminen sus boletas fiscales'
    ],
    codeSnippet: {
      filename: 'ventas/models.py',
      lang: 'python',
      code: `class Cliente(models.Model):
    rut_o_dni = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=120)
    email = models.EmailField(blank=True)
    telefono = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.nombre} ({self.rut_o_dni})"


# En Boleta agregamos la clave foránea como opcional:
class Boleta(models.Model):
    # ... campos anteriores: folio, fecha, hora, total ...
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.SET_NULL,  # 🛡️ Si se borra el cliente, la boleta NO se borra
        null=True,                  # 🟢 Permite NULL en SQL (ventas anónimas)
        blank=True,                 # 🟢 Opcional en formularios y panel admin
        related_name='boletas'
    )`,
      explanation: 'SET_NULL + null=True permite que las boletas históricas conserven su validez aunque el cliente sea eliminado del CRM.'
    },
    keyTakeaway: 'Para relaciones opcionales con impacto legal o contable, combina siempre on_delete=models.SET_NULL con null=True.'
  },
  {
    id: 9,
    type: 'diagram',
    title: '8. Cómo Afecta Modificar Tablas con Datos Previos ⚠️',
    badge: 'Peligro de Producción',
    content: '¿Qué ocurre si la tabla Boleta ya tiene 50.000 ventas registradas y agregamos una nueva columna?',
    visualChart: {
      headers: ['Configuración del Campo', 'Comportamiento en makemigrations', 'Impacto en la Base de Datos SQL'],
      rows: [
        ['`cliente = ForeignKey(..., null=False)`', '🚨 ERROR: Django se detiene exigiendo un valor por defecto para las 50.000 filas anteriores', 'Bloquea el despliegue a producción o te obliga a asignar un cliente ficticio'],
        ['`cliente = ForeignKey(..., null=True, blank=True)`', '✅ ÉXITO INMEDIATO: Genera la migración sin preguntas ni interrupciones', 'Ejecuta `ALTER TABLE ... ADD COLUMN cliente_id bigint NULL;` de forma instantánea']
      ]
    },
    keyTakeaway: 'Siempre que agregues un campo a una tabla con datos existentes en producción, debe tener null=True o un valor default.'
  },
  {
    id: 10,
    type: 'code',
    title: '9. Paso 3: Aplicar Migración 0003_cliente_boleta_cliente',
    badge: 'Fase 3 · Terminal',
    content: 'Generamos y aplicamos la tercera migración, comprobando la sentencia ALTER TABLE con sqlmigrate.',
    bulletPoints: [
      'Django crea la tabla ventas_cliente',
      'Ejecuta un ALTER TABLE ventas_boleta ADD COLUMN cliente_id con permiso de NULL',
      'Crea el índice correspondiente para búsquedas rápidas de boletas por cliente'
    ],
    codeSnippet: {
      filename: 'terminal.sh',
      lang: 'bash',
      code: `# 1. Detectar el nuevo modelo Cliente y el nuevo campo en Boleta
python manage.py makemigrations ventas
# Migrations for 'ventas':
#   ventas/migrations/0003_cliente_boleta_cliente.py
#     - Create model Cliente
#     - Add field cliente to boleta

# 2. Auditar el SQL: observa el ADD COLUMN con NULL
python manage.py sqlmigrate ventas 0003
# ALTER TABLE "ventas_boleta" ADD COLUMN "cliente_id" bigint NULL;

# 3. Aplicar en la base de datos
python manage.py migrate
# Applying ventas.0003_cliente_boleta_cliente... OK`,
      explanation: 'El comando ALTER TABLE se ejecuta en milisegundos sin bloquear la tabla ni requerir downtime.'
    },
    keyTakeaway: 'Comprobar el ALTER TABLE con sqlmigrate te da la certeza absoluta de que el cambio no romperá la producción.'
  },
  {
    id: 11,
    type: 'code',
    title: '10. Paso 4: Blindaje con CheckConstraint y save() Automático',
    badge: 'Fase 4 · Reglas de Negocio',
    content: 'Nunca confíes solo en las validaciones de la interfaz web. Agregamos restricciones físicas en el motor SQL y automatizamos el cálculo del total de línea.',
    bulletPoints: [
      'Meta.constraints añade restricciones CHECK en la base de datos (cantidad > 0, precio >= 0)',
      'save() automatiza el cálculo de total_linea = precio_unitario * cantidad',
      'Garantiza que ningún script o inserción directa pueda crear ítems con precios o cantidades negativas'
    ],
    codeSnippet: {
      filename: 'ventas/models.py',
      lang: 'python',
      code: `class DetalleBoleta(models.Model):
    # ... campos boleta, producto, precio_unitario, cantidad, total_linea ...

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(cantidad__gt=0),
                name='chk_cantidad_positiva'
            ),
            models.CheckConstraint(
                check=models.Q(precio_unitario__gte=0),
                name='chk_precio_unitario_positivo'
            ),
        ]

    def save(self, *args, **kwargs):
        # 1. Si no viene precio, tomar el precio vigente del producto
        if not self.precio_unitario:
            self.precio_unitario = self.producto.precio
        
        # 2. Calcular automáticamente el total de la línea
        self.total_linea = self.precio_unitario * self.cantidad
        super().save(*args, **kwargs)`,
      explanation: 'Si un hacker o un script envía una cantidad negativa mediante API o SQL directo, el motor de BD rechazará la operación con un error de integridad.'
    },
    keyTakeaway: 'Las CheckConstraint garantizan la integridad de los datos incluso si alguien ejecuta consultas SQL directas en la base de datos.'
  },
  {
    id: 12,
    type: 'code',
    title: '11. Paso 4: Aplicar Restricciones en SQL',
    badge: 'Fase 4 · Terminal',
    content: 'Generamos una migración nombrada descriptivamente con las restricciones CheckConstraint.',
    bulletPoints: [
      'Usamos el parámetro --name para dar un nombre semántico y profesional al archivo',
      'sqlmigrate muestra los comandos ADD CONSTRAINT chk_... CHECK (...) del motor SQL',
      'migrate aplica las restricciones de inmediato en la tabla física'
    ],
    codeSnippet: {
      filename: 'terminal.sh',
      lang: 'bash',
      code: `# 1. Generar migración con nombre personalizado
python manage.py makemigrations ventas --name constraints_reglas_negocio
# Migrations for 'ventas':
#   ventas/migrations/0004_constraints_reglas_negocio.py
#     - Create constraint chk_cantidad_positiva on model detalleboleta
#     - Create constraint chk_precio_unitario_positivo on model detalleboleta

# 2. Auditar las restricciones ADD CONSTRAINT en SQL
python manage.py sqlmigrate ventas 0004
# ALTER TABLE "ventas_detalleboleta" ADD CONSTRAINT "chk_cantidad_positiva" CHECK ("cantidad" > 0);

# 3. Aplicar en la base de datos
python manage.py migrate
# Applying ventas.0004_constraints_reglas_negocio... OK`,
      explanation: 'El flag --name permite documentar el propósito del cambio en el propio nombre de archivo de la migración.'
    },
    keyTakeaway: 'Nombrar migraciones con --name es un estándar profesional que facilita el seguimiento en equipos de desarrollo.'
  },
  {
    id: 13,
    type: 'code',
    title: '12. Paso 5: Sembrar Categorías con RunPython 🌱',
    badge: 'Fase 5 · Data Migration',
    content: 'Para que cualquier desarrollador o servidor de despliegue tenga categorías iniciales listas al ejecutar migrate, creamos una migración de datos con --empty.',
    bulletPoints: [
      'migrations.RunPython ejecuta funciones de Python puro dentro del ciclo de migración',
      'REGLA CRÍTICA: Usa apps.get_model() para acceder al modelo histórico en esa versión exacta',
      'get_or_create asegura idempotencia: no creará duplicados si la migración se vuelve a correr',
      'reverse_code define qué ejecutar si el desarrollador hace un rollback de la migración'
    ],
    codeSnippet: {
      filename: 'ventas/migrations/0005_sembrar_categorias_iniciales.py',
      lang: 'python',
      code: `from django.db import migrations

CATEGORIAS = [
    {"nombre": "Bebidas y Cafetería", "descripcion": "Café de grano, té e infusiones"},
    {"nombre": "Pastelería", "descripcion": "Tortas y pasteles del día"},
    {"nombre": "Snacks Salados", "descripcion": "Empanadas y sándwiches"},
]

def sembrar_categorias(apps, schema_editor):
    # ⚠️ REGLA DE ORO: Usar apps.get_model() para evitar importar el modelo actual
    Categoria = apps.get_model('ventas', 'Categoria')
    for cat in CATEGORIAS:
        Categoria.objects.get_or_create(
            nombre=cat["nombre"],
            defaults={"descripcion": cat["descripcion"]}
        )

def desempadronar_categorias(apps, schema_editor):
    Categoria = apps.get_model('ventas', 'Categoria')
    Categoria.objects.filter(nombre__in=[c["nombre"] for c in CATEGORIAS]).delete()

class Migration(migrations.Migration):
    dependencies = [('ventas', '0004_constraints_reglas_negocio')]
    operations = [
        migrations.RunPython(sembrar_categorias, reverse_code=desempadronar_categorias)
    ]`,
      explanation: 'get_or_create garantiza idempotencia: si la migración se vuelve a ejecutar, no creará categorías duplicadas.'
    },
    keyTakeaway: 'NUNCA importes modelos desde models.py en un archivo de migración; usa SIEMPRE apps.get_model() para respetar el historial.'
  },
  {
    id: 14,
    type: 'code',
    title: '13. Paso 5: Ejecución y Comprobación del Historial',
    badge: 'Fase 5 · Terminal',
    content: 'Creamos el archivo vacío con --empty, ejecutamos migrate y revisamos el historial completo de migraciones del sistema.',
    bulletPoints: [
      '--empty genera el esqueleto de migración sin cambios de esquema DDL',
      'migrate corre la función de sembrado sembrar_categorias de forma limpia y transparente',
      'showmigrations ventas muestra la línea completa de 5 migraciones en verde'
    ],
    codeSnippet: {
      filename: 'terminal.sh',
      lang: 'bash',
      code: `# 1. Crear archivo de migración vacío con flag --empty
python manage.py makemigrations ventas --empty --name sembrar_categorias_iniciales
# Migrations for 'ventas':
#   ventas/migrations/0005_sembrar_categorias_iniciales.py

# 2. Aplicar la migración de datos (ejecuta sembrar_categorias)
python manage.py migrate
# Applying ventas.0005_sembrar_categorias_iniciales... OK

# 3. Comprobar el historial completo de migraciones del proyecto
python manage.py showmigrations ventas
# ventas
#  [X] 0001_initial
#  [X] 0002_boleta_detalleboleta
#  [X] 0003_cliente_boleta_cliente
#  [X] 0004_constraints_reglas_negocio
#  [X] 0005_sembrar_categorias_iniciales`,
      explanation: 'Las 5 migraciones se ejecutaron en secuencia ordenada, creando un esquema de base de datos profesional y resiliente.'
    },
    keyTakeaway: 'Un flujo de migraciones limpio permite reconstruir toda la base de datos de un proyecto desde cero con un solo comando: migrate.'
  },
  {
    id: 15,
    type: 'summary',
    title: '14. Resumen: Los 5 Mandamientos de las Migraciones 🏆',
    badge: 'Guía Profesional',
    content: 'Los principios fundamentales que diferencian a un desarrollador novato de un ingeniero backend profesional:',
    bulletPoints: [
      '1. Migraciones Atómicas: Cada migración debe tener un propósito único, claro y documentado con --name.',
      '2. Regla del Snapshot: Congela siempre precios y datos transaccionales en tablas de detalle para evitar fraudes contables.',
      '3. Producción Segura: Al agregar campos a tablas con datos previos, usa siempre null=True o define un default.',
      '4. Blindaje SQL: Protege tus datos críticos con CheckConstraint a nivel de motor de base de datos.',
      '5. Datos Idempotentes: Siembra información maestra con RunPython y apps.get_model(), asegurando rollbacks limpios con reverse_code.'
    ],
    keyTakeaway: 'El control de versiones de tu base de datos es tan importante como el control de versiones de tu código fuente en Git.'
  }
];
