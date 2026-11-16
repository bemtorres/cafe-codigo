import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Check, Clapperboard, Download, Eye, FileText, Image, ListChecks, Plus, Save, Trash2 } from 'lucide-react';
import { widgetTemplates } from '../../data/courses/widgetTemplates';
import { BRANDING_COURSE } from '../../data/courses/brandingCourseDemoData';
import { WidgetPropertiesEditor } from './widgets/WidgetPropertiesEditor';
import { BRAND_PRESETS } from '../../data/courses/brandPresets';
import { isCourseDocument } from '../../data/courses/courseDocument';
import type { CourseContenido, CourseDocumentJSON, CourseWidgetBlock } from '../../data/courses/courseJsonTypes';
import { BrandingModulePlayer } from './BrandingCoursePlayer';
import { WidgetDocumentResources } from './widgets/WidgetDocumentResources';
import { WidgetScenarioQuizImageHotspot } from './widgets/WidgetScenarioQuizImageHotspot';
import { WidgetRichTextEditorial } from './widgets/WidgetRichTextEditorial';
import './course-creator.css';

const palette = [
  { type: 'image-cover-banner', label: 'Portada', icon: Image },
  { type: 'rich-text-editorial', label: 'Lectura', icon: FileText },
  { type: 'video-editorial', label: 'Video', icon: Clapperboard },
  { type: 'scenario-quiz-multiple', label: 'Pregunta', icon: ListChecks },
] as const;

type CreatorType = typeof palette[number]['type'];
const newId = () => crypto.randomUUID();
const slugify = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 80).replace(/^-|-$/g, '');
const section = () => ({ id: newId(), title: 'Introducción', contenidos: [] as CourseContenido[] });
const lesson = () => ({ id: newId(), title: 'Nueva lección', secciones: [section()] });
const moduleEntry = () => ({ id: newId(), title: 'Nuevo módulo', lessions: [lesson()] });

function newWidget(type: CreatorType, title: string): CourseWidgetBlock {
  const common = { id: newId(), summary: title };
  switch (type) {
    case 'image-cover-banner':
      return { ...common, type, componentName: 'WidgetImageCoverBanner', data: {
        bannerTitlePrefix: title, includeInstitutionName: false, bannerDescription: '', bannerImageUrl: '',
      } };
    case 'rich-text-editorial':
      return { ...common, type, componentName: 'WidgetRichTextEditorial', data: { title, htmlContent: '<p></p>' } };
    case 'video-editorial':
      return { ...common, type, componentName: 'WidgetVideoEditorial', data: { title, videoUrl: '', objective: '' } };
    case 'scenario-quiz-multiple':
      return { ...common, type, componentName: 'WidgetScenarioQuizMultiple', data: {
        title, badge: 'Pregunta', context: '', instruction: 'Selecciona todas las respuestas correctas.',
        points: 10, successFeedback: 'Respuesta correcta.', errorFeedback: 'Revisa las opciones.',
        options: [true, false].map((isCorrect) => ({ id: newId(), text: '', isCorrect, explanation: '' })),
      } };
  }
}

function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean;
}) {
  return <label className="creator-field">
    <span>{label}</span>
    {multiline
      ? <textarea rows={3} value={value} onChange={(event) => onChange(event.target.value)} />
      : <input value={value} onChange={(event) => onChange(event.target.value)} />}
  </label>;
}

function widgetError({ widget }: CourseContenido) {
  if (widget.type === 'video-editorial' && !/^https:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\/)\S+$/i.test(widget.data.videoUrl)) {
    return 'Introduce una URL de inserción HTTPS de YouTube o Vimeo.';
  }
  if (widget.type === 'scenario-quiz-multiple' &&
      (widget.data.options.some((option) => !option.text.trim()) ||
        !widget.data.options.some((option) => option.isCorrect))) {
    return 'Completa las opciones y marca al menos una respuesta correcta.';
  }
  return '';
}

export default function CourseCreator({ documents }: { documents: { courseId: string; title: string }[] }) {
  const emptyDocument = (): CourseDocumentJSON => ({
    courseId: '', version: '1.0.0', title: '', institution: 'Café y Código',
    defaultBrandId: 'cafeycodigo', showScoreInBanner: false,
    modulos: [{
      id: 'modulo-1', title: 'Módulo 1', lessions: [{
        id: 'leccion-1', title: 'Lección 1', secciones: [{ id: 'introduccion', title: 'Introducción', contenidos: [] }],
      }],
    }],
  });
  const [draft, setDraft] = useState(emptyDocument);
  const [selection, setSelection] = useState([0, 0, 0]);
  const [activeId, setActiveId] = useState('');
  const [revision, setRevision] = useState<string | null>(null);
  const [loadId, setLoadId] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewModuleId, setPreviewModuleId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [editingProperties, setEditingProperties] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ text: string; error?: boolean }>();
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const [m, l, s] = selection;
  const courseModule = draft.modulos[m];
  const courseLesson = courseModule.lessions[l];
  const courseSection = courseLesson.secciones[s];
  const blocks = courseSection.contenidos;
  const activeIndex = blocks.findIndex((block) => block.id === activeId);
  const active = blocks[activeIndex];
  const brand = BRAND_PRESETS.find((entry) => entry.id === draft.defaultBrandId) ?? BRAND_PRESETS[0];

  function update(change: (document: CourseDocumentJSON) => void) {
    setDraft((previous) => {
      const next = structuredClone(previous);
      change(next);
      return next;
    });
    setShowPreview(false);
    setDirty(true);
    setStatus(undefined);
  }

  const updateBlocks = (change: (items: CourseContenido[]) => void) =>
    update((document) => change(document.modulos[m].lessions[l].secciones[s].contenidos));
  const updateWidget = (widget: CourseWidgetBlock) => updateBlocks((items) => {
    items[activeIndex].widget = widget;
  });

  function selectPath(path: number[]) {
    setSelection(path);
    setEditingProperties(false);
    setActiveId(draft.modulos[path[0]].lessions[path[1]].secciones[path[2]].contenidos[0]?.id ?? '');
    setShowPreview(false);
  }

  function addBlock(type: CreatorType) {
    const title = palette.find((item) => item.type === type)!.label;
    const item = { id: newId(), title, widget: newWidget(type, title) };
    updateBlocks((items) => items.push(item));
    setActiveId(item.id);
    setEditingProperties(false);
    setShowPreview(false);
  }

  function moveBlock(direction: number) {
    updateBlocks((items) => {
      const target = activeIndex + direction;
      [items[activeIndex], items[target]] = [items[target], items[activeIndex]];
    });
  }

  function prepareDocument() {
    const document = { ...draft, courseId: draft.courseId || slugify(draft.title) };
    if (!isCourseDocument(document) || slugify(document.courseId) !== document.courseId) {
      throw new Error('Completa el nombre de la asignatura y los títulos del temario y sus bloques.');
    }
    const all = document.modulos.flatMap((item) =>
      item.lessions.flatMap((entry) => entry.secciones.flatMap((group) => group.contenidos)));
    if (!all.length) throw new Error('Añade al menos un widget a la asignatura.');
    for (const block of all) {
      const error = widgetError(block);
      if (error) throw new Error(block.title + ' · ' + error);
    }
    return document;
  }

  async function save() {
    setLoading(true);
    setStatus(undefined);
    try {
      const document = prepareDocument();
      const response = await fetch('/api/local/contenidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document, revision }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setRevision(result.json);
      setDraft(document);
      setDirty(false);
      setStatus({ text: 'Guardado en SQLite y en ' + result.path });
    } catch (error) {
      setStatus({ text: error instanceof SyntaxError ? 'Ejecuta npm run dev para guardar en el proyecto.' :
        error instanceof Error ? error.message : 'No se pudo guardar.', error: true });
    } finally {
      setLoading(false);
    }
  }

  async function open() {
    if (dirty && !window.confirm('¿Descartar los cambios de la asignatura actual?')) return;
    setLoading(true);
    setStatus(undefined);
    try {
      const response = await fetch('/contenidos/' + loadId + '.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('No se pudo abrir la asignatura.');
      const source = await response.text();
      const document: unknown = JSON.parse(source);
      if (!isCourseDocument(document) || document.courseId !== loadId) throw new Error('El JSON de la asignatura es inválido.');
      if (!document.modulos.length) document.modulos.push(moduleEntry());
      for (const entry of document.modulos) {
        if (!entry.lessions.length) entry.lessions.push(lesson());
        for (const item of entry.lessions) {
          if (!item.secciones.length) item.secciones.push(section());
        }
      }
      setDraft(document);
      setSelection([0, 0, 0]);
      setActiveId(document.modulos[0].lessions[0].secciones[0].contenidos[0]?.id ?? '');
      setRevision(source);
      setDirty(false);
      setEditingProperties(false);
      setShowPreview(false);
    } catch (error) {
      setStatus({ text: error instanceof Error ? error.message : 'No se pudo abrir la asignatura.', error: true });
    } finally {
      setLoading(false);
    }
  }

  function download() {
    try {
      const document = prepareDocument();
      const url = URL.createObjectURL(new Blob([JSON.stringify(document, null, 2) + '\n'], { type: 'application/json' }));
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.courseId + '.json';
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      setStatus({ text: error instanceof Error ? error.message : 'No se pudo descargar.', error: true });
    }
  }

  function startNew() {
    if (dirty && !window.confirm('¿Descartar los cambios de la asignatura actual?')) return;
    setDraft(emptyDocument());
    setSelection([0, 0, 0]);
    setActiveId('');
    setEditingProperties(false);
    setLoadId('');
    setRevision(null);
    setDirty(false);
    setShowPreview(false);
    setStatus(undefined);
  }

  function loadBrandingExample() {
    if (dirty && !window.confirm('¿Descartar los cambios de la asignatura actual?')) return;
    const document = structuredClone(BRANDING_COURSE);
    document.courseId = '';
    document.title = 'Copia de ' + document.title;
    setDraft(document);
    setSelection([0, 0, 0]);
    setActiveId(document.modulos[0].lessions[0]?.secciones[0]?.contenidos[0]?.id ?? '');
    setRevision(null);
    setDirty(true);
    setEditingProperties(false);
    setShowPreview(false);
    setStatus(undefined);
  }

  function addTemplate() {
    const template = widgetTemplates.find(({ id }) => id === templateId);
    if (!template) return;
    const item = structuredClone(template);
    item.id = newId();
    item.widget.id = item.id;
    updateBlocks((items) => items.push(item));
    setActiveId(item.id);
    setEditingProperties(false);
    setShowPreview(false);
  }

  const selectedWidget = active?.widget;
  const inlineWidget = selectedWidget?.type === 'rich-text-editorial' ||
    selectedWidget?.type === 'document-resources' || selectedWidget?.type === 'scenario-quiz-image-hotspot';
  const previewBrand = { ...brand, ...selectedWidget?.brandColors };
  return <div className="creator academy-wrap">
    <header className="creator-header">
      <div>
        <a href="/app/contenidos/">← Asignaturas interactivas</a>
        <h1>Editor de contenidos LMS</h1>
      </div>
      <div className="creator-actions">
        <button disabled={loading} onClick={loadBrandingExample}>Abrir ejemplo Branding</button>
        {(draft.courseId || dirty) && <button disabled={loading} onClick={startNew}><Plus size={16} /> Nueva asignatura</button>}
        <button disabled={loading} onClick={download}><Download size={16} /> Descargar JSON</button>
        <button className="creator-primary" disabled={loading} onClick={save}>
          <Save size={16} /> {loading ? 'Procesando…' : 'Guardar asignatura'}
        </button>
      </div>
    </header>
    {status && <p className="creator-status" data-error={status.error} role={status.error ? 'alert' : 'status'}>
      {!status.error && <Check size={16} />} {status.text}
    </p>}
    {revision && <p className="creator-view-link"><a href={'/app/contenidos/ver/?id=' + draft.courseId}>Abrir aula del estudiante ↗</a></p>}
    <fieldset className="creator-workspace" disabled={loading}>
      <aside className="creator-outline" aria-label="Temario y secuencia">
        <h2>Temario</h2>
        <label className="creator-field"><span>Módulo</span>
          <select value={m} onChange={(event) => selectPath([Number(event.target.value), 0, 0])}>
            {draft.modulos.map((entry, index) => <option value={index} key={entry.id}>{entry.title}</option>)}
          </select>
        </label>
        <label className="creator-field"><span>Lección</span>
          <select value={l} onChange={(event) => selectPath([m, Number(event.target.value), 0])}>
            {courseModule.lessions.map((entry, index) => <option value={index} key={entry.id}>{entry.title}</option>)}
          </select>
        </label>
        <label className="creator-field"><span>Sección</span>
          <select value={s} onChange={(event) => selectPath([m, l, Number(event.target.value)])}>
            {courseLesson.secciones.map((entry, index) => <option value={index} key={entry.id}>{entry.title}</option>)}
          </select>
        </label>
        <details>
          <summary>Editar temario</summary>
          <Field label="Título del módulo" value={courseModule.title} onChange={(value) => update((doc) => { doc.modulos[m].title = value; })} />
          <Field label="Título de la lección" value={courseLesson.title} onChange={(value) => update((doc) => { doc.modulos[m].lessions[l].title = value; })} />
          <Field label="Título de la sección" value={courseSection.title} onChange={(value) => update((doc) => { doc.modulos[m].lessions[l].secciones[s].title = value; })} />
          <div className="creator-add">
            <button onClick={() => {
              const entry = moduleEntry();
              update((doc) => doc.modulos.push(entry));
              setSelection([draft.modulos.length, 0, 0]);
              setActiveId('');
            }}><Plus size={14} /> Módulo</button>
            <button onClick={() => {
              const entry = lesson();
              update((doc) => doc.modulos[m].lessions.push(entry));
              setSelection([m, courseModule.lessions.length, 0]);
              setActiveId('');
            }}><Plus size={14} /> Lección</button>
            <button onClick={() => {
              const entry = section();
              update((doc) => doc.modulos[m].lessions[l].secciones.push(entry));
              setSelection([m, l, courseLesson.secciones.length]);
              setActiveId('');
            }}><Plus size={14} /> Sección</button>
          </div>
        </details>
        <h2>Secuencia</h2>
        <ol className="creator-steps">
          {blocks.map((block, index) => <li key={block.id}>
            <button aria-pressed={block.id === activeId} onClick={() => { setActiveId(block.id); setEditingProperties(false); setShowPreview(false); }}>
              <span>{index + 1}</span><strong>{block.title}</strong>
            </button>
          </li>)}
        </ol>
        <div className="creator-palette" aria-label="Añadir widget">
          {palette.map(({ type, label, icon: Icon }) => <button key={type} onClick={() => addBlock(type)}>
            <Icon size={17} /> {label}
          </button>)}
        </div>
        <label className="creator-field"><span>Widgets de Branding</span>
          <select value={templateId} onChange={(event) => setTemplateId(event.target.value)}>
            <option value="">Elige una plantilla</option>
            {widgetTemplates.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
        </label>
        <button type="button" disabled={!templateId} onClick={addTemplate}><Plus size={16} /> Añadir plantilla</button>
      </aside>

      <div className="creator-main">
        <section className="creator-course">
          <Field label="Nombre de la asignatura" value={draft.title} onChange={(value) => update((doc) => { doc.title = value; })} />
          <details>
            <summary>Ajustes de la asignatura</summary>
            <div className="creator-settings">
              <Field label="Institución" value={draft.institution} onChange={(value) => update((doc) => { doc.institution = value; })} />
              <label className="creator-field"><span>Estilo visual</span>
                <select value={draft.defaultBrandId} onChange={(event) => {
                  const value = event.target.value;
                  update((doc) => { doc.defaultBrandId = value; });
                }}>{BRAND_PRESETS.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}</select>
              </label>
              <label className="creator-check"><input type="checkbox" checked={draft.showScoreInBanner} onChange={(event) => {
                const checked = event.target.checked;
                update((doc) => { doc.showScoreInBanner = checked; });
              }} /> Mostrar puntaje en el aula</label>
            </div>
          </details>
        </section>

        {active && selectedWidget ? <section className="creator-canvas">
          <header className="creator-block-header">
            <h2>Paso {activeIndex + 1} de {blocks.length}</h2>
            <div className="creator-actions">
              <button aria-label="Mover hacia arriba" title="Mover hacia arriba" disabled={activeIndex === 0} onClick={() => moveBlock(-1)}><ArrowUp size={16} /></button>
              <button aria-label="Mover hacia abajo" title="Mover hacia abajo" disabled={activeIndex === blocks.length - 1} onClick={() => moveBlock(1)}><ArrowDown size={16} /></button>
              <button aria-label="Eliminar paso" title="Eliminar paso" onClick={() => {
                if (!window.confirm('¿Eliminar este paso?')) return;
                setActiveId((blocks[activeIndex + 1] ?? blocks[activeIndex - 1])?.id ?? '');
                updateBlocks((items) => items.splice(activeIndex, 1));
              }}><Trash2 size={16} /></button>
            </div>
          </header>
          <div className="creator-block-body" key={active.id}>
            <Field label="Título del paso" value={active.title} onChange={(value) => updateBlocks((items) => {
              const item = items[activeIndex];
              const widget = item.widget;
              item.title = value;
              widget.summary = value;
              if (widget.type === 'image-cover-banner') widget.data.bannerTitlePrefix = value;
              if (widget.type === 'rich-text-editorial' || widget.type === 'video-editorial' || widget.type === 'scenario-quiz-multiple') {
                widget.data.title = value;
              }
            })} />
            <label className="creator-field"><span>Fondo del bloque</span>
              <select value={selectedWidget.bgMode ?? 'default'} onChange={(event) =>
                updateWidget({ ...selectedWidget, bgMode: event.target.value as CourseWidgetBlock['bgMode'] })}>
                <option value="default">Predeterminado</option><option value="white">Blanco</option>
                <option value="soft">Suave</option><option value="brand">Institucional</option>
              </select>
            </label>
            <button type="button" aria-expanded={editingProperties}
              onClick={() => setEditingProperties(!editingProperties)}>Editar propiedades</button>
            {editingProperties && <WidgetPropertiesEditor key={selectedWidget.id}
              widget={selectedWidget}
              examples={widgetTemplates.filter(({ widget }) => widget.type === selectedWidget.type).map(({ widget }) => widget)}
              onCancel={() => setEditingProperties(false)}
              onSave={(widget) => { updateWidget(widget); setEditingProperties(false); }}
            />}
            {!editingProperties && <WidgetFields widget={selectedWidget} onChange={updateWidget} />}
            <button type="button" aria-pressed={showPreview} onClick={() => {
              setPreviewModuleId(courseModule.id);
              setShowPreview(!showPreview);
            }}><Eye size={16} /> {showPreview ? 'Cerrar vista previa' : 'Vista previa del aula'}</button>
          </div>
          {inlineWidget && !editingProperties && <div className="creator-preview"
            data-background={selectedWidget.bgMode ?? 'default'}
            style={{ background: selectedWidget.bgMode === 'brand' ? previewBrand.bgQuiz
              : selectedWidget.bgMode === 'custom' ? selectedWidget.bgColor
              : selectedWidget.bgMode === 'dark' ? '#0f172a' : undefined }}>
            {selectedWidget.type === 'rich-text-editorial' &&
              <WidgetRichTextEditorial key={active.id} isEditMode data={selectedWidget.data} brand={previewBrand}
                onUpdateData={(data) => updateWidget({ ...selectedWidget, data })} />}
            {selectedWidget.type === 'document-resources' &&
              <WidgetDocumentResources key={active.id} isEditMode data={selectedWidget.data} brand={previewBrand}
                onUpdateData={(data) => updateWidget({ ...selectedWidget, data })} />}
            {selectedWidget.type === 'scenario-quiz-image-hotspot' &&
              <WidgetScenarioQuizImageHotspot key={active.id} blockId={selectedWidget.id} isEditMode
                data={selectedWidget.data} brand={previewBrand}
                onUpdateData={(data) => updateWidget({ ...selectedWidget, data })} />}
          </div>}
          {showPreview && <BrandingModulePlayer key={previewModuleId} initialCourse={draft}
            moduleId={previewModuleId} onSelectModule={setPreviewModuleId} sequence={false} preview />}
        </section> : <section className="creator-empty">
          <h2>Añade el primer paso</h2>
          <p>Elige un widget del temario para empezar a armar la secuencia.</p>
        </section>}

        <details className="creator-library">
          <summary>Abrir asignatura guardada</summary>
          <div className="creator-actions">
            <label className="creator-field"><span>Asignatura</span>
              <select value={loadId} onChange={(event) => setLoadId(event.target.value)}>
                <option value="">Selecciona una asignatura</option>
                {documents.map((entry) => <option key={entry.courseId} value={entry.courseId}>{entry.title}</option>)}
                {draft.courseId && !documents.some((entry) => entry.courseId === draft.courseId) && <option value={draft.courseId}>{draft.title}</option>}
              </select>
            </label>
            <button disabled={!loadId} onClick={open}>Abrir</button>
          </div>
        </details>
      </div>
    </fieldset>
  </div>;
}

function WidgetFields({ widget, onChange }: { widget: CourseWidgetBlock; onChange: (widget: CourseWidgetBlock) => void }) {
  if (widget.type === 'image-cover-banner') return <>
    <Field label="Descripción de la portada" multiline value={widget.data.bannerDescription}
      onChange={(value) => onChange({ ...widget, data: { ...widget.data, bannerDescription: value } })} />
    <Field label="URL de imagen" value={widget.data.bannerImageUrl}
      onChange={(value) => onChange({ ...widget, data: { ...widget.data, bannerImageUrl: value } })} />
  </>;
  if (widget.type === 'video-editorial') return <>
    <Field label="URL de inserción del video" value={widget.data.videoUrl}
      onChange={(value) => onChange({ ...widget, data: { ...widget.data, videoUrl: value.trim() } })} />
    <Field label="Objetivo del video" multiline value={widget.data.objective ?? ''}
      onChange={(value) => onChange({ ...widget, data: { ...widget.data, objective: value } })} />
  </>;
  if (widget.type === 'scenario-quiz-multiple') {
    const options = widget.data.options;
    const setOptions = (next: typeof options) => onChange({ ...widget, data: { ...widget.data, options: next } });
    return <>
      <Field label="Contexto de la pregunta" multiline value={widget.data.context}
        onChange={(value) => onChange({ ...widget, data: { ...widget.data, context: value } })} />
      <label className="creator-field"><span>Puntos</span>
        <input type="number" min="0" max="100" value={widget.data.points} onChange={(event) =>
          onChange({ ...widget, data: { ...widget.data, points: Math.max(0, Math.min(100, event.target.valueAsNumber || 0)) } })} />
      </label>
      {options.map((option, index) => {
        const change = (patch: Partial<typeof option>) =>
          setOptions(options.map((entry) => entry.id === option.id ? { ...entry, ...patch } : entry));
        return <div className="creator-option" key={option.id}>
          <Field label={'Respuesta ' + (index + 1)} value={option.text} onChange={(text) => change({ text })} />
          <Field label="Explicación" value={option.explanation} onChange={(explanation) => change({ explanation })} />
          <label className="creator-check"><input type="checkbox" checked={option.isCorrect}
            onChange={(event) => change({ isCorrect: event.target.checked })} /> Correcta</label>
          <button disabled={options.length <= 2} onClick={() => setOptions(options.filter((entry) => entry.id !== option.id))}>Quitar</button>
        </div>;
      })}
      <button onClick={() => setOptions([...options, { id: newId(), text: '', isCorrect: false, explanation: '' }])}>
        <Plus size={16} /> Añadir respuesta
      </button>
    </>;
  }
  return null;
}
