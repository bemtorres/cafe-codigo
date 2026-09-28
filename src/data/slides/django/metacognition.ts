import type { MetaReflectionQuestion } from '../../../types/slides';

export type { MetaReflectionQuestion };

function createBaseGenericQuestions(): MetaReflectionQuestion[] {
  return [
    {
      id: 1,
      category: 'Generic',
      title: '1. Estrategia de Aprendizaje',
      questionText: '¿Qué método personal utilizaste para conectar los conceptos teóricos de esta lección con el código práctico en Python?',
      promptHint: 'Pensar en analogías visuales y escribir código propio ayuda a fijar el conocimiento a largo plazo.',
      keyTakeaway: 'Visualizar el impacto práctico de cada concepto convierte la sintaxis abstracta en comprensión sólida.'
    },
    {
      id: 2,
      category: 'Generic',
      title: '2. Gestión de Complejidad',
      questionText: '¿En qué parte sentiste mayor duda o confusión durante este tema y qué técnica usaste para aclararlo?',
      promptHint: 'Identificar el punto exacto de fricción es el primer paso para dominar la ingeniería de software.',
      keyTakeaway: 'Resolver la duda conceptual antes de pasar a la práctica previene bugs costosos en producción.'
    },
    {
      id: 3,
      category: 'Generic',
      title: '3. Conexión de Aprendizajes',
      questionText: '¿Cómo se complementa lo que aprendiste hoy con tus conocimientos previos de programación y desarrollo web?',
      promptHint: 'Django conecta bases de datos, lógica backend y protocolos web en un solo ecosistema coherente.',
      keyTakeaway: 'Ver cómo encajan las piezas te permite entender el flujo completo de una aplicación web.'
    },
    {
      id: 4,
      category: 'Generic',
      title: '4. Aplicación Práctica Inmediata',
      questionText: '¿Qué funcionalidad o módulo de tu proyecto personal diseñarás o mejorarás aplicando lo aprendido hoy?',
      promptHint: 'Llevar los conceptos a un proyecto propio en las primeras 24 horas consolida la memoria muscular.',
      keyTakeaway: 'Escribir código real es la mejor forma de transformar información en habilidad técnica duradera.'
    }
  ];
}

export function getMetaQuestionsForLesson(lessonSlug: string): MetaReflectionQuestion[] {
  const base = createBaseGenericQuestions();
  let specific: MetaReflectionQuestion[] = [];
  const normalized = lessonSlug.replace(/^\/+|\/+$/g, '');

  switch (normalized) {
    case 'introduccion':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Filosofía de Baterías Incluidas',
          questionText: '¿Qué impacto tiene para un equipo de desarrollo contar con autenticación, ORM y panel de administración integrados frente a ensamblar librerías sueltas?',
          promptHint: 'Piensa en tiempos de entrega, coherencia del código y compatibilidad de versiones.',
          keyTakeaway: 'Las baterías incluidas permiten concentrarse en la lógica de negocio y acelerar el tiempo de salida al mercado.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Criterio de Selección de Framework',
          questionText: 'Si tuvieras que explicarle al líder de tu empresa cuándo usar Django frente a Flask o FastAPI, ¿cuáles serían tus 3 argumentos principales?',
          promptHint: 'Evalúa la necesidad de base de datos relacional, panel administrativo y volumen de funcionalidades del sistema.',
          keyTakeaway: 'Elegir la herramienta correcta según el alcance del proyecto evita reescrituras costosas en el futuro.'
        }
      ];
      break;

    case 'python-para-backend':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Disciplina del Entorno Aislado',
          questionText: '¿Por qué la disciplina de activar siempre un entorno virtual (venv) antes de programar es un requisito innegociable en equipos profesionales?',
          promptHint: 'Reflexiona sobre qué ocurriría si trabajas en dos proyectos con versiones distintas de Django en la misma máquina.',
          keyTakeaway: 'Los entornos virtuales garantizan que tus proyectos sean reproducibles e independientes del sistema operativo anfitrión.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. La Elegancia de los Decoradores',
          questionText: '¿Cómo transforman los decoradores (@) la forma en que aplicas seguridad y validaciones transversales en tus vistas?',
          promptHint: 'Compara envolver una función con una sola línea (@login_required) frente a repetir 10 líneas de if/else en cada vista.',
          keyTakeaway: 'Los decoradores mantienen el código limpio aplicando el principio DRY (Don\'t Repeat Yourself).'
        }
      ];
      break;

    case 'introduccion-django':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Modularidad: Proyecto vs Aplicaciones',
          questionText: '¿Por qué dividir un sistema en aplicaciones modulares (ej: clientes, catalogo, facturacion) facilita el trabajo en equipo y el mantenimiento?',
          promptHint: 'Imagina a varios desarrolladores trabajando en paralelo en el mismo repositorio Git.',
          keyTakeaway: 'La arquitectura modular de Django reduce conflictos y permite aislar responsabilidades de forma natural.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. El Papel Central de settings.py',
          questionText: '¿Por qué es fundamental comprender la lista INSTALLED_APPS y qué consecuencias tiene omitir el registro de una nueva app?',
          promptHint: 'Recuerda que Django necesita conocer las apps registradas para procesar modelos, migraciones y plantillas.',
          keyTakeaway: 'INSTALLED_APPS es el corazón declarativo de Django: sin él, el framework ignora tus módulos.'
        }
      ];
      break;

    case 'arquitectura-django':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Mapa Mental del Patrón MVT',
          questionText: '¿Cómo cambió tu mapa mental sobre el desarrollo web al entender que en Django la "Vista" es el controlador y el "Template" es la interfaz visual?',
          promptHint: 'Visualiza el camino: petición del usuario → urls.py → views.py → models.py → template → respuesta.',
          keyTakeaway: 'Tener claro el flujo MVT te permite saber con exactitud en qué archivo programar cada requerimiento.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Separación Estricta de Capas',
          questionText: '¿Qué problemas de mantenimiento ocurrirían si un programador empieza a incrustar código HTML directamente dentro de views.py?',
          promptHint: 'Piensa en colaboración con diseñadores, pruebas unitarias y legibilidad del código.',
          keyTakeaway: 'Respetar la separación entre lógica (views) y presentación (templates) es la marca de un código profesional.'
        }
      ];
      break;

    case 'arquitectura-django/urls':
    case 'arquitectura-django-urls':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Fragilidad de las URLs Hardcodeadas',
          questionText: '¿Qué ocurriría en un sitio con 100 páginas si escribes href="/articulos/..." a mano y luego el cliente decide cambiar la ruta a /blog/?',
          promptHint: 'Compara buscar y reemplazar 100 archivos HTML frente a cambiar una sola línea en urls.py usando {% url %}.',
          keyTakeaway: 'Nombrar rutas con "name" y usar {% url %} hace que tu navegación sea 100% inmune a refactorizaciones.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Validación Temprana con Convertidores',
          questionText: '¿Por qué definir <int:id> en lugar de aceptar cualquier cadena en la URL protege la estabilidad de tus vistas?',
          promptHint: 'Piensa en qué pasaría si un usuario escribe /articulos/abc/ y la vista espera un número entero para la base de datos.',
          keyTakeaway: 'Los convertidores de ruta actúan como un cortafuegos: rechazan peticiones con formato erróneo con un 404 instantáneo.'
        }
      ];
      break;

    case 'arquitectura-django/views':
    case 'arquitectura-django-views':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Prevención de Caídas con get_object_or_404',
          questionText: '¿Por qué en un entorno de producción es crítico responder un código HTTP 404 controlado en lugar de dejar que una excepción DoesNotExist lance un error 500?',
          promptHint: 'Evalúa la experiencia del usuario y las alertas de monitoreo que se disparan ante un error 500 no controlado.',
          keyTakeaway: 'get_object_or_404 transforma un fallo potencial del servidor en una respuesta HTTP estándar y predecible.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Criterio de Selección: FBV vs CBV',
          questionText: '¿En qué tipo de pantallas elegirías una vista basada en funciones (FBV) y en cuáles una vista genérica basada en clases (CBV)?',
          promptHint: 'Compara un catálogo estándar con paginación frente a un proceso de cobro con múltiples pasos y APIs externas.',
          keyTakeaway: 'Usa CBV para acelerar CRUDs y catálogos estándar; usa FBV para lógica personalizada donde la claridad paso a paso es primordial.'
        }
      ];
      break;

    case 'arquitectura-django/template':
    case 'arquitectura-django-template':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Principio DRY en el Diseño Visual',
          questionText: '¿Cuánto tiempo y esfuerzo ahorra el patrón base.html con {% extends %} y {% block %} en proyectos que crecen a decenas de páginas?',
          promptHint: 'Imagina tener que actualizar los enlaces del pie de página o el logo corporativo en todo el sitio web.',
          keyTakeaway: 'La herencia de plantillas centraliza el diseño estructural y permite modificar la identidad del sitio en un solo archivo.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Seguridad y Filosofía del DTL',
          questionText: '¿Por qué el lenguaje de plantillas de Django limita intencionalmente la ejecución de código Python complejo dentro del HTML?',
          promptHint: 'Reflexiona sobre qué ocurriría si un template pudiera ejecutar sentencias SQL o importar librerías del sistema.',
          keyTakeaway: 'DTL protege el frontend contra inyecciones de código y asegura que la lógica pesada permanezca siempre en el backend.'
        }
      ];
      break;

    case 'arquitectura-django/training':
    case 'arquitectura-django-training':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Mentalidad del Depurador',
          questionText: '¿Cuál es tu método sistemático cuando ves una pantalla amarilla de error: entras en pánico o lees el archivo y línea señalada?',
          promptHint: 'Django te dice exactamente el tipo de excepción, el archivo y la línea. Aprender a leer la traza es una superpotencia.',
          keyTakeaway: 'Los errores son pistas explícitas de la máquina: leer con calma la traza de depuración reduce el tiempo de resolución a minutos.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. La Importancia de CSRF en Formularios',
          questionText: '¿Cómo explicarías el ataque de Cross-Site Request Forgery y por qué la etiqueta {% csrf_token %} es un escudo esencial?',
          promptHint: 'Imagina que un sitio web malicioso envía un formulario oculto a tu banco mientras tienes tu sesión activa.',
          keyTakeaway: '{% csrf_token %} asegura que cada petición de modificación provenga genuinamente de una página servida por tu propia aplicación.'
        }
      ];
      break;

    case 'modelo-bd':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Magia vs la Realidad del ORM',
          questionText: '¿Por qué es fundamental que un desarrollador profesional inspeccione el SQL generado con sqlmigrate en lugar de tratar al ORM como una caja negra?',
          promptHint: 'Piensa en optimización de índices, tipos de datos físicos y consumo de recursos en bases de datos con millones de filas.',
          keyTakeaway: 'Entender el SQL subyacente te distingue de un aficionado: te convierte en un ingeniero backend de alto rendimiento.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Integridad y Dinero',
          questionText: '¿Qué consecuencias catastróficas tendría para una empresa utilizar FloatField en lugar de DecimalField en su módulo de facturación?',
          promptHint: 'Recuerda el error de coma flotante IEEE 754 y cómo micro-centavos pueden descuadrar balances financieros y auditorías fiscales.',
          keyTakeaway: 'La precisión matemática fija es un requisito innegociable en sistemas monetarios y transaccionales.'
        },
        {
          id: 7,
          category: 'CourseSpecific',
          title: '7. Políticas de Borrado (on_delete)',
          questionText: '¿Qué criterio aplicarías para decidir entre CASCADE y PROTECT en una relación entre Clientes y Facturas de compra?',
          promptHint: 'Si un cliente pide eliminar su cuenta, ¿qué debe pasar con las facturas históricas emitidas legalmente?',
          keyTakeaway: 'PROTECT o SET_NULL protegen la trazabilidad legal y financiera impidiendo borrados catastróficos.'
        },
        {
          id: 8,
          category: 'CourseSpecific',
          title: '8. La Regla de Oro de Django',
          questionText: '¿Cómo explicarías a otro programador por qué nunca se debe colocar null=True en un campo CharField o TextField?',
          promptHint: 'Reflexiona sobre la ambigüedad de tener dos representaciones distintas de la ausencia de dato: cadena vacía "" vs NULL en SQL.',
          keyTakeaway: 'Unificar los estados vacíos con solo blank=True evita consultas confusas y bugs sutiles en los filtros del ORM.'
        }
      ];
      break;

    case 'modelo-bd-step':
    case 'modelo-bd/step':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Migraciones Incrementales vs Todo de Golpe',
          questionText: '¿Por qué dividir la evolución de la base de datos en fases atómicas es el estándar de la industria?',
          promptHint: 'Piensa en despliegues continuos, rollback de versiones, facilidad de pruebas y reducción del riesgo de bloquear tablas críticas.',
          keyTakeaway: 'Las migraciones atómicas e incrementales permiten que el software crezca de forma modular, segura y sin interrupciones operativas.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. El Valor del Snapshot Financiero',
          questionText: '¿Qué impacto legal y contable tendría en una auditoría de tu empresa si los precios de las boletas históricas dependieran del catálogo actual?',
          promptHint: 'Si subes los precios el próximo mes, ¿qué pasaría con los balances contables de ventas cerradas hace un año?',
          keyTakeaway: 'El principio del snapshot protege la verdad histórica del negocio: lo que se vendió a un precio queda congelado para siempre.'
        }
      ];
      break;

    case 'modelo-bd-library':
    case 'modelo-bd/library':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Costo Oculto de las N+1 Consultas',
          questionText: '¿Cómo afecta al servidor de base de datos ejecutar 501 consultas en lugar de 1 sola con select_related() cuando 10.000 usuarios visitan el catálogo a la vez?',
          promptHint: 'Evalúa la latencia de red entre la app y la base de datos, el consumo de conexiones y la sobrecarga de CPU.',
          keyTakeaway: 'select_related() y prefetch_related() son las dos herramientas más poderosas para escalar aplicaciones Django a gran volumen.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Navegación Inversa con related_name',
          questionText: '¿De qué manera el parámetro related_name="libros" en la ForeignKey mejora la legibilidad de tu código al consultar datos desde el modelo Autor?',
          promptHint: 'Compara escribir autor.libro_set.all() frente al expresivo autor.libros.all().',
          keyTakeaway: 'Nombrar las relaciones inversas con claridad hace que el código del ORM se lea como prosa natural en inglés o español.'
        }
      ];
      break;

    case 'modelo-bd-vehiculos':
    case 'modelo-bd/vehiculos':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Preservación de Bienes Físicos con SET_NULL',
          questionText: '¿Por qué la elección de SET_NULL frente a CASCADE es una decisión financiera y operativa fundamental en modelos de activos?',
          promptHint: 'Reflexiona sobre qué ocurriría contable y legalmente si la eliminación de un usuario conductor borrara también del inventario un camión valorado en decenas de miles de dólares.',
          keyTakeaway: 'SET_NULL protege la existencia de activos físicos desconectándolos temporalmente del conductor sin destruir su historial ni su valor patrimonial.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Transacciones Atómicas en Seeding',
          questionText: '¿Qué consecuencias tendría para las pruebas de tu equipo si el controlador con Faker falla a mitad de camino sin usar transaction.atomic()?',
          promptHint: 'Si el script crea 50 pilotos pero explota antes de los vehículos, ¿en qué estado queda la base de datos de pruebas?',
          keyTakeaway: 'transaction.atomic() asegura la integridad: o se crea la flota completa y coherente, o se cancela todo limpiamente mediante un rollback.'
        }
      ];
      break;

    case 'admin-crud':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Transformación de Admin a Software SaaS',
          questionText: '¿Cómo cambia la percepción de un cliente cuando le entregas un panel con django-unfold (Tailwind, Modo Oscuro y métricas) frente a la interfaz básica de 2005?',
          promptHint: 'Reflexiona sobre la confianza del cliente, el valor percibido del software y la productividad de los operadores diarios.',
          keyTakeaway: 'Un diseño moderno y limpio no es solo estética: genera confianza empresarial y facilita la adopción del producto.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Productividad Operativa con las 6 Palancas',
          questionText: '¿Qué palanca de ModelAdmin (list_display, list_filter, list_editable, inlines) consideras que ahorra más clics diarios a un operador?',
          promptHint: 'Piensa en tareas repetitivas como actualizar inventario, cambiar estados de pedidos o consultar revisiones de vehículos.',
          keyTakeaway: 'Configurar ModelAdmin con mentalidad de usuario final ahorra cientos de horas de trabajo a los equipos de operaciones.'
        }
      ];
      break;

    case 'seguridad':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Responsabilidad Ética de las Contraseñas',
          questionText: '¿Por qué como ingeniero backend nunca debes almacenar contraseñas en texto plano ni crear tus propios algoritmos de cifrado caseros?',
          promptHint: 'Piensa en el impacto humano y legal si una base de datos se filtra con contraseñas que los usuarios reutilizan en sus correos personales.',
          keyTakeaway: 'Confiar en algoritmos criptográficos robustos como PBKDF2 y SHA256 con salt es el deber ético fundamental de todo desarrollador.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. El Peligro Silencioso de DEBUG=True',
          questionText: '¿Qué información crítica queda expuesta a cualquier visitante de internet si un servidor tiene DEBUG=True en producción?',
          promptHint: 'Recuerda que la pantalla amarilla expone consultas SQL, contraseñas de conexión, la SECRET_KEY y variables de entorno.',
          keyTakeaway: 'DEBUG=False y un SECRET_KEY cargado desde variables de entorno son los dos mandamientos sagrados del despliegue.'
        }
      ];
      break;

    case 'apis-restful':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Semántica de los Verbos HTTP',
          questionText: '¿Por qué respetar la semántica de verbos (GET para lectura, POST para creación, DELETE para borrado) es crucial al colaborar con desarrolladores de React o Flutter?',
          promptHint: 'Piensa en qué pasaría si un navegador web precarga un enlace GET y ese enlace borra un registro de la base de datos.',
          keyTakeaway: 'Las convenciones RESTful garantizan que cualquier cliente frontend o móvil pueda consumir tus servicios sin ambigüedades.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. El Valor de los Códigos de Estado',
          questionText: '¿Cómo mejora la experiencia del usuario en una app móvil cuando tu API responde con códigos exactos (201, 400, 401, 404) en lugar de siempre 200?',
          promptHint: 'Las librerías como Axios interceptan automáticamente errores 401 para renovar tokens o 400 para pintar errores en formularios.',
          keyTakeaway: 'Los códigos de estado HTTP son el lenguaje universal de diagnóstico entre servidores y clientes web.'
        }
      ];
      break;

    case 'drf-jwt':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Revolución de los Tokens Sin Estado (Stateless)',
          questionText: '¿Por qué la arquitectura JWT escala mucho mejor en sistemas con millones de usuarios concurrentes frente a guardar sesiones en tablas de base de datos?',
          promptHint: 'Reflexiona sobre la carga de lectura que tendría la base de datos si cada petición de cada usuario requiriera verificar una fila de sesión.',
          keyTakeaway: 'Los JWT permiten validar identidades con cálculo criptográfico instantáneo sin sobrecargar el motor de base de datos.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. La Danza del Access Token y Refresh Token',
          questionText: '¿Por qué dividimos las credenciales en un Access Token de corta duración y un Refresh Token de larga duración?',
          promptHint: 'Si un atacante intercepta un Access Token que expira en 10 minutos, ¿cuál es la ventana de riesgo comparada con un token eterno?',
          keyTakeaway: 'Tokens de vida corta minimizan la ventana de vulnerabilidad ante interceptaciones, mientras que el Refresh Token mantiene la comodidad del usuario.'
        }
      ];
      break;

    case 'proyecto-integrador':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. De Código en Mi Máquina a Software en Producción',
          questionText: '¿Qué diferencia a un programador aficionado de un ingeniero de software backend en el momento de publicar un proyecto?',
          promptHint: 'Evalúa el uso de variables de entorno (.env), contenedores Docker, gestión de estáticos con collectstatic y servidores WSGI como Gunicorn.',
          keyTakeaway: 'El software profesional se diseña para ser reproducible, seguro, monitorizable y fácil de escalar en servidores de producción.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Tu Trayectoria en Django',
          questionText: 'Mirando hacia atrás desde la primera lección hasta hoy, ¿cuál consideras que ha sido el superpoder más valioso que has desbloqueado en Django?',
          promptHint: 'Desde la arquitectura MVT hasta APIs con JWT y el ORM relacional: conecta todos los puntos de tu aprendizaje.',
          keyTakeaway: '¡Posees las habilidades completas para concebir, desarrollar y desplegar aplicaciones web de clase mundial con Python y Django!'
        }
      ];
      break;

    default:
      specific = [];
      break;
  }

  return [...base, ...specific];
}
