import { useState } from 'react';
import type { BrandPreset, SlideCardsBlockData } from '../../../data/courses/courseJsonTypes';
import { ZoomableFigure, ApaReferenceFooter } from './ZoomableFigure';
import { SlideIllustration } from './SlideIllustration';

export interface WidgetSlideCardsProps {
  data: SlideCardsBlockData;
  brand: BrandPreset;
}

export function WidgetSlideCards({ data, brand }: WidgetSlideCardsProps) {
  const cards = data.cards || [];
  const [currentSlide, setCurrentSlide] = useState(
    typeof data.initialSlideIndex === 'number' && data.initialSlideIndex < cards.length
      ? data.initialSlideIndex
      : 0
  );

  const activeCard = cards[currentSlide] || cards[0];
  if (!activeCard) return null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1))}
          aria-label="Anterior"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '999px',
            backgroundColor: '#0F1115',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '650px',
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            boxShadow: '0 14px 36px rgba(0, 0, 0, 0.08)',
            padding: '44px 48px 40px 48px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: brand.primary,
              color: '#FFFFFF',
              padding: '7px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            }}
          >
            {activeCard.step}
          </div>

          <h3
            style={{
              fontSize: '25px',
              fontWeight: 800,
              color: '#111827',
              margin: '0 0 24px 0',
            }}
          >
            {activeCard.title}
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '26px',
            }}
          >
            {activeCard.videoUrl ? (
              <div
                style={{
                  width: '100%',
                  maxWidth: '540px',
                  backgroundColor: '#0F172A',
                  borderRadius: '8px',
                  padding: '10px',
                  border: `2px solid ${brand.primary}`,
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.14)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    color: '#FFFFFF',
                    fontSize: '10.5px',
                    fontWeight: 800,
                  }}
                >
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: brand.primary,
                    }}
                  >
                    ▶ VIDEO EN SLIDE · {activeCard.step}
                  </span>
                  <span style={{ color: '#94A3B8' }}>Cápsula audiovisual del paso</span>
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
                    src={activeCard.videoUrl}
                    title={`Video de ${activeCard.step}: ${activeCard.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {activeCard.videoCaption && (
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '11.5px',
                      color: '#CBD5E1',
                      textAlign: 'center',
                    }}
                  >
                    {activeCard.videoCaption}
                  </div>
                )}

                <ApaReferenceFooter citation={activeCard.apaCitation} dark />
              </div>
            ) : (
              <ZoomableFigure
                title={`${activeCard.step} · ${activeCard.title}`}
                caption={`${activeCard.bodyBefore}${activeCard.highlight} ${activeCard.bodyAfter}`}
                apaCitation={activeCard.apaCitation}
                brandColor={brand.primary}
                maxWidth="460px"
              >
                <SlideIllustration type={activeCard.illustration} brandColor={brand.primary} />
              </ZoomableFigure>
            )}
          </div>

          <p
            style={{
              textAlign: 'center',
              fontSize: '15.5px',
              lineHeight: 1.6,
              color: '#1F2937',
              margin: '0 auto',
              maxWidth: '520px',
            }}
          >
            {activeCard.bodyBefore}
            <strong style={{ color: brand.primary, fontWeight: 700 }}>{activeCard.highlight}</strong>{' '}
            {activeCard.bodyAfter}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1))}
          aria-label="Siguiente"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '999px',
            backgroundColor: '#0F1115',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          marginTop: '28px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#4B5563', fontWeight: 700 }}>›</span>
        {cards.map((s, idx) => {
          const active = idx === currentSlide;
          const hasVideo = Boolean(s.videoUrl);
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              title={hasVideo ? `${s.step}: ${s.title} (Incluye Video)` : `${s.step}: ${s.title}`}
              style={{
                minWidth: hasVideo ? '46px' : '28px',
                height: '28px',
                padding: hasVideo ? '0 8px' : '0',
                borderRadius: '999px',
                border: active
                  ? `1.8px solid ${hasVideo ? brand.primary : '#1F2937'}`
                  : hasVideo
                    ? `1px dashed ${brand.primary}`
                    : 'none',
                backgroundColor: active ? '#FFFFFF' : 'transparent',
                color: hasVideo ? brand.primary : '#1F2937',
                fontSize: '12.5px',
                fontWeight: active || hasVideo ? 800 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <span>{idx + 1}</span>
              {hasVideo && <span style={{ fontSize: '9px' }}>▶</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

