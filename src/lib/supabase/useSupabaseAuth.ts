import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabaseBrowser } from './client';

type State = {
  supabase: ReturnType<typeof getSupabaseBrowser>;
  /** `true` hasta que Supabase emita la sesión inicial (evita mostrar “cerrar sesión” por error). */
  loading: boolean;
  session: Session | null;
  user: User | null;
};

/**
 * Sesión desde localStorage + cambios en vivo.
 * Se llama a `getSession()` al montar para no depender solo del orden de `onAuthStateChange`
 * (evita panel sin usuario o datos aunque la sesión exista).
 */
export function useSupabaseAuth(): State {
  const supabase = getSupabaseBrowser();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!cancelled) setSession(s ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const loading = supabase != null && session === undefined;
  const resolved = session ?? null;

  return {
    supabase,
    loading,
    session: resolved,
    user: resolved?.user ?? null,
  };
}
