import type { Slide } from '../../../types/slides';

export const pooSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '14. Programación Orientada a Objetos 🏛️',
    subtitle: 'Modelando entidades con Clases, Objetos, Encapsulamiento y Herencia',
    badge: 'Python · Lección 14',
    content: 'La Programación Orientada a Objetos (POO) organiza el software agrupando estado (atributos) y comportamiento (métodos) en objetos.',
    bulletPoints: [
      '🏛️ `class`: La plantilla o molde creador de instancias',
      '⚙️ `__init__`: El método constructor especial para inicializar atributos',
      '👤 `self`: La referencia explícita al objeto actual',
      '🛡️ Encapsulamiento, Herencia y Polimorfismo'
    ],
    keyTakeaway: 'La POO facilita la creación de sistemas complejos, escalables y bien organizados.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Clases, Atributos y el Método __init__',
    badge: 'Fundamentos POO',
    content: 'Una clase define los atributos que tendrán sus instancias y los métodos que podrán ejecutar.',
    bulletPoints: [
      'El método `__init__(self, ...)` se invoca automáticamente al crear un nuevo objeto',
      '`self` debe ser el primer parámetro en todos los métodos de instancia',
      'Instanciación: `objeto = NombreClase(argumentos)`'
    ],
    codeSnippet: {
      filename: 'poo_basico.py',
      lang: 'python',
      code: `class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.saldo = saldo_inicial  # Atributo de instancia

    def depositar(self, monto):
        self.saldo += monto
        print(f"💰 Depositado \${monto}. Saldo actual: \${self.saldo}")

# Instanciación
cuenta1 = CuentaBancaria("Ana", 500)
cuenta1.depositar(200)  # Saldo actual: $700`,
      explanation: 'cuenta1 mantiene su propio estado de titular y saldo en memoria.'
    },
    keyTakeaway: 'Cada objeto instanciado posee su propio estado independiente de los demás.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Encapsulamiento y Atributos Privados (_ y __)',
    badge: 'Protección de Estado',
    content: 'En Python, el encapsulamiento se logra mediante convenciones de guiones bajos.',
    bulletPoints: [
      '`_atributo`: Convención que indica atributo protegido (de uso interno)',
      '`__atributo`: Activa Name Mangling, haciendo más difícil acceder desde fuera de la clase',
      'Usa métodos Getters y Setters con `@property` para un acceso controlado'
    ],
    codeSnippet: {
      filename: 'encapsulamiento.py',
      lang: 'python',
      code: `class Usuario:
    def __init__(self, nombre, password):
        self.nombre = nombre
        self.__password = password  # Atributo privado

    def verificar_password(self, p):
        return self.__password == p

u = Usuario("Diego", "secreto123")
print(u.verificar_password("secreto123")) # True
# print(u.__password) # ❌ AttributeError`,
      explanation: '__password oculta la variable directamente evitando manipulaciones indebidas.'
    },
    keyTakeaway: 'El encapsulamiento protege la integridad interna de tus objetos.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Herencia y Polimorfismo',
    badge: 'Pilares POO',
    content: 'La herencia permite crear subclases que heredan atributos y métodos de una clase padre.',
    bulletPoints: [
      'Sintaxis: `class ClaseHija(ClasePadre):`',
      '`super().__init__()` invoca el constructor de la clase padre',
      'Polimorfismo: Las subclases pueden sobrescribir (override) métodos para cambiar su comportamiento'
    ],
    codeSnippet: {
      filename: 'herencia.py',
      lang: 'python',
      code: `class Animal:
    def hablar(self):
        return "Hace un sonido"

class Perro(Animal):
    def hablar(self):  # Polimorfismo (Sobrescritura)
        return "¡Guau! 🐶"

class Gato(Animal):
    def hablar(self):
        return "¡Miau! 🐱"

mascotas = [Perro(), Gato()]
for m in mascotas:
    print(m.hablar())`,
      explanation: 'Perro y Gato heredan de Animal pero implementan su propio método hablar().'
    },
    keyTakeaway: 'La herencia promueve la reutilización de código y el polimorfismo la flexibilidad.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de POO 🎯',
    badge: 'Resumen',
    content: 'Puntos clave del paradigma de objetos:',
    bulletPoints: [
      '✅ `class` es el molde y `__init__` el constructor de objetos',
      '✅ `self` referencia a la instancia concreta',
      '✅ Encapsulamiento `__attr` protege datos de acceso exterior descontrolado',
      '✅ Herencia `class Hija(Padre)` y Polimorfismo permiten reutilizar y extender funcionalidades'
    ],
    keyTakeaway: '¡Excelente! La POO te permitirá estructurar frameworks y paquetes profesionales.'
  }
];
