/** Segmento base de URLs de cursos (páginas bajo /course/[slug]/…). */
export const COURSE_PATH_PREFIX = '/course' as const;

export function courseHomePath(slug: string): string {
  return `${COURSE_PATH_PREFIX}/${slug}/`;
}

export function courseLessonPath(courseSlug: string, lessonSlug: string): string {
  return `${COURSE_PATH_PREFIX}/${courseSlug}/${lessonSlug}/`;
}
