import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressLoopsExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 301 al 310 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 301,
    title: 'Bucle For Básico del 1 al 5',
    statement: 'Completa la condición del bucle for para que itere desde i = 1 hasta i <= 5.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La condición límite superior es i <= 5 (o range(1, 6) en Python).',
    explanation: 'El bucle for permite repetir un bloque de código un número determinado de veces.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= ___; i++) {\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['5']
      },
      python: {
        starterCode: `for i in range(1, ___):\n    print(i, end=" ")`,
        solutionCode: `for i in range(1, 6):\n    print(i, end=" ")`,
        acceptedKeywords: ['6']
      },
      javascript: {
        starterCode: `for (let i = 1; i <= ___; i++) {\n    console.log(i);\n}`,
        solutionCode: `for (let i = 1; i <= 5; i++) {\n    console.log(i);\n}`,
        acceptedKeywords: ['5']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= ___; i++) {\n            System.out.print(i + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + " ");\n        }\n    }\n}`,
        acceptedKeywords: ['5']
      }
    }
  },
  {
    id: 302,
    title: 'Acumulador de Suma',
    statement: 'Corrige la acumulación para sumar los números del 1 al 10 en la variable suma.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa suma += i (o suma = suma + i) en lugar de restar.',
    explanation: 'Un acumulador guarda la suma progresiva de los valores iterados en cada ciclo del bucle.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int suma = 0;\n    for (int i = 1; i <= 10; i++) {\n        // BUG: Resta en vez de sumar\n        suma -= i;\n    }\n    std::cout << suma << std::endl; // Debe ser 55\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int suma = 0;\n    for (int i = 1; i <= 10; i++) {\n        suma += i;\n    }\n    std::cout << suma << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `suma = 0\nfor i in range(1, 11):\n    suma -= i # BUG\nprint(suma)`,
        solutionCode: `suma = 0\nfor i in range(1, 11):\n    suma += i\nprint(suma)`
      },
      javascript: {
        starterCode: `let suma = 0;\nfor (let i = 1; i <= 10; i++) {\n    suma -= i; // BUG\n}\nconsole.log(suma);`,
        solutionCode: `let suma = 0;\nfor (let i = 1; i <= 10; i++) {\n    suma += i;\n}\nconsole.log(suma);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int suma = 0;\n        for (int i = 1; i <= 10; i++) {\n            suma -= i; // BUG\n        }\n        System.out.println(suma);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int suma = 0;\n        for (int i = 1; i <= 10; i++) {\n            suma += i;\n        }\n        System.out.println(suma);\n    }\n}`
      }
    }
  },
  {
    id: 303,
    title: 'Bucle While con Contador',
    statement: 'Completa la condición del bucle while para que se ejecute mientras contador sea menor que 5.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La condición es contador < 5.',
    explanation: 'El bucle while se repite indefinidamente mientras su condición lógica se evalúe como verdadera.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int contador = 0;\n    while (contador ___ 5) {\n        std::cout << contador << " ";\n        contador++;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int contador = 0;\n    while (contador < 5) {\n        std::cout << contador << " ";\n        contador++;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['<']
      },
      python: {
        starterCode: `contador = 0\nwhile contador ___ 5:\n    print(contador, end=" ")\n    contador += 1`,
        solutionCode: `contador = 0\nwhile contador < 5:\n    print(contador, end=" ")\n    contador += 1`,
        acceptedKeywords: ['<']
      },
      javascript: {
        starterCode: `let contador = 0;\nwhile (contador ___ 5) {\n    console.log(contador);\n    contador++;\n}`,
        solutionCode: `let contador = 0;\nwhile (contador < 5) {\n    console.log(contador);\n    contador++;\n}`,
        acceptedKeywords: ['<']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int contador = 0;\n        while (contador ___ 5) {\n            System.out.print(contador + " ");\n            contador++;\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int contador = 0;\n        while (contador < 5) {\n            System.out.print(contador + " ");\n            contador++;\n        }\n    }\n}`,
        acceptedKeywords: ['<']
      }
    }
  },
  {
    id: 304,
    title: 'Conteo Regresivo (Cuenta hacia Atrás)',
    statement: 'Corrige la actualización para que el bucle decremente de 10 a 1.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa i-- (o i -= 1) para decrementar hacia atrás.',
    explanation: 'Para contar en reversa, el valor inicial debe ser superior y decrementarse en cada iteración.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: i++ causa bucle infinito al contar hacia adelante\n    for (int i = 10; i >= 1; i++) {\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 10; i >= 1; i--) {\n        std::cout << i << " ";\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `# BUG: paso 1 no llega a 0\nfor i in range(10, 0, 1):\n    print(i, end=" ")`,
        solutionCode: `for i in range(10, 0, -1):\n    print(i, end=" ")`
      },
      javascript: {
        starterCode: `for (let i = 10; i >= 1; i++) { // BUG\n    console.log(i);\n}`,
        solutionCode: `for (let i = 10; i >= 1; i--) {\n    console.log(i);\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 10; i >= 1; i++) { // BUG\n            System.out.print(i + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 10; i >= 1; i--) {\n            System.out.print(i + " ");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 305,
    title: 'Impresión de Números Pares',
    statement: 'Completa el incremento para avanzar de 2 en 2 desde 0 hasta 10.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Avanza sumando 2 con i += 2.',
    explanation: 'El paso de incremento de un bucle for puede ser mayor a 1 para recorrer secuencias alternas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 0; i <= 10; i += ___) {\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 0; i <= 10; i += 2) {\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['2']
      },
      python: {
        starterCode: `for i in range(0, 11, ___):\n    print(i, end=" ")`,
        solutionCode: `for i in range(0, 11, 2):\n    print(i, end=" ")`,
        acceptedKeywords: ['2']
      },
      javascript: {
        starterCode: `for (let i = 0; i <= 10; i += ___) {\n    console.log(i);\n}`,
        solutionCode: `for (let i = 0; i <= 10; i += 2) {\n    console.log(i);\n}`,
        acceptedKeywords: ['2']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i <= 10; i += ___) {\n            System.out.print(i + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i <= 10; i += 2) {\n            System.out.print(i + " ");\n        }\n    }\n}`,
        acceptedKeywords: ['2']
      }
    }
  },
  {
    id: 306,
    title: 'Bucle Do-While (Ejecución Mínima)',
    statement: 'Corrige la condición para que el bucle do-while se ejecute una sola vez cuando num = 100.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'La condición num < 100 hace que termine tras la primera ejecución.',
    explanation: 'El bucle do-while garantiza que el bloque se ejecute al menos una vez antes de verificar la condición.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int num = 100;\n    // BUG: num == 100 se convierte en bucle infinito\n    do {\n        std::cout << "Ejecutado al menos una vez" << std::endl;\n    } while (num == 100);\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int num = 100;\n    do {\n        std::cout << "Ejecutado al menos una vez" << std::endl;\n    } while (num < 100);\n    return 0;\n}`
      },
      python: {
        starterCode: `num = 100\n# Simulación do-while en Python\nwhile True:\n    print("Ejecutado al menos una vez")\n    if num >= 100:\n        break`,
        solutionCode: `num = 100\nwhile True:\n    print("Ejecutado al menos una vez")\n    if num >= 100:\n        break`
      },
      javascript: {
        starterCode: `let num = 100;\ndo {\n    console.log("Ejecutado al menos una vez");\n} while (num === 100); // BUG`,
        solutionCode: `let num = 100;\ndo {\n    console.log("Ejecutado al menos una vez");\n} while (num < 100);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int num = 100;\n        do {\n            System.out.println("Ejecutado al menos una vez");\n        } while (num == 100); // BUG\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int num = 100;\n        do {\n            System.out.println("Ejecutado al menos una vez");\n        } while (num < 100);\n    }\n}`
      }
    }
  },
  {
    id: 307,
    title: 'Sentencia Break (Interrupción Prematura)',
    statement: 'Completa la instrucción break para detener el bucle cuando i llegue a 7.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La palabra clave para salir inmediatamente de un bucle es break.',
    explanation: 'La instrucción break termina la ejecución del bucle actual de forma inmediata.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 20; i++) {\n        if (i == 7) {\n            ___;\n        }\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 20; i++) {\n        if (i == 7) {\n            break;\n        }\n        std::cout << i << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['break']
      },
      python: {
        starterCode: `for i in range(1, 21):\n    if i == 7:\n        ___\n    print(i, end=" ")`,
        solutionCode: `for i in range(1, 21):\n    if i == 7:\n        break\n    print(i, end=" ")`,
        acceptedKeywords: ['break']
      },
      javascript: {
        starterCode: `for (let i = 1; i <= 20; i++) {\n    if (i === 7) {\n        ___;\n    }\n    console.log(i);\n}`,
        solutionCode: `for (let i = 1; i <= 20; i++) {\n    if (i === 7) {\n        break;\n    }\n    console.log(i);\n}`,
        acceptedKeywords: ['break']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 20; i++) {\n            if (i == 7) {\n                ___;\n            }\n            System.out.print(i + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 20; i++) {\n            if (i == 7) {\n                break;\n            }\n            System.out.print(i + " ");\n        }\n    }\n}`,
        acceptedKeywords: ['break']
      }
    }
  },
  {
    id: 308,
    title: 'Sentencia Continue (Saltar Iteración)',
    statement: 'Corrige la condición para omitir el número 3 e imprimir los demás del 1 al 5.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Comprueba i == 3 para aplicar continue.',
    explanation: 'La instrucción continue salta el resto del cuerpo del ciclo actual y avanza a la siguiente iteración.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        // BUG: Omite todos los distintos de 3\n        if (i != 3) {\n            continue;\n        }\n        std::cout << i << " "; // Debe imprimir 1 2 4 5\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i == 3) {\n            continue;\n        }\n        std::cout << i << " ";\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `for i in range(1, 6):\n    if i != 3: # BUG\n        continue\n    print(i, end=" ")`,
        solutionCode: `for i in range(1, 6):\n    if i == 3:\n        continue\n    print(i, end=" ")`
      },
      javascript: {
        starterCode: `for (let i = 1; i <= 5; i++) {\n    if (i !== 3) { // BUG\n        continue;\n    }\n    console.log(i);\n}`,
        solutionCode: `for (let i = 1; i <= 5; i++) {\n    if (i === 3) {\n        continue;\n    }\n    console.log(i);\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            if (i != 3) { // BUG\n                continue;\n            }\n            System.out.print(i + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            if (i == 3) {\n                continue;\n            }\n            System.out.print(i + " ");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 309,
    title: 'Contador de Ocurrencias',
    statement: 'Completa el incremento del contador cada vez que se encuentre un número par.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Incrementa pares++ o pares += 1.',
    explanation: 'Un contador se incrementa selectivamente bajo ciertas condiciones durante el recorrido.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int pares = 0;\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            ___;\n        }\n    }\n    std::cout << pares << std::endl; // 5\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int pares = 0;\n    for (int i = 1; i <= 10; i++) {\n        if (i % 2 == 0) {\n            pares++;\n        }\n    }\n    std::cout << pares << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['pares++', '++pares', 'pares += 1', 'pares = pares + 1']
      },
      python: {
        starterCode: `pares = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        ___\nprint(pares)`,
        solutionCode: `pares = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        pares += 1\nprint(pares)`,
        acceptedKeywords: ['pares += 1', 'pares = pares + 1']
      },
      javascript: {
        starterCode: `let pares = 0;\nfor (let i = 1; i <= 10; i++) {\n    if (i % 2 === 0) {\n        ___;\n    }\n}\nconsole.log(pares);`,
        solutionCode: `let pares = 0;\nfor (let i = 1; i <= 10; i++) {\n    if (i % 2 === 0) {\n        pares++;\n    }\n}\nconsole.log(pares);`,
        acceptedKeywords: ['pares++', '++pares', 'pares += 1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int pares = 0;\n        for (int i = 1; i <= 10; i++) {\n            if (i % 2 == 0) {\n                ___;\n            }\n        }\n        System.out.println(pares);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int pares = 0;\n        for (int i = 1; i <= 10; i++) {\n            if (i % 2 == 0) {\n                pares++;\n            }\n        }\n        System.out.println(pares);\n    }\n}`,
        acceptedKeywords: ['pares++', '++pares', 'pares += 1']
      }
    }
  },
  {
    id: 310,
    title: 'Producto / Factorial Acumulado',
    statement: 'Corrige la inicialización de la variable producto (factorial de 5 = 120).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El neutro multiplicativo inicial debe ser 1 (inicializar en 0 hace que todo producto dé 0).',
    explanation: 'Para acumular productos, la variable acumuladora debe comenzar en 1.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: 0 absorbe toda multiplicación\n    int fact = 0;\n    for (int i = 1; i <= 5; i++) {\n        fact *= i;\n    }\n    std::cout << fact << std::endl; // Debe ser 120\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int fact = 1;\n    for (int i = 1; i <= 5; i++) {\n        fact *= i;\n    }\n    std::cout << fact << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `fact = 0 # BUG\nfor i in range(1, 6):\n    fact *= i\nprint(fact)`,
        solutionCode: `fact = 1\nfor i in range(1, 6):\n    fact *= i\nprint(fact)`
      },
      javascript: {
        starterCode: `let fact = 0; // BUG\nfor (let i = 1; i <= 5; i++) {\n    fact *= i;\n}\nconsole.log(fact);`,
        solutionCode: `let fact = 1;\nfor (let i = 1; i <= 5; i++) {\n    fact *= i;\n}\nconsole.log(fact);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int fact = 0; // BUG\n        for (int i = 1; i <= 5; i++) {\n            fact *= i;\n        }\n        System.out.println(fact);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int fact = 1;\n        for (int i = 1; i <= 5; i++) {\n            fact *= i;\n        }\n        System.out.println(fact);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 311 al 320 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 311,
    title: 'Recorrido de Cadena Carácter a Carácter',
    statement: 'Completa la condición del bucle para iterar hasta la longitud de la cadena texto.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Itera mientras i < texto.length() (o len(texto)).',
    explanation: 'Recorrer una cadena por índices permite analizar cada carácter individualmente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string texto = "Hola";\n    for (size_t i = 0; i < texto.___(); i++) {\n        std::cout << texto[i] << "-";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string texto = "Hola";\n    for (size_t i = 0; i < texto.length(); i++) {\n        std::cout << texto[i] << "-";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['length', 'size']
      },
      python: {
        starterCode: `texto = "Hola"\nfor i in range(___(texto)):\n    print(texto[i] + "-", end="")`,
        solutionCode: `texto = "Hola"\nfor i in range(len(texto)):\n    print(texto[i] + "-", end="")`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let texto = "Hola";\nfor (let i = 0; i < texto.___; i++) {\n    console.log(texto[i]);\n}`,
        solutionCode: `let texto = "Hola";\nfor (let i = 0; i < texto.length; i++) {\n    console.log(texto[i]);\n}`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String texto = "Hola";\n        for (int i = 0; i < texto.___(); i++) {\n            System.out.print(texto.charAt(i) + "-");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String texto = "Hola";\n        for (int i = 0; i < texto.length(); i++) {\n            System.out.print(texto.charAt(i) + "-");\n        }\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 312,
    title: 'Tabla de Multiplicar de un Número',
    statement: 'Corrige la multiplicación para generar la tabla del 7 (7 x 1, 7 x 2, ..., 7 x 10).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Multiplica 7 * i.',
    explanation: 'En cada iteración calculamos el producto de la base por el índice del bucle.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int base = 7;\n    for (int i = 1; i <= 10; i++) {\n        // BUG: Suma en vez de multiplicar\n        int resultado = base + i;\n        std::cout << resultado << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int base = 7;\n    for (int i = 1; i <= 10; i++) {\n        int resultado = base * i;\n        std::cout << resultado << " ";\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `base = 7\nfor i in range(1, 11):\n    resultado = base + i # BUG\n    print(resultado, end=" ")`,
        solutionCode: `base = 7\nfor i in range(1, 11):\n    resultado = base * i\n    print(resultado, end=" ")`
      },
      javascript: {
        starterCode: `let base = 7;\nfor (let i = 1; i <= 10; i++) {\n    let resultado = base + i; // BUG\n    console.log(resultado);\n}`,
        solutionCode: `let base = 7;\nfor (let i = 1; i <= 10; i++) {\n    let resultado = base * i;\n    console.log(resultado);\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int base = 7;\n        for (int i = 1; i <= 10; i++) {\n            int resultado = base + i; // BUG\n            System.out.print(resultado + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int base = 7;\n        for (int i = 1; i <= 10; i++) {\n            int resultado = base * i;\n            System.out.print(resultado + " ");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 313,
    title: 'Bucles Anidados (Cuadrícula 3x3)',
    statement: 'Completa la condición del bucle interior j para que itere 3 veces por cada fila i.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La condición es j < 3 (o j <= 3 según índice).',
    explanation: 'Los bucles anidados permiten recorrer estructuras de dos dimensiones como filas y columnas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < ___; j++) {\n            std::cout << "* ";\n        }\n        std::cout << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            std::cout << "* ";\n        }\n        std::cout << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['3']
      },
      python: {
        starterCode: `for i in range(3):\n    for j in range(___):\n        print("*", end=" ")\n    print()`,
        solutionCode: `for i in range(3):\n    for j in range(3):\n        print("*", end=" ")\n    print()`,
        acceptedKeywords: ['3']
      },
      javascript: {
        starterCode: `for (let i = 0; i < 3; i++) {\n    for (let j = 0; j < ___; j++) {\n        process.stdout.write("* ");\n    }\n    console.log();\n}`,
        solutionCode: `for (let i = 0; i < 3; i++) {\n    for (let j = 0; j < 3; j++) {\n        process.stdout.write("* ");\n    }\n    console.log();\n}`,
        acceptedKeywords: ['3']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            for (int j = 0; j < ___; j++) {\n                System.out.print("* ");\n            }\n            System.out.println();\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            for (int j = 0; j < 3; j++) {\n                System.out.print("* ");\n            }\n            System.out.println();\n        }\n    }\n}`,
        acceptedKeywords: ['3']
      }
    }
  },
  {
    id: 314,
    title: 'Búsqueda de Primer Múltiplo con Break',
    statement: 'Corrige la condición para detener el bucle cuando se encuentre el primer múltiplo de 7 mayor a 20 (21).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba i % 7 == 0 para hacer break.',
    explanation: 'El break permite optimizar búsquedas saliendo inmediatamente al hallar el resultado deseado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int primerMultiplo = -1;\n    for (int i = 21; i <= 50; i++) {\n        // BUG: Condición incorrecta\n        if (i % 2 == 0) {\n            primerMultiplo = i;\n            break;\n        }\n    }\n    std::cout << primerMultiplo << std::endl; // Debe ser 21\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int primerMultiplo = -1;\n    for (int i = 21; i <= 50; i++) {\n        if (i % 7 == 0) {\n            primerMultiplo = i;\n            break;\n        }\n    }\n    std::cout << primerMultiplo << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `primer_multiplo = -1\nfor i in range(21, 51):\n    if i % 2 == 0: # BUG\n        primer_multiplo = i\n        break\nprint(primer_multiplo)`,
        solutionCode: `primer_multiplo = -1\nfor i in range(21, 51):\n    if i % 7 == 0:\n        primer_multiplo = i\n        break\nprint(primer_multiplo)`
      },
      javascript: {
        starterCode: `let primerMultiplo = -1;\nfor (let i = 21; i <= 50; i++) {\n    if (i % 2 === 0) { // BUG\n        primerMultiplo = i;\n        break;\n    }\n}\nconsole.log(primerMultiplo);`,
        solutionCode: `let primerMultiplo = -1;\nfor (let i = 21; i <= 50; i++) {\n    if (i % 7 === 0) {\n        primerMultiplo = i;\n        break;\n    }\n}\nconsole.log(primerMultiplo);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int primerMultiplo = -1;\n        for (int i = 21; i <= 50; i++) {\n            if (i % 2 == 0) { // BUG\n                primerMultiplo = i;\n                break;\n            }\n        }\n        System.out.println(primerMultiplo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int primerMultiplo = -1;\n        for (int i = 21; i <= 50; i++) {\n            if (i % 7 == 0) {\n                primerMultiplo = i;\n                break;\n            }\n        }\n        System.out.println(primerMultiplo);\n    }\n}`
      }
    }
  },
  {
    id: 315,
    title: 'Bucle For-Each (Rango de Elementos)',
    statement: 'Completa la sintaxis for-each para iterar sobre cada elemento x de la colección.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'En C++ usa (int x : nums), en Python for x in nums, en JS for (let x of nums).',
    explanation: 'El bucle for-each simplifica la lectura de colecciones sin manejar índices manuales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    for (int x ___ nums) {\n        std::cout << x << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    for (int x : nums) {\n        std::cout << x << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: [':']
      },
      python: {
        starterCode: `nums = [10, 20, 30]\nfor x ___ nums:\n    print(x, end=" ")`,
        solutionCode: `nums = [10, 20, 30]\nfor x in nums:\n    print(x, end=" ")`,
        acceptedKeywords: ['in']
      },
      javascript: {
        starterCode: `let nums = [10, 20, 30];\nfor (let x ___ nums) {\n    console.log(x);\n}`,
        solutionCode: `let nums = [10, 20, 30];\nfor (let x of nums) {\n    console.log(x);\n}`,
        acceptedKeywords: ['of']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        for (int x ___ nums) {\n            System.out.print(x + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        for (int x : nums) {\n            System.out.print(x + " ");\n        }\n    }\n}`,
        acceptedKeywords: [':']
      }
    }
  },
  {
    id: 316,
    title: 'Generador de Potencias de 2',
    statement: 'Corrige la actualización para duplicar el valor en cada ciclo (1, 2, 4, 8, 16).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Multiplica val *= 2.',
    explanation: 'Multiplicar la variable acumuladora por la base genera progresiones geométricas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int val = 1;\n    while (val <= 16) {\n        std::cout << val << " ";\n        // BUG: Suma 2 en vez de duplicar (*= 2)\n        val += 2;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int val = 1;\n    while (val <= 16) {\n        std::cout << val << " ";\n        val *= 2;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `val = 1\nwhile val <= 16:\n    print(val, end=" ")\n    val += 2 # BUG`,
        solutionCode: `val = 1\nwhile val <= 16:\n    print(val, end=" ")\n    val *= 2`
      },
      javascript: {
        starterCode: `let val = 1;\nwhile (val <= 16) {\n    console.log(val);\n    val += 2; // BUG\n}`,
        solutionCode: `let val = 1;\nwhile (val <= 16) {\n    console.log(val);\n    val *= 2;\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int val = 1;\n        while (val <= 16) {\n            System.out.print(val + " ");\n            val += 2; // BUG\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int val = 1;\n        while (val <= 16) {\n            System.out.print(val + " ");\n            val *= 2;\n        }\n    }\n}`
      }
    }
  },
  {
    id: 317,
    title: 'Conteo de Dígitos de un Número',
    statement: 'Completa la división entera por 10 para reducir el número en cada iteración del conteo.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Divide n entre 10 con n /= 10.',
    explanation: 'Dividir sucesivamente por 10 elimina el último dígito en el sistema decimal.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int n = 54321;\n    int digitos = 0;\n    while (n > 0) {\n        digitos++;\n        n /= ___;\n    }\n    std::cout << digitos << std::endl; // 5\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int n = 54321;\n    int digitos = 0;\n    while (n > 0) {\n        digitos++;\n        n /= 10;\n    }\n    std::cout << digitos << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['10']
      },
      python: {
        starterCode: `n = 54321\ndigitos = 0\nwhile n > 0:\n    digitos += 1\n    n //= ___\nprint(digitos)`,
        solutionCode: `n = 54321\ndigitos = 0\nwhile n > 0:\n    digitos += 1\n    n //= 10\nprint(digitos)`,
        acceptedKeywords: ['10']
      },
      javascript: {
        starterCode: `let n = 54321;\nlet digitos = 0;\nwhile (n > 0) {\n    digitos++;\n    n = Math.floor(n / ___);\n}\nconsole.log(digitos);`,
        solutionCode: `let n = 54321;\nlet digitos = 0;\nwhile (n > 0) {\n    digitos++;\n    n = Math.floor(n / 10);\n}\nconsole.log(digitos);`,
        acceptedKeywords: ['10']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 54321;\n        int digitos = 0;\n        while (n > 0) {\n            digitos++;\n            n /= ___;\n        }\n        System.out.println(digitos);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 54321;\n        int digitos = 0;\n        while (n > 0) {\n            digitos++;\n            n /= 10;\n        }\n        System.out.println(digitos);\n    }\n}`,
        acceptedKeywords: ['10']
      }
    }
  },
  {
    id: 318,
    title: 'Inversión de un Número Entero',
    statement: 'Corrige la fórmula de inversión para agregar el dígito a la derecha: invertido = invertido * 10 + digito.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Desplaza a la izquierda multiplicando por 10 y suma el residuo.',
    explanation: 'Al multiplicar el valor acumulado por 10 y sumarle el residuo, construimos el número invertido.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int n = 1234;\n    int invertido = 0;\n    while (n > 0) {\n        int digito = n % 10;\n        // BUG: Suma sin desplazar decenas\n        invertido = invertido + digito;\n        n /= 10;\n    }\n    std::cout << invertido << std::endl; // Debe ser 4321\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int n = 1234;\n    int invertido = 0;\n    while (n > 0) {\n        int digito = n % 10;\n        invertido = invertido * 10 + digito;\n        n /= 10;\n    }\n    std::cout << invertido << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `n = 1234\ninvertido = 0\nwhile n > 0:\n    digito = n % 10\n    invertido = invertido + digito # BUG\n    n //= 10\nprint(invertido)`,
        solutionCode: `n = 1234\ninvertido = 0\nwhile n > 0:\n    digito = n % 10\n    invertido = invertido * 10 + digito\n    n //= 10\nprint(invertido)`
      },
      javascript: {
        starterCode: `let n = 1234;\nlet invertido = 0;\nwhile (n > 0) {\n    let digito = n % 10;\n    invertido = invertido + digito; // BUG\n    n = Math.floor(n / 10);\n}\nconsole.log(invertido);`,
        solutionCode: `let n = 1234;\nlet invertido = 0;\nwhile (n > 0) {\n    let digito = n % 10;\n    invertido = invertido * 10 + digito;\n    n = Math.floor(n / 10);\n}\nconsole.log(invertido);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 1234;\n        int invertido = 0;\n        while (n > 0) {\n            int digito = n % 10;\n            invertido = invertido + digito; // BUG\n            n /= 10;\n        }\n        System.out.println(invertido);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 1234;\n        int invertido = 0;\n        while (n > 0) {\n            int digito = n % 10;\n            invertido = invertido * 10 + digito;\n            n /= 10;\n        }\n        System.out.println(invertido);\n    }\n}`
      }
    }
  },
  {
    id: 319,
    title: 'Verificación de Número Primo con Bucle',
    statement: 'Completa la condición de divisibilidad: si n % i == 0 el número no es primo.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba n % i == 0.',
    explanation: 'Un número mayor a 1 es primo si no tiene ningún divisor entero exacto entre 2 y su raíz cuadrada.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int n = 17;\n    bool esPrimo = true;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == ___) {\n            esPrimo = false;\n            break;\n        }\n    }\n    std::cout << (esPrimo ? "Primo" : "No Primo") << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int n = 17;\n    bool esPrimo = true;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            esPrimo = false;\n            break;\n        }\n    }\n    std::cout << (esPrimo ? "Primo" : "No Primo") << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `n = 17\nes_primo = True\nfor i in range(2, int(n**0.5) + 1):\n    if n % i == ___:\n        es_primo = False\n        break\nprint("Primo" if es_primo else "No Primo")`,
        solutionCode: `n = 17\nes_primo = True\nfor i in range(2, int(n**0.5) + 1):\n    if n % i == 0:\n        es_primo = False\n        break\nprint("Primo" if es_primo else "No Primo")`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let n = 17;\nlet esPrimo = true;\nfor (let i = 2; i * i <= n; i++) {\n    if (n % i === ___) {\n        esPrimo = false;\n        break;\n    }\n}\nconsole.log(esPrimo ? "Primo" : "No Primo");`,
        solutionCode: `let n = 17;\nlet esPrimo = true;\nfor (let i = 2; i * i <= n; i++) {\n    if (n % i === 0) {\n        esPrimo = false;\n        break;\n    }\n}\nconsole.log(esPrimo ? "Primo" : "No Primo");`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 17;\n        boolean esPrimo = true;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == ___) {\n                esPrimo = false;\n                break;\n            }\n        }\n        System.out.println(esPrimo ? "Primo" : "No Primo");\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 17;\n        boolean esPrimo = true;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) {\n                esPrimo = false;\n                break;\n            }\n        }\n        System.out.println(esPrimo ? "Primo" : "No Primo");\n    }\n}`,
        acceptedKeywords: ['0']
      }
    }
  },
  {
    id: 320,
    title: 'Dibujo de Triángulo de Asteriscos',
    statement: 'Corrige la condición del bucle interior j para que en la fila i dibuje exactamente i asteriscos (j <= i).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'El bucle interior debe iterar hasta j <= i.',
    explanation: 'Al vincular el límite del bucle interno con el contador del externo se generan figuras triangulares.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 4; i++) {\n        // BUG: j <= 4 imprime un cuadrado en vez de un triángulo\n        for (int j = 1; j <= 4; j++) {\n            std::cout << "*";\n        }\n        std::cout << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    for (int i = 1; i <= 4; i++) {\n        for (int j = 1; j <= i; j++) {\n            std::cout << "*";\n        }\n        std::cout << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `for i in range(1, 5):\n    for j in range(1, 5): # BUG\n        print("*", end="")\n    print()`,
        solutionCode: `for i in range(1, 5):\n    for j in range(1, i + 1):\n        print("*", end="")\n    print()`
      },
      javascript: {
        starterCode: `for (let i = 1; i <= 4; i++) {\n    let row = "";\n    for (let j = 1; j <= 4; j++) { // BUG\n        row += "*";\n    }\n    console.log(row);\n}`,
        solutionCode: `for (let i = 1; i <= 4; i++) {\n    let row = "";\n    for (let j = 1; j <= i; j++) {\n        row += "*";\n    }\n    console.log(row);\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 4; i++) {\n            for (int j = 1; j <= 4; j++) { // BUG\n                System.out.print("*");\n            }\n            System.out.println();\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 4; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print("*");\n            }\n            System.out.println();\n        }\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 321 al 330 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 321,
    title: 'Generación de la Serie de Fibonacci',
    statement: 'Completa la actualización de las dos variables previas (siguiente = a + b; a = b; b = siguiente).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'El siguiente término es a + b.',
    explanation: 'Cada término de Fibonacci es la suma de los dos términos inmediatamente anteriores.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 0, b = 1;\n    for (int i = 0; i < 7; i++) {\n        std::cout << a << " ";\n        int sig = a + ___;\n        a = b;\n        b = sig;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 0, b = 1;\n    for (int i = 0; i < 7; i++) {\n        std::cout << a << " ";\n        int sig = a + b;\n        a = b;\n        b = sig;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['b']
      },
      python: {
        starterCode: `a, b = 0, 1\nfor _ in range(7):\n    print(a, end=" ")\n    a, b = b, a + ___`,
        solutionCode: `a, b = 0, 1\nfor _ in range(7):\n    print(a, end=" ")\n    a, b = b, a + b`,
        acceptedKeywords: ['b']
      },
      javascript: {
        starterCode: `let a = 0, b = 1;\nfor (let i = 0; i < 7; i++) {\n    console.log(a);\n    let sig = a + ___;\n    a = b;\n    b = sig;\n}`,
        solutionCode: `let a = 0, b = 1;\nfor (let i = 0; i < 7; i++) {\n    console.log(a);\n    let sig = a + b;\n    a = b;\n    b = sig;\n}`,
        acceptedKeywords: ['b']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 0, b = 1;\n        for (int i = 0; i < 7; i++) {\n            System.out.print(a + " ");\n            int sig = a + ___;\n            a = b;\n            b = sig;\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 0, b = 1;\n        for (int i = 0; i < 7; i++) {\n            System.out.print(a + " ");\n            int sig = a + b;\n            a = b;\n            b = sig;\n        }\n    }\n}`,
        acceptedKeywords: ['b']
      }
    }
  },
  {
    id: 322,
    title: 'Algoritmo de Euclides (MCD con While)',
    statement: 'Corrige el cálculo del Máximo Común Divisor: a = b, b = temp % b.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa temp = b; b = a % b; a = temp;',
    explanation: 'El algoritmo de Euclides reduce el par (a, b) a (b, a % b) hasta que el residuo sea cero.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 48, b = 18;\n    while (b != 0) {\n        int temp = b;\n        // BUG: Resta en vez de módulo\n        b = a - b;\n        a = temp;\n    }\n    std::cout << a << std::endl; // Debe dar 6\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 48, b = 18;\n    while (b != 0) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }\n    std::cout << a << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `a, b = 48, 18\nwhile b != 0:\n    a, b = b, a - b # BUG\nprint(a)`,
        solutionCode: `a, b = 48, 18\nwhile b != 0:\n    a, b = b, a % b\nprint(a)`
      },
      javascript: {
        starterCode: `let a = 48, b = 18;\nwhile (b !== 0) {\n    let temp = b;\n    b = a - b; // BUG\n    a = temp;\n}\nconsole.log(a);`,
        solutionCode: `let a = 48, b = 18;\nwhile (b !== 0) {\n    let temp = b;\n    b = a % b;\n    a = temp;\n}\nconsole.log(a);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 48, b = 18;\n        while (b != 0) {\n            int temp = b;\n            b = a - b; // BUG\n            a = temp;\n        }\n        System.out.println(a);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 48, b = 18;\n        while (b != 0) {\n            int temp = b;\n            b = a % b;\n            a = temp;\n        }\n        System.out.println(a);\n    }\n}`
      }
    }
  },
  {
    id: 323,
    title: 'Técnica de Dos Punteros (Two Pointers Loop)',
    statement: 'Completa la condición del bucle de convergencia mientras izq sea menor que der.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'El bucle corre mientras izq < der.',
    explanation: 'Dos punteros avanzan hacia el centro para invertir arreglos o buscar pares ordenados en O(n).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {1, 2, 3, 4, 5};\n    int izq = 0, der = v.size() - 1;\n    while (izq ___ der) {\n        std::swap(v[izq], v[der]);\n        izq++;\n        der--;\n    }\n    std::cout << v[0] << " " << v[4] << std::endl; // 5 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {1, 2, 3, 4, 5};\n    int izq = 0, der = v.size() - 1;\n    while (izq < der) {\n        std::swap(v[izq], v[der]);\n        izq++;\n        der--;\n    }\n    std::cout << v[0] << " " << v[4] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['<']
      },
      python: {
        starterCode: `v = [1, 2, 3, 4, 5]\nizq, der = 0, len(v) - 1\nwhile izq ___ der:\n    v[izq], v[der] = v[der], v[izq]\n    izq += 1\n    der -= 1\nprint(v[0], v[4])`,
        solutionCode: `v = [1, 2, 3, 4, 5]\nizq, der = 0, len(v) - 1\nwhile izq < der:\n    v[izq], v[der] = v[der], v[izq]\n    izq += 1\n    der -= 1\nprint(v[0], v[4])`,
        acceptedKeywords: ['<']
      },
      javascript: {
        starterCode: `let v = [1, 2, 3, 4, 5];\nlet izq = 0, der = v.length - 1;\nwhile (izq ___ der) {\n    let temp = v[izq];\n    v[izq] = v[der];\n    v[der] = temp;\n    izq++;\n    der--;\n}\nconsole.log(v[0], v[4]);`,
        solutionCode: `let v = [1, 2, 3, 4, 5];\nlet izq = 0, der = v.length - 1;\nwhile (izq < der) {\n    let temp = v[izq];\n    v[izq] = v[der];\n    v[der] = temp;\n    izq++;\n    der--;\n}\nconsole.log(v[0], v[4]);`,
        acceptedKeywords: ['<']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {1, 2, 3, 4, 5};\n        int izq = 0, der = v.length - 1;\n        while (izq ___ der) {\n            int temp = v[izq];\n            v[izq] = v[der];\n            v[der] = temp;\n            izq++;\n            der--;\n        }\n        System.out.println(v[0] + " " + v[4]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {1, 2, 3, 4, 5};\n        int izq = 0, der = v.length - 1;\n        while (izq < der) {\n            int temp = v[izq];\n            v[izq] = v[der];\n            v[der] = temp;\n            izq++;\n            der--;\n        }\n        System.out.println(v[0] + " " + v[4]);\n    }\n}`,
        acceptedKeywords: ['<']
      }
    }
  },
  {
    id: 324,
    title: 'Comprobación de Palíndromo con Bucle',
    statement: 'Corrige la comparación de extremos para verificar si palabra[i] != palabra[longitud - 1 - i].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Compara palabra[i] != palabra[n - 1 - i].',
    explanation: 'Un palíndromo coincide exactamente al comparar los caracteres simétricos desde los extremos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = "reconocer";\n    bool esPal = true;\n    int n = s.length();\n    for (int i = 0; i < n / 2; i++) {\n        // BUG: Índice simétrico incorrecto\n        if (s[i] != s[n - i]) {\n            esPal = false;\n            break;\n        }\n    }\n    std::cout << (esPal ? "Palíndromo" : "No") << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = "reconocer";\n    bool esPal = true;\n    int n = s.length();\n    for (int i = 0; i < n / 2; i++) {\n        if (s[i] != s[n - 1 - i]) {\n            esPal = false;\n            break;\n        }\n    }\n    std::cout << (esPal ? "Palíndromo" : "No") << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `s = "reconocer"\nes_pal = True\nn = len(s)\nfor i in range(n // 2):\n    if s[i] != s[n - i]: # BUG\n        es_pal = False\n        break\nprint("Palíndromo" if es_pal else "No")`,
        solutionCode: `s = "reconocer"\nes_pal = True\nn = len(s)\nfor i in range(n // 2):\n    if s[i] != s[n - 1 - i]:\n        es_pal = False\n        break\nprint("Palíndromo" if es_pal else "No")`
      },
      javascript: {
        starterCode: `let s = "reconocer";\nlet esPal = true;\nlet n = s.length;\nfor (let i = 0; i < Math.floor(n / 2); i++) {\n    if (s[i] !== s[n - i]) { // BUG\n        esPal = false;\n        break;\n    }\n}\nconsole.log(esPal ? "Palíndromo" : "No");`,
        solutionCode: `let s = "reconocer";\nlet esPal = true;\nlet n = s.length;\nfor (let i = 0; i < Math.floor(n / 2); i++) {\n    if (s[i] !== s[n - 1 - i]) {\n        esPal = false;\n        break;\n    }\n}\nconsole.log(esPal ? "Palíndromo" : "No");`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "reconocer";\n        boolean esPal = true;\n        int n = s.length();\n        for (int i = 0; i < n / 2; i++) {\n            if (s.charAt(i) != s.charAt(n - i)) { // BUG\n                esPal = false;\n                break;\n            }\n        }\n        System.out.println(esPal ? "Palíndromo" : "No");\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "reconocer";\n        boolean esPal = true;\n        int n = s.length();\n        for (int i = 0; i < n / 2; i++) {\n            if (s.charAt(i) != s.charAt(n - 1 - i)) {\n                esPal = false;\n                break;\n            }\n        }\n        System.out.println(esPal ? "Palíndromo" : "No");\n    }\n}`
      }
    }
  },
  {
    id: 325,
    title: 'Criba de Eratóstenes (Marcado con Bucles)',
    statement: 'Completa el incremento del bucle interno para marcar múltiplos de p (j += p).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Avanza sumando p en cada paso: j += p.',
    explanation: 'La criba de Eratóstenes tacha los múltiplos de cada primo avanzando de p en p.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    int N = 30;\n    std::vector<bool> primo(N + 1, true);\n    for (int p = 2; p * p <= N; p++) {\n        if (primo[p]) {\n            for (int j = p * p; j <= N; j += ___) {\n                primo[j] = false;\n            }\n        }\n    }\n    std::cout << primo[29] << std::endl; // 1 (true)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    int N = 30;\n    std::vector<bool> primo(N + 1, true);\n    for (int p = 2; p * p <= N; p++) {\n        if (primo[p]) {\n            for (int j = p * p; j <= N; j += p) {\n                primo[j] = false;\n            }\n        }\n    }\n    std::cout << primo[29] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['p']
      },
      python: {
        starterCode: `N = 30\nprimo = [True] * (N + 1)\nfor p in range(2, int(N**0.5) + 1):\n    if primo[p]:\n        for j in range(p * p, N + 1, ___):\n            primo[j] = False\nprint(primo[29])`,
        solutionCode: `N = 30\nprimo = [True] * (N + 1)\nfor p in range(2, int(N**0.5) + 1):\n    if primo[p]:\n        for j in range(p * p, N + 1, p):\n            primo[j] = False\nprint(primo[29])`,
        acceptedKeywords: ['p']
      },
      javascript: {
        starterCode: `let N = 30;\nlet primo = new Array(N + 1).fill(true);\nfor (let p = 2; p * p <= N; p++) {\n    if (primo[p]) {\n        for (let j = p * p; j <= N; j += ___) {\n            primo[j] = false;\n        }\n    }\n}\nconsole.log(primo[29]);`,
        solutionCode: `let N = 30;\nlet primo = new Array(N + 1).fill(true);\nfor (let p = 2; p * p <= N; p++) {\n    if (primo[p]) {\n        for (let j = p * p; j <= N; j += p) {\n            primo[j] = false;\n        }\n    }\n}\nconsole.log(primo[29]);`,
        acceptedKeywords: ['p']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int N = 30;\n        boolean[] primo = new boolean[N + 1];\n        java.util.Arrays.fill(primo, true);\n        for (int p = 2; p * p <= N; p++) {\n            if (primo[p]) {\n                for (int j = p * p; j <= N; j += ___) {\n                    primo[j] = false;\n                }\n            }\n        }\n        System.out.println(primo[29]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int N = 30;\n        boolean[] primo = new boolean[N + 1];\n        java.util.Arrays.fill(primo, true);\n        for (int p = 2; p * p <= N; p++) {\n            if (primo[p]) {\n                for (int j = p * p; j <= N; j += p) {\n                    primo[j] = false;\n                }\n            }\n        }\n        System.out.println(primo[29]);\n    }\n}`,
        acceptedKeywords: ['p']
      }
    }
  },
  {
    id: 326,
    title: 'Detección de Subcadena (Fuerza Bruta)',
    statement: 'Corrige la condición de coincidencia cuando todos los caracteres del patrón coinciden (coincide = true).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Si coinciden todos los m caracteres, retorna el índice de inicio i.',
    explanation: 'El algoritmo de coincidencia de patrones compara ventanas de longitud m a lo largo del texto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string texto = "abcdef", patron = "cde";\n    int n = texto.length(), m = patron.length();\n    int pos = -1;\n    for (int i = 0; i <= n - m; i++) {\n        bool ok = true;\n        for (int j = 0; j < m; j++) {\n            if (texto[i + j] != patron[j]) { ok = false; break; }\n        }\n        // BUG: Guarda posición cuando NO coincide\n        if (!ok) { pos = i; break; }\n    }\n    std::cout << pos << std::endl; // Debe ser 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string texto = "abcdef", patron = "cde";\n    int n = texto.length(), m = patron.length();\n    int pos = -1;\n    for (int i = 0; i <= n - m; i++) {\n        bool ok = true;\n        for (int j = 0; j < m; j++) {\n            if (texto[i + j] != patron[j]) { ok = false; break; }\n        }\n        if (ok) { pos = i; break; }\n    }\n    std::cout << pos << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `texto, patron = "abcdef", "cde"\nn, m = len(texto), len(patron)\npos = -1\nfor i in range(n - m + 1):\n    if not all(texto[i+j] == patron[j] for j in range(m)): # BUG\n        pos = i\n        break\nprint(pos)`,
        solutionCode: `texto, patron = "abcdef", "cde"\nn, m = len(texto), len(patron)\npos = -1\nfor i in range(n - m + 1):\n    if all(texto[i+j] == patron[j] for j in range(m)):\n        pos = i\n        break\nprint(pos)`
      },
      javascript: {
        starterCode: `let texto = "abcdef", patron = "cde";\nlet n = texto.length, m = patron.length;\nlet pos = -1;\nfor (let i = 0; i <= n - m; i++) {\n    let ok = true;\n    for (let j = 0; j < m; j++) {\n        if (texto[i + j] !== patron[j]) { ok = false; break; }\n    }\n    if (!ok) { pos = i; break; } // BUG\n}\nconsole.log(pos);`,
        solutionCode: `let texto = "abcdef", patron = "cde";\nlet n = texto.length, m = patron.length;\nlet pos = -1;\nfor (let i = 0; i <= n - m; i++) {\n    let ok = true;\n    for (let j = 0; j < m; j++) {\n        if (texto[i + j] !== patron[j]) { ok = false; break; }\n    }\n    if (ok) { pos = i; break; }\n}\nconsole.log(pos);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String texto = "abcdef", patron = "cde";\n        int n = texto.length(), m = patron.length();\n        int pos = -1;\n        for (int i = 0; i <= n - m; i++) {\n            boolean ok = true;\n            for (int j = 0; j < m; j++) {\n                if (texto.charAt(i + j) != patron.charAt(j)) { ok = false; break; }\n            }\n            if (!ok) { pos = i; break; } // BUG\n        }\n        System.out.println(pos);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String texto = "abcdef", patron = "cde";\n        int n = texto.length(), m = patron.length();\n        int pos = -1;\n        for (int i = 0; i <= n - m; i++) {\n            boolean ok = true;\n            for (int j = 0; j < m; j++) {\n                if (texto.charAt(i + j) != patron.charAt(j)) { ok = false; break; }\n            }\n            if (ok) { pos = i; break; }\n        }\n        System.out.println(pos);\n    }\n}`
      }
    }
  },
  {
    id: 327,
    title: 'Generación de Matriz Espiral (Límites de Bucle)',
    statement: 'Completa la actualización del límite superior top tras recorrer la primera fila horizontal.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Incrementa top con top++.',
    explanation: 'El recorrido en espiral encoge los límites (top, bottom, left, right) progresivamente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int top = 0, bottom = 2, left = 0, right = 2;\n    // Tras recorrer fila superior:\n    ___;\n    std::cout << top << std::endl; // 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int top = 0, bottom = 2, left = 0, right = 2;\n    top++;\n    std::cout << top << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['top++', '++top', 'top += 1']
      },
      python: {
        starterCode: `top, bottom, left, right = 0, 2, 0, 2\n___\nprint(top)`,
        solutionCode: `top, bottom, left, right = 0, 2, 0, 2\ntop += 1\nprint(top)`,
        acceptedKeywords: ['top += 1', 'top = top + 1']
      },
      javascript: {
        starterCode: `let top = 0, bottom = 2, left = 0, right = 2;\n___;\nconsole.log(top);`,
        solutionCode: `let top = 0, bottom = 2, left = 0, right = 2;\ntop++;\nconsole.log(top);`,
        acceptedKeywords: ['top++', '++top', 'top += 1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int top = 0, bottom = 2, left = 0, right = 2;\n        ___;\n        System.out.println(top);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int top = 0, bottom = 2, left = 0, right = 2;\n        top++;\n        System.out.println(top);\n    }\n}`,
        acceptedKeywords: ['top++', '++top', 'top += 1']
      }
    }
  },
  {
    id: 328,
    title: 'Compresión RLE (Run-Length Encoding con While)',
    statement: 'Corrige el bucle interno para contar caracteres consecutivos iguales mientras j < n y s[j] == s[i].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Comprueba j < n && s[j] == s[i].',
    explanation: 'La compresión RLE agrupa rachas de caracteres idénticos consecutivos con un bucle de avance.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = "aaabbc";\n    int n = s.length();\n    std::string res = "";\n    for (int i = 0; i < n; ) {\n        int j = i;\n        // BUG: Condición invertida\n        while (j < n && s[j] != s[i]) {\n            j++;\n        }\n        res += s[i] + std::to_string(j - i);\n        i = j;\n    }\n    std::cout << res << std::endl; // a3b2c1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = "aaabbc";\n    int n = s.length();\n    std::string res = "";\n    for (int i = 0; i < n; ) {\n        int j = i;\n        while (j < n && s[j] == s[i]) {\n            j++;\n        }\n        res += s[i] + std::to_string(j - i);\n        i = j;\n    }\n    std::cout << res << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `s = "aaabbc"\nn = len(s)\nres = ""\ni = 0\nwhile i < n:\n    j = i\n    while j < n and s[j] != s[i]: # BUG\n        j += 1\n    res += s[i] + str(j - i)\n    i = j\nprint(res)`,
        solutionCode: `s = "aaabbc"\nn = len(s)\nres = ""\ni = 0\nwhile i < n:\n    j = i\n    while j < n and s[j] == s[i]:\n        j += 1\n    res += s[i] + str(j - i)\n    i = j\nprint(res)`
      },
      javascript: {
        starterCode: `let s = "aaabbc";\nlet n = s.length;\nlet res = "";\nlet i = 0;\nwhile (i < n) {\n    let j = i;\n    while (j < n && s[j] !== s[i]) { j++; } // BUG\n    res += s[i] + (j - i);\n    i = j;\n}\nconsole.log(res);`,
        solutionCode: `let s = "aaabbc";\nlet n = s.length;\nlet res = "";\nlet i = 0;\nwhile (i < n) {\n    let j = i;\n    while (j < n && s[j] === s[i]) { j++; }\n    res += s[i] + (j - i);\n    i = j;\n}\nconsole.log(res);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "aaabbc";\n        int n = s.length();\n        StringBuilder res = new StringBuilder();\n        int i = 0;\n        while (i < n) {\n            int j = i;\n            while (j < n && s.charAt(j) != s.charAt(i)) { j++; } // BUG\n            res.append(s.charAt(i)).append(j - i);\n            i = j;\n        }\n        System.out.println(res.toString());\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "aaabbc";\n        int n = s.length();\n        StringBuilder res = new StringBuilder();\n        int i = 0;\n        while (i < n) {\n            int j = i;\n            while (j < n && s.charAt(j) == s.charAt(i)) { j++; }\n            res.append(s.charAt(i)).append(j - i);\n            i = j;\n        }\n        System.out.println(res.toString());\n    }\n}`
      }
    }
  },
  {
    id: 329,
    title: 'Ventana Deslizante (Sliding Window Sum)',
    statement: 'Completa la actualización de la ventana: suma = suma - v[i - k] + v[___].',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Suma el nuevo elemento entrante v[i].',
    explanation: 'La ventana deslizante calcula sumas continuas de tamaño k en O(1) restando el elemento saliente y sumando el entrante.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {2, 1, 5, 1, 3, 2};\n    int k = 3;\n    int suma = 2 + 1 + 5; // 8\n    int maxSuma = suma;\n    for (size_t i = k; i < v.size(); i++) {\n        suma = suma - v[i - k] + v[___];\n        if (suma > maxSuma) maxSuma = suma;\n    }\n    std::cout << maxSuma << std::endl; // 9\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {2, 1, 5, 1, 3, 2};\n    int k = 3;\n    int suma = 2 + 1 + 5;\n    int maxSuma = suma;\n    for (size_t i = k; i < v.size(); i++) {\n        suma = suma - v[i - k] + v[i];\n        if (suma > maxSuma) maxSuma = suma;\n    }\n    std::cout << maxSuma << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['i']
      },
      python: {
        starterCode: `v = [2, 1, 5, 1, 3, 2]\nk = 3\nsuma = sum(v[:k])\nmax_suma = suma\nfor i in range(k, len(v)):\n    suma = suma - v[i - k] + v[___]\n    max_suma = max(max_suma, suma)\nprint(max_suma)`,
        solutionCode: `v = [2, 1, 5, 1, 3, 2]\nk = 3\nsuma = sum(v[:k])\nmax_suma = suma\nfor i in range(k, len(v)):\n    suma = suma - v[i - k] + v[i]\n    max_suma = max(max_suma, suma)\nprint(max_suma)`,
        acceptedKeywords: ['i']
      },
      javascript: {
        starterCode: `let v = [2, 1, 5, 1, 3, 2];\nlet k = 3;\nlet suma = 8;\nlet maxSuma = suma;\nfor (let i = k; i < v.length; i++) {\n    suma = suma - v[i - k] + v[___];\n    if (suma > maxSuma) maxSuma = suma;\n}\nconsole.log(maxSuma);`,
        solutionCode: `let v = [2, 1, 5, 1, 3, 2];\nlet k = 3;\nlet suma = 8;\nlet maxSuma = suma;\nfor (let i = k; i < v.length; i++) {\n    suma = suma - v[i - k] + v[i];\n    if (suma > maxSuma) maxSuma = suma;\n}\nconsole.log(maxSuma);`,
        acceptedKeywords: ['i']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {2, 1, 5, 1, 3, 2};\n        int k = 3;\n        int suma = 8;\n        int maxSuma = suma;\n        for (int i = k; i < v.length; i++) {\n            suma = suma - v[i - k] + v[___];\n            if (suma > maxSuma) maxSuma = suma;\n        }\n        System.out.println(maxSuma);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {2, 1, 5, 1, 3, 2};\n        int k = 3;\n        int suma = 8;\n        int maxSuma = suma;\n        for (int i = k; i < v.length; i++) {\n            suma = suma - v[i - k] + v[i];\n            if (suma > maxSuma) maxSuma = suma;\n        }\n        System.out.println(maxSuma);\n    }\n}`,
        acceptedKeywords: ['i']
      }
    }
  },
  {
    id: 330,
    title: 'Bucle Infinito con Salida por Centinela',
    statement: 'Corrige la condición de corte para salir del bucle interactivo cuando la entrada sea -1.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa if (valor == -1) break;',
    explanation: 'El valor centinela es un dato especial que indica el fin de la secuencia de entrada.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int entradas[] = {10, 20, 30, -1, 50};\n    int idx = 0;\n    int total = 0;\n    while (true) {\n        int val = entradas[idx++];\n        // BUG: Sale con números positivos en vez de -1\n        if (val > 0) {\n            break;\n        }\n        total += val;\n    }\n    std::cout << total << std::endl; // Debe ser 60 (10+20+30)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int entradas[] = {10, 20, 30, -1, 50};\n    int idx = 0;\n    int total = 0;\n    while (true) {\n        int val = entradas[idx++];\n        if (val == -1) {\n            break;\n        }\n        total += val;\n    }\n    std::cout << total << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `entradas = [10, 20, 30, -1, 50]\nidx, total = 0, 0\nwhile True:\n    val = entradas[idx]\n    idx += 1\n    if val > 0: # BUG\n        break\n    total += val\nprint(total)`,
        solutionCode: `entradas = [10, 20, 30, -1, 50]\nidx, total = 0, 0\nwhile True:\n    val = entradas[idx]\n    idx += 1\n    if val == -1:\n        break\n    total += val\nprint(total)`
      },
      javascript: {
        starterCode: `let entradas = [10, 20, 30, -1, 50];\nlet idx = 0, total = 0;\nwhile (true) {\n    let val = entradas[idx++];\n    if (val > 0) { break; } // BUG\n    total += val;\n}\nconsole.log(total);`,
        solutionCode: `let entradas = [10, 20, 30, -1, 50];\nlet idx = 0, total = 0;\nwhile (true) {\n    let val = entradas[idx++];\n    if (val === -1) { break; }\n    total += val;\n}\nconsole.log(total);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] entradas = {10, 20, 30, -1, 50};\n        int idx = 0, total = 0;\n        while (true) {\n            int val = entradas[idx++];\n            if (val > 0) { break; } // BUG\n            total += val;\n        }\n        System.out.println(total);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] entradas = {10, 20, 30, -1, 50};\n        int idx = 0, total = 0;\n        while (true) {\n            int val = entradas[idx++];\n            if (val == -1) { break; }\n            total += val;\n        }\n        System.out.println(total);\n    }\n}`
      }
    }
  }
];
