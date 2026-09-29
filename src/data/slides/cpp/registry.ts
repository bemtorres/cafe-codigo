import type { Slide } from '../../../types/slides';
import { getQuizForLesson, type QuizQuestion } from './quizzes';
import { getMetaQuestionsForLesson, type MetaReflectionQuestion } from './metacognition';

// Importar todas las presentaciones de C++
import { introduccionSlides } from './introduccion';
import { variablesSlides } from './variables';
import { ioSlides } from './io';
import { operadoresSlides } from './operadores';
import { condicionalesSlides } from './condicionales';
import { ciclosSlides } from './ciclos';
import { coleccionesSlides } from './colecciones';
import { arraySlides } from './array';
import { vectorSlides } from './vector';
import { arrayGameSlides } from './array-game';
import { arrayExamenSlides } from './array-examen';
import { funcionesSlides } from './funciones';
import { pooBasicoSlides } from './poo-basico';
import { pooPilaresSlides } from './poo-pilares';

export { getQuizForLesson, type QuizQuestion };
export { getMetaQuestionsForLesson, type MetaReflectionQuestion };

export {
  introduccionSlides,
  variablesSlides,
  ioSlides,
  operadoresSlides,
  condicionalesSlides,
  ciclosSlides,
  coleccionesSlides,
  arraySlides,
  vectorSlides,
  arrayGameSlides,
  arrayExamenSlides,
  funcionesSlides,
  pooBasicoSlides,
  pooPilaresSlides,
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
      title: `${formattedTitle} en C++ 🧱`,
      subtitle: `Aprende los fundamentos de memoria, compilación y mejores prácticas de ${formattedTitle}`,
      badge: `Módulo · ${formattedTitle}`,
      content: `Explora el módulo interactivo de ${formattedTitle} en C++ con diagramas de memoria, código optimizado y explicaciones paso a paso.`,
      bulletPoints: [
        '⚡ Alto rendimiento y control directo de la memoria RAM',
        '💡 Buenas prácticas del estándar de C++ moderno',
        '🧪 Evaluaciones interactivas y retroalimentación inmediata',
        '🚀 Código preparado para tus proyectos reales'
      ],
      keyTakeaway: 'Dominar este módulo impulsará tus habilidades para escribir software rápido y robusto.'
    }
  ];
}

export function getSlidesForLesson(lessonSlug: string): Slide[] {
  const normalizedSlug = lessonSlug.replace(/^\/+|\/+$/g, '');

  switch (normalizedSlug) {
    case 'introduccion':
      return introduccionSlides;

    case 'variables':
      return variablesSlides;

    case 'io':
      return ioSlides;

    case 'operadores':
      return operadoresSlides;

    case 'condicionales':
      return condicionalesSlides;

    case 'ciclos':
      return ciclosSlides;

    case 'colecciones':
      return coleccionesSlides;

    case 'array':
      return arraySlides;

    case 'vector':
      return vectorSlides;

    case 'array-game':
      return arrayGameSlides;

    case 'array-examen':
      return arrayExamenSlides;

    case 'funciones':
      return funcionesSlides;

    case 'poo-basico':
      return pooBasicoSlides;

    case 'poo-pilares':
      return pooPilaresSlides;

    default:
      return createGenericModuleSlides(normalizedSlug);
  }
}
