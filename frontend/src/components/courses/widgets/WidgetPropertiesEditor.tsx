import { useState } from 'react';
import type { CourseWidgetBlock, WidgetBgMode } from '../../../data/courses/courseJsonTypes';

type Value = string | number | boolean | null | Value[] | { [key: string]: Value };
const fieldClass = 'grid gap-1 text-sm font-semibold';
const control = 'w-full rounded border border-slate-300 bg-white px-2 py-2 text-slate-900';
const button = 'rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100';
const brandFields = [
  ['primary', 'Acento principal'],
  ['primaryDark', 'Acento oscuro'],
  ['primaryLight', 'Acento claro'],
  ['bgQuiz', 'Fondo institucional'],
] as const;
const labels: Record<string, string> = {
  title: 'Título', subtitle: 'Subtítulo', badge: 'Etiqueta', description: 'Descripción',
  context: 'Contexto', text: 'Texto', htmlContent: 'Contenido HTML', summary: 'Resumen',
  imageUrl: 'URL de imagen', bannerImageUrl: 'URL de portada', videoUrl: 'URL del video',
  points: 'Puntos', options: 'Opciones', isCorrect: 'Respuesta correcta', feedback: 'Retroalimentación',
  correctCategoryId: 'ID de la categoría correcta', correctPosition: 'Posición correcta',
  label: 'Etiqueta', url: 'Enlace', id: 'Identificador', apaCitation: 'Fuente o cita',
  highlightLead: 'Inicio destacado', includeInstitutionName: 'Añadir nombre de la institución',
};

const optionalFields: Partial<Record<CourseWidgetBlock['type'], Record<string, Value>>> = {
  'hero-banner': { apaCitation: '' },
  'image-cover-banner': { apaCitation: '', minHeight: '280px', includeInstitutionName: false },
  'rich-text-editorial': { title: '', subtitle: '', badge: '', readingTime: '', apaCitation: '', cardFrame: true },
  'video-editorial': { title: '', objective: '', videoPageUrl: '', apaCitation: '' },
  'editorial-quote': { highlightLead: '', includeInstitutionName: false },
  'document-resources': { description: '' },
  'slide-cards': { initialSlideIndex: 0 },
  'accordion-details': { nextLessonId: '' },
  'checklist': { badge: '' },
  'scenario-quiz-fill-blank': { codeMode: false },
  'scenario-quiz-image-hotspot': { imageUrl: '', imageAlt: '', apaCitation: '', targetRiskCount: 1 },
  'scenario-quiz-image-choice': { apaCitation: '' },
};

const nestedOptionalFields: Record<string, Record<string, Value>> = {
  slides: { videoUrl: '', videoCaption: '', apaCitation: '' },
  questions: { videoUrl: '', videoCaption: '', apaCitation: '' },
  resources: { description: '', fileName: '' },
  choices: { nextNodeId: '' },
  lines: { vulnerabilityExplanation: '' },
  items: { imageUrl: '' },
  layers: { leftThumbnailAlt: '', rightImageCaption: '', apaCitation: '' },
  segments: { text: '', blankId: '', correctAnswer: '', options: [''] },
};

const cardFields: Partial<Record<CourseWidgetBlock['type'], Record<string, Value>>> = {
  'slide-cards': { imageUrl: '', imageAlt: '', videoUrl: '', videoCaption: '', apaCitation: '' },
  'flip-cards-3d': {
    frontImageUrl: '', frontImageCaption: '', frontApaCitation: '',
    backImageUrl: '', backImageCaption: '', backApaCitation: '', backCode: '',
  },
  'scenario-quiz-image-choice': { imageUrl: '' },
};

function fieldLabel(key: string) {
  return labels[key] ?? key.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function Property({ name, propertyKey, value, example, onChange }: {
  name: string; propertyKey?: string; value: Value; example?: Value; onChange: (value: Value) => void;
}) {
  if (Array.isArray(value)) {
    const sample = Array.isArray(example) ? example[0] : undefined;
    return <fieldset className="grid min-w-0 gap-2 rounded border border-slate-200 p-3">
      <legend className="px-1 text-sm font-semibold">{name} ({value.length})</legend>
      {value.map((item, index) => (
        <details key={index} className="rounded border border-slate-200 p-2">
          <summary className="cursor-pointer text-sm">{name} {index + 1}</summary>
          <div className="mt-2 grid gap-2">
            <Property name={`Elemento ${index + 1}`} propertyKey={propertyKey} value={item} example={sample}
              onChange={(next) => onChange(value.map((entry, position) => position === index ? next : entry))} />
            <div className="flex flex-wrap gap-2">
              {[-1, 1].map((direction) => <button key={direction} type="button" className={button}
                disabled={index + direction < 0 || index + direction >= value.length}
                onClick={() => {
                  const next = [...value];
                  [next[index], next[index + direction]] = [next[index + direction], next[index]];
                  onChange(next);
                }}>{direction === -1 ? 'Subir' : 'Bajar'}</button>)}
              <button type="button" className={button} onClick={() => onChange(value.filter((_, position) => position !== index))}>Quitar</button>
            </div>
          </div>
        </details>
      ))}
      {(value.length > 0 || sample !== undefined) && <button type="button" className={`${button} justify-self-start`} onClick={() => {
        const item = structuredClone(value.at(-1) ?? sample ?? '');
        if (item && typeof item === 'object' && !Array.isArray(item) && typeof item.id === 'string') {
          item.id = crypto.randomUUID();
        }
        onChange([...value, item]);
      }}>Añadir elemento</button>}
    </fieldset>;
  }
  if (value !== null && typeof value === 'object') {
    const defaults = {
      ...(example && typeof example === 'object' && !Array.isArray(example) ? example : {}),
      ...nestedOptionalFields[propertyKey ?? ''],
    };
    return <div className="grid min-w-0 gap-3">
      {Object.entries(value).map(([key, item]) => <Property key={key} propertyKey={key} name={fieldLabel(key)} value={item}
        example={defaults[key]} onChange={(next) => onChange({ ...value, [key]: next })} />)}
      {Object.keys(defaults).filter((key) => !(key in value)).map((key) => (
        <button key={key} type="button" className={`${button} justify-self-start`}
          onClick={() => onChange({ ...value, [key]: structuredClone(defaults[key]) })}>Añadir {fieldLabel(key)}</button>
      ))}
    </div>;
  }
  if (typeof value === 'boolean') {
    return <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={value}
      onChange={(event) => onChange(event.target.checked)} />{name}</label>;
  }
  if (typeof value === 'number') {
    return <label className={fieldClass}>{name}<input className={control} type="number" step="any"
      value={value} onChange={(event) => {
        if (Number.isFinite(event.target.valueAsNumber)) onChange(event.target.valueAsNumber);
      }} /></label>;
  }
  const text = String(value ?? '');
  return <div className="grid min-w-0 gap-2">
    <label className={fieldClass}>{name}
      <textarea className={control} rows={text.length > 80 ? 3 : 1}
        value={text} onChange={(event) => onChange(event.target.value)} />
    </label>
    {/imageurl|thumbnailurl/i.test(propertyKey ?? '') && /^(https?:\/\/|\/)/i.test(text) && (
      <img src={text} alt="Vista previa de la imagen" className="max-h-32 max-w-full rounded border border-slate-200 object-contain" />
    )}
  </div>;
}

export function WidgetPropertiesEditor({ widget, examples, onSave, onCancel }: {
  widget: CourseWidgetBlock;
  examples: CourseWidgetBlock[];
  onSave: (widget: CourseWidgetBlock) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(widget);
  const example: Record<string, Value> = Object.assign({}, ...examples.map((entry) => entry.data), optionalFields[widget.type]);
  if (cardFields[widget.type] && Array.isArray(example.cards)) {
    example.cards = [{ ...example.cards[0] as Record<string, Value>, ...cardFields[widget.type] }];
  }
  return <form className="grid min-w-0 gap-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-900"
    onSubmit={(event) => {
      event.preventDefault();
      onSave({
        ...draft,
        bgColor: draft.bgMode === 'custom' ? draft.bgColor || '#f4f5f7' : draft.bgColor,
        brandColors: Object.fromEntries(Object.entries(draft.brandColors ?? {}).filter(([, color]) => color)),
      });
    }}>
    <h3 className="text-base font-bold">Propiedades del bloque</h3>
    <label className={fieldClass}>Resumen
      <input className={control} value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} />
    </label>
    <label className={fieldClass}>Fondo
      <select className={control} value={draft.bgMode ?? 'default'}
        onChange={(event) => setDraft({ ...draft, bgMode: event.target.value as WidgetBgMode })}>
        <option value="default">Predeterminado</option><option value="white">Blanco</option>
        <option value="soft">Suave</option><option value="brand">Institucional</option>
        <option value="dark">Oscuro</option><option value="custom">Personalizado</option>
      </select>
    </label>
    {draft.bgMode === 'custom' && <label className={fieldClass}>Color del fondo
      <input type="color" value={/^#[0-9a-f]{6}$/i.test(draft.bgColor ?? '') ? draft.bgColor : '#f4f5f7'}
        onChange={(event) => setDraft({ ...draft, bgColor: event.target.value })} />
    </label>}
    <details>
      <summary className="cursor-pointer text-sm font-semibold">Colores del widget</summary>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {brandFields.map(([key, label]) => (
          <label key={key} className={fieldClass}>{label}
            <input className={control} placeholder="Heredado del curso" pattern="#[0-9a-fA-F]{6}"
              value={draft.brandColors?.[key] ?? ''}
              onChange={(event) => setDraft({ ...draft, brandColors: { ...draft.brandColors, [key]: event.target.value } })} />
          </label>
        ))}
      </div>
    </details>
    <Property name="Contenido" value={draft.data as Value} example={example}
      onChange={(data) => setDraft({ ...draft, data } as CourseWidgetBlock)} />
    <div className="flex flex-wrap gap-2">
      <button type="button" className={button} onClick={onCancel}>Cancelar</button>
      <button type="submit" className="rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Guardar propiedades</button>
    </div>
  </form>;
}
