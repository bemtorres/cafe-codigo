# Panel de Administración estilo shadcn (sidebar + contenido)

Rediseño del área `/admin/*` de **Café y Código**: un shell tipo dashboard con
**barra lateral izquierda oscura** (estilo shadcn `sidebar-01`) y **área de contenido
clara**, unificando las 8 páginas del administrador bajo un solo layout.

## 1. Problema que resolvía

| Página | Layout anterior | Estilo interno |
|---|---|---|
| `/admin/control/` | `AdminLayout` | oscuro (slate-900) dentro de una tarjeta blanca |
| `/admin/embed-ppt/` | `AdminLayout` | oscuro (slate-800) dentro de una tarjeta blanca |
| `/admin/embed/` | `AdminLayout` | claro neobrutalista |
| `/admin/embed-challenges-express/` | `AdminLayout` | claro |
| `/admin/dashboard/`, `/admin/users/`, `/admin/badges/` | `AdminSuperLayout` | heredaba header/footer del sitio público |

- Navegación en barra horizontal de 7 items + scroll en móvil.
- Cada página repetía migas `← Centro de Control / → ir a X`.
- En `global.css` las reglas de `body` son *unlayered* y ganan a las utilidades
  Tailwind sobre `<body>`, así que el fondo crema + textura `fondo2.png` se colaba
  entre los paneles. **El shell nuevo pinta el fondo en un wrapper `<div>`.**

## 2. Decisiones

- **Estilo**: sidebar oscura (`zinc-950`) + contenido claro (`bg-zinc-100`, paneles blancos).
- **Alcance**: las 8 páginas admin migradas.
- **Iconos**: `@lucide/astro` (la antigua `lucide-astro` está deprecada).
- **Lógica intacta**: `SuperAdminGate` y las consultas Supabase no se tocaron; solo clases.

## 3. Shell

Archivo: `src/layouts/AdminShellLayout.astro`

```
┌──────────────┬──────────────────────────────────────────┐
│ ▓ SIDEBAR    │ TOPBAR (h-14, sticky, bg-white/80):      │
│ zinc-950     │  ☰ · Admin › Centro de Control   [acciones]│
│              ├──────────────────────────────────────────┤
│ GENERAL      │                                          │
│  ⚙ Control   │   CONTENIDO                               │
│  📊 Dashboard │   main: p-4 sm:p-6 lg:p-8 bg-zinc-100    │
│ CONTENIDO    │   cada página renderiza sus propios      │
│  📚 Cursos   │   paneles bg-white border-zinc-200       │
│  ⚡ Express   │   rounded-xl shadow-sm                   │
│  📈 PPT      │                                          │
│ COMUNIDAD    │                                          │
│  👥 Usuarios │                                          │
│  🎖 Insignias│                                          │
│ ──────────── │                                          │
│ Sitio ↗      │                                          │
│ Express ↗    │                                          │
└──────────────┴──────────────────────────────────────────┘
```

- Props: `title`, `description?`, `activeSection` (`control | courses | express | ppt |
  dashboard | users | badges`) y slot `actions` para el topbar.
- Item nav: `flex h-8 items-center gap-2 rounded-md px-2 text-sm font-medium`;
  activo `bg-zinc-800 text-white` + `aria-current="page"`; hover `hover:bg-zinc-900`.
- Labels de grupo: `text-[11px] font-semibold uppercase tracking-wider text-zinc-500`.
- Móvil (`<md`): sidebar `translateX(-100%)` + hamburguesa + overlay `bg-black/50`,
  script inline sin framework (Escape / clic en overlay / resize lo cierran).
- Tipografía neutral (system sans) y encabezados `600` dentro de `.admin-shell`.

## 4. Cambios por archivo

| Archivo | Cambio |
|---|---|
| `src/layouts/AdminShellLayout.astro` | nuevo shell |
| `src/layouts/AdminLayout.astro` | eliminado |
| `src/layouts/AdminSuperLayout.astro` | eliminado |
| `src/pages/admin/control.astro` | rediseño shadcn: stat cards, buscador, grid de módulos con iconos lucide |
| `src/pages/admin/embed.astro` | shell nuevo, sin migas, formulario/tipografía shadcn |
| `src/pages/admin/embed-challenges-express.astro` | shell nuevo, sin migas |
| `src/pages/admin/embed-ppt.astro` | shell nuevo + conversión completa a tema claro (inputs, tablas, tarjetas de estilo, JS de resaltado) |
| `src/pages/admin/dashboard.astro` | `AdminSuperLayout` → `AdminShellLayout` |
| `src/pages/admin/users.astro` | `AdminSuperLayout` → `AdminShellLayout` |
| `src/pages/admin/badges.astro` | `AdminSuperLayout` → `AdminShellLayout` |
| `src/pages/admin/index.astro` | shell nuevo, redirect intacto |
| `AdminDashboard.tsx` / `AdminUsersManager.tsx` / `AdminBadgesManager.tsx` / `SuperAdminGate.tsx` | solo clases: `border-[3px] border-border` → `border border-zinc-200`, `shadow-neo` → `shadow-sm`, `rounded-3xl` → `rounded-xl`, `bg-[#fde68a]` → `bg-zinc-900 text-white`, colores de texto → escala zinc |

Se mantienen **oscuros a propósito**: el preview `bg-black` y los campos de salida
URL/iframe de `embed-ppt` (bloques de código).

## 5. Verificación

```bash
npm run check   # astro check (tipos + plantillas)
npm run build   # build de producción
npm run dev     # revisar las 8 rutas + drawer móvil (<md)
```
