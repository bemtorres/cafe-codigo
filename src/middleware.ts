import { defineMiddleware } from 'astro:middleware';
import { courses } from './data/courses';

const COURSE_SLUGS = new Set(courses.map((c) => c.slug));

/**
 * Redirige URLs antiguas /[slug]/… → /course/[slug]/… (mismo path tras el prefijo).
 */
export const onRequest = defineMiddleware((context, next) => {
  const path = context.url.pathname;
  if (path.startsWith('/course/')) return next();
  const first = path.split('/').filter(Boolean)[0];
  if (!first || !COURSE_SLUGS.has(first)) return next();
  const dest = new URL(context.url);
  dest.pathname = `/course${path === '/' ? '' : path}`;
  return context.redirect(dest.toString(), 301);
});
