import type { GameProject } from '../gameProjectsData';

export const project1ArenaRpg: GameProject = {
  id: 1,
  slug: 'arena-rpg',
  number: '01',
  title: 'Arena RPG: Torneo de Etherion',
  subtitle: 'Simulador de combate por turnos y campamento de entrenamiento',
  icon: '⚔️',
  accentColor: '#f59e0b',
  badge: 'PROYECTO 1 · RPG',
  difficulty: 'Básico - Intermedio',
  story: 'El reino de Etherion organiza un gran torneo de campeones. Como nuevo combatiente, debes entrenar duramente en el campamento para aumentar tu fuerza y sobrevivir a los feroces duelos en la arena.',
  objective: 'Desarrollar un programa interactivo por consola con menú principal en bucle while, variables de estado del héroe, entrenamiento con daño a la salud y combate simulado de 3 ataques mediante bucle for.',
  initialInputs: [
    'Nombre del jugador (texto)',
    'Clase del personaje: Guerrero, Mago o Arquero (texto)'
  ],
  variables: [
    { name: 'vida', type: 'int', initialValue: '100', description: 'Puntos de salud del jugador (HP)' },
    { name: 'fuerza', type: 'int', initialValue: '10', description: 'Poder de ataque físico o mágico' },
    { name: 'nivel', type: 'int', initialValue: '1', description: 'Nivel actual del héroe' },
    { name: 'experiencia', type: 'int', initialValue: '0', description: 'Puntos de XP acumulados para subir de nivel' },
    { name: 'monedas', type: 'int', initialValue: '50', description: 'Oro para comprar pociones (Desafío Extra)' },
    { name: 'pociones', type: 'int', initialValue: '2', description: 'Pociones curativas (+30 HP)' }
  ],
  menuOptions: [
    {
      option: '1',
      title: 'Pelear en la Arena',
      description: 'Simula 3 turnos de ataque usando un bucle for. El enemigo causa daño y el héroe contraataca con su fuerza.',
      logic: 'for (int i = 1; i <= 3; i++). Si gana: +40 XP. Si XP >= 100: sube de nivel (+1 nivel, +5 fuerza). Si vida <= 0: GAME OVER.'
    },
    {
      option: '2',
      title: 'Entrenar en el Cuartel',
      description: 'Mejora las habilidades físicas a cambio de desgaste y fatiga.',
      logic: 'fuerza += 5; vida -= 10; Validar que la vida no quede en 0.'
    },
    {
      option: '3',
      title: 'Ver Estadísticas',
      description: 'Muestra el estado completo del personaje en pantalla.',
      logic: 'Imprime: Nombre, Clase, Nivel, Vida actual, Fuerza, Experiencia y Pociones.'
    },
    {
      option: '4',
      title: 'Salir del Torneo',
      description: 'Finaliza el bucle del juego y se despide.',
      logic: 'opcion = 4; Termina el bucle while.'
    }
  ],
  rules: [
    'Si el jugador gana la pelea: aumenta la experiencia (+40 XP).',
    'Si la experiencia acumulada es >= 100: sube de nivel, aumenta fuerza en 5 y reinicia/descuenta 100 de XP.',
    'Si los puntos de vida llegan a 0 o menos durante una pelea o entrenamiento: mostrar "GAME OVER" y terminar el juego.',
    'El menú debe repetirse indefinidamente hasta que el usuario elija la opción Salir.'
  ],
  extraChallenges: [
    'Sistema de Monedas: Ganar 25 de oro por cada victoria en la arena.',
    'Tienda de Pociones: Agregar opción en el menú para comprar pociones por 20 monedas y usarlas para restaurar 30 HP.',
    'Enemigos Aleatorios: Generar nombres de rivales al azar (Orco, Goblin, Nigromante, Dragón Menor).'
  ],
  steps: [
    { id: 'p1_s1', title: 'Declaración e Inicialización de Variables', desc: 'Crear variables para nombre, clase, vida=100, fuerza=10, nivel=1 y experiencia=0.' },
    { id: 'p1_s2', title: 'Captura de Datos Iniciales', desc: 'Solicitar por consola el nombre del héroe y la selección de clase con lectura por teclado.' },
    { id: 'p1_s3', title: 'Estructura del Menú con while', desc: 'Implementar el bucle principal while (opcion != 4) imprimiendo cada opción en su propia línea.' },
    { id: 'p1_s4', title: 'Lógica de Combate con bucle for', desc: 'Simular los 3 ataques por turno calculando el daño mutuo y evaluando victoria o Game Over.' },
    { id: 'p1_s5', title: 'Lógica de Entrenamiento y Level Up', desc: 'Incrementar fuerza (+5) y restar vida (-10). Verificar si experiencia >= 100 para subir nivel.' }
  ],
  consolePreview: `================================================
          ARENA RPG: TORNEO DE ETHERION         
================================================
Ingresa el nombre de tu héroe: Arthas
Elige tu clase (1. Guerrero / 2. Mago / 3. Arquero): 1

Bienvenido, Guerrero Arthas! Nivel: 1 | Vida: 100 | Fuerza: 10

---------------- MENÚ PRINCIPAL ----------------
1. Pelear en la Arena
2. Entrenar en el Cuartel
3. Ver Estadísticas
4. Salir
Elige una opción: 1

--- ¡COMBATE EN LA ARENA! ---
Turno 1: Arthas golpea causando 10 de daño. Rival contraataca y causa 8 de daño.
Turno 2: Arthas golpea causando 10 de daño. Rival contraataca y causa 12 de daño.
Turno 3: Arthas asesta golpe final. ¡Rival derrotado!
¡Has ganado el combate! +40 XP | Vida restante: 80 HP`,
  solutions: {
    csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("          ARENA RPG: TORNEO DE ETHERION         ");
        Console.WriteLine("================================================");

        // 1. Datos iniciales del jugador
        Console.Write("Ingresa el nombre de tu héroe: ");
        string nombre = Console.ReadLine();

        Console.WriteLine("Elige tu clase:");
        Console.WriteLine("1. Guerrero");
        Console.WriteLine("2. Mago");
        Console.WriteLine("3. Arquero");
        Console.Write("Opción: ");
        string claseOpcion = Console.ReadLine();

        string clase = "Guerrero";
        if (claseOpcion == "2")
        {
            clase = "Mago";
        }
        else if (claseOpcion == "3")
        {
            clase = "Arquero";
        }

        // 2. Variables de estado del héroe
        int vida = 100;
        int fuerza = 10;
        int nivel = 1;
        int experiencia = 0;
        int monedas = 50;
        int pociones = 2;

        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 4 && vida > 0)
        {
            Console.WriteLine("");
            Console.WriteLine("---------------- MENÚ PRINCIPAL ----------------");
            Console.WriteLine("1. Pelear en la Arena");
            Console.WriteLine("2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)");
            Console.WriteLine("3. Ver Estadísticas");
            Console.WriteLine("4. Salir del Torneo");
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
                    Console.WriteLine("--- ¡COMBATE EN LA ARENA DE ETHERION! ---");
                    int vidaEnemigo = 30 + (nivel * 5);
                    int fuerzaEnemigo = 6 + (nivel * 2);

                    // Bucle for para simular los 3 turnos de ataque
                    for (int turno = 1; turno <= 3; turno++)
                    {
                        Console.WriteLine("Turno " + turno + ": " + nombre + " ataca causando " + fuerza + " de daño.");
                        vidaEnemigo -= fuerza;

                        if (vidaEnemigo <= 0)
                        {
                            Console.WriteLine("¡Enemigo abatido antes de que termine el turno!");
                            break;
                        }

                        Console.WriteLine("         El rival responde y causa " + fuerzaEnemigo + " de daño.");
                        vida -= fuerzaEnemigo;

                        if (vida <= 0)
                        {
                            Console.WriteLine("¡Has caído en combate! GAME OVER.");
                            break;
                        }
                    }

                    if (vida > 0)
                    {
                        Console.WriteLine("¡Victoria en la arena! Obtienes +40 XP y +25 monedas.");
                        experiencia += 40;
                        monedas += 25;

                        // Subida de nivel al llegar a 100 XP
                        if (experiencia >= 100)
                        {
                            nivel++;
                            fuerza += 5;
                            experiencia -= 100;
                            vida = 100; // Restaurar vida completa al subir de nivel
                            Console.WriteLine("");
                            Console.WriteLine("⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " + nivel + " y tu fuerza es " + fuerza + ". HP restaurado.");
                        }
                    }
                    break;

                case 2:
                    if (vida > 10)
                    {
                        fuerza += 5;
                        vida -= 10;
                        Console.WriteLine("");
                        Console.WriteLine("[!] Has entrenado duro en el cuartel.");
                        Console.WriteLine("    Fuerza aumentada a " + fuerza + ".");
                        Console.WriteLine("    Vida actual: " + vida + " HP.");
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("[!] Estás demasiado débil para entrenar. ¡Peligro de muerte!");
                    }
                    break;

                case 3:
                    Console.WriteLine("");
                    Console.WriteLine("================ ESTADÍSTICAS ================");
                    Console.WriteLine("Héroe:       " + nombre);
                    Console.WriteLine("Clase:       " + clase);
                    Console.WriteLine("Nivel:       " + nivel);
                    Console.WriteLine("Vida:        " + vida + " / 100 HP");
                    Console.WriteLine("Fuerza:      " + fuerza);
                    Console.WriteLine("Experiencia: " + experiencia + " / 100 XP");
                    Console.WriteLine("Monedas:     " + monedas + " oro");
                    Console.WriteLine("Pociones:    " + pociones);
                    Console.WriteLine("==============================================");
                    break;

                case 4:
                    Console.WriteLine("");
                    Console.WriteLine("¡Gracias por jugar, " + nombre + "! Hasta la próxima batalla.");
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
            Console.WriteLine("☠️ Tu héroe ha perecido en el reino de Etherion. FIN DEL JUEGO.");
        }
    }
}`,
    python: `def main():
    print("================================================")
    print("          ARENA RPG: TORNEO DE ETHERION         ")
    print("================================================")
    
    # 1. Datos iniciales del jugador
    nombre = input("Ingresa el nombre de tu héroe: ")
    
    print("Elige tu clase:")
    print("1. Guerrero")
    print("2. Mago")
    print("3. Arquero")
    clase_op = input("Opción: ")
    
    clase = "Guerrero"
    if clase_op == "2":
        clase = "Mago"
    elif clase_op == "3":
        clase = "Arquero"

    # 2. Variables de estado
    vida = 100
    fuerza = 10
    nivel = 1
    experiencia = 0
    monedas = 50
    pociones = 2
    opcion = 0

    # 3. Bucle interactivo principal
    while opcion != 4 and vida > 0:
        print("")
        print("---------------- MENÚ PRINCIPAL ----------------")
        print("1. Pelear en la Arena")
        print("2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)")
        print("3. Ver Estadísticas")
        print("4. Salir del Torneo")
        
        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida. Ingresa un número.")
            continue

        if opcion == 1:
            print("")
            print("--- ¡COMBATE EN LA ARENA DE ETHERION! ---")
            vida_enemigo = 30 + (nivel * 5)
            fuerza_enemigo = 6 + (nivel * 2)
            
            # Bucle for para los 3 turnos de combate
            for turno in range(1, 4):
                print("Turno " + str(turno) + ": " + nombre + " ataca causando " + str(fuerza) + " de daño.")
                vida_enemigo -= fuerza
                
                if vida_enemigo <= 0:
                    print("¡Enemigo abatido antes de que termine el turno!")
                    break
                
                print("         El rival responde y causa " + str(fuerza_enemigo) + " de daño.")
                vida -= fuerza_enemigo
                
                if vida <= 0:
                    print("¡Has caído en combate! GAME OVER.")
                    break

            if vida > 0:
                print("¡Victoria en la arena! Obtienes +40 XP y +25 monedas.")
                experiencia += 40
                monedas += 25
                
                # Subida de nivel
                if experiencia >= 100:
                    nivel += 1
                    fuerza += 5
                    experiencia -= 100
                    vida = 100
                    print("")
                    print("⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " + str(nivel) + " y tu fuerza es " + str(fuerza) + ". HP restaurado.")

        elif opcion == 2:
            if vida > 10:
                fuerza += 5
                vida -= 10
                print("")
                print("[!] Has entrenado duro en el cuartel.")
                print("    Fuerza aumentada a " + str(fuerza) + ".")
                print("    Vida actual: " + str(vida) + " HP.")
            else:
                print("")
                print("[!] Estás demasiado débil para entrenar. ¡Peligro de muerte!")

        elif opcion == 3:
            print("")
            print("================ ESTADÍSTICAS ================")
            print("Héroe:       " + nombre)
            print("Clase:       " + clase)
            print("Nivel:       " + str(nivel))
            print("Vida:        " + str(vida) + " / 100 HP")
            print("Fuerza:      " + str(fuerza))
            print("Experiencia: " + str(experiencia) + " / 100 XP")
            print("Monedas:     " + str(monedas) + " oro")
            print("Pociones:    " + str(pociones))
            print("==============================================")

        elif opcion == 4:
            print("")
            print("¡Gracias por jugar, " + nombre + "! Hasta la próxima batalla.")

        else:
            print("")
            print(">> Opción no reconocida. Intenta de nuevo.")

    if vida <= 0:
        print("")
        print("☠️ Tu héroe ha perecido en el reino de Etherion. FIN DEL JUEGO.")

if __name__ == '__main__':
    main()`,
    java: `import java.util.Scanner;

public class ArenaRPG {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("================================================");
        System.out.println("          ARENA RPG: TORNEO DE ETHERION         ");
        System.out.println("================================================");

        // 1. Datos iniciales del jugador
        System.out.print("Ingresa el nombre de tu héroe: ");
        String nombre = sc.nextLine();

        System.out.println("Elige tu clase:");
        System.out.println("1. Guerrero");
        System.out.println("2. Mago");
        System.out.println("3. Arquero");
        System.out.print("Opción: ");
        String claseOp = sc.nextLine();

        String clase = "Guerrero";
        if (claseOp.equals("2")) {
            clase = "Mago";
        } else if (claseOp.equals("3")) {
            clase = "Arquero";
        }

        // 2. Variables de estado
        int vida = 100;
        int fuerza = 10;
        int nivel = 1;
        int experiencia = 0;
        int monedas = 50;
        int pociones = 2;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 4 && vida > 0) {
            System.out.println("");
            System.out.println("---------------- MENÚ PRINCIPAL ----------------");
            System.out.println("1. Pelear en la Arena");
            System.out.println("2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)");
            System.out.println("3. Ver Estadísticas");
            System.out.println("4. Salir del Torneo");
            System.out.print("Elige una opción: ");

            if (!sc.hasNextInt()) {
                System.out.println(">> Opción inválida. Ingresa un número.");
                sc.next();
                continue;
            }
            opcion = sc.nextInt();

            if (opcion == 1) {
                System.out.println("");
                System.out.println("--- ¡COMBATE EN LA ARENA DE ETHERION! ---");
                int vidaEnemigo = 30 + (nivel * 5);
                int fuerzaEnemigo = 6 + (nivel * 2);

                // Bucle for para los 3 turnos de combate
                for (int turno = 1; turno <= 3; turno++) {
                    System.out.println("Turno " + turno + ": " + nombre + " ataca causando " + fuerza + " de daño.");
                    vidaEnemigo -= fuerza;

                    if (vidaEnemigo <= 0) {
                        System.out.println("¡Enemigo abatido antes de que termine el turno!");
                        break;
                    }

                    System.out.println("         El rival responde y causa " + fuerzaEnemigo + " de daño.");
                    vida -= fuerzaEnemigo;

                    if (vida <= 0) {
                        System.out.println("¡Has caído en combate! GAME OVER.");
                        break;
                    }
                }

                if (vida > 0) {
                    System.out.println("¡Victoria en la arena! Obtienes +40 XP y +25 monedas.");
                    experiencia += 40;
                    monedas += 25;

                    // Subida de nivel
                    if (experiencia >= 100) {
                        nivel++;
                        fuerza += 5;
                        experiencia -= 100;
                        vida = 100;
                        System.out.println("");
                        System.out.println("⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " + nivel + " y tu fuerza es " + fuerza + ". HP restaurado.");
                    }
                }
            } else if (opcion == 2) {
                if (vida > 10) {
                    fuerza += 5;
                    vida -= 10;
                    System.out.println("");
                    System.out.println("[!] Has entrenado duro en el cuartel.");
                    System.out.println("    Fuerza aumentada a " + fuerza + ".");
                    System.out.println("    Vida actual: " + vida + " HP.");
                } else {
                    System.out.println("");
                    System.out.println("[!] Estás demasiado débil para entrenar. ¡Peligro de muerte!");
                }
            } else if (opcion == 3) {
                System.out.println("");
                System.out.println("================ ESTADÍSTICAS ================");
                System.out.println("Héroe:       " + nombre);
                System.out.println("Clase:       " + clase);
                System.out.println("Nivel:       " + nivel);
                System.out.println("Vida:        " + vida + " / 100 HP");
                System.out.println("Fuerza:      " + fuerza);
                System.out.println("Experiencia: " + experiencia + " / 100 XP");
                System.out.println("Monedas:     " + monedas + " oro");
                System.out.println("Pociones:    " + pociones);
                System.out.println("==============================================");
            } else if (opcion == 4) {
                System.out.println("");
                System.out.println("¡Gracias por jugar, " + nombre + "! Hasta la próxima batalla.");
            } else {
                System.out.println("");
                System.out.println(">> Opción no reconocida. Intenta de nuevo.");
            }
        }

        if (vida <= 0) {
            System.out.println("");
            System.out.println("☠️ Tu héroe ha perecido en el reino de Etherion. FIN DEL JUEGO.");
        }
    }
}`,
    cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "================================================" << endl;
    cout << "          ARENA RPG: TORNEO DE ETHERION         " << endl;
    cout << "================================================" << endl;

    // 1. Datos iniciales del jugador
    string nombre;
    cout << "Ingresa el nombre de tu heroe: ";
    cin >> nombre;

    cout << "Elige tu clase:" << endl;
    cout << "1. Guerrero" << endl;
    cout << "2. Mago" << endl;
    cout << "3. Arquero" << endl;
    cout << "Opcion: ";
    string claseOp;
    cin >> claseOp;

    string clase = "Guerrero";
    if (claseOp == "2") {
        clase = "Mago";
    } else if (claseOp == "3") {
        clase = "Arquero";
    }

    // 2. Variables de estado
    int vida = 100;
    int fuerza = 10;
    int nivel = 1;
    int exp = 0;
    int monedas = 50;
    int pociones = 2;
    int opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion != 4 && vida > 0) {
        cout << endl;
        cout << "---------------- MENÚ PRINCIPAL ----------------" << endl;
        cout << "1. Pelear en la Arena" << endl;
        cout << "2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)" << endl;
        cout << "3. Ver Estadisticas" << endl;
        cout << "4. Salir del Torneo" << endl;
        cout << "Elige una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            cout << endl;
            cout << "--- ¡COMBATE EN LA ARENA DE ETHERION! ---" << endl;
            int vidaEnemigo = 30 + (nivel * 5);
            int fuerzaEnemigo = 6 + (nivel * 2);

            // Bucle for para los 3 turnos de combate
            for (int turno = 1; turno <= 3; turno++) {
                cout << "Turno " << turno << ": " << nombre << " ataca causando " << fuerza << " de dano." << endl;
                vidaEnemigo -= fuerza;

                if (vidaEnemigo <= 0) {
                    cout << "¡Enemigo abatido antes de que termine el turno!" << endl;
                    break;
                }

                cout << "         El rival responde y causa " << fuerzaEnemigo << " de dano." << endl;
                vida -= fuerzaEnemigo;

                if (vida <= 0) {
                    cout << "¡Has caido en combate! GAME OVER." << endl;
                    break;
                }
            }

            if (vida > 0) {
                cout << "¡Victoria en la arena! Obtienes +40 XP y +25 monedas." << endl;
                exp += 40;
                monedas += 25;

                // Subida de nivel
                if (exp >= 100) {
                    nivel++;
                    fuerza += 5;
                    exp -= 100;
                    vida = 100;
                    cout << endl;
                    cout << "⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " << nivel << " y tu fuerza es " << fuerza << ". HP restaurado." << endl;
                }
            }
        } else if (opcion == 2) {
            if (vida > 10) {
                fuerza += 5;
                vida -= 10;
                cout << endl;
                cout << "[!] Has entrenado duro en el cuartel." << endl;
                cout << "    Fuerza aumentada a " << fuerza << "." << endl;
                cout << "    Vida actual: " << vida << " HP." << endl;
            } else {
                cout << endl;
                cout << "[!] Estas demasiado debil para entrenar. ¡Peligro de muerte!" << endl;
            }
        } else if (opcion == 3) {
            cout << endl;
            cout << "================ ESTADISTICAS ================" << endl;
            cout << "Heroe:       " << nombre << endl;
            cout << "Clase:       " << clase << endl;
            cout << "Nivel:       " << nivel << endl;
            cout << "Vida:        " << vida << " / 100 HP" << endl;
            cout << "Fuerza:      " << fuerza << endl;
            cout << "Experiencia: " << exp << " / 100 XP" << endl;
            cout << "Monedas:     " << monedas << " oro" << endl;
            cout << "Pociones:    " << pociones << endl;
            cout << "==============================================" << endl;
        } else if (opcion == 4) {
            cout << endl;
            cout << "¡Gracias por jugar, " << nombre << "! Hasta la proxima batalla." << endl;
        } else {
            cout << endl;
            cout << ">> Opcion no reconocida. Intenta de nuevo." << endl;
        }
    }

    if (vida <= 0) {
        cout << endl;
        cout << "☠️ Tu heroe ha perecido en el reino de Etherion. FIN DEL JUEGO." << endl;
    }

    return 0;
}`,
    javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("================================================");
    console.log("          ARENA RPG: TORNEO DE ETHERION         ");
    console.log("================================================");

    // 1. Datos iniciales del jugador
    const nombre = await ask("Ingresa el nombre de tu héroe: ");

    console.log("Elige tu clase:");
    console.log("1. Guerrero");
    console.log("2. Mago");
    console.log("3. Arquero");
    const claseOp = await ask("Opción: ");

    let clase = "Guerrero";
    if (claseOp === "2") {
        clase = "Mago";
    } else if (claseOp === "3") {
        clase = "Arquero";
    }

    // 2. Variables de estado
    let vida = 100;
    let fuerza = 10;
    let nivel = 1;
    let exp = 0;
    let monedas = 50;
    let pociones = 2;
    let opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion !== 4 && vida > 0) {
        console.log("");
        console.log("---------------- MENÚ PRINCIPAL ----------------");
        console.log("1. Pelear en la Arena");
        console.log("2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)");
        console.log("3. Ver Estadísticas");
        console.log("4. Salir del Torneo");

        const resp = await ask("Elige una opción: ");
        opcion = parseInt(resp, 10);

        if (isNaN(opcion)) {
            console.log(">> Opción inválida. Ingresa un número.");
            continue;
        }

        if (opcion === 1) {
            console.log("");
            console.log("--- ¡COMBATE EN LA ARENA DE ETHERION! ---");
            let vidaEnemigo = 30 + (nivel * 5);
            let fuerzaEnemigo = 6 + (nivel * 2);

            // Bucle for para los 3 turnos de combate
            for (let turno = 1; turno <= 3; turno++) {
                console.log("Turno " + turno + ": " + nombre + " ataca causando " + fuerza + " de daño.");
                vidaEnemigo -= fuerza;

                if (vidaEnemigo <= 0) {
                    console.log("¡Enemigo abatido antes de que termine el turno!");
                    break;
                }

                console.log("         El rival responde y causa " + fuerzaEnemigo + " de daño.");
                vida -= fuerzaEnemigo;

                if (vida <= 0) {
                    console.log("¡Has caído en combate! GAME OVER.");
                    break;
                }
            }

            if (vida > 0) {
                console.log("¡Victoria en la arena! Obtienes +40 XP y +25 monedas.");
                exp += 40;
                monedas += 25;

                // Subida de nivel
                if (exp >= 100) {
                    nivel++;
                    fuerza += 5;
                    exp -= 100;
                    vida = 100;
                    console.log("");
                    console.log("⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " + nivel + " y tu fuerza es " + fuerza + ". HP restaurado.");
                }
            }
        } else if (opcion === 2) {
            if (vida > 10) {
                fuerza += 5;
                vida -= 10;
                console.log("");
                console.log("[!] Has entrenado duro en el cuartel.");
                console.log("    Fuerza aumentada a " + fuerza + ".");
                console.log("    Vida actual: " + vida + " HP.");
            } else {
                console.log("");
                console.log("[!] Estás demasiado débil para entrenar. ¡Peligro de muerte!");
            }
        } else if (opcion === 3) {
            console.log("");
            console.log("================ ESTADÍSTICAS ================");
            console.log("Héroe:       " + nombre);
            console.log("Clase:       " + clase);
            console.log("Nivel:       " + nivel);
            console.log("Vida:        " + vida + " / 100 HP");
            console.log("Fuerza:      " + fuerza);
            console.log("Experiencia: " + exp + " / 100 XP");
            console.log("Monedas:     " + monedas + " oro");
            console.log("Pociones:    " + pociones);
            console.log("==============================================");
        } else if (opcion === 4) {
            console.log("");
            console.log("¡Gracias por jugar, " + nombre + "! Hasta la próxima batalla.");
        } else {
            console.log("");
            console.log(">> Opción no reconocida. Intenta de nuevo.");
        }
    }

    if (vida <= 0) {
        console.log("");
        console.log("☠️ Tu héroe ha perecido en el reino de Etherion. FIN DEL JUEGO.");
    }

    rl.close();
}

main();`,
    php: `<?php
echo "================================================\\n";
echo "          ARENA RPG: TORNEO DE ETHERION         \\n";
echo "================================================\\n";

// 1. Datos iniciales del jugador
echo "Ingresa el nombre de tu héroe: ";
$nombre = trim(fgets(STDIN));

echo "Elige tu clase:\\n";
echo "1. Guerrero\\n";
echo "2. Mago\\n";
echo "3. Arquero\\n";
echo "Opción: ";
$claseOp = trim(fgets(STDIN));

$clase = "Guerrero";
if ($claseOp === "2") {
    $clase = "Mago";
} else if ($claseOp === "3") {
    $clase = "Arquero";
}

// 2. Variables de estado
$vida = 100;
$fuerza = 10;
$nivel = 1;
$exp = 0;
$monedas = 50;
$pociones = 2;
$opcion = 0;

// 3. Bucle interactivo principal
while ($opcion != 4 && $vida > 0) {
    echo "\\n";
    echo "---------------- MENÚ PRINCIPAL ----------------\\n";
    echo "1. Pelear en la Arena\\n";
    echo "2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)\\n";
    echo "3. Ver Estadísticas\\n";
    echo "4. Salir del Torneo\\n";
    echo "Elige una opción: ";

    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        echo "\\n";
        echo "--- ¡COMBATE EN LA ARENA DE ETHERION! ---\\n";
        $vidaEnemigo = 30 + ($nivel * 5);
        $fuerzaEnemigo = 6 + ($nivel * 2);

        // Bucle for para los 3 turnos de combate
        for ($turno = 1; $turno <= 3; $turno++) {
            echo "Turno " . $turno . ": " . $nombre . " ataca causando " . $fuerza . " de daño.\\n";
            $vidaEnemigo -= $fuerza;

            if ($vidaEnemigo <= 0) {
                echo "¡Enemigo abatido antes de que termine el turno!\\n";
                break;
            }

            echo "         El rival responde y causa " . $fuerzaEnemigo . " de daño.\\n";
            $vida -= $fuerzaEnemigo;

            if ($vida <= 0) {
                echo "¡Has caído en combate! GAME OVER.\\n";
                break;
            }
        }

        if ($vida > 0) {
            echo "¡Victoria en la arena! Obtienes +40 XP y +25 monedas.\\n";
            $exp += 40;
            $monedas += 25;

            // Subida de nivel
            if ($exp >= 100) {
                $nivel++;
                $fuerza += 5;
                $exp -= 100;
                $vida = 100;
                echo "\\n";
                echo "⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " . $nivel . " y tu fuerza es " . $fuerza . ". HP restaurado.\\n";
            }
        }
    } else if ($opcion == 2) {
        if ($vida > 10) {
            $fuerza += 5;
            $vida -= 10;
            echo "\\n";
            echo "[!] Has entrenado duro en el cuartel.\\n";
            echo "    Fuerza aumentada a " . $fuerza . ".\\n";
            echo "    Vida actual: " . $vida . " HP.\\n";
        } else {
            echo "\\n";
            echo "[!] Estás demasiado débil para entrenar. ¡Peligro de muerte!\\n";
        }
    } else if ($opcion == 3) {
        echo "\\n";
        echo "================ ESTADÍSTICAS ================\\n";
        echo "Héroe:       " . $nombre . "\\n";
        echo "Clase:       " . $clase . "\\n";
        echo "Nivel:       " . $nivel . "\\n";
        echo "Vida:        " . $vida . " / 100 HP\\n";
        echo "Fuerza:      " . $fuerza . "\\n";
        echo "Experiencia: " . $exp . " / 100 XP\\n";
        echo "Monedas:     " . $monedas . " oro\\n";
        echo "Pociones:    " . $pociones . "\\n";
        echo "==============================================\\n";
    } else if ($opcion == 4) {
        echo "\\n";
        echo "¡Gracias por jugar, " . $nombre . "! Hasta la próxima batalla.\\n";
    } else {
        echo "\\n";
        echo ">> Opción no reconocida. Intenta de nuevo.\\n";
    }
}

if ($vida <= 0) {
    echo "\\n";
    echo "☠️ Tu héroe ha perecido en el reino de Etherion. FIN DEL JUEGO.\\n";
}
?>`,
    pseint: `Algoritmo ArenaRPG
    // 1. Declaración de variables
    Definir nombre, clase, claseOp Como Cadena
    Definir vida, fuerza, nivel, exp, monedas, pociones, opcion, turno, vidaEnemigo, fuerzaEnemigo Como Entero
    
    Escribir "================================================"
    Escribir "          ARENA RPG: TORNEO DE ETHERION         "
    Escribir "================================================"
    
    Escribir "Ingresa el nombre de tu heroe:"
    Leer nombre
    
    Escribir "Elige tu clase:"
    Escribir "1. Guerrero"
    Escribir "2. Mago"
    Escribir "3. Arquero"
    Escribir "Opcion:"
    Leer claseOp
    
    clase = "Guerrero"
    Si claseOp = "2" Entonces
        clase = "Mago"
    SiNo
        Si claseOp = "3" Entonces
            clase = "Arquero"
        FinSi
    FinSi
    
    // 2. Inicialización de estado con =
    vida = 100
    fuerza = 10
    nivel = 1
    exp = 0
    monedas = 50
    pociones = 2
    opcion = 0
    
    // 3. Bucle interactivo principal
    Mientras opcion <> 4 Y vida > 0 Hacer
        Escribir ""
        Escribir "---------------- MENÚ PRINCIPAL ----------------"
        Escribir "1. Pelear en la Arena"
        Escribir "2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)"
        Escribir "3. Ver Estadisticas"
        Escribir "4. Salir del Torneo"
        Escribir "Elige una opcion:"
        Leer opcion
        
        Segun opcion Hacer
            1:
                Escribir ""
                Escribir "--- ¡COMBATE EN LA ARENA DE ETHERION! ---"
                vidaEnemigo = 30 + (nivel * 5)
                fuerzaEnemigo = 6 + (nivel * 2)
                
                // Bucle para 3 turnos de combate
                Para turno = 1 Hasta 3 Con Paso 1 Hacer
                    Escribir "Turno ", turno, ": ", nombre, " ataca causando ", fuerza, " de dano."
                    vidaEnemigo = vidaEnemigo - fuerza
                    
                    Si vidaEnemigo <= 0 Entonces
                        Escribir "¡Enemigo abatido antes de que termine el turno!"
                        turno = 4 // Salida del combate
                    SiNo
                        Escribir "         El rival responde y causa ", fuerzaEnemigo, " de dano."
                        vida = vida - fuerzaEnemigo
                        
                        Si vida <= 0 Entonces
                            Escribir "¡Has caido en combate! GAME OVER."
                            turno = 4
                        FinSi
                    FinSi
                FinPara
                
                Si vida > 0 Entonces
                    Escribir "¡Victoria en la arena! Obtienes +40 XP y +25 monedas."
                    exp = exp + 40
                    monedas = monedas + 25
                    
                    // Subida de nivel al llegar a 100 XP
                    Si exp >= 100 Entonces
                        nivel = nivel + 1
                        fuerza = fuerza + 5
                        exp = exp - 100
                        vida = 100
                        Escribir ""
                        Escribir "⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel ", nivel, " y tu fuerza es ", fuerza, ". HP restaurado."
                    FinSi
                FinSi
            2:
                Si vida > 10 Entonces
                    fuerza = fuerza + 5
                    vida = vida - 10
                    Escribir ""
                    Escribir "[!] Has entrenado duro en el cuartel."
                    Escribir "    Fuerza aumentada a ", fuerza, "."
                    Escribir "    Vida actual: ", vida, " HP."
                SiNo
                    Escribir ""
                    Escribir "[!] Estas demasiado debil para entrenar. ¡Peligro de muerte!"
                FinSi
            3:
                Escribir ""
                Escribir "================ ESTADISTICAS ================"
                Escribir "Heroe:       ", nombre
                Escribir "Clase:       ", clase
                Escribir "Nivel:       ", nivel
                Escribir "Vida:        ", vida, " / 100 HP"
                Escribir "Fuerza:      ", fuerza
                Escribir "Experiencia: ", exp, " / 100 XP"
                Escribir "Monedas:     ", monedas, " oro"
                Escribir "Pociones:    ", pociones
                Escribir "=============================================="
            4:
                Escribir ""
                Escribir "¡Gracias por jugar, ", nombre, "! Hasta la proxima batalla."
            De Otro Modo:
                Escribir ""
                Escribir ">> Opcion no reconocida. Intenta de nuevo."
        FinSegun
    FinMientras
    
    Si vida <= 0 Entonces
        Escribir ""
        Escribir "☠️ Tu heroe ha perecido en el reino de Etherion. FIN DEL JUEGO."
    FinSi
FinAlgoritmo`
  }
};
