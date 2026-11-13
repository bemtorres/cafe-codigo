import { BRANDING_COURSE } from './brandingCourseDemoData';
import { getModuleContents } from './courseDocument';
import type { CourseContenido, CourseWidgetBlock } from './courseJsonTypes';

const examples = BRANDING_COURSE.modulos.flatMap(getModuleContents);
const steps = examples.find(({ widget }) => widget.type === 'pipeline-steps')?.widget;
const checklist = examples.find(({ widget }) => widget.type === 'checklist')?.widget;

export const widgetTemplates: CourseContenido[] = [
  ...examples,
  ...(steps?.type === 'pipeline-steps' && checklist?.type === 'checklist' ? [{
    id: 'plantilla-pipeline-checklist',
    title: 'Ruta de implementación y verificación',
    widget: {
      id: 'plantilla-pipeline-checklist',
      type: 'pipeline-checklist' as const,
      componentName: 'WidgetPipelineChecklist' as const,
      summary: 'Combina una guía paso a paso con una lista de verificación.',
      data: { ...steps.data, ...checklist.data, badge: steps.data.badge },
    },
  }] : []),
];

export type TemplateGroup = 'Contenido' | 'Práctica' | 'Evaluación';

export const widgetTemplateLabels: Record<CourseWidgetBlock['type'], [string, TemplateGroup]> = {
  'hero-banner': ['Portada del curso', 'Contenido'],
  'image-cover-banner': ['Portada con imagen', 'Contenido'],
  'rich-text-editorial': ['Texto enriquecido', 'Contenido'],
  'video-editorial': ['Video con introducción', 'Contenido'],
  'editorial-quote': ['Cita destacada', 'Contenido'],
  'document-resources': ['Documentos y enlaces', 'Contenido'],
  'slide-cards': ['Tarjetas en carrusel', 'Contenido'],
  'accordion-details': ['Acordeón', 'Contenido'],
  'code-walkthrough': ['Lectura guiada de código', 'Práctica'],
  'code-comparison': ['Comparador de código', 'Práctica'],
  'architecture-hotspots': ['Mapa interactivo', 'Práctica'],
  'architecture-hotspots-visual': ['Mapa interactivo con imagen', 'Práctica'],
  'flip-cards-3d': ['Tarjetas giratorias', 'Práctica'],
  'pipeline-steps': ['Guía paso a paso', 'Práctica'],
  'checklist': ['Lista de verificación', 'Práctica'],
  'pipeline-checklist': ['Guía con lista de verificación', 'Práctica'],
  'scenario-quiz': ['Casos de selección única', 'Evaluación'],
  'scenario-quiz-multiple': ['Selección múltiple', 'Evaluación'],
  'scenario-quiz-drag-drop': ['Arrastrar y clasificar', 'Evaluación'],
  'scenario-quiz-ordering': ['Ordenar pasos', 'Evaluación'],
  'scenario-quiz-matching': ['Emparejar conceptos', 'Evaluación'],
  'scenario-quiz-fill-blank': ['Completar espacios', 'Evaluación'],
  'scenario-quiz-branching': ['Simulación con decisiones', 'Evaluación'],
  'scenario-quiz-matrix': ['Matriz de verdadero o falso', 'Evaluación'],
  'scenario-quiz-spotter': ['Detectar errores en código', 'Evaluación'],
  'scenario-quiz-image-hotspot': ['Señalar en una imagen', 'Evaluación'],
  'scenario-quiz-image-choice': ['Elegir una imagen', 'Evaluación'],
  'scenario-quiz-risk-slider': ['Escala de riesgo', 'Evaluación'],
  'final-report': ['Informe de resultados', 'Evaluación'],
};
