import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

const minReadableScale = 0.8;

export function ExamQuestionViewport({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const viewportElement = viewport.current;
    const contentElement = content.current;
    if (!viewportElement || !contentElement || typeof ResizeObserver === 'undefined') return;

    const measure = () => {
      const height = contentElement.offsetHeight;
      const available = viewportElement.clientHeight;
      if (!height || !available) return;

      // Very long activities can scroll inside the question at this size.
      const scale = Math.max(minReadableScale, Math.min(1, available / height));
      setFit((previous) => previous.height === height && previous.scale === scale
        ? previous
        : { scale, height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewportElement);
    observer.observe(contentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="exam-question-viewport" ref={viewport}>
      <div className="exam-question-fit" style={fit.height ? { height: Math.ceil(fit.height * fit.scale) } : undefined}>
        <div
          className="exam-question-content"
          ref={content}
          style={fit.scale < 1 ? { transform: `scale(${fit.scale})` } : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
