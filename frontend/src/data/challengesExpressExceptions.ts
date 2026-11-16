import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressExceptionsExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 601 al 610 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 601,
    title: 'Estructura Try-Catch Básica',
    statement: 'Completa la palabra clave try para envolver el bloque de código potencialmente peligroso.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La palabra clave de inicio de captura es try.',
    explanation: 'El bloque try contiene el código susceptible de producir una excepción durante su ejecución.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    ___ {\n        throw 404;\n    } catch (int e) {\n        std::cout << "Error " << e << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    try {\n        throw 404;\n    } catch (int e) {\n        std::cout << "Error " << e << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['try']
      },
      python: {
        starterCode: `___:\n    raise ValueError("Error")\nexcept ValueError as e:\n    print("Capturado")`,
        solutionCode: `try:\n    raise ValueError("Error")\nexcept ValueError as e:\n    print("Capturado")`,
        acceptedKeywords: ['try']
      },
      javascript: {
        starterCode: `___ {\n    throw new Error("404");\n} catch (e) {\n    console.log("Error " + e.message);\n}`,
        solutionCode: `try {\n    throw new Error("404");\n} catch (e) {\n    console.log("Error " + e.message);\n}`,
        acceptedKeywords: ['try']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        ___ {\n            throw new Exception("404");\n        } catch (Exception e) {\n            System.out.println("Error");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            throw new Exception("404");\n        } catch (Exception e) {\n            System.out.println("Error");\n        }\n    }\n}`,
        acceptedKeywords: ['try']
      }
    }
  },
  {
    id: 602,
    title: 'Captura con Catch / Except',
    statement: 'Corrige la palabra clave de captura de errores para manejar la excepción lanzada.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa catch (o except en Python).',
    explanation: 'El bloque catch/except captura y gestiona la excepción permitiendo que el programa continúe funcionando.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    try {\n        throw 1;\n    } catch (int e) {\n        std::cout << "Manejado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    try {\n        throw 1;\n    } catch (int e) {\n        std::cout << "Manejado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Manejado")`,
        solutionCode: `try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Manejado")`
      },
      javascript: {
        starterCode: `try {\n    throw new Error("test");\n} catch (e) {\n    console.log("Manejado");\n}`,
        solutionCode: `try {\n    throw new Error("test");\n} catch (e) {\n    console.log("Manejado");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Manejado");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Manejado");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 603,
    title: 'Lanzar Excepción (Throw / Raise)',
    statement: 'Completa la instrucción para lanzar una nueva excepción si el divisor es 0.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa throw en C++/JS/Java o raise en Python.',
    explanation: 'La instrucción throw/raise interrumpe el flujo normal para señalar una condición anómala.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nint dividir(int a, int b) {\n    if (b == 0) {\n        ___ std::runtime_error("División por cero");\n    }\n    return a / b;\n}\n\nint main() {\n    try { dividir(10, 0); } catch (...) { std::cout << "Error" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nint dividir(int a, int b) {\n    if (b == 0) {\n        throw std::runtime_error("División por cero");\n    }\n    return a / b;\n}\n\nint main() {\n    try { dividir(10, 0); } catch (...) { std::cout << "Error" << std::endl; }\n    return 0;\n}`,
        acceptedKeywords: ['throw']
      },
      python: {
        starterCode: `def dividir(a, b):\n    if b == 0:\n        ___ ValueError("División por cero")\n    return a / b\n\ntry:\n    dividir(10, 0)\nexcept ValueError:\n    print("Error")`,
        solutionCode: `def dividir(a, b):\n    if b == 0:\n        raise ValueError("División por cero")\n    return a / b\n\ntry:\n    dividir(10, 0)\nexcept ValueError:\n    print("Error")`,
        acceptedKeywords: ['raise']
      },
      javascript: {
        starterCode: `function dividir(a, b) {\n    if (b === 0) {\n        ___ new Error("División por cero");\n    }\n    return a / b;\n}\ntry { dividir(10, 0); } catch (e) { console.log("Error"); }`,
        solutionCode: `function dividir(a, b) {\n    if (b === 0) {\n        throw new Error("División por cero");\n    }\n    return a / b;\n}\ntry { dividir(10, 0); } catch (e) { console.log("Error"); }`,
        acceptedKeywords: ['throw']
      },
      java: {
        starterCode: `public class Main {\n    static int dividir(int a, int b) {\n        if (b == 0) {\n            ___ new ArithmeticException("División por cero");\n        }\n        return a / b;\n    }\n    public static void main(String[] args) {\n        try { dividir(10, 0); } catch (Exception e) { System.out.println("Error"); }\n    }\n}`,
        solutionCode: `public class Main {\n    static int dividir(int a, int b) {\n        if (b == 0) {\n            throw new ArithmeticException("División por cero");\n        }\n        return a / b;\n    }\n    public static void main(String[] args) {\n        try { dividir(10, 0); } catch (Exception e) { System.out.println("Error"); }\n    }\n}`,
        acceptedKeywords: ['throw']
      }
    }
  },
  {
    id: 604,
    title: 'Bloque Finally (Garantía de Ejecución)',
    statement: 'Corrige la palabra clave finally para asegurar que el mensaje de cierre se imprima siempre.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'El bloque final se define con finally.',
    explanation: 'El bloque finally se ejecuta invariablemente, tanto si ocurrió una excepción como si todo finalizó con éxito.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nstruct Limpiador {\n    ~Limpiador() { std::cout << "Siempre ejecutado" << std::endl; }\n};\n\nint main() {\n    try {\n        Limpiador l;\n        throw 1;\n    } catch (...) {\n        std::cout << "Atrapado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nstruct Limpiador {\n    ~Limpiador() { std::cout << "Siempre ejecutado" << std::endl; }\n};\n\nint main() {\n    try {\n        Limpiador l;\n        throw 1;\n    } catch (...) {\n        std::cout << "Atrapado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `try:\n    x = 1\nfinally:\n    print("Siempre ejecutado")`,
        solutionCode: `try:\n    x = 1\nfinally:\n    print("Siempre ejecutado")`
      },
      javascript: {
        starterCode: `try {\n    let x = 1;\n} finally {\n    console.log("Siempre ejecutado");\n}`,
        solutionCode: `try {\n    let x = 1;\n} finally {\n    console.log("Siempre ejecutado");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 1;\n        } finally {\n            System.out.println("Siempre ejecutado");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 1;\n        } finally {\n            System.out.println("Siempre ejecutado");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 605,
    title: 'Lectura del Mensaje de Error (what / getMessage)',
    statement: 'Completa la llamada para obtener el mensaje de la excepción (e.___()).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa what en C++, getMessage en Java, message en JS o str(e) en Python.',
    explanation: 'Los objetos de excepción proveen métodos para inspeccionar el texto descriptivo del fallo.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nint main() {\n    try {\n        throw std::runtime_error("Fallo critico");\n    } catch (const std::exception &e) {\n        std::cout << e.___() << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nint main() {\n    try {\n        throw std::runtime_error("Fallo critico");\n    } catch (const std::exception &e) {\n        std::cout << e.what() << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['what']
      },
      python: {
        starterCode: `try:\n    raise ValueError("Fallo critico")\nexcept ValueError as e:\n    print(___(e))`,
        solutionCode: `try:\n    raise ValueError("Fallo critico")\nexcept ValueError as e:\n    print(str(e))`,
        acceptedKeywords: ['str']
      },
      javascript: {
        starterCode: `try {\n    throw new Error("Fallo critico");\n} catch (e) {\n    console.log(e.___);\n}`,
        solutionCode: `try {\n    throw new Error("Fallo critico");\n} catch (e) {\n    console.log(e.message);\n}`,
        acceptedKeywords: ['message']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            throw new Exception("Fallo critico");\n        } catch (Exception e) {\n            System.out.println(e.___());\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            throw new Exception("Fallo critico");\n        } catch (Exception e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}`,
        acceptedKeywords: ['getMessage']
      }
    }
  },
  {
    id: 606,
    title: 'Captura de Conversión Numérica Inválida',
    statement: 'Corrige la captura del error cuando la cadena no puede convertirse a entero.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Captura la excepción y asigna un valor por defecto.',
    explanation: 'Convertir strings no numéricos dispara excepciones que deben capturarse para evitar que el programa aborte.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = "abc";\n    int val = 0;\n    try {\n        val = std::stoi(s);\n    } catch (const std::invalid_argument &e) {\n        val = -1;\n    }\n    std::cout << val << std::endl; // -1\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = "abc";\n    int val = 0;\n    try {\n        val = std::stoi(s);\n    } catch (const std::invalid_argument &e) {\n        val = -1;\n    }\n    std::cout << val << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `s = "abc"\ntry:\n    val = int(s)\nexcept ValueError:\n    val = -1\nprint(val)`,
        solutionCode: `s = "abc"\ntry:\n    val = int(s)\nexcept ValueError:\n    val = -1\nprint(val)`
      },
      javascript: {
        starterCode: `let s = "abc";\nlet val = 0;\ntry {\n    let parsed = Number(s);\n    if (isNaN(parsed)) throw new Error();\n    val = parsed;\n} catch (e) {\n    val = -1;\n}\nconsole.log(val);`,
        solutionCode: `let s = "abc";\nlet val = 0;\ntry {\n    let parsed = Number(s);\n    if (isNaN(parsed)) throw new Error();\n    val = parsed;\n} catch (e) {\n    val = -1;\n}\nconsole.log(val);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "abc";\n        int val = 0;\n        try {\n            val = Integer.parseInt(s);\n        } catch (NumberFormatException e) {\n            val = -1;\n        }\n        System.out.println(val);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String s = "abc";\n        int val = 0;\n        try {\n            val = Integer.parseInt(s);\n        } catch (NumberFormatException e) {\n            val = -1;\n        }\n        System.out.println(val);\n    }\n}`
      }
    }
  },
  {
    id: 607,
    title: 'Múltiples Bloques Catch (Especificidad)',
    statement: 'Completa el tipo de excepción más específico para capturar división por cero antes del genérico.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'En Java es ArithmeticException, en Python ZeroDivisionError.',
    explanation: 'Los manejadores específicos deben preceder a los genéricos para que no sean enmascarados.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nint main() {\n    try {\n        throw std::domain_error("Dominio");\n    } catch (const std::___ &e) {\n        std::cout << "Especifico" << std::endl;\n    } catch (...) {\n        std::cout << "Generico" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nint main() {\n    try {\n        throw std::domain_error("Dominio");\n    } catch (const std::domain_error &e) {\n        std::cout << "Especifico" << std::endl;\n    } catch (...) {\n        std::cout << "Generico" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['domain_error']
      },
      python: {
        starterCode: `try:\n    x = 10 / 0\nexcept ___:\n    print("Especifico")\nexcept Exception:\n    print("Generico")`,
        solutionCode: `try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Especifico")\nexcept Exception:\n    print("Generico")`,
        acceptedKeywords: ['ZeroDivisionError']
      },
      javascript: {
        starterCode: `try {\n    throw new TypeError("Tipo invalido");\n} catch (e) {\n    if (e instanceof ___) {\n        console.log("Especifico");\n    }\n}`,
        solutionCode: `try {\n    throw new TypeError("Tipo invalido");\n} catch (e) {\n    if (e instanceof TypeError) {\n        console.log("Especifico");\n    }\n}`,
        acceptedKeywords: ['TypeError']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (___ e) {\n            System.out.println("Especifico");\n        } catch (Exception e) {\n            System.out.println("Generico");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println("Especifico");\n        } catch (Exception e) {\n            System.out.println("Generico");\n        }\n    }\n}`,
        acceptedKeywords: ['ArithmeticException']
      }
    }
  },
  {
    id: 608,
    title: 'Relanzar Excepción (Rethrow)',
    statement: 'Corrige la instrucción throw / raise para volver a propagar la excepción hacia el llamador.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa throw; en C++, raise en Python, o throw e; en JS/Java.',
    explanation: 'Relanzar una excepción permite registrar el error localmente y delegar su resolución a capas superiores.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid procesar() {\n    try {\n        throw 500;\n    } catch (int e) {\n        std::cout << "Log local" << std::endl;\n        // Relanza el error\n        throw;\n    }\n}\n\nint main() {\n    try { procesar(); } catch (int e) { std::cout << "Atrapado en main" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid procesar() {\n    try {\n        throw 500;\n    } catch (int e) {\n        std::cout << "Log local" << std::endl;\n        throw;\n    }\n}\n\nint main() {\n    try { procesar(); } catch (int e) { std::cout << "Atrapado en main" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `def procesar():\n    try:\n        raise ValueError("Error")\n    except ValueError:\n        print("Log local")\n        raise\n\ntry:\n    procesar()\nexcept ValueError:\n    print("Atrapado en main")`,
        solutionCode: `def procesar():\n    try:\n        raise ValueError("Error")\n    except ValueError:\n        print("Log local")\n        raise\n\ntry:\n    procesar()\nexcept ValueError:\n    print("Atrapado en main")`
      },
      javascript: {
        starterCode: `function procesar() {\n    try {\n        throw new Error("Error");\n    } catch (e) {\n        console.log("Log local");\n        throw e;\n    }\n}\ntry { procesar(); } catch (e) { console.log("Atrapado en main"); }`,
        solutionCode: `function procesar() {\n    try {\n        throw new Error("Error");\n    } catch (e) {\n        console.log("Log local");\n        throw e;\n    }\n}\ntry { procesar(); } catch (e) { console.log("Atrapado en main"); }`
      },
      java: {
        starterCode: `public class Main {\n    static void procesar() throws Exception {\n        try {\n            throw new Exception("Error");\n        } catch (Exception e) {\n            System.out.println("Log local");\n            throw e;\n        }\n    }\n    public static void main(String[] args) {\n        try { procesar(); } catch (Exception e) { System.out.println("Atrapado en main"); }\n    }\n}`,
        solutionCode: `public class Main {\n    static void procesar() throws Exception {\n        try {\n            throw new Exception("Error");\n        } catch (Exception e) {\n            System.out.println("Log local");\n            throw e;\n        }\n    }\n    public static void main(String[] args) {\n        try { procesar(); } catch (Exception e) { System.out.println("Atrapado en main"); }\n    }\n}`
      }
    }
  },
  {
    id: 609,
    title: 'Captura de Índice Fuera de Rango (at vs [])',
    statement: 'Completa la llamada a .at() para activar la verificación de límites en C++ (v.___()).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa .at(indice).',
    explanation: 'El método .at() en contenedores de C++ comprueba límites y lanza std::out_of_range si el índice es inválido.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <stdexcept>\n\nint main() {\n    std::vector<int> v = {10, 20};\n    try {\n        int val = v.___(5); // Fuera de rango\n    } catch (const std::out_of_range &e) {\n        std::cout << "Fuera de rango" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <stdexcept>\n\nint main() {\n    std::vector<int> v = {10, 20};\n    try {\n        int val = v.at(5);\n    } catch (const std::out_of_range &e) {\n        std::cout << "Fuera de rango" << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['at']
      },
      python: {
        starterCode: `v = [10, 20]\ntry:\n    val = v[5]\nexcept ___:\n    print("Fuera de rango")`,
        solutionCode: `v = [10, 20]\ntry:\n    val = v[5]\nexcept IndexError:\n    print("Fuera de rango")`,
        acceptedKeywords: ['IndexError']
      },
      javascript: {
        starterCode: `let v = [10, 20];\ntry {\n    if (5 >= v.length) throw new RangeError();\n} catch (e) {\n    console.log("Fuera de rango");\n}`,
        solutionCode: `let v = [10, 20];\ntry {\n    if (5 >= v.length) throw new RangeError();\n} catch (e) {\n    console.log("Fuera de rango");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {10, 20};\n        try {\n            int val = v[5];\n        } catch (___ e) {\n            System.out.println("Fuera de rango");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] v = {10, 20};\n        try {\n            int val = v[5];\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("Fuera de rango");\n        }\n    }\n}`,
        acceptedKeywords: ['ArrayIndexOutOfBoundsException']
      }
    }
  },
  {
    id: 610,
    title: 'Validación de Saldo Insuficiente',
    statement: 'Corrige la condición: si monto > saldo se debe lanzar la excepción.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Comprueba if (monto > saldo).',
    explanation: 'Las excepciones impiden que una transacción proceda cuando se violan condiciones de validez.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nvoid retirar(double saldo, double monto) {\n    // BUG: Condición invertida\n    if (monto > saldo) {\n        throw std::runtime_error("Saldo insuficiente");\n    }\n}\n\nint main() {\n    try { retirar(50, 100); } catch (...) { std::cout << "Error" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nvoid retirar(double saldo, double monto) {\n    if (monto > saldo) {\n        throw std::runtime_error("Saldo insuficiente");\n    }\n}\n\nint main() {\n    try { retirar(50, 100); } catch (...) { std::cout << "Error" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `def retirar(saldo, monto):\n    if monto > saldo:\n        raise ValueError("Saldo insuficiente")\n\ntry:\n    retirar(50, 100)\nexcept ValueError:\n    print("Error")`,
        solutionCode: `def retirar(saldo, monto):\n    if monto > saldo:\n        raise ValueError("Saldo insuficiente")\n\ntry:\n    retirar(50, 100)\nexcept ValueError:\n    print("Error")`
      },
      javascript: {
        starterCode: `function retirar(saldo, monto) {\n    if (monto > saldo) {\n        throw new Error("Saldo insuficiente");\n    }\n}\ntry { retirar(50, 100); } catch (e) { console.log("Error"); }`,
        solutionCode: `function retirar(saldo, monto) {\n    if (monto > saldo) {\n        throw new Error("Saldo insuficiente");\n    }\n}\ntry { retirar(50, 100); } catch (e) { console.log("Error"); }`
      },
      java: {
        starterCode: `public class Main {\n    static void retirar(double saldo, double monto) {\n        if (monto > saldo) {\n            throw new IllegalArgumentException("Saldo insuficiente");\n        }\n    }\n    public static void main(String[] args) {\n        try { retirar(50, 100); } catch (Exception e) { System.out.println("Error"); }\n    }\n}`,
        solutionCode: `public class Main {\n    static void retirar(double saldo, double monto) {\n        if (monto > saldo) {\n            throw new IllegalArgumentException("Saldo insuficiente");\n        }\n    }\n    public static void main(String[] args) {\n        try { retirar(50, 100); } catch (Exception e) { System.out.println("Error"); }\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 611 al 620 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 611,
    title: 'Creación de Excepción Personalizada',
    statement: 'Completa la herencia para que la clase SaldoInsuficienteError herede de std::exception / Exception.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Hereda de Exception (o std::exception).',
    explanation: 'Crear clases de excepción propias permite modelar errores específicos del dominio de la aplicación.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <exception>\n\nclass MiError : public std::___ {\npublic:\n    const char* what() const noexcept override {\n        return "Error propio";\n    }\n};\n\nint main() {\n    try { throw MiError(); } catch (const std::exception &e) { std::cout << e.what() << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <exception>\n\nclass MiError : public std::exception {\npublic:\n    const char* what() const noexcept override {\n        return "Error propio";\n    }\n};\n\nint main() {\n    try { throw MiError(); } catch (const std::exception &e) { std::cout << e.what() << std::endl; }\n    return 0;\n}`,
        acceptedKeywords: ['exception']
      },
      python: {
        starterCode: `class MiError(___):\n    pass\n\ntry:\n    raise MiError("Error propio")\nexcept MiError as e:\n    print(e)`,
        solutionCode: `class MiError(Exception):\n    pass\n\ntry:\n    raise MiError("Error propio")\nexcept MiError as e:\n    print(e)`,
        acceptedKeywords: ['Exception']
      },
      javascript: {
        starterCode: `class MiError extends ___ {\n    constructor(msg) { super(msg); }\n}\ntry {\n    throw new MiError("Error propio");\n} catch (e) {\n    console.log(e.message);\n}`,
        solutionCode: `class MiError extends Error {\n    constructor(msg) { super(msg); }\n}\ntry {\n    throw new MiError("Error propio");\n} catch (e) {\n    console.log(e.message);\n}`,
        acceptedKeywords: ['Error']
      },
      java: {
        starterCode: `class MiError extends ___ {\n    public MiError(String msg) { super(msg); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try { throw new MiError("Error propio"); } catch (MiError e) { System.out.println(e.getMessage()); }\n    }\n}`,
        solutionCode: `class MiError extends Exception {\n    public MiError(String msg) { super(msg); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try { throw new MiError("Error propio"); } catch (MiError e) { System.out.println(e.getMessage()); }\n    }\n}`,
        acceptedKeywords: ['Exception']
      }
    }
  },
  {
    id: 612,
    title: 'Recuperación y Continuidad en Bucle',
    statement: 'Corrige la ubicación del try-catch para que un elemento erróneo no detenga el procesamiento de los demás.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Coloca el bloque try-catch dentro del cuerpo del bucle.',
    explanation: 'Manejar excepciones dentro del bucle permite aislar fallos y procesar el resto de los elementos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> lista = {"10", "abc", "30"};\n    int suma = 0;\n    for (const auto &s : lista) {\n        try {\n            suma += std::stoi(s);\n        } catch (...) {\n            // Ignora elemento corrupto y continúa\n        }\n    }\n    std::cout << suma << std::endl; // Debe ser 40 (10 + 30)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<std::string> lista = {"10", "abc", "30"};\n    int suma = 0;\n    for (const auto &s : lista) {\n        try {\n            suma += std::stoi(s);\n        } catch (...) {\n        }\n    }\n    std::cout << suma << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `lista = ["10", "abc", "30"]\nsuma = 0\nfor s in lista:\n    try:\n        suma += int(s)\n    except ValueError:\n        pass\nprint(suma)`,
        solutionCode: `lista = ["10", "abc", "30"]\nsuma = 0\nfor s in lista:\n    try:\n        suma += int(s)\n    except ValueError:\n        pass\nprint(suma)`
      },
      javascript: {
        starterCode: `let lista = ["10", "abc", "30"];\nlet suma = 0;\nfor (let s of lista) {\n    try {\n        let n = Number(s);\n        if (isNaN(n)) throw new Error();\n        suma += n;\n    } catch (e) {}\n}\nconsole.log(suma);`,
        solutionCode: `let lista = ["10", "abc", "30"];\nlet suma = 0;\nfor (let s of lista) {\n    try {\n        let n = Number(s);\n        if (isNaN(n)) throw new Error();\n        suma += n;\n    } catch (e) {}\n}\nconsole.log(suma);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        String[] lista = {"10", "abc", "30"};\n        int suma = 0;\n        for (String s : lista) {\n            try {\n                suma += Integer.parseInt(s);\n            } catch (NumberFormatException e) {}\n        }\n        System.out.println(suma);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        String[] lista = {"10", "abc", "30"};\n        int suma = 0;\n        for (String s : lista) {\n            try {\n                suma += Integer.parseInt(s);\n            } catch (NumberFormatException e) {}\n        }\n        System.out.println(suma);\n    }\n}`
      }
    }
  },
  {
    id: 613,
    title: 'Declaración Throws en Métodos (Excepciones Comprobadas)',
    statement: 'Completa la palabra clave throws en la firma del método Java.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa throws Exception.',
    explanation: 'En Java, las excepciones comprobadas (Checked Exceptions) deben declararse explícitamente en la firma del método con throws.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid verificar(int n) {\n    if (n < 0) throw std::invalid_argument("Negativo");\n}\n\nint main() {\n    try { verificar(-1); } catch (...) { std::cout << "OK" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid verificar(int n) {\n    if (n < 0) throw std::invalid_argument("Negativo");\n}\n\nint main() {\n    try { verificar(-1); } catch (...) { std::cout << "OK" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `def verificar(n):\n    if n < 0: raise ValueError("Negativo")\n\ntry: verificar(-1)\nexcept ValueError: print("OK")`,
        solutionCode: `def verificar(n):\n    if n < 0: raise ValueError("Negativo")\n\ntry: verificar(-1)\nexcept ValueError: print("OK")`
      },
      javascript: {
        starterCode: `function verificar(n) {\n    if (n < 0) throw new Error("Negativo");\n}\ntry { verificar(-1); } catch (e) { console.log("OK"); }`,
        solutionCode: `function verificar(n) {\n    if (n < 0) throw new Error("Negativo");\n}\ntry { verificar(-1); } catch (e) { console.log("OK"); }`
      },
      java: {
        starterCode: `public class Main {\n    static void verificar(int n) ___ Exception {\n        if (n < 0) throw new Exception("Negativo");\n    }\n    public static void main(String[] args) {\n        try { verificar(-1); } catch (Exception e) { System.out.println("OK"); }\n    }\n}`,
        solutionCode: `public class Main {\n    static void verificar(int n) throws Exception {\n        if (n < 0) throw new Exception("Negativo");\n    }\n    public static void main(String[] args) {\n        try { verificar(-1); } catch (Exception e) { System.out.println("OK"); }\n    }\n}`,
        acceptedKeywords: ['throws']
      }
    }
  },
  {
    id: 614,
    title: 'Captura Segura de Punteros Nulos (NullPointer / None)',
    statement: 'Corrige la comprobación defensiva para verificar ptr != nullptr antes de desreferenciar.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba if (ptr == nullptr) throw std::runtime_error("Puntero nulo");',
    explanation: 'Validar referencias nulas de forma explícita previene fallos de segmentación y terminación abrupta.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid procesar(int *ptr) {\n    if (ptr == nullptr) {\n        throw std::runtime_error("Nulo");\n    }\n    std::cout << *ptr << std::endl;\n}\n\nint main() {\n    try { procesar(nullptr); } catch (...) { std::cout << "Manejado" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid procesar(int *ptr) {\n    if (ptr == nullptr) {\n        throw std::runtime_error("Nulo");\n    }\n    std::cout << *ptr << std::endl;\n}\n\nint main() {\n    try { procesar(nullptr); } catch (...) { std::cout << "Manejado" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `def procesar(obj):\n    if obj is None:\n        raise ValueError("Nulo")\n    print(obj)\n\ntry: procesar(None)\nexcept ValueError: print("Manejado")`,
        solutionCode: `def procesar(obj):\n    if obj is None:\n        raise ValueError("Nulo")\n    print(obj)\n\ntry: procesar(None)\nexcept ValueError: print("Manejado")`
      },
      javascript: {
        starterCode: `function procesar(obj) {\n    if (obj === null || obj === undefined) {\n        throw new TypeError("Nulo");\n    }\n    console.log(obj);\n}\ntry { procesar(null); } catch (e) { console.log("Manejado"); }`,
        solutionCode: `function procesar(obj) {\n    if (obj === null || obj === undefined) {\n        throw new TypeError("Nulo");\n    }\n    console.log(obj);\n}\ntry { procesar(null); } catch (e) { console.log("Manejado"); }`
      },
      java: {
        starterCode: `public class Main {\n    static void procesar(String s) {\n        if (s == null) {\n            throw new NullPointerException("Nulo");\n        }\n        System.out.println(s.length());\n    }\n    public static void main(String[] args) {\n        try { procesar(null); } catch (NullPointerException e) { System.out.println("Manejado"); }\n    }\n}`,
        solutionCode: `public class Main {\n    static void procesar(String s) {\n        if (s == null) {\n            throw new NullPointerException("Nulo");\n        }\n        System.out.println(s.length());\n    }\n    public static void main(String[] args) {\n        try { procesar(null); } catch (NullPointerException e) { System.out.println("Manejado"); }\n    }\n}`
      }
    }
  },
  {
    id: 615,
    title: 'Cláusula Else en Try-Except (Python)',
    statement: 'Completa la palabra clave else que se ejecuta solo si NO ocurrió ninguna excepción.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'En Python se usa la cláusula else en try-except.',
    explanation: 'El bloque else tras un try se ejecuta únicamente si el bloque protegido no arrojó ninguna excepción.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    bool ok = false;\n    try {\n        int x = 42;\n        ok = true;\n    } catch (...) {}\n    if (ok) std::cout << "Sin errores" << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    bool ok = false;\n    try {\n        int x = 42;\n        ok = true;\n    } catch (...) {}\n    if (ok) std::cout << "Sin errores" << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `try:\n    x = 42\nexcept ValueError:\n    print("Error")\n___:\n    print("Sin errores")`,
        solutionCode: `try:\n    x = 42\nexcept ValueError:\n    print("Error")\nelse:\n    print("Sin errores")`,
        acceptedKeywords: ['else']
      },
      javascript: {
        starterCode: `let error = false;\ntry {\n    let x = 42;\n} catch (e) { error = true; }\nif (!error) console.log("Sin errores");`,
        solutionCode: `let error = false;\ntry {\n    let x = 42;\n} catch (e) { error = true; }\nif (!error) console.log("Sin errores");`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        boolean ok = true;\n        try {\n            int x = 42;\n        } catch (Exception e) { ok = false; }\n        if (ok) System.out.println("Sin errores");\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        boolean ok = true;\n        try {\n            int x = 42;\n        } catch (Exception e) { ok = false; }\n        if (ok) System.out.println("Sin errores");\n    }\n}`
      }
    }
  },
  {
    id: 616,
    title: 'Validación de Formato de Email con Excepción',
    statement: 'Corrige la validación para lanzar error si el email NO contiene el símbolo "@".',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba if (email.find("@") == std::string::npos) throw ...',
    explanation: 'Lanzar excepciones tempranas al validar datos de entrada previene inconsistencias en la base de datos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n#include <stdexcept>\n\nvoid validarEmail(std::string email) {\n    // BUG: Lanza si SÍ contiene @\n    if (email.find('@') == std::string::npos) {\n        throw std::invalid_argument("Email invalido");\n    }\n}\n\nint main() {\n    try { validarEmail("juan_correo.com"); } catch (...) { std::cout << "Invalido" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n#include <stdexcept>\n\nvoid validarEmail(std::string email) {\n    if (email.find('@') == std::string::npos) {\n        throw std::invalid_argument("Email invalido");\n    }\n}\n\nint main() {\n    try { validarEmail("juan_correo.com"); } catch (...) { std::cout << "Invalido" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `def validar_email(email):\n    if "@" not in email:\n        raise ValueError("Email invalido")\n\ntry: validar_email("juan_correo.com")\nexcept ValueError: print("Invalido")`,
        solutionCode: `def validar_email(email):\n    if "@" not in email:\n        raise ValueError("Email invalido")\n\ntry: validar_email("juan_correo.com")\nexcept ValueError: print("Invalido")`
      },
      javascript: {
        starterCode: `function validarEmail(email) {\n    if (!email.includes("@")) {\n        throw new Error("Email invalido");\n    }\n}\ntry { validarEmail("juan_correo.com"); } catch (e) { console.log("Invalido"); }`,
        solutionCode: `function validarEmail(email) {\n    if (!email.includes("@")) {\n        throw new Error("Email invalido");\n    }\n}\ntry { validarEmail("juan_correo.com"); } catch (e) { console.log("Invalido"); }`
      },
      java: {
        starterCode: `public class Main {\n    static void validarEmail(String email) {\n        if (!email.contains("@")) {\n            throw new IllegalArgumentException("Email invalido");\n        }\n    }\n    public static void main(String[] args) {\n        try { validarEmail("juan_correo.com"); } catch (Exception e) { System.out.println("Invalido"); }\n    }\n}`,
        solutionCode: `public class Main {\n    static void validarEmail(String email) {\n        if (!email.contains("@")) {\n            throw new IllegalArgumentException("Email invalido");\n        }\n    }\n    public static void main(String[] args) {\n        try { validarEmail("juan_correo.com"); } catch (Exception e) { System.out.println("Invalido"); }\n    }\n}`
      }
    }
  },
  {
    id: 617,
    title: 'Anidamiento de Bloques Try-Catch',
    statement: 'Completa la captura del error en la capa interna antes de salir.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa catch (...) en la capa interna.',
    explanation: 'El anidamiento permite resolver fallos localmente o delegar a una capa envolvente exterior.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    try {\n        try {\n            throw 1;\n        } ___ (int e) {\n            std::cout << "Interno ";\n        }\n        std::cout << "Externo" << std::endl;\n    } catch (...) {}\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    try {\n        try {\n            throw 1;\n        } catch (int e) {\n            std::cout << "Interno ";\n        }\n        std::cout << "Externo" << std::endl;\n    } catch (...) {}\n    return 0;\n}`,
        acceptedKeywords: ['catch']
      },
      python: {
        starterCode: `try:\n    try:\n        raise ValueError()\n    ___ ValueError:\n        print("Interno ", end="")\n    print("Externo")\nexcept Exception: pass`,
        solutionCode: `try:\n    try:\n        raise ValueError()\n    except ValueError:\n        print("Interno ", end="")\n    print("Externo")\nexcept Exception: pass`,
        acceptedKeywords: ['except']
      },
      javascript: {
        starterCode: `try {\n    try {\n        throw new Error();\n    } ___ (e) {\n        process.stdout.write("Interno ");\n    }\n    console.log("Externo");\n} catch (e) {}`,
        solutionCode: `try {\n    try {\n        throw new Error();\n    } catch (e) {\n        process.stdout.write("Interno ");\n    }\n    console.log("Externo");\n} catch (e) {}`,
        acceptedKeywords: ['catch']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            try {\n                throw new Exception();\n            } ___ (Exception e) {\n                System.out.print("Interno ");\n            }\n            System.out.println("Externo");\n        } catch (Exception e) {}\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            try {\n                throw new Exception();\n            } catch (Exception e) {\n                System.out.print("Interno ");\n            }\n            System.out.println("Externo");\n        } catch (Exception e) {}\n    }\n}`,
        acceptedKeywords: ['catch']
      }
    }
  },
  {
    id: 618,
    title: 'Captura Genérica de Cualquier Error (Catch All)',
    statement: 'Corrige la sintaxis de captura universal con catch (...) en C++.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'La sintaxis universal en C++ es catch (...).',
    explanation: 'El manejador catch-all atrapa cualquier excepción no interceptada por manejadores anteriores.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    try {\n        throw "Error de texto crudo";\n    } catch (...) {\n        std::cout << "Cualquier error atrapado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    try {\n        throw "Error de texto crudo";\n    } catch (...) {\n        std::cout << "Cualquier error atrapado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `try:\n    raise RuntimeError()\nexcept Exception:\n    print("Cualquier error atrapado")`,
        solutionCode: `try:\n    raise RuntimeError()\nexcept Exception:\n    print("Cualquier error atrapado")`
      },
      javascript: {
        starterCode: `try {\n    throw "Error";\n} catch (e) {\n    console.log("Cualquier error atrapado");\n}`,
        solutionCode: `try {\n    throw "Error";\n} catch (e) {\n    console.log("Cualquier error atrapado");\n}`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            throw new Throwable();\n        } catch (Throwable t) {\n            System.out.println("Cualquier error atrapado");\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            throw new Throwable();\n        } catch (Throwable t) {\n            System.out.println("Cualquier error atrapado");\n        }\n    }\n}`
      }
    }
  },
  {
    id: 619,
    title: 'Valor de Retorno con Bloque Finally',
    statement: 'Completa la variable resultado para devolver el valor tras la ejecución del bloque protegido.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Retorna res.',
    explanation: 'El valor de retorno se calcula antes de que el bloque finally ejecute sus tareas de cierre.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint obtener() {\n    int res = 10;\n    return ___;\n}\n\nint main() {\n    std::cout << obtener() << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint obtener() {\n    int res = 10;\n    return res;\n}\n\nint main() {\n    std::cout << obtener() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['res']
      },
      python: {
        starterCode: `def obtener():\n    try:\n        res = 10\n        return ___\n    finally:\n        pass\n\nprint(obtener())`,
        solutionCode: `def obtener():\n    try:\n        res = 10\n        return res\n    finally:\n        pass\n\nprint(obtener())`,
        acceptedKeywords: ['res']
      },
      javascript: {
        starterCode: `function obtener() {\n    try {\n        let res = 10;\n        return ___;\n    } finally {}\n}\nconsole.log(obtener());`,
        solutionCode: `function obtener() {\n    try {\n        let res = 10;\n        return res;\n    } finally {}\n}\nconsole.log(obtener());`,
        acceptedKeywords: ['res']
      },
      java: {
        starterCode: `public class Main {\n    static int obtener() {\n        try {\n            int res = 10;\n            return ___;\n        } finally {}\n    }\n    public static void main(String[] args) {\n        System.out.println(obtener());\n    }\n}`,
        solutionCode: `public class Main {\n    static int obtener() {\n        try {\n            int res = 10;\n            return res;\n        } finally {}\n    }\n    public static void main(String[] args) {\n        System.out.println(obtener());\n    }\n}`,
        acceptedKeywords: ['res']
      }
    }
  },
  {
    id: 620,
    title: 'Validación de Límites en Constructor',
    statement: 'Corrige la validación para rechazar radios negativos (r < 0) lanzando una excepción.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Lanza error si r < 0.',
    explanation: 'Lanzar excepciones desde el constructor previene la existencia de objetos con estados inválidos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nclass Circulo {\npublic:\n    double radio;\n    Circulo(double r) {\n        // BUG: Valida al revés\n        if (r < 0) {\n            throw std::invalid_argument("Radio negativo");\n        }\n        radio = r;\n    }\n};\n\nint main() {\n    try { Circulo c(-5); } catch (...) { std::cout << "Rechazado" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nclass Circulo {\npublic:\n    double radio;\n    Circulo(double r) {\n        if (r < 0) {\n            throw std::invalid_argument("Radio negativo");\n        }\n        radio = r;\n    }\n};\n\nint main() {\n    try { Circulo c(-5); } catch (...) { std::cout << "Rechazado" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `class Circulo:\n    def __init__(self, r):\n        if r < 0:\n            raise ValueError("Radio negativo")\n        self.radio = r\n\ntry: Circulo(-5)\nexcept ValueError: print("Rechazado")`,
        solutionCode: `class Circulo:\n    def __init__(self, r):\n        if r < 0:\n            raise ValueError("Radio negativo")\n        self.radio = r\n\ntry: Circulo(-5)\nexcept ValueError: print("Rechazado")`
      },
      javascript: {
        starterCode: `class Circulo {\n    constructor(r) {\n        if (r < 0) {\n            throw new RangeError("Radio negativo");\n        }\n        this.radio = r;\n    }\n}\ntry { new Circulo(-5); } catch (e) { console.log("Rechazado"); }`,
        solutionCode: `class Circulo {\n    constructor(r) {\n        if (r < 0) {\n            throw new RangeError("Radio negativo");\n        }\n        this.radio = r;\n    }\n}\ntry { new Circulo(-5); } catch (e) { console.log("Rechazado"); }`
      },
      java: {
        starterCode: `class Circulo {\n    double radio;\n    public Circulo(double r) {\n        if (r < 0) {\n            throw new IllegalArgumentException("Radio negativo");\n        }\n        this.radio = r;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try { new Circulo(-5); } catch (Exception e) { System.out.println("Rechazado"); }\n    }\n}`,
        solutionCode: `class Circulo {\n    double radio;\n    public Circulo(double r) {\n        if (r < 0) {\n            throw new IllegalArgumentException("Radio negativo");\n        }\n        this.radio = r;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try { new Circulo(-5); } catch (Exception e) { System.out.println("Rechazado"); }\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 621 al 630 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 621,
    title: 'Especificador Noexcept (Garantía de No Excepción)',
    statement: 'Completa la palabra clave noexcept para garantizar que la función de intercambio no lanza excepciones.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa noexcept.',
    explanation: 'noexcept indica al compilador que la función no emitirá excepciones, habilitando optimizaciones críticas en contenedores.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nvoid swapRapido(int &a, int &b) ___ {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 1, y = 2;\n    swapRapido(x, y);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nvoid swapRapido(int &a, int &b) noexcept {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 1, y = 2;\n    swapRapido(x, y);\n    std::cout << x << " " << y << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['noexcept']
      },
      python: {
        starterCode: `def swap_rapido(a, b):\n    return b, a\n\nprint(swap_rapido(1, 2))`,
        solutionCode: `def swap_rapido(a, b):\n    return b, a\n\nprint(swap_rapido(1, 2))`
      },
      javascript: {
        starterCode: `function swapRapido(a, b) {\n    return [b, a];\n}\nconsole.log(swapRapido(1, 2));`,
        solutionCode: `function swapRapido(a, b) {\n    return [b, a];\n}\nconsole.log(swapRapido(1, 2));`
      },
      java: {
        starterCode: `public class Main {\n    static void swap(int[] arr) {\n        int temp = arr[0]; arr[0] = arr[1]; arr[1] = temp;\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 2};\n        swap(a);\n        System.out.println(a[0] + " " + a[1]);\n    }\n}`,
        solutionCode: `public class Main {\n    static void swap(int[] arr) {\n        int temp = arr[0]; arr[0] = arr[1]; arr[1] = temp;\n    }\n    public static void main(String[] args) {\n        int[] a = {1, 2};\n        swap(a);\n        System.out.println(a[0] + " " + a[1]);\n    }\n}`
      }
    }
  },
  {
    id: 622,
    title: 'Try-With-Resources / Context Manager (with)',
    statement: 'Corrige la sintaxis del gestor de contexto with en Python para cerrar automáticamente el recurso.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa with GestorRecurso() as r:',
    explanation: 'Try-with-resources / with asegura la liberación determinista de recursos al salir del bloque.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <memory>\n\nstruct Archivo {\n    Archivo() { std::cout << "Abierto "; }\n    ~Archivo() { std::cout << "Cerrado" << std::endl; }\n};\n\nint main() {\n    {\n        auto arch = std::make_unique<Archivo>();\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <memory>\n\nstruct Archivo {\n    Archivo() { std::cout << "Abierto "; }\n    ~Archivo() { std::cout << "Cerrado" << std::endl; }\n};\n\nint main() {\n    {\n        auto arch = std::make_unique<Archivo>();\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `class Recurso:\n    def __enter__(self): print("Abierto ", end=""); return self\n    def __exit__(self, exc_type, exc_val, exc_tb): print("Cerrado")\n\nwith Recurso() as r:\n    pass`,
        solutionCode: `class Recurso:\n    def __enter__(self): print("Abierto ", end=""); return self\n    def __exit__(self, exc_type, exc_val, exc_tb): print("Cerrado")\n\nwith Recurso() as r:\n    pass`
      },
      javascript: {
        starterCode: `class Recurso {\n    [Symbol.dispose]() { console.log("Cerrado"); }\n}\n{\n    using r = new Recurso();\n}`,
        solutionCode: `class Recurso {\n    [Symbol.dispose]() { console.log("Cerrado"); }\n}\n{\n    using r = new Recurso();\n}`
      },
      java: {
        starterCode: `class Recurso implements AutoCloseable {\n    public void close() { System.out.println("Cerrado"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Recurso r = new Recurso()) {}\n    }\n}`,
        solutionCode: `class Recurso implements AutoCloseable {\n    public void close() { System.out.println("Cerrado"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Recurso r = new Recurso()) {}\n    }\n}`
      }
    }
  },
  {
    id: 623,
    title: 'Encadenamiento de Excepciones (Exception Chaining)',
    statement: 'Completa la palabra clave from para vincular la causa original en Python (raise NuevoError from ___).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa from e en Python o pasa la causa en el constructor en Java/JS.',
    explanation: 'El encadenamiento conserva la excepción original como causa del nuevo error preservando la trazabilidad.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <exception>\n\nint main() {\n    try {\n        try { throw std::runtime_error("Causa"); }\n        catch (...) { std::throw_with_nested(std::logic_error("Envoltorio")); }\n    } catch (const std::exception &e) {\n        std::cout << e.what() << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <exception>\n\nint main() {\n    try {\n        try { throw std::runtime_error("Causa"); }\n        catch (...) { std::throw_with_nested(std::logic_error("Envoltorio")); }\n    } catch (const std::exception &e) {\n        std::cout << e.what() << std::endl;\n    }\n    return 0;\n}`,
        acceptedKeywords: ['throw_with_nested']
      },
      python: {
        starterCode: `try:\n    try: raise ValueError("Causa")\n    except ValueError as e:\n        raise RuntimeError("Envoltorio") from ___\nexcept RuntimeError as err:\n    print(err.__cause__)`,
        solutionCode: `try:\n    try: raise ValueError("Causa")\n    except ValueError as e:\n        raise RuntimeError("Envoltorio") from e\nexcept RuntimeError as err:\n    print(err.__cause__)`,
        acceptedKeywords: ['e']
      },
      javascript: {
        starterCode: `try {\n    try { throw new Error("Causa"); }\n    catch (e) { throw new Error("Envoltorio", { cause: e }); }\n} catch (err) {\n    console.log(err.cause.message);\n}`,
        solutionCode: `try {\n    try { throw new Error("Causa"); }\n    catch (e) { throw new Error("Envoltorio", { cause: e }); }\n} catch (err) {\n    console.log(err.cause.message);\n}`,
        acceptedKeywords: ['cause']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            try { throw new IllegalArgumentException("Causa"); }\n            catch (Exception e) { throw new RuntimeException("Envoltorio", e); }\n        } catch (Exception err) {\n            System.out.println(err.getCause().getMessage());\n        }\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            try { throw new IllegalArgumentException("Causa"); }\n            catch (Exception e) { throw new RuntimeException("Envoltorio", e); }\n        } catch (Exception err) {\n            System.out.println(err.getCause().getMessage());\n        }\n    }\n}`,
        acceptedKeywords: ['e']
      }
    }
  },
  {
    id: 624,
    title: 'Manejo de Rechazo Asíncrono (Async / Await)',
    statement: 'Corrige la función async con try-catch para capturar la promesa rechazada.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa await promesa() dentro de un bloque try-catch.',
    explanation: 'Las funciones asíncronas capturan promesas rechazadas usando bloques try-catch ordinarios sobre sentencias await.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <future>\n\nint tarea() { throw std::runtime_error("Fallo async"); }\n\nint main() {\n    auto f = std::async(std::launch::async, tarea);\n    try {\n        f.get();\n    } catch (const std::exception &e) {\n        std::cout << "Capturado async" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <future>\n\nint tarea() { throw std::runtime_error("Fallo async"); }\n\nint main() {\n    auto f = std::async(std::launch::async, tarea);\n    try {\n        f.get();\n    } catch (const std::exception &e) {\n        std::cout << "Capturado async" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `import asyncio\n\nasync def falla():\n    raise ValueError("Fallo async")\n\nasync def main():\n    try:\n        await falla()\n    except ValueError:\n        print("Capturado async")\n\nasyncio.run(main())`,
        solutionCode: `import asyncio\n\nasync def falla():\n    raise ValueError("Fallo async")\n\nasync def main():\n    try:\n        await falla()\n    except ValueError:\n        print("Capturado async")\n\nasyncio.run(main())`
      },
      javascript: {
        starterCode: `async function falla() {\n    throw new Error("Fallo async");\n}\nasync function main() {\n    try {\n        await falla();\n    } catch (e) {\n        console.log("Capturado async");\n    }\n}\nmain();`,
        solutionCode: `async function falla() {\n    throw new Error("Fallo async");\n}\nasync function main() {\n    try {\n        await falla();\n    } catch (e) {\n        console.log("Capturado async");\n    }\n}\nmain();`
      },
      java: {
        starterCode: `import java.util.concurrent.CompletableFuture;\npublic class Main {\n    public static void main(String[] args) {\n        CompletableFuture.failedFuture(new Exception("Fallo async"))\n            .exceptionally(ex -> {\n                System.out.println("Capturado async");\n                return null;\n            });\n    }\n}`,
        solutionCode: `import java.util.concurrent.CompletableFuture;\npublic class Main {\n    public static void main(String[] args) {\n        CompletableFuture.failedFuture(new Exception("Fallo async"))\n            .exceptionally(ex -> {\n                System.out.println("Capturado async");\n                return null;\n            });\n    }\n}`
      }
    }
  },
  {
    id: 625,
    title: 'Garantía Fuerte de Excepción (Copy and Swap)',
    statement: 'Completa el intercambio seguro std::swap para aplicar la garantía fuerte de excepción.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa std::swap(temp, destino).',
    explanation: 'El patrón Copy-and-Swap asegura que si ocurre una excepción durante la preparación, el objeto original permanezca intacto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n#include <utility>\n\nint main() {\n    std::vector<int> original = {1, 2, 3};\n    std::vector<int> copia = {10, 20};\n    std::___(original, copia);\n    std::cout << original.size() << std::endl; // 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n#include <utility>\n\nint main() {\n    std::vector<int> original = {1, 2, 3};\n    std::vector<int> copia = {10, 20};\n    std::swap(original, copia);\n    std::cout << original.size() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['swap']
      },
      python: {
        starterCode: `original, copia = [1, 2, 3], [10, 20]\noriginal, copia = copia, original\nprint(len(original))`,
        solutionCode: `original, copia = [1, 2, 3], [10, 20]\noriginal, copia = copia, original\nprint(len(original))`
      },
      javascript: {
        starterCode: `let original = [1, 2, 3], copia = [10, 20];\n[original, copia] = [copia, original];\nconsole.log(original.length);`,
        solutionCode: `let original = [1, 2, 3], copia = [10, 20];\n[original, copia] = [copia, original];\nconsole.log(original.length);`
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3}, b = {10, 20};\n        int[] temp = a; a = b; b = temp;\n        System.out.println(a.length);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3}, b = {10, 20};\n        int[] temp = a; a = b; b = temp;\n        System.out.println(a.length);\n    }\n}`
      }
    }
  },
  {
    id: 626,
    title: 'Excepciones en Destructores (Prohibición de Escape)',
    statement: 'Corrige el destructor para capturar cualquier excepción interna y evitar que escape provocando std::terminate.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Envuelve la operación potencialmente peligrosa del destructor en un bloque try-catch.',
    explanation: 'Permitir que una excepción escape de un destructor durante el desenrollado de pila llama inmediatamente a terminate().',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nstruct Conector {\n    ~Conector() {\n        try {\n            throw 1;\n        } catch (...) {\n            std::cout << "Destructor seguro" << std::endl;\n        }\n    }\n};\n\nint main() {\n    Conector c;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nstruct Conector {\n    ~Conector() {\n        try {\n            throw 1;\n        } catch (...) {\n            std::cout << "Destructor seguro" << std::endl;\n        }\n    }\n};\n\nint main() {\n    Conector c;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Conector:\n    def __del__(self):\n        try: raise Exception()\n        except Exception: print("Destructor seguro")\n\nc = Conector()\ndel c`,
        solutionCode: `class Conector:\n    def __del__(self):\n        try: raise Exception()\n        except Exception: print("Destructor seguro")\n\nc = Conector()\ndel c`
      },
      javascript: {
        starterCode: `function cerrar() {\n    try { throw new Error(); }\n    catch (e) { console.log("Destructor seguro"); }\n}\ncerrar();`,
        solutionCode: `function cerrar() {\n    try { throw new Error(); }\n    catch (e) { console.log("Destructor seguro"); }\n}\ncerrar();`
      },
      java: {
        starterCode: `class Conector implements AutoCloseable {\n    public void close() {\n        try { throw new Exception(); }\n        catch (Exception e) { System.out.println("Destructor seguro"); }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Conector c = new Conector()) {}\n    }\n}`,
        solutionCode: `class Conector implements AutoCloseable {\n    public void close() {\n        try { throw new Exception(); }\n        catch (Exception e) { System.out.println("Destructor seguro"); }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Conector c = new Conector()) {}\n    }\n}`
      }
    }
  },
  {
    id: 627,
    title: 'Validación de Transacción Bancaria con Reversión (Rollback)',
    statement: 'Completa la reversión del saldo debitado en el bloque catch tras fallar la confirmación.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Restaura el saldo sumando el monto debitado: saldo += monto.',
    explanation: 'El patrón transaccional asegura que en caso de error se reviertan todas las modificaciones parciales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nint main() {\n    double saldo = 1000.0;\n    double monto = 200.0;\n    saldo -= monto;\n    try {\n        throw std::runtime_error("Fallo de red");\n    } catch (...) {\n        saldo += ___;\n    }\n    std::cout << saldo << std::endl; // 1000.0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nint main() {\n    double saldo = 1000.0;\n    double monto = 200.0;\n    saldo -= monto;\n    try {\n        throw std::runtime_error("Fallo de red");\n    } catch (...) {\n        saldo += monto;\n    }\n    std::cout << saldo << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['monto']
      },
      python: {
        starterCode: `saldo, monto = 1000.0, 200.0\nsaldo -= monto\ntry:\n    raise RuntimeError("Fallo de red")\nexcept RuntimeError:\n    saldo += ___\nprint(saldo)`,
        solutionCode: `saldo, monto = 1000.0, 200.0\nsaldo -= monto\ntry:\n    raise RuntimeError("Fallo de red")\nexcept RuntimeError:\n    saldo += monto\nprint(saldo)`,
        acceptedKeywords: ['monto']
      },
      javascript: {
        starterCode: `let saldo = 1000.0, monto = 200.0;\nsaldo -= monto;\ntry {\n    throw new Error("Fallo de red");\n} catch (e) {\n    saldo += ___;\n}\nconsole.log(saldo);`,
        solutionCode: `let saldo = 1000.0, monto = 200.0;\nsaldo -= monto;\ntry {\n    throw new Error("Fallo de red");\n} catch (e) {\n    saldo += monto;\n}\nconsole.log(saldo);`,
        acceptedKeywords: ['monto']
      },
      java: {
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        double saldo = 1000.0, monto = 200.0;\n        saldo -= monto;\n        try {\n            throw new Exception("Fallo de red");\n        } catch (Exception e) {\n            saldo += ___;\n        }\n        System.out.println(saldo);\n    }\n}`,
        solutionCode: `public class Main {\n    public static void main(String[] args) {\n        double saldo = 1000.0, monto = 200.0;\n        saldo -= monto;\n        try {\n            throw new Exception("Fallo de red");\n        } catch (Exception e) {\n            saldo += monto;\n        }\n        System.out.println(saldo);\n    }\n}`,
        acceptedKeywords: ['monto']
      }
    }
  },
  {
    id: 628,
    title: 'Excepciones Comprobadas Personalizadas en Java',
    statement: 'Corrige la herencia para que la excepción sea no comprobada heredando de RuntimeException.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Hereda de RuntimeException en lugar de Exception.',
    explanation: 'Las excepciones que heredan de RuntimeException no requieren ser declaradas obligatoriamente con throws.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nclass ErrorNoComprobado : public std::runtime_error {\npublic:\n    ErrorNoComprobado() : std::runtime_error("Error") {}\n};\n\nint main() {\n    try { throw ErrorNoComprobado(); } catch (...) { std::cout << "OK" << std::endl; }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nclass ErrorNoComprobado : public std::runtime_error {\npublic:\n    ErrorNoComprobado() : std::runtime_error("Error") {}\n};\n\nint main() {\n    try { throw ErrorNoComprobado(); } catch (...) { std::cout << "OK" << std::endl; }\n    return 0;\n}`
      },
      python: {
        starterCode: `class ErrorNoComprobado(Exception): pass\ntry: raise ErrorNoComprobado()\nexcept Exception: print("OK")`,
        solutionCode: `class ErrorNoComprobado(Exception): pass\ntry: raise ErrorNoComprobado()\nexcept Exception: print("OK")`
      },
      javascript: {
        starterCode: `class ErrorNoComprobado extends Error {}\ntry { throw new ErrorNoComprobado(); } catch (e) { console.log("OK"); }`,
        solutionCode: `class ErrorNoComprobado extends Error {}\ntry { throw new ErrorNoComprobado(); } catch (e) { console.log("OK"); }`
      },
      java: {
        starterCode: `class ErrorNoComprobado extends RuntimeException {}\npublic class Main {\n    static void ejecutar() {\n        throw new ErrorNoComprobado();\n    }\n    public static void main(String[] args) {\n        try { ejecutar(); } catch (RuntimeException e) { System.out.println("OK"); }\n    }\n}`,
        solutionCode: `class ErrorNoComprobado extends RuntimeException {}\npublic class Main {\n    static void ejecutar() {\n        throw new ErrorNoComprobado();\n    }\n    public static void main(String[] args) {\n        try { ejecutar(); } catch (RuntimeException e) { System.out.println("OK"); }\n    }\n}`
      }
    }
  },
  {
    id: 629,
    title: 'Manejo de Excepciones con Optional / Result',
    statement: 'Completa el retorno std::nullopt cuando ocurra un error sin lanzar excepciones.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Retorna std::nullopt en C++ u Optional.empty() en Java.',
    explanation: 'El patrón Result/Optional ofrece una alternativa funcional para gestionar errores sin la sobrecarga de excepciones.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <optional>\n\nstd::optional<int> parsear(bool ok) {\n    if (!ok) return std::___;\n    return 42;\n}\n\nint main() {\n    auto res = parsear(false);\n    std::cout << res.has_value() << std::endl; // 0 (false)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <optional>\n\nstd::optional<int> parsear(bool ok) {\n    if (!ok) return std::nullopt;\n    return 42;\n}\n\nint main() {\n    auto res = parsear(false);\n    std::cout << res.has_value() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['nullopt']
      },
      python: {
        starterCode: `def parsear(ok):\n    if not ok: return ___\n    return 42\n\nprint(parsear(False) is None)`,
        solutionCode: `def parsear(ok):\n    if not ok: return None\n    return 42\n\nprint(parsear(False) is None)`,
        acceptedKeywords: ['None']
      },
      javascript: {
        starterCode: `function parsear(ok) {\n    if (!ok) return ___;\n    return 42;\n}\nconsole.log(parsear(false) === null);`,
        solutionCode: `function parsear(ok) {\n    if (!ok) return null;\n    return 42;\n}\nconsole.log(parsear(false) === null);`,
        acceptedKeywords: ['null']
      },
      java: {
        starterCode: `import java.util.Optional;\npublic class Main {\n    static Optional<Integer> parsear(boolean ok) {\n        if (!ok) return Optional.___();\n        return Optional.of(42);\n    }\n    public static void main(String[] args) {\n        System.out.println(parsear(false).isPresent());\n    }\n}`,
        solutionCode: `import java.util.Optional;\npublic class Main {\n    static Optional<Integer> parsear(boolean ok) {\n        if (!ok) return Optional.empty();\n        return Optional.of(42);\n    }\n    public static void main(String[] args) {\n        System.out.println(parsear(false).isPresent());\n    }\n}`,
        acceptedKeywords: ['empty']
      }
    }
  },
  {
    id: 630,
    title: 'Jerarquía Completa de Excepciones del Dominio',
    statement: 'Corrige la jerarquía para que ErrorAutenticacion herede de ErrorSeguridad.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Haz que ErrorAutenticacion herede de ErrorSeguridad.',
    explanation: 'Una taxonomía clara de errores permite capturar subfamilias completas de fallos con un solo manejador polimórfico.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <stdexcept>\n\nclass ErrorSeguridad : public std::runtime_error {\npublic: ErrorSeguridad(const char* m) : std::runtime_error(m) {}\n};\n\nclass ErrorAutenticacion : public ErrorSeguridad {\npublic: ErrorAutenticacion() : ErrorSeguridad("Credenciales invalidas") {}\n};\n\nint main() {\n    try {\n        throw ErrorAutenticacion();\n    } catch (const ErrorSeguridad &e) {\n        std::cout << "Error de seguridad atrapado" << std::endl;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <stdexcept>\n\nclass ErrorSeguridad : public std::runtime_error {\npublic: ErrorSeguridad(const char* m) : std::runtime_error(m) {}\n};\n\nclass ErrorAutenticacion : public ErrorSeguridad {\npublic: ErrorAutenticacion() : ErrorSeguridad("Credenciales invalidas") {}\n};\n\nint main() {\n    try {\n        throw ErrorAutenticacion();\n    } catch (const ErrorSeguridad &e) {\n        std::cout << "Error de seguridad atrapado" << std::endl;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `class ErrorSeguridad(Exception): pass\nclass ErrorAutenticacion(ErrorSeguridad): pass\n\ntry:\n    raise ErrorAutenticacion()\nexcept ErrorSeguridad:\n    print("Error de seguridad atrapado")`,
        solutionCode: `class ErrorSeguridad(Exception): pass\nclass ErrorAutenticacion(ErrorSeguridad): pass\n\ntry:\n    raise ErrorAutenticacion()\nexcept ErrorSeguridad:\n    print("Error de seguridad atrapado")`
      },
      javascript: {
        starterCode: `class ErrorSeguridad extends Error {}\nclass ErrorAutenticacion extends ErrorSeguridad {}\n\ntry {\n    throw new ErrorAutenticacion();\n} catch (e) {\n    if (e instanceof ErrorSeguridad) {\n        console.log("Error de seguridad atrapado");\n    }\n}`,
        solutionCode: `class ErrorSeguridad extends Error {}\nclass ErrorAutenticacion extends ErrorSeguridad {}\n\ntry {\n    throw new ErrorAutenticacion();\n} catch (e) {\n    if (e instanceof ErrorSeguridad) {\n        console.log("Error de seguridad atrapado");\n    }\n}`
      },
      java: {
        starterCode: `class ErrorSeguridad extends Exception {}\nclass ErrorAutenticacion extends ErrorSeguridad {}\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            throw new ErrorAutenticacion();\n        } catch (ErrorSeguridad e) {\n            System.out.println("Error de seguridad atrapado");\n        }\n    }\n}`,
        solutionCode: `class ErrorSeguridad extends Exception {}\nclass ErrorAutenticacion extends ErrorSeguridad {}\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            throw new ErrorAutenticacion();\n        } catch (ErrorSeguridad e) {\n            System.out.println("Error de seguridad atrapado");\n        }\n    }\n}`
      }
    }
  }
];
