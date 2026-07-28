# 📊 Sistema de Presentaciones & Embeds — cafeycodigo.org

Este módulo permite visualizar e incrustar cualquier lección en modo **Presentación Interactiva en Diapositivas** estilo PowerPoint / Keynote con **Evaluación Interactiva**, **Reflexión de Metacognición** y **Personalización de Banner y Títulos**.

---

## 🚀 Ruta Principal de Presentaciones

Cada lección tiene su correspondiente versión en diapositivas accesibles desde la siguiente estructura de URL:

```text
/course-slides/[curso]/[leccion]/
```

**Ejemplo activo:**
```text
https://cafeycodigo.org/course-slides/python/texto-y-conversiones/
```

---

## 🎨 Personalización Estricta de Colores (`bgcolor`, `text`, `color`)

Para preservar una neutralidad limpia e impecable en los modos **Oscuro** y **Claro**, los parámetros de color funcionan con las siguientes reglas exactas:

| Parámetro | Alias | Efecto Exacto |
| :--- | :--- | :--- |
| **`bgcolor`** | `background` / `b` | Cambia **exclusivamente el color del Banner / Barra Superior Header** (permite branding institucional sin alterar la neutralidad del lienzo). |
| **`text`** | `textcolor` / `x` | Cambia **exclusivamente el color de los Títulos Principales (`<h1>` ... `<h6>`)** en la banner bar y en las diapositivas. |
| **`color`** | `accent` / `c` | Cambia el color de **Botones de Acento, Insignias, Progreso y Destacados**. |
| **`theme`** | - | Alterna la neutralidad del lienzo entre `dark` (fondo oscuro `#0f172a`) e `light` (fondo neutro `#f8fafc`). |

---

## 💻 Ejemplos Listos para Usar con Colores (iFrame y URL)

### 1. 🌌 Banner Neón Cyberpunk + Títulos Amarillos
**URL:**
```text
https://cafeycodigo.org/course-slides/python/texto-y-conversiones/?embed=true&bgcolor=1e1b4b&text=ffea00&color=ef476f&icon=⚡&quiz=true
```

**iFrame Embed:**
```html
<iframe
  src="https://cafeycodigo.org/course-slides/python/texto-y-conversiones/?embed=true&bgcolor=1e1b4b&text=ffea00&color=ef476f&icon=⚡&quiz=true"
  width="100%"
  height="650px"
  style="border:none; border-radius:16px; overflow:hidden;"
  allow="clipboard-write"
  title="Presentación Neón Cyberpunk"
></iframe>
```

---

### 2. 🏫 Banner Institucional INACAP + Títulos Azules
**URL:**
```text
https://cafeycodigo.org/course-slides/python/texto-y-conversiones/?embed=true&bgcolor=0f172a&text=38bdf8&color=10b981&title=INACAP&name=Juan+P%C3%A9rez&email=juan@inacap.cl&quiz=true
```

**iFrame Embed:**
```html
<iframe
  src="https://cafeycodigo.org/course-slides/python/texto-y-conversiones/?embed=true&bgcolor=0f172a&text=38bdf8&color=10b981&title=INACAP&name=Juan+P%C3%A9rez&email=juan@inacap.cl&quiz=true"
  width="100%"
  height="650px"
  style="border:none; border-radius:16px; overflow:hidden;"
  allow="clipboard-write"
  title="Presentación Institucional INACAP"
></iframe>
```

---

### 3. ☀️ Banner Claro + Títulos Índigo (Light Mode)
**URL:**
```text
https://cafeycodigo.org/course-slides/python/texto-y-conversiones/?embed=true&theme=light&bgcolor=ffffff&text=4338ca&color=6366f1&quiz=true
```

**iFrame Embed:**
```html
<iframe
  src="https://cafeycodigo.org/course-slides/python/texto-y-conversiones/?embed=true&theme=light&bgcolor=ffffff&text=4338ca&color=6366f1&quiz=true"
  width="100%"
  height="650px"
  style="border:none; border-radius:16px; overflow:hidden;"
  allow="clipboard-write"
  title="Presentación Tema Claro"
></iframe>
```

---

## 🎮 Nombres Estándar de Interacciones en Inglés (`InteractionType`)

El sistema incluye **7 tipos de dinámicas evaluativas**:

| Nombre en Inglés | Descripción | Mecánica de Juego |
| :--- | :--- | :--- |
| `TrueFalse` | Verdadero o Falso (Sí / No) | 2 Botones gigantes con retroalimentación instantánea de validez de una afirmación. |
| `MultipleChoice` | Selección Múltiple | Alternativas de respuesta con explicaciones paso a paso. |
| `ReorderSequence` | Ordenar Secuencia de Código | Fichas de código desordenadas que el usuario toca para armar la instrucción lógica. |
| `MatchPairs` | Unir Lista A ↔ Lista B | Conexión en tiempo real entre métodos y sus definiciones correspondientes. |
| `FillInTheBlank` | Completar Espacio en Blanco | Identificar y seleccionar la función/palabra reservada que falta en el código. |
| `PredictOutput` | Predecir Salida de Código | Predecir la impresión exacta por consola (`print`) de un programa en ejecución. |
| `FindTheBug` | Identificar la Causa del Error | Encontrar el error sintáctico o de tipos (`TypeError`) en un fragmento de código. |

---

## 🧠 Módulo de Metacognición en 1 Sola Diapositiva (`metacognition_overview`)

Las 8 preguntas de Metacognición se concentran en **una única diapositiva interactiva desplegable** dividida en 2 secciones:

### 🌐 4 Preguntas Genéricas a Todos los Cursos (1 a 4):
1. **Estrategia de Aprendizaje**: *¿Qué estrategia personal utilizaste durante esta lección para mantener tu concentración?*
2. **Gestión de Dificultades**: *¿En qué momento de la lección sentiste mayor nivel de duda y qué paso diste para resolverlo?*
3. **Conexión de Aprendizajes**: *¿Cómo se conecta lo que aprendiste hoy con alguna experiencia previa que ya tenías?*
4. **Hábito y Retención**: *¿Qué acción o hábito inmediato realizarás hoy para asegurar que no olvides este aprendizaje?*

### 🐍 4 Preguntas Específicas del Módulo (5 a 8):
5. **Entrada de Datos `input()`**: *¿Cómo cambia tu perspectiva al recordar que input() siempre devuelve un str y requiere conversión?*
6. **Limpieza `.strip().lower()`**: *¿En qué escenarios reales de desarrollo consideras crítico aplicar métodos de limpieza de texto?*
7. **Rebanadas e Índices `[:3]`**: *¿Por qué la notación de slicing `[:3]` o los índices negativos `[-1]` facilitan la manipulación de texto?*
8. **Proyectos Reales**: *¿Qué script o proyecto personal te gustaría construir aplicando `str`, `int`, `bool` y slicing?*

> 💡 **Mecánica Hover Popup**: Al pasar el cursor sobre cualquiera de las 8 preguntas, aparece un popup modal flotante con la **Pauta de Reflexión** y el **Valor Metacognitivo**.

---

## 🎛️ Tabla Completa de Parámetros de Personalización (Embed Params)

| Parámetro | Alias | Valores | Descripción |
| :--- | :--- | :--- | :--- |
| `embed` | `e` | `true` \| `1` | Oculta el botón superior de *"Volver a la lección"* para integraciones en `<iframe>` o LMS. |
| `title` | `institution` / `t` | *Texto* (ej. `INACAP`) | Muestra el distintivo con el nombre de la institución en el encabezado. |
| `name` | `n` | *Texto* (ej. `Juan Pérez`) | Muestra el distintivo con el nombre del estudiante en el encabezado. |
| `email` | `m` | *Correo* (ej. `juan@e.com`) | Muestra el correo del estudiante en el perfil de la barra superior. |
| `logo` | `l` | *URL de imagen* | Muestra un logo personalizado de la institución/plataforma en la esquina del encabezado. |
| `icon` | `emoji` | *Emoji/Ícono* (ej. `🚀` \| `🐍`) | Reemplaza o antepone un ícono/emoji personalizado en las insignias. |
| `color` | `accent` / `c` | *Color Hex* (ej. `EF476F`) | Cambia el color primario de acento (botones, barra de progreso). |
| `text` | `textcolor` / `x` | *Color Hex* (ej. `FFEA00`) | Cambia únicamente el color de texto de los títulos principales (`<h1>` ... `<h6>`). |
| `bgcolor` | `background` / `b` | *Color Hex* (ej. `1e1b4b`) | Cambia únicamente el color de fondo del Banner / Encabezado superior. |
| `theme` | - | `dark` \| `light` | Fuerza la neutralidad de la diapositiva entre tema oscuro (`dark`) o claro (`light`). |
| `pdf` | `p` | `true` \| `1` | Muestra el botón `📄 PDF` para imprimir o exportar la presentación. |
| `quiz` | `q` | `true` \| `1` | Activa las diapositivas evaluativas del quiz al final de la lección. |
| `bar` | - | `false` \| `0` \| `autohide` \| `true` | Configura la barra inferior de navegación. |

---

## 🛠️ Archivos Clave del Proyecto

- **Visor React**: [CourseSlideViewer.tsx](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/components/slides/CourseSlideViewer.tsx)
- **Ruta Astro**: [[lesson].astro](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/pages/course-slides/%5Bcourse%5D/%5Blesson%5D.astro)
- **Datos de Diapositivas Python**: [texto-y-conversiones.ts](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/data/slides/python/texto-y-conversiones.ts)
- **Modal de Compartir/Embed**: [ShareEmbedButton.tsx](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/components/ShareEmbedButton.tsx)
