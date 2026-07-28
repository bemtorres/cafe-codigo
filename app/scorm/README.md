# Compilador SCORM · Café y Código

Genera paquetes SCORM listos para subir a Moodle, Canvas o cualquier LMS a partir de las lecciones de cafeycodigo.org.

## ¿Qué hace?

1. Mostrá todos los cursos y lecciones disponibles
2. Seleccioná las que querés incluir en tu paquete SCORM
3. Personalizá branding (institución, logo, colores, alumno)
4. Elegí versión SCORM (1.2 o 2004) y tipo de empaquetado
5. Click **Compilar SCORM** y descargás el ZIP listo para tu LMS

Cada lección se descarga del sitio en modo embed, se extrae el contenido puro, se inlinean los estilos y se empaqueta con el wrapper SCORM. **Todo en el navegador, sin servidor.**

---

## Cómo levantar el proyecto

Este proyecto necesita que el sitio principal (cafeycodigo) esté corriendo para fetchear las lecciones.

### 1. Levantar el servidor principal

Desde la raíz del proyecto cafeycodigo:

```bash
npm run dev
```

Esto arranca Astro en `http://localhost:4321`.

### 2. Levantar el compilador SCORM

Desde `app/scorm/`:

```bash
npm run dev
```

Esto arranca Vite (por defecto en `http://localhost:5173`).

> **Importante:** En la UI del compilador SCORM, la URL base debe apuntar al servidor principal.
> Si el principal corre en `http://localhost:4321`, actualizá el campo **"URL base del sitio"** en el panel de configuración.

### 3. Compilar

En el navegador andá a `http://localhost:5173`, seleccioná lecciones, configurá y click **Compilar SCORM**.

---

## Personalización (branding)

| Campo | Ejemplo |
|---|---|
| Institución | Universidad Nacional |
| Nombre alumno | `{{student_name}}` o Juan Pérez |
| Email alumno | `{{student_email}}` |
| Logo URL | `https://.../logo.png` |
| Fondo página | `#ffffff` o URL de imagen |
| Color barra | `#2b1d1b` |
| Color texto barra | `#fdf6e9` |

## Comunicación con el LMS

`SCORM_API.js` implementa `window.API` (SCORM 1.2):

- `LMSInitialize()` al cargar la página
- `LMSSetValue("cmi.core.lesson_status", "completed")` al salir
- `LMSGetValue("cmi.core.student_name")` para leer el nombre del alumno
- `LMSCommit()` para guardar progreso

## Build de producción

```bash
npm run build     # → dist/
npm run preview   # servidor de prueba
```

Incluye GitHub Actions para deploy automático a GitHub Pages.

## Consideraciones

- Componentes interactivos (Sandpack, Monaco Editor) no funcionan offline dentro del SCORM
- Los estilos se inlinean completos (sin purge). El ZIP pesa ~300-600 KB por lección
- Si deployás el tool en otro dominio, configurá CORS en el sitio principal o usá el mismo dominio
