import { useCallback, useEffect, useMemo, useState } from 'react';
import { courses as allCourses } from '../../data/courses';
import { getSupabaseBrowser } from '../../lib/supabase/client';
import {
  academyJoinUrl,
  createSection,
  deleteSection,
  fetchProfileIsAcademy,
  fetchQuizProgressForStudents,
  fetchSectionCourses,
  fetchSectionEnrollments,
  fetchProfilesByIds,
  fetchStudentEnrollments,
  fetchTeacherSections,
  setSectionCourses,
  updateSectionShare,
  type AcademySectionRow,
} from '../../lib/supabase/academy';
import { useSupabaseAuth } from '../../lib/supabase/useSupabaseAuth';
import { courseHomePath } from '../../lib/coursePaths';

const availableSlugs = allCourses.filter((c) => c.status === 'available').map((c) => c.slug);

export default function AcademyApp() {
  const { supabase, loading: authLoading, user } = useSupabaseAuth();
  const [profileLoading, setProfileLoading] = useState(true);
  const [isAcademy, setIsAcademy] = useState(false);

  const [teacherSections, setTeacherSections] = useState<AcademySectionRow[]>([]);
  const [studentBundles, setStudentBundles] = useState<Awaited<ReturnType<typeof fetchStudentEnrollments>>>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sectionCourses, setSectionCoursesState] = useState<string[]>([]);
  const [enrollments, setEnrollments] = useState<{ student_id: string; joined_at: string }[]>([]);
  const [progressRows, setProgressRows] = useState<{ user_id: string; count: number }[]>([]);
  const [nameMap, setNameMap] = useState<Map<string, { display_name: string | null }>>(new Map());

  const [newName, setNewName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!supabase || !user?.id) {
      setIsAcademy(false);
      setProfileLoading(false);
      return;
    }
    setProfileLoading(true);
    const ia = await fetchProfileIsAcademy(supabase, user.id);
    setIsAcademy(ia);
    setProfileLoading(false);
  }, [supabase, user?.id]);

  const loadTeacher = useCallback(async () => {
    if (!supabase || !isAcademy) return;
    setErr(null);
    try {
      const list = await fetchTeacherSections(supabase);
      setTeacherSections(list);
    } catch (e) {
      setErr((e as Error).message);
    }
  }, [supabase, isAcademy]);

  const loadStudent = useCallback(async () => {
    if (!supabase || isAcademy) return;
    setErr(null);
    try {
      const b = await fetchStudentEnrollments(supabase);
      setStudentBundles(b);
    } catch (e) {
      setErr((e as Error).message);
    }
  }, [supabase, isAcademy]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (authLoading || profileLoading) return;
    if (isAcademy) void loadTeacher();
    else void loadStudent();
  }, [authLoading, profileLoading, isAcademy, loadTeacher, loadStudent]);

  useEffect(() => {
    if (!isAcademy || teacherSections.length === 0) return;
    const exists = selectedId && teacherSections.some((s) => s.id === selectedId);
    if (!exists) setSelectedId(teacherSections[0].id);
  }, [isAcademy, teacherSections, selectedId]);

  const selected = useMemo(
    () => teacherSections.find((s) => s.id === selectedId) ?? null,
    [teacherSections, selectedId],
  );

  const loadSectionDetail = useCallback(async () => {
    if (!supabase || !selectedId) return;
    setErr(null);
    try {
      const [crows, erows] = await Promise.all([
        fetchSectionCourses(supabase, selectedId),
        fetchSectionEnrollments(supabase, selectedId),
      ]);
      setSectionCoursesState(crows.map((r) => r.course_slug));
      setEnrollments(erows.map((e) => ({ student_id: e.student_id, joined_at: e.joined_at })));
      const sids = erows.map((e) => e.student_id);
      const slugs = crows.map((r) => r.course_slug);
      const [prows, pmap] = await Promise.all([
        fetchQuizProgressForStudents(supabase, sids, slugs),
        fetchProfilesByIds(supabase, sids),
      ]);
      setNameMap(pmap);
      const byUser = new Map<string, number>();
      for (const p of prows) {
        byUser.set(p.user_id, (byUser.get(p.user_id) ?? 0) + 1);
      }
      setProgressRows(sids.map((id) => ({ user_id: id, count: byUser.get(id) ?? 0 })));
    } catch (e) {
      setErr((e as Error).message);
    }
  }, [supabase, selectedId]);

  useEffect(() => {
    if (!isAcademy || !selectedId) {
      setSectionCoursesState([]);
      setEnrollments([]);
      setProgressRows([]);
      return;
    }
    void loadSectionDetail();
  }, [isAcademy, selectedId, loadSectionDetail]);

  const studentCourseSlugs = useMemo(() => {
    const set = new Set<string>();
    for (const b of studentBundles) {
      for (const c of b.courses) {
        set.add(c.course_slug);
      }
    }
    return [...set];
  }, [studentBundles]);

  const studentCoursesMeta = useMemo(() => {
    const list = studentCourseSlugs
      .map((slug) => allCourses.find((c) => c.slug === slug))
      .filter(Boolean) as typeof allCourses;
    return list;
  }, [studentCourseSlugs]);

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !newName.trim()) return;
    setBusy(true);
    setErr(null);
    try {
      const s = await createSection(supabase, newName.trim());
      setTeacherSections((prev) => [s, ...prev]);
      setSelectedId(s.id);
      setNewName('');
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggleCourse = async (slug: string) => {
    if (!supabase || !selectedId) return;
    const next = sectionCourses.includes(slug)
      ? sectionCourses.filter((s) => s !== slug)
      : [...sectionCourses, slug];
    setBusy(true);
    setErr(null);
    try {
      await setSectionCourses(supabase, selectedId, next);
      setSectionCoursesState(next);
      void loadSectionDetail();
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const toggleShare = async (enabled: boolean) => {
    if (!supabase || !selectedId) return;
    setBusy(true);
    setErr(null);
    try {
      await updateSectionShare(supabase, selectedId, enabled);
      setTeacherSections((prev) =>
        prev.map((s) => (s.id === selectedId ? { ...s, share_enabled: enabled } : s)),
      );
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    if (!selected) return;
    const url = academyJoinUrl(selected.join_code);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErr('No se pudo copiar. Copiá manualmente: ' + url);
    }
  };

  const removeSection = async () => {
    if (!supabase || !selectedId || !confirm('¿Eliminar esta sección y sus inscripciones?')) return;
    setBusy(true);
    setErr(null);
    try {
      await deleteSection(supabase, selectedId);
      setTeacherSections((prev) => prev.filter((s) => s.id !== selectedId));
      setSelectedId(null);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (!getSupabaseBrowser()) {
    return (
      <p className="font-nunito font-[650] text-textSecondary">
        Configurá Supabase en el proyecto para usar Academia.
      </p>
    );
  }

  if (authLoading || profileLoading) {
    return (
      <div className="h-40 animate-pulse rounded-3xl border-4 border-dashed border-border bg-white/60" aria-hidden />
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border-4 border-border bg-white p-8 shadow-neo-lg">
        <p className="m-0 font-nunito text-xl font-black text-textPrimary">Modo academia</p>
        <p className="mt-2 font-nunito font-[650] text-textSecondary">
          Iniciá sesión para ver tus cursos asignados o gestionar secciones como docente.
        </p>
        <a
          href="/cuenta/"
          className="mt-6 inline-block rounded-full border-2 border-border bg-[#2b1d1b] px-6 py-3 font-nunito font-black text-white no-underline shadow-neo"
        >
          Ir a cuenta
        </a>
      </div>
    );
  }

  if (!isAcademy) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl border-4 border-border bg-linear-to-br from-secondary/40 to-tertiary/40 p-6 shadow-neo md:p-8">
          <h2 className="!mt-0 font-nunito text-2xl font-black text-textPrimary">Tus cursos asignados</h2>
          <p className="mt-2 max-w-2xl font-nunito font-[650] text-textSecondary">
            Si tu docente compartió un enlace y activó el modo academia, acá solo verás los cursos de esa sección. Podés
            seguir usando el catálogo general desde <a href="/cursos/">Cursos</a>.
          </p>
        </div>

        {err && (
          <p className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 font-nunito text-sm font-bold text-red-800">
            {err}
          </p>
        )}

        {studentCoursesMeta.length === 0 ? (
          <div className="rounded-3xl border-4 border-dashed border-border bg-[#faf8f5] p-8 text-center">
            <p className="m-0 font-nunito font-black text-textPrimary">Todavía no estás en ninguna sección</p>
            <p className="mt-2 font-nunito font-[650] text-textSecondary">
              Pedile al docente el enlace de invitación (con el modo compartir activado) y abrilo desde{' '}
              <a href="/academia/unirse" className="font-black text-info no-underline">
                Unirse con enlace
              </a>
              .
            </p>
          </div>
        ) : (
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
            {studentCoursesMeta.map((c) => (
              <li key={c.slug} className="rounded-2xl border-4 border-border bg-white p-5 shadow-neo">
                <h3 className="m-0 font-nunito text-lg font-black text-textPrimary">{c.name}</h3>
                <p className="mt-2 line-clamp-3 font-nunito text-sm font-[650] text-textSecondary">{c.description}</p>
                <a
                  href={courseHomePath(c.slug)}
                  className="mt-4 inline-block rounded-full border-2 border-border bg-tertiary px-4 py-2 font-nunito text-sm font-black text-textPrimary no-underline shadow-[2px_2px_0px_#1E1210]"
                >
                  Ir al curso →
                </a>
              </li>
            ))}
          </ul>
        )}

        {studentBundles.length > 0 && (
          <section className="rounded-3xl border-4 border-border bg-white p-6 shadow-neo-lg">
            <h3 className="!mt-0 font-nunito text-lg font-black text-textPrimary">Secciones en las que estás</h3>
            <ul className="mt-3 list-none space-y-2 p-0">
              {studentBundles.map(({ section, courses: cs }) => (
                <li key={section.id} className="font-nunito text-sm font-[650] text-textSecondary">
                  <strong className="text-textPrimary">{section.name}</strong> — {cs.length} curso(s)
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border-4 border-border bg-white p-6 shadow-neo-lg md:p-8">
        <h2 className="!mt-0 font-nunito text-2xl font-black text-textPrimary">Panel docente · Academia</h2>
        <p className="mt-2 max-w-2xl font-nunito font-[650] text-textSecondary">
          Creá secciones, asigná cursos del catálogo y activá <strong>Compartir</strong> para que los alumnos se inscriban
          con el enlace. El progreso de quizzes por lección se resume abajo.
        </p>
      </div>

      {err && (
        <p className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 font-nunito text-sm font-bold text-red-800">
          {err}
        </p>
      )}

      <form onSubmit={handleCreateSection} className="flex flex-wrap items-end gap-3">
        <div className="min-w-[12rem] flex-1">
          <label htmlFor="new-section-name" className="block font-nunito text-xs font-extrabold text-textMuted">
            Nueva sección
          </label>
          <input
            id="new-section-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Ej. 4º año turno mañana"
            className="mt-1 w-full rounded-2xl border-4 border-border bg-primary px-4 py-2.5 font-nunito font-bold text-textPrimary shadow-neo"
          />
        </div>
        <button
          type="submit"
          disabled={busy || !newName.trim()}
          className="rounded-full border-2 border-border bg-[#2b1d1b] px-6 py-2.5 font-nunito font-black text-white shadow-neo disabled:opacity-50"
        >
          Crear
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_1fr]">
        <aside className="space-y-2">
          <p className="font-nunito text-xs font-extrabold uppercase tracking-wide text-textMuted">Secciones</p>
          {teacherSections.length === 0 ? (
            <p className="font-nunito text-sm font-[650] text-textSecondary">Ninguna aún.</p>
          ) : (
            <ul className="list-none space-y-2 p-0">
              {teacherSections.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full rounded-2xl border-2 px-3 py-2 text-left font-nunito text-sm font-extrabold transition-colors ${
                      selectedId === s.id
                        ? 'border-info bg-tertiary text-textPrimary'
                        : 'border-border bg-white text-textSecondary hover:bg-secondary/30'
                    }`}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="min-w-0">
          {!selected ? (
            <p className="font-nunito font-[650] text-textSecondary">Elegí o creá una sección.</p>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="m-0 font-nunito text-xl font-black text-textPrimary">{selected.name}</h3>
                <button
                  type="button"
                  onClick={() => void removeSection()}
                  className="rounded-xl border-2 border-red-200 bg-red-50 px-3 py-1.5 font-nunito text-sm font-black text-red-800"
                >
                  Eliminar sección
                </button>
              </div>

              <div className="rounded-2xl border-4 border-border bg-linear-to-r from-secondary/50 to-tertiary/50 p-4 shadow-neo">
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2 font-nunito font-extrabold text-textPrimary">
                    <input
                      type="checkbox"
                      checked={selected.share_enabled}
                      disabled={busy}
                      onChange={(e) => void toggleShare(e.target.checked)}
                    />
                    Compartir invitación (código de 8 caracteres + enlace)
                  </label>
                  {selected.share_enabled && (
                    <button
                      type="button"
                      onClick={() => void copyLink()}
                      className="rounded-full border-2 border-border bg-white px-4 py-1.5 font-nunito text-sm font-black shadow-neo"
                    >
                      {copied ? '¡Copiado!' : 'Copiar enlace de invitación'}
                    </button>
                  )}
                </div>
                {selected.share_enabled && (
                  <div className="mt-3 space-y-1">
                    <p className="m-0 font-mono text-sm font-black tracking-wider text-textPrimary">{selected.join_code}</p>
                    <p className="m-0 break-all font-mono text-xs text-textMuted">{academyJoinUrl(selected.join_code)}</p>
                    <p className="m-0 font-nunito text-xs font-[650] text-textMuted">
                      Los alumnos pueden pegar el código en Academia → Unirse (mayúsculas y minúsculas cuentan).
                    </p>
                  </div>
                )}
              </div>

              <section>
                <h4 className="m-0 font-nunito text-lg font-black text-textPrimary">Cursos en esta sección</h4>
                <p className="mt-1 font-nunito text-sm font-[650] text-textSecondary">
                  Marcá los cursos que los alumnos deben completar. Solo esos aparecerán en su vista Academia.
                </p>
                <ul className="mt-4 grid max-h-[min(24rem,50vh)] list-none gap-2 overflow-y-auto p-0 sm:grid-cols-2">
                  {availableSlugs.map((slug) => {
                    const c = allCourses.find((x) => x.slug === slug);
                    if (!c) return null;
                    const on = sectionCourses.includes(slug);
                    return (
                      <li key={slug}>
                        <label className="flex cursor-pointer items-start gap-2 rounded-xl border-2 border-border bg-white p-3 shadow-[2px_2px_0px_#1E1210]">
                          <input
                            type="checkbox"
                            checked={on}
                            disabled={busy}
                            onChange={() => void toggleCourse(slug)}
                            className="mt-1"
                          />
                          <span>
                            <span className="font-nunito font-black text-textPrimary">{c.name}</span>
                            <span className="mt-0.5 block font-nunito text-xs font-[650] text-textMuted">{slug}</span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="rounded-2xl border-4 border-border bg-white p-4 shadow-neo">
                <h4 className="m-0 font-nunito text-lg font-black text-textPrimary">Alumnos inscritos y avance</h4>
                <p className="mt-1 font-nunito text-sm font-[650] text-textSecondary">
                  Avance = cantidad de lecciones con al menos un intento de quiz registrado (en los cursos de la sección).
                </p>
                {enrollments.length === 0 ? (
                  <p className="mt-4 font-nunito text-sm font-[650] text-textMuted">Nadie se inscribió aún con el enlace.</p>
                ) : (
                  <div className="mt-4 overflow-x-auto rounded-xl border-2 border-border">
                    <table className="w-full min-w-[20rem] border-collapse text-left font-nunito text-sm">
                      <thead>
                        <tr className="border-b-2 border-border bg-tertiary/40">
                          <th className="px-3 py-2 font-black">Alumno</th>
                          <th className="px-3 py-2 font-black">Avance (lecciones con quiz)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progressRows.map(({ user_id: sid, count }) => {
                          const label =
                            nameMap.get(sid)?.display_name?.trim() || `${sid.slice(0, 8)}…`;
                          return (
                            <tr key={sid} className="border-b border-border/60">
                              <td className="px-3 py-2 font-bold text-textPrimary">{label}</td>
                              <td className="px-3 py-2 tabular-nums font-[650] text-textSecondary">{count}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
