/**
 * Desbloqueo de cursos con candado (localStorage). No importa `courses.ts` para evitar
 * fallos raros de Vite/HMR al tocar `.env` (Cannot read properties of undefined (reading 'call')).
 * Si agregás un curso con `requiresPassword: true`, añadí su slug aquí también.
 */
const PASSWORD_PROTECTED_SLUGS: readonly string[] = ['c4', 'programacion-db'];

/** Debe coincidir con la validación en PasswordProtect (cursos con candado). */
export const COURSE_UNLOCK_SECRET = 'cafecito';

export function passwordProtectedSlugs(): string[] {
  return [...PASSWORD_PROTECTED_SLUGS];
}

/** Guarda en localStorage el desbloqueo de todos los cursos con contraseña. Solo en el navegador. */
export function unlockAllPasswordCourses(): void {
  if (typeof window === 'undefined') return;
  for (const slug of passwordProtectedSlugs()) {
    localStorage.setItem(`unlocked_${slug}`, 'true');
  }
}

/** Devuelve true si la clave es correcta y se aplicó el desbloqueo. */
export function tryUnlockWithSecret(secret: string): boolean {
  if (typeof window === 'undefined') return false;
  const trimmed = secret.trim();
  if (trimmed !== COURSE_UNLOCK_SECRET) return false;
  unlockAllPasswordCourses();
  return true;
}
