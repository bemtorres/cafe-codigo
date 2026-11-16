import { isCourseDocument } from '../data/courses/courseDocument';
import type { CourseDocumentJSON } from '../data/courses/courseJsonTypes';

export const courseSlug = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').slice(0, 80).replace(/^-|-$/g, '');

export async function readLocalCourse(id: string, signal?: AbortSignal) {
  if (!id || courseSlug(id) !== id) throw new Error('Identificador de curso inválido.');
  const response = await fetch('/contenidos/' + id + '.json', { cache: 'no-store', signal });
  if (!response.ok) throw new Error('No se pudo abrir el curso.');
  const revision = await response.text();
  const course: unknown = JSON.parse(revision);
  if (!isCourseDocument(course) || course.courseId !== id) throw new Error('El documento del curso es inválido.');
  return { course, revision };
}

export async function saveLocalCourse(document: CourseDocumentJSON, revision: string | null): Promise<string> {
  const response = await fetch('/api/local/contenidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ document, revision }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || typeof result?.json !== 'string') {
    throw new Error(result?.error ?? 'No se pudo guardar. Abre el administrador desde el servidor local de Astro.');
  }
  return result.json;
}
