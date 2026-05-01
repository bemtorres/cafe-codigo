import { useCallback, useEffect, useState } from 'react';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';
import SuperAdminGate from './SuperAdminGate';

type ProfileAdminRow = {
  id: string;
  display_name: string | null;
  favorite_course_slug: string | null;
  is_academy: boolean;
  is_super_admin: boolean;
  is_sponsor: boolean;
  sponsor_since: string | null;
  competition_points: number;
  updated_at: string;
};

const PAGE_SIZE = 40;

function shortId(id: string): string {
  return id.replace(/-/g, '').slice(0, 8);
}

function AdminUsersContent() {
  const { supabase, user } = useSupabaseAuth();
  const [rows, setRows] = useState<ProfileAdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [pointsDraft, setPointsDraft] = useState<Record<string, string>>({});
  /** Fuerza recarga cuando página y término no cambian (mismo criterio, botón Buscar). */
  const [listVersion, setListVersion] = useState(0);

  const fetchPage = useCallback(
    async (targetPage: number, termRaw: string) => {
      if (!supabase) return;
      setLoading(true);
      setError(null);
      const from = targetPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let q = supabase
        .from('profiles')
        .select(
          'id, display_name, favorite_course_slug, is_academy, is_super_admin, is_sponsor, sponsor_since, competition_points, updated_at'
        )
        .order('updated_at', { ascending: false })
        .range(from, to);

      const term = termRaw.trim();
      if (term.length >= 2) {
        q = q.or(`display_name.ilike.%${term}%`);
      }

      const { data, error: err } = await q;
      if (err) {
        setError(err.message);
        setRows([]);
      } else {
        setRows((data as ProfileAdminRow[]) ?? []);
        const drafts: Record<string, string> = {};
        (data as ProfileAdminRow[])?.forEach((r) => {
          drafts[r.id] = String(r.competition_points ?? 0);
        });
        setPointsDraft((prev) => ({ ...drafts, ...prev }));
      }
      setLoading(false);
    },
    [supabase]
  );

  useEffect(() => {
    void fetchPage(page, appliedSearch);
  }, [fetchPage, page, appliedSearch, listVersion]);

  const patchProfile = async (id: string, patch: Record<string, unknown>) => {
    if (!supabase) return;
    setSavingId(id);
    const { error: err } = await supabase
      .from('profiles')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id);
    setSavingId(null);
    if (err) {
      setError(err.message);
      return;
    }
    setError(null);
    void fetchPage(page, appliedSearch);
  };

  const runSearch = () => {
    const t = searchInput.trim();
    setAppliedSearch(t);
    setPage(0);
    setListVersion((v) => v + 1);
  };

  const onToggleSuperAdmin = (row: ProfileAdminRow, next: boolean) => {
    if (next && !window.confirm(`¿Otorgar super admin a ${row.display_name ?? shortId(row.id)}?`)) return;
    if (!next && row.id === user?.id && !window.confirm('¿Quitarte el rol super admin a vos mismo?')) return;
    void patchProfile(row.id, { is_super_admin: next });
  };

  const onToggleAcademy = (row: ProfileAdminRow, next: boolean) => {
    void patchProfile(row.id, { is_academy: next });
  };

  const onToggleSponsor = (row: ProfileAdminRow, next: boolean) => {
    void patchProfile(row.id, {
      is_sponsor: next,
      sponsor_since: next ? new Date().toISOString() : null,
    });
  };

  const savePoints = (row: ProfileAdminRow) => {
    const raw = pointsDraft[row.id];
    const n = Math.max(0, Math.floor(Number(raw) || 0));
    void patchProfile(row.id, { competition_points: n });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="mb-2 text-2xl font-black text-textPrimary">Usuarios · Super admin</h1>
        <p className="m-0 text-sm font-[650] text-textSecondary">
          Listado de <code className="rounded bg-black/5 px-1">profiles</code>. Los cambios aplican políticas RLS (
          <code className="rounded bg-black/5 px-1">20260501_04_super_admin_scope.sql</code>).
        </p>
      </header>

      {error ? (
        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 text-sm font-bold text-red-900" role="alert">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="block min-w-[200px] flex-1">
          <span className="mb-1 block text-[10px] font-black uppercase text-textMuted">Buscar por nombre</span>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runSearch();
            }}
            placeholder="Mínimo 2 caracteres · Enter o botón"
            className="w-full rounded-xl border-[3px] border-border bg-white px-3 py-2 text-sm font-bold"
          />
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => runSearch()}
            disabled={loading}
            className="rounded-xl border-[3px] border-border bg-[#fde68a] px-4 py-2 text-xs font-black shadow-neo hover:bg-[#fcd34d] disabled:opacity-50"
          >
            Buscar / refrescar
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-textMuted">
        <span>
          Página {page + 1} · hasta {PAGE_SIZE} filas
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page === 0 || loading}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="rounded-lg border-2 border-border bg-white px-3 py-1 disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={rows.length < PAGE_SIZE || loading}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border-2 border-border bg-white px-3 py-1 disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border-[3px] border-border bg-white shadow-neo">
        {loading ? (
          <p className="p-8 text-center font-bold text-textMuted">Cargando…</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center font-bold text-textMuted">No hay resultados</p>
        ) : (
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-border bg-gray-50">
                <th className="p-3 font-black">Nombre</th>
                <th className="p-3 font-black">ID</th>
                <th className="p-3 font-black text-center">Academy</th>
                <th className="p-3 font-black text-center">Super</th>
                <th className="p-3 font-black text-center">Sponsor</th>
                <th className="p-3 font-black">Puntos</th>
                <th className="p-3 font-black" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border/60 hover:bg-gray-50/80">
                  <td className="max-w-[180px] p-3 font-[650] text-textPrimary">
                    {row.display_name ?? (
                      <span className="text-textMuted italic">sin nombre</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-textSecondary" title={row.id}>
                    {shortId(row.id)}…
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.is_academy}
                      disabled={savingId === row.id}
                      onChange={(e) => onToggleAcademy(row, e.target.checked)}
                      aria-label={`Academy ${row.display_name ?? row.id}`}
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.is_super_admin}
                      disabled={savingId === row.id}
                      onChange={(e) => onToggleSuperAdmin(row, e.target.checked)}
                      aria-label={`Super admin ${row.display_name ?? row.id}`}
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={row.is_sponsor}
                      disabled={savingId === row.id}
                      onChange={(e) => onToggleSponsor(row, e.target.checked)}
                      aria-label={`Sponsor ${row.display_name ?? row.id}`}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={pointsDraft[row.id] ?? '0'}
                        onChange={(e) =>
                          setPointsDraft((d) => ({
                            ...d,
                            [row.id]: e.target.value,
                          }))
                        }
                        className="w-20 rounded-lg border-2 border-border px-2 py-1 text-xs font-bold"
                      />
                      <button
                        type="button"
                        disabled={savingId === row.id}
                        onClick={() => savePoints(row)}
                        className="rounded-lg border-2 border-border bg-white px-2 py-1 text-[10px] font-black hover:bg-gray-100"
                      >
                        OK
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-right text-[10px] text-textMuted">
                    {savingId === row.id ? 'Guardando…' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function AdminUsersManager() {
  return (
    <SuperAdminGate featureHint="la gestión de usuarios">
      <AdminUsersContent />
    </SuperAdminGate>
  );
}
