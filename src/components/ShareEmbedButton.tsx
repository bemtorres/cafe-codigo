import { useEffect, useRef, useState } from 'react';

interface Props {
  courseSlug: string;
  lessonSlug?: string;
  courseName: string;
  lessonTitle?: string;
}

type QuizMode = 'show' | 'hide';

export default function ShareEmbedButton({ courseSlug, lessonSlug, courseName, lessonTitle }: Props) {
  const [open, setOpen]       = useState(false);
  const [copied, setCopied]   = useState(false);
  const [width, setWidth]     = useState('100%');
  const [height, setHeight]   = useState('650');
  const [quizMode, setQuizMode] = useState<QuizMode>('show');
  const [institution, setInstitution] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Construye la URL base del curso o lección
  const basePath = lessonSlug
    ? `/course/${courseSlug}/${lessonSlug}/`
    : `/course/${courseSlug}/`;

  // URL de producción (sin parámetros — se añaden abajo)
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://cafeycodigo.com';

  const quizParam    = quizMode === 'hide' ? '&quiz=false' : '';
  const titleParam   = institution.trim() ? `&title=${encodeURIComponent(institution.trim())}` : '';
  const embedUrl     = `${origin}${basePath}?embed=true${quizParam}${titleParam}`;
  const embedUrlFull = `${origin}${basePath}?embed=true${quizParam}${titleParam}&name=NOMBRE&email=CORREO`;

  const iframeCode = `<iframe
  src="${embedUrl}"
  width="${width}"
  height="${height}px"
  style="border:none; border-radius:12px; overflow:hidden;"
  allow="clipboard-write"
  title="${lessonTitle ?? courseName}"
></iframe>`;

  const iframeCodePersonalized = `<iframe
  src="${embedUrlFull}"
  width="${width}"
  height="${height}px"
  style="border:none; border-radius:12px; overflow:hidden;"
  allow="clipboard-write"
  title="${lessonTitle ?? courseName}"
></iframe>`;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Cerrar al click fuera
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (overlayRef.current === e.target) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <>
      {/* Botón disparador */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border bg-white px-3 py-1.5 font-nunito font-extrabold text-[0.8rem] text-textSecondary shadow-neo transition-all hover:-translate-y-0.5 hover:bg-tertiary/30 hover:text-textPrimary"
        title="Compartir / Incrustar en Moodle u otro LMS"
      >
        <span aria-hidden>⬡</span>
        <span>Compartir</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-2000 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Compartir lección"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border-[3px] border-border shadow-neo-xl flex flex-col max-h-[92vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-dashed border-border shrink-0">
              <div>
                <h2 className="font-nunito font-black text-xl text-textPrimary m-0">⬡ Compartir</h2>
                <p className="font-nunito text-[0.82rem] text-textMuted m-0 mt-0.5">
                  {lessonTitle ? `"${lessonTitle}" · ` : ''}{courseName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full border-2 border-border bg-white font-black cursor-pointer hover:bg-gray-100 flex items-center justify-center text-lg"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-6">

              {/* Info de parámetros */}
              <div className="rounded-2xl border-2 border-info/40 bg-[#e0f7fa]/50 px-4 py-3 flex flex-col gap-1.5">
                <p className="font-nunito font-extrabold text-[0.82rem] text-[#0e7490] m-0">
                  ℹ️ Parámetros disponibles en la URL
                </p>
                <ul className="m-0 pl-4 flex flex-col gap-0.5 font-nunito text-[0.78rem] text-[#0e7490]">
                  <li><code className="bg-white/80 px-1 rounded font-mono">?embed=true</code> — Oculta navbar, banner y controles de la plataforma.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?metaquestions=true</code> — Agrega diapositiva de reflexión/metacognición antes del final.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?bar=false</code> — Oculta totalmente la barra inferior en las presentaciones.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?title=MIT</code> — Muestra el nombre de la institución en la barra superior.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?quiz=false</code> — Oculta el quiz de la lección. Por defecto el quiz es visible.</li>
                </ul>
              </div>

              {/* Vista previa del link directo */}
              <div className="flex flex-col gap-2">
                <p className="font-nunito font-black text-[0.88rem] text-textPrimary m-0">URL directa (modo embed)</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-xl border-2 border-border bg-gray-50 px-3 py-2 font-mono text-[0.72rem] text-textSecondary break-all">
                    {embedUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(embedUrl)}
                    className="shrink-0 rounded-xl border-2 border-border bg-white px-3 py-2 font-nunito font-extrabold text-[0.75rem] shadow-neo transition-all hover:-translate-y-0.5 hover:bg-tertiary/40"
                  >
                    📋
                  </button>
                </div>
              </div>

              {/* NUEVA SECCIÓN: Presentación de Diapositivas (PPT Mode) */}
              {lessonSlug && (
                <div className="rounded-2xl border-2 border-amber-400/80 bg-amber-50/70 p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="font-nunito font-black text-[0.9rem] text-amber-950 m-0 flex items-center gap-2">
                      <span>📊 Link & Embed de Presentación (Diapositivas)</span>
                      <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">PPT</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`${origin}/course-slides/${courseSlug}/${lessonSlug}/`)}
                      className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border bg-white px-3 py-1 font-nunito font-extrabold text-[0.75rem] shadow-neo transition-all hover:-translate-y-0.5 hover:bg-amber-300"
                    >
                      📋 Copiar URL Presentación
                    </button>
                  </div>
                  
                  <p className="font-nunito text-[0.75rem] text-amber-900 m-0">
                    Abre o incrusta la lección en modo diapositivas paso a paso estilo PowerPoint:
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <span className="font-nunito text-[0.72rem] font-bold text-amber-900">Código iframe para Presentación (Modo Embed Limpio):</span>
                    <pre className="m-0 rounded-xl border-2 border-border bg-[#0f172a] p-3 overflow-x-auto">
                      <code className="font-mono text-[0.73rem] text-amber-300 whitespace-pre">
{`<iframe
  src="${origin}/course-slides/${courseSlug}/${lessonSlug}/?embed=true&bar=false&metaquestions=true"
  width="${width}"
  height="${height}px"
  style="border:none; border-radius:12px; overflow:hidden;"
  allow="clipboard-write"
  title="Presentación ${lessonTitle ?? courseName}"
></iframe>`}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t-2 border-dashed border-border shrink-0 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border-2 border-border bg-white px-5 py-2 font-nunito font-black text-sm shadow-neo transition-all hover:-translate-y-0.5 hover:bg-tertiary/30"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
