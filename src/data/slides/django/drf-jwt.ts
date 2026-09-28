import type { Slide } from '../../../types/slides';

export const drfJwtSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9. Django REST Framework y JWT: APIs de Nivel Senior ⚡',
    subtitle: 'ModelSerializer, ViewSets, Routers y Autenticación con JSON Web Tokens (SimpleJWT)',
    badge: 'Django · Lección 9',
    content: 'Domina Django REST Framework (DRF), la librería estándar para construir APIs industriales en Python. Implementaremos serializadores automáticos, ViewSets con routers y autenticación segura con tokens JWT.',
    bulletPoints: [
      '📦 Serializadores de alto nivel: ModelSerializer y validaciones de campo',
      '🚀 ViewSets y DefaultRouter: Un CRUD de API completo en solo 5 líneas de código',
      '🔑 ¿Cómo funciona un JWT?: Estructura (Header.Payload.Signature) y ventajas',
      '🔄 Ciclo de vida: Access Token (vida corta) vs Refresh Token (renovación)',
      '🛡️ Protección de endpoints: IsAuthenticated y headers Authorization: Bearer'
    ],
    keyTakeaway: 'DRF convierte a Django en uno de los frameworks más productivos del mundo para construir APIs REST profesionales.'
  },
  {
    id: 2,
    type: 'concept',
    title: '¿Qué es un Serializador (ModelSerializer)? El Traductor Universal',
    badge: 'Concepto Clave DRF',
    content: 'Un serializador en DRF cumple dos misiones bidireccionales idénticas a un traductor diplomático:',
    visualChart: {
      headers: ['Dirección del Flujo', 'Nombre Técnico', '¿Qué ocurre?', 'Ejemplo en Código'],
      rows: [
        ['Python → JSON (Salida)', 'Serialización', 'Toma instancias complejas de modelos del ORM y las convierte a tipos primitivos que se exportan como JSON', '`serializer = VehiculoSerializer(vehiculo)`'],
        ['JSON → Python (Entrada)', 'Deserialización & Validación', 'Recibe JSON del cliente, valida los tipos de datos y restricciones del modelo y crea/actualiza registros', '`if serializer.is_valid(): serializer.save()`']
      ]
    },
    keyTakeaway: 'ModelSerializer replica las reglas de tu models.py (longitud, tipos, únicos) sin que tengas que repetir código.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Serializador y ViewSet: El CRUD Completo en Minutos',
    badge: 'Código DRF',
    content: 'Observa la asombrosa brevedad con la que se construye una API REST completa con DRF:',
    codeSnippet: {
      filename: 'flota/api.py',
      lang: 'python',
      code: `from rest_framework import serializers, viewsets
from .models import Vehiculo

# 1. EL SERIALIZADOR: Define qué campos viajarán en el JSON
class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = ['id', 'patente', 'marca', 'modelo', 'estado', 'kilometraje']

# 2. EL VIEWSET: Genera automáticamente las 5 operaciones CRUD:
# (GET lista, GET detalle, POST crear, PUT/PATCH editar, DELETE borrar)
class VehiculoViewSet(viewsets.ModelViewSet):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer`,
      explanation: 'ModelViewSet implementa de forma automática la paginación, filtros y los 5 métodos estándar de HTTP.'
    },
    keyTakeaway: 'Con solo estas dos clases tienes un CRUD de API completamente funcional listo para conectar a React o Flutter.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Enrutamiento Mágico con DefaultRouter',
    badge: 'Routers de DRF',
    content: 'Olvídate de escribir 5 líneas de path() para cada endpoint. El router genera las URLs REST estándar automáticamente:',
    codeSnippet: {
      filename: 'flota/urls_api.py',
      lang: 'python',
      code: `from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import VehiculoViewSet

# 1. Instanciamos el router
router = DefaultRouter()

# 2. Registramos el ViewSet con el prefijo deseado
router.register(r'vehiculos', VehiculoViewSet, basename='vehiculo')

# 3. Incluimos las URLs generadas:
urlpatterns = [
    path('api/', include(router.urls)),
]

# Rutas creadas automáticamente:
# GET    /api/vehiculos/      (Listar)
# POST   /api/vehiculos/      (Crear)
# GET    /api/vehiculos/{id}/ (Detalle)
# PUT    /api/vehiculos/{id}/ (Actualizar)
# DELETE /api/vehiculos/{id}/ (Eliminar)`,
      explanation: 'DefaultRouter además genera la interfaz interactiva "Browsable API" para probar las peticiones directamente desde el navegador.'
    },
    keyTakeaway: 'DefaultRouter garantiza que todas tus URLs sigan al 100% las convenciones RESTful estándar de la industria.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Autenticación JWT: ¿Por qué reemplazar a las cookies tradicionales?',
    badge: 'JSON Web Tokens',
    content: 'En aplicaciones móviles y SPAs (Single Page Applications), las sesiones basadas en cookies tienen problemas con CORS. JWT soluciona esto con tokens sin estado:',
    visualChart: {
      headers: ['Parte del Token', 'Nombre', '¿Qué contiene?', 'Seguridad'],
      rows: [
        ['1. Encabezado (Header)', 'Algoritmo y tipo', '`{"alg": "HS256", "typ": "JWT"}`', 'Base64 codificado'],
        ['2. Carga Útil (Payload)', 'Datos del usuario', '`{"user_id": 42, "username": "admin_flota", "exp": 1727500000}`', 'Legible pero NO alterable'],
        ['3. Firma (Signature)', 'Sello criptográfico', 'HMACSHA256(header + payload, SECRET_KEY)', '¡Si alguien altera el payload, la firma se invalida!']
      ]
    },
    keyTakeaway: 'El servidor no necesita guardar sesiones en base de datos; solo valida la firma criptográfica del token recibido.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Implementando SimpleJWT en Django',
    badge: 'djangorestframework-simplejwt',
    content: 'Así se configuran los endpoints de login y refresco de tokens en tu proyecto:',
    codeSnippet: {
      filename: 'config/urls.py',
      lang: 'python',
      code: `from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # 1. Endpoint para hacer login (Envías usuario/contraseña, recibes tokens):
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # 2. Endpoint para renovar el Access Token expirado usando el Refresh Token:
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# RESPUESTA DEL ENDPOINT /api/token/:
# {
#   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",   (Válido por 15 minutos)
#   "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  (Válido por 7 días)
# }

# EL CLIENTE (REACT/MÓVIL) LO ENVÍA EN CADA PETICIÓN:
# Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,
      explanation: 'El Access Token protege las peticiones regulares; el Refresh Token permite renovarlo sin obligar al usuario a escribir su contraseña cada 15 minutos.'
    },
    keyTakeaway: 'Usa Access Tokens de corta duración para minimizar riesgos si un token es interceptado en la red.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Tu API Lista para Clientes Modernos',
    badge: 'Habilidades Senior',
    content: 'Has aprendido a construir APIs con la suite más avanzada del ecosistema Python:',
    bulletPoints: [
      '✅ Creas serializadores automáticos con ModelSerializer.',
      '✅ Generas CRUDs completos en minutos con ModelViewSet y DefaultRouter.',
      '✅ Comprendes la estructura y ventajas de los tokens JWT.',
      '✅ Implementas el flujo de Access Token y Refresh Token con SimpleJWT.',
      '✅ Proteges endpoints para requerir usuarios autenticados.'
    ],
    keyTakeaway: 'En el Módulo 10 reuniremos todo lo aprendido en el Proyecto Integrador final con checklist de despliegue.'
  }
];
