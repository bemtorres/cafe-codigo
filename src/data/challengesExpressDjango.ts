import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressDjangoExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 901 al 910 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 901,
    title: 'Creación del Entorno Virtual (Virtualenv)',
    statement: 'Completa el comando de Python para crear un entorno virtual aislado llamado "venv".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El comando estándar es python -m venv venv.',
    explanation: 'Un entorno virtual aísla las dependencias y paquetes de Python de cada proyecto evitando conflictos globales.',
    languages: {
      python: {
        starterCode: `# Comando en terminal para crear el entorno virtual:\n# python -m ___ venv\ncmd = "python -m ___ venv"`,
        solutionCode: `# Comando en terminal para crear el entorno virtual:\n# python -m venv venv\ncmd = "python -m venv venv"`,
        acceptedKeywords: ['venv']
      },
      cpp: {
        starterCode: `// Comando conceptual de inicialización de entorno\nconst char* cmd = "python -m ___ venv";`,
        solutionCode: `// Comando conceptual de inicialización de entorno\nconst char* cmd = "python -m venv venv";`,
        acceptedKeywords: ['venv']
      },
      javascript: {
        starterCode: `// Comando de inicialización de entorno\nconst cmd = "python -m ___ venv";`,
        solutionCode: `// Comando de inicialización de entorno\nconst cmd = "python -m venv venv";`,
        acceptedKeywords: ['venv']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python -m ___ venv";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python -m venv venv";\n    }\n}`,
        acceptedKeywords: ['venv']
      }
    }
  },
  {
    id: 902,
    title: 'Activación del Entorno Virtual',
    statement: 'Corrige la ruta del script de activación en Linux/macOS (source venv/bin/activate).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa source venv/bin/activate en Linux/macOS o venv\\Scripts\\activate en Windows.',
    explanation: 'Activar el entorno virtual configura la variable PATH para que python y pip apunten a las versiones locales del entorno.',
    languages: {
      python: {
        starterCode: `# Comando de activación en terminal Linux/macOS:\n# BUG: activate está dentro de la carpeta bin\ncmd = "source venv/bin/activate"`,
        solutionCode: `cmd = "source venv/bin/activate"`
      },
      cpp: {
        starterCode: `const char* cmd = "source venv/bin/activate";`,
        solutionCode: `const char* cmd = "source venv/bin/activate";`
      },
      javascript: {
        starterCode: `const cmd = "source venv/bin/activate";`,
        solutionCode: `const cmd = "source venv/bin/activate";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "source venv/bin/activate";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "source venv/bin/activate";\n    }\n}`
      }
    }
  },
  {
    id: 903,
    title: 'Instalación de Django con Pip',
    statement: 'Completa el comando para instalar la versión de Django mediante el gestor de paquetes pip.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El comando es pip install django.',
    explanation: 'pip es el instalador oficial de paquetes para Python que descarga Django desde PyPI.',
    languages: {
      python: {
        starterCode: `# Comando de instalación de dependencias:\ncmd = "pip ___ django"`,
        solutionCode: `cmd = "pip install django"`,
        acceptedKeywords: ['install']
      },
      cpp: {
        starterCode: `const char* cmd = "pip ___ django";`,
        solutionCode: `const char* cmd = "pip install django";`,
        acceptedKeywords: ['install']
      },
      javascript: {
        starterCode: `const cmd = "pip ___ django";`,
        solutionCode: `const cmd = "pip install django";`,
        acceptedKeywords: ['install']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "pip ___ django";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "pip install django";\n    }\n}`,
        acceptedKeywords: ['install']
      }
    }
  },
  {
    id: 904,
    title: 'Creación del Proyecto con django-admin',
    statement: 'Corrige el subcomando de django-admin para iniciar un nuevo proyecto llamado "tienda" (startproject).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa django-admin startproject tienda .',
    explanation: 'django-admin startproject crea la estructura inicial de directorios y archivos de configuración.',
    languages: {
      python: {
        starterCode: `# BUG: startapp es para aplicaciones, usa startproject para el proyecto global\ncmd = "django-admin startproject tienda ."`,
        solutionCode: `cmd = "django-admin startproject tienda ."`
      },
      cpp: {
        starterCode: `const char* cmd = "django-admin startproject tienda .";`,
        solutionCode: `const char* cmd = "django-admin startproject tienda .";`
      },
      javascript: {
        starterCode: `const cmd = "django-admin startproject tienda .";`,
        solutionCode: `const cmd = "django-admin startproject tienda .";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "django-admin startproject tienda .";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "django-admin startproject tienda .";\n    }\n}`
      }
    }
  },
  {
    id: 905,
    title: 'Creación de una Aplicación Django (startapp)',
    statement: 'Completa el comando de manage.py para crear una aplicación modular llamada "blog".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa python manage.py startapp blog.',
    explanation: 'En Django, los proyectos se dividen en aplicaciones modulares y reutilizables mediante startapp.',
    languages: {
      python: {
        starterCode: `cmd = "python manage.py ___ blog"`,
        solutionCode: `cmd = "python manage.py startapp blog"`,
        acceptedKeywords: ['startapp']
      },
      cpp: {
        starterCode: `const char* cmd = "python manage.py ___ blog";`,
        solutionCode: `const char* cmd = "python manage.py startapp blog";`,
        acceptedKeywords: ['startapp']
      },
      javascript: {
        starterCode: `const cmd = "python manage.py ___ blog";`,
        solutionCode: `const cmd = "python manage.py startapp blog";`,
        acceptedKeywords: ['startapp']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py ___ blog";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py startapp blog";\n    }\n}`,
        acceptedKeywords: ['startapp']
      }
    }
  },
  {
    id: 906,
    title: 'Registro de la App en settings.py (INSTALLED_APPS)',
    statement: 'Corrige la lista de INSTALLED_APPS agregando el nombre de la app "blog".',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Agrega "blog" dentro de la lista INSTALLED_APPS.',
    explanation: 'Django necesita que cada aplicación creada se registre en INSTALLED_APPS para habilitar sus modelos y plantillas.',
    languages: {
      python: {
        starterCode: `# settings.py\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'blog',\n]`,
        solutionCode: `INSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'blog',\n]`
      },
      cpp: {
        starterCode: `const char* installed_apps[] = {"django.contrib.admin", "blog"};`,
        solutionCode: `const char* installed_apps[] = {"django.contrib.admin", "blog"};`
      },
      javascript: {
        starterCode: `const installedApps = ['django.contrib.admin', 'blog'];`,
        solutionCode: `const installedApps = ['django.contrib.admin', 'blog'];`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String[] apps = {"django.contrib.admin", "blog"};\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String[] apps = {"django.contrib.admin", "blog"};\n    }\n}`
      }
    }
  },
  {
    id: 907,
    title: 'Ejecución del Servidor Local (runserver)',
    statement: 'Completa el comando para levantar el servidor de desarrollo en http://127.0.0.1:8000/.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El comando es python manage.py runserver.',
    explanation: 'runserver inicia un servidor HTTP de desarrollo local con recarga automática de código en vivo.',
    languages: {
      python: {
        starterCode: `cmd = "python manage.py ___"`,
        solutionCode: `cmd = "python manage.py runserver"`,
        acceptedKeywords: ['runserver']
      },
      cpp: {
        starterCode: `const char* cmd = "python manage.py ___";`,
        solutionCode: `const char* cmd = "python manage.py runserver";`,
        acceptedKeywords: ['runserver']
      },
      javascript: {
        starterCode: `const cmd = "python manage.py ___";`,
        solutionCode: `const cmd = "python manage.py runserver";`,
        acceptedKeywords: ['runserver']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py ___";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py runserver";\n    }\n}`,
        acceptedKeywords: ['runserver']
      }
    }
  },
  {
    id: 908,
    title: 'Primera Vista HttpResponse en views.py',
    statement: 'Corrige la función de vista para recibir el objeto request como primer parámetro.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Toda vista basada en funciones debe recibir request: def home(request):',
    explanation: 'Django pasa automáticamente un objeto HttpRequest con los datos de la petición a la función de vista.',
    languages: {
      python: {
        starterCode: `from django.http import HttpResponse\n\n# BUG: Falta el parámetro request\ndef home(request):\n    return HttpResponse("¡Hola desde Django!")`,
        solutionCode: `from django.http import HttpResponse\n\ndef home(request):\n    return HttpResponse("¡Hola desde Django!")`
      },
      cpp: {
        starterCode: `// Vista conceptual equivalente\nconst char* home(const void* request) {\n    return "¡Hola desde Django!";\n}`,
        solutionCode: `const char* home(const void* request) {\n    return "¡Hola desde Django!";\n}`
      },
      javascript: {
        starterCode: `function home(req, res) {\n    return "¡Hola desde Django!";\n}`,
        solutionCode: `function home(req, res) {\n    return "¡Hola desde Django!";\n}`
      },
      java: {
        starterCode: `public class Main {\n    static String home(Object request) {\n        return "¡Hola desde Django!";\n    }\n}`,
        solutionCode: `public class Main {\n    static String home(Object request) {\n        return "¡Hola desde Django!";\n    }\n}`
      }
    }
  },
  {
    id: 909,
    title: 'Enrutamiento de URL con path() en urls.py',
    statement: 'Completa la ruta vacía en urls.py para conectar la raíz con la vista views.home.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa path("", views.home, name="home").',
    explanation: 'urlpatterns es la lista de rutas que Django evalúa secuencialmente para asociar URLs a vistas.',
    languages: {
      python: {
        starterCode: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('___', views.home, name='home'),\n]`,
        solutionCode: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.home, name='home'),\n]`,
        acceptedKeywords: ["''", '""', '']
      },
      cpp: {
        starterCode: `const char* route = "";`,
        solutionCode: `const char* route = "";`
      },
      javascript: {
        starterCode: `const route = "";`,
        solutionCode: `const route = "";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String route = "";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String route = "";\n    }\n}`
      }
    }
  },
  {
    id: 910,
    title: 'Renderizado de Plantilla HTML con render()',
    statement: 'Corrige la llamada a render(request, "index.html", contexto) pasando el request.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'La función render recibe: render(request, template_name, context).',
    explanation: 'render() es un atajo que combina una plantilla con un diccionario de contexto y retorna un HttpResponse.',
    languages: {
      python: {
        starterCode: `from django.shortcuts import render\n\ndef inicio(request):\n    contexto = {'titulo': 'Mi Blog'}\n    return render(request, 'index.html', contexto)`,
        solutionCode: `from django.shortcuts import render\n\ndef inicio(request):\n    contexto = {'titulo': 'Mi Blog'}\n    return render(request, 'index.html', contexto)`
      },
      cpp: {
        starterCode: `// Renderizado de template\nconst char* templateName = "index.html";`,
        solutionCode: `const char* templateName = "index.html";`
      },
      javascript: {
        starterCode: `// Renderizado de template\nconst templateName = "index.html";`,
        solutionCode: `const templateName = "index.html";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String template = "index.html";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String template = "index.html";\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 911 al 920 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 911,
    title: 'Definición de Modelo en models.py',
    statement: 'Completa la clase del modelo Post heredando de models.Model.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Hereda de models.Model.',
    explanation: 'Los modelos en Django son clases Python que heredan de models.Model y definen las tablas de la base de datos.',
    languages: {
      python: {
        starterCode: `from django.db import models\n\nclass Post(models.___):\n    titulo = models.CharField(max_length=200)\n    contenido = models.TextField()`,
        solutionCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    contenido = models.TextField()`,
        acceptedKeywords: ['Model']
      },
      cpp: {
        starterCode: `class Post {};`,
        solutionCode: `class Post {};`
      },
      javascript: {
        starterCode: `class Post {}`,
        solutionCode: `class Post {}`
      },
      java: {
        starterCode: `public class Main {\n    class Post {}\n}`,
        solutionCode: `public class Main {\n    class Post {}\n}`
      }
    }
  },
  {
    id: 912,
    title: 'Representación Legible con __str__ en Modelos',
    statement: 'Corrige el método __str__ para retornar el título del post en lugar de un objeto crudo.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Retorna self.titulo.',
    explanation: '__str__ define la representación en texto legible que el panel de administración y shell mostrarán para cada fila.',
    languages: {
      python: {
        starterCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    def __str__(self):\n        return self.titulo`,
        solutionCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    def __str__(self):\n        return self.titulo`
      },
      cpp: {
        starterCode: `const char* getTitulo() { return "Post"; }`,
        solutionCode: `const char* getTitulo() { return "Post"; }`
      },
      javascript: {
        starterCode: `function getTitulo() { return "Post"; }`,
        solutionCode: `function getTitulo() { return "Post"; }`
      },
      java: {
        starterCode: `public class Main {\n    public String toString() { return "Post"; }\n}`,
        solutionCode: `public class Main {\n    public String toString() { return "Post"; }\n}`
      }
    }
  },
  {
    id: 913,
    title: 'Generación de Migraciones (makemigrations)',
    statement: 'Completa el comando para preparar las migraciones tras modificar los modelos.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa python manage.py makemigrations.',
    explanation: 'makemigrations inspecciona tus modelos y genera archivos de migración con las instrucciones de cambio en SQL.',
    languages: {
      python: {
        starterCode: `cmd = "python manage.py ___"`,
        solutionCode: `cmd = "python manage.py makemigrations"`,
        acceptedKeywords: ['makemigrations']
      },
      cpp: {
        starterCode: `const char* cmd = "python manage.py ___";`,
        solutionCode: `const char* cmd = "python manage.py makemigrations";`,
        acceptedKeywords: ['makemigrations']
      },
      javascript: {
        starterCode: `const cmd = "python manage.py ___";`,
        solutionCode: `const cmd = "python manage.py makemigrations";`,
        acceptedKeywords: ['makemigrations']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py ___";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py makemigrations";\n    }\n}`,
        acceptedKeywords: ['makemigrations']
      }
    }
  },
  {
    id: 914,
    title: 'Aplicación de Migraciones a la BD (migrate)',
    statement: 'Corrige el comando de aplicación de migraciones en la base de datos (python manage.py migrate).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa python manage.py migrate.',
    explanation: 'migrate ejecuta las sentencias SQL pendientes en la base de datos (SQLite, PostgreSQL, MySQL).',
    languages: {
      python: {
        starterCode: `cmd = "python manage.py migrate"`,
        solutionCode: `cmd = "python manage.py migrate"`
      },
      cpp: {
        starterCode: `const char* cmd = "python manage.py migrate";`,
        solutionCode: `const char* cmd = "python manage.py migrate";`
      },
      javascript: {
        starterCode: `const cmd = "python manage.py migrate";`,
        solutionCode: `const cmd = "python manage.py migrate";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py migrate";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py migrate";\n    }\n}`
      }
    }
  },
  {
    id: 915,
    title: 'Registro en el Panel de Administración (admin.py)',
    statement: 'Completa el método de registro del modelo en admin.site.___ (Post).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa admin.site.register(Post).',
    explanation: 'admin.site.register expone el modelo en el panel de administración automático de Django.',
    languages: {
      python: {
        starterCode: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.___(Post)`,
        solutionCode: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.register(Post)`,
        acceptedKeywords: ['register']
      },
      cpp: {
        starterCode: `// Registro de admin\nconst char* action = "register";`,
        solutionCode: `const char* action = "register";`
      },
      javascript: {
        starterCode: `const action = "register";`,
        solutionCode: `const action = "register";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String action = "register";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String action = "register";\n    }\n}`
      }
    }
  },
  {
    id: 916,
    title: 'Creación del Superusuario de Django (createsuperuser)',
    statement: 'Corrige el comando de terminal para crear una cuenta de administrador (createsuperuser).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa python manage.py createsuperuser.',
    explanation: 'createsuperuser solicita nombre de usuario, correo y contraseña para acceder a /admin/.',
    languages: {
      python: {
        starterCode: `cmd = "python manage.py createsuperuser"`,
        solutionCode: `cmd = "python manage.py createsuperuser"`
      },
      cpp: {
        starterCode: `const char* cmd = "python manage.py createsuperuser";`,
        solutionCode: `const char* cmd = "python manage.py createsuperuser";`
      },
      javascript: {
        starterCode: `const cmd = "python manage.py createsuperuser";`,
        solutionCode: `const cmd = "python manage.py createsuperuser";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py createsuperuser";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py createsuperuser";\n    }\n}`
      }
    }
  },
  {
    id: 917,
    title: 'Bucle en Plantillas Django ({% for %})',
    statement: 'Completa la etiqueta de cierre del bucle de plantilla Django ({% ___ %}).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La etiqueta de cierre de for es endfor.',
    explanation: 'El motor de plantillas de Django requiere cerrar explícitamente los bloques for con {% endfor %}.',
    languages: {
      python: {
        starterCode: `<!-- template.html -->\n<ul>\n{% for item in items %}\n    <li>{{ item.nombre }}</li>\n{% ___ %}\n</ul>`,
        solutionCode: `<!-- template.html -->\n<ul>\n{% for item in items %}\n    <li>{{ item.nombre }}</li>\n{% endfor %}\n</ul>`,
        acceptedKeywords: ['endfor']
      },
      cpp: {
        starterCode: `const char* tag = "endfor";`,
        solutionCode: `const char* tag = "endfor";`
      },
      javascript: {
        starterCode: `const tag = "endfor";`,
        solutionCode: `const tag = "endfor";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String tag = "endfor";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String tag = "endfor";\n    }\n}`
      }
    }
  },
  {
    id: 918,
    title: 'Herencia de Plantillas ({% extends %})',
    statement: 'Corrige la etiqueta de herencia para extender del archivo base "base.html".',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa {% extends "base.html" %}.',
    explanation: '{% extends %} debe ser la primera etiqueta de una plantilla secundaria para heredar el esqueleto común.',
    languages: {
      python: {
        starterCode: `{% extends "base.html" %}\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        solutionCode: `{% extends "base.html" %}\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`
      },
      cpp: {
        starterCode: `const char* tag = "extends base.html";`,
        solutionCode: `const char* tag = "extends base.html";`
      },
      javascript: {
        starterCode: `const tag = "extends base.html";`,
        solutionCode: `const tag = "extends base.html";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String tag = "extends base.html";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String tag = "extends base.html";\n    }\n}`
      }
    }
  },
  {
    id: 919,
    title: 'Creación de Formulario con ModelForm',
    statement: 'Completa la clase interna Meta indicando el modelo correspondiente: model = ___.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Asigna model = Post.',
    explanation: 'ModelForm genera automáticamente campos de formulario HTML a partir de un modelo Django.',
    languages: {
      python: {
        starterCode: `from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = ___\n        fields = ['titulo', 'contenido']`,
        solutionCode: `from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = Post\n        fields = ['titulo', 'contenido']`,
        acceptedKeywords: ['Post']
      },
      cpp: {
        starterCode: `const char* modelName = "Post";`,
        solutionCode: `const char* modelName = "Post";`
      },
      javascript: {
        starterCode: `const modelName = "Post";`,
        solutionCode: `const modelName = "Post";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String model = "Post";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String model = "Post";\n    }\n}`
      }
    }
  },
  {
    id: 920,
    title: 'Protección CSRF en Formularios HTML ({% csrf_token %})',
    statement: 'Corrige la inclusión del token de seguridad CSRF dentro del formulario POST.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Incluye {% csrf_token %} dentro del tag <form>.',
    explanation: 'Django exige {% csrf_token %} en formularios POST para prevenir ataques Cross-Site Request Forgery.',
    languages: {
      python: {
        starterCode: `<form method="POST">\n    {% csrf_token %}\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        solutionCode: `<form method="POST">\n    {% csrf_token %}\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`
      },
      cpp: {
        starterCode: `const char* csrf = "{% csrf_token %}";`,
        solutionCode: `const char* csrf = "{% csrf_token %}";`
      },
      javascript: {
        starterCode: `const csrf = "{% csrf_token %}";`,
        solutionCode: `const csrf = "{% csrf_token %}";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String csrf = "{% csrf_token %}";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String csrf = "{% csrf_token %}";\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 921 al 930 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 921,
    title: 'Relación Uno a Muchos con ForeignKey y on_delete',
    statement: 'Completa la política de eliminación en cascada: on_delete=models.___ .',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa models.CASCADE.',
    explanation: 'CASCADE borra automáticamente los registros hijos asociados cuando el registro padre es eliminado.',
    languages: {
      python: {
        starterCode: `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Post(models.Model):\n    autor = models.ForeignKey(User, on_delete=models.___)\n    titulo = models.CharField(max_length=200)`,
        solutionCode: `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Post(models.Model):\n    autor = models.ForeignKey(User, on_delete=models.CASCADE)\n    titulo = models.CharField(max_length=200)`,
        acceptedKeywords: ['CASCADE']
      },
      cpp: {
        starterCode: `const char* policy = "CASCADE";`,
        solutionCode: `const char* policy = "CASCADE";`
      },
      javascript: {
        starterCode: `const policy = "CASCADE";`,
        solutionCode: `const policy = "CASCADE";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String policy = "CASCADE";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String policy = "CASCADE";\n    }\n}`
      }
    }
  },
  {
    id: 922,
    title: 'Obtención Segura con get_object_or_404',
    statement: 'Corrige la recuperación del post por clave primaria pk para arrojar HTTP 404 si no existe.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa post = get_object_or_404(Post, pk=post_id).',
    explanation: 'get_object_or_404 captura Http404 automáticamente si la consulta no devuelve ningún objeto.',
    languages: {
      python: {
        starterCode: `from django.shortcuts import get_object_or_404, render\nfrom .models import Post\n\ndef detalle(request, post_id):\n    post = get_object_or_404(Post, pk=post_id)\n    return render(request, 'detalle.html', {'post': post})`,
        solutionCode: `from django.shortcuts import get_object_or_404, render\nfrom .models import Post\n\ndef detalle(request, post_id):\n    post = get_object_or_404(Post, pk=post_id)\n    return render(request, 'detalle.html', {'post': post})`
      },
      cpp: {
        starterCode: `// Handler de 404 seguro\nint getPostOr404(int id) { return id; }`,
        solutionCode: `int getPostOr404(int id) { return id; }`
      },
      javascript: {
        starterCode: `function getPostOr404(id) { return id; }`,
        solutionCode: `function getPostOr404(id) { return id; }`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int id = 1;\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int id = 1;\n    }\n}`
      }
    }
  },
  {
    id: 923,
    title: 'Filtrado de Consultas ORM con Doble Guión Bajo (__)',
    statement: 'Completa la consulta para filtrar posts publicados cuyo título contenga "Django" (titulo_____="Django").',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa titulo__icontains="Django" (o __contains).',
    explanation: 'El doble guion bajo en Django ORM define transformaciones de búsqueda como __icontains, __year, __gte.',
    languages: {
      python: {
        starterCode: `from .models import Post\n\n# Filtrar posts que contengan "Django" sin distinguir mayúsculas:\nposts = Post.objects.filter(titulo_____='Django')`,
        solutionCode: `from .models import Post\n\nposts = Post.objects.filter(titulo__icontains='Django')`,
        acceptedKeywords: ['__icontains', '__contains']
      },
      cpp: {
        starterCode: `const char* lookup = "__icontains";`,
        solutionCode: `const char* lookup = "__icontains";`
      },
      javascript: {
        starterCode: `const lookup = "__icontains";`,
        solutionCode: `const lookup = "__icontains";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String lookup = "__icontains";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String lookup = "__icontains";\n    }\n}`
      }
    }
  },
  {
    id: 924,
    title: 'Vista Basada en Clases (ListView)',
    statement: 'Corrige la herencia de la vista genérica para listar publicaciones (ListView).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Hereda de ListView y especifica model = Post.',
    explanation: 'Las Class-Based Views (CBVs) reducen el código repetitivo proveyendo patrones estándar como listas y detalles.',
    languages: {
      python: {
        starterCode: `from django.views.generic import ListView\nfrom .models import Post\n\nclass PostListView(ListView):\n    model = Post\n    template_name = 'post_list.html'\n    context_object_name = 'posts'`,
        solutionCode: `from django.views.generic import ListView\nfrom .models import Post\n\nclass PostListView(ListView):\n    model = Post\n    template_name = 'post_list.html'\n    context_object_name = 'posts'`
      },
      cpp: {
        starterCode: `class PostListView {};`,
        solutionCode: `class PostListView {};`
      },
      javascript: {
        starterCode: `class PostListView {}`,
        solutionCode: `class PostListView {}`
      },
      java: {
        starterCode: `public class Main {\n    class PostListView {}\n}`,
        solutionCode: `public class Main {\n    class PostListView {}\n}`
      }
    }
  },
  {
    id: 925,
    title: 'Protección de Vistas con @login_required',
    statement: 'Completa el decorador de autenticación requerida antes de la función de vista.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa @login_required.',
    explanation: '@login_required redirige al usuario no autenticado a la pantalla de login antes de ejecutar la vista.',
    languages: {
      python: {
        starterCode: `from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@___\ndef panel_privado(request):\n    return render(request, 'panel.html')`,
        solutionCode: `from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@login_required\ndef panel_privado(request):\n    return render(request, 'panel.html')`,
        acceptedKeywords: ['login_required']
      },
      cpp: {
        starterCode: `const char* decorator = "@login_required";`,
        solutionCode: `const char* decorator = "@login_required";`
      },
      javascript: {
        starterCode: `const decorator = "@login_required";`,
        solutionCode: `const decorator = "@login_required";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String dec = "@login_required";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String dec = "@login_required";\n    }\n}`
      }
    }
  },
  {
    id: 926,
    title: 'Relación Muchos a Muchos (ManyToManyField)',
    statement: 'Corrige la definición de etiquetas del post usando models.ManyToManyField(Tag).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa tags = models.ManyToManyField(Tag).',
    explanation: 'ManyToManyField crea automáticamente una tabla intermedia para vincular múltiples instancias entre sí.',
    languages: {
      python: {
        starterCode: `from django.db import models\n\nclass Tag(models.Model):\n    nombre = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    tags = models.ManyToManyField(Tag)`,
        solutionCode: `from django.db import models\n\nclass Tag(models.Model):\n    nombre = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    tags = models.ManyToManyField(Tag)`
      },
      cpp: {
        starterCode: `class Post { Tag* tags; };`,
        solutionCode: `class Post { Tag* tags; };`
      },
      javascript: {
        starterCode: `class Post { constructor() { this.tags = []; } }`,
        solutionCode: `class Post { constructor() { this.tags = []; } }`
      },
      java: {
        starterCode: `public class Main {\n    class Post { List<Tag> tags; }\n}`,
        solutionCode: `public class Main {\n    class Post { List<Tag> tags; }\n}`
      }
    }
  },
  {
    id: 927,
    title: 'Recolección de Archivos Estáticos (collectstatic)',
    statement: 'Completa el comando de producción para unificar los archivos CSS y JS en STATIC_ROOT.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'El comando es python manage.py collectstatic.',
    explanation: 'collectstatic reúne todos los archivos estáticos de cada app en una única carpeta para ser servida por Nginx o CDN.',
    languages: {
      python: {
        starterCode: `cmd = "python manage.py ___"`,
        solutionCode: `cmd = "python manage.py collectstatic"`,
        acceptedKeywords: ['collectstatic']
      },
      cpp: {
        starterCode: `const char* cmd = "python manage.py ___";`,
        solutionCode: `const char* cmd = "python manage.py collectstatic";`,
        acceptedKeywords: ['collectstatic']
      },
      javascript: {
        starterCode: `const cmd = "python manage.py ___";`,
        solutionCode: `const cmd = "python manage.py collectstatic";`,
        acceptedKeywords: ['collectstatic']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py ___";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String cmd = "python manage.py collectstatic";\n    }\n}`,
        acceptedKeywords: ['collectstatic']
      }
    }
  },
  {
    id: 928,
    title: 'Configuración de Producción en settings.py',
    statement: 'Corrige la desactivación de DEBUG en producción asignando DEBUG = False.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Asigna DEBUG = False y define ALLOWED_HOSTS.',
    explanation: 'Desactivar DEBUG previene la filtración de variables de entorno, claves y trazas de error sensibles a usuarios externos.',
    languages: {
      python: {
        starterCode: `# settings.py para producción:\nDEBUG = False\nALLOWED_HOSTS = ['midominio.com', 'www.midominio.com']`,
        solutionCode: `DEBUG = False\nALLOWED_HOSTS = ['midominio.com', 'www.midominio.com']`
      },
      cpp: {
        starterCode: `bool DEBUG = false;`,
        solutionCode: `bool DEBUG = false;`
      },
      javascript: {
        starterCode: `const DEBUG = false;`,
        solutionCode: `const DEBUG = false;`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean debug = false;\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean debug = false;\n    }\n}`
      }
    }
  },
  {
    id: 929,
    title: 'Inclusión de Rutas de App con include() en urls.py',
    statement: 'Completa la función include() para importar las rutas de la app "blog.urls".',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa include("blog.urls").',
    explanation: 'include() permite modularizar el enrutamiento delegando las subrutas a cada aplicación individual.',
    languages: {
      python: {
        starterCode: `from django.urls import path, ___\n\nurlpatterns = [\n    path('blog/', ___('blog.urls')),\n]`,
        solutionCode: `from django.urls import path, include\n\nurlpatterns = [\n    path('blog/', include('blog.urls')),\n]`,
        acceptedKeywords: ['include']
      },
      cpp: {
        starterCode: `const char* fn = "include";`,
        solutionCode: `const char* fn = "include";`
      },
      javascript: {
        starterCode: `const fn = "include";`,
        solutionCode: `const fn = "include";`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String fn = "include";\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String fn = "include";\n    }\n}`
      }
    }
  },
  {
    id: 930,
    title: 'Personalización del Admin con ModelAdmin',
    statement: 'Corrige la tupla list_display para mostrar las columnas titulo y fecha_creacion en la tabla de administración.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa list_display = ("titulo", "fecha_creacion").',
    explanation: 'ModelAdmin permite configurar filtros laterales, búsqueda por texto y columnas visibles en el dashboard administrativo.',
    languages: {
      python: {
        starterCode: `from django.contrib import admin\nfrom .models import Post\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ('titulo', 'fecha_creacion')\n    search_fields = ('titulo',)\n    list_filter = ('fecha_creacion',)`,
        solutionCode: `from django.contrib import admin\nfrom .models import Post\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ('titulo', 'fecha_creacion')\n    search_fields = ('titulo',)\n    list_filter = ('fecha_creacion',)`
      },
      cpp: {
        starterCode: `const char* fields[] = {"titulo", "fecha_creacion"};`,
        solutionCode: `const char* fields[] = {"titulo", "fecha_creacion"};`
      },
      javascript: {
        starterCode: `const fields = ['titulo', 'fecha_creacion'];`,
        solutionCode: `const fields = ['titulo', 'fecha_creacion'];`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String[] fields = {"titulo", "fecha_creacion"};\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String[] fields = {"titulo", "fecha_creacion"};\n    }\n}`
      }
    }
  }
];
