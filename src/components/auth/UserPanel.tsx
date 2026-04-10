import { useCallback, useEffect, useMemo, useState } from 'react';
import { courses, type CourseCategory } from '../../data/courses';
import { courseLessonPath } from '../../lib/coursePaths';
import { pseintQuizBank } from '../../data/pseintQuizBank';
import type { LessonBookmarkRow, ProfileRow } from '../../lib/supabase/client';
import { quizPercent, type QuizProgressRow } from '../../lib/supabase/quizProgress';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';
import { passwordProtectedSlugs, tryUnlockWithSecret } from '../../lib/courseUnlock';
import UserLevelCard from './UserLevelCard';

const categoryOrder: CourseCategory[] = [
  'foundations',
  'language',
  'advanced',
  'testing',
  'frontend',
  'engineering',
  'database',
  'tools',
  'gamedev',
];

const categoryLabel: Record<CourseCategory, string> = {
  foundations: 'Conceptos base',
  language: 'Lenguajes',
  advanced: 'Programación avanzada',
  testing: 'Test',
  frontend: 'Frontend (web)',
  engineering: 'Ingeniería y calidad',
  database: 'Bases de datos',
  tools: 'Herramientas',
  gamedev: 'Videojuegos',
};

function scoreHue(pct: number | null): string {
  if (pct == null) return 'from-[#94a3b8] to-[#64748b]';
  if (pct >= 75) return 'from-[#06D6A0] to-[#0d9488]';
  if (pct >= 50) return 'from-[#fbbf24] to-[#f59e0b]';
  return 'from-[#fb7185] to-[#e11d48]';
}

function RingProgress({ pct, label }: { pct: number; label: string }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, pct)) / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="h-24 w-24 md:h-28 md:w-28" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(30,18,16,0.12)" strokeWidth="9" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06D6A0" />
              <stop offset="100%" stopColor="#118AB2" />
            </linearGradient>
          </defs>
        </svg>
        <span className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center font-nunito text-xl font-black text-textPrimary md:text-2xl">
          {pct}%
        </span>
      </div>
      <span className="max-w-[10rem] text-center text-xs font-extrabold uppercase tracking-wide text-textMuted">{label}</span>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="dashboard-root space-y-5 pb-8 md:space-y-8" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando panel…</span>
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border-[3px] border-border bg-white p-5 shadow-[6px_6px_0px_#1E1210] md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl border-[3px] border-border bg-black/[0.06] md:h-16 md:w-16" />
            <div className="min-w-0 flex-1 space-y-3 pt-1">
              <div className="h-3 w-24 animate-pulse rounded-full bg-black/[0.08]" />
              <div className="h-8 max-w-[14rem] animate-pulse rounded-lg bg-black/[0.08]" />
              <div className="h-4 max-w-[12rem] animate-pulse rounded-full bg-black/[0.06]" />
            </div>
          </div>
          <div className="h-10 w-28 shrink-0 animate-pulse rounded-2xl border-[3px] border-border bg-black/[0.06] md:self-center" />
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border-[3px] border-border bg-white/80 p-4 shadow-[4px_4px_0px_#1E1210] md:p-5"
          >
            <div className="mb-3 h-8 w-8 animate-pulse rounded-lg bg-black/[0.07]" />
            <div className="h-8 w-16 animate-pulse rounded-lg bg-black/[0.09]" />
            <div className="mt-3 h-3 w-24 animate-pulse rounded-full bg-black/[0.06]" />
          </div>
        ))}
      </div>
      {/* Bloques (PSeInt + secciones) */}
      <div className="space-y-4">
        <div className="h-48 animate-pulse rounded-3xl border-[3px] border-border bg-gradient-to-br from-white to-tertiary/30 shadow-[5px_5px_0px_#1E1210] md:h-56" />
        <div className="h-36 animate-pulse rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#f0f9ff] to-white shadow-[5px_5px_0px_#1E1210]" />
      </div>
    </div>
  );
}

function StatCard({
  value,
  subtitle,
  icon,
  accent,
}: {
  value: string | number;
  subtitle: string;
  icon: string;
  accent: 'mint' | 'sky' | 'amber' | 'rose';
}) {
  const ring: Record<typeof accent, string> = {
    mint: 'ring-[#06D6A0]/35',
    sky: 'ring-[#118AB2]/35',
    amber: 'ring-[#f59e0b]/35',
    rose: 'ring-[#fb7185]/35',
  };
  const bg: Record<typeof accent, string> = {
    mint: 'bg-[#e8fcf5]',
    sky: 'bg-[#e8f4fc]',
    amber: 'bg-[#fff8e6]',
    rose: 'bg-[#fff1f2]',
  };
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-[3px] border-border ${bg[accent]} p-4 shadow-[4px_4px_0px_#1E1210] ring-2 ${ring[accent]} md:p-5`}
    >
      <div className="mb-2 text-2xl md:text-3xl" aria-hidden>
        {icon}
      </div>
      <p className="font-nunito text-2xl font-black tabular-nums leading-none text-textPrimary md:text-3xl">{value}</p>
      <p className="mt-1.5 font-nunito text-xs font-extrabold uppercase tracking-wide text-textSecondary md:text-[0.7rem]">{subtitle}</p>
    </div>
  );
}

export default function UserPanel() {
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [favoriteSlug, setFavoriteSlug] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<LessonBookmarkRow[]>([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [pseintQuizRows, setPseintQuizRows] = useState<Pick<
    QuizProgressRow,
    'lesson_slug' | 'correct_best' | 'question_count' | 'attempts'
  >[]>([]);
  const [pseintQuizLoading, setPseintQuizLoading] = useState(false);
  const [pseintQuizError, setPseintQuizError] = useState<string | null>(null);
  const [clientReady, setClientReady] = useState(false);
  const [showSecretBanner, setShowSecretBanner] = useState(false);
  const [panelSecret, setPanelSecret] = useState('');
  const [panelSecretFeedback, setPanelSecretFeedback] = useState<'ok' | 'bad' | null>(null);
  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);
  const [showPwFields, setShowPwFields] = useState(false);
  useEffect(() => setClientReady(true), []);

  useEffect(() => {
    if (!user || typeof window === 'undefined') {
      setShowSecretBanner(false);
      return;
    }
    const slugs = passwordProtectedSlugs();
    if (slugs.length === 0) {
      setShowSecretBanner(false);
      return;
    }
    const missing = slugs.some((s) => !localStorage.getItem(`unlocked_${s}`));
    setShowSecretBanner(missing);
  }, [user?.id]);

  const selectable = useMemo(
    () => courses.filter((c) => c.status === 'available' && c.lessons?.length),
    [],
  );

  const grouped = useMemo(() => {
    const m = new Map<CourseCategory, typeof selectable>();
    for (const c of selectable) {
      const list = m.get(c.category) ?? [];
      list.push(c);
      m.set(c.category, list);
    }
    return categoryOrder
      .map((cat) => ({ cat, label: categoryLabel[cat], items: m.get(cat) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, [selectable]);

  const loadProfile = useCallback(
    async (userId: string) => {
      if (!supabase) return;
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
      if (error) {
        setErr(error.message);
        return;
      }
      if (data) {
        setProfile(data as ProfileRow);
        setFavoriteSlug(data.favorite_course_slug ?? '');
      } else {
        const { data: u } = await supabase.auth.getUser();
        const meta = u.user?.user_metadata as { display_name?: string } | undefined;
        const display = meta?.display_name?.trim() || '';
        const { error: upErr } = await supabase.from('profiles').insert({
          id: userId,
          display_name: display || null,
          favorite_course_slug: null,
          competition_points: 0,
        });
        if (upErr) setErr(upErr.message);
        else {
          setProfile({
            id: userId,
            display_name: display || null,
            favorite_course_slug: null,
            competition_points: 0,
          });
          setFavoriteSlug('');
        }
      }
    },
    [supabase],
  );

  const loadBookmarks = useCallback(
    async (userId: string, favorite: string | null) => {
      if (!supabase || !favorite) {
        setBookmarks([]);
        return;
      }
      setBookmarksLoading(true);
      const { data, error } = await supabase
        .from('lesson_bookmarks')
        .select('*')
        .eq('user_id', userId)
        .eq('course_slug', favorite)
        .order('created_at', { ascending: false });
      setBookmarksLoading(false);
      if (error) {
        setErr(error.message);
        return;
      }
      setBookmarks((data as LessonBookmarkRow[]) ?? []);
    },
    [supabase],
  );

  useEffect(() => {
    if (!user?.id || !supabase) {
      setProfile(null);
      setFavoriteSlug('');
      setBookmarks([]);
      setProfileReady(true);
      return;
    }
    setProfileReady(false);
    let cancelled = false;
    void loadProfile(user.id).finally(() => {
      if (!cancelled) setProfileReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id, supabase, loadProfile]);

  useEffect(() => {
    if (!user?.id || !profile?.favorite_course_slug) {
      setBookmarks([]);
      return;
    }
    void loadBookmarks(user.id, profile.favorite_course_slug);
  }, [user?.id, profile?.favorite_course_slug, loadBookmarks]);

  useEffect(() => {
    if (!user?.id || !supabase) {
      setPseintQuizRows([]);
      setPseintQuizError(null);
      return;
    }
    setPseintQuizLoading(true);
    setPseintQuizError(null);
    void supabase!
      .from('quiz_progress')
      .select('lesson_slug, correct_best, question_count, attempts')
      .eq('user_id', user.id)
      .eq('course_slug', 'pseint')
      .then(({ data, error }) => {
        setPseintQuizLoading(false);
        if (error) {
          setPseintQuizRows([]);
          setPseintQuizError(error.message);
          return;
        }
        setPseintQuizRows(
          (data as Pick<QuizProgressRow, 'lesson_slug' | 'correct_best' | 'question_count' | 'attempts'>[]) ?? [],
        );
      });
  }, [user?.id, supabase]);

  const saveFavorite = async () => {
    if (!user) return;
    if (!supabase) return;
    setSaving(true);
    setErr(null);
    setStatus(null);
    const slug = favoriteSlug || null;
    const { error } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        display_name: profile?.display_name ?? null,
        favorite_course_slug: slug,
        competition_points: profile?.competition_points ?? 0,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' },
    );
    setSaving(false);
    if (error) {
      setErr(error.message);
      return;
    }
    const metaName = (user.user_metadata as { display_name?: string } | undefined)?.display_name?.trim() || null;
    setProfile((p) =>
      p
        ? { ...p, favorite_course_slug: slug, updated_at: new Date().toISOString() }
        : {
            id: user.id,
            display_name: profile?.display_name ?? metaName,
            favorite_course_slug: slug,
            competition_points: profile?.competition_points ?? 0,
          },
    );
    setStatus('Curso favorito guardado.');
    void loadBookmarks(user.id, slug);
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const changePassword = async () => {
    if (!supabase || !user?.email) return;
    setPwErr(null);
    setPwMsg(null);
    if (pwNew.length < 6) {
      setPwErr('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (pwNew !== pwConfirm) {
      setPwErr('La confirmación no coincide con la nueva contraseña.');
      return;
    }
    if (pwNew === pwCurrent) {
      setPwErr('La nueva contraseña debe ser distinta a la actual.');
      return;
    }
    setPwSaving(true);
    try {
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: pwCurrent,
      });
      if (signErr) {
        setPwErr('La contraseña actual no es correcta.');
        return;
      }
      const { error: upErr } = await supabase.auth.updateUser({ password: pwNew });
      if (upErr) {
        setPwErr(upErr.message);
        return;
      }
      setPwMsg('Contraseña actualizada. La próxima vez usá la nueva al entrar.');
      setPwCurrent('');
      setPwNew('');
      setPwConfirm('');
    } finally {
      setPwSaving(false);
    }
  };

  const pseintLessonTitle = (slug: string) => {
    const c = courses.find((x) => x.slug === 'pseint');
    return c?.lessons?.find((l) => l.slug === slug)?.title ?? slug;
  };

  const pseintQuizBySlug = useMemo(() => {
    const m = new Map<string, (typeof pseintQuizRows)[number]>();
    for (const r of pseintQuizRows) m.set(r.lesson_slug, r);
    return m;
  }, [pseintQuizRows]);

  const pseintQuizOrder = useMemo(() => Object.keys(pseintQuizBank), []);

  const dashboardStats = useMemo(() => {
    const withScore = pseintQuizRows.filter((r) => r.question_count > 0);
    const avg =
      withScore.length > 0
        ? Math.round(
            withScore.reduce((s, r) => s + quizPercent(r.correct_best, r.question_count), 0) / withScore.length,
          )
        : null;
    const attempts = pseintQuizRows.reduce((s, r) => s + r.attempts, 0);
    const lessonsDone = withScore.length;
    const totalLessons = pseintQuizOrder.length;
    return { avg, attempts, lessonsDone, totalLessons };
  }, [pseintQuizRows, pseintQuizOrder.length]);

  const hrefForBookmark = (courseSlug: string, lessonSlug: string) => {
    const c = courses.find((x) => x.slug === courseSlug);
    const l = c?.lessons?.find((x) => x.slug === lessonSlug);
    return l?.href ?? `/${courseSlug}/${lessonSlug}/`;
  };

  const removeBookmark = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('lesson_bookmarks').delete().eq('id', id);
    if (error) {
      setErr(error.message);
      return;
    }
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  if (!clientReady) {
    return <PanelSkeleton />;
  }

  if (!supabase) {
    return (
      <div className="content-section">
        <p className="font-nunito font-bold text-textSecondary m-0">
          Configura <code>PUBLIC_SUPABASE_URL</code> y <code>PUBLIC_SUPABASE_ANON_KEY</code> en <code>.env</code> para usar la cuenta.
        </p>
      </div>
    );
  }

  if (authLoading || (user && !profileReady)) {
    return <PanelSkeleton />;
  }

  if (!user) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 text-center shadow-[6px_6px_0px_#1E1210]">
        <p className="mb-6 font-nunito font-bold text-textPrimary">Iniciá sesión para ver tu panel y elegir tu curso favorito.</p>
        <a
          href="/cuenta/"
          className="inline-flex items-center justify-center rounded-2xl border-[3px] border-border bg-[#06D6A0] py-3 px-8 font-nunito font-black text-[#1E1210] no-underline shadow-[4px_4px_0px_#1E1210] transition-transform hover:-translate-y-0.5"
        >
          Ir a iniciar sesión
        </a>
      </div>
    );
  }

  const email = user.email ?? '';
  const display =
    profile?.display_name?.trim() || (user.user_metadata as { display_name?: string })?.display_name || email.split('@')[0];
  const initial = display.charAt(0).toUpperCase() || '?';
  const favoriteName = profile?.favorite_course_slug
    ? (selectable.find((c) => c.slug === profile.favorite_course_slug)?.name ?? profile.favorite_course_slug)
    : null;

  return (
    <div className="dashboard-root space-y-5 pb-8 md:space-y-8">
      {/* Hero */}
      <header
        id="perfil"
        className="scroll-mt-28 relative overflow-hidden rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#fef6ee] via-white to-[#e8fcf5] p-5 shadow-[6px_6px_0px_#1E1210] md:p-8"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#06D6A0]/15 blur-2xl md:h-56 md:w-56"
          aria-hidden
        />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-border bg-white text-2xl font-black text-textPrimary shadow-[3px_3px_0px_#1E1210] md:h-16 md:w-16 md:text-3xl"
              aria-hidden
            >
              {initial}
            </div>
            <div className="min-w-0">
              <p className="m-0 font-nunito text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-textMuted">Tu espacio</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h2 className="m-0 font-nunito text-2xl font-black text-textPrimary md:text-3xl">Hola, {display}</h2>
                {profile?.is_sponsor ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#ea580c]/50 bg-gradient-to-r from-[#ffedd5] to-[#fef3c7] px-3 py-1 font-nunito text-xs font-black uppercase tracking-wide text-[#9a3412] shadow-[2px_2px_0px_#1E1210]">
                    <span aria-hidden>☕</span> Sponsor
                  </span>
                ) : null}
              </div>
              <p className="mt-1 truncate font-nunito text-sm font-semibold text-textSecondary">{email}</p>
              {profile?.is_sponsor ? (
                <p className="mt-2 m-0 max-w-md font-nunito text-sm font-[650] text-textSecondary">
                  Gracias por colaborar. Tenés acceso a la{' '}
                  <a href="/colaboradores/zona/" className="font-black text-info underline decoration-2 underline-offset-2">
                    zona exclusiva para colaboradores
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="shrink-0 self-start rounded-2xl border-[3px] border-border bg-white px-5 py-2.5 font-nunito text-sm font-extrabold text-textPrimary shadow-[3px_3px_0px_#1E1210] transition-colors hover:bg-tertiary md:self-center"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* <UserLevelCard competitionPoints={profile?.competition_points ?? 0} /> */}

      {showSecretBanner && (
        <section
          className="rounded-3xl border-[3px] border-dashed border-[#118AB2]/60 bg-gradient-to-r from-[#f0f9ff] to-[#fef6ee] p-4 shadow-[4px_4px_0px_#1E1210] md:p-5"
          aria-labelledby="secret-banner-title"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p id="secret-banner-title" className="m-0 font-nunito text-lg font-black text-textPrimary">
                ¿Tenés la clave secreta?
              </p>
              <p className="mt-1 font-nunito text-sm font-[650] text-textSecondary">
                Podés desbloquear aquí los <strong>cursos con candado</strong> (mismo paso que en el registro). Solo se guarda en este navegador.
              </p>
            </div>
            <form
              className="flex w-full shrink-0 flex-col gap-2 sm:max-w-xs md:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                setPanelSecretFeedback(null);
                if (tryUnlockWithSecret(panelSecret)) {
                  setPanelSecretFeedback('ok');
                  setPanelSecret('');
                  setShowSecretBanner(false);
                } else {
                  setPanelSecretFeedback('bad');
                }
              }}
            >
              <input
                type="password"
                autoComplete="off"
                value={panelSecret}
                onChange={(e) => {
                  setPanelSecret(e.target.value);
                  setPanelSecretFeedback(null);
                }}
                placeholder="Clave secreta"
                className="w-full rounded-xl border-[3px] border-border bg-white px-3 py-2 font-nunito font-bold shadow-[2px_2px_0px_#1E1210] focus:border-info focus:outline-none"
              />
              {panelSecretFeedback === 'bad' && (
                <p className="m-0 font-nunito text-xs font-bold text-red-600">No coincide. Volvé a intentar.</p>
              )}
              <button
                type="submit"
                className="rounded-xl border-[3px] border-border bg-[#118AB2] px-4 py-2 font-nunito font-black text-sm text-white shadow-[3px_3px_0px_#1E1210]"
              >
                Desbloquear
              </button>
            </form>
          </div>
        </section>
      )}

      {/* KPIs */}
      <section hidden aria-labelledby="dash-summary-heading">
        <h2 id="dash-summary-heading" className="sr-only">
          Resumen de actividad
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <StatCard
            value={pseintQuizLoading ? '…' : dashboardStats.lessonsDone}
            subtitle="Quizzes con resultado"
            icon="📊"
            accent="mint"
          />
          <StatCard
            value={pseintQuizLoading ? '…' : dashboardStats.avg != null ? `${dashboardStats.avg}%` : '—'}
            subtitle="Promedio PSeInt"
            icon="🎯"
            accent="sky"
          />
          <StatCard
            value={pseintQuizLoading ? '…' : dashboardStats.attempts}
            subtitle="Intentos totales"
            icon="🔁"
            accent="amber"
          />
          <StatCard
            value={bookmarksLoading ? '…' : bookmarks.length}
            subtitle="Marcadores"
            icon="🔖"
            accent="rose"
          />
        </div>
      </section>

      {/* CoffeeCoin · tienda: omitido por ahora (CoffeeCoinStoreSection) */}

      {/* PSeInt report */}
      <section hidden
        className="rounded-3xl border-[3px] border-border bg-white p-5 shadow-[5px_5px_0px_#1E1210] md:p-8"
        aria-labelledby="pseint-report-heading"
      >
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 id="pseint-report-heading" className="!mt-0 font-nunito text-xl font-black text-textPrimary md:text-2xl">
              Progreso en PSeInt
            </h2>
            <p className="mt-2 max-w-xl font-nunito text-sm font-[650] leading-relaxed text-textSecondary">
              Tu mejor puntaje por lección (se guarda al finalizar cada examen con la sesión iniciada).
            </p>
          </div>
          {!pseintQuizLoading && dashboardStats.avg != null && (
            <div className="shrink-0 lg:pt-1">
              <RingProgress pct={dashboardStats.avg} label="Promedio" />
            </div>
          )}
        </div>

        {pseintQuizError && (
          <p className="mb-4 rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 font-nunito text-sm font-bold text-red-700">
            No se pudo cargar el progreso: {pseintQuizError}. Si acabas de crear el proyecto, ejecutá en Supabase el SQL de{' '}
            <code className="text-xs">quiz_progress</code> en <code className="text-xs">supabase/schema.sql</code>.
          </p>
        )}

        {pseintQuizLoading ? (
          <div className="flex justify-center py-12 font-nunito font-bold text-textMuted">Cargando reportes…</div>
        ) : (
          <div className="space-y-4">
            {pseintQuizOrder.map((slug) => {
              const row = pseintQuizBySlug.get(slug);
              const pct = row ? quizPercent(row.correct_best, row.question_count) : null;
              return (
                <div
                  key={slug}
                  className="rounded-2xl border-2 border-border/80 bg-tertiary/25 p-3 md:flex md:items-center md:gap-4 md:p-4"
                >
                  <div className="mb-2 min-w-0 flex-1 md:mb-0">
                    <a
                      href={courseLessonPath('pseint', slug)}
                      className="font-nunito text-sm font-black text-info no-underline hover:underline md:text-base"
                    >
                      {pseintLessonTitle(slug)}
                    </a>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-nunito text-xs font-bold text-textMuted">
                      <span>
                        {row ? (
                          <>
                            {pct}% <span className="text-textSecondary">({row.correct_best}/{row.question_count})</span>
                          </>
                        ) : (
                          'Sin intento aún'
                        )}
                      </span>
                      {row != null && <span>{row.attempts} intento{row.attempts === 1 ? '' : 's'}</span>}
                    </div>
                  </div>
                  <div className="md:w-52 lg:w-64">
                    <div
                      className="h-3 overflow-hidden rounded-full border-2 border-border bg-white/80"
                      role="progressbar"
                      aria-valuenow={pct ?? 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progreso en ${pseintLessonTitle(slug)}`}
                    >
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${scoreHue(pct)} transition-all duration-500`}
                        style={{ width: `${pct ?? 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Preferencias */}
      <section className="rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#f0f9ff] to-white p-5 shadow-[5px_5px_0px_#1E1210] md:p-8">
        <h2 className="!mt-0 font-nunito text-xl font-black text-textPrimary md:text-2xl">Preferencias</h2>
        <p className="mt-2 max-w-2xl font-nunito text-sm font-[650] text-textSecondary">
          Elegí el curso que más te interesa; lo usamos para los marcadores y para personalizar tu experiencia.
        </p>

        <div className="mt-6 space-y-4">
          {/* Listado visual de cursos agrupados */}
          <div>
            <p className="mb-3 font-nunito text-sm font-extrabold text-textSecondary">
              Curso favorito
              {favoriteSlug && (
                <button
                  type="button"
                  onClick={() => setFavoriteSlug('')}
                  className="ml-3 font-nunito text-xs font-bold text-textMuted underline hover:text-textPrimary"
                >
                  Quitar selección
                </button>
              )}
            </p>
            <div className="max-h-[420px] overflow-y-auto rounded-2xl border-[3px] border-border bg-white shadow-[3px_3px_0px_#1E1210]">
              {/* Opción ninguno */}
              <button
                type="button"
                onClick={() => setFavoriteSlug('')}
                className={`flex w-full items-center gap-3 border-b-2 border-border/40 px-4 py-2.5 text-left transition-colors hover:bg-tertiary/30 ${
                  favoriteSlug === '' ? 'bg-info/10 font-extrabold text-info' : 'text-textMuted'
                }`}
              >
                <span className="inline-block h-3 w-3 shrink-0 rounded-full border-2 border-border bg-white" />
                <span className="font-nunito text-sm font-bold">— Ninguno —</span>
                {favoriteSlug === '' && <span className="ml-auto text-info" aria-hidden>✓</span>}
              </button>

              {grouped.map(({ cat, label, items }) => (
                <div key={cat}>
                  <p className="m-0 border-b-2 border-t-2 border-border/30 bg-tertiary/50 px-4 py-1.5 font-nunito text-[0.65rem] font-extrabold uppercase tracking-widest text-textMuted">
                    {label}
                  </p>
                  {items.map((c) => {
                    const isSelected = favoriteSlug === c.slug;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => setFavoriteSlug(c.slug)}
                        className={`flex w-full items-center gap-3 border-b border-border/20 px-4 py-2.5 text-left transition-colors last:border-b-0 hover:bg-tertiary/30 ${
                          isSelected ? 'bg-info/8' : ''
                        }`}
                      >
                        <span
                          className="inline-block h-3 w-3 shrink-0 rounded-full border-2 border-border"
                          style={{ backgroundColor: c.color }}
                          aria-hidden
                        />
                        <span className={`flex-1 font-nunito text-sm ${isSelected ? 'font-extrabold text-info' : 'font-bold text-textPrimary'}`}>
                          {c.name}
                        </span>
                        {c.requiresPassword && (
                          <span className="shrink-0 font-nunito text-[0.6rem] font-extrabold text-textMuted">🔒</span>
                        )}
                        {c.lessons?.length && (
                          <span className="shrink-0 font-nunito text-[0.65rem] font-bold text-textMuted">
                            {c.lessons.length} lec.
                          </span>
                        )}
                        {isSelected && <span className="shrink-0 text-info" aria-hidden>✓</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {err && <p className="font-nunito text-sm font-bold text-red-600">{err}</p>}
          {status && <p className="font-nunito text-sm font-bold text-emerald-700">{status}</p>}

          <button
            type="button"
            disabled={saving}
            onClick={() => void saveFavorite()}
            className="rounded-2xl border-[3px] border-border bg-info px-6 py-3 font-nunito font-black text-white shadow-[4px_4px_0px_#1E1210] transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {saving ? 'Guardando…' : 'Guardar preferencias'}
          </button>

          {favoriteName && (
            <p className="m-0 rounded-xl border-2 border-[#118AB2]/30 bg-white/80 px-4 py-3 font-nunito text-sm font-bold text-textSecondary">
              Activo: <span className="text-textPrimary">{favoriteName}</span>
            </p>
          )}
        </div>
      </section>

      {/* Contraseña */}
      <section className="rounded-3xl border-[3px] border-border bg-white p-5 shadow-[5px_5px_0px_#1E1210] md:p-8">
        <h2 className="!mt-0 font-nunito text-xl font-black text-textPrimary md:text-2xl">Seguridad</h2>
        <p className="mt-2 max-w-2xl font-nunito text-sm font-[650] text-textSecondary">
          Cambiá tu contraseña cuando quieras. Tenés que escribir bien la contraseña actual para confirmar que sos vos.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setShowPwFields((v) => !v);
              setPwErr(null);
              setPwMsg(null);
            }}
            className="rounded-xl border-[3px] border-border bg-tertiary/40 px-4 py-2 font-nunito text-sm font-extrabold text-textPrimary shadow-neo hover:bg-tertiary"
          >
            {showPwFields ? 'Ocultar formulario' : 'Cambiar contraseña'}
          </button>
        </div>

        {showPwFields && (
          <form
            className="mt-6 flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              void changePassword();
            }}
          >
            <div>
              <label htmlFor="pw-current" className="mb-1.5 block font-nunito text-sm font-extrabold text-textSecondary">
                Contraseña actual
              </label>
              <input
                id="pw-current"
                type="password"
                autoComplete="current-password"
                value={pwCurrent}
                onChange={(e) => setPwCurrent(e.target.value)}
                className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3 font-nunito font-bold shadow-neo focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
              />
            </div>
            <div>
              <label htmlFor="pw-new" className="mb-1.5 block font-nunito text-sm font-extrabold text-textSecondary">
                Nueva contraseña
              </label>
              <input
                id="pw-new"
                type="password"
                autoComplete="new-password"
                minLength={6}
                value={pwNew}
                onChange={(e) => setPwNew(e.target.value)}
                className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3 font-nunito font-bold shadow-neo focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label htmlFor="pw-confirm" className="mb-1.5 block font-nunito text-sm font-extrabold text-textSecondary">
                Repetir nueva contraseña
              </label>
              <input
                id="pw-confirm"
                type="password"
                autoComplete="new-password"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3 font-nunito font-bold shadow-neo focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
              />
            </div>

            {pwErr && (
              <p role="alert" className="m-0 rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2 font-nunito text-sm font-bold text-red-800">
                {pwErr}
              </p>
            )}
            {pwMsg && (
              <p className="m-0 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 font-nunito text-sm font-bold text-emerald-900">
                {pwMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={pwSaving || !pwCurrent || !pwNew || !pwConfirm}
              className="w-full max-w-xs rounded-2xl border-[3px] border-border bg-textPrimary py-3 font-nunito font-black text-white shadow-neo transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {pwSaving ? 'Guardando…' : 'Actualizar contraseña'}
            </button>
          </form>
        )}
      </section>

      {/* Marcadores */}
      <section className="rounded-3xl border-[3px] border-border bg-white p-5 shadow-[5px_5px_0px_#1E1210] md:p-8">
        <h2 className="!mt-0 font-nunito text-xl font-black text-textPrimary md:text-2xl">Lecciones para repasar</h2>
        <p className="mt-2 max-w-2xl font-nunito text-sm font-[650] text-textSecondary">
          Marcá lecciones en tu curso favorito; aparecen aquí para volver cuando quieras.
        </p>

        {!profile?.favorite_course_slug ? (
          <p className="mt-6 rounded-2xl border-2 border-dashed border-border bg-tertiary/20 px-4 py-6 text-center font-nunito font-bold text-textMuted">
            Elegí un curso favorito arriba para usar los marcadores.
          </p>
        ) : bookmarksLoading ? (
          <p className="mt-6 font-nunito font-bold text-textMuted">Cargando…</p>
        ) : bookmarks.length === 0 ? (
          <p className="mt-6 rounded-2xl border-2 border-dashed border-border bg-tertiary/20 px-4 py-6 text-center font-nunito font-bold text-textMuted">
            Todavía no marcaste lecciones. Abrí una lección del curso favorito y usá «Marcar lección».
          </p>
        ) : (
          <ul className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-1 md:grid-cols-2">
            {bookmarks.map((b) => (
              <li
                key={b.id}
                className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-gradient-to-br from-tertiary/40 to-white p-4 shadow-[3px_3px_0px_#1E1210] sm:flex-row sm:items-center sm:justify-between"
              >
                <a
                  href={hrefForBookmark(b.course_slug, b.lesson_slug)}
                  className="min-w-0 flex-1 font-nunito font-extrabold text-textPrimary no-underline hover:text-info"
                >
                  {b.lesson_title || b.lesson_slug}
                </a>
                <button
                  type="button"
                  onClick={() => void removeBookmark(b.id)}
                  className="shrink-0 rounded-xl border-2 border-border bg-white px-3 py-2 text-center font-nunito text-xs font-black hover:bg-red-50"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
