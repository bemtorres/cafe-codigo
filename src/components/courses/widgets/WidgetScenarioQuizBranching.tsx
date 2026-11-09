import type {
  BrandPreset,
  ScenarioQuizBranchingBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';

export interface WidgetScenarioQuizBranchingProps {
  blockId: string;
  data: ScenarioQuizBranchingBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizBranching({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizBranchingProps) {
  const [path, setPath] = useQuizAnswer<string[]>([]);
  const { mode } = useQuizSubmission();
  const showFeedback = mode !== 'exam';
  let currentNode = data.nodes.find((node) => node.id === data.initialNodeId);
  let finishedScore: number | null = null;
  const history = [];

  for (const id of path) {
    const choice = currentNode?.choices.find((entry) => entry.id === id);
    if (!choice) break;
    history.push(choice);
    if (!choice.nextNodeId) {
      finishedScore = Math.round((choice.impactScore / 100) * data.points);
      break;
    }
    currentNode = data.nodes.find((node) => node.id === choice.nextNodeId);
  }

  const handlePickChoice = (choice: NonNullable<typeof currentNode>['choices'][number]) => {
    setPath([...path, choice.id]);
    if (!choice.nextNodeId) {
      onScoreChange?.(blockId, Math.round((choice.impactScore / 100) * data.points), data.points);
    }
  };

  const resetBranching = () => {
    setPath([]);
    onScoreChange?.(blockId, 0, data.points);
  };

  return (
    <QuizCardShell
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={finishedScore ?? 0}
      submitted={mode === 'review' || (showFeedback && finishedScore !== null)}
    >
      {/* Historial de decisiones tomadas */}
      {history.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {history.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: !showFeedback ? '#F8FAFC' : h.isOptimal ? '#ECFDF5' : '#FEF3C7',
                borderLeft: `4px solid ${!showFeedback ? '#CBD5E1' : h.isOptimal ? '#10B981' : '#F59E0B'}`,
                fontSize: '13px',
              }}
            >
              <div style={{ fontWeight: 800, color: '#0F172A' }}>
                Decisión {i + 1}: {h.label}
              </div>
              {showFeedback && (
                <div style={{ color: '#334155', marginTop: '4px' }}>
                  ↳ <strong>Consecuencia:</strong> {h.consequenceText}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Nodo activo o resultado final */}
      {finishedScore === null && currentNode ? (
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '24px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '4px',
              backgroundColor: brand.primary,
              fontSize: '10.5px',
              fontWeight: 900,
              marginBottom: '10px',
            }}
          >
            {currentNode.stageLabel}
          </span>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#F8FAFC',
              margin: '0 0 18px 0',
              fontWeight: 600,
            }}
          >
            {currentNode.narrative}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentNode.choices.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => handlePickChoice(ch)}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#1E293B',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ▸ {ch.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A' }}>
              {mode === 'exam' ? 'Decisiones guardadas' : 'Simulación de rol finalizada'}
            </div>
            {showFeedback && (
              <div style={{ fontSize: '13px', color: '#475569' }}>
                Puntaje alcanzado en este árbol de decisión: {finishedScore} de {data.points} pts.
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={resetBranching}
            style={{
              padding: '9px 20px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: brand.primary,
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            {mode === 'exam' ? 'Cambiar decisiones' : '↺ Explorar otra rama de decisión'}
          </button>
        </div>
      )}
    </QuizCardShell>
  );
}

