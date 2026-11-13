import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { isCourseDocument } from '../data/courses/courseDocument.ts';
import { courseCategoryName } from '../data/courseCategories.ts';

/** @returns {{ courseId: string, title: string, institution: string, modules: number, category: string }[]} */
export function getPublishedCourses() {
  const directory = join(process.cwd(), 'public', 'contenidos');
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isFile() || !/^[a-z0-9]+(?:-[a-z0-9]+)*\.json$/.test(entry.name)) return [];
    const value = JSON.parse(readFileSync(join(directory, entry.name), 'utf8'));
    if (!isCourseDocument(value) || value.courseId + '.json' !== entry.name) {
      throw new Error('Estructura de asignatura inválida en public/contenidos/' + entry.name);
    }
    return [{ courseId: value.courseId, title: value.title, institution: value.institution,
      modules: value.modulos.length, category: courseCategoryName(value.category) }];
  }).sort((first, second) => first.title.localeCompare(second.title, 'es'));
}
