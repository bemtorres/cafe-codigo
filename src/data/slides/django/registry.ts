import type { Slide } from '../../../types/slides';
import { getQuizForLesson, type QuizQuestion } from './quizzes';
import { getMetaQuestionsForLesson, type MetaReflectionQuestion } from './metacognition';

// Diapositivas existentes (se mantienen intactas)
import { modeloBdSlides } from './modelo-bd';
import { modeloBdStepSlides } from './modelo-bd-step';
import { modeloBdVehiculosSlides } from './modelo-bd-vehiculos';

// Nuevas diapositivas pedagógicas
import { introduccionSlides } from './introduccion';
import { pythonParaBackendSlides } from './python-para-backend';
import { introduccionDjangoSlides } from './introduccion-django';
import { arquitecturaDjangoSlides } from './arquitectura-django';
import { arquitecturaDjangoUrlsSlides } from './arquitectura-django-urls';
import { arquitecturaDjangoViewsSlides } from './arquitectura-django-views';
import { arquitecturaDjangoTemplateSlides } from './arquitectura-django-template';
import { arquitecturaDjangoTrainingSlides } from './arquitectura-django-training';
import { modeloBdLibrarySlides } from './modelo-bd-library';
import { adminCrudSlides } from './admin-crud';
import { seguridadSlides } from './seguridad';
import { apisRestfulSlides } from './apis-restful';
import { drfJwtSlides } from './drf-jwt';
import { proyectoIntegradorSlides } from './proyecto-integrador';

export { getQuizForLesson, type QuizQuestion };
export { getMetaQuestionsForLesson, type MetaReflectionQuestion };

export {
  introduccionSlides,
  pythonParaBackendSlides,
  introduccionDjangoSlides,
  arquitecturaDjangoSlides,
  arquitecturaDjangoUrlsSlides,
  arquitecturaDjangoViewsSlides,
  arquitecturaDjangoTemplateSlides,
  arquitecturaDjangoTrainingSlides,
  modeloBdSlides,
  modeloBdStepSlides,
  modeloBdLibrarySlides,
  modeloBdVehiculosSlides,
  adminCrudSlides,
  seguridadSlides,
  apisRestfulSlides,
  drfJwtSlides,
  proyectoIntegradorSlides,
};

export function createGenericModuleSlides(slug: string): Slide[] {
  const formattedTitle = slug
    .split(/[-/]/)
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
  // Normalizar el slug (elimina barras iniciales/finales si existieran)
  const normalizedSlug = lessonSlug.replace(/^\/+|\/+$/g, '');

  switch (normalizedSlug) {
    case 'introduccion':
      return introduccionSlides;

    case 'python-para-backend':
      return pythonParaBackendSlides;

    case 'introduccion-django':
      return introduccionDjangoSlides;

    case 'arquitectura-django':
      return arquitecturaDjangoSlides;

    case 'arquitectura-django/urls':
    case 'arquitectura-django-urls':
      return arquitecturaDjangoUrlsSlides;

    case 'arquitectura-django/views':
    case 'arquitectura-django-views':
      return arquitecturaDjangoViewsSlides;

    case 'arquitectura-django/template':
    case 'arquitectura-django-template':
      return arquitecturaDjangoTemplateSlides;

    case 'arquitectura-django/training':
    case 'arquitectura-django-training':
      return arquitecturaDjangoTrainingSlides;

    case 'modelo-bd':
      return modeloBdSlides;

    case 'modelo-bd-step':
    case 'modelo-bd/step':
      return modeloBdStepSlides;

    case 'modelo-bd-library':
    case 'modelo-bd/library':
      return modeloBdLibrarySlides;

    case 'modelo-bd-vehiculos':
    case 'modelo-bd/vehiculos':
      return modeloBdVehiculosSlides;

    case 'admin-crud':
      return adminCrudSlides;

    case 'seguridad':
      return seguridadSlides;

    case 'apis-restful':
      return apisRestfulSlides;

    case 'drf-jwt':
      return drfJwtSlides;

    case 'proyecto-integrador':
      return proyectoIntegradorSlides;

    default:
      return createGenericModuleSlides(normalizedSlug);
  }
}
