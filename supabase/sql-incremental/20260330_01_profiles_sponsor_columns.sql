-- Colaboradores / donantes: insignia, muro público y zona exclusiva.
-- Tras correr esto, marcar donantes manualmente en Supabase (SQL Editor), ej.:
--   update public.profiles set is_sponsor = true, sponsor_since = now() where id = 'uuid-del-usuario';

alter table public.profiles
  add column if not exists is_sponsor boolean not null default false;

alter table public.profiles
  add column if not exists sponsor_since timestamptz;

drop policy if exists "Colaboradores visibles en muro público" on public.profiles;

create policy "Colaboradores visibles en muro público"
  on public.profiles for select
  to anon, authenticated
  using (is_sponsor = true);
