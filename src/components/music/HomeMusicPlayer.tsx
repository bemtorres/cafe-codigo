import { useCallback, useEffect, useRef, useState } from 'react';
import type { HomeMusicTrack } from '../../lib/homeMusicPlaylist';
import MusicAmbienceBackdrop from './MusicAmbienceBackdrop';

const LEVEL_BARS = 36;
const CANVAS_H = 80;

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type LevelsCanvasProps = {
  playing: boolean;
  analyser: AnalyserNode | null;
  fakeMode: boolean;
};

function MusicLevelsCanvas({ playing, analyser, fakeMode }: LevelsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const dataRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.floor(CANVAS_H * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${CANVAS_H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.fillStyle = '#1a1412';
      ctx.fillRect(0, 0, w, h);

      let levels: number[] = [];
      if (playing && analyser && !fakeMode) {
        if (!dataRef.current || dataRef.current.length !== analyser.frequencyBinCount) {
          dataRef.current = new Uint8Array(analyser.frequencyBinCount);
        }
        const data = dataRef.current;
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < LEVEL_BARS; i++) {
          const idx = Math.min(data.length - 1, Math.floor(((i + 0.5) / LEVEL_BARS) * data.length));
          levels.push(Math.max(0.06, data[idx]! / 255));
        }
      } else if (playing && fakeMode) {
        phaseRef.current += 0.12;
        const t = phaseRef.current;
        for (let i = 0; i < LEVEL_BARS; i++) {
          const wobble = Math.sin(t * 2.4 + i * 0.35) * 0.15;
          const base = 0.2 + Math.sin(t * 1.1 + i * 0.5) * 0.35 + wobble;
          levels.push(Math.min(1, Math.max(0.08, base + Math.random() * 0.12)));
        }
      } else {
        /* Pausado: barras casi quietas para que el movimiento se note al dar play */
        phaseRef.current += 0.015;
        const t = phaseRef.current;
        for (let i = 0; i < LEVEL_BARS; i++) {
          levels.push(0.06 + Math.sin(t * 0.35 + i * 0.45) * 0.02);
        }
      }

      const gap = 2;
      const barW = Math.max(2, (w - gap * (LEVEL_BARS - 1)) / LEVEL_BARS);
      const pad = 6;
      const maxBar = h - pad * 2;

      for (let i = 0; i < LEVEL_BARS; i++) {
        const bh = levels[i]! * maxBar;
        const x = i * (barW + gap);
        const y = h - pad - bh;
        const g = ctx.createLinearGradient(x, y, x, h - pad);
        g.addColorStop(0, '#45B3E0');
        g.addColorStop(1, '#EF476F');
        ctx.fillStyle = g;
        const r = Math.min(3, barW / 2);
        ctx.beginPath();
        ctx.roundRect(x, y, barW, bh, r);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [playing, analyser, fakeMode]);

  return (
    <div
      className="min-w-0 flex-1"
      role="img"
      aria-label={playing ? 'Niveles de audio activos' : 'Niveles en reposo; pulsá play para animar'}
    >
      <canvas
        ref={canvasRef}
        className="block h-[80px] w-full rounded-xl border-2 border-border shadow-inner"
        aria-hidden
      />
    </div>
  );
}

type Props = {
  tracks: HomeMusicTrack[];
};

export default function HomeMusicPlayer({ tracks }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playingRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [fakeVisualizer, setFakeVisualizer] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  playingRef.current = playing;
  const volumeRef = useRef(volume);
  volumeRef.current = volume;

  const current = tracks[index];
  const hasTracks = tracks.length > 0;

  const playAt = useCallback(
    (i: number) => {
      const next = ((i % tracks.length) + tracks.length) % tracks.length;
      setIndex(next);
      setPlaying(true);
    },
    [tracks.length],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasTracks) return;

    let ctx: AudioContext | null = null;
    try {
      ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      setAnalyserNode(analyser);
      setFakeVisualizer(false);
    } catch {
      setFakeVisualizer(true);
      setAnalyserNode(null);
      if (ctx) void ctx.close();
    }

    const resumeOnPlay = () => {
      const c = audioCtxRef.current;
      if (c?.state === 'suspended') void c.resume();
    };
    audio.addEventListener('play', resumeOnPlay);

    return () => {
      audio.removeEventListener('play', resumeOnPlay);
      setAnalyserNode(null);
      setFakeVisualizer(false);
      if (audioCtxRef.current) {
        void audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [hasTracks]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !current) return;
    a.volume = volumeRef.current;
    a.src = current.src;
    const onCanPlay = () => {
      if (playingRef.current) void a.play().catch(() => setPlaying(false));
    };
    a.addEventListener('canplay', onCanPlay);
    return () => a.removeEventListener('canplay', onCanPlay);
  }, [current?.src, current?.id]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onMeta = () => setDuration(a.duration || 0);
    const onTime = () => setCurrentTime(a.currentTime);
    const onEnded = () => {
      if (tracks.length <= 1) {
        setPlaying(false);
        setCurrentTime(0);
        return;
      }
      setIndex((prev) => (prev + 1) % tracks.length);
      setPlaying(true);
    };
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('ended', onEnded);
    return () => {
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('ended', onEnded);
    };
  }, [tracks.length]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !current) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const seek = (ratio: number) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    a.currentTime = Math.max(0, Math.min(duration, ratio * duration));
    setCurrentTime(a.currentTime);
  };

  if (!hasTracks) {
    return (
      <div className="rounded-[24px] border-4 border-dashed border-border bg-tertiary/40 p-6 text-center shadow-neo">
        <p className="m-0 font-nunito font-black text-textPrimary">Playlist vacía</p>
        <p className="mt-2 mb-0 font-nunito text-sm font-[650] text-textSecondary">
          Sumá archivos <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">.mp3</code>,{' '}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">.m4a</code>,{' '}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">.ogg</code> o{' '}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">.wav</code> en{' '}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">src/assets/music/</code>. Opcional: editá{' '}
          <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">playlist.json</code> para título y artista.
        </p>
      </div>
    );
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <>
      <MusicAmbienceBackdrop playing={playing} analyser={analyserNode} fakeMode={fakeVisualizer} />
    <div className="rounded-[24px] border-4 border-border bg-white p-4 sm:p-6 shadow-neo-lg">
      <audio ref={audioRef} preload="metadata" className="hidden" crossOrigin="anonymous" />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 shrink-0 flex-col rounded-2xl border-[3px] border-border bg-linear-to-br from-secondary to-tertiary p-4 sm:p-6 text-center shadow-neo lg:min-w-[min(100%,22rem)] lg:flex-1">
          <p className="mb-3 m-0 font-nunito text-xs font-black uppercase tracking-wider text-textMuted">
            Sonido ambiente
          </p>
          <div className="flex w-full items-stretch gap-3 sm:gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className={`flex h-21 w-21 shrink-0 items-center justify-center self-center rounded-full border-[3px] border-border bg-[#2b1d1b] font-nunito text-3xl text-white shadow-neo transition-transform hover:-translate-y-0.5 sm:h-20 sm:w-20 sm:text-4xl ${playing ? 'ring-2 ring-success/60 ring-offset-2 ring-offset-white' : ''}`}
              aria-pressed={playing}
              aria-label={playing ? 'Pausar música' : 'Prender música: reproducir'}
            >
              <span aria-hidden="true">{playing ? '⏸' : '▶'}</span>
            </button>
            <MusicLevelsCanvas playing={playing} analyser={analyserNode} fakeMode={fakeVisualizer} />
          </div>
          {!playing ? (
            <p className="mt-3 m-0 font-nunito text-[0.7rem] font-bold text-textSecondary sm:text-xs">
              Tocá play: al lado se mueven los niveles con la música.
            </p>
          ) : null}
          <p className="mt-3 m-0 max-w-full truncate font-nunito font-black text-textPrimary" title={current?.title}>
            {current?.title}
          </p>
          {current?.artist ? (
            <p className="mt-1 m-0 max-w-full truncate text-sm font-nunito font-bold text-textMuted">{current.artist}</p>
          ) : null}
          <p className="mt-2 m-0 font-mono text-xs font-bold text-textMuted" aria-live="polite">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>

        <div className="min-w-0 flex-1 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <button
              type="button"
              onClick={() => playAt(index - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-tertiary font-nunito text-lg font-black text-textPrimary shadow-neo hover:-translate-y-0.5 transition-transform"
              aria-label="Pista anterior"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-11 min-w-30 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-white px-4 font-nunito text-sm font-black text-textPrimary shadow-neo hover:-translate-y-0.5 transition-transform"
              aria-label={playing ? 'Pausar' : 'Reproducir'}
            >
              <span aria-hidden="true">{playing ? '⏸' : '▶'}</span>
              {playing ? 'Pausar' : 'Play'}
            </button>
            <button
              type="button"
              onClick={() => playAt(index + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-border bg-tertiary font-nunito text-lg font-black text-textPrimary shadow-neo hover:-translate-y-0.5 transition-transform"
              aria-label="Pista siguiente"
            >
              ⏭
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="home-music-progress" className="sr-only">
              Progreso de reproducción
            </label>
            <input
              id="home-music-progress"
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-info"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-nunito text-xs font-bold text-textMuted shrink-0" id="home-music-vol-label">
              Vol
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer accent-info"
              aria-labelledby="home-music-vol-label"
            />
          </div>

          <div>
            <p className="mb-2 font-nunito text-xs font-black uppercase tracking-wider text-textMuted">Playlist</p>
            <ul className="m-0 max-h-48 list-none space-y-1 overflow-y-auto rounded-xl border-2 border-border bg-primary/80 p-2 pr-1">
              {tracks.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setPlaying(true);
                      queueMicrotask(() => {
                        const el = audioRef.current;
                        if (el) void el.play().catch(() => setPlaying(false));
                      });
                    }}
                    className={`flex w-full items-center gap-2 rounded-lg border-2 px-3 py-2 text-left font-nunito text-sm font-bold transition-colors ${
                      i === index
                        ? 'border-info bg-tertiary text-textPrimary'
                        : 'border-transparent bg-white/60 text-textSecondary hover:border-border hover:bg-white'
                    }`}
                  >
                    <span className="w-6 shrink-0 text-center font-mono text-xs opacity-70">{i + 1}</span>
                    <span className="min-w-0 flex-1 truncate">
                      {t.title}
                      {t.artist ? <span className="block truncate text-xs font-[650] text-textMuted">{t.artist}</span> : null}
                    </span>
                    {i === index && playing ? <span className="shrink-0 text-xs">▶</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
