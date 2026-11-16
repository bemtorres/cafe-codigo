type ExamEvent =
  | { type: 'started'; at: number }
  | { type: 'page'; at: number; page: number }
  | { type: 'answer'; at: number; questionId: string; answer: unknown }
  | { type: 'resumed'; at: number; page: number }
  | { type: 'submitted' | 'expired'; at: number };

export type ExamSession = {
  id: string;
  startedAt: number;
  deadline: number;
  page: number;
  answers: Record<string, unknown>;
  events: ExamEvent[];
  finished?: { reason: 'submitted' | 'expired'; at: number };
};

type ExamAction =
  | { type: 'page'; page: number }
  | { type: 'answer'; questionId: string; answer: unknown }
  | { type: 'resumed' }
  | { type: 'submit' }
  | { type: 'tick' };

export function startExamSession(id: string, minutes: number, now: number): ExamSession {
  return {
    id,
    startedAt: now,
    deadline: now + minutes * 60_000,
    page: 0,
    answers: {},
    events: [{ type: 'started', at: now }],
  };
}

export function updateExamSession(session: ExamSession, action: ExamAction, now: number): ExamSession {
  if (session.finished) return session;
  if (now >= session.deadline || action.type === 'submit') {
    const reason = now >= session.deadline ? 'expired' : 'submitted';
    const at = reason === 'expired' ? session.deadline : now;
    return {
      ...session,
      finished: { reason, at },
      events: [...session.events, { type: reason, at }],
    };
  }

  switch (action.type) {
    case 'page':
      if (session.page === action.page) return session;
      return {
        ...session,
        page: action.page,
        events: [...session.events, { ...action, at: now }],
      };
    case 'answer': {
      const previous = session.answers[action.questionId];
      if (JSON.stringify(previous) === JSON.stringify(action.answer)) return session;
      return {
        ...session,
        answers: { ...session.answers, [action.questionId]: action.answer },
        events: [...session.events, { ...action, at: now }],
      };
    }
    case 'resumed':
      return { ...session, events: [...session.events, { type: 'resumed', at: now, page: session.page }] };
    default:
      return session;
  }
}

export function hasExamAnswer(answer: unknown): boolean {
  if (answer === undefined || answer === null || answer === '') return false;
  if (typeof answer === 'object') return Object.keys(answer).length > 0;
  return true;
}
