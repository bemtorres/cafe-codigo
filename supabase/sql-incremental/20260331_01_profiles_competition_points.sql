-- Puntos para niveles cafeteros (Americano → Ristretto). Nivel derivado en la app (src/lib/userLevels.ts).

alter table public.profiles
  add column if not exists competition_points int not null default 0 check (competition_points >= 0);

comment on column public.profiles.competition_points is 'Puntos por concursos/desafíos; desbloquea nivel cafetero en UI.';
