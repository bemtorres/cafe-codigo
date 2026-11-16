import type { BrandPreset, StepToStepBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetStepToStepProps {
  data: StepToStepBlockData;
  brand: BrandPreset;
}

export function WidgetStepToStep({ data, brand }: WidgetStepToStepProps) {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
          borderLeft: `3px solid ${brand.primary}`,
          marginLeft: '14px',
          paddingLeft: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {data.stages.map((item) => (
          <div
            key={item.stage}
            style={{
              position: 'relative',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-37px',
                top: '22px',
                width: '14px',
                height: '14px',
                borderRadius: '999px',
                backgroundColor: brand.primary,
                border: '3px solid #FFFFFF',
                boxShadow: '0 0 0 1px #CBD5E1',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '6px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: brand.primary,
                  letterSpacing: '0.05em',
                }}
              >
                {item.stage} · {item.time}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#E2E8F0',
                  color: '#1E293B',
                }}
              >
                {item.badge}
              </span>
            </div>
            <h4
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#0F172A',
                margin: '0 0 6px 0',
              }}
            >
              {item.title}
            </h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

