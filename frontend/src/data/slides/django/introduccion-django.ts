import type { Slide } from '../../../types/slides';

export const introduccionDjangoSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '3. Tu Primer Proyecto en Django: Proyectos vs Apps 🧱',
    subtitle: 'Estructura modular, django-admin, manage.py y el ciclo de arranque del servidor',
    badge: 'Django · Lección 3',
    content: 'Aprende a crear y estructurar aplicaciones web con la arquitectura oficial de Django. Entenderemos la diferencia crucial entre un "Proyecto" y una "App" y cómo se comunican.',
    bulletPoints: [
      '🚀 django-admin startproject: El contenedor global y su configuración',
      '📦 python manage.py startapp: Módulos independientes y reutilizables',
      '⚙️ settings.py a fondo: INSTALLED_APPS, DATABASES y Middleware',
      '🌐 manage.py runserver: Servidor de desarrollo con recarga en caliente'
    ],
    keyTakeaway: 'Un Proyecto es el sitio web completo; una App es una pieza de funcionalidad reutilizable (como un blog, pagos o usuarios).'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Diferencia Clave: Proyecto (Project) vs Aplicación (App)',
    badge: 'Arquitectura Modular',
    content: 'Muchos principiantes se confunden con esta distinción. La analogía de un edificio lo deja completamente claro:',
    visualChart: {
      headers: ['Concepto Django', 'Analogía del Mundo Real', 'Responsabilidad Técnica', 'Ejemplo'],
      rows: [
        ['Proyecto (Project)', 'El Centro Comercial Completo', 'Contenedor global, base de datos, URLs generales y settings', '`tienda_online`'],
        ['App 1: catalogo', 'La tienda de ropa', 'Gestiona productos, categorías y stock', '`catalogo/`'],
        ['App 2: pedidos', 'La caja registradora', 'Gestiona carritos, cobros y facturación', '`pedidos/`'],
        ['App 3: clientes', 'El club de fidelidad', 'Perfiles de usuario y direcciones', '`clientes/`']
      ]
    },
    keyTakeaway: 'Un proyecto Django se compone de múltiples aplicaciones modulares. Cada app debe tener una única responsabilidad bien definida.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Creación del Proyecto y la Primera Aplicación en Terminal',
    badge: 'Comandos Fundamentales',
    content: 'Ejecuta estos comandos en tu terminal para inicializar el proyecto con buenas prácticas de estructura:',
    codeSnippet: {
      filename: 'crear_proyecto.sh',
      lang: 'bash',
      code: `# 1. Crear el proyecto contenedor (el punto final evita anidación innecesaria)
(.venv) $ django-admin startproject config .

# 2. Crear una aplicación modular para nuestro dominio
(.venv) $ python manage.py startapp blog

# 3. Arrancar el servidor de desarrollo local
(.venv) $ python manage.py runserver
# Visita en tu navegador: http://127.0.0.1:8000/ (¡El cohete de Django!)`,
      explanation: 'Usar "django-admin startproject config ." crea el proyecto en la carpeta actual sin generar carpetas duplicadas engorrosas.'
    },
    keyTakeaway: 'django-admin se usa solo para crear el proyecto inicial; a partir de ahí, todo se maneja con "python manage.py".'
  },
  {
    id: 4,
    type: 'diagram',
    title: 'Anatomía de los Archivos Generados por Django',
    badge: 'Estructura del Proyecto',
    content: 'Cada archivo generado tiene un propósito específico dentro de la orquestación del framework:',
    visualChart: {
      headers: ['Archivo', '¿Para qué sirve?', '¿Lo modificas seguido?'],
      rows: [
        ['`manage.py`', 'Puerta de entrada de la consola para comandos del proyecto', '❌ Casi nunca (es código de sistema)'],
        ['`config/settings.py`', 'Configuración global: BD, apps instaladas, variables y seguridad', '✅ Sí, constantemente'],
        ['`config/urls.py`', 'El enrutador principal: tabla de direcciones web del proyecto', '✅ Sí, para registrar rutas de apps'],
        ['`blog/models.py`', 'Modelos de datos (tablas SQL representadas en Python)', '✅ Sí, cada vez que creas datos'],
        ['`blog/views.py`', 'Lógica de negocio y controladores de respuestas', '✅ Sí, para cada pantalla o endpoint'],
        ['`blog/admin.py`', 'Configuración de los modelos en el panel administrativo', '✅ Sí, para personalizar la gestión']
      ]
    },
    keyTakeaway: 'Tu trabajo diario como desarrollador se concentra en settings.py, urls.py, models.py y views.py.'
  },
  {
    id: 5,
    type: 'code',
    title: 'El Paso que Todos Olvidan: Registrar tu App en INSTALLED_APPS',
    badge: 'Gotcha Común',
    content: 'Crear una app con "startapp" no es suficiente. Django ignorará tus modelos y migraciones a menos que registres la app en settings.py:',
    codeSnippet: {
      filename: 'config/settings.py',
      lang: 'python',
      code: `INSTALLED_APPS = [
    # 1. Apps del núcleo de Django (Baterías incluidas)
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 2. Librerías de terceros (ej: rest_framework, unfold)

    # 3. Tus aplicaciones de negocio:
    'blog.apps.BlogConfig',  # 👈 ¡OBLIGATORIO para que Django la reconozca!
]`,
      explanation: 'Registrar la clase Config (blog.apps.BlogConfig) es la mejor práctica oficial de Django para permitir señales y metadatos.'
    },
    keyTakeaway: 'Si ejecutas makemigrations y Django dice "No changes detected", ¡revisa primero si registraste tu app en INSTALLED_APPS!'
  },
  {
    id: 6,
    type: 'code',
    title: 'El Servidor de Desarrollo: Auto-recarga y Detección de Errores',
    badge: 'manage.py runserver',
    content: 'El servidor local de Django incluye detección de cambios en caliente (Hot Reload) y chequeo de sistema:',
    codeSnippet: {
      filename: 'consola_runserver.txt',
      lang: 'text',
      code: `Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

Django version 5.1, using settings 'config.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.`,
      explanation: 'StatReloader reinicia el proceso automáticamente cada vez que guardas un archivo .py, acelerando tu ciclo de desarrollo.'
    },
    keyTakeaway: 'manage.py runserver es solo para desarrollo. En producción usaremos servidores WSGI/ASGI de alta concurrencia como Gunicorn o Uvicorn.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Tu Proyecto Está en Marcha',
    badge: 'Hito Alcanzado',
    content: 'Has creado con éxito la estructura base de un proyecto profesional:',
    bulletPoints: [
      '✅ Distingues perfectamente entre el Proyecto global y sus Aplicaciones modulares.',
      '✅ Creas proyectos limpios con "django-admin startproject".',
      '✅ Creas apps modulares con "python manage.py startapp".',
      '✅ Sabes registrar tus apps en INSTALLED_APPS de settings.py.',
      '✅ Ejecutas el servidor local y entiendes los mensajes de consola.'
    ],
    keyTakeaway: 'En la siguiente lección entraremos a fondo en la Arquitectura MVT de Django para entender cómo viaja cada petición web.'
  }
];
