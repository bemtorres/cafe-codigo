import type { MetaReflectionQuestion } from '../../../types/slides';

export type { MetaReflectionQuestion };

function createBaseGenericQuestions(): MetaReflectionQuestion[] {
  return [
    {
      id: 1,
      category: 'Generic',
      title: '1. Estrategia de Aprendizaje',
      questionText: '¿Qué estrategia personal utilizaste durante esta lección para mantener tu concentración y comprender los conceptos nuevos?',
      promptHint: 'Reflexiona sobre si tomar notas, pausar el código o probar ejemplos te ayuda a procesar mejor la información.',
      keyTakeaway: 'Reconocer tu mejor método de estudio acelera tu ritmo de aprendizaje en cualquier tecnología.'
    },
    {
      id: 2,
      category: 'Generic',
      title: '2. Gestión de Dificultades',
      questionText: '¿En qué momento de la lección sentiste mayor nivel de duda o complejidad, y qué paso diste para resolverlo?',
      promptHint: 'Pensar en cómo superas bloqueos te prepara para resolver errores reales de programación (debugging).',
      keyTakeaway: 'Superar la duda inicial es la habilidad más valiosa de un desarrollador de software.'
    },
    {
      id: 3,
      category: 'Generic',
      title: '3. Conexión de Aprendizajes',
      questionText: '¿Cómo se conecta lo que aprendiste hoy con alguna experiencia previa que ya tenías de lógica o informática?',
      promptHint: 'Buscar analogías entre lo nuevo y lo conocido ayuda a afianzar patrones mentales sólidos.',
      keyTakeaway: 'El conocimiento se construye conectando ideas previas con nuevos conceptos prácticos.'
    },
    {
      id: 4,
      category: 'Generic',
      title: '4. Hábito y Retención',
      questionText: '¿Qué acción o hábito inmediato realizarás hoy para asegurar que no olvides este aprendizaje?',
      promptHint: 'Practicar en código dentro de las próximas 24 horas multiplica tu tasa de retención.',
      keyTakeaway: 'Escribir código real el mismo día del estudio convierte la teoría en memoria de largo plazo.'
    }
  ];
}

export function getMetaQuestionsForLesson(lessonSlug: string): MetaReflectionQuestion[] {
  const base = createBaseGenericQuestions();
  let specific: MetaReflectionQuestion[] = [];

  switch (lessonSlug) {
    case 'introduccion':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Filosofía de Legibilidad',
          questionText: '¿De qué forma influye en tu estudio saber que Python prioriza que el código se lea como texto en inglés?',
          promptHint: 'Piensa en lo rápido que entiendes una línea de código frente a lenguajes con sintaxis más verbosa.',
          keyTakeaway: 'La legibilidad reduce la carga cognitiva al leer y mantener código en equipo.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. La Sangría (Indentación)',
          questionText: '¿Por qué la obligatoriedad de la indentación te ayuda a desarrollar disciplina al estructurar tus bloques?',
          promptHint: 'Visualiza la diferencia entre usar llaves {} arbitrarias y mantener alineaciones limpias de 4 espacios.',
          keyTakeaway: 'La indentación uniforme produce código estructurado y hermoso por naturaleza.'
        }
      ];
      break;

    case 'variables':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Tipado Dinámico vs Estático',
          questionText: '¿Qué ventajas y qué cuidados exige trabajar en un lenguaje de tipado dinámico como Python?',
          promptHint: 'Reflexiona sobre la agilidad de cambiar tipos de variables frente a la necesidad de mantener nombres claros.',
          keyTakeaway: 'El tipado dinámico requiere nombres descriptivos para mantener el código autoexplicativo.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. El Poder de los f-strings',
          questionText: '¿Por qué usar f-strings mejora la legibilidad frente a la concatenación tradicional con el signo `+`?',
          promptHint: 'Compara la claridad visual de escribir f"Hola {nombre}" versus "Hola " + str(nombre).',
          keyTakeaway: 'Los f-strings evitan conversiones manuales y hacen el formateo directo e intuitivo.'
        }
      ];
      break;

    case 'texto-y-conversiones':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Entrada de Datos input()',
          questionText: '¿Cómo cambia tu perspectiva al recordar que la función input() siempre devuelve un str y requiere conversión explícita?',
          promptHint: 'Piensa en los errores tipo TypeError que podrías evitar al validar entradas numéricas con int() o float().',
          keyTakeaway: 'Tratar a input() como texto previene bugs de tipo antes de que ocurran en producción.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Limpieza con .strip() y .lower()',
          questionText: '¿En qué escenarios reales de desarrollo consideras crítico aplicar métodos de limpieza como .strip().lower()?',
          promptHint: 'Piensa en formularios web, bases de datos o campos de contraseña donde los espacios ocultos rompen las comparaciones.',
          keyTakeaway: 'La sanitización de datos con .strip().lower() es una regla de oro en ciberseguridad y backend.'
        }
      ];
      break;

    case 'condicionales':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Decisiones con if...elif...else',
          questionText: '¿Cómo cambia la capacidad de tu código cuando pasas de ejecutar instrucciones lineales a tomar decisiones con condicionales?',
          promptHint: 'Piensa en programas cotidianos como validadores de clave o sistemas de compra que reaccionan a tus decisiones.',
          keyTakeaway: 'Las estructuras condicionales transforman scripts estáticos en software verdaderamente inteligente e interactivo.'
        },
        {
          id: 6,
          category: 'CourseSpecific',
          title: '6. Operadores Lógicos and/or',
          questionText: '¿En qué escenarios reales de desarrollo consideras crítico usar `and` para verificar múltiples requisitos a la vez?',
          promptHint: 'Piensa en formularios de autenticación donde se debe validar nombre de usuario Y contraseña simultáneamente.',
          keyTakeaway: 'Usar and garantiza la integridad de los datos requiriendo el cumplimiento de todos los filtros de seguridad.'
        }
      ];
      break;

    case 'match-case':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Pattern Matching Moderno',
          questionText: '¿En qué situaciones preferirás usar `match...case` sobre una cadena larga de `if...elif`?',
          promptHint: 'Piensa en menús interactivos, códigos de respuesta HTTP o comandos de consola.',
          keyTakeaway: '`match...case` organiza el código como una tabla legible de opciones discretas.'
        }
      ];
      break;

    case 'bucles':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Automatización con Bucles',
          questionText: '¿Cómo cambia tu capacidad como programador al automatizar tareas repetitivas mediante `for` y `while`?',
          promptHint: 'Visualiza la diferencia entre procesar 1.000 registros manualmente versus usar un bucle en 3 líneas de código.',
          keyTakeaway: 'Los bucles son la herramienta principal para escalar la capacidad de cómputo de tus programas.'
        }
      ];
      break;

    case 'listas':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Mutabilidad vs Inmutabilidad',
          questionText: '¿Cuándo optarás por usar una Lista mutable `[ ]` en lugar de una Tupla inmutable `( )`?',
          promptHint: 'Piensa en si los datos van a cambiar dinámicamente o si son constantes fijas (como coordenadas o días).',
          keyTakeaway: 'Elegir la estructura adecuada optimiza la memoria y evita modificaciones accidentales de datos.'
        }
      ];
      break;

    case 'diccionarios':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Acceso Seguro con .get()',
          questionText: '¿Por qué la costumbre de usar `.get()` en diccionarios protege la estabilidad de tus servidores?',
          promptHint: 'Recuerda que consultar una clave inexistente con corchetes lanza `KeyError` y detiene el script.',
          keyTakeaway: 'El acceso seguro con `.get()` previene cierres abruptos por propiedades opcionales faltantes.'
        }
      ];
      break;

    case 'funciones':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Principio DRY (Don\'t Repeat Yourself)',
          questionText: '¿De qué forma dividir tu código en funciones pequeñas te ayuda a evitar la duplicación de lógica?',
          promptHint: 'Piensa en lo fácil que es actualizar un cálculo en un solo lugar en vez de corregirlo en 10 partes del archivo.',
          keyTakeaway: 'Las funciones encapsulan la lógica en componentes reutilizables y fáciles de testear.'
        }
      ];
      break;

    case 'try-except':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Resiliencia del Software',
          questionText: '¿Cómo cambia la experiencia del usuario cuando tu aplicación responde con mensajes amables ante errores en lugar de mostrar un traceback crudo?',
          promptHint: 'Piensa en la diferencia entre ver "Error: Ingresa un número" frente a una pantalla negra llena de texto en inglés.',
          keyTakeaway: 'El manejo de excepciones con `try...except` es la firma de un desarrollador profesional.'
        }
      ];
      break;

    case 'list-comprehension':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Expresividad y Estilo Pythonista',
          questionText: '¿De qué manera List Comprehension resume la filosofía de Python de escribir código conciso y expresivo?',
          promptHint: 'Compara construir una lista vacía y hacer `.append()` en 4 líneas versus una expresión inline limpia.',
          keyTakeaway: 'Adoptar construcciones Pythonistas aumenta la elegibilidad y eficiencia de tu código.'
        }
      ];
      break;

    case 'practica-registros-cine':
    case 'crud-productos-expendedora':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Proyectos Integradores',
          questionText: '¿Qué aprendizaje clave te dejó combinar arreglos, diccionarios, bucles y funciones en un proyecto real de consola?',
          promptHint: 'Reflexiona sobre el proceso de conectar pequeños bloques de conocimiento para construir una app completa.',
          keyTakeaway: 'Construir proyectos integradores consolida el pensamiento computacional.'
        }
      ];
      break;

    case 'poo':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Modelado del Mundo Real',
          questionText: '¿Cómo facilita la POO el diseño de sistemas grandes mediante la creación de Clases y Objetos?',
          promptHint: 'Piensa en cómo agrupas datos (atributos) y acciones (métodos) dentro de una misma entidad.',
          keyTakeaway: 'La POO organiza el software de manera intuitiva imitando la estructura del mundo real.'
        }
      ];
      break;

    case 'modulos':
    case 'entornos-virtuales':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Aislamiento de Entornos',
          questionText: '¿Por qué trabajar con entornos virtuales (`venv`) y `requirements.txt` es indispensable en equipos profesionales?',
          promptHint: 'Piensa en los problemas de versiones cuando múltiples desarrolladores trabajan en el mismo proyecto.',
          keyTakeaway: 'El aislamiento de dependencias asegura la reproducibilidad exacta en cualquier equipo o servidor.'
        }
      ];
      break;

    case 'manejo-archivos':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Persistencia de Datos',
          questionText: '¿Cómo cambia el valor de tus programas al poder guardar y consultar información persistente en archivos de disco?',
          promptHint: 'Piensa en los registros de ventas o usuarios que ahora se conservan al cerrar la consola.',
          keyTakeaway: 'La persistencia en disco es la base para almacenar información duradera.'
        }
      ];
      break;

    case 'seguridad-bandit-sonarqube':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Ciberseguridad y Calidad Industrial',
          questionText: '¿Por qué es indispensable incluir herramientas de análisis estático como Bandit y SonarQube en tus proyectos de software?',
          promptHint: 'Piensa en los riesgos de desplegar código con contraseñas expuestas o fallas de inyección en producción.',
          keyTakeaway: 'El análisis de seguridad automático protege la reputación y los datos de las aplicaciones de software.'
        }
      ];
      break;

    default:
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Aplicación Práctica',
          questionText: '¿Cómo vas a aplicar este concepto en tu próximo script de Python?',
          promptHint: 'Piensa en un pequeño programa o ejercicio donde puedas poner en práctica lo visto hoy.',
          keyTakeaway: 'La práctica activa es el camino más seguro hacia la maestría técnica.'
        }
      ];
      break;
  }

  return [...base, ...specific];
}
