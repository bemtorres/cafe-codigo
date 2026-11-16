import { useEffect, useRef, useState } from 'react';

// ─── Constantes ───────────────────────────────────────────────────────────────

const CAFE_STORAGE_KEY     = 'cafe_del_dia_current';
const POSITION_STORAGE_KEY = 'cafe_timer_position';
const CAFE_EXPIRE_MS       = 30 * 60 * 1000;

type Side     = 'left' | 'right';
type Vertical = 'top' | 'center' | 'bottom';
type WidgetPosition = { side: Side; vertical: Vertical };

const DEFAULT_POS: WidgetPosition = { side: 'left', vertical: 'center' };

type StoredCafe = {
  coffeeId:   string;
  milkId:     string;
  tempMode:   'hot' | 'iced';
  preparedAt: number;
};

const COFFEES_MAP: Record<string, { emoji: string; arc: string }> = {
  espresso:   { emoji: '☕', arc: '#c87941' },
  americano:  { emoji: '🫖', arc: '#c08a6a' },
  cappuccino: { emoji: '🍵', arc: '#d4a070' },
  latte:      { emoji: '🥛', arc: '#e8b88a' },
  cortado:    { emoji: '🫗', arc: '#b87040' },
  macchiato:  { emoji: '☕', arc: '#a85e2a' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readCafe(): (StoredCafe & { secsLeft: number }) | null {
  try {
    const raw = localStorage.getItem(CAFE_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredCafe;
    const ms = Math.max(0, CAFE_EXPIRE_MS - (Date.now() - data.preparedAt));
    if (ms === 0) {
      localStorage.removeItem(CAFE_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('cafe-del-dia-update'));
      return null;
    }
    return { ...data, secsLeft: Math.round(ms / 1000) };
  } catch { return null; }
}

function readPosition(): WidgetPosition {
  try {
    const raw = localStorage.getItem(POSITION_STORAGE_KEY);
    if (!raw) return DEFAULT_POS;
    return JSON.parse(raw) as WidgetPosition;
  } catch { return DEFAULT_POS; }
}

function savePosition(pos: WidgetPosition) {
  try { localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(pos)); } catch { /**/ }
}

function posToStyle(pos: WidgetPosition): React.CSSProperties {
  const style: React.CSSProperties = { position: 'fixed', zIndex: 1000 };
  style[pos.side] = '1.25rem';
  if (pos.vertical === 'top')    { style.top    = '5.5rem'; }
  if (pos.vertical === 'bottom') { style.bottom = '5.5rem'; }
  if (pos.vertical === 'center') { style.top = '50%'; style.transform = 'translateY(-50%)'; }
  return style;
}

// ─── Picker de posición ───────────────────────────────────────────────────────

const POS_OPTS: { side: Side; vertical: Vertical; sym: string; label: string }[] = [
  { side: 'left',  vertical: 'top',    sym: '↖', label: 'Izq · Arriba'  },
  { side: 'right', vertical: 'top',    sym: '↗', label: 'Der · Arriba'  },
  { side: 'left',  vertical: 'center', sym: '←', label: 'Izq · Centro'  },
  { side: 'right', vertical: 'center', sym: '→', label: 'Der · Centro'  },
  { side: 'left',  vertical: 'bottom', sym: '↙', label: 'Izq · Abajo'   },
  { side: 'right', vertical: 'bottom', sym: '↘', label: 'Der · Abajo'   },
];

function PositionPicker({
  current,
  onChange,
}: {
  current: WidgetPosition;
  onChange: (p: WidgetPosition) => void;
}) {
  return (
    <div
      style={{
        background: '#fffaf5',
        border: '3px solid #1E1210',
        boxShadow: '4px 4px 0px #1E1210',
        borderRadius: 16,
        padding: '10px 10px 8px',
        width: 118,
      }}
    >
      <p
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8a6a5a',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        Posición
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {POS_OPTS.map((p) => {
          const active = p.side === current.side && p.vertical === current.vertical;
          return (
            <button
              key={`${p.side}-${p.vertical}`}
              type="button"
              title={p.label}
              onClick={() => onChange(p)}
              style={{
                height: 32,
                borderRadius: 8,
                border: `2px solid ${active ? '#1E1210' : '#d4b9a8'}`,
                background: active ? '#2b1d1b' : '#f5ede5',
                color: active ? '#fdf6e9' : '#5a3828',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: active ? '2px 2px 0px #1E1210' : 'none',
                transition: 'all .12s',
              }}
            >
              {p.sym}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Widget principal ─────────────────────────────────────────────────────────

const SIZE = 88;
const R    = 36;
const CIRC = 2 * Math.PI * R;

export default function CoffeeTimerWidget() {
  const [cafe,       setCafe]       = useState<(StoredCafe & { secsLeft: number }) | null>(null);
  const [pos,        setPos]        = useState<WidgetPosition>(DEFAULT_POS);
  const [showPicker, setShowPicker] = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setCafe(readCafe());
    setPos(readPosition());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => {
      const c = readCafe();
      setCafe(c);
      if (!c) setShowPicker(false);
    }, 1000);
    return () => clearInterval(id);
  }, [mounted]);

  useEffect(() => {
    const sync = () => setCafe(readCafe());
    window.addEventListener('cafe-del-dia-update', sync);
    return () => window.removeEventListener('cafe-del-dia-update', sync);
  }, []);

  useEffect(() => {
    if (!showPicker) return;
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPicker]);

  if (!mounted || !cafe) return null;

  const info    = COFFEES_MAP[cafe.coffeeId] ?? { emoji: '☕', arc: '#c87941' };
  const mins    = Math.floor(cafe.secsLeft / 60);
  const secs    = cafe.secsLeft % 60;
  const urgent  = cafe.secsLeft <= 300;
  const time    = `${mins}:${String(secs).padStart(2, '0')}`;
  const emoji   = cafe.tempMode === 'iced' ? '🧊' : info.emoji;
  const arcColor = urgent ? '#ef4444' : info.arc;
  const dash    = (cafe.secsLeft / (CAFE_EXPIRE_MS / 1000)) * CIRC;

  // Offset del picker
  const pickerSide: React.CSSProperties = pos.side === 'left'
    ? { left: SIZE + 12, right: 'auto' }
    : { right: SIZE + 12, left: 'auto' };

  return (
    <div style={posToStyle(pos)} className="select-none">
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>

        {/* ── Picker flotante ── */}
        {showPicker && (
          <div
            ref={pickerRef}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              ...pickerSide,
              zIndex: 10,
            }}
          >
            <PositionPicker
              current={pos}
              onChange={(p) => { setPos(p); savePosition(p); setShowPicker(false); }}
            />
          </div>
        )}

        {/* ── Círculo principal ── */}
        <a
          href="/cafe-del-dia/"
          aria-label={`Café del día — quedan ${time}`}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: SIZE,
            height: SIZE,
            borderRadius: '50%',
            background: urgent
              ? 'radial-gradient(circle at 38% 38%, #3d1010, #1a0808)'
              : 'radial-gradient(circle at 38% 38%, #3d2318, #1a0e0a)',
            border: '3px solid #1E1210',
            boxShadow: urgent
              ? '5px 5px 0px #1E1210, 0 0 18px rgba(239,68,68,0.3)'
              : '5px 5px 0px #1E1210',
            textDecoration: 'none',
            transition: 'transform .15s, box-shadow .15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translate(-2px,-2px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = urgent
              ? '7px 7px 0px #1E1210, 0 0 22px rgba(239,68,68,0.35)'
              : '7px 7px 0px #1E1210';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = '';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = urgent
              ? '5px 5px 0px #1E1210, 0 0 18px rgba(239,68,68,0.3)'
              : '5px 5px 0px #1E1210';
          }}
        >
          {/* Arco de progreso */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden
            style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
          >
            {/* Track */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={6}
            />
            {/* Progreso */}
            <circle
              cx={SIZE / 2} cy={SIZE / 2} r={R}
              fill="none"
              stroke={arcColor}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={`${dash} ${CIRC}`}
              style={{ transition: 'stroke-dasharray 1s linear, stroke .4s' }}
            />
          </svg>

          {/* Contenido */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 26, lineHeight: 1 }} aria-hidden>{emoji}</span>
            <span
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 900,
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                color: urgent ? '#fca5a5' : '#fdf6e9',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {time}
            </span>
          </div>

          {/* Pulso urgente */}
          {urgent && (
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#ef4444',
                opacity: 0.15,
                animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
              }}
            />
          )}
        </a>

        {/* ── Botón posición ── */}
        <button
          type="button"
          aria-label="Cambiar posición del widget"
          title="Mover"
          onClick={() => setShowPicker((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 20,
            borderRadius: 20,
            border: '2px solid #1E1210',
            background: showPicker ? '#2b1d1b' : '#f5ede5',
            color: showPicker ? '#fdf6e9' : '#5a3828',
            fontSize: '0.65rem',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '2px 2px 0px #1E1210',
            transition: 'background .12s, color .12s',
            letterSpacing: 1,
          }}
        >
          ⊹
        </button>
      </div>

      {/* Keyframe del ping inline */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
