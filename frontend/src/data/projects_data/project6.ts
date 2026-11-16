import type { GameProject } from '../gameProjectsData';

export const project6Arcade: GameProject = {
  id: 6,
  slug: 'carrera-arcade',
  number: '06',
  title: 'Carrera Arcade Nitro Grand Prix',
  subtitle: 'Simulador de velocidad, telemetría y gestión de combustible',
  icon: '🏎️',
  accentColor: '#ef4444',
  badge: 'PROYECTO 6 · ARCADE',
  difficulty: 'Intermedio',
  story: 'El semáforo de salida parpadea en la parrilla del Nitro Grand Prix. Como piloto estelar, debes controlar la aceleración de tu bólido, frenar en curvas cerradas para evitar choques y completar las 3 vueltas antes de quedarte sin combustible.',
  objective: 'Programar un simulador de carreras con bucles for de vueltas, consumo y recarga de combustible con if/else, límites de velocidad máxima y control de accidentes fatales.',
  initialInputs: [
    'Nombre del piloto (texto)',
    'Modelo del auto (Ferrari, Red Bull, Porsche, etc.)'
  ],
  variables: [
    { name: 'velocidad', type: 'int', initialValue: '0', description: 'Velocidad actual en km/h' },
    { name: 'combustible', type: 'int', initialValue: '100', description: 'Porcentaje de gasolina restante (0 a 100%)' },
    { name: 'vueltasCompletadas', type: 'int', initialValue: '0', description: 'Vueltas al circuito completadas' },
    { name: 'vueltasMeta', type: 'int', initialValue: '3', description: 'Vueltas requeridas para ganar el trofeo' }
  ],
  menuOptions: [
    {
      option: '1',
      title: 'Acelerar a Fondo (+30 km/h)',
      description: 'Aumenta la velocidad en +30 km/h y consume 5% de combustible.',
      logic: 'velocidad += 30; combustible -= 5;'
    },
    {
      option: '2',
      title: 'Frenar (-20 km/h)',
      description: 'Reduce la velocidad de forma controlada en -20 km/h (Mínimo 0).',
      logic: 'velocidad = Math.Max(0, velocidad - 20);'
    },
    {
      option: '3',
      title: 'Correr Vuelta en Circuito',
      description: 'Bucle for que simula el recorrido de 3 sectores. Si velocidad > 200 km/h hay riesgo de choque fatal.',
      logic: 'for (int sector = 1; sector <= 3; sector++). Consume 15% combustible. Si vel > 200: choque = GAME OVER. Si vel > 50: +1 Vuelta.'
    },
    {
      option: '4',
      title: 'Pit Stop / Recargar Combustible',
      description: 'Detiene el auto (velocidad = 0) y llena el tanque de combustible al 100%.',
      logic: 'velocidad = 0; combustible = 100;'
    },
    {
      option: '5',
      title: 'Ver Telemetría en Boxes',
      description: 'Muestra Piloto, Auto, Velocidad actual, Combustible y Progreso de vueltas.',
      logic: 'Imprime el panel de instrumentos del auto.'
    },
    {
      option: '6',
      title: 'Abandonar Carrera / Salir',
      description: 'Retira el auto de la competición y finaliza.',
      logic: 'opcion = 6; Finaliza el bucle while.'
    }
  ],
  rules: [
    'Si la velocidad supera los 200 km/h al correr una vuelta en el circuito: el auto sufre un despiste fatal ("¡CHOQUE! GAME OVER").',
    'Si el combustible llega a 0% o menos: el motor se apaga y quedas varado ("GAME OVER").',
    'Al completar 3 vueltas al circuito: el piloto cruza la línea de meta y se consagra campeón.'
  ],
  extraChallenges: [
    'Sistema de Nitro: Botón de óxido nitroso (+60 km/h con consumo de 20% combustible).',
    'Desgaste de Neumáticos: Neumáticos blandos, medios o duros que afecten la adherencia.',
    'Tiempo de Vuelta: Cronometrar los segundos de cada sector y registrar vuelta rápida.'
  ],
  steps: [
    { id: 'p6_s1', title: 'Inicializar Variables', desc: 'Definir velocidad=0, combustible=100, vueltas=0, vueltasMeta=3.' },
    { id: 'p6_s2', title: 'Menú Interactivo while', desc: 'Crear el menú de 6 opciones imprimiendo cada una en línea independiente.' },
    { id: 'p6_s3', title: 'Bucle for de Sectores de Vuelta', desc: 'Simular los 3 sectores evaluando velocidad, consumo y riesgo de colisión.' },
    { id: 'p6_s4', title: 'Condiciones de Victoria y Choque', desc: 'Verificar vueltas >= 3 (Victoria) o velocidad > 200 (Choque).' }
  ],
  consolePreview: `================================================
          CARRERA ARCADE NITRO GRAND PRIX       
================================================
Piloto: Hamilton | Auto: Mercedes F1

---------------- PANEL DE CONTROL ----------------
1. Acelerar (+30 km/h)
2. Frenar (-20 km/h)
3. Correr vuelta en circuito (Simular 3 sectores)
4. Entrar a Boxes (Recargar combustible al 100%)
5. Ver telemetría
6. Abandonar carrera
Elige una opción: 1

[🏎️] Has acelerado a fondo.
    Velocidad actual: 30 km/h
    Combustible restante: 95 %`,
  solutions: {
    csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("          CARRERA ARCADE NITRO GRAND PRIX       ");
        Console.WriteLine("================================================");

        // 1. Datos iniciales del piloto y monoplaza
        Console.Write("Nombre del piloto: ");
        string piloto = Console.ReadLine();

        Console.Write("Modelo del vehículo (Ferrari, Red Bull, etc.): ");
        string auto = Console.ReadLine();

        // 2. Variables de telemetría y física
        int velocidad = 0;
        int combustible = 100;
        int vueltas = 0;
        int vueltasMeta = 3;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 6 && combustible > 0 && vueltas < vueltasMeta)
        {
            Console.WriteLine("");
            Console.WriteLine("---------------- PANEL DE CONTROL ----------------");
            Console.WriteLine("1. Acelerar (+30 km/h, -5% Combustible)");
            Console.WriteLine("2. Frenar (-20 km/h)");
            Console.WriteLine("3. Correr vuelta en circuito (Simular 3 sectores)");
            Console.WriteLine("4. Entrar a Boxes (Recargar combustible al 100%)");
            Console.WriteLine("5. Ver telemetría");
            Console.WriteLine("6. Abandonar carrera");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida. Ingresa un número del 1 al 6.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    velocidad += 30;
                    combustible -= 5;
                    Console.WriteLine("");
                    Console.WriteLine("[🏎️] ¡Aceleraste a fondo!");
                    Console.WriteLine("    Velocidad actual: " + velocidad + " km/h.");
                    Console.WriteLine("    Combustible restante: " + combustible + " %.");
                    break;

                case 2:
                    velocidad = Math.Max(0, velocidad - 20);
                    Console.WriteLine("");
                    Console.WriteLine("[🛑] Has pisado el freno.");
                    Console.WriteLine("    Velocidad reducida a: " + velocidad + " km/h.");
                    break;

                case 3:
                    if (velocidad < 50)
                    {
                        Console.WriteLine("");
                        Console.WriteLine("[!] El auto va demasiado lento (Mínimo 50 km/h para completar una vuelta). ¡Acelera!");
                        break;
                    }

                    Console.WriteLine("");
                    Console.WriteLine("--- ¡CORRIENDO VUELTA " + (vueltas + 1) + " EN EL CIRCUITO! ---");
                    combustible -= 15;
                    bool choco = false;

                    // Bucle for para los 3 sectores del circuito
                    for (int sector = 1; sector <= 3; sector++)
                    {
                        Console.WriteLine("Sector " + sector + ": Trazando curva a " + velocidad + " km/h...");

                        // Validación de velocidad excesiva peligrosa
                        if (velocidad > 200)
                        {
                            Console.WriteLine("💥 ¡¡¡CHOQUE FATAL EN LA CURVA " + sector + "!!!");
                            Console.WriteLine("   Entraste a más de 200 km/h (" + velocidad + " km/h) y perdiste el control.");
                            choco = true;
                            break;
                        }
                    }

                    if (choco)
                    {
                        combustible = 0; // Terminar juego por choque
                        break;
                    }

                    vueltas++;
                    Console.WriteLine("");
                    Console.WriteLine("🏁 ¡Vuelta " + vueltas + " completada con éxito!");
                    Console.WriteLine("   Combustible restante: " + combustible + " %.");

                    if (vueltas >= vueltasMeta)
                    {
                        Console.WriteLine("");
                        Console.WriteLine("🏆 ¡BANDERA A CUADROS! ¡" + piloto + " ha ganado el Nitro Grand Prix!");
                    }
                    break;

                case 4:
                    velocidad = 0;
                    combustible = 100;
                    Console.WriteLine("");
                    Console.WriteLine("⛽ ¡Pit Stop completado en boxes!");
                    Console.WriteLine("   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h).");
                    break;

                case 5:
                    Console.WriteLine("");
                    Console.WriteLine("================ TELEMETRÍA EN BOXES ================");
                    Console.WriteLine("Piloto:             " + piloto);
                    Console.WriteLine("Vehículo:           " + auto);
                    Console.WriteLine("Velocidad Actual:   " + velocidad + " km/h");
                    Console.WriteLine("Combustible:        " + combustible + " %");
                    Console.WriteLine("Vueltas:            " + vueltas + " / " + vueltasMeta);
                    Console.WriteLine("======================================================");
                    break;

                case 6:
                    Console.WriteLine("");
                    Console.WriteLine("Te has retirado de la carrera. Gracias por competir, " + piloto + ".");
                    break;

                default:
                    Console.WriteLine("");
                    Console.WriteLine(">> Opción no reconocida. Intenta de nuevo.");
                    break;
            }
        }

        if (combustible <= 0 && vueltas < vueltasMeta)
        {
            Console.WriteLine("");
            Console.WriteLine("☠️ Carrera terminada: Te has quedado sin combustible o destruiste el vehículo. GAME OVER.");
        }
    }
}`,
    python: `def main():
    print("================================================")
    print("          CARRERA ARCADE NITRO GRAND PRIX       ")
    print("================================================")

    # 1. Datos iniciales
    piloto = input("Nombre del piloto: ")
    auto = input("Modelo del vehículo (Ferrari, Red Bull, etc.): ")

    # 2. Variables de telemetría
    velocidad = 0
    combustible = 100
    vueltas = 0
    vueltas_meta = 3
    opcion = 0

    # 3. Bucle interactivo principal
    while opcion != 6 and combustible > 0 and vueltas < vueltas_meta:
        print("")
        print("---------------- PANEL DE CONTROL ----------------")
        print("1. Acelerar (+30 km/h, -5% Combustible)")
        print("2. Frenar (-20 km/h)")
        print("3. Correr vuelta en circuito (Simular 3 sectores)")
        print("4. Entrar a Boxes (Recargar combustible al 100%)")
        print("5. Ver telemetría")
        print("6. Abandonar carrera")

        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida. Ingresa un número.")
            continue

        if opcion == 1:
            velocidad += 30
            combustible -= 5
            print("")
            print("[🏎️] ¡Aceleraste a fondo!")
            print("    Velocidad actual: " + str(velocidad) + " km/h.")
            print("    Combustible restante: " + str(combustible) + " %.")

        elif opcion == 2:
            velocidad = max(0, velocidad - 20)
            print("")
            print("[🛑] Has pisado el freno.")
            print("    Velocidad reducida a: " + str(velocidad) + " km/h.")

        elif opcion == 3:
            if velocidad < 50:
                print("")
                print("[!] El auto va demasiado lento (Mínimo 50 km/h para completar vuelta). ¡Acelera!")
                continue

            print("")
            print("--- ¡CORRIENDO VUELTA " + str(vueltas + 1) + " EN EL CIRCUITO! ---")
            combustible -= 15
            choco = False

            # Bucle for para los 3 sectores
            for sector in range(1, 4):
                print("Sector " + str(sector) + ": Trazando curva a " + str(velocidad) + " km/h...")

                if velocidad > 200:
                    print("💥 ¡¡¡CHOQUE FATAL EN LA CURVA " + str(sector) + "!!!")
                    print("   Entraste a más de 200 km/h (" + str(velocidad) + " km/h) y perdiste el control.")
                    choco = True
                    break

            if choco:
                combustible = 0
                break

            vueltas += 1
            print("")
            print("🏁 ¡Vuelta " + str(vueltas) + " completada con éxito!")
            print("   Combustible restante: " + str(combustible) + " %.")

            if vueltas >= vueltas_meta:
                print("")
                print("🏆 ¡BANDERA A CUADROS! ¡" + piloto + " ha ganado el Nitro Grand Prix!")

        elif opcion == 4:
            velocidad = 0
            combustible = 100
            print("")
            print("⛽ ¡Pit Stop completado en boxes!")
            print("   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h).")

        elif opcion == 5:
            print("")
            print("================ TELEMETRÍA EN BOXES ================")
            print("Piloto:             " + piloto)
            print("Vehículo:           " + auto)
            print("Velocidad Actual:   " + str(velocidad) + " km/h")
            print("Combustible:        " + str(combustible) + " %")
            print("Vueltas:            " + str(vueltas) + " / " + str(vueltas_meta))
            print("======================================================")

        elif opcion == 6:
            print("")
            print("Te has retirado de la carrera. Gracias por competir, " + piloto + ".")

        else:
            print("")
            print(">> Opción no reconocida. Intenta de nuevo.")

    if combustible <= 0 and vueltas < vueltas_meta:
        print("")
        print("☠️ Carrera terminada: Te quedaste sin combustible o destruiste el monoplaza. GAME OVER.")

if __name__ == '__main__':
    main()`,
    java: `import java.util.Scanner;

public class CarreraArcade {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("================================================");
        System.out.println("          CARRERA ARCADE NITRO GRAND PRIX       ");
        System.out.println("================================================");

        // 1. Datos iniciales
        System.out.print("Nombre del piloto: ");
        String piloto = sc.nextLine();

        System.out.print("Modelo del vehículo (Ferrari, Red Bull, etc.): ");
        String auto = sc.nextLine();

        // 2. Variables de telemetría
        int velocidad = 0;
        int combustible = 100;
        int vueltas = 0;
        int vueltasMeta = 3;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 6 && combustible > 0 && vueltas < vueltasMeta) {
            System.out.println("");
            System.out.println("---------------- PANEL DE CONTROL ----------------");
            System.out.println("1. Acelerar (+30 km/h, -5% Combustible)");
            System.out.println("2. Frenar (-20 km/h)");
            System.out.println("3. Correr vuelta en circuito (Simular 3 sectores)");
            System.out.println("4. Entrar a Boxes (Recargar combustible al 100%)");
            System.out.println("5. Ver telemetría");
            System.out.println("6. Abandonar carrera");
            System.out.print("Elige una opción: ");

            if (!sc.hasNextInt()) {
                System.out.println(">> Opción inválida. Ingresa un número.");
                sc.next();
                continue;
            }
            opcion = sc.nextInt();

            if (opcion == 1) {
                velocidad += 30;
                combustible -= 5;
                System.out.println("");
                System.out.println("[🏎️] ¡Aceleraste a fondo!");
                System.out.println("    Velocidad actual: " + velocidad + " km/h.");
                System.out.println("    Combustible restante: " + combustible + " %.");
            } else if (opcion == 2) {
                velocidad = Math.max(0, velocidad - 20);
                System.out.println("");
                System.out.println("[🛑] Has pisado el freno.");
                System.out.println("    Velocidad reducida a: " + velocidad + " km/h.");
            } else if (opcion == 3) {
                if (velocidad < 50) {
                    System.out.println("");
                    System.out.println("[!] El auto va demasiado lento (Mínimo 50 km/h para completar vuelta). ¡Acelera!");
                    continue;
                }

                System.out.println("");
                System.out.println("--- ¡CORRIENDO VUELTA " + (vueltas + 1) + " EN EL CIRCUITO! ---");
                combustible -= 15;
                boolean choco = false;

                // Bucle for para los 3 sectores
                for (int sector = 1; sector <= 3; sector++) {
                    System.out.println("Sector " + sector + ": Trazando curva a " + velocidad + " km/h...");

                    if (velocidad > 200) {
                        System.out.println("💥 ¡¡¡CHOQUE FATAL EN LA CURVA " + sector + "!!!");
                        System.out.println("   Entraste a más de 200 km/h (" + velocidad + " km/h) y perdiste el control.");
                        choco = true;
                        break;
                    }
                }

                if (choco) {
                    combustible = 0;
                    break;
                }

                vueltas++;
                System.out.println("");
                System.out.println("🏁 ¡Vuelta " + vueltas + " completada con éxito!");
                System.out.println("   Combustible restante: " + combustible + " %.");

                if (vueltas >= vueltasMeta) {
                    System.out.println("");
                    System.out.println("🏆 ¡BANDERA A CUADROS! ¡" + piloto + " ha ganado el Nitro Grand Prix!");
                }
            } else if (opcion == 4) {
                velocidad = 0;
                combustible = 100;
                System.out.println("");
                System.out.println("⛽ ¡Pit Stop completado en boxes!");
                System.out.println("   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h).");
            } else if (opcion == 5) {
                System.out.println("");
                System.out.println("================ TELEMETRÍA EN BOXES ================");
                System.out.println("Piloto:             " + piloto);
                System.out.println("Vehículo:           " + auto);
                System.out.println("Velocidad Actual:   " + velocidad + " km/h");
                System.out.println("Combustible:        " + combustible + " %");
                System.out.println("Vueltas:            " + vueltas + " / " + vueltasMeta);
                System.out.println("======================================================");
            } else if (opcion == 6) {
                System.out.println("");
                System.out.println("Te has retirado de la carrera. Gracias por competir, " + piloto + ".");
            } else {
                System.out.println("");
                System.out.println(">> Opción no reconocida. Intenta de nuevo.");
            }
        }

        if (combustible <= 0 && vueltas < vueltasMeta) {
            System.out.println("");
            System.out.println("☠️ Carrera terminada: Te quedaste sin combustible o destruiste el vehículo. GAME OVER.");
        }
    }
}`,
    cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    cout << "================================================" << endl;
    cout << "          CARRERA ARCADE NITRO GRAND PRIX       " << endl;
    cout << "================================================" << endl;

    // 1. Datos iniciales
    string piloto;
    cout << "Nombre del piloto: ";
    cin >> piloto;

    string autoNombre;
    cout << "Modelo del vehiculo (Ferrari, Red Bull, etc.): ";
    cin >> autoNombre;

    // 2. Variables de telemetria
    int velocidad = 0;
    int combustible = 100;
    int vueltas = 0;
    int vueltasMeta = 3;
    int opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion != 6 && combustible > 0 && vueltas < vueltasMeta) {
        cout << endl;
        cout << "---------------- PANEL DE CONTROL ----------------" << endl;
        cout << "1. Acelerar (+30 km/h, -5% Combustible)" << endl;
        cout << "2. Frenar (-20 km/h)" << endl;
        cout << "3. Correr vuelta en circuito (Simular 3 sectores)" << endl;
        cout << "4. Entrar a Boxes (Recargar combustible al 100%)" << endl;
        cout << "5. Ver telemetria" << endl;
        cout << "6. Abandonar carrera" << endl;
        cout << "Elige una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            velocidad += 30;
            combustible -= 5;
            cout << endl;
            cout << "[🏎️] ¡Aceleraste a fondo!" << endl;
            cout << "    Velocidad actual: " << velocidad << " km/h." << endl;
            cout << "    Combustible restante: " << combustible << " %." << endl;
        } else if (opcion == 2) {
            velocidad = max(0, velocidad - 20);
            cout << endl;
            cout << "[🛑] Has pisado el freno." << endl;
            cout << "    Velocidad reducida a: " << velocidad << " km/h." << endl;
        } else if (opcion == 3) {
            if (velocidad < 50) {
                cout << endl;
                cout << "[!] El auto va demasiado lento (Minimo 50 km/h para completar vuelta). ¡Acelera!" << endl;
                continue;
            }

            cout << endl;
            cout << "--- ¡CORRIENDO VUELTA " << (vueltas + 1) << " EN EL CIRCUITO! ---" << endl;
            combustible -= 15;
            bool choco = false;

            // Bucle for para los 3 sectores
            for (int sector = 1; sector <= 3; sector++) {
                cout << "Sector " << sector << ": Trazando curva a " << velocidad << " km/h..." << endl;

                if (velocidad > 200) {
                    cout << "💥 ¡¡¡CHOQUE FATAL EN LA CURVA " << sector << "!!!" << endl;
                    cout << "   Entraste a mas de 200 km/h (" << velocidad << " km/h) y perdiste el control." << endl;
                    choco = true;
                    break;
                }
            }

            if (choco) {
                combustible = 0;
                break;
            }

            vueltas++;
            cout << endl;
            cout << "🏁 ¡Vuelta " << vueltas << " completada con exito!" << endl;
            cout << "   Combustible restante: " << combustible << " %." << endl;

            if (vueltas >= vueltasMeta) {
                cout << endl;
                cout << "🏆 ¡BANDERA A CUADROS! ¡" << piloto << " ha ganado el Nitro Grand Prix!" << endl;
            }
        } else if (opcion == 4) {
            velocidad = 0;
            combustible = 100;
            cout << endl;
            cout << "⛽ ¡Pit Stop completado en boxes!" << endl;
            cout << "   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h)." << endl;
        } else if (opcion == 5) {
            cout << endl;
            cout << "================ TELEMETRÍA EN BOXES ================" << endl;
            cout << "Piloto:             " << piloto << endl;
            cout << "Vehiculo:           " << autoNombre << endl;
            cout << "Velocidad Actual:   " << velocidad << " km/h" << endl;
            cout << "Combustible:        " << combustible << " %" << endl;
            cout << "Vueltas:            " << vueltas << " / " << vueltasMeta << endl;
            cout << "======================================================" << endl;
        } else if (opcion == 6) {
            cout << endl;
            cout << "Te has retirado de la carrera. Gracias por competir, " << piloto << "." << endl;
        } else {
            cout << endl;
            cout << ">> Opcion no reconocida. Intenta de nuevo." << endl;
        }
    }

    if (combustible <= 0 && vueltas < vueltasMeta) {
        cout << endl;
        cout << "☠️ Carrera terminada: Te quedaste sin combustible o destruiste el monoplaza. GAME OVER." << endl;
    }

    return 0;
}`,
    javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("================================================");
    console.log("          CARRERA ARCADE NITRO GRAND PRIX       ");
    console.log("================================================");

    // 1. Datos iniciales
    const piloto = await ask("Nombre del piloto: ");
    const auto = await ask("Modelo del vehículo (Ferrari, Red Bull, etc.): ");

    // 2. Variables de telemetría
    let velocidad = 0;
    let combustible = 100;
    let vueltas = 0;
    let vueltasMeta = 3;
    let opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion !== 6 && combustible > 0 && vueltas < vueltasMeta) {
        console.log("");
        console.log("---------------- PANEL DE CONTROL ----------------");
        console.log("1. Acelerar (+30 km/h, -5% Combustible)");
        console.log("2. Frenar (-20 km/h)");
        console.log("3. Correr vuelta en circuito (Simular 3 sectores)");
        console.log("4. Entrar a Boxes (Recargar combustible al 100%)");
        console.log("5. Ver telemetría");
        console.log("6. Abandonar carrera");

        const resp = await ask("Elige una opción: ");
        opcion = parseInt(resp, 10);

        if (isNaN(opcion)) {
            console.log(">> Opción inválida. Ingresa un número.");
            continue;
        }

        if (opcion === 1) {
            velocidad += 30;
            combustible -= 5;
            console.log("");
            console.log("[🏎️] ¡Aceleraste a fondo!");
            console.log("    Velocidad actual: " + velocidad + " km/h.");
            console.log("    Combustible restante: " + combustible + " %.");
        } else if (opcion === 2) {
            velocidad = Math.max(0, velocidad - 20);
            console.log("");
            console.log("[🛑] Has pisado el freno.");
            console.log("    Velocidad reducida a: " + velocidad + " km/h.");
        } else if (opcion === 3) {
            if (velocidad < 50) {
                console.log("");
                console.log("[!] El auto va demasiado lento (Mínimo 50 km/h para completar vuelta). ¡Acelera!");
                continue;
            }

            console.log("");
            console.log("--- ¡CORRIENDO VUELTA " + (vueltas + 1) + " EN EL CIRCUITO! ---");
            combustible -= 15;
            let choco = false;

            for (let sector = 1; sector <= 3; sector++) {
                console.log("Sector " + sector + ": Trazando curva a " + velocidad + " km/h...");

                if (velocidad > 200) {
                    console.log("💥 ¡¡¡CHOQUE FATAL EN LA CURVA " + sector + "!!!");
                    console.log("   Entraste a más de 200 km/h (" + velocidad + " km/h) y perdiste el control.");
                    choco = true;
                    break;
                }
            }

            if (choco) {
                combustible = 0;
                break;
            }

            vueltas++;
            console.log("");
            console.log("🏁 ¡Vuelta " + vueltas + " completada con éxito!");
            console.log("   Combustible restante: " + combustible + " %.");

            if (vueltas >= vueltasMeta) {
                console.log("");
                console.log("🏆 ¡BANDERA A CUADROS! ¡" + piloto + " ha ganado el Nitro Grand Prix!");
            }
        } else if (opcion === 4) {
            velocidad = 0;
            combustible = 100;
            console.log("");
            console.log("⛽ ¡Pit Stop completado en boxes!");
            console.log("   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h).");
        } else if (opcion === 5) {
            console.log("");
            console.log("================ TELEMETRÍA EN BOXES ================");
            console.log("Piloto:             " + piloto);
            console.log("Vehículo:           " + auto);
            console.log("Velocidad Actual:   " + velocidad + " km/h");
            console.log("Combustible:        " + combustible + " %");
            console.log("Vueltas:            " + vueltas + " / " + vueltasMeta);
            console.log("======================================================");
        } else if (opcion === 6) {
            console.log("");
            console.log("Te has retirado de la carrera. Gracias por competir, " + piloto + ".");
        } else {
            console.log("");
            console.log(">> Opción no reconocida. Intenta de nuevo.");
        }
    }

    if (combustible <= 0 && vueltas < vueltasMeta) {
        console.log("");
        console.log("☠️ Carrera terminada: Te quedaste sin combustible o destruiste el vehículo. GAME OVER.");
    }

    rl.close();
}

main();`,
    php: `<?php
echo "================================================\\n";
echo "          CARRERA ARCADE NITRO GRAND PRIX       \\n";
echo "================================================\\n";

// 1. Datos iniciales
echo "Nombre del piloto: ";
$piloto = trim(fgets(STDIN));

echo "Modelo del vehículo (Ferrari, Red Bull, etc.): ";
$auto = trim(fgets(STDIN));

// 2. Variables de telemetría
$velocidad = 0;
$combustible = 100;
$vueltas = 0;
$vueltasMeta = 3;
$opcion = 0;

// 3. Bucle interactivo principal
while ($opcion != 6 && $combustible > 0 && $vueltas < $vueltasMeta) {
    echo "\\n";
    echo "---------------- PANEL DE CONTROL ----------------\\n";
    echo "1. Acelerar (+30 km/h, -5% Combustible)\\n";
    echo "2. Frenar (-20 km/h)\\n";
    echo "3. Correr vuelta en circuito (Simular 3 sectores)\\n";
    echo "4. Entrar a Boxes (Recargar combustible al 100%)\\n";
    echo "5. Ver telemetría\\n";
    echo "6. Abandonar carrera\\n";
    echo "Elige una opción: ";

    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        $velocidad += 30;
        $combustible -= 5;
        echo "\\n";
        echo "[🏎️] ¡Aceleraste a fondo!\\n";
        echo "    Velocidad actual: " . $velocidad . " km/h.\\n";
        echo "    Combustible restante: " . $combustible . " %.\\n";
    } else if ($opcion == 2) {
        $velocidad = max(0, $velocidad - 20);
        echo "\\n";
        echo "[🛑] Has pisado el freno.\\n";
        echo "    Velocidad reducida a: " . $velocidad . " km/h.\\n";
    } else if ($opcion == 3) {
        if ($velocidad < 50) {
            echo "\\n";
            echo "[!] El auto va demasiado lento (Mínimo 50 km/h para completar vuelta). ¡Acelera!\\n";
            continue;
        }

        echo "\\n";
        echo "--- ¡CORRIENDO VUELTA " . ($vueltas + 1) . " EN EL CIRCUITO! ---\\n";
        $combustible -= 15;
        $choco = false;

        for ($sector = 1; $sector <= 3; $sector++) {
            echo "Sector " . $sector . ": Trazando curva a " . $velocidad . " km/h...\\n";

            if ($velocidad > 200) {
                echo "💥 ¡¡¡CHOQUE FATAL EN LA CURVA " . $sector . "!!!\\n";
                echo "   Entraste a más de 200 km/h (" . $velocidad . " km/h) y perdiste el control.\\n";
                $choco = true;
                break;
            }
        }

        if ($choco) {
            $combustible = 0;
            break;
        }

        $vueltas++;
        echo "\\n";
        echo "🏁 ¡Vuelta " . $vueltas . " completada con éxito!\\n";
        echo "   Combustible restante: " . $combustible . " %.\\n";

        if ($vueltas >= $vueltasMeta) {
            echo "\\n";
            echo "🏆 ¡BANDERA A CUADROS! ¡" . $piloto . " ha ganado el Nitro Grand Prix!\\n";
        }
    } else if ($opcion == 4) {
        $velocidad = 0;
        $combustible = 100;
        echo "\\n";
        echo "⛽ ¡Pit Stop completado en boxes!\\n";
        echo "   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h).\\n";
    } else if ($opcion == 5) {
        echo "\\n";
        echo "================ TELEMETRÍA EN BOXES ================\\n";
        echo "Piloto:             " . $piloto . "\\n";
        echo "Vehículo:           " . $auto . "\\n";
        echo "Velocidad Actual:   " . $velocidad . " km/h\\n";
        echo "Combustible:        " . $combustible . " %\\n";
        echo "Vueltas:            " . $vueltas . " / " . $vueltasMeta . "\\n";
        echo "======================================================\\n";
    } else if ($opcion == 6) {
        echo "\\n";
        echo "Te has retirado de la carrera. Gracias por competir, " . $piloto . ".\\n";
    } else {
        echo "\\n";
        echo ">> Opción no reconocida. Intenta de nuevo.\\n";
    }
}

if ($combustible <= 0 && $vueltas < $vueltasMeta) {
    echo "\\n";
    echo "☠️ Carrera terminada: Te quedaste sin combustible o destruiste el monoplaza. GAME OVER.\\n";
}
?>`,
    pseint: `Algoritmo CarreraArcade
    // 1. Declaración de variables
    Definir piloto, autoModelo Como Cadena
    Definir velocidad, combustible, vueltas, vueltasMeta, opcion, sector Como Entero
    Definir choco Como Logico
    
    Escribir "================================================"
    Escribir "          CARRERA ARCADE NITRO GRAND PRIX       "
    Escribir "================================================"
    
    Escribir "Nombre del piloto:"
    Leer piloto
    
    Escribir "Modelo del vehiculo (Ferrari, Red Bull, etc.):"
    Leer autoModelo
    
    // 2. Inicialización de telemetría con =
    velocidad = 0
    combustible = 100
    vueltas = 0
    vueltasMeta = 3
    opcion = 0
    
    // 3. Bucle interactivo principal
    Mientras opcion <> 6 Y combustible > 0 Y vueltas < vueltasMeta Hacer
        Escribir ""
        Escribir "---------------- PANEL DE CONTROL ----------------"
        Escribir "1. Acelerar (+30 km/h, -5% Combustible)"
        Escribir "2. Frenar (-20 km/h)"
        Escribir "3. Correr vuelta en circuito (Simular 3 sectores)"
        Escribir "4. Entrar a Boxes (Recargar combustible al 100%)"
        Escribir "5. Ver telemetria"
        Escribir "6. Abandonar carrera"
        Escribir "Elige una opcion:"
        Leer opcion
        
        Segun opcion Hacer
            1:
                velocidad = velocidad + 30
                combustible = combustible - 5
                Escribir ""
                Escribir "[🏎️] ¡Aceleraste a fondo!"
                Escribir "    Velocidad actual: ", velocidad, " km/h."
                Escribir "    Combustible restante: ", combustible, " %."
            2:
                velocidad = velocidad - 20
                Si velocidad < 0 Entonces
                    velocidad = 0
                FinSi
                Escribir ""
                Escribir "[🛑] Has pisado el freno."
                Escribir "    Velocidad reducida a: ", velocidad, " km/h."
            3:
                Si velocidad < 50 Entonces
                    Escribir ""
                    Escribir "[!] El auto va demasiado lento (Minimo 50 km/h para completar vuelta). ¡Acelera!"
                SiNo
                    Escribir ""
                    Escribir "--- ¡CORRIENDO VUELTA ", (vueltas + 1), " EN EL CIRCUITO! ---"
                    combustible = combustible - 15
                    choco = Falso
                    
                    // Bucle for para los 3 sectores
                    Para sector = 1 Hasta 3 Con Paso 1 Hacer
                        Escribir "Sector ", sector, ": Trazando curva a ", velocidad, " km/h..."
                        
                        Si velocidad > 200 Entonces
                            Escribir "💥 ¡¡¡CHOQUE FATAL EN LA CURVA ", sector, "!!!"
                            Escribir "   Entraste a mas de 200 km/h (", velocidad, " km/h) y perdiste el control."
                            choco = Verdadero
                            sector = 4 // Salida del circuito
                        FinSi
                    FinPara
                    
                    Si choco Entonces
                        combustible = 0
                    SiNo
                        vueltas = vueltas + 1
                        Escribir ""
                        Escribir "🏁 ¡Vuelta ", vueltas, " completada con exito!"
                        Escribir "   Combustible restante: ", combustible, " %."
                        
                        Si vueltas >= vueltasMeta Entonces
                            Escribir ""
                            Escribir "🏆 ¡BANDERA A CUADROS! ¡", piloto, " ha ganado el Nitro Grand Prix!"
                        FinSi
                    FinSi
                FinSi
            4:
                velocidad = 0
                combustible = 100
                Escribir ""
                Escribir "⛽ ¡Pit Stop completado en boxes!"
                Escribir "   Tanque lleno al 100%. Auto detenido en pitlane (0 km/h)."
            5:
                Escribir ""
                Escribir "================ TELEMETRÍA EN BOXES ================"
                Escribir "Piloto:             ", piloto
                Escribir "Vehiculo:           ", autoModelo
                Escribir "Velocidad Actual:   ", velocidad, " km/h"
                Escribir "Combustible:        ", combustible, " %"
                Escribir "Vueltas:            ", vueltas, " / ", vueltasMeta
                Escribir "======================================================"
            6:
                Escribir ""
                Escribir "Te has retirado de la carrera. Gracias por competir, ", piloto, "."
            De Otro Modo:
                Escribir ""
                Escribir ">> Opcion no reconocida. Intenta de nuevo."
        FinSegun
    FinMientras
    
    Si combustible <= 0 Y vueltas < vueltasMeta Entonces
        Escribir ""
        Escribir "☠️ Carrera terminada: Te quedaste sin combustible o destruiste el vehiculo. GAME OVER."
    FinSi
FinAlgoritmo`
  }
};
