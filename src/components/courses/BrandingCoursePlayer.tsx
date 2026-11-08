import { useState, useRef, useEffect } from 'react';
import type {
  BrandPreset,
  ChecklistBlockData,
  CourseDocumentJSON,
  CourseWidgetBlock,
  PipelineChecklistBlockData,
  RichTextEditorialBlockData,
  ScenarioQuizBlockData,
  WidgetBgMode,
} from '../../data/courses/courseJsonTypes';
import {
  BRAND_PRESETS,
  INITIAL_BRANDING_COURSE_JSON,
} from '../../data/courses/brandingCourseDemoData';
import { EditBlockHeader } from './widgets/EditBlockHeader';
import { WidgetRichTextEditorial } from './widgets/WidgetRichTextEditorial';
import { WidgetHeroBanner } from './widgets/WidgetHeroBanner';
import { WidgetImageCoverBanner } from './widgets/WidgetImageCoverBanner';
import { WidgetVideoEditorial } from './widgets/WidgetVideoEditorial';
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

const STORAGE_KEY_COURSE_JSON = 'cc_course_json_draft_v11';

export default function BrandingCoursePlayer() {
  const mainScrollRef = useRef<HTMLDivElement>(null);

  // Documento JSON maestro que gobierna todo el curso y sus widgets atómicos
  const [courseDoc, setCourseDoc] = useState<CourseDocumentJSON>(INITIAL_BRANDING_COURSE_JSON);

  // Estados de branding y ajustes del reproductor
  const [selectedBrand, setSelectedBrand] = useState<BrandPreset>(
    BRAND_PRESETS.find((b) => b.id === INITIAL_BRANDING_COURSE_JSON.defaultBrandId) ||
      BRAND_PRESETS[0]
  );
  const [customInstitutionName, setCustomInstitutionName] = useState(
    INITIAL_BRANDING_COURSE_JSON.institution
  );
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScoreInBanner, setShowScoreInBanner] = useState(
    INITIAL_BRANDING_COURSE_JSON.showScoreInBanner
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Estados del Inspector / Editor JSON en vivo (?edit=true)
  const [jsonEditorOpen, setJsonEditorOpen] = useState(false);
  const [editingBlockId, setEditingBlockId] = useState<string | 'FULL_COURSE'>('FULL_COURSE');
  const [jsonDraftText, setJsonDraftText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSavedFlash, setJsonSavedFlash] = useState(false);

  // Estados de progreso del alumno y actividades evaluadas
  const [activeLessonId, setActiveLessonId] = useState('l3');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1', 'l2']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>(['chk-1', 'chk-2']);
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
        const savedRaw = window.localStorage.getItem(STORAGE_KEY_COURSE_JSON);
        if (savedRaw) {
          const parsed = JSON.parse(savedRaw) as CourseDocumentJSON;
          if (parsed && Array.isArray(parsed.blocks) && Array.isArray(parsed.lessons)) {
            setCourseDoc(parsed);
            if (parsed.institution) setCustomInstitutionName(parsed.institution);
            if (typeof parsed.showScoreInBanner === 'boolean') {
              setShowScoreInBanner(parsed.showScoreInBanner);
            }
            const foundPreset = BRAND_PRESETS.find((b) => b.id === parsed.defaultBrandId);
            if (foundPreset) setSelectedBrand(foundPreset);
          }
        }
      } catch {
        // Ignorar errores de parseo en localStorage
      }
    }
  }, []);

  const persistCourseDoc = (nextDoc: CourseDocumentJSON) => {
    setCourseDoc(nextDoc);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY_COURSE_JSON, JSON.stringify(nextDoc));
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
      const foundBlock = courseDoc.blocks.find((b) => b.id === target);
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
        if (!parsed || !Array.isArray(parsed.blocks) || !Array.isArray(parsed.lessons)) {
          setJsonError(
            'El JSON del curso debe contener las propiedades "lessons" (array) y "blocks" (array).'
          );
          return;
        }
        persistCourseDoc(parsed as CourseDocumentJSON);
        if (parsed.institution) setCustomInstitutionName(parsed.institution);
      } else {
        if (!parsed || typeof parsed.id !== 'string' || typeof parsed.type !== 'string' || !parsed.data) {
          setJsonError('El bloque JSON debe incluir "id", "type", "componentName" y "data".');
          return;
        }
        const nextBlocks = courseDoc.blocks.map((b) =>
          b.id === editingBlockId ? (parsed as CourseWidgetBlock) : b
        );
        persistCourseDoc({
          ...courseDoc,
          blocks: nextBlocks,
        });
      }
      setJsonSavedFlash(true);
      setTimeout(() => setJsonSavedFlash(false), 1800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de sintaxis JSON';
      setJsonError(`JSON inválido: ${msg}`);
    }
  };

  // Mover un bloque hacia arriba o abajo en el array blocks[] del JSON
  const moveBlock = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= courseDoc.blocks.length) return;
    const nextBlocks = [...courseDoc.blocks];
    const [moved] = nextBlocks.splice(index, 1);
    nextBlocks.splice(targetIndex, 0, moved);
    persistCourseDoc({
      ...courseDoc,
      blocks: nextBlocks,
    });
  };

  // Cambiar el color de fondo de cualquier widget y guardarlo en el JSON
  const updateBlockBackground = (blockId: string, bgMode: WidgetBgMode, bgColor?: string) => {
    const nextBlocks = courseDoc.blocks.map((b) => {
      if (b.id !== blockId) return b;
      return {
        ...b,
        bgMode,
        bgColor: bgMode === 'custom' || bgMode === 'soft' || bgMode === 'white' ? bgColor : undefined,
      };
    });
    const nextDoc: CourseDocumentJSON = {
      ...courseDoc,
      blocks: nextBlocks,
    };
    persistCourseDoc(nextDoc);
    if (jsonEditorOpen) {
      if (editingBlockId === 'FULL_COURSE') {
        setJsonDraftText(JSON.stringify(nextDoc, null, 2));
      } else if (editingBlockId === blockId) {
        const updatedBlock = nextBlocks.find((b) => b.id === blockId);
        if (updatedBlock) {
          setJsonDraftText(JSON.stringify(updatedBlock, null, 2));
        }
      }
    }
  };

  // Actualizar en vivo los datos de un bloque de texto enriquecido Tiptap y sincronizar con el JSON
  const updateRichTextBlockData = (blockId: string, nextData: RichTextEditorialBlockData) => {
    const nextBlocks = courseDoc.blocks.map((b) => {
      if (b.id !== blockId || b.type !== 'rich-text-editorial') return b;
      return {
        ...b,
        data: nextData,
      };
    });
    const nextDoc: CourseDocumentJSON = {
      ...courseDoc,
      blocks: nextBlocks,
    };
    persistCourseDoc(nextDoc);
    if (jsonEditorOpen) {
      if (editingBlockId === 'FULL_COURSE') {
        setJsonDraftText(JSON.stringify(nextDoc, null, 2));
      } else if (editingBlockId === blockId) {
        const updatedBlock = nextBlocks.find((b) => b.id === blockId);
        if (updatedBlock) {
          setJsonDraftText(JSON.stringify(updatedBlock, null, 2));
        }
      }
    }
  };

  // Restaurar el JSON original de fábrica
  const handleResetCourseJsonToDefault = () => {
    persistCourseDoc(INITIAL_BRANDING_COURSE_JSON);
    setCustomInstitutionName(INITIAL_BRANDING_COURSE_JSON.institution);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY_COURSE_JSON);
    }
    if (editingBlockId === 'FULL_COURSE') {
      setJsonDraftText(JSON.stringify(INITIAL_BRANDING_COURSE_JSON, null, 2));
    } else {
      const defaultBlock = INITIAL_BRANDING_COURSE_JSON.blocks.find(
        (b) => b.id === editingBlockId
      );
      if (defaultBlock) {
        setJsonDraftText(JSON.stringify(defaultBlock, null, 2));
      }
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

  const lessons = courseDoc.lessons || [];
  const progressPct =
    lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;

  const toggleLessonComplete = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleChecklistItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToWidget = (elementId: string, lessonId?: string) => {
    if (lessonId) setActiveLessonId(lessonId);
    const container = mainScrollRef.current;
    const el = document.getElementById(elementId);
    if (container && el) {
      const top = el.offsetTop - 56;
      container.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Extraer dinámicamente las preguntas del bloque scenario-quiz y el checklist del bloque pipeline-checklist en el JSON
  const quizBlock = courseDoc.blocks.find((b) => b.type === 'scenario-quiz') as
    | Extract<CourseWidgetBlock, { type: 'scenario-quiz' }>
    | undefined;
  const scenarioQuestions = (quizBlock?.data as ScenarioQuizBlockData | undefined)?.questions || [];

  const checklistBlock = courseDoc.blocks.find((b) => b.type === 'checklist') as
    | Extract<CourseWidgetBlock, { type: 'checklist' }>
    | undefined;
  const pipelineBlock = courseDoc.blocks.find((b) => b.type === 'pipeline-checklist') as
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
  const suiteQuizBlocks = courseDoc.blocks.filter((b) =>
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

  const handleSubmitQuizQuestion = (questionId: string) => {
    if (!selectedOptions[questionId]) return;
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    if (!completedLessons.includes('l5')) {
      setCompletedLessons((prev) => [...prev, 'l5']);
    }
    if (
      activeScenarioIdx === scenarioQuestions.length - 1 &&
      !completedLessons.includes('l11')
    ) {
      setCompletedLessons((prev) => [...prev, 'l11']);
    }
  };

  const modulesList = Array.from(new Set(lessons.map((l) => l.module)));
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

  const renderAtomicBlock = (block: CourseWidgetBlock, index: number) => {
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
          totalBlocks={courseDoc.blocks.length}
          bgMode={block.bgMode || 'default'}
          bgColor={block.bgColor}
          resolvedBgColor={sectionBg}
          brandBgColor={selectedBrand.bgQuiz}
          onChangeBg={(nextMode, nextColor) =>
            updateBlockBackground(block.id, nextMode, nextColor)
          }
          onMoveUp={() => moveBlock(index, -1)}
          onMoveDown={() => moveBlock(index, 1)}
          onEditJson={() => openJsonEditorFor(block.id)}
        />

        {block.type === 'hero-banner' && (
          <WidgetHeroBanner
            data={block.data}
            brand={selectedBrand}
            institutionName={effectiveInstitution}
            totalLessons={lessons.length}
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
            onNavigateNext={(targetId, lessonId) => scrollToWidget(targetId, lessonId)}
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
            onSubmitQuestion={handleSubmitQuizQuestion}
            earnedQuizScore={baseEarnedQuizScore}
            maxQuizScore={baseMaxQuizScore}
            onViewReport={(targetId) => scrollToWidget(targetId, 'l20')}
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
            courseTitle={courseDoc.title}
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
            completedLessonsCount={completedLessons.length}
            totalLessonsCount={lessons.length}
            onJumpToScenario={(idx) => {
              setActiveScenarioIdx(idx);
              scrollToWidget(quizBlock?.id || 'widget-quiz', 'l5');
            }}
            onResetEvaluation={() => {
              setSelectedOptions({});
              setSubmittedQuestions({});
              setExtraQuizScores({});
              setActiveScenarioIdx(0);
              scrollToWidget(quizBlock?.id || 'widget-quiz', 'l5');
            }}
            onCompleteAllLessons={() => {
              setCompletedLessons(lessons.map((l) => l.id));
            }}
          />
        )}
      </section>
    );
  };

  return (
    <div
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
          PARTE 1 (IZQUIERDA): SIDEBAR FIJO DE ÍNDICE PASO A PASO (~280px)
         ========================================================= */}
      <aside
        id="sidebar-index"
        style={{
          width: sidebarOpen ? '280px' : '0px',
          minWidth: sidebarOpen ? '280px' : '0px',
          maxWidth: sidebarOpen ? '280px' : '0px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          borderRight: sidebarOpen ? '1px solid #E2E8F0' : 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.25s ease, min-width 0.25s ease, max-width 0.25s ease',
          flexShrink: 0,
          zIndex: 30,
          outline: isEditMode && sidebarOpen ? '2px dashed #F59E0B' : 'none',
          outlineOffset: '-2px',
        }}
      >
        {isEditMode && (
          <div
            style={{
              backgroundColor: '#0F172A',
              color: '#FDE047',
              fontSize: '10px',
              fontWeight: 900,
              fontFamily: '"JetBrains Mono", Consolas, monospace',
              padding: '5px 12px',
              borderBottom: '1px dashed #F59E0B',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>✏️ SidebarIndice</span>
            <span style={{ color: '#38BDF8' }}>#sidebar-index</span>
          </div>
        )}

        <div
          style={{
            backgroundColor: selectedBrand.primary,
            color: '#FFFFFF',
            padding: '22px 20px 18px 20px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '3px 8px',
                borderRadius: '4px',
              }}
            >
              {effectiveInstitution}
            </span>
            <button
              type="button"
              onClick={() => setShowSearch((s) => !s)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px',
              }}
              title="Buscar en el curso"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <h1
            style={{
              fontSize: '19px',
              fontWeight: 800,
              lineHeight: 1.25,
              margin: '0 0 20px 0',
              color: '#FFFFFF',
            }}
          >
            {courseDoc.title}
          </h1>

          {showSearch && (
            <div style={{ marginBottom: '14px' }}>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar lección..."
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '12px',
                  color: '#1E293B',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <span>{progressPct}% COMPLETA</span>
            <span>
              {completedLessons.length}/{lessons.length}
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                backgroundColor: '#FFFFFF',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
          }}
        >
          {modulesList.map((modName) => {
            const lessonsInMod = lessons.filter(
              (l) =>
                l.module === modName &&
                (!searchTerm.trim() ||
                  l.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            if (lessonsInMod.length === 0) return null;

            return (
              <div key={modName}>
                <div
                  style={{
                    padding: '14px 18px 10px 18px',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '9.5px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#1E293B',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{modName}</span>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>⌄</span>
                </div>

                {lessonsInMod.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = activeLessonId === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      style={{
                        position: 'relative',
                        borderBottom: '1px solid #F1F5F9',
                        backgroundColor: isActive ? '#F8FAFC' : '#FFFFFF',
                        padding: '15px 18px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '10px',
                      }}
                    >
                      {isActive && (
                        <div
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            backgroundColor: selectedBrand.primary,
                          }}
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => scrollToWidget(lesson.targetId, lesson.id)}
                        style={{
                          flex: 1,
                          textAlign: 'left',
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10.5px',
                            color: '#64748B',
                            marginBottom: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span>≡</span>
                        </div>
                        <div
                          style={{
                            fontSize: '13px',
                            lineHeight: 1.38,
                            fontWeight: isActive ? 700 : 500,
                            color: '#1E293B',
                          }}
                        >
                          {lesson.title}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleLessonComplete(lesson.id)}
                        title={
                          isCompleted
                            ? 'Lección completada (clic para cambiar)'
                            : 'Marcar como completada'
                        }
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {isCompleted ? (
                          <span
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '999px',
                              backgroundColor: selectedBrand.primary,
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: 900,
                            }}
                          >
                            ✓
                          </span>
                        ) : isActive ? (
                          <span
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '999px',
                              border: '2px solid #CBD5E1',
                              borderTopColor: selectedBrand.primary,
                              borderRightColor: selectedBrand.primary,
                              display: 'block',
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              width: '16px',
                              height: '16px',
                              borderRadius: '999px',
                              border: '1.5px solid #CBD5E1',
                              display: 'block',
                            }}
                          />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>

      {/* =========================================================
          PARTE 2 (DERECHA): LIENZO DEL CURSO CON SCROLL INDEPENDIENTE
         ========================================================= */}
      <div
        ref={mainScrollRef}
        style={{
          flex: 1,
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
                  ✏️ MODO EDITOR (?edit=true) · {courseDoc.blocks.length} bloques JSON
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
        {courseDoc.blocks.map((block, index) => renderAtomicBlock(block, index))}
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
              {courseDoc.blocks.map((b, i) => (
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
