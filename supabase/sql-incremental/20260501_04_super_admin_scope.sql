-- ── Super admin: lectura global y edición de perfiles ────────────────────────
-- Permite al panel /admin/dashboard y /admin/users listar métricas y usuarios.
-- Requiere haber ejecutado 20260501_03 (columna is_super_admin).
-- Si hay 500 / "infinite recursion" en policies: ejecutar 20260501_05_auth_is_super_admin_fn.sql

-- Perfiles: el super admin puede leer todas las filas (además de las políticas existentes).
create policy "Perfiles: super admin lee todos"
  on public.profiles for select
  to authenticated
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

-- Perfiles: el super admin puede actualizar cualquier fila (roles, puntos, etc.).
create policy "Perfiles: super admin actualiza cualquiera"
  on public.profiles for update
  to authenticated
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  )
  with check (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

-- Progreso de quizzes: lectura global para métricas.
create policy "Quiz progreso: super admin lee todo"
  on public.quiz_progress for select
  to authenticated
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );

-- Insignias otorgadas: lectura global para métricas.
create policy "User badges: super admin lee todo"
  on public.user_badges for select
  to authenticated
  using (
    coalesce((select p.is_super_admin from public.profiles p where p.id = auth.uid()), false) = true
  );
