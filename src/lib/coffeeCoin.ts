/**
 * CoffeeCoin — propuesta visual (sin base de datos).
 * Desbloqueo tienda: código `store2026` en localStorage, o PUBLIC_COFFEECOIN_STORE_ENABLED=true.
 */

export const COFFEECOIN_STORE_STORAGE_KEY = 'aprende_coffeecoin_store_unlocked';

/** Código que el usuario puede ingresar para activar el modo tienda en este navegador. */
export const COFFEECOIN_STORE_SECRET_CODE = 'store2026';

export type CoffeeCoinTransaction = {
  id: string;
  hash_transaccion: string;
  credit: number;
  concepto: string;
  /** Texto corto para la tabla */
  fecha: string;
};

export type CoffeeCoinStoreItem = {
  id: string;
  name: string;
  description: string;
  priceCoffeecoin: number;
};

/** Transacciones de ejemplo (solo UI). Modelo futuro: id, hash_transaccion, credit. */
export const MOCK_COFFEECOIN_TRANSACTIONS: CoffeeCoinTransaction[] = [
  {
    id: 'cc-tx-001',
    hash_transaccion: '0x7a3f9e2b1c8d4f6a0e5b7c9d2f4a8e1b3c5d7',
    credit: 25,
    concepto: 'Bonus · primer acceso al panel',
    fecha: '28 mar 2026',
  },
  {
    id: 'cc-tx-002',
    hash_transaccion: '0x4c1d8a0f3e6b9c2d5f8a1e4b7c0d3f6a9',
    credit: 10,
    concepto: 'Participación · quiz PSeInt (variables)',
    fecha: '29 mar 2026',
  },
  {
    id: 'cc-tx-003',
    hash_transaccion: '0x9f2e5b8c1d4a7e0b3c6f9d2a5b8c1e4f7',
    credit: 15,
    concepto: 'Racha · 3 lecciones en un día (demo)',
    fecha: '29 mar 2026',
  },
  {
    id: 'cc-tx-004',
    hash_transaccion: '0x1b4c7e0a3d6f9c2b5e8a1d4c7f0b3e6a9',
    credit: -5,
    concepto: 'Reserva · función en tienda (pendiente)',
    fecha: '30 mar 2026',
  },
];

export function mockCoffeeCoinBalance(): number {
  return MOCK_COFFEECOIN_TRANSACTIONS.reduce((sum, t) => sum + t.credit, 0);
}

/** Catálogo de la tienda: funcionalidades futuras, solo maqueta. */
export const COFFEECOIN_STORE_CATALOG: CoffeeCoinStoreItem[] = [
  {
    id: 'export-pdf',
    name: 'Exportar progreso a PDF',
    description: 'Descargá un resumen de quizzes y marcadores para imprimir o archivar.',
    priceCoffeecoin: 120,
  },
  {
    id: 'theme-token',
    name: 'Tema visual extra',
    description: 'Paleta adicional para lecciones (cuando esté disponible).',
    priceCoffeecoin: 200,
  },
  {
    id: 'badge-profile',
    name: 'Badge en perfil',
    description: 'Mostrá un distintivo junto a tu nombre en el panel.',
    priceCoffeecoin: 350,
  },
  {
    id: 'priority-support',
    name: 'Canal de sugerencias prioridad',
    description: 'Acceso a un formulario destacado para ideas del sitio.',
    priceCoffeecoin: 80,
  },
];

export function isCoffeeCoinStoreEnabledByEnv(): boolean {
  try {
    const v = import.meta.env?.PUBLIC_COFFEECOIN_STORE_ENABLED;
    return v === 'true' || v === true;
  } catch {
    return false;
  }
}

export function readCoffeeCoinStoreUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  if (isCoffeeCoinStoreEnabledByEnv()) return true;
  try {
    return localStorage.getItem(COFFEECOIN_STORE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function persistCoffeeCoinStoreUnlock(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COFFEECOIN_STORE_STORAGE_KEY, 'true');
  } catch {
    /* private mode */
  }
}

/** Devuelve true si el código coincide y se guardó el desbloqueo. */
export function tryUnlockCoffeeCoinStore(code: string): boolean {
  if (typeof window === 'undefined') return false;
  const trimmed = code.trim();
  if (trimmed !== COFFEECOIN_STORE_SECRET_CODE) return false;
  persistCoffeeCoinStoreUnlock();
  return true;
}
