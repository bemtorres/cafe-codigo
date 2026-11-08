import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizBranchingBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';

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
  const [currentNodeId, setCurrentNodeId] = useState(data.initialNodeId);
  const [history, setHistory] = useState<
    { nodeId: string; choiceLabel: string; consequence: string; isOptimal: boolean }[]
  >([]);
  const [finishedScore, setFinishedScore] = useState<number | null>(null);

  const currentNode =
    data.nodes.find((n) => n.id === currentNodeId) || data.nodes[0];

  const handlePickChoice = (choice: {
    id: string;
    label: string;
    consequenceText: string;
    nextNodeId?: string;
    impactScore: number;
    isOptimal: boolean;
  }) => {
    const nextHistory = [
      ...history,
      {
        nodeId: currentNode.id,
        choiceLabel: choice.label,
        consequence: choice.consequenceText,
        isOptimal: choice.isOptimal,
      },
    ];
    setHistory(nextHistory);

    if (choice.nextNodeId) {
      setCurrentNodeId(choice.nextNodeId);
    } else {
      const earned = Math.round((choice.impactScore / 100) * data.points);
      setFinishedScore(earned);
      onScoreChange?.(blockId, earned, data.points);
    }
  };

  const resetBranching = () => {
    setCurrentNodeId(data.initialNodeId);
    setHistory([]);
    setFinishedScore(null);
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
      submitted={finishedScore !== null}
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
                backgroundColor: h.isOptimal ? '#ECFDF5' : '#FEF3C7',
                borderLeft: `4px solid ${h.isOptimal ? '#10B981' : '#F59E0B'}`,
                fontSize: '13px',
              }}
            >
              <div style={{ fontWeight: 800, color: '#0F172A' }}>
                Decisión {i + 1}: {h.choiceLabel}
              </div>
              <div style={{ color: '#334155', marginTop: '4px' }}>
                ↳ <strong>Consecuencia:</strong> {h.consequence}
              </div>
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
              Simulación de Rol Finalizada
            </div>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              Puntaje alcanzado en este árbol de decisión: {finishedScore} de {data.points} pts.
            </div>
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
            ↺ Explorar otra rama de decisión
          </button>
        </div>
      )}
    </QuizCardShell>
  );
}

