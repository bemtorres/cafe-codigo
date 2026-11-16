# Parámetros GET de la URL (query string)

Referencia de los **parámetros de consulta** (`?clave=valor&…`) que el sitio lee para cambiar el comportamiento de una página. La implementación principal está en `src/layouts/Layout.astro` (scripts inline en `<head>`) y en páginas puntuales.

---

## Lecciones y cursos (`Layout`)

Estos parámetros aplican a rutas que usan el layout de cursos (por ejemplo `/course/python/introduccion/`). Se evalúan en el cliente al cargar la página.

| Parámetro | Valor esperado | Efecto |
|-----------|----------------|--------|
| `embed` | `true` | Activa **modo incrustado**: se ocultan elementos con clase `embed-hide` (navbar, banner, botón compartir, etc.), se muestra la barra superior oscura `#embedBar` y se ajusta el padding del contenido. Sin este valor, la página se ve con la UI completa. |
| `quiz` | `false` | Oculta los bloques de quiz cuyo contenedor tiene una clase que **termina en** `-quiz` (p. ej. `python-quiz`, `unity-quiz`). Si el parámetro no está o tiene otro valor, el quiz se muestra con normalidad. |
| `pdf` | `true` | Activa **modo impresión / PDF**: fondo blanco, ancho de contenido acotado, se ocultan elementos `pdf-hide`, y aparece la barra mínima de impresión o el botón **Imprimir** en la barra del embed (si `embed=true` también). En modo PDF, los quizzes **vuelven a mostrarse** aunque la URL lleve `quiz=false` (útil si el iframe venía sin quiz y luego se abre la misma ruta con `pdf=true`). |
| `title` | texto (URL-encoded) | Solo con `embed=true`: se muestra en la barra embed como **nombre de institución** (junto al ícono 🏫). En el modal «Compartir» se genera como `title=…`. |
| `name` | texto | Solo con `embed=true`: **nombre del estudiante** en la tarjeta de la barra embed. |
| `email` | texto | Solo con `embed=true`: **correo del estudiante** bajo el nombre en la barra embed (y `title` en el contenedor para tooltip). |
| `logo` | url | Solo con `logo=`: **logo de la institución** en la barra embed. |
| `background` | url o color CSS (`#hex`, `rgb()`, etc.) | Solo con `background=`: **background de la institución** en la barra embed. |
| `color` | color CSS (`#hex`, `rgb()`, etc.) | Solo con `color=`: cambia **solo el color de la cabecera embed** (`#embedBar`). No modifica el fondo del sitio. |

### Combinaciones habituales

```text
# Incrustar una lección sin chrome del sitio
/course/python/introduccion/?embed=true

# Igual, sin quiz (LMS que no quiere el test en el iframe)
/course/python/introduccion/?embed=true&quiz=false

# Embed con datos del alumno e institución (personalizar NOMBRE, CORREO, INSTITUCIÓN)
/course/python/introduccion/?embed=true&title=INSTITUCI%C3%93N&name=NOMBRE&email=CORREO

# Modo pantalla para imprimir o guardar PDF (puede combinarse con embed)
/course/python/introduccion/?pdf=true
/course/python/introduccion/?embed=true&pdf=true
```

**Codificación:** Usa `encodeURIComponent` para `title`, `name` y `email` si pueden llevar espacios, tildes o símbolos.

**Orden:** El orden de los parámetros no importa.

---

## Academia — unirse con código

| Parámetro | Uso | Dónde |
|-----------|-----|--------|
| `code` | Código de invitación a una academia | `src/components/academy/AcademyJoinClient.tsx` — ruta típica `/academia/unirse?code=…` (el enlace se arma en `src/lib/supabase/academy.ts`). |

---

## Parámetros que *no* son GET

- **Tema claro/oscuro del código:** se guarda en `localStorage` (`theme`), no en la URL.
- **Redirecciones de rutas antiguas:** el middleware (`src/middleware.ts`) solo reescribe el **path** (`/python/…` → `/course/python/…`); no define query params propios.

---

## Mantenimiento

Si añades un parámetro nuevo:

1. Documentarlo aquí y, si afecta al embed, actualizar la lista del modal en `src/components/ShareEmbedButton.tsx`.
2. Si debe aplicarse antes del primer paint, seguir el patrón del script temprano en `Layout.astro` (`URLSearchParams` sobre `window.location.search`).
