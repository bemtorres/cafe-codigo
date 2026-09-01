import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressExercisesAdvanced: ExpressChallengeExercise[] = [
  {
    id: 61,
    title: 'Factorial Recursivo',
    statement: 'Corrige el caso base de la recursión para evitar un bucle infinito o resultado cero.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'El factorial de 0 y de 1 es 1.',
    explanation: 'En una función recursiva, el caso base es imprescindible para detener las llamadas anidadas cuando n <= 1.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nlong long factorialRec(int n) {\n    // BUG: Caso base retorna 0\n    if (n <= 1) return 0;\n    return n * factorialRec(n - 1);\n}\n\nint main() {\n    std::cout << factorialRec(5) << std::endl; // 120\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nlong long factorialRec(int n) {\n    if (n <= 1) return 1;\n    return n * factorialRec(n - 1);\n}\n\nint main() {\n    std::cout << factorialRec(5) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def factorial_rec(n):\n    if n <= 1:\n        return 0 # BUG\n    return n * factorial_rec(n - 1)\n\nprint(factorial_rec(5))`,
        solutionCode: `def factorial_rec(n):\n    if n <= 1:\n        return 1\n    return n * factorial_rec(n - 1)\n\nprint(factorial_rec(5))`
      },
      javascript: {
        starterCode: `function factorialRec(n) {\n    if (n <= 1) return 0; // BUG\n    return n * factorialRec(n - 1);\n}\n\nconsole.log(factorialRec(5));`,
        solutionCode: `function factorialRec(n) {\n    if (n <= 1) return 1;\n    return n * factorialRec(n - 1);\n}\n\nconsole.log(factorialRec(5));`
      },
      java: {
        starterCode: `public class Main {\n    public static long factorialRec(int n) {\n        if (n <= 1) return 0; // BUG\n        return n * factorialRec(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorialRec(5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static long factorialRec(int n) {\n        if (n <= 1) return 1;\n        return n * factorialRec(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorialRec(5));\n    }\n}`
      }
    }
  },
  {
    id: 62,
    title: 'Fibonacci Recursivo',
    statement: 'Completa la suma de las dos llamadas recursivas anteriores: fib(n-1) + fib(n-2).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Suma fib(n - 1) con fib(n - 2).',
    explanation: 'La sucesión de Fibonacci define que cada término es la suma de los dos precedentes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(___);\n}\n\nint main() {\n    std::cout << fibonacci(6) << std::endl; // 8\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main() {\n    std::cout << fibonacci(6) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['n - 2', 'n-2']
      },
      python: {
        starterCode: `def fibonacci(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(___)\n\nprint(fibonacci(6))`,
        solutionCode: `def fibonacci(n):\n    if n <= 0:\n        return 0\n    if n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nprint(fibonacci(6))`,
        acceptedKeywords: ['n - 2', 'n-2']
      },
      javascript: {
        starterCode: `function fibonacci(n) {\n    if (n <= 0) return 0;\n    if (n === 1) return 1;\n    return fibonacci(n - 1) + fibonacci(___);\n}\n\nconsole.log(fibonacci(6));`,
        solutionCode: `function fibonacci(n) {\n    if (n <= 0) return 0;\n    if (n === 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(6));`,
        acceptedKeywords: ['n - 2', 'n-2']
      },
      java: {
        starterCode: `public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(___);\n    }\n    public static void main(String[] args) {\n        System.out.println(fibonacci(6));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n    public static void main(String[] args) {\n        System.out.println(fibonacci(6));\n    }\n}`,
        acceptedKeywords: ['n - 2', 'n-2']
      }
    }
  },
  {
    id: 63,
    title: 'Búsqueda Binaria (Punto Medio)',
    statement: 'Completa el cálculo del índice central: (inicio + fin) / 2.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'El punto medio es (inicio + fin) / 2.',
    explanation: 'En cada paso de la búsqueda binaria dividimos el rango ordenado en dos mitades calculando su centro.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint busquedaBinaria(int arr[], int n, int x) {\n    int inicio = 0, fin = n - 1;\n    while (inicio <= fin) {\n        int medio = (inicio + ___) / 2;\n        if (arr[medio] == x) return medio;\n        if (arr[medio] < x) inicio = medio + 1;\n        else fin = medio - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int nums[] = {2, 5, 8, 12, 16, 23, 38};\n    std::cout << busquedaBinaria(nums, 7, 16) << std::endl; // 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint busquedaBinaria(int arr[], int n, int x) {\n    int inicio = 0, fin = n - 1;\n    while (inicio <= fin) {\n        int medio = (inicio + fin) / 2;\n        if (arr[medio] == x) return medio;\n        if (arr[medio] < x) inicio = medio + 1;\n        else fin = medio - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int nums[] = {2, 5, 8, 12, 16, 23, 38};\n    std::cout << busquedaBinaria(nums, 7, 16) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['fin']
      },
      python: {
        starterCode: `def busqueda_binaria(arr, x):\n    inicio, fin = 0, len(arr) - 1\n    while inicio <= fin:\n        medio = (inicio + ___) // 2\n        if arr[medio] == x:\n            return medio\n        if arr[medio] < x:\n            inicio = medio + 1\n        else:\n            fin = medio - 1\n    return -1\n\nprint(busqueda_binaria([2, 5, 8, 12, 16, 23, 38], 16))`,
        solutionCode: `def busqueda_binaria(arr, x):\n    inicio, fin = 0, len(arr) - 1\n    while inicio <= fin:\n        medio = (inicio + fin) // 2\n        if arr[medio] == x:\n            return medio\n        if arr[medio] < x:\n            inicio = medio + 1\n        else:\n            fin = medio - 1\n    return -1\n\nprint(busqueda_binaria([2, 5, 8, 12, 16, 23, 38], 16))`,
        acceptedKeywords: ['fin']
      },
      javascript: {
        starterCode: `function busquedaBinaria(arr, x) {\n    let inicio = 0, fin = arr.length - 1;\n    while (inicio <= fin) {\n        let medio = Math.floor((inicio + ___) / 2);\n        if (arr[medio] === x) return medio;\n        if (arr[medio] < x) inicio = medio + 1;\n        else fin = medio - 1;\n    }\n    return -1;\n}\n\nconsole.log(busquedaBinaria([2, 5, 8, 12, 16, 23, 38], 16));`,
        solutionCode: `function busquedaBinaria(arr, x) {\n    let inicio = 0, fin = arr.length - 1;\n    while (inicio <= fin) {\n        let medio = Math.floor((inicio + fin) / 2);\n        if (arr[medio] === x) return medio;\n        if (arr[medio] < x) inicio = medio + 1;\n        else fin = medio - 1;\n    }\n    return -1;\n}\n\nconsole.log(busquedaBinaria([2, 5, 8, 12, 16, 23, 38], 16));`,
        acceptedKeywords: ['fin']
      },
      java: {
        starterCode: `public class Main {\n    public static int busquedaBinaria(int[] arr, int x) {\n        int inicio = 0, fin = arr.length - 1;\n        while (inicio <= fin) {\n            int medio = (inicio + ___) / 2;\n            if (arr[medio] == x) return medio;\n            if (arr[medio] < x) inicio = medio + 1;\n            else fin = medio - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(busquedaBinaria(new int[]{2, 5, 8, 12, 16, 23, 38}, 16));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int busquedaBinaria(int[] arr, int x) {\n        int inicio = 0, fin = arr.length - 1;\n        while (inicio <= fin) {\n            int medio = (inicio + fin) / 2;\n            if (arr[medio] == x) return medio;\n            if (arr[medio] < x) inicio = medio + 1;\n            else fin = medio - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(busquedaBinaria(new int[]{2, 5, 8, 12, 16, 23, 38}, 16));\n    }\n}`,
        acceptedKeywords: ['fin']
      }
    }
  },
  {
    id: 64,
    title: 'Máximo Común Divisor (Euclides)',
    statement: 'Corrige la llamada recursiva del algoritmo de Euclides: mcd(b, a % b).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'El algoritmo de Euclides reduce el problema llamando recursivamente a mcd(b, a % b).',
    explanation: 'El MCD de dos números es igual al MCD del divisor y el residuo de la división.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint mcd(int a, int b) {\n    if (b == 0) return a;\n    // BUG: divide en vez de aplicar módulo\n    return mcd(b, a / b);\n}\n\nint main() {\n    std::cout << mcd(48, 18) << std::endl; // Debe dar 6\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint mcd(int a, int b) {\n    if (b == 0) return a;\n    return mcd(b, a % b);\n}\n\nint main() {\n    std::cout << mcd(48, 18) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def mcd(a, b):\n    if b == 0:\n        return a\n    return mcd(b, a // b) # BUG\n\nprint(mcd(48, 18))`,
        solutionCode: `def mcd(a, b):\n    if b == 0:\n        return a\n    return mcd(b, a % b)\n\nprint(mcd(48, 18))`
      },
      javascript: {
        starterCode: `function mcd(a, b) {\n    if (b === 0) return a;\n    return mcd(b, Math.floor(a / b)); // BUG\n}\n\nconsole.log(mcd(48, 18));`,
        solutionCode: `function mcd(a, b) {\n    if (b === 0) return a;\n    return mcd(b, a % b);\n}\n\nconsole.log(mcd(48, 18));`
      },
      java: {
        starterCode: `public class Main {\n    public static int mcd(int a, int b) {\n        if (b == 0) return a;\n        return mcd(b, a / b); // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(mcd(48, 18));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int mcd(int a, int b) {\n        if (b == 0) return a;\n        return mcd(b, a % b);\n    }\n    public static void main(String[] args) {\n        System.out.println(mcd(48, 18));\n    }\n}`
      }
    }
  },
  {
    id: 65,
    title: 'Mínimo Común Múltiplo (MCM)',
    statement: 'Completa la relación entre MCM y MCD: (a * b) / mcd(a, b).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Divide el producto (a * b) entre el MCD(a, b).',
    explanation: 'El MCM(a, b) = (a * b) / MCD(a, b).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint mcd(int a, int b) {\n    return b == 0 ? a : mcd(b, a % b);\n}\n\nint mcm(int a, int b) {\n    return (a * b) / ___;\n}\n\nint main() {\n    std::cout << mcm(12, 18) << std::endl; // 36\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint mcd(int a, int b) {\n    return b == 0 ? a : mcd(b, a % b);\n}\n\nint mcm(int a, int b) {\n    return (a * b) / mcd(a, b);\n}\n\nint main() {\n    std::cout << mcm(12, 18) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['mcd(a, b)', 'mcd(a,b)']
      },
      python: {
        starterCode: `def mcd(a, b):\n    return a if b == 0 else mcd(b, a % b)\n\ndef mcm(a, b):\n    return (a * b) // ___\n\nprint(mcm(12, 18))`,
        solutionCode: `def mcd(a, b):\n    return a if b == 0 else mcd(b, a % b)\n\ndef mcm(a, b):\n    return (a * b) // mcd(a, b)\n\nprint(mcm(12, 18))`,
        acceptedKeywords: ['mcd(a, b)', 'mcd(a,b)']
      },
      javascript: {
        starterCode: `function mcd(a, b) {\n    return b === 0 ? a : mcd(b, a % b);\n}\n\nfunction mcm(a, b) {\n    return (a * b) / ___;\n}\n\nconsole.log(mcm(12, 18));`,
        solutionCode: `function mcd(a, b) {\n    return b === 0 ? a : mcd(b, a % b);\n}\n\nfunction mcm(a, b) {\n    return (a * b) / mcd(a, b);\n}\n\nconsole.log(mcm(12, 18));`,
        acceptedKeywords: ['mcd(a, b)', 'mcd(a,b)']
      },
      java: {
        starterCode: `public class Main {\n    public static int mcd(int a, int b) {\n        return b == 0 ? a : mcd(b, a % b);\n    }\n    public static int mcm(int a, int b) {\n        return (a * b) / ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(mcm(12, 18));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int mcd(int a, int b) {\n        return b == 0 ? a : mcd(b, a % b);\n    }\n    public static int mcm(int a, int b) {\n        return (a * b) / mcd(a, b);\n    }\n    public static void main(String[] args) {\n        System.out.println(mcm(12, 18));\n    }\n}`,
        acceptedKeywords: ['mcd(a, b)', 'mcd(a,b)']
      }
    }
  },
  {
    id: 66,
    title: 'Suma de Arreglo Recursiva',
    statement: 'Corrige la suma del elemento actual con la llamada recursiva del resto del arreglo.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Suma arr[n - 1] + sumaRecursiva(arr, n - 1).',
    explanation: 'El caso base devuelve 0 cuando n == 0, y el paso recursivo añade el último elemento.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumaRec(int arr[], int n) {\n    if (n <= 0) return 0;\n    // BUG: Multiplica en vez de sumar\n    return arr[n - 1] * sumaRec(arr, n - 1);\n}\n\nint main() {\n    int nums[] = {1, 2, 3, 4, 5};\n    std::cout << sumaRec(nums, 5) << std::endl; // Debe dar 15\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumaRec(int arr[], int n) {\n    if (n <= 0) return 0;\n    return arr[n - 1] + sumaRec(arr, n - 1);\n}\n\nint main() {\n    int nums[] = {1, 2, 3, 4, 5};\n    std::cout << sumaRec(nums, 5) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def suma_rec(arr):\n    if not arr:\n        return 0\n    return arr[-1] * suma_rec(arr[:-1]) # BUG\n\nprint(suma_rec([1, 2, 3, 4, 5]))`,
        solutionCode: `def suma_rec(arr):\n    if not arr:\n        return 0\n    return arr[-1] + suma_rec(arr[:-1])\n\nprint(suma_rec([1, 2, 3, 4, 5]))`
      },
      javascript: {
        starterCode: `function sumaRec(arr, n) {\n    if (n <= 0) return 0;\n    return arr[n - 1] * sumaRec(arr, n - 1); // BUG\n}\n\nconsole.log(sumaRec([1, 2, 3, 4, 5], 5));`,
        solutionCode: `function sumaRec(arr, n) {\n    if (n <= 0) return 0;\n    return arr[n - 1] + sumaRec(arr, n - 1);\n}\n\nconsole.log(sumaRec([1, 2, 3, 4, 5], 5));`
      },
      java: {
        starterCode: `public class Main {\n    public static int sumaRec(int[] arr, int n) {\n        if (n <= 0) return 0;\n        return arr[n - 1] * sumaRec(arr, n - 1); // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(sumaRec(new int[]{1, 2, 3, 4, 5}, 5));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumaRec(int[] arr, int n) {\n        if (n <= 0) return 0;\n        return arr[n - 1] + sumaRec(arr, n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(sumaRec(new int[]{1, 2, 3, 4, 5}, 5));\n    }\n}`
      }
    }
  },
  {
    id: 67,
    title: 'Verificar si un Arreglo está Ordenado',
    statement: 'Completa la comparación: si arr[i] > arr[i + 1] el arreglo no está en orden ascendente.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Si arr[i] es estrictamente mayor que arr[i + 1], retorna false.',
    explanation: 'Para que esté ordenado de forma creciente, ningún elemento puede superar a su sucesor.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool estaOrdenado(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] ___ arr[i + 1]) return false;\n    }\n    return true;\n}\n\nint main() {\n    int a[] = {2, 4, 8, 15, 20};\n    std::cout << std::boolalpha << estaOrdenado(a, 5) << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool estaOrdenado(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        if (arr[i] > arr[i + 1]) return false;\n    }\n    return true;\n}\n\nint main() {\n    int a[] = {2, 4, 8, 15, 20};\n    std::cout << std::boolalpha << estaOrdenado(a, 5) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['>']
      },
      python: {
        starterCode: `def esta_ordenado(arr):\n    for i in range(len(arr) - 1):\n        if arr[i] ___ arr[i + 1]:\n            return False\n    return True\n\nprint(esta_ordenado([2, 4, 8, 15, 20]))`,
        solutionCode: `def esta_ordenado(arr):\n    for i in range(len(arr) - 1):\n        if arr[i] > arr[i + 1]:\n            return False\n    return True\n\nprint(esta_ordenado([2, 4, 8, 15, 20]))`,
        acceptedKeywords: ['>']
      },
      javascript: {
        starterCode: `function estaOrdenado(arr) {\n    for (let i = 0; i < arr.length - 1; i++) {\n        if (arr[i] ___ arr[i + 1]) return false;\n    }\n    return true;\n}\n\nconsole.log(estaOrdenado([2, 4, 8, 15, 20]));`,
        solutionCode: `function estaOrdenado(arr) {\n    for (let i = 0; i < arr.length - 1; i++) {\n        if (arr[i] > arr[i + 1]) return false;\n    }\n    return true;\n}\n\nconsole.log(estaOrdenado([2, 4, 8, 15, 20]));`,
        acceptedKeywords: ['>']
      },
      java: {
        starterCode: `public class Main {\n    public static boolean estaOrdenado(int[] arr) {\n        for (int i = 0; i < arr.length - 1; i++) {\n            if (arr[i] ___ arr[i + 1]) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(estaOrdenado(new int[]{2, 4, 8, 15, 20}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean estaOrdenado(int[] arr) {\n        for (int i = 0; i < arr.length - 1; i++) {\n            if (arr[i] > arr[i + 1]) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(estaOrdenado(new int[]{2, 4, 8, 15, 20}));\n    }\n}`,
        acceptedKeywords: ['>']
      }
    }
  },
  {
    id: 68,
    title: 'Suma de Diagonal Principal en Matriz 2D',
    statement: 'Corrige la acumulación sumando los elementos mat[i][i] donde fila == columna.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'La diagonal principal está compuesta por los elementos donde fila y columna son idénticos (mat[i][i]).',
    explanation: 'En una matriz cuadrada, la diagonal mayor tiene índices de fila y columna iguales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint sumaDiagonal(int mat[3][3], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        // BUG: suma siempre la primera fila mat[0][i]\n        suma += mat[0][i];\n    }\n    return suma;\n}\n\nint main() {\n    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n    std::cout << sumaDiagonal(m, 3) << std::endl; // 1 + 5 + 9 = 15\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint sumaDiagonal(int mat[3][3], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        suma += mat[i][i];\n    }\n    return suma;\n}\n\nint main() {\n    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n    std::cout << sumaDiagonal(m, 3) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def suma_diagonal(mat):\n    suma = 0\n    for i in range(len(mat)):\n        suma += mat[0][i] # BUG\n    return suma\n\nprint(suma_diagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))`,
        solutionCode: `def suma_diagonal(mat):\n    suma = 0\n    for i in range(len(mat)):\n        suma += mat[i][i]\n    return suma\n\nprint(suma_diagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))`
      },
      javascript: {
        starterCode: `function sumaDiagonal(mat) {\n    let suma = 0;\n    for (let i = 0; i < mat.length; i++) {\n        suma += mat[0][i]; // BUG\n    }\n    return suma;\n}\n\nconsole.log(sumaDiagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));`,
        solutionCode: `function sumaDiagonal(mat) {\n    let suma = 0;\n    for (let i = 0; i < mat.length; i++) {\n        suma += mat[i][i];\n    }\n    return suma;\n}\n\nconsole.log(sumaDiagonal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));`
      },
      java: {
        starterCode: `public class Main {\n    public static int sumaDiagonal(int[][] mat) {\n        int suma = 0;\n        for (int i = 0; i < mat.length; i++) {\n            suma += mat[0][i]; // BUG\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumaDiagonal(new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int sumaDiagonal(int[][] mat) {\n        int suma = 0;\n        for (int i = 0; i < mat.length; i++) {\n            suma += mat[i][i];\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumaDiagonal(new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}));\n    }\n}`
      }
    }
  },
  {
    id: 69,
    title: 'Producto Punto de Dos Vectores',
    statement: 'Completa la sumatoria del producto elemento a elemento: v1[i] * v2[i].',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Multiplica v1[i] por v2[i] y acumula en suma.',
    explanation: 'El producto escalar o producto punto es la suma de los productos de las componentes homólogas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint productoPunto(int v1[], int v2[], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        suma += v1[i] * ___;\n    }\n    return suma;\n}\n\nint main() {\n    int a[] = {1, 3, -5};\n    int b[] = {4, -2, -1};\n    std::cout << productoPunto(a, b, 3) << std::endl; // (1*4)+(3*-2)+(-5*-1) = 4 - 6 + 5 = 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint productoPunto(int v1[], int v2[], int n) {\n    int suma = 0;\n    for (int i = 0; i < n; i++) {\n        suma += v1[i] * v2[i];\n    }\n    return suma;\n}\n\nint main() {\n    int a[] = {1, 3, -5};\n    int b[] = {4, -2, -1};\n    std::cout << productoPunto(a, b, 3) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['v2[i]']
      },
      python: {
        starterCode: `def producto_punto(v1, v2):\n    suma = 0\n    for i in range(len(v1)):\n        suma += v1[i] * ___\n    return suma\n\nprint(producto_punto([1, 3, -5], [4, -2, -1]))`,
        solutionCode: `def producto_punto(v1, v2):\n    suma = 0\n    for i in range(len(v1)):\n        suma += v1[i] * v2[i]\n    return suma\n\nprint(producto_punto([1, 3, -5], [4, -2, -1]))`,
        acceptedKeywords: ['v2[i]']
      },
      javascript: {
        starterCode: `function productoPunto(v1, v2) {\n    let suma = 0;\n    for (let i = 0; i < v1.length; i++) {\n        suma += v1[i] * ___;\n    }\n    return suma;\n}\n\nconsole.log(productoPunto([1, 3, -5], [4, -2, -1]));`,
        solutionCode: `function productoPunto(v1, v2) {\n    let suma = 0;\n    for (let i = 0; i < v1.length; i++) {\n        suma += v1[i] * v2[i];\n    }\n    return suma;\n}\n\nconsole.log(productoPunto([1, 3, -5], [4, -2, -1]));`,
        acceptedKeywords: ['v2[i]']
      },
      java: {
        starterCode: `public class Main {\n    public static int productoPunto(int[] v1, int[] v2) {\n        int suma = 0;\n        for (int i = 0; i < v1.length; i++) {\n            suma += v1[i] * ___;\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(productoPunto(new int[]{1, 3, -5}, new int[]{4, -2, -1}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int productoPunto(int[] v1, int[] v2) {\n        int suma = 0;\n        for (int i = 0; i < v1.length; i++) {\n            suma += v1[i] * v2[i];\n        }\n        return suma;\n    }\n    public static void main(String[] args) {\n        System.out.println(productoPunto(new int[]{1, 3, -5}, new int[]{4, -2, -1}));\n    }\n}`,
        acceptedKeywords: ['v2[i]']
      }
    }
  },
  {
    id: 70,
    title: 'Matriz Simétrica',
    statement: 'Corrige la comparación: una matriz es simétrica si mat[i][j] == mat[j][i].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Compara mat[i][j] != mat[j][i] para descartar simetría.',
    explanation: 'Una matriz simétrica es igual a su transpuesta (mat[i][j] = mat[j][i]).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esSimetrica(int mat[3][3], int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            // BUG: Compara con elemento diagonal en vez de simétrico\n            if (mat[i][j] != mat[i][i]) return false;\n        }\n    }\n    return true;\n}\n\nint main() {\n    int m[3][3] = {{1, 2, 3}, {2, 5, 6}, {3, 6, 9}};\n    std::cout << std::boolalpha << esSimetrica(m, 3) << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esSimetrica(int mat[3][3], int n) {\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (mat[i][j] != mat[j][i]) return false;\n        }\n    }\n    return true;\n}\n\nint main() {\n    int m[3][3] = {{1, 2, 3}, {2, 5, 6}, {3, 6, 9}};\n    std::cout << std::boolalpha << esSimetrica(m, 3) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_simetrica(mat):\n    n = len(mat)\n    for i in range(n):\n        for j in range(n):\n            if mat[i][j] != mat[i][i]: # BUG\n                return False\n    return True\n\nprint(es_simetrica([[1, 2, 3], [2, 5, 6], [3, 6, 9]]))`,
        solutionCode: `def es_simetrica(mat):\n    n = len(mat)\n    for i in range(n):\n        for j in range(n):\n            if mat[i][j] != mat[j][i]:\n                return False\n    return True\n\nprint(es_simetrica([[1, 2, 3], [2, 5, 6], [3, 6, 9]]))`
      },
      javascript: {
        starterCode: `function esSimetrica(mat) {\n    let n = mat.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] !== mat[i][i]) return false; // BUG\n        }\n    }\n    return true;\n}\n\nconsole.log(esSimetrica([[1, 2, 3], [2, 5, 6], [3, 6, 9]]));`,
        solutionCode: `function esSimetrica(mat) {\n    let n = mat.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < n; j++) {\n            if (mat[i][j] !== mat[j][i]) return false;\n        }\n    }\n    return true;\n}\n\nconsole.log(esSimetrica([[1, 2, 3], [2, 5, 6], [3, 6, 9]]));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esSimetrica(int[][] mat) {\n        int n = mat.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (mat[i][j] != mat[i][i]) return false; // BUG\n            }\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(esSimetrica(new int[][]{{1, 2, 3}, {2, 5, 6}, {3, 6, 9}}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esSimetrica(int[][] mat) {\n        int n = mat.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (mat[i][j] != mat[j][i]) return false;\n            }\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(esSimetrica(new int[][]{{1, 2, 3}, {2, 5, 6}, {3, 6, 9}}));\n    }\n}`
      }
    }
  },
  {
    id: 71,
    title: 'Torre de Hanoi (Conteo de Pasos)',
    statement: 'Completa la fórmula matemática para obtener el número mínimo de movimientos para n discos: (1 << n) - 1 o pow(2, n) - 1.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'La cantidad de movimientos es 2^n - 1.',
    explanation: 'Para mover n discos en la torre de Hanoi se requieren exactamente 2^n - 1 desplazamientos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nlong long pasosHanoi(int n) {\n    return (1LL << n) - ___;\n}\n\nint main() {\n    std::cout << pasosHanoi(3) << std::endl; // 7\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nlong long pasosHanoi(int n) {\n    return (1LL << n) - 1;\n}\n\nint main() {\n    std::cout << pasosHanoi(3) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `def pasos_hanoi(n):\n    return (2 ** n) - ___\n\nprint(pasos_hanoi(3))`,
        solutionCode: `def pasos_hanoi(n):\n    return (2 ** n) - 1\n\nprint(pasos_hanoi(3))`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `function pasosHanoi(n) {\n    return Math.pow(2, n) - ___;\n}\n\nconsole.log(pasosHanoi(3));`,
        solutionCode: `function pasosHanoi(n) {\n    return Math.pow(2, n) - 1;\n}\n\nconsole.log(pasosHanoi(3));`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static long pasosHanoi(int n) {\n        return (1L << n) - ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(pasosHanoi(3));\n    }\n}`,
        solutionCode: `public class Main {\n    public static long pasosHanoi(int n) {\n        return (1L << n) - 1;\n    }\n    public static void main(String[] args) {\n        System.out.println(pasosHanoi(3));\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 72,
    title: 'Rotar Arreglo a la Derecha',
    statement: 'Corrige la fórmula del nuevo índice tras rotar K posiciones: (i + k) % n.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'La posición rotada cíclicamente es (i + k) % n.',
    explanation: 'El operador módulo % garantiza que los índices que sobrepasan n vuelvan al inicio.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid rotarDerecha(int origen[], int destino[], int n, int k) {\n    for (int i = 0; i < n; i++) {\n        // BUG: Resta en vez de sumar\n        int nuevoIdx = (i - k + n) % n;\n        destino[nuevoIdx] = origen[i];\n    }\n}\n\nint main() {\n    int a[] = {1, 2, 3, 4, 5};\n    int res[5];\n    rotarDerecha(a, res, 5, 2);\n    std::cout << res[0] << std::endl; // Debe ser 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid rotarDerecha(int origen[], int destino[], int n, int k) {\n    for (int i = 0; i < n; i++) {\n        int nuevoIdx = (i + k) % n;\n        destino[nuevoIdx] = origen[i];\n    }\n}\n\nint main() {\n    int a[] = {1, 2, 3, 4, 5};\n    int res[5];\n    rotarDerecha(a, res, 5, 2);\n    std::cout << res[0] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def rotar_derecha(arr, k):\n    n = len(arr)\n    res = [0] * n\n    for i in range(n):\n        res[(i - k) % n] = arr[i] # BUG\n    return res\n\nprint(rotar_derecha([1, 2, 3, 4, 5], 2))`,
        solutionCode: `def rotar_derecha(arr, k):\n    n = len(arr)\n    res = [0] * n\n    for i in range(n):\n        res[(i + k) % n] = arr[i]\n    return res\n\nprint(rotar_derecha([1, 2, 3, 4, 5], 2))`
      },
      javascript: {
        starterCode: `function rotarDerecha(arr, k) {\n    let n = arr.length;\n    let res = new Array(n);\n    for (let i = 0; i < n; i++) {\n        res[(i - k + n) % n] = arr[i]; // BUG\n    }\n    return res;\n}\n\nconsole.log(rotarDerecha([1, 2, 3, 4, 5], 2));`,
        solutionCode: `function rotarDerecha(arr, k) {\n    let n = arr.length;\n    let res = new Array(n);\n    for (let i = 0; i < n; i++) {\n        res[(i + k) % n] = arr[i];\n    }\n    return res;\n}\n\nconsole.log(rotarDerecha([1, 2, 3, 4, 5], 2));`
      },
      java: {
        starterCode: `public class Main {\n    public static int[] rotarDerecha(int[] arr, int k) {\n        int n = arr.length;\n        int[] res = new int[n];\n        for (int i = 0; i < n; i++) {\n            res[(i - k + n) % n] = arr[i]; // BUG\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = rotarDerecha(new int[]{1, 2, 3, 4, 5}, 2);\n        System.out.println(r[0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static int[] rotarDerecha(int[] arr, int k) {\n        int n = arr.length;\n        int[] res = new int[n];\n        for (int i = 0; i < n; i++) {\n            res[(i + k) % n] = arr[i];\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = rotarDerecha(new int[]{1, 2, 3, 4, 5}, 2);\n        System.out.println(r[0]);\n    }\n}`
      }
    }
  },
  {
    id: 73,
    title: 'Aplanar Matriz 2D a Vector 1D',
    statement: 'Completa la fórmula de mapeo lineal: fila * columnas + columna.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Multiplica f * cols y súmale c.',
    explanation: 'El orden row-major asigna a la celda (f, c) la posición contigua f * cols + c.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint indicePlano(int f, int c, int cols) {\n    return f * cols + ___;\n}\n\nint main() {\n    std::cout << indicePlano(2, 3, 4) << std::endl; // 2*4 + 3 = 11\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint indicePlano(int f, int c, int cols) {\n    return f * cols + c;\n}\n\nint main() {\n    std::cout << indicePlano(2, 3, 4) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['c']
      },
      python: {
        starterCode: `def indice_plano(f, c, cols):\n    return f * cols + ___\n\nprint(indice_plano(2, 3, 4))`,
        solutionCode: `def indice_plano(f, c, cols):\n    return f * cols + c\n\nprint(indice_plano(2, 3, 4))`,
        acceptedKeywords: ['c']
      },
      javascript: {
        starterCode: `function indicePlano(f, c, cols) {\n    return f * cols + ___;\n}\n\nconsole.log(indicePlano(2, 3, 4));`,
        solutionCode: `function indicePlano(f, c, cols) {\n    return f * cols + c;\n}\n\nconsole.log(indicePlano(2, 3, 4));`,
        acceptedKeywords: ['c']
      },
      java: {
        starterCode: `public class Main {\n    public static int indicePlano(int f, int c, int cols) {\n        return f * cols + ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(indicePlano(2, 3, 4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int indicePlano(int f, int c, int cols) {\n        return f * cols + c;\n    }\n    public static void main(String[] args) {\n        System.out.println(indicePlano(2, 3, 4));\n    }\n}`,
        acceptedKeywords: ['c']
      }
    }
  },
  {
    id: 74,
    title: 'Palíndromo Recursivo',
    statement: 'Corrige la condición de coincidencia de los extremos en la función recursiva.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Compara si str[ini] == str[fin].',
    explanation: 'Si los extremos coinciden, avanzamos hacia el interior llamando a esPalindromo(str, ini + 1, fin - 1).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nbool esPalindromoRec(std::string s, int ini, int fin) {\n    if (ini >= fin) return true;\n    // BUG: Compara con != provocando falso inmediato\n    if (s[ini] != s[fin]) return false;\n    return esPalindromoRec(s, ini + 1, fin - 1);\n}\n\nint main() {\n    std::string palabra = "radar";\n    std::cout << std::boolalpha << esPalindromoRec(palabra, 0, 4) << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nbool esPalindromoRec(std::string s, int ini, int fin) {\n    if (ini >= fin) return true;\n    if (s[ini] != s[fin]) return false;\n    return esPalindromoRec(s, ini + 1, fin - 1);\n}\n\nint main() {\n    std::string palabra = "radar";\n    std::cout << std::boolalpha << esPalindromoRec(palabra, 0, 4) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_palindromo_rec(s, ini, fin):\n    if ini >= fin:\n        return True\n    if s[ini] != s[fin]:\n        return False\n    return es_palindromo_rec(s, ini + 1, fin - 1)\n\nprint(es_palindromo_rec("radar", 0, 4))`,
        solutionCode: `def es_palindromo_rec(s, ini, fin):\n    if ini >= fin:\n        return True\n    if s[ini] != s[fin]:\n        return False\n    return es_palindromo_rec(s, ini + 1, fin - 1)\n\nprint(es_palindromo_rec("radar", 0, 4))`
      },
      javascript: {
        starterCode: `function esPalindromoRec(s, ini, fin) {\n    if (ini >= fin) return true;\n    if (s[ini] !== s[fin]) return false;\n    return esPalindromoRec(s, ini + 1, fin - 1);\n}\n\nconsole.log(esPalindromoRec("radar", 0, 4));`,
        solutionCode: `function esPalindromoRec(s, ini, fin) {\n    if (ini >= fin) return true;\n    if (s[ini] !== s[fin]) return false;\n    return esPalindromoRec(s, ini + 1, fin - 1);\n}\n\nconsole.log(esPalindromoRec("radar", 0, 4));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean esPalindromoRec(String s, int ini, int fin) {\n        if (ini >= fin) return true;\n        if (s.charAt(ini) != s.charAt(fin)) return false;\n        return esPalindromoRec(s, ini + 1, fin - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(esPalindromoRec("radar", 0, 4));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean esPalindromoRec(String s, int ini, int fin) {\n        if (ini >= fin) return true;\n        if (s.charAt(ini) != s.charAt(fin)) return false;\n        return esPalindromoRec(s, ini + 1, fin - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(esPalindromoRec("radar", 0, 4));\n    }\n}`
      }
    }
  },
  {
    id: 75,
    title: 'Algoritmo de Kadane (Suma Máxima)',
    statement: 'Completa la actualización del máximo local: max(arr[i], maxActual + arr[i]).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Suma arr[i] a maxActual.',
    explanation: 'El algoritmo de Kadane decide si extender el subarreglo actual o comenzar uno nuevo en arr[i].',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <algorithm>\n\nint maxSubarraySum(int arr[], int n) {\n    int maxActual = arr[0], maxGlobal = arr[0];\n    for (int i = 1; i < n; i++) {\n        maxActual = std::max(arr[i], maxActual + ___);\n        maxGlobal = std::max(maxGlobal, maxActual);\n    }\n    return maxGlobal;\n}\n\nint main() {\n    int nums[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    std::cout << maxSubarraySum(nums, 9) << std::endl; // 6 (subarreglo [4, -1, 2, 1])\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <algorithm>\n\nint maxSubarraySum(int arr[], int n) {\n    int maxActual = arr[0], maxGlobal = arr[0];\n    for (int i = 1; i < n; i++) {\n        maxActual = std::max(arr[i], maxActual + arr[i]);\n        maxGlobal = std::max(maxGlobal, maxActual);\n    }\n    return maxGlobal;\n}\n\nint main() {\n    int nums[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    std::cout << maxSubarraySum(nums, 9) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['arr[i]']
      },
      python: {
        starterCode: `def max_subarray_sum(arr):\n    max_act = max_glob = arr[0]\n    for x in arr[1:]:\n        max_act = max(x, max_act + ___)\n        max_glob = max(max_glob, max_act)\n    return max_glob\n\nprint(max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`,
        solutionCode: `def max_subarray_sum(arr):\n    max_act = max_glob = arr[0]\n    for x in arr[1:]:\n        max_act = max(x, max_act + x)\n        max_glob = max(max_glob, max_act)\n    return max_glob\n\nprint(max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`,
        acceptedKeywords: ['x']
      },
      javascript: {
        starterCode: `function maxSubarraySum(arr) {\n    let maxAct = arr[0], maxGlob = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        maxAct = Math.max(arr[i], maxAct + ___);\n        maxGlob = Math.max(maxGlob, maxAct);\n    }\n    return maxGlob;\n}\n\nconsole.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
        solutionCode: `function maxSubarraySum(arr) {\n    let maxAct = arr[0], maxGlob = arr[0];\n    for (let i = 1; i < arr.length; i++) {\n        maxAct = Math.max(arr[i], maxAct + arr[i]);\n        maxGlob = Math.max(maxGlob, maxAct);\n    }\n    return maxGlob;\n}\n\nconsole.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`,
        acceptedKeywords: ['arr[i]']
      },
      java: {
        starterCode: `public class Main {\n    public static int maxSubarraySum(int[] arr) {\n        int maxAct = arr[0], maxGlob = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            maxAct = Math.max(arr[i], maxAct + ___);\n            maxGlob = Math.max(maxGlob, maxAct);\n        }\n        return maxGlob;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxSubarraySum(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int maxSubarraySum(int[] arr) {\n        int maxAct = arr[0], maxGlob = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            maxAct = Math.max(arr[i], maxAct + arr[i]);\n            maxGlob = Math.max(maxGlob, maxAct);\n        }\n        return maxGlob;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxSubarraySum(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}));\n    }\n}`,
        acceptedKeywords: ['arr[i]']
      }
    }
  },
  {
    id: 76,
    title: 'Transposición de Matriz 2D',
    statement: 'Corrige la asignación para colocar el elemento en su posición transpuesta: res[j][i] = mat[i][j].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'La fila i y columna j se intercambian a posición (j, i).',
    explanation: 'La transposición intercambia filas por columnas de manera que las filas de la original se convierten en columnas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid transponer(int mat[2][2], int res[2][2]) {\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            // BUG: Asigna en la misma posición\n            res[i][j] = mat[i][j];\n        }\n    }\n}\n\nint main() {\n    int m[2][2] = {{1, 2}, {3, 4}};\n    int r[2][2];\n    transponer(m, r);\n    std::cout << r[0][1] << std::endl; // Debe dar 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid transponer(int mat[2][2], int res[2][2]) {\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            res[j][i] = mat[i][j];\n        }\n    }\n}\n\nint main() {\n    int m[2][2] = {{1, 2}, {3, 4}};\n    int r[2][2];\n    transponer(m, r);\n    std::cout << r[0][1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def transponer(mat):\n    filas, cols = len(mat), len(mat[0])\n    res = [[0] * filas for _ in range(cols)]\n    for i in range(filas):\n        for j in range(cols):\n            res[i][j] = mat[i][j] # BUG\n    return res\n\nprint(transponer([[1, 2], [3, 4]]))`,
        solutionCode: `def transponer(mat):\n    filas, cols = len(mat), len(mat[0])\n    res = [[0] * filas for _ in range(cols)]\n    for i in range(filas):\n        for j in range(cols):\n            res[j][i] = mat[i][j]\n    return res\n\nprint(transponer([[1, 2], [3, 4]]))`
      },
      javascript: {
        starterCode: `function transponer(mat) {\n    let res = [[0, 0], [0, 0]];\n    for (let i = 0; i < 2; i++) {\n        for (let j = 0; j < 2; j++) {\n            res[i][j] = mat[i][j]; // BUG\n        }\n    }\n    return res;\n}\n\nconsole.log(transponer([[1, 2], [3, 4]]));`,
        solutionCode: `function transponer(mat) {\n    let res = [[0, 0], [0, 0]];\n    for (let i = 0; i < 2; i++) {\n        for (let j = 0; j < 2; j++) {\n            res[j][i] = mat[i][j];\n        }\n    }\n    return res;\n}\n\nconsole.log(transponer([[1, 2], [3, 4]]));`
      },
      java: {
        starterCode: `public class Main {\n    public static int[][] transponer(int[][] mat) {\n        int[][] res = new int[2][2];\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                res[i][j] = mat[i][j]; // BUG\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[][] r = transponer(new int[][]{{1, 2}, {3, 4}});\n        System.out.println(r[0][1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static int[][] transponer(int[][] mat) {\n        int[][] res = new int[2][2];\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                res[j][i] = mat[i][j];\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[][] r = transponer(new int[][]{{1, 2}, {3, 4}});\n        System.out.println(r[0][1]);\n    }\n}`
      }
    }
  },
  {
    id: 77,
    title: 'Contar Ocurrencias Recursivo',
    statement: 'Completa la suma condicional en la llamada recursiva.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Si arr[n - 1] == x suma 1, si no 0.',
    explanation: 'Descompone el arreglo en el último elemento más el resultado de procesar los n - 1 restantes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint contarOcurrencias(int arr[], int n, int x) {\n    if (n <= 0) return 0;\n    int coincide = (arr[n - 1] == x) ? ___ : 0;\n    return coincide + contarOcurrencias(arr, n - 1, x);\n}\n\nint main() {\n    int a[] = {3, 7, 3, 2, 3, 9};\n    std::cout << contarOcurrencias(a, 6, 3) << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint contarOcurrencias(int arr[], int n, int x) {\n    if (n <= 0) return 0;\n    int coincide = (arr[n - 1] == x) ? 1 : 0;\n    return coincide + contarOcurrencias(arr, n - 1, x);\n}\n\nint main() {\n    int a[] = {3, 7, 3, 2, 3, 9};\n    std::cout << contarOcurrencias(a, 6, 3) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `def contar_ocurrencias(arr, x):\n    if not arr:\n        return 0\n    coincide = 1 if arr[-1] == x else ___\n    return coincide + contar_ocurrencias(arr[:-1], x)\n\nprint(contar_ocurrencias([3, 7, 3, 2, 3, 9], 3))`,
        solutionCode: `def contar_ocurrencias(arr, x):\n    if not arr:\n        return 0\n    coincide = 1 if arr[-1] == x else 0\n    return coincide + contar_ocurrencias(arr[:-1], x)\n\nprint(contar_ocurrencias([3, 7, 3, 2, 3, 9], 3))`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `function contarOcurrencias(arr, n, x) {\n    if (n <= 0) return 0;\n    let coincide = (arr[n - 1] === x) ? ___ : 0;\n    return coincide + contarOcurrencias(arr, n - 1, x);\n}\n\nconsole.log(contarOcurrencias([3, 7, 3, 2, 3, 9], 6, 3));`,
        solutionCode: `function contarOcurrencias(arr, n, x) {\n    if (n <= 0) return 0;\n    let coincide = (arr[n - 1] === x) ? 1 : 0;\n    return coincide + contarOcurrencias(arr, n - 1, x);\n}\n\nconsole.log(contarOcurrencias([3, 7, 3, 2, 3, 9], 6, 3));`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static int contarOcurrencias(int[] arr, int n, int x) {\n        if (n <= 0) return 0;\n        int coincide = (arr[n - 1] == x) ? ___ : 0;\n        return coincide + contarOcurrencias(arr, n - 1, x);\n    }\n    public static void main(String[] args) {\n        System.out.println(contarOcurrencias(new int[]{3, 7, 3, 2, 3, 9}, 6, 3));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int contarOcurrencias(int[] arr, int n, int x) {\n        if (n <= 0) return 0;\n        int coincide = (arr[n - 1] == x) ? 1 : 0;\n        return coincide + contarOcurrencias(arr, n - 1, x);\n    }\n    public static void main(String[] args) {\n        System.out.println(contarOcurrencias(new int[]{3, 7, 3, 2, 3, 9}, 6, 3));\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 78,
    title: 'Verificar Paréntesis Balanceados',
    statement: 'Corrige la condición: si el contador baja de 0 (se cierra un paréntesis antes de abrirlo), retorna false.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Si count < 0 inmediatamente la expresión está desbalanceada.',
    explanation: 'Un cierre de paréntesis sin apertura previa viola el balance en cualquier posición de la cadena.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nbool parentesisValidos(std::string s) {\n    int count = 0;\n    for (char c : s) {\n        if (c == '(') count++;\n        else if (c == ')') count--;\n        // BUG: no verifica count < 0 a tiempo\n    }\n    return count == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << parentesisValidos(")(") << std::endl; // Debe dar false\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nbool parentesisValidos(std::string s) {\n    int count = 0;\n    for (char c : s) {\n        if (c == '(') count++;\n        else if (c == ')') count--;\n        if (count < 0) return false;\n    }\n    return count == 0;\n}\n\nint main() {\n    std::cout << std::boolalpha << parentesisValidos(")(") << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def parentesis_validos(s):\n    count = 0\n    for c in s:\n        if c == '(':\n            count += 1\n        elif c == ')':\n            count -= 1\n    return count == 0 # BUG en ")("`,
        solutionCode: `def parentesis_validos(s):\n    count = 0\n    for c in s:\n        if c == '(':\n            count += 1\n        elif c == ')':\n            count -= 1\n        if count < 0:\n            return False\n    return count == 0\n\nprint(parentesis_validos(")("))`
      },
      javascript: {
        starterCode: `function parentesisValidos(s) {\n    let count = 0;\n    for (let c of s) {\n        if (c === '(') count++;\n        else if (c === ')') count--;\n    }\n    return count === 0; // BUG\n}\n\nconsole.log(parentesisValidos(")("));`,
        solutionCode: `function parentesisValidos(s) {\n    let count = 0;\n    for (let c of s) {\n        if (c === '(') count++;\n        else if (c === ')') count--;\n        if (count < 0) return false;\n    }\n    return count === 0;\n}\n\nconsole.log(parentesisValidos(")("));`
      },
      java: {
        starterCode: `public class Main {\n    public static boolean parentesisValidos(String s) {\n        int count = 0;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c == '(') count++;\n            else if (c == ')') count--;\n        }\n        return count == 0; // BUG\n    }\n    public static void main(String[] args) {\n        System.out.println(parentesisValidos(")("));\n    }\n}`,
        solutionCode: `public class Main {\n    public static boolean parentesisValidos(String s) {\n        int count = 0;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (c == '(') count++;\n            else if (c == ')') count--;\n            if (count < 0) return false;\n        }\n        return count == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(parentesisValidos(")("));\n    }\n}`
      }
    }
  },
  {
    id: 79,
    title: 'Función de Orden Superior: Map Manual',
    statement: 'Completa la aplicación de la función transformadora fn sobre cada elemento arr[i].',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Aplica fn(arr[i]) para transformar cada elemento.',
    explanation: 'El patrón Map ejecuta una función dada para cada valor de la colección retornando una nueva estructura transformada.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <functional>\n\nvoid mapear(int arr[], int res[], int n, std::function<int(int)> fn) {\n    for (int i = 0; i < n; i++) {\n        res[i] = fn(___);\n    }\n}\n\nint main() {\n    int nums[] = {1, 2, 3};\n    int res[3];\n    mapear(nums, res, 3, [](int x) { return x * 2; });\n    std::cout << res[1] << std::endl; // 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <functional>\n\nvoid mapear(int arr[], int res[], int n, std::function<int(int)> fn) {\n    for (int i = 0; i < n; i++) {\n        res[i] = fn(arr[i]);\n    }\n}\n\nint main() {\n    int nums[] = {1, 2, 3};\n    int res[3];\n    mapear(nums, res, 3, [](int x) { return x * 2; });\n    std::cout << res[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['arr[i]']
      },
      python: {
        starterCode: `def mapear(arr, fn):\n    return [fn(___) for x in arr]\n\nprint(mapear([1, 2, 3], lambda x: x * 2))`,
        solutionCode: `def mapear(arr, fn):\n    return [fn(x) for x in arr]\n\nprint(mapear([1, 2, 3], lambda x: x * 2))`,
        acceptedKeywords: ['x']
      },
      javascript: {
        starterCode: `function mapear(arr, fn) {\n    let res = [];\n    for (let i = 0; i < arr.length; i++) {\n        res.push(fn(___));\n    }\n    return res;\n}\n\nconsole.log(mapear([1, 2, 3], x => x * 2));`,
        solutionCode: `function mapear(arr, fn) {\n    let res = [];\n    for (let i = 0; i < arr.length; i++) {\n        res.push(fn(arr[i]));\n    }\n    return res;\n}\n\nconsole.log(mapear([1, 2, 3], x => x * 2));`,
        acceptedKeywords: ['arr[i]']
      },
      java: {
        starterCode: `import java.util.function.Function;\n\npublic class Main {\n    public static int[] mapear(int[] arr, Function<Integer, Integer> fn) {\n        int[] res = new int[arr.length];\n        for (int i = 0; i < arr.length; i++) {\n            res[i] = fn.apply(___);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = mapear(new int[]{1, 2, 3}, x -> x * 2);\n        System.out.println(r[1]);\n    }\n}`,
        solutionCode: `import java.util.function.Function;\n\npublic class Main {\n    public static int[] mapear(int[] arr, Function<Integer, Integer> fn) {\n        int[] res = new int[arr.length];\n        for (int i = 0; i < arr.length; i++) {\n            res[i] = fn.apply(arr[i]);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = mapear(new int[]{1, 2, 3}, x -> x * 2);\n        System.out.println(r[1]);\n    }\n}`,
        acceptedKeywords: ['arr[i]']
      }
    }
  },
  {
    id: 80,
    title: 'Potencia Recursiva (Divide y Vencerás)',
    statement: 'Corrige la recursión optimizada cuando el exponente es par: mitad * mitad.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Si exp es par, base^exp = (base^(exp/2))^2.',
    explanation: 'El algoritmo de exponenciación binaria reduce la complejidad a O(log n).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nlong long potRapida(long long base, int exp) {\n    if (exp == 0) return 1;\n    long long mitad = potRapida(base, exp / 2);\n    if (exp % 2 == 0) {\n        // BUG: suma en vez de multiplicar las mitades\n        return mitad + mitad;\n    }\n    return base * mitad * mitad;\n}\n\nint main() {\n    std::cout << potRapida(2, 10) << std::endl; // 1024\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nlong long potRapida(long long base, int exp) {\n    if (exp == 0) return 1;\n    long long mitad = potRapida(base, exp / 2);\n    if (exp % 2 == 0) {\n        return mitad * mitad;\n    }\n    return base * mitad * mitad;\n}\n\nint main() {\n    std::cout << potRapida(2, 10) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def pot_rapida(base, exp):\n    if exp == 0:\n        return 1\n    mitad = pot_rapida(base, exp // 2)\n    if exp % 2 == 0:\n        return mitad + mitad # BUG\n    return base * mitad * mitad\n\nprint(pot_rapida(2, 10))`,
        solutionCode: `def pot_rapida(base, exp):\n    if exp == 0:\n        return 1\n    mitad = pot_rapida(base, exp // 2)\n    if exp % 2 == 0:\n        return mitad * mitad\n    return base * mitad * mitad\n\nprint(pot_rapida(2, 10))`
      },
      javascript: {
        starterCode: `function potRapida(base, exp) {\n    if (exp === 0) return 1;\n    let mitad = potRapida(base, Math.floor(exp / 2));\n    if (exp % 2 === 0) {\n        return mitad + mitad; // BUG\n    }\n    return base * mitad * mitad;\n}\n\nconsole.log(potRapida(2, 10));`,
        solutionCode: `function potRapida(base, exp) {\n    if (exp === 0) return 1;\n    let mitad = potRapida(base, Math.floor(exp / 2));\n    if (exp % 2 === 0) {\n        return mitad * mitad;\n    }\n    return base * mitad * mitad;\n}\n\nconsole.log(potRapida(2, 10));`
      },
      java: {
        starterCode: `public class Main {\n    public static long potRapida(long base, int exp) {\n        if (exp == 0) return 1;\n        long mitad = potRapida(base, exp / 2);\n        if (exp % 2 == 0) {\n            return mitad + mitad; // BUG\n        }\n        return base * mitad * mitad;\n    }\n    public static void main(String[] args) {\n        System.out.println(potRapida(2, 10));\n    }\n}`,
        solutionCode: `public class Main {\n    public static long potRapida(long base, int exp) {\n        if (exp == 0) return 1;\n        long mitad = potRapida(base, exp / 2);\n        if (exp % 2 == 0) {\n            return mitad * mitad;\n        }\n        return base * mitad * mitad;\n    }\n    public static void main(String[] args) {\n        System.out.println(potRapida(2, 10));\n    }\n}`
      }
    }
  },
  {
    id: 81,
    title: 'Intercambio de Variables (Swap con Referencia)',
    statement: 'Completa el intercambio usando una variable temporal: temp = a, a = b, b = temp.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Asigna el valor guardado en temp a b.',
    explanation: 'El intercambio de dos variables en memoria requiere un almacenamiento temporal para no sobreescribir el valor previo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid swapRef(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = ___;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swapRef(x, y);\n    std::cout << x << " " << y << std::endl; // 20 10\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid swapRef(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swapRef(x, y);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['temp']
      },
      python: {
        starterCode: `def swap_arr(arr, i, j):\n    temp = arr[i]\n    arr[i] = arr[j]\n    arr[j] = ___\n\nlista = [10, 20]\nswap_arr(lista, 0, 1)\nprint(lista) # [20, 10]`,
        solutionCode: `def swap_arr(arr, i, j):\n    temp = arr[i]\n    arr[i] = arr[j]\n    arr[j] = temp\n\nlista = [10, 20]\nswap_arr(lista, 0, 1)\nprint(lista)`,
        acceptedKeywords: ['temp']
      },
      javascript: {
        starterCode: `function swapArr(arr, i, j) {\n    let temp = arr[i];\n    arr[i] = arr[j];\n    arr[j] = ___;\n}\n\nlet l = [10, 20];\nswapArr(l, 0, 1);\nconsole.log(l);`,
        solutionCode: `function swapArr(arr, i, j) {\n    let temp = arr[i];\n    arr[i] = arr[j];\n    arr[j] = temp;\n}\n\nlet l = [10, 20];\nswapArr(l, 0, 1);\nconsole.log(l);`,
        acceptedKeywords: ['temp']
      },
      java: {
        starterCode: `public class Main {\n    public static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = ___;\n    }\n    public static void main(String[] args) {\n        int[] a = {10, 20};\n        swap(a, 0, 1);\n        System.out.println(a[0] + " " + a[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    public static void main(String[] args) {\n        int[] a = {10, 20};\n        swap(a, 0, 1);\n        System.out.println(a[0] + " " + a[1]);\n    }\n}`,
        acceptedKeywords: ['temp']
      }
    }
  },
  {
    id: 82,
    title: 'Invertir Arreglo In-Place',
    statement: 'Corrige la condición del bucle de inversión: el puntero izquierdo debe ser estrictamente menor al derecho (izq < der).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'El ciclo termina cuando izq >= der.',
    explanation: 'Dos punteros convergen desde los extremos intercambiando elementos hasta encontrarse en el centro.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <algorithm>\n\nvoid invertirArray(int arr[], int n) {\n    int izq = 0, der = n - 1;\n    // BUG: bucle infinito izq != n\n    while (izq < n) {\n        std::swap(arr[izq], arr[der]);\n        izq++;\n        der--;\n    }\n}\n\nint main() {\n    int a[] = {1, 2, 3, 4};\n    invertirArray(a, 4);\n    std::cout << a[0] << std::endl; // Debe dar 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <algorithm>\n\nvoid invertirArray(int arr[], int n) {\n    int izq = 0, der = n - 1;\n    while (izq < der) {\n        std::swap(arr[izq], arr[der]);\n        izq++;\n        der--;\n    }\n}\n\nint main() {\n    int a[] = {1, 2, 3, 4};\n    invertirArray(a, 4);\n    std::cout << a[0] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def invertir_array(arr):\n    izq, der = 0, len(arr) - 1\n    while izq < len(arr): # BUG\n        arr[izq], arr[der] = arr[der], arr[izq]\n        izq += 1\n        der -= 1\n    return arr\n\nprint(invertir_array([1, 2, 3, 4]))`,
        solutionCode: `def invertir_array(arr):\n    izq, der = 0, len(arr) - 1\n    while izq < der:\n        arr[izq], arr[der] = arr[der], arr[izq]\n        izq += 1\n        der -= 1\n    return arr\n\nprint(invertir_array([1, 2, 3, 4]))`
      },
      javascript: {
        starterCode: `function invertirArray(arr) {\n    let izq = 0, der = arr.length - 1;\n    while (izq < arr.length) { // BUG\n        let temp = arr[izq];\n        arr[izq] = arr[der];\n        arr[der] = temp;\n        izq++; der--;\n    }\n    return arr;\n}\n\nconsole.log(invertirArray([1, 2, 3, 4]));`,
        solutionCode: `function invertirArray(arr) {\n    let izq = 0, der = arr.length - 1;\n    while (izq < der) {\n        let temp = arr[izq];\n        arr[izq] = arr[der];\n        arr[der] = temp;\n        izq++; der--;\n    }\n    return arr;\n}\n\nconsole.log(invertirArray([1, 2, 3, 4]));`
      },
      java: {
        starterCode: `public class Main {\n    public static void invertirArray(int[] arr) {\n        int izq = 0, der = arr.length - 1;\n        while (izq < arr.length) { // BUG\n            int temp = arr[izq];\n            arr[izq] = arr[der];\n            arr[der] = temp;\n            izq++; der--;\n        }\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 4};\n        invertirArray(a);\n        System.out.println(a[0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void invertirArray(int[] arr) {\n        int izq = 0, der = arr.length - 1;\n        while (izq < der) {\n            int temp = arr[izq];\n            arr[izq] = arr[der];\n            arr[der] = temp;\n            izq++; der--;\n        }\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3, 4};\n        invertirArray(a);\n        System.out.println(a[0]);\n    }\n}`
      }
    }
  },
  {
    id: 83,
    title: 'Fusión de Dos Arreglos Ordenados (Merge)',
    statement: 'Completa la comparación: si a[i] < b[j], insertamos a[i] y avanzamos i.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Compara a[i] < b[j].',
    explanation: 'El paso Merge de MergeSort combina dos arreglos ordenados seleccionando en cada turno el menor de los dos frentes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nstd::vector<int> fusionar(int a[], int na, int b[], int nb) {\n    std::vector<int> res;\n    int i = 0, j = 0;\n    while (i < na && j < nb) {\n        if (a[i] ___ b[j]) res.push_back(a[i++]);\n        else res.push_back(b[j++]);\n    }\n    while (i < na) res.push_back(a[i++]);\n    while (j < nb) res.push_back(b[j++]);\n    return res;\n}\n\nint main() {\n    int x[] = {1, 4, 7}, y[] = {2, 3, 8};\n    auto r = fusionar(x, 3, y, 3);\n    std::cout << r[1] << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nstd::vector<int> fusionar(int a[], int na, int b[], int nb) {\n    std::vector<int> res;\n    int i = 0, j = 0;\n    while (i < na && j < nb) {\n        if (a[i] < b[j]) res.push_back(a[i++]);\n        else res.push_back(b[j++]);\n    }\n    while (i < na) res.push_back(a[i++]);\n    while (j < nb) res.push_back(b[j++]);\n    return res;\n}\n\nint main() {\n    int x[] = {1, 4, 7}, y[] = {2, 3, 8};\n    auto r = fusionar(x, 3, y, 3);\n    std::cout << r[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['<', '<=']
      },
      python: {
        starterCode: `def fusionar(a, b):\n    res = []\n    i, j = 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] ___ b[j]:\n            res.append(a[i]); i += 1\n        else:\n            res.append(b[j]); j += 1\n    return res + a[i:] + b[j:]\n\nprint(fusionar([1, 4, 7], [2, 3, 8]))`,
        solutionCode: `def fusionar(a, b):\n    res = []\n    i, j = 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] < b[j]:\n            res.append(a[i]); i += 1\n        else:\n            res.append(b[j]); j += 1\n    return res + a[i:] + b[j:]\n\nprint(fusionar([1, 4, 7], [2, 3, 8]))`,
        acceptedKeywords: ['<', '<=']
      },
      javascript: {
        starterCode: `function fusionar(a, b) {\n    let res = [], i = 0, j = 0;\n    while (i < a.length && j < b.length) {\n        if (a[i] ___ b[j]) res.push(a[i++]);\n        else res.push(b[j++]);\n    }\n    return res.concat(a.slice(i)).concat(b.slice(j));\n}\n\nconsole.log(fusionar([1, 4, 7], [2, 3, 8]));`,
        solutionCode: `function fusionar(a, b) {\n    let res = [], i = 0, j = 0;\n    while (i < a.length && j < b.length) {\n        if (a[i] < b[j]) res.push(a[i++]);\n        else res.push(b[j++]);\n    }\n    return res.concat(a.slice(i)).concat(b.slice(j));\n}\n\nconsole.log(fusionar([1, 4, 7], [2, 3, 8]));`,
        acceptedKeywords: ['<', '<=']
      },
      java: {
        starterCode: `public class Main {\n    public static int[] fusionar(int[] a, int[] b) {\n        int[] res = new int[a.length + b.length];\n        int i = 0, j = 0, k = 0;\n        while (i < a.length && j < b.length) {\n            if (a[i] ___ b[j]) res[k++] = a[i++];\n            else res[k++] = b[j++];\n        }\n        while (i < a.length) res[k++] = a[i++];\n        while (j < b.length) res[k++] = b[j++];\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = fusionar(new int[]{1, 4, 7}, new int[]{2, 3, 8});\n        System.out.println(r[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static int[] fusionar(int[] a, int[] b) {\n        int[] res = new int[a.length + b.length];\n        int i = 0, j = 0, k = 0;\n        while (i < a.length && j < b.length) {\n            if (a[i] < b[j]) res[k++] = a[i++];\n            else res[k++] = b[j++];\n        }\n        while (i < a.length) res[k++] = a[i++];\n        while (j < b.length) res[k++] = b[j++];\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] r = fusionar(new int[]{1, 4, 7}, new int[]{2, 3, 8});\n        System.out.println(r[1]);\n    }\n}`,
        acceptedKeywords: ['<', '<=']
      }
    }
  },
  {
    id: 84,
    title: 'Comprimir Cadena (Run-Length Encoding)',
    statement: 'Corrige la concatenación del carácter con su contador de repeticiones continuas.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Concatena el carácter actual con el número count (ej. texto[i] + count).',
    explanation: 'El algoritmo Run-Length resume secuencias consecutivas repetidas (ej. "aaa" -> "a3").',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nstd::string comprimir(std::string s) {\n    std::string res = "";\n    int n = s.length();\n    for (int i = 0; i < n; i++) {\n        int count = 1;\n        while (i + 1 < n && s[i] == s[i + 1]) {\n            count++; i++;\n        }\n        // BUG: Olvida añadir el contador\n        res += s[i];\n    }\n    return res;\n}\n\nint main() {\n    std::cout << comprimir("aaabbc") << std::endl; // "a3b2c1"\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nstd::string comprimir(std::string s) {\n    std::string res = "";\n    int n = s.length();\n    for (int i = 0; i < n; i++) {\n        int count = 1;\n        while (i + 1 < n && s[i] == s[i + 1]) {\n            count++; i++;\n        }\n        res += s[i] + std::to_string(count);\n    }\n    return res;\n}\n\nint main() {\n    std::cout << comprimir("aaabbc") << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def comprimir(s):\n    res = ""\n    i = 0\n    while i < len(s):\n        count = 1\n        while i + 1 < len(s) and s[i] == s[i + 1]:\n            count += 1\n            i += 1\n        res += s[i] # BUG\n        i += 1\n    return res\n\nprint(comprimir("aaabbc"))`,
        solutionCode: `def comprimir(s):\n    res = ""\n    i = 0\n    while i < len(s):\n        count = 1\n        while i + 1 < len(s) and s[i] == s[i + 1]:\n            count += 1\n            i += 1\n        res += s[i] + str(count)\n        i += 1\n    return res\n\nprint(comprimir("aaabbc"))`
      },
      javascript: {
        starterCode: `function comprimir(s) {\n    let res = "", i = 0;\n    while (i < s.length) {\n        let count = 1;\n        while (i + 1 < s.length && s[i] === s[i + 1]) {\n            count++; i++;\n        }\n        res += s[i]; // BUG\n        i++;\n    }\n    return res;\n}\n\nconsole.log(comprimir("aaabbc"));`,
        solutionCode: `function comprimir(s) {\n    let res = "", i = 0;\n    while (i < s.length) {\n        let count = 1;\n        while (i + 1 < s.length && s[i] === s[i + 1]) {\n            count++; i++;\n        }\n        res += s[i] + count;\n        i++;\n    }\n    return res;\n}\n\nconsole.log(comprimir("aaabbc"));`
      },
      java: {
        starterCode: `public class Main {\n    public static String comprimir(String s) {\n        StringBuilder res = new StringBuilder();\n        int i = 0;\n        while (i < s.length()) {\n            int count = 1;\n            while (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {\n                count++; i++;\n            }\n            res.append(s.charAt(i)); // BUG\n            i++;\n        }\n        return res.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(comprimir("aaabbc"));\n    }\n}`,
        solutionCode: `public class Main {\n    public static String comprimir(String s) {\n        StringBuilder res = new StringBuilder();\n        int i = 0;\n        while (i < s.length()) {\n            int count = 1;\n            while (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {\n                count++; i++;\n            }\n            res.append(s.charAt(i)).append(count);\n            i++;\n        }\n        return res.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(comprimir("aaabbc"));\n    }\n}`
      }
    }
  },
  {
    id: 85,
    title: 'Memoización de Fibonacci',
    statement: 'Completa la consulta a la tabla de memoria para reutilizar resultados calculados previamente.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Si memo[n] != -1 o memo[n] != 0 retornamos memo[n].',
    explanation: 'La memoización almacena en memoria caché los subproblemas resueltos para evitar recomputaciones exponenciales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nlong long fibMemo(int n, std::vector<long long> &memo) {\n    if (n <= 1) return n;\n    if (memo[n] != -1) return ___;\n    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    return memo[n];\n}\n\nint main() {\n    std::vector<long long> memo(50, -1);\n    std::cout << fibMemo(40, memo) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nlong long fibMemo(int n, std::vector<long long> &memo) {\n    if (n <= 1) return n;\n    if (memo[n] != -1) return memo[n];\n    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    return memo[n];\n}\n\nint main() {\n    std::vector<long long> memo(50, -1);\n    std::cout << fibMemo(40, memo) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['memo[n]']
      },
      python: {
        starterCode: `def fib_memo(n, memo={}):\n    if n <= 1:\n        return n\n    if n in memo:\n        return ___\n    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    return memo[n]\n\nprint(fib_memo(40))`,
        solutionCode: `def fib_memo(n, memo={}):\n    if n <= 1:\n        return n\n    if n in memo:\n        return memo[n]\n    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)\n    return memo[n]\n\nprint(fib_memo(40))`,
        acceptedKeywords: ['memo[n]']
      },
      javascript: {
        starterCode: `function fibMemo(n, memo = {}) {\n    if (n <= 1) return n;\n    if (n in memo) return ___;\n    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    return memo[n];\n}\n\nconsole.log(fibMemo(40));`,
        solutionCode: `function fibMemo(n, memo = {}) {\n    if (n <= 1) return n;\n    if (n in memo) return memo[n];\n    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n    return memo[n];\n}\n\nconsole.log(fibMemo(40));`,
        acceptedKeywords: ['memo[n]']
      },
      java: {
        starterCode: `public class Main {\n    public static long fibMemo(int n, long[] memo) {\n        if (n <= 1) return n;\n        if (memo[n] != 0) return ___;\n        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n        return memo[n];\n    }\n    public static void main(String[] args) {\n        long[] memo = new long[50];\n        System.out.println(fibMemo(40, memo));\n    }\n}`,
        solutionCode: `public class Main {\n    public static long fibMemo(int n, long[] memo) {\n        if (n <= 1) return n;\n        if (memo[n] != 0) return memo[n];\n        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n        return memo[n];\n    }\n    public static void main(String[] args) {\n        long[] memo = new long[50];\n        System.out.println(fibMemo(40, memo));\n    }\n}`,
        acceptedKeywords: ['memo[n]']
      }
    }
  },
  {
    id: 86,
    title: 'Ordenamiento Burbuja (Intercambio Condicional)',
    statement: 'Corrige la condición: si arr[j] > arr[j + 1], se intercambian para desplazar los mayores al final.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Debe ser arr[j] > arr[j + 1] (orden ascendente).',
    explanation: 'En el algoritmo de la burbuja, los elementos adyacentes desordenados se intercambian repetidamente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <algorithm>\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            // BUG: Condición invertida ordena descendente\n            if (arr[j] < arr[j + 1]) {\n                std::swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}\n\nint main() {\n    int a[] = {5, 1, 4, 2, 8};\n    bubbleSort(a, 5);\n    std::cout << a[0] << std::endl; // Debe dar 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <algorithm>\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                std::swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}\n\nint main() {\n    int a[] = {5, 1, 4, 2, 8};\n    bubbleSort(a, 5);\n    std::cout << a[0] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(n - i - 1):\n            if arr[j] < arr[j + 1]: # BUG\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nprint(bubble_sort([5, 1, 4, 2, 8]))`,
        solutionCode: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n - 1):\n        for j in range(n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nprint(bubble_sort([5, 1, 4, 2, 8]))`
      },
      javascript: {
        starterCode: `function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] < arr[j + 1]) { // BUG\n                let t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n            }\n        }\n    }\n    return arr;\n}\n\nconsole.log(bubbleSort([5, 1, 4, 2, 8]));`,
        solutionCode: `function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                let t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n            }\n        }\n    }\n    return arr;\n}\n\nconsole.log(bubbleSort([5, 1, 4, 2, 8]));`
      },
      java: {
        starterCode: `public class Main {\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] < arr[j + 1]) { // BUG\n                    int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n                }\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[] a = {5, 1, 4, 2, 8};\n        bubbleSort(a);\n        System.out.println(a[0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n                }\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[] a = {5, 1, 4, 2, 8};\n        bubbleSort(a);\n        System.out.println(a[0]);\n    }\n}`
      }
    }
  },
  {
    id: 87,
    title: 'Verificar Anagramas Simples',
    statement: 'Completa la igualdad de frecuencias ordenadas o conteo de letras.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Dos palabras son anagramas si al ordenar sus caracteres resultan exactamente iguales (s1 == s2).',
    explanation: 'Un anagrama contiene las mismas letras con la misma multiplicidad pero en distinto orden.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n#include <algorithm>\n\nbool sonAnagramas(std::string a, std::string b) {\n    if (a.length() != b.length()) return false;\n    std::sort(a.begin(), a.end());\n    std::sort(b.begin(), b.end());\n    return a ___ b;\n}\n\nint main() {\n    std::cout << std::boolalpha << sonAnagramas("roma", "amor") << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n#include <algorithm>\n\nbool sonAnagramas(std::string a, std::string b) {\n    if (a.length() != b.length()) return false;\n    std::sort(a.begin(), a.end());\n    std::sort(b.begin(), b.end());\n    return a == b;\n}\n\nint main() {\n    std::cout << std::boolalpha << sonAnagramas("roma", "amor") << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['==', '===']
      },
      python: {
        starterCode: `def son_anagramas(a, b):\n    return sorted(a) ___ sorted(b)\n\nprint(son_anagramas("roma", "amor"))`,
        solutionCode: `def son_anagramas(a, b):\n    return sorted(a) == sorted(b)\n\nprint(son_anagramas("roma", "amor"))`,
        acceptedKeywords: ['==']
      },
      javascript: {
        starterCode: `function sonAnagramas(a, b) {\n    return a.split('').sort().join('') ___ b.split('').sort().join('');\n}\n\nconsole.log(sonAnagramas("roma", "amor"));`,
        solutionCode: `function sonAnagramas(a, b) {\n    return a.split('').sort().join('') === b.split('').sort().join('');\n}\n\nconsole.log(sonAnagramas("roma", "amor"));`,
        acceptedKeywords: ['===', '==']
      },
      java: {
        starterCode: `import java.util.Arrays;\n\npublic class Main {\n    public static boolean sonAnagramas(String a, String b) {\n        char[] c1 = a.toCharArray();\n        char[] c2 = b.toCharArray();\n        Arrays.sort(c1);\n        Arrays.sort(c2);\n        return Arrays.equals(c1, ___);\n    }\n    public static void main(String[] args) {\n        System.out.println(sonAnagramas("roma", "amor"));\n    }\n}`,
        solutionCode: `import java.util.Arrays;\n\npublic class Main {\n    public static boolean sonAnagramas(String a, String b) {\n        char[] c1 = a.toCharArray();\n        char[] c2 = b.toCharArray();\n        Arrays.sort(c1);\n        Arrays.sort(c2);\n        return Arrays.equals(c1, c2);\n    }\n    public static void main(String[] args) {\n        System.out.println(sonAnagramas("roma", "amor"));\n    }\n}`,
        acceptedKeywords: ['c2']
      }
    }
  },
  {
    id: 88,
    title: 'Intersección de Dos Conjuntos/Arreglos',
    statement: 'Corrige la búsqueda de existencia en el segundo conjunto.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Verifica si el elemento del primer arreglo está presente en el segundo.',
    explanation: 'La intersección contiene los elementos comunes que pertenecen simultáneamente a ambos conjuntos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nstd::vector<int> interseccion(int a[], int na, int b[], int nb) {\n    std::vector<int> res;\n    for (int i = 0; i < na; i++) {\n        // BUG: Verifica si NO está presente\n        if (std::find(b, b + nb, a[i]) == b + nb) {\n            res.push_back(a[i]);\n        }\n    }\n    return res;\n}\n\nint main() {\n    int x[] = {1, 2, 3}, y[] = {2, 3, 4};\n    auto r = interseccion(x, 3, y, 3);\n    std::cout << r.size() << std::endl; // Debe dar 2 (elementos 2 y 3)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nstd::vector<int> interseccion(int a[], int na, int b[], int nb) {\n    std::vector<int> res;\n    for (int i = 0; i < na; i++) {\n        if (std::find(b, b + nb, a[i]) != b + nb) {\n            res.push_back(a[i]);\n        }\n    }\n    return res;\n}\n\nint main() {\n    int x[] = {1, 2, 3}, y[] = {2, 3, 4};\n    auto r = interseccion(x, 3, y, 3);\n    std::cout << r.size() << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def interseccion(a, b):\n    return [x for x in a if x not in b] # BUG\n\nprint(interseccion([1, 2, 3], [2, 3, 4]))`,
        solutionCode: `def interseccion(a, b):\n    return [x for x in a if x in b]\n\nprint(interseccion([1, 2, 3], [2, 3, 4]))`
      },
      javascript: {
        starterCode: `function interseccion(a, b) {\n    return a.filter(x => !b.includes(x)); // BUG\n}\n\nconsole.log(interseccion([1, 2, 3], [2, 3, 4]));`,
        solutionCode: `function interseccion(a, b) {\n    return a.filter(x => b.includes(x));\n}\n\nconsole.log(interseccion([1, 2, 3], [2, 3, 4]));`
      },
      java: {
        starterCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static ArrayList<Integer> interseccion(int[] a, int[] b) {\n        ArrayList<Integer> res = new ArrayList<>();\n        for (int x : a) {\n            boolean found = false;\n            for (int y : b) if (x == y) { found = true; break; }\n            if (!found) res.add(x); // BUG\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(interseccion(new int[]{1, 2, 3}, new int[]{2, 3, 4}).size());\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\nimport java.util.Arrays;\n\npublic class Main {\n    public static ArrayList<Integer> interseccion(int[] a, int[] b) {\n        ArrayList<Integer> res = new ArrayList<>();\n        for (int x : a) {\n            boolean found = false;\n            for (int y : b) if (x == y) { found = true; break; }\n            if (found) res.add(x);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(interseccion(new int[]{1, 2, 3}, new int[]{2, 3, 4}).size());\n    }\n}`
      }
    }
  },
  {
    id: 89,
    title: 'Función de Orden Superior: Filter Manual',
    statement: 'Completa la condición: si el predicado test(arr[i]) es verdadero, se agrega el elemento a la colección resultante.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Evalúa test(arr[i]) en la condición if.',
    explanation: 'El patrón Filter construye una nueva colección conservando solo los elementos que superan un test lógico.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <functional>\n\nstd::vector<int> filtrar(int arr[], int n, std::function<bool(int)> test) {\n    std::vector<int> res;\n    for (int i = 0; i < n; i++) {\n        if (test(___)) res.push_back(arr[i]);\n    }\n    return res;\n}\n\nint main() {\n    int a[] = {1, 2, 3, 4, 5, 6};\n    auto r = filtrar(a, 6, [](int x) { return x % 2 == 0; });\n    std::cout << r.size() << std::endl; // 3 pares\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <functional>\n\nstd::vector<int> filtrar(int arr[], int n, std::function<bool(int)> test) {\n    std::vector<int> res;\n    for (int i = 0; i < n; i++) {\n        if (test(arr[i])) res.push_back(arr[i]);\n    }\n    return res;\n}\n\nint main() {\n    int a[] = {1, 2, 3, 4, 5, 6};\n    auto r = filtrar(a, 6, [](int x) { return x % 2 == 0; });\n    std::cout << r.size() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['arr[i]']
      },
      python: {
        starterCode: `def filtrar(arr, test):\n    return [x for x in arr if test(___)]\n\nprint(filtrar([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0))`,
        solutionCode: `def filtrar(arr, test):\n    return [x for x in arr if test(x)]\n\nprint(filtrar([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0))`,
        acceptedKeywords: ['x']
      },
      javascript: {
        starterCode: `function filtrar(arr, test) {\n    let res = [];\n    for (let x of arr) {\n        if (test(___)) res.push(x);\n    }\n    return res;\n}\n\nconsole.log(filtrar([1, 2, 3, 4, 5, 6], x => x % 2 === 0));`,
        solutionCode: `function filtrar(arr, test) {\n    let res = [];\n    for (let x of arr) {\n        if (test(x)) res.push(x);\n    }\n    return res;\n}\n\nconsole.log(filtrar([1, 2, 3, 4, 5, 6], x => x % 2 === 0));`,
        acceptedKeywords: ['x']
      },
      java: {
        starterCode: `import java.util.ArrayList;\nimport java.util.function.Predicate;\n\npublic class Main {\n    public static ArrayList<Integer> filtrar(int[] arr, Predicate<Integer> test) {\n        ArrayList<Integer> res = new ArrayList<>();\n        for (int x : arr) {\n            if (test.test(___)) res.add(x);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(filtrar(new int[]{1, 2, 3, 4, 5, 6}, x -> x % 2 == 0).size());\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\nimport java.util.function.Predicate;\n\npublic class Main {\n    public static ArrayList<Integer> filtrar(int[] arr, Predicate<Integer> test) {\n        ArrayList<Integer> res = new ArrayList<>();\n        for (int x : arr) {\n            if (test.test(x)) res.add(x);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(filtrar(new int[]{1, 2, 3, 4, 5, 6}, x -> x % 2 == 0).size());\n    }\n}`,
        acceptedKeywords: ['x']
      }
    }
  },
  {
    id: 90,
    title: 'Eliminar Duplicados de Arreglo Ordenado',
    statement: 'Corrige la actualización del puntero de elementos únicos: arr[++idx] = arr[i].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Cuando encontramos un elemento distinto a arr[idx], incrementamos idx y copiamos el nuevo valor.',
    explanation: 'El algoritmo de dos punteros permite eliminar duplicados in-place en tiempo lineal O(n) y espacio O(1).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint removerDuplicados(int arr[], int n) {\n    if (n == 0) return 0;\n    int idx = 0;\n    for (int i = 1; i < n; i++) {\n        // BUG: Compara con arr[i-1] sin actualizar idx correctamente\n        if (arr[i] != arr[idx]) {\n            arr[idx] = arr[i];\n        }\n    }\n    return idx + 1;\n}\n\nint main() {\n    int a[] = {1, 1, 2, 2, 3, 4, 4};\n    int nuevaLen = removerDuplicados(a, 7);\n    std::cout << nuevaLen << std::endl; // Debe dar 4 ([1, 2, 3, 4])\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint removerDuplicados(int arr[], int n) {\n    if (n == 0) return 0;\n    int idx = 0;\n    for (int i = 1; i < n; i++) {\n        if (arr[i] != arr[idx]) {\n            idx++;\n            arr[idx] = arr[i];\n        }\n    }\n    return idx + 1;\n}\n\nint main() {\n    int a[] = {1, 1, 2, 2, 3, 4, 4};\n    int nuevaLen = removerDuplicados(a, 7);\n    std::cout << nuevaLen << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def remover_duplicados(arr):\n    if not arr:\n        return 0\n    idx = 0\n    for i in range(1, len(arr)):\n        if arr[i] != arr[idx]:\n            arr[idx] = arr[i] # BUG\n    return idx + 1\n\nlista = [1, 1, 2, 2, 3, 4, 4]\nprint(remover_duplicados(lista))`,
        solutionCode: `def remover_duplicados(arr):\n    if not arr:\n        return 0\n    idx = 0\n    for i in range(1, len(arr)):\n        if arr[i] != arr[idx]:\n            idx += 1\n            arr[idx] = arr[i]\n    return idx + 1\n\nlista = [1, 1, 2, 2, 3, 4, 4]\nprint(remover_duplicados(lista))`
      },
      javascript: {
        starterCode: `function removerDuplicados(arr) {\n    if (arr.length === 0) return 0;\n    let idx = 0;\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] !== arr[idx]) {\n            arr[idx] = arr[i]; // BUG\n        }\n    }\n    return idx + 1;\n}\n\nconsole.log(removerDuplicados([1, 1, 2, 2, 3, 4, 4]));`,
        solutionCode: `function removerDuplicados(arr) {\n    if (arr.length === 0) return 0;\n    let idx = 0;\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] !== arr[idx]) {\n            idx++;\n            arr[idx] = arr[i];\n        }\n    }\n    return idx + 1;\n}\n\nconsole.log(removerDuplicados([1, 1, 2, 2, 3, 4, 4]));`
      },
      java: {
        starterCode: `public class Main {\n    public static int removerDuplicados(int[] arr) {\n        if (arr.length == 0) return 0;\n        int idx = 0;\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] != arr[idx]) {\n                arr[idx] = arr[i]; // BUG\n            }\n        }\n        return idx + 1;\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 1, 2, 2, 3, 4, 4};\n        System.out.println(removerDuplicados(a));\n    }\n}`,
        solutionCode: `public class Main {\n    public static int removerDuplicados(int[] arr) {\n        if (arr.length == 0) return 0;\n        int idx = 0;\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] != arr[idx]) {\n                idx++;\n                arr[idx] = arr[i];\n            }\n        }\n        return idx + 1;\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 1, 2, 2, 3, 4, 4};\n        System.out.println(removerDuplicados(a));\n    }\n}`
      }
    }
  }
];
