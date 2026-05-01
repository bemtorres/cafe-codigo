import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';
import { badgeSvgToDataUrl, generateBadgeSvg } from '../../lib/badges/badgeDesignerSvg';
import SuperAdminGate from './SuperAdminGate';

export type AdminCourseLite = {
  slug: string;
  name: string;
  lessons: { slug: string; title: string }[];
};

type BadgeRow = {
  code: string;
  name: string;
  description: string;
  image_url: string;
  required_courses: string[];
  required_modules: string[];
  is_active: boolean;
  created_at: string;
};

function showToast(el: HTMLElement | null, message: string, type: 'success' | 'error') {
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
  el.classList.add(type === 'success' ? 'bg-green-100' : 'bg-red-100');
  el.classList.add(type === 'success' ? 'text-green-800' : 'text-red-800');
  el.classList.remove('hidden');
  window.setTimeout(() => el.classList.add('hidden'), 5000);
}

function AdminBadgesPanel({ initialCourses }: { initialCourses: AdminCourseLite[] }) {
  const { supabase, user } = useSupabaseAuth();
  const [badges, setBadges] = useState<BadgeRow[]>([]);
  const [badgesLoading, setBadgesLoading] = useState(true);
  const [badgesError, setBadgesError] = useState<string | null>(null);

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [designLine1, setDesignLine1] = useState('NIVEL');
  const [designLine2, setDesignLine2] = useState('');
  const [designPrimary, setDesignPrimary] = useState('#fef3c7');
  const [designSecondary, setDesignSecondary] = useState('#fde68a');
  const [designBorder, setDesignBorder] = useState('#1E1210');
  const [designAccent, setDesignAccent] = useState('#f59e0b');

  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());

  const toast = (message: string, type: 'success' | 'error') => {
    const el = document.getElementById('badgeMessage');
    showToast(el, message, type);
  };

  const designerPreview = useMemo(() => {
    const svg = generateBadgeSvg({
      line1: designLine1 || ' ',
      line2: designLine2,
      primaryColor: designPrimary,
      secondaryColor: designSecondary,
      borderColor: designBorder,
      accentColor: designAccent,
    });
    return badgeSvgToDataUrl(svg);
  }, [designLine1, designLine2, designPrimary, designSecondary, designBorder, designAccent]);

  const loadBadges = useCallback(async () => {
    if (!supabase) {
      setBadgesError('Supabase no configurado');
      setBadgesLoading(false);
      return;
    }
    setBadgesLoading(true);
    setBadgesError(null);
    const { data, error } = await supabase
      .from('badge_definitions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setBadgesError(error.message);
      setBadges([]);
    } else {
      setBadges((data as BadgeRow[]) ?? []);
    }
    setBadgesLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (supabase && user) void loadBadges();
  }, [supabase, user, loadBadges]);

  const toggleCourse = (slug: string) => {
    setSelectedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
        setSelectedModules((mods) => {
          const m2 = new Set(mods);
          for (const k of m2) {
            if (k.startsWith(`${slug}/`)) m2.delete(k);
          }
          return m2;
        });
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const toggleModule = (key: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const applyDesignerToUrl = () => {
    const svg = generateBadgeSvg({
      line1: designLine1,
      line2: designLine2,
      primaryColor: designPrimary,
      secondaryColor: designSecondary,
      borderColor: designBorder,
      accentColor: designAccent,
    });
    setImageUrl(badgeSvgToDataUrl(svg));
    toast('Diseño aplicado al campo URL de imagen (SVG embebido)', 'success');
  };

  const downloadDesignerSvg = () => {
    const svg = generateBadgeSvg({
      line1: designLine1,
      line2: designLine2,
      primaryColor: designPrimary,
      secondaryColor: designSecondary,
      borderColor: designBorder,
      accentColor: designAccent,
    });
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${code.trim() || 'insignia'}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) return;

    const required_courses = [...selectedCourses];
    const required_modules = [...selectedModules];

    const { error } = await supabase.from('badge_definitions').insert({
      code: code.trim(),
      name: name.trim(),
      description: description.trim(),
      image_url: imageUrl.trim(),
      required_courses,
      required_modules,
    });

    if (error) {
      toast(`Error al crear: ${error.message}`, 'error');
      return;
    }

    toast('Insignia creada exitosamente', 'success');
    setCode('');
    setName('');
    setDescription('');
    setImageUrl('');
    setSelectedCourses(new Set());
    setSelectedModules(new Set());
    void loadBadges();
  };

  const toggleBadgeActive = async (badgeCode: string, currentActive: boolean) => {
    if (!supabase || !user) return;
    const { error } = await supabase
      .from('badge_definitions')
      .update({ is_active: !currentActive, updated_at: new Date().toISOString() })
      .eq('code', badgeCode);

    if (error) {
      toast(`Error: ${error.message}`, 'error');
      return;
    }
    toast(`Insignia ${!currentActive ? 'activada' : 'desactivada'}`, 'success');
    void loadBadges();
  };

  const coursesWithLessons = useMemo(
    () => initialCourses.filter((c) => (c.lessons?.length ?? 0) > 0),
    [initialCourses]
  );

  const selectedCourseData = useMemo(
    () => coursesWithLessons.filter((c) => selectedCourses.has(c.slug)),
    [coursesWithLessons, selectedCourses]
  );

  if (!supabase || !user) return null;

  return (
    <article className="admin-badges w-full max-w-full min-w-0 font-nunito">
      <div id="badgeMessage" className="mb-4 hidden rounded-lg border-2 border-gray-900 p-4 text-sm font-bold" role="alert" />

      <section className="mb-8 rounded-lg border-2 border-gray-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-4 border-b border-gray-900 pb-2 text-lg font-bold">Diseñador de insignia (SVG)</h2>
        <p className="mb-4 text-xs font-[650] text-gray-600">
          Generá un SVG con el estilo de la plataforma y usalo como imagen (se guarda como URL de datos en la base). También
          podés descargar el archivo para subirlo a <code className="rounded bg-gray-100 px-1">public/badges/</code>.
        </p>
        <div className="grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">Texto principal</label>
                <input
                  value={designLine1}
                  onChange={(e) => setDesignLine1(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-900 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  maxLength={18}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">Subtítulo (opcional)</label>
                <input
                  value={designLine2}
                  onChange={(e) => setDesignLine2(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-900 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  maxLength={18}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(
                [
                  ['Fondo 1', designPrimary, setDesignPrimary],
                  ['Fondo 2', designSecondary, setDesignSecondary],
                  ['Borde / texto', designBorder, setDesignBorder],
                  ['Acento', designAccent, setDesignAccent],
                ] as const
              ).map(([label, val, setVal]) => (
                <label key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-gray-600">{label}</span>
                  <input
                    type="color"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded border-2 border-gray-900 bg-white"
                  />
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={applyDesignerToUrl}
                className="rounded-lg border-2 border-gray-900 bg-yellow-400 px-4 py-2 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-yellow-500"
              >
                Aplicar al campo imagen
              </button>
              <button
                type="button"
                onClick={downloadDesignerSvg}
                className="rounded-lg border-2 border-gray-900 bg-gray-200 px-4 py-2 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-300"
              >
                Descargar .svg
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 p-4">
            <img src={designerPreview} alt="Vista previa" className="h-28 w-28 object-contain" width={112} height={112} />
            <p className="mt-2 text-center text-[10px] font-bold text-gray-500">Vista previa</p>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-lg border-2 border-gray-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-4 border-b border-gray-900 pb-2 text-lg font-bold">Nueva insignia</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="badgeCode" className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
                Código (único)
              </label>
              <input
                id="badgeCode"
                value={code}
                onChange={(e) => setCode(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                required
                pattern="^[a-z0-9-]+$"
                placeholder="ej: fullstack-web"
                className="w-full rounded-lg border-2 border-gray-900 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <p className="mt-1 text-[10px] text-gray-500">Solo minúsculas, números y guiones</p>
            </div>
            <div>
              <label htmlFor="badgeName" className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
                Nombre
              </label>
              <input
                id="badgeName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="ej: Fullstack Web Developer"
                className="w-full rounded-lg border-2 border-gray-900 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="badgeDescription" className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
              Descripción
            </label>
            <textarea
              id="badgeDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              required
              placeholder="Describe qué logra el usuario al obtener esta insignia..."
              className="w-full resize-none rounded-lg border-2 border-gray-900 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="badgeImage" className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600">
              URL de la imagen
            </label>
            <input
              id="badgeImage"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              placeholder="/badges/fullstack-web.svg o SVG embebido desde el diseñador"
              className="w-full rounded-lg border-2 border-gray-900 bg-white px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {imageUrl ? (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-16 w-16 rounded border border-gray-300 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ) : null}
          </div>

          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
              Cursos requeridos (completar todo el curso)
            </span>
            <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-2 sm:grid-cols-2 md:grid-cols-3">
              {coursesWithLessons.map((course) => (
                <label
                  key={course.slug}
                  className="flex cursor-pointer items-center gap-2 rounded border border-gray-200 bg-white p-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedCourses.has(course.slug)}
                    onChange={() => toggleCourse(course.slug)}
                    className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                  />
                  <span className="text-xs font-bold">{course.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-600">
              Módulos específicos (opcional)
            </span>
            <div className="max-h-64 space-y-3 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-2">
              {selectedCourseData.length === 0 ? (
                <p className="text-xs italic text-gray-500">Seleccioná cursos arriba para ver sus módulos</p>
              ) : (
                selectedCourseData.map((course) => (
                  <div key={course.slug} className="mb-2">
                    <p className="mb-1 text-xs font-bold text-gray-700">{course.name}</p>
                    <div className="ml-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {(course.lessons || []).map((lesson) => {
                        const key = `${course.slug}/${lesson.slug}`;
                        return (
                          <label
                            key={key}
                            className="flex cursor-pointer items-center gap-2 rounded border border-gray-200 bg-white p-1.5 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={selectedModules.has(key)}
                              onChange={() => toggleModule(key)}
                              className="h-3 w-3 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                            />
                            <span className="text-[11px]">{lesson.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex gap-3 border-t border-gray-200 pt-2">
            <button
              type="submit"
              className="rounded-lg border-2 border-gray-900 bg-yellow-400 px-6 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-yellow-500"
            >
              Crear insignia
            </button>
            <button
              type="button"
              onClick={() => {
                setCode('');
                setName('');
                setDescription('');
                setImageUrl('');
                setSelectedCourses(new Set());
                setSelectedModules(new Set());
              }}
              className="rounded-lg border-2 border-gray-900 bg-gray-200 px-6 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-300"
            >
              Limpiar
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border-2 border-gray-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 flex items-center justify-between border-b border-gray-900 pb-2">
          <h2 className="text-lg font-bold">Insignias existentes</h2>
          <button
            type="button"
            onClick={() => void loadBadges()}
            className="rounded-lg border-2 border-gray-900 bg-gray-100 px-4 py-1.5 text-xs font-bold transition-all hover:bg-gray-200"
          >
            Actualizar
          </button>
        </div>
        {badgesLoading ? (
          <p className="py-8 text-center text-sm text-gray-500">Cargando...</p>
        ) : badgesError ? (
          <p className="py-8 text-center text-sm text-red-500">Error: {badgesError}</p>
        ) : badges.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">No hay insignias creadas</p>
        ) : (
          <div className="space-y-3">
            {badges.map((badge) => (
              <div
                key={badge.code}
                className={`rounded-lg border-2 border-gray-900 bg-gray-50 p-4 ${!badge.is_active ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <img
                      src={badge.image_url}
                      alt={badge.name}
                      className="h-12 w-12 flex-shrink-0 rounded border border-gray-300 bg-white object-contain"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-gray-900">{badge.name}</h3>
                        <span className="rounded bg-gray-200 px-2 py-0.5 font-mono text-[10px]">{badge.code}</span>
                        {badge.is_active ? (
                          <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800">Activa</span>
                        ) : (
                          <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800">Inactiva</span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-gray-600">{badge.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-gray-500">
                        {badge.required_courses?.length > 0 ? <span>Cursos: {badge.required_courses.join(', ')}</span> : null}
                        {badge.required_modules?.length > 0 ? (
                          <span>Módulos: {badge.required_modules.length} seleccionados</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void toggleBadgeActive(badge.code, badge.is_active)}
                    className="flex-shrink-0 rounded border-2 border-gray-900 px-3 py-1 text-xs font-bold transition-all hover:bg-gray-200"
                  >
                    {badge.is_active ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}

export default function AdminBadgesManager(props: { initialCourses: AdminCourseLite[] }) {
  return (
    <SuperAdminGate featureHint="la gestión de insignias">
      <AdminBadgesPanel {...props} />
    </SuperAdminGate>
  );
}
