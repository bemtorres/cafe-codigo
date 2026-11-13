import type { APIRoute, GetStaticPaths } from 'astro';
import { courses, type Course } from '../../../../data/courses';
import type { CourseContenido, CourseDocumentJSON, CourseLession, DocumentResource } from '../../../../data/courses/courseJsonTypes';
import { DJANGO_GUIDE_COURSE } from '../../../../data/courses/djangoGuideCourse';
import { courseHomePath } from '../../../../lib/coursePaths';
import { getCoursePractice } from '../../../../lib/coursePractice';

export const getStaticPaths = (() => courses.filter((course) => course.status === 'available')
  .map((course) => ({ params: { slug: course.slug }, props: { course } }))) satisfies GetStaticPaths;

function resourceBlock(id: string, title: string, resources: DocumentResource[]): CourseContenido {
  return {
    id,
    title,
    widget: {
      id,
      type: 'document-resources',
      componentName: 'WidgetDocumentResources',
      summary: title,
      data: { title, resources },
    },
  };
}

export const GET: APIRoute = ({ props }) => {
  const { course } = props as { course: Course };
  const lessons = course.lessons ?? [];
  const practice = getCoursePractice(course);
  const lessions: CourseLession[] = [{
    id: 'presentacion',
    title: 'Presentación',
    secciones: [{
      id: 'bienvenida',
      title: 'Acerca del curso',
      contenidos: [{
        id: 'presentacion-curso',
        title: course.name,
        widget: {
          id: 'presentacion-curso',
          type: 'rich-text-editorial',
          componentName: 'WidgetRichTextEditorial',
          summary: 'Presentación editable del curso',
          data: {
            badge: 'Café y Código',
            title: course.name,
            htmlContent: `<p>${course.description.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</p>`,
          },
        },
      }],
    }],
  }, {
    id: 'temario',
    title: 'Temario',
    secciones: lessons.length ? lessons.map((lesson, index) => ({
      id: `leccion-${index + 1}`,
      title: lesson.title,
      contenidos: [resourceBlock(`recurso-${index + 1}`, lesson.title, [{
        id: 'abrir-leccion', title: 'Abrir lección', url: lesson.href, action: 'open',
      }])],
    })) : [{
      id: 'contenidos',
      title: 'Contenidos del curso',
      contenidos: [resourceBlock('recurso-curso', course.name, [{
        id: 'abrir-curso', title: 'Abrir curso', url: courseHomePath(course.slug), action: 'open',
      }])],
    }],
  }];

  if (practice.length) lessions.push({
    id: 'ejercicios',
    title: 'Ejercicios',
    secciones: [{
      id: 'practicas',
      title: 'Prácticas del curso',
      contenidos: [resourceBlock('recurso-ejercicios', 'Ejercicios', practice.map((item, index) => ({
        id: `practica-${index + 1}`,
        title: item.title,
        description: item.embedded ? 'Dentro de la lección' : undefined,
        url: item.href,
        action: 'open',
      })))],
    }],
  });

  const document: CourseDocumentJSON = {
    courseId: `app-catalog-${course.slug}`,
    version: '1.0.0',
    title: course.name,
    institution: 'Café y Código',
    defaultBrandId: 'cafeycodigo',
    showScoreInBanner: false,
    modulos: [
      { id: 'curso', title: course.name, lessions },
      ...(course.slug === 'django' ? DJANGO_GUIDE_COURSE.modulos : []),
    ],
  };
  return Response.json(document);
};
