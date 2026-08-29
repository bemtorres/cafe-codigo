import React, { useState, useEffect, useRef } from 'react';

type TimerMode = 'countdown' | 'stopwatch';
type TimeUnit = 'min' | 'sec';

interface FreePos {
  x: number;
  y: number;
}

const STORAGE_KEY_GAME_TIMER = 'aprende_game_timer_v1';

export default function GameTimerWidget() {
  // Modo de reloj
  const [mode, setMode] = useState<TimerMode>('countdown');
  
  // Cuenta regresiva
  const [targetTime, setTargetTime] = useState<number>(300); // 5 min default
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [inputValue, setInputValue] = useState<string>('5');
  const [unit, setUnit] = useState<TimeUnit>('min');

  // Cronómetro / Speedrun
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);

  // Estado de ejecución
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Escala y posición
  const [scale, setScale] = useState<number>(1.0);
  const [pos, setPos] = useState<FreePos | null>(null);

  // Drag and Drop
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GAME_TIMER);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.targetTime) setTargetTime(data.targetTime);
        if (data.unit) setUnit(data.unit);
        if (data.inputValue) setInputValue(data.inputValue);
        if (data.scale) setScale(data.scale);
        if (data.mode) setMode(data.mode);
        if (data.soundEnabled !== undefined) setSoundEnabled(data.soundEnabled);
        if (data.isMinimized !== undefined) setIsMinimized(data.isMinimized);

        if (data.pos && typeof data.pos.x === 'number' && typeof data.pos.y === 'number') {
          setPos(data.pos);
        } else {
          setPos({ x: Math.max(20, window.innerWidth - 280), y: Math.max(20, window.innerHeight - 130) });
        }
        setTimeLeft(data.targetTime || 300);
      } else {
        setPos({ x: Math.max(20, window.innerWidth - 280), y: Math.max(20, window.innerHeight - 130) });
      }
    } catch {
      setPos({ x: Math.max(20, window.innerWidth - 280), y: Math.max(20, window.innerHeight - 130) });
    }
  }, []);

  // Guardar configuración
  const saveConfig = (newObj?: Partial<{
    pos: FreePos;
    scale: number;
    unit: TimeUnit;
    inputValue: string;
    targetTime: number;
    mode: TimerMode;
    soundEnabled: boolean;
    isMinimized: boolean;
  }>) => {
    try {
      const current = {
        pos: pos,
        scale: scale,
        unit: unit,
        inputValue: inputValue,
        targetTime: targetTime,
        mode: mode,
        soundEnabled: soundEnabled,
        isMinimized: isMinimized,
        ...newObj,
      };
      localStorage.setItem(STORAGE_KEY_GAME_TIMER, JSON.stringify(current));
    } catch { /**/ }
  };

  // Motor de tiempo
  useEffect(() => {
    let interval: any = null;

    if (isRunning) {
      if (mode === 'countdown') {
        if (timeLeft > 0) {
          interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000);
        } else {
          setIsRunning(false);
          if (soundEnabled) {
            try {
              const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
              audio.play().catch(() => {});
            } catch { /**/ }
          }
        }
      } else if (mode === 'stopwatch') {
        interval = setInterval(() => {
          setStopwatchTime((prev) => prev + 1);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, soundEnabled]);

  // Arrastrar (Pointer Events para mouse + táctil)
  const handlePointerDown = (e: React.PointerEvent) => {
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
        y: e.clientY - rect.top,
      };
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    hasMovedRef.current = true;
    let newX = e.clientX - dragStartOffset.current.x;
    let newY = e.clientY - dragStartOffset.current.y;

    const maxX = window.innerWidth - (widgetRef.current?.offsetWidth || 220);
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
    if (pos) saveConfig({ pos });
  };

  // Ajustes rápidos
  const setPresetTime = (minutes: number) => {
    setMode('countdown');
    const totalSecs = minutes * 60;
    setTargetTime(totalSecs);
    setTimeLeft(totalSecs);
    setInputValue(String(minutes));
    setUnit('min');
    setIsRunning(false);
    saveConfig({ mode: 'countdown', targetTime: totalSecs, inputValue: String(minutes), unit: 'min' });
  };

  const applyCustomTimer = () => {
    const val = parseFloat(inputValue) || 1;
    const totalSecs = unit === 'min' ? Math.round(val * 60) : Math.round(val);
    setTargetTime(totalSecs);
    setTimeLeft(totalSecs);
    setIsRunning(false);
    saveConfig({ targetTime: totalSecs, inputValue, unit });
    setShowSettings(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'countdown') {
      setTimeLeft(targetTime);
    } else {
      setStopwatchTime(0);
    }
  };

  const formatDisplayTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!pos) return null;

  const radius = 21;
  const circ = 2 * Math.PI * radius;
  const progressRatio = mode === 'countdown' ? (timeLeft / Math.max(1, targetTime)) : 1;
  const strokeDashoffset = circ - progressRatio * circ;
  const isUrgent = mode === 'countdown' && timeLeft <= 30 && timeLeft > 0;
  const isFinished = mode === 'countdown' && timeLeft === 0;

  const widgetStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    zIndex: 1050,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    touchAction: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
  };

  return (
    <div
      style={widgetStyle}
      ref={widgetRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="select-none font-nunito"
    >
      {/* ══ MINI WIDGET COMPRIMIDO ══ */}
      {isMinimized ? (
        <div
          onClick={() => { if (!hasMovedRef.current) { setIsMinimized(false); saveConfig({ isMinimized: false }); } }}
          className={`flex items-center gap-2 px-3 py-2 rounded-2xl border-2 shadow-2xl backdrop-blur-md cursor-pointer transition-all ${
            isUrgent
              ? 'bg-rose-950/95 border-rose-500 text-rose-300 shadow-[0_0_20px_#f43f5e]'
              : 'bg-[#0B132B]/95 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)]'
          }`}
        >
          <span className="text-base animate-pulse">{mode === 'stopwatch' ? '⚡' : isRunning ? '⏱️' : '⏳'}</span>
          <span className="font-['Orbitron'] font-black text-sm tracking-wider">
            {mode === 'countdown' ? formatDisplayTime(timeLeft) : formatDisplayTime(stopwatchTime)}
          </span>
          <span className="text-[0.65rem] opacity-60 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/40">HUD</span>
        </div>
      ) : (
        /* ══ PANEL COMPLETO GAMER TIMER ══ */
        <div
          className={`relative flex flex-col rounded-3xl border-2 backdrop-blur-xl p-3 shadow-2xl transition-all ${
            isFinished
              ? 'bg-rose-950/95 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.5)]'
              : isUrgent
              ? 'bg-rose-950/90 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-pulse'
              : 'bg-[#080E21]/95 border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.3)]'
          }`}
          style={{ width: 250 }}
        >
          {/* Header del Widget Gamer */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20 text-xs">
            <div className="flex items-center gap-1.5 font-['Orbitron'] font-black text-[0.68rem] tracking-wider text-cyan-400">
              <span className="text-xs">🎮</span>
              <span>GAMER CHRONO</span>
            </div>
            
            <div className="flex items-center gap-1.5 no-drag">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs transition-colors cursor-pointer ${
                  showSettings ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-cyan-300'
                }`}
                title="Configuración"
              >
                ⚙️
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsMinimized(true); saveConfig({ isMinimized: true }); }}
                className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Minimizar HUD"
              >
                _
              </button>
            </div>
          </div>

          {/* Cuerpo Central con Anillo Circular + Display */}
          <div className="flex items-center gap-3">
            {/* Anillo de Progreso */}
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <svg width="48" height="48" className="-rotate-90">
                <circle cx="24" cy="24" r={radius} stroke="#1e293b" strokeWidth="4" fill="transparent" />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke={isUrgent || isFinished ? '#f43f5e' : mode === 'stopwatch' ? '#a855f7' : '#06b6d4'}
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={circ}
                  strokeDashoffset={mode === 'countdown' ? strokeDashoffset : 0}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s linear' }}
                />
              </svg>
              <span className="absolute text-sm">
                {isFinished ? '💥' : mode === 'stopwatch' ? '⚡' : isRunning ? '⚔️' : '⏳'}
              </span>
            </div>

            {/* Texto de Tiempo */}
            <div
              className="flex-1 cursor-pointer"
              onClick={() => { if (!hasMovedRef.current) setIsRunning(!isRunning); }}
            >
              <span className="text-[0.62rem] font-extrabold uppercase tracking-widest block leading-tight text-cyan-400">
                {isFinished
                  ? '¡TIEMPO AGOTADO!'
                  : mode === 'stopwatch'
                  ? isRunning ? 'SPEEDRUN ACTIVO' : 'SPEEDRUN PAUSA'
                  : isRunning ? 'MISIÓN EN MARCHA' : 'EN ESPERA'}
              </span>
              <span
                className={`font-['Orbitron'] font-black text-2xl tracking-wider leading-none block mt-0.5 ${
                  isUrgent || isFinished ? 'text-rose-400' : mode === 'stopwatch' ? 'text-purple-300' : 'text-cyan-300'
                }`}
              >
                {mode === 'countdown' ? formatDisplayTime(timeLeft) : formatDisplayTime(stopwatchTime)}
              </span>
            </div>
          </div>

          {/* Botones de Control Play / Reset */}
          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 no-drag">
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-1.5 rounded-xl border font-['Orbitron'] font-black text-xs cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1 ${
                isRunning
                  ? 'bg-amber-600/90 hover:bg-amber-500 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              }`}
            >
              <span>{isRunning ? '❚❚' : '▶'}</span>
              <span>{isRunning ? 'Pausar' : 'Iniciar'}</span>
            </button>

            <button
              type="button"
              onClick={resetTimer}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 font-black text-xs cursor-pointer transition-colors"
              title="Reiniciar"
            >
              ↺
            </button>
          </div>

          {/* Selector Rápido de Presets */}
          <div className="grid grid-cols-4 gap-1 mt-2 no-drag">
            <button
              type="button"
              onClick={() => setPresetTime(3)}
              className={`py-1 rounded-lg border font-nunito font-extrabold text-[0.68rem] transition-colors cursor-pointer ${
                mode === 'countdown' && targetTime === 180
                  ? 'bg-cyan-600 border-cyan-400 text-white font-black'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300'
              }`}
            >
              3m
            </button>
            <button
              type="button"
              onClick={() => setPresetTime(5)}
              className={`py-1 rounded-lg border font-nunito font-extrabold text-[0.68rem] transition-colors cursor-pointer ${
                mode === 'countdown' && targetTime === 300
                  ? 'bg-cyan-600 border-cyan-400 text-white font-black'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300'
              }`}
            >
              5m
            </button>
            <button
              type="button"
              onClick={() => setPresetTime(10)}
              className={`py-1 rounded-lg border font-nunito font-extrabold text-[0.68rem] transition-colors cursor-pointer ${
                mode === 'countdown' && targetTime === 600
                  ? 'bg-cyan-600 border-cyan-400 text-white font-black'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300'
              }`}
            >
              10m
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('stopwatch');
                setIsRunning(false);
                saveConfig({ mode: 'stopwatch' });
              }}
              className={`py-1 rounded-lg border font-nunito font-extrabold text-[0.68rem] transition-colors cursor-pointer ${
                mode === 'stopwatch'
                  ? 'bg-purple-600 border-purple-400 text-white font-black shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-purple-500/50 hover:text-purple-300'
              }`}
            >
              ⚡ Run
            </button>
          </div>

          {/* ══ PANEL DE AJUSTES DESPLEGABLE ══ */}
          {showSettings && (
            <div className="mt-2.5 pt-2.5 border-t border-cyan-500/30 flex flex-col gap-2.5 text-xs no-drag bg-[#040814] -mx-3 -mb-3 p-3 rounded-b-3xl">
              <div className="flex items-center justify-between">
                <span className="font-['Orbitron'] font-black text-cyan-400 text-[0.72rem]">⚙️ Opciones de Reloj</span>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Duración Personalizada */}
              <div>
                <label className="text-[0.65rem] font-bold text-slate-400 block mb-1 uppercase">Duración personalizada:</label>
                <div className="flex gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-14 px-2 py-1 rounded-lg border border-slate-700 bg-slate-900 font-['Orbitron'] font-bold text-xs text-center text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setUnit('min')}
                    className={`flex-1 py-1 rounded-lg border text-[0.68rem] font-bold transition-colors cursor-pointer ${
                      unit === 'min' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Minutos
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('sec')}
                    className={`flex-1 py-1 rounded-lg border text-[0.68rem] font-bold transition-colors cursor-pointer ${
                      unit === 'sec' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Segundos
                  </button>
                </div>
                <button
                  type="button"
                  onClick={applyCustomTimer}
                  className="w-full mt-1.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-['Orbitron'] font-black text-[0.7rem] cursor-pointer shadow-sm transition-colors"
                >
                  ✓ Aplicar Tiempo
                </button>
              </div>

              {/* Sonido y Escala */}
              <div className="flex items-center justify-between pt-1.5 border-t border-slate-800">
                <span className="text-[0.68rem] text-slate-400 font-bold">Sonido de alarma</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => { setSoundEnabled(e.target.checked); saveConfig({ soundEnabled: e.target.checked }); }}
                    className="w-3.5 h-3.5 accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[0.7rem] text-slate-300">{soundEnabled ? 'ON 🔔' : 'OFF 🔇'}</span>
                </label>
              </div>

              <div className="pt-1.5 border-t border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[0.68rem] text-slate-400 font-bold">Escala HUD</span>
                  <span className="text-[0.68rem] font-['Orbitron'] font-bold text-cyan-400">{Math.round(scale * 100)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => { const s = Math.max(0.7, scale - 0.1); setScale(s); saveConfig({ scale: s }); }}
                    className="w-6 h-6 rounded bg-slate-900 border border-slate-700 text-white text-xs cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="0.7"
                    max="1.4"
                    step="0.05"
                    value={scale}
                    onChange={(e) => { const s = parseFloat(e.target.value); setScale(s); saveConfig({ scale: s }); }}
                    className="flex-1 accent-cyan-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => { const s = Math.min(1.4, scale + 0.1); setScale(s); saveConfig({ scale: s }); }}
                    className="w-6 h-6 rounded bg-slate-900 border border-slate-700 text-white text-xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
