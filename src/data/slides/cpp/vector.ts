import type { Slide } from '../../../types/slides';

export const vectorSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7.2 std::vector: El Rey de los Contenedores en C++ 🚀',
    subtitle: 'Arreglos dinámicos que crecen automáticamente, métodos esenciales y gestión de memoria',
    badge: 'C++ · Lección 7.2',
    content: 'Descubre por qué std::vector es la estructura de datos más utilizada en la industria del software en C++, desde videojuegos hasta motores de bases de datos.',
    bulletPoints: [
      '📈 Crece según la necesidad: Dile adiós a los tamaños fijos predefinidos',
      '🛠️ Métodos esenciales: push_back(), pop_back(), size(), empty(), clear()',
      '🛡️ Seguridad con .at(): Excepciones garantizadas ante accesos fuera de rango',
      '🧠 El secreto interno: Tamaño (size) vs Capacidad (capacity)'
    ],
    keyTakeaway: 'std::vector te da la velocidad de un arreglo contiguo con la flexibilidad de crecer en tiempo de ejecución.'
  },
  {
    id: 2,
    type: 'code',
    title: 'Declaración y Métodos Esenciales de std::vector',
    badge: 'Sintaxis y Uso',
    content: 'Para usar vectores necesitas incluir la cabecera estándar #include <vector>:',
    codeSnippet: {
      filename: 'vector_demo.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <vector>

int main() {
    // Vector vacío de enteros:
    std::vector<int> numeros;

    // Agregar elementos al final:
    numeros.push_back(10);
    numeros.push_back(20);
    numeros.push_back(30);

    std::cout << "Elementos totales: " << numeros.size() << "\\n"; // 3
    std::cout << "Primer valor: " << numeros[0] << "\\n";        // 10
    std::cout << "Último valor: " << numeros.back() << "\\n";     // 30

    // Eliminar el último elemento:
    numeros.pop_back(); // Elimina el 30
    return 0;
}`,
      explanation: 'push_back() añade al final en tiempo constante amortizado O(1). size() devuelve la cantidad actual de elementos.'
    },
    keyTakeaway: 'Los corchetes angulares <int> indican el tipo de dato que albergará el vector (Templates/Plantillas de C++).'
  },
  {
    id: 3,
    type: 'comparison',
    title: 'El Secreto Interno: Tamaño (size) vs Capacidad (capacity)',
    badge: 'Mecánica de Memoria',
    content: '¿Cómo logra un vector crecer si la memoria RAM debe ser contigua?',
    visualChart: {
      headers: ['Concepto', 'Definición', 'Analogía del Autobús'],
      rows: [
        ['size()', 'Cantidad de casilleros que tienen datos reales.', 'Pasajeros sentados en el autobús (ej. 3).'],
        ['capacity()', 'Cantidad de casilleros reservados en la RAM.', 'Asientos totales disponibles en el autobús (ej. 4).'],
        ['Reasignación', 'Cuando size == capacity y haces otro push_back().', 'El autobús se llena: C++ compra uno el doble de grande y muda a todos.']
      ]
    },
    keyTakeaway: 'Cuando el vector se llena, reserva un bloque nuevo del doble de tamaño en otra zona de la RAM y copia los elementos automáticamente.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Acceso Seguro: vector[i] vs vector.at(i)',
    badge: 'Seguridad y Robustez',
    content: 'C++ te ofrece dos formas de acceder a un elemento en la posición i:',
    bulletPoints: [
      'numeros[i]: Acceso directo sin chequeo de límites. Es ultrarrápido (ideal para bucles críticos en motores de juegos).',
      'numeros.at(i): Verifica si el índice es válido antes de acceder. Si está fuera de rango, lanza una excepción std::out_of_range.',
      '💡 Regla práctica: Usa .at() mientras aprendes o cuando el índice venga de una entrada no confiable del usuario.'
    ],
    keyTakeaway: 'Si intentas acceder al índice 99 en un vector de 3 elementos con .at(), tu programa te avisará con precisión del error en vez de leer basura.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de std::vector 🎯',
    badge: 'Herramienta Definitiva',
    content: 'Puntos clave para tu arsenal de C++:',
    bulletPoints: [
      '✅ Reemplaza casi siempre a los arreglos fijos en software real.',
      '✅ Se expande automáticamente al usar push_back().',
      '✅ Conoce su tamaño en cualquier momento con .size().',
      '✅ Es compatible con range-based for: for (int x : vec) { ... }'
    ],
    keyTakeaway: '¡std::vector es el contenedor número uno de C++! En la siguiente lección lo llevaremos a dos dimensiones con un juego interactivo.'
  }
];
