import type { APIRoute } from 'astro';
import { BRANDING_COURSE } from '../../../data/courses/brandingCourseDemoData';

export const GET: APIRoute = () => Response.json(BRANDING_COURSE);
