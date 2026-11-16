import type { Slide } from '../../../types/slides';

export const arquitecturaDjangoUrlsSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '4.1 URLs y Enrutamiento en Django: El Mapa de Rutas 🗺️',
    subtitle: 'path(), convertidores de tipo, namespaces con include() y URLs dinámicas reversibles',
    badge: 'Django · Lección 4.1',
    content: 'Aprende cómo Django intercepta las URLs del navegador, valida parámetros dinámicos con convertidores de ruta y organiza aplicaciones con namespaces profesionales sin URLs hardcodeadas.',
    bulletPoints: [
      '🧭 path() y urlpatterns: La tabla de enrutamiento central',
      '🎯 Convertidores de ruta: <int:id>, <slug:slug> y validación de tipos',
      '📦 Enrutamiento modular con include(): Un urls.py por cada app',
      '🔗 Enlaces limpios con {% url %}: Jamás escribir rutas a mano'
    ],
    keyTakeaway: 'Un buen sistema de URLs debe ser legible para los humanos, amigable para el SEO (URLs limpias) y fácil de mantener.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Anatomía de la Función path(): Los 3 Argumentos',
    badge: 'Sintaxis Fundamental',
    content: 'Cada ruta en la lista urlpatterns se define mediante la función path() con 3 parámetros esenciales:',
    visualChart: {
      headers: ['Argumento', 'Tipo', 'Propósito', 'Ejemplo'],
      rows: [
        ['1. route', 'String', 'El patrón de texto que debe coincidir con la URL del navegador', `'articulos/<int:id>/'`],
        ['2. view', 'Función / Clase', 'La vista en Python que se ejecutará si la URL coincide', `views.detalle_articulo`],
        ['3. name (Opcional pero crucial)', 'String', 'Identificador único para referenciar la URL en templates y vistas', `name='articulo_detalle'`]
      ]
    },
    keyTakeaway: 'Nombrar siempre cada ruta con "name" te permite cambiar la URL física sin romper ningún enlace de tu sitio web.'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'Catálogo de Convertidores de Ruta Oficiales de Django',
    badge: 'Validación en la URL',
    content: 'Los convertidores no solo extraen variables de la URL; también filtran y rechazan peticiones si el tipo de dato no coincide:',
    visualChart: {
      headers: ['Convertidor', '¿Qué acepta?', 'Tipo en Python', 'Ejemplo Válido / Inválido'],
      rows: [
        ['`<int:pk>`', 'Uno o más dígitos enteros (0-9)', '`int`', '✅ /articulos/42/ | ❌ /articulos/abc/ (arroja 404)'],
        ['`<str:texto>`', 'Cualquier texto sin barra diagonal', '`str`', '✅ /usuarios/carlos/ | ❌ /usuarios/carlos/perfil/'],
        ['`<slug:slug>`', 'Letras, números, guiones y guiones bajos', '`str`', '✅ /posts/django-5-profesional/ (Ideal para SEO)'],
        ['`<uuid:token>`', 'Identificadores únicos formateados con guiones', '`uuid.UUID`', '✅ /verificar/075193d3-6e3e-4d89-bb0b-4886b72a6b2d/'],
        ['`<path:ruta>`', 'Cualquier cadena de texto, incluyendo barras', '`str`', '✅ /archivos/2024/09/documento.pdf']
      ]
    },
    keyTakeaway: 'Los convertidores de ruta previenen errores de tipo antes de que la petición toque tu código en views.py.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Enrutamiento Modular con include(): La Regla de Oro',
    badge: 'Arquitectura Limpia',
    content: 'Nunca pongas todas las URLs de tu sitio en un solo archivo. Delega cada módulo a su propio urls.py:',
    codeSnippet: {
      filename: 'config/urls.py (Proyecto Central)',
      lang: 'python',
      code: `from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Delegamos todo lo que empiece con 'articulos/' a la app blog:
    path('articulos/', include('blog.urls')),
    
    # Delegamos los usuarios a la app accounts:
    path('cuentas/', include('accounts.urls')),
]`,
      explanation: 'El archivo principal del proyecto solo redirige el tráfico a cada aplicación modular mediante include().'
    },
    keyTakeaway: 'Cada app es dueña de sus propias rutas dentro de su propia carpeta app/urls.py.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Namespaces y Nombres de Rutas en la App',
    badge: 'app_name y reverse',
    content: 'Así se estructura el archivo urls.py interno de una aplicación con espacios de nombres (namespaces):',
    codeSnippet: {
      filename: 'blog/urls.py (Interno de la App)',
      lang: 'python',
      code: `from django.urls import path
from . import views

# Namespace para evitar colisiones entre distintas apps:
app_name = 'blog'

urlpatterns = [
    # Ruta estática para el catálogo principal:
    path('', views.lista_articulos, name='lista'),
    
    # Ruta dinámica con convertidor entero:
    path('<int:articulo_id>/', views.detalle_articulo, name='detalle'),
]`,
      explanation: 'Con app_name = "blog", puedes referenciar esta ruta desde cualquier lugar como "blog:detalle".'
    },
    keyTakeaway: 'El prefijo "blog:detalle" garantiza que no haya conflicto si otra app tiene una ruta llamada "detalle".'
  },
  {
    id: 6,
    type: 'code',
    title: 'El Pecado Capital: URLs Hardcodeadas vs {% url %}',
    badge: 'Buenas Prácticas',
    content: 'Jamás escribas href="/articulos/5/" a mano en tu HTML. Si mañana cambias la ruta a /posts/5/, romperás todos tus enlaces:',
    codeSnippet: {
      filename: 'templates/articulo_item.html',
      lang: 'html',
      code: `<!-- ❌ PÉSIMA PRÁCTICA (Hardcodeado): Si cambia la URL, se rompe -->
<a href="/articulos/{{ articulo.id }}/">Leer artículo</a>

<!-- ✅ MEJOR PRÁCTICA PROFESIONAL: Enrutamiento reversible -->
<a href="{% url 'blog:detalle' articulo.id %}">Leer artículo</a>

<!-- En código Python de views.py se usa reverse(): -->
<!-- from django.urls import reverse -->
<!-- url_destino = reverse('blog:detalle', kwargs={'articulo_id': articulo.id}) -->`,
      explanation: 'Django calcula la URL física en tiempo de ejecución buscando el nombre "blog:detalle" en la tabla urlpatterns.'
    },
    keyTakeaway: 'Usa siempre {% url %} en HTML y reverse() en Python para que tus enlaces sean 100% inmunes a cambios de rutas.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Maestría en Enrutamiento',
    badge: 'Competencias Adquiridas',
    content: 'Has dominado el sistema de navegación y enrutamiento de Django:',
    bulletPoints: [
      '✅ Creas rutas limpias y estructuradas con la función path().',
      '✅ Utilizas convertidores de tipo (<int:id>, <slug:slug>) para tipado estricto.',
      '✅ Mantienes el proyecto modular usando include() en el urls.py principal.',
      '✅ Previenes colisiones usando namespaces con app_name.',
      '✅ Generas enlaces dinámicos con {% url %} y reverse().'
    ],
    keyTakeaway: 'En la siguiente lección (4.2 Views), aprenderemos a procesar la lógica de negocio cuando una URL es llamada.'
  }
];
