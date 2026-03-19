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
      { slug: 'metodologia', title: 'Metodología', href: '/pseint/metodologia/' },
      { slug: 'variables', title: 'Variables', href: '/pseint/variables/' },
      { slug: 'leer', title: 'Leer', href: '/pseint/leer/' },
      { slug: 'matematicas', title: 'Matemáticas', href: '/pseint/matematicas/' },
      { slug: 'condicionales', title: 'Si (Condicionales)', href: '/pseint/condicionales/' },
      { slug: 'repeticion', title: 'Repetición (Bucles)', href: '/pseint/repeticion/' },
      { slug: 'simulador', title: 'Simulador', href: '/pseint/simulador/' },
      { slug: 'ayuda', title: 'Ayuda / Guía', href: '/pseint/ayuda/' },
    ],
  },
  // {
  //   slug: 'ejercicios',
  //   name: 'Ejercicios para programar',
  //   description: 'Colección de ejercicios por unidades para practicar lógica y decisiones (con checklist de progreso local).',
  //   status: 'available',
  //   color: '#EF476F',
  //   lessons: [
  //     { slug: 'unidad-1', title: 'Unidad 1 (EPS)', href: '/ejercicios/unidad-1/' },
  //     { slug: 'unidad-2', title: 'Unidad 2 (Si)', href: '/ejercicios/unidad-2/' },
  //     { slug: 'unidad-3', title: 'Unidad 3 (Avanzados)', href: '/ejercicios/unidad-3/' },
  //     { slug: 'unidad-4', title: 'Unidad 4 (Guía)', href: '/ejercicios/unidad-4/' },
  //   ],
  // },
  {
    slug: 'c#',
    name: 'C#',
    description: 'Aprende a programar en C# con ejercicios prácticos y sin complicaciones.',
    status: 'coming',
    color: '#0078D4',
    // lessons: [
    //   { slug: 'introduccion', title: 'Introducción', href: '/c#/introduccion/' },
    //   { slug: 'variables', title: 'Variables', href: '/c#/variables/' },
    //   { slug: 'leer', title: 'Leer', href: '/c#/leer/' },
    //   { slug: 'matematicas', title: 'Matemáticas', href: '/c#/matematicas/' },
    //   { slug: 'condicionales', title: 'Si (Condicionales)', href: '/c#/condicionales/' },
    //   { slug: 'simulador', title: 'Simulador', href: '/c#/simulador/' },
    //   { slug: 'ayuda', title: 'Ayuda / Guía', href: '/c#/ayuda/' },
    // ],
  },
  {
    slug: 'html-css',
    name: 'Html y CSS',
    description: 'Aprende a programar en Html y CSS con ejercicios prácticos y sin complicaciones.',
    status: 'coming',
    color: '#FFD700',
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
