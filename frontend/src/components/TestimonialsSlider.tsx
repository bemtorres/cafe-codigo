import { useCallback, useEffect, useRef } from 'react';

/** Claves para elegir la “carita” (emoji). Más adelante podés usar `photoUrl` y la imagen reemplaza al emoji. */
export const CARITAS = {
  happy: '😊',
  cool: '😎',
  study: '📚',
  teacher: '👩‍🏫',
  code: '💻',
  heart: '🥰',
  neutral: '🙂',
  thinking: '🤔',
  spark: '✨',
  wave: '👋',
} as const;

export type CaritaKey = keyof typeof CARITAS;

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  /** Clave de `CARITAS` para mostrar emoji; si falta, se usa `neutral`. */
  carita?: CaritaKey;
  /** Cuando exista, se muestra esta foto en lugar del emoji. */
  photoUrl?: string;
};

type Props = {
  testimonials: TestimonialItem[];
};

function TestimonialCard({ t, ariaHidden }: { t: TestimonialItem; ariaHidden?: boolean }) {
  const emoji =
    t.carita && t.carita in CARITAS ? CARITAS[t.carita as CaritaKey] : CARITAS.neutral;

  return (
    <blockquote
      className="m-0 flex w-[min(100%,17.5rem)] shrink-0 snap-start flex-col rounded-xl border-[3px] border-border bg-white p-4 shadow-neo sm:w-62"
      aria-hidden={ariaHidden ? true : undefined}
    >
      <p className="mb-3 grow text-[0.82rem] leading-snug text-textPrimary font-[650] sm:text-[0.875rem] sm:leading-relaxed">
        “{t.quote}”
      </p>
      <footer className="border-t-2 border-dashed border-border pt-2.5">
        <div className="flex items-start gap-2.5">
          {t.photoUrl ? (
            <img
              src={t.photoUrl}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full border-2 border-border object-cover shadow-neo"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-tertiary text-[1.35rem] leading-none shadow-neo"
              aria-hidden="true"
            >
              {emoji}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <cite className="not-italic font-nunito text-[0.85rem] font-black text-textPrimary block">{t.name}</cite>
            <span className="text-[0.7rem] font-bold text-textMuted sm:text-xs">{t.role}</span>
          </div>
        </div>
      </footer>
    </blockquote>
  );
}

const AUTO_SCROLL_PX = 0.38;

export default function TestimonialsSlider({ testimonials }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseAutoRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const getStep = useCallback(() => {
    const el = scrollRef.current;
    const first = el?.querySelector('blockquote');
    if (!first || !el) return 280;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || '12') || 12;
    return (first as HTMLElement).offsetWidth + gap;
  }, []);

  const scrollByDir = useCallback(
    (dir: 'prev' | 'next') => {
      const el = scrollRef.current;
      if (!el) return;
      const step = getStep();
      el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
    },
    [getStep],
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      reducedMotionRef.current = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || testimonials.length === 0) return;

    let raf = 0;
    const loop = () => {
      if (el && !pauseAutoRef.current && !reducedMotionRef.current) {
        el.scrollLeft += AUTO_SCROLL_PX;
        const half = el.scrollWidth / 2;
        if (half > 4 && el.scrollLeft >= half - 2) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div>
      <div
        className="relative"
        onMouseEnter={() => {
          pauseAutoRef.current = true;
        }}
        onMouseLeave={() => {
          pauseAutoRef.current = false;
        }}
      >
        <button
          type="button"
          aria-label="Testimonios anteriores"
          onClick={() => scrollByDir('prev')}
          className="absolute left-0 top-1/2 z-10 flex h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border bg-white px-3 font-nunito text-xl font-black text-textPrimary shadow-neo transition-shadow hover:shadow-md"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          aria-label="Testimonios siguientes"
          onClick={() => scrollByDir('next')}
          className="absolute right-0 top-1/2 z-10 flex h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border bg-white px-3 font-nunito text-xl font-black text-textPrimary shadow-neo transition-shadow hover:shadow-md"
        >
          <span aria-hidden="true">›</span>
        </button>

        <div
          ref={scrollRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Testimonios de usuarios"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollByDir('prev');
            }
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollByDir('next');
            }
          }}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory py-1 pl-12 pr-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:pl-14 sm:pr-14"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={`a-${t.name}-${i}`} t={t} />
          ))}
          {testimonials.map((t, i) => (
            <TestimonialCard key={`b-${t.name}-${i}`} t={t} ariaHidden />
          ))}
        </div>
      </div>
    </div>
  );
}
