import type {
  BrandPreset,
  ScenarioQuizOrderingBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';

export interface WidgetScenarioQuizOrderingProps {
  blockId: string;
  data: ScenarioQuizOrderingBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizOrdering({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizOrderingProps) {
  const [order, setOrder] = useQuizAnswer(() => data.steps.map((step) => step.id));
  const { submitted, setSubmitted, mode } = useQuizSubmission();
  const orderedSteps = order.flatMap((id) => data.steps.filter((step) => step.id === id));

  const moveStep = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= orderedSteps.length) return;
    setSubmitted(false);
    const next = [...orderedSteps];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setOrder(next.map((step) => step.id));
  };

  const correctCount = orderedSteps.filter(
    (st, idx) => st.correctPosition === idx + 1
  ).length;
  const isAllCorrect = correctCount === orderedSteps.length;
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, orderedSteps.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = orderedSteps.filter((st, idx) => st.correctPosition === idx + 1).length;
    const pts = Math.round((right / Math.max(1, orderedSteps.length)) * data.points);
    onScoreChange?.(blockId, pts, data.points);
  };

  return (
    <QuizCardShell
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={earnedPoints}
      submitted={submitted}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {orderedSteps.map((step, idx) => {
          const isPositionRight = step.correctPosition === idx + 1;
          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '8px',
                border: submitted
                  ? isPositionRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: submitted
                      ? isPositionRight
                        ? '#10B981'
                        : '#EF4444'
                      : brand.primary,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}°
                </span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                    {step.text}
                  </div>
                  {submitted && (
                    <div
                      style={{
                        fontSize: '12px',
                        marginTop: '4px',
                        color: isPositionRight ? '#047857' : '#B91C1C',
                        fontWeight: 600,
                      }}
                    >
                      {isPositionRight
                        ? `✓ Posición correcta (${step.hint})`
                        : `✕ Debería ir en el paso ${step.correctPosition}° (${step.hint})`}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => moveStep(idx, -1)}
                  disabled={idx === 0}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: idx === 0 ? '#CBD5E1' : '#0F172A',
                    fontWeight: 900,
                    cursor: idx === 0 ? 'not-allowed' : 'pointer',
                  }}
                  title="Subir paso"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(idx, 1)}
                  disabled={idx === orderedSteps.length - 1}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: idx === orderedSteps.length - 1 ? '#CBD5E1' : '#0F172A',
                    fontWeight: 900,
                    cursor: idx === orderedSteps.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                  title="Bajar paso"
                >
                  ↓
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {mode === 'exam' && (
        <button type="button" className="exam-secondary" onClick={() => setOrder(order)}>
          Guardar este orden
        </button>
      )}
      {submitted && (
        <div
          style={{
            marginTop: '18px',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: isAllCorrect ? '#ECFDF5' : '#FEF3C7',
            color: isAllCorrect ? '#065F46' : '#92400E',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          {isAllCorrect
            ? '✓ ¡Secuencia perfecta! Has ordenado el protocolo de respuesta en el orden exacto.'
            : `Has acertado ${correctCount} de ${orderedSteps.length} posiciones. Ajusta los pasos con ↑ y ↓.`}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button data-quiz-check
          type="button"
          onClick={handleVerify}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Validar Orden del Protocolo
        </button>
      </div>
    </QuizCardShell>
  );
}

