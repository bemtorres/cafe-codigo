# Guía Maestra de Django: Sistema de Biblioteca Profesional
> URLs avanzadas, Modelos con todos los tipos de datos, Migraciones evolutivas con ejercicios, Seeder con Faker y ORM de básico a avanzado.

---

## Índice General

1. [Arquitectura de URLs Profesional](#1-arquitectura-de-urls-profesional)
   - 1.1 Estructura modular y namespaces
   - 1.2 Path Converters nativos y personalizados (Custom Converters)
   - 1.3 Expresiones regulares con `re_path`
   - 1.4 Manejo de Query Parameters (`GET`)
   - 1.5 Inversión de URLs (`reverse` y `{% url %}`)
2. [Modelos: Propuesta con Todos los Tipos de Datos y Relaciones](#2-modelos-propuesta-con-todos-los-tipos-de-datos-y-relaciones)
   - 2.1 Visión general del modelo de dominio (Biblioteca)
   - 2.2 Código completo de `models.py` (Tipos, Enums, Constraints, Índices)
   - 2.3 Desglose detallado de campos y relaciones
3. [Migraciones: Ciclo de Vida, Estrategias y Ejercicios](#3-migraciones-ciclo-de-vida-estrategias-y-ejercicios)
   - 3.1 Cómo funcionan las migraciones internamente
   - 3.2 Escenario evolutivo: Agregando campos `NOT NULL` sin romper producción
   - 3.3 Migración de datos con `RunPython` (Caso real de normalización)
   - 3.4 Reversión (Rollback) de migraciones de forma segura
   - 3.5 Ejercicios prácticos con soluciones paso a paso
4. [Seeder Profesional con Faker](#4-seeder-profesional-con-faker)
   - 4.1 Django Management Command (`seed_biblioteca.py`)
   - 4.2 Ejecución y verificación
5. [Django ORM: De Básico a Experto](#5-django-orm-de-básico-a-experto)
   - 5.1 Nivel 1: Consultas elementales y lookups
   - 5.2 Nivel 2: Relaciones, proyecciones (`values`, `values_list`) y ordenación
   - 5.3 Nivel 3: El problema N+1 (`select_related`, `prefetch_related`, `Prefetch`)
   - 5.4 Nivel 4: Agregaciones y Anotaciones (`Count`, `Avg`, `Sum`, `Min`, `Max`)
   - 5.5 Nivel 5: Consultas avanzadas (`Q`, `F`, `Case/When`, `Subquery`, `OuterRef`)
   - 5.6 Desafíos prácticos de ORM con soluciones de negocio

---

## 1. Arquitectura de URLs Profesional

Las rutas no deben ser solo una lista plana de strings. Django ofrece un enrutamiento desacoplado, modular y fuertemente tipado.

### 1.1 Estructura Modular y Namespaces

En un proyecto real, el archivo principal del proyecto solo delega en las aplicaciones mediante `include()` y asigna un `namespace`.

#### `config/urls.py` (Proyecto)
```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # Namespace para evitar colisiones entre apps
    path('biblioteca/', include(('biblioteca.urls', 'biblioteca'), namespace='biblioteca')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

#### `biblioteca/converters.py` (Custom Path Converter)
Django permite crear convertidores personalizados implementando `regex`, `to_python` y `to_url`:

```python
import re

class ISBNConverter:
    """Valida y formatea códigos ISBN-10 o ISBN-13 (ej: 978-0-13-235088-4 o 9780132350884)."""
    regex = r'(?:(?:\d{3}[- ]?)?\d{1,5}[- ]?\d+[- ]?\d+[- ]?[\dX])'

    def to_python(self, value: str) -> str:
        # Limpia guiones y espacios para la vista
        return re.sub(r'[- ]', '', value)

    def to_url(self, value: str) -> str:
        return str(value)


class FourDigitYearConverter:
    regex = r'\d{4}'

    def to_python(self, value: str) -> int:
        return int(value)

    def to_url(self, value: int) -> str:
        return f"{value:04d}"
```

#### `biblioteca/urls.py` (Aplicación)
```python
from django.urls import path, re_path, register_converter
from . import converters, views

# Registro de convertidores personalizados
register_converter(converters.ISBNConverter, 'isbn')
register_converter(converters.FourDigitYearConverter, 'year4')

app_name = 'biblioteca'

urlpatterns = [
    # 1. Rutas exactas
    path('', views.CatalogoLibrosView.as_view(), name='catalogo'),
    path('mis-solicitudes/', views.MisSolicitudesView.as_view(), name='mis_solicitudes'),
    
    # 2. Path converters estándar: int, slug, uuid, str
    path('libro/<int:pk>/', views.LibroDetalleIdView.as_view(), name='libro_detalle_id'),
    path('libro/slug/<slug:slug>/', views.LibroDetalleSlugView.as_view(), name='libro_detalle_slug'),
    path('prestamo/<uuid:token>/', views.ComprobantePrestamoView.as_view(), name='comprobante_prestamo'),
    path('autor/<str:username>/', views.AutorPerfilView.as_view(), name='autor_perfil'),
    
    # 3. Custom converters
    path('libro/isbn/<isbn:codigo>/', views.LibroPorISBNView.as_view(), name='libro_por_isbn'),
    path('archivo/<year4:anio>/', views.LibrosPorAnioView.as_view(), name='libros_por_anio'),
    
    # 4. Expresiones regulares con re_path (ej: catálogo por periodo y categoría alfanumérica)
    re_path(
        r'^archivo/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<seccion>[a-zA-Z0-9_-]+)/$',
        views.ArchivoHistoricoView.as_view(),
        name='archivo_historico'
    ),
    
    # 5. Solicitud de préstamo (Acción POST)
    path('libro/<int:libro_id>/solicitar/', views.CrearSolicitudPrestamoView.as_view(), name='solicitar_prestamo'),
]
```

### 1.2 Manejo de Query Parameters (`request.GET`)

Los parámetros de consulta (`?q=python&categoria=backend&tags=1&tags=3&pagina=2`) no forman parte del `path()` de urls.py, sino que se extraen del objeto `request.GET`:

```python
from django.views.generic import ListView
from .models import Libro

class CatalogoLibrosView(ListView):
    model = Libro
    template_name = 'biblioteca/catalogo.html'
    context_object_name = 'libros'
    paginate_by = 12

    def get_queryset(self):
        queryset = super().get_queryset().select_related('autor', 'categoria').prefetch_related('tags')
        
        # 1. Parámetro simple de texto
        busqueda = self.request.GET.get('q', '').strip()
        if busqueda:
            queryset = queryset.filter(titulo__icontains=busqueda)
            
        # 2. Parámetro de categoría (slug)
        categoria_slug = self.request.GET.get('categoria')
        if categoria_slug:
            queryset = queryset.filter(categoria__slug=categoria_slug)
            
        # 3. Parámetro múltiple: ?tags=1&tags=4
        tags_seleccionados = self.request.GET.getlist('tags')
        if tags_seleccionados:
            queryset = queryset.filter(tags__id__in=tags_seleccionados).distinct()
            
        # 4. Parámetro booleano o filtro especial
        solo_disponibles = self.request.GET.get('disponible') == 'true'
        if solo_disponibles:
            queryset = queryset.filter(stock_disponible__gt=0)
            
        # 5. Ordenación dinámica validada
        orden_permitido = {
            'recientes': '-created_at',
            'antiguos': 'created_at',
            'titulo': 'titulo',
            'paginas': '-paginas',
        }
        orden = self.request.GET.get('orden', 'recientes')
        return queryset.order_by(orden_permitido.get(orden, '-created_at'))
```

### 1.3 Inversión de URLs (`reverse` y `{% url %}`)

Nunca escribas URLs hardcodeadas (`"/biblioteca/libro/5/"`). Usa siempre resolución invertida:

```python
# En Python (vistas, modelos, servicios):
from django.urls import reverse

url_detalle = reverse('biblioteca:libro_detalle_id', kwargs={'pk': 15})
url_isbn = reverse('biblioteca:libro_por_isbn', kwargs={'codigo': '9780132350884'})
url_archivo = reverse('biblioteca:archivo_historico', kwargs={
    'year': '2025',
    'month': '08',
    'seccion': 'computacion'
})
```

```html
<!-- En Templates Django -->
<a href="{% url 'biblioteca:libro_detalle_slug' slug=libro.slug %}">
    {{ libro.titulo }}
</a>

<!-- Con Query Params manuales -->
<a href="{% url 'biblioteca:catalogo' %}?categoria={{ libro.categoria.slug }}&disponible=true">
    Ver más de {{ libro.categoria.nombre }}
</a>
```

---

## 2. Modelos: Propuesta con Todos los Tipos de Datos y Relaciones

Para cubrir exhaustivamente los tipos de Django, creamos un ecosistema completo para la biblioteca:
- **`PerfilLector`**: Relación 1:1 con `User`, UUID, imágenes, fechas, booleanos, enteros positivos.
- **`Autor`**: Textos, URLs, correos, campos opcionales.
- **`Categoria`**: Relación autorreferencial (árbol de categorías: *Tecnología -> Programación -> Python*).
- **`Tag`**: Colores HEX, slugs.
- **`Libro`**: UUID, Slugs, JSONField, Decimals, Duraciones, Archivos (PDF) e Imágenes, validadores personalizados, `CheckConstraint` y `Index`.
- **`SolicitudPrestamo`**: Relación Muchos-a-Muchos intermedia entre `User` y `Libro` con ciclo de vida completo (estados con `TextChoices`, multas, fechas calculadas).

### 2.1 Código Completo de `models.py`

```python
import uuid
from datetime import timedelta
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.utils.text import slugify


def validar_isbn(valor: str):
    limpio = valor.replace("-", "").replace(" ", "").upper()
    if len(limpio) not in (10, 13):
        raise ValidationError("El ISBN debe tener exactamente 10 o 13 dígitos.")


# ==========================================
# 1. PERFIL DE LECTOR (OneToOne)
# ==========================================
class PerfilLector(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil_lector',
        verbose_name="Usuario"
    )
    codigo_socio = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        help_text="Identificador único global del socio"
    )
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.TextField(blank=True, verbose_name="Dirección de residencia")
    fecha_nacimiento = models.DateField(null=True, blank=True)
    foto_perfil = models.ImageField(
        upload_to='lectores/fotos/%Y/%m/',
        null=True,
        blank=True
    )
    limite_prestamos_simultaneos = models.PositiveSmallIntegerField(
        default=3,
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    esta_sancionado = models.BooleanField(
        default=False,
        help_text="Indica si el socio tiene préstamos vencidos impidiendo nuevos pedidos"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Perfil de Lector"
        verbose_name_plural = "Perfiles de Lectores"

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} (Carnet: {str(self.codigo_socio)[:8]})"


# ==========================================
# 2. AUTOR (One-to-Many con Libro)
# ==========================================
class Autor(models.Model):
    nombre = models.CharField(max_length=150, db_index=True)
    apellidos = models.CharField(max_length=150)
    pseudonimo = models.CharField(max_length=100, blank=True, null=True)
    biografia = models.TextField(blank=True)
    email = models.EmailField(blank=True, null=True)
    sitio_web = models.URLField(blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    fecha_fallecimiento = models.DateField(null=True, blank=True)
    es_autor_destacado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"
        ordering = ['apellidos', 'nombre']

    @property
    def nombre_completo(self):
        return f"{self.nombre} {self.apellidos}"

    def __str__(self):
        return self.nombre_completo


# ==========================================
# 3. CATEGORÍA (Autorreferencial / Árbol)
# ==========================================
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)
    descripcion = models.TextField(blank=True)
    # Jerarquía: Categoría padre (ej: Informática -> Desarrollo Web -> Django)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='subcategorias'
    )

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        if self.parent:
            return f"{self.parent} > {self.nombre}"
        return self.nombre


# ==========================================
# 4. TAG / ETIQUETA (ManyToMany)
# ==========================================
class Tag(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True)
    color_hex = models.CharField(
        max_length=7,
        default="#3B82F6",
        help_text="Código hexadecimal de color (ej: #FF0000)"
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"#{self.nombre}"


# ==========================================
# 5. LIBRO (Tipos exhaustivos y relaciones)
# ==========================================
class Libro(models.Model):
    class Formato(models.TextChoices):
        TAPA_DURA = 'TAPA_DURA', 'Tapa Dura'
        TAPA_BLANDA = 'TAPA_BLANDA', 'Tapa Blanda'
        BOLSILLO = 'BOLSILLO', 'Edición de Bolsillo'
        DIGITAL = 'DIGITAL', 'E-Book / Digital'

    class Idioma(models.TextChoices):
        ES = 'es', 'Español'
        EN = 'en', 'Inglés'
        FR = 'fr', 'Francés'
        DE = 'de', 'Alemán'
        PT = 'pt', 'Portugués'

    # Identificadores y Slugs
    id = models.BigAutoField(primary_key=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    titulo = models.CharField(max_length=255, db_index=True)
    subtitulo = models.CharField(max_length=255, blank=True)
    slug = models.SlugField(max_length=280, unique=True)
    isbn = models.CharField(max_length=20, unique=True, validators=[validar_isbn])
    
    # Contenido y descripción
    sinopsis = models.TextField()
    
    # Numéricos
    paginas = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    edicion = models.PositiveSmallIntegerField(default=1)
    stock_total = models.PositiveIntegerField(default=1)
    stock_disponible = models.PositiveIntegerField(default=1)
    precio_reposicion = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        help_text="Costo en caso de pérdida o deterioro"
    )
    
    # Clasificaciones y Enums
    formato = models.CharField(
        max_length=20,
        choices=Formato.choices,
        default=Formato.TAPA_BLANDA
    )
    idioma = models.CharField(
        max_length=2,
        choices=Idioma.choices,
        default=Idioma.ES
    )
    
    # Fechas y Tiempos
    fecha_publicacion = models.DateField()
    tiempo_estimado_lectura = models.DurationField(
        null=True,
        blank=True,
        help_text="Ejemplo: 12 horas (formato timedelta)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Multimedia y Archivos
    portada = models.ImageField(upload_to='libros/portadas/', null=True, blank=True)
    capitulo_muestra_pdf = models.FileField(upload_to='libros/muestras/', null=True, blank=True)
    
    # Datos Semi-estructurados
    metadatos = models.JSONField(
        default=dict,
        blank=True,
        help_text="Datos libres: {'dimensiones': '20x15cm', 'peso_gramos': 450, 'editorial': 'O\\'Reilly'}"
    )
    
    # Estado booleano
    disponible_para_prestamo = models.BooleanField(default=True)

    # Relaciones
    autor = models.ForeignKey(
        Autor,
        on_delete=models.CASCADE,
        related_name='libros'
    )
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.PROTECT,
        related_name='libros'
    )
    tags = models.ManyToManyField(
        Tag,
        related_name='libros',
        blank=True
    )

    class Meta:
        verbose_name = "Libro"
        verbose_name_plural = "Libros"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['titulo', 'fecha_publicacion']),
            models.Index(fields=['slug']),
        ]
        constraints = [
            # Regla de integridad: el stock disponible no puede superar al total
            models.CheckConstraint(
                check=models.Q(stock_disponible__lte=models.F('stock_total')),
                name='chk_stock_disponible_valido'
            ),
            # El stock disponible no puede ser negativo
            models.CheckConstraint(
                check=models.Q(stock_disponible__gte=0),
                name='chk_stock_disponible_no_negativo'
            )
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.titulo}-{str(self.uuid)[:8]}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.titulo} - {self.autor.nombre_completo}"


# ==========================================
# 6. SOLICITUD DE PRÉSTAMO (Through Model / M:N enriquecida)
# ==========================================
class SolicitudPrestamo(models.Model):
    class Estado(models.TextChoices):
        PENDIENTE = 'PENDIENTE', 'Pendiente de Aprobación'
        APROBADA = 'APROBADA', 'En Préstamo (Activa)'
        RECHAZADA = 'RECHAZADA', 'Rechazada'
        DEVUELTA = 'DEVUELTA', 'Devuelta a Tiempo'
        DEVUELTA_CON_MORA = 'DEVUELTA_CON_MORA', 'Devuelta Fuera de Plazo'
        EXTRAVIADO = 'EXTRAVIADO', 'Libro Extraviado'

    codigo_seguimiento = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='solicitudes_prestamo'
    )
    libro = models.ForeignKey(
        Libro,
        on_delete=models.CASCADE,
        related_name='solicitudes_prestamo'
    )
    estado = models.CharField(
        max_length=25,
        choices=Estado.choices,
        default=Estado.PENDIENTE,
        db_index=True
    )
    
    # Control de Fechas
    fecha_solicitud = models.DateTimeField(auto_now_add=True)
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_limite_devolucion = models.DateField(null=True, blank=True)
    fecha_devolucion_real = models.DateField(null=True, blank=True)
    
    # Penalizaciones
    multa_acumulada = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        default=0.00,
        help_text="Multa calculada por cada día de mora"
    )
    
    # Auditoría y notas
    notas_usuario = models.TextField(blank=True)
    notas_bibliotecario = models.TextField(blank=True)

    class Meta:
        verbose_name = "Solicitud de Préstamo"
        verbose_name_plural = "Solicitudes de Préstamos"
        ordering = ['-fecha_solicitud']
        # Evitar duplicar una solicitud pendiente activa sobre el mismo libro por el mismo usuario
        constraints = [
            models.UniqueConstraint(
                fields=['usuario', 'libro'],
                condition=models.Q(estado='PENDIENTE'),
                name='unique_solicitud_pendiente_por_usuario_libro'
            )
        ]

    def clean(self):
        # Validación de negocio
        if self.fecha_inicio and self.fecha_limite_devolucion:
            if self.fecha_limite_devolucion < self.fecha_inicio:
                raise ValidationError("La fecha límite no puede ser anterior a la fecha de inicio.")

    def __str__(self):
        return f"Solicitud #{str(self.codigo_seguimiento)[:8]} - {self.usuario.username} -> {self.libro.titulo}"
```

---

## 3. Migraciones: Ciclo de Vida, Estrategias y Ejercicios

### 3.1 Cómo Funcionan las Migraciones Internamente

1. **`makemigrations`**: Compara el estado actual de tus clases en `models.py` contra el historial acumulado en la carpeta `migrations/`. Genera un archivo Python declarativo con una lista de `operations` (`CreateModel`, `AddField`, `AlterField`, etc.).
2. **`migrate`**: Lee la tabla interna `django_migrations` de la base de datos para saber qué migraciones ya fueron aplicadas. Ejecuta el grafo de dependencias en orden y transforma las operaciones en sentencias `ALTER TABLE`, `CREATE INDEX`, etc., correspondientes al motor (PostgreSQL, SQLite, MySQL).
3. **`sqlmigrate app 0001`**: Muestra exactamente el código SQL que Django ejecutará, ideal para auditar cambios antes de aplicarlos a producción.

---

### 3.2 Escenario Evolutivo: El problema de añadir campos `NOT NULL`

Imagina que ya tienes la tabla `Libro` en producción con 10.000 libros. Ahora decides agregar:
1. `idioma = models.CharField(max_length=2, choices=Idioma.choices)` sin default.
2. `autor = models.ForeignKey(Autor, on_delete=models.CASCADE)` sin null=True.

Si ejecutas `makemigrations`, Django se detendrá con el famoso mensaje:
```text
It is impossible to add a non-nullable field 'autor' to libro without specifying a default.
 1) Provide a one-off default now (will be set on all existing rows with a null value)
 2) Quit, and let me add a default in models.py
```

#### Estrategia Segura de Producción (En 3 Pasos):

1. **Paso A**: Declarar el campo con `null=True, blank=True` en `models.py`:
   ```python
   autor = models.ForeignKey(Autor, on_delete=models.CASCADE, null=True, blank=True)
   ```
   Generar y aplicar la migración: `makemigrations` -> `migrate`.
2. **Paso B**: Ejecutar una **Migración de Datos (`RunPython`)** para asignar un autor por defecto o calcularlo para todos los libros existentes.
3. **Paso C**: Modificar el campo a `null=False` en `models.py` y generar la última migración. Ahora ningún registro tiene `NULL`, por lo que la base de datos acepta la restricción `NOT NULL` sin romper.

---

### 3.3 Migración de Datos con `RunPython` (Normalización Real)

Supongamos que en la versión 1 del sistema, el autor era un simple campo de texto: `autor_nombre = models.CharField(...)`. En la versión 2 creamos el modelo `Autor` y queremos pasar los nombres existentes a la nueva tabla sin perder ningún registro.

#### 1. Crear una migración vacía:
```bash
python manage.py makemigrations biblioteca --empty --name migrar_autores_texto_a_fk
```

#### 2. Escribir la lógica en `biblioteca/migrations/000X_migrar_autores_texto_a_fk.py`:
```python
from django.db import migrations

def migrar_autores_hacia_adelante(apps, schema_editor):
    # Usar apps.get_model() SIEMPRE en migraciones, jamás importar directamente el modelo
    Libro = apps.get_model('biblioteca', 'Libro')
    Autor = apps.get_model('biblioteca', 'Autor')

    # Diccionario para cachear autores ya creados en memoria
    autores_cache = {}

    for libro in Libro.objects.all():
        nombre_texto = getattr(libro, 'autor_nombre_temporal', '').strip() or 'Autor Desconocido'
        
        if nombre_texto not in autores_cache:
            # Separar nombre y apellido si es posible
            partes = nombre_texto.split(' ', 1)
            nombre = partes[0]
            apellidos = partes[1] if len(partes) > 1 else ''
            
            autor_obj, _ = Autor.objects.get_or_create(
                nombre=nombre,
                apellidos=apellidos
            )
            autores_cache[nombre_texto] = autor_obj

        # Asignar la clave foránea
        libro.autor = autores_cache[nombre_texto]
        libro.save(update_fields=['autor'])


def revertir_migracion(apps, schema_editor):
    Libro = apps.get_model('biblioteca', 'Libro')
    for libro in Libro.objects.select_related('autor').all():
        if libro.autor:
            libro.autor_nombre_temporal = f"{libro.autor.nombre} {libro.autor.apellidos}".strip()
            libro.save(update_fields=['autor_nombre_temporal'])


class Migration(migrations.Migration):

    dependencies = [
        ('biblioteca', '0002_agregar_modelo_autor_y_campo_fk_nullable'),
    ]

    operations = [
        migrations.RunPython(migrar_autores_hacia_adelante, reverse_code=revertir_migracion),
    ]
```

---

### 3.4 Reversión (Rollback) de Migraciones

Para volver a un punto anterior:

```bash
# 1. Ver qué migraciones están aplicadas ([X] aplicada, [ ] pendiente)
python manage.py showmigrations biblioteca

# 2. Revertir hasta la migración 0002 específica
python manage.py migrate biblioteca 0002

# 3. Revertir TODAS las migraciones de la app biblioteca
python manage.py migrate biblioteca zero
```

---

### 3.5 Ejercicios Prácticos de Migraciones

#### Ejercicio 1: Añadir `ISBN` único a libros existentes
- **Problema**: Tienes 50 libros creados sin ISBN. Si añades `isbn = models.CharField(max_length=20, unique=True)`, la migración fallará porque todos los registros existentes recibirían una cadena vacía `""`, violando la restricción de unicidad (`UNIQUE constraint failed`).
- **Solución paso a paso**:
  1. Añadir el campo con `null=True, unique=True`.
  2. Crear una migración `RunPython` que genere un ISBN provisional (o código aleatorio tipo `TEMP-0001`, `TEMP-0002`) para cada libro existente.
  3. Modificar el campo en `models.py` a `null=False, unique=True` y correr `makemigrations`.

#### Ejercicio 2: Migrar campo `etiquetas_csv` (ej: "django,python,web") a `ManyToManyField(Tag)`
- **Problema**: Tenemos un campo `etiquetas_texto = models.TextField()` con palabras separadas por coma. Queremos migrarlo al modelo `Tag` y asociarlo mediante `libro.tags.add()`.
- **Solución con RunPython**:
  ```python
  def poblar_tags(apps, schema_editor):
      Libro = apps.get_model('biblioteca', 'Libro')
      Tag = apps.get_model('biblioteca', 'Tag')
      from django.utils.text import slugify

      for libro in Libro.objects.all():
          tags_texto = getattr(libro, 'etiquetas_texto', '') or ''
          palabras = [p.strip() for p in tags_texto.split(',') if p.strip()]
          for palabra in palabras:
              slug = slugify(palabra)
              tag_obj, _ = Tag.objects.get_or_create(slug=slug, defaults={'nombre': palabra})
              libro.tags.add(tag_obj)
  ```

---

## 4. Seeder Profesional con Faker

Para probar el ORM con solidez, necesitamos cientos de registros realistas. Crearemos un **Custom Management Command** de Django.

### 4.1 Código de `seed_biblioteca.py`
Guarda este archivo en:  
`biblioteca/management/commands/seed_biblioteca.py` (crear los directorios con `__init__.py`).

```python
import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from django.utils import timezone
from faker import Faker

from biblioteca.models import (
    PerfilLector, Autor, Categoria, Tag, Libro, SolicitudPrestamo
)

class Command(BaseCommand):
    help = "Genera datos de prueba realistas para la biblioteca usando Faker"

    def add_arguments(self, parser):
        parser.add_argument('--total-libros', type=int, default=50, help='Cantidad de libros a generar')
        parser.add_argument('--total-socios', type=int, default=15, help='Cantidad de usuarios/socios')

    @transaction.atomic
    def handle(self, *args, **options):
        fake = Faker(['es_ES'])
        total_libros = options['total_libros']
        total_socios = options['total_socios']

        self.stdout.write(self.style.NOTICE("Iniciando seed de datos de la Biblioteca..."))

        # 1. Crear Categorías (Estructura en árbol)
        categorias_base = [
            ("Tecnología", ["Programación", "Bases de Datos", "Inteligencia Artificial", "Redes"]),
            ("Literatura", ["Ciencia Ficción", "Novela Histórica", "Terror", "Poesía"]),
            ("Ciencias", ["Física", "Matemáticas", "Astronomía"]),
        ]
        
        categorias_creadas = []
        for padre_nom, hijas in categorias_base:
            padre, _ = Categoria.objects.get_or_create(nombre=padre_nom)
            categorias_creadas.append(padre)
            for hija_nom in hijas:
                hija, _ = Categoria.objects.get_or_create(nombre=hija_nom, parent=padre)
                categorias_creadas.append(hija)

        self.stdout.write(self.style.SUCCESS(f"✔ Categorías preparadas: {len(categorias_creadas)}"))

        # 2. Crear Tags
        tags_nombres = [
            ("Best Seller", "#EF4444"),
            ("Clásico", "#F59E0B"),
            ("Python", "#3B82F6"),
            ("Backend", "#10B981"),
            ("Principiantes", "#8B5CF6"),
            ("Avanzado", "#EC4899"),
            ("Recomendado", "#6366F1"),
        ]
        tags_creados = []
        for nombre, color in tags_nombres:
            tag, _ = Tag.objects.get_or_create(nombre=nombre, defaults={'color_hex': color})
            tags_creados.append(tag)

        self.stdout.write(self.style.SUCCESS(f"✔ Tags preparados: {len(tags_creados)}"))

        # 3. Crear Autores
        autores_creados = []
        for _ in range(12):
            autor = Autor.objects.create(
                nombre=fake.first_name(),
                apellidos=fake.last_name(),
                biografia=fake.paragraph(nb_sentences=4),
                email=fake.unique.email(),
                sitio_web=fake.url(),
                fecha_nacimiento=fake.date_of_birth(minimum_age=25, maximum_age=80),
                es_autor_destacado=random.choice([True, False, False])
            )
            autores_creados.append(autor)

        self.stdout.write(self.style.SUCCESS(f"✔ Autores creados: {len(autores_creados)}"))

        # 4. Crear Socios / Usuarios con Perfil
        usuarios_creados = []
        for i in range(total_socios):
            username = f"socio_{fake.user_name()}_{i}"
            user = User.objects.create_user(
                username=username,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                password="password123"
            )
            PerfilLector.objects.create(
                user=user,
                telefono=fake.phone_number(),
                direccion=fake.address(),
                fecha_nacimiento=fake.date_of_birth(minimum_age=16, maximum_age=65),
                limite_prestamos_simultaneos=random.randint(2, 5),
                esta_sancionado=random.choice([False, False, False, True])
            )
            usuarios_creados.append(user)

        self.stdout.write(self.style.SUCCESS(f"✔ Usuarios y Perfiles creados: {len(usuarios_creados)}"))

        # 5. Crear Libros
        libros_creados = []
        formatos = [Libro.Formato.TAPA_BLANDA, Libro.Formato.TAPA_DURA, Libro.Formato.BOLSILLO, Libro.Formato.DIGITAL]

        for _ in range(total_libros):
            stock_total = random.randint(2, 10)
            stock_disponible = random.randint(0, stock_total)

            libro = Libro.objects.create(
                titulo=fake.catch_phrase().title(),
                subtitulo=fake.sentence(nb_words=6),
                isbn=fake.unique.isbn13(),
                sinopsis=fake.text(max_nb_chars=400),
                paginas=random.randint(90, 950),
                edicion=random.randint(1, 4),
                stock_total=stock_total,
                stock_disponible=stock_disponible,
                precio_reposicion=round(random.uniform(15.00, 85.00), 2),
                formato=random.choice(formatos),
                idioma=random.choice(['es', 'es', 'es', 'en']),
                fecha_publicacion=fake.date_between(start_date='-10y', end_date='today'),
                tiempo_estimado_lectura=timedelta(hours=random.randint(4, 30)),
                disponible_para_prestamo=(stock_disponible > 0),
                autor=random.choice(autores_creados),
                categoria=random.choice(categorias_creadas),
                metadatos={
                    "dimensiones": f"{random.randint(18, 24)}x{random.randint(12, 18)} cm",
                    "peso_gramos": random.randint(250, 900),
                    "editorial": fake.company(),
                }
            )
            # Asignar 1 a 3 tags aleatorios
            libro.tags.set(random.sample(tags_creados, k=random.randint(1, 3)))
            libros_creados.append(libro)

        self.stdout.write(self.style.SUCCESS(f"✔ Libros creados: {len(libros_creados)}"))

        # 6. Crear Solicitudes de Préstamo
        estados = [
            SolicitudPrestamo.Estado.APROBADA,
            SolicitudPrestamo.Estado.DEVUELTA,
            SolicitudPrestamo.Estado.DEVUELTA_CON_MORA,
            SolicitudPrestamo.Estado.PENDIENTE,
        ]

        total_solicitudes = 40
        for _ in range(total_solicitudes):
            user = random.choice(usuarios_creados)
            libro = random.choice(libros_creados)
            estado = random.choice(estados)
            hoy = timezone.now().date()

            # Fechas según estado
            fecha_inicio = hoy - timedelta(days=random.randint(5, 30))
            fecha_limite = fecha_inicio + timedelta(days=14)
            fecha_devolucion = None
            multa = 0.00

            if estado == SolicitudPrestamo.Estado.DEVUELTA:
                fecha_devolucion = fecha_inicio + timedelta(days=random.randint(3, 13))
            elif estado == SolicitudPrestamo.Estado.DEVUELTA_CON_MORA:
                dias_mora = random.randint(1, 10)
                fecha_devolucion = fecha_limite + timedelta(days=dias_mora)
                multa = dias_mora * 2.50  # 2.50 por día de retraso

            # Para evitar violar el UniqueConstraint de solicitud PENDIENTE repetida
            if estado == SolicitudPrestamo.Estado.PENDIENTE:
                ya_existe = SolicitudPrestamo.objects.filter(
                    usuario=user, libro=libro, estado=SolicitudPrestamo.Estado.PENDIENTE
                ).exists()
                if ya_existe:
                    estado = SolicitudPrestamo.Estado.APROBADA

            SolicitudPrestamo.objects.create(
                usuario=user,
                libro=libro,
                estado=estado,
                fecha_inicio=fecha_inicio if estado != SolicitudPrestamo.Estado.PENDIENTE else None,
                fecha_limite_devolucion=fecha_limite if estado != SolicitudPrestamo.Estado.PENDIENTE else None,
                fecha_devolucion_real=fecha_devolucion,
                multa_acumulada=multa,
                notas_usuario=fake.sentence() if random.choice([True, False]) else "",
            )

        self.stdout.write(self.style.SUCCESS(f"✔ Solicitudes de préstamo creadas: {total_solicitudes}"))
        self.stdout.write(self.style.SUCCESS("🎉 Seeder completado exitosamente."))
```

### 4.2 Ejecución del Seeder
```bash
# Requisitos
pip install faker

# Ejecutar el comando
python manage.py seed_biblioteca --total-libros 80 --total-socios 20
```

---

## 5. Django ORM: De Básico a Experto

### 5.1 Nivel 1: Consultas Elementales y Lookups

```python
from biblioteca.models import Libro, Autor, SolicitudPrestamo

# 1. Obtener todos los registros
todos = Libro.objects.all()

# 2. Obtener un único registro (Lanza DoesNotExist o MultipleObjectsReturned)
libro = Libro.objects.get(id=1)
libro_o_none = Libro.objects.filter(isbn="978-0132350884").first()

# 3. Comprobaciones de existencia rápidas (No trae registros a memoria)
existe = Libro.objects.filter(stock_disponible=0).exists()
total_libros = Libro.objects.count()

# 4. Operadores de Filtro (Field Lookups):
# Coincidencia exacta insensible a mayúsculas
Libro.objects.filter(titulo__iexact="clean code")

# Contiene texto
Libro.objects.filter(titulo__icontains="python")

# Lista de valores (IN en SQL)
Libro.objects.filter(idioma__in=['es', 'en'])

# Comparaciones numéricas (gt, gte, lt, lte)
Libro.objects.filter(paginas__gt=400)          # paginas > 400
Libro.objects.filter(stock_disponible__lte=2) # stock_disponible <= 2

# Rango cerrado (BETWEEN en SQL)
Libro.objects.filter(fecha_publicacion__range=["2020-01-01", "2024-12-31"])

# Comprobación de nulos
Autor.objects.filter(fecha_fallecimiento__isnull=True)
```

---

### 5.2 Nivel 2: Relaciones, Proyecciones y Ordenación

```python
# 1. Filtros a través de relaciones (Doble guión bajo '__')
# Libros de autores cuyo nombre empiece con 'Gabriel'
Libro.objects.filter(autor__nombre__istartswith="Gabriel")

# Libros de la categoría 'Programación' o cualquier subcategoría
Libro.objects.filter(categoria__nombre="Programación")

# Libros que tengan el Tag con slug 'django' (Relación ManyToMany)
Libro.objects.filter(tags__slug="django").distinct()

# Relación inversa: Autores que han escrito libros con más de 500 páginas
Autor.objects.filter(libros__paginas__gt=500).distinct()

# 2. Proyecciones (Optimizar ancho de banda solicitando solo columnas necesarias)
# Devuelve lista de diccionarios: [{'id': 1, 'titulo': 'X', 'autor__nombre': 'Y'}]
Libro.objects.values('id', 'titulo', 'autor__nombre')[:5]

# Devuelve lista de tuplas o lista plana si se indica flat=True
titulos = Libro.objects.values_list('titulo', flat=True)[:10]

# 3. Ordenación
# Descendente por fecha, luego ascendente por título
Libro.objects.order_by('-fecha_publicacion', 'titulo')
```

---

### 5.3 Nivel 3: El Problema N+1 (`select_related`, `prefetch_related`)

#### ¿Qué es el problema N+1?
Si ejecutas:
```python
# PELIGRO: 1 consulta para traer 100 libros + 100 consultas para traer el autor de cada uno = 101 consultas SQL!
for libro in Libro.objects.all()[:100]:
    print(libro.titulo, libro.autor.nombre)
```

#### Solución:

1. **`select_related`**: Se usa para relaciones **1:1** (`OneToOne`) y **Muchos-a-Uno** (`ForeignKey`). Realiza un `JOIN` en una única consulta SQL.
2. **`prefetch_related`**: Se usa para relaciones **Muchos-a-Muchos** (`ManyToManyField`) y relaciones inversas (`ForeignKey` inversa). Realiza consultas separadas agrupadas con `WHERE id IN (...)` y las vincula en Python.

```python
from django.db.models import Prefetch
from biblioteca.models import Libro, SolicitudPrestamo

# Consulta hiper-optimizada en solo 2 queries SQL:
libros = Libro.objects.select_related(
    'autor', 'categoria'      # Resuelto con SQL JOIN
).prefetch_related(
    'tags'                   # Resuelto con 1 query adicional IN
)

for l in libros[:50]:
    print(l.titulo, l.autor.nombre, l.categoria.nombre, [t.nombre for t in l.tags.all()])

# Prefetch personalizado con filtros: Traer usuarios con solo sus préstamos activos
prestamos_activos_qs = SolicitudPrestamo.objects.filter(estado=SolicitudPrestamo.Estado.APROBADA)

usuarios = User.objects.prefetch_related(
    Prefetch('solicitudes_prestamo', queryset=prestamos_activos_qs, to_attr='prestamos_activos')
)

for u in usuarios:
    # u.prestamos_activos es una lista en memoria sin volver a la base de datos
    print(u.username, len(u.prestamos_activos))
```

---

### 5.4 Nivel 4: Agregaciones y Anotaciones

- **`aggregate()`**: Calcula un resumen sobre TODO el QuerySet y devuelve un diccionario.
- **`annotate()`**: Añade una columna calculada a CADA fila del QuerySet (similar a `GROUP BY` en SQL).

```python
from django.db.models import Avg, Sum, Count, Min, Max, Q

# 1. Agregaciones globales (Resumen de la biblioteca)
estadisticas = Libro.objects.aggregate(
    total_ejemplares=Sum('stock_total'),
    precio_promedio=Avg('precio_reposicion'),
    libro_mas_caro=Max('precio_reposicion'),
    libro_mas_antiguo=Min('fecha_publicacion')
)
# Retorna: {'total_ejemplares': 420, 'precio_promedio': 34.50, ...}

# 2. Anotaciones por fila:
# ¿Cuántos libros ha escrito cada autor?
autores_productivos = Autor.objects.annotate(
    total_libros=Count('libros')
).filter(total_libros__gte=3).order_by('-total_libros')

for a in autores_productivos:
    print(f"{a.nombre_completo}: {a.total_libros} libros")

# Anotación con Filtro condicional:
# Usuarios anotados con su total de préstamos y cuántos están actualmente atrasados/con mora
usuarios_reporte = User.objects.annotate(
    total_prestamos=Count('solicitudes_prestamo'),
    prestamos_con_mora=Count(
        'solicitudes_prestamo',
        filter=Q(solicitudes_prestamo__estado=SolicitudPrestamo.Estado.DEVUELTA_CON_MORA)
    )
).filter(total_prestamos__gt=0)
```

---

### 5.5 Nivel 5: Consultas Complejas (`Q`, `F`, `Case/When`, `Subquery`)

#### 1. Objetos `Q` (Lógica Booleana: OR `|`, AND `&`, NOT `~`)
```python
# Libros de la categoría 'Programación' O que tengan el tag 'Python',
# pero que NO estén agotados (stock_disponible > 0)
libros_disponibles = Libro.objects.filter(
    (Q(categoria__nombre="Programación") | Q(tags__nombre="Python")) &
    ~Q(stock_disponible=0)
).distinct()
```

#### 2. Objetos `F` (Comparar campos y operaciones atómicas sin Race Conditions)
```python
from django.db.models import F

# 1. Comparar columnas de la misma fila:
# Libros donde el stock disponible sea menor al 30% del stock total
libros_escasos = Libro.objects.filter(
    stock_disponible__lt=F('stock_total') * 0.3
)

# 2. Actualización atómica en la base de datos (Thread-safe / Evita condiciones de carrera):
# Al prestar un libro, descontar 1 del stock disponible directamente en SQL:
Libro.objects.filter(id=10).update(stock_disponible=F('stock_disponible') - 1)
```

#### 3. Condicionales SQL en el ORM con `Case` y `When`
Permite clasificar o generar columnas calculadas con lógica `IF-THEN-ELSE`:

```python
from django.db.models import Case, When, Value, CharField

# Etiquetar la prioridad de reposición de cada libro
libros_prioridad = Libro.objects.annotate(
    urgencia_reposicion=Case(
        When(stock_disponible=0, then=Value('URGENTE: Agotado')),
        When(stock_disponible__lte=2, then=Value('MEDIA: Pocas unidades')),
        default=Value('NORMAL: Abastecido'),
        output_field=CharField()
    )
).values('titulo', 'stock_disponible', 'urgencia_reposicion')
```

#### 4. Subconsultas Correlacionadas (`Subquery` y `OuterRef`)
Permite embeber una subconsulta SQL compleja por cada fila devuelta:

```python
from django.db.models import Subquery, OuterRef

# Para cada Autor, obtener la fecha de su libro más reciente sin traer todos los libros
libro_mas_reciente = Libro.objects.filter(
    autor=OuterRef('pk')
).order_by('-fecha_publicacion')

autores_con_ultimo_libro = Autor.objects.annotate(
    fecha_ultimo_libro=Subquery(libro_mas_reciente.values('fecha_publicacion')[:1]),
    titulo_ultimo_libro=Subquery(libro_mas_reciente.values('titulo')[:1])
)

for autor in autores_con_ultimo_libro:
    print(f"{autor.nombre_completo} -> Último libro: {autor.titulo_ultimo_libro} ({autor.fecha_ultimo_libro})")
```

#### 5. Transacción Completa Atómica para Préstamo
```python
from django.db import transaction
from django.core.exceptions import ValidationError

def realizar_prestamo(usuario, libro):
    with transaction.atomic():
        # Bloquear fila para evitar lecturas concurrentes sucias (select_for_update)
        libro_bloqueado = Libro.objects.select_for_update().get(id=libro.id)
        
        if libro_bloqueado.stock_disponible <= 0:
            raise ValidationError("No hay ejemplares disponibles en este momento.")
            
        # Verificar que el usuario no supere su límite
        perfil = usuario.perfil_lector
        prestamos_activos = SolicitudPrestamo.objects.filter(
            usuario=usuario,
            estado=SolicitudPrestamo.Estado.APROBADA
        ).count()
        
        if prestamos_activos >= perfil.limite_prestamos_simultaneos:
            raise ValidationError("Has alcanzado tu cupo máximo de préstamos simultáneos.")

        # Descontar stock
        libro_bloqueado.stock_disponible = F('stock_disponible') - 1
        libro_bloqueado.save()

        # Crear solicitud aprobada
        hoy = timezone.now().date()
        prestamo = SolicitudPrestamo.objects.create(
            usuario=usuario,
            libro=libro_bloqueado,
            estado=SolicitudPrestamo.Estado.APROBADA,
            fecha_inicio=hoy,
            fecha_limite_devolucion=hoy + timedelta(days=14)
        )
        return prestamo
```

---

### 5.6 Desafíos Prácticos de ORM

#### Desafío 1: Identificar a los 5 usuarios más deudores
- **Enunciado**: Obtén los 5 usuarios que acumulen la mayor cantidad de multas impagas en solicitudes con mora o extravío.
- **Solución**:
  ```python
  from django.db.models import Sum
  
  top_deudores = User.objects.annotate(
      total_deuda=Sum(
          'solicitudes_prestamo__multa_acumulada',
          filter=Q(solicitudes_prestamo__multa_acumulada__gt=0)
      )
  ).filter(total_deuda__gt=0).order_by('-total_deuda')[:5]
  ```

#### Desafío 2: Autores "huérfanos" o inactivos
- **Enunciado**: Encuentra todos los autores que no tengan ningún libro registrado en el catálogo para depurar la base de datos.
- **Solución**:
  ```python
  autores_sin_libros = Autor.objects.filter(libros__isnull=True)
  # O alternativamente con anotación:
  autores_sin_libros = Autor.objects.annotate(total=Count('libros')).filter(total=0)
  ```

#### Desafío 3: El libro más popular por categoría
- **Enunciado**: Para cada categoría, encuentra el libro que ha sido solicitado en préstamo la mayor cantidad de veces.
- **Solución**:
  ```python
  libros_populares = Libro.objects.annotate(
      veces_prestado=Count('solicitudes_prestamo')
  ).select_related('categoria').order_by('categoria', '-veces_prestado')
  ```

---

## 6. Modelo de Usuario Personalizado (`AbstractUser`) y `UserAdmin` Avanzado

En proyectos de producción nunca se debe usar el modelo `User` por defecto sin extenderlo. A continuación se detalla la arquitectura completa de usuarios de la biblioteca.

### 6.1 `usuarios/models.py`
```python
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


class Usuario(AbstractUser):
    ROLES = [
        ('LECTOR', 'Lector / Socio'),
        ('BIBLIOTECARIO', 'Bibliotecario (Personal)'),
        ('ADMINISTRADOR', 'Administrador General'),
    ]

    ESTADOS_CUENTA = [
        ('ACTIVA', 'Cuenta Activa'),
        ('SUSPENDIDA', 'Suspendida por Incumplimiento'),
        ('EN_MORA', 'En Mora / Multas Pendientes'),
    ]

    validador_rut = RegexValidator(
        regex=r'^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$',
        message="Formato de documento inválido. Debe tener la estructura XX.XXX.XXX-X."
    )

    rut_dni = models.CharField(
        max_length=20,
        unique=True,
        validators=[validador_rut],
        verbose_name="RUT / Documento de Identidad"
    )
    telefono = models.CharField(max_length=20, blank=True, verbose_name="Teléfono")
    direccion = models.CharField(max_length=255, blank=True, verbose_name="Dirección")
    fecha_nacimiento = models.DateField(null=True, blank=True)
    rol = models.CharField(max_length=20, choices=ROLES, default='LECTOR', db_index=True)
    estado_cuenta = models.CharField(max_length=20, choices=ESTADOS_CUENTA, default='ACTIVA', db_index=True)
    multas_pendientes = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    avatar = models.ImageField(upload_to='avatars/%Y/%m/', null=True, blank=True)

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
        ordering = ['username']

    @property
    def puede_solicitar_prestamos(self):
        return self.is_active and self.estado_cuenta == 'ACTIVA' and self.multas_pendientes == 0

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.get_rol_display()})"
```

### 6.2 `usuarios/forms.py` (Validaciones de Seguridad en Admin)
```python
from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import Usuario


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Usuario
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        self.request_user = kwargs.pop('current_user', None)
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        is_active = cleaned_data.get('is_active')
        is_superuser = cleaned_data.get('is_superuser')

        # Regla de Auto-Protección: Un superadmin no puede auto-desactivarse en el admin
        if self.instance and self.request_user and self.instance.pk == self.request_user.pk:
            if not is_active:
                raise forms.ValidationError(
                    "Seguridad: No puedes desactivar tu propia cuenta mientras estás administrando el sistema."
                )
            if not is_superuser:
                raise forms.ValidationError(
                    "Seguridad: No puedes revocar tus propios privilegios de superusuario."
                )

        return cleaned_data
```

### 6.3 `usuarios/admin.py` (UserAdmin con Fieldsets, Inlines y Acciones Masivas)
```python
from django.contrib import admin, messages
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import Usuario
from .forms import CustomUserChangeForm
from biblioteca.models import SolicitudPrestamo


class SolicitudPrestamoInline(admin.TabularInline):
    model = SolicitudPrestamo
    extra = 0
    readonly_fields = ['fecha_solicitud', 'libro', 'estado', 'multa_acumulada']
    can_delete = False


@admin.action(description="Suspender cuentas seleccionadas con multas pendientes")
def suspender_por_mora(modeladmin, request, queryset):
    morosos = queryset.filter(multas_pendientes__gt=0)
    actualizados = morosos.update(estado_cuenta='SUSPENDIDA', is_active=False)
    modeladmin.message_user(
        request,
        f"Se han suspendido {actualizados} cuenta(s) por multas impagas.",
        messages.WARNING
    )


@admin.action(description="Promover usuarios a rol BIBLIOTECARIO (Staff)")
def promover_a_bibliotecario(modeladmin, request, queryset):
    actualizados = queryset.update(rol='BIBLIOTECARIO', is_staff=True)
    modeladmin.message_user(
        request,
        f"Se promovieron {actualizados} usuario(s) al rol de Bibliotecario.",
        messages.SUCCESS
    )


@admin.action(description="Reactivar y condonar cuentas seleccionadas")
def reactivar_cuentas(modeladmin, request, queryset):
    actualizados = queryset.update(is_active=True, estado_cuenta='ACTIVA', multas_pendientes=0.00)
    modeladmin.message_user(
        request,
        f"Se reactivaron {actualizados} cuenta(s) exitosamente.",
        messages.SUCCESS
    )


@admin.register(Usuario)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    list_display = [
        'username', 'email', 'rut_dni', 'rol_badge',
        'estado_badge', 'multas_pendientes', 'is_staff'
    ]
    list_filter = ['rol', 'estado_cuenta', 'is_staff', 'is_active']
    search_fields = ['username', 'email', 'rut_dni', 'first_name', 'last_name']
    inlines = [SolicitudPrestamoInline]
    actions = [suspender_por_mora, promover_a_bibliotecario, reactivar_cuentas]

    fieldsets = (
        ('Credenciales de Acceso', {'fields': ('username', 'password')}),
        ('Información Personal', {'fields': ('first_name', 'last_name', 'email', 'rut_dni', 'telefono', 'direccion', 'fecha_nacimiento', 'avatar')}),
        ('Roles y Permisos', {'fields': ('rol', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Estado de Cuenta', {'fields': ('estado_cuenta', 'multas_pendientes')}),
        ('Fechas', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Datos Obligatorios', {'fields': ('email', 'rut_dni', 'rol')}),
    )

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.current_user = request.user
        return form

    def rol_badge(self, obj):
        colores = {'ADMINISTRADOR': '#7C3AED', 'BIBLIOTECARIO': '#0284C7', 'LECTOR': '#475569'}
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold;">{}</span>',
            colores.get(obj.rol, '#475569'),
            obj.rol
        )
    rol_badge.short_description = "Rol"

    def estado_badge(self, obj):
        if obj.estado_cuenta == 'ACTIVA':
            return format_html('<span style="color: #10B981; font-weight: bold;">● Activa</span>')
        elif obj.estado_cuenta == 'EN_MORA':
            return format_html('<span style="color: #F59E0B; font-weight: bold;">▲ En Mora</span>')
        return format_html('<span style="color: #EF4444; font-weight: bold;">✖ Suspendida</span>')
    estado_badge.short_description = "Estado"
```

