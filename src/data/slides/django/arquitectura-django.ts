import type { Slide } from '../../../types/slides';

export const arquitecturaDjangoSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '4. Arquitectura MVT: El Motor Interno de Django 🏛️',
    subtitle: 'Model - View - Template: Cómo procesa Django cada petición HTTP desde el navegador hasta la respuesta',
    badge: 'Django · Lección 4',
    content: 'Comprende el patrón arquitectónico MVT (Modelo - Vista - Template) de Django, su comparación con el clásico MVC y el viaje completo de una petición web paso a paso.',
    bulletPoints: [
      '🧠 MVT vs MVC: ¿Por qué Django llama "Vista" al Controlador?',
      '🔄 El viaje de una petición: Navegador → URLs → Views → Models/Templates → HttpResponse',
      '🧱 Modelo (Model): El guardián de los datos y las reglas del negocio',
      '⚡ Vista (View): El cerebro operativo que coordina y toma decisiones',
      '🎨 Plantilla (Template): La interfaz visual que recibe y renderiza los datos'
    ],
    keyTakeaway: 'Dominar la arquitectura MVT te permite saber con exactitud en qué archivo escribir cada línea de tu aplicación.'
  },
  {
    id: 2,
    type: 'comparison',
    title: 'La Gran Confusión: ¿MVT o MVC? Tabla Equivalente',
    badge: 'MVT vs MVC',
    content: 'Muchos desarrolladores que vienen de Spring Boot, Laravel o Rails se confunden con los nombres. Esta tabla aclara el mapa mental:',
    visualChart: {
      headers: ['Concepto Clásico (MVC)', 'Equivalente en Django (MVT)', 'Archivo Típico', 'Responsabilidad'],
      rows: [
        ['Modelo (Model)', 'Modelo (Model)', '`models.py`', 'Estructura de tablas, validaciones e integridad de base de datos'],
        ['Controlador (Controller)', 'Vista (View)', '`views.py`', 'Recibe la petición, consulta al modelo y decide qué respuesta enviar'],
        ['Vista (View)', 'Plantilla (Template)', '`templates/*.html`', 'Presentación visual HTML donde se muestran los datos al usuario'],
        ['Enrutador (Router)', 'URL Dispatcher', '`urls.py`', 'Asocia la URL tecleada por el usuario con la función o clase en views.py']
      ]
    },
    keyTakeaway: 'En Django: El Controlador se llama "View" y la Vista visual se llama "Template". ¡El framework mismo es el controlador central!'
  },
  {
    id: 3,
    type: 'diagram',
    title: 'El Ciclo de Vida de una Petición HTTP en Django (Paso a Paso)',
    badge: 'Flujo de Ejecución',
    content: 'Cuando un usuario ingresa a https://misitio.com/articulos/5/, ocurren exactamente 5 pasos sincronizados:',
    bulletPoints: [
      '1. Entrada: El servidor web recibe la petición y crea el objeto "request" (HttpRequest).',
      '2. Enrutamiento (urls.py): Django busca una coincidencia con la URL y extrae los parámetros (ej: id=5).',
      '3. Procesamiento (views.py): La función de la vista se activa y ejecuta la lógica de negocio.',
      '4. Datos (models.py): Si necesita datos, la vista le pide al ORM: Articulo.objects.get(id=5).',
      '5. Salida (templates o JSON): La vista fusiona los datos con la plantilla HTML y devuelve un "HttpResponse".'
    ],
    keyTakeaway: 'La Vista es el árbitro: nunca pone HTML directamente en código ni escribe consultas SQL directas; coordina al Modelo y a la Plantilla.'
  },
  {
    id: 4,
    type: 'code',
    title: 'El Trío MVT en Acción: Un Ejemplo Real y Sencillo',
    badge: 'Código MVT',
    content: 'Observa cómo los tres elementos cooperan de manera limpia y desacoplada:',
    codeSnippet: {
      filename: 'triangulo_mvt.py',
      lang: 'python',
      code: `# 1. EL MODELO (models.py): Define qué datos existen
class Libro(models.Model):
    titulo = models.CharField(max_length=150)
    precio = models.DecimalField(max_digits=6, decimal_places=2)

# 2. LA VISTA (views.py): Coordina y pide los datos
from django.shortcuts import render, get_object_or_404

def detalle_libro(request, libro_id):
    # Consulta la base de datos a través del modelo
    libro = get_object_or_404(Libro, id=libro_id)
    # Entrega los datos al Template mediante un "contexto"
    return render(request, 'biblioteca/detalle.html', {'libro': libro})

# 3. EL TEMPLATE (detalle.html): Pinta los datos en el navegador
# <h1>{{ libro.titulo }}</h1>
# <p>Precio de lista: \${{ libro.precio }}</p>`,
      explanation: 'El diccionario {"libro": libro} es el "Contexto" que conecta el mundo Python de la vista con las variables del HTML.'
    },
    keyTakeaway: 'Separación de responsabilidades: si cambia el diseño, solo tocas el template; si cambia la base de datos, solo tocas el modelo.'
  },
  {
    id: 5,
    type: 'concept',
    title: '¿Qué es el Contexto (Context Dictionary)?',
    badge: 'Concepto Clave',
    content: 'El contexto es el "maletín" con el que la vista le pasa datos a la plantilla HTML.',
    bulletPoints: [
      'Es un simple diccionario de Python: {"clave": valor}.',
      'La clave se convierte en una variable utilizable en el HTML dentro de llaves dobles: {{ clave }}.',
      'Puedes pasar objetos enteros, listas de QuerySets, números, textos o booleanos.',
      'Ejemplo: {"articulos": Articulo.objects.all(), "usuario": request.user, "total": 42}'
    ],
    keyTakeaway: 'Cualquier dato que quieras mostrar en la pantalla del usuario debe viajar dentro del diccionario de contexto de la vista.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de la Lección: El Mapa Mental de Django',
    badge: 'Síntesis MVT',
    content: 'Ahora posees la visión panorámica de la arquitectura de Django:',
    bulletPoints: [
      '✅ Entiendes el patrón MVT y su correspondencia con MVC.',
      '✅ Conoces el camino exacto: URL → Vista → Modelo → Template → Respuesta.',
      '✅ Sabes que la Vista es el cerebro coordinador que recibe el HttpRequest.',
      '✅ Dominas el concepto de Contexto como puente de datos entre Python y HTML.'
    ],
    keyTakeaway: 'En los siguientes 4 submódulos desglosaremos cada pieza: 4.1 URLs, 4.2 Views, 4.3 Templates y 4.4 Ejercicios prácticos.'
  }
];
