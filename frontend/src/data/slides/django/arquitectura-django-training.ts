import type { Slide } from '../../../types/slides';

export const arquitecturaDjangoTrainingSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '4.4 Ejercicios y Retos: Conexión MVT y Debugging 🛠️',
    subtitle: 'Taller práctico: Construcción de punta a punta y resolución de los 4 errores más comunes en Django',
    badge: 'Django · Lección 4.4',
    content: 'Pon a prueba tus habilidades de arquitectura Django. Conectaremos una ruta, una vista y un template desde cero, y aprenderemos a diagnosticar y solucionar los errores más comunes de la consola.',
    bulletPoints: [
      '🚀 Taller guiado: La tríada URL → View → Template construida en 4 minutos',
      '🔍 Diagnóstico de errores: NoReverseMatch, TemplateDoesNotExist y 404',
      '🛡️ El error 403 Forbidden y cómo {% csrf_token %} salva tu aplicación',
      '🧪 Checklist de depuración para proyectos reales'
    ],
    keyTakeaway: 'Un buen desarrollador no es quien nunca comete errores, sino quien sabe interpretar la pantalla amarilla de depuración de Django.'
  },
  {
    id: 2,
    type: 'diagram',
    title: 'El Reto: Construir la Ficha de un Piloto en 3 Pasos',
    badge: 'Desafío Guiado',
    content: 'El cliente nos pide crear una ruta /pilotos/<id>/ para consultar la información del conductor:',
    visualChart: {
      headers: ['Paso', 'Archivo a Modificar', 'Código Clave', 'Resultado Esperado'],
      rows: [
        ['Paso 1: Ruta', '`flota/urls.py`', `path('<int:pk>/', views.piloto_detalle, name='piloto_detalle')`, 'Django intercepta el ID numérico'],
        ['Paso 2: Vista', '`flota/views.py`', `piloto = get_object_or_404(Piloto, pk=pk)`, 'Recupera el piloto o lanza 404 si no existe'],
        ['Paso 3: Template', '`templates/piloto_detalle.html`', `<h1>{{ piloto.nombre }}</h1> - {{ piloto.licencia }}`, 'Renderiza los datos dentro de base.html']
      ]
    },
    keyTakeaway: 'Sigue siempre este orden mental: 1° URLs (puerta de entrada), 2° Vistas (procesamiento), 3° Templates (presentación).'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'Los 4 Errores Clásicos que Frenan a los Principiantes',
    badge: 'Guía de Debugging',
    content: 'Aprende a reconocer de inmediato qué significa cada mensaje de error en la pantalla de depuración:',
    visualChart: {
      headers: ['Error en Pantalla', 'Causa Real en tu Código', 'Cómo Solucionarlo al Instante'],
      rows: [
        ['`TemplateDoesNotExist`', 'El nombre del archivo o carpeta HTML está mal escrito o falta en TEMPLATES', 'Revisa la ruta dentro de templates/ y confirma que la app esté en INSTALLED_APPS'],
        ['`NoReverseMatch`', 'El nombre en {% url "app:name" %} no existe en urls.py o faltan argumentos', 'Revisa el name en path() y asegúrate de pasar los argumentos requeridos (ej: id)'],
        ['`403 Forbidden (CSRF)`', 'Olvidaste incluir {% csrf_token %} dentro de una etiqueta <form method="post">', 'Añade {% csrf_token %} inmediatamente debajo de la apertura de <form>'],
        ['`Page not found (404)`', 'La URL tipeada en el navegador no coincide con ninguna regla de urlpatterns', 'Revisa las barras finales (trailing slash) y los convertidores de tipo']
      ]
    },
    keyTakeaway: 'La pantalla amarilla de Django con DEBUG=True te dice exactamente el número de línea y archivo del error. ¡Léela con calma!'
  },
  {
    id: 4,
    type: 'code',
    title: 'Caso de Estudio: Resolviendo un NoReverseMatch',
    badge: 'Caso Clínico #1',
    content: 'Este es el error que más horas hace perder a los desarrolladores novatos:',
    codeSnippet: {
      filename: 'error_noreversematch.html',
      lang: 'html',
      code: `<!-- ❌ ERROR TÍPICO: Se llamó a una URL que exige un parámetro sin pasárselo -->
<!-- Provoca: Reverse for 'detalle' with no arguments not found. -->
<a href="{% url 'blog:detalle' %}">Ver post</a>

<!-- ✅ SOLUCIÓN: Pasar el argumento requerido (id o slug) -->
<a href="{% url 'blog:detalle' post.id %}">Ver post</a>

<!-- Si la ruta tiene namespace en urls.py (app_name = 'blog'), DEBES incluir el prefijo: -->
<!-- {% url 'blog:detalle' post.id %} (Correcto) -->
<!-- {% url 'detalle' post.id %} (Falla con NoReverseMatch si hay app_name) -->`,
      explanation: 'NoReverseMatch significa: "Me pediste generar la URL para esta vista, pero no encuentro la regla o faltan argumentos requeridos".'
    },
    keyTakeaway: 'Si tu ruta en urls.py define <int:id>, tu etiqueta {% url %} debe recibir obligatoriamente ese identificador.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Caso de Estudio: El Token CSRF en Formularios POST',
    badge: 'Caso Clínico #2',
    content: 'Cualquier formulario que modifique datos en el servidor mediante POST debe incluir el token de seguridad:',
    codeSnippet: {
      filename: 'formulario_seguro.html',
      lang: 'html',
      code: `<!-- Formulario de creación con protección CSRF obligatoria de Django -->
<form method="POST" action="{% url 'flota:crear_vehiculo' %}">
    <!-- 🛡️ SIN ESTA ETIQUETA, DJANGO ARROJA ERROR 403 FORBIDDEN: -->
    {% csrf_token %}

    <div class="campo">
        <label for="id_patente">Patente:</label>
        <input type="text" name="patente" id="id_patente" required>
    </div>

    <button type="submit">Registrar Vehículo</button>
</form>`,
      explanation: '{% csrf_token %} genera un input hidden con un valor criptográfico único por sesión para evitar que sitios externos envíen peticiones maliciosas a tu cuenta.'
    },
    keyTakeaway: 'Formulario con method="POST" siempre lleva {% csrf_token %}. Sin excepciones.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen del Módulo 4: Arquitectura Completa Dominada',
    badge: 'Hito Profesional',
    content: 'Has completado el núcleo conceptual y práctico más importante de Django:',
    bulletPoints: [
      '✅ Construyes y conectas rutas, vistas y plantillas sin dudar.',
      '✅ Utilizas convertidores de tipo para proteger tus parámetros de URL.',
      '✅ Dominas el flujo del objeto request y las respuestas render/redirect.',
      '✅ Previenes código duplicado mediante herencia de plantillas en base.html.',
      '✅ Diagnosticas con soltura errores de NoReverseMatch, CSRF y 404.'
    ],
    keyTakeaway: '¡Excelente trabajo! Con la arquitectura clara, en el Módulo 5 nos sumergiremos en las Bases de Datos, Modelos y el ORM.'
  }
];
