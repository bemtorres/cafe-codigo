import { useState } from 'react';
import type { BrandPreset, CodeComparisonBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetCodeComparisonProps {
  data: CodeComparisonBlockData;
  brand: BrandPreset;
}

export function WidgetCodeComparison({ data, brand }: WidgetCodeComparisonProps) {
  const tabs = data.tabs || [];
  const [activeCompTab, setActiveCompTab] = useState(tabs[0]?.id || '');
  const currentCompObj = tabs.find((t) => t.id === activeCompTab) || tabs[0];

  if (!currentCompObj) return null;

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((tab) => {
          const active = tab.id === currentCompObj.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCompTab(tab.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: active ? `2px solid ${brand.primary}` : '1px solid #CBD5E1',
                backgroundColor: active ? brand.primary : '#FFFFFF',
                color: active ? '#FFFFFF' : '#334155',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #FECACA',
            borderTop: '4px solid #EF4444',
            borderRadius: '6px',
            padding: '22px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#B91C1C',
              marginBottom: '14px',
            }}
          >
            {currentCompObj.badTitle}
          </div>
          <pre
            style={{
              backgroundColor: '#1E293B',
              color: '#FCA5A5',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              lineHeight: 1.6,
              overflowX: 'auto',
              margin: '0 0 14px 0',
            }}
          >
            <code>{currentCompObj.badCode}</code>
          </pre>
          <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#475569', margin: 0 }}>
            <strong style={{ color: '#B91C1C' }}>Riesgo:</strong> {currentCompObj.badReason}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #A7F3D0',
            borderTop: '4px solid #10B981',
            borderRadius: '6px',
            padding: '22px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#047857',
              marginBottom: '14px',
            }}
          >
            {currentCompObj.goodTitle}
          </div>
          <pre
            style={{
              backgroundColor: '#0F172A',
              color: '#A7F3D0',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              lineHeight: 1.6,
              overflowX: 'auto',
              margin: '0 0 14px 0',
            }}
          >
            <code>{currentCompObj.goodCode}</code>
          </pre>
          <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#475569', margin: 0 }}>
            <strong style={{ color: '#047857' }}>Solución:</strong> {currentCompObj.goodReason}
          </p>
        </div>
      </div>
    </div>
  );
}

