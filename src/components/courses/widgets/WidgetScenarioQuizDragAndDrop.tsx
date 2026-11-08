import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizDragAndDropBlockData,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';

export interface WidgetScenarioQuizDragAndDropProps {
  blockId: string;
  data: ScenarioQuizDragAndDropBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizDragAndDrop({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizDragAndDropProps) {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const assignItemToCategory = (itemId: string, categoryId: string) => {
    setSubmitted(false);
    setAssignments((prev) => ({
      ...prev,
      [itemId]: categoryId,
    }));
  };

  const unassignItem = (itemId: string) => {
    setSubmitted(false);
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const unassignedItems = data.items.filter((item) => !assignments[item.id]);
  const allAssigned = unassignedItems.length === 0;

  const correctCount = data.items.filter(
    (item) => assignments[item.id] === item.correctCategoryId
  ).length;
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, data.items.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = data.items.filter(
      (item) => assignments[item.id] === item.correctCategoryId
    ).length;
    const pts = Math.round((right / Math.max(1, data.items.length)) * data.points);
    onScoreChange?.(blockId, pts, data.points);
  };

  const getCategoryPalette = (accent: string) => {
    if (accent === 'emerald') return { border: '#10B981', bg: '#ECFDF5', text: '#047857' };
    if (accent === 'rose') return { border: '#EF4444', bg: '#FEF2F2', text: '#B91C1C' };
    if (accent === 'amber') return { border: '#F59E0B', bg: '#FFFBEB', text: '#B45309' };
    return { border: '#0284C7', bg: '#F0F9FF', text: '#0369A1' };
  };

  return (
    <QuizCardShell
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={earnedPoints}
      submitted={submitted}
    >
      {/* Banco de tarjetas pendientes por clasificar */}
      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px dashed #CBD5E1',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '22px',
        }}
      >
        <div
          style={{
            fontSize: '11.5px',
            fontWeight: 800,
            color: '#475569',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          ✋ Arrastra cada tarjeta a su contenedor (o usa los botones rápidos de asignación):
        </div>

        {unassignedItems.length === 0 ? (
          <div style={{ fontSize: '13px', color: '#059669', fontWeight: 700 }}>
            ✓ Todas las tarjetas han sido clasificadas en las columnas inferiores.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {unassignedItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDraggedItemId(item.id)}
                onDragEnd={() => setDraggedItemId(null)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderLeft: `4px solid ${brand.primary}`,
                  borderRadius: '6px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  cursor: 'grab',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E293B', flex: 1 }}>
                  ⠿ {item.text}
                </span>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {data.categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => assignItemToCategory(item.id, cat.id)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A',
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      → {cat.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Columnas / Contenedores Dropzone */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px',
        }}
      >
        {data.categories.map((cat) => {
          const palette = getCategoryPalette(cat.accentColor);
          const itemsInCat = data.items.filter((i) => assignments[i.id] === cat.id);

          return (
            <div
              key={cat.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggedItemId) {
                  assignItemToCategory(draggedItemId, cat.id);
                  setDraggedItemId(null);
                }
              }}
              style={{
                backgroundColor: palette.bg,
                border: `2px dashed ${palette.border}`,
                borderRadius: '10px',
                padding: '18px',
                minHeight: '210px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: palette.text }}>
                  {cat.title}
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>{cat.subtitle}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {itemsInCat.length === 0 ? (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#64748B',
                      fontStyle: 'italic',
                    }}
                  >
                    Suelta tarjetas aquí...
                  </div>
                ) : (
                  itemsInCat.map((item) => {
                    const isRight = item.correctCategoryId === cat.id;
                    return (
                      <div
                        key={item.id}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '6px',
                          padding: '12px',
                          border: submitted
                            ? isRight
                              ? '2px solid #10B981'
                              : '2px solid #EF4444'
                            : '1px solid #CBD5E1',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '8px',
                          }}
                        >
                          <span
                            style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}
                          >
                            {item.text}
                          </span>
                          <button
                            type="button"
                            onClick={() => unassignItem(item.id)}
                            title="Quitar de esta columna"
                            style={{
                              border: 'none',
                              backgroundColor: '#F1F5F9',
                              color: '#475569',
                              borderRadius: '4px',
                              padding: '2px 6px',
                              fontSize: '11px',
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            ✕
                          </button>
                        </div>
                        {submitted && (
                          <div
                            style={{
                              marginTop: '6px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: isRight ? '#047857' : '#B91C1C',
                            }}
                          >
                            {isRight ? '✓ Correcto: ' : '✕ Ubicación incorrecta: '}
                            {item.feedback}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={() => {
            setAssignments({});
            setSubmitted(false);
            onScoreChange?.(blockId, 0, data.points);
          }}
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          Vaciar Columnas
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!allAssigned}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allAssigned ? 'pointer' : 'not-allowed',
            opacity: allAssigned ? 1 : 0.5,
          }}
        >
          Validar Clasificación ({correctCount}/{data.items.length})
        </button>
      </div>
    </QuizCardShell>
  );
}

