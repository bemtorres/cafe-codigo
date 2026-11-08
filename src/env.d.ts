/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_EMBED_CODE_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Payload decodificado desde ?code= (JWT embed); el layout lo usa antes de verificar la firma en el módulo. */
  __embedJwtPayload?: {
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
}
