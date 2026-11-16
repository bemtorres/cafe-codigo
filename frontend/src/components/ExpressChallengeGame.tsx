import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { EditorView } from '@codemirror/view';
import type { ExpressChallengeExercise } from '../data/challengesExpressTypes';

interface ExpressChallengeGameProps {
  allExercises: ExpressChallengeExercise[];
  fixedLanguage?: string;
  fixedLanguageTitle?: string;
  hideLanguageSelector?: boolean;
  defaultLanguage?: string;
  categoryTitle?: string;
  backUrl?: string;
}

export const ExpressChallengeGame: React.FC<ExpressChallengeGameProps> = ({
  allExercises,
  fixedLanguage,
  fixedLanguageTitle,
  hideLanguageSelector = false,
  defaultLanguage,
  categoryTitle,
  backUrl,
}) => {
  // Config & State
  const initialLang = fixedLanguage || defaultLanguage || 'cpp';
  const [currentLanguage, setCurrentLanguage] = useState<string>(initialLang);
  const [maxAttemptsSetting, setMaxAttemptsSetting] = useState<number>(3);
  const [countSetting, setCountSetting] = useState<number>(10);
  const [difficultySetting, setDifficultySetting] = useState<string>('EMA');
  const [timeSetting, setTimeSetting] = useState<number>(0); // 0 = sin límite de tiempo
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);
  const [showTimeIntroModal, setShowTimeIntroModal] = useState<boolean>(false);
  const [isEmbed, setIsEmbed] = useState<boolean>(false);
  const [canSkip, setCanSkip] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('');
  const [showLangModal, setShowLangModal] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);

  // Modal de Acierto / Felicitación por Ejercicio
  const [successModalData, setSuccessModalData] = useState<{
    show: boolean;
    title: string;
    points: number;
    streak: number;
    explanation: string;
  }>({
    show: false,
    title: '',
    points: 100,
    streak: 1,
    explanation: '',
  });

  // Modal de Error / Fallo
  const [errorModalData, setErrorModalData] = useState<{
    show: boolean;
    title: string;
    message: string;
    attemptsRemaining: number | null;
    isFinalFail: boolean;
    solutionCode: string | null;
  }>({
    show: false,
    title: '',
    message: '',
    attemptsRemaining: null,
    isFinalFail: false,
    solutionCode: null,
  });

  // Ronda de juego
  const [currentRound, setCurrentRound] = useState<ExpressChallengeExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Editor
  const [userCode, setUserCode] = useState<string>('');
  const [isEditorDisabled, setIsEditorDisabled] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Feedback inferior
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isSuccess: boolean;
    title: string;
    message: string;
    solutionCode: string | null;
  }>({
    show: false,
    isSuccess: false,
    title: '',
    message: '',
    solutionCode: null,
  });

  const [stepResolved, setStepResolved] = useState<boolean>(false);

  // Normalización
  const normalizeCode = (str: string) => {
    return (str || '')
      .replace(/\r\n/g, '\n')
      .replace(/\t/g, '    ')
      .replace(/\/\/.*$/gm, '')
      .replace(/#.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Obtener datos del ejercicio según lenguaje y tipo nativo
  const getExerciseLangData = useCallback((ex?: ExpressChallengeExercise, lang?: string) => {
    if (!ex || !ex.languages) return null;
    const l = (lang || currentLanguage || initialLang || '').toLowerCase();
    return (
      ex.languages[l] ||
      ex.languages['django'] ||
      ex.languages['python'] ||
      ex.languages['unix'] ||
      ex.languages['bash'] ||
      ex.languages['cmd'] ||
      ex.languages['html'] ||
      ex.languages['cpp'] ||
      ex.languages['javascript'] ||
      ex.languages['java'] ||
      Object.values(ex.languages)[0] ||
      null
    );
  }, [currentLanguage, initialLang]);

  // Obtener información del archivo y pestaña del editor
  const getEditorTabInfo = useCallback((ex?: ExpressChallengeExercise, lang?: string) => {
    if (ex?.fileName) {
      if (ex.fileName === 'terminal' || ex.fileName === 'cmd' || ex.fileName === 'bash') {
        return { name: 'terminal (cmd / bash)', icon: '💻' };
      }
      const icon = ex.fileName.endsWith('.py') ? '🐍' : ex.fileName.endsWith('.html') ? '🌐' : '📝';
      return { name: ex.fileName, icon };
    }
    if (ex?.categoryType === 'cmd') {
      return { name: 'terminal (cmd / bash)', icon: '💻' };
    }
    if (ex?.categoryType === 'html') {
      return { name: 'template.html', icon: '🌐' };
    }
    if (ex?.categoryType === 'python') {
      return { name: 'solution.py', icon: '🐍' };
    }
    const currentLang = (lang || currentLanguage || initialLang || '').toLowerCase();
    switch (currentLang) {
      case 'unix':
      case 'bash':
      case 'terminal':
      case 'sh':
      case 'cmd':
        return { name: 'terminal.sh', icon: '💻' };
      case 'django':
      case 'python':
        return { name: 'solution.py', icon: '🐍' };
      case 'html':
        return { name: 'template.html', icon: '🌐' };
      case 'cpp':
        return { name: 'solution.cpp', icon: '⚙️' };
      case 'javascript':
        return { name: 'solution.js', icon: '🟨' };
      case 'java':
        return { name: 'Main.java', icon: '☕' };
      default:
        return { name: 'solution.py', icon: '📝' };
    }
  }, [currentLanguage, initialLang]);

  const getFileExtension = (lang: string) => {
    return getEditorTabInfo(currentEx, lang).name;
  };

  // Formatear segundos a mm:ss
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(Math.max(0, totalSeconds) / 60);
    const secs = Math.max(0, totalSeconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Formatear texto descriptivo de tiempo (ej. "1 minuto y 30 segundos")
  const formatTimeText = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const parts = [];
    if (mins > 0) parts.push(`${mins} minuto${mins > 1 ? 's' : ''}`);
    if (secs > 0) parts.push(`${secs} segundo${secs > 1 ? 's' : ''}`);
    return parts.join(' y ') || `${totalSeconds} segundos`;
  };

  // Temporizador interactivo (pausado mientras estén abiertos los modales de intro, idioma o resultados)
  useEffect(() => {
    if (timeSetting <= 0 || showResultsModal || showLangModal || showTimeIntroModal) return;

    if (secondsLeft <= 0) {
      setIsTimeExpired(true);
      setShowResultsModal(true);
      setSuccessModalData(prev => ({ ...prev, show: false }));
      setErrorModalData(prev => ({ ...prev, show: false }));
      setShowHint(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeExpired(true);
          setShowResultsModal(true);
          setSuccessModalData(s => ({ ...s, show: false }));
          setErrorModalData(e => ({ ...e, show: false }));
          setShowHint(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeSetting, secondsLeft, showResultsModal, showLangModal, showTimeIntroModal]);

  // Función de selección balanceada de ejercicios por dificultad en partes iguales
  const selectBalancedExercises = useCallback((
    exercises: ExpressChallengeExercise[],
    count: number,
    difficultyPattern: string
  ) => {
    const norm = (difficultyPattern || 'EMA').toUpperCase().trim();
    const includesE = norm.includes('E') || norm.includes('FACIL') || norm.includes('EASY');
    const includesM = norm.includes('M') || norm.includes('MEDIO') || norm.includes('MEDIUM') || norm.includes('INTERMEDIO');
    const includesA = norm.includes('A') || norm.includes('AVANZADO') || norm.includes('ADVANCED');

    const targetDiffs: ('facil' | 'medio' | 'avanzado')[] = [];
    if (includesE) targetDiffs.push('facil');
    if (includesM) targetDiffs.push('medio');
    if (includesA) targetDiffs.push('avanzado');

    // Si no especificó ninguna válida, incluir las 3 por defecto
    const finalDiffs = targetDiffs.length > 0 ? targetDiffs : (['facil', 'medio', 'avanzado'] as const);

    const pools: Record<string, ExpressChallengeExercise[]> = {
      facil: exercises.filter(e => e.difficulty === 'facil' || e.difficulty === 'fácil'),
      medio: exercises.filter(e => e.difficulty === 'medio' || e.difficulty === 'intermedio'),
      avanzado: exercises.filter(e => e.difficulty === 'avanzado'),
    };

    const finalCount = Math.max(1, Math.min(count, exercises.length));
    const baseQuota = Math.floor(finalCount / finalDiffs.length);
    const remainder = finalCount % finalDiffs.length;

    let selected: ExpressChallengeExercise[] = [];

    finalDiffs.forEach((diff, idx) => {
      const quota = baseQuota + (idx < remainder ? 1 : 0);
      const pool = pools[diff] || [];
      const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
      selected = selected.concat(shuffledPool.slice(0, quota));
    });

    // Si por alguna razón el total seleccionado es menor a finalCount, rellenamos
    if (selected.length < finalCount) {
      const selectedIds = new Set(selected.map(e => e.id));
      const remainingPool = exercises.filter(e => !selectedIds.has(e.id)).sort(() => 0.5 - Math.random());
      selected = selected.concat(remainingPool.slice(0, finalCount - selected.length));
    }

    // Barajar la lista combinada final
    return selected.sort(() => 0.5 - Math.random());
  }, []);

  // Configurar nueva ronda
  const startNewRound = useCallback((langToUse?: string, countToUse?: number, diffToUse?: string, timeToUse?: number) => {
    const lang = langToUse || currentLanguage || initialLang;
    const count = countToUse !== undefined ? countToUse : countSetting;
    const diff = diffToUse || difficultySetting;
    const timeLimit = timeToUse !== undefined ? timeToUse : timeSetting;

    const selected = selectBalancedExercises(allExercises, count, diff);

    setCurrentRound(selected);
    setCurrentIndex(0);
    setCurrentScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setShowResultsModal(false);
    setIsTimeExpired(false);
    setSuccessModalData({ show: false, title: '', points: 100, streak: 1, explanation: '' });
    setErrorModalData({ show: false, title: '', message: '', attemptsRemaining: null, isFinalFail: false, solutionCode: null });
    setStepResolved(false);
    setShowHint(false);

    if (timeLimit > 0) {
      setSecondsLeft(timeLimit);
      setShowTimeIntroModal(true);
    }

    // Cargar primer ejercicio
    const firstEx = selected[0];
    if (firstEx) {
      const langData = getExerciseLangData(firstEx, lang);
      if (langData) {
        setUserCode(langData.starterCode);
      }
    }

    // Reset attempts
    if (maxAttemptsSetting === 0) {
      setAttemptsLeft(1);
    } else if (maxAttemptsSetting === -1) {
      setAttemptsLeft(999);
    } else {
      setAttemptsLeft(maxAttemptsSetting);
    }

    setIsEditorDisabled(false);
    setFeedback({ show: false, isSuccess: false, title: '', message: '', solutionCode: null });
  }, [allExercises, currentLanguage, initialLang, countSetting, difficultySetting, timeSetting, maxAttemptsSetting, selectBalancedExercises, getExerciseLangData]);

  // Cargar ejercicio actual
  const loadExerciseByIndex = useCallback((idx: number, lang: string, round: ExpressChallengeExercise[]) => {
    const ex = round[idx];
    if (!ex) return;

    if (maxAttemptsSetting === 0) {
      setAttemptsLeft(1);
    } else if (maxAttemptsSetting === -1) {
      setAttemptsLeft(999);
    } else {
      setAttemptsLeft(maxAttemptsSetting);
    }

    const langData = getExerciseLangData(ex, lang);
    if (langData) {
      setUserCode(langData.starterCode);
    }
    setIsEditorDisabled(false);
    setShowHint(false);
    setStepResolved(false);
    setSuccessModalData({ show: false, title: '', points: 100, streak: 1, explanation: '' });
    setErrorModalData({ show: false, title: '', message: '', attemptsRemaining: null, isFinalFail: false, solutionCode: null });
    setFeedback({ show: false, isSuccess: false, title: '', message: '', solutionCode: null });
  }, [maxAttemptsSetting, getExerciseLangData]);

  // Inicializar con Query Params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get('code');
      const attemptsParam = urlParams.get('attempts');
      const embedParam = urlParams.get('embed');
      const countParam = urlParams.get('count');
      const skipParam = urlParams.get('skip');
      const nameParam = urlParams.get('name');
      const diffParam = urlParams.get('difficulty');
      const timeParam = urlParams.get('time');

      // 0. Name check
      if (nameParam) {
        setUserName(nameParam.trim());
      }

      // 1. Embed check
      if (embedParam === 'true' || embedParam === '1') {
        setIsEmbed(true);
      }

      // 2. Skip check (por defecto true, a menos que skip=false o skip=0)
      if (skipParam === 'false' || skipParam === '0') {
        setCanSkip(false);
      } else {
        setCanSkip(true);
      }

      // 3. Count check
      let parsedCount = 10;
      if (countParam !== null) {
        const c = parseInt(countParam, 10);
        if (!isNaN(c) && c > 0) {
          parsedCount = Math.min(c, allExercises.length);
          setCountSetting(parsedCount);
        }
      }

      // 4. Attempts check
      if (attemptsParam !== null) {
        const parsed = parseInt(attemptsParam, 10);
        if (!isNaN(parsed)) {
          setMaxAttemptsSetting(parsed);
        }
      }

      // 5. Difficulty check (EMA, E, M, A, EM, MA, EA...)
      let parsedDiff = 'EMA';
      if (diffParam) {
        parsedDiff = diffParam.trim();
        setDifficultySetting(parsedDiff);
      }

      // 6. Time check (time=60, time=120...)
      let parsedTime = 0;
      if (timeParam !== null) {
        const t = parseInt(timeParam, 10);
        if (!isNaN(t) && t > 0) {
          parsedTime = t;
          setTimeSetting(t);
          setSecondsLeft(t);
        }
      }

      // 7. Language check
      const isFixedLanguageModule = Boolean(
        fixedLanguage ||
        hideLanguageSelector ||
        ['django', 'unix', 'bash', 'terminal', 'cmd'].includes((initialLang || '').toLowerCase())
      );

      if (isFixedLanguageModule) {
        const lang = fixedLanguage || defaultLanguage || initialLang;
        setCurrentLanguage(lang);
        setShowLangModal(false);
        if (parsedTime > 0) {
          setShowTimeIntroModal(true);
        }
        startNewRound(lang, parsedCount, parsedDiff, parsedTime);
      } else if (codeParam && ['cpp', 'python', 'javascript', 'java', 'unix', 'bash', 'terminal', 'django'].includes(codeParam.toLowerCase())) {
        const lang = codeParam.toLowerCase();
        setCurrentLanguage(lang);
        setShowLangModal(false);
        if (parsedTime > 0) {
          setShowTimeIntroModal(true);
        }
        startNewRound(lang, parsedCount, parsedDiff, parsedTime);
      } else {
        // Mostrar modal de lenguaje al inicio sólo para módulos multilenguaje
        setShowLangModal(true);
        startNewRound(initialLang, parsedCount, parsedDiff, parsedTime);
      }
    }
  }, [allExercises, fixedLanguage, hideLanguageSelector, initialLang, defaultLanguage, startNewRound]);

  // Cambiar lenguaje
  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('code', newLang);
    window.history.replaceState({}, '', newUrl.toString());

    if (currentRound.length > 0) {
      loadExerciseByIndex(currentIndex, newLang, currentRound);
    }
    if (timeSetting > 0) {
      setShowTimeIntroModal(true);
    }
  };

  // Extensiones de CodeMirror (Tema Claro)
  const extensions = useMemo(() => {
    const langExt = (() => {
      const l = (currentLanguage || initialLang || '').toLowerCase();
      switch (l) {
        case 'unix':
        case 'bash':
        case 'terminal':
        case 'sh':
        case 'cmd':
        case 'django':
        case 'python':
        case 'html':
          return python();
        case 'cpp':
          return cpp();
        case 'javascript':
          return javascript();
        case 'java':
          return java();
        default:
          return python();
      }
    })();

    return [
      langExt,
      EditorView.lineWrapping,
      EditorView.theme({
        '&': {
          fontSize: '13.5px',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          borderRadius: '0 0 1rem 1rem',
          border: '2px solid #E2E8F0',
          borderTop: 'none',
        },
        '.cm-content': {
          fontFamily: '"JetBrains Mono", monospace',
          padding: '14px 16px',
        },
        '.cm-gutters': {
          backgroundColor: '#F8FAFC',
          color: '#64748B',
          borderRight: '1px solid #E2E8F0',
          borderRadius: '0 0 0 1rem',
        },
        '.cm-activeLineGutter': {
          backgroundColor: '#E0F2FE',
          color: '#0284C7',
          fontWeight: 'bold',
        },
        '.cm-activeLine': {
          backgroundColor: 'rgba(2, 132, 199, 0.05)',
        },
      }),
    ];
  }, [currentLanguage, initialLang]);

  const totalRoundCount = currentRound.length || countSetting;
  const currentEx = currentRound[currentIndex];
  const currentLangData = getExerciseLangData(currentEx, currentLanguage);
  const tabInfo = getEditorTabInfo(currentEx, currentLanguage);

  // Comprobar solución
  const handleSubmit = () => {
    if (!currentEx || !currentLangData) return;

    const normUser = normalizeCode(userCode);
    const normSol = normalizeCode(currentLangData.solutionCode);

    let isCorrect = false;

    if (normUser === normSol) {
      isCorrect = true;
    } else {
      if (!userCode.includes('___')) {
        if (currentLangData.acceptedKeywords && currentLangData.acceptedKeywords.length > 0) {
          const hasAllKeywords = currentLangData.acceptedKeywords.every((kw) => userCode.includes(kw));
          if (hasAllKeywords) {
            isCorrect = true;
          }
        }
      }
    }

    if (isCorrect) {
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      setCorrectCount(prev => prev + 1);

      const pointsEarned = 100 + (nextStreak * 10);
      setCurrentScore(prev => prev + pointsEarned);

      const successTitle = userName ? `¡Excelente trabajo, ${userName}!` : '¡Excelente trabajo!';

      // Lanzar Modal Animado de Éxito
      setSuccessModalData({
        show: true,
        title: successTitle,
        points: pointsEarned,
        streak: nextStreak,
        explanation: currentEx.explanation,
      });

      setFeedback({
        show: true,
        isSuccess: true,
        title: `${successTitle} (+${pointsEarned} pts)`,
        message: currentEx.explanation,
        solutionCode: currentLangData.solutionCode,
      });

      setStepResolved(true);
      setIsEditorDisabled(true);
    } else {
      setCurrentStreak(0);
      const namePrefix = userName ? `${userName}, ` : '';

      if (maxAttemptsSetting === -1) {
        // Modo Infinito: Modal de advertencia (sin ensuciar la vista inferior con feedbacks estáticos)
        setErrorModalData({
          show: true,
          title: userName ? `Atención, ${userName}` : 'Código incorrecto',
          message: `${namePrefix}aún quedan errores en la lógica o sintaxis. Revisa los espacios por rellenar o el bug planteado e inténtalo de nuevo.`,
          attemptsRemaining: null,
          isFinalFail: false,
          solutionCode: null,
        });

        // No mostramos feedback inferior para no duplicar con el modal
        setFeedback({
          show: false,
          isSuccess: false,
          title: '',
          message: '',
          solutionCode: null,
        });
      } else if (maxAttemptsSetting === 0) {
        // Feedback directo sin intentos
        setAttemptsLeft(0);
        setErrorModalData({
          show: true,
          title: userName ? `Respuesta incorrecta, ${userName}` : 'Respuesta Incorrecta',
          message: currentEx.explanation,
          attemptsRemaining: 0,
          isFinalFail: true,
          solutionCode: currentLangData.solutionCode,
        });

        setFeedback({
          show: true,
          isSuccess: false,
          title: 'Respuesta Incorrecta',
          message: currentEx.explanation,
          solutionCode: currentLangData.solutionCode,
        });
        setStepResolved(true);
        setIsEditorDisabled(true);
      } else {
        // Modo con límite de vidas
        const nextAttempts = attemptsLeft - 1;
        setAttemptsLeft(nextAttempts);

        if (nextAttempts > 0) {
          setErrorModalData({
            show: true,
            title: userName ? `Revisa tu código, ${userName}` : 'Intento no válido',
            message: `${namePrefix}revisa cuidadosamente los espacios faltantes (___) o la sintaxis requerida. Te queda${nextAttempts > 1 ? 'n' : ''} ${nextAttempts} intento${nextAttempts > 1 ? 's' : ''}.`,
            attemptsRemaining: nextAttempts,
            isFinalFail: false,
            solutionCode: null,
          });

          // No mostramos feedback inferior repetitivo; el modal ya informa y el HUD actualiza los intentos
          setFeedback({
            show: false,
            isSuccess: false,
            title: '',
            message: '',
            solutionCode: null,
          });
        } else {
          // Se acabaron los intentos
          setErrorModalData({
            show: true,
            title: userName ? `¡Se agotaron los intentos, ${userName}!` : '¡Se agotaron los intentos!',
            message: currentEx.explanation,
            attemptsRemaining: 0,
            isFinalFail: true,
            solutionCode: currentLangData.solutionCode,
          });

          setFeedback({
            show: true,
            isSuccess: false,
            title: 'Se agotaron los intentos',
            message: currentEx.explanation,
            solutionCode: currentLangData.solutionCode,
          });
          setStepResolved(true);
          setIsEditorDisabled(true);
        }
      }
    }
  };

  const handleSkip = () => {
    if (!currentEx || !currentLangData) return;
    setCurrentStreak(0);
    setErrorModalData({
      show: true,
      title: 'Desafío Saltado',
      message: currentEx.explanation,
      attemptsRemaining: 0,
      isFinalFail: true,
      solutionCode: currentLangData.solutionCode,
    });
    setFeedback({
      show: true,
      isSuccess: false,
      title: 'Desafío Saltado',
      message: currentEx.explanation,
      solutionCode: currentLangData.solutionCode,
    });
    setStepResolved(true);
    setIsEditorDisabled(true);
  };

  const handleNext = () => {
    setSuccessModalData(prev => ({ ...prev, show: false }));
    setErrorModalData(prev => ({ ...prev, show: false }));
    if (currentIndex + 1 < currentRound.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      loadExerciseByIndex(nextIdx, currentLanguage, currentRound);
    } else {
      setShowResultsModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalData(prev => ({ ...prev, show: false }));
  };

  const handleResetCode = () => {
    if (currentLangData) {
      setUserCode(currentLangData.starterCode);
    }
  };

  return (
    <div className="w-full text-slate-800">
      {/* TOP BAR (SE OCULTA COMPLETAMENTE EN MODO EMBED) */}
      {!isEmbed && (
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={backUrl || '/challenges-express/'}
                className="flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-xl transition-all no-underline"
              >
                <span>←</span> <span>{backUrl ? 'Volver al Curso' : 'Volver a Módulos'}</span>
              </a>
              <span className="hidden sm:inline-block text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-slate-900">
                  Desafíos Express: <span className="text-sky-600">{categoryTitle || 'Entrenamiento'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hideLanguageSelector || fixedLanguage || ['django', 'unix', 'bash', 'terminal', 'cmd'].includes((initialLang || '').toLowerCase()) ? (
                <div className="flex items-center gap-1.5 bg-slate-900 text-amber-300 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold shadow-xs">
                  <span>{(initialLang || '').toLowerCase() === 'django' ? '🐍' : '💻'}</span>
                  <span>{fixedLanguageTitle || categoryTitle || ((initialLang || '').toLowerCase() === 'django' ? 'Django Framework' : 'Unix / Linux')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-1 text-xs">
                  <span className="text-slate-500 font-semibold hidden md:inline">Lenguaje:</span>
                  <select
                    value={currentLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="bg-transparent font-bold text-sky-700 focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="cpp" className="bg-white text-slate-900">C++</option>
                    <option value="python" className="bg-white text-slate-900">Python</option>
                    <option value="javascript" className="bg-white text-slate-900">JavaScript</option>
                    <option value="java" className="bg-white text-slate-900">Java</option>
                  </select>
                </div>
              )}

              <button
                onClick={() => startNewRound()}
                title={`Generar nueva ronda de ${countSetting} ejercicios aleatorios`}
                className="flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-3.5 py-1.5 rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>🎲</span> <span className="hidden sm:inline">Nueva Ronda ({countSetting})</span>
              </button>
            </div>
          </div>
        </header>
      )}

      <div className={`max-w-5xl mx-auto px-4 ${isEmbed ? 'pt-2' : 'mt-6'}`}>
        {/* HUD DE PROGRESO */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-600 flex items-center gap-1.5 font-bold">
                  <span>🎯</span> Progreso de la Ronda:
                  <strong className="text-sky-600 text-sm ml-1">{currentIndex + 1} / {totalRoundCount}</strong>
                </span>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md text-[11px] font-black flex items-center gap-1">
                  🔥 Racha: <span>{currentStreak}</span>
                </span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${((currentIndex + 1) / totalRoundCount) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 border-l border-slate-200 pl-4 sm:pl-6">
              {timeSetting > 0 && (
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Tiempo</span>
                  <div
                    className={`flex items-center gap-1.5 mt-0.5 px-3 py-0.5 rounded-lg font-mono font-black text-xs sm:text-sm border transition-all ${
                      secondsLeft <= 15
                        ? 'bg-rose-100 border-rose-300 text-rose-800 animate-pulse'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <span>{secondsLeft <= 15 ? '⏰' : '⏱️'}</span>
                    <span>{formatTime(secondsLeft)}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Vidas / Intentos</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {maxAttemptsSetting === -1 ? (
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
                      ♾️ Infinitos
                    </span>
                  ) : maxAttemptsSetting === 0 ? (
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                      ⚡ 1 Intento
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-lg">
                      <div className="flex items-center gap-0.5 text-xs">
                        {Array.from({ length: maxAttemptsSetting }).map((_, i) => (
                          <span
                            key={i}
                            className={`transition-all ${i < attemptsLeft ? 'text-rose-500 scale-100' : 'text-slate-300 opacity-50 scale-90'}`}
                          >
                            {i < attemptsLeft ? '❤️' : '🤍'}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-black text-rose-700">
                        {attemptsLeft} / {maxAttemptsSetting}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Puntos</span>
                <div className="flex items-center gap-1 text-amber-600 font-black text-base sm:text-lg">
                  <span>⭐</span> <span>{currentScore}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TARJETA DEL EJERCICIO */}
        {currentEx && (
          <section className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    {currentEx.type === 'complete' ? '✍️ Rellenar Código' : '🐛 Corregir Bug'}
                  </span>
                  {currentEx.categoryType === 'cmd' && (
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <span>💻</span> <span>Comando CMD / Terminal</span>
                    </span>
                  )}
                  {currentEx.categoryType === 'html' && (
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-900 border border-orange-300 flex items-center gap-1">
                      <span>🌐</span> <span>Plantilla HTML (Django)</span>
                    </span>
                  )}
                  {currentEx.categoryType === 'python' && (
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                      <span>🐍</span> <span>Código Python</span>
                    </span>
                  )}
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Nivel {currentEx.difficulty.toUpperCase()}
                  </span>
                  {maxAttemptsSetting > 0 && (
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                      <span>❤️</span> <span>{attemptsLeft} intento{attemptsLeft > 1 ? 's' : ''} restante{attemptsLeft > 1 ? 's' : ''}</span>
                    </span>
                  )}
                  {timeSetting > 0 && (
                    <span className={`text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      secondsLeft <= 15
                        ? 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse'
                        : 'bg-amber-100 text-amber-950 border-amber-300'
                    }`}>
                      <span>⏱️</span> <span>{formatTime(secondsLeft)}</span>
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentIndex + 1}. {currentEx.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  <span>💡</span> <span>Pista</span>
                </button>
                <button
                  onClick={handleResetCode}
                  className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                  title="Restablecer código inicial"
                >
                  <span>🔄</span> <span>Reiniciar</span>
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {currentEx.statement}
              </p>
            </div>

            {/* EDITOR CODEMIRROR CLARO */}
            <div className="mt-5 relative">
              <div className="flex items-center justify-between bg-slate-100 px-4 py-2.5 rounded-t-2xl border-t-2 border-x-2 border-slate-200 text-xs text-slate-600 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  <span className="ml-2 text-slate-800 font-bold flex items-center gap-1.5">
                    <span>{tabInfo.icon}</span>
                    <span>{tabInfo.name}</span>
                  </span>
                </div>
                {currentEx.categoryType && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {currentEx.categoryType === 'cmd' ? 'Consola / Terminal' : currentEx.categoryType === 'html' ? 'Plantilla Django' : 'Script Python'}
                  </span>
                )}
              </div>

              <div className="w-full text-left rounded-b-2xl overflow-hidden shadow-xs">
                <CodeMirror
                  value={userCode}
                  height="280px"
                  extensions={extensions}
                  readOnly={isEditorDisabled}
                  editable={!isEditorDisabled}
                  onChange={(val) => setUserCode(val)}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightSpecialChars: true,
                    history: true,
                    foldGutter: true,
                    drawSelection: true,
                    indentOnInput: true,
                    syntaxHighlighting: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    highlightActiveLine: true,
                  }}
                />
              </div>
            </div>

            {/* FEEDBACK INFERIOR (Solo cuando el paso está resuelto) */}
            {stepResolved && feedback.show && (
              <div
                className={`mt-4 p-4 rounded-2xl border ${feedback.isSuccess
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feedback.isSuccess ? '🎉' : '⚠️'}</span>
                  <div className="flex-1">
                    <h4
                      className={`font-black text-sm sm:text-base ${feedback.isSuccess ? 'text-emerald-800' : 'text-rose-800'
                        }`}
                    >
                      {feedback.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                      {feedback.message}
                    </p>
                    {feedback.solutionCode && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Código de solución sugerido:
                        </span>
                        <pre className="bg-white p-3 rounded-xl text-xs font-mono text-emerald-800 overflow-x-auto border border-emerald-200">
                          {feedback.solutionCode}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* BOTONES INFERIORES */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                {timeSetting > 0 && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-black shadow-xs ${
                    secondsLeft <= 15
                      ? 'bg-rose-100 border-rose-300 text-rose-900 animate-pulse'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <span>{secondsLeft <= 15 ? '⏰' : '⏱️'}</span>
                    <span>Tiempo: {formatTime(secondsLeft)}</span>
                  </div>
                )}

                {maxAttemptsSetting === -1 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
                    <span>♾️</span> <span>Intentos ilimitados</span>
                  </div>
                ) : maxAttemptsSetting === 0 ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <span>⚡</span> <span>Modo 1 intento directo</span>
                  </div>
                ) : (
                  <div
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all ${
                      attemptsLeft === 1
                        ? 'bg-rose-100 border-rose-300 text-rose-900 animate-pulse'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    <div className="flex items-center gap-0.5 text-sm">
                      {Array.from({ length: maxAttemptsSetting }).map((_, i) => (
                        <span key={i} className={i < attemptsLeft ? 'text-rose-600' : 'text-slate-300 opacity-60'}>
                          {i < attemptsLeft ? '❤️' : '🤍'}
                        </span>
                      ))}
                    </div>
                    <span className="font-bold text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                      Intentos: <strong className="font-black text-sm text-rose-700 ml-0.5">{attemptsLeft}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {!stepResolved ? (
                  <>
                    {canSkip && (
                      <button
                        onClick={handleSkip}
                        className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                      >
                        Saltar Desafío
                      </button>
                    )}
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Comprobar Respuesta</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentIndex + 1 < currentRound.length ? 'Siguiente Desafío' : 'Ver Resultados'}</span>
                    <span>➡️</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* 🌟 MODAL ANIMADO DE ACIERTO / EXCELENTE TRABAJO */}
      {successModalData.show && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden transform transition-all animate-scaleUp">
            {/* Destello decorativo */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-white text-4xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30 animate-bounce">
              🎉
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {successModalData.title}
            </h3>

            <div className="my-3 flex items-center justify-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-800">
                +{successModalData.points} pts ⭐
              </span>
              {successModalData.streak > 1 && (
                <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-xs font-black text-amber-800 flex items-center gap-1">
                  🔥 Racha x{successModalData.streak}
                </span>
              )}
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed my-3 font-medium">
              {successModalData.explanation}
            </p>

            <div className="mt-5">
              <button
                onClick={handleNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentIndex + 1 < currentRound.length ? 'Siguiente Desafío' : 'Ver Puntuación Final'}</span>
                <span>➡️</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ MODAL ANIMADO DE ERROR / INTENTO FALLIDO */}
      {errorModalData.show && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-rose-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden transform transition-all animate-scaleUp">
            {/* Destello decorativo */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-rose-500 to-orange-400 text-white text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/30">
              {errorModalData.isFinalFail ? '💀' : '⚠️'}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {errorModalData.title}
            </h3>

            {errorModalData.attemptsRemaining !== null && !errorModalData.isFinalFail && (
              <div className="my-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                <span>❤️</span>
                <span>Vidas restantes: {errorModalData.attemptsRemaining}</span>
              </div>
            )}

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed my-3 font-medium">
              {errorModalData.message}
            </p>

            {errorModalData.solutionCode && (
              <div className="my-4 text-left p-3 rounded-xl bg-slate-50 border border-slate-200 max-h-36 overflow-y-auto">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Solución sugerida:
                </span>
                <pre className="text-xs font-mono text-emerald-800 whitespace-pre-wrap">
                  {errorModalData.solutionCode}
                </pre>
              </div>
            )}

            <div className="mt-5">
              {!errorModalData.isFinalFail ? (
                <button
                  onClick={handleCloseErrorModal}
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs sm:text-sm shadow-md shadow-rose-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  Reintentar Solución ✍️
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentIndex + 1 < currentRound.length ? 'Avanzar al Siguiente' : 'Ver Puntuación Final'}</span>
                  <span>➡️</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 💡 MODAL ANIMADO DE PISTA */}
      {showHint && currentEx && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden transform transition-all animate-scaleUp">
            {/* Destello decorativo */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-yellow-200/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-white text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
              💡
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pista del Desafío
            </h3>
            <p className="text-[11px] text-amber-700 font-bold uppercase tracking-wider mt-0.5">
              {currentEx.title}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-left">
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                {currentEx.hint}
              </p>
            </div>

            <button
              onClick={() => setShowHint(false)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              ¡Entendido, volver al código! 🚀
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE LENGUAJE */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 text-3xl flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h3 className="text-2xl font-black text-slate-900">Elige tu Lenguaje</h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Selecciona el lenguaje en el que deseas resolver la ronda de {totalRoundCount} desafíos interactivos de {categoryTitle || 'código'}:
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => {
                  setShowLangModal(false);
                  handleLanguageChange('cpp');
                }}
                className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-500 transition-all cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">⚙️</span>
                <span className="font-extrabold text-sm text-slate-800 group-hover:text-sky-700">C++</span>
                <span className="text-[10px] text-slate-500">Sintaxis estándar</span>
              </button>

              <button
                onClick={() => {
                  setShowLangModal(false);
                  handleLanguageChange('python');
                }}
                className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-500 transition-all cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🐍</span>
                <span className="font-extrabold text-sm text-slate-800 group-hover:text-amber-700">Python</span>
                <span className="text-[10px] text-slate-500">def & indentación</span>
              </button>

              <button
                onClick={() => {
                  setShowLangModal(false);
                  handleLanguageChange('javascript');
                }}
                className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-slate-50 hover:bg-yellow-50 border-2 border-slate-200 hover:border-yellow-500 transition-all cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🟨</span>
                <span className="font-extrabold text-sm text-slate-800 group-hover:text-yellow-700">JavaScript</span>
                <span className="text-[10px] text-slate-500">function & arrow</span>
              </button>

              <button
                onClick={() => {
                  setShowLangModal(false);
                  handleLanguageChange('java');
                }}
                className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50 border-2 border-slate-200 hover:border-orange-500 transition-all cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">☕</span>
                <span className="font-extrabold text-sm text-slate-800 group-hover:text-orange-700">Java</span>
                <span className="text-[10px] text-slate-500">public static void</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⏱️ MODAL INICIAL DE EVALUACIÓN CON TIEMPO */}
      {showTimeIntroModal && timeSetting > 0 && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden transform transition-all animate-scaleUp">
            {/* Destello decorativo */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-200/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white text-4xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30 animate-pulse">
              ⏱️
            </div>

            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                <span>⚡</span> <span>Evaluación Cronometrada</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {userName ? `¡Hola, ${userName}!` : '¡Desafío Cronometrado!'}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
              Tienes <strong className="text-amber-700 font-black">{formatTimeText(timeSetting)}</strong> para completar la ronda de <strong className="text-slate-900 font-black">{totalRoundCount}</strong> desafíos de {categoryTitle || 'programación'}.
            </p>

            <div className="my-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-left space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-base">⏳</span>
                <span><strong>Tiempo total:</strong> {formatTime(timeSetting)} ({timeSetting} segundos)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🎯</span>
                <span><strong>Para aprobar:</strong> Mínimo 70% de aciertos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">❤️</span>
                <span><strong>Intentos:</strong> {maxAttemptsSetting === -1 ? 'Ilimitados' : `${maxAttemptsSetting} vidas por ejercicio`}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-bold mb-5">
              El cronómetro comenzará a correr en cuanto presiones el botón.
            </p>

            <button
              onClick={() => setShowTimeIntroModal(false)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>¡Comenzar Evaluación!</span>
              <span>🚀</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE RESULTADOS FINALES CON EVALUACIÓN DE APROBACIÓN (>= 70%) */}
      {showResultsModal && (() => {
        const accuracyPercent = Math.round((correctCount / totalRoundCount) * 100);
        const isPassed = accuracyPercent >= 70;

        return (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
            <div className={`bg-white border-2 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center relative overflow-hidden transform transition-all animate-scaleUp ${
              isPassed ? 'border-emerald-300' : 'border-rose-300'
            }`}>
              {/* Destello decorativo */}
              <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none ${
                isPassed ? 'bg-emerald-200/50' : 'bg-rose-200/50'
              }`}></div>
              <div className={`absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-3xl pointer-events-none ${
                isPassed ? 'bg-sky-200/50' : 'bg-amber-200/50'
              }`}></div>

              {/* Banner de Tiempo Agotado */}
              {isTimeExpired && (
                <div className="mb-4 px-4 py-2 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs font-black flex items-center justify-center gap-2 animate-bounce">
                  <span>⏰</span>
                  <span>¡Se ha agotado el tiempo límite ({formatTime(timeSetting)})!</span>
                </div>
              )}

              {/* Icono / Emblema */}
              <div className={`w-20 h-20 rounded-3xl border text-4xl flex items-center justify-center mx-auto mb-3 shadow-lg ${
                isPassed
                  ? 'bg-emerald-50 border-emerald-200 shadow-emerald-500/20'
                  : 'bg-rose-50 border-rose-200 shadow-rose-500/20'
              }`}>
                {isPassed ? '🏆' : '📚'}
              </div>

              {/* Badge de Estado */}
              <div className="mb-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  isPassed
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}>
                  <span>{isPassed ? '✅' : '⚠️'}</span>
                  <span>{isPassed ? `Aprobado · ${accuracyPercent}%` : `No Aprobado · ${accuracyPercent}% (Mín. 70%)`}</span>
                </span>
              </div>

              {/* Título Principal */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isPassed
                  ? (userName ? `¡Felicitaciones, ${userName}!` : '¡Felicitaciones, has Aprobado!')
                  : (userName ? `${userName}, ¡sigue practicando!` : '¡Sigue practicando!')}
              </h3>

              {/* Mensaje Contextual */}
              <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed font-medium">
                {isPassed
                  ? (userName
                      ? `${userName}, has superado exitosamente la ronda con ${correctCount} de ${totalRoundCount} aciertos (${accuracyPercent}%). ¡Gran dominio de ${categoryTitle || 'este módulo'}!`
                      : `Has superado exitosamente la ronda de ${totalRoundCount} Desafíos Express con un ${accuracyPercent}% de aciertos.`)
                  : (userName
                      ? `${userName}, obtuviste ${correctCount} de ${totalRoundCount} aciertos (${accuracyPercent}%). Para aprobar se requiere un 70%. ¡Vuelve a intentarlo para dominar este módulo!`
                      : `Obtuviste ${correctCount} de ${totalRoundCount} aciertos (${accuracyPercent}%). Se requiere al menos un 70% para aprobar. ¡Inténtalo de nuevo para reforzar tus habilidades!`)}
              </p>

              {/* Tarjeta de Métricas */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 my-5">
                <div className="grid grid-cols-3 gap-2 divide-x divide-slate-200 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Score Final</span>
                    <strong className="text-2xl sm:text-3xl font-black text-amber-600">{currentScore}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Aciertos</span>
                    <strong className={`text-2xl sm:text-3xl font-black ${
                      isPassed ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {correctCount} / {totalRoundCount}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Mejor Racha</span>
                    <strong className="text-2xl sm:text-3xl font-black text-sky-600">🔥 {maxStreak}</strong>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => startNewRound()}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPassed
                      ? 'bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-sky-600/20'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-orange-600/20'
                  }`}
                >
                  <span>{isPassed ? '🎲' : '🔄'}</span>
                  <span>{isPassed ? 'Jugar Otra Ronda' : 'Reintentar Ronda'}</span>
                </button>
                {!isEmbed && (
                  <a
                    href={backUrl || "/challenges-express/"}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all text-center no-underline"
                  >
                    {backUrl ? 'Volver al Curso 📘' : 'Volver a Módulos 📘'}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
