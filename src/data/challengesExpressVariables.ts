import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressVariablesExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 101 al 110 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 101,
    title: 'Declaración de Entero',
    statement: 'Completa la declaración de la variable edad asignándole el valor 25.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Asigna el valor numérico 25.',
    explanation: 'Un tipo de dato entero representa números sin parte decimal.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int edad = ___;\n    std::cout << edad << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int edad = 25;\n    std::cout << edad << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['25']
      },
      python: {
        starterCode: `edad = ___\nprint(edad)`,
        solutionCode: `edad = 25\nprint(edad)`,
        acceptedKeywords: ['25']
      },
      javascript: {
        starterCode: `let edad = ___;\nconsole.log(edad);`,
        solutionCode: `let edad = 25;\nconsole.log(edad);`,
        acceptedKeywords: ['25']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = ___;\n        System.out.println(edad);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int edad = 25;\n        System.out.println(edad);\n    }\n}`,
        acceptedKeywords: ['25']
      }
    }
  },
  {
    id: 102,
    title: 'Variable Decimal (Punto Flotante)',
    statement: 'Corrige el tipo de dato o la asignación para almacenar el precio 19.99 con precisión decimal.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa float o double (o número decimal directo) para guardar 19.99.',
    explanation: 'Para almacenar números fraccionarios o decimales se emplean tipos de coma flotante (float / double).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: int trunca los decimales\n    int precio = 19.99;\n    std::cout << precio << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    double precio = 19.99;\n    std::cout << precio << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `# BUG: convierte a entero perdiendo decimales\nprecio = int(19.99)\nprint(precio)`,
        solutionCode: `precio = float(19.99)\nprint(precio)`
      },
      javascript: {
        starterCode: `// BUG: Math.floor trunca los decimales\nlet precio = Math.floor(19.99);\nconsole.log(precio);`,
        solutionCode: `let precio = 19.99;\nconsole.log(precio);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        // BUG: int trunca decimales\n        int precio = (int) 19.99;\n        System.out.println(precio);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double precio = 19.99;\n        System.out.println(precio);\n    }\n}`
      }
    }
  },
  {
    id: 103,
    title: 'Cadena de Texto (String)',
    statement: 'Completa la asignación de la variable texto con el valor "Hola Mundo".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Escribe el texto entre comillas dobles "Hola Mundo".',
    explanation: 'Las cadenas de caracteres representan texto alfanumérico encerrado entre comillas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string saludo = ___;\n    std::cout << saludo << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string saludo = "Hola Mundo";\n    std::cout << saludo << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['"Hola Mundo"']
      },
      python: {
        starterCode: `saludo = ___\nprint(saludo)`,
        solutionCode: `saludo = "Hola Mundo"\nprint(saludo)`,
        acceptedKeywords: ['"Hola Mundo"', "'Hola Mundo'"]
      },
      javascript: {
        starterCode: `let saludo = ___;\nconsole.log(saludo);`,
        solutionCode: `let saludo = "Hola Mundo";\nconsole.log(saludo);`,
        acceptedKeywords: ['"Hola Mundo"', "'Hola Mundo'"]
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String saludo = ___;\n        System.out.println(saludo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String saludo = "Hola Mundo";\n        System.out.println(saludo);\n    }\n}`,
        acceptedKeywords: ['"Hola Mundo"']
      }
    }
  },
  {
    id: 104,
    title: 'Variable Booleana',
    statement: 'Corrige el valor de la variable booleana para indicar verdadero (true).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El valor booleano afirmativo es true (o True en Python).',
    explanation: 'El tipo booleano solo puede contener dos estados lógicos: true o false.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: "true" entre comillas es un string, no un bool\n    bool activo = false;\n    activo = false; // Debe ser true\n    std::cout << std::boolalpha << activo << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool activo = true;\n    std::cout << std::boolalpha << activo << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `# BUG: debe ser True con mayúscula\nactivo = False\nprint(activo)`,
        solutionCode: `activo = True\nprint(activo)`
      },
      javascript: {
        starterCode: `// BUG: debe ser true\nlet activo = false;\nconsole.log(activo);`,
        solutionCode: `let activo = true;\nconsole.log(activo);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        // BUG: debe ser true\n        boolean activo = false;\n        System.out.println(activo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean activo = true;\n        System.out.println(activo);\n    }\n}`
      }
    }
  },
  {
    id: 105,
    title: 'Carácter Individual (Char)',
    statement: 'Completa la asignación del carácter de calificación con la letra \'A\'.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'En C++, Java y JS usa comillas simples \'A\'.',
    explanation: 'El tipo char almacena un único símbolo o código ASCII de la tabla de caracteres.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    char seccion = ___;\n    std::cout << seccion << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    char seccion = 'A';\n    std::cout << seccion << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ["'A'"]
      },
      python: {
        starterCode: `seccion = ___\nprint(seccion)`,
        solutionCode: `seccion = 'A'\nprint(seccion)`,
        acceptedKeywords: ["'A'", '"A"']
      },
      javascript: {
        starterCode: `let seccion = ___;\nconsole.log(seccion);`,
        solutionCode: `let seccion = 'A';\nconsole.log(seccion);`,
        acceptedKeywords: ["'A'", '"A"']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        char seccion = ___;\n        System.out.println(seccion);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        char seccion = 'A';\n        System.out.println(seccion);\n    }\n}`,
        acceptedKeywords: ["'A'"]
      }
    }
  },
  {
    id: 106,
    title: 'Reasignación de Variables',
    statement: 'Corrige la actualización para que el contador pase de 5 a 10 sumando 5.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Suma 5 a contador usando contador += 5 o contador = contador + 5.',
    explanation: 'Las variables mutables pueden cambiar su valor almacenado a lo largo del programa.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int contador = 5;\n    // BUG: Resta en vez de sumar\n    contador = contador - 5;\n    std::cout << contador << std::endl; // Debe ser 10\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int contador = 5;\n    contador = contador + 5;\n    std::cout << contador << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `contador = 5\ncontador -= 5 # BUG\nprint(contador)`,
        solutionCode: `contador = 5\ncontador += 5\nprint(contador)`
      },
      javascript: {
        starterCode: `let contador = 5;\ncontador -= 5; // BUG\nconsole.log(contador);`,
        solutionCode: `let contador = 5;\ncontador += 5;\nconsole.log(contador);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int contador = 5;\n        contador -= 5; // BUG\n        System.out.println(contador);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int contador = 5;\n        contador += 5;\n        System.out.println(contador);\n    }\n}`
      }
    }
  },
  {
    id: 107,
    title: 'Constante Inmutable',
    statement: 'Completa el modificador de constante para proteger el valor de PI.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa const en C++/JS o final en Java.',
    explanation: 'Una constante garantiza que el valor asignado no pueda ser alterado durante la ejecución.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    ___ double PI = 3.14159;\n    std::cout << PI << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    const double PI = 3.14159;\n    std::cout << PI << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['const']
      },
      python: {
        starterCode: `# En Python por convención se usa mayúsculas para constantes\nPI = ___\nprint(PI)`,
        solutionCode: `PI = 3.14159\nprint(PI)`,
        acceptedKeywords: ['3.14159']
      },
      javascript: {
        starterCode: `___ PI = 3.14159;\nconsole.log(PI);`,
        solutionCode: `const PI = 3.14159;\nconsole.log(PI);`,
        acceptedKeywords: ['const']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        ___ double PI = 3.14159;\n        System.out.println(PI);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        final double PI = 3.14159;\n        System.out.println(PI);\n    }\n}`,
        acceptedKeywords: ['final']
      }
    }
  },
  {
    id: 108,
    title: 'Intercambio de Variables Básico',
    statement: 'Corrige el intercambio de dos variables usando la variable auxiliar temp.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Guarda a en temp, luego a = b, y b = temp.',
    explanation: 'Para intercambiar valores sin perder el dato original, guardamos temporalmente el primer valor.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 1, b = 2;\n    int temp = a;\n    a = b;\n    b = a; // BUG: a ya fue sobreescrito con b\n    std::cout << a << " " << b << std::endl; // Debe dar 2 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 1, b = 2;\n    int temp = a;\n    a = b;\n    b = temp;\n    std::cout << a << " " << b << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `a = 1\nb = 2\ntemp = a\na = b\nb = a # BUG\nprint(a, b)`,
        solutionCode: `a = 1\nb = 2\ntemp = a\na = b\nb = temp\nprint(a, b)`
      },
      javascript: {
        starterCode: `let a = 1, b = 2;\nlet temp = a;\na = b;\nb = a; // BUG\nconsole.log(a, b);`,
        solutionCode: `let a = 1, b = 2;\nlet temp = a;\na = b;\nb = temp;\nconsole.log(a, b);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 1, b = 2;\n        int temp = a;\n        a = b;\n        b = a; // BUG\n        System.out.println(a + " " + b);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 1, b = 2;\n        int temp = a;\n        a = b;\n        b = temp;\n        System.out.println(a + " " + b);\n    }\n}`
      }
    }
  },
  {
    id: 109,
    title: 'Suma de Variables Numéricas',
    statement: 'Completa la expresión para sumar las variables x e y.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Suma x + y.',
    explanation: 'El operador + suma algebraicamente el contenido numérico de ambas variables.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int x = 15, y = 25;\n    int total = x + ___;\n    std::cout << total << std::endl; // 40\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int x = 15, y = 25;\n    int total = x + y;\n    std::cout << total << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['y']
      },
      python: {
        starterCode: `x = 15\ny = 25\ntotal = x + ___\nprint(total)`,
        solutionCode: `x = 15\ny = 25\ntotal = x + y\nprint(total)`,
        acceptedKeywords: ['y']
      },
      javascript: {
        starterCode: `let x = 15, y = 25;\nlet total = x + ___;\nconsole.log(total);`,
        solutionCode: `let x = 15, y = 25;\nlet total = x + y;\nconsole.log(total);`,
        acceptedKeywords: ['y']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int x = 15, y = 25;\n        int total = x + ___;\n        System.out.println(total);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int x = 15, y = 25;\n        int total = x + y;\n        System.out.println(total);\n    }\n}`,
        acceptedKeywords: ['y']
      }
    }
  },
  {
    id: 110,
    title: 'Concatenación Básica de Strings',
    statement: 'Corrige la unión de nombre y apellido para incluir un espacio intermedio.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Une nombre + " " + apellido.',
    explanation: 'Para que los textos no se peguen juntos, se debe intercalar una cadena con un espacio en blanco.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string nombre = "Ada";\n    std::string apellido = "Lovelace";\n    // BUG: Queda "AdaLovelace" sin espacio\n    std::string completo = nombre + apellido;\n    std::cout << completo << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string nombre = "Ada";\n    std::string apellido = "Lovelace";\n    std::string completo = nombre + " " + apellido;\n    std::cout << completo << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nombre = "Ada"\napellido = "Lovelace"\ncompleto = nombre + apellido # BUG\nprint(completo)`,
        solutionCode: `nombre = "Ada"\napellido = "Lovelace"\ncompleto = nombre + " " + apellido\nprint(completo)`
      },
      javascript: {
        starterCode: `let nombre = "Ada";\nlet apellido = "Lovelace";\nlet completo = nombre + apellido; // BUG\nconsole.log(completo);`,
        solutionCode: `let nombre = "Ada";\nlet apellido = "Lovelace";\nlet completo = nombre + " " + apellido;\nconsole.log(completo);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String nombre = "Ada";\n        String apellido = "Lovelace";\n        String completo = nombre + apellido; // BUG\n        System.out.println(completo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String nombre = "Ada";\n        String apellido = "Lovelace";\n        String completo = nombre + " " + apellido;\n        System.out.println(completo);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 111 al 120 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 111,
    title: 'Casteo de String a Entero',
    statement: 'Completa la conversión de la cadena "100" a número entero para poder sumarle 50.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa std::stoi en C++, int() en Python, parseInt() en JS, o Integer.parseInt() en Java.',
    explanation: 'Para operar matemáticamente con datos recibidos como texto, debemos convertirlos a un tipo numérico.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string strNum = "100";\n    int num = std::___(strNum);\n    std::cout << num + 50 << std::endl; // 150\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string strNum = "100";\n    int num = std::stoi(strNum);\n    std::cout << num + 50 << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['stoi']
      },
      python: {
        starterCode: `str_num = "100"\nnum = ___(str_num)\nprint(num + 50)`,
        solutionCode: `str_num = "100"\nnum = int(str_num)\nprint(num + 50)`,
        acceptedKeywords: ['int']
      },
      javascript: {
        starterCode: `let strNum = "100";\nlet num = ___(strNum);\nconsole.log(num + 50);`,
        solutionCode: `let strNum = "100";\nlet num = parseInt(strNum);\nconsole.log(num + 50);`,
        acceptedKeywords: ['parseInt', 'Number']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String strNum = "100";\n        int num = Integer.___(strNum);\n        System.out.println(num + 50);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String strNum = "100";\n        int num = Integer.parseInt(strNum);\n        System.out.println(num + 50);\n    }\n}`,
        acceptedKeywords: ['parseInt']
      }
    }
  },
  {
    id: 112,
    title: 'División Entera vs Decimal',
    statement: 'Corrige la división para obtener 2.5 y no truncar a 2.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Divide usando al menos un operando decimal (ej. 5.0 / 2 o casteo a float/double).',
    explanation: 'En muchos lenguajes, dividir dos enteros produce otro entero, perdiendo la fracción decimal.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 5, b = 2;\n    // BUG: División entera trunca a 2\n    double res = a / b;\n    std::cout << res << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 5, b = 2;\n    double res = (double)a / b;\n    std::cout << res << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `a = 5\nb = 2\nres = a // b # BUG: división entera //\nprint(res)`,
        solutionCode: `a = 5\nb = 2\nres = a / b\nprint(res)`
      },
      javascript: {
        starterCode: `let a = 5, b = 2;\nlet res = Math.floor(a / b); // BUG\nconsole.log(res);`,
        solutionCode: `let a = 5, b = 2;\nlet res = a / b;\nconsole.log(res);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 2;\n        // BUG: a/b es entero\n        double res = a / b;\n        System.out.println(res);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 2;\n        double res = (double) a / b;\n        System.out.println(res);\n    }\n}`
      }
    }
  },
  {
    id: 113,
    title: 'Cálculo de Promedio con Decimales',
    statement: 'Completa la fórmula del promedio dividiendo la suma entre la cantidad de notas (3.0).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Divide la suma (n1 + n2 + n3) entre 3.0.',
    explanation: 'El promedio es la suma de los valores dividida entre la cantidad total de elementos evaluados.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    double n1 = 4.5, n2 = 3.8, n3 = 5.0;\n    double prom = (n1 + n2 + n3) / ___;\n    std::cout << prom << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    double n1 = 4.5, n2 = 3.8, n3 = 5.0;\n    double prom = (n1 + n2 + n3) / 3.0;\n    std::cout << prom << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['3.0', '3']
      },
      python: {
        starterCode: `n1, n2, n3 = 4.5, 3.8, 5.0\nprom = (n1 + n2 + n3) / ___\nprint(prom)`,
        solutionCode: `n1, n2, n3 = 4.5, 3.8, 5.0\nprom = (n1 + n2 + n3) / 3\nprint(prom)`,
        acceptedKeywords: ['3', '3.0']
      },
      javascript: {
        starterCode: `let n1 = 4.5, n2 = 3.8, n3 = 5.0;\nlet prom = (n1 + n2 + n3) / ___;\nconsole.log(prom);`,
        solutionCode: `let n1 = 4.5, n2 = 3.8, n3 = 5.0;\nlet prom = (n1 + n2 + n3) / 3;\nconsole.log(prom);`,
        acceptedKeywords: ['3', '3.0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        double n1 = 4.5, n2 = 3.8, n3 = 5.0;\n        double prom = (n1 + n2 + n3) / ___;\n        System.out.println(prom);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double n1 = 4.5, n2 = 3.8, n3 = 5.0;\n        double prom = (n1 + n2 + n3) / 3.0;\n        System.out.println(prom);\n    }\n}`,
        acceptedKeywords: ['3.0', '3']
      }
    }
  },
  {
    id: 114,
    title: 'Operador Módulo (Residuo de División)',
    statement: 'Corrige la operación para obtener el residuo de 17 dividido por 5 (debe ser 2).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'El operador módulo es %.',
    explanation: 'El operador % calcula el resto o residuo resultante de una división entera.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: divide en vez de calcular residuo\n    int resto = 17 / 5;\n    std::cout << resto << std::endl; // Debe dar 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int resto = 17 % 5;\n    std::cout << resto << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `resto = 17 // 5 # BUG\nprint(resto)`,
        solutionCode: `resto = 17 % 5\nprint(resto)`
      },
      javascript: {
        starterCode: `let resto = Math.floor(17 / 5); // BUG\nconsole.log(resto);`,
        solutionCode: `let resto = 17 % 5;\nconsole.log(resto);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int resto = 17 / 5; // BUG\n        System.out.println(resto);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int resto = 17 % 5;\n        System.out.println(resto);\n    }\n}`
      }
    }
  },
  {
    id: 115,
    title: 'Longitud de una Cadena de Texto',
    statement: 'Completa la llamada para obtener el número de caracteres del texto.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa .length() en C++/Java, len() en Python, o .length en JS.',
    explanation: 'La propiedad o método de longitud permite conocer la cantidad de caracteres de un string.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string palabra = "Programacion";\n    int len = palabra.___();\n    std::cout << len << std::endl; // 12\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string palabra = "Programacion";\n    int len = palabra.length();\n    std::cout << len << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['length', 'size']
      },
      python: {
        starterCode: `palabra = "Programacion"\nlongitud = ___(palabra)\nprint(longitud)`,
        solutionCode: `palabra = "Programacion"\nlongitud = len(palabra)\nprint(longitud)`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let palabra = "Programacion";\nlet longitud = palabra.___\nconsole.log(longitud);`,
        solutionCode: `let palabra = "Programacion";\nlet longitud = palabra.length;\nconsole.log(longitud);`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String palabra = "Programacion";\n        int len = palabra.___();\n        System.out.println(len);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String palabra = "Programacion";\n        int len = palabra.length();\n        System.out.println(len);\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 116,
    title: 'Inversión de Booleano (NOT)',
    statement: 'Corrige la negación del valor booleano usando el operador NOT (! o not).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Aplica el operador ! antes de la variable booleana.',
    explanation: 'El operador de negación lógica invierte el valor de verdadero a falso y viceversa.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool bloqueado = false;\n    // BUG: Asigna true directamente sin negar la variable\n    bool permitido = bloqueado;\n    std::cout << std::boolalpha << permitido << std::endl; // Debe ser true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool bloqueado = false;\n    bool permitido = !bloqueado;\n    std::cout << std::boolalpha << permitido << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `bloqueado = False\npermitido = bloqueado # BUG\nprint(permitido)`,
        solutionCode: `bloqueado = False\npermitido = not bloqueado\nprint(permitido)`
      },
      javascript: {
        starterCode: `let bloqueado = false;\nlet permitido = bloqueado; // BUG\nconsole.log(permitido);`,
        solutionCode: `let bloqueado = false;\nlet permitido = !bloqueado;\nconsole.log(permitido);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean bloqueado = false;\n        boolean permitido = bloqueado; // BUG\n        System.out.println(permitido);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean bloqueado = false;\n        boolean permitido = !bloqueado;\n        System.out.println(permitido);\n    }\n}`
      }
    }
  },
  {
    id: 117,
    title: 'Conversión de Número a String',
    statement: 'Completa la conversión del entero 42 a texto.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa std::to_string() en C++, str() en Python, .toString() en JS, o String.valueOf() en Java.',
    explanation: 'Para imprimir o concatenar números junto a textos de forma segura se convierten a string.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    int num = 42;\n    std::string s = std::___(num);\n    std::cout << "El valor es: " + s << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    int num = 42;\n    std::string s = std::to_string(num);\n    std::cout << "El valor es: " + s << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['to_string']
      },
      python: {
        starterCode: `num = 42\ns = ___(num)\nprint("El valor es: " + s)`,
        solutionCode: `num = 42\ns = str(num)\nprint("El valor es: " + s)`,
        acceptedKeywords: ['str']
      },
      javascript: {
        starterCode: `let num = 42;\nlet s = num.___();\nconsole.log("El valor es: " + s);`,
        solutionCode: `let num = 42;\nlet s = num.toString();\nconsole.log("El valor es: " + s);`,
        acceptedKeywords: ['toString']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int num = 42;\n        String s = String.___(num);\n        System.out.println("El valor es: " + s);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int num = 42;\n        String s = String.valueOf(num);\n        System.out.println("El valor es: " + s);\n    }\n}`,
        acceptedKeywords: ['valueOf']
      }
    }
  },
  {
    id: 118,
    title: 'Operador de Incremento',
    statement: 'Corrige el incremento de la variable vidas para sumar 1 tras recoger un ítem.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa vidas++ o vidas += 1.',
    explanation: 'El operador ++ incrementa el valor de la variable entera en exactamente 1 unidad.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int vidas = 3;\n    // BUG: Decrementa en vez de sumar\n    vidas--;\n    std::cout << vidas << std::endl; // Debe ser 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int vidas = 3;\n    vidas++;\n    std::cout << vidas << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `vidas = 3\nvidas -= 1 # BUG\nprint(vidas)`,
        solutionCode: `vidas = 3\nvidas += 1\nprint(vidas)`
      },
      javascript: {
        starterCode: `let vidas = 3;\nvidas--; // BUG\nconsole.log(vidas);`,
        solutionCode: `let vidas = 3;\nvidas++;\nconsole.log(vidas);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int vidas = 3;\n        vidas--; // BUG\n        System.out.println(vidas);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int vidas = 3;\n        vidas++;\n        System.out.println(vidas);\n    }\n}`
      }
    }
  },
  {
    id: 119,
    title: 'Acceso a un Carácter por Índice',
    statement: 'Completa la expresión para acceder al primer carácter (índice 0) de la cadena.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'El primer carácter se encuentra en la posición [0] o .charAt(0).',
    explanation: 'Las cadenas son secuencias indexadas donde el primer carácter ocupa el índice 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string pais = "Chile";\n    char inicial = pais[___];\n    std::cout << inicial << std::endl; // 'C'\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string pais = "Chile";\n    char inicial = pais[0];\n    std::cout << inicial << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `pais = "Chile"\ninicial = pais[___]\nprint(inicial)`,
        solutionCode: `pais = "Chile"\ninicial = pais[0]\nprint(inicial)`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let pais = "Chile";\nlet inicial = pais[___];\nconsole.log(inicial);`,
        solutionCode: `let pais = "Chile";\nlet inicial = pais[0];\nconsole.log(inicial);`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String pais = "Chile";\n        char inicial = pais.charAt(___);\n        System.out.println(inicial);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String pais = "Chile";\n        char inicial = pais.charAt(0);\n        System.out.println(inicial);\n    }\n}`,
        acceptedKeywords: ['0']
      }
    }
  },
  {
    id: 120,
    title: 'Desbordamiento de Tipos (Overflow Básico)',
    statement: 'Corrige el tipo de dato a un entero de mayor tamaño (long long / long) para guardar un número grande.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa long long en C++, o long en Java para evitar desbordamiento de 32 bits.',
    explanation: 'Un entero de 32 bits desborda por encima de 2.147.483.647, requiriendo enteros de 64 bits.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: int desborda con valores mayores a 2 billones\n    int poblacionMundial = 8000000000LL;\n    std::cout << poblacionMundial << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    long long poblacionMundial = 8000000000LL;\n    std::cout << poblacionMundial << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `# Python maneja enteros arbitrariamente grandes de forma nativa\npoblacion = 8000000000\nprint(poblacion)`,
        solutionCode: `poblacion = 8000000000\nprint(poblacion)`
      },
      javascript: {
        starterCode: `// En JS los enteros seguros mayores a 2^53 usan BigInt\nlet poblacion = 8000000000n;\nconsole.log(poblacion.toString());`,
        solutionCode: `let poblacion = 8000000000n;\nconsole.log(poblacion.toString());`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        // BUG: int desborda\n        int poblacion = (int) 8000000000L;\n        System.out.println(poblacion);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        long poblacion = 8000000000L;\n        System.out.println(poblacion);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 121 al 130 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 121,
    title: 'Inferencia de Tipos Automática',
    statement: 'Completa la palabra clave de deducción automática de tipo (auto en C++, var en Java, let/const en JS).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa auto en C++, var en Java, const/let en JS.',
    explanation: 'La inferencia de tipos deduce el tipo de la variable en tiempo de compilación a partir de su expresión inicial.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    ___ valor = 42.5;\n    std::cout << valor << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    auto valor = 42.5;\n    std::cout << valor << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['auto']
      },
      python: {
        starterCode: `# Python tiene tipado dinámico implícito\nvalor = ___\nprint(valor)`,
        solutionCode: `valor = 42.5\nprint(valor)`,
        acceptedKeywords: ['42.5']
      },
      javascript: {
        starterCode: `___ valor = 42.5;\nconsole.log(valor);`,
        solutionCode: `const valor = 42.5;\nconsole.log(valor);`,
        acceptedKeywords: ['const', 'let', 'var']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        ___ valor = 42.5;\n        System.out.println(valor);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        var valor = 42.5;\n        System.out.println(valor);\n    }\n}`,
        acceptedKeywords: ['var', 'double']
      }
    }
  },
  {
    id: 122,
    title: 'Operadores a Nivel de Bits (XOR Swap)',
    statement: 'Corrige el intercambio de dos números enteros sin variable auxiliar usando el operador XOR (^).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'El algoritmo XOR swap es: x ^= y; y ^= x; x ^= y;',
    explanation: 'El operador XOR permite intercambiar dos variables sin utilizar memoria adicional.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int a = 12, b = 25;\n    a ^= b;\n    // BUG: asignación incorrecta\n    b ^= b;\n    a ^= b;\n    std::cout << a << " " << b << std::endl; // 25 12\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int a = 12, b = 25;\n    a ^= b;\n    b ^= a;\n    a ^= b;\n    std::cout << a << " " << b << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `a, b = 12, 25\na ^= b\nb ^= b # BUG\na ^= b\nprint(a, b)`,
        solutionCode: `a, b = 12, 25\na ^= b\nb ^= a\na ^= b\nprint(a, b)`
      },
      javascript: {
        starterCode: `let a = 12, b = 25;\na ^= b;\nb ^= b; // BUG\na ^= b;\nconsole.log(a, b);`,
        solutionCode: `let a = 12, b = 25;\na ^= b;\nb ^= a;\na ^= b;\nconsole.log(a, b);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 12, b = 25;\n        a ^= b;\n        b ^= b; // BUG\n        a ^= b;\n        System.out.println(a + " " + b);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int a = 12, b = 25;\n        a ^= b;\n        b ^= a;\n        a ^= b;\n        System.out.println(a + " " + b);\n    }\n}`
      }
    }
  },
  {
    id: 123,
    title: 'Interpolación de Variables (Template Strings / F-Strings)',
    statement: 'Completa la inserción de la variable usuario en la cadena formateada.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'En Python usa {usuario}, en JS usa ${usuario}.',
    explanation: 'La interpolación de cadenas permite incrustar expresiones de variables directamente dentro del texto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string usuario = "Tomas";\n    std::string msg = "Bienvenido, " + ___ + "!";\n    std::cout << msg << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string usuario = "Tomas";\n    std::string msg = "Bienvenido, " + usuario + "!";\n    std::cout << msg << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['usuario']
      },
      python: {
        starterCode: `usuario = "Tomas"\nmsg = f"Bienvenido, {___}!"\nprint(msg)`,
        solutionCode: `usuario = "Tomas"\nmsg = f"Bienvenido, {usuario}!"\nprint(msg)`,
        acceptedKeywords: ['usuario']
      },
      javascript: {
        starterCode: `let usuario = "Tomas";\nlet msg = \`Bienvenido, \${___}!\`;\nconsole.log(msg);`,
        solutionCode: `let usuario = "Tomas";\nlet msg = \`Bienvenido, \${usuario}!\`;\nconsole.log(msg);`,
        acceptedKeywords: ['usuario']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String usuario = "Tomas";\n        String msg = String.format("Bienvenido, %s!", ___);\n        System.out.println(msg);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String usuario = "Tomas";\n        String msg = String.format("Bienvenido, %s!", usuario);\n        System.out.println(msg);\n    }\n}`,
        acceptedKeywords: ['usuario']
      }
    }
  },
  {
    id: 124,
    title: 'Referencia vs Copia de Variables',
    statement: 'Corrige la declaración de referencia para que modificar ref modifique también la variable original x.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'En C++ usa int &ref = x.',
    explanation: 'Una referencia actúa como un alias en memoria de la variable original, compartiendo la misma dirección.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int x = 10;\n    // BUG: Copia por valor en vez de referencia por &\n    int ref = x;\n    ref = 99;\n    std::cout << x << std::endl; // Debe imprimir 99\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int x = 10;\n    int &ref = x;\n    ref = 99;\n    std::cout << x << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `# En Python los objetos mutables (listas/dicts) se pasan por referencia\ndata = [10]\nref = data # Referencia compartida\nref[0] = 99\nprint(data[0])`,
        solutionCode: `data = [10]\nref = data\nref[0] = 99\nprint(data[0])`
      },
      javascript: {
        starterCode: `let obj = { x: 10 };\nlet ref = obj; // Referencia al objeto\nref.x = 99;\nconsole.log(obj.x);`,
        solutionCode: `let obj = { x: 10 };\nlet ref = obj;\nref.x = 99;\nconsole.log(obj.x);`
      },
      java: {
        starterCode: `class Contenedor { int x = 10; }\npublic class Main {\n    public static void main(String[] args) {\n        Contenedor c = new Contenedor();\n        Contenedor ref = c;\n        ref.x = 99;\n        System.out.println(c.x);\n    }\n}`,
        solutionCode: `class Contenedor { int x = 10; }\npublic class Main {\n    public static void main(String[] args) {\n        Contenedor c = new Contenedor();\n        Contenedor ref = c;\n        ref.x = 99;\n        System.out.println(c.x);\n    }\n}`
      }
    }
  },
  {
    id: 125,
    title: 'Desestructuración de Variables / Tuplas',
    statement: 'Completa la asignación múltiple para desempaquetar las coordenadas x e y.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Completa la variable y en el desempaquetado.',
    explanation: 'La desestructuración permite extraer múltiples valores en variables independientes en una sola instrucción.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <tuple>\n\nint main() {\n    auto [x, ___] = std::make_pair(10, 20);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <tuple>\n\nint main() {\n    auto [x, y] = std::make_pair(10, 20);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['y']
      },
      python: {
        starterCode: `punto = (10, 20)\nx, ___ = punto\nprint(x, y)`,
        solutionCode: `punto = (10, 20)\nx, y = punto\nprint(x, y)`,
        acceptedKeywords: ['y']
      },
      javascript: {
        starterCode: `let [x, ___] = [10, 20];\nconsole.log(x, y);`,
        solutionCode: `let [x, y] = [10, 20];\nconsole.log(x, y);`,
        acceptedKeywords: ['y']
      },
      java: {
        starterCode: `public class Main {\n    record Punto(int x, int y) {}\n    public static void main(String[] args) {\n        Punto p = new Punto(10, 20);\n        int x = p.x(), y = p.___();\n        System.out.println(x + " " + y);\n    }\n}`,
        solutionCode: `public class Main {\n    record Punto(int x, int y) {}\n    public static void main(String[] args) {\n        Punto p = new Punto(10, 20);\n        int x = p.x(), y = p.y();\n        System.out.println(x + " " + y);\n    }\n}`,
        acceptedKeywords: ['y']
      }
    }
  },
  {
    id: 126,
    title: 'Comprobación de Null / Undefined',
    statement: 'Corrige la verificación de existencia antes de acceder a la propiedad o puntero.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Comprueba ptr != nullptr antes de desreferenciar.',
    explanation: 'Acceder a una variable o puntero nulo produce un fallo crítico de segmentación o NullPointerException.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int *ptr = nullptr;\n    // BUG: Acceso a puntero nulo sin verificar\n    if (ptr == nullptr) {\n        std::cout << "Puntero nulo seguro" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int *ptr = nullptr;\n    if (ptr == nullptr) {\n        std::cout << "Puntero nulo seguro" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `dato = None\nif dato is None:\n    print("Variable None segura")`,
        solutionCode: `dato = None\nif dato is None:\n    print("Variable None segura")`
      },
      javascript: {
        starterCode: `let dato = null;\nif (dato === null) {\n    console.log("Variable nula segura");\n}`,
        solutionCode: `let dato = null;\nif (dato === null) {\n    console.log("Variable nula segura");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String texto = null;\n        if (texto == null) {\n            System.out.println("Variable nula segura");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String texto = null;\n        if (texto == null) {\n            System.out.println("Variable nula segura");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 127,
    title: 'Desplazamiento de Bits (Bitshift Left)',
    statement: 'Completa el operador de desplazamiento a la izquierda (<<) para multiplicar 1 por 2^3 (8).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'El operador de desplazamiento a la izquierda es <<.',
    explanation: 'Desplazar n bits a la izquierda equivale matemáticamente a multiplicar por 2^n.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int pot = 1 ___ 3;\n    std::cout << pot << std::endl; // 8\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int pot = 1 << 3;\n    std::cout << pot << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['<<']
      },
      python: {
        starterCode: `pot = 1 ___ 3\nprint(pot)`,
        solutionCode: `pot = 1 << 3\nprint(pot)`,
        acceptedKeywords: ['<<']
      },
      javascript: {
        starterCode: `let pot = 1 ___ 3;\nconsole.log(pot);`,
        solutionCode: `let pot = 1 << 3;\nconsole.log(pot);`,
        acceptedKeywords: ['<<']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int pot = 1 ___ 3;\n        System.out.println(pot);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int pot = 1 << 3;\n        System.out.println(pot);\n    }\n}`,
        acceptedKeywords: ['<<']
      }
    }
  },
  {
    id: 128,
    title: 'Conversión Explícita con static_cast',
    statement: 'Corrige la conversión estática de tipo decimal a entero en C++.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa static_cast<int>(valor).',
    explanation: 'static_cast realiza conversiones de tipos seguras y explícitas validadas en compilación.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    double precio = 99.75;\n    // BUG: Sintaxis incorrecta de casteo moderno\n    int entero = static_cast<double>(precio); \n    std::cout << entero << std::endl; // Debe ser 99\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    double precio = 99.75;\n    int entero = static_cast<int>(precio);\n    std::cout << entero << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `precio = 99.75\nentero = int(precio)\nprint(entero)`,
        solutionCode: `precio = 99.75\nentero = int(precio)\nprint(entero)`
      },
      javascript: {
        starterCode: `let precio = 99.75;\nlet entero = Math.trunc(precio);\nconsole.log(entero);`,
        solutionCode: `let precio = 99.75;\nlet entero = Math.trunc(precio);\nconsole.log(entero);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        double precio = 99.75;\n        int entero = (int) precio;\n        System.out.println(entero);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double precio = 99.75;\n        int entero = (int) precio;\n        System.out.println(entero);\n    }\n}`
      }
    }
  },
  {
    id: 129,
    title: 'Constexpr / Evaluación en Compilación',
    statement: 'Completa la palabra clave constexpr para calcular el tamaño en tiempo de compilación.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa constexpr en C++ o final static en Java.',
    explanation: 'Las expresiones constexpr se evalúan en tiempo de compilación mejorando el rendimiento.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    ___ int TAM = 10 * 5;\n    std::cout << TAM << std::endl; // 50\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    constexpr int TAM = 10 * 5;\n    std::cout << TAM << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['constexpr', 'const']
      },
      python: {
        starterCode: `TAM = 10 * 5\nprint(TAM)`,
        solutionCode: `TAM = 10 * 5\nprint(TAM)`,
        acceptedKeywords: ['10 * 5', '50']
      },
      javascript: {
        starterCode: `___ TAM = 10 * 5;\nconsole.log(TAM);`,
        solutionCode: `const TAM = 10 * 5;\nconsole.log(TAM);`,
        acceptedKeywords: ['const']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        ___ int TAM = 10 * 5;\n        System.out.println(TAM);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        final int TAM = 10 * 5;\n        System.out.println(TAM);\n    }\n}`,
        acceptedKeywords: ['final']
      }
    }
  },
  {
    id: 130,
    title: 'Tamaño en Memoria con sizeof',
    statement: 'Corrige el operador para consultar la cantidad de bytes que ocupa un tipo de dato en memoria.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'El operador que devuelve los bytes de un tipo es sizeof(tipo).',
    explanation: 'El operador sizeof determina en tiempo de compilación los bytes requeridos por un tipo en memoria.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    // BUG: strlen solo es para strings estilo C\n    int bytes = sizeof(double);\n    std::cout << bytes << std::endl; // 8 bytes\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int bytes = sizeof(double);\n    std::cout << bytes << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `import sys\nbytes_num = sys.getsizeof(10)\nprint(bytes_num > 0)`,
        solutionCode: `import sys\nbytes_num = sys.getsizeof(10)\nprint(bytes_num > 0)`
      },
      javascript: {
        starterCode: `let bytes = typeof 42;\nconsole.log(bytes === 'number');`,
        solutionCode: `let bytes = typeof 42;\nconsole.log(bytes === 'number');`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int bytes = Double.BYTES;\n        System.out.println(bytes);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int bytes = Double.BYTES;\n        System.out.println(bytes);\n    }\n}`
      }
    }
  }
];
