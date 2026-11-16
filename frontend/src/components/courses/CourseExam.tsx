import { useCallback, useEffect, useRef, useState } from 'react';
import type { BrandPreset } from '../../data/courses/courseJsonTypes';
import type { ExamQuestion } from '../../data/courses/examQuestions';
import { hasExamAnswer, startExamSession, updateExamSession } from '../../lib/examSession';
import type { ExamSession } from '../../lib/examSession';
import { ExamQuestionView } from './ExamQuestionView';
import { ExamQuestionViewport } from './ExamQuestionViewport';
import './course-exam.css';

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function readSession(key: string): ExamSession | null {
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  const saved = JSON.parse(raw) as ExamSession;
  if (!saved || typeof saved.id !== 'string' || !Number.isFinite(saved.deadline) ||
      !Number.isInteger(saved.page) || !Array.isArray(saved.events) || !saved.answers) return null;
  return saved;
}

export function CourseExam({ examId, title, questions, brand, defaultMinutes }: {
  examId: string;
  title: string;
  questions: ExamQuestion[];
  brand: BrandPreset;
  defaultMinutes: number;
}) {
  const storagePrefix = `cc:exam:${examId}:`;
  const activeKey = `${storagePrefix}active`;
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<ExamSession | null>(null);
  const latest = useRef<ExamSession | null>(null);
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [now, setNow] = useState(0);
  const deliveryDialog = useRef<HTMLDialogElement>(null);
  const [storageError, setStorageError] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const pageHeading = useRef<HTMLHeadingElement>(null);

  const showSession = useCallback((next: ExamSession | null) => {
    latest.current = next;
    setSession(next);
  }, []);

  const persist = useCallback((next: ExamSession, isNew = false) => {
    try {
      window.localStorage.setItem(`${storagePrefix}${next.id}`, JSON.stringify(next));
      if (isNew) window.localStorage.setItem(activeKey, next.id);
      setStorageError(false);
    } catch {
      setStorageError(true);
      if (isNew) return;
    }
    showSession(next);
  }, [activeKey, showSession, storagePrefix]);

  const apply = useCallback((action: Parameters<typeof updateExamSession>[1]) => {
    const current = latest.current;
    if (!current) return;
    let base = current;
    try {
      const stored = readSession(`${storagePrefix}${current.id}`);
      if (stored && stored.events.length >= current.events.length) base = stored;
    } catch {
      // Keep the current snapshot while storage is unavailable.
    }
    const time = Date.now();
    setNow(time);
    const next = updateExamSession(base, action, time);
    if (next !== base) persist(next);
    else if (base !== current) showSession(base);
  }, [persist, showSession, storagePrefix]);

  useEffect(() => {
    const time = Date.now();
    setNow(time);
    try {
      const id = window.localStorage.getItem(activeKey);
      const stored = id ? readSession(`${storagePrefix}${id}`) : null;
      if (stored) {
        const resumed = updateExamSession(stored, { type: 'resumed' }, time);
        if (resumed === stored) showSession(stored);
        else persist(resumed);
      }
    } catch {
      setStorageError(true);
    }
    setReady(true);

    const sync = (event: StorageEvent) => {
      if (!event.key?.startsWith(storagePrefix)) return;
      try {
        const active = window.localStorage.getItem(activeKey);
        if (event.key !== activeKey && event.key !== `${storagePrefix}${active}`) return;
        showSession(active ? readSession(`${storagePrefix}${active}`) : null);
        setNow(Date.now());
      } catch {
        setStorageError(true);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [activeKey, persist, showSession, storagePrefix]);

  const active = Boolean(session && !session.finished);
  useEffect(() => {
    if (!active) return;
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (latest.current && time >= latest.current.deadline) apply({ type: 'tick' });
    };
    const timer = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [active, apply]);

  const page = Math.max(0, Math.min(session?.page ?? 0, questions.length - 1));
  const finished = Boolean(session?.finished);
  useEffect(() => {
    if (active || finished) {
      window.scrollTo(0, 0);
      pageHeading.current?.focus({ preventScroll: true });
    }
  }, [active, finished, page]);

  const recordScore = useCallback((questionId: string, earned: number) => {
    setScores((previous) => previous[questionId] === earned
      ? previous
      : { ...previous, [questionId]: earned });
  }, []);

  const answered = questions.filter(({ id }) => hasExamAnswer(session?.answers[id])).length;
  const maxScore = questions.reduce((total, question) => total + question.points, 0);
  const totalScore = questions.reduce((total, question) => total + (scores[question.id] ?? 0), 0);
  const question = questions[page];
  const seconds = session ? Math.max(0, Math.ceil((session.deadline - now) / 1000)) : 0;

  return (
    <main className="exam-page" data-active={active}>
      <div className="exam-frame">
        <header className="exam-top">
          <div>
            <p className="exam-kicker">Modo examen</p>
            <h1>{title}</h1>
          </div>
          {active && (
            <div className="exam-top-actions">
              <span className="exam-timer" data-low={seconds < 60} role="timer" aria-label="Tiempo restante">{formatTime(seconds)}</span>
              <button className="exam-primary" type="button" onClick={() => deliveryDialog.current?.showModal()}>
                Entregar
              </button>
            </div>
          )}
        </header>

        {storageError && (
          <p className="exam-notice" role="alert">
            No se pudo guardar en este navegador. Si ya comenzaste, mantén abierta la página mientras se vuelve a intentar al responder.
          </p>
        )}

        {!ready ? <p role="status" className="exam-panel">Preparando el examen…</p>
          : !session ? (
            <form className="exam-panel" onSubmit={(event) => {
              event.preventDefault();
              if (!questions.length || !Number.isInteger(minutes) || minutes < 1 || minutes > 180) return;
              const time = Date.now();
              setNow(time);
              setScores({});
              persist(startExamSession(crypto.randomUUID(), minutes, time), true);
            }}>
              <h2>Antes de empezar</h2>
              <p>{questions.length} preguntas. Podrás avanzar, volver y cambiar tus respuestas hasta entregar el examen o hasta que se acabe el tiempo.</p>
              <p>El intento se guarda en este navegador. El reloj sigue corriendo aunque cierres la página.</p>
              <label className="exam-duration">
                Duración en minutos
                <input type="number" min={1} max={180} step={1} required value={Number.isNaN(minutes) ? '' : minutes}
                  onChange={(event) => setMinutes(event.currentTarget.valueAsNumber)} />
              </label>
              <button className="exam-primary" type="submit" disabled={!questions.length}>Iniciar examen</button>
            </form>
          ) : session.finished ? (
            <>
              <section className="exam-panel">
                <h2 ref={pageHeading} tabIndex={-1}>Resultados del examen</h2>
                <p>{session.finished.reason === 'expired' ? 'Se acabó el tiempo. Se entregaron las respuestas guardadas.' : 'Examen entregado.'}</p>
                <p>{answered} de {questions.length} preguntas con respuesta · <strong>{totalScore} de {maxScore} puntos</strong></p>
                <button className="exam-secondary" type="button" onClick={() => {
                  try {
                    window.localStorage.removeItem(activeKey);
                    showSession(null);
                  } catch {
                    setStorageError(true);
                  }
                }}>Preparar otro intento</button>
              </section>
              <div className="exam-review">
                {questions.map((entry, index) => {
                  const answer = session.answers[entry.id];
                  const hasAnswer = hasExamAnswer(answer);
                  return (
                    <details key={entry.id}>
                      <summary>
                        <span>{index + 1}. {entry.title}</span>
                        <span>{hasAnswer ? `${scores[entry.id] ?? 0}/${entry.points} pts` : 'Sin responder'}</span>
                      </summary>
                      {hasAnswer ? <ExamQuestionView question={entry} brand={brand} answer={answer} mode="review" reportScore={recordScore} />
                        : <p className="exam-empty">No se guardó una respuesta para esta pregunta.</p>}
                    </details>
                  );
                })}
              </div>
            </>
          ) : question ? (
            <>
              <div className="exam-progress">
                <h2 ref={pageHeading} tabIndex={-1}>Pregunta {page + 1} de {questions.length}</h2>
                <span>{answered} con respuesta</span>
              </div>
              <ExamQuestionViewport key={question.id}>
                <ExamQuestionView
                  question={question}
                  brand={brand}
                  answer={session.answers[question.id]}
                  mode="exam"
                  saveAnswer={(answer) => apply({ type: 'answer', questionId: question.id, answer })}
                />
              </ExamQuestionViewport>
              <nav className="exam-nav" aria-label="Navegación del examen">
                <button className="exam-secondary" type="button" disabled={page === 0}
                  onClick={() => apply({ type: 'page', page: page - 1 })}>← Anterior</button>
                <button className="exam-primary" type="button" disabled={page === questions.length - 1}
                  onClick={() => apply({ type: 'page', page: page + 1 })}>Siguiente →</button>
              </nav>
              <dialog
                ref={deliveryDialog}
                className="exam-dialog"
                aria-labelledby="exam-delivery-title"
                aria-describedby="exam-delivery-description"
              >
                <h2 id="exam-delivery-title">¿Entregar el examen?</h2>
                <p id="exam-delivery-description">{answered < questions.length
                  ? `Preguntas sin responder: ${questions.length - answered}. Después de entregar, verás tus resultados.`
                  : 'Después de entregar, verás tus resultados y tus respuestas quedarán cerradas.'}</p>
                <div className="exam-dialog-actions">
                  <button className="exam-secondary" type="button" autoFocus onClick={() => deliveryDialog.current?.close()}>
                    Seguir respondiendo
                  </button>
                  <button className="exam-primary" type="button" onClick={() => {
                    deliveryDialog.current?.close();
                    apply({ type: 'submit' });
                  }}>Confirmar entrega</button>
                </div>
              </dialog>
            </>
          ) : null}
      </div>
    </main>
  );
}
