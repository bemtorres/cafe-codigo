import type { QuizQuestion, InteractionType } from '../../../types/slides';

export type { QuizQuestion, InteractionType };

// ============================================================================
// 1. INTRODUCCIÓN A DJANGO
// ============================================================================
export const introduccionQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: '¿Django incluye un panel de administración web interactivo y un sistema de autenticación de usuarios de forma nativa sin instalar librerías de terceros?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! Es la esencia de la filosofía "Baterías Incluidas": django.contrib.admin y django.contrib.auth vienen listos para usar de fábrica.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Por qué se dice que Django sigue la filosofía de "Baterías Incluidas" (Batteries Included)?',
    options: [
      'Porque incluye de serie ORM, panel admin, autenticación, sesiones, migraciones y protección de seguridad sin requerir extensiones externas',
      'Porque solo funciona en servidores con baterías de respaldo',
      'Porque optimiza el consumo de batería en teléfonos móviles',
      'Porque viene con un compilador de C integrado'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! A diferencia de microframeworks como Flask, Django te entrega todas las piezas necesarias para construir un producto web completo desde el primer minuto.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'El ciclo fundamental de Django consiste en recibir una petición Http________, procesar la lógica de negocio y devolver un HttpResponse.',
    code: `def mi_vista(____): return HttpResponse("Hola")`,
    options: ['request', 'response', 'socket', 'session'],
    correctOption: 0,
    explanation: '¡CORRECTO! El objeto request (instancia de HttpRequest) viaja como primer argumento en cada vista de Django.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja cada framework web de Python con su mejor caso de uso en la industria:',
    pairs: [
      { id: 'p1', left: 'Django', right: 'SaaS completos, portales con base de datos, usuarios y panel admin' },
      { id: 'p2', left: 'FastAPI', right: 'Microservicios y APIs RESTful asíncronas de altísima velocidad' },
      { id: 'p3', left: 'Flask', right: 'Prototipos mínimos o utilidades sin base de datos compleja' }
    ],
    explanation: '¡EXCELENTE! Seleccionar el framework adecuado según los requerimientos del proyecto es una decisión arquitectónica clave.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué vulnerabilidad crítica previene Django de forma automática en todas las consultas realizadas a través del ORM?',
    options: [
      'Inyección SQL (SQL Injection), gracias a que parametriza y escapa automáticamente todos los valores',
      'Ataques de denegación de servicio (DDoS)',
      'Robo físico del servidor de base de datos',
      'Caídas de tensión eléctrica en el servidor'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! El ORM nunca concatena strings en sentencias SQL; utiliza consultas preparadas y parametrizadas que neutralizan cualquier intento de SQL Injection.'
  }
];

// ============================================================================
// 2. PYTHON PARA BACKEND
// ============================================================================
export const pythonParaBackendQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: '¿Instalar paquetes con pip globalmente en el sistema operativo sin usar un entorno virtual (venv) puede provocar conflictos y romper otros proyectos existentes?',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Si dos proyectos requieren versiones incompatibles de Django o librerías secundarias, la instalación global creará un conflicto irresoluble. Los entornos virtuales aíslan cada proyecto.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué comando de terminal congela las versiones exactas de las librerías activas en tu entorno virtual para compartirlas con otros desarrolladores?',
    options: [
      'pip freeze > requirements.txt',
      'python manage.py export_libs',
      'django-admin save-deps',
      'pip install --lock-all'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! "pip freeze > requirements.txt" es el estándar universal en Python. Luego se restaura con "pip install -r requirements.txt".'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para crear un nuevo entorno virtual aislado en una carpeta llamada .venv usamos el módulo nativo:',
    code: `python -m ________ .venv`,
    options: ['venv', 'virtualenv', 'pipenv', 'env'],
    correctOption: 0,
    explanation: '¡CORRECTO! "python -m venv .venv" utiliza el módulo venv integrado en la biblioteca estándar de Python.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja los conceptos de Python con su función directa en Django:',
    pairs: [
      { id: 'p1', left: 'Método __str__', right: 'Representación en texto legible para el panel administrativo' },
      { id: 'p2', left: 'Herencia (models.Model)', right: 'Dota a tu clase de métodos como .save() y .delete()' },
      { id: 'p3', left: 'Decorador (@)', right: 'Envuelve vistas para añadir seguridad como @login_required' }
    ],
    explanation: '¡EXCELENTE! Django utiliza la orientación a objetos y el dinamismo de Python para ofrecer una API elegante y productiva.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué las instancias de este modelo se mostrarán con el texto feo "Vehiculo object (1)" en el panel administrativo de Django?',
    code: `class Vehiculo(models.Model):
    patente = models.CharField(max_length=10)
    marca = models.CharField(max_length=50)`,
    options: [
      'Porque falta implementar el método especial def __str__(self): que devuelva un string descriptivo',
      'Porque max_length no puede ser 10',
      'Porque falta heredar de admin.ModelAdmin',
      'Porque no tiene clave primaria id explícita'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Django invoca str(obj) en sus listas. Si no defines __str__(self), hereda el comportamiento por defecto de Python mostrando el nombre de la clase y su ID.'
  }
];

// ============================================================================
// 3. INTRODUCCIÓN A DJANGO (PROYECTOS Y APPS)
// ============================================================================
export const introduccionDjangoQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En Django, un "Proyecto" es la configuración global completa del sitio, mientras que una "App" es un módulo con una responsabilidad única y reutilizable (ej: catalogo, facturas).',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Esta modularidad permite desacoplar tu código y reutilizar una misma aplicación en múltiples proyectos si fuera necesario.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué comando se utiliza para crear una nueva aplicación modular dentro de tu proyecto Django?',
    options: [
      'python manage.py startapp <nombre>',
      'django-admin newapp <nombre>',
      'python manage.py create-module <nombre>',
      'pip install django-app-<nombre>'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! "python manage.py startapp <nombre>" genera la carpeta de la app con models.py, views.py, admin.py y apps.py.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Si creas una app pero olvidas registrarla en la lista ____________ de settings.py, Django no detectará sus modelos ni migraciones.',
    code: `INSTALLED_APPS = ['mi_app.apps.MiAppConfig', ...]`,
    options: ['INSTALLED_APPS', 'MIDDLEWARE', 'TEMPLATES', 'DATABASES'],
    correctOption: 0,
    explanation: '¡CORRECTO! INSTALLED_APPS es el registro central que le indica a Django qué aplicaciones forman parte activa del proyecto.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona cada archivo generado por Django con su responsabilidad:',
    pairs: [
      { id: 'p1', left: 'manage.py', right: 'Punto de entrada para ejecutar comandos de terminal del proyecto' },
      { id: 'p2', left: 'config/settings.py', right: 'Configuración global de bases de datos, seguridad y apps' },
      { id: 'p3', left: 'config/urls.py', right: 'Enrutador central que despacha tráfico web hacia las apps' }
    ],
    explanation: '¡EXCELENTE! Conocer la estructura de archivos te permite moverte con agilidad en cualquier repositorio de Django.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: 'Creaste el modelo Articulo en blog/models.py, pero al ejecutar "python manage.py makemigrations" Django responde "No changes detected". ¿Cuál es la causa?',
    options: [
      'Olvidaste registrar "blog.apps.BlogConfig" en INSTALLED_APPS dentro de settings.py',
      'models.py solo puede contener un modelo a la vez',
      'Debes reiniciar la computadora',
      'Falta instalar PostgreSQL'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Es el error más frecuente de los principiantes: si la app no está en INSTALLED_APPS, Django la ignora por completo durante las migraciones.'
  }
];

// ============================================================================
// 4. ARQUITECTURA DJANGO (MVT)
// ============================================================================
export const arquitecturaDjangoQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En el patrón MVT de Django, el componente "View" (views.py) equivale a lo que en la arquitectura MVC tradicional se conoce como "Controlador".',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! En Django, la Vista procesa la lógica de negocio y coordina peticiones y respuestas; la presentación visual se delega al Template.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Cuál es el orden cronológico exacto en que una petición web viaja a través de la arquitectura de Django?',
    options: [
      'Navegador → urls.py → views.py → models.py / templates → HttpResponse',
      'Navegador → templates → models.py → views.py → urls.py',
      'Navegador → views.py → urls.py → settings.py → HttpResponse',
      'Navegador → models.py → urls.py → templates → HttpResponse'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! urls.py enruta la URL a la vista correspondiente, la vista consulta el modelo, inyecta los datos en el template y devuelve la respuesta.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'El diccionario con el que la vista le entrega variables al template HTML para renderizarlas se conoce como diccionario de _________.',
    code: `return render(request, 'home.html', {'titulo': 'Hola'})`,
    options: ['contexto', 'payload', 'estado', 'propiedad'],
    correctOption: 0,
    explanation: '¡CORRECTO! El "Contexto" es el puente de datos entre Python y el lenguaje de plantillas DTL.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja cada pilar del patrón MVT con su responsabilidad:',
    pairs: [
      { id: 'p1', left: 'Model (Modelo)', right: 'Guardián de los datos y de la estructura de tablas SQL' },
      { id: 'p2', left: 'View (Vista)', right: 'Cerebro operativo que recibe el request y toma decisiones' },
      { id: 'p3', left: 'Template (Plantilla)', right: 'Capa visual HTML que presenta la información al usuario' }
    ],
    explanation: '¡EXCELENTE! La separación de responsabilidades garantiza que cambiar el diseño visual no afecte la integridad de la base de datos.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué principio de arquitectura MVT se viola si escribes HTML concatenado a mano directamente dentro de tu función en views.py?',
    options: [
      'Viola la separación de capas: la vista debe coordinar lógica y delegar la presentación al motor de templates',
      'Provoca un error de sintaxis en Python 3',
      'Deshabilita el soporte para CSS',
      'Bloquea la conexión a la base de datos'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Mezclar HTML en la vista ensucia el código, imposibilita el trabajo en equipo con diseñadores y vulnera las buenas prácticas de Django.'
  }
];

// ============================================================================
// 4.1 URLS Y ENRUTAMIENTO
// ============================================================================
export const arquitecturaDjangoUrlsQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'El convertidor de ruta "<int:id>" rechaza automáticamente peticiones si el parámetro no está compuesto por dígitos, devolviendo un 404 antes de ejecutar la vista.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Los convertidores de ruta validan y tipan los argumentos en la propia URL, protegiendo a la vista de recibir cadenas inválidas.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Cuál es la función principal de usar "include()" en el archivo central urls.py del proyecto?',
    options: [
      'Delegar el tráfico a los archivos urls.py propios de cada aplicación, manteniendo el proyecto modular y limpio',
      'Importar librerías de JavaScript al frontend',
      'Conectar la base de datos con SQLite',
      'Comprimir imágenes estáticas'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! include() permite que cada aplicación gestione sus propias rutas, evitando un archivo gigantesco e inmantenible.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para generar URLs reversibles e inmunes a cambios de rutas en plantillas HTML se utiliza la etiqueta:',
    code: `<a href="{% ____ 'blog:detalle' post.id %}">Leer</a>`,
    options: ['url', 'link', 'href', 'path'],
    correctOption: 0,
    explanation: '¡CORRECTO! La etiqueta {% url %} calcula la ruta física dinámicamente buscando el nombre asignado en urlpatterns.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona cada convertidor de ruta oficial con el tipo de dato que acepta:',
    pairs: [
      { id: 'p1', left: '<int:id>', right: 'Números enteros positivos (0-9)' },
      { id: 'p2', left: '<slug:slug>', right: 'Letras, números, guiones y guiones bajos (ideal para SEO)' },
      { id: 'p3', left: '<uuid:token>', right: 'Identificadores únicos formateados con guiones de 36 caracteres' }
    ],
    explanation: '¡EXCELENTE! Usar el convertidor adecuado garantiza URLs semánticas y amigables para motores de búsqueda.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué la plantilla falla con el error NoReverseMatch al renderizar: <a href="{% url \'blog:detalle\' %}">?',
    code: `# blog/urls.py
path('posts/<int:id>/', views.detalle, name='detalle')`,
    options: [
      'Porque la ruta define el parámetro obligatorio <int:id> pero no se le pasó ningún valor en la etiqueta {% url %}',
      'Porque la función path() está descontinuada',
      'Porque falta la barra diagonal al final de blog',
      'Porque name debe llamarse obligatoriamente "index"'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Si la regla de enrutamiento exige argumentos, la etiqueta {% url %} debe recibir los valores correspondientes (ej: {% url "blog:detalle" post.id %}).'
  }
];

// ============================================================================
// 4.2 VIEWS (VISTAS)
// ============================================================================
export const arquitecturaDjangoViewsQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'Una vista en Django siempre recibe un objeto HttpRequest como primer argumento y debe retornar obligatoriamente una instancia de HttpResponse.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Es el contrato fundamental del protocolo HTTP: toda petición entrante debe recibir una respuesta formal del servidor.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Por qué es una mala práctica usar Producto.objects.get(id=pk) directamente en una vista sin get_object_or_404?',
    options: [
      'Porque si el ID no existe, lanza una excepción DoesNotExist no controlada que provoca un Error 500 en producción',
      'Porque get() borra el registro de la base de datos',
      'Porque get() solo funciona con claves de tipo texto',
      'Porque get() duplica el consumo de memoria RAM'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! get_object_or_404 intercepta DoesNotExist y responde un código HTTP 404 estándar, protegiendo la estabilidad del servidor.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Tras procesar exitosamente un formulario enviado por POST, la buena práctica HTTP es usar la función ___________ para evitar envíos duplicados con F5.',
    code: `return ________('catalogo:lista')`,
    options: ['redirect', 'render', 'refresh', 'reload'],
    correctOption: 0,
    explanation: '¡CORRECTO! El patrón Post/Redirect/Get (PRG) evita que el usuario reenvíe accidentalmente el formulario al recargar la página.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja los métodos de respuesta con su contenido:',
    pairs: [
      { id: 'p1', left: 'render()', right: 'Compila y devuelve una página web en formato HTML con contexto' },
      { id: 'p2', left: 'JsonResponse()', right: 'Devuelve datos en formato application/json para APIs o scripts' },
      { id: 'p3', left: 'redirect()', right: 'Envía un encabezado HTTP 302 que redirige el navegador a otra URL' }
    ],
    explanation: '¡EXCELENTE! Dominas el catálogo completo de respuestas estándar que maneja un desarrollador backend.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué error fatal provocará esta vista al ser llamada por un navegador?',
    code: `def mi_endpoint(request):
    datos = {"mensaje": "Éxito", "codigo": 200}
    return datos  # ❌ ERROR`,
    options: [
      'Una vista no puede retornar un diccionario crudo de Python; debe retornar un JsonResponse(datos) o HttpResponse',
      'Falta importar json',
      'Los diccionarios no pueden tener claves en español',
      'request debe llamarse req'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Django lanzará un ValueError: "The view didn\'t return an HttpResponse object. It returned a dict instead". Debe envolverse en JsonResponse.'
  }
];

// ============================================================================
// 4.3 TEMPLATES Y DTL
// ============================================================================
export const arquitecturaDjangoTemplateQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En el motor de plantillas de Django (DTL), la etiqueta "{% extends \'base.html\' %}" debe ser obligatoriamente la primera línea de código en las plantillas hijas.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Si colocas cualquier etiqueta HTML o texto antes de {% extends %}, el parser de Django arrojará un error de sintaxis.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Cuál es la sintaxis en DTL para imprimir en el HTML el valor de una variable que viaja en el contexto de la vista?',
    options: [
      '{{ variable }}',
      '{% variable %}',
      '${variable}',
      '<%= variable %>'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Dos llaves {{ }} se usan para evaluar e imprimir variables; llave y porcentaje {% %} se usan para etiquetas de control de flujo.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Dentro de un bucle {% for %}, la etiqueta auxiliar {% ______ %} se ejecuta automáticamente si la colección está vacía o es None.',
    code: `{% for item in items %} ... {% ______ %} <p>Sin registros</p> {% endfor %}`,
    options: ['empty', 'else', 'none', 'default'],
    correctOption: 0,
    explanation: '¡CORRECTO! {% empty %} proporciona una solución elegante y limpia para mostrar estados vacíos sin anidar condicionales if/else.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona cada filtro nativo de DTL con su transformación:',
    pairs: [
      { id: 'p1', left: '{{ fecha|date:"d/m/Y" }}', right: 'Formatea un objeto fecha/hora a formato legible día/mes/año' },
      { id: 'p2', left: '{{ precio|floatformat:2 }}', right: 'Redondea valores numéricos a exactamente dos decimales' },
      { id: 'p3', left: '{{ texto|truncatewords:10 }}', right: 'Corta un texto largo a las primeras 10 palabras con puntos suspensivos' }
    ],
    explanation: '¡EXCELENTE! Los filtros transforman la presentación de los datos sin modificar el valor original en la base de datos.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué la línea <img src="{% static \'img/logo.png\' %}"> arroja un error de plantilla en el navegador?',
    options: [
      'Porque olvidaste incluir la directiva {% load static %} al inicio de la plantilla',
      'Porque las imágenes deben llamarse con {% image %}',
      'Porque static solo soporta archivos de texto plano',
      'Porque falta el atributo width obligatorio'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Para usar la etiqueta {% static %} debes cargar primero la biblioteca de etiquetas estáticas con {% load static %}.'
  }
];

// ============================================================================
// 4.4 EJERCICIOS Y RETOS DE ARQUITECTURA DJANGO
// ============================================================================
export const arquitecturaDjangoTrainingQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'El error "TemplateDoesNotExist" ocurre cuando Django no logra encontrar el archivo .html en las rutas configuradas en TEMPLATES o en las carpetas templates/ de las apps registradas.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Suele deberse a un error tipográfico en el nombre del archivo o a haber olvidado registrar la app en INSTALLED_APPS.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué provoca el error "403 Forbidden (CSRF verification failed)" al enviar un formulario en Django?',
    options: [
      'Olvidar colocar la etiqueta {% csrf_token %} dentro del <form method="POST">',
      'No tener conexión a internet',
      'Escribir la contraseña con caracteres especiales',
      'Que el servidor tenga la memoria RAM llena'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Django protege todos los envíos POST contra Cross-Site Request Forgery. Sin el token de sesión, la petición es bloqueada por seguridad.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'En desarrollo local, para ver la pantalla amarilla detallada con el archivo y línea exacta del error, nos aseguramos de que en settings.py la variable _________ sea True.',
    code: `_________ = True  # Solo en desarrollo`,
    options: ['DEBUG', 'TESTING', 'VERBOSE', 'DEVELOPMENT'],
    correctOption: 0,
    explanation: '¡CORRECTO! DEBUG=True activa la traza completa de excepciones en el navegador. En producción DEBE ser False para no filtrar secretos.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja los códigos de error web con su causa técnica:',
    pairs: [
      { id: 'p1', left: '404 Not Found', right: 'La URL solicitada no coincide con ninguna regla en urlpatterns' },
      { id: 'p2', left: '500 Server Error', right: 'Excepción no controlada en el código Python de tu vista' },
      { id: 'p3', left: '403 Forbidden', right: 'Falta del token CSRF o credenciales insuficientes' }
    ],
    explanation: '¡EXCELENTE! Saber interpretar el código de estado agiliza el diagnóstico de problemas en un 90%.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué elemento de seguridad indispensable le falta a este formulario HTML?',
    code: `<form method="POST" action="{% url 'crear_cuenta' %}">
    <input type="text" name="usuario">
    <button type="submit">Registrar</button>
</form>`,
    options: [
      'Falta la etiqueta {% csrf_token %} requerida para validar la autenticidad del envío POST',
      'Falta el atributo id en el form',
      'action debe ser una URL externa',
      'button debe ser de tipo reset'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Todo formulario con method="POST" en Django debe incluir {% csrf_token %} inmediatamente tras abrir la etiqueta <form>.'
  }
];

// ============================================================================
// 5.2 CASO PRÁCTICO BIBLIOTECA Y ORM
// ============================================================================
export const modeloBdLibraryQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En el ORM de Django, select_related() optimiza consultas de claves foráneas (ForeignKey) realizando un INNER JOIN en una sola consulta SQL.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! select_related resuelve el problema de las N+1 consultas uniendo las tablas en el motor relacional antes de retornar los datos.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué efecto tiene definir on_delete=models.PROTECT en la ForeignKey de Autor dentro del modelo Libro?',
    options: [
      'Impide borrar físicamente al Autor si todavía tiene Libros asociados en el catálogo, lanzando ProtectedError',
      'Borra automáticamente todos los libros del autor',
      'Convierte el autor en un usuario administrador',
      'Oculta el libro en el panel de administración'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! PROTECT garantiza la integridad referencial impidiendo que un borrado accidental deje registros huérfanos o destruya el catálogo en cascada.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para buscar libros cuyo título contenga una palabra clave sin importar mayúsculas o minúsculas usamos el lookup:',
    code: `Libro.objects.filter(titulo_____________='django')`,
    options: ['icontains', 'contains', 'iexact', 'startswith'],
    correctOption: 0,
    explanation: '¡CORRECTO! La "i" inicial en icontains significa "case-insensitive" (insensible a mayúsculas y minúsculas).'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja los tipos de relaciones de modelos con su implementación:',
    pairs: [
      { id: 'p1', left: 'ForeignKey (1 a N)', right: 'Columna con clave foránea en la tabla hija con índice' },
      { id: 'p2', left: 'ManyToManyField (N a M)', right: 'Tabla intermedia automática (Join Table) con 2 claves' },
      { id: 'p3', left: 'OneToOneField (1 a 1)', right: 'Clave foránea con restricción de unicidad (UNIQUE)' }
    ],
    explanation: '¡EXCELENTE! Has conectado con precisión cómo cada relación relacional se materializa físicamente en el motor de base de datos.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué grave problema de rendimiento tiene el siguiente código si hay 500 libros en la base de datos?',
    code: `libros = Libro.objects.all()
for libro in libros:
    print(libro.autor.nombre)`,
    options: [
      'El problema de las N+1 consultas: ejecuta 501 consultas SQL independientes a la BD; se resuelve con select_related("autor")',
      'El bucle for no soporta QuerySets',
      'No se pueden imprimir nombres de autores',
      'Libro.objects.all() arroja error de memoria'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Cada iteración de libro.autor dispara una nueva consulta a la base de datos. Con select_related("autor") se reduce a 1 sola consulta SQL con JOIN.'
  }
];

// ============================================================================
// 6. DJANGO ADMIN Y CRUD
// ============================================================================
export const adminCrudQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'La librería "django-unfold" debe colocarse obligatoriamente ANTES de "django.contrib.admin" en INSTALLED_APPS para que sus plantillas modernas de Tailwind CSS tomen prioridad.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! El cargador de plantillas de Django respeta el orden de INSTALLED_APPS. Si unfold va después, Django cargará primero el diseño clásico de 2005.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué atributo de ModelAdmin permite editar campos como el estado o kilometraje directamente en la tabla sin necesidad de abrir la ficha individual de cada registro?',
    options: [
      'list_editable',
      'list_display',
      'table_inputs',
      'inline_edit'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! list_editable convierte las celdas en inputs y dropdowns interactivos para modificar y guardar múltiples registros en lote estilo Excel.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Para editar los registros relacionados (hijos) dentro de la misma pantalla del modelo padre usamos admin._______________.',
    code: `class MantenimientoInline(admin._______________): model = Mantenimiento`,
    options: ['TabularInline', 'StackedModel', 'ChildInline', 'SubTable'],
    correctOption: 0,
    explanation: '¡CORRECTO! TabularInline y StackedInline implementan el patrón maestro-detalle directamente dentro del formulario del registro padre.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona las herramientas de ModelAdmin con su impacto operativo:',
    pairs: [
      { id: 'p1', left: 'list_display', right: 'Reemplaza objetos crudos por columnas formateadas y legibles' },
      { id: 'p2', left: 'search_fields', right: 'Habilita buscador en tiempo real en campos propios y relaciones' },
      { id: 'p3', left: '@admin.action', right: 'Automatiza procesos masivos para procesar 100 registros en 1 clic' }
    ],
    explanation: '¡EXCELENTE! Con estas herramientas transformas una simple tabla en un sistema ERP/CRM de productividad empresarial.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué un modelo registrado únicamente con "admin.site.register(Vehiculo)" se considera un "Admin Ciego"?',
    options: [
      'Porque muestra filas opacas como "Vehiculo object (1)", sin buscador, sin filtros laterales y sin columnas de información útil',
      'Porque solo los usuarios ciegos pueden leerlo',
      'Porque deshabilita el mouse en el navegador',
      'Porque borra los datos cada 10 minutos'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! El registro básico no aporta valor de negocio. Siempre debemos acompañarlo de una clase ModelAdmin profesional.'
  }
];

// ============================================================================
// 7. SEGURIDAD Y AUTENTICACIÓN
// ============================================================================
export const seguridadQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'Django almacena las contraseñas de los usuarios utilizando el algoritmo PBKDF2 con hash SHA256 y un salt criptográfico único por usuario, jamás en texto plano.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Incluso si un atacante obtiene un volcado de la base de datos, no podrá leer las contraseñas reales de los usuarios.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué decorador de vista bloquea el acceso a usuarios anónimos y los redirige automáticamente a la pantalla de inicio de sesión?',
    options: [
      '@login_required',
      '@auth_protect',
      '@user_only',
      '@secure_endpoint'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! @login_required protege la vista y añade el parámetro ?next=/ruta-original/ para recordar adónde quería ir el usuario.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'Antes de publicar tu proyecto Django en internet, el parámetro ________ en settings.py debe cambiarse estrictamente a False.',
    code: `________ = False  # Obligatorio en servidores públicos`,
    options: ['DEBUG', 'SECURITY', 'PROD', 'SECRET'],
    correctOption: 0,
    explanation: '¡CORRECTO! Dejar DEBUG=True en internet expone secretos de configuración, consultas SQL y variables de entorno ante cualquier error.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja las defensas de Django con los ataques web que neutralizan:',
    pairs: [
      { id: 'p1', left: '{% csrf_token %}', right: 'Ataques de falsificación de petición en sitios cruzados (CSRF)' },
      { id: 'p2', left: 'Consultas parametrizadas del ORM', right: 'Inyección de sentencias SQL maliciosas (SQLi)' },
      { id: 'p3', left: 'Middleware X-Frame-Options: DENY', right: 'Ataques de secuestro de clics en iframes (Clickjacking)' }
    ],
    explanation: '¡EXCELENTE! Django ofrece protección proactiva frente a las vulnerabilidades más peligrosas del Top 10 de OWASP.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué es una vulnerabilidad crítica crear un usuario con User.objects.create(username="ana", password="123")?',
    options: [
      'Porque guarda la contraseña en texto plano sin hashear; se debe usar User.objects.create_user()',
      'Porque la contraseña debe tener al menos 20 caracteres',
      'Porque username no puede ser un nombre de mujer',
      'Porque falta el correo electrónico'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! El método create() no cifra la contraseña. El método oficial create_user() aplica automáticamente el algoritmo de hashing seguro PBKDF2.'
  }
];

// ============================================================================
// 8. APIS RESTFUL
// ============================================================================
export const apisRestfulQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En una API RESTful, las URLs deben representar recursos en sustantivo (ej: /api/vehiculos/) y la acción a ejecutar la determina el verbo HTTP (GET, POST, DELETE).',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! En REST, nunca creamos URLs como /api/borrarVehiculo4. Usamos DELETE /api/vehiculos/4/.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué código de estado HTTP estándar debe devolver una API tras crear exitosamente un nuevo registro en la base de datos mediante POST?',
    options: [
      '201 Created',
      '200 OK',
      '204 No Content',
      '202 Accepted'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! 201 Created indica formalmente que la petición fue procesada y un nuevo recurso fue materializado en el servidor.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'La clase nativa de Django que devuelve respuestas con encabezado Content-Type: application/json se llama ____________.',
    code: `return ____________({'mensaje': 'Operación exitosa'})`,
    options: ['JsonResponse', 'HttpResponse', 'JSONView', 'RestResponse'],
    correctOption: 0,
    explanation: '¡CORRECTO! JsonResponse convierte diccionarios y listas a formato JSON y fija los encabezados HTTP apropiados.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja los verbos HTTP con su acción semántica:',
    pairs: [
      { id: 'p1', left: 'GET', right: 'Consultar o listar datos sin alterar el estado del servidor' },
      { id: 'p2', left: 'POST', right: 'Crear un nuevo recurso en la base de datos' },
      { id: 'p3', left: 'DELETE', right: 'Eliminar permanentemente el recurso especificado' }
    ],
    explanation: '¡EXCELENTE! El uso correcto de verbos HTTP garantiza que clientes móviles y frontend entiendan el contrato de tu API.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué práctica anti-patrón comete un desarrollador si devuelve código 200 OK cuando los datos enviados por el cliente son inválidos?',
    options: [
      'Debe devolver código 400 Bad Request para que el cliente detecte el error en sus interceptores HTTP',
      'Debe devolver código 500 Server Error',
      'Debe reiniciar el servidor',
      'No hay ningún problema, 200 siempre es correcto'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Devolver 200 OK con un cuerpo {"error": "campo requerido"} confunde a librerías como Axios o Fetch. Los errores de validación de cliente deben ser 400 Bad Request.'
  }
];

// ============================================================================
// 9. DRF Y JWT
// ============================================================================
export const drfJwtQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En autenticación JWT, el servidor no necesita guardar registros de sesión en la base de datos; solo valida la firma criptográfica del token recibido en la petición.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Los JWT son tokens "sin estado" (stateless). El propio token contiene los datos y la firma verificable con la SECRET_KEY.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué clase de Django REST Framework permite generar los 5 endpoints CRUD completos (listar, crear, ver, editar, borrar) en una sola definición?',
    options: [
      'viewsets.ModelViewSet',
      'views.APIView',
      'generics.ListCreateAPIView',
      'serializers.ModelSerializer'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! ModelViewSet unifica la lógica de los 5 métodos estándar y se combina con DefaultRouter para crear las URLs automáticamente.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'El token de corta duración (ej: 15 minutos) que viaja en el encabezado Authorization: Bearer se conoce como _________ Token.',
    code: `Authorization: Bearer <_______-token>`,
    options: ['Access', 'Refresh', 'Static', 'Master'],
    correctOption: 0,
    explanation: '¡CORRECTO! El Access Token valida las peticiones regulares; el Refresh Token permite obtener un nuevo Access Token cuando expira.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona cada componente de Django REST Framework con su rol:',
    pairs: [
      { id: 'p1', left: 'ModelSerializer', right: 'Traduce modelos a JSON y valida datos entrantes con reglas de BD' },
      { id: 'p2', left: 'DefaultRouter', right: 'Genera las rutas REST estándar y la interfaz Browsable API' },
      { id: 'p3', left: 'IsAuthenticated', right: 'Clase de permiso que exige un token o sesión válida para entrar' }
    ],
    explanation: '¡EXCELENTE! DRF es la herramienta más potente del ecosistema Python para construir APIs REST profesionales.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué la API rechaza con 401 Unauthorized una petición si el cliente envía el header: "Authorization: eyJhbGciOi..."?',
    options: [
      'Porque falta la palabra clave "Bearer " antes de la cadena del token (ej: "Authorization: Bearer eyJhbG...")',
      'Porque el token no debe enviarse en los headers',
      'Porque DRF no soporta tokens en mayúsculas',
      'Porque falta el parámetro ?token= en la URL'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! El estándar RFC 6750 exige el prefijo "Bearer " para identificar el tipo de credencial portadora.'
  }
];

// ============================================================================
// 10. PROYECTO INTEGRADOR Y DESPLIEGUE
// ============================================================================
export const proyectoIntegradorQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'La clave SECRET_KEY y las credenciales de base de datos nunca deben guardarse en el código fuente ni subirse a Git; deben cargarse desde variables de entorno (.env).',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡VERDADERO! Subir contraseñas a repositorios públicos o privados es una de las principales causas de brechas de seguridad en la industria.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué comando de Django recolecta todos los archivos estáticos (CSS, JS, imágenes) de todas las aplicaciones en la carpeta única STATIC_ROOT para producción?',
    options: [
      'python manage.py collectstatic',
      'python manage.py build-assets',
      'django-admin compile-static',
      'python manage.py compress'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! collectstatic reúne todos los activos estáticos para que servidores como Nginx o librerías como Whitenoise puedan servirlos a máxima velocidad.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: 'El comando oficial que audita tu archivo settings.py para verificar que no existan vulnerabilidades antes de pasar a producción es: python manage.py check --________.',
    code: `python manage.py check --________`,
    options: ['deploy', 'production', 'security', 'audit'],
    correctOption: 0,
    explanation: '¡CORRECTO! "python manage.py check --deploy" realiza un diagnóstico riguroso de cookies seguras, SSL y variables críticas.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Empareja las herramientas de despliegue con su función técnica:',
    pairs: [
      { id: 'p1', left: 'Gunicorn', right: 'Servidor WSGI de alta concurrencia que ejecuta procesos de Python' },
      { id: 'p2', left: 'Whitenoise', right: 'Middleware que sirve estáticos comprimidos sin requerir Nginx' },
      { id: 'p3', left: 'python-dotenv', right: 'Carga variables de entorno secretas desde un archivo .env local' }
    ],
    explanation: '¡EXCELENTE! Esta combinación forma el stack de despliegue más ágil, moderno y confiable para aplicaciones Django.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué es un grave riesgo de seguridad configurar ALLOWED_HOSTS = ["*"] cuando DEBUG = False en producción?',
    options: [
      'Permite ataques de HTTP Host Header Poisoning para envenenar enlaces de reseteo de contraseñas y caché',
      'Porque Django solo acepta nombres de dominios con menos de 10 letras',
      'Porque ralentiza la conexión Wi-Fi del servidor',
      'Porque bloquea las peticiones HTTPS'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! ALLOWED_HOSTS debe contener exclusivamente tus dominios legítimos (ej: ["flotaexpress.cl", "api.flotaexpress.cl"]) para evitar falsificación de host.'
  }
];

// ============================================================================
// REGISTRO Y SELECTOR DE QUIZ POR LECCIÓN
// ============================================================================
export const modeloBdQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/5) · TrueFalse',
    questionText: '¿En Django, definir blank=True altera físicamente la columna en la base de datos SQL permitiendo valores NULL?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! blank solo valida formularios y el admin en Python. Para permitir valores nulos a nivel de base de datos SQL se debe usar null=True.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/5) · MultipleChoice',
    questionText: '¿Por qué se debe usar obligatoriamente models.DecimalField en lugar de models.FloatField para almacenar precios o dinero?',
    options: [
      'Porque FloatField produce micro-errores de redondeo binario (IEEE 754) que descuadran cuentas contables',
      'Porque FloatField solo soporta números enteros en PostgreSQL',
      'Porque DecimalField no ocupa espacio en disco',
      'Porque FloatField está descontinuado en Python 3'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Los números float sufren imprecisión binaria (0.1 + 0.2 = 0.30000000000000004). DecimalField garantiza precisión fija exacta.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (3/5) · FillInTheBlank',
    questionText: '¿Qué comando de Django permite auditar el código SQL exacto que generará una migración sin ejecutarla físicamente?',
    code: `python manage.py ________ blog 0001`,
    options: ['sqlmigrate', 'makemigrations', 'migrate', 'inspectdb'],
    correctOption: 0,
    explanation: '¡CORRECTO! python manage.py sqlmigrate <app> <numero> traduce la migración a código SQL puro según tu motor de base de datos.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/5) · MatchPairs',
    questionText: 'Relaciona cada tipo de relación con su impacto físico en la base de datos SQL:',
    pairs: [
      { id: 'p1', left: 'ForeignKey (1 a N)', right: 'Columna física _id en tabla hija + índice B-Tree' },
      { id: 'p2', left: 'OneToOneField (1 a 1)', right: 'Columna física _id con restricción UNIQUE' },
      { id: 'p3', left: 'ManyToManyField (N a M)', right: 'Tercera tabla intermedia (Join Table) con 2 FKs' }
    ],
    explanation: '¡EXCELENTE! Has conectado con precisión cómo cada relación de Django se materializa físicamente en el motor relacional.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Quiz (5/5) · FindTheBug',
    questionText: '¿Qué error de diseño y buena práctica presenta este campo de modelo?',
    code: `titulo = models.CharField(max_length=120, null=True, blank=True)`,
    options: [
      'Django desaconseja null=True en CharField para evitar tener dos valores vacíos diferentes ("" y NULL)',
      'Falta definir primary_key=True',
      'max_length no puede superar 100 caracteres',
      'No se puede combinar max_length con blank=True'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! La regla de oro oficial de Django prohíbe null=True en campos de texto (CharField y TextField). Para campos opcionales solo debe usarse blank=True.'
  }
];

export const modeloBdStepQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: '¿En un sistema de ventas, es una buena práctica omitir el campo precio_unitario en DetalleBoleta y leer siempre detalle.producto.precio en vivo?',
    correctAnswer: false,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡FALSO! Es un error financiero grave. Violaría el principio de snapshot: si el precio del producto sube en el futuro, las ventas históricas de meses anteriores alterarían su valor indebidamente.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: 'Al agregar una nueva ForeignKey de Cliente a una tabla Boleta con 50.000 ventas previas en producción, ¿por qué es indispensable usar null=True?',
    options: [
      'Para que la base de datos ejecute ALTER TABLE ... ADD COLUMN ... NULL sin bloquear la tabla ni exigir valores por defecto forzados',
      'Porque Django no soporta claves foráneas en tablas con más de 100 filas',
      'Para que las boletas se borren automáticamente si el cliente no existe',
      'Porque null=True convierte la columna en tipo VARCHAR'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Si la columna no admite nulos (null=False), la migración se detiene exigiendo un valor por defecto que no existe para ventas anónimas previas.'
  },
  {
    id: 3,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (3/5) · FillInTheBlank',
    questionText: '¿Qué flag de makemigrations crea un archivo de migración en blanco para programar una migración de datos con RunPython?',
    code: `python manage.py makemigrations ventas ________ --name sembrar_datos`,
    options: ['--empty', '--fake', '--merge', '--dry-run'],
    correctOption: 0,
    explanation: '¡CORRECTO! El flag --empty genera el andamiaje básico de migración sin operaciones DDL automáticas, listo para usar migrations.RunPython.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Desafío (4/5) · MatchPairs',
    questionText: 'Relaciona cada herramienta de migración y modelo con su rol técnico fundamental:',
    pairs: [
      { id: 'p1', left: 'on_delete=models.PROTECT', right: 'Impide borrar el registro padre si tiene hijos' },
      { id: 'p2', left: 'models.CheckConstraint', right: 'Valida reglas matemáticas a nivel de motor SQL' },
      { id: 'p3', left: 'migrations.RunPython', right: 'Ejecuta siembra de datos con apps.get_model()' }
    ],
    explanation: '¡EXCELENTE! Has relacionado con maestría los tres pilares de integridad en migraciones evolutivas.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Qué error crítico de arquitectura presenta esta función dentro de una migración de datos?',
    code: `def sembrar(apps, schema_editor):
    from ventas.models import Categoria  # ❌ ERROR
    Categoria.objects.create(nombre="Bebidas")`,
    options: [
      'Nunca se debe importar el modelo directamente; se debe usar Categoria = apps.get_model("ventas", "Categoria")',
      'Falta importar django.db.models',
      'No se pueden usar métodos ORM dentro de una migración',
      'create() está prohibido en migraciones de datos'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Si importas el modelo directamente desde models.py, la migración fallará en el futuro si el modelo cambia de campos. apps.get_model() usa el estado histórico exacto de esa migración.'
  }
];

export const modeloBdVehiculosQuiz: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Desafío (1/5) · TrueFalse',
    questionText: 'En la relación de flota, usar on_delete=models.SET_NULL (con null=True) evita que los camiones se borren de la base de datos si se da de baja a un piloto.',
    correctAnswer: true,
    labels: { trueText: 'VERDADERO', falseText: 'FALSO' },
    explanation: '¡CORRECTO! models.SET_NULL convierte el campo piloto_asignado_id a NULL en la base de datos sin destruir el vehículo, protegiendo los activos físicos de la empresa.'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Desafío (2/5) · MultipleChoice',
    questionText: '¿Qué comando de Django permite inspeccionar el código SQL real (CREATE TABLE o ALTER TABLE) antes de ejecutar migrate?',
    options: [
      'python manage.py sqlmigrate <app> <migracion>',
      'python manage.py showmigrations --sql',
      'python manage.py makemigrations --dry-run',
      'python manage.py dbshell --preview'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! sqlmigrate muestra con total precisión las sentencias SQL que tu motor (PostgreSQL, SQLite, MySQL) recibirá al ejecutar la migración.'
  },
  {
    id: 3,
    kind: 'MatchPairs',
    title: '🧪 Desafío (3/5) · MatchPairs',
    questionText: 'Empareja cada herramienta o concepto con su responsabilidad en el proyecto de flota:',
    pairs: [
      { id: 'p1', left: 'models.SET_NULL', right: 'Preserva vehículos si despiden al piloto' },
      { id: 'p2', left: 'TextChoices', right: 'Define estados estándar (DISPONIBLE, EN_RUTA)' },
      { id: 'p3', left: 'CheckConstraint', right: 'Valida en SQL que el kilometraje sea >= 0' }
    ],
    explanation: '¡Excelente! Cada herramienta atiende una capa clave: integridad relacional, reglas del motor y productividad de pruebas.'
  },
  {
    id: 4,
    kind: 'FillInTheBlank',
    title: '🧪 Desafío (4/5) · FillInTheBlank',
    questionText: 'Para asegurar que la creación de múltiples registros con Faker sea atómica (todo o nada), envolvemos el proceso en "with transaction.____():".',
    code: `with transaction.____():`,
    options: ['atomic', 'commit', 'rollback', 'safe'],
    correctOption: 0,
    explanation: '¡CORRECTO! transaction.atomic() abre una transacción de base de datos; si ocurre cualquier excepción, realiza un ROLLBACK total.'
  },
  {
    id: 5,
    kind: 'FindTheBug',
    title: '🧪 Desafío (5/5) · FindTheBug',
    questionText: '¿Por qué la siguiente vista es una vulnerabilidad crítica de seguridad?',
    code: `# flota/views.py
def poblar_flota(request):
    fake = Faker()
    for _ in range(1000): ...
    return HttpResponse("Listo")`,
    options: [
      'No tiene protección de entorno (if not settings.DEBUG) ni control de autenticación, permitiendo que cualquiera sature la BD en producción',
      'Faker no puede usarse dentro de un archivo views.py',
      'Falta importar django.db.models',
      'HttpResponse no soporta texto simple'
    ],
    correctOption: 0,
    explanation: '¡CORRECTO! Los endpoints de generación de datos falsos deben estar estrictamente bloqueados con if not settings.DEBUG o requerir permisos administrativos de staff.'
  }
];

export function getQuizForLesson(lessonSlug: string): QuizQuestion[] {
  const normalized = lessonSlug.replace(/^\/+|\/+$/g, '');

  switch (normalized) {
    case 'introduccion':
      return introduccionQuiz;

    case 'python-para-backend':
      return pythonParaBackendQuiz;

    case 'introduccion-django':
      return introduccionDjangoQuiz;

    case 'arquitectura-django':
      return arquitecturaDjangoQuiz;

    case 'arquitectura-django/urls':
    case 'arquitectura-django-urls':
      return arquitecturaDjangoUrlsQuiz;

    case 'arquitectura-django/views':
    case 'arquitectura-django-views':
      return arquitecturaDjangoViewsQuiz;

    case 'arquitectura-django/template':
    case 'arquitectura-django-template':
      return arquitecturaDjangoTemplateQuiz;

    case 'arquitectura-django/training':
    case 'arquitectura-django-training':
      return arquitecturaDjangoTrainingQuiz;

    case 'modelo-bd':
      return modeloBdQuiz;

    case 'modelo-bd-step':
    case 'modelo-bd/step':
      return modeloBdStepQuiz;

    case 'modelo-bd-library':
    case 'modelo-bd/library':
      return modeloBdLibraryQuiz;

    case 'modelo-bd-vehiculos':
    case 'modelo-bd/vehiculos':
      return modeloBdVehiculosQuiz;

    case 'admin-crud':
      return adminCrudQuiz;

    case 'seguridad':
      return seguridadQuiz;

    case 'apis-restful':
      return apisRestfulQuiz;

    case 'drf-jwt':
      return drfJwtQuiz;

    case 'proyecto-integrador':
      return proyectoIntegradorQuiz;

    default:
      return modeloBdQuiz;
  }
}
