import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  CourseSlideProps as Props,
  BarMode,
  EmbedParams,
  Slide,
  QuizQuestion,
} from '../../types/slides';
import {
  getSlidesForLesson,
  getQuizForLesson,
  getMetaQuestionsForLesson,
} from '../../data/slides/python/registry';
import { highlightLine } from '../../lib/codeHighlight';


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
    showQuiz: true,
    institution: '',
    studentName: '',
    studentEmail: '',
    customLogo: '',
    customIcon: '',
    bgColor: '',
    accentColor: '',
    textColor: '',
    timerSeconds: 300,
  });

  const [barMode, setBarMode] = useState<BarMode>('visible');
  const [isBarVisible, setIsBarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showOverview, setShowOverview] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Estados del Menú de Herramientas y Temporizador FLOTANTE Y MOVIBLE
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSize, setTimerSize] = useState<'s' | 'm' | 'l' | 'xl'>('m');
  const [timerPos, setTimerPos] = useState({ x: 20, y: 80 });
  const [isDraggingTimer, setIsDraggingTimer] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Estado del Swipe táctil en móviles
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Estado hover para la pauta de reflexión en la diapositiva de metacognición
  const [hoveredMetaId, setHoveredMetaId] = useState<number | null>(null);

  // Respuestas del quiz evaluativo
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const [mcAnswers, setMcAnswers] = useState<Record<number, number>>({});
  const [reorderSelected, setReorderSelected] = useState<Record<number, string[]>>({});
  const [matchSelectedLeft, setMatchSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<number, Record<string, string>>>({});

  // Detección dinámica de pantalla móvil
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Leer todos los parámetros de URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);

    const isE = sp.get('embed') === 'true' || sp.get('embed') === '1' || sp.get('e') === '1';
    const isMeta = sp.get('metaquestions') === 'true' || sp.get('metaquestions') === '1';

    const quizRaw = sp.get('quiz')?.toLowerCase() || sp.get('q')?.toLowerCase();
    let isQ = true; // Por defecto el quiz ESTÁ ACTIVADO
    if (quizRaw === 'false' || quizRaw === '0' || quizRaw === 'off' || quizRaw === 'no') {
      isQ = false;
    }

    const inst = sp.get('title') || sp.get('institution') || sp.get('t') || '';
    const sName = sp.get('name') || sp.get('n') || '';
    const sEmail = sp.get('email') || sp.get('m') || '';
    const cLogo = sp.get('logo') || sp.get('institutionLogo') || sp.get('logourl') || sp.get('l') || '';
    const cIcon = sp.get('icon') || sp.get('emoji') || '';

    const bg = sp.get('bgcolor') || sp.get('background') || sp.get('b') || '';
    const acc = sp.get('color') || sp.get('accent') || sp.get('c') || '';
    const txt = sp.get('text') || sp.get('textcolor') || sp.get('x') || '';

    const tmParam = sp.get('timer') || sp.get('time') || '';
    if (tmParam) {
      let parsedSecs = 300;
      if (!isNaN(Number(tmParam)) && Number(tmParam) > 0) parsedSecs = Number(tmParam);
      setTimerSeconds(parsedSecs);
      setIsTimerActive(true);
    }

    const thm = sp.get('theme')?.toLowerCase();
    if (thm === 'light') setTheme('light');
    if (thm === 'dark') setTheme('dark');

    setEmbedParams({
      isEmbed: isE,
      showMetaQuestions: isMeta,
      showQuiz: isQ,
      institution: inst,
      studentName: sName,
      studentEmail: sEmail,
      customLogo: cLogo,
      customIcon: cIcon,
      bgColor: bg ? (bg.startsWith('#') ? bg : `#${bg}`) : '',
      accentColor: acc ? (acc.startsWith('#') ? acc : `#${acc}`) : '',
      textColor: txt ? (txt.startsWith('#') ? txt : `#${txt}`) : '',
      timerSeconds: 300
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

  // 🔔 SONIDO Y VIBRACIÓN AL FINALIZAR EL TEMPORIZADOR (00:00)
  const triggerTimerEndAlert = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playBeep = (freq: number, delay: number, duration: number) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + duration);
        }, delay);
      };

      playBeep(523.25, 0, 0.2);   // C5
      playBeep(659.25, 200, 0.2); // E5
      playBeep(783.99, 400, 0.2); // G5
      playBeep(1046.50, 600, 0.6); // C6
    } catch (err) {
      console.error('AudioContext error', err);
    }

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  }, []);

  // Efecto del Temporizador Regresivo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (isTimerActive && isTimerRunning && timerSeconds === 0) {
      setIsTimerRunning(false);
      triggerTimerEndAlert();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isTimerRunning, timerSeconds, triggerTimerEndAlert]);

  // Formato mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handlers para ARRASTRAR el reloj temporizador por la pantalla
  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDraggingTimer(true);
    setDragStart({ x: clientX - timerPos.x, y: clientY - timerPos.y });
  };

  const handleDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingTimer) return;
    const newX = Math.max(10, Math.min(window.innerWidth - 200, clientX - dragStart.x));
    const newY = Math.max(10, Math.min(window.innerHeight - 150, clientY - dragStart.y));
    setTimerPos({ x: newX, y: newY });
  }, [isDraggingTimer, dragStart]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onUp = () => setIsDraggingTimer(false);

    if (isDraggingTimer) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDraggingTimer, handleDragMove]);

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

  // Cargar diapositivas base según la lección actual
  const baseSlides: Slide[] = useMemo(() => {
    return getSlidesForLesson(lessonSlug);
  }, [lessonSlug]);

  // Cargar banco de preguntas del Quiz según la lección actual
  const activeQuizQuestions = useMemo(() => {
    return getQuizForLesson(lessonSlug);
  }, [lessonSlug]);

  // Cargar banco de Metacognición según la lección actual
  const activeMetaQuestions = useMemo(() => {
    return getMetaQuestionsForLesson(lessonSlug);
  }, [lessonSlug]);

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
      activeQuizQuestions.forEach((qItem, qIdx) => {
        list.push({
          id: baseSlides.length + 50 + qIdx,
          type: 'quiz_interaction',
          quizIndex: qIdx,
          questionData: qItem,
          badge: `Desafío ${qIdx + 1}/${activeQuizQuestions.length}`
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
      questions: activeMetaQuestions
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
  }, [baseSlides, embedParams.showQuiz, activeQuizQuestions, activeMetaQuestions]);

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

  // Handlers de Deslizamiento Táctil en Móviles (Swipe Left/Right)
  const handleTouchStartSlide = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEndSlide = (e: React.TouchEvent) => {
    if (touchStartX === null || e.changedTouches.length === 0) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTouchStartX(null);
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

  // 🔊 Lectura en voz alta (Text-to-Speech)
  const speakCurrentSlide = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${currentSlide.title}. ${currentSlide.content || ''}. ${
      currentSlide.bulletPoints ? currentSlide.bulletPoints.join('. ') : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const isDark = theme === 'dark';

  // Puntaje total evaluativo sobre las 10 preguntas del quiz
  const totalQuizScore = useMemo(() => {
    let score = 0;

    activeQuizQuestions.forEach((q, idx) => {
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
  }, [tfAnswers, mcAnswers, reorderSelected, matchedPairs, activeQuizQuestions]);

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
  const activeAccent = embedParams.accentColor || (isDark ? '#3776ab' : '#2563eb');
  const activeTitleColor = embedParams.textColor || (isDark ? '#f59e0b' : '#0f172a');

  // Estilos de Escala de Tamaño (S, M, L, XL) del reloj flotante
  const timerScaleClasses = {
    s: 'text-xs p-2 gap-1.5 min-w-[120px]',
    m: 'text-base p-3 gap-2 min-w-[160px]',
    l: 'text-2xl p-4 gap-3 min-w-[220px]',
    xl: 'text-4xl p-6 gap-4 min-w-[300px]'
  };

  // 🎯 LÓGICA RESPONSIVA DE NAVEGACIÓN EN MÓVIL vs QUIZ
  const isQuizInteraction = currentSlide.type === 'quiz_interaction';
  const shouldShowNavFooter = !isQuizInteraction && (isMobile || barMode !== 'hidden');

  return (
    <div
      className={`h-screen max-h-screen flex flex-col transition-colors duration-300 font-sans select-none relative overflow-hidden ${
        isDark ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* ⏱️ WIDGET FLOTANTE MOVIBLE DE TEMPORIZADOR REGRESIVO */}
      {isTimerActive && (
        <div
          style={{ left: `${timerPos.x}px`, top: `${timerPos.y}px` }}
          className={`fixed z-50 rounded-2xl border-2 shadow-2xl backdrop-blur-2xl flex flex-col transition-all cursor-move select-none ${
            timerSeconds === 0
              ? 'bg-rose-950/95 border-rose-500 text-rose-200 animate-bounce'
              : isDark
              ? 'bg-slate-900/95 border-amber-400/80 text-amber-300 shadow-slate-950/80'
              : 'bg-slate-900/95 border-amber-400 text-white shadow-xl'
          } ${timerScaleClasses[timerSize]}`}
          onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
          }}
        >
          {/* Header del Widget Flotante */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1 cursor-grab active:cursor-grabbing">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center gap-1">
              <span>🖐️</span>
              <span>Arrastrar</span>
            </span>

            {/* Selector de Escala de Tamaño: S | M | L | XL */}
            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-lg border border-white/10">
              {(['s', 'm', 'l', 'xl'] as const).map(sz => (
                <button
                  key={sz}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimerSize(sz);
                  }}
                  className={`px-1 rounded text-[9px] font-extrabold uppercase transition-all ${
                    timerSize === sz ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsTimerActive(false);
                setIsTimerRunning(false);
              }}
              className="text-slate-400 hover:text-white font-black text-xs px-1 cursor-pointer"
              title="Cerrar temporizador"
            >
              ✕
            </button>
          </div>

          {/* Reloj Digital Gigante */}
          <div className="flex items-center justify-between gap-3 my-1">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span className="font-mono font-black tracking-tight">{formatTime(timerSeconds)}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="px-2 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition-all cursor-pointer shadow"
              >
                {isTimerRunning ? '⏸️' : '▶️'}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTimerSeconds(300);
                  setIsTimerRunning(false);
                }}
                className="px-2 py-1 rounded-lg bg-white/10 text-white font-extrabold text-xs hover:bg-white/20 transition-all cursor-pointer"
                title="Reiniciar a 5 min"
              >
                🔄
              </button>
            </div>
          </div>

          {timerSeconds === 0 && (
            <span className="text-[10px] font-black uppercase text-center text-rose-300 animate-pulse">
              🔔 ¡Tiempo completado! 📳
            </span>
          )}
        </div>
      )}

      {/* BARRA SUPERIOR DE LA PRESENTACIÓN */}
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
            <img
              src={embedParams.customLogo}
              alt={embedParams.institution || 'Logo Institución'}
              className="h-6 w-auto max-w-[120px] object-contain shrink-0 rounded"
            />
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

          {/* TÍTULO DE LA BANNER BAR */}
          <h1
            className="text-xs sm:text-sm font-bold truncate max-w-[140px] sm:max-w-[240px] md:max-w-[340px] m-0"
            style={{ color: activeTitleColor }}
          >
            {lessonTitle}
          </h1>
        </div>

        {/* BLOQUE DERECHO (HERRAMIENTAS + PERFIL) */}
        <div className="flex items-center gap-2 shrink-0">
          {(embedParams.institution || embedParams.studentName || embedParams.customLogo) && (
            <div className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium backdrop-blur-md ${
              isDark
                ? 'border-slate-700/60 bg-slate-900/60 text-slate-300'
                : 'border-slate-300 bg-white/80 text-slate-700 shadow-sm'
            }`}>
              {(embedParams.institution || embedParams.customLogo) && (
                <span className="flex items-center gap-1.5 font-semibold">
                  {embedParams.customLogo ? (
                    <img
                      src={embedParams.customLogo}
                      alt={embedParams.institution || 'Logo'}
                      className="h-4 w-auto max-w-[70px] object-contain shrink-0"
                    />
                  ) : (
                    <span>🏫</span>
                  )}
                  {embedParams.institution && <span>{embedParams.institution}</span>}
                </span>
              )}

              {(embedParams.institution || embedParams.customLogo) && embedParams.studentName && (
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

          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border shadow-inner ${
            isDark
              ? 'bg-slate-900/80 text-amber-400 border-slate-700/80'
              : 'bg-white text-indigo-600 border-slate-300'
          }`}>
            <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>{currentIndex + 1}</span>
            <span className="opacity-50 font-normal">/</span>
            <span className="opacity-70 font-normal">{totalSlides}</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700/50 hidden sm:block" />

          {/* BOTÓN DE MENÚ DE HERRAMIENTAS 🛠️ */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowToolsMenu(!showToolsMenu)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                showToolsMenu
                  ? 'bg-amber-400/20 text-amber-500 border-amber-400/40 ring-2 ring-amber-400/30'
                  : isDark
                  ? 'bg-slate-800/50 text-slate-300 border-slate-700/60 hover:bg-slate-700/70 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
              title="Menú de Herramientas de Estudio"
            >
              <span>🛠️</span>
              <span className="hidden sm:inline">Herramientas</span>
            </button>

            {/* POPUP DROPDOWN DE HERRAMIENTAS 🛠️ */}
            {showToolsMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 border border-slate-700 text-slate-100 shadow-2xl backdrop-blur-xl p-4 z-50 flex flex-col gap-3 animate-fade-in">
                <div className="flex items-center justify-between border-b pb-2 border-slate-800">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                    <span>🛠️</span>
                    <span>Herramientas de Estudio</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowToolsMenu(false)}
                    className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* 1. SECCIÓN ACTIVAR TEMPORIZADOR Y PRESETS */}
                <div className="flex flex-col gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                    <span>⏱️ Selecciona Tiempo Regresivo</span>
                    {isTimerActive && (
                      <span className="font-mono text-amber-400 font-bold">{formatTime(timerSeconds)}</span>
                    )}
                  </span>

                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { label: '3m', secs: 180 },
                      { label: '5m', secs: 300 },
                      { label: '10m', secs: 600 },
                      { label: '25m', secs: 1500 }
                    ].map(preset => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setTimerSeconds(preset.secs);
                          setIsTimerActive(true);
                          setIsTimerRunning(true);
                          setShowToolsMenu(false);
                        }}
                        className="px-2 py-1.5 rounded bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-xs font-extrabold text-slate-200 transition-all cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {isTimerActive && (
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`flex-1 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                          isTimerRunning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                        }`}
                      >
                        {isTimerRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTimerActive(false);
                          setIsTimerRunning(false);
                        }}
                        className="px-3 py-1.5 rounded bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-600 hover:text-white cursor-pointer"
                      >
                        Ocultar
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. SECCIÓN LECTURA EN VOZ ALTA */}
                <button
                  type="button"
                  onClick={speakCurrentSlide}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{isSpeaking ? '🔊' : '🗣️'}</span>
                    <span>{isSpeaking ? 'Detener Lectura' : 'Escuchar Diapositiva (Voz)'}</span>
                  </span>
                  <span>{isSpeaking ? '⏹️' : '▶️'}</span>
                </button>
              </div>
            )}
          </div>

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
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
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

      {/* LIENZO DE LA DIAPOSITIVA */}
      <main
        onTouchStart={handleTouchStartSlide}
        onTouchEnd={handleTouchEndSlide}
        className={`flex-1 flex flex-col items-center justify-center p-2 sm:p-6 max-w-6xl w-full mx-auto relative overflow-hidden ${
          shouldShowNavFooter ? 'pb-20' : 'pb-2'
        }`}
      >
        <div
          key={currentSlide.id}
          className={`w-full h-full max-h-full rounded-2xl p-4 sm:p-8 border transition-all duration-300 transform shadow-2xl flex flex-col justify-between overflow-y-auto custom-scrollbar ${
            isDark
              ? 'bg-slate-800/90 border-slate-700/80 backdrop-blur-xl text-slate-100 shadow-slate-950/50'
              : 'bg-white/95 border-slate-200/90 backdrop-blur-xl text-slate-900 shadow-slate-300/50'
          }`}
        >
          {/* SLIDE TYPE: COVER */}
          {currentSlide.type === 'cover' && (
            <div className="flex flex-col items-center text-center justify-center py-6 gap-6 my-auto overflow-y-auto custom-scrollbar">
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
                  {currentSlide.bulletPoints.map((point: string, idx: number) => (
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
            <div className="flex flex-col items-center text-center justify-center py-10 gap-6 my-auto max-w-xl mx-auto overflow-y-auto custom-scrollbar">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30">
                🧪 Módulo de Quiz
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight m-0" style={{ color: activeTitleColor }}>
                Evaluación Interactiva
              </h2>

              <p className={`text-base font-medium m-0 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Responde 10 desafíos interactivos diseñados para comprobar tu dominio de {lessonTitle} en Python.
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

          {/* SLIDE TYPE: METACOGNICIÓN COMPLETA EN 1 DIAPOSITIVA (CON POPUP HOVER Y SCROLL RESPONSIVO) */}
          {currentSlide.type === 'metacognition_overview' && (
            <div className="flex flex-col gap-4 my-auto h-full justify-between relative overflow-y-auto custom-scrollbar pr-1">
              {/* Header */}
              <div className="border-b pb-2 border-slate-700/40 shrink-0">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto custom-scrollbar">
                {/* Columna Izquierda: 4 Preguntas Genéricas */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-500 flex items-center gap-1">
                    <span>🌐</span>
                    <span>Preguntas Genéricas del Curso (1 - 4)</span>
                  </span>
                  <div className="flex flex-col gap-2 flex-1 justify-between">
                    {activeMetaQuestions.filter(q => q.category === 'Generic').map(q => {
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
                    {activeMetaQuestions.filter(q => q.category === 'CourseSpecific').map(q => {
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
                  const q = activeMetaQuestions.find(item => item.id === hoveredMetaId)!;
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
              <div className="flex flex-col gap-3 sm:gap-4 justify-start pt-1 sm:pt-2 pb-32 overflow-y-auto custom-scrollbar pr-1 h-full">
                {/* Header de la Pregunta (Compacto y pegado arriba) */}
                <div className="flex flex-col gap-1.5 border-b pb-2 border-slate-700/40 shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30">
                      {qData.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                        isDark ? 'bg-slate-900 text-amber-400 border-slate-700' : 'bg-slate-100 text-amber-600 border-slate-300'
                      }`}>
                        Puntaje: {totalQuizScore} / {activeQuizQuestions.length}
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
                    className="text-base sm:text-lg font-extrabold tracking-tight m-0 leading-snug"
                    style={{ color: activeTitleColor }}
                  >
                    {qData.questionText}
                  </h2>
                </div>

                {/* 1. TrueFalse */}
                {qData.kind === 'TrueFalse' && (() => {
                  const trueLabel = qData.labels?.trueText || 'VERDADERO';
                  const falseLabel = qData.labels?.falseText || 'FALSO';
                  const hasAnswered = tfAnswers[qIdx] !== undefined;
                  const isCorrect = tfAnswers[qIdx] === qData.correctAnswer;

                  return (
                    <div className="flex flex-col gap-3">
                      {qData.code && (
                        <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117]">
                          <pre className="p-3 m-0 text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-[#abb2bf]">
                            <code>
                              {qData.code.split('\n').map((line: string, idx: number) => (
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

                      <div className="grid grid-cols-2 gap-3 mt-1">
                        {[true, false].map((choice) => {
                          const isSelected = tfAnswers[qIdx] === choice;
                          const isOptionCorrect = qData.correctAnswer === choice;

                          let style = isDark
                            ? 'bg-slate-800/90 text-slate-100 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200';

                          if (hasAnswered) {
                            if (isOptionCorrect) {
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
                              className={`p-5 sm:p-6 rounded-2xl border-2 font-extrabold text-base sm:text-xl transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${style}`}
                            >
                              <span>{choice ? `✅ ${trueLabel}` : `❌ ${falseLabel}`}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* FEEDBACK DRAWER ESTILO DUOLINGO FIXED BOTTOM */}
                      {hasAnswered && (
                        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 border-t-2 shadow-2xl backdrop-blur-2xl transition-all animate-slide-up flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isCorrect
                            ? isDark
                              ? 'bg-slate-950/95 border-emerald-500 text-emerald-100 shadow-emerald-950/80'
                              : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-emerald-900/30'
                            : isDark
                            ? 'bg-slate-950/95 border-rose-500 text-rose-100 shadow-rose-950/80'
                            : 'bg-rose-50 border-rose-500 text-rose-950 shadow-rose-900/30'
                        }`}>
                          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shrink-0 ${
                              isCorrect ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                            }`}>
                              {isCorrect ? '✓' : '✕'}
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm sm:text-base font-black tracking-wide ${
                                isCorrect ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                                {isCorrect ? '¡Excelente! Respuesta Correcta 🎉' : 'Respuesta Incorrecta 💡'}
                              </span>
                              <span className="text-xs sm:text-sm font-medium opacity-90 leading-tight max-w-2xl">
                                {qData.explanation}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={goToNext}
                            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base text-white shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40'
                                : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/40'
                            }`}
                          >
                            <span>CONTINUAR</span>
                            <span className="text-lg">→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* 2, 5, 6, 7. MultipleChoice / FillInTheBlank / PredictOutput / FindTheBug */}
                {(qData.kind === 'MultipleChoice' || qData.kind === 'FillInTheBlank' || qData.kind === 'PredictOutput' || qData.kind === 'FindTheBug') && (() => {
                  const hasAnswered = mcAnswers[qIdx] !== undefined;
                  const isCorrect = mcAnswers[qIdx] === qData.correctOption;

                  return (
                    <div className="flex flex-col gap-3">
                      {qData.code && (
                        <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117]">
                          <pre className="p-3 m-0 text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-[#abb2bf]">
                            <code>
                              {qData.code.split('\n').map((line: string, idx: number) => (
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
                          const isSelected = mcAnswers[qIdx] === oIdx;
                          const isOptionCorrect = qData.correctOption === oIdx;

                          let style = isDark
                            ? 'bg-slate-800/90 text-slate-100 border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200';

                          if (hasAnswered) {
                            if (isOptionCorrect) {
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
                              className={`p-3.5 sm:p-4 rounded-xl border font-bold text-sm sm:text-base text-left transition-all flex items-center justify-between cursor-pointer ${style}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && isOptionCorrect && <span>✓</span>}
                              {hasAnswered && isSelected && !isOptionCorrect && <span>✕</span>}
                            </button>
                          );
                        })}
                      </div>

                      {/* FEEDBACK DRAWER ESTILO DUOLINGO FIXED BOTTOM */}
                      {hasAnswered && (
                        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 border-t-2 shadow-2xl backdrop-blur-2xl transition-all animate-slide-up flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isCorrect
                            ? isDark
                              ? 'bg-slate-950/95 border-emerald-500 text-emerald-100 shadow-emerald-950/80'
                              : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-emerald-900/30'
                            : isDark
                            ? 'bg-slate-950/95 border-rose-500 text-rose-100 shadow-rose-950/80'
                            : 'bg-rose-50 border-rose-500 text-rose-950 shadow-rose-900/30'
                        }`}>
                          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shrink-0 ${
                              isCorrect ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                            }`}>
                              {isCorrect ? '✓' : '✕'}
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm sm:text-base font-black tracking-wide ${
                                isCorrect ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                                {isCorrect ? '¡Excelente! Respuesta Correcta 🎉' : 'Respuesta Incorrecta 💡'}
                              </span>
                              <span className="text-xs sm:text-sm font-medium opacity-90 leading-tight max-w-2xl">
                                {qData.explanation}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={goToNext}
                            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base text-white shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40'
                                : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/40'
                            }`}
                          >
                            <span>CONTINUAR</span>
                            <span className="text-lg">→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

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
                    <div className="flex flex-col gap-3">
                      <div className={`p-3.5 rounded-xl border-2 border-dashed min-h-[60px] flex items-center gap-2 flex-wrap ${
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
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono text-xs sm:text-sm font-bold shadow-md hover:bg-indigo-500 cursor-pointer flex items-center gap-1"
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
                              className={`px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
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

                      {/* FEEDBACK DRAWER ESTILO DUOLINGO FIXED BOTTOM */}
                      {isSubmitted && (
                        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 border-t-2 shadow-2xl backdrop-blur-2xl transition-all animate-slide-up flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isCorrectOrder
                            ? isDark
                              ? 'bg-slate-950/95 border-emerald-500 text-emerald-100 shadow-emerald-950/80'
                              : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-emerald-900/30'
                            : isDark
                            ? 'bg-slate-950/95 border-rose-500 text-rose-100 shadow-rose-950/80'
                            : 'bg-rose-50 border-rose-500 text-rose-950 shadow-rose-900/30'
                        }`}>
                          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shrink-0 ${
                              isCorrectOrder ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                            }`}>
                              {isCorrectOrder ? '✓' : '✕'}
                            </div>
                            <div className="flex flex-col">
                              <span className={`text-sm sm:text-base font-black tracking-wide ${
                                isCorrectOrder ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                                {isCorrectOrder ? '¡Fantástico! Secuencia Ordenada 🎉' : 'Secuencia Incorrecta 💡'}
                              </span>
                              <span className="text-xs sm:text-sm font-medium opacity-90 leading-tight max-w-2xl">
                                {qData.explanation}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={goToNext}
                            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base text-white shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shrink-0 ${
                              isCorrectOrder
                                ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40'
                                : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/40'
                            }`}
                          >
                            <span>CONTINUAR</span>
                            <span className="text-lg">→</span>
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
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
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
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-mono font-bold text-left transition-all cursor-pointer flex items-center justify-between ${style}`}
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
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold text-left transition-all cursor-pointer flex items-center justify-between ${style}`}
                              >
                                <span>{item.text}</span>
                                {isMatched && <span>✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* FEEDBACK DRAWER ESTILO DUOLINGO FIXED BOTTOM */}
                      {isComplete && (
                        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 border-t-2 shadow-2xl backdrop-blur-2xl transition-all animate-slide-up flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isDark
                            ? 'bg-slate-950/95 border-emerald-500 text-emerald-100 shadow-emerald-950/80'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-emerald-900/30'
                        }`}>
                          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl sm:text-2xl font-black shrink-0 shadow-lg shadow-emerald-500/40">
                              ✓
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm sm:text-base font-black text-emerald-400 tracking-wide">
                                ¡Excelente Trabajo! Coincidencias completas 🎉
                              </span>
                              <span className="text-xs sm:text-sm font-medium opacity-90 leading-tight max-w-2xl">
                                {qData.explanation}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={goToNext}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base text-white bg-emerald-500 hover:bg-emerald-400 shadow-xl shadow-emerald-500/40 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shrink-0"
                          >
                            <span>CONTINUAR</span>
                            <span className="text-lg">→</span>
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
            <div className="flex flex-col items-center text-center justify-center py-6 gap-6 my-auto overflow-y-auto custom-scrollbar">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-500 border border-amber-400/30">
                Resultados de la Evaluación (10 Desafíos)
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: activeTitleColor }}>
                🏆 Puntaje Final: {totalQuizScore} / {activeQuizQuestions.length}
              </h2>

              <p className={`text-lg sm:text-xl font-medium max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {totalQuizScore === activeQuizQuestions.length
                  ? '🥇 ¡Puntaje Perfecto! Dominas al 100% las estructuras condicionales en Python.'
                  : totalQuizScore >= 7
                  ? '🥈 ¡Excelente trabajo! Demuestras una gran comprensión de la lógica condicional.'
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
            <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-700/40 shrink-0">
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
                      {currentSlide.bulletPoints.map((bullet: string, idx: number) => (
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
                          {currentSlide.codeSnippet.code.split('\n').map((line: string, idx: number) => (
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
                            {currentSlide.visualChart.headers.map((h: string, i: number) => (
                              <th key={i} className="p-2 font-bold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentSlide.visualChart.rows.map((row: any[], rIdx: number) => (
                            <tr key={rIdx} className="border-b border-slate-700/40 last:border-0">
                              {row.map((cell: any, cIdx: number) => (
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
      {shouldShowNavFooter && (
        <footer
          className={`px-4 sm:px-6 py-3 flex items-center justify-between border-t backdrop-blur-md fixed bottom-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out ${
            isDark
              ? 'bg-[#1e293b]/90 border-slate-700/60'
              : 'bg-white/90 border-slate-200 shadow-lg'
          } ${
            barMode === 'autohide' && !isBarVisible && !isMobile
              ? 'opacity-0 translate-y-full pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            type="button"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all border cursor-pointer ${
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

          {currentIndex < totalSlides - 1 ? (
            <button
              type="button"
              onClick={goToNext}
              className="px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all border text-white shadow-lg active:scale-95 cursor-pointer"
              style={{ backgroundColor: activeAccent, borderColor: activeAccent }}
            >
              <span>Siguiente</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div />
          )}
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
