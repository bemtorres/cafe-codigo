-- ── Super admin + RLS de insignias ─────────────────────────────────────────
-- Solo usuarios con profiles.is_super_admin = true pueden crear/editar/borrar
-- definiciones de insignias y revocar user_badges.
--
-- Primer super admin (ejecutar una vez en SQL Editor, sustituir el UUID):
--   update public.profiles set is_super_admin = true where id = 'UUID-DEL-USUARIO';

alter table public.profiles
  add column if not exists is_super_admin boolean not null default false;

comment on column public.profiles.is_super_admin is
  'Control total de insignias (badge_definitions) y revocación de user_badges; solo asignar desde SQL o servicio confiable.';

-- ── Reemplazar políticas de badge_definitions (antes: is_academy) ────────────

drop policy if exists "Badge definitions: gestionar docentes" on public.badge_definitions;
drop policy if exists "Badge definitions: actualizar docentes" on public.badge_definitions;
drop policy if exists "Badge definitions: borrar docentes" on public.badge_definitions;

create policy "Badge definitions: insertar super admin"
  on public.badge_definitions for insert
  with check (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

create policy "Badge definitions: actualizar super admin"
  on public.badge_definitions for update
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

create policy "Badge definitions: borrar super admin"
  on public.badge_definitions for delete
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

-- ── Revocar insignias: solo super admin ────────────────────────────────────

drop policy if exists "User badges: borrar docentes (revoke)" on public.user_badges;

create policy "User badges: borrar super admin (revoke)"
  on public.user_badges for delete
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

-- Panel /admin (usuarios, métricas): ejecutar también 20260501_04_super_admin_scope.sql
-- Si PostgREST devuelve 500 al leer profiles: ejecutar 20260501_05_auth_is_super_admin_fn.sql
