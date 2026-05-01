-- ── Insignias de ejemplo basadas en los paquetes actuales ─────────────────────
-- Estas insignias se pueden modificar o eliminar según las necesidades.
-- Para producción: ejecutar este archivo en Supabase → SQL Editor.

-- Insignia: Fundamentos de Programación (PSeInt + C++)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'fundamentos-programacion',
  'Fundamentos de Programación',
  'Completaste los cursos introductorios de programación: PSeInt y C++. Dominas la lógica, variables, condicionales, bucles y funciones.',
  '/badges/fundamentos-programacion.svg',
  ARRAY['pseint', 'cpp'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Programación Orientada a Objetos (C++, Java, C#)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'programacion-orientada-objetos',
  'Programación Orientada a Objetos',
  'Completaste los cursos de POO en C++, Java y C#. Dominas clases, objetos, herencia, encapsulamiento y polimorfismo.',
  '/badges/programacion-orientada-objetos.svg',
  ARRAY['cpp', 'java', 'csharp'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Python Developer
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'python-developer',
  'Python Developer',
  'Completaste el curso completo de Python. Dominas sintaxis, estructuras de datos, funciones, POO y módulos.',
  '/badges/python-developer.svg',
  ARRAY['python'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Web Developer (HTML + CSS + JavaScript)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'web-developer',
  'Web Developer',
  'Completaste los cursos de HTML, CSS y JavaScript. Puedes crear sitios web modernos, responsivos e interactivos.',
  '/badges/web-developer.svg',
  ARRAY['html', 'css', 'javascript'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Testing Professional (JUnit + Python Testing)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'testing-professional',
  'Testing Professional',
  'Completaste los cursos de JUnit y Testing con Python. Dominas pruebas unitarias, mocks, fixtures y cobertura.',
  '/badges/testing-professional.svg',
  ARRAY['javaunit', 'python-testing'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Database Expert (Modelamiento + SQL + NoSQL)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'database-expert',
  'Database Expert',
  'Completaste los cursos de bases de datos: modelamiento, consultas SQL y NoSQL. Puedes diseñar y consultar bases de datos relacionales y documentales.',
  '/badges/database-expert.svg',
  ARRAY['modelamiento-db', 'consultas-sql', 'nosql'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Git & Terminal (Control de versiones + Línea de comandos)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'git-terminal',
  'Git & Terminal',
  'Completaste los cursos de Git y Terminal Unix. Dominas el control de versiones y la línea de comandos de Linux.',
  '/badges/git-terminal.svg',
  ARRAY['git', 'terminal'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Ingeniero de Software (Ark + C4 + Patrones)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'ingeniero-software',
  'Ingeniero de Software',
  'Completaste los cursos avanzados de arquitectura y patrones de diseño. Puedes describir arquitecturas y aplicar patrones de diseño.',
  '/badges/ingeniero-software.svg',
  ARRAY['arch', 'c4', 'patrones-diseno'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Excel Master (Básico + Intermedio VBA)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'excel-master',
  'Excel Master',
  'Completaste ambos cursos de Excel. Dominas fórmulas, funciones, tablas dinámicas y automatización con VBA.',
  '/badges/excel-master.svg',
  ARRAY['excel', 'excel-intermedio'],
  '{}'
) on conflict (code) do nothing;

-- Insignia: Linux Administrator (Terminal + Distros)
insert into public.badge_definitions (code, name, description, image_url, required_courses, required_modules)
values (
  'linux-administrator',
  'Linux Administrator',
  'Completaste los cursos de Terminal Unix y Sistemas Linux. Puedes administrar sistemas Linux desde la línea de comandos.',
  '/badges/linux-administrator.svg',
  ARRAY['terminal', 'linux-distros'],
  '{}'
) on conflict (code) do nothing;
