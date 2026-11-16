const INIT_KEY = '__pseintQuizModalInit__';

function closeModal(modal: Element | null) {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('is-open');
  document.documentElement.style.overflow = '';
}

function openModal(modal: Element | null) {
  if (!modal) return;
  const resultEl = modal.querySelector('.pseint-quiz__result');
  if (resultEl) resultEl.textContent = '';
  modal.querySelectorAll('[data-pseint-quiz-feedback]').forEach((el) => {
    el.textContent = '';
  });
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
  document.documentElement.style.overflow = 'hidden';
}

function shuffleQuestions(modal: Element) {
  const form = modal.querySelector('.pseint-quiz__form');
  const qEls = Array.from(modal.querySelectorAll('[data-pseint-quiz-q]'));
  if (!form || qEls.length < 2) return;

  for (let i = qEls.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = qEls[i];
    qEls[i] = qEls[j];
    qEls[j] = tmp;
  }

  qEls.forEach((el) => {
    form.appendChild(el);
  });

  qEls.forEach((qEl, idx) => {
    const numEl = qEl.querySelector('.pseint-quiz__q-num');
    if (numEl) numEl.textContent = String(idx + 1);
  });
}

function gradeModal(modal: Element): { score: number; total: number } {
  const resultEl = modal.querySelector('.pseint-quiz__result');
  if (!resultEl) return { score: 0, total: 0 };

  const qEls = modal.querySelectorAll('[data-pseint-quiz-q]');
  let score = 0;

  qEls.forEach((qEl) => {
    const correct = Number(qEl.getAttribute('data-correct-index'));
    const feedbackEl = qEl.querySelector('[data-pseint-quiz-feedback]');
    const selected = qEl.querySelector('input[type="radio"]:checked') as HTMLInputElement | null;
    const idx = selected ? Number(selected.value) : null;

    const correctInput = qEl.querySelector(`input[type="radio"][value="${correct}"]`);
    const correctText = correctInput?.parentElement?.querySelector('span')?.textContent ?? '';
    const selectedText = selected?.parentElement?.querySelector('span')?.textContent ?? '';

    const isCorrect = idx === correct;
    if (isCorrect) score++;

    if (feedbackEl) {
      if (isCorrect) {
        feedbackEl.textContent = 'Correcto ✅';
      } else {
        feedbackEl.textContent =
          `Incorrecto ❌. Correcta: "${correctText}".` +
          (selectedText ? ` Tu respuesta: "${selectedText}".` : '');
      }
    }
  });

  const total = qEls.length;
  if (score === total) resultEl.textContent = `¡Excelente! Obtuviste ${score}/${total}.`;
  else resultEl.textContent = `Puntaje: ${score}/${total}.`;

  return { score, total };
}

export function initPseintQuizModals() {
  if (typeof window === 'undefined') return;
  const w = window as unknown as Record<string, boolean>;
  if (w[INIT_KEY]) return;
  w[INIT_KEY] = true;

  document.addEventListener('click', (e) => {
    const target = e.target;

    const startBtn = target instanceof Element ? target.closest('.pseint-quiz__start') : null;
    if (startBtn) {
      e.preventDefault();
      const root = startBtn.closest('.pseint-quiz') as HTMLElement | null;
      const modal = root?.querySelector('.pseint-quiz__modal') ?? null;
      openModal(modal);
      if (modal) shuffleQuestions(modal);
      return;
    }

    const closeBtn = target instanceof Element ? target.closest('[data-pseint-quiz-close]') : null;
    if (closeBtn) {
      const root = closeBtn.closest('.pseint-quiz');
      const modal = root?.querySelector('.pseint-quiz__modal') ?? null;
      closeModal(modal);
      return;
    }

    const submitBtn = target instanceof Element ? target.closest('[data-pseint-quiz-submit]') : null;
    if (submitBtn) {
      const root = submitBtn.closest('.pseint-quiz') as HTMLElement | null;
      const modal = root?.querySelector('.pseint-quiz__modal') ?? null;
      if (modal) {
        gradeModal(modal);
      }
      return;
    }

    const restartBtn = target instanceof Element ? target.closest('[data-pseint-quiz-restart]') : null;
    if (restartBtn) {
      const root = restartBtn.closest('.pseint-quiz');
      const modal = root?.querySelector('.pseint-quiz__modal') ?? null;
      if (!modal) return;
      const resultEl = modal.querySelector('.pseint-quiz__result');
      if (resultEl) resultEl.textContent = '';
      modal.querySelectorAll('input[type="radio"]').forEach((r) => {
        (r as HTMLInputElement).checked = false;
      });
      modal.querySelectorAll('[data-pseint-quiz-feedback]').forEach((el) => {
        el.textContent = '';
      });
      return;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.pseint-quiz__modal.is-open').forEach((m) => closeModal(m));
  });
}
