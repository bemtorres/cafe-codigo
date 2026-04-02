import { useEffect, useState } from 'react';

export const CAFE_STORAGE_KEY = 'cafe_del_dia_current';

const COFFEES_MAP: Record<string, { name: string; emoji: string }> = {
  espresso:  { name: 'Espresso',  emoji: '☕' },
  americano: { name: 'Americano', emoji: '🫖' },
  cappuccino:{ name: 'Cappuccino',emoji: '🍵' },
  latte:     { name: 'Latte',     emoji: '🥛' },
  cortado:   { name: 'Cortado',   emoji: '🫗' },
  macchiato: { name: 'Macchiato', emoji: '☕' },
};

const CAFE_EXPIRE_MS = 30 * 60 * 1000;

export type SavedCafe = {
  coffeeId: string;
  milkId: string;
  tempMode: 'hot' | 'iced';
  preparedAt?: number;
};

function readSaved(): SavedCafe | null {
  try {
    const raw = localStorage.getItem(CAFE_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedCafe;
    // si expiró, limpiar silenciosamente
    if (data.preparedAt && Date.now() - data.preparedAt > CAFE_EXPIRE_MS) {
      localStorage.removeItem(CAFE_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cafe-del-dia-update'));
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export default function CafeDelDiaNavBtn() {
  const [saved, setSaved] = useState<SavedCafe | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(readSaved());

    const sync = () => setSaved(readSaved());
    window.addEventListener('cafe-del-dia-update', sync);
    window.addEventListener('storage', sync);

    // re-chequear cada minuto para reflejar expiración en el navbar
    const tick = setInterval(sync, 60_000);
    return () => {
      window.removeEventListener('cafe-del-dia-update', sync);
      window.removeEventListener('storage', sync);
      clearInterval(tick);
    };
  }, []);

  const coffee = saved ? COFFEES_MAP[saved.coffeeId] : null;
  const isIced = saved?.tempMode === 'iced';

  return (
    <a
      href="/cafe-del-dia/"
      className="relative flex items-center gap-1.5 bg-[#2b1d1b] border border-black/20 rounded-full px-4 py-2 font-nunito font-extrabold text-white shadow-[0_14px_34px_rgba(30,18,16,0.18)] hover:-translate-y-0.5 hover:bg-[#3d2820] transition-all no-underline"
    >
      {mounted && coffee ? (
        <>
          <span aria-hidden>{isIced ? '🧊' : coffee.emoji}</span>
          <span>{coffee.name}{isIced ? ' helado' : ''}</span>
          {/* punto verde: taza lista */}
          <span
            className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-success"
            aria-label="Taza lista"
          />
        </>
      ) : (
        <>
          <span aria-hidden>☕</span>
          <span>Café del día</span>
        </>
      )}
    </a>
  );
}
