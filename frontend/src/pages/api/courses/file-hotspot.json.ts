import type { APIRoute } from 'astro';
import { FILE_HOTSPOT_DEMO } from '../../../data/courses/fileHotspotDemo';

export const GET: APIRoute = () => Response.json(FILE_HOTSPOT_DEMO);
