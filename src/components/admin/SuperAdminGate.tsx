import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { ProfileRow } from '../../lib/supabase/client';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

type Props = {
  children: ReactNode;
  /** Texto corto para el mensaje de acceso denegado (ej. "este panel"). */
  featureHint?: string;
};

/**
 * Envuelve contenido exclusivo de super admin. Comprueba sesión y `profiles.is_super_admin`.
 */
export default function SuperAdminGate({ children, featureHint = 'este panel' }: Props) {
  /** Evita mismatch SSR/hidratación: en el servidor no hay cliente Supabase; en el cliente sí. */
  const [mounted, setMounted] = useState(false);
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!supabase || !user?.id) {
      setProfile(null);
      setProfileError(null);
      setProfileLoading(false);
      return;
    }
    let cancelled = false;
    setProfileLoading(true);
    setProfileError(null);
    void supabase
      .from('profiles')
      .select('id, display_name, is_super_admin')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setProfileLoading(false);
        if (error) {
          setProfileError(error.message);
          setProfile(null);
          return;
        }
        setProfileError(null);
        if (!data) {
          setProfile(null);
          return;
        }
        setProfile(data as ProfileRow);
      });
    return () => {
      cancelled = true;
    };
  }, [supabase, user?.id]);

  if (!mounted) {
    return (
      <div className="rounded-3xl border-[3px] border-dashed border-border bg-white/80 p-10 text-center shadow-neo">
        <p className="m-0 font-nunito font-bold text-textMuted">Cargando…</p>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-neo">
        <p className="m-0 font-nunito font-bold text-textSecondary">
          Configurá Supabase en <code className="rounded bg-gray-100 px-1">.env</code> para usar el panel.
        </p>
      </div>
    );
  }

  if (authLoading || profileLoading) {
    return (
      <div className="rounded-3xl border-[3px] border-dashed border-border bg-white/80 p-10 text-center shadow-neo">
        <p className="m-0 font-nunito font-bold text-textMuted">Cargando…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#fff1f2] to-white p-8 shadow-neo-lg">
        <h2 className="mt-0 font-nunito text-2xl font-black text-textPrimary">Acceso restringido</h2>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Iniciá sesión con una cuenta de <strong className="text-textPrimary">super administrador</strong> para acceder a{' '}
          {featureHint}.
        </p>
        <a
          href="/cuenta/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl border-[3px] border-border bg-success py-3 px-8 font-nunito font-black text-border no-underline shadow-neo transition-transform hover:-translate-y-0.5"
        >
          Ir a iniciar sesión
        </a>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-neo-lg">
        <h2 className="mt-0 font-nunito text-2xl font-black text-textPrimary">No se pudo cargar tu perfil</h2>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Error de Supabase: <code className="break-all rounded bg-red-50 px-1 text-red-900">{profileError}</code>
        </p>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Si ves <strong>500</strong> o <strong>recursion</strong> en políticas RLS, ejecutá en el SQL Editor el archivo{' '}
          <code className="rounded bg-gray-100 px-1">supabase/sql-incremental/20260501_05_auth_is_super_admin_fn.sql</code>{' '}
          (función <code className="rounded bg-gray-100 px-1">auth_is_super_admin()</code> sin recursión).
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-neo-lg">
        <h2 className="mt-0 font-nunito text-2xl font-black text-textPrimary">Sin fila en profiles</h2>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Tu usuario está autenticado pero no hay registro en <code className="rounded bg-gray-100 px-1">public.profiles</code>.
          Suele crearse al registrarse; revisá triggers o insertá el perfil manualmente.
        </p>
      </div>
    );
  }

  if (!profile.is_super_admin) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-white p-8 shadow-neo-lg">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-border bg-tertiary px-4 py-2 font-nunito text-sm font-black text-textPrimary">
          <span aria-hidden>🔒</span> Sin permiso de super admin
        </div>
        <h2 className="mt-0 font-nunito text-2xl font-black text-textPrimary">No podés acceder a {featureHint}</h2>
        <p className="font-nunito font-[650] leading-relaxed text-textSecondary">
          Tu perfil existe pero <code className="rounded bg-gray-100 px-1">is_super_admin</code> no es{' '}
          <code className="rounded bg-gray-100 px-1">true</code>. En SQL Editor (con el UUID de{' '}
          <code className="rounded bg-gray-100 px-1">auth.users</code>):
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border-2 border-border bg-gray-50 p-3 text-xs font-mono">
          {`update public.profiles\n  set is_super_admin = true\n  where id = '${user.id}';`}
        </pre>
      </div>
    );
  }

  return <>{children}</>;
}
