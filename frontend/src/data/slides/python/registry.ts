import type { Slide } from '../../../types/slides';
import { getQuizForLesson, type QuizQuestion } from './quizzes';
import { getMetaQuestionsForLesson, type MetaReflectionQuestion } from './metacognition';

import { introduccionSlides } from './introduccion';
import { variablesSlides } from './variables';
import { textoYConversionesSlides } from './texto-y-conversiones';
import { condicionalesSlides } from './condicionales';
import { matchCaseSlides } from './match-case';
import { buclesSlides } from './bucles';
import { listasSlides } from './listas';
import { diccionariosSlides } from './diccionarios';
import { funcionesSlides } from './funciones';
import { tryExceptSlides } from './try-except';
import { listComprehensionSlides } from './list-comprehension';
import { practicaRegistrosCineSlides } from './practica-registros-cine';
import { crudProductosExpendedoraSlides } from './crud-productos-expendedora';
import { pooSlides } from './poo';
import { modulosSlides } from './modulos';
import { entornosVirtualesSlides } from './entornos-virtuales';
import { manejoArchivosSlides } from './manejo-archivos';
import { seguridadBanditSonarqubeSlides } from './seguridad-bandit-sonarqube';

export { getQuizForLesson, type QuizQuestion };
export { getMetaQuestionsForLesson, type MetaReflectionQuestion };

export {
  introduccionSlides,
  variablesSlides,
  textoYConversionesSlides,
  condicionalesSlides,
  matchCaseSlides,
  buclesSlides,
  listasSlides,
  diccionariosSlides,
  funcionesSlides,
  tryExceptSlides,
  listComprehensionSlides,
  practicaRegistrosCineSlides,
  crudProductosExpendedoraSlides,
  pooSlides,
  modulosSlides,
  entornosVirtualesSlides,
  manejoArchivosSlides,
  seguridadBanditSonarqubeSlides
};

// --- DIAPOSITIVAS GENÉRICAS COMO FALLBACK ---
export function createGenericModuleSlides(slug: string): Slide[] {
  const formattedTitle = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return [
    {
      id: 1,
      type: 'cover',
      title: `${formattedTitle} en Python 🚀`,
      subtitle: `Aprende los fundamentos y mejores prácticas de ${formattedTitle}`,
      badge: `Módulo · ${formattedTitle}`,
      content: `Explora el módulo interactivo de ${formattedTitle} en Python con ejemplos de código real y ejercicios prácticos.`,
      bulletPoints: [
        '🚀 Conceptos clave y sintaxis moderna de Python 3.12+',
        '💡 Patrones de diseño y recomendaciones PEP 8',
        '🧪 Evaluaciones interactivas y ejercicios en tiempo real',
        '☕ Código preparado para tus proyectos reales'
      ],
      keyTakeaway: 'Dominar este módulo impulsará tus habilidades como desarrollador Pythonista.'
    }
  ];
}

// --- REGISTRO CENTRAL DE TODAS LAS LECCIONES ---
export function getSlidesForLesson(lessonSlug: string): Slide[] {
  switch (lessonSlug) {
    case 'introduccion': return introduccionSlides;
    case 'variables': return variablesSlides;
    case 'texto-y-conversiones': return textoYConversionesSlides;
    case 'condicionales': return condicionalesSlides;
    case 'match-case': return matchCaseSlides;
    case 'bucles': return buclesSlides;
    case 'listas': return listasSlides;
    case 'diccionarios': return diccionariosSlides;
    case 'funciones': return funcionesSlides;
    case 'try-except': return tryExceptSlides;
    case 'list-comprehension': return listComprehensionSlides;
    case 'practica-registros-cine': return practicaRegistrosCineSlides;
    case 'crud-productos-expendedora': return crudProductosExpendedoraSlides;
    case 'poo': return pooSlides;
    case 'modulos': return modulosSlides;
    case 'entornos-virtuales': return entornosVirtualesSlides;
    case 'manejo-archivos': return manejoArchivosSlides;
    case 'seguridad-bandit-sonarqube': return seguridadBanditSonarqubeSlides;
    default: return createGenericModuleSlides(lessonSlug);
  }
}
