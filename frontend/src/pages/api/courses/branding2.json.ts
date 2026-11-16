import type { APIRoute } from 'astro';
import { DJANGO_GUIDE_COURSE } from '../../../data/courses/djangoGuideCourse';

export const GET: APIRoute = () => Response.json(DJANGO_GUIDE_COURSE);
