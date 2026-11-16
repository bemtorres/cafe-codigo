import type { CourseDocumentJSON, CourseSeccion } from './courseJsonTypes';
import guideVideos from './djangoGuideVideos.json';

const lessonNotes = [
  {
    objective: 'Define los modelos Libro y Categoria y crea sus tablas mediante migraciones.',
    explanation: [
      'En el video 1 se crean dos modelos. Cada <code>Libro</code> pertenece a una <code>Categoria</code> mediante una <code>ForeignKey</code>. Desde una categoría puedes consultar sus libros con <code>categoria.libros.all()</code>.',
      'El ejemplo sigue el código del video. El ISBN es único, la descripción y la imagen son opcionales y <code>models.CASCADE</code> elimina los libros asociados al borrar su categoría.',
      'Con la app <code>biblioteca</code> registrada en <code>INSTALLED_APPS</code> y Pillow instalado para <code>ImageField</code>, ejecuta <code>makemigrations</code> para generar el archivo de migración y <code>migrate</code> para aplicarlo. <code>showmigrations</code> permite comprobar el resultado.',
    ].join('</p><p>'),
    practice: 'Reproduce los modelos, genera y aplica la migración. Abre el archivo generado, identifica las operaciones que crean Categoria y Libro y señala dónde se declara la clave foránea.',
  },
  {
    objective: 'Configura Django Admin para buscar libros y filtrarlos por categoría.',
    explanation: 'Registra <code>Categoria</code> y <code>Libro</code> en <code>admin.py</code>. Configura las columnas, la búsqueda por nombre o ISBN y el filtro por categoría.',
    practice: 'Crea dos categorías y registra tres libros en Django Admin. Busca uno por ISBN y comprueba que el filtro muestra los libros de la categoría elegida.',
  },
  {
    objective: 'Consulta el catálogo con el ORM y muestra los libros en una tabla HTML.',
    explanation: 'La vista pasa un QuerySet a la plantilla. <code>select_related("categoria")</code> trae la categoría junto con cada libro. <code>{% for %}</code> recorre los resultados y <code>{% empty %}</code> muestra un mensaje cuando el catálogo está vacío.',
    practice: 'Agrega una columna Descripción y muestra «Sin descripción» cuando esté vacía. Verifica cómo se ve el listado con y sin libros.',
  },
  {
    objective: 'Valida un formulario HTML en la vista y guarda un libro mediante POST.',
    explanation: 'Usa GET para mostrar el formulario y POST para leer el nombre, el ISBN y la categoría. Incluye <code>{% csrf_token %}</code>. El formulario usa <code>multipart/form-data</code> para recibir la imagen opcional en <code>request.FILES</code>.',
    practice: 'Crea un libro y comprueba que aparece en el listado. Luego intenta guardar otro con el mismo ISBN y verifica que se muestre el error.',
  },
  {
    objective: 'Actualiza y elimina libros identificados por su clave primaria.',
    explanation: 'Recupera el registro con <code>get_object_or_404</code>. En edición, GET carga los valores actuales y POST guarda los cambios validados. Para eliminar, GET muestra la confirmación y POST ejecuta el borrado.',
    practice: 'Cambia la categoría de un libro, elimina otro tras confirmarlo y prueba una URL que apunte a un identificador inexistente.',
  },
  {
    objective: 'Comunica el resultado de las operaciones después de redirigir.',
    explanation: 'Registra el resultado con <code>django.contrib.messages</code> antes del redirect y recorre los mensajes en la plantilla base. Usa un nivel distinto para éxito, advertencia y error.',
    practice: 'Añade mensajes al crear, editar y eliminar. Comprueba que cada mensaje aparece tras su operación y desaparece en la siguiente recarga.',
  },
  {
    objective: 'Inicia y cierra una sesión con el sistema de autenticación de Django.',
    explanation: '<code>authenticate</code> comprueba las credenciales, <code>login</code> asocia al usuario con la sesión y <code>logout</code> cierra esa sesión. Usa un formulario POST con CSRF para cerrar sesión.',
    practice: 'Prueba credenciales válidas e inválidas. Luego cierra sesión y comprueba que ya no puedes entrar a una vista protegida.',
  },
  {
    objective: 'Restringe el acceso al catálogo a usuarios autenticados.',
    explanation: 'Aplica <code>@login_required</code> a las vistas protegidas y configura <code>LOGIN_URL</code>. El decorador redirige al visitante sin sesión a la página de inicio de sesión.',
    practice: 'Protege las cuatro operaciones del catálogo y prueba sus URL directamente desde una ventana privada.',
  },
  {
    objective: 'Crea UserProfile y guarda el rol del usuario al iniciar sesión.',
    explanation: [
      'Define los roles en <code>settings.ROLES</code>. El modelo <code>UserProfile</code> vincula un perfil con un usuario mediante <code>OneToOneField</code> y guarda el rol en <code>role</code>. Genera y aplica la migración, y asigna un perfil a cada cuenta de prueba.',
      'Al iniciar sesión, valida las credenciales con <code>authenticate</code> y busca el perfil asociado. Después de llamar a <code>login</code>, guarda el rol en <code>request.session[\'perfil\']</code> para consultarlo en las siguientes solicitudes.',
    ].join('</p><p>'),
    practice: 'Asigna perfiles con roles distintos a dos usuarios. Inicia sesión con cada cuenta y verifica que request.session[\'perfil\'] contenga el rol correspondiente.',
  },
  {
    objective: 'Extrae una regla de acceso reutilizable a un decorador.',
    explanation: 'El decorador comprueba la sesión y el grupo antes de ejecutar la vista. Conserva los metadatos de la función con <code>wraps</code> y devuelve 403 si el usuario autenticado carece del acceso requerido.',
    practice: 'Aplica el decorador a la eliminación de libros. Prueba sin sesión, con un operador y con un administrador.',
  },
];

function codeBlock(code: string, language: 'python' | 'html' | 'bash'): string {
  const escaped = code.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `<pre><code class="language-${language}">${escaped}</code></pre>`;
}

const lessons: CourseSeccion[] = guideVideos.map(({ title, videoUrl, videoPageUrl, examples }, index) => {
  const number = String(index + 1).padStart(2, '0');
  const id = `django-leccion-${number}`;
  const { objective, explanation, practice } = lessonNotes[index];
  const [mainExample, extraExample] = examples;
  const extraLanguage = extraExample.startsWith('<') ? 'html' : extraExample.startsWith('#') ? 'python' : 'bash';

  return {
    id,
    title: `${number} · ${title}`,
    contenidos: [
      {
        id: `${id}-video`,
        title: `Video · ${title}`,
        widget: {
          id: `${id}-video`,
          type: 'video-editorial',
          componentName: 'WidgetVideoEditorial',
          summary: objective,
          bgMode: 'white',
          data: { title, objective, videoUrl, videoPageUrl },
        },
      },
      {
        id: `${id}-practica`,
        title: `Práctica · ${title}`,
        widget: {
          id: `${id}-practica`,
          type: 'rich-text-editorial',
          componentName: 'WidgetRichTextEditorial',
          summary: `Ejemplos y práctica de la lección ${number}.`,
          data: {
            badge: `Lección ${number} · Guía de práctica`,
            title: 'Aplica lo que viste',
            cardFrame: false,
            htmlContent: [
              `<p>${explanation}</p>`,
              '<h3>Ejemplo principal</h3>',
              codeBlock(mainExample, 'python'),
              '<h3>Ejemplo complementario</h3>',
              codeBlock(extraExample, extraLanguage),
              `<blockquote><p><strong>Actividad de aplicación</strong></p><p>${practice}</p></blockquote>`,
            ].join(''),
          },
        },
      },
    ],
  };
});

export const DJANGO_GUIDE_COURSE: CourseDocumentJSON = {
  courseId: 'django-inacap-guia-practica',
  version: '1.2.0',
  title: 'Curso práctico de Django',
  institution: 'INACAP',
  defaultBrandId: 'inacap',
  showScoreInBanner: false,
  modulos: [
    {
      id: 'django-inventario',
      title: 'Curso práctico de Django',
      lessions: [
        {
          id: 'django-bienvenida',
          title: 'Presentación',
          secciones: [
            {
              id: 'django-ruta',
              title: 'Cómo trabajar la guía',
              contenidos: [
                {
                  id: 'django-presentacion',
                  title: 'Curso práctico de Django',
                  widget: {
                    id: 'django-presentacion',
                    type: 'rich-text-editorial',
                    componentName: 'WidgetRichTextEditorial',
                    summary: 'Ruta del curso y regla de trabajo.',
                    bgMode: 'custom',
                    bgColor: '#A7091B',
                    data: {
                      badge: 'INACAP · Desarrollo web',
                      title: 'Curso práctico de Django',
                      subtitle: 'Del modelo Libro–Categoria a una biblioteca con sesiones y permisos.',
                      cardFrame: false,
                      htmlContent: [
                        '<p><strong>10 lecciones · 2 partes · 1 desafío final</strong></p>',
                        '<p>Revisa el video de cada lección, reproduce los ejemplos en tu proyecto y completa la actividad antes de avanzar.</p>',
                        '<p>Construye formularios directamente en HTML y valida <code>request.POST</code> en la vista. En esta guía trabajarás sin <code>ModelForm</code>.</p>',
                      ].join(''),
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          id: 'django-crud',
          title: 'Parte 1 · CRUD y persistencia',
          secciones: lessons.slice(0, 6),
        },
        {
          id: 'django-seguridad',
          title: 'Parte 2 · Autenticación y permisos',
          secciones: lessons.slice(6),
        },
        {
          id: 'django-proyecto',
          title: 'Desafío integrador',
          secciones: [
            {
              id: 'django-entrega',
              title: 'Biblioteca protegida',
              contenidos: [
                {
                  id: 'django-proyecto-checklist',
                  title: 'Lista de verificación del proyecto',
                  widget: {
                    id: 'django-proyecto-checklist',
                    type: 'checklist',
                    componentName: 'WidgetChecklist',
                    summary: 'Verifica la aplicación de biblioteca antes de entregarla.',
                    data: {
                      badge: 'Desafío integrador',
                      checklistTitle: 'Entrega una biblioteca protegida',
                      checklistSubtitle: 'Desarrolla un CRUD de libros con vistas propias y comprueba cada criterio.',
                      checklist: [
                        { id: 'persistencia', category: 'Persistencia', label: 'Apliqué las migraciones y comprobé la relación entre libros y categorías en el ORM.' },
                        { id: 'interfaz', category: 'Interfaz', label: 'Listé libros, validé formularios HTML con POST y CSRF, confirmé el borrado y mostré los mensajes de resultado.' },
                        { id: 'seguridad', category: 'Seguridad', label: 'Implementé login, logout por POST, vistas protegidas y permisos comprobados en el servidor.' },
                        { id: 'evidencia', category: 'Evidencia', label: 'Preparé el repositorio, las capturas y la demostración de accesos permitidos y denegados.' },
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
