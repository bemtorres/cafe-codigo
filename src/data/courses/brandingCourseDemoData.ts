import type { BrandPreset, CourseDocumentJSON } from './courseJsonTypes';

export const BRAND_PRESETS: BrandPreset[] = [
  {
    id: 'inacap',
    name: 'Rojo Institucional',
    institution: 'INACAP',
    primary: '#E31B23',
    primaryDark: '#B9141B',
    primaryLight: '#FEE2E2',
    bgQuiz: '#D84339',
  },
  {
    id: 'cafeycodigo',
    name: 'Café y Código',
    institution: 'Café y Código',
    primary: '#EF476F',
    primaryDark: '#C82D54',
    primaryLight: '#FCE7F3',
    bgQuiz: '#E13D65',
  },
  {
    id: 'ocean',
    name: 'Azul Corporativo',
    institution: 'TechCorp Academy',
    primary: '#0284C7',
    primaryDark: '#0369A1',
    primaryLight: '#E0F2FE',
    bgQuiz: '#0369A1',
  },
  {
    id: 'emerald',
    name: 'Verde Django',
    institution: 'Escuela Python',
    primary: '#059669',
    primaryDark: '#047857',
    primaryLight: '#D1FAE5',
    bgQuiz: '#047857',
  },
];

export const INITIAL_BRANDING_COURSE_JSON: CourseDocumentJSON = {
  courseId: 'arquitectura-etica-cumplimiento-v1',
  version: '1.0.0',
  title: 'Modelo de Arquitectura, Ética y Cumplimiento',
  institution: 'INACAP',
  defaultBrandId: 'inacap',
  showScoreInBanner: false,
  lessons: [
    {
      id: 'l1',
      module: 'PRESENTACIÓN GENERAL',
      title: 'Bienvenida y presentación del curso',
      targetId: 'widget-video',
      icon: 'video',
    },
    {
      id: 'l2',
      module: 'MÓDULO I: ARQUITECTURA Y ÉTICA EN IA',
      title: 'Código de Seguridad y Buenas Prácticas',
      targetId: 'widget-code-steps',
      icon: 'code',
    },
    {
      id: 'l3',
      module: 'MÓDULO I: ARQUITECTURA Y ÉTICA EN IA',
      title: 'Principios de Desarrollo Seguro',
      targetId: 'widget-hero',
      icon: 'slides',
    },
    {
      id: 'l3b',
      module: 'MÓDULO I: ARQUITECTURA Y ÉTICA EN IA',
      title: 'Banner de Portada con Imagen (Solo Banner)',
      targetId: 'widget-image-cover-banner',
      icon: 'slides',
    },
    {
      id: 'l3c',
      module: 'MÓDULO I: ARQUITECTURA Y ÉTICA EN IA',
      title: 'Lectura Editorial Diseñable (Tiptap Rich Text)',
      targetId: 'widget-rich-text',
      icon: 'text',
    },
    {
      id: 'l4',
      module: 'MÓDULO I: ARQUITECTURA Y ÉTICA EN IA',
      title: '¿Qué hago si tengo dudas o debo reportar una vulnerabilidad?',
      targetId: 'widget-details',
      icon: 'text',
    },
    {
      id: 'l5',
      module: 'MÓDULO I: ARQUITECTURA Y ÉTICA EN IA',
      title: 'Actividad: ¿Qué haría usted?',
      targetId: 'widget-quiz',
      icon: 'quiz',
    },
    {
      id: 'l6',
      module: 'MÓDULO II: MODELO DE PREVENCIÓN DE INCIDENTES',
      title: 'Modelo de Prevención de Fallos en Producción',
      targetId: 'widget-slides',
      icon: 'slides',
    },
    {
      id: 'l7',
      module: 'MÓDULO II: MODELO DE PREVENCIÓN DE INCIDENTES',
      title: 'Comparador: Código Vulnerable vs. Código Blindado',
      targetId: 'widget-comparison',
      icon: 'tabs',
    },
    {
      id: 'l8',
      module: 'MÓDULO II: MODELO DE PREVENCIÓN DE INCIDENTES',
      title: 'Mapa de Capas de Arquitectura (Hotspots)',
      targetId: 'widget-hotspots',
      icon: 'slides',
    },
    {
      id: 'l8b',
      module: 'MÓDULO II: MODELO DE PREVENCIÓN DE INCIDENTES',
      title: 'Mapa de Capas con Imagen Izquierda y Derecha (Hotspots Visual)',
      targetId: 'widget-hotspots-visual',
      icon: 'slides',
    },
    {
      id: 'l9',
      module: 'MÓDULO III: DESPLIEGUE Y AUDITORÍA CONTINUA',
      title: 'Tarjetas Giratorias de Conceptos Clave',
      targetId: 'widget-flipcards',
      icon: 'slides',
    },
    {
      id: 'l10',
      module: 'MÓDULO III: DESPLIEGUE Y AUDITORÍA CONTINUA',
      title: 'Paso a Paso del Pipeline CI/CD (Step to Step)',
      targetId: 'widget-timeline',
      icon: 'timeline',
    },
    {
      id: 'l10b',
      module: 'MÓDULO III: DESPLIEGUE Y AUDITORÍA CONTINUA',
      title: 'Checklist Interactivo de Paso a Producción',
      targetId: 'widget-checklist',
      icon: 'timeline',
    },
    {
      id: 'l11',
      module: 'MÓDULO III: DESPLIEGUE Y AUDITORÍA CONTINUA',
      title: 'Quiz 1: Casos de Selección Única y Video',
      targetId: 'widget-quiz',
      icon: 'quiz',
    },
    {
      id: 'l12',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 2: Selección Múltiple (Checkboxes)',
      targetId: 'widget-quiz-multiple',
      icon: 'quiz',
    },
    {
      id: 'l13',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 3: Drag & Drop de Clasificación Normativa',
      targetId: 'widget-quiz-dragdrop',
      icon: 'quiz',
    },
    {
      id: 'l14',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 4: Secuencia de Protocolo (Ordering 1..4)',
      targetId: 'widget-quiz-ordering',
      icon: 'quiz',
    },
    {
      id: 'l15',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 5: Emparejar Riesgo ↔ Control (Matching)',
      targetId: 'widget-quiz-matching',
      icon: 'quiz',
    },
    {
      id: 'l16',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 6: Completar Código en Blanco (Fill-in-Blank)',
      targetId: 'widget-quiz-fillblank',
      icon: 'quiz',
    },
    {
      id: 'l17',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 7: Simulación de Rol Ramificada (Branching)',
      targetId: 'widget-quiz-branching',
      icon: 'quiz',
    },
    {
      id: 'l18',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 8: Matriz Rápida Cumple vs. Incumple',
      targetId: 'widget-quiz-matrix',
      icon: 'quiz',
    },
    {
      id: 'l19',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 9: Cazador de Líneas Vulnerables (Spotter)',
      targetId: 'widget-quiz-spotter',
      icon: 'quiz',
    },
    {
      id: 'l20',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 10: Seleccionar Parte de una Imagen (Banda / Batería)',
      targetId: 'widget-quiz-image-hotspot',
      icon: 'quiz',
    },
    {
      id: 'l21',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 11: Selección Visual de Escenas (Image Choice)',
      targetId: 'widget-quiz-image-choice',
      icon: 'quiz',
    },
    {
      id: 'l22',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Quiz 12: Termómetro Calibrador de Severidad (Risk Slider)',
      targetId: 'widget-quiz-risk-slider',
      icon: 'quiz',
    },
    {
      id: 'l23',
      module: 'MÓDULO IV: LABORATORIO AVANZADO DE INTERACCIONES QUIZ',
      title: 'Reporte Final de Desempeño y Score',
      targetId: 'widget-report',
      icon: 'timeline',
    },
  ],
  blocks: [
    {
      id: 'widget-hero',
      type: 'hero-banner',
      componentName: 'WidgetHeroBanner',
      summary: 'Cabecera de lección + Banner oscuro full-bleed + 3 tarjetas de indicadores KPI',
      data: {
        lessonSubtitle: 'LECCIÓN 3 DE 12 · CURSO INTERACTIVO COMPLETO',
        title: 'Principios Éticos y de Arquitectura',
        bannerTitlePrefix: 'Existen 6 Principios Clave que promueve',
        bannerDescription:
          'Recorre cada bloque interactivo para dominar la seguridad en el código, la prevención de incidentes y la toma de decisiones éticas en proyectos reales.',
        bannerImageUrl:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
        apaCitation:
          'Glenn, S. (2015). Personas revisando documentos de planificación estratégica [Fotografía]. Unsplash. https://unsplash.com/photos/npxXWgQ33ZQ',
        kpis: [
          {
            stat: '100%',
            label: 'Trazabilidad en Git',
            desc: 'Cada cambio en producción queda vinculado a una revisión técnica y pruebas automatizadas.',
          },
          {
            stat: '0 Secretos',
            label: 'En Código Fuente',
            desc: 'Todas las credenciales viven en variables de entorno cifradas fuera del repositorio.',
          },
          {
            stat: '< 15 min',
            label: 'Tiempo de Respuesta',
            desc: 'Protocolo de contención rápida ante alertas de vulnerabilidad o caída de servicios.',
          },
        ],
      },
    },
    {
      id: 'widget-image-cover-banner',
      type: 'image-cover-banner',
      componentName: 'WidgetImageCoverBanner',
      summary: 'Solo el Banner oscuro full-bleed con imagen de fondo, línea blanca, título y bajada',
      data: {
        bannerTitlePrefix: 'Existen 6 Principios Clave que promueve',
        includeInstitutionName: true,
        bannerDescription:
          'Recorre cada bloque interactivo para dominar la seguridad en el código, la prevención de incidentes y la toma de decisiones éticas en proyectos reales.',
        bannerImageUrl:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
        apaCitation:
          'Glenn, S. (2015). Personas revisando documentos de planificación estratégica [Fotografía]. Unsplash. https://unsplash.com/photos/npxXWgQ33ZQ',
      },
    },
    {
      id: 'widget-rich-text',
      type: 'rich-text-editorial',
      componentName: 'WidgetRichTextEditorial',
      summary:
        'Bloque de solo texto editorial rico (Tiptap WYSIWYG): encabezados H1-H3, listas, citas destacadas, resaltado y código',
      data: {
        badge: 'LECTURA EDITORIAL · DISEÑADOR DE CONTENIDO TIPTAP',
        title: 'Marco Normativo de Integridad Técnica y Uso Responsable de Datos',
        subtitle:
          'Este bloque de solo texto puede editarse en vivo con Tiptap y guarda su estructura HTML directamente en el JSON del curso.',
        readingTime: '3 min de lectura',
        cardFrame: true,
        apaCitation:
          'ISO/IEC. (2022). ISO/IEC 27001:2022 Sistemas de gestión de la seguridad de la información — Requisitos [Norma técnica].',
        htmlContent: `<h2>1. El principio de confidencialidad desde el diseño</h2><p>Toda arquitectura de software institucional debe garantizar que los <strong>datos sensibles</strong> y las credenciales operativas nunca queden expuestos en texto plano, repositorios de control de versiones ni herramientas externas no autorizadas.</p><blockquote><p><strong>💡 Regla de Oro Institucional:</strong> La seguridad no es una capa que se agrega al final del proyecto; es una propiedad estructural que nace desde la primera línea de código y se audita en cada despliegue.</p></blockquote><h3>2. Tres obligaciones clave en el ciclo de desarrollo</h3><ul><li><strong>Anonimización previa:</strong> Nunca utilices volcados reales de producción (RUT, correos o registros financieros) en entornos locales o consultas a modelos de IA.</li><li><strong>Trazabilidad completa:</strong> Todo cambio debe pasar por revisión de pares (<em>Pull Request</em>) y superar las validaciones automatizadas del pipeline.</li><li><strong>Reporte oportuno:</strong> Si detectas una brecha o conflicto ético, utiliza de inmediato el <mark>canal oficial de cumplimiento</mark> antes de intentar ocultarlo.</li></ul><hr><p>Puedes hacer clic en el botón <strong>"✍️ Editar Texto con Tiptap"</strong> arriba a la derecha para modificar títulos, colores, listas, citas o insertar nuevos bloques en tiempo real.</p>`,
      },
    },
    {
      id: 'widget-video',
      type: 'video-editorial',
      componentName: 'WidgetVideoEditorial',
      summary:
        'Reproductor de video enmarcado + línea divisoria + frase editorial con palabras resaltadas',
      data: {
        videoUrl: 'https://www.youtube.com/embed/f79MRyMsjrQ?rel=0',
        apaCitation:
          'Python Software Foundation. (2024). Buenas prácticas de arquitectura y seguridad en entornos Python [Video]. YouTube. https://www.youtube.com/watch?v=f79MRyMsjrQ',
        highlightLead: 'Comprender',
        statementRest:
          'la aplicación del Código de Arquitectura y el Modelo de Prevención de Incidentes para fortalecer la integridad y la conducta técnica en',
      },
    },
    {
      id: 'widget-code-steps',
      type: 'code-walkthrough',
      componentName: 'WidgetCodeWalkthrough',
      summary:
        '2 partes lado a lado: explicación paso a paso (Paso 1..4) + editor de código con líneas resaltadas',
      data: {
        sectionBadge: 'WIDGET INTERACTIVO DE 2 PARTES: EXPLICACIÓN PASO A PASO + CÓDIGO EN VIVO',
        sectionTitle: 'Recorrido Guiado del Código Paso a Paso',
        steps: [
          {
            stepNumber: 1,
            badge: 'PASO 1 DE 4 · CONFIGURACIÓN SEGURA',
            title: 'Cargar secretos desde Variables de Entorno',
            explanation:
              'Nunca escribas contraseñas ni claves API directamente en el código fuente. En el primer paso leemos las credenciales desde el sistema operativo usando os.environ.',
            keyTakeaway:
              'Si alguien clona el repositorio, no tendrá acceso a las claves de producción.',
            fileName: 'config/settings.py',
            highlightLines: [4, 5, 6],
            codeLines: [
              'import os',
              'from pathlib import Path',
              '',
              '# 1. Lectura segura desde el entorno (.env)',
              'SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")',
              'DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"',
              '',
              '# 2. Validación de cabeceras y orígenes',
              'ALLOWED_HOSTS = ["aprende.cafeycodigo.org", "localhost"]',
              '',
              '# 3. Consulta parametrizada en el ORM',
              'def obtener_reporte_usuario(request, usuario_id: int):',
              '    return Reporte.objects.select_related("autor").filter(',
              '        autor_id=usuario_id,',
              '        activo=True',
              '    )',
            ],
          },
          {
            stepNumber: 2,
            badge: 'PASO 2 DE 4 · CONTROL DE DOMINIOS',
            title: 'Restringir ALLOWED_HOSTS en Producción',
            explanation:
              'Cuando DEBUG pasa a False, el servidor valida la cabecera HTTP Host contra esta lista blanca para evitar ataques de envenenamiento de caché y suplantación de dominio.',
            keyTakeaway:
              'Nunca uses ALLOWED_HOSTS = ["*"] en un servidor expuesto a Internet.',
            fileName: 'config/settings.py',
            highlightLines: [8, 9],
            codeLines: [
              'import os',
              'from pathlib import Path',
              '',
              '# 1. Lectura segura desde el entorno (.env)',
              'SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")',
              'DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"',
              '',
              '# 2. Validación de cabeceras y orígenes',
              'ALLOWED_HOSTS = ["aprende.cafeycodigo.org", "localhost"]',
              '',
              '# 3. Consulta parametrizada en el ORM',
              'def obtener_reporte_usuario(request, usuario_id: int):',
              '    return Reporte.objects.select_related("autor").filter(',
              '        autor_id=usuario_id,',
              '        activo=True',
              '    )',
            ],
          },
          {
            stepNumber: 3,
            badge: 'PASO 3 DE 4 · OPTIMIZACIÓN SQL (N+1)',
            title: 'Evitar el problema N+1 con select_related()',
            explanation:
              'Al usar select_related("autor"), el ORM resuelve la relación mediante un INNER JOIN en una única consulta SQL en lugar de disparar cientos de consultas adicionales.',
            keyTakeaway: 'Reduce el tiempo de respuesta de segundos a milisegundos.',
            fileName: 'config/settings.py',
            highlightLines: [12, 13],
            codeLines: [
              'import os',
              'from pathlib import Path',
              '',
              '# 1. Lectura segura desde el entorno (.env)',
              'SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")',
              'DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"',
              '',
              '# 2. Validación de cabeceras y orígenes',
              'ALLOWED_HOSTS = ["aprende.cafeycodigo.org", "localhost"]',
              '',
              '# 3. Consulta parametrizada en el ORM',
              'def obtener_reporte_usuario(request, usuario_id: int):',
              '    return Reporte.objects.select_related("autor").filter(',
              '        autor_id=usuario_id,',
              '        activo=True',
              '    )',
            ],
          },
          {
            stepNumber: 4,
            badge: 'PASO 4 DE 4 · PREVENCIÓN DE SQL INJECTION',
            title: 'Filtrado parametrizado libre de inyección SQL',
            explanation:
              'Los argumentos pasados a .filter() son escapados automáticamente por el driver de la base de datos, impidiendo que un atacante concatene comandos SQL maliciosos.',
            keyTakeaway: 'Jamás concatenes f-strings dentro de consultas raw SQL.',
            fileName: 'config/settings.py',
            highlightLines: [14, 15, 16],
            codeLines: [
              'import os',
              'from pathlib import Path',
              '',
              '# 1. Lectura segura desde el entorno (.env)',
              'SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")',
              'DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"',
              '',
              '# 2. Validación de cabeceras y orígenes',
              'ALLOWED_HOSTS = ["aprende.cafeycodigo.org", "localhost"]',
              '',
              '# 3. Consulta parametrizada en el ORM',
              'def obtener_reporte_usuario(request, usuario_id: int):',
              '    return Reporte.objects.select_related("autor").filter(',
              '        autor_id=usuario_id,',
              '        activo=True',
              '    )',
            ],
          },
        ],
      },
    },
    {
      id: 'widget-slides',
      type: 'slide-cards',
      componentName: 'WidgetSlideCards',
      summary:
        'Carrusel de tarjetas ilustradas por paso (PASO 1..4) con flechas < > y paginación numérica',
      data: {
        initialSlideIndex: 1,
        cards: [
          {
            step: 'PASO 1',
            title: 'Detección temprana en el repositorio',
            illustration: 'server',
            bodyBefore: 'Todo cambio enviado al repositorio pasa por ',
            highlight: 'revisiones automáticas de secretos, dependencias y análisis estático',
            bodyAfter: ' antes de fusionarse a la rama principal.',
          },
          {
            step: 'PASO 2',
            title: 'Análisis del caso',
            illustration: 'analyst',
            apaCitation:
              'Elaboración propia. (2026). Ilustración de evaluación ética de conflictos de interés [Ilustración vectorial]. Café y Código.',
            bodyBefore: 'Se ',
            highlight:
              'analizará el caso, conforme a los lineamientos institucionales y, dependiendo de la naturaleza del conflicto o brecha técnica,',
            bodyAfter: ' se procederá a la autorización o no.',
          },
          {
            step: 'PASO 3',
            title: 'Mitigación y rotación de credenciales (Con Video)',
            illustration: 'shield',
            videoUrl: 'https://www.youtube.com/embed/f79MRyMsjrQ?rel=0',
            videoCaption:
              'Demostración paso a paso: Rotación inmediata de variables de entorno (.env) y despliegue seguro.',
            apaCitation:
              'OWASP Foundation. (2024). Protocolo de rotación de secretos y mitigación de credenciales expuestas [Video]. YouTube.',
            bodyBefore: 'El equipo aislará el servicio afectado, ',
            highlight: 'rotará inmediatamente las variables de entorno (.env) comprometidas',
            bodyAfter: ' y aplicará el parche con pruebas de regresión.',
          },
          {
            step: 'PASO 4',
            title: 'Documentación Post-Mortem y mejora continua',
            illustration: 'team',
            bodyBefore: 'Se documenta la causa raíz en equipo para ',
            highlight:
              'agregar nuevas reglas automatizadas en el pipeline de integración continua',
            bodyAfter: ' garantizando que el incidente no se repita.',
          },
        ],
      },
    },
    {
      id: 'widget-details',
      type: 'accordion-details',
      componentName: 'WidgetAccordionDetails',
      summary:
        'Texto introductorio + Acordeón desplegable (+ / −) con borde de marca + Barra inferior ▼',
      data: {
        introBeforeHighlight1: 'También se encuentra prohibido el ',
        introHighlight1: 'uso de credenciales de producción en entornos sin cifrar',
        introMiddle: ' y las ',
        introHighlight2: 'modificaciones directas a terceros',
        introAfter: ' (salvo que se enmarquen en la Política de Seguridad).',
        heading: 'Los colaboradores sí pueden:',
        nextTargetId: 'widget-comparison',
        nextLessonId: 'l7',
        items: [
          {
            id: 'acc-1',
            title:
              'Recibir cortesía común y utilizar asistentes de IA en tareas propias de la institución',
            content:
              'Solo está permitido recibir demostraciones comunes o utilizar herramientas de apoyo cuando sean legales, no expongan datos confidenciales y no comprometan la toma de decisiones en el mejor interés de la institución.',
          },
          {
            id: 'acc-2',
            title: 'Entrega de repositorios, plantillas y recursos comunes autorizados',
            content:
              'Todo código o documentación compartida con terceros debe contar con datos anonimizados, autorización expresa del área responsable y revisión previa de licencias y secretos.',
          },
          {
            id: 'acc-3',
            title: 'Auditoría previa de dependencias y paquetes de terceros (PyPI / NPM)',
            content:
              'Antes de incorporar una librería externa al proyecto, el equipo debe verificar su mantenimiento activo, firma criptográfica, licencia compatible y ausencia de alertas CVE críticas.',
          },
          {
            id: 'acc-4',
            title: 'Protocolo de reporte inmediato ante sospecha de filtración de claves',
            content:
              'Cualquier colaborador que detecte una llave API expuesta o un comportamiento anómalo en los logs debe notificar al canal de Seguridad en los primeros 15 minutos para activar la revocación automática.',
          },
        ],
      },
    },
    {
      id: 'widget-comparison',
      type: 'code-comparison',
      componentName: 'WidgetCodeComparison',
      summary:
        'Comparador por pestañas (SQL, Claves, API/CORS): Código Vulnerable (❌) vs. Código Blindado (✅)',
      data: {
        badge: 'LABORATORIO COMPARATIVO · ANTES Y DESPUÉS',
        title: 'Código Vulnerable vs. Código Blindado',
        tabs: [
          {
            id: 'sql',
            label: '1. Consultas SQL',
            badTitle: '❌ Vulnerable a Inyección SQL',
            badCode: `def buscar_alumno(request):\n    rut = request.GET.get("rut")\n    # ¡PELIGRO! Concatenación directa de strings\n    query = f"SELECT * FROM alumnos WHERE rut = '{rut}'"\n    return Alumno.objects.raw(query)`,
            badReason:
              "Si el usuario envía `' OR '1'='1`, la consulta devuelve toda la tabla de alumnos sin restricción.",
            goodTitle: '✅ Blindado con ORM / Parámetros',
            goodCode: `def buscar_alumno(request):\n    rut = request.GET.get("rut")\n    # SEGURO: El motor parametriza el valor\n    return Alumno.objects.filter(rut=rut, activo=True)`,
            goodReason:
              'El driver de base de datos separa la estructura SQL de los datos del usuario, neutralizando cualquier inyección.',
          },
          {
            id: 'auth',
            label: '2. Almacenamiento de Claves',
            badTitle: '❌ Hash Débil o Texto Plano',
            badCode: `import hashlib\n\ndef guardar_password(usuario, raw_pass):\n    # ¡PELIGRO! MD5 sin salt se rompe en segundos\n    usuario.password = hashlib.md5(raw_pass.encode()).hexdigest()\n    usuario.save()`,
            badReason:
              'Los diccionarios Rainbow Tables permiten revertir hashes MD5 o SHA1 sin sal en menos de un segundo.',
            goodTitle: '✅ Argon2 / PBKDF2 con Salt Único',
            goodCode: `from django.contrib.auth.hashers import make_password\n\ndef guardar_password(usuario, raw_pass):\n    # SEGURO: Algoritmo adaptativo con salt aleatorio\n    usuario.password = make_password(raw_pass)\n    usuario.save()`,
            goodReason:
              'Utiliza miles de iteraciones criptográficas y una sal única por cada registro.',
          },
          {
            id: 'cors',
            label: '3. Permisos de API y CORS',
            badTitle: '❌ Endpoint Abierto sin Control de Rol',
            badCode: `@api_view(["POST"])\n@permission_classes([AllowAny])\ndef eliminar_curso(request, curso_id):\n    Curso.objects.filter(id=curso_id).delete()\n    return Response({"ok": True})`,
            badReason:
              'Cualquier visitante anónimo que descubra la URL puede borrar registros de producción.',
            goodTitle: '✅ Autenticación + Permiso de Objeto',
            goodCode: `@api_view(["DELETE"])\n@permission_classes([IsAuthenticated, EsDocenteTitular])\ndef eliminar_curso(request, curso_id):\n    curso = get_object_or_404(Curso, id=curso_id, autor=request.user)\n    curso.delete()\n    return Response(status=204)`,
            goodReason:
              'Verifica tanto la identidad del usuario como que sea efectivamente el propietario del recurso.',
          },
        ],
      },
    },
    {
      id: 'widget-hotspots',
      type: 'architecture-hotspots',
      componentName: 'WidgetArchitectureHotspots',
      summary:
        'Mapa interactivo de 3 capas de arquitectura (01 Perimetral, 02 Backend, 03 Base de Datos)',
      data: {
        badge: 'EXPLORADOR DE ARQUITECTURA EN DEFENSA PROFUNDA',
        title: 'Haz clic en cada capa para inspeccionar sus controles',
        layers: [
          {
            id: 'layer-1',
            number: '01',
            name: 'Capa Perimetral · CDN & WAF',
            subtitle: 'Cloudflare / Reverse Proxy Nginx',
            threat:
              'Ataques de denegación de servicio (DDoS), bots de fuerza bruta y escaneo de puertos.',
            control:
              'Rate Limiting por IP, TLS 1.3 obligatorio y reglas OWASP Core Rule Set activas.',
            metric: '99.4% del tráfico malicioso bloqueado antes de tocar el servidor.',
          },
          {
            id: 'layer-2',
            number: '02',
            name: 'Capa de Aplicación · Backend & API',
            subtitle: 'Django / FastAPI / Node.js',
            threat:
              'Falsificación de peticiones (CSRF), escalamiento de privilegios y payloads malformados.',
            control:
              'Validación estricta de esquemas, tokens firmados con expiración corta y cabeceras CSP.',
            metric: '0 endpoints críticos sin middleware de autorización.',
          },
          {
            id: 'layer-3',
            number: '03',
            name: 'Capa de Persistencia · Base de Datos',
            subtitle: 'PostgreSQL / Redis en Red Privada',
            threat:
              'Exfiltración masiva de datos, inyección SQL o pérdida por falta de respaldos.',
            control:
              'Subred aislada sin IP pública, cifrado en reposo AES-256 y backups automáticos.',
            metric: 'RPO < 5 minutos con pruebas de restauración semanales.',
          },
        ],
      },
    },
    {
      id: 'widget-hotspots-visual',
      type: 'architecture-hotspots-visual',
      componentName: 'WidgetArchitectureHotspotsVisual',
      summary:
        'Alternativa de Hotspots con imagen en cada tarjeta del lado izquierdo y también imagen ampliable en el panel derecho',
      data: {
        badge: 'EXPLORADOR VISUAL DE ARQUITECTURA · IMAGEN EN LADO IZQUIERDO Y DERECHO',
        title: 'Selecciona cada capa visual para inspeccionar su diagrama y controles',
        layers: [
          {
            id: 'vlayer-1',
            number: '01',
            name: 'Capa Perimetral · CDN & Firewall WAF',
            subtitle: 'Filtrado de tráfico global y mitigación DDoS',
            leftThumbnailUrl:
              'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
            leftThumbnailAlt: 'Servidores de borde y red perimetral',
            rightImageUrl:
              'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
            rightImageCaption:
              'Centro de datos perimetral con filtrado activo WAF y balanceo TLS 1.3.',
            apaCitation:
              'Taylor, J. (2019). Racks de servidores de red iluminados en centro de datos [Fotografía]. Unsplash. https://unsplash.com/photos/MAnVoJlQUvg',
            threat:
              'Ataques distribuidos de denegación de servicio (DDoS), bots automatizados y escaneo de puertos.',
            control:
              'Rate Limiting adaptativo por IP, certificados TLS 1.3 y reglas OWASP Core Rule Set en borde.',
            metric: '99.4% del tráfico malicioso bloqueado antes de llegar al backend.',
          },
          {
            id: 'vlayer-2',
            number: '02',
            name: 'Capa de Aplicación · API & Microservicios',
            subtitle: 'Autenticación JWT, validación de esquemas y trazabilidad',
            leftThumbnailUrl:
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
            leftThumbnailAlt: 'Código de aplicación y validación de API',
            rightImageUrl:
              'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
            rightImageCaption:
              'Inspección de código y middlewares de autorización por rol en el servidor de aplicaciones.',
            apaCitation:
              ' Ried, M. (2018). Código fuente en monitor de desarrollo de software [Fotografía]. Unsplash. https://unsplash.com/photos/ieic5Tq8YMk',
            threat:
              'Escalamiento de privilegios (IDOR), payloads malformados y exposición de secretos en respuestas.',
            control:
              'Validación estricta de esquemas de entrada, tokens con expiración corta y permisos a nivel de objeto.',
            metric: '0 endpoints críticos desplegados sin cobertura de pruebas de seguridad.',
          },
          {
            id: 'vlayer-3',
            number: '03',
            name: 'Capa de Persistencia · Clúster de Base de Datos',
            subtitle: 'Cifrado AES-256 en reposo y subred privada aislada',
            leftThumbnailUrl:
              'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
            leftThumbnailAlt: 'Infraestructura de almacenamiento seguro y redes',
            rightImageUrl:
              'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
            rightImageCaption:
              'Red privada aislada de persistencia con replicación continua y respaldos cifrados.',
            apaCitation:
              'Kvistholt, L. (2018). Cables de fibra óptica y conmutadores de alta velocidad [Fotografía]. Unsplash. https://unsplash.com/photos/95YRwf6CNw8',
            threat:
              'Exfiltración masiva de registros, inyección SQL o pérdida de datos ante contingencias.',
            control:
              'Subred privada sin salida a internet público, consultas parametrizadas y backups inmutables.',
            metric: 'RPO < 5 minutos con simulacros de restauración verificados cada semana.',
          },
        ],
      },
    },
    {
      id: 'widget-flipcards',
      type: 'flip-cards-3d',
      componentName: 'WidgetFlipCards3D',
      summary:
        '6 tarjetas con giro 3D (rotateY 180deg): pregunta en el frente y código recomendado al reverso',
      data: {
        badge: 'TARJETAS CON GIRO 3D INTERACTIVO · HAZ CLIC PARA DAR VUELTA CADA TARJETA',
        title: '6 Patrones Críticos con Ejemplo Real al Reverso',
        cards: [
          {
            badge: '01 · SECRETOS',
            title: 'Variables .env',
            frontQuestion: '¿Por qué nunca se suben las claves al repositorio Git?',
            frontContext:
              'Incluso si borras el archivo en un commit posterior, el secreto queda grabado para siempre en el historial.',
            backRule: 'Usa os.environ y declara .env dentro de .gitignore:',
            backCode: `SECRET_KEY = os.environ["SECRET_KEY"]\nDB_PASS = os.environ["POSTGRES_PASSWORD"]`,
          },
          {
            badge: '02 · PERMISOS',
            title: 'Principio de Menor Privilegio',
            frontQuestion: '¿Con qué permisos debe conectarse la aplicación a la BD?',
            frontContext:
              'Nunca conectes la aplicación web con el superusuario postgres o root en producción.',
            backRule: 'Crea un rol específico solo con permisos CRUD sobre el esquema:',
            backCode: `GRANT SELECT, INSERT, UPDATE\nON ALL TABLES IN SCHEMA public\nTO app_backend_user;`,
          },
          {
            badge: '03 · RENDIMIENTO',
            title: 'Problema de Consultas N+1',
            frontQuestion: '¿Cómo evitar que un listado dispare 500 consultas SQL?',
            frontContext:
              'Acceder a una llave foránea dentro de un ciclo for consulta la base de datos en cada vuelta.',
            backRule: 'Precarga las relaciones en 1 sola consulta con JOIN:',
            backCode: `pedidos = Pedido.objects.select_related(\n    "cliente", "sucursal"\n).prefetch_related("items")`,
          },
          {
            badge: '04 · PAGOS Y APIS',
            title: 'Clave de Idempotencia',
            frontQuestion: '¿Cómo evitar cobrar dos veces si el usuario hace doble clic?',
            frontContext:
              'En redes móviles inestables el navegador puede reenviar la misma orden de pago automáticamente.',
            backRule: 'Valida un identificador único de operación (Idempotency-Key):',
            backCode: `pago, creado = Pago.objects.get_or_create(\n    idempotency_key=request.headers["X-Key"],\n    defaults={"monto": total}\n)`,
          },
          {
            badge: '05 · TRANSACCIONES',
            title: 'Atomicidad en Operaciones',
            frontQuestion: '¿Qué ocurre si falla el descuento de stock a mitad del pago?',
            frontContext:
              'Sin una transacción atómica, los datos quedan inconsistentes entre tablas.',
            backRule: 'Envuelve todo el bloque crítico en transaction.atomic():',
            backCode: `with transaction.atomic():\n    cuenta.descontar(monto)\n    inventario.reservar(producto_id)`,
          },
          {
            badge: '06 · DEFENSA API',
            title: 'Rate Limiting y Throttling',
            frontQuestion: '¿Cómo frenar ataques de fuerza bruta al endpoint de login?',
            frontContext:
              'Un bot puede probar miles de combinaciones por minuto si no limitas la frecuencia por IP.',
            backRule: 'Aplica límite estricto de intentos por minuto:',
            backCode: `REST_FRAMEWORK = {\n  "DEFAULT_THROTTLE_RATES": {\n    "login": "5/minute"\n  }\n}`,
          },
        ],
      },
    },
    {
      id: 'widget-timeline',
      type: 'pipeline-steps',
      componentName: 'WidgetStepToStep',
      summary: 'Línea de tiempo vertical paso a paso de las 4 etapas auditadas del Pipeline CI/CD',
      data: {
        badge: 'FLUJO DE INTEGRACIÓN CONTINUA · STEP TO STEP',
        title: 'Del Commit a Producción en 4 Etapas Auditadas',
        stages: [
          {
            stage: 'ETAPA 1',
            time: '00:15 seg',
            title: 'Pre-Commit & Escaneo de Secretos',
            description:
              'Antes de que el código salga del computador del desarrollador, Gitleaks y Ruff verifican que no existan tokens AWS, claves privadas ni errores de sintaxis.',
            badge: 'Local Hook',
          },
          {
            stage: 'ETAPA 2',
            time: '01:20 min',
            title: 'Pruebas Unitarias y Análisis Estático (SAST)',
            description:
              'El servidor de integración continua levanta una base de datos efímera y ejecuta más de 180 pruebas automatizadas validando permisos y bordes.',
            badge: 'CI Runner',
          },
          {
            stage: 'ETAPA 3',
            time: '02:45 min',
            title: 'Auditoría de Dependencias y Contenedor',
            description:
              'Se analiza el archivo requirements.txt / package-lock.json contra bases de datos CVE para asegurar que ninguna librería tenga vulnerabilidades abiertas.',
            badge: 'Security Gate',
          },
          {
            stage: 'ETAPA 4',
            time: '03:30 min',
            title: 'Despliegue Canary y Monitoreo en Vivo',
            description:
              'La nueva versión recibe primero el 10% del tráfico mientras se vigila la tasa de errores HTTP 500 y la latencia p95 antes de completar el rollout.',
            badge: 'Producción',
          },
        ],
      },
    },
    {
      id: 'widget-checklist',
      type: 'checklist',
      componentName: 'WidgetChecklist',
      summary: 'Lista de verificación interactiva (Checklist) de controles antes de salir a producción',
      data: {
        badge: 'CONTROL DE CALIDAD Y SEGURIDAD · CHECKLIST INTERACTIVO',
        checklistTitle: 'Checklist Interactivo de Paso a Producción',
        checklistSubtitle: 'Marca cada control verificado antes de autorizar el despliegue:',
        checklist: [
          {
            id: 'chk-1',
            label: 'DEBUG = False verificado en el entorno de producción',
            category: 'Configuración',
          },
          {
            id: 'chk-2',
            label: 'SECRET_KEY y credenciales cargadas desde variables de entorno',
            category: 'Secretos',
          },
          {
            id: 'chk-3',
            label: 'Certificado HTTPS / HSTS activo y redirección segura habilitada',
            category: 'Red',
          },
          {
            id: 'chk-4',
            label: 'Consultas ORM auditadas con select_related() sin problemas N+1',
            category: 'Rendimiento',
          },
          {
            id: 'chk-5',
            label: 'Respaldo automático de base de datos probado antes de migrar',
            category: 'Datos',
          },
        ],
      },
    },
    {
      id: 'widget-quiz',
      type: 'scenario-quiz',
      componentName: 'WidgetScenarioQuiz',
      summary:
        'Evaluación de 3 casos reales (¿Ud. qué haría?) con Video integrado en el Caso 3 y puntaje',
      data: {
        reportTargetId: 'widget-report',
        questions: [
          {
            id: 'q1',
            badge: 'CASO 1 DE 3 · GESTIÓN DE CREDENCIALES',
            question: '¿Ud. qué haría?',
            context:
              'Un proyecto urgente debe salir a producción hoy. El encargado del servidor aún no configura las variables de entorno y un colega sugiere subir las claves de producción dentro del código fuente.',
            points: 35,
            options: [
              {
                id: 'opt1',
                text: 'Lo consulto con mi jefe y si él lo autoriza procedo con la publicación de las credenciales en el repositorio temporalmente.',
                isCorrect: false,
                feedback:
                  'Incorrecto. Ninguna autorización verbal justifica subir claves al repositorio, ya que quedan expuestas en el historial de Git.',
              },
              {
                id: 'opt2',
                text: 'No subo las credenciales al código ni omito los controles, ya que sé que debería formalizar el despliegue mediante variables de entorno (.env), de acuerdo a la normativa y las políticas internas de seguridad. Si la tarea o proyecto son urgentes, intentaría obtener la configuración de secretos en el panel del servidor.',
                isCorrect: true,
                feedback:
                  '¡Correcto! Cumplir con la política de variables de entorno y controles de seguridad protege a toda la organización incluso bajo presión de tiempo.',
              },
              {
                id: 'opt3',
                text: 'Dejo la contraseña escrita en el código por unos días hasta que termine este sprint, prometiendo moverla a variables de entorno la próxima semana.',
                isCorrect: false,
                feedback:
                  'Incorrecto. Una credencial expuesta unos minutos en un repositorio puede ser extraída automáticamente y comprometer la base de datos.',
              },
              {
                id: 'opt4',
                text: 'Desactivo las validaciones de seguridad y subo el cambio directo, ya que las tareas que debo entregar son urgentes y es muy importante cumplir ese objetivo, incluso cuando implique correr riesgos.',
                isCorrect: false,
                feedback:
                  'Incorrecto. Nunca se debe comprometer la integridad ni asumir riesgos críticos de seguridad por cumplir un plazo.',
              },
            ],
          },
          {
            id: 'q2',
            badge: 'CASO 2 DE 3 · PRIVACIDAD Y ASISTENTES DE IA',
            question: '¿Cómo procedería al depurar un error con IA?',
            context:
              'Necesitas optimizar una consulta compleja que falla con datos reales. Tienes en tu pantalla un archivo CSV con 2.000 RUTs, correos y teléfonos reales de estudiantes.',
            points: 30,
            options: [
              {
                id: 'q2-opt1',
                text: 'Copio y pego los 2.000 registros reales en un chat público de IA para que detecte más rápido cuál fila tiene el formato incorrecto.',
                isCorrect: false,
                feedback:
                  'Incorrecto. Enviar datos personales reales a servicios externos sin contrato de confidencialidad vulnera la Ley de Protección de Datos.',
              },
              {
                id: 'q2-opt2',
                text: 'Reemplazo los datos sensibles por 5 filas ficticias generadas con Faker que reproduzcan la misma estructura del error antes de compartir el fragmento de código.',
                isCorrect: true,
                feedback:
                  '¡Excelente! Anonimizar y usar datos sintéticos permite aprovechar la IA al 100% sin exponer información privada de las personas.',
              },
              {
                id: 'q2-opt3',
                text: 'Le pido a la IA que prometa borrar los datos después de responder mi consulta.',
                isCorrect: false,
                feedback:
                  'Incorrecto. Una instrucción en el prompt no modifica las políticas de retención ni el registro en los servidores externos.',
              },
            ],
          },
          {
            id: 'q3',
            badge: 'CASO 3 DE 3 · RESPUESTA ANTE INCIDENTES',
            question: '¿Qué acción tomaría tras observar el incidente en el video?',
            context:
              'Revisa la siguiente cápsula de evidencia sobre cómo se filtró un token de acceso en un commit antiguo del repositorio y selecciona el protocolo correcto:',
            videoUrl: 'https://www.youtube.com/embed/aircAruvnKk?rel=0',
            videoCaption:
              'Evidencia en video: Detección de clave comprometida en historial de Git y alerta de monitoreo.',
            apaCitation:
              'Sanderson, G. [3Blue1Brown]. (2017). Fundamentos visuales de redes y trazabilidad de sistemas [Video]. YouTube. https://www.youtube.com/watch?v=aircAruvnKk',
            points: 35,
            options: [
              {
                id: 'q3-opt1',
                text: 'Hago un nuevo commit borrando la línea del archivo y doy el problema por solucionado.',
                isCorrect: false,
                feedback:
                  'Incorrecto. El commit anterior sigue existiendo en el historial de Git y la llave continúa siendo válida para cualquiera que la haya leído.',
              },
              {
                id: 'q3-opt2',
                text: 'Revoco y roto inmediatamente la credencial en el panel del proveedor cloud, reviso los logs de acceso y notifico al equipo siguiendo el protocolo.',
                isCorrect: true,
                feedback:
                  '¡Correcto! Cuando una clave toca un repositorio, debe considerarse comprometida y revocarse de inmediato.',
              },
              {
                id: 'q3-opt3',
                text: 'Espero hasta la reunión mensual del próximo mes para comentarlo con calma.',
                isCorrect: false,
                feedback:
                  'Incorrecto. Los bots automatizados escanean repositorios en cuestión de minutos; la contención debe ser inmediata.',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'widget-quiz-multiple',
      type: 'scenario-quiz-multiple',
      componentName: 'WidgetScenarioQuizMultiple',
      summary:
        'Evaluación de selección múltiple (Checkboxes): marcar todas las medidas obligatorias ante una brecha',
      data: {
        badge: 'INTERACCIÓN QUIZ · SELECCIÓN MÚLTIPLE (CHECKBOXES)',
        title: '¿Cuáles son las 3 acciones obligatorias al detectar una fuga de datos?',
        context:
          'Un script de respaldo dejó expuesto temporalmente un archivo CSV con correos institucionales en un bucket público. Según el protocolo de respuesta, debes ejecutar TODAS las medidas obligatorias de contención:',
        instruction: 'Marca exactamente las 3 medidas correctas (evita los distractores):',
        points: 20,
        successFeedback:
          '¡Excelente criterio! Identificaste las 3 medidas técnicas y legales obligatorias sin caer en prácticas de ocultamiento.',
        errorFeedback:
          'Revisa tu selección: recuerda que debes marcar las 3 medidas del protocolo oficial y ninguna acción que oculte evidencia.',
        options: [
          {
            id: 'qm-1',
            text: 'Bloquear inmediatamente el acceso público al bucket y rotar las llaves IAM asociadas.',
            isCorrect: true,
            explanation: 'Contención técnica inmediata para detener la exposición.',
          },
          {
            id: 'qm-2',
            text: 'Preservar los logs de acceso (CloudTrail / Nginx) para determinar qué IPs descargaron el archivo.',
            isCorrect: true,
            explanation: 'La evidencia forense es indispensable para la auditoría.',
          },
          {
            id: 'qm-3',
            text: 'Borrar el historial de logs del servidor para evitar sanciones al equipo de desarrollo.',
            isCorrect: false,
            explanation: 'Destruir evidencia constituye una falta grave de cumplimiento.',
          },
          {
            id: 'qm-4',
            text: 'Notificar al Oficial de Seguridad de la Información y al Comité de Cumplimiento dentro de la ventana establecida.',
            isCorrect: true,
            explanation: 'El escalamiento temprano activa la protección legal e institucional.',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-dragdrop',
      type: 'scenario-quiz-drag-drop',
      componentName: 'WidgetScenarioQuizDragAndDrop',
      summary:
        'Clasificación interactiva Drag & Drop: arrastrar o asignar prácticas a contenedores Permitido vs. Prohibido',
      data: {
        badge: 'INTERACCIÓN QUIZ · DRAG & DROP DE CLASIFICACIÓN',
        title: 'Clasifica cada práctica en su contenedor normativo correspondiente',
        context:
          'Arrastra cada tarjeta (o usa los botones rápidos de asignación) hacia la columna correcta según el Código de Ética y Arquitectura:',
        points: 20,
        categories: [
          {
            id: 'cat-permitido',
            title: '✅ Práctica Permitida y Segura',
            subtitle: 'Alineada con el estándar de producción',
            accentColor: 'emerald',
          },
          {
            id: 'cat-prohibido',
            title: '🚫 Práctica Prohibida / Riesgo Crítico',
            subtitle: 'Vulnera la seguridad o la ley aplicable',
            accentColor: 'rose',
          },
        ],
        items: [
          {
            id: 'dd-1',
            text: 'Usar datos sintéticos generados con Faker para entrenar o consultar a un asistente de IA.',
            correctCategoryId: 'cat-permitido',
            feedback: 'Protege la privacidad sin frenar la productividad del equipo.',
          },
          {
            id: 'dd-2',
            text: 'Subir temporalmente el archivo .env con credenciales reales a una rama privada de Git.',
            correctCategoryId: 'cat-prohibido',
            feedback: 'Ningún secreto de producción debe entrar jamás al historial de Git.',
          },
          {
            id: 'dd-3',
            text: 'Recibir artículos promocionales corporativos de bajo valor (ej. libreta o lápiz) en un congreso público.',
            correctCategoryId: 'cat-permitido',
            feedback: 'Se enmarca como cortesía común de bajo valor sin conflicto de interés.',
          },
          {
            id: 'dd-4',
            text: 'Desactivar las pruebas automatizadas del pipeline CI/CD para desplegar rápido un viernes en la tarde.',
            correctCategoryId: 'cat-prohibido',
            feedback: 'Saltarse las puertas de calidad expone producción a regresiones críticas.',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-ordering',
      type: 'scenario-quiz-ordering',
      componentName: 'WidgetScenarioQuizOrdering',
      summary:
        'Secuencia cronológica interactiva (1° a 4°): ordenar los pasos de respuesta ante un incidente en producción',
      data: {
        badge: 'INTERACCIÓN QUIZ · ORDENAMIENTO DE SECUENCIA (ORDERING)',
        title: 'Ordena del 1° al 4° paso el Protocolo de Respuesta ante Incidentes',
        context:
          'Se detecta un pico anómalo de consultas fallidas de autenticación desde una IP externa. Utiliza los botones ↑ y ↓ para ordenar la secuencia oficial de actuación:',
        points: 15,
        steps: [
          {
            id: 'ord-3',
            text: 'Desplegar el parche definitivo tras superar las pruebas de regresión en Staging.',
            correctPosition: 3,
            hint: 'Remediación técnica validada antes de cerrar el caso',
          },
          {
            id: 'ord-1',
            text: 'Contener el ataque activando la regla de bloqueo/Rate-Limiting en el WAF perimetral.',
            correctPosition: 1,
            hint: 'Primero siempre se detiene el impacto en vivo',
          },
          {
            id: 'ord-4',
            text: 'Documentar el Post-Mortem sin culpables y actualizar las reglas de alerta temprana.',
            correctPosition: 4,
            hint: 'Mejora continua una vez restablecido el servicio',
          },
          {
            id: 'ord-2',
            text: 'Analizar los logs de auditoría para identificar el alcance y verificar si alguna cuenta fue vulnerada.',
            correctPosition: 2,
            hint: 'Diagnóstico forense inmediatamente después de contener',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-matching',
      type: 'scenario-quiz-matching',
      componentName: 'WidgetScenarioQuizMatching',
      summary:
        'Emparejar columnas (Matching): relacionar cada amenaza o situación ética con su control técnico exacto',
      data: {
        badge: 'INTERACCIÓN QUIZ · EMPAREJAMIENTO (MATCHING)',
        title: 'Relaciona cada riesgo detectado con su control de mitigación',
        context:
          'Selecciona en el desplegable de la derecha el mecanismo técnico o normativo que resuelve directamente cada hallazgo de la columna izquierda:',
        points: 15,
        pairs: [
          {
            id: 'm-1',
            leftBadge: 'RIESGO 01 · BASE DE DATOS',
            leftPrompt: 'Inyección SQL por concatenación de texto en consultas',
            rightMatch: 'Consultas parametrizadas / ORM con validación tipada',
          },
          {
            id: 'm-2',
            leftBadge: 'RIESGO 02 · PAGOS Y RED',
            leftPrompt: 'Cobro duplicado cuando el usuario presiona dos veces "Pagar"',
            rightMatch: 'Cabecera Idempotency-Key única + transaction.atomic()',
          },
          {
            id: 'm-3',
            leftBadge: 'RIESGO 03 · ÉTICA Y CONTRATOS',
            leftPrompt: 'Familiar directo postulando como proveedor de tu misma jefatura',
            rightMatch: 'Declaración formal de Conflicto de Interés y abstención de firma',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-fillblank',
      type: 'scenario-quiz-fill-blank',
      componentName: 'WidgetScenarioQuizFillBlank',
      summary:
        'Completar espacios en blanco (Cloze Code): rellenar las piezas faltantes de una política o código seguro',
      data: {
        badge: 'INTERACCIÓN QUIZ · COMPLETAR ESPACIOS EN BLANCO (CLOZE)',
        title: 'Completa la configuración segura del servicio de autenticación',
        context:
          'Selecciona las opciones correctas dentro del bloque para que el endpoint cumpla con el estándar de seguridad en producción:',
        codeMode: true,
        points: 15,
        feedbackSuccess:
          '¡Perfecto! Has completado las variables de entorno, el cifrado Argon2/BCrypt y la protección de transacción atómica.',
        feedbackError:
          'Hay espacios incorrectos: recuerda nunca usar texto plano ni claves hardcodeadas.',
        segments: [
          {
            type: 'text',
            text: '1. Para leer la llave secreta sin exponerla en Git usamos ',
          },
          {
            type: 'blank',
            blankId: 'b1',
            correctAnswer: 'os.environ["SECRET_KEY"]',
            options: [
              '"clave_secreta_1234"',
              'os.environ["SECRET_KEY"]',
              'request.GET["key"]',
            ],
          },
          {
            type: 'text',
            text: '.\n2. Las contraseñas de usuarios se almacenan aplicando hash con ',
          },
          {
            type: 'blank',
            blankId: 'b2',
            correctAnswer: 'Argon2 / BCrypt con sal única',
            options: [
              'MD5 sin sal',
              'Base64 reversible',
              'Argon2 / BCrypt con sal única',
            ],
          },
          {
            type: 'text',
            text: '.\n3. Y toda operación crítica de saldo se ejecuta dentro de ',
          },
          {
            type: 'blank',
            blankId: 'b3',
            correctAnswer: 'with transaction.atomic():',
            options: [
              'with transaction.atomic():',
              'try / pass silencioso',
              'sleep(5)',
            ],
          },
          {
            type: 'text',
            text: ' para garantizar consistencia total.',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-branching',
      type: 'scenario-quiz-branching',
      componentName: 'WidgetScenarioQuizBranching',
      summary:
        'Simulación ramificada (Branching Scenario): árbol de decisiones de 2 niveles con consecuencias en vivo',
      data: {
        badge: 'INTERACCIÓN QUIZ · SIMULACIÓN RAMIFICADA (BRANCHING)',
        title: 'Simulación de Rol: Presión Comercial vs. Seguridad antes del Lanzamiento',
        context:
          'Toma decisiones paso a paso. Cada elección desencadena una nueva situación real con impacto en el puntaje de cumplimiento:',
        points: 20,
        initialNodeId: 'node-1',
        nodes: [
          {
            id: 'node-1',
            stageLabel: 'ESCENA 1 DE 2 · VIERNES 17:30 HRS',
            narrative:
              'Faltan 30 minutos para el lanzamiento trimestral y el escáner automático detecta una vulnerabilidad crítica en una librería de autenticación. El gerente comercial te pide ignorar la alerta y salir a producción ahora mismo. ¿Qué decides?',
            choices: [
              {
                id: 'c1-a',
                label: 'Detener el despliegue, explicar el riesgo real de exposición de cuentas y proponer aplicar el parche de versión (toma 25 minutos).',
                consequenceText:
                  'El gerente comprende el riesgo legal y autoriza la ventana de 25 minutos para actualizar la librería.',
                nextNodeId: 'node-2',
                impactScore: 100,
                isOptimal: true,
              },
              {
                id: 'c1-b',
                label: 'Desactivar el escáner de seguridad en el pipeline para que deje pasar el build y lanzar sin avisar a nadie.',
                consequenceText:
                  'El lanzamiento sale a tiempo, pero durante el fin de semana un bot explota la vulnerabilidad y compromete 1.200 cuentas.',
                impactScore: 0,
                isOptimal: false,
              },
            ],
          },
          {
            id: 'node-2',
            stageLabel: 'ESCENA 2 DE 2 · VALIDACIÓN DEL PARCHE',
            narrative:
              'Ya actualizaste la librería a la versión segura en tu rama. ¿Cómo procedes para completar el paso a producción?',
            choices: [
              {
                id: 'c2-a',
                label: 'Ejecutar la suite de tests automatizados en Staging, solicitar aprobación par en el Pull Request y desplegar con trazabilidad.',
                consequenceText:
                  '¡Despliegue impecable! El servicio sale a producción 100% seguro, auditado y sin incidentes.',
                impactScore: 100,
                isOptimal: true,
              },
              {
                id: 'c2-b',
                label: 'Conectarse por SSH al servidor de producción y editar los archivos manualmente para ahorrar 5 minutos.',
                consequenceText:
                  'Resuelves el bug temporalmente, pero dejas el servidor desincronizado respecto a Git (Configuration Drift).',
                impactScore: 50,
                isOptimal: false,
              },
            ],
          },
        ],
      },
    },
    {
      id: 'widget-quiz-matrix',
      type: 'scenario-quiz-matrix',
      componentName: 'WidgetScenarioQuizTrueFalseMatrix',
      summary:
        'Matriz rápida de dictamen: evaluar múltiples afirmaciones marcando Cumple vs. Incumple',
      data: {
        badge: 'INTERACCIÓN QUIZ · MATRIZ RÁPIDA DE DICTAMEN (CUMPLE / INCUMPLE)',
        title: 'Dictamina cada caso según la Política Institucional',
        context:
          'Para cada una de las siguientes 4 situaciones reales de auditoría, marca si CUMPLE o INCUMPLE la normativa vigente:',
        points: 15,
        statements: [
          {
            id: 'st-1',
            ruleReference: 'ARTÍCULO 4 · CONTROL DE ACCESOS',
            statement:
              'Cada desarrollador utiliza su propia cuenta nominal con MFA activo para acceder al panel cloud.',
            correctVerdict: 'cumple',
            explanation: 'Las cuentas nominales con MFA garantizan trazabilidad individual.',
          },
          {
            id: 'st-2',
            ruleReference: 'ARTÍCULO 7 · GESTIÓN DE PROVEEDORES',
            statement:
              'Se comparte una única contraseña de administrador de base de datos por WhatsApp con un consultor externo.',
            correctVerdict: 'incumple',
            explanation: 'Jamás se comparten credenciales maestras ni se envían por canales no cifrados.',
          },
          {
            id: 'st-3',
            ruleReference: 'ARTÍCULO 11 · INTELIGENCIA ARTIFICIAL',
            statement:
              'El equipo utiliza asistentes de IA únicamente con fragmentos de código genéricos y datos anonimizados.',
            correctVerdict: 'cumple',
            explanation: 'El uso de IA está promovido siempre que no se exponga propiedad intelectual sensible ni PII.',
          },
          {
            id: 'st-4',
            ruleReference: 'ARTÍCULO 15 · CANAL DE DENUNCIAS',
            statement:
              'Un jefe de área toma represalias contra un colaborador que reportó de buena fe una vulnerabilidad crítica.',
            correctVerdict: 'incumple',
            explanation: 'La política garantiza indemnidad absoluta para reportes realizados de buena fe.',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-spotter',
      type: 'scenario-quiz-spotter',
      componentName: 'WidgetScenarioQuizHotspotSpotter',
      summary:
        'Inspector interactivo de código (Spotter): hacer clic sobre las líneas que contienen vulnerabilidades',
      data: {
        badge: 'INTERACCIÓN QUIZ · CAZADOR DE RIESGOS EN CÓDIGO (SPOTTER)',
        title: 'Auditoría en Vivo: Haz clic sobre las 2 líneas vulnerables del archivo',
        context:
          'Inspecciona el siguiente endpoint antes de aprobar el Pull Request. Hay exactamente 2 líneas que introducen riesgos críticos de seguridad; haz clic sobre ellas para marcarlas con bandera roja:',
        fileName: 'views/pagos_api.py',
        targetVulnerableCount: 2,
        points: 20,
        lines: [
          {
            lineNumber: 1,
            codeOrText: 'import os',
            isVulnerable: false,
          },
          {
            lineNumber: 2,
            codeOrText: 'STRIPE_KEY = "sk_live_998877665544332211_hardcoded"',
            isVulnerable: true,
            vulnerabilityExplanation:
              'Llave secreta de producción hardcodeada directamente en el código fuente.',
          },
          {
            lineNumber: 3,
            codeOrText: 'def buscar_transaccion(cursor, orden_id):',
            isVulnerable: false,
          },
          {
            lineNumber: 4,
            codeOrText: '    sql = f"SELECT * FROM pagos WHERE orden = \'{orden_id}\'"',
            isVulnerable: true,
            vulnerabilityExplanation:
              'Interpolación directa f-string en consulta SQL que permite Inyección SQL.',
          },
          {
            lineNumber: 5,
            codeOrText: '    return cursor.fetchall()',
            isVulnerable: false,
          },
        ],
      },
    },
    {
      id: 'widget-quiz-image-hotspot',
      type: 'scenario-quiz-image-hotspot',
      componentName: 'WidgetScenarioQuizImageHotspot',
      summary:
        'Seleccionar una parte/lado de una imagen (Image Hotspot): ej. seleccionar dónde está la batería en una banda de música',
      data: {
        badge: 'INTERACCIÓN QUIZ · SELECCIONAR PARTE DE UNA IMAGEN (IMAGE HOTSPOT)',
        title: 'Observa el escenario de la banda de música y selecciona dónde está la Batería',
        context:
          'Haz clic directamente sobre el sector de la imagen donde se encuentra ubicada la batería acústica (bombo, caja y platillos) en el escenario:',
        sceneType: 'rock-band-stage',
        apaCitation:
          'Elaboración propia. (2026). Disposición escénica de una banda de rock en vivo (Guitarrista, Vocalista, Batería y Tecladista) [Ilustración vectorial]. Café y Código.',
        targetRiskCount: 1,
        points: 20,
        zones: [
          {
            id: 'zone-guitar',
            label: 'Sector Izquierdo: Guitarrista Eléctrico y Amplificador',
            xPercent: 2,
            yPercent: 24,
            widthPercent: 25,
            heightPercent: 64,
            isRiskTarget: false,
            feedback:
              'Incorrecto. En el extremo izquierdo del escenario se encuentran el guitarrista eléctrico y su amplificador, no la batería.',
          },
          {
            id: 'zone-vocal',
            label: 'Sector Centro-Izquierdo: Vocalista Principal y Micrófono',
            xPercent: 28,
            yPercent: 26,
            widthPercent: 20,
            heightPercent: 62,
            isRiskTarget: false,
            feedback:
              'Incorrecto. Esta parte corresponde al vocalista principal frente al pedestal de micrófono.',
          },
          {
            id: 'zone-drums',
            label: 'Sector Centro-Derecho: Batería Acústica (Bombo, Toms y Platillos)',
            xPercent: 49,
            yPercent: 18,
            widthPercent: 28,
            heightPercent: 70,
            isRiskTarget: true,
            feedback:
              '¡Correcto! Seleccionaste exactamente la parte del escenario donde está la batería acústica sobre su tarima.',
          },
          {
            id: 'zone-keys',
            label: 'Sector Derecho: Tecladista y Sintetizador',
            xPercent: 78,
            yPercent: 26,
            widthPercent: 20,
            heightPercent: 62,
            isRiskTarget: false,
            feedback:
              'Incorrecto. En el lado derecho del escenario se ubica el tecladista con su sintetizador.',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-image-choice',
      type: 'scenario-quiz-image-choice',
      componentName: 'WidgetScenarioQuizImageChoice',
      summary:
        'Selección visual de tarjetas con imagen (Image Choice): elegir la escena que cumple el estándar de seguridad',
      data: {
        badge: 'INTERACCIÓN QUIZ · SELECCIÓN VISUAL DE ESCENAS (IMAGE CHOICE)',
        title: '¿Cuál de estas 3 estaciones de trabajo cumple la Política de Escritorio Limpio?',
        context:
          'Observa las 3 escenas visuales y toca la tarjeta que representa el único puesto de trabajo seguro antes de ausentarse a una reunión:',
        apaCitation:
          'ISO/IEC. (2022). ISO/IEC 27001:2022 Anexo A.7.7 Política de puesto de trabajo despejado y pantalla limpia [Ilustraciones adaptadas].',
        points: 15,
        cards: [
          {
            id: 'img-opt-1',
            label: 'Estación A: Post-it en Monitor',
            caption: 'Contraseña anotada en adhesivo visible frente a la pantalla',
            visualType: 'sticky-password',
            isCorrect: false,
            feedback:
              'Incorrecto. Dejar contraseñas adheridas al monitor anula cualquier control de acceso lógico.',
          },
          {
            id: 'img-opt-2',
            label: 'Estación B: Bloqueo con MFA Activo',
            caption: 'Sesión bloqueada con contraseña/MFA y sin documentos sensibles expuestos',
            visualType: 'clean-desk',
            isCorrect: true,
            feedback:
              '¡Correcto! La Estación B cumple el estándar de Escritorio Limpio y bloqueo inmediato de sesión.',
          },
          {
            id: 'img-opt-3',
            label: 'Estación C: Terminal Abierta',
            caption: 'Consola conectada a base de datos de producción sin supervisión',
            visualType: 'unlocked-laptop',
            isCorrect: false,
            feedback:
              'Incorrecto. Dejar una consola root abierta permite que cualquier tercero ejecute comandos con tu identidad.',
          },
        ],
      },
    },
    {
      id: 'widget-quiz-risk-slider',
      type: 'scenario-quiz-risk-slider',
      componentName: 'WidgetScenarioQuizRiskSlider',
      summary:
        'Termómetro calibrador de riesgo (1 a 5): deslizar o elegir el nivel exacto de severidad de un hallazgo',
      data: {
        badge: 'INTERACCIÓN QUIZ · TERMÓMETRO CALIBRADOR DE SEVERIDAD (SLIDER)',
        title: 'Calibra el Nivel de Severidad de este Incidente (Escala 1 a 5)',
        context:
          'Desliza el control o selecciona el botón del nivel que corresponde según la Matriz Institucional de Impacto:',
        incidentSummary:
          'Se descubre que el endpoint público de consulta de boletas permite cambiar el parámetro ?id=1001 por ?id=1002 sin validar sesión (IDOR), exponiendo datos financieros de todos los clientes.',
        correctLevel: 5,
        points: 15,
        explanation:
          'La exposición masiva de datos financieros sin autenticación (IDOR en producción) clasifica como Nivel 5 (Crítico / Bloqueante) y exige contención inmediata.',
        levels: [
          {
            level: 1,
            name: 'Informativo',
            color: '#64748B',
            actionRequired: 'Registrar en el backlog para mejora cosmética sin urgencia.',
          },
          {
            level: 2,
            name: 'Bajo',
            color: '#0284C7',
            actionRequired: 'Corregir en el próximo Sprint regular de mantenimiento.',
          },
          {
            level: 3,
            name: 'Moderado',
            color: '#D97706',
            actionRequired: 'Planificar parche dentro de los próximos 5 días hábiles.',
          },
          {
            level: 4,
            name: 'Alto',
            color: '#EA580C',
            actionRequired: 'Mitigar en menos de 24 horas y auditar accesos.',
          },
          {
            level: 5,
            name: 'Crítico',
            color: '#DC2626',
            actionRequired: 'Contención inmediata (< 15 min), bloqueo de endpoint y activación de comité.',
          },
        ],
      },
    },
    {
      id: 'widget-report',
      type: 'final-report',
      componentName: 'WidgetFinalReport',
      summary:
        'Reporte final de desempeño con Score Global (/100), métricas y desglose por actividad',
      data: {
        badge: 'REPORTE FINAL DE AUDITORÍA Y DESEMPEÑO ACADÉMICO',
        title: 'Resultado de tu Evaluación Interactiva',
        subtitle:
          'Resumen consolidado de tus decisiones en los escenarios prácticos, checklist de producción y avance de lecciones.',
        passingScore: 70,
      },
    },
  ],
};

