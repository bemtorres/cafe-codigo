import { useEffect, useState } from 'react';
import { getSupabaseBrowser } from '../../lib/supabase/client';
import { tryUnlockWithSecret } from '../../lib/courseUnlock';

const WELCOME_SLIDES = [
  {
    step: 1,
    emoji: '🎓',
    title: 'Ingeniería informática a tu manera',
    body: 'Elegí el ritmo, los temas y la profundidad: acá aprendés con cursos claros, sin la presión de un aula tradicional.',
    accent: 'from-[#e8f4fc] via-white to-[#fef6ee]',
    dot: 'bg-[#118AB2]',
  },
  {
    step: 2,
    emoji: '📊',
    title: 'Desafíos y tu progreso',
    body: 'Afrontá desafíos prácticos, guardá lecciones para repasar y seguí quizzes y métricas en tu panel: todo organizado para que sepas en qué vas.',
    accent: 'from-[#fef6ee] via-white to-[#e8fcf5]',
    dot: 'bg-[#06D6A0]',
  },
  {
    step: 3,
    emoji: '☕',
    title: 'Compartí y sumá granos de café',
    body: 'Mostrá tu avance a otros, celebrá los logros en comunidad y sumá granos de café mientras estudiás — una forma divertida de mantener el hábito.',
    accent: 'from-[#fff8f0] via-white to-[#e8f4fc]',
    dot: 'bg-[#c4a574]',
  },
] as const;

function mapAuthError(err: Error): string {
  const raw = err.message;
  const m = raw.toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return 'Correo o contraseña incorrectos. Revisá mayúsculas y espacios.';
  }
  if (m.includes('email not confirmed')) {
    return 'Tenés que confirmar el correo: abrí el enlace que te enviamos.';
  }
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'Ese correo ya tiene cuenta. Probá iniciar sesión.';
  }
  if (m.includes('password') && m.includes('least')) {
    return 'La contraseña es demasiado corta (mínimo 6 caracteres).';
  }
  if (m.includes('network') || m.includes('fetch')) {
    return 'No hay conexión o el servidor no respondió. Probá de nuevo.';
  }
  return raw;
}

function passwordHint(length: number): { label: string; className: string } | null {
  if (length === 0) return null;
  if (length < 6) return { label: 'Seguí escribiendo (mín. 6 caracteres)', className: 'text-amber-700' };
  if (length < 10) return { label: 'Contraseña aceptable', className: 'text-emerald-700' };
  return { label: 'Contraseña sólida', className: 'text-emerald-800' };
}

export default function AuthForms() {
  const [clientReady, setClientReady] = useState(false);
  useEffect(() => setClientReady(true), []);

  const supabase = getSupabaseBrowser();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  /** Tras registro con sesión: primero bienvenida en slides, luego clave opcional. */
  const [registerPhase, setRegisterPhase] = useState<'credentials' | 'welcome_slides' | 'secret_unlock'>('credentials');
  const [slideIndex, setSlideIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unlockMsg, setUnlockMsg] = useState<string | null>(null);

  if (!clientReady) {
    return (
      <div className="overflow-hidden rounded-3xl border-[3px] border-border bg-white shadow-neo-lg" aria-hidden>
        <div className="h-14 animate-pulse bg-tertiary/40" />
        <div className="space-y-4 p-6 md:p-8">
          <div className="h-12 animate-pulse rounded-2xl bg-tertiary/50" />
          <div className="h-12 animate-pulse rounded-2xl bg-tertiary/50" />
          <div className="h-12 animate-pulse rounded-2xl bg-tertiary/50" />
        </div>
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="rounded-3xl border-[3px] border-border bg-amber-50 px-5 py-5 font-nunito font-bold text-textSecondary shadow-neo">
        Falta configurar Supabase: creá un archivo <code className="text-sm">.env</code> con{' '}
        <code className="text-sm">PUBLIC_SUPABASE_URL</code> y <code className="text-sm">PUBLIC_SUPABASE_ANON_KEY</code>.
      </div>
    );
  }

  const goToPanel = () => {
    window.location.href = '/panel/';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setResetSent(false);
    setLoading(true);
    try {
      if (mode === 'register') {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              display_name: displayName.trim() || undefined,
            },
          },
        });
        if (err) throw err;
        if (data.user && !data.session) {
          setMessage(
            'Cuenta creada. Revisá tu correo y tocá el enlace de confirmación. Después podés entrar y, si querés, usar la clave secreta desde el panel.',
          );
          setRegisterPhase('credentials');
        } else if (data.session) {
          setRegisterPhase('welcome_slides');
          setSlideIndex(0);
          setSecretKey('');
          setUnlockMsg(null);
        } else {
          window.location.href = '/panel/';
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (err) throw err;
        window.location.href = '/panel/';
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? mapAuthError(err) : 'Algo salió mal. Probá de nuevo.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const em = email.trim();
    if (!em) {
      setError('Escribí tu correo arriba y volvé a tocar «Enviar enlace».');
      return;
    }
    setError(null);
    setResetSent(false);
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(em, {
        redirectTo: `${window.location.origin}/cuenta/`,
      });
      if (err) throw err;
      setResetSent(true);
      setMessage('Si ese correo está registrado, te llegó un enlace para nueva contraseña. Revisá spam.');
    } catch (err: unknown) {
      setError(err instanceof Error ? mapAuthError(err) : 'No se pudo enviar el enlace.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipOnboarding = () => {
    goToPanel();
  };

  const handleUnlockSecret = (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockMsg(null);
    if (tryUnlockWithSecret(secretKey)) {
      setUnlockMsg('superpoderes');
      window.setTimeout(() => goToPanel(), 900);
    } else if (secretKey.trim()) {
      setUnlockMsg('error');
    } else {
      setUnlockMsg('empty');
    }
  };

  const handleNextSlide = () => {
    if (slideIndex < WELCOME_SLIDES.length - 1) {
      setSlideIndex((i) => i + 1);
    } else {
      setRegisterPhase('secret_unlock');
    }
  };

  const handlePrevSlide = () => {
    if (slideIndex > 0) setSlideIndex((i) => i - 1);
  };

  const pwdHint = mode === 'register' ? passwordHint(password.length) : null;

  if (mode === 'register' && registerPhase === 'welcome_slides') {
    const slide = WELCOME_SLIDES[slideIndex];
    const isLast = slideIndex === WELCOME_SLIDES.length - 1;
    return (
      <div className="mx-auto w-full max-w-lg">
        <div
          className={`flex min-h-[420px] flex-col overflow-hidden rounded-3xl border-[3px] border-border bg-gradient-to-br p-6 shadow-neo-lg md:min-h-[440px] md:p-8 ${slide.accent}`}
          role="region"
          aria-roledescription="carrusel"
          aria-label={`Paso ${slide.step} de ${WELCOME_SLIDES.length}`}
        >
          <p className="mb-4 text-center font-nunito text-xs font-extrabold uppercase tracking-[0.2em] text-textMuted">
            Bienvenida · paso {slide.step}/{WELCOME_SLIDES.length}
          </p>
          <div className="flex flex-1 flex-col items-center gap-4 text-center">
            <span className="text-6xl md:text-7xl" aria-hidden>
              {slide.emoji}
            </span>
            <h2 className="m-0 max-w-sm font-nunito text-xl font-black leading-tight text-textPrimary md:text-2xl">
              {slide.title}
            </h2>
            <p className="m-0 max-w-md font-nunito text-base font-[650] leading-relaxed text-textSecondary">{slide.body}</p>
          </div>

          <div className="mt-8 flex justify-center gap-2 py-2" aria-hidden>
            {WELCOME_SLIDES.map((s, i) => (
              <span
                key={s.step}
                className={`h-2.5 w-2.5 rounded-full border-2 border-border transition-all ${
                  i === slideIndex ? `${s.dot} scale-125` : 'bg-white/80'
                }`}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handlePrevSlide}
              disabled={slideIndex === 0}
              className="order-2 rounded-2xl border-[3px] border-border bg-white/90 px-4 py-3 font-nunito font-extrabold text-textSecondary shadow-neo transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:order-1 sm:max-w-[140px]"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="order-1 rounded-2xl border-[3px] border-border bg-[#118AB2] px-6 py-3 font-nunito font-black text-white shadow-neo transition-all hover:-translate-y-0.5 sm:order-2 sm:flex-1"
            >
              {isLast ? 'Siguiente: clave secreta' : 'Siguiente'}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setRegisterPhase('secret_unlock')}
            className="mt-3 w-full font-nunito text-sm font-extrabold text-textMuted underline decoration-2 underline-offset-2 hover:text-textSecondary"
          >
            Saltar introducción
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'register' && registerPhase === 'secret_unlock') {
    return (
      <div className="mx-auto w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#fef6ee] via-white to-[#e8f8fc] p-6 shadow-neo-lg md:p-8">
          <div className="mb-4 text-center text-5xl" aria-hidden>
            ⚡
          </div>
          <h2 className="m-0 text-center font-nunito text-2xl font-black text-textPrimary md:text-3xl">¡Cuenta lista!</h2>
          <p className="mt-3 text-center font-nunito text-sm font-[650] leading-relaxed text-textSecondary">
            Un último paso opcional: si conocés la <strong>clave secreta</strong>, desbloqueás los{' '}
            <strong>superpoderes</strong> — acceso sin candado a los cursos exclusivos (por ejemplo Modelo C4 y PL/SQL) en
            este dispositivo.
          </p>

          <form onSubmit={handleUnlockSecret} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="secret-key" className="mb-1.5 block font-nunito text-sm font-extrabold text-textSecondary">
                Clave secreta
              </label>
              <input
                id="secret-key"
                type="password"
                autoComplete="off"
                value={secretKey}
                onChange={(e) => {
                  setSecretKey(e.target.value);
                  setUnlockMsg(null);
                }}
                className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3.5 font-nunito font-bold shadow-neo transition-shadow focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
                placeholder="¿La tenés? Escribila aquí"
              />
            </div>

            {unlockMsg === 'error' && (
              <p className="m-0 rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2.5 font-nunito text-sm font-bold text-red-700">
                Esa no es la clave. Podés intentar de nuevo o saltar el paso.
              </p>
            )}
            {unlockMsg === 'empty' && (
              <p className="m-0 rounded-xl border-2 border-amber-200 bg-amber-50 px-3 py-2.5 font-nunito text-sm font-bold text-amber-900">
                Escribí una clave o usá &quot;Entrar al panel&quot; para continuar sin desbloquear.
              </p>
            )}
            {unlockMsg === 'superpoderes' && (
              <p className="m-0 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2.5 font-nunito text-sm font-bold text-emerald-800">
                ¡Superpoderes activados! Llevándote al panel…
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl border-[3px] border-border bg-[#118AB2] py-3.5 font-nunito text-lg font-black text-white shadow-neo transition-all hover:-translate-y-0.5"
            >
              Desbloquear superpoderes
            </button>
            <button
              type="button"
              onClick={handleSkipOnboarding}
              className="w-full rounded-2xl border-[3px] border-border bg-white py-3 font-nunito font-extrabold text-textPrimary shadow-neo transition-colors hover:bg-tertiary"
            >
              Entrar al panel sin clave
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border-[3px] border-border bg-white shadow-neo-lg">
        <div className="grid grid-cols-2 gap-0 border-b-[3px] border-border bg-tertiary/35 p-1.5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
              setMessage(null);
              setResetSent(false);
              setRegisterPhase('credentials');
              setSlideIndex(0);
            }}
            className={`relative rounded-2xl py-3 font-nunito text-sm font-black transition-all md:text-base ${
              mode === 'login'
                ? 'bg-white text-textPrimary shadow-neo'
                : 'text-textMuted hover:text-textSecondary'
            }`}
          >
            <span className="mr-1.5" aria-hidden>
              🔑
            </span>
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
              setMessage(null);
              setResetSent(false);
              setRegisterPhase('credentials');
              setSlideIndex(0);
            }}
            className={`relative rounded-2xl py-3 font-nunito text-sm font-black transition-all md:text-base ${
              mode === 'register'
                ? 'bg-white text-textPrimary shadow-neo'
                : 'text-textMuted hover:text-textSecondary'
            }`}
          >
            <span className="mr-1.5" aria-hidden>
              ✨
            </span>
            Crear cuenta
          </button>
        </div>

        <div className="p-6 md:p-8">
          <p className="mb-6 font-nunito text-sm font-[650] leading-relaxed text-textSecondary">
            {mode === 'login'
              ? 'Ingresá con el correo y la contraseña que usaste al registrarte.'
              : 'Completá los datos. Podés elegir un nombre para el panel y una contraseña segura.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {mode === 'register' && (
              <div>
                <label htmlFor="displayName" className="mb-1.5 block font-nunito text-sm font-extrabold text-textSecondary">
                  Nombre en el panel
                </label>
                <input
                  id="displayName"
                  type="text"
                  autoComplete="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3.5 font-nunito font-bold shadow-neo transition-shadow focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
                  placeholder="Ej. Ana o tu nick"
                  maxLength={80}
                />
                <p id="hint-name" className="mt-1.5 font-nunito text-xs font-semibold text-textMuted">
                  Opcional. Así te saludamos en el dashboard.
                </p>
              </div>
            )}
            <div>
              <label htmlFor="email" className="mb-1.5 block font-nunito text-sm font-extrabold text-textSecondary">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3.5 font-nunito font-bold shadow-neo transition-shadow focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label htmlFor="password" className="font-nunito text-sm font-extrabold text-textSecondary">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 rounded-lg border-2 border-transparent px-2 py-0.5 font-nunito text-xs font-extrabold text-info hover:bg-info/10"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border-[3px] border-border bg-white px-4 py-3.5 font-nunito font-bold shadow-neo transition-shadow focus:border-info focus:outline-none focus:ring-2 focus:ring-info/30"
                placeholder={mode === 'login' ? 'Tu contraseña' : 'Mínimo 6 caracteres'}
                aria-describedby={mode === 'register' ? 'hint-pwd' : undefined}
              />
              {pwdHint && (
                <p id="hint-pwd" className={`mt-1.5 font-nunito text-xs font-bold ${pwdHint.className}`}>
                  {pwdHint.label}
                </p>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => void handleForgotPassword()}
                  className="font-nunito text-left text-sm font-extrabold text-info underline decoration-2 underline-offset-2 hover:text-textPrimary disabled:opacity-50"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                {resetSent && (
                  <span className="font-nunito text-xs font-bold text-emerald-700">Revisá tu correo</span>
                )}
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 font-nunito text-sm font-bold text-red-800"
              >
                {error}
              </div>
            )}
            {message && !error && (
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3 font-nunito text-sm font-bold text-emerald-900">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border-[3px] border-border bg-success py-4 font-nunito text-lg font-black text-border shadow-neo transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span
                    className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-border border-t-transparent"
                    aria-hidden
                  />
                  <span>{mode === 'login' ? 'Entrando…' : 'Creando cuenta…'}</span>
                </>
              ) : mode === 'login' ? (
                'Entrar al panel'
              ) : (
                'Crear mi cuenta'
              )}
            </button>
          </form>

          <p className="mt-6 border-t-2 border-border/60 pt-6 text-center font-nunito text-sm font-[650] text-textMuted">
            <a href="/panel/" className="font-extrabold text-info no-underline hover:underline">
              Ya tengo sesión → ir al panel
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
