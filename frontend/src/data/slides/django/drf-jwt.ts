import type { Slide } from '../../../types/slides';

export const drfJwtSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '11. Creando API REST en Django: [GET, POST] y [SHOW, PUT, DELETE] 📚⚡',
    subtitle: 'CURSO DJANGO 29 & 30 · ModelSerializer, lista_libros y vista_libro con JSONParser',
    badge: 'Django · Módulo 11',
    content: 'Aprende a construir un CRUD REST completo conectando el modelo Libro de tu base de datos con una aplicación rest_api mediante LibroSerializer, @api_view y códigos de estado HTTP semánticos.',
    bulletPoints: [
      '📦 Creación de la aplicación rest_api y definición de LibroSerializer (ModelSerializer)',
      '📥 Parte 1 (GET): Listar todos los libros con Libro.objects.all() y many=True',
      '📤 Parte 1 (POST): Crear libros con JSONParser().parse(request), is_valid() y HTTP_201_CREATED',
      '🔍 Parte 2 (SHOW / GET por ID): Buscar un libro por clave primaria o devolver HTTP_404_NOT_FOUND',
      '✏️🗑️ Parte 2 (PUT y DELETE): Actualizar un registro existente y eliminar con HTTP_204_NO_CONTENT'
    ],
    keyTakeaway: 'Con dos vistas (@api_view) y un ModelSerializer puedes exponer todas las operaciones CRUD de tu modelo Libro hacia cualquier cliente HTTP.'
  },
  {
    id: 2,
    type: 'code',
    title: '1. Crear la App rest_api y el Serializador (serializers.py)',
    badge: 'Configuración & Serializer',
    content: 'Registramos "rest_framework" y "rest_api" en INSTALLED_APPS y creamos rest_api/serializers.py para traducir nuestro modelo Libro a JSON y viceversa:',
    bulletPoints: [
      'ModelSerializer lee automáticamente los campos y tipos del modelo Libro definido en core/models.py',
      'fields = "__all__" incluye todas las columnas del modelo en el JSON',
      'También valida automáticamente que los datos recibidos en POST o PUT cumplan las reglas del modelo'
    ],
    codeSnippet: {
      filename: 'rest_api/serializers.py',
      lang: 'python',
      code: `from rest_framework import serializers
from core.models import Libro


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = '__all__'`,
      explanation: 'LibroSerializer actúa como puente bidireccional entre los objetos Libro del ORM y el formato JSON.'
    },
    keyTakeaway: 'ModelSerializer evita tener que escribir manualmente las validaciones y conversiones de cada campo del modelo.'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Parte 1: Vista lista_libros — Método GET y POST',
    badge: 'CURSO DJANGO 29 · GET & POST',
    content: 'En rest_api/views.py programamos lista_libros(request) decorada con @csrf_exempt y @api_view(["GET", "POST"]):',
    bulletPoints: [
      'En GET: consultamos Libro.objects.all() y pasamos many=True a LibroSerializer porque es una lista de objetos',
      'En POST: extraemos el JSON con data = JSONParser().parse(request) y lo pasamos a LibroSerializer(data=data)',
      'Si serializer.is_valid() es True, ejecutamos serializer.save() y devolvemos status.HTTP_201_CREATED',
      'Si hay errores de validación, devolvemos serializer.errors con status.HTTP_400_BAD_REQUEST'
    ],
    codeSnippet: {
      filename: 'rest_api/views.py — lista_libros',
      lang: 'python',
      code: `from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from core.models import Libro
from .serializers import LibroSerializer

@csrf_exempt
@api_view(['GET', 'POST'])
def lista_libros(request):
    if request.method == 'GET':
        libro = Libro.objects.all()
        serializer = LibroSerializer(libro, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LibroSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)`,
      explanation: 'many=True es obligatorio al serializar un QuerySet con múltiples registros; sin él, DRF intentaría leer un único objeto.'
    },
    keyTakeaway: 'En POST siempre debemos validar con if serializer.is_valid(): antes de invocar serializer.save().'
  },
  {
    id: 4,
    type: 'code',
    title: '3. Parte 2: Vista vista_libro — [SHOW, PUT y DELETE]',
    badge: 'CURSO DJANGO 30 · SHOW, PUT & DELETE',
    content: 'Para operar sobre un libro específico creamos vista_libro(request, id) que recibe la clave primaria o ISBN desde la URL:',
    bulletPoints: [
      'Primero buscamos el libro con Libro.objects.get(isbn=id); si lanza Libro.DoesNotExist respondemos HTTP_404_NOT_FOUND',
      'GET (SHOW): serializa ese único libro con LibroSerializer(libro) y retorna Response(serializer.data)',
      'PUT (Actualizar): pasa la instancia actual y los datos nuevos a LibroSerializer(libro, data=data) y guarda con .save()',
      'DELETE (Eliminar): borra el registro con libro.delete() y responde HTTP_204_NO_CONTENT'
    ],
    codeSnippet: {
      filename: 'rest_api/views.py — vista_libro(request, id)',
      lang: 'python',
      code: `@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def vista_libro(request, id):
    try:
        libro = Libro.objects.get(isbn=id)
    except Libro.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LibroSerializer(libro)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = LibroSerializer(libro, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        libro.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)`,
      explanation: 'Al pasar (libro, data=data) en PUT, el serializador sabe que debe hacer un UPDATE sobre ese libro en lugar de crear uno nuevo.'
    },
    keyTakeaway: 'Capturar Libro.DoesNotExist y responder 404 evita que un ID inexistente provoque un Error 500 en el servidor.'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Conectar las Rutas en rest_api/urls.py',
    badge: 'Enrutamiento REST',
    content: 'Registramos las rutas libros/ y libro/<id> en rest_api/urls.py y las incluimos bajo el prefijo api/ en el urls.py principal:',
    bulletPoints: [
      '/api/libros/ atiende GET (listar todos) y POST (crear nuevo libro)',
      '/api/libro/<id> atiende GET (mostrar detalle), PUT (actualizar) y DELETE (eliminar)'
    ],
    codeSnippet: {
      filename: 'rest_api/urls.py y urls.py principal',
      lang: 'python',
      code: `# 1. Archivo: rest_api/urls.py
from django.urls import path
from .views import lista_libros, vista_libro

urlpatterns = [
    path('libros/', lista_libros, name='lista_libros'),
    path('libro/<id>', vista_libro, name='vista_libro'),
]

# ---------------------------------------------------------
# 2. Archivo: urls.py (Proyecto Principal)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('api/', include('rest_api.urls')),
]`,
      explanation: 'Con solo dos rutas en urlpatterns cubrimos las 5 operaciones del estándar REST.'
    },
    keyTakeaway: 'En el Módulo 12 aprenderemos a proteger estas dos rutas utilizando Seguridad por Token (rest_framework.authtoken).'
  },
  {
    id: 6,
    type: 'summary',
    title: '5. Resumen: Las 5 Operaciones del CRUD en Django REST Framework 🏆',
    badge: 'Síntesis del Módulo 11',
    content: 'Repasa cómo se conectan los métodos HTTP, el serializador y los códigos de estado:',
    bulletPoints: [
      '✅ 1. GET /api/libros/ -> LibroSerializer(libro, many=True) -> 200 OK.',
      '✅ 2. POST /api/libros/ -> LibroSerializer(data=data) + .save() -> 201 CREATED (o 400 BAD REQUEST).',
      '✅ 3. GET /api/libro/<id> (SHOW) -> LibroSerializer(libro) -> 200 OK (o 404 NOT FOUND).',
      '✅ 4. PUT /api/libro/<id> -> LibroSerializer(libro, data=data) + .save() -> 200 OK (o 400 / 404).',
      '✅ 5. DELETE /api/libro/<id> -> libro.delete() -> 204 NO CONTENT.'
    ],
    keyTakeaway: '¡Continúa ahora con el Módulo 12 para proteger tus endpoints con API Seguridad y AUTH TOKEN!'
  }
];
