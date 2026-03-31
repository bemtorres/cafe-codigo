-- Código de unión de 8 caracteres [A-Za-z0-9] (mayúsculas/minúsculas distintas).
-- Solo si tu base ya tenía academy_sections con share_token (uuid). Si creaste el esquema desde
-- schema.sql nuevo, no hace falta este archivo.

drop function if exists public.academy_join_section(uuid);

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

drop trigger if exists academy_sections_set_join_code_trigger on public.academy_sections;
create trigger academy_sections_set_join_code_trigger
  before insert on public.academy_sections
  for each row execute function public.academy_sections_set_join_code();

alter table public.academy_sections add column if not exists join_code text;

alter table public.academy_sections drop constraint if exists academy_sections_join_code_format;

update public.academy_sections
set join_code = public.random_academy_join_code()
where join_code is null;

alter table public.academy_sections drop column if exists share_token;

alter table public.academy_sections
  add constraint academy_sections_join_code_format check (join_code is null or join_code ~ '^[A-Za-z0-9]{8}$');

-- Asegurar un solo null permitido por unique: completar y luego NOT NULL
update public.academy_sections
set join_code = public.random_academy_join_code()
where join_code is null;

alter table public.academy_sections alter column join_code set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'academy_sections_join_code_key'
  ) then
    alter table public.academy_sections add constraint academy_sections_join_code_key unique (join_code);
  end if;
end $$;

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
