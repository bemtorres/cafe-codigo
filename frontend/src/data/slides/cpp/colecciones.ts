import type { Slide } from '../../../types/slides';

export const coleccionesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7. Colecciones y Arreglos en C++ 📚',
    subtitle: 'Almacenar múltiples elementos en memoria contigua: Del arreglo fijo a la STL',
    badge: 'C++ · Lección 7',
    content: 'Hasta ahora cada variable guardaba un solo dato. Las colecciones permiten agrupar cientos o millones de elementos bajo un único identificador.',
    bulletPoints: [
      '🧱 Memoria contigua: Los elementos viven pegados uno al lado del otro en la RAM',
      '0️⃣ ¿Por qué el primer elemento es el índice 0? (La matemática del desplazamiento)',
      '⚖️ Arreglos Fijos vs std::vector dinámico: Dos mundos en C++',
      '🚀 La Standard Template Library (STL) y sus contenedores esenciales'
    ],
    keyTakeaway: 'Una colección es una fila de casilleros de memoria reservados consecutivamente para guardar datos del mismo tipo.'
  },
  {
    id: 2,
    type: 'concept',
    title: '¿Por qué los arreglos empiezan en el Índice 0?',
    badge: 'La Razón en Hardware',
    content: 'Muchos estudiantes se preguntan por qué no empezamos en 1. En C++, el índice no es un ordinal, ¡es una distancia matemática!',
    visualChart: {
      headers: ['Índice', 'Dirección de Memoria (Offset)', 'Fórmula Interna de C++'],
      rows: [
        ['array[0]', 'Inicio exacto del arreglo', 'direccion_base + (0 * sizeof(tipo))'],
        ['array[1]', 'Avanzar 1 casillero completo', 'direccion_base + (1 * sizeof(tipo))'],
        ['array[2]', 'Avanzar 2 casilleros completos', 'direccion_base + (2 * sizeof(tipo))'],
        ['array[i]', 'Avanzar i casilleros', 'direccion_base + (i * sizeof(tipo))']
      ]
    },
    keyTakeaway: 'El índice 0 significa: "Cero pasos de distancia desde el inicio del arreglo".'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'Arreglos Tradicionales vs std::vector',
    badge: 'Comparativa Fundamental',
    content: 'C++ ofrece dos formas principales de almacenar colecciones:',
    visualChart: {
      headers: ['Característica', 'Arreglo Tradicional (int arr[N])', 'std::vector<int> (Moderno)'],
      rows: [
        ['Tamaño', 'Fijo en tiempo de compilación (inmutable)', 'Dinámico (crece o decrece a demanda)'],
        ['Ubicación en Memoria', 'Stack (pila local rápida)', 'Heap (memoria dinámica expandible)'],
        ['Sabe su propio tamaño', '❌ No (debes pasar el tamaño manual)', '✅ Sí (.size())'],
        ['Seguridad en límites', '❌ Ninguna (riesgo de colapso si excedes)', '✅ Alta (método .at() lanza excepciones)'],
        ['Recomendación', 'Solo para constantes o código legado', 'El estándar moderno para el 99% de los casos']
      ]
    },
    keyTakeaway: 'Salvo que tengas una razón de rendimiento extremo en sistemas embebidos, usa siempre std::vector en C++ moderno.'
  },
  {
    id: 4,
    type: 'diagram',
    title: 'Recorriendo Colecciones: Clásico vs Range-Based for',
    badge: 'Sintaxis Moderna',
    content: 'C++11 introdujo una forma limpia y segura de iterar sin preocuparse por índices:',
    bulletPoints: [
      'Modo Clásico: for (int i = 0; i < n; ++i) { cout << arr[i]; } (Útil cuando necesitas el número de posición).',
      'Modo Moderno (Range-based): for (int x : miColeccion) { cout << x; } (Lee "para cada elemento x en miColeccion").',
      'Por Referencia: for (int& x : miColeccion) { x *= 2; } (Modifica directamente los casilleros originales).'
    ],
    keyTakeaway: 'El range-based for elimina los errores por acceder a un índice fuera del límite del arreglo.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Colecciones 🎯',
    badge: 'Puntos Clave',
    content: 'Lo que debes dominar antes de profundizar en cada contenedor:',
    bulletPoints: [
      '✅ Los arreglos son homogéneos (todos sus elementos son del mismo tipo).',
      '✅ Viven de forma contigua en memoria: acceso instantáneo O(1) mediante su índice.',
      '✅ El índice 0 representa el origen sin desplazamiento.',
      '🔜 Próxima lección: Profundizaremos en los Arreglos Fijos y los riesgos del Buffer Overflow.'
    ],
    keyTakeaway: 'Con este mapa mental claro, en las siguientes sub-lecciones dominaremos tanto los arreglos fijos como el poderoso std::vector.'
  }
];
