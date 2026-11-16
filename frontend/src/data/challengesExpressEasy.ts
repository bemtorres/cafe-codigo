import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressExercisesEasy: ExpressChallengeExercise[] = [
  {
    id: 1,
    title: 'Función Saludo Básico',
    statement: 'Completa la función para imprimir el mensaje de bienvenida y llamarla desde el programa principal.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Verifica la palabra clave de definición de función o retorno void y la llamada con paréntesis ().',
    explanation: 'Las funciones sin retorno se declaran (ej. void o def) y se invocan usando su nombre seguido de paréntesis.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\n___ saludar() {\n    std::cout << "¡Hola, bienvenido!" << std::endl;\n}\n\nint main() {\n    saludar___;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid saludar() {\n    std::cout << "¡Hola, bienvenido!" << std::endl;\n}\n\nint main() {\n    saludar();\n    return 0;\n}`,
        acceptedKeywords: ['void', '()']
      },
      python: {
        starterCode: `___ saludar():\n    print("¡Hola, bienvenido!")\n\nsaludar___`,
        solutionCode: `def saludar():\n    print("¡Hola, bienvenido!")\n\nsaludar()`,
        acceptedKeywords: ['def', '()']
      },
      javascript: {
        starterCode: `___ saludar() {\n    console.log("¡Hola, bienvenido!");\n}\n\nsaludar___;`,
        solutionCode: `function saludar() {\n    console.log("¡Hola, bienvenido!");\n}\n\nsaludar();`,
        acceptedKeywords: ['function', '()']
      },
      java: {
        starterCode: `public class Main {\n    public static ___ saludar() {\n        System.out.println("¡Hola, bienvenido!");\n    }\n    public static void main(String[] args) {\n        saludar___;\n    }\n}`,
        solutionCode: `public class Main {\n    public static void saludar() {\n        System.out.println("¡Hola, bienvenido!");\n    }\n    public static void main(String[] args) {\n        saludar();\n    }\n}`,
        acceptedKeywords: ['void', '()']
      }
    }
  },
  {
    id: 2,
    title: 'Suma de dos números',
    statement: 'Corrige la función para que retorne la suma de los parámetros a y b.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Revisa qué palabra clave falta para enviar el resultado al llamador.',
    explanation: 'Para que una función entregue un valor resultante hacia donde fue llamada, debe utilizar la sentencia return.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumar(int a, int b) {\n    // BUG: falta retornar la suma\n    int resultado = a + b;\n}\n\nint main() {\n    std::cout << sumar(10, 20) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumar(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    std::cout << sumar(10, 20) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def sumar(a, b):\n    # BUG: Falta la instrucción de retorno\n    resultado = a + b\n\nprint(sumar(10, 20))`,
        solutionCode: `def sumar(a, b):\n    return a + b\n\nprint(sumar(10, 20))`
      },
      javascript: {
        starterCode: `function sumar(a, b) {\n    // BUG: Falta retornar el valor\n    let resultado = a + b;\n}\n\nconsole.log(sumar(10, 20));`,
        solutionCode: `function sumar(a, b) {\n    return a + b;\n}\n\nconsole.log(sumar(10, 20));`
      },
      java: {
        starterCode: `public class Main {\n    public static int sumar(int a, int b) {\n        // BUG: falta return\n        int res = a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumar(10, 20));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumar(int a, int b) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumar(10, 20));\n    }\n}`
      }
    }
  },
  {
    id: 3,
    title: 'Cálculo de Área de Triángulo',
    statement: 'Completa la fórmula matemática para obtener el área de un triángulo (base * altura / 2).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La fórmula es (base * altura) dividida entre 2.0.',
    explanation: 'El área de un triángulo se calcula multiplicando base por altura y dividiendo el producto por 2.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble calcularArea(double base, double altura) {\n    return (base * altura) / ___;\n}\n\nint main() {\n    std::cout << calcularArea(10.0, 5.0) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble calcularArea(double base, double altura) {\n    return (base * altura) / 2.0;\n}\n\nint main() {\n    std::cout << calcularArea(10.0, 5.0) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['2', '2.0']
      },
      python: {
        starterCode: `def calcular_area(base, altura):\n    return (base * altura) / ___\n\nprint(calcular_area(10.0, 5.0))`,
        solutionCode: `def calcular_area(base, altura):\n    return (base * altura) / 2\n\nprint(calcular_area(10.0, 5.0))`,
        acceptedKeywords: ['2', '2.0']
      },
      javascript: {
        starterCode: `function calcularArea(base, altura) {\n    return (base * altura) / ___\n}\n\nconsole.log(calcularArea(10.0, 5.0));`,
        solutionCode: `function calcularArea(base, altura) {\n    return (base * altura) / 2;\n}\n\nconsole.log(calcularArea(10.0, 5.0));`,
        acceptedKeywords: ['2', '2.0']
      },
      java: {
        starterCode: `public class Main {\n    public static double calcularArea(double base, double altura) {\n        return (base * altura) / ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularArea(10.0, 5.0));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double calcularArea(double base, double altura) {\n        return (base * altura) / 2.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularArea(10.0, 5.0));\n    }\n}`,
        acceptedKeywords: ['2', '2.0']
      }
    }
  },
  {
    id: 4,
    title: 'Verificación de Número Par',
    statement: 'Corrige la función booleana para que devuelva verdadero únicamente si el número es par.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Un número par tiene un residuo de cero al dividirse por 2 (operador módulo %).',
    explanation: 'La condición lógica correcta es numero % 2 == 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esPar(int numero) {\n    // BUG: condición errónea de paridad\n    return numero % 2 == 1;\n}\n\nint main() {\n    std::cout << std::boolalpha << esPar(4) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esPar(int numero) {\n    return numero % 2 == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esPar(4) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_par(numero):\n    # BUG: está validando impares\n    return numero % 2 != 0\n\nprint(es_par(4))`,
        solutionCode: `def es_par(numero):\n    return numero % 2 == 0\n\nprint(es_par(4))`
      },
      javascript: {
        starterCode: `function esPar(numero) {\n    // BUG: retorna true en impares\n    return numero % 2 === 1;\n}\n\nconsole.log(esPar(4));`,
        solutionCode: `function esPar(numero) {\n    return numero % 2 === 0;\n}\n\nconsole.log(esPar(4));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esPar(int numero) {\n        // BUG:\n        return numero % 2 != 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPar(4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esPar(int numero) {\n        return numero % 2 == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPar(4));\n    }\n}`
      }
    }
  },
  {
    id: 5,
    title: 'Obtener el Mayor de Dos Números',
    statement: 'Completa la condición para que retorne el número más grande entre a y b.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Si a es mayor que b, retornamos a; de lo contrario b.',
    explanation: 'El operador relacional > permite comprobar cuál de los dos valores es superior.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint obtenerMayor(int a, int b) {\n    if (a ___ b) {\n        return a;\n    }\n    return b;\n}\n\nint main() {\n    std::cout << obtenerMayor(45, 12) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint obtenerMayor(int a, int b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}\n\nint main() {\n    std::cout << obtenerMayor(45, 12) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['>', '>=']
      },
      python: {
        starterCode: `def obtener_mayor(a, b):\n    if a ___ b:\n        return a\n    return b\n\nprint(obtener_mayor(45, 12))`,
        solutionCode: `def obtener_mayor(a, b):\n    if a > b:\n        return a\n    return b\n\nprint(obtener_mayor(45, 12))`,
        acceptedKeywords: ['>', '>=']
      },
      javascript: {
        starterCode: `function obtenerMayor(a, b) {\n    if (a ___ b) {\n        return a;\n    }\n    return b;\n}\n\nconsole.log(obtenerMayor(45, 12));`,
        solutionCode: `function obtenerMayor(a, b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}\n\nconsole.log(obtenerMayor(45, 12));`,
        acceptedKeywords: ['>', '>=']
      },
      java: {
        starterCode: `public class Main {\n    public static int obtenerMayor(int a, int b) {\n        if (a ___ b) {\n            return a;\n        }\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(obtenerMayor(45, 12));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int obtenerMayor(int a, int b) {\n        if (a > b) {\n            return a;\n        }\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(obtenerMayor(45, 12));\n    }\n}`,
        acceptedKeywords: ['>', '>=']
      }
    }
  },
  {
    id: 6,
    title: 'Validación de Credenciales de Usuario',
    statement: 'Completa la función para que verifique si el usuario es "admin" Y la clave es "1234".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Utiliza el operador lógico AND (&& o and).',
    explanation: 'Ambas condiciones deben cumplirse simultáneamente para conceder acceso.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nbool autenticar(std::string usuario, std::string clave) {\n    return (usuario == "admin" ___ clave == "1234");\n}\n\nint main() {\n    std::cout << std::boolalpha << autenticar("admin", "1234") << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nbool autenticar(std::string usuario, std::string clave) {\n    return (usuario == "admin" && clave == "1234");\n}\n\nint main() {\n    std::cout << std::boolalpha << autenticar("admin", "1234") << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['&&', 'and']
      },
      python: {
        starterCode: `def autenticar(usuario, clave):\n    return usuario == "admin" ___ clave == "1234"\n\nprint(autenticar("admin", "1234"))`,
        solutionCode: `def autenticar(usuario, clave):\n    return usuario == "admin" and clave == "1234"\n\nprint(autenticar("admin", "1234"))`,
        acceptedKeywords: ['and', '&&']
      },
      javascript: {
        starterCode: `function autenticar(usuario, clave) {\n    return (usuario === "admin" ___ clave === "1234");\n}\n\nconsole.log(autenticar("admin", "1234"));`,
        solutionCode: `function autenticar(usuario, clave) {\n    return (usuario === "admin" && clave === "1234");\n}\n\nconsole.log(autenticar("admin", "1234"));`,
        acceptedKeywords: ['&&']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean autenticar(String usuario, String clave) {\n        return (usuario.equals("admin") ___ clave.equals("1234"));\n    }\n    public static void main(String[] args) {\n        System.out.println(autenticar("admin", "1234"));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean autenticar(String usuario, String clave) {\n        return (usuario.equals("admin") && clave.equals("1234"));\n    }\n    public static void main(String[] args) {\n        System.out.println(autenticar("admin", "1234"));\n    }\n}`,
        acceptedKeywords: ['&&']
      }
    }
  },
  {
    id: 7,
    title: 'Calcular Descuento Aplicado',
    statement: 'Corrige la fórmula del porcentaje de descuento en la función.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El porcentaje se debe dividir por 100 para obtener la fracción decimal.',
    explanation: 'El valor del descuento es monto * (porcentaje / 100).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble calcularDescuento(double monto, double porcentaje) {\n    // BUG: Multiplica sin dividir por 100\n    return monto * porcentaje;\n}\n\nint main() {\n    std::cout << calcularDescuento(1000, 20) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble calcularDescuento(double monto, double porcentaje) {\n    return monto * (porcentaje / 100.0);\n}\n\nint main() {\n    std::cout << calcularDescuento(1000, 20) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def calcular_descuento(monto, porcentaje):\n    # BUG: Falta dividir entre 100\n    return monto * porcentaje\n\nprint(calcular_descuento(1000, 20))`,
        solutionCode: `def calcular_descuento(monto, porcentaje):\n    return monto * (porcentaje / 100)\n\nprint(calcular_descuento(1000, 20))`
      },
      javascript: {
        starterCode: `function calcularDescuento(monto, porcentaje) {\n    return monto * porcentaje;\n}\n\nconsole.log(calcularDescuento(1000, 20));`,
        solutionCode: `function calcularDescuento(monto, porcentaje) {\n    return monto * (porcentaje / 100);\n}\n\nconsole.log(calcularDescuento(1000, 20));`
      },
      java: {
        starterCode: `public class Main {\n    public static double calcularDescuento(double monto, double porcentaje) {\n        return monto * porcentaje;\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularDescuento(1000, 20));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double calcularDescuento(double monto, double porcentaje) {\n        return monto * (porcentaje / 100.0);\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularDescuento(1000, 20));\n    }\n}`
      }
    }
  },
  {
    id: 8,
    title: 'Conversor Celsius a Fahrenheit',
    statement: 'Completa la fórmula de conversión (C * 9/5 + 32).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La constante que se suma al final es 32.',
    explanation: 'Para pasar de °C a °F se multiplica por 9/5 (o 1.8) y se le suman 32 grados.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble aFahrenheit(double celsius) {\n    return (celsius * 9.0 / 5.0) + ___;\n}\n\nint main() {\n    std::cout << aFahrenheit(0) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble aFahrenheit(double celsius) {\n    return (celsius * 9.0 / 5.0) + 32.0;\n}\n\nint main() {\n    std::cout << aFahrenheit(0) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['32', '32.0']
      },
      python: {
        starterCode: `def a_fahrenheit(celsius):\n    return (celsius * 9 / 5) + ___\n\nprint(a_fahrenheit(0))`,
        solutionCode: `def a_fahrenheit(celsius):\n    return (celsius * 9 / 5) + 32\n\nprint(a_fahrenheit(0))`,
        acceptedKeywords: ['32', '32.0']
      },
      javascript: {
        starterCode: `function aFahrenheit(celsius) {\n    return (celsius * 9 / 5) + ___\n}\n\nconsole.log(aFahrenheit(0));`,
        solutionCode: `function aFahrenheit(celsius) {\n    return (celsius * 9 / 5) + 32;\n}\n\nconsole.log(aFahrenheit(0));`,
        acceptedKeywords: ['32', '32.0']
      },
      java: {
        starterCode: `public class Main {\n    public static double aFahrenheit(double celsius) {\n        return (celsius * 9.0 / 5.0) + ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(aFahrenheit(0));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double aFahrenheit(double celsius) {\n        return (celsius * 9.0 / 5.0) + 32.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(aFahrenheit(0));\n    }\n}`,
        acceptedKeywords: ['32', '32.0']
      }
    }
  },
  {
    id: 9,
    title: 'Validación de Mayoría de Edad',
    statement: 'Corrige el umbral en la condición para considerar mayor de edad a partir de los 18 años.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Debe permitir exactamente 18 años o más (edad >= 18).',
    explanation: 'El operador de comparación >= incluye el valor límite establecido.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esMayorDeEdad(int edad) {\n    // BUG: deja fuera a los de 18 años\n    return edad > 18;\n}\n\nint main() {\n    std::cout << std::boolalpha << esMayorDeEdad(18) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esMayorDeEdad(int edad) {\n    return edad >= 18;\n}\n\nint main() {\n    std::cout << std::boolalpha << esMayorDeEdad(18) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_mayor_de_edad(edad):\n    # BUG: No incluye a los de 18\n    return edad > 18\n\nprint(es_mayor_de_edad(18))`,
        solutionCode: `def es_mayor_de_edad(edad):\n    return edad >= 18\n\nprint(es_mayor_de_edad(18))`
      },
      javascript: {
        starterCode: `function esMayorDeEdad(edad) {\n    return edad > 18;\n}\n\nconsole.log(esMayorDeEdad(18));`,
        solutionCode: `function esMayorDeEdad(edad) {\n    return edad >= 18;\n}\n\nconsole.log(esMayorDeEdad(18));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esMayorDeEdad(int edad) {\n        return edad > 18;\n    }\n    public static void main(String[] args) {\n        System.out.println(esMayorDeEdad(18));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esMayorDeEdad(int edad) {\n        return edad >= 18;\n    }\n    public static void main(String[] args) {\n        System.out.println(esMayorDeEdad(18));\n    }\n}`
      }
    }
  },
  {
    id: 10,
    title: 'Doble de un Número',
    statement: 'Completa la función para retornar el doble del número (n * 2).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Multiplica la variable n por 2.',
    explanation: 'El doble de un número se obtiene multiplicándolo por dos: n * 2.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint doble(int n) {\n    return n * ___;\n}\n\nint main() {\n    std::cout << doble(7) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint doble(int n) {\n    return n * 2;\n}\n\nint main() {\n    std::cout << doble(7) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['2']
      },
      python: {
        starterCode: `def doble(n):\n    return n * ___\n\nprint(doble(7))`,
        solutionCode: `def doble(n):\n    return n * 2\n\nprint(doble(7))`,
        acceptedKeywords: ['2']
      },
      javascript: {
        starterCode: `function doble(n) {\n    return n * ___;\n}\n\nconsole.log(doble(7));`,
        solutionCode: `function doble(n) {\n    return n * 2;\n}\n\nconsole.log(doble(7));`,
        acceptedKeywords: ['2']
      },
      java: {
        starterCode: `public class Main {\n    public static int doble(int n) {\n        return n * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(doble(7));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int doble(int n) {\n        return n * 2;\n    }\n    public static void main(String[] args) {\n        System.out.println(doble(7));\n    }\n}`,
        acceptedKeywords: ['2']
      }
    }
  },
  {
    id: 11,
    title: 'Triple de un Número',
    statement: 'Completa la función para calcular el triple de n.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Multiplica n por 3.',
    explanation: 'El triple de un número se calcula con n * 3.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint triple(int n) {\n    return n * ___;\n}\n\nint main() {\n    std::cout << triple(4) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint triple(int n) {\n    return n * 3;\n}\n\nint main() {\n    std::cout << triple(4) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['3']
      },
      python: {
        starterCode: `def triple(n):\n    return n * ___\n\nprint(triple(4))`,
        solutionCode: `def triple(n):\n    return n * 3\n\nprint(triple(4))`,
        acceptedKeywords: ['3']
      },
      javascript: {
        starterCode: `function triple(n) {\n    return n * ___;\n}\n\nconsole.log(triple(4));`,
        solutionCode: `function triple(n) {\n    return n * 3;\n}\n\nconsole.log(triple(4));`,
        acceptedKeywords: ['3']
      },
      java: {
        starterCode: `public class Main {\n    public static int triple(int n) {\n        return n * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(triple(4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int triple(int n) {\n        return n * 3;\n    }\n    public static void main(String[] args) {\n        System.out.println(triple(4));\n    }\n}`,
        acceptedKeywords: ['3']
      }
    }
  },
  {
    id: 12,
    title: 'Es Número Positivo',
    statement: 'Corrige la función para que retorne true si n es estrictamente mayor a 0.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Un número positivo es estrictamente mayor que cero (n > 0).',
    explanation: 'El cero no es positivo ni negativo, por tanto la condición es n > 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esPositivo(int n) {\n    // BUG: incluye el cero\n    return n >= 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esPositivo(5) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esPositivo(int n) {\n    return n > 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esPositivo(5) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_positivo(n):\n    return n >= 0\n\nprint(es_positivo(5))`,
        solutionCode: `def es_positivo(n):\n    return n > 0\n\nprint(es_positivo(5))`
      },
      javascript: {
        starterCode: `function esPositivo(n) {\n    return n >= 0;\n}\n\nconsole.log(esPositivo(5));`,
        solutionCode: `function esPositivo(n) {\n    return n > 0;\n}\n\nconsole.log(esPositivo(5));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esPositivo(int n) {\n        return n >= 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPositivo(5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esPositivo(int n) {\n        return n > 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPositivo(5));\n    }\n}`
      }
    }
  },
  {
    id: 13,
    title: 'Perímetro de Cuadrado',
    statement: 'Completa la fórmula para calcular el perímetro a partir del lado (lado * 4).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Un cuadrado tiene 4 lados iguales.',
    explanation: 'El perímetro se calcula sumando sus 4 lados o multiplicando lado * 4.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint perimetroCuadrado(int lado) {\n    return lado * ___;\n}\n\nint main() {\n    std::cout << perimetroCuadrado(6) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint perimetroCuadrado(int lado) {\n    return lado * 4;\n}\n\nint main() {\n    std::cout << perimetroCuadrado(6) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['4']
      },
      python: {
        starterCode: `def perimetro_cuadrado(lado):\n    return lado * ___\n\nprint(perimetro_cuadrado(6))`,
        solutionCode: `def perimetro_cuadrado(lado):\n    return lado * 4\n\nprint(perimetro_cuadrado(6))`,
        acceptedKeywords: ['4']
      },
      javascript: {
        starterCode: `function perimetroCuadrado(lado) {\n    return lado * ___;\n}\n\nconsole.log(perimetroCuadrado(6));`,
        solutionCode: `function perimetroCuadrado(lado) {\n    return lado * 4;\n}\n\nconsole.log(perimetroCuadrado(6));`,
        acceptedKeywords: ['4']
      },
      java: {
        starterCode: `public class Main {\n    public static int perimetroCuadrado(int lado) {\n        return lado * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(perimetroCuadrado(6));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int perimetroCuadrado(int lado) {\n        return lado * 4;\n    }\n    public static void main(String[] args) {\n        System.out.println(perimetroCuadrado(6));\n    }\n}`,
        acceptedKeywords: ['4']
      }
    }
  },
  {
    id: 14,
    title: 'Minutos a Segundos',
    statement: 'Completa la función para convertir minutos a segundos.',
    type: 'complete',
    difficulty: 'facil',
    hint: '1 minuto tiene 60 segundos.',
    explanation: 'Multiplica la cantidad de minutos por 60.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint minutosASegundos(int min) {\n    return min * ___;\n}\n\nint main() {\n    std::cout << minutosASegundos(3) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint minutosASegundos(int min) {\n    return min * 60;\n}\n\nint main() {\n    std::cout << minutosASegundos(3) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['60']
      },
      python: {
        starterCode: `def minutos_a_segundos(minutos):\n    return minutos * ___\n\nprint(minutos_a_segundos(3))`,
        solutionCode: `def minutos_a_segundos(minutos):\n    return minutos * 60\n\nprint(minutos_a_segundos(3))`,
        acceptedKeywords: ['60']
      },
      javascript: {
        starterCode: `function minutosASegundos(min) {\n    return min * ___;\n}\n\nconsole.log(minutosASegundos(3));`,
        solutionCode: `function minutosASegundos(min) {\n    return min * 60;\n}\n\nconsole.log(minutosASegundos(3));`,
        acceptedKeywords: ['60']
      },
      java: {
        starterCode: `public class Main {\n    public static int minutosASegundos(int min) {\n        return min * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(minutosASegundos(3));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int minutosASegundos(int min) {\n        return min * 60;\n    }\n    public static void main(String[] args) {\n        System.out.println(minutosASegundos(3));\n    }\n}`,
        acceptedKeywords: ['60']
      }
    }
  },
  {
    id: 15,
    title: 'Horas a Minutos',
    statement: 'Completa la función para convertir horas a minutos.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Cada hora consta de 60 minutos.',
    explanation: 'Multiplicamos horas * 60 para obtener el total de minutos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint horasAMinutos(int horas) {\n    return horas * ___;\n}\n\nint main() {\n    std::cout << horasAMinutos(2) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint horasAMinutos(int horas) {\n    return horas * 60;\n}\n\nint main() {\n    std::cout << horasAMinutos(2) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['60']
      },
      python: {
        starterCode: `def horas_a_minutos(horas):\n    return horas * ___\n\nprint(horas_a_minutos(2))`,
        solutionCode: `def horas_a_minutos(horas):\n    return horas * 60\n\nprint(horas_a_minutos(2))`,
        acceptedKeywords: ['60']
      },
      javascript: {
        starterCode: `function horasAMinutos(horas) {\n    return horas * ___;\n}\n\nconsole.log(horasAMinutos(2));`,
        solutionCode: `function horasAMinutos(horas) {\n    return horas * 60;\n}\n\nconsole.log(horasAMinutos(2));`,
        acceptedKeywords: ['60']
      },
      java: {
        starterCode: `public class Main {\n    public static int horasAMinutos(int horas) {\n        return horas * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(horasAMinutos(2));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int horasAMinutos(int horas) {\n        return horas * 60;\n    }\n    public static void main(String[] args) {\n        System.out.println(horasAMinutos(2));\n    }\n}`,
        acceptedKeywords: ['60']
      }
    }
  },
  {
    id: 16,
    title: 'Área de Rectángulo',
    statement: 'Corrige la fórmula para que retorne el producto de base por altura.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El área de un rectángulo es base * altura (no suma).',
    explanation: 'El área de figuras rectangulares es el producto de sus dos dimensiones principales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint areaRectangulo(int base, int altura) {\n    // BUG: Suma en vez de multiplicar\n    return base + altura;\n}\n\nint main() {\n    std::cout << areaRectangulo(5, 4) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint areaRectangulo(int base, int altura) {\n    return base * altura;\n}\n\nint main() {\n    std::cout << areaRectangulo(5, 4) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def area_rectangulo(base, altura):\n    return base + altura\n\nprint(area_rectangulo(5, 4))`,
        solutionCode: `def area_rectangulo(base, altura):\n    return base * altura\n\nprint(area_rectangulo(5, 4))`
      },
      javascript: {
        starterCode: `function areaRectangulo(base, altura) {\n    return base + altura;\n}\n\nconsole.log(areaRectangulo(5, 4));`,
        solutionCode: `function areaRectangulo(base, altura) {\n    return base * altura;\n}\n\nconsole.log(areaRectangulo(5, 4));`
      },
      java: {
        starterCode: `public class Main {\n    public static int areaRectangulo(int base, int altura) {\n        return base + altura;\n    }\n    public static void main(String[] args) {\n        System.out.println(areaRectangulo(5, 4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int areaRectangulo(int base, int altura) {\n        return base * altura;\n    }\n    public static void main(String[] args) {\n        System.out.println(areaRectangulo(5, 4));\n    }\n}`
      }
    }
  },
  {
    id: 17,
    title: 'Es Cero',
    statement: 'Completa la comparación para verificar si n es exactamente igual a 0.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa el operador de igualdad == con 0.',
    explanation: 'La comparación n == 0 retorna true cuando el valor es neutro cero.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esCero(int n) {\n    return n ___ 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esCero(0) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esCero(int n) {\n    return n == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esCero(0) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['==', '===']
      },
      python: {
        starterCode: `def es_cero(n):\n    return n ___ 0\n\nprint(es_cero(0))`,
        solutionCode: `def es_cero(n):\n    return n == 0\n\nprint(es_cero(0))`,
        acceptedKeywords: ['==']
      },
      javascript: {
        starterCode: `function esCero(n) {\n    return n ___ 0;\n}\n\nconsole.log(esCero(0));`,
        solutionCode: `function esCero(n) {\n    return n === 0;\n}\n\nconsole.log(esCero(0));`,
        acceptedKeywords: ['===', '==']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esCero(int n) {\n        return n ___ 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esCero(0));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esCero(int n) {\n        return n == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esCero(0));\n    }\n}`,
        acceptedKeywords: ['==']
      }
    }
  },
  {
    id: 18,
    title: 'Es Múltiplo de Cinco',
    statement: 'Completa la operación módulo para verificar si n es múltiplo de 5.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El operador % 5 entrega el resto de la división.',
    explanation: 'Si n % 5 == 0, el número se divide exactamente en grupos de 5.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esMultiploDeCinco(int n) {\n    return n % ___ == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esMultiploDeCinco(25) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esMultiploDeCinco(int n) {\n    return n % 5 == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esMultiploDeCinco(25) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['5']
      },
      python: {
        starterCode: `def es_multiplo_de_cinco(n):\n    return n % ___ == 0\n\nprint(es_multiplo_de_cinco(25))`,
        solutionCode: `def es_multiplo_de_cinco(n):\n    return n % 5 == 0\n\nprint(es_multiplo_de_cinco(25))`,
        acceptedKeywords: ['5']
      },
      javascript: {
        starterCode: `function esMultiploDeCinco(n) {\n    return n % ___ === 0;\n}\n\nconsole.log(esMultiploDeCinco(25));`,
        solutionCode: `function esMultiploDeCinco(n) {\n    return n % 5 === 0;\n}\n\nconsole.log(esMultiploDeCinco(25));`,
        acceptedKeywords: ['5']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esMultiploDeCinco(int n) {\n        return n % ___ == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esMultiploDeCinco(25));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esMultiploDeCinco(int n) {\n        return n % 5 == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esMultiploDeCinco(25));\n    }\n}`,
        acceptedKeywords: ['5']
      }
    }
  },
  {
    id: 19,
    title: 'Valor Negativo Opuesto',
    statement: 'Retorna el número con el signo invertido (-n).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa el operador unario menos (-) antes de la variable n.',
    explanation: 'El operador unario - convierte números positivos a negativos y viceversa.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint opuesto(int n) {\n    return ___n;\n}\n\nint main() {\n    std::cout << opuesto(8) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint opuesto(int n) {\n    return -n;\n}\n\nint main() {\n    std::cout << opuesto(8) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['-']
      },
      python: {
        starterCode: `def opuesto(n):\n    return ___n\n\nprint(opuesto(8))`,
        solutionCode: `def opuesto(n):\n    return -n\n\nprint(opuesto(8))`,
        acceptedKeywords: ['-']
      },
      javascript: {
        starterCode: `function opuesto(n) {\n    return ___n;\n}\n\nconsole.log(opuesto(8));`,
        solutionCode: `function opuesto(n) {\n    return -n;\n}\n\nconsole.log(opuesto(8));`,
        acceptedKeywords: ['-']
      },
      java: {
        starterCode: `public class Main {\n    public static int opuesto(int n) {\n        return ___n;\n    }\n    public static void main(String[] args) {\n        System.out.println(opuesto(8));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int opuesto(int n) {\n        return -n;\n    }\n    public static void main(String[] args) {\n        System.out.println(opuesto(8));\n    }\n}`,
        acceptedKeywords: ['-']
      }
    }
  },
  {
    id: 20,
    title: 'Menor de Dos Números',
    statement: 'Corrige la función para que retorne el número más pequeño.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Si a es menor que b (<), retornamos a.',
    explanation: 'Evaluamos con el operador < para encontrar el valor mínimo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint obtenerMenor(int a, int b) {\n    // BUG: retorna el mayor\n    if (a > b) return a;\n    return b;\n}\n\nint main() {\n    std::cout << obtenerMenor(3, 9) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint obtenerMenor(int a, int b) {\n    if (a < b) return a;\n    return b;\n}\n\nint main() {\n    std::cout << obtenerMenor(3, 9) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def obtener_menor(a, b):\n    if a > b:\n        return a\n    return b\n\nprint(obtener_menor(3, 9))`,
        solutionCode: `def obtener_menor(a, b):\n    if a < b:\n        return a\n    return b\n\nprint(obtener_menor(3, 9))`
      },
      javascript: {
        starterCode: `function obtenerMenor(a, b) {\n    if (a > b) return a;\n    return b;\n}\n\nconsole.log(obtenerMenor(3, 9));`,
        solutionCode: `function obtenerMenor(a, b) {\n    if (a < b) return a;\n    return b;\n}\n\nconsole.log(obtenerMenor(3, 9));`
      },
      java: {
        starterCode: `public class Main {\n    public static int obtenerMenor(int a, int b) {\n        if (a > b) return a;\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(obtenerMenor(3, 9));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int obtenerMenor(int a, int b) {\n        if (a < b) return a;\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(obtenerMenor(3, 9));\n    }\n}`
      }
    }
  },
  {
    id: 21,
    title: 'Valor Absoluto Simple',
    statement: 'Completa la función para retornar el valor absoluto (positivo) de n.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Si n es menor a 0, retorna -n; sino retorna n.',
    explanation: 'El valor absoluto |n| elimina el signo negativo devolviendo su magnitud positiva.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint absoluto(int n) {\n    if (n < 0) return ___;\n    return n;\n}\n\nint main() {\n    std::cout << absoluto(-14) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint absoluto(int n) {\n    if (n < 0) return -n;\n    return n;\n}\n\nint main() {\n    std::cout << absoluto(-14) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['-n']
      },
      python: {
        starterCode: `def absoluto(n):\n    if n < 0:\n        return ___\n    return n\n\nprint(absoluto(-14))`,
        solutionCode: `def absoluto(n):\n    if n < 0:\n        return -n\n    return n\n\nprint(absoluto(-14))`,
        acceptedKeywords: ['-n']
      },
      javascript: {
        starterCode: `function absoluto(n) {\n    if (n < 0) return ___;\n    return n;\n}\n\nconsole.log(absoluto(-14));`,
        solutionCode: `function absoluto(n) {\n    if (n < 0) return -n;\n    return n;\n}\n\nconsole.log(absoluto(-14));`,
        acceptedKeywords: ['-n']
      },
      java: {
        starterCode: `public class Main {\n    public static int absoluto(int n) {\n        if (n < 0) return ___;\n        return n;\n    }\n    public static void main(String[] args) {\n        System.out.println(absoluto(-14));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int absoluto(int n) {\n        if (n < 0) return -n;\n        return n;\n    }\n    public static void main(String[] args) {\n        System.out.println(absoluto(-14));\n    }\n}`,
        acceptedKeywords: ['-n']
      }
    }
  },
  {
    id: 22,
    title: 'Días a Horas',
    statement: 'Completa la conversión de días a horas multiplicando por 24.',
    type: 'complete',
    difficulty: 'facil',
    hint: '1 día equivale a 24 horas.',
    explanation: 'Multiplicamos el total de días por 24.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint diasAHoras(int dias) {\n    return dias * ___;\n}\n\nint main() {\n    std::cout << diasAHoras(3) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint diasAHoras(int dias) {\n    return dias * 24;\n}\n\nint main() {\n    std::cout << diasAHoras(3) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['24']
      },
      python: {
        starterCode: `def dias_a_horas(dias):\n    return dias * ___\n\nprint(dias_a_horas(3))`,
        solutionCode: `def dias_a_horas(dias):\n    return dias * 24\n\nprint(dias_a_horas(3))`,
        acceptedKeywords: ['24']
      },
      javascript: {
        starterCode: `function diasAHoras(dias) {\n    return dias * ___;\n}\n\nconsole.log(diasAHoras(3));`,
        solutionCode: `function diasAHoras(dias) {\n    return dias * 24;\n}\n\nconsole.log(diasAHoras(3));`,
        acceptedKeywords: ['24']
      },
      java: {
        starterCode: `public class Main {\n    public static int diasAHoras(int dias) {\n        return dias * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(diasAHoras(3));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int diasAHoras(int dias) {\n        return dias * 24;\n    }\n    public static void main(String[] args) {\n        System.out.println(diasAHoras(3));\n    }\n}`,
        acceptedKeywords: ['24']
      }
    }
  },
  {
    id: 23,
    title: 'Incrementar en Uno',
    statement: 'Completa la función para retornar n + 1.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Suma 1 a la variable n.',
    explanation: 'La función sucesora retorna el número entero inmediatamente posterior.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint incrementar(int n) {\n    return n + ___;\n}\n\nint main() {\n    std::cout << incrementar(9) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint incrementar(int n) {\n    return n + 1;\n}\n\nint main() {\n    std::cout << incrementar(9) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `def incrementar(n):\n    return n + ___\n\nprint(incrementar(9))`,
        solutionCode: `def incrementar(n):\n    return n + 1\n\nprint(incrementar(9))`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `function incrementar(n) {\n    return n + ___;\n}\n\nconsole.log(incrementar(9));`,
        solutionCode: `function incrementar(n) {\n    return n + 1;\n}\n\nconsole.log(incrementar(9));`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static int incrementar(int n) {\n        return n + ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(incrementar(9));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int incrementar(int n) {\n        return n + 1;\n    }\n    public static void main(String[] args) {\n        System.out.println(incrementar(9));\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 24,
    title: 'Mitad de un Número',
    statement: 'Corrige la división para obtener la mitad exacta (n / 2.0).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Divide n entre 2.0 para evitar truncamiento entero.',
    explanation: 'Dividir entre 2.0 asegura un resultado decimal con precisión de punto flotante.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble mitad(double n) {\n    // BUG: divide por 3 en vez de 2\n    return n / 3.0;\n}\n\nint main() {\n    std::cout << mitad(10) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble mitad(double n) {\n    return n / 2.0;\n}\n\nint main() {\n    std::cout << mitad(10) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def mitad(n):\n    return n / 3\n\nprint(mitad(10))`,
        solutionCode: `def mitad(n):\n    return n / 2\n\nprint(mitad(10))`
      },
      javascript: {
        starterCode: `function mitad(n) {\n    return n / 3;\n}\n\nconsole.log(mitad(10));`,
        solutionCode: `function mitad(n) {\n    return n / 2;\n}\n\nconsole.log(mitad(10));`
      },
      java: {
        starterCode: `public class Main {\n    public static double mitad(double n) {\n        return n / 3.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(mitad(10));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double mitad(double n) {\n        return n / 2.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(mitad(10));\n    }\n}`
      }
    }
  },
  {
    id: 25,
    title: 'Es Número Negativo',
    statement: 'Completa la comparación para verificar si n es estrictamente menor a 0.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa el operador < con 0.',
    explanation: 'Cualquier número menor que 0 es de valor negativo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esNegativo(int n) {\n    return n ___ 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esNegativo(-5) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esNegativo(int n) {\n    return n < 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esNegativo(-5) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['<']
      },
      python: {
        starterCode: `def es_negativo(n):\n    return n ___ 0\n\nprint(es_negativo(-5))`,
        solutionCode: `def es_negativo(n):\n    return n < 0\n\nprint(es_negativo(-5))`,
        acceptedKeywords: ['<']
      },
      javascript: {
        starterCode: `function esNegativo(n) {\n    return n ___ 0;\n}\n\nconsole.log(esNegativo(-5));`,
        solutionCode: `function esNegativo(n) {\n    return n < 0;\n}\n\nconsole.log(esNegativo(-5));`,
        acceptedKeywords: ['<']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esNegativo(int n) {\n        return n ___ 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esNegativo(-5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esNegativo(int n) {\n        return n < 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esNegativo(-5));\n    }\n}`,
        acceptedKeywords: ['<']
      }
    }
  },
  {
    id: 26,
    title: 'Kilómetros a Metros',
    statement: 'Completa la conversión de kilómetros a metros (km * 1000).',
    type: 'complete',
    difficulty: 'facil',
    hint: '1 kilómetro contiene 1000 metros.',
    explanation: 'Multiplicamos la distancia en kilómetros por 1000.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint kmAMetros(int km) {\n    return km * ___;\n}\n\nint main() {\n    std::cout << kmAMetros(5) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint kmAMetros(int km) {\n    return km * 1000;\n}\n\nint main() {\n    std::cout << kmAMetros(5) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1000']
      },
      python: {
        starterCode: `def km_a_metros(km):\n    return km * ___\n\nprint(km_a_metros(5))`,
        solutionCode: `def km_a_metros(km):\n    return km * 1000\n\nprint(km_a_metros(5))`,
        acceptedKeywords: ['1000']
      },
      javascript: {
        starterCode: `function kmAMetros(km) {\n    return km * ___;\n}\n\nconsole.log(kmAMetros(5));`,
        solutionCode: `function kmAMetros(km) {\n    return km * 1000;\n}\n\nconsole.log(kmAMetros(5));`,
        acceptedKeywords: ['1000']
      },
      java: {
        starterCode: `public class Main {\n    public static int kmAMetros(int km) {\n        return km * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(kmAMetros(5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int kmAMetros(int km) {\n        return km * 1000;\n    }\n    public static void main(String[] args) {\n        System.out.println(kmAMetros(5));\n    }\n}`,
        acceptedKeywords: ['1000']
      }
    }
  },
  {
    id: 27,
    title: 'Suma de Tres Números',
    statement: 'Corrige la función para que sume los tres parámetros a, b y c.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Asegúrate de incluir el parámetro c en la suma.',
    explanation: 'La suma total es la adición de los 3 sumandos: a + b + c.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumarTres(int a, int b, int c) {\n    // BUG: Olvidó sumar c\n    return a + b;\n}\n\nint main() {\n    std::cout << sumarTres(2, 3, 5) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumarTres(int a, int b, int c) {\n    return a + b + c;\n}\n\nint main() {\n    std::cout << sumarTres(2, 3, 5) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def sumar_tres(a, b, c):\n    return a + b\n\nprint(sumar_tres(2, 3, 5))`,
        solutionCode: `def sumar_tres(a, b, c):\n    return a + b + c\n\nprint(sumar_tres(2, 3, 5))`
      },
      javascript: {
        starterCode: `function sumarTres(a, b, c) {\n    return a + b;\n}\n\nconsole.log(sumarTres(2, 3, 5));`,
        solutionCode: `function sumarTres(a, b, c) {\n    return a + b + c;\n}\n\nconsole.log(sumarTres(2, 3, 5));`
      },
      java: {
        starterCode: `public class Main {\n    public static int sumarTres(int a, int b, int c) {\n        return a + b;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumarTres(2, 3, 5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumarTres(int a, int b, int c) {\n        return a + b + c;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumarTres(2, 3, 5));\n    }\n}`
      }
    }
  },
  {
    id: 28,
    title: 'Es Divisible por Tres',
    statement: 'Completa la condición para retornar true si n es múltiplo de 3.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa el operador módulo % 3 == 0.',
    explanation: 'Un número es divisible por 3 cuando su residuo al dividir entre 3 es 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esDivisiblePorTres(int n) {\n    return n % ___ == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esDivisiblePorTres(9) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esDivisiblePorTres(int n) {\n    return n % 3 == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esDivisiblePorTres(9) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['3']
      },
      python: {
        starterCode: `def es_divisible_por_tres(n):\n    return n % ___ == 0\n\nprint(es_divisible_por_tres(9))`,
        solutionCode: `def es_divisible_por_tres(n):\n    return n % 3 == 0\n\nprint(es_divisible_por_tres(9))`,
        acceptedKeywords: ['3']
      },
      javascript: {
        starterCode: `function esDivisiblePorTres(n) {\n    return n % ___ === 0;\n}\n\nconsole.log(esDivisiblePorTres(9));`,
        solutionCode: `function esDivisiblePorTres(n) {\n    return n % 3 === 0;\n}\n\nconsole.log(esDivisiblePorTres(9));`,
        acceptedKeywords: ['3']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esDivisiblePorTres(int n) {\n        return n % ___ == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esDivisiblePorTres(9));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esDivisiblePorTres(int n) {\n        return n % 3 == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esDivisiblePorTres(9));\n    }\n}`,
        acceptedKeywords: ['3']
      }
    }
  },
  {
    id: 29,
    title: 'Cuadrado de un Número',
    statement: 'Corrige la función para que retorne n multiplicado por sí mismo.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El cuadrado es n * n (no n + n).',
    explanation: 'Elevar al cuadrado significa multiplicar el número por sí mismo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint cuadrado(int n) {\n    // BUG: Suma en lugar de multiplicar\n    return n + n;\n}\n\nint main() {\n    std::cout << cuadrado(6) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint cuadrado(int n) {\n    return n * n;\n}\n\nint main() {\n    std::cout << cuadrado(6) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def cuadrado(n):\n    return n + n\n\nprint(cuadrado(6))`,
        solutionCode: `def cuadrado(n):\n    return n * n\n\nprint(cuadrado(6))`
      },
      javascript: {
        starterCode: `function cuadrado(n) {\n    return n + n;\n}\n\nconsole.log(cuadrado(6));`,
        solutionCode: `function cuadrado(n) {\n    return n * n;\n}\n\nconsole.log(cuadrado(6));`
      },
      java: {
        starterCode: `public class Main {\n    public static int cuadrado(int n) {\n        return n + n;\n    }\n    public static void main(String[] args) {\n        System.out.println(cuadrado(6));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int cuadrado(int n) {\n        return n * n;\n    }\n    public static void main(String[] args) {\n        System.out.println(cuadrado(6));\n    }\n}`
      }
    }
  },
  {
    id: 30,
    title: 'Función Generadora de Código de Ticket',
    statement: 'Corrige el prefijo del código generado para coincidir con el formato oficial "TCK-".',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El prefijo esperado es "TCK-" seguido del identificador numérico.',
    explanation: 'La concatenación correcta genera identificadores únicos y consistentes en sistemas de tickets.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nstd::string generarTicket(int id) {\n    // BUG: Prefijo erróneo\n    return "INV-" + std::to_string(id);\n}\n\nint main() {\n    std::cout << generarTicket(108) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nstd::string generarTicket(int id) {\n    return "TCK-" + std::to_string(id);\n}\n\nint main() {\n    std::cout << generarTicket(108) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def generar_ticket(id_num):\n    return f"INV-{id_num}"\n\nprint(generar_ticket(108))`,
        solutionCode: `def generar_ticket(id_num):\n    return f"TCK-{id_num}"\n\nprint(generar_ticket(108))`
      },
      javascript: {
        starterCode: `function generarTicket(id) {\n    return \`INV-\${id}\`;\n}\n\nconsole.log(generarTicket(108));`,
        solutionCode: `function generarTicket(id) {\n    return \`TCK-\${id}\`;\n}\n\nconsole.log(generarTicket(108));`
      },
      java: {
        starterCode: `public class Main {\n    public static String generarTicket(int id) {\n        return "INV-" + id;\n    }\n    public static void main(String[] args) {\n        System.out.println(generarTicket(108));\n    }\n}`,
        solutionCode: `public class Main {\n    public static String generarTicket(int id) {\n        return "TCK-" + id;\n    }\n    public static void main(String[] args) {\n        System.out.println(generarTicket(108));\n    }\n}`
      }
    }
  }
];
