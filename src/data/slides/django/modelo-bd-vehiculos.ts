import type { Slide } from '../../../types/slides';

export const modeloBdVehiculosSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '5.3 Taller Guiado: Flota, Migraciones y Controlador Faker 🚛',
    subtitle: 'Guía paso a paso para realizar en vivo junto al curso: de cero al controlador de generación masiva',
    badge: 'Django · Taller Práctico 5.3',
    content: 'En esta sesión práctica construiremos el sistema de gestión de flota de transporte paso a paso: creando la aplicación, diseñando los modelos en Django, auditando cada migración en SQL y programando un controlador con Faker para poblar la base de datos.',
    bulletPoints: [
      '🛠️ Paso 0: Preparación de la app "flota" y registro en settings.py',
      '📐 Paso 1: Diagrama Entidad-Relación (ER) y arquitectura de datos',
      '👤 Pasos 2-3: Fase 1 (Modelo Piloto, RUT UNIQUE y sqlmigrate 0001)',
      '🚚 Pasos 4-6: Fase 2 (Modelo Vehículo, ForeignKey y protección con SET_NULL)',
      '🛡️ Pasos 7-8: Fase 3 (TextChoices y CheckConstraint para blindar SQL)',
      '⚡ Pasos 9-13: Instalación de Faker, programación del Controlador Web (views.py) y URLs',
      '🔍 Pasos 14-15: Pruebas en el navegador y verificación con Django ORM'
    ],
    keyTakeaway: 'Sigue cada paso en tu editor y terminal: este flujo replica exactamente cómo se construyen módulos robustos en empresas de tecnología.'
  },
  {
    id: 2,
    type: 'terminal',
    title: 'Paso 0: Crear la App "flota" y Registrar en settings.py',
    badge: 'Configuración Inicial',
    content: 'Todo proyecto modular en Django comienza creando una aplicación independiente y registrándola en la lista oficial de aplicaciones:',
    terminalCommand: `# 1. Con tu entorno virtual activo, crea la app flota:
(env) $ python manage.py startapp flota

# Estructura creada automáticamente:
# flota/
#   ├── migrations/
#   ├── admin.py
#   ├── apps.py
#   ├── models.py
#   ├── tests.py
#   └── views.py`,
    codeSnippet: `# mi_proyecto/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Tus aplicaciones del proyecto:
    'flota.apps.FlotaConfig', # 👈 ¡Registrar aquí!
]`,
    keyTakeaway: 'Si olvidas registrar la aplicación en INSTALLED_APPS, Django ignorará tus modelos y makemigrations dirá "No changes detected".'
  },
  {
    id: 3,
    type: 'concept',
    title: 'Paso 1: Diagrama Entidad-Relación (ER) de la Flota 📐',
    badge: 'Arquitectura Relacional',
    content: 'Antes de escribir código en models.py, este es el mapa relacional exacto que construiremos entre las dos tablas:',
    visualChart: {
      headers: ['Tabla / Entidad', 'Columna / Campo', 'Tipo SQL / Django', 'Restricción / Cardinalidad'],
      rows: [
        ['flota_piloto (1)', 'id', 'bigint', 'PRIMARY KEY (Autoincremental)'],
        ['flota_piloto (1)', 'rut', 'varchar(15)', 'UNIQUE (Sin choferes duplicados)'],
        ['flota_piloto (1)', 'nombre, licencia', 'varchar', 'NOT NULL'],
        ['flota_piloto (1)', 'experiencia_anios', 'integer', 'CHECK (experiencia_anios >= 0)'],
        ['flota_vehiculo (N)', 'id', 'bigint', 'PRIMARY KEY (Autoincremental)'],
        ['flota_vehiculo (N)', 'patente', 'varchar(10)', 'UNIQUE (Placa automotriz única)'],
        ['flota_vehiculo (N)', 'estado', 'varchar(20)', 'TextChoices (DISPONIBLE, EN_RUTA)'],
        ['flota_vehiculo (N)', 'kilometraje, anio', 'integer', 'CheckConstraint (km >= 0, anio >= 1990)'],
        ['flota_vehiculo (N)', 'piloto_asignado_id', 'bigint NULL', 'FOREIGN KEY -> flota_piloto (ON DELETE SET NULL)']
      ]
    },
    keyTakeaway: 'Cardinalidad 1 a N Opcional: Un camión puede estar en patio sin chofer (NULL); si el chofer es eliminado, el camión se preserva.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Paso 2: Escribir el Modelo Piloto en flota/models.py',
    badge: 'Fase 1 · models.py',
    content: 'Abre el archivo `flota/models.py` y define la entidad del conductor. Presta atención al campo `rut` con `unique=True`:',
    code: `# flota/models.py
from django.db import models

class Piloto(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre Completo")
    rut = models.CharField(max_length=15, unique=True, verbose_name="RUT o DNI")
    licencia = models.CharField(max_length=50, verbose_name="Tipo de Licencia") # Ej: A1, A2, B
    telefono = models.CharField(max_length=20, blank=True, verbose_name="Teléfono")
    experiencia_anios = models.PositiveIntegerField(default=1, verbose_name="Años de Experiencia")
    activo = models.BooleanField(default=True, verbose_name="¿Activo?")
    fecha_ingreso = models.DateField(auto_now_add=True, verbose_name="Fecha de Ingreso")

    class Meta:
        verbose_name = "Piloto"
        verbose_name_plural = "Pilotos"
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} ({self.licencia}) - RUT: {self.rut}"`,
    explanation: 'unique=True instruye al motor relacional a crear un índice UNIQUE B-Tree para evitar conductores duplicados a nivel de hardware/BD.',
    keyTakeaway: 'PositiveIntegerField valida en Python y crea automáticamente una restricción CHECK (>= 0) en SQL.'
  },
  {
    id: 5,
    type: 'terminal',
    title: 'Paso 3: Terminal de Fase 1 (makemigrations y sqlmigrate)',
    badge: 'Auditoría SQL 0001',
    content: 'Ejecuta los siguientes comandos en tu terminal para generar la migración 0001 e inspeccionar el SQL real:',
    terminalCommand: `# 1. Crear el archivo de migración con nombre descriptivo:
(env) $ python manage.py makemigrations flota --name initial_piloto
Migrations for 'flota':
  flota/migrations/0001_initial_piloto.py
    - Create model Piloto

# 2. 🔍 Inspeccionar el SQL antes de aplicarlo:
(env) $ python manage.py sqlmigrate flota 0001
CREATE TABLE "flota_piloto" (
    "id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "nombre" varchar(100) NOT NULL,
    "rut" varchar(15) NOT NULL UNIQUE,
    "licencia" varchar(50) NOT NULL,
    "telefono" varchar(20) NOT NULL,
    "experiencia_anios" integer NOT NULL CHECK ("experiencia_anios" >= 0),
    "activo" boolean NOT NULL,
    "fecha_ingreso" date NOT NULL
);

# 3. Aplicar en la base de datos:
(env) $ python manage.py migrate flota
Applying flota.0001_initial_piloto... OK`,
    terminalOutput: 'Tabla flota_piloto creada exitosamente en la base de datos.',
    keyTakeaway: 'sqlmigrate te permite verificar nombres de columnas y tipos de datos antes de tocar tablas de producción.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Paso 4: Añadir Modelo Vehiculo con Foreign Key',
    badge: 'Fase 2 · models.py',
    content: 'Agrega al final de `flota/models.py` la clase `Vehiculo`. Observa la clave foránea `piloto_asignado` con `SET_NULL`:',
    code: `# flota/models.py (Añadir al final)

class Vehiculo(models.Model):
    patente = models.CharField(max_length=10, unique=True, verbose_name="Patente")
    marca = models.CharField(max_length=50, verbose_name="Marca")
    modelo = models.CharField(max_length=50, verbose_name="Modelo")
    anio = models.PositiveIntegerField(verbose_name="Año")
    kilometraje = models.PositiveIntegerField(default=0, verbose_name="Kilometraje")

    # RELACIÓN CLAVE CON PILOTO:
    piloto_asignado = models.ForeignKey(
        Piloto,
        on_delete=models.SET_NULL, # 💡 Si borran al chofer, el camión queda libre (NULL)
        null=True,                 # 💡 Obligatorio en BD para permitir valores NULL
        blank=True,                # 💡 Permite dejar vacío en el Admin de Django
        related_name='vehiculos',
        verbose_name="Piloto Conductor"
    )

    class Meta:
        verbose_name = "Vehículo"
        verbose_name_plural = "Vehículos"

    def __str__(self):
        return f"{self.patente} - {self.marca} {self.modelo}"`,
    explanation: 'El argumento related_name="vehiculos" permite acceder desde un piloto a toda su flota asignada con piloto.vehiculos.all().',
    keyTakeaway: 'models.SET_NULL requiere obligatoriamente null=True; de lo contrario Django arrojará un error de validación del sistema.'
  },
  {
    id: 7,
    type: 'comparison',
    title: 'Paso 5: Principio de Negocio: CASCADE vs SET_NULL',
    badge: 'Decisión Arquitectónica',
    content: 'Comprende la diferencia operativa de elegir entre CASCADE y SET_NULL cuando modelas bienes de la empresa:',
    comparisonSides: [
      {
        title: '❌ Peligro: models.CASCADE',
        description: 'Borrado en cascada no deseado',
        code: `piloto_asignado = models.ForeignKey(
    Piloto,
    on_delete=models.CASCADE # ⚠️ PELIGRO
)

# Escenario:
# El conductor renuncia a la empresa:
piloto.delete()

# 💥 EFECTO CATASTRÓFICO:
# ¡El camión de $90.000 USD se borra
# automáticamente de la base de datos!`
      },
      {
        title: '✅ Correcto: models.SET_NULL',
        description: 'Preservación de activos de la empresa',
        code: `piloto_asignado = models.ForeignKey(
    Piloto,
    on_delete=models.SET_NULL, # 🛡️ SEGURO
    null=True,
    blank=True
)

# Escenario:
# El conductor renuncia a la empresa:
piloto.delete()

# 🚚 EFECTO SEGURO:
# El camión sigue existiendo en el inventario.
# Su columna piloto_asignado_id pasa a NULL.`
      }
    ],
    keyTakeaway: 'CASCADE solo aplica en relaciones subordinadas (Factura -> ItemFactura). Para activos patrimoniales usa siempre SET_NULL o PROTECT.'
  },
  {
    id: 8,
    type: 'terminal',
    title: 'Paso 6: Terminal de Fase 2 (Migración de Vehículo)',
    badge: 'Auditoría SQL 0002',
    content: 'Genera y aplica la migración 0002 para crear la tabla de vehículos con su clave foránea en la base de datos:',
    terminalCommand: `# 1. Generar la migración:
(env) $ python manage.py makemigrations flota --name vehiculo_relacion
Migrations for 'flota':
  flota/migrations/0002_vehiculo_relacion.py
    - Create model Vehiculo

# 2. Auditar la clave foránea en SQL:
(env) $ python manage.py sqlmigrate flota 0002
CREATE TABLE "flota_vehiculo" (
    "id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "patente" varchar(10) NOT NULL UNIQUE,
    "marca" varchar(50) NOT NULL,
    "modelo" varchar(50) NOT NULL,
    "anio" integer NOT NULL,
    "kilometraje" integer NOT NULL,
    "piloto_asignado_id" bigint NULL
);

ALTER TABLE "flota_vehiculo"
    ADD CONSTRAINT "flota_vehiculo_piloto_asignado_id_fk"
    FOREIGN KEY ("piloto_asignado_id")
    REFERENCES "flota_piloto" ("id")
    ON DELETE SET NULL; -- 🛡️ Motor SQL se encarga de preservar el vehículo

# 3. Aplicar:
(env) $ python manage.py migrate flota
Applying flota.0002_vehiculo_relacion... OK`,
    terminalOutput: 'Tabla flota_vehiculo vinculada exitosamente con flota_piloto.',
    keyTakeaway: 'PostgreSQL crea la restricción de clave foránea con la cláusula ON DELETE SET NULL directamente.'
  },
  {
    id: 9,
    type: 'code',
    title: 'Paso 7: Añadir TextChoices y CheckConstraints',
    badge: 'Fase 3 · models.py',
    content: 'Evoluciona `Vehiculo` agregando estados operativos y reglas de negocio blindadas a nivel de base de datos:',
    code: `# flota/models.py
from django.db.models import Q, CheckConstraint

class Vehiculo(models.Model):
    # ... campos anteriores (patente, marca, modelo, etc.) ...

    class Estado(models.TextChoices):
        DISPONIBLE = 'DISPONIBLE', 'Disponible en patio'
        EN_RUTA = 'EN_RUTA', 'En ruta de transporte'
        MANTENIMIENTO = 'MANTENIMIENTO', 'En taller mecánico'

    # Campo nuevo con DEFAULT para no romper registros existentes:
    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.DISPONIBLE,
        verbose_name="Estado Operativo"
    )

    class Meta:
        verbose_name = "Vehículo"
        verbose_name_plural = "Vehículos"
        constraints = [
            CheckConstraint(
                check=Q(kilometraje__gte=0),
                name='flota_vehiculo_km_no_negativo'
            ),
            CheckConstraint(
                check=Q(anio__gte=1990),
                name='flota_vehiculo_anio_valido'
            )
        ]`,
    explanation: 'TextChoices provee un Enum tipado en Python, mientras que CheckConstraint inyecta una regla CHECK en la base de datos SQL.',
    keyTakeaway: 'El valor default="DISPONIBLE" permite que tablas con miles de registros en producción se migren sin detenerse ni pedir defaults manuales.'
  },
  {
    id: 10,
    type: 'terminal',
    title: 'Paso 8: Terminal de Fase 3 (ALTER TABLE Seguro)',
    badge: 'Auditoría SQL 0003',
    content: 'Crea y aplica la migración 0003, observando cómo Django ejecuta sentencias `ALTER TABLE` sin bloquear la base de datos:',
    terminalCommand: `# 1. Crear migración:
(env) $ python manage.py makemigrations flota --name estado_y_constraints
Migrations for 'flota':
  flota/migrations/0003_estado_y_constraints.py
    - Add field estado to vehiculo
    - Create constraint flota_vehiculo_km_no_negativo on model vehiculo
    - Create constraint flota_vehiculo_anio_valido on model vehiculo

# 2. Auditar ALTER TABLE:
(env) $ python manage.py sqlmigrate flota 0003
ALTER TABLE "flota_vehiculo"
    ADD COLUMN "estado" varchar(20) DEFAULT 'DISPONIBLE' NOT NULL;

ALTER TABLE "flota_vehiculo"
    ADD CONSTRAINT "flota_vehiculo_km_no_negativo"
    CHECK ("kilometraje" >= 0);

ALTER TABLE "flota_vehiculo"
    ADD CONSTRAINT "flota_vehiculo_anio_valido"
    CHECK ("anio" >= 1990);

# 3. Aplicar:
(env) $ python manage.py migrate flota
Applying flota.0003_estado_y_constraints... OK`,
    terminalOutput: 'Migración 0003 aplicada exitosamente sin tiempo de inactividad.',
    keyTakeaway: 'Las restricciones a nivel de motor SQL impiden que bugs en el frontend o scripts externos guarden kilometrajes negativos.'
  },
  {
    id: 11,
    type: 'terminal',
    title: 'Paso 9: Instalar Faker y Probarlo en la Shell de Django',
    badge: 'Instalación de Faker',
    content: 'Instalamos la librería Faker y hacemos una prueba rápida en la terminal interactiva de Django:',
    terminalCommand: `# 1. Instalar la librería faker en el entorno virtual:
(env) $ pip install faker

# 2. Abrir la shell interactiva de Django:
(env) $ python manage.py shell

>>> from faker import Faker
>>> fake = Faker(['es_ES']) # Localización de datos en español
>>> fake.name()
'Carlos Mendoza Rojas'
>>> fake.phone_number()
'+56 9 8472 9183'
>>> fake.unique.random_number(digits=8)
18492034
>>> exit()`,
    terminalOutput: 'Faker instalado y respondiendo con datos localizados en español.',
    keyTakeaway: 'Faker permite generar nombres, correos, patentes y números de teléfono totalmente verosímiles en milisegundos.'
  },
  {
    id: 12,
    type: 'code',
    title: 'Paso 10: Escribir el Controlador en flota/views.py',
    badge: 'Capa Controller / View',
    content: 'Crea el controlador `generar_flota_fake_view` en `flota/views.py`. Utiliza `transaction.atomic()` para garantizar integridad total:',
    code: `# flota/views.py
import random
from faker import Faker
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import transaction
from django.conf import settings
from django.core.exceptions import PermissionDenied
from django.contrib.admin.views.decorators import staff_member_required

from .models import Piloto, Vehiculo


@staff_member_required
def generar_flota_fake_view(request):
    """Controlador que genera pilotos y vehículos falsos usando Faker."""
    if not settings.DEBUG:
        raise PermissionDenied("Herramienta exclusiva de entorno de desarrollo (DEBUG=True).")

    if request.method == "POST":
        cantidad = int(request.POST.get("cantidad", 10))
        fake = Faker(['es_ES'])

        # 🛡️ Transacción atómica: si falla un vehículo, se revierte todo (ROLLBACK)
        with transaction.atomic():
            # 1. Crear Pilotos
            pilotos = []
            for _ in range(cantidad):
                rut_num = fake.unique.random_number(digits=8)
                p = Piloto.objects.create(
                    nombre=fake.name(),
                    rut=f"{rut_num}-{random.randint(0, 9)}",
                    licencia=random.choice(['Clase A1', 'Clase A2', 'Clase B', 'Clase A4']),
                    telefono=fake.phone_number()[:20],
                    experiencia_anios=random.randint(1, 20),
                    activo=True
                )
                pilotos.append(p)

            # 2. Catálogo de marcas y modelos
            marcas = ['Toyota', 'Hyundai', 'Volvo', 'Mercedes-Benz', 'Scania']
            for _ in range(cantidad):
                marca = random.choice(marcas)
                letras = fake.lexify(text='????').upper()
                numeros = random.randint(10, 99)
                patente = f"{letras[:2]}{letras[2:]}-{numeros}"

                # 80% tienen chofer asignado, 20% quedan en patio (NULL)
                chofer = random.choice(pilotos) if random.random() > 0.2 else None
                estado = 'EN_RUTA' if chofer else random.choice(['DISPONIBLE', 'MANTENIMIENTO'])

                Vehiculo.objects.create(
                    patente=patente,
                    marca=marca,
                    modelo=f"Unidad {fake.word().capitalize()}",
                    anio=random.randint(2018, 2025),
                    kilometraje=random.randint(2000, 180000),
                    estado=estado,
                    piloto_asignado=chofer
                )

        messages.success(request, f"¡Éxito! Se crearon {cantidad} pilotos y {cantidad} vehículos.")
        return redirect('flota:generar_fake')

    return render(request, 'flota/generar_fake.html')`,
    explanation: 'with transaction.atomic() envuelve la generación en BEGIN TRANSACTION y COMMIT; si ocurre un error, ejecuta ROLLBACK.',
    keyTakeaway: 'Proteger con if not settings.DEBUG evita desastres si este endpoint llega a ser desplegado en producción.'
  },
  {
    id: 13,
    type: 'code',
    title: 'Paso 11: Configurar URLs y Plantilla HTML',
    badge: 'Ruta & Template',
    content: 'Crea el archivo `flota/urls.py`, vincúlalo en el proyecto principal y crea la plantilla `templates/flota/generar_fake.html`:',
    code: `# 1. flota/urls.py
from django.urls import path
from . import views

app_name = 'flota'

urlpatterns = [
    path('fake-data/', views.generar_flota_fake_view, name='generar_fake'),
]

# 2. En el archivo urls.py de tu proyecto principal:
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('flota/', include('flota.urls')), # 👈 ¡Vincular aquí!
]

<!-- 3. templates/flota/generar_fake.html -->
<form method="POST">
  {% csrf_token %}
  <label for="cantidad">Cantidad de unidades:</label>
  <select name="cantidad" id="cantidad">
    <option value="5">5 registros</option>
    <option value="15" selected>15 registros (Recomendado)</option>
    <option value="50">50 registros (Carga pesada)</option>
  </select>

  <button type="submit">
    ⚡ Ejecutar Controlador y Sembrar Flota
  </button>
</form>`,
    explanation: 'El token {% csrf_token %} previene peticiones maliciosas externas hacia el controlador.',
    keyTakeaway: 'Organizar las URLs con include("flota.urls") mantiene tu proyecto ordenado y desacoplado.'
  },
  {
    id: 14,
    type: 'terminal',
    title: 'Paso 12: Levantar el Servidor y Probar en el Navegador',
    badge: 'Ejecución en Vivo',
    content: 'Inicia el servidor de desarrollo y visita la ruta en tu navegador web:',
    terminalCommand: `# Iniciar el servidor local:
(env) $ python manage.py runserver

Watching for file changes with StatReloader
Performing system checks...
System check identified no issues (0 silenced).
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

# 🌐 Abre en tu navegador:
# http://127.0.0.1:8000/flota/fake-data/
# 1. Selecciona 15 registros.
# 2. Haz clic en "⚡ Ejecutar Controlador".
# 3. Verás el mensaje flash de éxito en pantalla.`,
    terminalOutput: 'Respuesta HTTP 302 Redirect -> HTTP 200 OK con mensaje de éxito de Django.',
    keyTakeaway: 'En segundos tu base de datos pasa de estar vacía a contar con decenas de registros consistentes.'
  },
  {
    id: 15,
    type: 'code',
    title: 'Paso 13: Verificar los Datos con Django ORM (Sin N+1)',
    badge: 'Consultas ORM Profesionales',
    content: 'Abre la consola de Django y realiza consultas optimizadas sobre los datos que generaste con Faker:',
    code: `# En la terminal: python manage.py shell
from flota.models import Vehiculo, Piloto
from django.db.models import Avg, Max, Count

# 1. 🚀 Traer vehículos y sus pilotos con SQL JOIN directo (1 sola consulta, CERO N+1):
vehiculos = Vehiculo.objects.select_related('piloto_asignado').all()

for v in vehiculos:
    chofer = v.piloto_asignado.nombre if v.piloto_asignado else "Sin chofer (En patio)"
    print(f"[{v.patente}] {v.marca} {v.modelo} ({v.estado}) -> Chofer: {chofer}")

# 2. Filtrar camiones disponibles sin chofer:
libres = Vehiculo.objects.filter(
    estado=Vehiculo.Estado.DISPONIBLE,
    piloto_asignado__isnull=True
)
print("Camiones listos en patio:", libres.count())

# 3. Estadísticas globales calculadas por PostgreSQL:
stats = Vehiculo.objects.aggregate(
    promedio_km=Avg('kilometraje'),
    max_km=Max('kilometraje'),
    total_unidades=Count('id')
)
print(stats)
# {'promedio_km': 74312.4, 'max_km': 178230, 'total_unidades': 15}`,
    explanation: 'select_related("piloto_asignado") ejecuta un LEFT OUTER JOIN en SQL, trayendo toda la información sin hacer consultas secundarias por cada vehículo.',
    keyTakeaway: 'select_related es obligatorio al consultar relaciones ForeignKey de 1 a 1 o 1 a N para lograr máximo rendimiento.'
  }
];
