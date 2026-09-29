import type { Slide } from '../../../types/slides';

export const arrayExamenSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7.4 Taller Integrador: CRUD de Datos con std::vector 🧪',
    subtitle: 'Crear, Leer, Actualizar y Eliminar en un sistema de inventario interactivo en C++',
    badge: 'C++ · Lección 7.4',
    content: 'Pon a prueba todo lo aprendido sobre ciclos, condicionales y vectores construyendo una aplicación real de gestión de inventario en consola.',
    bulletPoints: [
      '➕ Create (Crear): Agregar nuevos productos con .push_back()',
      '👀 Read (Leer): Listar el catálogo con formato y numeración',
      '✏️ Update (Actualizar): Buscar por ID/posición y modificar',
      '🗑️ Delete (Eliminar): Borrar elementos usando iteradores y .erase()'
    ],
    keyTakeaway: 'Un sistema CRUD es el patrón fundamental detrás del 90% del software comercial en el mundo.'
  },
  {
    id: 2,
    type: 'diagram',
    title: 'El Mapa de Operaciones CRUD en std::vector',
    badge: 'Arquitectura de Datos',
    content: 'Cada operación CRUD tiene su método equivalente en la STL de C++:',
    visualChart: {
      headers: ['Operación CRUD', 'Significado', 'Método / Patrón en C++', 'Complejidad Temporal'],
      rows: [
        ['Create', 'Insertar nuevo elemento', 'vector.push_back(nuevoDato);', 'O(1) amortizado'],
        ['Read', 'Consultar y mostrar elementos', 'for (size_t i = 0; i < vec.size(); ++i)', 'O(N) recorrido completo'],
        ['Update', 'Modificar dato existente', 'vector[posicion] = nuevoValor;', 'O(1) acceso directo'],
        ['Delete', 'Eliminar por posición', 'vector.erase(vector.begin() + posicion);', 'O(N) desplaza elementos']
      ]
    },
    keyTakeaway: 'std::vector permite crear y actualizar al instante; eliminar en el medio requiere reacomodar los elementos vecinos.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Operación Delete: ¿Cómo funciona vector.erase()?',
    badge: 'Uso de Iteradores',
    content: 'Para eliminar un elemento que no está al final, C++ requiere un iterador (puntero inteligente):',
    codeSnippet: {
      filename: 'vector_erase.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <vector>
#include <string>

int main() {
    std::vector<std::string> inventario = {"Poción", "Espada", "Escudo"};

    // Eliminar el elemento en el índice 1 ("Espada"):
    int indiceABorrar = 1;
    inventario.erase(inventario.begin() + indiceABorrar);

    // Ahora el vector solo tiene 2 elementos:
    for (const auto& item : inventario) {
        std::cout << "- " << item << "\\n"; // Poción, Escudo
    }
    return 0;
}`,
      explanation: 'inventario.begin() apunta al inicio del vector. Sumarle 1 produce el iterador a la segunda posición.'
    },
    keyTakeaway: 'vector.erase() encoge el tamaño del vector y desplaza todos los elementos posteriores hacia la izquierda.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Búsqueda Secuencial antes de Modificar o Borrar',
    badge: 'Algoritmo Fundamental',
    content: '¿Cómo modificar o eliminar si el usuario no sabe el número de índice sino el nombre del producto?',
    bulletPoints: [
      '1. Recorrer con un bucle for desde i = 0 hasta vector.size() - 1.',
      '2. Comparar if (vector[i] == nombreBuscado).',
      '3. Si coincide, guardar la posición encontrada y usar break para detener la búsqueda.',
      '4. Si el bucle termina sin coincidencias, informar amablemente: "Producto no encontrado".'
    ],
    keyTakeaway: 'Buscar antes de operar es la regla básica para no intentar borrar índices inexistentes.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen del Taller Integrador 🎯',
    badge: 'Hito Alcanzado',
    content: 'Has dominado el ciclo de vida completo de los datos en memoria en C++:',
    bulletPoints: [
      '✅ Crear con push_back() sin preocuparse por la memoria.',
      '✅ Leer y listar con bucles numerados amigables para el usuario.',
      '✅ Actualizar mediante acceso por índice directo.',
      '✅ Eliminar con erase() e iteradores vector.begin().'
    ],
    keyTakeaway: '¡Felicitaciones! Has completado el ciclo de colecciones. Ahora entraremos a organizar código profesionalmente con Funciones y Referencias.'
  }
];
