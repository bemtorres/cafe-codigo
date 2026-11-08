export type BrandPreset = {
  id: string;
  name: string;
  institution: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  bgQuiz: string;
};

export type CourseLessonMeta = {
  id: string;
  module: string;
  title: string;
  targetId: string;
  icon: 'video' | 'text' | 'slides' | 'code' | 'quiz' | 'tabs' | 'timeline';
};

export type HeroBannerBlockData = {
  lessonSubtitle: string;
  title: string;
  bannerTitlePrefix: string;
  bannerDescription: string;
  bannerImageUrl: string;
  apaCitation?: string;
  kpis: {
    stat: string;
    label: string;
    desc: string;
  }[];
};

export type ImageCoverBannerBlockData = {
  bannerTitlePrefix: string;
  includeInstitutionName?: boolean;
  bannerDescription: string;
  bannerImageUrl: string;
  apaCitation?: string;
  minHeight?: string;
};

export type RichTextEditorialBlockData = {
  badge?: string;
  title?: string;
  subtitle?: string;
  readingTime?: string;
  cardFrame?: boolean;
  htmlContent: string;
  apaCitation?: string;
};

export type VideoEditorialBlockData = {
  videoUrl: string;
  apaCitation?: string;
  highlightLead: string;
  statementRest: string;
};

export type CodeWalkthroughStep = {
  stepNumber: number;
  badge: string;
  title: string;
  explanation: string;
  keyTakeaway: string;
  fileName: string;
  highlightLines: number[];
  codeLines: string[];
};

export type CodeWalkthroughBlockData = {
  sectionBadge: string;
  sectionTitle: string;
  steps: CodeWalkthroughStep[];
};

export type SlideCardItem = {
  step: string;
  title: string;
  illustration: 'analyst' | 'shield' | 'server' | 'team';
  videoUrl?: string;
  videoCaption?: string;
  apaCitation?: string;
  bodyBefore: string;
  highlight: string;
  bodyAfter: string;
};

export type SlideCardsBlockData = {
  initialSlideIndex?: number;
  cards: SlideCardItem[];
};

export type AccordionBlockData = {
  introBeforeHighlight1: string;
  introHighlight1: string;
  introMiddle: string;
  introHighlight2: string;
  introAfter: string;
  heading: string;
  nextTargetId: string;
  nextLessonId?: string;
  items: {
    id: string;
    title: string;
    content: string;
  }[];
};

export type CodeComparisonTab = {
  id: string;
  label: string;
  badTitle: string;
  badCode: string;
  badReason: string;
  goodTitle: string;
  goodCode: string;
  goodReason: string;
};

export type CodeComparisonBlockData = {
  badge: string;
  title: string;
  tabs: CodeComparisonTab[];
};

export type HotspotLayer = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  threat: string;
  control: string;
  metric: string;
};

export type ArchitectureHotspotsBlockData = {
  badge: string;
  title: string;
  layers: HotspotLayer[];
};

export type HotspotVisualLayer = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  leftThumbnailUrl: string;
  leftThumbnailAlt?: string;
  rightImageUrl: string;
  rightImageCaption?: string;
  apaCitation?: string;
  threat: string;
  control: string;
  metric: string;
};

export type ArchitectureHotspotsVisualBlockData = {
  badge: string;
  title: string;
  layers: HotspotVisualLayer[];
};

export type FlipCardItem = {
  badge: string;
  title: string;
  frontQuestion: string;
  frontContext: string;
  backRule: string;
  backCode: string;
};

export type FlipCards3DBlockData = {
  badge: string;
  title: string;
  cards: FlipCardItem[];
};

export type PipelineStageItem = {
  stage: string;
  time: string;
  title: string;
  description: string;
  badge: string;
};

export type ChecklistItemData = {
  id: string;
  label: string;
  category: string;
};

export type StepToStepBlockData = {
  badge: string;
  title: string;
  stages: PipelineStageItem[];
};

export type ChecklistBlockData = {
  badge?: string;
  checklistTitle: string;
  checklistSubtitle: string;
  checklist: ChecklistItemData[];
};

export type PipelineChecklistBlockData = {
  badge: string;
  title: string;
  checklistTitle: string;
  checklistSubtitle: string;
  stages: PipelineStageItem[];
  checklist: ChecklistItemData[];
};

export type ScenarioQuestionItem = {
  id: string;
  badge: string;
  question: string;
  context: string;
  videoUrl?: string;
  videoCaption?: string;
  apaCitation?: string;
  points: number;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
};

export type ScenarioQuizBlockData = {
  questions: ScenarioQuestionItem[];
  reportTargetId: string;
};

/* =========================================================
   NUEVA FAMILIA DE WIDGETS INTERACTIVOS DE EVALUACIÓN (QUIZ SUITE)
   ========================================================= */

// 1. WidgetScenarioQuizMultiple (Selección Múltiple con Checkboxes)
export type ScenarioQuizMultipleBlockData = {
  badge: string;
  title: string;
  context: string;
  instruction: string;
  points: number;
  successFeedback: string;
  errorFeedback: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
};

// 2. WidgetScenarioQuizDragAndDrop (Clasificación por Arrastrar / Asignar a Categorías)
export type ScenarioQuizDragDropCategory = {
  id: string;
  title: string;
  subtitle: string;
  accentColor: 'emerald' | 'rose' | 'amber' | 'sky';
};

export type ScenarioQuizDragDropItem = {
  id: string;
  text: string;
  correctCategoryId: string;
  feedback: string;
};

export type ScenarioQuizDragAndDropBlockData = {
  badge: string;
  title: string;
  context: string;
  points: number;
  categories: ScenarioQuizDragDropCategory[];
  items: ScenarioQuizDragDropItem[];
};

// 3. WidgetScenarioQuizOrdering (Secuencia / Ordenar los Pasos del Protocolo 1..N)
export type ScenarioQuizOrderingStep = {
  id: string;
  text: string;
  correctPosition: number; // 1-based index (1, 2, 3, 4...)
  hint: string;
};

export type ScenarioQuizOrderingBlockData = {
  badge: string;
  title: string;
  context: string;
  points: number;
  steps: ScenarioQuizOrderingStep[];
};

// 4. WidgetScenarioQuizMatching (Emparejar Incidente/Riesgo ↔ Control/Responsable)
export type ScenarioQuizMatchingPair = {
  id: string;
  leftPrompt: string;
  leftBadge: string;
  rightMatch: string;
};

export type ScenarioQuizMatchingBlockData = {
  badge: string;
  title: string;
  context: string;
  points: number;
  pairs: ScenarioQuizMatchingPair[];
};

// 5. WidgetScenarioQuizFillBlank (Completar Espacios en Blanco / Cloze en Norma o Código)
export type ScenarioQuizBlankSegment = {
  type: 'text' | 'blank';
  text?: string;
  blankId?: string;
  correctAnswer?: string;
  options?: string[];
};

export type ScenarioQuizFillBlankBlockData = {
  badge: string;
  title: string;
  context: string;
  codeMode?: boolean;
  points: number;
  segments: ScenarioQuizBlankSegment[];
  feedbackSuccess: string;
  feedbackError: string;
};

// 6. WidgetScenarioQuizBranching (Simulación Ramificada / Árbol de Decisión de 2 Niveles)
export type ScenarioQuizBranchNode = {
  id: string;
  stageLabel: string;
  narrative: string;
  choices: {
    id: string;
    label: string;
    consequenceText: string;
    nextNodeId?: string; // Si no tiene nextNodeId, es nodo terminal
    impactScore: number; // Ej: 100 (óptimo), 50 (parcial), 0 (crítico)
    isOptimal: boolean;
  }[];
};

export type ScenarioQuizBranchingBlockData = {
  badge: string;
  title: string;
  context: string;
  points: number;
  initialNodeId: string;
  nodes: ScenarioQuizBranchNode[];
};

// 7. WidgetScenarioQuizTrueFalseMatrix (Matriz Rápida de Dictamen: Cumple / Incumple)
export type ScenarioQuizMatrixStatement = {
  id: string;
  statement: string;
  ruleReference: string;
  correctVerdict: 'cumple' | 'incumple';
  explanation: string;
};

export type ScenarioQuizTrueFalseMatrixBlockData = {
  badge: string;
  title: string;
  context: string;
  points: number;
  statements: ScenarioQuizMatrixStatement[];
};

// 8. WidgetScenarioQuizHotspotSpotter (Inspector de Código/Documento: Encontrar las Líneas con Riesgo)
export type ScenarioQuizSpotterLine = {
  lineNumber: number;
  codeOrText: string;
  isVulnerable: boolean;
  vulnerabilityExplanation?: string;
};

export type ScenarioQuizHotspotSpotterBlockData = {
  badge: string;
  title: string;
  context: string;
  fileName: string;
  targetVulnerableCount: number;
  points: number;
  lines: ScenarioQuizSpotterLine[];
};

// 9. WidgetScenarioQuizImageHotspot (Seleccionar una región/lado de una imagen donde está el elemento correcto, ej. seleccionar dónde está la batería en una banda)
export type ScenarioQuizImageHotspotZone = {
  id: string;
  label: string;
  xPercent: number; // 0..100
  yPercent: number; // 0..100
  widthPercent: number;
  heightPercent: number;
  isRiskTarget: boolean; // true = esta región es la correcta
  feedback: string;
};

export type ScenarioQuizImageHotspotBlockData = {
  badge: string;
  title: string;
  context: string;
  imageUrl?: string;
  apaCitation?: string;
  sceneType: 'rock-band-stage' | 'phishing-email' | 'custom-image';
  targetRiskCount?: number; // Por defecto 1 (seleccionar la zona correcta)
  points: number;
  zones: ScenarioQuizImageHotspotZone[];
};

// 10. WidgetScenarioQuizImageChoice (Selección Visual de Tarjetas con Imagen / Escena)
export type ScenarioQuizImageCardOption = {
  id: string;
  label: string;
  caption: string;
  visualType: 'clean-desk' | 'sticky-password' | 'unlocked-laptop';
  imageUrl?: string;
  apaCitation?: string;
  isCorrect: boolean;
  feedback: string;
};

export type ScenarioQuizImageChoiceBlockData = {
  badge: string;
  title: string;
  context: string;
  apaCitation?: string;
  points: number;
  cards: ScenarioQuizImageCardOption[];
};

// 11. WidgetScenarioQuizRiskSlider (Termómetro / Calibrador Interactivo de Nivel de Riesgo 1..5)
export type ScenarioQuizRiskSliderLevel = {
  level: number; // 1..5
  name: string;
  color: string;
  actionRequired: string;
};

export type ScenarioQuizRiskSliderBlockData = {
  badge: string;
  title: string;
  context: string;
  incidentSummary: string;
  correctLevel: number;
  points: number;
  explanation: string;
  levels: ScenarioQuizRiskSliderLevel[];
};

export type FinalReportBlockData = {
  badge: string;
  title: string;
  subtitle: string;
  passingScore: number;
};

/**
 * Modos de fondo configurables en cualquier widget del curso:
 * - 'default': Usa el color natural del bloque (#F4F5F7 o el color del curso en WidgetScenarioQuiz)
 * - 'soft': Gris corporativo suave (#F4F5F7)
 * - 'brand': Color institucional del curso (selectedBrand.bgQuiz, igual que WidgetScenarioQuiz)
 * - 'white': Blanco limpio (#FFFFFF)
 * - 'dark': Pizarra oscura (#0F172A)
 * - 'custom': Color HEX personalizado definido en `bgColor`
 */
export type WidgetBgMode = 'default' | 'soft' | 'brand' | 'white' | 'dark' | 'custom';

export type CourseBlockBgConfig = {
  bgMode?: WidgetBgMode;
  bgColor?: string;
};

export type CourseWidgetBlock = CourseBlockBgConfig &
  (
    | {
        id: string;
        type: 'hero-banner';
        componentName: 'WidgetHeroBanner';
        summary: string;
        data: HeroBannerBlockData;
      }
    | {
        id: string;
        type: 'image-cover-banner';
        componentName: 'WidgetImageCoverBanner';
        summary: string;
        data: ImageCoverBannerBlockData;
      }
    | {
        id: string;
        type: 'rich-text-editorial';
        componentName: 'WidgetRichTextEditorial';
        summary: string;
        data: RichTextEditorialBlockData;
      }
    | {
        id: string;
        type: 'video-editorial';
        componentName: 'WidgetVideoEditorial';
        summary: string;
        data: VideoEditorialBlockData;
      }
    | {
        id: string;
        type: 'code-walkthrough';
        componentName: 'WidgetCodeWalkthrough';
        summary: string;
        data: CodeWalkthroughBlockData;
      }
    | {
        id: string;
        type: 'slide-cards';
        componentName: 'WidgetSlideCards';
        summary: string;
        data: SlideCardsBlockData;
      }
    | {
        id: string;
        type: 'accordion-details';
        componentName: 'WidgetAccordionDetails';
        summary: string;
        data: AccordionBlockData;
      }
    | {
        id: string;
        type: 'code-comparison';
        componentName: 'WidgetCodeComparison';
        summary: string;
        data: CodeComparisonBlockData;
      }
    | {
        id: string;
        type: 'architecture-hotspots';
        componentName: 'WidgetArchitectureHotspots';
        summary: string;
        data: ArchitectureHotspotsBlockData;
      }
    | {
        id: string;
        type: 'architecture-hotspots-visual';
        componentName: 'WidgetArchitectureHotspotsVisual';
        summary: string;
        data: ArchitectureHotspotsVisualBlockData;
      }
    | {
        id: string;
        type: 'flip-cards-3d';
        componentName: 'WidgetFlipCards3D';
        summary: string;
        data: FlipCards3DBlockData;
      }
    | {
        id: string;
        type: 'pipeline-steps';
        componentName: 'WidgetStepToStep';
        summary: string;
        data: StepToStepBlockData;
      }
    | {
        id: string;
        type: 'checklist';
        componentName: 'WidgetChecklist';
        summary: string;
        data: ChecklistBlockData;
      }
    | {
        id: string;
        type: 'pipeline-checklist';
        componentName: 'WidgetPipelineChecklist';
        summary: string;
        data: PipelineChecklistBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz';
        componentName: 'WidgetScenarioQuiz' | 'WidgetScenarioQuizQuestion';
        summary: string;
        data: ScenarioQuizBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-multiple';
        componentName: 'WidgetScenarioQuizMultiple';
        summary: string;
        data: ScenarioQuizMultipleBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-drag-drop';
        componentName: 'WidgetScenarioQuizDragAndDrop';
        summary: string;
        data: ScenarioQuizDragAndDropBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-ordering';
        componentName: 'WidgetScenarioQuizOrdering';
        summary: string;
        data: ScenarioQuizOrderingBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-matching';
        componentName: 'WidgetScenarioQuizMatching';
        summary: string;
        data: ScenarioQuizMatchingBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-fill-blank';
        componentName: 'WidgetScenarioQuizFillBlank';
        summary: string;
        data: ScenarioQuizFillBlankBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-branching';
        componentName: 'WidgetScenarioQuizBranching';
        summary: string;
        data: ScenarioQuizBranchingBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-matrix';
        componentName: 'WidgetScenarioQuizTrueFalseMatrix';
        summary: string;
        data: ScenarioQuizTrueFalseMatrixBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-spotter';
        componentName: 'WidgetScenarioQuizHotspotSpotter';
        summary: string;
        data: ScenarioQuizHotspotSpotterBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-image-hotspot';
        componentName: 'WidgetScenarioQuizImageHotspot';
        summary: string;
        data: ScenarioQuizImageHotspotBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-image-choice';
        componentName: 'WidgetScenarioQuizImageChoice';
        summary: string;
        data: ScenarioQuizImageChoiceBlockData;
      }
    | {
        id: string;
        type: 'scenario-quiz-risk-slider';
        componentName: 'WidgetScenarioQuizRiskSlider';
        summary: string;
        data: ScenarioQuizRiskSliderBlockData;
      }
    | {
        id: string;
        type: 'final-report';
        componentName: 'WidgetFinalReport';
        summary: string;
        data: FinalReportBlockData;
      }
  );

export type CourseDocumentJSON = {
  courseId: string;
  version: string;
  title: string;
  institution: string;
  defaultBrandId: string;
  showScoreInBanner: boolean;
  lessons: CourseLessonMeta[];
  blocks: CourseWidgetBlock[];
};

