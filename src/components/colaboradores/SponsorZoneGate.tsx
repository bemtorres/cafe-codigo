import { useEffect, useState } from 'react';
import { getSupabaseBrowser, type ProfileRow } from '../../lib/supabase/client';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

const KO_FI = 'https://ko-fi.com/cafeycodigo';

export default function SponsorZoneGate() {
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !user?.id) {
      setProfile(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    void supabase
      .from('profiles')
      .select('id, is_sponsor, display_name')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setLoading(false);
        if (error || !data) {
          setProfile(null);
          return;
        }
        setProfile(data as ProfileRow);
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, user?.id]);

  if (!supabase) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-[6px_6px_0px_#1E1210]">
        <p className="m-0 font-nunito font-bold text-textSecondary">
          Configurá Supabase en <code>.env</code> para acceder a esta zona.
        </p>
      </div>
    );
  }

  if (authLoading || loading) {
    return (
      <div className="rounded-3xl border-[3px] border-dashed border-border bg-white/80 p-10 text-center shadow-neo">
        <p className="m-0 font-nunito font-bold text-textMuted">Cargando…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#fff1f2] to-white p-8 shadow-[6px_6px_0px_#1E1210]">
        <h2 className="mt-0 font-nunito text-2xl font-black text-textPrimary">Zona para colaboradores</h2>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Iniciá sesión con la misma cuenta con la que colaboraste por Ko-fi. Si tu perfil está marcado
          como sponsor en el proyecto, se desbloquea el contenido exclusivo.
        </p>
        <a
          href="/cuenta/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl border-[3px] border-border bg-[#06D6A0] py-3 px-8 font-nunito font-black text-[#1E1210] no-underline shadow-[4px_4px_0px_#1E1210] transition-transform hover:-translate-y-0.5"
        >
          Ir a iniciar sesión
        </a>
      </div>
    );
  }

  if (!profile?.is_sponsor) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-[6px_6px_0px_#1E1210]">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-border bg-tertiary px-4 py-2 font-nunito text-sm font-black text-textPrimary">
          <span aria-hidden>🔒</span> Aún sin acceso sponsor
        </div>
        <h2 className="mt-0 font-nunito text-2xl font-black text-textPrimary">Gracias por estar acá</h2>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Esta página es un <strong className="text-textPrimary">extra para quienes colaboran</strong> con el
          proyecto vía Ko-fi. Cuando el equipo confirme tu aporte, tu cuenta recibe la insignia sponsor y el
          acceso se activa automáticamente (no hace falta contraseña aparte).
        </p>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          ¿Ya donaste y no ves el contenido? Escribí por el canal de contacto del proyecto o por Ko-fi con el
          mail de tu cuenta.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={KO_FI}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-border bg-[#FF5E5B] px-6 py-3 font-nunito font-black text-white no-underline shadow-[4px_4px_0px_#1E1210] transition-transform hover:-translate-y-0.5"
          >
            Colaborar en Ko-fi
          </a>
          <a
            href="/colaboradores/"
            className="inline-flex items-center justify-center rounded-2xl border-[3px] border-border bg-white px-6 py-3 font-nunito font-black text-textPrimary no-underline shadow-[4px_4px_0px_#1E1210] transition-transform hover:-translate-y-0.5"
          >
            Cómo funciona
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border-[3px] border-[#c2410c]/40 bg-gradient-to-br from-[#fff7ed] via-white to-[#ecfdf5] p-8 shadow-[6px_6px_0px_#1E1210]">
        <p className="m-0 inline-flex items-center gap-2 rounded-full border-2 border-[#ea580c]/40 bg-[#ffedd5] px-4 py-2 font-nunito text-sm font-black text-[#9a3412]">
          <span className="text-lg" aria-hidden>
            ☕
          </span>
          Sponsor activo · gracias de corazón
        </p>
        <h2 className="mt-6 mb-2 font-nunito text-3xl font-black text-textPrimary">Zona exclusiva</h2>
        <p className="m-0 max-w-2xl font-nunito text-[1.05rem] font-[650] leading-relaxed text-textSecondary">
          Este espacio es solo para colaboradores. Acá iremos sumando previews, recursos extra y
          sorpresas para quienes ayudan a mantener cafeycodigo vivo.
        </p>
      </div>

      <section className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-neo" aria-labelledby="exclusive-block-title">
        <h3 id="exclusive-block-title" className="mt-0 font-nunito text-xl font-black text-textPrimary">
          Contenido actual
        </h3>
        <ul className="m-0 list-none space-y-3 p-0 font-nunito font-[650] text-textSecondary">
          <li className="flex gap-2">
            <span className="font-black text-success" aria-hidden>
              ✓
            </span>
            Insignia sponsor en tu panel y reconocimiento en el muro público de colaboradores.
          </li>
          <li className="flex gap-2">
            <span className="font-black text-success" aria-hidden>
              ✓
            </span>
            Acceso anticipado a experimentos y mensajes de roadmap reservados para sponsors.
          </li>
          <li className="flex gap-2 text-textMuted">
            <span aria-hidden>◇</span>
            Próximos: assets descargables, fondos de pantalla y más — se anuncian por acá.
          </li>
        </ul>
      </section>
    </div>
  );
}
