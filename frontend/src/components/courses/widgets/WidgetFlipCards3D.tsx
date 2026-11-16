import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { BrandPreset, FlipCards3DBlockData } from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';

export interface WidgetFlipCards3DProps {
  data: FlipCards3DBlockData;
  brand: BrandPreset;
}

interface FullscreenZoomState {
  src: string;
  alt: string;
  title: string;
  caption?: string;
  apaCitation?: string;
}

export function WidgetFlipCards3D({ data, brand }: WidgetFlipCards3DProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [zoomState, setZoomState] = useState<FullscreenZoomState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!zoomState) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomState(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomState]);

  const handleOpenZoom = (
    e: React.MouseEvent,
    imgData: { src: string; alt: string; title: string; caption?: string; apaCitation?: string }
  ) => {
    e.stopPropagation(); // Evita que la tarjeta gire al hacer zoom en la imagen
    setZoomState(imgData);
  };

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
            card.frontImageUrl || card.backImageUrl || hasAnyImage ? '405px' : '270px';

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
                      <div
                        style={{
                          position: 'relative',
                          marginBottom: '12px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#0F172A',
                        }}
                      >
                        <img
                          src={card.frontImageUrl}
                          alt={card.frontImageCaption || card.title}
                          style={{
                            width: '100%',
                            height: '130px',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />

                        {/* Botón de lupa para abrir zoom en pantalla completa sin girar la tarjeta */}
                        <button
                          type="button"
                          onClick={(e) =>
                            handleOpenZoom(e, {
                              src: card.frontImageUrl!,
                              alt: card.frontImageCaption || card.title,
                              title: `${card.title} (Frente)`,
                              caption: card.frontImageCaption || card.frontQuestion,
                              apaCitation: card.frontApaCitation,
                            })
                          }
                          title="Ampliar imagen a pantalla completa (Zoom)"
                          style={{
                            position: 'absolute',
                            right: '8px',
                            bottom: '8px',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: '1px solid rgba(255,255,255,0.4)',
                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'zoom-in',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                          }}
                        >
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0zM11 8v6m-3-3h6"
                            />
                          </svg>
                          <span>Zoom</span>
                        </button>
                      </div>
                    )}

                    {card.frontApaCitation && (
                      <div style={{ marginBottom: '8px' }}>
                        <ApaReferenceFooter citation={card.frontApaCitation} />
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
                      <div
                        style={{
                          position: 'relative',
                          marginBottom: card.backCode ? '8px' : '0',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.28)',
                          backgroundColor: '#0F172A',
                        }}
                      >
                        <img
                          src={card.backImageUrl}
                          alt={card.backImageCaption || `${card.title} reverso`}
                          style={{
                            width: '100%',
                            height: card.backCode ? '95px' : '135px',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />

                        {/* Botón de lupa en el reverso sin girar la tarjeta */}
                        <button
                          type="button"
                          onClick={(e) =>
                            handleOpenZoom(e, {
                              src: card.backImageUrl!,
                              alt: card.backImageCaption || `${card.title} reverso`,
                              title: `${card.title} (Reverso)`,
                              caption: card.backImageCaption || card.backRule,
                              apaCitation: card.backApaCitation,
                            })
                          }
                          title="Ampliar imagen de reverso a pantalla completa (Zoom)"
                          style={{
                            position: 'absolute',
                            right: '6px',
                            bottom: '6px',
                            padding: '3px 9px',
                            borderRadius: '999px',
                            border: '1px solid rgba(255,255,255,0.5)',
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            color: '#FFFFFF',
                            fontSize: '10.5px',
                            fontWeight: 800,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'zoom-in',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                          }}
                        >
                          <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0zM11 8v6m-3-3h6"
                            />
                          </svg>
                          <span>Zoom</span>
                        </button>
                      </div>
                    )}

                    {card.backApaCitation && (
                      <div style={{ marginBottom: '8px' }}>
                        <ApaReferenceFooter citation={card.backApaCitation} dark />
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

      {/* MODAL LIGHTBOX DE PANTALLA COMPLETA FUERA DEL CONTEXTO 3D (vía createPortal a document.body) */}
      {mounted && zoomState && createPortal(
        <div
          onClick={(e) => {
            e.stopPropagation();
            setZoomState(null);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '920px',
              maxHeight: '92vh',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6)',
              border: '1px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'default',
            }}
          >
            {/* Cabecera del Lightbox */}
            <div
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    backgroundColor: brand.primary,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                  }}
                >
                  🔍
                </span>
                <span style={{ fontSize: '14px', fontWeight: 800 }}>
                  {zoomState.title}
                </span>
              </div>

              <button
                type="button"
                aria-label="Cerrar imagen ampliada"
                onClick={() => setZoomState(null)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #475569',
                  backgroundColor: '#1E293B',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                ✕ Cerrar
              </button>
            </div>

            {/* Imagen a pantalla completa */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                backgroundColor: '#090D16',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={zoomState.src}
                alt={zoomState.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                }}
              />
            </div>

            {/* Pie con texto y cita APA */}
            {(zoomState.caption || zoomState.apaCitation) && (
              <div
                style={{
                  padding: '14px 24px',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #E2E8F0',
                  fontSize: '13px',
                  color: '#334155',
                  textAlign: 'center',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {zoomState.caption && <div>{zoomState.caption}</div>}
                {zoomState.apaCitation && (
                  <div style={{ marginTop: zoomState.caption ? '8px' : '0' }}>
                    <ApaReferenceFooter citation={zoomState.apaCitation} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

