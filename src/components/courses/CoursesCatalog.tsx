import { useCallback, useEffect, useMemo, useState } from 'react';
import { courses, type Course, type CourseCategory } from '../../data/courses';
import { courseHomePath } from '../../lib/coursePaths';

const categoryOrder: CourseCategory[] = [
  'foundations',
  'language',
  'advanced',
  'frameworks',
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
  advanced: 'Programación avanzada',
  frameworks: 'Frameworks',
  testing: 'Test',
  frontend: 'Frontend (web)',
  engineering: 'Ingeniería y calidad',
  database: 'Bases de datos',
  tools: 'Herramientas',
  gamedev: 'Videojuegos',
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [comingOpen, setComingOpen] = useState(false);
  const [comingName, setComingName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: courses.length };
    for (const c of courses) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
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
      .filter((g) => selectedCategory === 'all' || g.cat === selectedCategory)
      .map((g) => ({
        ...g,
        items: g.items.filter((c) => courseMatchesQuery(c, searchQuery)),
      }))
      .filter((g) => g.items.length > 0);
  }, [grouped, searchQuery, selectedCategory]);

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
      <div className="relative z-10 flex flex-col h-full overflow-hidden rounded-[13px]">
        {/* Cover / Image header */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 border-b-2 border-border/10">
          {course.image ? (
            <img
              src={course.image}
              alt={course.name}
              className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${course.color}22 0%, ${course.color}66 100%)`,
              }}
            >
              <span className="font-nunito text-2xl font-black tracking-wider text-textPrimary/80 drop-shadow-sm">
                {course.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3.5 sm:p-4">
          <div className="mb-1.5 flex flex-wrap items-start justify-between gap-1.5">
            <h3 className="font-nunito text-base font-black text-textPrimary leading-tight">{course.name}</h3>
            <CourseBadges course={course} />
          </div>
          {course.communityReleaseYear != null && (
            <p className="m-0 mb-1.5 font-nunito text-[0.7rem] font-extrabold text-textMuted">Comunidad · {course.communityReleaseYear}</p>
          )}
          <p className="m-0 line-clamp-2 font-nunito text-xs font-[650] leading-relaxed text-textSecondary">{course.description}</p>
        </div>
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

  if (!mounted) {
    return (
      <div className="space-y-4" aria-hidden>
        <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
        <div className="h-12 animate-pulse rounded-2xl bg-black/5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-black/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Buscador + Filtros por Categoría en una sola fila responsiva */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Buscador compacto */}
        <div className="relative w-full md:w-80 shrink-0">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60" aria-hidden>
            🔍
          </span>
          <input
            id="courses-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar curso o tecnología…"
            autoComplete="off"
            className="w-full rounded-xl border-2 border-border bg-white py-2 pl-9 pr-8 font-nunito text-xs sm:text-sm font-bold text-textPrimary shadow-neo placeholder:text-textMuted focus:border-info focus:outline-none"
          />
          {searchQuery.trim() !== '' && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-white text-xs font-black text-textSecondary hover:bg-tertiary/40 cursor-pointer"
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Pills de categorías (Scroll Horizontal) */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl border-2 px-3 py-1.5 font-nunito text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'border-border bg-[#118AB2] text-white shadow-[2px_2px_0px_#1E1210]'
                : 'border-border/40 bg-white text-textSecondary hover:border-border hover:bg-tertiary/40'
            }`}
          >
            Todos ({categoryCounts.all})
          </button>
          {categoryOrder.map((cat) => {
            const count = categoryCounts[cat] || 0;
            if (!count) return null;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl border-2 px-3 py-1.5 font-nunito text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'border-border bg-[#118AB2] text-white shadow-[2px_2px_0px_#1E1210]'
                    : 'border-border/40 bg-white text-textSecondary hover:border-border hover:bg-tertiary/40'
                }`}
              >
                {categoryLabel[cat]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {(searchQuery.trim() !== '' || selectedCategory !== 'all') && (
        <div className="mb-4 flex items-center justify-between text-xs font-bold text-textMuted">
          <span>
            Mostrando {filteredCount} de {courses.length} cursos
            {selectedCategory !== 'all' ? ` en ${categoryLabel[selectedCategory]}` : ''}
          </span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-[#118AB2] hover:underline font-black cursor-pointer"
          >
            Limpiar filtros ✕
          </button>
        </div>
      )}

      {filteredGrouped.length === 0 && (searchQuery.trim() !== '' || selectedCategory !== 'all') && (
        <div className="mb-10 rounded-2xl border-[3px] border-dashed border-border bg-tertiary/20 px-6 py-10 text-center">
          <p className="m-0 font-nunito text-lg font-black text-textPrimary">No encontramos cursos</p>
          <p className="mt-2 m-0 font-nunito text-sm font-[650] text-textSecondary">
            Probá otras palabras o limpiá la búsqueda. Buscamos en nombre, descripción y categoría del curso.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-4 rounded-xl border-[3px] border-border bg-info px-5 py-2 font-nunito text-sm font-black text-white shadow-neo hover:-translate-y-0.5 cursor-pointer"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {filteredGrouped.map(({ cat, label, items }) => (
        <section key={cat} className="mb-10 last:mb-0">
          <h2 className="mb-4 font-nunito text-xl sm:text-2xl font-extrabold text-textPrimary flex items-center gap-2">
            <span>{label}</span>
            <span className="text-xs font-black text-textMuted bg-tertiary/60 border border-border/20 px-2 py-0.5 rounded-lg">
              {items.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((course, i) => renderCard(course, i))}
          </div>
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
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-white text-lg font-black hover:bg-gray-100 cursor-pointer"
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
