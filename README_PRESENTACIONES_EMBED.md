# 📊 Sistema de Presentaciones & Embeds — cafeycodigo.org

Este módulo permite visualizar e incrustar cualquier lección en modo **Presentación Interactiva en Diapositivas** estilo PowerPoint / Keynote con **Evaluación Interactiva**, **Reflexión de Metacognición**, **Logo Institucional**, **Menú de Herramientas (🛠️)** y **Reloj Temporizador Flotante Movible (⏱️)**.

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

## 📱 Comportamiento de Navegación Responsiva en Móviles vs Módulo de Quiz

- **📱 En Pantallas Móviles / Celulares (`isMobile`)**:
  - Los botones de navegación `Anterior` y `Siguiente` **se activan y están siempre accesibles de forma independiente a si la URL especifica `bar=false`**.
- **🧪 Al Entrar al Módulo de Quiz Evaluativo (`quiz_interaction`)**:
  - La barra de navegación inferior **se desactiva y oculta automáticamente**. Esto garantiza que el estudiante responda activamente cada desafío e interactúe con el botón `[Continuar →]` integrado en la retroalimentación.

---

## 🎮 Nombres Estándar de Interacciones en Inglés (`InteractionType`)

El sistema incluye **7 tipos de dinámicas evaluativas**:

| Nombre en Inglés | Descripción | Mecánica de Juego y Etiquetas |
| :--- | :--- | :--- |
| `TrueFalse` | Verdadero o Falso / Sí o No | Botones limpios independientes: o bien `VERDADERO` / `FALSO`, o bien `SÍ` / `NO` (nunca combinados juntos). |
| `MultipleChoice` | Selección Múltiple | Alternativas de respuesta con explicaciones paso a paso. |
| `ReorderSequence` | Ordenar Secuencia de Código | Fichas de código desordenadas que el usuario toca para armar la instrucción lógica. |
| `MatchPairs` | Unir Lista A ↔ Lista B | Conexión en tiempo real entre métodos y sus definiciones correspondientes. |
| `FillInTheBlank` | Completar Espacio en Blanco | Identificar y seleccionar la función/palabra reservada que falta en el código. |
| `PredictOutput` | Predecir Salida de Código | Predecir la impresión exacta por consola (`print`) de un programa en ejecución. |
| `FindTheBug` | Identificar la Causa del Error | Encontrar el error sintáctico o de tipos (`TypeError`) en un fragmento de código. |

---

## ⏱️ Reloj Temporizador Flotante Movible y Menú de Herramientas (🛠️)

El visor de diapositivas cuenta con una barra de acción con el **Ícono de Herramientas `🛠️`**:

1. **⏱️ Temporizador Regresivo Flotante**:
   - **Visibilidad a Demanda**: Por defecto está oculto. Solo aparece en pantalla cuando el usuario selecciona un tiempo regresivo en el menú `🛠️ Herramientas` (ej. 3m, 5m, 10m, 25m) o pasa el parámetro `timer=300`.
   - **Movible / Arrastrable (Drag & Drop)**: El widget se puede arrastrar libremente a cualquier posición del lienzo con el mouse o en pantallas táctiles con el dedo.
   - **Escala de Tamaños (`S` \| `M` \| `L` \| `XL`)**: Selector integrado en el widget para ajustar el tamaño del reloj desde pequeño (`S`) hasta gigante (`XL`).
   - **Alerta de Sonido y Vibración (`00:00`)**: Al llegar a cero, el sistema reproduce una **melodía sintética (Web Audio API)** y hace **vibrar el dispositivo móvil**.

2. **🗣️ Lectura en Voz Alta (Text-to-Speech)**:
   - Permite escuchar la lectura en voz alta del contenido de la diapositiva actual.

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
| `timer` | `time` | `true` \| *segundos* | Activa el Reloj Temporizador Regresivo Flotante (ej. `timer=300`). |
| `logo` | `institutionLogo` / `l` | *URL de imagen* | Muestra la imagen del Logo Institucional en el banner header y badge. |
| `title` | `institution` / `t` | *Texto* (ej. `INACAP`) | Muestra el distintivo con el nombre de la institución en el encabezado. |
| `name` | `n` | *Texto* (ej. `Juan Pérez`) | Muestra el distintivo con el nombre del estudiante en el encabezado. |
| `email` | `m` | *Correo* (ej. `juan@e.com`) | Muestra el correo del estudiante en el perfil de la barra superior. |
| `icon` | `emoji` | *Emoji/Ícono* (ej. `🚀` \| `🐍`) | Reemplaza o antepone un ícono/emoji personalizado en las insignias. |
| `color` | `accent` / `c` | *Color Hex* (ej. `EF476F`) | Cambia el color primario de acento (botones, barra de progreso). |
| `text` | `textcolor` / `x` | *Color Hex* (ej. `FFEA00`) | Cambia únicamente el color de texto de los títulos principales (`<h1>` ... `<h6>`). |
| `bgcolor` | `background` / `b` | *Color Hex* (ej. `1e1b4b`) | Cambia únicamente el color de fondo del Banner / Encabezado superior. |
| `theme` | - | `dark` \| `light` | Fuerza la neutralidad de la diapositiva entre tema oscuro (`dark`) o claro (`light`). |
| `quiz` | `q` | `true` (por defecto) \| `false` \| `0` | El Módulo de Quiz está **activado por defecto (`true`)**. Usa `quiz=false` o `q=0` para desactivarlo. |
| `bar` | - | `false` \| `0` \| `autohide` \| `true` | Configura la barra inferior de navegación. |

---

## 🛠️ Archivos Clave del Proyecto

- **Visor React**: [CourseSlideViewer.tsx](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/components/slides/CourseSlideViewer.tsx)
- **Ruta Astro**: [[lesson].astro](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/pages/course-slides/%5Bcourse%5D/%5Blesson%5D.astro)
- **Datos de Diapositivas Python**: [texto-y-conversiones.ts](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/data/slides/python/texto-y-conversiones.ts)
- **Modal de Compartir/Embed**: [ShareEmbedButton.tsx](file:///c:/Users/benja/Desktop/EDUCK%202026/aprende_cafeycodigo/src/components/ShareEmbedButton.tsx)
