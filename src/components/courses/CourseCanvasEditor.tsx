import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ArrowDownToLine, Files, Maximize2, Minimize2, Plus, Search, X } from 'lucide-react';
import type { CourseContenido, CourseWidgetBlock } from '../../data/courses/courseJsonTypes';
import { widgetTemplateLabels, widgetTemplates } from '../../data/courses/widgetTemplates';
import './course-canvas-editor.css';

export type CanvasInsertion = {
  sectionId: string;
  afterId?: string;
  beforeId?: string;
  location: string;
  mode: 'resource' | 'page';
};

export function CanvasInsertBar({ location, onOpen }: {
  location: string;
  onOpen: (mode: CanvasInsertion['mode']) => void;
}) {
  return (
    <div className="canvas-insert" role="group" aria-label={location}>
      <button type="button" className="canvas-button canvas-primary" onClick={() => onOpen('resource')}>
        <Plus size={17} aria-hidden="true" /> Añadir recurso
      </button>
      <button type="button" className="canvas-button" onClick={() => onOpen('page')}>
        <Files size={16} aria-hidden="true" /> Salto de página
      </button>
    </div>
  );
}

const groups = ['Todas', 'Contenido', 'Práctica', 'Evaluación'] as const;
const normalize = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('es');
const catalog = [...widgetTemplates].sort((a, b) => {
  const [labelA, groupA] = widgetTemplateLabels[a.widget.type];
  const [labelB, groupB] = widgetTemplateLabels[b.widget.type];
  return groups.indexOf(groupA) - groups.indexOf(groupB) || labelA.localeCompare(labelB, 'es');
});

function templateImage(widget: CourseWidgetBlock) {
  switch (widget.type) {
    case 'hero-banner':
    case 'image-cover-banner':
      return widget.data.bannerImageUrl;
    case 'architecture-hotspots-visual':
      return widget.data.layers[0]?.rightImageUrl;
    case 'slide-cards':
    case 'scenario-quiz-image-choice':
      return widget.data.cards.find((card) => card.imageUrl)?.imageUrl;
    case 'scenario-quiz-drag-drop':
      return widget.data.items.find((item) => item.imageUrl)?.imageUrl;
    case 'flip-cards-3d':
      return widget.data.cards.find((card) => card.frontImageUrl)?.frontImageUrl;
    case 'scenario-quiz-image-hotspot':
      return widget.data.imageUrl;
    case 'video-editorial': {
      const id = widget.data.videoUrl.match(/^https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})(?:[?#]|$)/)?.[1];
      return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : undefined;
    }
    default:
      return undefined;
  }
}

function TemplateThumbnail({ widget }: { widget: CourseWidgetBlock }) {
  const [failed, setFailed] = useState(false);
  const src = templateImage(widget);
  const type = widget.type;
  const layout = type === 'video-editorial' ? 'video'
    : type === 'final-report' ? 'report'
      : type.includes('code') || type.includes('spotter') || type.includes('fill-blank') ? 'code'
        : type.includes('cards') || type.includes('hotspots') || type.includes('drag-drop') ? 'cards'
          : type.includes('quiz') || type.includes('checklist') ? 'choices' : 'text';
  return (
    <span className="canvas-thumbnail" data-layout={layout} aria-hidden="true">
      {src && !failed
        ? <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
        : <span className="canvas-thumbnail-sketch"><i /><i /><i /><i /></span>}
    </span>
  );
}

export function CourseInsertDialog({ insertion, onClose, onInsert, onPage, renderPreview }: {
  insertion: CanvasInsertion;
  onClose: () => void;
  onInsert: (template: CourseContenido) => boolean;
  onPage: (title: string) => boolean;
  renderPreview: (template: CourseContenido) => ReactNode;
}) {
  const headingId = useId();
  const errorId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const initialFocus = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLElement>(null);
  const previewBodyRef = useRef<HTMLDivElement>(null);
  const [group, setGroup] = useState<(typeof groups)[number]>('Todas');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [error, setError] = useState('');
  const search = normalize(query.trim());
  const visible = catalog.filter(({ title, widget }) => {
    const [label, category] = widgetTemplateLabels[widget.type];
    return (group === 'Todas' || group === category) &&
      normalize([title, widget.summary, widget.componentName, label, category].join(' ')).includes(search);
  });
  const selected = visible.find((entry) => entry.id === selectedId) ?? visible[0];
  const selectedTemplateId = selected?.id;

  useEffect(() => {
    if (previewBodyRef.current) previewBodyRef.current.scrollTop = 0;
  }, [selectedTemplateId, expanded]);

  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    initialFocus.current?.focus({ preventScroll: true });
    return () => dialog.close();
  }, []);

  const isPage = insertion.mode === 'page';
  return (
    <dialog ref={ref} className={isPage ? 'canvas-dialog' : 'canvas-dialog canvas-resource-dialog'} aria-labelledby={headingId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <form onSubmit={(event) => {
        event.preventDefault();
        if (isPage && !pageTitle.trim()) {
          setError('Escribe un nombre para la nueva página.');
          initialFocus.current?.focus();
          return;
        }
        if (isPage ? !onPage(pageTitle.trim()) : selected && !onInsert(selected)) {
          setError('No se encontró el punto de inserción. Cierra el panel y vuelve a intentarlo.');
        }
      }}>
        <header className="canvas-dialog-header">
          <div>
            <h2 id={headingId}>{isPage ? 'Crear una página' : 'Añadir un recurso'}</h2>
            <p>{insertion.location}</p>
          </div>
          <button type="button" className="canvas-button canvas-icon-button" onClick={onClose} aria-label="Cerrar">
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        {isPage ? (
          <div className="canvas-dialog-body">
            <p>El contenido que sigue comenzará en una página aparte. Podrás abrirla desde el índice o con los botones de navegación.</p>
            <label className="canvas-field">
              Nombre en el índice
              <input ref={initialFocus} value={pageTitle} maxLength={80} required placeholder="Ej. Práctica de autenticación"
                aria-invalid={!!error} aria-describedby={error ? errorId : undefined}
                onChange={(event) => { setPageTitle(event.target.value); setError(''); }} />
            </label>
          </div>
        ) : (
          <div className="canvas-dialog-body canvas-resource-body" data-expanded={expanded}>
            <div className="canvas-library-tools">
              <label className="canvas-field">
                <span className="sr-only">Buscar plantilla</span>
                <span className="canvas-search">
                  <Search size={17} aria-hidden="true" />
                  <input ref={initialFocus} type="search" placeholder="Buscar plantilla"
                    value={query} onChange={(event) => {
                      setQuery(event.target.value);
                      setExpanded(false);
                    }} />
                </span>
              </label>
              <div className="canvas-filters" role="group" aria-label="Categorías de plantillas">
                {groups.map((name) => <button className="canvas-button" type="button" key={name}
                  aria-pressed={group === name} onClick={() => {
                    setGroup(name);
                    setExpanded(false);
                  }}>{name}</button>)}
              </div>
            </div>
            <div className="canvas-library" data-expanded={expanded}>
              <fieldset className="canvas-options" hidden={expanded}>
                <legend className="sr-only">Plantillas disponibles</legend>
                {visible.map(({ id, title, widget }) => {
                  const [label] = widgetTemplateLabels[widget.type];
                  return <div key={id} className="canvas-option">
                    <label>
                      <input className="sr-only" type="radio" name="widget-template" value={id}
                        checked={selected?.id === id} onChange={() => setSelectedId(id)} />
                      <TemplateThumbnail widget={widget} />
                      <span><strong>{label}</strong><small>{title}</small></span>
                    </label>
                    <button type="button" className="canvas-button canvas-icon-button canvas-card-preview"
                      aria-label={`Ampliar vista previa de ${title}`} title="Ampliar vista previa"
                      onClick={() => {
                        setSelectedId(id);
                        setExpanded(true);
                        requestAnimationFrame(() => previewRef.current?.focus({ preventScroll: true }));
                      }}><Maximize2 size={16} aria-hidden="true" /></button>
                  </div>;
                })}
                {!visible.length && <p role="status">No hay coincidencias. Prueba con otra búsqueda o categoría.</p>}
              </fieldset>
              {selected && <aside ref={previewRef} tabIndex={-1} className="canvas-template-preview" aria-label="Vista previa de la plantilla seleccionada">
                <div className="canvas-preview-header">
                  <h3>{selected.title}</h3>
                  <button type="button" className="canvas-button canvas-preview-toggle" aria-expanded={expanded}
                    onClick={() => {
                      setExpanded(!expanded);
                      if (expanded) requestAnimationFrame(() => {
                        const radio = ref.current?.querySelector<HTMLInputElement>('.canvas-option input:checked');
                        radio?.focus();
                      });
                    }}>
                    {expanded ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
                    {expanded ? 'Ver tarjetas' : 'Ampliar'}
                  </button>
                </div>
                <div className="canvas-preview-body" ref={previewBodyRef} tabIndex={0} role="region" aria-label="Ejemplo del recurso">
                  <div inert className="canvas-preview-widget" key={selected.id}>
                    {selected.widget.type === 'video-editorial'
                      ? <TemplateThumbnail widget={selected.widget} />
                      : renderPreview(selected)}
                  </div>
                </div>
              </aside>}
            </div>
          </div>
        )}
        {error && <p className="canvas-error" id={errorId} role="alert">{error}</p>}
        <footer className="canvas-dialog-footer">
          <button className="canvas-button" type="button" onClick={onClose}>Cancelar</button>
          <button className="canvas-button canvas-primary" type="submit" disabled={!isPage && !selected}>
            <ArrowDownToLine size={17} aria-hidden="true" />
            {isPage ? 'Crear página' : 'Insertar plantilla'}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
