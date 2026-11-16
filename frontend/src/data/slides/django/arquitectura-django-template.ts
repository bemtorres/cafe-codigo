import type { Slide } from '../../../types/slides';

export const arquitecturaDjangoTemplateSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '4.3 Templates y DTL: El Arte de Presentar Datos 🎨',
    subtitle: 'Django Template Language, herencia de plantillas, bloques, filtros y manejo de estáticos',
    badge: 'Django · Lección 4.3',
    content: 'Domina el motor de plantillas de Django (DTL). Aprende a diseñar interfaces web modulares, reutilizables y seguras con herencia de layouts, filtros de transformación y archivos estáticos.',
    bulletPoints: [
      '🔤 Las 4 construcciones del DTL: Variables {{ }}, Tags {% %}, Filtros | y Comentarios {# #}',
      '🏛️ Herencia de plantillas: La regla DRY aplicada al diseño web con {% extends %} y {% block %}',
      '🛠️ Filtros nativos esenciales: date, floatformat, truncatewords, default y safe',
      '🖼️ Archivos estáticos ({% load static %}): CSS, JavaScript e imágenes optimizadas'
    ],
    keyTakeaway: 'DTL está diseñado intencionalmente para no ejecutar código Python arbitrario: separa la lógica pesada del diseño visual.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Las 4 Estructuras Sintácticas del Django Template Language',
    badge: 'Gramática de DTL',
    content: 'Todo lo que puedes escribir en una plantilla DTL encaja en una de estas 4 categorías:',
    visualChart: {
      headers: ['Sintaxis', 'Nombre', 'Propósito', 'Ejemplo en Código'],
      rows: [
        ['`{{ variable }}`', 'Variable', 'Imprime un valor que viene del contexto de la vista', '`{{ producto.nombre }}`'],
        ['`{% tag %}`', 'Etiqueta (Tag)', 'Controla lógica de flujo: bucles, condiciones y herencia', '`{% for item in items %} ... {% endfor %}`'],
        ['`{{ valor|filtro }}`', 'Filtro (Pipe)', 'Transforma o formatea el valor antes de imprimirlo', '`{{ precio|floatformat:2 }}`'],
        ['`{# comentario #}`', 'Comentario', 'Notas invisibles para el usuario que no aparecen en el HTML', '`{# Ocultar en móviles #}`']
      ]
    },
    keyTakeaway: 'Regla de oro: Dos llaves {{ }} para imprimir; una llave con porcentaje {% %} para hacer cosas.'
  },
  {
    id: 3,
    type: 'diagram',
    title: 'Herencia de Plantillas: El Patrón Maestro (base.html)',
    badge: 'Arquitectura DRY',
    content: 'En lugar de copiar y pegar el <head>, <nav> y <footer> en 20 archivos distintos, creamos una plantilla maestra y dejamos bloques rellenables:',
    bulletPoints: [
      '1. base.html: Contiene el esqueleto HTML5, la barra de navegación, los enlaces a CSS/JS y el pie de página.',
      '2. Bloques ({% block content %}): Zonas huecas reservadas para que las páginas hijas inyecten su contenido específico.',
      '3. Páginas Hijas ({% extends "base.html" %}): Solo escriben lo que cambia (el catálogo, la ficha, el formulario).',
      '4. Mantenimiento Instantáneo: Si cambias el navbar en base.html, ¡se actualiza automáticamente en las 50 páginas del sitio!'
    ],
    keyTakeaway: 'La herencia de plantillas reduce el 80% del código duplicado en el frontend de tus aplicaciones Django.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Ejemplo Práctico: base.html frente a la Plantilla Hija',
    badge: 'Código DTL',
    content: 'Observa la elegancia y limpieza de la herencia en acción:',
    codeSnippet: {
      filename: 'templates/layout.html',
      lang: 'html',
      code: `<!-- 1. templates/base.html (PLANTILLA PADRE) -->
<!DOCTYPE html>
<html lang="es">
<head>
    <title>{% block title %}Mi Tienda Django{% endblock %}</title>
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/estilos.css' %}">
</head>
<body>
    <header><nav><!-- Barra de navegación común --></nav></header>

    <main class="container">
        {% block content %}
        <!-- Aquí las páginas hijas inyectarán su contenido -->
        {% endblock %}
    </main>

    <footer>&copy; 2026 Café y Código</footer>
</body>
</html>

<!-- 2. templates/catalogo/lista.html (PLANTILLA HIJA) -->
{% extends "base.html" %}

{% block title %}Catálogo de Cafés de Especialidad{% endblock %}

{% block content %}
    <h2>Nuestros Productos Disponibles</h2>
    <div class="grid">
        {% for cafe in productos %}
            <article class="card">
                <h3>{{ cafe.nombre }}</h3>
                <p>Precio: \${{ cafe.precio|floatformat:2 }}</p>
            </article>
        {% empty %}
            <p>No hay productos disponibles por el momento.</p>
        {% endfor %}
    </div>
{% endblock %}`,
      explanation: '{% empty %} se ejecuta automáticamente si la lista de productos está vacía o es None, evitando if/else anidados.'
    },
    keyTakeaway: '{% extends %} debe ser siempre la PRIMERÍSIMA línea de la plantilla hija, antes de cualquier otra etiqueta.'
  },
  {
    id: 5,
    type: 'comparison',
    title: 'Los 6 Filtros de DTL Más Usados en la Industria',
    badge: 'Filtros Útiles',
    content: 'Los filtros permiten dar formato profesional a fechas, números y textos directamente en la vista:',
    visualChart: {
      headers: ['Filtro DTL', 'Entrada Original', 'Sintaxis', 'Salida Renderizada'],
      rows: [
        ['`date`', '`datetime(2026, 9, 28)`', '`{{ fecha|date:"d/m/Y" }}`', '`28/09/2026`'],
        ['`floatformat`', '`42.5`', '`{{ precio|floatformat:2 }}`', '`42.50`'],
        ['`truncatewords`', 'Texto de 80 palabras', '`{{ desc|truncatewords:5 }}`', '`Este es un texto largo...`'],
        ['`default`', '`None` o `""` (vacío)', '`{{ stock|default:"Agotado" }}`', '`Agotado`'],
        ['`lower / upper`', '`"Hola Django"`', '`{{ titulo|upper }}`', '`HOLA DJANGO`'],
        ['`length`', '`[1, 2, 3, 4]`', '`{{ lista|length }}`', '`4`']
      ]
    },
    keyTakeaway: 'Nunca formatees fechas o decimales en Python si el único propósito es mostrarlos en el HTML: usa los filtros del DTL.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Archivos Estáticos en Django: CSS, JS e Imágenes',
    badge: 'Configuración Estática',
    content: 'Django maneja los archivos que no cambian (CSS, JS, logos) mediante el comando {% load static %}:',
    codeSnippet: {
      filename: 'uso_estaticos.html',
      lang: 'html',
      code: `<!-- 1. En settings.py defines la URL pública: -->
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

<!-- 2. En tu archivo HTML: -->
{% load static %}

<!-- Enlace a archivo CSS -->
<link rel="stylesheet" href="{% static 'css/app.css' %}">

<!-- Inclusión de imagen corporativa -->
<img src="{% static 'images/logo.png' %}" alt="Logo de la Empresa">

<!-- Script de interactividad -->
<script src="{% static 'js/main.js' %}"></script>`,
      explanation: '{% static %} genera la ruta correcta automáticamente, incluso si luego subes tus estáticos a Amazon S3 o a un CDN con Whitenoise.'
    },
    keyTakeaway: 'Usa siempre {% static %} en vez de rutas fijas como "/static/css/..." para garantizar portabilidad en despliegues.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Interfaces Limpias y Modulares',
    badge: 'Habilidades DTL',
    content: 'Has aprendido a construir la capa visual de tus aplicaciones web en Django:',
    bulletPoints: [
      '✅ Dominas las variables {{ }}, etiquetas {% %}, filtros | y comentarios {# #}.',
      '✅ Creas arquitecturas de diseño modulares con base.html, {% extends %} y {% block %}.',
      '✅ Utilizas el tag {% empty %} para estados vacíos elegantes sin código extra.',
      '✅ Formateas fechas, números y textos con los filtros nativos del DTL.',
      '✅ Integras CSS, JavaScript e imágenes con {% load static %}.'
    ],
    keyTakeaway: 'En la lección 4.4 pondremos en práctica todo el ciclo MVT mediante retos y ejercicios interactivos.'
  }
];
