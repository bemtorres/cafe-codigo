import { useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import type { BrandPreset, DocumentResource, DocumentResourcesBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetDocumentResourcesProps {
  data: DocumentResourcesBlockData;
  brand: BrandPreset;
  isEditMode?: boolean;
  onUpdateData?: (data: DocumentResourcesBlockData) => void;
}

function isWebUrl(url: string) {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const { protocol } = new URL(url, 'https://example.invalid');
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}

const inputClass = 'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm';
const buttonClass = 'rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100';

export function WidgetDocumentResources({ data, brand, isEditMode, onUpdateData }: WidgetDocumentResourcesProps) {
  const [draft, setDraft] = useState<DocumentResourcesBlockData | null>(null);
  const [error, setError] = useState('');
  const canEdit = isEditMode && onUpdateData;
  const resources = data.resources.filter((resource) => isWebUrl(resource.url));

  const updateResource = (id: string, update: (resource: DocumentResource) => DocumentResource) => {
    setDraft((current) => current && {
      ...current,
      resources: current.resources.map((resource) => resource.id === id ? update(resource) : resource),
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div
        className="rounded-xl border border-slate-200 border-t-2 bg-white p-5 text-slate-900 sm:p-7"
        style={{ borderTopColor: brand.primary }}
      >
        <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: brand.primaryDark }}>
          Material de apoyo
        </p>
        {canEdit && draft ? (
          <form className="mt-3 grid gap-4" onSubmit={(event) => {
            event.preventDefault();
            if (!draft.title.trim() || draft.resources.some((resource) => !resource.title.trim() || !isWebUrl(resource.url))) {
              setError('Completa los títulos y usa enlaces HTTP, HTTPS o rutas del sitio.');
              return;
            }
            onUpdateData({
              ...draft,
              title: draft.title.trim(),
              resources: draft.resources.map((resource) => ({
                ...resource, title: resource.title.trim(), url: resource.url.trim(),
              })),
            });
            setDraft(null);
          }}>
            <label className="text-sm font-semibold">Título
              <input className={inputClass} required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label className="text-sm font-semibold">Descripción
              <textarea className={inputClass} rows={2} value={draft.description ?? ''} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
            </label>
            {draft.resources.map((resource, index) => (
              <fieldset key={resource.id} className="grid gap-3 rounded-md border border-slate-200 p-3 text-sm">
                <legend className="px-1 font-semibold">Recurso {index + 1}</legend>
                <label>Nombre
                  <input className={inputClass} required value={resource.title} onChange={(event) => updateResource(resource.id, (item) => ({ ...item, title: event.target.value }))} />
                </label>
                <label>Enlace
                  <input className={inputClass} required value={resource.url} onChange={(event) => updateResource(resource.id, (item) => ({ ...item, url: event.target.value }))} />
                </label>
                <label>Descripción del recurso
                  <input className={inputClass} value={resource.description ?? ''} onChange={(event) => updateResource(resource.id, (item) => ({ ...item, description: event.target.value }))} />
                </label>
                <label>Acción
                  <select className={inputClass} value={resource.action} onChange={(event) => {
                    const action = event.target.value === 'download' ? 'download' : 'open';
                    updateResource(resource.id, (item) => ({ ...item, action }));
                  }}>
                    <option value="open">Abrir enlace</option>
                    <option value="download">Descargar</option>
                  </select>
                </label>
                <button type="button" className={`${buttonClass} justify-self-start`} onClick={() => {
                  setDraft({ ...draft, resources: draft.resources.filter((item) => item.id !== resource.id) });
                }}>Quitar recurso {index + 1}</button>
              </fieldset>
            ))}
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <div className="flex flex-wrap gap-2">
              <button type="button" className={buttonClass} onClick={() => {
                setDraft({ ...draft, resources: [...draft.resources, { id: crypto.randomUUID(), title: '', url: '', action: 'open' }] });
              }}>Añadir recurso</button>
              <button type="button" className={buttonClass} onClick={() => setDraft(null)}>Cancelar</button>
              <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Guardar cambios</button>
            </div>
          </form>
        ) : (
          <>
            {canEdit && (
              <button type="button" className={`${buttonClass} mb-3`} onClick={() => {
                setError('');
                setDraft(data);
              }}>Editar recursos</button>
            )}
            <h3 className="text-2xl font-bold">{data.title}</h3>
            {data.description && <p className="mt-2 text-sm leading-relaxed text-slate-600">{data.description}</p>}

            {resources.length ? (
              <ul className="mt-5 grid gap-2">
                {resources.map((resource) => {
                  const isDownload = resource.action === 'download';
                  const action = isDownload ? 'Descargar' : 'Abrir enlace';
                  const ActionIcon = isDownload ? Download : ExternalLink;

                  return (
                    <li key={resource.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="min-w-0 flex-[1_1_220px] break-words">
                        <h4 className="text-sm font-semibold">{resource.title}</h4>
                        {resource.description && <p className="mt-1 text-sm text-slate-600">{resource.description}</p>}
                      </div>
                      <a
                        href={resource.url}
                        download={isDownload ? resource.fileName ?? '' : undefined}
                        target={isDownload ? undefined : '_blank'}
                        rel={isDownload ? undefined : 'noopener noreferrer'}
                        aria-label={isDownload ? `Descargar ${resource.title}` : `Abrir enlace de ${resource.title} en una nueva pestaña`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-current px-3 text-sm font-semibold hover:bg-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ color: brand.primaryDark }}
                      >
                        {action}
                        <ActionIcon size={16} aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-slate-600">Aún no hay recursos disponibles.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
