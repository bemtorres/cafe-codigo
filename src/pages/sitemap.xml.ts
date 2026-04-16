import type { APIRoute } from 'astro';
import { courses } from '../data/courses';

const SITE = 'https://cafeycodigo.org';

// Páginas estáticas públicas (excluye /admin, /panel, /cuenta)
const STATIC_PAGES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/',                    priority: '1.0', changefreq: 'daily'   },
  { path: '/cursos/',             priority: '0.9', changefreq: 'weekly'  },
  { path: '/academia/',           priority: '0.8', changefreq: 'monthly' },
  { path: '/cafe-del-dia/',       priority: '0.7', changefreq: 'daily'   },
  { path: '/colaboradores/',      priority: '0.6', changefreq: 'monthly' },
  { path: '/ejercicios/',         priority: '0.7', changefreq: 'weekly'  },
  { path: '/ejercicios/unidad-1/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ejercicios/unidad-2/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ejercicios/unidad-3/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ejercicios/unidad-4/', priority: '0.6', changefreq: 'monthly' },
];

function urlEntry(path: string, priority: string, changefreq: string): string {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = () => {
  const entries: string[] = [];

  // Páginas estáticas
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry(page.path, page.priority, page.changefreq));
  }

  // Cursos disponibles: índice + lecciones
  for (const course of courses) {
    if (course.status !== 'available') continue;

    entries.push(urlEntry(`/course/${course.slug}/`, '0.8', 'weekly'));

    for (const lesson of course.lessons ?? []) {
      entries.push(urlEntry(lesson.href, '0.6', 'monthly'));
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
