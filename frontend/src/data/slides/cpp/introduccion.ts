import type { Slide } from '../../../types/slides';

export const introduccionSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '1. Introducción a C++: El Salto al Mundo Real 🚀',
    subtitle: 'Del pseudocódigo de PSeInt al lenguaje de los sistemas de alto rendimiento',
    badge: 'C++ · Lección 1',
    content: 'Descubre por qué C++ es el lenguaje elegido para construir motores de videojuegos (Unreal Engine), sistemas operativos (Windows, Linux), naves espaciales de la NASA y trading de alta frecuencia.',
    bulletPoints: [
      '⚡ Velocidad sin intermediarios: Código que corre directamente en el procesador',
      '🌉 El puente desde PSeInt: Tu misma lógica mental, ahora con sintaxis industrial',
      '⚙️ Compilador como guardián: Detección estricta de errores antes de ejecutar',
      '🧠 Control absoluto: Gestión directa de memoria y recursos'
    ],
    keyTakeaway: 'En PSeInt aprendiste a pensar algorítmicamente. En C++ aprendes a darle órdenes directas al procesador.'
  },
  {
    id: 2,
    type: 'comparison',
    title: '¿Interpretado vs Compilado? ¿Dónde se ubica C++?',
    badge: 'Arquitectura y Ejecución',
    content: 'Comprender cómo se ejecuta tu código es el primer paso para dominar C++ frente a lenguajes como Python o JavaScript.',
    visualChart: {
      headers: ['Característica', 'Lenguajes Interpretados (Python/JS)', 'C++ (Compilado a Binario)'],
      rows: [
        ['Traducción', 'Línea por línea en tiempo de ejecución', 'Todo el archivo antes de ejecutarse'],
        ['Intermediario', 'Requiere software intérprete (Python/V8)', 'Binario nativo directo (.exe / ELF)'],
        ['Velocidad', 'Moderada (sobrecarga del intérprete)', 'Máxima (instrucciones de máquina puras)'],
        ['Detección de errores', 'Falla cuando el flujo pasa por la línea', 'El compilador bloquea si hay un error de sintaxis o tipo'],
        ['Uso típico', 'Scripts, Ciencia de Datos, Web rápida', 'Videojuegos AAA, Robótica, Motores, SO']
      ]
    },
    keyTakeaway: 'C++ no necesita intérprete: se convierte en ceros y unos que el hardware ejecuta a la máxima velocidad posible.'
  },
  {
    id: 3,
    type: 'diagram',
    title: 'El Ciclo de Vida: De Código Fuente a Programa Ejecutable',
    badge: 'Proceso de Compilación',
    content: 'Cuando presionas "Compilar", ocurren tres etapas automáticas e invisibles antes de que veas la ventana negra de la consola:',
    bulletPoints: [
      '1. Preprocesador (#): Reemplaza cabeceras como #include <iostream> con el código de la librería estándar.',
      '2. Compilador (g++ / clang / MSVC): Revisa la sintaxis, tipos de datos y genera código objeto (.o / .obj).',
      '3. Enlazador (Linker): Conecta tu código con las librerías del sistema y produce el ejecutable final (.exe).'
    ],
    keyTakeaway: 'Si falta una coma o un punto y coma, el compilador detiene el proceso antes de crear el ejecutable, protegiendo tu sistema.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Anatomía de tu Primer Programa en C++',
    badge: 'Estructura Fundamental',
    content: 'Cada línea de este programa mínimo tiene una razón de ser precisa en el estándar de C++:',
    codeSnippet: {
      filename: 'hola_mundo.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    std::cout << "¡Hola desde C++!\\n";
    return 0;
}`,
      explanation: '#include <iostream> importa entrada/salida. main() es el punto de entrada obligatorio. std::cout envía texto a la consola. return 0 avisa al SO que todo terminó con éxito.'
    },
    bulletPoints: [
      '📌 #include <iostream>: Trae las herramientas de flujo de entrada y salida (Input/Output Stream).',
      '📌 int main(): Es la puerta de entrada obligatoria que busca el sistema operativo.',
      '📌 std::cout: "Console Output". El operador << empuja el texto hacia la pantalla.',
      '📌 return 0;: Código de salida que confirma: "Programa finalizado sin errores".'
    ],
    keyTakeaway: 'En C++, las llaves { } delimitan bloques de código y el punto y coma ; es el punto final obligatorio de cada instrucción.'
  },
  {
    id: 5,
    type: 'table',
    title: 'Traductor Mental: De PSeInt a C++',
    badge: 'Equivalencias Clave',
    content: 'Tu cerebro ya sabe programar; solo necesitas aprender el dialecto de C++:',
    visualChart: {
      headers: ['Concepto', 'En PSeInt', 'En C++'],
      rows: [
        ['Inicio de programa', 'Algoritmo MiPrograma', 'int main() {'],
        ['Imprimir en pantalla', 'Escribir "Hola";', 'std::cout << "Hola\\n";'],
        ['Fin de instrucción', '; (opcional)', '; (estrictamente obligatorio)'],
        ['Comentario simple', '// Comentario', '// Comentario'],
        ['Comentario de bloque', '/* No soportado nativo */', '/* Bloque multilínea */'],
        ['Fin de programa', 'FinAlgoritmo', 'return 0; }']
      ]
    },
    keyTakeaway: 'No estás empezando de cero: la lógica de algoritmos que aprendiste en PSeInt se mantiene 100% intacta.'
  },
  {
    id: 6,
    type: 'concept',
    title: '⚠️ Errores Típicos del Principiante (y cómo resolverlos)',
    badge: 'Buenas Prácticas',
    content: 'Estos 3 errores representan el 90% de los dolores de cabeza en la primera semana de C++:',
    bulletPoints: [
      '1. Olvidar el punto y coma (;): Provoca errores como "expected \';\' before token". Mira la línea anterior al error.',
      '2. Confundir mayúsculas y minúsculas: C++ es Case-Sensitive. "Main" o "Cout" provocarán errores de compilación.',
      '3. Olvidar std::: Sin el prefijo std:: o la directiva using namespace std;, el compilador no sabrá qué es cout.'
    ],
    keyTakeaway: 'El compilador te indica el número de línea exacto del problema. Léelo con calma: es tu guía paso a paso.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección y Próximos Pasos 🎯',
    badge: 'Conclusión',
    content: 'Has dado el paso definitivo de algoritmos abstractos a un lenguaje compilado de clase mundial.',
    bulletPoints: [
      '✅ C++ compila directamente a código máquina ultrarrápido.',
      '✅ Todo programa requiere la función int main() como punto de partida.',
      '✅ Usamos #include <iostream> y std::cout << para mostrar información.',
      '🔜 Próximo módulo: Variables, tipos de datos y cómo C++ gestiona los casilleros de la memoria RAM.'
    ],
    keyTakeaway: '¡Bienvenido al mundo de C++! Ahora que sabes compilar y ejecutar, vamos a explorar la memoria RAM.'
  }
];
