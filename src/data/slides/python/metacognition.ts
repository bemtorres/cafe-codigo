import type { MetaReflectionQuestion } from '../../../types/slides';

export type { MetaReflectionQuestion };

// 🧠 METACOGNICIÓN 1: TEXTO Y CONVERSIONES
export const textoYConversionesMeta: MetaReflectionQuestion[] = [
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
  },
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
    title: '6. Limpieza .strip().lower()',
    questionText: '¿En qué escenarios reales de desarrollo consideras crítico aplicar métodos de limpieza como .strip().lower()?',
    promptHint: 'Piensa en formularios web, bases de datos o campos de contraseña donde los espacios ocultos rompen las comparaciones.',
    keyTakeaway: 'La sanitización de datos con .strip().lower() es una regla de oro en ciberseguridad y backend.'
  },
  {
    id: 7,
    category: 'CourseSpecific',
    title: '7. Rebanadas e Índices [:3]',
    questionText: '¿Por qué la notación de slicing [:3] o los índices negativos [-1] facilitan la manipulación de texto en comparación a otros lenguajes?',
    promptHint: 'Recuerda que no necesitas calcular len(s) - 1 para obtener la última letra de una variable de texto.',
    keyTakeaway: 'La sintaxis de slicing en Python ahorra código y aumenta la legibilidad de tus programas.'
  },
  {
    id: 8,
    category: 'CourseSpecific',
    title: '8. Proyectos Reales',
    questionText: '¿Qué script o proyecto personal te gustaría construir aplicando str, int, bool, slicing y el generador de correos?',
    promptHint: 'Crear herramientas útiles como formateadores de RUT, sanitizadores de nombres o analizadores de frases.',
    keyTakeaway: '¡Crear tus propios proyectos personales es el paso final para dominar Python!'
  }
];

// 🧠 METACOGNICIÓN 2: CONDICIONALES
export const condicionalesMeta: MetaReflectionQuestion[] = [
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
  },
  {
    id: 5,
    category: 'CourseSpecific',
    title: '5. Control de Flujo if/else',
    questionText: '¿Cómo cambia la capacidad de tu código cuando pasas de ejecutar instrucciones lineales a tomar decisiones con if/else?',
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
  },
  {
    id: 7,
    category: 'CourseSpecific',
    title: '7. Cascada de elif',
    questionText: '¿Por qué el orden en que colocas las condiciones dentro de una cadena `if...elif...else` puede cambiar drásticamente el resultado?',
    promptHint: 'Recuerda que Python ejecuta el primer bloque True y omite el resto, por lo que las condiciones específicas van primero.',
    keyTakeaway: 'Ordenar las condiciones de lo más específico a lo más general evita falsos positivos en tu lógica.'
  },
  {
    id: 8,
    category: 'CourseSpecific',
    title: '8. Debbuging de Indentación',
    questionText: '¿Qué hábito de escritura en tu editor prevendrá errores de `IndentationError` cuando comiences a anidar condicionales?',
    promptHint: 'Configurar 4 espacios por tabulación y mantener la alineación visual clara con los dos puntos `:`',
    keyTakeaway: 'La disciplina con la indentación no solo evita errores en Python, sino que hace tu código hermoso de leer.'
  }
];

export function getMetaQuestionsForLesson(lessonSlug: string): MetaReflectionQuestion[] {
  switch (lessonSlug) {
    case 'condicionales': return condicionalesMeta;
    case 'texto-y-conversiones': return textoYConversionesMeta;
    default: return condicionalesMeta;
  }
}
