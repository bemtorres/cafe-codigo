-- ── Evitar recursión infinita en RLS de profiles ─────────────────────────────
-- Las políticas que hacen (select is_super_admin from profiles where id = auth.uid())
-- sobre la misma tabla profiles pueden provocar "infinite recursion detected in policy"
-- y respuestas 500 en PostgREST. Esta función lee el flag con SECURITY DEFINER (sin RLS).
--
-- Ejecutar en Supabase SQL Editor después de 20260501_03 y 20260501_04.

create or replace function public.auth_is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select p.is_super_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

comment on function public.auth_is_super_admin() is
  'Usar en políticas RLS para comprobar super admin sin subconsulta recursiva a profiles.';

grant execute on function public.auth_is_super_admin() to authenticated;

-- ── badge_definitions (03) ─────────────────────────────────────────────────

drop policy if exists "Badge definitions: insertar super admin" on public.badge_definitions;
drop policy if exists "Badge definitions: actualizar super admin" on public.badge_definitions;
drop policy if exists "Badge definitions: borrar super admin" on public.badge_definitions;

create policy "Badge definitions: insertar super admin"
  on public.badge_definitions for insert
  with check (public.auth_is_super_admin() = true);

create policy "Badge definitions: actualizar super admin"
  on public.badge_definitions for update
  using (public.auth_is_super_admin() = true);

create policy "Badge definitions: borrar super admin"
  on public.badge_definitions for delete
  using (public.auth_is_super_admin() = true);

-- ── user_badges (03 + 04) ──────────────────────────────────────────────────

drop policy if exists "User badges: borrar super admin (revoke)" on public.user_badges;

create policy "User badges: borrar super admin (revoke)"
  on public.user_badges for delete
  using (public.auth_is_super_admin() = true);

drop policy if exists "User badges: super admin lee todo" on public.user_badges;

create policy "User badges: super admin lee todo"
  on public.user_badges for select
  to authenticated
  using (public.auth_is_super_admin() = true);

-- ── profiles (04) ─────────────────────────────────────────────────────────

drop policy if exists "Perfiles: super admin lee todos" on public.profiles;
drop policy if exists "Perfiles: super admin actualiza cualquiera" on public.profiles;

create policy "Perfiles: super admin lee todos"
  on public.profiles for select
  to authenticated
  using (public.auth_is_super_admin() = true);

create policy "Perfiles: super admin actualiza cualquiera"
  on public.profiles for update
  to authenticated
  using (public.auth_is_super_admin() = true)
  with check (public.auth_is_super_admin() = true);

-- ── quiz_progress (04) ──────────────────────────────────────────────────────

drop policy if exists "Quiz progreso: super admin lee todo" on public.quiz_progress;

create policy "Quiz progreso: super admin lee todo"
  on public.quiz_progress for select
  to authenticated
  using (public.auth_is_super_admin() = true);
