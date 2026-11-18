import type { Slide } from '../../../types/slides';

export const apisRestfulSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '8. APIs RESTful, Red LAN y Tarea 1: Enviar datos con GET y POST 🌐',
    subtitle: 'Django REST Framework · Nivel inicial · IP Local, Servicio en LAN y Paso a Paso',
    badge: 'Django · Lección 8 · Tarea 1',
    content: 'Aprende a obtener tu IP local para levantar Django en red LAN y construye paso a paso tu primer endpoint en Django REST Framework para enviar un nombre con GET y POST y recibir un saludo en JSON.',
    bulletPoints: [
      '🎯 Objetivo: Enviar un nombre por GET y POST y recibir un saludo JSON sin modelos ni serializers',
      '📡 Previo de Red LAN: Obtener tu IPv4 local (ipconfig / ip a), ALLOWED_HOSTS y runserver 0.0.0.0:8000',
      '🛠️ Paso 1 y 2: Preparar el proyecto sistema, crear la app api y registrar INSTALLED_APPS',
      '🐍 Paso 3: Crear la vista saludar con @api_view(["GET", "POST"]), request.query_params y request.data',
      '🔗 Paso 4 y 5: Conectar rutas en api/urls.py y sistema/urls.py e iniciar el servidor',
      '🧪 Caso A, Caso B y Paso 6: Pruebas en navegador y Postman (con nombre y sin nombre)',
      '📋 Actividad para entregar, cuestionario técnico y rúbrica de evaluación (10 puntos)'
    ],
    keyTakeaway: 'Dominar el levantamiento en red local (LAN) y el flujo de GET/POST en DRF te permite probar tu API desde cualquier dispositivo.'
  },
  {
    id: 2,
    type: 'concept',
    title: '1. ¿Qué es una API REST y cuál es el Objetivo de la Tarea 1?',
    badge: 'Fundamentos & Objetivo',
    content: 'Una API permite que distintas aplicaciones se comuniquen intercambiando datos en formato JSON. En esta primera tarea práctica construiremos un endpoint de saludo directo y sin base de datos:',
    visualChart: {
      headers: ['Aspecto de la Tarea 1', 'Detalle Técnico', 'Propósito Pedagógico'],
      rows: [
        ['🎯 Objetivo Principal', 'Enviar un nombre con `GET` y `POST` y recibir un saludo en `JSON`', 'Comprender la diferencia entre parámetros de URL y cuerpo JSON'],
        ['🚫 Alcance Simplificado', 'No usamos `models.py` ni `serializers.py` y no guardamos datos', 'Aislar el flujo puro de petición (`request`) y respuesta (`Response`)'],
        ['🔍 Lectura en GET', '`request.query_params.get("nombre", "estudiante")`', 'Leer parámetros de consulta enviados en la URL (`?nombre=Ana`)'],
        ['📦 Lectura en POST', '`request.data.get("nombre", "estudiante")`', 'Leer el objeto JSON enviado en el cuerpo de la petición (`Body → raw → JSON`)']
      ]
    },
    keyTakeaway: 'Antes de conectar bases de datos o serializers, es fundamental dominar cómo viaja la información desde el cliente hasta la vista en GET y POST.'
  },
  {
    id: 3,
    type: 'code',
    title: '2. Explicación Previa (Parte 1): Obtener tu IP Local en la Red LAN 📡',
    badge: 'Previo LAN · Obtener IP',
    content: 'Por defecto, Django solo escucha en 127.0.0.1 (tu propio PC). Para que otros equipos del laboratorio o tu celular en la misma red Wi-Fi/LAN puedan conectarse a tu API, primero debes conocer tu dirección IPv4 local:',
    bulletPoints: [
      'En Windows: abre CMD o PowerShell, ejecuta ipconfig y busca "Dirección IPv4" (ej. 192.168.1.45)',
      'En Linux: ejecuta ip a o hostname -I en la terminal',
      'En macOS: ejecuta ipconfig getifaddr en0 para ver la IP de tu tarjeta Wi-Fi',
      'Las direcciones privadas de red local suelen comenzar con 192.168.x.x, 10.x.x.x o 172.16.x.x'
    ],
    codeSnippet: {
      filename: 'Obtener dirección IPv4 según tu Sistema Operativo',
      lang: 'bash',
      code: `# 🪟 1. En Windows (CMD o PowerShell):
ipconfig
# Adaptador de LAN inalámbrica Wi-Fi:
#    Dirección IPv4. . . . . . . . . . : 192.168.1.45

# 🐧 2. En Linux:
ip a
hostname -I

# 🍎 3. En macOS:
ipconfig getifaddr en0`,
      explanation: 'Anota tu Dirección IPv4 (por ejemplo 192.168.1.45); será la dirección que usarán otros dispositivos de la red LAN para entrar a tu servidor.'
    },
    keyTakeaway: '127.0.0.1 (localhost) siempre apunta al dispositivo donde estás escribiendo; la IP local (192.168.x.x) identifica a tu equipo frente al resto de la red LAN.'
  },
  {
    id: 4,
    type: 'code',
    title: '3. Explicación Previa (Parte 2): Levantar el Servicio en Modo LAN',
    badge: 'Previo LAN · 0.0.0.0:8000',
    content: 'Una vez obtenida tu IP local, debes autorizar el acceso en ALLOWED_HOSTS dentro de settings.py y levantar el servidor escuchando en todas las interfaces de red (0.0.0.0:8000):',
    bulletPoints: [
      '1. En sistema/settings.py configura ALLOWED_HOSTS = ["*"] (o agrega tu IP "192.168.1.45") para evitar el error DisallowedHost (400)',
      '2. Ejecuta python manage.py runserver 0.0.0.0:8000 para que Django escuche en toda la red local',
      '3. En Windows, acepta el permiso del Firewall en "Redes privadas" cuando aparezca la alerta',
      '4. Ahora cualquier compañero o celular en la misma red puede consultar http://<TU-IP-LOCAL>:8000/api/saludar/'
    ],
    codeSnippet: {
      filename: 'sistema/settings.py y Terminal en modo LAN',
      lang: 'python',
      code: `# 1. En sistema/settings.py autoriza las conexiones de red local:
ALLOWED_HOSTS = ["*"]  # O bien: ["127.0.0.1", "localhost", "192.168.1.45"]

# -------------------------------------------------------------------
# 2. En la terminal, levanta el servicio escuchando en toda la LAN:
# python manage.py runserver 0.0.0.0:8000

# 3. Cómo acceder al servicio:
# - Desde tu propio PC:    http://127.0.0.1:8000/api/saludar/?nombre=Ana
# - Desde otro PC/Celular: http://192.168.1.45:8000/api/saludar/?nombre=Ana`,
      explanation: 'El comodín 0.0.0.0 le indica a Django que escuche peticiones tanto en localhost (127.0.0.1) como en la IP de tu tarjeta Wi-Fi o Ethernet.'
    },
    keyTakeaway: 'Si olvidas configurar ALLOWED_HOSTS al entrar por IP local, Django rechazará la petición con el error 400 Bad Request (DisallowedHost).'
  },
  {
    id: 5,
    type: 'code',
    title: '4. Paso 1: Preparar el proyecto y el entorno',
    badge: 'Paso 1 · Terminal',
    content: 'Necesitas Python, un editor de código y Postman. Si ya tienes el proyecto "sistema" y la aplicación "api", continúa en el Paso 2. Si comienzas desde cero, abre una terminal en tu carpeta de trabajo y ejecuta:',
    bulletPoints: [
      'Se recomienda instalar las dependencias dentro de un entorno virtual activo (venv)',
      'django-admin startproject sistema crea la estructura base del proyecto',
      'pip install djangorestframework instala Django REST Framework (DRF)',
      'python manage.py startapp api crea la aplicación donde programaremos el endpoint',
      'Desde ahora, ejecuta los comandos en la carpeta que contiene manage.py (usa python3 si corresponde a tu sistema)'
    ],
    codeSnippet: {
      filename: 'terminal.sh',
      lang: 'bash',
      code: `pip install django
django-admin startproject sistema
cd sistema
pip install djangorestframework
python manage.py startapp api`,
      explanation: 'Estos 5 comandos dejan listo el proyecto "sistema" y la aplicación "api" con Django REST Framework instalado.'
    },
    keyTakeaway: 'Verifica siempre estar ubicado dentro de la carpeta "sistema" (donde se encuentra el archivo manage.py) antes de ejecutar comandos de Django.'
  },
  {
    id: 6,
    type: 'code',
    title: '5. Paso 2: Registrar las aplicaciones en settings.py',
    badge: 'Paso 2 · sistema/settings.py',
    content: 'En el archivo sistema/settings.py busca la lista INSTALLED_APPS. Conserva todas las entradas existentes de Django y agrega estas dos aplicaciones al final de la lista:',
    bulletPoints: [
      '"rest_framework" habilita el motor de Django REST Framework y su interfaz web de pruebas (Browsable API)',
      '"api" registra nuestra aplicación local dentro del proyecto',
      'No borres las aplicaciones que vienen por defecto (admin, auth, contenttypes, sessions, messages, staticfiles)'
    ],
    codeSnippet: {
      filename: 'sistema/settings.py',
      lang: 'python',
      code: `INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Agrega estas dos entradas dentro de la lista:
    "rest_framework",
    "api",
]`,
      explanation: 'Registrar "rest_framework" y "api" en INSTALLED_APPS es indispensable para que Django reconozca la librería DRF y nuestra aplicación.'
    },
    keyTakeaway: 'Recuerda colocar la coma al final de cada elemento dentro de la lista INSTALLED_APPS.'
  },
  {
    id: 7,
    type: 'code',
    title: '6. Paso 3: Crear la vista del saludo en api/views.py',
    badge: 'Paso 3 · api/views.py',
    content: 'Abre el archivo api/views.py y coloca exactamente este código para atender tanto peticiones GET como POST:',
    bulletPoints: [
      '@api_view(["GET", "POST"]) permite que la vista acepte únicamente los métodos GET y POST',
      'request.method indica qué método HTTP se recibió en la solicitud ("GET" o "POST")',
      'request.query_params obtiene el nombre enviado en la URL mediante GET',
      'request.data obtiene el nombre enviado en el cuerpo JSON mediante POST',
      'Si falta el campo "nombre", el segundo argumento de .get() usa el texto por defecto "estudiante"',
      'Response devuelve el diccionario convertido automáticamente a JSON con el mensaje y el método utilizado'
    ],
    codeSnippet: {
      filename: 'api/views.py',
      lang: 'python',
      code: `from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET", "POST"])
def saludar(request):
    if request.method == "GET":
        nombre = request.query_params.get("nombre", "estudiante")
    else:
        nombre = request.data.get("nombre", "estudiante")

    return Response({
        "mensaje": f"Hola, {nombre}",
        "metodo": request.method
    })`,
      explanation: 'Dependiendo de request.method, la función busca "nombre" en los parámetros de la URL (GET) o en el cuerpo JSON (POST).'
    },
    keyTakeaway: 'El método .get("nombre", "estudiante") evita errores cuando el cliente no envía el campo, devolviendo "estudiante" como valor seguro por defecto.'
  },
  {
    id: 8,
    type: 'code',
    title: '7. Paso 4: Conectar las rutas (api/urls.py y sistema/urls.py)',
    badge: 'Paso 4 · Enrutamiento URL',
    content: 'Para que nuestra vista sea accesible en /api/saludar/, conectamos las rutas en dos archivos: primero en la aplicación api y luego en el proyecto principal sistema:',
    bulletPoints: [
      '1. Crea o actualiza api/urls.py definiendo path("saludar/", saludar)',
      '2. En sistema/urls.py importa include y agrega path("api/", include("api.urls"))',
      'La combinación del prefijo "api/" + "saludar/" forma la dirección final: http://127.0.0.1:8000/api/saludar/',
      'Observa que la ruta termina con barra diagonal (/); es importante incluirla al hacer peticiones POST'
    ],
    codeSnippet: {
      filename: 'api/urls.py y sistema/urls.py',
      lang: 'python',
      code: `# 1. Archivo: api/urls.py
from django.urls import path
from .views import saludar

urlpatterns = [
    path("saludar/", saludar),
]

# ---------------------------------------------------------
# 2. Archivo: sistema/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]`,
      explanation: 'include("api.urls") delega todas las rutas que comiencen con /api/ hacia el archivo urls.py de nuestra aplicación.'
    },
    keyTakeaway: 'Separar las rutas de la aplicación en api/urls.py e incluirlas con include() mantiene el proyecto ordenado y modular.'
  },
  {
    id: 9,
    type: 'code',
    title: '8. Paso 5: Iniciar el servidor y Caso A (Probar con GET)',
    badge: 'Paso 5 & Caso A · GET',
    content: 'Ejecuta migrate y runserver (normal o en modo LAN con 0.0.0.0:8000) desde la carpeta que contiene manage.py. Con el servidor encendido, probamos el Caso A con GET:',
    bulletPoints: [
      'migrate prepara las tablas iniciales de Django (aunque el saludo no utiliza esas tablas)',
      'Mantén la terminal abierta mientras realizas las pruebas con runserver',
      'Caso A (GET): Abre en el navegador http://127.0.0.1:8000/api/saludar/?nombre=Ana (o usando tu IP LAN)',
      'El fragmento ?nombre=Ana es un parámetro de consulta (Query Param): el nombre viaja en la URL',
      'En Postman selecciona GET (puedes agregar el header Accept: application/json); en el navegador verás la interfaz de pruebas de DRF'
    ],
    codeSnippet: {
      filename: 'Terminal y Prueba Caso A (GET)',
      lang: 'bash',
      code: `# 1. En la terminal (carpeta con manage.py):
python manage.py migrate
python manage.py runserver              # Modo local (127.0.0.1:8000)
# python manage.py runserver 0.0.0.0:8000  # Modo LAN (Red local)

# 2. Caso A — Abrir en el navegador o en Postman con método GET:
# URL: http://127.0.0.1:8000/api/saludar/?nombre=Ana

# Respuesta esperada — 200 OK:
{
  "mensaje": "Hola, Ana",
  "metodo": "GET"
}`,
      explanation: 'Al usar GET con ?nombre=Ana, request.query_params.get("nombre", "estudiante") extrae "Ana" de la URL y responde 200 OK.'
    },
    keyTakeaway: 'En una petición GET los parámetros viajan visibles en la URL después del signo de interrogación (?clave=valor).'
  },
  {
    id: 10,
    type: 'code',
    title: '9. Caso B: Enviar el nombre mediante POST en Postman',
    badge: 'Caso B · POST con Body JSON',
    content: 'Ahora probamos el envío mediante POST en Postman. A diferencia de GET, la URL va limpia (sin parámetros) y el nombre viaja en el cuerpo JSON:',
    bulletPoints: [
      'En Postman selecciona el método POST',
      'Escribe la URL sin parámetros: http://127.0.0.1:8000/api/saludar/',
      'Selecciona la pestaña Body → raw → JSON',
      'Escribe el objeto JSON {"nombre": "Pedro"} y presiona Send',
      'El endpoint devuelve un saludo y no crea ningún registro en base de datos, por eso responde 200 OK'
    ],
    codeSnippet: {
      filename: 'Postman — Prueba Caso B (POST)',
      lang: 'json',
      code: `// 1. Método: POST
// 2. URL (sin parámetros): http://127.0.0.1:8000/api/saludar/
// 3. Pestaña Body -> raw -> JSON:
{
  "nombre": "Pedro"
}

// ---------------------------------------------------------
// Respuesta esperada — 200 OK:
{
  "mensaje": "Hola, Pedro",
  "metodo": "POST"
}`,
      explanation: 'En POST el nombre viaja en el cuerpo JSON y la vista lo lee mediante request.data.get("nombre", "estudiante").'
    },
    keyTakeaway: 'En Postman recuerda siempre seleccionar Body → raw → JSON y escribir las claves y textos con comillas dobles válidas.'
  },
  {
    id: 11,
    type: 'code',
    title: '10. Paso 6: Probar cuando NO se envía el nombre',
    badge: 'Paso 6 · Valor por Defecto',
    content: '¿Qué ocurre si llamamos al endpoint sin enviar el campo "nombre"? Probemos ambos métodos para verificar el valor por defecto "estudiante":',
    bulletPoints: [
      'Prueba 1 (GET sin parámetros): consulta http://127.0.0.1:8000/api/saludar/',
      'Prueba 2 (POST con JSON vacío): en la misma URL envía el cuerpo {} con método POST',
      'En ambos casos el mensaje devuelto debe ser "Hola, estudiante"',
      'El campo "metodo" indicará "GET" o "POST" según la solicitud realizada',
      'Nota: esta versión inicial usa el valor por defecto cuando falta la clave; no valida nombres vacíos ("") ni otros tipos de datos'
    ],
    codeSnippet: {
      filename: 'Pruebas sin enviar el campo nombre',
      lang: 'json',
      code: `// A) Con GET sin parámetros en la URL:
// URL: http://127.0.0.1:8000/api/saludar/
{
  "mensaje": "Hola, estudiante",
  "metodo": "GET"
}

// B) Con POST enviando un objeto JSON vacío {}:
// URL: http://127.0.0.1:8000/api/saludar/   |   Body (raw -> JSON): {}
{
  "mensaje": "Hola, estudiante",
  "metodo": "POST"
}`,
      explanation: 'Al no existir la clave "nombre", tanto request.query_params.get(...) como request.data.get(...) retornan "estudiante".'
    },
    keyTakeaway: 'Probar los casos borde (sin parámetros o con JSON vacío) es parte esencial del trabajo de todo desarrollador backend.'
  },
  {
    id: 12,
    type: 'comparison',
    title: '11. Resumen Comparativo y Preguntas Clave de la Guía',
    badge: 'Síntesis Técnica',
    content: 'Revisa la tabla resumen oficial de la guía y las respuestas a las 3 preguntas conceptuales de la actividad:',
    visualChart: {
      headers: ['Método / Pregunta', '¿Dónde enviamos el nombre?', '¿Cómo lo leemos en DRF?', 'Comportamiento si falta "nombre"'],
      rows: [
        ['`GET`', 'Parámetro de la URL (`?nombre=Ana`)', '`request.query_params`', 'Responde `"Hola, estudiante"` con `"metodo": "GET"`'],
        ['`POST`', 'Cuerpo JSON (`{"nombre": "Pedro"}`)', '`request.data`', 'Responde `"Hola, estudiante"` con `"metodo": "POST"`']
      ]
    },
    keyTakeaway: 'Recuerda: GET → Parámetro de la URL → request.query_params | POST → Cuerpo JSON → request.data.'
  },
  {
    id: 13,
    type: 'summary',
    title: '12. Actividad para Entregar y Evaluación (10 Puntos) 🏆',
    badge: 'Checklist & Rúbrica',
    content: 'Para completar la Tarea 1 con el puntaje máximo (10 puntos), asegúrate de incluir todas las evidencias y verificar tu entorno:',
    bulletPoints: [
      '📸 1. GET funcionando (3 puntos): Envía tu nombre mediante GET y captura la URL completa y la respuesta JSON.',
      '📦 2. POST funcionando (3 puntos): Envía tu nombre mediante POST y captura el método, la URL, el cuerpo JSON y la respuesta.',
      '🛡️ 3. Pruebas sin nombre (2 puntos): Prueba GET sin parámetros y POST con {}. Incluye ambas capturas con "Hola, estudiante".',
      '💻 4. Código y respuestas claras (2 puntos): Entrega el código de api/views.py, api/urls.py, sistema/urls.py y responde las 3 preguntas de la guía.',
      '🔧 Si algo no funciona: revisa que el servidor siga encendido, que la URL termine en / y que Postman tenga seleccionado raw → JSON.'
    ],
    keyTakeaway: '¡Ya tienes todo listo para entregar la Tarea 1! Continúa ahora con el desafío interactivo de preguntas para afianzar lo aprendido.'
  }
];
