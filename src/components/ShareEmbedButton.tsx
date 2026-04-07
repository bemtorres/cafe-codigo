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
                  <li><code className="bg-white/80 px-1 rounded font-mono">?title=MIT</code> — Muestra el nombre de la institución en la barra superior.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?quiz=false</code> — Oculta el quiz de la lección. Por defecto el quiz es visible.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?name=NOMBRE</code> — Nombre del estudiante; aparece en la barra superior del embed.</li>
                  <li><code className="bg-white/80 px-1 rounded font-mono">?email=CORREO</code> — Email del estudiante (útil para registro de progreso).</li>
                </ul>
              </div>

              {/* Institución */}
              <div className="flex flex-col gap-2">
                <label className="flex flex-col gap-1">
                  <span className="font-nunito font-extrabold text-[0.82rem] text-textMuted uppercase tracking-widest">
                    Nombre de la institución <span className="normal-case font-normal text-textMuted/60">(opcional)</span>
                  </span>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ej: INACAP, Universidad de Chile…"
                    className="border-2 border-border rounded-xl px-3 py-2 font-nunito text-sm outline-none focus:border-info"
                  />
                  <span className="font-nunito text-[0.72rem] text-textMuted">
                    Aparece en la barra superior del embed como encabezado de contexto.
                  </span>
                </label>
              </div>

              {/* Dimensiones */}
              <div className="flex flex-col gap-2">
                <p className="font-nunito font-extrabold text-[0.82rem] text-textMuted m-0 uppercase tracking-widest">Dimensiones del iframe</p>
                <div className="flex gap-3 items-center">
                  <label className="flex flex-col gap-1 flex-1">
                    <span className="font-nunito text-[0.75rem] font-bold text-textSecondary">Ancho</span>
                    <input
                      type="text"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="border-2 border-border rounded-xl px-3 py-1.5 font-mono text-sm outline-none focus:border-info"
                      placeholder="100% o 800"
                    />
                  </label>
                  <label className="flex flex-col gap-1 flex-1">
                    <span className="font-nunito text-[0.75rem] font-bold text-textSecondary">Alto (px)</span>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="border-2 border-border rounded-xl px-3 py-1.5 font-mono text-sm outline-none focus:border-info"
                      placeholder="650"
                    />
                  </label>
                </div>
              </div>

              {/* Quiz */}
              <div className="flex flex-col gap-2">
                <p className="font-nunito font-extrabold text-[0.82rem] text-textMuted m-0 uppercase tracking-widest">Quiz al final de la lección</p>
                <div className="flex gap-2">
                  {(['show', 'hide'] as QuizMode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setQuizMode(m)}
                      className={`flex-1 rounded-xl border-2 py-2 font-nunito font-extrabold text-sm transition-all ${
                        quizMode === m
                          ? 'bg-[#2b1d1b] text-white border-border shadow-neo'
                          : 'bg-white text-textSecondary border-border hover:bg-tertiary/30'
                      }`}
                    >
                      {m === 'show' ? '✅ Mostrar quiz' : '🚫 Ocultar quiz'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Código básico */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-nunito font-black text-[0.88rem] text-textPrimary m-0">Código HTML básico</p>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(iframeCode)}
                    className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border bg-white px-3 py-1 font-nunito font-extrabold text-[0.75rem] shadow-neo transition-all hover:-translate-y-0.5 hover:bg-success hover:text-white hover:border-success"
                  >
                    {copied ? '✅ Copiado' : '📋 Copiar'}
                  </button>
                </div>
                <pre className="m-0 rounded-xl border-2 border-border bg-[#1a0e0a] p-4 overflow-x-auto">
                  <code className="font-mono text-[0.75rem] text-[#e8d5c4] whitespace-pre">
                    {iframeCode}
                  </code>
                </pre>
              </div>

              {/* Código con datos del estudiante */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-nunito font-black text-[0.88rem] text-textPrimary m-0">Código con datos del estudiante</p>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(iframeCodePersonalized)}
                    className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border bg-white px-3 py-1 font-nunito font-extrabold text-[0.75rem] shadow-neo transition-all hover:-translate-y-0.5 hover:bg-success hover:text-white hover:border-success"
                  >
                    📋 Copiar
                  </button>
                </div>
                <p className="font-nunito text-[0.75rem] text-textMuted m-0">
                  Reemplaza <code className="bg-gray-100 px-1 rounded font-mono">NOMBRE</code> y <code className="bg-gray-100 px-1 rounded font-mono">CORREO</code> con los datos reales del estudiante (pueden venir de variables de tu LMS).
                </p>
                <pre className="m-0 rounded-xl border-2 border-border bg-[#1a0e0a] p-4 overflow-x-auto">
                  <code className="font-mono text-[0.75rem] text-[#e8d5c4] whitespace-pre">
                    {iframeCodePersonalized}
                  </code>
                </pre>
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
