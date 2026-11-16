import type { Slide } from '../../../types/slides';

export const adminCrudSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '6. Django Admin Profesional y Vistas CRUD ⚙️',
    subtitle: 'De "Admin Ciego" a Panel SaaS moderno con ModelAdmin, Django Unfold y Formularios CRUD',
    badge: 'Django · Lección 6',
    content: 'Aprende a transformar el panel administrativo básico de Django en una herramienta operativa de nivel empresarial, con soporte para temas modernos de Tailwind CSS (Django Unfold) y el ciclo CRUD completo.',
    bulletPoints: [
      '⚠️ El problema de la enseñanza clásica: El "Admin Ciego" y cómo evitarlo',
      '🎯 Las 6 palancas de ModelAdmin: list_display, badges, filtros y edición en tabla',
      '📑 Maestro-Detalle con TabularInline y acciones masivas con @admin.action',
      '🚀 Metamorfosis visual con django-unfold (Tailwind CSS, Dark Mode y KPIs)',
      '📝 Formularios basados en modelos (ModelForm) y validaciones personalizadas'
    ],
    keyTakeaway: 'El panel administrativo no es un borrador para el desarrollador; es una potente herramienta de negocio lista para entregar a producción.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'El Síndrome del "Admin Ciego": Por qué el Registro Simple Falla',
    badge: 'Diagnóstico Pedagógico',
    content: 'La mayoría de cursos enseñan únicamente: admin.site.register(Vehiculo). El resultado es inutilizable en el mundo real:',
    visualChart: {
      headers: ['Aspecto', 'Registro Básico (Admin Ciego)', 'ModelAdmin Profesional'],
      rows: [
        ['Identificación de Filas', '`Vehiculo object (1)`, `Vehiculo object (2)`', 'Tabla con Patente, Marca, Modelo, Piloto y Kilometraje'],
        ['Búsqueda', '❌ No hay barra de búsqueda', '✅ Barra de búsqueda por texto y relaciones foráneas'],
        ['Segmentación', '❌ No hay filtros laterales', '✅ Filtros facetados con conteos por estado o categoría'],
        ['Edición Rápida', '❌ 15 clics para cambiar 5 estados', '✅ list_editable: inputs directos en la tabla estilo Excel'],
        ['Relaciones Hijos', '❌ Navegación discontinua', '✅ TabularInline: Ficha + Revisiones mecánicas juntas']
      ]
    },
    keyTakeaway: 'Invertir 10 minutos configurando una clase ModelAdmin multiplica por 100 la productividad del operador de tu sistema.'
  },
  {
    id: 3,
    type: 'diagram',
    title: 'La Escalera de las 6 Palancas de ModelAdmin',
    badge: 'Metodología Paso a Paso',
    content: 'Aplica estas 6 configuraciones en tu clase ModelAdmin para lograr un panel de control ejecutivo:',
    bulletPoints: [
      '1. list_display: Selecciona qué columnas mostrar y calcula datos formateados.',
      '2. format_html (Badges): Transforma textos planos en etiquetas visuales con colores (Verde=Disponible, Rojo=Taller).',
      '3. search_fields: Habilita búsqueda instantánea en campos directos y claves foráneas (piloto__nombre).',
      '4. list_filter: Agrega un panel lateral de filtros rápidos facetados por estado, tipo o fechas.',
      '5. list_editable: Convierte celdas en dropdowns editables directamente en la tabla sin abrir cada formulario.',
      '6. TabularInline & Actions: Edita el registro padre y sus hijos en una sola pantalla y ejecuta procesos en lote.'
    ],
    keyTakeaway: 'Cada palanca atiende un dolor operativo concreto de velocidad, claridad o automatización.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Código Completo de un ModelAdmin Profesional',
    badge: 'flota/admin.py',
    content: 'Observa la implementación limpia que activa todos los superpoderes:',
    codeSnippet: {
      filename: 'flota/admin.py',
      lang: 'python',
      code: `from django.contrib import admin
from django.utils.html import format_html
from .models import Vehiculo, Mantenimiento

class MantenimientoInline(admin.TabularInline):
    model = Mantenimiento
    extra = 0
    fields = ['fecha', 'tipo_servicio', 'costo', 'completado']

@admin.action(description="🛠️ Enviar seleccionados a Mantenimiento")
def enviar_a_taller(modeladmin, request, queryset):
    actualizados = queryset.update(estado='MANTENIMIENTO')
    modeladmin.message_user(request, f"{actualizados} vehículo(s) enviados al taller.")

@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ['patente', 'marca_modelo', 'piloto', 'estado_badge', 'kilometraje']
    list_editable = ['estado']
    list_filter = ['estado', 'tipo', 'anio']
    search_fields = ['patente', 'marca', 'piloto__nombre']
    inlines = [MantenimientoInline]
    actions = [enviar_a_taller]

    def marca_modelo(self, obj):
        return f"{obj.marca} {obj.modelo} ({obj.anio})"

    def estado_badge(self, obj):
        colores = {'DISPONIBLE': '#10b981', 'EN_RUTA': '#3b82f6', 'MANTENIMIENTO': '#ef4444'}
        color = colores.get(obj.estado, '#6b7280')
        return format_html('<span style="color: {}; font-weight: bold;">● {}</span>', color, obj.estado)
    estado_badge.short_description = "Estado"`,
      explanation: 'Esta única clase genera una interfaz web interactiva que normalmente tomaría semanas programar desde cero.'
    },
    keyTakeaway: 'Con inlines y actions conviertes el admin en un software ERP/CRM listo para producción.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Rediseño Completo: De Django 2005 a Django Unfold (Tailwind CSS)',
    badge: 'La Metamorfosis Visual',
    content: '¿Quieres que tu admin luzca como un SaaS moderno de 2026? El proyecto de la comunidad por excelencia es django-unfold:',
    visualChart: {
      headers: ['Característica', 'Django Clásico (2005)', 'Django Unfold (Tailwind 2026)'],
      rows: [
        ['Estilo Visual', 'Tablas planas, fuentes del sistema y colores azul/gris', 'Diseño moderno basado en Tailwind CSS, bordes sutiles y micro-interacciones'],
        ['Modo Oscuro (Dark Mode)', '❌ No disponible de fábrica', '✅ Detección automática y botón de cambio instantáneo'],
        ['Dashboard con Métricas', '❌ Solo lista de tablas de base de datos', '✅ Tarjetas de KPIs, gráficos de Chart.js y sparklines'],
        ['Soporte Móvil', '❌ Rígido y difícil de usar en pantallas pequeñas', '✅ Mobile-first, adaptable a celulares y tablets']
      ]
    },
    keyTakeaway: 'django-unfold no altera tu base de datos; solo viste al admin con un diseño visual de última generación.'
  },
  {
    id: 6,
    type: 'code',
    title: 'La Regla de Oro para Instalar Django Unfold',
    badge: 'Configuración en settings.py',
    content: 'Para que Django use las plantillas de Tailwind, unfold DEBE ir antes de django.contrib.admin:',
    codeSnippet: {
      filename: 'config/settings.py',
      lang: 'python',
      code: `# 1. Instalar con pip:
# pip install django-unfold

# 2. Configurar en INSTALLED_APPS:
INSTALLED_APPS = [
    # ⚠️ REGLA DE ORO: 'unfold' debe ir ANTES de 'django.contrib.admin':
    "unfold",
    "unfold.contrib.filters",   # Filtros facetados con estilo Tailwind
    "unfold.contrib.forms",     # Formularios y selects modernos
    "unfold.contrib.inlines",   # Inlines colapsables

    # Apps del núcleo de Django:
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Tus aplicaciones:
    "flota.apps.FlotaConfig",
]`,
      explanation: 'El orden en INSTALLED_APPS determina qué plantillas tienen prioridad en el cargador de Django.'
    },
    keyTakeaway: 'Si pones unfold después de django.contrib.admin, seguirás viendo el diseño clásico antiguo.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Tu Admin Convertido en SaaS',
    badge: 'Competencias Clave',
    content: 'Has aprendido a construir una interfaz de gestión que asombrará a tus clientes y usuarios:',
    bulletPoints: [
      '✅ Dejaste atrás el "Admin Ciego" y aplicas las 6 palancas de ModelAdmin.',
      '✅ Implementas TabularInlines para edición maestro-detalle en una sola pantalla.',
      '✅ Automatizas tareas repetitivas con acciones masivas (@admin.action).',
      '✅ Conoces el proyecto django-unfold para dotar a Django de Tailwind CSS y Dark Mode.',
      '✅ Comprendes el orden crítico de instalación en settings.py.'
    ],
    keyTakeaway: 'En el Módulo 7 abordaremos la Autenticación, Permisos y Seguridad para proteger el acceso a estos paneles.'
  }
];
