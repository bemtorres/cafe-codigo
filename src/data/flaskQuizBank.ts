export interface FlaskQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface FlaskQuizDefinition {
  key: string;
  title: string;
  questions: FlaskQuizQuestion[];
}

export const flaskQuizBank: Record<string, FlaskQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: Introducción a Flask',
    questions: [
      {
        prompt: '¿Qué es Flask en el ecosistema de Python?',
        options: ['Un lenguaje de programación', 'Un microframework web flexible y ligero', 'Una base de datos relacional', 'Un motor de renderizado 3D'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué significa que Flask sea un "microframework"?',
        options: ['Solo sirve para hacer páginas web pequeñas', 'Mantiene un núcleo simple y extensible sin forzar dependencias fijas', 'Solo corre en procesadores micro', 'No admite bases de datos'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué paquete se instala habitualmente mediante pip para usar Flask?',
        options: ['pip install django', 'pip install flask', 'pip install python-web', 'pip install fastapi'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se instancia una aplicación Flask básica?',
        options: ['app = Flask(__name__)', 'app = new Flask()', 'app = create_flask_app()', 'app = Flask.start()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué comando arranca el servidor de desarrollo cuando ejecutas la app con app.run()?',
        options: ['python app.py', 'flask startserver', 'npm start', 'django-admin runserver'],
        correctIndex: 0,
      },
    ],
  },
  'rutas-y-vistas': {
    key: 'rutas-y-vistas',
    title: 'Quiz: Rutas y Parámetros',
    questions: [
      {
        prompt: '¿Qué decorador se utiliza en Flask para asociar una función a una URL?',
        options: ['@app.route("/path")', '@app.url("/path")', '@app.path("/path")', '@route.get("/path")'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo defines una ruta dinámica que recibe un parámetro entero "id"?',
        options: ['@app.route("/usuario/<int:id>")', '@app.route("/usuario/{id}")', '@app.route("/usuario/:id")', '@app.route("/usuario/$id")'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo especificas qué métodos HTTP acepta una ruta en Flask?',
        options: ['@app.route("/api", methods=["GET", "POST"])', '@app.route("/api", verbs=["GET", "POST"])', '@app.route("/api", http=["GET"])', '@app.get_post("/api")'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué función de Flask genera una URL a partir del nombre de la vista (función)?',
        options: ['url_for("nombre_funcion")', 'redirect_to("nombre_funcion")', 'get_url("nombre_funcion")', 'make_url("nombre_funcion")'],
        correctIndex: 0,
      },
      {
        prompt: 'Si retorne mi función de vista un string en Flask, ¿qué código de estado HTTP se devuelve por defecto?',
        options: ['404 Not Found', '500 Internal Error', '200 OK', '201 Created'],
        correctIndex: 2,
      },
    ],
  },
  'plantillas-jinja2': {
    key: 'plantillas-jinja2',
    title: 'Quiz: Plantillas con Jinja2',
    questions: [
      {
        prompt: '¿Qué función de Flask se utiliza para renderizar un archivo HTML con Jinja2?',
        options: ['render_template("inicio.html")', 'show_html("inicio.html")', 'render_page("inicio.html")', 'response_template("inicio.html")'],
        correctIndex: 0,
      },
      {
        prompt: '¿En qué carpeta busca Flask por defecto los archivos de plantilla HTML?',
        options: ['/views', '/templates', '/static', '/html'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué sintaxis usa Jinja2 para mostrar el valor de una variable en HTML?',
        options: ['{{ variable }}', '{% variable %}', '{# variable #}', '${variable}'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué sintaxis usa Jinja2 para estructuras de control como condicionales o bucles?',
        options: ['{% if condicion %} ... {% endif %}', '{{ if condicion }}', '{# if condicion #}', '<if condicion>'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué bloque de Jinja2 permite la herencia de plantillas desde una plantilla base?',
        options: ['{% extends "base.html" %}', '{# inherit "base.html" #}', '{{ import "base.html" }}', '{% include_base "base.html" %}'],
        correctIndex: 0,
      },
    ],
  },
  'formularios-y-request': {
    key: 'formularios-y-request',
    title: 'Quiz: Formularios y Peticiones',
    questions: [
      {
        prompt: '¿De qué objeto de Flask se extraen los datos de un formulario enviado por POST?',
        options: ['request.form', 'request.args', 'request.json', 'request.post'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo obtienes los parámetros de consulta (query params) de la URL en GET?',
        options: ['request.args.get("param")', 'request.query("param")', 'request.form["param"]', 'request.params["param"]'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo rediriges al usuario a otra URL en Flask?',
        options: ['redirect(url_for("inicio"))', 'response.navigate("inicio")', 'forward("inicio")', 'location.href("inicio")'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué extensión popular simplifica el manejo y validación de formularios en Flask?',
        options: ['Flask-WTF', 'Flask-Admin', 'Flask-Migrate', 'Flask-CORS'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo verificas el método HTTP usado en una petición dentro de la función vista?',
        options: ['if request.method == "POST":', 'if request.type == "POST":', 'if request.action == "POST":', 'if request.is_post():'],
        correctIndex: 0,
      },
    ],
  },
  'sqlalchemy-bd': {
    key: 'sqlalchemy-bd',
    title: 'Quiz: Bases de Datos con SQLAlchemy',
    questions: [
      {
        prompt: '¿Qué es Flask-SQLAlchemy?',
        options: ['Una extensión que integra el ORM SQLAlchemy con Flask', 'Un motor de renderizado HTML', 'Una plantilla de estilos CSS', 'Un cliente de base de datos en JavaScript'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué propiedad en app.config define la URI de la base de datos?',
        options: ['SQLALCHEMY_DATABASE_URI', 'DATABASE_URL', 'FLASK_DB_LOCATION', 'DB_CONNECTION_STRING'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo agregas y guardas un objeto nuevo en la base de datos usando db.session?',
        options: ['db.session.add(objeto); db.session.commit()', 'db.save(objeto)', 'db.insert(objeto)', 'db.session.push(objeto)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo consultas todos los registros de un modelo "Usuario"?',
        options: ['Usuario.query.all()', 'Usuario.find_all()', 'db.get_all(Usuario)', 'Usuario.select()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué comando/herramienta se usa para gestionar migraciones de base de datos en Flask?',
        options: ['Flask-Migrate (Alembic)', 'django-admin migrate', 'flask db sync', 'pip migrate'],
        correctIndex: 0,
      },
    ],
  },
  'apis-json': {
    key: 'apis-json',
    title: 'Quiz: Creación de APIs REST con JSON',
    questions: [
      {
        prompt: '¿Qué función de Flask convierte un diccionario de Python a una respuesta HTTP con formato JSON?',
        options: ['jsonify({"clave": "valor"})', 'json.dumps({"clave": "valor"})', 'make_json({"clave": "valor"})', 'response.json({"clave": "valor"})'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo lees un payload JSON enviado en una petición POST a la API?',
        options: ['request.get_json()', 'request.form.json', 'request.body_json', 'request.parse_json()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué código de estado HTTP debes devolver al crear un recurso exitosamente en la API?',
        options: ['201 Created', '200 OK', '204 No Content', '400 Bad Request'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo especificas el código de estado retornado junto a jsonify en Flask?',
        options: ['return jsonify(data), 201', 'return jsonify(data, status=201)', 'return 201, jsonify(data)', 'return jsonify(data).status(201)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué extensión se usa frecuentemente para habilitar CORS en APIs de Flask?',
        options: ['Flask-CORS', 'Flask-RESTful', 'Flask-Security', 'Flask-JSON'],
        correctIndex: 0,
      },
    ],
  },
  'proyecto-integrador': {
    key: 'proyecto-integrador',
    title: 'Quiz: Proyecto Integrador Flask',
    questions: [
      {
        prompt: '¿Qué componentes combina una aplicación web completa con Flask?',
        options: ['Rutas, vistas, plantillas Jinja2, ORM SQLAlchemy y APIs JSON', 'Solo archivos HTML estáticos', 'Solo archivos CSS y JS sin backend', 'Solo una consulta SQL manual'],
        correctIndex: 0,
      },
      {
        prompt: '¿Para qué sirve el patrón de Application Factories (`create_app()`) en Flask?',
        options: ['Para instanciar la app dinámicamente y facilitar testing y despliegue', 'Para compilar Python a binarios C++', 'Para crear servidores de base de datos', 'Para generar imágenes automáticamente'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué permite la función Blueprints en Flask?',
        options: ['Organizar rutas y módulos en componentes reutilizables', 'Crear diagramas de arquitectura', 'Formatear código automáticamente', 'Comprimir archivos estáticos'],
        correctIndex: 0,
      },
      {
        prompt: 'En producción, ¿qué servidor WSGI/ASGI suele usarse para desplegar una app Flask?',
        options: ['Gunicorn o uWSGI', 'app.run(debug=True)', 'Live Server', 'Node.js'],
        correctIndex: 0,
      },
      {
        prompt: '¿Por qué nunca debes dejar `debug=True` al desplegar en producción?',
        options: ['Expone una consola interactiva con ejecución remota de código en errores', 'Hace la app 100 veces más lenta', 'Borra la base de datos al apagar', 'Cambia el color del sitio web'],
        correctIndex: 0,
      },
    ],
  },
};
