import type { CourseDocumentJSON } from '../data/courses/courseJsonTypes';

const API_BASE_URL = import.meta.env.PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api';

/**
 * Obtiene el token de autenticación del usuario guardado en el navegador
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('cafeycodigo_token');
}

/**
 * Guarda el token de autenticación
 */
export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cafeycodigo_token', token);
  }
}

/**
 * Guarda o actualiza un curso en el backend NestJS con PostgreSQL
 */
export async function saveCourseToBackend(document: CourseDocumentJSON, revision?: string) {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ document, revision }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al guardar el curso en el backend');
  }

  return data;
}

/**
 * Carga el documento completo del curso desde PostgreSQL vía NestJS
 */
export async function fetchCourseFromBackend(courseId: string, signal?: AbortSignal) {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
    cache: 'no-store',
    signal,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'No se pudo obtener el curso del servidor');
  }

  return data.document as CourseDocumentJSON;
}

/**
 * Registra el avance de un estudiante en un contenido/widget
 */
export async function markContentCompletedInBackend(
  courseId: string,
  moduleId: string,
  lessionId: string,
  seccionId: string,
  contenidoId: string,
) {
  const token = getAuthToken();
  if (!token) return null; // Modo invitado / sin sesión

  const response = await fetch(`${API_BASE_URL}/progress/${courseId}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ moduleId, lessionId, seccionId, contenidoId }),
  });

  return response.json();
}

/**
 * Registra la puntuación de un cuestionario o reto interactivo
 */
export async function submitQuizScoreToBackend(
  courseId: string,
  widgetId: string,
  score: number,
  maxScore: number,
  isPassed: boolean,
  details?: Record<string, any>,
) {
  const token = getAuthToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/progress/${courseId}/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ widgetId, score, maxScore, isPassed, details }),
  });

  return response.json();
}

