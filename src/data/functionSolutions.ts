export interface FunctionSolution {
  python: string;
  java: string;
  csharp: string;
  cpp: string;
  javascript: string;
  php: string;
  pseint: string;
}

export const functionSolutions: Record<number, FunctionSolution> = {
  1: {
    python: `def saludar():\n    print("¡Hola, bienvenido al curso de programación!")\n\nsaludar()`,
    java: `public class Main {\n    public static void saludar() {\n        System.out.println("¡Hola, bienvenido al curso de programación!");\n    }\n\n    public static void main(String[] args) {\n        saludar();\n    }\n}`,
    csharp: `using System;\n\nclass Program {\n    static void Saludar() {\n        Console.WriteLine("¡Hola, bienvenido al curso de programación!");\n    }\n\n    static void Main() {\n        Saludar();\n    }\n}`,
    cpp: `#include <iostream>\n\nvoid saludar() {\n    std::cout << "¡Hola, bienvenido al curso de programación!" << std::endl;\n}\n\nint main() {\n    saludar();\n    return 0;\n}`,
    javascript: `function saludar() {\n    console.log("¡Hola, bienvenido al curso de programación!");\n}\n\nsaludar();`,
    php: `<?php\nfunction saludar() {\n    echo "¡Hola, bienvenido al curso de programación!\\n";\n}\n\nsaludar();\n?>`,
    pseint: `SubProceso saludar()\n    Escribir "¡Hola, bienvenido al curso de programación!"\nFinSubProceso\n\nAlgoritmo EjemploFunciones\n    saludar()\nFinAlgoritmo`
  },
  2: {
    python: `def mostrarInfoCurso():\n    print("Curso: Lógica de Programación")\n    print("Duración: 40 horas")\n    print("Profesor: Benjamín Torres")\n\nmostrarInfoCurso()`,
    java: `public class Main {\n    public static void mostrarInfoCurso() {\n        System.out.println("Curso: Lógica de Programación");\n        System.out.println("Duración: 40 horas");\n        System.out.println("Profesor: Benjamín Torres");\n    }\n    public static void main(String[] args) {\n        mostrarInfoCurso();\n    }\n}`,
    csharp: `using System;\n\nclass Program {\n    static void MostrarInfoCurso() {\n        Console.WriteLine("Curso: Lógica de Programación");\n        Console.WriteLine("Duración: 40 horas");\n        Console.WriteLine("Profesor: Benjamín Torres");\n    }\n    static void Main() {\n        MostrarInfoCurso();\n    }\n}`,
    cpp: `#include <iostream>\n\nvoid mostrarInfoCurso() {\n    std::cout << "Curso: Lógica de Programación\\n";\n    std::cout << "Duración: 40 horas\\n";\n    std::cout << "Profesor: Benjamín Torres\\n";\n}\nint main() {\n    mostrarInfoCurso();\n    return 0;\n}`,
    javascript: `function mostrarInfoCurso() {\n    console.log("Curso: Lógica de Programación");\n    console.log("Duración: 40 horas");\n    console.log("Profesor: Benjamín Torres");\n}\nmostrarInfoCurso();`,
    php: `<?php\nfunction mostrarInfoCurso() {\n    echo "Curso: Lógica de Programación\\n";\n    echo "Duración: 40 horas\\n";\n    echo "Profesor: Benjamín Torres\\n";\n}\nmostrarInfoCurso();\n?>`,
    pseint: `SubProceso mostrarInfoCurso()\n    Escribir "Curso: Lógica de Programación"\n    Escribir "Duración: 40 horas"\n    Escribir "Profesor: Benjamín Torres"\nFinSubProceso\n\nAlgoritmo Principal\n    mostrarInfoCurso()\nFinAlgoritmo`
  },
  3: {
    python: `def mostrarBienvenida():\n    print("=================================")\n    print("   SISTEMA DE APRENDIZAJE   ")\n    print("=================================")\n\nmostrarBienvenida()`,
    java: `public class Main {\n    public static void mostrarBienvenida() {\n        System.out.println("=================================");\n        System.out.println("   SISTEMA DE APRENDIZAJE   ");\n        System.out.println("=================================");\n    }\n    public static void main(String[] args) {\n        mostrarBienvenida();\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarBienvenida() {\n        Console.WriteLine("=================================");\n        Console.WriteLine("   SISTEMA DE APRENDIZAJE   ");\n        Console.WriteLine("=================================");\n    }\n    static void Main() { MostrarBienvenida(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarBienvenida() {\n    std::cout << "=================================\\n";\n    std::cout << "   SISTEMA DE APRENDIZAJE   \\n";\n    std::cout << "=================================\\n";\n}\nint main() { mostrarBienvenida(); return 0; }`,
    javascript: `function mostrarBienvenida() {\n    console.log("=================================");\n    console.log("   SISTEMA DE APRENDIZAJE   ");\n    console.log("=================================");\n}\nmostrarBienvenida();`,
    php: `<?php\nfunction mostrarBienvenida() {\n    echo "=================================\\n";\n    echo "   SISTEMA DE APRENDIZAJE   \\n";\n    echo "=================================\\n";\n}\nmostrarBienvenida();\n?>`,
    pseint: `SubProceso mostrarBienvenida()\n    Escribir "================================="\n    Escribir "   SISTEMA DE APRENDIZAJE   "\n    Escribir "================================="\nFinSubProceso\nAlgoritmo Principal\n    mostrarBienvenida()\nFinAlgoritmo`
  },
  4: {
    python: `def mostrarTablaDelCinco():\n    for i in range(1, 11):\n        print(f"5 x {i} = {5 * i}")\n\nmostrarTablaDelCinco()`,
    java: `public class Main {\n    public static void mostrarTablaDelCinco() {\n        for (int i = 1; i <= 10; i++) {\n            System.out.println("5 x " + i + " = " + (5 * i));\n        }\n    }\n    public static void main(String[] args) { mostrarTablaDelCinco(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarTablaDelCinco() {\n        for (int i = 1; i <= 10; i++) {\n            Console.WriteLine($"5 x {i} = {5 * i}");\n        }\n    }\n    static void Main() { MostrarTablaDelCinco(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarTablaDelCinco() {\n    for (int i = 1; i <= 10; i++) {\n        std::cout << "5 x " << i << " = " << (5 * i) << "\\n";\n    }\n}\nint main() { mostrarTablaDelCinco(); return 0; }`,
    javascript: `function mostrarTablaDelCinco() {\n    for (let i = 1; i <= 10; i++) {\n        console.log(\`5 x \${i} = \${5 * i}\`);\n    }\n}\nmostrarTablaDelCinco();`,
    php: `<?php\nfunction mostrarTablaDelCinco() {\n    for ($i = 1; $i <= 10; $i++) {\n        echo "5 x $i = " . (5 * $i) . "\\n";\n    }\n}\nmostrarTablaDelCinco();\n?>`,
    pseint: `SubProceso mostrarTablaDelCinco()\n    Para i <- 1 Hasta 10 Hacer\n        Escribir "5 x ", i, " = ", (5 * i)\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    mostrarTablaDelCinco()\nFinAlgoritmo`
  },
  5: {
    python: `def contarHastaDiez():\n    for i in range(1, 11):\n        print(i)\n\ncontarHastaDiez()`,
    java: `public class Main {\n    public static void contarHastaDiez() {\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(i);\n        }\n    }\n    public static void main(String[] args) { contarHastaDiez(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void ContarHastaDiez() {\n        for (int i = 1; i <= 10; i++) Console.WriteLine(i);\n    }\n    static void Main() { ContarHastaDiez(); }\n}`,
    cpp: `#include <iostream>\nvoid contarHastaDiez() {\n    for (int i = 1; i <= 10; i++) std::cout << i << "\\n";\n}\nint main() { contarHastaDiez(); return 0; }`,
    javascript: `function contarHastaDiez() {\n    for (let i = 1; i <= 10; i++) console.log(i);\n}\ncontarHastaDiez();`,
    php: `<?php\nfunction contarHastaDiez() {\n    for ($i = 1; $i <= 10; $i++) echo "$i\\n";\n}\ncontarHastaDiez();\n?>`,
    pseint: `SubProceso contarHastaDiez()\n    Para i <- 1 Hasta 10 Hacer\n        Escribir i\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    contarHastaDiez()\nFinAlgoritmo`
  },
  6: {
    python: `def mostrarPares():\n    for i in range(1, 21):\n        if i % 2 == 0:\n            print(i)\n\nmostrarPares()`,
    java: `public class Main {\n    public static void mostrarPares() {\n        for (int i = 1; i <= 20; i++) {\n            if (i % 2 == 0) System.out.println(i);\n        }\n    }\n    public static void main(String[] args) { mostrarPares(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarPares() {\n        for (int i = 1; i <= 20; i++) if (i % 2 == 0) Console.WriteLine(i);\n    }\n    static void Main() { MostrarPares(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarPares() {\n    for (int i = 1; i <= 20; i++) if (i % 2 == 0) std::cout << i << "\\n";\n}\nint main() { mostrarPares(); return 0; }`,
    javascript: `function mostrarPares() {\n    for (let i = 1; i <= 20; i++) {\n        if (i % 2 === 0) console.log(i);\n    }\n}\nmostrarPares();`,
    php: `<?php\nfunction mostrarPares() {\n    for ($i = 1; $i <= 20; $i++) {\n        if ($i % 2 == 0) echo "$i\\n";\n    }\n}\nmostrarPares();\n?>`,
    pseint: `SubProceso mostrarPares()\n    Para i <- 1 Hasta 20 Hacer\n        Si i MOD 2 = 0 Entonces\n            Escribir i\n        FinSi\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    mostrarPares()\nFinAlgoritmo`
  },
  7: {
    python: `def mostrarMenuPrincipal():\n    print("1. Iniciar juego")\n    print("2. Cargar partida")\n    print("3. Opciones")\n    print("4. Salir")\n\nmostrarMenuPrincipal()`,
    java: `public class Main {\n    public static void mostrarMenuPrincipal() {\n        System.out.println("1. Iniciar juego\\n2. Cargar partida\\n3. Opciones\\n4. Salir");\n    }\n    public static void main(String[] args) { mostrarMenuPrincipal(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarMenuPrincipal() {\n        Console.WriteLine("1. Iniciar juego\\n2. Cargar partida\\n3. Opciones\\n4. Salir");\n    }\n    static void Main() { MostrarMenuPrincipal(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarMenuPrincipal() {\n    std::cout << "1. Iniciar juego\\n2. Cargar partida\\n3. Opciones\\n4. Salir\\n";\n}\nint main() { mostrarMenuPrincipal(); return 0; }`,
    javascript: `function mostrarMenuPrincipal() {\n    console.log("1. Iniciar juego\\n2. Cargar partida\\n3. Opciones\\n4. Salir");\n}\nmostrarMenuPrincipal();`,
    php: `<?php\nfunction mostrarMenuPrincipal() {\n    echo "1. Iniciar juego\\n2. Cargar partida\\n3. Opciones\\n4. Salir\\n";\n}\nmostrarMenuPrincipal();\n?>`,
    pseint: `SubProceso mostrarMenuPrincipal()\n    Escribir "1. Iniciar juego"\n    Escribir "2. Cargar partida"\n    Escribir "3. Opciones"\n    Escribir "4. Salir"\nFinSubProceso\nAlgoritmo Principal\n    mostrarMenuPrincipal()\nFinAlgoritmo`
  },
  8: {
    python: `def mostrarOpcionesConfiguracion():\n    print("--- AJUSTES ---")\n    print("1. Idioma")\n    print("2. Tema (Claro/Oscuro)")\n    print("3. Sonido")\n    print("4. Volver")\n\nmostrarOpcionesConfiguracion()`,
    java: `public class Main {\n    public static void mostrarOpcionesConfiguracion() {\n        System.out.println("--- AJUSTES ---\\n1. Idioma\\n2. Tema (Claro/Oscuro)\\n3. Sonido\\n4. Volver");\n    }\n    public static void main(String[] args) { mostrarOpcionesConfiguracion(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarOpcionesConfiguracion() {\n        Console.WriteLine("--- AJUSTES ---\\n1. Idioma\\n2. Tema (Claro/Oscuro)\\n3. Sonido\\n4. Volver");\n    }\n    static void Main() { MostrarOpcionesConfiguracion(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarOpcionesConfiguracion() {\n    std::cout << "--- AJUSTES ---\\n1. Idioma\\n2. Tema (Claro/Oscuro)\\n3. Sonido\\n4. Volver\\n";\n}\nint main() { mostrarOpcionesConfiguracion(); return 0; }`,
    javascript: `function mostrarOpcionesConfiguracion() {\n    console.log("--- AJUSTES ---\\n1. Idioma\\n2. Tema (Claro/Oscuro)\\n3. Sonido\\n4. Volver");\n}\nmostrarOpcionesConfiguracion();`,
    php: `<?php\nfunction mostrarOpcionesConfiguracion() {\n    echo "--- AJUSTES ---\\n1. Idioma\\n2. Tema (Claro/Oscuro)\\n3. Sonido\\n4. Volver\\n";\n}\nmostrarOpcionesConfiguracion();\n?>`,
    pseint: `SubProceso mostrarOpcionesConfiguracion()\n    Escribir "--- AJUSTES ---"\n    Escribir "1. Idioma"\n    Escribir "2. Tema (Claro/Oscuro)"\n    Escribir "3. Sonido"\n    Escribir "4. Volver"\nFinSubProceso\nAlgoritmo Principal\n    mostrarOpcionesConfiguracion()\nFinAlgoritmo`
  },
  9: {
    python: `def mostrarProductoEjemplo():\n    print("Producto: Laptop Gamer")\n    print("Código: PROD-998")\n    print("Precio: $1200.00")\n\nmostrarProductoEjemplo()`,
    java: `public class Main {\n    public static void mostrarProductoEjemplo() {\n        System.out.println("Producto: Laptop Gamer\\nCódigo: PROD-998\\nPrecio: $1200.00");\n    }\n    public static void main(String[] args) { mostrarProductoEjemplo(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarProductoEjemplo() {\n        Console.WriteLine("Producto: Laptop Gamer\\nCódigo: PROD-998\\nPrecio: $1200.00");\n    }\n    static void Main() { MostrarProductoEjemplo(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarProductoEjemplo() {\n    std::cout << "Producto: Laptop Gamer\\nCódigo: PROD-998\\nPrecio: $1200.00\\n";\n}\nint main() { mostrarProductoEjemplo(); return 0; }`,
    javascript: `function mostrarProductoEjemplo() {\n    console.log("Producto: Laptop Gamer\\nCódigo: PROD-998\\nPrecio: $1200.00");\n}\nmostrarProductoEjemplo();`,
    php: `<?php\nfunction mostrarProductoEjemplo() {\n    echo "Producto: Laptop Gamer\\nCódigo: PROD-998\\nPrecio: $1200.00\\n";\n}\nmostrarProductoEjemplo();\n?>`,
    pseint: `SubProceso mostrarProductoEjemplo()\n    Escribir "Producto: Laptop Gamer"\n    Escribir "Código: PROD-998"\n    Escribir "Precio: $1200.00"\nFinSubProceso\nAlgoritmo Principal\n    mostrarProductoEjemplo()\nFinAlgoritmo`
  },
  10: {
    python: `def mostrarMenuSistema():\n    print("=== SISTEMA DE GESTIÓN ===")\n    print("Fecha: 26/08/2026")\n    print("1. Registrar usuario")\n    print("2. Consultar catálogo")\n    print("3. Modificar registro")\n    print("4. Eliminar registro")\n    print("5. Salir")\n\nmostrarMenuSistema()`,
    java: `public class Main {\n    public static void mostrarMenuSistema() {\n        System.out.println("=== SISTEMA DE GESTIÓN ===\\nFecha: 26/08/2026\\n1. Registrar usuario\\n2. Consultar catálogo\\n3. Modificar registro\\n4. Eliminar registro\\n5. Salir");\n    }\n    public static void main(String[] args) { mostrarMenuSistema(); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarMenuSistema() {\n        Console.WriteLine("=== SISTEMA DE GESTIÓN ===\\nFecha: 26/08/2026\\n1. Registrar usuario\\n2. Consultar catálogo\\n3. Modificar registro\\n4. Eliminar registro\\n5. Salir");\n    }\n    static void Main() { MostrarMenuSistema(); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarMenuSistema() {\n    std::cout << "=== SISTEMA DE GESTIÓN ===\\nFecha: 26/08/2026\\n1. Registrar usuario\\n2. Consultar catálogo\\n3. Modificar registro\\n4. Eliminar registro\\n5. Salir\\n";\n}\nint main() { mostrarMenuSistema(); return 0; }`,
    javascript: `function mostrarMenuSistema() {\n    console.log("=== SISTEMA DE GESTIÓN ===\\nFecha: 26/08/2026\\n1. Registrar usuario\\n2. Consultar catálogo\\n3. Modificar registro\\n4. Eliminar registro\\n5. Salir");\n}\nmostrarMenuSistema();`,
    php: `<?php\nfunction mostrarMenuSistema() {\n    echo "=== SISTEMA DE GESTIÓN ===\\nFecha: 26/08/2026\\n1. Registrar usuario\\n2. Consultar catálogo\\n3. Modificar registro\\n4. Eliminar registro\\n5. Salir\\n";\n}\nmostrarMenuSistema();\n?>`,
    pseint: `SubProceso mostrarMenuSistema()\n    Escribir "=== SISTEMA DE GESTIÓN ==="\n    Escribir "Fecha: 26/08/2026"\n    Escribir "1. Registrar usuario"\n    Escribir "2. Consultar catálogo"\n    Escribir "3. Modificar registro"\n    Escribir "4. Eliminar registro"\n    Escribir "5. Salir"\nFinSubProceso\nAlgoritmo Principal\n    mostrarMenuSistema()\nFinAlgoritmo`
  },
  11: {
    python: `def saludarPersona(nombre):\n    print(f"Hola {nombre}, ¿cómo estás?")\n\nsaludarPersona("Carlos")`,
    java: `public class Main {\n    public static void saludarPersona(String nombre) {\n        System.out.println("Hola " + nombre + ", ¿cómo estás?");\n    }\n    public static void main(String[] args) { saludarPersona("Carlos"); }\n}`,
    csharp: `using System;\nclass Program {\n    static void SaludarPersona(string nombre) {\n        Console.WriteLine($"Hola {nombre}, ¿cómo estás?");\n    }\n    static void Main() { SaludarPersona("Carlos"); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nvoid saludarPersona(std::string nombre) {\n    std::cout << "Hola " << nombre << ", ¿cómo estás?\\n";\n}\nint main() { saludarPersona("Carlos"); return 0; }`,
    javascript: `function saludarPersona(nombre) {\n    console.log(\`Hola \${nombre}, ¿cómo estás?\`);\n}\nsaludarPersona("Carlos");`,
    php: `<?php\nfunction saludarPersona($nombre) {\n    echo "Hola $nombre, ¿cómo estás?\\n";\n}\nsaludarPersona("Carlos");\n?>`,
    pseint: `SubProceso saludarPersona(nombre)\n    Escribir "Hola ", nombre, ", ¿cómo estás?"\nFinSubProceso\nAlgoritmo Principal\n    saludarPersona("Carlos")\nFinAlgoritmo`
  },
  12: {
    python: `def mostrarNombreCompleto(nombre, apellido):\n    print(f"Nombre completo: {nombre} {apellido}")\n\nmostrarNombreCompleto("Ana", "Pérez")`,
    java: `public class Main {\n    public static void mostrarNombreCompleto(String nombre, String apellido) {\n        System.out.println("Nombre completo: " + nombre + " " + apellido);\n    }\n    public static void main(String[] args) { mostrarNombreCompleto("Ana", "Pérez"); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarNombreCompleto(string nombre, string apellido) {\n        Console.WriteLine($"Nombre completo: {nombre} {apellido}");\n    }\n    static void Main() { MostrarNombreCompleto("Ana", "Pérez"); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nvoid mostrarNombreCompleto(std::string nombre, std::string apellido) {\n    std::cout << "Nombre completo: " << nombre << " " << apellido << "\\n";\n}\nint main() { mostrarNombreCompleto("Ana", "Pérez"); return 0; }`,
    javascript: `function mostrarNombreCompleto(nombre, apellido) {\n    console.log(\`Nombre completo: \${nombre} \${apellido}\`);\n}\nmostrarNombreCompleto("Ana", "Pérez");`,
    php: `<?php\nfunction mostrarNombreCompleto($nombre, $apellido) {\n    echo "Nombre completo: $nombre $apellido\\n";\n}\nmostrarNombreCompleto("Ana", "Pérez");\n?>`,
    pseint: `SubProceso mostrarNombreCompleto(nombre, apellido)\n    Escribir "Nombre completo: ", nombre, " ", apellido\nFinSubProceso\nAlgoritmo Principal\n    mostrarNombreCompleto("Ana", "Pérez")\nFinAlgoritmo`
  },
  13: {
    python: `def mostrarEdad(edad):\n    print(f"Tienes {edad} años.")\n    if edad >= 18:\n        print("Eres mayor de edad.")\n    else:\n        print("Eres menor de edad.")\n\nmostrarEdad(20)`,
    java: `public class Main {\n    public static void mostrarEdad(int edad) {\n        System.out.println("Tienes " + edad + " años.");\n        if (edad >= 18) System.out.println("Eres mayor de edad.");\n        else System.out.println("Eres menor de edad.");\n    }\n    public static void main(String[] args) { mostrarEdad(20); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarEdad(int edad) {\n        Console.WriteLine($"Tienes {edad} años.");\n        if (edad >= 18) Console.WriteLine("Eres mayor de edad.");\n        else Console.WriteLine("Eres menor de edad.");\n    }\n    static void Main() { MostrarEdad(20); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarEdad(int edad) {\n    std::cout << "Tienes " << edad << " años.\\n";\n    if (edad >= 18) std::cout << "Eres mayor de edad.\\n";\n    else std::cout << "Eres menor de edad.\\n";\n}\nint main() { mostrarEdad(20); return 0; }`,
    javascript: `function mostrarEdad(edad) {\n    console.log(\`Tienes \${edad} años.\`);\n    if (edad >= 18) console.log("Eres mayor de edad.");\n    else console.log("Eres menor de edad.");\n}\nmostrarEdad(20);`,
    php: `<?php\nfunction mostrarEdad($edad) {\n    echo "Tienes $edad años.\\n";\n    if ($edad >= 18) echo "Eres mayor de edad.\\n";\n    else echo "Eres menor de edad.\\n";\n}\nmostrarEdad(20);\n?>`,
    pseint: `SubProceso mostrarEdad(edad)\n    Escribir "Tienes ", edad, " años."\n    Si edad >= 18 Entonces\n        Escribir "Eres mayor de edad."\n    Sino\n        Escribir "Eres menor de edad."\n    FinSi\nFinSubProceso\nAlgoritmo Principal\n    mostrarEdad(20)\nFinAlgoritmo`
  },
  14: {
    python: "def mostrarDetalleProducto(nombre, precio):\n    print('Producto: ' + str(nombre) + ' | Precio: $' + str(precio))\n\nmostrarDetalleProducto('Teclado Mecánico', 15000)",
    java: `public class Main {\n    public static void mostrarDetalleProducto(String nombre, double precio) {\n        System.out.println("Producto: " + nombre + " | Precio: $" + precio);\n    }\n    public static void main(String[] args) { mostrarDetalleProducto("Teclado Mecánico", 15000); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarDetalleProducto(string nombre, double precio) {\n        Console.WriteLine("Producto: " + nombre + " | Precio: $" + precio);\n    }\n    static void Main() { MostrarDetalleProducto("Teclado Mecánico", 15000); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nvoid mostrarDetalleProducto(std::string nombre, double precio) {\n    std::cout << "Producto: " << nombre << " | Precio: $" << precio << "\\n";\n}\nint main() { mostrarDetalleProducto("Teclado Mecánico", 15000); return 0; }`,
    javascript: `function mostrarDetalleProducto(nombre, precio) {\n    console.log("Producto: " + nombre + " | Precio: $" + precio);\n}\nmostrarDetalleProducto("Teclado Mecánico", 15000);`,
    php: `<?php\nfunction mostrarDetalleProducto($nombre, $precio) {\n    echo "Producto: $nombre | Precio: \\$$precio\\n";\n}\nmostrarDetalleProducto("Teclado Mecánico", 15000);\n?>`,
    pseint: `SubProceso mostrarDetalleProducto(nombre, precio)\n    Escribir "Producto: ", nombre, " | Precio: $", precio\nFinSubProceso\nAlgoritmo Principal\n    mostrarDetalleProducto("Teclado Mecánico", 15000)\nFinAlgoritmo`
  },
  15: {
    python: "def mostrarPrecioConIVA(precioNeto):\n    iva = precioNeto * 0.19\n    total = precioNeto + iva\n    print('Neto: $' + str(precioNeto) + ' | IVA: $' + str(iva) + ' | Total: $' + str(total))\n\nmostrarPrecioConIVA(10000)",
    java: `public class Main {\n    public static void mostrarPrecioConIVA(double precioNeto) {\n        double iva = precioNeto * 0.19;\n        double total = precioNeto + iva;\n        System.out.println("Neto: $" + precioNeto + " | IVA: $" + iva + " | Total: $" + total);\n    }\n    public static void main(String[] args) { mostrarPrecioConIVA(10000); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarPrecioConIVA(double precioNeto) {\n        double iva = precioNeto * 0.19;\n        double total = precioNeto + iva;\n        Console.WriteLine("Neto: $" + precioNeto + " | IVA: $" + iva + " | Total: $" + total);\n    }\n    static void Main() { MostrarPrecioConIVA(10000); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarPrecioConIVA(double precioNeto) {\n    double iva = precioNeto * 0.19;\n    double total = precioNeto + iva;\n    std::cout << "Neto: $" << precioNeto << " | IVA: $" << iva << " | Total: $" << total << "\\n";\n}\nint main() { mostrarPrecioConIVA(10000); return 0; }`,
    javascript: `function mostrarPrecioConIVA(precioNeto) {\n    const iva = precioNeto * 0.19;\n    const total = precioNeto + iva;\n    console.log("Neto: $" + precioNeto + " | IVA: $" + iva + " | Total: $" + total);\n}\nmostrarPrecioConIVA(10000);`,
    php: `<?php\nfunction mostrarPrecioConIVA($precioNeto) {\n    $iva = $precioNeto * 0.19;\n    $total = $precioNeto + $iva;\n    echo "Neto: $" . $precioNeto . " | IVA: $" . $iva . " | Total: $" . $total . "\\n";\n}\nmostrarPrecioConIVA(10000);\n?>`,
    pseint: `SubProceso mostrarPrecioConIVA(precioNeto)\n    iva <- precioNeto * 0.19\n    total <- precioNeto + iva\n    Escribir "Neto: $", precioNeto, " | IVA: $", iva, " | Total: $", total\nFinSubProceso\nAlgoritmo Principal\n    mostrarPrecioConIVA(10000)\nFinAlgoritmo`
  },
  16: {
    python: `def mostrarTabla(numero):\n    for i in range(1, 11):\n        print(f"{numero} x {i} = {numero * i}")\n\nmostrarTabla(7)`,
    java: `public class Main {\n    public static void mostrarTabla(int numero) {\n        for (int i = 1; i <= 10; i++) System.out.println(numero + " x " + i + " = " + (numero * i));\n    }\n    public static void main(String[] args) { mostrarTabla(7); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarTabla(int numero) {\n        for (int i = 1; i <= 10; i++) Console.WriteLine($"{numero} x {i} = {numero * i}");\n    }\n    static void Main() { MostrarTabla(7); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarTabla(int numero) {\n    for (int i = 1; i <= 10; i++) std::cout << numero << " x " << i << " = " << (numero * i) << "\\n";\n}\nint main() { mostrarTabla(7); return 0; }`,
    javascript: `function mostrarTabla(numero) {\n    for (let i = 1; i <= 10; i++) console.log(\`\${numero} x \${i} = \${numero * i}\`);\n}\nmostrarTabla(7);`,
    php: `<?php\nfunction mostrarTabla($numero) {\n    for ($i = 1; $i <= 10; $i++) echo "$numero x $i = " . ($numero * $i) . "\\n";\n}\nmostrarTabla(7);\n?>`,
    pseint: `SubProceso mostrarTabla(numero)\n    Para i <- 1 Hasta 10 Hacer\n        Escribir numero, " x ", i, " = ", (numero * i)\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    mostrarTabla(7)\nFinAlgoritmo`
  },
  17: {
    python: `def contarHastaN(limite):\n    for i in range(1, limite + 1):\n        print(i)\n\ncontarHastaN(15)`,
    java: `public class Main {\n    public static void contarHastaN(int limite) {\n        for (int i = 1; i <= limite; i++) System.out.println(i);\n    }\n    public static void main(String[] args) { contarHastaN(15); }\n}`,
    csharp: `using System;\nclass Program {\n    static void ContarHastaN(int limite) {\n        for (int i = 1; i <= limite; i++) Console.WriteLine(i);\n    }\n    static void Main() { ContarHastaN(15); }\n}`,
    cpp: `#include <iostream>\nvoid contarHastaN(int limite) {\n    for (int i = 1; i <= limite; i++) std::cout << i << "\\n";\n}\nint main() { contarHastaN(15); return 0; }`,
    javascript: `function contarHastaN(limite) {\n    for (let i = 1; i <= limite; i++) console.log(i);\n}\ncontarHastaN(15);`,
    php: `<?php\nfunction contarHastaN($limite) {\n    for ($i = 1; $i <= $limite; $i++) echo "$i\\n";\n}\ncontarHastaN(15);\n?>`,
    pseint: `SubProceso contarHastaN(limite)\n    Para i <- 1 Hasta limite Hacer\n        Escribir i\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    contarHastaN(15)\nFinAlgoritmo`
  },
  18: {
    python: `def mostrarParesHastaN(limite):\n    for i in range(1, limite + 1):\n        if i % 2 == 0:\n            print(i)\n\nmostrarParesHastaN(30)`,
    java: `public class Main {\n    public static void mostrarParesHastaN(int limite) {\n        for (int i = 1; i <= limite; i++) if (i % 2 == 0) System.out.println(i);\n    }\n    public static void main(String[] args) { mostrarParesHastaN(30); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarParesHastaN(int limite) {\n        for (int i = 1; i <= limite; i++) if (i % 2 == 0) Console.WriteLine(i);\n    }\n    static void Main() { MostrarParesHastaN(30); }\n}`,
    cpp: `#include <iostream>\nvoid mostrarParesHastaN(int limite) {\n    for (int i = 1; i <= limite; i++) if (i % 2 == 0) std::cout << i << "\\n";\n}\nint main() { mostrarParesHastaN(30); return 0; }`,
    javascript: `function mostrarParesHastaN(limite) {\n    for (let i = 1; i <= limite; i++) if (i % 2 === 0) console.log(i);\n}\nmostrarParesHastaN(30);`,
    php: `<?php\nfunction mostrarParesHastaN($limite) {\n    for ($i = 1; $i <= $limite; $i++) if ($i % 2 == 0) echo "$i\\n";\n}\nmostrarParesHastaN(30);\n?>`,
    pseint: `SubProceso mostrarParesHastaN(limite)\n    Para i <- 1 Hasta limite Hacer\n        Si i MOD 2 = 0 Entonces\n            Escribir i\n        FinSi\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    mostrarParesHastaN(30)\nFinAlgoritmo`
  },
  19: {
    python: `def mostrarAlumno(nombre, edad, carrera):\n    print(f"Alumno: {nombre} | Edad: {edad} | Carrera: {carrera}")\n\nmostrarAlumno("Laura", 20, "Informática")`,
    java: `public class Main {\n    public static void mostrarAlumno(String nombre, int edad, String carrera) {\n        System.out.println("Alumno: " + nombre + " | Edad: " + edad + " | Carrera: " + carrera);\n    }\n    public static void main(String[] args) { mostrarAlumno("Laura", 20, "Informática"); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarAlumno(string nombre, int edad, string carrera) {\n        Console.WriteLine($"Alumno: {nombre} | Edad: {edad} | Carrera: {carrera}");\n    }\n    static void Main() { MostrarAlumno("Laura", 20, "Informática"); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nvoid mostrarAlumno(std::string nombre, int edad, std::string carrera) {\n    std::cout << "Alumno: " << nombre << " | Edad: " << edad << " | Carrera: " << carrera << "\\n";\n}\nint main() { mostrarAlumno("Laura", 20, "Informática"); return 0; }`,
    javascript: `function mostrarAlumno(nombre, edad, carrera) {\n    console.log(\`Alumno: \${nombre} | Edad: \${edad} | Carrera: \${carrera}\`);\n}\nmostrarAlumno("Laura", 20, "Informática");`,
    php: `<?php\nfunction mostrarAlumno($nombre, $edad, $carrera) {\n    echo "Alumno: $nombre | Edad: $edad | Carrera: $carrera\\n";\n}\nmostrarAlumno("Laura", 20, "Informática");\n?>`,
    pseint: `SubProceso mostrarAlumno(nombre, edad, carrera)\n    Escribir "Alumno: ", nombre, " | Edad: ", edad, " | Carrera: ", carrera\nFinSubProceso\nAlgoritmo Principal\n    mostrarAlumno("Laura", 20, "Informática")\nFinAlgoritmo`
  },
  20: {
    python: "def mostrarFactura(cliente, total, descuento):\n    montoDesc = total * (descuento / 100)\n    final = total - montoDesc\n    print('Cliente: ' + str(cliente) + '\\nSubtotal: $' + str(total) + '\\nDescuento (' + str(descuento) + '%): -$' + str(montoDesc) + '\\nTotal Pagar: $' + str(final))\n\nmostrarFactura('Empresa ACME', 50000, 10)",
    java: `public class Main {\n    public static void mostrarFactura(String cliente, double total, double descuento) {\n        double montoDesc = total * (descuento / 100);\n        double finalMonto = total - montoDesc;\n        System.out.println("Cliente: " + cliente + "\\nSubtotal: $" + total + "\\nDescuento (" + descuento + "%): -$" + montoDesc + "\\nTotal Pagar: $" + finalMonto);\n    }\n    public static void main(String[] args) { mostrarFactura("Empresa ACME", 50000, 10); }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarFactura(string cliente, double total, double descuento) {\n        double montoDesc = total * (descuento / 100);\n        double finalMonto = total - montoDesc;\n        Console.WriteLine("Cliente: " + cliente + "\\nSubtotal: $" + total + "\\nDescuento (" + descuento + "%): -$" + montoDesc + "\\nTotal Pagar: $" + finalMonto);\n    }\n    static void Main() { MostrarFactura("Empresa ACME", 50000, 10); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nvoid mostrarFactura(std::string cliente, double total, double descuento) {\n    double montoDesc = total * (descuento / 100);\n    double finalMonto = total - montoDesc;\n    std::cout << "Cliente: " << cliente << "\\nSubtotal: $" << total << "\\nDescuento (" << descuento << "%): -$" << montoDesc << "\\nTotal Pagar: $" << finalMonto << "\\n";\n}\nint main() { mostrarFactura("Empresa ACME", 50000, 10); return 0; }`,
    javascript: `function mostrarFactura(cliente, total, descuento) {\n    const montoDesc = total * (descuento / 100);\n    const finalMonto = total - montoDesc;\n    console.log("Cliente: " + cliente + "\\nSubtotal: $" + total + "\\nDescuento (" + descuento + "%): -$" + montoDesc + "\\nTotal Pagar: $" + finalMonto);\n}\nmostrarFactura("Empresa ACME", 50000, 10);`,
    php: `<?php\nfunction mostrarFactura($cliente, $total, $descuento) {\n    $montoDesc = $total * ($descuento / 100);\n    $finalMonto = $total - $montoDesc;\n    echo "Cliente: " . $cliente . "\\nSubtotal: $" . $total . "\\nDescuento (" . $descuento . "%): -$" . $montoDesc . "\\nTotal Pagar: $" . $finalMonto . "\\n";\n}\nmostrarFactura("Empresa ACME", 50000, 10);\n?>`,
    pseint: `SubProceso mostrarFactura(cliente, total, descuento)\n    montoDesc <- total * (descuento / 100)\n    finalMonto <- total - montoDesc\n    Escribir "Cliente: ", cliente\n    Escribir "Subtotal: $", total\n    Escribir "Descuento (", descuento, "%): -$", montoDesc\n    Escribir "Total Pagar: $", finalMonto\nFinSubProceso\nAlgoritmo Principal\n    mostrarFactura("Empresa ACME", 50000, 10)\nFinAlgoritmo`
  },
  21: {
    python: `def obtenerNumeroMagico():\n    return 42\n\nvalor = obtenerNumeroMagico()\nprint(valor)`,
    java: `public class Main {\n    public static int obtenerNumeroMagico() { return 42; }\n    public static void main(String[] args) { System.out.println(obtenerNumeroMagico()); }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerNumeroMagico() { return 42; }\n    static void Main() { Console.WriteLine(ObtenerNumeroMagico()); }\n}`,
    cpp: `#include <iostream>\nint obtenerNumeroMagico() { return 42; }\nint main() { std::cout << obtenerNumeroMagico() << "\\n"; return 0; }`,
    javascript: `function obtenerNumeroMagico() { return 42; }\nconsole.log(obtenerNumeroMagico());`,
    php: `<?php\nfunction obtenerNumeroMagico() { return 42; }\necho obtenerNumeroMagico() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerNumeroMagico()\n    res <- 42\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerNumeroMagico()\nFinAlgoritmo`
  },
  22: {
    python: `def obtenerNombreApp():\n    return "Café y Código v2.0"\n\nprint(obtenerNombreApp())`,
    java: `public class Main {\n    public static String obtenerNombreApp() { return "Café y Código v2.0"; }\n    public static void main(String[] args) { System.out.println(obtenerNombreApp()); }\n}`,
    csharp: `using System;\nclass Program {\n    static string ObtenerNombreApp() { return "Café y Código v2.0"; }\n    static void Main() { Console.WriteLine(ObtenerNombreApp()); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nstd::string obtenerNombreApp() { return "Café y Código v2.0"; }\nint main() { std::cout << obtenerNombreApp() << "\\n"; return 0; }`,
    javascript: `function obtenerNombreApp() { return "Café y Código v2.0"; }\nconsole.log(obtenerNombreApp());`,
    php: `<?php\nfunction obtenerNombreApp() { return "Café y Código v2.0"; }\necho obtenerNombreApp() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerNombreApp()\n    res <- "Café y Código v2.0"\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerNombreApp()\nFinAlgoritmo`
  },
  23: {
    python: `def obtenerPi():\n    return 3.14159265\n\nprint(obtenerPi())`,
    java: `public class Main {\n    public static double obtenerPi() { return 3.14159265; }\n    public static void main(String[] args) { System.out.println(obtenerPi()); }\n}`,
    csharp: `using System;\nclass Program {\n    static double ObtenerPi() { return 3.14159265; }\n    static void Main() { Console.WriteLine(ObtenerPi()); }\n}`,
    cpp: `#include <iostream>\ndouble obtenerPi() { return 3.14159265; }\nint main() { std::cout << obtenerPi() << "\\n"; return 0; }`,
    javascript: `function obtenerPi() { return 3.14159265; }\nconsole.log(obtenerPi());`,
    php: `<?php\nfunction obtenerPi() { return 3.14159265; }\necho obtenerPi() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerPi()\n    res <- 3.14159265\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerPi()\nFinAlgoritmo`
  },
  24: {
    python: `import random\ndef obtenerNumeroAleatorio():\n    return random.randint(1, 100)\n\nprint(obtenerNumeroAleatorio())`,
    java: `import java.util.Random;\npublic class Main {\n    public static int obtenerNumeroAleatorio() {\n        return new Random().nextInt(100) + 1;\n    }\n    public static void main(String[] args) { System.out.println(obtenerNumeroAleatorio()); }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerNumeroAleatorio() { return new Random().Next(1, 101); }\n    static void Main() { Console.WriteLine(ObtenerNumeroAleatorio()); }\n}`,
    cpp: `#include <iostream>\n#include <cstdlib>\n#include <ctime>\nint obtenerNumeroAleatorio() { return (rand() % 100) + 1; }\nint main() { srand(time(0)); std::cout << obtenerNumeroAleatorio() << "\\n"; return 0; }`,
    javascript: `function obtenerNumeroAleatorio() {\n    return Math.floor(Math.random() * 100) + 1;\n}\nconsole.log(obtenerNumeroAleatorio());`,
    php: `<?php\nfunction obtenerNumeroAleatorio() { return rand(1, 100); }\necho obtenerNumeroAleatorio() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerNumeroAleatorio()\n    res <- Azar(100) + 1\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerNumeroAleatorio()\nFinAlgoritmo`
  },
  25: {
    python: `def obtenerAnioActual():\n    return 2026\n\nprint(obtenerAnioActual())`,
    java: `public class Main {\n    public static int obtenerAnioActual() { return 2026; }\n    public static void main(String[] args) { System.out.println(obtenerAnioActual()); }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerAnioActual() { return 2026; }\n    static void Main() { Console.WriteLine(ObtenerAnioActual()); }\n}`,
    cpp: `#include <iostream>\nint obtenerAnioActual() { return 2026; }\nint main() { std::cout << obtenerAnioActual() << "\\n"; return 0; }`,
    javascript: `function obtenerAnioActual() { return 2026; }\nconsole.log(obtenerAnioActual());`,
    php: `<?php\nfunction obtenerAnioActual() { return 2026; }\necho obtenerAnioActual() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerAnioActual()\n    res <- 2026\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerAnioActual()\nFinAlgoritmo`
  },
  26: {
    python: `def obtenerEstadoServidor():\n    return True\n\nif obtenerEstadoServidor():\n    print("Servidor activo.")`,
    java: `public class Main {\n    public static boolean obtenerEstadoServidor() { return true; }\n    public static void main(String[] args) { System.out.println(obtenerEstadoServidor()); }\n}`,
    csharp: `using System;\nclass Program {\n    static bool ObtenerEstadoServidor() { return true; }\n    static void Main() { Console.WriteLine(ObtenerEstadoServidor()); }\n}`,
    cpp: `#include <iostream>\nbool obtenerEstadoServidor() { return true; }\nint main() { std::cout << std::boolalpha << obtenerEstadoServidor() << "\\n"; return 0; }`,
    javascript: `function obtenerEstadoServidor() { return true; }\nconsole.log(obtenerEstadoServidor());`,
    php: `<?php\nfunction obtenerEstadoServidor() { return true; }\necho obtenerEstadoServidor() ? "true" : "false";\n?>`,
    pseint: `Funcion res <- obtenerEstadoServidor()\n    res <- Verdadero\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerEstadoServidor()\nFinAlgoritmo`
  },
  27: {
    python: `def obtenerTasaIVA():\n    return 0.19\n\nprint(obtenerTasaIVA())`,
    java: `public class Main {\n    public static double obtenerTasaIVA() { return 0.19; }\n    public static void main(String[] args) { System.out.println(obtenerTasaIVA()); }\n}`,
    csharp: `using System;\nclass Program {\n    static double ObtenerTasaIVA() { return 0.19; }\n    static void Main() { Console.WriteLine(ObtenerTasaIVA()); }\n}`,
    cpp: `#include <iostream>\ndouble obtenerTasaIVA() { return 0.19; }\nint main() { std::cout << obtenerTasaIVA() << "\\n"; return 0; }`,
    javascript: `function obtenerTasaIVA() { return 0.19; }\nconsole.log(obtenerTasaIVA());`,
    php: `<?php\nfunction obtenerTasaIVA() { return 0.19; }\necho obtenerTasaIVA() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerTasaIVA()\n    res <- 0.19\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerTasaIVA()\nFinAlgoritmo`
  },
  28: {
    python: `def obtenerMensajeDelDia():\n    return "¡Hoy es un excelente día para programar!"\n\nprint(obtenerMensajeDelDia())`,
    java: `public class Main {\n    public static String obtenerMensajeDelDia() { return "¡Hoy es un excelente día para programar!"; }\n    public static void main(String[] args) { System.out.println(obtenerMensajeDelDia()); }\n}`,
    csharp: `using System;\nclass Program {\n    static string ObtenerMensajeDelDia() { return "¡Hoy es un excelente día para programar!"; }\n    static void Main() { Console.WriteLine(ObtenerMensajeDelDia()); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nstd::string obtenerMensajeDelDia() { return "¡Hoy es un excelente día para programar!"; }\nint main() { std::cout << obtenerMensajeDelDia() << "\\n"; return 0; }`,
    javascript: `function obtenerMensajeDelDia() { return "¡Hoy es un excelente día para programar!"; }\nconsole.log(obtenerMensajeDelDia());`,
    php: `<?php\nfunction obtenerMensajeDelDia() { return "¡Hoy es un excelente día para programar!"; }\necho obtenerMensajeDelDia() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerMensajeDelDia()\n    res <- "¡Hoy es un excelente día para programar!"\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerMensajeDelDia()\nFinAlgoritmo`
  },
  29: {
    python: `def obtenerCodigoSecreto():\n    return "ADM-2026"\n\nprint(obtenerCodigoSecreto())`,
    java: `public class Main {\n    public static String obtenerCodigoSecreto() { return "ADM-2026"; }\n    public static void main(String[] args) { System.out.println(obtenerCodigoSecreto()); }\n}`,
    csharp: `using System;\nclass Program {\n    static string ObtenerCodigoSecreto() { return "ADM-2026"; }\n    static void Main() { Console.WriteLine(ObtenerCodigoSecreto()); }\n}`,
    cpp: `#include <iostream>\n#include <string>\nstd::string obtenerCodigoSecreto() { return "ADM-2026"; }\nint main() { std::cout << obtenerCodigoSecreto() << "\\n"; return 0; }`,
    javascript: `function obtenerCodigoSecreto() { return "ADM-2026"; }\nconsole.log(obtenerCodigoSecreto());`,
    php: `<?php\nfunction obtenerCodigoSecreto() { return "ADM-2026"; }\necho obtenerCodigoSecreto() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerCodigoSecreto()\n    res <- "ADM-2026"\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerCodigoSecreto()\nFinAlgoritmo`
  },
  30: {
    python: `def obtenerOpcionPorDefecto():\n    return 1\n\nprint(obtenerOpcionPorDefecto())`,
    java: `public class Main {\n    public static int obtenerOpcionPorDefecto() { return 1; }\n    public static void main(String[] args) { System.out.println(obtenerOpcionPorDefecto()); }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerOpcionPorDefecto() { return 1; }\n    static void Main() { Console.WriteLine(ObtenerOpcionPorDefecto()); }\n}`,
    cpp: `#include <iostream>\nint obtenerOpcionPorDefecto() { return 1; }\nint main() { std::cout << obtenerOpcionPorDefecto() << "\\n"; return 0; }`,
    javascript: `function obtenerOpcionPorDefecto() { return 1; }\nconsole.log(obtenerOpcionPorDefecto());`,
    php: `<?php\nfunction obtenerOpcionPorDefecto() { return 1; }\necho obtenerOpcionPorDefecto() . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerOpcionPorDefecto()\n    res <- 1\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerOpcionPorDefecto()\nFinAlgoritmo`
  },
  31: {
    python: `def sumar(a, b):\n    return a + b\n\nprint(sumar(10, 15))`,
    java: `public class Main {\n    public static int sumar(int a, int b) { return a + b; }\n    public static void main(String[] args) { System.out.println(sumar(10, 15)); }\n}`,
    csharp: `using System;\nclass Program {\n    static int Sumar(int a, int b) { return a + b; }\n    static void Main() { Console.WriteLine(Sumar(10, 15)); }\n}`,
    cpp: `#include <iostream>\nint sumar(int a, int b) { return a + b; }\nint main() { std::cout << sumar(10, 15) << "\\n"; return 0; }`,
    javascript: `function sumar(a, b) { return a + b; }\nconsole.log(sumar(10, 15));`,
    php: `<?php\nfunction sumar($a, $b) { return $a + $b; }\necho sumar(10, 15) . "\\n";\n?>`,
    pseint: `Funcion res <- sumar(a, b)\n    res <- a + b\nFinFuncion\nAlgoritmo Principal\n    Escribir sumar(10, 15)\nFinAlgoritmo`
  },
  32: {
    python: `def restar(a, b):\n    return a - b\n\nprint(restar(50, 20))`,
    java: `public class Main {\n    public static int restar(int a, int b) { return a - b; }\n    public static void main(String[] args) { System.out.println(restar(50, 20)); }\n}`,
    csharp: `using System;\nclass Program {\n    static int Restar(int a, int b) { return a - b; }\n    static void Main() { Console.WriteLine(Restar(50, 20)); }\n}`,
    cpp: `#include <iostream>\nint restar(int a, int b) { return a - b; }\nint main() { std::cout << restar(50, 20) << "\\n"; return 0; }`,
    javascript: `function restar(a, b) { return a - b; }\nconsole.log(restar(50, 20));`,
    php: `<?php\nfunction restar($a, $b) { return $a - $b; }\necho restar(50, 20) . "\\n";\n?>`,
    pseint: `Funcion res <- restar(a, b)\n    res <- a - b\nFinFuncion\nAlgoritmo Principal\n    Escribir restar(50, 20)\nFinAlgoritmo`
  },
  33: {
    python: `def multiplicar(a, b):\n    return a * b\n\nprint(multiplicar(4, 5))`,
    java: `public class Main {\n    public static int multiplicar(int a, int b) { return a * b; }\n    public static void main(String[] args) { System.out.println(multiplicar(4, 5)); }\n}`,
    csharp: `using System;\nclass Program {\n    static int Multiplicar(int a, int b) { return a * b; }\n    static void Main() { Console.WriteLine(Multiplicar(4, 5)); }\n}`,
    cpp: `#include <iostream>\nint multiplicar(int a, int b) { return a * b; }\nint main() { std::cout << multiplicar(4, 5) << "\\n"; return 0; }`,
    javascript: `function multiplicar(a, b) { return a * b; }\nconsole.log(multiplicar(4, 5));`,
    php: `<?php\nfunction multiplicar($a, $b) { return $a * $b; }\necho multiplicar(4, 5) . "\\n";\n?>`,
    pseint: `Funcion res <- multiplicar(a, b)\n    res <- a * b\nFinFuncion\nAlgoritmo Principal\n    Escribir multiplicar(4, 5)\nFinAlgoritmo`
  },
  34: {
    python: `def dividir(a, b):\n    if b == 0:\n        return 0\n    return a / b\n\nprint(dividir(10, 2))\nprint(dividir(10, 0))`,
    java: `public class Main {\n    public static double dividir(double a, double b) {\n        if (b == 0) return 0;\n        return a / b;\n    }\n    public static void main(String[] args) {\n        System.out.println(dividir(10, 2));\n        System.out.println(dividir(10, 0));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static double Dividir(double a, double b) {\n        if (b == 0) return 0;\n        return a / b;\n    }\n    static void Main() {\n        Console.WriteLine(Dividir(10, 2));\n        Console.WriteLine(Dividir(10, 0));\n    }\n}`,
    cpp: `#include <iostream>\ndouble dividir(double a, double b) {\n    if (b == 0) return 0;\n    return a / b;\n}\nint main() {\n    std::cout << dividir(10, 2) << "\\n";\n    std::cout << dividir(10, 0) << "\\n";\n    return 0;\n}`,
    javascript: `function dividir(a, b) {\n    if (b === 0) return 0;\n    return a / b;\n}\nconsole.log(dividir(10, 2));\nconsole.log(dividir(10, 0));`,
    php: `<?php\nfunction dividir($a, $b) {\n    if ($b == 0) return 0;\n    return $a / $b;\n}\necho dividir(10, 2) . "\\n";\necho dividir(10, 0) . "\\n";\n?>`,
    pseint: `Funcion res <- dividir(a, b)\n    Si b = 0 Entonces\n        res <- 0\n    Sino\n        res <- a / b\n    FinSi\nFinFuncion\nAlgoritmo Principal\n    Escribir dividir(10, 2)\n    Escribir dividir(10, 0)\nFinAlgoritmo`
  },
  35: {
    python: `def calcularPromedio(n1, n2, n3):\n    return (n1 + n2 + n3) / 3\n\nprint(calcularPromedio(6.0, 5.0, 7.0))`,
    java: `public class Main {\n    public static double calcularPromedio(double n1, double n2, double n3) {\n        return (n1 + n2 + n3) / 3.0;\n    }\n    public static void main(String[] args) { System.out.println(calcularPromedio(6.0, 5.0, 7.0)); }\n}`,
    csharp: `using System;\nclass Program {\n    static double CalcularPromedio(double n1, double n2, double n3) {\n        return (n1 + n2 + n3) / 3.0;\n    }\n    static void Main() { Console.WriteLine(CalcularPromedio(6.0, 5.0, 7.0)); }\n}`,
    cpp: `#include <iostream>\ndouble calcularPromedio(double n1, double n2, double n3) {\n    return (n1 + n2 + n3) / 3.0;\n}\nint main() { std::cout << calcularPromedio(6.0, 5.0, 7.0) << "\\n"; return 0; }`,
    javascript: `function calcularPromedio(n1, n2, n3) {\n    return (n1 + n2 + n3) / 3;\n}\nconsole.log(calcularPromedio(6.0, 5.0, 7.0));`,
    php: `<?php\nfunction calcularPromedio($n1, $n2, $n3) {\n    return ($n1 + $n2 + $n3) / 3;\n}\necho calcularPromedio(6.0, 5.0, 7.0) . "\\n";\n?>`,
    pseint: `Funcion res <- calcularPromedio(n1, n2, n3)\n    res <- (n1 + n2 + n3) / 3\nFinFuncion\nAlgoritmo Principal\n    Escribir calcularPromedio(6.0, 5.0, 7.0)\nFinAlgoritmo`
  },
  36: {
    python: `def obtenerMayor(a, b):\n    return a if a > b else b\n\nprint(obtenerMayor(15, 42))`,
    java: `public class Main {\n    public static int obtenerMayor(int a, int b) {\n        return (a > b) ? a : b;\n    }\n    public static void main(String[] args) { System.out.println(obtenerMayor(15, 42)); }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerMayor(int a, int b) {\n        return (a > b) ? a : b;\n    }\n    static void Main() { Console.WriteLine(ObtenerMayor(15, 42)); }\n}`,
    cpp: `#include <iostream>\nint obtenerMayor(int a, int b) {\n    return (a > b) ? a : b;\n}\nint main() { std::cout << obtenerMayor(15, 42) << "\\n"; return 0; }`,
    javascript: `function obtenerMayor(a, b) {\n    return a > b ? a : b;\n}\nconsole.log(obtenerMayor(15, 42));`,
    php: `<?php\nfunction obtenerMayor($a, $b) {\n    return ($a > $b) ? $a : $b;\n}\necho obtenerMayor(15, 42) . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerMayor(a, b)\n    Si a > b Entonces\n        res <- a\n    Sino\n        res <- b\n    FinSi\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerMayor(15, 42)\nFinAlgoritmo`
  },
  37: {
    python: `def obtenerMenor(a, b):\n    return a if a < b else b\n\nprint(obtenerMenor(8, 3))`,
    java: `public class Main {\n    public static int obtenerMenor(int a, int b) {\n        return (a < b) ? a : b;\n    }\n    public static void main(String[] args) { System.out.println(obtenerMenor(8, 3)); }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerMenor(int a, int b) {\n        return (a < b) ? a : b;\n    }\n    static void Main() { Console.WriteLine(ObtenerMenor(8, 3)); }\n}`,
    cpp: `#include <iostream>\nint obtenerMenor(int a, int b) {\n    return (a < b) ? a : b;\n}\nint main() { std::cout << obtenerMenor(8, 3) << "\\n"; return 0; }`,
    javascript: `function obtenerMenor(a, b) {\n    return a < b ? a : b;\n}\nconsole.log(obtenerMenor(8, 3));`,
    php: `<?php\nfunction obtenerMenor($a, $b) {\n    return ($a < $b) ? $a : $b;\n}\necho obtenerMenor(8, 3) . "\\n";\n?>`,
    pseint: `Funcion res <- obtenerMenor(a, b)\n    Si a < b Entonces\n        res <- a\n    Sino\n        res <- b\n    FinSi\nFinFuncion\nAlgoritmo Principal\n    Escribir obtenerMenor(8, 3)\nFinAlgoritmo`
  },
  38: {
    python: `def esPar(numero):\n    return numero % 2 == 0\n\nprint(esPar(4))\nprint(esPar(7))`,
    java: `public class Main {\n    public static boolean esPar(int numero) {\n        return numero % 2 == 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPar(4));\n        System.out.println(esPar(7));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static bool EsPar(int numero) {\n        return numero % 2 == 0;\n    }\n    static void Main() {\n        Console.WriteLine(EsPar(4));\n        Console.WriteLine(EsPar(7));\n    }\n}`,
    cpp: `#include <iostream>\nbool esPar(int numero) {\n    return numero % 2 == 0;\n}\nint main() {\n    std::cout << std::boolalpha << esPar(4) << "\\n";\n    std::cout << std::boolalpha << esPar(7) << "\\n";\n    return 0;\n}`,
    javascript: `function esPar(numero) {\n    return numero % 2 === 0;\n}\nconsole.log(esPar(4));\nconsole.log(esPar(7));`,
    php: `<?php\nfunction esPar($numero) {\n    return $numero % 2 == 0;\n}\necho esPar(4) ? "true\\n" : "false\\n";\necho esPar(7) ? "true\\n" : "false\\n";\n?>`,
    pseint: `Funcion res <- esPar(numero)\n    res <- (numero MOD 2 = 0)\nFinFuncion\nAlgoritmo Principal\n    Escribir esPar(4)\n    Escribir esPar(7)\nFinAlgoritmo`
  },
  39: {
    python: `def esPositivo(numero):\n    return numero > 0\n\nprint(esPositivo(10))\nprint(esPositivo(-5))`,
    java: `public class Main {\n    public static boolean esPositivo(int numero) {\n        return numero > 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(esPositivo(10));\n        System.out.println(esPositivo(-5));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static bool EsPositivo(int numero) {\n        return numero > 0;\n    }\n    static void Main() {\n        Console.WriteLine(EsPositivo(10));\n        Console.WriteLine(EsPositivo(-5));\n    }\n}`,
    cpp: `#include <iostream>\nbool esPositivo(int numero) {\n    return numero > 0;\n}\nint main() {\n    std::cout << std::boolalpha << esPositivo(10) << "\\n";\n    std::cout << std::boolalpha << esPositivo(-5) << "\\n";\n    return 0;\n}`,
    javascript: `function esPositivo(numero) {\n    return numero > 0;\n}\nconsole.log(esPositivo(10));\nconsole.log(esPositivo(-5));`,
    php: `<?php\nfunction esPositivo($numero) {\n    return $numero > 0;\n}\necho esPositivo(10) ? "true\\n" : "false\\n";\necho esPositivo(-5) ? "true\\n" : "false\\n";\n?>`,
    pseint: `Funcion res <- esPositivo(numero)\n    res <- (numero > 0)\nFinFuncion\nAlgoritmo Principal\n    Escribir esPositivo(10)\n    Escribir esPositivo(-5)\nFinAlgoritmo`
  },
  40: {
    python: `def convertirCelsiusAFahrenheit(celsius):\n    return (celsius * 9 / 5) + 32\n\nprint(convertirCelsiusAFahrenheit(0))\nprint(convertirCelsiusAFahrenheit(100))`,
    java: `public class Main {\n    public static double convertirCelsiusAFahrenheit(double celsius) {\n        return (celsius * 9.0 / 5.0) + 32.0;\n    }\n    public static void main(String[] args) {\n        System.out.println(convertirCelsiusAFahrenheit(0));\n        System.out.println(convertirCelsiusAFahrenheit(100));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static double ConvertirCelsiusAFahrenheit(double celsius) {\n        return (celsius * 9.0 / 5.0) + 32.0;\n    }\n    static void Main() {\n        Console.WriteLine(ConvertirCelsiusAFahrenheit(0));\n        Console.WriteLine(ConvertirCelsiusAFahrenheit(100));\n    }\n}`,
    cpp: `#include <iostream>\ndouble convertirCelsiusAFahrenheit(double celsius) {\n    return (celsius * 9.0 / 5.0) + 32.0;\n}\nint main() {\n    std::cout << convertirCelsiusAFahrenheit(0) << "\\n";\n    std::cout << convertirCelsiusAFahrenheit(100) << "\\n";\n    return 0;\n}`,
    javascript: `function convertirCelsiusAFahrenheit(celsius) {\n    return (celsius * 9 / 5) + 32;\n}\nconsole.log(convertirCelsiusAFahrenheit(0));\nconsole.log(convertirCelsiusAFahrenheit(100));`,
    php: `<?php\nfunction convertirCelsiusAFahrenheit($celsius) {\n    return ($celsius * 9 / 5) + 32;\n}\necho convertirCelsiusAFahrenheit(0) . "\\n";\necho convertirCelsiusAFahrenheit(100) . "\\n";\n?>`,
    pseint: `Funcion res <- convertirCelsiusAFahrenheit(celsius)\n    res <- (celsius * 9 / 5) + 32\nFinFuncion\nAlgoritmo Principal\n    Escribir convertirCelsiusAFahrenheit(0)\n    Escribir convertirCelsiusAFahrenheit(100)\nFinAlgoritmo`
  },
  41: {
    python: `def calcularDescuento(monto, porcentaje):\n    return monto * (porcentaje / 100)\n\nprint(calcularDescuento(10000, 20))`,
    java: `public class Main {\n    public static double calcularDescuento(double monto, double porcentaje) {\n        return monto * (porcentaje / 100.0);\n    }\n    public static void main(String[] args) { System.out.println(calcularDescuento(10000, 20)); }\n}`,
    csharp: `using System;\nclass Program {\n    static double CalcularDescuento(double monto, double porcentaje) {\n        return monto * (porcentaje / 100.0);\n    }\n    static void Main() { Console.WriteLine(CalcularDescuento(10000, 20)); }\n}`,
    cpp: `#include <iostream>\ndouble calcularDescuento(double monto, double porcentaje) {\n    return monto * (porcentaje / 100.0);\n}\nint main() { std::cout << calcularDescuento(10000, 20) << "\\n"; return 0; }`,
    javascript: `function calcularDescuento(monto, porcentaje) {\n    return monto * (porcentaje / 100);\n}\nconsole.log(calcularDescuento(10000, 20));`,
    php: `<?php\nfunction calcularDescuento($monto, $porcentaje) {\n    return $monto * ($porcentaje / 100);\n}\necho calcularDescuento(10000, 20) . "\\n";\n?>`,
    pseint: `Funcion res <- calcularDescuento(monto, porcentaje)\n    res <- monto * (porcentaje / 100)\nFinFuncion\nAlgoritmo Principal\n    Escribir calcularDescuento(10000, 20)\nFinAlgoritmo`
  },
  42: {
    python: `def calcularTotalConIVA(montoNeto):\n    return montoNeto * 1.19\n\nprint(calcularTotalConIVA(1000))`,
    java: `public class Main {\n    public static double calcularTotalConIVA(double montoNeto) {\n        return montoNeto * 1.19;\n    }\n    public static void main(String[] args) { System.out.println(calcularTotalConIVA(1000)); }\n}`,
    csharp: `using System;\nclass Program {\n    static double CalcularTotalConIVA(double montoNeto) {\n        return montoNeto * 1.19;\n    }\n    static void Main() { Console.WriteLine(CalcularTotalConIVA(1000)); }\n}`,
    cpp: `#include <iostream>\ndouble calcularTotalConIVA(double montoNeto) {\n    return montoNeto * 1.19;\n}\nint main() { std::cout << calcularTotalConIVA(1000) << "\\n"; return 0; }`,
    javascript: `function calcularTotalConIVA(montoNeto) {\n    return montoNeto * 1.19;\n}\nconsole.log(calcularTotalConIVA(1000));`,
    php: `<?php\nfunction calcularTotalConIVA($montoNeto) {\n    return $montoNeto * 1.19;\n}\necho calcularTotalConIVA(1000) . "\\n";\n?>`,
    pseint: `Funcion res <- calcularTotalConIVA(montoNeto)\n    res <- montoNeto * 1.19\nFinFuncion\nAlgoritmo Principal\n    Escribir calcularTotalConIVA(1000)\nFinAlgoritmo`
  },
  43: {
    python: `def esMayorDeEdad(edad):\n    return edad >= 18\n\nprint(esMayorDeEdad(17))\nprint(esMayorDeEdad(18))`,
    java: `public class Main {\n    public static boolean esMayorDeEdad(int edad) {\n        return edad >= 18;\n    }\n    public static void main(String[] args) {\n        System.out.println(esMayorDeEdad(17));\n        System.out.println(esMayorDeEdad(18));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static bool EsMayorDeEdad(int edad) {\n        return edad >= 18;\n    }\n    static void Main() {\n        Console.WriteLine(EsMayorDeEdad(17));\n        Console.WriteLine(EsMayorDeEdad(18));\n    }\n}`,
    cpp: `#include <iostream>\nbool esMayorDeEdad(int edad) {\n    return edad >= 18;\n}\nint main() {\n    std::cout << std::boolalpha << esMayorDeEdad(17) << "\\n";\n    std::cout << std::boolalpha << esMayorDeEdad(18) << "\\n";\n    return 0;\n}`,
    javascript: `function esMayorDeEdad(edad) {\n    return edad >= 18;\n}\nconsole.log(esMayorDeEdad(17));\nconsole.log(esMayorDeEdad(18));`,
    php: `<?php\nfunction esMayorDeEdad($edad) {\n    return $edad >= 18;\n}\necho esMayorDeEdad(17) ? "false\\n" : "true\\n";\necho esMayorDeEdad(18) ? "true\\n" : "false\\n";\n?>`,
    pseint: `Funcion res <- esMayorDeEdad(edad)\n    res <- (edad >= 18)\nFinFuncion\nAlgoritmo Principal\n    Escribir esMayorDeEdad(17)\n    Escribir esMayorDeEdad(18)\nFinAlgoritmo`
  },
  44: {
    python: `def esClaveSegura(clave):\n    return len(clave) >= 8\n\nprint(esClaveSegura("12345"))\nprint(esClaveSegura("secret123"))`,
    java: `public class Main {\n    public static boolean esClaveSegura(String clave) {\n        return clave != null && clave.length() >= 8;\n    }\n    public static void main(String[] args) {\n        System.out.println(esClaveSegura("12345"));\n        System.out.println(esClaveSegura("secret123"));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static bool EsClaveSegura(string clave) {\n        return clave != null && clave.Length >= 8;\n    }\n    static void Main() {\n        Console.WriteLine(EsClaveSegura("12345"));\n        Console.WriteLine(EsClaveSegura("secret123"));\n    }\n}`,
    cpp: `#include <iostream>\n#include <string>\nbool esClaveSegura(std::string clave) {\n    return clave.length() >= 8;\n}\nint main() {\n    std::cout << std::boolalpha << esClaveSegura("12345") << "\\n";\n    std::cout << std::boolalpha << esClaveSegura("secret123") << "\\n";\n    return 0;\n}`,
    javascript: `function esClaveSegura(clave) {\n    return clave && clave.length >= 8;\n}\nconsole.log(esClaveSegura("12345"));\nconsole.log(esClaveSegura("secret123"));`,
    php: `<?php\nfunction esClaveSegura($clave) {\n    return strlen($clave) >= 8;\n}\necho esClaveSegura("12345") ? "true\\n" : "false\\n";\necho esClaveSegura("secret123") ? "true\\n" : "false\\n";\n?>`,
    pseint: `Funcion res <- esClaveSegura(clave)\n    res <- (Longitud(clave) >= 8)\nFinFuncion\nAlgoritmo Principal\n    Escribir esClaveSegura("12345")\n    Escribir esClaveSegura("secret123")\nFinAlgoritmo`
  },
  45: {
    python: `def buscarEnArreglo(arreglo, valor):\n    for elem in arreglo:\n        if elem == valor:\n            return True\n    return False\n\nprint(buscarEnArreglo([1, 5, 9], 5))\nprint(buscarEnArreglo([1, 5, 9], 7))`,
    java: `public class Main {\n    public static boolean buscarEnArreglo(int[] arreglo, int valor) {\n        for (int elem : arreglo) {\n            if (elem == valor) return true;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        int[] nums = {1, 5, 9};\n        System.out.println(buscarEnArreglo(nums, 5));\n        System.out.println(buscarEnArreglo(nums, 7));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static bool BuscarEnArreglo(int[] arreglo, int valor) {\n        foreach (int elem in arreglo) {\n            if (elem == valor) return true;\n        }\n        return false;\n    }\n    static void Main() {\n        int[] nums = {1, 5, 9};\n        Console.WriteLine(BuscarEnArreglo(nums, 5));\n        Console.WriteLine(BuscarEnArreglo(nums, 7));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nbool buscarEnArreglo(const std::vector<int>& arreglo, int valor) {\n    for (int elem : arreglo) {\n        if (elem == valor) return true;\n    }\n    return false;\n}\nint main() {\n    std::vector<int> nums = {1, 5, 9};\n    std::cout << std::boolalpha << buscarEnArreglo(nums, 5) << "\\n";\n    std::cout << std::boolalpha << buscarEnArreglo(nums, 7) << "\\n";\n    return 0;\n}`,
    javascript: `function buscarEnArreglo(arreglo, valor) {\n    for (let elem of arreglo) {\n        if (elem === valor) return true;\n    }\n    return false;\n}\nconsole.log(buscarEnArreglo([1, 5, 9], 5));\nconsole.log(buscarEnArreglo([1, 5, 9], 7));`,
    php: `<?php\nfunction buscarEnArreglo($arreglo, $valor) {\n    foreach ($arreglo as $elem) {\n        if ($elem == $valor) return true;\n    }\n    return false;\n}\necho buscarEnArreglo([1, 5, 9], 5) ? "true\\n" : "false\\n";\necho buscarEnArreglo([1, 5, 9], 7) ? "true\\n" : "false\\n";\n?>`,
    pseint: `Funcion res <- buscarEnArreglo(arreglo, tam, valor)\n    res <- Falso\n    Para i <- 1 Hasta tam Hacer\n        Si arreglo[i] = valor Entonces\n            res <- Verdadero\n        FinSi\n    FinPara\nFinFuncion\nAlgoritmo Principal\n    Dimension nums[3]\n    nums[1] <- 1; nums[2] <- 5; nums[3] <- 9\n    Escribir buscarEnArreglo(nums, 3, 5)\nFinAlgoritmo`
  },
  46: {
    python: `def contarParesArreglo(arreglo):\n    contador = 0\n    for elem in arreglo:\n        if elem % 2 == 0:\n            contador += 1\n    return contador\n\nprint(contarParesArreglo([2, 3, 4, 6]))`,
    java: `public class Main {\n    public static int contarParesArreglo(int[] arreglo) {\n        int contador = 0;\n        for (int elem : arreglo) {\n            if (elem % 2 == 0) contador++;\n        }\n        return contador;\n    }\n    public static void main(String[] args) {\n        System.out.println(contarParesArreglo(new int[]{2, 3, 4, 6}));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static int ContarParesArreglo(int[] arreglo) {\n        int contador = 0;\n        foreach (int elem in arreglo) {\n            if (elem % 2 == 0) contador++;\n        }\n        return contador;\n    }\n    static void Main() {\n        Console.WriteLine(ContarParesArreglo(new int[]{2, 3, 4, 6}));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nint contarParesArreglo(const std::vector<int>& arreglo) {\n    int contador = 0;\n    for (int elem : arreglo) {\n        if (elem % 2 == 0) contador++;\n    }\n    return contador;\n}\nint main() {\n    std::cout << contarParesArreglo({2, 3, 4, 6}) << "\\n";\n    return 0;\n}`,
    javascript: `function contarParesArreglo(arreglo) {\n    let contador = 0;\n    for (let elem of arreglo) {\n        if (elem % 2 === 0) contador++;\n    }\n    return contador;\n}\nconsole.log(contarParesArreglo([2, 3, 4, 6]));`,
    php: `<?php\nfunction contarParesArreglo($arreglo) {\n    $contador = 0;\n    foreach ($arreglo as $elem) {\n        if ($elem % 2 == 0) $contador++;\n    }\n    return $contador;\n}\necho contarParesArreglo([2, 3, 4, 6]) . "\\n";\n?>`,
    pseint: `Funcion c <- contarParesArreglo(arreglo, tam)\n    c <- 0\n    Para i <- 1 Hasta tam Hacer\n        Si arreglo[i] MOD 2 = 0 Entonces\n            c <- c + 1\n        FinSi\n    FinPara\nFinFuncion\nAlgoritmo Principal\n    Dimension nums[4]\n    nums[1] <- 2; nums[2] <- 3; nums[3] <- 4; nums[4] <- 6\n    Escribir contarParesArreglo(nums, 4)\nFinAlgoritmo`
  },
  47: {
    python: `def obtenerMayorArreglo(arreglo):\n    mayor = arreglo[0]\n    for elem in arreglo:\n        if elem > mayor:\n            mayor = elem\n    return mayor\n\nprint(obtenerMayorArreglo([10, 45, 3, 99, 12]))`,
    java: `public class Main {\n    public static int obtenerMayorArreglo(int[] arreglo) {\n        int mayor = arreglo[0];\n        for (int elem : arreglo) {\n            if (elem > mayor) mayor = elem;\n        }\n        return mayor;\n    }\n    public static void main(String[] args) {\n        System.out.println(obtenerMayorArreglo(new int[]{10, 45, 3, 99, 12}));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerMayorArreglo(int[] arreglo) {\n        int mayor = arreglo[0];\n        foreach (int elem in arreglo) {\n            if (elem > mayor) mayor = elem;\n        }\n        return mayor;\n    }\n    static void Main() {\n        Console.WriteLine(ObtenerMayorArreglo(new int[]{10, 45, 3, 99, 12}));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nint obtenerMayorArreglo(const std::vector<int>& arreglo) {\n    int mayor = arreglo[0];\n    for (int elem : arreglo) {\n        if (elem > mayor) mayor = elem;\n    }\n    return mayor;\n}\nint main() {\n    std::cout << obtenerMayorArreglo({10, 45, 3, 99, 12}) << "\\n";\n    return 0;\n}`,
    javascript: `function obtenerMayorArreglo(arreglo) {\n    let mayor = arreglo[0];\n    for (let elem of arreglo) {\n        if (elem > mayor) mayor = elem;\n    }\n    return mayor;\n}\nconsole.log(obtenerMayorArreglo([10, 45, 3, 99, 12]));`,
    php: `<?php\nfunction obtenerMayorArreglo($arreglo) {\n    $mayor = $arreglo[0];\n    foreach ($arreglo as $elem) {\n        if ($elem > $mayor) $mayor = $elem;\n    }\n    return $mayor;\n}\necho obtenerMayorArreglo([10, 45, 3, 99, 12]) . "\\n";\n?>`,
    pseint: `Funcion m <- obtenerMayorArreglo(arreglo, tam)\n    m <- arreglo[1]\n    Para i <- 1 Hasta tam Hacer\n        Si arreglo[i] > m Entonces\n            m <- arreglo[i]\n        FinSi\n    FinPara\nFinFuncion\nAlgoritmo Principal\n    Dimension nums[5]\n    nums[1] <- 10; nums[2] <- 45; nums[3] <- 3; nums[4] <- 99; nums[5] <- 12\n    Escribir obtenerMayorArreglo(nums, 5)\nFinAlgoritmo`
  },
  48: {
    python: `def obtenerMenorArreglo(arreglo):\n    menor = arreglo[0]\n    for elem in arreglo:\n        if elem < menor:\n            menor = elem\n    return menor\n\nprint(obtenerMenorArreglo([7, 2, 19, -4, 5]))`,
    java: `public class Main {\n    public static int obtenerMenorArreglo(int[] arreglo) {\n        int menor = arreglo[0];\n        for (int elem : arreglo) {\n            if (elem < menor) menor = elem;\n        }\n        return menor;\n    }\n    public static void main(String[] args) {\n        System.out.println(obtenerMenorArreglo(new int[]{7, 2, 19, -4, 5}));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static int ObtenerMenorArreglo(int[] arreglo) {\n        int menor = arreglo[0];\n        foreach (int elem in arreglo) {\n            if (elem < menor) menor = elem;\n        }\n        return menor;\n    }\n    static void Main() {\n        Console.WriteLine(ObtenerMenorArreglo(new int[]{7, 2, 19, -4, 5}));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nint obtenerMenorArreglo(const std::vector<int>& arreglo) {\n    int menor = arreglo[0];\n    for (int elem : arreglo) {\n        if (elem < menor) menor = elem;\n    }\n    return menor;\n}\nint main() {\n    std::cout << obtenerMenorArreglo({7, 2, 19, -4, 5}) << "\\n";\n    return 0;\n}`,
    javascript: `function obtenerMenorArreglo(arreglo) {\n    let menor = arreglo[0];\n    for (let elem of arreglo) {\n        if (elem < menor) menor = elem;\n    }\n    return menor;\n}\nconsole.log(obtenerMenorArreglo([7, 2, 19, -4, 5]));`,
    php: `<?php\nfunction obtenerMenorArreglo($arreglo) {\n    $menor = $arreglo[0];\n    foreach ($arreglo as $elem) {\n        if ($elem < $menor) $menor = $elem;\n    }\n    return $menor;\n}\necho obtenerMenorArreglo([7, 2, 19, -4, 5]) . "\\n";\n?>`,
    pseint: `Funcion m <- obtenerMenorArreglo(arreglo, tam)\n    m <- arreglo[1]\n    Para i <- 1 Hasta tam Hacer\n        Si arreglo[i] < m Entonces\n            m <- arreglo[i]\n        FinSi\n    FinPara\nFinFuncion\nAlgoritmo Principal\n    Dimension nums[5]\n    nums[1] <- 7; nums[2] <- 2; nums[3] <- 19; nums[4] <- -4; nums[5] <- 5\n    Escribir obtenerMenorArreglo(nums, 5)\nFinAlgoritmo`
  },
  49: {
    python: `def calcularPromedioArreglo(arreglo):\n    suma = 0\n    for elem in arreglo:\n        suma += elem\n    return suma / len(arreglo)\n\nprint(calcularPromedioArreglo([10, 20, 30]))`,
    java: `public class Main {\n    public static double calcularPromedioArreglo(double[] arreglo) {\n        double suma = 0;\n        for (double elem : arreglo) {\n            suma += elem;\n        }\n        return suma / arreglo.length;\n    }\n    public static void main(String[] args) {\n        System.out.println(calcularPromedioArreglo(new double[]{10, 20, 30}));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static double CalcularPromedioArreglo(double[] arreglo) {\n        double suma = 0;\n        foreach (double elem in arreglo) {\n            suma += elem;\n        }\n        return suma / arreglo.Length;\n    }\n    static void Main() {\n        Console.WriteLine(CalcularPromedioArreglo(new double[]{10, 20, 30}));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\ndouble calcularPromedioArreglo(const std::vector<double>& arreglo) {\n    double suma = 0;\n    for (double elem : arreglo) suma += elem;\n    return suma / arreglo.size();\n}\nint main() {\n    std::cout << calcularPromedioArreglo({10, 20, 30}) << "\\n";\n    return 0;\n}`,
    javascript: `function calcularPromedioArreglo(arreglo) {\n    let suma = 0;\n    for (let elem of arreglo) suma += elem;\n    return suma / arreglo.length;\n}\nconsole.log(calcularPromedioArreglo([10, 20, 30]));`,
    php: `<?php\nfunction calcularPromedioArreglo($arreglo) {\n    $suma = array_sum($arreglo);\n    return $suma / count($arreglo);\n}\necho calcularPromedioArreglo([10, 20, 30]) . "\\n";\n?>`,
    pseint: `Funcion p <- calcularPromedioArreglo(arreglo, tam)\n    suma <- 0\n    Para i <- 1 Hasta tam Hacer\n        suma <- suma + arreglo[i]\n    FinPara\n    p <- suma / tam\nFinFuncion\nAlgoritmo Principal\n    Dimension nums[3]\n    nums[1] <- 10; nums[2] <- 20; nums[3] <- 30\n    Escribir calcularPromedioArreglo(nums, 3)\nFinAlgoritmo`
  },
  50: {
    python: `def filtrarMayores(arreglo, umbral):\n    resultado = []\n    for elem in arreglo:\n        if elem > umbral:\n            resultado.append(elem)\n    return resultado\n\nprint(filtrarMayores([5, 12, 18, 3], 10))`,
    java: `import java.util.ArrayList;\nimport java.util.List;\npublic class Main {\n    public static List<Integer> filtrarMayores(int[] arreglo, int umbral) {\n        List<Integer> res = new ArrayList<>();\n        for (int elem : arreglo) {\n            if (elem > umbral) res.add(elem);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(filtrarMayores(new int[]{5, 12, 18, 3}, 10));\n    }\n}`,
    csharp: `using System;\nusing System.Collections.Generic;\nclass Program {\n    static List<int> FiltrarMayores(int[] arreglo, int umbral) {\n        List<int> res = new List<int>();\n        foreach (int elem in arreglo) {\n            if (elem > umbral) res.Add(elem);\n        }\n        return res;\n    }\n    static void Main() {\n        var lista = FiltrarMayores(new int[]{5, 12, 18, 3}, 10);\n        Console.WriteLine(string.Join(", ", lista));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nstd::vector<int> filtrarMayores(const std::vector<int>& arreglo, int umbral) {\n    std::vector<int> res;\n    for (int elem : arreglo) {\n        if (elem > umbral) res.push_back(elem);\n    }\n    return res;\n}\nint main() {\n    auto res = filtrarMayores({5, 12, 18, 3}, 10);\n    for (int x : res) std::cout << x << " ";\n    std::cout << "\\n";\n    return 0;\n}`,
    javascript: `function filtrarMayores(arreglo, umbral) {\n    return arreglo.filter(elem => elem > umbral);\n}\nconsole.log(filtrarMayores([5, 12, 18, 3], 10));`,
    php: `<?php\nfunction filtrarMayores($arreglo, $umbral) {\n    return array_filter($arreglo, function($elem) use ($umbral) {\n        return $elem > $umbral;\n    });\n}\nprint_r(filtrarMayores([5, 12, 18, 3], 10));\n?>`,
    pseint: `SubProceso filtrarMayores(arreglo, tam, umbral)\n    Escribir "Mayores a ", umbral, ":"\n    Para i <- 1 Hasta tam Hacer\n        Si arreglo[i] > umbral Entonces\n            Escribir arreglo[i]\n        FinSi\n    FinPara\nFinSubProceso\nAlgoritmo Principal\n    Dimension nums[4]\n    nums[1] <- 5; nums[2] <- 12; nums[3] <- 18; nums[4] <- 3\n    filtrarMayores(nums, 4, 10)\nFinAlgoritmo`
  }
};
