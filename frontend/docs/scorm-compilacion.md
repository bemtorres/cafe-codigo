# Compilación SCORM — Análisis técnico

## 1. ¿Qué es SCORM?

SCORM (Sharable Content Object Reference Model) es un estándar de empaquetado para contenido e-learning. Un paquete SCORM es un **ZIP** que contiene:

```
paquete-scorm.zip
├── imsmanifest.xml          # Manifiesto: metadatos, recursos y organización
├── index.html               # Contenido educativo principal (SCO)
├── leccion-2.html           # (opcional) más páginas
├── assets/
│   └── style.css            # Estilos inline o externos
├── SCORM_API.js             # Wrapper de comunicación con el LMS
└── ...
```

El `imsmanifest.xml` define qué archivos incluir, metadatos del curso, y la organización de las lecciones. El `SCORM_API.js` se comunica con el LMS llamando a `window.parent.API.*` (o `API_1484_11.*`).

## 2. Relación con el sistema embed existente

El proyecto ya tiene un **sistema embed** maduro (`?embed=true`, `/admin/embed`) que:

| Aspecto | Embed actual | SCORM necesario |
|---|---|---|
| Contenido | Vive en el sitio, vía URL/iframe | Debe empaquetarse en ZIP autónomo |
| Navegación | Oculta header, sidebar, footer con CSS (`embed-hide`) | Misma lógica, pero el HTML debe ser autónomo |
| Personalización | Parámetros GET / JWT (`?title=`, `?logo=`, etc.) | `imsmanifest.xml` + metadatos fijos |
| Comunicación LMS | No hay | Debe incluir `SCORM_API.js` + calls `LMSInitialize()`, `LMSSetValue()`, etc. |
| Assets | CDN (Google Fonts, imágenes del sitio) | Deben inlinearse o embeberse en base64 |

**Conclusión:** El embed actual es el *punto de partida ideal* para SCORM. El HTML que genera embed (`?embed=true`) es casi idéntico al que necesita un SCO.

## 3. Enfoque seleccionado: Full offline SCORM (D)

El usuario eligió el enfoque **D: Full offline completo** — un SCORM 100% estándar que:
- Funciona sin conexión a internet
- Incluye todos los assets inlineados (CSS, JS, imágenes en base64)
- Tiene comunicación bidireccional con el LMS vía SCORM API
- Reporta progreso (`completed`, `incomplete`), puntuación y tiempo

## 4. Arquitectura técnica

```
┌──────────────────────────────────────────────────────────┐
│                    ADMIN /admin/scorm                      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Catálogo de cursos y lecciones                      │ │
│  │  ☐ Python                                            │ │
│  │    ☑ 1. Introducción                                 │ │
│  │    ☑ 2. Variables                                    │ │
│  │    ☐ 3. Texto y tipos                                │ │
│  │  ☐ JavaScript                                        │ │
│  │    ☐ 1. Introducción                                 │ │
│  │  ...                                                  │ │
│  │                                                       │ │
│  │  [Compilar SCORM seleccionados] [Compilar todo el curso] │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│              GENERADOR SCORM (cliente-side + server)       │
│                                                           │
│   1. Fetch HTML de cada lección en modo embed             │
│      → fetch('/course/python/variables/?embed=true')      │
│                                                           │
│   2. Extraer sólo el contenido (<main>) del HTML          │
│                                                           │
│   3. Inlinear CSS: global.css + course-specific styles     │
│      → Extraer de <style> bloques y convertirlos a        │
│        <style> inline en el SCO                           │
│                                                           │
│   4. Inlinear JS crítico (embed bootstrap, SCORM API)     │
│                                                           │
│   5. Convertir imágenes a base64                          │
│      (logo, fondos, etc.)                                 │
│                                                           │
│   6. Generar imsmanifest.xml con los recursos seleccionados│
│                                                           │
│   7. Agregar SCORM_API.js wrapper                         │
│                                                           │
│   8. Empaquetar todo en ZIP con JSZip                     │
└──────────────────────────────────────────────────────────┘
```

## 5. Estructura del SCORM generado

Para **una lección individual** (SCO único):

```
python-variables-scorm.zip
├── imsmanifest.xml
├── index.html                    # Contenido de la lección (modo embed)
├── scorm-api/
│   └── SCORM_API.js             # Wrapper SCORM 1.2
└── assets/
    └── (imágenes inlineadas en base64 dentro del HTML)
```

Para **un curso completo** (múltiples SCOs):

```
python-scorm.zip
├── imsmanifest.xml               # Con organization con multiple items
├── scorm-api/
│   └── SCORM_API.js
├── 01-introduccion/
│   └── index.html
├── 02-variables/
│   └── index.html
├── 03-texto-y-tipos/
│   └── index.html
└── ...
```

## 6. El archivo `imsmanifest.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="cafeycodigo-python-variables"
          version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2
                              imscp_rootv1p1p2.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2
                              adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="cafeycodigo-org">
    <organization identifier="cafeycodigo-org"
                  structure="hierarchical">
      <title>Python - Variables</title>
      <item identifier="item-1" identifierref="resource-1">
        <title>Variables en Python</title>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="resource-1"
              type="webcontent"
              adlcp:scormtype="sco"
              href="index.html">
      <file href="index.html"/>
      <file href="scorm-api/SCORM_API.js"/>
    </resource>
  </resources>
</manifest>
```

## 7. El wrapper SCORM_API.js

```javascript
// SCORM 1.2 API Wrapper
var SCORM = {
  initialized: false,
  terminated: false,
  data: {
    "cmi.core.student_name": "",
    "cmi.core.lesson_status": "not attempted",
    "cmi.core.score.raw": "",
    "cmi.core.score.max": "",
    "cmi.core.score.min": "",
    "cmi.core.lesson_location": "",
    "cmi.core.exit": "",
    "cmi.suspend_data": ""
  },

  LMSInitialize: function() {
    this.initialized = true;
    return "true";
  },

  LMSFinish: function() {
    this.terminated = true;
    return "true";
  },

  LMSGetValue: function(name) {
    return this.data[name] || "";
  },

  LMSSetValue: function(name, value) {
    this.data[name] = value;
    return "true";
  },

  LMSCommit: function() {
    return "true";
  },

  LMSGetLastError: function() { return 0; },
  LMSGetErrorString: function() { return "No error"; },
  LMSGetDiagnostic: function() { return "No diagnostic"; }
};

// Exponer al LMS
window.API = SCORM;
```

En cada SCO (HTML de la lección), se debe llamar:

```html
<script src="scorm-api/SCORM_API.js"></script>
<script>
  window.onload = function() {
    API.LMSInitialize();
    API.LMSSetValue("cmi.core.lesson_status", "incomplete");
    API.LMSSetValue("cmi.core.student_name", "Estudiante");
  };

  window.onbeforeunload = function() {
    API.LMSSetValue("cmi.core.lesson_status", "completed");
    API.LMSCommit();
    // API.LMSFinish(); // el LMS llama a Finish después
  };
</script>
```

## 8. Implementación en el proyecto

### 8.1 Archivos del SCORM API Wrapper

| Archivo | Propósito |
|---|---|
| `public/scorm-api/SCORM_API.js` | Wrapper SCORM 1.2 (se incluye en cada paquete) |
| `public/scorm-api/SCORM_API_2004.js` | (opcional) Wrapper SCORM 2004 |

### 8.2 Utilidad de generación (build-time)

| Archivo | Propósito |
|---|---|
| `scripts/generate-scorm.mjs` | Script Node que corre durante `astro build` |
| | Lee `courses.ts` y genera ZIPs por lección y por curso |
| | Salida: `dist/scorm/` |

### 8.3 Página admin

| Archivo | Propósito |
|---|---|
| `src/pages/admin/scorm.astro` | Página admin que lista cursos/lecciones con checkboxes |
| | Botón "Compilar SCORM" que descarga ZIP |
| `src/components/admin/AdminScormManager.tsx` | Componente React con la lógica de selección y compilación |
| `src/lib/scorm/buildScormZip.ts` | Lógica cliente-side: fetch de HTML, inlineado, JSZip |
| `src/lib/scorm/generateManifest.ts` | Genera `imsmanifest.xml` como string |
| `src/lib/scorm/inlineAssets.ts` | Inlinea CSS, JS e imágenes del HTML fetch |

### 8.4 Modificaciones a archivos existentes

| Archivo | Cambio |
|---|---|
| `src/layouts/AdminSuperLayout.astro` | Agregar nav item "SCORM" → `/admin/scorm` |
| `src/lib/courseRegistry.ts` | (opcional) Exportar tipos reusables |
| `package.json` | Agregar `"jszip": "^3.10.1"` y `"file-saver": "^2.0.5"` |
| | Agregar script `"build:scorm": "node scripts/generate-scorm.mjs"` |

## 9. Proceso de inlineado de assets

El mayor desafío del enfoque D. El HTML de una lección en modo embed referencia:

### 9.1 Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:..." rel="stylesheet">
```
**Solución:** Incluir fonts como `@font-face` con data URIs (archivos woff2 convertidos a base64). O, más práctico, incluir solo las variantes usadas (Nunito 800/900, Quicksand 500/700, JetBrains Mono 500/700/800).

### 9.2 Tailwind CSS (global.css)
El CSS generado por Tailwind es el más pesado. La solución es:
- **Build-time:** Usar el CSS ya compilado de `dist/` (Astro ya generó el output final)
- **Runtime:** Fetch del CSS compilado (ej. `/dist/assets/...`) y lo inlinear

En la práctica, para un SCO SCORM no necesitamos **todo** Tailwind — solo los estilos que realmente usa la página. Pero determinar el subset exacto es complejo. Opciones:

| Opción | Pros | Contras |
|---|---|---|
| A) Incluir todo global.css inline | Simple, funciona siempre | ZIP más pesado (~200-400 KB) |
| B) PurgeCSS subset | ZIP liviano | Complejidad extra |
| C) Solo estilos críticos + load diferido | Balance | Puede fallar offline |

**Recomendación inicial:** Opción A (inline completo) y optimizar después si es necesario.

### 9.3 Imágenes (fondos, logos, etc.)

El fondo `fondo2.png`, logos, etc. se convierten a base64:
```css
body {
  background-image: url('data:image/png;base64,iVBORw0...');
}
```

### 9.4 Scripts inline

Los scripts de `LayoutEmbedPdfHead.astro` (bootstrap embed, poblar barra, etc.) ya están `is:inline` — se incluyen tal cual.

## 10. Pipeline de compilación cliente-side

```
Usuario en /admin/scorm:
  1. Selecciona lecciones (checkboxes)
  2. Configura opciones (nombre institución, colores, etc.)
  3. Click "Compilar SCORM"
     │
     ▼
  4. fetch(cada lección con ?embed=true)
     │
     ▼
  5. Extraer <main> del HTML (el contenido puro)
     │
     ▼
  6. Inlinear CSS y JS
     │
     ▼
  7. Generar imsmanifest.xml
     │
     ▼
  8. Generar ZIP con JSZip
     │
     ▼
  9. Descargar: nombre-del-curso-scorm.zip
```

## 11. Plan de implementación por fases

### Fase 1: Infraestructura base
- [ ] Agregar `jszip` y `file-saver` a `package.json`
- [ ] Crear `public/scorm-api/SCORM_API.js` (wrapper SCORM 1.2)
- [ ] Crear `src/lib/scorm/generateManifest.ts` (generador de XML)
- [ ] Crear `src/lib/scorm/inlineAssets.ts` (utilidad de inlineado)
- [ ] Agregar ruta en `AdminSuperLayout.astro` para `/admin/scorm`

### Fase 2: Admin UI
- [ ] Crear `src/pages/admin/scorm.astro` (página admin)
- [ ] Crear `src/components/admin/AdminScormManager.tsx` (componente React)
- [ ] Implementar selección de lecciones por curso
- [ ] Implementar opciones de compilación (nombre, branding, etc.)

### Fase 3: Compilador SCORM
- [ ] Crear `src/lib/scorm/buildScormZip.ts` (orquestador)
- [ ] Implementar fetch de lecciones en modo embed
- [ ] Implementar extracción de `<main>`
- [ ] Implementar inlineado de CSS y JS
- [ ] Implementar conversión de imágenes a base64
- [ ] Implementar generación de ZIP con JSZip
- [ ] Implementar descarga

### Fase 4: Build-time pre-generación (opcional)
- [ ] Crear `scripts/generate-scorm.mjs`
- [ ] Hook en `package.json` para correrlo tras `astro build`
- [ ] Generar ZIPs de todas las lecciones

### Fase 5: Tracking y reporting LMS
- [ ] Agregar calls `LMSInitialize()` / `LMSSetValue()` en cada SCO
- [ ] Reportar progreso por lección (`completed` / `incomplete`)
- [ ] Reportar tiempo de estudio
- [ ] (opcional) Reportar puntuación de quizzes

## 12. Consideraciones técnicas

### 12.1 Elementos interactivos
Componentes que **NO funcionarán offline** en el SCO:
- **Sandpack Editor** (`@codesandbox/sandpack-react`) — requiere CDN
- **Monaco Editor** — requiere CDN
- **Supabase/Auth** — requiere backend

**Solución:** Detectar modo SCORM y mostrar esos componentes como texto/placeholder, o mantenerlos con la advertencia "Requiere conexión a internet".

### 12.2 Quizzes
Los quizzes del proyecto son modales Astro/React (`PythonQuizModal.astro`). En un SCO SCORM hay dos opciones:
1. **Convertirlos a HTML/CSS/JS estático** dentro del SCO (sin React)
2. **Omitirlos** en la compilación SCORM (quiz=false)

### 12.3 Tamaño del ZIP
Estimación para un SCO individual con assets inlineados:
- HTML (~5-15 KB)
- CSS inline (~200-400 KB Tailwind)
- JS inline (~5-10 KB)
- Imágenes base64 (~50-200 KB, depende del curso)
- SCORM_API.js (~3 KB)
- imsmanifest.xml (~2 KB)

**Total estimado: ~300-600 KB por lección**

### 12.4 SCORM Versiones
| Versión | Estándar | Compatibilidad |
|---|---|---|
| SCORM 1.2 | `window.API` | Moodle, Canvas, Blackboard, Google Classroom |
| SCORM 2004 | `window.API_1484_11` | Moodle 3+, Canvas |

**Recomendación:** Empezar con SCORM 1.2 (el más compatible).

## 13. Dependencias nuevas

```json
{
  "dependencies": {
    "jszip": "^3.10.1",
    "file-saver": "^2.0.5"
  },
  "devDependencies": {
    "@types/file-saver": "^2.0.7"
  }
}
```

## 14. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Tailwind CSS genera +400 KB inline | ZIP grande | Usar PurgeCSS o cargar CSS externo con fallback offline |
| Imágenes en base64 muy pesadas | ZIP lento de generar | Cachear conversiones; comprimir imágenes antes |
| Componentes React no funcionan offline | Funcionalidad limitada | Mostrar placeholder "requiere internet" |
| LMS bloquea iframes a dominios externos | No aplica (enfoque D es full offline) | No hay iframes |
| Cambios frecuentes en lecciones | SCORM desactualizado | Regenerar en cada build |

## 15. Verificación y testing

1. **Unit tests:** Generar manifest, inlinear CSS, armar ZIP
2. **LMS test:** Subir ZIP a Moodle / SCORM Cloud y verificar:
   - Lanzamiento del SCO
   - Comunicación API (initialized, completed)
   - Navegación entre SCOs (curso completo)
3. **Build test:** `npm run build && npm run build:scorm` produce ZIPs correctos

## 16. Próximos pasos

Si decidís desarrollar:
1. `npm install jszip file-saver`
2. Crear `public/scorm-api/SCORM_API.js`
3. Crear `src/lib/scorm/generateManifest.ts`
4. Crear admin page scaffolding
5. Implementar el compilador por fases

## 17. Referencias

- [SCORM 1.2 Spec (ADL)](https://www.adlnet.gov/archives/389)
- [SCORM.com - Best Practices](https://scorm.com/scorm-explained/)
- [Moodle SCORM FAQ](https://docs.moodle.org/en/SCORM_FAQ)
- JSZip: https://stuk.github.io/jszip/
- FileSaver: https://github.com/eligrey/FileSaver.js/
