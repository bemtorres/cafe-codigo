import type { GameProject } from '../gameProjectsData';

export const project2Zombie: GameProject = {
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
    'Cantidad inicial de comida (entero, ej: 4)'
  ],
  variables: [
    { name: 'vida', type: 'int', initialValue: '100', description: 'Salud física del sobreviviente' },
    { name: 'hambre', type: 'int', initialValue: '0', description: 'Nivel de inanición (0 = satisfecho, 100 = desnutrición crítica)' },
    { name: 'energia', type: 'int', initialValue: '100', description: 'Energía disponible para realizar actividades' },
    { name: 'comida', type: 'int', initialValue: '4', description: 'Latas de provisiones acumuladas' },
    { name: 'dias', type: 'int', initialValue: '1', description: 'Contador de días con vida' }
  ],
  menuOptions: [
    {
      option: '1',
      title: 'Buscar Comida en 3 Edificios',
      description: 'Usa un bucle for para revisar 3 lugares distintos (Supermercado, Farmacia, Casa).',
      logic: 'for (int i = 1; i <= 3; i++). Gasta 20 energía, suma 15 hambre. Cada lugar puede dar +1 comida o emboscada zombie (-15 HP).'
    },
    {
      option: '2',
      title: 'Descansar en el Refugio',
      description: 'Recupera energía durmiendo (+40), pero aumenta hambre (+20) y avanza el día. Si hay comida, consume 1 lata y baja hambre (-30).',
      logic: 'energia = Math.Min(100, energia + 40); hambre += 20; dias++; Si comida > 0: comida--; hambre = Math.Max(0, hambre - 30).'
    },
    {
      option: '3',
      title: 'Explorar la Ciudad',
      description: 'Expedición arriesgada (-30 energía, +20 hambre). Posibilidad de hallar botiquín (+25 HP) o ataque zombie (-20 HP).',
      logic: 'Validar energía >= 30. Probabilidad aleatoria de evento.'
    },
    {
      option: '4',
      title: 'Ver Estado del Sobreviviente',
      description: 'Muestra los valores actuales de Vida, Hambre, Energía, Comida y Días.',
      logic: 'Imprime el reporte completo del refugio.'
    },
    {
      option: '5',
      title: 'Rendirse / Salir',
      description: 'Finaliza la simulación de supervivencia.',
      logic: 'opcion = 5; Termina el bucle while.'
    }
  ],
  rules: [
    'Si el hambre llega al 100%, el personaje sufre desnutrición crítica y pierde 20 HP por cada acción.',
    'Si la vida llega a 0 o menos en cualquier momento: mostrar "GAME OVER" y terminar.',
    'No se puede buscar comida si la energía es menor a 20.',
    'No se puede explorar la ciudad si la energía es menor a 30.'
  ],
  extraChallenges: [
    'Clima Extremo: Agregar lluvia ácida o ventisca que aumente el gasto de energía.',
    'Fabricar Armas: Construir un bate con clavos para evitar daño al recibir emboscadas.',
    'Compañero Canino: Encontrar un perro guardián que alerte de los zombies.'
  ],
  steps: [
    { id: 'p2_s1', title: 'Variables de Recursos', desc: 'Definir vida=100, hambre=0, energia=100, comida=4 y dias=1.' },
    { id: 'p2_s2', title: 'Menú Interactivo con while', desc: 'Implementar el menú de 5 opciones con validación de entrada.' },
    { id: 'p2_s3', title: 'Bucle for de Búsqueda', desc: 'Simular 3 edificios usando for evaluando provisiones o ataques.' },
    { id: 'p2_s4', title: 'Lógica de Descanso y Hambre', desc: 'Recuperar energía, avanzar día y restar comida si está disponible.' }
  ],
  consolePreview: `================================================
       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   
================================================
Nombre del sobreviviente: Carlos

Día: 1 | Vida: 100 HP | Hambre: 0% | Energía: 100% | Comida: 4

---------------- MENÚ DEL REFUGIO ----------------
1. Buscar comida en 3 edificios
2. Descansar en el refugio (Avanzar día)
3. Explorar la ciudad
4. Ver estado del sobreviviente
5. Salir
Elige una opción: 1

--- Explorando 3 edificios ---
Lugar 1 (Supermercado): ¡Hallaste 1 lata de comida!
Lugar 2 (Farmacia): Zona segura pero vacía.
Lugar 3 (Casa abandonada): ¡Ataque zombie! Pierdes 15 HP.
Gasto: -20 Energía | Aumento: +15 Hambre`,
  solutions: {
    csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("================================================");
        Console.WriteLine("       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   ");
        Console.WriteLine("================================================");

        // 1. Datos iniciales
        Console.Write("Ingresa el nombre del sobreviviente: ");
        string nombre = Console.ReadLine();

        // 2. Variables de recursos y supervivencia
        int vida = 100;
        int hambre = 0;
        int energia = 100;
        int comida = 4;
        int dias = 1;
        int opcion = 0;

        Random rng = new Random();

        // 3. Bucle interactivo del refugio
        while (opcion != 5 && vida > 0)
        {
            // Verificación de hambre crítica
            if (hambre >= 100)
            {
                vida -= 20;
                Console.WriteLine("");
                Console.WriteLine("⚠️ ¡HAMBRE CRÍTICA AL 100%! Estás muriendo de inanición (-20 HP).");
            }

            if (vida <= 0)
            {
                break;
            }

            Console.WriteLine("");
            Console.WriteLine("---------------- MENÚ DEL REFUGIO ----------------");
            Console.WriteLine("1. Buscar comida en 3 edificios (-20 Energía, +15 Hambre)");
            Console.WriteLine("2. Descansar en el refugio (+40 Energía, Avanzar día)");
            Console.WriteLine("3. Explorar la ciudad (-30 Energía, +20 Hambre)");
            Console.WriteLine("4. Ver estado del sobreviviente");
            Console.WriteLine("5. Salir del juego");
            Console.Write("Elige una opción: ");

            if (!int.TryParse(Console.ReadLine(), out opcion))
            {
                Console.WriteLine(">> Opción inválida. Ingresa un número del 1 al 5.");
                continue;
            }

            switch (opcion)
            {
                case 1:
                    if (energia >= 20)
                    {
                        energia -= 20;
                        hambre += 15;
                        Console.WriteLine("");
                        Console.WriteLine("--- Registrando 3 edificios en la zona ---");

                        // Bucle for para revisar los 3 lugares
                        for (int lugar = 1; lugar <= 3; lugar++)
                        {
                            int evento = rng.Next(1, 4); // 1: Comida, 2: Zombie, 3: Vacío

                            if (evento == 1)
                            {
                                comida++;
                                Console.WriteLine("Lugar " + lugar + ": ¡Encontraste 1 lata de comida! (Total: " + comida + ")");
                            }
                            else if (evento == 2)
                            {
                                vida -= 15;
                                Console.WriteLine("Lugar " + lugar + ": ¡Un infectado te atacó! Pierdes 15 HP (Vida: " + vida + ")");
                            }
                            else
                            {
                                Console.WriteLine("Lugar " + lugar + ": El edificio estaba totalmente saqueado y vacío.");
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("[!] No tienes suficiente energía para salir a buscar comida (Mínimo 20).");
                    }
                    break;

                case 2:
                    dias++;
                    energia = Math.Min(100, energia + 40);
                    hambre += 20;
                    Console.WriteLine("");
                    Console.WriteLine("💤 Has dormido en el refugio. Energía restaurada (+40).");

                    // Consumo automático de comida si hay disponible
                    if (comida > 0)
                    {
                        comida--;
                        hambre = Math.Max(0, hambre - 30);
                        Console.WriteLine("   Consumiste 1 ración de comida. Hambre reducida a " + hambre + "%.");
                        Console.WriteLine("   Comida restante: " + comida + " latas.");
                    }
                    else
                    {
                        Console.WriteLine("   ⚠️ No te queda comida. El hambre aumentó a " + hambre + "%.");
                    }

                    Console.WriteLine("☀️ Amanece el Día " + dias + " de la supervivencia.");
                    break;

                case 3:
                    if (energia >= 30)
                    {
                        energia -= 30;
                        hambre += 20;
                        Console.WriteLine("");
                        Console.WriteLine("--- Explorando zonas profundas de la ciudad ---");

                        int hallazgo = rng.Next(1, 3);
                        if (hallazgo == 1)
                        {
                            vida = Math.Min(100, vida + 25);
                            Console.WriteLine("💉 ¡Hallaste un botiquín médico militar! Recuperas +25 HP (Vida: " + vida + ").");
                        }
                        else
                        {
                            vida -= 20;
                            Console.WriteLine("🧟 ¡Una horda te acorraló! Lograste huir pero recibiste 20 de daño (Vida: " + vida + ").");
                        }
                    }
                    else
                    {
                        Console.WriteLine("");
                        Console.WriteLine("[!] Necesitas al menos 30 de energía para explorar.");
                    }
                    break;

                case 4:
                    Console.WriteLine("");
                    Console.WriteLine("================ ESTADO DEL SOBREVIVIENTE ================");
                    Console.WriteLine("Nombre:       " + nombre);
                    Console.WriteLine("Días con vida: " + dias);
                    Console.WriteLine("Vida:         " + vida + " / 100 HP");
                    Console.WriteLine("Hambre:       " + hambre + " %");
                    Console.WriteLine("Energía:      " + energia + " %");
                    Console.WriteLine("Comida:       " + comida + " latas");
                    Console.WriteLine("==========================================================");
                    break;

                case 5:
                    Console.WriteLine("");
                    Console.WriteLine("Abandonaste el refugio. Has sobrevivido " + dias + " días.");
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
            Console.WriteLine("☠️ Has sucumbido ante el apocalipsis en el Día " + dias + ". GAME OVER.");
        }
    }
}`,
    python: `import random

def main():
    print("================================================")
    print("       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   ")
    print("================================================")

    # 1. Datos iniciales
    nombre = input("Ingresa el nombre del sobreviviente: ")

    # 2. Variables de estado
    vida = 100
    hambre = 0
    energia = 100
    comida = 4
    dias = 1
    opcion = 0

    # 3. Bucle interactivo principal
    while opcion != 5 and vida > 0:
        # Verificación de hambre crítica
        if hambre >= 100:
            vida -= 20
            print("")
            print("⚠️ ¡HAMBRE CRÍTICA AL 100%! Estás muriendo de inanición (-20 HP).")

        if vida <= 0:
            break

        print("")
        print("---------------- MENÚ DEL REFUGIO ----------------")
        print("1. Buscar comida en 3 edificios (-20 Energía, +15 Hambre)")
        print("2. Descansar en el refugio (+40 Energía, Avanzar día)")
        print("3. Explorar la ciudad (-30 Energía, +20 Hambre)")
        print("4. Ver estado del sobreviviente")
        print("5. Salir del juego")

        try:
            opcion = int(input("Elige una opción: "))
        except ValueError:
            print(">> Opción inválida. Ingresa un número.")
            continue

        if opcion == 1:
            if energia >= 20:
                energia -= 20
                hambre += 15
                print("")
                print("--- Registrando 3 edificios en la zona ---")

                # Bucle for para los 3 lugares
                for lugar in range(1, 4):
                    evento = random.randint(1, 3)

                    if evento == 1:
                        comida += 1
                        print("Lugar " + str(lugar) + ": ¡Encontraste 1 lata de comida! (Total: " + str(comida) + ")")
                    elif evento == 2:
                        vida -= 15
                        print("Lugar " + str(lugar) + ": ¡Un infectado te atacó! Pierdes 15 HP (Vida: " + str(vida) + ")")
                    else:
                        print("Lugar " + str(lugar) + ": El edificio estaba totalmente saqueado y vacío.")
            else:
                print("")
                print("[!] No tienes suficiente energía para buscar comida (Mínimo 20).")

        elif opcion == 2:
            dias += 1
            energia = min(100, energia + 40)
            hambre += 20
            print("")
            print("💤 Has dormido en el refugio. Energía restaurada (+40).")

            if comida > 0:
                comida -= 1
                hambre = max(0, hambre - 30)
                print("   Consumiste 1 ración de comida. Hambre reducida a " + str(hambre) + "%.")
                print("   Comida restante: " + str(comida) + " latas.")
            else:
                print("   ⚠️ No te queda comida. El hambre aumentó a " + str(hambre) + "%.")

            print("☀️ Amanece el Día " + str(dias) + " de la supervivencia.")

        elif opcion == 3:
            if energia >= 30:
                energia -= 30
                hambre += 20
                print("")
                print("--- Explorando zonas profundas de la ciudad ---")

                hallazgo = random.randint(1, 2)
                if hallazgo == 1:
                    vida = min(100, vida + 25)
                    print("💉 ¡Hallaste un botiquín médico! Recuperas +25 HP (Vida: " + str(vida) + ").")
                else:
                    vida -= 20
                    print("🧟 ¡Una horda te acorraló! Recibes 20 de daño (Vida: " + str(vida) + ").")
            else:
                print("")
                print("[!] Necesitas al menos 30 de energía para explorar.")

        elif opcion == 4:
            print("")
            print("================ ESTADO DEL SOBREVIVIENTE ================")
            print("Nombre:        " + nombre)
            print("Días con vida: " + str(dias))
            print("Vida:          " + str(vida) + " / 100 HP")
            print("Hambre:        " + str(hambre) + " %")
            print("Energía:       " + str(energia) + " %")
            print("Comida:        " + str(comida) + " latas")
            print("==========================================================")

        elif opcion == 5:
            print("")
            print("Abandonaste el refugio. Sobreviviste " + str(dias) + " días.")

        else:
            print("")
            print(">> Opción no reconocida. Intenta de nuevo.")

    if vida <= 0:
        print("")
        print("☠️ Has sucumbido ante el apocalipsis en el Día " + str(dias) + ". GAME OVER.")

if __name__ == '__main__':
    main()`,
    java: `import java.util.Scanner;
import java.util.Random;

public class SupervivenciaZombie {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random rng = new Random();

        System.out.println("================================================");
        System.out.println("       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   ");
        System.out.println("================================================");

        // 1. Datos iniciales
        System.out.print("Ingresa el nombre del sobreviviente: ");
        String nombre = sc.nextLine();

        // 2. Variables de estado
        int vida = 100;
        int hambre = 0;
        int energia = 100;
        int comida = 4;
        int dias = 1;
        int opcion = 0;

        // 3. Bucle interactivo principal
        while (opcion != 5 && vida > 0) {
            // Verificación de hambre crítica
            if (hambre >= 100) {
                vida -= 20;
                System.out.println("");
                System.out.println("⚠️ ¡HAMBRE CRÍTICA AL 100%! Estás muriendo de inanición (-20 HP).");
            }

            if (vida <= 0) {
                break;
            }

            System.out.println("");
            System.out.println("---------------- MENÚ DEL REFUGIO ----------------");
            System.out.println("1. Buscar comida en 3 edificios (-20 Energía, +15 Hambre)");
            System.out.println("2. Descansar en el refugio (+40 Energía, Avanzar día)");
            System.out.println("3. Explorar la ciudad (-30 Energía, +20 Hambre)");
            System.out.println("4. Ver estado del sobreviviente");
            System.out.println("5. Salir del juego");
            System.out.print("Elige una opción: ");

            if (!sc.hasNextInt()) {
                System.out.println(">> Opción inválida. Ingresa un número.");
                sc.next();
                continue;
            }
            opcion = sc.nextInt();

            if (opcion == 1) {
                if (energia >= 20) {
                    energia -= 20;
                    hambre += 15;
                    System.out.println("");
                    System.out.println("--- Registrando 3 edificios en la zona ---");

                    // Bucle for para los 3 lugares
                    for (int lugar = 1; lugar <= 3; lugar++) {
                        int evento = rng.nextInt(3) + 1; // 1 a 3

                        if (evento == 1) {
                            comida++;
                            System.out.println("Lugar " + lugar + ": ¡Encontraste 1 lata de comida! (Total: " + comida + ")");
                        } else if (evento == 2) {
                            vida -= 15;
                            System.out.println("Lugar " + lugar + ": ¡Un infectado te atacó! Pierdes 15 HP (Vida: " + vida + ")");
                        } else {
                            System.out.println("Lugar " + lugar + ": El edificio estaba totalmente saqueado y vacío.");
                        }
                    }
                } else {
                    System.out.println("");
                    System.out.println("[!] No tienes suficiente energía para buscar comida (Mínimo 20).");
                }
            } else if (opcion == 2) {
                dias++;
                energia = Math.min(100, energia + 40);
                hambre += 20;
                System.out.println("");
                System.out.println("💤 Has dormido en el refugio. Energía restaurada (+40).");

                if (comida > 0) {
                    comida--;
                    hambre = Math.max(0, hambre - 30);
                    System.out.println("   Consumiste 1 ración de comida. Hambre reducida a " + hambre + "%.");
                    System.out.println("   Comida restante: " + comida + " latas.");
                } else {
                    System.out.println("   ⚠️ No te queda comida. El hambre aumentó a " + hambre + "%.");
                }

                System.out.println("☀️ Amanece el Día " + dias + " de la supervivencia.");
            } else if (opcion == 3) {
                if (energia >= 30) {
                    energia -= 30;
                    hambre += 20;
                    System.out.println("");
                    System.out.println("--- Explorando zonas profundas de la ciudad ---");

                    int hallazgo = rng.nextInt(2) + 1;
                    if (hallazgo == 1) {
                        vida = Math.min(100, vida + 25);
                        System.out.println("💉 ¡Hallaste un botiquín médico! Recuperas +25 HP (Vida: " + vida + ").");
                    } else {
                        vida -= 20;
                        System.out.println("🧟 ¡Una horda te acorraló! Recibes 20 de daño (Vida: " + vida + ").");
                    }
                } else {
                    System.out.println("");
                    System.out.println("[!] Necesitas al menos 30 de energía para explorar.");
                }
            } else if (opcion == 4) {
                System.out.println("");
                System.out.println("================ ESTADO DEL SOBREVIVIENTE ================");
                System.out.println("Nombre:        " + nombre);
                System.out.println("Días con vida: " + dias);
                System.out.println("Vida:          " + vida + " / 100 HP");
                System.out.println("Hambre:        " + hambre + " %");
                System.out.println("Energía:       " + energia + " %");
                System.out.println("Comida:        " + comida + " latas");
                System.out.println("==========================================================");
            } else if (opcion == 5) {
                System.out.println("");
                System.out.println("Abandonaste el refugio. Sobreviviste " + dias + " días.");
            } else {
                System.out.println("");
                System.out.println(">> Opción no reconocida. Intenta de nuevo.");
            }
        }

        if (vida <= 0) {
            System.out.println("");
            System.out.println("☠️ Has sucumbido ante el apocalipsis en el Día " + dias + ". GAME OVER.");
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
    cout << "       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   " << endl;
    cout << "================================================" << endl;

    // 1. Datos iniciales
    string nombre;
    cout << "Ingresa el nombre del sobreviviente: ";
    cin >> nombre;

    // 2. Variables de estado
    int vida = 100;
    int hambre = 0;
    int energia = 100;
    int comida = 4;
    int dias = 1;
    int opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion != 5 && vida > 0) {
        // Verificación de hambre crítica
        if (hambre >= 100) {
            vida -= 20;
            cout << endl;
            cout << "⚠️ ¡HAMBRE CRÍTICA AL 100%! Estas muriendo de inanicion (-20 HP)." << endl;
        }

        if (vida <= 0) {
            break;
        }

        cout << endl;
        cout << "---------------- MENÚ DEL REFUGIO ----------------" << endl;
        cout << "1. Buscar comida en 3 edificios (-20 Energia, +15 Hambre)" << endl;
        cout << "2. Descansar en el refugio (+40 Energia, Avanzar dia)" << endl;
        cout << "3. Explorar la ciudad (-30 Energia, +20 Hambre)" << endl;
        cout << "4. Ver estado del sobreviviente" << endl;
        cout << "5. Salir del juego" << endl;
        cout << "Elige una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            if (energia >= 20) {
                energia -= 20;
                hambre += 15;
                cout << endl;
                cout << "--- Registrando 3 edificios en la zona ---" << endl;

                // Bucle for para los 3 lugares
                for (int lugar = 1; lugar <= 3; lugar++) {
                    int evento = (rand() % 3) + 1;

                    if (evento == 1) {
                        comida++;
                        cout << "Lugar " << lugar << ": ¡Encontraste 1 lata de comida! (Total: " << comida << ")" << endl;
                    } else if (evento == 2) {
                        vida -= 15;
                        cout << "Lugar " << lugar << ": ¡Un infectado te ataco! Pierdes 15 HP (Vida: " << vida << ")" << endl;
                    } else {
                        cout << "Lugar " << lugar << ": El edificio estaba totalmente saqueado y vacio." << endl;
                    }
                }
            } else {
                cout << endl;
                cout << "[!] No tienes suficiente energia para buscar comida (Minimo 20)." << endl;
            }
        } else if (opcion == 2) {
            dias++;
            energia = min(100, energia + 40);
            hambre += 20;
            cout << endl;
            cout << "💤 Has dormido en el refugio. Energia restaurada (+40)." << endl;

            if (comida > 0) {
                comida--;
                hambre = max(0, hambre - 30);
                cout << "   Consumiste 1 racion de comida. Hambre reducida a " << hambre << "%." << endl;
                cout << "   Comida restante: " << comida << " latas." << endl;
            } else {
                cout << "   ⚠️ No te queda comida. El hambre aumento a " << hambre << "%." << endl;
            }

            cout << "☀️ Amanece el Dia " << dias << " de la supervivencia." << endl;
        } else if (opcion == 3) {
            if (energia >= 30) {
                energia -= 30;
                hambre += 20;
                cout << endl;
                cout << "--- Explorando zonas profundas de la ciudad ---" << endl;

                int hallazgo = (rand() % 2) + 1;
                if (hallazgo == 1) {
                    vida = min(100, vida + 25);
                    cout << "💉 ¡Hallaste un botiquin medico! Recuperas +25 HP (Vida: " << vida << ")." << endl;
                } else {
                    vida -= 20;
                    cout << "🧟 ¡Una horda te acorralo! Recibes 20 de dano (Vida: " << vida << ")." << endl;
                }
            } else {
                cout << endl;
                cout << "[!] Necesitas al menos 30 de energia para explorar." << endl;
            }
        } else if (opcion == 4) {
            cout << endl;
            cout << "================ ESTADO DEL SOBREVIVIENTE ================" << endl;
            cout << "Nombre:        " << nombre << endl;
            cout << "Dias con vida: " << dias << endl;
            cout << "Vida:          " << vida << " / 100 HP" << endl;
            cout << "Hambre:        " << hambre << " %" << endl;
            cout << "Energia:       " << energia << " %" << endl;
            cout << "Comida:        " << comida << " latas" << endl;
            cout << "==========================================================" << endl;
        } else if (opcion == 5) {
            cout << endl;
            cout << "Abandonaste el refugio. Sobreviviste " << dias << " dias." << endl;
        } else {
            cout << endl;
            cout << ">> Opcion no reconocida. Intenta de nuevo." << endl;
        }
    }

    if (vida <= 0) {
        cout << endl;
        cout << "☠️ Has sucumbido ante el apocalipsis en el Dia " << dias << ". GAME OVER." << endl;
    }

    return 0;
}`,
    javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
    console.log("================================================");
    console.log("       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   ");
    console.log("================================================");

    // 1. Datos iniciales
    const nombre = await ask("Ingresa el nombre del sobreviviente: ");

    // 2. Variables de estado
    let vida = 100;
    let hambre = 0;
    let energia = 100;
    let comida = 4;
    let dias = 1;
    let opcion = 0;

    // 3. Bucle interactivo principal
    while (opcion !== 5 && vida > 0) {
        if (hambre >= 100) {
            vida -= 20;
            console.log("");
            console.log("⚠️ ¡HAMBRE CRÍTICA AL 100%! Estás muriendo de inanición (-20 HP).");
        }

        if (vida <= 0) {
            break;
        }

        console.log("");
        console.log("---------------- MENÚ DEL REFUGIO ----------------");
        console.log("1. Buscar comida en 3 edificios (-20 Energía, +15 Hambre)");
        console.log("2. Descansar en el refugio (+40 Energía, Avanzar día)");
        console.log("3. Explorar la ciudad (-30 Energía, +20 Hambre)");
        console.log("4. Ver estado del sobreviviente");
        console.log("5. Salir del juego");

        const resp = await ask("Elige una opción: ");
        opcion = parseInt(resp, 10);

        if (isNaN(opcion)) {
            console.log(">> Opción inválida. Ingresa un número.");
            continue;
        }

        if (opcion === 1) {
            if (energia >= 20) {
                energia -= 20;
                hambre += 15;
                console.log("");
                console.log("--- Registrando 3 edificios en la zona ---");

                for (let lugar = 1; lugar <= 3; lugar++) {
                    const evento = Math.floor(Math.random() * 3) + 1;

                    if (evento === 1) {
                        comida++;
                        console.log("Lugar " + lugar + ": ¡Encontraste 1 lata de comida! (Total: " + comida + ")");
                    } else if (evento === 2) {
                        vida -= 15;
                        console.log("Lugar " + lugar + ": ¡Un infectado te atacó! Pierdes 15 HP (Vida: " + vida + ")");
                    } else {
                        console.log("Lugar " + lugar + ": El edificio estaba totalmente saqueado y vacío.");
                    }
                }
            } else {
                console.log("");
                console.log("[!] No tienes suficiente energía para buscar comida (Mínimo 20).");
            }
        } else if (opcion === 2) {
            dias++;
            energia = Math.min(100, energia + 40);
            hambre += 20;
            console.log("");
            console.log("💤 Has dormido en el refugio. Energía restaurada (+40).");

            if (comida > 0) {
                comida--;
                hambre = Math.max(0, hambre - 30);
                console.log("   Consumiste 1 ración de comida. Hambre reducida a " + hambre + "%.");
                console.log("   Comida restante: " + comida + " latas.");
            } else {
                console.log("   ⚠️ No te queda comida. El hambre aumentó a " + hambre + "%.");
            }

            console.log("☀️ Amanece el Día " + dias + " de la supervivencia.");
        } else if (opcion === 3) {
            if (energia >= 30) {
                energia -= 30;
                hambre += 20;
                console.log("");
                console.log("--- Explorando zonas profundas de la ciudad ---");

                const hallazgo = Math.floor(Math.random() * 2) + 1;
                if (hallazgo === 1) {
                    vida = Math.min(100, vida + 25);
                    console.log("💉 ¡Hallaste un botiquín médico! Recuperas +25 HP (Vida: " + vida + ").");
                } else {
                    vida -= 20;
                    console.log("🧟 ¡Una horda te acorraló! Recibes 20 de daño (Vida: " + vida + ").");
                }
            } else {
                console.log("");
                console.log("[!] Necesitas al menos 30 de energía para explorar.");
            }
        } else if (opcion === 4) {
            console.log("");
            console.log("================ ESTADO DEL SOBREVIVIENTE ================");
            console.log("Nombre:        " + nombre);
            console.log("Días con vida: " + dias);
            console.log("Vida:          " + vida + " / 100 HP");
            console.log("Hambre:        " + hambre + " %");
            console.log("Energía:       " + energia + " %");
            console.log("Comida:        " + comida + " latas");
            console.log("==========================================================");
        } else if (opcion === 5) {
            console.log("");
            console.log("Abandonaste el refugio. Sobreviviste " + dias + " días.");
        } else {
            console.log("");
            console.log(">> Opción no reconocida. Intenta de nuevo.");
        }
    }

    if (vida <= 0) {
        console.log("");
        console.log("☠️ Has sucumbido ante el apocalipsis en el Día " + dias + ". GAME OVER.");
    }

    rl.close();
}

main();`,
    php: `<?php
echo "================================================\\n";
echo "       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   \\n";
echo "================================================\\n";

// 1. Datos iniciales
echo "Ingresa el nombre del sobreviviente: ";
$nombre = trim(fgets(STDIN));

// 2. Variables de estado
$vida = 100;
$hambre = 0;
$energia = 100;
$comida = 4;
$dias = 1;
$opcion = 0;

// 3. Bucle interactivo principal
while ($opcion != 5 && $vida > 0) {
    if ($hambre >= 100) {
        $vida -= 20;
        echo "\\n";
        echo "⚠️ ¡HAMBRE CRÍTICA AL 100%! Estás muriendo de inanición (-20 HP).\\n";
    }

    if ($vida <= 0) {
        break;
    }

    echo "\\n";
    echo "---------------- MENÚ DEL REFUGIO ----------------\\n";
    echo "1. Buscar comida en 3 edificios (-20 Energía, +15 Hambre)\\n";
    echo "2. Descansar en el refugio (+40 Energía, Avanzar día)\\n";
    echo "3. Explorar la ciudad (-30 Energía, +20 Hambre)\\n";
    echo "4. Ver estado del sobreviviente\\n";
    echo "5. Salir del juego\\n";
    echo "Elige una opción: ";

    $opcion = intval(trim(fgets(STDIN)));

    if ($opcion == 1) {
        if ($energia >= 20) {
            $energia -= 20;
            $hambre += 15;
            echo "\\n";
            echo "--- Registrando 3 edificios en la zona ---\\n";

            for ($lugar = 1; $lugar <= 3; $lugar++) {
                $evento = rand(1, 3);

                if ($evento == 1) {
                    $comida++;
                    echo "Lugar " . $lugar . ": ¡Encontraste 1 lata de comida! (Total: " . $comida . ")\\n";
                } else if ($evento == 2) {
                    $vida -= 15;
                    echo "Lugar " . $lugar . ": ¡Un infectado te atacó! Pierdes 15 HP (Vida: " . $vida . ")\\n";
                } else {
                    echo "Lugar " . $lugar . ": El edificio estaba totalmente saqueado y vacío.\\n";
                }
            }
        } else {
            echo "\\n";
            echo "[!] No tienes suficiente energía para buscar comida (Mínimo 20).\\n";
        }
    } else if ($opcion == 2) {
        $dias++;
        $energia = min(100, $energia + 40);
        $hambre += 20;
        echo "\\n";
        echo "💤 Has dormido en el refugio. Energía restaurada (+40).\\n";

        if ($comida > 0) {
            $comida--;
            $hambre = max(0, $hambre - 30);
            echo "   Consumiste 1 ración de comida. Hambre reducida a " . $hambre . "%.\\n";
            echo "   Comida restante: " . $comida . " latas.\\n";
        } else {
            echo "   ⚠️ No te queda comida. El hambre aumentó a " . $hambre . "%.\\n";
        }

        echo "☀️ Amanece el Día " . $dias . " de la supervivencia.\\n";
    } else if ($opcion == 3) {
        if ($energia >= 30) {
            $energia -= 30;
            $hambre += 20;
            echo "\\n";
            echo "--- Explorando zonas profundas de la ciudad ---\\n";

            $hallazgo = rand(1, 2);
            if ($hallazgo == 1) {
                $vida = min(100, $vida + 25);
                echo "💉 ¡Hallaste un botiquín médico! Recuperas +25 HP (Vida: " . $vida . ").\\n";
            } else {
                $vida -= 20;
                echo "🧟 ¡Una horda te acorraló! Recibes 20 de daño (Vida: " . $vida . ").\\n";
            }
        } else {
            echo "\\n";
            echo "[!] Necesitas al menos 30 de energía para explorar.\\n";
        }
    } else if ($opcion == 4) {
        echo "\\n";
        echo "================ ESTADO DEL SOBREVIVIENTE ================\\n";
        echo "Nombre:        " . $nombre . "\\n";
        echo "Días con vida: " . $dias . "\\n";
        echo "Vida:          " . $vida . " / 100 HP\\n";
        echo "Hambre:        " . $hambre . " %\\n";
        echo "Energía:       " . $energia . " %\\n";
        echo "Comida:        " . $comida . " latas\\n";
        echo "==========================================================\\n";
    } else if ($opcion == 5) {
        echo "\\n";
        echo "Abandonaste el refugio. Sobreviviste " . $dias . " días.\\n";
    } else {
        echo "\\n";
        echo ">> Opción no reconocida. Intenta de nuevo.\\n";
    }
}

if ($vida <= 0) {
    echo "\\n";
    echo "☠️ Has sucumbido ante el apocalipsis en el Día " . $dias . ". GAME OVER.\\n";
}
?>`,
    pseint: `Algoritmo SupervivenciaZombie
    // 1. Declaración de variables
    Definir nombre Como Cadena
    Definir vida, hambre, energia, comida, dias, opcion, lugar, evento, hallazgo Como Entero
    
    Escribir "================================================"
    Escribir "       SUPERVIVENCIA ZOMBIE: CIUDAD INFESTADA   "
    Escribir "================================================"
    
    Escribir "Ingresa el nombre del sobreviviente:"
    Leer nombre
    
    // 2. Inicialización de variables con =
    vida = 100
    hambre = 0
    energia = 100
    comida = 4
    dias = 1
    opcion = 0
    
    // 3. Bucle interactivo principal
    Mientras opcion <> 5 Y vida > 0 Hacer
        // Verificación de hambre crítica
        Si hambre >= 100 Entonces
            vida = vida - 20
            Escribir ""
            Escribir "⚠️ ¡HAMBRE CRÍTICA AL 100%! Estas muriendo de inanicion (-20 HP)."
        FinSi
        
        Si vida > 0 Entonces
            Escribir ""
            Escribir "---------------- MENÚ DEL REFUGIO ----------------"
            Escribir "1. Buscar comida en 3 edificios (-20 Energia, +15 Hambre)"
            Escribir "2. Descansar en el refugio (+40 Energia, Avanzar dia)"
            Escribir "3. Explorar la ciudad (-30 Energia, +20 Hambre)"
            Escribir "4. Ver estado del sobreviviente"
            Escribir "5. Salir del juego"
            Escribir "Elige una opcion:"
            Leer opcion
            
            Segun opcion Hacer
                1:
                    Si energia >= 20 Entonces
                        energia = energia - 20
                        hambre = hambre + 15
                        Escribir ""
                        Escribir "--- Registrando 3 edificios en la zona ---"
                        
                        // Bucle for para los 3 lugares
                        Para lugar = 1 Hasta 3 Con Paso 1 Hacer
                            evento = Azar(3) + 1
                            
                            Si evento = 1 Entonces
                                comida = comida + 1
                                Escribir "Lugar ", lugar, ": ¡Encontraste 1 lata de comida! (Total: ", comida, ")"
                            SiNo
                                Si evento = 2 Entonces
                                    vida = vida - 15
                                    Escribir "Lugar ", lugar, ": ¡Un infectado te ataco! Pierdes 15 HP (Vida: ", vida, ")"
                                SiNo
                                    Escribir "Lugar ", lugar, ": El edificio estaba totalmente saqueado y vacio."
                                FinSi
                            FinSi
                        FinPara
                    SiNo
                        Escribir ""
                        Escribir "[!] No tienes suficiente energia para buscar comida (Minimo 20)."
                    FinSi
                2:
                    dias = dias + 1
                    energia = energia + 40
                    Si energia > 100 Entonces
                        energia = 100
                    FinSi
                    
                    hambre = hambre + 20
                    Escribir ""
                    Escribir "💤 Has dormido en el refugio. Energia restaurada (+40)."
                    
                    Si comida > 0 Entonces
                        comida = comida - 1
                        hambre = hambre - 30
                        Si hambre < 0 Entonces
                            hambre = 0
                        FinSi
                        Escribir "   Consumiste 1 racion de comida. Hambre reducida a ", hambre, "%."
                        Escribir "   Comida restante: ", comida, " latas."
                    SiNo
                        Escribir "   ⚠️ No te queda comida. El hambre aumento a ", hambre, "%."
                    FinSi
                    
                    Escribir "☀️ Amanece el Dia ", dias, " de la supervivencia."
                3:
                    Si energia >= 30 Entonces
                        energia = energia - 30
                        hambre = hambre + 20
                        Escribir ""
                        Escribir "--- Explorando zonas profundas de la ciudad ---"
                        
                        hallazgo = Azar(2) + 1
                        Si hallazgo = 1 Entonces
                            vida = vida + 25
                            Si vida > 100 Entonces
                                vida = 100
                            FinSi
                            Escribir "💉 ¡Hallaste un botiquin medico! Recuperas +25 HP (Vida: ", vida, ")."
                        SiNo
                            vida = vida - 20
                            Escribir "🧟 ¡Una horda te acorralo! Recibes 20 de dano (Vida: ", vida, ")."
                        FinSi
                    SiNo
                        Escribir ""
                        Escribir "[!] Necesitas al menos 30 de energia para explorar."
                    FinSi
                4:
                    Escribir ""
                    Escribir "================ ESTADO DEL SOBREVIVIENTE ================"
                    Escribir "Nombre:        ", nombre
                    Escribir "Dias con vida: ", dias
                    Escribir "Vida:          ", vida, " / 100 HP"
                    Escribir "Hambre:        ", hambre, " %"
                    Escribir "Energia:       ", energia, " %"
                    Escribir "Comida:        ", comida, " latas"
                    Escribir "=========================================================="
                5:
                    Escribir ""
                    Escribir "Abandonaste el refugio. Sobreviviste ", dias, " dias."
                De Otro Modo:
                    Escribir ""
                    Escribir ">> Opcion no reconocida. Intenta de nuevo."
            FinSegun
        FinSi
    FinMientras
    
    Si vida <= 0 Entonces
        Escribir ""
        Escribir "☠️ Has sucumbido ante el apocalipsis en el Dia ", dias, ". GAME OVER."
    FinSi
FinAlgoritmo`
  }
};
