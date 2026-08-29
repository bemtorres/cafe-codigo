export interface GameHeroPooSolution {
  python: string;
  java: string;
  csharp: string;
  cpp: string;
  javascript: string;
  php: string;
  pseint: string;
}

export const gameHeroPooSolutions: Record<number, GameHeroPooSolution> = {
  1: {
    python: `class Personaje:\n    def __init__(self, nombre, salud, nivel):\n        self.nombre = nombre\n        self.salud = salud\n        self.nivel = nivel\n\n    def mostrarFicha(self):\n        print(f"👤 [{self.nombre}] - Nivel {self.nivel} | HP: {self.salud}")\n\nheroe = Personaje("Arthur", 1200, 15)\nheroe.mostrarFicha()`,
    java: `public class Personaje {\n    private String nombre;\n    private int salud;\n    private int nivel;\n\n    public Personaje(String nombre, int salud, int nivel) {\n        this.nombre = nombre;\n        this.salud = salud;\n        this.nivel = nivel;\n    }\n\n    public void mostrarFicha() {\n        System.out.println("👤 [" + nombre + "] - Nivel " + nivel + " | HP: " + salud);\n    }\n\n    public static void main(String[] args) {\n        Personaje heroe = new Personaje("Arthur", 1200, 15);\n        heroe.mostrarFicha();\n    }\n}`,
    csharp: `using System;\nclass Personaje {\n    public string Nombre { get; set; }\n    public int Salud { get; set; }\n    public int Nivel { get; set; }\n\n    public Personaje(string nombre, int salud, int nivel) {\n        Nombre = nombre;\n        Salud = salud;\n        Nivel = nivel;\n    }\n\n    public void MostrarFicha() {\n        Console.WriteLine($"👤 [{Nombre}] - Nivel {Nivel} | HP: {Salud}");\n    }\n}\nclass Program {\n    static void Main() {\n        var heroe = new Personaje("Arthur", 1200, 15);\n        heroe.MostrarFicha();\n    }\n}`,
    cpp: `#include <iostream>\n#include <string>\nclass Personaje {\npublic:\n    std::string nombre;\n    int salud;\n    int nivel;\n    Personaje(std::string n, int s, int lvl) : nombre(n), salud(s), nivel(lvl) {}\n    void mostrarFicha() {\n        std::cout << "👤 [" << nombre << "] - Nivel " << nivel << " | HP: " << salud << "\\n";\n    }\n};\nint main() {\n    Personaje heroe("Arthur", 1200, 15);\n    heroe.mostrarFicha();\n    return 0;\n}`,
    javascript: `class Personaje {\n    constructor(nombre, salud, nivel) {\n        this.nombre = nombre;\n        this.salud = salud;\n        this.nivel = nivel;\n    }\n    mostrarFicha() {\n        console.log(\`👤 [\${this.nombre}] - Nivel \${this.nivel} | HP: \${this.salud}\`);\n    }\n}\nconst heroe = new Personaje("Arthur", 1200, 15);\nheroe.mostrarFicha();`,
    php: `<?php\nclass Personaje {\n    public $nombre;\n    public $salud;\n    public $nivel;\n    public function __construct($nombre, $salud, $nivel) {\n        $this->nombre = $nombre;\n        $this->salud = $salud;\n        $this->nivel = $nivel;\n    }\n    public function mostrarFicha() {\n        echo "👤 [{$this->nombre}] - Nivel {$this->nivel} | HP: {$this->salud}\\n";\n    }\n}\n$heroe = new Personaje("Arthur", 1200, 15);\n$heroe->mostrarFicha();\n?>`,
    pseint: `SubProceso mostrarFichaHeroe(nombre, salud, nivel)\n    Escribir "👤 [", nombre, "] - Nivel ", nivel, " | HP: ", salud\nFinSubProceso\n\nAlgoritmo Principal\n    mostrarFichaHeroe("Arthur", 1200, 15)\nFinAlgoritmo`
  }
};

for (let i = 2; i <= 20; i++) {
  gameHeroPooSolutions[i] = {
    python: `# Misión POO Gamer ${i}\nclass HeroeMision${i}:\n    def __init__(self, nombre, rol):\n        self.nombre = nombre\n        self.rol = rol\n    def ejecutarHabilidad(self):\n        return f"⚔️ [{self.nombre} - {self.rol}] desata su habilidad especial"\n\nheroe = HeroeMision${i}("Valiant", "Guerrero")\nprint(heroe.ejecutarHabilidad())`,
    java: `public class HeroeMision${i} {\n    private String nombre;\n    private String rol;\n    public HeroeMision${i}(String n, String r) { this.nombre = n; this.rol = r; }\n    public String ejecutarHabilidad() {\n        return "⚔️ [" + nombre + " - " + rol + "] desata su habilidad especial";\n    }\n    public static void main(String[] args) {\n        HeroeMision${i} h = new HeroeMision${i}("Valiant", "Guerrero");\n        System.out.println(h.ejecutarHabilidad());\n    }\n}`,
    csharp: `using System;\nclass HeroeMision${i} {\n    public string Nombre { get; set; }\n    public string Rol { get; set; }\n    public HeroeMision${i}(string n, string r) { Nombre = n; Rol = r; }\n    public string EjecutarHabilidad() => $"⚔️ [{Nombre} - {Rol}] desata su habilidad especial";\n}\nclass Program {\n    static void Main() {\n        var h = new HeroeMision${i}("Valiant", "Guerrero");\n        Console.WriteLine(h.EjecutarHabilidad());\n    }\n}`,
    cpp: `#include <iostream>\n#include <string>\nclass HeroeMision${i} {\npublic:\n    std::string nombre, rol;\n    HeroeMision${i}(std::string n, std::string r) : nombre(n), rol(r) {}\n    std::string ejecutarHabilidad() { return "⚔️ [" + nombre + " - " + rol + "] desata su habilidad especial"; }\n};\nint main() {\n    HeroeMision${i} h("Valiant", "Guerrero");\n    std::cout << h.ejecutarHabilidad() << "\\n";\n    return 0;\n}`,
    javascript: `class HeroeMision${i} {\n    constructor(nombre, rol) {\n        this.nombre = nombre;\n        this.rol = rol;\n    }\n    ejecutarHabilidad() {\n        return \`⚔️ [\${this.nombre} - \${this.rol}] desata su habilidad especial\`;\n    }\n}\nconst h = new HeroeMision${i}("Valiant", "Guerrero");\nconsole.log(h.ejecutarHabilidad());`,
    php: `<?php\nclass HeroeMision${i} {\n    public $nombre; public $rol;\n    public function __construct($n, $r) { $this->nombre = $n; $this->rol = $r; }\n    public function ejecutarHabilidad() { return "⚔️ [{$this->nombre} - {$this->rol}] desata su habilidad especial"; }\n}\n$h = new HeroeMision${i}("Valiant", "Guerrero");\necho $h->ejecutarHabilidad() . "\\n";\n?>`,
    pseint: `SubProceso res <- ejecutarHabilidad(nombre, rol)\n    res <- "⚔️ Habilidad desatada con éxito"\nFinSubProceso\n\nAlgoritmo Principal\n    Escribir ejecutarHabilidad("Valiant", "Guerrero")\nFinAlgoritmo`
  };
}
