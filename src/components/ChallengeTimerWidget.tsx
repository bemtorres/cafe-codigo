import React, { useState, useEffect, useRef } from 'react';

type TimeUnit = 'min' | 'sec';

interface FreePos {
  x: number;
  y: number;
}

const STORAGE_KEY_CONFIG = 'challenge_timer_config_v2';

export default function ChallengeTimerWidget() {
  const [targetTime, setTargetTime] = useState<number>(300); // 5 min default (en segundos)
  const [unit, setUnit] = useState<TimeUnit>('min');
  const [inputValue, setInputValue] = useState<string>('5');
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Tamaño ajustable (escala 0.7x a 1.5x)
  const [scale, setScale] = useState<number>(1.0);
  
  // Posición libre (coordenadas x, y en pixeles)
  const [pos, setPos] = useState<FreePos | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  // Estado de Arrastrar (Drag and Drop)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Cargar posición inicial o guardada
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.targetTime) setTargetTime(data.targetTime);
        if (data.unit) setUnit(data.unit);
        if (data.inputValue) setInputValue(data.inputValue);
        if (data.scale) setScale(data.scale);
        if (data.pos && typeof data.pos.x === 'number' && typeof data.pos.y === 'number') {
          setPos(data.pos);
        } else {
          setPos({ x: window.innerWidth - 240, y: window.innerHeight - 100 });
        }
        setTimeLeft(data.targetTime || 300);
      } else {
        setPos({ x: window.innerWidth - 240, y: window.innerHeight - 100 });
      }
    } catch {
      setPos({ x: window.innerWidth - 240, y: window.innerHeight - 100 });
    }
  }, []);

  // Guardar configuración
  const saveConfig = (newPos?: FreePos, newScale?: number, newUnit?: TimeUnit, newVal?: string, newTarget?: number) => {
    try {
      const config = {
        pos: newPos || pos,
        scale: newScale !== undefined ? newScale : scale,
        unit: newUnit || unit,
        inputValue: newVal !== undefined ? newVal : inputValue,
        targetTime: newTarget !== undefined ? newTarget : targetTime
      };
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch { /**/ }
  };

  // Temporizador Countdown
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(() => {});
      } catch { /**/ }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Lógica Drag and Drop (Mouse & Touch para móviles)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Si se hace clic en un botón o input, no arrastrar
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('.no-drag')) {
      return;
    }

    setIsDragging(true);
    hasMovedRef.current = false;
    const rect = widgetRef.current?.getBoundingClientRect();
    if (rect) {
      dragStartOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    hasMovedRef.current = true;
    let newX = e.clientX - dragStartOffset.current.x;
    let newY = e.clientY - dragStartOffset.current.y;

    // Limitar dentro de la pantalla
    const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 200);
    const maxY = window.innerHeight - (widgetRef.current?.offsetHeight || 80);

    newX = Math.max(10, Math.min(newX, maxX));
    newY = Math.max(10, Math.min(newY, maxY));

    const newPos = { x: newX, y: newY };
    setPos(newPos);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch { /**/ }
    if (pos) saveConfig(pos);
  };

  // Aplicar duración
  const applyNewTimer = () => {
    const val = parseFloat(inputValue) || 1;
    const totalSecs = unit === 'min' ? Math.round(val * 60) : Math.round(val);
    setTargetTime(totalSecs);
    setTimeLeft(totalSecs);
    setIsRunning(false);
    saveConfig(undefined, undefined, unit, inputValue, totalSecs);
  };

  const formatTime = (secs: number) => {
    if (unit === 'sec' && secs < 60) {
      return `${secs}s`;
    }
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  if (!pos) return null;

  // Estilos de posición libre
  const widgetStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    zIndex: 1050,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    touchAction: 'none', // Para soporte de arrastrar fluido en pantallas táctiles móviles
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'transform 0.15s ease-out'
  };

  const radius = 22;
  const circ = 2 * Math.PI * radius;
  const strokeDashoffset = circ - (timeLeft / Math.max(1, targetTime)) * circ;
  const isUrgent = timeLeft <= 30 && timeLeft > 0;

  return (
    <div
      style={widgetStyle}
      ref={widgetRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="select-none font-nunito"
    >
      {/* ── Control Mini / Barra Flotante Arrastrable ── */}
      <div
        style={{
          background: isUrgent ? '#fee2e2' : '#ffffff',
          border: `3px solid ${isUrgent ? '#dc2626' : '#1E1210'}`,
          borderRadius: 24,
          boxShadow: isDragging ? '8px 8px 0px #1E1210' : '4px 4px 0px #1E1210',
          padding: '6px 12px 6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'box-shadow 0.15s'
        }}
      >
        {/* Agarre visual para arrastrar */}
        <span style={{ fontSize: '1rem', opacity: 0.4, cursor: 'grab', paddingRight: 2 }} title="Mantén presionado para arrastrar">
          ⋮⋮
        </span>

        {/* Anillo de Progreso Circular */}
        <div style={{ position: 'relative', width: 46, height: 46, display: 'grid', placeItems: 'center' }}>
          <svg width="46" height="46" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="23" cy="23" r={radius} stroke="#E5E7EB" strokeWidth="4" fill="transparent" />
            <circle
              cx="23"
              cy="23"
              r={radius}
              stroke={isUrgent ? '#dc2626' : '#e65100'}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circ}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s linear' }}
            />
          </svg>
          <span style={{ position: 'absolute', fontSize: '1.1rem' }}>
            {timeLeft === 0 ? '🔔' : isRunning ? '⏱️' : '⏳'}
          </span>
        </div>

        {/* Display del Tiempo */}
        <div
          style={{ display: 'flex', flexDirection: 'column', minWidth: 60, cursor: 'pointer' }}
          onClick={() => { if (!hasMovedRef.current) setIsRunning(!isRunning); }}
        >
          <span style={{ fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase', color: '#e65100', letterSpacing: '0.05em' }}>
            {isRunning ? 'En marcha' : timeLeft === 0 ? '¡Tiempo!' : 'Pausado'}
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, lineHeight: 1, color: isUrgent ? '#dc2626' : '#1E1210' }}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Botones de Control rápido */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="no-drag">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsRunning(!isRunning); }}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '2px solid #1E1210',
              background: isRunning ? '#ffe0b2' : '#06d6a0',
              color: '#1E1210',
              fontWeight: 900,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center'
            }}
            title={isRunning ? 'Pausar' : 'Iniciar'}
          >
            {isRunning ? '❚❚' : '▶'}
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setTimeLeft(targetTime); setIsRunning(false); }}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '2px solid #1E1210',
              background: '#f3f4f6',
              color: '#1E1210',
              fontWeight: 900,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center'
            }}
            title="Reiniciar"
          >
            ↺
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '2px solid #1E1210',
              background: showSettings ? '#e65100' : '#ffffff',
              color: showSettings ? '#ffffff' : '#1E1210',
              fontWeight: 900,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center'
            }}
            title="Configurar Reloj"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* ── Panel de Ajustes ── */}
      {showSettings && (
        <div
          className="no-drag"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: 8,
            width: 230,
            background: '#ffffff',
            border: '3px solid #1E1210',
            borderRadius: 16,
            boxShadow: '6px 6px 0px #1E1210',
            padding: '12px 14px',
            zIndex: 1100
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#e65100' }}>⚙️ Ajustes del Reloj</span>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              style={{ background: 'none', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              ✕
            </button>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4b5563', display: 'block', marginBottom: 4 }}>
              DURACIÓN Y UNIDAD:
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                type="number"
                min="1"
                max="999"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  width: 60,
                  padding: '4px 6px',
                  borderRadius: 8,
                  border: '2px solid #1E1210',
                  fontWeight: 900,
                  textAlign: 'center',
                  fontSize: '0.9rem'
                }}
              />
              <button
                type="button"
                onClick={() => setUnit('min')}
                style={{
                  flex: 1,
                  padding: '4px 6px',
                  borderRadius: 8,
                  border: '2px solid #1E1210',
                  background: unit === 'min' ? '#e65100' : '#f3f4f6',
                  color: unit === 'min' ? '#fff' : '#1E1210',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Minutos
              </button>
              <button
                type="button"
                onClick={() => setUnit('sec')}
                style={{
                  flex: 1,
                  padding: '4px 6px',
                  borderRadius: 8,
                  border: '2px solid #1E1210',
                  background: unit === 'sec' ? '#e65100' : '#f3f4f6',
                  color: unit === 'sec' ? '#fff' : '#1E1210',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Segundos
              </button>
            </div>
            <button
              type="button"
              onClick={applyNewTimer}
              style={{
                width: '100%',
                marginTop: 6,
                padding: '5px',
                borderRadius: 8,
                border: '2px solid #1E1210',
                background: '#06d6a0',
                color: '#1E1210',
                fontWeight: 900,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              ✓ Aplicar Tiempo
            </button>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4b5563', display: 'block', marginBottom: 4 }}>
              TAMAÑO DEL RELOJ: {Math.round(scale * 100)}%
            </label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => { const s = Math.max(0.7, scale - 0.1); setScale(s); saveConfig(undefined, s); }}
                style={{ width: 28, height: 28, borderRadius: 6, border: '2px solid #1E1210', background: '#f3f4f6', fontWeight: 900, cursor: 'pointer' }}
              >
                -
              </button>
              <input
                type="range"
                min="0.7"
                max="1.5"
                step="0.05"
                value={scale}
                onChange={(e) => { const s = parseFloat(e.target.value); setScale(s); saveConfig(undefined, s); }}
                style={{ flex: 1, accentColor: '#e65100' }}
              />
              <button
                type="button"
                onClick={() => { const s = Math.min(1.5, scale + 0.1); setScale(s); saveConfig(undefined, s); }}
                style={{ width: 28, height: 28, borderRadius: 6, border: '2px solid #1E1210', background: '#f3f4f6', fontWeight: 900, cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
