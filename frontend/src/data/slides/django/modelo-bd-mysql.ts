import type { Slide } from '../../../types/slides';

export const modeloBdMysqlSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '5.4 Conexión de Django con MySQL: PyMySQL y Diagnóstico 🐬',
    subtitle: 'Diagnóstico de compatibilidad de versiones, instalación de PyMySQL y resolución de errores',
    badge: 'Django · Lección 5.4',
    content: 'Guía técnica definitiva para conectar Django a MySQL o MariaDB cuando falla el controlador oficial mysqlclient, validando versiones y configurando PyMySQL como sustituto nativo.',
    bulletPoints: [
      '🔍 Diagnóstico previo: versiones de Django, Python y del motor MySQL/MariaDB',
      '⚖️ Tabla de compatibilidad oficial (Django 5.2 LTS, 6.0+) y versiones mínimas',
      '🔌 Instalación y monkey-patching con PyMySQL (`install_as_MySQLdb()`)',
      '⚙️ Configuración en `settings.py`, `DATABASES` y validación con `manage.py check`',
      '🚨 Diagnóstico y resolución de errores frecuentes (Access denied, Can\'t connect, versiones)'
    ],
    keyTakeaway: 'Primero se verifican las versiones y compatibilidades. PyMySQL resuelve problemas de compilación del driver, pero no vuelve compatibles versiones de MySQL no admitidas por Django.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Diagnóstico Inicial: ¿Dónde está el problema?',
    badge: 'Diagnóstico Paso a Paso',
    content: 'Cuando un proyecto Django no se conecta a MySQL, el fallo suele ocurrir en uno de estos tres niveles:',
    visualChart: {
      headers: ['Nivel de Falla', 'Causa Típica', 'Síntoma / Mensaje Común', 'Acción Correctiva'],
      rows: [
        ['1. Versión de Motor', 'MySQL / MariaDB obsoleto', '`NotSupportedError: MySQL 8.0.11 or later is required`', 'Actualizar el servidor MySQL o cambiar la versión de Django'],
        ['2. Driver / Conector', 'Falta compilador C para mysqlclient', '`django.core.exceptions.ImproperlyConfigured: Error loading MySQLdb module`', 'Instalar `pymysql` e inyectarlo en `__init__.py`'],
        ['3. Configuración / Red', 'Credenciales, puerto o servicio apagado', '`OperationalError: (2003, "Can\'t connect to MySQL server")` o `Access denied`', 'Verificar servicio activo, host, usuario, clave y base de datos']
      ]
    },
    keyTakeaway: 'Distinguir entre fallo de driver y fallo de compatibilidad de servidor ahorra horas de prueba y error.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Paso 1 y 2: Inspeccionar Versiones Exactas',
    badge: 'Terminal & SQL',
    content: 'Antes de tocar configuraciones, ejecuta estos comandos en tu terminal y consola SQL para registrar las versiones reales:',
    codeSnippet: {
      filename: 'Terminal & MySQL Workbench',
      lang: 'bash',
      code: `# 1. Versión de Django y Python en el entorno virtual
(venv) python -m django --version
(venv) python --version
(venv) python -m pip show Django

# 2. Versión exacta del servidor MySQL conectado
SELECT VERSION();`,
      explanation: 'SELECT VERSION() identifica con total certeza la versión del servidor de bases de datos activo, no la herramienta cliente local.'
    },
    keyTakeaway: 'En MySQL, usa siempre SELECT VERSION() en el cliente SQL para conocer la versión exacta del servidor, no la del binario cliente local.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Paso 3: Matriz de Compatibilidad Oficial Django vs MySQL',
    badge: 'Compatibilidad Oficial',
    content: 'Django define versiones mínimas estrictas para los motores de base de datos relacionales:',
    visualChart: {
      headers: ['Versión de Django', 'MySQL Mínimo Oficial', 'MariaDB Mínimo Oficial', 'Notas Clave'],
      rows: [
        ['Django 4.2 LTS', 'MySQL 8.0.11+', 'MariaDB 10.4+', 'Soporte LTS estándar previo'],
        ['Django 5.2 LTS', 'MySQL 8.0.11+', 'MariaDB 10.5+', 'Recomendado para producción'],
        ['Django 6.0+', 'MySQL 8.0.11+', 'MariaDB 10.6+', 'Exige características modernas de SQL']
      ]
    },
    keyTakeaway: 'Nunca asumas compatibilidad: si tu servidor MySQL es versión 5.7 o inferior, Django 5.x/6.x bloqueará la ejecución a nivel de migraciones.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Paso 4: PyMySQL como Alternativa a mysqlclient',
    badge: 'Instalación y Hook',
    content: 'El driver oficial recomendado por Django es `mysqlclient` (escrito en C). Si falla su compilación en Windows o Linux, usamos `pymysql` (Python puro) inyectado en el paquete raíz:',
    codeSnippet: {
      filename: 'mi_proyecto/mi_proyecto/__init__.py',
      lang: 'python',
      code: `# 1. Instalar en el entorno virtual:
# pip install pymysql

# 2. Agregar en el archivo __init__.py donde está settings.py:
import pymysql

# Registra PyMySQL para que Django lo reconozca como el módulo nativo MySQLdb
pymysql.install_as_MySQLdb()`,
      explanation: 'install_as_MySQLdb() intercepta la importación de MySQLdb para que el backend mysql de Django use PyMySQL sin alterar su código interno.'
    },
    keyTakeaway: '`pymysql.install_as_MySQLdb()` debe colocarse en el __init__.py del paquete del proyecto para ejecutarse antes de que Django cargue los backends.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Paso 5: Configurar DATABASES en settings.py',
    badge: 'settings.py',
    content: 'Ajusta la configuración del diccionario `DATABASES` con el backend estándar de MySQL de Django y codificación utf8mb4:',
    codeSnippet: {
      filename: 'mi_proyecto/settings.py',
      lang: 'python',
      code: `DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'eventos_db',
        'USER': 'usuario_mysql',
        'PASSWORD': 'tu_password_seguro',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# ⚠️ Buena práctica: en entornos compartidos o productivos, 
# extrae contraseñas y usuarios a variables de entorno (.env).`,
      explanation: 'El charset utf8mb4 garantiza el soporte completo para caracteres Unicode de 4 bytes (incluyendo emojis y caracteres especiales).'
    },
    keyTakeaway: 'El charset "utf8mb4" soporta el juego completo de caracteres Unicode, incluidos emojis y caracteres internacionales.'
  },
  {
    id: 7,
    type: 'code',
    title: 'Paso 6: Validación con manage.py check y migrate',
    badge: 'Verificación',
    content: 'Comprueba el estado del sistema con el validador oficial de Django antes de correr migraciones:',
    codeSnippet: {
      filename: 'Terminal (venv)',
      lang: 'bash',
      code: `(venv) python manage.py check
# System check identified no issues (0 silenced).

(venv) python manage.py migrate
# Operations to perform:
#   Apply all migrations: admin, auth, contenttypes, sessions
# Running migrations:
#   Applying auth.0001_initial... OK

(venv) python manage.py runserver`,
      explanation: 'python manage.py check ejecuta todas las validaciones de configuración e infraestructura sin crear ni alterar tablas.'
    },
    keyTakeaway: '`python manage.py check` ejecuta todas las comprobaciones del sistema sin tocar las tablas de la base de datos.'
  },
  {
    id: 8,
    type: 'summary',
    title: 'Matriz de Solución de Errores Frecuentes',
    badge: 'Troubleshooting',
    content: 'Resumen rápido de las fallas más comunes al integrar MySQL:',
    bulletPoints: [
      '❌ Access denied: Verifica privilegios del usuario MySQL con GRANT ALL ON db.* TO "user"@"%";',
      '❌ Can\'t connect to MySQL server: Revisa que el servicio (MySQL/MariaDB en Laragon, XAMPP o Docker) esté iniciado y escuchando en el puerto 3306.',
      '❌ Error de versión mínima: Actualiza el motor de base de datos a MySQL 8.0.11+ o MariaDB 10.5+.',
      '❌ ModuleNotFoundError MySQLdb: Asegúrate de que `__init__.py` tiene `pymysql.install_as_MySQLdb()` y el entorno virtual está activo.',
      '🛡️ Migraciones previas: Nunca borres carpetas de migraciones para arreglar un error de conexión; haz un backup de tu base de datos primero.'
    ],
    keyTakeaway: 'Sigue el orden: 1. Diagnóstico de versiones → 2. Instalación de PyMySQL → 3. Configuración en settings.py → 4. Validación con manage.py check.'
  }
];
