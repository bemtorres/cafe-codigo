import type { SupabaseClient } from '@supabase/supabase-js';

export type AcademySectionRow = {
  id: string;
  teacher_id: string;
  name: string;
  /** Código de 8 caracteres [A-Za-z0-9] para unirse (sensible a mayúsculas). */
  join_code: string;
  share_enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type AcademySectionCourseRow = {
  section_id: string;
  course_slug: string;
  sort_order: number;
};

export type AcademyEnrollmentRow = {
  section_id: string;
  student_id: string;
  joined_at: string;
};

export async function fetchProfileIsAcademy(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase.from('profiles').select('is_academy').eq('id', userId).maybeSingle();
  if (error || !data) return false;
  return Boolean((data as { is_academy?: boolean }).is_academy);
}

export async function fetchTeacherSections(supabase: SupabaseClient): Promise<AcademySectionRow[]> {
  const { data, error } = await supabase
    .from('academy_sections')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data as AcademySectionRow[]) ?? [];
}

export async function createSection(supabase: SupabaseClient, name: string): Promise<AcademySectionRow> {
  const { data: u } = await supabase.auth.getUser();
  const uid = u.user?.id;
  if (!uid) throw new Error('Sin sesión');
  const { data, error } = await supabase
    .from('academy_sections')
    .insert({ teacher_id: uid, name: name.trim() })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as AcademySectionRow;
}

export async function updateSectionShare(
  supabase: SupabaseClient,
  sectionId: string,
  shareEnabled: boolean,
): Promise<void> {
  const { error } = await supabase
    .from('academy_sections')
    .update({ share_enabled: shareEnabled, updated_at: new Date().toISOString() })
    .eq('id', sectionId);
  if (error) throw new Error(error.message);
}

export async function deleteSection(supabase: SupabaseClient, sectionId: string): Promise<void> {
  const { error } = await supabase.from('academy_sections').delete().eq('id', sectionId);
  if (error) throw new Error(error.message);
}

export async function fetchSectionCourses(
  supabase: SupabaseClient,
  sectionId: string,
): Promise<AcademySectionCourseRow[]> {
  const { data, error } = await supabase
    .from('academy_section_courses')
    .select('*')
    .eq('section_id', sectionId)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return (data as AcademySectionCourseRow[]) ?? [];
}

export async function setSectionCourses(
  supabase: SupabaseClient,
  sectionId: string,
  courseSlugs: string[],
): Promise<void> {
  const { error: delErr } = await supabase.from('academy_section_courses').delete().eq('section_id', sectionId);
  if (delErr) throw new Error(delErr.message);
  if (courseSlugs.length === 0) return;
  const rows = courseSlugs.map((course_slug, i) => ({
    section_id: sectionId,
    course_slug,
    sort_order: i,
  }));
  const { error } = await supabase.from('academy_section_courses').insert(rows);
  if (error) throw new Error(error.message);
}

export async function fetchSectionEnrollments(
  supabase: SupabaseClient,
  sectionId: string,
): Promise<AcademyEnrollmentRow[]> {
  const { data, error } = await supabase
    .from('academy_enrollments')
    .select('*')
    .eq('section_id', sectionId)
    .order('joined_at', { ascending: true });
  if (error) throw new Error(error.message);
  return (data as AcademyEnrollmentRow[]) ?? [];
}

export async function fetchStudentEnrollments(supabase: SupabaseClient): Promise<
  { section: AcademySectionRow; courses: AcademySectionCourseRow[] }[]
> {
  const { data: enr, error: e1 } = await supabase.from('academy_enrollments').select('section_id');
  if (e1) throw new Error(e1.message);
  const sectionIds = [...new Set((enr ?? []).map((r: { section_id: string }) => r.section_id))];
  if (sectionIds.length === 0) return [];

  const { data: sections, error: e2 } = await supabase
    .from('academy_sections')
    .select('*')
    .in('id', sectionIds);
  if (e2) throw new Error(e2.message);

  const { data: allCourses, error: e3 } = await supabase
    .from('academy_section_courses')
    .select('*')
    .in('section_id', sectionIds);
  if (e3) throw new Error(e3.message);

  const bySection = new Map<string, AcademySectionCourseRow[]>();
  for (const c of (allCourses as AcademySectionCourseRow[]) ?? []) {
    const arr = bySection.get(c.section_id) ?? [];
    arr.push(c);
    bySection.set(c.section_id, arr);
  }
  for (const arr of bySection.values()) {
    arr.sort((a, b) => a.sort_order - b.sort_order);
  }

  return ((sections as AcademySectionRow[]) ?? []).map((section) => ({
    section,
    courses: bySection.get(section.id) ?? [],
  }));
}

const JOIN_CODE_RE = /^[A-Za-z0-9]{8}$/;

export function normalizeJoinCode(raw: string): string {
  return raw.trim();
}

export function isValidJoinCode(s: string): boolean {
  return JOIN_CODE_RE.test(normalizeJoinCode(s));
}

export async function joinSectionByCode(supabase: SupabaseClient, joinCode: string): Promise<string> {
  const code = normalizeJoinCode(joinCode);
  if (!isValidJoinCode(code)) {
    throw new Error('El código debe tener 8 caracteres (letras y números; mayúsculas y minúsculas cuentan).');
  }
  const { data, error } = await supabase.rpc('academy_join_section', { p_join_code: code });
  if (error) throw new Error(mapJoinRpcError(error.message));
  return data as string;
}

function mapJoinRpcError(msg: string): string {
  if (msg.includes('codigo_invalido')) {
    return 'El código debe tener exactamente 8 caracteres (letras y números, mayúsculas y minúsculas cuentan).';
  }
  if (msg.includes('token_invalido_o_compartir_desactivado')) {
    return 'Código incorrecto o el docente no activó compartir enlace para esta sección.';
  }
  return msg;
}

export function academyJoinUrl(joinCode: string): string {
  const code = normalizeJoinCode(joinCode);
  if (typeof window === 'undefined') return `/academia/unirse?code=${encodeURIComponent(code)}`;
  const u = new URL('/academia/unirse', window.location.origin);
  u.searchParams.set('code', code);
  return u.toString();
}

export type QuizProgressLite = {
  user_id: string;
  course_slug: string;
  lesson_slug: string;
  correct_best: number;
  question_count: number;
};

export async function fetchQuizProgressForStudents(
  supabase: SupabaseClient,
  studentIds: string[],
  courseSlugs: string[],
): Promise<QuizProgressLite[]> {
  if (studentIds.length === 0 || courseSlugs.length === 0) return [];
  const { data, error } = await supabase
    .from('quiz_progress')
    .select('user_id, course_slug, lesson_slug, correct_best, question_count')
    .in('user_id', studentIds)
    .in('course_slug', courseSlugs);
  if (error) throw new Error(error.message);
  return (data as QuizProgressLite[]) ?? [];
}

export async function fetchProfilesByIds(
  supabase: SupabaseClient,
  ids: string[],
): Promise<Map<string, { display_name: string | null }>> {
  if (ids.length === 0) return new Map();
  const { data, error } = await supabase.from('profiles').select('id, display_name').in('id', ids);
  if (error) throw new Error(error.message);
  const m = new Map<string, { display_name: string | null }>();
  for (const row of (data as { id: string; display_name: string | null }[]) ?? []) {
    m.set(row.id, { display_name: row.display_name });
  }
  return m;
}
