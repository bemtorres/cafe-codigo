import type {
  BrandPreset,
  ScenarioQuizFillBlankBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';

export interface WidgetScenarioQuizFillBlankProps {
  blockId: string;
  data: ScenarioQuizFillBlankBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizFillBlank({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizFillBlankProps) {
  const [answers, setAnswers] = useQuizAnswer<Record<string, string>>({});
  const { submitted, setSubmitted } = useQuizSubmission();

  const blankSegments = data.segments.filter((s) => s.type === 'blank' && s.blankId);
  const allFilled = blankSegments.every((b) => Boolean(b.blankId && answers[b.blankId]));
  const correctBlanks = blankSegments.filter(
    (b) => b.blankId && answers[b.blankId] === b.correctAnswer
  ).length;
  const isAllCorrect = correctBlanks === blankSegments.length;
  const earnedPoints = submitted
    ? Math.round((correctBlanks / Math.max(1, blankSegments.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = blankSegments.filter(
      (b) => b.blankId && answers[b.blankId] === b.correctAnswer
    ).length;
    const pts = Math.round((right / Math.max(1, blankSegments.length)) * data.points);
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
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '8px',
          backgroundColor: data.codeMode ? '#0F172A' : '#F8FAFC',
          color: data.codeMode ? '#E2E8F0' : '#1E293B',
          border: '1px solid #CBD5E1',
          fontFamily: data.codeMode
            ? '"JetBrains Mono", Consolas, monospace'
            : 'system-ui, sans-serif',
          fontSize: data.codeMode ? '13.5px' : '15.5px',
          lineHeight: 2.1,
        }}
      >
        {data.segments.map((seg, idx) => {
          if (seg.type === 'text') {
            return <span key={idx}>{seg.text}</span>;
          }
          const bId = seg.blankId || `blank-${idx}`;
          const val = answers[bId] || '';
          const isRight = val === seg.correctAnswer;

          return (
            <select
              key={bId}
              value={val}
              onChange={(e) => {
                setSubmitted(false);
                setAnswers((prev) => ({ ...prev, [bId]: e.target.value }));
              }}
              style={{
                margin: '0 6px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: submitted
                  ? isRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : `2px solid ${brand.primary}`,
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '13px',
              }}
            >
              <option value="">[ Seleccionar... ]</option>
              {(seg.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        })}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: isAllCorrect ? '#ECFDF5' : '#FEF2F2',
            color: isAllCorrect ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {isAllCorrect ? data.feedbackSuccess : data.feedbackError}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button data-quiz-check
          type="button"
          onClick={handleVerify}
          disabled={!allFilled}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allFilled ? 'pointer' : 'not-allowed',
            opacity: allFilled ? 1 : 0.5,
          }}
        >
          Validar Respuestas Completadas
        </button>
      </div>
    </QuizCardShell>
  );
}

