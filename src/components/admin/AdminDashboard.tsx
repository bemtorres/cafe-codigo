import { useCallback, useEffect, useState } from 'react';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';
import SuperAdminGate from './SuperAdminGate';

type CountState = {
  profiles: number | null;
  badgeDefinitions: number | null;
  badgeDefinitionsActive: number | null;
  userBadges: number | null;
  quizProgressRows: number | null;
};

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | null;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border-[3px] border-border bg-white p-5 shadow-neo">
      <p className="m-0 text-[10px] font-black uppercase tracking-widest text-textMuted">{label}</p>
      <p className="mt-2 mb-0 font-nunito text-3xl font-black text-textPrimary tabular-nums">
        {value === null ? '—' : value.toLocaleString('es')}
      </p>
      {hint ? <p className="mb-0 mt-1 text-xs font-[650] text-textSecondary">{hint}</p> : null}
    </div>
  );
}

function AdminDashboardContent() {
  const { supabase } = useSupabaseAuth();
  const [counts, setCounts] = useState<CountState>({
    profiles: null,
    badgeDefinitions: null,
    badgeDefinitionsActive: null,
    userBadges: null,
    quizProgressRows: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const [
      profilesRes,
      badgesRes,
      badgesActiveRes,
      ubRes,
      qpRes,
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('badge_definitions').select('*', { count: 'exact', head: true }),
      supabase.from('badge_definitions').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('user_badges').select('*', { count: 'exact', head: true }),
      supabase.from('quiz_progress').select('*', { count: 'exact', head: true }),
    ]);

    const err =
      profilesRes.error?.message ||
      badgesRes.error?.message ||
      badgesActiveRes.error?.message ||
      ubRes.error?.message ||
      qpRes.error?.message;
    if (err) {
      setError(err);
      setCounts({
        profiles: null,
        badgeDefinitions: null,
        badgeDefinitionsActive: null,
        userBadges: null,
        quizProgressRows: null,
      });
    } else {
      setCounts({
        profiles: profilesRes.count ?? 0,
        badgeDefinitions: badgesRes.count ?? 0,
        badgeDefinitionsActive: badgesActiveRes.count ?? 0,
        userBadges: ubRes.count ?? 0,
        quizProgressRows: qpRes.count ?? 0,
      });
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="mb-2 text-2xl font-black text-textPrimary">Panel · Super admin</h1>
        <p className="m-0 text-sm font-[650] text-textSecondary">
          Resumen de la plataforma. Las cifras requieren la migración SQL{' '}
          <code className="rounded bg-black/5 px-1">20260501_04_super_admin_scope.sql</code> aplicada en Supabase.
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 text-sm font-bold text-red-900" role="alert">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="rounded-xl border-[3px] border-border bg-white px-4 py-2 text-xs font-black shadow-neo hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? 'Actualizando…' : 'Actualizar datos'}
        </button>
        <a
          href="/admin/embed"
          className="rounded-xl border-[3px] border-border bg-primary/20 px-4 py-2 text-xs font-black text-textPrimary no-underline shadow-neo hover:bg-primary/30"
        >
          Generador embed
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Usuarios (perfiles)" value={counts.profiles} />
        <StatCard label="Definiciones de insignias" value={counts.badgeDefinitions} hint="Total en base" />
        <StatCard label="Insignias activas" value={counts.badgeDefinitionsActive} />
        <StatCard label="Insignias otorgadas" value={counts.userBadges} hint="Filas en user_badges" />
        <StatCard label="Filas de progreso quiz" value={counts.quizProgressRows} hint="Intentos / lecciones registradas" />
      </div>

      <section className="rounded-2xl border-[3px] border-border bg-white p-6 shadow-neo">
        <h2 className="mt-0 text-lg font-black text-textPrimary">Accesos rápidos</h2>
        <ul className="m-0 list-none space-y-2 p-0 text-sm font-[650] text-textSecondary">
          <li>
            <a href="/admin/users" className="font-black text-[#b45309] underline-offset-2 hover:underline">
              Gestionar usuarios y roles
            </a>
          </li>
          <li>
            <a href="/admin/badges" className="font-black text-[#b45309] underline-offset-2 hover:underline">
              Insignias y diseñador SVG
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <SuperAdminGate featureHint="el panel de administración">
      <AdminDashboardContent />
    </SuperAdminGate>
  );
}
