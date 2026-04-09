/**
 * JWT HS256 para ?code= en modo embed.
 * El secreto va en PUBLIC_EMBED_CODE_SECRET (público en el bundle; sirve para integridad, no secretismo).
 */

export type EmbedCodePayloadV1 = {
  v: 1;
  e: 1;
  q: 0 | 1;
  p: 0 | 1;
  t?: string;
  n?: string;
  m?: string;
  l?: string;
  b?: string;
  c?: string;
  x?: string;
  iat: number;
  exp: number;
};

function getSecret(): string {
  return (
    import.meta.env.PUBLIC_EMBED_CODE_SECRET || 'embed-dev-insecure-set-PUBLIC_EMBED_CODE_SECRET'
  );
}

function b64urlEncodeBytes(bytes: Uint8Array): string {
  let bin = '';
  bytes.forEach((c) => (bin += String.fromCharCode(c)));
  const b64 = btoa(bin);
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlEncodeUtf8(s: string): string {
  return b64urlEncodeBytes(new TextEncoder().encode(s));
}

function b64urlDecodeToUtf8(s: string): string {
  let b = s.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b.length % 4 ? 4 - (b.length % 4) : 0;
  b += '='.repeat(pad);
  const bin = atob(b);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function base64urlToUint8Array(s: string): Uint8Array {
  let b = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b.length % 4) b += '=';
  const bin = atob(b);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/**
 * Decodifica el payload sin verificar firma (para scripts inline sincronos).
 * La firma y exp se validan en verifyEmbedCodeToken.
 */
export function decodeEmbedJwtPayloadSync(token: string): EmbedCodePayloadV1 | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const p = JSON.parse(b64urlDecodeToUtf8(parts[1])) as EmbedCodePayloadV1;
    if (p.v !== 1 || p.e !== 1) return null;
    return p;
  } catch {
    return null;
  }
}

type PayloadSignInput = Omit<EmbedCodePayloadV1, 'iat' | 'exp'>;

export async function signEmbedCodePayload(payload: PayloadSignInput): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const full: EmbedCodePayloadV1 = {
    ...payload,
    iat: now,
    exp: now + 365 * 24 * 60 * 60,
  };
  const header = { alg: 'HS256', typ: 'JWT' };
  const enc = new TextEncoder();
  const h = b64urlEncodeUtf8(JSON.stringify(header));
  const pl = b64urlEncodeUtf8(JSON.stringify(full));
  const signingInput = `${h}.${pl}`;
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(signingInput));
  return `${signingInput}.${b64urlEncodeBytes(new Uint8Array(sig))}`;
}

export async function verifyEmbedCodeToken(token: string): Promise<EmbedCodePayloadV1 | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [h, p, s] = parts;
    const signingInput = `${h}.${p}`;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(getSecret()),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    const sig = base64urlToUint8Array(s);
    const ok = await crypto.subtle.verify('HMAC', key, sig as BufferSource, enc.encode(signingInput));
    if (!ok) return null;
    const payload = JSON.parse(b64urlDecodeToUtf8(p)) as EmbedCodePayloadV1;
    if (payload.v !== 1 || payload.e !== 1) return null;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}
