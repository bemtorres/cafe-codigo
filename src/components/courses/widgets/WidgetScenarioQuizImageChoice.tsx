import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizImageChoiceBlockData,
} from '../../../data/courses/courseJsonTypes';
import { ZoomableFigure, ApaReferenceFooter } from './ZoomableFigure';
import { QuizCardShell } from './QuizCardShell';

export interface WidgetScenarioQuizImageChoiceProps {
  blockId: string;
  data: ScenarioQuizImageChoiceBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizImageChoice({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizImageChoiceProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const chosenCard = data.cards.find((c) => c.id === selectedCardId);
  const earnedPoints = submitted && chosenCard?.isCorrect ? data.points : 0;

  const handleVerify = () => {
    if (!selectedCardId) return;
    setSubmitted(true);
    const card = data.cards.find((c) => c.id === selectedCardId);
    onScoreChange?.(blockId, card?.isCorrect ? data.points : 0, data.points);
  };

  const renderSceneIllustration = (
    visualType: 'clean-desk' | 'sticky-password' | 'unlocked-laptop'
  ) => {
    if (visualType === 'sticky-password') {
      return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <rect width="320" height="180" fill="#FEF2F2" />
          <rect x="65" y="25" width="190" height="115" rx="8" fill="#1E293B" />
          <rect x="75" y="35" width="170" height="90" fill="#334155" />
          <rect x="185" y="95" width="65" height="50" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <text x="192" y="115" fill="#0F172A" fontSize="9" fontWeight="900" fontFamily="monospace">
            PASS:
          </text>
          <text x="192" y="130" fill="#DC2626" fontSize="9.5" fontWeight="900" fontFamily="monospace">
            Admin2026*
          </text>
        </svg>
      );
    }
    if (visualType === 'unlocked-laptop') {
      return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <rect width="320" height="180" fill="#FFFBEB" />
          <rect x="65" y="25" width="190" height="115" rx="8" fill="#0F172A" />
          <rect x="75" y="35" width="170" height="90" fill="#1E293B" />
          <text x="88" y="65" fill="#F87171" fontSize="10" fontWeight="800" fontFamily="monospace">
            root@prod-db:~# SELECT *
          </text>
          <text x="88" y="85" fill="#FDE047" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
            Sesión abierta sin supervisión
          </text>
          <text x="88" y="105" fill="#CBD5E1" fontSize="9" fontFamily="sans-serif">
            (Puesto vacío en cafetería)
          </text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 320 180" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect width="320" height="180" fill="#ECFDF5" />
        <rect x="65" y="25" width="190" height="115" rx="8" fill="#0F172A" />
        <rect x="75" y="35" width="170" height="90" fill="#065F46" />
        <circle cx="160" cy="72" r="16" fill="#10B981" />
        <text x="154" y="77" fill="#FFFFFF" fontSize="14" fontWeight="900">
          🔒
        </text>
        <text x="98" y="108" fill="#D1FAE5" fontSize="10" fontWeight="800" fontFamily="sans-serif">
          PANTALLA BLOQUEADA (MFA)
        </text>
      </svg>
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {data.cards.map((card) => {
          const isSelected = selectedCardId === card.id;
          const borderCol = submitted
            ? card.isCorrect
              ? '#10B981'
              : isSelected
                ? '#EF4444'
                : '#E2E8F0'
            : isSelected
              ? brand.primary
              : '#E2E8F0';

          return (
            <div
              key={card.id}
              onClick={() => {
                setSubmitted(false);
                setSelectedCardId(card.id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSubmitted(false);
                  setSelectedCardId(card.id);
                }
              }}
              style={{
                borderRadius: '10px',
                border: `3px solid ${borderCol}`,
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 10px 25px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <ZoomableFigure
                title={card.label}
                caption={card.caption}
                apaCitation={card.apaCitation}
                brandColor={brand.primary}
                maxWidth="100%"
                clickIconOnly
              >
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.label}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  renderSceneIllustration(card.visualType)
                )}
              </ZoomableFigure>

              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  {card.caption}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ApaReferenceFooter citation={data.apaCitation} />

      {submitted && chosenCard && (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: chosenCard.isCorrect ? '#ECFDF5' : '#FEF2F2',
            border: chosenCard.isCorrect ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
            color: chosenCard.isCorrect ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {chosenCard.feedback}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!selectedCardId}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: selectedCardId ? 'pointer' : 'not-allowed',
            opacity: selectedCardId ? 1 : 0.5,
          }}
        >
          Validar Imagen Seleccionada
        </button>
      </div>
    </QuizCardShell>
  );
}

