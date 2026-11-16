import type { PooGameChallenge } from './pooGameSimpleChallenges';

export type ClassAttr = {
  name: string;
  type: string;
  desc: string;
};

export type ClassMethod = {
  signature: string;
  desc: string;
};

export type ClassDetail = {
  name: string;
  role: 'Clase principal' | 'Clase asociada';
  holds: string;
  attrs: ClassAttr[];
  methods: ClassMethod[];
};

export type PooGameCaseStudy = PooGameChallenge & {
  level: 'basico' | 'avanzado';
  summary: string;
  classAnalysis: ClassDetail[];
  rules: string[];
  expectedOutput: string;
  steps: string[];
};

export const pooGameCaseStudies: PooGameCaseStudy[] = [
  // ─────────────────────────────────────────────────────────────
  // CASO 1 · Entrenador y Pokémon
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'caso-entrenador-pokemon',
    title: 'Entrenador y Pokémon: ataque por turnos con críticos',
    gameTheme: 'Pokémon',
    icon: '⚡',
    level: 'basico',
    summary:
      'El Entrenador tiene nombre, probabilidad de crítico y un Pokémon. El Pokémon tiene nombre, vida, ataque y defensa.',
    context:
      'Dos entrenadores se citan en la liga. Cada uno llama a su Pokémon y se atacan por turnos hasta que uno se queda sin vida. El detalle interesante es que el crítico no lo decide el Pokémon, lo decide su entrenador, porque cada uno tiene su propia probabilidad. Por eso el Entrenador necesita conocer al rival: para darle la orden a su Pokémon y comparar estadísticas.',
    task:
      'Crea las clases Entrenador y Pokemon. El Entrenador recibe su Pokémon en el constructor. En jugarTurno(rival) le ordenas atacar, imprimes el cálculo del daño, decides si hay crítico con Math.random() y el rival se defiende. En Main repites turnos con un while hasta que alguien muera.',
    classAnalysis: [
      {
        name: 'Entrenador',
        role: 'Clase principal',
        holds:
          'Es la clase que tiene un Pokémon: guarda la referencia al objeto Pokemon como atributo, así que puede darle órdenes y decidir cuándo hay crítico.',
        attrs: [
          { name: 'nombre', type: 'String', desc: 'Nombre del entrenador (Mario, Ash...).' },
          { name: 'probabilidadCritico', type: 'double', desc: 'Probabilidad de crítico de 0.0 a 1.0 (0.35 = 35%).' },
          { name: 'pokemon', type: 'Pokemon', desc: 'Su Pokémon: asociación por atributo (1 Entrenador → 1 Pokemon).' },
          { name: 'criticos', type: 'int', desc: 'Contador de críticos acertados en el combate.' },
        ],
        methods: [
          { signature: 'Entrenador(String nombre, double probabilidadCritico, Pokemon pokemon)', desc: 'Constructor: recibe el Pokémon ya creado (asociación por parámetro).' },
          { signature: 'void llamarPokemon()', desc: 'Imprime "El entrenador X ha llamado a su Pokémon Y" y su ficha.' },
          { signature: 'void jugarTurno(Entrenador rival)', desc: 'Ordena atacar: calcula el daño, tira el crítico y lo aplica al Pokémon rival.' },
          { signature: 'Pokemon getPokemon()', desc: 'Devuelve su Pokémon para poder consultarlo desde Main.' },
          { signature: 'int getCriticos()', desc: 'Devuelve cuántos críticos acertó (para el marcador final).' },
        ],
      },
      {
        name: 'Pokemon',
        role: 'Clase asociada',
        holds:
          'Es el objeto que pelea. Guarda sus estadísticas y sabe imprimir su ficha y recibir daño, pero no sabe nada de críticos: de eso se encarga su entrenador.',
        attrs: [
          { name: 'nombre', type: 'String', desc: 'Nombre del Pokémon (Pikachu, Nidoking...).' },
          { name: 'tipo', type: 'String', desc: 'Su tipo (Eléctrico, Tierra...) para la ficha.' },
          { name: 'vida / vidaMax', type: 'int', desc: 'Vida actual y máxima: no baja de 0 y se muestra como x/y.' },
          { name: 'ataque', type: 'int', desc: 'Potencia de ataque: se resta a la defensa del rival.' },
          { name: 'defensa', type: 'int', desc: 'Mitigación: se resta al ataque del rival.' },
        ],
        methods: [
          { signature: 'Pokemon(String nombre, String tipo, int vida, int ataque, int defensa)', desc: 'Constructor con la vida inicial igual a la vida máxima.' },
          { signature: 'void imprimirFicha()', desc: 'Muestra nombre, tipo, vida, ataque y defensa.' },
          { signature: 'void recibirDanio(int dano)', desc: 'Resta el daño con Math.max(0, vida - dano) e imprime la vida restante.' },
          { signature: 'boolean estaVivo()', desc: 'true si la vida es mayor que 0: es la condición del while.' },
          { signature: 'getAtaque() / getDefensa() / getVida() / getNombre()', desc: 'Getters que necesita el entrenador rival para calcular el daño.' },
        ],
      },
    ],
    rules: [
      'Daño base = ataque del atacante − defensa del defensor. Nunca puede bajar de 1.',
      'Crítico: se tira Math.random() < probabilidadCritico del ENTRENADOR. Si sale, daño = daño × 2.',
      'La vida nunca baja de 0: se usa Math.max(0, vida − daño).',
      'Cada turno imprime la frase del atacante, la línea "Cálculo del daño: X - Y = Z" y la defensa del rival.',
      'Gana el_entrenador cuyo Pokémon sigue vivo: el while continúa mientras los dos estén vivos.',
    ],
    expectedOutput: `====================================================
      �CAZA DEL DRAG�N VOLC�NICO!
====================================================
La cazadora Arya prepara su equipo de hielo.
   Arya | Vida: 140/140 | Elemento de flecha: HIELO | Flechas: 10
Un drag�n emerge de la caldera y bloquea el paso.
   Vulcanwing | Vida: 200/200 | Armadura: 12 | Aliento: 18-28 | Elemento: FUEGO (debilidad: HIELO)

---------- TURNO 1 ----------
   Arya ha preparado una flecha de HIELO.
   Factor elemental: HIELO contra FUEGO = x2 (debilidad).
   C�lculo: 25 x 2.0 = 50 | 50 - 12 (armadura) = 38.
   Arya ha causado 38 de da�o a Vulcanwing.
   Flechas restantes: 9
   Vulcanwing ha recibido 38 de da�o y queda con 162/200 de vida.
   Vulcanwing lanza una llamarada de FUEGO.
   Rango de la llamarada: 18 a 28  ->  ha salido 23
   Arya ha recibido 23 de da�o y queda con 117/140 de vida.

---------- TURNO 2 ----------
   Arya ha preparado una flecha de HIELO.
   Factor elemental: HIELO contra FUEGO = x2 (debilidad).
   C�lculo: 25 x 2.0 = 50 | 50 - 12 (armadura) = 38.
   Arya ha causado 38 de da�o a Vulcanwing.
   Flechas restantes: 8
   Vulcanwing ha recibido 38 de da�o y queda con 124/200 de vida.
   Vulcanwing lanza una llamarada de FUEGO.
   Rango de la llamarada: 18 a 28  ->  ha salido 20
   Arya ha recibido 20 de da�o y queda con 97/140 de vida.


  ... (los turnos se repiten hasta que alguien gane) ...

   Vulcanwing ha recibido 38 de da�o y queda con 0/200 de vida.

====================================================
   �Vulcanwing ha ca�do! Caza completada.
   Arya consigui� 228 puntos de caza.
====================================================`,
    steps: [
      'Creé la clase Zombi con vida, defensa y el rango ataqueMin / ataqueMax.',
      'Implementé rollearAtaque() con Math.random() para que cada golpe sea distinto.',
      'Creé la clase Usuario con vida, ataque y defensa, y su método atacar(zombi).',
      'En recibirAtaqueZombi(zombi) pido el valor al zombi y muestro el rango y el número que salió.',
      'Si el valor es el máximo, imprimo ¡ATAQUE FEROZ! y duplico el daño antes de aplicar la defensa.',
      'En Main alterno los turnos con un while (turno impar = usuario, par = zombi).',
    ],
    mainClass: {
      name: 'Usuario',
      attrs: ['- nombre: String', '- vida: int', '- vidaMax: int', '- defensa: int', '- ataque: int'],
      methods: [
        '+ Usuario(nombre: String, vida: int, ataque: int, defensa: int)',
        '+ imprimirFicha(): void',
        '+ atacar(zombi: Zombi): void',
        '+ recibirAtaqueZombi(zombi: Zombi): void',
        '+ estaVivo(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'Zombi',
        attrs: ['- nombre: String', '- vida: int', '- vidaMax: int', '- ataqueMin: int', '- ataqueMax: int', '- defensa: int'],
        methods: [
          '+ rollearAtaque(): int',
          '+ esAtaqueFeroz(valorRoll: int): boolean',
          '+ recibirDanio(dano: int): void',
          '+ getDefensa(): int',
        ],
      },
    ],
    relations: [{ from: 'Usuario', to: 'Zombi', type: 'aggregation', label: 'enfrenta a 1' }],
    solutionCodeJava: `class Zombi {
    private String nombre;
    private int vidaMax;
    private int vida;
    private int ataqueMin;
    private int ataqueMax;
    private int defensa;

    public Zombi(String nombre, int vida, int ataqueMin, int ataqueMax, int defensa) {
        this.nombre = nombre;
        this.vidaMax = vida;
        this.vida = vida;
        this.ataqueMin = ataqueMin;
        this.ataqueMax = ataqueMax;
        this.defensa = defensa;
    }

    public void imprimirFicha() {
        System.out.println("   " + nombre + " | Vida: " + vida + "/" + vidaMax
                + " | Ataque: " + ataqueMin + "-" + ataqueMax + " (rango) | Defensa: " + defensa);
    }

    /** Devuelve el daño bruto que rollea el zombi en ESTE turno (aleatorio dentro de su rango). */
    public int rollearAtaque() {
        return ataqueMin + (int) (Math.random() * (ataqueMax - ataqueMin + 1));
    }

    public boolean esAtaqueFeroz(int valorRoll) {
        return valorRoll == this.ataqueMax;
    }

    public void recibirDanio(int dano) {
        this.vida = Math.max(0, this.vida - dano);
        System.out.println("   " + nombre + " ha recibido " + dano + " de daño y queda con "
                + this.vida + "/" + this.vidaMax + " de vida.");
    }

    public boolean estaVivo() {
        return this.vida > 0;
    }

    public String getNombre() {
        return nombre;
    }

    public int getDefensa() {
        return defensa;
    }

    public int getAtaqueMin() {
        return ataqueMin;
    }

    public int getAtaqueMax() {
        return ataqueMax;
    }

    public int getVida() {
        return vida;
    }
}

class Usuario {
    private String nombre;
    private int vidaMax;
    private int vida;
    private int defensa;
    private int ataque;

    public Usuario(String nombre, int vida, int ataque, int defensa) {
        this.nombre = nombre;
        this.vidaMax = vida;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
    }

    public void imprimirFicha() {
        System.out.println("   " + nombre + " | Vida: " + vida + "/" + vidaMax
                + " | Ataque: " + ataque + " | Defensa: " + defensa);
    }

    public void atacar(Zombi zombi) {
        int ataqueBase = this.ataque;
        int defensaZombi = zombi.getDefensa();
        int dano = Math.max(1, ataqueBase - defensaZombi);

        System.out.println("   " + nombre + " ha atacado a " + zombi.getNombre() + ".");
        System.out.println("   Cálculo del daño: " + ataqueBase + " (ataque) - " + defensaZombi
                + " (defensa) = " + dano + " de daño.");
        zombi.recibirDanio(dano);
    }

    public void recibirAtaqueZombi(Zombi zombi) {
        int valorRoll = zombi.rollearAtaque();
        int dano = Math.max(1, valorRoll - this.defensa);

        System.out.println("   " + zombi.getNombre() + " ataca a " + this.nombre + ".");
        System.out.println("   Rango de daño del zombi: " + zombi.getAtaqueMin() + " a " + zombi.getAtaqueMax()
                + "  ->  ha salido " + valorRoll);
        if (zombi.esAtaqueFeroz(valorRoll)) {
            System.out.println("   ¡ATAQUE FEROZ! Ha sacado el valor máximo: " + valorRoll + " x 2 = " + (valorRoll * 2) + ".");
            dano = Math.max(1, (valorRoll * 2) - this.defensa);
        }
        System.out.println("   Cálculo del daño: " + valorRoll + " (ataque) - " + this.defensa
                + " (defensa) = " + dano + " de daño.");
        this.vida = Math.max(0, this.vida - dano);
        System.out.println("   " + this.nombre + " se ha defendido con " + this.defensa + " y queda con "
                + this.vida + "/" + this.vidaMax + " de vida.");
    }

    public boolean estaVivo() {
        return this.vida > 0;
    }

    public String getNombre() {
        return nombre;
    }

    public int getVida() {
        return vida;
    }
}

public class Main {
    public static void main(String[] args) {
        Usuario alex = new Usuario("Alex", 120, 30, 15);
        Zombi zombiComun = new Zombi("Zombi Común", 90, 18, 26, 8);

        System.out.println("====================================================");
        System.out.println("      ¡COMIENZA LA INVASIÓN ZOMBI!");
        System.out.println("====================================================");
        System.out.println("El usuario Alex se prepara para el combate.");
        alex.imprimirFicha();
        System.out.println("Un zombi se arrastra por las calles de la ciudad.");
        zombiComun.imprimirFicha();

        int turno = 1;
        while (alex.estaVivo() && zombiComun.estaVivo()) {
            System.out.println();
            System.out.println("---------- TURNO " + turno + " · " + (turno % 2 == 1 ? alex.getNombre() : zombiComun.getNombre()) + " ----------");
            if (turno % 2 == 1) {
                alex.atacar(zombiComun);
            } else {
                alex.recibirAtaqueZombi(zombiComun);
            }
            turno++;
        }

        System.out.println();
        System.out.println("====================================================");
        if (alex.estaVivo()) {
            System.out.println("   ¡" + alex.getNombre() + " sigue vivo con " + alex.getVida() + " de vida!");
            System.out.println("   El zombi ha caído y la ciudad está a salvo.");
        } else {
            System.out.println("   El usuario ha sido infectado por " + zombiComun.getNombre() + ".");
        }
        System.out.println("====================================================");
    }
}`,
  },
  // ─────────────────────────────────────────────────────────────
  // CASO 3 · Cazador y Dragón (elemento ×2 / ×0.5)
  // ─────────────────────────────────────────────────────────────
  {
    id: 3,
    slug: 'caso-cazador-dragon',
    title: 'Cazador y Dragón: ventaja elemental y munición',
    gameTheme: 'Monster Hunter / RPG',
    icon: '🐉',
    level: 'avanzado',
    summary:
      'El Cazador tiene vida, flechas y un elemento. El Dragón tiene vida, armadura, rango de aliento y una debilidad elemental.',
    context:
      'Una cazadora se encuentra a un dragón volcánico que bloquea el paso. El dragón es de tipo FUEGO y su debilidad es el HIELO, así que la cazadora carga flechas de hielo y le hace el doble de daño. El dragón responde con una llamarada cuyo daño también es aleatorio dentro de un rango, y la cazadora tiene un número limitado de flechas: cuando se agotan, tiene que pelear cuerpo a cuerpo.',
    task:
      'Crea las clases Cazador y Dragon. El dragón responde a dos preguntas del cazador (esDebilidad y esResistencia) para que el factor elemental se calcule con ayuda del rival. El Cazador aplica el daño, descuenta la flecha y, si se queda sin munición, ataca cuerpo a cuerpo. Repite hasta que uno caiga.',
    classAnalysis: [
      {
        name: 'Cazador',
        role: 'Clase principal',
        holds:
          'Tiene vida, flechas y el elemento de sus flechas. Es el que decide la acción del turno y calcula el daño preguntando al dragón por su debilidad y su armadura.',
        attrs: [
          { name: 'nombre', type: 'String', desc: 'Nombre de la cazadora o del cazador.' },
          { name: 'elemento', type: 'String', desc: 'Elemento de la flecha (HIELO, FUEGO, RAYO...).' },
          { name: 'vida / vidaMax', type: 'int', desc: 'Vida actual y máxima del cazador.' },
          { name: 'flechas', type: 'int', desc: 'Munición restante: al llegar a 0 se pelea cuerpo a cuerpo.' },
          { name: 'puntos', type: 'int', desc: 'Suma del daño causado (marcador de la caza).' },
        ],
        methods: [
          { signature: 'Cazador(String nombre, String elemento, int vida, int flechas)', desc: 'Constructor del cazador con su elemento y su munición.' },
          { signature: 'void imprimirFicha()', desc: 'Muestra vida, elemento y flechas restantes.' },
          { signature: 'void disparar(Dragon dragon)', desc: 'Tira el factor elemental, aplica la armadura, descuenta la flecha e imprime el cálculo.' },
          { signature: 'void recibirAliento(Dragon dragon)', desc: 'Pide al dragón el valor aleatorio de la llamarada y descuenta la vida.' },
          { signature: 'boolean estaVivo() / int getPuntos()', desc: 'Estado del cazador y puntos de caza para el final.' },
        ],
      },
      {
        name: 'Dragon',
        role: 'Clase asociada',
        holds:
          'Es el rival. Además de vida y armadura, guarda su tipo elemental y su debilidad, y es él quien responde si el elemento recibido le duele el doble o le resiste.',
        attrs: [
          { name: 'nombre', type: 'String', desc: 'Nombre del dragón (Vulcanwing...).' },
          { name: 'tipoElemental', type: 'String', desc: 'Su tipo (FUEGO): si le lanzan su mismo elemento, resiste.' },
          { name: 'debilidad', type: 'String', desc: 'Elemento que le hace el doble de daño (HIELO).' },
          { name: 'vida / vidaMax', type: 'int', desc: 'Vida actual y máxima del dragón.' },
          { name: 'armadura', type: 'int', desc: 'Mitigación fija que se resta al daño de la flecha.' },
          { name: 'ataqueMin / ataqueMax', type: 'int', desc: 'Rango aleatorio de la llamarada.' },
        ],
        methods: [
          { signature: 'Dragon(String nombre, String tipoElemental, String debilidad, int vida, int ataqueMin, int ataqueMax, int armadura)', desc: 'Constructor con tipo, debilidad, rango y armadura.' },
          { signature: 'boolean esDebilidad(String elemento)', desc: 'true si el elemento recibido coincide con su debilidad (×2).' },
          { signature: 'boolean esResistencia(String elemento)', desc: 'true si el elemento recibido es su propio tipo (×0.5).' },
          { signature: 'int rollearAliento()', desc: 'Número aleatorio entre ataqueMin y ataqueMax para la llamarada.' },
          { signature: 'void recibirDanio(int dano)', desc: 'Resta el daño con Math.max(0, vida - dano) e imprime la vida restante.' },
          { signature: 'getArmadura() / getNombre() / getTipoElemental() / estaVivo()', desc: 'Datos que necesita el cazador para calcular e imprimir el daño.' },
        ],
      },
    ],
    rules: [
      'Daño de flecha = (25 × factor elemental) − armadura del dragón, con mínimo de 1.',
      'Factor elemental: ×2 si el elemento es la debilidad, ×0.5 si es su propio tipo, ×1 si no coincide.',
      'Cada disparo descuenta una flecha y muestra las que quedan.',
      'Sin flechas el cazador ataca cuerpo a cuerpo: 8 de daño y sin aplicar armadura.',
      'La llamarada del dragón es aleatoria dentro de su rango y no la mitiga la armadura (el cazador no tiene).',
    ],
    expectedOutput: `====================================================
      �CAZA DEL DRAG�N VOLC�NICO!
====================================================
La cazadora Arya prepara su equipo de hielo.
   Arya | Vida: 140/140 | Elemento de flecha: HIELO | Flechas: 10
Un drag�n emerge de la caldera y bloquea el paso.
   Vulcanwing | Vida: 200/200 | Armadura: 12 | Aliento: 18-28 | Elemento: FUEGO (debilidad: HIELO)

---------- TURNO 1 ----------
   Arya ha preparado una flecha de HIELO.
   Factor elemental: HIELO contra FUEGO = x2 (debilidad).
   C�lculo: 25 x 2.0 = 50 | 50 - 12 (armadura) = 38.
   Arya ha causado 38 de da�o a Vulcanwing.
   Flechas restantes: 9
   Vulcanwing ha recibido 38 de da�o y queda con 162/200 de vida.
   Vulcanwing lanza una llamarada de FUEGO.
   Rango de la llamarada: 18 a 28  ->  ha salido 20
   Arya ha recibido 20 de da�o y queda con 120/140 de vida.

---------- TURNO 2 ----------
   Arya ha preparado una flecha de HIELO.
   Factor elemental: HIELO contra FUEGO = x2 (debilidad).
   C�lculo: 25 x 2.0 = 50 | 50 - 12 (armadura) = 38.
   Arya ha causado 38 de da�o a Vulcanwing.
   Flechas restantes: 8
   Vulcanwing ha recibido 38 de da�o y queda con 124/200 de vida.
   Vulcanwing lanza una llamarada de FUEGO.
   Rango de la llamarada: 18 a 28  ->  ha salido 18
   Arya ha recibido 18 de da�o y queda con 102/140 de vida.

---------- TURNO 3 ----------
   Arya ha preparado una flecha de HIELO.
   Factor elemental: HIELO contra FUEGO = x2 (debilidad).
   C�lculo: 25 x 2.0 = 50 | 50 - 12 (armadura) = 38.
   Arya ha causado 38 de da�o a Vulcanwing.
   Flechas restantes: 7
   Vulcanwing ha recibido 38 de da�o y queda con 86/200 de vida.
   Vulcanwing lanza una llamarada de FUEGO.
   Rango de la llamarada: 18 a 28  ->  ha salido 28
   Arya ha recibido 28 de da�o y queda con 74/140 de vida.

  ... (los turnos se repiten hasta que alguien gane) ...

   Vulcanwing ha recibido 38 de da�o y queda con 0/200 de vida.

====================================================
   �Vulcanwing ha ca�do! Caza completada.
   Arya consigui� 228 puntos de caza.
====================================================`,
    steps: [
      'Creé la clase Dragon con vida, armadura, tipo, debilidad y el rango de la llamarada.',
      'Implementé esDebilidad() y esResistencia() para que el dragón responda sobre el factor.',
      'Creé la clase Cazador con vida, elemento, flechas y puntos.',
      'En disparar(dragon) calculo el factor, aplico la armadura e imprimo la línea de cálculo completa.',
      'Si no quedan flechas, imprimo el mensaje y hago el ataque cuerpo a cuerpo.',
      'En Main alterno disparo y llamarada con un while hasta que el dragón o el cazador caigan.',
    ],
    mainClass: {
      name: 'Cazador',
      attrs: ['- nombre: String', '- elemento: String', '- vida: int', '- vidaMax: int', '- flechas: int', '- puntos: int'],
      methods: [
        '+ Cazador(nombre: String, elemento: String, vida: int, flechas: int)',
        '+ imprimirFicha(): void',
        '+ disparar(dragon: Dragon): void',
        '+ recibirAliento(dragon: Dragon): void',
        '+ estaVivo(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'Dragon',
        attrs: ['- nombre: String', '- tipoElemental: String', '- debilidad: String', '- vida: int', '- vidaMax: int', '- ataqueMin: int', '- ataqueMax: int', '- armadura: int'],
        methods: [
          '+ esDebilidad(elemento: String): boolean',
          '+ esResistencia(elemento: String): boolean',
          '+ rollearAliento(): int',
          '+ recibirDanio(dano: int): void',
          '+ getArmadura(): int',
        ],
      },
    ],
    relations: [{ from: 'Cazador', to: 'Dragon', type: 'aggregation', label: 'caza a 1' }],
    solutionCodeJava: `class Dragon {
    private String nombre;
    private String tipoElemental;
    private String debilidad;
    private int vidaMax;
    private int vida;
    private int ataqueMin;
    private int ataqueMax;
    private int armadura;

    public Dragon(String nombre, String tipoElemental, String debilidad,
                  int vida, int ataqueMin, int ataqueMax, int armadura) {
        this.nombre = nombre;
        this.tipoElemental = tipoElemental;
        this.debilidad = debilidad;
        this.vidaMax = vida;
        this.vida = vida;
        this.ataqueMin = ataqueMin;
        this.ataqueMax = ataqueMax;
        this.armadura = armadura;
    }

    public void imprimirFicha() {
        System.out.println("   " + nombre + " | Vida: " + vida + "/" + vidaMax
                + " | Armadura: " + armadura
                + " | Aliento: " + ataqueMin + "-" + ataqueMax
                + " | Elemento: " + tipoElemental + " (debilidad: " + debilidad + ")");
    }

    public boolean esDebilidad(String elemento) {
        return this.debilidad.equals(elemento);
    }

    public boolean esResistencia(String elemento) {
        return this.tipoElemental.equals(elemento);
    }

    public String getNombre() {
        return nombre;
    }

    public String getTipoElemental() {
        return tipoElemental;
    }

    public String getDebilidad() {
        return debilidad;
    }

    public int getArmadura() {
        return armadura;
    }

    public int getAtaqueMin() {
        return ataqueMin;
    }

    public int getAtaqueMax() {
        return ataqueMax;
    }

    public int rollearAliento() {
        return ataqueMin + (int) (Math.random() * (ataqueMax - ataqueMin + 1));
    }

    public void recibirDanio(int dano) {
        this.vida = Math.max(0, this.vida - dano);
        System.out.println("   " + nombre + " ha recibido " + dano + " de daño y queda con "
                + this.vida + "/" + this.vidaMax + " de vida.");
    }

    public boolean estaVivo() {
        return this.vida > 0;
    }
}

class Cazador {
    private static final int DANO_FLECHA = 25;
    private static final int DANO_CUERPO_A_CUERPO = 8;

    private String nombre;
    private String elemento;
    private int vidaMax;
    private int vida;
    private int flechas;
    private int puntos;

    public Cazador(String nombre, String elemento, int vida, int flechas) {
        this.nombre = nombre;
        this.elemento = elemento;
        this.vidaMax = vida;
        this.vida = vida;
        this.flechas = flechas;
        this.puntos = 0;
    }

    public void imprimirFicha() {
        System.out.println("   " + nombre + " | Vida: " + vida + "/" + vidaMax
                + " | Elemento de flecha: " + elemento
                + " | Flechas: " + flechas);
    }

    public void disparar(Dragon dragon) {
        int dano;

        if (this.flechas > 0) {
            this.flechas--;
            double factor = 1.0;
            String explicacion;

            if (dragon.esDebilidad(this.elemento)) {
                factor = 2.0;
                explicacion = this.elemento + " contra " + dragon.getTipoElemental() + " = x2 (debilidad)";
            } else if (dragon.esResistencia(this.elemento)) {
                factor = 0.5;
                explicacion = this.elemento + " contra " + dragon.getTipoElemental() + " = x0.5 (resistencia)";
            } else {
                explicacion = this.elemento + " contra " + dragon.getTipoElemental() + " = x1 (neutro)";
            }

            int conElemento = (int) (DANO_FLECHA * factor);
            dano = Math.max(1, conElemento - dragon.getArmadura());

            System.out.println("   " + nombre + " ha preparado una flecha de " + this.elemento + ".");
            System.out.println("   Factor elemental: " + explicacion + ".");
            System.out.println("   Cálculo: " + DANO_FLECHA + " x " + factor + " = " + conElemento
                    + " | " + conElemento + " - " + dragon.getArmadura() + " (armadura) = " + dano + ".");
        } else {
            dano = DANO_CUERPO_A_CUERPO;
            System.out.println("   " + nombre + " se ha quedado sin flechas y ataca cuerpo a cuerpo.");
            System.out.println("   Cálculo: daño cuerpo a cuerpo = " + dano + " (la armadura no aplica).");
        }

        System.out.println("   " + nombre + " ha causado " + dano + " de daño a " + dragon.getNombre() + ".");
        System.out.println("   Flechas restantes: " + this.flechas);
        this.puntos += dano;
        dragon.recibirDanio(dano);
    }

    public void recibirAliento(Dragon dragon) {
        int valorRoll = dragon.rollearAliento();
        System.out.println("   " + dragon.getNombre() + " lanza una llamarada de " + dragon.getTipoElemental() + ".");
        System.out.println("   Rango de la llamarada: " + dragon.getAtaqueMin() + " a " + dragon.getAtaqueMax()
                + "  ->  ha salido " + valorRoll);
        this.vida = Math.max(0, this.vida - valorRoll);
        System.out.println("   " + nombre + " ha recibido " + valorRoll + " de daño y queda con "
                + this.vida + "/" + this.vidaMax + " de vida.");
    }

    public boolean estaVivo() {
        return this.vida > 0;
    }

    public int getPuntos() {
        return puntos;
    }
}

public class Main {
    public static void main(String[] args) {
        Dragon volcanico = new Dragon("Vulcanwing", "FUEGO", "HIELO", 200, 18, 28, 12);
        Cazador arya = new Cazador("Arya", "HIELO", 140, 10);

        System.out.println("====================================================");
        System.out.println("      ¡CAZA DEL DRAGÓN VOLCÁNICO!");
        System.out.println("====================================================");
        System.out.println("La cazadora Arya prepara su equipo de hielo.");
        arya.imprimirFicha();
        System.out.println("Un dragón emerge de la caldera y bloquea el paso.");
        volcanico.imprimirFicha();

        int turno = 1;
        while (arya.estaVivo() && volcanico.estaVivo()) {
            System.out.println();
            System.out.println("---------- TURNO " + turno + " ----------");
            arya.disparar(volcanico);
            if (volcanico.estaVivo()) {
                arya.recibirAliento(volcanico);
            }
            turno++;
        }

        System.out.println();
        System.out.println("====================================================");
        if (volcanico.estaVivo()) {
            System.out.println("   ¡" + volcanico.getNombre() + " ha vencido a la cazadora!");
        } else {
            System.out.println("   ¡" + volcanico.getNombre() + " ha caído! Caza completada.");
            System.out.println("   Arya consiguió " + arya.getPuntos() + " puntos de caza.");
        }
        System.out.println("====================================================");
    }
}`,
  },
];