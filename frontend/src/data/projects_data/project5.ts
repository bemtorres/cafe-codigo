import type { GameProject } from '../gameProjectsData';

export const project5Pokemon: GameProject = {
  id: 5,
  slug: 'batalla-pokemon',
  number: '05',
  title: 'Batalla Pokémon por Turnos',
  subtitle: 'Simulador de duelos tácticos, tipos elementales y subida de nivel',
  icon: '⚡',
  accentColor: '#eab308',
  badge: 'PROYECTO 5 · DUELOS',
  difficulty: 'Intermedio',
  story: 'Caminando por la hierba alta de la Ruta 1, un Pokémon rival te desafía. Como entrenador novato, deberás gestionar los ataques de tu compañero, usar pociones curativas en el momento justo y derrotar al rival para ganar experiencia.',
  objective: 'Desarrollar un sistema de combate táctico por turnos con bucles for, consumo de objetos curativos, incremento de estadísticas (ataque y nivel) y verificación de Game Over.',
  initialInputs: [
    'Nombre del entrenador (texto)',
    'Nombre del Pokémon compañero (Pikachu, Charmander, etc.)',
    'Tipo elemental: Eléctrico, Fuego, Agua, Planta (texto)'
  ],
  variables: [
    { name: 'vida', type: 'int', initialValue: '100', description: 'Puntos de salud del Pokémon propio' },
    { name: 'ataque', type: 'int', initialValue: '20', description: 'Poder de daño por impacto' },
    { name: 'pociones', type: 'int', initialValue: '3', description: 'Frascos de poción (+20 HP)' },
    { name: 'nivel', type: 'int', initialValue: '1', description: 'Nivel de combate del Pokémon' },
    { name: 'victorias', type: 'int', initialValue: '0', description: 'Combates ganados' }
  ],
  menuOptions: [
    {
      option: '1',
      title: 'Atacar al Rival (Combate 2 Asaltos)',
      description: 'Bucle for de 2 turnos de intercambio de golpes mutuo.',
      logic: 'for (int t = 1; t <= 2; t++). Rival pierde ataque HP, jugador recibe 12 HP. Si gana: +1 Nivel, +5 Ataque, +1 Victoria.'
    },
    {
      option: '2',
      title: 'Usar Poción Curativa',
      description: 'Restaura +20 HP (Máximo 100) y gasta 1 poción del inventario.',
      logic: 'if (pociones > 0) { pociones--; vida = Math.Min(100, vida + 20); }'
    },
    {
      option: '3',
      title: 'Ver Estado del Pokémon',
      description: 'Muestra Entrenador, Pokémon, Tipo, Nivel, HP actual, Ataque, Pociones y Victorias.',
      logic: 'Imprime las estadísticas completas del compañero.'
    },
    {
      option: '4',
      title: 'Huir del Combate / Salir',
      description: 'Escapa del encuentro salvaje y termina el bucle.',
      logic: 'opcion = 4; Finaliza el bucle while.'
    }
  ],
  rules: [
    'No se pueden usar pociones si la cantidad es 0.',
    'La vida no puede superar el límite de 100 HP al curarse.',
    'Si los puntos de salud caen a 0 o menos durante un ataque: mostrar "GAME OVER" y finalizar.'
  ],
  extraChallenges: [
    'Efectividad de Tipos: Si Fuego ataca a Planta, causar doble de daño (+100%).',
    'Ataques Críticos: Probabilidad del 20% de asestar golpe crítico con 1.5x de daño.',
    'Pokéballs: Opción para lanzar una Pokéball e intentar capturar al rival cuando su vida sea baja.'
  ],
  steps: [
    { id: 'p5_s1', title: 'Inicializar Variables', desc: 'Definir vida=100, ataque=20, pociones=3, nivel=1 y victorias=0.' },
    { id: 'p5_s2', title: 'Menú Interactivo while', desc: 'Crear el menú de 4 opciones imprimiendo cada una en línea independiente.' },
    { id: 'p5_s3', title: 'Bucle for de Combate', desc: 'Ejecutar 2 asaltos evaluando daño mutuo, victoria y subida de nivel.' },
    { id: 'p5_s4', title: 'Lógica de Curación con Pociones', desc: 'Validar pociones > 0 y limitar el tope de HP a 100.' }
  ],
  consolePreview: `================================================
          BATALLA POKÉMON POR TURNOS            
================================================
Entrenador: Ash | Compañero: Pikachu (Tipo: Eléctrico)

---------------- MENÚ DE COMBATE ----------------
1. Atacar al rival (2 asaltos de combate)
2. Usar poción (+20 HP)
3. Ver estado del Pokémon
4. Huir del combate
Elige una opción: 1

--- ¡ASALTO DE COMBATE! ---
Turno 1: Pikachu ataca causando 20 de daño. Rival contraataca y causa 12 de daño.
Turno 2: Pikachu ataca causando 20 de daño. Rival debilitado.
¡Has ganado el combate! Pikachu sube a Nivel 2 (+5 Ataque).
Vida restante: 88 HP`,
  solutions: {
    csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("          BATALLA POKÉMON POR TURNOS            ");
        Console.WriteLine("================================================");

        // 1. Datos iniciales del entrenador y pokémon
        Console.Write("Nombre del entrenador: ");
        string entrenador = Console.ReadLine();

        Console.Write("Nombre de tu Pokémon: ");
        string pokemon = Console.ReadLine();

        Console.Write("Tipo elemental (Eléctrico, Fuego, Agua, Planta): ");
        string tipo = Console.ReadLine();

        // 2. Variables de estado del combate
        int vida = 100;
        int ataque = 20;
        int pociones = 3;
        int nivel = 1;
        int victorias = 0;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 4 && vida > 0)
        {
            Console.WriteLine("");
            Console.WriteLine("---------------- MENÚ DE COMBATE ----------------");
            Console.WriteLine("1. Atacar al rival (2 asaltos de combate)");
            Console.WriteLine("2. Usar poción (+20 HP)");
            Console.WriteLine("3. Ver estado del Pokémon");
            Console.WriteLine("4. Huir del combate");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida. Ingresa un número del 1 al 4.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("");
                    Console.WriteLine("--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---");
                    int vidaRival = 35 + (nivel * 5);
                    int ataqueRival = 12;

                    // Bucle for para simular 2 turnos de ataque
                    for (int turno = 1; turno <= 2; turno++)
                    {
                        Console.WriteLine("Turno " + turno + ": ¡" + pokemon + " ataca con furia y causa " + ataque + " de daño!");
                        vidaRival -= ataque;

                        if (vidaRival <= 0)
                        {
                            Console.WriteLine("¡El Pokémon rival se ha debilitado!");
                            break;
                        }

                        Console.WriteLine("         El rival responde al ataque y causa " + ataqueRival + " de daño.");
                        vida -= ataqueRival;

                        if (vida <= 0)
                        {
                            Console.WriteLine("¡" + pokemon + " ha caído debilitado! GAME OVER.");
                            break;
                        }
                    }

                    if (vida > 0)
                    {
                        victorias++;
                        nivel++;
                        ataque += 5;
                        Console.WriteLine("");
                        Console.WriteLine("🏆 ¡Victoria en la batalla! ¡" + pokemon + " subió al Nivel " + nivel + "!");
                        Console.WriteLine("   Poder de ataque incrementado a " + ataque + ".");
                        Console.WriteLine("   Vida restante: " + vida + " HP.");
                    }
                    break;

                case 2:
                    if (pociones > 0)
                    {
                        if (vida < 100)
                        {
                            pociones--;
                            vida = Math.Min(100, vida + 20);
                            Console.WriteLine("");
                            Console.WriteLine("🧪 ¡Usaste una poción! " + pokemon + " recuperó salud.");
                            Console.WriteLine("   Vida actual: " + vida + " / 100 HP.");
                            Console.WriteLine("   Pociones restantes: " + pociones);
                        }
                        else
                        {
                            Console.WriteLine("");
                            Console.WriteLine("[!] " + pokemon + " ya tiene la vida al máximo (100 HP).");
                        }
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("❌ No te quedan pociones en la mochila.");
                    }
                    break;

                case 3:
                    Console.WriteLine("");
                    Console.WriteLine("================ ESTADO DEL POKÉMON ================");
                    Console.WriteLine("Entrenador:  " + entrenador);
                    Console.WriteLine("Pokémon:     " + pokemon);
                    Console.WriteLine("Tipo:        " + tipo);
                    Console.WriteLine("Nivel:       " + nivel);
                    Console.WriteLine("Vida:        " + vida + " / 100 HP");
                    Console.WriteLine("Ataque:      " + ataque + " DMG");
                    Console.WriteLine("Pociones:    " + pociones + " frascos");
                    Console.WriteLine("Victorias:   " + victorias);
                    Console.WriteLine("====================================================");
                    break;

                case 4:
                    Console.WriteLine("");
                    Console.WriteLine("¡Has escapado sin problemas! Hasta luego, Entrenador " + entrenador + ".");
                    break;

                default:
                    Console.WriteLine("");
                    Console.WriteLine(">> Opción no reconocida. Intenta de nuevo.");
                    break;
            }
        }

        if (vida <= 0)
        {
            Console.WriteLine("");
            Console.WriteLine("☠️ No tienes más Pokémon conscientes para luchar. FIN DEL JUEGO.");
        }
    }
}`,
    python: `def main():
    print("================================================")
    print("          BATALLA POKÉMON POR TURNOS            ")
    print("================================================")

    # 1. Datos iniciales
    entrenador = input("Nombre del entrenador: ")
    pokemon = input("Nombre de tu Pokémon: ")
    tipo = input("Tipo elemental (Eléctrico, Fuego, Agua, Planta): ")

    # 2. Variables de estado
    vida = 100
    ataque = 20
    pociones = 3
    nivel = 1
    victorias = 0
    opcion = 0

    # 3. Bucle interactivo principal
    while opcion != 4 and vida > 0:
        print("")
        print("---------------- MENÚ DE COMBATE ----------------")
        print("1. Atacar al rival (2 asaltos de combate)")
        print("2. Usar poción (+20 HP)")
        print("3. Ver estado del Pokémon")
        print("4. Huir del combate")

        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida. Ingresa un número.")
            continue

        if opcion == 1:
            print("")
            print("--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---")
            vida_rival = 35 + (nivel * 5)
            ataque_rival = 12

            # Bucle for para los 2 asaltos
            for turno in range(1, 3):
                print("Turno " + str(turno) + ": ¡" + pokemon + " ataca con furia y causa " + str(ataque) + " de daño!")
                vida_rival -= ataque

                if vida_rival <= 0:
                    print("¡El Pokémon rival se ha debilitado!")
                    break

                print("         El rival responde al ataque y causa " + str(ataque_rival) + " de daño.")
                vida -= ataque_rival

                if vida <= 0:
                    print("¡" + pokemon + " ha caído debilitado! GAME OVER.")
                    break

            if vida > 0:
                victorias += 1
                nivel += 1
                ataque += 5
                print("")
                print("🏆 ¡Victoria en la batalla! ¡" + pokemon + " subió al Nivel " + str(nivel) + "!")
                print("   Poder de ataque incrementado a " + str(ataque) + ".")
                print("   Vida restante: " + str(vida) + " HP.")

        elif opcion == 2:
            if pociones > 0:
                if vida < 100:
                    pociones -= 1
                    vida = min(100, vida + 20)
                    print("")
                    print("🧪 ¡Usaste una poción! " + pokemon + " recuperó salud.")
                    print("   Vida actual: " + str(vida) + " / 100 HP.")
                    print("   Pociones restantes: " + str(pociones))
                else:
                    print("")
                    print("[!] " + pokemon + " ya tiene la vida al máximo (100 HP).")
            else:
                print("")
                print("❌ No te quedan pociones en la mochila.")

        elif opcion == 3:
            print("")
            print("================ ESTADO DEL POKÉMON ================")
            print("Entrenador:  " + entrenador)
            print("Pokémon:     " + pokemon)
            print("Tipo:        " + tipo)
            print("Nivel:       " + str(nivel))
            print("Vida:        " + str(vida) + " / 100 HP")
            print("Ataque:      " + str(ataque) + " DMG")
            print("Pociones:    " + str(pociones) + " frascos")
            print("Victorias:   " + str(victorias))
            print("====================================================")

        elif opcion == 4:
            print("")
            print("¡Has escapado sin problemas! Hasta luego, Entrenador " + entrenador + ".")

        else:
            print("")
            print(">> Opción no reconocida. Intenta de nuevo.")

    if vida <= 0:
        print("")
        print("☠️ No tienes más Pokémon conscientes para luchar. FIN DEL JUEGO.")

if __name__ == '__main__':
    main()`,
    java: `import java.util.Scanner;

public class BatallaPokemon {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("================================================");
        System.out.println("          BATALLA POKÉMON POR TURNOS            ");
        System.out.println("================================================");

        // 1. Datos iniciales
        System.out.print("Nombre del entrenador: ");
        String entrenador = sc.nextLine();

        System.out.print("Nombre de tu Pokémon: ");
        String pokemon = sc.nextLine();

        System.out.print("Tipo elemental (Eléctrico, Fuego, Agua, Planta): ");
        String tipo = sc.nextLine();

        // 2. Variables de estado
        int vida = 100;
        int ataque = 20;
        int pociones = 3;
        int nivel = 1;
        int victorias = 0;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 4 && vida > 0) {
            System.out.println("");
            System.out.println("---------------- MENÚ DE COMBATE ----------------");
            System.out.println("1. Atacar al rival (2 asaltos de combate)");
            System.out.println("2. Usar poción (+20 HP)");
            System.out.println("3. Ver estado del Pokémon");
            System.out.println("4. Huir del combate");
            System.out.print("Elige una opción: ");

            if (!sc.hasNextInt()) {
                System.out.println(">> Opción inválida. Ingresa un número.");
                sc.next();
                continue;
            }
            opcion = sc.nextInt();

            if (opcion == 1) {
                System.out.println("");
                System.out.println("--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---");
                int vidaRival = 35 + (nivel * 5);
                int ataqueRival = 12;

                // Bucle for para los 2 asaltos
                for (int turno = 1; turno <= 2; turno++) {
                    System.out.println("Turno " + turno + ": ¡" + pokemon + " ataca con furia y causa " + ataque + " de daño!");
                    vidaRival -= ataque;

                    if (vidaRival <= 0) {
                        System.out.println("¡El Pokémon rival se ha debilitado!");
                        break;
                    }

                    System.out.println("         El rival responde al ataque y causa " + ataqueRival + " de daño.");
                    vida -= ataqueRival;

                    if (vida <= 0) {
                        System.out.println("¡" + pokemon + " ha caído debilitado! GAME OVER.");
                        break;
                    }
                }

                if (vida > 0) {
                    victorias++;
                    nivel++;
                    ataque += 5;
                    System.out.println("");
                    System.out.println("🏆 ¡Victoria en la batalla! ¡" + pokemon + " subió al Nivel " + nivel + "!");
                    System.out.println("   Poder de ataque incrementado a " + ataque + ".");
                    System.out.println("   Vida restante: " + vida + " HP.");
                }
            } else if (opcion == 2) {
                if (pociones > 0) {
                    if (vida < 100) {
                        pociones--;
                        vida = Math.min(100, vida + 20);
                        System.out.println("");
                        System.out.println("🧪 ¡Usaste una poción! " + pokemon + " recuperó salud.");
                        System.out.println("   Vida actual: " + vida + " / 100 HP.");
                        System.out.println("   Pociones restantes: " + pociones);
                    } else {
                        System.out.println("");
                        System.out.println("[!] " + pokemon + " ya tiene la vida al máximo (100 HP).");
                    }
                } else {
                    System.out.println("");
                    System.out.println("❌ No te quedan pociones en la mochila.");
                }
            } else if (opcion == 3) {
                System.out.println("");
                System.out.println("================ ESTADO DEL POKÉMON ================");
                System.out.println("Entrenador:  " + entrenador);
                System.out.println("Pokémon:     " + pokemon);
                System.out.println("Tipo:        " + tipo);
                System.out.println("Nivel:       " + nivel);
                System.out.println("Vida:        " + vida + " / 100 HP");
                System.out.println("Ataque:      " + ataque + " DMG");
                System.out.println("Pociones:    " + pociones + " frascos");
                System.out.println("Victorias:   " + victorias);
                System.out.println("====================================================");
            } else if (opcion == 4) {
                System.out.println("");
                System.out.println("¡Has escapado sin problemas! Hasta luego, Entrenador " + entrenador + ".");
            } else {
                System.out.println("");
                System.out.println(">> Opción no reconocida. Intenta de nuevo.");
            }
        }

        if (vida <= 0) {
            System.out.println("");
            System.out.println("☠️ No tienes más Pokémon conscientes para luchar. FIN DEL JUEGO.");
        }
    }
}`,
    cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    cout << "================================================" << endl;
    cout << "          BATALLA POKÉMON POR TURNOS            " << endl;
    cout << "================================================" << endl;

    // 1. Datos iniciales
    string entrenador;
    cout << "Nombre del entrenador: ";
    cin >> entrenador;

    string pokemon;
    cout << "Nombre de tu Pokemon: ";
    cin >> pokemon;

    string tipo;
    cout << "Tipo elemental (Electrico, Fuego, Agua, Planta): ";
    cin >> tipo;

    // 2. Variables de estado
    int vida = 100;
    int ataque = 20;
    int pociones = 3;
    int nivel = 1;
    int victorias = 0;
    int opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion != 4 && vida > 0) {
        cout << endl;
        cout << "---------------- MENÚ DE COMBATE ----------------" << endl;
        cout << "1. Atacar al rival (2 asaltos de combate)" << endl;
        cout << "2. Usar pocion (+20 HP)" << endl;
        cout << "3. Ver estado del Pokemon" << endl;
        cout << "4. Huir del combate" << endl;
        cout << "Elige una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            cout << endl;
            cout << "--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---" << endl;
            int vidaRival = 35 + (nivel * 5);
            int ataqueRival = 12;

            // Bucle for para los 2 asaltos
            for (int turno = 1; turno <= 2; turno++) {
                cout << "Turno " << turno << ": ¡" << pokemon << " ataca con furia y causa " << ataque << " de dano!" << endl;
                vidaRival -= ataque;

                if (vidaRival <= 0) {
                    cout << "¡El Pokemon rival se ha debilitado!" << endl;
                    break;
                }

                cout << "         El rival responde al ataque y causa " << ataqueRival << " de dano." << endl;
                vida -= ataqueRival;

                if (vida <= 0) {
                    cout << "¡" << pokemon << " ha caido debilitado! GAME OVER." << endl;
                    break;
                }
            }

            if (vida > 0) {
                victorias++;
                nivel++;
                ataque += 5;
                cout << endl;
                cout << "🏆 ¡Victoria en la batalla! ¡" << pokemon << " subio al Nivel " << nivel << "!" << endl;
                cout << "   Poder de ataque incrementado a " << ataque << "." << endl;
                cout << "   Vida restante: " << vida << " HP." << endl;
            }
        } else if (opcion == 2) {
            if (pociones > 0) {
                if (vida < 100) {
                    pociones--;
                    vida = min(100, vida + 20);
                    cout << endl;
                    cout << "🧪 ¡Usaste una pocion! " << pokemon << " recupero salud." << endl;
                    cout << "   Vida actual: " << vida << " / 100 HP." << endl;
                    cout << "   Pociones restantes: " << pociones << endl;
                } else {
                    cout << endl;
                    cout << "[!] " << pokemon << " ya tiene la vida al maximo (100 HP)." << endl;
                }
            } else {
                cout << endl;
                cout << "❌ No te quedan pociones en la mochila." << endl;
            }
        } else if (opcion == 3) {
            cout << endl;
            cout << "================ ESTADO DEL POKÉMON ================" << endl;
            cout << "Entrenador:  " << entrenador << endl;
            cout << "Pokemon:     " << pokemon << endl;
            cout << "Tipo:        " << tipo << endl;
            cout << "Nivel:       " << nivel << endl;
            cout << "Vida:        " << vida << " / 100 HP" << endl;
            cout << "Ataque:      " << ataque << " DMG" << endl;
            cout << "Pociones:    " << pociones << " frascos" << endl;
            cout << "Victorias:   " << victorias << endl;
            cout << "====================================================" << endl;
        } else if (opcion == 4) {
            cout << endl;
            cout << "¡Has escapado sin problemas! Hasta luego, Entrenador " << entrenador << "." << endl;
        } else {
            cout << endl;
            cout << ">> Opcion no reconocida. Intenta de nuevo." << endl;
        }
    }

    if (vida <= 0) {
        cout << endl;
        cout << "☠️ No tienes mas Pokemon conscientes para luchar. FIN DEL JUEGO." << endl;
    }

    return 0;
}`,
    javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("================================================");
    console.log("          BATALLA POKÉMON POR TURNOS            ");
    console.log("================================================");

    // 1. Datos iniciales
    const entrenador = await ask("Nombre del entrenador: ");
    const pokemon = await ask("Nombre de tu Pokémon: ");
    const tipo = await ask("Tipo elemental (Eléctrico, Fuego, Agua, Planta): ");

    // 2. Variables de estado
    let vida = 100;
    let ataque = 20;
    let pociones = 3;
    let nivel = 1;
    let victorias = 0;
    let opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion !== 4 && vida > 0) {
        console.log("");
        console.log("---------------- MENÚ DE COMBATE ----------------");
        console.log("1. Atacar al rival (2 asaltos de combate)");
        console.log("2. Usar poción (+20 HP)");
        console.log("3. Ver estado del Pokémon");
        console.log("4. Huir del combate");

        const resp = await ask("Elige una opción: ");
        opcion = parseInt(resp, 10);

        if (isNaN(opcion)) {
            console.log(">> Opción inválida. Ingresa un número.");
            continue;
        }

        if (opcion === 1) {
            console.log("");
            console.log("--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---");
            let vidaRival = 35 + (nivel * 5);
            let ataqueRival = 12;

            for (let turno = 1; turno <= 2; turno++) {
                console.log("Turno " + turno + ": ¡" + pokemon + " ataca con furia y causa " + ataque + " de daño!");
                vidaRival -= ataque;

                if (vidaRival <= 0) {
                    console.log("¡El Pokémon rival se ha debilitado!");
                    break;
                }

                console.log("         El rival responde al ataque y causa " + ataqueRival + " de daño.");
                vida -= ataqueRival;

                if (vida <= 0) {
                    console.log("¡" + pokemon + " ha caído debilitado! GAME OVER.");
                    break;
                }
            }

            if (vida > 0) {
                victorias++;
                nivel++;
                ataque += 5;
                console.log("");
                console.log("🏆 ¡Victoria en la batalla! ¡" + pokemon + " subió al Nivel " + nivel + "!");
                console.log("   Poder de ataque incrementado a " + ataque + ".");
                console.log("   Vida restante: " + vida + " HP.");
            }
        } else if (opcion === 2) {
            if (pociones > 0) {
                if (vida < 100) {
                    pociones--;
                    vida = Math.min(100, vida + 20);
                    console.log("");
                    console.log("🧪 ¡Usaste una poción! " + pokemon + " recuperó salud.");
                    console.log("   Vida actual: " + vida + " / 100 HP.");
                    console.log("   Pociones restantes: " + pociones);
                } else {
                    console.log("");
                    console.log("[!] " + pokemon + " ya tiene la vida al máximo (100 HP).");
                }
            } else {
                console.log("");
                console.log("❌ No te quedan pociones en la mochila.");
            }
        } else if (opcion === 3) {
            console.log("");
            console.log("================ ESTADO DEL POKÉMON ================");
            console.log("Entrenador:  " + entrenador);
            console.log("Pokémon:     " + pokemon);
            console.log("Tipo:        " + tipo);
            console.log("Nivel:       " + nivel);
            console.log("Vida:        " + vida + " / 100 HP");
            console.log("Ataque:      " + ataque + " DMG");
            console.log("Pociones:    " + pociones + " frascos");
            console.log("Victorias:   " + victorias);
            console.log("====================================================");
        } else if (opcion === 4) {
            console.log("");
            console.log("¡Has escapado sin problemas! Hasta luego, Entrenador " + entrenador + ".");
        } else {
            console.log("");
            console.log(">> Opción no reconocida. Intenta de nuevo.");
        }
    }

    if (vida <= 0) {
        console.log("");
        console.log("☠️ No tienes más Pokémon conscientes para luchar. FIN DEL JUEGO.");
    }

    rl.close();
}

main();`,
    php: `<?php
echo "================================================\\n";
echo "          BATALLA POKÉMON POR TURNOS            \\n";
echo "================================================\\n";

// 1. Datos iniciales
echo "Nombre del entrenador: ";
$entrenador = trim(fgets(STDIN));

echo "Nombre de tu Pokémon: ";
$pokemon = trim(fgets(STDIN));

echo "Tipo elemental (Eléctrico, Fuego, Agua, Planta): ";
$tipo = trim(fgets(STDIN));

// 2. Variables de estado
$vida = 100;
$ataque = 20;
$pociones = 3;
$nivel = 1;
$victorias = 0;
$opcion = 0;

// 3. Bucle interactivo principal
while ($opcion != 4 && $vida > 0) {
    echo "\\n";
    echo "---------------- MENÚ DE COMBATE ----------------\\n";
    echo "1. Atacar al rival (2 asaltos de combate)\\n";
    echo "2. Usar poción (+20 HP)\\n";
    echo "3. Ver estado del Pokémon\\n";
    echo "4. Huir del combate\\n";
    echo "Elige una opción: ";

    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        echo "\\n";
        echo "--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---\\n";
        $vidaRival = 35 + ($nivel * 5);
        $ataqueRival = 12;

        for ($turno = 1; $turno <= 2; $turno++) {
            echo "Turno " . $turno . ": ¡" . $pokemon . " ataca con furia y causa " . $ataque . " de daño!\\n";
            $vidaRival -= $ataque;

            if ($vidaRival <= 0) {
                echo "¡El Pokémon rival se ha debilitado!\\n";
                break;
            }

            echo "         El rival responde al ataque y causa " . $ataqueRival . " de daño.\\n";
            $vida -= $ataqueRival;

            if ($vida <= 0) {
                echo "¡" . $pokemon . " ha caído debilitado! GAME OVER.\\n";
                break;
            }
        }

        if ($vida > 0) {
            $victorias++;
            $nivel++;
            $ataque += 5;
            echo "\\n";
            echo "🏆 ¡Victoria en la batalla! ¡" . $pokemon . " subió al Nivel " . $nivel . "!\\n";
            echo "   Poder de ataque incrementado a " . $ataque . ".\\n";
            echo "   Vida restante: " . $vida . " HP.\\n";
        }
    } else if ($opcion == 2) {
        if ($pociones > 0) {
            if ($vida < 100) {
                $pociones--;
                $vida = min(100, $vida + 20);
                echo "\\n";
                echo "🧪 ¡Usaste una poción! " . $pokemon . " recuperó salud.\\n";
                echo "   Vida actual: " . $vida . " / 100 HP.\\n";
                echo "   Pociones restantes: " . $pociones . "\\n";
            } else {
                echo "\\n";
                echo "[!] " . $pokemon . " ya tiene la vida al máximo (100 HP).\\n";
            }
        } else {
            echo "\\n";
            echo "❌ No te quedan pociones en la mochila.\\n";
        }
    } else if ($opcion == 3) {
        echo "\\n";
        echo "================ ESTADO DEL POKÉMON ================\\n";
        echo "Entrenador:  " . $entrenador . "\\n";
        echo "Pokémon:     " . $pokemon . "\\n";
        echo "Tipo:        " . $tipo . "\\n";
        echo "Nivel:       " . $nivel . "\\n";
        echo "Vida:        " . $vida . " / 100 HP\\n";
        echo "Ataque:      " . $ataque . " DMG\\n";
        echo "Pociones:    " . $pociones . " frascos\\n";
        echo "Victorias:   " . $victorias . "\\n";
        echo "====================================================\\n";
    } else if ($opcion == 4) {
        echo "\\n";
        echo "¡Has escapado sin problemas! Hasta luego, Entrenador " . $entrenador . ".\\n";
    } else {
        echo "\\n";
        echo ">> Opción no reconocida. Intenta de nuevo.\\n";
    }
}

if ($vida <= 0) {
    echo "\\n";
    echo "☠️ No tienes más Pokémon conscientes para luchar. FIN DEL JUEGO.\\n";
}
?>`,
    pseint: `Algoritmo BatallaPokemon
    // 1. Declaración de variables
    Definir entrenador, pokemon, tipo Como Cadena
    Definir vida, ataque, pociones, nivel, victorias, opcion, turno, vidaRival, ataqueRival Como Entero
    
    Escribir "================================================"
    Escribir "          BATALLA POKÉMON POR TURNOS            "
    Escribir "================================================"
    
    Escribir "Nombre del entrenador:"
    Leer entrenador
    
    Escribir "Nombre de tu Pokemon:"
    Leer pokemon
    
    Escribir "Tipo elemental (Electrico, Fuego, Agua, Planta):"
    Leer tipo
    
    // 2. Inicialización de variables con =
    vida = 100
    ataque = 20
    pociones = 3
    nivel = 1
    victorias = 0
    opcion = 0
    
    // 3. Bucle interactivo principal
    Mientras opcion <> 4 Y vida > 0 Hacer
        Escribir ""
        Escribir "---------------- MENÚ DE COMBATE ----------------"
        Escribir "1. Atacar al rival (2 asaltos de combate)"
        Escribir "2. Usar pocion (+20 HP)"
        Escribir "3. Ver estado del Pokemon"
        Escribir "4. Huir del combate"
        Escribir "Elige una opcion:"
        Leer opcion
        
        Segun opcion Hacer
            1:
                Escribir ""
                Escribir "--- ¡ASALTO DE COMBATE EN HIERBA ALTA! ---"
                vidaRival = 35 + (nivel * 5)
                ataqueRival = 12
                
                // Bucle for para los 2 asaltos
                Para turno = 1 Hasta 2 Con Paso 1 Hacer
                    Escribir "Turno ", turno, ": ¡", pokemon, " ataca con furia y causa ", ataque, " de dano!"
                    vidaRival = vidaRival - ataque
                    
                    Si vidaRival <= 0 Entonces
                        Escribir "¡El Pokemon rival se ha debilitado!"
                        turno = 3 // Salida del asalto
                    SiNo
                        Escribir "         El rival responde al ataque y causa ", ataqueRival, " de dano."
                        vida = vida - ataqueRival
                        
                        Si vida <= 0 Entonces
                            Escribir "¡", pokemon, " ha caido debilitado! GAME OVER."
                            turno = 3
                        FinSi
                    FinSi
                FinPara
                
                Si vida > 0 Entonces
                    victorias = victorias + 1
                    nivel = nivel + 1
                    ataque = ataque + 5
                    Escribir ""
                    Escribir "🏆 ¡Victoria en la batalla! ¡", pokemon, " subio al Nivel ", nivel, "!"
                    Escribir "   Poder de ataque incrementado a ", ataque, "."
                    Escribir "   Vida restante: ", vida, " HP."
                FinSi
            2:
                Si pociones > 0 Entonces
                    Si vida < 100 Entonces
                        pociones = pociones - 1
                        vida = vida + 20
                        Si vida > 100 Entonces
                            vida = 100
                        FinSi
                        Escribir ""
                        Escribir "🧪 ¡Usaste una pocion! ", pokemon, " recupero salud."
                        Escribir "   Vida actual: ", vida, " / 100 HP."
                        Escribir "   Pociones restantes: ", pociones
                    SiNo
                        Escribir ""
                        Escribir "[!] ", pokemon, " ya tiene la vida al maximo (100 HP)."
                    FinSi
                SiNo
                    Escribir ""
                    Escribir "❌ No te quedan pociones en la mochila."
                FinSi
            3:
                Escribir ""
                Escribir "================ ESTADO DEL POKÉMON ================"
                Escribir "Entrenador:  ", entrenador
                Escribir "Pokemon:     ", pokemon
                Escribir "Tipo:        ", tipo
                Escribir "Nivel:       ", nivel
                Escribir "Vida:        ", vida, " / 100 HP"
                Escribir "Ataque:      ", ataque, " DMG"
                Escribir "Pociones:    ", pociones, " frascos"
                Escribir "Victorias:   ", victorias
                Escribir "===================================================="
            4:
                Escribir ""
                Escribir "¡Has escapado sin problemas! Hasta luego, Entrenador ", entrenador, "."
            De Otro Modo:
                Escribir ""
                Escribir ">> Opcion no reconocida. Intenta de nuevo."
        FinSegun
    FinMientras
    
    Si vida <= 0 Entonces
        Escribir ""
        Escribir "☠️ No tienes mas Pokemon conscientes para luchar. FIN DEL JUEGO."
    FinSi
FinAlgoritmo`
  }
};
