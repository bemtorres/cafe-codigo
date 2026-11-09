import { Download, ExternalLink } from 'lucide-react';
import type { BrandPreset, DocumentResourcesBlockData } from '../../../data/courses/courseJsonTypes';

export interface WidgetDocumentResourcesProps {
  data: DocumentResourcesBlockData;
  brand: BrandPreset;
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

export function WidgetDocumentResources({ data, brand }: WidgetDocumentResourcesProps) {
  const resources = data.resources.filter((resource) => isWebUrl(resource.url));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div
        className="rounded-xl border border-slate-200 border-t-2 bg-white p-5 text-slate-900 sm:p-7"
        style={{ borderTopColor: brand.primary }}
      >
        <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: brand.primaryDark }}>
          Material de apoyo
        </p>
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
      </div>
    </div>
  );
}
