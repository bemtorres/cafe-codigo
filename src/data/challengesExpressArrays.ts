import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressArraysExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 401 al 410 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 401,
    title: 'Acceso al Primer Elemento (Índice 0)',
    statement: 'Completa la expresión para obtener el primer elemento del arreglo (índice 0).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El primer elemento se encuentra en la posición [0].',
    explanation: 'En la mayoría de los lenguajes de programación, los arreglos se indexan comenzando desde el índice 0.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {42, 18, 99};\n    int primero = nums[___];\n    std::cout << primero << std::endl; // 42\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {42, 18, 99};\n    int primero = nums[0];\n    std::cout << primero << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['0']
      },
      python: {
        starterCode: `nums = [42, 18, 99]\nprimero = nums[___]\nprint(primero)`,
        solutionCode: `nums = [42, 18, 99]\nprimero = nums[0]\nprint(primero)`,
        acceptedKeywords: ['0']
      },
      javascript: {
        starterCode: `let nums = [42, 18, 99];\nlet primero = nums[___];\nconsole.log(primero);`,
        solutionCode: `let nums = [42, 18, 99];\nlet primero = nums[0];\nconsole.log(primero);`,
        acceptedKeywords: ['0']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {42, 18, 99};\n        int primero = nums[___];\n        System.out.println(primero);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {42, 18, 99};\n        int primero = nums[0];\n        System.out.println(primero);\n    }\n}`,
        acceptedKeywords: ['0']
      }
    }
  },
  {
    id: 402,
    title: 'Acceso al Último Elemento (n - 1)',
    statement: 'Corrige el índice para acceder al último elemento del arreglo sin provocar error fuera de rango.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El último elemento se ubica en [longitud - 1] (o [-1] en Python).',
    explanation: 'Si un arreglo tiene N elementos, los índices válidos van de 0 a N-1. Acceder al índice N provoca un error de desbordamiento.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    // BUG: nums.size() está fuera de rango\n    int ultimo = nums[nums.size()];\n    std::cout << ultimo << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    int ultimo = nums[nums.size() - 1];\n    std::cout << ultimo << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [10, 20, 30]\nultimo = nums[len(nums)] # BUG: IndexError\nprint(ultimo)`,
        solutionCode: `nums = [10, 20, 30]\nultimo = nums[len(nums) - 1]\nprint(ultimo)`
      },
      javascript: {
        starterCode: `let nums = [10, 20, 30];\nlet ultimo = nums[nums.length]; // BUG: undefined\nconsole.log(ultimo);`,
        solutionCode: `let nums = [10, 20, 30];\nlet ultimo = nums[nums.length - 1];\nconsole.log(ultimo);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        // BUG: ArrayIndexOutOfBoundsException\n        int ultimo = nums[nums.length];\n        System.out.println(ultimo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        int ultimo = nums[nums.length - 1];\n        System.out.println(ultimo);\n    }\n}`
      }
    }
  },
  {
    id: 403,
    title: 'Modificación de Elemento por Índice',
    statement: 'Completa la asignación para cambiar el valor en la posición 1 por 99.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Asigna el nuevo valor: nums[1] = 99.',
    explanation: 'Los elementos de un arreglo mutable pueden modificarse asignando un nuevo valor a su índice correspondiente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    nums[1] = ___;\n    std::cout << nums[1] << std::endl; // 99\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    nums[1] = 99;\n    std::cout << nums[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['99']
      },
      python: {
        starterCode: `nums = [10, 20, 30]\nnums[1] = ___\nprint(nums[1])`,
        solutionCode: `nums = [10, 20, 30]\nnums[1] = 99\nprint(nums[1])`,
        acceptedKeywords: ['99']
      },
      javascript: {
        starterCode: `let nums = [10, 20, 30];\nnums[1] = ___;\nconsole.log(nums[1]);`,
        solutionCode: `let nums = [10, 20, 30];\nnums[1] = 99;\nconsole.log(nums[1]);`,
        acceptedKeywords: ['99']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        nums[1] = ___;\n        System.out.println(nums[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        nums[1] = 99;\n        System.out.println(nums[1]);\n    }\n}`,
        acceptedKeywords: ['99']
      }
    }
  },
  {
    id: 404,
    title: 'Longitud / Tamaño del Arreglo',
    statement: 'Corrige la consulta del tamaño del arreglo para obtener la cantidad total de elementos (4).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa .size() en C++, len() en Python, .length en JS/Java.',
    explanation: 'Las propiedades y métodos de tamaño permiten conocer dinámicamente la cantidad de elementos contenidos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 10, 15, 20};\n    // BUG: sizeof(nums) devuelve bytes del objeto vector, no la cantidad de elementos\n    int tam = nums.size();\n    std::cout << tam << std::endl; // 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 10, 15, 20};\n    int tam = nums.size();\n    std::cout << tam << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [5, 10, 15, 20]\ntam = len(nums)\nprint(tam)`,
        solutionCode: `nums = [5, 10, 15, 20]\ntam = len(nums)\nprint(tam)`
      },
      javascript: {
        starterCode: `let nums = [5, 10, 15, 20];\nlet tam = nums.length;\nconsole.log(tam);`,
        solutionCode: `let nums = [5, 10, 15, 20];\nlet tam = nums.length;\nconsole.log(tam);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 10, 15, 20};\n        int tam = nums.length;\n        System.out.println(tam);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 10, 15, 20};\n        int tam = nums.length;\n        System.out.println(tam);\n    }\n}`
      }
    }
  },
  {
    id: 405,
    title: 'Suma de Elementos en Posiciones Específicas',
    statement: 'Completa la suma del primer elemento (nums[0]) y el tercero (nums[2]).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Suma nums[0] + nums[2].',
    explanation: 'Podemos operar matemáticamente con cualquier elemento accediendo a su posición entre corchetes.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 50, 40};\n    int suma = nums[0] + nums[___];\n    std::cout << suma << std::endl; // 50\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 50, 40};\n    int suma = nums[0] + nums[2];\n    std::cout << suma << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['2']
      },
      python: {
        starterCode: `nums = [10, 50, 40]\nsuma = nums[0] + nums[___]\nprint(suma)`,
        solutionCode: `nums = [10, 50, 40]\nsuma = nums[0] + nums[2]\nprint(suma)`,
        acceptedKeywords: ['2']
      },
      javascript: {
        starterCode: `let nums = [10, 50, 40];\nlet suma = nums[0] + nums[___];\nconsole.log(suma);`,
        solutionCode: `let nums = [10, 50, 40];\nlet suma = nums[0] + nums[2];\nconsole.log(suma);`,
        acceptedKeywords: ['2']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 50, 40};\n        int suma = nums[0] + nums[___];\n        System.out.println(suma);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 50, 40};\n        int suma = nums[0] + nums[2];\n        System.out.println(suma);\n    }\n}`,
        acceptedKeywords: ['2']
      }
    }
  },
  {
    id: 406,
    title: 'Agregar Elemento al Final (Push / Append)',
    statement: 'Corrige el método para insertar el elemento 50 al final del arreglo.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa push_back(50) en C++, append(50) en Python, o push(50) en JS.',
    explanation: 'Los métodos de inserción dinámica permiten expandir la capacidad del arreglo añadiendo nuevos datos al final.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20};\n    // BUG: Sintaxis incorrecta de inserción\n    nums.push_back(50);\n    std::cout << nums[2] << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20};\n    nums.push_back(50);\n    std::cout << nums[2] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [10, 20]\nnums.append(50)\nprint(nums[2])`,
        solutionCode: `nums = [10, 20]\nnums.append(50)\nprint(nums[2])`
      },
      javascript: {
        starterCode: `let nums = [10, 20];\nnums.push(50);\nconsole.log(nums[2]);`,
        solutionCode: `let nums = [10, 20];\nnums.push(50);\nconsole.log(nums[2]);`
      },
      java: {
        starterCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        nums.add(10); nums.add(20);\n        nums.add(50);\n        System.out.println(nums.get(2));\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        nums.add(10); nums.add(20);\n        nums.add(50);\n        System.out.println(nums.get(2));\n    }\n}`
      }
    }
  },
  {
    id: 407,
    title: 'Recorrido Básico de Arreglo con For',
    statement: 'Completa la condición del bucle para recorrer todo el arreglo desde i = 0 hasta i < tamaño.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La condición es i < nums.size() (o i < nums.length).',
    explanation: 'El bucle for tradicional itera los índices válidos desde 0 hasta N-1 mediante la condición i < N.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    for (size_t i = 0; i < nums.___(); i++) {\n        std::cout << nums[i] << " ";\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    for (size_t i = 0; i < nums.size(); i++) {\n        std::cout << nums[i] << " ";\n    }\n    return 0;\n}`,
        acceptedKeywords: ['size', 'length']
      },
      python: {
        starterCode: `nums = [1, 2, 3, 4]\nfor i in range(___(nums)):\n    print(nums[i], end=" ")`,
        solutionCode: `nums = [1, 2, 3, 4]\nfor i in range(len(nums)):\n    print(nums[i], end=" ")`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let nums = [1, 2, 3, 4];\nfor (let i = 0; i < nums.___; i++) {\n    console.log(nums[i]);\n}`,
        solutionCode: `let nums = [1, 2, 3, 4];\nfor (let i = 0; i < nums.length; i++) {\n    console.log(nums[i]);\n}`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        for (int i = 0; i < nums.___; i++) {\n            System.out.print(nums[i] + " ");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        for (int i = 0; i < nums.length; i++) {\n            System.out.print(nums[i] + " ");\n        }\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 408,
    title: 'Suma de Todos los Elementos',
    statement: 'Corrige la acumulación para sumar todos los números del arreglo en la variable total.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa total += nums[i].',
    explanation: 'En cada iteración sumamos el valor ubicado en el índice actual al acumulador total.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 10, 15};\n    int total = 0;\n    for (size_t i = 0; i < nums.size(); i++) {\n        // BUG: Suma el índice i en vez del elemento nums[i]\n        total += i;\n    }\n    std::cout << total << std::endl; // Debe ser 30 (5+10+15)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 10, 15};\n    int total = 0;\n    for (size_t i = 0; i < nums.size(); i++) {\n        total += nums[i];\n    }\n    std::cout << total << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [5, 10, 15]\ntotal = 0\nfor i in range(len(nums)):\n    total += i # BUG\nprint(total)`,
        solutionCode: `nums = [5, 10, 15]\ntotal = 0\nfor i in range(len(nums)):\n    total += nums[i]\nprint(total)`
      },
      javascript: {
        starterCode: `let nums = [5, 10, 15];\nlet total = 0;\nfor (let i = 0; i < nums.length; i++) {\n    total += i; // BUG\n}\nconsole.log(total);`,
        solutionCode: `let nums = [5, 10, 15];\nlet total = 0;\nfor (let i = 0; i < nums.length; i++) {\n    total += nums[i];\n}\nconsole.log(total);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 10, 15};\n        int total = 0;\n        for (int i = 0; i < nums.length; i++) {\n            total += i; // BUG\n        }\n        System.out.println(total);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 10, 15};\n        int total = 0;\n        for (int i = 0; i < nums.length; i++) {\n            total += nums[i];\n        }\n        System.out.println(total);\n    }\n}`
      }
    }
  },
  {
    id: 409,
    title: 'Arreglo de Cadenas (Nombres)',
    statement: 'Completa la lectura del segundo nombre (índice 1) del arreglo.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Accede con nombres[1].',
    explanation: 'Los arreglos pueden almacenar cualquier tipo de datos homogéneo, incluyendo cadenas de texto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> nombres = {"Ana", "Carlos", "Beatriz"};\n    std::cout << nombres[___] << std::endl; // "Carlos"\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> nombres = {"Ana", "Carlos", "Beatriz"};\n    std::cout << nombres[1] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['1']
      },
      python: {
        starterCode: `nombres = ["Ana", "Carlos", "Beatriz"]\nprint(nombres[___])`,
        solutionCode: `nombres = ["Ana", "Carlos", "Beatriz"]\nprint(nombres[1])`,
        acceptedKeywords: ['1']
      },
      javascript: {
        starterCode: `let nombres = ["Ana", "Carlos", "Beatriz"];\nconsole.log(nombres[___]);`,
        solutionCode: `let nombres = ["Ana", "Carlos", "Beatriz"];\nconsole.log(nombres[1]);`,
        acceptedKeywords: ['1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String[] nombres = {"Ana", "Carlos", "Beatriz"};\n        System.out.println(nombres[___]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String[] nombres = {"Ana", "Carlos", "Beatriz"};\n        System.out.println(nombres[1]);\n    }\n}`,
        acceptedKeywords: ['1']
      }
    }
  },
  {
    id: 410,
    title: 'Eliminar el Último Elemento (Pop)',
    statement: 'Corrige la eliminación del último elemento usando pop_back() / pop().',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa pop_back() en C++, pop() en Python y JS.',
    explanation: 'La operación pop elimina el último dato reduciendo en 1 el tamaño del arreglo dinámico.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    // Elimina el 30\n    nums.pop_back();\n    std::cout << nums.size() << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    nums.pop_back();\n    std::cout << nums.size() << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [10, 20, 30]\nnums.pop()\nprint(len(nums))`,
        solutionCode: `nums = [10, 20, 30]\nnums.pop()\nprint(len(nums))`
      },
      javascript: {
        starterCode: `let nums = [10, 20, 30];\nnums.pop();\nconsole.log(nums.length);`,
        solutionCode: `let nums = [10, 20, 30];\nnums.pop();\nconsole.log(nums.length);`
      },
      java: {
        starterCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        nums.add(10); nums.add(20); nums.add(30);\n        nums.remove(nums.size() - 1);\n        System.out.println(nums.size());\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> nums = new ArrayList<>();\n        nums.add(10); nums.add(20); nums.add(30);\n        nums.remove(nums.size() - 1);\n        System.out.println(nums.size());\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 411 al 420 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 411,
    title: 'Búsqueda del Elemento Mayor (Máximo)',
    statement: 'Completa la actualización del máximo si el elemento actual nums[i] supera al maximo.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba if (nums[i] > maximo).',
    explanation: 'Para hallar el máximo, comparamos cada elemento con el mayor registrado hasta el momento.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {12, 45, 7, 89, 23};\n    int maximo = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] ___ maximo) {\n            maximo = nums[i];\n        }\n    }\n    std::cout << maximo << std::endl; // 89\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {12, 45, 7, 89, 23};\n    int maximo = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] > maximo) {\n            maximo = nums[i];\n        }\n    }\n    std::cout << maximo << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['>']
      },
      python: {
        starterCode: `nums = [12, 45, 7, 89, 23]\nmaximo = nums[0]\nfor x in nums:\n    if x ___ maximo:\n        maximo = x\nprint(maximo)`,
        solutionCode: `nums = [12, 45, 7, 89, 23]\nmaximo = nums[0]\nfor x in nums:\n    if x > maximo:\n        maximo = x\nprint(maximo)`,
        acceptedKeywords: ['>']
      },
      javascript: {
        starterCode: `let nums = [12, 45, 7, 89, 23];\nlet maximo = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] ___ maximo) {\n        maximo = nums[i];\n    }\n}\nconsole.log(maximo);`,
        solutionCode: `let nums = [12, 45, 7, 89, 23];\nlet maximo = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] > maximo) {\n        maximo = nums[i];\n    }\n}\nconsole.log(maximo);`,
        acceptedKeywords: ['>']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {12, 45, 7, 89, 23};\n        int maximo = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] ___ maximo) {\n                maximo = nums[i];\n            }\n        }\n        System.out.println(maximo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {12, 45, 7, 89, 23};\n        int maximo = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] > maximo) {\n                maximo = nums[i];\n            }\n        }\n        System.out.println(maximo);\n    }\n}`,
        acceptedKeywords: ['>']
      }
    }
  },
  {
    id: 412,
    title: 'Búsqueda del Elemento Menor (Mínimo)',
    statement: 'Corrige la condición de actualización para encontrar el valor mínimo.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Actualiza si nums[i] < minimo.',
    explanation: 'El valor mínimo se actualiza cuando encontramos un elemento estrictamente menor.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {45, 12, 89, 7, 23};\n    int minimo = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        // BUG: Compara mayor en vez de menor\n        if (nums[i] > minimo) {\n            minimo = nums[i];\n        }\n    }\n    std::cout << minimo << std::endl; // Debe ser 7\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {45, 12, 89, 7, 23};\n    int minimo = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] < minimo) {\n            minimo = nums[i];\n        }\n    }\n    std::cout << minimo << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [45, 12, 89, 7, 23]\nminimo = nums[0]\nfor x in nums:\n    if x > minimo: # BUG\n        minimo = x\nprint(minimo)`,
        solutionCode: `nums = [45, 12, 89, 7, 23]\nminimo = nums[0]\nfor x in nums:\n    if x < minimo:\n        minimo = x\nprint(minimo)`
      },
      javascript: {
        starterCode: `let nums = [45, 12, 89, 7, 23];\nlet minimo = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] > minimo) { minimo = nums[i]; } // BUG\n}\nconsole.log(minimo);`,
        solutionCode: `let nums = [45, 12, 89, 7, 23];\nlet minimo = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] < minimo) { minimo = nums[i]; }\n}\nconsole.log(minimo);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {45, 12, 89, 7, 23};\n        int minimo = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] > minimo) { minimo = nums[i]; } // BUG\n        }\n        System.out.println(minimo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {45, 12, 89, 7, 23};\n        int minimo = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] < minimo) { minimo = nums[i]; }\n        }\n        System.out.println(minimo);\n    }\n}`
      }
    }
  },
  {
    id: 413,
    title: 'Búsqueda Lineal (Índice de un Valor)',
    statement: 'Completa la asignación del índice encontrado y detén el bucle con break.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Guarda pos = i y haz break.',
    explanation: 'La búsqueda lineal recorre secuencialmente el arreglo hasta hallar la coincidencia o terminar.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 25, 30, 45, 50};\n    int objetivo = 45;\n    int pos = -1;\n    for (size_t i = 0; i < nums.size(); i++) {\n        if (nums[i] == objetivo) {\n            pos = ___;\n            break;\n        }\n    }\n    std::cout << pos << std::endl; // 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 25, 30, 45, 50};\n    int objetivo = 45;\n    int pos = -1;\n    for (size_t i = 0; i < nums.size(); i++) {\n        if (nums[i] == objetivo) {\n            pos = i;\n            break;\n        }\n    }\n    std::cout << pos << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['i']
      },
      python: {
        starterCode: `nums = [10, 25, 30, 45, 50]\nobjetivo = 45\npos = -1\nfor i in range(len(nums)):\n    if nums[i] == objetivo:\n        pos = ___\n        break\nprint(pos)`,
        solutionCode: `nums = [10, 25, 30, 45, 50]\nobjetivo = 45\npos = -1\nfor i in range(len(nums)):\n    if nums[i] == objetivo:\n        pos = i\n        break\nprint(pos)`,
        acceptedKeywords: ['i']
      },
      javascript: {
        starterCode: `let nums = [10, 25, 30, 45, 50];\nlet objetivo = 45;\nlet pos = -1;\nfor (let i = 0; i < nums.length; i++) {\n    if (nums[i] === objetivo) {\n        pos = ___;\n        break;\n    }\n}\nconsole.log(pos);`,
        solutionCode: `let nums = [10, 25, 30, 45, 50];\nlet objetivo = 45;\nlet pos = -1;\nfor (let i = 0; i < nums.length; i++) {\n    if (nums[i] === objetivo) {\n        pos = i;\n        break;\n    }\n}\nconsole.log(pos);`,
        acceptedKeywords: ['i']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 25, 30, 45, 50};\n        int objetivo = 45;\n        int pos = -1;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == objetivo) {\n                pos = ___;\n                break;\n            }\n        }\n        System.out.println(pos);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 25, 30, 45, 50};\n        int objetivo = 45;\n        int pos = -1;\n        for (int i = 0; i < nums.length; i++) {\n            if (nums[i] == objetivo) {\n                pos = i;\n                break;\n            }\n        }\n        System.out.println(pos);\n    }\n}`,
        acceptedKeywords: ['i']
      }
    }
  },
  {
    id: 414,
    title: 'Filtrado de Elementos Pares',
    statement: 'Corrige la condición de filtrado para conservar únicamente los números pares (x % 2 == 0).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba x % 2 == 0.',
    explanation: 'El filtrado selecciona un subconjunto de elementos que satisfacen un predicado booleano.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4, 5, 6};\n    std::vector<int> pares;\n    for (int x : nums) {\n        // BUG: Filtra impares\n        if (x % 2 != 0) {\n            pares.push_back(x);\n        }\n    }\n    std::cout << pares.size() << std::endl; // Debe ser 3 (2, 4, 6)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4, 5, 6};\n    std::vector<int> pares;\n    for (int x : nums) {\n        if (x % 2 == 0) {\n            pares.push_back(x);\n        }\n    }\n    std::cout << pares.size() << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [1, 2, 3, 4, 5, 6]\npares = [x for x in nums if x % 2 != 0] # BUG\nprint(len(pares))`,
        solutionCode: `nums = [1, 2, 3, 4, 5, 6]\npares = [x for x in nums if x % 2 == 0]\nprint(len(pares))`
      },
      javascript: {
        starterCode: `let nums = [1, 2, 3, 4, 5, 6];\nlet pares = nums.filter(x => x % 2 !== 0); // BUG\nconsole.log(pares.length);`,
        solutionCode: `let nums = [1, 2, 3, 4, 5, 6];\nlet pares = nums.filter(x => x % 2 === 0);\nconsole.log(pares.length);`
      },
      java: {
        starterCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4, 5, 6};\n        ArrayList<Integer> pares = new ArrayList<>();\n        for (int x : nums) {\n            if (x % 2 != 0) { pares.add(x); } // BUG\n        }\n        System.out.println(pares.size());\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4, 5, 6};\n        ArrayList<Integer> pares = new ArrayList<>();\n        for (int x : nums) {\n            if (x % 2 == 0) { pares.add(x); }\n        }\n        System.out.println(pares.size());\n    }\n}`
      }
    }
  },
  {
    id: 415,
    title: 'Cálculo del Promedio de un Arreglo',
    statement: 'Completa la división de la suma total entre la cantidad de elementos nums.size().',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Divide suma entre nums.size() (o len(nums)).',
    explanation: 'El promedio es el cociente de la suma de los valores entre el número total de elementos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<double> notas = {6.0, 5.0, 4.0};\n    double suma = 6.0 + 5.0 + 4.0;\n    double prom = suma / notas.___();\n    std::cout << prom << std::endl; // 5.0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<double> notas = {6.0, 5.0, 4.0};\n    double suma = 6.0 + 5.0 + 4.0;\n    double prom = suma / notas.size();\n    std::cout << prom << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['size', 'length']
      },
      python: {
        starterCode: `notas = [6.0, 5.0, 4.0]\nprom = sum(notas) / ___(notas)\nprint(prom)`,
        solutionCode: `notas = [6.0, 5.0, 4.0]\nprom = sum(notas) / len(notas)\nprint(prom)`,
        acceptedKeywords: ['len']
      },
      javascript: {
        starterCode: `let notas = [6.0, 5.0, 4.0];\nlet suma = 15.0;\nlet prom = suma / notas.___\nconsole.log(prom);`,
        solutionCode: `let notas = [6.0, 5.0, 4.0];\nlet suma = 15.0;\nlet prom = suma / notas.length;\nconsole.log(prom);`,
        acceptedKeywords: ['length']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        double[] notas = {6.0, 5.0, 4.0};\n        double suma = 15.0;\n        double prom = suma / notas.___\n        System.out.println(prom);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double[] notas = {6.0, 5.0, 4.0};\n        double suma = 15.0;\n        double prom = suma / notas.length;\n        System.out.println(prom);\n    }\n}`,
        acceptedKeywords: ['length']
      }
    }
  },
  {
    id: 416,
    title: 'Inversión de Arreglo en Nuevo Arreglo',
    statement: 'Corrige el índice de lectura inversa para llenar el nuevo arreglo desde nums[n - 1 - i].',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Lee el elemento en [n - 1 - i].',
    explanation: 'Para invertir, el primer elemento del nuevo arreglo corresponde al último del arreglo original.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int n = nums.size();\n    std::vector<int> invertido(n);\n    for (int i = 0; i < n; i++) {\n        // BUG: nums[i] copia el arreglo en orden normal\n        invertido[i] = nums[i];\n    }\n    std::cout << invertido[0] << std::endl; // Debe ser 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int n = nums.size();\n    std::vector<int> invertido(n);\n    for (int i = 0; i < n; i++) {\n        invertido[i] = nums[n - 1 - i];\n    }\n    std::cout << invertido[0] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [1, 2, 3, 4]\nn = len(nums)\ninvertido = [nums[i] for i in range(n)] # BUG\nprint(invertido[0])`,
        solutionCode: `nums = [1, 2, 3, 4]\nn = len(nums)\ninvertido = [nums[n - 1 - i] for i in range(n)]\nprint(invertido[0])`
      },
      javascript: {
        starterCode: `let nums = [1, 2, 3, 4];\nlet n = nums.length;\nlet invertido = [];\nfor (let i = 0; i < n; i++) {\n    invertido[i] = nums[i]; // BUG\n}\nconsole.log(invertido[0]);`,
        solutionCode: `let nums = [1, 2, 3, 4];\nlet n = nums.length;\nlet invertido = [];\nfor (let i = 0; i < n; i++) {\n    invertido[i] = nums[n - 1 - i];\n}\nconsole.log(invertido[0]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        int[] invertido = new int[n];\n        for (int i = 0; i < n; i++) {\n            invertido[i] = nums[i]; // BUG\n        }\n        System.out.println(invertido[0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        int[] invertido = new int[n];\n        for (int i = 0; i < n; i++) {\n            invertido[i] = nums[n - 1 - i];\n        }\n        System.out.println(invertido[0]);\n    }\n}`
      }
    }
  },
  {
    id: 417,
    title: 'Comprobación de Existencia (Booleano Contiene)',
    statement: 'Completa la asignación de encontrado = true cuando coincida el elemento x con el valor buscado.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Asigna encontrado = true.',
    explanation: 'Una bandera booleana cambia de estado cuando al menos un elemento cumple con el criterio de búsqueda.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 8, 12, 19};\n    int buscado = 12;\n    bool encontrado = false;\n    for (int x : nums) {\n        if (x == buscado) {\n            encontrado = ___;\n            break;\n        }\n    }\n    std::cout << std::boolalpha << encontrado << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {5, 8, 12, 19};\n    int buscado = 12;\n    bool encontrado = false;\n    for (int x : nums) {\n        if (x == buscado) {\n            encontrado = true;\n            break;\n        }\n    }\n    std::cout << std::boolalpha << encontrado << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['true', '1']
      },
      python: {
        starterCode: `nums = [5, 8, 12, 19]\nbuscado = 12\nencontrado = False\nfor x in nums:\n    if x == buscado:\n        encontrado = ___\n        break\nprint(encontrado)`,
        solutionCode: `nums = [5, 8, 12, 19]\nbuscado = 12\nencontrado = False\nfor x in nums:\n    if x == buscado:\n        encontrado = True\n        break\nprint(encontrado)`,
        acceptedKeywords: ['True']
      },
      javascript: {
        starterCode: `let nums = [5, 8, 12, 19];\nlet buscado = 12;\nlet encontrado = false;\nfor (let x of nums) {\n    if (x === buscado) {\n        encontrado = ___;\n        break;\n    }\n}\nconsole.log(encontrado);`,
        solutionCode: `let nums = [5, 8, 12, 19];\nlet buscado = 12;\nlet encontrado = false;\nfor (let x of nums) {\n    if (x === buscado) {\n        encontrado = true;\n        break;\n    }\n}\nconsole.log(encontrado);`,
        acceptedKeywords: ['true']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 8, 12, 19};\n        int buscado = 12;\n        boolean encontrado = false;\n        for (int x : nums) {\n            if (x == buscado) {\n                encontrado = ___;\n                break;\n            }\n        }\n        System.out.println(encontrado);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {5, 8, 12, 19};\n        int buscado = 12;\n        boolean encontrado = false;\n        for (int x : nums) {\n            if (x == buscado) {\n                encontrado = true;\n                break;\n            }\n        }\n        System.out.println(encontrado);\n    }\n}`,
        acceptedKeywords: ['true']
      }
    }
  },
  {
    id: 418,
    title: 'Verificación de Arreglo Ordenado Ascendente',
    statement: 'Corrige la condición de desorden: si nums[i] > nums[i + 1] el arreglo no está ordenado.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba nums[i] > nums[i + 1].',
    explanation: 'Un arreglo está ordenado ascendente si cada elemento es menor o igual al siguiente.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 3, 2, 5};\n    bool ordenado = true;\n    for (size_t i = 0; i < nums.size() - 1; i++) {\n        // BUG: Condición invertida\n        if (nums[i] < nums[i + 1]) {\n            ordenado = false;\n            break;\n        }\n    }\n    std::cout << (ordenado ? "Ordenado" : "Desordenado") << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 3, 2, 5};\n    bool ordenado = true;\n    for (size_t i = 0; i < nums.size() - 1; i++) {\n        if (nums[i] > nums[i + 1]) {\n            ordenado = false;\n            break;\n        }\n    }\n    std::cout << (ordenado ? "Ordenado" : "Desordenado") << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [1, 3, 2, 5]\nordenado = True\nfor i in range(len(nums) - 1):\n    if nums[i] < nums[i + 1]: # BUG\n        ordenado = False\n        break\nprint("Ordenado" if ordenado else "Desordenado")`,
        solutionCode: `nums = [1, 3, 2, 5]\nordenado = True\nfor i in range(len(nums) - 1):\n    if nums[i] > nums[i + 1]:\n        ordenado = False\n        break\nprint("Ordenado" if ordenado else "Desordenado")`
      },
      javascript: {
        starterCode: `let nums = [1, 3, 2, 5];\nlet ordenado = true;\nfor (let i = 0; i < nums.length - 1; i++) {\n    if (nums[i] < nums[i + 1]) { ordenado = false; break; } // BUG\n}\nconsole.log(ordenado ? "Ordenado" : "Desordenado");`,
        solutionCode: `let nums = [1, 3, 2, 5];\nlet ordenado = true;\nfor (let i = 0; i < nums.length - 1; i++) {\n    if (nums[i] > nums[i + 1]) { ordenado = false; break; }\n}\nconsole.log(ordenado ? "Ordenado" : "Desordenado");`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 3, 2, 5};\n        boolean ordenado = true;\n        for (int i = 0; i < nums.length - 1; i++) {\n            if (nums[i] < nums[i + 1]) { ordenado = false; break; } // BUG\n        }\n        System.out.println(ordenado ? "Ordenado" : "Desordenado");\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 3, 2, 5};\n        boolean ordenado = true;\n        for (int i = 0; i < nums.length - 1; i++) {\n            if (nums[i] > nums[i + 1]) { ordenado = false; break; }\n        }\n        System.out.println(ordenado ? "Ordenado" : "Desordenado");\n    }\n}`
      }
    }
  },
  {
    id: 419,
    title: 'Eliminación de Elementos Negativos',
    statement: 'Completa la condición para insertar solo elementos mayores o iguales a 0.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Comprueba x >= 0.',
    explanation: 'Al descartar números negativos conservamos únicamente los datos válidos para el procesamiento.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {-3, 5, -1, 8, 0};\n    std::vector<int> positivos;\n    for (int x : nums) {\n        if (x ___ 0) {\n            positivos.push_back(x);\n        }\n    }\n    std::cout << positivos.size() << std::endl; // 3 (5, 8, 0)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {-3, 5, -1, 8, 0};\n    std::vector<int> positivos;\n    for (int x : nums) {\n        if (x >= 0) {\n            positivos.push_back(x);\n        }\n    }\n    std::cout << positivos.size() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['>=']
      },
      python: {
        starterCode: `nums = [-3, 5, -1, 8, 0]\npositivos = [x for x in nums if x ___ 0]\nprint(len(positivos))`,
        solutionCode: `nums = [-3, 5, -1, 8, 0]\npositivos = [x for x in nums if x >= 0]\nprint(len(positivos))`,
        acceptedKeywords: ['>=']
      },
      javascript: {
        starterCode: `let nums = [-3, 5, -1, 8, 0];\nlet positivos = nums.filter(x => x ___ 0);\nconsole.log(positivos.length);`,
        solutionCode: `let nums = [-3, 5, -1, 8, 0];\nlet positivos = nums.filter(x => x >= 0);\nconsole.log(positivos.length);`,
        acceptedKeywords: ['>=']
      },
      java: {
        starterCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] nums = {-3, 5, -1, 8, 0};\n        ArrayList<Integer> pos = new ArrayList<>();\n        for (int x : nums) {\n            if (x ___ 0) { pos.add(x); }\n        }\n        System.out.println(pos.size());\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] nums = {-3, 5, -1, 8, 0};\n        ArrayList<Integer> pos = new ArrayList<>();\n        for (int x : nums) {\n            if (x >= 0) { pos.add(x); }\n        }\n        System.out.println(pos.size());\n    }\n}`,
        acceptedKeywords: ['>=']
      }
    }
  },
  {
    id: 420,
    title: 'Fusión de Dos Arreglos (Concat)',
    statement: 'Corrige la inserción para unir los elementos del segundo arreglo al final del primero.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Agrega cada elemento b de bArr a aArr.',
    explanation: 'La concatenación combina los elementos de dos secuencias consecutivas en una sola.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> a = {1, 2};\n    std::vector<int> b = {3, 4};\n    for (int x : b) {\n        a.push_back(x);\n    }\n    std::cout << a.size() << std::endl; // 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> a = {1, 2};\n    std::vector<int> b = {3, 4};\n    for (int x : b) {\n        a.push_back(x);\n    }\n    std::cout << a.size() << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `a = [1, 2]\nb = [3, 4]\nresultado = a + b\nprint(len(resultado))`,
        solutionCode: `a = [1, 2]\nb = [3, 4]\nresultado = a + b\nprint(len(resultado))`
      },
      javascript: {
        starterCode: `let a = [1, 2];\nlet b = [3, 4];\nlet resultado = [...a, ...b];\nconsole.log(resultado.length);`,
        solutionCode: `let a = [1, 2];\nlet b = [3, 4];\nlet resultado = [...a, ...b];\nconsole.log(resultado.length);`
      },
      java: {
        starterCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> a = new ArrayList<>();\n        a.add(1); a.add(2);\n        ArrayList<Integer> b = new ArrayList<>();\n        b.add(3); b.add(4);\n        a.addAll(b);\n        System.out.println(a.size());\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> a = new ArrayList<>();\n        a.add(1); a.add(2);\n        ArrayList<Integer> b = new ArrayList<>();\n        b.add(3); b.add(4);\n        a.addAll(b);\n        System.out.println(a.size());\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 421 al 430 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 421,
    title: 'Suma de Prefijos (Prefix Sum)',
    statement: 'Completa la acumulación del arreglo de sumas de prefijos: pref[i] = pref[i - 1] + nums[___].',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Suma el elemento nums[i].',
    explanation: 'El arreglo de sumas acumuladas permite responder consultas de suma en cualquier rango en O(1).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {3, 1, 2, 4};\n    int n = nums.size();\n    std::vector<int> pref(n);\n    pref[0] = nums[0];\n    for (int i = 1; i < n; i++) {\n        pref[i] = pref[i - 1] + nums[___];\n    }\n    std::cout << pref[3] << std::endl; // 10\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {3, 1, 2, 4};\n    int n = nums.size();\n    std::vector<int> pref(n);\n    pref[0] = nums[0];\n    for (int i = 1; i < n; i++) {\n        pref[i] = pref[i - 1] + nums[i];\n    }\n    std::cout << pref[3] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['i']
      },
      python: {
        starterCode: `nums = [3, 1, 2, 4]\npref = [nums[0]]\nfor i in range(1, len(nums)):\n    pref.append(pref[i - 1] + nums[___])\nprint(pref[3])`,
        solutionCode: `nums = [3, 1, 2, 4]\npref = [nums[0]]\nfor i in range(1, len(nums)):\n    pref.append(pref[i - 1] + nums[i])\nprint(pref[3])`,
        acceptedKeywords: ['i']
      },
      javascript: {
        starterCode: `let nums = [3, 1, 2, 4];\nlet pref = [nums[0]];\nfor (let i = 1; i < nums.length; i++) {\n    pref[i] = pref[i - 1] + nums[___];\n}\nconsole.log(pref[3]);`,
        solutionCode: `let nums = [3, 1, 2, 4];\nlet pref = [nums[0]];\nfor (let i = 1; i < nums.length; i++) {\n    pref[i] = pref[i - 1] + nums[i];\n}\nconsole.log(pref[3]);`,
        acceptedKeywords: ['i']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 2, 4};\n        int[] pref = new int[nums.length];\n        pref[0] = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            pref[i] = pref[i - 1] + nums[___];\n        }\n        System.out.println(pref[3]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {3, 1, 2, 4};\n        int[] pref = new int[nums.length];\n        pref[0] = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            pref[i] = pref[i - 1] + nums[i];\n        }\n        System.out.println(pref[3]);\n    }\n}`,
        acceptedKeywords: ['i']
      }
    }
  },
  {
    id: 422,
    title: 'Rotación a la Derecha por 1 Posición',
    statement: 'Corrige el desplazamiento hacia la derecha para que nums[i] tome el valor de nums[i - 1].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Recorre desde el final hacia adelante: nums[i] = nums[i - 1].',
    explanation: 'Para rotar a la derecha, se guarda el último elemento y se desplazan los demás en sentido inverso.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int n = nums.size();\n    int ultimo = nums[n - 1];\n    // BUG: Desplazar hacia adelante sobreescribe datos\n    for (int i = n - 1; i > 0; i--) {\n        nums[i] = nums[i - 1];\n    }\n    nums[0] = ultimo;\n    std::cout << nums[0] << " " << nums[1] << std::endl; // 4 1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int n = nums.size();\n    int ultimo = nums[n - 1];\n    for (int i = n - 1; i > 0; i--) {\n        nums[i] = nums[i - 1];\n    }\n    nums[0] = ultimo;\n    std::cout << nums[0] << " " << nums[1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [1, 2, 3, 4]\nultimo = nums[-1]\nfor i in range(len(nums) - 1, 0, -1):\n    nums[i] = nums[i - 1]\nnums[0] = ultimo\nprint(nums[0], nums[1])`,
        solutionCode: `nums = [1, 2, 3, 4]\nultimo = nums[-1]\nfor i in range(len(nums) - 1, 0, -1):\n    nums[i] = nums[i - 1]\nnums[0] = ultimo\nprint(nums[0], nums[1])`
      },
      javascript: {
        starterCode: `let nums = [1, 2, 3, 4];\nlet n = nums.length;\nlet ultimo = nums[n - 1];\nfor (let i = n - 1; i > 0; i--) {\n    nums[i] = nums[i - 1];\n}\nnums[0] = ultimo;\nconsole.log(nums[0], nums[1]);`,
        solutionCode: `let nums = [1, 2, 3, 4];\nlet n = nums.length;\nlet ultimo = nums[n - 1];\nfor (let i = n - 1; i > 0; i--) {\n    nums[i] = nums[i - 1];\n}\nnums[0] = ultimo;\nconsole.log(nums[0], nums[1]);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        int ultimo = nums[n - 1];\n        for (int i = n - 1; i > 0; i--) {\n            nums[i] = nums[i - 1];\n        }\n        nums[0] = ultimo;\n        System.out.println(nums[0] + " " + nums[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        int ultimo = nums[n - 1];\n        for (int i = n - 1; i > 0; i--) {\n            nums[i] = nums[i - 1];\n        }\n        nums[0] = ultimo;\n        System.out.println(nums[0] + " " + nums[1]);\n    }\n}`
      }
    }
  },
  {
    id: 423,
    title: 'Eliminación de Duplicados en Arreglo Ordenado (In-Place)',
    statement: 'Completa la condición: si nums[i] != nums[k] encontramos un nuevo elemento único.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Comprueba nums[i] != nums[k].',
    explanation: 'En un arreglo ordenado, los elementos únicos contiguos se compactan al frente con un puntero de escritura.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 1, 2, 2, 3};\n    int k = 0;\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] != nums[___]) {\n            k++;\n            nums[k] = nums[i];\n        }\n    }\n    std::cout << k + 1 << std::endl; // 3 elementos únicos (1, 2, 3)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 1, 2, 2, 3};\n    int k = 0;\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] != nums[k]) {\n            k++;\n            nums[k] = nums[i];\n        }\n    }\n    std::cout << k + 1 << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['k']
      },
      python: {
        starterCode: `nums = [1, 1, 2, 2, 3]\nk = 0\nfor i in range(1, len(nums)):\n    if nums[i] != nums[___]:\n        k += 1\n        nums[k] = nums[i]\nprint(k + 1)`,
        solutionCode: `nums = [1, 1, 2, 2, 3]\nk = 0\nfor i in range(1, len(nums)):\n    if nums[i] != nums[k]:\n        k += 1\n        nums[k] = nums[i]\nprint(k + 1)`,
        acceptedKeywords: ['k']
      },
      javascript: {
        starterCode: `let nums = [1, 1, 2, 2, 3];\nlet k = 0;\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] !== nums[___]) {\n        k++;\n        nums[k] = nums[i];\n    }\n}\nconsole.log(k + 1);`,
        solutionCode: `let nums = [1, 1, 2, 2, 3];\nlet k = 0;\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] !== nums[k]) {\n        k++;\n        nums[k] = nums[i];\n    }\n}\nconsole.log(k + 1);`,
        acceptedKeywords: ['k']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 1, 2, 2, 3};\n        int k = 0;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] != nums[___]) {\n                k++;\n                nums[k] = nums[i];\n            }\n        }\n        System.out.println(k + 1);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 1, 2, 2, 3};\n        int k = 0;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] != nums[k]) {\n                k++;\n                nums[k] = nums[i];\n            }\n        }\n        System.out.println(k + 1);\n    }\n}`,
        acceptedKeywords: ['k']
      }
    }
  },
  {
    id: 424,
    title: 'Algoritmo de Kadane (Máxima Suma de Subarreglo Contiguo)',
    statement: 'Corrige la actualización de sumaActual: toma el mayor entre nums[i] y (sumaActual + nums[i]).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa sumaActual = std::max(nums[i], sumaActual + nums[i]).',
    explanation: 'El algoritmo de Kadane encuentra el subarreglo de suma máxima en tiempo lineal O(n).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    int sumaActual = nums[0], maxSuma = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        // BUG: Suma sin reiniciar si el acumulado es negativo\n        sumaActual = std::max(nums[i], sumaActual + nums[i]);\n        maxSuma = std::max(maxSuma, sumaActual);\n    }\n    std::cout << maxSuma << std::endl; // 6 ([4, -1, 2, 1])\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    int sumaActual = nums[0], maxSuma = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        sumaActual = std::max(nums[i], sumaActual + nums[i]);\n        maxSuma = std::max(maxSuma, sumaActual);\n    }\n    std::cout << maxSuma << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nactual = max_s = nums[0]\nfor x in nums[1:]:\n    actual = max(x, actual + x)\n    max_s = max(max_s, actual)\nprint(max_s)`,
        solutionCode: `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nactual = max_s = nums[0]\nfor x in nums[1:]:\n    actual = max(x, actual + x)\n    max_s = max(max_s, actual)\nprint(max_s)`
      },
      javascript: {
        starterCode: `let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];\nlet actual = nums[0], maxS = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n    actual = Math.max(nums[i], actual + nums[i]);\n    maxS = Math.max(maxS, actual);\n}\nconsole.log(maxS);`,
        solutionCode: `let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];\nlet actual = nums[0], maxS = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n    actual = Math.max(nums[i], actual + nums[i]);\n    maxS = Math.max(maxS, actual);\n}\nconsole.log(maxS);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        int actual = nums[0], maxS = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            actual = Math.max(nums[i], actual + nums[i]);\n            maxS = Math.max(maxS, actual);\n        }\n        System.out.println(maxS);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        int actual = nums[0], maxS = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            actual = Math.max(nums[i], actual + nums[i]);\n            maxS = Math.max(maxS, actual);\n        }\n        System.out.println(maxS);\n    }\n}`
      }
    }
  },
  {
    id: 425,
    title: 'Búsqueda del Segundo Elemento Mayor',
    statement: 'Completa la actualización del segundo mayor: segundo = ___ cuando un nuevo máximo sea hallado.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Al hallar un nuevo máximo, el antiguo maximo pasa a ser el segundo: segundo = maximo.',
    explanation: 'Para hallar el segundo mayor en una sola pasada, guardamos el máximo anterior antes de actualizarlo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 50, 20, 40};\n    int maximo = nums[0], segundo = -1;\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] > maximo) {\n            segundo = ___;\n            maximo = nums[i];\n        } else if (nums[i] > segundo && nums[i] != maximo) {\n            segundo = nums[i];\n        }\n    }\n    std::cout << segundo << std::endl; // 40\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 50, 20, 40};\n    int maximo = nums[0], segundo = -1;\n    for (size_t i = 1; i < nums.size(); i++) {\n        if (nums[i] > maximo) {\n            segundo = maximo;\n            maximo = nums[i];\n        } else if (nums[i] > segundo && nums[i] != maximo) {\n            segundo = nums[i];\n        }\n    }\n    std::cout << segundo << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['maximo']
      },
      python: {
        starterCode: `nums = [10, 50, 20, 40]\nmaximo, segundo = nums[0], -1\nfor x in nums[1:]:\n    if x > maximo:\n        segundo = ___\n        maximo = x\n    elif x > segundo and x != maximo:\n        segundo = x\nprint(segundo)`,
        solutionCode: `nums = [10, 50, 20, 40]\nmaximo, segundo = nums[0], -1\nfor x in nums[1:]:\n    if x > maximo:\n        segundo = maximo\n        maximo = x\n    elif x > segundo and x != maximo:\n        segundo = x\nprint(segundo)`,
        acceptedKeywords: ['maximo']
      },
      javascript: {
        starterCode: `let nums = [10, 50, 20, 40];\nlet maximo = nums[0], segundo = -1;\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] > maximo) {\n        segundo = ___;\n        maximo = nums[i];\n    } else if (nums[i] > segundo && nums[i] !== maximo) {\n        segundo = nums[i];\n    }\n}\nconsole.log(segundo);`,
        solutionCode: `let nums = [10, 50, 20, 40];\nlet maximo = nums[0], segundo = -1;\nfor (let i = 1; i < nums.length; i++) {\n    if (nums[i] > maximo) {\n        segundo = maximo;\n        maximo = nums[i];\n    } else if (nums[i] > segundo && nums[i] !== maximo) {\n        segundo = nums[i];\n    }\n}\nconsole.log(segundo);`,
        acceptedKeywords: ['maximo']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 50, 20, 40};\n        int maximo = nums[0], segundo = -1;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] > maximo) {\n                segundo = ___;\n                maximo = nums[i];\n            } else if (nums[i] > segundo && nums[i] != maximo) {\n                segundo = nums[i];\n            }\n        }\n        System.out.println(segundo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 50, 20, 40};\n        int maximo = nums[0], segundo = -1;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] > maximo) {\n                segundo = maximo;\n                maximo = nums[i];\n            } else if (nums[i] > segundo && nums[i] != maximo) {\n                segundo = nums[i];\n            }\n        }\n        System.out.println(segundo);\n    }\n}`,
        acceptedKeywords: ['maximo']
      }
    }
  },
  {
    id: 426,
    title: 'Algoritmo de Moore (Elemento Mayoritario)',
    statement: 'Corrige la actualización de votos: suma 1 si x == candidato, o resta 1 si son distintos.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'votos += (x == candidato) ? 1 : -1.',
    explanation: 'El algoritmo de votación de Boyer-Moore encuentra el elemento mayoritario (> N/2) en O(n) y O(1) memoria.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {2, 2, 1, 1, 2, 2};\n    int candidato = nums[0], votos = 0;\n    for (int x : nums) {\n        if (votos == 0) candidato = x;\n        // BUG: Suma siempre sin restar votos al disentir\n        votos += 1;\n    }\n    std::cout << candidato << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {2, 2, 1, 1, 2, 2};\n    int candidato = nums[0], votos = 0;\n    for (int x : nums) {\n        if (votos == 0) candidato = x;\n        votos += (x == candidato) ? 1 : -1;\n    }\n    std::cout << candidato << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [2, 2, 1, 1, 2, 2]\ncandidato, votos = nums[0], 0\nfor x in nums:\n    if votos == 0: candidato = x\n    votos += 1 if x == candidato else -1\nprint(candidato)`,
        solutionCode: `nums = [2, 2, 1, 1, 2, 2]\ncandidato, votos = nums[0], 0\nfor x in nums:\n    if votos == 0: candidato = x\n    votos += 1 if x == candidato else -1\nprint(candidato)`
      },
      javascript: {
        starterCode: `let nums = [2, 2, 1, 1, 2, 2];\nlet candidato = nums[0], votos = 0;\nfor (let x of nums) {\n    if (votos === 0) candidato = x;\n    votos += (x === candidato) ? 1 : -1;\n}\nconsole.log(candidato);`,
        solutionCode: `let nums = [2, 2, 1, 1, 2, 2];\nlet candidato = nums[0], votos = 0;\nfor (let x of nums) {\n    if (votos === 0) candidato = x;\n    votos += (x === candidato) ? 1 : -1;\n}\nconsole.log(candidato);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {2, 2, 1, 1, 2, 2};\n        int candidato = nums[0], votos = 0;\n        for (int x : nums) {\n            if (votos == 0) candidato = x;\n            votos += (x == candidato) ? 1 : -1;\n        }\n        System.out.println(candidato);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {2, 2, 1, 1, 2, 2};\n        int candidato = nums[0], votos = 0;\n        for (int x : nums) {\n            if (votos == 0) candidato = x;\n            votos += (x == candidato) ? 1 : -1;\n        }\n        System.out.println(candidato);\n    }\n}`
      }
    }
  },
  {
    id: 427,
    title: 'Producto de Todos Excepto Él Mismo',
    statement: 'Completa el paso de sufijos multiplicando por el elemento sufijo acumulado.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Multiplica res[i] *= sufijo.',
    explanation: 'Calcular el producto excluyente sin división combina productos prefijos y sufijos en O(n).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int n = nums.size();\n    std::vector<int> res(n, 1);\n    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n    int suf = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= ___;\n        suf *= nums[i];\n    }\n    std::cout << res[0] << std::endl; // 24 (2*3*4)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int n = nums.size();\n    std::vector<int> res(n, 1);\n    for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n    int suf = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suf;\n        suf *= nums[i];\n    }\n    std::cout << res[0] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['suf']
      },
      python: {
        starterCode: `nums = [1, 2, 3, 4]\nn = len(nums)\nres = [1] * n\nfor i in range(1, n): res[i] = res[i - 1] * nums[i - 1]\nsuf = 1\nfor i in range(n - 1, -1, -1):\n    res[i] *= ___\n    suf *= nums[i]\nprint(res[0])`,
        solutionCode: `nums = [1, 2, 3, 4]\nn = len(nums)\nres = [1] * n\nfor i in range(1, n): res[i] = res[i - 1] * nums[i - 1]\nsuf = 1\nfor i in range(n - 1, -1, -1):\n    res[i] *= suf\n    suf *= nums[i]\nprint(res[0])`,
        acceptedKeywords: ['suf']
      },
      javascript: {
        starterCode: `let nums = [1, 2, 3, 4];\nlet n = nums.length;\nlet res = new Array(n).fill(1);\nfor (let i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\nlet suf = 1;\nfor (let i = n - 1; i >= 0; i--) {\n    res[i] *= ___;\n    suf *= nums[i];\n}\nconsole.log(res[0]);`,
        solutionCode: `let nums = [1, 2, 3, 4];\nlet n = nums.length;\nlet res = new Array(n).fill(1);\nfor (let i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\nlet suf = 1;\nfor (let i = n - 1; i >= 0; i--) {\n    res[i] *= suf;\n    suf *= nums[i];\n}\nconsole.log(res[0]);`,
        acceptedKeywords: ['suf']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n        int suf = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= ___;\n            suf *= nums[i];\n        }\n        System.out.println(res[0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int n = nums.length;\n        int[] res = new int[n];\n        res[0] = 1;\n        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];\n        int suf = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= suf;\n            suf *= nums[i];\n        }\n        System.out.println(res[0]);\n    }\n}`,
        acceptedKeywords: ['suf']
      }
    }
  },
  {
    id: 428,
    title: 'Fusión de Dos Arreglos Ordenados (Merge)',
    statement: 'Corrige la comparación para tomar el elemento menor entre A[i] y B[j].',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Compara if (A[i] <= B[j]).',
    explanation: 'El algoritmo merge combina dos secuencias ordenadas en una sola lista ordenada en O(n + m).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> A = {1, 4, 7}, B = {2, 5, 8};\n    std::vector<int> C;\n    size_t i = 0, j = 0;\n    while (i < A.size() && j < B.size()) {\n        // BUG: Condición invertida toma el mayor primero\n        if (A[i] > B[j]) C.push_back(A[i++]);\n        else C.push_back(B[j++]);\n    }\n    while (i < A.size()) C.push_back(A[i++]);\n    while (j < B.size()) C.push_back(B[j++]);\n    std::cout << C[0] << " " << C[1] << std::endl; // Debe ser 1 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> A = {1, 4, 7}, B = {2, 5, 8};\n    std::vector<int> C;\n    size_t i = 0, j = 0;\n    while (i < A.size() && j < B.size()) {\n        if (A[i] <= B[j]) C.push_back(A[i++]);\n        else C.push_back(B[j++]);\n    }\n    while (i < A.size()) C.push_back(A[i++]);\n    while (j < B.size()) C.push_back(B[j++]);\n    std::cout << C[0] << " " << C[1] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `A, B = [1, 4, 7], [2, 5, 8]\nC = []\ni, j = 0, 0\nwhile i < len(A) and j < len(B):\n    if A[i] > B[j]: # BUG\n        C.append(A[i]); i += 1\n    else:\n        C.append(B[j]); j += 1\nC.extend(A[i:]); C.extend(B[j:])\nprint(C[0], C[1])`,
        solutionCode: `A, B = [1, 4, 7], [2, 5, 8]\nC = []\ni, j = 0, 0\nwhile i < len(A) and j < len(B):\n    if A[i] <= B[j]:\n        C.append(A[i]); i += 1\n    else:\n        C.append(B[j]); j += 1\nC.extend(A[i:]); C.extend(B[j:])\nprint(C[0], C[1])`
      },
      javascript: {
        starterCode: `let A = [1, 4, 7], B = [2, 5, 8];\nlet C = [], i = 0, j = 0;\nwhile (i < A.length && j < B.length) {\n    if (A[i] > B[j]) { C.push(A[i++]); } // BUG\n    else { C.push(B[j++]); }\n}\nwhile (i < A.length) C.push(A[i++]);\nwhile (j < B.length) C.push(B[j++]);\nconsole.log(C[0], C[1]);`,
        solutionCode: `let A = [1, 4, 7], B = [2, 5, 8];\nlet C = [], i = 0, j = 0;\nwhile (i < A.length && j < B.length) {\n    if (A[i] <= B[j]) { C.push(A[i++]); }\n    else { C.push(B[j++]); }\n}\nwhile (i < A.length) C.push(A[i++]);\nwhile (j < B.length) C.push(B[j++]);\nconsole.log(C[0], C[1]);`
      },
      java: {
        starterCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] A = {1, 4, 7}, B = {2, 5, 8};\n        ArrayList<Integer> C = new ArrayList<>();\n        int i = 0, j = 0;\n        while (i < A.length && j < B.length) {\n            if (A[i] > B[j]) { C.add(A[i++]); } // BUG\n            else { C.add(B[j++]); }\n        }\n        while (i < A.length) C.add(A[i++]);\n        while (j < B.length) C.add(B[j++]);\n        System.out.println(C.get(0) + " " + C.get(1));\n    }\n}`,
        solutionCode: `import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        int[] A = {1, 4, 7}, B = {2, 5, 8};\n        ArrayList<Integer> C = new ArrayList<>();\n        int i = 0, j = 0;\n        while (i < A.length && j < B.length) {\n            if (A[i] <= B[j]) { C.add(A[i++]); }\n            else { C.add(B[j++]); }\n        }\n        while (i < A.length) C.add(A[i++]);\n        while (j < B.length) C.add(B[j++]);\n        System.out.println(C.get(0) + " " + C.get(1));\n    }\n}`
      }
    }
  },
  {
    id: 429,
    title: 'Intercambio In-Place con Dos Punteros (Reverse)',
    statement: 'Completa el decremento del puntero derecho der tras intercambiar los extremos.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Decrementa der con der--.',
    explanation: 'Invertir in-place utiliza memoria auxiliar O(1) intercambiando los extremos simétricos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int izq = 0, der = nums.size() - 1;\n    while (izq < der) {\n        std::swap(nums[izq], nums[der]);\n        izq++;\n        ___;\n    }\n    std::cout << nums[0] << std::endl; // 4\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {1, 2, 3, 4};\n    int izq = 0, der = nums.size() - 1;\n    while (izq < der) {\n        std::swap(nums[izq], nums[der]);\n        izq++;\n        der--;\n    }\n    std::cout << nums[0] << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['der--', '--der', 'der -= 1']
      },
      python: {
        starterCode: `nums = [1, 2, 3, 4]\nizq, der = 0, len(nums) - 1\nwhile izq < der:\n    nums[izq], nums[der] = nums[der], nums[izq]\n    izq += 1\n    ___\nprint(nums[0])`,
        solutionCode: `nums = [1, 2, 3, 4]\nizq, der = 0, len(nums) - 1\nwhile izq < der:\n    nums[izq], nums[der] = nums[der], nums[izq]\n    izq += 1\n    der -= 1\nprint(nums[0])`,
        acceptedKeywords: ['der -= 1', 'der = der - 1']
      },
      javascript: {
        starterCode: `let nums = [1, 2, 3, 4];\nlet izq = 0, der = nums.length - 1;\nwhile (izq < der) {\n    let temp = nums[izq];\n    nums[izq] = nums[der];\n    nums[der] = temp;\n    izq++;\n    ___;\n}\nconsole.log(nums[0]);`,
        solutionCode: `let nums = [1, 2, 3, 4];\nlet izq = 0, der = nums.length - 1;\nwhile (izq < der) {\n    let temp = nums[izq];\n    nums[izq] = nums[der];\n    nums[der] = temp;\n    izq++;\n    der--;\n}\nconsole.log(nums[0]);`,
        acceptedKeywords: ['der--', '--der', 'der -= 1']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int izq = 0, der = nums.length - 1;\n        while (izq < der) {\n            int temp = nums[izq];\n            nums[izq] = nums[der];\n            nums[der] = temp;\n            izq++;\n            ___;\n        }\n        System.out.println(nums[0]);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4};\n        int izq = 0, der = nums.length - 1;\n        while (izq < der) {\n            int temp = nums[izq];\n            nums[izq] = nums[der];\n            nums[der] = temp;\n            izq++;\n            der--;\n        }\n        System.out.println(nums[0]);\n    }\n}`,
        acceptedKeywords: ['der--', '--der', 'der -= 1']
      }
    }
  },
  {
    id: 430,
    title: 'Conteo de Frecuencias con Hash / Arreglo',
    statement: 'Corrige la acumulación de frecuencia para sumar 1 a frec[x] cada vez que aparezca.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Incrementa frec[x]++ (o frec[x] = frec.getOrDefault(...) + 1).',
    explanation: 'El conteo de frecuencias permite saber cuántas veces se repite cada valor en una colección en O(n).',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <map>\n\nint main() {\n    std::vector<int> nums = {4, 2, 4, 3, 4};\n    std::map<int, int> frec;\n    for (int x : nums) {\n        // BUG: Asigna 1 en vez de incrementar\n        frec[x] = 1;\n    }\n    std::cout << frec[4] << std::endl; // Debe ser 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <map>\n\nint main() {\n    std::vector<int> nums = {4, 2, 4, 3, 4};\n    std::map<int, int> frec;\n    for (int x : nums) {\n        frec[x]++;\n    }\n    std::cout << frec[4] << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `nums = [4, 2, 4, 3, 4]\nfrec = {}\nfor x in nums:\n    frec[x] = 1 # BUG\nprint(frec[4])`,
        solutionCode: `nums = [4, 2, 4, 3, 4]\nfrec = {}\nfor x in nums:\n    frec[x] = frec.get(x, 0) + 1\nprint(frec[4])`
      },
      javascript: {
        starterCode: `let nums = [4, 2, 4, 3, 4];\nlet frec = {};\nfor (let x of nums) {\n    frec[x] = 1; // BUG\n}\nconsole.log(frec[4]);`,
        solutionCode: `let nums = [4, 2, 4, 3, 4];\nlet frec = {};\nfor (let x of nums) {\n    frec[x] = (frec[x] || 0) + 1;\n}\nconsole.log(frec[4]);`
      },
      java: {
        starterCode: `import java.util.HashMap;\npublic class Main {\n    public static void main(String[] args) {\n        int[] nums = {4, 2, 4, 3, 4};\n        HashMap<Integer, Integer> frec = new HashMap<>();\n        for (int x : nums) {\n            frec.put(x, 1); // BUG\n        }\n        System.out.println(frec.get(4));\n    }\n}`,
        solutionCode: `import java.util.HashMap;\npublic class Main {\n    public static void main(String[] args) {\n        int[] nums = {4, 2, 4, 3, 4};\n        HashMap<Integer, Integer> frec = new HashMap<>();\n        for (int x : nums) {\n            frec.put(x, frec.getOrDefault(x, 0) + 1);\n        }\n        System.out.println(frec.get(4));\n    }\n}`
      }
    }
  }
];
