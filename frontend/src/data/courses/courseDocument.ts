import type {
  CourseContenido,
  CourseDocumentJSON,
  CourseLessionMeta,
  CourseModule,
  LegacyCourseDocument,
  VideoEditorialBlockData,
} from './courseJsonTypes';

export function migrateLegacyCourse({
  title,
  lessions,
  lessons,
  blocks,
  ...course
}: LegacyCourseDocument, courseTitle: string, moduleId: string): CourseDocumentJSON {
  const hierarchy = lessions?.length ? lessions : groupLegacyLessons(lessons);
  const remaining = new Map(blocks.map((block) => [block.id, block]));
  const modulos: CourseModule[] = [{
    id: moduleId,
    title,
    lessions: hierarchy.map((lession) => ({
      ...lession,
      secciones: lession.secciones.map((seccion) => ({
        ...seccion,
        contenidos: seccion.contenidos.flatMap(({ id, title, targetId }) => {
          const widget = remaining.get(targetId);
          if (!widget) return [];
          remaining.delete(targetId);
          return [{ id, title, widget }];
        }),
      })).filter((seccion) => seccion.contenidos.length > 0),
    })).filter((lession) => lession.secciones.length > 0),
  }];

  if (remaining.size > 0) {
    modulos[0].lessions.push({
      id: 'legacy-extra-lession',
      title: 'Material adicional',
      secciones: [{
        id: 'legacy-extra-section',
        title: 'Contenidos adicionales',
        contenidos: [...remaining.values()].map((widget) => ({
          id: widget.id,
          title: widget.summary,
          widget,
        })),
      }],
    });
  }

  return { ...course, title: courseTitle, modulos };
}

function groupLegacyLessons(lessons: LegacyCourseDocument['lessons']): CourseLessionMeta[] {
  const hierarchy: CourseLessionMeta[] = [];
  for (const item of lessons) {
    const lessionTitle = item.lession || item.module || 'General';
    let lession = hierarchy.find((entry) => entry.title === lessionTitle);
    if (!lession) {
      lession = { id: `lession-${hierarchy.length + 1}`, title: lessionTitle, secciones: [] };
      hierarchy.push(lession);
    }
    const sectionTitle = item.seccion || 'Sección principal';
    let section = lession.secciones.find((entry) => entry.title === sectionTitle);
    if (!section) {
      section = {
        id: `${lession.id}-section-${lession.secciones.length + 1}`,
        title: sectionTitle,
        contenidos: [],
      };
      lession.secciones.push(section);
    }
    section.contenidos.push({ id: item.id, title: item.contenido || item.title, targetId: item.targetId });
  }
  return hierarchy;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNamed = (value: unknown): value is Record<string, unknown> & { id: string; title: string } =>
  isRecord(value) && typeof value.id === 'string' && Boolean(value.id.trim()) &&
  typeof value.title === 'string' && Boolean(value.title.trim());

function isList(value: unknown, isItem: (item: unknown) => boolean): boolean {
  return Array.isArray(value) && value.every(isItem);
}

export function isCourseDocument(value: unknown): value is CourseDocumentJSON {
  return isRecord(value) &&
    typeof value.courseId === 'string' && Boolean(value.courseId.trim()) &&
    typeof value.title === 'string' && Boolean(value.title.trim()) &&
    (value.category === undefined || (typeof value.category === 'string' &&
      Boolean(value.category.trim()) && value.category.length <= 80)) &&
    typeof value.version === 'string' &&
    typeof value.institution === 'string' &&
    typeof value.defaultBrandId === 'string' &&
    typeof value.showScoreInBanner === 'boolean' &&
    isList(value.modulos, (module) => isNamed(module) &&
      isList(module.lessions, (lession) => isNamed(lession) &&
        isList(lession.secciones, (section) => isNamed(section) &&
          (section.pageBreak === undefined || section.pageBreak === true) &&
          isList(section.contenidos, (content) => isNamed(content) &&
            isRecord(content.widget) &&
            typeof content.widget.id === 'string' &&
            typeof content.widget.type === 'string' &&
            typeof content.widget.componentName === 'string' &&
            typeof content.widget.summary === 'string' &&
            isRecord(content.widget.data)))));
}

export function getModuleContents(module: CourseModule): CourseContenido[] {
  return module.lessions.flatMap((lession) =>
    lession.secciones.flatMap((section) => section.contenidos)
  );
}

export type CoursePage = {
  id: string;
  title: string;
  sections: CourseModule['lessions'][number]['secciones'];
  contents: CourseContenido[];
};

export function getModulePages(module: CourseModule): CoursePage[] {
  const pages: CoursePage[] = [{ id: '', title: 'Inicio', sections: [], contents: [] }];
  for (const lesson of module.lessions) {
    for (const section of lesson.secciones) {
      if (section.pageBreak) {
        if (pages.length === 1 && !pages[0].sections.length) pages.pop();
        pages.push({ id: section.id, title: section.title, sections: [], contents: [] });
      }
      const page = pages[pages.length - 1];
      page.sections.push(section);
      page.contents.push(...section.contenidos);
    }
  }
  return pages;
}

export function splitLegacyVideoQuotes(course: CourseDocumentJSON): CourseDocumentJSON {
  const contents = course.modulos.flatMap(getModuleContents);
  const ids = new Set(contents.flatMap(({ id, widget }) => [id, widget.id]));
  let changed = false;

  const modulos = course.modulos.map((module) => ({
    ...module,
    lessions: module.lessions.map((lesson) => ({
      ...lesson,
      secciones: lesson.secciones.map((section) => ({
        ...section,
        contenidos: section.contenidos.flatMap((content): CourseContenido[] => {
          const { widget } = content;
          if (widget.type !== 'video-editorial') return [content];

          const { highlightLead, statementRest, ...data } = widget.data as VideoEditorialBlockData & {
            highlightLead?: string;
            statementRest?: string;
          };
          if (highlightLead === undefined && statementRest === undefined) return [content];

          changed = true;
          const video = { ...content, widget: { ...widget, data } };
          if (!highlightLead && !statementRest) return [video];

          const baseId = `${widget.id}-cita`;
          let id = baseId;
          for (let suffix = 2; ids.has(id); suffix++) id = `${baseId}-${suffix}`;
          ids.add(id);
          const { bgMode, bgColor, brandColors } = widget;
          return [video, {
            id,
            title: 'Cita editorial',
            widget: {
              id,
              type: 'editorial-quote',
              componentName: 'WidgetEditorialQuote',
              summary: 'Cita editorial',
              bgMode,
              bgColor,
              brandColors,
              data: { highlightLead, text: statementRest ?? '', includeInstitutionName: true },
            },
          }];
        }),
      })),
    })),
  }));

  return changed ? { ...course, modulos } : course;
}

function upgradeDjangoGuide(draft: CourseDocumentJSON, source: CourseDocumentJSON): CourseDocumentJSON {
  const sourceContents = new Map(source.modulos.flatMap(getModuleContents).map((content) =>
    [content.widget.id, content] as const
  ));
  const usesProductExample = (value: unknown) =>
    /(?:^|[^a-z])(?:productos?|productoform|inventario|tienda)(?![a-z])/i.test(JSON.stringify(value) ?? '');
  const updateBookExample = draft.version === '1.0.0';
  const oldProfileObjective = 'Asigna permisos distintos a administradores y operadores.';

  return {
    ...draft,
    version: source.version,
    modulos: draft.modulos.map((module) => ({
      ...module,
      lessions: module.lessions.map((lesson) => ({
        ...lesson,
        secciones: lesson.secciones.map((section) => ({
          ...section,
          title: updateBookExample && section.id === 'django-entrega' && section.title === 'Inventario protegido'
            ? 'Biblioteca protegida'
            : section.title,
          contenidos: section.contenidos.map((content) => {
            const widget = content.widget;
            const updated = sourceContents.get(widget.id)?.widget;
            if (!updated || widget.type !== updated.type) return content;

            const oldFields = new Map(Object.entries(widget.data));
            const correctedFields = Object.entries(updated.data).filter(([field]) => {
              const value = oldFields.get(field);
              if (updateBookExample && usesProductExample(value)) return true;
              if (widget.id === 'django-leccion-09-video' && field === 'objective') {
                return value === oldProfileObjective;
              }
              return widget.id === 'django-leccion-09-practica' && field === 'htmlContent' &&
                typeof value === 'string' && value.includes('@permission_required');
            });
            const updateSummary = (updateBookExample && usesProductExample(widget.summary)) ||
              (widget.id === 'django-leccion-09-video' && widget.summary === oldProfileObjective);
            if (!updateSummary && !correctedFields.length) return content;

            return {
              ...content,
              widget: {
                ...widget,
                summary: updateSummary ? updated.summary : widget.summary,
                data: { ...widget.data, ...Object.fromEntries(correctedFields) },
              } as typeof widget,
            };
          }),
        })),
      })),
    })),
  };
}

export function upgradeCourseDraft(draft: CourseDocumentJSON, source: CourseDocumentJSON): CourseDocumentJSON {
  if (draft.courseId === 'django-inacap-guia-practica' &&
      (draft.version === '1.0.0' || draft.version === '1.1.0') && source.version === '1.2.0') {
    return upgradeDjangoGuide(draft, source);
  }

  if (draft.courseId !== 'arquitectura-etica-cumplimiento-v1' ||
      draft.version !== '1.0.0' || source.version !== '1.1.0') return draft;

  const [sourceModule] = source.modulos;
  const sourceLesson = sourceModule.lessions.find((lesson) =>
    lesson.secciones.some((section) => section.id === 'sec-1-recursos')
  );
  const resources = sourceLesson?.secciones.find((section) => section.id === 'sec-1-recursos');
  if (!sourceLesson || !resources) return draft;

  const targetModule = draft.modulos.find((module) => module.id === sourceModule.id) ?? draft.modulos[0];
  const hasResources = draft.modulos.some((module) =>
    getModuleContents(module).some(({ widget }) => widget.id === 'widget-document-resources')
  );
  if (hasResources) return { ...draft, version: source.version };

  const targetLesson = targetModule.lessions.find((lesson) => lesson.id === sourceLesson.id);
  const lessons = targetLesson
    ? targetModule.lessions.map((lesson) => lesson === targetLesson
      ? { ...lesson, secciones: [...lesson.secciones, resources] }
      : lesson)
    : [{ ...sourceLesson, secciones: [resources] }, ...targetModule.lessions];

  return {
    ...draft,
    version: source.version,
    modulos: draft.modulos.map((module) => module === targetModule
      ? { ...module, lessions: lessons }
      : module),
  };
}
