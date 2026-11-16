import type { Slide } from '../../../types/slides';

export const operadoresSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '4. Operadores en C++: Cálculo, Lógica y Trampas Ocultas ⚙️',
    subtitle: 'Aritmética estricta, división entera vs decimal, módulo y operadores lógicos',
    badge: 'C++ · Lección 4',
    content: 'C++ es implacable con las operaciones numéricas y de comparación. Entender sus sutilezas te evitará incontables horas de depuración.',
    bulletPoints: [
      '➗ La trampa de la división entera: ¿Por qué 5 / 2 da 2?',
      '🔄 El operador módulo (%): Magia para ciclos, pares e impares',
      '⚡ Pre-incremento vs Post-incremento: ++i vs i++',
      '🧠 Operadores lógicos y evaluación en cortocircuito (&&, ||, !)'
    ],
    keyTakeaway: 'En C++, el tipo de los operandos determina la regla de cálculo: entero entre entero siempre produce entero truncado.'
  },
  {
    id: 2,
    type: 'comparison',
    title: '⚠️ La Trampa Mayor: División Entera vs Decimal',
    badge: 'Comportamiento del Compilador',
    content: 'Mira lo que sucede cuando divides números en C++ según su tipo:',
    visualChart: {
      headers: ['Expresión', 'Resultado en C++', 'Explicación del Compilador'],
      rows: [
        ['5 / 2', '2', 'Entero entre entero: Se descartan los decimales (truncado a cero).'],
        ['5.0 / 2', '2.5', 'Al haber al menos un double (5.0), el cálculo se promueve a decimal.'],
        ['5 / 2.0', '2.5', 'Exactamente igual: basta con que un operando sea flotante.'],
        ['double r = 5 / 2;', '2.0', '¡Peligro! 5 / 2 se calcula primero como 2, y luego se convierte en 2.0.']
      ]
    },
    keyTakeaway: 'Para obtener decimales, al menos uno de los números debe ser de tipo con punto flotante (float o double).'
  },
  {
    id: 3,
    type: 'code',
    title: 'El Operador Módulo (%): Tu Mejor Amigo Algorítmico',
    badge: 'Resto de la División',
    content: 'El operador % devuelve el residuo exacto tras una división entera:',
    codeSnippet: {
      filename: 'modulo.cpp',
      lang: 'cpp',
      code: `#include <iostream>

int main() {
    int numero = 17;

    // ¿Es par o impar?
    if (numero % 2 == 0) {
        std::cout << numero << " es PAR\\n";
    } else {
        std::cout << numero << " es IMPAR\\n";
    }

    // Limitar valores a un rango cíclico (ej. reloj 0 a 11):
    int hora = 15;
    std::cout << "Hora formato 12h: " << (hora % 12) << "\\n";
    return 0;
}`,
      explanation: 'numero % 2 produce 0 si es múltiplo de 2, o 1 si no lo es. Solo funciona con números enteros.'
    },
    keyTakeaway: 'El operador % es la base de números pares/impares, conteo de monedas, relojes y tablas hash.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Pre-incremento (++i) vs Post-incremento (i++)',
    badge: 'Detalle de Ejecución',
    content: 'Ambos suman 1 a la variable, pero difieren en cuándo devuelven el valor:',
    visualChart: {
      headers: ['Operador', 'Nombre', 'Comportamiento', 'Ejemplo'],
      rows: [
        ['++i', 'Pre-incremento', 'Suma 1 primero, y luego entrega el nuevo valor.', 'int a = 5; int b = ++a; // a=6, b=6'],
        ['i++', 'Post-incremento', 'Entrega el valor actual primero, y luego suma 1.', 'int a = 5; int b = a++; // a=6, b=5']
      ]
    },
    keyTakeaway: 'En bucles independientes ambos dan el mismo resultado, pero ++i es la recomendación canónica en C++ por consistencia con iteradores.'
  },
  {
    id: 5,
    type: 'diagram',
    title: 'Operadores Lógicos y Cortocircuito (Short-Circuit)',
    badge: 'Optimización y Seguridad',
    content: 'En C++, las evaluaciones lógicas se detienen tan pronto se conoce el resultado final:',
    bulletPoints: [
      '&& (AND): Si la primera condición es falsa, C++ NO evalúa la segunda (ya sabe que es falsa).',
      '|| (OR): Si la primera condición es verdadera, C++ NO evalúa la segunda (ya sabe que es verdadera).',
      '! (NOT): Invierte el valor de verdad (!true = false, !false = true).'
    ],
    keyTakeaway: 'El cortocircuito te permite proteger operaciones riesgosas (ej. ptr != nullptr && *ptr == 10) sin riesgo de colapso.'
  },
  {
    id: 6,
    type: 'summary',
    title: 'Resumen del Módulo de Operadores 🎯',
    badge: 'Conceptos Clave',
    content: 'Reglas de cálculo que dominarás:',
    bulletPoints: [
      '✅ Para decimales: asegura al menos un operando double (ej. 5.0 / 2).',
      '✅ Usa % para obtener residuos enteros, verificar paridad o ciclos.',
      '✅ Diferencia == (comparación de igualdad) de = (asignación).',
      '✅ Aprovecha el cortocircuito de && y || para escribir código seguro y eficiente.'
    ],
    keyTakeaway: 'Con la lógica y la matemática dominada, entramos de lleno a la toma de decisiones en el flujo del programa.'
  }
];
