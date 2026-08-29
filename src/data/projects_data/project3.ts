import type { GameProject } from '../gameProjectsData';

export const project3Valorant: GameProject = {
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
      title: 'Jugar 5 Rondas Competitivas',
      description: 'Simula 5 rondas con bucle for evaluando victoria según puntería.',
      logic: 'for (int r = 1; r <= 5; r++). Si acierta: +2 Kills, +3000 créditos. Si falla: +1 Kill, +1900 créditos.'
    },
    {
      option: '2',
      title: 'Comprar Arma en la Tienda',
      description: 'Menú secundario para comprar Ghost (500), Spectre (1600), Vandal (2900) u Operator (4700).',
      logic: 'Valida si creditos >= coste. Descuenta créditos, cambia arma y aumenta precisión.'
    },
    {
      option: '3',
      title: 'Entrenar en The Range',
      description: 'Gasta 200 créditos para calibrar la mira y aumentar +5% de precisión (Máximo 95%).',
      logic: 'if (creditos >= 200 && precision < 95) { creditos -= 200; precision = Math.Min(95, precision + 5); }'
    },
    {
      option: '4',
      title: 'Ver Perfil y Rango',
      description: 'Muestra Jugador, Agente, Arma equipada, Precisión, Kills totales, Créditos y Rango.',
      logic: 'Calcula rango: kills >= 25 ? "Oro" : kills >= 12 ? "Plata" : kills >= 5 ? "Bronce" : "Hierro".'
    },
    {
      option: '5',
      title: 'Cerrar Sesión / Salir',
      description: 'Termina el bucle competitivo.',
      logic: 'opcion = 5; Finaliza el bucle while.'
    }
  ],
  rules: [
    'No se puede comprar ningún arma si los créditos son insuficientes.',
    'La precisión máxima no puede superar el 95%.',
    'El rango se recalcula automáticamente: 0-4 Kills = Hierro, 5-11 Kills = Bronce, 12-24 Kills = Plata, >= 25 Kills = Oro.'
  ],
  extraChallenges: [
    'Habilidad Definitiva (ULTI): Acumular puntos de orbe por cada ronda y activarla en rondas decisivas.',
    'Escudo Corporal: Comprar escudo ligero (400) o pesado (1000) para aumentar la tasa de victoria.',
    'Partida de Desempate (Overtime): Si tras 5 rondas quedan 2-2 en victorias/derrotas, jugar ronda de muerte súbita.'
  ],
  steps: [
    { id: 'p3_s1', title: 'Inicializar Variables', desc: 'Definir creditos=800, kills=0, precision=50, rango="Hierro", arma="Classic".' },
    { id: 'p3_s2', title: 'Menú Interactivo while', desc: 'Crear bucle con las 5 opciones imprimiendo cada una en línea independiente.' },
    { id: 'p3_s3', title: 'Bucle for de 5 Rondas', desc: 'Iterar 5 rondas evaluando probabilidad con precisión y asignando recompensas.' },
    { id: 'p3_s4', title: 'Sistema de Tienda y Rangos', desc: 'Gestionar compra de armas y ascenso automático de rango.' }
  ],
  consolePreview: `================================================
            VALORANT CONSOLE EDITION            
================================================
Jugador: TenZ | Agente: Jett
Rango: Hierro | Arma: Classic | Precisión: 50% | Créditos: $800

---------------- MENÚ PRINCIPAL ----------------
1. Jugar 5 Rondas Competitivas
2. Comprar Arma en la Tienda
3. Entrenar en The Range (+5% Precisión, Coste: $200)
4. Ver Perfil y Rango
5. Salir
Elige una opción: 1

--- INICIANDO SERIE DE 5 RONDAS ---
Ronda 1: ¡Victoria! Eliminaste a 2 enemigos (+2 Kills, +$3000).
Ronda 2: Derrota ajustada (+1 Kill, +$1900 de recompensa).
Ronda 3: ¡Victoria! Eliminaste a 2 enemigos (+2 Kills, +$3000).
Ronda 4: ¡Victoria! Eliminaste a 2 enemigos (+2 Kills, +$3000).
Ronda 5: Derrota ajustada (+1 Kill, +$1900 de recompensa).
¡Partida finalizada! Total Kills: 8 | Créditos acumulados: $11600`,
  solutions: {
    csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("            VALORANT CONSOLE EDITION            ");
        Console.WriteLine("================================================");

        // 1. Datos iniciales del jugador
        Console.Write("Ingresa tu nombre de jugador: ");
        string jugador = Console.ReadLine();

        Console.Write("Elige tu agente favorito (Jett, Reyna, Sova, etc.): ");
        string agente = Console.ReadLine();

        // 2. Variables de economía y estadísticas
        int creditos = 800;
        int kills = 0;
        int precision = 50;
        string rango = "Hierro";
        string arma = "Classic";

        int opcion = 0;
        Random rng = new Random();

        // 3. Bucle interactivo principal
        while (opcion != 5)
        {
            // Recálculo automático de rango según Kills
            if (kills >= 25)
            {
                rango = "Oro";
            }
            else if (kills >= 12)
            {
                rango = "Plata";
            }
            else if (kills >= 5)
            {
                rango = "Bronce";
            }
            else
            {
                rango = "Hierro";
            }

            Console.WriteLine("");
            Console.WriteLine("---------------- MENÚ PRINCIPAL ----------------");
            Console.WriteLine("1. Jugar 5 Rondas Competitivas");
            Console.WriteLine("2. Comprar Arma en la Tienda");
            Console.WriteLine("3. Entrenar en The Range (+5% Precisión, Coste: $200)");
            Console.WriteLine("4. Ver Perfil y Rango");
            Console.WriteLine("5. Salir del Juego");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida. Ingresa un número.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    Console.WriteLine("");
                    Console.WriteLine("--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---");
                    int victoriasPartida = 0;

                    // Bucle for para simular las 5 rondas
                    for (int ronda = 1; ronda <= 5; ronda++)
                    {
                        int tiro = rng.Next(1, 101); // 1 a 100

                        if (tiro <= precision)
                        {
                            victoriasPartida++;
                            kills += 2;
                            creditos += 3000;
                            Console.WriteLine("Ronda " + ronda + ": ¡Victoria de ronda! +2 Kills y +$3000 créditos.");
                        }
                        else
                        {
                            kills += 1;
                            creditos += 1900;
                            Console.WriteLine("Ronda " + ronda + ": Derrota ajustada. +1 Kill y +$1900 de consolación.");
                        }
                    }

                    Console.WriteLine("");
                    Console.WriteLine("Resultado final: " + victoriasPartida + " rondas ganadas de 5.");
                    Console.WriteLine("Kills totales acumulados: " + kills);
                    Console.WriteLine("Créditos actuales: $" + creditos);
                    break;

                case 2:
                    Console.WriteLine("");
                    Console.WriteLine("=============== TIENDA DE ARMAS ===============");
                    Console.WriteLine("Tus Créditos: $" + creditos);
                    Console.WriteLine("1. Ghost     - $500   (+10% Precisión)");
                    Console.WriteLine("2. Spectre   - $1600  (+15% Precisión)");
                    Console.WriteLine("3. Vandal    - $2900  (+25% Precisión)");
                    Console.WriteLine("4. Operator  - $4700  (+35% Precisión)");
                    Console.WriteLine("5. Cancelar");
                    Console.Write("Selecciona un arma para comprar: ");

                    int armaOp = 0;
                    if (int.TryParse(Console.ReadLine(), out armaOp))
                    {
                        if (armaOp == 1 && creditos >= 500)
                        {
                            creditos -= 500;
                            arma = "Ghost";
                            precision = Math.Min(95, precision + 10);
                            Console.WriteLine("🔫 ¡Has comprado la Ghost! Precisión aumentada a " + precision + "%.");
                        }
                        else if (armaOp == 2 && creditos >= 1600)
                        {
                            creditos -= 1600;
                            arma = "Spectre";
                            precision = Math.Min(95, precision + 15);
                            Console.WriteLine("🔫 ¡Has comprado la Spectre! Precisión aumentada a " + precision + "%.");
                        }
                        else if (armaOp == 3 && creditos >= 2900)
                        {
                            creditos -= 2900;
                            arma = "Vandal";
                            precision = Math.Min(95, precision + 25);
                            Console.WriteLine("🔫 ¡Has comprado la Vandal! Precisión aumentada a " + precision + "%.");
                        }
                        else if (armaOp == 4 && creditos >= 4700)
                        {
                            creditos -= 4700;
                            arma = "Operator";
                            precision = Math.Min(95, precision + 35);
                            Console.WriteLine("🔫 ¡Has comprado el Operator! Precisión aumentada a " + precision + "%.");
                        }
                        else if (armaOp == 5)
                        {
                            Console.WriteLine("Compra cancelada.");
                        }
                        else
                        {
                            Console.WriteLine("❌ Créditos insuficientes para comprar esta arma.");
                        }
                    }
                    break;

                case 3:
                    if (creditos >= 200)
                    {
                        if (precision < 95)
                        {
                            creditos -= 200;
                            precision = Math.Min(95, precision + 5);
                            Console.WriteLine("");
                            Console.WriteLine("🎯 Sesión en The Range completada con éxito.");
                            Console.WriteLine("   Precisión aumentada a " + precision + "%.");
                            Console.WriteLine("   Créditos restantes: $" + creditos);
                        }
                        else
                        {
                            Console.WriteLine("");
                            Console.WriteLine("[!] Ya alcanzaste la precisión máxima de tiro (95%).");
                        }
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("[!] No tienes suficientes créditos para entrar a The Range ($200).");
                    }
                    break;

                case 4:
                    Console.WriteLine("");
                    Console.WriteLine("================ PERFIL RADIANT ================");
                    Console.WriteLine("Jugador:       " + jugador);
                    Console.WriteLine("Agente:        " + agente);
                    Console.WriteLine("Rango:         " + rango);
                    Console.WriteLine("Arma Actual:   " + arma);
                    Console.WriteLine("Precisión:     " + precision + " %");
                    Console.WriteLine("Kills Totales: " + kills);
                    Console.WriteLine("Créditos:      $" + creditos);
                    Console.WriteLine("================================================");
                    break;

                case 5:
                    Console.WriteLine("");
                    Console.WriteLine("¡Sesión cerrada! Gracias por jugar Valorant Console, " + jugador + ".");
                    break;

                default:
                    Console.WriteLine("");
                    Console.WriteLine(">> Opción no reconocida. Intenta de nuevo.");
                    break;
            }
        }
    }
}`,
    python: `import random

def main():
    print("================================================")
    print("            VALORANT CONSOLE EDITION            ")
    print("================================================")

    # 1. Datos iniciales
    jugador = input("Ingresa tu nombre de jugador: ")
    agente = input("Elige tu agente favorito (Jett, Reyna, Sova, etc.): ")

    # 2. Variables de estado
    creditos = 800
    kills = 0
    precision = 50
    rango = "Hierro"
    arma = "Classic"
    opcion = 0

    # 3. Bucle interactivo principal
    while opcion != 5:
        # Recálculo de rango
        if kills >= 25:
            rango = "Oro"
        elif kills >= 12:
            rango = "Plata"
        elif kills >= 5:
            rango = "Bronce"
        else:
            rango = "Hierro"

        print("")
        print("---------------- MENÚ PRINCIPAL ----------------")
        print("1. Jugar 5 Rondas Competitivas")
        print("2. Comprar Arma en la Tienda")
        print("3. Entrenar en The Range (+5% Precisión, Coste: $200)")
        print("4. Ver Perfil y Rango")
        print("5. Salir del Juego")

        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida. Ingresa un número.")
            continue

        if opcion == 1:
            print("")
            print("--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---")
            victorias_partida = 0

            # Bucle for para las 5 rondas
            for ronda in range(1, 6):
                tiro = random.randint(1, 100)

                if tiro <= precision:
                    victorias_partida += 1
                    kills += 2
                    creditos += 3000
                    print("Ronda " + str(ronda) + ": ¡Victoria de ronda! +2 Kills y +$3000 créditos.")
                else:
                    kills += 1
                    creditos += 1900
                    print("Ronda " + str(ronda) + ": Derrota ajustada. +1 Kill y +$1900 de consolación.")

            print("")
            print("Resultado final: " + str(victorias_partida) + " rondas ganadas de 5.")
            print("Kills totales acumulados: " + str(kills))
            print("Créditos actuales: $" + str(creditos))

        elif opcion == 2:
            print("")
            print("=============== TIENDA DE ARMAS ===============")
            print("Tus Créditos: $" + str(creditos))
            print("1. Ghost     - $500   (+10% Precisión)")
            print("2. Spectre   - $1600  (+15% Precisión)")
            print("3. Vandal    - $2900  (+25% Precisión)")
            print("4. Operator  - $4700  (+35% Precisión)")
            print("5. Cancelar")

            try:
                arma_op = int(input("Selecciona un arma para comprar: "))
                if arma_op == 1 and creditos >= 500:
                    creditos -= 500
                    arma = "Ghost"
                    precision = min(95, precision + 10)
                    print("🔫 ¡Has comprado la Ghost! Precisión: " + str(precision) + "%.")
                elif arma_op == 2 and creditos >= 1600:
                    creditos -= 1600
                    arma = "Spectre"
                    precision = min(95, precision + 15)
                    print("🔫 ¡Has comprado la Spectre! Precisión: " + str(precision) + "%.")
                elif arma_op == 3 and creditos >= 2900:
                    creditos -= 2900
                    arma = "Vandal"
                    precision = min(95, precision + 25)
                    print("🔫 ¡Has comprado la Vandal! Precisión: " + str(precision) + "%.")
                elif arma_op == 4 and creditos >= 4700:
                    creditos -= 4700
                    arma = "Operator"
                    precision = min(95, precision + 35)
                    print("🔫 ¡Has comprado el Operator! Precisión: " + str(precision) + "%.")
                elif arma_op == 5:
                    print("Compra cancelada.")
                else:
                    print("❌ Créditos insuficientes para comprar esta arma.")
            except ValueError:
                print(">> Opción de tienda inválida.")

        elif opcion == 3:
            if creditos >= 200:
                if precision < 95:
                    creditos -= 200
                    precision = min(95, precision + 5)
                    print("")
                    print("🎯 Sesión en The Range completada.")
                    print("   Precisión aumentada a " + str(precision) + "%.")
                    print("   Créditos restantes: $" + str(creditos))
                else:
                    print("")
                    print("[!] Ya alcanzaste la precisión máxima de tiro (95%).")
            else:
                print("")
                print("[!] No tienes suficientes créditos para entrar a The Range ($200).")

        elif opcion == 4:
            print("")
            print("================ PERFIL RADIANT ================")
            print("Jugador:       " + jugador)
            print("Agente:        " + agente)
            print("Rango:         " + rango)
            print("Arma Actual:   " + arma)
            print("Precisión:     " + str(precision) + " %")
            print("Kills Totales: " + str(kills))
            print("Créditos:      $" + str(creditos))
            print("================================================")

        elif opcion == 5:
            print("")
            print("¡Sesión cerrada! Gracias por jugar Valorant Console, " + jugador + ".")

        else:
            print("")
            print(">> Opción no reconocida. Intenta de nuevo.")

if __name__ == '__main__':
    main()`,
    java: `import java.util.Scanner;
import java.util.Random;

public class ValorantConsole {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rng = new Random();

        System.out.println("================================================");
        System.out.println("            VALORANT CONSOLE EDITION            ");
        System.out.println("================================================");

        // 1. Datos iniciales
        System.out.print("Ingresa tu nombre de jugador: ");
        String jugador = sc.nextLine();

        System.out.print("Elige tu agente favorito (Jett, Reyna, Sova, etc.): ");
        String agente = sc.nextLine();

        // 2. Variables de estado
        int creditos = 800;
        int kills = 0;
        int precision = 50;
        String rango = "Hierro";
        String arma = "Classic";
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 5) {
            // Recálculo automático de rango
            if (kills >= 25) {
                rango = "Oro";
            } else if (kills >= 12) {
                rango = "Plata";
            } else if (kills >= 5) {
                rango = "Bronce";
            } else {
                rango = "Hierro";
            }

            System.out.println("");
            System.out.println("---------------- MENÚ PRINCIPAL ----------------");
            System.out.println("1. Jugar 5 Rondas Competitivas");
            System.out.println("2. Comprar Arma en la Tienda");
            System.out.println("3. Entrenar en The Range (+5% Precisión, Coste: $200)");
            System.out.println("4. Ver Perfil y Rango");
            System.out.println("5. Salir del Juego");
            System.out.print("Elige una opción: ");

            if (!sc.hasNextInt()) {
                System.out.println(">> Opción inválida. Ingresa un número.");
                sc.next();
                continue;
            }
            opcion = sc.nextInt();

            if (opcion == 1) {
                System.out.println("");
                System.out.println("--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---");
                int victoriasPartida = 0;

                // Bucle for para las 5 rondas
                for (int ronda = 1; ronda <= 5; ronda++) {
                    int tiro = rng.nextInt(100) + 1; // 1 a 100

                    if (tiro <= precision) {
                        victoriasPartida++;
                        kills += 2;
                        creditos += 3000;
                        System.out.println("Ronda " + ronda + ": ¡Victoria de ronda! +2 Kills y +$3000 créditos.");
                    } else {
                        kills += 1;
                        creditos += 1900;
                        System.out.println("Ronda " + ronda + ": Derrota ajustada. +1 Kill y +$1900 de consolación.");
                    }
                }

                System.out.println("");
                System.out.println("Resultado final: " + victoriasPartida + " rondas ganadas de 5.");
                System.out.println("Kills totales acumulados: " + kills);
                System.out.println("Créditos actuales: $" + creditos);
            } else if (opcion == 2) {
                System.out.println("");
                System.out.println("=============== TIENDA DE ARMAS ===============");
                System.out.println("Tus Créditos: $" + creditos);
                System.out.println("1. Ghost     - $500   (+10% Precisión)");
                System.out.println("2. Spectre   - $1600  (+15% Precisión)");
                System.out.println("3. Vandal    - $2900  (+25% Precisión)");
                System.out.println("4. Operator  - $4700  (+35% Precisión)");
                System.out.println("5. Cancelar");
                System.out.print("Selecciona un arma para comprar: ");

                if (sc.hasNextInt()) {
                    int armaOp = sc.nextInt();
                    if (armaOp == 1 && creditos >= 500) {
                        creditos -= 500;
                        arma = "Ghost";
                        precision = Math.min(95, precision + 10);
                        System.out.println("🔫 ¡Has comprado la Ghost! Precisión aumentada a " + precision + "%.");
                    } else if (armaOp == 2 && creditos >= 1600) {
                        creditos -= 1600;
                        arma = "Spectre";
                        precision = Math.min(95, precision + 15);
                        System.out.println("🔫 ¡Has comprado la Spectre! Precisión aumentada a " + precision + "%.");
                    } else if (armaOp == 3 && creditos >= 2900) {
                        creditos -= 2900;
                        arma = "Vandal";
                        precision = Math.min(95, precision + 25);
                        System.out.println("🔫 ¡Has comprado la Vandal! Precisión aumentada a " + precision + "%.");
                    } else if (armaOp == 4 && creditos >= 4700) {
                        creditos -= 4700;
                        arma = "Operator";
                        precision = Math.min(95, precision + 35);
                        System.out.println("🔫 ¡Has comprado el Operator! Precisión aumentada a " + precision + "%.");
                    } else if (armaOp == 5) {
                        System.out.println("Compra cancelada.");
                    } else {
                        System.out.println("❌ Créditos insuficientes para comprar esta arma.");
                    }
                }
            } else if (opcion == 3) {
                if (creditos >= 200) {
                    if (precision < 95) {
                        creditos -= 200;
                        precision = Math.Min(95, precision + 5);
                        System.out.println("");
                        System.out.println("🎯 Sesión en The Range completada con éxito.");
                        System.out.println("   Precisión aumentada a " + precision + "%.");
                        System.out.println("   Créditos restantes: $" + creditos);
                    } else {
                        System.out.println("");
                        System.out.println("[!] Ya alcanzaste la precisión máxima de tiro (95%).");
                    }
                } else {
                    System.out.println("");
                    System.out.println("[!] No tienes suficientes créditos para entrar a The Range ($200).");
                }
            } else if (opcion == 4) {
                System.out.println("");
                System.out.println("================ PERFIL RADIANT ================");
                System.out.println("Jugador:       " + jugador);
                System.out.println("Agente:        " + agente);
                System.out.println("Rango:         " + rango);
                System.out.println("Arma Actual:   " + arma);
                System.out.println("Precisión:     " + precision + " %");
                System.out.println("Kills Totales: " + kills);
                System.out.println("Créditos:      $" + creditos);
                System.out.println("================================================");
            } else if (opcion == 5) {
                System.out.println("");
                System.out.println("¡Sesión cerrada! Gracias por jugar Valorant Console, " + jugador + ".");
            } else {
                System.out.println("");
                System.out.println(">> Opción no reconocida. Intenta de nuevo.");
            }
        }
    }
}`,
    cpp: `#include <iostream>
#include <string>
#include <cstdlib>
#include <algorithm>
using namespace std;

int main() {
    cout << "================================================" << endl;
    cout << "            VALORANT CONSOLE EDITION            " << endl;
    cout << "================================================" << endl;

    // 1. Datos iniciales
    string jugador;
    cout << "Ingresa tu nombre de jugador: ";
    cin >> jugador;

    string agente;
    cout << "Elige tu agente favorito (Jett, Reyna, Sova, etc.): ";
    cin >> agente;

    // 2. Variables de estado
    int creditos = 800;
    int kills = 0;
    int precision = 50;
    string rango = "Hierro";
    string arma = "Classic";
    int opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion != 5) {
        // Recálculo automático de rango
        if (kills >= 25) {
            rango = "Oro";
        } else if (kills >= 12) {
            rango = "Plata";
        } else if (kills >= 5) {
            rango = "Bronce";
        } else {
            rango = "Hierro";
        }

        cout << endl;
        cout << "---------------- MENÚ PRINCIPAL ----------------" << endl;
        cout << "1. Jugar 5 Rondas Competitivas" << endl;
        cout << "2. Comprar Arma en la Tienda" << endl;
        cout << "3. Entrenar en The Range (+5% Precision, Coste: $200)" << endl;
        cout << "4. Ver Perfil y Rango" << endl;
        cout << "5. Salir del Juego" << endl;
        cout << "Elige una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            cout << endl;
            cout << "--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---" << endl;
            int victoriasPartida = 0;

            // Bucle for para las 5 rondas
            for (int ronda = 1; ronda <= 5; ronda++) {
                int tiro = (rand() % 100) + 1; // 1 a 100

                if (tiro <= precision) {
                    victoriasPartida++;
                    kills += 2;
                    creditos += 3000;
                    cout << "Ronda " << ronda << ": ¡Victoria de ronda! +2 Kills y +$3000 creditos." << endl;
                } else {
                    kills += 1;
                    creditos += 1900;
                    cout << "Ronda " << ronda << ": Derrota ajustada. +1 Kill y +$1900 de consolacion." << endl;
                }
            }

            cout << endl;
            cout << "Resultado final: " << victoriasPartida << " rondas ganadas de 5." << endl;
            cout << "Kills totales acumulados: " << kills << endl;
            cout << "Creditos actuales: $" << creditos << endl;
        } else if (opcion == 2) {
            cout << endl;
            cout << "=============== TIENDA DE ARMAS ===============" << endl;
            cout << "Tus Creditos: $" << creditos << endl;
            cout << "1. Ghost     - $500   (+10% Precision)" << endl;
            cout << "2. Spectre   - $1600  (+15% Precision)" << endl;
            cout << "3. Vandal    - $2900  (+25% Precision)" << endl;
            cout << "4. Operator  - $4700  (+35% Precision)" << endl;
            cout << "5. Cancelar" << endl;
            cout << "Selecciona un arma para comprar: ";

            int armaOp;
            cin >> armaOp;

            if (armaOp == 1 && creditos >= 500) {
                creditos -= 500;
                arma = "Ghost";
                precision = min(95, precision + 10);
                cout << "🔫 ¡Has comprado la Ghost! Precision aumentada a " << precision << "%." << endl;
            } else if (armaOp == 2 && creditos >= 1600) {
                creditos -= 1600;
                arma = "Spectre";
                precision = min(95, precision + 15);
                cout << "🔫 ¡Has comprado la Spectre! Precision aumentada a " << precision << "%." << endl;
            } else if (armaOp == 3 && creditos >= 2900) {
                creditos -= 2900;
                arma = "Vandal";
                precision = min(95, precision + 25);
                cout << "🔫 ¡Has comprado la Vandal! Precision aumentada a " << precision << "%." << endl;
            } else if (armaOp == 4 && creditos >= 4700) {
                creditos -= 4700;
                arma = "Operator";
                precision = min(95, precision + 35);
                cout << "🔫 ¡Has comprado el Operator! Precision aumentada a " << precision << "%." << endl;
            } else if (armaOp == 5) {
                cout << "Compra cancelada." << endl;
            } else {
                cout << "❌ Creditos insuficientes para comprar esta arma." << endl;
            }
        } else if (opcion == 3) {
            if (creditos >= 200) {
                if (precision < 95) {
                    creditos -= 200;
                    precision = min(95, precision + 5);
                    cout << endl;
                    cout << "🎯 Sesion en The Range completada con exito." << endl;
                    cout << "   Precision aumentada a " << precision << "%." << endl;
                    cout << "   Creditos restantes: $" << creditos << endl;
                } else {
                    cout << endl;
                    cout << "[!] Ya alcanzaste la precision maxima de tiro (95%)." << endl;
                }
            } else {
                cout << endl;
                cout << "[!] No tienes suficientes creditos para entrar a The Range ($200)." << endl;
            }
        } else if (opcion == 4) {
            cout << endl;
            cout << "================ PERFIL RADIANT ================" << endl;
            cout << "Jugador:       " << jugador << endl;
            cout << "Agente:        " << agente << endl;
            cout << "Rango:         " << rango << endl;
            cout << "Arma Actual:   " << arma << endl;
            cout << "Precision:     " << precision << " %" << endl;
            cout << "Kills Totales: " << kills << endl;
            cout << "Creditos:      $" << creditos << endl;
            cout << "================================================" << endl;
        } else if (opcion == 5) {
            cout << endl;
            cout << "¡Sesion cerrada! Gracias por jugar Valorant Console, " + jugador + "." << endl;
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
    console.log("            VALORANT CONSOLE EDITION            ");
    console.log("================================================");

    // 1. Datos iniciales
    const jugador = await ask("Ingresa tu nombre de jugador: ");
    const agente = await ask("Elige tu agente favorito (Jett, Reyna, Sova, etc.): ");

    // 2. Variables de estado
    let creditos = 800;
    let kills = 0;
    let precision = 50;
    let rango = "Hierro";
    let arma = "Classic";
    let opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion !== 5) {
        if (kills >= 25) {
            rango = "Oro";
        } else if (kills >= 12) {
            rango = "Plata";
        } else if (kills >= 5) {
            rango = "Bronce";
        } else {
            rango = "Hierro";
        }

        console.log("");
        console.log("---------------- MENÚ PRINCIPAL ----------------");
        console.log("1. Jugar 5 Rondas Competitivas");
        console.log("2. Comprar Arma en la Tienda");
        console.log("3. Entrenar en The Range (+5% Precisión, Coste: $200)");
        console.log("4. Ver Perfil y Rango");
        console.log("5. Salir del Juego");

        const resp = await ask("Elige una opción: ");
        opcion = parseInt(resp, 10);

        if (isNaN(opcion)) {
            console.log(">> Opción inválida. Ingresa un número.");
            continue;
        }

        if (opcion === 1) {
            console.log("");
            console.log("--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---");
            let victoriasPartida = 0;

            for (let ronda = 1; ronda <= 5; ronda++) {
                const tiro = Math.floor(Math.random() * 100) + 1;

                if (tiro <= precision) {
                    victoriasPartida++;
                    kills += 2;
                    creditos += 3000;
                    console.log("Ronda " + ronda + ": ¡Victoria de ronda! +2 Kills y +$3000 créditos.");
                } else {
                    kills += 1;
                    creditos += 1900;
                    console.log("Ronda " + ronda + ": Derrota ajustada. +1 Kill y +$1900 de consolación.");
                }
            }

            console.log("");
            console.log("Resultado final: " + victoriasPartida + " rondas ganadas de 5.");
            console.log("Kills totales acumulados: " + kills);
            console.log("Créditos actuales: $" + creditos);
        } else if (opcion === 2) {
            console.log("");
            console.log("=============== TIENDA DE ARMAS ===============");
            console.log("Tus Créditos: $" + creditos);
            console.log("1. Ghost     - $500   (+10% Precisión)");
            console.log("2. Spectre   - $1600  (+15% Precisión)");
            console.log("3. Vandal    - $2900  (+25% Precisión)");
            console.log("4. Operator  - $4700  (+35% Precisión)");
            console.log("5. Cancelar");

            const armaResp = await ask("Selecciona un arma para comprar: ");
            const armaOp = parseInt(armaResp, 10);

            if (armaOp === 1 && creditos >= 500) {
                creditos -= 500;
                arma = "Ghost";
                precision = Math.min(95, precision + 10);
                console.log("🔫 ¡Has comprado la Ghost! Precisión aumentada a " + precision + "%.");
            } else if (armaOp === 2 && creditos >= 1600) {
                creditos -= 1600;
                arma = "Spectre";
                precision = Math.min(95, precision + 15);
                console.log("🔫 ¡Has comprado la Spectre! Precisión aumentada a " + precision + "%.");
            } else if (armaOp === 3 && creditos >= 2900) {
                creditos -= 2900;
                arma = "Vandal";
                precision = Math.min(95, precision + 25);
                console.log("🔫 ¡Has comprado la Vandal! Precisión aumentada a " + precision + "%.");
            } else if (armaOp === 4 && creditos >= 4700) {
                creditos -= 4700;
                arma = "Operator";
                precision = Math.min(95, precision + 35);
                console.log("🔫 ¡Has comprado el Operator! Precisión aumentada a " + precision + "%.");
            } else if (armaOp === 5) {
                console.log("Compra cancelada.");
            } else {
                console.log("❌ Créditos insuficientes para comprar esta arma.");
            }
        } else if (opcion === 3) {
            if (creditos >= 200) {
                if (precision < 95) {
                    creditos -= 200;
                    precision = Math.min(95, precision + 5);
                    console.log("");
                    console.log("🎯 Sesión en The Range completada con éxito.");
                    console.log("   Precisión aumentada a " + precision + "%.");
                    console.log("   Créditos restantes: $" + creditos);
                } else {
                    console.log("");
                    console.log("[!] Ya alcanzaste la precisión máxima de tiro (95%).");
                }
            } else {
                console.log("");
                console.log("[!] No tienes suficientes créditos para entrar a The Range ($200).");
            }
        } else if (opcion === 4) {
            console.log("");
            console.log("================ PERFIL RADIANT ================");
            console.log("Jugador:       " + jugador);
            console.log("Agente:        " + agente);
            console.log("Rango:         " + rango);
            console.log("Arma Actual:   " + arma);
            console.log("Precisión:     " + precision + " %");
            console.log("Kills Totales: " + kills);
            console.log("Créditos:      $" + creditos);
            console.log("================================================");
        } else if (opcion === 5) {
            console.log("");
            console.log("¡Sesión cerrada! Gracias por jugar Valorant Console, " + jugador + ".");
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
echo "            VALORANT CONSOLE EDITION            \\n";
echo "================================================\\n";

// 1. Datos iniciales
echo "Ingresa tu nombre de jugador: ";
$jugador = trim(fgets(STDIN));

echo "Elige tu agente favorito (Jett, Reyna, Sova, etc.): ";
$agente = trim(fgets(STDIN));

// 2. Variables de estado
$creditos = 800;
$kills = 0;
$precision = 50;
$rango = "Hierro";
$arma = "Classic";
$opcion = 0;

// 3. Bucle interactivo principal
while ($opcion != 5) {
    // Recálculo automático de rango
    if ($kills >= 25) {
        $rango = "Oro";
    } else if ($kills >= 12) {
        $rango = "Plata";
    } else if ($kills >= 5) {
        $rango = "Bronce";
    } else {
        $rango = "Hierro";
    }

    echo "\\n";
    echo "---------------- MENÚ PRINCIPAL ----------------\\n";
    echo "1. Jugar 5 Rondas Competitivas\\n";
    echo "2. Comprar Arma en la Tienda\\n";
    echo "3. Entrenar en The Range (+5% Precisión, Coste: $200)\\n";
    echo "4. Ver Perfil y Rango\\n";
    echo "5. Salir del Juego\\n";
    echo "Elige una opción: ";

    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        echo "\\n";
        echo "--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---\\n";
        $victoriasPartida = 0;

        for ($ronda = 1; $ronda <= 5; $ronda++) {
            $tiro = rand(1, 100);

            if ($tiro <= $precision) {
                $victoriasPartida++;
                $kills += 2;
                $creditos += 3000;
                echo "Ronda " . $ronda . ": ¡Victoria de ronda! +2 Kills y +$3000 créditos.\\n";
            } else {
                $kills += 1;
                $creditos += 1900;
                echo "Ronda " . $ronda . ": Derrota ajustada. +1 Kill y +$1900 de consolación.\\n";
            }
        }

        echo "\\n";
        echo "Resultado final: " . $victoriasPartida . " rondas ganadas de 5.\\n";
        echo "Kills totales acumulados: " . $kills . "\\n";
        echo "Créditos actuales: $" . $creditos . "\\n";
    } else if ($opcion == 2) {
        echo "\\n";
        echo "=============== TIENDA DE ARMAS ===============\\n";
        echo "Tus Créditos: $" . $creditos . "\\n";
        echo "1. Ghost     - $500   (+10% Precisión)\\n";
        echo "2. Spectre   - $1600  (+15% Precisión)\\n";
        echo "3. Vandal    - $2900  (+25% Precisión)\\n";
        echo "4. Operator  - $4700  (+35% Precisión)\\n";
        echo "5. Cancelar\\n";
        echo "Selecciona un arma para comprar: ";

        $armaOp = intval(trim(fgets(STDIN)));

        if ($armaOp == 1 && $creditos >= 500) {
            $creditos -= 500;
            $arma = "Ghost";
            $precision = min(95, $precision + 10);
            echo "🔫 ¡Has comprado la Ghost! Precisión aumentada a " . $precision . "%.\\n";
        } else if ($armaOp == 2 && $creditos >= 1600) {
            $creditos -= 1600;
            $arma = "Spectre";
            $precision = min(95, $precision + 15);
            echo "🔫 ¡Has comprado la Spectre! Precisión aumentada a " . $precision . "%.\\n";
        } else if ($armaOp == 3 && $creditos >= 2900) {
            $creditos -= 2900;
            $arma = "Vandal";
            $precision = min(95, $precision + 25);
            echo "🔫 ¡Has comprado la Vandal! Precisión aumentada a " . $precision . "%.\\n";
        } else if ($armaOp == 4 && $creditos >= 4700) {
            $creditos -= 4700;
            $arma = "Operator";
            $precision = min(95, $precision + 35);
            echo "🔫 ¡Has comprado el Operator! Precisión aumentada a " . $precision . "%.\\n";
        } else if ($armaOp == 5) {
            echo "Compra cancelada.\\n";
        } else {
            echo "❌ Créditos insuficientes para comprar esta arma.\\n";
        }
    } else if ($opcion == 3) {
        if ($creditos >= 200) {
            if ($precision < 95) {
                $creditos -= 200;
                $precision = min(95, $precision + 5);
                echo "\\n";
                echo "🎯 Sesión en The Range completada con éxito.\\n";
                echo "   Precisión aumentada a " . $precision . "%.\\n";
                echo "   Créditos restantes: $" . $creditos . "\\n";
            } else {
                echo "\\n";
                echo "[!] Ya alcanzaste la precisión máxima de tiro (95%).\\n";
            }
        } else {
            echo "\\n";
            echo "[!] No tienes suficientes créditos para entrar a The Range ($200).\\n";
        }
    } else if ($opcion == 4) {
        echo "\\n";
        echo "================ PERFIL RADIANT ================\\n";
        echo "Jugador:       " . $jugador . "\\n";
        echo "Agente:        " . $agente . "\\n";
        echo "Rango:         " . $rango . "\\n";
        echo "Arma Actual:   " . $arma . "\\n";
        echo "Precisión:     " . $precision . " %\\n";
        echo "Kills Totales: " . $kills . "\\n";
        echo "Créditos:      $" . $creditos . "\\n";
        echo "================================================\\n";
    } else if ($opcion == 5) {
        echo "\\n";
        echo "¡Sesión cerrada! Gracias por jugar Valorant Console, " . $jugador . ".\\n";
    } else {
        echo "\\n";
        echo ">> Opción no reconocida. Intenta de nuevo.\\n";
    }
}
?>`,
    pseint: `Algoritmo ValorantConsole
    // 1. Declaración de variables
    Definir jugador, agente, rango, arma Como Cadena
    Definir creditos, kills, precision, opcion, ronda, tiro, victoriasPartida, armaOp Como Entero
    
    Escribir "================================================"
    Escribir "            VALORANT CONSOLE EDITION            "
    Escribir "================================================"
    
    Escribir "Ingresa tu nombre de jugador:"
    Leer jugador
    
    Escribir "Elige tu agente favorito (Jett, Reyna, Sova, etc.):"
    Leer agente
    
    // 2. Inicialización de variables con =
    creditos = 800
    kills = 0
    precision = 50
    rango = "Hierro"
    arma = "Classic"
    opcion = 0
    
    // 3. Bucle interactivo principal
    Mientras opcion <> 5 Hacer
        // Recálculo automático de rango
        Si kills >= 25 Entonces
            rango = "Oro"
        SiNo
            Si kills >= 12 Entonces
                rango = "Plata"
            SiNo
                Si kills >= 5 Entonces
                    rango = "Bronce"
                SiNo
                    rango = "Hierro"
                FinSi
            FinSi
        FinSi
        
        Escribir ""
        Escribir "---------------- MENÚ PRINCIPAL ----------------"
        Escribir "1. Jugar 5 Rondas Competitivas"
        Escribir "2. Comprar Arma en la Tienda"
        Escribir "3. Entrenar en The Range (+5% Precision, Coste: $200)"
        Escribir "4. Ver Perfil y Rango"
        Escribir "5. Salir del Juego"
        Escribir "Elige una opcion:"
        Leer opcion
        
        Segun opcion Hacer
            1:
                Escribir ""
                Escribir "--- INICIANDO SERIE DE 5 RONDAS COMPETITIVAS ---"
                victoriasPartida = 0
                
                // Bucle para las 5 rondas
                Para ronda = 1 Hasta 5 Con Paso 1 Hacer
                    tiro = Azar(100) + 1
                    
                    Si tiro <= precision Entonces
                        victoriasPartida = victoriasPartida + 1
                        kills = kills + 2
                        creditos = creditos + 3000
                        Escribir "Ronda ", ronda, ": ¡Victoria de ronda! +2 Kills y +$3000 creditos."
                    SiNo
                        kills = kills + 1
                        creditos = creditos + 1900
                        Escribir "Ronda ", ronda, ": Derrota ajustada. +1 Kill y +$1900 de consolacion."
                    FinSi
                FinPara
                
                Escribir ""
                Escribir "Resultado final: ", victoriasPartida, " rondas ganadas de 5."
                Escribir "Kills totales acumulados: ", kills
                Escribir "Creditos actuales: $", creditos
            2:
                Escribir ""
                Escribir "=============== TIENDA DE ARMAS ==============="
                Escribir "Tus Creditos: $", creditos
                Escribir "1. Ghost     - $500   (+10% Precision)"
                Escribir "2. Spectre   - $1600  (+15% Precision)"
                Escribir "3. Vandal    - $2900  (+25% Precision)"
                Escribir "4. Operator  - $4700  (+35% Precision)"
                Escribir "5. Cancelar"
                Escribir "Selecciona un arma para comprar:"
                Leer armaOp
                
                Si armaOp = 1 Y creditos >= 500 Entonces
                    creditos = creditos - 500
                    arma = "Ghost"
                    precision = precision + 10
                    Si precision > 95 Entonces precision = 95; FinSi
                    Escribir "🔫 ¡Has comprado la Ghost! Precision: ", precision, "%."
                SiNo
                    Si armaOp = 2 Y creditos >= 1600 Entonces
                        creditos = creditos - 1600
                        arma = "Spectre"
                        precision = precision + 15
                        Si precision > 95 Entonces precision = 95; FinSi
                        Escribir "🔫 ¡Has comprado la Spectre! Precision: ", precision, "%."
                    SiNo
                        Si armaOp = 3 Y creditos >= 2900 Entonces
                            creditos = creditos - 2900
                            arma = "Vandal"
                            precision = precision + 25
                            Si precision > 95 Entonces precision = 95; FinSi
                            Escribir "🔫 ¡Has comprado la Vandal! Precision: ", precision, "%."
                        SiNo
                            Si armaOp = 4 Y creditos >= 4700 Entonces
                                creditos = creditos - 4700
                                arma = "Operator"
                                precision = precision + 35
                                Si precision > 95 Entonces precision = 95; FinSi
                                Escribir "🔫 ¡Has comprado el Operator! Precision: ", precision, "%."
                            SiNo
                                Si armaOp = 5 Entonces
                                    Escribir "Compra cancelada."
                                SiNo
                                    Escribir "❌ Creditos insuficientes o seleccion invalida."
                                FinSi
                            FinSi
                        FinSi
                    FinSi
                FinSi
            3:
                Si creditos >= 200 Entonces
                    Si precision < 95 Entonces
                        creditos = creditos - 200
                        precision = precision + 5
                        Si precision > 95 Entonces precision = 95; FinSi
                        Escribir ""
                        Escribir "🎯 Sesion en The Range completada con exito."
                        Escribir "   Precision aumentada a ", precision, "%."
                        Escribir "   Creditos restantes: $", creditos
                    SiNo
                        Escribir ""
                        Escribir "[!] Ya alcanzaste la precision maxima de tiro (95%)."
                    FinSi
                SiNo
                    Escribir ""
                    Escribir "[!] No tienes suficientes creditos para entrar a The Range ($200)."
                FinSi
            4:
                Escribir ""
                Escribir "================ PERFIL RADIANT ================"
                Escribir "Jugador:       ", jugador
                Escribir "Agente:        ", agente
                Escribir "Rango:         ", rango
                Escribir "Arma Actual:   ", arma
                Escribir "Precision:     ", precision, " %"
                Escribir "Kills Totales: ", kills
                Escribir "Creditos:      $", creditos
                Escribir "================================================"
            5:
                Escribir ""
                Escribir "¡Sesion cerrada! Gracias por jugar Valorant Console, ", jugador, "."
            De Otro Modo:
                Escribir ""
                Escribir ">> Opcion no reconocida. Intenta de nuevo."
        FinSegun
    FinMientras
FinAlgoritmo`
  }
};
