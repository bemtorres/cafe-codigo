import type { Slide } from '../../../types/slides';

export const apiSeguridadTokenSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '12. API Seguridad y AUTH TOKEN en Django REST Framework 🔐🔑',
    subtitle: 'CURSO DJANGO 31 · rest_framework.authtoken, viewsLogin.py e IsAuthenticated',
    badge: 'Django · Módulo 12',
    content: 'Aprende a proteger los endpoints de tu API REST exigiendo autenticación por Token. Configuraremos authtoken en settings.py, crearemos el endpoint de login que valida contraseñas con check_password y protegeremos las vistas con @permission_classes((IsAuthenticated,)).',
    bulletPoints: [
      '⚙️ Paso 1: Activar rest_framework.authtoken en INSTALLED_APPS, TokenAuthentication y migrate',
      '🔑 Paso 2: Crear rest_api/viewsLogin.py con check_password y Token.objects.get_or_create(user=user)',
      '🛡️ Paso 3: Blindar lista_libros y vista_libro con @permission_classes((IsAuthenticated,))',
      '🧪 Paso 4: Enviar el encabezado Authorization: Token <clave> en Postman o Thunder Client'
    ],
    keyTakeaway: 'La autenticación por Token permite que aplicaciones móviles, frontends o clientes HTTP consuman tu API de forma segura sin depender de cookies de navegador.'
  },
  {
    id: 2,
    type: 'code',
    title: '1. Paso 1: Configurar authtoken en settings.py y Migrar',
    badge: 'Paso 1 · settings.py & migrate',
    content: 'Agregamos rest_framework.authtoken a INSTALLED_APPS, declaramos TokenAuthentication como esquema por defecto y ejecutamos migrate para crear la tabla de tokens:',
    bulletPoints: [
      '"rest_framework.authtoken" crea la tabla authtoken_token que asocia un Token único a cada User',
      'DEFAULT_AUTHENTICATION_CLASSES indica a DRF que busque tokens en el header Authorization',
      'Es obligatorio ejecutar python manage.py migrate tras agregar authtoken a INSTALLED_APPS'
    ],
    codeSnippet: {
      filename: 'settings.py y Terminal',
      lang: 'python',
      code: `# 1. En settings.py:
INSTALLED_APPS = [
    # ... otras apps ...
    'core',
    'rest_framework',
    'rest_api',
    'rest_framework.authtoken',  # 👈 Habilita la tabla de Tokens
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# ---------------------------------------------------------
# 2. En la terminal:
# python manage.py migrate`,
      explanation: 'Al ejecutar migrate se crea la tabla donde se guardarán las llaves hexadecimales de 40 caracteres de cada usuario.'
    },
    keyTakeaway: 'Si olvidas ejecutar python manage.py migrate después de añadir authtoken, Django lanzará OperationalError: no such table: authtoken_token.'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Paso 2: Crear la Vista de Login (rest_api/viewsLogin.py)',
    badge: 'Paso 2 · viewsLogin.py',
    content: 'Creamos rest_api/viewsLogin.py para que el usuario envíe su username y password por POST y reciba su Token de acceso:',
    bulletPoints: [
      'Buscamos el usuario con User.objects.get(username=username); si no existe devolvemos "Usuario inválido"',
      'Comparamos la contraseña enviada con el hash de la base de datos usando check_password(password, user.password)',
      'Si es válida, generamos o recuperamos su token con token, created = Token.objects.get_or_create(user=user)',
      'Devolvemos la cadena del token con return Response(token.key)'
    ],
    codeSnippet: {
      filename: 'rest_api/viewsLogin.py',
      lang: 'python',
      code: `from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def login(request):
    data = JSONParser().parse(request)
    username = data['username']
    password = data['password']

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response("Usuario inválido")

    pass_valido = check_password(password, user.password)
    if not pass_valido:
        return Response("Password incorrecta")

    token, created = Token.objects.get_or_create(user=user)
    return Response(token.key)`,
      explanation: 'Token.objects.get_or_create(user=user) crea el token la primera vez que el usuario hace login y reutiliza el mismo en futuros inicios de sesión.'
    },
    keyTakeaway: 'Nunca compares contraseñas con == en Django; usa siempre check_password(password_plana, user.password).'
  },
  {
    id: 4,
    type: 'code',
    title: '3. Paso 3: Proteger las Vistas con @permission_classes((IsAuthenticated,))',
    badge: 'Paso 3 · Blindaje de Vistas',
    content: 'En rest_api/views.py agregamos el decorador @permission_classes((IsAuthenticated,)) sobre lista_libros y vista_libro, y registramos la ruta login en rest_api/urls.py:',
    bulletPoints: [
      'Importamos permission_classes de rest_framework.decorators e IsAuthenticated de rest_framework.permissions',
      'Colocamos @permission_classes((IsAuthenticated,)) debajo de @api_view en cada vista que deseamos proteger',
      'En rest_api/urls.py importamos login desde .viewsLogin y agregamos path("login", login, name="login")'
    ],
    codeSnippet: {
      filename: 'rest_api/views.py y rest_api/urls.py',
      lang: 'python',
      code: `# En rest_api/views.py:
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def lista_libros(request):
    # ... código de GET y POST ...

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def vista_libro(request, id):
    # ... código de SHOW, PUT y DELETE ...

# ---------------------------------------------------------
# En rest_api/urls.py:
from django.urls import path
from .views import lista_libros, vista_libro
from .viewsLogin import login

urlpatterns = [
    path('libros/', lista_libros, name='lista_libros'),
    path('libro/<id>', vista_libro, name='vista_libro'),
    path('login', login, name='login'),
]`,
      explanation: 'A partir de este momento, cualquier petición a /api/libros/ o /api/libro/<id> sin token válido será rechazada automáticamente.'
    },
    keyTakeaway: 'Observa la coma final dentro de la tupla en @permission_classes((IsAuthenticated,)) para que Python la reconozca como tupla.'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Paso 4: Cómo Usar el Token en Postman o Thunder Client 🧪',
    badge: 'Paso 4 · Headers HTTP',
    content: 'Para consumir los endpoints protegidos seguimos un flujo de 2 pasos en Postman o Thunder Client:',
    bulletPoints: [
      '1º Enviamos POST a /api/login con {"username": "admin", "password": "..."} para obtener el token',
      '2º En la petición a /api/libros/ abrimos la pestaña Headers y agregamos la clave Authorization',
      'El valor del header debe escribirse como: Token <tu_token_de_40_caracteres>',
      'Si no se envía el header o el token es inválido, la API responde 401 Unauthorized'
    ],
    codeSnippet: {
      filename: 'Pruebas en Postman / Thunder Client',
      lang: 'text',
      code: `# PASO A: Obtener el token con POST http://127.0.0.1:8000/api/login
# Body (raw -> JSON):
{
  "username": "admin",
  "password": "tu_password_123"
}
# Respuesta (200 OK):
"9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"

# -------------------------------------------------------------------
# PASO B: Consultar GET http://127.0.0.1:8000/api/libros/
# Pestaña Headers:
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`,
      explanation: 'El prefijo "Token " (con espacio antes de la clave) le indica a TokenAuthentication de DRF cómo validar la credencial.'
    },
    keyTakeaway: '¡Listo! Con TokenAuthentication e IsAuthenticated tu API REST está completamente protegida para producción.'
  }
];
