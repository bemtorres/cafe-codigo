export interface GameProjectVariable {
  name: string;
  type: string;
  initialValue: string;
  description: string;
}

export interface GameProjectMenuOption {
  option: string;
  title: string;
  description: string;
  logic: string;
}

export interface GameProjectStep {
  id: string;
  title: string;
  desc: string;
}

export interface GameProject {
  id: number;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  badge: string;
  difficulty: string;
  story: string;
  objective: string;
  initialInputs: string[];
  variables: GameProjectVariable[];
  menuOptions: GameProjectMenuOption[];
  rules: string[];
  extraChallenges: string[];
  steps: GameProjectStep[];
  consolePreview: string;
  solutions: {
    csharp: string;
    python: string;
    java: string;
    cpp: string;
    javascript: string;
    php: string;
    pseint: string;
  };
}

export const gameProjectsData: GameProject[] = [
  {
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
      { id: 'p1_s2', title: 'Captura de Datos Iniciales', desc: 'Solicitar por consola el nombre del héroe y la selección de clase con Console.ReadLine().' },
      { id: 'p1_s3', title: 'Estructura del Menú con while', desc: 'Implementar el bucle principal while (opcion != 4) con un switch/if para procesar las 4 opciones.' },
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

        Console.WriteLine("Elige tu clase: 1. Guerrero | 2. Mago | 3. Arquero");
        Console.Write("Opción: ");
        string claseOpcion = Console.ReadLine();
        string clase = claseOpcion == "2" ? "Mago" : (claseOpcion == "3" ? "Arquero" : "Guerrero");

        // 2. Variables de estado
        int vida = 100;
        int fuerza = 10;
        int nivel = 1;
        int experiencia = 0;
        int monedas = 50;
        int pociones = 2;

        int opcion = 0;

        // 3. Bucle interactivo del juego
        while (opcion != 4 && vida > 0)
        {
            Console.WriteLine("\\n---------------- MENÚ PRINCIPAL ----------------");
            Console.WriteLine("1. Pelear en la Arena");
            Console.WriteLine("2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)");
            Console.WriteLine("3. Ver Estadísticas");
            Console.WriteLine("4. Salir");
            Console.Write("Elige una opción: ");
            
            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida. Ingresa un número del 1 al 4.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("\\n--- ¡COMBATE EN LA ARENA DE ETHERION! ---");
                    int vidaEnemigo = 30 + (nivel * 5);
                    int fuerzaEnemigo = 6 + (nivel * 2);

                    // Bucle for para simular 3 ataques
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

                        // Subida de nivel
                        if (experiencia >= 100)
                        {
                            nivel++;
                            fuerza += 5;
                            experiencia -= 100;
                            vida = 100; // Restaurar vida completa al subir de nivel
                            Console.WriteLine("\\n⭐ ¡SUBISTE DE NIVEL! Ahora eres Nivel " + nivel + " y tu fuerza es " + fuerza + ". HP restaurado.");
                        }
                    }
                    break;

                case 2:
                    if (vida > 10)
                    {
                        fuerza += 5;
                        vida -= 10;
                        Console.WriteLine("\\n[!] Has entrenado duro. Fuerza aumentada a " + fuerza + ". Vida actual: " + vida + " HP.");
                    }
                    else
                    {
                        Console.WriteLine("\\n[!] Estás demasiado débil para entrenar. ¡Peligro de muerte!");
                    }
                    break;

                case 3:
                    Console.WriteLine("\\n================ ESTADÍSTICAS ================");
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
                    Console.WriteLine("\\n¡Gracias por jugar, " + nombre + "! Hasta la próxima batalla.");
                    break;

                default:
                    Console.WriteLine("\\n>> Opción no reconocida. Intenta de nuevo.");
                    break;
            }
        }

        if (vida <= 0)
        {
            Console.WriteLine("\\n☠️ Tu héroe ha perecido en el reino de Etherion. FIN DEL JUEGO.");
        }
    }
}`,
      python: `def main():
    print("================================================")
    print("          ARENA RPG: TORNEO DE ETHERION         ")
    print("================================================")
    
    nombre = input("Ingresa el nombre de tu héroe: ")
    print("Elige tu clase: 1. Guerrero | 2. Mago | 3. Arquero")
    clase_op = input("Opción: ")
    clase = "Mago" if clase_op == "2" else ("Arquero" if clase_op == "3" else "Guerrero")

    vida = 100
    fuerza = 10
    nivel = 1
    experiencia = 0
    monedas = 50
    opcion = 0

    while opcion != 4 and vida > 0:
        print("\\n---------------- MENÚ PRINCIPAL ----------------")
        print("1. Pelear en la Arena")
        print("2. Entrenar en el Cuartel (+5 Fuerza, -10 Vida)")
        print("3. Ver Estadísticas")
        print("4. Salir")
        
        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida.")
            continue

        if opcion == 1:
            print("\\n--- ¡COMBATE EN LA ARENA DE ETHERION! ---")
            fuerza_enemigo = 6 + (nivel * 2)
            
            for turno in range(1, 4):
                print("Turno " + str(turno) + ": " + nombre + " ataca causando " + str(fuerza) + " de daño.")
                print("         El rival contraataca y causa " + str(fuerza_enemigo) + " de daño.")
                vida -= fuerza_enemigo
                if vida <= 0:
                    break

            if vida > 0:
                print("¡Victoria! +40 XP y +25 monedas.")
                experiencia += 40
                monedas += 25
                if experiencia >= 100:
                    nivel += 1
                    fuerza += 5
                    experiencia -= 100
                    vida = 100
                    print("⭐ ¡SUBISTE A NIVEL " + str(nivel) + "! Fuerza: " + str(fuerza))
            else:
                print("¡GAME OVER! Has caído en la arena.")

        elif opcion == 2:
            if vida > 10:
                fuerza += 5
                vida -= 10
                print("[!] Entrenamiento completado. Fuerza: " + str(fuerza) + " | Vida: " + str(vida))
            else:
                print("[!] Demasiado agotado para entrenar.")

        elif opcion == 3:
            print("\\nStats -> Nombre: " + nombre + " | Clase: " + clase + " | Nivel: " + str(nivel) + " | HP: " + str(vida) + " | Fuerza: " + str(fuerza) + " | XP: " + str(experiencia) + "/100")

        elif opcion == 4:
            print("¡Adiós " + nombre + "!")

if __name__ == '__main__':
    main()`,
      java: `import java.util.Scanner;

public class ArenaRPG {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("================================================");
        System.out.println("          ARENA RPG: TORNEO DE ETHERION         ");
        System.out.println("================================================");

        System.out.print("Ingresa el nombre de tu héroe: ");
        String nombre = sc.nextLine();

        System.out.println("Elige clase: 1. Guerrero | 2. Mago | 3. Arquero");
        String claseOp = sc.nextLine();
        String clase = claseOp.equals("2") ? "Mago" : (claseOp.equals("3") ? "Arquero" : "Guerrero");

        int vida = 100;
        int fuerza = 10;
        int nivel = 1;
        int experiencia = 0;
        int opcion = 0;

        while (opcion != 4 && vida > 0) {
            System.out.println("\\n1. Pelear | 2. Entrenar | 3. Ver Stats | 4. Salir");
            System.out.print("Opción: ");
            if (!sc.hasNextInt()) { sc.next(); continue; }
            opcion = sc.nextInt();

            if (opcion == 1) {
                for (int t = 1; t <= 3; t++) {
                    System.out.println("Turno " + t + ": " + nombre + " ataca con " + fuerza + " daño.");
                    vida -= 8;
                    if (vida <= 0) break;
                }
                if (vida > 0) {
                    experiencia += 40;
                    System.out.println("¡Victoria! +40 XP. Total XP: " + experiencia);
                    if (experiencia >= 100) {
                        nivel++;
                        fuerza += 5;
                        experiencia -= 100;
                        vida = 100;
                        System.out.println("⭐ ¡Subiste a Nivel " + nivel + "!");
                    }
                }
            } else if (opcion == 2) {
                if (vida > 10) { fuerza += 5; vida -= 10; System.out.println("Fuerza: " + fuerza + ", Vida: " + vida); }
            } else if (opcion == 3) {
                System.out.println("Héroe: " + nombre + " | Clase: " + clase + " | Nivel: " + nivel + " | HP: " + vida + " | Fuerza: " + fuerza);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "=== ARENA RPG: TORNEO DE ETHERION ===" << endl;
    string nombre;
    cout << "Ingresa nombre de heroe: ";
    cin >> nombre;

    int vida = 100, fuerza = 10, nivel = 1, exp = 0, opcion = 0;

    while (opcion != 4 && vida > 0) {
        cout << "\\n1. Pelear\\n2. Entrenar\\n3. Ver stats\\n4. Salir\\nOpcion: ";
        cin >> opcion;

        if (opcion == 1) {
            for (int i = 1; i <= 3; i++) {
                cout << "Turno " << i << ": Atacas causando " << fuerza << " dano. Enemigo te inflige 8." << endl;
                vida -= 8;
                if (vida <= 0) break;
            }
            if (vida > 0) {
                exp += 40;
                cout << "Victoria! +40 XP." << endl;
                if (exp >= 100) { nivel++; fuerza += 5; exp -= 100; vida = 100; cout << "Subiste a Nivel " << nivel << endl; }
            }
        } else if (opcion == 2) {
            if (vida > 10) { fuerza += 5; vida -= 10; cout << "Fuerza: " << fuerza << ", Vida: " << vida << endl; }
        } else if (opcion == 3) {
            cout << "Heroe: " << nombre << " | Nivel: " << nivel << " | HP: " << vida << " | Fuerza: " << fuerza << " | XP: " << exp << endl;
        }
    }
    return 0;
}`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("=== ARENA RPG: TORNEO DE ETHERION ===");
    const nombre = await ask("Ingresa nombre de tu héroe: ");
    
    let vida = 100, fuerza = 10, nivel = 1, exp = 0, opcion = 0;

    while (opcion !== 4 && vida > 0) {
        console.log("\\n1. Pelear | 2. Entrenar | 3. Stats | 4. Salir");
        opcion = parseInt(await ask("Opción: "), 10);

        if (opcion === 1) {
            for (let i = 1; i <= 3; i++) {
                console.log("Turno " + i + ": " + nombre + " ataca con " + fuerza + ". Rival responde con 8 de daño.");
                vida -= 8;
                if (vida <= 0) break;
            }
            if (vida > 0) {
                exp += 40;
                console.log("¡Victoria! +40 XP.");
                if (exp >= 100) { nivel++; fuerza += 5; exp -= 100; vida = 100; console.log("⭐ Nivel " + nivel + "!"); }
            }
        } else if (opcion === 2) {
            if (vida > 10) { fuerza += 5; vida -= 10; console.log("Fuerza: " + fuerza + " | HP: " + vida); }
        } else if (opcion === 3) {
            console.log("Stats -> " + nombre + " | Nivel: " + nivel + " | HP: " + vida + " | Fuerza: " + fuerza + " | XP: " + exp + "/100");
        }
    }
    rl.close();
}
main();`,
      php: `<?php
echo "=== ARENA RPG: TORNEO DE ETHERION ===\\n";
echo "Nombre del héroe: ";
$nombre = trim(fgets(STDIN));

$vida = 100; $fuerza = 10; $nivel = 1; $exp = 0; $opcion = 0;

while ($opcion != 4 && $vida > 0) {
    echo "\\n1. Pelear\\n2. Entrenar\\n3. Ver stats\\n4. Salir\\nOpción: ";
    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        for ($i = 1; $i <= 3; $i++) {
            echo "Turno $i: $nombre ataca ($fuerza dmg). Rival causa 8 dmg.\\n";
            $vida -= 8;
            if ($vida <= 0) break;
        }
        if ($vida > 0) {
            $exp += 40;
            echo "Victoria! +40 XP.\\n";
            if ($exp >= 100) { $nivel++; $fuerza += 5; $exp -= 100; $vida = 100; echo "Subiste a Nivel $nivel!\\n"; }
        }
    } else if ($opcion == 2) {
        if ($vida > 10) { $fuerza += 5; $vida -= 10; echo "Fuerza: $fuerza | HP: $vida\\n"; }
    } else if ($opcion == 3) {
        echo "Stats: $nombre | Nivel: $nivel | HP: $vida | Fuerza: $fuerza | XP: $exp/100\\n";
    }
}
?>`,
      pseint: `Algoritmo ArenaRPG
    Definir nombre Como Cadena
    Definir vida, fuerza, nivel, exp, opcion, i Como Entero
    
    Escribir "=== ARENA RPG: TORNEO DE ETHERION ==="
    Escribir "Ingresa el nombre de tu heroe:"
    Leer nombre
    
    vida <- 100
    fuerza <- 10
    nivel <- 1
    exp <- 0
    opcion <- 0
    
    Mientras opcion <> 4 Y vida > 0 Hacer
        Escribir ""
        Escribir "1. Pelear en la Arena"
        Escribir "2. Entrenar en el Cuartel"
        Escribir "3. Ver Estadisticas"
        Escribir "4. Salir"
        Escribir "Elige una opcion:"
        Leer opcion
        
        Segun opcion Hacer
            1:
                Para i <- 1 Hasta 3 Con Paso 1 Hacer
                    Escribir "Turno ", i, ": Atacas con ", fuerza, " dmg. Enemigo inflige 8 dmg."
                    vida <- vida - 8
                FinPara
                Si vida > 0 Entonces
                    exp <- exp + 40
                    Escribir "Victoria! +40 XP."
                    Si exp >= 100 Entonces
                        nivel <- nivel + 1
                        fuerza <- fuerza + 5
                        exp <- exp - 100
                        vida <- 100
                        Escribir "Subiste al Nivel ", nivel, "!"
                    FinSi
                SiNo
                    Escribir "GAME OVER. Has caido en combate."
                FinSi
            2:
                Si vida > 10 Entonces
                    fuerza <- fuerza + 5
                    vida <- vida - 10
                    Escribir "Fuerza: ", fuerza, " | Vida: ", vida
                SiNo
                    Escribir "Demasiado agotado para entrenar."
                FinSi
            3:
                Escribir "Heroe: ", nombre, " | Nivel: ", nivel, " | HP: ", vida, " | Fuerza: ", fuerza, " | XP: ", exp
            4:
                Escribir "Fin de la aventura."
        FinSegun
    FinMientras
FinAlgoritmo`
    }
  },
  {
    id: 2,
    slug: 'supervivencia-zombie',
    number: '02',
    title: 'Supervivencia Zombie: Ciudad Infestada',
    subtitle: 'Simulador de gestión de recursos, exploración y hambre',
    icon: '🧟',
    accentColor: '#10b981',
    badge: 'PROYECTO 2 · SUPERVIVENCIA',
    difficulty: 'Intermedio',
    story: 'La metrópoli colapsó tras una epidemia biológica. Eres uno de los últimos sobrevivientes en un refugio subterráneo. Deberás racionar comida, explorar edificios peligrosos y descansar sin dejar que el hambre devore tu salud.',
    objective: 'Programar un sistema de supervivencia en consola controlando las variables de Vida, Hambre, Energía y Raciones de comida mediante menús interactivos y bucles de búsqueda.',
    initialInputs: [
      'Nombre del sobreviviente (texto)',
      'Cantidad inicial de comida (entero, ej: 5)'
    ],
    variables: [
      { name: 'vida', type: 'int', initialValue: '100', description: 'Salud física del sobreviviente' },
      { name: 'hambre', type: 'int', initialValue: '0', description: 'Nivel de inanición (0 = satisfecho, 100 = desnutrición crítica)' },
      { name: 'energia', type: 'int', initialValue: '100', description: 'Energía disponible para realizar actividades' },
      { name: 'comida', type: 'int', initialValue: '5', description: 'Latas de provisiones acumuladas' },
      { name: 'diasSobrevividos', type: 'int', initialValue: '1', description: 'Contador de días con vida' }
    ],
    menuOptions: [
      {
        option: '1',
        title: 'Buscar Comida en Edificios',
        description: 'Usa un bucle for para revisar 3 lugares distintos (Supermercado, Farmacia, Casa abandonada).',
        logic: 'for (int i = 1; i <= 3; i++). Cada lugar puede dar +1 comida, o emboscada zombie (-15 HP), o nada. Consume 20 de energía y suma 15 de hambre.'
      },
      {
        option: '2',
        title: 'Descansar en el Refugio',
        description: 'Recupera energía durmiendo, pero el tiempo transcurrido aumenta el hambre y avanza el día.',
        logic: 'energia = Math.Min(100, energia + 40); hambre += 20; diasSobrevividos++; Si comida > 0: consume 1 comida y reduce hambre en 30.'
      },
      {
        option: '3',
        title: 'Explorar la Ciudad',
        description: 'Expedición más arriesgada donde se pueden hallar suministros valiosos o hordas.',
        logic: 'Consume 30 de energía. Probabilidad de hallar botiquín (+25 HP) o ataque zombie (-20 HP).'
      },
      {
        option: '4',
        title: 'Ver Estado del Sobreviviente',
        description: 'Consulta los indicadores vitales y el inventario de raciones.',
        logic: 'Muestra: Nombre, Día, Vida, Hambre, Energía y Comida.'
      },
      {
        option: '5',
        title: 'Rendirse / Salir',
        description: 'Termina la partida.',
        logic: 'opcion = 5; Termina el bucle while.'
      }
    ],
    rules: [
      'Si hambre >= 100: el jugador pierde 20 puntos de vida por inanición.',
      'Si energía <= 0: el jugador se desmaya, pierde 1 día y queda expuesto a ataques.',
      'Si vida <= 0: el sobreviviente muere y finaliza la partida mostrando los días sobrevividos.'
    ],
    extraChallenges: [
      'Sistema de Clima: Días lluviosos aumentan el gasto de energía.',
      'Armas defensivas: Encontrar bates o pistolas para anular el daño de los zombies.'
    ],
    steps: [
      { id: 'p2_s1', title: 'Inicializar Variables de Supervivencia', desc: 'Crear vida=100, hambre=0, energia=100, comida y dias=1.' },
      { id: 'p2_s2', title: 'Bucle for en Búsqueda de Comida', desc: 'Implementar el recorrido por 3 lugares con eventos aleatorios.' },
      { id: 'p2_s3', title: 'Mecánica de Descanso y Consumo de Raciones', desc: 'Recuperar energía, avanzar día y comer para mitigar el hambre.' },
      { id: 'p2_s4', title: 'Control de Condiciones Críticas con if', desc: 'Validar si hambre >= 100 para restar vida y verificar si vida <= 0 para Game Over.' }
    ],
    consolePreview: `================================================
       SUPERVIVENCIA ZOMBIE: APOCALIPSIS        
================================================
Nombre del sobreviviente: Alex
Raciones de comida iniciales: 4

Día 1 en el refugio. Salud: 100 HP | Hambre: 0% | Energía: 100%

------------- MENÚ DE SUPERVIVENCIA ------------
1. Buscar comida (Explorar 3 lugares)
2. Descansar en el refugio (+Energía / +Hambre)
3. Explorar ciudad a fondo
4. Ver estado
5. Rendirse / Salir
Elige una opción: 1

--- Registrando 3 ubicaciones ---
Lugar 1 [Almacén]: ¡Encontraste 2 latas de comida! (+2 Comida)
Lugar 2 [Farmacia]: Zombie al acecho. Recibes 15 de daño.
Lugar 3 [Casa vacía]: Nada útil por aquí.
Gasto: -20 Energía | +15 Hambre`,
    solutions: {
      csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("       SUPERVIVENCIA ZOMBIE: APOCALIPSIS        ");
        Console.WriteLine("================================================");

        Console.Write("Nombre del sobreviviente: ");
        string nombre = Console.ReadLine();

        Console.Write("Cantidad inicial de comida (ej. 3 a 5): ");
        int comida = 4;
        int.TryParse(Console.ReadLine(), out comida);

        int vida = 100;
        int hambre = 0;
        int energia = 100;
        int dias = 1;
        int opcion = 0;

        Random random = new Random();

        while (opcion != 5 && vida > 0)
        {
            // Verificación de hambre extrema
            if (hambre >= 100)
            {
                vida -= 20;
                Console.WriteLine("\\n⚠️ ¡ALERTA! El hambre está en nivel crítico (100%). Pierdes 20 HP por inanición.");
                if (vida <= 0) break;
            }

            Console.WriteLine("\\n===== DÍA " + dias + " | Sobreviviente: " + nombre + " =====");
            Console.WriteLine("1. Buscar comida (Revisar 3 lugares)");
            Console.WriteLine("2. Descansar en el refugio");
            Console.WriteLine("3. Explorar la ciudad");
            Console.WriteLine("4. Ver estado");
            Console.WriteLine("5. Rendirse / Salir");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    if (energia < 20)
                    {
                        Console.WriteLine("\\n[!] No tienes suficiente energía (mínimo 20%). Descansa primero.");
                        break;
                    }

                    energia -= 20;
                    hambre += 15;
                    Console.WriteLine("\\n--- Explorando 3 ubicaciones de la zona ---");

                    for (int lugar = 1; lugar <= 3; lugar++)
                    {
                        int evento = random.Next(1, 4); // 1 = comida, 2 = zombie, 3 = vacio
                        if (evento == 1)
                        {
                            comida++;
                            Console.WriteLine("Lugar " + lugar + ": ¡Encontraste 1 lata de comida! (Total: " + comida + ")");
                        }
                        else if (evento == 2)
                        {
                            vida -= 15;
                            Console.WriteLine("Lugar " + lugar + ": ¡Un zombie te atacó! Pierdes 15 HP.");
                        }
                        else
                        {
                            Console.WriteLine("Lugar " + lugar + ": Lugar saqueado, no hay nada.");
                        }
                    }
                    break;

                case 2:
                    dias++;
                    energia = Math.Min(100, energia + 40);
                    hambre += 20;
                    Console.WriteLine("\\nHas descansado. Amanece el Día " + dias + ". Energía recuperada a " + energia + "%.");

                    if (comida > 0)
                    {
                        comida--;
                        hambre = Math.Max(0, hambre - 30);
                        Console.WriteLine("Consumiste 1 lata de comida. Hambre reducida a " + hambre + "%. (Quedan " + comida + " latas).");
                    }
                    else
                    {
                        Console.WriteLine("¡No tienes comida! El hambre aumenta sin control.");
                    }
                    break;

                case 3:
                    if (energia < 30)
                    {
                        Console.WriteLine("\\n[!] Necesitas al menos 30% de energía para una expedición larga.");
                        break;
                    }

                    energia -= 30;
                    hambre += 20;
                    int hallazgo = random.Next(1, 3);
                    if (hallazgo == 1)
                    {
                        comida += 2;
                        vida = Math.Min(100, vida + 15);
                        Console.WriteLine("\\n¡Gran botín! Encontraste un botiquín (+15 HP) y 2 latas de comida.");
                    }
                    else
                    {
                        vida -= 25;
                        Console.WriteLine("\\n¡Emboscada de una horda! Escapaste con dificultad recibiendo 25 de daño.");
                    }
                    break;

                case 4:
                    Console.WriteLine("\\n------------- ESTADO DEL SOBREVIVIENTE -------------");
                    Console.WriteLine("Nombre:    " + nombre);
                    Console.WriteLine("Día:       " + dias);
                    Console.WriteLine("Salud:     " + vida + " / 100 HP");
                    Console.WriteLine("Hambre:    " + hambre + "%");
                    Console.WriteLine("Energía:   " + energia + "%");
                    Console.WriteLine("Comida:    " + comida + " raciones");
                    Console.WriteLine("---------------------------------------------------");
                    break;

                case 5:
                    Console.WriteLine("\\nTe has retirado de la ciudad. Sobreviviste un total de " + dias + " días.");
                    break;

                default:
                    Console.WriteLine("\\n>> Opción no válida.");
                    break;
            }
        }

        if (vida <= 0)
        {
            Console.WriteLine("\\n☠️ " + nombre + " no logró sobrevivir a la infección. Días resistidos: " + dias + ". GAME OVER.");
        }
    }
}`,
      python: `import random

def main():
    print("================================================")
    print("       SUPERVIVENCIA ZOMBIE: APOCALIPSIS        ")
    print("================================================")
    
    nombre = input("Nombre del sobreviviente: ")
    comida = 4
    vida = 100
    hambre = 0
    energia = 100
    dias = 1
    opcion = 0

    while opcion != 5 and vida > 0:
        if hambre >= 100:
            vida -= 20
            print("\\n⚠️ ¡Hambre crítica! Pierdes 20 HP.")
            if vida <= 0:
                break

        print("\\n--- DÍA " + str(dias) + " | " + nombre + " | HP: " + str(vida) + " | Hambre: " + str(hambre) + "% | Energía: " + str(energia) + "% | Comida: " + str(comida) + " ---")
        print("1. Buscar comida (3 lugares)\\n2. Descansar\\n3. Explorar ciudad\\n4. Ver estado\\n5. Salir")
        
        try:
            opcion = int(input("Opción: "))
        except ValueError:
            continue

        if opcion == 1:
            if energia >= 20:
                energia -= 20
                hambre += 15
                for lugar in range(1, 4):
                    ev = random.randint(1, 3)
                    if ev == 1:
                        comida += 1
                        print("Lugar " + str(lugar) + ": ¡+1 Comida! (Total: " + str(comida) + ")")
                    elif ev == 2:
                        vida -= 15
                        print("Lugar " + str(lugar) + ": Ataque zombie (-15 HP)")
                    else:
                        print("Lugar " + str(lugar) + ": Vacío.")
            else:
                print("[!] Falta energía.")

        elif opcion == 2:
            dias += 1
            energia = min(100, energia + 40)
            hambre += 20
            if comida > 0:
                comida -= 1
                hambre = max(0, hambre - 30)
                print("Comiste 1 ración. Hambre bajó a " + str(hambre) + "%.")
            print("Día " + str(dias) + ". Energía: " + str(energia) + "%")

        elif opcion == 3:
            if energia >= 30:
                energia -= 30
                hambre += 20
                if random.choice([True, False]):
                    comida += 2
                    print("¡Encontraste 2 raciones!")
                else:
                    vida -= 25
                    print("¡Ataque sorpresa! -25 HP")

        elif opcion == 4:
            print("\\nEstado: " + nombre + " | Días: " + str(dias) + " | Vida: " + str(vida) + " | Hambre: " + str(hambre) + "% | Energía: " + str(energia) + "% | Comida: " + str(comida))

    if vida <= 0:
        print("☠️ Has muerto en el Día " + str(dias) + ".")

if __name__ == '__main__':
    main()`,
      java: `import java.util.Scanner;
import java.util.Random;

public class ZombieSurvival {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rng = new Random();
        System.out.println("=== SUPERVIVENCIA ZOMBIE ===");
        System.out.print("Nombre: ");
        String nombre = sc.nextLine();

        int vida = 100, hambre = 0, energia = 100, comida = 4, dias = 1, op = 0;

        while (op != 5 && vida > 0) {
            if (hambre >= 100) { vida -= 20; System.out.println("¡Hambre crítica! -20 HP"); if (vida <= 0) break; }
            System.out.println("\\n1. Buscar comida | 2. Descansar | 3. Explorar | 4. Estado | 5. Salir");
            if (!sc.hasNextInt()) { sc.next(); continue; }
            op = sc.nextInt();

            if (op == 1 && energia >= 20) {
                energia -= 20; hambre += 15;
                for (int i = 1; i <= 3; i++) {
                    int ev = rng.nextInt(3);
                    if (ev == 0) { comida++; System.out.println("Lugar " + i + ": +1 comida"); }
                    else if (ev == 1) { vida -= 15; System.out.println("Lugar " + i + ": zombie -15 HP"); }
                    else { System.out.println("Lugar " + i + ": vacio"); }
                }
            } else if (op == 2) {
                dias++; energia = Math.Min(100, energia + 40); hambre += 20;
                if (comida > 0) { comida--; hambre = Math.max(0, hambre - 30); }
                System.out.println("Amanece día " + dias);
            } else if (op == 4) {
                System.out.println("HP: " + vida + " | Hambre: " + hambre + "% | Energía: " + energia + "% | Comida: " + comida);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <cstdlib>
using namespace std;

int main() {
    cout << "=== SUPERVIVENCIA ZOMBIE ===" << endl;
    string nombre;
    cout << "Nombre: ";
    cin >> nombre;

    int vida = 100, hambre = 0, energia = 100, comida = 4, dias = 1, op = 0;

    while (op != 5 && vida > 0) {
        if (hambre >= 100) { vida -= 20; cout << "Hambre extrema! -20 HP" << endl; if (vida <= 0) break; }
        cout << "\\n1. Buscar comida\\n2. Descansar\\n3. Explorar\\n4. Estado\\n5. Salir\\nOpcion: ";
        cin >> op;

        if (op == 1 && energia >= 20) {
            energia -= 20; hambre += 15;
            for (int i = 1; i <= 3; i++) {
                int r = rand() % 3;
                if (r == 0) { comida++; cout << "Lugar " << i << ": +1 Comida" << endl; }
                else if (r == 1) { vida -= 15; cout << "Lugar " << i << ": Ataque Zombie -15 HP" << endl; }
                else { cout << "Lugar " << i << ": Vacio" << endl; }
            }
        } else if (op == 2) {
            dias++; energia = (energia + 40 > 100) ? 100 : energia + 40; hambre += 20;
            if (comida > 0) { comida--; hambre = (hambre - 30 < 0) ? 0 : hambre - 30; }
            cout << "Dia " << dias << " amanecio." << endl;
        } else if (op == 4) {
            cout << "HP: " << vida << " | Hambre: " << hambre << "% | Energia: " << energia << "% | Comida: " << comida << endl;
        }
    }
    return 0;
}`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("=== SUPERVIVENCIA ZOMBIE ===");
    const nombre = await ask("Nombre sobreviviente: ");
    let vida = 100, hambre = 0, energia = 100, comida = 4, dias = 1, op = 0;

    while (op !== 5 && vida > 0) {
        if (hambre >= 100) { vida -= 20; console.log("¡Hambre crítica! -20 HP"); if (vida <= 0) break; }
        console.log("\\n1. Buscar comida | 2. Descansar | 3. Explorar | 4. Estado | 5. Salir");
        op = parseInt(await ask("Opción: "), 10);

        if (op === 1 && energia >= 20) {
            energia -= 20; hambre += 15;
            for (let i = 1; i <= 3; i++) {
                const r = Math.floor(Math.random() * 3);
                if (r === 0) { comida++; console.log("Lugar " + i + ": +1 comida (Total: " + comida + ")"); }
                else if (r === 1) { vida -= 15; console.log("Lugar " + i + ": ¡Zombie! -15 HP"); }
                else console.log("Lugar " + i + ": Vacío");
            }
        } else if (op === 2) {
            dias++; energia = Math.min(100, energia + 40); hambre += 20;
            if (comida > 0) { comida--; hambre = Math.max(0, hambre - 30); }
            console.log("Amanece día " + dias + ". Energía: " + energia + "%");
        } else if (op === 4) {
            console.log(nombre + " -> HP: " + vida + " | Hambre: " + hambre + "% | Energía: " + energia + "% | Comida: " + comida);
        }
    }
    rl.close();
}
main();`,
      php: `<?php
echo "=== SUPERVIVENCIA ZOMBIE ===\\n";
echo "Nombre: ";
$nombre = trim(fgets(STDIN));
$vida = 100; $hambre = 0; $energia = 100; $comida = 4; $dias = 1; $op = 0;

while ($op != 5 && $vida > 0) {
    if ($hambre >= 100) { $vida -= 20; echo "Hambre critica! -20 HP\\n"; if ($vida <= 0) break; }
    echo "\\n1. Buscar comida\\n2. Descansar\\n3. Explorar\\n4. Estado\\n5. Salir\\nOpcion: ";
    $op = intval(trim(fgets(STDIN)));

    if ($op == 1 && $energia >= 20) {
        $energia -= 20; $hambre += 15;
        for ($i = 1; $i <= 3; $i++) {
            $ev = rand(1, 3);
            if ($ev == 1) { $comida++; echo "Lugar $i: +1 comida\\n"; }
            else if ($ev == 2) { $vida -= 15; echo "Lugar $i: zombie -15 HP\\n"; }
            else echo "Lugar $i: vacio\\n";
        }
    } else if ($op == 2) {
        $dias++; $energia = min(100, $energia + 40); $hambre += 20;
        if ($comida > 0) { $comida--; $hambre = max(0, $hambre - 30); }
        echo "Dia $dias.\\n";
    } else if ($op == 4) {
        echo "HP: $vida | Hambre: $hambre% | Energia: $energia% | Comida: $comida\\n";
    }
}
?>`,
      pseint: `Algoritmo SupervivenciaZombie
    Definir nombre Como Cadena
    Definir vida, hambre, energia, comida, dias, op, i, ev Como Entero
    
    Escribir "=== SUPERVIVENCIA ZOMBIE ==="
    Escribir "Nombre:"
    Leer nombre
    
    vida <- 100
    hambre <- 0
    energia <- 100
    comida <- 4
    dias <- 1
    op <- 0
    
    Mientras op <> 5 Y vida > 0 Hacer
        Si hambre >= 100 Entonces
            vida <- vida - 20
            Escribir "¡Hambre critica! Pierdes 20 HP"
        FinSi
        
        Si vida > 0 Entonces
            Escribir "1. Buscar comida | 2. Descansar | 3. Explorar | 4. Estado | 5. Salir"
            Leer op
            
            Segun op Hacer
                1:
                    Si energia >= 20 Entonces
                        energia <- energia - 20
                        hambre <- hambre + 15
                        Para i <- 1 Hasta 3 Con Paso 1 Hacer
                            ev <- Azar(3) + 1
                            Si ev = 1 Entonces
                                comida <- comida + 1
                                Escribir "Lugar ", i, ": +1 Comida"
                            SiNo
                                Si ev = 2 Entonces
                                    vida <- vida - 15
                                    Escribir "Lugar ", i, ": Zombie! -15 HP"
                                SiNo
                                    Escribir "Lugar ", i, ": Vacio"
                                FinSi
                            FinSi
                        FinPara
                    SiNo
                        Escribir "Falta energia."
                    FinSi
                2:
                    dias <- dias + 1
                    energia <- energia + 40
                    Si energia > 100 Entonces energia <- 100; FinSi
                    hambre <- hambre + 20
                    Si comida > 0 Entonces
                        comida <- comida - 1
                        hambre <- hambre - 30
                        Si hambre < 0 Entonces hambre <- 0; FinSi
                    FinSi
                    Escribir "Amanece Dia ", dias
                4:
                    Escribir "HP: ", vida, " | Hambre: ", hambre, "% | Energia: ", energia, "% | Comida: ", comida
            FinSegun
        FinSi
    FinMientras
FinAlgoritmo`
    }
  },
  {
    id: 3,
    slug: 'valorant-console',
    number: '03',
    title: 'Valorant Console Edition',
    subtitle: 'Simulador competitivo de rondas, economía de créditos y rangos',
    icon: '🎯',
    accentColor: '#06b6d4',
    badge: 'PROYECTO 3 · SHOOTER',
    difficulty: 'Intermedio',
    story: 'El protocolo Radiant te ha reclutado para ascender en la cola competitiva. Comienza con una pistola básica y 800 créditos. Gana rondas, compra armas de alto calibre y alcanza el rango Oro con tu puntería.',
    objective: 'Simular partidas de 5 rondas con bucles for, administración de economía de créditos con validaciones if/else, precisión y ascensos de rango basados en kills acumulados.',
    initialInputs: [
      'Nombre del jugador (texto)',
      'Nombre del agente (Jett, Reyna, Sova, etc.)'
    ],
    variables: [
      { name: 'creditos', type: 'int', initialValue: '800', description: 'Moneda para comprar armamento' },
      { name: 'kills', type: 'int', initialValue: '0', description: 'Bajas acumuladas en la carrera' },
      { name: 'precision', type: 'int', initialValue: '50', description: 'Porcentaje de acierto de tiro (50% a 95%)' },
      { name: 'rango', type: 'string', initialValue: '"Hierro"', description: 'Rango competitivo actual' },
      { name: 'armaActual', type: 'string', initialValue: '"Classic"', description: 'Arma equipada actualmente' }
    ],
    menuOptions: [
      {
        option: '1',
        title: 'Entrar a Partida Competitiva',
        description: 'Juega 5 rondas usando un bucle for. Cada ronda simula duelo, bajas y recompensa económica.',
        logic: 'for (int r = 1; r <= 5; r++). Probabilidad de ganar ronda basada en precisión y arma. Victoria: +3000 créditos, +2 kills. Derrota: +1900 créditos, +1 kill.'
      },
      {
        option: '2',
        title: 'Comprar Arma en la Tienda',
        description: 'Permite comprar armas con validación de fondos: Ghost ($500), Vandal ($2900), Operator ($4700).',
        logic: 'Valida con if si creditos >= precio. Descuenta créditos y mejora bonificador de daño.'
      },
      {
        option: '3',
        title: 'Entrenar Puntería en The Range',
        description: 'Aumenta la precisión de tiro (+5%) a cambio de 100 créditos de munición.',
        logic: 'precision = Math.Min(95, precision + 5); creditos -= 100;'
      },
      {
        option: '4',
        title: 'Ver Perfil Competitivo',
        description: 'Muestra estadísticas completas del agente.',
        logic: 'Imprime: Jugador, Agente, Kills, Créditos, Precisión, Arma y Rango.'
      },
      {
        option: '5',
        title: 'Salir del Juego',
        description: 'Cierra sesión de Valorant.',
        logic: 'opcion = 5; Termina el bucle while.'
      }
    ],
    rules: [
      'Si kills >= 10: Ascender a Bronce.',
      'Si kills >= 20: Ascender a Plata.',
      'Si kills >= 35: Ascender a Oro (¡Objetivo Cumplido!).',
      'Si los créditos son insuficientes para comprar un arma, mostrar mensaje de fondos insuficientes.'
    ],
    extraChallenges: [
      'Habilidades de Agente: Usar habilidad definitiva cada 4 rondas para asegurar una ronda gratis.',
      'Partida en Prórroga (Overtime): Desempate a muerte súbita si la partida termina 2-2.'
    ],
    steps: [
      { id: 'p3_s1', title: 'Definir Variables de Partida', desc: 'Inicializar créditos=800, kills=0, precisión=50 y rango="Hierro".' },
      { id: 'p3_s2', title: 'Simulación de 5 Rondas con for', desc: 'Recorrer 5 rondas calculando duelos individuales y sumando créditos.' },
      { id: 'p3_s3', title: 'Sistema de Compras con if/else', desc: 'Validar precios de armas y actualizar armaActual si alcanza el dinero.' },
      { id: 'p3_s4', title: 'Sistema de Rangos Progresivos', desc: 'Evaluar número de kills para cambiar rango de Hierro a Bronce, Plata y Oro.' }
    ],
    consolePreview: `================================================
           VALORANT CONSOLE EDITION             
================================================
Jugador: TenZ
Agente seleccionado: Jett

Rango: Hierro | Arma: Classic | Créditos: 800 | Precisión: 50%

------------- LOBBY PRINCIPAL -------------
1. Entrar a partida competitiva (5 rondas)
2. Comprar arma en la tienda
3. Entrenar puntería (+Precisión)
4. Ver perfil competitivo
5. Salir
Elige una opción: 1

--- INICIANDO MATCH COMPETITIVO ---
Ronda 1: ¡Duelo ganado con Classic! +1 Kill (+3000 creds)
Ronda 2: Ronda perdida. +1 Kill (+1900 creds)
Ronda 3: ¡Headshot limpio! +2 Kills (+3000 creds)
Ronda 4: ¡Ronda ganada! +1 Kill (+3000 creds)
Ronda 5: ¡Victoria de la partida! +2 Kills (+3000 creds)
Resultado: 4 - 1 | Kills acumulados: 7 | Créditos: 4800`,
    solutions: {
      csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("           VALORANT CONSOLE EDITION             ");
        Console.WriteLine("================================================");

        Console.Write("Ingresa tu Riot ID / Nombre: ");
        string jugador = Console.ReadLine();

        Console.Write("Elige tu Agente (Jett, Reyna, Sova, Omen): ");
        string agente = Console.ReadLine();

        int creditos = 800;
        int kills = 0;
        int precision = 50;
        string rango = "Hierro";
        string arma = "Classic";
        int poderArma = 1;

        int opcion = 0;
        Random random = new Random();

        while (opcion != 5)
        {
            // Actualización de rangos por kills
            if (kills >= 35) rango = "ORO (Objetivo alcanzado)";
            else if (kills >= 20) rango = "PLATA";
            else if (kills >= 10) rango = "BRONCE";
            else rango = "HIERRO";

            Console.WriteLine("\\n===== LOBBY | " + jugador + " (" + agente + ") | Rango: " + rango + " =====");
            Console.WriteLine("1. Entrar a partida competitiva (5 rondas)");
            Console.WriteLine("2. Comprar armamento");
            Console.WriteLine("3. Entrenar puntería (+5% Precisión, -100 Créditos)");
            Console.WriteLine("4. Ver perfil del agente");
            Console.WriteLine("5. Salir");
            Console.Write("Opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion)) continue;

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("\\n--- JUGANDO PARTIDA (MEJOR DE 5 RONDAS) ---");
                    int rondasGanadas = 0;

                    for (int r = 1; r <= 5; r++)
                    {
                        int probabilidad = precision + (poderArma * 10);
                        int tiro = random.Next(1, 101);

                        if (tiro <= probabilidad)
                        {
                            rondasGanadas++;
                            int k = random.Next(1, 3);
                            kills += k;
                            creditos += 3000;
                            Console.WriteLine("Ronda " + r + ": ¡VICTORIA! Eliminaste a " + k + " enemigos con " + arma + ". (+3000 Créditos)");
                        }
                        else
                        {
                            kills += 1;
                            creditos += 1900;
                            Console.WriteLine("Ronda " + r + ": Ronda perdida. Lograste 1 baja de consuelo. (+1900 Créditos)");
                        }
                    }

                    Console.WriteLine("\\nResultado Final: " + rondasGanadas + " Victorias - " + (5 - rondasGanadas) + " Derrotas.");
                    Console.WriteLine("Kills totales: " + kills + " | Créditos actuales: " + creditos);
                    break;

                case 2:
                    Console.WriteLine("\\n--- TIENDA DE ARMAS ---");
                    Console.WriteLine("1. Ghost      - 500 Creds (+10% ventaja)");
                    Console.WriteLine("2. Spectre    - 1600 Creds (+20% ventaja)");
                    Console.WriteLine("3. Vandal     - 2900 Creds (+35% ventaja)");
                    Console.WriteLine("4. Operator   - 4700 Creds (+50% ventaja)");
                    Console.Write("¿Qué arma deseas comprar?: ");
                    int buyOp;
                    int.TryParse(Console.ReadLine(), out buyOp);

                    if (buyOp == 1 && creditos >= 500) { creditos -= 500; arma = "Ghost"; poderArma = 2; Console.WriteLine("¡Ghost equipada!"); }
                    else if (buyOp == 2 && creditos >= 1600) { creditos -= 1600; arma = "Spectre"; poderArma = 3; Console.WriteLine("¡Spectre equipada!"); }
                    else if (buyOp == 3 && creditos >= 2900) { creditos -= 2900; arma = "Vandal"; poderArma = 4; Console.WriteLine("¡Vandal equipada!"); }
                    else if (buyOp == 4 && creditos >= 4700) { creditos -= 4700; arma = "Operator"; poderArma = 5; Console.WriteLine("¡Operator equipado!"); }
                    else Console.WriteLine("Créditos insuficientes o arma no disponible.");
                    break;

                case 3:
                    if (creditos >= 100)
                    {
                        creditos -= 100;
                        precision = Math.Min(95, precision + 5);
                        Console.WriteLine("\\n[🎯] Entrenamiento completado. Precisión subió a " + precision + "%.");
                    }
                    else Console.WriteLine("\\nNo tienes 100 créditos para munición de práctica.");
                    break;

                case 4:
                    Console.WriteLine("\\n================ PERFIL COMPETITIVO ================");
                    Console.WriteLine("Jugador:     " + jugador);
                    Console.WriteLine("Agente:      " + agente);
                    Console.WriteLine("Rango:       " + rango);
                    Console.WriteLine("Arma Actual: " + arma);
                    Console.WriteLine("Kills:       " + kills);
                    Console.WriteLine("Precisión:   " + precision + "%");
                    Console.WriteLine("Créditos:    " + creditos);
                    Console.WriteLine("====================================================");
                    break;

                case 5:
                    Console.WriteLine("\\nHasta la próxima partida, " + jugador + ".");
                    break;
            }
        }
    }
}`,
      python: `import random

def main():
    print("=== VALORANT CONSOLE EDITION ===")
    jugador = input("Riot ID: ")
    agente = input("Agente: ")

    creditos = 800
    kills = 0
    precision = 50
    arma = "Classic"
    poder = 1
    opcion = 0

    while opcion != 5:
        rango = "Oro" if kills >= 35 else ("Plata" if kills >= 20 else ("Bronce" if kills >= 10 else "Hierro"))
        print("\\n[LOBBY] " + jugador + " (" + agente + ") | Rango: " + rango + " | Arma: " + arma + " | Créditos: " + str(creditos))
        print("1. Jugar partida (5 rondas)\\n2. Comprar arma\\n3. Entrenar puntería\\n4. Perfil\\n5. Salir")
        
        try:
            opcion = int(input("Opción: "))
        except ValueError:
            continue

        if opcion == 1:
            for r in range(1, 6):
                if random.randint(1, 100) <= precision + (poder * 8):
                    kills += 2
                    creditos += 3000
                    print("Ronda " + str(r) + ": ¡Victoria! +2 Kills (+3000 Creds)")
                else:
                    kills += 1
                    creditos += 1900
                    print("Ronda " + str(r) + ": Derrota. +1 Kill (+1900 Creds)")

        elif opcion == 2:
            print("1. Ghost (500) | 2. Vandal (2900) | 3. Operator (4700)")
            c = int(input("Comprar: "))
            if c == 1 and creditos >= 500: creditos -= 500; arma = "Ghost"; poder = 2
            elif c == 2 and creditos >= 2900: creditos -= 2900; arma = "Vandal"; poder = 4
            elif c == 3 and creditos >= 4700: creditos -= 4700; arma = "Operator"; poder = 5
            else: print("Créditos insuficientes.")

        elif opcion == 3:
            if creditos >= 100: creditos -= 100; precision = min(95, precision + 5); print("Precisión: " + str(precision) + "%")

        elif opcion == 4:
            print("Perfil -> " + jugador + " | " + agente + " | Rango: " + rango + " | Kills: " + str(kills) + " | Créditos: " + str(creditos))

if __name__ == '__main__':
    main()`,
      java: `import java.util.Scanner;
import java.util.Random;

public class ValorantConsole {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rng = new Random();
        System.out.println("=== VALORANT CONSOLE ===");
        System.out.print("Jugador: ");
        String jugador = sc.nextLine();
        
        int creditos = 800, kills = 0, precision = 50, op = 0;
        String arma = "Classic";

        while (op != 5) {
            String rango = kills >= 20 ? "Oro" : (kills >= 10 ? "Plata" : "Hierro");
            System.out.println("\\n1. Jugar (5 rondas) | 2. Comprar | 3. Entrenar | 4. Perfil | 5. Salir");
            if (!sc.hasNextInt()) { sc.next(); continue; }
            op = sc.nextInt();

            if (op == 1) {
                for (int r = 1; r <= 5; r++) {
                    if (rng.nextInt(100) < precision) { kills += 2; creditos += 3000; System.out.println("Ronda " + r + ": Victoria (+2 Kills)"); }
                    else { kills += 1; creditos += 1900; System.out.println("Ronda " + r + ": Derrota (+1 Kill)"); }
                }
            } else if (op == 2) {
                if (creditos >= 2900) { creditos -= 2900; arma = "Vandal"; precision += 15; System.out.println("Vandal comprada!"); }
                else System.out.println("No alcanza para Vandal (2900).");
            } else if (op == 4) {
                System.out.println("Perfil: " + jugador + " | Rango: " + rango + " | Kills: " + kills + " | Creds: " + creditos);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
#include <cstdlib>
using namespace std;

int main() {
    cout << "=== VALORANT CONSOLE ===" << endl;
    string jugador; cout << "Nombre: "; cin >> jugador;
    int creditos = 800, kills = 0, precision = 50, op = 0;

    while (op != 5) {
        cout << "\\n1. Jugar 5 rondas\\n2. Comprar Vandal (2900)\\n3. Entrenar\\n4. Perfil\\n5. Salir\\nOpcion: ";
        cin >> op;
        if (op == 1) {
            for (int i = 1; i <= 5; i++) {
                if (rand() % 100 < precision) { kills += 2; creditos += 3000; cout << "Ronda " << i << ": Victoria!" << endl; }
                else { kills++; creditos += 1900; cout << "Ronda " << i << ": Derrota." << endl; }
            }
        } else if (op == 2) {
            if (creditos >= 2900) { creditos -= 2900; precision += 15; cout << "Vandal comprada!" << endl; }
        } else if (op == 4) {
            cout << "Jugador: " << jugador << " | Kills: " << kills << " | Creds: " << creditos << endl;
        }
    }
    return 0;
}`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("=== VALORANT CONSOLE ===");
    const jugador = await ask("Jugador: ");
    let creditos = 800, kills = 0, precision = 50, op = 0;

    while (op !== 5) {
        console.log("\\n1. Jugar (5 rondas) | 2. Comprar Vandal | 3. Entrenar | 4. Perfil | 5. Salir");
        op = parseInt(await ask("Opción: "), 10);
        if (op === 1) {
            for (let r = 1; r <= 5; r++) {
                if (Math.random() * 100 < precision) { kills += 2; creditos += 3000; console.log("Ronda " + r + ": Victoria"); }
                else { kills += 1; creditos += 1900; console.log("Ronda " + r + ": Derrota"); }
            }
        } else if (op === 4) {
            console.log(jugador + " | Kills: " + kills + " | Creds: " + creditos);
        }
    }
    rl.close();
}
main();`,
      php: `<?php
echo "=== VALORANT CONSOLE ===\\nJugador: ";
$jugador = trim(fgets(STDIN));
$creditos = 800; $kills = 0; $precision = 50; $op = 0;

while ($op != 5) {
    echo "\\n1. Jugar\\n2. Comprar Vandal\\n3. Perfil\\n5. Salir\\nOpcion: ";
    $op = intval(trim(fgets(STDIN)));
    if ($op == 1) {
        for ($r = 1; $r <= 5; $r++) {
            if (rand(1, 100) <= $precision) { $kills += 2; $creditos += 3000; echo "Ronda $r: Victoria\\n"; }
            else { $kills += 1; $creditos += 1900; echo "Ronda $r: Derrota\\n"; }
        }
    } else if ($op == 3) {
        echo "Perfil: $jugador | Kills: $kills | Creds: $creditos\\n";
    }
}
?>`,
      pseint: `Algoritmo ValorantConsole
    Definir jugador Como Cadena
    Definir creditos, kills, precision, op, r Como Entero
    
    Escribir "=== VALORANT CONSOLE ==="
    Escribir "Nombre:"
    Leer jugador
    creditos <- 800
    kills <- 0
    precision <- 50
    op <- 0
    
    Mientras op <> 5 Hacer
        Escribir "1. Jugar 5 rondas | 2. Comprar Vandal (2900) | 3. Perfil | 5. Salir"
        Leer op
        Si op = 1 Entonces
            Para r <- 1 Hasta 5 Con Paso 1 Hacer
                Si Azar(100) < precision Entonces
                    kills <- kills + 2
                    creditos <- creditos + 3000
                    Escribir "Ronda ", r, ": Victoria!"
                SiNo
                    kills <- kills + 1
                    creditos <- creditos + 1900
                    Escribir "Ronda ", r, ": Derrota."
                FinSi
            FinPara
        FinSi
        Si op = 3 Entonces
            Escribir "Jugador: ", jugador, " | Kills: ", kills, " | Creds: ", creditos
        FinSi
    FinMientras
FinAlgoritmo`
    }
  },
  {
    id: 4,
    slug: 'minecraft-survival',
    number: '04',
    title: 'Minecraft Survival CLI',
    subtitle: 'Simulador de recolección de recursos, minería y crafteo de herramientas',
    icon: '⛏️',
    accentColor: '#a855f7',
    badge: 'PROYECTO 4 · CRAFTING',
    difficulty: 'Intermedio',
    story: 'Has aparecido en un bioma virgen. La noche caerá pronto y los monstruos acechan. Debes talar madera, excavar piedra, fabricar una espada y aventurarte en las profundidades para hallar diamantes.',
    objective: 'Implementar un sistema de recolección acumulativa con bucles for, condiciones de recetas de fabricación if/else y restricciones de herramientas.',
    initialInputs: [
      'Nombre del jugador (texto)',
      'Nombre del mundo (ej. "MundoSurvival")'
    ],
    variables: [
      { name: 'madera', type: 'int', initialValue: '0', description: 'Troncos de roble talados' },
      { name: 'piedra', type: 'int', initialValue: '0', description: 'Bloques de piedra picados' },
      { name: 'diamantes', type: 'int', initialValue: '0', description: 'Gemas de diamante descubiertas' },
      { name: 'espada', type: 'int', initialValue: '0', description: 'Cantidad de espadas fabricadas' },
      { name: 'pico', type: 'int', initialValue: '0', description: 'Picos disponibles para minar' }
    ],
    menuOptions: [
      {
        option: '1',
        title: 'Cortar Madera',
        description: 'Usa un bucle for para talar 4 árboles y obtener troncos de madera.',
        logic: 'for (int i = 1; i <= 4; i++) { madera += 2; }. Informa el total recolectado.'
      },
      {
        option: '2',
        title: 'Minar Piedra',
        description: 'Pica bloques de piedra en la cueva.',
        logic: 'piedra += 5; Informa el total de piedra acumulada.'
      },
      {
        option: '3',
        title: 'Buscar Diamantes en la Mina Profunda',
        description: 'Expedición subterránea peligrosa. Solo permitida si se tiene al menos 1 espada.',
        logic: 'if (espada > 0) { diamantes += 2; } else { "Peligro: Necesitas una espada para defenderte en las cuevas." }'
      },
      {
        option: '4',
        title: 'Crear Espada (Crafteo)',
        description: 'Requiere 10 unidades de madera y 5 unidades de piedra.',
        logic: 'if (madera >= 10 && piedra >= 5) { madera -= 10; piedra -= 5; espada += 1; }'
      },
      {
        option: '5',
        title: 'Ver Inventario',
        description: 'Muestra todos los recursos acumulados.',
        logic: 'Imprime: Madera, Piedra, Diamantes y Espadas.'
      },
      {
        option: '6',
        title: 'Guardar y Salir',
        description: 'Cierra el mundo de Minecraft.',
        logic: 'opcion = 6; Termina el bucle while.'
      }
    ],
    rules: [
      'No se pueden buscar diamantes sin haber crafteado al menos una espada.',
      'El crafteo de espada solo es posible si se cuenta con exactamente 10 de madera y 5 de piedra o más.',
      'Los recursos no pueden quedar en valores negativos.'
    ],
    extraChallenges: [
      'Mesa de Crafteo: Requerir crear primero una Mesa de Trabajo (4 maderas).',
      'Pico de Diamante: Receta para armadura o pico de diamante con 3 diamantes y 2 palos.'
    ],
    steps: [
      { id: 'p4_s1', title: 'Crear Variables de Inventario', desc: 'Inicializar madera=0, piedra=0, diamantes=0 y espada=0.' },
      { id: 'p4_s2', title: 'Tala de Árboles con bucle for', desc: 'Simular la tala progresiva sumando madera por cada árbol.' },
      { id: 'p4_s3', title: 'Validación de Crafteo con if', desc: 'Comprobar si madera >= 10 y piedra >= 5 para fabricar la espada.' },
      { id: 'p4_s4', title: 'Desbloqueo de Diamantes Condicional', desc: 'Permitir minar diamantes solo cuando espada >= 1.' }
    ],
    consolePreview: `================================================
            MINECRAFT SURVIVAL CLI              
================================================
Jugador: Steve | Mundo: SurvivalAlpha

-------------- MENÚ DE CRAFTEO --------------
1. Cortar madera (Talar árboles)
2. Minar piedra
3. Buscar diamantes (Requiere espada)
4. Crear espada (Coste: 10 Madera + 5 Piedra)
5. Ver inventario
6. Salir
Elige una opción: 1

--- Talando árboles ---
Árbol 1 talado: +2 Madera
Árbol 2 talado: +2 Madera
Árbol 3 talado: +2 Madera
Árbol 4 talado: +2 Madera
¡Madera total en inventario: 8!`,
    solutions: {
      csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("            MINECRAFT SURVIVAL CLI              ");
        Console.WriteLine("================================================");

        Console.Write("Nombre del jugador: ");
        string jugador = Console.ReadLine();

        Console.Write("Nombre del mundo: ");
        string mundo = Console.ReadLine();

        int madera = 0;
        int piedra = 0;
        int diamantes = 0;
        int espada = 0;

        int opcion = 0;

        while (opcion != 6)
        {
            Console.WriteLine("\\n===== MUNDO: " + mundo + " | Jugador: " + jugador + " =====");
            Console.WriteLine("1. Cortar madera (Talar 4 árboles)");
            Console.WriteLine("2. Minar piedra");
            Console.WriteLine("3. Buscar diamantes (Requiere espada)");
            Console.WriteLine("4. Crear espada (10 Madera + 5 Piedra)");
            Console.WriteLine("5. Ver inventario");
            Console.WriteLine("6. Guardar y Salir");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion)) continue;

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("\\n--- Talando zona boscosa ---");
                    for (int arbol = 1; arbol <= 4; arbol++)
                    {
                        madera += 3;
                        Console.WriteLine("Árbol " + arbol + " talado: +3 de madera (Total: " + madera + ")");
                    }
                    break;

                case 2:
                    piedra += 6;
                    Console.WriteLine("\\n[⛏️] Has picado bloques de roca. +6 de piedra (Total: " + piedra + ").");
                    break;

                case 3:
                    if (espada > 0)
                    {
                        diamantes += 2;
                        Console.WriteLine("\\n💎 ¡Increíble! Exploraste las cavernas oscuras y hallaste 2 diamantes.");
                        Console.WriteLine("Total de diamantes: " + diamantes);
                    }
                    else
                    {
                        Console.WriteLine("\\n⚠️ [PELIGRO] No puedes entrar a la mina profunda sin una espada para defenderte.");
                    }
                    break;

                case 4:
                    if (madera >= 10 && piedra >= 5)
                    {
                        madera -= 10;
                        piedra -= 5;
                        espada++;
                        Console.WriteLine("\\n⚔️ ¡Has fabricado una Espada de Piedra! (Espadas en inventario: " + espada + ")");
                    }
                    else
                    {
                        Console.WriteLine("\\n[!] Materiales insuficientes. Necesitas 10 de madera y 5 de piedra.");
                        Console.WriteLine("Tienes actualmente: " + madera + " Madera | " + piedra + " Piedra");
                    }
                    break;

                case 5:
                    Console.WriteLine("\\n================ INVENTARIO ================");
                    Console.WriteLine("Madera:    " + madera + " bloques");
                    Console.WriteLine("Piedra:    " + piedra + " bloques");
                    Console.WriteLine("Diamantes: " + diamantes + " gemas");
                    Console.WriteLine("Espadas:   " + espada);
                    Console.WriteLine("============================================");
                    break;

                case 6:
                    Console.WriteLine("\\nPartida guardada en '" + mundo + "'. ¡Hasta luego " + jugador + "!");
                    break;
            }
        }
    }
}`,
      python: `def main():
    print("=== MINECRAFT SURVIVAL CLI ===")
    jugador = input("Jugador: ")
    mundo = input("Mundo: ")

    madera = 0
    piedra = 0
    diamantes = 0
    espada = 0
    opcion = 0

    while opcion != 6:
        print("\\n[Mundo: " + mundo + "] 1. Cortar madera | 2. Minar piedra | 3. Diamantes | 4. Craftear espada | 5. Inventario | 6. Salir")
        try:
            opcion = int(input("Opción: "))
        except ValueError:
            continue

        if opcion == 1:
            for a in range(1, 5):
                madera += 3
                print("Árbol " + str(a) + ": +3 madera")
        elif opcion == 2:
            piedra += 6
            print("+6 piedra (Total: " + str(piedra) + ")")
        elif opcion == 3:
            if espada > 0:
                diamantes += 2
                print("💎 +2 diamantes! (Total: " + str(diamantes) + ")")
            else:
                print("⚠️ Requiere espada para defenderse en la mina.")
        elif opcion == 4:
            if madera >= 10 and piedra >= 5:
                madera -= 10
                piedra -= 5
                espada += 1
                print("⚔️ ¡Espada crafteada!")
            else:
                print("Faltan materiales (10 madera + 5 piedra).")
        elif opcion == 5:
            print("Inventario: Madera: " + str(madera) + " | Piedra: " + str(piedra) + " | Diamantes: " + str(diamantes) + " | Espadas: " + str(espada))

if __name__ == '__main__':
    main()`,
      java: `import java.util.Scanner;

public class MinecraftSurvival {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== MINECRAFT SURVIVAL ===");
        int madera = 0, piedra = 0, diamantes = 0, espada = 0, op = 0;

        while (op != 6) {
            System.out.println("\\n1. Madera | 2. Piedra | 3. Diamantes | 4. Espada | 5. Inventario | 6. Salir");
            if (!sc.hasNextInt()) { sc.next(); continue; }
            op = sc.nextInt();

            if (op == 1) {
                for (int i = 1; i <= 4; i++) madera += 3;
                System.out.println("Madera total: " + madera);
            } else if (op == 2) {
                piedra += 6; System.out.println("Piedra total: " + piedra);
            } else if (op == 3) {
                if (espada > 0) { diamantes += 2; System.out.println("💎 +2 Diamantes!"); }
                else System.out.println("Necesitas espada.");
            } else if (op == 4) {
                if (madera >= 10 && piedra >= 5) { madera -= 10; piedra -= 5; espada++; System.out.println("Espada creada!"); }
                else System.out.println("Materiales insuficientes.");
            } else if (op == 5) {
                System.out.println("Madera: " + madera + " | Piedra: " + piedra + " | Diamantes: " + diamantes + " | Espada: " + espada);
            }
        }
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "=== MINECRAFT SURVIVAL ===" << endl;
    int madera = 0, piedra = 0, diamantes = 0, espada = 0, op = 0;

    while (op != 6) {
        cout << "\\n1. Madera\\n2. Piedra\\n3. Diamantes\\n4. Espada\\n5. Inventario\\n6. Salir\\nOpcion: ";
        cin >> op;
        if (op == 1) { for (int i = 0; i < 4; i++) madera += 3; cout << "Madera: " << madera << endl; }
        else if (op == 2) { piedra += 6; cout << "Piedra: " << piedra << endl; }
        else if (op == 3) {
            if (espada > 0) { diamantes += 2; cout << "💎 +2 Diamantes!" << endl; }
            else cout << "Requiere espada!" << endl;
        } else if (op == 4) {
            if (madera >= 10 && piedra >= 5) { madera -= 10; piedra -= 5; espada++; cout << "Espada lista!" << endl; }
        } else if (op == 5) {
            cout << "Madera: " << madera << " | Piedra: " << piedra << " | Diamantes: " << diamantes << " | Espadas: " << espada << endl;
        }
    }
    return 0;
}`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("=== MINECRAFT SURVIVAL ===");
    let madera = 0, piedra = 0, diamantes = 0, espada = 0, op = 0;
    while (op !== 6) {
        console.log("\\n1. Madera | 2. Piedra | 3. Diamantes | 4. Espada | 5. Inventario | 6. Salir");
        op = parseInt(await ask("Opción: "), 10);
        if (op === 1) { for (let i = 0; i < 4; i++) madera += 3; console.log("Madera: " + madera); }
        else if (op === 2) { piedra += 6; console.log("Piedra: " + piedra); }
        else if (op === 3) {
            if (espada > 0) { diamantes += 2; console.log("💎 +2 Diamantes!"); }
            else console.log("Requiere espada!");
        } else if (op === 4) {
            if (madera >= 10 && piedra >= 5) { madera -= 10; piedra -= 5; espada++; console.log("Espada crafteada!"); }
        } else if (op === 5) {
            console.log("Madera: " + madera + " | Piedra: " + piedra + " | Diamantes: " + diamantes + " | Espadas: " + espada);
        }
    }
    rl.close();
}
main();`,
      php: `<?php
echo "=== MINECRAFT SURVIVAL ===\\n";
$madera = 0; $piedra = 0; $diamantes = 0; $espada = 0; $op = 0;

while ($op != 6) {
    echo "\\n1. Madera\\n2. Piedra\\n3. Diamantes\\n4. Espada\\n5. Inventario\\n6. Salir\\nOpcion: ";
    $op = intval(trim(fgets(STDIN)));
    if ($op == 1) { for ($i = 0; $i < 4; $i++) $madera += 3; echo "Madera: $madera\\n"; }
    else if ($op == 2) { $piedra += 6; echo "Piedra: $piedra\\n"; }
    else if ($op == 3) {
        if ($espada > 0) { $diamantes += 2; echo "💎 +2 Diamantes!\\n"; }
        else echo "Requiere espada.\\n";
    } else if ($op == 4) {
        if ($madera >= 10 && $piedra >= 5) { $madera -= 10; $piedra -= 5; $espada++; echo "Espada crafteada!\\n"; }
    } else if ($op == 5) {
        echo "Madera: $madera | Piedra: $piedra | Diamantes: $diamantes | Espadas: $espada\\n";
    }
}
?>`,
      pseint: `Algoritmo MinecraftSurvival
    Definir madera, piedra, diamantes, espada, op, i Como Entero
    madera <- 0; piedra <- 0; diamantes <- 0; espada <- 0; op <- 0
    
    Mientras op <> 6 Hacer
        Escribir "1. Madera | 2. Piedra | 3. Diamantes | 4. Espada | 5. Inventario | 6. Salir"
        Leer op
        Segun op Hacer
            1:
                Para i <- 1 Hasta 4 Con Paso 1 Hacer madera <- madera + 3; FinPara
                Escribir "Madera: ", madera
            2:
                piedra <- piedra + 6
                Escribir "Piedra: ", piedra
            3:
                Si espada > 0 Entonces
                    diamantes <- diamantes + 2
                    Escribir "💎 +2 Diamantes!"
                SiNo
                    Escribir "Requiere espada!"
                FinSi
            4:
                Si madera >= 10 Y piedra >= 5 Entonces
                    madera <- madera - 10
                    piedra <- piedra - 5
                    espada <- espada + 1
                    Escribir "Espada creada!"
                SiNo
                    Escribir "Faltan materiales."
                FinSi
            5:
                Escribir "Madera: ", madera, " | Piedra: ", piedra, " | Diamantes: ", diamantes, " | Espadas: ", espada
        FinSegun
    FinMientras
FinAlgoritmo`
    }
  },
  {
    id: 5,
    slug: 'batalla-pokemon',
    number: '05',
    title: 'Batalla Pokémon por Turnos',
    subtitle: 'Simulador de combate por turnos, pociones curativas y subidas de nivel',
    icon: '⚡',
    accentColor: '#ec4899',
    badge: 'PROYECTO 5 · POKÉMON',
    difficulty: 'Intermedio',
    story: '¡Te damos la bienvenida al mundo Pokémon! Como nuevo entrenador en la región Kanto, tu compañero Pokémon debe medirse en combates de hierba alta para ganar experiencia, fortalecer sus ataques y llegar a la cima.',
    objective: 'Programar un duelo por turnos utilizando bucles for, consumo de objetos curativos, gestión de ataques y cálculo de daño mutuo.',
    initialInputs: [
      'Nombre del entrenador (texto)',
      'Nombre del Pokémon (Charmander, Squirtle, Bulbasaur, Pikachu)',
      'Tipo elemental (Fuego, Agua, Planta o Eléctrico)'
    ],
    variables: [
      { name: 'vidaPokemon', type: 'int', initialValue: '100', description: 'Puntos de salud del Pokémon aliado' },
      { name: 'ataque', type: 'int', initialValue: '20', description: 'Poder de daño base' },
      { name: 'pociones', type: 'int', initialValue: '3', description: 'Cantidad de pociones curativas disponibles' },
      { name: 'nivel', type: 'int', initialValue: '1', description: 'Nivel del Pokémon' },
      { name: 'victorias', type: 'int', initialValue: '0', description: 'Combates ganados' }
    ],
    menuOptions: [
      {
        option: '1',
        title: 'Atacar al Rival',
        description: 'Simula un intercambio de 2 turnos de combate usando for.',
        logic: 'for (int t = 1; t <= 2; t++). Tu Pokémon ataca y el rival contraataca (-12 HP). Si el rival es vencido: +1 victoria, sube nivel, aumenta ataque en +5 y restaura vida.'
      },
      {
        option: '2',
        title: 'Usar Poción Curativa',
        description: 'Restaura 20 puntos de salud consumiendo 1 poción.',
        logic: 'if (pociones > 0) { vidaPokemon = Math.Min(100, vidaPokemon + 20); pociones--; }'
      },
      {
        option: '3',
        title: 'Ver Estado del Pokémon',
        description: 'Consulta los datos del compañero.',
        logic: 'Imprime: Entrenador, Pokémon, Tipo, Vida, Ataque, Pociones y Nivel.'
      },
      {
        option: '4',
        title: 'Escapar del Combate / Salir',
        description: 'Huye con éxito de la hierba alta.',
        logic: 'opcion = 4; Termina el bucle while.'
      }
    ],
    rules: [
      'Si el Pokémon aliado vence al rival: sube de nivel (+1), su ataque aumenta en +5 y recupera salud.',
      'Si la vida del Pokémon llega a 0: mostrar "¡Pokémon derrotado!" y terminar la partida.',
      'Las pociones solo se pueden usar si pociones > 0.'
    ],
    extraChallenges: [
      'Evolución Pokémon: Al alcanzar nivel 3, el Pokémon evoluciona a su siguiente forma (ej. Charmander -> Charmeleon).',
      'Ventaja de Tipos: Si Fuego ataca a Planta, daño x1.5; si Agua ataca a Fuego, daño x1.5.'
    ],
    steps: [
      { id: 'p5_s1', title: 'Inicializar Datos del Entrenador', desc: 'Capturar entrenador, pokémon y tipo; fijar vida=100, ataque=20, pociones=3.' },
      { id: 'p5_s2', title: 'Combate por Turnos con for', desc: 'Desarrollar la simulación de turnos con ataque y contraataque.' },
      { id: 'p5_s3', title: 'Curación con Pociones', desc: 'Validar pociones > 0 y curar +20 HP sin exceder el máximo de 100.' },
      { id: 'p5_s4', title: 'Incremento de Nivel y Estadísticas', desc: 'Aumentar nivel y daño tras cada combate victorioso.' }
    ],
    consolePreview: `================================================
            BATALLA POKÉMON CONSOLE             
================================================
Entrenador: Red
Pokémon elegido: Charmander (Tipo Fuego)

Vida: 100 HP | Ataque: 20 | Pociones: 3 | Nivel: 1

------------- MENÚ DE BATALLA -------------
1. Atacar al rival
2. Usar poción curativa (+20 HP)
3. Ver estado del Pokémon
4. Escapar / Salir
Elige una opción: 1

--- ¡COMBATE SALVAJE! ---
Turno 1: ¡Charmander usa Ascuas causando 20 de daño!
         Rival salvaje contraataca y causa 12 de daño.
Turno 2: ¡Charmander asesta golpe crítico! ¡Rival derrotado!
¡Victoria! Charmander sube a Nivel 2 (+5 Ataque).`,
    solutions: {
      csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("            BATALLA POKÉMON CONSOLE             ");
        Console.WriteLine("================================================");

        Console.Write("Nombre del entrenador: ");
        string entrenador = Console.ReadLine();

        Console.Write("Nombre de tu Pokémon (Charmander, Squirtle, Bulbasaur, Pikachu): ");
        string pokemon = Console.ReadLine();

        Console.Write("Tipo elemental (Fuego / Agua / Planta / Eléctrico): ");
        string tipo = Console.ReadLine();

        int vidaPokemon = 100;
        int ataque = 20;
        int pociones = 3;
        int nivel = 1;
        int victorias = 0;

        int opcion = 0;
        Random random = new Random();

        while (opcion != 4 && vidaPokemon > 0)
        {
            Console.WriteLine("\\n===== ENTRENADOR: " + entrenador + " | " + pokemon + " (Lv." + nivel + ") =====");
            Console.WriteLine("1. Atacar al rival");
            Console.WriteLine("2. Usar poción (+20 HP)");
            Console.WriteLine("3. Ver estado del Pokémon");
            Console.WriteLine("4. Escapar / Salir");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion)) continue;

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("\\n--- ¡" + pokemon + " ENTRA AL COMBATE! ---");
                    int vidaRival = 35 + (nivel * 8);

                    for (int turno = 1; turno <= 2; turno++)
                    {
                        Console.WriteLine("Turno " + turno + ": ¡" + pokemon + " usa ataque de tipo " + tipo + "! Causa " + ataque + " de daño.");
                        vidaRival -= ataque;

                        if (vidaRival <= 0)
                        {
                            Console.WriteLine("¡El Pokémon rival cayó debilitado!");
                            break;
                        }

                        int danioRival = random.Next(10, 16);
                        vidaPokemon -= danioRival;
                        Console.WriteLine("         El rival contraataca y causa " + danioRival + " de daño a " + pokemon + ".");

                        if (vidaPokemon <= 0)
                        {
                            Console.WriteLine("¡" + pokemon + " ha sido derrotado!");
                            break;
                        }
                    }

                    if (vidaPokemon > 0)
                    {
                        victorias++;
                        nivel++;
                        ataque += 5;
                        vidaPokemon = Math.Min(100, vidaPokemon + 15);
                        Console.WriteLine("\\n🎉 ¡Victoria! " + pokemon + " sube a Nivel " + nivel + ". Ataque aumentado a " + ataque + ".");
                    }
                    break;

                case 2:
                    if (pociones > 0)
                    {
                        pociones--;
                        vidaPokemon = Math.Min(100, vidaPokemon + 20);
                        Console.WriteLine("\\n🧪 Usaste una poción en " + pokemon + ". Vida restaurada a " + vidaPokemon + " HP. (Quedan " + pociones + " pociones).");
                    }
                    else
                    {
                        Console.WriteLine("\\n[!] No te quedan pociones curativas en la mochila.");
                    }
                    break;

                case 3:
                    Console.WriteLine("\\n================ DATOS POKÉMON ================");
                    Console.WriteLine("Entrenador:  " + entrenador);
                    Console.WriteLine("Pokémon:     " + pokemon);
                    Console.WriteLine("Tipo:        " + tipo);
                    Console.WriteLine("Nivel:       " + nivel);
                    Console.WriteLine("Salud:       " + vidaPokemon + " / 100 HP");
                    Console.WriteLine("Ataque:      " + ataque);
                    Console.WriteLine("Pociones:    " + pociones);
                    Console.WriteLine("Victorias:   " + victorias);
                    Console.WriteLine("===============================================");
                    break;

                case 4:
                    Console.WriteLine("\\n" + entrenador + " y " + pokemon + " escaparon con éxito del combate.");
                    break;
            }
        }

        if (vidaPokemon <= 0)
        {
            Console.WriteLine("\\n☠️ Tu Pokémon no tiene más energías para combatir. FIN DE LA AVENTURA.");
        }
    }
}`,
      python: `import random

def main():
    print("=== BATALLA POKÉMON ===")
    entrenador = input("Entrenador: ")
    pokemon = input("Pokémon: ")
    tipo = input("Tipo: ")

    vida = 100
    ataque = 20
    pociones = 3
    nivel = 1
    opcion = 0

    while opcion != 4 and vida > 0:
        print("\\n[" + pokemon + " Lv." + str(nivel) + " | HP: " + str(vida) + "/100 | Pociones: " + str(pociones) + "]")
        print("1. Atacar\\n2. Usar poción\\n3. Ver estado\\n4. Escapar")
        try:
            opcion = int(input("Opción: "))
        except ValueError:
            continue

        if opcion == 1:
            for t in range(1, 3):
                print("Turno " + str(t) + ": ¡" + pokemon + " ataca causando " + str(ataque) + " de daño!")
                vida -= 12
                if vida <= 0: break
            if vida > 0:
                nivel += 1
                ataque += 5
                print("¡Victoria! " + pokemon + " sube a Nivel " + str(nivel) + " (Ataque: " + str(ataque) + ")")
            else:
                print("¡Pokémon derrotado!")

        elif opcion == 2:
            if pociones > 0:
                pociones -= 1
                vida = min(100, vida + 20)
                print("Vida restaurada a " + str(vida) + " HP.")
            else:
                print("No quedan pociones.")

        elif opcion == 3:
            print("Trainer: " + entrenador + " | " + pokemon + " (" + tipo + ") | Lv: " + str(nivel) + " | HP: " + str(vida) + " | Atk: " + str(ataque))

if __name__ == '__main__':
    main()`,
      java: `import java.util.Scanner;

public class PokemonBattle {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== BATALLA POKEMON ===");
        System.out.print("Entrenador: ");
        String trainer = sc.nextLine();
        System.out.print("Pokemon: ");
        String poke = sc.nextLine();

        int vida = 100, ataque = 20, pociones = 3, nivel = 1, op = 0;

        while (op != 4 && vida > 0) {
            System.out.println("\\n1. Atacar | 2. Pocion | 3. Estado | 4. Escapar");
            if (!sc.hasNextInt()) { sc.next(); continue; }
            op = sc.nextInt();

            if (op == 1) {
                for (int i = 1; i <= 2; i++) {
                    System.out.println("Turno " + i + ": " + poke + " ataca (" + ataque + " dmg). Rival causa 12 dmg.");
                    vida -= 12;
                    if (vida <= 0) break;
                }
                if (vida > 0) {
                    nivel++; ataque += 5;
                    System.out.println("¡Victoria! Subiste a Nivel " + nivel);
                }
            } else if (op == 2) {
                if (pociones > 0) { pociones--; vida = Math.min(100, vida + 20); System.out.println("HP: " + vida); }
            } else if (op == 3) {
                System.out.println(poke + " (Lv." + nivel + ") | HP: " + vida + " | Atk: " + ataque + " | Pociones: " + pociones);
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "=== BATALLA POKEMON ===" << endl;
    string poke; cout << "Pokemon: "; cin >> poke;
    int vida = 100, ataque = 20, pociones = 3, nivel = 1, op = 0;

    while (op != 4 && vida > 0) {
        cout << "\\n1. Atacar\\n2. Pocion\\n3. Estado\\n4. Escapar\\nOpcion: ";
        cin >> op;
        if (op == 1) {
            for (int i = 1; i <= 2; i++) {
                cout << "Turno " << i << ": " << poke << " ataca con " << ataque << " dmg. Recibes 12." << endl;
                vida -= 12;
                if (vida <= 0) break;
            }
            if (vida > 0) { nivel++; ataque += 5; cout << "Victoria! Nivel " << nivel << endl; }
        } else if (op == 2) {
            if (pociones > 0) { pociones--; vida = (vida + 20 > 100) ? 100 : vida + 20; cout << "HP: " << vida << endl; }
        } else if (op == 3) {
            cout << poke << " | Nivel: " << nivel << " | HP: " << vida << " | Ataque: " << ataque << endl;
        }
    }
    return 0;
}`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("=== BATALLA POKEMON ===");
    const poke = await ask("Nombre del Pokémon: ");
    let vida = 100, ataque = 20, pociones = 3, nivel = 1, op = 0;

    while (op !== 4 && vida > 0) {
        console.log("\\n1. Atacar | 2. Poción | 3. Estado | 4. Escapar");
        op = parseInt(await ask("Opción: "), 10);
        if (op === 1) {
            for (let i = 1; i <= 2; i++) {
                console.log("Turno " + i + ": " + poke + " ataca con " + ataque + ". Recibe 12 de daño.");
                vida -= 12;
                if (vida <= 0) break;
            }
            if (vida > 0) { nivel++; ataque += 5; console.log("¡Victoria! Nivel " + nivel); }
        } else if (op === 2) {
            if (pociones > 0) { pociones--; vida = Math.min(100, vida + 20); console.log("HP: " + vida); }
        } else if (op === 3) {
            console.log(poke + " | Nivel: " + nivel + " | HP: " + vida + " | Ataque: " + ataque);
        }
    }
    rl.close();
}
main();`,
      php: `<?php
echo "=== BATALLA POKEMON ===\\nPokemon: ";
$poke = trim(fgets(STDIN));
$vida = 100; $ataque = 20; $pociones = 3; $nivel = 1; $op = 0;

while ($op != 4 && $vida > 0) {
    echo "\\n1. Atacar\\n2. Pocion\\n3. Estado\\n4. Escapar\\nOpcion: ";
    $op = intval(trim(fgets(STDIN)));
    if ($op == 1) {
        for ($i = 1; $i <= 2; $i++) {
            echo "Turno $i: $poke ataca ($ataque dmg). Recibe 12 dmg.\\n";
            $vida -= 12;
            if ($vida <= 0) break;
        }
        if ($vida > 0) { $nivel++; $ataque += 5; echo "Victoria! Nivel $nivel\\n"; }
    } else if ($op == 2) {
        if ($pociones > 0) { $pociones--; $vida = min(100, $vida + 20); echo "HP: $vida\\n"; }
    } else if ($op == 3) {
        echo "$poke | Nivel: $nivel | HP: $vida | Ataque: $ataque\\n";
    }
}
?>`,
      pseint: `Algoritmo BatallaPokemon
    Definir poke Como Cadena
    Definir vida, ataque, pociones, nivel, op, i Como Entero
    vida <- 100; ataque <- 20; pociones <- 3; nivel <- 1; op <- 0
    
    Escribir "=== BATALLA POKEMON ==="
    Escribir "Nombre Pokemon:"
    Leer poke
    
    Mientras op <> 4 Y vida > 0 Hacer
        Escribir "1. Atacar | 2. Pocion | 3. Estado | 4. Escapar"
        Leer op
        Segun op Hacer
            1:
                Para i <- 1 Hasta 2 Con Paso 1 Hacer
                    Escribir "Turno ", i, ": ", poke, " ataca (", ataque, " dmg). Recibe 12 dmg."
                    vida <- vida - 12
                FinPara
                Si vida > 0 Entonces
                    nivel <- nivel + 1
                    ataque <- ataque + 5
                    Escribir "Victoria! Nivel ", nivel
                FinSi
            2:
                Si pociones > 0 Entonces
                    pociones <- pociones - 1
                    vida <- vida + 20
                    Si vida > 100 Entonces vida <- 100; FinSi
                    Escribir "HP: ", vida
                FinSi
            3:
                Escribir poke, " | Nivel: ", nivel, " | HP: ", vida, " | Ataque: ", ataque
        FinSegun
    FinMientras
FinAlgoritmo`
    }
  },
  {
    id: 6,
    slug: 'carrera-arcade',
    number: '06',
    title: 'Carrera Arcade: Nitro Grand Prix',
    subtitle: 'Simulador de velocidad, consumo de combustible y gestión de curvas',
    icon: '🏎️',
    accentColor: '#3b82f6',
    badge: 'PROYECTO 6 · SIMULADOR',
    difficulty: 'Intermedio',
    story: 'El asfalto arde en el circuito internacional de Neópolis. Toma el volante de tu monoplaza, gestiona la aceleración y el consumo de combustible, y evita sobrepasar los límites de seguridad en cada vuelta para cruzar la meta en primer lugar.',
    objective: 'Programar un simulador de carreras controlando velocidad y combustible mediante bucles for para el conteo de vueltas y condiciones if/else de choques y derrotas.',
    initialInputs: [
      'Nombre del piloto / corredor (texto)',
      'Cantidad de vueltas a competir (ej. 3 a 5)'
    ],
    variables: [
      { name: 'velocidad', type: 'int', initialValue: '0', description: 'Velocidad actual en km/h' },
      { name: 'combustible', type: 'int', initialValue: '100', description: 'Porcentaje de gasolina disponible' },
      { name: 'vueltasTotales', type: 'int', initialValue: '3', description: 'Meta de vueltas para ganar' },
      { name: 'vueltasCompletadas', type: 'int', initialValue: '0', description: 'Vueltas recorridas con éxito' },
      { name: 'nitro', type: 'int', initialValue: '2', description: 'Cargas de aceleración turbo' }
    ],
    menuOptions: [
      {
        option: '1',
        title: 'Acelerar el Vehículo',
        description: 'Aumenta la velocidad en +30 km/h y consume 5% de combustible.',
        logic: 'velocidad += 30; combustible -= 5;'
      },
      {
        option: '2',
        title: 'Frenar / Reducir Velocidad',
        description: 'Disminuye la velocidad en -20 km/h para evitar choques en curvas cerradas.',
        logic: 'velocidad = Math.Max(0, velocidad - 20);'
      },
      {
        option: '3',
        title: 'Ver Estado del Monoplaza',
        description: 'Muestra telemetría completa del vehículo.',
        logic: 'Imprime: Piloto, Velocidad actual, Combustible restante y Vueltas.'
      },
      {
        option: '4',
        title: 'Iniciar Carrera / Completar Vueltas',
        description: 'Simula el paso por las vueltas del circuito usando un bucle for.',
        logic: 'for (int v = 1; v <= vueltasTotales; v++). Cada vuelta consume combustible según la velocidad. Si velocidad > 200: ¡Choque! Si combustible <= 0: ¡Sin gasolina!'
      },
      {
        option: '5',
        title: 'Abandonar Carrera / Salir',
        description: 'Regresa a los boxes.',
        logic: 'opcion = 5; Termina el bucle while.'
      }
    ],
    rules: [
      'Si velocidad > 200 km/h al correr: el vehículo pierde el control y choca (GAME OVER).',
      'Si combustible <= 0 durante la carrera: el auto se detiene y pierde la carrera.',
      'Si completa todas las vueltas con combustible > 0 y velocidad <= 200: ¡Victoria de Gran Premio!'
    ],
    extraChallenges: [
      'Parada en Pits (Pit Stop): Opción para recargar combustible a 100% perdiendo posición.',
      'Condición de Clima: Pista mojada reduce la velocidad máxima segura a 160 km/h.'
    ],
    steps: [
      { id: 'p6_s1', title: 'Inicializar Variables de Carrera', desc: 'Definir velocidad=0, combustible=100 y número de vueltas.' },
      { id: 'p6_s2', title: 'Controles de Aceleración y Frenado', desc: 'Aumentar o disminuir velocidad ajustando el gasto de combustible.' },
      { id: 'p6_s3', title: 'Simulación de Vueltas con for', desc: 'Recorrer cada vuelta evaluando si se mantiene la velocidad segura y el combustible.' },
      { id: 'p6_s4', title: 'Comprobar Condiciones de Victoria o Choque', desc: 'Validar velocidad > 200 (choque), combustible <= 0 (derrota) o meta completada.' }
    ],
    consolePreview: `================================================
          CARRERA ARCADE: NITRO GRAND PRIX       
================================================
Piloto: Ayrton | Vueltas a competir: 3

Velocidad: 0 km/h | Combustible: 100% | Nitro: 2

-------------- PADDOCK & CONTROLES --------------
1. Acelerar (+30 km/h, -5% combustible)
2. Frenar (-20 km/h)
3. Ver telemetría del monoplaza
4. Iniciar carrera en el circuito (3 vueltas)
5. Abandonar / Salir
Elige una opción: 1

>> [🏎️] Acelerando a fondo. Velocidad: 90 km/h | Combustible: 85%
Elige una opción: 4

--- ¡BANDERA VERDE EN EL CIRCUITO! ---
Vuelta 1: Superada a 90 km/h. Combustible restante: 70%.
Vuelta 2: Superada a 120 km/h. Combustible restante: 50%.
Vuelta 3: ¡Cruzando la línea de meta a toda velocidad!
🏆 ¡VICTORIA! ¡Has ganado el Gran Premio de Neópolis!`,
    solutions: {
      csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("          CARRERA ARCADE: NITRO GRAND PRIX       ");
        Console.WriteLine("================================================");

        Console.Write("Nombre del piloto: ");
        string piloto = Console.ReadLine();

        Console.Write("Cantidad de vueltas a competir (ej. 3 a 5): ");
        int vueltasTotales = 3;
        int.TryParse(Console.ReadLine(), out vueltasTotales);

        int velocidad = 0;
        int combustible = 100;
        int nitro = 2;
        int opcion = 0;
        bool carreraTerminada = false;

        Random random = new Random();

        while (opcion != 5 && !carreraTerminada)
        {
            Console.WriteLine("\\n===== CIRCUITO | Piloto: " + piloto + " | Vueltas: " + vueltasTotales + " =====");
            Console.WriteLine("1. Acelerar (+30 km/h, -5% Combustible)");
            Console.WriteLine("2. Frenar (-20 km/h)");
            Console.WriteLine("3. Ver telemetría del vehículo");
            Console.WriteLine("4. Iniciar carrera en el circuito");
            Console.WriteLine("5. Abandonar / Salir");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion)) continue;

            switch (opcion)
            {
                case 1:
                    if (combustible >= 5)
                    {
                        velocidad += 30;
                        combustible -= 5;
                        Console.WriteLine("\\n[🏎️] Has acelerado. Velocidad actual: " + velocidad + " km/h | Combustible: " + combustible + "%.");
                        if (velocidad > 200)
                        {
                            Console.WriteLine("⚠️ ¡PELIGRO! La velocidad supera los 200 km/h. ¡Riesgo inminente de choque!");
                        }
                    }
                    else
                    {
                        Console.WriteLine("\\n[!] No tienes suficiente combustible para acelerar.");
                    }
                    break;

                case 2:
                    velocidad = Math.Max(0, velocidad - 20);
                    Console.WriteLine("\\n[🛑] Frenando. Velocidad reducida a: " + velocidad + " km/h.");
                    break;

                case 3:
                    Console.WriteLine("\\n================ TELEMETRÍA ================");
                    Console.WriteLine("Piloto:       " + piloto);
                    Console.WriteLine("Velocidad:    " + velocidad + " km/h");
                    Console.WriteLine("Combustible:  " + combustible + "%");
                    Console.WriteLine("Nitro:        " + nitro + " cargas");
                    Console.WriteLine("Vueltas Meta: " + vueltasTotales);
                    Console.WriteLine("============================================");
                    break;

                case 4:
                    if (velocidad == 0)
                    {
                        Console.WriteLine("\\n[!] El auto está detenido (0 km/h). Acelera antes de lanzarte a la pista.");
                        break;
                    }

                    Console.WriteLine("\\n--- ¡BANDERA VERDE! INICIANDO RECORRIDO DEL CIRCUITO ---");
                    bool choque = false;
                    bool sinGasolina = false;

                    for (int vuelta = 1; vuelta <= vueltasTotales; vuelta++)
                    {
                        // Cada vuelta consume combustible según la velocidad
                        int consumo = 10 + (velocidad / 25);
                        combustible -= consumo;

                        // Aceleración leve automática por vuelta
                        velocidad += random.Next(5, 15);

                        Console.WriteLine("\\n>> Vuelta " + vuelta + " / " + vueltasTotales + ":");
                        Console.WriteLine("   Velocidad en recta: " + velocidad + " km/h | Combustible restante: " + combustible + "%");

                        // Verificación de choque
                        if (velocidad > 200)
                        {
                            Console.WriteLine("\\n💥 ¡CHOQUE BRUTAL! Superaste los 200 km/h en la curva del circuito.");
                            choque = true;
                            break;
                        }

                        // Verificación de combustible
                        if (combustible <= 0)
                        {
                            Console.WriteLine("\\n⛽ ¡SIN COMBUSTIBLE! El motor se apagó en plena pista.");
                            sinGasolina = true;
                            break;
                        }
                    }

                    if (choque || sinGasolina)
                    {
                        Console.WriteLine("\\n☠️ Has quedado descalificado de la carrera. GAME OVER.");
                        carreraTerminada = true;
                    }
                    else
                    {
                        Console.WriteLine("\\n🏁 ¡BANDERA A CUADROS! ¡Cruzaste la línea de meta!");
                        Console.WriteLine("🏆 ¡Felicitaciones " + piloto + "! Ganaste el Gran Premio de Neópolis.");
                        carreraTerminada = true;
                    }
                    break;

                case 5:
                    Console.WriteLine("\\nHas abandonado la carrera en boxes. ¡Hasta pronto " + piloto + "!");
                    break;
            }
        }
    }
}`,
      python: `import random

def main():
    print("=== CARRERA ARCADE: NITRO GRAND PRIX ===")
    piloto = input("Nombre del piloto: ")
    vueltas = 3
    velocidad = 0
    combustible = 100
    opcion = 0

    while opcion != 5:
        print("\\n[" + piloto + "] Velocidad: " + str(velocidad) + " km/h | Combustible: " + str(combustible) + "%")
        print("1. Acelerar (+30 km/h)\\n2. Frenar (-20 km/h)\\n3. Telemetría\\n4. Iniciar carrera\\n5. Salir")
        try:
            opcion = int(input("Opción: "))
        except ValueError:
            continue

        if opcion == 1:
            if combustible >= 5:
                velocidad += 30
                combustible -= 5
                print("Velocidad: " + str(velocidad) + " km/h | Gasolina: " + str(combustible) + "%")
        elif opcion == 2:
            velocidad = max(0, velocidad - 20)
            print("Velocidad reducida a: " + str(velocidad) + " km/h")
        elif opcion == 3:
            print("Telemetría -> " + piloto + " | Vel: " + str(velocidad) + " km/h | Gas: " + str(combustible) + "%")
        elif opcion == 4:
            if velocidad == 0:
                print("Acelera primero.")
                continue
            derrota = False
            for v in range(1, vueltas + 1):
                combustible -= (10 + velocidad // 25)
                velocidad += random.randint(5, 15)
                print("Vuelta " + str(v) + ": " + str(velocidad) + " km/h | Gas: " + str(combustible) + "%")
                if velocidad > 200:
                    print("💥 ¡Choque a más de 200 km/h!")
                    derrota = True
                    break
                if combustible <= 0:
                    print("⛽ ¡Sin combustible!")
                    derrota = True
                    break
            if not derrota:
                print("🏆 ¡Victoria de Gran Premio!")
            break

if __name__ == '__main__':
    main()`,
      java: `import java.util.Scanner;

public class CarreraArcade {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("=== CARRERA ARCADE ===");
        System.out.print("Piloto: ");
        String piloto = sc.nextLine();

        int velocidad = 0, combustible = 100, op = 0;

        while (op != 5) {
            System.out.println("\\n1. Acelerar | 2. Frenar | 3. Telemetría | 4. Carrera | 5. Salir");
            if (!sc.hasNextInt()) { sc.next(); continue; }
            op = sc.nextInt();

            if (op == 1) { velocidad += 30; combustible -= 5; System.out.println("Vel: " + velocidad + " km/h | Gas: " + combustible + "%"); }
            else if (op == 2) { velocidad = Math.max(0, velocidad - 20); System.out.println("Vel: " + velocidad + " km/h"); }
            else if (op == 4) {
                if (velocidad == 0) { System.out.println("Acelera primero."); continue; }
                boolean fail = false;
                for (int v = 1; v <= 3; v++) {
                    combustible -= 15;
                    System.out.println("Vuelta " + v + ": " + velocidad + " km/h | Gas: " + combustible + "%");
                    if (velocidad > 200 || combustible <= 0) { fail = true; break; }
                }
                if (!fail) System.out.println("🏆 ¡Victoria de Gran Premio!");
                else System.out.println("☠️ Choque o sin combustible.");
                break;
            }
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "=== CARRERA ARCADE ===" << endl;
    string piloto; cout << "Piloto: "; cin >> piloto;
    int vel = 0, gas = 100, op = 0;

    while (op != 5) {
        cout << "\\n1. Acelerar\\n2. Frenar\\n3. Telemetria\\n4. Correr\\n5. Salir\\nOpcion: ";
        cin >> op;
        if (op == 1) { vel += 30; gas -= 5; cout << "Vel: " << vel << " km/h | Gas: " << gas << "%" << endl; }
        else if (op == 2) { vel = (vel - 20 < 0) ? 0 : vel - 20; cout << "Vel: " << vel << endl; }
        else if (op == 4) {
            if (vel == 0) { cout << "Acelera primero." << endl; continue; }
            bool fail = false;
            for (int v = 1; v <= 3; v++) {
                gas -= 15;
                cout << "Vuelta " << v << ": " << vel << " km/h | Gas: " << gas << "%" << endl;
                if (vel > 200 || gas <= 0) { fail = true; break; }
            }
            if (!fail) cout << "🏆 Victoria!" << endl;
            else cout << "Choque o sin gasolina." << endl;
            break;
        }
    }
    return 0;
}`,
      javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("=== CARRERA ARCADE ===");
    const piloto = await ask("Piloto: ");
    let vel = 0, gas = 100, op = 0;

    while (op !== 5) {
        console.log("\\n1. Acelerar | 2. Frenar | 3. Telemetría | 4. Correr | 5. Salir");
        op = parseInt(await ask("Opción: "), 10);
        if (op === 1) { vel += 30; gas -= 5; console.log("Velocidad: " + vel + " km/h | Gas: " + gas + "%"); }
        else if (op === 2) { vel = Math.max(0, vel - 20); console.log("Velocidad: " + vel + " km/h"); }
        else if (op === 4) {
            if (vel === 0) { console.log("Acelera primero."); continue; }
            let fail = false;
            for (let v = 1; v <= 3; v++) {
                gas -= 15;
                console.log("Vuelta " + v + ": " + vel + " km/h | Gas: " + gas + "%");
                if (vel > 200 || gas <= 0) { fail = true; break; }
            }
            if (!fail) console.log("🏆 ¡Victoria!");
            else console.log("Choque o sin combustible.");
            break;
        }
    }
    rl.close();
}
main();`,
      php: `<?php
echo "=== CARRERA ARCADE ===\\nPiloto: ";
$piloto = trim(fgets(STDIN));
$vel = 0; $gas = 100; $op = 0;

while ($op != 5) {
    echo "\\n1. Acelerar\\n2. Frenar\\n3. Telemetria\\n4. Correr\\n5. Salir\\nOpcion: ";
    $op = intval(trim(fgets(STDIN)));
    if ($op == 1) { $vel += 30; $gas -= 5; echo "Vel: $vel km/h | Gas: $gas%\\n"; }
    else if ($op == 2) { $vel = max(0, $vel - 20); echo "Vel: $vel km/h\\n"; }
    else if ($op == 4) {
        if ($vel == 0) { echo "Acelera primero.\\n"; continue; }
        $fail = false;
        for ($v = 1; $v <= 3; $v++) {
            $gas -= 15;
            echo "Vuelta $v: $vel km/h | Gas: $gas%\\n";
            if ($vel > 200 || $gas <= 0) { $fail = true; break; }
        }
        if (!$fail) echo "🏆 Victoria!\\n";
        else echo "Choque o sin gasolina.\\n";
        break;
    }
}
?>`,
      pseint: `Algoritmo CarreraArcade
    Definir piloto Como Cadena
    Definir vel, gas, op, v Como Entero
    Definir fail Como Logico
    vel <- 0; gas <- 100; op <- 0; fail <- Falso
    
    Escribir "=== CARRERA ARCADE ==="
    Escribir "Piloto:"
    Leer piloto
    
    Mientras op <> 5 Y NO fail Hacer
        Escribir "1. Acelerar | 2. Frenar | 3. Telemetria | 4. Correr | 5. Salir"
        Leer op
        Segun op Hacer
            1:
                vel <- vel + 30
                gas <- gas - 5
                Escribir "Vel: ", vel, " km/h | Gas: ", gas, "%"
            2:
                vel <- vel - 20
                Si vel < 0 Entonces vel <- 0; FinSi
                Escribir "Vel: ", vel, " km/h"
            4:
                Si vel = 0 Entonces
                    Escribir "Acelera primero."
                SiNo
                    Para v <- 1 Hasta 3 Con Paso 1 Hacer
                        gas <- gas - 15
                        Escribir "Vuelta ", v, ": ", vel, " km/h | Gas: ", gas, "%"
                        Si vel > 200 O gas <= 0 Entonces
                            fail <- Verdadero
                        FinSi
                    FinPara
                    Si NO fail Entonces
                        Escribir "🏆 Victoria!"
                    SiNo
                        Escribir "Choque o sin gasolina."
                    FinSi
                FinSi
        FinSegun
    FinMientras
FinAlgoritmo`
    }
  }
];
