import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressDjangoExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 901 al 910 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 901,
    title: 'Creación del Entorno Virtual (Virtualenv)',
    statement: 'Completa el comando de consola para crear un entorno virtual aislado de Python llamado "venv".',
    type: 'complete',
    difficulty: 'facil',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'El comando estándar es python -m venv venv.',
    explanation: 'Un entorno virtual aísla las dependencias y paquetes de Python de cada proyecto evitando conflictos globales entre librerías.',
    languages: {
      django: {
        starterCode: `python -m ___ venv`,
        solutionCode: `python -m venv venv`,
        acceptedKeywords: ['venv']
      },
      python: {
        starterCode: `python -m ___ venv`,
        solutionCode: `python -m venv venv`,
        acceptedKeywords: ['venv']
      }
    }
  },
  {
    id: 902,
    title: 'Activación del Entorno Virtual',
    statement: 'Corrige la ruta del script para activar el entorno virtual en Linux/macOS (el script activate está dentro de la carpeta bin).',
    type: 'fix',
    difficulty: 'facil',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'Usa source venv/bin/activate en Linux/macOS o venv\\Scripts\\activate en Windows.',
    explanation: 'Activar el entorno virtual configura la variable PATH para que python y pip apunten a los binarios locales del entorno.',
    languages: {
      django: {
        starterCode: `source venv/activate`,
        solutionCode: `source venv/bin/activate`,
        acceptedKeywords: ['source venv/bin/activate', 'venv/bin/activate']
      },
      python: {
        starterCode: `source venv/activate`,
        solutionCode: `source venv/bin/activate`,
        acceptedKeywords: ['source venv/bin/activate', 'venv/bin/activate']
      }
    }
  },
  {
    id: 903,
    title: 'Instalación de Django con Pip',
    statement: 'Completa el comando para instalar Django mediante el gestor de paquetes pip en tu terminal.',
    type: 'complete',
    difficulty: 'facil',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'El comando es pip install django.',
    explanation: 'pip es el instalador oficial de paquetes para Python que descarga e instala Django desde el repositorio PyPI.',
    languages: {
      django: {
        starterCode: `pip ___ django`,
        solutionCode: `pip install django`,
        acceptedKeywords: ['install']
      },
      python: {
        starterCode: `pip ___ django`,
        solutionCode: `pip install django`,
        acceptedKeywords: ['install']
      }
    }
  },
  {
    id: 904,
    title: 'Creación del Proyecto con django-admin',
    statement: 'Corrige el subcomando de django-admin para iniciar un nuevo proyecto llamado "tienda" en el directorio actual (usa startproject en vez de startapp).',
    type: 'fix',
    difficulty: 'facil',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'Usa django-admin startproject tienda .',
    explanation: 'django-admin startproject inicializa la raíz del proyecto con manage.py y el paquete de configuración principal.',
    languages: {
      django: {
        starterCode: `django-admin startapp tienda .`,
        solutionCode: `django-admin startproject tienda .`,
        acceptedKeywords: ['startproject']
      },
      python: {
        starterCode: `django-admin startapp tienda .`,
        solutionCode: `django-admin startproject tienda .`,
        acceptedKeywords: ['startproject']
      }
    }
  },
  {
    id: 905,
    title: 'Creación de una Aplicación Django (startapp)',
    statement: 'Completa el comando de manage.py para crear una aplicación modular llamada "blog".',
    type: 'complete',
    difficulty: 'facil',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'Usa python manage.py startapp blog.',
    explanation: 'En Django, los proyectos se dividen en aplicaciones modulares y reutilizables creadas con el subcomando startapp.',
    languages: {
      django: {
        starterCode: `python manage.py ___ blog`,
        solutionCode: `python manage.py startapp blog`,
        acceptedKeywords: ['startapp']
      },
      python: {
        starterCode: `python manage.py ___ blog`,
        solutionCode: `python manage.py startapp blog`,
        acceptedKeywords: ['startapp']
      }
    }
  },
  {
    id: 906,
    title: 'Registro de la App en settings.py (INSTALLED_APPS)',
    statement: 'Registra la nueva aplicación "blog" dentro de la lista INSTALLED_APPS en settings.py.',
    type: 'complete',
    difficulty: 'facil',
    categoryType: 'python',
    fileName: 'settings.py',
    hint: 'Agrega "blog" al final de la lista INSTALLED_APPS.',
    explanation: 'Django necesita que cada aplicación creada se registre en INSTALLED_APPS para habilitar sus modelos, migraciones y plantillas.',
    languages: {
      django: {
        starterCode: `# settings.py\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    '___',\n]`,
        solutionCode: `# settings.py\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'blog',\n]`,
        acceptedKeywords: ['blog']
      },
      python: {
        starterCode: `# settings.py\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    '___',\n]`,
        solutionCode: `# settings.py\nINSTALLED_APPS = [\n    'django.contrib.admin',\n    'django.contrib.auth',\n    'django.contrib.contenttypes',\n    'django.contrib.sessions',\n    'django.contrib.messages',\n    'django.contrib.staticfiles',\n    'blog',\n]`,
        acceptedKeywords: ['blog']
      }
    }
  },
  {
    id: 907,
    title: 'Ejecución del Servidor Local (runserver)',
    statement: 'Completa el comando de manage.py para levantar el servidor de desarrollo en http://127.0.0.1:8000/.',
    type: 'complete',
    difficulty: 'facil',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'El comando es python manage.py runserver.',
    explanation: 'runserver inicia un servidor HTTP de desarrollo local con recarga automática de código en vivo ante cualquier cambio.',
    languages: {
      django: {
        starterCode: `python manage.py ___`,
        solutionCode: `python manage.py runserver`,
        acceptedKeywords: ['runserver']
      },
      python: {
        starterCode: `python manage.py ___`,
        solutionCode: `python manage.py runserver`,
        acceptedKeywords: ['runserver']
      }
    }
  },
  {
    id: 908,
    title: 'Primera Vista HttpResponse en views.py',
    statement: 'Corrige la función de vista en views.py para que reciba el parámetro obligatorio request.',
    type: 'fix',
    difficulty: 'facil',
    categoryType: 'python',
    fileName: 'views.py',
    hint: 'Toda vista basada en funciones debe recibir request como primer parámetro: def home(request):',
    explanation: 'Django pasa automáticamente un objeto HttpRequest con los datos de la petición HTTP a la función de vista.',
    languages: {
      django: {
        starterCode: `from django.http import HttpResponse\n\n# BUG: Falta el parámetro obligatorio de petición HTTP\ndef home():\n    return HttpResponse("¡Hola desde Django!")`,
        solutionCode: `from django.http import HttpResponse\n\ndef home(request):\n    return HttpResponse("¡Hola desde Django!")`,
        acceptedKeywords: ['request']
      },
      python: {
        starterCode: `from django.http import HttpResponse\n\n# BUG: Falta el parámetro obligatorio de petición HTTP\ndef home():\n    return HttpResponse("¡Hola desde Django!")`,
        solutionCode: `from django.http import HttpResponse\n\ndef home(request):\n    return HttpResponse("¡Hola desde Django!")`,
        acceptedKeywords: ['request']
      }
    }
  },
  {
    id: 909,
    title: 'Enrutamiento de URL con path() en urls.py',
    statement: 'Completa la ruta vacía en urls.py para conectar la URL raíz ("") con la vista views.home.',
    type: 'complete',
    difficulty: 'facil',
    categoryType: 'python',
    fileName: 'urls.py',
    hint: 'Usa path(\'\', views.home, name=\'home\').',
    explanation: 'urlpatterns es la lista de rutas que Django evalúa secuencialmente para asociar URLs a funciones de vista.',
    languages: {
      django: {
        starterCode: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('___', views.home, name='home'),\n]`,
        solutionCode: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.home, name='home'),\n]`,
        acceptedKeywords: ["''", '""', 'views.home']
      },
      python: {
        starterCode: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('___', views.home, name='home'),\n]`,
        solutionCode: `from django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('', views.home, name='home'),\n]`,
        acceptedKeywords: ["''", '""', 'views.home']
      }
    }
  },
  {
    id: 910,
    title: 'Renderizado de Plantilla HTML con render()',
    statement: 'Corrige la función render() en views.py pasando el objeto request como primer argumento.',
    type: 'fix',
    difficulty: 'facil',
    categoryType: 'python',
    fileName: 'views.py',
    hint: 'La firma de render es render(request, template_name, context).',
    explanation: 'render() es un atajo que combina una plantilla con un diccionario de contexto y retorna un HttpResponse listo.',
    languages: {
      django: {
        starterCode: `from django.shortcuts import render\n\n# BUG: render requiere request como primer argumento\ndef inicio(request):\n    contexto = {'titulo': 'Mi Blog'}\n    return render('index.html', contexto)`,
        solutionCode: `from django.shortcuts import render\n\ndef inicio(request):\n    contexto = {'titulo': 'Mi Blog'}\n    return render(request, 'index.html', contexto)`,
        acceptedKeywords: ['render(request,']
      },
      python: {
        starterCode: `from django.shortcuts import render\n\n# BUG: render requiere request como primer argumento\ndef inicio(request):\n    contexto = {'titulo': 'Mi Blog'}\n    return render('index.html', contexto)`,
        solutionCode: `from django.shortcuts import render\n\ndef inicio(request):\n    contexto = {'titulo': 'Mi Blog'}\n    return render(request, 'index.html', contexto)`,
        acceptedKeywords: ['render(request,']
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
    categoryType: 'python',
    fileName: 'models.py',
    hint: 'Hereda de models.Model.',
    explanation: 'Los modelos en Django son clases Python que heredan de models.Model y definen las tablas de la base de datos.',
    languages: {
      django: {
        starterCode: `from django.db import models\n\nclass Post(models.___):\n    titulo = models.CharField(max_length=200)\n    contenido = models.TextField()`,
        solutionCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    contenido = models.TextField()`,
        acceptedKeywords: ['Model']
      },
      python: {
        starterCode: `from django.db import models\n\nclass Post(models.___):\n    titulo = models.CharField(max_length=200)\n    contenido = models.TextField()`,
        solutionCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    contenido = models.TextField()`,
        acceptedKeywords: ['Model']
      }
    }
  },
  {
    id: 912,
    title: 'Representación Legible con __str__ en Modelos',
    statement: 'Corrige el método __str__ para retornar el título del post (self.titulo) en lugar de un texto estático.',
    type: 'fix',
    difficulty: 'medio',
    categoryType: 'python',
    fileName: 'models.py',
    hint: 'Retorna self.titulo.',
    explanation: '__str__ define la representación en texto legible que el panel de administración y shell mostrarán para cada registro.',
    languages: {
      django: {
        starterCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n\n    # BUG: Debe retornar el atributo dinámico del post\n    def __str__(self):\n        return "Objeto Post"`,
        solutionCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n\n    def __str__(self):\n        return self.titulo`,
        acceptedKeywords: ['self.titulo']
      },
      python: {
        starterCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n\n    # BUG: Debe retornar el atributo dinámico del post\n    def __str__(self):\n        return "Objeto Post"`,
        solutionCode: `from django.db import models\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n\n    def __str__(self):\n        return self.titulo`,
        acceptedKeywords: ['self.titulo']
      }
    }
  },
  {
    id: 913,
    title: 'Generación de Migraciones (makemigrations)',
    statement: 'Completa el comando de manage.py para generar los archivos de migración tras modificar tus modelos.',
    type: 'complete',
    difficulty: 'medio',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'Usa python manage.py makemigrations.',
    explanation: 'makemigrations inspecciona los modelos en models.py y crea archivos de migración con las instrucciones en SQL.',
    languages: {
      django: {
        starterCode: `python manage.py ___`,
        solutionCode: `python manage.py makemigrations`,
        acceptedKeywords: ['makemigrations']
      },
      python: {
        starterCode: `python manage.py ___`,
        solutionCode: `python manage.py makemigrations`,
        acceptedKeywords: ['makemigrations']
      }
    }
  },
  {
    id: 914,
    title: 'Aplicación de Migraciones a la BD (migrate)',
    statement: 'Corrige el comando de terminal para aplicar las migraciones pendientes en la base de datos (usa migrate).',
    type: 'fix',
    difficulty: 'medio',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'Usa python manage.py migrate.',
    explanation: 'migrate ejecuta las sentencias SQL pendientes en la base de datos para crear o actualizar tablas.',
    languages: {
      django: {
        starterCode: `python manage.py make_migrations`,
        solutionCode: `python manage.py migrate`,
        acceptedKeywords: ['migrate']
      },
      python: {
        starterCode: `python manage.py make_migrations`,
        solutionCode: `python manage.py migrate`,
        acceptedKeywords: ['migrate']
      }
    }
  },
  {
    id: 915,
    title: 'Registro en el Panel de Administración (admin.py)',
    statement: 'Completa el método de registro del modelo Post en admin.site.___.',
    type: 'complete',
    difficulty: 'medio',
    categoryType: 'python',
    fileName: 'admin.py',
    hint: 'Usa admin.site.register(Post).',
    explanation: 'admin.site.register expone el modelo en el panel de administración automático de Django.',
    languages: {
      django: {
        starterCode: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.___(Post)`,
        solutionCode: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.register(Post)`,
        acceptedKeywords: ['register']
      },
      python: {
        starterCode: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.___(Post)`,
        solutionCode: `from django.contrib import admin\nfrom .models import Post\n\nadmin.site.register(Post)`,
        acceptedKeywords: ['register']
      }
    }
  },
  {
    id: 916,
    title: 'Creación del Superusuario de Django (createsuperuser)',
    statement: 'Corrige el comando de manage.py para crear una cuenta de administrador de Django (createsuperuser).',
    type: 'fix',
    difficulty: 'medio',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'Usa python manage.py createsuperuser.',
    explanation: 'createsuperuser crea un usuario con permisos totales en el sistema de autenticación para acceder a /admin/.',
    languages: {
      django: {
        starterCode: `python manage.py create_admin`,
        solutionCode: `python manage.py createsuperuser`,
        acceptedKeywords: ['createsuperuser']
      },
      python: {
        starterCode: `python manage.py create_admin`,
        solutionCode: `python manage.py createsuperuser`,
        acceptedKeywords: ['createsuperuser']
      }
    }
  },
  {
    id: 917,
    title: 'Bucle en Plantillas Django ({% for %} / {% endfor %})',
    statement: 'Completa la etiqueta de cierre del bucle de plantilla Django ({% ___ %}) en el archivo HTML.',
    type: 'complete',
    difficulty: 'medio',
    categoryType: 'html',
    fileName: 'template.html',
    hint: 'La etiqueta de cierre para un bloque for en Django es endfor.',
    explanation: 'El motor de plantillas de Django (DTL) requiere cerrar explícitamente los bloques for con {% endfor %}.',
    languages: {
      django: {
        starterCode: `<!-- templates/post_list.html -->\n<ul>\n{% for post in posts %}\n    <li>{{ post.titulo }}</li>\n{% ___ %}\n</ul>`,
        solutionCode: `<!-- templates/post_list.html -->\n<ul>\n{% for post in posts %}\n    <li>{{ post.titulo }}</li>\n{% endfor %}\n</ul>`,
        acceptedKeywords: ['endfor']
      },
      html: {
        starterCode: `<!-- templates/post_list.html -->\n<ul>\n{% for post in posts %}\n    <li>{{ post.titulo }}</li>\n{% ___ %}\n</ul>`,
        solutionCode: `<!-- templates/post_list.html -->\n<ul>\n{% for post in posts %}\n    <li>{{ post.titulo }}</li>\n{% endfor %}\n</ul>`,
        acceptedKeywords: ['endfor']
      },
      python: {
        starterCode: `<!-- templates/post_list.html -->\n<ul>\n{% for post in posts %}\n    <li>{{ post.titulo }}</li>\n{% ___ %}\n</ul>`,
        solutionCode: `<!-- templates/post_list.html -->\n<ul>\n{% for post in posts %}\n    <li>{{ post.titulo }}</li>\n{% endfor %}\n</ul>`,
        acceptedKeywords: ['endfor']
      }
    }
  },
  {
    id: 918,
    title: 'Herencia de Plantillas ({% extends %})',
    statement: 'Corrige la etiqueta superior para extender de la plantilla base "base.html" (usa {% extends %}, no include).',
    type: 'fix',
    difficulty: 'medio',
    categoryType: 'html',
    fileName: 'template.html',
    hint: 'Usa {% extends "base.html" %} al inicio de la plantilla hija.',
    explanation: '{% extends %} debe ser la primera etiqueta de una plantilla hija para heredar la estructura visual compartida.',
    languages: {
      django: {
        starterCode: `<!-- templates/detalle.html -->\n{% include "base.html" %}\n\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        solutionCode: `<!-- templates/detalle.html -->\n{% extends "base.html" %}\n\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        acceptedKeywords: ['extends']
      },
      html: {
        starterCode: `<!-- templates/detalle.html -->\n{% include "base.html" %}\n\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        solutionCode: `<!-- templates/detalle.html -->\n{% extends "base.html" %}\n\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        acceptedKeywords: ['extends']
      },
      python: {
        starterCode: `<!-- templates/detalle.html -->\n{% include "base.html" %}\n\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        solutionCode: `<!-- templates/detalle.html -->\n{% extends "base.html" %}\n\n{% block content %}\n<h2>Detalle del Post</h2>\n{% endblock %}`,
        acceptedKeywords: ['extends']
      }
    }
  },
  {
    id: 919,
    title: 'Creación de Formulario con ModelForm',
    statement: 'Completa la clase interna Meta indicando el modelo correspondiente: model = ___.',
    type: 'complete',
    difficulty: 'medio',
    categoryType: 'python',
    fileName: 'forms.py',
    hint: 'Asigna model = Post.',
    explanation: 'ModelForm genera automáticamente campos de formulario HTML a partir de los atributos de un modelo Django.',
    languages: {
      django: {
        starterCode: `from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = ___\n        fields = ['titulo', 'contenido']`,
        solutionCode: `from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = Post\n        fields = ['titulo', 'contenido']`,
        acceptedKeywords: ['Post']
      },
      python: {
        starterCode: `from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = ___\n        fields = ['titulo', 'contenido']`,
        solutionCode: `from django import forms\nfrom .models import Post\n\nclass PostForm(forms.ModelForm):\n    class Meta:\n        model = Post\n        fields = ['titulo', 'contenido']`,
        acceptedKeywords: ['Post']
      }
    }
  },
  {
    id: 920,
    title: 'Protección CSRF en Formularios HTML ({% csrf_token %})',
    statement: 'Corrige el formulario agregando el token de seguridad obligatorio {% csrf_token %} dentro de la etiqueta <form>.',
    type: 'fix',
    difficulty: 'medio',
    categoryType: 'html',
    fileName: 'template.html',
    hint: 'Incluye {% csrf_token %} justo después de abrir <form method="POST">.',
    explanation: 'Django exige {% csrf_token %} en todos los formularios POST para prevenir ataques maliciosos de Cross-Site Request Forgery.',
    languages: {
      django: {
        starterCode: `<!-- templates/crear.html -->\n<form method="POST">\n    # BUG: Falta el token de seguridad CSRF\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        solutionCode: `<!-- templates/crear.html -->\n<form method="POST">\n    {% csrf_token %}\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        acceptedKeywords: ['{% csrf_token %}']
      },
      html: {
        starterCode: `<!-- templates/crear.html -->\n<form method="POST">\n    # BUG: Falta el token de seguridad CSRF\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        solutionCode: `<!-- templates/crear.html -->\n<form method="POST">\n    {% csrf_token %}\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        acceptedKeywords: ['{% csrf_token %}']
      },
      python: {
        starterCode: `<!-- templates/crear.html -->\n<form method="POST">\n    # BUG: Falta el token de seguridad CSRF\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        solutionCode: `<!-- templates/crear.html -->\n<form method="POST">\n    {% csrf_token %}\n    {{ form.as_p }}\n    <button type="submit">Guardar</button>\n</form>`,
        acceptedKeywords: ['{% csrf_token %}']
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 921 al 930 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 921,
    title: 'Relación Uno a Muchos con ForeignKey y on_delete',
    statement: 'Completa la política de eliminación en cascada para la relación de usuario: on_delete=models.___.',
    type: 'complete',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'models.py',
    hint: 'Usa models.CASCADE.',
    explanation: 'CASCADE elimina automáticamente los registros hijos asociados cuando el registro principal es borrado.',
    languages: {
      django: {
        starterCode: `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Post(models.Model):\n    autor = models.ForeignKey(User, on_delete=models.___)\n    titulo = models.CharField(max_length=200)`,
        solutionCode: `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Post(models.Model):\n    autor = models.ForeignKey(User, on_delete=models.CASCADE)\n    titulo = models.CharField(max_length=200)`,
        acceptedKeywords: ['CASCADE']
      },
      python: {
        starterCode: `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Post(models.Model):\n    autor = models.ForeignKey(User, on_delete=models.___)\n    titulo = models.CharField(max_length=200)`,
        solutionCode: `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass Post(models.Model):\n    autor = models.ForeignKey(User, on_delete=models.CASCADE)\n    titulo = models.CharField(max_length=200)`,
        acceptedKeywords: ['CASCADE']
      }
    }
  },
  {
    id: 922,
    title: 'Obtención Segura con get_object_or_404',
    statement: 'Corrige la vista para recuperar el post usando get_object_or_404 y responder con 404 si no existe.',
    type: 'fix',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'views.py',
    hint: 'Usa post = get_object_or_404(Post, pk=post_id).',
    explanation: 'get_object_or_404 captura automáticamente la excepción DoesNotExist y lanza un HTTP 404 limpio al usuario.',
    languages: {
      django: {
        starterCode: `from django.shortcuts import get_object_or_404, render\nfrom .models import Post\n\n# BUG: objects.get lanza excepción no controlada 500 si no existe el ID\ndef detalle(request, post_id):\n    post = Post.objects.get(pk=post_id)\n    return render(request, 'detalle.html', {'post': post})`,
        solutionCode: `from django.shortcuts import get_object_or_404, render\nfrom .models import Post\n\ndef detalle(request, post_id):\n    post = get_object_or_404(Post, pk=post_id)\n    return render(request, 'detalle.html', {'post': post})`,
        acceptedKeywords: ['get_object_or_404']
      },
      python: {
        starterCode: `from django.shortcuts import get_object_or_404, render\nfrom .models import Post\n\n# BUG: objects.get lanza excepción no controlada 500 si no existe el ID\ndef detalle(request, post_id):\n    post = Post.objects.get(pk=post_id)\n    return render(request, 'detalle.html', {'post': post})`,
        solutionCode: `from django.shortcuts import get_object_or_404, render\nfrom .models import Post\n\ndef detalle(request, post_id):\n    post = get_object_or_404(Post, pk=post_id)\n    return render(request, 'detalle.html', {'post': post})`,
        acceptedKeywords: ['get_object_or_404']
      }
    }
  },
  {
    id: 923,
    title: 'Filtrado de Consultas ORM con Doble Guión Bajo (__)',
    statement: 'Completa la consulta ORM para filtrar posts cuyo título contenga "Django" sin distinguir mayúsculas (titulo_____="Django").',
    type: 'complete',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'views.py',
    hint: 'Usa titulo__icontains=\'Django\'.',
    explanation: 'El doble guion bajo en Django ORM permite lookups avanzados como __icontains, __gte, __year, etc.',
    languages: {
      django: {
        starterCode: `from .models import Post\n\n# Filtrar posts que contengan "Django" de forma insensible a mayúsculas:\nposts = Post.objects.filter(titulo_____='Django')`,
        solutionCode: `from .models import Post\n\nposts = Post.objects.filter(titulo__icontains='Django')`,
        acceptedKeywords: ['__icontains', '__contains']
      },
      python: {
        starterCode: `from .models import Post\n\n# Filtrar posts que contengan "Django" de forma insensible a mayúsculas:\nposts = Post.objects.filter(titulo_____='Django')`,
        solutionCode: `from .models import Post\n\nposts = Post.objects.filter(titulo__icontains='Django')`,
        acceptedKeywords: ['__icontains', '__contains']
      }
    }
  },
  {
    id: 924,
    title: 'Vista Basada en Clases (ListView)',
    statement: 'Corrige la herencia de la vista genérica para listar publicaciones heredando de ListView.',
    type: 'fix',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'views.py',
    hint: 'Hereda de ListView: class PostListView(ListView):',
    explanation: 'Las Class-Based Views (CBV) como ListView proveen lógica estructurada y lista para renderizar colecciones de objetos.',
    languages: {
      django: {
        starterCode: `from django.views.generic import View, ListView\nfrom .models import Post\n\n# BUG: Debe heredar de ListView para listas automáticas\nclass PostListView(View):\n    model = Post\n    template_name = 'post_list.html'\n    context_object_name = 'posts'`,
        solutionCode: `from django.views.generic import ListView\nfrom .models import Post\n\nclass PostListView(ListView):\n    model = Post\n    template_name = 'post_list.html'\n    context_object_name = 'posts'`,
        acceptedKeywords: ['PostListView(ListView):']
      },
      python: {
        starterCode: `from django.views.generic import View, ListView\nfrom .models import Post\n\n# BUG: Debe heredar de ListView para listas automáticas\nclass PostListView(View):\n    model = Post\n    template_name = 'post_list.html'\n    context_object_name = 'posts'`,
        solutionCode: `from django.views.generic import ListView\nfrom .models import Post\n\nclass PostListView(ListView):\n    model = Post\n    template_name = 'post_list.html'\n    context_object_name = 'posts'`,
        acceptedKeywords: ['PostListView(ListView):']
      }
    }
  },
  {
    id: 925,
    title: 'Protección de Vistas con @login_required',
    statement: 'Completa el decorador de autenticación requerida antes de la función de vista privada.',
    type: 'complete',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'views.py',
    hint: 'Usa @login_required.',
    explanation: '@login_required restringe el acceso a usuarios autenticados y redirige automáticamente al login configurado si no lo están.',
    languages: {
      django: {
        starterCode: `from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@___\ndef panel_privado(request):\n    return render(request, 'panel.html')`,
        solutionCode: `from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@login_required\ndef panel_privado(request):\n    return render(request, 'panel.html')`,
        acceptedKeywords: ['login_required']
      },
      python: {
        starterCode: `from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@___\ndef panel_privado(request):\n    return render(request, 'panel.html')`,
        solutionCode: `from django.contrib.auth.decorators import login_required\nfrom django.shortcuts import render\n\n@login_required\ndef panel_privado(request):\n    return render(request, 'panel.html')`,
        acceptedKeywords: ['login_required']
      }
    }
  },
  {
    id: 926,
    title: 'Relación Muchos a Muchos (ManyToManyField)',
    statement: 'Corrige la relación de etiquetas en el modelo Post usando models.ManyToManyField(Tag) en vez de ForeignKey.',
    type: 'fix',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'models.py',
    hint: 'Usa tags = models.ManyToManyField(Tag).',
    explanation: 'ManyToManyField crea internamente una tabla intermedia para vincular múltiples etiquetas a múltiples publicaciones.',
    languages: {
      django: {
        starterCode: `from django.db import models\n\nclass Tag(models.Model):\n    nombre = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    # BUG: Las etiquetas son una relación N:M, no 1:N\n    tags = models.ForeignKey(Tag, on_delete=models.CASCADE)`,
        solutionCode: `from django.db import models\n\nclass Tag(models.Model):\n    nombre = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    tags = models.ManyToManyField(Tag)`,
        acceptedKeywords: ['ManyToManyField']
      },
      python: {
        starterCode: `from django.db import models\n\nclass Tag(models.Model):\n    nombre = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    # BUG: Las etiquetas son una relación N:M, no 1:N\n    tags = models.ForeignKey(Tag, on_delete=models.CASCADE)`,
        solutionCode: `from django.db import models\n\nclass Tag(models.Model):\n    nombre = models.CharField(max_length=50)\n\nclass Post(models.Model):\n    titulo = models.CharField(max_length=200)\n    tags = models.ManyToManyField(Tag)`,
        acceptedKeywords: ['ManyToManyField']
      }
    }
  },
  {
    id: 927,
    title: 'Recolección de Archivos Estáticos (collectstatic)',
    statement: 'Completa el comando de manage.py para empaquetar y unificar los archivos CSS y JS en producción.',
    type: 'complete',
    difficulty: 'avanzado',
    categoryType: 'cmd',
    fileName: 'terminal',
    hint: 'El comando es python manage.py collectstatic.',
    explanation: 'collectstatic recopila todos los archivos estáticos de cada app instalada y los ubica en STATIC_ROOT para servidores como Nginx.',
    languages: {
      django: {
        starterCode: `python manage.py ___`,
        solutionCode: `python manage.py collectstatic`,
        acceptedKeywords: ['collectstatic']
      },
      python: {
        starterCode: `python manage.py ___`,
        solutionCode: `python manage.py collectstatic`,
        acceptedKeywords: ['collectstatic']
      }
    }
  },
  {
    id: 928,
    title: 'Configuración de Producción en settings.py',
    statement: 'Corrige la configuración de seguridad en settings.py para producción desactivando DEBUG (DEBUG = False).',
    type: 'fix',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'settings.py',
    hint: 'Asigna DEBUG = False.',
    explanation: 'Tener DEBUG activado en producción filtra credenciales, variables y código fuente sensible ante cualquier excepción.',
    languages: {
      django: {
        starterCode: `# settings.py para producción:\n# BUG: DEBUG no debe ser True en producción\nDEBUG = True\nALLOWED_HOSTS = ['midominio.com', 'www.midominio.com']`,
        solutionCode: `# settings.py para producción:\nDEBUG = False\nALLOWED_HOSTS = ['midominio.com', 'www.midominio.com']`,
        acceptedKeywords: ['DEBUG = False']
      },
      python: {
        starterCode: `# settings.py para producción:\n# BUG: DEBUG no debe ser True en producción\nDEBUG = True\nALLOWED_HOSTS = ['midominio.com', 'www.midominio.com']`,
        solutionCode: `# settings.py para producción:\nDEBUG = False\nALLOWED_HOSTS = ['midominio.com', 'www.midominio.com']`,
        acceptedKeywords: ['DEBUG = False']
      }
    }
  },
  {
    id: 929,
    title: 'Inclusión de Rutas de App con include() en urls.py',
    statement: 'Completa la función include() en urls.py para incluir las rutas modulares de "blog.urls".',
    type: 'complete',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'urls.py',
    hint: 'Importa e invoca include("blog.urls").',
    explanation: 'include() permite desacoplar y modularizar el enrutamiento delegando cada sección de rutas a su propia aplicación.',
    languages: {
      django: {
        starterCode: `from django.urls import path, ___\n\nurlpatterns = [\n    path('blog/', ___('blog.urls')),\n]`,
        solutionCode: `from django.urls import path, include\n\nurlpatterns = [\n    path('blog/', include('blog.urls')),\n]`,
        acceptedKeywords: ['include']
      },
      python: {
        starterCode: `from django.urls import path, ___\n\nurlpatterns = [\n    path('blog/', ___('blog.urls')),\n]`,
        solutionCode: `from django.urls import path, include\n\nurlpatterns = [\n    path('blog/', include('blog.urls')),\n]`,
        acceptedKeywords: ['include']
      }
    }
  },
  {
    id: 930,
    title: 'Personalización del Admin con ModelAdmin',
    statement: 'Corrige la tupla list_display en admin.py asegurando que los nombres de los campos sean strings ("titulo", "fecha_creacion").',
    type: 'fix',
    difficulty: 'avanzado',
    categoryType: 'python',
    fileName: 'admin.py',
    hint: 'Usa list_display = (\'titulo\', \'fecha_creacion\').',
    explanation: 'ModelAdmin permite configurar qué columnas de texto, fechas y enlaces se muestran en la vista tabular del panel administrativo.',
    languages: {
      django: {
        starterCode: `from django.contrib import admin\nfrom .models import Post\n\n# BUG: Los campos en list_display deben ser nombres en texto (strings)\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = (titulo, fecha_creacion)\n    search_fields = ('titulo',)\n    list_filter = ('fecha_creacion',)`,
        solutionCode: `from django.contrib import admin\nfrom .models import Post\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ('titulo', 'fecha_creacion')\n    search_fields = ('titulo',)\n    list_filter = ('fecha_creacion',)`,
        acceptedKeywords: ["'titulo'", '"titulo"']
      },
      python: {
        starterCode: `from django.contrib import admin\nfrom .models import Post\n\n# BUG: Los campos en list_display deben ser nombres en texto (strings)\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = (titulo, fecha_creacion)\n    search_fields = ('titulo',)\n    list_filter = ('fecha_creacion',)`,
        solutionCode: `from django.contrib import admin\nfrom .models import Post\n\n@admin.register(Post)\nclass PostAdmin(admin.ModelAdmin):\n    list_display = ('titulo', 'fecha_creacion')\n    search_fields = ('titulo',)\n    list_filter = ('fecha_creacion',)`,
        acceptedKeywords: ["'titulo'", '"titulo"']
      }
    }
  }
];
