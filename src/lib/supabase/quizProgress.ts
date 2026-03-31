import { getSupabaseBrowser } from './client';

export type QuizProgressRow = {
  id: string;
  user_id: string;
  course_slug: string;
  lesson_slug: string;
  correct_best: number;
  question_count: number;
  attempts: number;
  updated_at: string;
};

export function quizPercent(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct * 100) / total);
}

export async function loadQuizProgress(
  courseSlug: string,
  lessonSlug: string,
): Promise<QuizProgressRow | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('quiz_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_slug', courseSlug)
    .eq('lesson_slug', lessonSlug)
    .maybeSingle();
  if (error || !data) return null;
  return data as QuizProgressRow;
}

/** Texto para mostrar bajo el botón del quiz (requiere sesión para datos). */
export async function quizProgressHint(courseSlug: string, lessonSlug: string): Promise<string> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return '';

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return 'Iniciá sesión para guardar tu mejor puntaje y verlo en tus dispositivos.';
  }

  const row = await loadQuizProgress(courseSlug, lessonSlug);
  if (!row) {
    return 'Completá el examen para registrar tu primer intento.';
  }
  const pct = quizPercent(row.correct_best, row.question_count);
  return `Tu mejor resultado: ${pct}% (${row.correct_best}/${row.question_count}) · ${row.attempts} intento${row.attempts === 1 ? '' : 's'}`;
}

export async function saveQuizAttempt(
  courseSlug: string,
  lessonSlug: string,
  score: number,
  total: number,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return { ok: false, error: 'Sin Supabase' };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Sin sesión' };

  const { data: existing } = await supabase
    .from('quiz_progress')
    .select('correct_best, attempts')
    .eq('user_id', user.id)
    .eq('course_slug', courseSlug)
    .eq('lesson_slug', lessonSlug)
    .maybeSingle();

  const prev = existing as { correct_best: number; attempts: number } | null;
  const correctBest = Math.max(prev?.correct_best ?? 0, score);
  const attempts = (prev?.attempts ?? 0) + 1;

  const { error } = await supabase.from('quiz_progress').upsert(
    {
      user_id: user.id,
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
      correct_best: correctBest,
      question_count: total,
      attempts,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,course_slug,lesson_slug' },
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
