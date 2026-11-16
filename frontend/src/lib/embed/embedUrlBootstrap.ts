import { signEmbedCodePayload, verifyEmbedCodeToken, type EmbedCodePayloadV1 } from './embedJwt';

function searchParamsToSignPayload(sp: URLSearchParams): Omit<EmbedCodePayloadV1, 'iat' | 'exp'> {
  return {
    v: 1,
    e: 1,
    q: sp.get('quiz') === 'false' ? 0 : 1,
    p: sp.get('pdf') === 'true' ? 1 : 0,
    t: sp.get('title') || undefined,
    n: sp.get('name') || undefined,
    m: sp.get('email') || undefined,
    l: sp.get('logo') || undefined,
    b: sp.get('background') || undefined,
    c: sp.get('color') || undefined,
    x: sp.get('text') || undefined,
  };
}

/**
 * - ?code=jwt: verifica firma y exp; si falla, recarga la ruta sin query.
 * - ?encrypt=true&embed=true (sin code): firma params y sustituye la URL por ?code=…
 */
async function run(): Promise<void> {
  const sp = new URLSearchParams(window.location.search);
  const rawCode = sp.get('code');

  if (rawCode) {
    const valid = await verifyEmbedCodeToken(rawCode);
    if (!valid) {
      window.__embedJwtPayload = undefined;
      window.location.replace(window.location.pathname);
    }
    return;
  }

  if (sp.get('encrypt') !== 'true' || sp.get('embed') !== 'true') return;

  const token = await signEmbedCodePayload(searchParamsToSignPayload(sp));
  const next = `${window.location.pathname}?code=${encodeURIComponent(token)}${window.location.hash || ''}`;
  window.history.replaceState(null, '', next);
}

void run();
