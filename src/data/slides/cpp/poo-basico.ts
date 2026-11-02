import type { Slide } from '../../../types/slides';

export const pooBasicoSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9. POO Básico: Clases, Encapsulamiento y Getters/Setters 🏛️',
    subtitle: 'Guía paso a paso: diseña clases seguras con atributos privados y métodos get/set validados',
    badge: 'C++ · Lección 9',
    content: 'Pasa del código imperativo al diseño orientado a objetos profesional. Aprende a crear tus propios tipos de datos blindando el estado interno con encapsulamiento.',
    bulletPoints: [
      '📐 Clase vs Objeto: La diferencia entre el molde y la instancia en memoria RAM',
      '🔒 Atributos Privados: Por qué nunca exponer variables directamente como públicas',
      '🏗️ Constructores: Inicialización limpia con lista de miembros (: attr(val))',
      '🎯 Getters (const) y Setters: Puntos de control defensivos con reglas de negocio',
      '💻 Código completo ejecutable paso a paso listo para compilar'
    ],
    keyTakeaway: 'Una clase en C++ empaqueta datos protegidos y métodos que garantizan que el objeto nunca entre en un estado inválido.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Paso 1: El Modelo Mental (Plano vs Objeto)',
    badge: 'Concepto Clave',
    content: 'Antes de escribir código, comprende la diferencia fundamental entre el tipo y la variable concreta:',
    visualChart: {
      headers: ['Concepto', 'Definición en POO', 'Ejemplo de la Espada'],
      rows: [
        ['Clase (Class)', 'El plano arquitectónico o molde de fabricación.', 'Espada (define que toda espada tiene nombre, daño y durabilidad).'],
        ['Objeto / Instancia', 'La entidad real que ocupa casilleros en la memoria RAM.', 'excalibur o katana (ocupan bytes reales con sus propios valores).'],
        ['Atributos (Datos)', 'Variables internas que representan el estado del objeto.', 'nombre, danio, durabilidad.'],
        ['Métodos (Acciones)', 'Funciones que definen lo que el objeto sabe hacer.', 'atacar(), afilar(), reparar(), mostrarInfo().']
      ]
    },
    keyTakeaway: 'Una clase no ocupa memoria para datos hasta que la instancias creando un objeto en tu programa.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Paso 2: Declaración Canónica y Atributos Privados',
    badge: 'Sintaxis y Encapsulamiento',
    content: 'En C++, toda clase se declara con class y debe terminar con punto y coma (;) tras la llave de cierre. Ocultamos los datos con private:',
    codeSnippet: {
      filename: 'Espada_Paso1.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>

using namespace std;

class Espada {
private:
    // Atributos privados: ¡Nadie fuera de la clase puede tocarlos directamente!
    string nombre;
    string material;
    int danio;
    int durabilidad; // Rango válido: 0 a 100

public:
    // Aquí definiremos los constructores y métodos públicos
}; // <- ¡CRÍTICO: No olvides el punto y coma final!`,
      explanation: 'Si los atributos fueran public, cualquier parte externa podría hacer espada.durabilidad = -500; rompiendo la lógica del juego. Con private lo impedimos.'
    },
    keyTakeaway: '⚠️ Regla de oro: En C++ por defecto todo es private. Siempre coloca los atributos en private y la interfaz en public.'
  },
  {
    id: 4,
    type: 'code',
    title: 'Paso 3: Constructores (Por Defecto y Parametrizado)',
    badge: 'Inicialización Segura',
    content: 'El constructor tiene el mismo nombre de la clase, no devuelve ningún tipo y asegura que el objeto nazca en un estado válido:',
    codeSnippet: {
      filename: 'Espada_Paso2.cpp',
      lang: 'cpp',
      code: `public:
    // 1. Constructor por defecto (valores iniciales seguros)
    Espada() : nombre("Espada de Madera"), material("Madera"), danio(10), durabilidad(100) {
        // Lista de inicialización: más rápida y recomendada en C++ moderno
    }

    // 2. Constructor con parámetros
    Espada(string n, string m, int d, int dur) {
        // En lugar de asignar a ciegas, usamos los setters para validar
        setNombre(n);
        setMaterial(m);
        setDanio(d);
        setDurabilidad(dur);
    }`,
      explanation: 'Delegar la asignación del constructor a los setters evita duplicar las validaciones de rango y asegura que ningún objeto nazca con datos corruptos.'
    },
    keyTakeaway: 'El constructor se ejecuta automáticamente una sola vez al instanciar el objeto en la memoria.'
  },
  {
    id: 5,
    type: 'code',
    title: 'Paso 4: Getters (const) y Setters con Validación Defensiva',
    badge: 'Control de Mutabilidad',
    content: 'Creamos métodos públicos para consultar (get) y modificar (set) cada atributo bajo reglas estrictas:',
    codeSnippet: {
      filename: 'Espada_Paso3.cpp',
      lang: 'cpp',
      code: `// --- GETTERS (Lectura segura con const) ---
string getNombre() const { return nombre; }
int getDanio() const { return danio; }
int getDurabilidad() const { return durabilidad; }

// --- SETTERS (Escritura controlada con validaciones) ---
void setNombre(string nuevoNombre) {
    nombre = (!nuevoNombre.empty()) ? nuevoNombre : "Espada Desconocida";
}

void setDanio(int nuevoDanio) {
    if (nuevoDanio >= 0) {
        danio = nuevoDanio;
    } else {
        cout << "⚠️ Daño inválido. Asignando 0 por seguridad.\\n";
        danio = 0;
    }
}

void setDurabilidad(int nuevaDurabilidad) {
    // Forzamos el rango estricto entre 0 y 100%
    if (nuevaDurabilidad < 0) durabilidad = 0;
    else if (nuevaDurabilidad > 100) durabilidad = 100;
    else durabilidad = nuevaDurabilidad;
}`,
      explanation: 'La palabra clave const al final del getter garantiza que la función solo lee y promete no modificar el objeto en memoria.'
    },
    keyTakeaway: 'Los setters no son simples asignadores: son los inspectores de seguridad que protegen las invariantes del objeto.'
  },
  {
    id: 6,
    type: 'code',
    title: 'Paso 5: Código Completo y Ejecutable (Copia y Prueba)',
    badge: 'Ejemplo Funcional',
    content: 'Copia este código completo en tu compilador (GCC, Clang o VS) y ejecútalo para ver el funcionamiento en consola:',
    codeSnippet: {
      filename: 'main.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>

using namespace std;

class Espada {
private:
    string nombre;
    string material;
    int danio;
    int durabilidad;

public:
    Espada() : nombre("Espada de Madera"), material("Madera"), danio(10), durabilidad(100) {}

    Espada(string n, string m, int d, int dur) {
        setNombre(n);
        setMaterial(m);
        setDanio(d);
        setDurabilidad(dur);
    }

    string getNombre() const { return nombre; }
    int getDanio() const { return danio; }
    int getDurabilidad() const { return durabilidad; }

    void setNombre(string n) { nombre = (!n.empty()) ? n : "Espada Genérica"; }
    void setMaterial(string m) { material = m; }
    void setDanio(int d) { danio = (d >= 0) ? d : 0; }
    void setDurabilidad(int dur) {
        if (dur < 0) durabilidad = 0;
        else if (dur > 100) durabilidad = 100;
        else durabilidad = dur;
    }

    void usar() {
        if (durabilidad > 0) {
            setDurabilidad(durabilidad - 15);
            cout << "⚔️ ¡Blandes la " << nombre << "! Causas " << danio << " de daño.\\n";
        } else {
            cout << "❌ La " << nombre << " está rota. ¡Repárala!\\n";
        }
    }

    void mostrarInfo() const {
        cout << "🗡️ " << nombre << " | Daño: " << danio << " | Durabilidad: " << durabilidad << "%\\n";
    }
};

int main() {
    Espada excalibur("Excalibur", "Acero Sagrado", 80, 100);
    excalibur.mostrarInfo();
    excalibur.usar();

    // Probando protección contra datos erróneos
    cout << "\\nProbando setter con daño negativo (-40)...\\n";
    excalibur.setDanio(-40);
    cout << "Daño verificado: " << excalibur.getDanio() << "\\n";

    return 0;
}`,
      explanation: 'El programa crea la espada, ejecuta acciones y comprueba cómo el setter impide asignar números absurdos.'
    },
    keyTakeaway: '¡Listo! Tienes una clase profesional con encapsulamiento, constructores, getters const y setters defensivos.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen y Próximo Paso 🎯',
    badge: 'Puntos Clave',
    content: 'Has dominado los cimientos estructurales de la Programación Orientada a Objetos:',
    bulletPoints: [
      '✅ Una clase es el plano; el objeto es la instancia en memoria RAM.',
      '✅ Atributos en private para evitar estados corruptos.',
      '✅ Constructores con lista de inicialización para nacer en estado coherente.',
      '✅ Getters con const para lecturas seguras sin mutación.',
      '✅ Setters con validaciones defensivas para aplicar reglas de negocio.',
      '🔜 Próxima lección interactiva: 9.1 Asociación de Clases (Jugador tiene una Espada).'
    ],
    keyTakeaway: 'Con clases sólidas e independientes, el siguiente paso es conectar objetos entre sí mediante composición.'
  }
];
