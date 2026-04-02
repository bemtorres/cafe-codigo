-- ── Historial de cafés consumidos ────────────────────────────────────────────
-- Registra cada vez que un usuario termina una taza en /cafe-del-dia/.
-- Para producción: ejecutar este archivo en Supabase → SQL Editor.

create table if not exists public.coffee_history (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references auth.users (id) on delete cascade,
  coffee_id    text        not null,             -- 'espresso', 'cappuccino', etc.
  milk_id      text,                             -- null si el café no lleva leche
  temp_mode    text        not null default 'hot', -- 'hot' | 'iced'
  prepared_at  timestamptz not null,             -- cuándo se preparó la taza
  finished_at  timestamptz not null default now() -- cuándo se terminó (Terminar taza)
);

-- ── Índice para listar historial del usuario por fecha descendente ────────────
create index if not exists coffee_history_user_finished
  on public.coffee_history (user_id, finished_at desc);

-- ── RLS ───────────────────────────────────────────────────────────────────────
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
