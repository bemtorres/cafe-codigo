/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly PUBLIC_EMBED_CODE_SECRET?: string;
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Marcado en /cuenta/ antes de que el cliente Supabase consuma el hash de recuperación. */
  __SUPABASE_RECOVERY_PENDING__?: boolean;
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
