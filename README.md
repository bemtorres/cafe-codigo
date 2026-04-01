# Aprende - Sistema de Cursos Interactivos 🚀

Bienvenido al repositorio de `Aprende`. Aquí creamos rutas de aprendizaje tecnológicas (PSeInt, C#, Kotlin, etc.) enfocadas en Retos, Lógica y Evaluación Activa.

## Estructura Estándar de los Cursos

Para mantener la coherencia y garantizar la mejor experiencia de aprendizaje gamificada, **cada módulo o lección de cualquier curso debe seguir esta estructura fundamental**:

1. **Introducción y Motivación (`<section>`)**
   - Título claro de la lección usando la etiqueta `<h1>`.
   - Una breve explicación de por qué es importante aprender este concepto.

2. **Desarrollo del Contenido y Ejemplos Activos (`<CodeBlock>`)**
   - El contenido principal separado en subtítulos `<h2>`.
   - Se debe utilizar obligatoriamente el componente `<CodeBlock>` para cualquier fragmento de código. Esto garantiza colores consistentes, insignias (badges) interactivas, y soporte nativo usando *Shiki* en toda la plataforma.

3. **Demostración Práctica**
   - Cuanto más complejo es el tema, es ideal inyectar un caso de uso breve simulando una aplicación real para aterrizar el conocimiento.

4. **Ponte a Prueba (Sección Final)**
   - Esta última sección debe ubicarse ANTES de la barra de navegación lateral e inferior (`<nav class="nav-bottom">`).
   - Sirve como la validación interactiva que cierra el proceso:
   ```astro
   <section class="mb-10">
     <h2>Ponte a prueba</h2>
     <p>Comprueba tus conocimientos sobre este tema realizando nuestro pequeño test (5 preguntas).</p>
     <QuizModal quizKey="llave-de-esta-leccion" />
   </section>
   ```

5. **Banco de Preguntas (`QuizBank`)**
   - Para que la sección interactiva funcione, cada curso **debe tener su propio archivo de banco de preguntas** en la carpeta `src/data/` (por ejemplo: `pseintQuizBank.ts` o `csharpQuizBank.ts`).
   - Allí residen objetos de preguntas de opción múltiple, con propiedades `prompt`, arreglo `options` y un `correctIndex`.
   - Se debe invocar su componente Modal correspondiente (p.e: `<CsharpQuizModal />`) importándolo en la parte superior del archivo `.astro`.

## Acerca de los Componentes Universales

- **`<Layout>`**: Envuelve a cada lección para inyectar los metadatos SEO, el menú lateral y la lógica de estado local.
- **`<CodeBlock code={...} title="..." lang="..." />`**: Renderiza el código. Si no entregas `lang`, utiliza una heurística interna mediante RegExp para averiguar de qué lenguaje se trata y auto-asignar iconos, bordes coloreados y su parser correspondiente.

## Cursos de lenguaje (`category: 'language'`)

Los cursos marcados como lenguaje en `src/data/courses.ts` (por ejemplo C++, C#, Java, Python, JavaScript) comparten:

- **`communityReleaseYear`** (opcional): año de referencia de la primera difusión pública a la comunidad; se usa en el catálogo `/cursos/` y en el modal «Elige un curso» del layout (`Layout.astro`) como texto «Comunidad · año».
- **Pie «Dato curioso»**: al final del `<main>` se renderiza `LanguageCuriosity` (`src/components/LanguageCuriosity.astro`), con datos en `src/data/languageCuriosityMeta.ts` (una frase corta + enlace a Wikipedia).

### Reglas del pie «Dato curioso»

- Se muestra en la **portada del curso** (`/course/{slug}/`) y en **todas las lecciones** de ese curso **excepto** la lección cuyo slug es `introduccion`.
- No se muestra en cursos que no sean de categoría `language`.
- Para añadir o editar textos: `src/data/languageCuriosityMeta.ts` (una entrada por `slug` del curso). El componente es deliberadamente minimalista (párrafo + enlace).

### Lección `introduccion`

Las páginas `introduccion` **no** incluyen el bloque de dato curioso; el contexto histórico queda en `languageCuriosityMeta` y aparece en el resto de lecciones y en la portada. No dupliques bloques de origen en el `.astro` de la intro salvo que el contenido pedagógico lo exija explícitamente.

---
*Con consistencia arquitectónica formaremos mejores profesionales del software.*
