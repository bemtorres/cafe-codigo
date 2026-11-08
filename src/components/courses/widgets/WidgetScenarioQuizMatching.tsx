import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizMatchingBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';

export interface WidgetScenarioQuizMatchingProps {
  blockId: string;
  data: ScenarioQuizMatchingBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizMatching({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizMatchingProps) {
  const [selectedMatches, setSelectedMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const rightOptions = data.pairs.map((p) => p.rightMatch);

  const correctCount = data.pairs.filter(
    (p) => selectedMatches[p.id] === p.rightMatch
  ).length;
  const allSelected = data.pairs.every((p) => Boolean(selectedMatches[p.id]));
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, data.pairs.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = data.pairs.filter((p) => selectedMatches[p.id] === p.rightMatch).length;
    const pts = Math.round((right / Math.max(1, data.pairs.length)) * data.points);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.pairs.map((pair) => {
          const picked = selectedMatches[pair.id] || '';
          const isRight = picked === pair.rightMatch;
          return (
            <div
              key={pair.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: submitted
                  ? isRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : '1px solid #E2E8F0',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: brand.primary,
                    textTransform: 'uppercase',
                  }}
                >
                  {pair.leftBadge}
                </span>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {pair.leftPrompt}
                </div>
              </div>

              <div>
                <select
                  value={picked}
                  onChange={(e) => {
                    setSubmitted(false);
                    setSelectedMatches((prev) => ({
                      ...prev,
                      [pair.id]: e.target.value,
                    }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1E293B',
                  }}
                >
                  <option value="">— Selecciona el control o responsable —</option>
                  {rightOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {submitted && !isRight && (
                  <div style={{ fontSize: '11.5px', color: '#B91C1C', fontWeight: 700, marginTop: '4px' }}>
                    Correcto: {pair.rightMatch}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!allSelected}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allSelected ? 'pointer' : 'not-allowed',
            opacity: allSelected ? 1 : 0.5,
          }}
        >
          Verificar Emparejamiento
        </button>
      </div>
    </QuizCardShell>
  );
}

