export type CourseStatus = 'available' | 'coming';

export interface Course {
  slug: string;
  name: string;
  description: string;
  status: CourseStatus;
  color: string;
  lessons?: { slug: string; title: string; href: string }[];
}

export const courses: Course[] = [
  {
    slug: 'pseint',
    name: 'PSeInt',
    description: 'Aprende la lógica de programación con pseudocódigo en español. Ideal para principiantes.',
    status: 'available',
    color: '#34d399',
    lessons: [
      { slug: 'introduccion', title: 'Introducción', href: '/pseint/introduccion/' },
      { slug: 'variables', title: 'Variables', href: '/pseint/variables/' },
      { slug: 'leer', title: 'Leer', href: '/pseint/leer/' },
      { slug: 'matematicas', title: 'Matemáticas', href: '/pseint/matematicas/' },
      { slug: 'condicionales', title: 'Si (Condicionales)', href: '/pseint/condicionales/' },
      { slug: 'simulador', title: 'Simulador', href: '/pseint/simulador/' },
      { slug: 'ayuda', title: 'Ayuda / Guía', href: '/pseint/ayuda/' },
    ],
  },
  {
    slug: 'python',
    name: 'Python',
    description: 'Lenguaje moderno, versátil y perfecto para empezar en programación real.',
    status: 'coming',
    color: '#3b82f6',
  },
  {
    slug: 'java',
    name: 'Java',
    description: 'Lenguaje robusto y multiplataforma, muy usado en desarrollo empresarial.',
    status: 'coming',
    color: '#f59e0b',
  },
];
