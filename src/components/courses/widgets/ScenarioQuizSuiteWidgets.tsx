import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizMultipleBlockData,
  ScenarioQuizDragAndDropBlockData,
  ScenarioQuizOrderingBlockData,
  ScenarioQuizMatchingBlockData,
  ScenarioQuizFillBlankBlockData,
  ScenarioQuizBranchingBlockData,
  ScenarioQuizTrueFalseMatrixBlockData,
  ScenarioQuizHotspotSpotterBlockData,
  ScenarioQuizImageHotspotBlockData,
  ScenarioQuizImageChoiceBlockData,
  ScenarioQuizRiskSliderBlockData,
} from '../../../data/courses/courseJsonTypes';
import { ZoomableFigure, ApaReferenceFooter } from './ZoomableFigure';

/* =========================================================
   CONTENEDOR VISUAL COMÚN PARA TARJETAS DE INTERACCIÓN QUIZ
   ========================================================= */
function QuizCardShell({
  badge,
  points,
  title,
  context,
  brand,
  earnedPoints,
  submitted,
  children,
}: {
  badge: string;
  points: number;
  title: string;
  context: string;
  brand: BrandPreset;
  earnedPoints: number;
  submitted: boolean;
  children: React.ReactNode;
}) {
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

/* =========================================================
   1. WidgetScenarioQuizMultiple (Selección Múltiple - Checkboxes)
   ========================================================= */
export function WidgetScenarioQuizMultiple({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizMultipleBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleOption = (id: string) => {
    setSubmitted(false);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const correctIds = data.options.filter((o) => o.isCorrect).map((o) => o.id);
  const isPerfect =
    selectedIds.length === correctIds.length &&
    correctIds.every((id) => selectedIds.includes(id));

  const earnedPoints = submitted ? (isPerfect ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const perfect =
      selectedIds.length === correctIds.length &&
      correctIds.every((id) => selectedIds.includes(id));
    onScoreChange?.(blockId, perfect ? data.points : 0, data.points);
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
      <div
        style={{
          fontSize: '12px',
          fontWeight: 800,
          color: '#334155',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>☑ {data.instruction}</span>
        <span style={{ color: brand.primary }}>
          {selectedIds.length} seleccionada(s)
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.options.map((opt) => {
          const isChecked = selectedIds.includes(opt.id);
          const showResult = submitted;
          const borderColor = showResult
            ? opt.isCorrect
              ? '#10B981'
              : isChecked
                ? '#EF4444'
                : '#E2E8F0'
            : isChecked
              ? brand.primary
              : '#E2E8F0';

          return (
            <div
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleOption(opt.id);
                }
              }}
              style={{
                padding: '16px 18px',
                borderRadius: '8px',
                border: `2px solid ${borderColor}`,
                backgroundColor: isChecked ? '#F8FAFC' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span
                  style={{
                    marginTop: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    backgroundColor: isChecked ? brand.primary : '#FFFFFF',
                    border: isChecked ? 'none' : '2px solid #94A3B8',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {isChecked ? '✓' : ''}
                </span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#0F172A',
                      lineHeight: 1.45,
                    }}
                  >
                    {opt.text}
                  </div>
                  {showResult && (
                    <div
                      style={{
                        marginTop: '6px',
                        fontSize: '12.5px',
                        color: opt.isCorrect ? '#047857' : '#B91C1C',
                        fontWeight: 600,
                      }}
                    >
                      {opt.isCorrect ? '✓ Requerido: ' : '✕ Distractor: '}
                      {opt.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '20px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: isPerfect ? '#ECFDF5' : '#FEF2F2',
            border: isPerfect ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
            color: isPerfect ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {isPerfect ? data.successFeedback : data.errorFeedback}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={() => {
            setSelectedIds([]);
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
          Reiniciar
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={selectedIds.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            cursor: selectedIds.length > 0 ? 'pointer' : 'not-allowed',
            opacity: selectedIds.length > 0 ? 1 : 0.5,
          }}
        >
          Verificar Selección Múltiple
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   2. WidgetScenarioQuizDragAndDrop (Arrastrar y Clasificar en Contenedores)
   ========================================================= */
export function WidgetScenarioQuizDragAndDrop({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizDragAndDropBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  // Mapa itemId -> categoryId
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

/* =========================================================
   3. WidgetScenarioQuizOrdering (Ordenar Secuencia de Protocolo 1..N)
   ========================================================= */
export function WidgetScenarioQuizOrdering({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizOrderingBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [orderedSteps, setOrderedSteps] = useState(() => [...data.steps]);
  const [submitted, setSubmitted] = useState(false);

  const moveStep = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= orderedSteps.length) return;
    setSubmitted(false);
    const next = [...orderedSteps];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setOrderedSteps(next);
  };

  const correctCount = orderedSteps.filter(
    (st, idx) => st.correctPosition === idx + 1
  ).length;
  const isAllCorrect = correctCount === orderedSteps.length;
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, orderedSteps.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = orderedSteps.filter((st, idx) => st.correctPosition === idx + 1).length;
    const pts = Math.round((right / Math.max(1, orderedSteps.length)) * data.points);
    onScoreChange?.(blockId, pts, data.points);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {orderedSteps.map((step, idx) => {
          const isPositionRight = step.correctPosition === idx + 1;
          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '8px',
                border: submitted
                  ? isPositionRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: submitted
                      ? isPositionRight
                        ? '#10B981'
                        : '#EF4444'
                      : brand.primary,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}°
                </span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                    {step.text}
                  </div>
                  {submitted && (
                    <div
                      style={{
                        fontSize: '12px',
                        marginTop: '4px',
                        color: isPositionRight ? '#047857' : '#B91C1C',
                        fontWeight: 600,
                      }}
                    >
                      {isPositionRight
                        ? `✓ Posición correcta (${step.hint})`
                        : `✕ Debería ir en el paso ${step.correctPosition}° (${step.hint})`}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => moveStep(idx, -1)}
                  disabled={idx === 0}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: idx === 0 ? '#CBD5E1' : '#0F172A',
                    fontWeight: 900,
                    cursor: idx === 0 ? 'not-allowed' : 'pointer',
                  }}
                  title="Subir paso"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(idx, 1)}
                  disabled={idx === orderedSteps.length - 1}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: idx === orderedSteps.length - 1 ? '#CBD5E1' : '#0F172A',
                    fontWeight: 900,
                    cursor: idx === orderedSteps.length - 1 ? 'not-allowed' : 'pointer',
                  }}
                  title="Bajar paso"
                >
                  ↓
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '18px',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: isAllCorrect ? '#ECFDF5' : '#FEF3C7',
            color: isAllCorrect ? '#065F46' : '#92400E',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          {isAllCorrect
            ? '✓ ¡Secuencia perfecta! Has ordenado el protocolo de respuesta en el orden exacto.'
            : `Has acertado ${correctCount} de ${orderedSteps.length} posiciones. Ajusta los pasos con ↑ y ↓.`}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Validar Orden del Protocolo
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   4. WidgetScenarioQuizMatching (Emparejar Hallazgo ↔ Control)
   ========================================================= */
export function WidgetScenarioQuizMatching({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizMatchingBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [selectedMatches, setSelectedMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const rightOptions = data.pairs.map((p) => p.rightMatch);

  const correctCount = data.pairs.filter(
    (p) => selectedMatches[p.id] === p.rightMatch
  ).length;
  const allSelected = data.pairs.every((p) => Boolean(selectedMatches[p.id]));
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, data.pairs.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = data.pairs.filter((p) => selectedMatches[p.id] === p.rightMatch).length;
    const pts = Math.round((right / Math.max(1, data.pairs.length)) * data.points);
    onScoreChange?.(blockId, pts, data.points);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {data.pairs.map((pair) => {
          const picked = selectedMatches[pair.id] || '';
          const isRight = picked === pair.rightMatch;
          return (
            <div
              key={pair.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: submitted
                  ? isRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : '1px solid #E2E8F0',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: brand.primary,
                    textTransform: 'uppercase',
                  }}
                >
                  {pair.leftBadge}
                </span>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {pair.leftPrompt}
                </div>
              </div>

              <div>
                <select
                  value={picked}
                  onChange={(e) => {
                    setSubmitted(false);
                    setSelectedMatches((prev) => ({
                      ...prev,
                      [pair.id]: e.target.value,
                    }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#1E293B',
                  }}
                >
                  <option value="">— Selecciona el control o responsable —</option>
                  {rightOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {submitted && !isRight && (
                  <div style={{ fontSize: '11.5px', color: '#B91C1C', fontWeight: 700, marginTop: '4px' }}>
                    Correcto: {pair.rightMatch}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!allSelected}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allSelected ? 'pointer' : 'not-allowed',
            opacity: allSelected ? 1 : 0.5,
          }}
        >
          Verificar Emparejamiento
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   5. WidgetScenarioQuizFillBlank (Completar Espacios / Cloze)
   ========================================================= */
export function WidgetScenarioQuizFillBlank({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizFillBlankBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const blankSegments = data.segments.filter((s) => s.type === 'blank' && s.blankId);
  const allFilled = blankSegments.every((b) => Boolean(b.blankId && answers[b.blankId]));
  const correctBlanks = blankSegments.filter(
    (b) => b.blankId && answers[b.blankId] === b.correctAnswer
  ).length;
  const isAllCorrect = correctBlanks === blankSegments.length;
  const earnedPoints = submitted
    ? Math.round((correctBlanks / Math.max(1, blankSegments.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = blankSegments.filter(
      (b) => b.blankId && answers[b.blankId] === b.correctAnswer
    ).length;
    const pts = Math.round((right / Math.max(1, blankSegments.length)) * data.points);
    onScoreChange?.(blockId, pts, data.points);
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
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '8px',
          backgroundColor: data.codeMode ? '#0F172A' : '#F8FAFC',
          color: data.codeMode ? '#E2E8F0' : '#1E293B',
          border: '1px solid #CBD5E1',
          fontFamily: data.codeMode
            ? '"JetBrains Mono", Consolas, monospace'
            : 'system-ui, sans-serif',
          fontSize: data.codeMode ? '13.5px' : '15.5px',
          lineHeight: 2.1,
        }}
      >
        {data.segments.map((seg, idx) => {
          if (seg.type === 'text') {
            return <span key={idx}>{seg.text}</span>;
          }
          const bId = seg.blankId || `blank-${idx}`;
          const val = answers[bId] || '';
          const isRight = val === seg.correctAnswer;

          return (
            <select
              key={bId}
              value={val}
              onChange={(e) => {
                setSubmitted(false);
                setAnswers((prev) => ({ ...prev, [bId]: e.target.value }));
              }}
              style={{
                margin: '0 6px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: submitted
                  ? isRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : `2px solid ${brand.primary}`,
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontWeight: 800,
                fontSize: '13px',
              }}
            >
              <option value="">[ Seleccionar... ]</option>
              {(seg.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        })}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: isAllCorrect ? '#ECFDF5' : '#FEF2F2',
            color: isAllCorrect ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {isAllCorrect ? data.feedbackSuccess : data.feedbackError}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!allFilled}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allFilled ? 'pointer' : 'not-allowed',
            opacity: allFilled ? 1 : 0.5,
          }}
        >
          Validar Respuestas Completadas
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   6. WidgetScenarioQuizBranching (Simulación Ramificada / Árbol de Decisión)
   ========================================================= */
export function WidgetScenarioQuizBranching({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizBranchingBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [currentNodeId, setCurrentNodeId] = useState(data.initialNodeId);
  const [history, setHistory] = useState<
    { nodeId: string; choiceLabel: string; consequence: string; isOptimal: boolean }[]
  >([]);
  const [finishedScore, setFinishedScore] = useState<number | null>(null);

  const currentNode =
    data.nodes.find((n) => n.id === currentNodeId) || data.nodes[0];

  const handlePickChoice = (choice: {
    id: string;
    label: string;
    consequenceText: string;
    nextNodeId?: string;
    impactScore: number;
    isOptimal: boolean;
  }) => {
    const nextHistory = [
      ...history,
      {
        nodeId: currentNode.id,
        choiceLabel: choice.label,
        consequence: choice.consequenceText,
        isOptimal: choice.isOptimal,
      },
    ];
    setHistory(nextHistory);

    if (choice.nextNodeId) {
      setCurrentNodeId(choice.nextNodeId);
    } else {
      const earned = Math.round((choice.impactScore / 100) * data.points);
      setFinishedScore(earned);
      onScoreChange?.(blockId, earned, data.points);
    }
  };

  const resetBranching = () => {
    setCurrentNodeId(data.initialNodeId);
    setHistory([]);
    setFinishedScore(null);
    onScoreChange?.(blockId, 0, data.points);
  };

  return (
    <QuizCardShell
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={finishedScore ?? 0}
      submitted={finishedScore !== null}
    >
      {/* Historial de decisiones tomadas */}
      {history.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {history.map((h, i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: h.isOptimal ? '#ECFDF5' : '#FEF3C7',
                borderLeft: `4px solid ${h.isOptimal ? '#10B981' : '#F59E0B'}`,
                fontSize: '13px',
              }}
            >
              <div style={{ fontWeight: 800, color: '#0F172A' }}>
                Decisión {i + 1}: {h.choiceLabel}
              </div>
              <div style={{ color: '#334155', marginTop: '4px' }}>
                ↳ <strong>Consecuencia:</strong> {h.consequence}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nodo activo o resultado final */}
      {finishedScore === null && currentNode ? (
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '24px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '3px 10px',
              borderRadius: '4px',
              backgroundColor: brand.primary,
              fontSize: '10.5px',
              fontWeight: 900,
              marginBottom: '10px',
            }}
          >
            {currentNode.stageLabel}
          </span>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#F8FAFC',
              margin: '0 0 18px 0',
              fontWeight: 600,
            }}
          >
            {currentNode.narrative}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentNode.choices.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => handlePickChoice(ch)}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#1E293B',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                ▸ {ch.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A' }}>
              Simulación de Rol Finalizada
            </div>
            <div style={{ fontSize: '13px', color: '#475569' }}>
              Puntaje alcanzado en este árbol de decisión: {finishedScore} de {data.points} pts.
            </div>
          </div>
          <button
            type="button"
            onClick={resetBranching}
            style={{
              padding: '9px 20px',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: brand.primary,
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            ↺ Explorar otra rama de decisión
          </button>
        </div>
      )}
    </QuizCardShell>
  );
}

/* =========================================================
   7. WidgetScenarioQuizTrueFalseMatrix (Matriz Cumple / Incumple)
   ========================================================= */
export function WidgetScenarioQuizTrueFalseMatrix({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizTrueFalseMatrixBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [verdicts, setVerdicts] = useState<Record<string, 'cumple' | 'incumple'>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = data.statements.every((s) => Boolean(verdicts[s.id]));
  const correctCount = data.statements.filter(
    (s) => verdicts[s.id] === s.correctVerdict
  ).length;
  const earnedPoints = submitted
    ? Math.round((correctCount / Math.max(1, data.statements.length)) * data.points)
    : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const right = data.statements.filter((s) => verdicts[s.id] === s.correctVerdict).length;
    const pts = Math.round((right / Math.max(1, data.statements.length)) * data.points);
    onScoreChange?.(blockId, pts, data.points);
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.statements.map((row) => {
          const picked = verdicts[row.id];
          const isRight = picked === row.correctVerdict;

          return (
            <div
              key={row.id}
              style={{
                padding: '16px 18px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: submitted
                  ? isRight
                    ? '2px solid #10B981'
                    : '2px solid #EF4444'
                  : '1px solid #E2E8F0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: brand.primary,
                      textTransform: 'uppercase',
                    }}
                  >
                    {row.ruleReference}
                  </span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                    {row.statement}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {(['cumple', 'incumple'] as const).map((optionVal) => {
                    const active = picked === optionVal;
                    return (
                      <button
                        key={optionVal}
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setVerdicts((prev) => ({ ...prev, [row.id]: optionVal }));
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: active
                            ? `2px solid ${optionVal === 'cumple' ? '#059669' : '#DC2626'}`
                            : '1px solid #CBD5E1',
                          backgroundColor: active
                            ? optionVal === 'cumple'
                              ? '#059669'
                              : '#DC2626'
                            : '#FFFFFF',
                          color: active ? '#FFFFFF' : '#334155',
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                        }}
                      >
                        {optionVal === 'cumple' ? '✓ Cumple' : '✕ Incumple'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isRight ? '#047857' : '#B91C1C',
                  }}
                >
                  {isRight ? '✓ Dictamen correcto: ' : '✕ Dictamen incorrecto: '}
                  {row.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!allAnswered}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
            opacity: allAnswered ? 1 : 0.5,
          }}
        >
          Emitir Dictamen de Matriz
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   8. WidgetScenarioQuizHotspotSpotter (Cazador de Riesgos en Código/Documento)
   ========================================================= */
export function WidgetScenarioQuizHotspotSpotter({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizHotspotSpotterBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [flaggedLines, setFlaggedLines] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleLine = (lineNumber: number) => {
    setSubmitted(false);
    setFlaggedLines((prev) =>
      prev.includes(lineNumber)
        ? prev.filter((l) => l !== lineNumber)
        : [...prev, lineNumber]
    );
  };

  const vulnerableLineNumbers = data.lines
    .filter((l) => l.isVulnerable)
    .map((l) => l.lineNumber);

  const isPerfect =
    flaggedLines.length === vulnerableLineNumbers.length &&
    vulnerableLineNumbers.every((ln) => flaggedLines.includes(ln));

  const earnedPoints = submitted ? (isPerfect ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const perfect =
      flaggedLines.length === vulnerableLineNumbers.length &&
      vulnerableLineNumbers.every((ln) => flaggedLines.includes(ln));
    onScoreChange?.(blockId, perfect ? data.points : 0, data.points);
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
      <div
        style={{
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          fontWeight: 800,
          color: '#334155',
        }}
      >
        <span>🔍 Haz clic sobre las {data.targetVulnerableCount} líneas vulnerables para marcarlas:</span>
        <span style={{ color: brand.primary }}>
          {flaggedLines.length} / {data.targetVulnerableCount} líneas marcadas
        </span>
      </div>

      <div
        style={{
          backgroundColor: '#0F172A',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #1E293B',
        }}
      >
        <div
          style={{
            backgroundColor: '#1E293B',
            padding: '8px 16px',
            color: '#E2E8F0',
            fontSize: '12px',
            fontFamily: 'monospace',
            fontWeight: 700,
            borderBottom: '1px solid #334155',
          }}
        >
          📄 {data.fileName}
        </div>

        <div style={{ padding: '12px 0', fontFamily: '"JetBrains Mono", Consolas, monospace', fontSize: '12.5px' }}>
          {data.lines.map((line) => {
            const isFlagged = flaggedLines.includes(line.lineNumber);
            const showAudit = submitted && (isFlagged || line.isVulnerable);

            return (
              <div key={line.lineNumber}>
                <div
                  onClick={() => toggleLine(line.lineNumber)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 16px',
                    cursor: 'pointer',
                    backgroundColor: isFlagged ? 'rgba(239, 68, 68, 0.24)' : 'transparent',
                    borderLeft: isFlagged ? '4px solid #EF4444' : '4px solid transparent',
                  }}
                >
                  <span style={{ width: '32px', color: '#64748B', userSelect: 'none' }}>
                    {line.lineNumber}
                  </span>
                  <span style={{ color: '#F8FAFC', whiteSpace: 'pre', flex: 1 }}>
                    {line.codeOrText}
                  </span>
                  {isFlagged && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        backgroundColor: '#EF4444',
                        color: '#FFFFFF',
                        padding: '2px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      🚩 RIESGO MARCADO
                    </span>
                  )}
                </div>

                {showAudit && (
                  <div
                    style={{
                      padding: '6px 16px 6px 48px',
                      backgroundColor: line.isVulnerable
                        ? 'rgba(16, 185, 129, 0.16)'
                        : 'rgba(245, 158, 11, 0.16)',
                      color: line.isVulnerable ? '#6EE7B7' : '#FDE047',
                      fontSize: '11.5px',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {line.isVulnerable
                      ? `✓ Vulnerabilidad real en línea ${line.lineNumber}: ${line.vulnerabilityExplanation}`
                      : `⚠ Falso positivo en línea ${line.lineNumber}: Esta línea es segura.`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={flaggedLines.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: flaggedLines.length > 0 ? 'pointer' : 'not-allowed',
            opacity: flaggedLines.length > 0 ? 1 : 0.5,
          }}
        >
          Auditar Líneas Marcadas
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   9. WidgetScenarioQuizImageHotspot (Seleccionar una parte/lado de una imagen donde está el elemento correcto, ej. seleccionar dónde está la batería en una banda de música)
   ========================================================= */
export function WidgetScenarioQuizImageHotspot({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizImageHotspotBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>([]);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const requiredCount = data.targetRiskCount || 1;
  const isSingleChoiceMode = requiredCount === 1;

  const handleSelectZone = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSubmitted(false);
    // Calcular la posición exacta del clic relativo al contenedor de la imagen para colocar el pin visual 🎯
    const parent = e.currentTarget.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      const xPct = Math.max(4, Math.min(96, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(6, Math.min(94, ((e.clientY - rect.top) / rect.height) * 100));
      setClickCoords({ x: xPct, y: yPct });
    }

    if (isSingleChoiceMode) {
      setSelectedZoneIds([id]);
    } else {
      setSelectedZoneIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const targetIds = data.zones.filter((z) => z.isRiskTarget).map((z) => z.id);
  const isPerfect =
    selectedZoneIds.length === targetIds.length &&
    targetIds.every((id) => selectedZoneIds.includes(id));

  const earnedPoints = submitted ? (isPerfect ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const perfect =
      selectedZoneIds.length === targetIds.length &&
      targetIds.every((id) => selectedZoneIds.includes(id));
    onScoreChange?.(blockId, perfect ? data.points : 0, data.points);
  };

  const selectedSingleZone = data.zones.find((z) => z.id === selectedZoneIds[0]);

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
      <div
        style={{
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          fontWeight: 800,
          color: '#334155',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span>
          {isSingleChoiceMode
            ? '👆 Haz clic directamente sobre la parte o lado correcto de la imagen:'
            : `👆 Toca sobre la imagen las ${requiredCount} zonas correctas:`}
        </span>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: selectedZoneIds.length > 0 ? '#EFF6FF' : '#F1F5F9',
            color: selectedZoneIds.length > 0 ? brand.primary : '#64748B',
            fontSize: '11.5px',
          }}
        >
          {isSingleChoiceMode
            ? selectedSingleZone
              ? `🎯 Seleccionado: ${selectedSingleZone.label}`
              : 'Ninguna parte seleccionada aún'
            : `${selectedZoneIds.length} / ${requiredCount} zonas marcadas`}
        </span>
      </div>

      {/* Contenedor relativo con la imagen de fondo y las regiones clicables */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '2px solid #CBD5E1',
          backgroundColor: '#0F172A',
          userSelect: 'none',
          boxShadow: '0 12px 28px rgba(15, 23, 42, 0.14)',
        }}
      >
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ) : data.sceneType === 'phishing-email' ? (
          /* Escena opcional de Correo Corporativo */
          <svg
            viewBox="0 0 800 440"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            role="img"
            aria-label="Captura de pantalla de correo electrónico para inspección"
          >
            <rect width="800" height="440" fill="#F1F5F9" />
            <rect x="20" y="18" width="760" height="404" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="20" y="18" width="760" height="42" rx="10" fill="#0F172A" />
            <circle cx="44" cy="39" r="6" fill="#EF4444" />
            <circle cx="64" cy="39" r="6" fill="#F59E0B" />
            <circle cx="84" cy="39" r="6" fill="#10B981" />
            <text x="115" y="44" fill="#E2E8F0" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              Bandeja de Entrada Corporativa — Revisión de Seguridad
            </text>
            <rect x="44" y="76" width="712" height="48" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
            <text x="58" y="96" fill="#64748B" fontSize="11" fontWeight="700" fontFamily="sans-serif">DE:</text>
            <text x="90" y="96" fill="#0F172A" fontSize="13" fontWeight="800" fontFamily="monospace">
              Soporte TI Urgente &lt;admin-seguridad@inacap-verificacion-cuenta.ru&gt;
            </text>
            <rect x="44" y="136" width="712" height="42" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
            <text x="58" y="162" fill="#1E293B" fontSize="14" fontWeight="800" fontFamily="sans-serif">
              Asunto: Notificación de vencimiento de token de acceso VPN
            </text>
            <rect x="44" y="222" width="712" height="62" rx="6" fill="#FFFBEB" stroke="#FDE68A" />
            <text x="58" y="246" fill="#92400E" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              ⚠ Adjunto obligatorio: Parche_Seguridad_VPN_2026.exe
            </text>
            <rect x="230" y="304" width="340" height="52" rx="8" fill="#DC2626" />
            <text x="275" y="328" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">
              INGRESAR CONTRASEÑA MAESTRA AQUÍ
            </text>
          </svg>
        ) : (
          /* Escena Ilustrada de una Banda de Música en Escenario (4 sectores: Guitarrista, Vocalista, Batería y Tecladista) */
          <svg
            viewBox="0 0 840 440"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            role="img"
            aria-label="Escenario de una banda de música en vivo con guitarrista, vocalista, batería y tecladista"
          >
            <defs>
              <linearGradient id="stageBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#090D16" />
                <stop offset="68%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <radialGradient id="spotLeft" cx="0.15" cy="0" r="0.65">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotCenter" cx="0.5" cy="0" r="0.65">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotDrums" cx="0.64" cy="0.1" r="0.55">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotRight" cx="0.88" cy="0" r="0.6">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Fondo del escenario y luces de concierto */}
            <rect width="840" height="440" fill="url(#stageBg)" />
            <rect width="840" height="440" fill="url(#spotLeft)" />
            <rect width="840" height="440" fill="url(#spotCenter)" />
            <rect width="840" height="440" fill="url(#spotDrums)" />
            <rect width="840" height="440" fill="url(#spotRight)" />

            {/* Estructura superior de luces (Truss) */}
            <rect x="0" y="14" width="840" height="10" fill="#334155" />
            {[95, 250, 420, 565, 740].map((lx) => (
              <g key={lx}>
                <rect x={lx - 14} y="22" width="28" height="14" rx="3" fill="#1E293B" stroke="#64748B" />
                <circle cx={lx} cy="36" r="7" fill="#FDE047" />
              </g>
            ))}

            {/* Piso de madera del escenario */}
            <polygon points="0,335 840,335 840,440 0,440" fill="#1E293B" />
            <line x1="0" y1="335" x2="840" y2="335" stroke="#475569" strokeWidth="3" />
            <line x1="0" y1="365" x2="840" y2="365" stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="400" x2="840" y2="400" stroke="#334155" strokeWidth="1" />

            {/* =====================================================
                SECTOR 1 (IZQUIERDA): GUITARRISTA ELÉCTRICO + AMPLIFICADOR
               ===================================================== */}
            <g transform="translate(38, 125)">
              {/* Amplificador */}
              <rect x="0" y="95" width="76" height="110" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="3" />
              <rect x="8" y="105" width="60" height="20" rx="2" fill="#334155" />
              <circle cx="24" cy="152" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="52" cy="152" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="24" cy="184" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="52" cy="184" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />

              {/* Músico Guitarrista */}
              <circle cx="118" cy="48" r="22" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M96 42 Q118 16 142 42" fill="#0F172A" />
              <rect x="92" y="72" width="52" height="82" rx="12" fill="#2563EB" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="104" y1="154" x2="96" y2="215" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <line x1="132" y1="154" x2="140" y2="215" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />

              {/* Guitarra Eléctrica Roja */}
              <ellipse cx="112" cy="128" rx="28" ry="20" transform="rotate(-18 112 128)" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
              <line x1="126" y1="122" x2="182" y2="92" stroke="#FDE047" strokeWidth="6" strokeLinecap="round" />
              <circle cx="185" cy="90" r="5" fill="#EF4444" />
            </g>

            {/* =====================================================
                SECTOR 2 (CENTRO-IZQUIERDA): VOCALISTA PRINCIPAL + MICRÓFONO
               ===================================================== */}
            <g transform="translate(245, 130)">
              {/* Retorno de piso */}
              <polygon points="15,205 115,205 102,178 28,178" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
              {/* Vocalista */}
              <circle cx="65" cy="42" r="23" fill="#FED7AA" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M42 36 Q65 8 88 36" fill="#7C2D12" />
              <rect x="38" y="68" width="54" height="84" rx="14" fill="#E11D48" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="52" y1="152" x2="46" y2="205" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <line x1="78" y1="152" x2="84" y2="205" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              {/* Brazo sosteniendo micrófono */}
              <path d="M86 88 L112 66" stroke="#FED7AA" strokeWidth="9" strokeLinecap="round" />
              {/* Pedestal y micrófono */}
              <line x1="115" y1="62" x2="115" y2="205" stroke="#E2E8F0" strokeWidth="3.5" />
              <line x1="92" y1="205" x2="138" y2="205" stroke="#E2E8F0" strokeWidth="4" />
              <circle cx="112" cy="58" r="7" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
            </g>

            {/* =====================================================
                SECTOR 3 (CENTRO-DERECHA): BATERÍA ACÚSTICA COMPLETA + BATERISTA
               ===================================================== */}
            <g transform="translate(425, 95)">
              {/* Tarima de la batería (Drum Riser) */}
              <rect x="0" y="210" width="215" height="32" rx="6" fill="#334155" stroke="#94A3B8" strokeWidth="2" />

              {/* Baterista detrás del set */}
              <circle cx="108" cy="48" r="20" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
              <rect x="84" y="70" width="48" height="65" rx="10" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
              {/* Baquetas en mano */}
              <line x1="84" y1="88" x2="48" y2="62" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="132" y1="88" x2="168" y2="62" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />

              {/* Platillo Crash Izquierdo + Atril */}
              <line x1="38" y1="78" x2="38" y2="210" stroke="#CBD5E1" strokeWidth="3" />
              <ellipse cx="38" cy="78" rx="28" ry="6" transform="rotate(-10 38 78)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />

              {/* Platillo Ride Derecho + Atril */}
              <line x1="178" y1="74" x2="178" y2="210" stroke="#CBD5E1" strokeWidth="3" />
              <ellipse cx="178" cy="74" rx="30" ry="6" transform="rotate(10 178 74)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />

              {/* Hi-Hat (Charles) */}
              <line x1="16" y1="112" x2="16" y2="210" stroke="#CBD5E1" strokeWidth="2.5" />
              <ellipse cx="16" cy="112" rx="18" ry="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />

              {/* Toms de aire (High & Mid Tom) */}
              <rect x="64" y="102" width="38" height="30" rx="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
              <rect x="114" y="102" width="40" height="32" rx="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />

              {/* Caja (Snare Drum) y Tom de piso (Floor Tom) */}
              <rect x="34" y="138" width="42" height="22" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="2.5" />
              <rect x="144" y="136" width="46" height="58" rx="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />

              {/* Bombo central grande (Bass Drum) */}
              <circle cx="108" cy="168" r="44" fill="#FEF2F2" stroke="#DC2626" strokeWidth="8" />
              <circle cx="108" cy="168" r="32" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="108" y="173" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                ROCK
              </text>
            </g>

            {/* =====================================================
                SECTOR 4 (DERECHA): TECLADISTA / SINTETIZADOR
               ===================================================== */}
            <g transform="translate(665, 130)">
              {/* Músico Tecladista */}
              <circle cx="80" cy="44" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
              <rect x="56" y="68" width="48" height="76" rx="12" fill="#9333EA" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="68" y1="144" x2="64" y2="205" stroke="#0F172A" strokeWidth="11" strokeLinecap="round" />
              <line x1="92" y1="144" x2="96" y2="205" stroke="#0F172A" strokeWidth="11" strokeLinecap="round" />

              {/* Teclado / Sintetizador en soporte en X */}
              <rect x="18" y="118" width="124" height="24" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
              {/* Teclas blancas y negras */}
              {[26, 38, 50, 62, 74, 86, 98, 110, 122].map((kx) => (
                <rect key={kx} x={kx} y="123" width="9" height="14" rx="1" fill="#F8FAFC" />
              ))}
              <line x1="36" y1="142" x2="118" y2="205" stroke="#94A3B8" strokeWidth="4" />
              <line x1="118" y1="142" x2="36" y2="205" stroke="#94A3B8" strokeWidth="4" />
            </g>
          </svg>
        )}

        {/* Regiones clicables invisibles sobre la imagen (se iluminan al pasar el mouse o al seleccionar) */}
        {data.zones.map((zone) => {
          const isSelected = selectedZoneIds.includes(zone.id);
          const isHovered = hoveredZoneId === zone.id;

          const showOutline = isSelected || isHovered || submitted;
          const borderCol = submitted
            ? zone.isRiskTarget
              ? '#10B981'
              : isSelected
                ? '#EF4444'
                : 'transparent'
            : isSelected
              ? '#FDE047'
              : isHovered
                ? 'rgba(255, 255, 255, 0.65)'
                : 'transparent';

          const bgCol = submitted
            ? zone.isRiskTarget
              ? 'rgba(16, 185, 129, 0.24)'
              : isSelected
                ? 'rgba(239, 68, 68, 0.28)'
                : 'transparent'
            : isSelected
              ? 'rgba(250, 204, 21, 0.18)'
              : isHovered
                ? 'rgba(255, 255, 255, 0.08)'
                : 'transparent';

          return (
            <button
              key={zone.id}
              type="button"
              onMouseEnter={() => setHoveredZoneId(zone.id)}
              onMouseLeave={() => setHoveredZoneId(null)}
              onClick={(e) => handleSelectZone(zone.id, e)}
              aria-label={zone.label}
              style={{
                position: 'absolute',
                left: `${zone.xPercent}%`,
                top: `${zone.yPercent}%`,
                width: `${zone.widthPercent}%`,
                height: `${zone.heightPercent}%`,
                border: showOutline ? `3px solid ${borderCol}` : '2px solid transparent',
                backgroundColor: bgCol,
                borderRadius: '12px',
                cursor: 'crosshair',
                padding: '8px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                transition: 'all 0.18s ease',
              }}
            >
              {(isSelected || (submitted && zone.isRiskTarget)) && (
                <span
                  style={{
                    backgroundColor: submitted
                      ? zone.isRiskTarget
                        ? '#10B981'
                        : '#EF4444'
                      : '#0F172A',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    fontSize: '11px',
                    fontWeight: 900,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  {submitted
                    ? zone.isRiskTarget
                      ? `✓ ${zone.label}`
                      : `✕ ${zone.label}`
                    : `🎯 ${zone.label}`}
                </span>
              )}
            </button>
          );
        })}

        {/* Pin / Mira visual exacta donde el usuario hizo clic */}
        { isSingleChoiceMode && clickCoords && selectedZoneIds.length > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${clickCoords.x}%`,
              top: `${clickCoords.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              borderRadius: '999px',
              backgroundColor: submitted
                ? isPerfect
                  ? '#10B981'
                  : '#EF4444'
                : brand.primary,
              border: '3px solid #FFFFFF',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 900,
              boxShadow: '0 0 0 6px rgba(255,255,255,0.28), 0 8px 20px rgba(0,0,0,0.45)',
              pointerEvents: 'none',
            }}
          >
            {submitted ? (isPerfect ? '✓' : '✕') : '🎯'}
          </div>
        )}
      </div>

      <ApaReferenceFooter citation={data.apaCitation} />

      {/* Retroalimentación al comprobar la selección */}
      {submitted && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.zones
            .filter((z) => selectedZoneIds.includes(z.id) || z.isRiskTarget)
            .map((z) => {
              const wasPicked = selectedZoneIds.includes(z.id);
              return (
                <div
                  key={z.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: z.isRiskTarget ? '#ECFDF5' : '#FEF2F2',
                    border: z.isRiskTarget ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
                    color: z.isRiskTarget ? '#065F46' : '#991B1B',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <strong>{z.label}:</strong> {z.feedback}{' '}
                  {!wasPicked && z.isRiskTarget ? '(Esta era la parte correcta de la imagen)' : ''}
                </div>
              );
            })}
        </div>
      )}

      <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={() => {
            setSelectedZoneIds([]);
            setClickCoords(null);
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
          Reiniciar Selección
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={selectedZoneIds.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: selectedZoneIds.length > 0 ? 'pointer' : 'not-allowed',
            opacity: selectedZoneIds.length > 0 ? 1 : 0.5,
          }}
        >
          Comprobar Selección
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   10. WidgetScenarioQuizImageChoice (Selección Visual entre Tarjetas Ilustradas)
   ========================================================= */
export function WidgetScenarioQuizImageChoice({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizImageChoiceBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const chosenCard = data.cards.find((c) => c.id === selectedCardId);
  const earnedPoints = submitted && chosenCard?.isCorrect ? data.points : 0;

  const handleVerify = () => {
    if (!selectedCardId) return;
    setSubmitted(true);
    const card = data.cards.find((c) => c.id === selectedCardId);
    onScoreChange?.(blockId, card?.isCorrect ? data.points : 0, data.points);
  };

  const renderSceneIllustration = (
    visualType: 'clean-desk' | 'sticky-password' | 'unlocked-laptop'
  ) => {
    if (visualType === 'sticky-password') {
      return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <rect width="320" height="180" fill="#FEF2F2" />
          <rect x="65" y="25" width="190" height="115" rx="8" fill="#1E293B" />
          <rect x="75" y="35" width="170" height="90" fill="#334155" />
          {/* Post-it amarillo con contraseña pegado al monitor */}
          <rect x="185" y="95" width="65" height="50" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <text x="192" y="115" fill="#0F172A" fontSize="9" fontWeight="900" fontFamily="monospace">
            PASS:
          </text>
          <text x="192" y="130" fill="#DC2626" fontSize="9.5" fontWeight="900" fontFamily="monospace">
            Admin2026*
          </text>
        </svg>
      );
    }
    if (visualType === 'unlocked-laptop') {
      return (
        <svg viewBox="0 0 320 180" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <rect width="320" height="180" fill="#FFFBEB" />
          <rect x="65" y="25" width="190" height="115" rx="8" fill="#0F172A" />
          <rect x="75" y="35" width="170" height="90" fill="#1E293B" />
          <text x="88" y="65" fill="#F87171" fontSize="10" fontWeight="800" fontFamily="monospace">
            root@prod-db:~# SELECT *
          </text>
          <text x="88" y="85" fill="#FDE047" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
            Sesión abierta sin supervisión
          </text>
          <text x="88" y="105" fill="#CBD5E1" fontSize="9" fontFamily="sans-serif">
            (Puesto vacío en cafetería)
          </text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 320 180" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect width="320" height="180" fill="#ECFDF5" />
        <rect x="65" y="25" width="190" height="115" rx="8" fill="#0F172A" />
        <rect x="75" y="35" width="170" height="90" fill="#065F46" />
        <circle cx="160" cy="72" r="16" fill="#10B981" />
        <text x="154" y="77" fill="#FFFFFF" fontSize="14" fontWeight="900">
          🔒
        </text>
        <text x="98" y="108" fill="#D1FAE5" fontSize="10" fontWeight="800" fontFamily="sans-serif">
          PANTALLA BLOQUEADA (MFA)
        </text>
      </svg>
    );
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {data.cards.map((card) => {
          const isSelected = selectedCardId === card.id;
          const borderCol = submitted
            ? card.isCorrect
              ? '#10B981'
              : isSelected
                ? '#EF4444'
                : '#E2E8F0'
            : isSelected
              ? brand.primary
              : '#E2E8F0';

          return (
            <div
              key={card.id}
              onClick={() => {
                setSubmitted(false);
                setSelectedCardId(card.id);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSubmitted(false);
                  setSelectedCardId(card.id);
                }
              }}
              style={{
                borderRadius: '10px',
                border: `3px solid ${borderCol}`,
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 10px 25px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <ZoomableFigure
                title={card.label}
                caption={card.caption}
                apaCitation={card.apaCitation}
                brandColor={brand.primary}
                maxWidth="100%"
                clickIconOnly
              >
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.label}
                    style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  renderSceneIllustration(card.visualType)
                )}
              </ZoomableFigure>

              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                  {card.label}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  {card.caption}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ApaReferenceFooter citation={data.apaCitation} />

      {submitted && chosenCard && (
        <div
          style={{
            marginTop: '18px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: chosenCard.isCorrect ? '#ECFDF5' : '#FEF2F2',
            border: chosenCard.isCorrect ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
            color: chosenCard.isCorrect ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {chosenCard.feedback}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          disabled={!selectedCardId}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: selectedCardId ? 'pointer' : 'not-allowed',
            opacity: selectedCardId ? 1 : 0.5,
          }}
        >
          Validar Imagen Seleccionada
        </button>
      </div>
    </QuizCardShell>
  );
}

/* =========================================================
   11. WidgetScenarioQuizRiskSlider (Termómetro / Calibrador de Severidad 1..5)
   ========================================================= */
export function WidgetScenarioQuizRiskSlider({
  blockId,
  data,
  brand,
  onScoreChange,
}: {
  blockId: string;
  data: ScenarioQuizRiskSliderBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}) {
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [submitted, setSubmitted] = useState(false);

  const currentLevelObj =
    data.levels.find((l) => l.level === selectedLevel) || data.levels[0];
  const isRight = selectedLevel === data.correctLevel;
  const earnedPoints = submitted ? (isRight ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    onScoreChange?.(
      blockId,
      selectedLevel === data.correctLevel ? data.points : 0,
      data.points
    );
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
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '8px',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          marginBottom: '22px',
          fontSize: '14px',
          lineHeight: 1.55,
          borderLeft: `4px solid ${brand.primary}`,
        }}
      >
        🚨 <strong>Hallazgo reportado:</strong> {data.incidentSummary}
      </div>

      {/* Selector visual de niveles 1..5 + input range */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {data.levels.map((lvl) => {
            const active = lvl.level === selectedLevel;
            return (
              <button
                key={lvl.level}
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedLevel(lvl.level);
                }}
                style={{
                  padding: '12px 8px',
                  borderRadius: '8px',
                  border: active ? `2.5px solid ${lvl.color}` : '1px solid #CBD5E1',
                  backgroundColor: active ? lvl.color : '#F8FAFC',
                  color: active ? '#FFFFFF' : '#334155',
                  fontWeight: 900,
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div>NIVEL {lvl.level}</div>
                <div style={{ fontSize: '10.5px', fontWeight: 700, marginTop: '2px' }}>
                  {lvl.name}
                </div>
              </button>
            );
          })}
        </div>

        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={selectedLevel}
          onChange={(e) => {
            setSubmitted(false);
            setSelectedLevel(Number(e.target.value));
          }}
          style={{ width: '100%', cursor: 'pointer', accentColor: brand.primary }}
        />

        {currentLevelObj && (
          <div
            style={{
              marginTop: '10px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '13px',
              color: '#1E293B',
            }}
          >
            <strong>Protocolo para Nivel {currentLevelObj.level} ({currentLevelObj.name}):</strong>{' '}
            {currentLevelObj.actionRequired}
          </div>
        )}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: '16px',
            padding: '14px 18px',
            borderRadius: '8px',
            backgroundColor: isRight ? '#ECFDF5' : '#FEF2F2',
            border: isRight ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
            color: isRight ? '#065F46' : '#991B1B',
            fontSize: '13.5px',
            fontWeight: 700,
          }}
        >
          {isRight
            ? `✓ ¡Calibración exacta (Nivel ${data.correctLevel})! ${data.explanation}`
            : `✕ Calibración incorrecta. Este incidente corresponde a Nivel ${data.correctLevel}. ${data.explanation}`}
        </div>
      )}

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleVerify}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Confirmar Nivel de Severidad
        </button>
      </div>
    </QuizCardShell>
  );
}


