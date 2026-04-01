import { useCallback, useEffect, useMemo, useState } from 'react';
import { courses, type Course, type CourseCategory } from '../../data/courses';
import { courseHomePath } from '../../lib/coursePaths';

const VIEW_STORAGE_KEY = 'aprende_courses_catalog_view';

const categoryOrder: CourseCategory[] = [
  'foundations',
  'language',
  'testing',
  'frontend',
  'engineering',
  'database',
  'tools',
  'gamedev',
];

const categoryLabel: Record<CourseCategory, string> = {
  foundations: 'Conceptos base',
  language: 'Lenguajes',
  testing: 'Test',
  frontend: 'Frontend (web)',
  engineering: 'Ingeniería y calidad',
  database: 'Bases de datos',
  tools: 'Herramientas',
  gamedev: 'Videojuegos',
};

type ViewMode = 'grid' | 'list';

/** Normaliza para búsqueda insensible a mayúsculas y acentos. */
function normalizeSearch(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function courseMatchesQuery(course: Course, q: string): boolean {
  const t = normalizeSearch(q.trim());
  if (!t) return true;
  const hay = (s: string) => normalizeSearch(s).includes(t);
  return (
    hay(course.name) ||
    hay(course.description) ||
    hay(course.slug) ||
    hay(categoryLabel[course.category]) ||
    (course.communityReleaseYear != null && hay(String(course.communityReleaseYear)))
  );
}

function readView(): ViewMode {
  if (typeof window === 'undefined') return 'grid';
  try {
    const v = localStorage.getItem(VIEW_STORAGE_KEY);
    return v === 'list' ? 'list' : 'grid';
  } catch {
    return 'grid';
  }
}

function CourseBadges({ course }: { course: Course }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {course.status === 'coming' && (
        <span className="rounded-lg border-2 border-border bg-border px-2 py-0.5 font-nunito text-[0.65rem] font-extrabold text-white">
          Próximamente
        </span>
      )}
      {course.requiresPassword && course.status !== 'coming' && (
        <span className="rounded-lg border-2 border-border bg-border px-2 py-0.5 font-nunito text-[0.65rem] font-extrabold text-white">
          🔒 Exclusivo
        </span>
      )}
    </span>
  );
}

export default function CoursesCatalog() {
  const [view, setView] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [comingOpen, setComingOpen] = useState(false);
  const [comingName, setComingName] = useState('');

  useEffect(() => {
    setMounted(true);
    setView(readView());
  }, []);

  const persistView = useCallback((v: ViewMode) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, v);
    } catch {
      /* */
    }
  }, []);

  const grouped = useMemo(() => {
    const m = new Map<CourseCategory, Course[]>();
    for (const c of courses) {
      const list = m.get(c.category) ?? [];
      list.push(c);
      m.set(c.category, list);
    }
    const langs = m.get('language');
    if (langs) {
      langs.sort((a, b) => (a.communityReleaseYear ?? 0) - (b.communityReleaseYear ?? 0));
    }
    return categoryOrder
      .map((cat) => ({ cat, label: categoryLabel[cat], items: m.get(cat) ?? [] }))
      .filter((g) => g.items.length > 0);
  }, []);

  const filteredGrouped = useMemo(() => {
    return grouped
      .map((g) => ({
        ...g,
        items: g.items.filter((c) => courseMatchesQuery(c, searchQuery)),
      }))
      .filter((g) => g.items.length > 0);
  }, [grouped, searchQuery]);

  const filteredCount = useMemo(
    () => filteredGrouped.reduce((sum, g) => sum + g.items.length, 0),
    [filteredGrouped],
  );

  const openComing = (name: string) => {
    setComingName(name);
    setComingOpen(true);
    document.documentElement.style.overflow = 'hidden';
  };

  const closeComing = useCallback(() => {
    setComingOpen(false);
    document.documentElement.style.overflow = '';
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (comingOpen) {
        closeComing();
        return;
      }
      if (searchQuery.trim()) setSearchQuery('');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeComing, comingOpen, searchQuery]);

  const renderCard = (course: Course, stripeIndex: number) => {
    const bgClass = stripeIndex % 2 === 0 ? 'bg-tertiary' : 'bg-secondary';
    const mode = course.styleMode;
    const hasPremium = Boolean(mode);
    const href = course.status === 'coming' ? '#' : courseHomePath(course.slug);

    const inner = (
      <div className="relative z-10 p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-nunito text-lg font-black text-textPrimary">{course.name}</h3>
          <CourseBadges course={course} />
        </div>
        {course.communityReleaseYear != null && (
          <p className="m-0 mb-2 font-nunito text-xs font-extrabold text-textMuted">Comunidad · {course.communityReleaseYear}</p>
        )}
        <p className="m-0 line-clamp-3 font-nunito text-sm font-[650] leading-relaxed text-textSecondary">{course.description}</p>
      </div>
    );

    const shell = hasPremium ? (
      <div
        className={`course-premium-shell course-premium-shell--${mode} rounded-2xl shadow-neo transition-transform group-hover:-translate-y-0.5`}
      >
        <div className={`course-premium-inner relative ${bgClass}`}>{inner}</div>
      </div>
    ) : (
      <div
        className={`relative rounded-2xl border-[3px] border-border ${bgClass} shadow-neo transition-transform group-hover:-translate-y-0.5`}
      >
        {inner}
      </div>
    );

    return (
      <a
        key={course.slug}
        href={href}
        className="group block outline-none"
        onClick={(e) => {
          if (course.status === 'coming') {
            e.preventDefault();
            openComing(course.name);
          }
        }}
      >
        {shell}
      </a>
    );
  };

  const renderRow = (course: Course) => {
    const href = course.status === 'coming' ? '#' : courseHomePath(course.slug);
    return (
      <a
        key={course.slug}
        href={href}
        className="group flex items-stretch gap-3 rounded-2xl border-[3px] border-border bg-white p-3 shadow-neo transition-transform hover:-translate-y-0.5 sm:gap-4 sm:p-4"
        onClick={(e) => {
          if (course.status === 'coming') {
            e.preventDefault();
            openComing(course.name);
          }
        }}
      >
        <div
          className="w-1.5 shrink-0 self-stretch rounded-full"
          style={{ backgroundColor: course.color }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 font-nunito text-base font-black text-textPrimary sm:text-lg">{course.name}</h3>
            <CourseBadges course={course} />
          </div>
          {course.communityReleaseYear != null && (
            <p className="m-0 mt-0.5 font-nunito text-xs font-extrabold text-textMuted">Comunidad · {course.communityReleaseYear}</p>
          )}
          <p className="mt-1 line-clamp-2 font-nunito text-sm font-[650] text-textSecondary">{course.description}</p>
        </div>
        <span className="hidden shrink-0 self-center text-xl text-textMuted sm:inline" aria-hidden>
          →
        </span>
      </a>
    );
  };

  if (!mounted) {
    return (
      <div className="space-y-4" aria-hidden>
        <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
        <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-black/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="courses-search" className="sr-only">
          Buscar cursos
        </label>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg opacity-60"
            aria-hidden
          >
            🔍
          </span>
          <input
            id="courses-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, descripción, categoría o ruta…"
            autoComplete="off"
            className="w-full rounded-2xl border-[3px] border-border bg-white py-3 pl-11 pr-11 font-nunito text-sm font-bold text-textPrimary shadow-neo placeholder:text-textMuted/70 focus:border-info focus:outline-none focus:ring-2 focus:ring-info/25 sm:text-base"
          />
          {searchQuery.trim() !== '' && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl border-2 border-border bg-white font-black text-textSecondary hover:bg-tertiary/40"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 font-nunito text-sm font-bold text-textSecondary">
          {searchQuery.trim() === ''
            ? `${courses.length} cursos · Ordenados por categoría`
            : filteredCount === 0
              ? 'Ningún resultado'
              : `${filteredCount} de ${courses.length} cursos · Filtrado`}
        </p>
        <div
          className="inline-flex rounded-2xl border-[3px] border-border bg-white p-1 shadow-neo"
          role="group"
          aria-label="Tipo de vista"
        >
          <button
            type="button"
            onClick={() => persistView('grid')}
            className={`rounded-xl px-4 py-2 font-nunito text-sm font-extrabold transition-colors ${
              view === 'grid' ? 'bg-info text-white' : 'text-textSecondary hover:bg-tertiary/50'
            }`}
            aria-pressed={view === 'grid'}
          >
            <span className="mr-1.5 inline-block" aria-hidden>
              ▦
            </span>
            Cuadrícula
          </button>
          <button
            type="button"
            onClick={() => persistView('list')}
            className={`rounded-xl px-4 py-2 font-nunito text-sm font-extrabold transition-colors ${
              view === 'list' ? 'bg-info text-white' : 'text-textSecondary hover:bg-tertiary/50'
            }`}
            aria-pressed={view === 'list'}
          >
            <span className="mr-1.5 inline-block" aria-hidden>
              ☰
            </span>
            Lista
          </button>
        </div>
      </div>

      {filteredGrouped.length === 0 && searchQuery.trim() !== '' && (
        <div className="mb-10 rounded-2xl border-[3px] border-dashed border-border bg-tertiary/20 px-6 py-10 text-center">
          <p className="m-0 font-nunito text-lg font-black text-textPrimary">No encontramos cursos</p>
          <p className="mt-2 m-0 font-nunito text-sm font-[650] text-textSecondary">
            Probá otras palabras o limpiá la búsqueda. Buscamos en nombre, descripción, categoría y ruta del curso.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-4 rounded-xl border-[3px] border-border bg-info px-5 py-2 font-nunito text-sm font-black text-white shadow-neo hover:-translate-y-0.5"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {filteredGrouped.map(({ cat, label, items }) => (
        <section key={cat} className="mb-12 last:mb-0">
          <h2 className="mb-4 font-nunito text-2xl font-extrabold text-textPrimary">{label}</h2>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((course, i) => renderCard(course, i))}
            </div>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {items.map((course) => (
                <li key={course.slug}>{renderRow(course)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {comingOpen && (
        <div
          className="fixed inset-0 z-1100 flex items-start justify-center bg-black/35 backdrop-blur-sm pt-[10vh] sm:pt-[18vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-courses-title"
          onClick={closeComing}
        >
          <div
            className="relative mx-4 w-full max-w-lg rounded-3xl border-4 border-border bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 id="coming-courses-title" className="m-0 font-nunito text-2xl font-black text-info">
                Próximamente
              </h3>
              <button
                type="button"
                onClick={closeComing}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-white text-lg font-black hover:bg-gray-100"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <p className="m-0 font-nunito text-lg font-bold leading-relaxed text-textSecondary">
              El curso «{comingName}» estará disponible pronto.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
