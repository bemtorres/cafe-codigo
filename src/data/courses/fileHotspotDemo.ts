import type { CourseContenido, CourseDocumentJSON } from './courseJsonTypes';

const imageUrl = '/images/tutorial-carga-archivos.svg';

function interaction(
  id: string,
  step: number,
  title: string,
  context: string,
  target: { label: string; x: number; y: number; width: number; height: number; feedback: string }
): CourseContenido {
  return {
    id,
    title,
    widget: {
      id: `hotspot-${id}`,
      type: 'scenario-quiz-image-hotspot',
      componentName: 'WidgetScenarioQuizImageHotspot',
      summary: title,
      data: {
        badge: `TUTORIAL · PASO ${step} DE 3`,
        title,
        context,
        imageUrl,
        imageAlt: 'Pantalla de Entregas con controles para seleccionar y cargar un archivo y una lista con Informe-final.pdf y Notas-del-proyecto.txt.',
        sceneType: 'custom-image',
        points: 10,
        zones: [{
          id: 'objetivo',
          label: target.label,
          xPercent: target.x / 8,
          yPercent: target.y / 4.8,
          widthPercent: target.width / 8,
          heightPercent: target.height / 4.8,
          isRiskTarget: true,
          feedback: target.feedback,
        }],
      },
    },
  };
}

export const FILE_HOTSPOT_DEMO: CourseDocumentJSON = {
  courseId: 'tutorial-carga-archivos',
  version: '1.0.0',
  title: 'Tutoriales interactivos',
  institution: 'Café y Código',
  defaultBrandId: 'ocean',
  showScoreInBanner: false,
  modulos: [{
    id: 'carga-archivos',
    title: 'Cómo cargar un archivo',
    lessions: [{
      id: 'entregas',
      title: 'Entrega un documento PDF',
      secciones: [
        {
          id: 'abrir-selector',
          title: '1. Abrir el selector',
          contenidos: [interaction('abrir', 1, '¿Dónde abrirías el selector de archivos?',
            'Marca el botón que usarías para buscar un archivo antes de cargarlo.', {
              label: 'Seleccionar archivo', x: 48, y: 176, width: 204, height: 52,
              feedback: 'Seleccionar archivo abre el selector. Aún falta elegir y cargar el documento.',
            })],
        },
        {
          id: 'elegir-documento',
          title: '2. Elegir el PDF',
          contenidos: [interaction('elegir', 2, '¿Dónde elegirías el informe final?',
            'La entrega requiere el archivo Informe-final.pdf. Marca su fila en la lista.', {
              label: 'Informe-final.pdf', x: 64, y: 286, width: 672, height: 42,
              feedback: 'Elegiste Informe-final.pdf, el documento que pide la entrega.',
            })],
        },
        {
          id: 'confirmar-carga',
          title: '3. Confirmar la carga',
          contenidos: [interaction('cargar', 3, '¿Dónde confirmarías la carga?',
            'Ya elegiste el PDF. Marca el botón que enviaría el archivo a la plataforma.', {
              label: 'Cargar archivo', x: 567, y: 402, width: 185, height: 48,
              feedback: 'Cargar archivo confirma el envío del documento seleccionado.',
            })],
        },
      ],
    }],
  }],
};
