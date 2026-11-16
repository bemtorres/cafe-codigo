import type { Slide } from '../../../types/slides';

export const introduccionSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '1. Introducción a Django: El Framework para Perfeccionistas 🚀',
    subtitle: 'Filosofía, ecosistema de baterías incluidas y arquitectura para proyectos web modernos',
    badge: 'Django · Lección 1',
    content: 'Descubre por qué Django es el framework backend preferido por gigantes como Instagram, Spotify y Pinterest para construir aplicaciones web seguras, escalables y en tiempo récord.',
    bulletPoints: [
      '⚡ Filosofía "Batteries Included": Todo lo que necesitas ya viene de fábrica',
      '🛡️ Seguridad por defecto: Protección contra CSRF, SQL Injection y XSS',
      '📈 Escalabilidad probada: Desde prototipos rápidos hasta millones de usuarios',
      '🐍 El poder del ecosistema Python integrado al desarrollo web'
    ],
    keyTakeaway: 'Django no te hace reinventar la rueda; te entrega ruedas de alta gama para que te concentres en la lógica de negocio.'
  },
  {
    id: 2,
    type: 'concept',
    title: '¿Por qué nació Django? El problema de las salas de redacción',
    badge: 'Historia y Contexto',
    content: 'Django nació en 2003 en el periódico Lawrence Journal-World. Los periodistas necesitaban publicar aplicaciones web complejas en cuestión de horas, no de meses.',
    visualChart: {
      headers: ['Desafío en 2003', 'Solución de Django', 'Impacto en el Desarrollador'],
      rows: [
        ['Escribir SQL manual para cada tabla', 'ORM (Object-Relational Mapping)', 'Modelas con clases de Python'],
        ['Crear paneles de gestión desde cero', 'Django Admin automático', 'Panel CRUD listo en 2 minutos'],
        ['Vulnerabilidades web constantes', 'Seguridad integrada', 'Protección activa automática'],
        ['Plazos de entrega asfixiantes', 'Baterías incluidas', 'Prototipos listos en horas']
      ]
    },
    keyTakeaway: 'Django fue creado bajo presión real: su lema es "El framework web para perfeccionistas con plazos de entrega".'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'Django vs Flask vs FastAPI: ¿Cuándo elegir cada uno?',
    badge: 'Comparativa de Ecosistema',
    content: 'Python tiene 3 frameworks web dominantes. Entender sus diferencias te permite elegir la herramienta precisa para cada proyecto.',
    visualChart: {
      headers: ['Característica', 'Django', 'Flask', 'FastAPI'],
      rows: [
        ['Filosofía', 'Baterías Incluidas (Full-stack)', 'Micro-framework minimalista', 'Asíncrono para APIs'],
        ['Panel de Administración', '✅ Nativo y configurable', '❌ Requiere librerías externas', '❌ No incluido'],
        ['ORM Integrado', '✅ Potente ORM relacional', '❌ Requiere SQLAlchemy', '❌ Requiere SQLAlchemy / SQLModel'],
        ['Sistema de Auth & Usuarios', '✅ Completo de fábrica', '❌ Manual con extensiones', '❌ Manual / Tokens'],
        ['Mejor Caso de Uso', 'SaaS, Portales, E-commerce, CMS', 'Microservicios sencillos', 'APIs RESTful de alta velocidad']
      ]
    },
    keyTakeaway: 'Usa Django cuando necesites base de datos, usuarios, panel administrativo y estructura sólida para un producto completo.'
  },
  {
    id: 4,
    type: 'diagram',
    title: '¿Qué significa "Baterías Incluidas" (Batteries Included)?',
    badge: 'Arquitectura Integrada',
    content: 'Al instalar Django, recibes un arsenal completo de herramientas probadas en producción sin tener que evaluar 20 librerías de terceros.',
    bulletPoints: [
      '1. django.contrib.auth: Sistema completo de usuarios, hashing seguro de contraseñas, grupos y permisos.',
      '2. django.contrib.admin: Panel administrativo web interactivo para gestionar la base de datos.',
      '3. django.contrib.sessions: Manejo de sesiones de usuario en cookies firmadas criptográficamente.',
      '4. ORM Integrado: Traductor bidireccional entre Python y motores SQL (PostgreSQL, SQLite, MySQL).',
      '5. Sistema de Migraciones: Versionamiento automático del esquema de base de datos.'
    ],
    keyTakeaway: 'Menos tiempo investigando qué librería usar, más tiempo construyendo la funcionalidad que genera valor.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Primer Vistazo: La Simplicidad de un Endpoint en Django',
    badge: 'Código Real',
    content: 'Así se define una vista simple que procesa una petición HTTP y responde al navegador:',
    codeSnippet: {
      filename: 'sitio/views.py',
      lang: 'python',
      code: `from django.http import HttpResponse

def saludo_bienvenida(request):
    """
    request: Objeto que contiene encabezados, método (GET/POST), cookies y datos.
    Retorna una instancia de HttpResponse con el contenido y código HTTP 200.
    """
    nombre_usuario = request.GET.get('nombre', 'Estudiante')
    return HttpResponse(f"<h1>¡Hola, {nombre_usuario}! Bienvenido al mundo Django ☕</h1>")`,
      explanation: 'Una vista en Django es simplemente una función (o clase) de Python que toma una petición (request) y devuelve una respuesta (response).'
    },
    keyTakeaway: 'El ciclo fundamental de Django es simple: Recibir un HttpRequest → Procesar lógica → Devolver un HttpResponse.'
  },
  {
    id: 6,
    type: 'concept',
    title: 'La Regla de Oro: Seguridad Activa por Defecto',
    badge: 'Seguridad Web',
    content: 'Django asume que los desarrolladores cometen errores y previene las vulnerabilidades más comunes de la web de forma automática.',
    bulletPoints: [
      '🛡️ Prevención de SQL Injection: El ORM parametriza automáticamente todas las consultas a la base de datos.',
      '🛡️ Protección contra CSRF: Todos los formularios POST exigen un token criptográfico {% csrf_token %}.',
      '🛡️ Prevención de XSS: El motor de plantillas escapa automáticamente cualquier código HTML o JavaScript malicioso.',
      '🛡️ Hashing de contraseñas con PBKDF2: Las contraseñas nunca se guardan en texto plano en la base de datos.'
    ],
    keyTakeaway: 'Django es el framework backend más seguro del ecosistema Python; protege a tu aplicación incluso cuando olvidas hacerlo.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Tu Ruta de Aprendizaje',
    badge: 'Resumen Ejecutivo',
    content: 'Has conocido los cimientos del framework. En las próximas lecciones construiremos tu primer proyecto paso a paso.',
    bulletPoints: [
      '✅ Comprendes por qué Django es el líder para desarrollo backend en Python.',
      '✅ Conoces el significado de "Baterías Incluidas" y su impacto en la velocidad de desarrollo.',
      '✅ Distingues las fortalezas de Django frente a Flask y FastAPI.',
      '✅ Tienes claro el ciclo HttpRequest → Lógica de Vista → HttpResponse.'
    ],
    keyTakeaway: 'Estás listo para preparar tu entorno de desarrollo Python e instalar Django con las mejores prácticas profesionales.'
  }
];
