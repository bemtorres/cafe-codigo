import { useState } from 'react';
import type { BrandPreset, CodeWalkthroughBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetCodeWalkthroughProps {
  data: CodeWalkthroughBlockData;
  brand: BrandPreset;
}

export function WidgetCodeWalkthrough({ data, brand }: WidgetCodeWalkthroughProps) {
  const [activeCodeStep, setActiveCodeStep] = useState(0);
  const steps = data.steps || [];
  const currentCodeObj = steps[activeCodeStep] || steps[0];

  if (!currentCodeObj) return null;

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            backgroundColor: brand.primaryLight,
            color: brand.primary,
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {data.sectionBadge}
        </span>
        <h3
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#1E293B',
            margin: 0,
          }}
        >
          {data.sectionTitle}
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {steps.map((st, idx) => {
                const isCurr = idx === activeCodeStep;
                return (
                  <button
                    key={st.stepNumber}
                    type="button"
                    onClick={() => setActiveCodeStep(idx)}
                    style={{
                      flex: 1,
                      padding: '8px 6px',
                      borderRadius: '6px',
                      border: isCurr ? `2px solid ${brand.primary}` : '1px solid #E2E8F0',
                      backgroundColor: isCurr ? brand.primary : '#F8FAFC',
                      color: isCurr ? '#FFFFFF' : '#475569',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Paso {st.stepNumber}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: brand.primary,
                letterSpacing: '0.05em',
                marginBottom: '6px',
              }}
            >
              {currentCodeObj.badge}
            </div>

            <h4
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#0F172A',
                margin: '0 0 12px 0',
              }}
            >
              {currentCodeObj.title}
            </h4>

            <p
              style={{
                fontSize: '14.5px',
                lineHeight: 1.65,
                color: '#334155',
                margin: '0 0 18px 0',
              }}
            >
              {currentCodeObj.explanation}
            </p>

            <div
              style={{
                padding: '12px 14px',
                borderLeft: `4px solid ${brand.primary}`,
                backgroundColor: '#F8FAFC',
                borderRadius: '0 6px 6px 0',
                fontSize: '13px',
                color: '#1E293B',
                fontWeight: 600,
              }}
            >
              💡 <strong>Regla de oro:</strong> {currentCodeObj.keyTakeaway}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <button
              type="button"
              onClick={() =>
                setActiveCodeStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
              }
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Paso anterior
            </button>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
              Líneas: {currentCodeObj.highlightLines.join(', ')}
            </span>
            <button
              type="button"
              onClick={() =>
                setActiveCodeStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
              }
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: brand.primary,
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Siguiente paso →
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0F172A',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #1E293B',
            boxShadow: '0 14px 32px rgba(15, 23, 42, 0.22)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              backgroundColor: '#1E293B',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #334155',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#EF4444',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#F59E0B',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#10B981',
                }}
              />
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#E2E8F0',
                  fontFamily: 'monospace',
                }}
              >
                {currentCodeObj.fileName}
              </span>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                backgroundColor: brand.primary,
                color: '#FFFFFF',
              }}
            >
              PASO {currentCodeObj.stepNumber} ACTIVO
            </span>
          </div>

          <div
            style={{
              padding: '16px 0',
              fontFamily: '"JetBrains Mono", Consolas, monospace',
              fontSize: '12.5px',
              lineHeight: 1.7,
              overflowX: 'auto',
              flex: 1,
            }}
          >
            {currentCodeObj.codeLines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = currentCodeObj.highlightLines.includes(lineNumber);
              return (
                <div
                  key={lineNumber}
                  style={{
                    display: 'flex',
                    padding: '1px 16px',
                    backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.11)' : 'transparent',
                    borderLeft: isHighlighted
                      ? `4px solid ${brand.primary}`
                      : '4px solid transparent',
                    opacity: isHighlighted ? 1 : 0.45,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      userSelect: 'none',
                      color: isHighlighted ? '#FFFFFF' : '#64748B',
                      fontWeight: isHighlighted ? 800 : 400,
                      flexShrink: 0,
                    }}
                  >
                    {lineNumber}
                  </span>
                  <span
                    style={{
                      color: line.trim().startsWith('#')
                        ? '#38BDF8'
                        : isHighlighted
                          ? '#F8FAFC'
                          : '#CBD5E1',
                      whiteSpace: 'pre',
                    }}
                  >
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

