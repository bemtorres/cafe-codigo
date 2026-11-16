# Catálogo de Widgets Atómicos de Cursos (`src/components/courses/widgets/`)

Cada widget de la plataforma está separado en su propio archivo `.tsx` independiente con su propia interfaz de `Props` tipada y su esquema de datos en [`courseJsonTypes.ts`](../../../data/courses/courseJsonTypes.ts). Esto permite editar, extender o probar cualquier widget de forma aislada sin afectar al resto del reproductor.

## Editor visual del aula

- Abre el aula y pulsa **Editar contenido**. Para probar con el lienzo de ejemplo que ya incluye un informe, abre `/app/courses/django/aula/?edit=true`.
- Entre bloques, **Añadir recurso** abre la biblioteca de plantillas. Busca por nombre o filtra por Contenido, Práctica y Evaluación. Al insertar una plantilla se abre su formulario de propiedades.
- **Salto de página** crea una página con nombre en el índice. Los recursos que siguen pasan a esa página hasta el próximo salto. En el JSON, `pageBreak: true` marca la sección que inicia una página. **Quitar salto** reúne ambas partes y conserva los recursos.
- Cada informe reúne las actividades de su página desde el informe anterior, si lo hay. **Vista estudiante** oculta los controles y permite probar la navegación. Los cambios quedan en el borrador del navegador y se pueden exportar como JSON.

---

## 🎨 Propiedades Comunes a Todos los Widgets (`CourseWidgetBlock`)

Cada entrada de `contenidos[]` incluye un objeto `widget` con estas propiedades:

| Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único del bloque en el DOM (ej. `"widget-slides"`, `"widget-quiz"`). Permite navegación directa por ancla (`#id`). |
| `type` | `WidgetBlockType` | Tipo de widget que define qué componente atómico se renderiza. |
| `bgMode` | `'default' \| 'soft' \| 'brand' \| 'white' \| 'dark' \| 'custom'` | *(Opcional)* Modo de color de fondo del bloque. Por defecto usa `'default'` (`#F4F5F7` en bloques editoriales o `brand.bgQuiz` en los bloques de evaluación). |
| `bgColor` | `string` | *(Opcional)* Color hexadecimal o CSS personalizado cuando `bgMode === 'custom'` (ej. `"#E0F2FE"`). |
| `data` | `BlockData` | Objeto JSON con los datos específicos del widget. |

---

## 📦 1. Widgets Editoriales e Interactivos de Contenido

### 1.1. [`WidgetHeroBanner.tsx`](./WidgetHeroBanner.tsx)
- **Tipo JSON (`type`)**: `'hero-banner'`
- **Interfaz de Props**: `WidgetHeroBannerProps` (`data: HeroBannerBlockData`, `brand: BrandPreset`, `institutionName: string`, `totalLessons: number`)
- **¿Qué se puede hacer en este widget?**
  - Mostrar el **título principal de la lección** (`title`) y el subtítulo de progreso (`lessonSubtitle`).
  - Renderizar un **banner fotográfico a ancho completo** (`bannerImageUrl`) con superposición oscura, título institucional (`bannerTitlePrefix` + `institutionName`) y bajada (`bannerDescription`).
  - Incluir **cita/referencia APA** bajo el banner (`apaCitation`).
  - Mostrar una grilla de **tarjetas KPI** (`kpis: [{ stat, label, desc }]`) con borde superior del color corporativo.

---

### 1.2. [`WidgetImageCoverBanner.tsx`](./WidgetImageCoverBanner.tsx)
- **Tipo JSON (`type`)**: `'image-cover-banner'`
- **Interfaz de Props**: `WidgetImageCoverBannerProps` (`data: ImageCoverBannerBlockData`, `brand?: BrandPreset`, `institutionName: string`)
- **¿Qué se puede hacer en este widget?**
  - Mostrar **únicamente la portada de imagen de ancho completo** con degradado oscuro lateral, línea decorativa blanca superior, titular (`bannerTitlePrefix`) y párrafo descriptivo (`bannerDescription`).
  - **Sin lupa ni zoom en la imagen de fondo**, pensado como separador visual limpio de sección.
  - Activar o desactivar la concatenación automática del nombre de la institución (`includeInstitutionName?: boolean`).
  - Ajustar la altura mínima del banner (`minHeight`, por defecto `'320px'`) y añadir referencia APA opcional (`apaCitation`).

---

### 1.3. [`WidgetRichTextEditorial.tsx`](./WidgetRichTextEditorial.tsx)
- **Tipo JSON (`type`)**: `'rich-text-editorial'`
- **Interfaz de Props**: `WidgetRichTextEditorialProps` (`data: RichTextEditorialBlockData`, `brand: BrandPreset`, `isEditMode?: boolean`, `onUpdateData?: (next: RichTextEditorialBlockData) => void`)
- **¿Qué se puede hacer en este widget?**
  - Diseñar y formatear bloques de **solo texto editorial enriquecido con Tiptap** (`@tiptap/react`).
  - **En modo diseño (o al pulsar `"✏️ Diseñar con Tiptap"`)**:
    - Barra de herramientas visual con: **H1, H2, H3, Párrafo**, **Negrita**, *Cursiva*, <u>Subrayado</u>, ~~Tachado~~, `Código inline`, **Color de marca / Color oscuro**, **Resaltador amarillo**, **Alineación** (izquierda, centro, derecha), **Listas** (viñetas y numeradas), **Cita destacada (`blockquote`)**, **Bloque de código**, **Separador horizontal**, **Enlaces** y **Deshacer/Rehacer**.
    - Selector de **variante de contenedor (`cardVariant`)**: `'editorial-card'` (tarjeta blanca con sombra), `'minimal-clean'` (texto limpio sobre el fondo), o `'callout-accent'` (caja con borde izquierdo del color del curso).
    - Selector de **ancho máximo de lectura (`maxWidth`)**: `'680px'`, `'780px'` o `'920px'`.
  - **En modo lectura**: renderiza el HTML limpio con tipografía editorial optimizada.

---

### 1.4. [`WidgetVideoEditorial.tsx`](./WidgetVideoEditorial.tsx)
- **Tipo JSON (`type`)**: `'video-editorial'`
- **Interfaz de Props**: `WidgetVideoEditorialProps` (`data: VideoEditorialBlockData`, `brand: BrandPreset`, `institutionName: string`)
- **¿Qué se puede hacer en este widget?**
  - Incrustar un **video principal 16:9** (`videoUrl`, ej. YouTube embed) dentro de un marco editorial con insignia institucional.
  - Añadir la **fuente o cita en formato APA 7** (`apaCitation`) debajo del reproductor.

### [`WidgetEditorialQuote.tsx`](./WidgetEditorialQuote.tsx)

El tipo `editorial-quote` muestra una cita independiente. El editor permite cambiar el texto, la frase destacada, el color de acento y si se añade el nombre de la institución al final.

---

### 1.5. [`WidgetCodeWalkthrough.tsx`](./WidgetCodeWalkthrough.tsx)
- **Tipo JSON (`type`)**: `'code-walkthrough'`
- **Interfaz de Props**: `WidgetCodeWalkthroughProps` (`data: CodeWalkthroughBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Explicar un archivo de código **paso a paso** (`steps[]`).
  - Al cambiar entre **Paso 1, Paso 2, Paso N**, el panel derecho resalta automáticamente las líneas configuradas en `highlightLines: number[]` y atenúa el resto.
  - Cada paso incluye: `badge`, `title`, `explanation`, regla de oro (`keyTakeaway`), nombre del archivo (`fileName`) y arreglo de líneas (`codeLines: string[]`).

---

### 1.6. [`WidgetSlideCards.tsx`](./WidgetSlideCards.tsx) (con [`SlideIllustration.tsx`](./SlideIllustration.tsx))
- **Tipo JSON (`type`)**: `'slide-cards'`
- **Interfaz de Props**: `WidgetSlideCardsProps` (`data: SlideCardsBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Presentar un **carrusel de tarjetas secuenciales** (`PASO 1`, `PASO 2`, etc.) con navegación lateral (`<` / `>`) y paginador inferior.
  - Cada tarjeta puede mostrar:
    - **Una ilustración/imagen con zoom (`ZoomableFigure`)** y su **referencia APA ubicada directamente debajo de la imagen** (`apaCitation`), o bien
    - **Un video embebido (`videoUrl`)** con subtítulo (`videoCaption`) y cita APA.
  - Texto inferior con palabra o frase central resaltada en el color del curso (`bodyBefore` + `highlight` + `bodyAfter`).

---

### 1.7. [`WidgetAccordionDetails.tsx`](./WidgetAccordionDetails.tsx)
- **Tipo JSON (`type`)**: `'accordion-details'`
- **Interfaz de Props**: `WidgetAccordionDetailsProps` (`data: AccordionBlockData`, `brand: BrandPreset`, `onNavigateNext: (targetId: string, lessonId?: string) => void`)
- **¿Qué se puede hacer en este widget?**
  - Incluir un párrafo introductorio con dos fragmentos destacados en color corporativo (`introHighlight1`, `introHighlight2`).
  - Desplegar y contraer múltiples paneles de contenido detallado (`items: [{ id, title, content }]`).
  - Botón inferior (`▼`) que permite saltar suavemente al siguiente bloque (`nextTargetId`) o cambiar de lección (`nextLessonId`).

---

### 1.8. [`WidgetCodeComparison.tsx`](./WidgetCodeComparison.tsx)
- **Tipo JSON (`type`)**: `'code-comparison'`
- **Interfaz de Props**: `WidgetCodeComparisonProps` (`data: CodeComparisonBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Comparar lado a lado **Código Vulnerable vs. Código Seguro (Refactorizado)** organizado por pestañas temáticas (`tabs[]`).
  - Cada pestaña muestra:
    - Columna Roja: `badTitle`, `badCode` y explicación del riesgo (`badReason`).
    - Columna Verde: `goodTitle`, `goodCode` y explicación de la solución (`goodReason`).

---

### 1.9. [`WidgetArchitectureHotspots.tsx`](./WidgetArchitectureHotspots.tsx)
- **Tipo JSON (`type`)**: `'architecture-hotspots'`
- **Interfaz de Props**: `WidgetArchitectureHotspotsProps` (`data: ArchitectureHotspotsBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Explorar **capas de arquitectura (01..N)** donde el lado izquierdo son tarjetas selectoras de texto (`number`, `name`, `subtitle`) y el lado derecho es un panel oscuro de inspección con **Amenaza Principal** (`threat`), **Control Técnico Aplicado** (`control`) e **Indicador** (`metric`).

---

### 1.10. [`WidgetArchitectureHotspotsVisual.tsx`](./WidgetArchitectureHotspotsVisual.tsx)
- **Tipo JSON (`type`)**: `'architecture-hotspots-visual'`
- **Interfaz de Props**: `WidgetArchitectureHotspotsVisualProps` (`data: ArchitectureHotspotsVisualBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Alternativa visual de `WidgetArchitectureHotspots` donde **tanto el lado izquierdo como el lado derecho tienen imágenes**:
    - **Columna izquierda**: cada capa selectora muestra una miniatura fotográfica (`leftThumbnailUrl`) con el número de capa superpuesto.
    - **Columna derecha**: además de Amenaza, Control e Indicador, incluye una **imagen técnica destacada (`rightImageUrl`)** con pie de foto (`rightImageCaption`), **lupa de ampliación (lightbox)** y **referencia APA (`apaCitation`)** debajo.

---

### 1.11. [`WidgetFlipCards3D.tsx`](./WidgetFlipCards3D.tsx)
- **Tipo JSON (`type`)**: `'flip-cards-3d'`
- **Interfaz de Props**: `WidgetFlipCards3DProps` (`data: FlipCards3DBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Mostrar una grilla de **tarjetas 3D interactivas** que giran `180°` al hacer clic.
  - **Soporte de imágenes tanto al inicio (frente) como al revés (reverso)**:
    - **Cara frontal (inicio)**: `badge`, `title`, `frontQuestion`, `frontContext` y una imagen opcional (`frontImageUrl`) con texto alternativo (`frontImageCaption`) y fuente (`frontApaCitation`).
    - **Cara trasera (al revés)**: `backRule`, fragmento de código opcional (`backCode`) y una imagen opcional (`backImageUrl`) con texto alternativo (`backImageCaption`) y fuente (`backApaCitation`).

---

### 1.12. [`WidgetStepToStep.tsx`](./WidgetStepToStep.tsx)
- **Tipo JSON (`type`)**: `'pipeline-steps'`
- **Interfaz de Props**: `WidgetStepToStepProps` (`data: StepToStepBlockData`, `brand: BrandPreset`)
- **¿Qué se puede hacer en este widget?**
  - Mostrar una **línea de tiempo vertical paso a paso** (`stages[]`) independiente del checklist.
  - Cada etapa incluye: `stage` (ej. `"Etapa 1"`), `time` (ej. `"< 15 seg"`), `badge`, `title` y `description`.

---

### 1.13. [`WidgetChecklist.tsx`](./WidgetChecklist.tsx)
- **Tipo JSON (`type`)**: `'checklist'`
- **Interfaz de Props**: `WidgetChecklistProps` (`data: ChecklistBlockData`, `brand: BrandPreset`, `checkedItems: string[]`, `onToggleChecklistItem: (id: string) => void`)
- **¿Qué se puede hacer en este widget?**
  - Mostrar una **lista de verificación interactiva (Checklist)** independiente.
  - El usuario puede marcar y desmarcar controles (`checklist: [{ id, label, category }]`), actualizando en tiempo real el contador (`X de N verificados`) y el porcentaje de cumplimiento del reporte final.

---

### 1.14. [`WidgetPipelineChecklist.tsx`](./WidgetPipelineChecklist.tsx)
- **Tipo JSON (`type`)**: `'pipeline-checklist'`
- **Interfaz de Props**: `WidgetPipelineChecklistProps`
- **¿Qué se puede hacer en este widget?**
  - Componente compuesto de compatibilidad que une [`WidgetStepToStep`](./WidgetStepToStep.tsx) + [`WidgetChecklist`](./WidgetChecklist.tsx) cuando un JSON antiguo usa el bloque combinado `'pipeline-checklist'`.

---

### 1.15. [`WidgetDocumentResources.tsx`](./WidgetDocumentResources.tsx)

- **Tipo JSON (`type`)**: `'document-resources'`
- Configura `data.title`, una `data.description` opcional y la lista `data.resources`. Cada recurso lleva `id`, `title`, `url` y, si hace falta, `description`.
- Usa `action: 'download'` para un archivo del sitio, como un PDF en `public/course-resources/`. El campo opcional `fileName` indica el nombre sugerido al guardar. Para archivos de otro sitio, la descarga depende de la configuración de ese servidor.
- Usa `action: 'open'` con la URL compartida de Drive o OneDrive para abrir el recurso en otra pestaña.

---

## 🧪 2. Suite de Widgets de Evaluación y Simulación (`ScenarioQuiz`)

Todos los widgets de la suite de evaluación utilizan [`QuizCardShell.tsx`](./QuizCardShell.tsx) para mantener un encabezado unificado con insignia, puntaje máximo (`+PTS`), puntaje obtenido tras validar y retroalimentación pedagógica.

### 2.1. [`WidgetScenarioQuiz.tsx`](./WidgetScenarioQuiz.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz'`
- **Interfaz de Props**: `WidgetScenarioQuizProps`
- **¿Qué se puede hacer en este widget?**
  - Evaluar múltiples **casos de estudio secuenciales** (`Caso 1`, `Caso 2`, `Caso 3`) en un mismo bloque con selector superior.
  - Cada caso soporta: pregunta (`question`), contexto (`context`), **video de evidencia opcional (`videoUrl`)** con cita APA (`apaCitation`), opciones de selección única (`options[]`) y retroalimentación inmediata por opción (`feedback`).

---

### 2.2. [`WidgetScenarioQuizMultiple.tsx`](./WidgetScenarioQuizMultiple.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-multiple'`
- **Interfaz de Props**: `WidgetScenarioQuizMultipleProps`
- **¿Qué se puede hacer en este widget?**
  - Evaluación de **selección múltiple con casillas de verificación (checkboxes)** donde el estudiante debe marcar todas las respuestas correctas simultáneamente (`options: [{ id, text, isCorrect, explanation }]`).

---

### 2.3. [`WidgetScenarioQuizDragAndDrop.tsx`](./WidgetScenarioQuizDragAndDrop.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-drag-drop'`
- **Interfaz de Props**: `WidgetScenarioQuizDragAndDropProps`
- **¿Qué se puede hacer en este widget?**
  - Arrastra las tarjetas hacia las categorías (`categories[]`) o selecciona una tarjeta y pulsa su destino con el teclado o en una pantalla táctil. Cada tarjeta admite una imagen opcional en `imageUrl` y recibe retroalimentación individual.

---

### 2.4. [`WidgetScenarioQuizOrdering.tsx`](./WidgetScenarioQuizOrdering.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-ordering'`
- **Interfaz de Props**: `WidgetScenarioQuizOrderingProps`
- **¿Qué se puede hacer en este widget?**
  - Ordenar una **secuencia de pasos de un protocolo (`1°..N°`)** subiendo o bajando cada paso (`↑` / `↓`) hasta alcanzar el orden cronológico correcto (`correctPosition`).

---

### 2.5. [`WidgetScenarioQuizMatching.tsx`](./WidgetScenarioQuizMatching.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-matching'`
- **Interfaz de Props**: `WidgetScenarioQuizMatchingProps`
- **¿Qué se puede hacer en este widget?**
  - Emparejar cada **hallazgo o amenaza de la columna izquierda** (`leftBadge`, `leftPrompt`) con su **control mitigador o área responsable** en un selector desplegable a la derecha (`rightMatch`).

---

### 2.6. [`WidgetScenarioQuizFillBlank.tsx`](./WidgetScenarioQuizFillBlank.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-fill-blank'`
- **Interfaz de Props**: `WidgetScenarioQuizFillBlankProps`
- **¿Qué se puede hacer en este widget?**
  - Completar espacios en blanco (**Cloze test**) dentro de un bloque de código (`codeMode: true`) o párrafo normativo (`codeMode: false`), eligiendo la opción correcta en cada hueco (`segments[]`).

---

### 2.7. [`WidgetScenarioQuizBranching.tsx`](./WidgetScenarioQuizBranching.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-branching'`
- **Interfaz de Props**: `WidgetScenarioQuizBranchingProps`
- **¿Qué se puede hacer en este widget?**
  - Simulación de **árbol de decisión ramificado (Roleplay)** donde cada decisión (`choices[]`) muestra una consecuencia inmediata (`consequenceText`) y lleva a un nodo distinto (`nextNodeId`) hasta finalizar con un puntaje proporcional al camino tomado (`impactScore`).

---

### 2.8. [`WidgetScenarioQuizTrueFalseMatrix.tsx`](./WidgetScenarioQuizTrueFalseMatrix.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-tf-matrix'`
- **Interfaz de Props**: `WidgetScenarioQuizTrueFalseMatrixProps`
- **¿Qué se puede hacer en este widget?**
  - Evaluar una **matriz de afirmaciones normativas** donde el estudiante dictamina fila por fila si cada práctica **✓ Cumple** o **✕ Incumple** (`correctVerdict: 'cumple' | 'incumple'`).

---

### 2.9. [`WidgetScenarioQuizHotspotSpotter.tsx`](./WidgetScenarioQuizHotspotSpotter.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-hotspot'`
- **Interfaz de Props**: `WidgetScenarioQuizHotspotSpotterProps`
- **¿Qué se puede hacer en este widget?**
  - **Cazador de vulnerabilidades en líneas de código**: el estudiante inspecciona un archivo (`fileName`) y hace clic directamente sobre las líneas que considera vulnerables (`🚩 RIESGO MARCADO`) para auditarlas.

---

### 2.10. [`WidgetScenarioQuizImageHotspot.tsx`](./WidgetScenarioQuizImageHotspot.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-image-hotspot'`
- **Interfaz de Props**: `WidgetScenarioQuizImageHotspotProps`
- **¿Qué se puede hacer en este widget?**
  - Mostrar una **imagen o ilustración escénica** (por ejemplo, una **banda de música en vivo** con Guitarrista, Vocalista, Batería y Tecladista, o cualquier imagen personalizada mediante `imageUrl`) y pedirle al estudiante que **seleccione la parte o lado de la imagen donde se encuentra el elemento correcto** (ej. *"Selecciona dónde está la batería"*).
  - En el modo alumno se puede marcar cualquier punto de la imagen. **Comprobar** valida si la selección cae dentro de una zona con `isRiskTarget: true`. El alumno solo ve sus marcas y el resultado.
  - En `?edit=true` se puede elegir una zona y dibujar su rectángulo sobre la imagen. El editor guarda los límites como porcentajes en el borrador JSON. La [demo de carga de archivos](/test/branding/file-hotspot/) usa la misma imagen en tres actividades con objetivos distintos.

---

### 2.11. [`WidgetScenarioQuizImageChoice.tsx`](./WidgetScenarioQuizImageChoice.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-image-choice'`
- **Interfaz de Props**: `WidgetScenarioQuizImageChoiceProps`
- **¿Qué se puede hacer en este widget?**
  - Presentar múltiples **tarjetas visuales con imagen o ilustración** (`cards[]`), cada una con botón de **lupa para ampliar en pantalla completa** (`ZoomableFigure`), para que el estudiante elija cuál de las escenas cumple el estándar correcto (`isCorrect: true`).

---

### 2.12. [`WidgetScenarioQuizRiskSlider.tsx`](./WidgetScenarioQuizRiskSlider.tsx)
- **Tipo JSON (`type`)**: `'scenario-quiz-risk-slider'`
- **Interfaz de Props**: `WidgetScenarioQuizRiskSliderProps`
- **¿Qué se puede hacer en este widget?**
  - Calibrar el **nivel de severidad o riesgo (`Nivel 1` a `Nivel 5`)** mediante botones o control deslizable (`input[type="range"]`), mostrando en vivo el protocolo requerido para cada nivel (`actionRequired`) antes de confirmar.

---

## 📊 3. Índice Lateral (`SidebarIndice`), Reporte Final y Componentes Transversales

### 3.1. Documento del curso e índice del módulo

El [endpoint de la demo](../../../pages/api/courses/branding.json.ts) devuelve un [`CourseDocumentJSON`](../../../data/courses/courseJsonTypes.ts) con la estructura `modulos[] → lessions[] → secciones[] → contenidos[] → widget`. Cada widget recibe los datos de su bloque. El reproductor usa `widget.type` para elegir el componente y el orden de los arreglos para armar el panel principal.

El reproductor toma el módulo indicado en `?modulo=<id>` o el primero del documento. El índice muestra el título del módulo, sus Lessions y Secciones. Al pulsar una sección, el panel se desplaza a su primer contenido. El buscador también encuentra contenidos internos y los abre desde su sección. El editor de la demo guarda borradores en el navegador y permite reordenar contenidos dentro de una sección.

| Archivo | Propósito |
| :--- | :--- |
| [`WidgetSidebarIndice.tsx`](./WidgetSidebarIndice.tsx) | (`#sidebar-index`) Índice de Lessions y Secciones, con buscador y barra de progreso del módulo. |
| [`WidgetFinalReport.tsx`](./WidgetFinalReport.tsx) | (`type: 'final-report'`) Calcula y muestra el **Score Global (0-100)** ponderando los Casos de Decisión (70%) y el Checklist (30%), lista el desglose por pregunta, permite reiniciar la evaluación o imprimir en PDF. |
| [`ZoomableFigure.tsx`](./ZoomableFigure.tsx) | Envuelve cualquier imagen o SVG para agregar **botón de lupa**, **modal Lightbox de pantalla completa** y el pie de **referencia APA (`ApaReferenceFooter`)** ubicado siempre debajo de la figura. |
| [`EditBlockHeader.tsx`](./EditBlockHeader.tsx) | Barra de herramientas en modo constructor para **subir/bajar bloques**, **duplicar**, **eliminar**, **cambiar el color de fondo (`bgMode` / `bgColor`)** y **editar el JSON** individual del widget. |
| [`QuizCardShell.tsx`](./QuizCardShell.tsx) | Contenedor visual compartido por los 11 widgets de la suite de evaluación. |
| [`AtomicCourseWidgets.tsx`](./AtomicCourseWidgets.tsx) | Archivo barril (re-export) que exporta todos los widgets de contenido y sus tipos `Props`. |
| [`ScenarioQuizSuiteWidgets.tsx`](./ScenarioQuizSuiteWidgets.tsx) | Archivo barril (re-export) que exporta todos los widgets de la suite de evaluación y sus tipos `Props`. |

