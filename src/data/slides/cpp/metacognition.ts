import type { MetaReflectionQuestion } from '../../../types/slides';

export type { MetaReflectionQuestion };

function createBaseGenericQuestions(): MetaReflectionQuestion[] {
  return [
    {
      id: 1,
      category: 'Generic',
      title: '1. Estrategia de Aprendizaje',
      questionText: '¿Qué método o modelo mental utilizaste para conectar los conceptos teóricos de esta lección con el código práctico en C++?',
      promptHint: 'Pensar en la memoria RAM como casilleros numerados y dibujar esquemas ayuda a fijar el conocimiento a largo plazo.',
      keyTakeaway: 'Visualizar el impacto físico en la memoria convierte la sintaxis abstracta en comprensión sólida.'
    },
    {
      id: 2,
      category: 'Generic',
      title: '2. Gestión de Complejidad y Errores',
      questionText: '¿En qué parte sentiste mayor duda o confusión durante este tema y qué técnica usaste para aclararlo?',
      promptHint: 'Leer con calma los mensajes de error del compilador (g++) es la habilidad clave de un programador de C++.',
      keyTakeaway: 'El compilador no es tu enemigo; es tu guardián que detecta fallos antes de que el programa colapse en producción.'
    },
    {
      id: 3,
      category: 'Generic',
      title: '3. Conexión con PSeInt / Otros Lenguajes',
      questionText: '¿Cómo se complementa lo que aprendiste hoy con tu experiencia previa en pseudocódigo o lenguajes interpretados?',
      promptHint: 'La lógica algorítmica fundamental se mantiene igual; lo que cambia es el control sobre la máquina y la memoria.',
      keyTakeaway: 'Reconocer patrones conocidos en un lenguaje nuevo acelera tu curva de aprendizaje.'
    },
    {
      id: 4,
      category: 'Generic',
      title: '4. Aplicación Práctica en Proyectos',
      questionText: '¿En qué tipo de proyecto o ejercicio personal podrías aplicar hoy mismo lo aprendido en esta lección?',
      promptHint: 'Escribir un pequeño programa propio de prueba en las primeras 24 horas consolida la memoria muscular.',
      keyTakeaway: 'El código escrito con tus propias manos es el que realmente se queda en tu mente.'
    }
  ];
}

export function getMetaQuestionsForLesson(lessonSlug: string): MetaReflectionQuestion[] {
  const base = createBaseGenericQuestions();
  let specific: MetaReflectionQuestion[] = [];
  const normalized = lessonSlug.replace(/^\/+|\/+$/g, '');

  switch (normalized) {
    case 'introduccion':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Salto al Código Máquina',
          questionText: '¿Qué ventajas y responsabilidades conlleva trabajar con un lenguaje compilado directamente al procesador en comparación con el pseudocódigo?',
          promptHint: 'Piensa en la velocidad extrema, la rigidez con el punto y coma y la ausencia de un intérprete que te perdone errores de sintaxis.',
          keyTakeaway: 'C++ te da control total del hardware a cambio de exigir precisión absoluta en tu código.'
        }
      ];
      break;

    case 'variables':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Memoria RAM como Casilleros',
          questionText: '¿Cómo cambia tu forma de pensar sobre los datos al saber que cada variable ocupa una cantidad exacta de bytes físicos en la memoria?',
          promptHint: 'Reflexiona sobre el tamaño de un int (4 bytes) vs un double (8 bytes) y el peligro de no inicializar variables.',
          keyTakeaway: 'En C++, no solo eliges el tipo por el valor, sino por cuánta memoria quieres reservar en la máquina.'
        }
      ];
      break;

    case 'io':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Río de Entrada y Salida (Streams)',
          questionText: '¿Por qué es fundamental entender el buffer del teclado y el rol de cin.ignore() para evitar el clásico "bug fantasma" de getline?',
          promptHint: 'El salto de línea \\n que queda atrapado en el flujo puede engañar a las lecturas posteriores.',
          keyTakeaway: 'Comprender que la entrada del usuario es un flujo continuo te ahorra horas de depuración en interfaces de consola.'
        }
      ];
      break;

    case 'operadores':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Precisión de la Aritmética en C++',
          questionText: '¿Por qué la división 5 / 2 da 2 en lugar de 2.5 y cómo influye el tipo de los operandos en el resultado?',
          promptHint: 'Recuerda que en C++, entero entre entero siempre produce un entero truncado.',
          keyTakeaway: 'La rigidez de tipos en C++ evita conversiones implícitas costosas pero exige atención al detalle.'
        }
      ];
      break;

    case 'condicionales':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Bifurcaciones y Tablas de Salto',
          questionText: '¿En qué situaciones preferirías implementar un switch-case antes que una serie de if/else anidados?',
          promptHint: 'Piensa en la claridad de menús numéricos o de opciones por caracteres y el riesgo de olvidar break.',
          keyTakeaway: 'Elegir la estructura condicional adecuada no solo mejora la lectura humana, sino que permite optimizaciones al compilador.'
        }
      ];
      break;

    case 'ciclos':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Garantía de Ejecución y Bucles Infinitos',
          questionText: '¿Por qué la estructura do-while es la preferida universalmente para diseñar menús interactivos frente al while tradicional?',
          promptHint: 'El usuario necesita ver las opciones al menos una vez antes de que el programa valide si desea salir.',
          keyTakeaway: 'do-while asegura una primera ejecución garantizada antes de evaluar la condición de parada.'
        }
      ];
      break;

    case 'colecciones':
    case 'array':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Memoria Contigua y Buffer Overflow',
          questionText: '¿Qué significa que un arreglo resida de forma contigua en memoria y por qué el índice 0 representa el origen del casillero?',
          promptHint: 'Recuerda que índice es distancia o desplazamiento (offset): arr[0] es desplazamiento cero.',
          keyTakeaway: 'La contigüidad en memoria permite acceso O(1) instantáneo pero exige no salirse jamás de los límites.'
        }
      ];
      break;

    case 'vector':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. La Magia de std::vector: Tamaño vs Capacidad',
          questionText: '¿Por qué std::vector duplica su capacidad cuando se llena en lugar de pedir memoria de 1 en 1 casillero?',
          promptHint: 'Pedir memoria al sistema operativo es costoso; duplicar la capacidad amortiza el costo para que push_back sea O(1).',
          keyTakeaway: 'std::vector equilibra magistralmente el uso de memoria RAM con el rendimiento en tiempo de ejecución.'
        }
      ];
      break;

    case 'array-game':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. De la Matriz 2D al Mundo Virtual',
          questionText: '¿Cómo se conecta el concepto de matriz matemática mapa[y][x] con el renderizado de un videojuego en consola?',
          promptHint: 'Cada celda de la matriz almacena un estado (muro, comida, jugador) que se dibuja en pantalla fila por fila.',
          keyTakeaway: 'Las matrices 2D son la base de los motores de videojuegos basados en cuadrícula (Grid-based).'
        }
      ];
      break;

    case 'array-examen':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Ciclo de Vida CRUD',
          questionText: '¿Qué ventajas ofrece manipular un catálogo con iteradores y std::vector frente a un arreglo fijo estático?',
          promptHint: 'Piensa en la facilidad de agregar con push_back() y eliminar con erase() sin dejar huecos vacíos.',
          keyTakeaway: 'Dominar CRUD en vectores es la piedra angular para construir aplicaciones de gestión reales.'
        }
      ];
      break;

    case 'funciones':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Poder de la Referencia (&) y los Punteros (*)',
          questionText: '¿Qué diferencia crucial hay entre hacer una fotocopia (paso por valor) y entregar la llave del casillero original (paso por referencia &)?',
          promptHint: 'Reflexiona sobre el consumo de memoria al pasar un vector con 10,000 elementos con y sin el operador &.',
          keyTakeaway: 'El paso por referencia (&) y los punteros (*) son las herramientas que otorgan a C++ su legendaria velocidad.'
        }
      ];
      break;

    case 'poo-basico':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. El Principio de Encapsulamiento',
          questionText: '¿Por qué blindar los atributos como private y exponer métodos public es una práctica de ingeniería superior a dejar todo público?',
          promptHint: 'Piensa en qué pasaría si un usuario asignara un saldo bancario negativo o una velocidad imposible directamente.',
          keyTakeaway: 'El encapsulamiento protege la integridad de tu aplicación evitando estados corruptos en memoria.'
        }
      ];
      break;

    case 'poo-pilares':
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Polimorfismo Dinámico y Funciones Virtuales',
          questionText: '¿Qué superpoder aporta la palabra clave virtual al permitir que un bucle del juego ejecute entidades desconocidas en tiempo de compilación?',
          promptHint: 'Un solo vector de punteros a la clase base puede hacer atacar a dragones, zombies y magos sin cambiar el bucle principal.',
          keyTakeaway: 'El polimorfismo dinámico te permite construir software extensible que acepta nuevas clases en el futuro sin reescribir la base.'
        }
      ];
      break;

    default:
      specific = [
        {
          id: 5,
          category: 'CourseSpecific',
          title: '5. Consolidación de C++',
          questionText: '¿Cómo ha evolucionado tu confianza al programar desde los primeros días en PSeInt hasta hoy en C++?',
          promptHint: 'Reconoce el progreso: has pasado de pseudocódigo a manipular la memoria y el compilador de la industria.',
          keyTakeaway: 'Cada lección en C++ fortalece tu pensamiento analítico y tu capacidad técnica integral.'
        }
      ];
      break;
  }

  return [...base, ...specific];
}
