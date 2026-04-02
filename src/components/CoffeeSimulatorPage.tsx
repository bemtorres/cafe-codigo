import { useCallback, useEffect, useState } from 'react';
import { getSupabaseBrowser, type CoffeeHistoryRow } from '../lib/supabase/client';
import { useSupabaseAuth } from '../lib/supabase/useSupabaseAuth';

const CAFE_STORAGE_KEY = 'cafe_del_dia_current';
const CAFE_EXPIRE_MS = 30 * 60 * 1000; // 30 minutos
const LOCAL_HISTORY_KEY = 'cafe_del_dia_history';
const LOCAL_HISTORY_MAX = 50;

type StoredCafe = { coffeeId: string; milkId: string; tempMode: 'hot' | 'iced'; preparedAt: number };

function saveCafe(coffeeId: string, milkId: string, tempMode: 'hot' | 'iced') {
  try {
    const data: StoredCafe = { coffeeId, milkId, tempMode, preparedAt: Date.now() };
    localStorage.setItem(CAFE_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('cafe-del-dia-update'));
  } catch { /* */ }
}

function clearCafe() {
  try {
    localStorage.removeItem(CAFE_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('cafe-del-dia-update'));
  } catch { /* */ }
}

function loadCafe(): (StoredCafe & { expired: boolean }) | null {
  try {
    const raw = localStorage.getItem(CAFE_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredCafe;
    const expired = Date.now() - (data.preparedAt ?? 0) > CAFE_EXPIRE_MS;
    if (expired) clearCafe();
    return { ...data, expired };
  } catch {
    return null;
  }
}

// ─── Historial local (usuarios anónimos o fallback) ───────────────────────────

type LocalHistoryEntry = {
  id: string;
  coffeeId: string;
  milkId: string | null;
  tempMode: 'hot' | 'iced';
  preparedAt: string;
  finishedAt: string;
};

function loadLocalHistory(): LocalHistoryEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocalEntry(entry: LocalHistoryEntry) {
  try {
    const list = loadLocalHistory();
    list.unshift(entry);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(list.slice(0, LOCAL_HISTORY_MAX)));
  } catch { /* */ }
}

/** ms restantes hasta que expire el café guardado */
function msRemaining(): number {
  try {
    const raw = localStorage.getItem(CAFE_STORAGE_KEY);
    if (!raw) return 0;
    const { preparedAt } = JSON.parse(raw) as StoredCafe;
    return Math.max(0, CAFE_EXPIRE_MS - (Date.now() - preparedAt));
  } catch { return 0; }
}

// ─── Tipos ───────────────────────────────────────────────────────────────────

type CoffeeType = {
  id: string;
  name: string;
  emoji: string;
  espresso: number;
  water: boolean;
  steamedMilk: number;
  milkFoam: number;
  color: string;
  description: string;
  gramsMin: number;
  gramsMax: number;
  grindNote: string;
  waterMl: number;
  extraWaterMl: number;
  milkMl: number;
};

type MilkType = {
  id: string;
  name: string;
  emoji: string;
  note: string;
};

// ─── Datos ───────────────────────────────────────────────────────────────────

const COFFEES: CoffeeType[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    emoji: '☕',
    espresso: 1,
    water: false,
    steamedMilk: 0,
    milkFoam: 0,
    color: '#6b2d0e',
    description: 'Concentrado puro. 30 ml de café bajo presión, sin agua extra ni leche. La base de todo.',
    gramsMin: 7,
    gramsMax: 9,
    grindNote: 'Molienda fina (casi polvo). El agua pasa en 25–30 segundos.',
    waterMl: 30,
    extraWaterMl: 0,
    milkMl: 0,
  },
  {
    id: 'americano',
    name: 'Americano',
    emoji: '🫖',
    espresso: 1,
    water: true,
    steamedMilk: 0,
    milkFoam: 0,
    color: '#b06d63',
    description: 'Espresso más agua caliente. Suave y largo sin perder el carácter del café.',
    gramsMin: 7,
    gramsMax: 9,
    grindNote: 'Misma molienda fina que el espresso. Se agrega agua después de la extracción.',
    waterMl: 30,
    extraWaterMl: 120,
    milkMl: 0,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    emoji: '🍵',
    espresso: 1,
    water: false,
    steamedMilk: 1,
    milkFoam: 1,
    color: '#c4936a',
    description: 'Tercios iguales: espresso, leche vaporizada y espuma. Equilibrio clásico.',
    gramsMin: 7,
    gramsMax: 9,
    grindNote: 'Molienda fina. La base es un espresso simple bien extraído.',
    waterMl: 30,
    extraWaterMl: 0,
    milkMl: 120,
  },
  {
    id: 'latte',
    name: 'Latte',
    emoji: '🥛',
    espresso: 1,
    water: false,
    steamedMilk: 3,
    milkFoam: 1,
    color: '#d4a574',
    description: 'Espresso con mucha leche vaporizada. Suave, cremoso y con una fina capa de espuma.',
    gramsMin: 14,
    gramsMax: 18,
    grindNote: 'Molienda fina, doble shot. La leche domina, necesitás un espresso con más cuerpo.',
    waterMl: 60,
    extraWaterMl: 0,
    milkMl: 180,
  },
  {
    id: 'cortado',
    name: 'Cortado',
    emoji: '🫗',
    espresso: 1,
    water: false,
    steamedMilk: 1,
    milkFoam: 0,
    color: '#a05a3a',
    description: 'Espresso "cortado" con un poco de leche caliente. Corta la acidez sin perder la fuerza.',
    gramsMin: 7,
    gramsMax: 9,
    grindNote: 'Molienda fina, espresso simple. La leche solo modera la acidez.',
    waterMl: 30,
    extraWaterMl: 0,
    milkMl: 30,
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    emoji: '☕',
    espresso: 1,
    water: false,
    steamedMilk: 0,
    milkFoam: 1,
    color: '#7a3a1a',
    description: 'Espresso "manchado" con una cucharada de espuma encima. Poca leche, mucho café.',
    gramsMin: 7,
    gramsMax: 9,
    grindNote: 'Molienda fina. La espuma es solo decorativa, el protagonista es el espresso.',
    waterMl: 30,
    extraWaterMl: 0,
    milkMl: 10,
  },
];

const MILKS: MilkType[] = [
  { id: 'entera', name: 'Entera', emoji: '🥛', note: 'La más cremosa. Espuma perfecta.' },
  { id: 'descremada', name: 'Descremada', emoji: '💧', note: 'Más ligera. Menos cuerpo.' },
  { id: 'sin-lactosa', name: 'Sin lactosa', emoji: '🫙', note: 'Igual de cremosa que la entera, sin lactosa. Apta para intolerantes.' },
  { id: 'almendra', name: 'Almendras', emoji: '🌰', note: 'Vegana. Sabor suave a nuez.' },
  { id: 'avena', name: 'Avena', emoji: '🌾', note: 'Vegana. Textura suave y cremosa.' },
  { id: 'coco', name: 'Coco', emoji: '🥥', note: 'Vegana. Toque tropical dulce.' },
  { id: 'soja', name: 'Soja', emoji: '🫘', note: 'Vegana clásica. Sabor neutro.' },
];

// ─── Componente taza SVG ──────────────────────────────────────────────────────

function CupVisualization({
  coffee,
  milkId,
  isIced,
  size = 1,
}: {
  coffee: CoffeeType;
  milkId: string;
  isIced: boolean;
  size?: number;
}) {
  const hasMilk = coffee.steamedMilk > 0 || coffee.milkFoam > 0;
  const milkColor =
    milkId === 'entera' || milkId === 'descremada' || milkId === 'sin-lactosa'
      ? '#f0e6d8'
      : milkId === 'almendra'
        ? '#ecdcbc'
        : milkId === 'avena'
          ? '#e8dcc8'
          : milkId === 'coco'
            ? '#f0ece0'
            : '#e8dfd4';
  const icedMilkColor =
    milkId === 'entera' || milkId === 'descremada' || milkId === 'sin-lactosa'
      ? '#ddeeff'
      : milkId === 'almendra'
        ? '#d8e8f0'
        : milkId === 'avena'
          ? '#d4e4ee'
          : milkId === 'coco'
            ? '#daeaf2'
            : '#d0e0ec';

  const total = coffee.espresso + (coffee.water ? 2 : 0) + coffee.steamedMilk + coffee.milkFoam;
  const espressoH = Math.round((coffee.espresso / total) * 80);
  const waterH = coffee.water ? Math.round((2 / total) * 80) : 0;
  const milkH = Math.round((coffee.steamedMilk / total) * 80);
  const foamH = isIced ? 0 : Math.round((coffee.milkFoam / total) * 80);

  const w = Math.round(120 * size);
  const h = Math.round((isIced ? 140 : 130) * size);

  if (isIced) {
    const glassBase = 116;
    const glassTop = 28;
    const glassH = glassBase - glassTop;
    const totalIced = coffee.espresso + (coffee.water ? 2 : 0) + coffee.steamedMilk + coffee.milkFoam;
    const eH = Math.round((coffee.espresso / totalIced) * glassH);
    const wH = coffee.water ? Math.round((2 / totalIced) * glassH) : 0;
    const mH = Math.round(((coffee.steamedMilk + coffee.milkFoam) / totalIced) * glassH);

    return (
      <svg width={w} height={h} viewBox="0 0 120 140" fill="none" aria-hidden>
        <circle cx="18" cy="78" r="2.2" fill="#93c5fd" opacity="0.5" />
        <circle cx="14" cy="94" r="1.6" fill="#93c5fd" opacity="0.4" />
        <circle cx="20" cy="62" r="1.2" fill="#93c5fd" opacity="0.35" />
        <circle cx="17" cy="108" r="1.8" fill="#93c5fd" opacity="0.3" />
        <circle cx="103" cy="72" r="2" fill="#93c5fd" opacity="0.5" />
        <circle cx="106" cy="90" r="1.5" fill="#93c5fd" opacity="0.4" />
        <circle cx="101" cy="58" r="1.2" fill="#93c5fd" opacity="0.35" />
        <circle cx="105" cy="105" r="1.7" fill="#93c5fd" opacity="0.3" />
        <path d="M22 28 L28 120 Q60 130 92 120 L98 28 Z" fill="rgba(220,240,255,0.18)" stroke="#1E1210" strokeWidth="2.5" />
        <clipPath id="glass-clip-p">
          <path d="M24 34 L29 118 Q60 127 91 118 L96 34 Z" />
        </clipPath>
        <g clipPath="url(#glass-clip-p)">
          <rect x="22" y={glassBase - eH} width="76" height={eH} fill={coffee.color} opacity="0.9" />
          {coffee.water && <rect x="22" y={glassBase - eH - wH} width="76" height={wH} fill="#8fb8d4" opacity="0.7" />}
          {hasMilk && mH > 0 && <rect x="22" y={glassBase - eH - wH - mH} width="76" height={mH} fill={icedMilkColor} opacity="0.85" />}
          <g opacity="0.88">
            <rect x="27" y="42" width="24" height="18" rx="3.5" fill="white" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(-9 39 51)" />
            <line x1="31" y1="44" x2="31" y2="52" stroke="#bae6fd" strokeWidth="1" opacity="0.7" transform="rotate(-9 39 51)" />
            <rect x="54" y="36" width="22" height="17" rx="3.5" fill="white" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(6 65 44)" />
            <line x1="58" y1="38" x2="58" y2="46" stroke="#bae6fd" strokeWidth="1" opacity="0.7" transform="rotate(6 65 44)" />
            <rect x="74" y="41" width="23" height="17" rx="3.5" fill="white" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(-5 85 49)" />
            <line x1="78" y1="43" x2="78" y2="51" stroke="#bae6fd" strokeWidth="1" opacity="0.7" transform="rotate(-5 85 49)" />
          </g>
        </g>
        <path d="M22 28 L28 120 Q60 130 92 120 L98 28 Z" fill="none" stroke="#1E1210" strokeWidth="2.5" />
        <line x1="27" y1="30" x2="30" y2="115" stroke="white" strokeWidth="3" opacity="0.25" strokeLinecap="round" />
        <line x1="35" y1="29" x2="37" y2="112" stroke="white" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
        <rect x="74" y="4" width="7" height="90" rx="3.5" fill="#f87171" stroke="#1E1210" strokeWidth="1.2" />
        <rect x="75" y="5" width="2.5" height="88" rx="1.5" fill="white" opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg width={w} height={h} viewBox="0 0 120 130" fill="none" aria-hidden>
      <ellipse cx="60" cy="122" rx="46" ry="7" fill="#e2c9b4" stroke="#1E1210" strokeWidth="2" />
      <path d="M24 48 Q22 108 34 116 Q60 124 86 116 Q98 108 96 48 Z" fill="white" stroke="#1E1210" strokeWidth="2.5" />
      <clipPath id="cup-clip-p">
        <path d="M26 54 Q24 108 34 114 Q60 122 86 114 Q96 108 94 54 Z" />
      </clipPath>
      <g clipPath="url(#cup-clip-p)">
        <rect x="24" y={116 - espressoH} width="72" height={espressoH} fill={coffee.color} />
        {coffee.water && <rect x="24" y={116 - espressoH - waterH} width="72" height={waterH} fill="#c4846e" opacity="0.7" />}
        {hasMilk && milkH > 0 && <rect x="24" y={116 - espressoH - waterH - milkH} width="72" height={milkH} fill={milkColor} />}
        {hasMilk && foamH > 0 && <rect x="24" y={116 - espressoH - waterH - milkH - foamH} width="72" height={foamH} fill="white" opacity="0.9" />}
      </g>
      <ellipse cx="60" cy="48" rx="36" ry="7" fill="white" stroke="#1E1210" strokeWidth="2.5" />
      <path d="M96 68 Q116 68 116 86 Q116 104 96 100" stroke="#1E1210" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M46 36 Q44 28 46 20" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M60 32 Q58 22 60 14" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M74 36 Q72 28 74 20" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// ─── Pantalla de resultado ────────────────────────────────────────────────────

function ResultScreen({
  coffee,
  milk,
  isIced,
  hasMilk,
  countdown,
  urgency,
  onFinish,
}: {
  coffee: CoffeeType;
  milk: MilkType;
  isIced: boolean;
  hasMilk: boolean;
  countdown: string;
  urgency: boolean;
  onFinish: () => void;
}) {
  const drinkName = hasMilk
    ? `${coffee.name}${isIced ? ' helado' : ''} con leche de ${milk.name.toLowerCase()}`
    : `${coffee.name}${isIced ? ' helado' : ''}`;

  const totalMl = coffee.extraWaterMl > 0
    ? coffee.waterMl + coffee.extraWaterMl
    : coffee.milkMl > 0
      ? coffee.waterMl + coffee.milkMl
      : coffee.waterMl;

  const steps = isIced
    ? [
        `Molé ${coffee.gramsMin}–${coffee.gramsMax} g de café (molienda fina).`,
        `Extraé el espresso sobre ${coffee.waterMl} ml de agua caliente.`,
        coffee.extraWaterMl > 0
          ? `Agregá ${coffee.extraWaterMl} ml de agua fría.`
          : hasMilk
            ? `Vertí ${coffee.milkMl} ml de ${milk.name.toLowerCase()} fría.`
            : null,
        'Llenó el vaso con hielo abundante.',
        'Insertá la pajita y serví de inmediato.',
      ].filter(Boolean) as string[]
    : [
        `Molé ${coffee.gramsMin}–${coffee.gramsMax} g de café (molienda fina).`,
        `Extraé el espresso con ${coffee.waterMl} ml de agua a 90–96 °C.`,
        coffee.extraWaterMl > 0
          ? `Agregá ${coffee.extraWaterMl} ml de agua caliente.`
          : hasMilk
            ? `Vaporizá ${coffee.milkMl} ml de leche ${milk.name.toLowerCase()} a ~65 °C.`
            : null,
        coffee.milkFoam > 0 ? 'Terminá con una capa de microespuma cremosa.' : null,
        'Serví en taza precalentada y disfrutá.',
      ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* Animación de entrada */}
      <div
        className={`relative flex flex-col items-center rounded-3xl border-4 border-border px-10 py-8 shadow-neo-lg text-center ${
          isIced ? 'bg-linear-to-b from-[#e0f2fe] to-white' : 'bg-linear-to-b from-[#fff8f0] to-white'
        }`}
        style={{ minWidth: 280 }}
      >
        {/* Taza grande */}
        <CupVisualization coffee={coffee} milkId={milk.id} isIced={isIced} size={1.8} />

        <h2 className="mt-4 font-nunito font-black text-2xl sm:text-3xl text-textPrimary leading-tight" style={{ color: coffee.color }}>
          {drinkName}
        </h2>
        <p className="mt-2 font-nunito font-bold text-textSecondary text-sm max-w-xs">
          {coffee.description}
        </p>
        {hasMilk && (
          <p className="mt-1 font-nunito font-bold text-textMuted text-xs">
            {milk.emoji} Leche de {milk.name.toLowerCase()} — {milk.note}
          </p>
        )}

        {/* Datos rápidos */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border bg-white px-3 py-1.5 font-nunito font-extrabold text-xs text-textPrimary shadow-neo">
            ⚖️ {coffee.gramsMin}–{coffee.gramsMax} g
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-border bg-white px-3 py-1.5 font-nunito font-extrabold text-xs text-textPrimary shadow-neo">
            💧 {totalMl} ml en taza
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-xl border-2 border-border px-3 py-1.5 font-nunito font-extrabold text-xs shadow-neo ${isIced ? 'bg-[#e0f2fe] text-[#0369a1]' : 'bg-[#fff8f0] text-[#92400e]'}`}>
            {isIced ? '🧊 Servido frío' : '🔥 Servido caliente'}
          </span>
        </div>

        {/* Contador de vida de la taza */}
        <div className={`mt-4 flex items-center gap-2 rounded-2xl border-2 px-4 py-2 font-nunito font-extrabold text-sm transition-colors ${
          urgency
            ? 'border-red-400 bg-red-50 text-red-600'
            : 'border-border bg-white/80 text-textSecondary'
        }`}>
          <span aria-hidden>{urgency ? '⚠️' : '⏱️'}</span>
          {urgency
            ? <>¡Se enfría en <strong className="tabular-nums">{countdown}</strong>! Terminala antes.</>
            : <>Disfrutando la taza · quedan <strong className="tabular-nums">{countdown}</strong></>
          }
        </div>
      </div>

      {/* Pasos de preparación */}
      <div className="w-full max-w-md">
        <h3 className="font-nunito font-black text-lg text-textPrimary mb-3">📋 Cómo prepararlo</h3>
        <ol className="flex flex-col gap-2 list-none m-0 p-0">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl border-2 border-border bg-white px-4 py-3 shadow-neo font-nunito font-bold text-sm text-textSecondary">
              <span
                className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-border font-black text-xs text-white"
                style={{ backgroundColor: coffee.color }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={onFinish}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border-[3px] border-border px-6 py-3 font-nunito font-black text-border text-base shadow-neo transition-all hover:-translate-y-0.5 ${
            isIced ? 'bg-[#7dd3fc]' : 'bg-success'
          }`}
        >
          {isIced ? '🧊' : '☕'} Terminar taza
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-[3px] border-border bg-white px-6 py-3 font-nunito font-black text-textPrimary shadow-neo transition-all hover:-translate-y-0.5 hover:bg-tertiary/40"
        >
          ↻ Preparar otro
        </button>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CoffeeSimulatorPage() {
  const { user } = useSupabaseAuth();
  const [selectedCoffee, setSelectedCoffee] = useState<string>('cappuccino');
  const [selectedMilk, setSelectedMilk] = useState<string>('entera');
  const [tempMode, setTempMode] = useState<'hot' | 'iced'>('hot');
  const [prepared, setPrepared] = useState(false);
  const [coldCoffee, setColdCoffee] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [secsLeft, setSecsLeft] = useState(0);
  const [history, setHistory] = useState<(CoffeeHistoryRow | LocalHistoryEntry)[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    const supabase = getSupabaseBrowser();
    if (supabase && user?.id) {
      const { data } = await supabase
        .from('coffee_history')
        .select('*')
        .eq('user_id', user.id)
        .order('finished_at', { ascending: false })
        .limit(30);
      setHistory((data as CoffeeHistoryRow[]) ?? []);
    } else {
      setHistory(loadLocalHistory());
    }
    setHistoryLoading(false);
  }, [user?.id]);

  // Al montar: leer localStorage
  useEffect(() => {
    setMounted(true);
    const saved = loadCafe();
    if (saved) {
      const validCoffee = COFFEES.find((c) => c.id === saved.coffeeId);
      const validMilk = MILKS.find((m) => m.id === saved.milkId);
      if (validCoffee) setSelectedCoffee(saved.coffeeId);
      if (validMilk) setSelectedMilk(saved.milkId);
      setTempMode(saved.tempMode);
      if (saved.expired) {
        setColdCoffee(true);
      } else {
        setPrepared(true);
        setSecsLeft(Math.round(msRemaining() / 1000));
      }
    }
  }, []);

  // Cargar historial cuando se monta y cuando cambia el usuario
  useEffect(() => {
    if (mounted) void loadHistory();
  }, [mounted, loadHistory]);

  // Cuenta regresiva: tick cada segundo mientras hay café preparado
  useEffect(() => {
    if (!prepared) return;
    const id = setInterval(() => {
      const ms = msRemaining();
      if (ms <= 0) {
        clearInterval(id);
        setPrepared(false);
        setColdCoffee(true);
        clearCafe();
      } else {
        setSecsLeft(Math.round(ms / 1000));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [prepared]);

  const coffee = COFFEES.find((c) => c.id === selectedCoffee)!;
  const milk = MILKS.find((m) => m.id === selectedMilk)!;
  const hasMilk = coffee.steamedMilk > 0 || coffee.milkFoam > 0;
  const isIced = tempMode === 'iced';

  const minsLeft = Math.floor(secsLeft / 60);
  const secsPart = secsLeft % 60;
  const countdown = `${minsLeft}:${String(secsPart).padStart(2, '0')}`;
  const urgency = secsLeft > 0 && secsLeft <= 300; // últimos 5 min

  function prepare() {
    setPreparing(true);
    setColdCoffee(false);
    setTimeout(() => {
      setPreparing(false);
      setPrepared(true);
      saveCafe(selectedCoffee, selectedMilk, tempMode);
      setSecsLeft(CAFE_EXPIRE_MS / 1000);
    }, 1400);
  }

  async function finish() {
    const preparedAt = (() => {
      try {
        const raw = localStorage.getItem(CAFE_STORAGE_KEY);
        if (!raw) return new Date().toISOString();
        return new Date((JSON.parse(raw) as StoredCafe).preparedAt).toISOString();
      } catch { return new Date().toISOString(); }
    })();
    const finishedAt = new Date().toISOString();

    const supabase = getSupabaseBrowser();
    if (supabase && user?.id) {
      await supabase.from('coffee_history').insert({
        user_id: user.id,
        coffee_id: selectedCoffee,
        milk_id: hasMilk ? selectedMilk : null,
        temp_mode: tempMode,
        prepared_at: preparedAt,
        finished_at: finishedAt,
      });
    } else {
      saveLocalEntry({
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        coffeeId: selectedCoffee,
        milkId: hasMilk ? selectedMilk : null,
        tempMode,
        preparedAt,
        finishedAt,
      });
    }

    clearCafe();
    setPrepared(false);
    setColdCoffee(false);
    setPreparing(false);
    setSecsLeft(0);
    setSelectedCoffee('cappuccino');
    setSelectedMilk('entera');
    setTempMode('hot');
    void loadHistory();
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-border border-t-transparent" />
      </div>
    );
  }

  // Taza expirada: pantalla "se enfrió"
  if (coldCoffee) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <div className="rounded-3xl border-4 border-border bg-[#f0f0f0] px-10 py-8 shadow-neo-lg max-w-sm w-full">
          <div className="text-6xl mb-3" aria-hidden>🥶</div>
          <h2 className="font-nunito font-black text-2xl text-textPrimary mb-2">¡Se te enfrió el café!</h2>
          <p className="font-nunito font-bold text-textSecondary text-sm mb-1">
            Tu <strong>{coffee.name}</strong> estuvo listo más de 30 minutos.
          </p>
          <p className="font-nunito font-bold text-textMuted text-xs">
            Preparate uno nuevo antes de arrancar a codear.
          </p>
        </div>
        <button
          type="button"
          onClick={finish}
          className="flex items-center gap-2 rounded-2xl border-[3px] border-border bg-success px-8 py-3.5 font-nunito font-black text-border text-base shadow-neo transition-all hover:-translate-y-0.5"
        >
          ☕ Preparar nuevo café
        </button>
      </div>
    );
  }

  if (prepared) {
    return (
      <ResultScreen
        coffee={coffee}
        milk={milk}
        isIced={isIced}
        hasMilk={hasMilk}
        countdown={countdown}
        urgency={urgency}
        onFinish={finish}
      />
    );
  }

  return (
    <div className="rounded-[24px] border-4 border-border bg-white shadow-neo-lg overflow-hidden">
      {/* Header con toggle */}
      <div className={`px-6 py-4 flex items-center justify-between gap-3 transition-colors ${isIced ? 'bg-[#0c2a3d]' : 'bg-[#2b1d1b]'}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>{isIced ? '🧊' : '☕'}</span>
          <div>
            <h3 className="m-0 font-nunito font-black text-white text-lg">Armá tu café del día</h3>
            <p className="m-0 font-nunito font-bold text-white/70 text-xs">
              {isIced ? 'Bebida fría sobre hielo con pajita' : 'Elegí tu bebida y tipo de leche'}
            </p>
          </div>
        </div>
        <div className="inline-flex rounded-xl border-2 border-white/20 bg-white/10 p-1">
          <button
            type="button"
            onClick={() => { setTempMode('hot'); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-nunito font-extrabold text-sm transition-all ${
              !isIced ? 'bg-[#c4936a] text-white shadow-sm' : 'text-white/60 hover:text-white/90'
            }`}
          >
            <span aria-hidden>🔥</span> Hot
          </button>
          <button
            type="button"
            onClick={() => { setTempMode('iced'); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-nunito font-extrabold text-sm transition-all ${
              isIced ? 'bg-[#0ea5e9] text-white shadow-sm' : 'text-white/60 hover:text-white/90'
            }`}
          >
            <span aria-hidden>🧊</span> Ice
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
        {/* Controles */}
        <div className="flex flex-col gap-5">
          {/* Tipo de café */}
          <div>
            <p className="font-nunito font-extrabold text-textSecondary text-sm uppercase tracking-widest mb-2">
              Tipo de café
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COFFEES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCoffee(c.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-[3px] font-nunito font-extrabold text-sm transition-all ${
                    selectedCoffee === c.id
                      ? 'bg-[#2b1d1b] text-white border-border shadow-neo -translate-y-0.5'
                      : 'bg-white text-textPrimary border-border hover:-translate-y-0.5 hover:shadow-neo'
                  }`}
                >
                  <span aria-hidden>{c.emoji}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tipo de leche */}
          <div>
            <p className="font-nunito font-extrabold text-textSecondary text-sm uppercase tracking-widest mb-2">
              Tipo de leche
              {!hasMilk && (
                <span className="ml-2 normal-case text-textMuted font-bold text-xs">(este café no lleva leche)</span>
              )}
            </p>
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 transition-opacity ${!hasMilk ? 'opacity-35 pointer-events-none' : ''}`}>
              {MILKS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  disabled={!hasMilk}
                  onClick={() => setSelectedMilk(m.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-[3px] font-nunito font-extrabold text-sm transition-all ${
                    selectedMilk === m.id && hasMilk
                      ? 'bg-[#d4a574] text-[#2b1d1b] border-border shadow-neo -translate-y-0.5'
                      : 'bg-white text-textPrimary border-border hover:-translate-y-0.5 hover:shadow-neo'
                  }`}
                >
                  <span aria-hidden>{m.emoji}</span>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Info del café */}
          <div className="rounded-xl border-2 border-border bg-tertiary/30 px-4 py-3 flex flex-col gap-2">
            <p className="m-0 font-nunito font-bold text-textSecondary text-sm leading-relaxed">
              <strong className="text-textPrimary">{coffee.name}:</strong> {coffee.description}
            </p>
            {hasMilk && (
              <p className="m-0 font-nunito font-bold text-textMuted text-xs">
                <strong className="text-textSecondary">Leche de {milk.name.toLowerCase()}:</strong> {milk.note}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-start gap-2 rounded-lg border border-[#d4a574] bg-[#fff8f0] px-3 py-2">
                <span className="text-base leading-none mt-0.5" aria-hidden>⚖️</span>
                <div>
                  <p className="m-0 font-nunito font-black text-[#7a3a1a] text-sm">
                    {coffee.gramsMin}–{coffee.gramsMax} g de café
                  </p>
                  <p className="m-0 font-nunito font-bold text-textMuted text-xs mt-0.5">
                    {coffee.grindNote}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[#93c5fd] bg-[#f0f7ff] px-3 py-2">
                <span className="text-base leading-none mt-0.5" aria-hidden>💧</span>
                <div>
                  <p className="m-0 font-nunito font-black text-[#1e4d8c] text-sm">
                    {coffee.waterMl} ml extracción
                    {coffee.extraWaterMl > 0 && <> + {coffee.extraWaterMl} ml agua</>}
                    {coffee.milkMl > 0 && <> · {coffee.milkMl} ml leche</>}
                  </p>
                  <p className="m-0 font-nunito font-bold text-textMuted text-xs mt-0.5">
                    {coffee.extraWaterMl > 0
                      ? `Total: ${coffee.waterMl + coffee.extraWaterMl} ml`
                      : coffee.milkMl > 0
                        ? `Total: ${coffee.waterMl + coffee.milkMl} ml`
                        : `${coffee.waterMl} ml en taza`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón preparar */}
          <button
            type="button"
            onClick={prepare}
            disabled={preparing}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-[3px] border-border font-nunito font-black text-border text-base shadow-neo transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 ${
              isIced ? 'bg-[#7dd3fc]' : 'bg-success'
            }`}
          >
            {preparing ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-transparent" aria-hidden />
                Preparando…
              </>
            ) : isIced ? (
              <>🧊 Preparar {coffee.name} helado</>
            ) : (
              <>☕ Preparar {coffee.name}</>
            )}
          </button>
        </div>

        {/* Visualización */}
        <div className="flex flex-col items-center justify-start pt-2 min-w-[140px]">
          <CupVisualization coffee={coffee} milkId={selectedMilk} isIced={isIced} />
          <div className="mt-2 flex flex-col gap-1 text-[0.7rem] font-nunito font-bold text-textMuted w-full max-w-[160px]">
            {isIced ? (
              <>
                <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-white border border-[#7dd3fc] shrink-0" />Hielo</div>
                {hasMilk && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: '#ddeeff', border: '1px solid #1E1210' }} />Leche fría</div>}
              </>
            ) : (
              <>
                {coffee.milkFoam > 0 && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-white border border-border shrink-0" />Espuma</div>}
                {coffee.steamedMilk > 0 && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: '#f0e6d8', border: '1px solid #1E1210' }} />Leche</div>}
              </>
            )}
            {coffee.water && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: isIced ? '#8fb8d4' : '#c4846e', border: '1px solid #1E1210' }} />Agua</div>}
            <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: coffee.color, border: '1px solid #1E1210' }} />Espresso</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper para formatear fecha/hora ────────────────────────────────────────
function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('es', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(iso));
  } catch { return iso; }
}

// ─── Historial de cafés ───────────────────────────────────────────────────────

export function CoffeeHistorySection() {
  const { user } = useSupabaseAuth();
  const [history, setHistory] = useState<(CoffeeHistoryRow | LocalHistoryEntry)[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const isRemote = (e: CoffeeHistoryRow | LocalHistoryEntry): e is CoffeeHistoryRow =>
    'finished_at' in e && 'user_id' in e;

  const getCoffeeId = (e: CoffeeHistoryRow | LocalHistoryEntry) =>
    isRemote(e) ? e.coffee_id : (e as LocalHistoryEntry).coffeeId;
  const getMilkId = (e: CoffeeHistoryRow | LocalHistoryEntry) =>
    isRemote(e) ? e.milk_id : (e as LocalHistoryEntry).milkId;
  const getTempMode = (e: CoffeeHistoryRow | LocalHistoryEntry) =>
    isRemote(e) ? e.temp_mode : (e as LocalHistoryEntry).tempMode;
  const getFinishedAt = (e: CoffeeHistoryRow | LocalHistoryEntry) =>
    isRemote(e) ? e.finished_at : (e as LocalHistoryEntry).finishedAt;

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabaseBrowser();
    if (supabase && user?.id) {
      const { data } = await supabase
        .from('coffee_history')
        .select('*')
        .eq('user_id', user.id)
        .order('finished_at', { ascending: false })
        .limit(30);
      setHistory((data as CoffeeHistoryRow[]) ?? []);
    } else {
      setHistory(loadLocalHistory());
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) void load();
  }, [mounted, load]);

  // escuchar cuando se termina una taza para refrescar
  useEffect(() => {
    const handler = () => void load();
    window.addEventListener('cafe-del-dia-update', handler);
    return () => window.removeEventListener('cafe-del-dia-update', handler);
  }, [load]);

  if (!mounted || loading) return null;
  if (history.length === 0) return null;

  const COFFEES_INFO: Record<string, { name: string; emoji: string; color: string }> = {
    espresso:   { name: 'Espresso',   emoji: '☕', color: '#6b2d0e' },
    americano:  { name: 'Americano',  emoji: '🫖', color: '#b06d63' },
    cappuccino: { name: 'Cappuccino', emoji: '🍵', color: '#c4936a' },
    latte:      { name: 'Latte',      emoji: '🥛', color: '#d4a574' },
    cortado:    { name: 'Cortado',    emoji: '🫗', color: '#a05a3a' },
    macchiato:  { name: 'Macchiato',  emoji: '☕', color: '#7a3a1a' },
  };
  const MILKS_INFO: Record<string, string> = {
    entera: 'Entera', descremada: 'Descremada', 'sin-lactosa': 'Sin lactosa',
    almendra: 'Almendras', avena: 'Avena', coco: 'Coco', soja: 'Soja',
  };

  const totalCups = history.length;
  const icedCount = history.filter((e) => getTempMode(e) === 'iced').length;
  const topCoffeeId = Object.entries(
    history.reduce<Record<string, number>>((acc, e) => {
      const id = getCoffeeId(e);
      acc[id] = (acc[id] ?? 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topCoffee = topCoffeeId ? COFFEES_INFO[topCoffeeId] : null;

  return (
    <div className="mt-10">
      <h2 className="font-nunito font-black text-2xl text-textPrimary mb-1">☕ Tu historial de cafés</h2>
      <p className="font-nunito font-bold text-textSecondary text-sm mb-5">
        {user ? 'Guardado en tu cuenta.' : 'Guardado en este dispositivo.'} {totalCups} taza{totalCups !== 1 ? 's' : ''} en total.
      </p>

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border-2 border-border bg-white px-4 py-3 shadow-neo text-center">
          <p className="font-nunito font-black text-2xl text-textPrimary">{totalCups}</p>
          <p className="font-nunito font-bold text-textMuted text-xs">Tazas totales</p>
        </div>
        <div className="rounded-2xl border-2 border-border bg-white px-4 py-3 shadow-neo text-center">
          <p className="font-nunito font-black text-2xl text-textPrimary">{icedCount}</p>
          <p className="font-nunito font-bold text-textMuted text-xs">🧊 Heladas</p>
        </div>
        {topCoffee && (
          <div className="rounded-2xl border-2 border-border bg-white px-4 py-3 shadow-neo text-center col-span-2 sm:col-span-1">
            <p className="font-nunito font-black text-2xl" style={{ color: topCoffee.color }}>{topCoffee.emoji}</p>
            <p className="font-nunito font-bold text-textMuted text-xs">Favorito: {topCoffee.name}</p>
          </div>
        )}
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-2">
        {history.map((entry, i) => {
          const coffeeId = getCoffeeId(entry);
          const milkId = getMilkId(entry);
          const tempMode = getTempMode(entry);
          const finishedAt = getFinishedAt(entry);
          const info = COFFEES_INFO[coffeeId];
          if (!info) return null;
          return (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border-2 border-border bg-white px-4 py-2.5 shadow-neo"
            >
              <span className="text-xl shrink-0" aria-hidden>{tempMode === 'iced' ? '🧊' : info.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="m-0 font-nunito font-extrabold text-sm text-textPrimary leading-tight" style={{ color: info.color }}>
                  {info.name}{tempMode === 'iced' ? ' helado' : ''}
                  {milkId && MILKS_INFO[milkId] && (
                    <span className="text-textSecondary font-bold"> · {MILKS_INFO[milkId]}</span>
                  )}
                </p>
                <p className="m-0 font-nunito font-bold text-textMuted text-xs">{formatDate(finishedAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
