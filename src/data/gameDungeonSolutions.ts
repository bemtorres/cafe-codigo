export interface GameDungeonSolution {
  python: string;
  java: string;
  csharp: string;
  cpp: string;
  javascript: string;
  php: string;
  pseint: string;
}

export const gameDungeonSolutions: Record<number, GameDungeonSolution> = {
  1: {
    python: `def mostrarMapaMazmorra(matriz):\n    print("🗺️ === MAPA DE LA MAZMORRA ===")\n    for fila in matriz:\n        print(" ".join(fila))\n\nmapa = [\n    ["#", "#", "#", "#", "#"],\n    ["#", "P", ".", "C", "#"],\n    ["#", ".", "#", ".", "#"],\n    ["#", "E", ".", "X", "#"],\n    ["#", "#", "#", "#", "#"]\n]\nmostrarMapaMazmorra(mapa)`,
    java: `public class Main {\n    public static void mostrarMapaMazmorra(char[][] matriz) {\n        System.out.println("🗺️ === MAPA DE LA MAZMORRA ===");\n        for (int r = 0; r < matriz.length; r++) {\n            for (int c = 0; c < matriz[r].length; c++) {\n                System.out.print(matriz[r][c] + " ");\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        char[][] mapa = {\n            {'#', '#', '#', '#', '#'},\n            {'#', 'P', '.', 'C', '#'},\n            {'#', '.', '#', '.', '#'},\n            {'#', 'E', '.', 'X', '#'},\n            {'#', '#', '#', '#', '#'}\n        };\n        mostrarMapaMazmorra(mapa);\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarMapaMazmorra(char[,] matriz) {\n        Console.WriteLine("🗺️ === MAPA DE LA MAZMORRA ===");\n        for (int r = 0; r < matriz.GetLength(0); r++) {\n            for (int c = 0; c < matriz.GetLength(1); c++) {\n                Console.Write(matriz[r, c] + " ");\n            }\n            Console.WriteLine();\n        }\n    }\n    static void Main() {\n        char[,] mapa = {\n            {'#', '#', '#', '#', '#'},\n            {'#', 'P', '.', 'C', '#'},\n            {'#', '.', '#', '.', '#'},\n            {'#', 'E', '.', 'X', '#'},\n            {'#', '#', '#', '#', '#'}\n        };\n        MostrarMapaMazmorra(mapa);\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\nvoid mostrarMapaMazmorra(const std::vector<std::vector<char>>& matriz) {\n    std::cout << "🗺️ === MAPA DE LA MAZMORRA ===\\n";\n    for (const auto& fila : matriz) {\n        for (char c : fila) std::cout << c << " ";\n        std::cout << "\\n";\n    }\n}\nint main() {\n    std::vector<std::vector<char>> mapa = {\n        {'#', '#', '#', '#', '#'},\n        {'#', 'P', '.', 'C', '#'},\n        {'#', '.', '#', '.', '#'},\n        {'#', 'E', '.', 'X', '#'},\n        {'#', '#', '#', '#', '#'}\n    };\n    mostrarMapaMazmorra(mapa);\n    return 0;\n}`,
    javascript: `function mostrarMapaMazmorra(matriz) {\n    console.log("🗺️ === MAPA DE LA MAZMORRA ===");\n    matriz.forEach(fila => console.log(fila.join(" ")));\n}\nconst mapa = [\n    ["#", "#", "#", "#", "#"],\n    ["#", "P", ".", "C", "#"],\n    ["#", ".", "#", ".", "#"],\n    ["#", "E", ".", "X", "#"],\n    ["#", "#", "#", "#", "#"]\n];\nmostrarMapaMazmorra(mapa);`,
    php: `<?php\nfunction mostrarMapaMazmorra($matriz) {\n    echo "🗺️ === MAPA DE LA MAZMORRA ===\\n";\n    foreach ($matriz as $fila) {\n        echo implode(" ", $fila) . "\\n";\n    }\n}\n$mapa = [\n    ["#", "#", "#", "#", "#"],\n    ["#", "P", ".", "C", "#"],\n    ["#", ".", "#", ".", "#"],\n    ["#", "E", ".", "X", "#"],\n    ["#", "#", "#", "#", "#"]\n];\nmostrarMapaMazmorra($mapa);\n?>`,
    pseint: `SubProceso mostrarMapaMazmorra(mapa)\n    Escribir "🗺️ === MAPA DE LA MAZMORRA ==="\n    Escribir "# # # # #"\n    Escribir "# P . C #"\n    Escribir "# . # . #"\n    Escribir "# E . X #"\n    Escribir "# # # # #"\nFinSubProceso\n\nAlgoritmo Principal\n    mostrarMapaMazmorra("")\nFinAlgoritmo`
  }
};

for (let i = 2; i <= 20; i++) {
  gameDungeonSolutions[i] = {
    python: `# Misión de Mazmorra ${i}\ndef explorarCeldaMazmorra${i}(mapa, x, y):\n    print(f"🧭 Explorando coordenadas de mazmorra en ({x}, {y})")\n    return f"Celda [{x},{y}] despejada"\n\nprint(explorarCeldaMazmorra${i}([[]], 2, 3))`,
    java: `public class Main {\n    public static String explorarCeldaMazmorra${i}(int x, int y) {\n        System.out.println("🧭 Explorando coordenadas (" + x + ", " + y + ")");\n        return "Celda [" + x + "," + y + "] despejada";\n    }\n    public static void main(String[] args) {\n        System.out.println(explorarCeldaMazmorra${i}(2, 3));\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static string ExplorarCeldaMazmorra${i}(int x, int y) {\n        Console.WriteLine($"🧭 Explorando coordenadas ({x}, {y})");\n        return $"Celda [{x},{y}] despejada";\n    }\n    static void Main() {\n        Console.WriteLine(ExplorarCeldaMazmorra${i}(2, 3));\n    }\n}`,
    cpp: `#include <iostream>\n#include <string>\nstd::string explorarCeldaMazmorra${i}(int x, int y) {\n    return "Celda despejada";\n}\nint main() {\n    std::cout << explorarCeldaMazmorra${i}(2, 3) << "\\n";\n    return 0;\n}`,
    javascript: `function explorarCeldaMazmorra${i}(x, y) {\n    console.log(\`🧭 Explorando coordenadas (\${x}, \${y})\`);\n    return \`Celda [\${x},\${y}] despejada\`;\n}\nconsole.log(explorarCeldaMazmorra${i}(2, 3));`,
    php: `<?php\nfunction explorarCeldaMazmorra${i}($x, $y) {\n    return "Celda [$x,$y] despejada";\n}\necho explorarCeldaMazmorra${i}(2, 3) . "\\n";\n?>`,
    pseint: `SubProceso res <- explorarCeldaMazmorra${i}(x, y)\n    res <- "Celda despejada"\nFinSubProceso\n\nAlgoritmo Principal\n    Escribir explorarCeldaMazmorra${i}(2, 3)\nFinAlgoritmo`
  };
}
