import { useEffect, useState } from 'react';
import { type ProfileRow } from '../../lib/supabase/client';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

type Props = {
  courseSlug: string;
  courseName: string;
};

function networkErrorMessage(e: unknown): string {
  if (e instanceof TypeError && String(e.message).includes('fetch')) {
    return 'No se pudo conectar con el servidor. Revisá tu red, que el proyecto Supabase esté activo y la URL en .env.';
  }
  return e instanceof Error ? e.message : 'Error de red';
}

export default function CourseFavoriteButton({ courseSlug, courseName }: Props) {
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const [favoriteSlug, setFavoriteSlug] = useState<string | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgIsError, setMsgIsError] = useState(false);

  const userId = user?.id ?? null;

  useEffect(() => {
    if (!supabase || authLoading) return;
    if (!userId) {
      setFavoriteSlug(null);
      setProfileReady(true);
      return;
    }
    setProfileReady(false);
    let cancelled = false;
    void (async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('favorite_course_slug')
          .eq('id', userId)
          .maybeSingle();
        if (cancelled) return;
        if (error) {
          setMsg(error.message);
          setMsgIsError(true);
          setFavoriteSlug(null);
          setProfileReady(true);
          return;
        }
        setFavoriteSlug((data as ProfileRow | null)?.favorite_course_slug ?? null);
        setProfileReady(true);
      } catch (e: unknown) {
        if (!cancelled) {
          setMsg(networkErrorMessage(e));
          setMsgIsError(true);
          setFavoriteSlug(null);
          setProfileReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [supabase, authLoading, userId]);

  const setFavorite = async (slug: string | null) => {
    if (!supabase || !userId) return;
    setSaving(true);
    setMsg(null);
    setMsgIsError(false);
    try {
      const { error } = await supabase.from('profiles').upsert(
        {
          id: userId,
          favorite_course_slug: slug,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' },
      );
      if (error) {
        setMsg(error.message);
        setMsgIsError(true);
        return;
      }
      setFavoriteSlug(slug);
      setMsg(slug ? '¡Listo! Este curso es tu favorito.' : 'Preferencia quitada.');
      setMsgIsError(false);
      window.setTimeout(() => setMsg(null), 3500);
    } catch (e: unknown) {
      setMsg(networkErrorMessage(e));
      setMsgIsError(true);
    } finally {
      setSaving(false);
    }
  };

  /** Sin supabase en SSR (no hay window): mismo placeholder que “cargando” para evitar hydration mismatch. */
  if (!supabase || authLoading || (userId && !profileReady)) {
    return (
      <div
        className="mb-6 h-16 animate-pulse rounded-2xl border-2 border-border/30 bg-white/50"
        aria-hidden
      />
    );
  }

  if (!userId) {
    return (
      <div className="mb-6 rounded-2xl border-2 border-dashed border-black/15 bg-white/70 px-4 py-3 text-center">
        <p className="m-0 font-nunito font-bold text-textSecondary text-sm">
          <a href="/cuenta/" className="text-info no-underline hover:underline">
            Iniciá sesión
          </a>{' '}
          para guardar tu curso favorito y sincronizarlo entre dispositivos.
        </p>
      </div>
    );
  }

  const isFavorite = favoriteSlug === courseSlug;

  return (
    <div className="mb-6 rounded-2xl border-[3px] border-border bg-white px-4 py-3 shadow-[3px_3px_0px_#1E1210]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="m-0 font-nunito font-black text-textPrimary text-[0.95rem]">Curso favorito</p>
          <p className="m-0 text-xs font-nunito font-bold text-textMuted">Tu sesión se mantiene en este dispositivo</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {isFavorite ? (
            <>
              <span className="inline-flex items-center gap-1 rounded-xl bg-warning px-3 py-2 font-nunito font-black text-sm text-textPrimary border-2 border-border">
                ★ {courseName}
              </span>
              <button
                type="button"
                disabled={saving}
                onClick={() => void setFavorite(null)}
                className="rounded-xl border-2 border-border bg-white px-3 py-2 font-nunito font-extrabold text-xs hover:bg-tertiary disabled:opacity-50"
              >
                Quitar
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={saving}
              onClick={() => void setFavorite(courseSlug)}
              className="rounded-xl border-[3px] border-border bg-[#06D6A0] px-4 py-2 font-nunito font-black text-sm text-textPrimary shadow-[2px_2px_0px_#1E1210] hover:-translate-y-0.5 disabled:opacity-50 transition-transform"
            >
              {saving ? '…' : `Marcar «${courseName}» como favorito`}
            </button>
          )}
          <a href="/panel/" className="text-xs font-nunito font-extrabold text-info no-underline hover:underline">
            Panel
          </a>
        </div>
      </div>
      {msg && (
        <p
          className={`mt-2 mb-0 text-xs font-nunito font-bold ${msgIsError ? 'text-red-600' : 'text-emerald-700'}`}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
