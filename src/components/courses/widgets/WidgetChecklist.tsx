import type { BrandPreset, ChecklistBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetChecklistProps {
  data: ChecklistBlockData;
  brand: BrandPreset;
  checkedItems: string[];
  onToggleChecklistItem: (id: string) => void;
}

export function WidgetChecklist({
  data,
  brand,
  checkedItems,
  onToggleChecklistItem,
}: WidgetChecklistProps) {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '72px 24px' }}>
      {data.badge && (
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
        </div>
      )}

      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {data.checklistTitle}
            </h4>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              {data.checklistSubtitle}
            </p>
          </div>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: brand.primaryLight,
              color: brand.primary,
              fontSize: '12px',
              fontWeight: 800,
            }}
          >
            {checkedItems.length} de {data.checklist.length} verificados
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.checklist.map((item) => {
            const checked = checkedItems.includes(item.id);
            return (
              <label
                key={item.id}
                onClick={() => onToggleChecklistItem(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '6px',
                  border: checked ? `1.5px solid ${brand.primary}` : '1px solid #E2E8F0',
                  backgroundColor: checked ? '#F8FAFC' : '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      backgroundColor: checked ? brand.primary : '#FFFFFF',
                      border: checked ? 'none' : '1.5px solid #94A3B8',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {checked ? '✓' : ''}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: checked ? 700 : 500,
                      color: '#1E293B',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748B',
                    backgroundColor: '#F1F5F9',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                >
                  {item.category}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

