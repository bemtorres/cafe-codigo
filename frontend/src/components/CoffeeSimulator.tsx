import { useState } from 'react';

// ─── Tipos ───────────────────────────────────────────────────────────────────

type CoffeeType = {
  id: string;
  name: string;
  emoji: string;
  espresso: number;    // shots
  water: boolean;
  steamedMilk: number; // partes (0 = sin leche)
  milkFoam: number;    // partes espuma
  color: string;       // color de acento
  description: string;
  gramsMin: number;    // gramos mínimos de café molido
  gramsMax: number;    // gramos máximos de café molido
  grindNote: string;   // nota sobre la molienda
  waterMl: number;     // ml de agua para la extracción del espresso
  extraWaterMl: number; // ml de agua caliente adicional (solo americano)
  milkMl: number;      // ml de leche (si aplica)
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
    description: 'Espresso "manchado" con una cucharada de espuma encima. Poco leche, mucho café.',
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

// ─── Componente de la taza SVG ────────────────────────────────────────────────

function CupVisualization({
  coffee,
  milkId,
  isIced,
}: {
  coffee: CoffeeType;
  milkId: string;
  isIced: boolean;
}) {
  const hasMilk = coffee.steamedMilk > 0 || coffee.milkFoam > 0;
  const milkColor = milkId === 'entera' || milkId === 'descremada' || milkId === 'sin-lactosa'
    ? '#f0e6d8'
    : milkId === 'almendra'
    ? '#ecdcbc'
    : milkId === 'avena'
    ? '#e8dcc8'
    : milkId === 'coco'
    ? '#f0ece0'
    : '#e8dfd4';

  // Para bebida helada la leche fría es un poco más translúcida/azulada
  const icedMilkColor = milkId === 'entera' || milkId === 'descremada' || milkId === 'sin-lactosa'
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
  const foamH = isIced ? 0 : Math.round((coffee.milkFoam / total) * 80); // sin espuma en frío

  if (isIced) {
    // ── Vaso de bebida helada ──────────────────────────────────────────────────
    const glassBase = 116;
    const glassTop = 28;
    const glassH = glassBase - glassTop; // 88px de alto de líquido
    const totalIced = coffee.espresso + (coffee.water ? 2 : 0) + coffee.steamedMilk + coffee.milkFoam;
    const eH = Math.round((coffee.espresso / totalIced) * glassH);
    const wH = coffee.water ? Math.round((2 / totalIced) * glassH) : 0;
    const mH = Math.round(((coffee.steamedMilk + coffee.milkFoam) / totalIced) * glassH);

    return (
      <div className="flex flex-col items-center select-none" aria-hidden>
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          {/* Condensación exterior */}
          <circle cx="18" cy="78" r="2.2" fill="#93c5fd" opacity="0.5" />
          <circle cx="14" cy="94" r="1.6" fill="#93c5fd" opacity="0.4" />
          <circle cx="20" cy="62" r="1.2" fill="#93c5fd" opacity="0.35" />
          <circle cx="17" cy="108" r="1.8" fill="#93c5fd" opacity="0.3" />
          <circle cx="103" cy="72" r="2" fill="#93c5fd" opacity="0.5" />
          <circle cx="106" cy="90" r="1.5" fill="#93c5fd" opacity="0.4" />
          <circle cx="101" cy="58" r="1.2" fill="#93c5fd" opacity="0.35" />
          <circle cx="105" cy="105" r="1.7" fill="#93c5fd" opacity="0.3" />

          {/* Vaso: cuerpo con efecto glass */}
          <path
            d="M22 28 L28 120 Q60 130 92 120 L98 28 Z"
            fill="rgba(220,240,255,0.18)"
            stroke="#1E1210"
            strokeWidth="2.5"
          />

          {/* Capas de líquido */}
          <clipPath id="glass-clip">
            <path d="M24 34 L29 118 Q60 127 91 118 L96 34 Z" />
          </clipPath>
          <g clipPath="url(#glass-clip)">
            {/* Espresso (abajo) */}
            <rect x="22" y={glassBase - eH} width="76" height={eH} fill={coffee.color} opacity="0.9" />
            {/* Agua */}
            {coffee.water && (
              <rect x="22" y={glassBase - eH - wH} width="76" height={wH} fill="#8fb8d4" opacity="0.7" />
            )}
            {/* Leche fría */}
            {hasMilk && mH > 0 && (
              <rect x="22" y={glassBase - eH - wH - mH} width="76" height={mH} fill={icedMilkColor} opacity="0.85" />
            )}
            {/* Relleno de agua/café hasta arriba si no hay leche */}
            {!hasMilk && wH === 0 && (
              <rect x="22" y={glassTop} width="76" height={glassBase - eH - glassTop} fill={coffee.color} opacity="0.15" />
            )}

            {/* Cubitos de hielo */}
            <g opacity="0.88">
              <rect x="27" y="42" width="24" height="18" rx="3.5" fill="white" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(-9 39 51)" />
              <line x1="31" y1="44" x2="31" y2="52" stroke="#bae6fd" strokeWidth="1" opacity="0.7" transform="rotate(-9 39 51)" />
              <rect x="54" y="36" width="22" height="17" rx="3.5" fill="white" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(6 65 44)" />
              <line x1="58" y1="38" x2="58" y2="46" stroke="#bae6fd" strokeWidth="1" opacity="0.7" transform="rotate(6 65 44)" />
              <rect x="74" y="41" width="23" height="17" rx="3.5" fill="white" stroke="#7dd3fc" strokeWidth="1.5" transform="rotate(-5 85 49)" />
              <line x1="78" y1="43" x2="78" y2="51" stroke="#bae6fd" strokeWidth="1" opacity="0.7" transform="rotate(-5 85 49)" />
            </g>
          </g>

          {/* Borde del vaso (encima de todo para parecer cristal) */}
          <path
            d="M22 28 L28 120 Q60 130 92 120 L98 28 Z"
            fill="none"
            stroke="#1E1210"
            strokeWidth="2.5"
          />
          {/* Reflejos del cristal */}
          <line x1="27" y1="30" x2="30" y2="115" stroke="white" strokeWidth="3" opacity="0.25" strokeLinecap="round" />
          <line x1="35" y1="29" x2="37" y2="112" stroke="white" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />

          {/* Pajita / straw */}
          <rect x="74" y="4" width="7" height="90" rx="3.5" fill="#f87171" stroke="#1E1210" strokeWidth="1.2" />
          <rect x="75" y="5" width="2.5" height="88" rx="1.5" fill="white" opacity="0.3" />
        </svg>

        {/* Leyenda */}
        <div className="mt-1 flex flex-col gap-1 text-[0.7rem] font-nunito font-bold text-textMuted w-full max-w-[160px]">
          <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0 bg-white border border-[#7dd3fc]" />Hielo</div>
          {hasMilk && mH > 0 && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: icedMilkColor, border: '1px solid #1E1210' }} />Leche fría</div>}
          {coffee.water && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: '#8fb8d4', border: '1px solid #1E1210' }} />Agua</div>}
          <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: coffee.color, border: '1px solid #1E1210' }} />Espresso</div>
        </div>
      </div>
    );
  }

  // ── Taza caliente ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center select-none" aria-hidden>
      <svg width="120" height="130" viewBox="0 0 120 130" fill="none">
        {/* Saucer */}
        <ellipse cx="60" cy="122" rx="46" ry="7" fill="#e2c9b4" stroke="#1E1210" strokeWidth="2" />
        {/* Cup body */}
        <path
          d="M24 48 Q22 108 34 116 Q60 124 86 116 Q98 108 96 48 Z"
          fill="white"
          stroke="#1E1210"
          strokeWidth="2.5"
        />

        {/* Capas de líquido */}
        <clipPath id="cup-clip">
          <path d="M26 54 Q24 108 34 114 Q60 122 86 114 Q96 108 94 54 Z" />
        </clipPath>
        <g clipPath="url(#cup-clip)">
          <rect x="24" y={116 - espressoH} width="72" height={espressoH} fill={coffee.color} />
          {coffee.water && (
            <rect x="24" y={116 - espressoH - waterH} width="72" height={waterH} fill="#c4846e" opacity="0.7" />
          )}
          {hasMilk && milkH > 0 && (
            <rect x="24" y={116 - espressoH - waterH - milkH} width="72" height={milkH} fill={milkColor} />
          )}
          {hasMilk && foamH > 0 && (
            <rect x="24" y={116 - espressoH - waterH - milkH - foamH} width="72" height={foamH} fill="white" opacity="0.9" />
          )}
        </g>

        {/* Cup rim */}
        <ellipse cx="60" cy="48" rx="36" ry="7" fill="white" stroke="#1E1210" strokeWidth="2.5" />
        {/* Handle */}
        <path
          d="M96 68 Q116 68 116 86 Q116 104 96 100"
          stroke="#1E1210"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Steam lines */}
        <path d="M46 36 Q44 28 46 20" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M60 32 Q58 22 60 14" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M74 36 Q72 28 74 20" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      </svg>

      {/* Leyenda de capas */}
      <div className="mt-2 flex flex-col gap-1 text-[0.7rem] font-nunito font-bold text-textMuted w-full max-w-[160px]">
        {foamH > 0 && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded bg-white border border-border shrink-0" />Espuma</div>}
        {milkH > 0 && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: milkColor, border: '1px solid #1E1210' }} />Leche</div>}
        {waterH > 0 && <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: '#c4846e', border: '1px solid #1E1210' }} />Agua</div>}
        <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded shrink-0" style={{ background: coffee.color, border: '1px solid #1E1210' }} />Espresso</div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function CoffeeSimulator() {
  const [selectedCoffee, setSelectedCoffee] = useState<string>('cappuccino');
  const [selectedMilk, setSelectedMilk] = useState<string>('entera');
  const [tempMode, setTempMode] = useState<'hot' | 'iced'>('hot');
  const [prepared, setPrepared] = useState(false);
  const [preparing, setPreparing] = useState(false);

  const coffee = COFFEES.find((c) => c.id === selectedCoffee)!;
  const milk = MILKS.find((m) => m.id === selectedMilk)!;
  const hasMilk = coffee.steamedMilk > 0 || coffee.milkFoam > 0;
  const isIced = tempMode === 'iced';

  function prepare() {
    setPreparing(true);
    setPrepared(false);
    setTimeout(() => {
      setPreparing(false);
      setPrepared(true);
    }, 1200);
  }

  const resultText = hasMilk
    ? `${coffee.name} ${isIced ? 'helado' : ''} con leche de ${milk.name.toLowerCase()}`.trim()
    : `${coffee.name}${isIced ? ' helado' : ''}`;

  return (
    <div className="rounded-[24px] border-4 border-border bg-white shadow-neo-lg overflow-hidden">
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between gap-3 transition-colors ${isIced ? 'bg-[#0c2a3d]' : 'bg-[#2b1d1b]'}`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>{isIced ? '🧊' : '☕'}</span>
          <div>
            <h3 className="m-0 font-nunito font-black text-white text-lg">Preparador de café</h3>
            <p className="m-0 font-nunito font-bold text-white/70 text-xs">
              {isIced ? 'Bebida fría sobre hielo con pajita' : 'Elegí tu bebida y tipo de leche'}
            </p>
          </div>
        </div>
        {/* Toggle Hot / Ice */}
        <div className="inline-flex rounded-xl border-2 border-white/20 bg-white/10 p-1">
          <button
            type="button"
            onClick={() => { setTempMode('hot'); setPrepared(false); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-nunito font-extrabold text-sm transition-all ${
              !isIced ? 'bg-[#c4936a] text-white shadow-sm' : 'text-white/60 hover:text-white/90'
            }`}
          >
            <span aria-hidden>🔥</span> Hot
          </button>
          <button
            type="button"
            onClick={() => { setTempMode('iced'); setPrepared(false); }}
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
          {/* Selector de café */}
          <div>
            <p className="font-nunito font-extrabold text-textSecondary text-sm uppercase tracking-widest mb-2">
              Tipo de café
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COFFEES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { setSelectedCoffee(c.id); setPrepared(false); }}
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

          {/* Selector de leche */}
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
                  onClick={() => { setSelectedMilk(m.id); setPrepared(false); }}
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

          {/* Descripción del café seleccionado */}
          <div className="rounded-xl border-2 border-border bg-tertiary/30 px-4 py-3 flex flex-col gap-2">
            <p className="m-0 font-nunito font-bold text-textSecondary text-sm leading-relaxed">
              <strong className="text-textPrimary">{coffee.name}:</strong> {coffee.description}
            </p>
            {hasMilk && (
              <p className="m-0 font-nunito font-bold text-textMuted text-xs">
                <strong className="text-textSecondary">Leche de {milk.name.toLowerCase()}:</strong> {milk.note}
              </p>
            )}
            {/* Gramos de café y agua */}
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
                    {coffee.waterMl} ml para extracción
                    {coffee.extraWaterMl > 0 && (
                      <> + {coffee.extraWaterMl} ml de agua caliente</>
                    )}
                    {coffee.milkMl > 0 && (
                      <> · {coffee.milkMl} ml de leche</>
                    )}
                  </p>
                  <p className="m-0 font-nunito font-bold text-textMuted text-xs mt-0.5">
                    {coffee.extraWaterMl > 0
                      ? `Total: ${coffee.waterMl + coffee.extraWaterMl} ml en taza`
                      : coffee.milkMl > 0
                        ? `Total: ${coffee.waterMl + coffee.milkMl} ml en taza`
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

          {/* Resultado */}
          {prepared && !preparing && (
            <div className={`rounded-xl border-[3px] px-4 py-3 text-center font-nunito font-black text-textPrimary text-base animate-bounce-once ${
              isIced ? 'border-[#7dd3fc] bg-[#f0f8ff]' : 'border-[#d4a574] bg-[#fff8f0]'
            }`}>
              ¡Listo! Tu <strong style={{ color: coffee.color }}>{resultText}</strong> está servido. {isIced ? '🧊' : '☕'}
            </div>
          )}
        </div>

        {/* Visualización de la taza */}
        <div className="flex flex-col items-center justify-start pt-2 min-w-[140px]">
          <CupVisualization coffee={coffee} milkId={selectedMilk} isIced={isIced} />
        </div>
      </div>
    </div>
  );
}
