import type { BrandPreset, VideoEditorialBlockData } from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';

export interface WidgetVideoEditorialProps {
  data: VideoEditorialBlockData;
  brand: BrandPreset;
  institutionName: string;
}

export function WidgetVideoEditorial({
  data,
  brand,
  institutionName,
}: WidgetVideoEditorialProps) {
  const showStatement = data.highlightLead || data.statementRest;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 64px 24px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          padding: '22px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              width: '130px',
              height: '4px',
              backgroundColor: '#334155',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                width: '55%',
                marginLeft: 'auto',
                backgroundColor: brand.primary,
              }}
            />
          </div>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#262C30',
              color: '#FFFFFF',
              fontSize: '9px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '3px',
              letterSpacing: '0.05em',
            }}
          >
            {institutionName.toUpperCase()}
          </span>
        </div>

        {data.title && (
          <div className="mb-4 min-w-0 wrap-anywhere">
            <h3 className="text-2xl font-bold text-slate-900">{data.title}</h3>
            {data.objective && <p className="mt-2 leading-relaxed text-slate-600">{data.objective}</p>}
          </div>
        )}

        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#0F172A',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <iframe
            style={{ width: '100%', height: '100%', border: 0 }}
            src={data.videoUrl}
            title={data.title || 'Video del Curso'}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <ApaReferenceFooter citation={data.apaCitation} />
        {data.videoPageUrl && (
          <a
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ color: brand.primaryDark }}
            href={data.videoPageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir en YouTube <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {showStatement && <div style={{ textAlign: 'center', maxWidth: '620px', margin: '48px auto 0 auto' }}>
        <div
          style={{
            width: '52px',
            height: '2px',
            backgroundColor: brand.primary,
            margin: '0 auto 24px auto',
          }}
        />
        <p
          style={{
            fontSize: '23px',
            lineHeight: 1.5,
            color: '#374151',
            fontWeight: 400,
            margin: 0,
          }}
        >
          <strong style={{ color: brand.primary, fontWeight: 700 }}>{data.highlightLead}</strong>{' '}
          {data.statementRest} {institutionName}.
        </p>
      </div>}
    </div>
  );
}

