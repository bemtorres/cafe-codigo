import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type ProfileRow = {
  id: string;
  display_name: string | null;
  favorite_course_slug: string | null;
  /** Privilegio docente (modo academia); solo administración DB o servicio. */
  is_academy?: boolean | null;
  /** Donante reconocido; solo se asigna desde SQL en Supabase. */
  is_sponsor?: boolean | null;
  sponsor_since?: string | null;
  updated_at?: string;
};

export type LessonBookmarkRow = {
  id: string;
  user_id: string;
  course_slug: string;
  lesson_slug: string;
  lesson_title: string | null;
  created_at: string;
};

let browserClient: SupabaseClient | null = null;

function supabaseUrl(): string | undefined {
  return import.meta.env.PUBLIC_SUPABASE_URL ?? import.meta.env.SUPABASE_URL;
}

function supabaseAnonKey(): string | undefined {
  return import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? import.meta.env.SUPABASE_KEY;
}

export function isSupabaseConfigured(): boolean {
  const url = supabaseUrl();
  const key = supabaseAnonKey();
  return Boolean(url?.length && key?.length);
}

/** Cliente singleton para el navegador (Astro estático / GitHub Pages). */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (typeof window === 'undefined') return null;
  if (browserClient) return browserClient;
  const url = supabaseUrl()!;
  const key = supabaseAnonKey()!;
  browserClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      /** Clave por defecto de Supabase (sb-…-auth-token); evita desincronizar la sesión al cambiar de página. */
      storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
    },
  });
  return browserClient;
}
