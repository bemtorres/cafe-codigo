import type { Slide } from '../../../types/slides';

export const pooAsociadoListSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9.2 Colecciones de Objetos: Inventario con std::vector (1 a N) 🎒',
    subtitle: 'Guía paso a paso: crea un inventario de pociones que alteran atributos (subir vida, veneno y fuerza)',
    badge: 'C++ · Lección 9.2',
    content: 'Aprende el patrón 1 a Muchos: cómo almacenar listas dinámicas de objetos dentro de otra clase utilizando la STL de C++ moderno.',
    bulletPoints: [
      '📦 Composición 1 a N: Contener un std::vector<Objeto> dentro de una clase',
      '🧪 Modelado de Ítems: La clase Pocion con nombre, tipo y magnitud de efecto',
      '📥 Inserción Dinámica: Guardar ítems en la mochila con .push_back()',
      '⚡ Modificación de Atributos: Pociones de curación (+HP), veneno (-HP) y fuerza',
      '🗑️ Consumo y Limpieza: Remover elementos usados con .erase()',
      '💻 Código completo funcional listo para compilar y ejecutar'
    ],
    keyTakeaway: 'Combinar la POO con los contenedores de la STL te permite modelar inventarios, listas de compras y catálogos con memoria dinámica segura.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Paso 1: El Modelo Mental (Composición 1 a N)',
    badge: 'Estructuras Dinámicas',
    content: 'Hasta ahora un objeto contenía una sola variable u objeto. Ahora contiene una colección dinámica completa:',
    visualChart: {
      headers: ['Concepto', 'Definición en C++', 'Ejemplo del Videojuego'],
      rows: [
        ['Contenedor (1)', 'La clase principal que posee la colección.', 'Jugador (tiene salud, fuerza y una mochila de ítems).'],
        ['Elementos (N)', 'Las instancias individuales almacenadas en el contenedor.', 'Pocion (cada frasco tiene su propio nombre, efecto y tipo).'],
        ['Almacenamiento STL', 'std::vector<Pocion> inventario;', 'Vector dinámico que crece en RAM según cuántas pociones recoja el héroe.'],
        ['Ciclo de Vida', 'Inserción (.push_back) y Consumo (.erase)', 'El jugador recoge una poción, la bebe modificando su vida, y se destruye del vector.']
      ]
    },
    keyTakeaway: 'std::vector maneja automáticamente la asignación y liberación de memoria RAM de todos los objetos contenidos.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Paso 2: Modelando la Clase Ítem (Pocion)',
    badge: 'El Elemento de la Colección',
    content: 'Cada poción en el inventario posee un nombre, un tipo de efecto y un valor numérico:',
    codeSnippet: {
      filename: 'Pocion.h',
      lang: 'cpp',
      code: `class Pocion {
private:
    string nombre;
    string tipo; // "CURACION", "VENENO", "FUERZA"
    int valorEfecto;

public:
    Pocion(string nombre, string tipo, int valorEfecto)
        : nombre(nombre), tipo(tipo), valorEfecto(valorEfecto) {}

    // Getters para que el Jugador consulte el efecto al beber
    string getNombre() const { return nombre; }
    string getTipo() const { return tipo; }
    int getValorEfecto() const { return valorEfecto; }

    void mostrarInfo() const {
        cout << "[" << tipo << "] " << nombre 
             << " (" << (valorEfecto >= 0 ? "+" : "") << valorEfecto << " pts)\\n";
    }
};`,
      explanation: 'La poción es un objeto de datos (Value Object): solo describe qué hace y cuánto poder tiene. El Jugador se encargará de aplicarlo.'
    },
    keyTakeaway: 'Mantener la clase Pocion simple y clara facilita crear decenas de pociones distintas sin cambiar la clase Jugador.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Paso 3: Incorporando std::vector<Pocion> al Jugador',
    badge: 'Contenedor Dinámico',
    content: 'Agregamos el vector como atributo privado y creamos métodos para recoger y listar pociones:',
    codeSnippet: {
      filename: 'JugadorConInventario.h',
      lang: 'cpp',
      code: `#include <vector>

class Jugador {
private:
    string nombre;
    int salud;
    int saludMaxima;
    int fuerza;
    vector<Pocion> inventario; // <- Colección 1 a N de objetos

public:
    Jugador(string n, int hpMax, int fza)
        : nombre(n), salud(hpMax), saludMaxima(hpMax), fuerza(fza) {}

    // 1. Añadimos un objeto al vector
    void recogerPocion(const Pocion &pocion) {
        inventario.push_back(pocion);
        cout << "🎒 " << nombre << " guardó: " << pocion.getNombre() << "\\n";
    }

    // 2. Iteramos sobre los objetos del vector
    void mostrarInventario() const {
        cout << "\\n=== 🎒 Inventario de " << nombre << " (" << inventario.size() << ") ===\\n";
        if (inventario.empty()) {
            cout << "  (Mochila vacía)\\n";
            return;
        }
        for (size_t i = 0; i < inventario.size(); i++) {
            cout << "  " << i + 1 << ". ";
            inventario[i].mostrarInfo();
        }
    }
};`,
      explanation: 'inventario.push_back() añade una copia del objeto al final del vector; inventario.size() nos dice exactamente cuántas pociones quedan.'
    },
    keyTakeaway: 'Los vectores de objetos en C++ crecen y decrecen dinámicamente según las necesidades del juego.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Paso 4: Consumo, Modificación de Atributos y .erase()',
    badge: 'Lógica de Negocio y Memoria',
    content: 'Al consumir una poción, modificamos las estadísticas del jugador y removemos el elemento gastado:',
    codeSnippet: {
      filename: 'ConsumoPocion.cpp',
      lang: 'cpp',
      code: `bool usarPocion(int slot) {
    int idx = slot - 1; // Conversión de 1-based (usuario) a 0-based (C++)

    // 1. Control defensivo de límites
    if (idx < 0 || idx >= static_cast<int>(inventario.size())) {
        cout << "❌ No existe ningún ítem en el espacio #" << slot << "\\n";
        return false;
    }

    Pocion p = inventario[idx];
    cout << "\\n🧪 " << nombre << " bebe " << p.getNombre() << "...\\n";

    // 2. Alteración de atributos del jugador
    if (p.getTipo() == "CURACION") {
        salud += p.getValorEfecto();
        if (salud > saludMaxima) salud = saludMaxima;
        cout << "💚 ¡Te curaste! Salud actual: " << salud << "/" << saludMaxima << " HP\\n";
    } 
    else if (p.getTipo() == "VENENO") {
        salud -= p.getValorEfecto();
        if (salud < 0) salud = 0;
        cout << "🤢 ¡El brebaje era veneno! Pierdes " << p.getValorEfecto() << " de vida.\\n";
        if (salud == 0) cout << "💀 ¡" << nombre << " ha muerto por envenenamiento!\\n";
    } 
    else if (p.getTipo() == "FUERZA") {
        fuerza += p.getValorEfecto();
        cout << "💪 ¡Tu poder físico aumenta a: " << fuerza << "!\\n";
    }

    // 3. Remoción del ítem gastado en el vector
    inventario.erase(inventario.begin() + idx);
    return true;
}`,
      explanation: 'inventario.erase(begin + idx) elimina el elemento de la memoria del vector y desplaza automáticamente los siguientes elementos.'
    },
    keyTakeaway: 'Siempre valida que idx < inventario.size() antes de acceder a un elemento para evitar segmentation faults.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Paso 5: Código Completo y Ejecutable (Copia y Prueba)',
    badge: 'Programa Funcional',
    content: 'Copia este programa completo en tu compilador para probar la mochila con pociones de curación, veneno y fuerza:',
    codeSnippet: {
      filename: 'main.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Pocion {
private:
    string nombre;
    string tipo;
    int valorEfecto;

public:
    Pocion(string n, string t, int v) : nombre(n), tipo(t), valorEfecto(v) {}
    string getNombre() const { return nombre; }
    string getTipo() const { return tipo; }
    int getValorEfecto() const { return valorEfecto; }

    void mostrarInfo() const {
        cout << "[" << tipo << "] " << nombre 
             << " (" << (valorEfecto >= 0 ? "+" : "") << valorEfecto << " pts)\\n";
    }
};

class Jugador {
private:
    string nombre;
    int salud;
    int saludMaxima;
    int fuerza;
    vector<Pocion> inventario;

public:
    Jugador(string n, int hp, int f)
        : nombre(n), salud(hp), saludMaxima(hp), fuerza(f) {}

    void recogerPocion(const Pocion &p) {
        inventario.push_back(p);
        cout << "🎒 " << nombre << " guardó: " << p.getNombre() << "\\n";
    }

    void mostrarInventario() const {
        cout << "\\n=== 🎒 INVENTARIO DE " << nombre << " (" << inventario.size() << ") ===\\n";
        for (size_t i = 0; i < inventario.size(); i++) {
            cout << "  " << i + 1 << ". ";
            inventario[i].mostrarInfo();
        }
    }

    bool usarPocion(int slot) {
        int idx = slot - 1;
        if (idx < 0 || idx >= static_cast<int>(inventario.size())) {
            cout << "❌ Espacio inválido #" << slot << "\\n";
            return false;
        }

        Pocion p = inventario[idx];
        cout << "\\n🧪 " << nombre << " bebe: " << p.getNombre() << "...\\n";

        if (p.getTipo() == "CURACION") {
            salud += p.getValorEfecto();
            if (salud > saludMaxima) salud = saludMaxima;
            cout << "💚 ¡Salud restaurada! HP: " << salud << "/" << saludMaxima << "\\n";
        } else if (p.getTipo() == "VENENO") {
            salud -= p.getValorEfecto();
            if (salud < 0) salud = 0;
            cout << "🤢 ¡Brebaje venenoso! Pierdes " << p.getValorEfecto() << " HP. (Restante: " << salud << ")\\n";
        } else if (p.getTipo() == "FUERZA") {
            fuerza += p.getValorEfecto();
            cout << "💪 ¡Fuerza aumentada a " << fuerza << "!\\n";
        }

        inventario.erase(inventario.begin() + idx);
        return true;
    }

    void mostrarFicha() const {
        cout << "👤 " << nombre << " | HP: " << salud << "/" << saludMaxima 
             << " | Fuerza: " << fuerza << " | Pociones: " << inventario.size() << "\\n";
    }
};

int main() {
    Jugador heroe("Link", 100, 20);

    // Creamos pociones variadas
    Pocion pocionVida("Poción Roja de Vida", "CURACION", 30);
    Pocion elixirFuerza("Elixir de Fuerza Titánica", "FUERZA", 15);
    Pocion venenoBruja("Frasco Venenoso Sospechoso", "VENENO", 40);

    // Llenamos el inventario
    heroe.recogerPocion(pocionVida);
    heroe.recogerPocion(elixirFuerza);
    heroe.recogerPocion(venenoBruja);

    heroe.mostrarFicha();
    heroe.mostrarInventario();

    // 1. Usar Elixir de Fuerza (slot 2)
    heroe.usarPocion(2);

    // 2. Beber el veneno por equivocación (slot 2)
    heroe.usarPocion(2);

    // 3. Beber poción de curación para salvarse (slot 1)
    heroe.usarPocion(1);

    cout << "\\n=== ESTADO FINAL DEL HÉROE ===\\n";
    heroe.mostrarFicha();
    heroe.mostrarInventario();

    return 0;
}`,
      explanation: 'El programa prueba la inserción en vector, la consulta, y cómo cada poción altera diferentes atributos de Jugador antes de desaparecer.'
    },
    keyTakeaway: '¡Has dominado el patrón 1 a Muchos! Tu clase puede administrar cualquier cantidad de objetos con memoria dinámica.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen y Próximo Desafío 🎯',
    badge: 'Puntos Clave',
    content: 'Has completado los tres niveles de fundamentos de POO en C++:',
    bulletPoints: [
      '✅ 9. POO Básico: Clases con atributos privados, constructores y getters/setters validados.',
      '✅ 9.1 Asociación (1 a 1): Un objeto contiene a otro (Jugador tiene Espada).',
      '✅ 9.2 Colecciones (1 a N): Un objeto gestiona una lista de objetos (std::vector<Pocion>).',
      '✅ Usar .push_back() para insertar y .erase() para consumir ítems.',
      '🔜 Próxima parada arquitectónica: 10. Herencia y Polimorfismo (Clases Base y Derivadas).'
    ],
    keyTakeaway: 'Con la encapsulación y la composición dominadas, ahora estás preparado para abordar la Herencia y el Polimorfismo.'
  }
];
