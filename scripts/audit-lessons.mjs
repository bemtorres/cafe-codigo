/**
 * Auditoría heurística de lecciones bajo src/pages/course/[course]/[lesson]/index.astro
 * frente a las convenciones del README (CodeBlock, quiz, sección "Ponte a prueba").
 *
 * Uso: node scripts/audit-lessons.mjs
 * Salida: tabla en stdout; código de salida 0 (avisos informativos, no falla CI).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');
const courseRoot = path.join(repoRoot, 'src', 'pages', 'course');

function walkAstroFiles(dir) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) out.push(...walkAstroFiles(p));
    else if (name.name === 'index.astro') out.push(p);
  }
  return out;
}

/** @param {string} absPath */
function isCourseHome(absPath) {
  const rel = path.relative(courseRoot, absPath).replace(/\\/g, '/');
  const parts = rel.split('/');
  return parts.length === 2 && parts[1] === 'index.astro';
}

/** @param {string} text */
function hasPonteSection(text) {
  return /Ponte a prueba/i.test(text) || /Ponte a Prueba/i.test(text);
}

function main() {
  const files = walkAstroFiles(courseRoot).filter((f) => !isCourseHome(f));
  /** @type {{ rel: string; codeBlock: boolean; quiz: boolean; ponte: boolean; lines: number }[]} */
  const rows = [];

  for (const abs of files) {
    const text = fs.readFileSync(abs, 'utf8');
    const rel = path.relative(repoRoot, abs).replace(/\\/g, '/');
    rows.push({
      rel,
      codeBlock: /\bCodeBlock\b/.test(text),
      quiz: /\bquizKey\s*=/.test(text) || /QuizModal/.test(text),
      ponte: hasPonteSection(text),
      lines: text.split(/\r?\n/).length,
    });
  }

  const missingCode = rows.filter((r) => !r.codeBlock);
  const missingQuiz = rows.filter((r) => !r.quiz);
  const missingPonte = rows.filter((r) => !r.ponte);

  console.log(`Lecciones analizadas (excl. portadas /index.astro): ${rows.length}\n`);
  console.log('--- Resumen ---');
  console.log(`Sin referencia a CodeBlock:     ${missingCode.length}`);
  console.log(`Sin quiz (quizKey / QuizModal): ${missingQuiz.length}`);
  console.log(`Sin mención «Ponte a prueba»:   ${missingPonte.length}`);

  const printList = (title, list) => {
    if (list.length === 0) return;
    console.log(`\n--- ${title} (${list.length}) ---`);
    for (const r of list.sort((a, b) => a.rel.localeCompare(b.rel))) {
      console.log(`  ${r.rel}`);
    }
  };

  printList('Revisar: sin CodeBlock', missingCode);
  printList('Revisar: sin quiz', missingQuiz);
  printList('Revisar: sin «Ponte a prueba»', missingPonte);

  console.log('\nNota: algunas lecciones usan Sandpack u otros bloques en lugar de CodeBlock; revisar manualmente.');
}

main();
