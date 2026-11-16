import type { GameProject } from '../gameProjectsData';

export const project4Minecraft: GameProject = {
  id: 4,
  slug: 'minecraft-survival',
  number: '04',
  title: 'Minecraft Survival CLI',
  subtitle: 'Simulador de recolección de bloques, crafteo de herramientas y minería profunda',
  icon: '⛏️',
  accentColor: '#10b981',
  badge: 'PROYECTO 4 · CRAFTING',
  difficulty: 'Básico - Intermedio',
  story: 'Apareces en un mundo cúbico infinito generado proceduralmente. Para sobrevivir a la noche deberás recolectar madera, picar roca en las canteras, craftear tu primera espada y adentrarte en las cavernas subterráneas en busca de diamantes.',
  objective: 'Desarrollar un simulador de inventario y crafteo utilizando bucles for para recolectar recursos, validaciones condicionales if/else para recetas de crafteo y menús de consola.',
  initialInputs: [
    'Nombre del jugador (texto)',
    'Semilla / Nombre del mundo (texto)'
  ],
  variables: [
    { name: 'madera', type: 'int', initialValue: '0', description: 'Troncos de madera recolectados' },
    { name: 'piedra', type: 'int', initialValue: '0', description: 'Bloques de adoquín minados' },
    { name: 'diamantes', type: 'int', initialValue: '0', description: 'Gemas raras obtenidas en la mina' },
    { name: 'espada', type: 'int', initialValue: '0', description: 'Cantidad de espadas crafteadas' }
  ],
  menuOptions: [
    {
      option: '1',
      title: 'Cortar Madera (Talar 4 Árboles)',
      description: 'Bucle for que tala 4 árboles consecutivamente sumando +3 de madera en cada ciclo.',
      logic: 'for (int arbol = 1; arbol <= 4; arbol++) { madera += 3; }'
    },
    {
      option: '2',
      title: 'Minar Piedra',
      description: 'Pica bloques en la cantera superficial sumando +6 de adoquín al inventario.',
      logic: 'piedra += 6;'
    },
    {
      option: '3',
      title: 'Buscar Diamantes (Mina Profunda)',
      description: 'Expedición subterránea condicionada a tener al menos 1 espada para defensa.',
      logic: 'if (espada >= 1) { diamantes += 2; } else { mensaje de advertencia }'
    },
    {
      option: '4',
      title: 'Crear Espada en Mesa de Trabajo',
      description: 'Craftea 1 espada descontando 10 de madera y 5 de piedra.',
      logic: 'if (madera >= 10 && piedra >= 5) { madera -= 10; piedra -= 5; espada++; }'
    },
    {
      option: '5',
      title: 'Ver Inventario Completo',
      description: 'Muestra la cantidad actual de Madera, Piedra, Diamantes y Espadas.',
      logic: 'Imprime el inventario en pantalla.'
    },
    {
      option: '6',
      title: 'Guardar y Salir',
      description: 'Finaliza la partida de supervivencia.',
      logic: 'opcion = 6; Finaliza el bucle while.'
    }
  ],
  rules: [
    'No se puede fabricar una espada si faltan madera (< 10) o piedra (< 5).',
    'No se permite entrar a la mina profunda a buscar diamantes sin tener una espada en el inventario.',
    'El menú debe ejecutarse continuamente hasta que el usuario decida salir.'
  ],
  extraChallenges: [
    'Horno y Carbón: Crear un horno con 8 de piedra para cocinar y fundir minerales.',
    'Pico de Hierro: Requerir pico para poder picar diamantes en lugar de solo espada.',
    'Ataque de Creeper: Posibilidad de explosión que destruya parte del inventario si no se tiene escudo.'
  ],
  steps: [
    { id: 'p4_s1', title: 'Inicialización de Inventario', desc: 'Crear variables madera=0, piedra=0, diamantes=0 y espada=0.' },
    { id: 'p4_s2', title: 'Tala de Árboles con bucle for', desc: 'Simular la tala progresiva sumando madera por cada árbol.' },
    { id: 'p4_s3', title: 'Validación de Crafteo con if', desc: 'Comprobar si madera >= 10 y piedra >= 5 para fabricar la espada.' },
    { id: 'p4_s4', title: 'Desbloqueo de Diamantes Condicional', desc: 'Permitir minar diamantes solo cuando espada >= 1.' }
  ],
  consolePreview: `================================================
            MINECRAFT SURVIVAL CLI              
================================================
Jugador: Steve | Mundo: SurvivalAlpha

-------------- MENÚ DE CRAFTEO --------------
1. Cortar madera (Talar 4 árboles)
2. Minar piedra
3. Buscar diamantes (Requiere espada)
4. Crear espada (10 Madera + 5 Piedra)
5. Ver inventario
6. Guardar y Salir
Elige una opción: 1

--- Talando zona boscosa ---
Árbol 1 talado: +3 de madera (Total: 3)
Árbol 2 talado: +3 de madera (Total: 6)
Árbol 3 talado: +3 de madera (Total: 9)
Árbol 4 talado: +3 de madera (Total: 12)
¡Madera total en inventario: 12!`,
  solutions: {
    csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("            MINECRAFT SURVIVAL CLI              ");
        Console.WriteLine("================================================");

        // 1. Datos iniciales del jugador y mundo
        Console.Write("Nombre del jugador: ");
        string jugador = Console.ReadLine();

        Console.Write("Nombre del mundo: ");
        string mundo = Console.ReadLine();

        // 2. Variables de recursos e inventario
        int madera = 0;
        int piedra = 0;
        int diamantes = 0;
        int espada = 0;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 6)
        {
            Console.WriteLine("");
            Console.WriteLine("===== MUNDO: " + mundo + " | Jugador: " + jugador + " =====");
            Console.WriteLine("1. Cortar madera (Talar 4 árboles)");
            Console.WriteLine("2. Minar piedra");
            Console.WriteLine("3. Buscar diamantes (Requiere espada)");
            Console.WriteLine("4. Crear espada (10 Madera + 5 Piedra)");
            Console.WriteLine("5. Ver inventario");
            Console.WriteLine("6. Guardar y Salir");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida. Ingresa un número del 1 al 6.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("");
                    Console.WriteLine("--- Talando zona boscosa con hacha ---");

                    // Bucle for para talar 4 árboles
                    for (int arbol = 1; arbol <= 4; arbol++)
                    {
                        madera += 3;
                        Console.WriteLine("Árbol " + arbol + " talado: +3 de madera (Total: " + madera + ")");
                    }
                    break;

                case 2:
                    piedra += 6;
                    Console.WriteLine("");
                    Console.WriteLine("[⛏️] Has picado bloques de roca en la cantera.");
                    Console.WriteLine("    +6 de piedra obtenida (Total: " + piedra + ").");
                    break;

                case 3:
                    if (espada > 0)
                    {
                        diamantes += 2;
                        Console.WriteLine("");
                        Console.WriteLine("💎 ¡Increíble! Exploraste las cavernas oscuras y hallaste 2 diamantes.");
                        Console.WriteLine("   Total de diamantes en el cofre: " + diamantes);
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte de los monstruos.");
                    }
                    break;

                case 4:
                    if (madera >= 10 && piedra >= 5)
                    {
                        madera -= 10;
                        piedra -= 5;
                        espada++;
                        Console.WriteLine("");
                        Console.WriteLine("⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!");
                        Console.WriteLine("   Espadas disponibles: " + espada);
                        Console.WriteLine("   Madera restante: " + madera + " | Piedra restante: " + piedra);
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("[!] Materiales insuficientes para fabricar la espada.");
                        Console.WriteLine("    Requieres: 10 de madera (Tienes: " + madera + ") y 5 de piedra (Tienes: " + piedra + ").");
                    }
                    break;

                case 5:
                    Console.WriteLine("");
                    Console.WriteLine("================ INVENTARIO DEL JUGADOR ================");
                    Console.WriteLine("Jugador:   " + jugador);
                    Console.WriteLine("Mundo:     " + mundo);
                    Console.WriteLine("Madera:    " + madera + " troncos");
                    Console.WriteLine("Piedra:    " + piedra + " bloques");
                    Console.WriteLine("Diamantes: " + diamantes + " gemas");
                    Console.WriteLine("Espadas:   " + espada + " unidades");
                    Console.WriteLine("========================================================");
                    break;

                case 6:
                    Console.WriteLine("");
                    Console.WriteLine("¡Mundo guardado exitosamente! Hasta la próxima, " + jugador + ".");
                    break;

                default:
                    Console.WriteLine("");
                    Console.WriteLine(">> Opción no reconocida. Intenta de nuevo.");
                    break;
            }
        }
    }
}`,
    python: `def main():
    print("================================================")
    print("            MINECRAFT SURVIVAL CLI              ")
    print("================================================")

    # 1. Datos iniciales
    jugador = input("Nombre del jugador: ")
    mundo = input("Nombre del mundo: ")

    # 2. Variables de inventario
    madera = 0
    piedra = 0
    diamantes = 0
    espada = 0
    opcion = 0

    # 3. Bucle interactivo principal
    while opcion != 6:
        print("")
        print("===== MUNDO: " + mundo + " | Jugador: " + jugador + " =====")
        print("1. Cortar madera (Talar 4 árboles)")
        print("2. Minar piedra")
        print("3. Buscar diamantes (Requiere espada)")
        print("4. Crear espada (10 Madera + 5 Piedra)")
        print("5. Ver inventario")
        print("6. Guardar y Salir")

        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida. Ingresa un número.")
            continue

        if opcion == 1:
            print("")
            print("--- Talando zona boscosa con hacha ---")

            # Bucle for para talar 4 árboles
            for arbol in range(1, 5):
                madera += 3
                print("Árbol " + str(arbol) + " talado: +3 de madera (Total: " + str(madera) + ")")

        elif opcion == 2:
            piedra += 6
            print("")
            print("[⛏️] Has picado bloques de roca en la cantera.")
            print("    +6 de piedra obtenida (Total: " + str(piedra) + ").")

        elif opcion == 3:
            if espada > 0:
                diamantes += 2
                print("")
                print("💎 ¡Increíble! Exploraste las cavernas oscuras y hallaste 2 diamantes.")
                print("   Total de diamantes en el cofre: " + str(diamantes))
            else:
                print("")
                print("⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte.")

        elif opcion == 4:
            if madera >= 10 and piedra >= 5:
                madera -= 10
                piedra -= 5
                espada += 1
                print("")
                print("⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!")
                print("   Espadas disponibles: " + str(espada))
                print("   Madera restante: " + str(madera) + " | Piedra restante: " + str(piedra))
            else:
                print("")
                print("[!] Materiales insuficientes para fabricar la espada.")
                print("    Requieres: 10 de madera (Tienes: " + str(madera) + ") y 5 de piedra (Tienes: " + str(piedra) + ").")

        elif opcion == 5:
            print("")
            print("================ INVENTARIO DEL JUGADOR ================")
            print("Jugador:   " + jugador)
            print("Mundo:     " + mundo)
            print("Madera:    " + str(madera) + " troncos")
            print("Piedra:    " + str(piedra) + " bloques")
            print("Diamantes: " + str(diamantes) + " gemas")
            print("Espadas:   " + str(espada) + " unidades")
            print("========================================================")

        elif opcion == 6:
            print("")
            print("¡Mundo guardado exitosamente! Hasta la próxima, " + jugador + ".")

        else:
            print("")
            print(">> Opción no reconocida. Intenta de nuevo.")

if __name__ == '__main__':
    main()`,
    java: `import java.util.Scanner;

public class MinecraftSurvival {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("================================================");
        System.out.println("            MINECRAFT SURVIVAL CLI              ");
        System.out.println("================================================");

        // 1. Datos iniciales
        System.out.print("Nombre del jugador: ");
        String jugador = sc.nextLine();

        System.out.print("Nombre del mundo: ");
        String mundo = sc.nextLine();

        // 2. Variables de inventario
        int madera = 0;
        int piedra = 0;
        int diamantes = 0;
        int espada = 0;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 6) {
            System.out.println("");
            System.out.println("===== MUNDO: " + mundo + " | Jugador: " + jugador + " =====");
            System.out.println("1. Cortar madera (Talar 4 árboles)");
            System.out.println("2. Minar piedra");
            System.out.println("3. Buscar diamantes (Requiere espada)");
            System.out.println("4. Crear espada (10 Madera + 5 Piedra)");
            System.out.println("5. Ver inventario");
            System.out.println("6. Guardar y Salir");
            System.out.print("Elige una opción: ");

            if (!sc.hasNextInt()) {
                System.out.println(">> Opción inválida. Ingresa un número.");
                sc.next();
                continue;
            }
            opcion = sc.nextInt();

            if (opcion == 1) {
                System.out.println("");
                System.out.println("--- Talando zona boscosa con hacha ---");

                // Bucle for para talar 4 árboles
                for (int arbol = 1; arbol <= 4; arbol++) {
                    madera += 3;
                    System.out.println("Árbol " + arbol + " talado: +3 de madera (Total: " + madera + ")");
                }
            } else if (opcion == 2) {
                piedra += 6;
                System.out.println("");
                System.out.println("[⛏️] Has picado bloques de roca en la cantera.");
                System.out.println("    +6 de piedra obtenida (Total: " + piedra + ").");
            } else if (opcion == 3) {
                if (espada > 0) {
                    diamantes += 2;
                    System.out.println("");
                    System.out.println("💎 ¡Increíble! Exploraste las cavernas oscuras y hallaste 2 diamantes.");
                    System.out.println("   Total de diamantes en el cofre: " + diamantes);
                } else {
                    System.out.println("");
                    System.out.println("⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte.");
                }
            } else if (opcion == 4) {
                if (madera >= 10 && piedra >= 5) {
                    madera -= 10;
                    piedra -= 5;
                    espada++;
                    System.out.println("");
                    System.out.println("⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!");
                    System.out.println("   Espadas disponibles: " + espada);
                    System.out.println("   Madera restante: " + madera + " | Piedra restante: " + piedra);
                } else {
                    System.out.println("");
                    System.out.println("[!] Materiales insuficientes para fabricar la espada.");
                    System.out.println("    Requieres: 10 de madera (Tienes: " + madera + ") y 5 de piedra (Tienes: " + piedra + ").");
                }
            } else if (opcion == 5) {
                System.out.println("");
                System.out.println("================ INVENTARIO DEL JUGADOR ================");
                System.out.println("Jugador:   " + jugador);
                System.out.println("Mundo:     " + mundo);
                System.out.println("Madera:    " + madera + " troncos");
                System.out.println("Piedra:    " + piedra + " bloques");
                System.out.println("Diamantes: " + diamantes + " gemas");
                System.out.println("Espadas:   " + espada + " unidades");
                System.out.println("========================================================");
            } else if (opcion == 6) {
                System.out.println("");
                System.out.println("¡Mundo guardado exitosamente! Hasta la próxima, " + jugador + ".");
            } else {
                System.out.println("");
                System.out.println(">> Opción no reconocida. Intenta de nuevo.");
            }
        }
    }
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "================================================" << endl;
    cout << "            MINECRAFT SURVIVAL CLI              " << endl;
    cout << "================================================" << endl;

    // 1. Datos iniciales
    string jugador;
    cout << "Nombre del jugador: ";
    cin >> jugador;

    string mundo;
    cout << "Nombre del mundo: ";
    cin >> mundo;

    // 2. Variables de inventario
    int madera = 0;
    int piedra = 0;
    int diamantes = 0;
    int espada = 0;
    int opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion != 6) {
        cout << endl;
        cout << "===== MUNDO: " + mundo + " | Jugador: " + jugador + " =====" << endl;
        cout << "1. Cortar madera (Talar 4 arboles)" << endl;
        cout << "2. Minar piedra" << endl;
        cout << "3. Buscar diamantes (Requiere espada)" << endl;
        cout << "4. Crear espada (10 Madera + 5 Piedra)" << endl;
        cout << "5. Ver inventario" << endl;
        cout << "6. Guardar y Salir" << endl;
        cout << "Elige una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            cout << endl;
            cout << "--- Talando zona boscosa con hacha ---" << endl;

            // Bucle for para talar 4 árboles
            for (int arbol = 1; arbol <= 4; arbol++) {
                madera += 3;
                cout << "Arbol " << arbol << " talado: +3 de madera (Total: " << madera << ")" << endl;
            }
        } else if (opcion == 2) {
            piedra += 6;
            cout << endl;
            cout << "[⛏️] Has picado bloques de roca en la cantera." << endl;
            cout << "    +6 de piedra obtenida (Total: " << piedra << ")." << endl;
        } else if (opcion == 3) {
            if (espada > 0) {
                diamantes += 2;
                cout << endl;
                cout << "💎 ¡Increible! Exploraste las cavernas oscuras y hallaste 2 diamantes." << endl;
                cout << "   Total de diamantes en el cofre: " << diamantes << endl;
            } else {
                cout << endl;
                cout << "⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte." << endl;
            }
        } else if (opcion == 4) {
            if (madera >= 10 && piedra >= 5) {
                madera -= 10;
                piedra -= 5;
                espada++;
                cout << endl;
                cout << "⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!" << endl;
                cout << "   Espadas disponibles: " << espada << endl;
                cout << "   Madera restante: " << madera << " | Piedra restante: " << piedra << endl;
            } else {
                cout << endl;
                cout << "[!] Materiales insuficientes para fabricar la espada." << endl;
                cout << "    Requieres: 10 de madera (Tienes: " << madera << ") y 5 de piedra (Tienes: " << piedra << ")." << endl;
            }
        } else if (opcion == 5) {
            cout << endl;
            cout << "================ INVENTARIO DEL JUGADOR ================" << endl;
            cout << "Jugador:   " << jugador << endl;
            cout << "Mundo:     " << mundo << endl;
            cout << "Madera:    " << madera << " troncos" << endl;
            cout << "Piedra:    " << piedra << " bloques" << endl;
            cout << "Diamantes: " << diamantes << " gemas" << endl;
            cout << "Espadas:   " << espada << " unidades" << endl;
            cout << "========================================================" << endl;
        } else if (opcion == 6) {
            cout << endl;
            cout << "¡Mundo guardado exitosamente! Hasta la proxima, " + jugador + "." << endl;
        } else {
            cout << endl;
            cout << ">> Opcion no reconocida. Intenta de nuevo." << endl;
        }
    }

    return 0;
}`,
    javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("================================================");
    console.log("            MINECRAFT SURVIVAL CLI              ");
    console.log("================================================");

    // 1. Datos iniciales
    const jugador = await ask("Nombre del jugador: ");
    const mundo = await ask("Nombre del mundo: ");

    // 2. Variables de inventario
    let madera = 0;
    let piedra = 0;
    let diamantes = 0;
    let espada = 0;
    let opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion !== 6) {
        console.log("");
        console.log("===== MUNDO: " + mundo + " | Jugador: " + jugador + " =====");
        console.log("1. Cortar madera (Talar 4 árboles)");
        console.log("2. Minar piedra");
        console.log("3. Buscar diamantes (Requiere espada)");
        console.log("4. Crear espada (10 Madera + 5 Piedra)");
        console.log("5. Ver inventario");
        console.log("6. Guardar y Salir");

        const resp = await ask("Elige una opción: ");
        opcion = parseInt(resp, 10);

        if (isNaN(opcion)) {
            console.log(">> Opción inválida. Ingresa un número.");
            continue;
        }

        if (opcion === 1) {
            console.log("");
            console.log("--- Talando zona boscosa con hacha ---");

            for (let arbol = 1; arbol <= 4; arbol++) {
                madera += 3;
                console.log("Árbol " + arbol + " talado: +3 de madera (Total: " + madera + ")");
            }
        } else if (opcion === 2) {
            piedra += 6;
            console.log("");
            console.log("[⛏️] Has picado bloques de roca en la cantera.");
            console.log("    +6 de piedra obtenida (Total: " + piedra + ").");
        } else if (opcion === 3) {
            if (espada > 0) {
                diamantes += 2;
                console.log("");
                console.log("💎 ¡Increíble! Exploraste las cavernas oscuras y hallaste 2 diamantes.");
                console.log("   Total de diamantes en el cofre: " + diamantes);
            } else {
                console.log("");
                console.log("⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte.");
            }
        } else if (opcion === 4) {
            if (madera >= 10 && piedra >= 5) {
                madera -= 10;
                piedra -= 5;
                espada += 1;
                console.log("");
                console.log("⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!");
                console.log("   Espadas disponibles: " + espada);
                console.log("   Madera restante: " + madera + " | Piedra restante: " + piedra);
            } else {
                console.log("");
                console.log("[!] Materiales insuficientes para fabricar la espada.");
                console.log("    Requieres: 10 de madera (Tienes: " + madera + ") y 5 de piedra (Tienes: " + piedra + ").");
            }
        } else if (opcion === 5) {
            console.log("");
            console.log("================ INVENTARIO DEL JUGADOR ================");
            console.log("Jugador:   " + jugador);
            console.log("Mundo:     " + mundo);
            console.log("Madera:    " + madera + " troncos");
            console.log("Piedra:    " + piedra + " bloques");
            console.log("Diamantes: " + diamantes + " gemas");
            console.log("Espadas:   " + espada + " unidades");
            console.log("========================================================");
        } else if (opcion === 6) {
            console.log("");
            console.log("¡Mundo guardado exitosamente! Hasta la próxima, " + jugador + ".");
        } else {
            console.log("");
            console.log(">> Opción no reconocida. Intenta de nuevo.");
        }
    }

    rl.close();
}

main();`,
    php: `<?php
echo "================================================\\n";
echo "            MINECRAFT SURVIVAL CLI              \\n";
echo "================================================\\n";

// 1. Datos iniciales
echo "Nombre del jugador: ";
$jugador = trim(fgets(STDIN));

echo "Nombre del mundo: ";
$mundo = trim(fgets(STDIN));

// 2. Variables de inventario
$madera = 0;
$piedra = 0;
$diamantes = 0;
$espada = 0;
$opcion = 0;

// 3. Bucle interactivo principal
while ($opcion != 6) {
    echo "\\n";
    echo "===== MUNDO: " . $mundo . " | Jugador: " . $jugador . " =====\\n";
    echo "1. Cortar madera (Talar 4 árboles)\\n";
    echo "2. Minar piedra\\n";
    echo "3. Buscar diamantes (Requiere espada)\\n";
    echo "4. Crear espada (10 Madera + 5 Piedra)\\n";
    echo "5. Ver inventario\\n";
    echo "6. Guardar y Salir\\n";
    echo "Elige una opción: ";

    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        echo "\\n";
        echo "--- Talando zona boscosa con hacha ---\\n";

        for ($arbol = 1; $arbol <= 4; $arbol++) {
            $madera += 3;
            echo "Árbol " . $arbol . " talado: +3 de madera (Total: " . $madera . ")\\n";
        }
    } else if ($opcion == 2) {
        $piedra += 6;
        echo "\\n";
        echo "[⛏️] Has picado bloques de roca en la cantera.\\n";
        echo "    +6 de piedra obtenida (Total: " . $piedra . ").\\n";
    } else if ($opcion == 3) {
        if ($espada > 0) {
            $diamantes += 2;
            echo "\\n";
            echo "💎 ¡Increíble! Exploraste las cavernas oscuras y hallaste 2 diamantes.\\n";
            echo "   Total de diamantes en el cofre: " . $diamantes . "\\n";
        } else {
            echo "\\n";
            echo "⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte.\\n";
        }
    } else if ($opcion == 4) {
        if ($madera >= 10 && $piedra >= 5) {
            $madera -= 10;
            $piedra -= 5;
            $espada++;
            echo "\\n";
            echo "⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!\\n";
            echo "   Espadas disponibles: " . $espada . "\\n";
            echo "   Madera restante: " . $madera . " | Piedra restante: " . $piedra . "\\n";
        } else {
            echo "\\n";
            echo "[!] Materiales insuficientes para fabricar la espada.\\n";
            echo "    Requieres: 10 de madera (Tienes: " . $madera . ") y 5 de piedra (Tienes: " . $piedra . ").\\n";
        }
    } else if ($opcion == 5) {
        echo "\\n";
        echo "================ INVENTARIO DEL JUGADOR ================\\n";
        echo "Jugador:   " . $jugador . "\\n";
        echo "Mundo:     " . $mundo . "\\n";
        echo "Madera:    " . $madera . " troncos\\n";
        echo "Piedra:    " . $piedra . " bloques\\n";
        echo "Diamantes: " . $diamantes . " gemas\\n";
        echo "Espadas:   " . $espada . " unidades\\n";
        echo "========================================================\\n";
    } else if ($opcion == 6) {
        echo "\\n";
        echo "¡Mundo guardado exitosamente! Hasta la próxima, " . $jugador . ".\\n";
    } else {
        echo "\\n";
        echo ">> Opción no reconocida. Intenta de nuevo.\\n";
    }
}
?>`,
    pseint: `Algoritmo MinecraftSurvival
    // 1. Declaración de variables
    Definir jugador, mundo Como Cadena
    Definir madera, piedra, diamantes, espada, opcion, arbol Como Entero
    
    Escribir "================================================"
    Escribir "            MINECRAFT SURVIVAL CLI              "
    Escribir "================================================"
    
    Escribir "Nombre del jugador:"
    Leer jugador
    
    Escribir "Nombre del mundo:"
    Leer mundo
    
    // 2. Inicialización de inventario con =
    madera = 0
    piedra = 0
    diamantes = 0
    espada = 0
    opcion = 0
    
    // 3. Bucle interactivo principal
    Mientras opcion <> 6 Hacer
        Escribir ""
        Escribir "===== MUNDO: ", mundo, " | Jugador: ", jugador, " ====="
        Escribir "1. Cortar madera (Talar 4 arboles)"
        Escribir "2. Minar piedra"
        Escribir "3. Buscar diamantes (Requiere espada)"
        Escribir "4. Crear espada (10 Madera + 5 Piedra)"
        Escribir "5. Ver inventario"
        Escribir "6. Guardar y Salir"
        Escribir "Elige una opcion:"
        Leer opcion
        
        Segun opcion Hacer
            1:
                Escribir ""
                Escribir "--- Talando zona boscosa con hacha ---"
                
                // Bucle for para talar 4 árboles
                Para arbol = 1 Hasta 4 Con Paso 1 Hacer
                    madera = madera + 3
                    Escribir "Arbol ", arbol, " talado: +3 de madera (Total: ", madera, ")"
                FinPara
            2:
                piedra = piedra + 6
                Escribir ""
                Escribir "[⛏️] Has picado bloques de roca en la cantera."
                Escribir "    +6 de piedra obtenida (Total: ", piedra, ")."
            3:
                Si espada > 0 Entonces
                    diamantes = diamantes + 2
                    Escribir ""
                    Escribir "💎 ¡Increible! Exploraste las cavernas oscuras y hallaste 2 diamantes."
                    Escribir "   Total de diamantes en el cofre: ", diamantes
                SiNo
                    Escribir ""
                    Escribir "⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte."
                FinSi
            4:
                Si madera >= 10 Y piedra >= 5 Entonces
                    madera = madera - 10
                    piedra = piedra - 5
                    espada = espada + 1
                    Escribir ""
                    Escribir "⚔️ ¡Has fabricado una Espada de Piedra en la mesa de crafteo!"
                    Escribir "   Espadas disponibles: ", espada
                    Escribir "   Madera restante: ", madera, " | Piedra restante: ", piedra
                SiNo
                    Escribir ""
                    Escribir "[!] Materiales insuficientes para fabricar la espada."
                    Escribir "    Requieres: 10 de madera (Tienes: ", madera, ") y 5 de piedra (Tienes: ", piedra, ")."
                FinSi
            5:
                Escribir ""
                Escribir "================ INVENTARIO DEL JUGADOR ================"
                Escribir "Jugador:   ", jugador
                Escribir "Mundo:     ", mundo
                Escribir "Madera:    ", madera, " troncos"
                Escribir "Piedra:    ", piedra, " bloques"
                Escribir "Diamantes: ", diamantes, " gemas"
                Escribir "Espadas:   ", espada, " unidades"
                Escribir "========================================================"
            6:
                Escribir ""
                Escribir "¡Mundo guardado exitosamente! Hasta la proxima, ", jugador, "."
            De Otro Modo:
                Escribir ""
                Escribir ">> Opcion no reconocida. Intenta de nuevo."
        FinSegun
    FinMientras
FinAlgoritmo`
  }
};
