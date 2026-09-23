export type UmlClassSpec = {
  name: string;
  attrs: string[];
  methods: string[];
};

export type PooGameChallenge = {
  id: number;
  slug: string;
  title: string;
  gameTheme: string;
  icon: string;
  context: string;
  task: string;
  mainClass: UmlClassSpec;
  associatedClasses: UmlClassSpec[];
  relations: { from: string; to: string; type: 'aggregation' | 'composition'; label: string }[];
  solutionCodeJava: string;
};

export const pooGameChallenges: PooGameChallenge[] = [
  {
    id: 1,
    slug: 'luchador-medieval',
    title: 'Gladiadores Medievales en la Arena',
    gameTheme: 'RPG Medieval / Gladiadores',
    icon: '⚔️',
    context: 'Dos luchadores combaten por turnos en una arena medieval. Cada luchador posee una Espada que calcula el daño con probabilidad de crítico, un Escudo que mitiga impactos consumiendo durabilidad, y una lista de Pociones curativas en su mochila.',
    task: 'Crea las clases Espada, Escudo, Pocion y Luchador. Modela la asociación entre el Luchador y su equipamiento. En el método ejecutarTurno(rival), el luchador decide si atacar con su espada o consumir una poción si su vida baja de 30.',
    mainClass: {
      name: 'Luchador',
      attrs: ['- nombre: String', '- vida: int', '- energia: int', '- arma: Espada', '- escudo: Escudo', '- pociones: List~Pocion~'],
      methods: [
        '+ atacar(rival: Luchador): void',
        '+ recibirDanio(danioEntrante: int): void',
        '+ usarPocion(indice: int): void',
        '+ estaVivo(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'Espada',
        attrs: ['- nombre: String', '- danioBase: int', '- probCritico: double'],
        methods: ['+ calcularDanio(): int'],
      },
      {
        name: 'Escudo',
        attrs: ['- nombre: String', '- defensa: int', '- durabilidad: int'],
        methods: ['+ mitigarDanio(danio: int): int'],
      },
      {
        name: 'Pocion',
        attrs: ['- nombre: String', '- puntosCuracion: int', '- usada: boolean'],
        methods: ['+ aplicar(objetivo: Luchador): int'],
      },
    ],
    relations: [
      { from: 'Luchador', to: 'Espada', type: 'aggregation', label: 'equipa 1' },
      { from: 'Luchador', to: 'Escudo', type: 'aggregation', label: 'equipa 1' },
      { from: 'Luchador', to: 'Pocion', type: 'composition', label: 'almacena *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class Espada {
    private String nombre;
    private int danioBase;
    private double probCritico;

    public Espada(String nombre, int danioBase, double probCritico) {
        this.nombre = nombre;
        this.danioBase = danioBase;
        this.probCritico = probCritico;
    }

    public int calcularDanio() {
        boolean esCritico = Math.random() < probCritico;
        int danioFinal = esCritico ? danioBase * 2 : danioBase;
        if (esCritico) System.out.println("  💥 ¡Golpe Crítico con " + nombre + "!");
        return danioFinal;
    }

    public String getNombre() { return nombre; }
}

class Escudo {
    private String nombre;
    private int defensa;
    private int durabilidad;

    public Escudo(String nombre, int defensa, int durabilidad) {
        this.nombre = nombre;
        this.defensa = defensa;
        this.durabilidad = durabilidad;
    }

    public int mitigarDanio(int danio) {
        if (durabilidad <= 0) return danio;
        int danioMitigado = Math.max(0, danio - defensa);
        durabilidad--;
        System.out.println("  🛡️ " + nombre + " absorbió " + (danio - danioMitigado) + " pts de daño. (Durabilidad restante: " + durabilidad + ")");
        return danioMitigado;
    }
}

class Pocion {
    private String nombre;
    private int puntosCuracion;
    private boolean usada;

    public Pocion(String nombre, int puntosCuracion) {
        this.nombre = nombre;
        this.puntosCuracion = puntosCuracion;
        this.usada = false;
    }

    public int aplicar(Luchador objetivo) {
        if (usada) return 0;
        this.usada = true;
        return puntosCuracion;
    }

    public boolean isUsada() { return usada; }
    public String getNombre() { return nombre; }
}

class Luchador {
    private String nombre;
    private int vida;
    private int energia;
    private Espada arma;
    private Escudo escudo;
    private List<Pocion> pociones;

    public Luchador(String nombre, int vida, int energia, Espada arma, Escudo escudo) {
        this.nombre = nombre;
        this.vida = vida;
        this.energia = energia;
        this.arma = arma;
        this.escudo = escudo;
        this.pociones = new ArrayList<>();
    }

    public void agregarPocion(Pocion p) {
        this.pociones.add(p);
    }

    public void atacar(Luchador rival) {
        System.out.println("⚔️ " + nombre + " ataca a " + rival.getNombre() + " con " + arma.getNombre() + "!");
        int danio = arma.calcularDanio();
        rival.recibirDanio(danio);
    }

    public void recibirDanio(int danioEntrante) {
        int danioFinal = escudo != null ? escudo.mitigarDanio(danioEntrante) : danioEntrante;
        this.vida = Math.max(0, this.vida - danioFinal);
        System.out.println("  💔 " + nombre + " recibe " + danioFinal + " de daño. Vida restante: " + this.vida + " HP.");
    }

    public void usarPocion(int indice) {
        if (indice >= 0 && indice < pociones.size()) {
            Pocion p = pociones.get(indice);
            if (!p.isUsada()) {
                int curacion = p.aplicar(this);
                this.vida += curacion;
                System.out.println("🧪 " + nombre + " usó " + p.getNombre() + " y recuperó " + curacion + " HP. Vida actual: " + this.vida);
            }
        }
    }

    public boolean estaVivo() { return this.vida > 0; }
    public String getNombre() { return nombre; }
    public int getVida() { return vida; }
}

public class Main {
    public static void main(String[] args) {
        Espada espadaExcalibur = new Espada("Excalibur", 25, 0.35);
        Escudo escudoTorre = new Escudo("Escudo de Roble", 10, 3);
        Luchador lancelot = new Luchador("Sir Lancelot", 100, 50, espadaExcalibur, escudoTorre);
        lancelot.agregarPocion(new Pocion("Elixir Mayor", 30));

        Espada hachaGuerra = new Espada("Filo Oscuro", 22, 0.20);
        Escudo broquelHierro = new Escudo("Broquel de Hierro", 8, 4);
        Luchador mordred = new Luchador("Mordred", 95, 40, hachaGuerra, broquelHierro);

        System.out.println("=== 🔔 INICIO DEL DUELO POR TURNOS ===");
        // Turno 1
        lancelot.atacar(mordred);
        // Turno 2
        mordred.atacar(lancelot);
        // Turno 3 - Curación
        lancelot.usarPocion(0);
    }
}`,
  },
  {
    id: 2,
    slug: 'pokemon-batalla',
    title: 'Duelo de Entrenadores Pokémon',
    gameTheme: 'Pokémon',
    icon: '⚡',
    context: 'Dos entrenadores se enfrentan en la liga. El Entrenador comanda un Pokémon activo y lleva en su mochila una lista de Items de Curación. El Pokémon posee una lista de 4 Movimientos con tipo, potencia y PP.',
    task: 'Modela Entrenador, Pokemon, Movimiento e ItemCura. En cada turno, el entrenador ordena ejecutar un movimiento por slot de su Pokémon contra el rival o aplica una Poción de su mochila.',
    mainClass: {
      name: 'Entrenador',
      attrs: ['- nombre: String', '- pokemonActivo: Pokemon', '- mochila: List~ItemCura~'],
      methods: [
        '+ ordenarAtaque(rival: Entrenador, slot: int): void',
        '+ usarItemMochila(indiceItem: int): void',
        '+ tienePokemonVivo(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'Pokemon',
        attrs: ['- especie: String', '- tipo: String', '- hpMax: int', '- hpActual: int', '- movimientos: List~Movimiento~'],
        methods: ['+ recibirDanio(danio: int): void', '+ ejecutarMovimiento(slot: int): Movimiento', '+ curar(hp: int): void'],
      },
      {
        name: 'Movimiento',
        attrs: ['- nombre: String', '- tipoElemento: String', '- potencia: int', '- ppActuales: int'],
        methods: ['+ consumirPP(): boolean', '+ getPotencia(): int'],
      },
      {
        name: 'ItemCura',
        attrs: ['- nombre: String', '- puntosRestaurados: int', '- cantidad: int'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'Entrenador', to: 'Pokemon', type: 'aggregation', label: 'comanda 1' },
      { from: 'Entrenador', to: 'ItemCura', type: 'composition', label: 'lleva *' },
      { from: 'Pokemon', to: 'Movimiento', type: 'composition', label: 'conoce *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class Movimiento {
    private String nombre;
    private String tipoElemento;
    private int potencia;
    private int ppActuales;

    public Movimiento(String nombre, String tipoElemento, int potencia, int ppMax) {
        this.nombre = nombre;
        this.tipoElemento = tipoElemento;
        this.potencia = potencia;
        this.ppActuales = ppMax;
    }

    public boolean consumirPP() {
        if (ppActuales > 0) {
            ppActuales--;
            return true;
        }
        return false;
    }

    public String getNombre() { return nombre; }
    public int getPotencia() { return potencia; }
    public int getPpActuales() { return ppActuales; }
}

class ItemCura {
    private String nombre;
    private int puntosRestaurados;
    private int cantidad;

    public ItemCura(String nombre, int puntosRestaurados, int cantidad) {
        this.nombre = nombre;
        this.puntosRestaurados = puntosRestaurados;
        this.cantidad = cantidad;
    }

    public int consumir() {
        if (cantidad > 0) {
            cantidad--;
            return puntosRestaurados;
        }
        return 0;
    }

    public String getNombre() { return nombre; }
    public int getCantidad() { return cantidad; }
}

class Pokemon {
    private String especie;
    private String tipo;
    private int hpMax;
    private int hpActual;
    private List<Movimiento> movimientos;

    public Pokemon(String especie, String tipo, int hpMax) {
        this.especie = especie;
        this.tipo = tipo;
        this.hpMax = hpMax;
        this.hpActual = hpMax;
        this.movimientos = new ArrayList<>();
    }

    public void aprenderMovimiento(Movimiento m) {
        if (movimientos.size() < 4) movimientos.add(m);
    }

    public Movimiento ejecutarMovimiento(int slot) {
        if (slot >= 0 && slot < movimientos.size()) {
            Movimiento m = movimientos.get(slot);
            if (m.consumirPP()) return m;
        }
        return null;
    }

    public void recibirDanio(int danio) {
        this.hpActual = Math.max(0, this.hpActual - danio);
        System.out.println("  💥 " + especie + " recibió " + danio + " de daño. (PS: " + hpActual + "/" + hpMax + ")");
    }

    public void curar(int hp) {
        this.hpActual = Math.min(hpMax, this.hpActual + hp);
        System.out.println("  ✨ " + especie + " recuperó salud. (PS: " + hpActual + "/" + hpMax + ")");
    }

    public boolean estaDebilitado() { return hpActual <= 0; }
    public String getEspecie() { return especie; }
    public int getHpActual() { return hpActual; }
}

class Entrenador {
    private String nombre;
    private Pokemon pokemonActivo;
    private List<ItemCura> mochila;

    public Entrenador(String nombre, Pokemon pokemonActivo) {
        this.nombre = nombre;
        this.pokemonActivo = pokemonActivo;
        this.mochila = new ArrayList<>();
    }

    public void agregarItem(ItemCura item) { mochila.add(item); }

    public void ordenarAtaque(Entrenador rival, int slot) {
        System.out.println("📢 " + nombre + ": ¡" + pokemonActivo.getEspecie() + ", adelante!");
        Movimiento mov = pokemonActivo.ejecutarMovimiento(slot);
        if (mov != null) {
            System.out.println("  🔥 Usó " + mov.getNombre() + " (Potencia: " + mov.getPotencia() + ")!");
            rival.getPokemonActivo().recibirDanio(mov.getPotencia());
        } else {
            System.out.println("  ❌ No quedan PP para ese movimiento.");
        }
    }

    public void usarItemMochila(int indiceItem) {
        if (indiceItem >= 0 && indiceItem < mochila.size()) {
            ItemCura item = mochila.get(indiceItem);
            int curacion = item.consumir();
            if (curacion > 0) {
                System.out.println("🎒 " + nombre + " usó " + item.getNombre() + " en " + pokemonActivo.getEspecie() + "!");
                pokemonActivo.curar(curacion);
            }
        }
    }

    public boolean tienePokemonVivo() { return !pokemonActivo.estaDebilitado(); }
    public Pokemon getPokemonActivo() { return pokemonActivo; }
    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        Pokemon pikachu = new Pokemon("Pikachu", "Eléctrico", 90);
        pikachu.aprenderMovimiento(new Movimiento("Impactrueno", "Eléctrico", 35, 15));
        pikachu.aprenderMovimiento(new Movimiento("Ataque Rápido", "Normal", 25, 20));

        Pokemon charizard = new Pokemon("Charizard", "Fuego", 120);
        charizard.aprenderMovimiento(new Movimiento("Lanzallamas", "Fuego", 40, 10));

        Entrenador ash = new Entrenador("Ash Ketchum", pikachu);
        ash.agregarItem(new ItemCura("Superpocion", 50, 2));

        Entrenador red = new Entrenador("Red", charizard);

        // Turnos
        ash.ordenarAtaque(red, 0);
        red.ordenarAtaque(ash, 0);
        ash.usarItemMochila(0);
    }
}`,
  },
  {
    id: 3,
    slug: 'yugioh-duelo',
    title: 'Duelo de Cartas TCG (Yu-Gi-Oh!)',
    gameTheme: 'Yu-Gi-Oh! / TCG',
    icon: '🎴',
    context: 'Dos duelistas se baten en duelo con 4000 LP. Cada duelista invoca un Monstruo en su zona de batalla, activa Cartas Mágicas de potenciación y envía cartas destruidas al Cementerio.',
    task: 'Implementa Duelista, CartaMonstruo, CartaMagica y ZonaDuelo. El duelista declara ataque entre su monstruo y el monstruo rival; la diferencia de ATK se resta a los LP del perdedor.',
    mainClass: {
      name: 'Duelista',
      attrs: ['- nombre: String', '- puntosVidaLP: int', '- monstruoCampo: CartaMonstruo', '- magicaActiva: CartaMagica', '- cementerio: List~CartaMonstruo~'],
      methods: [
        '+ invocarMonstruo(m: CartaMonstruo): void',
        '+ activarMagia(magia: CartaMagica): void',
        '+ declararAtaque(rival: Duelista): void',
        '+ estaDerrotado(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'CartaMonstruo',
        attrs: ['- nombre: String', '- estrellas: int', '- ataqueATK: int', '- defensaDEF: int', '- modoAtaque: boolean'],
        methods: ['+ potenciarATK(bonus: int): void', '+ getAtaqueATK(): int'],
      },
      {
        name: 'CartaMagica',
        attrs: ['- nombre: String', '- bonusATK: int', '- fueUsada: boolean'],
        methods: ['+ aplicarEfecto(objetivo: CartaMonstruo): void'],
      },
    ],
    relations: [
      { from: 'Duelista', to: 'CartaMonstruo', type: 'aggregation', label: 'controla 1' },
      { from: 'Duelista', to: 'CartaMagica', type: 'aggregation', label: 'activa 1' },
      { from: 'Duelista', to: 'CartaMonstruo', type: 'composition', label: 'cementerio *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class CartaMonstruo {
    private String nombre;
    private int estrellas;
    private int ataqueATK;
    private int defensaDEF;
    private boolean modoAtaque;

    public CartaMonstruo(String nombre, int estrellas, int ataqueATK, int defensaDEF) {
        this.nombre = nombre;
        this.estrellas = estrellas;
        this.ataqueATK = ataqueATK;
        this.defensaDEF = defensaDEF;
        this.modoAtaque = true;
    }

    public void potenciarATK(int bonus) {
        this.ataqueATK += bonus;
        System.out.println("  ✨ " + nombre + " aumentó su ATK a " + ataqueATK + "!");
    }

    public String getNombre() { return nombre; }
    public int getAtaqueATK() { return ataqueATK; }
    public int getDefensaDEF() { return defensaDEF; }
}

class CartaMagica {
    private String nombre;
    private int bonusATK;
    private boolean fueUsada;

    public CartaMagica(String nombre, int bonusATK) {
        this.nombre = nombre;
        this.bonusATK = bonusATK;
        this.fueUsada = false;
    }

    public void aplicarEfecto(CartaMonstruo objetivo) {
        if (!fueUsada && objetivo != null) {
            System.out.println("🎴 ¡Activando Carta Mágica: " + nombre + "!");
            objetivo.potenciarATK(bonusATK);
            this.fueUsada = true;
        }
    }
}

class Duelista {
    private String nombre;
    private int puntosVidaLP;
    private CartaMonstruo monstruoCampo;
    private CartaMagica magicaActiva;
    private List<CartaMonstruo> cementerio;

    public Duelista(String nombre, int puntosVidaLP) {
        this.nombre = nombre;
        this.puntosVidaLP = puntosVidaLP;
        this.cementerio = new ArrayList<>();
    }

    public void invocarMonstruo(CartaMonstruo m) {
        this.monstruoCampo = m;
        System.out.println("🎴 " + nombre + " invoca a " + m.getNombre() + " (ATK: " + m.getAtaqueATK() + "/DEF: " + m.getDefensaDEF() + ")!");
    }

    public void activarMagia(CartaMagica magia) {
        this.magicaActiva = magia;
        if (monstruoCampo != null) magia.aplicarEfecto(monstruoCampo);
    }

    public void declararAtaque(Duelista rival) {
        if (this.monstruoCampo == null) return;
        System.out.println("⚔️ " + nombre + " declara ataque con " + monstruoCampo.getNombre() + "!");

        CartaMonstruo rivalMonstruo = rival.getMonstruoCampo();
        if (rivalMonstruo != null) {
            int diff = this.monstruoCampo.getAtaqueATK() - rivalMonstruo.getAtaqueATK();
            if (diff > 0) {
                System.out.println("  💥 " + rivalMonstruo.getNombre() + " es destruido!");
                rival.enviarAlCementerio(rivalMonstruo);
                rival.reducirLP(diff);
            } else if (diff < 0) {
                System.out.println("  💥 El ataque falló y " + monstruoCampo.getNombre() + " fue destruido!");
                this.enviarAlCementerio(this.monstruoCampo);
                this.reducirLP(-diff);
            } else {
                System.out.println("  💥 ¡Ambos monstruos se destruyen mutuamente!");
                this.enviarAlCementerio(this.monstruoCampo);
                rival.enviarAlCementerio(rivalMonstruo);
            }
        }
    }

    public void enviarAlCementerio(CartaMonstruo m) {
        cementerio.add(m);
        if (monstruoCampo == m) monstruoCampo = null;
    }

    public void reducirLP(int danio) {
        this.puntosVidaLP = Math.max(0, this.puntosVidaLP - danio);
        System.out.println("  💔 " + nombre + " pierde " + danio + " LP. (LP restantes: " + puntosVidaLP + ")");
    }

    public boolean estaDerrotado() { return puntosVidaLP <= 0; }
    public CartaMonstruo getMonstruoCampo() { return monstruoCampo; }
    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        Duelista yugi = new Duelista("Yugi Muto", 4000);
        Duelista kaiba = new Duelista("Seto Kaiba", 4000);

        yugi.invocarMonstruo(new CartaMonstruo("Mago Oscuro", 7, 2500, 2100));
        kaiba.invocarMonstruo(new CartaMonstruo("Dragón Blanco de Ojos Azules", 8, 3000, 2500));

        // Yugi potencia a su monstruo con magia
        yugi.activarMagia(new CartaMagica("Libro de Magia Secreta", 700));

        // Yugi ataca a Kaiba
        yugi.declararAtaque(kaiba);
    }
}`,
  },
  {
    id: 4,
    slug: 'minecraft-pvp',
    title: 'Combate PvP en Arena de Bloques',
    gameTheme: 'Minecraft',
    icon: '⛏️',
    context: 'Dos jugadores en un servidor PvP de Minecraft combaten con Espadas de Diamante encantadas, Pecheras que absorben daño según su durabilidad y Manzanas Doradas de regeneración.',
    task: 'Modela JugadorSteve, EspadaDiamante, ArmaduraPechera y ManzanaDorada. En cada turno se calcula el golpe crítico con probabilidad y el consumo de manzanas si la salud está crítica.',
    mainClass: {
      name: 'JugadorSteve',
      attrs: ['- apodo: String', '- corazonesVida: double', '- armaPrincipal: EspadaDiamante', '- pechera: ArmaduraPechera', '- inventarioManzanas: List~ManzanaDorada~'],
      methods: [
        '+ golpear(enemigo: JugadorSteve): void',
        '+ recibirImpacto(danioFisico: double): void',
        '+ comerManzana(indice: int): void',
        '+ estaMuerto(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'EspadaDiamante',
        attrs: ['- nivelFilo: int', '- danioBase: double'],
        methods: ['+ calcularGolpe(): double'],
      },
      {
        name: 'ArmaduraPechera',
        attrs: ['- proteccionPuntos: int', '- durabilidad: int'],
        methods: ['+ mitigarDanio(danio: double): double'],
      },
      {
        name: 'ManzanaDorada',
        attrs: ['- corazonesRegeneracion: double', '- esEncantada: boolean', '- consumida: boolean'],
        methods: ['+ consumir(): double'],
      },
    ],
    relations: [
      { from: 'JugadorSteve', to: 'EspadaDiamante', type: 'aggregation', label: 'empuña 1' },
      { from: 'JugadorSteve', to: 'ArmaduraPechera', type: 'aggregation', label: 'viste 1' },
      { from: 'JugadorSteve', to: 'ManzanaDorada', type: 'composition', label: 'guarda *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class EspadaDiamante {
    private int nivelFilo;
    private double danioBase;

    public EspadaDiamante(int nivelFilo, double danioBase) {
        this.nivelFilo = nivelFilo;
        this.danioBase = danioBase;
    }

    public double calcularGolpe() {
        boolean critico = Math.random() < 0.30;
        double danio = danioBase + (nivelFilo * 1.25);
        if (critico) {
            danio *= 1.5;
            System.out.println("  💥 ¡Golpe Crítico con salto de espada!");
        }
        return danio;
    }
}

class ArmaduraPechera {
    private int proteccionPuntos;
    private int durabilidad;

    public ArmaduraPechera(int proteccionPuntos, int durabilidad) {
        this.proteccionPuntos = proteccionPuntos;
        this.durabilidad = durabilidad;
    }

    public double mitigarDanio(double danio) {
        if (durabilidad <= 0) return danio;
        double reduccion = proteccionPuntos * 0.4;
        durabilidad -= 2;
        return Math.max(1.0, danio - reduccion);
    }
}

class ManzanaDorada {
    private double corazonesRegeneracion;
    private boolean esEncantada;
    private boolean consumida;

    public ManzanaDorada(double corazones, boolean encantada) {
        this.corazonesRegeneracion = corazones;
        this.esEncantada = encantada;
        this.consumida = false;
    }

    public double consumir() {
        if (!consumida) {
            consumida = true;
            return corazonesRegeneracion;
        }
        return 0;
    }
}

class JugadorSteve {
    private String apodo;
    private double corazonesVida;
    private EspadaDiamante armaPrincipal;
    private ArmaduraPechera pechera;
    private List<ManzanaDorada> inventarioManzanas;

    public JugadorSteve(String apodo, double corazones, EspadaDiamante arma, ArmaduraPechera pechera) {
        this.apodo = apodo;
        this.corazonesVida = corazones;
        this.armaPrincipal = arma;
        this.pechera = pechera;
        this.inventarioManzanas = new ArrayList<>();
    }

    public void agregarManzana(ManzanaDorada m) { inventarioManzanas.add(m); }

    public void golpear(JugadorSteve enemigo) {
        System.out.println("🗡️ " + apodo + " ataca a " + enemigo.getApodo() + "!");
        double danio = armaPrincipal.calcularGolpe();
        enemigo.recibirImpacto(danio);
    }

    public void recibirImpacto(double danioFisico) {
        double danioFinal = pechera != null ? pechera.mitigarDanio(danioFisico) : danioFisico;
        this.corazonesVida = Math.max(0.0, this.corazonesVida - danioFinal);
        System.out.printf("  💔 %s recibió %.1f de daño. Corazones: %.1f/20.0\\n", apodo, danioFinal, corazonesVida);
    }

    public void comerManzana(int indice) {
        if (indice >= 0 && indice < inventarioManzanas.size()) {
            double curado = inventarioManzanas.get(indice).consumir();
            if (curado > 0) {
                this.corazonesVida = Math.min(20.0, this.corazonesVida + curado);
                System.out.printf("🍎 %s comió Manzana Dorada y regeneró %.1f corazones! (Total: %.1f)\\n", apodo, curado, corazonesVida);
            }
        }
    }

    public boolean estaMuerto() { return corazonesVida <= 0; }
    public String getApodo() { return apodo; }
}

public class Main {
    public static void main(String[] args) {
        EspadaDiamante espada1 = new EspadaDiamante(5, 7.0);
        ArmaduraPechera pechera1 = new ArmaduraPechera(8, 100);
        JugadorSteve steve = new JugadorSteve("Steve_Pro", 20.0, espada1, pechera1);
        steve.agregarManzana(new ManzanaDorada(6.0, true));

        EspadaDiamante espada2 = new EspadaDiamante(4, 7.0);
        ArmaduraPechera pechera2 = new ArmaduraPechera(6, 80);
        JugadorSteve alex = new JugadorSteve("Alex_Gamer", 20.0, espada2, pechera2);

        steve.golpear(alex);
        alex.golpear(steve);
        alex.golpear(steve);
        steve.comerManzana(0);
    }
}`,
  },
  {
    id: 5,
    slug: 'fortnite-battle-royale',
    title: 'Duelo 1v1 Battle Royale (Fortnite)',
    gameTheme: 'Fortnite / Battle Royale',
    icon: '🎯',
    context: 'Dos supervivientes en el círculo final intercambian disparos de escopeta Pump, erigen muros de madera para cubrirse y beben mini escudos para regenerar protección.',
    task: 'Modela JugadorBR, EscopetaPump, MuroConstruccion y MiniEscudo. Si el jugador tiene un muro en pie, el daño del disparo rival destruye primero el muro antes de impactar el escudo/salud.',
    mainClass: {
      name: 'JugadorBR',
      attrs: ['- gamerTag: String', '- salud: int', '- escudo: int', '- arma: EscopetaPump', '- muroActivo: MuroConstruccion', '- inventarioMinis: List~MiniEscudo~'],
      methods: [
        '+ dispararEscopeta(rival: JugadorBR): void',
        '+ construirMuro(tipoMaterial: String): void',
        '+ recibirImpacto(danio: int): void',
        '+ beberMini(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'EscopetaPump',
        attrs: ['- rareza: String', '- danioPorPerdigon: int', '- perdigonesPorTiro: int'],
        methods: ['+ calcularDisparo(): int'],
      },
      {
        name: 'MuroConstruccion',
        attrs: ['- material: String', '- saludMuro: int', '- estaDestruido: boolean'],
        methods: ['+ absorberDanio(danio: int): int'],
      },
      {
        name: 'MiniEscudo',
        attrs: ['- valorEscudo: int', '- consumido: boolean'],
        methods: ['+ aplicar(escudoActual: int): int'],
      },
    ],
    relations: [
      { from: 'JugadorBR', to: 'EscopetaPump', type: 'aggregation', label: 'porta 1' },
      { from: 'JugadorBR', to: 'MuroConstruccion', type: 'aggregation', label: 'levanta 1' },
      { from: 'JugadorBR', to: 'MiniEscudo', type: 'composition', label: 'bolsillo *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class EscopetaPump {
    private String rareza;
    private int danioPorPerdigon;
    private int perdigonesPorTiro;

    public EscopetaPump(String rareza, int danioPorPerdigon, int perdigones) {
        this.rareza = rareza;
        this.danioPorPerdigon = danioPorPerdigon;
        this.perdigonesPorTiro = perdigones;
    }

    public int calcularDisparo() {
        int impactados = (int) (Math.random() * 4) + 6; // 6 a 10 perdigones
        int total = impactados * danioPorPerdigon;
        System.out.println("  💥 Pump " + rareza + " impactó " + impactados + "/" + perdigonesPorTiro + " perdigones (" + total + " dmg)!");
        return total;
    }
}

class MuroConstruccion {
    private String material;
    private int saludMuro;

    public MuroConstruccion(String material, int saludInicial) {
        this.material = material;
        this.saludMuro = saludInicial;
    }

    public int absorberDanio(int danio) {
        if (saludMuro <= 0) return danio;
        if (danio >= saludMuro) {
            int sobrante = danio - saludMuro;
            System.out.println("  🧱 ¡El muro de " + material + " fue destruido!");
            saludMuro = 0;
            return sobrante;
        } else {
            saludMuro -= danio;
            System.out.println("  🧱 El muro de " + material + " bloqueó todo el daño (Salud muro restante: " + saludMuro + ")");
            return 0;
        }
    }

    public boolean isEnPie() { return saludMuro > 0; }
}

class MiniEscudo {
    private int valorEscudo;
    private boolean consumido;

    public MiniEscudo(int valorEscudo) {
        this.valorEscudo = valorEscudo;
        this.consumido = false;
    }

    public int aplicar(int escudoActual) {
        if (!consumido && escudoActual < 50) {
            consumido = true;
            return Math.min(valorEscudo, 50 - escudoActual);
        }
        return 0;
    }
}

class JugadorBR {
    private String gamerTag;
    private int salud;
    private int escudo;
    private EscopetaPump arma;
    private MuroConstruccion muroActivo;
    private List<MiniEscudo> inventarioMinis;

    public JugadorBR(String gamerTag, EscopetaPump arma) {
        this.gamerTag = gamerTag;
        this.salud = 100;
        this.escudo = 50;
        this.arma = arma;
        this.inventarioMinis = new ArrayList<>();
    }

    public void agregarMini(MiniEscudo mini) { inventarioMinis.add(mini); }

    public void construirMuro(String material) {
        this.muroActivo = new MuroConstruccion(material, 150);
        System.out.println("🏗️ " + gamerTag + " levantó una pared de " + material + "!");
    }

    public void dispararEscopeta(JugadorBR rival) {
        System.out.println("🎯 " + gamerTag + " dispara su Pump contra " + rival.getGamerTag() + "!");
        int danio = arma.calcularDisparo();
        rival.recibirImpacto(danio);
    }

    public void recibirImpacto(int danio) {
        int danioRestante = (muroActivo != null && muroActivo.isEnPie()) ? muroActivo.absorberDanio(danio) : danio;
        if (danioRestante > 0) {
            if (escudo > 0) {
                int absorbidoEscudo = Math.min(escudo, danioRestante);
                escudo -= absorbidoEscudo;
                danioRestante -= absorbidoEscudo;
            }
            salud = Math.max(0, salud - danioRestante);
            System.out.println("  💔 " + gamerTag + " -> Salud: " + salud + " | Escudo: " + escudo);
        }
    }

    public void beberMini(int indice) {
        if (indice >= 0 && indice < inventarioMinis.size()) {
            int recargado = inventarioMinis.get(indice).aplicar(escudo);
            if (recargado > 0) {
                escudo += recargado;
                System.out.println("🧪 " + gamerTag + " bebió un Mini (+ " + recargado + " escudo). Escudo total: " + escudo);
            }
        }
    }

    public String getGamerTag() { return gamerTag; }
}

public class Main {
    public static void main(String[] args) {
        EscopetaPump pumpDorada = new EscopetaPump("Legendaria", 11, 10);
        JugadorBR ninja = new JugadorBR("Ninja", pumpDorada);
        ninja.agregarMini(new MiniEscudo(25));

        EscopetaPump pumpAzul = new EscopetaPump("Rara", 9, 10);
        JugadorBR tfue = new JugadorBR("Tfue", pumpAzul);

        ninja.dispararEscopeta(tfue);
        tfue.construirMuro("Madera");
        ninja.dispararEscopeta(tfue);
        tfue.beberMini(0);
    }
}`,
  },
  {
    id: 6,
    slug: 'dark-souls-duelo',
    title: 'Duelo de Cenizas (Dark Souls / Elden Ring)',
    gameTheme: 'Dark Souls / Soulslike',
    icon: '🔥',
    context: 'Un SinLuz desafía a un Caballero Negro. Cada combatiente gestiona su barra de Estamina para empuñar UltraEspadas pesadas y Frascos de Estus para recuperar PS.',
    task: 'Modela CaballeroSinLuz, UltraEspada, FrascoEstus y TalismanProteccion. Los ataques consumen estamina; si el combatiente no tiene estamina suficiente, su golpe se cancela.',
    mainClass: {
      name: 'CaballeroSinLuz',
      attrs: ['- nombre: String', '- puntosVidaPS: int', '- estamina: int', '- armaPesada: UltraEspada', '- frasco: FrascoEstus', '- talisman: TalismanProteccion'],
      methods: [
        '+ ejecutarTajo(rival: CaballeroSinLuz): void',
        '+ beberEstus(): void',
        '+ regenerarEstamina(): void',
        '+ recibirGolpe(danio: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'UltraEspada',
        attrs: ['- nombre: String', '- danioFisico: int', '- costoEstamina: int'],
        methods: ['+ calcularGolpe(): int'],
      },
      {
        name: 'FrascoEstus',
        attrs: ['- nivelRefuerzo: int', '- curacionBase: int', '- usosRestantes: int'],
        methods: ['+ beber(): int'],
      },
      {
        name: 'TalismanProteccion',
        attrs: ['- reduccionDanioPorcentaje: double'],
        methods: ['+ filtrarDanio(danio: int): int'],
      },
    ],
    relations: [
      { from: 'CaballeroSinLuz', to: 'UltraEspada', type: 'aggregation', label: 'empuña 1' },
      { from: 'CaballeroSinLuz', to: 'FrascoEstus', type: 'composition', label: 'posee 1' },
      { from: 'CaballeroSinLuz', to: 'TalismanProteccion', type: 'aggregation', label: 'equipa 1' },
    ],
    solutionCodeJava: `class UltraEspada {
    private String nombre;
    private int danioFisico;
    private int costoEstamina;

    public UltraEspada(String nombre, int danio, int costoEstamina) {
        this.nombre = nombre;
        this.danioFisico = danio;
        this.costoEstamina = costoEstamina;
    }

    public int calcularGolpe() { return danioFisico; }
    public int getCostoEstamina() { return costoEstamina; }
    public String getNombre() { return nombre; }
}

class FrascoEstus {
    private int nivelRefuerzo;
    private int curacionBase;
    private int usosRestantes;

    public FrascoEstus(int refuerzo, int curacion, int usos) {
        this.nivelRefuerzo = refuerzo;
        this.curacionBase = curacion + (refuerzo * 25);
        this.usosRestantes = usos;
    }

    public int beber() {
        if (usosRestantes > 0) {
            usosRestantes--;
            return curacionBase;
        }
        return 0;
    }

    public int getUsosRestantes() { return usosRestantes; }
}

class TalismanProteccion {
    private double reduccionDanioPorcentaje;

    public TalismanProteccion(double reduccion) {
        this.reduccionDanioPorcentaje = reduccion;
    }

    public int filtrarDanio(int danio) {
        return (int) (danio * (1.0 - reduccionDanioPorcentaje));
    }
}

class CaballeroSinLuz {
    private String nombre;
    private int puntosVidaPS;
    private int estamina;
    private UltraEspada armaPesada;
    private FrascoEstus frasco;
    private TalismanProteccion talisman;

    public CaballeroSinLuz(String nombre, int ps, int estamina, UltraEspada arma, FrascoEstus frasco, TalismanProteccion talisman) {
        this.nombre = nombre;
        this.puntosVidaPS = ps;
        this.estamina = estamina;
        this.armaPesada = arma;
        this.frasco = frasco;
        this.talisman = talisman;
    }

    public void ejecutarTajo(CaballeroSinLuz rival) {
        if (estamina >= armaPesada.getCostoEstamina()) {
            estamina -= armaPesada.getCostoEstamina();
            System.out.println("⚔️ " + nombre + " descarga un tajo colosal con " + armaPesada.getNombre() + "! (Estamina: " + estamina + ")");
            rival.recibirGolpe(armaPesada.calcularGolpe());
        } else {
            System.out.println("⚠️ " + nombre + " no tiene suficiente estamina para blandir su arma!");
        }
    }

    public void beberEstus() {
        int curado = frasco.beber();
        if (curado > 0) {
            puntosVidaPS += curado;
            System.out.println("🔥 " + nombre + " bebió Frasco de Estus (+ " + curado + " PS). Salud actual: " + puntosVidaPS + " (Estus: " + frasco.getUsosRestantes() + ")");
        }
    }

    public void recibirGolpe(int danio) {
        int danioFinal = talisman != null ? talisman.filtrarDanio(danio) : danio;
        puntosVidaPS = Math.max(0, puntosVidaPS - danioFinal);
        System.out.println("  💔 " + nombre + " sufre " + danioFinal + " de daño. PS restantes: " + puntosVidaPS);
    }

    public void regenerarEstamina() {
        estamina += 30;
        System.out.println("💨 " + nombre + " recuperó el aliento (+30 estamina).");
    }

    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        UltraEspada espadonGuts = new UltraEspada("Espadón de Ceniza", 48, 35);
        FrascoEstus estus = new FrascoEstus(2, 60, 3);
        TalismanProteccion talismanDragon = new TalismanProteccion(0.15);

        CaballeroSinLuz heroe = new CaballeroSinLuz("Latente de Lothric", 160, 70, espadonGuts, estus, talismanDragon);
        CaballeroSinLuz boss = new CaballeroSinLuz("Caballero Negro", 180, 60, new UltraEspada("Hacha de Caballero", 42, 30), new FrascoEstus(0, 0, 0), null);

        heroe.ejecutarTajo(boss);
        boss.ejecutarTajo(heroe);
        heroe.beberEstus();
    }
}`,
  },
  {
    id: 7,
    slug: 'lol-mid-lane',
    title: 'Duelo 1v1 en Mid Lane (League of Legends)',
    gameTheme: 'League of Legends / MOBA',
    icon: '🏆',
    context: 'Dos campeones se enfrentan en la línea central. Cada campeón tiene estadísticas de AP/AD potenciadas por un Objeto Mítico, lanza su Habilidad Q gastando maná y bebe Pociones Corruptas.',
    task: 'Modela Campeon, ObjetoMitico, HabilidadQ y PocionCorrupta. En cada turno se comprueba el enfriamiento y coste de maná de la habilidad antes de infligir daño al rival.',
    mainClass: {
      name: 'Campeon',
      attrs: ['- nombreCampeon: String', '- saludHP: int', '- manaMP: int', '- itemMitico: ObjetoMitico', '- habilidadQ: HabilidadQ', '- pociones: List~PocionCorrupta~'],
      methods: [
        '+ lanzarHabilidadQ(rival: Campeon): void',
        '+ autoAtaque(rival: Campeon): void',
        '+ consumirPocion(indice: int): void',
        '+ estaVivo(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'ObjetoMitico',
        attrs: ['- nombre: String', '- ataqueAD: int', '- poderHabilidadAP: int', '- manaBonus: int'],
        methods: ['+ getAtaqueAD(): int', '+ getPoderHabilidadAP(): int'],
      },
      {
        name: 'HabilidadQ',
        attrs: ['- nombreHabilidad: String', '- danioBase: int', '- costoMana: int', '- escaladoAP: double'],
        methods: ['+ calcularDanioTotal(apCampeon: int): int'],
      },
      {
        name: 'PocionCorrupta',
        attrs: ['- cargasRestantes: int', '- curaSalud: int', '- curaMana: int'],
        methods: ['+ usarCarga(): boolean'],
      },
    ],
    relations: [
      { from: 'Campeon', to: 'ObjetoMitico', type: 'aggregation', label: 'equipa 1' },
      { from: 'Campeon', to: 'HabilidadQ', type: 'composition', label: 'aprende 1' },
      { from: 'Campeon', to: 'PocionCorrupta', type: 'composition', label: 'lleva *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class ObjetoMitico {
    private String nombre;
    private int ataqueAD;
    private int poderHabilidadAP;

    public ObjetoMitico(String nombre, int ad, int ap) {
        this.nombre = nombre;
        this.ataqueAD = ad;
        this.poderHabilidadAP = ap;
    }

    public int getAtaqueAD() { return ataqueAD; }
    public int getPoderHabilidadAP() { return poderHabilidadAP; }
}

class HabilidadQ {
    private String nombreHabilidad;
    private int danioBase;
    private int costoMana;
    private double escaladoAP;

    public HabilidadQ(String nombre, int danioBase, int costoMana, double escaladoAP) {
        this.nombreHabilidad = nombre;
        this.danioBase = danioBase;
        this.costoMana = costoMana;
        this.escaladoAP = escaladoAP;
    }

    public int calcularDanioTotal(int apCampeon) {
        return danioBase + (int) (apCampeon * escaladoAP);
    }

    public int getCostoMana() { return costoMana; }
    public String getNombreHabilidad() { return nombreHabilidad; }
}

class PocionCorrupta {
    private int cargas;
    private int curaSalud;
    private int curaMana;

    public PocionCorrupta(int cargas, int curaSalud, int curaMana) {
        this.cargas = cargas;
        this.curaSalud = curaSalud;
        this.curaMana = curaMana;
    }

    public boolean usarCarga() {
        if (cargas > 0) {
            cargas--;
            return true;
        }
        return false;
    }

    public int getCuraSalud() { return curaSalud; }
    public int getCuraMana() { return curaMana; }
}

class Campeon {
    private String nombreCampeon;
    private int saludHP;
    private int manaMP;
    private ObjetoMitico itemMitico;
    private HabilidadQ habilidadQ;
    private List<PocionCorrupta> pociones;

    public Campeon(String nombre, int hp, int mp, ObjetoMitico item, HabilidadQ q) {
        this.nombreCampeon = nombre;
        this.saludHP = hp;
        this.manaMP = mp;
        this.itemMitico = item;
        this.habilidadQ = q;
        this.pociones = new ArrayList<>();
    }

    public void agregarPocion(PocionCorrupta p) { pociones.add(p); }

    public void lanzarHabilidadQ(Campeon rival) {
        if (manaMP >= habilidadQ.getCostoMana()) {
            manaMP -= habilidadQ.getCostoMana();
            int apTotal = itemMitico != null ? itemMitico.getPoderHabilidadAP() : 0;
            int danio = habilidadQ.calcularDanioTotal(apTotal);
            System.out.println("✨ " + nombreCampeon + " lanza [" + habilidadQ.getNombreHabilidad() + "]!");
            rival.recibirDanio(danio);
        } else {
            System.out.println("⚠️ " + nombreCampeon + " no tiene suficiente maná!");
        }
    }

    public void autoAtaque(Campeon rival) {
        int ad = 40 + (itemMitico != null ? itemMitico.getAtaqueAD() : 0);
        System.out.println("🗡️ " + nombreCampeon + " conecta un básico a " + rival.getNombreCampeon() + "!");
        rival.recibirDanio(ad);
    }

    public void recibirDanio(int danio) {
        this.saludHP = Math.max(0, this.saludHP - danio);
        System.out.println("  💥 " + nombreCampeon + " recibió " + danio + " dmg. (HP: " + saludHP + ")");
    }

    public void consumirPocion(int indice) {
        if (indice >= 0 && indice < pociones.size()) {
            PocionCorrupta pot = pociones.get(indice);
            if (pot.usarCarga()) {
                saludHP += pot.getCuraSalud();
                manaMP += pot.getCuraMana();
                System.out.println("🧪 " + nombreCampeon + " consumió poción corrupta (+HP/+MP).");
            }
        }
    }

    public String getNombreCampeon() { return nombreCampeon; }
}

public class Main {
    public static void main(String[] args) {
        ObjetoMitico ecoLuden = new ObjetoMitico("Eco de Luden", 0, 80);
        HabilidadQ orbeEngano = new HabilidadQ("Orbe del Engaño", 55, 40, 0.70);
        Campeon ahri = new Campeon("Ahri", 280, 200, ecoLuden, orbeEngano);
        ahri.agregarPocion(new PocionCorrupta(3, 40, 30));

        ObjetoMitico tempestadLuden = new ObjetoMitico("Tempestad de Luden", 0, 70);
        HabilidadQ desintegrar = new HabilidadQ("Desintegrar", 50, 35, 0.65);
        Campeon annie = new Campeon("Annie", 270, 190, tempestadLuden, desintegrar);

        ahri.lanzarHabilidadQ(annie);
        annie.lanzarHabilidadQ(ahri);
        ahri.consumirPocion(0);
    }
}`,
  },
  {
    id: 8,
    slug: 'dragon-ball-torneo',
    title: 'Torneo de Guerreros Z (Dragon Ball)',
    gameTheme: 'Dragon Ball Z',
    icon: '🐉',
    context: 'Dos guerreros se baten a duelo en el Torneo de las Artes Marciales. Gestionan su barra de Ki, liberan Técnicas Especiales de energía y consumen Semillas del Ermitaño.',
    task: 'Modela GuerreroZ, TecnicaKi, SemillaErmitano y AuraTransformacion. En cada turno el guerrero puede Cargar Ki, lanzar su técnica especial o comer una semilla si su vida es baja.',
    mainClass: {
      name: 'GuerreroZ',
      attrs: ['- nombre: String', '- vidaHp: int', '- kiActual: int', '- tecnica: TecnicaKi', '- semilla: SemillaErmitano', '- aura: AuraTransformacion'],
      methods: [
        '+ cargarKi(): void',
        '+ lanzarTecnicaEspecial(rival: GuerreroZ): void',
        '+ comerSemilla(): void',
        '+ recibirGolpeKi(danio: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'TecnicaKi',
        attrs: ['- nombreTecnica: String', '- costoKi: int', '- potenciaBase: int'],
        methods: ['+ calcularDanio(multiplicadorAura: double): int'],
      },
      {
        name: 'SemillaErmitano',
        attrs: ['- disponible: boolean'],
        methods: ['+ consumir(): boolean'],
      },
      {
        name: 'AuraTransformacion',
        attrs: ['- nombreFase: String', '- multiplicadorPoder: double', '- activa: boolean'],
        methods: ['+ activar(): void'],
      },
    ],
    relations: [
      { from: 'GuerreroZ', to: 'TecnicaKi', type: 'composition', label: 'domina 1' },
      { from: 'GuerreroZ', to: 'SemillaErmitano', type: 'aggregation', label: 'guarda 1' },
      { from: 'GuerreroZ', to: 'AuraTransformacion', type: 'aggregation', label: 'canaliza 1' },
    ],
    solutionCodeJava: `class TecnicaKi {
    private String nombreTecnica;
    private int costoKi;
    private int potenciaBase;

    public TecnicaKi(String nombre, int costoKi, int potencia) {
        this.nombreTecnica = nombre;
        this.costoKi = costoKi;
        this.potenciaBase = potencia;
    }

    public int calcularDanio(double multiplicadorAura) {
        return (int) (potenciaBase * multiplicadorAura);
    }

    public int getCostoKi() { return costoKi; }
    public String getNombreTecnica() { return nombreTecnica; }
}

class SemillaErmitano {
    private boolean disponible = true;

    public boolean consumir() {
        if (disponible) {
            disponible = false;
            return true;
        }
        return false;
    }
}

class AuraTransformacion {
    private String nombreFase;
    private double multiplicador;
    private boolean activa = false;

    public AuraTransformacion(String fase, double mult) {
        this.nombreFase = fase;
        this.multiplicador = mult;
    }

    public void activar() {
        this.activa = true;
        System.out.println("⚡ ¡Despertó la transformación " + nombreFase + "!");
    }

    public double getMultiplicador() { return activa ? multiplicador : 1.0; }
}

class GuerreroZ {
    private String nombre;
    private int vidaHp;
    private int kiActual;
    private TecnicaKi tecnica;
    private SemillaErmitano semilla;
    private AuraTransformacion aura;

    public GuerreroZ(String nombre, int hp, TecnicaKi tecnica, AuraTransformacion aura) {
        this.nombre = nombre;
        this.vidaHp = hp;
        this.kiActual = 50;
        this.tecnica = tecnica;
        this.semilla = new SemillaErmitano();
        this.aura = aura;
    }

    public void cargarKi() {
        kiActual += 35;
        System.out.println("💥 " + nombre + " concentra su Ki (+35 Ki). Total Ki: " + kiActual);
        if (kiActual >= 80 && aura != null) aura.activar();
    }

    public void lanzarTecnicaEspecial(GuerreroZ rival) {
        if (kiActual >= tecnica.getCostoKi()) {
            kiActual -= tecnica.getCostoKi();
            int danio = tecnica.calcularDanio(aura != null ? aura.getMultiplicador() : 1.0);
            System.out.println("🔥 ¡" + nombre + " grita: " + tecnica.getNombreTecnica() + "!");
            rival.recibirGolpeKi(danio);
        } else {
            System.out.println("⚠️ " + nombre + " no tiene suficiente Ki!");
        }
    }

    public void comerSemilla() {
        if (semilla.consumir()) {
            this.vidaHp = 200;
            this.kiActual = 100;
            System.out.println("🌱 " + nombre + " comió una Semilla del Ermitaño! (Salud y Ki al 100%)");
        }
    }

    public void recibirGolpeKi(int danio) {
        this.vidaHp = Math.max(0, this.vidaHp - danio);
        System.out.println("  💥 " + nombre + " recibió el impacto (-" + danio + " HP). Salud restante: " + vidaHp);
    }

    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        GuerreroZ goku = new GuerreroZ("Goku", 180, new TecnicaKi("KAMEHAMEHA", 45, 60), new AuraTransformacion("Super Saiyajin", 1.5));
        GuerreroZ vegeta = new GuerreroZ("Vegeta", 175, new TecnicaKi("FINAL FLASH", 50, 65), new AuraTransformacion("Super Vegeta", 1.4));

        goku.cargarKi();
        goku.lanzarTecnicaEspecial(vegeta);
        vegeta.cargarKi();
        vegeta.lanzarTecnicaEspecial(goku);
        goku.comerSemilla();
    }
}`,
  },
  {
    id: 9,
    slug: 'genshin-reacciones',
    title: 'Reacciones Elementales de Teyvat (Genshin Impact)',
    gameTheme: 'Genshin Impact',
    icon: '✨',
    context: 'Dos personajes canalizan visiones de Pyro y Hydro. Cada personaje porta un Arma legendaria con crítico, un Set de Artefactos de maestría y platos de comida curativa.',
    task: 'Modela PersonajeTeyvat, ArmaGenshin, SetArtefactos y ComidaCurativa. Si el rival ya tiene aura Hydro aplicada y recibe ataque Pyro, se activa la reacción Vaporización multiplicando el daño.',
    mainClass: {
      name: 'PersonajeTeyvat',
      attrs: ['- nombre: String', '- elementoVision: String', '- vidaHp: int', '- auraAplicada: String', '- arma: ArmaGenshin', '- artefactos: SetArtefactos', '- platos: List~ComidaCurativa~'],
      methods: [
        '+ habilidadElemental(rival: PersonajeTeyvat): void',
        '+ comerPlato(indice: int): void',
        '+ recibirImpactoElemental(danioBase: int, elementoAtacante: String): void',
      ],
    },
    associatedClasses: [
      {
        name: 'ArmaGenshin',
        attrs: ['- nombreArma: String', '- ataqueBasico: int', '- probCritico: double'],
        methods: ['+ getDanioTotal(): int'],
      },
      {
        name: 'SetArtefactos',
        attrs: ['- maestriaElemental: int', '- bonoDanioPorcentaje: double'],
        methods: ['+ calcularMultiplicadorReaccion(): double'],
      },
      {
        name: 'ComidaCurativa',
        attrs: ['- nombrePlato: String', '- puntosCuracion: int', '- servida: boolean'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'PersonajeTeyvat', to: 'ArmaGenshin', type: 'aggregation', label: 'empuña 1' },
      { from: 'PersonajeTeyvat', to: 'SetArtefactos', type: 'aggregation', label: 'equipa 1' },
      { from: 'PersonajeTeyvat', to: 'ComidaCurativa', type: 'composition', label: 'almacena *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class ArmaGenshin {
    private String nombreArma;
    private int ataqueBasico;
    private double probCritico;

    public ArmaGenshin(String nombre, int atk, double crit) {
        this.nombreArma = nombre;
        this.ataqueBasico = atk;
        this.probCritico = crit;
    }

    public int getDanioTotal() {
        boolean crit = Math.random() < probCritico;
        if (crit) System.out.println("  💥 ¡Golpe Crítico con " + nombreArma + "!");
        return crit ? (int)(ataqueBasico * 1.8) : ataqueBasico;
    }
}

class SetArtefactos {
    private int maestriaElemental;

    public SetArtefactos(int maestria) {
        this.maestriaElemental = maestria;
    }

    public double calcularMultiplicadorReaccion() {
        return 1.5 + (maestriaElemental * 0.002);
    }
}

class ComidaCurativa {
    private String nombrePlato;
    private int puntosCuracion;
    private boolean servida = false;

    public ComidaCurativa(String nombre, int cura) {
        this.nombrePlato = nombre;
        this.puntosCuracion = cura;
    }

    public int consumir() {
        if (!servida) {
            servida = true;
            return puntosCuracion;
        }
        return 0;
    }
    public String getNombrePlato() { return nombrePlato; }
}

class PersonajeTeyvat {
    private String nombre;
    private String elementoVision;
    private int vidaHp;
    private String auraAplicada = "Ninguna";
    private ArmaGenshin arma;
    private SetArtefactos artefactos;
    private List<ComidaCurativa> platos;

    public PersonajeTeyvat(String nombre, String elemento, int hp, ArmaGenshin arma, SetArtefactos artefactos) {
        this.nombre = nombre;
        this.elementoVision = elemento;
        this.vidaHp = hp;
        this.arma = arma;
        this.artefactos = artefactos;
        this.platos = new ArrayList<>();
    }

    public void agregarComida(ComidaCurativa c) { platos.add(c); }

    public void habilidadElemental(PersonajeTeyvat rival) {
        System.out.println("🌟 " + nombre + " [" + elementoVision + "] usa Habilidad Elemental contra " + rival.getNombre() + "!");
        int danio = arma.getDanioTotal();
        rival.recibirImpactoElemental(danio, this.elementoVision);
    }

    public void recibirImpactoElemental(int danioBase, String elementoAtacante) {
        int danioFinal = danioBase;
        if (this.auraAplicada.equals("Hydro") && elementoAtacante.equals("Pyro")) {
            double mult = artefactos != null ? artefactos.calcularMultiplicadorReaccion() : 1.5;
            danioFinal = (int) (danioBase * mult);
            System.out.printf("  🔥💧 ¡REACCIÓN ELEMENTAL: VAPORIZACIÓN! (Daño x%.2f = %d)\\n", mult, danioFinal);
            this.auraAplicada = "Ninguna";
        } else {
            this.auraAplicada = elementoAtacante;
            System.out.println("  💧 Aura " + elementoAtacante + " aplicada al objetivo.");
        }
        this.vidaHp = Math.max(0, this.vidaHp - danioFinal);
        System.out.println("  💔 " + nombre + " HP restante: " + vidaHp);
    }

    public void comerPlato(int indice) {
        if (indice >= 0 && indice < platos.size()) {
            ComidaCurativa comida = platos.get(indice);
            int curado = comida.consumir();
            if (curado > 0) {
                this.vidaHp += curado;
                System.out.println("🍲 " + nombre + " comió " + comida.getNombrePlato() + " (+ " + curado + " HP).");
            }
        }
    }

    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        PersonajeTeyvat yelan = new PersonajeTeyvat("Yelan", "Hydro", 200, new ArmaGenshin("Aqua Simulacra", 35, 0.4), new SetArtefactos(100));
        PersonajeTeyvat hutao = new PersonajeTeyvat("Hu Tao", "Pyro", 180, new ArmaGenshin("Báculo de Homa", 45, 0.5), new SetArtefactos(220));
        hutao.agregarComida(new ComidaCurativa("Tricolor Dango", 50));

        yelan.habilidadElemental(hutao);
        hutao.habilidadElemental(yelan);
        hutao.comerPlato(0);
    }
}`,
  },
  {
    id: 10,
    slug: 'wow-arena-pvp',
    title: 'Arena PvP de Campeones (World of Warcraft)',
    gameTheme: 'World of Warcraft',
    icon: '🛡️',
    context: 'Un Guerrero y un Chamán se enfrentan en la Arena de Dalaran. El Guerrero empuña un Arma Forjada, el Chamán planta Tótems que pulsan mejoras cada turno y consumen Frascos alquímicos.',
    task: 'Modela HeroeAzeroth, ArmaForjada, TotemSoporte y FrascoPoder. El tótem aplica daño o curación pasiva al inicio de cada turno mientras tenga durabilidad.',
    mainClass: {
      name: 'HeroeAzeroth',
      attrs: ['- nombre: String', '- claseRol: String', '- salud: int', '- iraRage: int', '- arma: ArmaForjada', '- totem: TotemSoporte', '- frascos: List~FrascoPoder~'],
      methods: [
        '+ golpeMortal(rival: HeroeAzeroth): void',
        '+ plantarTotem(t: TotemSoporte): void',
        '+ procesarEfectoTotem(): void',
        '+ beberFrasco(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'ArmaForjada',
        attrs: ['- nombreArma: String', '- danioDPS: int', '- probabilidadSangrado: double'],
        methods: ['+ calcularGolpe(): int'],
      },
      {
        name: 'TotemSoporte',
        attrs: ['- tipoTotem: String', '- efectoPuntos: int', '- rondasDuracion: int'],
        methods: ['+ pulsarRonda(): int', '+ isActivo(): boolean'],
      },
      {
        name: 'FrascoPoder',
        attrs: ['- nombreFrasco: String', '- bonusIra: int', '- usado: boolean'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'HeroeAzeroth', to: 'ArmaForjada', type: 'aggregation', label: 'blande 1' },
      { from: 'HeroeAzeroth', to: 'TotemSoporte', type: 'aggregation', label: 'coloca 1' },
      { from: 'HeroeAzeroth', to: 'FrascoPoder', type: 'composition', label: 'guarda *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class ArmaForjada {
    private String nombreArma;
    private int danioDPS;

    public ArmaForjada(String nombre, int dps) {
        this.nombreArma = nombre;
        this.danioDPS = dps;
    }

    public int calcularGolpe() { return danioDPS; }
    public String getNombreArma() { return nombreArma; }
}

class TotemSoporte {
    private String tipoTotem;
    private int efectoPuntos;
    private int rondas;

    public TotemSoporte(String tipo, int efecto, int rondas) {
        this.tipoTotem = tipo;
        this.efectoPuntos = efecto;
        this.rondas = rondas;
    }

    public int pulsarRonda() {
        if (rondas > 0) {
            rondas--;
            System.out.println("  ⚡ Tótem de " + tipoTotem + " emitió pulso (+ " + efectoPuntos + " / rondas restantes: " + rondas + ")");
            return efectoPuntos;
        }
        return 0;
    }

    public boolean isActivo() { return rondas > 0; }
}

class FrascoPoder {
    private String nombre;
    private int bonus;
    private boolean usado = false;

    public FrascoPoder(String nombre, int bonus) {
        this.nombre = nombre;
        this.bonus = bonus;
    }

    public int consumir() {
        if (!usado) {
            usado = true;
            return bonus;
        }
        return 0;
    }
}

class HeroeAzeroth {
    private String nombre;
    private String claseRol;
    private int salud;
    private int iraRage;
    private ArmaForjada arma;
    private TotemSoporte totem;
    private List<FrascoPoder> frascos;

    public HeroeAzeroth(String nombre, String clase, int hp, ArmaForjada arma) {
        this.nombre = nombre;
        this.claseRol = clase;
        this.salud = hp;
        this.iraRage = 30;
        this.arma = arma;
        this.frascos = new ArrayList<>();
    }

    public void plantarTotem(TotemSoporte t) {
        this.totem = t;
        System.out.println("🗿 " + nombre + " clavó un tótem en la arena!");
    }

    public void procesarEfectoTotem() {
        if (totem != null && totem.isActivo()) {
            this.salud += totem.pulsarRonda();
        }
    }

    public void golpeMortal(HeroeAzeroth rival) {
        System.out.println("⚔️ " + nombre + " ejecuta Golpe Mortal con " + arma.getNombreArma() + "!");
        int danio = arma.calcularGolpe();
        rival.recibirDanio(danio);
    }

    public void recibirDanio(int danio) {
        this.salud = Math.max(0, this.salud - danio);
        System.out.println("  💥 " + nombre + " sufrió " + danio + " dmg. (Salud: " + salud + ")");
    }

    public void beberFrasco(int i) {
        if (i >= 0 && i < frascos.size()) {
            iraRage += frascos.get(i).consumir();
        }
    }

    public void agregarFrasco(FrascoPoder f) { frascos.add(f); }
    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        HeroeAzeroth warrior = new HeroeAzeroth("Garrosh", "Guerrero", 260, new ArmaForjada("Aullavísceras", 45));
        HeroeAzeroth shaman = new HeroeAzeroth("Thrall", "Chamán", 240, new ArmaForjada("Martillo Maldito", 38));

        shaman.plantarTotem(new TotemSoporte("Corriente Sanadora", 25, 3));
        warrior.golpeMortal(shaman);
        shaman.procesarEfectoTotem();
        shaman.golpeMortal(warrior);
    }
}`,
  },
  {
    id: 11,
    slug: 'final-fantasy-turnos',
    title: 'Combate Clásico de Soldados (Final Fantasy)',
    gameTheme: 'Final Fantasy',
    icon: '🔮',
    context: 'Dos soldados de élite usan Espadas Buster con ranuras de Materia elemental (Fuego, Hielo) y éteres de maná.',
    task: 'Modela SoldadoFF, EspadaRanurada, MateriaMagica y PocionEter. El soldado puede atacar físicamente con su sable o conjurar el hechizo de la Materia si tiene MP suficiente.',
    mainClass: {
      name: 'SoldadoFF',
      attrs: ['- nombre: String', '- hpActual: int', '- mpActual: int', '- sableBuster: EspadaRanurada', '- materias: List~MateriaMagica~', '- eteres: List~PocionEter~'],
      methods: [
        '+ ataqueFisico(rival: SoldadoFF): void',
        '+ conjurarMateria(slotMateria: int, rival: SoldadoFF): void',
        '+ usarEter(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'EspadaRanurada',
        attrs: ['- nombre: String', '- danioFisico: int', '- maxRanuras: int'],
        methods: ['+ getDanioFisico(): int'],
      },
      {
        name: 'MateriaMagica',
        attrs: ['- elemento: String', '- nombreHechizo: String', '- poderMagico: int', '- costoMP: int'],
        methods: ['+ getPoder(): int', '+ getCostoMP(): int'],
      },
      {
        name: 'PocionEter',
        attrs: ['- mpRecuperado: int', '- gastado: boolean'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'SoldadoFF', to: 'EspadaRanurada', type: 'aggregation', label: 'equipa 1' },
      { from: 'SoldadoFF', to: 'MateriaMagica', type: 'composition', label: 'engasta *' },
      { from: 'SoldadoFF', to: 'PocionEter', type: 'composition', label: 'bolsa *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class EspadaRanurada {
    private String nombre;
    private int danioFisico;

    public EspadaRanurada(String nombre, int danio) {
        this.nombre = nombre;
        this.danioFisico = danio;
    }
    public int getDanioFisico() { return danioFisico; }
    public String getNombre() { return nombre; }
}

class MateriaMagica {
    private String elemento;
    private String hechizo;
    private int poder;
    private int costoMP;

    public MateriaMagica(String elemento, String hechizo, int poder, int costoMP) {
        this.elemento = elemento;
        this.hechizo = hechizo;
        this.poder = poder;
        this.costoMP = costoMP;
    }

    public int getPoder() { return poder; }
    public int getCostoMP() { return costoMP; }
    public String getHechizo() { return hechizo; }
}

class PocionEter {
    private int mp;
    private boolean gastado = false;
    public PocionEter(int mp) { this.mp = mp; }
    public int consumir() {
        if (!gastado) { gastado = true; return mp; }
        return 0;
    }
}

class SoldadoFF {
    private String nombre;
    private int hpActual;
    private int mpActual;
    private EspadaRanurada sable;
    private List<MateriaMagica> materias;
    private List<PocionEter> eteres;

    public SoldadoFF(String nombre, int hp, int mp, EspadaRanurada sable) {
        this.nombre = nombre;
        this.hpActual = hp;
        this.mpActual = mp;
        this.sable = sable;
        this.materias = new ArrayList<>();
        this.eteres = new ArrayList<>();
    }

    public void engastarMateria(MateriaMagica m) { materias.add(m); }
    public void agregarEter(PocionEter e) { eteres.add(e); }

    public void ataqueFisico(SoldadoFF rival) {
        System.out.println("🗡️ " + nombre + " corta con " + sable.getNombre() + "!");
        rival.recibirDanio(sable.getDanioFisico());
    }

    public void conjurarMateria(int slot, SoldadoFF rival) {
        if (slot >= 0 && slot < materias.size()) {
            MateriaMagica m = materias.get(slot);
            if (mpActual >= m.getCostoMP()) {
                mpActual -= m.getCostoMP();
                System.out.println("🔮 " + nombre + " conjura [" + m.getHechizo() + "]! (MP restante: " + mpActual + ")");
                rival.recibirDanio(m.getPoder());
            } else {
                System.out.println("❌ No hay suficiente MP!");
            }
        }
    }

    public void usarEter(int i) {
        if (i >= 0 && i < eteres.size()) {
            int rec = eteres.get(i).consumir();
            if (rec > 0) {
                mpActual += rec;
                System.out.println("✨ " + nombre + " bebió Éter (+ " + rec + " MP).");
            }
        }
    }

    public void recibirDanio(int danio) {
        hpActual = Math.max(0, hpActual - danio);
        System.out.println("  💔 " + nombre + " HP: " + hpActual);
    }

    public String getNombre() { return nombre; }
}

public class Main {
    public static void main(String[] args) {
        SoldadoFF cloud = new SoldadoFF("Cloud Strife", 300, 80, new EspadaRanurada("Buster Sword", 35));
        cloud.engastarMateria(new MateriaMagica("Fuego", "Piro+", 55, 30));
        cloud.agregarEter(new PocionEter(40));

        SoldadoFF sephiroth = new SoldadoFF("Sefirot", 350, 100, new EspadaRanurada("Masamune", 42));

        cloud.conjurarMateria(0, sephiroth);
        sephiroth.ataqueFisico(cloud);
        cloud.usarEter(0);
    }
}`,
  },
  {
    id: 12,
    slug: 'cyberpunk-quickhack',
    title: 'Duelo de Netrunners (Cyberpunk 2077)',
    gameTheme: 'Cyberpunk 2077',
    icon: '💾',
    context: 'Dos mercenarios cibernéticos en Night City se enfrentan hackeando el implante del rival con Ciberdecks, pistolas inteligentes y recuperadores MaxDoc.',
    task: 'Modela MercenarioCyber, CiberdeckOS, PistolaSmart y InhaladorMaxDoc. Los quickhacks de sobrecalentamiento consumen memoria RAM del ciberdeck para aplicar daño sin fallar.',
    mainClass: {
      name: 'MercenarioCyber',
      attrs: ['- alias: String', '- ciberSalud: int', '- ramActual: int', '- ciberdeck: CiberdeckOS', '- pistolaSmart: PistolaSmart', '- inhaladores: List~InhaladorMaxDoc~'],
      methods: [
        '+ ejecutarQuickhack(rival: MercenarioCyber): void',
        '+ disparoTeledirigido(rival: MercenarioCyber): void',
        '+ inhalarMaxDoc(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'CiberdeckOS',
        attrs: ['- modeloChip: String', '- ramMaxima: int', '- danioQuickhack: int', '- costoRAM: int'],
        methods: ['+ getDanioQuickhack(): int', '+ getCostoRAM(): int'],
      },
      {
        name: 'PistolaSmart',
        attrs: ['- nombreModelo: String', '- danioBala: int', '- rastreoActivo: boolean'],
        methods: ['+ calcularDisparo(): int'],
      },
      {
        name: 'InhaladorMaxDoc',
        attrs: ['- porcentajeCura: int', '- usado: boolean'],
        methods: ['+ activar(): int'],
      },
    ],
    relations: [
      { from: 'MercenarioCyber', to: 'CiberdeckOS', type: 'aggregation', label: 'porta 1' },
      { from: 'MercenarioCyber', to: 'PistolaSmart', type: 'aggregation', label: 'empuña 1' },
      { from: 'MercenarioCyber', to: 'InhaladorMaxDoc', type: 'composition', label: 'bolsillo *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class CiberdeckOS {
    private String modeloChip;
    private int danioQuickhack;
    private int costoRAM;

    public CiberdeckOS(String modelo, int danio, int costoRAM) {
        this.modeloChip = modelo;
        this.danioQuickhack = danio;
        this.costoRAM = costoRAM;
    }
    public int getDanioQuickhack() { return danioQuickhack; }
    public int getCostoRAM() { return costoRAM; }
    public String getModeloChip() { return modeloChip; }
}

class PistolaSmart {
    private String modelo;
    private int danio;
    public PistolaSmart(String modelo, int danio) {
        this.modelo = modelo;
        this.danio = danio;
    }
    public int calcularDisparo() { return danio; }
    public String getModelo() { return modelo; }
}

class InhaladorMaxDoc {
    private int cura;
    private boolean usado = false;
    public InhaladorMaxDoc(int cura) { this.cura = cura; }
    public int activar() {
        if (!usado) { usado = true; return cura; }
        return 0;
    }
}

class MercenarioCyber {
    private String alias;
    private int ciberSalud;
    private int ramActual;
    private CiberdeckOS ciberdeck;
    private PistolaSmart pistola;
    private List<InhaladorMaxDoc> inhaladores;

    public MercenarioCyber(String alias, int salud, int ram, CiberdeckOS deck, PistolaSmart gun) {
        this.alias = alias;
        this.ciberSalud = salud;
        this.ramActual = ram;
        this.ciberdeck = deck;
        this.pistola = gun;
        this.inhaladores = new ArrayList<>();
    }

    public void agregarInhalador(InhaladorMaxDoc doc) { inhaladores.add(doc); }

    public void ejecutarQuickhack(MercenarioCyber rival) {
        if (ramActual >= ciberdeck.getCostoRAM()) {
            ramActual -= ciberdeck.getCostoRAM();
            System.out.println("💾 " + alias + " inyecta Sobrecalentamiento con " + ciberdeck.getModeloChip() + "!");
            rival.recibirDanio(ciberdeck.getDanioQuickhack());
        } else {
            System.out.println("⚠️ RAM insuficiente para el hackeo!");
        }
    }

    public void disparoTeledirigido(MercenarioCyber rival) {
        System.out.println("🔫 " + alias + " dispara ráfaga inteligente con " + pistola.getModelo() + "!");
        rival.recibirDanio(pistola.calcularDisparo());
    }

    public void inhalarMaxDoc(int i) {
        if (i >= 0 && i < inhaladores.size()) {
            int h = inhaladores.get(i).activar();
            if (h > 0) {
                ciberSalud += h;
                System.out.println("💉 " + alias + " usó MaxDoc (+ " + h + " HP).");
            }
        }
    }

    public void recibirDanio(int d) {
        ciberSalud = Math.max(0, ciberSalud - d);
        System.out.println("  💥 " + alias + " integridad: " + ciberSalud + " HP");
    }

    public String getAlias() { return alias; }
}

public class Main {
    public static void main(String[] args) {
        MercenarioCyber v = new MercenarioCyber("V", 220, 16, new CiberdeckOS("Militech Tetratronic", 50, 6), new PistolaSmart("Kang Tao Dian", 30));
        v.agregarInhalador(new InhaladorMaxDoc(45));

        MercenarioCyber smasher = new MercenarioCyber("Adam Smasher", 320, 8, new CiberdeckOS("Arasaka Mk.5", 40, 8), new PistolaSmart("Carnage Smart", 45));

        v.ejecutarQuickhack(smasher);
        smasher.disparoTeledirigido(v);
        v.inhalarMaxDoc(0);
    }
}`,
  },
  {
    id: 13,
    slug: 'overwatch-duelo-tanques',
    title: 'Combate de Vanguardia (Overwatch)',
    gameTheme: 'Overwatch',
    icon: '🛡️',
    context: 'Dos héroes de Overwatch disputan el objetivo. Disparan sus cañones, despliegan barreras de energía protectoras y consumen packs de salud distribuidos por el mapa.',
    task: 'Modela HeroeOverwatch, CanionEnergia, BarreraEscudo y PackSalud. La barrera mitiga el daño entrante hasta que su energía colapsa.',
    mainClass: {
      name: 'HeroeOverwatch',
      attrs: ['- nombreHeroe: String', '- saludHP: int', '- porcentajeUlti: int', '- canion: CanionEnergia', '- barrera: BarreraEscudo', '- packsSalud: List~PackSalud~'],
      methods: [
        '+ dispararCanion(rival: HeroeOverwatch): void',
        '+ desplegarBarrera(): void',
        '+ agarrarPackSalud(indice: int): void',
        '+ recibirDisparo(danio: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'CanionEnergia',
        attrs: ['- tipoMunicion: String', '- danioPorTiro: int'],
        methods: ['+ disparar(): int'],
      },
      {
        name: 'BarreraEscudo',
        attrs: ['- capacidadHP: int', '- desplegada: boolean'],
        methods: ['+ absorber(danio: int): int', '+ isDesplegada(): boolean'],
      },
      {
        name: 'PackSalud',
        attrs: ['- tamano: String', '- curacionHP: int', '- tomado: boolean'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'HeroeOverwatch', to: 'CanionEnergia', type: 'aggregation', label: 'equipa 1' },
      { from: 'HeroeOverwatch', to: 'BarreraEscudo', type: 'aggregation', label: 'proyecta 1' },
      { from: 'HeroeOverwatch', to: 'PackSalud', type: 'composition', label: 'recoge *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class CanionEnergia {
    private String tipo;
    private int danio;
    public CanionEnergia(String tipo, int danio) { this.tipo = tipo; this.danio = danio; }
    public int disparar() { return danio; }
}

class BarreraEscudo {
    private int hp;
    private boolean activa = false;
    public BarreraEscudo(int hp) { this.hp = hp; }
    public void desplegar() { this.activa = true; }
    public int absorber(int danio) {
        if (!activa || hp <= 0) return danio;
        if (danio >= hp) {
            int sobrante = danio - hp;
            hp = 0;
            activa = false;
            System.out.println("  🛡️ ¡La barrera fue destrozada!");
            return sobrante;
        } else {
            hp -= danio;
            System.out.println("  🛡️ Barrera absorbió el tiro (HP Barrera: " + hp + ")");
            return 0;
        }
    }
}

class PackSalud {
    private int cura;
    private boolean tomado = false;
    public PackSalud(int cura) { this.cura = cura; }
    public int consumir() {
        if (!tomado) { tomado = true; return cura; }
        return 0;
    }
}

class HeroeOverwatch {
    private String nombre;
    private int salud;
    private CanionEnergia canion;
    private BarreraEscudo barrera;
    private List<PackSalud> packs;

    public HeroeOverwatch(String nombre, int salud, CanionEnergia canion, BarreraEscudo barrera) {
        this.nombre = nombre;
        this.salud = salud;
        this.canion = canion;
        this.barrera = barrera;
        this.packs = new ArrayList<>();
    }

    public void agregarPack(PackSalud p) { packs.add(p); }

    public void desplegarBarrera() {
        if (barrera != null) {
            barrera.desplegar();
            System.out.println("🛡️ " + nombre + " levantó su escudo de energía!");
        }
    }

    public void dispararCanion(HeroeOverwatch rival) {
        System.out.println("🎯 " + nombre + " abre fuego!");
        rival.recibirDisparo(canion.disparar());
    }

    public void recibirDisparo(int danio) {
        int residual = barrera != null ? barrera.absorber(danio) : danio;
        salud = Math.max(0, salud - residual);
        System.out.println("  💔 " + nombre + " Salud: " + salud + " HP");
    }

    public void agarrarPackSalud(int i) {
        if (i >= 0 && i < packs.size()) {
            int c = packs.get(i).consumir();
            if (c > 0) {
                salud += c;
                System.out.println("➕ " + nombre + " tomó Mega Pack de Salud (+ " + c + " HP).");
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        HeroeOverwatch reinhardt = new HeroeOverwatch("Reinhardt", 400, new CanionEnergia("Martillo a Reacción", 50), new BarreraEscudo(250));
        HeroeOverwatch winston = new HeroeOverwatch("Winston", 350, new CanionEnergia("Cañón Tesla", 40), new BarreraEscudo(150));
        reinhardt.agregarPack(new PackSalud(75));

        reinhardt.desplegarBarrera();
        winston.dispararCanion(reinhardt);
        reinhardt.dispararCanion(winston);
        reinhardt.agarrarPackSalud(0);
    }
}`,
  },
  {
    id: 14,
    slug: 'mortal-kombat-duelo',
    title: 'Duelo Kombat 1v1 (Mortal Kombat)',
    gameTheme: 'Mortal Kombat',
    icon: '🩸',
    context: 'Dos kombatientes se miden en el torneo mortal. Cada uno tiene un Estilo de Pelea marcial, un Arma Kombat blanca y Amuletos de alma curativos.',
    task: 'Modela Kombatiente, EstiloCombate, ArmaKombat y AmuletoCuracion. Ejecuta combos y ataques especiales con armas sangrientas en turnos.',
    mainClass: {
      name: 'Kombatiente',
      attrs: ['- nombre: String', '- salud: int', '- barraExMeter: int', '- estilo: EstiloCombate', '- arma: ArmaKombat', '- amuletos: List~AmuletoCuracion~'],
      methods: [
        '+ ataqueBasico(rival: Kombatiente): void',
        '+ golpeConArma(rival: Kombatiente): void',
        '+ usarAmuleto(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'EstiloCombate',
        attrs: ['- nombreEstilo: String', '- danioGolpes: int'],
        methods: ['+ getDanioGolpes(): int'],
      },
      {
        name: 'ArmaKombat',
        attrs: ['- nombreArma: String', '- danioFilo: int', '- efectoHemorragia: int'],
        methods: ['+ calcularDanioCorte(): int'],
      },
      {
        name: 'AmuletoCuracion',
        attrs: ['- puntosRecuperados: int', '- usado: boolean'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'Kombatiente', to: 'EstiloCombate', type: 'composition', label: 'domina 1' },
      { from: 'Kombatiente', to: 'ArmaKombat', type: 'aggregation', label: 'empuña 1' },
      { from: 'Kombatiente', to: 'AmuletoCuracion', type: 'composition', label: 'posee *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class EstiloCombate {
    private String nombre;
    private int danio;
    public EstiloCombate(String n, int d) { this.nombre = n; this.danio = d; }
    public int getDanio() { return danio; }
    public String getNombre() { return nombre; }
}

class ArmaKombat {
    private String nombre;
    private int danio;
    public ArmaKombat(String n, int d) { this.nombre = n; this.danio = d; }
    public int getDanio() { return danio; }
    public String getNombre() { return nombre; }
}

class AmuletoCuracion {
    private int cura;
    private boolean usado = false;
    public AmuletoCuracion(int c) { this.cura = c; }
    public int consumir() {
        if (!usado) { usado = true; return cura; }
        return 0;
    }
}

class Kombatiente {
    private String nombre;
    private int salud;
    private EstiloCombate estilo;
    private ArmaKombat arma;
    private List<AmuletoCuracion> amuletos;

    public Kombatiente(String nombre, int salud, EstiloCombate estilo, ArmaKombat arma) {
        this.nombre = nombre;
        this.salud = salud;
        this.estilo = estilo;
        this.arma = arma;
        this.amuletos = new ArrayList<>();
    }

    public void agregarAmuleto(AmuletoCuracion a) { amuletos.add(a); }

    public void ataqueBasico(Kombatiente rival) {
        System.out.println("👊 " + nombre + " conecta combo de estilo [" + estilo.getNombre() + "]!");
        rival.recibirDanio(estilo.getDanio());
    }

    public void golpeConArma(Kombatiente rival) {
        System.out.println("🗡️ " + nombre + " clava su " + arma.getNombre() + "!");
        rival.recibirDanio(arma.getDanio());
    }

    public void usarAmuleto(int i) {
        if (i >= 0 && i < amuletos.size()) {
            int c = amuletos.get(i).consumir();
            if (c > 0) {
                salud += c;
                System.out.println("🩸 " + nombre + " invocó amuleto (+ " + c + " HP).");
            }
        }
    }

    public void recibirDanio(int d) {
        salud = Math.max(0, salud - d);
        System.out.println("  💥 " + nombre + " Salud: " + salud + " HP");
    }
}

public class Main {
    public static void main(String[] args) {
        Kombatiente scorpion = new Kombatiente("Scorpion", 250, new EstiloCombate("Ninjutsu", 30), new ArmaKombat("Kunai con Cadena", 45));
        scorpion.agregarAmuleto(new AmuletoCuracion(35));

        Kombatiente subzero = new Kombatiente("Sub-Zero", 250, new EstiloCombate("Shotokan", 28), new ArmaKombat("Daga de Hielo", 40));

        scorpion.golpeConArma(subzero);
        subzero.ataqueBasico(scorpion);
        scorpion.usarAmuleto(0);
    }
}`,
  },
  {
    id: 15,
    slug: 'doom-slayer-vs-demonio',
    title: 'Combate Infernal (DOOM)',
    gameTheme: 'DOOM',
    icon: '🔥',
    context: 'El Doom Slayer enfrenta a un Barón del Infierno. Porta su legendaria Super Escopeta, un Lanzallamas de hombro para extraer armadura y cajas de cartuchos de munición.',
    task: 'Modela DoomSlayer, SuperShotgun, CanionHombro y CajaCartuchos. El disparo de doble cañón consume cartuchos para aniquilar enemigos.',
    mainClass: {
      name: 'DoomSlayer',
      attrs: ['- nombre: String', '- vidaSalud: int', '- armadura: int', '- escopeta: SuperShotgun', '- lanzallamas: CanionHombro', '- reservasBalas: List~CajaCartuchos~'],
      methods: [
        '+ dispararDobleCanon(demonio: DoomSlayer): void',
        '+ quemarConHombro(demonio: DoomSlayer): void',
        '+ recargarCartuchos(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'SuperShotgun',
        attrs: ['- nombre: String', '- danioDobleCanon: int', '- cartuchosCargados: int'],
        methods: ['+ disparar(): int', '+ recargar(cant: int): void'],
      },
      {
        name: 'CanionHombro',
        attrs: ['- danioFuego: int', '- armaduraGenerada: int'],
        methods: ['+ incinerar(): int'],
      },
      {
        name: 'CajaCartuchos',
        attrs: ['- cantidadBalas: int', '- vacia: boolean'],
        methods: ['+ suministrar(): int'],
      },
    ],
    relations: [
      { from: 'DoomSlayer', to: 'SuperShotgun', type: 'aggregation', label: 'empuña 1' },
      { from: 'DoomSlayer', to: 'CanionHombro', type: 'aggregation', label: 'monta 1' },
      { from: 'DoomSlayer', to: 'CajaCartuchos', type: 'composition', label: 'bolsa *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class SuperShotgun {
    private String nombre;
    private int danio;
    private int balas;

    public SuperShotgun(String nombre, int danio, int balas) {
        this.nombre = nombre;
        this.danio = danio;
        this.balas = balas;
    }

    public int disparar() {
        if (balas >= 2) {
            balas -= 2;
            System.out.println("  💥 ¡BOOM! Doble cañón disparado (Balas restantes: " + balas + ")");
            return danio;
        }
        System.out.println("  ⚠️ ¡Click! Sin cartuchos.");
        return 0;
    }

    public void recargar(int cant) { this.balas += cant; }
}

class CanionHombro {
    private int danio;
    public CanionHombro(int d) { this.danio = d; }
    public int incinerar() { return danio; }
}

class CajaCartuchos {
    private int cant;
    private boolean vacia = false;
    public CajaCartuchos(int cant) { this.cant = cant; }
    public int suministrar() {
        if (!vacia) { vacia = true; return cant; }
        return 0;
    }
}

class DoomSlayer {
    private String nombre;
    private int vida;
    private int armadura;
    private SuperShotgun escopeta;
    private CanionHombro hombro;
    private List<CajaCartuchos> reservas;

    public DoomSlayer(String nombre, int vida, int armadura, SuperShotgun s, CanionHombro h) {
        this.nombre = nombre;
        this.vida = vida;
        this.armadura = armadura;
        this.escopeta = s;
        this.hombro = h;
        this.reservas = new ArrayList<>();
    }

    public void agregarCaja(CajaCartuchos c) { reservas.add(c); }

    public void dispararDobleCanon(DoomSlayer demonio) {
        System.out.println("💣 " + nombre + " descarga su Super Escopeta!");
        int d = escopeta.disparar();
        demonio.recibirDanio(d);
    }

    public void quemarConHombro(DoomSlayer demonio) {
        System.out.println("🔥 " + nombre + " quema al objetivo con lanzallamas!");
        demonio.recibirDanio(hombro.incinerar());
        this.armadura += 20;
    }

    public void recargarCartuchos(int i) {
        if (i >= 0 && i < reservas.size()) {
            int b = reservas.get(i).suministrar();
            if (b > 0) {
                escopeta.recargar(b);
                System.out.println("📦 " + nombre + " recargó " + b + " cartuchos.");
            }
        }
    }

    public void recibirDanio(int d) {
        vida = Math.max(0, vida - d);
        System.out.println("  💔 " + nombre + " Vida: " + vida + " HP");
    }
}

public class Main {
    public static void main(String[] args) {
        DoomSlayer slayer = new DoomSlayer("Doom Slayer", 200, 100, new SuperShotgun("Super Shotgun", 65, 4), new CanionHombro(25));
        slayer.agregarCaja(new CajaCartuchos(6));

        DoomSlayer baron = new DoomSlayer("Barón del Infierno", 300, 0, new SuperShotgun("Garras de Fuego", 35, 99), new CanionHombro(15));

        slayer.dispararDobleCanon(baron);
        slayer.quemarConHombro(baron);
        baron.dispararDobleCanon(slayer);
        slayer.recargarCartuchos(0);
    }
}`,
  },
  {
    id: 16,
    slug: 'among-us-infiltracion',
    title: 'Infiltración en la Nave (Among Us)',
    gameTheme: 'Among Us',
    icon: '🚀',
    context: 'Un Tripulante y un Impostor se enfrentan en turnos en la nave espacial. El Tripulante usa escáneres y kits de reparación de tareas, mientras el Impostor sabotea con cuchillo.',
    task: 'Modela TripulanteNave, ScannerTarjeta, BotonEmergencia y KitReparacion. Cada turno el tripulante puede avanzar tareas o alertar por botón de emergencia.',
    mainClass: {
      name: 'TripulanteNave',
      attrs: ['- colorTraje: String', '- vidaHp: int', '- tareasProgreso: int', '- scanner: ScannerTarjeta', '- boton: BotonPanico', '- piezas: List~KitReparacion~'],
      methods: [
        '+ hacerTarea(): void',
        '+ tocarBoton(): void',
        '+ repararFalla(indice: int): void',
        '+ recibirSabotaje(danio: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'ScannerTarjeta',
        attrs: ['- velocidadPase: String', '- valido: boolean'],
        methods: ['+ escanear(): boolean'],
      },
      {
        name: 'BotonPanico',
        attrs: ['- usosDisponibles: int'],
        methods: ['+ presionar(): boolean'],
      },
      {
        name: 'KitReparacion',
        attrs: ['- nombreModulo: String', '- progresoOtorgado: int', '- usado: boolean'],
        methods: ['+ instalar(): int'],
      },
    ],
    relations: [
      { from: 'TripulanteNave', to: 'ScannerTarjeta', type: 'aggregation', label: 'lleva 1' },
      { from: 'TripulanteNave', to: 'BotonPanico', type: 'aggregation', label: 'accede 1' },
      { from: 'TripulanteNave', to: 'KitReparacion', type: 'composition', label: 'bolsa *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class ScannerTarjeta {
    public boolean escanear() {
        System.out.println("  💳 Tarjeta escaneada con éxito.");
        return true;
    }
}

class BotonPanico {
    private int usos = 1;
    public boolean presionar() {
        if (usos > 0) {
            usos--;
            System.out.println("  🚨 ¡REUNIÓN DE EMERGENCIA CONVOCADA!");
            return true;
        }
        return false;
    }
}

class KitReparacion {
    private String modulo;
    private int progreso;
    private boolean usado = false;
    public KitReparacion(String m, int p) { this.modulo = m; this.progreso = p; }
    public int instalar() {
        if (!usado) { usado = true; return progreso; }
        return 0;
    }
}

class TripulanteNave {
    private String colorTraje;
    private int vida;
    private int tareas;
    private ScannerTarjeta scanner;
    private BotonPanico boton;
    private List<KitReparacion> kits;

    public TripulanteNave(String color, ScannerTarjeta scanner, BotonPanico boton) {
        this.colorTraje = color;
        this.vida = 100;
        this.tareas = 0;
        this.scanner = scanner;
        this.boton = boton;
        this.kits = new ArrayList<>();
    }

    public void agregarKit(KitReparacion k) { kits.add(k); }

    public void hacerTarea() {
        if (scanner.escanear()) {
            tareas += 25;
            System.out.println("📋 " + colorTraje + " completó tarea de administración. Progreso: " + tareas + "%");
        }
    }

    public void tocarBoton() {
        boton.presionar();
    }

    public void repararFalla(int i) {
        if (i >= 0 && i < kits.size()) {
            tareas += kits.get(i).instalar();
            System.out.println("🔧 " + colorTraje + " reparó cableado. Progreso: " + tareas + "%");
        }
    }

    public void recibirSabotaje(int danio) {
        vida = Math.max(0, vida - danio);
        System.out.println("  💔 " + colorTraje + " fue emboscado! (Salud: " + vida + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        TripulanteNave azul = new TripulanteNave("Azul", new ScannerTarjeta(), new BotonPanico());
        azul.agregarKit(new KitReparacion("Escudos", 25));

        azul.hacerTarea();
        azul.recibirSabotaje(40);
        azul.repararFalla(0);
        azul.tocarBoton();
    }
}`,
  },
  {
    id: 17,
    slug: 'monster-hunter-caza',
    title: 'Caza de Wyverns (Monster Hunter)',
    gameTheme: 'Monster Hunter',
    icon: '🐉',
    context: 'Un Cazador con Gran Espada y Kinsecto adiestrado se enfrenta a un temible Wyvern en una cacería por turnos, extrayendo esencias y bebiendo megapociones.',
    task: 'Modela CazadorHunter, GranEspadaCazador, KinsectoMascota y MegaPocionCaza. El kinsecto extrae extractos de ataque que potencian la espada.',
    mainClass: {
      name: 'CazadorHunter',
      attrs: ['- nombre: String', '- saludHP: int', '- resistencia: int', '- granEspada: GranEspadaCazador', '- kinsecto: KinsectoMascota', '- megapociones: List~MegaPocionCaza~'],
      methods: [
        '+ tajoCargado(wyvern: CazadorHunter): void',
        '+ enviarKinsecto(): void',
        '+ beberMegaPocion(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'GranEspadaCazador',
        attrs: ['- nombre: String', '- danioCorte: int', '- afiladoNivel: int'],
        methods: ['+ calcularTajo(bonusKinsecto: int): int'],
      },
      {
        name: 'KinsectoMascota',
        attrs: ['- tipoExtracto: String', '- bonusAtaque: int'],
        methods: ['+ extraerEsencia(): int'],
      },
      {
        name: 'MegaPocionCaza',
        attrs: ['- saludCurada: int', '- tomada: boolean'],
        methods: ['+ consumir(): int'],
      },
    ],
    relations: [
      { from: 'CazadorHunter', to: 'GranEspadaCazador', type: 'aggregation', label: 'blande 1' },
      { from: 'CazadorHunter', to: 'KinsectoMascota', type: 'aggregation', label: 'comanda 1' },
      { from: 'CazadorHunter', to: 'MegaPocionCaza', type: 'composition', label: 'lleva *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class GranEspadaCazador {
    private String nombre;
    private int danio;
    public GranEspadaCazador(String n, int d) { this.nombre = n; this.danio = d; }
    public int calcularTajo(int bonus) { return danio + bonus; }
    public String getNombre() { return nombre; }
}

class KinsectoMascota {
    private int bonus = 20;
    public int extraerEsencia() {
        System.out.println("  🐞 Kinsecto extrajo esencia roja (+ " + bonus + " atk).");
        return bonus;
    }
}

class MegaPocionCaza {
    private int cura;
    private boolean tomada = false;
    public MegaPocionCaza(int c) { this.cura = c; }
    public int consumir() {
        if (!tomada) { tomada = true; return cura; }
        return 0;
    }
}

class CazadorHunter {
    private String nombre;
    private int salud;
    private GranEspadaCazador espada;
    private KinsectoMascota kinsecto;
    private int bonusActual = 0;
    private List<MegaPocionCaza> pociones;

    public CazadorHunter(String nombre, int salud, GranEspadaCazador espada, KinsectoMascota kinsecto) {
        this.nombre = nombre;
        this.salud = salud;
        this.espada = espada;
        this.kinsecto = kinsecto;
        this.pociones = new ArrayList<>();
    }

    public void agregarPocion(MegaPocionCaza p) { pociones.add(p); }

    public void enviarKinsecto() {
        bonusActual = kinsecto.extraerEsencia();
    }

    public void tajoCargado(CazadorHunter wyvern) {
        System.out.println("⚔️ " + nombre + " ejecuta Tajo Cargado Nivel 3 con " + espada.getNombre() + "!");
        int d = espada.calcularTajo(bonusActual);
        wyvern.recibirDanio(d);
    }

    public void beberMegaPocion(int i) {
        if (i >= 0 && i < pociones.size()) {
            int c = pociones.get(i).consumir();
            if (c > 0) {
                salud += c;
                System.out.println("🧪 " + nombre + " bebió Megapoción (+ " + c + " HP).");
            }
        }
    }

    public void recibirDanio(int d) {
        salud = Math.max(0, salud - d);
        System.out.println("  💔 " + nombre + " Salud: " + salud + " HP");
    }
}

public class Main {
    public static void main(String[] args) {
        CazadorHunter hunter = new CazadorHunter("Cazador Wyvern", 180, new GranEspadaCazador("Hoja de Rathalos", 60), new KinsectoMascota());
        hunter.agregarPocion(new MegaPocionCaza(50));

        CazadorHunter rathalos = new CazadorHunter("Rathalos", 350, new GranEspadaCazador("Garras de Fuego", 40), new KinsectoMascota());

        hunter.enviarKinsecto();
        hunter.tajoCargado(rathalos);
        rathalos.tajoCargado(hunter);
        hunter.beberMegaPocion(0);
    }
}`,
  },
  {
    id: 18,
    slug: 'hearthstone-tablero',
    title: 'Duelo en la Taberna (Hearthstone)',
    gameTheme: 'Hearthstone',
    icon: '🍺',
    context: 'Dos héroes en la taberna gestionan cristales de maná por turnos, activan su Poder de Héroe y juegan Esbirros con ataque/salud.',
    task: 'Modela HeroeHearthstone, PoderHeroe, ArmaHeroica y CartaEsbirro. En cada turno se incrementa el maná disponible para invocar cartas o usar el poder.',
    mainClass: {
      name: 'HeroeHearthstone',
      attrs: ['- claseHeroe: String', '- vidaHp: int', '- manaActual: int', '- poderHeroico: PoderHeroe', '- arma: ArmaHeroica', '- mesaEsbirros: List~CartaEsbirro~'],
      methods: [
        '+ usarPoderHeroico(rival: HeroeHearthstone): void',
        '+ jugarEsbirro(e: CartaEsbirro): void',
        '+ ordenarAtaqueEsbirro(slot: int, rival: HeroeHearthstone): void',
      ],
    },
    associatedClasses: [
      {
        name: 'PoderHeroe',
        attrs: ['- nombrePoder: String', '- costoMana: int', '- impactoDanio: int'],
        methods: ['+ activar(): int'],
      },
      {
        name: 'ArmaHeroica',
        attrs: ['- nombreArma: String', '- ataque: int', '- durabilidad: int'],
        methods: ['+ golpear(): int'],
      },
      {
        name: 'CartaEsbirro',
        attrs: ['- nombre: String', '- costoMana: int', '- ataque: int', '- salud: int'],
        methods: ['+ getAtaque(): int', '+ recibirDanio(d: int): void'],
      },
    ],
    relations: [
      { from: 'HeroeHearthstone', to: 'PoderHeroe', type: 'composition', label: 'posee 1' },
      { from: 'HeroeHearthstone', to: 'ArmaHeroica', type: 'aggregation', label: 'equipa 1' },
      { from: 'HeroeHearthstone', to: 'CartaEsbirro', type: 'composition', label: 'invoca *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class PoderHeroe {
    private String nombre;
    private int costo;
    private int danio;
    public PoderHeroe(String n, int c, int d) { this.nombre = n; this.costo = c; this.danio = d; }
    public int activar() { return danio; }
    public int getCosto() { return costo; }
    public String getNombre() { return nombre; }
}

class CartaEsbirro {
    private String nombre;
    private int costo;
    private int ataque;
    private int salud;
    public CartaEsbirro(String n, int c, int a, int s) { this.nombre = n; this.costo = c; this.ataque = a; this.salud = s; }
    public int getAtaque() { return ataque; }
    public int getCosto() { return costo; }
    public String getNombre() { return nombre; }
}

class HeroeHearthstone {
    private String clase;
    private int vida;
    private int mana;
    private PoderHeroe poder;
    private List<CartaEsbirro> mesa;

    public HeroeHearthstone(String clase, PoderHeroe poder) {
        this.clase = clase;
        this.vida = 30;
        this.mana = 6;
        this.poder = poder;
        this.mesa = new ArrayList<>();
    }

    public void usarPoderHeroico(HeroeHearthstone rival) {
        if (mana >= poder.getCosto()) {
            mana -= poder.getCosto();
            System.out.println("✨ " + clase + " usa Poder Heroico [" + poder.getNombre() + "]!");
            rival.recibirDanio(poder.activar());
        }
    }

    public void jugarEsbirro(CartaEsbirro e) {
        if (mana >= e.getCosto()) {
            mana -= e.getCosto();
            mesa.add(e);
            System.out.println("🃏 " + clase + " invocó a " + e.getNombre() + " (ATK: " + e.getAtaque() + ")");
        }
    }

    public void ordenarAtaqueEsbirro(int slot, HeroeHearthstone rival) {
        if (slot >= 0 && slot < mesa.size()) {
            CartaEsbirro e = mesa.get(slot);
            System.out.println("⚔️ " + e.getNombre() + " ataca al héroe rival!");
            rival.recibirDanio(e.getAtaque());
        }
    }

    public void recibirDanio(int d) {
        vida = Math.max(0, vida - d);
        System.out.println("  💥 " + clase + " Vida: " + vida + " HP");
    }
}

public class Main {
    public static void main(String[] args) {
        HeroeHearthstone mago = new HeroeHearthstone("Jaina (Maga)", new PoderHeroe("Explosión de Fuego", 2, 1));
        HeroeHearthstone cazador = new HeroeHearthstone("Rexxar (Cazador)", new PoderHeroe("Disparo Firme", 2, 2));

        mago.jugarEsbirro(new CartaEsbirro("Draco Azur", 5, 4, 4));
        mago.usarPoderHeroico(cazador);
        cazador.usarPoderHeroico(mago);
        mago.ordenarAtaqueEsbirro(0, cazador);
    }
}`,
  },
  {
    id: 19,
    slug: 'hollow-knight-alma',
    title: 'Duelo en Hallownest (Hollow Knight)',
    gameTheme: 'Hollow Knight',
    icon: '🗡️',
    context: 'El Caballero combate empuñando su Aguijón Puro, acumulando Alma con cada corte para sanar máscaras o disparar hechizos de Espíritu Vengativo.',
    task: 'Modela CaballeroVacio, AguijonClavo, AmuletoChapa y HechizoEspiritu. Cada golpe de aguijón llena el medidor de alma para focalizar curación.',
    mainClass: {
      name: 'CaballeroVacio',
      attrs: ['- nombre: String', '- mascarasVida: int', '- almaActual: int', '- aguijon: AguijonClavo', '- amuleto: AmuletoChapa', '- hechizo: HechizoEspiritu'],
      methods: [
        '+ golpearAguijon(rival: CaballeroVacio): void',
        '+ dispararHechizo(rival: CaballeroVacio): void',
        '+ focalizarCuracion(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'AguijonClavo',
        attrs: ['- nivelRefuerzo: int', '- danioBase: int', '- almaGenerada: int'],
        methods: ['+ calcularCorte(): int', '+ getAlmaGenerada(): int'],
      },
      {
        name: 'AmuletoChapa',
        attrs: ['- nombreAmuleto: String', '- extraDanioMagico: int'],
        methods: ['+ getBonusMagico(): int'],
      },
      {
        name: 'HechizoEspiritu',
        attrs: ['- nombreHechizo: String', '- danioBase: int', '- costoAlma: int'],
        methods: ['+ getDanio(): int', '+ getCostoAlma(): int'],
      },
    ],
    relations: [
      { from: 'CaballeroVacio', to: 'AguijonClavo', type: 'aggregation', label: 'empuña 1' },
      { from: 'CaballeroVacio', to: 'AmuletoChapa', type: 'aggregation', label: 'equipa 1' },
      { from: 'CaballeroVacio', to: 'HechizoEspiritu', type: 'composition', label: 'canaliza 1' },
    ],
    solutionCodeJava: `class AguijonClavo {
    private int danio;
    private int alma;
    public AguijonClavo(int danio, int alma) { this.danio = danio; this.alma = alma; }
    public int calcularCorte() { return danio; }
    public int getAlmaGenerada() { return alma; }
}

class AmuletoChapa {
    private int bonus;
    public AmuletoChapa(int b) { this.bonus = b; }
    public int getBonusMagico() { return bonus; }
}

class HechizoEspiritu {
    private int danio;
    private int costo;
    public HechizoEspiritu(int danio, int costo) { this.danio = danio; this.costo = costo; }
    public int getDanio() { return danio; }
    public int getCostoAlma() { return costo; }
}

class CaballeroVacio {
    private String nombre;
    private int mascaras;
    private int alma;
    private AguijonClavo aguijon;
    private AmuletoChapa amuleto;
    private HechizoEspiritu hechizo;

    public CaballeroVacio(String nombre, int mascaras, AguijonClavo ag, AmuletoChapa am, HechizoEspiritu h) {
        this.nombre = nombre;
        this.mascaras = mascaras;
        this.alma = 0;
        this.aguijon = ag;
        this.amuleto = am;
        this.hechizo = h;
    }

    public void golpearAguijon(CaballeroVacio rival) {
        System.out.println("🗡️ " + nombre + " asesta un tajo de aguijón!");
        rival.recibirDanio(aguijon.calcularCorte());
        alma = Math.min(99, alma + aguijon.getAlmaGenerada());
        System.out.println("  ✨ Alma recolectada: " + alma + "/99");
    }

    public void dispararHechizo(CaballeroVacio rival) {
        if (alma >= hechizo.getCostoAlma()) {
            alma -= hechizo.getCostoAlma();
            int d = hechizo.getDanio() + (amuleto != null ? amuleto.getBonusMagico() : 0);
            System.out.println("👻 " + nombre + " dispara ¡Espíritu Vengativo!");
            rival.recibirDanio(d);
        } else {
            System.out.println("❌ No hay suficiente alma!");
        }
    }

    public void focalizarCuracion() {
        if (alma >= 33) {
            alma -= 33;
            mascaras += 1;
            System.out.println("✨ " + nombre + " focalizó alma y recuperó 1 Máscara (Total: " + mascaras + ")");
        }
    }

    public void recibirDanio(int d) {
        mascaras = Math.max(0, mascaras - d);
        System.out.println("  💔 " + nombre + " Máscaras restantes: " + mascaras);
    }
}

public class Main {
    public static void main(String[] args) {
        CaballeroVacio knight = new CaballeroVacio("Caballero", 7, new AguijonClavo(1, 15), new AmuletoChapa(1), new HechizoEspiritu(3, 33));
        CaballeroVacio hornet = new CaballeroVacio("Hornet", 8, new AguijonClavo(2, 10), null, new HechizoEspiritu(2, 33));

        knight.golpearAguijon(hornet);
        knight.golpearAguijon(hornet);
        knight.golpearAguijon(hornet);
        knight.dispararHechizo(hornet);
        hornet.golpearAguijon(knight);
        knight.focalizarCuracion();
    }
}`,
  },
  {
    id: 20,
    slug: 'zelda-espadas-hyrule',
    title: 'Duelo de Espadachines de Hyrule (The Legend of Zelda)',
    gameTheme: 'The Legend of Zelda',
    icon: '🛡️',
    context: 'Link se enfrenta a Dark Link. Empuña la Espada Maestra, se protege con el Escudo Hyliano y come platos cocinados de corazones.',
    task: 'Modela HeroeHyrule, EspadaMaestra, EscudoHyliano y PlatoCocinado. El escudo permite ejecutar un contraataque Parry si mitiga el impacto a la perfección.',
    mainClass: {
      name: 'HeroeHyrule',
      attrs: ['- nombre: String', '- corazonesVida: int', '- estamina: double', '- espada: EspadaMaestra', '- escudo: EscudoHyliano', '- alforja: List~PlatoCocinado~'],
      methods: [
        '+ ataqueGiratorio(rival: HeroeHyrule): void',
        '+ defenderConParry(danioEntrante: int): int',
        '+ comerReceta(indice: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'EspadaMaestra',
        attrs: ['- poderSagrado: int', '- brilloEspada: boolean'],
        methods: ['+ desatarTajo(): int'],
      },
      {
        name: 'EscudoHyliano',
        attrs: ['- durabilidad: int', '- defensaBase: int'],
        methods: ['+ ejecutarParry(danio: int): int'],
      },
      {
        name: 'PlatoCocinado',
        attrs: ['- nombrePlato: String', '- corazonesCurados: int', '- consumido: boolean'],
        methods: ['+ comer(): int'],
      },
    ],
    relations: [
      { from: 'HeroeHyrule', to: 'EspadaMaestra', type: 'aggregation', label: 'empuña 1' },
      { from: 'HeroeHyrule', to: 'EscudoHyliano', type: 'aggregation', label: 'equipa 1' },
      { from: 'HeroeHyrule', to: 'PlatoCocinado', type: 'composition', label: 'alforja *' },
    ],
    solutionCodeJava: `import java.util.ArrayList;
import java.util.List;

class EspadaMaestra {
    private int poder;
    public EspadaMaestra(int poder) { this.poder = poder; }
    public int desatarTajo() {
        System.out.println("  ✨ ¡Rayo de luz sagrada de la Espada Maestra!");
        return poder;
    }
}

class EscudoHyliano {
    private int durabilidad = 100;
    public int ejecutarParry(int danio) {
        boolean exito = Math.random() < 0.40;
        if (exito) {
            System.out.println("  🛡️ ¡PARRY PERFECTO! Daño completamente desviado!");
            return 0;
        }
        return Math.max(1, danio - 3);
    }
}

class PlatoCocinado {
    private String nombre;
    private int corazones;
    private boolean consumido = false;
    public PlatoCocinado(String n, int c) { this.nombre = n; this.corazones = c; }
    public int comer() {
        if (!consumido) { consumido = true; return corazones; }
        return 0;
    }
    public String getNombre() { return nombre; }
}

class HeroeHyrule {
    private String nombre;
    private int corazones;
    private EspadaMaestra espada;
    private EscudoHyliano escudo;
    private List<PlatoCocinado> alforja;

    public HeroeHyrule(String nombre, int corazones, EspadaMaestra espada, EscudoHyliano escudo) {
        this.nombre = nombre;
        this.corazones = corazones;
        this.espada = espada;
        this.escudo = escudo;
        this.alforja = new ArrayList<>();
    }

    public void agregarPlato(PlatoCocinado p) { alforja.add(p); }

    public void ataqueGiratorio(HeroeHyrule rival) {
        System.out.println("🌀 " + nombre + " ejecuta Ataque Giratorio con la Espada Maestra!");
        int d = espada.desatarTajo();
        rival.recibirAtaque(d);
    }

    public void recibirAtaque(int danio) {
        int finalD = escudo != null ? escudo.ejecutarParry(danio) : danio;
        corazones = Math.max(0, corazones - finalD);
        System.out.println("  💔 " + nombre + " Corazones: " + corazones);
    }

    public void comerReceta(int i) {
        if (i >= 0 && i < alforja.size()) {
            PlatoCocinado plato = alforja.get(i);
            int h = plato.comer();
            if (h > 0) {
                corazones += h;
                System.out.println("🍗 " + nombre + " comió " + plato.getNombre() + " (+ " + h + " corazones).");
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        HeroeHyrule link = new HeroeHyrule("Link", 15, new EspadaMaestra(6), new EscudoHyliano());
        link.agregarPlato(new PlatoCocinado("Salteado de Carne y Setas", 5));

        HeroeHyrule darkLink = new HeroeHyrule("Dark Link", 15, new EspadaMaestra(5), new EscudoHyliano());

        link.ataqueGiratorio(darkLink);
        darkLink.ataqueGiratorio(link);
        link.comerReceta(0);
    }
}`,
  },
];

export function toMermaidGame(ch: PooGameChallenge): string {
  const clean = (s: string) => s.trim().replace(/^([+\-#~])\s*/, '$1');
  const fmtMember = (m: string) => {
    const t = clean(m);
    if (!t) return '';
    if (t.startsWith('+') || t.startsWith('-') || t.startsWith('#') || t.startsWith('~')) return t;
    return `+${t}`;
  };

  const block = (cls: UmlClassSpec) => {
    const cleanName = cls.name.replace(/«[^»]+»\s*/, '').trim();
    const lines = [
      ...cls.attrs.map((a) => `        ${fmtMember(a)}`),
      ...cls.methods.map((m) => `        ${fmtMember(m)}`),
    ];
    return `    class ${cleanName} {\n${lines.join('\n')}\n    }`;
  };

  const lines = ['classDiagram', '    direction TB'];
  lines.push(block(ch.mainClass));

  for (const asc of ch.associatedClasses) {
    lines.push(block(asc));
  }

  for (const rel of ch.relations) {
    const relSymbol = rel.type === 'composition' ? '*--' : 'o--';
    lines.push(`    ${rel.from} ${relSymbol} ${rel.to} : ${rel.label}`);
  }

  return lines.join('\n');
}
