import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizHotspotSpotterBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';

export interface WidgetScenarioQuizHotspotSpotterProps {
  blockId: string;
  data: ScenarioQuizHotspotSpotterBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizHotspotSpotter({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizHotspotSpotterProps) {
  const [flaggedLines, setFlaggedLines] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleLine = (lineNumber: number) => {
    setSubmitted(false);
    setFlaggedLines((prev) =>
      prev.includes(lineNumber)
        ? prev.filter((l) => l !== lineNumber)
        : [...prev, lineNumber]
    );
  };

  const vulnerableLineNumbers = data.lines
    .filter((l) => l.isVulnerable)
    .map((l) => l.lineNumber);

  const isPerfect =
    flaggedLines.length === vulnerableLineNumbers.length &&
    vulnerableLineNumbers.every((ln) => flaggedLines.includes(ln));

  const earnedPoints = submitted ? (isPerfect ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const perfect =
      flaggedLines.length === vulnerableLineNumbers.length &&
      vulnerableLineNumbers.every((ln) => flaggedLines.includes(ln));
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
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          fontWeight: 800,
          color: '#334155',
        }}
      >
        <span>🔍 Haz clic sobre las {data.targetVulnerableCount} líneas vulnerables para marcarlas:</span>
        <span style={{ color: brand.primary }}>
          {flaggedLines.length} / {data.targetVulnerableCount} líneas marcadas
        </span>
      </div>

      <div
        style={{
          backgroundColor: '#0F172A',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #1E293B',
        }}
      >
        <div
          style={{
            backgroundColor: '#1E293B',
            padding: '8px 16px',
            color: '#E2E8F0',
            fontSize: '12px',
            fontFamily: 'monospace',
            fontWeight: 700,
            borderBottom: '1px solid #334155',
          }}
        >
          📄 {data.fileName}
        </div>

        <div style={{ padding: '12px 0', fontFamily: '"JetBrains Mono", Consolas, monospace', fontSize: '12.5px' }}>
          {data.lines.map((line) => {
            const isFlagged = flaggedLines.includes(line.lineNumber);
            const showAudit = submitted && (isFlagged || line.isVulnerable);

            return (
              <div key={line.lineNumber}>
                <div
                  onClick={() => toggleLine(line.lineNumber)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 16px',
                    cursor: 'pointer',
                    backgroundColor: isFlagged ? 'rgba(239, 68, 68, 0.24)' : 'transparent',
                    borderLeft: isFlagged ? '4px solid #EF4444' : '4px solid transparent',
                  }}
                >
                  <span style={{ width: '32px', color: '#64748B', userSelect: 'none' }}>
                    {line.lineNumber}
                  </span>
                  <span style={{ color: '#F8FAFC', whiteSpace: 'pre', flex: 1 }}>
                    {line.codeOrText}
                  </span>
                  {isFlagged && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        backgroundColor: '#EF4444',
                        color: '#FFFFFF',
                        padding: '2px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      🚩 RIESGO MARCADO
                    </span>
                  )}
                </div>

                {showAudit && (
                  <div
                    style={{
                      padding: '6px 16px 6px 48px',
                      backgroundColor: line.isVulnerable
                        ? 'rgba(16, 185, 129, 0.16)'
                        : 'rgba(245, 158, 11, 0.16)',
                      color: line.isVulnerable ? '#6EE7B7' : '#FDE047',
                      fontSize: '11.5px',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {line.isVulnerable
                      ? `✓ Vulnerabilidad real en línea ${line.lineNumber}: ${line.vulnerabilityExplanation}`
                      : `⚠ Falso positivo en línea ${line.lineNumber}: Esta línea es segura.`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={flaggedLines.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: flaggedLines.length > 0 ? 'pointer' : 'not-allowed',
            opacity: flaggedLines.length > 0 ? 1 : 0.5,
          }}
        >
          Auditar Líneas Marcadas
        </button>
      </div>
    </QuizCardShell>
  );
}

