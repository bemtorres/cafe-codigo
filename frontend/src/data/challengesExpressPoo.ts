import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressPooExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 501 al 510 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 501,
    title: 'Definición de Clase Básica',
    statement: 'Completa la palabra clave class para definir la clase Persona.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'La palabra clave es class.',
    explanation: 'Una clase es una plantilla o molde que define los atributos y comportamientos de los objetos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\n___ Persona {\npublic:\n    std::string nombre = "Ana";\n};\n\nint main() {\n    Persona p;\n    std::cout << p.nombre << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nclass Persona {\npublic:\n    std::string nombre = "Ana";\n};\n\nint main() {\n    Persona p;\n    std::cout << p.nombre << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['class']
      },
      python: {
        starterCode: `___ Persona:\n    nombre = "Ana"\n\np = Persona()\nprint(p.nombre)`,
        solutionCode: `class Persona:\n    nombre = "Ana"\n\np = Persona()\nprint(p.nombre)`,
        acceptedKeywords: ['class']
      },
      javascript: {
        starterCode: `___ Persona {\n    constructor() {\n        this.nombre = "Ana";\n    }\n}\nlet p = new Persona();\nconsole.log(p.nombre);`,
        solutionCode: `class Persona {\n    constructor() {\n        this.nombre = "Ana";\n    }\n}\nlet p = new Persona();\nconsole.log(p.nombre);`,
        acceptedKeywords: ['class']
      },
      java: {
        starterCode: `___ Persona {\n    String nombre = "Ana";\n}\npublic class Main {\n    public static void main(String[] args) {\n        Persona p = new Persona();\n        System.out.println(p.nombre);\n    }\n}`,
        solutionCode: `class Persona {\n    String nombre = "Ana";\n}\npublic class Main {\n    public static void main(String[] args) {\n        Persona p = new Persona();\n        System.out.println(p.nombre);\n    }\n}`,
        acceptedKeywords: ['class']
      }
    }
  },
  {
    id: 502,
    title: 'Instanciación de Objeto (Operador New)',
    statement: 'Corrige la creación de la instancia de la clase Coche usando el constructor.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Instancia con Coche() (o new Coche() en JS/Java).',
    explanation: 'Instanciar consiste en reservar memoria y crear un objeto concreto a partir de su clase.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Coche {\npublic:\n    int ruedas = 4;\n};\n\nint main() {\n    Coche c;\n    std::cout << c.ruedas << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Coche {\npublic:\n    int ruedas = 4;\n};\n\nint main() {\n    Coche c;\n    std::cout << c.ruedas << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Coche:\n    ruedas = 4\n\nc = Coche # BUG: falta llamar al constructor Coche()\nprint(c.ruedas)`,
        solutionCode: `class Coche:\n    ruedas = 4\n\nc = Coche()\nprint(c.ruedas)`
      },
      javascript: {
        starterCode: `class Coche {\n    constructor() {\n        this.ruedas = 4;\n    }\n}\nlet c = Coche(); // BUG: falta operador new\nconsole.log(c.ruedas);`,
        solutionCode: `class Coche {\n    constructor() {\n        this.ruedas = 4;\n    }\n}\nlet c = new Coche();\nconsole.log(c.ruedas);`
      },
      java: {
        starterCode: `class Coche {\n    int ruedas = 4;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Coche c = new Coche();\n        System.out.println(c.ruedas);\n    }\n}`,
        solutionCode: `class Coche {\n    int ruedas = 4;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Coche c = new Coche();\n        System.out.println(c.ruedas);\n    }\n}`
      }
    }
  },
  {
    id: 503,
    title: 'Constructor con Parámetros',
    statement: 'Completa la inicialización del atributo edad dentro del constructor.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Asigna el parámetro edad recibido al atributo.',
    explanation: 'El constructor inicializa el estado inicial de los atributos del objeto al ser creado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Usuario {\npublic:\n    int edad;\n    Usuario(int e) {\n        edad = ___;\n    }\n};\n\nint main() {\n    Usuario u(25);\n    std::cout << u.edad << std::endl; // 25\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Usuario {\npublic:\n    int edad;\n    Usuario(int e) {\n        edad = e;\n    }\n};\n\nint main() {\n    Usuario u(25);\n    std::cout << u.edad << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['e']
      },
      python: {
        starterCode: `class Usuario:\n    def __init__(self, e):\n        self.edad = ___\n\nu = Usuario(25)\nprint(u.edad)`,
        solutionCode: `class Usuario:\n    def __init__(self, e):\n        self.edad = e\n\nu = Usuario(25)\nprint(u.edad)`,
        acceptedKeywords: ['e']
      },
      javascript: {
        starterCode: `class Usuario {\n    constructor(e) {\n        this.edad = ___;\n    }\n}\nlet u = new Usuario(25);\nconsole.log(u.edad);`,
        solutionCode: `class Usuario {\n    constructor(e) {\n        this.edad = e;\n    }\n}\nlet u = new Usuario(25);\nconsole.log(u.edad);`,
        acceptedKeywords: ['e']
      },
      java: {
        starterCode: `class Usuario {\n    int edad;\n    Usuario(int e) {\n        edad = ___;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Usuario u = new Usuario(25);\n        System.out.println(u.edad);\n    }\n}`,
        solutionCode: `class Usuario {\n    int edad;\n    Usuario(int e) {\n        edad = e;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Usuario u = new Usuario(25);\n        System.out.println(u.edad);\n    }\n}`,
        acceptedKeywords: ['e']
      }
    }
  },
  {
    id: 504,
    title: 'Método de Instancia (Comportamiento)',
    statement: 'Corrige la llamada al método saludar() del objeto persona.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Invoca el método con paréntesis: p.saludar().',
    explanation: 'Los métodos representan las funciones miembro que definen las acciones de un objeto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Robot {\npublic:\n    void saludar() {\n        std::cout << "Hola Mundo" << std::endl;\n    }\n};\n\nint main() {\n    Robot r;\n    // Llama al método saludar\n    r.saludar();\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Robot {\npublic:\n    void saludar() {\n        std::cout << "Hola Mundo" << std::endl;\n    }\n};\n\nint main() {\n    Robot r;\n    r.saludar();\n    return 0;\n}`
      },
      python: {
        starterCode: `class Robot:\n    def saludar(self):\n        print("Hola Mundo")\n\nr = Robot()\nr.saludar # BUG: falta llamada con ()\n`,
        solutionCode: `class Robot:\n    def saludar(self):\n        print("Hola Mundo")\n\nr = Robot()\nr.saludar()`
      },
      javascript: {
        starterCode: `class Robot {\n    saludar() {\n        console.log("Hola Mundo");\n    }\n}\nlet r = new Robot();\nr.saludar; // BUG: falta ()\n`,
        solutionCode: `class Robot {\n    saludar() {\n        console.log("Hola Mundo");\n    }\n}\nlet r = new Robot();\nr.saludar();`
      },
      java: {
        starterCode: `class Robot {\n    void saludar() {\n        System.out.println("Hola Mundo");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Robot r = new Robot();\n        r.saludar();\n    }\n}`,
        solutionCode: `class Robot {\n    void saludar() {\n        System.out.println("Hola Mundo");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Robot r = new Robot();\n        r.saludar();\n    }\n}`
      }
    }
  },
  {
    id: 505,
    title: 'Referencia This / Self',
    statement: 'Completa la asignación diferenciando el atributo del parámetro con this / self.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'En C++/JS/Java usa this-> o this., en Python self.',
    explanation: 'this (o self) hace referencia explícita a la instancia actual del objeto dentro de sus métodos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Punto {\npublic:\n    int x;\n    Punto(int x) {\n        ___->x = x;\n    }\n};\n\nint main() {\n    Punto p(10);\n    std::cout << p.x << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Punto {\npublic:\n    int x;\n    Punto(int x) {\n        this->x = x;\n    }\n};\n\nint main() {\n    Punto p(10);\n    std::cout << p.x << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['this']
      },
      python: {
        starterCode: `class Punto:\n    def __init__(self, x):\n        ___.x = x\n\np = Punto(10)\nprint(p.x)`,
        solutionCode: `class Punto:\n    def __init__(self, x):\n        self.x = x\n\np = Punto(10)\nprint(p.x)`,
        acceptedKeywords: ['self']
      },
      javascript: {
        starterCode: `class Punto {\n    constructor(x) {\n        ___.x = x;\n    }\n}\nlet p = new Punto(10);\nconsole.log(p.x);`,
        solutionCode: `class Punto {\n    constructor(x) {\n        this.x = x;\n    }\n}\nlet p = new Punto(10);\nconsole.log(p.x);`,
        acceptedKeywords: ['this']
      },
      java: {
        starterCode: `class Punto {\n    int x;\n    Punto(int x) {\n        ___.x = x;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Punto p = new Punto(10);\n        System.out.println(p.x);\n    }\n}`,
        solutionCode: `class Punto {\n    int x;\n    Punto(int x) {\n        this.x = x;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Punto p = new Punto(10);\n        System.out.println(p.x);\n    }\n}`,
        acceptedKeywords: ['this']
      }
    }
  },
  {
    id: 506,
    title: 'Modificación de Atributos de Objeto',
    statement: 'Corrige el incremento de nivel del jugador sumando 1 (j.nivel += 1).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Incrementa el nivel: j.nivel += 1.',
    explanation: 'El estado de un objeto puede alterarse modificando directamente sus atributos accesibles.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Jugador {\npublic:\n    int nivel = 1;\n};\n\nint main() {\n    Jugador j;\n    // BUG: Decrementa en vez de subir de nivel\n    j.nivel--;\n    std::cout << j.nivel << std::endl; // Debe ser 2\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Jugador {\npublic:\n    int nivel = 1;\n};\n\nint main() {\n    Jugador j;\n    j.nivel++;\n    std::cout << j.nivel << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Jugador:\n    nivel = 1\n\nj = Jugador()\nj.nivel -= 1 # BUG\nprint(j.nivel)`,
        solutionCode: `class Jugador:\n    nivel = 1\n\nj = Jugador()\nj.nivel += 1\nprint(j.nivel)`
      },
      javascript: {
        starterCode: `class Jugador {\n    constructor() {\n        this.nivel = 1;\n    }\n}\nlet j = new Jugador();\nj.nivel -= 1; // BUG\nconsole.log(j.nivel);`,
        solutionCode: `class Jugador {\n    constructor() {\n        this.nivel = 1;\n    }\n}\nlet j = new Jugador();\nj.nivel += 1;\nconsole.log(j.nivel);`
      },
      java: {
        starterCode: `class Jugador {\n    int nivel = 1;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Jugador j = new Jugador();\n        j.nivel -= 1; // BUG\n        System.out.println(j.nivel);\n    }\n}`,
        solutionCode: `class Jugador {\n    int nivel = 1;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Jugador j = new Jugador();\n        j.nivel += 1;\n        System.out.println(j.nivel);\n    }\n}`
      }
    }
  },
  {
    id: 507,
    title: 'Método con Retorno de Valor',
    statement: 'Completa la fórmula del área del rectángulo (ancho * alto).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Calcula ancho * alto.',
    explanation: 'Los métodos pueden retornar el resultado de cálculos efectuados sobre sus atributos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Rectangulo {\npublic:\n    int ancho, alto;\n    Rectangulo(int w, int h) : ancho(w), alto(h) {}\n    int calcularArea() {\n        return ancho * ___;\n    }\n};\n\nint main() {\n    Rectangulo r(4, 5);\n    std::cout << r.calcularArea() << std::endl; // 20\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Rectangulo {\npublic:\n    int ancho, alto;\n    Rectangulo(int w, int h) : ancho(w), alto(h) {}\n    int calcularArea() {\n        return ancho * alto;\n    }\n};\n\nint main() {\n    Rectangulo r(4, 5);\n    std::cout << r.calcularArea() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['alto']
      },
      python: {
        starterCode: `class Rectangulo:\n    def __init__(self, w, h):\n        self.ancho, self.alto = w, h\n    def calcular_area(self):\n        return self.ancho * self.___\n\nr = Rectangulo(4, 5)\nprint(r.calcular_area())`,
        solutionCode: `class Rectangulo:\n    def __init__(self, w, h):\n        self.ancho, self.alto = w, h\n    def calcular_area(self):\n        return self.ancho * self.alto\n\nr = Rectangulo(4, 5)\nprint(r.calcular_area())`,
        acceptedKeywords: ['alto']
      },
      javascript: {
        starterCode: `class Rectangulo {\n    constructor(w, h) {\n        this.ancho = w; this.alto = h;\n    }\n    calcularArea() {\n        return this.ancho * this.___\n    }\n}\nlet r = new Rectangulo(4, 5);\nconsole.log(r.calcularArea());`,
        solutionCode: `class Rectangulo {\n    constructor(w, h) {\n        this.ancho = w; this.alto = h;\n    }\n    calcularArea() {\n        return this.ancho * this.alto;\n    }\n}\nlet r = new Rectangulo(4, 5);\nconsole.log(r.calcularArea());`,
        acceptedKeywords: ['alto']
      },
      java: {
        starterCode: `class Rectangulo {\n    int ancho, alto;\n    Rectangulo(int w, int h) { this.ancho = w; this.alto = h; }\n    int calcularArea() {\n        return ancho * ___;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Rectangulo r = new Rectangulo(4, 5);\n        System.out.println(r.calcularArea());\n    }\n}`,
        solutionCode: `class Rectangulo {\n    int ancho, alto;\n    Rectangulo(int w, int h) { this.ancho = w; this.alto = h; }\n    int calcularArea() {\n        return ancho * alto;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Rectangulo r = new Rectangulo(4, 5);\n        System.out.println(r.calcularArea());\n    }\n}`,
        acceptedKeywords: ['alto']
      }
    }
  },
  {
    id: 508,
    title: 'Paso de Objeto como Parámetro',
    statement: 'Corrige la función para imprimir el nombre del objeto persona recibido como argumento.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Accede a p.nombre.',
    explanation: 'Los objetos pueden enviarse como parámetros a funciones u otros métodos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nclass Alumno {\npublic:\n    std::string nombre;\n    Alumno(std::string n) : nombre(n) {}\n};\n\nvoid mostrar(Alumno a) {\n    std::cout << a.nombre << std::endl;\n}\n\nint main() {\n    Alumno a1("Sofia");\n    mostrar(a1);\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nclass Alumno {\npublic:\n    std::string nombre;\n    Alumno(std::string n) : nombre(n) {}\n};\n\nvoid mostrar(Alumno a) {\n    std::cout << a.nombre << std::endl;\n}\n\nint main() {\n    Alumno a1("Sofia");\n    mostrar(a1);\n    return 0;\n}`
      },
      python: {
        starterCode: `class Alumno:\n    def __init__(self, n):\n        self.nombre = n\n\ndef mostrar(a):\n    print(a.nombre)\n\na1 = Alumno("Sofia")\nmostrar(a1)`,
        solutionCode: `class Alumno:\n    def __init__(self, n):\n        self.nombre = n\n\ndef mostrar(a):\n    print(a.nombre)\n\na1 = Alumno("Sofia")\nmostrar(a1)`
      },
      javascript: {
        starterCode: `class Alumno {\n    constructor(n) {\n        this.nombre = n;\n    }\n}\ndefunction mostrar(a) {\n    console.log(a.nombre);\n}\nlet a1 = new Alumno("Sofia");\nmostrar(a1);`,
        solutionCode: `class Alumno {\n    constructor(n) {\n        this.nombre = n;\n    }\n}\nfunction mostrar(a) {\n    console.log(a.nombre);\n}\nlet a1 = new Alumno("Sofia");\nmostrar(a1);`
      },
      java: {
        starterCode: `class Alumno {\n    String nombre;\n    Alumno(String n) { this.nombre = n; }\n}\npublic class Main {\n    static void mostrar(Alumno a) {\n        System.out.println(a.nombre);\n    }\n    public static void main(String[] args) {\n        Alumno a1 = new Alumno("Sofia");\n        mostrar(a1);\n    }\n}`,
        solutionCode: `class Alumno {\n    String nombre;\n    Alumno(String n) { this.nombre = n; }\n}\npublic class Main {\n    static void mostrar(Alumno a) {\n        System.out.println(a.nombre);\n    }\n    public static void main(String[] args) {\n        Alumno a1 = new Alumno("Sofia");\n        mostrar(a1);\n    }\n}`
      }
    }
  },
  {
    id: 509,
    title: 'Arreglo / Lista de Objetos',
    statement: 'Completa el acceso al precio del segundo producto (productos[1].precio).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Accede a productos[1].precio.',
    explanation: 'Podemos almacenar múltiples objetos en un arreglo y acceder a las propiedades de cada uno.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <vector>\n\nclass Item {\npublic:\n    int precio;\n    Item(int p) : precio(p) {}\n};\n\nint main() {\n    std::vector<Item> items = {Item(10), Item(25), Item(50)};\n    std::cout << items[1].___ << std::endl; // 25\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <vector>\n\nclass Item {\npublic:\n    int precio;\n    Item(int p) : precio(p) {}\n};\n\nint main() {\n    std::vector<Item> items = {Item(10), Item(25), Item(50)};\n    std::cout << items[1].precio << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['precio']
      },
      python: {
        starterCode: `class Item:\n    def __init__(self, p): self.precio = p\n\nitems = [Item(10), Item(25), Item(50)]\nprint(items[1].___)`,
        solutionCode: `class Item:\n    def __init__(self, p): self.precio = p\n\nitems = [Item(10), Item(25), Item(50)]\nprint(items[1].precio)`,
        acceptedKeywords: ['precio']
      },
      javascript: {
        starterCode: `class Item {\n    constructor(p) { this.precio = p; }\n}\nlet items = [new Item(10), new Item(25), new Item(50)];\nconsole.log(items[1].___);`,
        solutionCode: `class Item {\n    constructor(p) { this.precio = p; }\n}\nlet items = [new Item(10), new Item(25), new Item(50)];\nconsole.log(items[1].precio);`,
        acceptedKeywords: ['precio']
      },
      java: {
        starterCode: `class Item {\n    int precio;\n    Item(int p) { this.precio = p; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item[] items = {new Item(10), new Item(25), new Item(50)};\n        System.out.println(items[1].___);\n    }\n}`,
        solutionCode: `class Item {\n    int precio;\n    Item(int p) { this.precio = p; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item[] items = {new Item(10), new Item(25), new Item(50)};\n        System.out.println(items[1].precio);\n    }\n}`,
        acceptedKeywords: ['precio']
      }
    }
  },
  {
    id: 510,
    title: 'Comprobación de Igualdad de Objetos',
    statement: 'Corrige la comparación para verificar si ambos puntos tienen las mismas coordenadas x e y.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Compara p1.x == p2.x && p1.y == p2.y.',
    explanation: 'Por defecto, comparar objetos evalúa sus referencias en memoria y no el contenido de sus atributos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Punto {\npublic:\n    int x, y;\n    Punto(int a, int b) : x(a), y(b) {}\n};\n\nint main() {\n    Punto p1(3, 4), p2(3, 4);\n    bool iguales = (p1.x == p2.x && p1.y == p2.y);\n    std::cout << std::boolalpha << iguales << std::endl; // true\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Punto {\npublic:\n    int x, y;\n    Punto(int a, int b) : x(a), y(b) {}\n};\n\nint main() {\n    Punto p1(3, 4), p2(3, 4);\n    bool iguales = (p1.x == p2.x && p1.y == p2.y);\n    std::cout << std::boolalpha << iguales << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Punto:\n    def __init__(self, x, y): self.x, self.y = x, y\n\np1, p2 = Punto(3, 4), Punto(3, 4)\niguales = p1.x == p2.x and p1.y == p2.y\nprint(iguales)`,
        solutionCode: `class Punto:\n    def __init__(self, x, y): self.x, self.y = x, y\n\np1, p2 = Punto(3, 4), Punto(3, 4)\niguales = p1.x == p2.x and p1.y == p2.y\nprint(iguales)`
      },
      javascript: {
        starterCode: `class Punto {\n    constructor(x, y) { this.x = x; this.y = y; }\n}\nlet p1 = new Punto(3, 4), p2 = new Punto(3, 4);\nlet iguales = (p1.x === p2.x && p1.y === p2.y);\nconsole.log(iguales);`,
        solutionCode: `class Punto {\n    constructor(x, y) { this.x = x; this.y = y; }\n}\nlet p1 = new Punto(3, 4), p2 = new Punto(3, 4);\nlet iguales = (p1.x === p2.x && p1.y === p2.y);\nconsole.log(iguales);`
      },
      java: {
        starterCode: `class Punto {\n    int x, y;\n    Punto(int x, int y) { this.x = x; this.y = y; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Punto p1 = new Punto(3, 4), p2 = new Punto(3, 4);\n        boolean iguales = (p1.x == p2.x && p1.y == p2.y);\n        System.out.println(iguales);\n    }\n}`,
        solutionCode: `class Punto {\n    int x, y;\n    Punto(int x, int y) { this.x = x; this.y = y; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Punto p1 = new Punto(3, 4), p2 = new Punto(3, 4);\n        boolean iguales = (p1.x == p2.x && p1.y == p2.y);\n        System.out.println(iguales);\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 511 al 520 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 511,
    title: 'Encapsulamiento con Atributos Privados y Getters',
    statement: 'Completa la palabra clave private para proteger el atributo saldo del acceso directo.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa el modificador private.',
    explanation: 'El encapsulamiento oculta la representación interna y restringe el acceso directo mediante modificadores.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Cuenta {\n___:\n    double saldo;\npublic:\n    Cuenta(double s) : saldo(s) {}\n    double getSaldo() { return saldo; }\n};\n\nint main() {\n    Cuenta c(100.0);\n    std::cout << c.getSaldo() << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Cuenta {\nprivate:\n    double saldo;\npublic:\n    Cuenta(double s) : saldo(s) {}\n    double getSaldo() { return saldo; }\n};\n\nint main() {\n    Cuenta c(100.0);\n    std::cout << c.getSaldo() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['private']
      },
      python: {
        starterCode: `class Cuenta:\n    def __init__(self, s):\n        self.__saldo = s # Privado por convención con __\n    def get_saldo(self):\n        return self.__saldo\n\nc = Cuenta(100.0)\nprint(c.get_saldo())`,
        solutionCode: `class Cuenta:\n    def __init__(self, s):\n        self.__saldo = s\n    def get_saldo(self):\n        return self.__saldo\n\nc = Cuenta(100.0)\nprint(c.get_saldo())`
      },
      javascript: {
        starterCode: `class Cuenta {\n    #saldo;\n    constructor(s) {\n        this.#saldo = s;\n    }\n    getSaldo() {\n        return this.#saldo;\n    }\n}\nlet c = new Cuenta(100.0);\nconsole.log(c.getSaldo());`,
        solutionCode: `class Cuenta {\n    #saldo;\n    constructor(s) {\n        this.#saldo = s;\n    }\n    getSaldo() {\n        return this.#saldo;\n    }\n}\nlet c = new Cuenta(100.0);\nconsole.log(c.getSaldo());`
      },
      java: {
        starterCode: `class Cuenta {\n    ___ double saldo;\n    public Cuenta(double s) { this.saldo = s; }\n    public double getSaldo() { return saldo; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Cuenta c = new Cuenta(100.0);\n        System.out.println(c.getSaldo());\n    }\n}`,
        solutionCode: `class Cuenta {\n    private double saldo;\n    public Cuenta(double s) { this.saldo = s; }\n    public double getSaldo() { return saldo; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Cuenta c = new Cuenta(100.0);\n        System.out.println(c.getSaldo());\n    }\n}`,
        acceptedKeywords: ['private']
      }
    }
  },
  {
    id: 512,
    title: 'Validación en Método Setter',
    statement: 'Corrige el método setEdad para rechazar edades negativas asignando solo si nuevaEdad >= 0.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Comprueba if (nuevaEdad >= 0) { edad = nuevaEdad; }',
    explanation: 'Los métodos setters permiten validar las reglas de negocio antes de actualizar el estado interno.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Perfil {\nprivate:\n    int edad = 18;\npublic:\n    void setEdad(int e) {\n        // BUG: Asigna valores negativos sin validar\n        edad = e;\n    }\n    int getEdad() { return edad; }\n};\n\nint main() {\n    Perfil p;\n    p.setEdad(-5);\n    std::cout << p.getEdad() << std::endl; // Debe seguir siendo 18\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Perfil {\nprivate:\n    int edad = 18;\npublic:\n    void setEdad(int e) {\n        if (e >= 0) {\n            edad = e;\n        }\n    }\n    int getEdad() { return edad; }\n};\n\nint main() {\n    Perfil p;\n    p.setEdad(-5);\n    std::cout << p.getEdad() << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Perfil:\n    def __init__(self):\n        self._edad = 18\n    def set_edad(self, e):\n        self._edad = e # BUG\n    def get_edad(self):\n        return self._edad\n\np = Perfil()\np.set_edad(-5)\nprint(p.get_edad())`,
        solutionCode: `class Perfil:\n    def __init__(self):\n        self._edad = 18\n    def set_edad(self, e):\n        if e >= 0:\n            self._edad = e\n    def get_edad(self):\n        return self._edad\n\np = Perfil()\np.set_edad(-5)\nprint(p.get_edad())`
      },
      javascript: {
        starterCode: `class Perfil {\n    constructor() {\n        this._edad = 18;\n    }\n    setEdad(e) {\n        this._edad = e; // BUG\n    }\n    getEdad() {\n        return this._edad;\n    }\n}\nlet p = new Perfil();\np.setEdad(-5);\nconsole.log(p.getEdad());`,
        solutionCode: `class Perfil {\n    constructor() {\n        this._edad = 18;\n    }\n    setEdad(e) {\n        if (e >= 0) {\n            this._edad = e;\n        }\n    }\n    getEdad() {\n        return this._edad;\n    }\n}\nlet p = new Perfil();\np.setEdad(-5);\nconsole.log(p.getEdad());`
      },
      java: {
        starterCode: `class Perfil {\n    private int edad = 18;\n    public void setEdad(int e) {\n        edad = e; // BUG\n    }\n    public int getEdad() { return edad; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Perfil p = new Perfil();\n        p.setEdad(-5);\n        System.out.println(p.getEdad());\n    }\n}`,
        solutionCode: `class Perfil {\n    private int edad = 18;\n    public void setEdad(int e) {\n        if (e >= 0) {\n            edad = e;\n        }\n    }\n    public int getEdad() { return edad; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Perfil p = new Perfil();\n        p.setEdad(-5);\n        System.out.println(p.getEdad());\n    }\n}`
      }
    }
  },
  {
    id: 513,
    title: 'Métodos y Atributos Estáticos (Static)',
    statement: 'Completa la palabra clave static para el método utilitario de sumar.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa la palabra clave static.',
    explanation: 'Los miembros estáticos pertenecen a la clase en sí y pueden invocarse sin instanciar un objeto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Calculadora {\npublic:\n    ___ int sumar(int a, int b) {\n        return a + b;\n    }\n};\n\nint main() {\n    std::cout << Calculadora::sumar(10, 20) << std::endl; // 30\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Calculadora {\npublic:\n    static int sumar(int a, int b) {\n        return a + b;\n    }\n};\n\nint main() {\n    std::cout << Calculadora::sumar(10, 20) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['static']
      },
      python: {
        starterCode: `class Calculadora:\n    @___\n    def sumar(a, b):\n        return a + b\n\nprint(Calculadora.sumar(10, 20))`,
        solutionCode: `class Calculadora:\n    @staticmethod\n    def sumar(a, b):\n        return a + b\n\nprint(Calculadora.sumar(10, 20))`,
        acceptedKeywords: ['staticmethod']
      },
      javascript: {
        starterCode: `class Calculadora {\n    ___ sumar(a, b) {\n        return a + b;\n    }\n}\nconsole.log(Calculadora.sumar(10, 20));`,
        solutionCode: `class Calculadora {\n    static sumar(a, b) {\n        return a + b;\n    }\n}\nconsole.log(Calculadora.sumar(10, 20));`,
        acceptedKeywords: ['static']
      },
      java: {
        starterCode: `class Calculadora {\n    public ___ int sumar(int a, int b) {\n        return a + b;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Calculadora.sumar(10, 20));\n    }\n}`,
        solutionCode: `class Calculadora {\n    public static int sumar(int a, int b) {\n        return a + b;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Calculadora.sumar(10, 20));\n    }\n}`,
        acceptedKeywords: ['static']
      }
    }
  },
  {
    id: 514,
    title: 'Contador de Instancias Creadas con Static',
    statement: 'Corrige el incremento del contador de instancias en el constructor (contador++).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Incrementa el atributo estático contador++ en cada llamada al constructor.',
    explanation: 'Un atributo estático es compartido por todas las instancias de la clase permitiendo rastrear datos globales.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Item {\npublic:\n    static int contador;\n    Item() {\n        // BUG: Asigna 1 en vez de incrementar\n        contador = 1;\n    }\n};\nint Item::contador = 0;\n\nint main() {\n    Item i1, i2, i3;\n    std::cout << Item::contador << std::endl; // Debe ser 3\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Item {\npublic:\n    static int contador;\n    Item() {\n        contador++;\n    }\n};\nint Item::contador = 0;\n\nint main() {\n    Item i1, i2, i3;\n    std::cout << Item::contador << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Item:\n    contador = 0\n    def __init__(self):\n        Item.contador = 1 # BUG\n\ni1, i2, i3 = Item(), Item(), Item()\nprint(Item.contador)`,
        solutionCode: `class Item:\n    contador = 0\n    def __init__(self):\n        Item.contador += 1\n\ni1, i2, i3 = Item(), Item(), Item()\nprint(Item.contador)`
      },
      javascript: {
        starterCode: `class Item {\n    static contador = 0;\n    constructor() {\n        Item.contador = 1; // BUG\n    }\n}\nnew Item(); new Item(); new Item();\nconsole.log(Item.contador);`,
        solutionCode: `class Item {\n    static contador = 0;\n    constructor() {\n        Item.contador++;\n    }\n}\nnew Item(); new Item(); new Item();\nconsole.log(Item.contador);`
      },
      java: {
        starterCode: `class Item {\n    static int contador = 0;\n    Item() {\n        contador = 1; // BUG\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Item(); new Item(); new Item();\n        System.out.println(Item.contador);\n    }\n}`,
        solutionCode: `class Item {\n    static int contador = 0;\n    Item() {\n        contador++;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Item(); new Item(); new Item();\n        System.out.println(Item.contador);\n    }\n}`
      }
    }
  },
  {
    id: 515,
    title: 'Herencia de Clases (Extensión Básica)',
    statement: 'Completa la sintaxis de herencia para que Perro herede de Animal.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'En C++ usa : public Animal, en Java/JS extends Animal, en Python class Perro(Animal):',
    explanation: 'La herencia permite a una subclase reutilizar atributos y métodos definidos en una clase base.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Animal {\npublic:\n    void comer() { std::cout << "Comiendo" << std::endl; }\n};\n\nclass Perro : ___ Animal {};\n\nint main() {\n    Perro p;\n    p.comer();\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Animal {\npublic:\n    void comer() { std::cout << "Comiendo" << std::endl; }\n};\n\nclass Perro : public Animal {};\n\nint main() {\n    Perro p;\n    p.comer();\n    return 0;\n}`,
        acceptedKeywords: ['public']
      },
      python: {
        starterCode: `class Animal:\n    def comer(self): print("Comiendo")\n\nclass Perro(___):\n    pass\n\np = Perro()\np.comer()`,
        solutionCode: `class Animal:\n    def comer(self): print("Comiendo")\n\nclass Perro(Animal):\n    pass\n\np = Perro()\np.comer()`,
        acceptedKeywords: ['Animal']
      },
      javascript: {
        starterCode: `class Animal {\n    comer() { console.log("Comiendo"); }\n}\nclass Perro ___ Animal {}\n\nlet p = new Perro();\np.comer();`,
        solutionCode: `class Animal {\n    comer() { console.log("Comiendo"); }\n}\nclass Perro extends Animal {}\n\nlet p = new Perro();\np.comer();`,
        acceptedKeywords: ['extends']
      },
      java: {
        starterCode: `class Animal {\n    void comer() { System.out.println("Comiendo"); }\n}\nclass Perro ___ Animal {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Perro p = new Perro();\n        p.comer();\n    }\n}`,
        solutionCode: `class Animal {\n    void comer() { System.out.println("Comiendo"); }\n}\nclass Perro extends Animal {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Perro p = new Perro();\n        p.comer();\n    }\n}`,
        acceptedKeywords: ['extends']
      }
    }
  },
  {
    id: 516,
    title: 'Llamada al Constructor Padre (Super)',
    statement: 'Corrige la llamada al constructor de la clase base pasando el nombre.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Llama a super(nombre) en JS/Java/Python o : Base(nombre) en C++.',
    explanation: 'El constructor hijo debe invocar al constructor padre para garantizar la correcta inicialización de la jerarquía.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nclass Base {\npublic:\n    std::string nombre;\n    Base(std::string n) : nombre(n) {}\n};\n\nclass Derivada : public Base {\npublic:\n    Derivada(std::string n) : Base(n) {}\n};\n\nint main() {\n    Derivada d("Test");\n    std::cout << d.nombre << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nclass Base {\npublic:\n    std::string nombre;\n    Base(std::string n) : nombre(n) {}\n};\n\nclass Derivada : public Base {\npublic:\n    Derivada(std::string n) : Base(n) {}\n};\n\nint main() {\n    Derivada d("Test");\n    std::cout << d.nombre << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Base:\n    def __init__(self, n): self.nombre = n\n\nclass Derivada(Base):\n    def __init__(self, n):\n        super().__init__(n)\n\nd = Derivada("Test")\nprint(d.nombre)`,
        solutionCode: `class Base:\n    def __init__(self, n): self.nombre = n\n\nclass Derivada(Base):\n    def __init__(self, n):\n        super().__init__(n)\n\nd = Derivada("Test")\nprint(d.nombre)`
      },
      javascript: {
        starterCode: `class Base {\n    constructor(n) { this.nombre = n; }\n}\nclass Derivada extends Base {\n    constructor(n) {\n        // BUG: Falta super(n)\n        super(n);\n    }\n}\nlet d = new Derivada("Test");\nconsole.log(d.nombre);`,
        solutionCode: `class Base {\n    constructor(n) { this.nombre = n; }\n}\nclass Derivada extends Base {\n    constructor(n) {\n        super(n);\n    }\n}\nlet d = new Derivada("Test");\nconsole.log(d.nombre);`
      },
      java: {
        starterCode: `class Base {\n    String nombre;\n    Base(String n) { this.nombre = n; }\n}\nclass Derivada extends Base {\n    Derivada(String n) {\n        super(n);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Derivada d = new Derivada("Test");\n        System.out.println(d.nombre);\n    }\n}`,
        solutionCode: `class Base {\n    String nombre;\n    Base(String n) { this.nombre = n; }\n}\nclass Derivada extends Base {\n    Derivada(String n) {\n        super(n);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Derivada d = new Derivada("Test");\n        System.out.println(d.nombre);\n    }\n}`
      }
    }
  },
  {
    id: 517,
    title: 'Composición de Objetos (Relación Tiene-Un)',
    statement: 'Completa la llamada para encender el motor desde el método arrancar() del coche (motor.___()).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Invoca motor.encender().',
    explanation: 'La composición modela relaciones donde un objeto complejo contiene instancias de objetos más pequeños.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Motor {\npublic:\n    void encender() { std::cout << "Motor encendido" << std::endl; }\n};\n\nclass Auto {\npublic:\n    Motor motor;\n    void arrancar() {\n        motor.___();\n    }\n};\n\nint main() {\n    Auto a;\n    a.arrancar();\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Motor {\npublic:\n    void encender() { std::cout << "Motor encendido" << std::endl; }\n};\n\nclass Auto {\npublic:\n    Motor motor;\n    void arrancar() {\n        motor.encender();\n    }\n};\n\nint main() {\n    Auto a;\n    a.arrancar();\n    return 0;\n}`,
        acceptedKeywords: ['encender']
      },
      python: {
        starterCode: `class Motor:\n    def encender(self): print("Motor encendido")\n\nclass Auto:\n    def __init__(self): self.motor = Motor()\n    def arrancar(self):\n        self.motor.___()\n\na = Auto()\na.arrancar()`,
        solutionCode: `class Motor:\n    def encender(self): print("Motor encendido")\n\nclass Auto:\n    def __init__(self): self.motor = Motor()\n    def arrancar(self):\n        self.motor.encender()\n\na = Auto()\na.arrancar()`,
        acceptedKeywords: ['encender']
      },
      javascript: {
        starterCode: `class Motor {\n    encender() { console.log("Motor encendido"); }\n}\nclass Auto {\n    constructor() { this.motor = new Motor(); }\n    arrancar() {\n        this.motor.___();\n    }\n}\nlet a = new Auto();\na.arrancar();`,
        solutionCode: `class Motor {\n    encender() { console.log("Motor encendido"); }\n}\nclass Auto {\n    constructor() { this.motor = new Motor(); }\n    arrancar() {\n        this.motor.encender();\n    }\n}\nlet a = new Auto();\na.arrancar();`,
        acceptedKeywords: ['encender']
      },
      java: {
        starterCode: `class Motor {\n    void encender() { System.out.println("Motor encendido"); }\n}\nclass Auto {\n    Motor motor = new Motor();\n    void arrancar() {\n        motor.___();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Auto a = new Auto();\n        a.arrancar();\n    }\n}`,
        solutionCode: `class Motor {\n    void encender() { System.out.println("Motor encendido"); }\n}\nclass Auto {\n    Motor motor = new Motor();\n    void arrancar() {\n        motor.encender();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Auto a = new Auto();\n        a.arrancar();\n    }\n}`,
        acceptedKeywords: ['encender']
      }
    }
  },
  {
    id: 518,
    title: 'Sobrecarga de Constructores (Múltiples Formas de Inicializar)',
    statement: 'Corrige la invocación del constructor por defecto (sin parámetros) que inicializa puntos en 0.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Instancia Jugador() con el constructor por defecto.',
    explanation: 'La sobrecarga permite definir varios constructores con diferentes listas de parámetros.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Jugador {\npublic:\n    int puntos;\n    Jugador() : puntos(0) {}\n    Jugador(int p) : puntos(p) {}\n};\n\nint main() {\n    Jugador j;\n    std::cout << j.puntos << std::endl; // 0\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Jugador {\npublic:\n    int puntos;\n    Jugador() : puntos(0) {}\n    Jugador(int p) : puntos(p) {}\n};\n\nint main() {\n    Jugador j;\n    std::cout << j.puntos << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Jugador:\n    def __init__(self, puntos=0):\n        self.puntos = puntos\n\nj = Jugador()\nprint(j.puntos)`,
        solutionCode: `class Jugador:\n    def __init__(self, puntos=0):\n        self.puntos = puntos\n\nj = Jugador()\nprint(j.puntos)`
      },
      javascript: {
        starterCode: `class Jugador {\n    constructor(puntos = 0) {\n        this.puntos = puntos;\n    }\n}\nlet j = new Jugador();\nconsole.log(j.puntos);`,
        solutionCode: `class Jugador {\n    constructor(puntos = 0) {\n        this.puntos = puntos;\n    }\n}\nlet j = new Jugador();\nconsole.log(j.puntos);`
      },
      java: {
        starterCode: `class Jugador {\n    int puntos;\n    Jugador() { this.puntos = 0; }\n    Jugador(int p) { this.puntos = p; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Jugador j = new Jugador();\n        System.out.println(j.puntos);\n    }\n}`,
        solutionCode: `class Jugador {\n    int puntos;\n    Jugador() { this.puntos = 0; }\n    Jugador(int p) { this.puntos = p; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Jugador j = new Jugador();\n        System.out.println(j.puntos);\n    }\n}`
      }
    }
  },
  {
    id: 519,
    title: 'Representación Textual (__str__ / toString)',
    statement: 'Completa el nombre del método de representación textual de objetos en string.',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa toString en Java/JS o __str__ en Python.',
    explanation: 'Sobreescribir la representación en string permite imprimir información legible al mostrar el objeto.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nclass Carta {\npublic:\n    std::string palo;\n    Carta(std::string p) : palo(p) {}\n    std::string toString() {\n        return "Carta: " + palo;\n    }\n};\n\nint main() {\n    Carta c("Picas");\n    std::cout << c.___() << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nclass Carta {\npublic:\n    std::string palo;\n    Carta(std::string p) : palo(p) {}\n    std::string toString() {\n        return "Carta: " + palo;\n    }\n};\n\nint main() {\n    Carta c("Picas");\n    std::cout << c.toString() << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['toString']
      },
      python: {
        starterCode: `class Carta:\n    def __init__(self, p): self.palo = p\n    def _______(self):\n        return f"Carta: {self.palo}"\n\nc = Carta("Picas")\nprint(str(c))`,
        solutionCode: `class Carta:\n    def __init__(self, p): self.palo = p\n    def __str__(self):\n        return f"Carta: {self.palo}"\n\nc = Carta("Picas")\nprint(str(c))`,
        acceptedKeywords: ['str__', '__str__']
      },
      javascript: {
        starterCode: `class Carta {\n    constructor(p) { this.palo = p; }\n    ___() {\n        return "Carta: " + this.palo;\n    }\n}\nlet c = new Carta("Picas");\nconsole.log(c.toString());`,
        solutionCode: `class Carta {\n    constructor(p) { this.palo = p; }\n    toString() {\n        return "Carta: " + this.palo;\n    }\n}\nlet c = new Carta("Picas");\nconsole.log(c.toString());`,
        acceptedKeywords: ['toString']
      },
      java: {
        starterCode: `class Carta {\n    String palo;\n    Carta(String p) { this.palo = p; }\n    public String ___() {\n        return "Carta: " + palo;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Carta c = new Carta("Picas");\n        System.out.println(c.toString());\n    }\n}`,
        solutionCode: `class Carta {\n    String palo;\n    Carta(String p) { this.palo = p; }\n    public String toString() {\n        return "Carta: " + palo;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Carta c = new Carta("Picas");\n        System.out.println(c.toString());\n    }\n}`,
        acceptedKeywords: ['toString']
      }
    }
  },
  {
    id: 520,
    title: 'Sobreescritura de Métodos (Method Overriding)',
    statement: 'Corrige la sobreescritura del método hablar() en la clase Gato para que maúlle.',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Sobreescribe el método para imprimir "Miau".',
    explanation: 'La sobreescritura permite a una subclase modificar la implementación de un método de la clase padre.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Animal {\npublic:\n    virtual void hablar() { std::cout << "Sonido" << std::endl; }\n};\n\nclass Gato : public Animal {\npublic:\n    // BUG: No redefine el método\n    void hablar() override {\n        std::cout << "Miau" << std::endl;\n    }\n};\n\nint main() {\n    Gato g;\n    g.hablar();\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Animal {\npublic:\n    virtual void hablar() { std::cout << "Sonido" << std::endl; }\n};\n\nclass Gato : public Animal {\npublic:\n    void hablar() override {\n        std::cout << "Miau" << std::endl;\n    }\n};\n\nint main() {\n    Gato g;\n    g.hablar();\n    return 0;\n}`
      },
      python: {
        starterCode: `class Animal:\n    def hablar(self): print("Sonido")\n\nclass Gato(Animal):\n    def hablar(self):\n        print("Miau")\n\ng = Gato()\ng.hablar()`,
        solutionCode: `class Animal:\n    def hablar(self): print("Sonido")\n\nclass Gato(Animal):\n    def hablar(self):\n        print("Miau")\n\ng = Gato()\ng.hablar()`
      },
      javascript: {
        starterCode: `class Animal {\n    hablar() { console.log("Sonido"); }\n}\nclass Gato extends Animal {\n    hablar() {\n        console.log("Miau");\n    }\n}\nlet g = new Gato();\ng.hablar();`,
        solutionCode: `class Animal {\n    hablar() { console.log("Sonido"); }\n}\nclass Gato extends Animal {\n    hablar() {\n        console.log("Miau");\n    }\n}\nlet g = new Gato();\ng.hablar();`
      },
      java: {
        starterCode: `class Animal {\n    void hablar() { System.out.println("Sonido"); }\n}\nclass Gato extends Animal {\n    @Override\n    void hablar() {\n        System.out.println("Miau");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Gato g = new Gato();\n        g.hablar();\n    }\n}`,
        solutionCode: `class Animal {\n    void hablar() { System.out.println("Sonido"); }\n}\nclass Gato extends Animal {\n    @Override\n    void hablar() {\n        System.out.println("Miau");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Gato g = new Gato();\n        g.hablar();\n    }\n}`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 521 al 530 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 521,
    title: 'Polimorfismo con Punteros de Clase Base',
    statement: 'Completa la palabra clave virtual en la clase base para permitir despacho dinámico.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'En C++ usa virtual void dibujar().',
    explanation: 'El polimorfismo permite tratar objetos de diferentes clases derivadas de forma uniforme mediante la clase base.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Figura {\npublic:\n    ___ void dibujar() {\n        std::cout << "Figura" << std::endl;\n    }\n};\n\nclass Circulo : public Figura {\npublic:\n    void dibujar() override {\n        std::cout << "Círculo" << std::endl;\n    }\n};\n\nint main() {\n    Figura *f = new Circulo();\n    f->dibujar(); // "Círculo"\n    delete f;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Figura {\npublic:\n    virtual void dibujar() {\n        std::cout << "Figura" << std::endl;\n    }\n};\n\nclass Circulo : public Figura {\npublic:\n    void dibujar() override {\n        std::cout << "Círculo" << std::endl;\n    }\n};\n\nint main() {\n    Figura *f = new Circulo();\n    f->dibujar();\n    delete f;\n    return 0;\n}`,
        acceptedKeywords: ['virtual']
      },
      python: {
        starterCode: `# Python tiene despacho dinámico polimórfico por defecto\nclass Figura:\n    def dibujar(self): print("Figura")\nclass Circulo(Figura):\n    def dibujar(self): print("Círculo")\n\nf: Figura = Circulo()\nf.dibujar()`,
        solutionCode: `class Figura:\n    def dibujar(self): print("Figura")\nclass Circulo(Figura):\n    def dibujar(self): print("Círculo")\n\nf: Figura = Circulo()\nf.dibujar()`
      },
      javascript: {
        starterCode: `class Figura {\n    dibujar() { console.log("Figura"); }\n}\nclass Circulo extends Figura {\n    dibujar() { console.log("Círculo"); }\n}\nlet f = new Circulo();\nf.dibujar();`,
        solutionCode: `class Figura {\n    dibujar() { console.log("Figura"); }\n}\nclass Circulo extends Figura {\n    dibujar() { console.log("Círculo"); }\n}\nlet f = new Circulo();\nf.dibujar();`
      },
      java: {
        starterCode: `class Figura {\n    void dibujar() { System.out.println("Figura"); }\n}\nclass Circulo extends Figura {\n    @Override\n    void dibujar() { System.out.println("Círculo"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Figura f = new Circulo();\n        f.dibujar();\n    }\n}`,
        solutionCode: `class Figura {\n    void dibujar() { System.out.println("Figura"); }\n}\nclass Circulo extends Figura {\n    @Override\n    void dibujar() { System.out.println("Círculo"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Figura f = new Circulo();\n        f.dibujar();\n    }\n}`
      }
    }
  },
  {
    id: 522,
    title: 'Clase Abstracta / Método Virtual Puro',
    statement: 'Corrige la declaración de método virtual puro en C++ asignándole = 0.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'La sintaxis de método virtual puro es virtual void metodo() = 0;',
    explanation: 'Una clase abstracta no puede instanciarse directamente y obliga a sus derivadas a implementar sus métodos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Documento {\npublic:\n    // BUG: Debe ser virtual puro = 0\n    virtual void imprimir() = 0;\n};\n\nclass PDF : public Documento {\npublic:\n    void imprimir() override {\n        std::cout << "Imprimiendo PDF" << std::endl;\n    }\n};\n\nint main() {\n    PDF p;\n    p.imprimir();\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Documento {\npublic:\n    virtual void imprimir() = 0;\n};\n\nclass PDF : public Documento {\npublic:\n    void imprimir() override {\n        std::cout << "Imprimiendo PDF" << std::endl;\n    }\n};\n\nint main() {\n    PDF p;\n    p.imprimir();\n    return 0;\n}`
      },
      python: {
        starterCode: `from abc import ABC, abstractmethod\nclass Documento(ABC):\n    @abstractmethod\n    def imprimir(self): pass\n\nclass PDF(Documento):\n    def imprimir(self): print("Imprimiendo PDF")\n\np = PDF()\np.imprimir()`,
        solutionCode: `from abc import ABC, abstractmethod\nclass Documento(ABC):\n    @abstractmethod\n    def imprimir(self): pass\n\nclass PDF(Documento):\n    def imprimir(self): print("Imprimiendo PDF")\n\np = PDF()\np.imprimir()`
      },
      javascript: {
        starterCode: `class Documento {\n    imprimir() { throw new Error("Método abstracto"); }\n}\nclass PDF extends Documento {\n    imprimir() { console.log("Imprimiendo PDF"); }\n}\nlet p = new PDF();\np.imprimir();`,
        solutionCode: `class Documento {\n    imprimir() { throw new Error("Método abstracto"); }\n}\nclass PDF extends Documento {\n    imprimir() { console.log("Imprimiendo PDF"); }\n}\nlet p = new PDF();\np.imprimir();`
      },
      java: {
        starterCode: `abstract class Documento {\n    abstract void imprimir();\n}\nclass PDF extends Documento {\n    void imprimir() { System.out.println("Imprimiendo PDF"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        PDF p = new PDF();\n        p.imprimir();\n    }\n}`,
        solutionCode: `abstract class Documento {\n    abstract void imprimir();\n}\nclass PDF extends Documento {\n    void imprimir() { System.out.println("Imprimiendo PDF"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        PDF p = new PDF();\n        p.imprimir();\n    }\n}`
      }
    }
  },
  {
    id: 523,
    title: 'Implementación de Interface (Contrato)',
    statement: 'Completa la palabra clave implements para cumplir con la interface en Java.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa implements.',
    explanation: 'Una interface define un contrato estricto de métodos que la clase debe implementar.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass IVolable {\npublic:\n    virtual void volar() = 0;\n};\n\nclass Avion : public IVolable {\npublic:\n    void volar() override { std::cout << "Volando" << std::endl; }\n};\n\nint main() {\n    Avion a;\n    a.volar();\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass IVolable {\npublic:\n    virtual void volar() = 0;\n};\n\nclass Avion : public IVolable {\npublic:\n    void volar() override { std::cout << "Volando" << std::endl; }\n};\n\nint main() {\n    Avion a;\n    a.volar();\n    return 0;\n}`
      },
      python: {
        starterCode: `class IVolable:\n    def volar(self): raise NotImplementedError\n\nclass Avion(IVolable):\n    def volar(self): print("Volando")\n\na = Avion()\na.volar()`,
        solutionCode: `class IVolable:\n    def volar(self): raise NotImplementedError\n\nclass Avion(IVolable):\n    def volar(self): print("Volando")\n\na = Avion()\na.volar()`
      },
      javascript: {
        starterCode: `class Avion {\n    volar() { console.log("Volando"); }\n}\nlet a = new Avion();\na.volar();`,
        solutionCode: `class Avion {\n    volar() { console.log("Volando"); }\n}\nlet a = new Avion();\na.volar();`
      },
      java: {
        starterCode: `interface IVolable {\n    void volar();\n}\nclass Avion ___ IVolable {\n    public void volar() { System.out.println("Volando"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Avion a = new Avion();\n        a.volar();\n    }\n}`,
        solutionCode: `interface IVolable {\n    void volar();\n}\nclass Avion implements IVolable {\n    public void volar() { System.out.println("Volando"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Avion a = new Avion();\n        a.volar();\n    }\n}`,
        acceptedKeywords: ['implements']
      }
    }
  },
  {
    id: 524,
    title: 'Destructor / Liberación de Recursos',
    statement: 'Corrige la sintaxis del destructor en C++ anteponiendo la tilde virgulilla (~).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'El destructor se nombra ~Clase().',
    explanation: 'El destructor se ejecuta automáticamente cuando el objeto sale de su ámbito o se destruye.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Recurso {\npublic:\n    // BUG: Falta ~ para ser destructor\n    ~Recurso() {\n        std::cout << "Recurso liberado" << std::endl;\n    }\n};\n\nint main() {\n    {\n        Recurso r;\n    }\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Recurso {\npublic:\n    ~Recurso() {\n        std::cout << "Recurso liberado" << std::endl;\n    }\n};\n\nint main() {\n    {\n        Recurso r;\n    }\n    return 0;\n}`
      },
      python: {
        starterCode: `class Recurso:\n    def __del__(self):\n        print("Recurso liberado")\n\nr = Recurso()\ndel r`,
        solutionCode: `class Recurso:\n    def __del__(self):\n        print("Recurso liberado")\n\nr = Recurso()\ndel r`
      },
      javascript: {
        starterCode: `class Recurso {\n    cerrar() {\n        console.log("Recurso liberado");\n    }\n}\nlet r = new Recurso();\nr.cerrar();`,
        solutionCode: `class Recurso {\n    cerrar() {\n        console.log("Recurso liberado");\n    }\n}\nlet r = new Recurso();\nr.cerrar();`
      },
      java: {
        starterCode: `class Recurso implements AutoCloseable {\n    public void close() {\n        System.out.println("Recurso liberado");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Recurso r = new Recurso()) {}\n    }\n}`,
        solutionCode: `class Recurso implements AutoCloseable {\n    public void close() {\n        System.out.println("Recurso liberado");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        try (Recurso r = new Recurso()) {}\n    }\n}`
      }
    }
  },
  {
    id: 525,
    title: 'Patrón Singleton (Instancia Única)',
    statement: 'Completa la condición: si instancia == nullptr crea la nueva instancia única.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Comprueba if (instancia == nullptr).',
    explanation: 'El patrón Singleton asegura que una clase tenga solo una instancia y proporciona un punto de acceso global.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Singleton {\nprivate:\n    static Singleton* instancia;\n    Singleton() {}\npublic:\n    static Singleton* getInstancia() {\n        if (instancia == ___) {\n            instancia = new Singleton();\n        }\n        return instancia;\n    }\n};\nSingleton* Singleton::instancia = nullptr;\n\nint main() {\n    Singleton* s1 = Singleton::getInstancia();\n    std::cout << (s1 != nullptr) << std::endl;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Singleton {\nprivate:\n    static Singleton* instancia;\n    Singleton() {}\npublic:\n    static Singleton* getInstancia() {\n        if (instancia == nullptr) {\n            instancia = new Singleton();\n        }\n        return instancia;\n    }\n};\nSingleton* Singleton::instancia = nullptr;\n\nint main() {\n    Singleton* s1 = Singleton::getInstancia();\n    std::cout << (s1 != nullptr) << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['nullptr', 'NULL', '0']
      },
      python: {
        starterCode: `class Singleton:\n    _instancia = None\n    @classmethod\n    def get_instancia(cls):\n        if cls._instancia is ___:\n            cls._instancia = cls()\n        return cls._instancia\n\ns = Singleton.get_instancia()\nprint(s is not None)`,
        solutionCode: `class Singleton:\n    _instancia = None\n    @classmethod\n    def get_instancia(cls):\n        if cls._instancia is None:\n            cls._instancia = cls()\n        return cls._instancia\n\ns = Singleton.get_instancia()\nprint(s is not None)`,
        acceptedKeywords: ['None']
      },
      javascript: {
        starterCode: `class Singleton {\n    static #instancia = null;\n    static getInstancia() {\n        if (this.#instancia === ___) {\n            this.#instancia = new Singleton();\n        }\n        return this.#instancia;\n    }\n}\nlet s = Singleton.getInstancia();\nconsole.log(s !== null);`,
        solutionCode: `class Singleton {\n    static #instancia = null;\n    static getInstancia() {\n        if (this.#instancia === null) {\n            this.#instancia = new Singleton();\n        }\n        return this.#instancia;\n    }\n}\nlet s = Singleton.getInstancia();\nconsole.log(s !== null);`,
        acceptedKeywords: ['null']
      },
      java: {
        starterCode: `class Singleton {\n    private static Singleton instancia;\n    private Singleton() {}\n    public static Singleton getInstancia() {\n        if (instancia == ___) {\n            instancia = new Singleton();\n        }\n        return instancia;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Singleton s = Singleton.getInstancia();\n        System.out.println(s != null);\n    }\n}`,
        solutionCode: `class Singleton {\n    private static Singleton instancia;\n    private Singleton() {}\n    public static Singleton getInstancia() {\n        if (instancia == null) {\n            instancia = new Singleton();\n        }\n        return instancia;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Singleton s = Singleton.getInstancia();\n        System.out.println(s != null);\n    }\n}`,
        acceptedKeywords: ['null']
      }
    }
  },
  {
    id: 526,
    title: 'Constructor de Copia (Deep Copy)',
    statement: 'Corrige el constructor de copia para clonar el valor en nueva memoria y no solo copiar el puntero.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Asigna dato = new int(*otro.dato);',
    explanation: 'Una copia profunda asigna nueva memoria para evitar que dos objetos compartan el mismo puntero mutando juntos.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Caja {\npublic:\n    int *dato;\n    Caja(int val) { dato = new int(val); }\n    // Constructor de copia profunda\n    Caja(const Caja &otro) {\n        dato = new int(*otro.dato);\n    }\n    ~Caja() { delete dato; }\n};\n\nint main() {\n    Caja c1(10);\n    Caja c2 = c1;\n    *c2.dato = 99;\n    std::cout << *c1.dato << std::endl; // Debe ser 10 (sin afectar c1)\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Caja {\npublic:\n    int *dato;\n    Caja(int val) { dato = new int(val); }\n    Caja(const Caja &otro) {\n        dato = new int(*otro.dato);\n    }\n    ~Caja() { delete dato; }\n};\n\nint main() {\n    Caja c1(10);\n    Caja c2 = c1;\n    *c2.dato = 99;\n    std::cout << *c1.dato << std::endl;\n    return 0;\n}`
      },
      python: {
        starterCode: `import copy\ndata = [10]\nclon = copy.deepcopy(data)\nclon[0] = 99\nprint(data[0])`,
        solutionCode: `import copy\ndata = [10]\nclon = copy.deepcopy(data)\nclon[0] = 99\nprint(data[0])`
      },
      javascript: {
        starterCode: `let obj = { x: 10 };\nlet clon = JSON.parse(JSON.stringify(obj));\nclon.x = 99;\nconsole.log(obj.x);`,
        solutionCode: `let obj = { x: 10 };\nlet clon = JSON.parse(JSON.stringify(obj));\nclon.x = 99;\nconsole.log(obj.x);`
      },
      java: {
        starterCode: `class Caja implements Cloneable {\n    int val;\n    Caja(int v) { this.val = v; }\n    public Caja clone() { return new Caja(this.val); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Caja c1 = new Caja(10);\n        Caja c2 = c1.clone();\n        c2.val = 99;\n        System.out.println(c1.val);\n    }\n}`,
        solutionCode: `class Caja implements Cloneable {\n    int val;\n    Caja(int v) { this.val = v; }\n    public Caja clone() { return new Caja(this.val); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Caja c1 = new Caja(10);\n        Caja c2 = c1.clone();\n        c2.val = 99;\n        System.out.println(c1.val);\n    }\n}`
      }
    }
  },
  {
    id: 527,
    title: 'Downcasting Seguro (dynamic_cast / instanceof)',
    statement: 'Completa la palabra clave dynamic_cast (o instanceof en Java) para verificar el tipo derivado.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa dynamic_cast en C++ o instanceof en Java.',
    explanation: 'El downcasting seguro valida en tiempo de ejecución si un puntero base apunta realmente a una clase derivada.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Base { public: virtual ~Base() {} };\nclass Derivada : public Base { public: void accion() { std::cout << "OK" << std::endl; } };\n\nint main() {\n    Base *b = new Derivada();\n    Derivada *d = ___<Derivada*>(b);\n    if (d) d->accion();\n    delete b;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Base { public: virtual ~Base() {} };\nclass Derivada : public Base { public: void accion() { std::cout << "OK" << std::endl; } };\n\nint main() {\n    Base *b = new Derivada();\n    Derivada *d = dynamic_cast<Derivada*>(b);\n    if (d) d->accion();\n    delete b;\n    return 0;\n}`,
        acceptedKeywords: ['dynamic_cast']
      },
      python: {
        starterCode: `class Base: pass\nclass Derivada(Base): pass\n\nb = Derivada()\nif ___(b, Derivada):\n    print("OK")`,
        solutionCode: `class Base: pass\nclass Derivada(Base): pass\n\nb = Derivada()\nif isinstance(b, Derivada):\n    print("OK")`,
        acceptedKeywords: ['isinstance']
      },
      javascript: {
        starterCode: `class Base {}\nclass Derivada extends Base {}\n\nlet b = new Derivada();\nif (b ___ Derivada) {\n    console.log("OK");\n}`,
        solutionCode: `class Base {}\nclass Derivada extends Base {}\n\nlet b = new Derivada();\nif (b instanceof Derivada) {\n    console.log("OK");\n}`,
        acceptedKeywords: ['instanceof']
      },
      java: {
        starterCode: `class Base {}\nclass Derivada extends Base {}\npublic class Main {\n    public static void main(String[] args) {\n        Base b = new Derivada();\n        if (b ___ Derivada) {\n            System.out.println("OK");\n        }\n    }\n}`,
        solutionCode: `class Base {}\nclass Derivada extends Base {}\npublic class Main {\n    public static void main(String[] args) {\n        Base b = new Derivada();\n        if (b instanceof Derivada) {\n            System.out.println("OK");\n        }\n    }\n}`,
        acceptedKeywords: ['instanceof']
      }
    }
  },
  {
    id: 528,
    title: 'Destructor Virtual en Clases Base',
    statement: 'Corrige la clase base para declarar su destructor como virtual y evitar fugas de memoria.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Declara virtual ~Base() {} en la clase base polimórfica.',
    explanation: 'Si una clase base polimórfica no tiene destructor virtual, eliminarla mediante un puntero base no ejecutará el destructor derivado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Base {\npublic:\n    // BUG: Debe ser virtual ~Base()\n    virtual ~Base() {\n        std::cout << "Destruyendo Base" << std::endl;\n    }\n};\n\nclass Derivada : public Base {\npublic:\n    ~Derivada() override {\n        std::cout << "Destruyendo Derivada" << std::endl;\n    }\n};\n\nint main() {\n    Base *p = new Derivada();\n    delete p;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Base {\npublic:\n    virtual ~Base() {\n        std::cout << "Destruyendo Base" << std::endl;\n    }\n};\n\nclass Derivada : public Base {\npublic:\n    ~Derivada() override {\n        std::cout << "Destruyendo Derivada" << std::endl;\n    }\n};\n\nint main() {\n    Base *p = new Derivada();\n    delete p;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Base:\n    def __del__(self): print("Destruyendo Base")\nclass Derivada(Base):\n    def __del__(self): print("Destruyendo Derivada")\n\nd = Derivada()\ndel d`,
        solutionCode: `class Base:\n    def __del__(self): print("Destruyendo Base")\nclass Derivada(Base):\n    def __del__(self): print("Destruyendo Derivada")\n\nd = Derivada()\ndel d`
      },
      javascript: {
        starterCode: `class Base {}\nclass Derivada extends Base {}\nlet d = new Derivada();\nconsole.log(d !== null);`,
        solutionCode: `class Base {}\nclass Derivada extends Base {}\nlet d = new Derivada();\nconsole.log(d !== null);`
      },
      java: {
        starterCode: `class Base {}\nclass Derivada extends Base {}\npublic class Main {\n    public static void main(String[] args) {\n        Base b = new Derivada();\n        System.out.println(b != null);\n    }\n}`,
        solutionCode: `class Base {}\nclass Derivada extends Base {}\npublic class Main {\n    public static void main(String[] args) {\n        Base b = new Derivada();\n        System.out.println(b != null);\n    }\n}`
      }
    }
  },
  {
    id: 529,
    title: 'Sobrecarga de Operador (operator+)',
    statement: 'Completa el nombre del método de sobrecarga de operador suma: Vector2D operator___(const Vector2D &otro).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'El operador suma se nombra operator+.',
    explanation: 'La sobrecarga de operadores permite definir comportamientos intuitivos (como + o ==) para clases personalizadas.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n\nclass Vector2D {\npublic:\n    int x, y;\n    Vector2D(int a, int b) : x(a), y(b) {}\n    Vector2D operator___(const Vector2D &otro) const {\n        return Vector2D(x + otro.x, y + otro.y);\n    }\n};\n\nint main() {\n    Vector2D v1(1, 2), v2(3, 4);\n    Vector2D v3 = v1 + v2;\n    std::cout << v3.x << " " << v3.y << std::endl; // 4 6\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n\nclass Vector2D {\npublic:\n    int x, y;\n    Vector2D(int a, int b) : x(a), y(b) {}\n    Vector2D operator+(const Vector2D &otro) const {\n        return Vector2D(x + otro.x, y + otro.y);\n    }\n};\n\nint main() {\n    Vector2D v1(1, 2), v2(3, 4);\n    Vector2D v3 = v1 + v2;\n    std::cout << v3.x << " " << v3.y << std::endl;\n    return 0;\n}`,
        acceptedKeywords: ['+']
      },
      python: {
        starterCode: `class Vector2D:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def _______(self, otro):\n        return Vector2D(self.x + otro.x, self.y + otro.y)\n\nv1, v2 = Vector2D(1, 2), Vector2D(3, 4)\nv3 = v1 + v2\nprint(v3.x, v3.y)`,
        solutionCode: `class Vector2D:\n    def __init__(self, x, y): self.x, self.y = x, y\n    def __add__(self, otro):\n        return Vector2D(self.x + otro.x, self.y + otro.y)\n\nv1, v2 = Vector2D(1, 2), Vector2D(3, 4)\nv3 = v1 + v2\nprint(v3.x, v3.y)`,
        acceptedKeywords: ['add__', '__add__']
      },
      javascript: {
        starterCode: `class Vector2D {\n    constructor(x, y) { this.x = x; this.y = y; }\n    sumar(otro) { return new Vector2D(this.x + otro.x, this.y + otro.y); }\n}\nlet v1 = new Vector2D(1, 2), v2 = new Vector2D(3, 4);\nlet v3 = v1.sumar(v2);\nconsole.log(v3.x, v3.y);`,
        solutionCode: `class Vector2D {\n    constructor(x, y) { this.x = x; this.y = y; }\n    sumar(otro) { return new Vector2D(this.x + otro.x, this.y + otro.y); }\n}\nlet v1 = new Vector2D(1, 2), v2 = new Vector2D(3, 4);\nlet v3 = v1.sumar(v2);\nconsole.log(v3.x, v3.y);`
      },
      java: {
        starterCode: `class Vector2D {\n    int x, y;\n    Vector2D(int x, int y) { this.x = x; this.y = y; }\n    Vector2D sumar(Vector2D otro) { return new Vector2D(this.x + otro.x, this.y + otro.y); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vector2D v1 = new Vector2D(1, 2), v2 = new Vector2D(3, 4);\n        Vector2D v3 = v1.sumar(v2);\n        System.out.println(v3.x + " " + v3.y);\n    }\n}`,
        solutionCode: `class Vector2D {\n    int x, y;\n    Vector2D(int x, int y) { this.x = x; this.y = y; }\n    Vector2D sumar(Vector2D otro) { return new Vector2D(this.x + otro.x, this.y + otro.y); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vector2D v1 = new Vector2D(1, 2), v2 = new Vector2D(3, 4);\n        Vector2D v3 = v1.sumar(v2);\n        System.out.println(v3.x + " " + v3.y);\n    }\n}`
      }
    }
  },
  {
    id: 530,
    title: 'Patrón Factory Method (Creación Polimórfica)',
    statement: 'Corrige la fábrica para retornar una nueva instancia de Perro cuando tipo == "perro".',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Retorna new Perro() / Perro().',
    explanation: 'El patrón Factory delega la creación de objetos derivados a un método centralizado.',
    languages: {
      cpp: {
        starterCode: `#include <iostream>\n#include <string>\n\nclass Mascota { public: virtual void hablar() = 0; };\nclass Perro : public Mascota { public: void hablar() override { std::cout << "Guau" << std::endl; } };\nclass Gato : public Mascota { public: void hablar() override { std::cout << "Miau" << std::endl; } };\n\nclass FabricaMascotas {\npublic:\n    static Mascota* crear(std::string tipo) {\n        if (tipo == "perro") return new Perro();\n        return new Gato();\n    }\n};\n\nint main() {\n    Mascota* m = FabricaMascotas::crear("perro");\n    m->hablar(); // Guau\n    delete m;\n    return 0;\n}`,
        solutionCode: `#include <iostream>\n#include <string>\n\nclass Mascota { public: virtual void hablar() = 0; };\nclass Perro : public Mascota { public: void hablar() override { std::cout << "Guau" << std::endl; } };\nclass Gato : public Mascota { public: void hablar() override { std::cout << "Miau" << std::endl; } };\n\nclass FabricaMascotas {\npublic:\n    static Mascota* crear(std::string tipo) {\n        if (tipo == "perro") return new Perro();\n        return new Gato();\n    }\n};\n\nint main() {\n    Mascota* m = FabricaMascotas::crear("perro");\n    m->hablar();\n    delete m;\n    return 0;\n}`
      },
      python: {
        starterCode: `class Perro: \n    def hablar(self): print("Guau")\nclass Gato: \n    def hablar(self): print("Miau")\n\ndef crear_mascota(tipo):\n    if tipo == "perro": return Perro()\n    return Gato()\n\nm = crear_mascota("perro")\nm.hablar()`,
        solutionCode: `class Perro: \n    def hablar(self): print("Guau")\nclass Gato: \n    def hablar(self): print("Miau")\n\ndef crear_mascota(tipo):\n    if tipo == "perro": return Perro()\n    return Gato()\n\nm = crear_mascota("perro")\nm.hablar()`
      },
      javascript: {
        starterCode: `class Perro { hablar() { console.log("Guau"); } }\nclass Gato { hablar() { console.log("Miau"); } }\nfunction crearMascota(tipo) {\n    if (tipo === "perro") return new Perro();\n    return new Gato();\n}\nlet m = crearMascota("perro");\nm.hablar();`,
        solutionCode: `class Perro { hablar() { console.log("Guau"); } }\nclass Gato { hablar() { console.log("Miau"); } }\nfunction crearMascota(tipo) {\n    if (tipo === "perro") return new Perro();\n    return new Gato();\n}\nlet m = crearMascota("perro");\nm.hablar();`
      },
      java: {
        starterCode: `interface Mascota { void hablar(); }\nclass Perro implements Mascota { public void hablar() { System.out.println("Guau"); } }\nclass Gato implements Mascota { public void hablar() { System.out.println("Miau"); } }\nclass Fabrica {\n    static Mascota crear(String tipo) {\n        if (tipo.equals("perro")) return new Perro();\n        return new Gato();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Mascota m = Fabrica.crear("perro");\n        m.hablar();\n    }\n}`,
        solutionCode: `interface Mascota { void hablar(); }\nclass Perro implements Mascota { public void hablar() { System.out.println("Guau"); } }\nclass Gato implements Mascota { public void hablar() { System.out.println("Miau"); } }\nclass Fabrica {\n    static Mascota crear(String tipo) {\n        if (tipo.equals("perro")) return new Perro();\n        return new Gato();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Mascota m = Fabrica.crear("perro");\n        m.hablar();\n    }\n}`
      }
    }
  }
];
