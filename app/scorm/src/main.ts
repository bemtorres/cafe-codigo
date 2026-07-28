import './style.css';
import { courses } from './data/courses';
import type { Course, SelectedLesson, CompileOptions, ScormBranding } from './lib/types';
import { buildScormZip } from './lib/buildScormZip';

/* ---- State ---- */
const selected = new Map<string, SelectedLesson>();
let compiling = false;

/* ---- DOM refs ---- */
const $ = (id: string) => document.getElementById(id)!;

/* ---- Render catalog ---- */
function renderCatalog() {
  const container = $('catalog');
  container.innerHTML = '';

  for (const course of courses) {
    if (!course.lessons?.length) continue;

    const card = document.createElement('div');
    card.className = 'course-card';

    const header = document.createElement('div');
    header.className = 'course-header';

    const colorDot = document.createElement('span');
    colorDot.className = 'color-dot';
    colorDot.style.backgroundColor = course.color;

    const name = document.createElement('span');
    name.className = 'course-name';
    name.textContent = course.name;

    const count = document.createElement('span');
    count.className = 'lesson-count';
    count.textContent = `${course.lessons.length} lecciones`;

    const toggleAll = document.createElement('button');
    toggleAll.type = 'button';
    toggleAll.className = 'btn btn-xs';
    toggleAll.textContent = '☐ todo';
    toggleAll.addEventListener('click', () => {
      const allSelected = course.lessons.every((l) =>
        selected.has(key(course, l)),
      );
      for (const lesson of course.lessons) {
        const k = key(course, lesson);
        if (allSelected) selected.delete(k);
        else selected.set(k, { course, lesson });
      }
      toggleAll.textContent = allSelected ? '☐ todo' : '☑ todo';
      renderCatalog();
      updateSummary();
    });

    header.append(colorDot, name, count, toggleAll);

    const lessonList = document.createElement('div');
    lessonList.className = 'lesson-list';

    for (const lesson of course.lessons) {
      const k = key(course, lesson);
      const isSel = selected.has(k);

      const item = document.createElement('label');
      item.className = `lesson-item${isSel ? ' selected' : ''}`;

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = isSel;
      cb.addEventListener('change', () => {
        if (cb.checked) selected.set(k, { course, lesson });
        else selected.delete(k);
        item.classList.toggle('selected', cb.checked);
        updateSummary();
        // update "todo" button text
        const allSel = course.lessons.every((l) => selected.has(key(course, l)));
        toggleAll.textContent = allSel ? '☑ todo' : '☐ todo';
      });

      const title = document.createElement('span');
      title.className = 'lesson-title';
      title.textContent = lesson.title;

      item.append(cb, title);
      lessonList.append(item);
    }

    card.append(header, lessonList);
    container.append(card);
  }
}

function key(c: Course, l: { slug: string }) {
  return `${c.slug}::${l.slug}`;
}

/* ---- Summary ---- */
function updateSummary() {
  const el = $('selectedCount');
  const total = selected.size;
  el.textContent = `${total} lección${total !== 1 ? 'es' : ''} seleccionada${total !== 1 ? 's' : ''}`;

  const compileBtn = $('compileBtn') as HTMLButtonElement;
  compileBtn.disabled = total === 0 || compiling;

  // Show selected list
  const list = $('selectedList');
  list.innerHTML = '';
  const entries = Array.from(selected.values());
  entries.sort((a, b) => a.course.name.localeCompare(b.course.name) || a.lesson.title.localeCompare(b.lesson.title));

  const seen = new Set<string>();
  for (const s of entries) {
    if (!seen.has(s.course.slug)) {
      seen.add(s.course.slug);
      const h = document.createElement('div');
      h.className = 'sel-course';
      h.textContent = s.course.name;
      list.append(h);
    }
    const li = document.createElement('div');
    li.className = 'sel-lesson';
    li.textContent = s.lesson.title;
    list.append(li);
  }
}

/* ---- Compile ---- */
async function handleCompile() {
  if (selected.size === 0 || compiling) return;

  const branding: ScormBranding = {
    institution: ($('brandInstitution') as HTMLInputElement).value,
    studentName: ($('brandStudentName') as HTMLInputElement).value,
    studentEmail: ($('brandStudentEmail') as HTMLInputElement).value,
    logoUrl: ($('brandLogo') as HTMLInputElement).value,
    background: ($('brandBackground') as HTMLInputElement).value,
    barColor: ($('brandBarColor') as HTMLInputElement).value || '#2b1d1b',
    textColor: ($('brandTextColor') as HTMLInputElement).value || '#fdf6e9',
    baseUrl: ($('brandBaseUrl') as HTMLInputElement).value || 'https://cafeycodigo.org',
  };

  const versionSelect = $('scormVersion') as HTMLSelectElement;
  const packageMode = $('packageMode') as HTMLSelectElement;

  const options: CompileOptions = {
    branding,
    selected: Array.from(selected.values()),
    version: versionSelect.value as '1.2' | '2004',
    packagePerLesson: packageMode.value === 'per-lesson',
    zipPrefix: ($('zipPrefix') as HTMLInputElement).value || 'cafeycodigo',
  };

  compiling = true;
  const compileBtn = $('compileBtn') as HTMLButtonElement;
  compileBtn.disabled = true;
  compileBtn.textContent = 'Compilando...';
  $('progressArea').classList.remove('hidden');
  $('progressText').textContent = 'Obteniendo lecciones...';

  try {
    await buildScormZip(options);
    $('progressText').textContent = '¡Completado! Los archivos se han descargado.';
  } catch (err) {
    $('progressText').textContent = `Error: ${err instanceof Error ? err.message : String(err)}`;
    console.error(err);
  } finally {
    compiling = false;
    compileBtn.disabled = selected.size === 0;
    compileBtn.textContent = 'Compilar SCORM';
  }
}

/* ---- Handle preset buttons ---- */
function applyPreset(preset: string) {
  const fields: Record<string, string> = {
    clean: '',
    noquiz: '',
    pdf: '',
    student: '',
  };

  switch (preset) {
    case 'clean':
      ($('brandInstitution') as HTMLInputElement).value = '';
      ($('brandStudentName') as HTMLInputElement).value = '';
      ($('brandStudentEmail') as HTMLInputElement).value = '';
      ($('brandLogo') as HTMLInputElement).value = '';
      ($('brandBackground') as HTMLInputElement).value = '';
      ($('brandBarColor') as HTMLInputElement).value = '#2b1d1b';
      ($('brandTextColor') as HTMLInputElement).value = '#fdf6e9';
      break;
    case 'noquiz':
      // Just a visual hint - quiz stripping happens in buildScormZip
      break;
    case 'student':
      ($('brandStudentName') as HTMLInputElement).value = '{{student_name}}';
      ($('brandStudentEmail') as HTMLInputElement).value = '{{student_email}}';
      break;
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateSummary();

  $('compileBtn').addEventListener('click', handleCompile);

  // Branding color previews
  const barColor = $('brandBarColor') as HTMLInputElement;
  const textColor = $('brandTextColor') as HTMLInputElement;
  const barPreview = $('barPreview');

  function updateBarPreview() {
    barPreview.style.backgroundColor = barColor.value;
    barPreview.style.color = textColor.value;
  }
  barColor.addEventListener('input', updateBarPreview);
  textColor.addEventListener('input', updateBarPreview);

  // Logo preview
  const logoInput = $('brandLogo') as HTMLInputElement;
  const logoPreview = $('logoPreview') as HTMLImageElement;
  logoInput.addEventListener('input', () => {
    logoPreview.src = logoInput.value || '';
    logoPreview.style.display = logoInput.value ? 'block' : 'none';
  });

  // Presets
  document.querySelectorAll('[data-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      applyPreset((btn as HTMLElement).dataset.preset!);
    });
  });

  // Select all / none
  $('selectAll').addEventListener('click', () => {
    for (const course of courses) {
      for (const lesson of course.lessons) {
        selected.set(key(course, lesson), { course, lesson });
      }
    }
    renderCatalog();
    updateSummary();
  });

  $('selectNone').addEventListener('click', () => {
    selected.clear();
    renderCatalog();
    updateSummary();
  });
});
