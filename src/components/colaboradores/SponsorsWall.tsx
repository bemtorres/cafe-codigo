import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabase/client';
import { fetchSponsorWall, type SponsorWallRow } from '../../lib/supabase/sponsors';

function displayLabel(row: SponsorWallRow): string {
  const n = row.display_name?.trim();
  if (n) return n;
  return 'Colaborador';
}

export default function SponsorsWall() {
  const [rows, setRows] = useState<SponsorWallRow[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) {
      setLoading(false);
      setErr('Sin conexión a la base.');
      return;
    }
    void fetchSponsorWall(supabase).then(({ rows: r, error }) => {
      setLoading(false);
      if (error) setErr(error);
      setRows(r);
    });
  }, []);

  if (loading) {
    return (
      <p className="m-0 font-nunito font-[650] text-textSecondary" role="status">
        Cargando colaboradores…
      </p>
    );
  }

  if (err) {
    return (
      <p className="m-0 rounded-2xl border-2 border-dashed border-border bg-white/80 p-4 font-nunito text-sm font-bold text-textSecondary">
        No se pudo cargar el muro: {err}
      </p>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="m-0 font-nunito font-[650] text-textSecondary">
        Todavía no hay nombres en el muro. Cuando haya colaboradores confirmados, aparecerán acá con su
        insignia ☕
      </p>
    );
  }

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <li
          key={row.id}
          className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-gradient-to-br from-[#fff7ed] to-white p-4 shadow-[4px_4px_0px_#1E1210]"
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-[#c2410c]/30 bg-[#ffedd5] text-2xl"
            aria-hidden
          >
            ☕
          </span>
          <div className="min-w-0">
            <p className="m-0 font-nunito text-lg font-black text-textPrimary">{displayLabel(row)}</p>
            <p className="m-0 mt-0.5 font-nunito text-xs font-bold uppercase tracking-wide text-textMuted">
              Sponsor · cafeycodigo
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
