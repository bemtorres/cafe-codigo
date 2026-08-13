import React, { useState, useMemo } from 'react';
import { courses } from '../../data/courses';

// Cursos destacados por defecto
const DEFAULT_FEATURED_SLUGS = new Set([
  'python',
  'django',
  'flask',
  'tecnologias-servidor',
  'sql',
  'javascript',
  'java',
  'scrum',
  'git',
  'desarrollo-ia',
]);

export default function AcademicoCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [featuredSlugs, setFeaturedSlugs] = useState<Set<string>>(DEFAULT_FEATURED_SLUGS);

  // Lista de categorías para las píldoras de exploración
  const categoriesList = [
    { id: 'all', label: 'Todos los Cursos', icon: '🌐' },
    { id: 'advanced', label: 'Python & Backend', icon: '🐍' },
    { id: 'sql-db', label: 'Bases de Datos', icon: '🗄️' },
    { id: 'servers', label: 'Tecnologías de Información', icon: '💻' },
    { id: 'tools', label: 'DevOps & Herramientas', icon: '⚙️' },
    { id: 'management', label: 'Gestión & Metodologías', icon: '📊' },
    { id: 'ai', label: 'Inteligencia Artificial', icon: '🤖' },
  ];

  // Alternar destacado de un curso
  const toggleFeatured = (slug: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.stopPropagation();
    setFeaturedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  // Filtrado dinámico de cursos
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.slug.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = true;
      if (selectedCategory === 'advanced') {
        matchesCategory = ['python', 'django', 'flask', 'python-testing'].includes(course.slug) || course.category === 'advanced';
      } else if (selectedCategory === 'sql-db') {
        matchesCategory = ['sql', 'modelamiento-db', 'plsql'].includes(course.slug);
      } else if (selectedCategory === 'servers') {
        matchesCategory = ['tecnologias-servidor', 'javascript', 'html', 'css', 'php', 'java'].includes(course.slug);
      } else if (selectedCategory === 'tools') {
        matchesCategory = course.category === 'tools' || ['git', 'terminal', 'linux-distros', 'excel'].includes(course.slug);
      } else if (selectedCategory === 'management') {
        matchesCategory = (course.category as string) === 'management' || ['scrum', 'analisis-backlog', 'vision-producto'].includes(course.slug);
      } else if (selectedCategory === 'ai') {
        matchesCategory = ['desarrollo-ia', 'criptografia'].includes(course.slug);
      }

      const matchesFeatured = !onlyFeatured || featuredSlugs.has(course.slug);

      return matchesSearch && matchesCategory && matchesFeatured;
    });
  }, [searchTerm, selectedCategory, onlyFeatured, featuredSlugs]);

  // Secciones para la grilla de 3 columnas (Los más populares por categoría)
  const pythonCol = courses.filter((c) => ['python', 'django', 'flask'].includes(c.slug));
  const serversCol = courses.filter((c) => ['tecnologias-servidor', 'javascript', 'java'].includes(c.slug));
  const databaseCol = courses.filter((c) => ['sql', 'modelamiento-db', 'plsql'].includes(c.slug));

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-20">
      
      {/* 1. HERO BANNER PRINCIPAL (ESTILO COURSERA AZUL PULCRO) */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-6">
            <span className="inline-block px-3.5 py-1 bg-white/20 backdrop-blur text-xs font-black uppercase tracking-wider rounded-full border border-white/30">
              🎓 Portal Académico 2026
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-nunito leading-tight tracking-tight">
              Comienza, cambia o avanza en tu carrera tecnológica
            </h1>
            <p className="text-base sm:text-lg text-blue-50 font-medium max-w-2xl leading-relaxed">
              Explora más de 30 cursos interactivos con lecciones paso a paso, ejercicios prácticos y autoevaluaciones con certificación activa.
            </p>
            
            {/* Buscador Integrado en Hero */}
            <div className="pt-2 max-w-xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="¿Qué deseas aprender? (ej: Python, SQL, Nginx, Git...)"
                  className="w-full pl-12 pr-28 py-3.5 rounded-full text-slate-900 bg-white placeholder-slate-400 font-medium text-sm border-2 border-transparent focus:border-amber-400 focus:outline-none shadow-xl"
                />
                <span className="absolute left-4 text-slate-400 text-lg">🔍</span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-24 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Limpiar
                  </button>
                )}
                <span className="absolute right-2.5 px-3 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold shadow">
                  {filteredCourses.length} cursos
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 hidden md:block">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">☕</span>
                <div>
                  <h3 className="font-extrabold text-white text-base">Aprende haciendo</h3>
                  <p className="text-xs text-blue-100 font-medium">Sin instalaciones previas complejas</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-semibold text-blue-50">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">✓</span>
                  <span>100% Gratuito e Interactivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">✓</span>
                  <span>Feedback Inmediato en Quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">✓</span>
                  <span>Rutas desde Principiante a Avanzado</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://link.mercadopago.cl/cafeycodigo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-full shadow-lg transition hover:scale-105"
                >
                  <span>💙 Realizar Aporte (MercadoPago Chile)</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        
        {/* 2. BARRA DE EXPLORACIÓN DE CATEGORÍAS (SELECCIONABLES) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight font-nunito">
              Explorar categorías
            </h2>
            
            {/* Interruptor para Activar / Desactivar Destacados */}
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition border shadow-sm ${
                onlyFeatured
                  ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-amber-200'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <span>{onlyFeatured ? '★ Filtro Destacados Activado' : '☆ Ver Cursos Destacados'}</span>
              <span className="bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-full">
                {featuredSlugs.size}
              </span>
            </button>
          </div>

          {/* Chips de Categorías Seleccionables */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setOnlyFeatured(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                  selectedCategory === cat.id && !onlyFeatured
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. SECCIÓN: CURSOS DESTACADOS / DE MODA */}
        {(!searchTerm && selectedCategory === 'all') || onlyFeatured ? (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight font-nunito flex items-center gap-2">
                <span className="text-amber-500">★</span>
                <span>Cursos Destacados y De Moda</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courses
                .filter((c) => featuredSlugs.has(c.slug))
                .slice(0, 4)
                .map((course) => (
                  <article
                    key={course.slug}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                  >
                    <div>
                      {/* Banner de Tarjeta */}
                      <div
                        className="h-24 p-4 flex items-start justify-between relative overflow-hidden"
                        style={{ backgroundColor: course.color || '#2563eb' }}
                      >
                        <span className="text-[11px] font-black uppercase text-white/90 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur">
                          {course.category}
                        </span>
                        
                        <button
                          onClick={(e) => toggleFeatured(course.slug, e)}
                          title="Alternar Destacado"
                          className="w-7 h-7 bg-white/90 text-amber-500 rounded-full flex items-center justify-center font-bold text-xs shadow hover:scale-110 transition"
                        >
                          ★
                        </button>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                          <span>☕ Café y Código</span>
                          <span className="text-amber-500 font-black">★ 4.9</span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition text-base line-clamp-1">
                          {course.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{course.lessons?.length ?? 0} Lecciones</span>
                      <a
                        href={`/course/${course.slug}/`}
                        className="text-xs font-black text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        Ver curso →
                      </a>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ) : null}

        {/* 4. SECCIÓN: LOS MÁS POPULARES POR CATEGORÍA (3 COLUMNAS EXACTAS DE COURSERA) */}
        {!searchTerm && selectedCategory === 'all' && !onlyFeatured && (
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight font-nunito">
              Los más populares por categoría
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Columna 1: Python */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
                  <h3 className="font-extrabold text-blue-900 text-base flex items-center gap-2">
                    <span>Python</span>
                    <span>→</span>
                  </h3>
                  <span className="text-[11px] font-extrabold text-blue-700 bg-blue-200/80 px-2 py-0.5 rounded-full">Popular</span>
                </div>
                <div className="space-y-3">
                  {pythonCol.map((c) => (
                    <div key={c.slug} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-blue-100/80 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        🐍
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold mb-0.5">
                          <span>☕ Café y Código</span>
                          <span className="text-amber-500 font-black">★ 4.9</span>
                        </div>
                        <a href={`/course/${c.slug}/`} className="font-extrabold text-slate-900 hover:text-blue-600 transition text-sm block truncate">
                          {c.name}
                        </a>
                        <span className="text-xs text-slate-400 block truncate">Especialización • {c.lessons?.length ?? 0} Lecciones</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna 2: Web & Servidores */}
              <div className="bg-sky-50/70 border border-sky-100 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-sky-200/60 pb-3">
                  <h3 className="font-extrabold text-sky-900 text-base flex items-center gap-2">
                    <span>Web & Servidores</span>
                    <span>→</span>
                  </h3>
                  <span className="text-[11px] font-extrabold text-sky-700 bg-sky-200/80 px-2 py-0.5 rounded-full">Destacado</span>
                </div>
                <div className="space-y-3">
                  {serversCol.map((c) => (
                    <div key={c.slug} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-sky-100/80 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        🌐
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold mb-0.5">
                          <span>☕ Café y Código</span>
                          <span className="text-amber-500 font-black">★ 4.8</span>
                        </div>
                        <a href={`/course/${c.slug}/`} className="font-extrabold text-slate-900 hover:text-sky-600 transition text-sm block truncate">
                          {c.name}
                        </a>
                        <span className="text-xs text-slate-400 block truncate">Certificado profesional • {c.lessons?.length ?? 0} Lecciones</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna 3: Bases de Datos */}
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3">
                  <h3 className="font-extrabold text-indigo-900 text-base flex items-center gap-2">
                    <span>Bases de Datos</span>
                    <span>→</span>
                  </h3>
                  <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-200/80 px-2 py-0.5 rounded-full">Esencial</span>
                </div>
                <div className="space-y-3">
                  {databaseCol.map((c) => (
                    <div key={c.slug} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition border border-indigo-100/80 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        🗄️
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold mb-0.5">
                          <span>☕ Café y Código</span>
                          <span className="text-amber-500 font-black">★ 4.9</span>
                        </div>
                        <a href={`/course/${c.slug}/`} className="font-extrabold text-slate-900 hover:text-indigo-600 transition text-sm block truncate">
                          {c.name}
                        </a>
                        <span className="text-xs text-slate-400 block truncate">Especialización • {c.lessons?.length ?? 0} Lecciones</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* 5. GRILLA GENERAL DEL CATÁLOGO DE CURSOS */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight font-nunito">
              Catálogo Académico Completo
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-slate-200/70 px-3 py-1.5 rounded-full">
              {filteredCourses.length} Cursos
            </span>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
              <span className="text-5xl block">🔍</span>
              <h3 className="text-lg font-black text-slate-900">No se encontraron cursos</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No hay resultados para "{searchTerm}". Intenta con otra palabra clave como Python, SQL o Nginx.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setOnlyFeatured(false); }}
                className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-full hover:bg-blue-700 transition"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const isFeatured = featuredSlugs.has(course.slug);

                return (
                  <article
                    key={course.slug}
                    className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                  >
                    <div>
                      {/* Color Header */}
                      <div
                        className="h-28 p-5 flex items-start justify-between relative overflow-hidden"
                        style={{ backgroundColor: course.color || '#2563eb' }}
                      >
                        <span className="text-[11px] font-black uppercase text-white/90 bg-black/30 px-2.5 py-1 rounded-full backdrop-blur">
                          {course.category}
                        </span>

                        <button
                          onClick={(e) => toggleFeatured(course.slug, e)}
                          title={isFeatured ? 'Desmarcar destacado' : 'Marcar destacado'}
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow transition ${
                            isFeatured
                              ? 'bg-amber-400 text-slate-900 scale-110'
                              : 'bg-white/20 text-white hover:bg-white/40'
                          }`}
                        >
                          {isFeatured ? '★' : '☆'}
                        </button>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                          <span>☕ Café y Código</span>
                          <span className="text-amber-500 font-black">★ 4.9</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition font-nunito line-clamp-1">
                          {course.name}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{course.lessons?.length ?? 0} Lecciones</span>
                      <a
                        href={`/course/${course.slug}/`}
                        className="text-xs font-black text-blue-600 hover:underline inline-flex items-center gap-1 group-hover:translate-x-1 transition"
                      >
                        Ir al curso →
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
