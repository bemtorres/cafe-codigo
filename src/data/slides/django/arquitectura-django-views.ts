import type { Slide } from '../../../types/slides';

export const arquitecturaDjangoViewsSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '4.2 Vistas en Django: El Cerebro Operativo 🧠',
    subtitle: 'HttpRequest, render, redirect, get_object_or_404 y la comparativa FBV vs CBV',
    badge: 'Django · Lección 4.2',
    content: 'Descubre cómo las vistas reciben peticiones del usuario, ejecutan reglas de negocio, consultan la base de datos y devuelven respuestas HTTP adecuadas (HTML, JSON o redirecciones).',
    bulletPoints: [
      '📥 El objeto HttpRequest: La radiografía completa de la petición del cliente',
      '📤 Tipos de respuesta: render(), redirect(), JsonResponse y HttpResponse',
      '🛡️ get_object_or_404: Cómo evitar que tu servidor caiga con un error 500',
      '⚖️ FBV vs CBV: Cuándo usar funciones simples y cuándo clases genéricas'
    ],
    keyTakeaway: 'Una vista en Django siempre recibe un HttpRequest como primer argumento y debe retornar obligatoriamente un HttpResponse.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'El Objeto HttpRequest: ¿Qué información viaja en cada clic?',
    badge: 'Inspección de Petición',
    content: 'Cada vez que una vista se ejecuta, Django le inyecta un objeto "request" con todos los datos que envió el navegador:',
    visualChart: {
      headers: ['Atributo del request', 'Tipo', '¿Para qué se usa?', 'Ejemplo Real'],
      rows: [
        ['`request.method`', '`str`', 'Indica el verbo HTTP usado por el cliente', `'GET', 'POST', 'PUT', 'DELETE'`],
        ['`request.GET`', '`QueryDict`', 'Parámetros que viajan en la URL tras el signo ?', `request.GET.get('busqueda')`],
        ['`request.POST`', '`QueryDict`', 'Datos enviados en el cuerpo de un formulario HTML', `request.POST.get('email')`],
        ['`request.user`', '`User`', 'El usuario actual (o AnonymousUser si no está logueado)', `if request.user.is_authenticated:`],
        ['`request.FILES`', '`MultiValueDict`', 'Archivos, fotos o documentos subidos por el usuario', `request.FILES.get('avatar')`]
      ]
    },
    keyTakeaway: 'El objeto request es la única fuente de verdad sobre quién es el usuario y qué está pidiendo.'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'El Abanico de Respuestas HTTP en Django',
    badge: 'Tipos de Retorno',
    content: 'Una vista nunca retorna strings ni números sueltos; siempre retorna un objeto de respuesta HTTP:',
    visualChart: {
      headers: ['Función de Respuesta', '¿Qué devuelve al navegador?', 'Caso Típico de Uso'],
      rows: [
        ['`render(request, template, ctx)`', 'Página web completa en formato HTML', 'Mostrar el catálogo, un perfil o una ficha'],
        ['`redirect(to, *args, **kwargs)`', 'Instrucción HTTP 302 para que el navegador vaya a otra URL', 'Tras procesar con éxito un formulario POST'],
        ['`JsonResponse(data, safe=True)`', 'Carga útil en formato application/json con código 200', 'Endpoints de API REST o respuestas para JavaScript'],
        ['`HttpResponse("texto plano")`', 'Contenido crudo con control de headers HTTP', 'Descarga de CSVs, PDFs generados o pruebas'],
        ['`Http404("Mensaje")`', 'Lanza una excepción que Django traduce a código 404', 'Cuando el registro pedido no existe']
      ]
    },
    keyTakeaway: 'El 90% de tus vistas tradicionales usarán render() para mostrar páginas y redirect() tras guardar formularios.'
  },
  {
    id: 4,
    type: 'code',
    title: 'El Salvador del Desarrollador: get_object_or_404',
    badge: 'Manejo de Errores',
    content: 'Observa la diferencia entre escribir código novato con riesgo de Server Error 500 y código profesional limpio:',
    codeSnippet: {
      filename: 'vistas_seguras.py',
      lang: 'python',
      code: `from django.shortcuts import render, get_object_or_404
from .models import Producto

# ❌ FORMA PELIGROSA: Si el producto no existe, la app arroja DoesNotExist (Error 500 en producción)
def producto_peligroso(request, pk):
    item = Producto.objects.get(id=pk)  # 💥 Explota si pk no existe
    return render(request, 'detalle.html', {'producto': item})

# ✅ FORMA PROFESIONAL: get_object_or_404 atrapa el error y responde un HTTP 404 limpio
def producto_profesional(request, pk):
    item = get_object_or_404(Producto, id=pk, activo=True)
    return render(request, 'detalle.html', {'producto': item})`,
      explanation: 'get_object_or_404 ahorra bloques try/except repetitivos y garantiza que el cliente reciba un código HTTP 404 estándar.'
    },
    keyTakeaway: 'Siempre que busques un registro por ID para mostrarlo en pantalla, usa get_object_or_404.'
  },
  {
    id: 5,
    type: 'comparison',
    title: 'FBV (Vistas Basadas en Funciones) vs CBV (Vistas Basadas en Clases)',
    badge: 'Arquitectura de Vistas',
    content: 'Django te permite escribir vistas como funciones simples o como clases que heredan comportamiento:',
    visualChart: {
      headers: ['Criterio', 'FBV (Function-Based Views)', 'CBV (Class-Based Views)'],
      rows: [
        ['Curva de Aprendizaje', 'Muy fácil, lógica explícita paso a paso', 'Moderada, requiere conocer el ciclo de la clase'],
        ['Legibilidad', 'Excelente para principiantes y flujos complejos', 'Compacta para operaciones CRUD estándar'],
        ['Reutilización', 'Manual o con decoradores', 'Alta mediante herencia y Mixins'],
        ['¿Cuándo usarla?', 'Procesos con lógica customizada, APIs rápidas', 'Listados paginados (ListView), fichas (DetailView), CRUDs']
      ]
    },
    keyTakeaway: 'Aprende primero FBV para entender el flujo sin magia; luego adopta CBV para no repetir código en CRUDs típicos.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Comparativa en Código: La misma pantalla en FBV vs CBV',
    badge: 'Código Frente a Frente',
    content: 'Observa cómo ambas implementaciones resuelven el listado paginado de un modelo:',
    codeSnippet: {
      filename: 'catalogo/views.py',
      lang: 'python',
      code: `# OPCIÓN A: Como Función (FBV) - Todo explícito:
def lista_productos_fbv(request):
    productos = Producto.objects.filter(activo=True).order_by('-fecha')
    return render(request, 'catalogo/lista.html', {'productos': productos})

# OPCIÓN B: Como Clase Genérica (CBV) - Django hace el trabajo pesado:
from django.views.generic import ListView

class ListaProductosCBV(ListView):
    model = Producto
    template_name = 'catalogo/lista.html'
    context_object_name = 'productos'
    paginate_by = 12

    def get_queryset(self):
        return Producto.objects.filter(activo=True).order_by('-fecha')`,
      explanation: 'ListView incluye paginación automática, nombres de contexto configurables y templates reutilizables.'
    },
    keyTakeaway: 'Elige la herramienta adecuada: FBVs para lógica personalizada; CBVs para operaciones de catálogo y CRUD estándar.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: El Control Total de la Vista',
    badge: 'Conocimientos Consolidados',
    content: 'Ahora controlas el punto neurálgico donde se toman todas las decisiones en una aplicación Django:',
    bulletPoints: [
      '✅ Extraes parámetros del objeto HttpRequest (GET, POST, user, FILES).',
      '✅ Manejas las respuestas estándar: render, redirect, JsonResponse.',
      '✅ Proteges la estabilidad de tu servidor con get_object_or_404.',
      '✅ Comprendes el debate FBV vs CBV y sabes cuándo aplicar cada enfoque.'
    ],
    keyTakeaway: 'En la lección 4.3 dominaremos los Templates y el lenguaje DTL para diseñar pantallas espectaculares con estos datos.'
  }
];
