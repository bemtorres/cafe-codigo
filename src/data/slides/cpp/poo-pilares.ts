import type { Slide } from '../../../types/slides';

export const pooPilaresSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '10. Pilares de POO: Herencia y Polimorfismo Dinámico 🏛️⚡',
    subtitle: 'Reutilización con clases base, funciones virtuales (virtual) y polimorfismo con punteros',
    badge: 'C++ · Lección 10',
    content: 'Descubre los superpoderes que hacen a C++ el motor indiscutido de videojuegos como World of Warcraft o Cyberpunk 2077: tratar a cientos de entidades distintas a través de una interfaz común.',
    bulletPoints: [
      '🧬 Herencia: class Guerrero : public Personaje (Reutilizar sin duplicar)',
      '🎭 Polimorfismo: Una misma orden ("atacar()"), múltiples comportamientos',
      '🔮 Funciones Virtuales: La palabra mágica virtual y el keyword override',
      '🧹 Destructores virtuales: Limpieza de memoria limpia al destruir objetos derivados'
    ],
    keyTakeaway: 'El polimorfismo te permite escribir código que interactúa con el futuro: tu sistema puede manejar nuevas clases hijas sin modificar el bucle principal.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Herencia: No Reinventes la Rueda',
    badge: 'Jerarquía de Clases',
    content: 'En vez de crear clases aisladas con código repetido, creamos una clase base común:',
    visualChart: {
      headers: ['Clase Base: Personaje', 'Clase Hija: Mago', 'Clase Hija: Guerrero'],
      rows: [
        ['Atributos: nombre, salud', 'Hereda nombre y salud + agrega mana', 'Hereda nombre y salud + agrega furia'],
        ['Método: recibirDanio()', 'Usa la lógica común del Personaje', 'Usa la lógica común del Personaje'],
        ['Método: atacar()', 'Lanza hechizo de fuego', 'Blande espada pesada']
      ]
    },
    keyTakeaway: 'La sintaxis en C++ es: class Mago : public Personaje { ... }; el especificador public conserva la visibilidad de los métodos.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Polimorfismo en Acción: La Palabra Clave virtual',
    badge: 'Despacho Dinámico (vtable)',
    content: 'Para que C++ sepa qué método ejecutar en tiempo de ejecución, la función base DEBE ser virtual:',
    codeSnippet: {
      filename: 'polimorfismo.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <vector>

class Enemigo {
public:
    virtual void atacar() const {
        std::cout << "Enemigo ataca genéricamente.\\n";
    }
    virtual ~Enemigo() {} // Destructor virtual obligatorio
};

class Dragon : public Enemigo {
public:
    void atacar() const override {
        std::cout << "¡El Dragón escupe fuego infernal! 🔥\\n";
    }
};

class Zombie : public Enemigo {
public:
    void atacar() const override {
        std::cout << "El Zombie muerde lentamente... 🧟\\n";
    }
};`,
      explanation: 'virtual le dice al compilador: "No decidas ahora; averigua el tipo real del objeto cuando el programa esté corriendo". override valida que estés sobreescribiendo correctamente.'
    },
    keyTakeaway: 'Sin virtual, C++ siempre llamará al método de la clase base según el tipo de puntero, ignorando a las clases hijas.'
  },
  {
    id: 4,
    type: 'code',
    title: 'El Bucle Polimórfico de un Videojuego',
    badge: 'Arquitectura Profesional',
    content: 'Un solo vector de punteros a la clase base ejecutando todas las entidades del juego:',
    codeSnippet: {
      filename: 'game_loop.cpp',
      lang: 'cpp',
      code: `int main() {
    // Vector de punteros a la clase base:
    std::vector<Enemigo*> horda;
    horda.push_back(new Dragon());
    horda.push_back(new Zombie());

    // El bucle no sabe qué enemigo exacto es, solo sabe que puede atacar():
    for (Enemigo* e : horda) {
        e->atacar(); // Ejecuta el ataque específico de cada criatura
    }

    // Limpieza de memoria dinámica:
    for (Enemigo* e : horda) delete e;
    return 0;
}`,
      explanation: 'El operador flecha -> se usa para invocar métodos a través de un puntero (e->atacar() es equivalente a (*e).atacar()).'
    },
    keyTakeaway: 'Si mañana agregas un Enemigo nuevo (Alien), el bucle del juego no cambia ni una sola línea de código.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'Clases Abstractas e Interfaces Puras',
    badge: 'Contratos Estrictos',
    content: '¿Qué pasa si la clase base no debería poder instanciarse directamente (ej. nadie puede crear un "Animal" abstracto, solo Perros o Gatos)?',
    bulletPoints: [
      'Método Virtual Puro: virtual void accion() = 0;',
      'El = 0 indica que la clase base no provee implementación: obliga a las hijas a implementarlo.',
      'Cualquier clase con al menos un método virtual puro se convierte en Abstracta (no puedes hacer new Base()).',
      'Es el equivalente en C++ a las interfaces en C# o Java.'
    ],
    keyTakeaway: 'Las clases abstractas definen estándares que garantizan que todas las clases derivadas cumplan el contrato.'
  },
  {
    id: 6,
    type: 'summary',
    title: '¡Felicitaciones! Has Completado los Fundamentos de C++ 🏆',
    badge: 'Graduación del Curso',
    content: 'Has recorrido el camino desde el primer cout hasta el polimorfismo dinámico en memoria:',
    bulletPoints: [
      '✅ Control de compilador, tipos de datos y gestión de RAM.',
      '✅ Flujos de entrada/salida y manejo preciso del buffer.',
      '✅ Estructuras de decisión y bucles eficientes.',
      '✅ Arreglos nativos y el poderoso std::vector de la STL.',
      '✅ Funciones, paso por referencia (&) y desmitificación de punteros (*).',
      '✅ Diseño robusto orientado a objetos: encapsulamiento, herencia y polimorfismo.'
    ],
    keyTakeaway: '¡Dominas la base de uno de los lenguajes más respetados y potentes de la historia de la computación!'
  }
];
