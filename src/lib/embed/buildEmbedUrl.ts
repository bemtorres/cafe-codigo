export type EmbedParams = {
  embed?: boolean;
  quiz?: boolean; // true = show, false = quiz=false
  pdf?: boolean;
  /** Primera carga: la página sustituye la query por ?code=jwt (oculta datos en la barra de direcciones). */
  encrypt?: boolean;
  title?: string;
  name?: string;
  email?: string;
  logo?: string;
  background?: string; // url o color css
  color?: string; // fondo cabecera embed
  text?: string; // color de texto en cabecera embed
};

function addParam(sp: URLSearchParams, key: string, value: string | undefined) {
  if (!value) return;
  const v = value.trim();
  if (!v) return;
  sp.set(key, v);
}

export function buildEmbedQuery(params: EmbedParams): string {
  const sp = new URLSearchParams();

  if (params.embed) sp.set('embed', 'true');
  if (params.quiz === false) sp.set('quiz', 'false');
  if (params.pdf) sp.set('pdf', 'true');
  if (params.encrypt) sp.set('encrypt', 'true');

  addParam(sp, 'title', params.title ? encodeURIComponent(params.title) : undefined);
  addParam(sp, 'name', params.name ? encodeURIComponent(params.name) : undefined);
  addParam(sp, 'email', params.email ? encodeURIComponent(params.email) : undefined);

  addParam(sp, 'logo', params.logo ? encodeURIComponent(params.logo) : undefined);
  addParam(sp, 'background', params.background ? encodeURIComponent(params.background) : undefined);
  addParam(sp, 'color', params.color ? encodeURIComponent(params.color) : undefined);
  addParam(sp, 'text', params.text ? encodeURIComponent(params.text) : undefined);

  // Nota: ya vienen encodeados los valores; URLSearchParams no debe re-encodear.
  // Para evitar doble encoding, reconstruimos manualmente.
  const entries = Array.from(sp.entries());
  if (entries.length === 0) return '';
  return (
    '?' +
    entries
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  );
}

export function buildEmbedUrl(baseOrigin: string, lessonHref: string, params: EmbedParams): string {
  const origin = baseOrigin.replace(/\/$/, '');
  const path = lessonHref.startsWith('/') ? lessonHref : `/${lessonHref}`;
  return `${origin}${path}${buildEmbedQuery(params)}`;
}

