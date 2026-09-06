export interface GameVectorsCrudSolution {
  python: string;
  java: string;
  csharp: string;
  cpp: string;
  javascript: string;
  php: string;
  pseint: string;
}

export const gameVectorsCrudSolutions: Record<number, GameVectorsCrudSolution> = {
  // 1. Herrería & Tienda RPG: Sistema CRUD y Catálogo de Armas
  1: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarArma(vector<string>& armas, vector<float>& precios) {
    string nom; float pre;
    cout << "Nombre de arma a forjar: "; cin >> nom;
    cout << "Precio en monedas de oro: "; cin >> pre;
    armas.push_back(nom);
    precios.push_back(pre);
    cout << "-> ⚔️ Arma guardada con exito en el catalogo.\\n";
}

// 2. Listar
void listarArmas(const vector<string>& armas, const vector<float>& precios) {
    cout << "\\n=== 🛡️ ARSENAL Y TIENDA RPG ===\\n";
    if (armas.empty()) {
        cout << "(Catalogo vacio. Forja tu primera arma).\\n";
        return;
    }
    for (size_t i = 0; i < armas.size(); i++) {
        cout << "[" << i << "] " << armas[i] << " - " << precios[i] << " Monedas de Oro\\n";
    }
}

// 3. Buscar
int buscarArma(const vector<string>& armas, const string& buscada) {
    for (size_t i = 0; i < armas.size(); i++) {
        if (armas[i] == buscada) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarPrecio(vector<float>& precios) {
    int idx; float nuevoPre;
    cout << "Indice de arma a modificar: "; cin >> idx;
    if (idx >= 0 && idx < (int)precios.size()) {
        cout << "Nuevo valor en oro: "; cin >> nuevoPre;
        precios[idx] = nuevoPre;
        cout << "-> 💰 Precio actualizado.\\n";
    } else {
        cout << "-> ❌ Indice fuera de rango.\\n";
    }
}

// 5. Eliminar
void eliminarArma(vector<string>& armas, vector<float>& precios) {
    int idx;
    cout << "Indice de arma a desmantelar: "; cin >> idx;
    if (idx >= 0 && idx < (int)armas.size()) {
        armas.erase(armas.begin() + idx);
        precios.erase(precios.begin() + idx);
        cout << "-> 💥 Arma desmantelada de ambos vectores.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes
void reporteEstadisticas(const vector<string>& armas, const vector<float>& precios) {
    cout << "\\n📊 === REPORTES DE LA HERRERIA ===\\n";
    if (armas.empty()) {
        cout << "(Sin datos para reportes).\\n";
        return;
    }
    float suma = 0; int maxIdx = 0;
    for (size_t i = 0; i < precios.size(); i++) {
        suma += precios[i];
        if (precios[i] > precios[maxIdx]) {
            maxIdx = (int)i;
        }
    }
    cout << "Total valor del arsenal: " << suma << " Oro\\n";
    cout << "Precio promedio: " << (suma / precios.size()) << " Oro\\n";
    cout << "👑 Arma Legendaria mas cara: " << armas[maxIdx] << " (" << precios[maxIdx] << " Oro)\\n";
}

int main() {
    vector<string> armas = {"Espada Runica", "Arco Elfico", "Daga Sombria"};
    vector<float> precios = {250.0f, 180.5f, 95.0f};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "  HERRERIA & TIENDA RPG (CRUD)   \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Forjar Arma\\n";
        cout << "2. Listar Arsenal Completo\\n";
        cout << "3. Buscar Arma por Nombre\\n";
        cout << "4. Actualizar Precio en Oro\\n";
        cout << "5. Eliminar / Desmantelar Arma\\n";
        cout << "6. Reportes y Estadisticas\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarArma(armas, precios);
        } else if (opcion == 2) {
            listarArmas(armas, precios);
        } else if (opcion == 3) {
            string buscada;
            cout << "Ingrese nombre a buscar: "; cin >> buscada;
            int pos = buscarArma(armas, buscada);
            if (pos != -1) {
                cout << "-> 🔍 Encontrada en posicion [" << pos << "] - Precio: " << precios[pos] << " Oro\\n";
            } else {
                cout << "-> ❌ Arma no encontrada en la tienda.\\n";
            }
        } else if (opcion == 4) {
            actualizarPrecio(precios);
        } else if (opcion == 5) {
            eliminarArma(armas, precios);
        } else if (opcion == 6) {
            reporteEstadisticas(armas, precios);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Programa finalizado. ¡Hasta pronto, aventurero!\\n";
    return 0;
}`,
    python: `def guardarArma(armas, precios):
    arma = input("Nombre del arma: ")
    precio = float(input("Precio en oro: "))
    armas.append(arma)
    precios.append(precio)
    print("-> ⚔️ Arma guardada en el catálogo.")

def listarArmas(armas, precios):
    print("\\n=== 🛡️ TIENDA DE ARMAS RPG ===")
    if not armas:
        print("(Catálogo vacío)")
        return
    for i in range(len(armas)):
        print(f"[{i}] " + armas[i] + " - " + str(precios[i]) + " Oro")

def buscarArma(armas, buscada):
    for i, a in enumerate(armas):
        if a.lower() == buscada.lower():
            return i
    return -1

def actualizarPrecio(precios):
    idx = int(input("Índice de arma a actualizar: "))
    if 0 <= idx < len(precios):
        precios[idx] = float(input("Nuevo precio en oro: "))
        print("-> 💰 Tarifa actualizada.")
    else:
        print("-> ❌ Índice inválido.")

def eliminarArma(armas, precios):
    idx = int(input("Índice de arma a desmantelar: "))
    if 0 <= idx < len(armas):
        a = armas.pop(idx)
        p = precios.pop(idx)
        print(f"-> 💥 " + a + " desmantelada de la tienda.")
    else:
        print("-> ❌ Índice inválido.")

def reporteEstadisticas(armas, precios):
    print("\\n📊 === REPORTES DE LA HERRERÍA ===")
    if not armas:
        print("(Sin datos)")
        return
    total = sum(precios)
    promedio = total / len(precios)
    maxIdx = precios.index(max(precios))
    print(f"Total arsenal: " + str(total) + " Oro | Promedio: " + str(round(promedio, 2)) + " Oro")
    print(f"👑 Arma MVP: " + armas[maxIdx] + " (" + str(precios[maxIdx]) + " Oro)")

# Menú principal interactivo
armas = ["Espada Rúnica", "Arco Élfico", "Daga Sombría"]
precios = [250.0, 180.5, 95.0]
listarArmas(armas, precios)`,
    java: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void guardarArma(ArrayList<String> armas, ArrayList<Double> precios) {
        System.out.print("Nombre de arma: ");
        String nom = sc.next();
        System.out.print("Precio en oro: ");
        double pre = sc.nextDouble();
        armas.add(nom);
        precios.add(pre);
        System.out.println("-> ⚔️ Arma guardada en la herrería.");
    }

    public static void listarArmas(ArrayList<String> armas, ArrayList<Double> precios) {
        System.out.println("\\n=== 🛡️ ARSENAL RPG ===");
        for (int i = 0; i < armas.size(); i++) {
            System.out.println("[" + i + "] " + armas.get(i) + " - " + precios.get(i) + " Oro");
        }
    }

    public static int buscarArma(ArrayList<String> armas, String buscada) {
        for (int i = 0; i < armas.size(); i++) {
            if (armas.get(i).equalsIgnoreCase(buscada)) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        ArrayList<String> armas = new ArrayList<>();
        ArrayList<Double> precios = new ArrayList<>();
        armas.add("Mandoble Igneo"); precios.add(350.0);
        armas.add("Arco Elfico"); precios.add(180.0);
        listarArmas(armas, precios);
    }
}`,
    csharp: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void GuardarArma(List<string> armas, List<double> precios) {
        Console.Write("Nombre de arma: ");
        string a = Console.ReadLine();
        Console.Write("Precio en oro: ");
        double p = double.Parse(Console.ReadLine());
        armas.Add(a);
        precios.Add(p);
    }

    static void ListarArmas(List<string> armas, List<double> precios) {
        Console.WriteLine("\\n=== 🛡️ TIENDA RPG ===");
        for (int i = 0; i < armas.Count; i++) {
            Console.WriteLine("[{0}] {1} - {2} Oro", i, armas[i], precios[i]);
        }
    }

    static int BuscarArma(List<string> armas, string buscada) {
        return armas.FindIndex(a => a.Equals(buscada, StringComparison.OrdinalIgnoreCase));
    }

    static void Main() {
        List<string> armas = new List<string> { "Vara Arcana", "Hacha Vorpal" };
        List<double> precios = new List<double> { 220.0, 410.0 };
        ListarArmas(armas, precios);
    }
}`,
    javascript: `function guardarArma(armas, precios, arma, precio) {
  armas.push(arma);
  precios.push(precio);
  console.log("-> ⚔️ Arma guardada en la tienda.");
}

function listarArmas(armas, precios) {
  console.log("=== 🛡️ TIENDA DE ARMAS RPG ===");
  armas.forEach((a, i) => {
    console.log("[" + i + "] " + a + " - " + precios[i] + " Oro");
  });
}

function buscarArma(armas, target) {
  return armas.findIndex(a => a.toLowerCase() === target.toLowerCase());
}

const armas = ["Espada Rúnica", "Arco Élfico"];
const precios = [250, 180];
listarArmas(armas, precios);`,
    php: `<?php
function guardarArma(&$armas, &$precios, $arma, $precio) {
    $armas[] = $arma;
    $precios[] = $precio;
    echo "-> ⚔️ Arma forjada con éxito.\\n";
}

function listarArmas($armas, $precios) {
    echo "\\n=== 🛡️ TIENDA RPG ===\\n";
    for ($i = 0; $i < count($armas); $i++) {
        echo "[$i] " . $armas[$i] . " - " . $precios[$i] . " Oro\\n";
    }
}

function buscarArma($armas, $target) {
    foreach ($armas as $i => $a) {
        if (strcasecmp($a, $target) === 0) {
            return $i;
        }
    }
    return -1;
}

$armas = ["Espada Rúnica", "Arco Élfico"];
$precios = [250.0, 180.0];
listarArmas($armas, $precios);
?>`,
    pseint: `SubProceso listarArmas(armas, precios, n)
    Escribir "=== 🛡️ TIENDA RPG ==="
    Para i <- 1 Hasta n Hacer
        Escribir "[", (i-1), "] ", armas[i], " - ", precios[i], " Oro"
    FinPara
FinSubProceso

Algoritmo Principal
    Dimension armas[2]
    Dimension precios[2]
    armas[1] <- "Espada Rúnica"
    precios[1] <- 250.0
    armas[2] <- "Arco Élfico"
    precios[2] <- 180.0
    listarArmas(armas, precios, 2)
FinAlgoritmo`
  },

  // 2. Raid Boss & Squad: Gestión de Escuadrón, Salud y Triaje Crítico
  2: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarHeroe(vector<string>& heroes, vector<float>& hp) {
    string nom; float salud;
    cout << "Nombre del heroe: "; cin >> nom;
    cout << "Salud inicial (0-100%): "; cin >> salud;
    heroes.push_back(nom);
    hp.push_back(salud);
    cout << "-> 🛡️ Heroe reclutado en la party.\\n";
}

// 2. Listar
void listarSquad(const vector<string>& heroes, const vector<float>& hp) {
    cout << "\\n=== ⚔️ ESCUADRON RAID BOSS ===\\n";
    if (heroes.empty()) {
        cout << "(El escuadron no tiene combatientes activos).\\n";
        return;
    }
    for (size_t i = 0; i < heroes.size(); i++) {
        cout << "[" << i << "] " << heroes[i] << " - Salud: " << hp[i] << "% HP\\n";
    }
}

// 3. Buscar
int buscarHeroe(const vector<string>& heroes, const string& target) {
    for (size_t i = 0; i < heroes.size(); i++) {
        if (heroes[i] == target) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarHP(vector<float>& hp) {
    int idx; float nuevoHP;
    cout << "Indice de heroe a actualizar salud: "; cin >> idx;
    if (idx >= 0 && idx < (int)hp.size()) {
        cout << "Nuevo % de HP: "; cin >> nuevoHP;
        hp[idx] = nuevoHP;
        cout << "-> 🩸 Salud actualizada.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void eliminarHeroe(vector<string>& heroes, vector<float>& hp) {
    int idx;
    cout << "Indice de heroe caido a retirar: "; cin >> idx;
    if (idx >= 0 && idx < (int)heroes.size()) {
        cout << "⚰️ " << heroes[idx] << " ha sido retirado del squad.\\n";
        heroes.erase(heroes.begin() + idx);
        hp.erase(hp.begin() + idx);
        cout << "-> ✨ Escuadron reorganizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes
void reporteTriajeCritico(const vector<string>& heroes, const vector<float>& hp) {
    cout << "\\n🚨 === REPORTE DE TRIAJE CRITICO (HP < 30%) ===\\n";
    if (heroes.empty()) {
        cout << "(Sin miembros registrados).\\n";
        return;
    }
    int criticos = 0; int maxIdx = 0;
    for (size_t i = 0; i < heroes.size(); i++) {
        if (hp[i] < 30.0f) {
            cout << "- 🩸 ¡ALERTA! " << heroes[i] << " (" << hp[i] << "% HP) ¡Curacion urgente!\\n";
            criticos++;
        }
        if (hp[i] > hp[maxIdx]) {
            maxIdx = (int)i;
        }
    }
    if (criticos == 0) {
        cout << "-> ✅ Todos los miembros tienen salud estable (> 30%).\\n";
    }
    cout << "🛡️ Heroe con mayor salud: " << heroes[maxIdx] << " (" << hp[maxIdx] << "% HP)\\n";
}

int main() {
    vector<string> heroes = {"Arthur", "Freya", "Loki"};
    vector<float> hp = {85.0f, 22.5f, 14.0f};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "    SQUAD RAID BOSS (CRUD)       \\n";
        cout << "=================================\\n";
        cout << "1. Reclutar / Guardar Heroe\\n";
        cout << "2. Listar Escuadron Completo\\n";
        cout << "3. Buscar Heroe por Nombre\\n";
        cout << "4. Actualizar Salud (HP %)\\n";
        cout << "5. Eliminar Heroe Caido\\n";
        cout << "6. Reporte de Triaje Critico\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarHeroe(heroes, hp);
        } else if (opcion == 2) {
            listarSquad(heroes, hp);
        } else if (opcion == 3) {
            string buscado;
            cout << "Nombre del heroe a buscar: "; cin >> buscado;
            int pos = buscarHeroe(heroes, buscado);
            if (pos != -1) {
                cout << "-> 🔍 Encontrado en posicion [" << pos << "] con " << hp[pos] << "% HP\\n";
            } else {
                cout << "-> ❌ Heroe no encontrado en el squad.\\n";
            }
        } else if (opcion == 4) {
            actualizarHP(hp);
        } else if (opcion == 5) {
            eliminarHeroe(heroes, hp);
        } else if (opcion == 6) {
            reporteTriajeCritico(heroes, hp);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Sistema de escuadron cerrado.\\n";
    return 0;
}`,
    python: `def registrarHeroe(heroes, hpLista):
    h = input("Nombre del héroe: ")
    hp = float(input("HP actual (0-100%): "))
    heroes.append(h)
    hpLista.append(hp)

def listarSquad(heroes, hpLista):
    print("\\n=== ⚔️ ESCUADRÓN RAID BOSS ===")
    for i in range(len(heroes)):
        print(f"[{i}] " + heroes[i] + " - " + str(hpLista[i]) + "% HP")

def buscarHeroe(heroes, target):
    for i, h in enumerate(heroes):
        if h.lower() == target.lower():
            return i
    return -1

def reporteHPCritico(heroes, hpLista):
    print("\\n🚨 === HÉROES EN ESTADO CRÍTICO (HP < 30%) ===")
    for i in range(len(heroes)):
        if hpLista[i] < 30.0:
            print("- 🩸 " + heroes[i] + ": " + str(hpLista[i]) + "% HP ¡Necesita Curación!")

heroes = ["Paladín Arthur", "Maga Freya", "Pícaro Loki"]
hpLista = [85.0, 22.5, 14.0]
listarSquad(heroes, hpLista)
reporteHPCritico(heroes, hpLista)`,
    java: `import java.util.ArrayList;

public class Main {
    public static void reporteHPCritico(ArrayList<String> heroes, ArrayList<Double> hp) {
        System.out.println("🚨 === HÉROES EN ESTADO CRÍTICO (HP < 30%) ===");
        for (int i = 0; i < heroes.size(); i++) {
            if (hp.get(i) < 30.0) {
                System.out.println("- 🩸 " + heroes.get(i) + ": " + hp.get(i) + "% HP");
            }
        }
    }

    public static void main(String[] args) {
        ArrayList<String> h = new ArrayList<>();
        ArrayList<Double> hp = new ArrayList<>();
        h.add("Arthur"); hp.add(85.0);
        h.add("Freya"); hp.add(18.5);
        reporteHPCritico(h, hp);
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static void ReporteCritico(List<string> heroes, List<double> hp) {
        Console.WriteLine("🚨 === HÉROES EN ESTADO CRÍTICO (HP < 30%) ===");
        for (int i = 0; i < heroes.Count; i++) {
            if (hp[i] < 30.0) {
                Console.WriteLine("- 🩸 {0}: {1}% HP", heroes[i], hp[i]);
            }
        }
    }
    static void Main() {
        List<string> h = new List<string> { "Paladín", "Maga" };
        List<double> hp = new List<double> { 90.0, 15.0 };
        ReporteCritico(h, hp);
    }
}`,
    javascript: `function reporteHPCritico(heroes, hp) {
  console.log("🚨 === HÉROES EN ESTADO CRÍTICO (HP < 30%) ===");
  heroes.forEach((h, i) => {
    if (hp[i] < 30) {
      console.log("- 🩸 " + h + ": " + hp[i] + "% HP");
    }
  });
}
reporteHPCritico(["Arthur", "Freya", "Loki"], [85, 22.5, 14]);`,
    php: `<?php
function reporteHPCritico($heroes, $hp) {
    echo "🚨 === HÉROES EN ESTADO CRÍTICO (HP < 30%) ===\\n";
    for ($i = 0; $i < count($heroes); $i++) {
        if ($hp[$i] < 30.0) {
            echo "- 🩸 " . $heroes[$i] . ": " . $hp[$i] . "% HP\\n";
        }
    }
}
reporteHPCritico(["Arthur", "Freya"], [80.0, 19.5]);
?>`,
    pseint: `SubProceso reporteHPCritico(heroes, hp, n)
    Escribir "🚨 === HÉROES EN ESTADO CRÍTICO ==="
    Para i <- 1 Hasta n Hacer
        Si hp[i] < 30.0 Entonces
            Escribir "- 🩸 ", heroes[i], ": ", hp[i], "% HP"
        FinSi
    FinPara
FinSubProceso`
  },

  // 3. Gremio / Clan MMORPG: Registro de Miembros, DPS y Auditoría MVP
  3: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarMiembro(vector<string>& clan, vector<float>& dps) {
    string tag; float d;
    cout << "Gamertag del miembro: "; cin >> tag;
    cout << "DPS de combate: "; cin >> d;
    clan.push_back(tag);
    dps.push_back(d);
    cout << "-> 👑 Miembro reclutado en el clan.\\n";
}

// 2. Listar
void listarClan(const vector<string>& clan, const vector<float>& dps) {
    cout << "\\n=== 🛡️ MIEMBROS DEL CLAN Y DPS ===\\n";
    if (clan.empty()) {
        cout << "(Clan sin miembros registrados).\\n";
        return;
    }
    for (size_t i = 0; i < clan.size(); i++) {
        cout << "[" << i << "] " << clan[i] << " - " << dps[i] << " DPS\\n";
    }
}

// 3. Buscar
int buscarMiembro(const vector<string>& clan, const string& tag) {
    for (size_t i = 0; i < clan.size(); i++) {
        if (clan[i] == tag) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarDPS(vector<float>& dps) {
    int idx; float nuevoDPS;
    cout << "Indice a actualizar: "; cin >> idx;
    if (idx >= 0 && idx < (int)dps.size()) {
        cout << "Nuevo DPS: "; cin >> nuevoDPS;
        dps[idx] = nuevoDPS;
        cout << "-> 💥 DPS actualizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void eliminarMiembro(vector<string>& clan, vector<float>& dps) {
    int idx;
    cout << "Indice a expulsar: "; cin >> idx;
    if (idx >= 0 && idx < (int)clan.size()) {
        cout << "❌ " << clan[idx] << " expulsado del clan.\\n";
        clan.erase(clan.begin() + idx);
        dps.erase(dps.begin() + idx);
        cout << "-> ✨ Lista de clan actualizada.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes
void reportesDPS_MVP(const vector<string>& clan, const vector<float>& dps) {
    cout << "\\n📊 === ESTADISTICAS Y AUDITORIA DPS ===\\n";
    if (clan.empty()) {
        cout << "(Sin datos para reportes).\\n";
        return;
    }
    float total = 0; int maxIdx = 0;
    for (size_t i = 0; i < dps.size(); i++) {
        total += dps[i];
        if (dps[i] > dps[maxIdx]) {
            maxIdx = (int)i;
        }
    }
    cout << "💥 DPS Total del Clan: " << total << "\\n";
    cout << "📈 DPS Promedio: " << (total / dps.size()) << "\\n";
    cout << "👑 MVP del Clan: " << clan[maxIdx] << " (" << dps[maxIdx] << " DPS)\\n";
}

int main() {
    vector<string> clan = {"Valkyrie", "ShadowSniper", "Berserker"};
    vector<float> dps = {14200.0f, 18950.0f, 11500.0f};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "    GREMIO / CLAN MMORPG (CRUD)  \\n";
        cout << "=================================\\n";
        cout << "1. Reclutar / Guardar Miembro\\n";
        cout << "2. Listar Clan y DPS\\n";
        cout << "3. Buscar Miembro por Gamertag\\n";
        cout << "4. Actualizar DPS\\n";
        cout << "5. Expulsar / Eliminar Miembro\\n";
        cout << "6. Reportes DPS y MVP\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarMiembro(clan, dps);
        } else if (opcion == 2) {
            listarClan(clan, dps);
        } else if (opcion == 3) {
            string tag;
            cout << "Gamertag a buscar: "; cin >> tag;
            int pos = buscarMiembro(clan, tag);
            if (pos != -1) {
                cout << "-> 🔍 Miembro encontrado en posicion [" << pos << "] con " << dps[pos] << " DPS\\n";
            } else {
                cout << "-> ❌ Miembro no encontrado.\\n";
            }
        } else if (opcion == 4) {
            actualizarDPS(dps);
        } else if (opcion == 5) {
            eliminarMiembro(clan, dps);
        } else if (opcion == 6) {
            reportesDPS_MVP(clan, dps);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Sistema de clan cerrado.\\n";
    return 0;
}`,
    python: `def calcularEstadisticasDPS(miembros, dpsLista):
    totalDPS = sum(dpsLista)
    promedio = totalDPS / len(dpsLista) if dpsLista else 0
    maxDPS = max(dpsLista) if dpsLista else 0
    mvp = miembros[dpsLista.index(maxDPS)] if dpsLista else "N/A"
    return totalDPS, promedio, mvp

clan = ["Valkyrie", "ShadowSniper", "Berserker99"]
dps = [14200.0, 18950.0, 11500.0]
t, p, m = calcularEstadisticasDPS(clan, dps)
print("💥 DPS Total del Clan: " + str(t) + " | Promedio: " + str(round(p, 1)) + " | 👑 MVP: " + m)`,
    java: `import java.util.ArrayList;

public class Main {
    public static void estadisticasDPS(ArrayList<String> clan, ArrayList<Double> dps) {
        double total = 0;
        double maxDPS = -1;
        int maxIdx = -1;
        for (int i = 0; i < dps.size(); i++) {
            total += dps.get(i);
            if (dps.get(i) > maxDPS) {
                maxDPS = dps.get(i);
                maxIdx = i;
            }
        }
        System.out.println("DPS Total: " + total);
        System.out.println("DPS Promedio: " + (total / dps.size()));
        if (maxIdx != -1) {
            System.out.println("👑 MVP: " + clan.get(maxIdx) + " (" + maxDPS + " DPS)");
        }
    }
}`,
    csharp: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void EstadisticasDPS(List<string> clan, List<double> dps) {
        if (clan.Count == 0) {
            return;
        }
        double total = dps.Sum();
        int maxIdx = dps.IndexOf(dps.Max());
        Console.WriteLine("DPS Total: {0} | Promedio: {1} | 👑 MVP: {2} ({3} DPS)", total, total / dps.Count, clan[maxIdx], dps[maxIdx]);
    }
}`,
    javascript: `function estadisticasDPS(clan, dps) {
  if (clan.length === 0) {
    return;
  }
  const total = dps.reduce((a, b) => a + b, 0);
  const maxIdx = dps.indexOf(Math.max(...dps));
  console.log("DPS Total: " + total + " | Promedio: " + (total / dps.length) + " | 👑 MVP: " + clan[maxIdx]);
}
estadisticasDPS(["Valkyrie", "ShadowSniper", "Berserker"], [14200, 18950, 11500]);`,
    php: `<?php
function estadisticasDPS($clan, $dps) {
    if (empty($clan)) {
        return;
    }
    $total = array_sum($dps);
    $maxVal = max($dps);
    $idx = array_search($maxVal, $dps);
    echo "DPS Total: " . $total . " | 👑 MVP: " . $clan[$idx] . " (" . $maxVal . " DPS)\\n";
}
?>`,
    pseint: `SubProceso estadisticasDPS(clan, dps, n)
    total <- 0
    maxVal <- dps[1]
    maxIdx <- 1
    Para i <- 1 Hasta n Hacer
        total <- total + dps[i]
        Si dps[i] > maxVal Entonces
            maxVal <- dps[i]
            maxIdx <- i
        FinSi
    FinPara
    Escribir "DPS Total: ", total
    Escribir "👑 MVP: ", clan[maxIdx]
FinSubProceso`
  },

  // 4. Hangar Sci-Fi: Control de Bahías, Naves y Asignación de Pilotos
  4: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarNave(vector<string>& mat, vector<string>& pil) {
    string m, p;
    cout << "Matricula de nave: "; cin >> m;
    cout << "Piloto comandante: "; cin >> p;
    mat.push_back(m);
    pil.push_back(p);
    cout << "-> 🚀 Nave acoplada en la bahia [" << mat.size() - 1 << "].\\n";
}

// 2. Listar
void listarHangar(const vector<string>& mat, const vector<string>& pil) {
    cout << "\\n=== 🚀 HANGAR DE NAVES ESTELARES ===\\n";
    if (mat.empty()) {
        cout << "(Hangar vacio. Ninguna nave acoplada).\\n";
        return;
    }
    for (size_t i = 0; i < mat.size(); i++) {
        cout << "[Bahia " << i << "] Matricula: " << mat[i] << " | Piloto: " << pil[i] << "\\n";
    }
}

// 3. Buscar
int buscarNave(const vector<string>& mat, const string& buscada) {
    for (size_t i = 0; i < mat.size(); i++) {
        if (mat[i] == buscada) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarPiloto(vector<string>& pil) {
    int idx; string nuevoPil;
    cout << "Indice de bahia a reasignar piloto: "; cin >> idx;
    if (idx >= 0 && idx < (int)pil.size()) {
        cout << "Nuevo piloto asignado: "; cin >> nuevoPil;
        pil[idx] = nuevoPil;
        cout << "-> 👨‍🚀 Piloto reasignado con exito.\\n";
    } else {
        cout << "-> ❌ Bahía invalida.\\n";
    }
}

// 5. Eliminar
void eliminarNave(vector<string>& mat, vector<string>& pil) {
    int idx;
    cout << "Indice de bahia a autorizar despegue: "; cin >> idx;
    if (idx >= 0 && idx < (int)mat.size()) {
        cout << "🚀 Nave " << mat[idx] << " despegando. Bahia liberada.\\n";
        mat.erase(mat.begin() + idx);
        pil.erase(pil.begin() + idx);
        cout << "-> ✨ Registro de bahia actualizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes
void reportesOcupacion(const vector<string>& mat, const vector<string>& pil) {
    cout << "\\n📊 === REPORTE DE OCUPACION DEL HANGAR ===\\n";
    cout << "Total naves acopladas: " << mat.size() << "\\n";
    if (!mat.empty()) {
        cout << "Primera nave acoplada: " << mat.front() << " (Piloto: " << pil.front() << ")\\n";
        cout << "Ultima nave acoplada: " << mat.back() << " (Piloto: " << pil.back() << ")\\n";
    }
}

int main() {
    vector<string> mat = {"NX-01", "X-WING-7", "MILLENNIUM"};
    vector<string> pil = {"Archer", "Luke", "Han Solo"};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "    HANGAR ESPACIAL SCI-FI (CRUD) \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Acoplar Nave\\n";
        cout << "2. Listar Bahias del Hangar\\n";
        cout << "3. Buscar Nave por Matricula\\n";
        cout << "4. Reasignar / Actualizar Piloto\\n";
        cout << "5. Despegar / Eliminar Nave\\n";
        cout << "6. Reporte de Ocupacion\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarNave(mat, pil);
        } else if (opcion == 2) {
            listarHangar(mat, pil);
        } else if (opcion == 3) {
            string buscada;
            cout << "Matricula a buscar: "; cin >> buscada;
            int pos = buscarNave(mat, buscada);
            if (pos != -1) {
                cout << "-> 🔍 Localizada en Bahia [" << pos << "] | Piloto: " << pil[pos] << "\\n";
            } else {
                cout << "-> ❌ Nave no encontrada en el hangar.\\n";
            }
        } else if (opcion == 4) {
            actualizarPiloto(pil);
        } else if (opcion == 5) {
            eliminarNave(mat, pil);
        } else if (opcion == 6) {
            reportesOcupacion(mat, pil);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Sistema de hangar cerrado.\\n";
    return 0;
}`,
    python: `def buscarNave(matriculas, pilotos, buscada):
    for i, m in enumerate(matriculas):
        if m.upper() == buscada.upper():
            return "🚀 Nave '" + buscada + "' en Bahía [" + str(i) + "]. Piloto: " + pilotos[i]
    return "❌ Nave no localizada en el hangar estelar."

matriculas = ["NX-01", "X-WING-7", "MILLENNIUM"]
pilotos = ["Capitán Archer", "Luke S.", "Han Solo"]
print(buscarNave(matriculas, pilotos, "X-WING-7"))`,
    java: `import java.util.ArrayList;

public class Main {
    public static int buscarNave(ArrayList<String> naves, String buscada) {
        for (int i = 0; i < naves.size(); i++) {
            if (naves.get(i).equalsIgnoreCase(buscada)) {
                return i;
            }
        }
        return -1;
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static int BuscarNave(List<string> naves, string buscada) {
        return naves.FindIndex(n => n.Equals(buscada, StringComparison.OrdinalIgnoreCase));
    }
}`,
    javascript: `function buscarNave(naves, pilotos, target) {
  const idx = naves.findIndex(n => n.toUpperCase() === target.toUpperCase());
  if (idx !== -1) {
    return "🚀 Nave lista. Piloto: " + pilotos[idx];
  }
  return "❌ No encontrada";
}`,
    php: `<?php
function buscarNave($naves, $pilotos, $target) {
    $idx = array_search(strtoupper($target), array_map('strtoupper', $naves));
    if ($idx !== false) {
        return "Piloto: " . $pilotos[$idx];
    }
    return "No encontrada";
}
?>`,
    pseint: `SubProceso pos <- buscarNave(naves, n, target)
    pos <- -1
    Para i <- 1 Hasta n Hacer
        Si naves[i] = target Entonces
            pos <- i
        FinSi
    FinPara
FinSubProceso`
  },

  // 5. Alquimia & Forja Rúnica: Almacén de Ingredientes, Crafteo y Stock
  5: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarMaterial(vector<string>& mats, vector<int>& stock) {
    string m; int cant;
    cout << "Nombre del material: "; cin >> m;
    cout << "Unidades iniciales: "; cin >> cant;
    mats.push_back(m);
    stock.push_back(cant);
    cout << "-> ✨ Ingrediente guardado en la bolsa de alquimia.\\n";
}

// 2. Listar
void listarAlquimia(const vector<string>& mats, const vector<int>& stock) {
    cout << "\\n=== 🧪 LABORATORIO DE ALQUIMIA & CRAFTEO ===\\n";
    if (mats.empty()) {
        cout << "(Bolsa de alquimia vacia).\\n";
        return;
    }
    for (size_t i = 0; i < mats.size(); i++) {
        cout << "[" << i << "] " << mats[i] << " - Stock: " << stock[i] << " unidades\\n";
    }
}

// 3. Buscar
int buscarMaterial(const vector<string>& mats, const string& buscado) {
    for (size_t i = 0; i < mats.size(); i++) {
        if (mats[i] == buscado) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarStock(vector<int>& stock) {
    int idx; int nuevaCant;
    cout << "Indice de material a modificar: "; cin >> idx;
    if (idx >= 0 && idx < (int)stock.size()) {
        cout << "Nuevo stock disponible: "; cin >> nuevaCant;
        stock[idx] = nuevaCant;
        cout << "-> 📦 Stock actualizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void eliminarMaterial(vector<string>& mats, vector<int>& stock) {
    int idx;
    cout << "Indice a eliminar del laboratorio: "; cin >> idx;
    if (idx >= 0 && idx < (int)mats.size()) {
        cout << "🗑️ " << mats[idx] << " descartado de la bolsa.\\n";
        mats.erase(mats.begin() + idx);
        stock.erase(stock.begin() + idx);
        cout << "-> ✨ Bolsa reorganizada.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes y Crafteo
void craftearItem(vector<string>& mats, vector<int>& stock) {
    string buscado;
    cout << "Material a consumir en la pocion/crafteo: "; cin >> buscado;
    int pos = buscarMaterial(mats, buscado);
    if (pos != -1) {
        if (stock[pos] > 0) {
            stock[pos]--;
            cout << "-> 🔮 ¡Crafteo exitoso! Se uso 1x " << mats[pos] << ". Quedan: " << stock[pos] << " u.\\n";
        } else {
            cout << "-> ⚠️ Sin stock suficiente de " << mats[pos] << " para crafteo.\\n";
        }
    } else {
        cout << "-> ❌ Material no encontrado en el laboratorio.\\n";
    }
}

int main() {
    vector<string> mats = {"Mithril", "Polvo_Hada", "Escama_Dragon"};
    vector<int> stk = {3, 0, 5};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "  ALQUIMIA & CRAFTEO RPG (CRUD)  \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Recoger Material\\n";
        cout << "2. Listar Bolsa de Alquimia\\n";
        cout << "3. Buscar Material por Nombre\\n";
        cout << "4. Actualizar Stock Manual\\n";
        cout << "5. Descartar / Eliminar Material\\n";
        cout << "6. Craftear Pocion (Consumir Stock)\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarMaterial(mats, stk);
        } else if (opcion == 2) {
            listarAlquimia(mats, stk);
        } else if (opcion == 3) {
            string buscado;
            cout << "Material a buscar: "; cin >> buscado;
            int pos = buscarMaterial(mats, buscado);
            if (pos != -1) {
                cout << "-> 🔍 Encontrado en posicion [" << pos << "] | Stock: " << stk[pos] << " u.\\n";
            } else {
                cout << "-> ❌ Ingrediente no encontrado.\\n";
            }
        } else if (opcion == 4) {
            actualizarStock(stk);
        } else if (opcion == 5) {
            eliminarMaterial(mats, stk);
        } else if (opcion == 6) {
            craftearItem(mats, stk);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Laboratorio de alquimia cerrado.\\n";
    return 0;
}`,
    python: `def craftearItem(materiales, stock, materialBuscado):
    for i, m in enumerate(materiales):
        if m.lower() == materialBuscado.lower():
            if stock[i] > 0:
                stock[i] -= 1
                return "✨ Crafteo exitoso usando '" + m + "'. Stock restante: " + str(stock[i])
            else:
                return "⚠️ Sin stock de '" + m + "' para crafteo."
    return "❌ Material '" + materialBuscado + "' no existe en el saco."

materiales = ["Lingote de Mithril", "Polvo de Hada", "Escama de Dragón"]
stock = [3, 0, 5]
print(craftearItem(materiales, stock, "Lingote de Mithril"))`,
    java: `import java.util.ArrayList;

public class Main {
    public static boolean craftear(ArrayList<String> mats, ArrayList<Integer> stock, String buscado) {
        for (int i = 0; i < mats.size(); i++) {
            if (mats.get(i).equalsIgnoreCase(buscado) && stock.get(i) > 0) {
                stock.set(i, stock.get(i) - 1);
                return true;
            }
        }
        return false;
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static bool Craftear(List<string> mats, List<int> stock, string buscado) {
        int idx = mats.FindIndex(m => m.Equals(buscado, StringComparison.OrdinalIgnoreCase));
        if (idx != -1 && stock[idx] > 0) {
            stock[idx]--;
            return true;
        }
        return false;
    }
}`,
    javascript: `function craftear(mats, stock, buscado) {
  const i = mats.findIndex(m => m.toLowerCase() === buscado.toLowerCase());
  if (i !== -1 && stock[i] > 0) {
    stock[i]--;
    return true;
  }
  return false;
}`,
    php: `<?php
function craftear(&$mats, &$stock, $buscado) {
    foreach ($mats as $i => $m) {
        if (strcasecmp($m, $buscado) === 0 && $stock[$i] > 0) {
            $stock[$i]--;
            return true;
        }
    }
    return false;
}
?>`,
    pseint: `SubProceso exito <- craftear(mats, stock, n, buscado)
    exito <- Falso
    Para i <- 1 Hasta n Hacer
        Si mats[i] = buscado Y stock[i] > 0 Entonces
            stock[i] <- stock[i] - 1
            exito <- Verdadero
        FinSi
    FinPara
FinSubProceso`
  },

  // 6. Torneo Arcade Global: Leaderboard, Clasificación y Tabla de Récords
  6: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

// 1. Guardar / Crear
void guardarPartida(vector<string>& tags, vector<int>& scores) {
    string t; int s;
    cout << "Gamertag del jugador: "; cin >> t;
    cout << "Puntaje alcanzado: "; cin >> s;
    tags.push_back(t);
    scores.push_back(s);
    cout << "-> 🕹️ Record guardado en la maquina arcade.\\n";
}

// 2. Listar
void listarRanking(const vector<string>& tags, const vector<int>& scores) {
    cout << "\\n=== 🏆 TABLA DE CLASIFICACION ARCADE ===\\n";
    if (tags.empty()) {
        cout << "(Sin records registrados en la maquina).\\n";
        return;
    }
    for (size_t i = 0; i < tags.size(); i++) {
        cout << "#" << (i + 1) << " " << tags[i] << " - " << scores[i] << " PTS\\n";
    }
}

// 3. Buscar
int buscarJugador(const vector<string>& tags, const string& target) {
    for (size_t i = 0; i < tags.size(); i++) {
        if (tags[i] == target) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarPuntaje(vector<int>& scores) {
    int idx; int nuevoScore;
    cout << "Indice de jugador a actualizar score: "; cin >> idx;
    if (idx >= 0 && idx < (int)scores.size()) {
        cout << "Nuevo puntaje: "; cin >> nuevoScore;
        scores[idx] = nuevoScore;
        cout << "-> 🌟 Score actualizado con exito.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void eliminarJugador(vector<string>& tags, vector<int>& scores) {
    int idx;
    cout << "Indice de jugador descalificado a retirar: "; cin >> idx;
    if (idx >= 0 && idx < (int)tags.size()) {
        cout << "❌ " << tags[idx] << " retirado del torneo.\\n";
        tags.erase(tags.begin() + idx);
        scores.erase(scores.begin() + idx);
        cout << "-> ✨ Tabla reorganizada.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Ordenar y Reportes
void ordenarRanking(vector<string>& tags, vector<int>& scores) {
    if (scores.empty()) {
        cout << "(Sin partidas para ordenar).\\n";
        return;
    }
    for (size_t i = 0; i < scores.size(); i++) {
        for (size_t j = 0; j + 1 < scores.size() - i; j++) {
            if (scores[j] < scores[j + 1]) {
                swap(scores[j], scores[j + 1]);
                swap(tags[j], tags[j + 1]); // Sincronia de memoria paralela
            }
        }
    }
    cout << "-> 👑 Leaderboard ordenado de mayor a menor.\\n";
    cout << "🏆 Campeon del Torneo: " << tags[0] << " con " << scores[0] << " PTS\\n";
}

int main() {
    vector<string> tags = {"Viper_99", "NeonKnight", "CyberGhost"};
    vector<int> scores = {4500, 6200, 9950};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "  TORNEO ARCADE GLOBAL (CRUD)    \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Registrar Partida\\n";
        cout << "2. Listar Leaderboard Actual\\n";
        cout << "3. Buscar Jugador por Gamertag\\n";
        cout << "4. Actualizar Puntaje por Indice\\n";
        cout << "5. Descalificar / Eliminar Jugador\\n";
        cout << "6. Ordenar Leaderboard y Ver MVP\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarPartida(tags, scores);
        } else if (opcion == 2) {
            listarRanking(tags, scores);
        } else if (opcion == 3) {
            string target;
            cout << "Gamertag a buscar: "; cin >> target;
            int pos = buscarJugador(tags, target);
            if (pos != -1) {
                cout << "-> 🔍 Jugador encontrado en posicion [" << pos << "] con " << scores[pos] << " PTS\\n";
            } else {
                cout << "-> ❌ Gamertag no encontrado en el torneo.\\n";
            }
        } else if (opcion == 4) {
            actualizarPuntaje(scores);
        } else if (opcion == 5) {
            eliminarJugador(tags, scores);
        } else if (opcion == 6) {
            ordenarRanking(tags, scores);
            listarRanking(tags, scores);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Maquina arcade en reposo.\\n";
    return 0;
}`,
    python: `def ordenarRanking(gamertags, puntajes):
    combinados = sorted(zip(puntajes, gamertags), reverse=True)
    print("🏆 === TOP HIGHSCORES ARCADE ===")
    for rank, (score, tag) in enumerate(combinados, 1):
        print("#" + str(rank) + " " + tag + " - " + str(score) + " PTS")

gamertags = ["Viper_99", "ShadowLord", "NeonKnight", "CyberGhost"]
puntajes = [4500, 8900, 6200, 9950]
ordenarRanking(gamertags, puntajes)`,
    java: `import java.util.ArrayList;

public class Main {
    public static void ordenarRanking(ArrayList<String> tags, ArrayList<Integer> scores) {
        for (int i = 0; i < scores.size() - 1; i++) {
            for (int j = 0; j < scores.size() - i - 1; j++) {
                if (scores.get(j) < scores.get(j + 1)) {
                    int tmpS = scores.get(j);
                    scores.set(j, scores.get(j + 1));
                    scores.set(j + 1, tmpS);
                    String tmpT = tags.get(j);
                    tags.set(j, tags.get(j + 1));
                    tags.set(j + 1, tmpT);
                }
            }
        }
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static void OrdenarRanking(List<string> tags, List<int> scores) {
        for (int i = 0; i < scores.Count - 1; i++) {
            for (int j = 0; j < scores.Count - i - 1; j++) {
                if (scores[j] < scores[j + 1]) {
                    int ts = scores[j]; scores[j] = scores[j + 1]; scores[j + 1] = ts;
                    string tt = tags[j]; tags[j] = tags[j + 1]; tags[j + 1] = tt;
                }
            }
        }
    }
}`,
    javascript: `function ranking(tags, scores) {
  const data = tags.map((t, i) => ({ tag: t, score: scores[i] }))
                   .sort((a, b) => b.score - a.score);
  data.forEach((d, i) => console.log("#" + (i + 1) + " " + d.tag + " - " + d.score + " PTS"));
}`,
    php: `<?php
function ranking($tags, $scores) {
    array_multisort($scores, SORT_DESC, $tags);
    foreach ($tags as $i => $t) {
        echo "#" . ($i + 1) . " " . $t . " - " . $scores[$i] . " PTS\\n";
    }
}
?>`,
    pseint: `SubProceso ordenarRanking(tags, scores, n)
    Para i <- 1 Hasta n - 1 Hacer
        Para j <- 1 Hasta n - i Hacer
            Si scores[j] < scores[j+1] Entonces
                auxS <- scores[j]
                scores[j] <- scores[j+1]
                scores[j+1] <- auxS
                auxT <- tags[j]
                tags[j] <- tags[j+1]
                tags[j+1] <- auxT
            FinSi
        FinPara
    FinPara
FinSubProceso`
  },

  // 7. Dungeon Crawler MMORPG: Servidor de Mazmorras, Salas y Partidas
  7: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarSala(vector<int>& salas, vector<string>& estados, vector<string>& lideres) {
    int s;
    cout << "Numero de mazmorra a habilitar: "; cin >> s;
    salas.push_back(s);
    estados.push_back("LIBRE");
    lideres.push_back("-");
    cout << "-> 🏰 Mazmorra [" << s << "] habilitada en el servidor.\\n";
}

// 2. Listar
void listarSalas(const vector<int>& salas, const vector<string>& estados, const vector<string>& lideres) {
    cout << "\\n=== 🏰 SERVIDOR DE DUNGEONS & RAIDS ===\\n";
    if (salas.empty()) {
        cout << "(Sin mazmorras activas en el servidor).\\n";
        return;
    }
    for (size_t i = 0; i < salas.size(); i++) {
        cout << "[Sala " << salas[i] << "] Estado: " << estados[i] << " | Lider: " << lideres[i] << "\\n";
    }
}

// 3. Buscar
int buscarSala(const vector<int>& salas, int numSala) {
    for (size_t i = 0; i < salas.size(); i++) {
        if (salas[i] == numSala) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar / Entrar
void entrarSala(const vector<int>& salas, vector<string>& estados, vector<string>& lideres) {
    int s; string lid;
    cout << "Numero de sala a ingresar: "; cin >> s;
    int pos = buscarSala(salas, s);
    if (pos != -1) {
        if (estados[pos] == "LIBRE") {
            cout << "Nombre de lider / Clan de la Party: "; cin >> lid;
            estados[pos] = "EN_COMBATE";
            lideres[pos] = lid;
            cout << "-> ⚔️ ¡Combate iniciado en Sala " << s << "! Lider: " << lid << "\\n";
        } else {
            cout << "-> ⚠️ La sala " << s << " ya esta ocupada en combate.\\n";
        }
    } else {
        cout << "-> ❌ Numero de sala no existe.\\n";
    }
}

// 5. Eliminar
void eliminarSala(vector<int>& salas, vector<string>& estados, vector<string>& lideres) {
    int idx;
    cout << "Indice de sala a retirar del servidor: "; cin >> idx;
    if (idx >= 0 && idx < (int)salas.size()) {
        cout << "💥 Mazmorra [" << salas[idx] << "] dada de baja.\\n";
        salas.erase(salas.begin() + idx);
        estados.erase(estados.begin() + idx);
        lideres.erase(lideres.begin() + idx);
        cout << "-> ✨ Lista de salas actualizada.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes
void reporteSalas(const vector<int>& salas, const vector<string>& estados, const vector<string>& lideres) {
    cout << "\\n📊 === REPORTE DE OCUPACION DE DUNGEONS ===\\n";
    int libres = 0; int enCombate = 0;
    for (size_t i = 0; i < salas.size(); i++) {
        if (estados[i] == "LIBRE") {
            libres++;
        } else {
            enCombate++;
        }
    }
    cout << "Total Mazmorras: " << salas.size() << " | Libres: " << libres << " | En Combate: " << enCombate << "\\n";
}

int main() {
    vector<int> salas = {101, 102, 103};
    vector<string> estados = {"LIBRE", "EN_COMBATE", "LIBRE"};
    vector<string> lideres = {"-", "LordVoldemort", "-"};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "  SERVIDOR DE MAZMORRAS (CRUD)   \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Habilitar Mazmorra\\n";
        cout << "2. Listar Estado de Mazmorras\\n";
        cout << "3. Buscar Mazmorra por Numero\\n";
        cout << "4. Ingresar Party (Asignar Combate)\\n";
        cout << "5. Eliminar / Dar de Baja Sala\\n";
        cout << "6. Reporte de Ocupacion\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarSala(salas, estados, lideres);
        } else if (opcion == 2) {
            listarSalas(salas, estados, lideres);
        } else if (opcion == 3) {
            int num;
            cout << "Numero de sala a buscar: "; cin >> num;
            int pos = buscarSala(salas, num);
            if (pos != -1) {
                cout << "-> 🔍 Localizada en indice [" << pos << "] | Estado: " << estados[pos] << " | Lider: " << lideres[pos] << "\\n";
            } else {
                cout << "-> ❌ Sala no encontrada.\\n";
            }
        } else if (opcion == 4) {
            entrarSala(salas, estados, lideres);
        } else if (opcion == 5) {
            eliminarSala(salas, estados, lideres);
        } else if (opcion == 6) {
            reporteSalas(salas, estados, lideres);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Servidor de mazmorras desconectado.\\n";
    return 0;
}`,
    python: `def entrarSala(salas, estados, lideres, numSala, liderParty):
    for i, num in enumerate(salas):
        if num == numSala:
            if estados[i] == "LIBRE":
                estados[i] = "EN_COMBATE"
                lideres[i] = liderParty
                return "⚔️ Party '" + liderParty + "' ingresó a Sala [" + str(numSala) + "]."
            else:
                return "❌ Sala [" + str(numSala) + "] ocupada por otra party."
    return "❌ Número de sala inexistente."

salas = [101, 102, 103]
estados = ["LIBRE", "EN_COMBATE", "LIBRE"]
lideres = ["-", "LordVoldemort", "-"]
print(entrarSala(salas, estados, lideres, 101, "GremioFénix"))`,
    java: `import java.util.ArrayList;

public class Main {
    public static boolean entrarSala(ArrayList<Integer> salas, ArrayList<String> estados, ArrayList<String> lideres, int sala, String lider) {
        for (int i = 0; i < salas.size(); i++) {
            if (salas.get(i) == sala && estados.get(i).equals("LIBRE")) {
                estados.set(i, "EN_COMBATE");
                lideres.set(i, lider);
                return true;
            }
        }
        return false;
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static bool EntrarSala(List<int> salas, List<string> estados, List<string> lideres, int sala, string lider) {
        int idx = salas.IndexOf(sala);
        if (idx != -1 && estados[idx] == "LIBRE") {
            estados[idx] = "EN_COMBATE";
            lideres[idx] = lider;
            return true;
        }
        return false;
    }
}`,
    javascript: `function entrarSala(salas, estados, lideres, sala, lider) {
  const i = salas.indexOf(sala);
  if (i !== -1 && estados[i] === "LIBRE") {
    estados[i] = "EN_COMBATE";
    lideres[i] = lider;
    return true;
  }
  return false;
}`,
    php: `<?php
function entrarSala($salas, &$estados, &$lideres, $sala, $lider) {
    $i = array_search($sala, $salas);
    if ($i !== false && $estados[$i] === "LIBRE") {
        $estados[$i] = "EN_COMBATE";
        $lideres[$i] = $lider;
        return true;
    }
    return false;
}
?>`,
    pseint: `SubProceso exito <- entrarSala(salas, estados, lideres, n, sala, lider)
    exito <- Falso
    Para i <- 1 Hasta n Hacer
        Si salas[i] = sala Y estados[i] = "LIBRE" Entonces
            estados[i] <- "EN_COMBATE"
            lideres[i] <- lider
            exito <- Verdadero
        FinSi
    FinPara
FinSubProceso`
  },

  // 8. Supervivencia Post-Apocalíptica: Mochila Táctica, Municiones y Alertas HUD
  8: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarRecurso(vector<string>& sum, vector<int>& cant) {
    string r; int c;
    cout << "Nombre del suministro: "; cin >> r;
    cout << "Unidades encontradas: "; cin >> c;
    sum.push_back(r);
    cant.push_back(c);
    cout << "-> 🎒 Recurso guardado en la mochila tactica.\\n";
}

// 2. Listar
void listarMochila(const vector<string>& sum, const vector<int>& cant) {
    cout << "\\n=== 🎒 INVENTARIO TACTICO DE SUPERVIVENCIA ===\\n";
    if (sum.empty()) {
        cout << "(Mochila vacia. Busca provisiones en la zona).\\n";
        return;
    }
    for (size_t i = 0; i < sum.size(); i++) {
        cout << "[" << i << "] " << sum[i] << " - " << cant[i] << " unidades\\n";
    }
}

// 3. Buscar
int buscarRecurso(const vector<string>& sum, const string& target) {
    for (size_t i = 0; i < sum.size(); i++) {
        if (sum[i] == target) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarCantidad(vector<int>& cant) {
    int idx; int nuevaCant;
    cout << "Indice de suministro a modificar: "; cin >> idx;
    if (idx >= 0 && idx < (int)cant.size()) {
        cout << "Nueva cantidad disponible: "; cin >> nuevaCant;
        cant[idx] = nuevaCant;
        cout << "-> 📦 Cantidad actualizada.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void eliminarRecurso(vector<string>& sum, vector<int>& cant) {
    int idx;
    cout << "Indice de item a descartar: "; cin >> idx;
    if (idx >= 0 && idx < (int)sum.size()) {
        cout << "🗑️ " << sum[idx] << " descartado de la mochila.\\n";
        sum.erase(sum.begin() + idx);
        cant.erase(cant.begin() + idx);
        cout << "-> ✨ Espacio liberado en la mochila.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes y Alerta HUD
void alertaRecursosCriticos(const vector<string>& sum, const vector<int>& cant, int minVal) {
    cout << "\\n⚠️ === ALERTA HUD: SUMINISTROS CRITICOS (< " << minVal << " u.) ===\\n";
    int criticos = 0;
    for (size_t i = 0; i < sum.size(); i++) {
        if (cant[i] < minVal) {
            cout << "- 🔻 " << sum[i] << " (" << cant[i] << " unidades restantes ¡Peligro!)\\n";
            criticos++;
        }
    }
    if (criticos == 0) {
        cout << "-> ✅ Todos los suministros estan sobre el nivel seguro.\\n";
    }
}

int main() {
    vector<string> sum = {"Balas_5.56mm", "Botiquines", "Granadas_IEM"};
    vector<int> cant = {2, 14, 3};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "  MOCHILA DE SUPERVIVENCIA (CRUD)\\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Recoger Suministro\\n";
        cout << "2. Listar Mochila Tactica\\n";
        cout << "3. Buscar Suministro por Nombre\\n";
        cout << "4. Actualizar Cantidad por Indice\\n";
        cout << "5. Descartar / Eliminar Item\\n";
        cout << "6. Alerta HUD (Recursos Criticos)\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarRecurso(sum, cant);
        } else if (opcion == 2) {
            listarMochila(sum, cant);
        } else if (opcion == 3) {
            string target;
            cout << "Nombre del item a buscar: "; cin >> target;
            int pos = buscarRecurso(sum, target);
            if (pos != -1) {
                cout << "-> 🔍 Localizado en posicion [" << pos << "] | Cantidad: " << cant[pos] << " u.\\n";
            } else {
                cout << "-> ❌ Suministro no encontrado en la mochila.\\n";
            }
        } else if (opcion == 4) {
            actualizarCantidad(cant);
        } else if (opcion == 5) {
            eliminarRecurso(sum, cant);
        } else if (opcion == 6) {
            alertaRecursosCriticos(sum, cant, 5);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Mochila asegurada.\\n";
    return 0;
}`,
    python: `def alertaRecursosCriticos(suministros, cantidades, umbralMinimo=5):
    print("⚠️ === ALERTA HUD: RECURSOS CRÍTICOS (Menos de " + str(umbralMinimo) + " u.) ===")
    criticos = []
    for i, cant in enumerate(cantidades):
        if cant < umbralMinimo:
            criticos.append((suministros[i], cant))
            print("- 🔻 " + suministros[i] + ": solo " + str(cant) + " unidades disponibles.")
    return criticos

suministros = ["Balas 5.56mm", "Botiquines Médicos", "Granadas IEM"]
cantidades = [2, 14, 3]
alertaRecursosCriticos(suministros, cantidades, 5)`,
    java: `import java.util.ArrayList;

public class Main {
    public static void alertaRecursos(ArrayList<String> sum, ArrayList<Integer> cant, int minVal) {
        System.out.println("⚠️ ALERTA HUD: SUMINISTROS CRÍTICOS:");
        for (int i = 0; i < sum.size(); i++) {
            if (cant.get(i) < minVal) {
                System.out.println("- 🔻 " + sum.get(i) + " (" + cant.get(i) + " un.)");
            }
        }
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static void AlertaRecursos(List<string> sum, List<int> cant, int minVal) {
        for (int i = 0; i < sum.Count; i++) {
            if (cant[i] < minVal) {
                Console.WriteLine("- 🔻 {0} ({1} un.)", sum[i], cant[i]);
            }
        }
    }
}`,
    javascript: `function alertaRecursos(sum, cant, minVal = 5) {
  sum.forEach((s, i) => {
    if (cant[i] < minVal) {
      console.log("- 🔻 " + s + " (" + cant[i] + " un.)");
    }
  });
}
alertaRecursos(["Balas 5.56mm", "Granadas IEM"], [2, 15], 5);`,
    php: `<?php
function alertaRecursos($sum, $cant, $minVal = 5) {
    foreach ($sum as $i => $s) {
        if ($cant[$i] < $minVal) {
            echo "- 🔻 " . $s . " (" . $cant[$i] . " un.)\\n";
        }
    }
}
?>`,
    pseint: `SubProceso alertaRecursos(sum, cant, n, minVal)
    Escribir "⚠️ ALERTA HUD: SUMINISTROS CRÍTICOS:"
    Para i <- 1 Hasta n Hacer
        Si cant[i] < minVal Entonces
            Escribir "- 🔻 ", sum[i], " (", cant[i], " un.)"
        FinSi
    FinPara
FinSubProceso`
  },

  // 9. Domador de Criaturas RPG: Bestiario, Afinidades Elementales y Capturas
  9: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarCriatura(vector<string>& nom, vector<string>& ele, vector<float>& cp) {
    string n, e; float p;
    cout << "Nombre de especie: "; cin >> n;
    cout << "Elemento afin: "; cin >> e;
    cout << "Poder de combate CP: "; cin >> p;
    nom.push_back(n);
    ele.push_back(e);
    cp.push_back(p);
    cout << "-> 🍃 Criatura capturada y registrada en el bestiario.\\n";
}

// 2. Listar
void listarBestiario(const vector<string>& nom, const vector<string>& ele, const vector<float>& cp) {
    cout << "\\n=== 🐾 BESTIARIO DEL DOMADOR ===\\n";
    if (nom.empty()) {
        cout << "(Bestiario vacio. Explora la region para capturar criaturas).\\n";
        return;
    }
    for (size_t i = 0; i < nom.size(); i++) {
        cout << "[" << i << "] " << nom[i] << " [" << ele[i] << "] - CP: " << cp[i] << "\\n";
    }
}

// 3. Buscar
int buscarCriatura(const vector<string>& nom, const string& target) {
    for (size_t i = 0; i < nom.size(); i++) {
        if (nom[i] == target) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarPoder(vector<float>& cp) {
    int idx; float nuevoCP;
    cout << "Indice de criatura a entrenar: "; cin >> idx;
    if (idx >= 0 && idx < (int)cp.size()) {
        cout << "Nuevo CP de combate: "; cin >> nuevoCP;
        cp[idx] = nuevoCP;
        cout << "-> ⚡ CP aumentado con exito tras el entrenamiento.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void liberarCriatura(vector<string>& nom, vector<string>& ele, vector<float>& cp) {
    int idx;
    cout << "Indice de criatura a liberar a la naturaleza: "; cin >> idx;
    if (idx >= 0 && idx < (int)nom.size()) {
        cout << "🍃 " << nom[idx] << " [" << ele[idx] << "] liberada al bosque.\\n";
        nom.erase(nom.begin() + idx);
        ele.erase(ele.begin() + idx);
        cp.erase(cp.begin() + idx);
        cout << "-> ✨ Bestiario actualizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Reportes
void reporteMaxCP(const vector<string>& nom, const vector<string>& ele, const vector<float>& cp) {
    cout << "\\n👑 === CRIATURA LEGENDARIA MVP (MAYOR CP) ===\\n";
    if (nom.empty()) {
        cout << "(Sin criaturas en el bestiario).\\n";
        return;
    }
    int maxIdx = 0;
    for (size_t i = 0; i < cp.size(); i++) {
        if (cp[i] > cp[maxIdx]) {
            maxIdx = (int)i;
        }
    }
    cout << "Criatura Legendaria: " << nom[maxIdx] << " [" << ele[maxIdx] << "] con " << cp[maxIdx] << " CP\\n";
}

int main() {
    vector<string> nom = {"Ignisaur", "Aquafox", "Thundercat"};
    vector<string> ele = {"FUEGO", "AGUA", "RAYO"};
    vector<float> cp = {1250.0f, 890.0f, 1540.0f};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "   BESTIARIO DEL DOMADOR (CRUD)  \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Capturar Criatura\\n";
        cout << "2. Listar Bestiario Completo\\n";
        cout << "3. Buscar Criatura por Nombre\\n";
        cout << "4. Entrenar / Aumentar CP\\n";
        cout << "5. Liberar Criatura a la Naturaleza\\n";
        cout << "6. Reporte Criatura con Mayor CP\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarCriatura(nom, ele, cp);
        } else if (opcion == 2) {
            listarBestiario(nom, ele, cp);
        } else if (opcion == 3) {
            string target;
            cout << "Nombre de especie a buscar: "; cin >> target;
            int pos = buscarCriatura(nom, target);
            if (pos != -1) {
                cout << "-> 🔍 Localizada en posicion [" << pos << "] [" << ele[pos] << "] con " << cp[pos] << " CP\\n";
            } else {
                cout << "-> ❌ Criatura no avistada en el bestiario.\\n";
            }
        } else if (opcion == 4) {
            actualizarPoder(cp);
        } else if (opcion == 5) {
            liberarCriatura(nom, ele, cp);
        } else if (opcion == 6) {
            reporteMaxCP(nom, ele, cp);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Bestiario cerrado.\\n";
    return 0;
}`,
    python: `def liberarCriatura(nombres, elementos, poderCP, idx):
    if 0 <= idx < len(nombres):
        nom = nombres.pop(idx)
        ele = elementos.pop(idx)
        cp = poderCP.pop(idx)
        return "🍃 Criatura liberada al hábitat salvaje: '" + nom + "' [" + ele + ", " + str(cp) + " CP]."
    return "❌ Índice de criatura no válido."

nombres = ["Ignisaur", "Aquafox", "Thundercat"]
elementos = ["FUEGO", "AGUA", "RAYO"]
poderCP = [1250.0, 890.0, 1540.0]
print(liberarCriatura(nombres, elementos, poderCP, 0))`,
    java: `import java.util.ArrayList;

public class Main {
    public static void liberarCriatura(ArrayList<String> nom, ArrayList<String> ele, ArrayList<Double> cp, int idx) {
        if (idx >= 0 && idx < nom.size()) {
            System.out.println("🍃 Liberado: " + nom.remove(idx) + " [" + ele.remove(idx) + "]");
            cp.remove(idx);
        }
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static void LiberarCriatura(List<string> nom, List<string> ele, List<double> cp, int idx) {
        if (idx >= 0 && idx < nom.Count) {
            Console.WriteLine("🍃 Liberado: {0} [{1}]", nom[idx], ele[idx]);
            nom.RemoveAt(idx);
            ele.RemoveAt(idx);
            cp.RemoveAt(idx);
        }
    }
}`,
    javascript: `function liberarCriatura(nom, ele, cp, idx) {
  if (idx >= 0 && idx < nom.length) {
    const n = nom.splice(idx, 1)[0];
    ele.splice(idx, 1);
    cp.splice(idx, 1);
    console.log("🍃 Criatura liberada: " + n);
  }
}`,
    php: `<?php
function liberarCriatura(&$nom, &$ele, &$cp, $idx) {
    if (isset($nom[$idx])) {
        echo "🍃 Liberado: " . $nom[$idx] . "\\n";
        array_splice($nom, $idx, 1);
        array_splice($ele, $idx, 1);
        array_splice($cp, $idx, 1);
    }
}
?>`,
    pseint: `SubProceso liberarCriatura(nom, ele, cp, n, idx)
    Escribir "🍃 Criatura liberada: ", nom[idx]
    Para i <- idx Hasta n - 1 Hacer
        nom[i] <- nom[i+1]
        ele[i] <- ele[i+1]
        cp[i] <- cp[i+1]
    FinPara
FinSubProceso`
  },

  // 10. Tienda Gacha & Pase de Batalla: Catálogo de Skins, Canjes y Auditoría
  10: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Guardar / Crear
void guardarSkin(vector<string>& skins, vector<int>& stock, vector<float>& costos) {
    string s; int stk; float c;
    cout << "Nombre de skin: "; cin >> s;
    cout << "Stock inicial disponible: "; cin >> stk;
    cout << "Costo en gemas: "; cin >> c;
    skins.push_back(s);
    stock.push_back(stk);
    costos.push_back(c);
    cout << "-> 🎟️ Skin agregada a la tienda de temporada.\\n";
}

// 2. Listar
void listarTienda(const vector<string>& skins, const vector<int>& stock, const vector<float>& costos) {
    cout << "\\n=== 🎟️ TIENDA GACHA & PASE DE BATALLA ===\\n";
    if (skins.empty()) {
        cout << "(Catalogo vacio. No hay skins disponibles).\\n";
        return;
    }
    for (size_t i = 0; i < skins.size(); i++) {
        cout << "[" << i << "] " << skins[i] << " - Stock: " << stock[i] << " disp. - " << costos[i] << " Gemas\\n";
    }
}

// 3. Buscar
int buscarSkin(const vector<string>& skins, const string& target) {
    for (size_t i = 0; i < skins.size(); i++) {
        if (skins[i] == target) {
            return (int)i;
        }
    }
    return -1;
}

// 4. Actualizar
void actualizarStock(vector<int>& stock) {
    int idx; int nuevoStock;
    cout << "Indice de skin a modificar stock: "; cin >> idx;
    if (idx >= 0 && idx < (int)stock.size()) {
        cout << "Nuevo stock disponible: "; cin >> nuevoStock;
        stock[idx] = nuevoStock;
        cout << "-> 📦 Stock actualizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 5. Eliminar
void eliminarSkin(vector<string>& skins, vector<int>& stock, vector<float>& costos) {
    int idx;
    cout << "Indice de skin a retirar de la tienda: "; cin >> idx;
    if (idx >= 0 && idx < (int)skins.size()) {
        cout << "🗑️ " << skins[idx] << " retirada de la rotacion.\\n";
        skins.erase(skins.begin() + idx);
        stock.erase(stock.begin() + idx);
        costos.erase(costos.begin() + idx);
        cout << "-> ✨ Catalogo actualizado.\\n";
    } else {
        cout << "-> ❌ Indice invalido.\\n";
    }
}

// 6. Canjear y Reportes
void canjearSkin(vector<string>& skins, vector<int>& stock, const vector<float>& costos) {
    string skin; int cant;
    cout << "Nombre de skin a canjear: "; cin >> skin;
    int pos = buscarSkin(skins, skin);
    if (pos != -1) {
        cout << "Cantidad a comprar: "; cin >> cant;
        if (stock[pos] >= cant && cant > 0) {
            stock[pos] -= cant;
            float totalGemas = cant * costos[pos];
            cout << "-> ✨ ¡Canje exitoso! Pagaste " << totalGemas << " Gemas por " << cant << "x " << skins[pos] << ".\\n";
            cout << "   Stock restante en tienda: " << stock[pos] << " u.\\n";
        } else {
            cout << "-> ❌ Stock insuficiente (solo quedan " << stock[pos] << " u.).\\n";
        }
    } else {
        cout << "-> ❌ Skin no encontrada en la tienda.\\n";
    }
}

int main() {
    vector<string> skins = {"Cyber_Samurai", "Neon_Valkyrie", "Mecha_Dragon"};
    vector<int> stock = {10, 2, 5};
    vector<float> costos = {1200.0f, 2500.0f, 5000.0f};
    int opcion = 0;

    do {
        cout << "\\n=================================\\n";
        cout << "  TIENDA GACHA & SKINS (CRUD)    \\n";
        cout << "=================================\\n";
        cout << "1. Guardar / Añadir Skin al Pase\\n";
        cout << "2. Listar Tienda y Precios\\n";
        cout << "3. Buscar Skin por Nombre\\n";
        cout << "4. Actualizar Stock Disponible\\n";
        cout << "5. Retirar / Eliminar Skin\\n";
        cout << "6. Canjear Skin con Gemas\\n";
        cout << "7. Salir\\n";
        cout << "Seleccione una opcion (1-7): "; cin >> opcion;

        if (opcion == 1) {
            guardarSkin(skins, stock, costos);
        } else if (opcion == 2) {
            listarTienda(skins, stock, costos);
        } else if (opcion == 3) {
            string target;
            cout << "Nombre de skin a buscar: "; cin >> target;
            int pos = buscarSkin(skins, target);
            if (pos != -1) {
                cout << "-> 🔍 Localizada en posicion [" << pos << "] | Costo: " << costos[pos] << " Gemas | Stock: " << stock[pos] << " u.\\n";
            } else {
                cout << "-> ❌ Skin no encontrada.\\n";
            }
        } else if (opcion == 4) {
            actualizarStock(stock);
        } else if (opcion == 5) {
            eliminarSkin(skins, stock, costos);
        } else if (opcion == 6) {
            canjearSkin(skins, stock, costos);
        } else if (opcion != 7) {
            cout << "-> ⚠️ Opcion no valida.\\n";
        }
    } while (opcion != 7);

    cout << "-> Tienda gacha cerrada.\\n";
    return 0;
}`,
    python: `def canjearSkin(skins, stock, costos, skinBuscada, cant):
    for i, s in enumerate(skins):
        if s.lower() == skinBuscada.lower():
            if stock[i] >= cant:
                stock[i] -= cant
                totalGemas = cant * costos[i]
                return "🎟️ Canje exitoso: " + str(cant) + "x '" + s + "'. Costo: " + str(totalGemas) + " Gemas (Quedan: " + str(stock[i]) + ")"
            else:
                return "❌ Stock insuficiente. Solo quedan " + str(stock[i]) + " skins de '" + s + "'."
    return "❌ Skin no disponible en la tienda del pase."

skins = ["Cyber Samurai", "Neon Valkyrie", "Mecha Dragon"]
stock = [10, 2, 5]
costos = [1200.0, 2500.0, 5000.0]
print(canjearSkin(skins, stock, costos, "Neon Valkyrie", 1))`,
    java: `import java.util.ArrayList;

public class Main {
    public static double canjear(ArrayList<String> skins, ArrayList<Integer> stock, ArrayList<Double> costos, String skin, int cant) {
        for (int i = 0; i < skins.size(); i++) {
            if (skins.get(i).equalsIgnoreCase(skin) && stock.get(i) >= cant) {
                stock.set(i, stock.get(i) - cant);
                return cant * costos.get(i);
            }
        }
        return -1.0;
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class Program {
    static double Canjear(List<string> skins, List<int> stock, List<double> costos, string skin, int cant) {
        int idx = skins.FindIndex(s => s.Equals(skin, StringComparison.OrdinalIgnoreCase));
        if (idx != -1 && stock[idx] >= cant) {
            stock[idx] -= cant;
            return cant * costos[idx];
        }
        return -1.0;
    }
}`,
    cpp_full: ``,
    javascript: `function canjear(skins, stock, costos, skin, cant) {
  const i = skins.findIndex(s => s.toLowerCase() === skin.toLowerCase());
  if (i !== -1 && stock[i] >= cant) {
    stock[i] -= cant;
    return cant * costos[i];
  }
  return -1;
}`,
    php: `<?php
function canjear($skins, &$stock, $costos, $skin, $cant) {
    foreach ($skins as $i => $s) {
        if (strcasecmp($s, $skin) === 0 && $stock[$i] >= $cant) {
            $stock[$i] -= $cant;
            return $cant * $costos[$i];
        }
    }
    return -1;
}
?>`,
    pseint: `SubProceso total <- canjear(skins, stock, costos, n, skin, cant)
    total <- -1
    Para i <- 1 Hasta n Hacer
        Si skins[i] = skin Y stock[i] >= cant Entonces
            stock[i] <- stock[i] - cant
            total <- cant * costos[i]
        FinSi
    FinPara
FinSubProceso`
  }
};
