import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressExercisesMedium: ExpressChallengeExercise[] = [
  {
    id: 31,
    title: 'Mayor de Tres Números',
    statement: 'Completa la función para retornar el mayor entre tres números (a, b y c).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Compara si a >= b y a >= c. Si no, compara b y c.',
    explanation: 'La comparación anidada o con operadores lógicos permite determinar el valor máximo entre tres variables.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint mayorDeTres(int a, int b, int c) {\n    if (a >= b && a >= c) return a;\n    if (b >= a && b >= c) return ___;\n    return c;\n}\n\nint main() {\n    std::cout << mayorDeTres(10, 25, 15) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint mayorDeTres(int a, int b, int c) {\n    if (a >= b && a >= c) return a;\n    if (b >= a && b >= c) return b;\n    return c;\n}\n\nint main() {\n    std::cout << mayorDeTres(10, 25, 15) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['b']
      },
      python: {
        starterCode: `def mayor_de_tres(a, b, c):\n    if a >= b and a >= c:\n        return a\n    if b >= a and b >= c:\n        return ___\n    return c\n\nprint(mayor_de_tres(10, 25, 15))`,
        solutionCode: `def mayor_de_tres(a, b, c):\n    if a >= b and a >= c:\n        return a\n    if b >= a and b >= c:\n        return b\n    return c\n\nprint(mayor_de_tres(10, 25, 15))`,
        acceptedKeywords: ['b']
      },
      javascript: {
        starterCode: `function mayorDeTres(a, b, c) {\n    if (a >= b && a >= c) return a;\n    if (b >= a && b >= c) return ___;\n    return c;\n}\n\nconsole.log(mayorDeTres(10, 25, 15));`,
        solutionCode: `function mayorDeTres(a, b, c) {\n    if (a >= b && a >= c) return a;\n    if (b >= a && b >= c) return b;\n    return c;\n}\n\nconsole.log(mayorDeTres(10, 25, 15));`,
        acceptedKeywords: ['b']
      },
      java: {
        starterCode: `public class Main {\n    public static int mayorDeTres(int a, int b, int c) {\n        if (a >= b && a >= c) return a;\n        if (b >= a && b >= c) return ___;\n        return c;\n    }\n    public static void main(String[] args) {\n        System.out.println(mayorDeTres(10, 25, 15));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int mayorDeTres(int a, int b, int c) {\n        if (a >= b && a >= c) return a;\n        if (b >= a && b >= c) return b;\n        return c;\n    }\n    public static void main(String[] args) {\n        System.out.println(mayorDeTres(10, 25, 15));\n    }\n}`,
        acceptedKeywords: ['b']
      }
    }
  },
  {
    id: 32,
    title: 'Es Año Bisiesto',
    statement: 'Corrige la condición de año bisiesto (divisible por 4 y no por 100, o divisible por 400).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0).',
    explanation: 'Un año es bisiesto si es múltiplo de 4 pero no de 100, excepto los múltiplos de 400 que sí lo son.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esBisiesto(int anio) {\n    // BUG: falta la excepción del siglo 400\n    return anio % 4 == 0 && anio % 100 != 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esBisiesto(2000) << std::endl; // Debe dar true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esBisiesto(int anio) {\n    return (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0);\n}\n\nint main() {\n    std::cout << std::boolalpha << esBisiesto(2000) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_bisiesto(anio):\n    return anio % 4 == 0 and anio % 100 != 0\n\nprint(es_bisiesto(2000)) # Debe dar True`,
        solutionCode: `def es_bisiesto(anio):\n    return (anio % 4 == 0 and anio % 100 != 0) or (anio % 400 == 0)\n\nprint(es_bisiesto(2000))`
      },
      javascript: {
        starterCode: `function esBisiesto(anio) {\n    return anio % 4 === 0 && anio % 100 !== 0;\n}\n\nconsole.log(esBisiesto(2000));`,
        solutionCode: `function esBisiesto(anio) {\n    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);\n}\n\nconsole.log(esBisiesto(2000));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esBisiesto(int anio) {\n        return anio % 4 == 0 && anio % 100 != 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esBisiesto(2000));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esBisiesto(int anio) {\n        return (anio % 4 == 0 && anio % 100 != 0) || (anio % 400 == 0);\n    }\n    public static void main(String[] args) {\n        System.out.println(esBisiesto(2000));\n    }\n}`
      }
    }
  },
  {
    id: 33,
    title: 'Suma de Rango 1 a N',
    statement: 'Completa la fórmula matemática o bucle para sumar todos los enteros del 1 al n: n * (n + 1) / 2.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La fórmula de Gauss es n * (n + 1) / 2.',
    explanation: 'La sumatoria de los primeros n números naturales se simplifica con la fórmula de Gauss.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumaRango(int n) {\n    return (n * (n + ___)) / 2;\n}\n\nint main() {\n    std::cout << sumaRango(10) << std::endl; // 55\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumaRango(int n) {\n    return (n * (n + 1)) / 2;\n}\n\nint main() {\n    std::cout << sumaRango(10) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `def suma_rango(n):\n    return (n * (n + ___)) // 2\n\nprint(suma_rango(10)) # 55`,
        solutionCode: `def suma_rango(n):\n    return (n * (n + 1)) // 2\n\nprint(suma_rango(10))`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `function sumaRango(n) {\n    return (n * (n + ___)) / 2;\n}\n\nconsole.log(sumaRango(10));`,
        solutionCode: `function sumaRango(n) {\n    return (n * (n + 1)) / 2;\n}\n\nconsole.log(sumaRango(10));`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static int sumaRango(int n) {\n        return (n * (n + ___)) / 2;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumaRango(10));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumaRango(int n) {\n        return (n * (n + 1)) / 2;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumaRango(10));\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 34,
    title: 'Contar Dígitos de un Entero',
    statement: 'Corrige la división sucesiva para contar cuántos dígitos tiene un número positivo.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'En cada iteración debes dividir n entre 10 para descartar el último dígito.',
    explanation: 'Dividir un entero sucesivamente por 10 reduce un dígito por paso hasta llegar a 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint contarDigitos(int n) {\n    if (n == 0) return 1;\n    int count = 0;\n    while (n > 0) {\n        count++;\n        // BUG: divide por 2 en vez de 10\n        n /= 2;\n    }\n    return count;\n}\n\nint main() {\n    std::cout << contarDigitos(12345) << std::endl; // Debe dar 5\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint contarDigitos(int n) {\n    if (n == 0) return 1;\n    int count = 0;\n    while (n > 0) {\n        count++;\n        n /= 10;\n    }\n    return count;\n}\n\nint main() {\n    std::cout << contarDigitos(12345) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def contar_digitos(n):\n    if n == 0:\n        return 1\n    count = 0\n    while n > 0:\n        count += 1\n        n //= 2 # BUG\n    return count\n\nprint(contar_digitos(12345))`,
        solutionCode: `def contar_digitos(n):\n    if n == 0:\n        return 1\n    count = 0\n    while n > 0:\n        count += 1\n        n //= 10\n    return count\n\nprint(contar_digitos(12345))`
      },
      javascript: {
        starterCode: `function contarDigitos(n) {\n    if (n === 0) return 1;\n    let count = 0;\n    while (n > 0) {\n        count++;\n        n = Math.floor(n / 2); // BUG\n    }\n    return count;\n}\n\nconsole.log(contarDigitos(12345));`,
        solutionCode: `function contarDigitos(n) {\n    if (n === 0) return 1;\n    let count = 0;\n    while (n > 0) {\n        count++;\n        n = Math.floor(n / 10);\n    }\n    return count;\n}\n\nconsole.log(contarDigitos(12345));`
      },
      java: {
        starterCode: `public class Main {\n    public static int contarDigitos(int n) {\n        if (n == 0) return 1;\n        int count = 0;\n        while (n > 0) {\n            count++;\n            n /= 2; // BUG\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarDigitos(12345));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int contarDigitos(int n) {\n        if (n == 0) return 1;\n        int count = 0;\n        while (n > 0) {\n            count++;\n            n /= 10;\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarDigitos(12345));\n    }\n}`
      }
    }
  },
  {
    id: 35,
    title: 'Es Número Primo',
    statement: 'Completa la condición para descartar divisores en el test de primalidad.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Si n % i == 0, el número tiene un divisor exacto y no es primo.',
    explanation: 'Un número primo solo es divisible por 1 y por sí mismo. Si algún i divide a n exactamente, retornamos false.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esPrimo(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i ___ 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    std::cout << std::boolalpha << esPrimo(17) << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esPrimo(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    std::cout << std::boolalpha << esPrimo(17) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['==', '===']
      },
      python: {
        starterCode: `def es_primo(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i ___ 0:\n            return False\n    return True\n\nprint(es_primo(17))`,
        solutionCode: `def es_primo(n):\n    if n <= 1:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(es_primo(17))`,
        acceptedKeywords: ['==']
      },
      javascript: {
        starterCode: `function esPrimo(n) {\n    if (n <= 1) return false;\n    for (let i = 2; i * i <= n; i++) {\n        if (n % i ___ 0) return false;\n    }\n    return true;\n}\n\nconsole.log(esPrimo(17));`,
        solutionCode: `function esPrimo(n) {\n    if (n <= 1) return false;\n    for (let i = 2; i * i <= n; i++) {\n        if (n % i === 0) return false;\n    }\n    return true;\n}\n\nconsole.log(esPrimo(17));`,
        acceptedKeywords: ['===', '==']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esPrimo(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i ___ 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPrimo(17));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esPrimo(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPrimo(17));\n    }\n}`,
        acceptedKeywords: ['==']
      }
    }
  },
  {
    id: 36,
    title: 'Invertir un Número Entero',
    statement: 'Completa la reconstrucción del número invertido multiplicando por 10 y sumando el dígito.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La fórmula es invertido * 10 + digito.',
    explanation: 'Desplazamos los dígitos a la izquierda multiplicando por 10 y anexamos el nuevo dígito extraído con módulo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint invertir(int n) {\n    int inv = 0;\n    while (n > 0) {\n        int dig = n % 10;\n        inv = inv * ___ + dig;\n        n /= 10;\n    }\n    return inv;\n}\n\nint main() {\n    std::cout << invertir(1234) << std::endl; // 4321\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint invertir(int n) {\n    int inv = 0;\n    while (n > 0) {\n        int dig = n % 10;\n        inv = inv * 10 + dig;\n        n /= 10;\n    }\n    return inv;\n}\n\nint main() {\n    std::cout << invertir(1234) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['10']
      },
      python: {
        starterCode: `def invertir(n):\n    inv = 0\n    while n > 0:\n        dig = n % 10\n        inv = inv * ___ + dig\n        n //= 10\n    return inv\n\nprint(invertir(1234))`,
        solutionCode: `def invertir(n):\n    inv = 0\n    while n > 0:\n        dig = n % 10\n        inv = inv * 10 + dig\n        n //= 10\n    return inv\n\nprint(invertir(1234))`,
        acceptedKeywords: ['10']
      },
      javascript: {
        starterCode: `function invertir(n) {\n    let inv = 0;\n    while (n > 0) {\n        let dig = n % 10;\n        inv = inv * ___ + dig;\n        n = Math.floor(n / 10);\n    }\n    return inv;\n}\n\nconsole.log(invertir(1234));`,
        solutionCode: `function invertir(n) {\n    let inv = 0;\n    while (n > 0) {\n        let dig = n % 10;\n        inv = inv * 10 + dig;\n        n = Math.floor(n / 10);\n    }\n    return inv;\n}\n\nconsole.log(invertir(1234));`,
        acceptedKeywords: ['10']
      },
      java: {
        starterCode: `public class Main {\n    public static int invertir(int n) {\n        int inv = 0;\n        while (n > 0) {\n            int dig = n % 10;\n            inv = inv * ___ + dig;\n            n /= 10;\n        }\n        return inv;\n    }\n    public static void main(String[] args) {\n        System.out.println(invertir(1234));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int invertir(int n) {\n        int inv = 0;\n        while (n > 0) {\n            int dig = n % 10;\n            inv = inv * 10 + dig;\n            n /= 10;\n        }\n        return inv;\n    }\n    public static void main(String[] args) {\n        System.out.println(invertir(1234));\n    }\n}`,
        acceptedKeywords: ['10']
      }
    }
  },
  {
    id: 37,
    title: 'Suma de Elementos en Array',
    statement: 'Corrige el acumulador para que sume todos los valores del arreglo.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Dentro del ciclo debes sumar el elemento actual (suma += arr[i]).',
    explanation: 'El acumulador debe sumar cada elemento iterado en el recorrido secuencial.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumarArray(int arr[], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        // BUG: sobreescribe en vez de acumular\n        suma = arr[i];\n    }\n    return suma;\n}\n\nint main() {\n    int numeros[] = {2, 4, 6, 8};\n    std::cout << sumarArray(numeros, 4) << std::endl; // Debe dar 20\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumarArray(int arr[], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        suma += arr[i];\n    }\n    return suma;\n}\n\nint main() {\n    int numeros[] = {2, 4, 6, 8};\n    std::cout << sumarArray(numeros, 4) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def sumar_array(arr):\n    suma = 0\n    for x in arr:\n        suma = x # BUG\n    return suma\n\nprint(sumar_array([2, 4, 6, 8]))`,
        solutionCode: `def sumar_array(arr):\n    suma = 0\n    for x in arr:\n        suma += x\n    return suma\n\nprint(sumar_array([2, 4, 6, 8]))`
      },
      javascript: {
        starterCode: `function sumarArray(arr) {\n    let suma = 0;\n    for (let i = 0; i < arr.length; i++) {\n        suma = arr[i]; // BUG\n    }\n    return suma;\n}\n\nconsole.log(sumarArray([2, 4, 6, 8]));`,
        solutionCode: `function sumarArray(arr) {\n    let suma = 0;\n    for (let i = 0; i < arr.length; i++) {\n        suma += arr[i];\n    }\n    return suma;\n}\n\nconsole.log(sumarArray([2, 4, 6, 8]));`
      },
      java: {
        starterCode: `public class Main {\n    public static int sumarArray(int[] arr) {\n        int suma = 0;\n        for (int i = 0; i < arr.length; i++) {\n            suma = arr[i]; // BUG\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumarArray(new int[]{2, 4, 6, 8}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumarArray(int[] arr) {\n        int suma = 0;\n        for (int i = 0; i < arr.length; i++) {\n            suma += arr[i];\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumarArray(new int[]{2, 4, 6, 8}));\n    }\n}`
      }
    }
  },
  {
    id: 38,
    title: 'Encontrar el Máximo en un Arreglo',
    statement: 'Completa la actualización del valor máximo si el elemento actual es mayor.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Si arr[i] > max, actualizamos max = arr[i].',
    explanation: 'Inicializamos max con el primer valor y lo actualizamos cada vez que encontramos uno superior.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint maximoArray(int arr[], int n) {\n    int maxVal = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > maxVal) {\n            maxVal = ___;\n        }\n    }\n    return maxVal;\n}\n\nint main() {\n    int datos[] = {12, 45, 7, 89, 23};\n    std::cout << maximoArray(datos, 5) << std::endl; // 89\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint maximoArray(int arr[], int n) {\n    int maxVal = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] > maxVal) {\n            maxVal = arr[i];\n        }\n    }\n    return maxVal;\n}\n\nint main() {\n    int datos[] = {12, 45, 7, 89, 23};\n    std::cout << maximoArray(datos, 5) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['arr[i]']
      },
      python: {
        starterCode: `def maximo_array(arr):\n    max_val = arr[0]\n    for x in arr[1:]:\n        if x > max_val:\n            max_val = ___\n    return max_val\n\nprint(maximo_array([12, 45, 7, 89, 23]))`,
        solutionCode: `def maximo_array(arr):\n    max_val = arr[0]\n    for x in arr[1:]:\n        if x > max_val:\n            max_val = x\n    return max_val\n\nprint(maximo_array([12, 45, 7, 89, 23]))`,
        acceptedKeywords: ['x']
      },
      javascript: {
        starterCode: `function maximoArray(arr) {\n    let maxVal = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] > maxVal) {\n            maxVal = ___;\n        }\n    }\n    return maxVal;\n}\n\nconsole.log(maximoArray([12, 45, 7, 89, 23]));`,
        solutionCode: `function maximoArray(arr) {\n    let maxVal = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] > maxVal) {\n            maxVal = arr[i];\n        }\n    }\n    return maxVal;\n}\n\nconsole.log(maximoArray([12, 45, 7, 89, 23]));`,
        acceptedKeywords: ['arr[i]']
      },
      java: {
        starterCode: `public class Main {\n    public static int maximoArray(int[] arr) {\n        int maxVal = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > maxVal) {\n                maxVal = ___;\n            }\n        }\n        return maxVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(maximoArray(new int[]{12, 45, 7, 89, 23}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int maximoArray(int[] arr) {\n        int maxVal = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > maxVal) {\n                maxVal = arr[i];\n            }\n        }\n        return maxVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(maximoArray(new int[]{12, 45, 7, 89, 23}));\n    }\n}`,
        acceptedKeywords: ['arr[i]']
      }
    }
  },
  {
    id: 39,
    title: 'Calcular Promedio de Arreglo',
    statement: 'Corrige la división para retornar la media aritmética (suma / total).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'El promedio es la sumatoria de elementos dividida entre el número de elementos.',
    explanation: 'Promedio = sum(elementos) / count(elementos).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble promedio(int arr[], int n) {\n    double suma = 0;\n    for (int i = 0; i < n; i++) suma += arr[i];\n    // BUG: divide por 2 en vez de n\n    return suma / 2.0;\n}\n\nint main() {\n    int notas[] = {80, 90, 100};\n    std::cout << promedio(notas, 3) << std::endl; // Debe dar 90\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble promedio(int arr[], int n) {\n    double suma = 0;\n    for (int i = 0; i < n; i++) suma += arr[i];\n    return suma / (double)n;\n}\n\nint main() {\n    int notas[] = {80, 90, 100};\n    std::cout << promedio(notas, 3) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def promedio(arr):\n    return sum(arr) / 2 # BUG\n\nprint(promedio([80, 90, 100]))`,
        solutionCode: `def promedio(arr):\n    return sum(arr) / len(arr)\n\nprint(promedio([80, 90, 100]))`
      },
      javascript: {
        starterCode: `function promedio(arr) {\n    let suma = arr.reduce((a, b) => a + b, 0);\n    return suma / 2; // BUG\n}\n\nconsole.log(promedio([80, 90, 100]));`,
        solutionCode: `function promedio(arr) {\n    let suma = arr.reduce((a, b) => a + b, 0);\n    return suma / arr.length;\n}\n\nconsole.log(promedio([80, 90, 100]));`
      },
      java: {
        starterCode: `public class Main {\n    public static double promedio(int[] arr) {\n        double suma = 0;\n        for (int x : arr) suma += x;\n        return suma / 2.0; // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(promedio(new int[]{80, 90, 100}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double promedio(int[] arr) {\n        double suma = 0;\n        for (int x : arr) suma += x;\n        return suma / arr.length;\n    }\n    public static void main(String[] args) {\n        System.out.println(promedio(new int[]{80, 90, 100}));\n    }\n}`
      }
    }
  },
  {
    id: 40,
    title: 'Contar Números Pares en Arreglo',
    statement: 'Completa la condición para incrementar el contador si el elemento es par.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa arr[i] % 2 == 0.',
    explanation: 'Al recorrer el array comprobamos el residuo % 2 de cada número.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint contarPares(int arr[], int n) {\n    int cuenta = 0;\n    for (int i = 0; i < n; i++) {\n        if (arr[i] % ___ == 0) cuenta++;\n    }\n    return cuenta;\n}\n\nint main() {\n    int nums[] = {1, 2, 3, 4, 5, 6};\n    std::cout << contarPares(nums, 6) << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint contarPares(int arr[], int n) {\n    int cuenta = 0;\n    for (int i = 0; i < n; i++) {\n        if (arr[i] % 2 == 0) cuenta++;\n    }\n    return cuenta;\n}\n\nint main() {\n    int nums[] = {1, 2, 3, 4, 5, 6};\n    std::cout << contarPares(nums, 6) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['2']
      },
      python: {
        starterCode: `def contar_pares(arr):\n    cuenta = 0\n    for x in arr:\n        if x % ___ == 0:\n            cuenta += 1\n    return cuenta\n\nprint(contar_pares([1, 2, 3, 4, 5, 6]))`,
        solutionCode: `def contar_pares(arr):\n    cuenta = 0\n    for x in arr:\n        if x % 2 == 0:\n            cuenta += 1\n    return cuenta\n\nprint(contar_pares([1, 2, 3, 4, 5, 6]))`,
        acceptedKeywords: ['2']
      },
      javascript: {
        starterCode: `function contarPares(arr) {\n    let cuenta = 0;\n    for (let x of arr) {\n        if (x % ___ === 0) cuenta++;\n    }\n    return cuenta;\n}\n\nconsole.log(contarPares([1, 2, 3, 4, 5, 6]));`,
        solutionCode: `function contarPares(arr) {\n    let cuenta = 0;\n    for (let x of arr) {\n        if (x % 2 === 0) cuenta++;\n    }\n    return cuenta;\n}\n\nconsole.log(contarPares([1, 2, 3, 4, 5, 6]));`,
        acceptedKeywords: ['2']
      },
      java: {
        starterCode: `public class Main {\n    public static int contarPares(int[] arr) {\n        int cuenta = 0;\n        for (int x : arr) {\n            if (x % ___ == 0) cuenta++;\n        }\n        return cuenta;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarPares(new int[]{1, 2, 3, 4, 5, 6}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int contarPares(int[] arr) {\n        int cuenta = 0;\n        for (int x : arr) {\n            if (x % 2 == 0) cuenta++;\n        }\n        return cuenta;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarPares(new int[]{1, 2, 3, 4, 5, 6}));\n    }\n}`,
        acceptedKeywords: ['2']
      }
    }
  },
  {
    id: 41,
    title: 'Buscar Índice de Elemento (Búsqueda Lineal)',
    statement: 'Corrige el retorno por defecto cuando el elemento no se encuentra en el arreglo.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'La convención estándar es retornar -1 si el valor no existe en el arreglo.',
    explanation: 'Si el bucle termina sin encontrar coincidencias, devolvemos -1 como señal de ausencia.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint buscarIndice(int arr[], int n, int objetivo) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == objetivo) return i;\n    }\n    // BUG: retorna 0 indicando erróneamente el primer elemento\n    return 0;\n}\n\nint main() {\n    int nums[] = {10, 20, 30, 40};\n    std::cout << buscarIndice(nums, 4, 99) << std::endl; // Debe dar -1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint buscarIndice(int arr[], int n, int objetivo) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == objetivo) return i;\n    }\n    return -1;\n}\n\nint main() {\n    int nums[] = {10, 20, 30, 40};\n    std::cout << buscarIndice(nums, 4, 99) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def buscar_indice(arr, objetivo):\n    for i in range(len(arr)):\n        if arr[i] == objetivo:\n            return i\n    return 0 # BUG\n\nprint(buscar_indice([10, 20, 30, 40], 99))`,
        solutionCode: `def buscar_indice(arr, objetivo):\n    for i in range(len(arr)):\n        if arr[i] == objetivo:\n            return i\n    return -1\n\nprint(buscar_indice([10, 20, 30, 40], 99))`
      },
      javascript: {
        starterCode: `function buscarIndice(arr, objetivo) {\n    for (let i = 0; i < arr.length; i++) {\n        if (arr[i] === objetivo) return i;\n    }\n    return 0; // BUG\n}\n\nconsole.log(buscarIndice([10, 20, 30, 40], 99));`,
        solutionCode: `function buscarIndice(arr, objetivo) {\n    for (let i = 0; i < arr.length; i++) {\n        if (arr[i] === objetivo) return i;\n    }\n    return -1;\n}\n\nconsole.log(buscarIndice([10, 20, 30, 40], 99));`
      },
      java: {
        starterCode: `public class Main {\n    public static int buscarIndice(int[] arr, int objetivo) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == objetivo) return i;\n        }\n        return 0; // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(buscarIndice(new int[]{10, 20, 30, 40}, 99));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int buscarIndice(int[] arr, int objetivo) {\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == objetivo) return i;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(buscarIndice(new int[]{10, 20, 30, 40}, 99));\n    }\n}`
      }
    }
  },
  {
    id: 42,
    title: 'Calcular Índice de Masa Corporal (IMC)',
    statement: 'Completa la fórmula del IMC: peso / (altura * altura).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Divide el peso entre la altura al cuadrado.',
    explanation: 'El IMC estándar se calcula como masa / (estatura en metros al cuadrado).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble calcularIMC(double peso, double altura) {\n    return peso / (altura * ___);\n}\n\nint main() {\n    std::cout << calcularIMC(70.0, 1.75) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble calcularIMC(double peso, double altura) {\n    return peso / (altura * altura);\n}\n\nint main() {\n    std::cout << calcularIMC(70.0, 1.75) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['altura']
      },
      python: {
        starterCode: `def calcular_imc(peso, altura):\n    return peso / (altura * ___)\n\nprint(calcular_imc(70.0, 1.75))`,
        solutionCode: `def calcular_imc(peso, altura):\n    return peso / (altura * altura)\n\nprint(calcular_imc(70.0, 1.75))`,
        acceptedKeywords: ['altura']
      },
      javascript: {
        starterCode: `function calcularIMC(peso, altura) {\n    return peso / (altura * ___);\n}\n\nconsole.log(calcularIMC(70.0, 1.75));`,
        solutionCode: `function calcularIMC(peso, altura) {\n    return peso / (altura * altura);\n}\n\nconsole.log(calcularIMC(70.0, 1.75));`,
        acceptedKeywords: ['altura']
      },
      java: {
        starterCode: `public class Main {\n    public static double calcularIMC(double peso, double altura) {\n        return peso / (altura * ___);\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularIMC(70.0, 1.75));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double calcularIMC(double peso, double altura) {\n        return peso / (altura * altura);\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularIMC(70.0, 1.75));\n    }\n}`,
        acceptedKeywords: ['altura']
      }
    }
  },
  {
    id: 43,
    title: 'Suma de Dígitos de un Número',
    statement: 'Corrige la acumulación sumando el dígito extraído con n % 10.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Debes sumar n % 10 al acumulador en cada paso.',
    explanation: 'El residuo n % 10 extrae el dígito de las unidades para sumarlo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumarDigitos(int n) {\n    int suma = 0;\n    while (n > 0) {\n        // BUG: suma n completo en vez de n % 10\n        suma += n;\n        n /= 10;\n    }\n    return suma;\n}\n\nint main() {\n    std::cout << sumarDigitos(123) << std::endl; // 1 + 2 + 3 = 6\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumarDigitos(int n) {\n    int suma = 0;\n    while (n > 0) {\n        suma += n % 10;\n        n /= 10;\n    }\n    return suma;\n}\n\nint main() {\n    std::cout << sumarDigitos(123) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def sumar_digitos(n):\n    suma = 0\n    while n > 0:\n        suma += n # BUG\n        n //= 10\n    return suma\n\nprint(sumar_digitos(123))`,
        solutionCode: `def sumar_digitos(n):\n    suma = 0\n    while n > 0:\n        suma += n % 10\n        n //= 10\n    return suma\n\nprint(sumar_digitos(123))`
      },
      javascript: {
        starterCode: `function sumarDigitos(n) {\n    let suma = 0;\n    while (n > 0) {\n        suma += n; // BUG\n        n = Math.floor(n / 10);\n    }\n    return suma;\n}\n\nconsole.log(sumarDigitos(123));`,
        solutionCode: `function sumarDigitos(n) {\n    let suma = 0;\n    while (n > 0) {\n        suma += n % 10;\n        n = Math.floor(n / 10);\n    }\n    return suma;\n}\n\nconsole.log(sumarDigitos(123));`
      },
      java: {
        starterCode: `public class Main {\n    public static int sumarDigitos(int n) {\n        int suma = 0;\n        while (n > 0) {\n            suma += n; // BUG\n            n /= 10;\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumarDigitos(123));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumarDigitos(int n) {\n        int suma = 0;\n        while (n > 0) {\n            suma += n % 10;\n            n /= 10;\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumarDigitos(123));\n    }\n}`
      }
    }
  },
  {
    id: 44,
    title: 'Es Triángulo Válido',
    statement: 'Completa la validación del teorema de desigualdad triangular.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La suma de dos lados siempre debe ser estrictamente mayor al tercero: a + b > c && a + c > b && b + c > a.',
    explanation: 'En cualquier triángulo no degenerado, la suma de las longitudes de dos lados supera a la del tercero.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esTrianguloValido(double a, double b, double c) {\n    return (a + b > c) && (a + c > b) && (b + c ___ a);\n}\n\nint main() {\n    std::cout << std::boolalpha << esTrianguloValido(3, 4, 5) << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esTrianguloValido(double a, double b, double c) {\n    return (a + b > c) && (a + c > b) && (b + c > a);\n}\n\nint main() {\n    std::cout << std::boolalpha << esTrianguloValido(3, 4, 5) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['>']
      },
      python: {
        starterCode: `def es_triangulo_valido(a, b, c):\n    return (a + b > c) and (a + c > b) and (b + c ___ a)\n\nprint(es_triangulo_valido(3, 4, 5))`,
        solutionCode: `def es_triangulo_valido(a, b, c):\n    return (a + b > c) and (a + c > b) and (b + c > a)\n\nprint(es_triangulo_valido(3, 4, 5))`,
        acceptedKeywords: ['>']
      },
      javascript: {
        starterCode: `function esTrianguloValido(a, b, c) {\n    return (a + b > c) && (a + c > b) && (b + c ___ a);\n}\n\nconsole.log(esTrianguloValido(3, 4, 5));`,
        solutionCode: `function esTrianguloValido(a, b, c) {\n    return (a + b > c) && (a + c > b) && (b + c > a);\n}\n\nconsole.log(esTrianguloValido(3, 4, 5));`,
        acceptedKeywords: ['>']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esTrianguloValido(double a, double b, double c) {\n        return (a + b > c) && (a + c > b) && (b + c ___ a);\n    }\n    public static void main(String[] args) {\n        System.out.println(esTrianguloValido(3, 4, 5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esTrianguloValido(double a, double b, double c) {\n        return (a + b > c) && (a + c > b) && (b + c > a);\n    }\n    public static void main(String[] args) {\n        System.out.println(esTrianguloValido(3, 4, 5));\n    }\n}`,
        acceptedKeywords: ['>']
      }
    }
  },
  {
    id: 45,
    title: 'Calcular Potencia con Bucle',
    statement: 'Corrige la inicialización del acumulador para calcular base elevado al exponente.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'El neutro multiplicativo es 1 (no 0).',
    explanation: 'Cualquier número multiplicado por 0 da 0. El acumulador de producto debe comenzar en 1.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nlong long potencia(int base, int exp) {\n    // BUG: Inicializado en 0\n    long long res = 0;\n    for (int i = 0; i < exp; i++) res *= base;\n    return res;\n}\n\nint main() {\n    std::cout << potencia(2, 5) << std::endl; // Debe dar 32\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nlong long potencia(int base, int exp) {\n    long long res = 1;\n    for (int i = 0; i < exp; i++) res *= base;\n    return res;\n}\n\nint main() {\n    std::cout << potencia(2, 5) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def potencia(base, exp):\n    res = 0 # BUG\n    for _ in range(exp):\n        res *= base\n    return res\n\nprint(potencia(2, 5))`,
        solutionCode: `def potencia(base, exp):\n    res = 1\n    for _ in range(exp):\n        res *= base\n    return res\n\nprint(potencia(2, 5))`
      },
      javascript: {
        starterCode: `function potencia(base, exp) {\n    let res = 0; // BUG\n    for (let i = 0; i < exp; i++) res *= base;\n    return res;\n}\n\nconsole.log(potencia(2, 5));`,
        solutionCode: `function potencia(base, exp) {\n    let res = 1;\n    for (let i = 0; i < exp; i++) res *= base;\n    return res;\n}\n\nconsole.log(potencia(2, 5));`
      },
      java: {
        starterCode: `public class Main {\n    public static long potencia(int base, int exp) {\n        long res = 0; // BUG\n        for (int i = 0; i < exp; i++) res *= base;\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(potencia(2, 5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static long potencia(int base, int exp) {\n        long res = 1;\n        for (int i = 0; i < exp; i++) res *= base;\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(potencia(2, 5));\n    }\n}`
      }
    }
  },
  {
    id: 46,
    title: 'Obtener Último Dígito',
    statement: 'Completa la función para obtener el dígito de las unidades de n.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa el operador módulo % 10.',
    explanation: 'El residuo de dividir por 10 es exactamente el último dígito.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint ultimoDigito(int n) {\n    return n % ___;\n}\n\nint main() {\n    std::cout << ultimoDigito(847) << std::endl; // 7\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint ultimoDigito(int n) {\n    return n % 10;\n}\n\nint main() {\n    std::cout << ultimoDigito(847) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['10']
      },
      python: {
        starterCode: `def ultimo_digito(n):\n    return n % ___\n\nprint(ultimo_digito(847))`,
        solutionCode: `def ultimo_digito(n):\n    return n % 10\n\nprint(ultimo_digito(847))`,
        acceptedKeywords: ['10']
      },
      javascript: {
        starterCode: `function ultimoDigito(n) {\n    return n % ___;\n}\n\nconsole.log(ultimoDigito(847));`,
        solutionCode: `function ultimoDigito(n) {\n    return n % 10;\n}\n\nconsole.log(ultimoDigito(847));`,
        acceptedKeywords: ['10']
      },
      java: {
        starterCode: `public class Main {\n    public static int ultimoDigito(int n) {\n        return n % ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(ultimoDigito(847));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int ultimoDigito(int n) {\n        return n % 10;\n    }\n    public static void main(String[] args) {\n        System.out.println(ultimoDigito(847));\n    }\n}`,
        acceptedKeywords: ['10']
      }
    }
  },
  {
    id: 47,
    title: 'Es Múltiplo de 3 y de 5 (FizzBuzz Base)',
    statement: 'Corrige la condición lógica usando AND (&&) para exigir ambos múltiplos.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Debe ser múltiplo de 3 Y de 5 simultáneamente (&& en vez de ||).',
    explanation: 'Para pertenecer a la intersección de múltiplos se requiere el operador lógico de conjunción &&.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esMultiploDeTresYCinco(int n) {\n    // BUG: Usa OR en vez de AND\n    return n % 3 == 0 || n % 5 == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esMultiploDeTresYCinco(15) << std::endl; // true\n    std::cout << std::boolalpha << esMultiploDeTresYCinco(9) << std::endl;  // false\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esMultiploDeTresYCinco(int n) {\n    return n % 3 == 0 && n % 5 == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << esMultiploDeTresYCinco(15) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_multiplo_de_tres_y_cinco(n):\n    return n % 3 == 0 or n % 5 == 0 # BUG\n\nprint(es_multiplo_de_tres_y_cinco(15))`,
        solutionCode: `def es_multiplo_de_tres_y_cinco(n):\n    return n % 3 == 0 and n % 5 == 0\n\nprint(es_multiplo_de_tres_y_cinco(15))`
      },
      javascript: {
        starterCode: `function esMultiploDeTresYCinco(n) {\n    return n % 3 === 0 || n % 5 === 0; // BUG\n}\n\nconsole.log(esMultiploDeTresYCinco(15));`,
        solutionCode: `function esMultiploDeTresYCinco(n) {\n    return n % 3 === 0 && n % 5 === 0;\n}\n\nconsole.log(esMultiploDeTresYCinco(15));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esMultiploDeTresYCinco(int n) {\n        return n % 3 == 0 || n % 5 == 0; // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(esMultiploDeTresYCinco(15));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esMultiploDeTresYCinco(int n) {\n        return n % 3 == 0 && n % 5 == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esMultiploDeTresYCinco(15));\n    }\n}`
      }
    }
  },
  {
    id: 48,
    title: 'Calcular Hipotenusa',
    statement: 'Completa la fórmula del teorema de Pitágoras: a*a + b*b.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Suma los cuadrados de los dos catetos.',
    explanation: 'El cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos (c^2 = a^2 + b^2).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <cmath>\n\ndouble hipotenusa(double a, double b) {\n    return std::sqrt(a * a + ___);\n}\n\nint main() {\n    std::cout << hipotenusa(3.0, 4.0) << std::endl; // 5.0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <cmath>\n\ndouble hipotenusa(double a, double b) {\n    return std::sqrt(a * a + b * b);\n}\n\nint main() {\n    std::cout << hipotenusa(3.0, 4.0) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['b * b', 'b*b']
      },
      python: {
        starterCode: `import math\n\ndef hipotenusa(a, b):\n    return math.sqrt(a * a + ___)\n\nprint(hipotenusa(3.0, 4.0))`,
        solutionCode: `import math\n\ndef hipotenusa(a, b):\n    return math.sqrt(a * a + b * b)\n\nprint(hipotenusa(3.0, 4.0))`,
        acceptedKeywords: ['b * b', 'b*b', 'b**2']
      },
      javascript: {
        starterCode: `function hipotenusa(a, b) {\n    return Math.sqrt(a * a + ___);\n}\n\nconsole.log(hipotenusa(3.0, 4.0));`,
        solutionCode: `function hipotenusa(a, b) {\n    return Math.sqrt(a * a + b * b);\n}\n\nconsole.log(hipotenusa(3.0, 4.0));`,
        acceptedKeywords: ['b * b', 'b*b', 'b**2']
      },
      java: {
        starterCode: `public class Main {\n    public static double hipotenusa(double a, double b) {\n        return Math.sqrt(a * a + ___);\n    }\n    public static void main(String[] args) {\n        System.out.println(hipotenusa(3.0, 4.0));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double hipotenusa(double a, double b) {\n        return Math.sqrt(a * a + b * b);\n    }\n    public static void main(String[] args) {\n        System.out.println(hipotenusa(3.0, 4.0));\n    }\n}`,
        acceptedKeywords: ['b * b', 'b*b']
      }
    }
  },
  {
    id: 49,
    title: 'Validar Longitud de Contraseña',
    statement: 'Corrige la condición para exigir una longitud mínima de 8 caracteres.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'La longitud debe ser mayor o igual a 8 (>= 8).',
    explanation: 'El criterio de seguridad requiere al menos 8 caracteres.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nbool claveSegura(std::string clave) {\n    // BUG: Exige solo 4 caracteres\n    return clave.length() >= 4;\n}\n\nint main() {\n    std::cout << std::boolalpha << claveSegura("pass123") << std::endl; // false\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nbool claveSegura(std::string clave) {\n    return clave.length() >= 8;\n}\n\nint main() {\n    std::cout << std::boolalpha << claveSegura("pass123") << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def clave_segura(clave):\n    return len(clave) >= 4 # BUG\n\nprint(clave_segura("pass123"))`,
        solutionCode: `def clave_segura(clave):\n    return len(clave) >= 8\n\nprint(clave_segura("pass123"))`
      },
      javascript: {
        starterCode: `function claveSegura(clave) {\n    return clave.length >= 4; // BUG\n}\n\nconsole.log(claveSegura("pass123"));`,
        solutionCode: `function claveSegura(clave) {\n    return clave.length >= 8;\n}\n\nconsole.log(claveSegura("pass123"));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean claveSegura(String clave) {\n        return clave.length() >= 4; // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(claveSegura("pass123"));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean claveSegura(String clave) {\n        return clave.length() >= 8;\n    }\n    public static void main(String[] args) {\n        System.out.println(claveSegura("pass123"));\n    }\n}`
      }
    }
  },
  {
    id: 50,
    title: 'Calcular Tarifa de Estacionamiento',
    statement: 'Completa la tarifa: base de 10 más 5 por cada hora adicional a la primera: 10 + (horas - 1) * 5.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La primera hora ya está incluida en los 10 de base, multiplicamos las adicionales (horas - 1) por 5.',
    explanation: 'Si horas = 3, paga 10 + (2 * 5) = 20.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint tarifaEstacionamiento(int horas) {\n    if (horas <= 1) return 10;\n    return 10 + (horas - 1) * ___;\n}\n\nint main() {\n    std::cout << tarifaEstacionamiento(3) << std::endl; // 20\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint tarifaEstacionamiento(int horas) {\n    if (horas <= 1) return 10;\n    return 10 + (horas - 1) * 5;\n}\n\nint main() {\n    std::cout << tarifaEstacionamiento(3) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['5']
      },
      python: {
        starterCode: `def tarifa_estacionamiento(horas):\n    if horas <= 1:\n        return 10\n    return 10 + (horas - 1) * ___\n\nprint(tarifa_estacionamiento(3))`,
        solutionCode: `def tarifa_estacionamiento(horas):\n    if horas <= 1:\n        return 10\n    return 10 + (horas - 1) * 5\n\nprint(tarifa_estacionamiento(3))`,
        acceptedKeywords: ['5']
      },
      javascript: {
        starterCode: `function tarifaEstacionamiento(horas) {\n    if (horas <= 1) return 10;\n    return 10 + (horas - 1) * ___;\n}\n\nconsole.log(tarifaEstacionamiento(3));`,
        solutionCode: `function tarifaEstacionamiento(horas) {\n    if (horas <= 1) return 10;\n    return 10 + (horas - 1) * 5;\n}\n\nconsole.log(tarifaEstacionamiento(3));`,
        acceptedKeywords: ['5']
      },
      java: {
        starterCode: `public class Main {\n    public static int tarifaEstacionamiento(int horas) {\n        if (horas <= 1) return 10;\n        return 10 + (horas - 1) * ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(tarifaEstacionamiento(3));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int tarifaEstacionamiento(int horas) {\n        if (horas <= 1) return 10;\n        return 10 + (horas - 1) * 5;\n    }\n    public static void main(String[] args) {\n        System.out.println(tarifaEstacionamiento(3));\n    }\n}`,
        acceptedKeywords: ['5']
      }
    }
  },
  {
    id: 51,
    title: 'Filtrar Números Mayores a Cero',
    statement: 'Corrige la condición del filtro para contar únicamente los valores estrictamente positivos.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Debe ser x > 0 (no x >= 0).',
    explanation: 'El cero no es positivo y debe ser excluido del conteo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint contarPositivos(int arr[], int n) {\n    int c = 0;\n    for (int i = 0; i < n; i++) {\n        // BUG: cuenta el cero\n        if (arr[i] >= 0) c++;\n    }\n    return c;\n}\n\nint main() {\n    int datos[] = {-3, 0, 5, 12, -1};\n    std::cout << contarPositivos(datos, 5) << std::endl; // Debe dar 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint contarPositivos(int arr[], int n) {\n    int c = 0;\n    for (int i = 0; i < n; i++) {\n        if (arr[i] > 0) c++;\n    }\n    return c;\n}\n\nint main() {\n    int datos[] = {-3, 0, 5, 12, -1};\n    std::cout << contarPositivos(datos, 5) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def contar_positivos(arr):\n    c = 0\n    for x in arr:\n        if x >= 0: # BUG\n            c += 1\n    return c\n\nprint(contar_positivos([-3, 0, 5, 12, -1]))`,
        solutionCode: `def contar_positivos(arr):\n    c = 0\n    for x in arr:\n        if x > 0:\n            c += 1\n    return c\n\nprint(contar_positivos([-3, 0, 5, 12, -1]))`
      },
      javascript: {
        starterCode: `function contarPositivos(arr) {\n    return arr.filter(x => x >= 0).length; // BUG\n}\n\nconsole.log(contarPositivos([-3, 0, 5, 12, -1]));`,
        solutionCode: `function contarPositivos(arr) {\n    return arr.filter(x => x > 0).length;\n}\n\nconsole.log(contarPositivos([-3, 0, 5, 12, -1]));`
      },
      java: {
        starterCode: `public class Main {\n    public static int contarPositivos(int[] arr) {\n        int c = 0;\n        for (int x : arr) {\n            if (x >= 0) c++; // BUG\n        }\n        return c;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarPositivos(new int[]{-3, 0, 5, 12, -1}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int contarPositivos(int[] arr) {\n        int c = 0;\n        for (int x : arr) {\n            if (x > 0) c++;\n        }\n        return c;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarPositivos(new int[]{-3, 0, 5, 12, -1}));\n    }\n}`
      }
    }
  },
  {
    id: 52,
    title: 'Rango de un Arreglo (Max - Min)',
    statement: 'Completa la resta entre el valor máximo y el mínimo para calcular el rango.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Resta maxVal - minVal.',
    explanation: 'El rango estadístico se define como la diferencia entre el valor más alto y el más bajo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint rangoArray(int maxVal, int minVal) {\n    return maxVal - ___;\n}\n\nint main() {\n    std::cout << rangoArray(95, 20) << std::endl; // 75\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint rangoArray(int maxVal, int minVal) {\n    return maxVal - minVal;\n}\n\nint main() {\n    std::cout << rangoArray(95, 20) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['minVal']
      },
      python: {
        starterCode: `def rango_array(max_val, min_val):\n    return max_val - ___\n\nprint(rango_array(95, 20))`,
        solutionCode: `def rango_array(max_val, min_val):\n    return max_val - min_val\n\nprint(rango_array(95, 20))`,
        acceptedKeywords: ['min_val']
      },
      javascript: {
        starterCode: `function rangoArray(maxVal, minVal) {\n    return maxVal - ___;\n}\n\nconsole.log(rangoArray(95, 20));`,
        solutionCode: `function rangoArray(maxVal, minVal) {\n    return maxVal - minVal;\n}\n\nconsole.log(rangoArray(95, 20));`,
        acceptedKeywords: ['minVal']
      },
      java: {
        starterCode: `public class Main {\n    public static int rangoArray(int maxVal, int minVal) {\n        return maxVal - ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(rangoArray(95, 20));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int rangoArray(int maxVal, int minVal) {\n        return maxVal - minVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(rangoArray(95, 20));\n    }\n}`,
        acceptedKeywords: ['minVal']
      }
    }
  },
  {
    id: 53,
    title: 'Verificar si Todos son Positivos',
    statement: 'Corrige la condición de retorno temprano: si encuentra un valor menor o igual a 0, retorna false.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Al primer elemento <= 0 debemos retornar false.',
    explanation: 'Si un solo elemento no cumple la condición de ser positivo, la propiedad universal es falsa.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool todosPositivos(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        // BUG: Retorna true al primer positivo en vez de evaluar todos\n        if (arr[i] > 0) return true;\n    }\n    return false;\n}\n\nint main() {\n    int datos[] = {5, 8, -2, 10};\n    std::cout << std::boolalpha << todosPositivos(datos, 4) << std::endl; // Debe dar false\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool todosPositivos(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] <= 0) return false;\n    }\n    return true;\n}\n\nint main() {\n    int datos[] = {5, 8, -2, 10};\n    std::cout << std::boolalpha << todosPositivos(datos, 4) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def todos_positivos(arr):\n    for x in arr:\n        if x > 0: # BUG\n            return True\n    return False\n\nprint(todos_positivos([5, 8, -2, 10]))`,
        solutionCode: `def todos_positivos(arr):\n    for x in arr:\n        if x <= 0:\n            return False\n    return True\n\nprint(todos_positivos([5, 8, -2, 10]))`
      },
      javascript: {
        starterCode: `function todosPositivos(arr) {\n    for (let x of arr) {\n        if (x > 0) return true; // BUG\n    }\n    return false;\n}\n\nconsole.log(todosPositivos([5, 8, -2, 10]));`,
        solutionCode: `function todosPositivos(arr) {\n    for (let x of arr) {\n        if (x <= 0) return false;\n    }\n    return true;\n}\n\nconsole.log(todosPositivos([5, 8, -2, 10]));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean todosPositivos(int[] arr) {\n        for (int x : arr) {\n            if (x > 0) return true; // BUG\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(todosPositivos(new int[]{5, 8, -2, 10}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean todosPositivos(int[] arr) {\n        for (int x : arr) {\n            if (x <= 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(todosPositivos(new int[]{5, 8, -2, 10}));\n    }\n}`
      }
    }
  },
  {
    id: 54,
    title: 'Multiplicación Mediante Sumas Sucesivas',
    statement: 'Completa la acumulación dentro del bucle for.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Suma el valor de a en cada una de las b iteraciones (acum += a).',
    explanation: 'Multiplicar a * b equivale a sumar b veces la cantidad a.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint multiplicarSumando(int a, int b) {\n    int acum = 0;\n    for (int i = 0; i < b; i++) {\n        acum += ___;\n    }\n    return acum;\n}\n\nint main() {\n    std::cout << multiplicarSumando(6, 4) << std::endl; // 24\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint multiplicarSumando(int a, int b) {\n    int acum = 0;\n    for (int i = 0; i < b; i++) {\n        acum += a;\n    }\n    return acum;\n}\n\nint main() {\n    std::cout << multiplicarSumando(6, 4) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['a']
      },
      python: {
        starterCode: `def multiplicar_sumando(a, b):\n    acum = 0\n    for _ in range(b):\n        acum += ___\n    return acum\n\nprint(multiplicar_sumando(6, 4))`,
        solutionCode: `def multiplicar_sumando(a, b):\n    acum = 0\n    for _ in range(b):\n        acum += a\n    return acum\n\nprint(multiplicar_sumando(6, 4))`,
        acceptedKeywords: ['a']
      },
      javascript: {
        starterCode: `function multiplicarSumando(a, b) {\n    let acum = 0;\n    for (let i = 0; i < b; i++) {\n        acum += ___;\n    }\n    return acum;\n}\n\nconsole.log(multiplicarSumando(6, 4));`,
        solutionCode: `function multiplicarSumando(a, b) {\n    let acum = 0;\n    for (let i = 0; i < b; i++) {\n        acum += a;\n    }\n    return acum;\n}\n\nconsole.log(multiplicarSumando(6, 4));`,
        acceptedKeywords: ['a']
      },
      java: {
        starterCode: `public class Main {\n    public static int multiplicarSumando(int a, int b) {\n        int acum = 0;\n        for (int i = 0; i < b; i++) {\n            acum += ___;\n        }\n        return acum;\n    }\n    public static void main(String[] args) {\n        System.out.println(multiplicarSumando(6, 4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int multiplicarSumando(int a, int b) {\n        int acum = 0;\n        for (int i = 0; i < b; i++) {\n            acum += a;\n        }\n        return acum;\n    }\n    public static void main(String[] args) {\n        System.out.println(multiplicarSumando(6, 4));\n    }\n}`,
        acceptedKeywords: ['a']
      }
    }
  },
  {
    id: 55,
    title: 'Es Número Capicúa de 3 Dígitos',
    statement: 'Corrige la comparación: un número de 3 dígitos es capicúa si su primer dígito (n / 100) es igual al último (n % 10).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Compara n / 100 == n % 10.',
    explanation: 'Para 3 dígitos (ej. 535), los extremos deben ser iguales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esCapicua3(int n) {\n    // BUG: divide por 10 en vez de 100\n    return (n / 10) == (n % 10);\n}\n\nint main() {\n    std::cout << std::boolalpha << esCapicua3(535) << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esCapicua3(int n) {\n    return (n / 100) == (n % 10);\n}\n\nint main() {\n    std::cout << std::boolalpha << esCapicua3(535) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_capicua3(n):\n    return (n // 10) == (n % 10) # BUG\n\nprint(es_capicua3(535))`,
        solutionCode: `def es_capicua3(n):\n    return (n // 100) == (n % 10)\n\nprint(es_capicua3(535))`
      },
      javascript: {
        starterCode: `function esCapicua3(n) {\n    return Math.floor(n / 10) === (n % 10); // BUG\n}\n\nconsole.log(esCapicua3(535));`,
        solutionCode: `function esCapicua3(n) {\n    return Math.floor(n / 100) === (n % 10);\n}\n\nconsole.log(esCapicua3(535));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esCapicua3(int n) {\n        return (n / 10) == (n % 10); // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(esCapicua3(535));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esCapicua3(int n) {\n        return (n / 100) == (n % 10);\n    }\n    public static void main(String[] args) {\n        System.out.println(esCapicua3(535));\n    }\n}`
      }
    }
  },
  {
    id: 56,
    title: 'Descuento Progresivo',
    statement: 'Completa la condición: si el monto es mayor a 100 aplica 15% de descuento (monto * 0.85).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Si monto > 100 aplica el factor 0.85.',
    explanation: 'El factor 0.85 resta directamente el 15% del total a pagar.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\ndouble aplicarDescuento(double monto) {\n    if (monto > 100.0) return monto * ___;\n    return monto;\n}\n\nint main() {\n    std::cout << aplicarDescuento(200.0) << std::endl; // 170.0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\ndouble aplicarDescuento(double monto) {\n    if (monto > 100.0) return monto * 0.85;\n    return monto;\n}\n\nint main() {\n    std::cout << aplicarDescuento(200.0) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0.85']
      },
      python: {
        starterCode: `def aplicar_descuento(monto):\n    if monto > 100.0:\n        return monto * ___\n    return monto\n\nprint(aplicar_descuento(200.0))`,
        solutionCode: `def aplicar_descuento(monto):\n    if monto > 100.0:\n        return monto * 0.85\n    return monto\n\nprint(aplicar_descuento(200.0))`,
        acceptedKeywords: ['0.85']
      },
      javascript: {
        starterCode: `function aplicarDescuento(monto) {\n    if (monto > 100.0) return monto * ___;\n    return monto;\n}\n\nconsole.log(aplicarDescuento(200.0));`,
        solutionCode: `function aplicarDescuento(monto) {\n    if (monto > 100.0) return monto * 0.85;\n    return monto;\n}\n\nconsole.log(aplicarDescuento(200.0));`,
        acceptedKeywords: ['0.85']
      },
      java: {
        starterCode: `public class Main {\n    public static double aplicarDescuento(double monto) {\n        if (monto > 100.0) return monto * ___;\n        return monto;\n    }\n    public static void main(String[] args) {\n        System.out.println(aplicarDescuento(200.0));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double aplicarDescuento(double monto) {\n        if (monto > 100.0) return monto * 0.85;\n        return monto;\n    }\n    public static void main(String[] args) {\n        System.out.println(aplicarDescuento(200.0));\n    }\n}`,
        acceptedKeywords: ['0.85']
      }
    }
  },
  {
    id: 57,
    title: 'Contar Carácter Específico en Cadena',
    statement: 'Corrige la condición para incrementar el contador cuando el carácter coincida con el objetivo.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Compara si el carácter actual es igual (==) al carácter buscado.',
    explanation: 'El recorrido inspecciona cada posición de la cadena de texto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint contarCaracter(std::string texto, char letra) {\n    int count = 0;\n    for (char c : texto) {\n        // BUG: Compara con != en vez de ==\n        if (c != letra) count++;\n    }\n    return count;\n}\n\nint main() {\n    std::cout << contarCaracter("banana", 'a') << std::endl; // Debe dar 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint contarCaracter(std::string texto, char letra) {\n    int count = 0;\n    for (char c : texto) {\n        if (c == letra) count++;\n    }\n    return count;\n}\n\nint main() {\n    std::cout << contarCaracter("banana", 'a') << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def contar_caracter(texto, letra):\n    count = 0\n    for c in texto:\n        if c != letra: # BUG\n            count += 1\n    return count\n\nprint(contar_caracter("banana", 'a'))`,
        solutionCode: `def contar_caracter(texto, letra):\n    count = 0\n    for c in texto:\n        if c == letra:\n            count += 1\n    return count\n\nprint(contar_caracter("banana", 'a'))`
      },
      javascript: {
        starterCode: `function contarCaracter(texto, letra) {\n    let count = 0;\n    for (let c of texto) {\n        if (c !== letra) count++; // BUG\n    }\n    return count;\n}\n\nconsole.log(contarCaracter("banana", 'a'));`,
        solutionCode: `function contarCaracter(texto, letra) {\n    let count = 0;\n    for (let c of texto) {\n        if (c === letra) count++;\n    }\n    return count;\n}\n\nconsole.log(contarCaracter("banana", 'a'));`
      },
      java: {
        starterCode: `public class Main {\n    public static int contarCaracter(String texto, char letra) {\n        int count = 0;\n        for (int i = 0; i < texto.length(); i++) {\n            if (texto.charAt(i) != letra) count++; // BUG\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarCaracter("banana", 'a'));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int contarCaracter(String texto, char letra) {\n        int count = 0;\n        for (int i = 0; i < texto.length(); i++) {\n            if (texto.charAt(i) == letra) count++;\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarCaracter("banana", 'a'));\n    }\n}`
      }
    }
  },
  {
    id: 58,
    title: 'Distancia Euclidiana 2D',
    statement: 'Completa la fórmula de distancia entre puntos (x1, y1) y (x2, y2): dx*dx + dy*dy.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Suma el cuadrado de dy (dy * dy).',
    explanation: 'Distancia = sqrt((x2 - x1)^2 + (y2 - y1)^2).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <cmath>\n\ndouble distancia2D(double x1, double y1, double x2, double y2) {\n    double dx = x2 - x1;\n    double dy = y2 - y1;\n    return std::sqrt(dx * dx + ___);\n}\n\nint main() {\n    std::cout << distancia2D(0, 0, 3, 4) << std::endl; // 5.0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <cmath>\n\ndouble distancia2D(double x1, double y1, double x2, double y2) {\n    double dx = x2 - x1;\n    double dy = y2 - y1;\n    return std::sqrt(dx * dx + dy * dy);\n}\n\nint main() {\n    std::cout << distancia2D(0, 0, 3, 4) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['dy * dy', 'dy*dy']
      },
      python: {
        starterCode: `import math\n\ndef distancia_2d(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx * dx + ___)\n\nprint(distancia_2d(0, 0, 3, 4))`,
        solutionCode: `import math\n\ndef distancia_2d(x1, y1, x2, y2):\n    dx = x2 - x1\n    dy = y2 - y1\n    return math.sqrt(dx * dx + dy * dy)\n\nprint(distancia_2d(0, 0, 3, 4))`,
        acceptedKeywords: ['dy * dy', 'dy*dy', 'dy**2']
      },
      javascript: {
        starterCode: `function distancia2D(x1, y1, x2, y2) {\n    let dx = x2 - x1;\n    let dy = y2 - y1;\n    return Math.sqrt(dx * dx + ___);\n}\n\nconsole.log(distancia2D(0, 0, 3, 4));`,
        solutionCode: `function distancia2D(x1, y1, x2, y2) {\n    let dx = x2 - x1;\n    let dy = y2 - y1;\n    return Math.sqrt(dx * dx + dy * dy);\n}\n\nconsole.log(distancia2D(0, 0, 3, 4));`,
        acceptedKeywords: ['dy * dy', 'dy*dy', 'dy**2']
      },
      java: {
        starterCode: `public class Main {\n    public static double distancia2D(double x1, double y1, double x2, double y2) {\n        double dx = x2 - x1;\n        double dy = y2 - y1;\n        return Math.sqrt(dx * dx + ___);\n    }\n    public static void main(String[] args) {\n        System.out.println(distancia2D(0, 0, 3, 4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static double distancia2D(double x1, double y1, double x2, double y2) {\n        double dx = x2 - x1;\n        double dy = y2 - y1;\n        return Math.sqrt(dx * dx + dy * dy);\n    }\n    public static void main(String[] args) {\n        System.out.println(distancia2D(0, 0, 3, 4));\n    }\n}`,
        acceptedKeywords: ['dy * dy', 'dy*dy']
      }
    }
  },
  {
    id: 59,
    title: 'Repetir Texto N Veces',
    statement: 'Corrige la acumulación de texto dentro del ciclo para repetir la cadena.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Concatena el texto al resultado: resultado += texto.',
    explanation: 'En cada iteración se anexa una copia del texto al acumulador de cadena.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nstd::string repetirTexto(std::string texto, int n) {\n    std::string res = "";\n    for (int i = 0; i < n; i++) {\n        // BUG: Sobreescribe en vez de concatenar\n        res = texto;\n    }\n    return res;\n}\n\nint main() {\n    std::cout << repetirTexto("Hola", 3) << std::endl; // "HolaHolaHola"\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nstd::string repetirTexto(std::string texto, int n) {\n    std::string res = "";\n    for (int i = 0; i < n; i++) {\n        res += texto;\n    }\n    return res;\n}\n\nint main() {\n    std::cout << repetirTexto("Hola", 3) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def repetir_texto(texto, n):\n    res = ""\n    for _ in range(n):\n        res = texto # BUG\n    return res\n\nprint(repetir_texto("Hola", 3))`,
        solutionCode: `def repetir_texto(texto, n):\n    res = ""\n    for _ in range(n):\n        res += texto\n    return res\n\nprint(repetir_texto("Hola", 3))`
      },
      javascript: {
        starterCode: `function repetirTexto(texto, n) {\n    let res = "";\n    for (let i = 0; i < n; i++) {\n        res = texto; // BUG\n    }\n    return res;\n}\n\nconsole.log(repetirTexto("Hola", 3));`,
        solutionCode: `function repetirTexto(texto, n) {\n    let res = "";\n    for (let i = 0; i < n; i++) {\n        res += texto;\n    }\n    return res;\n}\n\nconsole.log(repetirTexto("Hola", 3));`
      },
      java: {
        starterCode: `public class Main {\n    public static String repetirTexto(String texto, int n) {\n        String res = "";\n        for (int i = 0; i < n; i++) {\n            res = texto; // BUG\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(repetirTexto("Hola", 3));\n    }\n}`,
        solutionCode: `public class Main {\n    public static String repetirTexto(String texto, int n) {\n        String res = "";\n        for (int i = 0; i < n; i++) {\n            res += texto;\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(repetirTexto("Hola", 3));\n    }\n}`
      }
    }
  },
  {
    id: 60,
    title: 'Obtener Mínimo en un Arreglo',
    statement: 'Completa la comparación para actualizar el valor mínimo cuando arr[i] sea inferior a minVal.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa el operador relacional <.',
    explanation: 'Si encontramos un elemento menor a minVal, minVal adopta ese nuevo valor.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint minimoArray(int arr[], int n) {\n    int minVal = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] ___ minVal) {\n            minVal = arr[i];\n        }\n    }\n    return minVal;\n}\n\nint main() {\n    int datos[] = {15, 3, 8, 22, 1};\n    std::cout << minimoArray(datos, 5) << std::endl; // 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint minimoArray(int arr[], int n) {\n    int minVal = arr[0];\n    for (int i = 1; i < n; i++) {\n        if (arr[i] < minVal) {\n            minVal = arr[i];\n        }\n    }\n    return minVal;\n}\n\nint main() {\n    int datos[] = {15, 3, 8, 22, 1};\n    std::cout << minimoArray(datos, 5) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['<', '<=']
      },
      python: {
        starterCode: `def minimo_array(arr):\n    min_val = arr[0]\n    for x in arr[1:]:\n        if x ___ min_val:\n            min_val = x\n    return min_val\n\nprint(minimo_array([15, 3, 8, 22, 1]))`,
        solutionCode: `def minimo_array(arr):\n    min_val = arr[0]\n    for x in arr[1:]:\n        if x < min_val:\n            min_val = x\n    return min_val\n\nprint(minimo_array([15, 3, 8, 22, 1]))`,
        acceptedKeywords: ['<', '<=']
      },
      javascript: {
        starterCode: `function minimoArray(arr) {\n    let minVal = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] ___ minVal) {\n            minVal = arr[i];\n        }\n    }\n    return minVal;\n}\n\nconsole.log(minimoArray([15, 3, 8, 22, 1]));`,
        solutionCode: `function minimoArray(arr) {\n    let minVal = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] < minVal) {\n            minVal = arr[i];\n        }\n    }\n    return minVal;\n}\n\nconsole.log(minimoArray([15, 3, 8, 22, 1]));`,
        acceptedKeywords: ['<', '<=']
      },
      java: {
        starterCode: `public class Main {\n    public static int minimoArray(int[] arr) {\n        int minVal = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] ___ minVal) {\n                minVal = arr[i];\n            }\n        }\n        return minVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(minimoArray(new int[]{15, 3, 8, 22, 1}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int minimoArray(int[] arr) {\n        int minVal = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] < minVal) {\n                minVal = arr[i];\n            }\n        }\n        return minVal;\n    }\n    public static void main(String[] args) {\n        System.out.println(minimoArray(new int[]{15, 3, 8, 22, 1}));\n    }\n}`,
        acceptedKeywords: ['<', '<=']
      }
    }
  }
];
