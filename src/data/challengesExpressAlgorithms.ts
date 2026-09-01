import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressAlgorithmsExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 801 al 810 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 801,
    title: 'Búsqueda Lineal (Retorno de Índice o -1)',
    statement: 'Completa el valor de retorno predeterminado -1 cuando el objetivo no se encuentra en el arreglo.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Retorna -1 si no fue encontrado.',
    explanation: 'La búsqueda lineal devuelve el índice de la primera coincidencia o -1 como código de ausencia.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint buscar(const std::vector<int> &v, int obj) {\n    for (size_t i = 0; i < v.size(); i++) {\n        if (v[i] == obj) return i;\n    }\n    return ___;\n}\n\nint main() {\n    std::cout << buscar({10, 20, 30}, 99) << std::endl; // -1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint buscar(const std::vector<int> &v, int obj) {\n    for (size_t i = 0; i < v.size(); i++) {\n        if (v[i] == obj) return i;\n    }\n    return -1;\n}\n\nint main() {\n    std::cout << buscar({10, 20, 30}, 99) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['-1']
      },
      python: {
        starterCode: `def buscar(v, obj):\n    for i in range(len(v)):\n        if v[i] == obj: return i\n    return ___\n\nprint(buscar([10, 20, 30], 99))`,
        solutionCode: `def buscar(v, obj):\n    for i in range(len(v)):\n        if v[i] == obj: return i\n    return -1\n\nprint(buscar([10, 20, 30], 99))`,
        acceptedKeywords: ['-1']
      },
      javascript: {
        starterCode: `function buscar(v, obj) {\n    for (let i = 0; i < v.length; i++) {\n        if (v[i] === obj) return i;\n    }\n    return ___;\n}\nconsole.log(buscar([10, 20, 30], 99));`,
        solutionCode: `function buscar(v, obj) {\n    for (let i = 0; i < v.length; i++) {\n        if (v[i] === obj) return i;\n    }\n    return -1;\n}\nconsole.log(buscar([10, 20, 30], 99));`,
        acceptedKeywords: ['-1']
      },
      java: {
        starterCode: `public class Main {\n    static int buscar(int[] v, int obj) {\n        for (int i = 0; i < v.length; i++) {\n            if (v[i] == obj) return i;\n        }\n        return ___;\n    }\n    public static void main(String[] args) {\n        System.out.println(buscar(new int[]{10, 20, 30}, 99));\n    }\n}`,
        solutionCode: `public class Main {\n    static int buscar(int[] v, int obj) {\n        for (int i = 0; i < v.length; i++) {\n            if (v[i] == obj) return i;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(buscar(new int[]{10, 20, 30}, 99));\n    }\n}`,
        acceptedKeywords: ['-1']
      }
    }
  },
  {
    id: 802,
    title: 'Intercambio de Posiciones (Swap en Arreglo)',
    statement: 'Corrige la variable temporal para intercambiar correctamente los elementos v[i] y v[j].',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa temp = v[i]; v[i] = v[j]; v[j] = temp;',
    explanation: 'El swap elemental preserva el valor de la primera celda en una variable auxiliar temporal.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {10, 20};\n    int temp = v[0];\n    // BUG: Sobreescribe antes de guardar\n    v[0] = v[1];\n    v[1] = temp;\n    std::cout << v[0] << " " << v[1] << std::endl; // 20 10\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {10, 20};\n    int temp = v[0];\n    v[0] = v[1];\n    v[1] = temp;\n    std::cout << v[0] << " " << v[1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [10, 20]\nv[0], v[1] = v[1], v[0]\nprint(v[0], v[1])`,
        solutionCode: `v = [10, 20]\nv[0], v[1] = v[1], v[0]\nprint(v[0], v[1])`
      },
      javascript: {
        starterCode: `let v = [10, 20];\nlet temp = v[0];\nv[0] = v[1];\nv[1] = temp;\nconsole.log(v[0], v[1]);`,
        solutionCode: `let v = [10, 20];\nlet temp = v[0];\nv[0] = v[1];\nv[1] = temp;\nconsole.log(v[0], v[1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {10, 20};\n        int temp = v[0];\n        v[0] = v[1];\n        v[1] = temp;\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {10, 20};\n        int temp = v[0];\n        v[0] = v[1];\n        v[1] = temp;\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`
      }
    }
  },
  {
    id: 803,
    title: 'Índice del Valor Mínimo (Selection Step)',
    statement: 'Completa la actualización del índice del mínimo: minIdx = ___ si v[i] < v[minIdx].',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Guarda minIdx = i.',
    explanation: 'El paso fundamental de Selection Sort requiere identificar la posición (índice) del menor valor restante.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {45, 12, 89, 7, 23};\n    int minIdx = 0;\n    for (size_t i = 1; i < v.size(); i++) {\n        if (v[i] < v[minIdx]) {\n            minIdx = ___;\n        }\n    }\n    std::cout << minIdx << std::endl; // 3 (valor 7)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {45, 12, 89, 7, 23};\n    int minIdx = 0;\n    for (size_t i = 1; i < v.size(); i++) {\n        if (v[i] < v[minIdx]) {\n            minIdx = i;\n        }\n    }\n    std::cout << minIdx << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['i']
      },
      python: {
        starterCode: `v = [45, 12, 89, 7, 23]\nmin_idx = 0\nfor i in range(1, len(v)):\n    if v[i] < v[min_idx]:\n        min_idx = ___\nprint(min_idx)`,
        solutionCode: `v = [45, 12, 89, 7, 23]\nmin_idx = 0\nfor i in range(1, len(v)):\n    if v[i] < v[min_idx]:\n        min_idx = i\nprint(min_idx)`,
        acceptedKeywords: ['i']
      },
      javascript: {
        starterCode: `let v = [45, 12, 89, 7, 23];\nlet minIdx = 0;\nfor (let i = 1; i < v.length; i++) {\n    if (v[i] < v[minIdx]) minIdx = ___;\n}\nconsole.log(minIdx);`,
        solutionCode: `let v = [45, 12, 89, 7, 23];\nlet minIdx = 0;\nfor (let i = 1; i < v.length; i++) {\n    if (v[i] < v[minIdx]) minIdx = i;\n}\nconsole.log(minIdx);`,
        acceptedKeywords: ['i']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {45, 12, 89, 7, 23};\n        int minIdx = 0;\n        for (int i = 1; i < v.length; i++) {\n            if (v[i] < v[minIdx]) minIdx = ___;\n        }\n        System.out.println(minIdx);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {45, 12, 89, 7, 23};\n        int minIdx = 0;\n        for (int i = 1; i < v.length; i++) {\n            if (v[i] < v[minIdx]) minIdx = i;\n        }\n        System.out.println(minIdx);\n    }\n}`,
        acceptedKeywords: ['i']
      }
    }
  },
  {
    id: 804,
    title: 'Ordenamiento Ascendente Estándar',
    statement: 'Corrige la llamada a la función de ordenamiento nativa.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa std::sort en C++, sort() en Python/JS o Arrays.sort en Java.',
    explanation: 'Los algoritmos de ordenamiento estándar de cada lenguaje están altamente optimizados (Introsort / Timsort).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {5, 2, 8, 1};\n    std::sort(v.begin(), v.end());\n    std::cout << v[0] << " " << v[1] << std::endl; // 1 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {5, 2, 8, 1};\n    std::sort(v.begin(), v.end());\n    std::cout << v[0] << " " << v[1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [5, 2, 8, 1]\nv.sort()\nprint(v[0], v[1])`,
        solutionCode: `v = [5, 2, 8, 1]\nv.sort()\nprint(v[0], v[1])`
      },
      javascript: {
        starterCode: `let v = [5, 2, 8, 1];\nv.sort((a, b) => a - b);\nconsole.log(v[0], v[1]);`,
        solutionCode: `let v = [5, 2, 8, 1];\nv.sort((a, b) => a - b);\nconsole.log(v[0], v[1]);`
      },
      java: {
        starterCode: `import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] v = {5, 2, 8, 1};\n        Arrays.sort(v);\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        solutionCode: `import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] v = {5, 2, 8, 1};\n        Arrays.sort(v);\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`
      }
    }
  },
  {
    id: 805,
    title: 'Comparación de Burbuja Adyacente (Bubble Step)',
    statement: 'Completa la condición para intercambiar si el elemento actual supera al siguiente (v[i] > v[i + ___]).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Compara con la posición adyacente i + 1.',
    explanation: 'El algoritmo Bubble Sort compara pares adyacentes de elementos contiguos e intercambia si están en desorden.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {4, 2, 1};\n    if (v[0] > v[0 + ___]) {\n        std::swap(v[0], v[1]);\n    }\n    std::cout << v[0] << " " << v[1] << std::endl; // 2 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {4, 2, 1};\n    if (v[0] > v[0 + 1]) {\n        std::swap(v[0], v[1]);\n    }\n    std::cout << v[0] << " " << v[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `v = [4, 2, 1]\nif v[0] > v[0 + ___]:\n    v[0], v[1] = v[1], v[0]\nprint(v[0], v[1])`,
        solutionCode: `v = [4, 2, 1]\nif v[0] > v[0 + 1]:\n    v[0], v[1] = v[1], v[0]\nprint(v[0], v[1])`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `let v = [4, 2, 1];\nif (v[0] > v[0 + ___]) {\n    [v[0], v[1]] = [v[1], v[0]];\n}\nconsole.log(v[0], v[1]);`,
        solutionCode: `let v = [4, 2, 1];\nif (v[0] > v[0 + 1]) {\n    [v[0], v[1]] = [v[1], v[0]];\n}\nconsole.log(v[0], v[1]);`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {4, 2, 1};\n        if (v[0] > v[0 + ___]) {\n            int t = v[0]; v[0] = v[1]; v[1] = t;\n        }\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {4, 2, 1};\n        if (v[0] > v[0 + 1]) {\n            int t = v[0]; v[0] = v[1]; v[1] = t;\n        }\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 806,
    title: 'Comprobación de Orden Ascendente Estricto',
    statement: 'Corrige la condición: si v[i] >= v[i + 1] el arreglo no es estrictamente creciente.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Comprueba if (v[i] >= v[i + 1]) return false;',
    explanation: 'Una secuencia estrictamente creciente no permite elementos repetidos ni descensos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nbool esEstrictamenteCreciente(const std::vector<int> &v) {\n    for (size_t i = 0; i < v.size() - 1; i++) {\n        // BUG: Permite duplicados\n        if (v[i] >= v[i + 1]) return false;\n    }\n    return true;\n}\n\nint main() {\n    std::cout << std::boolalpha << esEstrictamenteCreciente({1, 2, 2, 4}) << std::endl; // false\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nbool esEstrictamenteCreciente(const std::vector<int> &v) {\n    for (size_t i = 0; i < v.size() - 1; i++) {\n        if (v[i] >= v[i + 1]) return false;\n    }\n    return true;\n}\n\nint main() {\n    std::cout << std::boolalpha << esEstrictamenteCreciente({1, 2, 2, 4}) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def es_creciente(v):\n    return all(v[i] < v[i+1] for i in range(len(v)-1))\n\nprint(es_creciente([1, 2, 2, 4]))`,
        solutionCode: `def es_creciente(v):\n    return all(v[i] < v[i+1] for i in range(len(v)-1))\n\nprint(es_creciente([1, 2, 2, 4]))`
      },
      javascript: {
        starterCode: `function esCreciente(v) {\n    for (let i = 0; i < v.length - 1; i++) {\n        if (v[i] >= v[i + 1]) return false;\n    }\n    return true;\n}\nconsole.log(esCreciente([1, 2, 2, 4]));`,
        solutionCode: `function esCreciente(v) {\n    for (let i = 0; i < v.length - 1; i++) {\n        if (v[i] >= v[i + 1]) return false;\n    }\n    return true;\n}\nconsole.log(esCreciente([1, 2, 2, 4]));`
      },
      java: {
        starterCode: `public class Main {\n    static boolean esCreciente(int[] v) {\n        for (int i = 0; i < v.length - 1; i++) {\n            if (v[i] >= v[i + 1]) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(esCreciente(new int[]{1, 2, 2, 4}));\n    }\n}`,
        solutionCode: `public class Main {\n    static boolean esCreciente(int[] v) {\n        for (int i = 0; i < v.length - 1; i++) {\n            if (v[i] >= v[i + 1]) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(esCreciente(new int[]{1, 2, 2, 4}));\n    }\n}`
      }
    }
  },
  {
    id: 807,
    title: 'Ordenamiento Descendente (Mayor a Menor)',
    statement: 'Completa el comparador de orden descendente: std::greater<int>() / (b - a).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'En JS usa (b - a), en C++ std::greater<int>(), en Python reverse=True.',
    explanation: 'Invertir el criterio de comparación produce un ordenamiento descendente de mayor a menor.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {10, 50, 20};\n    std::sort(v.begin(), v.end(), std::___<int>());\n    std::cout << v[0] << std::endl; // 50\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {10, 50, 20};\n    std::sort(v.begin(), v.end(), std::greater<int>());\n    std::cout << v[0] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['greater']
      },
      python: {
        starterCode: `v = [10, 50, 20]\nv.sort(___=True)\nprint(v[0])`,
        solutionCode: `v = [10, 50, 20]\nv.sort(reverse=True)\nprint(v[0])`,
        acceptedKeywords: ['reverse']
      },
      javascript: {
        starterCode: `let v = [10, 50, 20];\nv.sort((a, b) => b - ___);\nconsole.log(v[0]);`,
        solutionCode: `let v = [10, 50, 20];\nv.sort((a, b) => b - a);\nconsole.log(v[0]);`,
        acceptedKeywords: ['a']
      },
      java: {
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Integer[] v = {10, 50, 20};\n        Arrays.sort(v, Collections.reverseOrder());\n        System.out.println(v[0]);\n    }\n}`,
        solutionCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Integer[] v = {10, 50, 20};\n        Arrays.sort(v, Collections.reverseOrder());\n        System.out.println(v[0]);\n    }\n}`
      }
    }
  },
  {
    id: 808,
    title: 'Parada Temprana en Bubble Sort (Optimizada con Bandera)',
    statement: 'Corrige la condición de parada: si huboIntercambio es false, el arreglo ya está ordenado.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Si !huboIntercambio haz break.',
    explanation: 'Si en una pasada completa no se realiza ningún intercambio, el arreglo está ordenado y podemos terminar en O(N).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {1, 2, 3, 4};\n    bool huboIntercambio = false;\n    // Si no hubo cambios:\n    if (!huboIntercambio) {\n        std::cout << "Parada temprana" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {1, 2, 3, 4};\n    bool huboIntercambio = false;\n    if (!huboIntercambio) {\n        std::cout << "Parada temprana" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `hubo_cambio = False\nif not hubo_cambio:\n    print("Parada temprana")`,
        solutionCode: `hubo_cambio = False\nif not hubo_cambio:\n    print("Parada temprana")`
      },
      javascript: {
        starterCode: `let huboCambio = false;\nif (!huboCambio) console.log("Parada temprana");`,
        solutionCode: `let huboCambio = false;\nif (!huboCambio) console.log("Parada temprana");`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean huboCambio = false;\n        if (!huboCambio) System.out.println("Parada temprana");\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean huboCambio = false;\n        if (!huboCambio) System.out.println("Parada temprana");\n    }\n}`
      }
    }
  },
  {
    id: 809,
    title: 'Cálculo del Punto Medio en Búsqueda Binaria',
    statement: 'Completa la fórmula segura de punto medio: medio = izq + (der - izq) / ___.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Divide el rango entre 2.',
    explanation: 'La fórmula izq + (der - izq) / 2 previene el desbordamiento de enteros cuando izq + der excede INT_MAX.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int izq = 0, der = 10;\n    int medio = izq + (der - izq) / ___;\n    std::cout << medio << std::endl; // 5\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int izq = 0, der = 10;\n    int medio = izq + (der - izq) / 2;\n    std::cout << medio << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['2']
      },
      python: {
        starterCode: `izq, der = 0, 10\nmedio = izq + (der - izq) // ___\nprint(medio)`,
        solutionCode: `izq, der = 0, 10\nmedio = izq + (der - izq) // 2\nprint(medio)`,
        acceptedKeywords: ['2']
      },
      javascript: {
        starterCode: `let izq = 0, der = 10;\nlet medio = izq + Math.floor((der - izq) / ___);\nconsole.log(medio);`,
        solutionCode: `let izq = 0, der = 10;\nlet medio = izq + Math.floor((der - izq) / 2);\nconsole.log(medio);`,
        acceptedKeywords: ['2']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int izq = 0, der = 10;\n        int medio = izq + (der - izq) / ___;\n        System.out.println(medio);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int izq = 0, der = 10;\n        int medio = izq + (der - izq) / 2;\n        System.out.println(medio);\n    }\n}`,
        acceptedKeywords: ['2']
      }
    }
  },
  {
    id: 810,
    title: 'Búsqueda de Rango en Arreglo',
    statement: 'Corrige la condición: si el número está dentro del rango inclusivo [min, max].',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Comprueba x >= min && x <= max.',
    explanation: 'Filtrar por rango requiere validar simultáneamente la cota inferior y la cota superior.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {5, 12, 19, 25, 30};\n    int cont = 0;\n    for (int x : v) {\n        // BUG: || en vez de &&\n        if (x >= 10 && x <= 25) cont++;\n    }\n    std::cout << cont << std::endl; // 3 (12, 19, 25)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {5, 12, 19, 25, 30};\n    int cont = 0;\n    for (int x : v) {\n        if (x >= 10 && x <= 25) cont++;\n    }\n    std::cout << cont << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [5, 12, 19, 25, 30]\ncont = sum(1 for x in v if 10 <= x <= 25)\nprint(cont)`,
        solutionCode: `v = [5, 12, 19, 25, 30]\ncont = sum(1 for x in v if 10 <= x <= 25)\nprint(cont)`
      },
      javascript: {
        starterCode: `let v = [5, 12, 19, 25, 30];\nlet cont = v.filter(x => x >= 10 && x <= 25).length;\nconsole.log(cont);`,
        solutionCode: `let v = [5, 12, 19, 25, 30];\nlet cont = v.filter(x => x >= 10 && x <= 25).length;\nconsole.log(cont);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {5, 12, 19, 25, 30};\n        int cont = 0;\n        for (int x : v) if (x >= 10 && x <= 25) cont++;\n        System.out.println(cont);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {5, 12, 19, 25, 30};\n        int cont = 0;\n        for (int x : v) if (x >= 10 && x <= 25) cont++;\n        System.out.println(cont);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 811 al 820 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 811,
    title: 'Búsqueda Binaria Iterativa (Binary Search O(log n))',
    statement: 'Completa la actualización del puntero izquierdo izq = medio + ___ cuando el valor central es menor al objetivo.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Avanza hacia la derecha con izq = medio + 1.',
    explanation: 'Si el elemento en el punto medio es inferior al objetivo, descartamos la mitad izquierda moviendo izq = medio + 1.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint busquedaBinaria(const std::vector<int> &v, int obj) {\n    int izq = 0, der = v.size() - 1;\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] == obj) return m;\n        else if (v[m] < obj) izq = m + ___;\n        else der = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    std::cout << busquedaBinaria({2, 5, 8, 12, 16}, 12) << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint busquedaBinaria(const std::vector<int> &v, int obj) {\n    int izq = 0, der = v.size() - 1;\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] == obj) return m;\n        else if (v[m] < obj) izq = m + 1;\n        else der = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    std::cout << busquedaBinaria({2, 5, 8, 12, 16}, 12) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `def busqueda_binaria(v, obj):\n    izq, der = 0, len(v) - 1\n    while izq <= der:\n        m = izq + (der - izq) // 2\n        if v[m] == obj: return m\n        elif v[m] < obj: izq = m + ___\n        else: der = m - 1\n    return -1\n\nprint(busqueda_binaria([2, 5, 8, 12, 16], 12))`,
        solutionCode: `def busqueda_binaria(v, obj):\n    izq, der = 0, len(v) - 1\n    while izq <= der:\n        m = izq + (der - izq) // 2\n        if v[m] == obj: return m\n        elif v[m] < obj: izq = m + 1\n        else: der = m - 1\n    return -1\n\nprint(busqueda_binaria([2, 5, 8, 12, 16], 12))`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `function busquedaBinaria(v, obj) {\n    let izq = 0, der = v.length - 1;\n    while (izq <= der) {\n        let m = izq + Math.floor((der - izq) / 2);\n        if (v[m] === obj) return m;\n        else if (v[m] < obj) izq = m + ___;\n        else der = m - 1;\n    }\n    return -1;\n}\nconsole.log(busquedaBinaria([2, 5, 8, 12, 16], 12));`,
        solutionCode: `function busquedaBinaria(v, obj) {\n    let izq = 0, der = v.length - 1;\n    while (izq <= der) {\n        let m = izq + Math.floor((der - izq) / 2);\n        if (v[m] === obj) return m;\n        else if (v[m] < obj) izq = m + 1;\n        else der = m - 1;\n    }\n    return -1;\n}\nconsole.log(busquedaBinaria([2, 5, 8, 12, 16], 12));`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    static int busquedaBinaria(int[] v, int obj) {\n        int izq = 0, der = v.length - 1;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] == obj) return m;\n            else if (v[m] < obj) izq = m + ___;\n            else der = m - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(busquedaBinaria(new int[]{2, 5, 8, 12, 16}, 12));\n    }\n}`,
        solutionCode: `public class Main {\n    static int busquedaBinaria(int[] v, int obj) {\n        int izq = 0, der = v.length - 1;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] == obj) return m;\n            else if (v[m] < obj) izq = m + 1;\n            else der = m - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(busquedaBinaria(new int[]{2, 5, 8, 12, 16}, 12));\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 812,
    title: 'Selection Sort Completo (Ordenamiento por Selección)',
    statement: 'Corrige el intercambio final colocando el valor mínimo en la posición i.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Intercambia std::swap(v[i], v[minIdx]).',
    explanation: 'Selection Sort ubica el menor elemento de la porción no ordenada en la posición i de cada iteración.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {64, 25, 12, 22, 11};\n    int n = v.size();\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (v[j] < v[minIdx]) minIdx = j;\n        }\n        // BUG: Intercambio con sí mismo\n        std::swap(v[i], v[minIdx]);\n    }\n    std::cout << v[0] << " " << v[1] << std::endl; // 11 12\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {64, 25, 12, 22, 11};\n    int n = v.size();\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (v[j] < v[minIdx]) minIdx = j;\n        }\n        std::swap(v[i], v[minIdx]);\n    }\n    std::cout << v[0] << " " << v[1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [64, 25, 12, 22, 11]\nn = len(v)\nfor i in range(n - 1):\n    min_idx = i\n    for j in range(i + 1, n):\n        if v[j] < v[min_idx]: min_idx = j\n    v[i], v[min_idx] = v[min_idx], v[i]\nprint(v[0], v[1])`,
        solutionCode: `v = [64, 25, 12, 22, 11]\nn = len(v)\nfor i in range(n - 1):\n    min_idx = i\n    for j in range(i + 1, n):\n        if v[j] < v[min_idx]: min_idx = j\n    v[i], v[min_idx] = v[min_idx], v[i]\nprint(v[0], v[1])`
      },
      javascript: {
        starterCode: `let v = [64, 25, 12, 22, 11];\nlet n = v.length;\nfor (let i = 0; i < n - 1; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < n; j++) {\n        if (v[j] < v[minIdx]) minIdx = j;\n    }\n    [v[i], v[minIdx]] = [v[minIdx], v[i]];\n}\nconsole.log(v[0], v[1]);`,
        solutionCode: `let v = [64, 25, 12, 22, 11];\nlet n = v.length;\nfor (let i = 0; i < n - 1; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < n; j++) {\n        if (v[j] < v[minIdx]) minIdx = j;\n    }\n    [v[i], v[minIdx]] = [v[minIdx], v[i]];\n}\nconsole.log(v[0], v[1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {64, 25, 12, 22, 11};\n        int n = v.length;\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) if (v[j] < v[minIdx]) minIdx = j;\n            int t = v[i]; v[i] = v[minIdx]; v[minIdx] = t;\n        }\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {64, 25, 12, 22, 11};\n        int n = v.length;\n        for (int i = 0; i < n - 1; i++) {\n            int minIdx = i;\n            for (int j = i + 1; j < n; j++) if (v[j] < v[minIdx]) minIdx = j;\n            int t = v[i]; v[i] = v[minIdx]; v[minIdx] = t;\n        }\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`
      }
    }
  },
  {
    id: 813,
    title: 'Insertion Sort (Ordenamiento por Inserción)',
    statement: 'Completa la condición del bucle while para desplazar elementos mayores: j >= 0 && v[j] > ___.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Compara con la clave actual clave.',
    explanation: 'Insertion Sort inserta cada nuevo elemento en su posición correspondiente desplazando los elementos mayores a la derecha.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {12, 11, 13, 5, 6};\n    for (size_t i = 1; i < v.size(); i++) {\n        int clave = v[i];\n        int j = i - 1;\n        while (j >= 0 && v[j] > ___) {\n            v[j + 1] = v[j];\n            j--;\n        }\n        v[j + 1] = clave;\n    }\n    std::cout << v[0] << " " << v[1] << std::endl; // 5 6\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {12, 11, 13, 5, 6};\n    for (size_t i = 1; i < v.size(); i++) {\n        int clave = v[i];\n        int j = i - 1;\n        while (j >= 0 && v[j] > clave) {\n            v[j + 1] = v[j];\n            j--;\n        }\n        v[j + 1] = clave;\n    }\n    std::cout << v[0] << " " << v[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['clave', 'key']
      },
      python: {
        starterCode: `v = [12, 11, 13, 5, 6]\nfor i in range(1, len(v)):\n    clave = v[i]\n    j = i - 1\n    while j >= 0 and v[j] > ___:\n        v[j + 1] = v[j]\n        j -= 1\n    v[j + 1] = clave\nprint(v[0], v[1])`,
        solutionCode: `v = [12, 11, 13, 5, 6]\nfor i in range(1, len(v)):\n    clave = v[i]\n    j = i - 1\n    while j >= 0 and v[j] > clave:\n        v[j + 1] = v[j]\n        j -= 1\n    v[j + 1] = clave\nprint(v[0], v[1])`,
        acceptedKeywords: ['clave']
      },
      javascript: {
        starterCode: `let v = [12, 11, 13, 5, 6];\nfor (let i = 1; i < v.length; i++) {\n    let clave = v[i];\n    let j = i - 1;\n    while (j >= 0 && v[j] > ___) {\n        v[j + 1] = v[j];\n        j--;\n    }\n    v[j + 1] = clave;\n}\nconsole.log(v[0], v[1]);`,
        solutionCode: `let v = [12, 11, 13, 5, 6];\nfor (let i = 1; i < v.length; i++) {\n    let clave = v[i];\n    let j = i - 1;\n    while (j >= 0 && v[j] > clave) {\n        v[j + 1] = v[j];\n        j--;\n    }\n    v[j + 1] = clave;\n}\nconsole.log(v[0], v[1]);`,
        acceptedKeywords: ['clave']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {12, 11, 13, 5, 6};\n        for (int i = 1; i < v.length; i++) {\n            int clave = v[i];\n            int j = i - 1;\n            while (j >= 0 && v[j] > ___) {\n                v[j + 1] = v[j];\n                j--;\n            }\n            v[j + 1] = clave;\n        }\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {12, 11, 13, 5, 6};\n        for (int i = 1; i < v.length; i++) {\n            int clave = v[i];\n            int j = i - 1;\n            while (j >= 0 && v[j] > clave) {\n                v[j + 1] = v[j];\n                j--;\n            }\n            v[j + 1] = clave;\n        }\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        acceptedKeywords: ['clave']
      }
    }
  },
  {
    id: 814,
    title: 'Lower Bound (Primera Posición >= X)',
    statement: 'Corrige la búsqueda de lower bound guardando ans = m cuando v[m] >= obj.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Si v[m] >= obj guarda ans = m y busca a la izquierda (der = m - 1).',
    explanation: 'Lower Bound halla el primer índice donde el valor es mayor o igual al elemento buscado en tiempo logarítmico.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint lowerBound(const std::vector<int> &v, int obj) {\n    int izq = 0, der = v.size() - 1, ans = v.size();\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        // BUG: Condición invertida\n        if (v[m] >= obj) {\n            ans = m;\n            der = m - 1;\n        } else {\n            izq = m + 1;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    std::cout << lowerBound({1, 3, 3, 5, 7}, 3) << std::endl; // 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint lowerBound(const std::vector<int> &v, int obj) {\n    int izq = 0, der = v.size() - 1, ans = v.size();\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] >= obj) {\n            ans = m;\n            der = m - 1;\n        } else {\n            izq = m + 1;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    std::cout << lowerBound({1, 3, 3, 5, 7}, 3) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def lower_bound(v, obj):\n    izq, der, ans = 0, len(v) - 1, len(v)\n    while izq <= der:\n        m = (izq + der) // 2\n        if v[m] >= obj:\n            ans = m; der = m - 1\n        else:\n            izq = m + 1\n    return ans\n\nprint(lower_bound([1, 3, 3, 5, 7], 3))`,
        solutionCode: `def lower_bound(v, obj):\n    izq, der, ans = 0, len(v) - 1, len(v)\n    while izq <= der:\n        m = (izq + der) // 2\n        if v[m] >= obj:\n            ans = m; der = m - 1\n        else:\n            izq = m + 1\n    return ans\n\nprint(lower_bound([1, 3, 3, 5, 7], 3))`
      },
      javascript: {
        starterCode: `function lowerBound(v, obj) {\n    let izq = 0, der = v.length - 1, ans = v.length;\n    while (izq <= der) {\n        let m = Math.floor((izq + der) / 2);\n        if (v[m] >= obj) { ans = m; der = m - 1; }\n        else { izq = m + 1; }\n    }\n    return ans;\n}\nconsole.log(lowerBound([1, 3, 3, 5, 7], 3));`,
        solutionCode: `function lowerBound(v, obj) {\n    let izq = 0, der = v.length - 1, ans = v.length;\n    while (izq <= der) {\n        let m = Math.floor((izq + der) / 2);\n        if (v[m] >= obj) { ans = m; der = m - 1; }\n        else { izq = m + 1; }\n    }\n    return ans;\n}\nconsole.log(lowerBound([1, 3, 3, 5, 7], 3));`
      },
      java: {
        starterCode: `public class Main {\n    static int lowerBound(int[] v, int obj) {\n        int izq = 0, der = v.length - 1, ans = v.length;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] >= obj) { ans = m; der = m - 1; }\n            else { izq = m + 1; }\n        }\n        return ans;\n    }\n    public static void main(String[] args) {\n        System.out.println(lowerBound(new int[]{1, 3, 3, 5, 7}, 3));\n    }\n}`,
        solutionCode: `public class Main {\n    static int lowerBound(int[] v, int obj) {\n        int izq = 0, der = v.length - 1, ans = v.length;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] >= obj) { ans = m; der = m - 1; }\n            else { izq = m + 1; }\n        }\n        return ans;\n    }\n    public static void main(String[] args) {\n        System.out.println(lowerBound(new int[]{1, 3, 3, 5, 7}, 3));\n    }\n}`
      }
    }
  },
  {
    id: 815,
    title: 'Ordenamiento de Pares Multicriterio',
    statement: 'Completa la comparación: si a.primero == b.primero, compara a.segundo < b.___',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Compara a.segundo < b.segundo.',
    explanation: 'El ordenamiento multicriterio desempata mediante el segundo atributo cuando los valores primarios son iguales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nstruct Par {\n    int primero, segundo;\n};\n\nbool comparar(const Par &a, const Par &b) {\n    if (a.primero != b.primero) return a.primero < b.primero;\n    return a.segundo < b.___\n}\n\nint main() {\n    std::vector<Par> v = {{1, 5}, {1, 2}};\n    std::sort(v.begin(), v.end(), comparar);\n    std::cout << v[0].segundo << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nstruct Par {\n    int primero, segundo;\n};\n\nbool comparar(const Par &a, const Par &b) {\n    if (a.primero != b.primero) return a.primero < b.primero;\n    return a.segundo < b.segundo;\n}\n\nint main() {\n    std::vector<Par> v = {{1, 5}, {1, 2}};\n    std::sort(v.begin(), v.end(), comparar);\n    std::cout << v[0].segundo << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['segundo']
      },
      python: {
        starterCode: `v = [(1, 5), (1, 2)]\nv.sort(key=lambda x: (x[0], x[1]))\nprint(v[0][1])`,
        solutionCode: `v = [(1, 5), (1, 2)]\nv.sort(key=lambda x: (x[0], x[1]))\nprint(v[0][1])`
      },
      javascript: {
        starterCode: `let v = [{p: 1, s: 5}, {p: 1, s: 2}];\nv.sort((a, b) => a.p !== b.p ? a.p - b.p : a.s - b.s);\nconsole.log(v[0].s);`,
        solutionCode: `let v = [{p: 1, s: 5}, {p: 1, s: 2}];\nv.sort((a, b) => a.p !== b.p ? a.p - b.p : a.s - b.s);\nconsole.log(v[0].s);`
      },
      java: {
        starterCode: `import java.util.*;\nclass Par { int p, s; Par(int a, int b) { p=a; s=b; } }\npublic class Main {\n    public static void main(String[] args) {\n        List<Par> v = Arrays.asList(new Par(1, 5), new Par(1, 2));\n        v.sort((a, b) -> a.p != b.p ? a.p - b.p : a.s - b.s);\n        System.out.println(v.get(0).s);\n    }\n}`,
        solutionCode: `import java.util.*;\nclass Par { int p, s; Par(int a, int b) { p=a; s=b; } }\npublic class Main {\n    public static void main(String[] args) {\n        List<Par> v = Arrays.asList(new Par(1, 5), new Par(1, 2));\n        v.sort((a, b) -> a.p != b.p ? a.p - b.p : a.s - b.s);\n        System.out.println(v.get(0).s);\n    }\n}`
      }
    }
  },
  {
    id: 816,
    title: 'Counting Sort (Ordenamiento por Conteo de Frecuencias)',
    statement: 'Corrige la reconstrucción del arreglo ordenado colocando el número k tantas veces como indique frec[k].',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Llena el arreglo recorriendo el vector de frecuencias.',
    explanation: 'Counting Sort ordena números enteros en rango acotado en tiempo O(N + K) sin realizar comparaciones.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {4, 2, 2, 8, 3};\n    std::vector<int> frec(10, 0);\n    for (int x : v) frec[x]++;\n    int idx = 0;\n    for (int num = 0; num < 10; num++) {\n        while (frec[num]-- > 0) {\n            v[idx++] = num;\n        }\n    }\n    std::cout << v[0] << " " << v[1] << std::endl; // 2 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {4, 2, 2, 8, 3};\n    std::vector<int> frec(10, 0);\n    for (int x : v) frec[x]++;\n    int idx = 0;\n    for (int num = 0; num < 10; num++) {\n        while (frec[num]-- > 0) {\n            v[idx++] = num;\n        }\n    }\n    std::cout << v[0] << " " << v[1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [4, 2, 2, 8, 3]\nfrec = [0] * 10\nfor x in v: frec[x] += 1\nres = [num for num, c in enumerate(frec) for _ in range(c)]\nprint(res[0], res[1])`,
        solutionCode: `v = [4, 2, 2, 8, 3]\nfrec = [0] * 10\nfor x in v: frec[x] += 1\nres = [num for num, c in enumerate(frec) for _ in range(c)]\nprint(res[0], res[1])`
      },
      javascript: {
        starterCode: `let v = [4, 2, 2, 8, 3];\nlet frec = new Array(10).fill(0);\nfor (let x of v) frec[x]++;\nlet res = [];\nfor (let num = 0; num < 10; num++) while (frec[num]-- > 0) res.push(num);\nconsole.log(res[0], res[1]);`,
        solutionCode: `let v = [4, 2, 2, 8, 3];\nlet frec = new Array(10).fill(0);\nfor (let x of v) frec[x]++;\nlet res = [];\nfor (let num = 0; num < 10; num++) while (frec[num]-- > 0) res.push(num);\nconsole.log(res[0], res[1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {4, 2, 2, 8, 3};\n        int[] frec = new int[10];\n        for (int x : v) frec[x]++;\n        int idx = 0;\n        for (int num = 0; num < 10; num++) while (frec[num]-- > 0) v[idx++] = num;\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {4, 2, 2, 8, 3};\n        int[] frec = new int[10];\n        for (int x : v) frec[x]++;\n        int idx = 0;\n        for (int num = 0; num < 10; num++) while (frec[num]-- > 0) v[idx++] = num;\n        System.out.println(v[0] + " " + v[1]);\n    }\n}`
      }
    }
  },
  {
    id: 817,
    title: 'Búsqueda Ternaria en Función Unimodal',
    statement: 'Completa la fórmula del segundo tercio m2 = der - (der - izq) / ___.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Divide el tercio entre 3.',
    explanation: 'La búsqueda ternaria evalúa dos puntos intermedios para hallar extremos en O(log3 N).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int izq = 0, der = 9;\n    int m1 = izq + (der - izq) / 3;\n    int m2 = der - (der - izq) / ___;\n    std::cout << m1 << " " << m2 << std::endl; // 3 6\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int izq = 0, der = 9;\n    int m1 = izq + (der - izq) / 3;\n    int m2 = der - (der - izq) / 3;\n    std::cout << m1 << " " << m2 << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['3']
      },
      python: {
        starterCode: `izq, der = 0, 9\nm1 = izq + (der - izq) // 3\nm2 = der - (der - izq) // ___\nprint(m1, m2)`,
        solutionCode: `izq, der = 0, 9\nm1 = izq + (der - izq) // 3\nm2 = der - (der - izq) // 3\nprint(m1, m2)`,
        acceptedKeywords: ['3']
      },
      javascript: {
        starterCode: `let izq = 0, der = 9;\nlet m1 = izq + Math.floor((der - izq) / 3);\nlet m2 = der - Math.floor((der - izq) / ___);\nconsole.log(m1, m2);`,
        solutionCode: `let izq = 0, der = 9;\nlet m1 = izq + Math.floor((der - izq) / 3);\nlet m2 = der - Math.floor((der - izq) / 3);\nconsole.log(m1, m2);`,
        acceptedKeywords: ['3']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int izq = 0, der = 9;\n        int m1 = izq + (der - izq) / 3;\n        int m2 = der - (der - izq) / ___;\n        System.out.println(m1 + " " + m2);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int izq = 0, der = 9;\n        int m1 = izq + (der - izq) / 3;\n        int m2 = der - (der - izq) / 3;\n        System.out.println(m1 + " " + m2);\n    }\n}`,
        acceptedKeywords: ['3']
      }
    }
  },
  {
    id: 818,
    title: 'Partición de Lomuto (Quicksort Partition)',
    statement: 'Corrige la condición de partición: si v[j] <= pivote incrementa i y haz swap.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba if (v[j] <= pivote).',
    explanation: 'La partición de Lomuto agrupa todos los elementos menores o iguales al pivote en la sección izquierda.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint particion(std::vector<int> &v, int bajo, int alto) {\n    int pivote = v[alto];\n    int i = bajo - 1;\n    for (int j = bajo; j < alto; j++) {\n        // BUG: Compara mayor en vez de menor\n        if (v[j] <= pivote) {\n            i++;\n            std::swap(v[i], v[j]);\n        }\n    }\n    std::swap(v[i + 1], v[alto]);\n    return i + 1;\n}\n\nint main() {\n    std::vector<int> v = {10, 80, 30, 90, 40, 50, 70};\n    int pi = particion(v, 0, v.size() - 1);\n    std::cout << v[pi] << std::endl; // 70 en su posición correcta\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint particion(std::vector<int> &v, int bajo, int alto) {\n    int pivote = v[alto];\n    int i = bajo - 1;\n    for (int j = bajo; j < alto; j++) {\n        if (v[j] <= pivote) {\n            i++;\n            std::swap(v[i], v[j]);\n        }\n    }\n    std::swap(v[i + 1], v[alto]);\n    return i + 1;\n}\n\nint main() {\n    std::vector<int> v = {10, 80, 30, 90, 40, 50, 70};\n    int pi = particion(v, 0, v.size() - 1);\n    std::cout << v[pi] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def particion(v, bajo, alto):\n    pivote = v[alto]\n    i = bajo - 1\n    for j in range(bajo, alto):\n        if v[j] <= pivote:\n            i += 1\n            v[i], v[j] = v[j], v[i]\n    v[i + 1], v[alto] = v[alto], v[i + 1]\n    return i + 1\n\nv = [10, 80, 30, 90, 40, 50, 70]\npi = particion(v, 0, len(v) - 1)\nprint(v[pi])`,
        solutionCode: `def particion(v, bajo, alto):\n    pivote = v[alto]\n    i = bajo - 1\n    for j in range(bajo, alto):\n        if v[j] <= pivote:\n            i += 1\n            v[i], v[j] = v[j], v[i]\n    v[i + 1], v[alto] = v[alto], v[i + 1]\n    return i + 1\n\nv = [10, 80, 30, 90, 40, 50, 70]\npi = particion(v, 0, len(v) - 1)\nprint(v[pi])`
      },
      javascript: {
        starterCode: `function particion(v, bajo, alto) {\n    let pivote = v[alto], i = bajo - 1;\n    for (let j = bajo; j < alto; j++) {\n        if (v[j] <= pivote) {\n            i++;\n            [v[i], v[j]] = [v[j], v[i]];\n        }\n    }\n    [v[i + 1], v[alto]] = [v[alto], v[i + 1]];\n    return i + 1;\n}\nlet v = [10, 80, 30, 90, 40, 50, 70];\nlet pi = particion(v, 0, v.length - 1);\nconsole.log(v[pi]);`,
        solutionCode: `function particion(v, bajo, alto) {\n    let pivote = v[alto], i = bajo - 1;\n    for (let j = bajo; j < alto; j++) {\n        if (v[j] <= pivote) {\n            i++;\n            [v[i], v[j]] = [v[j], v[i]];\n        }\n    }\n    [v[i + 1], v[alto]] = [v[alto], v[i + 1]];\n    return i + 1;\n}\nlet v = [10, 80, 30, 90, 40, 50, 70];\nlet pi = particion(v, 0, v.length - 1);\nconsole.log(v[pi]);`
      },
      java: {
        starterCode: `public class Main {\n    static int particion(int[] v, int bajo, int alto) {\n        int pivote = v[alto], i = bajo - 1;\n        for (int j = bajo; j < alto; j++) {\n            if (v[j] <= pivote) {\n                i++;\n                int t = v[i]; v[i] = v[j]; v[j] = t;\n            }\n        }\n        int t = v[i + 1]; v[i + 1] = v[alto]; v[alto] = t;\n        return i + 1;\n    }\n    public static void main(String[] args) {\n        int[] v = {10, 80, 30, 90, 40, 50, 70};\n        int pi = particion(v, 0, v.length - 1);\n        System.out.println(v[pi]);\n    }\n}`,
        solutionCode: `public class Main {\n    static int particion(int[] v, int bajo, int alto) {\n        int pivote = v[alto], i = bajo - 1;\n        for (int j = bajo; j < alto; j++) {\n            if (v[j] <= pivote) {\n                i++;\n                int t = v[i]; v[i] = v[j]; v[j] = t;\n            }\n        }\n        int t = v[i + 1]; v[i + 1] = v[alto]; v[alto] = t;\n        return i + 1;\n    }\n    public static void main(String[] args) {\n        int[] v = {10, 80, 30, 90, 40, 50, 70};\n        int pi = particion(v, 0, v.length - 1);\n        System.out.println(v[pi]);\n    }\n}`
      }
    }
  },
  {
    id: 819,
    title: 'Combinación en Merge Sort (Etapa Merge)',
    statement: 'Completa la inserción del elemento menor izqArr[i] en el arreglo resultante.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Guarda res.push_back(izqArr[i++]).',
    explanation: 'Merge Sort divide en mitades recursivas y las fusiona ordenadamente en O(N log N).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> izq = {1, 5}, der = {2, 6};\n    std::vector<int> res;\n    size_t i = 0, j = 0;\n    while (i < izq.size() && j < der.size()) {\n        if (izq[i] <= der[j]) res.push_back(izq[___]);\n        else res.push_back(der[j++]);\n    }\n    while (i < izq.size()) res.push_back(izq[i++]);\n    while (j < der.size()) res.push_back(der[j++]);\n    std::cout << res[0] << " " << res[1] << std::endl; // 1 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> izq = {1, 5}, der = {2, 6};\n    std::vector<int> res;\n    size_t i = 0, j = 0;\n    while (i < izq.size() && j < der.size()) {\n        if (izq[i] <= der[j]) res.push_back(izq[i++]);\n        else res.push_back(der[j++]);\n    }\n    while (i < izq.size()) res.push_back(izq[i++]);\n    while (j < der.size()) res.push_back(der[j++]);\n    std::cout << res[0] << " " << res[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['i++']
      },
      python: {
        starterCode: `izq, der = [1, 5], [2, 6]\nres = sorted(izq + der)\nprint(res[0], res[1])`,
        solutionCode: `izq, der = [1, 5], [2, 6]\nres = sorted(izq + der)\nprint(res[0], res[1])`
      },
      javascript: {
        starterCode: `let izq = [1, 5], der = [2, 6];\nlet res = [...izq, ...der].sort((a, b) => a - b);\nconsole.log(res[0], res[1]);`,
        solutionCode: `let izq = [1, 5], der = [2, 6];\nlet res = [...izq, ...der].sort((a, b) => a - b);\nconsole.log(res[0], res[1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] izq = {1, 5}, der = {2, 6};\n        int[] res = {1, 2, 5, 6};\n        System.out.println(res[0] + " " + res[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] izq = {1, 5}, der = {2, 6};\n        int[] res = {1, 2, 5, 6};\n        System.out.println(res[0] + " " + res[1]);\n    }\n}`
      }
    }
  },
  {
    id: 820,
    title: 'Comprobación de Anagrama con Ordenamiento',
    statement: 'Corrige la comparación: dos cadenas son anagramas si al ordenar sus caracteres resultan idénticas.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Ordena ambas cadenas y compara s1 == s2.',
    explanation: 'Dos textos son anagramas si contienen exactamente las mismas letras con las mismas frecuencias.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n#include <algorithm>\n\nbool sonAnagramas(std::string s1, std::string s2) {\n    std::sort(s1.begin(), s1.end());\n    std::sort(s2.begin(), s2.end());\n    return s1 == s2;\n}\n\nint main() {\n    std::cout << std::boolalpha << sonAnagramas("roma", "amor") << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n#include <algorithm>\n\nbool sonAnagramas(std::string s1, std::string s2) {\n    std::sort(s1.begin(), s1.end());\n    std::sort(s2.begin(), s2.end());\n    return s1 == s2;\n}\n\nint main() {\n    std::cout << std::boolalpha << sonAnagramas("roma", "amor") << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def son_anagramas(s1, s2):\n    return sorted(s1) == sorted(s2)\n\nprint(son_anagramas("roma", "amor"))`,
        solutionCode: `def son_anagramas(s1, s2):\n    return sorted(s1) == sorted(s2)\n\nprint(son_anagramas("roma", "amor"))`
      },
      javascript: {
        starterCode: `function sonAnagramas(s1, s2) {\n    return s1.split("").sort().join("") === s2.split("").sort().join("");\n}\nconsole.log(sonAnagramas("roma", "amor"));`,
        solutionCode: `function sonAnagramas(s1, s2) {\n    return s1.split("").sort().join("") === s2.split("").sort().join("");\n}\nconsole.log(sonAnagramas("roma", "amor"));`
      },
      java: {
        starterCode: `import java.util.Arrays;\npublic class Main {\n    static boolean sonAnagramas(String s1, String s2) {\n        char[] c1 = s1.toCharArray(), c2 = s2.toCharArray();\n        Arrays.sort(c1); Arrays.sort(c2);\n        return Arrays.equals(c1, c2);\n    }\n    public static void main(String[] args) {\n        System.out.println(sonAnagramas("roma", "amor"));\n    }\n}`,
        solutionCode: `import java.util.Arrays;\npublic class Main {\n    static boolean sonAnagramas(String s1, String s2) {\n        char[] c1 = s1.toCharArray(), c2 = s2.toCharArray();\n        Arrays.sort(c1); Arrays.sort(c2);\n        return Arrays.equals(c1, c2);\n    }\n    public static void main(String[] args) {\n        System.out.println(sonAnagramas("roma", "amor"));\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 821 al 830 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 821,
    title: 'Búsqueda en Arreglo Rotado Ordenado (Rotated Binary Search)',
    statement: 'Completa la condición para saber si la mitad izquierda está ordenada: v[izq] <= v[___].',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Compara v[izq] <= v[m].',
    explanation: 'En un arreglo rotado, al menos una de las dos mitades siempre se mantiene estrictamente ordenada.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint buscarRotado(const std::vector<int> &v, int obj) {\n    int izq = 0, der = v.size() - 1;\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] == obj) return m;\n        if (v[izq] <= v[___]) {\n            if (v[izq] <= obj && obj < v[m]) der = m - 1;\n            else izq = m + 1;\n        } else {\n            if (v[m] < obj && obj <= v[der]) izq = m + 1;\n            else der = m - 1;\n        }\n    }\n    return -1;\n}\n\nint main() {\n    std::cout << buscarRotado({4, 5, 6, 7, 0, 1, 2}, 0) << std::endl; // 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint buscarRotado(const std::vector<int> &v, int obj) {\n    int izq = 0, der = v.size() - 1;\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] == obj) return m;\n        if (v[izq] <= v[m]) {\n            if (v[izq] <= obj && obj < v[m]) der = m - 1;\n            else izq = m + 1;\n        } else {\n            if (v[m] < obj && obj <= v[der]) izq = m + 1;\n            else der = m - 1;\n        }\n    }\n    return -1;\n}\n\nint main() {\n    std::cout << buscarRotado({4, 5, 6, 7, 0, 1, 2}, 0) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['m']
      },
      python: {
        starterCode: `def buscar_rotado(v, obj):\n    izq, der = 0, len(v) - 1\n    while izq <= der:\n        m = (izq + der) // 2\n        if v[m] == obj: return m\n        if v[izq] <= v[___]:\n            if v[izq] <= obj < v[m]: der = m - 1\n            else: izq = m + 1\n        else:\n            if v[m] < obj <= v[der]: izq = m + 1\n            else: der = m - 1\n    return -1\n\nprint(buscar_rotado([4, 5, 6, 7, 0, 1, 2], 0))`,
        solutionCode: `def buscar_rotado(v, obj):\n    izq, der = 0, len(v) - 1\n    while izq <= der:\n        m = (izq + der) // 2\n        if v[m] == obj: return m\n        if v[izq] <= v[m]:\n            if v[izq] <= obj < v[m]: der = m - 1\n            else: izq = m + 1\n        else:\n            if v[m] < obj <= v[der]: izq = m + 1\n            else: der = m - 1\n    return -1\n\nprint(buscar_rotado([4, 5, 6, 7, 0, 1, 2], 0))`,
        acceptedKeywords: ['m']
      },
      javascript: {
        starterCode: `function buscarRotado(v, obj) {\n    let izq = 0, der = v.length - 1;\n    while (izq <= der) {\n        let m = Math.floor((izq + der) / 2);\n        if (v[m] === obj) return m;\n        if (v[izq] <= v[___]) {\n            if (v[izq] <= obj && obj < v[m]) der = m - 1;\n            else izq = m + 1;\n        } else {\n            if (v[m] < obj && obj <= v[der]) izq = m + 1;\n            else der = m - 1;\n        }\n    }\n    return -1;\n}\nconsole.log(buscarRotado([4, 5, 6, 7, 0, 1, 2], 0));`,
        solutionCode: `function buscarRotado(v, obj) {\n    let izq = 0, der = v.length - 1;\n    while (izq <= der) {\n        let m = Math.floor((izq + der) / 2);\n        if (v[m] === obj) return m;\n        if (v[izq] <= v[m]) {\n            if (v[izq] <= obj && obj < v[m]) der = m - 1;\n            else izq = m + 1;\n        } else {\n            if (v[m] < obj && obj <= v[der]) izq = m + 1;\n            else der = m - 1;\n        }\n    }\n    return -1;\n}\nconsole.log(buscarRotado([4, 5, 6, 7, 0, 1, 2], 0));`,
        acceptedKeywords: ['m']
      },
      java: {
        starterCode: `public class Main {\n    static int buscarRotado(int[] v, int obj) {\n        int izq = 0, der = v.length - 1;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] == obj) return m;\n            if (v[izq] <= v[___]) {\n                if (v[izq] <= obj && obj < v[m]) der = m - 1;\n                else izq = m + 1;\n            } else {\n                if (v[m] < obj && obj <= v[der]) izq = m + 1;\n                else der = m - 1;\n            }\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(buscarRotado(new int[]{4, 5, 6, 7, 0, 1, 2}, 0));\n    }\n}`,
        solutionCode: `public class Main {\n    static int buscarRotado(int[] v, int obj) {\n        int izq = 0, der = v.length - 1;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] == obj) return m;\n            if (v[izq] <= v[m]) {\n                if (v[izq] <= obj && obj < v[m]) der = m - 1;\n                else izq = m + 1;\n            } else {\n                if (v[m] < obj && obj <= v[der]) izq = m + 1;\n                else der = m - 1;\n            }\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(buscarRotado(new int[]{4, 5, 6, 7, 0, 1, 2}, 0));\n    }\n}`,
        acceptedKeywords: ['m']
      }
    }
  },
  {
    id: 822,
    title: 'K-ésimo Elemento Menor con Quickselect (O(n) Promedio)',
    statement: 'Corrige la recursión de Quickselect: si k == pi se encontró el valor exacto.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Si k == pi retorna v[pi].',
    explanation: 'Quickselect halla el k-ésimo estadístico de orden en tiempo lineal promedio O(N) sin ordenar todo el arreglo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {7, 10, 4, 3, 20, 15};\n    int k = 3; // 3er menor\n    std::nth_element(v.begin(), v.begin() + k - 1, v.end());\n    std::cout << v[k - 1] << std::endl; // 7 (3, 4, 7...)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {7, 10, 4, 3, 20, 15};\n    int k = 3;\n    std::nth_element(v.begin(), v.begin() + k - 1, v.end());\n    std::cout << v[k - 1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [7, 10, 4, 3, 20, 15]\nv.sort()\nprint(v[2])`,
        solutionCode: `v = [7, 10, 4, 3, 20, 15]\nv.sort()\nprint(v[2])`
      },
      javascript: {
        starterCode: `let v = [7, 10, 4, 3, 20, 15];\nv.sort((a, b) => a - b);\nconsole.log(v[2]);`,
        solutionCode: `let v = [7, 10, 4, 3, 20, 15];\nv.sort((a, b) => a - b);\nconsole.log(v[2]);`
      },
      java: {
        starterCode: `import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] v = {7, 10, 4, 3, 20, 15};\n        Arrays.sort(v);\n        System.out.println(v[2]);\n    }\n}`,
        solutionCode: `import java.util.Arrays;\npublic class Main {\n    public static void main(String[] args) {\n        int[] v = {7, 10, 4, 3, 20, 15};\n        Arrays.sort(v);\n        System.out.println(v[2]);\n    }\n}`
      }
    }
  },
  {
    id: 823,
    title: 'Búsqueda Binaria sobre el Espacio de Respuesta',
    statement: 'Completa la llamada de prueba esPosible(m) para verificar si la capacidad m es factible.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Comprueba if (esPosible(m)).',
    explanation: 'El patrón "Binary Search on Answer" encuentra el valor óptimo mínimo o máximo comprobando predicados monotónicos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nbool esPosible(int cap) { return cap >= 15; }\n\nint minCapacidad() {\n    int izq = 1, der = 100, ans = 100;\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (___(m)) {\n            ans = m;\n            der = m - 1;\n        } else {\n            izq = m + 1;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    std::cout << minCapacidad() << std::endl; // 15\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nbool esPosible(int cap) { return cap >= 15; }\n\nint minCapacidad() {\n    int izq = 1, der = 100, ans = 100;\n    while (izq <= der) {\n        int m = izq + (der - izq) / 2;\n        if (esPosible(m)) {\n            ans = m;\n            der = m - 1;\n        } else {\n            izq = m + 1;\n        }\n    }\n    return ans;\n}\n\nint main() {\n    std::cout << minCapacidad() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['esPosible']
      },
      python: {
        starterCode: `def es_posible(cap): return cap >= 15\nizq, der, ans = 1, 100, 100\nwhile izq <= der:\n    m = (izq + der) // 2\n    if ___(m):\n        ans = m; der = m - 1\n    else: izq = m + 1\nprint(ans)`,
        solutionCode: `def es_posible(cap): return cap >= 15\nizq, der, ans = 1, 100, 100\nwhile izq <= der:\n    m = (izq + der) // 2\n    if es_posible(m):\n        ans = m; der = m - 1\n    else: izq = m + 1\nprint(ans)`,
        acceptedKeywords: ['es_posible']
      },
      javascript: {
        starterCode: `function esPosible(cap) { return cap >= 15; }\nlet izq = 1, der = 100, ans = 100;\nwhile (izq <= der) {\n    let m = Math.floor((izq + der) / 2);\n    if (___(m)) { ans = m; der = m - 1; }\n    else { izq = m + 1; }\n}\nconsole.log(ans);`,
        solutionCode: `function esPosible(cap) { return cap >= 15; }\nlet izq = 1, der = 100, ans = 100;\nwhile (izq <= der) {\n    let m = Math.floor((izq + der) / 2);\n    if (esPosible(m)) { ans = m; der = m - 1; }\n    else { izq = m + 1; }\n}\nconsole.log(ans);`,
        acceptedKeywords: ['esPosible']
      },
      java: {
        starterCode: `public class Main {\n    static boolean esPosible(int cap) { return cap >= 15; }\n    public static void main(String[] args) {\n        int izq = 1, der = 100, ans = 100;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (___(m)) { ans = m; der = m - 1; }\n            else { izq = m + 1; }\n        }\n        System.out.println(ans);\n    }\n}`,
        solutionCode: `public class Main {\n    static boolean esPosible(int cap) { return cap >= 15; }\n    public static void main(String[] args) {\n        int izq = 1, der = 100, ans = 100;\n        while (izq <= der) {\n            int m = izq + (der - izq) / 2;\n            if (esPosible(m)) { ans = m; der = m - 1; }\n            else { izq = m + 1; }\n        }\n        System.out.println(ans);\n    }\n}`,
        acceptedKeywords: ['esPosible']
      }
    }
  },
  {
    id: 824,
    title: 'Conteo de Inversiones en Arreglo (Inversion Count)',
    statement: 'Corrige la condición de inversión: si i < j pero v[i] > v[j] cuenta una inversión.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Comprueba v[i] > v[j].',
    explanation: 'El número de inversiones cuantifica qué tan lejos está un arreglo de estar completamente ordenado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {2, 4, 1, 3, 5};\n    int inv = 0;\n    for (size_t i = 0; i < v.size(); i++) {\n        for (size_t j = i + 1; j < v.size(); j++) {\n            // BUG: Condición invertida\n            if (v[i] > v[j]) inv++;\n        }\n    }\n    std::cout << inv << std::endl; // 3 ((2,1), (4,1), (4,3))\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {2, 4, 1, 3, 5};\n    int inv = 0;\n    for (size_t i = 0; i < v.size(); i++) {\n        for (size_t j = i + 1; j < v.size(); j++) {\n            if (v[i] > v[j]) inv++;\n        }\n    }\n    std::cout << inv << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [2, 4, 1, 3, 5]\ninv = sum(1 for i in range(len(v)) for j in range(i+1, len(v)) if v[i] > v[j])\nprint(inv)`,
        solutionCode: `v = [2, 4, 1, 3, 5]\ninv = sum(1 for i in range(len(v)) for j in range(i+1, len(v)) if v[i] > v[j])\nprint(inv)`
      },
      javascript: {
        starterCode: `let v = [2, 4, 1, 3, 5];\nlet inv = 0;\nfor (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) if (v[i] > v[j]) inv++;\nconsole.log(inv);`,
        solutionCode: `let v = [2, 4, 1, 3, 5];\nlet inv = 0;\nfor (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) if (v[i] > v[j]) inv++;\nconsole.log(inv);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {2, 4, 1, 3, 5};\n        int inv = 0;\n        for (int i = 0; i < v.length; i++) for (int j = i + 1; j < v.length; j++) if (v[i] > v[j]) inv++;\n        System.out.println(inv);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {2, 4, 1, 3, 5};\n        int inv = 0;\n        for (int i = 0; i < v.length; i++) for (int j = i + 1; j < v.length; j++) if (v[i] > v[j]) inv++;\n        System.out.println(inv);\n    }\n}`
      }
    }
  },
  {
    id: 825,
    title: 'Ordenamiento por Longitud de Cadena',
    statement: 'Completa la comparación por tamaño de cadenas: a.length() < b.___()',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Compara a.length() < b.length().',
    explanation: 'El ordenamiento con comparadores personalizados permite ordenar estructuras según atributos derivados como la longitud.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n\nint main() {\n    std::vector<std::string> palabras = {"manzana", "sol", "pera"};\n    std::sort(palabras.begin(), palabras.end(), [](const std::string &a, const std::string &b) {\n        return a.length() < b.___();\n    });\n    std::cout << palabras[0] << std::endl; // "sol"\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n\nint main() {\n    std::vector<std::string> palabras = {"manzana", "sol", "pera"};\n    std::sort(palabras.begin(), palabras.end(), [](const std::string &a, const std::string &b) {\n        return a.length() < b.length();\n    });\n    std::cout << palabras[0] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['length', 'size']
      },
      python: {
        starterCode: `palabras = ["manzana", "sol", "pera"]\npalabras.sort(key=___)\nprint(palabras[0])`,
        solutionCode: `palabras = ["manzana", "sol", "pera"]\npalabras.sort(key=len)\nprint(palabras[0])`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let palabras = ["manzana", "sol", "pera"];\npalabras.sort((a, b) => a.length - b.___);\nconsole.log(palabras[0]);`,
        solutionCode: `let palabras = ["manzana", "sol", "pera"];\npalabras.sort((a, b) => a.length - b.length);\nconsole.log(palabras[0]);`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> palabras = Arrays.asList("manzana", "sol", "pera");\n        palabras.sort(Comparator.comparingInt(String::___));\n        System.out.println(palabras.get(0));\n    }\n}`,
        solutionCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> palabras = Arrays.asList("manzana", "sol", "pera");\n        palabras.sort(Comparator.comparingInt(String::length));\n        System.out.println(palabras.get(0));\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 826,
    title: 'Heap Sort (Algoritmo con Cola de Prioridad)',
    statement: 'Corrige la extracción del montículo para vaciar la cola de prioridad en orden.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Extrae con pq.top(); pq.pop();',
    explanation: 'Heap Sort utiliza una estructura de montículo binario para ordenar en O(N log N) garantizado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <queue>\n\nint main() {\n    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;\n    pq.push(5); pq.push(1); pq.push(3);\n    int menor = pq.top();\n    std::cout << menor << std::endl; // 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <queue>\n\nint main() {\n    std::priority_queue<int, std::vector<int>, std::greater<int>> pq;\n    pq.push(5); pq.push(1); pq.push(3);\n    int menor = pq.top();\n    std::cout << menor << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `import heapq\nh = [5, 1, 3]\nheapq.heapify(h)\nprint(heapq.heappop(h))`,
        solutionCode: `import heapq\nh = [5, 1, 3]\nheapq.heapify(h)\nprint(heapq.heappop(h))`
      },
      javascript: {
        starterCode: `let h = [5, 1, 3].sort((a, b) => a - b);\nconsole.log(h[0]);`,
        solutionCode: `let h = [5, 1, 3].sort((a, b) => a - b);\nconsole.log(h[0]);`
      },
      java: {
        starterCode: `import java.util.PriorityQueue;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        pq.add(5); pq.add(1); pq.add(3);\n        System.out.println(pq.poll());\n    }\n}`,
        solutionCode: `import java.util.PriorityQueue;\npublic class Main {\n    public static void main(String[] args) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        pq.add(5); pq.add(1); pq.add(3);\n        System.out.println(pq.poll());\n    }\n}`
      }
    }
  },
  {
    id: 827,
    title: 'Intersección de Dos Arreglos Ordenados (Two Pointers)',
    statement: 'Completa el avance conjunto i++ y ___ al hallar elementos iguales en ambos arreglos.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Avanza el segundo puntero con j++.',
    explanation: 'Aprovechar arreglos previamente ordenados permite hallar su intersección en tiempo lineal O(N + M).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> A = {1, 2, 4, 5}, B = {2, 3, 5, 7};\n    std::vector<int> inter;\n    size_t i = 0, j = 0;\n    while (i < A.size() && j < B.size()) {\n        if (A[i] == B[j]) {\n            inter.push_back(A[i]);\n            i++;\n            ___;\n        } else if (A[i] < B[j]) i++;\n        else j++;\n    }\n    std::cout << inter.size() << std::endl; // 2 (2, 5)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> A = {1, 2, 4, 5}, B = {2, 3, 5, 7};\n    std::vector<int> inter;\n    size_t i = 0, j = 0;\n    while (i < A.size() && j < B.size()) {\n        if (A[i] == B[j]) {\n            inter.push_back(A[i]);\n            i++;\n            j++;\n        } else if (A[i] < B[j]) i++;\n        else j++;\n    }\n    std::cout << inter.size() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['j++', '++j', 'j += 1']
      },
      python: {
        starterCode: `A, B = [1, 2, 4, 5], [2, 3, 5, 7]\ni, j, inter = 0, 0, []\nwhile i < len(A) and j < len(B):\n    if A[i] == B[j]:\n        inter.append(A[i]); i += 1; ___\n    elif A[i] < B[j]: i += 1\n    else: j += 1\nprint(len(inter))`,
        solutionCode: `A, B = [1, 2, 4, 5], [2, 3, 5, 7]\ni, j, inter = 0, 0, []\nwhile i < len(A) and j < len(B):\n    if A[i] == B[j]:\n        inter.append(A[i]); i += 1; j += 1\n    elif A[i] < B[j]: i += 1\n    else: j += 1\nprint(len(inter))`,
        acceptedKeywords: ['j += 1', 'j = j + 1']
      },
      javascript: {
        starterCode: `let A = [1, 2, 4, 5], B = [2, 3, 5, 7];\nlet i = 0, j = 0, inter = [];\nwhile (i < A.length && j < B.length) {\n    if (A[i] === B[j]) { inter.push(A[i]); i++; ___; }\n    else if (A[i] < B[j]) i++;\n    else j++;\n}\nconsole.log(inter.length);`,
        solutionCode: `let A = [1, 2, 4, 5], B = [2, 3, 5, 7];\nlet i = 0, j = 0, inter = [];\nwhile (i < A.length && j < B.length) {\n    if (A[i] === B[j]) { inter.push(A[i]); i++; j++; }\n    else if (A[i] < B[j]) i++;\n    else j++;\n}\nconsole.log(inter.length);`,
        acceptedKeywords: ['j++', '++j', 'j += 1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] A = {1, 2, 4, 5}, B = {2, 3, 5, 7};\n        int i = 0, j = 0, count = 0;\n        while (i < A.length && j < B.length) {\n            if (A[i] == B[j]) { count++; i++; ___; }\n            else if (A[i] < B[j]) i++;\n            else j++;\n        }\n        System.out.println(count);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] A = {1, 2, 4, 5}, B = {2, 3, 5, 7};\n        int i = 0, j = 0, count = 0;\n        while (i < A.length && j < B.length) {\n            if (A[i] == B[j]) { count++; i++; j++; }\n            else if (A[i] < B[j]) i++;\n            else j++;\n        }\n        System.out.println(count);\n    }\n}`,
        acceptedKeywords: ['j++', '++j', 'j += 1']
      }
    }
  },
  {
    id: 828,
    title: 'Mediana de un Arreglo Ordenado',
    statement: 'Corrige el cálculo de la mediana para tomar el promedio de los dos elementos centrales en longitud par.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'En par usa (v[n/2 - 1] + v[n/2]) / 2.0.',
    explanation: 'La mediana es el elemento central si N es impar, o la media aritmética de los dos centrales si N es par.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\ndouble mediana(const std::vector<int> &v) {\n    int n = v.size();\n    if (n % 2 != 0) return v[n / 2];\n    // BUG: División entera trunca decimales\n    return (v[n / 2 - 1] + v[n / 2]) / 2.0;\n}\n\nint main() {\n    std::cout << mediana({1, 2, 3, 4}) << std::endl; // 2.5\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\ndouble mediana(const std::vector<int> &v) {\n    int n = v.size();\n    if (n % 2 != 0) return v[n / 2];\n    return (v[n / 2 - 1] + v[n / 2]) / 2.0;\n}\n\nint main() {\n    std::cout << mediana({1, 2, 3, 4}) << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `def mediana(v):\n    n = len(v)\n    if n % 2 != 0: return v[n // 2]\n    return (v[n // 2 - 1] + v[n // 2]) / 2.0\n\nprint(mediana([1, 2, 3, 4]))`,
        solutionCode: `def mediana(v):\n    n = len(v)\n    if n % 2 != 0: return v[n // 2]\n    return (v[n // 2 - 1] + v[n // 2]) / 2.0\n\nprint(mediana([1, 2, 3, 4]))`
      },
      javascript: {
        starterCode: `function mediana(v) {\n    let n = v.length;\n    if (n % 2 !== 0) return v[Math.floor(n / 2)];\n    return (v[n / 2 - 1] + v[n / 2]) / 2.0;\n}\nconsole.log(mediana([1, 2, 3, 4]));`,
        solutionCode: `function mediana(v) {\n    let n = v.length;\n    if (n % 2 !== 0) return v[Math.floor(n / 2)];\n    return (v[n / 2 - 1] + v[n / 2]) / 2.0;\n}\nconsole.log(mediana([1, 2, 3, 4]));`
      },
      java: {
        starterCode: `public class Main {\n    static double mediana(int[] v) {\n        int n = v.length;\n        if (n % 2 != 0) return v[n / 2];\n        return (v[n / 2 - 1] + v[n / 2]) / 2.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(mediana(new int[]{1, 2, 3, 4}));\n    }\n}`,
        solutionCode: `public class Main {\n    static double mediana(int[] v) {\n        int n = v.length;\n        if (n % 2 != 0) return v[n / 2];\n        return (v[n / 2 - 1] + v[n / 2]) / 2.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(mediana(new int[]{1, 2, 3, 4}));\n    }\n}`
      }
    }
  },
  {
    id: 829,
    title: 'Búsqueda de Pico Local (Peak Element en O(log n))',
    statement: 'Completa la condición de búsqueda binaria: si v[m] < v[m + 1] el pico se encuentra a la ___ (izq = m + 1).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Si v[m] < v[m + 1] avanza a la derecha con izq = m + 1.',
    explanation: 'Un pico local es mayor a sus vecinos contiguos; puede hallarse en O(log N) siguiendo la pendiente ascendente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint hallarPico(const std::vector<int> &v) {\n    int izq = 0, der = v.size() - 1;\n    while (izq < der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] < v[m + 1]) izq = m + ___;\n        else der = m;\n    }\n    return izq;\n}\n\nint main() {\n    std::cout << hallarPico({1, 2, 3, 1}) << std::endl; // 2 (valor 3)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint hallarPico(const std::vector<int> &v) {\n    int izq = 0, der = v.size() - 1;\n    while (izq < der) {\n        int m = izq + (der - izq) / 2;\n        if (v[m] < v[m + 1]) izq = m + 1;\n        else der = m;\n    }\n    return izq;\n}\n\nint main() {\n    std::cout << hallarPico({1, 2, 3, 1}) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `def hallar_pico(v):\n    izq, der = 0, len(v) - 1\n    while izq < der:\n        m = (izq + der) // 2\n        if v[m] < v[m + 1]: izq = m + ___\n        else: der = m\n    return izq\n\nprint(hallar_pico([1, 2, 3, 1]))`,
        solutionCode: `def hallar_pico(v):\n    izq, der = 0, len(v) - 1\n    while izq < der:\n        m = (izq + der) // 2\n        if v[m] < v[m + 1]: izq = m + 1\n        else: der = m\n    return izq\n\nprint(hallar_pico([1, 2, 3, 1]))`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `function hallarPico(v) {\n    let izq = 0, der = v.length - 1;\n    while (izq < der) {\n        let m = Math.floor((izq + der) / 2);\n        if (v[m] < v[m + 1]) izq = m + ___;\n        else der = m;\n    }\n    return izq;\n}\nconsole.log(hallarPico([1, 2, 3, 1]));`,
        solutionCode: `function hallarPico(v) {\n    let izq = 0, der = v.length - 1;\n    while (izq < der) {\n        let m = Math.floor((izq + der) / 2);\n        if (v[m] < v[m + 1]) izq = m + 1;\n        else der = m;\n    }\n    return izq;\n}\nconsole.log(hallarPico([1, 2, 3, 1]));`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    static int hallarPico(int[] v) {\n        int izq = 0, der = v.length - 1;\n        while (izq < der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] < v[m + 1]) izq = m + ___;\n            else der = m;\n        }\n        return izq;\n    }\n    public static void main(String[] args) {\n        System.out.println(hallarPico(new int[]{1, 2, 3, 1}));\n    }\n}`,
        solutionCode: `public class Main {\n    static int hallarPico(int[] v) {\n        int izq = 0, der = v.length - 1;\n        while (izq < der) {\n            int m = izq + (der - izq) / 2;\n            if (v[m] < v[m + 1]) izq = m + 1;\n            else der = m;\n        }\n        return izq;\n    }\n    public static void main(String[] args) {\n        System.out.println(hallarPico(new int[]{1, 2, 3, 1}));\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 830,
    title: 'Estabilidad de Algoritmo de Ordenación',
    statement: 'Corrige la condición de estabilidad para preservar el orden original de elementos con claves iguales (<=).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa <= para conservar la precedencia original de claves iguales.',
    explanation: 'Un algoritmo de ordenamiento es estable si mantiene el orden relativo original entre elementos con claves equivalentes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<std::pair<int, char>> v = {{1, 'a'}, {1, 'b'}};\n    std::stable_sort(v.begin(), v.end(), [](const auto &x, const auto &y) {\n        return x.first < y.first;\n    });\n    std::cout << v[0].second << " " << v[1].second << std::endl; // a b\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<std::pair<int, char>> v = {{1, 'a'}, {1, 'b'}};\n    std::stable_sort(v.begin(), v.end(), [](const auto &x, const auto &y) {\n        return x.first < y.first;\n    });\n    std::cout << v[0].second << " " << v[1].second << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `v = [(1, 'a'), (1, 'b')]\nv.sort(key=lambda x: x[0])\nprint(v[0][1], v[1][1])`,
        solutionCode: `v = [(1, 'a'), (1, 'b')]\nv.sort(key=lambda x: x[0])\nprint(v[0][1], v[1][1])`
      },
      javascript: {
        starterCode: `let v = [{k: 1, c: 'a'}, {k: 1, c: 'b'}];\nv.sort((x, y) => x.k - y.k);\nconsole.log(v[0].c, v[1].c);`,
        solutionCode: `let v = [{k: 1, c: 'a'}, {k: 1, c: 'b'}];\nv.sort((x, y) => x.k - y.k);\nconsole.log(v[0].c, v[1].c);`
      },
      java: {
        starterCode: `import java.util.*;\nclass Item { int k; char c; Item(int k, char c) { this.k=k; this.c=c; } }\npublic class Main {\n    public static void main(String[] args) {\n        List<Item> v = Arrays.asList(new Item(1, 'a'), new Item(1, 'b'));\n        v.sort(Comparator.comparingInt(x -> x.k));\n        System.out.println(v.get(0).c + " " + v.get(1).c);\n    }\n}`,
        solutionCode: `import java.util.*;\nclass Item { int k; char c; Item(int k, char c) { this.k=k; this.c=c; } }\npublic class Main {\n    public static void main(String[] args) {\n        List<Item> v = Arrays.asList(new Item(1, 'a'), new Item(1, 'b'));\n        v.sort(Comparator.comparingInt(x -> x.k));\n        System.out.println(v.get(0).c + " " + v.get(1).c);\n    }\n}`
      }
    }
  }
];
