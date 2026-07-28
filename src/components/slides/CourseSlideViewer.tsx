import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { textoYConversionesSlides, type Slide } from '../../data/slides/python/texto-y-conversiones';
import { highlightLine } from '../../lib/codeHighlight';

interface Props {
  courseSlug: string;
  lessonSlug: string;
  courseName?: string;
  lessonTitle?: string;
}

type BarMode = 'visible' | 'autohide' | 'hidden';

interface EmbedParams {
  isEmbed: boolean;
  showMetaQuestions: boolean;
  showQuiz: boolean;
  showPdf: boolean;
  institution: string;
  studentName: string;
  studentEmail: string;
  customLogo: string;
  customIcon: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
}

// 🌐 IDENTIFICADORES ESTÁNDAR EN INGLÉS PARA CADA INTERACCIÓN DE EVALUACIÓN
export type InteractionType =
  | 'TrueFalse'         // Verdadero o Falso (Sí / No)
  | 'MultipleChoice'    // Selección Múltiple
  | 'ReorderSequence'   // Ordenar secuencia de fichas de código
  | 'MatchPairs'        // Unir lista A con lista B
  | 'FillInTheBlank'    // Completar el espacio en blanco en código
  | 'PredictOutput'     // Predecir la salida (print) de un código
  | 'FindTheBug';       // Identificar el error o causa de fallo

export type QuizQuestion =
  | {
      id: number;
      kind: 'TrueFalse';
      title: string;
      questionText: string;
      code?: string;
      correctAnswer: boolean;
      explanation: string;
    }
  | {
      id: number;
      kind: 'MultipleChoice';
      title: string;
      questionText: string;
      code?: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  | {
      id: number;
      kind: 'ReorderSequence';
      title: string;
      questionText: string;
      tokens: string[];
      correctOrder: string[];
      explanation: string;
    }
  | {
      id: number;
      kind: 'MatchPairs';
      title: string;
      questionText: string;
      pairs: { id: string; left: string; right: string }[];
      explanation: string;
    }
  | {
      id: number;
      kind: 'FillInTheBlank';
      title: string;
      questionText: string;
      code: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  | {
      id: number;
      kind: 'PredictOutput';
      title: string;
      questionText: string;
      code: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  | {
      id: number;
      kind: 'FindTheBug';
      title: string;
      questionText: string;
      code: string;
      options: string[];
      correctOption: number;
      explanation: string;
    };

// 🎯 BANCO DE 10 INTERACCIONES EVALUATIVAS DEL QUIZ
const courseQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    kind: 'TrueFalse',
    title: '🧪 Quiz (1/10) · TrueFalse',
    questionText: '¿La función input() en Python siempre devuelve una cadena de texto (str), sin importar lo que el usuario escriba?',
    code: `num = input("Ingresa tu número de identificación: ")\nprint(type(num))  # ¿Es siempre <class 'str'>?`,
    correctAnswer: true,
    explanation: '¡VERDADERO! En Python, input() siempre retorna un str. Para tratar la entrada como entero debes convertirlo explícitamente con int().'
  },
  {
    id: 2,
    kind: 'MultipleChoice',
    title: '🧪 Quiz (2/10) · MultipleChoice',
    questionText: '¿Qué expresión en Python extrae exactamente los primeros 3 caracteres del texto s = "Python"?',
    code: `s = "Python"\nsub = s[ :3 ]  # Queremos obtener "Pyt"`,
    options: ['s[1:3]', 's[:3]', 's[3:]', 's[0,3]'],
    correctOption: 1,
    explanation: '¡CORRECTO! s[:3] toma desde el índice 0 hasta antes del 3 (índices 0, 1 y 2).'
  },
  {
    id: 3,
    kind: 'ReorderSequence',
    title: '🧪 Quiz (3/10) · ReorderSequence',
    questionText: 'Toca los bloques en orden para construir la instrucción de lectura y limpieza de datos:',
    tokens: ['.strip()', 'usuario =', 'input("Usuario: ")', '.lower()'],
    correctOrder: ['usuario =', 'input("Usuario: ")', '.strip()', '.lower()'],
    explanation: '¡EXCELENTE! La secuencia asigna la variable, ejecuta el input y aplica la limpieza en cadena.'
  },
  {
    id: 4,
    kind: 'MatchPairs',
    title: '🧪 Quiz (4/10) · MatchPairs',
    questionText: 'Toca un método de la izquierda y luego su definición correcta a la derecha:',
    pairs: [
      { id: 'p1', left: 'len(s)', right: 'Cuenta el total de caracteres' },
      { id: 'p2', left: '.strip()', right: 'Remueve espacios al inicio y al final' },
      { id: 'p3', left: '.upper()', right: 'Transforma el texto a MAYÚSCULAS' },
      { id: 'p4', left: '.isdigit()', right: 'Verifica si el texto es solo numérico' }
    ],
    explanation: '¡PERFECTO! Has conectado cada método de Python con su función correspondiente.'
  },
  {
    id: 5,
    kind: 'FillInTheBlank',
    title: '🧪 Quiz (5/10) · FillInTheBlank',
    questionText: 'Completa la función requerida para convertir el texto "150" a un número entero:',
    code: `num_txt = "150"\nnum_int = ____(num_txt)  # ¿Qué función convierte a entero?`,
    options: ['int', 'str', 'bool', 'float'],
    correctOption: 0,
    explanation: '¡CORRECTO! int("150") convierte el texto a número entero en Python.'
  },
  {
    id: 6,
    kind: 'PredictOutput',
    title: '🧪 Quiz (6/10) · PredictOutput',
    questionText: '¿Cuál será la salida exacta impresa en consola al ejecutar este código?',
    code: `s = "Café y Código"\nprint(len(s))`,
    options: ['10', '12', '13', '15'],
    correctOption: 2,
    explanation: '¡CORRECTO! len() cuenta letras, tildes y espacios en blanco. "Café y Código" tiene 13 caracteres.'
  },
  {
    id: 7,
    kind: 'FindTheBug',
    title: '🧪 Quiz (7/10) · FindTheBug',
    questionText: '¿Por qué este código genera un error tipo TypeError al ejecutarse?',
    code: `edad = input("Tu edad: ")\ntotal = edad + 10  # ❌ TypeError!`,
    options: [
      'Falta un paréntesis en print',
      'input() devuelve str y no se puede sumar un str con un int',
      'La función input() no existe en Python 3',
      'La variable edad debe escribirse en mayúsculas'
    ],
    correctOption: 1,
    explanation: '¡CORRECTO! Debes convertir la entrada con int(edad) antes de realizar sumas numéricas.'
  },
  {
    id: 8,
    kind: 'TrueFalse',
    title: '🧪 Quiz (8/10) · TrueFalse',
    questionText: '¿Las cadenas en Python son inmutables (ejecutar s.upper() NO modifica la variable original s)?',
    code: `s = "hola"\ns.upper()\n# ¿s sigue siendo "hola"?`,
    correctAnswer: true,
    explanation: '¡VERDADERO! Las cadenas son inmutables. upper() devuelve una nueva cadena y no altera s a menos que la reasignes.'
  },
  {
    id: 9,
    kind: 'ReorderSequence',
    title: '🧪 Quiz (9/10) · ReorderSequence',
    questionText: 'Ordena las fichas para construir un f-string de correo corporativo @cafeycodigo.org:',
    tokens: ['f"{nom[:3]}', '@cafeycodigo.org"', 'correo =', '.{anio}', '}"'],
    correctOrder: ['correo =', 'f"{nom[:3]}', '.{anio}', '@cafeycodigo.org"', '}"'],
    explanation: '¡FANTÁSTICO! Los f-strings permiten interpolar variables y rebanadas (slicing) fácilmente.'
  },
  {
    id: 10,
    kind: 'MatchPairs',
    title: '🧪 Quiz (10/10) · MatchPairs',
    questionText: 'Conecta cada expresión con su resultado de evaluación booleana o tipo de dato:',
    pairs: [
      { id: 'm1', left: 'type("123")', right: "<class 'str'>" },
      { id: 'm2', left: 'type(123)', right: "<class 'int'>" },
      { id: 'm3', left: 'bool("")', right: 'False' },
      { id: 'm4', left: 'bool("hola")', right: 'True' }
    ],
    explanation: '¡EXCELENTE! Dominas los tipos de datos, inspección con type() y evaluación booleana.'
  }
];

// 🧠 ESTRUCTURA DE LAS 8 PREGUNTAS DE METACOGNICIÓN (4 GENÉRICAS + 4 ESPECÍFICAS)
export interface MetaReflectionQuestion {
  id: number;
  category: 'Generic' | 'CourseSpecific';
  title: string;
  questionText: string;
  promptHint: string;
  keyTakeaway: string;
}

const metacognition8Questions: MetaReflectionQuestion[] = [
  // 🌐 4 PREGUNTAS GENÉRICAS A TODOS LOS CURSOS (1 a 4)
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

  // 🐍 4 PREGUNTAS ESPECÍFICAS DEL MÓDULO (Python: Texto y Conversiones - 5 a 8)
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

export default function CourseSlideViewer({
  courseSlug,
  lessonSlug,
  courseName = 'Python',
  lessonTitle = 'Texto y Conversiones',
}: Props) {
  // Parámetros Embed completos
  const [embedParams, setEmbedParams] = useState<EmbedParams>({
    isEmbed: false,
    showMetaQuestions: false,
    showQuiz: false,
    showPdf: false,
    institution: '',
    studentName: '',
    studentEmail: '',
    customLogo: '',
    customIcon: '',
    bgColor: '',
    accentColor: '',
    textColor: '',
  });

  const [barMode, setBarMode] = useState<BarMode>('visible');
  const [isBarVisible, setIsBarVisible] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showOverview, setShowOverview] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Estado hover para el modal de pauta de reflexión en la diapositiva única de metacognición
  const [hoveredMetaId, setHoveredMetaId] = useState<number | null>(null);

  // Respuestas del quiz evaluativo
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const [mcAnswers, setMcAnswers] = useState<Record<number, number>>({});
  const [reorderSelected, setReorderSelected] = useState<Record<number, string[]>>({});
  const [matchSelectedLeft, setMatchSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<number, Record<string, string>>>({});

  // Leer todos los parámetros de URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);

    const isE = sp.get('embed') === 'true' || sp.get('embed') === '1' || sp.get('e') === '1';
    const isMeta = sp.get('metaquestions') === 'true' || sp.get('metaquestions') === '1';
    const isQ = sp.get('quiz') === 'true' || sp.get('quiz') === '1' || sp.get('q') === '1';
    const isP = sp.get('pdf') === 'true' || sp.get('pdf') === '1' || sp.get('p') === '1';

    const inst = sp.get('title') || sp.get('institution') || sp.get('t') || '';
    const sName = sp.get('name') || sp.get('n') || '';
    const sEmail = sp.get('email') || sp.get('m') || '';
    const cLogo = sp.get('logo') || sp.get('l') || '';
    const cIcon = sp.get('icon') || sp.get('emoji') || '';

    const bg = sp.get('bgcolor') || sp.get('background') || sp.get('b') || '';
    const acc = sp.get('color') || sp.get('accent') || sp.get('c') || '';
    const txt = sp.get('text') || sp.get('textcolor') || sp.get('x') || '';

    const thm = sp.get('theme')?.toLowerCase();
    if (thm === 'light') setTheme('light');
    if (thm === 'dark') setTheme('dark');

    setEmbedParams({
      isEmbed: isE,
      showMetaQuestions: isMeta,
      showQuiz: isQ,
      showPdf: isP,
      institution: inst,
      studentName: sName,
      studentEmail: sEmail,
      customLogo: cLogo,
      customIcon: cIcon,
      bgColor: bg ? (bg.startsWith('#') ? bg : `#${bg}`) : '',
      accentColor: acc ? (acc.startsWith('#') ? acc : `#${acc}`) : '',
      textColor: txt ? (txt.startsWith('#') ? txt : `#${txt}`) : '',
    });

    const barParam = sp.get('bar')?.toLowerCase();
    if (barParam === 'false' || barParam === '0' || barParam === 'hidden' || barParam === 'none') {
      setBarMode('hidden');
    } else if (barParam === 'true' || barParam === '1' || barParam === 'autohide' || barParam === 'auto') {
      setBarMode('autohide');
    } else if (barParam === 'visible' || barParam === 'show') {
      setBarMode('visible');
    } else {
      setBarMode('visible');
    }
  }, []);

  // Auto-hide barra inferior
  useEffect(() => {
    if (barMode === 'hidden') {
      setIsBarVisible(false);
      return;
    }
    if (barMode === 'visible') {
      setIsBarVisible(true);
      return;
    }

    let timer: NodeJS.Timeout;
    const handleMouseMove = () => {
      setIsBarVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsBarVisible(false);
      }, 2500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    handleMouseMove();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [barMode]);

  // Cargar diapositivas base
  const baseSlides: Slide[] = useMemo(() => {
    return courseSlug === 'python' && lessonSlug === 'texto-y-conversiones'
      ? textoYConversionesSlides
      : textoYConversionesSlides;
  }, [courseSlug, lessonSlug]);

  // Construir mazo final con 1 sola diapositiva de Metacognición (8 preguntas)
  const slides = useMemo(() => {
    const list: any[] = [...baseSlides];

    if (embedParams.showQuiz) {
      // 1. Portada del Módulo de Quiz
      list.push({
        id: baseSlides.length + 40,
        type: 'quiz_intro',
        title: 'Evaluación Interactiva',
        badge: 'Módulo de Quiz',
      });

      // 2. Diapositivas de las 10 Interacciones Evaluativas
      courseQuizQuestions.forEach((qItem, qIdx) => {
        list.push({
          id: baseSlides.length + 50 + qIdx,
          type: 'quiz_interaction',
          quizIndex: qIdx,
          questionData: qItem,
          badge: `Desafío ${qIdx + 1}/${courseQuizQuestions.length}`
        });
      });

      // 3. Resultados finales del Quiz
      list.push({
        id: baseSlides.length + 90,
        type: 'quiz_results',
        title: '🏆 Resultados de la Evaluación',
        badge: 'Resultados Quiz',
      });
    }

    // 4. Módulo de Metacognición en 1 sola diapositiva con 8 preguntas e interacción hover
    list.push({
      id: baseSlides.length + 300,
      type: 'metacognition_overview',
      title: '🧠 Preguntas de Metacognición y Autoevaluación',
      badge: 'Metacognición (8 Preguntas)',
      questions: metacognition8Questions
    });

    // 5. Diapositiva Final de Cierre
    list.push({
      id: baseSlides.length + 500,
      type: 'cover',
      title: '¡Muchas Gracias! ☕✨',
      subtitle: 'Has completado exitosamente la presentación de esta lección',
      badge: 'Cierre',
      content: '¡Excelente trabajo! Sigue practicando, escribiendo código y creando proyectos increíbles.',
      bulletPoints: [
        '✅ Lección completada en diapositivas',
        '💻 Código preparado para implementar en tus proyectos',
        '🚀 ¡El café y el código nunca se detienen!'
      ]
    });

    return list;
  }, [baseSlides, embedParams.showQuiz]);

  const currentSlide = slides[currentIndex] || slides[0];
  const totalSlides = slides.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalSlides) * 100);

  // Navegación
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
      setShowOverview(false);
    }
  };

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showOverview) {
        if (e.key === 'Escape') setShowOverview(false);
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentIndex(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, showOverview, totalSlides]);

  // Pantalla completa
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Copiar código
  const copyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }).catch(() => {});
  };

  const isDark = theme === 'dark';

  // Puntaje total evaluativo sobre las 10 preguntas del quiz
  const totalQuizScore = useMemo(() => {
    let score = 0;

    courseQuizQuestions.forEach((q, idx) => {
      if (q.kind === 'TrueFalse' && tfAnswers[idx] === q.correctAnswer) {
        score++;
      } else if (
        (q.kind === 'MultipleChoice' || q.kind === 'FillInTheBlank' || q.kind === 'PredictOutput' || q.kind === 'FindTheBug') &&
        mcAnswers[idx] === q.correctOption
      ) {
        score++;
      } else if (q.kind === 'ReorderSequence') {
        const rOrder = reorderSelected[idx] || [];
        if (rOrder.join(' ') === q.correctOrder.join(' ')) score++;
      } else if (q.kind === 'MatchPairs') {
        const matched = matchedPairs[idx] || {};
        if (Object.keys(matched).length === q.pairs.length) score++;
      }
    });

    return score;
  }, [tfAnswers, mcAnswers, reorderSelected, matchedPairs]);

  // Reiniciar todo el quiz
  const resetQuiz = () => {
    setTfAnswers({});
    setMcAnswers({});
    setReorderSelected({});
    setMatchSelectedLeft(null);
    setMatchedPairs({});
    const introQuizIdx = slides.findIndex((s: any) => s.type === 'quiz_intro' || s.type === 'quiz_interaction');
    if (introQuizIdx !== -1) setCurrentIndex(introQuizIdx);
  };

  // 🎨 CONFIGURACIÓN DE COLORES
  // 1. activeTitleColor: Afecta ÚNICAMENTE a los títulos (<h1> ... <h6>)
  // 2. embedParams.bgColor: Afecta ÚNICAMENTE a la barra de encabezado superior (banner)
  const activeAccent = embedParams.accentColor || (isDark ? '#3776ab' : '#2563eb');
  const activeTitleColor = embedParams.textColor || (isDark ? '#f59e0b' : '#0f172a');

  return (
    <div
      className={`h-screen max-h-screen flex flex-col transition-colors duration-300 font-sans select-none relative overflow-hidden ${
        isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* BARRA SUPERIOR DE LA PRESENTACIÓN (BANNER PERSONALIZABLE CON bgcolor) */}
      <header
        className={`px-4 sm:px-6 py-2.5 flex items-center justify-between border-b backdrop-blur-xl sticky top-0 z-30 transition-all shrink-0 ${
          isDark
            ? 'bg-[#0b1329]/90 border-slate-800/80 shadow-md'
            : 'bg-white/95 border-slate-200/90 shadow-sm'
        }`}
        style={{
          backgroundColor: embedParams.bgColor || undefined
        }}
      >
        {/* BLOQUE IZQUIERDO */}
        <div className="flex items-center gap-3 min-w-0">
          {embedParams.customLogo ? (
            <img src={embedParams.customLogo} alt="Logo" className="h-6 w-auto object-contain shrink-0" />
          ) : !embedParams.isEmbed ? (
            <a
              href={`/course/${courseSlug}/${lessonSlug}/`}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border shrink-0 ${
                isDark
                  ? 'bg-slate-800/70 text-slate-300 border-slate-700/70 hover:bg-slate-700 hover:text-white'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Volver al curso"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Volver</span>
            </a>
          ) : null}

          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wide text-white shrink-0 shadow-sm flex items-center gap-1 opacity-90"
            style={{ backgroundColor: activeAccent }}
          >
            {embedParams.customIcon ? <span>{embedParams.customIcon}</span> : null}
            <span>{currentSlide.badge || courseName}</span>
          </span>

          <div className="h-4 w-[1px] bg-slate-700/50 hidden sm:block shrink-0" />

          {/* TÍTULO DE LA BANNER BAR (USA activeTitleColor) */}
          <h1
            className="text-xs sm:text-sm font-bold truncate max-w-[140px] sm:max-w-[240px] md:max-w-[340px] m-0"
            style={{ color: activeTitleColor }}
          >
            {lessonTitle}
          </h1>
        </div>

        {/* BLOQUE DERECHO */}
        <div className="flex items-center gap-2.5 shrink-0">
          {(embedParams.institution || embedParams.studentName) && (
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium backdrop-blur-md ${
              isDark
                ? 'border-slate-700/60 bg-slate-900/60 text-slate-300'
                : 'border-slate-300 bg-white/80 text-slate-700 shadow-sm'
            }`}>
              {embedParams.institution && (
                <span className="flex items-center gap-1 font-semibold">
                  <span>🏫</span>
                  <span>{embedParams.institution}</span>
                </span>
              )}

              {embedParams.institution && embedParams.studentName && (
                <span className="opacity-50 font-bold">•</span>
              )}

              {embedParams.studentName && (
                <span className="flex items-center gap-1">
                  <span>👤</span>
                  <span className="font-semibold text-emerald-500">{embedParams.studentName}</span>
                  {embedParams.studentEmail && (
                    <span className="text-[10px] opacity-75 font-normal">({embedParams.studentEmail})</span>
                  )}
                </span>
              )}
            </div>
          )}

          {embedParams.showPdf && (
            <button
              type="button"
              onClick={() => window.print()}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20 transition-all cursor-pointer flex items-center gap-1"
              title="Exportar a PDF"
            >
              <span>📄</span>
              <span className="hidden sm:inline">PDF</span>
            </button>
          )}

          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-inner ${
            isDark
              ? 'bg-slate-900/80 text-amber-400 border-slate-700/80'
              : 'bg-white text-indigo-600 border-slate-300'
          }`}>
            <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>{currentIndex + 1}</span>
            <span className="opacity-50 font-normal">/</span>
            <span className="opacity-70 font-normal">{totalSlides}</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700/50 hidden sm:block" />

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowOverview(!showOverview)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                showOverview
                  ? 'bg-amber-400/20 text-amber-500 border-amber-400/40'
                  : isDark
                  ? 'bg-slate-800/50 text-slate-300 border-slate-700/60 hover:bg-slate-700/70 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Vista en cuadrícula (Grid)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800/50 text-slate-300 border-slate-700/60 hover:bg-slate-700/70 hover:text-amber-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Cambiar tema"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className={`p-1.5 rounded-lg border hidden sm:flex transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800/50 text-slate-300 border-slate-700/60 hover:bg-slate-700/70 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Pantalla completa"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* BARRA DE PROGRESO DE LA PRESENTACIÓN */}
      <div className="w-full bg-slate-700/30 h-1.5 overflow-hidden shrink-0">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: activeAccent
          }}
        />
      </div>

      {/* LIENZO DE LA DIAPOSITIVA (CONSERVANDO NEUTRALIDAD DE FONDO EN MODO OSCURO Y CLARO) */}
      <main className={`flex-1 flex flex-col items-center justify-center p-3 sm:p-6 max-w-6xl w-full mx-auto relative overflow-hidden ${
        barMode === 'hidden' ? 'pb-3' : 'pb-20'
      }`}>
        <div
          key={currentSlide.id}
          className={`w-full h-full max-h-full rounded-2xl p-5 sm:p-8 border transition-all duration-300 transform shadow-2xl flex flex-col justify-between overflow-hidden ${
            isDark
              ? 'bg-slate-800/90 border-slate-700/80 backdrop-blur-xl text-slate-100 shadow-slate-950/50'
              : 'bg-white/95 border-slate-200/90 backdrop-blur-xl text-slate-900 shadow-slate-300/50'
          }`}
        >
          {/* SLIDE TYPE: COVER */}
          {currentSlide.type === 'cover' && (
            <div className="flex flex-col items-center text-center justify-center py-6 gap-6 my-auto">
              <span
                className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-sm flex items-center gap-1.5"
                style={{ backgroundColor: activeAccent }}
              >
                {embedParams.customIcon ? <span>{embedParams.customIcon}</span> : null}
                <span>{currentSlide.badge}</span>
              </span>
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl"
                style={{ color: activeTitleColor }}
              >
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className={`text-lg sm:text-xl font-medium max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentSlide.subtitle}
                </p>
              )}
              {currentSlide.content && (
                <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentSlide.content}
                </p>
              )}
              {currentSlide.bulletPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full max-w-3xl mt-4">
                  {currentSlide.bulletPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-sm font-semibold flex items-center gap-3 ${
                        isDark
                          ? 'bg-slate-900/60 border-slate-700/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SLIDE TYPE: QUIZ INTRO */}
          {currentSlide.type === 'quiz_intro' && (
            <div className="flex flex-col items-center text-center justify-center py-10 gap-6 my-auto max-w-xl mx-auto">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30">
                🧪 Módulo de Quiz
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight m-0" style={{ color: activeTitleColor }}>
                Evaluación Interactiva
              </h2>

              <p className={`text-base font-medium m-0 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Responde 10 desafíos interactivos diseñados para comprobar tu dominio de Texto y Conversiones en Python.
              </p>

              <button
                type="button"
                onClick={goToNext}
                className="mt-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all cursor-pointer flex items-center gap-2 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: activeAccent }}
              >
                <span>Comenzar Quiz</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* SLIDE TYPE: METACOGNICIÓN COMPLETA EN 1 DIAPOSITIVA (CON POPUP HOVER) */}
          {currentSlide.type === 'metacognition_overview' && (
            <div className="flex flex-col gap-4 my-auto h-full justify-between relative overflow-hidden">
              {/* Header */}
              <div className="border-b pb-2 border-slate-700/40">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    🧠 Metacognición (8 Preguntas)
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Pasa el cursor por cada pregunta para ver la pauta de reflexión 💡
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight m-0 mt-1" style={{ color: activeTitleColor }}>
                  Reflexión sobre lo Aprendido
                </h2>
              </div>

              {/* 2 Columnas de 4 preguntas (Genéricas vs Específicas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-hidden">
                {/* Columna Izquierda: 4 Preguntas Genéricas */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-500 flex items-center gap-1">
                    <span>🌐</span>
                    <span>Preguntas Genéricas del Curso (1 - 4)</span>
                  </span>
                  <div className="flex flex-col gap-2 flex-1 justify-between">
                    {metacognition8Questions.filter(q => q.category === 'Generic').map(q => {
                      const isHovered = hoveredMetaId === q.id;
                      return (
                        <div
                          key={q.id}
                          onMouseEnter={() => setHoveredMetaId(q.id)}
                          onMouseLeave={() => setHoveredMetaId(null)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                            isHovered
                              ? 'bg-indigo-600/30 border-indigo-400 shadow-lg scale-[1.01]'
                              : isDark
                              ? 'bg-slate-900/80 border-slate-700/70 hover:bg-slate-800'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="font-extrabold text-xs text-indigo-500 shrink-0">#{q.id}</span>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold text-indigo-400">{q.title}</span>
                              <p className={`text-xs font-medium leading-snug m-0 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                {q.questionText}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Columna Derecha: 4 Preguntas Específicas */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                    <span>🐍</span>
                    <span>Específicas de esta Lección (5 - 8)</span>
                  </span>
                  <div className="flex flex-col gap-2 flex-1 justify-between">
                    {metacognition8Questions.filter(q => q.category === 'CourseSpecific').map(q => {
                      const isHovered = hoveredMetaId === q.id;
                      return (
                        <div
                          key={q.id}
                          onMouseEnter={() => setHoveredMetaId(q.id)}
                          onMouseLeave={() => setHoveredMetaId(null)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                            isHovered
                              ? 'bg-amber-500/30 border-amber-400 shadow-lg scale-[1.01]'
                              : isDark
                              ? 'bg-slate-900/80 border-slate-700/70 hover:bg-slate-800'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="font-extrabold text-xs text-amber-500 shrink-0">#{q.id}</span>
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold text-amber-500">{q.title}</span>
                              <p className={`text-xs font-medium leading-snug m-0 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                {q.questionText}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* POPUP HOVER / MODAL DE PAUTA DE REFLEXIÓN EN LA PARTE INFERIOR */}
              <div className="min-h-[70px] shrink-0 transition-all">
                {hoveredMetaId ? (() => {
                  const q = metacognition8Questions.find(item => item.id === hoveredMetaId)!;
                  return (
                    <div className={`p-3.5 rounded-xl border shadow-2xl backdrop-blur-xl animate-fade-in flex items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-slate-900/95 border-amber-400/80 text-slate-100'
                        : 'bg-slate-900 text-white border-amber-400/90 shadow-xl'
                    }`}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl shrink-0">💡</span>
                        <div>
                          <span className="block text-xs font-black text-amber-300 uppercase tracking-wider">
                            Pauta de Reflexión #{q.id}:
                          </span>
                          <p className="text-xs font-medium text-slate-200 m-0">
                            {q.promptHint}
                          </p>
                        </div>
                      </div>
                      <div className="border-l border-slate-700 pl-4 shrink-0 hidden sm:block">
                        <span className="block text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                          Valor Metacognitivo:
                        </span>
                        <p className="text-[11px] font-semibold text-emerald-300 m-0 max-w-xs">
                          {q.keyTakeaway}
                        </p>
                      </div>
                    </div>
                  );
                })() : (
                  <div className={`p-3 rounded-xl border border-dashed text-center text-xs italic ${
                    isDark
                      ? 'border-slate-700/80 bg-slate-900/40 text-slate-400'
                      : 'border-slate-300 bg-slate-50 text-slate-500'
                  }`}>
                    💡 Pasa el cursor por cualquiera de las 8 preguntas para descubrir la pauta de reflexión...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: INTERACCIONES DEL QUIZ EVALUATIVO */}
          {currentSlide.type === 'quiz_interaction' && (() => {
            const qData: QuizQuestion = currentSlide.questionData;
            const qIdx = currentSlide.quizIndex;

            return (
              <div className="flex flex-col gap-5 my-auto">
                {/* Header de la Pregunta (Organizado en 2 filas limpias) */}
                <div className="flex flex-col gap-2 border-b pb-3 border-slate-700/40">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30">
                      {qData.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                        isDark ? 'bg-slate-900 text-amber-400 border-slate-700' : 'bg-slate-100 text-amber-600 border-slate-300'
                      }`}>
                        Puntaje: {totalQuizScore} / {courseQuizQuestions.length}
                      </span>
                      <button
                        type="button"
                        onClick={resetQuiz}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                        }`}
                        title="Reiniciar quiz"
                      >
                        🔄 Reiniciar
                      </button>
                    </div>
                  </div>
                  <h2
                    className="text-base sm:text-xl font-extrabold tracking-tight m-0 leading-snug"
                    style={{ color: activeTitleColor }}
                  >
                    {qData.questionText}
                  </h2>
                </div>

                {/* 1. TrueFalse */}
                {qData.kind === 'TrueFalse' && (
                  <div className="flex flex-col gap-4">
                    {qData.code && (
                      <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117]">
                        <pre className="p-3.5 m-0 text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-[#abb2bf]">
                          <code>
                            {qData.code.split('\n').map((line, idx) => (
                              <div key={idx} className="flex">
                                <span className="select-none pr-3 mr-3 text-slate-600 text-right min-w-[1.5rem] border-r border-slate-800 shrink-0">
                                  {idx + 1}
                                </span>
                                <span dangerouslySetInnerHTML={{ __html: highlightLine(line, 'python') }} />
                              </div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {[true, false].map((choice) => {
                        const hasAnswered = tfAnswers[qIdx] !== undefined;
                        const isSelected = tfAnswers[qIdx] === choice;
                        const isCorrect = qData.correctAnswer === choice;

                        let style = isDark
                          ? 'bg-slate-800/90 text-slate-100 border-slate-700 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200';

                        if (hasAnswered) {
                          if (isCorrect) {
                            style = 'bg-emerald-600 text-white border-emerald-400 font-extrabold shadow-lg shadow-emerald-600/30 scale-[1.02]';
                          } else if (isSelected) {
                            style = 'bg-rose-600 text-white border-rose-400 font-extrabold shadow-lg shadow-rose-600/30';
                          } else {
                            style = 'opacity-40 bg-slate-800 text-slate-400 border-slate-800';
                          }
                        }

                        return (
                          <button
                            key={String(choice)}
                            type="button"
                            onClick={() => setTfAnswers(prev => ({ ...prev, [qIdx]: choice }))}
                            className={`p-6 rounded-2xl border-2 font-extrabold text-base sm:text-xl transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${style}`}
                          >
                            <span>{choice ? '✅ VERDADERO (SÍ)' : '❌ FALSO (NO)'}</span>
                          </button>
                        );
                      })}
                    </div>

                    {tfAnswers[qIdx] !== undefined && (
                      <div className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between gap-3 animate-fade-in ${
                        tfAnswers[qIdx] === qData.correctAnswer
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {tfAnswers[qIdx] === qData.correctAnswer ? '🎉' : '💡'}
                          </span>
                          <div>
                            <span className="block font-bold">
                              {tfAnswers[qIdx] === qData.correctAnswer ? '¡Excelente! Respuesta Correcta.' : 'Respuesta Incorrecta.'}
                            </span>
                            <span className="text-xs opacity-90">{qData.explanation}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={goToNext}
                          className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 hover:opacity-90 active:scale-95"
                          style={{ backgroundColor: activeAccent }}
                        >
                          <span>Continuar</span>
                          <span>→</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 2, 5, 6, 7. MultipleChoice / FillInTheBlank / PredictOutput / FindTheBug */}
                {(qData.kind === 'MultipleChoice' || qData.kind === 'FillInTheBlank' || qData.kind === 'PredictOutput' || qData.kind === 'FindTheBug') && (
                  <div className="flex flex-col gap-4">
                    {qData.code && (
                      <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117]">
                        <pre className="p-3.5 m-0 text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-[#abb2bf]">
                          <code>
                            {qData.code.split('\n').map((line, idx) => (
                              <div key={idx} className="flex">
                                <span className="select-none pr-3 mr-3 text-slate-600 text-right min-w-[1.5rem] border-r border-slate-800 shrink-0">
                                  {idx + 1}
                                </span>
                                <span dangerouslySetInnerHTML={{ __html: highlightLine(line, 'python') }} />
                              </div>
                            ))}
                          </code>
                        </pre>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {qData.options.map((opt, oIdx) => {
                        const hasAnswered = mcAnswers[qIdx] !== undefined;
                        const isSelected = mcAnswers[qIdx] === oIdx;
                        const isCorrect = qData.correctOption === oIdx;

                        let style = isDark
                          ? 'bg-slate-800/90 text-slate-100 border-slate-700 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200';

                        if (hasAnswered) {
                          if (isCorrect) {
                            style = 'bg-emerald-600 text-white border-emerald-400 font-extrabold shadow-lg shadow-emerald-600/30 scale-[1.01]';
                          } else if (isSelected) {
                            style = 'bg-rose-600 text-white border-rose-400 font-extrabold shadow-lg shadow-rose-600/30';
                          } else {
                            style = 'opacity-40 bg-slate-800 text-slate-400 border-slate-800';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => setMcAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                            className={`p-4 rounded-xl border font-bold text-sm sm:text-base text-left transition-all flex items-center justify-between cursor-pointer ${style}`}
                          >
                            <span>{opt}</span>
                            {hasAnswered && isCorrect && <span>✓</span>}
                            {hasAnswered && isSelected && !isCorrect && <span>✕</span>}
                          </button>
                        );
                      })}
                    </div>

                    {mcAnswers[qIdx] !== undefined && (
                      <div className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between gap-3 animate-fade-in ${
                        mcAnswers[qIdx] === qData.correctOption
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {mcAnswers[qIdx] === qData.correctOption ? '🎉' : '💡'}
                          </span>
                          <div>
                            <span className="block font-bold">
                              {mcAnswers[qIdx] === qData.correctOption ? '¡Excelente! Respuesta Correcta.' : 'Respuesta Incorrecta.'}
                            </span>
                            <span className="text-xs opacity-90">{qData.explanation}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={goToNext}
                          className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 hover:opacity-90 active:scale-95"
                          style={{ backgroundColor: activeAccent }}
                        >
                          <span>Continuar</span>
                          <span>→</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3, 9. ReorderSequence */}
                {qData.kind === 'ReorderSequence' && (() => {
                  const currentSelected = reorderSelected[qIdx] || [];
                  const isSubmitted = currentSelected.length === qData.tokens.length;
                  const isCorrectOrder = currentSelected.join(' ') === qData.correctOrder.join(' ');

                  const handleAddToken = (token: string) => {
                    if (currentSelected.includes(token)) return;
                    setReorderSelected(prev => ({
                      ...prev,
                      [qIdx]: [...currentSelected, token]
                    }));
                  };

                  const handleRemoveToken = (token: string) => {
                    setReorderSelected(prev => ({
                      ...prev,
                      [qIdx]: currentSelected.filter(t => t !== token)
                    }));
                  };

                  return (
                    <div className="flex flex-col gap-4">
                      <div className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex items-center gap-2 flex-wrap ${
                        isDark ? 'border-slate-700 bg-slate-900/90' : 'border-slate-300 bg-slate-100'
                      }`}>
                        {currentSelected.length === 0 ? (
                          <span className="text-slate-500 text-xs italic">
                            Toca las fichas de abajo para construir la instrucción aquí...
                          </span>
                        ) : (
                          currentSelected.map((token, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleRemoveToken(token)}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono text-sm font-bold shadow-md hover:bg-indigo-500 cursor-pointer flex items-center gap-1"
                            >
                              <span>{token}</span>
                              <span className="text-xs opacity-75">✕</span>
                            </button>
                          ))
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {qData.tokens.map((token, idx) => {
                          const isUsed = currentSelected.includes(token);
                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={isUsed}
                              onClick={() => handleAddToken(token)}
                              className={`px-4 py-2 rounded-xl font-mono text-sm font-bold border transition-all cursor-pointer ${
                                isUsed
                                  ? 'opacity-30 bg-slate-800 text-slate-500 border-slate-800'
                                  : isDark
                                  ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700 hover:scale-105'
                                  : 'bg-white text-indigo-700 border-slate-300 hover:bg-slate-100 hover:scale-105 shadow-sm'
                              }`}
                            >
                              {token}
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className={`p-3.5 rounded-xl border text-sm font-semibold flex items-center justify-between gap-3 animate-fade-in ${
                          isCorrectOrder
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{isCorrectOrder ? '🎉' : '💡'}</span>
                            <div>
                              <span className="block font-bold">
                                {isCorrectOrder ? '¡Fantástico! Secuencia Ordenada Correctamente.' : 'Secuencia Incorrecta.'}
                              </span>
                              <span className="text-xs opacity-90">{qData.explanation}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={goToNext}
                            className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: activeAccent }}
                          >
                            <span>Continuar</span>
                            <span>→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* 4, 10. MatchPairs */}
                {qData.kind === 'MatchPairs' && (() => {
                  const leftItems = qData.pairs.map(p => ({ id: p.id, text: p.left }));
                  const rightItems = qData.pairs.map(p => ({ id: p.id, text: p.right }));
                  const currentMatched = matchedPairs[qIdx] || {};

                  const handleLeftClick = (id: string) => {
                    setMatchSelectedLeft(id);
                  };

                  const handleRightClick = (id: string) => {
                    if (!matchSelectedLeft) return;
                    if (matchSelectedLeft === id) {
                      setMatchedPairs(prev => ({
                        ...prev,
                        [qIdx]: { ...(prev[qIdx] || {}), [id]: id }
                      }));
                      setMatchSelectedLeft(null);
                    } else {
                      setMatchSelectedLeft(null);
                    }
                  };

                  const isComplete = Object.keys(currentMatched).length === qData.pairs.length;

                  return (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Columna A */}
                        <div className="flex flex-col gap-2">
                          <h3 className={`text-xs font-bold uppercase tracking-wider m-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Expresión / Método
                          </h3>
                          {leftItems.map((item) => {
                            const isMatched = currentMatched[item.id] !== undefined;
                            const isSelected = matchSelectedLeft === item.id;

                            let style = isDark
                              ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700'
                              : 'bg-slate-100 text-indigo-700 border-slate-300 hover:bg-slate-200';
                            if (isMatched) {
                              style = 'bg-emerald-600/90 text-white border-emerald-400 font-extrabold';
                            } else if (isSelected) {
                              style = 'bg-indigo-600 text-white border-indigo-400 font-extrabold ring-2 ring-indigo-400/50 scale-[1.02]';
                            }

                            return (
                              <button
                                key={item.id}
                                type="button"
                                disabled={isMatched}
                                onClick={() => handleLeftClick(item.id)}
                                className={`p-3 rounded-xl border text-xs sm:text-sm font-mono font-bold text-left transition-all cursor-pointer flex items-center justify-between ${style}`}
                              >
                                <span>{item.text}</span>
                                {isMatched && <span>✓</span>}
                              </button>
                            );
                          })}
                        </div>

                        {/* Columna B */}
                        <div className="flex flex-col gap-2">
                          <h3 className={`text-xs font-bold uppercase tracking-wider m-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Definición / Resultado
                          </h3>
                          {rightItems.map((item) => {
                            const isMatched = currentMatched[item.id] !== undefined;

                            let style = isDark
                              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                              : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200';
                            if (isMatched) {
                              style = 'bg-emerald-600/90 text-white border-emerald-400 font-extrabold';
                            }

                            return (
                              <button
                                key={item.id}
                                type="button"
                                disabled={isMatched}
                                onClick={() => handleRightClick(item.id)}
                                className={`p-3 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer flex items-center justify-between ${style}`}
                              >
                                <span>{item.text}</span>
                                {isMatched && <span>✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {isComplete && (
                        <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-600 text-sm font-semibold flex items-center justify-between gap-3 animate-fade-in">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🎉</span>
                            <div>
                              <span className="block font-bold">¡Excelente Trabajo! Coincidencias completas.</span>
                              <span className="text-xs opacity-90">{qData.explanation}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={goToNext}
                            className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white shadow-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: activeAccent }}
                          >
                            <span>Continuar</span>
                            <span>→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })()}

          {/* SLIDE TYPE: RESULTADOS DEL QUIZ */}
          {currentSlide.type === 'quiz_results' && (
            <div className="flex flex-col items-center text-center justify-center py-6 gap-6 my-auto">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-500 border border-amber-400/30">
                Resultados de la Evaluación (10 Desafíos)
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: activeTitleColor }}>
                🏆 Puntaje Final: {totalQuizScore} / {courseQuizQuestions.length}
              </h2>

              <p className={`text-lg sm:text-xl font-medium max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {totalQuizScore === courseQuizQuestions.length
                  ? '🥇 ¡Puntaje Perfecto! Dominas al 100% el manejo de texto, tipos y conversiones en Python.'
                  : totalQuizScore >= 7
                  ? '🥈 ¡Excelente trabajo! Demuestras una gran comprensión de los conceptos clave.'
                  : '🥉 ¡Buen intento! Repasa las diapositivas anteriores para consolidar tus conocimientos.'}
              </p>

              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="px-6 py-3 rounded-xl border border-amber-500/40 bg-amber-500/20 text-amber-500 font-extrabold text-sm hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  <span>🔄</span>
                  <span>Reiniciar Evaluación</span>
                </button>
              </div>
            </div>
          )}

          {/* SLIDE TYPES: CONCEPT, CODE, DIAGRAM, PROJECT, SUMMARY */}
          {currentSlide.type !== 'cover' && currentSlide.type !== 'quiz_intro' && currentSlide.type !== 'quiz_interaction' && currentSlide.type !== 'metacognition_overview' && currentSlide.type !== 'quiz_results' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-700/40">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider text-white"
                      style={{ backgroundColor: activeAccent }}
                    >
                      {embedParams.customIcon ? <span>{embedParams.customIcon} </span> : null}
                      {currentSlide.badge || 'Lección'}
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Diapositiva #{currentIndex + 1}
                    </span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight m-0"
                    style={{ color: activeTitleColor }}
                  >
                    {currentSlide.title}
                  </h2>
                </div>

                {currentSlide.codeSnippet && (
                  <button
                    type="button"
                    onClick={() => copyCode(currentSlide.codeSnippet!.code)}
                    className={`self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-all ${
                      copiedCode
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : isDark
                        ? 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {copiedCode ? '✓ Copiado' : '📋 Copiar Código'}
                  </button>
                )}
              </div>

              {currentSlide.content && (
                <p className={`text-base sm:text-lg leading-relaxed font-medium m-0 ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {currentSlide.content}
                </p>
              )}

              <div className={`grid grid-cols-1 ${currentSlide.codeSnippet || currentSlide.visualChart ? 'lg:grid-cols-2' : ''} gap-6 items-start`}>
                
                {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className={`text-xs font-extrabold uppercase tracking-wider m-0 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Puntos Clave:
                    </h3>
                    <ul className="space-y-2.5 m-0 p-0 list-none">
                      {currentSlide.bulletPoints.map((bullet, idx) => (
                        <li
                          key={idx}
                          className={`p-3 rounded-xl border text-sm font-semibold flex items-start gap-3 transition-all ${
                            isDark
                              ? 'bg-slate-900/70 border-slate-700/60 text-slate-200'
                              : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <span className="font-extrabold shrink-0 mt-0.5" style={{ color: activeAccent }}>🔹</span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentSlide.codeSnippet && (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117] shadow-xl">
                      <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                          <span className="ml-2 font-bold text-slate-300">{currentSlide.codeSnippet.filename}</span>
                        </span>
                        <span
                          className="uppercase text-[10px] px-2 py-0.5 rounded text-white font-bold"
                          style={{ backgroundColor: activeAccent }}
                        >
                          {currentSlide.codeSnippet.lang}
                        </span>
                      </div>
                      <pre className="p-4 m-0 overflow-x-auto overflow-y-auto max-h-[220px] sm:max-h-[260px] text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-[#abb2bf]">
                        <code>
                          {currentSlide.codeSnippet.code.split('\n').map((line, idx) => (
                            <div key={idx} className="flex leading-relaxed">
                              <span className="select-none pr-3 mr-3 text-slate-600 text-right min-w-[1.8rem] border-r border-slate-800 shrink-0">
                                {idx + 1}
                              </span>
                              <span
                                className="whitespace-pre"
                                dangerouslySetInnerHTML={{
                                  __html: highlightLine(line === '' ? ' ' : line, currentSlide.codeSnippet?.lang || 'python'),
                                }}
                              />
                            </div>
                          ))}
                        </code>
                      </pre>
                    </div>
                    {currentSlide.codeSnippet.explanation && (
                      <p className={`text-xs font-medium italic m-0 px-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        💬 {currentSlide.codeSnippet.explanation}
                      </p>
                    )}
                  </div>
                )}

                {currentSlide.visualChart && (
                  <div className="flex flex-col gap-2 w-full">
                    <h3 className={`text-xs font-extrabold uppercase tracking-wider m-0 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Diagrama de Memoria e Índices:
                    </h3>
                    <div className={`overflow-x-auto rounded-xl border p-4 ${
                      isDark ? 'border-slate-700/80 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
                    }`}>
                      <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                        <thead>
                          <tr className="border-b border-slate-700/60" style={{ color: activeAccent }}>
                            {currentSlide.visualChart.headers.map((h, i) => (
                              <th key={i} className="p-2 font-bold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentSlide.visualChart.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-slate-700/40 last:border-0">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-2 ${
                                    cIdx === 0
                                      ? 'font-bold text-indigo-500 text-left'
                                      : isDark
                                      ? 'bg-slate-800/50 rounded font-bold text-slate-200'
                                      : 'bg-white rounded font-bold text-slate-800 shadow-xs'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              {currentSlide.keyTakeaway && (
                <div className={`p-4 rounded-xl border font-bold text-sm flex items-center gap-3 mt-auto ${
                  isDark
                    ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900'
                }`}>
                  <span className="text-lg">💡</span>
                  <span>{currentSlide.keyTakeaway}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* BARRA INFERIOR DE NAVEGACIÓN */}
      {barMode !== 'hidden' && (
        <footer
          className={`px-6 py-4 flex items-center justify-between border-t backdrop-blur-md fixed bottom-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out ${
            isDark
              ? 'bg-[#1e293b]/90 border-slate-700/60'
              : 'bg-white/90 border-slate-200 shadow-lg'
          } ${
            barMode === 'autohide' && !isBarVisible
              ? 'opacity-0 translate-y-full pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            type="button"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-700 text-slate-500'
                : isDark
                ? 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700 active:scale-95'
                : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 active:scale-95'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Anterior</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-7 bg-amber-400 shadow-sm'
                    : isDark
                    ? 'w-2.5 bg-slate-700 hover:bg-slate-600'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Diapositiva ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            disabled={currentIndex === totalSlides - 1}
            className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border text-white shadow-lg active:scale-95 cursor-pointer"
            style={{ backgroundColor: activeAccent, borderColor: activeAccent }}
          >
            <span>Siguiente</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </footer>
      )}

      {/* MODAL: VISTA DE DIAPOSITIVAS (OVERVIEW GRID) */}
      {showOverview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
          <div className="flex items-center justify-between max-w-6xl w-full mx-auto mb-6">
            <div>
              <h3 className="text-xl font-extrabold text-amber-400 m-0">
                Vista General de Diapositivas
              </h3>
              <p className="text-xs text-slate-400 m-0">
                Selecciona cualquier diapositiva para saltar directamente a ella.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowOverview(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-700 text-sm cursor-pointer"
            >
              ✕ Cerrar (Esc)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full mx-auto flex-1">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-102 cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
                style={{ minHeight: '140px' }}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span>#{idx + 1}</span>
                    <span className="uppercase text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">
                      {slide.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold line-clamp-2 text-slate-100 m-0">
                    {slide.title}
                  </h4>
                </div>
                {slide.keyTakeaway && (
                  <p className="text-[10px] text-amber-300 font-medium line-clamp-1 m-0 mt-2">
                    {slide.keyTakeaway}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
