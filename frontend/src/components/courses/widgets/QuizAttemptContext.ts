import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export const QuizAttemptContext = createContext<{
  mode: 'exam' | 'review';
  answer: unknown;
  saveAnswer: (answer: unknown) => void;
  reportScore?: (earned: number) => void;
} | null>(null);

export function useQuizAnswer<T>(initial: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const attempt = useContext(QuizAttemptContext);
  const [local, setLocal] = useState(initial);
  if (!attempt) return [local, setLocal];

  const answer = (attempt.answer ?? local) as T;
  return [answer, (next) => {
    if (attempt.mode === 'exam') {
      attempt.saveAnswer(typeof next === 'function' ? (next as (value: T) => T)(answer) : next);
    }
  }];
}

export function useQuizSubmission() {
  const attempt = useContext(QuizAttemptContext);
  const [local, setLocal] = useState(false);
  return {
    mode: attempt?.mode ?? 'practice',
    submitted: attempt ? attempt.mode === 'review' : local,
    setSubmitted: (value: boolean) => {
      if (!attempt) setLocal(value);
    },
  };
}
