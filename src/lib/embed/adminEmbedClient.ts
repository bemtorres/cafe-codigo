import { buildEmbedUrl } from './buildEmbedUrl';

type CourseLite = {
  slug: string;
  name: string;
  lessons?: Array<{ title: string; href: string }>;
};

function $(id: string) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}

function norm(s: unknown) {
  return String(s || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function escapeAttr(s: unknown) {
  return String(s).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;');
}

const courses = JSON.parse(($('coursesJson') as HTMLScriptElement).textContent || '[]') as CourseLite[];

const courseSel = $('embCourse') as HTMLSelectElement;
const searchInp = $('embSearch') as HTMLInputElement;

const pEmbed = $('pEmbed') as HTMLInputElement;
const pQuiz = $('pQuiz') as HTMLInputElement;
const pPdf = $('pPdf') as HTMLInputElement;
const pTitle = $('pTitle') as HTMLInputElement;
const pName = $('pName') as HTMLInputElement;
const pEmail = $('pEmail') as HTMLInputElement;
const pLogo = $('pLogo') as HTMLInputElement;
const pBackground = $('pBackground') as HTMLInputElement; // hidden final value
const pBackgroundUrl = document.getElementById('pBackgroundUrl') as HTMLInputElement | null;
const pBackgroundColor = document.getElementById('pBackgroundColor') as HTMLInputElement | null;
const pColor = $('pColor') as HTMLInputElement;
const pText = document.getElementById('pText') as HTMLInputElement | null;

const lessonsList = $('lessonsList');
const listMeta = $('listMeta');

const logoPrev = $('logoPrev') as HTMLImageElement;
const logoPrevFallback = $('logoPrevFallback');
const headerPrev = document.getElementById('headerPrev') as HTMLElement | null;
const pageBgPrev = document.getElementById('pageBgPrev') as HTMLElement | null;
const pColorHex = document.getElementById('pColorHex');
const pTextHex = document.getElementById('pTextHex');
const pBackgroundHex = document.getElementById('pBackgroundHex');

function applyPreview() {
  const logo = pLogo.value.trim();
  if (logo) {
    logoPrev.classList.add('hidden');
    logoPrevFallback.textContent = '🏫';
    logoPrevFallback.classList.remove('hidden');
    logoPrev.onload = () => {
      logoPrev.classList.remove('hidden');
      logoPrevFallback.classList.add('hidden');
    };
    logoPrev.onerror = () => {
      logoPrev.classList.add('hidden');
      logoPrevFallback.textContent = '🏫';
      logoPrevFallback.classList.remove('hidden');
    };
    logoPrev.src = logo;
  } else {
    logoPrev.classList.add('hidden');
    logoPrevFallback.textContent = '🏫';
    logoPrevFallback.classList.remove('hidden');
  }

  // background (página): si el admin usa URL o color picker, consolidamos en pBackground (hidden)
  if (pBackgroundUrl && pBackgroundUrl.value.trim()) {
    if (pBackgroundColor) pBackgroundColor.value = '#ffffff';
    pBackground.value = pBackgroundUrl.value.trim();
  } else if (pBackgroundColor && pBackgroundColor.value) {
    pBackground.value = pBackgroundColor.value;
  }

  const bg = pBackground.value.trim();
  const headerBg = pColor.value.trim();
  const headerText = (pText?.value || '').trim();

  // Preview cabecera
  if (headerPrev) {
    headerPrev.style.backgroundImage = '';
    headerPrev.style.backgroundColor = headerBg || '';
    headerPrev.style.color = headerText || '';
  }

  // Preview fondo página
  if (pageBgPrev) {
    pageBgPrev.style.backgroundImage = '';
    pageBgPrev.style.backgroundColor = '';
    if (bg) {
      const isColor = /^#([0-9a-fA-F]{3,8})$/.test(bg) || /^rgba?\(/i.test(bg) || /^hsla?\(/i.test(bg);
      if (isColor) {
        pageBgPrev.style.backgroundColor = bg;
      } else {
        pageBgPrev.style.backgroundImage = `url("${bg}")`;
        pageBgPrev.style.backgroundSize = 'cover';
        pageBgPrev.style.backgroundPosition = 'center';
        pageBgPrev.style.backgroundRepeat = 'no-repeat';
      }
    }
  }

  if (pColorHex) pColorHex.textContent = pColor.value;
  if (pTextHex && pText) pTextHex.textContent = pText.value;
  if (pBackgroundHex && pBackgroundColor) pBackgroundHex.textContent = pBackgroundColor.value;
}

function buildParams() {
  return {
    embed: pEmbed.checked,
    quiz: pQuiz.checked,
    pdf: pPdf.checked,
    title: pTitle.value,
    name: pName.value,
    email: pEmail.value,
    logo: pLogo.value,
    background: pBackground.value,
    color: pColor.value,
    text: pText?.value || '',
  };
}

function renderList() {
  const origin = window.location.origin;
  const params = buildParams();
  const courseFilter = courseSel.value || '';
  const q = norm(searchInp.value || '');

  lessonsList.innerHTML = '';
  let count = 0;

  for (const c of courses) {
    if (courseFilter && c.slug !== courseFilter) continue;
    const lessons = Array.isArray(c.lessons) ? c.lessons : [];

    for (const l of lessons) {
      const hay = norm(`${c.slug} ${c.name} ${l.title} ${l.href}`);
      if (q && !hay.includes(q)) continue;

      const url = buildEmbedUrl(origin, l.href, params);
      const tr = document.createElement('tr');
      tr.className = 'border-t border-border/60 align-top';
      tr.innerHTML = `
        <td class="px-2 py-1 align-top font-nunito font-black text-[10px] leading-snug text-textPrimary">
          <span class="line-clamp-2 break-words">${escapeAttr(c.name)}</span>
          <span class="block font-extrabold text-textMuted">(${escapeAttr(c.slug)})</span>
        </td>
        <td class="px-2 py-1 align-top min-w-0">
          <div class="font-nunito font-black text-[11px] leading-tight text-textPrimary line-clamp-2">${escapeAttr(l.title)}</div>
          <div class="mt-0.5 font-nunito font-bold text-[9px] leading-tight text-textMuted break-all opacity-90">${escapeAttr(l.href)}</div>
        </td>
        <td class="min-w-0 px-2 py-1 align-top">
          <input class="w-full min-w-0 rounded border border-border bg-white px-1.5 py-1 font-mono text-[9px] leading-snug" value="${escapeAttr(
            url,
          )}" readonly />
        </td>
        <td class="px-2 py-1 align-top whitespace-nowrap">
          <button
            type="button"
            class="copyRowBtn cursor-pointer rounded-md border-2 border-border bg-success px-2 py-0.5 font-nunito text-[10px] font-black text-white shadow-neo hover:-translate-y-px"
            data-copy="${escapeAttr(url)}"
          >Copiar</button>
        </td>
      `;
      lessonsList.appendChild(tr);
      count++;
    }
  }

  listMeta.textContent = count ? `${count} enlace(s) generado(s).` : 'No hay lecciones para ese filtro.';
}

function setPreset(kind: string | null) {
  pEmbed.checked = true;
  pQuiz.checked = true;
  pPdf.checked = false;
  if (kind === 'noquiz') pQuiz.checked = false;
  if (kind === 'pdf') pPdf.checked = true;
  if (kind === 'student') {
    pTitle.value ||= 'INSTITUCIÓN';
    pName.value ||= 'NOMBRE';
    pEmail.value ||= 'CORREO';
  }
}

document.addEventListener('click', (e) => {
  const presetBtn = (e.target as HTMLElement | null)?.closest?.('[data-preset]') as HTMLElement | null;
  if (!presetBtn) return;
  setPreset(presetBtn.getAttribute('data-preset'));
  applyPreview();
  renderList();
});

courseSel.addEventListener('change', renderList);
searchInp.addEventListener('input', renderList);

[
  pEmbed,
  pQuiz,
  pPdf,
  pTitle,
  pName,
  pEmail,
  pLogo,
  pBackground,
  pColor,
  ...(pText ? [pText] : []),
  ...(pBackgroundUrl ? [pBackgroundUrl] : []),
  ...(pBackgroundColor ? [pBackgroundColor] : []),
].forEach((el) => {
  el.addEventListener('input', () => {
    applyPreview();
    renderList();
  });
  el.addEventListener('change', () => {
    applyPreview();
    renderList();
  });
});

document.addEventListener('click', async (e) => {
  const btn = (e.target as HTMLElement | null)?.closest?.('.copyRowBtn') as HTMLElement | null;
  if (!btn) return;
  const text = btn.getAttribute('data-copy') || '';
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = 'Copiado';
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    btn.textContent = 'Copiado';
  }
  setTimeout(() => (btn.textContent = 'Copiar'), 900);
});

applyPreview();
renderList();

