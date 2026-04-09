/**
 * Vista derivada del catálogo de cursos para herramientas y páginas que listan lecciones.
 *
 * PROTOCOLO (fuente única):
 * - Los cursos y sus lecciones viven solo en `src/data/courses.ts` (array exportado `courses`).
 * - Para contenido nuevo: editá ese archivo (slug, name, lessons[].slug|title|href).
 * - Importá desde aquí (`getCoursesForEmbed`, etc.) en lugar de duplicar listas en otros archivos.
 */

import { courses } from '../data/courses';

export type EmbedLessonPayload = { slug: string; title: string; href: string };

export type EmbedCoursePayload = {
  slug: string;
  name: string;
  lessons: EmbedLessonPayload[];
};

/** Cursos con lecciones para el generador /admin/embed/ (misma forma que espera el cliente). */
export function getCoursesForEmbed(): EmbedCoursePayload[] {
  return courses.map((c) => ({
    slug: c.slug,
    name: c.name,
    lessons: (c.lessons ?? []).map((l) => ({
      slug: l.slug,
      title: l.title,
      href: l.href,
    })),
  }));
}

/** Ruta del archivo canónico (para mensajes en UI). */
export const COURSES_CANONICAL_FILE = 'src/data/courses.ts';
