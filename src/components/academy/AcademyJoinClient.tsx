import { useCallback, useEffect, useState } from 'react';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';
import {
  isValidJoinCode,
  joinSectionByCode,
  normalizeJoinCode,
} from '../../lib/supabase/academy';
import JoinCodeOtpInput from './JoinCodeOtpInput';

const STORAGE_KEY = 'academy_join_code';

function readCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const q = new URLSearchParams(window.location.search).get('code');
  const t = q?.trim() ?? '';
  if (isValidJoinCode(t)) return normalizeJoinCode(t);
  return null;
}

export default function AcademyJoinClient() {
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'joining' | 'done' | 'err'>('idle');
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = readCodeFromUrl();
    if (fromUrl) {
      setInput(fromUrl);
      try {
        sessionStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      const s = sessionStorage.getItem(STORAGE_KEY)?.trim();
      if (s && isValidJoinCode(s)) setInput(normalizeJoinCode(s));
    } catch {
      /* ignore */
    }
  }, []);

  const tryJoin = useCallback(
    async (code: string) => {
      if (!supabase) return;
      const c = normalizeJoinCode(code);
      if (!isValidJoinCode(c)) {
        setStatus('err');
        setMsg(
          'Ingresá un código de exactamente 8 caracteres: letras (A–Z, a–z) y números (0–9). Las mayúsculas y minúsculas son distintas.',
        );
        return;
      }
      setStatus('joining');
      setMsg(null);
      try {
        await joinSectionByCode(supabase, c);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setStatus('done');
        window.location.replace('/academia/');
      } catch (e) {
        setStatus('err');
        setMsg((e as Error).message || 'No se pudo unir a la sección.');
      }
    },
    [supabase],
  );

  useEffect(() => {
    if (authLoading || !supabase || !user) return;
    const fromUrl = readCodeFromUrl();
    if (!fromUrl) return;
    void tryJoin(fromUrl);
  }, [authLoading, supabase, user, tryJoin]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void tryJoin(input);
  };

  const onGuestContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const c = normalizeJoinCode(input);
    if (!isValidJoinCode(c)) {
      setMsg(
        'El código debe tener 8 caracteres: letras y números (mayúsculas y minúsculas cuentan).',
      );
      return;
    }
    setMsg(null);
    try {
      sessionStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
    window.location.href = '/cuenta/';
  };

  if (authLoading) {
    return (
      <div className="rounded-3xl border-4 border-border bg-white p-8 text-center shadow-neo-lg">
        <p className="m-0 font-nunito font-black text-textPrimary">Cargando…</p>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="rounded-3xl border-4 border-border bg-white p-8 shadow-neo-lg">
        <p className="m-0 font-nunito font-[650] text-textSecondary">Configurá Supabase para usar Academia.</p>
      </div>
    );
  }

  if (status === 'joining') {
    return (
      <div className="rounded-3xl border-4 border-border bg-white p-8 text-center shadow-neo-lg">
        <p className="m-0 font-nunito font-black text-textPrimary">Uniendo a la sección…</p>
      </div>
    );
  }

  if (status === 'err') {
    return (
      <div className="rounded-3xl border-4 border-border bg-white p-8 shadow-neo-lg">
        <p className="m-0 font-nunito font-black text-accent">No se pudo unir</p>
        <p className="mt-2 font-nunito font-[650] text-textSecondary">{msg}</p>
        <form className="mt-6" onSubmit={onSubmit}>
          <label className="block font-nunito text-sm font-extrabold text-textPrimary" htmlFor="join-code">
            Código secreto (8 caracteres)
          </label>
          <JoinCodeOtpInput id="join-code" value={input} onChange={setInput} aria-describedby="join-hint" />
          <p id="join-hint" className="mt-2 max-w-md font-nunito text-xs font-[650] text-textMuted">
            Letras y números; mayúsculas y minúsculas importan.
          </p>
          <button
            type="submit"
            className="mt-4 inline-block rounded-full border-2 border-border bg-[#06D6A0] px-8 py-3 font-nunito font-black text-[#1E1210] shadow-neo"
          >
            Reintentar
          </button>
        </form>
        <a
          href="/academia/"
          className="mt-4 inline-block rounded-full border-2 border-border bg-tertiary px-6 py-2 font-nunito font-black text-textPrimary no-underline shadow-neo"
        >
          Volver a Academia
        </a>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border-4 border-border bg-white p-8 shadow-neo-lg">
        <p className="m-0 font-nunito text-lg font-black text-textPrimary">Unirse con el código del docente</p>
        <p className="mt-2 font-nunito font-[650] text-textSecondary">
          Ingresá el código de 8 caracteres que te compartió tu docente. Después iniciá sesión para confirmar la
          inscripción.
        </p>
        {msg ? (
          <p className="mt-3 font-nunito text-sm font-bold text-accent" role="alert">
            {msg}
          </p>
        ) : null}
        <form className="mt-6" onSubmit={onGuestContinue}>
          <label className="block font-nunito text-sm font-extrabold text-textPrimary" htmlFor="join-code-guest">
            Código secreto
          </label>
          <JoinCodeOtpInput id="join-code-guest" value={input} onChange={setInput} />
          <button
            type="submit"
            disabled={!isValidJoinCode(input)}
            className="mt-4 mr-3 inline-block rounded-full border-2 border-border bg-[#2b1d1b] px-6 py-3 font-nunito font-black text-white shadow-neo disabled:cursor-not-allowed disabled:opacity-50"
          >
            Guardar código e ir a iniciar sesión
          </button>
        </form>
        <p className="mt-6 font-nunito text-sm font-[650] text-textSecondary">
          Tras entrar con tu cuenta, volvé a <strong className="text-textPrimary">Academia → Unirse</strong> y el
          código seguirá guardado en esta pestaña. También podés usar un enlace con{' '}
          <code className="rounded bg-tertiary/80 px-1 font-mono text-xs">?code=…</code>.
        </p>
        <a
          href="/cuenta/"
          className="mt-4 inline-block rounded-full border-2 border-border bg-tertiary px-6 py-3 font-nunito font-black text-textPrimary no-underline shadow-neo"
        >
          Iniciar sesión o crear cuenta
        </a>
      </div>
    );
  }

  return (
    <form className="rounded-3xl border-4 border-border bg-white p-8 shadow-neo-lg" onSubmit={onSubmit}>
      <p className="m-0 font-nunito text-lg font-black text-textPrimary">Código de la sección</p>
      <p className="mt-2 font-nunito font-[650] text-textSecondary">
        Pegá o escribí el código de <strong className="text-textPrimary">8 caracteres</strong> (letras y números). Las
        mayúsculas y minúsculas son distintas.
      </p>
      <label className="mt-6 block font-nunito text-sm font-extrabold text-textPrimary" htmlFor="join-code-user">
        Código secreto
      </label>
      <JoinCodeOtpInput id="join-code-user" value={input} onChange={setInput} />
      <button
        type="submit"
        disabled={!isValidJoinCode(input)}
        className="mt-6 inline-block rounded-full border-2 border-border bg-[#06D6A0] px-8 py-3 font-nunito font-black text-[#1E1210] shadow-neo disabled:cursor-not-allowed disabled:opacity-50"
      >
        Unirse a la sección
      </button>
    </form>
  );
}
