import { useEffect } from 'react';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';

type Props = { courseSlug: string };

/** Misma lógica que contraseña correcta en PasswordProtect.astro */
function unlockCourseDom(courseSlug: string) {
  if (typeof document === 'undefined') return;
  try {
    localStorage.setItem(`unlocked_${courseSlug}`, 'true');
  } catch {
    /* private mode */
  }
  document.documentElement.style.overflow = '';
  const overlay = document.getElementById('password-overlay');
  const lockStyles = document.getElementById('lock-styles');
  if (overlay) (overlay as HTMLElement).style.display = 'none';
  lockStyles?.remove();
}

/**
 * Si hay sesión, desbloquea cursos marcados como requiresPassword sin pedir la clave compartida.
 */
export default function CourseLoginUnlock({ courseSlug }: Props) {
  const { supabase, loading, user } = useSupabaseAuth();

  useEffect(() => {
    if (loading || !supabase || !user) return;
    unlockCourseDom(courseSlug);
  }, [loading, supabase, user, courseSlug]);

  return null;
}
