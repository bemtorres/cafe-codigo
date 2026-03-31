import { useEffect, useState } from 'react';
import { type ProfileRow } from '../../lib/supabase/client';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

type Props = {
  courseSlug: string;
  lessonSlug: string;
  lessonTitle: string;
};

export default function LessonBookmarkToggle({ courseSlug, lessonSlug, lessonTitle }: Props) {
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const sessionUserId = user?.id ?? null;

  const [favoriteSlug, setFavoriteSlug] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [dataReady, setDataReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || authLoading) return;

    if (!sessionUserId) {
      setFavoriteSlug(null);
      setBookmarked(false);
      setBookmarkId(null);
      setDataReady(true);
      return;
    }

    setDataReady(false);
    let cancelled = false;

    void (async () => {
      const { data: prof } = await supabase
        .from('profiles')
        .select('favorite_course_slug')
        .eq('id', sessionUserId)
        .maybeSingle();
      if (cancelled) return;
      const fav = (prof as ProfileRow | null)?.favorite_course_slug ?? null;
      setFavoriteSlug(fav);

      if (fav && fav === courseSlug) {
        const { data: row } = await supabase
          .from('lesson_bookmarks')
          .select('id')
          .eq('user_id', sessionUserId)
          .eq('course_slug', courseSlug)
          .eq('lesson_slug', lessonSlug)
          .maybeSingle();
        if (!cancelled) {
          if (row?.id) {
            setBookmarked(true);
            setBookmarkId(row.id as string);
          } else {
            setBookmarked(false);
            setBookmarkId(null);
          }
        }
      } else {
        setBookmarked(false);
        setBookmarkId(null);
      }
      if (!cancelled) setDataReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase, authLoading, sessionUserId, courseSlug, lessonSlug]);

  const toggle = async () => {
    if (!supabase || !sessionUserId || busy) return;
    setBusy(true);
    setErr(null);
    try {
      if (bookmarked && bookmarkId) {
        const { error } = await supabase.from('lesson_bookmarks').delete().eq('id', bookmarkId);
        if (error) throw error;
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const { data, error } = await supabase
          .from('lesson_bookmarks')
          .insert({
            user_id: sessionUserId,
            course_slug: courseSlug,
            lesson_slug: lessonSlug,
            lesson_title: lessonTitle,
          })
          .select('id')
          .single();
        if (error) throw error;
        setBookmarked(true);
        setBookmarkId((data as { id: string }).id);
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Error al guardar');
    } finally {
      setBusy(false);
    }
  };

  /** Sin supabase en SSR: mismo skeleton que auth cargando (evita hydration mismatch). */
  if (!supabase || authLoading || (sessionUserId && !dataReady)) {
    return (
      <div
        className="mb-4 h-20 animate-pulse rounded-2xl border-2 border-border/30 bg-white/50"
        aria-hidden
      />
    );
  }

  if (!sessionUserId) {
    return (
      <div className="mb-4 rounded-2xl border-2 border-dashed border-black/15 bg-white/60 px-4 py-3 text-sm font-nunito font-bold text-textMuted">
        <a href="/cuenta/" className="text-info no-underline hover:underline">
          Iniciá sesión
        </a>{' '}
        para marcar lecciones y verlas después en tu panel.
      </div>
    );
  }

  if (!favoriteSlug) {
    return (
      <div className="mb-4 rounded-2xl border-2 border-[#FFD166] bg-[#FFF9E6] px-4 py-3 text-sm font-nunito font-bold text-textSecondary">
        Elegí un <strong>curso favorito</strong> en{' '}
        <a href="/panel/" className="text-info no-underline hover:underline">
          tu panel
        </a>{' '}
        para poder marcar lecciones y repasarlas.
      </div>
    );
  }

  if (favoriteSlug !== courseSlug) {
    return (
      <div className="mb-4 rounded-2xl border-2 border-border bg-tertiary/40 px-4 py-3 text-sm font-nunito font-bold text-textSecondary">
        Tu curso favorito es otro; solo podés marcar lecciones cuando estés en ese curso.{' '}
        <a href="/panel/" className="text-info no-underline hover:underline">
          Cambiar favorito
        </a>
      </div>
    );
  }

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-[3px] border-border bg-white px-4 py-3 shadow-[3px_3px_0px_#1E1210]">
      <div className="min-w-0">
        <p className="m-0 font-nunito font-black text-textPrimary text-[0.95rem]">Repasar después</p>
        <p className="m-0 text-xs font-nunito font-bold text-textMuted">Solo en tu curso favorito · se guarda en tu cuenta</p>
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={() => void toggle()}
        className={`shrink-0 rounded-xl border-[3px] border-border px-4 py-2 font-nunito font-black text-sm transition-all ${
          bookmarked
            ? 'bg-[#FFD166] text-textPrimary shadow-[2px_2px_0px_#1E1210]'
            : 'bg-tertiary text-textPrimary hover:-translate-y-0.5'
        } disabled:opacity-50`}
        aria-pressed={bookmarked}
      >
        {busy ? '…' : bookmarked ? '★ Marcada' : '☆ Marcar lección'}
      </button>
      {err && <p className="w-full m-0 text-xs font-nunito font-bold text-red-600">{err}</p>}
    </div>
  );
}
