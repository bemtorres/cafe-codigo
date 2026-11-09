import type {
  BrandPreset,
  ScenarioQuizTrueFalseMatrixBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';

export interface WidgetScenarioQuizTrueFalseMatrixProps {
  blockId: string;
  data: ScenarioQuizTrueFalseMatrixBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizTrueFalseMatrix({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizTrueFalseMatrixProps) {
  const [verdicts, setVerdicts] = useQuizAnswer<Record<string, 'cumple' | 'incumple'>>({});
  const { submitted, setSubmitted } = useQuizSubmission();

  const allAnswered = data.statements.every((s) => Boolean(verdicts[s.id]));
  const correctCount = data.statements.filter(
    (s) => verdicts[s.id] === s.correctVerdict
  ).length;
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, data.statements.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = data.statements.filter((s) => verdicts[s.id] === s.correctVerdict).length;
    const pts = Math.round((right / Math.max(1, data.statements.length)) * data.points);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.statements.map((row) => {
          const picked = verdicts[row.id];
          const isRight = picked === row.correctVerdict;

          return (
            <div
              key={row.id}
              style={{
                padding: '16px 18px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: submitted
                  ? isRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : '1px solid #E2E8F0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: brand.primary,
                      textTransform: 'uppercase',
                    }}
                  >
                    {row.ruleReference}
                  </span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {row.statement}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['cumple', 'incumple'] as const).map((optionVal) => {
                    const active = picked === optionVal;
                    return (
                      <button
                        key={optionVal}
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setVerdicts((prev) => ({ ...prev, [row.id]: optionVal }));
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: active
                            ? `2px solid ${optionVal === 'cumple' ? '#059669' : '#DC2626'}`
                            : '1px solid #CBD5E1',
                          backgroundColor: active
                            ? optionVal === 'cumple'
                              ? '#059669'
                              : '#DC2626'
                            : '#FFFFFF',
                          color: active ? '#FFFFFF' : '#334155',
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                        }}
                      >
                        {optionVal === 'cumple' ? '✓ Cumple' : '✕ Incumple'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isRight ? '#047857' : '#B91C1C',
                  }}
                >
                  {isRight ? '✓ Dictamen correcto: ' : '✕ Dictamen incorrecto: '}
                  {row.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button data-quiz-check
          type="button"
          onClick={handleVerify}
          disabled={!allAnswered}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            opacity: allAnswered ? 1 : 0.5,
          }}
        >
          Emitir Dictamen de Matriz
        </button>
      </div>
    </QuizCardShell>
  );
}

