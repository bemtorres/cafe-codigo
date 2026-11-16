import type { Slide } from '../../../types/slides';

export const proyectoIntegradorSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '10. Proyecto Integrador: De la Idea a Producción 🏆',
    subtitle: 'Arquitectura completa de producción, variables de entorno, Docker, Gunicorn y checklist de despliegue',
    badge: 'Django · Lección 10',
    content: 'Integra todo lo aprendido a lo largo del curso en un proyecto backend profesional listo para producción. Veremos arquitectura en capas, variables de entorno con .env, recolección de estáticos con collectstatic y servidores WSGI.',
    bulletPoints: [
      '🏗️ Arquitectura en capas para proyectos reales de gran escala',
      '🔐 Variables de entorno con python-dotenv (cero secretos en Git)',
      '📦 Archivos estáticos en producción: collectstatic y Whitenoise',
      '🚀 Servidores de producción: WSGI con Gunicorn y contenedores Docker',
      '📋 El checklist de despliegue definitivo del desarrollador Django'
    ],
    keyTakeaway: 'Un proyecto no está terminado cuando compila en tu máquina; está terminado cuando corre de forma segura, estable y escalable en producción.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'La Arquitectura de un Sistema Django en Producción',
    badge: 'Infraestructura Real',
    content: 'En producción no usamos "manage.py runserver". La arquitectura se divide en capas especializadas:',
    visualChart: {
      headers: ['Capa de Producción', 'Tecnología Habitual', 'Responsabilidad'],
      rows: [
        ['1. Proxy Inverso & SSL', '`Nginx` o `Caddy` / `Cloudflare`', 'Recibe peticiones HTTP/HTTPS de internet, comprime gzip y protege contra DDoS'],
        ['2. Servidor WSGI', '`Gunicorn` o `Uvicorn`', 'Ejecuta múltiples procesos de Python en paralelo comunicándose con Django'],
        ['3. Motor Django', '`Django Core + DRF`', 'Ejecuta tu lógica de negocio, autenticación y serialización'],
        ['4. Base de Datos', '`PostgreSQL`', 'Almacena y persiste los datos con transacciones ACID seguras'],
        ['5. Archivos Estáticos', '`Whitenoise` o `Amazon S3`', 'Entrega CSS, JS e imágenes a máxima velocidad con caché']
      ]
    },
    keyTakeaway: 'Cada capa hace lo que mejor sabe hacer: Nginx gestiona conexiones; Gunicorn ejecuta Python; PostgreSQL almacena datos.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Gestión Segura de Secretos con python-dotenv (.env)',
    badge: 'Seguridad Operativa',
    content: 'Nunca subas contraseñas o claves secretas a GitHub. Guarda los secretos en un archivo .env local:',
    codeSnippet: {
      filename: '.env (Ignorado en .gitignore)',
      lang: 'bash',
      code: `# 1. Archivo .env local (¡NUNCA subir a control de versiones!)
DEBUG=False
SECRET_KEY=django-insecure-z9x8c7v6b5n4m3l2k1j
DATABASE_URL=postgres://usuario:password@localhost:5432/flota_db
ALLOWED_HOSTS=flotaexpress.cl,api.flotaexpress.cl

# 2. En config/settings.py leemos las variables:
import os
from dotenv import load_dotenv

load_dotenv()  # Carga las variables del archivo .env

DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
SECRET_KEY = os.getenv('SECRET_KEY')
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')`,
      explanation: 'Con python-dotenv puedes cambiar de base de datos de desarrollo a producción sin tocar ni una sola línea de código.'
    },
    keyTakeaway: 'Añade siempre .env al archivo .gitignore antes de hacer tu primer git commit.'
  },
  {
    id: 4,
    type: 'code',
    title: 'El Comando Obligatorio de Producción: collectstatic',
    badge: 'Manejo de Estáticos',
    content: 'En producción Django no sirve archivos estáticos automáticamente. Debe reunirlos en una carpeta única:',
    codeSnippet: {
      filename: 'despliegue_static.sh',
      lang: 'bash',
      code: `# 1. En settings.py defines dónde se reunirán todos los estáticos:
STATIC_ROOT = BASE_DIR / 'staticfiles'

# 2. Para servir estáticos sin configurar servidores complejos, instala Whitenoise:
# pip install whitenoise

# En settings.py (inmediatamente debajo de SecurityMiddleware):
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # 👈 Sirve estáticos con compresión Brotli
    ...
]

# 3. Ejecutas el comando de recolección en tu servidor:
$ python manage.py collectstatic --no-input
145 static files copied to '/app/staticfiles'.`,
      explanation: 'Whitenoise comprime y cachea automáticamente todos tus archivos CSS, JS e imágenes para que carguen en milisegundos.'
    },
    keyTakeaway: 'Con Whitenoise te olvidas de configurar Nginx para archivos estáticos: Django los sirve a velocidad de CDN.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Contenedores Docker: Tu Proyecto Funciona en Cualquier Servidor',
    badge: 'Dockerización',
    content: 'Empaquetar tu aplicación en una imagen Docker garantiza que corra exactamente igual en tu computadora que en la nube:',
    visualChart: {
      headers: ['Archivo Docker', '¿Qué hace?', 'Comando Clave'],
      rows: [
        ['`Dockerfile`', 'Define el entorno: versión de Python, dependencias y arranque', '`CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]`'],
        ['`docker-compose.yml`', 'Orquesta la app de Django junto a PostgreSQL en red local', '`docker compose up --build -d`'],
        ['`.dockerignore`', 'Excluye archivos pesados (.venv, .git, __pycache__)', 'Mantiene las imágenes de Docker ligeras y rápidas']
      ]
    },
    keyTakeaway: 'Docker elimina para siempre el clásico "en mi máquina sí funcionaba".'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Checklist Final del Desarrollador Backend Django',
    badge: 'Checklist de Certificación',
    content: 'Antes de lanzar cualquier proyecto al mundo real, verifica esta lista de control:',
    bulletPoints: [
      '✅ DEBUG está en False y SECRET_KEY proviene de variables de entorno.',
      '✅ ALLOWED_HOSTS contiene únicamente los dominios y subdominios autorizados.',
      '✅ Todas las migraciones fueron ejecutadas con éxito (python manage.py migrate).',
      '✅ Se ejecutó "python manage.py check --deploy" con cero advertencias críticas.',
      '✅ Se recolectaron los estáticos con "python manage.py collectstatic".',
      '✅ Se configuró un superusuario administrador para gestión operativa.',
      '✅ Las contraseñas y accesos sensibles no están en el repositorio de Git.'
    ],
    keyTakeaway: '¡Felicidades! Has completado el curso completo de Django. Cuentas con las habilidades para construir y desplegar software backend de clase mundial.'
  }
];
