-- =============================================================================
-- Esquema completo (public): perfiles, marcadores, quizzes, academia, RLS.
-- Fuente manual: editar aquí. db:fresh ejecuta reset.sql y luego este archivo.
-- Producción (sin borrar datos): aplicar solo los .sql en sql-incremental/ en orden.
-- Requisito Supabase: Authentication → Email habilitado.
-- =============================================================================

-- ── Perfiles (curso favorito + privilegio docente modo academia) ────────────

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  favorite_course_slug text,
  is_academy boolean not null default false,
  -- Colaborador (Ko-fi): insignia, muro y zona exclusiva; is_sponsor solo desde SQL en Supabase.
  is_sponsor boolean not null default false,
  sponsor_since timestamptz,
  -- Puntos de competencia (concursos, desafíos); niveles cafeteros en código (userLevels.ts).
  competition_points int not null default 0 check (competition_points >= 0),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Perfil visible por el dueño"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Insertar propio perfil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Actualizar propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Colaboradores visibles en muro público"
  on public.profiles for select
  to anon, authenticated
  using (is_sponsor = true);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    nullif(trim(coalesce(new.raw_user_meta_data->>'display_name', '')), '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Marcadores de lecciones ─────────────────────────────────────────────────

create table public.lesson_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  lesson_slug text not null,
  lesson_title text,
  created_at timestamptz not null default now(),
  unique (user_id, course_slug, lesson_slug)
);

create index lesson_bookmarks_user_favorite
  on public.lesson_bookmarks (user_id, course_slug);

alter table public.lesson_bookmarks enable row level security;

create policy "Marcadores: leer propios"
  on public.lesson_bookmarks for select
  using (auth.uid() = user_id);

create policy "Marcadores: insertar propios"
  on public.lesson_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Marcadores: actualizar propios"
  on public.lesson_bookmarks for update
  using (auth.uid() = user_id);

create policy "Marcadores: borrar propios"
  on public.lesson_bookmarks for delete
  using (auth.uid() = user_id);

-- ── Progreso de quizzes ─────────────────────────────────────────────────────

create table public.quiz_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_slug text not null,
  lesson_slug text not null,
  correct_best int not null default 0 check (correct_best >= 0),
  question_count int not null check (question_count > 0),
  attempts int not null default 0 check (attempts >= 0),
  updated_at timestamptz not null default now(),
  unique (user_id, course_slug, lesson_slug)
);

create index quiz_progress_user_course
  on public.quiz_progress (user_id, course_slug);

alter table public.quiz_progress enable row level security;

create policy "Quiz progreso: leer propio"
  on public.quiz_progress for select
  using (auth.uid() = user_id);

create policy "Quiz progreso: insertar propio"
  on public.quiz_progress for insert
  with check (auth.uid() = user_id);

create policy "Quiz progreso: actualizar propio"
  on public.quiz_progress for update
  using (auth.uid() = user_id);

create policy "Quiz progreso: borrar propio"
  on public.quiz_progress for delete
  using (auth.uid() = user_id);

-- ── Modo academia ───────────────────────────────────────────────────────────

create table public.academy_sections (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  -- Código de 8 caracteres [A-Za-z0-9], sensible a mayúsculas; el trigger lo genera si viene null al insertar.
  join_code text unique,
  share_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint academy_sections_join_code_format check (join_code is null or join_code ~ '^[A-Za-z0-9]{8}$')
);

create or replace function public.random_academy_join_code()
returns text
language plpgsql
set search_path = public
as $$
declare
  chars constant text := '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  result text := '';
  i int;
  idx int;
begin
  for i in 1..8 loop
    idx := 1 + floor(random() * 62)::int;
    result := result || substr(chars, idx, 1);
  end loop;
  return result;
end;
$$;

create or replace function public.academy_sections_set_join_code()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  candidate text;
  attempts int := 0;
begin
  if new.join_code is not null and length(trim(new.join_code)) > 0 then
    new.join_code := trim(new.join_code);
    return new;
  end if;
  loop
    candidate := public.random_academy_join_code();
    exit when not exists (select 1 from public.academy_sections where join_code = candidate);
    attempts := attempts + 1;
    if attempts > 100 then
      raise exception 'no se pudo generar join_code único';
    end if;
  end loop;
  new.join_code := candidate;
  return new;
end;
$$;

create trigger academy_sections_set_join_code_trigger
  before insert on public.academy_sections
  for each row execute function public.academy_sections_set_join_code();

create index academy_sections_teacher on public.academy_sections (teacher_id);

create table public.academy_section_courses (
  section_id uuid not null references public.academy_sections (id) on delete cascade,
  course_slug text not null,
  sort_order int not null default 0,
  primary key (section_id, course_slug)
);

create index academy_section_courses_section on public.academy_section_courses (section_id);

create table public.academy_enrollments (
  section_id uuid not null references public.academy_sections (id) on delete cascade,
  student_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (section_id, student_id)
);

create index academy_enrollments_student on public.academy_enrollments (student_id);

alter table public.academy_sections enable row level security;
alter table public.academy_section_courses enable row level security;
alter table public.academy_enrollments enable row level security;

create or replace function public.academy_user_is_student_of_section(p_section_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.academy_enrollments e
    where e.section_id = p_section_id
      and e.student_id = auth.uid()
  );
$$;

create or replace function public.academy_user_is_teacher_of_section(p_section_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.academy_sections s
    where s.id = p_section_id
      and s.teacher_id = auth.uid()
  );
$$;

create or replace function public.academy_section_share_enabled(p_section_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select s.share_enabled from public.academy_sections s where s.id = p_section_id),
    false
  );
$$;

grant execute on function public.academy_user_is_student_of_section(uuid) to authenticated;
grant execute on function public.academy_user_is_teacher_of_section(uuid) to authenticated;
grant execute on function public.academy_section_share_enabled(uuid) to authenticated;

create policy "Academia secciones: ver docente o alumno"
  on public.academy_sections for select
  using (
    auth.uid() = teacher_id
    or public.academy_user_is_student_of_section(academy_sections.id)
  );

create policy "Academia secciones: crear docente"
  on public.academy_sections for insert
  with check (
    auth.uid() = teacher_id
    and coalesce((select p.is_academy from public.profiles p where p.id = auth.uid()), false) = true
  );

create policy "Academia secciones: editar docente"
  on public.academy_sections for update
  using (auth.uid() = teacher_id);

create policy "Academia secciones: borrar docente"
  on public.academy_sections for delete
  using (auth.uid() = teacher_id);

create policy "Academia cursos: ver docente o alumno"
  on public.academy_section_courses for select
  using (
    public.academy_user_is_teacher_of_section(academy_section_courses.section_id)
    or public.academy_user_is_student_of_section(academy_section_courses.section_id)
  );

create policy "Academia cursos: gestionar docente"
  on public.academy_section_courses for insert
  with check (public.academy_user_is_teacher_of_section(section_id));

create policy "Academia cursos: actualizar docente"
  on public.academy_section_courses for update
  using (public.academy_user_is_teacher_of_section(academy_section_courses.section_id));

create policy "Academia cursos: borrar docente"
  on public.academy_section_courses for delete
  using (public.academy_user_is_teacher_of_section(academy_section_courses.section_id));

create policy "Academia inscripciones: ver docente o alumno"
  on public.academy_enrollments for select
  using (
    auth.uid() = student_id
    or public.academy_user_is_teacher_of_section(academy_enrollments.section_id)
  );

create policy "Academia inscripciones: abandonar"
  on public.academy_enrollments for delete
  using (auth.uid() = student_id);

create policy "Academia inscripciones: insertar alumno"
  on public.academy_enrollments for insert
  with check (
    auth.uid() = student_id
    and public.academy_section_share_enabled(section_id)
  );

create or replace function public.academy_join_section(p_join_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_section_id uuid;
  v_code text;
begin
  v_code := trim(p_join_code);
  if v_code !~ '^[A-Za-z0-9]{8}$' then
    raise exception 'codigo_invalido';
  end if;
  select id into v_section_id
  from public.academy_sections
  where join_code = v_code
    and share_enabled = true;
  if v_section_id is null then
    raise exception 'token_invalido_o_compartir_desactivado';
  end if;
  insert into public.academy_enrollments (section_id, student_id)
  values (v_section_id, auth.uid())
  on conflict (section_id, student_id) do nothing;
  return v_section_id;
end;
$$;

grant execute on function public.academy_join_section(text) to authenticated;

-- ── Docente: ver perfiles, progreso y marcadores de alumnos inscritos ───────

create policy "Perfil: docente ve alumnos inscritos"
  on public.profiles for select
  using (
    exists (
      select 1
      from public.academy_enrollments ae
      join public.academy_sections sec on sec.id = ae.section_id
      where ae.student_id = profiles.id
        and sec.teacher_id = auth.uid()
    )
  );

create policy "Quiz progreso: docente ve alumnos"
  on public.quiz_progress for select
  using (
    exists (
      select 1
      from public.academy_enrollments ae
      join public.academy_sections sec on sec.id = ae.section_id
      where ae.student_id = quiz_progress.user_id
        and sec.teacher_id = auth.uid()
    )
  );

create policy "Marcadores: docente ve alumnos"
  on public.lesson_bookmarks for select
  using (
    exists (
      select 1
      from public.academy_enrollments ae
      join public.academy_sections sec on sec.id = ae.section_id
      where ae.student_id = lesson_bookmarks.user_id
        and sec.teacher_id = auth.uid()
    )
  );

-- ── Historial de cafés consumidos ────────────────────────────────────────────

create table public.coffee_history (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users (id) on delete cascade,
  coffee_id    text        not null,
  milk_id      text,
  temp_mode    text        not null default 'hot',
  prepared_at  timestamptz not null,
  finished_at  timestamptz not null default now()
);

create index coffee_history_user_finished
  on public.coffee_history (user_id, finished_at desc);

alter table public.coffee_history enable row level security;

create policy "Ver propio historial"
  on public.coffee_history for select
  using (auth.uid() = user_id);

create policy "Insertar propio historial"
  on public.coffee_history for insert
  with check (auth.uid() = user_id);

create policy "Borrar propio historial"
  on public.coffee_history for delete
  using (auth.uid() = user_id);
