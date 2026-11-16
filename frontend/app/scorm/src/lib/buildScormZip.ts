// @ts-ignore
import JSZip from 'jszip';
// @ts-ignore
import { saveAs } from 'file-saver';
import type { SelectedLesson, CompileOptions } from './types';
import { generateManifest } from './generateManifest';

const SCORM_API_PATH = 'scorm-api/SCORM_API.js';

/** Extrae el contenido de todos los <style> tags (inline + externos fetcheados) */
function extractInlineStyles(html: string): string[] {
  const blocks: string[] = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

/** Extrae URLs de <link rel="stylesheet"> externos y google fonts */
function extractStylesheetLinks(html: string): string[] {
  const urls: string[] = [];
  const re = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

/** Fetch external CSS y devuelve el contenido */
async function fetchExternalStyles(urls: string[], baseUrl: string): Promise<string> {
  let all = '';
  for (const url of urls) {
    try {
      const fullUrl = url.startsWith('http') ? url : new URL(url, baseUrl).href;
      const resp = await fetch(fullUrl);
      if (resp.ok) all += (await resp.text()) + '\n';
    } catch {
      // skip failed fetches
    }
  }
  return all;
}

/** Extrae todos los <script> inline (sin src) del HTML original */
function extractInlineScripts(html: string): string {
  const scripts: string[] = [];
  const re = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    // solo scripts sin atributo src
    if (!/src\s*=/.test(m[0])) {
      scripts.push(m[0]);
    }
  }
  return scripts.join('\n');
}

/** Extrae el contenido de <main> */
function extractMainContent(html: string): string {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (m) return m[1];
  const a = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (a) return a[1];
  const b = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (b) return b[1];
  return html;
}

/** Reemplaza quizzes interactivos (universal-quiz) por versiones standalone sin imports externos.
 *  El HTML del quiz (preguntas, opciones, botones) ya está renderizado por Astro.
 *  Solo hay que quitar los <script src=...> externos e inyectar nuestro propio controller. */
function injectStandaloneQuizController(mainContent: string): string {
  // Find all .universal-quiz sections
  const quizRe = /<div[^>]*class="[^"]*universal-quiz[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
  if (!quizRe.test(mainContent)) return mainContent;
  quizRe.lastIndex = 0;

  const STANDALONE_QUIZ_JS = `<script>
(function(){
  var DELEGATED_KEY = '__scormQuizReady__';
  if (window[DELEGATED_KEY]) return;
  window[DELEGATED_KEY] = true;

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
  }

  function openModal(modal) {
    if (!modal) return;
    var resultEl = modal.querySelector('.universal-quiz__result');
    if (resultEl) resultEl.textContent = '';
    modal.querySelectorAll('[data-quiz-feedback]').forEach(function(el) { el.textContent = ''; });
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
  }

  function shuffleQuestions(modal) {
    var root = modal.closest('.universal-quiz');
    if (!root || root.getAttribute('data-shuffle') !== 'true') return;
    var form = modal.querySelector('.universal-quiz__form');
    var qEls = Array.from(modal.querySelectorAll('[data-quiz-q]'));
    if (!form || qEls.length < 2) return;
    for (var i = qEls.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      form.appendChild(qEls[j]);
    }
  }

  function gradeModal(modal) {
    var qEls = modal.querySelectorAll('[data-quiz-q]');
    var score = 0;
    qEls.forEach(function(qEl) {
      var correct = Number(qEl.getAttribute('data-correct-index'));
      var feedbackEl = qEl.querySelector('[data-quiz-feedback]');
      var selected = qEl.querySelector('input[type="radio"]:checked');
      var idx = selected ? Number(selected.value) : null;
      var correctInput = qEl.querySelector('input[type="radio"][value="' + correct + '"]');
      var correctText = correctInput && correctInput.parentElement ? correctInput.parentElement.querySelector('span').textContent : '';
      var isCorrect = idx === correct;
      if (isCorrect) score++;
      if (feedbackEl) {
        feedbackEl.innerHTML = isCorrect
          ? '<span style=\"color:#2ecc71;font-weight:800;\">✓ Correcto</span>'
          : '<span style=\"color:#e67e22;font-weight:800;\">✗ Incorrecto. Respuesta: "' + correctText + '"</span>';
      }
    });
    var total = qEls.length;
    var resultEl = modal.querySelector('.universal-quiz__result');
    if (resultEl) resultEl.innerHTML = 'Puntaje Final: ' + score + '/' + total + '.';
    if (window.API) {
      API.LMSSetValue('cmi.core.score.raw', String(score));
      API.LMSSetValue('cmi.core.score.max', String(total));
      API.LMSSetValue('cmi.core.score.min', '0');
      API.LMSCommit();
    }
  }

  document.addEventListener('click', function(e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var startBtn = target.closest('.universal-quiz__start');
    if (startBtn) {
      var root = startBtn.closest('.universal-quiz');
      var modal = root && root.querySelector('.universal-quiz__modal');
      openModal(modal);
      if (modal) shuffleQuestions(modal);
      return;
    }
    var closeBtn = target.closest('[data-quiz-close]');
    if (closeBtn) {
      var modal2 = closeBtn.closest('.universal-quiz__modal');
      closeModal(modal2);
      return;
    }
    var submitBtn = target.closest('[data-quiz-submit]');
    if (submitBtn) {
      var modal3 = submitBtn.closest('.universal-quiz__modal');
      if (modal3) {
        gradeModal(modal3);
        var root2 = modal3.closest('.universal-quiz');
        if (root2) {
          var hint = root2.querySelector('[data-quiz-hint]');
          if (hint) hint.textContent = 'Resultado guardado en el LMS.';
        }
      }
      return;
    }
    var restartBtn = target.closest('[data-quiz-restart]');
    if (restartBtn) {
      var modal4 = restartBtn.closest('.universal-quiz__modal');
      if (modal4) {
        modal4.querySelectorAll('input[type="radio"]').forEach(function(r) { r.checked = false; });
        modal4.querySelectorAll('[data-quiz-feedback]').forEach(function(el) { el.textContent = ''; });
        var res = modal4.querySelector('.universal-quiz__result');
        if (res) res.textContent = '';
        var root3 = modal4.closest('.universal-quiz');
        if (root3) {
          var h = root3.querySelector('[data-quiz-hint]');
          if (h) h.textContent = '';
        }
      }
      return;
    }
  });
})();
<\/script>`;

  // Remove external script tags inside quiz sections and add controller
  const cleaned = mainContent.replace(
    /(<div[^>]*class="[^"]*universal-quiz[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/gi,
    (match) => {
      // Remove script tags with src (external modules)
      const noExtScripts = match.replace(/<script[^>]+src\s*=\s*[^>]+>[\s\S]*?<\/script>/gi, '');
      // Remove inline scripts that have imports or Supabase references
      const noImportScripts = noExtScripts.replace(
        /<script>[\s\S]*?(?:import\s|supabase|getSupabase|quizProgress|saveQuizAttempt)[\s\S]*?<\/script>/gi,
        '',
      );
      return noImportScripts;
    },
  );

  return cleaned + '\n' + STANDALONE_QUIZ_JS;
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s*\|.*$/, '').trim() : 'Lección';
}

function extractBodyAttrs(html: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const m = html.match(/<body\s+([^>]*)>/i);
  if (m) {
    const re = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;
    let a: RegExpExecArray | null;
    while ((a = re.exec(m[1])) !== null) {
      attrs[a[1]] = a[2];
    }
  }
  return attrs;
}

function extractBodyStyle(html: string): string {
  const m = html.match(/<body[^>]*style=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

/** Convierte imágenes a base64 */
async function inlineImages(html: string, baseUrl: string): Promise<string> {
  const re = /<img[^>]*src="([^"]+)"[^>]*>/gi;
  const replacements: Array<{ full: string; url: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const url = m[1];
    if (url.startsWith('data:')) continue;
    const fullUrl = url.startsWith('http') ? url : new URL(url, baseUrl).href;
    replacements.push({ full: m[0], url: fullUrl });
  }
  for (const r of replacements) {
    try {
      const resp = await fetch(r.url);
      const blob = await resp.blob();
      const b64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      html = html.replace(r.full, r.full.replace(r.url, b64));
    } catch {
      // keep original
    }
  }
  return html;
}

async function fetchLessonHtml(baseUrl: string, lesson: SelectedLesson): Promise<string> {
  const url = `${baseUrl.replace(/\/+$/, '')}${lesson.lesson.href}`;
  const separator = url.includes('?') ? '&' : '?';
  const embedUrl = `${url}${separator}embed=true`;
  const resp = await fetch(embedUrl);
  if (!resp.ok) throw new Error(`Error fetching ${embedUrl}: ${resp.status}`);
  return resp.text();
}

function buildScoHtml(
  title: string,
  mainContent: string,
  allCss: string,
  inlineScripts: string,
  branding: CompileOptions['branding'],
  bodyAttrs: Record<string, string>,
  bodyStyle: string,
): string {
  const bgStyle = branding.background
    ? (/^#[0-9a-f]{3,6}$|^rgba?\(|^hsla?\(/i.test(branding.background)
        ? `background-color: ${branding.background}; background-image: none;`
        : `background-image: url("${branding.background}"); background-size: cover; background-position: center; background-attachment: fixed;`)
    : bodyStyle;

  const barBg = branding.barColor || '#2b1d1b';
  const barTx = branding.textColor || '#fdf6e9';

  const bodyAttrsStr = Object.entries(bodyAttrs)
    .filter(([k]) => k !== 'style')
    .map(([k, v]) => `${k}="${v.replace(/"/g, '&quot;')}"`)
    .join(' ');

  const studentScript = branding.studentName
    ? `<script>
(function(){
  var name = "${branding.studentName.replace(/"/g, '&quot;')}";
  var email = "${branding.studentEmail.replace(/"/g, '&quot;')}";
  if (window.API) {
    var lmsName = API.LMSGetValue('cmi.core.student_name');
    if (lmsName) name = lmsName;
  }
  document.body.setAttribute('data-student-name', name);
  var bar = document.getElementById('scormBarStudent');
  if (bar) {
    var n = bar.querySelector('.scorm-student-name');
    var e = bar.querySelector('.scorm-student-email');
    if (n) n.textContent = name;
    if (e) e.textContent = email;
  }
})();
<\/script>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <title>${title}</title>
  <script src="${SCORM_API_PATH}"><\/script>
  <style>
/* === SCORM wrapper styles === */
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; min-height: 100vh; }
.scorm-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 0.75rem; font-size: 0.85rem; font-weight: 700;
  background-color: ${barBg}; color: ${barTx};
}
.scorm-bar-left { display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
.scorm-bar-logo { width: 2rem; height: 2rem; object-fit: contain; border-radius: 0.5rem; }
.scorm-bar-institution { font-size: 0.65rem; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.06em; }
.scorm-bar-lesson { font-size: 0.8rem; font-weight: 800; }
.scorm-bar-right { display: flex; align-items: center; gap: 0.5rem; }
.scorm-student { font-size: 0.75rem; text-align: right; }
.scorm-student-name { font-weight: 800; }
.scorm-student-email { font-size: 0.65rem; opacity: 0.7; }
.scorm-content { max-width: 920px; margin: 0 auto; padding: 1.5rem 1rem; }
@media print { .scorm-bar { display: none; } }

/* === Site CSS (fetched + inline) === */
${allCss}
  </style>
  <script>
(function(){
  window.addEventListener('load', function(){
    if (window.API) {
      API.LMSInitialize();
      API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
    }
  });
  window.addEventListener('beforeunload', function(){
    if (window.API) {
      API.LMSSetValue('cmi.core.lesson_status', 'completed');
      API.LMSCommit();
    }
  });
})();
  <\/script>
  ${inlineScripts}
</head>
<body ${bodyAttrsStr} style="${bgStyle.replace(/"/g, '&quot;')}">
  <div class="scorm-bar">
    <div class="scorm-bar-left">
      ${branding.logoUrl ? `<img class="scorm-bar-logo" src="${branding.logoUrl}" alt=""/>` : '<span style="font-size:1.2rem">🏫</span>'}
      <div>
        ${branding.institution ? `<div class="scorm-bar-institution">${branding.institution}</div>` : ''}
        <div class="scorm-bar-lesson">${title}</div>
      </div>
    </div>
    ${branding.studentName
      ? `<div class="scorm-bar-right"><div class="scorm-student" id="scormBarStudent"><div class="scorm-student-name">${branding.studentName}</div><div class="scorm-student-email">${branding.studentEmail || ''}</div></div></div>`
      : ''}
  </div>
  <div class="scorm-content">
    ${mainContent}
  </div>
  ${studentScript}
</body>
</html>`;
}

async function buildSingleSco(
  zip: JSZip,
  sel: SelectedLesson,
  baseUrl: string,
  branding: CompileOptions['branding'],
  subdir: string | null,
): Promise<void> {
  const rawHtml = await fetchLessonHtml(baseUrl, sel);

  const mainContent = extractMainContent(rawHtml);
  const inlineBlocks = extractInlineStyles(rawHtml);
  const cssLinks = extractStylesheetLinks(rawHtml);
  const externalCss = await fetchExternalStyles(cssLinks, baseUrl);
  const allCss = [...inlineBlocks, externalCss].join('\n');
  const inlineScripts = extractInlineScripts(rawHtml);
  const title = extractTitle(rawHtml);
  const bodyAttrs = extractBodyAttrs(rawHtml);
  const bodyStyle = extractBodyStyle(rawHtml);

  // Transform quizzes: remove external module scripts, inject standalone controller
  const quizReadyContent = injectStandaloneQuizController(mainContent);

  let scoHtml = buildScoHtml(title, quizReadyContent, allCss, inlineScripts, branding, bodyAttrs, bodyStyle);
  scoHtml = await inlineImages(scoHtml, baseUrl);

  const path = subdir ? `${subdir}/index.html` : 'index.html';
  zip.file(path, scoHtml);
}

export async function buildScormZip(options: CompileOptions): Promise<void> {
  const { branding, selected, version, packagePerLesson, zipPrefix } = options;
  const baseUrl = branding.baseUrl || 'https://cafeycodigo.org';

  // Fetch SCORM API wrapper
  const apiResp = await fetch(SCORM_API_PATH);
  const apiCode = apiResp.ok ? await apiResp.text() : '';

  if (packagePerLesson) {
    for (const sel of selected) {
      const lessonZip = new JSZip();
      lessonZip.file(SCORM_API_PATH, apiCode);
      await buildSingleSco(lessonZip, sel, baseUrl, branding, null);
      const manifest = generateManifest([sel], version, extractTitle(
        await fetchLessonHtml(baseUrl, sel),
      ));
      lessonZip.file('imsmanifest.xml', manifest);
      const blob = await lessonZip.generateAsync({ type: 'blob' });
      const filename = `${zipPrefix || 'scorm'}-${sel.course.slug}-${sel.lesson.slug}.zip`;
      saveAs(blob, filename);
    }
  } else {
    const zip = new JSZip();
    zip.file(SCORM_API_PATH, apiCode);

    if (selected.length === 1) {
      await buildSingleSco(zip, selected[0], baseUrl, branding, null);
    } else {
      for (let i = 0; i < selected.length; i++) {
        const dir = `${String(i + 1).padStart(2, '0')}-${selected[i].lesson.slug}`;
        await buildSingleSco(zip, selected[i], baseUrl, branding, dir);
      }
    }

    const courseName = selected[0]?.course.name ?? 'scorm';
    const manifest = generateManifest(selected, version, courseName);
    zip.file('imsmanifest.xml', manifest);

    const blob = await zip.generateAsync({ type: 'blob' });
    const filename = `${zipPrefix || 'scorm'}-${selected[0]?.course.slug ?? 'package'}.zip`;
    saveAs(blob, filename);
  }
}
