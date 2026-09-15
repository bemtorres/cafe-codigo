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
  },

  // 11. 🧪 Tienda de Pociones → nombre, cantidad, precio
  11: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

void guardarPocion(vector<string>& nom, vector<int>& cant, vector<float>& pre) {
    string n; int c; float p;
    cout << "\\n--- NUEVA POCION ---\\n";
    cout << "Nombre de la pocion: "; cin >> n;
    cout << "Cantidad en frascos: "; cin >> c;
    cout << "Precio en monedas de oro: "; cin >> p;
    nom.push_back(n);
    cant.push_back(c);
    pre.push_back(p);
    cout << "-> [OK] Pocion registrada con exito.\\n";
}

void listarPociones(const vector<string>& nom, const vector<int>& cant, const vector<float>& pre) {
    cout << "\\n=== 🧪 ESTANTERIA DE POCIONES (TOTAL: " << nom.size() << ") ===\\n";
    if (nom.empty()) {
        cout << "(Almacen vacio)\\n";
        return;
    }
    for (size_t i = 0; i < nom.size(); i++) {
        cout << "[" << i << "] " << nom[i] << " | Stock: " << cant[i] << " frascos | Precio: " << pre[i] << " Oro\\n";
    }
}

int buscarPocion(const vector<string>& nom, const string& buscada) {
    for (size_t i = 0; i < nom.size(); i++) {
        if (nom[i] == buscada) return (int)i;
    }
    return -1;
}

void actualizarPocion(vector<int>& cant, vector<float>& pre) {
    int idx;
    cout << "Indice de la pocion a modificar: "; cin >> idx;
    if (idx >= 0 && idx < (int)cant.size()) {
        cout << "Nuevo stock disponible: "; cin >> cant[idx];
        cout << "Nuevo precio en oro: "; cin >> pre[idx];
        cout << "-> [OK] Datos actualizados.\\n";
    } else {
        cout << "-> [ERROR] Indice invalido.\\n";
    }
}

void eliminarPocion(vector<string>& nom, vector<int>& cant, vector<float>& pre) {
    int idx;
    cout << "Indice de la pocion a eliminar: "; cin >> idx;
    if (idx >= 0 && idx < (int)nom.size()) {
        nom.erase(nom.begin() + idx);
        cant.erase(cant.begin() + idx);
        pre.erase(pre.begin() + idx);
        cout << "-> [OK] Pocion eliminada de ambos vectores.\\n";
    } else {
        cout << "-> [ERROR] Indice invalido.\\n";
    }
}

void reportesPociones(const vector<string>& nom, const vector<int>& cant, const vector<float>& pre) {
    if (nom.empty()) {
        cout << "-> Sin registros para auditoria.\\n";
        return;
    }
    int idxMax = 0, idxMinStock = 0;
    float valorTotal = 0;
    for (size_t i = 0; i < nom.size(); i++) {
        valorTotal += (cant[i] * pre[i]);
        if (pre[i] > pre[idxMax]) idxMax = (int)i;
        if (cant[i] < cant[idxMinStock]) idxMinStock = (int)i;
    }
    cout << "\\n=== 📊 REPORTE ALQUIMICO DE BOTELLAS ===\\n";
    cout << "1. Pocion mas costosa: " << nom[idxMax] << " (" << pre[idxMax] << " Oro)\\n";
    cout << "2. Menor stock: " << nom[idxMinStock] << " (" << cant[idxMinStock] << " frascos)\\n";
    cout << "3. Valor total en inventario: " << valorTotal << " Oro\\n";
    cout << "4. Alerta de stock critico (< 5 frascos):\\n";
    bool hayCritico = false;
    for (size_t i = 0; i < nom.size(); i++) {
        if (cant[i] < 5) {
            cout << "   - " << nom[i] << ": solo " << cant[i] << " frascos disponibles\\n";
            hayCritico = true;
        }
    }
    if (!hayCritico) cout << "   (Ninguna pocion en nivel critico)\\n";
}

int main() {
    vector<string> nombres = {"Curacion_Mayor", "Mana_Puro", "Veneno_Cobra"};
    vector<int> cantidades = {12, 3, 20};
    vector<float> precios = {45.5f, 80.0f, 25.0f};
    int op = 0;
    do {
        cout << "\\n--- TIENDA DE POCIONES ---\\n";
        cout << "1. Guardar pocion\\n2. Listar estanteria\\n3. Buscar pocion\\n4. Actualizar stock/precio\\n5. Eliminar pocion\\n6. Reportes y auditoria\\n7. Salir\\nOpcion: ";
        cin >> op;
        if (op == 1) guardarPocion(nombres, cantidades, precios);
        else if (op == 2) listarPociones(nombres, cantidades, precios);
        else if (op == 3) {
            string b; cout << "Nombre a buscar: "; cin >> b;
            int pos = buscarPocion(nombres, b);
            if (pos != -1) cout << "-> Encontrada en [" << pos << "] | Stock: " << cantidades[pos] << " | Precio: " << precios[pos] << "\\n";
            else cout << "-> No encontrada.\\n";
        }
        else if (op == 4) actualizarPocion(cantidades, precios);
        else if (op == 5) eliminarPocion(nombres, cantidades, precios);
        else if (op == 6) reportesPociones(nombres, cantidades, precios);
    } while (op != 7);
    return 0;
}`,
    python: `def guardar_pocion(nombres, cantidades, precios):
    nom = input("Nombre de la pocion: ")
    cant = int(input("Cantidad de frascos: "))
    pre = float(input("Precio en oro: "))
    nombres.append(nom)
    cantidades.append(cant)
    precios.append(pre)
    print("-> [OK] Pocion guardada.")

def listar_pociones(nombres, cantidades, precios):
    print("\\n=== 🧪 INVENTARIO DE POCIONES ===")
    if not nombres:
        print("(Almacen vacio)")
        return
    for i in range(len(nombres)):
        print(f"[{i}] {nombres[i]} | Stock: {cantidades[i]} frascos | Precio: " + str(precios[i]) + " Oro")

def buscar_pocion(nombres, buscada):
    for i, n in enumerate(nombres):
        if n.lower() == buscada.lower():
            return i
    return -1

def actualizar_pocion(cantidades, precios):
    idx = int(input("Indice de la pocion: "))
    if 0 <= idx < len(cantidades):
        cantidades[idx] = int(input("Nuevo stock: "))
        precios[idx] = float(input("Nuevo precio: "))
        print("-> [OK] Actualizado con exito.")
    else:
        print("-> [ERROR] Indice invalido.")

def eliminar_pocion(nombres, cantidades, precios):
    idx = int(input("Indice a eliminar: "))
    if 0 <= idx < len(nombres):
        n = nombres.pop(idx)
        cantidades.pop(idx)
        precios.pop(idx)
        print(f"-> [OK] {n} eliminada de la botica.")
    else:
        print("-> [ERROR] Indice fuera de rango.")

def reportes_pociones(nombres, cantidades, precios):
    if not nombres:
        print("Sin datos.")
        return
    val_total = sum(c * p for c, p in zip(cantidades, precios))
    max_idx = precios.index(max(precios))
    min_stock_idx = cantidades.index(min(cantidades))
    print("\\n=== 📊 AUDITORIA ALQUIMICA ===")
    print(f"1. Mas costosa: {nombres[max_idx]} (" + str(precios[max_idx]) + " Oro)")
    print(f"2. Menor stock: {nombres[min_stock_idx]} ({cantidades[min_stock_idx]} frascos)")
    print(f"3. Valor monetario total: " + str(val_total) + " Oro")
    print("4. Stock critico (< 5 frascos):")
    criticos = [f" - {n}: {c} frascos" for n, c in zip(nombres, cantidades) if c < 5]
    print("\\n".join(criticos) if criticos else " - Todo el stock esta sobre 5 frascos.")

nombres = ["Curacion_Mayor", "Mana_Puro", "Veneno_Cobra"]
cantidades = [12, 3, 20]
precios = [45.5, 80.0, 25.0]`,
    java: `import java.util.ArrayList;
import java.util.Scanner;

public class TiendaPociones {
    public static void guardarPocion(ArrayList<String> nom, ArrayList<Integer> cant, ArrayList<Double> pre, Scanner sc) {
        System.out.print("Nombre: "); String n = sc.next();
        System.out.print("Cantidad: "); int c = sc.nextInt();
        System.out.print("Precio: "); double p = sc.nextDouble();
        nom.add(n); cant.add(c); pre.add(p);
        System.out.println("-> Pocion guardada.");
    }

    public static void listarPociones(ArrayList<String> nom, ArrayList<Integer> cant, ArrayList<Double> pre) {
        System.out.println("\\n=== 🧪 BOTICA DE POCIONES ===");
        for (int i = 0; i < nom.size(); i++) {
            System.out.println("[" + i + "] " + nom.get(i) + " | Cant: " + cant.get(i) + " | Precio: " + pre.get(i) + " Oro");
        }
    }

    public static int buscarPocion(ArrayList<String> nom, String buscada) {
        for (int i = 0; i < nom.size(); i++) {
            if (nom.get(i).equalsIgnoreCase(buscada)) return i;
        }
        return -1;
    }

    public static void reportes(ArrayList<String> nom, ArrayList<Integer> cant, ArrayList<Double> pre) {
        if (nom.isEmpty()) return;
        int maxP = 0, minC = 0;
        double total = 0;
        for (int i = 0; i < nom.size(); i++) {
            total += cant.get(i) * pre.get(i);
            if (pre.get(i) > pre.get(maxP)) maxP = i;
            if (cant.get(i) < cant.get(minC)) minC = i;
        }
        System.out.println("Pocion mas cara: " + nom.get(maxP) + " (" + pre.get(maxP) + ")");
        System.out.println("Menor stock: " + nom.get(minC) + " (" + cant.get(minC) + ")");
        System.out.println("Valor total: " + total + " Oro");
    }

    public static void main(String[] args) {
        ArrayList<String> nombres = new ArrayList<>();
        ArrayList<Integer> cantidades = new ArrayList<>();
        ArrayList<Double> precios = new ArrayList<>();
        nombres.add("Curacion"); cantidades.add(10); precios.add(25.0);
        listarPociones(nombres, cantidades, precios);
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class TiendaPociones {
    static void Main() {
        List<string> nombres = new List<string> { "Curacion", "Mana", "Veneno" };
        List<int> cantidades = new List<int> { 12, 3, 20 };
        List<double> precios = new List<double> { 45.5, 80.0, 25.0 };

        double total = 0;
        int maxIdx = 0;
        for (int i = 0; i < nombres.Count; i++) {
            total += cantidades[i] * precios[i];
            if (precios[i] > precios[maxIdx]) maxIdx = i;
            Console.WriteLine("[" + i + "] " + nombres[i] + " - Stock: " + cantidades[i] + " - Precio: " + precios[i]);
        }
        Console.WriteLine("Pocion mas cara: " + nombres[maxIdx] + " (" + precios[maxIdx] + ")");
        Console.WriteLine("Valor total: " + total);
    }
}`,
    javascript: `const nombres = ["Curacion_Mayor", "Mana_Puro", "Veneno_Cobra"];
const cantidades = [12, 3, 20];
const precios = [45.5, 80.0, 25.0];

function guardarPocion(nom, cant, pre, n, c, p) {
  nom.push(n); cant.push(c); pre.push(p);
}

function listarPociones(nom, cant, pre) {
  nom.forEach((n, i) => console.log(\`[\${i}] \${n} | Stock: \${cant[i]} | Precio: \${pre[i]} Oro\`));
}

function reportesPociones(nom, cant, pre) {
  const total = cant.reduce((acc, c, i) => acc + c * pre[i], 0);
  const maxIdx = pre.indexOf(Math.max(...pre));
  console.log("Pocion mas cara:", nom[maxIdx], pre[maxIdx]);
  console.log("Valor total en bodega:", total);
  console.log("Criticos (<5):", nom.filter((_, i) => cant[i] < 5));
}`,
    php: `<?php
$nombres = ["Curacion_Mayor", "Mana_Puro", "Veneno_Cobra"];
$cantidades = [12, 3, 20];
$precios = [45.5, 80.0, 25.0];

function listarPociones($nom, $cant, $pre) {
    foreach ($nom as $i => $n) {
        echo "[$i] $n | Stock: {$cant[$i]} | Precio: {$pre[$i]} Oro\\n";
    }
}

function reportesPociones($nom, $cant, $pre) {
    $total = 0;
    $maxIdx = 0;
    foreach ($pre as $i => $p) {
        $total += $cant[$i] * $p;
        if ($p > $pre[$maxIdx]) $maxIdx = $i;
    }
    echo "Mas cara: {$nom[$maxIdx]} ({$pre[$maxIdx]} Oro)\\n";
    echo "Total bodega: $total Oro\\n";
}
?>`,
    pseint: `Proceso TiendaPociones
    Dimension nombres[100], cantidades[100], precios[100]
    n <- 3
    nombres[1] <- "Curacion"
    cantidades[1] <- 12
    precios[1] <- 45.5
    
    Escribir "=== AUDITORIA DE POCIONES ==="
    Para i <- 1 Hasta n Hacer
        Escribir "[", i, "] ", nombres[i], " Stock: ", cantidades[i], " Precio: ", precios[i]
    FinPara
FinProceso`
  },

  // 12. ⚔️ Gladiadores → nombre, vida, ataque
  12: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void guardarGladiador(vector<string>& nom, vector<int>& vid, vector<int>& atq) {
    string n; int v, a;
    cout << "Nombre del luchador: "; cin >> n;
    cout << "Puntos de vida (HP): "; cin >> v;
    cout << "Poder de ataque (ATQ): "; cin >> a;
    nom.push_back(n); vid.push_back(v); atq.push_back(a);
    cout << "-> Gladiador registrado en la arena.\\n";
}

void listarGladiadores(const vector<string>& nom, const vector<int>& vid, const vector<int>& atq) {
    cout << "\\n=== ⚔️ LUDUS DE GLADIADORES ===\\n";
    for (size_t i = 0; i < nom.size(); i++) {
        cout << "[" << i << "] " << nom[i] << " | HP: " << vid[i] << " | ATQ: " << atq[i] << "\\n";
    }
}

int buscarGladiador(const vector<string>& nom, const string& target) {
    for (size_t i = 0; i < nom.size(); i++) {
        if (nom[i] == target) return (int)i;
    }
    return -1;
}

void actualizarStats(vector<int>& vid, vector<int>& atq) {
    int idx; cout << "Indice de gladiador: "; cin >> idx;
    if (idx >= 0 && idx < (int)vid.size()) {
        cout << "Nueva Vida (HP): "; cin >> vid[idx];
        cout << "Nuevo Ataque (ATQ): "; cin >> atq[idx];
        cout << "-> Estadisticas actualizadas.\\n";
    }
}

void eliminarGladiador(vector<string>& nom, vector<int>& vid, vector<int>& atq) {
    int idx; cout << "Indice de baja: "; cin >> idx;
    if (idx >= 0 && idx < (int)nom.size()) {
        nom.erase(nom.begin() + idx);
        vid.erase(vid.begin() + idx);
        atq.erase(atq.begin() + idx);
        cout << "-> Gladiador retirado de la arena.\\n";
    }
}

void reportesArena(const vector<string>& nom, const vector<int>& vid, const vector<int>& atq) {
    if (nom.empty()) return;
    int maxAtq = 0, maxHp = 0;
    float sumHp = 0;
    for (size_t i = 0; i < nom.size(); i++) {
        sumHp += vid[i];
        if (atq[i] > atq[maxAtq]) maxAtq = (int)i;
        if (vid[i] > vid[maxHp]) maxHp = (int)i;
    }
    cout << "\\n=== 🏆 REPORTE DEL COLISEO ===\\n";
    cout << "Campeon con mas ataque: " << nom[maxAtq] << " (" << atq[maxAtq] << " ATQ)\\n";
    cout << "Tanque con mas vida: " << nom[maxHp] << " (" << vid[maxHp] << " HP)\\n";
    cout << "Promedio de vida: " << (sumHp / nom.size()) << " HP\\n";
}

int main() {
    vector<string> nombres = {"Spartacus", "Crixus", "Maximus"};
    vector<int> vidas = {120, 150, 95};
    vector<int> ataques = {85, 70, 92};
    listarGladiadores(nombres, vidas, ataques);
    reportesArena(nombres, vidas, ataques);
    return 0;
}`,
    python: `def guardar_gladiador(nom, vid, atq):
    nom.append(input("Nombre: "))
    vid.append(int(input("Vida HP: ")))
    atq.append(int(input("Ataque ATQ: ")))

def listar_gladiadores(nom, vid, atq):
    print("\\n=== ⚔️ COLISEO DE GLADIADORES ===")
    for i in range(len(nom)):
        print(f"[{i}] {nom[i]} | HP: {vid[i]} | ATQ: {atq[i]}")

def reportes_arena(nom, vid, atq):
    if not nom: return
    idx_atq = atq.index(max(atq))
    idx_hp = vid.index(max(vid))
    print(f"Campeon ofensivo: {nom[idx_atq]} ({atq[idx_atq]} ATQ)")
    print(f"Tanque supremo: {nom[idx_hp]} ({vid[idx_hp]} HP)")
    print(f"Promedio de vida: {sum(vid)/len(vid):.1f} HP")
    print("Heridos criticos (HP < 30):", [n for n, v in zip(nom, vid) if v < 30])

nombres = ["Spartacus", "Crixus", "Maximus"]
vidas = [120, 150, 25]
ataques = [85, 70, 92]
listar_gladiadores(nombres, vidas, ataques)
reportes_arena(nombres, vidas, ataques)`,
    java: `import java.util.ArrayList;

public class GladiadoresArena {
    public static void main(String[] args) {
        ArrayList<String> nombres = new ArrayList<>();
        ArrayList<Integer> vidas = new ArrayList<>();
        ArrayList<Integer> ataques = new ArrayList<>();
        
        nombres.add("Spartacus"); vidas.add(120); ataques.add(85);
        nombres.add("Crixus"); vidas.add(150); ataques.add(70);
        
        int maxAtq = 0;
        for (int i = 0; i < nombres.size(); i++) {
            if (ataques.get(i) > ataques.get(maxAtq)) maxAtq = i;
            System.out.println("[" + i + "] " + nombres.get(i) + " HP:" + vidas.get(i) + " ATQ:" + ataques.get(i));
        }
        System.out.println("Maximo Atacante: " + nombres.get(maxAtq));
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class GladiadoresArena {
    static void Main() {
        var nom = new List<string> { "Spartacus", "Crixus" };
        var vid = new List<int> { 120, 150 };
        var atq = new List<int> { 85, 70 };
        for (int i = 0; i < nom.Count; i++) {
            Console.WriteLine("[" + i + "] " + nom[i] + " HP:" + vid[i] + " ATQ:" + atq[i]);
        }
    }
}`,
    javascript: `const nombres = ["Spartacus", "Crixus", "Maximus"];
const vidas = [120, 150, 25];
const ataques = [85, 70, 92];

function listarGladiadores(nom, vid, atq) {
  nom.forEach((n, i) => console.log(\`[\${i}] \${n} | HP: \${vid[i]} | ATQ: \${atq[i]}\`));
}

function reportesArena(nom, vid, atq) {
  const maxAtq = atq.indexOf(Math.max(...atq));
  console.log("Campeon Ofensivo:", nom[maxAtq], "con", atq[maxAtq], "ATQ");
  console.log("Heridos criticos (HP < 30):", nom.filter((_, i) => vid[i] < 30));
}`,
    php: `<?php
$nombres = ["Spartacus", "Crixus"];
$vidas = [120, 150];
$ataques = [85, 70];
foreach ($nombres as $i => $n) {
    echo "[$i] $n - HP: {$vidas[$i]} - ATQ: {$ataques[$i]}\\n";
}
?>`,
    pseint: `Proceso ArenaGladiadores
    Dimension nom[10], vid[10], atq[10]
    nom[1] <- "Spartacus"; vid[1] <- 120; atq[1] <- 85
    nom[2] <- "Crixus"; vid[2] <- 150; atq[2] <- 70
    Para i <- 1 Hasta 2 Hacer
        Escribir "[", i, "] ", nom[i], " HP: ", vid[i], " ATQ: ", atq[i]
    FinPara
FinProceso`
  },

  // 13. 🏎️ Carrera de Autos → piloto, auto, velocidad
  13: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void guardarAuto(vector<string>& pil, vector<string>& aut, vector<int>& vel) {
    string p, a; int v;
    cout << "Nombre del piloto: "; cin >> p;
    cout << "Modelo de auto: "; cin >> a;
    cout << "Velocidad maxima (km/h): "; cin >> v;
    pil.push_back(p); aut.push_back(a); vel.push_back(v);
    cout << "-> Vehiculo ingresado al circuito.\\n";
}

void listarParrilla(const vector<string>& pil, const vector<string>& aut, const vector<int>& vel) {
    cout << "\\n=== 🏎️ PARRILLA DE SALIDA GP ===\\n";
    for (size_t i = 0; i < pil.size(); i++) {
        cout << "[" << i << "] " << pil[i] << " | " << aut[i] << " | " << vel[i] << " km/h\\n";
    }
}

int buscarPiloto(const vector<string>& pil, const string& buscado) {
    for (size_t i = 0; i < pil.size(); i++) {
        if (pil[i] == buscado) return (int)i;
    }
    return -1;
}

void reportesCarrera(const vector<string>& pil, const vector<string>& aut, const vector<int>& vel) {
    if (pil.empty()) return;
    int maxV = 0, sumV = 0;
    for (size_t i = 0; i < pil.size(); i++) {
        sumV += vel[i];
        if (vel[i] > vel[maxV]) maxV = (int)i;
    }
    cout << "\\n=== 🏁 ESTADISTICAS DEL GRAN PREMIO ===\\n";
    cout << "Pole Position (Mas rapido): " << pil[maxV] << " en " << aut[maxV] << " (" << vel[maxV] << " km/h)\\n";
    cout << "Velocidad promedio: " << (float)sumV / pil.size() << " km/h\\n";
    cout << "Autos en Categoria Hypercar (vel >= 300 km/h):\\n";
    for (size_t i = 0; i < pil.size(); i++) {
        if (vel[i] >= 300) cout << " - " << pil[i] << " (" << vel[i] << " km/h)\\n";
    }
}

int main() {
    vector<string> pilotos = {"Verstappen", "Hamilton", "Alonso"};
    vector<string> autos = {"RedBull_RB20", "Mercedes_W15", "Aston_AMR24"};
    vector<int> velocidades = {345, 338, 332};
    listarParrilla(pilotos, autos, velocidades);
    reportesCarrera(pilotos, autos, velocidades);
    return 0;
}`,
    python: `def reportes_carrera(pilotos, autos, velocidades):
    if not pilotos: return
    idx_max = velocidades.index(max(velocidades))
    print(f"Pole Position: {pilotos[idx_max]} con {autos[idx_max]} a {velocidades[idx_max]} km/h")
    print(f"Velocidad promedio: {sum(velocidades)/len(velocidades):.1f} km/h")
    print("Club 300+ km/h:", [p for p, v in zip(pilotos, velocidades) if v >= 300])

pilotos = ["Verstappen", "Hamilton", "Alonso"]
autos = ["RedBull_RB20", "Mercedes_W15", "Aston_AMR24"]
velocidades = [345, 338, 332]
reportes_carrera(pilotos, autos, velocidades)`,
    java: `import java.util.ArrayList;

public class CarreraAutos {
    public static void main(String[] args) {
        ArrayList<String> pilotos = new ArrayList<>();
        ArrayList<String> autos = new ArrayList<>();
        ArrayList<Integer> velocidades = new ArrayList<>();
        pilotos.add("Verstappen"); autos.add("RB20"); velocidades.add(345);
        System.out.println("Piloto: " + pilotos.get(0) + " Vel: " + velocidades.get(0) + " km/h");
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class CarreraAutos {
    static void Main() {
        var pilotos = new List<string> { "Verstappen", "Hamilton" };
        var velocidades = new List<int> { 345, 338 };
        Console.WriteLine("Lider: " + pilotos[0] + " a " + velocidades[0] + " km/h");
    }
}`,
    javascript: `const pilotos = ["Verstappen", "Hamilton", "Alonso"];
const autos = ["RedBull_RB20", "Mercedes_W15", "Aston_AMR24"];
const velocidades = [345, 338, 332];

function listar(p, a, v) {
  p.forEach((piloto, i) => console.log(\`[\${i}] \${piloto} (\${a[i]}) -> \${v[i]} km/h\`));
}`,
    php: `<?php
$pilotos = ["Verstappen", "Hamilton"];
$velocidades = [345, 338];
echo "Pole: {$pilotos[0]} con {$velocidades[0]} km/h\\n";
?>`,
    pseint: `Proceso GranPremio
    Dimension pilotos[10], velocidades[10]
    pilotos[1] <- "Verstappen"; velocidades[1] <- 345
    Escribir "Lider: ", pilotos[1], " Vel: ", velocidades[1], " km/h"
FinProceso`
  },

  // 14. 🐉 Bestiario → nombre, tipo, nivel
  14: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void guardarBestia(vector<string>& nom, vector<string>& tip, vector<int>& niv) {
    string n, t; int l;
    cout << "Nombre de criatura: "; cin >> n;
    cout << "Tipo elemental: "; cin >> t;
    cout << "Nivel de amenaza (1-100): "; cin >> l;
    nom.push_back(n); tip.push_back(t); niv.push_back(l);
    cout << "-> Criatura catalogada en el bestiario.\\n";
}

void listarBestiario(const vector<string>& nom, const vector<string>& tip, const vector<int>& niv) {
    cout << "\\n=== 🐉 BESTIARIO DE KAER-MORHEN ===\\n";
    for (size_t i = 0; i < nom.size(); i++) {
        cout << "[" << i << "] " << nom[i] << " [" << tip[i] << "] - Nivel " << niv[i] << "\\n";
    }
}

void reportesBestiario(const vector<string>& nom, const vector<string>& tip, const vector<int>& niv) {
    if (nom.empty()) return;
    int maxNiv = 0, sumNiv = 0;
    for (size_t i = 0; i < nom.size(); i++) {
        sumNiv += niv[i];
        if (niv[i] > niv[maxNiv]) maxNiv = (int)i;
    }
    cout << "\\n=== 📜 INFORME DE CAZA ===\\n";
    cout << "Jefe Alfa de mayor nivel: " << nom[maxNiv] << " (" << tip[maxNiv] << " - Nivel " << niv[maxNiv] << ")\\n";
    cout << "Nivel promedio de amenaza: " << (float)sumNiv / nom.size() << "\\n";
    cout << "Amenazas de Rango Extremo (Nivel >= 50):\\n";
    for (size_t i = 0; i < nom.size(); i++) {
        if (niv[i] >= 50) cout << " - " << nom[i] << " (Nv. " << niv[i] << ")\\n";
    }
}

int main() {
    vector<string> nombres = {"Grifo_Real", "Basilisco", "Dragon_Ancestral"};
    vector<string> tipos = {"Hibrido", "Draconido", "Elemental"};
    vector<int> niveles = {32, 28, 75};
    listarBestiario(nombres, tipos, niveles);
    reportesBestiario(nombres, tipos, niveles);
    return 0;
}`,
    python: `def reportes_bestiario(nombres, tipos, niveles):
    if not nombres: return
    max_idx = niveles.index(max(niveles))
    print(f"Jefe Alfa: {nombres[max_idx]} [{tipos[max_idx]}] - Nivel {niveles[max_idx]}")
    print(f"Nivel medio: {sum(niveles)/len(niveles):.1f}")
    print("Rango Extremo (>= 50):", [f"{n} (Nv.{lv})" for n, lv in zip(nombres, niveles) if lv >= 50])

nombres = ["Grifo_Real", "Basilisco", "Dragon_Ancestral"]
tipos = ["Hibrido", "Draconido", "Elemental"]
niveles = [32, 28, 75]
reportes_bestiario(nombres, tipos, niveles)`,
    java: `import java.util.ArrayList;

public class BestiarioMonstruos {
    public static void main(String[] args) {
        ArrayList<String> nombres = new ArrayList<>();
        ArrayList<String> tipos = new ArrayList<>();
        ArrayList<Integer> niveles = new ArrayList<>();
        nombres.add("Dragon"); tipos.add("Fuego"); niveles.add(75);
        System.out.println("Monstruo: " + nombres.get(0) + " Nivel: " + niveles.get(0));
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class BestiarioMonstruos {
    static void Main() {
        var nombres = new List<string> { "Dragon", "Grifo" };
        var niveles = new List<int> { 75, 32 };
        Console.WriteLine("Boss: " + nombres[0] + " Nivel " + niveles[0]);
    }
}`,
    javascript: `const nombres = ["Grifo_Real", "Basilisco", "Dragon_Ancestral"];
const tipos = ["Hibrido", "Draconido", "Elemental"];
const niveles = [32, 28, 75];

function listar(n, t, lv) {
  n.forEach((nombre, i) => console.log(\`[\${i}] \${nombre} [\${t[i]}] -> Nivel \${lv[i]}\`));
}`,
    php: `<?php
$nombres = ["Grifo", "Dragon"];
$niveles = [32, 75];
echo "Jefe: {$nombres[1]} Nivel {$niveles[1]}\\n";
?>`,
    pseint: `Proceso BestiarioMagico
    Dimension nombres[10], niveles[10]
    nombres[1] <- "Dragon"; niveles[1] <- 75
    Escribir "Criatura: ", nombres[1], " Nivel: ", niveles[1]
FinProceso`
  },

  // 15. 🚀 Naves Espaciales → nombre, combustible, velocidad
  15: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void guardarNave(vector<string>& nom, vector<float>& com, vector<int>& vel) {
    string n; float c; int v;
    cout << "Codigo de la nave: "; cin >> n;
    cout << "Combustible plasma (%): "; cin >> c;
    cout << "Velocidad warp (km/s): "; cin >> v;
    nom.push_back(n); com.push_back(c); vel.push_back(v);
    cout << "-> Nave acoplada a la bahia.\\n";
}

void listarFlota(const vector<string>& nom, const vector<float>& com, const vector<int>& vel) {
    cout << "\\n=== 🚀 HANGAR DE LA ARMADA ORION-PRIME ===\\n";
    for (size_t i = 0; i < nom.size(); i++) {
        cout << "[" << i << "] " << nom[i] << " | Plasma: " << com[i] << "% | Velocidad: " << vel[i] << " km/s\\n";
    }
}

void reportesFlota(const vector<string>& nom, const vector<float>& com, const vector<int>& vel) {
    if (nom.empty()) return;
    int maxVel = 0, minCom = 0;
    float sumCom = 0;
    for (size_t i = 0; i < nom.size(); i++) {
        sumCom += com[i];
        if (vel[i] > vel[maxVel]) maxVel = (int)i;
        if (com[i] < com[minCom]) minCom = (int)i;
    }
    cout << "\\n=== 🛰️ INFORME DE BAHIAS ESPACIALES ===\\n";
    cout << "Crucero mas veloz: " << nom[maxVel] << " (" << vel[maxVel] << " km/s)\\n";
    cout << "Menor combustible: " << nom[minCom] << " (" << com[minCom] << "%)\\n";
    cout << "Promedio de plasma: " << (sumCom / nom.size()) << "%\\n";
    cout << "Alerta: Riesgo de varar (< 25% plasma):\\n";
    for (size_t i = 0; i < nom.size(); i++) {
        if (com[i] < 25.0f) cout << " - " << nom[i] << ": solo " << com[i] << "% restante\\n";
    }
}

int main() {
    vector<string> nombres = {"Halcon_Milenario", "USS_Enterprise", "Prometheus"};
    vector<float> combustibles = {78.5f, 18.0f, 92.4f};
    vector<int> velocidades = {10500, 14200, 8900};
    listarFlota(nombres, combustibles, velocidades);
    reportesFlota(nombres, combustibles, velocidades);
    return 0;
}`,
    python: `def reportes_flota(nombres, combustibles, velocidades):
    if not nombres: return
    idx_vel = velocidades.index(max(velocidades))
    idx_com = combustibles.index(min(combustibles))
    print(f"Crucero mas rapido: {nombres[idx_vel]} ({velocidades[idx_vel]} km/s)")
    print(f"Combustible critico: {nombres[idx_com]} ({combustibles[idx_com]}%)")
    print(f"Media de combustible: {sum(combustibles)/len(combustibles):.1f}%")
    print("Naves en peligro (< 25%):", [n for n, c in zip(nombres, combustibles) if c < 25])

nombres = ["Halcon_Milenario", "USS_Enterprise", "Prometheus"]
combustibles = [78.5, 18.0, 92.4]
velocidades = [10500, 14200, 8900]
reportes_flota(nombres, combustibles, velocidades)`,
    java: `import java.util.ArrayList;

public class HangarEspacial {
    public static void main(String[] args) {
        ArrayList<String> nombres = new ArrayList<>();
        ArrayList<Double> combustibles = new ArrayList<>();
        ArrayList<Integer> velocidades = new ArrayList<>();
        nombres.add("Enterprise"); combustibles.add(18.0); velocidades.add(14200);
        System.out.println("Nave: " + nombres.get(0) + " Plasma: " + combustibles.get(0) + "%");
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class HangarEspacial {
    static void Main() {
        var nombres = new List<string> { "Enterprise", "Prometheus" };
        var vel = new List<int> { 14200, 8900 };
        Console.WriteLine("Nave veloz: " + nombres[0] + " con " + vel[0] + " km/s");
    }
}`,
    javascript: `const nombres = ["Halcon_Milenario", "USS_Enterprise", "Prometheus"];
const combustibles = [78.5, 18.0, 92.4];
const velocidades = [10500, 14200, 8900];

function listar(n, c, v) {
  n.forEach((nave, i) => console.log(\`[\${i}] \${nave} -> Plasma: \${c[i]}% | Vel: \${v[i]} km/s\`));
}`,
    php: `<?php
$nombres = ["Enterprise", "Prometheus"];
$combustibles = [18.0, 92.4];
echo "Nave en riesgo: {$nombres[0]} con {$combustibles[0]}%\\n";
?>`,
    pseint: `Proceso HangarFlota
    Dimension nombres[10], combustibles[10]
    nombres[1] <- "Enterprise"; combustibles[1] <- 18
    Escribir "Alerta nave: ", nombres[1], " Combustible: ", combustibles[1], "%"
FinProceso`
  },

  // 16. ⚽ Torneo de Fútbol → equipo, goles, puntos
  16: {
    cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void guardarEquipo(vector<string>& eq, vector<int>& gol, vector<int>& pts) {
    string e; int g, p;
    cout << "Nombre del club: "; cin >> e;
    cout << "Goles a favor: "; cin >> g;
    cout << "Puntos acumulados: "; cin >> p;
    eq.push_back(e); gol.push_back(g); pts.push_back(p);
    cout << "-> Club inscrito oficialmente.\\n";
}

void listarTabla(const vector<string>& eq, const vector<int>& gol, const vector<int>& pts) {
    cout << "\\n=== ⚽ TABLA DE POSICIONES DE LA LIGA ===\\n";
    for (size_t i = 0; i < eq.size(); i++) {
        cout << "[" << i << "] " << eq[i] << " | Puntos: " << pts[i] << " PTS | Goles: " << gol[i] << " GF\\n";
    }
}

int buscarEquipo(const vector<string>& eq, const string& target) {
    for (size_t i = 0; i < eq.size(); i++) {
        if (eq[i] == target) return (int)i;
    }
    return -1;
}

void reportesTorneo(const vector<string>& eq, const vector<int>& gol, const vector<int>& pts) {
    if (eq.empty()) return;
    int maxPts = 0, maxGol = 0, totGol = 0;
    for (size_t i = 0; i < eq.size(); i++) {
        totGol += gol[i];
        if (pts[i] > pts[maxPts]) maxPts = (int)i;
        if (gol[i] > gol[maxGol]) maxGol = (int)i;
    }
    cout << "\\n=== 🏆 PREMIACION Y ESTADISTICAS ===\\n";
    cout << "Campeon / Puntero: " << eq[maxPts] << " (" << pts[maxPts] << " Puntos)\\n";
    cout << "Bota de Oro (Mas Goleador): " << eq[maxGol] << " (" << gol[maxGol] << " Goles)\\n";
    cout << "Total de goles marcados: " << totGol << " Goles\\n";
    cout << "Promedio de goles por equipo: " << (float)totGol / eq.size() << " GF\\n";
}

int main() {
    vector<string> equipos = {"Real_Madrid", "Manchester_City", "Bayern_Munich"};
    vector<int> goles = {38, 42, 35};
    vector<int> puntos = {45, 43, 39};
    listarTabla(equipos, goles, puntos);
    reportesTorneo(equipos, goles, puntos);
    return 0;
}`,
    python: `def reportes_torneo(equipos, goles, puntos):
    if not equipos: return
    idx_pts = puntos.index(max(puntos))
    idx_gol = goles.index(max(goles))
    tot_gol = sum(goles)
    print(f"Campeon de Liga: {equipos[idx_pts]} con {puntos[idx_pts]} PTS")
    print(f"Bota de Oro: {equipos[idx_gol]} con {goles[idx_gol]} GF")
    print(f"Total goles torneo: {tot_gol}")
    print(f"Media de goles por club: {tot_gol/len(equipos):.1f}")

equipos = ["Real_Madrid", "Manchester_City", "Bayern_Munich"]
goles = [38, 42, 35]
puntos = [45, 43, 39]
reportes_torneo(equipos, goles, puntos)`,
    java: `import java.util.ArrayList;

public class TorneoFutbol {
    public static void main(String[] args) {
        ArrayList<String> equipos = new ArrayList<>();
        ArrayList<Integer> goles = new ArrayList<>();
        ArrayList<Integer> puntos = new ArrayList<>();
        equipos.add("Real Madrid"); goles.add(38); puntos.add(45);
        System.out.println("Lider: " + equipos.get(0) + " PTS: " + puntos.get(0));
    }
}`,
    csharp: `using System;
using System.Collections.Generic;

class TorneoFutbol {
    static void Main() {
        var eq = new List<string> { "Real Madrid", "Man City" };
        var pts = new List<int> { 45, 43 };
        Console.WriteLine("Puntero: " + eq[0] + " con " + pts[0] + " puntos");
    }
}`,
    javascript: `const equipos = ["Real_Madrid", "Manchester_City", "Bayern_Munich"];
const goles = [38, 42, 35];
const puntos = [45, 43, 39];

function listarTabla(eq, gol, pts) {
  eq.forEach((e, i) => console.log(\`[\${i}] \${e} | Puntos: \${pts[i]} | Goles: \${gol[i]}\`));
}`,
    php: `<?php
$equipos = ["Real Madrid", "Man City"];
$puntos = [45, 43];
echo "Campeon: {$equipos[0]} ({$puntos[0]} pts)\\n";
?>`,
    pseint: `Proceso TorneoFutbol
    Dimension equipos[10], puntos[10]
    equipos[1] <- "Real Madrid"; puntos[1] <- 45
    Escribir "Puntero de la liga: ", equipos[1], " con ", puntos[1], " pts"
FinProceso`
  }
};

