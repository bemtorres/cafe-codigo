import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizRiskSliderBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';

export interface WidgetScenarioQuizRiskSliderProps {
  blockId: string;
  data: ScenarioQuizRiskSliderBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizRiskSlider({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizRiskSliderProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [submitted, setSubmitted] = useState(false);

  const currentLevelObj =
    data.levels.find((l) => l.level === selectedLevel) || data.levels[0];
  const isRight = selectedLevel === data.correctLevel;
  const earnedPoints = submitted ? (isRight ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    onScoreChange?.(
      blockId,
      selectedLevel === data.correctLevel ? data.points : 0,
      data.points
    );
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
          padding: '16px 20px',
          borderRadius: '8px',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          marginBottom: '22px',
          fontSize: '14px',
          lineHeight: 1.55,
          borderLeft: `4px solid ${brand.primary}`,
        }}
      >
        🚨 <strong>Hallazgo reportado:</strong> {data.incidentSummary}
      </div>

      {/* Selector visual de niveles 1..5 + input range */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {data.levels.map((lvl) => {
            const active = lvl.level === selectedLevel;
            return (
              <button
                key={lvl.level}
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedLevel(lvl.level);
                }}
                style={{
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: active ? `2.5px solid ${lvl.color}` : '1px solid #CBD5E1',
                  backgroundColor: active ? lvl.color : '#F8FAFC',
                  color: active ? '#FFFFFF' : '#334155',
                  fontWeight: 900,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>NIVEL {lvl.level}</div>
                <div style={{ fontSize: '10.5px', fontWeight: 700, marginTop: '2px' }}>
                  {lvl.name}
                </div>
              </button>
            );
          })}
        </div>

        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={selectedLevel}
          onChange={(e) => {
            setSubmitted(false);
            setSelectedLevel(Number(e.target.value));
          }}
          style={{ width: '100%', cursor: 'pointer', accentColor: brand.primary }}
        />

        {currentLevelObj && (
          <div
            style={{
              marginTop: '10px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              color: '#1E293B',
            }}
          >
            <strong>Protocolo para Nivel {currentLevelObj.level} ({currentLevelObj.name}):</strong>{' '}
            {currentLevelObj.actionRequired}
          </div>
        )}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '16px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: isRight ? '#ECFDF5' : '#FEF2F2',
            border: isRight ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
            color: isRight ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {isRight
            ? `✓ ¡Calibración exacta (Nivel ${data.correctLevel})! ${data.explanation}`
            : `✕ Calibración incorrecta. Este incidente corresponde a Nivel ${data.correctLevel}. ${data.explanation}`}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
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
          Confirmar Nivel de Severidad
        </button>
      </div>
    </QuizCardShell>
  );
}

