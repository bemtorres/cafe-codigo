import type { Slide } from '../../../types/slides';

export const ioSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '3. Entrada y Salida: Conversando con el Usuario 💬',
    subtitle: 'std::cout, std::cin, manipulación del buffer y lectura con std::getline',
    badge: 'C++ · Lección 3',
    content: 'Aprende cómo fluyen los datos entre el teclado, tu programa y la pantalla mediante los flujos (streams) estándar de C++.',
    bulletPoints: [
      '📤 std::cout << : El río que saca datos hacia la consola',
      '📥 std::cin >> : El río que recibe datos desde el teclado',
      '⚠️ El clásico bug del buffer: Por qué cin se salta getline',
      '🧹 La solución profesional: cin.ignore() y std::getline()'
    ],
    keyTakeaway: 'En C++, la entrada y la salida son "flujos" continuos de caracteres que viajan en una dirección fija.'
  },
  {
    id: 2,
    type: 'diagram',
    title: 'El Modelo de Streams (Flujos) en C++',
    badge: 'Concepto Clave',
    content: 'Los operadores << y >> indican la dirección visual hacia donde viaja la información:',
    bulletPoints: [
      'std::cout << "Mensaje" : Empujas los caracteres hacia el objeto de salida estándar (pantalla).',
      'std::cin >> variable : Tomas los caracteres del teclado y los empujas hacia la variable.',
      '\\n vs std::endl : \\n solo inserta salto de línea; std::endl además fuerza a vaciar el buffer (flush).'
    ],
    keyTakeaway: 'Recuerda las flechas: << sale hacia la pantalla, >> entra hacia la variable.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Lectura Básica de Números y Palabras Simples',
    badge: 'std::cin en Acción',
    content: 'Leyendo datos del usuario con tipos automáticos:',
    codeSnippet: {
      filename: 'entrada_basica.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    int edad;
    double altura;

    std::cout << "Ingresa tu edad: ";
    std::cin >> edad;

    std::cout << "Ingresa tu altura en metros: ";
    std::cin >> altura;

    std::cout << "Tienes " << edad << " años y mides " << altura << " m.\\n";
    return 0;
}`,
      explanation: 'cin detecta automáticamente si debe interpretar la entrada como entero o decimal según el tipo de la variable destino.'
    },
    keyTakeaway: 'cin se detiene en el primer espacio en blanco o salto de línea que encuentra.'
  },
  {
    id: 4,
    type: 'concept',
    title: '⚠️ El "Bug Fantasma" del Buffer en C++',
    badge: 'Trampa Clásica Resuelta',
    content: '¿Por qué cuando pides un número con cin y luego un nombre con getline(), el programa parece "saltarse" el nombre sin dejarte escribir?',
    visualChart: {
      headers: ['Paso', 'Lo que escribes', 'Lo que lee cin', 'Lo que queda atrapado en el buffer'],
      rows: [
        ['1. cin >> edad', '25 + [ENTER]', 'Lee 25 y lo guarda', 'Queda el carácter salto de línea \\n'],
        ['2. getline(cin, nombre)', '(esperando)', 'Ve el \\n rezagado inmediatamente', 'Termina creyendo que el usuario ingresó un texto vacío']
      ]
    },
    keyTakeaway: 'Cuando mezclas cin >> con getline(), el Enter (\\n) queda flotando en el buffer del teclado.'
  },
  {
    id: 5,
    type: 'code',
    title: 'La Solución: Limpieza con cin.ignore() y getline',
    badge: 'Patrón Profesional',
    content: 'Cómo leer frases completas con espacios sin errores de buffer:',
    codeSnippet: {
      filename: 'buffer_limpio.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>

int main() {
    int id;
    std::string nombreCompleto;

    std::cout << "Código ID: ";
    std::cin >> id;

    // 🧹 Limpiamos el '\\n' rezagado en el buffer:
    std::cin.ignore();

    std::cout << "Nombre completo: ";
    std::getline(std::cin, nombreCompleto);

    std::cout << "Registro: [" << id << "] " << nombreCompleto << "\\n";
    return 0;
}`,
      explanation: 'cin.ignore() descarta el salto de línea residual. Luego getline lee la línea entera incluyendo espacios hasta el nuevo Enter.'
    },
    keyTakeaway: 'Regla de oro: Si usas cin >> antes de un std::getline(), pon siempre std::cin.ignore(); en medio.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Síntesis de Entrada y Salida 🎯',
    badge: 'Checklist de Aprendizaje',
    content: 'Herramientas para dominar la interacción en consola:',
    bulletPoints: [
      '✅ cout << para imprimir y cin >> para leer variables simples.',
      '✅ Para textos con espacios (ej. "Juan Pérez"): usar std::getline(std::cin, var).',
      '✅ Limpiar el buffer con std::cin.ignore() antes de getline tras un cin numérico.',
      '✅ Usar \\n para saltos de línea eficientes en lugar del pesado endl.'
    ],
    keyTakeaway: 'Con la entrada y salida bajo control, en la siguiente lección operaremos los datos con matemática y lógica.'
  }
];
