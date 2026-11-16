import type {
  BrandPreset,
  ScenarioQuizMultipleBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';

export interface WidgetScenarioQuizMultipleProps {
  blockId: string;
  data: ScenarioQuizMultipleBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizMultiple({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizMultipleProps) {
  const [selectedIds, setSelectedIds] = useQuizAnswer<string[]>([]);
  const { submitted, setSubmitted } = useQuizSubmission();

  const toggleOption = (id: string) => {
    setSubmitted(false);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const correctIds = data.options.filter((o) => o.isCorrect).map((o) => o.id);
  const isPerfect =
    selectedIds.length === correctIds.length &&
    correctIds.every((id) => selectedIds.includes(id));

  const earnedPoints = submitted ? (isPerfect ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const perfect =
      selectedIds.length === correctIds.length &&
      correctIds.every((id) => selectedIds.includes(id));
    onScoreChange?.(blockId, perfect ? data.points : 0, data.points);
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
      <div
        style={{
          fontSize: '12px',
          fontWeight: 800,
          color: '#334155',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>☑ {data.instruction}</span>
        <span style={{ color: brand.primary }}>
          {selectedIds.length} seleccionada(s)
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.options.map((opt) => {
          const isChecked = selectedIds.includes(opt.id);
          const showResult = submitted;
          const borderColor = showResult
            ? opt.isCorrect
              ? '#10B981'
              : isChecked
                ? '#EF4444'
                : '#E2E8F0'
            : isChecked
              ? brand.primary
              : '#E2E8F0';

          return (
            <div
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleOption(opt.id);
                }
              }}
              style={{
                padding: '16px 18px',
                borderRadius: '8px',
                border: `2px solid ${borderColor}`,
                backgroundColor: isChecked ? '#F8FAFC' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span
                  style={{
                    marginTop: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    backgroundColor: isChecked ? brand.primary : '#FFFFFF',
                    border: isChecked ? 'none' : '2px solid #94A3B8',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {isChecked ? '✓' : ''}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#0F172A',
                      lineHeight: 1.45,
                    }}
                  >
                    {opt.text}
                  </div>
                  {showResult && (
                    <div
                      style={{
                        marginTop: '6px',
                        fontSize: '12.5px',
                        color: opt.isCorrect ? '#047857' : '#B91C1C',
                        fontWeight: 600,
                      }}
                    >
                      {opt.isCorrect ? '✓ Requerido: ' : '✕ Distractor: '}
                      {opt.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '20px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: isPerfect ? '#ECFDF5' : '#FEF2F2',
            border: isPerfect ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
            color: isPerfect ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {isPerfect ? data.successFeedback : data.errorFeedback}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={() => {
            setSelectedIds([]);
            setSubmitted(false);
            onScoreChange?.(blockId, 0, data.points);
          }}
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          Reiniciar
        </button>
        <button data-quiz-check
          type="button"
          onClick={handleVerify}
          disabled={selectedIds.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
            opacity: selectedIds.length > 0 ? 1 : 0.5,
          }}
        >
          Verificar Selección Múltiple
        </button>
      </div>
    </QuizCardShell>
  );
}

