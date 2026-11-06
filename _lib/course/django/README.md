# 🌿 Documentación y Arquitectura del Curso: Django

Directorio central de documentación técnica, mapa de vistas, componentes interactivos, diapositivas y recursos pedagógicos del curso **Django** en la plataforma.

---

## 📋 1. Ficha Técnica del Curso

Configuración canónica definida en [`src/data/courses.ts`](../../../src/data/courses.ts):

| Propiedad | Valor |
| :--- | :--- |
| **Slug** | `django` |
| **Nombre** | Django |
| **Descripción** | Desarrollo backend con Python y Django: modelos, CRUD, APIs REST y seguridad. |
| **Categoría** | `advanced` |
| **Estado** | `available` |
| **Color Principal** | `#0c4a3f` |
| **Imagen de Portada** | `/images/django.webp` |
| **Soporte Diapositivas** | `hasSlides: true` (`/course-slides/django/[...lesson]`) |
| **Total de Módulos / Vistas** | 21 lecciones (10 unidades troncales + 11 subvistas especializadas) |

---

## 🗺️ 2. Mapa de Vistas y Lecciones (`src/pages/course/django/`)

La vista índice del curso se encuentra en [`src/pages/course/django/index.astro`](../../../src/pages/course/django/index.astro). A continuación se detalla el desglose completo de cada vista, su ruta URL, su archivo de diapositivas asociado y los laboratorios interactivos que integra:

| # | Título en Catálogo | Slug / Ruta Web (`/course/django/...`) | Archivo de Vista (`.astro`) | Diapositivas (`src/data/slides/django/`) | Componentes Interactivos / Recursos |
| :- | :--- | :--- | :--- | :--- | :--- |
| **01** | **1. Introducción** | `/course/django/introduccion/` | [`introduccion/index.astro`](../../../src/pages/course/django/introduccion/index.astro) | [`introduccion.ts`](../../../src/data/slides/django/introduccion.ts) (7 slides) | `DjangoQuizModal` (`introduccion`) |
| **02** | **2. Python para Backend** | `/course/django/python-para-backend/` | [`python-para-backend/index.astro`](../../../src/pages/course/django/python-para-backend/index.astro) | [`python-para-backend.ts`](../../../src/data/slides/django/python-para-backend.ts) (7 slides) | `DjangoQuizModal` (`python-para-backend`) |
| **03** | **3. Introducción a Django** | `/course/django/introduccion-django/` | [`introduccion-django/index.astro`](../../../src/pages/course/django/introduccion-django/index.astro) | [`introduccion-django.ts`](../../../src/data/slides/django/introduccion-django.ts) (7 slides) | `DjangoInteractiveTerminal`, `VideoGridWithCheck`, `DjangoQuizModal` |
| **04** | **4. Arquitectura Django** | `/course/django/arquitectura-django/` | [`arquitectura-django/index.astro`](../../../src/pages/course/django/arquitectura-django/index.astro) | [`arquitectura-django.ts`](../../../src/data/slides/django/arquitectura-django.ts) (6 slides) | `ZoomableImage` (`mvt_django.png`) |
| **04.1** | **4.1 URLs y Enrutamiento** *(Subitem)* | `/course/django/arquitectura-django/urls/` | [`arquitectura-django/urls.astro`](../../../src/pages/course/django/arquitectura-django/urls.astro) | [`arquitectura-django-urls.ts`](../../../src/data/slides/django/arquitectura-django-urls.ts) (7 slides) | `ZoomableImage` (`mvt_django.png`) |
| **04.2** | **4.2 Views (Vistas)** *(Subitem)* | `/course/django/arquitectura-django/views/` | [`arquitectura-django/views.astro`](../../../src/pages/course/django/arquitectura-django/views.astro) | [`arquitectura-django-views.ts`](../../../src/data/slides/django/arquitectura-django-views.ts) (7 slides) | `DjangoViewsPlayground` |
| **04.3** | **4.3 Templates y DTL** *(Subitem)* | `/course/django/arquitectura-django/template/` | [`arquitectura-django/template.astro`](../../../src/pages/course/django/arquitectura-django/template.astro) | [`arquitectura-django-template.ts`](../../../src/data/slides/django/arquitectura-django-template.ts) (7 slides) | `CodeBlock` (Herencia `base.html` y filtros DTL) |
| **04.4** | **4.4 Ejercicios y Retos** *(Subitem)* | `/course/django/arquitectura-django/training/` | [`arquitectura-django/training.astro`](../../../src/pages/course/django/arquitectura-django/training.astro) | [`arquitectura-django-training.ts`](../../../src/data/slides/django/arquitectura-django-training.ts) (6 slides) | `DjangoQuizModal` (`arquitectura-django`) |
| **05** | **5. Modelos y Campos SQL** | `/course/django/modelo-bd/` | [`modelo-bd/index.astro`](../../../src/pages/course/django/modelo-bd/index.astro) | [`modelo-bd.ts`](../../../src/data/slides/django/modelo-bd.ts) (13 slides) | `DjangoFieldSqlExplorer`, `DjangoQuizModal` (`modelo-bd`) |
| **05.1** | **5.1 Paso a Paso: Boletas y Migraciones** | `/course/django/modelo-bd-step/` | [`modelo-bd-step/index.astro`](../../../src/pages/course/django/modelo-bd-step/index.astro) | [`modelo-bd-step.ts`](../../../src/data/slides/django/modelo-bd-step.ts) (15 slides) | `DjangoMigrationStepper`, `DjangoQuizModal` (`modelo-bd-step`) |
| **05.2** | **5.2 Caso Práctico: Biblioteca y ORM** | `/course/django/modelo-bd-library/` | [`modelo-bd-library/index.astro`](../../../src/pages/course/django/modelo-bd-library/index.astro) | [`modelo-bd-library.ts`](../../../src/data/slides/django/modelo-bd-library.ts) (7 slides) | `DjangoOrmPlayground`, `DjangoQuizModal` (`modelo-bd-library`) |
| **05.3** | **5.3 Flota y Pilotos: Migraciones y Faker** | `/course/django/modelo-bd-vehiculos/` | [`modelo-bd-vehiculos/index.astro`](../../../src/pages/course/django/modelo-bd-vehiculos/index.astro) | [`modelo-bd-vehiculos.ts`](../../../src/data/slides/django/modelo-bd-vehiculos.ts) (15 slides) | `DjangoFlotaErDiagram`, `DjangoFlotaFakerSimulator`, `DjangoQuizModal` (`modelo-bd-vehiculos`) |
| **05.4** | **5.4 Conexión de Django con MySQL (PyMySQL)** | `/course/django/modelo-bd-mysql/` | [`modelo-bd-mysql/index.astro`](../../../src/pages/course/django/modelo-bd-mysql/index.astro) | [`modelo-bd-mysql.ts`](../../../src/data/slides/django/modelo-bd-mysql.ts) (8 slides) | `DjangoQuizModal` (`modelo-bd-mysql`) |
| **06** | **6. Django Admin y CRUD** | `/course/django/admin-crud/` | [`admin-crud/index.astro`](../../../src/pages/course/django/admin-crud/index.astro) | [`admin-crud.ts`](../../../src/data/slides/django/admin-crud.ts) (7 slides) | `DjangoAdminStudio`, `DjangoCrudSimulator`, `DjangoQuizModal` (`admin-crud`) |
| **07** | **7. Autenticación y Seguridad** | `/course/django/seguridad/` | [`seguridad/index.astro`](../../../src/pages/course/django/seguridad/index.astro) | [`seguridad.ts`](../../../src/data/slides/django/seguridad.ts) (7 slides) | `DjangoAuthSimulator`, `DjangoQuizModal` (`seguridad`) |
| **07.1** | **7.1 Guía Práctica: CRUD y Persistencia (01–06)** *(Subitem)* | `/course/django/guia-practica/` | [`guia-practica/index.astro`](../../../src/pages/course/django/guia-practica/index.astro) | Generador genérico (`registry.ts`) | 6 Videolecciones YouTube + `CodeBlock` + `DjangoQuizModal` (`guia-practica`) |
| **07.2** | **7.2 Guía Práctica: Sesiones y Permisos (07–10)** *(Subitem)* | `/course/django/guia-practica/seguridad/` | [`guia-practica/seguridad.astro`](../../../src/pages/course/django/guia-practica/seguridad.astro) | Generador genérico (`registry.ts`) | 4 Videolecciones YouTube + `CodeBlock` + `DjangoQuizModal` (`guia-practica`) |
| **07.3** | **7.3 Guía Práctica: Desafío Integrador** *(Subitem)* | `/course/django/guia-practica/proyecto/` | [`guia-practica/proyecto.astro`](../../../src/pages/course/django/guia-practica/proyecto.astro) | Generador genérico (`registry.ts`) | Mapa de rutas, Checklist + `DjangoQuizModal` (`guia-practica`) |
| **08** | **8. APIs RESTful** | `/course/django/apis-restful/` | [`apis-restful/index.astro`](../../../src/pages/course/django/apis-restful/index.astro) | [`apis-restful.ts`](../../../src/data/slides/django/apis-restful.ts) (6 slides) | `DjangoQuizModal` (`apis-restful`) |
| **09** | **9. Django REST Framework y JWT** | `/course/django/drf-jwt/` | [`drf-jwt/index.astro`](../../../src/pages/course/django/drf-jwt/index.astro) | [`drf-jwt.ts`](../../../src/data/slides/django/drf-jwt.ts) (7 slides) | `DjangoQuizModal` (`drf-jwt`) |
| **10** | **10. Proyecto Integrador** | `/course/django/proyecto-integrador/` | [`proyecto-integrador/index.astro`](../../../src/pages/course/django/proyecto-integrador/index.astro) | [`proyecto-integrador.ts`](../../../src/data/slides/django/proyecto-integrador.ts) (6 slides) | `DjangoQuizModal` (`proyecto-integrador`) |

---

## 🧪 3. Desglose de Contenido por Vista

### Módulo 1–3: Fundamentos y Entorno
- **1. Introducción (`introduccion`)**: Concepto de backend, rol de Django, ciclo HTTP `Request`/`Response` y ventajas del framework ("baterías incluidas").
- **2. Python para Backend (`python-para-backend`)**: Repaso de tipos de datos (`str`, `int`, `bool`, `list`, `dict`), funciones y estructuras de control aplicadas a lógica de servidor.
- **3. Introducción a Django y `venv` (`introduccion-django`)**:
  - Regla de oro del entorno virtual (`python -m venv venv` y activación `(venv)`).
  - Instalación con `pip`, creación del proyecto (`django-admin startproject biblioteca`), arranque con `runserver` y creación de apps (`startapp`).
  - Incluye simulador interactivo paso a paso de terminal y lista de videotutoriales con seguimiento de progreso.

### Módulo 4: Arquitectura MVT (`arquitectura-django`)
- **Vista Principal (`arquitectura-django/index.astro`)**: Visión general del patrón **MVT (Model - View - Template)** y navegación hacia las 4 subvistas:
  - **4.1 URLs (`urls.astro`)**: `urlpatterns`, modularización con `include()` y `namespace`, Path Converters nativos (`int`, `slug`, `uuid`) y personalizados, `re_path()` con Regex, parámetros `GET` (`request.GET`) y resolución inversa (`reverse`, `{% url %}`).
  - **4.2 Views (`views.astro`)**: Comparativa e implementación de Vistas Basadas en Funciones (**FBV**) vs Vistas Basadas en Clases (**CBV**: `ListView`, `DetailView`, `CreateView`) y simulador de peticiones en tiempo real.
  - **4.3 Templates (`template.astro`)**: Motor **DTL (Django Template Language)**, herencia de plantillas (`base.html`, `{% extends %}`, `{% block %}`), variables, filtros y etiquetas de control.
  - **4.4 Entrenamiento (`training.astro`)**: Ejercicios guiados sobre el Proyecto 1 (*Biblioteca Central*) y retos aplicados al Proyecto 2 (*Tienda Online*).

### Módulo 5: Modelado de Datos, Migraciones, ORM y Motores SQL
- **5. Modelos y Campos SQL (`modelo-bd`)**:
  - Traducción de clases Python (`models.Model`) a DDL SQL (`CREATE TABLE`) mediante `makemigrations` y `sqlmigrate`.
  - Análisis profundo de `CharField`, `DecimalField` vs `FloatField`, `DateTimeField` (`auto_now_add` vs `auto_now`), `FileField`/`ImageField` y relaciones (`ForeignKey`, `OneToOneField`, `ManyToManyField`).
- **5.1 Paso a Paso: Boletas y Migraciones (`modelo-bd-step`)**:
  - Evolución real de un esquema de base de datos en 5 migraciones (`0001` a `0005`): catálogo base, transacciones (`Boleta` y `DetalleBoleta`), incorporación de `Cliente` nulo/opcional, restricciones `CheckConstraint` y sembrado inicial con `RunPython`.
- **5.2 Caso Práctico: Biblioteca Digital y ORM (`modelo-bd-library`)**:
  - Modelo integral de Biblioteca, ciclo de vida de migraciones en producción (campos `NOT NULL`, `RunPython`, rollbacks), Seeder con `Faker` y guía de **Django ORM en 5 niveles** (básico, relaciones, problema N+1 con `select_related`/`prefetch_related`, agregaciones `annotate`/`aggregate`, y expresiones avanzadas `Q`, `F`, `Case/When`, `Subquery`).
- **5.3 Flota y Pilotos: Migraciones y Faker (`modelo-bd-vehiculos`)**:
  - Caso práctico de gestión de flota (`Piloto`, `Vehiculo`, `Mantenimiento`) en 3 fases evolutivas de migración, diagrama Entidad-Relación interactivo y controlador web para generación masiva de datos de prueba con `Faker`.
- **5.4 Conexión con MySQL y PyMySQL (`modelo-bd-mysql`)**:
  - Diagnóstico de versiones de Python, Django y MySQL/MariaDB, matriz de compatibilidad oficial, instalación y puente con `PyMySQL` (`pymysql.install_as_MySQLdb()`), configuración de `DATABASES` en `settings.py` y resolución de errores frecuentes (*troubleshooting*).

### Módulo 6–10: Administración, Seguridad, APIs y Proyecto Final
- **6. Django Admin y CRUD (`admin-crud`)**:
  - Transformación del panel de administración mediante las **6 palancas de `ModelAdmin`** (`list_display`, `search_fields`, `list_filter`, `list_editable`, `inlines`, `@admin.action`), modernización visual con **Django Unfold** (Tailwind CSS), `ModelForm` con validaciones y vistas CRUD completas (FBV/CBV).
- **7. Autenticación y Seguridad (`seguridad`)**:
  - Extensión del modelo de usuario (`AbstractUser` vs `OneToOneField`), configuración de `AUTH_USER_MODEL`, personalización de `UserAdmin`, control de acceso con `@login_required`, `@permission_required`, `LoginRequiredMixin` y `UserPassesTestMixin`.
- **7.1 Curso Práctico de Django: CRUD, Sesiones y Control de Acceso (`guia-practica`)**:
  - Guía práctica ampliada en **10 videolecciones con YouTube** dividida en 2 partes y un desafío integrador:
    - **Parte 1 · CRUD y persistencia de datos (Lecciones 01–06)**: Modelo `Producto`, registro en Django Admin, listado con `SELECT` y tabla HTML, creación con formularios HTML puros y `request.POST` (regla sin `ModelForm`), edición/eliminación con `get_object_or_404` y confirmación `POST`, y alertas con `django.contrib.messages`.
    - **Parte 2 · Autenticación, sesiones y permisos (Lecciones 07–10)**: `authenticate`, `login`, `logout` por `POST`, protección de rutas con `@login_required`, autorización con `@permission_required` y grupos, y creación de decoradores personalizados (`@grupo_requerido` con `PermissionDenied` HTTP 403).
    - **Desafío Final**: Integración de un sistema de inventario protegido.
- **8. APIs RESTful (`apis-restful`)**:
  - Fundamentos de arquitectura REST, verbos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), códigos de estado y respuestas JSON con `JsonResponse`.
- **9. Django REST Framework y JWT (`drf-jwt`)**:
  - Serializadores (`ModelSerializer`), `APIView`, `ModelViewSet`, `DefaultRouter` y autenticación *stateless* con **SimpleJWT** (`access` y `refresh` tokens).
- **10. Proyecto Integrador (`proyecto-integrador`)**:
  - Especificación técnica, requisitos mínimos, arquitectura de endpoints y guía de integración de todos los módulos del curso.

---

## 🧩 4. Componentes Interactivos (`src/components/django/`)

El curso cuenta con **10 componentes interactivos en React (`.tsx`)** diseñados específicamente para las vistas de Django:

| Componente | Archivo | Vista donde se utiliza | Funcionalidad Pedagógica |
| :--- | :--- | :--- | :--- |
| **`DjangoInteractiveTerminal`** | [`DjangoInteractiveTerminal.tsx`](../../../src/components/django/DjangoInteractiveTerminal.tsx) | `introduccion-django` | Consola interactiva guiada de 6 pasos para practicar `venv`, activación, `pip install django`, `startproject`, `runserver` y `startapp`. |
| **`DjangoViewsPlayground`** | [`DjangoViewsPlayground.tsx`](../../../src/components/django/DjangoViewsPlayground.tsx) | `arquitectura-django/views` | Simulador de peticiones HTTP (`GET`/`POST`), extracción de `kwargs` y `request.GET`, contexto y HTML renderizado (FBV y CBV). |
| **`DjangoFieldSqlExplorer`** | [`DjangoFieldSqlExplorer.tsx`](../../../src/components/django/DjangoFieldSqlExplorer.tsx) | `modelo-bd` | Configurador visual de campos de Django (`CharField`, `DecimalField`, `ForeignKey`, etc.) que traduce en vivo a código Python y DDL SQL (PostgreSQL / SQLite). |
| **`DjangoMigrationStepper`** | [`DjangoMigrationStepper.tsx`](../../../src/components/django/DjangoMigrationStepper.tsx) | `modelo-bd-step` | Línea de tiempo interactiva de 5 migraciones evolutivas (`0001` a `0005`) mostrando comando, código de `models.py`, SQL emitido y tablas resultantes. |
| **`DjangoOrmPlayground`** | [`DjangoOrmPlayground.tsx`](../../../src/components/django/DjangoOrmPlayground.tsx) | `modelo-bd-library` | Inspector de consultas Django ORM (Niveles 1 a 5) para los proyectos `biblioteca` y `tienda`, mostrando la traducción SQL exacta y el conjunto de resultados. |
| **`DjangoFlotaErDiagram`** | [`DjangoFlotaErDiagram.tsx`](../../../src/components/django/DjangoFlotaErDiagram.tsx) | `modelo-bd-vehiculos` | Diagrama Entidad-Relación interactivo para el dominio de Flota (`Piloto`, `Vehiculo`, `Mantenimiento`) con inspección de claves primarias, foráneas y restricciones. |
| **`DjangoFlotaFakerSimulator`** | [`DjangoFlotaFakerSimulator.tsx`](../../../src/components/django/DjangoFlotaFakerSimulator.tsx) | `modelo-bd-vehiculos` | Simulador de migraciones en 3 fases y generador interactivo de registros realistas con `Faker` y consultas ORM en tiempo real. |
| **`DjangoAdminStudio`** | [`DjangoAdminStudio.tsx`](../../../src/components/django/DjangoAdminStudio.tsx) | `admin-crud` | Laboratorio interactivo donde el estudiante activa/desactiva las 6 palancas de `ModelAdmin` y alterna entre el tema clásico de Django y **Django Unfold**. |
| **`DjangoCrudSimulator`** | [`DjangoCrudSimulator.tsx`](../../../src/components/django/DjangoCrudSimulator.tsx) | `admin-crud` | Simulador dual (Panel Admin y Formulario CRUD `ModelForm`) con validaciones de negocio para los proyectos `biblioteca` y `tienda`. |
| **`DjangoAuthSimulator`** | [`DjangoAuthSimulator.tsx`](../../../src/components/django/DjangoAuthSimulator.tsx) | `seguridad` | Simulador de `AbstractUser`, `UserAdmin`, roles, permisos, acciones masivas y control de acceso en vistas. |

---

## 📊 5. Sistema de Diapositivas, Quizzes y Retos

### 5.1 Presentaciones Interactivas (`src/data/slides/django/`)
- **Registro Central**: [`src/data/slides/django/registry.ts`](../../../src/data/slides/django/registry.ts) expone `getSlidesForLesson(lessonSlug)` conectando las 18 rutas con sus mazos de diapositivas.
- **Visor de Presentaciones**: Accesible en `/course-slides/django/[...lesson]` mediante [`src/pages/course-slides/[course]/[...lesson].astro`](../../../src/pages/course-slides/[course]/[...lesson].astro) y [`CourseSlideViewer.tsx`](../../../src/components/slides/CourseSlideViewer.tsx).
- **Quizzes en Diapositivas**: [`src/data/slides/django/quizzes.ts`](../../../src/data/slides/django/quizzes.ts) contiene **90 preguntas interactivas** (5 por cada una de las 18 lecciones/sublecciones) utilizando las 7 mecánicas de juego (`TrueFalse`, `MultipleChoice`, `ReorderSequence`, `MatchPairs`, `FillInTheBlank`, `PredictOutput`, `FindTheBug`).
- **Metacognición**: [`src/data/slides/django/metacognition.ts`](../../../src/data/slides/django/metacognition.ts) define las preguntas específicas de reflexión metacognitiva para cada módulo del curso.

### 5.2 Quizzes de Fin de Lección (Vista Web)
- **Componente Modal**: [`src/components/quizzes/DjangoQuizModal.astro`](../../../src/components/quizzes/DjangoQuizModal.astro)
- **Banco de Preguntas**: [`src/data/djangoQuizBank.ts`](../../../src/data/djangoQuizBank.ts) contiene **14 cuestionarios** (`introduccion`, `python-para-backend`, `introduccion-django`, `arquitectura-django`, `modelo-bd`, `modelo-bd-step`, `modelo-bd-mysql`, `modelo-bd-library`, `modelo-bd-vehiculos`, `admin-crud`, `seguridad`, `apis-restful`, `drf-jwt`, `proyecto-integrador`).

### 5.3 Retos Express de Código (`Challenges Express`)
- **Archivo**: [`src/data/challengesExpressDjango.ts`](../../../src/data/challengesExpressDjango.ts)
- Contiene **30 ejercicios prácticos de código y terminal** (IDs `901` a `930`) clasificados en niveles **Fácil**, **Medio** y **Difícil** (modalidades `complete`, `fix` y `write`).

---

## 🏗️ 6. Proyectos Transversales del Curso

El curso articula la teoría a través de **4 dominios prácticos**:
1. **📚 Proyecto Principal — Sistema de Biblioteca Digital (`biblioteca`)**: Hilo conductor de las unidades de Entornos, URLs, Vistas, Templates, Modelos, ORM, Admin y Seguridad.
2. **🛒 Segundo Proyecto — Tienda Online / E-Commerce (`tienda`)**: Proyecto de transferencia práctica presente en las secciones de desafíos de Arquitectura, ORM, Admin/CRUD y Seguridad.
3. **🧾 Caso Evolutivo — Sistema de Boletas (`ventas`)**: Utilizado en la lección `5.1` para enseñar migraciones incrementales paso a paso.
4. **🚛 Caso de Flota y Pilotos (`flota`)**: Utilizado en la lección `5.3` y en `DjangoAdminStudio` para modelado ER, generación con `Faker` y personalización avanzada del Admin.

---

## 📂 7. Documentación de Referencia en esta Carpeta (`_lib/course/django/`)

En este mismo directorio se encuentran almacenados los manuales y guías maestras del curso para consulta y mantenimiento:

- 📄 [`django-guia-completa-biblioteca.md`](./django-guia-completa-biblioteca.md): Guía maestra del proyecto **Biblioteca Profesional** (URLs avanzadas, `models.py` completo, estrategias de migración, seeder con `Faker` y 5 niveles de Django ORM).
- 📄 [`django-segundo-proyecto-tienda.md`](./django-segundo-proyecto-tienda.md): Guía técnica maestra del segundo proyecto **Tienda Online (`tienda`)** con estructura de apps (`catalogo` y `pedidos`), modelos, vistas, formularios y retos.
- 🌐 [`curso_django_inacap_guia_ampliada.html`](./curso_django_inacap_guia_ampliada.html): Archivo fuente HTML de la guía práctica de 10 lecciones (CRUD con `request.POST`, mensajes, sesiones, permisos y decoradores personalizados), integrada en la vista [`src/pages/course/django/guia-practica/index.astro`](../../../src/pages/course/django/guia-practica/index.astro).
- 📘 [`Guia_Django_MySQL_PyMySQL.docx`](./Guia_Django_MySQL_PyMySQL.docx): Documento base de la lección 5.4 para conexión y diagnóstico de Django con MySQL/MariaDB usando PyMySQL.
- 📘 [`Guia_Django_ORM_CRUD_30_Consultas_Empleados.docx`](./Guia_Django_ORM_CRUD_30_Consultas_Empleados.docx): Guía de ejercitación de CRUD y 30 consultas con el ORM de Django.
- 📘 [`Informe_30_Consultas_SQL_Django_ORM.docx`](./Informe_30_Consultas_SQL_Django_ORM.docx): Informe comparativo de 30 consultas SQL nativas y su equivalencia en Django ORM.

---

## 🖼️ 8. Recursos Estáticos, Imágenes y Centro de Descargas (`下载中心`)

- **Portada del curso**: `public/images/django.webp`
- **Diagrama Arquitectura MVT**: [`src/assets/images/django/mvt_django.png`](../../../src/assets/images/django/mvt_django.png) (utilizado con `ZoomableImage` en `arquitectura-django/index.astro` y `arquitectura-django/urls.astro`).
- **Centro de Descargas de Ejercicios (`下载中心`)**:
  - **Carpeta física**: [`public/download/下载中心/django/`](../../../public/download/下载中心/django/)
  - **URL pública en la web**: `/download/下载中心/django/<nombre-del-archivo>`
  - **Ejemplo de enlace de descarga en una vista `.astro`**:
    ```html
    <a href="/download/下载中心/django/guia-ejercicios.pdf" download>
      📥 Descargar Ejercicios
    </a>
    ```


