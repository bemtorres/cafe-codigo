export interface DjangoQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface DjangoQuizDefinition {
  key: string;
  title: string;
  questions: DjangoQuizQuestion[];
}

export const djangoQuizBank: Record<string, DjangoQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: Introducción al Backend con Django',
    questions: [
      {
        prompt: '¿Cuál de los siguientes describe mejor el backend?',
        options: ['La interfaz visual de una app', 'El servidor y la lógica que procesa solicitudes', 'El diseño gráfico del sitio', 'Un conjunto de estilos CSS'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué protocolo se utiliza normalmente para navegar en la web?',
        options: ['FTP', 'SMTP', 'HTTP', 'SSH'],
        correctIndex: 2,
      },
      {
        prompt: 'En una aplicación Django, ¿qué archivo suele necesitarse para ejecutar comandos del proyecto?',
        options: ['manage.py', 'app.py', 'settings.py', 'index.html'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué es una petición (request)?',
        options: ['Una respuesta del servidor', 'El mensaje que envía el cliente al servidor', 'Un archivo estático', 'Un recurso de la base de datos'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cuál es el propósito de una API RESTful?',
        options: ['Crear estilos CSS', 'Enviar y recibir datos entre aplicaciones', 'Mostrar animaciones en el navegador', 'Gestionar sesiones del sistema operativo'],
        correctIndex: 1,
      },
    ],
  },
  'python-para-backend': {
    key: 'python-para-backend',
    title: 'Quiz: Python para Backend',
    questions: [
      {
        prompt: '¿Qué tipo de dato representa la cadena de texto "hola" en Python?',
        options: ['int', 'str', 'bool', 'list'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cuál de estas estructuras se usa para agrupar pares de clave y valor?',
        options: ['list', 'tuple', 'dict', 'set'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué devuelve la función len([1, 2, 3])?',
        options: ['2', '3', '4', 'Error'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo defines una función en Python?',
        options: ['function nombre():', 'def nombre():', 'fun nombre():', 'lambda nombre():'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo conviertes el texto "10" a número entero?',
        options: ['toInt("10")', 'int("10")', 'parseInt("10")', 'str(10)'],
        correctIndex: 1,
      },
    ],
  },
  'introduccion-django': {
    key: 'introduccion-django',
    title: 'Quiz: Introducción a Django',
    questions: [
      {
        prompt: '¿Qué comando se usa para crear un proyecto Django?',
        options: ['django startproject', 'python manage.py startproject', 'django-admin startproject', 'pip install django'],
        correctIndex: 2,
      },
      {
        prompt: '¿Cómo se llaman las aplicaciones dentro de un proyecto Django?',
        options: ['modules', 'apps', 'components', 'services'],
        correctIndex: 1,
      },
      {
        prompt: '¿Dónde se definen las aplicaciones instaladas en Django?',
        options: ['urls.py', 'settings.py', 'models.py', 'views.py'],
        correctIndex: 1,
      },
      {
        prompt: 'El archivo settings.py de Django controla:',
        options: ['solo los estilos', 'las rutas de templates, la base de datos y apps instaladas', 'la apariencia del admin', 'la carga de JavaScript'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué comando arranca el servidor de desarrollo en Django?',
        options: ['python manage.py runserver', 'django-admin runserver', 'python runserver', 'manage.py startserver'],
        correctIndex: 0,
      },
    ],
  },
  'arquitectura-django': {
    key: 'arquitectura-django',
    title: 'Quiz: Arquitectura Django',
    questions: [
      {
        prompt: '¿Qué significa MVT en Django?',
        options: ['Modelo, Vista, Template', 'Modelo, Vista, Transacción', 'Modelo, Variable, Template', 'Modulo, Vista, Template'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué archivo se usa para convertir una URL en una view?',
        options: ['models.py', 'urls.py', 'templates.html', 'admin.py'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué función se usa para devolver un template renderizado?',
        options: ['render()', 'respond()', 'template()', 'view()'],
        correctIndex: 0,
      },
      {
        prompt: 'En Django, ¿qué elemento define cómo se muestra el contenido HTML?',
        options: ['Model', 'View', 'Template', 'URL'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué método HTTP se usa normalmente para enviar un formulario que crea datos?',
        options: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        correctIndex: 1,
      },
    ],
  },
  'modelo-bd': {
    key: 'modelo-bd',
    title: 'Quiz: Modelos y Bases de Datos',
    questions: [
      {
        prompt: '¿Qué clase base usan los modelos de Django?',
        options: ['Document', 'Model', 'Database', 'Schema'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se define una relación uno a muchos en Django?',
        options: ['ManyToManyField', 'OneToOneField', 'ForeignKey', 'RelationField'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué comando crea las migraciones después de cambiar un modelo?',
        options: ['makemigrations', 'migrate', 'create migrations', 'syncdb'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué método se usa para consultar todos los registros de un modelo?',
        options: ['Model.objects.all()', 'Model.query()', 'Model.fetchAll()', 'Model.getAll()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué campo es ideal para almacenar texto corto?',
        options: ['TextField', 'CharField', 'IntegerField', 'DateTimeField'],
        correctIndex: 1,
      },
    ],
  },
  'admin-crud': {
    key: 'admin-crud',
    title: 'Quiz: Django Admin y CRUD',
    questions: [
      {
        prompt: '¿Qué archivo registra un modelo para que aparezca en el admin?',
        options: ['views.py', 'admin.py', 'models.py', 'settings.py'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué operación CRUD corresponde a editar un registro?',
        options: ['Create', 'Read', 'Update', 'Delete'],
        correctIndex: 2,
      },
      {
        prompt: 'En un formulario Django, ¿qué elemento muestra los errores de validación?',
        options: ['clean()', 'errors', 'is_valid()', 'validate()'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se elimina un registro usando el ORM?',
        options: ['delete()', 'remove()', 'destroy()', 'drop()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué view de Django mejora el CRUD al usar formularios y listas?',
        options: ['Function based view', 'Generic class based view', 'TemplateView', 'StaticView'],
        correctIndex: 1,
      },
    ],
  },
  'seguridad': {
    key: 'seguridad',
    title: 'Quiz: Autenticación y Seguridad',
    questions: [
      {
        prompt: '¿Qué decorador protege una view para que solo usuarios autenticados la vean?',
        options: ['@login_required', '@authenticated', '@secure', '@permission_required'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué protege Django contra falsificación de peticiones?',
        options: ['CORS', 'CSRF token', 'JWT', 'SSL'],
        correctIndex: 1,
      },
      {
        prompt: '¿Dónde se almacena la configuración de la base de datos en un proyecto Django?',
        options: ['models.py', 'views.py', 'settings.py', 'urls.py'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué elemento almacena la contraseña de un usuario de forma segura?',
        options: ['Texto plano', 'Hash', 'Base64', 'Archivo CSV'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué tipo de vulnerabilidad evita el uso correcto de parámetros en consultas ORM?',
        options: ['XSS', 'CSRF', 'SQL Injection', 'DDoS'],
        correctIndex: 2,
      },
    ],
  },
  'apis-restful': {
    key: 'apis-restful',
    title: 'Quiz: APIs RESTful',
    questions: [
      {
        prompt: '¿Qué método HTTP se usa para eliminar un recurso?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctIndex: 3,
      },
      {
        prompt: '¿Qué formato es común para intercambiar datos con APIs?',
        options: ['HTML', 'JSON', 'CSS', 'JPEG'],
        correctIndex: 1,
      },
      {
        prompt: 'Un endpoint RESTable que devuelve un recurso individual normalmente usa:',
        options: ['POST /api/recursos', 'GET /api/recursos/1', 'PUT /api/recursos', 'DELETE /api/recursos'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué código de estado indica que una creación fue exitosa?',
        options: ['200', '201', '400', '404'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué significa que una API sea stateless?',
        options: ['No guarda estado entre peticiones', 'Solo usa cookies', 'Requiere un servidor dedicado', 'No usa autenticación'],
        correctIndex: 0,
      },
    ],
  },
  'drf-jwt': {
    key: 'drf-jwt',
    title: 'Quiz: Django REST Framework y JWT',
    questions: [
      {
        prompt: '¿Qué biblioteca se usa para serializar modelos en Django REST Framework?',
        options: ['Serializer', 'ModelSerializer', 'JSONSerializer', 'ViewSerializer'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué significa JWT?',
        options: ['JSON Web Token', 'Java Web Token', 'Jupyter Web Token', 'JavaScript Web Token'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es el propósito del token de acceso?',
        options: ['Cambiar la apariencia de la app', 'Autenticar peticiones', 'Enviar plantillas HTML', 'Actualizar la base de datos'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué view set ayuda a crear CRUD con menos esfuerzo en DRF?',
        options: ['APIView', 'ViewSet', 'FunctionView', 'TemplateView'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué tipo de permiso permite el acceso solo a usuarios autenticados?',
        options: ['AllowAny', 'IsAuthenticated', 'IsAdminUser', 'ReadOnly'],
        correctIndex: 1,
      },
    ],
  },
  'proyecto-integrador': {
    key: 'proyecto-integrador',
    title: 'Quiz: Proyecto Integrador Django',
    questions: [
      {
        prompt: '¿Qué componente Django se usa para gestionar usuarios en la interfaz administrativa?',
        options: ['views.py', 'templates', 'admin.py', 'urls.py'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué se espera que incluya un proyecto integrador de Django?',
        options: ['Solo HTML estático', 'Una API, modelos y seguridad básica', 'Solo un proyecto vacío', 'Una única vista con un mensaje'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué permite Django Admin?',
        options: ['Crear y editar registros desde una interfaz', 'Diseñar CSS', 'Alojar la aplicación', 'Enviar correos'],
        correctIndex: 0,
      },
      {
        prompt: 'En un proyecto integrador, ¿cuál es una mejor práctica para proteger datos sensibles?',
        options: ['Guardar secret keys en el código', 'Usar variables de entorno', 'Enviar contraseñas por GET', 'Compartir credenciales públicamente'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué elemento facilita conectar Django con una base de datos?',
        options: ['models.py', 'static files', 'templates', 'urls.py'],
        correctIndex: 0,
      },
    ],
  },
};
