import type { Slide } from '../../../types/slides';

export const pooBasicoSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '9. Programación Orientada a Objetos: Clases y Objetos 🏛️',
    subtitle: 'Modelar el mundo real, encapsulamiento con public/private y constructores',
    badge: 'C++ · Lección 9',
    content: 'Pasa del paradigma imperativo al diseño de software profesional. Aprende a crear tus propios tipos de datos complejos empaquetando atributos (datos) y métodos (comportamientos).',
    bulletPoints: [
      '📐 Clase vs Objeto: El plano arquitectónico vs la casa construida',
      '🔒 Encapsulamiento: Proteger los datos privados de manipulaciones indebidas',
      '🏗️ Constructores: La ceremonia de inicialización del objeto en memoria',
      '🎯 Getters y Setters: Puntos de control seguros con validación'
    ],
    keyTakeaway: 'Una clase define un nuevo tipo en C++ que combina datos y las funciones que operan sobre ellos.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'El Modelo Mental: El Plano vs El Edificio',
    badge: 'Analogía Pedagógica',
    content: 'Diferenciar clase e instancia es el primer paso para no confundir tipos con variables:',
    visualChart: {
      headers: ['Concepto', 'Definición', 'Analogía del Automóvil'],
      rows: [
        ['Clase (Class)', 'La plantilla o plano que describe estructura y acciones.', 'Los planos de diseño del Ford Mustang (no arrancan ni gastan gasolina).'],
        ['Objeto / Instancia', 'La entidad real que ocupa casilleros en la memoria RAM.', 'El auto rojo estacionado en tu garaje con su propia gasolina y kilometraje.'],
        ['Atributos (Variables)', 'El estado o características del objeto.', 'velocidad, combustible, color, kilometraje.'],
        ['Métodos (Funciones)', 'Las acciones que el objeto puede realizar.', 'acelerar(), frenar(), encenderLuces().']
      ]
    },
    keyTakeaway: 'Puedes construir infinitos objetos en memoria a partir de una sola clase bien diseñada.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Anatomía de una Clase en C++: CuentaBancaria',
    badge: 'Sintaxis y Encapsulamiento',
    content: 'Observa cómo blindamos los atributos con private y permitimos operaciones seguras con public:',
    codeSnippet: {
      filename: 'CuentaBancaria.cpp',
      lang: 'cpp',
      code: `#include <iostream>
#include <string>

class CuentaBancaria {
private:
    std::string titular;
    double saldo;

public:
    // Constructor: Se ejecuta al crear el objeto
    CuentaBancaria(std::string nombre, double saldoInicial) {
        titular = nombre;
        saldo = (saldoInicial >= 0) ? saldoInicial : 0.0;
    }

    void depositar(double monto) {
        if (monto > 0) saldo += monto;
    }

    void mostrarEstado() const {
        std::cout << titular << " | Saldo: $" << saldo << "\\n";
    }
}; // ¡OJO con este punto y coma obligatorio!`,
      explanation: 'private oculta los atributos para evitar que alguien haga cuenta.saldo = -999999 sin pasar por la validación de depositar().'
    },
    keyTakeaway: '⚠️ Regla crítica de sintaxis: Las definiciones de clases en C++ siempre terminan con punto y coma tras la llave: };'
  },
  {
    id: 4,
    type: 'comparison',
    title: 'public vs private: El Principio de la Cápsula',
    badge: 'Encapsulamiento',
    content: '¿Por qué ocultar los datos si podríamos dejar todo público como en un struct?',
    visualChart: {
      headers: ['Modificador', '¿Quién puede acceder?', 'Riesgo / Beneficio'],
      rows: [
        ['public', 'Cualquier función o parte del programa externo.', 'Fácil de usar, pero sin protección contra corrupción de datos.'],
        ['private', 'Exclusivamente los métodos dentro de la misma clase.', 'Blindaje total: tú decides las reglas exactas para mutar datos.'],
        ['protected', 'La clase y sus clases hijas heredadas.', 'Esencial para la jerarquía de herencia que veremos luego.']
      ]
    },
    keyTakeaway: 'Regla de oro de POO: Todos los atributos deben ser private o protected; la interacción externa se hace vía métodos public.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de POO Básico 🎯',
    badge: 'Puntos Clave',
    content: 'Has dado el salto al paradigma orientado a objetos:',
    bulletPoints: [
      '✅ Las clases empaquetan datos y comportamiento en una sola unidad coherente.',
      '✅ private protege el estado interno de asignaciones inválidas.',
      '✅ El constructor garantiza que el objeto nazca en un estado válido.',
      '✅ Recuerda el punto y coma final al cerrar la clase (};).',
      '🔜 Próximo módulo: Herencia, Polimorfismo y Funciones Virtuales.'
    ],
    keyTakeaway: 'Con las clases dominadas, en la lección final aprenderás cómo las clases se heredan y transforman con polimorfismo.'
  }
];
