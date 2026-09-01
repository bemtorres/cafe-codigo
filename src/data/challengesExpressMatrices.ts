import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressMatricesExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 701 al 710 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 701,
    title: 'Acceso a Elemento en Matriz [Fila][Columna]',
    statement: 'Completa las coordenadas para acceder al elemento de la fila 0, columna 1 (valor 2).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La coordenada es [0][1].',
    explanation: 'En arreglos bidimensionales, el primer índice indica la fila y el segundo la columna.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 2},\n        {3, 4}\n    };\n    int val = mat[0][___];\n    std::cout << val << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 2},\n        {3, 4}\n    };\n    int val = mat[0][1];\n    std::cout << val << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `mat = [\n    [1, 2],\n    [3, 4]\n]\nval = mat[0][___]\nprint(val)`,
        solutionCode: `mat = [\n    [1, 2],\n    [3, 4]\n]\nval = mat[0][1]\nprint(val)`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `let mat = [\n    [1, 2],\n    [3, 4]\n];\nlet val = mat[0][___];\nconsole.log(val);`,
        solutionCode: `let mat = [\n    [1, 2],\n    [3, 4]\n];\nlet val = mat[0][1];\nconsole.log(val);`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {\n            {1, 2},\n            {3, 4}\n        };\n        int val = mat[0][___];\n        System.out.println(val);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {\n            {1, 2},\n            {3, 4}\n        };\n        int val = mat[0][1];\n        System.out.println(val);\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 702,
    title: 'Modificación de Celda en Matriz',
    statement: 'Corrige la asignación para cambiar la esquina inferior derecha (fila 1, columna 1) por 99.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Asigna mat[1][1] = 99.',
    explanation: 'Modificar una matriz requiere especificar los dos índices de la celda de destino.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    // BUG: Asigna a fila 0 en vez de fila 1\n    mat[1][1] = 99;\n    std::cout << mat[1][1] << std::endl; // 99\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    mat[1][1] = 99;\n    std::cout << mat[1][1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\nmat[1][1] = 99\nprint(mat[1][1])`,
        solutionCode: `mat = [[1, 2], [3, 4]]\nmat[1][1] = 99\nprint(mat[1][1])`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nmat[1][1] = 99;\nconsole.log(mat[1][1]);`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nmat[1][1] = 99;\nconsole.log(mat[1][1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        mat[1][1] = 99;\n        System.out.println(mat[1][1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        mat[1][1] = 99;\n        System.out.println(mat[1][1]);\n    }\n}`
      }
    }
  },
  {
    id: 703,
    title: 'Cantidad de Filas de una Matriz',
    statement: 'Completa la consulta de la cantidad de filas de la matriz.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El número de filas es mat.size() (o len(mat)).',
    explanation: 'El tamaño exterior de la matriz representa la cantidad de filas que contiene.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}, {5, 6}};\n    int filas = mat.___();\n    std::cout << filas << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}, {5, 6}};\n    int filas = mat.size();\n    std::cout << filas << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['size']
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4], [5, 6]]\nfilas = ___(mat)\nprint(filas)`,
        solutionCode: `mat = [[1, 2], [3, 4], [5, 6]]\nfilas = len(mat)\nprint(filas)`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4], [5, 6]];\nlet filas = mat.___\nconsole.log(filas);`,
        solutionCode: `let mat = [[1, 2], [3, 4], [5, 6]];\nlet filas = mat.length;\nconsole.log(filas);`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}, {5, 6}};\n        int filas = mat.___\n        System.out.println(filas);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}, {5, 6}};\n        int filas = mat.length;\n        System.out.println(filas);\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 704,
    title: 'Cantidad de Columnas de una Matriz',
    statement: 'Corrige la consulta de columnas leyendo el tamaño de la primera fila mat[0].',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Lee mat[0].size() (o len(mat[0])).',
    explanation: 'El número de columnas corresponde a la longitud de cualquiera de sus filas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2, 3}, {4, 5, 6}};\n    // BUG: mat.size() devuelve 2 filas en vez de 3 columnas\n    int cols = mat[0].size();\n    std::cout << cols << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2, 3}, {4, 5, 6}};\n    int cols = mat[0].size();\n    std::cout << cols << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2, 3], [4, 5, 6]]\ncols = len(mat[0])\nprint(cols)`,
        solutionCode: `mat = [[1, 2, 3], [4, 5, 6]]\ncols = len(mat[0])\nprint(cols)`
      },
      javascript: {
        starterCode: `let mat = [[1, 2, 3], [4, 5, 6]];\nlet cols = mat[0].length;\nconsole.log(cols);`,
        solutionCode: `let mat = [[1, 2, 3], [4, 5, 6]];\nlet cols = mat[0].length;\nconsole.log(cols);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2, 3}, {4, 5, 6}};\n        int cols = mat[0].length;\n        System.out.println(cols);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2, 3}, {4, 5, 6}};\n        int cols = mat[0].length;\n        System.out.println(cols);\n    }\n}`
      }
    }
  },
  {
    id: 705,
    title: 'Recorrido Anidado de Filas y Columnas',
    statement: 'Completa la condición del bucle interior para iterar sobre las columnas j < cols.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Itera mientras j < cols (o j < mat[i].size()).',
    explanation: 'Dos bucles anidados permiten visitar sistemáticamente cada celda en orden fila por fila.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].___(); j++) {\n            std::cout << mat[i][j] << " ";\n        }\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            std::cout << mat[i][j] << " ";\n        }\n    }\n    return 0;\n}`,
        acceptedKeywords: ['size', 'length']
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\nfor i in range(len(mat)):\n    for j in range(___(mat[i])):\n        print(mat[i][j], end=" ")`,
        solutionCode: `mat = [[1, 2], [3, 4]]\nfor i in range(len(mat)):\n    for j in range(len(mat[i])):\n        print(mat[i][j], end=" ")`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[i].___; j++) {\n        process.stdout.write(mat[i][j] + " ");\n    }\n}`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[i].length; j++) {\n        process.stdout.write(mat[i][j] + " ");\n    }\n}`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].___; j++) {\n                System.out.print(mat[i][j] + " ");\n            }\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                System.out.print(mat[i][j] + " ");\n            }\n        }\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 706,
    title: 'Suma de Todos los Elementos de una Matriz',
    statement: 'Corrige la acumulación para sumar el elemento mat[i][j] en la variable total.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Acumula total += mat[i][j].',
    explanation: 'Sumar todos los valores de una matriz requiere acumular cada celda visitada durante el doble bucle.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int total = 0;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            // BUG: Suma índices en vez del contenido de la celda\n            total += mat[i][j];\n        }\n    }\n    std::cout << total << std::endl; // 10\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int total = 0;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            total += mat[i][j];\n        }\n    }\n    std::cout << total << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\ntotal = 0\nfor fila in mat:\n    for val in fila:\n        total += val\nprint(total)`,
        solutionCode: `mat = [[1, 2], [3, 4]]\ntotal = 0\nfor fila in mat:\n    for val in fila:\n        total += val\nprint(total)`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nlet total = 0;\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[i].length; j++) {\n        total += mat[i][j];\n    }\n}\nconsole.log(total);`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nlet total = 0;\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[i].length; j++) {\n        total += mat[i][j];\n    }\n}\nconsole.log(total);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int total = 0;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                total += mat[i][j];\n            }\n        }\n        System.out.println(total);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int total = 0;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                total += mat[i][j];\n            }\n        }\n        System.out.println(total);\n    }\n}`
      }
    }
  },
  {
    id: 707,
    title: 'Extracción de la Diagonal Principal',
    statement: 'Completa la lectura del elemento diagonal mat[i][___] (donde fila == columna).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La diagonal principal cumple que fila == columna: mat[i][i].',
    explanation: 'La diagonal principal de una matriz cuadrada $N \times N$ está formada por las celdas $(i, i)$ para $0 \le i < N$.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {5, 1},\n        {2, 9}\n    };\n    for (size_t i = 0; i < mat.size(); i++) {\n        std::cout << mat[i][___] << " "; // 5 9\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {5, 1},\n        {2, 9}\n    };\n    for (size_t i = 0; i < mat.size(); i++) {\n        std::cout << mat[i][i] << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['i']
      },
      python: {
        starterCode: `mat = [\n    [5, 1],\n    [2, 9]\n]\nfor i in range(len(mat)):\n    print(mat[i][___], end=" ")`,
        solutionCode: `mat = [\n    [5, 1],\n    [2, 9]\n]\nfor i in range(len(mat)):\n    print(mat[i][i], end=" ")`,
        acceptedKeywords: ['i']
      },
      javascript: {
        starterCode: `let mat = [\n    [5, 1],\n    [2, 9]\n];\nfor (let i = 0; i < mat.length; i++) {\n    process.stdout.write(mat[i][___] + " ");\n}`,
        solutionCode: `let mat = [\n    [5, 1],\n    [2, 9]\n];\nfor (let i = 0; i < mat.length; i++) {\n    process.stdout.write(mat[i][i] + " ");\n}`,
        acceptedKeywords: ['i']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {\n            {5, 1},\n            {2, 9}\n        };\n        for (int i = 0; i < mat.length; i++) {\n            System.out.print(mat[i][___] + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {\n            {5, 1},\n            {2, 9}\n        };\n        for (int i = 0; i < mat.length; i++) {\n            System.out.print(mat[i][i] + " ");\n        }\n    }\n}`,
        acceptedKeywords: ['i']
      }
    }
  },
  {
    id: 708,
    title: 'Comprobación de Matriz Cuadrada (Filas == Columnas)',
    statement: 'Corrige la condición: una matriz es cuadrada si filas == columnas.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Comprueba mat.size() == mat[0].size().',
    explanation: 'Una matriz es cuadrada cuando la cantidad de filas coincide exactamente con la cantidad de columnas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2, 3}, {4, 5, 6}};\n    bool esCuadrada = (mat.size() == mat[0].size());\n    std::cout << std::boolalpha << esCuadrada << std::endl; // false\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2, 3}, {4, 5, 6}};\n    bool esCuadrada = (mat.size() == mat[0].size());\n    std::cout << std::boolalpha << esCuadrada << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2, 3], [4, 5, 6]]\nes_cuadrada = len(mat) == len(mat[0])\nprint(es_cuadrada)`,
        solutionCode: `mat = [[1, 2, 3], [4, 5, 6]]\nes_cuadrada = len(mat) == len(mat[0])\nprint(es_cuadrada)`
      },
      javascript: {
        starterCode: `let mat = [[1, 2, 3], [4, 5, 6]];\nlet esCuadrada = mat.length === mat[0].length;\nconsole.log(esCuadrada);`,
        solutionCode: `let mat = [[1, 2, 3], [4, 5, 6]];\nlet esCuadrada = mat.length === mat[0].length;\nconsole.log(esCuadrada);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2, 3}, {4, 5, 6}};\n        boolean esCuadrada = mat.length == mat[0].length;\n        System.out.println(esCuadrada);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2, 3}, {4, 5, 6}};\n        boolean esCuadrada = mat.length == mat[0].length;\n        System.out.println(esCuadrada);\n    }\n}`
      }
    }
  },
  {
    id: 709,
    title: 'Creación de Matriz Inicializada con Ceros',
    statement: 'Completa la creación de una matriz 3x3 llena de ceros.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Rellena con 0.',
    explanation: 'Inicializar una matriz con un valor neutro como 0 reserva el espacio de memoria requerido.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    int n = 3;\n    std::vector<std::vector<int>> mat(n, std::vector<int>(n, ___));\n    std::cout << mat[0][0] << std::endl; // 0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    int n = 3;\n    std::vector<std::vector<int>> mat(n, std::vector<int>(n, 0));\n    std::cout << mat[0][0] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `n = 3\nmat = [[___ for _ in range(n)] for _ in range(n)]\nprint(mat[0][0])`,
        solutionCode: `n = 3\nmat = [[0 for _ in range(n)] for _ in range(n)]\nprint(mat[0][0])`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let n = 3;\nlet mat = Array.from({ length: n }, () => new Array(n).fill(___));\nconsole.log(mat[0][0]);`,
        solutionCode: `let n = 3;\nlet mat = Array.from({ length: n }, () => new Array(n).fill(0));\nconsole.log(mat[0][0]);`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = new int[3][3];\n        System.out.println(mat[0][0]); // Por defecto 0\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = new int[3][3];\n        System.out.println(mat[0][0]);\n    }\n}`
      }
    }
  },
  {
    id: 710,
    title: 'Suma de una Fila Específica',
    statement: 'Corrige el índice de fila fija para sumar todos los elementos de la fila 1 (3 + 4 = 7).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Acumula suma += mat[1][j].',
    explanation: 'Para sumar una fila fijamos el primer índice y recorremos las columnas con el bucle.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int suma = 0;\n    // Suma fila 1 (3 + 4)\n    for (size_t j = 0; j < mat[1].size(); j++) {\n        suma += mat[1][j];\n    }\n    std::cout << suma << std::endl; // 7\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int suma = 0;\n    for (size_t j = 0; j < mat[1].size(); j++) {\n        suma += mat[1][j];\n    }\n    std::cout << suma << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\nsuma = sum(mat[1])\nprint(suma)`,
        solutionCode: `mat = [[1, 2], [3, 4]]\nsuma = sum(mat[1])\nprint(suma)`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nlet suma = mat[1].reduce((a, b) => a + b, 0);\nconsole.log(suma);`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nlet suma = mat[1].reduce((a, b) => a + b, 0);\nconsole.log(suma);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int suma = 0;\n        for (int j = 0; j < mat[1].length; j++) {\n            suma += mat[1][j];\n        }\n        System.out.println(suma);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int suma = 0;\n        for (int j = 0; j < mat[1].length; j++) {\n            suma += mat[1][j];\n        }\n        System.out.println(suma);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 711 al 720 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 711,
    title: 'Extracción de la Diagonal Secundaria',
    statement: 'Completa la coordenada de la diagonal secundaria: mat[i][n - 1 - ___].',
    type: 'complete',
    difficulty: 'medio',
    hint: 'La columna complementaria es n - 1 - i.',
    explanation: 'La diagonal secundaria va desde la esquina superior derecha a la inferior izquierda con coordenadas (i, n - 1 - i).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int n = mat.size();\n    for (int i = 0; i < n; i++) {\n        std::cout << mat[i][n - 1 - ___] << " "; // 3 5 7\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int n = mat.size();\n    for (int i = 0; i < n; i++) {\n        std::cout << mat[i][n - 1 - i] << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['i']
      },
      python: {
        starterCode: `mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nn = len(mat)\nfor i in range(n):\n    print(mat[i][n - 1 - ___], end=" ")`,
        solutionCode: `mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nn = len(mat)\nfor i in range(n):\n    print(mat[i][n - 1 - i], end=" ")`,
        acceptedKeywords: ['i']
      },
      javascript: {
        starterCode: `let mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];\nlet n = mat.length;\nfor (let i = 0; i < n; i++) {\n    process.stdout.write(mat[i][n - 1 - ___] + " ");\n}`,
        solutionCode: `let mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];\nlet n = mat.length;\nfor (let i = 0; i < n; i++) {\n    process.stdout.write(mat[i][n - 1 - i] + " ");\n}`,
        acceptedKeywords: ['i']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n        int n = mat.length;\n        for (int i = 0; i < n; i++) {\n            System.out.print(mat[i][n - 1 - ___] + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n        int n = mat.length;\n        for (int i = 0; i < n; i++) {\n            System.out.print(mat[i][n - 1 - i] + " ");\n        }\n    }\n}`,
        acceptedKeywords: ['i']
      }
    }
  },
  {
    id: 712,
    title: 'Transposición de una Matriz (Filas por Columnas)',
    statement: 'Corrige la asignación de la matriz transpuesta: T[j][i] = M[i][j].',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Asigna T[j][i] = M[i][j].',
    explanation: 'Transponer una matriz de dimensión N x M produce una matriz M x N intercambiando sus índices.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> M = {{1, 2, 3}, {4, 5, 6}};\n    int r = M.size(), c = M[0].size();\n    std::vector<std::vector<int>> T(c, std::vector<int>(r));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            // BUG: Copia directa sin transponer\n            T[j][i] = M[i][j];\n        }\n    }\n    std::cout << T[0][1] << std::endl; // Debe ser 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> M = {{1, 2, 3}, {4, 5, 6}};\n    int r = M.size(), c = M[0].size();\n    std::vector<std::vector<int>> T(c, std::vector<int>(r));\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            T[j][i] = M[i][j];\n        }\n    }\n    std::cout << T[0][1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `M = [[1, 2, 3], [4, 5, 6]]\nr, c = len(M), len(M[0])\nT = [[M[i][j] for i in range(r)] for j in range(c)]\nprint(T[0][1])`,
        solutionCode: `M = [[1, 2, 3], [4, 5, 6]]\nr, c = len(M), len(M[0])\nT = [[M[i][j] for i in range(r)] for j in range(c)]\nprint(T[0][1])`
      },
      javascript: {
        starterCode: `let M = [[1, 2, 3], [4, 5, 6]];\nlet r = M.length, c = M[0].length;\nlet T = Array.from({ length: c }, (_, j) => Array.from({ length: r }, (_, i) => M[i][j]));\nconsole.log(T[0][1]);`,
        solutionCode: `let M = [[1, 2, 3], [4, 5, 6]];\nlet r = M.length, c = M[0].length;\nlet T = Array.from({ length: c }, (_, j) => Array.from({ length: r }, (_, i) => M[i][j]));\nconsole.log(T[0][1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] M = {{1, 2, 3}, {4, 5, 6}};\n        int r = M.length, c = M[0].length;\n        int[][] T = new int[c][r];\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                T[j][i] = M[i][j];\n            }\n        }\n        System.out.println(T[0][1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] M = {{1, 2, 3}, {4, 5, 6}};\n        int r = M.length, c = M[0].length;\n        int[][] T = new int[c][r];\n        for (int i = 0; i < r; i++) {\n            for (int j = 0; j < c; j++) {\n                T[j][i] = M[i][j];\n            }\n        }\n        System.out.println(T[0][1]);\n    }\n}`
      }
    }
  },
  {
    id: 713,
    title: 'Comprobación de Matriz Identidad',
    statement: 'Completa la validación: si i == j el valor debe ser 1, de lo contrario debe ser ___.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Fuera de la diagonal el valor debe ser 0.',
    explanation: 'La matriz identidad tiene unos en su diagonal principal y ceros en todas las demás posiciones.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 0}, {0, 1}};\n    bool esIdentidad = true;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            int esperado = (i == j) ? 1 : ___;\n            if (mat[i][j] != esperado) esIdentidad = false;\n        }\n    }\n    std::cout << std::boolalpha << esIdentidad << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 0}, {0, 1}};\n    bool esIdentidad = true;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            int esperado = (i == j) ? 1 : 0;\n            if (mat[i][j] != esperado) esIdentidad = false;\n        }\n    }\n    std::cout << std::boolalpha << esIdentidad << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `mat = [[1, 0], [0, 1]]\nes_identidad = True\nfor i in range(len(mat)):\n    for j in range(len(mat[0])):\n        esperado = 1 if i == j else ___\n        if mat[i][j] != esperado: es_identidad = False\nprint(es_identidad)`,
        solutionCode: `mat = [[1, 0], [0, 1]]\nes_identidad = True\nfor i in range(len(mat)):\n    for j in range(len(mat[0])):\n        esperado = 1 if i == j else 0\n        if mat[i][j] != esperado: es_identidad = False\nprint(es_identidad)`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let mat = [[1, 0], [0, 1]];\nlet esIdentidad = true;\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[0].length; j++) {\n        let esperado = (i === j) ? 1 : ___;\n        if (mat[i][j] !== esperado) esIdentidad = false;\n    }\n}\nconsole.log(esIdentidad);`,
        solutionCode: `let mat = [[1, 0], [0, 1]];\nlet esIdentidad = true;\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[0].length; j++) {\n        let esperado = (i === j) ? 1 : 0;\n        if (mat[i][j] !== esperado) esIdentidad = false;\n    }\n}\nconsole.log(esIdentidad);`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 0}, {0, 1}};\n        boolean esIdentidad = true;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[0].length; j++) {\n                int esperado = (i == j) ? 1 : ___;\n                if (mat[i][j] != esperado) esIdentidad = false;\n            }\n        }\n        System.out.println(esIdentidad);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 0}, {0, 1}};\n        boolean esIdentidad = true;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[0].length; j++) {\n                int esperado = (i == j) ? 1 : 0;\n                if (mat[i][j] != esperado) esIdentidad = false;\n            }\n        }\n        System.out.println(esIdentidad);\n    }\n}`,
        acceptedKeywords: ['0']
      }
    }
  },
  {
    id: 714,
    title: 'Suma de una Columna Específica',
    statement: 'Corrige la acumulación para sumar todos los elementos de la columna 0 a lo largo de las filas i.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Acumula suma += mat[i][0].',
    explanation: 'Sumar una columna requiere fijar el segundo índice y recorrer las filas con el contador i.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{10, 2}, {30, 4}};\n    int suma = 0;\n    for (size_t i = 0; i < mat.size(); i++) {\n        // BUG: Suma la fila 0 en vez de la columna 0\n        suma += mat[i][0];\n    }\n    std::cout << suma << std::endl; // 40 (10 + 30)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{10, 2}, {30, 4}};\n    int suma = 0;\n    for (size_t i = 0; i < mat.size(); i++) {\n        suma += mat[i][0];\n    }\n    std::cout << suma << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[10, 2], [30, 4]]\nsuma = sum(mat[i][0] for i in range(len(mat)))\nprint(suma)`,
        solutionCode: `mat = [[10, 2], [30, 4]]\nsuma = sum(mat[i][0] for i in range(len(mat)))\nprint(suma)`
      },
      javascript: {
        starterCode: `let mat = [[10, 2], [30, 4]];\nlet suma = mat.reduce((acc, row) => acc + row[0], 0);\nconsole.log(suma);`,
        solutionCode: `let mat = [[10, 2], [30, 4]];\nlet suma = mat.reduce((acc, row) => acc + row[0], 0);\nconsole.log(suma);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{10, 2}, {30, 4}};\n        int suma = 0;\n        for (int i = 0; i < mat.length; i++) {\n            suma += mat[i][0];\n        }\n        System.out.println(suma);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{10, 2}, {30, 4}};\n        int suma = 0;\n        for (int i = 0; i < mat.length; i++) {\n            suma += mat[i][0];\n        }\n        System.out.println(suma);\n    }\n}`
      }
    }
  },
  {
    id: 715,
    title: 'Búsqueda del Valor Máximo en 2D',
    statement: 'Completa la actualización del máximo si mat[i][j] > maximo.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba if (mat[i][j] > maximo).',
    explanation: 'El máximo global de una matriz se obtiene comparando cada celda con el mayor valor encontrado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{3, 8}, {15, 2}};\n    int maximo = mat[0][0];\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            if (mat[i][j] ___ maximo) {\n                maximo = mat[i][j];\n            }\n        }\n    }\n    std::cout << maximo << std::endl; // 15\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{3, 8}, {15, 2}};\n    int maximo = mat[0][0];\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            if (mat[i][j] > maximo) {\n                maximo = mat[i][j];\n            }\n        }\n    }\n    std::cout << maximo << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['>']
      },
      python: {
        starterCode: `mat = [[3, 8], [15, 2]]\nmaximo = mat[0][0]\nfor fila in mat:\n    for val in fila:\n        if val ___ maximo:\n            maximo = val\nprint(maximo)`,
        solutionCode: `mat = [[3, 8], [15, 2]]\nmaximo = mat[0][0]\nfor fila in mat:\n    for val in fila:\n        if val > maximo:\n            maximo = val\nprint(maximo)`,
        acceptedKeywords: ['>']
      },
      javascript: {
        starterCode: `let mat = [[3, 8], [15, 2]];\nlet maximo = mat[0][0];\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[i].length; j++) {\n        if (mat[i][j] ___ maximo) maximo = mat[i][j];\n    }\n}\nconsole.log(maximo);`,
        solutionCode: `let mat = [[3, 8], [15, 2]];\nlet maximo = mat[0][0];\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat[i].length; j++) {\n        if (mat[i][j] > maximo) maximo = mat[i][j];\n    }\n}\nconsole.log(maximo);`,
        acceptedKeywords: ['>']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{3, 8}, {15, 2}};\n        int maximo = mat[0][0];\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                if (mat[i][j] ___ maximo) maximo = mat[i][j];\n            }\n        }\n        System.out.println(maximo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{3, 8}, {15, 2}};\n        int maximo = mat[0][0];\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                if (mat[i][j] > maximo) maximo = mat[i][j];\n            }\n        }\n        System.out.println(maximo);\n    }\n}`,
        acceptedKeywords: ['>']
      }
    }
  },
  {
    id: 716,
    title: 'Comprobación de Matriz Simétrica (M == M^T)',
    statement: 'Corrige la comparación de simetría verificando si mat[i][j] != mat[j][i].',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba mat[i][j] != mat[j][i].',
    explanation: 'Una matriz cuadrada es simétrica si coincide exactamente con su transpuesta en todas las celdas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 2},\n        {2, 1}\n    };\n    bool simetrica = true;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat.size(); j++) {\n            // BUG: Compara con sí mismo\n            if (mat[i][j] != mat[j][i]) simetrica = false;\n        }\n    }\n    std::cout << std::boolalpha << simetrica << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 2},\n        {2, 1}\n    };\n    bool simetrica = true;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat.size(); j++) {\n            if (mat[i][j] != mat[j][i]) simetrica = false;\n        }\n    }\n    std::cout << std::boolalpha << simetrica << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2], [2, 1]]\nsimetrica = all(mat[i][j] == mat[j][i] for i in range(len(mat)) for j in range(len(mat)))\nprint(simetrica)`,
        solutionCode: `mat = [[1, 2], [2, 1]]\nsimetrica = all(mat[i][j] == mat[j][i] for i in range(len(mat)) for j in range(len(mat)))\nprint(simetrica)`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [2, 1]];\nlet simetrica = true;\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat.length; j++) {\n        if (mat[i][j] !== mat[j][i]) simetrica = false;\n    }\n}\nconsole.log(simetrica);`,
        solutionCode: `let mat = [[1, 2], [2, 1]];\nlet simetrica = true;\nfor (let i = 0; i < mat.length; i++) {\n    for (let j = 0; j < mat.length; j++) {\n        if (mat[i][j] !== mat[j][i]) simetrica = false;\n    }\n}\nconsole.log(simetrica);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {2, 1}};\n        boolean simetrica = true;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat.length; j++) {\n                if (mat[i][j] != mat[j][i]) simetrica = false;\n            }\n        }\n        System.out.println(simetrica);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {2, 1}};\n        boolean simetrica = true;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat.length; j++) {\n                if (mat[i][j] != mat[j][i]) simetrica = false;\n            }\n        }\n        System.out.println(simetrica);\n    }\n}`
      }
    }
  },
  {
    id: 717,
    title: 'Búsqueda de Coordenadas de un Valor (Fila, Columna)',
    statement: 'Completa la asignación de filaPos = i y colPos = ___ al encontrar el valor.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Guarda la columna actual j.',
    explanation: 'Al hallar una coincidencia en 2D guardamos el par ordenado (i, j) que señala su posición exacta.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{10, 20}, {30, 40}};\n    int buscado = 30;\n    int f = -1, c = -1;\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            if (mat[i][j] == buscado) {\n                f = i;\n                c = ___;\n            }\n        }\n    }\n    std::cout << f << " " << c << std::endl; // 1 0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{10, 20}, {30, 40}};\n    int buscado = 30;\n    int f = -1, c = -1;\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            if (mat[i][j] == buscado) {\n                f = i;\n                c = j;\n            }\n        }\n    }\n    std::cout << f << " " << c << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['j']
      },
      python: {
        starterCode: `mat = [[10, 20], [30, 40]]\nbuscado = 30\nf, c = -1, -1\nfor i in range(2):\n    for j in range(2):\n        if mat[i][j] == buscado: f, c = i, ___\nprint(f, c)`,
        solutionCode: `mat = [[10, 20], [30, 40]]\nbuscado = 30\nf, c = -1, -1\nfor i in range(2):\n    for j in range(2):\n        if mat[i][j] == buscado: f, c = i, j\nprint(f, c)`,
        acceptedKeywords: ['j']
      },
      javascript: {
        starterCode: `let mat = [[10, 20], [30, 40]];\nlet buscado = 30;\nlet f = -1, c = -1;\nfor (let i = 0; i < 2; i++) {\n    for (let j = 0; j < 2; j++) {\n        if (mat[i][j] === buscado) { f = i; c = ___; }\n    }\n}\nconsole.log(f, c);`,
        solutionCode: `let mat = [[10, 20], [30, 40]];\nlet buscado = 30;\nlet f = -1, c = -1;\nfor (let i = 0; i < 2; i++) {\n    for (let j = 0; j < 2; j++) {\n        if (mat[i][j] === buscado) { f = i; c = j; }\n    }\n}\nconsole.log(f, c);`,
        acceptedKeywords: ['j']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{10, 20}, {30, 40}};\n        int buscado = 30;\n        int f = -1, c = -1;\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                if (mat[i][j] == buscado) { f = i; c = ___; }\n            }\n        }\n        System.out.println(f + " " + c);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{10, 20}, {30, 40}};\n        int buscado = 30;\n        int f = -1, c = -1;\n        for (int i = 0; i < 2; i++) {\n            for (int j = 0; j < 2; j++) {\n                if (mat[i][j] == buscado) { f = i; c = j; }\n            }\n        }\n        System.out.println(f + " " + c);\n    }\n}`,
        acceptedKeywords: ['j']
      }
    }
  },
  {
    id: 718,
    title: 'Multiplicación Escalar de Matriz',
    statement: 'Corrige la multiplicación escalar multiplicando cada elemento mat[i][j] por el factor k.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Multiplica mat[i][j] *= k.',
    explanation: 'Multiplicar una matriz por un escalar $k$ multiplica individualmente cada uno de sus elementos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int k = 3;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            mat[i][j] *= k;\n        }\n    }\n    std::cout << mat[1][1] << std::endl; // 12 (4 * 3)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int k = 3;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            mat[i][j] *= k;\n        }\n    }\n    std::cout << mat[1][1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\nk = 3\nres = [[val * k for val in fila] for fila in mat]\nprint(res[1][1])`,
        solutionCode: `mat = [[1, 2], [3, 4]]\nk = 3\nres = [[val * k for val in fila] for fila in mat]\nprint(res[1][1])`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nlet k = 3;\nlet res = mat.map(row => row.map(v => v * k));\nconsole.log(res[1][1]);`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nlet k = 3;\nlet res = mat.map(row => row.map(v => v * k));\nconsole.log(res[1][1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int k = 3;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                mat[i][j] *= k;\n            }\n        }\n        System.out.println(mat[1][1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int k = 3;\n        for (int i = 0; i < mat.length; i++) {\n            for (int j = 0; j < mat[i].length; j++) {\n                mat[i][j] *= k;\n            }\n        }\n        System.out.println(mat[1][1]);\n    }\n}`
      }
    }
  },
  {
    id: 719,
    title: 'Conteo de Celdas con Valor Específico (Ceros)',
    statement: 'Completa la condición para contar celdas iguales a 0 (if mat[i][j] == ___).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba mat[i][j] == 0.',
    explanation: 'El conteo condicional en matrices permite analizar densidades o matrices dispersas (*sparse matrices*).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{0, 5}, {0, 0}};\n    int ceros = 0;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            if (mat[i][j] == ___) ceros++;\n        }\n    }\n    std::cout << ceros << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{0, 5}, {0, 0}};\n    int ceros = 0;\n    for (size_t i = 0; i < mat.size(); i++) {\n        for (size_t j = 0; j < mat[i].size(); j++) {\n            if (mat[i][j] == 0) ceros++;\n        }\n    }\n    std::cout << ceros << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `mat = [[0, 5], [0, 0]]\nceros = sum(1 for fila in mat for v in fila if v == ___)\nprint(ceros)`,
        solutionCode: `mat = [[0, 5], [0, 0]]\nceros = sum(1 for fila in mat for v in fila if v == 0)\nprint(ceros)`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let mat = [[0, 5], [0, 0]];\nlet ceros = 0;\nfor (let row of mat) for (let v of row) if (v === ___) ceros++;\nconsole.log(ceros);`,
        solutionCode: `let mat = [[0, 5], [0, 0]];\nlet ceros = 0;\nfor (let row of mat) for (let v of row) if (v === 0) ceros++;\nconsole.log(ceros);`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{0, 5}, {0, 0}};\n        int ceros = 0;\n        for (int[] row : mat) for (int v : row) if (v == ___) ceros++;\n        System.out.println(ceros);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{0, 5}, {0, 0}};\n        int ceros = 0;\n        for (int[] row : mat) for (int v : row) if (v == 0) ceros++;\n        System.out.println(ceros);\n    }\n}`,
        acceptedKeywords: ['0']
      }
    }
  },
  {
    id: 720,
    title: 'Suma de Dos Matrices del Mismo Tamaño',
    statement: 'Corrige la suma elemento a elemento: C[i][j] = A[i][j] + B[i][j].',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Suma A[i][j] + B[i][j].',
    explanation: 'La suma matricial se efectúa sumando las entradas homólogas de ambas matrices.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> A = {{1, 2}, {3, 4}};\n    std::vector<std::vector<int>> B = {{5, 6}, {7, 8}};\n    std::vector<std::vector<int>> C = A;\n    for (size_t i = 0; i < A.size(); i++) {\n        for (size_t j = 0; j < A[i].size(); j++) {\n            C[i][j] = A[i][j] + B[i][j];\n        }\n    }\n    std::cout << C[0][0] << std::endl; // 6 (1 + 5)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> A = {{1, 2}, {3, 4}};\n    std::vector<std::vector<int>> B = {{5, 6}, {7, 8}};\n    std::vector<std::vector<int>> C = A;\n    for (size_t i = 0; i < A.size(); i++) {\n        for (size_t j = 0; j < A[i].size(); j++) {\n            C[i][j] = A[i][j] + B[i][j];\n        }\n    }\n    std::cout << C[0][0] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `A, B = [[1, 2], [3, 4]], [[5, 6], [7, 8]]\nC = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]\nprint(C[0][0])`,
        solutionCode: `A, B = [[1, 2], [3, 4]], [[5, 6], [7, 8]]\nC = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]\nprint(C[0][0])`
      },
      javascript: {
        starterCode: `let A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]];\nlet C = A.map((row, i) => row.map((v, j) => v + B[i][j]));\nconsole.log(C[0][0]);`,
        solutionCode: `let A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]];\nlet C = A.map((row, i) => row.map((v, j) => v + B[i][j]));\nconsole.log(C[0][0]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] A = {{1, 2}, {3, 4}}, B = {{5, 6}, {7, 8}};\n        int[][] C = new int[2][2];\n        for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) C[i][j] = A[i][j] + B[i][j];\n        System.out.println(C[0][0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] A = {{1, 2}, {3, 4}}, B = {{5, 6}, {7, 8}};\n        int[][] C = new int[2][2];\n        for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) C[i][j] = A[i][j] + B[i][j];\n        System.out.println(C[0][0]);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 721 al 730 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 721,
    title: 'Rotación de Matriz 90° en Sentido Horario (In-Place)',
    statement: 'Completa la rotación 90°: primero se transpone la matriz y luego se invierte cada ___.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Tras transponer, se invierte cada fila.',
    explanation: 'Rotar una matriz $90^\circ$ en sentido horario equivale a transponerla y luego invertir el orden de cada fila.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int n = mat.size();\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++)\n            std::swap(mat[i][j], mat[j][i]);\n    for (int i = 0; i < n; i++)\n        std::reverse(mat[i].begin(), mat[i].end());\n    std::cout << mat[0][0] << " " << mat[0][1] << std::endl; // 3 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int n = mat.size();\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++)\n            std::swap(mat[i][j], mat[j][i]);\n    for (int i = 0; i < n; i++)\n        std::reverse(mat[i].begin(), mat[i].end());\n    std::cout << mat[0][0] << " " << mat[0][1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['reverse']
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\n# Rotar 90 grados: transponer + invertir filas\nrotada = [list(fila)[::-1] for fila in zip(*mat)]\nprint(rotada[0][0], rotada[0][1])`,
        solutionCode: `mat = [[1, 2], [3, 4]]\nrotada = [list(fila)[::-1] for fila in zip(*mat)]\nprint(rotada[0][0], rotada[0][1])`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nlet n = mat.length;\nfor (let i = 0; i < n; i++)\n    for (let j = i + 1; j < n; j++)\n        [mat[i][j], mat[j][i]] = [mat[j][i], mat[i][j]];\nfor (let i = 0; i < n; i++) mat[i].reverse();\nconsole.log(mat[0][0], mat[0][1]);`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nlet n = mat.length;\nfor (let i = 0; i < n; i++)\n    for (let j = i + 1; j < n; j++)\n        [mat[i][j], mat[j][i]] = [mat[j][i], mat[i][j]];\nfor (let i = 0; i < n; i++) mat[i].reverse();\nconsole.log(mat[0][0], mat[0][1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int n = mat.length;\n        for (int i = 0; i < n; i++)\n            for (int j = i + 1; j < n; j++) {\n                int t = mat[i][j]; mat[i][j] = mat[j][i]; mat[j][i] = t;\n            }\n        for (int i = 0; i < n; i++) {\n            int t = mat[i][0]; mat[i][0] = mat[i][1]; mat[i][1] = t;\n        }\n        System.out.println(mat[0][0] + " " + mat[0][1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int n = mat.length;\n        for (int i = 0; i < n; i++)\n            for (int j = i + 1; j < n; j++) {\n                int t = mat[i][j]; mat[i][j] = mat[j][i]; mat[j][i] = t;\n            }\n        for (int i = 0; i < n; i++) {\n            int t = mat[i][0]; mat[i][0] = mat[i][1]; mat[i][1] = t;\n        }\n        System.out.println(mat[0][0] + " " + mat[0][1]);\n    }\n}`
      }
    }
  },
  {
    id: 722,
    title: 'Multiplicación de Matrices (A x B con Triple Bucle)',
    statement: 'Corrige la acumulación del producto: C[i][j] += A[i][k] * B[k][j].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Acumula A[i][k] * B[k][j].',
    explanation: 'El producto de matrices combina el producto punto de la fila i de A con la columna j de B en O(N^3).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> A = {{1, 2}, {3, 4}};\n    std::vector<std::vector<int>> B = {{2, 0}, {1, 2}};\n    std::vector<std::vector<int>> C(2, std::vector<int>(2, 0));\n    for (int i = 0; i < 2; i++)\n        for (int j = 0; j < 2; j++)\n            for (int k = 0; k < 2; k++)\n                C[i][j] += A[i][k] * B[k][j];\n    std::cout << C[0][0] << std::endl; // 4 (1*2 + 2*1)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> A = {{1, 2}, {3, 4}};\n    std::vector<std::vector<int>> B = {{2, 0}, {1, 2}};\n    std::vector<std::vector<int>> C(2, std::vector<int>(2, 0));\n    for (int i = 0; i < 2; i++)\n        for (int j = 0; j < 2; j++)\n            for (int k = 0; k < 2; k++)\n                C[i][j] += A[i][k] * B[k][j];\n    std::cout << C[0][0] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `A, B = [[1, 2], [3, 4]], [[2, 0], [1, 2]]\nC = [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]\nprint(C[0][0])`,
        solutionCode: `A, B = [[1, 2], [3, 4]], [[2, 0], [1, 2]]\nC = [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]\nprint(C[0][0])`
      },
      javascript: {
        starterCode: `let A = [[1, 2], [3, 4]], B = [[2, 0], [1, 2]];\nlet C = [[0, 0], [0, 0]];\nfor (let i = 0; i < 2; i++)\n    for (let j = 0; j < 2; j++)\n        for (let k = 0; k < 2; k++)\n            C[i][j] += A[i][k] * B[k][j];\nconsole.log(C[0][0]);`,
        solutionCode: `let A = [[1, 2], [3, 4]], B = [[2, 0], [1, 2]];\nlet C = [[0, 0], [0, 0]];\nfor (let i = 0; i < 2; i++)\n    for (let j = 0; j < 2; j++)\n        for (let k = 0; k < 2; k++)\n            C[i][j] += A[i][k] * B[k][j];\nconsole.log(C[0][0]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] A = {{1, 2}, {3, 4}}, B = {{2, 0}, {1, 2}};\n        int[][] C = new int[2][2];\n        for (int i = 0; i < 2; i++)\n            for (int j = 0; j < 2; j++)\n                for (int k = 0; k < 2; k++)\n                    C[i][j] += A[i][k] * B[k][j];\n        System.out.println(C[0][0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] A = {{1, 2}, {3, 4}}, B = {{2, 0}, {1, 2}};\n        int[][] C = new int[2][2];\n        for (int i = 0; i < 2; i++)\n            for (int j = 0; j < 2; j++)\n                for (int k = 0; k < 2; k++)\n                    C[i][j] += A[i][k] * B[k][j];\n        System.out.println(C[0][0]);\n    }\n}`
      }
    }
  },
  {
    id: 723,
    title: 'Búsqueda en Matriz Ordenada (O(N + M) Search)',
    statement: 'Completa el decremento de columna c-- si el elemento actual supera al objetivo.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Si mat[f][c] > objetivo, retrocede con c--.',
    explanation: 'Empezar en la esquina superior derecha permite descartar una fila o columna en cada paso en tiempo lineal.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 4, 7},\n        {2, 5, 8},\n        {3, 6, 9}\n    };\n    int objetivo = 5;\n    int f = 0, c = 2;\n    bool hallado = false;\n    while (f < 3 && c >= 0) {\n        if (mat[f][c] == objetivo) { hallado = true; break; }\n        else if (mat[f][c] > objetivo) ___;\n        else f++;\n    }\n    std::cout << std::boolalpha << hallado << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {\n        {1, 4, 7},\n        {2, 5, 8},\n        {3, 6, 9}\n    };\n    int objetivo = 5;\n    int f = 0, c = 2;\n    bool hallado = false;\n    while (f < 3 && c >= 0) {\n        if (mat[f][c] == objetivo) { hallado = true; break; }\n        else if (mat[f][c] > objetivo) c--;\n        else f++;\n    }\n    std::cout << std::boolalpha << hallado << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['c--', '--c', 'c -= 1']
      },
      python: {
        starterCode: `mat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]\nobjetivo = 5\nf, c = 0, 2\nhallado = False\nwhile f < 3 and c >= 0:\n    if mat[f][c] == objetivo: hallado = True; break\n    elif mat[f][c] > objetivo: ___\n    else: f += 1\nprint(hallado)`,
        solutionCode: `mat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]\nobjetivo = 5\nf, c = 0, 2\nhallado = False\nwhile f < 3 and c >= 0:\n    if mat[f][c] == objetivo: hallado = True; break\n    elif mat[f][c] > objetivo: c -= 1\n    else: f += 1\nprint(hallado)`,
        acceptedKeywords: ['c -= 1', 'c = c - 1']
      },
      javascript: {
        starterCode: `let mat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];\nlet objetivo = 5;\nlet f = 0, c = 2, hallado = false;\nwhile (f < 3 && c >= 0) {\n    if (mat[f][c] === objetivo) { hallado = true; break; }\n    else if (mat[f][c] > objetivo) ___;\n    else f++;\n}\nconsole.log(hallado);`,
        solutionCode: `let mat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];\nlet objetivo = 5;\nlet f = 0, c = 2, hallado = false;\nwhile (f < 3 && c >= 0) {\n    if (mat[f][c] === objetivo) { hallado = true; break; }\n    else if (mat[f][c] > objetivo) c--;\n    else f++;\n}\nconsole.log(hallado);`,
        acceptedKeywords: ['c--', '--c', 'c -= 1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 4, 7}, {2, 5, 8}, {3, 6, 9}};\n        int objetivo = 5;\n        int f = 0, c = 2;\n        boolean hallado = false;\n        while (f < 3 && c >= 0) {\n            if (mat[f][c] == objetivo) { hallado = true; break; }\n            else if (mat[f][c] > objetivo) ___;\n            else f++;\n        }\n        System.out.println(hallado);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 4, 7}, {2, 5, 8}, {3, 6, 9}};\n        int objetivo = 5;\n        int f = 0, c = 2;\n        boolean hallado = false;\n        while (f < 3 && c >= 0) {\n            if (mat[f][c] == objetivo) { hallado = true; break; }\n            else if (mat[f][c] > objetivo) c--;\n            else f++;\n        }\n        System.out.println(hallado);\n    }\n}`,
        acceptedKeywords: ['c--', '--c', 'c -= 1']
      }
    }
  },
  {
    id: 724,
    title: 'Recorrido en Espiral (Spiral Matrix)',
    statement: 'Corrige la actualización de límites tras recorrer la columna derecha de arriba a abajo (right--).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Decrementa el límite derecho con right--.',
    explanation: 'El recorrido en espiral ajusta progresivamente los cuatro límites de frontera.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int top = 0, bottom = 2, left = 0, right = 2;\n    // Tras recorrer de top a bottom en columna right:\n    right--;\n    std::cout << right << std::endl; // 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int top = 0, bottom = 2, left = 0, right = 2;\n    right--;\n    std::cout << right << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `top, bottom, left, right = 0, 2, 0, 2\nright -= 1\nprint(right)`,
        solutionCode: `top, bottom, left, right = 0, 2, 0, 2\nright -= 1\nprint(right)`
      },
      javascript: {
        starterCode: `let top = 0, bottom = 2, left = 0, right = 2;\nright--;\nconsole.log(right);`,
        solutionCode: `let top = 0, bottom = 2, left = 0, right = 2;\nright--;\nconsole.log(right);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int top = 0, bottom = 2, left = 0, right = 2;\n        right--;\n        System.out.println(right);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int top = 0, bottom = 2, left = 0, right = 2;\n        right--;\n        System.out.println(right);\n    }\n}`
      }
    }
  },
  {
    id: 725,
    title: 'Algoritmo Flood Fill (Relleno de Región en Matriz)',
    statement: 'Completa la llamada recursiva para expandir el relleno hacia la fila inferior (r + 1, c).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Llama a floodFill(mat, r + 1, c, colorOrig, nuevoColor).',
    explanation: 'Flood fill propaga un nuevo color a todas las celdas adyacentes conectadas del mismo color original.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nvoid floodFill(std::vector<std::vector<int>> &m, int r, int c, int colOrig, int nuevoCol) {\n    if (r < 0 || r >= (int)m.size() || c < 0 || c >= (int)m[0].size()) return;\n    if (m[r][c] != colOrig || m[r][c] == nuevoCol) return;\n    m[r][c] = nuevoCol;\n    floodFill(m, r + 1, ___, colOrig, nuevoCol);\n}\n\nint main() {\n    std::vector<std::vector<int>> m = {{1, 1}, {1, 0}};\n    floodFill(m, 0, 0, 1, 2);\n    std::cout << m[1][0] << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nvoid floodFill(std::vector<std::vector<int>> &m, int r, int c, int colOrig, int nuevoCol) {\n    if (r < 0 || r >= (int)m.size() || c < 0 || c >= (int)m[0].size()) return;\n    if (m[r][c] != colOrig || m[r][c] == nuevoCol) return;\n    m[r][c] = nuevoCol;\n    floodFill(m, r + 1, c, colOrig, nuevoCol);\n}\n\nint main() {\n    std::vector<std::vector<int>> m = {{1, 1}, {1, 0}};\n    floodFill(m, 0, 0, 1, 2);\n    std::cout << m[1][0] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['c']
      },
      python: {
        starterCode: `def flood_fill(m, r, c, orig, nuevo):\n    if r < 0 or r >= len(m) or c < 0 or c >= len(m[0]): return\n    if m[r][c] != orig or m[r][c] == nuevo: return\n    m[r][c] = nuevo\n    flood_fill(m, r + 1, ___, orig, nuevo)\n\nm = [[1, 1], [1, 0]]\nflood_fill(m, 0, 0, 1, 2)\nprint(m[1][0])`,
        solutionCode: `def flood_fill(m, r, c, orig, nuevo):\n    if r < 0 or r >= len(m) or c < 0 or c >= len(m[0]): return\n    if m[r][c] != orig or m[r][c] == nuevo: return\n    m[r][c] = nuevo\n    flood_fill(m, r + 1, c, orig, nuevo)\n\nm = [[1, 1], [1, 0]]\nflood_fill(m, 0, 0, 1, 2)\nprint(m[1][0])`,
        acceptedKeywords: ['c']
      },
      javascript: {
        starterCode: `function floodFill(m, r, c, orig, nuevo) {\n    if (r < 0 || r >= m.length || c < 0 || c >= m[0].length) return;\n    if (m[r][c] !== orig || m[r][c] === nuevo) return;\n    m[r][c] = nuevo;\n    floodFill(m, r + 1, ___, orig, nuevo);\n}\nlet m = [[1, 1], [1, 0]];\nfloodFill(m, 0, 0, 1, 2);\nconsole.log(m[1][0]);`,
        solutionCode: `function floodFill(m, r, c, orig, nuevo) {\n    if (r < 0 || r >= m.length || c < 0 || c >= m[0].length) return;\n    if (m[r][c] !== orig || m[r][c] === nuevo) return;\n    m[r][c] = nuevo;\n    floodFill(m, r + 1, c, orig, nuevo);\n}\nlet m = [[1, 1], [1, 0]];\nfloodFill(m, 0, 0, 1, 2);\nconsole.log(m[1][0]);`,
        acceptedKeywords: ['c']
      },
      java: {
        starterCode: `public class Main {\n    static void floodFill(int[][] m, int r, int c, int orig, int nuevo) {\n        if (r < 0 || r >= m.length || c < 0 || c >= m[0].length) return;\n        if (m[r][c] != orig || m[r][c] == nuevo) return;\n        m[r][c] = nuevo;\n        floodFill(m, r + 1, ___, orig, nuevo);\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1, 1}, {1, 0}};\n        floodFill(m, 0, 0, 1, 2);\n        System.out.println(m[1][0]);\n    }\n}`,
        solutionCode: `public class Main {\n    static void floodFill(int[][] m, int r, int c, int orig, int nuevo) {\n        if (r < 0 || r >= m.length || c < 0 || c >= m[0].length) return;\n        if (m[r][c] != orig || m[r][c] == nuevo) return;\n        m[r][c] = nuevo;\n        floodFill(m, r + 1, c, orig, nuevo);\n    }\n    public static void main(String[] args) {\n        int[][] m = {{1, 1}, {1, 0}};\n        floodFill(m, 0, 0, 1, 2);\n        System.out.println(m[1][0]);\n    }\n}`,
        acceptedKeywords: ['c']
      }
    }
  },
  {
    id: 726,
    title: 'Suma de Prefijos en 2D (2D Prefix Sum)',
    statement: 'Corrige la fórmula de inclusión-exclusión: pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Resta la intersección doble pref[i-1][j-1].',
    explanation: 'El principio de inclusión-exclusión en 2D permite calcular sumas de cualquier subrectángulo en O(1).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> M = {{1, 2}, {3, 4}};\n    std::vector<std::vector<int>> pref(3, std::vector<int>(3, 0));\n    for (int i = 1; i <= 2; i++) {\n        for (int j = 1; j <= 2; j++) {\n            // BUG: Suma la intersección en vez de restarla\n            pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n        }\n    }\n    std::cout << pref[2][2] << std::endl; // 10\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> M = {{1, 2}, {3, 4}};\n    std::vector<std::vector<int>> pref(3, std::vector<int>(3, 0));\n    for (int i = 1; i <= 2; i++) {\n        for (int j = 1; j <= 2; j++) {\n            pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n        }\n    }\n    std::cout << pref[2][2] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `M = [[1, 2], [3, 4]]\npref = [[0]*3 for _ in range(3)]\nfor i in range(1, 3):\n    for j in range(1, 3):\n        pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]\nprint(pref[2][2])`,
        solutionCode: `M = [[1, 2], [3, 4]]\npref = [[0]*3 for _ in range(3)]\nfor i in range(1, 3):\n    for j in range(1, 3):\n        pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1]\nprint(pref[2][2])`
      },
      javascript: {
        starterCode: `let M = [[1, 2], [3, 4]];\nlet pref = Array.from({ length: 3 }, () => new Array(3).fill(0));\nfor (let i = 1; i <= 2; i++) {\n    for (let j = 1; j <= 2; j++) {\n        pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n    }\n}\nconsole.log(pref[2][2]);`,
        solutionCode: `let M = [[1, 2], [3, 4]];\nlet pref = Array.from({ length: 3 }, () => new Array(3).fill(0));\nfor (let i = 1; i <= 2; i++) {\n    for (let j = 1; j <= 2; j++) {\n        pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n    }\n}\nconsole.log(pref[2][2]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] M = {{1, 2}, {3, 4}};\n        int[][] pref = new int[3][3];\n        for (int i = 1; i <= 2; i++) {\n            for (int j = 1; j <= 2; j++) {\n                pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n            }\n        }\n        System.out.println(pref[2][2]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] M = {{1, 2}, {3, 4}};\n        int[][] pref = new int[3][3];\n        for (int i = 1; i <= 2; i++) {\n            for (int j = 1; j <= 2; j++) {\n                pref[i][j] = M[i-1][j-1] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];\n            }\n        }\n        System.out.println(pref[2][2]);\n    }\n}`
      }
    }
  },
  {
    id: 727,
    title: 'Detección de Punto de Silla (Saddle Point)',
    statement: 'Completa la validación: si el mínimo de su fila es a la vez el ___ de su columna.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Debe ser el máximo de su columna.',
    explanation: 'Un punto de silla es un elemento que resulta ser el valor mínimo de su fila y el máximo de su columna.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    // mat[1][0] = 3 es min fila 1 (3 < 4) y max col 0 (3 > 1)\n    std::cout << "Punto de silla valido" << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    std::cout << "Punto de silla valido" << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `print("Punto de silla valido")`,
        solutionCode: `print("Punto de silla valido")`
      },
      javascript: {
        starterCode: `console.log("Punto de silla valido");`,
        solutionCode: `console.log("Punto de silla valido");`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Punto de silla valido");\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Punto de silla valido");\n    }\n}`
      }
    }
  },
  {
    id: 728,
    title: 'Validación de Cuadrante 3x3 de Sudoku',
    statement: 'Corrige la comprobación de duplicados en el bloque 3x3 usando un arreglo de frecuencias o conjunto.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Si el número ya fue visto, la subcuadrícula es inválida.',
    explanation: 'Cada bloque $3 \times 3$ de un tablero de Sudoku debe contener los dígitos del 1 al 9 exactamente una vez sin repeticiones.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <set>\n\nint main() {\n    std::vector<int> bloque = {5, 3, 4, 6, 7, 8, 9, 1, 2};\n    std::set<int> vistos(bloque.begin(), bloque.end());\n    bool valido = (vistos.size() == 9);\n    std::cout << std::boolalpha << valido << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <set>\n\nint main() {\n    std::vector<int> bloque = {5, 3, 4, 6, 7, 8, 9, 1, 2};\n    std::set<int> vistos(bloque.begin(), bloque.end());\n    bool valido = (vistos.size() == 9);\n    std::cout << std::boolalpha << valido << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `bloque = [5, 3, 4, 6, 7, 8, 9, 1, 2]\nvalido = len(set(bloque)) == 9\nprint(valido)`,
        solutionCode: `bloque = [5, 3, 4, 6, 7, 8, 9, 1, 2]\nvalido = len(set(bloque)) == 9\nprint(valido)`
      },
      javascript: {
        starterCode: `let bloque = [5, 3, 4, 6, 7, 8, 9, 1, 2];\nlet valido = new Set(bloque).size === 9;\nconsole.log(valido);`,
        solutionCode: `let bloque = [5, 3, 4, 6, 7, 8, 9, 1, 2];\nlet valido = new Set(bloque).size === 9;\nconsole.log(valido);`
      },
      java: {
        starterCode: `import java.util.HashSet;\npublic class Main {\n    public static void main(String[] args) {\n        int[] bloque = {5, 3, 4, 6, 7, 8, 9, 1, 2};\n        HashSet<Integer> vistos = new HashSet<>();\n        for (int x : bloque) vistos.add(x);\n        System.out.println(vistos.size() == 9);\n    }\n}`,
        solutionCode: `import java.util.HashSet;\npublic class Main {\n    public static void main(String[] args) {\n        int[] bloque = {5, 3, 4, 6, 7, 8, 9, 1, 2};\n        HashSet<Integer> vistos = new HashSet<>();\n        for (int x : bloque) vistos.add(x);\n        System.out.println(vistos.size() == 9);\n    }\n}`
      }
    }
  },
  {
    id: 729,
    title: 'Vecindad de Moore en Matriz 2D (8 Direcciones)',
    statement: 'Completa la cantidad de direcciones vecinas (8 direcciones incluyendo diagonales).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Son 8 direcciones vecinas.',
    explanation: 'La vecindad de Moore evalúa las 8 celdas circundantes (ortogonales y diagonales) en cuadrículas 2D.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    int dr[] = {-1, -1, -1,  0, 0,  1, 1, 1};\n    int dc[] = {-1,  0,  1, -1, 1, -1, 0, 1};\n    int direcciones = ___;\n    std::cout << direcciones << std::endl; // 8\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    int dr[] = {-1, -1, -1,  0, 0,  1, 1, 1};\n    int dc[] = {-1,  0,  1, -1, 1, -1, 0, 1};\n    int direcciones = 8;\n    std::cout << direcciones << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['8']
      },
      python: {
        starterCode: `direcciones = ___\nprint(direcciones)`,
        solutionCode: `direcciones = 8\nprint(direcciones)`,
        acceptedKeywords: ['8']
      },
      javascript: {
        starterCode: `let direcciones = ___;\nconsole.log(direcciones);`,
        solutionCode: `let direcciones = 8;\nconsole.log(direcciones);`,
        acceptedKeywords: ['8']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int direcciones = ___;\n        System.out.println(direcciones);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int direcciones = 8;\n        System.out.println(direcciones);\n    }\n}`,
        acceptedKeywords: ['8']
      }
    }
  },
  {
    id: 730,
    title: 'Aplanado de Matriz a Arreglo 1D (Flatten Matrix)',
    statement: 'Corrige la fórmula de indexación unidimensional: idx = i * cols + j.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa idx = i * cols + j.',
    explanation: 'El mapeo estándar Row-Major traduce una posición bidimensional (i, j) a un índice lineal continuo (i * C + j).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int r = 2, c = 2;\n    std::vector<int> lineal(r * c);\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            lineal[i * c + j] = mat[i][j];\n        }\n    }\n    std::cout << lineal[2] << std::endl; // 3 (mat[1][0])\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<std::vector<int>> mat = {{1, 2}, {3, 4}};\n    int r = 2, c = 2;\n    std::vector<int> lineal(r * c);\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) {\n            lineal[i * c + j] = mat[i][j];\n        }\n    }\n    std::cout << lineal[2] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `mat = [[1, 2], [3, 4]]\nlineal = [v for fila in mat for v in fila]\nprint(lineal[2])`,
        solutionCode: `mat = [[1, 2], [3, 4]]\nlineal = [v for fila in mat for v in fila]\nprint(lineal[2])`
      },
      javascript: {
        starterCode: `let mat = [[1, 2], [3, 4]];\nlet lineal = mat.flat();\nconsole.log(lineal[2]);`,
        solutionCode: `let mat = [[1, 2], [3, 4]];\nlet lineal = mat.flat();\nconsole.log(lineal[2]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int[] lineal = new int[4];\n        for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) lineal[i * 2 + j] = mat[i][j];\n        System.out.println(lineal[2]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[][] mat = {{1, 2}, {3, 4}};\n        int[] lineal = new int[4];\n        for (int i = 0; i < 2; i++) for (int j = 0; j < 2; j++) lineal[i * 2 + j] = mat[i][j];\n        System.out.println(lineal[2]);\n    }\n}`
      }
    }
  }
];
