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
    slug: 'csharp',
    name: 'C#',
    description: 'Aprende a programar en C# desde cero hasta Orientado a Objetos (POO).',
    status: 'available',
    color: '#9B4F96',
    lessons: [
      { slug: 'introduccion', title: '1. Introducción', href: '/csharp/introduccion/' },
      { slug: 'variables', title: '2. Variables', href: '/csharp/variables/' },
      { slug: 'io', title: '3. Entrada / Salida', href: '/csharp/io/' },
      { slug: 'operadores', title: '4. Operadores', href: '/csharp/operadores/' },
      { slug: 'condicionales', title: '5. Condicionales', href: '/csharp/condicionales/' },
      { slug: 'ciclos', title: '6. Ciclos', href: '/csharp/ciclos/' },
      { slug: 'colecciones', title: '7. Arreglos y Listas', href: '/csharp/colecciones/' },
      { slug: 'funciones', title: '8. Funciones', href: '/csharp/funciones/' },
      { slug: 'poo-basico', title: '9. POO Básico', href: '/csharp/poo-basico/' },
      { slug: 'poo-pilares', title: '10. Pilares POO', href: '/csharp/poo-pilares/' },
    ],
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
    status: 'available',
    color: '#E76F00',
    lessons: [
      { slug: 'introduccion', title: '1. Introducción', href: '/java/introduccion/' },
      { slug: 'variables', title: '2. Variables', href: '/java/variables/' },
      { slug: 'io', title: '3. Entrada / Salida', href: '/java/io/' },
      { slug: 'operadores', title: '4. Operadores', href: '/java/operadores/' },
      { slug: 'condicionales', title: '5. Condicionales', href: '/java/condicionales/' },
      { slug: 'ciclos', title: '6. Ciclos', href: '/java/ciclos/' },
      { slug: 'colecciones', title: '7. Arreglos y Listas', href: '/java/colecciones/' },
      { slug: 'funciones', title: '8. Funciones', href: '/java/funciones/' },
      { slug: 'poo-basico', title: '9. POO Básico', href: '/java/poo-basico/' },
      { slug: 'poo-pilares', title: '10. Pilares POO', href: '/java/poo-pilares/' },
    ],
  },
];
