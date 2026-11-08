import type { BrandPreset } from '../../../data/courses/courseJsonTypes';

export interface QuizCardShellProps {
  badge: string;
  points: number;
  title: string;
  context: string;
  brand: BrandPreset;
  earnedPoints: number;
  submitted: boolean;
  children: React.ReactNode;
}

export function QuizCardShell({
  badge,
  points,
  title,
  context,
  brand,
  earnedPoints,
  submitted,
  children,
}: QuizCardShellProps) {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '56px 24px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)',
          border: '1px solid #E2E8F0',
          borderTop: `5px solid ${brand.primary}`,
          padding: '40px 44px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 900,
              color: brand.primary,
              backgroundColor: brand.primaryLight,
              padding: '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: submitted
                  ? earnedPoints === points
                    ? '#DCFCE7'
                    : earnedPoints > 0
                      ? '#FEF3C7'
                      : '#FEE2E2'
                  : '#F1F5F9',
                color: submitted
                  ? earnedPoints === points
                    ? '#166534'
                    : earnedPoints > 0
                      ? '#92400E'
                      : '#991B1B'
                  : '#334155',
              }}
            >
              {submitted ? `Puntaje obtenido: ${earnedPoints} / ${points} PTS` : `Valor: +${points} PTS`}
            </span>
          </div>
        </div>

        <h3
          style={{
            fontSize: '23px',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 10px 0',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#475569',
            margin: '0 0 24px 0',
            paddingBottom: '18px',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          {context}
        </p>

        {children}
      </div>
    </div>
  );
}

