import type { Slide } from '../../../types/slides';

export const ciclosSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '6. Bucles y Repetición en C++: El Poder de la Automatización 🔁',
    subtitle: 'while, do-while, for clásico, range-based for y control con break / continue',
    badge: 'C++ · Lección 6',
    content: 'La verdadera ventaja de una computadora frente a un humano es su capacidad de repetir una instrucción millones de veces por segundo sin cansarse ni equivocarse.',
    bulletPoints: [
      '🔄 while: Repetir mientras una condición sea verdadera (0 o más veces)',
      '🛡️ do-while: Ejecutar al menos una vez antes de verificar la condición',
      '🎯 for clásico: Contador con inicio, límite y paso definido',
      '🛑 break y continue: Los frenos y aceleradores del bucle'
    ],
    keyTakeaway: 'Todo bucle necesita 3 elementos: Inicialización de la variable de control, Condición de parada y Modificación de la variable.'
  },
  {
    id: 2,
    type: 'comparison',
    title: '¿Cuándo usar cada tipo de Bucle?',
    badge: 'Criterio de Selección',
    content: 'Elegir el bucle correcto hace que tu algoritmo sea infinitamente más limpio:',
    visualChart: {
      headers: ['Tipo de Bucle', '¿Cuándo evalúa?', 'Mínimo de Ejecuciones', 'Mejor Caso de Uso'],
      rows: [
        ['while (cond)', 'Antes de entrar', '0 veces (si la condición empieza en falso)', 'Esperar un evento, procesar cola, leer archivos.'],
        ['do { } while (cond);', 'Al final del bloque', '1 vez garantizada', 'Menús de consola interactivos (mostrar primero, preguntar después).'],
        ['for (ini; cond; paso)', 'Antes de cada iteración', '0 veces', 'Recorrer rangos numéricos conocidos (del 0 al N).'],
        ['for (auto x : lista)', 'Por cada elemento', '0 veces (si lista vacía)', 'Recorrer colecciones modernas (C++11).']
      ]
    },
    keyTakeaway: 'Si conoces la cantidad de repeticiones de antemano: usa for. Si dependes de la acción del usuario: usa while o do-while.'
  },
  {
    id: 3,
    type: 'code',
    title: 'El Bucle for Clásico Desglosado',
    badge: 'Anatomía del for',
    content: 'Las tres partes sagradas del encabezado de un for:',
    codeSnippet: {
      filename: 'for_loop.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    // for (1. inicio; 2. condicion; 4. paso)
    for (int i = 1; i <= 5; ++i) {
        // 3. cuerpo
        std::cout << "Paso número: " << i << "\\n";
    }
    return 0;
}`,
      explanation: '1. int i = 1 se ejecuta solo una vez al iniciar. 2. Se valida i <= 5. 3. Se ejecuta el cuerpo. 4. Se ejecuta ++i. Se repite desde el paso 2.'
    },
    keyTakeaway: 'La variable de control i vive únicamente dentro del alcance (scope) del bucle for.'
  },
  {
    id: 4,
    type: 'code',
    title: 'do-while: El Patrón Dorado para Menús',
    badge: 'Garantía de Primera Ejecución',
    content: 'Observa cómo el menú se muestra antes de validar si el usuario desea salir:',
    codeSnippet: {
      filename: 'menu_dowhile.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    int opcion;

    do {
        std::cout << "\\n--- SISTEMA BANCARIO ---\\n";
        std::cout << "1. Ver saldo\\n";
        std::cout << "2. Depositar\\n";
        std::cout << "0. Salir\\n";
        std::cout << "Elija una opción: ";
        std::cin >> opcion;
    } while (opcion != 0);

    std::cout << "Gracias por su visita.\\n";
    return 0;
}`,
      explanation: 'do-while siempre termina con punto y coma tras el paréntesis: while (condicion);'
    },
    keyTakeaway: 'do-while garantiza que el usuario vea el menú al menos una vez antes de verificar la opción.'
  },
  {
    id: 5,
    type: 'diagram',
    title: 'Interrupciones Controladas: break vs continue',
    badge: 'Flujo de Ejecución',
    content: 'Dos palabras reservadas para alterar la marcha del bucle:',
    bulletPoints: [
      '🛑 break: Rompe el bucle por completo y salta a la primera línea fuera de él.',
      '⏩ continue: Salta inmediatamente el resto de la iteración actual y avanza a la siguiente.',
      '⚠️ Cuidado con los bucles infinitos: Asegúrate de que la condición de parada pueda alcanzarse eventualmente.'
    ],
    keyTakeaway: 'Usa break para abortar una búsqueda cuando encuentras lo que necesitas; usa continue para ignorar elementos inválidos.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen de Bucles 🎯',
    badge: 'Checklist de Repetición',
    content: 'Todo lo que necesitas para iterar con confianza:',
    bulletPoints: [
      '✅ while para repeticiones condicionadas sin límite previo.',
      '✅ do-while para flujos interactivos que deben ejecutarse al menos 1 vez.',
      '✅ for para conteos estrictos y recorridos con límites conocidos.',
      '✅ break para salida temprana y continue para omitir iteraciones.'
    ],
    keyTakeaway: '¡Excelente! Con los bucles dominados, estamos listos para guardar colecciones enteras de datos en la memoria.'
  }
];
