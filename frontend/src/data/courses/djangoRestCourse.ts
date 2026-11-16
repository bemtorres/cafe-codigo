import type { CourseContenido, CourseDocumentJSON, CourseWidgetBlock } from './courseJsonTypes';

function content(id: string, title: string, widget: CourseWidgetBlock): CourseContenido {
  return { id, title, widget };
}

export const DJANGO_REST_COURSE: CourseDocumentJSON = {
  courseId: 'django',
  version: '1.0.0',
  title: 'Django: Backend Web con Python',
  institution: 'Café y Código',
  defaultBrandId: 'emerald',
  showScoreInBanner: false,
  modulos: [
    {
      id: 'api-rest',
      title: 'API REST con Django',
      lessions: [
        {
          id: 'fundamentos-rest',
          title: 'Diseña el contrato HTTP',
          secciones: [
            {
              id: 'recursos-json',
              title: 'Recursos y JSON',
              contenidos: [
                content('reto-catalogo', 'El reto del catálogo', {
                  id: 'rest-introduccion',
                  type: 'rich-text-editorial',
                  componentName: 'WidgetRichTextEditorial',
                  summary: 'Presenta el caso que conecta las tres Lessions.',
                  data: {
                    badge: 'DJANGO · API REST',
                    title: 'Un catálogo de cursos para el frontend',
                    subtitle: 'Define el contrato, implementa el recurso y protege las escrituras.',
                    cardFrame: true,
                    htmlContent: [
                      '<p>Un frontend necesita consultar un catálogo de cursos. En este ejercicio cualquiera puede leerlo y solo los usuarios autenticados pueden modificarlo.</p>',
                      '<p>Usarás <code>/api/cursos/</code> para la colección y <code>/api/cursos/1/</code> para un curso concreto. Un ejemplo de respuesta de detalle:</p>',
                      '<pre><code>{\n  "id": 1,\n  "nombre": "Fundamentos Django",\n  "descripcion": "Primeros pasos con Django",\n  "duracion": 35,\n  "publicado": true\n}</code></pre>',
                      '<p>Antes de pasar a DRF, comprueba que puedes elegir una ruta, un método y una respuesta para cada operación.</p>',
                    ].join(''),
                  },
                }),
              ],
            },
            {
              id: 'metodos-y-respuestas',
              title: 'Métodos y respuestas HTTP',
              contenidos: [
                content('mapear-operaciones', 'Del requisito a la petición', {
                  id: 'rest-metodos',
                  type: 'scenario-quiz-drag-drop',
                  componentName: 'WidgetScenarioQuizDragAndDrop',
                  summary: 'Clasifica operaciones del catálogo por método HTTP.',
                  data: {
                    badge: 'PRÁCTICA · MÉTODOS HTTP',
                    title: '¿Qué método necesita el cliente?',
                    context: 'Clasifica cada operación del catálogo.',
                    points: 20,
                    categories: [
                      { id: 'get', title: 'GET', subtitle: 'Consultar', accentColor: 'sky' },
                      { id: 'post', title: 'POST', subtitle: 'Crear', accentColor: 'emerald' },
                      { id: 'patch', title: 'PATCH', subtitle: 'Editar parcialmente', accentColor: 'amber' },
                      { id: 'delete', title: 'DELETE', subtitle: 'Eliminar', accentColor: 'rose' },
                    ],
                    items: [
                      { id: 'delete-course', text: 'Borrar el curso 1.', correctCategoryId: 'delete', feedback: 'DELETE /api/cursos/1/ puede devolver 204 sin cuerpo.' },
                      { id: 'get-courses', text: 'Listar los cursos.', correctCategoryId: 'get', feedback: 'GET /api/cursos/ devuelve la colección con 200.' },
                      { id: 'patch-course', text: 'Cambiar solo la duración del curso 1.', correctCategoryId: 'patch', feedback: 'PATCH /api/cursos/1/ permite enviar únicamente duracion.' },
                      { id: 'post-course', text: 'Registrar un curso nuevo.', correctCategoryId: 'post', feedback: 'POST /api/cursos/ crea el recurso y devuelve 201 si tiene éxito.' },
                    ],
                  },
                }),
                content('leer-respuestas', 'Interpretar los códigos de estado', {
                  id: 'rest-estados',
                  type: 'scenario-quiz-multiple',
                  componentName: 'WidgetScenarioQuizMultiple',
                  summary: 'Distingue errores de datos, recursos ausentes y creación exitosa.',
                  data: {
                    badge: 'PRÁCTICA · ESTADOS HTTP',
                    title: '¿Qué respuestas respetan el contrato?',
                    context: 'La API exige que la duración sea mayor que cero y el cliente tiene permisos para escribir.',
                    instruction: 'Marca todas las respuestas correctas.',
                    points: 15,
                    successFeedback: 'El frontend puede distinguir qué ocurrió leyendo el estado HTTP.',
                    errorFeedback: 'Revisa qué caso corresponde a creación, validación o recurso ausente.',
                    options: [
                      { id: 'created', text: '201 si se creó el curso.', isCorrect: true, explanation: '201 indica que la petición creó un recurso.' },
                      { id: 'invalid', text: '400 si duracion es −5.', isCorrect: true, explanation: 'El valor no cumple la regla del catálogo.' },
                      { id: 'missing', text: '404 al solicitar un ID que no existe.', isCorrect: true, explanation: 'La API no encontró el recurso solicitado.' },
                      { id: 'missing-ok', text: '200 con un mensaje de error cuando el curso no existe.', isCorrect: false, explanation: 'Usa 404 para que el cliente pueda tratar la ausencia como tal.' },
                    ],
                  },
                }),
              ],
            },
          ],
        },
        {
          id: 'django-rest-framework',
          title: 'Implementa el recurso con DRF',
          secciones: [
            {
              id: 'serializacion',
              title: 'Serializer y validación',
              contenidos: [
                content('validar-duracion', 'Validar los datos del curso', {
                  id: 'rest-serializer',
                  type: 'code-walkthrough',
                  componentName: 'WidgetCodeWalkthrough',
                  summary: 'Recorre los campos públicos y la regla de duración positiva.',
                  data: {
                    sectionBadge: 'DRF · SERIALIZER',
                    sectionTitle: 'Del modelo a la API',
                    steps: [
                      {
                        stepNumber: 1,
                        badge: 'REPRESENTACIÓN',
                        title: 'Elige los campos que expone la API',
                        explanation: 'CursoSerializer usa el modelo Curso y define qué campos intercambia la API.',
                        keyTakeaway: 'El serializer define el contrato de datos del recurso.',
                        fileName: 'serializers.py',
                        codeLines: [
                          'from rest_framework import serializers',
                          'from .models import Curso',
                          '',
                          'class CursoSerializer(serializers.ModelSerializer):',
                          '    class Meta:',
                          '        model = Curso',
                          '        fields = ["id", "nombre", "descripcion", "duracion", "publicado"]',
                        ],
                        highlightLines: [4, 5, 6, 7],
                      },
                      {
                        stepNumber: 2,
                        badge: 'VALIDACIÓN',
                        title: 'Rechaza una duración fuera de rango',
                        explanation: 'Agrega este método dentro de CursoSerializer. Si el cliente envía un valor menor o igual a cero, el serializer devuelve un error de validación para duracion.',
                        keyTakeaway: 'Una regla del dominio debe verificarse en el servidor.',
                        fileName: 'serializers.py · dentro de CursoSerializer',
                        codeLines: [
                          '    def validate_duracion(self, value):',
                          '        if value <= 0:',
                          '            raise serializers.ValidationError("Debe ser mayor que cero.")',
                          '        return value',
                        ],
                        highlightLines: [1, 2, 3],
                      },
                    ],
                  },
                }),
              ],
            },
            {
              id: 'viewset-y-router',
              title: 'ViewSet y router',
              contenidos: [
                content('definir-viewset', 'Definir las operaciones del recurso', {
                  id: 'rest-viewset',
                  type: 'code-walkthrough',
                  componentName: 'WidgetCodeWalkthrough',
                  summary: 'Conecta el modelo, el serializer y la política de acceso.',
                  data: {
                    sectionBadge: 'DRF · VIEWSET',
                    sectionTitle: 'Reúne las operaciones del catálogo',
                    steps: [
                      {
                        stepNumber: 1,
                        badge: 'CRUD',
                        title: 'Configura CursoViewSet',
                        explanation: 'ModelViewSet reúne las acciones de listar, consultar detalle, crear, actualizar y eliminar. El router las conectará a las rutas de colección y detalle.',
                        keyTakeaway: 'El ViewSet define las operaciones y el router publica sus rutas.',
                        fileName: 'views.py',
                        codeLines: [
                          'from rest_framework.permissions import IsAuthenticatedOrReadOnly',
                          'from rest_framework.viewsets import ModelViewSet',
                          'from .models import Curso',
                          'from .serializers import CursoSerializer',
                          '',
                          'class CursoViewSet(ModelViewSet):',
                          '    queryset = Curso.objects.all()',
                          '    serializer_class = CursoSerializer',
                          '    permission_classes = [IsAuthenticatedOrReadOnly]',
                        ],
                        highlightLines: [6, 7, 8, 9],
                      },
                    ],
                  },
                }),
                content('registrar-recurso', 'Conectar el recurso a la URL', {
                  id: 'rest-router',
                  type: 'scenario-quiz-fill-blank',
                  componentName: 'WidgetScenarioQuizFillBlank',
                  summary: 'Completa el registro que expone el recurso bajo /api/cursos/.',
                  data: {
                    badge: 'PRÁCTICA · ROUTER',
                    title: 'Publica el ViewSet del catálogo',
                    context: 'CursoViewSet ya usa CursoSerializer y tiene configurada la política de acceso del ejercicio. Completa urls.py para exponer la colección.',
                    codeMode: true,
                    points: 20,
                    segments: [
                      { type: 'text', text: 'from django.urls import include, path\nfrom rest_framework.routers import DefaultRouter\nfrom .views import CursoViewSet\n\nrouter = DefaultRouter()\nrouter.register("' },
                      { type: 'blank', blankId: 'prefix', correctAnswer: 'cursos', options: ['api', 'cursos', 'listar-cursos'] },
                      { type: 'text', text: '", ' },
                      { type: 'blank', blankId: 'viewset', correctAnswer: 'CursoViewSet', options: ['CursoSerializer', 'CursoViewSet', 'Curso'] },
                      { type: 'text', text: ')\nurlpatterns = [path("api/", include(router.urls))]' },
                    ],
                    feedbackSuccess: 'El prefijo del router y el prefijo de urls.py forman /api/cursos/.',
                    feedbackError: 'Registra el ViewSet con el nombre de la colección. El prefijo api/ ya está en path().',
                  },
                }),
              ],
            },
          ],
        },
        {
          id: 'jwt-y-verificacion',
          title: 'Protege y verifica la API',
          secciones: [
            {
              id: 'autenticacion-jwt',
              title: 'Autenticación y renovación',
              contenidos: [
                content('politica-acceso', 'Lectura pública y escritura autenticada', {
                  id: 'rest-permisos',
                  type: 'rich-text-editorial',
                  componentName: 'WidgetRichTextEditorial',
                  summary: 'Explica la política que se aplica en la simulación.',
                  data: {
                    badge: 'DRF · JWT Y PERMISOS',
                    title: 'Identidad y permisos del catálogo',
                    htmlContent: [
                      '<p>En el ejercicio, <code>JWTAuthentication</code> identifica al usuario por su token. <code>IsAuthenticatedOrReadOnly</code> permite consultar sin iniciar sesión y exige autenticación para crear, editar o borrar.</p>',
                      '<p>En tu proyecto, configura <code>JWTAuthentication</code> como primera clase de autenticación de DRF. Registra <code>TokenObtainPairView</code> y <code>TokenRefreshView</code> para emitir y renovar los tokens.</p>',
                      '<p>Obtén los tokens con <code>POST /api/token/</code>. Envía <code>Authorization: Bearer &lt;access&gt;</code> en las peticiones protegidas. Si el token de acceso vence y el de renovación sigue válido, envía <code>{"refresh": "…"}</code> a <code>POST /api/token/refresh/</code>.</p>',
                      '<p>Esta política permite que cualquier usuario autenticado modifique el catálogo. Un catálogo con roles de edición requeriría permisos adicionales.</p>',
                      '<p>Consulta la <a href="https://www.django-rest-framework.org/api-guide/permissions/#isauthenticatedorreadonly">guía de permisos de DRF</a> y la <a href="https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html">guía de Simple JWT</a>.</p>',
                    ].join(''),
                  },
                }),
                content('recuperar-sesion', 'Recuperar una petición rechazada', {
                  id: 'rest-orden-jwt',
                  type: 'scenario-quiz-ordering',
                  componentName: 'WidgetScenarioQuizOrdering',
                  summary: 'Ordena los pasos para renovar un access token vencido.',
                  data: {
                    badge: 'SIMULACIÓN · JWT',
                    title: 'El token venció al editar un curso',
                    context: 'PATCH /api/cursos/1/ devolvió 401 por un access token vencido. El refresh token sigue válido. Ordena el flujo de recuperación.',
                    points: 20,
                    steps: [
                      { id: 'retry', text: 'Reintentar PATCH con Authorization: Bearer y el nuevo access.', correctPosition: 3, hint: 'Reenvía la edición después de renovar el token.' },
                      { id: 'refresh', text: 'Enviar POST /api/token/refresh/ con el refresh en el cuerpo JSON.', correctPosition: 1, hint: 'El primer paso es solicitar un token de acceso nuevo.' },
                      { id: 'receive', text: 'Tomar el nuevo access de la respuesta.', correctPosition: 2, hint: 'Usa el token devuelto por el endpoint de renovación.' },
                    ],
                  },
                }),
              ],
            },
            {
              id: 'reto-integrador',
              title: 'Reto de verificación',
              contenidos: [
                content('entrega-catalogo', 'Probar el contrato en tu proyecto', {
                  id: 'rest-checklist',
                  type: 'checklist',
                  componentName: 'WidgetChecklist',
                  summary: 'Pauta de pruebas para el proyecto integrador de Django.',
                  data: {
                    badge: 'PROYECTO INTEGRADOR',
                    checklistTitle: 'Demuestra que el catálogo funciona',
                    checklistSubtitle: 'Ejecuta estas peticiones en tu proyecto Django. Usa el ID obtenido al crear el curso. Guarda el método, la ruta y el estado observado antes de marcar cada verificación.',
                    checklist: [
                      { id: 'rest-check-list', category: 'LECTURA', label: 'GET /api/cursos/ sin token devuelve 200 y el catálogo en JSON.' },
                      { id: 'rest-check-create', category: 'CREACIÓN', label: 'POST /api/cursos/ con un access válido y datos correctos devuelve 201.' },
                      { id: 'rest-check-validation', category: 'VALIDACIÓN', label: 'PATCH /api/cursos/{id}/ con un access válido y duracion = 0 devuelve 400.' },
                      { id: 'rest-check-protection', category: 'AUTENTICACIÓN', label: 'POST /api/cursos/ sin credenciales devuelve 401 con JWTAuthentication como primera clase de autenticación.' },
                      { id: 'rest-check-refresh', category: 'RENOVACIÓN', label: 'Un PATCH rechazado por token vencido funciona al reintentarlo con el access renovado.' },
                    ],
                  },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
