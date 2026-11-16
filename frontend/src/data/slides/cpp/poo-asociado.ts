import type { Slide } from '../../../types/slides';

export const pooAsociadoSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9.1 Asociación de Clases: Relación "Tiene-Un" (1 a 1) ⚔️',
    subtitle: 'Guía paso a paso: cómo un Jugador posee y manipula una Espada en C++',
    badge: 'C++ · Lección 9.1',
    content: 'En la arquitectura de software real, los objetos colaboran entre sí. Aprende cómo ensamblar sistemas complejos conteniendo un objeto dentro de otro objeto.',
    bulletPoints: [
      '🔗 Relación "Tiene-un" (Has-a): La base de la composición en POO',
      '⚔️ Componente y Contenedor: La clase Espada dentro de la clase Jugador',
      '🏗️ Inicialización de Miembros Compuestos en el Constructor',
      '🔄 Intercambio Dinámico de Armas (equiparEspada)',
      '🎯 Paso por Referencia (&): Por qué es vital para combatir contra otro Jugador',
      '💻 Código completo funcional listo para copiar y compilar'
    ],
    keyTakeaway: 'Favorecer la composición sobre la herencia te permite crear sistemas modulares, desacoplados y fáciles de mantener.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Paso 1: El Modelo Mental (Composición vs Herencia)',
    badge: 'Arquitectura de Clases',
    content: 'Comprende cuándo usar composición antes de escribir código:',
    visualChart: {
      headers: ['Tipo de Relación', 'Significado', 'Ejemplo Práctico'],
      rows: [
        ['Composición / Asociación ("Tiene-un")', 'Un objeto almacena a otro como atributo.', 'Un Jugador TIENE UNA Espada. Un Auto TIENE UN Motor.'],
        ['Herencia ("Es-un")', 'Una clase especializa a otra clase base.', 'Un Guerrero ES UN Personaje. Un Perro ES UN Animal.'],
        ['Ventaja de la Composición', 'Flexibilidad total en tiempo de ejecución.', 'El jugador puede cambiar de espada cuando quiera en medio de la partida.'],
        ['Desventaja del Acoplamiento Rígido', 'Si fuerzas herencia cuando no corresponde.', 'Un jugador no "es" una espada; heredarla sería un grave error de diseño.']
      ]
    },
    keyTakeaway: 'En el 90% de los casos de diseño de juegos y aplicaciones, la composición es la respuesta correcta.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Paso 2: La Clase Componente (Espada)',
    badge: 'El Objeto Perteneciente',
    content: 'Primero construimos la clase del objeto que será poseído. La espada gestiona su propio daño y desgaste:',
    codeSnippet: {
      filename: 'Espada.h',
      lang: 'cpp',
      code: `class Espada {
private:
    string nombre;
    int danio;
    int durabilidad;

public:
    Espada() : nombre("Puños"), danio(5), durabilidad(100) {}

    Espada(string nombre, int danio, int durabilidad)
        : nombre(nombre), danio(danio), durabilidad(durabilidad) {}

    string getNombre() const { return nombre; }
    int getDurabilidad() const { return durabilidad; }

    // Si está rota, apenas causa 1 de daño
    int getDanio() const {
        return (durabilidad > 0) ? danio : 1;
    }

    void desgastar() {
        if (durabilidad > 0) {
            durabilidad -= 15;
            if (durabilidad < 0) durabilidad = 0;
        }
    }
};`,
      explanation: 'La espada no sabe qué es un Jugador; ella solo conoce su nombre, su daño y cómo desgastarse. Esto se llama bajo acoplamiento.'
    },
    keyTakeaway: 'Las clases componentes deben ser autónomas y funcionar perfectamente por sí solas.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Paso 3: La Clase Contenedora (Jugador)',
    badge: 'Asociación en Memoria',
    content: 'Declaramos Espada como atributo privado dentro de Jugador y la inicializamos en el constructor:',
    codeSnippet: {
      filename: 'Jugador.h',
      lang: 'cpp',
      code: `class Jugador {
private:
    string nombre;
    int salud;
    int saludMaxima;
    Espada espadaEquipada; // <- ASOCIACIÓN: Un objeto dentro de otro

public:
    // Inicialización del objeto asociado en la lista de miembros
    Jugador(string nombre, int saludMax, Espada espadaInicial)
        : nombre(nombre), salud(saludMax), saludMaxima(saludMax), espadaEquipada(espadaInicial) {}

    string getNombre() const { return nombre; }
    int getSalud() const { return salud; }
    bool estaVivo() const { return salud > 0; }

    // Cambiar de arma en tiempo de ejecución (Setter de objeto)
    void equiparEspada(Espada nuevaEspada) {
        espadaEquipada = nuevaEspada;
        cout << "⚔️ " << nombre << " equipó: " << espadaEquipada.getNombre() << "!\\n";
    }
};`,
      explanation: 'El atributo espadaEquipada vive dentro del espacio de memoria del Jugador. Al copiar o destruir el Jugador, su espada se gestiona con él.'
    },
    keyTakeaway: 'Un objeto puede recibir otro objeto por parámetro y guardarlo en sus propios atributos privados.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Paso 4: Delegación y Paso por Referencia (&)',
    badge: 'Interacción entre Objetos',
    content: 'Al atacar a otro jugador, debemos recibir al objetivo por referencia (&) para modificar su salud real:',
    codeSnippet: {
      filename: 'Combate.cpp',
      lang: 'cpp',
      code: `// Recibimos al enemigo por referencia: ¡EL AMPERSAND (&) ES VITAL!
void atacar(Jugador &objetivo) {
    if (!estaVivo()) {
        cout << "💀 " << nombre << " no puede atacar porque está fuera de combate.\\n";
        return;
    }

    cout << "🗡️ " << nombre << " ataca a " << objetivo.getNombre() 
         << " con " << espadaEquipada.getNombre() << "!\\n";

    // 1. Delegamos el cálculo del daño en la espada
    int danio = espadaEquipada.getDanio();

    // 2. Le infligimos daño al objetivo real en memoria
    objetivo.recibirDanio(danio);

    // 3. Desgastamos el arma utilizada
    espadaEquipada.desgastar();
}`,
      explanation: 'Sin el &, C++ crearía una copia efímera del objetivo, y cuando el método terminara, la vida del enemigo original seguiría intacta.'
    },
    keyTakeaway: '⚠️ Regla crucial: Siempre pasa otros objetos por referencia (&) cuando desees alterar su estado interno en un método.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Paso 5: Código Completo y Ejecutable (Copia y Prueba)',
    badge: 'Simulación Completa',
    content: 'Copia este programa completo para probar el combate, la durabilidad del arma y el cambio de espada en caliente:',
    codeSnippet: {
      filename: 'main.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>

using namespace std;

class Espada {
private:
    string nombre;
    int danio;
    int durabilidad;

public:
    Espada() : nombre("Puños"), danio(5), durabilidad(100) {}
    Espada(string n, int d, int dur) : nombre(n), danio(d), durabilidad(dur) {}

    string getNombre() const { return nombre; }
    int getDurabilidad() const { return durabilidad; }
    int getDanio() const { return (durabilidad > 0) ? danio : 2; }

    void desgastar() {
        if (durabilidad > 0) {
            durabilidad -= 20;
            if (durabilidad < 0) durabilidad = 0;
        }
    }
};

class Jugador {
private:
    string nombre;
    int salud;
    int saludMaxima;
    Espada espadaEquipada;

public:
    Jugador(string n, int hp, Espada e)
        : nombre(n), salud(hp), saludMaxima(hp), espadaEquipada(e) {}

    string getNombre() const { return nombre; }
    bool estaVivo() const { return salud > 0; }

    void equiparEspada(Espada nueva) {
        espadaEquipada = nueva;
        cout << "✨ " << nombre << " ahora empuña: " << espadaEquipada.getNombre() << "!\\n";
    }

    void recibirDanio(int cant) {
        salud -= cant;
        if (salud < 0) salud = 0;
        cout << "   💥 " << nombre << " recibe " << cant << " de daño. (HP: " << salud << "/" << saludMaxima << ")\\n";
    }

    void atacar(Jugador &enemigo) {
        if (!estaVivo()) return;
        cout << "🗡️ " << nombre << " ataca a " << enemigo.getNombre() 
             << " con " << espadaEquipada.getNombre() << "!\\n";
        enemigo.recibirDanio(espadaEquipada.getDanio());
        espadaEquipada.desgastar();
    }

    void mostrarEstado() const {
        cout << "👤 " << nombre << " | HP: " << salud << "/" << saludMaxima 
             << " | Arma: " << espadaEquipada.getNombre() << " (Durabilidad: " << espadaEquipada.getDurabilidad() << "%)\\n";
    }
};

int main() {
    Espada espadaHierro("Espada de Hierro", 25, 40);
    Espada katanaLegendaria("Katana Filosa", 45, 100);

    Jugador arturo("Arturo", 100, espadaHierro);
    Jugador enemigo("Orco", 80, Espada("Garrote", 15, 60));

    arturo.mostrarEstado();
    enemigo.mostrarEstado();

    cout << "\\n--- COMBATE ---\\n";
    arturo.atacar(enemigo);
    enemigo.atacar(arturo);

    // Equipando nueva arma encontrada
    cout << "\\n🎁 ¡Arturo abre un cofre y encuentra una Katana!\\n";
    arturo.equiparEspada(katanaLegendaria);
    arturo.atacar(enemigo);

    cout << "\\n--- ESTADO FINAL ---\\n";
    arturo.mostrarEstado();
    enemigo.mostrarEstado();

    return 0;
}`,
      explanation: 'En main() instanciamos dos jugadores, combatimos alterando la salud del enemigo vía referencia y cambiamos de espada dinámicamente.'
    },
    keyTakeaway: '¡Excelente! Ahora dominas la composición 1 a 1: un objeto conteniendo a otro y delegando comportamientos.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen y Próximo Desafío 🎯',
    badge: 'Puntos Clave',
    content: 'Has aprendido cómo hacer colaborar objetos mediante composición:',
    bulletPoints: [
      '✅ "Tiene-un" modela relaciones donde un objeto forma parte de otro.',
      '✅ Los atributos de tipo objeto se inicializan en el constructor de la clase dueña.',
      '✅ equiparEspada() demuestra cómo mutar el objeto asociado en caliente.',
      '✅ El paso por referencia (&) es obligatorio para modificar objetos externos en un método.',
      '🔜 Próxima lección interactiva: 9.2 Colecciones de Objetos (Inventario 1 a N con std::vector).'
    ],
    keyTakeaway: '¿Qué pasa si un jugador quiere llevar no solo una espada, sino 10 pociones distintas? ¡Eso es composición 1 a N!'
  }
];
