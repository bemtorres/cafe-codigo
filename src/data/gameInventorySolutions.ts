export interface GameInventorySolution {
  python: string;
  java: string;
  csharp: string;
  cpp: string;
  javascript: string;
  php: string;
  pseint: string;
}

export const gameInventorySolutions: Record<number, GameInventorySolution> = {
  1: {
    python: `def mostrarInventario(items):\n    print("🎒 === MOCHILA DE AVENTURERO ===")\n    for i, item in enumerate(items, 1):\n        print(f"Slot [{i}]: {item}")\n\nmochila = ["Espada de Hierro", "Poción de Salud", "Antorcha", "Cuerda"]\nmostrarInventario(mochila)`,
    java: `public class Main {\n    public static void mostrarInventario(String[] items) {\n        System.out.println("🎒 === MOCHILA DE AVENTURERO ===");\n        for (int i = 0; i < items.length; i++) {\n            System.out.println("Slot [" + (i + 1) + "]: " + items[i]);\n        }\n    }\n    public static void main(String[] args) {\n        String[] mochila = {"Espada de Hierro", "Poción de Salud", "Antorcha", "Cuerda"};\n        mostrarInventario(mochila);\n    }\n}`,
    csharp: `using System;\nclass Program {\n    static void MostrarInventario(string[] items) {\n        Console.WriteLine("🎒 === MOCHILA DE AVENTURERO ===");\n        for (int i = 0; i < items.Length; i++) {\n            Console.WriteLine($"Slot [{i + 1}]: {items[i]}");\n        }\n    }\n    static void Main() {\n        string[] mochila = {"Espada de Hierro", "Poción de Salud", "Antorcha", "Cuerda"};\n        MostrarInventario(mochila);\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\n#include <string>\nvoid mostrarInventario(const std::vector<std::string>& items) {\n    std::cout << "🎒 === MOCHILA DE AVENTURERO ===\\n";\n    for (size_t i = 0; i < items.size(); i++) {\n        std::cout << "Slot [" << (i + 1) << "]: " << items[i] << "\\n";\n    }\n}\nint main() {\n    std::vector<std::string> mochila = {"Espada de Hierro", "Pocion de Salud", "Antorcha", "Cuerda"};\n    mostrarInventario(mochila);\n    return 0;\n}`,
    javascript: `function mostrarInventario(items) {\n    console.log("🎒 === MOCHILA DE AVENTURERO ===");\n    items.forEach((item, i) => {\n        console.log(\`Slot [\${i + 1}]: \${item}\`);\n    });\n}\nconst mochila = ["Espada de Hierro", "Poción de Salud", "Antorcha", "Cuerda"];\nmostrarInventario(mochila);`,
    php: `<?php\nfunction mostrarInventario($items) {\n    echo "🎒 === MOCHILA DE AVENTURERO ===\\n";\n    foreach ($items as $i => $item) {\n        echo "Slot [" . ($i + 1) . "]: $item\\n";\n    }\n}\n$mochila = ["Espada de Hierro", "Poción de Salud", "Antorcha", "Cuerda"];\nmostrarInventario($mochila);\n?>`,
    pseint: `SubProceso mostrarInventario(items, n)\n    Escribir "🎒 === MOCHILA DE AVENTURERO ==="\n    Para i <- 1 Hasta n Hacer\n        Escribir "Slot [", i, "]: ", items[i]\n    FinPara\nFinSubProceso\n\nAlgoritmo Principal\n    Dimension mochila[4]\n    mochila[1] <- "Espada de Hierro"\n    mochila[2] <- "Poción de Salud"\n    mochila[3] <- "Antorcha"\n    mochila[4] <- "Cuerda"\n    mostrarInventario(mochila, 4)\nFinAlgoritmo`
  }
};

for (let i = 2; i <= 25; i++) {
  gameInventorySolutions[i] = {
    python: `# Misión de Inventario ${i}\ndef gestionarLootMision${i}(inventario, item):\n    print(f"📦 Procesando slot en inventario para {item}")\n    inventario.append(item)\n    return inventario\n\nprint(gestionarLootMision${i}(["Escudo", "Arco"], "Gema Arcana"))`,
    java: `import java.util.*;\npublic class Main {\n    public static List<String> gestionarLootMision${i}(List<String> inv, String item) {\n        System.out.println("📦 Procesando slot para: " + item);\n        inv.add(item);\n        return inv;\n    }\n    public static void main(String[] args) {\n        List<String> inv = new ArrayList<>(Arrays.asList("Escudo", "Arco"));\n        System.out.println(gestionarLootMision${i}(inv, "Gema Arcana"));\n    }\n}`,
    csharp: `using System;\nusing System.Collections.Generic;\nclass Program {\n    static List<string> GestionarLootMision${i}(List<string> inv, string item) {\n        Console.WriteLine($"📦 Procesando slot para: {item}");\n        inv.Add(item);\n        return inv;\n    }\n    static void Main() {\n        var inv = new List<string> { "Escudo", "Arco" };\n        Console.WriteLine(string.Join(", ", GestionarLootMision${i}(inv, "Gema Arcana")));\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\n#include <string>\nstd::vector<std::string> gestionarLootMision${i}(std::vector<std::string> inv, std::string item) {\n    inv.push_back(item);\n    return inv;\n}\nint main() {\n    std::vector<std::string> inv = {"Escudo", "Arco"};\n    auto res = gestionarLootMision${i}(inv, "Gema Arcana");\n    std::cout << "Slots ocupados: " << res.size() << "\\n";\n    return 0;\n}`,
    javascript: `function gestionarLootMision${i}(inv, item) {\n    console.log(\`📦 Procesando slot para \${item}\`);\n    return [...inv, item];\n}\nconsole.log(gestionarLootMision${i}(["Escudo", "Arco"], "Gema Arcana"));`,
    php: `<?php\nfunction gestionarLootMision${i}($inv, $item) {\n    $inv[] = $item;\n    return $inv;\n}\nprint_r(gestionarLootMision${i}(["Escudo", "Arco"], "Gema Arcana"));\n?>`,
    pseint: `SubProceso gestionarLootMision${i}(item)\n    Escribir "📦 Procesando slot para: ", item\nFinSubProceso\n\nAlgoritmo Principal\n    gestionarLootMision${i}("Gema Arcana")\nFinAlgoritmo`
  };
}
