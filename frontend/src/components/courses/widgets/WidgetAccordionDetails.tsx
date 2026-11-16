import { useState } from 'react';
import type { BrandPreset, AccordionBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetAccordionDetailsProps {
  data: AccordionBlockData;
  brand: BrandPreset;
  onNavigateNext: (targetId: string, lessonId?: string) => void;
}

export function WidgetAccordionDetails({
  data,
  brand,
  onNavigateNext,
}: WidgetAccordionDetailsProps) {
  const [openAccordions, setOpenAccordions] = useState<string[]>(
    data.items[0] ? [data.items[0].id] : []
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '72px 24px' }}>
      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.65,
          color: '#1F2937',
          marginBottom: '36px',
        }}
      >
        {data.introBeforeHighlight1}
        <strong style={{ color: brand.primary, fontWeight: 700 }}>{data.introHighlight1}</strong>
        {data.introMiddle}
        <strong style={{ color: brand.primary, fontWeight: 700 }}>{data.introHighlight2}</strong>
        {data.introAfter}
      </p>

      <h3
        style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#111827',
          marginBottom: '26px',
        }}
      >
        {data.heading}
      </h3>

      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '3px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        {data.items.map((item, idx) => {
          const isOpen = openAccordions.includes(item.id);
          return (
            <div
              key={item.id}
              style={{
                borderTop: idx === 0 ? 'none' : '1px solid #E5E7EB',
                borderLeft: isOpen ? `4px solid ${brand.primary}` : '4px solid transparent',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '22px 28px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '15.5px',
                    fontWeight: 800,
                    color: '#111827',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    color: '#6B7280',
                    fontWeight: 400,
                    flexShrink: 0,
                  }}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 28px 26px 28px',
                    fontSize: '14.5px',
                    lineHeight: 1.65,
                    color: '#4B5563',
                  }}
                >
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onNavigateNext(data.nextTargetId, data.nextLessonId)}
        style={{
          marginTop: '36px',
          width: '100%',
          height: '44px',
          backgroundColor: brand.primary,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        title="Avanzar al siguiente bloque"
      >
        ▼
      </button>
    </div>
  );
}

