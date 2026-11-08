import type { BrandPreset, HeroBannerBlockData } from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';

export interface WidgetHeroBannerProps {
  data: HeroBannerBlockData;
  brand: BrandPreset;
  institutionName: string;
  totalLessons: number;
}

export function WidgetHeroBanner({
  data,
  brand,
  institutionName,
  totalLessons,
}: WidgetHeroBannerProps) {
  return (
    <div>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '36px 32px 0 32px' }}>
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#2B3238',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {data.title}
        </h2>
        <p
          style={{
            fontSize: '10.5px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#475569',
            textTransform: 'uppercase',
            margin: '0 0 36px 0',
          }}
        >
          {data.lessonSubtitle || `LECCIÓN 3 DE ${totalLessons} · CURSO INTERACTIVO COMPLETO`}
        </p>
      </div>

      <div
        style={{
          width: '100%',
          minHeight: '320px',
          backgroundImage: `linear-gradient(90deg, rgba(14,18,24,0.88) 0%, rgba(14,18,24,0.74) 55%, rgba(14,18,24,0.45) 100%), url("${data.bannerImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', padding: '48px 32px' }}>
          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#FFFFFF',
              marginBottom: '22px',
            }}
          />
          <h3
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              maxWidth: '540px',
              margin: '0 0 14px 0',
            }}
          >
            {data.bannerTitlePrefix} {institutionName}
          </h3>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#E2E8F0',
              maxWidth: '520px',
              margin: 0,
            }}
          >
            {data.bannerDescription}
          </p>
        </div>
      </div>

      {data.apaCitation && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8px 24px 0 24px' }}>
          <ApaReferenceFooter citation={data.apaCitation} />
        </div>
      )}

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px 12px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {data.kpis.map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderTop: `3px solid ${brand.primary}`,
                borderRadius: '4px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 900,
                  color: brand.primary,
                  marginBottom: '4px',
                }}
              >
                {item.stat}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '6px',
                }}
              >
                {item.label}
              </div>
              <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#475569', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

