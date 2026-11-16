import type { Course } from '../data/courses';

const embeddedExercises: Partial<Record<string, Record<string, string>>> = {
  pseint: {
    variables: 'Ejercicios de variables',
    matematicas: 'Ejercicios de operaciones matemáticas',
    condicionales: 'Ejercicios con Si',
    repeticion: 'Ejercicios de repetición',
  },
  python: { funciones: 'Ejercicios prácticos de funciones' },
  django: { 'admin-crud': 'Ejercicios de Django Admin', seguridad: 'Ejercicios de seguridad' },
  excel: { graficos: 'Ejercicios de gráficos' },
  'excel-intermedio': { 'variables-tipos': 'Ejercicios de variables y tipos en VBA' },
};

export function getCoursePractice(course: Course) {
  const practice = (course.lessons ?? []).flatMap((lesson) => {
    const title = embeddedExercises[course.slug]?.[lesson.slug];
    if (title) return [{ title, href: lesson.href, embedded: true }];
    if (/práctic[ao]|ejercicios?|retos?|proyectos?|desafíos?/i.test(lesson.title)) {
      return [{ title: lesson.title, href: lesson.href, embedded: false }];
    }
    return [];
  });

  if (course.slug === 'java') {
    practice.unshift({
      title: 'Taller práctico de programación orientada a objetos',
      href: '/course/java/poo-completed/',
      embedded: false,
    });
  }
  return practice;
}
