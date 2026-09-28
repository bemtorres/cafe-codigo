import type { Slide } from '../../../types/slides';
import { getQuizForLesson, type QuizQuestion } from './quizzes';
import { getMetaQuestionsForLesson, type MetaReflectionQuestion } from './metacognition';

import { modeloBdSlides } from './modelo-bd';
import { modeloBdStepSlides } from './modelo-bd-step';
import { modeloBdVehiculosSlides } from './modelo-bd-vehiculos';

export { getQuizForLesson, type QuizQuestion };
export { getMetaQuestionsForLesson, type MetaReflectionQuestion };

export { modeloBdSlides, modeloBdStepSlides, modeloBdVehiculosSlides };

export function createGenericModuleSlides(slug: string): Slide[] {
  const formattedTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return [
    {
      id: 1,
      type: 'cover',
      title: `${formattedTitle} en Django 🧱`,
      subtitle: `Aprende los fundamentos y mejores prácticas de ${formattedTitle}`,
      badge: `Módulo · ${formattedTitle}`,
      content: `Explora el módulo interactivo de ${formattedTitle} en Django con ejemplos de código real y ejercicios prácticos.`,
      bulletPoints: [
        '🚀 Conceptos clave del framework backend de Python',
        '💡 Patrones de diseño y recomendaciones oficiales de Django',
        '🧪 Evaluaciones interactivas y ejercicios en tiempo real',
        '☕ Código preparado para tus proyectos reales'
      ],
      keyTakeaway: 'Dominar este módulo impulsará tus habilidades como desarrollador backend.'
    }
  ];
}

export function getSlidesForLesson(lessonSlug: string): Slide[] {
  switch (lessonSlug) {
    case 'modelo-bd':
      return modeloBdSlides;
    case 'modelo-bd-step':
    case 'modelo-bd/step':
      return modeloBdStepSlides;
    case 'modelo-bd-vehiculos':
    case 'modelo-bd/vehiculos':
      return modeloBdVehiculosSlides;
    default:
      return createGenericModuleSlides(lessonSlug);
  }
}
