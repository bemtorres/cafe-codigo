import type { Slide } from '../../../types/slides';

export const consumiendoApiRestSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9. Consumiendo API REST con requests en Django 🌍',
    subtitle: 'Integración de la API del Tiempo (Open-Meteo), Rick and Morty API y PokéAPI',
    badge: 'Django · Módulo 9',
    content: 'Aprende a convertir tu backend Django en un cliente HTTP capaz de consultar servicios externos reales utilizando la librería requests, transformar respuestas JSON y entregar endpoints limpios.',
    bulletPoints: [
      '📦 Instalación y flujo de la librería requests en entornos Django (pip install requests)',
      '🌦️ Ejemplo 1: API del Tiempo (Open-Meteo) pasando coordenadas con params={...}',
      '👽 Ejemplo 2: API de Rick and Morty consultando personajes por ID y diccionarios anidados',
      '⚡ Ejemplo 3: API de Pokémon (PokéAPI) transformando listas de tipos, habilidades y unidades',
      '🛡️ Buenas prácticas de producción: timeout=5, status_code y bloques try / except RequestException'
    ],
    keyTakeaway: 'Con la librería requests tu servidor Django puede conectarse con cualquier API del mundo (clima, pagos, mapas, IA o catálogos) y servir los datos procesados.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. ¿Cómo consume Django una API Externa con requests?',
    badge: 'Arquitectura Cliente HTTP',
    content: 'Cuando un usuario consulta tu endpoint de Django, tu vista puede salir a internet usando requests.get(), obtener datos de otro servidor, limpiarlos y devolver solo la información relevante:',
    visualChart: {
      headers: ['Paso del Flujo', 'Código en Python / Django', '¿Qué hace exactamente?'],
      rows: [
        ['1. Instalar librería', '`pip install requests`', 'Descarga la librería cliente HTTP estándar de Python en tu entorno virtual'],
        ['2. Hacer petición GET', '`res = requests.get(url, params=..., timeout=5)`', 'Solicita los datos al servidor externo esperando máximo 5 segundos'],
        ['3. Convertir a Diccionario', '`datos = res.json()`', 'Transforma el texto JSON recibido en un diccionario o lista de Python'],
        ['4. Responder en DRF', '`return Response({"nombre": datos.get("name")})`', 'Entrega al cliente un JSON limpio, en español y con solo los campos necesarios']
      ]
    },
    keyTakeaway: 'Incluye siempre timeout=5 en requests.get() para evitar que una lentitud del servidor externo bloquee tu servidor Django.'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Ejemplo 1: Consumiendo la API del Tiempo (Open-Meteo) 🌦️',
    badge: 'API 1 · Clima (Open-Meteo)',
    content: 'Open-Meteo es una API meteorológica gratuita que no requiere llave de acceso. Enviamos latitud, longitud y current_weather="true" usando el parámetro params de requests.get():',
    bulletPoints: [
      'URL base: https://api.open-meteo.com/v1/forecast',
      'Usamos un diccionario CIUDADES para traducir el nombre de la ciudad a sus coordenadas (lat, lon)',
      'params={"latitude": ..., "longitude": ..., "current_weather": "true"} construye la Query String automáticamente',
      'Extraemos el objeto current_weather que contiene temperature (°C) y windspeed (km/h)'
    ],
    codeSnippet: {
      filename: 'api/views.py — Consultar API del Tiempo',
      lang: 'python',
      code: `import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

CIUDADES = {
    "santiago": {"nombre": "Santiago", "lat": -33.45, "lon": -70.66},
    "valdivia": {"nombre": "Valdivia", "lat": -39.81, "lon": -73.24},
}

@api_view(["GET"])
def consultar_clima(request):
    clave = request.query_params.get("ciudad", "santiago").lower()
    ciudad = CIUDADES.get(clave, CIUDADES["santiago"])

    url = "https://api.open-meteo.com/v1/forecast"
    params = {"latitude": ciudad["lat"], "longitude": ciudad["lon"], "current_weather": "true"}

    try:
        res = requests.get(url, params=params, timeout=5)
        res.raise_for_status()
        actual = res.json().get("current_weather", {})
        return Response({
            "ciudad": ciudad["nombre"],
            "temperatura_c": actual.get("temperature"),
            "viento_kmh": actual.get("windspeed"),
        })
    except requests.RequestException:
        return Response({"error": "No se pudo consultar el clima"}, status=503)`,
      explanation: 'Al visitar /api/clima/?ciudad=valdivia, Django consulta Open-Meteo y devuelve la temperatura y velocidad del viento actual.'
    },
    keyTakeaway: 'Pasar un diccionario en params=... a requests.get() es más limpio y seguro que concatenar signos ? y & manualmente en la URL.'
  },
  {
    id: 4,
    type: 'code',
    title: '3. Ejemplo 2: Consumiendo la API de Rick and Morty 👽',
    badge: 'API 2 · Rick and Morty',
    content: 'La API de Rick and Morty permite buscar personajes por su ID en la ruta (del 1 al 826). Aprendamos a extraer campos simples y diccionarios anidados como origin.name:',
    bulletPoints: [
      'URL consumida: https://rickandmortyapi.com/api/character/<id>',
      'Recibimos el parámetro ?id=1 desde request.query_params en nuestra vista de Django',
      'Si el ID no existe, la API externa responde 404 y nosotros devolvemos un mensaje claro con status=404',
      'Para leer el planeta de origen anidado usamos datos.get("origin", {}).get("name")'
    ],
    codeSnippet: {
      filename: 'api/views.py — Consultar Personaje de Rick and Morty',
      lang: 'python',
      code: `import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def consultar_personaje_rick(request):
    personaje_id = request.query_params.get("id", "1")
    url = f"https://rickandmortyapi.com/api/character/{personaje_id}"

    try:
        res = requests.get(url, timeout=5)
        if res.status_code == 404:
            return Response({"error": "Personaje no encontrado"}, status=404)
        res.raise_for_status()
        datos = res.json()

        return Response({
            "id": datos.get("id"),
            "nombre": datos.get("name"),
            "estado": datos.get("status"),
            "especie": datos.get("species"),
            "origen": datos.get("origin", {}).get("name"),
            "imagen": datos.get("image"),
        })
    except requests.RequestException:
        return Response({"error": "Error al conectar con Rick and Morty API"}, status=503)`,
      explanation: 'Con datos.get("origin", {}).get("name") accedemos de forma segura a un diccionario dentro de otro diccionario sin riesgo de KeyError.'
    },
    keyTakeaway: 'Encadenar .get("clave", {}) al leer JSON anidados evita errores 500 si algún campo opcional viene vacío desde la API externa.'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Ejemplo 3: Consumiendo la API de Pokémon (PokéAPI) ⚡',
    badge: 'API 3 · PokéAPI',
    content: 'En PokéAPI consultamos por el nombre o número del Pokémon. Como devuelve el peso en hectogramos y listas anidadas de tipos y habilidades, transformamos los datos en Python antes de responder:',
    bulletPoints: [
      'URL consumida: https://pokeapi.co/api/v2/pokemon/<nombre>',
      'Convertimos el peso de hectogramos a kilogramos dividiendo entre 10: datos.get("weight", 0) / 10',
      'Extraemos los nombres de los tipos con comprensión de listas: [t["type"]["name"] for t in datos.get("types", [])]',
      'Extraemos las habilidades con: [h["ability"]["name"] for h in datos.get("abilities", [])]'
    ],
    codeSnippet: {
      filename: 'api/views.py — Consultar Pokémon en PokéAPI',
      lang: 'python',
      code: `import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET"])
def consultar_pokemon(request):
    nombre = request.query_params.get("nombre", "pikachu").lower().strip()
    url = f"https://pokeapi.co/api/v2/pokemon/{nombre}"

    try:
        res = requests.get(url, timeout=5)
        if res.status_code == 404:
            return Response({"error": f"Pokémon '{nombre}' no encontrado"}, status=404)
        res.raise_for_status()
        datos = res.json()

        return Response({
            "numero_pokedex": datos.get("id"),
            "nombre": datos.get("name", "").capitalize(),
            "peso_kg": (datos.get("weight") or 0) / 10,
            "tipos": [t["type"]["name"] for t in datos.get("types", [])],
            "habilidades": [h["ability"]["name"] for h in datos.get("abilities", [])],
            "sprite": datos.get("sprites", {}).get("front_default"),
        })
    except requests.RequestException:
        return Response({"error": "No se pudo conectar con PokéAPI"}, status=503)`,
      explanation: 'Nuestra vista transforma un JSON externo gigante de más de 1.000 líneas en un resumen limpio de 6 campos listos para usar.'
    },
    keyTakeaway: 'Una gran ventaja de consumir APIs desde el backend es poder transformar unidades y simplificar estructuras complejas antes de enviarlas al frontend.'
  },
  {
    id: 6,
    type: 'code',
    title: '5. Conectar las 3 Rutas en api/urls.py y Probar',
    badge: 'Enrutamiento & Pruebas',
    content: 'Registramos las tres vistas dentro de api/urls.py para poder consultarlas desde el navegador o Postman:',
    bulletPoints: [
      'Clima: http://127.0.0.1:8000/api/clima/?ciudad=santiago',
      'Rick and Morty: http://127.0.0.1:8000/api/personaje/?id=1',
      'Pokémon: http://127.0.0.1:8000/api/pokemon/?nombre=pikachu'
    ],
    codeSnippet: {
      filename: 'api/urls.py',
      lang: 'python',
      code: `from django.urls import path
from .views import (
    saludar,
    consultar_clima,
    consultar_personaje_rick,
    consultar_pokemon,
)

urlpatterns = [
    path("saludar/", saludar),
    path("clima/", consultar_clima),
    path("personaje/", consultar_personaje_rick),
    path("pokemon/", consultar_pokemon),
]`,
      explanation: 'Con estas rutas registradas en api/urls.py, tu proyecto Django ya ofrece 4 endpoints funcionales en /api/.'
    },
    keyTakeaway: 'Puedes abrir cualquiera de estas 3 rutas directamente en tu navegador para ver la interfaz interactiva de Django REST Framework.'
  },
  {
    id: 7,
    type: 'summary',
    title: '6. Resumen: Las 4 Reglas de Oro al Consumir APIs con requests 🏆',
    badge: 'Buenas Prácticas',
    content: 'Antes de pasar a los desafíos interactivos, repasa las reglas clave que aplicamos en los 3 ejemplos:',
    bulletPoints: [
      '✅ 1. Usa siempre timeout=5 en requests.get() para proteger tu servidor de bloqueos infinitos.',
      '✅ 2. Envuelve toda llamada externa en un bloque try / except requests.RequestException.',
      '✅ 3. Verifica el código HTTP (res.status_code == 404 o res.raise_for_status()) antes de procesar los datos.',
      '✅ 4. Convierte la respuesta con res.json() y usa .get() para extraer solo los campos que tu aplicación necesita.'
    ],
    keyTakeaway: 'En el Módulo 10 profundizaremos en ModelSerializer, ViewSets y protección de endpoints con autenticación JWT.'
  }
];
