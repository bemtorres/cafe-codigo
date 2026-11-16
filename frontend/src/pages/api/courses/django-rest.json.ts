import type { APIRoute } from 'astro';
import { DJANGO_REST_COURSE } from '../../../data/courses/djangoRestCourse';

export const GET: APIRoute = () => Response.json(DJANGO_REST_COURSE);
