import type { Slide } from '../../../types/slides';

export const funcionesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '8. Funciones, Memoria y Referencias (&) 🧩',
    subtitle: 'Modularización, fotocopias vs casilleros originales y desmitificando la memoria',
    badge: 'C++ · Lección 8',
    content: 'Descubre cómo dividir programas gigantes en piezas reutilizables y entiende el concepto más potente y temido de C++: el paso por referencia y los punteros.',
    bulletPoints: [
      '✂️ Dividir y vencer: De código espagueti a funciones limpias y modulares',
      '📄 Paso por Valor: Trabajar con una fotocopia del dato original',
      '🔑 Paso por Referencia (&): Entregar la llave del casillero original',
      '🎯 Introducción a Punteros (*): Papelitos con direcciones de memoria'
    ],
    keyTakeaway: 'Una función es un contrato: qué recibe (parámetros), qué hace (lógica) y qué devuelve (tipo de retorno).'
  },
  {
    id: 2,
    type: 'comparison',
    title: 'Paso por Valor vs Paso por Referencia (&)',
    badge: 'El Salto Conceptual de C++',
    content: 'Este es el momento decisivo donde los estudiantes realmente comprenden C++:',
    visualChart: {
      headers: ['Característica', 'Paso por Valor (void fn(int x))', 'Paso por Referencia (void fn(int& x))'],
      rows: [
        ['Analogía', 'Haces una fotocopia del documento.', 'Entregas el documento original con un alias.'],
        ['Memoria', 'Duplica el espacio: crea una variable nueva en la pila.', 'Cero espacio extra: usa el mismo casillero original.'],
        ['Modificaciones', 'Lo que hagas con x NO altera la variable externa.', 'Cualquier cambio a x modifica la variable original.'],
        ['Rendimiento', 'Lento si pasas objetos pesados (vectores grandes).', 'Instantáneo O(1) (solo comparte la dirección).'],
        ['Seguridad', 'Totalmente aislada de efectos secundarios.', 'Usa const& si quieres velocidad sin permitir cambios.']
      ]
    },
    keyTakeaway: 'El símbolo & al lado del tipo significa: "No hagas una copia; conecta directamente con la variable original".'
  },
  {
    id: 3,
    type: 'code',
    title: 'El Clásico Algoritmo de Intercambio (swap)',
    badge: 'Demostración Práctica',
    content: '¿Por qué necesitamos & para intercambiar dos variables?',
    codeSnippet: {
      filename: 'intercambio.cpp',
      lang: 'cpp',
      code: `#include <iostream>

// Con '&' recibimos los casilleros originales:
void intercambiar(int& a, int& b) {
    int temporal = a;
    a = b;
    b = temporal;
}

int main() {
    int x = 10;
    int y = 99;

    std::cout << "Antes: x=" << x << ", y=" << y << "\\n";
    intercambiar(x, y);
    std::cout << "Después: x=" << x << ", y=" << y << "\\n"; // x=99, y=10
    return 0;
}`,
      explanation: 'Sin el operador &, x e y mantendrían sus valores iniciales porque la función solo habría intercambiado sus copias locales.'
    },
    keyTakeaway: 'Gracias a la referencia &, la función intercambiar altera directamente el estado en la función main.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Desmitificando los Punteros: & y * Explicados Simple',
    badge: 'El Gran Secreto de C++',
    content: 'Solo necesitas recordar dos símbolos mágicos para entender punteros:',
    bulletPoints: [
      '📍 Operador de Dirección (&): "¿En qué casillero vives?". cout << &x imprime su dirección hexadecimal (ej. 0x7ffee4).',
      '👉 Puntero (*): Una variable especial que guarda una dirección de casillero: int* ptr = &x;',
      '🔓 Operador de Desreferenciación (*ptr): "Abre el casillero al que apunta ptr y muestra/modifica lo que hay dentro".',
      '💡 Analogía: x es tu casa, &x es tu dirección postal escrita en un papel, y * es abrir la puerta de esa casa.'
    ],
    keyTakeaway: 'Un puntero no es magia oscura: es simplemente una variable que almacena un número de casillero de la RAM.'
  },
  {
    id: 5,
    type: 'diagram',
    title: 'Buenas Prácticas: Paso de Objetos Grandes con const&',
    badge: 'Patrón de Oro de C++',
    content: '¿Qué pasa cuando tienes un vector con 10,000 elementos o un string largo?',
    bulletPoints: [
      '❌ void imprimir(vector<int> v): ¡Copia los 10,000 números en cada llamada! Desperdicia CPU y memoria.',
      '✅ void imprimir(const vector<int>& v): Cero copias (máxima velocidad) y const protege de modificaciones accidentales.',
      '📌 Regla de oro de C++: Tipos primitivos pequeños (int, double, bool) pásalos por valor; colecciones y textos pásalos por const&.'
    ],
    keyTakeaway: 'const Tipo& te da la velocidad del paso por referencia con la seguridad del paso por valor.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de Funciones y Memoria 🎯',
    badge: 'Salto Cualitativo',
    content: 'Has dominado el núcleo más importante de la programación en C++:',
    bulletPoints: [
      '✅ Modularizar código con funciones con tipos de retorno explícitos.',
      '✅ Paso por Valor para copias independientes seguras.',
      '✅ Paso por Referencia (&) para mutar variables externas o ahorrar copias.',
      '✅ Punteros como direcciones de casilleros (& para obtener dirección, * para acceder al contenido).',
      '🔜 Próximo módulo: Programación Orientada a Objetos (POO), donde agruparemos datos y funciones en clases.'
    ],
    keyTakeaway: 'Entender referencias y memoria te separa de un novato y te abre la puerta a la arquitectura orientada a objetos.'
  }
];
