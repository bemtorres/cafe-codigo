import type { CourseCategory } from './courses';

export const courseCategoryLabels = {
  foundations: 'Conceptos base',
  language: 'Lenguajes',
  advanced: 'Programación avanzada',
  frameworks: 'Frameworks',
  testing: 'Test',
  frontend: 'Frontend (web)',
  engineering: 'Ingeniería y calidad',
  database: 'Bases de datos',
  tools: 'Herramientas',
  gamedev: 'Videojuegos',
} satisfies Record<CourseCategory, string>;

export const courseCategoryOrder = Object.keys(courseCategoryLabels) as CourseCategory[];

export function catalogCategory(value?: string): CourseCategory | undefined {
  return courseCategoryOrder.find((id) => id === value || courseCategoryLabels[id] === value);
}

export function courseCategoryName(value?: string): string {
  const category = catalogCategory(value);
  return category ? courseCategoryLabels[category] : value || 'Sin categoría';
}
