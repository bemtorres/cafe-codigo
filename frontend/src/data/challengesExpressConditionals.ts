import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressConditionalsExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 201 al 210 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 201,
    title: 'Condición If Simple',
    statement: 'Completa la palabra clave if para verificar si la puntuación es mayor o igual a 100.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La palabra clave condicional es if.',
    explanation: 'La instrucción if evalúa una expresión booleana y ejecuta el bloque de código si resulta verdadera.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int puntos = 120;\n    ___ (puntos >= 100) {\n        std::cout << "¡Nivel completado!" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int puntos = 120;\n    if (puntos >= 100) {\n        std::cout << "¡Nivel completado!" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['if']
      },
      python: {
        starterCode: `puntos = 120\n___ puntos >= 100:\n    print("¡Nivel completado!")`,
        solutionCode: `puntos = 120\nif puntos >= 100:\n    print("¡Nivel completado!")`,
        acceptedKeywords: ['if']
      },
      javascript: {
        starterCode: `let puntos = 120;\n___ (puntos >= 100) {\n    console.log("¡Nivel completado!");\n}`,
        solutionCode: `let puntos = 120;\nif (puntos >= 100) {\n    console.log("¡Nivel completado!");\n}`,
        acceptedKeywords: ['if']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int puntos = 120;\n        ___ (puntos >= 100) {\n            System.out.println("¡Nivel completado!");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int puntos = 120;\n        if (puntos >= 100) {\n            System.out.println("¡Nivel completado!");\n        }\n    }\n}`,
        acceptedKeywords: ['if']
      }
    }
  },
  {
    id: 202,
    title: 'Estructura If-Else',
    statement: 'Corrige la condición para imprimir "Aprobado" si la nota es mayor o igual a 4.0.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'La condición de aprobación es nota >= 4.0.',
    explanation: 'El bloque else se ejecuta obligatoriamente cuando la condición del if resulta falsa.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    double nota = 5.5;\n    // BUG: La condición está invertida\n    if (nota < 4.0) {\n        std::cout << "Aprobado" << std::endl;\n    } else {\n        std::cout << "Reprobado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    double nota = 5.5;\n    if (nota >= 4.0) {\n        std::cout << "Aprobado" << std::endl;\n    } else {\n        std::cout << "Reprobado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `nota = 5.5\nif nota < 4.0: # BUG\n    print("Aprobado")\nelse:\n    print("Reprobado")`,
        solutionCode: `nota = 5.5\nif nota >= 4.0:\n    print("Aprobado")\nelse:\n    print("Reprobado")`
      },
      javascript: {
        starterCode: `let nota = 5.5;\nif (nota < 4.0) { // BUG\n    console.log("Aprobado");\n} else {\n    console.log("Reprobado");\n}`,
        solutionCode: `let nota = 5.5;\nif (nota >= 4.0) {\n    console.log("Aprobado");\n} else {\n    console.log("Reprobado");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        double nota = 5.5;\n        // BUG\n        if (nota < 4.0) {\n            System.out.println("Aprobado");\n        } else {\n            System.out.println("Reprobado");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double nota = 5.5;\n        if (nota >= 4.0) {\n            System.out.println("Aprobado");\n        } else {\n            System.out.println("Reprobado");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 203,
    title: 'Operador de Igualdad (==)',
    statement: 'Corrige la condición para verificar si la variable clave coincide con el valor 1234 usando el operador de comparación ==.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa == para comparar igualdad (un solo = es asignación).',
    explanation: 'El operador == compara dos valores sin modificarlos, a diferencia de = que asigna un nuevo valor.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int clave = 1234;\n    // BUG: Asignación = en vez de comparación ==\n    if (clave = 9999) {\n        std::cout << "Acceso concedido" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int clave = 1234;\n    if (clave == 1234) {\n        std::cout << "Acceso concedido" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `clave = 1234\nif clave == 1234:\n    print("Acceso concedido")`,
        solutionCode: `clave = 1234\nif clave == 1234:\n    print("Acceso concedido")`
      },
      javascript: {
        starterCode: `let clave = 1234;\nif (clave == 1234) {\n    console.log("Acceso concedido");\n}`,
        solutionCode: `let clave = 1234;\nif (clave == 1234) {\n    console.log("Acceso concedido");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int clave = 1234;\n        if (clave == 1234) {\n            System.out.println("Acceso concedido");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int clave = 1234;\n        if (clave == 1234) {\n            System.out.println("Acceso concedido");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 204,
    title: 'Comprobación de Número Par',
    statement: 'Completa la condición de paridad comprobando si el residuo num % 2 es igual a 0.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Comprueba num % 2 == 0.',
    explanation: 'Un número entero es par si al dividirse por 2 su residuo es exactamente 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int num = 14;\n    if (num % 2 == ___) {\n        std::cout << "Es par" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int num = 14;\n    if (num % 2 == 0) {\n        std::cout << "Es par" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `num = 14\nif num % 2 == ___:\n    print("Es par")`,
        solutionCode: `num = 14\nif num % 2 == 0:\n    print("Es par")`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let num = 14;\nif (num % 2 === ___) {\n    console.log("Es par");\n}`,
        solutionCode: `let num = 14;\nif (num % 2 === 0) {\n    console.log("Es par");\n}`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int num = 14;\n        if (num % 2 == ___) {\n            System.out.println("Es par");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int num = 14;\n        if (num % 2 == 0) {\n            System.out.println("Es par");\n        }\n    }\n}`,
        acceptedKeywords: ['0']
      }
    }
  },
  {
    id: 205,
    title: 'Mayor de Edad (Mayor o Igual a 18)',
    statement: 'Corrige la condición para verificar que la persona tenga al menos 18 años.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'La condición de mayoría de edad es edad >= 18.',
    explanation: 'El operador >= incluye al valor límite especificado (18 inclusive).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int edad = 18;\n    // BUG: edad > 18 excluye a quienes tienen exactamente 18\n    if (edad > 18) {\n        std::cout << "Mayor de edad" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int edad = 18;\n    if (edad >= 18) {\n        std::cout << "Mayor de edad" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `edad = 18\nif edad > 18: # BUG\n    print("Mayor de edad")`,
        solutionCode: `edad = 18\nif edad >= 18:\n    print("Mayor de edad")`
      },
      javascript: {
        starterCode: `let edad = 18;\nif (edad > 18) { // BUG\n    console.log("Mayor de edad");\n}`,
        solutionCode: `let edad = 18;\nif (edad >= 18) {\n    console.log("Mayor de edad");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 18;\n        if (edad > 18) { // BUG\n            System.out.println("Mayor de edad");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 18;\n        if (edad >= 18) {\n            System.out.println("Mayor de edad");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 206,
    title: 'Operador de Desigualdad (!=)',
    statement: 'Completa el operador de desigualdad (!=) para verificar que el estado no sea "cerrado".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El operador de distinto/desigualdad es !=.',
    explanation: 'El operador != comprueba que dos valores sean diferentes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string estado = "abierto";\n    if (estado ___ "cerrado") {\n        std::cout << "Puede ingresar" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string estado = "abierto";\n    if (estado != "cerrado") {\n        std::cout << "Puede ingresar" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['!=']
      },
      python: {
        starterCode: `estado = "abierto"\nif estado ___ "cerrado":\n    print("Puede ingresar")`,
        solutionCode: `estado = "abierto"\nif estado != "cerrado":\n    print("Puede ingresar")`,
        acceptedKeywords: ['!=']
      },
      javascript: {
        starterCode: `let estado = "abierto";\nif (estado ___ "cerrado") {\n    console.log("Puede ingresar");\n}`,
        solutionCode: `let estado = "abierto";\nif (estado !== "cerrado") {\n    console.log("Puede ingresar");\n}`,
        acceptedKeywords: ['!==', '!=']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String estado = "abierto";\n        if (!estado.equals("cerrado")) {\n            System.out.println("Puede ingresar");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String estado = "abierto";\n        if (!estado.equals("cerrado")) {\n            System.out.println("Puede ingresar");\n        }\n    }\n}`,
        acceptedKeywords: ['!']
      }
    }
  },
  {
    id: 207,
    title: 'Cláusula Else',
    statement: 'Completa la palabra clave else para manejar el caso contrario.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Escribe la palabra clave else.',
    explanation: 'else captura todas las situaciones donde la condición previa no se cumplió.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool logueado = false;\n    if (logueado) {\n        std::cout << "Panel de Usuario" << std::endl;\n    } ___ {\n        std::cout << "Iniciar Sesión" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool logueado = false;\n    if (logueado) {\n        std::cout << "Panel de Usuario" << std::endl;\n    } else {\n        std::cout << "Iniciar Sesión" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['else']
      },
      python: {
        starterCode: `logueado = False\nif logueado:\n    print("Panel de Usuario")\n___:\n    print("Iniciar Sesión")`,
        solutionCode: `logueado = False\nif logueado:\n    print("Panel de Usuario")\nelse:\n    print("Iniciar Sesión")`,
        acceptedKeywords: ['else']
      },
      javascript: {
        starterCode: `let logueado = false;\nif (logueado) {\n    console.log("Panel de Usuario");\n} ___ {\n    console.log("Iniciar Sesión");\n}`,
        solutionCode: `let logueado = false;\nif (logueado) {\n    console.log("Panel de Usuario");\n} else {\n    console.log("Iniciar Sesión");\n}`,
        acceptedKeywords: ['else']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean logueado = false;\n        if (logueado) {\n            System.out.println("Panel de Usuario");\n        } ___ {\n            System.out.println("Iniciar Sesión");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean logueado = false;\n        if (logueado) {\n            System.out.println("Panel de Usuario");\n        } else {\n            System.out.println("Iniciar Sesión");\n        }\n    }\n}`,
        acceptedKeywords: ['else']
      }
    }
  },
  {
    id: 208,
    title: 'Positivo, Negativo o Cero Básico',
    statement: 'Corrige la verificación de número positivo para n > 0.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Un número es positivo si n > 0.',
    explanation: 'El cero no es positivo ni negativo; los positivos son estrictamente mayores que 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int n = 7;\n    // BUG: n < 0 verifica negativos\n    if (n < 0) {\n        std::cout << "Es positivo" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int n = 7;\n    if (n > 0) {\n        std::cout << "Es positivo" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `n = 7\nif n < 0: # BUG\n    print("Es positivo")`,
        solutionCode: `n = 7\nif n > 0:\n    print("Es positivo")`
      },
      javascript: {
        starterCode: `let n = 7;\nif (n < 0) { // BUG\n    console.log("Es positivo");\n}`,
        solutionCode: `let n = 7;\nif (n > 0) {\n    console.log("Es positivo");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n        if (n < 0) { // BUG\n            System.out.println("Es positivo");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n        if (n > 0) {\n            System.out.println("Es positivo");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 209,
    title: 'Comparación Menor Que (<)',
    statement: 'Completa el operador relacional para comprobar si la temperatura es menor a 0 grados (congelación).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa el operador <.',
    explanation: 'El operador < comprueba si el valor izquierdo es estrictamente inferior al derecho.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int temp = -3;\n    if (temp ___ 0) {\n        std::cout << "Bajo cero" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int temp = -3;\n    if (temp < 0) {\n        std::cout << "Bajo cero" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['<']
      },
      python: {
        starterCode: `temp = -3\nif temp ___ 0:\n    print("Bajo cero")`,
        solutionCode: `temp = -3\nif temp < 0:\n    print("Bajo cero")`,
        acceptedKeywords: ['<']
      },
      javascript: {
        starterCode: `let temp = -3;\nif (temp ___ 0) {\n    console.log("Bajo cero");\n}`,
        solutionCode: `let temp = -3;\nif (temp < 0) {\n    console.log("Bajo cero");\n}`,
        acceptedKeywords: ['<']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int temp = -3;\n        if (temp ___ 0) {\n            System.out.println("Bajo cero");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int temp = -3;\n        if (temp < 0) {\n            System.out.println("Bajo cero");\n        }\n    }\n}`,
        acceptedKeywords: ['<']
      }
    }
  },
  {
    id: 210,
    title: 'Comprobación de Booleano Directo',
    statement: 'Corrige la condición eliminando la redundancia if (activo == true) por la forma idiomática if (activo).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Las variables booleanas se evalúan directamente con if (activo).',
    explanation: 'No es necesario comparar una variable booleana con == true, ya que la variable en sí misma es un valor de verdad.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool activo = true;\n    if (activo == true) {\n        std::cout << "Servicio en línea" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool activo = true;\n    if (activo) {\n        std::cout << "Servicio en línea" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `activo = True\nif activo == True:\n    print("Servicio en línea")`,
        solutionCode: `activo = True\nif activo:\n    print("Servicio en línea")`
      },
      javascript: {
        starterCode: `let activo = true;\nif (activo === true) {\n    console.log("Servicio en línea");\n}`,
        solutionCode: `let activo = true;\nif (activo) {\n    console.log("Servicio en línea");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean activo = true;\n        if (activo == true) {\n            System.out.println("Servicio en línea");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean activo = true;\n        if (activo) {\n            System.out.println("Servicio en línea");\n        }\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 211 al 220 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 211,
    title: 'Operador Lógico AND (&& / and)',
    statement: 'Completa el operador lógico AND para comprobar que la edad esté entre 18 y 65 inclusive.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa && en C++/Java/JS o and en Python.',
    explanation: 'El operador AND requiere que ambas condiciones evaluadas sean verdaderas simultáneamente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int edad = 30;\n    if (edad >= 18 ___ edad <= 65) {\n        std::cout << "Edad laboral activa" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int edad = 30;\n    if (edad >= 18 && edad <= 65) {\n        std::cout << "Edad laboral activa" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['&&', 'and']
      },
      python: {
        starterCode: `edad = 30\nif edad >= 18 ___ edad <= 65:\n    print("Edad laboral activa")`,
        solutionCode: `edad = 30\nif edad >= 18 and edad <= 65:\n    print("Edad laboral activa")`,
        acceptedKeywords: ['and']
      },
      javascript: {
        starterCode: `let edad = 30;\nif (edad >= 18 ___ edad <= 65) {\n    console.log("Edad laboral activa");\n}`,
        solutionCode: `let edad = 30;\nif (edad >= 18 && edad <= 65) {\n    console.log("Edad laboral activa");\n}`,
        acceptedKeywords: ['&&']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 30;\n        if (edad >= 18 ___ edad <= 65) {\n            System.out.println("Edad laboral activa");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 30;\n        if (edad >= 18 && edad <= 65) {\n            System.out.println("Edad laboral activa");\n        }\n    }\n}`,
        acceptedKeywords: ['&&']
      }
    }
  },
  {
    id: 212,
    title: 'Operador Lógico OR (|| / or)',
    statement: 'Corrige la condición para conceder acceso si el usuario es administrador O tiene pase VIP.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa el operador OR (|| en C++/JS/Java o or en Python) en lugar de AND.',
    explanation: 'El operador OR evalúa a verdadero si al menos una de las dos condiciones se cumple.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool esAdmin = false;\n    bool esVIP = true;\n    // BUG: AND exige ambas, pero basta con una\n    if (esAdmin && esVIP) {\n        std::cout << "Acceso Permitido" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool esAdmin = false;\n    bool esVIP = true;\n    if (esAdmin || esVIP) {\n        std::cout << "Acceso Permitido" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `es_admin = False\nes_vip = True\nif es_admin and es_vip: # BUG\n    print("Acceso Permitido")`,
        solutionCode: `es_admin = False\nes_vip = True\nif es_admin or es_vip:\n    print("Acceso Permitido")`
      },
      javascript: {
        starterCode: `let esAdmin = false;\nlet esVIP = true;\nif (esAdmin && esVIP) { // BUG\n    console.log("Acceso Permitido");\n}`,
        solutionCode: `let esAdmin = false;\nlet esVIP = true;\nif (esAdmin || esVIP) {\n    console.log("Acceso Permitido");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean esAdmin = false;\n        boolean esVIP = true;\n        if (esAdmin && esVIP) { // BUG\n            System.out.println("Acceso Permitido");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean esAdmin = false;\n        boolean esVIP = true;\n        if (esAdmin || esVIP) {\n            System.out.println("Acceso Permitido");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 213,
    title: 'Estructura Else-If / Elif Escalonada',
    statement: 'Completa la cláusula intermedia para calificar la nota mayor o igual a 60 como "Suficiente".',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa else if en C++/JS/Java o elif en Python.',
    explanation: 'else if permite evaluar una condición secundaria únicamente cuando la anterior fue falsa.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int nota = 75;\n    if (nota >= 90) {\n        std::cout << "Excelente" << std::endl;\n    } ___ (nota >= 60) {\n        std::cout << "Suficiente" << std::endl;\n    } else {\n        std::cout << "Insuficiente" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int nota = 75;\n    if (nota >= 90) {\n        std::cout << "Excelente" << std::endl;\n    } else if (nota >= 60) {\n        std::cout << "Suficiente" << std::endl;\n    } else {\n        std::cout << "Insuficiente" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['else if']
      },
      python: {
        starterCode: `nota = 75\nif nota >= 90:\n    print("Excelente")\n___ nota >= 60:\n    print("Suficiente")\nelse:\n    print("Insuficiente")`,
        solutionCode: `nota = 75\nif nota >= 90:\n    print("Excelente")\nelif nota >= 60:\n    print("Suficiente")\nelse:\n    print("Insuficiente")`,
        acceptedKeywords: ['elif']
      },
      javascript: {
        starterCode: `let nota = 75;\nif (nota >= 90) {\n    console.log("Excelente");\n} ___ (nota >= 60) {\n    console.log("Suficiente");\n} else {\n    console.log("Insuficiente");\n}`,
        solutionCode: `let nota = 75;\nif (nota >= 90) {\n    console.log("Excelente");\n} else if (nota >= 60) {\n    console.log("Suficiente");\n} else {\n    console.log("Insuficiente");\n}`,
        acceptedKeywords: ['else if']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int nota = 75;\n        if (nota >= 90) {\n            System.out.println("Excelente");\n        } ___ (nota >= 60) {\n            System.out.println("Suficiente");\n        } else {\n            System.out.println("Insuficiente");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int nota = 75;\n        if (nota >= 90) {\n            System.out.println("Excelente");\n        } else if (nota >= 60) {\n            System.out.println("Suficiente");\n        } else {\n            System.out.println("Insuficiente");\n        }\n    }\n}`,
        acceptedKeywords: ['else if']
      }
    }
  },
  {
    id: 214,
    title: 'Operador Ternario Condicional',
    statement: 'Corrige la expresión con operador ternario para asignar "Mayor" si edad >= 18, o "Menor" en caso contrario.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'La sintaxis es: condicion ? valorTrue : valorFalse.',
    explanation: 'El operador ternario ? : resume una estructura if-else en una única expresión asignable.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    int edad = 20;\n    // BUG: Los resultados están invertidos\n    std::string estado = (edad >= 18) ? "Menor" : "Mayor";\n    std::cout << estado << std::endl; // Debe ser "Mayor"\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    int edad = 20;\n    std::string estado = (edad >= 18) ? "Mayor" : "Menor";\n    std::cout << estado << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `edad = 20\nestado = "Menor" if edad >= 18 else "Mayor" # BUG\nprint(estado)`,
        solutionCode: `edad = 20\nestado = "Mayor" if edad >= 18 else "Menor"\nprint(estado)`
      },
      javascript: {
        starterCode: `let edad = 20;\nlet estado = (edad >= 18) ? "Menor" : "Mayor"; // BUG\nconsole.log(estado);`,
        solutionCode: `let edad = 20;\nlet estado = (edad >= 18) ? "Mayor" : "Menor";\nconsole.log(estado);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 20;\n        String estado = (edad >= 18) ? "Menor" : "Mayor"; // BUG\n        System.out.println(estado);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 20;\n        String estado = (edad >= 18) ? "Mayor" : "Menor";\n        System.out.println(estado);\n    }\n}`
      }
    }
  },
  {
    id: 215,
    title: 'Validación de Rango Numérico (Hora Válida)',
    statement: 'Completa la validación para asegurar que la hora esté en el rango de 0 a 23.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba hora >= 0 && hora <= 23.',
    explanation: 'Para validar que un valor pertenezca a un intervalo cerrado se acotan el extremo inferior y superior con AND.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int hora = 14;\n    if (hora >= 0 && hora <= ___) {\n        std::cout << "Hora válida" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int hora = 14;\n    if (hora >= 0 && hora <= 23) {\n        std::cout << "Hora válida" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['23']
      },
      python: {
        starterCode: `hora = 14\nif 0 <= hora <= ___:\n    print("Hora válida")`,
        solutionCode: `hora = 14\nif 0 <= hora <= 23:\n    print("Hora válida")`,
        acceptedKeywords: ['23']
      },
      javascript: {
        starterCode: `let hora = 14;\nif (hora >= 0 && hora <= ___) {\n    console.log("Hora válida");\n}`,
        solutionCode: `let hora = 14;\nif (hora >= 0 && hora <= 23) {\n    console.log("Hora válida");\n}`,
        acceptedKeywords: ['23']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int hora = 14;\n        if (hora >= 0 && hora <= ___) {\n            System.out.println("Hora válida");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int hora = 14;\n        if (hora >= 0 && hora <= 23) {\n            System.out.println("Hora válida");\n        }\n    }\n}`,
        acceptedKeywords: ['23']
      }
    }
  },
  {
    id: 216,
    title: 'Negación Lógica en Condición',
    statement: 'Corrige la condición para ejecutar el código si el archivo NO está guardado (!guardado).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa !guardado (o not guardado en Python).',
    explanation: 'El operador NOT invierte la condición para ejecutar el bloque cuando el valor es falso.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool guardado = false;\n    // BUG: Ejecuta solo si está guardado\n    if (guardado) {\n        std::cout << "Advertencia: Cambios sin guardar" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool guardado = false;\n    if (!guardado) {\n        std::cout << "Advertencia: Cambios sin guardar" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `guardado = False\nif guardado: # BUG\n    print("Advertencia: Cambios sin guardar")`,
        solutionCode: `guardado = False\nif not guardado:\n    print("Advertencia: Cambios sin guardar")`
      },
      javascript: {
        starterCode: `let guardado = false;\nif (guardado) { // BUG\n    console.log("Advertencia: Cambios sin guardar");\n}`,
        solutionCode: `let guardado = false;\nif (!guardado) {\n    console.log("Advertencia: Cambios sin guardar");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean guardado = false;\n        if (guardado) { // BUG\n            System.out.println("Advertencia: Cambios sin guardar");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean guardado = false;\n        if (!guardado) {\n            System.out.println("Advertencia: Cambios sin guardar");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 217,
    title: 'Mayor de Tres Números',
    statement: 'Completa la condición para determinar si a es estrictamente mayor que b y que c.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba a > b && a > c.',
    explanation: 'Para que un valor sea el máximo absoluto debe superar a todos los demás elementos comparados.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 15, b = 10, c = 8;\n    if (a > b && a > ___) {\n        std::cout << "a es el mayor" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 15, b = 10, c = 8;\n    if (a > b && a > c) {\n        std::cout << "a es el mayor" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['c']
      },
      python: {
        starterCode: `a, b, c = 15, 10, 8\nif a > b and a > ___:\n    print("a es el mayor")`,
        solutionCode: `a, b, c = 15, 10, 8\nif a > b and a > c:\n    print("a es el mayor")`,
        acceptedKeywords: ['c']
      },
      javascript: {
        starterCode: `let a = 15, b = 10, c = 8;\nif (a > b && a > ___) {\n    console.log("a es el mayor");\n}`,
        solutionCode: `let a = 15, b = 10, c = 8;\nif (a > b && a > c) {\n    console.log("a es el mayor");\n}`,
        acceptedKeywords: ['c']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 15, b = 10, c = 8;\n        if (a > b && a > ___) {\n            System.out.println("a es el mayor");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 15, b = 10, c = 8;\n        if (a > b && a > c) {\n            System.out.println("a es el mayor");\n        }\n    }\n}`,
        acceptedKeywords: ['c']
      }
    }
  },
  {
    id: 218,
    title: 'Descuento con Múltiples Criterios',
    statement: 'Corrige la condición para aplicar descuento si el total supera 100 O si tiene cupón "PROMO10".',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa OR (|| o or) para que cualquiera de las dos condiciones sea suficiente.',
    explanation: 'El operador OR activa el beneficio comercial si se satisface al menos uno de los requisitos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    double total = 80.0;\n    std::string cupon = "PROMO10";\n    // BUG: AND exige ambas, pero el cupón aplica por sí solo\n    if (total > 100.0 && cupon == "PROMO10") {\n        std::cout << "Descuento aplicado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    double total = 80.0;\n    std::string cupon = "PROMO10";\n    if (total > 100.0 || cupon == "PROMO10") {\n        std::cout << "Descuento aplicado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `total = 80.0\ncupon = "PROMO10"\nif total > 100.0 and cupon == "PROMO10": # BUG\n    print("Descuento aplicado")`,
        solutionCode: `total = 80.0\ncupon = "PROMO10"\nif total > 100.0 or cupon == "PROMO10":\n    print("Descuento aplicado")`
      },
      javascript: {
        starterCode: `let total = 80.0;\nlet cupon = "PROMO10";\nif (total > 100.0 && cupon === "PROMO10") { // BUG\n    console.log("Descuento aplicado");\n}`,
        solutionCode: `let total = 80.0;\nlet cupon = "PROMO10";\nif (total > 100.0 || cupon === "PROMO10") {\n    console.log("Descuento aplicado");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        double total = 80.0;\n        String cupon = "PROMO10";\n        if (total > 100.0 && cupon.equals("PROMO10")) { // BUG\n            System.out.println("Descuento aplicado");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double total = 80.0;\n        String cupon = "PROMO10";\n        if (total > 100.0 || cupon.equals("PROMO10")) {\n            System.out.println("Descuento aplicado");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 219,
    title: 'Comprobación de String Vacío',
    statement: 'Completa la verificación para comprobar si el nombre está vacío (.empty() o len == 0).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa .empty() en C++, len() == 0 en Python, .length === 0 en JS, o .isEmpty() en Java.',
    explanation: 'Validar si una cadena no contiene caracteres evita errores al procesar entradas de usuario.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string nombre = "";\n    if (nombre.___()) {\n        std::cout << "Nombre requerido" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string nombre = "";\n    if (nombre.empty()) {\n        std::cout << "Nombre requerido" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['empty']
      },
      python: {
        starterCode: `nombre = ""\nif ___(nombre) == 0:\n    print("Nombre requerido")`,
        solutionCode: `nombre = ""\nif len(nombre) == 0:\n    print("Nombre requerido")`,
        acceptedKeywords: ['len', 'not nombre']
      },
      javascript: {
        starterCode: `let nombre = "";\nif (nombre.___ === 0) {\n    console.log("Nombre requerido");\n}`,
        solutionCode: `let nombre = "";\nif (nombre.length === 0) {\n    console.log("Nombre requerido");\n}`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String nombre = "";\n        if (nombre.___()) {\n            System.out.println("Nombre requerido");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String nombre = "";\n        if (nombre.isEmpty()) {\n            System.out.println("Nombre requerido");\n        }\n    }\n}`,
        acceptedKeywords: ['isEmpty']
      }
    }
  },
  {
    id: 220,
    title: 'Clasificación de Temperatura (Frío/Templado/Calor)',
    statement: 'Corrige el orden de las ramas condicionales para clasificar 28 grados como "Calor".',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Evalúa primero si temp >= 25 para calor, luego temp >= 15 para templado, sino frío.',
    explanation: 'En cadenas else-if las condiciones más restrictivas o de umbral superior deben evaluarse antes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int temp = 28;\n    // BUG: La condición temp >= 15 atrapa 28 antes de llegar a temp >= 25\n    if (temp >= 15) {\n        std::cout << "Templado" << std::endl;\n    } else if (temp >= 25) {\n        std::cout << "Calor" << std::endl;\n    } else {\n        std::cout << "Frío" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int temp = 28;\n    if (temp >= 25) {\n        std::cout << "Calor" << std::endl;\n    } else if (temp >= 15) {\n        std::cout << "Templado" << std::endl;\n    } else {\n        std::cout << "Frío" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `temp = 28\nif temp >= 15: # BUG\n    print("Templado")\nelif temp >= 25:\n    print("Calor")\nelse:\n    print("Frío")`,
        solutionCode: `temp = 28\nif temp >= 25:\n    print("Calor")\nelif temp >= 15:\n    print("Templado")\nelse:\n    print("Frío")`
      },
      javascript: {
        starterCode: `let temp = 28;\nif (temp >= 15) { // BUG\n    console.log("Templado");\n} else if (temp >= 25) {\n    console.log("Calor");\n} else {\n    console.log("Frío");\n}`,
        solutionCode: `let temp = 28;\nif (temp >= 25) {\n    console.log("Calor");\n} else if (temp >= 15) {\n    console.log("Templado");\n} else {\n    console.log("Frío");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int temp = 28;\n        if (temp >= 15) { // BUG\n            System.out.println("Templado");\n        } else if (temp >= 25) {\n            System.out.println("Calor");\n        } else {\n            System.out.println("Frío");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int temp = 28;\n        if (temp >= 25) {\n            System.out.println("Calor");\n        } else if (temp >= 15) {\n            System.out.println("Templado");\n        } else {\n            System.out.println("Frío");\n        }\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 221 al 230 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 221,
    title: 'Validación de Año Bisiesto',
    statement: 'Completa la regla de año bisiesto: divisible por 4 Y (no divisible por 100 O divisible por 400).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Completa anio % 400 == 0.',
    explanation: 'Un año es bisiesto si es múltiplo de 4, excepto los múltiplos de 100 salvo que también sean múltiplos de 400.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int anio = 2024;\n    if ((anio % 4 == 0 && anio % 100 != 0) || (anio % ___ == 0)) {\n        std::cout << "Bisiesto" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int anio = 2024;\n    if ((anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0)) {\n        std::cout << "Bisiesto" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['400']
      },
      python: {
        starterCode: `anio = 2024\nif (anio % 4 == 0 and anio % 100 != 0) or (anio % ___ == 0):\n    print("Bisiesto")`,
        solutionCode: `anio = 2024\nif (anio % 4 == 0 and anio % 100 != 0) or (anio % 400 == 0):\n    print("Bisiesto")`,
        acceptedKeywords: ['400']
      },
      javascript: {
        starterCode: `let anio = 2024;\nif ((anio % 4 === 0 && anio % 100 !== 0) || (anio % ___ === 0)) {\n    console.log("Bisiesto");\n}`,
        solutionCode: `let anio = 2024;\nif ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {\n    console.log("Bisiesto");\n}`,
        acceptedKeywords: ['400']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int anio = 2024;\n        if ((anio % 4 == 0 && anio % 100 != 0) || (anio % ___ == 0)) {\n            System.out.println("Bisiesto");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int anio = 2024;\n        if ((anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0)) {\n            System.out.println("Bisiesto");\n        }\n    }\n}`,
        acceptedKeywords: ['400']
      }
    }
  },
  {
    id: 222,
    title: 'Evaluación de Cortocircuito (Short-Circuit)',
    statement: 'Corrige la condición para comprobar ptr != nullptr antes de desreferenciar *ptr.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Coloca la verificación ptr != nullptr al principio de la condición AND.',
    explanation: 'El cortocircuito lógico garantiza que si la primera condición de un AND es falsa, la segunda no se evalúa evitando errores.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int *ptr = nullptr;\n    // BUG: *ptr produce segmentation fault al evaluarse antes de validar nullptr\n    if (*ptr > 0 && ptr != nullptr) {\n        std::cout << "Positivo" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int *ptr = nullptr;\n    if (ptr != nullptr && *ptr > 0) {\n        std::cout << "Positivo" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `lista = []\n# BUG: lista[0] falla con IndexError antes de len(lista)\nif lista[0] == 10 and len(lista) > 0:\n    print("Primer elemento es 10")`,
        solutionCode: `lista = []\nif len(lista) > 0 and lista[0] == 10:\n    print("Primer elemento es 10")`
      },
      javascript: {
        starterCode: `let obj = null;\n// BUG: obj.valor causa TypeError antes de verificar obj\nif (obj.valor > 0 && obj !== null) {\n    console.log("Tiene valor positivo");\n}`,
        solutionCode: `let obj = null;\nif (obj !== null && obj.valor > 0) {\n    console.log("Tiene valor positivo");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s = null;\n        // BUG: NullPointerException al llamar length antes de verificar null\n        if (s.length() > 0 && s != null) {\n            System.out.println("Texto presente");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String s = null;\n        if (s != null && s.length() > 0) {\n            System.out.println("Texto presente");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 223,
    title: 'Desigualdad Triangular (Triángulo Válido)',
    statement: 'Completa la tercera condición geométrica: la suma de cualesquiera dos lados debe ser mayor que el tercero (a+c > b).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Completa a + c > b.',
    explanation: 'Para que 3 longitudes formen un triángulo: a+b>c, b+c>a y a+c>b.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 3, b = 4, c = 5;\n    if (a + b > c && b + c > a && a + c > ___) {\n        std::cout << "Triángulo válido" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 3, b = 4, c = 5;\n    if (a + b > c && b + c > a && a + c > b) {\n        std::cout << "Triángulo válido" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['b']
      },
      python: {
        starterCode: `a, b, c = 3, 4, 5\nif a + b > c and b + c > a and a + c > ___:\n    print("Triángulo válido")`,
        solutionCode: `a, b, c = 3, 4, 5\nif a + b > c and b + c > a and a + c > b:\n    print("Triángulo válido")`,
        acceptedKeywords: ['b']
      },
      javascript: {
        starterCode: `let a = 3, b = 4, c = 5;\nif (a + b > c && b + c > a && a + c > ___) {\n    console.log("Triángulo válido");\n}`,
        solutionCode: `let a = 3, b = 4, c = 5;\nif (a + b > c && b + c > a && a + c > b) {\n    console.log("Triángulo válido");\n}`,
        acceptedKeywords: ['b']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 3, b = 4, c = 5;\n        if (a + b > c && b + c > a && a + c > ___) {\n            System.out.println("Triángulo válido");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 3, b = 4, c = 5;\n        if (a + b > c && b + c > a && a + c > b) {\n            System.out.println("Triángulo válido");\n        }\n    }\n}`,
        acceptedKeywords: ['b']
      }
    }
  },
  {
    id: 224,
    title: 'Leyes de De Morgan en Condiciones',
    statement: 'Corrige la negación compuesta aplicando De Morgan: !(A || B) es equivalente a (!A && !B).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: '!(llueve || truena) equivale a !llueve && !truena.',
    explanation: 'Por las leyes de De Morgan, negar una disyunción !(A || B) equivale a la conjunción de las negaciones !A && !B.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool llueve = false;\n    bool truena = false;\n    // BUG: !llueve || !truena es verdadero si solo una no ocurre\n    if (!llueve || !truena) {\n        std::cout << "Clima totalmente despejado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool llueve = false;\n    bool truena = false;\n    if (!llueve && !truena) {\n        std::cout << "Clima totalmente despejado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `llueve = False\ntruena = False\nif not llueve or not truena: # BUG\n    print("Clima totalmente despejado")`,
        solutionCode: `llueve = False\ntruena = False\nif not llueve and not truena:\n    print("Clima totalmente despejado")`
      },
      javascript: {
        starterCode: `let llueve = false;\nlet truena = false;\nif (!llueve || !truena) { // BUG\n    console.log("Clima totalmente despejado");\n}`,
        solutionCode: `let llueve = false;\nlet truena = false;\nif (!llueve && !truena) {\n    console.log("Clima totalmente despejado");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean llueve = false;\n        boolean truena = false;\n        if (!llueve || !truena) { // BUG\n            System.out.println("Clima totalmente despejado");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean llueve = false;\n        boolean truena = false;\n        if (!llueve && !truena) {\n            System.out.println("Clima totalmente despejado");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 225,
    title: 'Clasificación de Tipo de Triángulo (Equilátero)',
    statement: 'Completa la condición para clasificar un triángulo equilátero (todos sus 3 lados son iguales).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Comprueba a == b && b == c.',
    explanation: 'Un triángulo es equilátero si sus tres lados tienen idéntica longitud.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 5, b = 5, c = 5;\n    if (a == b && b == ___) {\n        std::cout << "Equilátero" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 5, b = 5, c = 5;\n    if (a == b && b == c) {\n        std::cout << "Equilátero" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['c']
      },
      python: {
        starterCode: `a, b, c = 5, 5, 5\nif a == b and b == ___:\n    print("Equilátero")`,
        solutionCode: `a, b, c = 5, 5, 5\nif a == b and b == c:\n    print("Equilátero")`,
        acceptedKeywords: ['c']
      },
      javascript: {
        starterCode: `let a = 5, b = 5, c = 5;\nif (a === b && b === ___) {\n    console.log("Equilátero");\n}`,
        solutionCode: `let a = 5, b = 5, c = 5;\nif (a === b && b === c) {\n    console.log("Equilátero");\n}`,
        acceptedKeywords: ['c']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 5, c = 5;\n        if (a == b && b == ___) {\n            System.out.println("Equilátero");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 5, c = 5;\n        if (a == b && b == c) {\n            System.out.println("Equilátero");\n        }\n    }\n}`,
        acceptedKeywords: ['c']
      }
    }
  },
  {
    id: 226,
    title: 'Comparación Segura de Strings (equals)',
    statement: 'Corrige la comparación de cadenas en Java para usar .equals() en lugar del operador de identidad ==.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'En Java los objetos String se comparan con s1.equals(s2).',
    explanation: 'En Java, == compara referencias de memoria, mientras que .equals() compara el contenido real del texto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s1 = "admin";\n    std::string s2 = "admin";\n    if (s1 == s2) {\n        std::cout << "Identidad confirmada" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s1 = "admin";\n    std::string s2 = "admin";\n    if (s1 == s2) {\n        std::cout << "Identidad confirmada" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `s1 = "admin"\ns2 = "admin"\nif s1 == s2:\n    print("Identidad confirmada")`,
        solutionCode: `s1 = "admin"\ns2 = "admin"\nif s1 == s2:\n    print("Identidad confirmada")`
      },
      javascript: {
        starterCode: `let s1 = "admin";\nlet s2 = "admin";\nif (s1 === s2) {\n    console.log("Identidad confirmada");\n}`,
        solutionCode: `let s1 = "admin";\nlet s2 = "admin";\nif (s1 === s2) {\n    console.log("Identidad confirmada");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s1 = new String("admin");\n        String s2 = new String("admin");\n        // BUG: == compara direcciones de memoria en heap\n        if (s1 == s2) {\n            System.out.println("Identidad confirmada");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String s1 = new String("admin");\n        String s2 = new String("admin");\n        if (s1.equals(s2)) {\n            System.out.println("Identidad confirmada");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 227,
    title: 'If con Inicialización Local (C++17)',
    statement: 'Completa la sintaxis de if con inicializador local: if (int val = obtener(); val > 0).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Separa la inicialización y la condición con un punto y coma (;).',
    explanation: 'El if con inicialización limita el ámbito (scope) de la variable exclusivamente al cuerpo del if-else.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint obtener() { return 10; }\n\nint main() {\n    if (int val = obtener() ___ val > 0) {\n        std::cout << "Valor positivo: " << val << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint obtener() { return 10; }\n\nint main() {\n    if (int val = obtener(); val > 0) {\n        std::cout << "Valor positivo: " << val << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: [';']
      },
      python: {
        starterCode: `# Operador morsa (walrus) := en Python\ndef obtener(): return 10\nif (val ___ obtener()) > 0:\n    print("Valor positivo:", val)`,
        solutionCode: `def obtener(): return 10\nif (val := obtener()) > 0:\n    print("Valor positivo:", val)`,
        acceptedKeywords: [':=']
      },
      javascript: {
        starterCode: `function obtener() { return 10; }\nlet val = obtener();\nif (val > 0) {\n    console.log("Valor positivo:", val);\n}`,
        solutionCode: `function obtener() { return 10; }\nlet val = obtener();\nif (val > 0) {\n    console.log("Valor positivo:", val);\n}`,
        acceptedKeywords: ['val > 0']
      },
      java: {
        starterCode: `public class Main {\n    static int obtener() { return 10; }\n    public static void main(String[] args) {\n        int val = obtener();\n        if (val > 0) {\n            System.out.println("Valor positivo: " + val);\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    static int obtener() { return 10; }\n    public static void main(String[] args) {\n        int val = obtener();\n        if (val > 0) {\n            System.out.println("Valor positivo: " + val);\n        }\n    }\n}`,
        acceptedKeywords: ['val > 0']
      }
    }
  },
  {
    id: 228,
    title: 'Condición con Operador Nullish Coalescing / Optional',
    statement: 'Corrige la condición para usar el valor por defecto solo cuando la variable sea null o undefined.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'En JS usa el operador ?? o en C++ comprueba has_value().',
    explanation: 'El operador ?? permite distinguir entre valores falsy válidos (como 0 o false) y valores estrictamente nulos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <optional>\n\nint main() {\n    std::optional<int> puntaje = 0;\n    // BUG: El puntaje 0 es válido y no debe considerarse ausente\n    if (puntaje.value_or(100) == 0) {\n        std::cout << "Puntuación inicial cero registrada" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <optional>\n\nint main() {\n    std::optional<int> puntaje = 0;\n    if (puntaje.value_or(100) == 0) {\n        std::cout << "Puntuación inicial cero registrada" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `puntaje = 0\n# 0 es válido, no None\nif puntaje is not None:\n    print("Puntuación inicial cero registrada")`,
        solutionCode: `puntaje = 0\nif puntaje is not None:\n    print("Puntuación inicial cero registrada")`
      },
      javascript: {
        starterCode: `let puntaje = 0;\nlet finalVal = puntaje ?? 100;\nif (finalVal === 0) {\n    console.log("Puntuación inicial cero registrada");\n}`,
        solutionCode: `let puntaje = 0;\nlet finalVal = puntaje ?? 100;\nif (finalVal === 0) {\n    console.log("Puntuación inicial cero registrada");\n}`
      },
      java: {
        starterCode: `import java.util.Optional;\npublic class Main {\n    public static void main(String[] args) {\n        Optional<Integer> puntaje = Optional.of(0);\n        if (puntaje.orElse(100) == 0) {\n            System.out.println("Puntuación inicial cero registrada");\n        }\n    }\n}`,
        solutionCode: `import java.util.Optional;\npublic class Main {\n    public static void main(String[] args) {\n        Optional<Integer> puntaje = Optional.of(0);\n        if (puntaje.orElse(100) == 0) {\n            System.out.println("Puntuación inicial cero registrada");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 229,
    title: 'Condición de Cuadrante Cartesiano',
    statement: 'Completa la condición para verificar que un punto (x, y) pertenezca al Cuadrante II (x < 0 e y > 0).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'En el Cuadrante II: x < 0 && y > 0.',
    explanation: 'El plano cartesiano divide sus cuadrantes según los signos algebraicos de las coordenadas X e Y.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int x = -5, y = 8;\n    if (x < 0 && y ___ 0) {\n        std::cout << "Cuadrante II" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int x = -5, y = 8;\n    if (x < 0 && y > 0) {\n        std::cout << "Cuadrante II" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['>']
      },
      python: {
        starterCode: `x, y = -5, 8\nif x < 0 and y ___ 0:\n    print("Cuadrante II")`,
        solutionCode: `x, y = -5, 8\nif x < 0 and y > 0:\n    print("Cuadrante II")`,
        acceptedKeywords: ['>']
      },
      javascript: {
        starterCode: `let x = -5, y = 8;\nif (x < 0 && y ___ 0) {\n    console.log("Cuadrante II");\n}`,
        solutionCode: `let x = -5, y = 8;\nif (x < 0 && y > 0) {\n    console.log("Cuadrante II");\n}`,
        acceptedKeywords: ['>']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int x = -5, y = 8;\n        if (x < 0 && y ___ 0) {\n            System.out.println("Cuadrante II");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int x = -5, y = 8;\n        if (x < 0 && y > 0) {\n            System.out.println("Cuadrante II");\n        }\n    }\n}`,
        acceptedKeywords: ['>']
      }
    }
  },
  {
    id: 230,
    title: 'Comprobación de Máscara de Permisos (Bitwise Flags)',
    statement: 'Corrige la comprobación para verificar si la variable permisos contiene el bit de permiso de lectura (READ = 4) usando el operador AND a nivel de bits &.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Comprueba (permisos & READ) != 0 o (permisos & READ) == READ.',
    explanation: 'El operador & evalúa máscaras de bits para consultar flags individuales de permisos en sistemas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    const int READ = 4;\n    int permisos = 6; // 6 = READ (4) | WRITE (2)\n    // BUG: El operador || lógico no consulta máscaras de bits\n    if (permisos || READ) {\n        std::cout << "Permiso de lectura concedido" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    const int READ = 4;\n    int permisos = 6;\n    if ((permisos & READ) != 0) {\n        std::cout << "Permiso de lectura concedido" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `READ = 4\npermisos = 6\nif (permisos & READ) != 0:\n    print("Permiso de lectura concedido")`,
        solutionCode: `READ = 4\npermisos = 6\nif (permisos & READ) != 0:\n    print("Permiso de lectura concedido")`
      },
      javascript: {
        starterCode: `const READ = 4;\nlet permisos = 6;\nif ((permisos & READ) !== 0) {\n    console.log("Permiso de lectura concedido");\n}`,
        solutionCode: `const READ = 4;\nlet permisos = 6;\nif ((permisos & READ) !== 0) {\n    console.log("Permiso de lectura concedido");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        final int READ = 4;\n        int permisos = 6;\n        if ((permisos & READ) != 0) {\n            System.out.println("Permiso de lectura concedido");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        final int READ = 4;\n        int permisos = 6;\n        if ((permisos & READ) != 0) {\n            System.out.println("Permiso de lectura concedido");\n        }\n    }\n}`
      }
    }
  }
];
