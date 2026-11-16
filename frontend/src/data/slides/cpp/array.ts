import type { Slide } from '../../../types/slides';

export const arraySlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7.1 Arreglos Fijos (Fixed Arrays) en C++ 📦',
    subtitle: 'Declaración estática, inicialización, memoria contigua y el temido Buffer Overflow',
    badge: 'C++ · Lección 7.1',
    content: 'Aprende cómo funcionan los arreglos nativos de C++ heredados de C: máxima velocidad y cero sobrecarga, pero con la responsabilidad total en tus manos.',
    bulletPoints: [
      '📏 Declaración de tamaño fijo: int notas[5];',
      '✨ Lista de inicializadores: int primos[] = {2, 3, 5, 7, 11};',
      '⚠️ El peligro del Buffer Overflow: Escribir fuera de los límites',
      '🛡️ std::array como alternativa segura de la STL (#include <array>)'
    ],
    keyTakeaway: 'En un arreglo fijo tradicional, el tamaño debe ser conocido en tiempo de compilación y no puede crecer jamás.'
  },
  {
    id: 2,
    type: 'code',
    title: 'Declaración e Inicialización Práctica',
    badge: 'Sintaxis',
    content: 'Formas válidas de crear y rellenar un arreglo fijo:',
    codeSnippet: {
      filename: 'arreglos_fijos.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    // Declaración sin inicializar (¡contiene basura de memoria!):
    int datos[3];

    // Inicialización explícita con valores conocidos:
    int puntajes[4] = {100, 85, 92, 78};

    // El compilador deduce el tamaño (3 elementos):
    double precios[] = {19.90, 4.50, 12.00};

    std::cout << "Primer puntaje: " << puntajes[0] << "\\n";
    std::cout << "Último puntaje: " << puntajes[3] << "\\n";
    return 0;
}`,
      explanation: 'Si un arreglo tiene tamaño N, sus índices válidos van estrictamente desde 0 hasta N - 1.'
    },
    keyTakeaway: 'Nunca asumas que un arreglo recién creado contiene ceros: siempre inicialízalo explícitamente.'
  },
  {
    id: 3,
    type: 'concept',
    title: '⚠️ ¿Qué es un Buffer Overflow (Desbordamiento)?',
    badge: 'Seguridad y Peligro',
    content: 'En C++, el operador de corchetes [ ] NO verifica si el índice existe en memoria:',
    visualChart: {
      headers: ['Código Ejecutado', '¿Qué espera el programador?', '¿Qué ocurre en la realidad?'],
      rows: [
        ['int arr[3] = {1, 2, 3};', 'Crea 3 casilleros (índices 0, 1, 2)', 'Reserva 12 bytes en la pila (Stack).'],
        ['cout << arr[10];', 'Un error que detenga el programa', '⚠️ Lee la memoria ajena que esté 40 bytes más adelante (basura).'],
        ['arr[10] = 999;', 'Que avise "índice fuera de rango"', '💥 Sobrescribe variables vecinas o produce "Segmentation Fault".']
      ]
    },
    keyTakeaway: 'El Buffer Overflow es una de las vulnerabilidades más famosas de la historia de la informática. Es tu deber verificar que 0 <= i < tamaño.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Recorriendo un Arreglo con Bucles',
    badge: 'Patrón de Recorrido',
    content: 'Calculando el promedio de notas mediante iteración:',
    codeSnippet: {
      filename: 'promedio.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    const int TOTAL = 5;
    double notas[TOTAL] = {6.0, 5.5, 7.0, 4.8, 6.2};
    double suma = 0.0;

    for (int i = 0; i < TOTAL; ++i) {
        suma += notas[i];
    }

    double promedio = suma / TOTAL;
    std::cout << "Promedio del curso: " << promedio << "\\n";
    return 0;
}`,
      explanation: 'Usamos una constante TOTAL para evitar números mágicos dispersos por el código y asegurar que los límites coincidan.'
    },
    keyTakeaway: 'Usa siempre una constante (const int N) para definir y recorrer arreglos fijos.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Arreglos Fijos 🎯',
    badge: 'Conclusiones',
    content: 'Puntos vitales para recordar:',
    bulletPoints: [
      '✅ El tamaño es estático e inmutable una vez compilado el programa.',
      '✅ Los índices válidos van desde 0 hasta tamaño - 1.',
      '✅ C++ no revisa los límites con [ ]: debes ser riguroso con tus bucles.',
      '🔜 Próximo paso: El arreglo dinámico que resuelve todas estas limitaciones: std::vector.'
    ],
    keyTakeaway: 'Los arreglos fijos te enseñaron el funcionamiento íntimo de la memoria; ahora es momento de subir de nivel con std::vector.'
  }
];
