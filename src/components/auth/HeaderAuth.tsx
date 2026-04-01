import { useEffect, useRef, useState } from 'react';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

export default function HeaderAuth() {
  const { supabase, loading, user } = useSupabaseAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  /** Mismo marcador en SSR (sin window → supabase null) y mientras hidrata sesión, para evitar hydration mismatch. */
  const authPlaceholder = (
    <span
      className="inline-flex min-w-[5rem] items-center justify-center rounded-full border border-black/10 bg-white/50 px-3 py-1.5 font-nunito text-xs font-extrabold text-textMuted"
      aria-hidden
    >
      ···
    </span>
  );

  if (!supabase || loading) {
    return authPlaceholder;
  }

  if (!user) {
    return (
      <a
        href="/cuenta/"
        className="inline-flex items-center gap-1.5 bg-white/90 border border-black/15 rounded-full px-3 py-1.5 font-nunito font-extrabold text-textPrimary text-sm shadow-[0_10px_24px_rgba(30,18,16,0.1)] hover:bg-white hover:-translate-y-0.5 no-underline"
      >
        Cuenta
      </a>
    );
  }

  const label = user.user_metadata?.display_name?.trim?.() || user.email?.split('@')[0] || 'Panel';

  const closeMenu = () => setMenuOpen(false);

  const handleSignOut = async () => {
    if (!supabase) return;
    closeMenu();
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="relative" ref={menuWrapRef}>
        <button
          type="button"
          id="header-user-menu-button"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          aria-controls="header-user-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex cursor-pointer items-center gap-1.5 bg-tertiary border-2 border-info rounded-full px-3 py-1.5 font-nunito font-extrabold text-textPrimary text-sm max-w-[120px] sm:max-w-[160px] truncate hover:-translate-y-0.5 transition-transform"
          title="Menú de cuenta"
        >
          👤 {label.slice(0, 12)}
        </button>
        {menuOpen && (
          <div
            id="header-user-menu"
            role="menu"
            aria-labelledby="header-user-menu-button"
            className="absolute right-0 top-[calc(100%+8px)] z-1200 min-w-60 rounded-2xl border-4 border-border bg-white py-2 shadow-neo-lg"
          >
            <a
              href="/panel/#perfil"
              role="menuitem"
              className="block px-4 py-2.5 font-nunito font-extrabold text-textPrimary no-underline hover:bg-tertiary/60 focus-visible:bg-tertiary/60 focus-visible:outline-none"
              onClick={closeMenu}
            >
              Perfil
            </a>
            <a
              href="/academia/"
              role="menuitem"
              className="block px-4 py-2.5 font-nunito font-extrabold text-textPrimary no-underline hover:bg-tertiary/60 focus-visible:bg-tertiary/60 focus-visible:outline-none"
              onClick={closeMenu}
            >
              Academia
            </a>
            <a
              href="/panel/#ingresar-codigo"
              role="menuitem"
              className="block px-4 py-2.5 font-nunito font-extrabold text-textPrimary no-underline hover:bg-tertiary/60 focus-visible:bg-tertiary/60 focus-visible:outline-none"
              onClick={closeMenu}
            >
              Ingresar código
            </a>
            <button
              type="button"
              role="menuitem"
              className="w-full px-4 py-2.5 text-left font-nunito font-extrabold text-textPrimary hover:bg-tertiary/60 focus-visible:bg-tertiary/60 focus-visible:outline-none"
              onClick={() => void handleSignOut()}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
      {/* CoffeeCoin en header: omitido por ahora */}
    </div>
  );
}
