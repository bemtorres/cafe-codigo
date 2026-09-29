import type { Slide } from '../../../types/slides';

export const variablesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '2. Variables y la Memoria RAM en C++ 🧱',
    subtitle: 'El modelo mental de casilleros numerados, tipos primitivos y tamaño en bytes',
    badge: 'C++ · Lección 2',
    content: 'En C++, una variable no es solo un nombre abstracto: es una reserva física de bytes en la memoria RAM con una dirección hexadecimal específica.',
    bulletPoints: [
      '📦 Modelo mental: La RAM como casilleros de correo numerados',
      '📏 Tipos primitivos: int, double, float, char, bool',
      '🧵 Cadenas modernas con std::string (#include <string>)',
      '🔒 Inmutabilidad con const y deducción de tipos con auto'
    ],
    keyTakeaway: 'Cada variable en C++ tiene 3 elementos sagrados: Tipo (cuánto espacio ocupa), Nombre (su etiqueta) y Valor (su contenido).'
  },
  {
    id: 2,
    type: 'concept',
    title: 'El Modelo Mental: La Memoria RAM como Casilleros',
    badge: 'Arquitectura de Memoria',
    content: 'Imagina la memoria RAM de tu computadora como una fila interminable de casilleros postales numerados (direcciones hexadecimales como 0x7ffee4).',
    visualChart: {
      headers: ['Tipo de Dato', 'Tamaño Típico', 'Rango / Capacidad', 'Analogía Visual'],
      rows: [
        ['bool', '1 byte (8 bits)', 'true (1) o false (0)', 'Interruptor de luz'],
        ['char', '1 byte', '1 solo carácter ASCII (\'A\', \'z\', \'9\')', 'Una sola ficha de Scrabble'],
        ['int', '4 bytes (32 bits)', '-2,147,483,648 a +2,147,483,647', 'Caja mediana de enteros'],
        ['double', '8 bytes (64 bits)', 'Decimales de precisión doble (15 dígitos)', 'Caja grande con báscula de precisión'],
        ['std::string', 'Dinámico', 'Texto de longitud variable ("Hola Mundo")', 'Cinta de letras enlazadas']
      ]
    },
    keyTakeaway: 'En C++, el tipo define exactamente cuántos casilleros contiguos de la RAM se reservarán para tu dato.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Declaración e Inicialización en C++',
    badge: 'Sintaxis Fundamental',
    content: 'A diferencia de Python o JS donde no declaras el tipo, en C++ el tipo siempre precede a la variable:',
    codeSnippet: {
      filename: 'variables.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>

int main() {
    int vidas = 3;
    double puntaje = 98.75;
    char rango = 'S';
    bool partidaActiva = true;
    std::string jugador = "Neo";

    std::cout << "Jugador: " << jugador << " | Vidas: " << vidas << "\\n";
    return 0;
}`,
      explanation: 'Declaramos cada variable con su tipo exacto antes del identificador. std::string requiere #include <string>.'
    },
    bulletPoints: [
      '⚠️ Char usa comillas simples (\'A\'). Los textos largos usan comillas dobles ("Neo").',
      '⚠️ Declarar sin inicializar (int x;) deja "basura" en la memoria (el valor previo de ese casillero).',
      '💡 Buena práctica: Siempre inicializa tus variables al declararlas (int vidas = 3;).'
    ],
    keyTakeaway: 'Inicializar una variable es limpiar el casillero antes de colocar tu nuevo dato.'
  },
  {
    id: 4,
    type: 'diagram',
    title: '¿Qué es el Operador sizeof?',
    badge: 'Inspección de Hardware',
    content: 'C++ te permite preguntarle al compilador cuántos bytes ocupa cualquier tipo o variable en tu arquitectura:',
    bulletPoints: [
      'sizeof(char) -> Siempre devuelve 1 byte.',
      'sizeof(int) -> Usualmente 4 bytes en sistemas modernos de 64 bits.',
      'sizeof(double) -> 8 bytes.',
      'sizeof(miVariable) -> Informa el tamaño exacto reservado en la memoria RAM.'
    ],
    keyTakeaway: 'Conocer el tamaño en bytes te da una comprensión profunda de por qué C++ es el rey de la optimización en sistemas embebidos y consolas.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Constantes (const) y Deducción Automática (auto)',
    badge: 'C++ Moderno',
    content: 'Dos herramientas clave que hacen tu código más seguro y legible en C++ moderno:',
    visualChart: {
      headers: ['Herramienta', 'Sintaxis de Ejemplo', 'Propósito Pedagógico'],
      rows: [
        ['const', 'const double PI = 3.14159;', 'Bloquea la variable contra modificaciones accidentales (inmutable).'],
        ['const (seguridad)', 'const int MAX_USUARIOS = 100;', 'Si intentas hacer MAX_USUARIOS = 200, el compilador genera error.'],
        ['auto (C++11)', 'auto velocidad = 120;', 'El compilador deduce automáticamente que es int según el valor inicial.'],
        ['auto (decimal)', 'auto gravedad = 9.81;', 'El compilador deduce que es double. Evita redundancia en tipos largos.']
      ]
    },
    keyTakeaway: 'Usa const por defecto para valores que no deban mutar. Usa auto cuando el tipo sea evidente por la asignación.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen del Módulo de Variables 🧠',
    badge: 'Repaso Rápido',
    content: 'Los pilares que debes recordar siempre:',
    bulletPoints: [
      '✅ Tipos primitivos: int (enteros), double (decimales), bool (lógicos), char (carácter).',
      '✅ Textos: Usar std::string incluyendo <string>.',
      '✅ Memoria limpia: Inicializa siempre tus variables para evitar valores basura.',
      '✅ Inmutabilidad: Marca con const los datos fijos del programa.'
    ],
    keyTakeaway: 'Dominar tipos y memoria te prepara para interactuar con el usuario mediante la consola en la próxima lección.'
  }
];
