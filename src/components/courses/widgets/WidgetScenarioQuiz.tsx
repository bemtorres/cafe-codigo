import type { BrandPreset, ScenarioQuizBlockData } from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';

export interface WidgetScenarioQuizProps {
  data: ScenarioQuizBlockData;
  brand: BrandPreset;
  activeScenarioIdx: number;
  onSelectScenarioIdx: (idx: number) => void;
  selectedOptions: Record<string, string>;
  submittedQuestions: Record<string, boolean>;
  onSelectOption: (questionId: string, optionId: string) => void;
  onSubmitQuestion: (questionId: string) => void;
  earnedQuizScore: number;
  maxQuizScore: number;
  onViewReport: (targetId: string) => void;
}

export function WidgetScenarioQuiz({
  data,
  brand,
  activeScenarioIdx,
  onSelectScenarioIdx,
  selectedOptions,
  submittedQuestions,
  onSelectOption,
  onSubmitQuestion,
  earnedQuizScore,
  maxQuizScore,
  onViewReport,
}: WidgetScenarioQuizProps) {
  const questions = data.questions || [];
  const currentQuestion = questions[activeScenarioIdx] || questions[0];
  if (!currentQuestion) return null;

  const chosenOptionId = selectedOptions[currentQuestion.id];
  const isQuestionSubmitted = Boolean(submittedQuestions[currentQuestion.id]);
  const chosenOptionObj = currentQuestion.options.find((o) => o.id === chosenOptionId);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '64px 24px 72px 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {questions.map((q, idx) => {
            const isCurr = idx === activeScenarioIdx;
            const isDone = Boolean(submittedQuestions[q.id]);
            const pickedId = selectedOptions[q.id];
            const isRight = isDone && q.options.find((o) => o.id === pickedId)?.isCorrect;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectScenarioIdx(idx)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: isCurr ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.4)',
                  backgroundColor: isCurr ? '#FFFFFF' : 'rgba(0,0,0,0.2)',
                  color: isCurr ? '#0F172A' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{q.videoUrl ? `▶ Caso ${idx + 1} (Con Video)` : `Caso ${idx + 1}`}</span>
                {isDone && (
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '999px',
                      backgroundColor: isRight ? '#10B981' : '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isRight ? '✓' : '✕'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 800,
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          Puntaje Casos: {earnedQuizScore} / {maxQuizScore} pts
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
          padding: '44px 48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: brand.primary,
              letterSpacing: '0.06em',
            }}
          >
            {currentQuestion.badge}
          </span>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: '#F1F5F9',
              color: '#334155',
            }}
          >
            +{currentQuestion.points} PTS
          </span>
        </div>

        <h3
          style={{
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 800,
            color: '#111827',
            margin: '0 0 12px 0',
          }}
        >
          {currentQuestion.question}
        </h3>

        <p
          style={{
            textAlign: 'center',
            fontSize: '13.5px',
            lineHeight: 1.6,
            color: '#4B5563',
            margin: '0 0 22px 0',
            paddingBottom: '18px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          {currentQuestion.context}
        </p>

        {currentQuestion.videoUrl && (
          <div
            style={{
              marginBottom: '24px',
              backgroundColor: '#0F172A',
              borderRadius: '8px',
              padding: '12px',
              border: `2px solid ${brand.primary}`,
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: brand.primary,
                  }}
                >
                  ▶ VIDEO DEL CASO
                </span>
                <span>Evidencia de Auditoría en Producción</span>
              </span>
              <span style={{ color: '#94A3B8' }}>Observa antes de responder</span>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: '#000000',
              }}
            >
              <iframe
                style={{ width: '100%', height: '100%', border: 0 }}
                src={currentQuestion.videoUrl}
                title={`Video de ${currentQuestion.badge}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {currentQuestion.videoCaption && (
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '11.5px',
                  color: '#CBD5E1',
                  textAlign: 'center',
                }}
              >
                {currentQuestion.videoCaption}
              </div>
            )}

            <ApaReferenceFooter citation={currentQuestion.apaCitation} dark />
          </div>
        )}

        <div>
          {currentQuestion.options.map((opt) => {
            const isSelected = chosenOptionId === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => onSelectOption(currentQuestion.id, opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '18px 20px',
                  backgroundColor: isSelected ? '#F4F5F7' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    marginTop: '3px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '999px',
                    border: isSelected ? `2px solid ${brand.primary}` : '1.5px solid #9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {isSelected && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '999px',
                        backgroundColor: brand.primary,
                      }}
                    />
                  )}
                </span>
                <span
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: '#374151',
                  }}
                >
                  {opt.text}
                </span>
              </label>
            );
          })}
        </div>

        {isQuestionSubmitted && chosenOptionObj && (
          <div
            style={{
              marginTop: '20px',
              padding: '14px 18px',
              borderRadius: '6px',
              backgroundColor: chosenOptionObj.isCorrect ? '#ECFDF5' : '#FEF2F2',
              border: chosenOptionObj.isCorrect ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
              color: chosenOptionObj.isCorrect ? '#065F46' : '#991B1B',
              fontSize: '13px',
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            {chosenOptionObj.feedback}
          </div>
        )}

        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => onSubmitQuestion(currentQuestion.id)}
            disabled={!chosenOptionId}
            style={{
              backgroundColor: brand.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '11px 40px',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: chosenOptionId ? 'pointer' : 'not-allowed',
              opacity: chosenOptionId ? 1 : 0.5,
            }}
          >
            ENVIAR RESPUESTA
          </button>

          {activeScenarioIdx < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => onSelectScenarioIdx(activeScenarioIdx + 1)}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '11px 24px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Siguiente Caso →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewReport(data.reportTargetId || 'widget-report')}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '11px 26px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              📊 VER REPORTE FINAL ↓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

