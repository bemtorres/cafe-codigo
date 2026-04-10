/** Base del catálogo en español (Refactoring.Guru). */
export const REFACTORING_GURU_DESIGN_PATTERNS_ES = 'https://refactoring.guru/es/design-patterns';

export function refactoringGuruPatternUrl(slug: string): string {
  return `${REFACTORING_GURU_DESIGN_PATTERNS_ES}/${slug}`;
}

export type PatternMeta = { slug: string; title: string; blurb: string };

export const patronesCreacionales: PatternMeta[] = [
  {
    slug: 'factory-method',
    title: 'Factory Method',
    blurb: 'Delegas la creación de objetos a subclases o métodos especializados sin acoplar el cliente al tipo concreto.',
  },
  {
    slug: 'abstract-factory',
    title: 'Abstract Factory',
    blurb: 'Familias de objetos relacionados se crean mediante una fábrica abstracta con varias implementaciones.',
  },
  {
    slug: 'builder',
    title: 'Builder',
    blurb: 'Construyes objetos complejos paso a paso, a menudo con un director que orquesta el orden de los pasos.',
  },
  {
    slug: 'prototype',
    title: 'Prototype',
    blurb: 'Clonas un prototipo en lugar de instanciar desde cero cuando la creación directa es costosa o incómoda.',
  },
  {
    slug: 'singleton',
    title: 'Singleton',
    blurb: 'Una sola instancia controlada del tipo; úsalo con cuidado para no ocultar dependencias globales.',
  },
];

export const patronesEstructurales: PatternMeta[] = [
  {
    slug: 'adapter',
    title: 'Adapter',
    blurb: 'Envuelves una interfaz existente para que otra parte del sistema pueda usarla sin modificar el código original.',
  },
  {
    slug: 'bridge',
    title: 'Bridge',
    blurb: 'Separas una jerarquía de abstracción de la de implementación para que evolucionen de forma independiente.',
  },
  {
    slug: 'composite',
    title: 'Composite',
    blurb: 'Tratas objetos simples y compuestos (árboles) de forma uniforme mediante una interfaz común.',
  },
  {
    slug: 'decorator',
    title: 'Decorator',
    blurb: 'Añades responsabilidades dinámicamente envolviendo objetos en “capas” compatibles con la misma interfaz.',
  },
  {
    slug: 'facade',
    title: 'Facade',
    blurb: 'Ofreces un punto de entrada simple a un subsistema complejo reduciendo el acoplamiento del cliente.',
  },
  {
    slug: 'flyweight',
    title: 'Flyweight',
    blurb: 'Compartes estado intrínseco entre muchas instancias para ahorrar memoria en objetos muy repetidos.',
  },
  {
    slug: 'proxy',
    title: 'Proxy',
    blurb: 'Sustituto que controla el acceso al objeto real (lazy load, permisos, logging, remoto, etc.).',
  },
];

export const patronesComportamiento: PatternMeta[] = [
  {
    slug: 'chain-of-responsibility',
    title: 'Chain of Responsibility',
    blurb: 'Pasa un mensaje por una cadena de manejadores hasta que uno lo procesa o se agota la cadena.',
  },
  {
    slug: 'command',
    title: 'Command',
    blurb: 'Encapsulas una solicitud como objeto para parametrizar, encolar, deshacer o registrar acciones.',
  },
  {
    slug: 'iterator',
    title: 'Iterator',
    blurb: 'Recorres una colección sin exponer su representación interna.',
  },
  {
    slug: 'mediator',
    title: 'Mediator',
    blurb: 'Los componentes no se llaman entre sí directamente; coordinan a través de un mediador central.',
  },
  {
    slug: 'memento',
    title: 'Memento',
    blurb: 'Guardas y restaura el estado interno de un objeto sin violar su encapsulamiento.',
  },
  {
    slug: 'observer',
    title: 'Observer',
    blurb: 'Varios suscriptores reaccionan automáticamente a cambios en un sujeto.',
  },
  {
    slug: 'state',
    title: 'State',
    blurb: 'El comportamiento cambia cuando el estado interno cambia, a menudo delegando en objetos de estado.',
  },
  {
    slug: 'strategy',
    title: 'Strategy',
    blurb: 'Familia de algoritmos intercambiables bajo una misma interfaz, elegidos en tiempo de ejecución.',
  },
  {
    slug: 'template-method',
    title: 'Template Method',
    blurb: 'Defines el esqueleto de un algoritmo en una clase base y delegas pasos variables a subclases.',
  },
  {
    slug: 'visitor',
    title: 'Visitor',
    blurb: 'Separas operaciones de la estructura de objetos; nuevas operaciones como nuevos “visitantes”.',
  },
];

/** Pestañas por patrón: Java, Python, TypeScript (ilustrativos, no producción). */
export const patronEjemploTabs: Record<
  string,
  { label: string; lang: string; code: string }[]
> = {
  'factory-method': [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Transporte { void entregar(); }

abstract class Logistica {
    abstract Transporte crearTransporte();
    void planEntrega() { crearTransporte().entregar(); }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Transporte(ABC):
    @abstractmethod
    def entregar(self) -> None: ...

class Logistica(ABC):
    @abstractmethod
    def crear_transporte(self) -> Transporte: ...
    def plan_entrega(self) -> None:
        self.crear_transporte().entregar()`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Transporte { entregar(): void; }

abstract class Logistica {
  abstract crearTransporte(): Transporte;
  planEntrega() { this.crearTransporte().entregar(); }
}`,
    },
  ],
  'abstract-factory': [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Boton { void pintar(); }
interface FabricaUi {
    Boton crearBoton();
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Boton(ABC):
    @abstractmethod
    def pintar(self) -> None: ...

class FabricaUi(ABC):
    @abstractmethod
    def crear_boton(self) -> Boton: ...`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Boton { pintar(): void; }
interface FabricaUi {
  crearBoton(): Boton;
}`,
    },
  ],
  builder: [
    {
      label: 'Java',
      lang: 'java',
      code: `class Pizza {
    String masa, salsa;
    static class Builder {
        Pizza p = new Pizza();
        Builder masa(String m) { p.masa = m; return this; }
        Pizza build() { return p; }
    }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `class Pizza:
    def __init__(self) -> None:
        self.masa = self.salsa = ""

class PizzaBuilder:
    def __init__(self) -> None:
        self._p = Pizza()
    def masa(self, m: str) -> "PizzaBuilder":
        self._p.masa = m
        return self
    def build(self) -> Pizza:
        return self._p`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class Pizza {
  masa = ''; salsa = '';
}
class PizzaBuilder {
  private p = new Pizza();
  masa(m: string) { this.p.masa = m; return this; }
  build() { return this.p; }
}`,
    },
  ],
  prototype: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface ClonableForma extends Cloneable {
    ClonableForma clonar();
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `import copy

class Forma:
    def __init__(self, tag: str) -> None:
        self.tag = tag

a = Forma("A")
b = copy.deepcopy(a)`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Clonable<T> { clonar(): T; }
class Forma implements Clonable<Forma> {
  constructor(public tag: string) {}
  clonar() { return new Forma(this.tag); }
}`,
    },
  ],
  singleton: [
    {
      label: 'Java',
      lang: 'java',
      code: `public enum Config {
    INSTANCE;
    public void cargar() { /* ... */ }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `class Config:
    _inst = None
    def __new__(cls):
        if cls._inst is None:
            cls._inst = super().__new__(cls)
        return cls._inst`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class Config {
  private static inst: Config;
  static get instance() {
    return this.inst ??= new Config();
  }
  private constructor() {}
}`,
    },
  ],
  adapter: [
    {
      label: 'Java',
      lang: 'java',
      code: `// Cliente espera EnchufeEU
class Adaptador implements EnchufeEU {
    private EnchufeUS us;
    void enchufar() { us.plug(); }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `class EnchufeEU:
    def conectar(self) -> None: ...

class Adaptador(EnchufeEU):
    def __init__(self, us: object) -> None:
        self._us = us
    def conectar(self) -> None:
        self._us.plug()  # type: ignore`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class Adaptador implements EUPlug {
  constructor(private us: USPlug) {}
  connect() { this.us.plugIn(); }
}`,
    },
  ],
  bridge: [
    {
      label: 'Java',
      lang: 'java',
      code: `abstract class Vista {
    protected ApiRender api;
    Vista(ApiRender api) { this.api = api; }
    abstract void dibujar();
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class ApiRender(ABC):
    @abstractmethod
    def pixel(self, x: int, y: int) -> None: ...

class Vista(ABC):
    def __init__(self, api: ApiRender) -> None:
        self._api = api`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface ApiRender { pixel(x: number, y: number): void; }
abstract class Vista {
  constructor(protected api: ApiRender) {}
  abstract dibujar(): void;
}`,
    },
  ],
  composite: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Nodo { int tamano(); }
class Hoja implements Nodo { int tamano() { return 1; } }
class Carpeta implements Nodo {
    List<Nodo> hijos;
    int tamano() { return hijos.stream().mapToInt(Nodo::tamano).sum(); }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Nodo(ABC):
    @abstractmethod
    def tamano(self) -> int: ...

class Carpeta(Nodo):
    def __init__(self, hijos: list[Nodo]) -> None:
        self.hijos = hijos
    def tamano(self) -> int:
        return sum(h.tamano() for h in self.hijos)`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Nodo { tamano(): number; }
class Carpeta implements Nodo {
  constructor(private hijos: Nodo[]) {}
  tamano() { return this.hijos.reduce((a, h) => a + h.tamano(), 0); }
}`,
    },
  ],
  decorator: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Cafe { double costo(); }
class Leche implements Cafe {
    Cafe interior;
    double costo() { return interior.costo() + 0.5; }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Cafe(ABC):
    @abstractmethod
    def costo(self) -> float: ...

class Leche(Cafe):
    def __init__(self, interior: Cafe) -> None:
        self._i = interior
    def costo(self) -> float:
        return self._i.costo() + 0.5`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Cafe { costo(): number; }
class Leche implements Cafe {
  constructor(private i: Cafe) {}
  costo() { return this.i.costo() + 0.5; }
}`,
    },
  ],
  facade: [
    {
      label: 'Java',
      lang: 'java',
      code: `class FacadeVideo {
    void reproducir(String f) {
        new Decoder().decode(f);
        new Audio().play();
    }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `class FachadaVideo:
    def reproducir(self, archivo: str) -> None:
        self._decodificar(archivo)
        self._audio()

    def _decodificar(self, a: str) -> None: ...
    def _audio(self) -> None: ...`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class FacadeVideo {
  reproducir(f: string) {
    new Decoder().decode(f);
    new AudioOut().play();
  }
}`,
    },
  ],
  flyweight: [
    {
      label: 'Java',
      lang: 'java',
      code: `// Estado intrínseco compartido (color de tile)
class TileFlyweight { String color; }

class TileFactory {
    Map<String, TileFlyweight> pool = new HashMap<>();
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from dataclasses import dataclass

@dataclass(frozen=True)
class TileFlyweight:
    color: str

_pool: dict[str, TileFlyweight] = {}

def tile(color: str) -> TileFlyweight:
    return _pool.setdefault(color, TileFlyweight(color))`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class TileFlyweight {
  constructor(readonly color: string) {}
}
const pool = new Map<string, TileFlyweight>();
function tile(c: string) {
  if (!pool.has(c)) pool.set(c, new TileFlyweight(c));
  return pool.get(c)!;
}`,
    },
  ],
  proxy: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Imagen { void mostrar(); }
class ProxyImagen implements Imagen {
    RealImagen real;
    void mostrar() {
        if (real == null) real = new RealImagen();
        real.mostrar();
    }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Imagen(ABC):
    @abstractmethod
    def mostrar(self) -> None: ...

class ProxyImagen(Imagen):
    def __init__(self) -> None:
        self._real = None
    def mostrar(self) -> None:
        if self._real is None:
            self._real = RealImagen()
        self._real.mostrar()`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Imagen { mostrar(): void; }
class ProxyImagen implements Imagen {
  private real?: RealImagen;
  mostrar() {
    this.real ??= new RealImagen();
    this.real.mostrar();
  }
}`,
    },
  ],
  'chain-of-responsibility': [
    {
      label: 'Java',
      lang: 'java',
      code: `abstract class Manejador {
    Manejador siguiente;
    void setSig(Manejador s) { siguiente = s; }
    abstract void manejar(int x);
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Manejador(ABC):
    def __init__(self) -> None:
        self._sig = None
    def set_sig(self, m: "Manejador") -> None:
        self._sig = m
    @abstractmethod
    def manejar(self, x: int) -> None: ...`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `abstract class Manejador {
  siguiente?: Manejador;
  setSig(s: Manejador) { this.siguiente = s; }
  abstract manejar(x: number): void;
}`,
    },
  ],
  command: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Comando { void ejecutar(); }
class Boton {
    Comando cmd;
    void click() { cmd.ejecutar(); }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Comando(ABC):
    @abstractmethod
    def ejecutar(self) -> None: ...

class Boton:
    def __init__(self, cmd: Comando) -> None:
        self._cmd = cmd
    def click(self) -> None:
        self._cmd.ejecutar()`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Comando { ejecutar(): void; }
class Boton {
  constructor(private cmd: Comando) {}
  click() { this.cmd.ejecutar(); }
}`,
    },
  ],
  iterator: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Iterador<T> { boolean haySiguiente(); T siguiente(); }
class Coleccion {
    Iterador<String> iterador() { /* ... */ return null; }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `class Coleccion:
    def __init__(self, items: list[str]) -> None:
        self._items = items
    def __iter__(self):
        return iter(self._items)`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class Coleccion<T> {
  constructor(private items: T[]) {}
  *[Symbol.iterator]() { for (const x of this.items) yield x; }
}`,
    },
  ],
  mediator: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Mediador {
    void notificar(Object emisor, String evento);
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Mediador(ABC):
    @abstractmethod
    def notificar(self, emisor: object, evento: str) -> None: ...`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Mediador {
  notificar(emisor: unknown, evento: string): void;
}`,
    },
  ],
  memento: [
    {
      label: 'Java',
      lang: 'java',
      code: `class Memento { final String estado; Memento(String e){ estado=e; } }
class Origen {
    String estado;
    Memento guardar() { return new Memento(estado); }
    void restaurar(Memento m) { estado = m.estado; }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from dataclasses import dataclass

@dataclass
class Memento:
    estado: str

class Origen:
    def __init__(self) -> None:
        self.estado = ""
    def guardar(self) -> Memento:
        return Memento(self.estado)
    def restaurar(self, m: Memento) -> None:
        self.estado = m.estado`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `class Memento {
  constructor(readonly estado: string) {}
}
class Origen {
  estado = '';
  guardar() { return new Memento(this.estado); }
  restaurar(m: Memento) { this.estado = m.estado; }
}`,
    },
  ],
  observer: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Observador { void actualizar(); }
class Sujeto {
    List<Observador> obs = new ArrayList<>();
    void notificar() { obs.forEach(Observador::actualizar); }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from typing import Protocol

class Observador(Protocol):
    def actualizar(self) -> None: ...

class Sujeto:
    def __init__(self) -> None:
        self._obs: list[Observador] = []
    def notificar(self) -> None:
        for o in self._obs:
            o.actualizar()`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `type Observador = { actualizar(): void };
class Sujeto {
  private obs: Observador[] = [];
  notificar() { this.obs.forEach((o) => o.actualizar()); }
}`,
    },
  ],
  state: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface EstadoPuerta { void clic(Puerta p); }
class Puerta { EstadoPuerta estado; void clic() { estado.clic(this); } }`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class EstadoPuerta(ABC):
    @abstractmethod
    def clic(self, puerta: "Puerta") -> None: ...

class Puerta:
    def __init__(self) -> None:
        self.estado: EstadoPuerta | None = None
    def clic(self) -> None:
        assert self.estado
        self.estado.clic(self)`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface EstadoPuerta { clic(p: Puerta): void; }
class Puerta {
  estado!: EstadoPuerta;
  clic() { this.estado.clic(this); }
}`,
    },
  ],
  strategy: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Envio { int costo(int kg); }
class Carrito {
    Envio estrategia;
    int total(int kg) { return estrategia.costo(kg); }
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Envio(ABC):
    @abstractmethod
    def costo(self, kg: int) -> int: ...

class Carrito:
    def __init__(self, estrategia: Envio) -> None:
        self._e = estrategia
    def total(self, kg: int) -> int:
        return self._e.costo(kg)`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Envio { costo(kg: number): number; }
class Carrito {
  constructor(private e: Envio) {}
  total(kg: number) { return this.e.costo(kg); }
}`,
    },
  ],
  'template-method': [
    {
      label: 'Java',
      lang: 'java',
      code: `abstract class Informe {
    final void generar() {
        encabezado();
        cuerpo();
        pie();
    }
    abstract void cuerpo();
    void encabezado() {}
    void pie() {}
}`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Informe(ABC):
    def generar(self) -> None:
        self.encabezado()
        self.cuerpo()
        self.pie()
    @abstractmethod
    def cuerpo(self) -> None: ...
    def encabezado(self) -> None: ...
    def pie(self) -> None: ...`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `abstract class Informe {
  generar() {
    this.encabezado();
    this.cuerpo();
    this.pie();
  }
  abstract cuerpo(): void;
  encabezado() {}
  pie() {}
}`,
    },
  ],
  visitor: [
    {
      label: 'Java',
      lang: 'java',
      code: `interface Visitor { void visit(NodoA a); void visit(NodoB b); }
interface Nodo { void accept(Visitor v); }`,
    },
    {
      label: 'Python',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Visitor(ABC):
    @abstractmethod
    def visit_a(self, a: "NodoA") -> None: ...
    @abstractmethod
    def visit_b(self, b: "NodoB") -> None: ...`,
    },
    {
      label: 'TypeScript',
      lang: 'typescript',
      code: `interface Visitor {
  visitA(a: NodoA): void;
  visitB(b: NodoB): void;
}
interface Nodo {
  accept(v: Visitor): void;
}`,
    },
  ],
};
