import { useState, useRef, useEffect } from 'react';
import type {
  BrandPreset,
  ChecklistBlockData,
  CourseDocumentJSON,
  CourseSeccion,
  CourseWidgetBlock,
  LegacyCourseDocument,
  PipelineChecklistBlockData,
  RichTextEditorialBlockData,
  ScenarioQuizBlockData,
  WidgetBgMode,
} from '../../data/courses/courseJsonTypes';
import { BRAND_PRESETS } from '../../data/courses/brandPresets';
import { getModuleContents, isCourseDocument, migrateLegacyCourse, upgradeCourseDraft } from '../../data/courses/courseDocument';
import { CourseLoadingSkeleton } from './CourseLoadingSkeleton';
import { EditBlockHeader } from './widgets/EditBlockHeader';
import { WidgetRichTextEditorial } from './widgets/WidgetRichTextEditorial';
import { WidgetHeroBanner } from './widgets/WidgetHeroBanner';
import { WidgetImageCoverBanner } from './widgets/WidgetImageCoverBanner';
import { WidgetVideoEditorial } from './widgets/WidgetVideoEditorial';
import { WidgetDocumentResources } from './widgets/WidgetDocumentResources';
import { WidgetCodeWalkthrough } from './widgets/WidgetCodeWalkthrough';
import { WidgetSlideCards } from './widgets/WidgetSlideCards';
import { WidgetAccordionDetails } from './widgets/WidgetAccordionDetails';
import { WidgetCodeComparison } from './widgets/WidgetCodeComparison';
import { WidgetArchitectureHotspots } from './widgets/WidgetArchitectureHotspots';
import { WidgetArchitectureHotspotsVisual } from './widgets/WidgetArchitectureHotspotsVisual';
import { WidgetFlipCards3D } from './widgets/WidgetFlipCards3D';
import { WidgetStepToStep } from './widgets/WidgetStepToStep';
import { WidgetChecklist } from './widgets/WidgetChecklist';
import { WidgetPipelineChecklist } from './widgets/WidgetPipelineChecklist';
import { WidgetScenarioQuiz } from './widgets/WidgetScenarioQuiz';
import { WidgetFinalReport } from './widgets/WidgetFinalReport';
import { WidgetScenarioQuizMultiple } from './widgets/WidgetScenarioQuizMultiple';
import { WidgetScenarioQuizDragAndDrop } from './widgets/WidgetScenarioQuizDragAndDrop';
import { WidgetScenarioQuizOrdering } from './widgets/WidgetScenarioQuizOrdering';
import { WidgetScenarioQuizMatching } from './widgets/WidgetScenarioQuizMatching';
import { WidgetScenarioQuizFillBlank } from './widgets/WidgetScenarioQuizFillBlank';
import { WidgetScenarioQuizBranching } from './widgets/WidgetScenarioQuizBranching';
import { WidgetScenarioQuizTrueFalseMatrix } from './widgets/WidgetScenarioQuizTrueFalseMatrix';
import { WidgetScenarioQuizHotspotSpotter } from './widgets/WidgetScenarioQuizHotspotSpotter';
import { WidgetScenarioQuizImageHotspot } from './widgets/WidgetScenarioQuizImageHotspot';
import { WidgetScenarioQuizImageChoice } from './widgets/WidgetScenarioQuizImageChoice';
import { WidgetScenarioQuizRiskSlider } from './widgets/WidgetScenarioQuizRiskSlider';
import { WidgetSidebarIndice } from './widgets/WidgetSidebarIndice';

export default function BrandingCoursePlayer({ courseUrl }: { courseUrl: string }) {
  const [course, setCourse] = useState<CourseDocumentJSON>();
  const [moduleId, setModuleId] = useState('');
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCourse() {
      try {
        const response = await fetch(courseUrl, { signal: controller.signal });
        if (!response.ok) throw new Error('Error al cargar el curso');
        const document: unknown = await response.json();
        if (!isCourseDocument(document)) throw new Error('El JSON del curso no es válido');
        if (controller.signal.aborted) return;
        setModuleId(new URLSearchParams(window.location.search).get('modulo') || document.modulos[0].id);
        setCourse(document);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    void loadCourse();
    return () => controller.abort();
  }, [courseUrl, attempt]);

  if (error) {
    return (
      <main style={{ padding: '24px' }}>
        <p role="alert">No se pudo cargar el curso.</p>
        <button type="button" onClick={() => {
          setError(false);
          setAttempt((value) => value + 1);
        }}>Volver a intentar</button>
      </main>
    );
  }

  if (!course) return <CourseLoadingSkeleton />;

  return (
    <BrandingModulePlayer
      key={`${course.courseId}:${moduleId}`}
      initialCourse={course}
      moduleId={moduleId}
      onSelectModule={(id) => {
        const url = new URL(window.location.href);
        url.searchParams.set('modulo', id);
        window.history.replaceState({}, '', url.toString());
        setModuleId(id);
      }}
    />
  );
}

function BrandingModulePlayer({ initialCourse, moduleId, onSelectModule }: {
  initialCourse: CourseDocumentJSON;
  moduleId: string;
  onSelectModule: (moduleId: string) => void;
}) {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const storageKey = `cc_course_json_draft_v13:${initialCourse.courseId}`;

  const [courseDoc, setCourseDoc] = useState(initialCourse);
  const activeModule = courseDoc.modulos.find((module) => module.id === moduleId) || courseDoc.modulos[0];
  const contents = getModuleContents(activeModule);
  const blocks = contents.map((content) => content.widget);

  // Estados de branding y ajustes del reproductor
  const [selectedBrand, setSelectedBrand] = useState<BrandPreset>(
    BRAND_PRESETS.find((b) => b.id === initialCourse.defaultBrandId) ||
      BRAND_PRESETS[0]
  );
  const [customInstitutionName, setCustomInstitutionName] = useState(
    initialCourse.institution
  );
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScoreInBanner, setShowScoreInBanner] = useState(
    initialCourse.showScoreInBanner
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window === 'undefined' || window.matchMedia('(min-width: 768px)').matches
  );

  // Estados del Inspector / Editor JSON en vivo (?edit=true)
  const [jsonEditorOpen, setJsonEditorOpen] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | 'FULL_COURSE'>('FULL_COURSE');
  const [jsonDraftText, setJsonDraftText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSavedFlash, setJsonSavedFlash] = useState(false);

  // Estados de progreso del alumno y actividades evaluadas
  const [activeContentId, setActiveContentId] = useState('');
  const [completedContents, setCompletedContents] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [extraQuizScores, setExtraQuizScores] = useState<
    Record<string, { earned: number; max: number }>
  >({});

  const handleExtraQuizScoreChange = (blockId: string, earned: number, max: number) => {
    setExtraQuizScores((prev) => ({
      ...prev,
      [blockId]: { earned, max },
    }));
  };

  // Al montar: leer ?edit=true y restaurar borrador JSON desde localStorage si existe
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const editParam = params.get('edit');
      if (editParam === 'true' || editParam === '1') {
        setIsEditMode(true);
      }

      try {
        const savedRaw = window.localStorage.getItem(storageKey);
        const legacyRaw = savedRaw ? null : window.localStorage.getItem('cc_course_json_draft_v12');
        let draft: unknown = savedRaw ? JSON.parse(savedRaw) : null;
        if (legacyRaw) {
          const legacy = JSON.parse(legacyRaw) as LegacyCourseDocument | null;
          if (legacy?.courseId === initialCourse.courseId &&
              Array.isArray(legacy.blocks) && Array.isArray(legacy.lessons)) {
            const migrated = migrateLegacyCourse(legacy, initialCourse.title, initialCourse.modulos[0].id);
            draft = { ...migrated, modulos: [...migrated.modulos, ...initialCourse.modulos.slice(1)] };
          }
        }
        if (isCourseDocument(draft) && draft.courseId === initialCourse.courseId) {
          setCourseDoc(upgradeCourseDraft(draft, initialCourse));
          setCustomInstitutionName(draft.institution);
          setShowScoreInBanner(draft.showScoreInBanner);
          setSelectedBrand(BRAND_PRESETS.find((brand) => brand.id === draft.defaultBrandId) || BRAND_PRESETS[0]);
        }
      } catch {
        // Ignorar errores de parseo en localStorage
      }
    }
  }, [initialCourse, storageKey]);

  const persistCourseDoc = (nextDoc: CourseDocumentJSON) => {
    setCourseDoc(nextDoc);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(nextDoc));
      } catch {
        // Ignorar si quota está llena
      }
    }
  };

  const toggleEditModeUrl = () => {
    setIsEditMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (next) {
          url.searchParams.set('edit', 'true');
        } else {
          url.searchParams.delete('edit');
          setJsonEditorOpen(false);
        }
        window.history.replaceState({}, '', url.toString());
      }
      return next;
    });
  };

  // Abrir el editor JSON para un bloque específico o para todo el curso
  const openJsonEditorFor = (target: string | 'FULL_COURSE') => {
    setJsonError(null);
    setEditingBlockId(target);
    if (target === 'FULL_COURSE') {
      setJsonDraftText(JSON.stringify(courseDoc, null, 2));
    } else {
      const foundBlock = blocks.find((b) => b.id === target);
      if (foundBlock) {
        setJsonDraftText(JSON.stringify(foundBlock, null, 2));
      }
    }
    setJsonEditorOpen(true);
  };

  // Aplicar cambios desde el editor JSON al estado en vivo y guardar en localStorage
  const handleApplyJsonChanges = () => {
    setJsonError(null);
    try {
      const parsed = JSON.parse(jsonDraftText);
      if (editingBlockId === 'FULL_COURSE') {
        if (!isCourseDocument(parsed) || parsed.courseId !== initialCourse.courseId) {
          setJsonError(
            'Revisa la estructura de módulos, Lessions, Secciones y Contenidos del curso.'
          );
          return;
        }
        persistCourseDoc(parsed);
        setCustomInstitutionName(parsed.institution);
        setShowScoreInBanner(parsed.showScoreInBanner);
        setSelectedBrand(BRAND_PRESETS.find((brand) => brand.id === parsed.defaultBrandId) || BRAND_PRESETS[0]);
        if (!parsed.modulos.some((module) => module.id === activeModule.id)) {
          onSelectModule(parsed.modulos[0].id);
        }
      } else {
        if (!parsed || parsed.id !== editingBlockId || typeof parsed.type !== 'string' ||
            typeof parsed.componentName !== 'string' || typeof parsed.summary !== 'string' ||
            !parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) {
          setJsonError('El bloque debe conservar su ID e incluir tipo, componente, resumen y datos.');
          return;
        }
        persistCourseDoc(updateWidget(editingBlockId, () => parsed as CourseWidgetBlock));
      }
      setJsonSavedFlash(true);
      setTimeout(() => setJsonSavedFlash(false), 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de sintaxis JSON';
      setJsonError(`JSON inválido: ${msg}`);
    }
  };

  const updateSections = (update: (section: CourseSeccion) => CourseSeccion): CourseDocumentJSON => ({
    ...courseDoc,
    modulos: courseDoc.modulos.map((module) => module.id === activeModule.id ? {
      ...module,
      lessions: module.lessions.map((lession) => ({
        ...lession,
        secciones: lession.secciones.map(update),
      })),
    } : module),
  });

  const updateWidget = (blockId: string, update: (block: CourseWidgetBlock) => CourseWidgetBlock) =>
    updateSections((section) => ({
      ...section,
      contenidos: section.contenidos.map((content) =>
        content.widget.id === blockId ? { ...content, widget: update(content.widget) } : content
      ),
    }));

  const moveBlock = (section: CourseSeccion, index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= section.contenidos.length) return;
    const contenidos = [...section.contenidos];
    const [moved] = contenidos.splice(index, 1);
    contenidos.splice(targetIndex, 0, moved);
    const nextDoc = updateSections((entry) => entry === section ? { ...entry, contenidos } : entry);
    persistCourseDoc(nextDoc);
    if (jsonEditorOpen && editingBlockId === 'FULL_COURSE') {
      setJsonDraftText(JSON.stringify(nextDoc, null, 2));
    }
  };

  const saveWidgetEdit = (blockId: string, update: (block: CourseWidgetBlock) => CourseWidgetBlock) => {
    const nextDoc = updateWidget(blockId, update);
    persistCourseDoc(nextDoc);
    if (!jsonEditorOpen) return;
    if (editingBlockId === 'FULL_COURSE') {
      setJsonDraftText(JSON.stringify(nextDoc, null, 2));
    } else if (editingBlockId === blockId) {
      const block = blocks.find((entry) => entry.id === blockId);
      if (block) setJsonDraftText(JSON.stringify(update(block), null, 2));
    }
  };

  const updateBlockBackground = (blockId: string, bgMode: WidgetBgMode, bgColor?: string) => {
    saveWidgetEdit(blockId, (block) => ({
      ...block,
      bgMode,
      bgColor: bgMode === 'custom' || bgMode === 'soft' || bgMode === 'white' ? bgColor : undefined,
    }));
  };

  const updateRichTextBlockData = (blockId: string, data: RichTextEditorialBlockData) => {
    saveWidgetEdit(blockId, (block) => block.type === 'rich-text-editorial' ? { ...block, data } : block);
  };

  // Restaurar el JSON original de fábrica
  const handleResetCourseJsonToDefault = () => {
    persistCourseDoc(initialCourse);
    setCustomInstitutionName(initialCourse.institution);
    setShowScoreInBanner(initialCourse.showScoreInBanner);
    setSelectedBrand(BRAND_PRESETS.find((brand) => brand.id === initialCourse.defaultBrandId) || BRAND_PRESETS[0]);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(storageKey);
        const legacy = JSON.parse(window.localStorage.getItem('cc_course_json_draft_v12') || 'null');
        if (legacy?.courseId === initialCourse.courseId) {
          window.localStorage.removeItem('cc_course_json_draft_v12');
        }
      } catch {
        // El editor sigue funcionando si el almacenamiento no está disponible.
      }
    }
    if (!initialCourse.modulos.some((module) => module.id === activeModule.id)) {
      onSelectModule(initialCourse.modulos[0].id);
    }
    if (editingBlockId === 'FULL_COURSE') {
      setJsonDraftText(JSON.stringify(initialCourse, null, 2));
    } else {
      const defaultModule = initialCourse.modulos.find((module) => module.id === activeModule.id);
      const defaultBlock = defaultModule && getModuleContents(defaultModule)
        .find((content) => content.widget.id === editingBlockId)?.widget;
      setEditingBlockId(defaultBlock ? editingBlockId : 'FULL_COURSE');
      setJsonDraftText(JSON.stringify(defaultBlock || initialCourse, null, 2));
    }
  };

  // Descargar el archivo .json del curso
  const handleDownloadCourseJson = () => {
    if (typeof window === 'undefined') return;
    const blob = new Blob([JSON.stringify(courseDoc, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseDoc.courseId || 'curso-interactivo'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completedCount = contents.filter((content) => completedContents.includes(content.id)).length;
  const progressPct = contents.length ? Math.round((completedCount / contents.length) * 100) : 0;

  const toggleSectionComplete = (section: CourseSeccion) => {
    const ids = section.contenidos.map((content) => content.id);
    setCompletedContents((previous) => ids.every((id) => previous.includes(id))
      ? previous.filter((id) => !ids.includes(id))
      : [...new Set([...previous, ...ids])]
    );
  };

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToWidget = (elementId: string) => {
    const content = contents.find((entry) => entry.widget.id === elementId);
    if (content) setActiveContentId(content.id);
    const container = mainScrollRef.current;
    const el = document.getElementById(elementId);
    if (container && el) {
      const headerHeight = document.getElementById('topbar-header')?.offsetHeight || 0;
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top +
        container.scrollTop - headerHeight;
      container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.matchMedia('(max-width: 767px)').matches) setSidebarOpen(false);
  };

  // Extraer dinámicamente las preguntas del bloque scenario-quiz y el checklist del bloque pipeline-checklist en el JSON
  const quizBlock = blocks.find((b) => b.type === 'scenario-quiz') as
    | Extract<CourseWidgetBlock, { type: 'scenario-quiz' }>
    | undefined;
  const scenarioQuestions = (quizBlock?.data as ScenarioQuizBlockData | undefined)?.questions || [];

  const checklistBlock = blocks.find((b) => b.type === 'checklist') as
    | Extract<CourseWidgetBlock, { type: 'checklist' }>
    | undefined;
  const pipelineBlock = blocks.find((b) => b.type === 'pipeline-checklist') as
    | Extract<CourseWidgetBlock, { type: 'pipeline-checklist' }>
    | undefined;
  const checklistItems =
    (checklistBlock?.data as ChecklistBlockData | undefined)?.checklist ||
    (pipelineBlock?.data as PipelineChecklistBlockData | undefined)?.checklist ||
    [];

  const baseMaxQuizScore = scenarioQuestions.reduce((acc, q) => acc + q.points, 0);
  const baseEarnedQuizScore = scenarioQuestions.reduce((acc, q) => {
    if (!submittedQuestions[q.id]) return acc;
    const selectedId = selectedOptions[q.id];
    const opt = q.options.find((o) => o.id === selectedId);
    return opt?.isCorrect ? acc + q.points : acc;
  }, 0);

  // Sumar también el puntaje de los nuevos widgets interactivos de la suite Quiz
  const suiteQuizBlocks = blocks.filter((b) =>
    [
      'scenario-quiz-multiple',
      'scenario-quiz-drag-drop',
      'scenario-quiz-ordering',
      'scenario-quiz-matching',
      'scenario-quiz-fill-blank',
      'scenario-quiz-branching',
      'scenario-quiz-matrix',
      'scenario-quiz-spotter',
      'scenario-quiz-image-hotspot',
      'scenario-quiz-image-choice',
      'scenario-quiz-risk-slider',
    ].includes(b.type)
  );

  const suiteMaxPoints = suiteQuizBlocks.reduce((acc, b) => {
    const pts = (b.data as { points?: number }).points || 0;
    return acc + pts;
  }, 0);

  const suiteEarnedPoints = suiteQuizBlocks.reduce((acc, b) => {
    return acc + (extraQuizScores[b.id]?.earned || 0);
  }, 0);

  const maxQuizScore = baseMaxQuizScore + suiteMaxPoints;
  const earnedQuizScore = baseEarnedQuizScore + suiteEarnedPoints;

  const answeredScenariosCount = scenarioQuestions.filter((q) =>
    Boolean(submittedQuestions[q.id])
  ).length;

  const checklistScorePct =
    checklistItems.length > 0
      ? Math.round((checkedItems.length / checklistItems.length) * 100)
      : 0;

  // Score Global Ponderado sobre 100 (70% todas las evaluaciones Quiz + 30% Checklist de Producción)
  const quizPctNormalized =
    maxQuizScore > 0 ? Math.round((earnedQuizScore / maxQuizScore) * 100) : 0;
  const globalScore = Math.round(quizPctNormalized * 0.7 + checklistScorePct * 0.3);

  const handleSelectQuizOption = (questionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setSubmittedQuestions((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  const handleSubmitQuizQuestion = (blockId: string, questionId: string) => {
    if (!selectedOptions[questionId]) return;
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    const content = contents.find((entry) => entry.widget.id === blockId);
    if (content) {
      setCompletedContents((previous) =>
        previous.includes(content.id) ? previous : [...previous, content.id]
      );
    }
  };

  const effectiveInstitution = customInstitutionName || selectedBrand.institution;

  /* =========================================================
     REGISTRO DE WIDGETS ATÓMICOS (Renderizador desde JSON)
     ========================================================= */
  const resolveBlockBackground = (block: CourseWidgetBlock): string => {
    const mode = block.bgMode || 'default';
    if (mode === 'soft') return '#F4F5F7';
    if (mode === 'white') return '#FFFFFF';
    if (mode === 'brand') return selectedBrand.bgQuiz;
    if (mode === 'dark') return '#0F172A';
    if (mode === 'custom' && block.bgColor) return block.bgColor;

    // Por defecto:
    // - WidgetScenarioQuiz usa el color del curso (selectedBrand.bgQuiz)
    // - WidgetFinalReport usa pizarra oscura (#0F172A)
    // - Todos los demás widgets usan #F4F5F7 por defecto (y pueden cambiar su color en bgMode/bgColor)
    if (block.type === 'scenario-quiz') return selectedBrand.bgQuiz;
    if (block.type === 'final-report') return '#0F172A';
    return block.bgColor || '#F4F5F7';
  };

  const renderAtomicBlock = (block: CourseWidgetBlock, index: number, section: CourseSeccion) => {
    const isQuizSection = block.type === 'scenario-quiz';
    const isReportSection = block.type === 'final-report';
    const sectionBg = resolveBlockBackground(block);

    return (
      <section
        key={block.id}
        id={block.id}
        style={{
          backgroundColor: sectionBg,
          color: isReportSection || block.bgMode === 'dark' ? '#FFFFFF' : undefined,
          borderBottom:
            isQuizSection || isReportSection || block.type === 'hero-banner'
              ? 'none'
              : '1px solid #E2E8F0',
          outline: isEditMode ? '2px dashed #F59E0B' : 'none',
          outlineOffset: '-2px',
          transition: 'background-color 0.25s ease',
        }}
      >
        <EditBlockHeader
          show={isEditMode}
          componentName={block.componentName}
          blockId={block.id}
          blockType={block.type}
          summary={block.summary}
          index={index}
          totalBlocks={section.contenidos.length}
          bgMode={block.bgMode || 'default'}
          bgColor={block.bgColor}
          resolvedBgColor={sectionBg}
          brandBgColor={selectedBrand.bgQuiz}
          onChangeBg={(nextMode, nextColor) =>
            updateBlockBackground(block.id, nextMode, nextColor)
          }
          onMoveUp={() => moveBlock(section, index, -1)}
          onMoveDown={() => moveBlock(section, index, 1)}
          onEditJson={() => openJsonEditorFor(block.id)}
        />

        {block.type === 'hero-banner' && (
          <WidgetHeroBanner
            data={block.data}
            brand={selectedBrand}
            institutionName={effectiveInstitution}
            totalLessons={activeModule.lessions.length}
          />
        )}

        {block.type === 'image-cover-banner' && (
          <WidgetImageCoverBanner
            data={block.data}
            brand={selectedBrand}
            institutionName={effectiveInstitution}
          />
        )}

        {block.type === 'rich-text-editorial' && (
          <WidgetRichTextEditorial
            data={block.data}
            brand={selectedBrand}
            isEditMode={isEditMode}
            onUpdateData={(nextData) => updateRichTextBlockData(block.id, nextData)}
          />
        )}

        {block.type === 'video-editorial' && (
          <WidgetVideoEditorial
            data={block.data}
            brand={selectedBrand}
            institutionName={effectiveInstitution}
          />
        )}

        {block.type === 'document-resources' && (
          <WidgetDocumentResources data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'code-walkthrough' && (
          <WidgetCodeWalkthrough data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'slide-cards' && (
          <WidgetSlideCards data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'accordion-details' && (
          <WidgetAccordionDetails
            data={block.data}
            brand={selectedBrand}
            onNavigateNext={scrollToWidget}
          />
        )}

        {block.type === 'code-comparison' && (
          <WidgetCodeComparison data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'architecture-hotspots' && (
          <WidgetArchitectureHotspots data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'architecture-hotspots-visual' && (
          <WidgetArchitectureHotspotsVisual data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'flip-cards-3d' && (
          <WidgetFlipCards3D data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'pipeline-steps' && (
          <WidgetStepToStep data={block.data} brand={selectedBrand} />
        )}

        {block.type === 'checklist' && (
          <WidgetChecklist
            data={block.data}
            brand={selectedBrand}
            checkedItems={checkedItems}
            onToggleChecklistItem={toggleChecklistItem}
          />
        )}

        {block.type === 'pipeline-checklist' && (
          <WidgetPipelineChecklist
            data={block.data}
            brand={selectedBrand}
            checkedItems={checkedItems}
            onToggleChecklistItem={toggleChecklistItem}
          />
        )}

        {block.type === 'scenario-quiz' && (
          <WidgetScenarioQuiz
            data={block.data}
            brand={selectedBrand}
            activeScenarioIdx={activeScenarioIdx}
            onSelectScenarioIdx={setActiveScenarioIdx}
            selectedOptions={selectedOptions}
            submittedQuestions={submittedQuestions}
            onSelectOption={handleSelectQuizOption}
            onSubmitQuestion={(questionId) => handleSubmitQuizQuestion(block.id, questionId)}
            earnedQuizScore={baseEarnedQuizScore}
            maxQuizScore={baseMaxQuizScore}
            onViewReport={scrollToWidget}
          />
        )}

        {block.type === 'scenario-quiz-multiple' && (
          <WidgetScenarioQuizMultiple
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-drag-drop' && (
          <WidgetScenarioQuizDragAndDrop
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-ordering' && (
          <WidgetScenarioQuizOrdering
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-matching' && (
          <WidgetScenarioQuizMatching
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-fill-blank' && (
          <WidgetScenarioQuizFillBlank
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-branching' && (
          <WidgetScenarioQuizBranching
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-matrix' && (
          <WidgetScenarioQuizTrueFalseMatrix
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-spotter' && (
          <WidgetScenarioQuizHotspotSpotter
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-image-hotspot' && (
          <WidgetScenarioQuizImageHotspot
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            isEditMode={isEditMode}
            onUpdateData={(data) => saveWidgetEdit(block.id, (current) =>
              current.type === 'scenario-quiz-image-hotspot' ? { ...current, data } : current
            )}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-image-choice' && (
          <WidgetScenarioQuizImageChoice
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-risk-slider' && (
          <WidgetScenarioQuizRiskSlider
            blockId={block.id}
            data={block.data}
            brand={selectedBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'final-report' && (
          <WidgetFinalReport
            data={block.data}
            brand={selectedBrand}
            institutionName={effectiveInstitution}
            courseTitle={activeModule.title}
            globalScore={globalScore}
            earnedQuizScore={earnedQuizScore}
            maxQuizScore={maxQuizScore}
            answeredScenariosCount={answeredScenariosCount + Object.keys(extraQuizScores).length}
            scenarioQuestions={scenarioQuestions}
            submittedQuestions={submittedQuestions}
            selectedOptions={selectedOptions}
            checklistScorePct={checklistScorePct}
            checkedItemsCount={checkedItems.length}
            totalChecklistCount={checklistItems.length}
            progressPct={progressPct}
            completedLessonsCount={completedCount}
            totalLessonsCount={contents.length}
            onJumpToScenario={(idx) => {
              setActiveScenarioIdx(idx);
              if (quizBlock) scrollToWidget(quizBlock.id);
            }}
            onResetEvaluation={() => {
              setSelectedOptions({});
              setSubmittedQuestions({});
              setExtraQuizScores({});
              setActiveScenarioIdx(0);
              if (quizBlock) scrollToWidget(quizBlock.id);
            }}
            onCompleteAllLessons={() => {
              setCompletedContents(contents.map((content) => content.id));
            }}
          />
        )}
      </section>
    );
  };

  return (
    <div
      className="relative max-md:[&>#sidebar-index]:absolute max-md:[&>#sidebar-index]:inset-s-0 max-md:[&>#sidebar-index]:top-0 max-md:[&>#sidebar-index]:pt-14"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#F5F6F8',
        color: '#262C30',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* =========================================================
          PARTE 1 (IZQUIERDA): SIDEBAR DE ÍNDICE (Lession -> Seccion -> Contenidos)
         ========================================================= */}
      <WidgetSidebarIndice
        sidebarOpen={sidebarOpen}
        isEditMode={isEditMode}
        brand={selectedBrand}
        institutionName={effectiveInstitution}
        moduleTitle={activeModule.title}
        lessions={activeModule.lessions}
        activeContentId={activeContentId}
        completedContents={completedContents}
        onSelectContent={scrollToWidget}
        onToggleSectionComplete={toggleSectionComplete}
      />

      {/* =========================================================
          PARTE 2 (DERECHA): LIENZO DEL CURSO CON SCROLL INDEPENDIENTE
         ========================================================= */}
      <div
        ref={mainScrollRef}
        style={{
          flex: 1,
          minWidth: 0,
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Barra Superior Flotante */}
        <div
          id="topbar-header"
          className="max-md:z-[35]!"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(6px)',
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              aria-controls="sidebar-index"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((o) => !o)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
              }}
              title={sidebarOpen ? 'Contraer menú lateral' : 'Expandir menú lateral'}
            >
              ☰
            </button>

            {courseDoc.modulos.length > 1 && (
              <select
                aria-label="Módulo del curso"
                value={activeModule.id}
                onChange={(event) => onSelectModule(event.target.value)}
                style={{ maxWidth: '260px', padding: '6px', border: '1px solid #CBD5E1', borderRadius: '6px' }}
              >
                {courseDoc.modulos.map((module) => (
                  <option key={module.id} value={module.id}>{module.title}</option>
                ))}
              </select>
            )}

            {/* Icono + Nombre de la Institución */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 12px 4px 6px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
              }}
            >
              <span
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: selectedBrand.primary,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    lineHeight: 1.1,
                  }}
                >
                  Institución
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: 1.2,
                  }}
                >
                  {effectiveInstitution}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {isEditMode && (
              <>
                <span
                  style={{
                    backgroundColor: '#0F172A',
                    color: '#FDE047',
                    border: '1px dashed #F59E0B',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '10.5px',
                    fontWeight: 900,
                    fontFamily: '"JetBrains Mono", Consolas, monospace',
                  }}
                >
                  ✏️ MODO EDITOR (?edit=true) · {blocks.length} bloques JSON
                </span>

                <button
                  type="button"
                  onClick={() => openJsonEditorFor('FULL_COURSE')}
                  style={{
                    backgroundColor: '#F59E0B',
                    color: '#0F172A',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    fontFamily: '"JetBrains Mono", Consolas, monospace',
                  }}
                >
                  {'{ }'} Ver / Editar JSON del Curso
                </button>
              </>
            )}

            {/* Contador en vivo de Score (Oculto por defecto; solo visible si se activa en Settings y sin botón VER REPORTE) */}
            {showScoreInBanner && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  backgroundColor: selectedBrand.primaryLight,
                  color: selectedBrand.primary,
                  border: `1px solid ${selectedBrand.primary}`,
                  fontSize: '11.5px',
                  fontWeight: 800,
                }}
              >
                <span>🏆 SCORE: {globalScore}/100 PTS</span>
              </div>
            )}

            {/* Botón ⚙ que abre el Modal de Configuración + Salir */}
            <button
              type="button"
              onClick={() => setShowSettingsModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '20px',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#1E293B',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
              title="Cambiar color institucional o salir de la actividad"
            >
              <span style={{ fontSize: '12px', color: '#64748B' }}>⚙</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            RENDERIZADO DINÁMICO DE LOS WIDGETS ATÓMICOS DESDE JSON
           ========================================================= */}
        {activeModule.lessions.map((lession) => (
          <div key={lession.id}>
            {lession.secciones.map((section) => (
              <div key={section.id}>
                {section.contenidos.map(({ widget }, index) => renderAtomicBlock(widget, index, section))}
              </div>
            ))}
          </div>
        ))}
        {contents.length === 0 && <p style={{ padding: '24px' }}>Este módulo aún no tiene contenidos.</p>}
      </div>

      {/* =========================================================
          DRAWER / INSPECTOR DE JSON EN VIVO (SOLO EN ?edit=true)
         ========================================================= */}
      {isEditMode && jsonEditorOpen && (
        <div
          style={{
            width: '480px',
            minWidth: '420px',
            maxWidth: '50vw',
            height: '100vh',
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            borderLeft: '2px solid #F59E0B',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 50,
            boxShadow: '-12px 0 36px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#1E293B',
              borderBottom: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  color: '#F59E0B',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                MOTOR DE CONTENIDO BASADO EN JSON
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, margin: '2px 0 0 0', color: '#FFFFFF' }}>
                {editingBlockId === 'FULL_COURSE'
                  ? 'Documento JSON Completo del Curso'
                  : `Editando Bloque: #${editingBlockId}`}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => setJsonEditorOpen(false)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '6px',
                border: '1px solid #475569',
                backgroundColor: '#0F172A',
                color: '#E2E8F0',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              title="Cerrar editor JSON"
            >
              ✕
            </button>
          </div>

          {/* Selector rápido de bloque dentro del inspector */}
          <div
            style={{
              padding: '10px 20px',
              backgroundColor: '#0F172A',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <select
              value={editingBlockId}
              onChange={(e) => openJsonEditorFor(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: '"JetBrains Mono", Consolas, monospace',
              }}
            >
              <option value="FULL_COURSE">📦 Curso Completo (CourseDocumentJSON)</option>
              {blocks.map((b, i) => (
                <option key={b.id} value={b.id}>
                  {i + 1}. {b.componentName} (#{b.id})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleDownloadCourseJson}
              style={{
                backgroundColor: '#1E293B',
                color: '#38BDF8',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              title="Descargar archivo .json para guardar en base de datos o repositorio"
            >
              ⬇ Exportar .json
            </button>
          </div>

          {/* Editor de texto JSON */}
          <div style={{ flex: 1, padding: '14px 20px', display: 'flex', flexDirection: 'column' }}>
            <textarea
              value={jsonDraftText}
              onChange={(e) => setJsonDraftText(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#020617',
                color: '#A7F3D0',
                border: jsonError ? '1.5px solid #EF4444' : '1px solid #334155',
                borderRadius: '8px',
                padding: '14px',
                fontFamily: '"JetBrains Mono", Consolas, monospace',
                fontSize: '12px',
                lineHeight: 1.55,
                resize: 'none',
                outline: 'none',
              }}
            />

            {jsonError && (
              <div
                style={{
                  marginTop: '10px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #EF4444',
                  color: '#FCA5A5',
                  fontSize: '11.5px',
                  fontFamily: 'monospace',
                }}
              >
                {jsonError}
              </div>
            )}
          </div>

          {/* Barra inferior de acciones del Editor JSON */}
          <div
            style={{
              padding: '14px 20px',
              backgroundColor: '#1E293B',
              borderTop: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={handleResetCourseJsonToDefault}
              style={{
                backgroundColor: 'transparent',
                color: '#94A3B8',
                border: '1px solid #475569',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ↺ Restaurar original
            </button>

            <button
              type="button"
              onClick={handleApplyJsonChanges}
              style={{
                backgroundColor: jsonSavedFlash ? '#10B981' : '#F59E0B',
                color: '#0F172A',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 18px',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
              }}
            >
              {jsonSavedFlash ? '✓ ¡Cambios Aplicados al Curso!' : '✓ Aplicar JSON en Vivo'}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL DE CAMBIO DE COLOR Y SALIDA DE LA ACTIVIDAD
         ========================================================= */}
      {showSettingsModal && (
        <div
          onClick={() => setShowSettingsModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                backgroundColor: selectedBrand.primary,
                color: '#FFFFFF',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    opacity: 0.9,
                  }}
                >
                  CONFIGURACIÓN DE LA ACTIVIDAD
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 900, margin: '4px 0 0 0' }}>
                  Personalización y Salida
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '6px',
                  }}
                >
                  Nombre de la Institución
                </label>
                <input
                  type="text"
                  value={customInstitutionName}
                  onChange={(e) => setCustomInstitutionName(e.target.value)}
                  placeholder="Ej: Café y Código..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '10px',
                  }}
                >
                  Cambiar Color del Curso
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                  }}
                >
                  {BRAND_PRESETS.map((preset) => {
                    const isSelected = preset.id === selectedBrand.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedBrand(preset);
                          setCustomInstitutionName(preset.institution);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px',
                          borderRadius: '8px',
                          border: isSelected
                            ? `2px solid ${preset.primary}`
                            : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#F8FAFC' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '999px',
                            backgroundColor: preset.primary,
                            flexShrink: 0,
                            border: '2px solid #FFFFFF',
                            boxShadow: '0 0 0 1px #CBD5E1',
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 800,
                              color: '#0F172A',
                              lineHeight: 1.2,
                            }}
                          >
                            {preset.name}
                          </div>
                          <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                            {preset.institution}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label
                  onClick={() => setShowScoreInBanner((v) => !v)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: showScoreInBanner
                      ? `1.5px solid ${selectedBrand.primary}`
                      : '1px solid #E2E8F0',
                    backgroundColor: showScoreInBanner ? '#F8FAFC' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 800,
                        color: '#0F172A',
                      }}
                    >
                      Mostrar Score en el banner superior
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Muestra el puntaje en vivo arriba sin el botón de reporte
                    </div>
                  </div>
                  <span
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '999px',
                      backgroundColor: showScoreInBanner ? selectedBrand.primary : '#CBD5E1',
                      position: 'relative',
                      transition: 'background-color 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: showScoreInBanner ? '21px' : '3px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '999px',
                        backgroundColor: '#FFFFFF',
                        transition: 'left 0.2s',
                      }}
                    />
                  </span>
                </label>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label
                  onClick={toggleEditModeUrl}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: isEditMode ? '1.5px solid #F59E0B' : '1px solid #E2E8F0',
                    backgroundColor: isEditMode ? '#FFFBEB' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 800,
                        color: '#0F172A',
                      }}
                    >
                      ✏️ Modo Editor (?edit=true)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Muestra controles de bloques y el editor JSON en vivo
                    </div>
                  </div>
                  <span
                    style={{
                      width: '40px',
                      height: '22px',
                      borderRadius: '999px',
                      backgroundColor: isEditMode ? '#F59E0B' : '#CBD5E1',
                      position: 'relative',
                      transition: 'background-color 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '3px',
                        left: isEditMode ? '21px' : '3px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '999px',
                        backgroundColor: '#FFFFFF',
                        transition: 'left 0.2s',
                      }}
                    />
                  </span>
                </label>
              </div>

              <div
                style={{
                  paddingTop: '18px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: selectedBrand.primary,
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  ✓ Aplicar y Continuar en el Curso
                </button>

                <a
                  href="/cursos/"
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: '8px',
                    border: '1px solid #FECACA',
                    backgroundColor: '#FEF2F2',
                    color: '#B91C1C',
                    fontSize: '12.5px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    textAlign: 'center',
                    display: 'block',
                  }}
                >
                  🚪 Salir de la Actividad
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
