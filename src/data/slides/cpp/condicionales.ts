import type { Slide } from '../../../types/slides';

export const condicionalesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '5. Condicionales en C++: La Toma de Decisiones 🚦',
    subtitle: 'Bifurcaciones con if/else, menús con switch-case y operador ternario',
    badge: 'C++ · Lección 5',
    content: 'Un programa sin condicionales es una calculadora lineal. Las estructuras de control permiten que tu código reaccione dinámicamente según las circunstancias.',
    bulletPoints: [
      '🛤️ if, else if, else: El camino de bifurcación algorítmica',
      '🎛️ switch-case: La forma más limpia y optimizada de crear menús',
      '⚠️ El peligro de olvidar el break; en un switch',
      '⚡ Operador ternario (? :): Decisiones compactas en una sola línea'
    ],
    keyTakeaway: 'En C++, cualquier valor distinto de 0 es considerado verdadero (true), y 0 es considerado falso (false).'
  },
  {
    id: 2,
    type: 'code',
    title: 'Estructura if - else if - else',
    badge: 'Flujo Condicional',
    content: 'La misma lógica de PSeInt (Si - Sino Si - Sino) expresada con la sintaxis de C++:',
    codeSnippet: {
      filename: 'evaluar_nota.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    double nota = 6.5;

    if (nota >= 6.0) {
        std::cout << "¡Excelente! Aprobado con distinción.\\n";
    } else if (nota >= 4.0) {
        std::cout << "Aprobado regular.\\n";
    } else {
        std::cout << "Reprobado. Toca estudiar más.\\n";
    }
    return 0;
}`,
      explanation: 'Las condiciones van obligatoriamente entre paréntesis ( ). Los bloques de código se delimitan con llaves { }.'
    },
    keyTakeaway: 'Usa siempre llaves { } incluso si el bloque tiene una sola línea: evita bugs silenciosos al añadir código después.'
  },
  {
    id: 3,
    type: 'concept',
    title: 'Menús Profesionales con switch-case',
    badge: 'Estructura de Selección Múltiple',
    content: 'Cuando tienes que comparar una variable discreta (int o char) contra muchas opciones fijas, switch es mucho más limpio que diez if anidados:',
    visualChart: {
      headers: ['Componente', 'Función', '¿Qué ocurre si se omite?'],
      rows: [
        ['switch(variable)', 'Evalúa el valor entero o carácter.', 'Obligatorio.'],
        ['case VALOR:', 'Punto de entrada si coincide con el valor.', 'Si no coincide, sigue buscando.'],
        ['break;', 'Detiene la ejecución y sale del bloque switch.', '⚠️ "Fall-through": Se ejecutan los siguientes cases sin evaluar!'],
        ['default:', 'Se ejecuta si ningún case coincidió.', 'Opcional, pero vital para capturar opciones inválidas.']
      ]
    },
    keyTakeaway: 'El compilador puede optimizar un switch usando tablas de salto en memoria (jump tables), haciéndolo ultrarrápido.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Ejemplo de Menú con switch y default',
    badge: 'Caso de Uso Real',
    content: 'Implementación canónica de menú en consola de C++:',
    codeSnippet: {
      filename: 'menu.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    int opcion = 2;

    switch (opcion) {
        case 1:
            std::cout << "Iniciando nueva partida...\\n";
            break;
        case 2:
            std::cout << "Cargando configuración...\\n";
            break;
        case 3:
            std::cout << "Saliendo del juego...\\n";
            break;
        default:
            std::cout << "Opción inválida. Intente de nuevo.\\n";
            break;
    }
    return 0;
}`,
      explanation: 'Cada case concluye con break; para evitar que la ejecución continúe hacia las ramas siguientes.'
    },
    keyTakeaway: 'Usa switch para opciones discretas numéricas o caracteres (\'a\', \'b\', \'c\'). No funciona con strings directos.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'El Operador Ternario (? :)',
    badge: 'Código Elegante y Conciso',
    content: 'Una forma compacta de tomar una decisión que devuelve un valor para asignarlo directamente a una variable:',
    bulletPoints: [
      'Sintaxis: condicion ? valor_si_verdadero : valor_si_falso;',
      'Ejemplo clásico: int mayor = (a > b) ? a : b;',
      'Con strings: std::string estado = (edad >= 18) ? "Mayor" : "Menor";',
      '⚠️ Consejo: Úsalo solo para decisiones simples de 1 línea. Si hay mucha lógica, prefiere un if tradicional.'
    ],
    keyTakeaway: 'El ternario es una expresión con retorno de valor, ideal para asignaciones rápidas y legibles.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de Decisiones en C++ 🎯',
    badge: 'Puntos de Dominio',
    content: 'Lo esencial que debes llevarte de este módulo:',
    bulletPoints: [
      '✅ if / else if / else para cualquier tipo de condición lógica o rangos numéricos.',
      '✅ switch-case para menús y selecciones discretas (recordando siempre el break).',
      '✅ Ternario (? :) para asignar un valor en una línea según una condición.',
      '✅ Cuidado con escribir = (asignación) en lugar de == (comparación) dentro de un if.'
    ],
    keyTakeaway: 'Con las decisiones controladas, en el próximo módulo aprenderemos a repetir tareas con bucles potentes.'
  }
];
