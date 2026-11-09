import { useId, useRef, useState } from 'react';
import type { CSSProperties, DragEvent } from 'react';
import type {
  BrandPreset,
  ScenarioQuizDragAndDropBlockData,
  ScenarioQuizDragDropItem,
} from '../../../data/courses/courseJsonTypes';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';
import './scenario-classification.css';

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
  const headingId = useId();
  const focusItemId = useRef<string | null>(null);
  const [assignments, setAssignments] = useQuizAnswer<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const { submitted, setSubmitted } = useQuizSubmission();

  const pending = data.items.filter((item) => !assignments[item.id]);
  const assignedCount = data.items.length - pending.length;
  const allAssigned = pending.length === 0 && data.items.length > 0;
  const correctCount = data.items.filter(
    (item) => assignments[item.id] === item.correctCategoryId
  ).length;
  const score = Math.round((correctCount / Math.max(1, data.items.length)) * data.points);

  const moveItem = (itemId: string, categoryId: string) => {
    setSelectedItemId(null);
    if ((assignments[itemId] || '') === categoryId) return;
    setSubmitted(false);
    setAssignments((previous) => {
      const next = { ...previous };
      if (categoryId) next[itemId] = categoryId;
      else delete next[itemId];
      return next;
    });
    if (submitted) onScoreChange?.(blockId, 0, data.points);
  };

  const endDrag = () => {
    setDraggedItemId(null);
    setHoveredZone(null);
  };

  const dropZoneProps = (categoryId: string) => ({
    'data-drop-active': draggedItemId !== null && hoveredZone === categoryId,
    onDragOver: (event: DragEvent<HTMLElement>) => {
      if (draggedItemId === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setHoveredZone(categoryId);
    },
    onDragLeave: (event: DragEvent<HTMLElement>) => {
      if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
      setHoveredZone((previous) => previous === categoryId ? null : previous);
    },
    onDrop: (event: DragEvent<HTMLElement>) => {
      if (draggedItemId === null) return;
      event.preventDefault();
      moveItem(draggedItemId, categoryId);
      endDrag();
    },
  });

  const renderDestination = (categoryId: string, label: string) => {
    if (selectedItemId === null || (assignments[selectedItemId] || '') === categoryId) return null;
    return (
      <button
        type="button"
        className="classification-destination"
        onClick={() => {
          focusItemId.current = selectedItemId;
          moveItem(selectedItemId, categoryId);
        }}
      >
        {label}
      </button>
    );
  };

  const renderCard = (item: ScenarioQuizDragDropItem) => {
    const categoryId = assignments[item.id] || '';
    const isCorrect = categoryId === item.correctCategoryId;
    return (
      <li
        key={item.id}
        className="classification-card"
        data-dragging={draggedItemId === item.id}
        data-result={submitted ? (isCorrect ? 'correct' : 'incorrect') : undefined}
      >
        <button
          type="button"
          className="classification-card-button"
          aria-pressed={selectedItemId === item.id}
          draggable
          onDragStart={(event) => {
            setSelectedItemId(null);
            event.dataTransfer.setData('text/plain', item.text);
            event.dataTransfer.effectAllowed = 'move';
            setDraggedItemId(item.id);
          }}
          onDragEnd={endDrag}
          ref={(button) => {
            if (button && focusItemId.current === item.id) {
              focusItemId.current = null;
              button.focus();
            }
          }}
          onClick={() => {
            setSelectedItemId((previous) => previous === item.id ? null : item.id);
          }}
        >
          {item.imageUrl && (
            <img className="classification-card-image" src={item.imageUrl} alt="" draggable={false} />
          )}
          <span className="classification-card-label">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" aria-hidden="true">
              <circle cx="3" cy="3" r="1.25" /><circle cx="9" cy="3" r="1.25" />
              <circle cx="3" cy="8" r="1.25" /><circle cx="9" cy="8" r="1.25" />
              <circle cx="3" cy="13" r="1.25" /><circle cx="9" cy="13" r="1.25" />
            </svg>
            <span>{item.text}</span>
          </span>
        </button>
        {submitted && (
          <p className="classification-feedback">
            <strong>{isCorrect ? 'Correcto. ' : 'Revisa el destino. '}</strong>{item.feedback}
          </p>
        )}
      </li>
    );
  };

  return (
    <QuizCardShell
      variant="board"
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={submitted ? score : 0}
      submitted={submitted}
    >
      <div
        className="classification-board"
        data-illustrated={data.items.some((item) => Boolean(item.imageUrl))}
        style={{
          '--board-accent': brand.primaryDark,
          '--board-accent-soft': brand.primaryLight,
        } as CSSProperties}
      >
        <p className="classification-instructions">
          Arrastra cada tarjeta a su categoría o selecciona una tarjeta y pulsa su destino.
        </p>
        <div className="classification-layout">
          <section className="classification-pool" aria-labelledby={headingId} {...dropZoneProps('')}>
            <header className="classification-zone-header">
              <h4 id={headingId}>Por clasificar</h4>
              <span aria-label={`${pending.length} tarjetas pendientes`}>{pending.length}</span>
            </header>
            {pending.length ? (
              <ul className="classification-cards">{pending.map(renderCard)}</ul>
            ) : (
              <p className="classification-empty">Todas las tarjetas tienen destino.</p>
            )}
            {renderDestination('', 'Volver a pendientes')}
          </section>

          <div className="classification-zones" aria-label="Categorías" role="group">
            {data.categories.map((category) => {
              const cards = data.items.filter((item) => assignments[item.id] === category.id);
              return (
                <section
                  key={category.id}
                  className="classification-zone"
                  aria-label={category.title}
                  data-accent={category.accentColor}
                  {...dropZoneProps(category.id)}
                >
                  <header className="classification-zone-header">
                    <div>
                      <h4>{category.title}</h4>
                      {category.subtitle && <p>{category.subtitle}</p>}
                    </div>
                    <span aria-label={`${cards.length} tarjetas`}>{cards.length}</span>
                  </header>
                  {cards.length ? (
                    <ul className="classification-cards">{cards.map(renderCard)}</ul>
                  ) : (
                    <p className="classification-empty">Suelta aquí</p>
                  )}
                  {renderDestination(category.id, `Colocar en ${category.title}`)}
                </section>
              );
            })}
          </div>
        </div>

        <footer className="classification-footer">
          <p role="status">
            {submitted ? `${correctCount} de ${data.items.length} correctas`
              : `${assignedCount} de ${data.items.length} clasificadas`}
          </p>
          <div className="classification-actions">
            <button
              type="button"
              disabled={assignedCount === 0}
              onClick={() => {
                focusItemId.current = data.items[0]?.id ?? null;
                setAssignments({});
                setSelectedItemId(null);
                setSubmitted(false);
                endDrag();
                onScoreChange?.(blockId, 0, data.points);
              }}
            >
              Reiniciar
            </button>
            <button data-quiz-check
              type="button"
              disabled={!allAssigned}
              onClick={() => {
                setSubmitted(true);
                onScoreChange?.(blockId, score, data.points);
              }}
            >
              Comprobar
            </button>
          </div>
        </footer>
      </div>
    </QuizCardShell>
  );
}
