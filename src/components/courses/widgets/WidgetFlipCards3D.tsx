import { useState } from 'react';
import type { BrandPreset, FlipCards3DBlockData } from '../../../data/courses/courseJsonTypes';
import { ZoomableFigure } from './ZoomableFigure';

export interface WidgetFlipCards3DProps {
  data: FlipCards3DBlockData;
  brand: BrandPreset;
}

export function WidgetFlipCards3D({ data, brand }: WidgetFlipCards3DProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const hasAnyImage = (data.cards || []).some((c) => Boolean(c.frontImageUrl || c.backImageUrl));

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: brand.primary,
            textTransform: 'uppercase',
          }}
        >
          {data.badge}
        </span>
        <h3
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#0F172A',
            margin: '6px 0 0 0',
          }}
        >
          {data.title}
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px',
        }}
      >
        {data.cards.map((card, i) => {
          const flipped = Boolean(flippedCards[i]);
          const cardHeight =
            card.frontImageUrl || card.backImageUrl || hasAnyImage ? '395px' : '270px';

          return (
            <div
              key={card.title}
              onClick={() => setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }));
                }
              }}
              style={{
                perspective: '1200px',
                height: cardHeight,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* CARA FRONTAL DE LA TARJETA (Inicio) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderTop: `4px solid ${brand.primary}`,
                    borderRadius: '10px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: brand.primaryLight,
                          color: brand.primary,
                        }}
                      >
                        {card.badge}
                      </span>
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '999px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          color: brand.primary,
                          fontWeight: 800,
                        }}
                      >
                        ↻
                      </span>
                    </div>

                    {card.frontImageUrl && (
                      <div style={{ marginBottom: '12px' }}>
                        <ZoomableFigure
                          title={`${card.title} (Frente)`}
                          caption={card.frontImageCaption || card.frontQuestion}
                          apaCitation={card.frontApaCitation}
                          brandColor={brand.primary}
                          maxWidth="100%"
                          clickIconOnly
                        >
                          <img
                            src={card.frontImageUrl}
                            alt={card.title}
                            style={{
                              width: '100%',
                              height: '126px',
                              objectFit: 'cover',
                              display: 'block',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                            }}
                          />
                        </ZoomableFigure>
                      </div>
                    )}

                    <h4
                      style={{
                        fontSize: '17.5px',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {card.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#1E293B',
                        lineHeight: 1.42,
                        margin: '0 0 6px 0',
                      }}
                    >
                      {card.frontQuestion}
                    </p>

                    <p
                      style={{
                        fontSize: '12px',
                        color: '#64748B',
                        lineHeight: 1.45,
                        margin: 0,
                      }}
                    >
                      {card.frontContext}
                    </p>
                  </div>

                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: brand.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '8px',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <span>Haz clic para voltear</span>
                    <span>→</span>
                  </div>
                </div>

                {/* CARA TRASERA DE LA TARJETA (Al revés) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(145deg, ${brand.primary} 0%, ${brand.primaryDark} 100%)`,
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 16px 32px rgba(15, 23, 42, 0.18)',
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          backgroundColor: 'rgba(0,0,0,0.22)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        ✓ SOLUCIÓN RECOMENDADA
                      </span>
                      <span style={{ fontSize: '12px', opacity: 0.9 }}>↺</span>
                    </div>

                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: 1.45,
                        margin: '0 0 10px 0',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      {card.backRule}
                    </p>

                    {card.backImageUrl && (
                      <div style={{ marginBottom: card.backCode ? '8px' : '0' }}>
                        <ZoomableFigure
                          title={`${card.title} (Reverso)`}
                          caption={card.backImageCaption || card.backRule}
                          apaCitation={card.backApaCitation}
                          brandColor={brand.primary}
                          maxWidth="100%"
                          clickIconOnly
                        >
                          <img
                            src={card.backImageUrl}
                            alt={`${card.title} reverso`}
                            style={{
                              width: '100%',
                              height: card.backCode ? '100px' : '150px',
                              objectFit: 'cover',
                              display: 'block',
                              borderRadius: '6px',
                              border: '1px solid rgba(255,255,255,0.28)',
                            }}
                          />
                        </ZoomableFigure>
                      </div>
                    )}

                    {card.backCode && (
                      <pre
                        style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.88)',
                          color: '#E2E8F0',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          lineHeight: 1.45,
                          fontFamily: '"JetBrains Mono", Consolas, monospace',
                          overflowX: 'auto',
                          margin: 0,
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        <code>{card.backCode}</code>
                      </pre>
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.92)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(255,255,255,0.18)',
                    }}
                  >
                    <span>{card.title}</span>
                    <span>↺ Volver</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

