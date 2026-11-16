import { Fragment, useState, useRef, useEffect, useMemo } from 'react';
import type {
  BrandPreset,
  CourseDocumentJSON,
  CourseContenido,
  CourseSeccion,
  CourseWidgetBlock,
  LegacyCourseDocument,
  RichTextEditorialBlockData,
  ScenarioQuizBlockData,
  WidgetBgMode,
} from '../../data/courses/courseJsonTypes';
import { BRAND_PRESETS } from '../../data/courses/brandPresets';
import { getModuleContents, getModulePages, isCourseDocument, migrateLegacyCourse, splitLegacyVideoQuotes, upgradeCourseDraft } from '../../data/courses/courseDocument';
import { CourseLoadingSkeleton } from './CourseLoadingSkeleton';
import { CanvasInsertBar, CourseInsertDialog, type CanvasInsertion } from './CourseCanvasEditor';
import { saveLocalCourse } from '../../lib/localCourseClient';
import { EditBlockHeader } from './widgets/EditBlockHeader';
import { WidgetPropertiesEditor } from './widgets/WidgetPropertiesEditor';
import { widgetTemplates } from '../../data/courses/widgetTemplates';
import { WidgetRichTextEditorial } from './widgets/WidgetRichTextEditorial';
import { WidgetHeroBanner } from './widgets/WidgetHeroBanner';
import { WidgetImageCoverBanner } from './widgets/WidgetImageCoverBanner';
import { WidgetVideoEditorial } from './widgets/WidgetVideoEditorial';
import { WidgetEditorialQuote } from './widgets/WidgetEditorialQuote';
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

function hasEditParam(params: URLSearchParams) {
  const edit = params.get('edit');
  return edit === 'true' || edit === '1';
}

export default function BrandingCoursePlayer({ courseUrl, editCourseUrl, sequence = false, backHref, allowManagement = false }: {
  courseUrl?: string;
  editCourseUrl?: string;
  sequence?: boolean;
  backHref?: string;
  allowManagement?: boolean;
}) {
  const [course, setCourse] = useState<CourseDocumentJSON>();
  const [moduleId, setModuleId] = useState('');
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [source, setSource] = useState<'curso' | 'plantillas'>();
  const [revision, setRevision] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    async function loadCourse() {
      try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id') ?? '';
        const managed = allowManagement && !courseUrl && params.get('gestionar') === '1';
        const useTemplateCourse = Boolean(editCourseUrl) && (params.get('lienzo') === 'plantillas' ||
          (params.get('lienzo') !== 'curso' && hasEditParam(params)));
        const configuredUrl = useTemplateCourse ? editCourseUrl : courseUrl;
        const url = configuredUrl ?? (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ? `/contenidos/${id}.json` : '');
        if (!url) throw new Error('Identificador de asignatura inválido');
        const response = await fetch(url, { signal: controller.signal, cache: managed ? 'no-store' : 'default' });
        if (!response.ok) throw new Error('Error al cargar el curso');
        const raw = await response.text();
        const document: unknown = JSON.parse(raw);
        if (!isCourseDocument(document)) throw new Error('El JSON del curso no es válido');
        if (controller.signal.aborted) return;
        const requestedModule = params.get('modulo');
        setModuleId(document.modulos.find((module) => module.id === requestedModule)?.id ?? document.modulos[0]?.id ?? '');
        setRevision(managed ? raw : undefined);
        setSource(editCourseUrl ? (useTemplateCourse ? 'plantillas' : 'curso') : undefined);
        setCourse(splitLegacyVideoQuotes(document));
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    void loadCourse();
    return () => controller.abort();
  }, [courseUrl, editCourseUrl, attempt, allowManagement]);

  if (error) {
    return (
      <main style={{ padding: '24px' }}>
        <p role="alert">No se pudo cargar el curso.</p>
        {backHref && <p><a href={backHref}>Volver al curso</a></p>}
        {!backHref && sequence && <p><a href="/app/contenidos/">Volver a las asignaturas</a></p>}
        <button type="button" onClick={() => {
          setError(false);
          setAttempt((value) => value + 1);
        }}>Volver a intentar</button>
      </main>
    );
  }

  if (!course) return <CourseLoadingSkeleton />;
  const managementHref = '/app/contenidos/administrar/?curso=' + encodeURIComponent(course.courseId);
  if (!course.modulos.length) return <main className="p-6">
    <h1 className="text-2xl font-bold">{course.title}</h1>
    <p>Este curso aún no tiene módulos.</p>
    <a href={revision !== undefined ? managementHref : backHref ?? '/app/contenidos/'}>← Volver</a>
  </main>;

  return (
    <BrandingModulePlayer
      key={`${course.courseId}:${moduleId}`}
      initialCourse={course}
      moduleId={moduleId}
      sequence={sequence && revision === undefined}
      backHref={revision === undefined ? backHref : managementHref}
      onSaveManaged={revision === undefined ? undefined : async (document) => {
        const nextRevision = await saveLocalCourse(document, revision);
        setRevision(nextRevision);
        setCourse(document);
      }}
      source={source}
      onSelectModule={(id) => {
        const url = new URL(window.location.href);
        url.searchParams.set('modulo', id);
        url.searchParams.delete('pagina');
        window.history.replaceState({}, '', url.toString());
        setModuleId(id);
      }}
    />
  );
}

export function BrandingModulePlayer({ initialCourse, moduleId, onSelectModule, sequence, backHref, preview = false, source, onSaveManaged }: {
  initialCourse: CourseDocumentJSON;
  moduleId: string;
  onSelectModule: (moduleId: string) => void;
  sequence: boolean;
  backHref?: string;
  preview?: boolean;
  source?: 'curso' | 'plantillas';
  onSaveManaged?: (document: CourseDocumentJSON) => Promise<void>;
}) {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const storageKey = `cc_course_json_draft_v13:${initialCourse.courseId}`;

  const [courseDoc, setCourseDoc] = useState(initialCourse);
  const activeModule = courseDoc.modulos.find((module) => module.id === moduleId) || courseDoc.modulos[0];
  const contents = getModuleContents(activeModule);
  const blocks = contents.map((content) => content.widget);
  const pages = useMemo(() => getModulePages(activeModule), [activeModule]);
  const [pageId, setPageId] = useState(() => !preview && !sequence && typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('pagina') ?? '' : '');
  const currentPageIndex = Math.max(0, pages.findIndex((page) => page.id === pageId));
  const currentPage = pages[currentPageIndex];
  const pendingNavigation = useRef<{ pageId: string; widgetId?: string } | null>(null);
  const [insertion, setInsertion] = useState<CanvasInsertion>();
  const [canvasFeedback, setCanvasFeedback] = useState<{ message: string; error?: boolean }>();
  const [savingManaged, setSavingManaged] = useState(false);
  const managed = Boolean(onSaveManaged);
  const managedDirty = managed && initialCourse !== courseDoc;

  useEffect(() => {
    if (!managedDirty && !savingManaged) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [managedDirty, savingManaged]);

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
  const [propertiesBlockId, setPropertiesBlockId] = useState<string>();
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
  const [activeContentId, setActiveContentId] = useState(sequence ? contents[0]?.id ?? '' : '');
  const currentStep = Math.max(0, contents.findIndex((content) => content.id === activeContentId));
  const [completedContents, setCompletedContents] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [scenarioIndexes, setScenarioIndexes] = useState<Record<string, number>>({});
  const [evaluationResets, setEvaluationResets] = useState<Record<string, number>>({});
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
    if (sequence || preview) return;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (hasEditParam(params)) {
        setIsEditMode(true);
      }
      if (managed) return;

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
          setCourseDoc(splitLegacyVideoQuotes(upgradeCourseDraft(draft, initialCourse)));
          setCustomInstitutionName(draft.institution);
          setShowScoreInBanner(draft.showScoreInBanner);
          setSelectedBrand(BRAND_PRESETS.find((brand) => brand.id === draft.defaultBrandId) || BRAND_PRESETS[0]);
        }
      } catch {
        // Ignorar errores de parseo en localStorage
      }
    }
  }, [initialCourse, storageKey, sequence, preview, managed]);

  const persistCourseDoc = (document: CourseDocumentJSON) => {
    const nextDoc = splitLegacyVideoQuotes(document);
    setCourseDoc(nextDoc);
    if (!preview && !managed && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(nextDoc));
      } catch {
        return false;
      }
    }
    return true;
  };

  const toggleEditModeUrl = () => {
    const next = !isEditMode;
    const url = new URL(window.location.href);
    if (source) url.searchParams.set('lienzo', source);
    if (next) {
      url.searchParams.set('edit', 'true');
    } else {
      url.searchParams.delete('edit');
      setJsonEditorOpen(false);
      setPropertiesBlockId(undefined);
    }
    window.history.replaceState({}, '', url);
    setIsEditMode(next);
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
        if (!isCourseDocument(parsed) || !parsed.modulos.length || parsed.courseId !== initialCourse.courseId) {
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

  const navigatePage = (id: string, widgetId?: string, contentId?: string) => {
    pendingNavigation.current = { pageId: id, widgetId };
    setPageId(id);
    if (!preview && !sequence) {
      const url = new URL(window.location.href);
      if (source) url.searchParams.set('lienzo', source);
      if (id) url.searchParams.set('pagina', id);
      else url.searchParams.delete('pagina');
      window.history.replaceState({}, '', url);
    }
    if (widgetId) setActiveContentId(contentId ?? contents.find(({ widget }) => widget.id === widgetId)?.id ?? '');
    else setActiveContentId('');
    if (window.matchMedia('(max-width: 767px)').matches) setSidebarOpen(false);
  };

  function scrollWithinCanvas(elementId: string, behavior: ScrollBehavior = 'auto') {
    const container = mainScrollRef.current;
    const el = document.getElementById(elementId);
    if (container && el) {
      const headerHeight = document.getElementById('topbar-header')?.offsetHeight || 0;
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top +
        container.scrollTop - headerHeight;
      container.scrollTo({ top: Math.max(0, top), behavior });
    }
  }

  useEffect(() => {
    const target = pendingNavigation.current;
    if (!target || target.pageId !== currentPage.id) return;
    pendingNavigation.current = null;
    if (target.widgetId) {
      scrollWithinCanvas(target.widgetId);
      document.getElementById(target.widgetId)?.focus({ preventScroll: true });
    } else {
      mainScrollRef.current?.scrollTo({ top: 0 });
      mainScrollRef.current?.querySelector<HTMLElement>('.canvas-page-heading')?.focus({ preventScroll: true });
    }
  }, [currentPage.id, courseDoc]);

  const saveCanvasChange = (next: CourseDocumentJSON, message: string) => {
    const saved = persistCourseDoc(next);
    if (jsonEditorOpen && editingBlockId === 'FULL_COURSE') {
      setJsonDraftText(JSON.stringify(next, null, 2));
    }
    setInsertion(undefined);
    setCanvasFeedback(managed ? { message: message + ' Guarda el módulo para conservar el cambio.' } : saved
      ? { message: message + ' Guardado en este navegador.' }
      : { message: message + ' No se pudo guardar en el navegador. Descarga el JSON para conservar el cambio.', error: true });
  };

  const saveManaged = async () => {
    if (!onSaveManaged || savingManaged) return;
    setSavingManaged(true);
    try {
      await onSaveManaged(courseDoc);
      setCanvasFeedback({ message: 'Contenido guardado.' });
    } catch (error) {
      setCanvasFeedback({ message: (error as Error).message, error: true });
    } finally {
      setSavingManaged(false);
    }
  };

  const applyInsertion = (value: { template: CourseContenido } | { title: string }) => {
    if (!insertion) return false;
    const section = currentPage.sections.find(({ id }) => id === insertion.sectionId);
    if (!section) return false;
    const anchor = insertion.afterId ?? insertion.beforeId;
    const anchorIndex = section.contenidos.findIndex(({ id }) => id === anchor);
    if (anchor && anchorIndex < 0) return false;
    const at = !anchor ? 0 : insertion.afterId ? anchorIndex + 1 : anchorIndex;
    const before = section.contenidos.slice(0, at);
    const after = section.contenidos.slice(at);
    const id = 'canvas-' + crypto.randomUUID();

    if ('template' in value) {
      const item = structuredClone(value.template);
      item.id = id;
      item.widget.id = id;
      const next = updateSections((entry) => entry === section
        ? { ...section, contenidos: [...before, item, ...after] } : entry);
      saveCanvasChange(next, 'Recurso añadido.');
      setPropertiesBlockId(id);
      navigatePage(currentPage.id, id, id);
    } else {
      const newSection: CourseSeccion = { id, title: value.title, pageBreak: true, contenidos: after };
      const next = {
        ...courseDoc,
        modulos: courseDoc.modulos.map((module) => module === activeModule ? {
          ...module,
          lessions: module.lessions.map((lesson) => ({
            ...lesson,
            secciones: lesson.secciones.flatMap((entry) => entry === section
              ? [...(before.length || entry.pageBreak ? [{ ...entry, contenidos: before }] : []), newSection]
              : [entry]),
          })),
        } : module),
      };
      saveCanvasChange(next, 'Página creada.');
      navigatePage(id);
    }
    return true;
  };

  const removePageBreak = () => {
    if (!currentPage.id) return;
    const next = {
      ...courseDoc,
      modulos: courseDoc.modulos.map((module) => module === activeModule ? {
        ...module,
        lessions: module.lessions.map((lesson) => ({
          ...lesson,
          secciones: lesson.secciones.flatMap((section) => {
            if (section.id !== currentPage.id) return [section];
            const { pageBreak: _, ...rest } = section;
            return section.contenidos.length ? [rest] : [];
          }),
        })),
      } : module),
    };
    saveCanvasChange(next, 'Salto eliminado. Se conservaron los recursos.');
    navigatePage(pages[currentPageIndex - 1]?.id ?? '');
  };

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
    if (sequence) {
      container?.scrollTo({ top: 0 });
      if (window.matchMedia('(max-width: 767px)').matches) setSidebarOpen(false);
      return;
    }
    const page = pages.find((entry) => entry.contents.some(({ widget }) => widget.id === elementId));
    if (page && page.id !== currentPage.id) {
      navigatePage(page.id, elementId);
      return;
    }
    scrollWithinCanvas(elementId, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
    if (window.matchMedia('(max-width: 767px)').matches) setSidebarOpen(false);
  };

  const attemptKey = (blockId: string, itemId: string) => JSON.stringify([blockId, itemId]);
  const earnedFor = (questions: ScenarioQuizBlockData['questions']) => questions.reduce((acc, question) =>
    submittedQuestions[question.id] && question.options.some((option) =>
      option.isCorrect && option.id === selectedOptions[question.id]) ? acc + question.points : acc, 0);

  function getEvaluation(scope: CourseContenido[]) {
    const questions = scope.flatMap(({ widget }) => widget.type === 'scenario-quiz'
      ? widget.data.questions.map((question, index) => ({
        widgetId: widget.id, index, question: { ...question, id: attemptKey(widget.id, question.id) },
      }))
      : []);
    const scenarioQuestions = questions.map(({ question }) => question);
    const checklistIds = scope.flatMap(({ widget }) => widget.type === 'checklist' || widget.type === 'pipeline-checklist'
      ? widget.data.checklist.map(({ id }) => attemptKey(widget.id, id)) : []);
    const suite = scope.filter(({ widget }) => widget.type.startsWith('scenario-quiz-'));
    const earnedQuizScore = earnedFor(scenarioQuestions) + suite.reduce((acc, { widget }) => acc + (extraQuizScores[widget.id]?.earned ?? 0), 0);
    const maxQuizScore = scenarioQuestions.reduce((acc, question) => acc + question.points, 0) +
      suite.reduce((acc, { widget }) => acc + ((widget.data as { points?: number }).points ?? 0), 0);
    const checkedItemsCount = checklistIds.filter((id) => checkedItems.includes(id)).length;
    const checklistScorePct = checklistIds.length ? Math.round(checkedItemsCount * 100 / checklistIds.length) : 0;
    const quizPct = maxQuizScore ? Math.round(earnedQuizScore * 100 / maxQuizScore) : 0;
    const quizWeight = maxQuizScore ? (checklistIds.length ? 70 : 100) : 0;
    const checklistWeight = checklistIds.length ? (maxQuizScore ? 30 : 100) : 0;
    const globalScore = Math.round((quizPct * quizWeight + checklistScorePct * checklistWeight) / 100);
    const completedLessonsCount = scope.filter(({ id }) => completedContents.includes(id)).length;
    return { questions, checklistIds, globalScore, maxQuizScore, earnedQuizScore, scenarioQuestions, quizWeight, checklistWeight,
      totalScenariosCount: scenarioQuestions.length + suite.length,
      answeredScenariosCount: scenarioQuestions.filter(({ id }) => submittedQuestions[id]).length +
        suite.filter(({ widget }) => extraQuizScores[widget.id]).length,
      checklistScorePct, checkedItemsCount, totalChecklistCount: checklistIds.length,
      completedLessonsCount, totalLessonsCount: scope.length,
      progressPct: scope.length ? Math.round(completedLessonsCount * 100 / scope.length) : 0 };
  }

  const sequenceContent = contents[currentStep];
  const scorePage = sequence ? pages.find((page) => page.contents.includes(sequenceContent)) ?? currentPage : currentPage;
  const globalScore = getEvaluation(scorePage.contents).globalScore;

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
    const key = attemptKey(blockId, questionId);
    if (!selectedOptions[key]) return;
    setSubmittedQuestions((prev) => ({ ...prev, [key]: true }));
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
  const resolveBlockBackground = (block: CourseWidgetBlock, brand: BrandPreset): string => {
    const mode = block.bgMode || 'default';
    if (mode === 'soft') return '#F4F5F7';
    if (mode === 'white') return '#FFFFFF';
    if (mode === 'brand') return brand.bgQuiz;
    if (mode === 'dark') return '#0F172A';
    if (mode === 'custom' && block.bgColor) return block.bgColor;

    // Por defecto:
    // - WidgetScenarioQuiz usa el color del curso (brand.bgQuiz)
    // - WidgetFinalReport usa pizarra oscura (#0F172A)
    // - Todos los demás widgets usan #F4F5F7 por defecto (y pueden cambiar su color en bgMode/bgColor)
    if (block.type === 'scenario-quiz') return brand.bgQuiz;
    if (block.type === 'final-report') return '#0F172A';
    return block.bgColor || '#F4F5F7';
  };

  const renderAtomicBlock = (block: CourseWidgetBlock, index: number, section: CourseSeccion, isTemplatePreview = false) => {
    const canEdit = isEditMode && !isTemplatePreview;
    const isQuizSection = block.type === 'scenario-quiz';
    const isReportSection = block.type === 'final-report';
    const blockBrand = { ...selectedBrand, ...block.brandColors };
    const sectionBg = resolveBlockBackground(block, blockBrand);
    const page = pages.find((entry) => entry.sections.includes(section)) ?? currentPage;
    const activityContents = isTemplatePreview ? section.contenidos : page.contents;
    const reportIndex = isReportSection || block.type === 'scenario-quiz'
      ? activityContents.findIndex(({ widget }) => widget === block) : -1;
    const previousReportIndex = isReportSection ? activityContents.findLastIndex(({ widget }, i) =>
      i < reportIndex && widget.type === 'final-report') : -1;
    const reportScope = isReportSection ? activityContents.slice(previousReportIndex + 1, reportIndex + 1) : [];
    const evaluation = isReportSection ? getEvaluation(reportScope) : undefined;
    const scenarioQuestions = block.type === 'scenario-quiz' ? block.data.questions : [];
    const localSelections = Object.fromEntries(scenarioQuestions.map(({ id }) => [id, selectedOptions[attemptKey(block.id, id)]]));
    const localSubmissions = Object.fromEntries(scenarioQuestions.map(({ id }) => [id, submittedQuestions[attemptKey(block.id, id)]]));
    const localChecks = block.type === 'checklist' || block.type === 'pipeline-checklist'
      ? block.data.checklist.filter(({ id }) => checkedItems.includes(attemptKey(block.id, id))).map(({ id }) => id) : [];
    const reportTarget = block.type === 'scenario-quiz'
      ? activityContents.slice(reportIndex + 1).find(({ widget }) => widget.type === 'final-report')
      : undefined;

    return (
      <section
        key={evaluationResets[block.id] ?? 0}
        id={isTemplatePreview ? undefined : block.id}
        tabIndex={-1}
        style={{
          backgroundColor: sectionBg,
          color: isReportSection || block.bgMode === 'dark' ? '#FFFFFF' : undefined,
          borderBottom:
            isQuizSection || isReportSection || block.type === 'hero-banner'
              ? 'none'
              : '1px solid #E2E8F0',
          outline: canEdit ? '2px dashed #F59E0B' : 'none',
          outlineOffset: '-2px',
          transition: 'background-color 0.25s ease',
        }}
      >
        <EditBlockHeader
          show={canEdit}
          componentName={block.componentName}
          blockId={block.id}
          blockType={block.type}
          summary={block.summary}
          index={index}
          totalBlocks={section.contenidos.length}
          bgMode={block.bgMode || 'default'}
          bgColor={block.bgColor}
          resolvedBgColor={sectionBg}
          brandBgColor={blockBrand.bgQuiz}
          onChangeBg={(nextMode, nextColor) =>
            updateBlockBackground(block.id, nextMode, nextColor)
          }
          onMoveUp={() => moveBlock(section, index, -1)}
          onMoveDown={() => moveBlock(section, index, 1)}
          onEditJson={() => openJsonEditorFor(block.id)}
          onEditProperties={() => setPropertiesBlockId((id) => id === block.id ? undefined : block.id)}
        />

        {canEdit && propertiesBlockId === block.id && (
          <div className="mx-auto max-w-3xl p-4">
            <WidgetPropertiesEditor key={block.id} widget={block}
              examples={widgetTemplates.filter(({ widget }) => widget.type === block.type).map(({ widget }) => widget)}
              onCancel={() => setPropertiesBlockId(undefined)}
              onSave={(next) => {
                saveWidgetEdit(block.id, () => next);
                setPropertiesBlockId(undefined);
              }} />
          </div>
        )}
        {block.type === 'hero-banner' && (
          <WidgetHeroBanner
            data={block.data}
            brand={blockBrand}
            institutionName={effectiveInstitution}
            totalLessons={activeModule.lessions.length}
          />
        )}

        {block.type === 'image-cover-banner' && (
          <WidgetImageCoverBanner
            data={block.data}
            brand={blockBrand}
            institutionName={effectiveInstitution}
          />
        )}

        {block.type === 'rich-text-editorial' && (
          <WidgetRichTextEditorial
            data={block.data}
            brand={blockBrand}
            isEditMode={canEdit}
            onUpdateData={(nextData) => updateRichTextBlockData(block.id, nextData)}
          />
        )}

        {block.type === 'video-editorial' && (
          <WidgetVideoEditorial
            data={block.data}
            brand={blockBrand}
            institutionName={effectiveInstitution}
          />
        )}

        {block.type === 'editorial-quote' && (
          <WidgetEditorialQuote data={block.data} brand={blockBrand} institutionName={effectiveInstitution} />
        )}

        {block.type === 'document-resources' && (
          <WidgetDocumentResources
            data={block.data}
            brand={blockBrand}
            isEditMode={canEdit}
            onUpdateData={(data) => saveWidgetEdit(block.id, (current) =>
              current.type === 'document-resources' ? { ...current, data } : current
            )}
          />
        )}

        {block.type === 'code-walkthrough' && (
          <WidgetCodeWalkthrough data={block.data} brand={blockBrand} />
        )}

        {block.type === 'slide-cards' && (
          <WidgetSlideCards data={block.data} brand={blockBrand} />
        )}

        {block.type === 'accordion-details' && (
          <WidgetAccordionDetails
            data={block.data}
            brand={blockBrand}
            onNavigateNext={scrollToWidget}
          />
        )}

        {block.type === 'code-comparison' && (
          <WidgetCodeComparison data={block.data} brand={blockBrand} />
        )}

        {block.type === 'architecture-hotspots' && (
          <WidgetArchitectureHotspots data={block.data} brand={blockBrand} />
        )}

        {block.type === 'architecture-hotspots-visual' && (
          <WidgetArchitectureHotspotsVisual data={block.data} brand={blockBrand} />
        )}

        {block.type === 'flip-cards-3d' && (
          <WidgetFlipCards3D data={block.data} brand={blockBrand} />
        )}

        {block.type === 'pipeline-steps' && (
          <WidgetStepToStep data={block.data} brand={blockBrand} />
        )}

        {block.type === 'checklist' && (
          <WidgetChecklist
            data={block.data}
            brand={blockBrand}
            checkedItems={localChecks}
            onToggleChecklistItem={(id) => toggleChecklistItem(attemptKey(block.id, id))}
          />
        )}

        {block.type === 'pipeline-checklist' && (
          <WidgetPipelineChecklist
            data={block.data}
            brand={blockBrand}
            checkedItems={localChecks}
            onToggleChecklistItem={(id) => toggleChecklistItem(attemptKey(block.id, id))}
          />
        )}

        {block.type === 'scenario-quiz' && (
          <WidgetScenarioQuiz
            data={block.data}
            brand={blockBrand}
            activeScenarioIdx={scenarioIndexes[block.id] ?? 0}
            onSelectScenarioIdx={(idx) => setScenarioIndexes((prev) => ({ ...prev, [block.id]: idx }))}
            selectedOptions={localSelections}
            submittedQuestions={localSubmissions}
            onSelectOption={(questionId, optionId) => handleSelectQuizOption(attemptKey(block.id, questionId), optionId)}
            onSubmitQuestion={(questionId) => handleSubmitQuizQuestion(block.id, questionId)}
            earnedQuizScore={earnedFor(scenarioQuestions.map((question) => ({ ...question, id: attemptKey(block.id, question.id) })))}
            maxQuizScore={scenarioQuestions.reduce((sum, question) => sum + question.points, 0)}
            onViewReport={reportTarget ? () => scrollToWidget(reportTarget.widget.id) : undefined}
          />
        )}

        {block.type === 'scenario-quiz-multiple' && (
          <WidgetScenarioQuizMultiple
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-drag-drop' && (
          <WidgetScenarioQuizDragAndDrop
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-ordering' && (
          <WidgetScenarioQuizOrdering
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-matching' && (
          <WidgetScenarioQuizMatching
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-fill-blank' && (
          <WidgetScenarioQuizFillBlank
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-branching' && (
          <WidgetScenarioQuizBranching
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-matrix' && (
          <WidgetScenarioQuizTrueFalseMatrix
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-spotter' && (
          <WidgetScenarioQuizHotspotSpotter
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-image-hotspot' && (
          <WidgetScenarioQuizImageHotspot
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            isEditMode={canEdit}
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
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'scenario-quiz-risk-slider' && (
          <WidgetScenarioQuizRiskSlider
            blockId={block.id}
            data={block.data}
            brand={blockBrand}
            onScoreChange={handleExtraQuizScoreChange}
          />
        )}

        {block.type === 'final-report' && evaluation && (
          <WidgetFinalReport
            data={block.data}
            brand={blockBrand}
            institutionName={effectiveInstitution}
            courseTitle={page.id && !sequence ? page.title : activeModule.title}
            scoped={pages.length > 1 || activityContents.filter(({ widget }) => widget.type === 'final-report').length > 1}
            {...evaluation}
            submittedQuestions={submittedQuestions}
            selectedOptions={selectedOptions}
            onJumpToScenario={(idx) => {
              const question = evaluation.questions[idx];
              if (!question) return;
              setScenarioIndexes((prev) => ({ ...prev, [question.widgetId]: question.index }));
              scrollToWidget(question.widgetId);
            }}
            onResetEvaluation={() => {
              const questionIds = new Set(evaluation.scenarioQuestions.map(({ id }) => id));
              const widgetIds = new Set(reportScope.filter(({ widget }) => widget.type.startsWith('scenario-quiz')).map(({ widget }) => widget.id));
              const checks = new Set(evaluation.checklistIds);
              setSelectedOptions((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !questionIds.has(id))));
              setSubmittedQuestions((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !questionIds.has(id))));
              setCheckedItems((prev) => prev.filter((id) => !checks.has(id)));
              setExtraQuizScores((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !widgetIds.has(id))));
              setScenarioIndexes((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => !widgetIds.has(id))));
              setEvaluationResets((prev) => ({
                ...prev, ...Object.fromEntries([...widgetIds].map((id) => [id, (prev[id] ?? 0) + 1])),
              }));
              const firstQuiz = [...widgetIds][0];
              if (firstQuiz) scrollToWidget(firstQuiz);
            }}
            onCompleteAllLessons={() => {
              setCompletedContents((prev) => [...new Set([...prev, ...reportScope.map(({ id }) => id)])]);
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
        width: preview ? '100%' : '100vw',
        height: preview ? 'min(75dvh, 760px)' : '100vh',
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
        activePageId={currentPage.id}
        onSelectPage={sequence ? undefined : navigatePage}
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
          height: preview ? '100%' : '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Barra Superior Flotante */}
        <div
          id="topbar-header"
          className="max-md:z-[35]! max-md:flex-wrap max-md:gap-2 max-md:px-3!"
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
                disabled={savingManaged}
                onChange={(event) => {
                  if (!managedDirty || window.confirm('Hay cambios sin guardar. ¿Quieres cambiar de módulo y descartarlos?')) {
                    onSelectModule(event.target.value);
                  }
                }}
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
                  Editor de contenido · {blocks.length} recursos
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
                  {'{ }'} Editar JSON
                </button>
              </>
            )}

            {!sequence && !preview && <div className="canvas-edit-entry">
              <button className={`canvas-button${isEditMode ? '' : ' canvas-primary'}`} type="button"
                onClick={toggleEditModeUrl}>{isEditMode ? 'Vista estudiante' : 'Editar contenido'}</button>
            </div>}
            {managed && (isEditMode || managedDirty) && <div className="canvas-edit-entry">
              <button className="canvas-button canvas-primary" type="button"
                disabled={!managedDirty || savingManaged} onClick={saveManaged}>
                {savingManaged ? 'Guardando…' : 'Guardar módulo'}
              </button>
            </div>}

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
        {backHref && (
          <nav aria-label="Curso" className="border-b border-slate-200 px-4 py-3">
            <a className="text-sm font-semibold" href={backHref}>{managed ? '← Volver a los módulos' : '← Volver al curso'}</a>
          </nav>
        )}
        {!sequence && pages.length > 1 && (
          <nav className="canvas-page-nav" aria-label="Páginas del aula">
            <select className="canvas-button" aria-label="Página del aula" value={currentPage.id}
              onChange={(event) => navigatePage(event.target.value)}>
              {pages.map((page, index) => <option key={page.id} value={page.id}>{index + 1}. {page.title}</option>)}
            </select>
            <div>
              <button type="button" className="canvas-button" disabled={currentPageIndex === 0}
                onClick={() => navigatePage(pages[currentPageIndex - 1].id)}>Anterior</button>
              <button type="button" className="canvas-button" disabled={currentPageIndex === pages.length - 1}
                onClick={() => navigatePage(pages[currentPageIndex + 1].id)}>Siguiente</button>
            </div>
          </nav>
        )}
        {!sequence && (currentPage.id || pages.length > 1) && (
          <header className="canvas-page-heading" tabIndex={-1}>
            <h2>{currentPage.title}</h2>
            {isEditMode && currentPage.id && <button className="canvas-button" type="button" onClick={removePageBreak}>Quitar salto</button>}
          </header>
        )}
        {(isEditMode || managed) && canvasFeedback && <div className="canvas-feedback">
          <p role={canvasFeedback.error ? 'alert' : 'status'}>{canvasFeedback.message}</p>
          <button type="button" className="canvas-button" onClick={handleDownloadCourseJson}>Descargar JSON</button>
        </div>}
        {sequence && (
          <nav aria-label="Secuencia de aprendizaje" className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
            <a className="text-sm font-semibold" href="/app/contenidos/">← Asignaturas</a>
            {contents.length > 0 && <>
            <span aria-live="polite" className="text-sm font-semibold">Paso {currentStep + 1} de {contents.length}</span>
            <div className="flex gap-2">
              <button type="button" className="rounded border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
                disabled={currentStep === 0} onClick={() => scrollToWidget(contents[currentStep - 1].widget.id)}>Anterior</button>
              <button type="button" className="rounded bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-50"
                disabled={currentStep === contents.length - 1} onClick={() => scrollToWidget(contents[currentStep + 1].widget.id)}>Siguiente</button>
            </div>
            </>}
          </nav>
        )}
        {pages.flatMap((page) => page.sections.map((section, sectionIndex) => (
          <div key={section.id} hidden={!sequence && page.id !== currentPage.id}>
            {isEditMode && page.id === currentPage.id && (sectionIndex === 0 || !section.contenidos.length) && (
              <CanvasInsertBar location={section.contenidos.length ? 'Al inicio de esta página' : `En «${section.title}»`}
                onOpen={(mode) => setInsertion({ mode, sectionId: section.id,
                  beforeId: section.contenidos[0]?.id,
                  location: section.contenidos.length ? 'Al inicio de esta página' : `En «${section.title}»` })} />
            )}
            {section.contenidos.map(({ widget, id, title }, index) => (
              <Fragment key={id}>
                <div hidden={sequence && id !== contents[currentStep]?.id}>{renderAtomicBlock(widget, index, section)}</div>
                {isEditMode && page.id === currentPage.id && <CanvasInsertBar location={`Después de «${title}»`}
                  onOpen={(mode) => setInsertion({ mode, sectionId: section.id, afterId: id, location: `Después de «${title}»` })} />}
              </Fragment>
            ))}
          </div>
        )))}
        {(sequence ? !contents.length : !currentPage.contents.length) &&
          <p style={{ padding: '24px' }}>Esta página aún no tiene contenidos.</p>}
      </div>
      {isEditMode && insertion && <CourseInsertDialog insertion={insertion}
        renderPreview={(template) => {
          const widget = { ...template.widget, id: 'preview-' + template.widget.id };
          return renderAtomicBlock(widget, 0, { id: 'preview', title: template.title, contenidos: [{ ...template, widget }] }, true);
        }}
        onClose={() => setInsertion(undefined)}
        onInsert={(template) => applyInsertion({ template })}
        onPage={(title) => applyInsertion({ title })} />}

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

              <div hidden={sequence} style={{ marginBottom: '22px' }}>
                <label
                  onClick={preview ? undefined : toggleEditModeUrl}
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
                  href={backHref ?? (sequence ? '/app/contenidos/' : '/cursos/')}
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
