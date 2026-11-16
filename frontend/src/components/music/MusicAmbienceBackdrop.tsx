import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  playing: boolean;
  analyser: AnalyserNode | null;
  fakeMode: boolean;
};

/**
 * Capa fija a pantalla completa: atenúa la iluminación y hace pulsar gradientes al ritmo del audio.
 * Debe quedar por debajo del contenido (z-index bajo); el layout de la portada usa z-15 en el contenedor.
 */
export default function MusicAmbienceBackdrop({ playing, analyser, fakeMode }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const glowARef = useRef<HTMLDivElement>(null);
  const glowBRef = useRef<HTMLDivElement>(null);
  const smoothRef = useRef(0);
  const phaseRef = useRef(0);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const mq =
      typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const reduced = () => mq?.matches ?? false;

    const tick = () => {
      if (cancelled) return;

      let energy = 0;
      if (playing) {
        if (reduced()) {
          energy = 0.14;
        } else if (analyser && !fakeMode) {
          if (!dataRef.current || dataRef.current.length !== analyser.frequencyBinCount) {
            dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
          }
          analyser.getByteFrequencyData(dataRef.current);
          const d = dataRef.current;
          let sum = 0;
          const bins = Math.min(10, d.length);
          for (let i = 0; i < bins; i++) sum += d[i]!;
          const raw = sum / bins / 255;
          energy = raw * 0.9 + 0.08;
        } else if (fakeMode) {
          phaseRef.current += 0.09;
          const t = phaseRef.current;
          energy =
            0.14 +
            Math.sin(t * 1.4) * 0.12 +
            Math.sin(t * 2.8) * 0.1 +
            Math.sin(t * 4.1 + 1) * 0.08;
        } else {
          phaseRef.current += 0.04;
          energy = 0.1 + Math.sin(phaseRef.current * 0.8) * 0.04;
        }
      }

      smoothRef.current = smoothRef.current * 0.42 + energy * 0.58;
      const pulse = Math.min(1, Math.max(0, smoothRef.current));
      const beat = Math.min(1, pulse * 1.15);

      const dim = dimRef.current;
      const ga = glowARef.current;
      const gb = glowBRef.current;
      const root = rootRef.current;

      if (root) {
        root.style.opacity = playing ? '1' : '0';
      }

      if (dim) {
        const baseA = 0.34 + beat * 0.26;
        const baseB = 0.48 + beat * 0.22;
        dim.style.background = `linear-gradient(
          165deg,
          rgba(12, 6, 18, ${baseA}) 0%,
          rgba(22, 10, 28, ${0.36 + beat * 0.2}) 38%,
          rgba(6, 14, 24, ${baseB}) 72%,
          rgba(4, 8, 16, ${0.52 + beat * 0.18}) 100%
        )`;
      }

      if (!reduced() && ga && gb) {
        const s = 1 + beat * 0.042;
        const tx = beat * 5;
        const ty = beat * -3.5;
        ga.style.transform = `scale(${s}) translate(${tx}px, ${ty}px)`;
        ga.style.opacity = String(0.42 + beat * 0.38);
        gb.style.transform = `scale(${1 + beat * 0.028}) translate(${-tx * 0.6}px, ${ty * 0.8}px)`;
        gb.style.opacity = String(0.35 + beat * 0.4);
      } else if (ga && gb) {
        ga.style.transform = 'scale(1)';
        ga.style.opacity = '0.35';
        gb.style.transform = 'scale(1)';
        gb.style.opacity = '0.28';
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [playing, analyser, fakeMode]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 overflow-hidden transition-opacity duration-[1100ms] ease-out"
      style={{ zIndex: 2 }}
      aria-hidden
    >
      {/* Oscurecimiento cinematográfico + pulso */}
      <div ref={dimRef} className="absolute inset-0" />

      {/* Orbes cálidos que “respiran” con el bajo */}
      <div
        ref={glowARef}
        className="absolute -in-[20%] will-change-transform rounded-[50%] blur-[72px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(180, 100, 70, 0.55) 0%, rgba(120, 60, 90, 0.25) 45%, transparent 70%)',
          left: '5%',
          top: '-10%',
          width: '75%',
          height: '85%',
        }}
      />
      <div
        ref={glowBRef}
        className="absolute -in-[18%] will-change-transform rounded-[50%] blur-[80px]"
        style={{
          background:
            'radial-gradient(closest-side, rgba(50, 110, 150, 0.45) 0%, rgba(30, 70, 110, 0.2) 50%, transparent 72%)',
          right: '-5%',
          bottom: '-15%',
          width: '70%',
          height: '80%',
        }}
      />

      {/* Velo extra para bajar brillo general (legible) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_45%,transparent_20%,rgba(0,0,0,0.18)_100%)]"
        aria-hidden
      />
    </div>,
    document.body,
  );
}
