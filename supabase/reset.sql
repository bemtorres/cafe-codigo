-- Reset: borra tablas públicas y funciones del proyecto (no borra auth.users).
-- Usado por npm run db:fresh antes de aplicar schema.sql.

drop trigger if exists on_auth_user_created on auth.users;

drop function if exists public.handle_new_user() cascade;

drop function if exists public.academy_join_section(uuid) cascade;
drop function if exists public.academy_join_section(text) cascade;
drop trigger if exists academy_sections_set_join_code_trigger on public.academy_sections;
drop function if exists public.random_academy_join_code() cascade;
drop function if exists public.academy_sections_set_join_code() cascade;
drop function if exists public.academy_section_share_enabled(uuid) cascade;
drop function if exists public.academy_user_is_teacher_of_section(uuid) cascade;
drop function if exists public.academy_user_is_student_of_section(uuid) cascade;

drop table if exists public.academy_enrollments cascade;
drop table if exists public.academy_section_courses cascade;
drop table if exists public.academy_sections cascade;
drop table if exists public.quiz_progress cascade;
drop table if exists public.lesson_bookmarks cascade;
drop table if exists public.coffee_history cascade;
drop table if exists public.schema_migrations cascade;
drop table if exists public.profiles cascade;
