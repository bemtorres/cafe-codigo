import type { Slide } from '../../../types/slides';

export const apisRestfulSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '8. APIs RESTful con Django: Comunicación JSON 🌐',
    subtitle: 'Principios REST, verbos HTTP, códigos de estado, JsonResponse y serialización',
    badge: 'Django · Lección 8',
    content: 'Aprende a construir endpoints de API REST en Django para comunicar tu backend con aplicaciones móviles (Flutter, React Native) o interfaces modernas de frontend (React, Vue, Astro).',
    bulletPoints: [
      '🔌 ¿Qué es una API REST?: Recursos, URIs y arquitectura sin estado (Stateless)',
      '🚦 Verbos HTTP semánticos: GET, POST, PUT, PATCH y DELETE',
      '🔢 Códigos de estado HTTP indispensables (200, 201, 204, 400, 401, 404)',
      '📦 Respuestas JSON en Django nativo con JsonResponse',
      '⚠️ ¿Por qué Django puro se queda corto y necesitamos Django REST Framework?'
    ],
    keyTakeaway: 'Una API REST transforma a Django en un motor de datos puro que sirve información en JSON a cualquier cliente del mundo.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Los 4 Pilares de una API RESTful Profesional',
    badge: 'Fundamentos REST',
    content: 'Una API bien diseñada respeta convenciones estándar de la industria que la hacen intuitiva:',
    visualChart: {
      headers: ['Pilar REST', '¿En qué consiste?', 'Ejemplo Práctico'],
      rows: [
        ['1. Orientada a Recursos', 'Las URLs representan cosas o colecciones en plural (sustantivos, no verbos)', '`/api/vehiculos/` en vez de `/api/obtenerVehiculos`'],
        ['2. Verbos HTTP Semánticos', 'La acción que deseas realizar la define el método HTTP, no la URL', '`DELETE /api/vehiculos/4/` en vez de `/api/borrar_vehiculo_4`'],
        ['3. Sin Estado (Stateless)', 'Cada petición debe contener toda la información para ser procesada', 'El cliente envía su token en los headers de cada llamada'],
        ['4. Formato Estándar (JSON)', 'El intercambio de datos se realiza en JavaScript Object Notation', '`{"patente": "FL-204-CL", "estado": "DISPONIBLE"}`']
      ]
    },
    keyTakeaway: 'Usa sustantivos para las URLs y verbos HTTP para las acciones. Simple, limpio y estándar.'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'La Tabla de Códigos de Estado HTTP que Debes Memorizar',
    badge: 'Códigos de Estado',
    content: 'El código de respuesta le dice al frontend qué ocurrió con su petición sin tener que adivinar:',
    visualChart: {
      headers: ['Código', 'Significado', '¿Cuándo devolverlo?', 'Ejemplo'],
      rows: [
        ['`200 OK`', 'Éxito total', 'Peticiones GET exitosas o actualizaciones completas', 'Devolver la lista de vehículos'],
        ['`201 Created`', 'Recurso creado', 'Tras guardar con éxito un nuevo registro mediante POST', 'Vehículo nuevo dado de alta'],
        ['`204 No Content`', 'Éxito sin cuerpo', 'Tras eliminar un recurso con DELETE', 'Vehículo eliminado con éxito'],
        ['`400 Bad Request`', 'Datos inválidos', 'El cliente envió JSON mal formado o campos faltantes', 'Patente inválida o precio negativo'],
        ['`401 Unauthorized`', 'Falta autenticación', 'No envió credenciales o el token expiró', 'Acceso a ruta privada sin token'],
        ['`404 Not Found`', 'No encontrado', 'El recurso solicitado no existe en la base de datos', 'Vehículo con ID 9999 no existe']
      ]
    },
    keyTakeaway: 'Nunca devuelvas 200 OK con un cuerpo que diga {"error": true}. ¡Usa siempre los códigos HTTP correspondientes!'
  },
  {
    id: 4,
    type: 'code',
    title: 'Construyendo un Endpoint Nativo con JsonResponse',
    badge: 'Django Nativo',
    content: 'Así se implementa una API REST simple en Django sin necesidad de librerías externas:',
    codeSnippet: {
      filename: 'flota/views_api.py',
      lang: 'python',
      code: `from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from .models import Vehiculo
import json

# Endpoint GET: Listar vehículos en JSON
def api_lista_vehiculos(request):
    # .values() serializa directamente el QuerySet a diccionarios de Python
    datos = list(Vehiculo.objects.values('id', 'patente', 'marca', 'modelo', 'estado'))
    return JsonResponse({'total': len(datos), 'vehiculos': datos}, safe=False)

# Endpoint POST: Crear vehículo desde JSON
@require_http_methods(["POST"])
def api_crear_vehiculo(request):
    try:
        payload = json.loads(request.body)
        nuevo = Vehiculo.objects.create(
            patente=payload['patente'],
            marca=payload['marca'],
            modelo=payload['modelo']
        )
        return JsonResponse({'mensaje': 'Creado con éxito', 'id': nuevo.id}, status=201)
    except (KeyError, json.JSONDecodeError):
        return HttpResponseBadRequest("JSON mal formado o campos obligatorios faltantes.")`,
      explanation: 'JsonResponse serializa automáticamente diccionarios y listas a texto JSON y fija el encabezado Content-Type: application/json.'
    },
    keyTakeaway: 'JsonResponse es perfecto para 1 o 2 endpoints sencillos, pero para APIs completas se vuelve tedioso validar todo a mano.'
  },
  {
    id: 5,
    type: 'comparison',
    title: 'El Límite de Django Nativo: ¿Por qué necesitamos DRF?',
    badge: 'La Necesidad de DRF',
    content: 'A medida que tu API crece, programar todo en Django puro produce código repetitivo y frágil:',
    visualChart: {
      headers: ['Requerimiento', 'Con Django Puro (Manual)', 'Con Django REST Framework (DRF)'],
      rows: [
        ['Serialización de Modelos', 'Escribir bucles manuales o .values() limitados', '`ModelSerializer` automático en 3 líneas'],
        ['Validación de Campos', 'Múltiples bloques if/else con json.loads', 'Validaciones automáticas idénticas al ORM'],
        ['Paginación y Filtros', 'Calcular offsets y páginas manualmente', 'Paginación lista con una sola variable de configuración'],
        ['Navegación Interactiva', 'Probar con Postman o cURL a ciegas', 'Browsable API: ¡Interfaz web interactiva para probar en el navegador!'],
        ['Autenticación', 'Cookies de sesión o tokens manuales', 'Soporte de JWT, OAuth2 y API Keys de serie']
      ]
    },
    keyTakeaway: 'Para construir APIs comerciales escalables, Django REST Framework (DRF) es la herramienta definitiva.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de la Lección: Tu Backend Listo para Conectar',
    badge: 'Logros Alcanzados',
    content: 'Ahora entiendes la arquitectura que alimenta a las apps modernas:',
    bulletPoints: [
      '✅ Comprendes los principios REST: URLs como recursos y métodos HTTP como acciones.',
      '✅ Dominas los códigos de estado HTTP (200, 201, 204, 400, 401, 404).',
      '✅ Creas endpoints con JsonResponse y procesas cuerpos en formato JSON.',
      '✅ Identificas por qué Django REST Framework es necesario para proyectos a gran escala.'
    ],
    keyTakeaway: 'En la lección 9 implementaremos Django REST Framework y autenticación con tokens JWT.'
  }
];
