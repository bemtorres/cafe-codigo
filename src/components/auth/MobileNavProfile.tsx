import { mockCoffeeCoinBalance } from '../../lib/coffeeCoin';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

/** Enlaza a /panel o /cuenta según sesión (misma fuente que el resto: INITIAL_SESSION). */
export default function MobileNavProfile() {
  const { supabase, loading, user } = useSupabaseAuth();
  const coffeeCoins = mockCoffeeCoinBalance();

  if (!supabase) {
    return (
      <span className="mobile-nav-item flex flex-col items-center justify-center gap-0.5 flex-1 text-textSecondary/50">
        <span className="text-[22px] leading-none">···</span>
        <span className="text-[10px] font-nunito font-extrabold tracking-wide">…</span>
      </span>
    );
  }

  if (loading) {
    return (
      <span className="mobile-nav-item flex flex-col items-center justify-center gap-0.5 flex-1 text-textSecondary/50">
        <span className="text-[22px] leading-none">···</span>
        <span className="text-[10px] font-nunito font-extrabold tracking-wide">…</span>
      </span>
    );
  }

  const href = user ? '/panel/' : '/cuenta/';
  const short =
    user?.user_metadata?.display_name?.trim?.()?.split(' ')?.[0]?.slice(0, 8) ||
    user?.email?.split('@')[0]?.slice(0, 8) ||
    'Cuenta';

  return (
    <a
      href={href}
      className="mobile-nav-item flex flex-col items-center justify-center gap-0.5 flex-1 no-underline text-textSecondary hover:text-warning transition-colors"
      aria-label={user ? 'Tu panel' : 'Iniciar sesión'}
    >
      <span className="text-[22px] leading-none">{user ? '⚙️' : '👤'}</span>
      <span className="text-[10px] font-nunito font-extrabold tracking-wide max-w-[4.5rem] truncate">{short}</span>
      {user && (
        <span
          className="text-[9px] font-nunito font-black tabular-nums leading-none text-[#b45309]"
          title="CoffeeCoin (vista previa)"
        >
          ☕ {coffeeCoins} CC
        </span>
      )}
    </a>
  );
}
