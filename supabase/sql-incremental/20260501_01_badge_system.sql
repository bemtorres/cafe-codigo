-- ── Sistema de Insignias por Paquete de Módulos ──────────────────────────────
-- Permite definir insignias asociadas a paquetes de cursos/módulos.
-- Los usuarios obtienen insignias al completar todos los módulos requeridos.
-- Para producción: ejecutar este archivo en Supabase → SQL Editor.
-- Nota: las políticas de gestión aquí usan is_academy; en instalaciones nuevas ejecutá
-- después `20260501_03_profiles_super_admin_badges_rls.sql` para que solo is_super_admin gestione insignias.

-- ── Definiciones de insignias ─────────────────────────────────────────────────

create table if not exists public.badge_definitions (
  id                uuid        primary key default gen_random_uuid(),
  code              text        not null unique,          -- identificador único (ej: 'fullstack-web')
  name              text        not null,                 -- nombre visible
  description       text        not null default '',      -- descripción de la insignia
  image_url         text        not null,                 -- ruta de la imagen (ej: '/badges/fullstack-web.svg')
  required_courses  text[]      not null default '{}',    -- slugs de cursos requeridos
  required_modules  text[]      not null default '{}',    -- slugs de módulos/lecciones específicas (opcional)
  is_active         boolean     not null default true,    -- visible y otorgable
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists badge_definitions_code_idx
  on public.badge_definitions (code);

create index if not exists badge_definitions_active_idx
  on public.badge_definitions (is_active) where is_active = true;

-- ── Insignias obtenidas por usuarios ─────────────────────────────────────────

create table if not exists public.user_badges (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users (id) on delete cascade,
  badge_code  text        not null references public.badge_definitions (code) on delete cascade,
  earned_at   timestamptz not null default now(),
  unique (user_id, badge_code)
);

create index if not exists user_badges_user_idx
  on public.user_badges (user_id, earned_at desc);

create index if not exists user_badges_badge_idx
  on public.user_badges (badge_code);

-- ── RLS ───────────────────────────────────────────────────────────────────────

alter table public.badge_definitions enable row level security;
alter table public.user_badges enable row level security;

-- Badge definitions: lectura pública (todos pueden ver las insignias disponibles)
create policy "Badge definitions: lectura pública"
  on public.badge_definitions for select
  using (true);

-- Badge definitions: solo admin/academy puede gestionar (is_academy = true)
create policy "Badge definitions: gestionar docentes"
  on public.badge_definitions for insert
  with check (
    coalesce((select p.is_academy from public.profiles p where p.id = auth.uid()), false) = true
  );

create policy "Badge definitions: actualizar docentes"
  on public.badge_definitions for update
  using (
    coalesce((select p.is_academy from public.profiles p where p.id = auth.uid()), false) = true
  );

create policy "Badge definitions: borrar docentes"
  on public.badge_definitions for delete
  using (
    coalesce((select p.is_academy from public.profiles p where p.id = auth.uid()), false) = true
  );

-- User badges: cada usuario ve sus propias insignias
create policy "User badges: leer propias"
  on public.user_badges for select
  using (auth.uid() = user_id);

-- User badges: inserción automática (el usuario no inserta manualmente)
-- Se permite a cualquier usuario autenticado para el proceso automático
create policy "User badges: insertar autenticado"
  on public.user_badges for insert
  with check (auth.uid() = user_id);

-- User badges: borrar propias (por si se necesita revocar)
create policy "User badges: borrar docentes (revoke)"
  on public.user_badges for delete
  using (
    coalesce((select p.is_academy from public.profiles p where p.id = auth.uid()), false) = true
  );

-- ── Función para verificar y otorgar insignias automáticamente ────────────────

create or replace function public.check_and_award_badges()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_badge record;
  v_course_slugs text[];
  v_module_slugs text[];
  v_completed_courses text[];
  v_completed_modules text[];
  v_award boolean;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return;
  end if;

  -- Obtener cursos completados (todos los módulos tienen quiz con correct_best = question_count)
  select array_agg(distinct qp.course_slug)
  into v_completed_courses
  from public.quiz_progress qp
  where qp.user_id = v_user_id
    and qp.correct_best = qp.question_count;

  -- Obtener módulos completados (course_slug/lesson_slug)
  select array_agg(distinct qp.course_slug || '/' || qp.lesson_slug)
  into v_completed_modules
  from public.quiz_progress qp
  where qp.user_id = v_user_id
    and qp.correct_best = qp.question_count;

  -- Verificar cada insignia activa
  for v_badge in
    select code, required_courses, required_modules
    from public.badge_definitions
    where is_active = true
  loop
    -- Si ya tiene la insignia, saltar
    if exists (
      select 1 from public.user_badges
      where user_id = v_user_id and badge_code = v_badge.code
    ) then
      continue;
    end if;

    v_award := true;

    -- Verificar cursos requeridos
    if array_length(v_badge.required_courses, 1) > 0 then
      -- Todos los cursos requeridos deben estar completados
      if not (v_badge.required_courses <@ coalesce(v_completed_courses, '{}')) then
        v_award := false;
      end if;
    end if;

    -- Verificar módulos requeridos (si hay cursos ya verificados)
    if v_award and array_length(v_badge.required_modules, 1) > 0 then
      if not (v_badge.required_modules <@ coalesce(v_completed_modules, '{}')) then
        v_award := false;
      end if;
    end if;

    -- Otorgar insignia si cumple todos los requisitos
    if v_award then
      insert into public.user_badges (user_id, badge_code)
      values (v_user_id, v_badge.code)
      on conflict (user_id, badge_code) do nothing;
    end if;
  end loop;
end;
$$;

grant execute on function public.check_and_award_badges() to authenticated;
