import type { Slide } from '../../../types/slides';

export const arrayGameSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '7.3 Matrices 2D y el Juego de Pac-Man 🕹️',
    subtitle: 'Tableros bidimensionales, coordenadas [fila][columna] y lógica de videojuegos',
    badge: 'C++ · Lección 7.3',
    content: 'Aprende a representar mundos bidimensionales en la memoria de la computadora: mapas de juegos, tableros de ajedrez y matrices matemáticas.',
    bulletPoints: [
      '🗺️ Modelo mental: Filas horizontales y Columnas verticales (Y, X)',
      '👾 Representación de mapas con caracteres (\'#\', \'.\', \'C\')',
      '🕹️ Movimiento y actualización de posición del jugador',
      '💥 Detección de colisiones contra muros antes de mover'
    ],
    keyTakeaway: 'Una matriz 2D no es más que un arreglo de arreglos: el primer índice elige la fila y el segundo la columna.'
  },
  {
    id: 2,
    type: 'diagram',
    title: 'El Sistema de Coordenadas en Matrices: [fila][columna]',
    badge: 'Orientación Espacial',
    content: 'En programación de videojuegos y consolas, el eje Y suele invertirse (empieza arriba en 0 y crece hacia abajo):',
    visualChart: {
      headers: ['Índice Fila (Y)', 'Columna 0 (X=0)', 'Columna 1 (X=1)', 'Columna 2 (X=2)', 'Columna 3 (X=3)'],
      rows: [
        ['Fila 0 (Techo)', '# (Muro)', '# (Muro)', '# (Muro)', '# (Muro)'],
        ['Fila 1 (Juego)', '# (Muro)', 'C (Pac-Man)', '. (Punto)', '# (Muro)'],
        ['Fila 2 (Suelo)', '# (Muro)', '# (Muro)', '# (Muro)', '# (Muro)']
      ]
    },
    keyTakeaway: 'El acceso es siempre mapa[y][x], donde y es la fila vertical y x es la columna horizontal.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Declaración del Tablero y Bucle de Renderizado',
    badge: 'Motor de Render en Consola',
    content: 'Cómo dibujar un mapa bidimensional en pantalla mediante bucles for anidados:',
    codeSnippet: {
      filename: 'pacman_mapa.cpp',
      lang: 'cpp',
      code: `#include <iostream>

const int FILAS = 3;
const int COLUMNAS = 4;

char mapa[FILAS][COLUMNAS] = {
    {'#', '#', '#', '#'},
    {'#', 'C', '.', '#'},
    {'#', '#', '#', '#'}
};

int main() {
    for (int f = 0; f < FILAS; ++f) {
        for (int c = 0; c < COLUMNAS; ++c) {
            std::cout << mapa[f][c] << ' ';
        }
        std::cout << '\\n'; // Salto al terminar cada fila
    }
    return 0;
}`,
      explanation: 'El bucle exterior recorre cada fila. El bucle interior imprime cada columna de esa fila.'
    },
    keyTakeaway: 'Cada dimensión adicional de una matriz requiere un bucle anidado adicional para recorrerla por completo.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Lógica de Movimiento y Colisiones',
    badge: 'Física y Reglas de Juego',
    content: 'El secreto del movimiento en un videojuego basado en cuadrícula:',
    bulletPoints: [
      '1. Calcular la posición deseada: int nuevoX = posX + dx; int nuevoY = posY + dy;',
      '2. Validar colisión: Si mapa[nuevoY][nuevoX] == \'#\', no mover (hay un muro).',
      '3. Comer punto: Si mapa[nuevoY][nuevoX] == \'.\', sumar 10 puntos de score.',
      '4. Actualizar posiciones: Limpiar casilla actual con \' \' y colocar \'C\' en la nueva casilla.'
    ],
    keyTakeaway: 'Nunca muevas al jugador a ciegas: valida siempre la casilla de destino antes de actualizar sus coordenadas.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Matrices 2D 🎯',
    badge: 'Logro Desbloqueado',
    content: 'Has aprendido los cimientos gráficos y lógicos de los juegos clásicos en cuadrícula:',
    bulletPoints: [
      '✅ Matrices 2D como tableros: tipo mapa[FILAS][COLUMNAS].',
      '✅ Recorrido con bucles for anidados (primer índice fila, segundo columna).',
      '✅ Detección de colisiones mediante validación de coordenadas previas.',
      '🔜 Próxima lección: Integración total con una evaluación práctica de CRUD en vectores.'
    ],
    keyTakeaway: 'Los mismos principios de matrices 2D que usamos aquí para Pac-Man se usan en motores modernos para mapas de baldosas (Tilemaps).'
  }
];
