export type UmlClassSpec = {
  name: string;
  attrs: string[];
  methods: string[];
};

export type PooGameLevel = 'basico' | 'intermedio' | 'avanzado' | 'experto';

export type PooGameChallenge = {
  id: number;
  slug: string;
  title: string;
  gameTheme: string;
  icon: string;
  context: string;
  task: string;
  level?: PooGameLevel;
  methodHints?: string[];
  mainClass: UmlClassSpec;
  associatedClasses: UmlClassSpec[];
  relations: { from: string; to: string; type: 'aggregation' | 'composition'; label: string }[];
  solutionCodeJava: string;
};

export const pooGameLevelMeta: Record<
  PooGameLevel,
  { label: string; short: string; icon: string; detail: string }
> = {
  basico: {
    label: 'Nivel 1 · Asociación básica',
    short: '2 clases',
    icon: '🟢',
    detail: 'Una clase principal asociada a una sola clase. Indicaciones de los métodos que puedes hacer.',
  },
  intermedio: {
    label: 'Nivel 2 · Asociación intermedia',
    short: '3 clases',
    icon: '🟡',
    detail: 'Tres clases conectadas entre sí, resolviendo la relación con atributos de referencia (sin usar List).',
  },
  avanzado: {
    label: 'Nivel 3 · Asociación avanzada',
    short: '4 clases',
    icon: '🟠',
    detail: 'Cuatro clases que forman un mini-motor de juego con cadena de asociaciones.',
  },
  experto: {
    label: 'Nivel 4 · Combate por turnos',
    short: 'experto',
    icon: '🔴',
    detail: 'Combates 1v1 completos con armas, escudos, listas de ítems y simulaciones por turnos.',
  },
};

export const pooGameSimpleChallenges: PooGameChallenge[] = [
  // ─────────────────────────────────────────────────────────────
  // NIVEL 1 · 2 clases (1 principal + 1 asociada) · IDs 1-10
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'pac-man-puntos',
    title: 'Pac-Man y los puntos del laberinto',
    gameTheme: 'Pac-Man (clásico de arcade)',
    icon: '🕹️',
    level: 'basico',
    context:
      'Pac-Man recorre el laberinto celda a celda. Cada celda puede contener un punto con un valor de 10 puntos. Cuando Pac-Man pisa un punto, se lo come y suma su valor a su marcador; si vuelve a pasar por la misma celda, el punto ya no vale nada.',
    task:
      'Crea la clase Punto (el objeto que está en el mapa) y la clase Pacman (el personaje). En el constructor de Pacman NO crees el punto: lo recibes como argumento en comer(punto). Completa todos los métodos del diagrama y prueba en Main que solo puede comer el punto que tiene debajo.',
    methodHints: [
      'Punto.estaComido(): devuelve true si el punto ya fue recolectado',
      'Punto.comer(): cambia el punto a comido = true',
      'Punto.coincide(fila, columna): compara la posición del punto con la del personaje',
      'Pacman.mover(fila, columna, direccion): actualiza la posición actual',
      'Pacman.estaEnPunto(punto): devuelve true si comparte celda con un punto sin comer',
      'Pacman.comer(punto): si está encima del punto, lo marca como comido y suma el valor',
    ],
    mainClass: {
      name: 'Pacman',
      attrs: ['- nombre: String', '- fila: int', '- columna: int', '- direccion: String', '- puntosComidos: int', '- marcador: int'],
      methods: [
        '+ mover(nuevaFila: int, nuevaColumna: int, nuevaDireccion: String): void',
        '+ estaEnPunto(punto: Punto): boolean',
        '+ comer(punto: Punto): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Punto',
        attrs: ['- fila: int', '- columna: int', '- valor: int', '- comido: boolean'],
        methods: ['+ comer(): void', '+ estaComido(): boolean', '+ coincide(fila: int, columna: int): boolean'],
      },
    ],
    relations: [{ from: 'Pacman', to: 'Punto', type: 'aggregation', label: 'come 1' }],
    solutionCodeJava: `class Punto {
    private int fila;
    private int columna;
    private int valor;
    private boolean comido;

    public Punto(int fila, int columna, int valor) {
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.comido = false;
    }

    public void comer() {
        this.comido = true;
    }

    public boolean estaComido() {
        return this.comido;
    }

    public boolean coincide(int fila, int columna) {
        return this.fila == fila && this.columna == columna;
    }

    public String getPosicion() {
        return "(" + fila + "," + columna + ")";
    }

    public int getValor() {
        return valor;
    }
}

class Pacman {
    private String nombre;
    private int fila;
    private int columna;
    private String direccion;
    private int puntosComidos;
    private int marcador;

    public Pacman(String nombre, int fila, int columna, String direccion) {
        this.nombre = nombre;
        this.fila = fila;
        this.columna = columna;
        this.direccion = direccion;
        this.puntosComidos = 0;
        this.marcador = 0;
    }

    public void mover(int nuevaFila, int nuevaColumna, String nuevaDireccion) {
        this.fila = nuevaFila;
        this.columna = nuevaColumna;
        this.direccion = nuevaDireccion;
        System.out.println("🕹️ " + nombre + " se mueve " + nuevaDireccion + " hasta la celda " + nuevaFila + "," + nuevaColumna);
    }

    public boolean estaEnPunto(Punto punto) {
        return !punto.estaComido() && punto.coincide(this.fila, this.columna);
    }

    public void comer(Punto punto) {
        if (estaEnPunto(punto)) {
            punto.comer();
            this.puntosComidos++;
            this.marcador += punto.getValor();
            System.out.println("😋 " + nombre + " come el punto de " + punto.getPosicion() + " (+" + punto.getValor() + ")");
        } else {
            System.out.println(nombre + " está en " + this.fila + "," + this.columna + " y ese punto ya no está disponible.");
        }
    }

    public void mostrarEstado() {
        System.out.println(nombre + " -> " + direccion + " | puntos comidos: " + puntosComidos + " | marcador: " + marcador);
    }

    public String getNombre() {
        return nombre;
    }
}

public class Main {
    public static void main(String[] args) {
        Punto puntoRojo = new Punto(3, 4, 10);
        Punto puntoAzul = new Punto(3, 5, 20);

        Pacman pacman = new Pacman("Pac-Man", 3, 3, "DERECHA");
        pacman.mostrarEstado();

        pacman.mover(3, 4, "DERECHA");
        pacman.comer(puntoRojo);
        pacman.comer(puntoRojo);

        pacman.mover(3, 5, "DERECHA");
        pacman.comer(puntoAzul);
        pacman.mostrarEstado();
    }
}`,
  },
  {
    id: 2,
    slug: 'tetris-tablero-pieza',
    title: 'La pieza de Tetris que cae en el tablero',
    gameTheme: 'Tetris (clásico de bloques)',
    icon: '🧱',
    level: 'basico',
    context:
      'En Tetris el tablero tiene filas y columnas fijas y en todo momento hay una sola pieza activa cayendo. Cuando la pieza deja de bajar, se completa una línea y el tablero genera una pieza nueva automáticamente.',
    task:
      'Crea la clase Pieza y la clase Tablero. Esta vez la relación es de COMPOSICIÓN: el Tablero crea la Pieza en su propio constructor (new Pieza(...)), por lo que nunca se le pasa una pieza desde afuera. Implementa soltarPieza() para que el tablero genere una pieza nueva cuando la anterior queda quieta.',
    methodHints: [
      'Pieza.moverAbajo(filasMaximas): baja una fila y devuelve false si toca el límite',
      'Pieza.moverIzquierda() / moverDerecha(): desplazan la pieza y devuelven si sigue dentro del tablero',
      'Pieza.estaQuieta(): true cuando la pieza ya no puede bajar más',
      'Tablero.cabe(pieza): pregunta si la pieza sigue dentro de los límites del tablero',
      'Tablero.soltarPieza(): si la pieza está quieta, cuenta la línea y genera una pieza nueva',
    ],
    mainClass: {
      name: 'Tablero',
      attrs: ['- filas: int', '- columnas: int', '- piezaActiva: Pieza', '- lineasCompletadas: int'],
      methods: [
        '+ cabe(pieza: Pieza): boolean',
        '+ soltarPieza(): void',
        '+ mostrar(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Pieza',
        attrs: ['- forma: String', '- fila: int', '- columna: int', '- quieta: boolean'],
        methods: [
          '+ moverAbajo(filasTablero: int): boolean',
          '+ moverIzquierda(): void',
          '+ moverDerecha(): void',
          '+ estaQuieta(): boolean',
        ],
      },
    ],
    relations: [{ from: 'Tablero', to: 'Pieza', type: 'composition', label: 'contiene 1 activa' }],
    solutionCodeJava: `class Pieza {
    private String forma;
    private int fila;
    private int columna;
    private boolean quieta;

    public Pieza(String forma, int fila, int columna) {
        this.forma = forma;
        this.fila = fila;
        this.columna = columna;
        this.quieta = false;
    }

    public boolean moverAbajo(int filasTablero) {
        if (this.fila + 1 >= filasTablero) {
            this.quieta = true;
            return false;
        }
        this.fila++;
        return true;
    }

    public void moverIzquierda() {
        if (this.columna > 0) {
            this.columna--;
        }
    }

    public void moverDerecha() {
        this.columna++;
    }

    public boolean estaQuieta() {
        return this.quieta;
    }

    public String getPosicion() {
        return forma + " en (" + fila + "," + columna + ")";
    }

    public int getColumna() {
        return columna;
    }

    public int getFila() {
        return fila;
    }
}

class Tablero {
    private int filas;
    private int columnas;
    private Pieza piezaActiva;
    private int lineasCompletadas;

    // Composicion: el tablero crea su propia pieza, no la recibe.
    public Tablero(int filas, int columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.lineasCompletadas = 0;
        this.piezaActiva = new Pieza("T", 0, 3);
    }

    public boolean cabe(Pieza pieza) {
        return pieza.getColumna() >= 0 && pieza.getColumna() < this.columnas && pieza.getFila() < this.filas;
    }

    public void soltarPieza() {
        if (piezaActiva.estaQuieta()) {
            lineasCompletadas++;
            System.out.println("🧱 Línea completada por la pieza " + piezaActiva.getPosicion());
            piezaActiva = new Pieza("L", 0, 2);
        }
    }

    public void mostrar() {
        System.out.println("Tablero " + filas + "x" + columnas + " | líneas: " + lineasCompletadas + " | activa: " + piezaActiva.getPosicion());
    }
}

public class Main {
    public static void main(String[] args) {
        Tablero tablero = new Tablero(20, 10);
        tablero.mostrar();

        for (int i = 0; i < 19; i++) {
            tablero.soltarPieza();
        }
        tablero.soltarPieza();
        tablero.mostrar();
    }
}`,
  },
  {
    id: 3,
    slug: 'frogger-carriles',
    title: 'La rana que cruza los carriles',
    gameTheme: 'Frogger (clásico de arcade)',
    icon: '🐸',
    level: 'basico',
    context:
      'Frogger es una rana que debe cruzar la calle. Cada carril tiene su propio coche que avanza a una velocidad distinta. Si el coche de ese carril alcanza la columna donde está la rana, pierde una vida.',
    task:
      'Crea la clase Coche (un carril) y la clase Rana (el jugador). La rana recibe el coche como argumento en saltar(coche), no como atributo: la asociación se resuelve por parámetro. Implementa avanzar(), saltar() y estaViva().',
    methodHints: [
      'Coche.avanzar(): suma la velocidad a la columna y vuelve a 0 al salir de la pantalla',
      'Coche.estaEn(columna): true si el coche sigue activo y ocupa esa columna',
      'Coche.frenar(): desactiva el coche (coche parado en el semáforo)',
      'Rana.avanzar(): sube un carril y suma puntos, hasta un máximo',
      'Rana.saltar(coche): si el coche está en su columna pierde una vida, si no gana puntos',
      'Rana.estaViva(): devuelve si todavía le quedan vidas',
    ],
    mainClass: {
      name: 'Rana',
      attrs: ['- nombre: String', '- carril: int', '- columna: int', '- vidas: int', '- puntos: int', '- carrilMaximo: int'],
      methods: ['+ avanzar(): void', '+ saltar(coche: Coche): boolean', '+ estaViva(): boolean', '+ mostrarEstado(): void'],
    },
    associatedClasses: [
      {
        name: 'Coche',
        attrs: ['- color: String', '- carril: int', '- columna: int', '- velocidad: int', '- activo: boolean'],
        methods: ['+ avanzar(): void', '+ estaEn(columna: int): boolean', '+ frenar(): void'],
      },
    ],
    relations: [{ from: 'Rana', to: 'Coche', type: 'aggregation', label: 'esquiva 1' }],
    solutionCodeJava: `class Coche {
    private String color;
    private int carril;
    private int columna;
    private int velocidad;
    private boolean activo;

    public Coche(String color, int carril, int velocidad) {
        this.color = color;
        this.carril = carril;
        this.columna = 0;
        this.velocidad = velocidad;
        this.activo = true;
    }

    public void avanzar() {
        if (!activo) {
            return;
        }
        this.columna += this.velocidad;
        if (this.columna > 20) {
            this.columna = 0;
        }
    }

    public boolean estaEn(int columnaRana) {
        return this.activo && this.columna == columnaRana;
    }

    public void frenar() {
        this.activo = false;
    }

    public int getColumna() {
        return columna;
    }

    public String getColor() {
        return color + " (carril " + carril + ", col " + columna + ")";
    }
}

class Rana {
    private String nombre;
    private int carril;
    private int columna;
    private int vidas;
    private int puntos;
    private int carrilMaximo;

    public Rana(String nombre, int columna, int vidas, int carrilMaximo) {
        this.nombre = nombre;
        this.carril = 0;
        this.columna = columna;
        this.vidas = vidas;
        this.puntos = 0;
        this.carrilMaximo = carrilMaximo;
    }

    public void avanzar() {
        if (this.carril < this.carrilMaximo) {
            this.carril++;
            this.puntos += 10;
        }
    }

    public boolean saltar(Coche coche) {
        if (coche.estaEn(this.columna)) {
            this.vidas--;
            System.out.println("💥 " + nombre + " fue atropellado por el " + coche.getColor() + ". Vidas: " + this.vidas);
            return false;
        }
        this.puntos += 5;
        System.out.println("🐸 " + nombre + " saltó el carril con éxito (+5)");
        return true;
    }

    public boolean estaViva() {
        return this.vidas > 0;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | carril: " + this.carril + "/" + this.carrilMaximo + " | puntos: " + puntos + " | vidas: " + vidas);
    }
}

public class Main {
    public static void main(String[] args) {
        Coche cocheRojo = new Coche("ROJO", 1, 3);
        Coche cocheAzul = new Coche("AZUL", 2, 5);

        Rana rana = new Rana("Rana Pepe", 10, 3, 5);
        rana.mostrarEstado();

        rana.avanzar();
        cocheRojo.avanzar();
        cocheRojo.avanzar();
        cocheRojo.avanzar();
        rana.saltar(cocheRojo);

        cocheAzul.frenar();
        rana.saltar(cocheAzul);
        rana.mostrarEstado();
    }
}`,
  },
  {
    id: 4,
    slug: 'pong-jugador-pelota',
    title: 'El rebote de la pelota en Pong',
    gameTheme: 'Pong (clásico de arcade)',
    icon: '🏓',
    level: 'basico',
    context:
      'En Pong la pelota rebota en las paredes y en la pala del jugador. El jugador mueve su pala con una velocidad y marca un punto cada vez que la pelota pasa de largo su lado del campo.',
    task:
      'Crea la clase Pelota (x, y, velocidadX, velocidadY, rebotes) y la clase Jugador (nombre, posicionY, puntos, velocidad). La pelota llama a los métodos del jugador para comprobar el rebote: así una clase trabaja con la otra sin conocerla por dentro. Prueba un saque y dos rebotes.',
    methodHints: [
      'Pelota.mover(anchoCampo, altoCampo): avanza según su velocidad e invierte la vertical en los bordes',
      'Pelota.rebotarEnJugador(jugador, anchoCampo): invierte la velocidad horizontal y centra la pelota en la pala',
      'Pelota.superaJugador(jugador, anchoCampo): true si la pelota ya pasó la zona de la pala',
      'Jugador.mover(delta): sube o baja la pala sin salirse del campo',
      'Jugador.cubre(pelota, anchoCampo): true si la pala está a la altura de la pelota',
      'Jugador.marcarPunto(): suma un punto y reinicia el saque',
    ],
    mainClass: {
      name: 'Jugador',
      attrs: ['- nombre: String', '- posicionY: int', '- puntos: int', '- velocidad: int', '- alturaCampo: int'],
      methods: [
        '+ mover(delta: int): void',
        '+ cubre(pelota: Pelota, anchoCampo: int): boolean',
        '+ marcarPunto(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Pelota',
        attrs: ['- posicionX: double', '- posicionY: double', '- velocidadX: double', '- velocidadY: double', '- rebotes: int'],
        methods: ['+ mover(anchoCampo: int, altoCampo: int): void', '+ rebotarEnJugador(jugador: Jugador, anchoCampo: int): void', '+ superaJugador(jugador: Jugador, anchoCampo: int): boolean'],
      },
    ],
    relations: [{ from: 'Jugador', to: 'Pelota', type: 'aggregation', label: 'rebota 1' }],
    solutionCodeJava: `class Pelota {
    private double posicionX;
    private double posicionY;
    private double velocidadX;
    private double velocidadY;
    private int rebotes;

    public Pelota(double posicionX, double posicionY, double velocidadX, double velocidadY) {
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.velocidadX = velocidadX;
        this.velocidadY = velocidadY;
        this.rebotes = 0;
    }

    public void mover(int anchoCampo, int altoCampo) {
        this.posicionX += this.velocidadX;
        this.posicionY += this.velocidadY;

        if (this.posicionY <= 0 || this.posicionY >= altoCampo) {
            this.velocidadY = -this.velocidadY;
            this.rebotes++;
            System.out.println("🟡 Rebote en el borde superior/inferior (rebote " + this.rebotes + ")");
        }
        if (this.posicionX <= 0 || this.posicionX >= anchoCampo) {
            this.velocidadX = -this.velocidadX;
        }
    }

    public void rebotarEnJugador(Jugador jugador, int anchoCampo) {
        this.posicionX = anchoCampo - 1;
        this.velocidadX = -Math.abs(this.velocidadX);
        this.posicionY = jugador.getPosicionY();
        this.rebotes++;
        System.out.println("🏓 " + jugador.getNombre() + " devuelve la pelota (rebote " + this.rebotes + ")");
    }

    public boolean superaJugador(Jugador jugador, int anchoCampo) {
        return this.posicionX <= 1 && jugador.getPosicionY() + 12 < this.posicionY - 12;
    }

    public double getPosicionY() {
        return posicionY;
    }

    public double getPosicionX() {
        return posicionX;
    }
}

class Jugador {
    private String nombre;
    private int posicionY;
    private int puntos;
    private int velocidad;
    private int alturaCampo;

    public Jugador(String nombre, int posicionY, int velocidad, int alturaCampo) {
        this.nombre = nombre;
        this.posicionY = posicionY;
        this.puntos = 0;
        this.velocidad = velocidad;
        this.alturaCampo = alturaCampo;
    }

    public void mover(int delta) {
        int nuevaPosicion = this.posicionY + delta * this.velocidad;
        if (nuevaPosicion < 0) {
            nuevaPosicion = 0;
        }
        if (nuevaPosicion > this.alturaCampo - 40) {
            nuevaPosicion = this.alturaCampo - 40;
        }
        this.posicionY = nuevaPosicion;
    }

    public boolean cubre(Pelota pelota, int anchoCampo) {
        return Math.abs(pelota.getPosicionY() - this.posicionY) < 20 && pelota.getPosicionX() <= 2;
    }

    public void marcarPunto() {
        this.puntos++;
        System.out.println("🏆 Punto para " + this.nombre + ". Marcador: " + this.puntos);
    }

    public int getPosicionY() {
        return posicionY;
    }

    public String getNombre() {
        return nombre;
    }
}

public class Main {
    public static void main(String[] args) {
        int anchoCampo = 60;
        int altoCampo = 30;

        Jugador jugador = new Jugador("Jugador 1", 15, 2, altoCampo);
        Pelota pelota = new Pelota(5, 15, 3, 1);

        for (int i = 0; i < 3; i++) {
            pelota.mover(anchoCampo, altoCampo);
            if (jugador.cubre(pelota, anchoCampo)) {
                pelota.rebotarEnJugador(jugador, anchoCampo);
            }
        }
        jugador.mover(1);
        jugador.marcarPunto();
    }
}`,
  },
  {
    id: 5,
    slug: 'space-invaders-nave',
    title: 'La nave que dispara a los aliens',
    gameTheme: 'Space Invaders (clásico de arcade)',
    icon: '👾',
    level: 'basico',
    context:
      'Space Invaders tiene una nave que se desplaza de lado a lado y dispara proyectiles. Cada alien tiene un tipo, una posición y su propia vida, así que un mismo disparo puede destruir a un calamar pero solo rasguñar a un pulpo gigante.',
    task:
      'Crea la clase Alien (tipo, posicionX, vida) y la clase Nave (nombre, posicionX, posicionY, puntos). Implementa disparar(alien) y recibirDisparo(danio). La nave gana puntos distintos según el tipo de alien que destruye.',
    methodHints: [
      'Alien.recibirDisparo(danio): descuenta vida y devuelve true si muere en ese impacto',
      'Alien.getTipo() / getVida(): el tipo decide los puntos y la vida avisa si sigue vivo',
      'Alien.mover(delta): desplaza la horda lateralmente',
      'Nave.mover(delta): mueve la nave y no permite salir del campo',
      'Nave.disparar(alien): llama a alien.recibirDisparo(...) y suma puntos según el tipo',
      'Nave.estaViva() / mostrarEstado(): estado de la nave y marcador',
    ],
    mainClass: {
      name: 'Nave',
      attrs: ['- nombre: String', '- posicionX: int', '- posicionY: int', '- puntos: int', '- anchoCampo: int'],
      methods: [
        '+ mover(delta: int): void',
        '+ disparar(alien: Alien): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Alien',
        attrs: ['- tipo: String', '- posicionX: int', '- posicionY: int', '- vida: int', '- velocidad: int'],
        methods: ['+ recibirDisparo(danio: int): boolean', '+ estaVivo(): boolean', '+ mover(delta: int): void'],
      },
    ],
    relations: [{ from: 'Nave', to: 'Alien', type: 'aggregation', label: 'dispara a 1' }],
    solutionCodeJava: `class Alien {
    private String tipo;
    private int posicionX;
    private int posicionY;
    private int vida;
    private int velocidad;

    public Alien(String tipo, int posicionX, int posicionY, int vida, int velocidad) {
        this.tipo = tipo;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.vida = vida;
        this.velocidad = velocidad;
    }

    public boolean recibirDisparo(int danio) {
        this.vida -= danio;
        if (this.vida <= 0) {
            System.out.println("💥 Alien " + tipo + " destruido en x=" + posicionX);
            return true;
        }
        System.out.println("🛡️ Alien " + tipo + " resistió el disparo (vida: " + this.vida + ")");
        return false;
    }

    public boolean estaVivo() {
        return this.vida > 0;
    }

    public void mover(int delta) {
        this.posicionX += delta * this.velocidad;
    }

    public String getTipo() {
        return tipo;
    }

    public int getPosicionX() {
        return posicionX;
    }
}

class Nave {
    private String nombre;
    private int posicionX;
    private int posicionY;
    private int puntos;
    private int anchoCampo;
    private int danioDisparo;

    public Nave(String nombre, int posicionX, int posicionY, int anchoCampo) {
        this.nombre = nombre;
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.puntos = 0;
        this.anchoCampo = anchoCampo;
        this.danioDisparo = 2;
    }

    public void mover(int delta) {
        int nuevaPosicion = this.posicionX + delta;
        if (nuevaPosicion >= 0 && nuevaPosicion <= this.anchoCampo) {
            this.posicionX = nuevaPosicion;
        }
    }

    public void disparar(Alien alien) {
        System.out.println("🚀 " + nombre + " dispara en x=" + this.posicionX + " hacia el alien " + alien.getTipo());
        if (alien.recibirDisparo(this.danioDisparo)) {
            this.puntos += puntosPorTipo(alien.getTipo());
            System.out.println("   +" + puntosPorTipo(alien.getTipo()) + " puntos");
        }
    }

    private int puntosPorTipo(String tipo) {
        if (tipo.equals("Calamar")) {
            return 30;
        }
        if (tipo.equals("Cangrejo")) {
            return 20;
        }
        return 10;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | x=" + posicionX + " | puntos: " + this.puntos);
    }
}

public class Main {
    public static void main(String[] args) {
        Nave nave = new Nave("Nave Interceptora", 10, 20, 30);
        Alien calamar = new Alien("Calamar", 10, 5, 2, 1);
        Alien pulpo = new Alien("Cangrejo", 14, 5, 5, 1);

        nave.mostrarEstado();
        nave.disparar(calamar);
        nave.mover(2);
        nave.disparar(calamar);
        nave.disparar(pulpo);
        pulpo.mover(1);
        nave.mostrarEstado();
    }
}`,
  },
  {
    id: 6,
    slug: 'flappy-bird-tubos',
    title: 'El vuelo de Flappy entre los tubos',
    gameTheme: 'Flappy Bird (móvil)',
    icon: '🐦',
    level: 'basico',
    context:
      'El pájaro sube al tocar la pantalla y cae solo por gravedad. Los tubos son obstáculos: cada tubo tiene un hueco vertical por el que hay que pasar. Si el pájaro choca con un tubo o se sale del suelo, pierde.',
    task:
      'Crea la clase Tubo (columna, huecoCentro, huecoTamano) y la clase Pajaro (nombre, altura, velocidad, vivo). Implementa caer(), volar() y choca(tubo). El Pajaro consulta al Tubo para saber si la columna ya pasó y si hubo colisión.',
    methodHints: [
      'Tubo.pasoSeguro(alturaPajaro): true si el pájaro está dentro del hueco o la columna aún no llegó',
      'Tubo.alturaBordeSuperior(): límite de arriba que el pájaro no puede tocar',
      'Tubo.alturaBordeInferior(): límite de abajo del hueco',
      'Tubo.getColumna(): para saber si el tubo ya pasó y se puede eliminar',
      'Pajaro.volar(): impulso hacia arriba',
      'Pajaro.caer(): baja según la gravedad y detecta si toca el suelo',
      'Pajaro.choca(tubo): usa los bordes del tubo para decidir si el vuelo termina',
    ],
    mainClass: {
      name: 'Pajaro',
      attrs: ['- nombre: String', '- altura: int', '- velocidad: int', '- gravedad: int', '- altoPantalla: int', '- vivo: boolean'],
      methods: [
        '+ volar(): void',
        '+ caer(): void',
        '+ choca(tubo: Tubo): boolean',
        '+ estaVivo(): boolean',
      ],
    },
    associatedClasses: [
      {
        name: 'Tubo',
        attrs: ['- columna: int', '- huecoCentro: int', '- huecoTamano: int', '- altoPantalla: int'],
        methods: ['+ pasoSeguro(alturaPajaro: int): boolean', '+ alturaBordeSuperior(): int', '+ alturaBordeInferior(): int', '+ getColumna(): int'],
      },
    ],
    relations: [{ from: 'Pajaro', to: 'Tubo', type: 'aggregation', label: 'evita 1' }],
    solutionCodeJava: `class Tubo {
    private int columna;
    private int huecoCentro;
    private int huecoTamano;
    private int altoPantalla;

    public Tubo(int columna, int huecoCentro, int huecoTamano, int altoPantalla) {
        this.columna = columna;
        this.huecoCentro = huecoCentro;
        this.huecoTamano = huecoTamano;
        this.altoPantalla = altoPantalla;
    }

    public int alturaBordeSuperior() {
        return this.huecoCentro - (this.huecoTamano / 2);
    }

    public int alturaBordeInferior() {
        return this.huecoCentro + (this.huecoTamano / 2);
    }

    public boolean pasoSeguro(int alturaPajaro) {
        if (this.columna > 0) {
            return true;
        }
        return alturaPajaro > this.alturaBordeSuperior() && alturaPajaro < this.alturaBordeInferior();
    }

    public int getColumna() {
        return columna;
    }
}

class Pajaro {
    private String nombre;
    private int altura;
    private int velocidad;
    private int gravedad;
    private int altoPantalla;
    private int columnasAvanzadas;
    private boolean vivo;

    public Pajaro(String nombre, int alturaInicial, int altoPantalla) {
        this.nombre = nombre;
        this.altura = alturaInicial;
        this.altoPantalla = altoPantalla;
        this.velocidad = 0;
        this.gravedad = 1;
        this.columnasAvanzadas = 0;
        this.vivo = true;
    }

    public void volar() {
        this.velocidad = -2;
        this.altura += this.velocidad;
    }

    public void caer() {
        this.velocidad += this.gravedad;
        this.altura += this.velocidad;
        this.columnasAvanzadas++;
        if (this.altura >= this.altoPantalla) {
            this.altura = this.altoPantalla;
            this.vivo = false;
            System.out.println("💥 " + nombre + " cayó al suelo.");
        }
    }

    public boolean choca(Tubo tubo) {
        if (tubo.getColumna() != 0) {
            return false;
        }
        boolean seguro = tubo.pasoSeguro(this.altura);
        if (!seguro) {
            this.vivo = false;
            System.out.println("💥 " + nombre + " chocó con el tubo en la columna " + tubo.getColumna());
        }
        return seguro;
    }

    public boolean estaVivo() {
        return vivo;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | altura: " + altura + " | velocidad: " + velocidad + " | vivo: " + vivo);
    }
}

public class Main {
    public static void main(String[] args) {
        int altoPantalla = 40;
        Pajaro pajaro = new Pajaro("Flappy", 20, altoPantalla);
        Tubo tuboRojo = new Tubo(0, 20, 16, altoPantalla);

        pajaro.mostrarEstado();
        pajaro.volar();
        pajaro.caer();
        pajaro.mostrarEstado();
        pajaro.caer();
        pajaro.caer();
        pajaro.volar();
        pajaro.caer();
        pajaro.mostrarEstado();
        pajaro.choca(tuboRojo);
        System.out.println("¿Sobrevivió? " + pajaro.estaVivo());
    }
}`,
  },
  {
    id: 7,
    slug: 'mario-kart-piloto',
    title: 'El kart y su piloto',
    gameTheme: 'Mario Kart',
    icon: '🏎️',
    level: 'basico',
    context:
      'En Mario Kart el kart es el vehículo y el piloto es quien lo conduce. El kart guarda su velocidad, desgaste y color, y el piloto aporta su nombre, su equipo y su pericia al manejarlo.',
    task:
      'Este es el ejemplo clásico de asociación: Vehículo tiene Piloto. Crea la clase Piloto (nombre, equipo, pericia) y la clase Kart (modelo, color, velocidad, piloto). El kart recibe al piloto en el constructor y expone asignarPiloto(piloto) para los cambios de equipo.',
    methodHints: [
      'Kart.acelerar(): sube la velocidad dentro del límite del motor',
      'Kart.frenar(): baja la velocidad hasta 0',
      'Kart.desgaste(puntos): consume la resistencia del kart',
      'Kart.asignarPiloto(piloto): reemplaza al piloto que conduce (asociación por setter)',
      'Kart.getNombrePiloto(): delega en el piloto para mostrar quién conduce',
      'Piloto.getExperto(): el kart mejora su velocidad si el piloto es experto',
    ],
    mainClass: {
      name: 'Kart',
      attrs: ['- modelo: String', '- color: String', '- velocidad: int', '- velocidadMaxima: int', '- resistencia: int', '- piloto: Piloto'],
      methods: [
        '+ acelerar(): void',
        '+ frenar(): void',
        '+ asignarPiloto(piloto: Piloto): void',
        '+ desgaste(puntos: int): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Piloto',
        attrs: ['- nombre: String', '- equipo: String', '- pericia: int', '- carrerasGanadas: int'],
        methods: ['+ getNombre(): String', '+ getEquipo(): String', '+ esExperto(): boolean', '+ ganarCarrera(): void'],
      },
    ],
    relations: [{ from: 'Kart', to: 'Piloto', type: 'aggregation', label: 'conduce 1' }],
    solutionCodeJava: `class Piloto {
    private String nombre;
    private String equipo;
    private int pericia;
    private int carrerasGanadas;

    public Piloto(String nombre, String equipo, int pericia) {
        this.nombre = nombre;
        this.equipo = equipo;
        this.pericia = pericia;
        this.carrerasGanadas = 0;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEquipo() {
        return equipo;
    }

    public boolean esExperto() {
        return this.pericia >= 8;
    }

    public void ganarCarrera() {
        this.carrerasGanadas++;
    }
}

class Kart {
    private String modelo;
    private String color;
    private int velocidad;
    private int velocidadMaxima;
    private int resistencia;
    private Piloto piloto;

    public Kart(String modelo, String color, int velocidadMaxima, int resistencia, Piloto piloto) {
        this.modelo = modelo;
        this.color = color;
        this.velocidadMaxima = velocidadMaxima;
        this.resistencia = resistencia;
        this.piloto = piloto;
        this.velocidad = 0;
    }

    public void acelerar() {
        int tope = this.piloto.esExperto() ? this.velocidadMaxima : this.velocidadMaxima - 10;
        this.velocidad += 5;
        if (this.velocidad > tope) {
            this.velocidad = tope;
        }
        System.out.println("🏎️ " + this.piloto.getNombre() + " acelera el " + modelo + " (" + this.velocidad + "/" + tope + ")");
    }

    public void frenar() {
        this.velocidad = 0;
        System.out.println("🛑 Kart detenido en boxes.");
    }

    public void asignarPiloto(Piloto nuevoPiloto) {
        this.piloto = nuevoPiloto;
        System.out.println("🔁 El " + modelo + " ahora lo conduce " + nuevoPiloto.getNombre() + " (" + nuevoPiloto.getEquipo() + ")");
    }

    public void desgaste(int puntos) {
        this.resistencia -= puntos;
        System.out.println("🔧 " + modelo + " (" + color + ") sufre " + puntos + " de desgaste. Resistencia: " + this.resistencia);
    }
}

public class Main {
    public static void main(String[] args) {
        Piloto mario = new Piloto("Mario", "Equipo Champiñón", 9);
        Kart kartRojo = new Kart("Kart Fénix", "ROJO", 100, 80, mario);

        kartRojo.acelerar();
        kartRojo.acelerar();
        kartRojo.desgaste(25);
        kartRojo.frenar();

        Piloto rosalina = new Piloto("Rosalina", "Equipo Estrella", 5);
        kartRojo.asignarPiloto(rosalina);
        kartRojo.acelerar();
        kartRojo.acelerar();
    }
}`,
  },
  {
    id: 8,
    slug: 'sonic-anillos',
    title: 'Sonic y los anillos que recoge',
    gameTheme: 'Sonic the Hedgehog',
    icon: '💍',
    level: 'basico',
    context:
      'Sonic corre por el escenario y recoge anillos de oro. Cada anillo vale una cantidad distinta, y si Sonic ya recogió ese anillo no puede sumarlo otra vez. Además, correr mucho consume la energía de la rueda de la locomoción.',
    task:
      'Crea la clase Anillo (valor, recogido) y la clase Sonic (nombre, anillos, velocidad, energia). El anillo se pasa por parámetro, nunca se guarda como atributo del personaje. Implementa correr(), recoger() y saltar si le queda energía.',
    methodHints: [
      'Anillo.recoger(): marca el anillo como recogido',
      'Anillo.estaRecogido(): evita sumar dos veces el mismo anillo',
      'Sonic.correr(distancia): consume energía proporcional a la distancia',
      'Sonic.recoger(anillo): si el anillo está libre, lo marca y suma su valor',
      'Sonic.puedeSaltar(): true si tiene energía suficiente para el salto',
      'Sonic.getAnillos(): total de anillos acumulados',
    ],
    mainClass: {
      name: 'Sonic',
      attrs: ['- nombre: String', '- anillos: int', '- velocidad: int', '- energia: int', '- distancia: int'],
      methods: [
        '+ correr(distancia: int): void',
        '+ recoger(anillo: Anillo): void',
        '+ puedeSaltar(): boolean',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Anillo',
        attrs: ['- valor: int', '- recogido: boolean', '- posicionX: int'],
        methods: ['+ recoger(): void', '+ estaRecogido(): boolean', '+ getValor(): int'],
      },
    ],
    relations: [{ from: 'Sonic', to: 'Anillo', type: 'aggregation', label: 'recoge 1' }],
    solutionCodeJava: `class Anillo {
    private int valor;
    private boolean recogido;
    private int posicionX;

    public Anillo(int valor, int posicionX) {
        this.valor = valor;
        this.posicionX = posicionX;
        this.recogido = false;
    }

    public void recoger() {
        this.recogido = true;
    }

    public boolean estaRecogido() {
        return this.recogido;
    }

    public int getValor() {
        return valor;
    }

    public int getPosicionX() {
        return posicionX;
    }
}

class Sonic {
    private String nombre;
    private int anillos;
    private int velocidad;
    private int energia;
    private int distancia;

    public Sonic(String nombre, int velocidad, int energia) {
        this.nombre = nombre;
        this.anillos = 0;
        this.velocidad = velocidad;
        this.energia = energia;
        this.distancia = 0;
    }

    public void correr(int distancia) {
        this.distancia += distancia;
        this.energia -= distancia / 10;
        System.out.println("💨 " + nombre + " corre " + distancia + " m a " + this.velocidad + " km/h. Energía: " + this.energia);
    }

    public void recoger(Anillo anillo) {
        if (anillo.estaRecogido()) {
            System.out.println("El anillo de x=" + anillo.getPosicionX() + " ya estaba recogido.");
            return;
        }
        anillo.recoger();
        this.anillos += anillo.getValor();
        System.out.println("💍 " + nombre + " recoge un anillo (+" + anillo.getValor() + "). Total: " + this.anillos);
    }

    public boolean puedeSaltar() {
        return this.energia > 20;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | distancia: " + distancia + " m | anillos: " + anillos + " | energía: " + energia);
    }
}

public class Main {
    public static void main(String[] args) {
        Anillo chico = new Anillo(1, 120);
        Anillo grande = new Anillo(10, 350);

        Sonic sonic = new Sonic("Sonic", 40, 100);
        sonic.correr(60);
        sonic.recoger(chico);
        sonic.recoger(chico);
        sonic.correr(120);
        sonic.recoger(grande);
        sonic.mostrarEstado();
        System.out.println("Puede saltar: " + sonic.puedeSaltar());
    }
}`,
  },
  {
    id: 9,
    slug: 'donkey-kong-barriles',
    title: 'Mario esquivando los barriles de Donkey Kong',
    gameTheme: 'Donkey Kong (clásico de arcade)',
    icon: '🍌',
    level: 'basico',
    context:
      'Donkey Kong lanza barriles por la escalera y Mario tiene que subir esquivándolos. Cada barril baja por una columna con una velocidad distinta; si coincide con la posición de Mario, Mario pierde una vida.',
    task:
      'Crea la clase Barril (columna, velocidad, activo) y la clase Mario (nombre, posicionX, vidas, puntuacion). Implementa subir() y esquivar(barril). Piensa en quién llama a quién: Mario consulta al Barril para saber si le toca.',
    methodHints: [
      'Barril.caer(): baja una posición y se desactiva al llegar abajo',
      'Barril.estaEn(posicionMario): true si el barril activo está en la misma columna',
      'Mario.subir(pisos): sube en la escalera y suma puntuación',
      'Mario.esquivar(barril): si el barril está en su columna pierde una vida',
      'Mario.estaVivo(): true si todavía tiene vidas',
      'Mario.mostrarEstado(): piso actual, vidas y puntos',
    ],
    mainClass: {
      name: 'Mario',
      attrs: ['- nombre: String', '- posicionX: int', '- piso: int', '- vidas: int', '- puntuacion: int', '- pisoMaximo: int'],
      methods: [
        '+ subir(pisos: int): void',
        '+ esquivar(barril: Barril): boolean',
        '+ estaVivo(): boolean',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Barril',
        attrs: ['- columna: int', '- velocidad: int', '- posicion: int', '- activo: boolean'],
        methods: ['+ caer(): void', '+ estaEn(posicionMario: int): boolean', '+ estaActivo(): boolean'],
      },
    ],
    relations: [{ from: 'Mario', to: 'Barril', type: 'aggregation', label: 'esquiva 1' }],
    solutionCodeJava: `class Barril {
    private int columna;
    private int velocidad;
    private int posicion;
    private int posicionMaxima;
    private boolean activo;

    public Barril(int columna, int velocidad, int posicionMaxima) {
        this.columna = columna;
        this.velocidad = velocidad;
        this.posicionMaxima = posicionMaxima;
        this.posicion = 0;
        this.activo = true;
    }

    public void caer() {
        if (!activo) {
            return;
        }
        this.posicion += this.velocidad;
        if (this.posicion >= this.posicionMaxima) {
            this.posicion = 0;
            this.activo = false;
        }
    }

    public boolean estaEn(int posicionMario) {
        return this.activo && this.columna == posicionMario && this.posicion > this.posicionMaxima / 2;
    }

    public boolean estaActivo() {
        return activo;
    }
}

class Mario {
    private String nombre;
    private int posicionX;
    private int piso;
    private int vidas;
    private int puntuacion;
    private int pisoMaximo;

    public Mario(String nombre, int posicionX, int vidas, int pisoMaximo) {
        this.nombre = nombre;
        this.posicionX = posicionX;
        this.piso = 0;
        this.vidas = vidas;
        this.puntuacion = 0;
        this.pisoMaximo = pisoMaximo;
    }

    public void subir(int pisos) {
        int nuevoPiso = this.piso + pisos;
        if (nuevoPiso > this.pisoMaximo) {
            nuevoPiso = this.pisoMaximo;
        }
        this.piso = nuevoPiso;
        this.puntuacion += pisos * 100;
    }

    public boolean esquivar(Barril barril) {
        if (barril.estaEn(this.posicionX)) {
            this.vidas--;
            System.out.println("💥 ¡Barril en la columna " + this.posicionX + "! Vidas: " + this.vidas);
            return false;
        }
        System.out.println("🍌 " + this.nombre + " esquivó el barril de la columna " + this.posicionX);
        return true;
    }

    public boolean estaVivo() {
        return this.vidas > 0;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | piso: " + piso + "/" + pisoMaximo + " | vidas: " + vidas + " | puntos: " + puntuacion);
    }
}

public class Main {
    public static void main(String[] args) {
        Mario mario = new Mario("Mario", 4, 3, 8);
        Barril barrilRapido = new Barril(4, 3, 12);
        Barril barrilLento = new Barril(7, 1, 12);

        mario.mostrarEstado();
        barrilRapido.caer();
        barrilRapido.caer();
        barrilRapido.caer();
        barrilRapido.caer();
        mario.esquivar(barrilRapido);

        mario.subir(3);
        barrilLento.caer();
        mario.esquivar(barrilLento);
        mario.mostrarEstado();
    }
}`,
  },
  {
    id: 10,
    slug: 'tony-hawk-skater',
    title: 'El skater y su tabla en el skatepark',
    gameTheme: 'Tony Hawk’s Pro Skater',
    icon: '🛹',
    level: 'basico',
    context:
      'En el skatepark el skater hace tricks sobre los rieles. La tabla tiene una vida útil: cada trick la desgasta, y cuando se rompe el skater deja de poder hacer piruetas.',
    task:
      'Crea la clase Tabla (modelo,color, desgaste) y la clase Skater (nombre, tabla, trucoActual). Implementa hacerTruco(nombreTruco) y deslizarse(). La tabla limita los trucos: pásala siempre como atributo del skater.',
    methodHints: [
      'Tabla.desgastarse(factor): suma desgaste según la dificultad del truco',
      'Tabla.estaRota(): true cuando el desgaste supera el 100 %',
      'Tabla.getModelo(): para mostrar qué tabla usa el skater',
      'Skater.hacerTruco(nombre): si la tabla no está rota, desgasta y sube el puntaje',
      'Skater.deslizarse(distancia): avanza y consume desgaste mínimo',
      'Skater.getTabla(): devuelve el objeto tabla para poder consultarlo desde afuera',
    ],
    mainClass: {
      name: 'Skater',
      attrs: ['- nombre: String', '- tabla: Tabla', '- puntaje: int', '- trucoActual: String', '- distancia: int'],
      methods: [
        '+ hacerTruco(nombreTruco: String, dificultad: int): void',
        '+ deslizarse(distancia: int): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Tabla',
        attrs: ['- modelo: String', '- color: String', '- desgaste: int', '- nivel: String'],
        methods: ['+ desgastarse(factor: int): void', '+ estaRota(): boolean', '+ getModelo(): String'],
      },
    ],
    relations: [{ from: 'Skater', to: 'Tabla', type: 'aggregation', label: 'usa 1' }],
    solutionCodeJava: `class Tabla {
    private String modelo;
    private String color;
    private int desgaste;
    private String nivel;

    public Tabla(String modelo, String color, String nivel) {
        this.modelo = modelo;
        this.color = color;
        this.nivel = nivel;
        this.desgaste = 0;
    }

    public void desgastarse(int factor) {
        this.desgaste += factor;
        if (this.desgaste > 100) {
            this.desgaste = 100;
            System.out.println("💔 La tabla " + modelo + " se rompió en dos.");
        }
    }

    public boolean estaRota() {
        return this.desgaste >= 100;
    }

    public String getModelo() {
        return modelo;
    }

    public int getDesgaste() {
        return desgaste;
    }
}

class Skater {
    private String nombre;
    private Tabla tabla;
    private int puntaje;
    private String trucoActual;
    private int distancia;

    public Skater(String nombre, Tabla tabla) {
        this.nombre = nombre;
        this.tabla = tabla;
        this.puntaje = 0;
        this.trucoActual = "ninguno";
        this.distancia = 0;
    }

    public void hacerTruco(String nombreTruco, int dificultad) {
        if (tabla.estaRota()) {
            System.out.println(nombre + " no puede hacer " + nombreTruco + ": la tabla está rota.");
            return;
        }
        this.trucoActual = nombreTruco;
        this.puntaje += dificultad * 100;
        tabla.desgastarse(dificultad * 8);
        System.out.println("🛹 " + nombre + " hizo " + nombreTruco + " (+" + (dificultad * 100) + ") con la tabla " + tabla.getModelo());
    }

    public void deslizarse(int distancia) {
        this.distancia += distancia;
        tabla.desgastarse(2);
    }

    public Tabla getTabla() {
        return tabla;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | truco: " + trucoActual + " | puntaje: " + puntaje + " | tabla " + tabla.getModelo() + " (" + tabla.getDesgaste() + "% desgaste)");
    }
}

public class Main {
    public static void main(String[] args) {
        Tabla tablaPatineta = new Tabla("Patineta Neón", "VERDE", "pro");
        Skater skater = new Skater("Tony", tablaPatineta);

        skater.deslizarse(50);
        skater.hacerTruco("Ollie", 2);
        skater.hacerTruco("Kickflip", 4);
        skater.hacerTruco("Grind en el riel", 6);
        skater.mostrarEstado();
        skater.hacerTruco("900", 9);
        skater.mostrarEstado();
    }
}`,
  },
  // ─────────────────────────────────────────────────────────────
  // NIVEL 2 · 3 clases (sin usar List) · IDs 11-15
  // ─────────────────────────────────────────────────────────────
  {
    id: 11,
    slug: 'kirby-poder-enemigo',
    title: 'Kirby copia el poder de su enemigo',
    gameTheme: 'Kirby (Nintendo)',
    icon: '🍑',
    level: 'intermedio',
    context:
      'Kirby no tiene poderes propios: cuando derrota a un enemigo copia su habilidad y la guarda como un poder. El poder copiado determina el daño que hace y se puede usar varias veces antes de perderlo.',
    task:
      'Crea las clases Poder (nombre, tipo, dano), Enemigo (nombre, tipo, vida, poderQueOtorga) y Kirby (nombre, vida, poderCopiado). SIN usar List: el poder copiado se guarda en un atributo simple. Implementa copiarPoder(enemigo) y usarPoder(objetivo).',
    methodHints: [
      'Poder.getDano(): el daño real depende del tipo (fuego, hielo, jet)',
      'Enemigo.otorgarPoder(): devuelve el poder que deja al ser derrotado',
      'Enemigo.recibirDanio(danio): descuenta vida y avisa si murió',
      'Kirby.copiarPoder(enemigo): pide el poder al enemigo y lo guarda como atributo',
      'Kirby.usarPoder(objetivo): usa el poder copiado contra un enemigo',
      'Kirby.tienePoder(): false cuando todavía no copió nada',
    ],
    mainClass: {
      name: 'Kirby',
      attrs: ['- nombre: String', '- vida: int', '- poderCopiado: Poder', '- poderesUsados: int'],
      methods: [
        '+ copiarPoder(enemigo: Enemigo): void',
        '+ usarPoder(objetivo: Enemigo): void',
        '+ tienePoder(): boolean',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Enemigo',
        attrs: ['- nombre: String', '- vida: int', '- poderQueOtorga: String', '- tipo: String'],
        methods: ['+ recibirDanio(danio: int): boolean', '+ otorgarPoder(): String'],
      },
      {
        name: 'Poder',
        attrs: ['- nombre: String', '- tipo: String', '- dano: int', '- usos: int'],
        methods: ['+ usar(): int', '+ estaAgotado(): boolean'],
      },
    ],
    relations: [
      { from: 'Kirby', to: 'Enemigo', type: 'aggregation', label: 'derrota a 1' },
      { from: 'Kirby', to: 'Poder', type: 'aggregation', label: 'copia 1' },
    ],
    solutionCodeJava: `class Poder {
    private String nombre;
    private String tipo;
    private int dano;
    private int usos;

    public Poder(String nombre, String tipo, int dano) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.dano = dano;
        this.usos = 0;
    }

    public int usar() {
        this.usos++;
        if (this.tipo.equals("FUEGO")) {
            return this.dano * 2;
        }
        return this.dano;
    }

    public boolean estaAgotado() {
        return this.usos >= 3;
    }

    public String getNombre() {
        return nombre;
    }
}

class Enemigo {
    private String nombre;
    private int vida;
    private String poderQueOtorga;
    private String tipo;

    public Enemigo(String nombre, String tipo, int vida, String poderQueOtorga) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.vida = vida;
        this.poderQueOtorga = poderQueOtorga;
    }

    public boolean recibirDanio(int danio) {
        this.vida -= danio;
        if (this.vida <= 0) {
            System.out.println("💫 Enemigo " + nombre + " derrotado.");
            return true;
        }
        return false;
    }

    public String otorgarPoder() {
        return this.poderQueOtorga;
    }

    public String getNombre() {
        return nombre;
    }

    public int getVida() {
        return vida;
    }
}

class Kirby {
    private String nombre;
    private int vida;
    private Poder poderCopiado;
    private int poderesUsados;

    public Kirby(String nombre, int vida) {
        this.nombre = nombre;
        this.vida = vida;
        this.poderCopiado = null;
        this.poderesUsados = 0;
    }

    public boolean tienePoder() {
        return this.poderCopiado != null && !this.poderCopiado.estaAgotado();
    }

    public void copiarPoder(Enemigo enemigo) {
        String nombrePoder = enemigo.otorgarPoder();
        this.poderCopiado = new Poder(nombrePoder, nombrePoder, 4);
        System.out.println("🍑 " + nombre + " copió el poder " + nombrePoder + " de " + enemigo.getNombre());
    }

    public void usarPoder(Enemigo objetivo) {
        if (!tienePoder()) {
            System.out.println(nombre + " todavía no tiene ningún poder copiado.");
            return;
        }
        int danio = this.poderCopiado.usar();
        this.poderesUsados++;
        System.out.println("💥 " + nombre + " usa " + this.poderCopiado.getNombre() + " y hace " + danio + " de daño");
        objetivo.recibirDanio(danio);
    }

    public void mostrarEstado() {
        String poder = this.poderCopiado == null ? "ninguno" : this.poderCopiado.getNombre();
        System.out.println(nombre + " | vida: " + vida + " | poder: " + poder + " | usos: " + poderesUsados);
    }
}

public class Main {
    public static void main(String[] args) {
        Kirby kirby = new Kirby("Kirby", 100);
        Enemigo waddle = new Enemigo("Waddle Dee", "MARTILLO", 6, "MARTILLO");

        kirby.mostrarEstado();
        kirby.copiarPoder(waddle);
        kirby.usarPoder(waddle);
        kirby.usarPoder(waddle);
        kirby.mostrarEstado();
    }
}`,
  },
  {
    id: 12,
    slug: 'metroid-samus-misil',
    title: 'Samus y su cañón de protones',
    gameTheme: 'Metroid (Nintendo)',
    icon: '🎮',
    level: 'intermedio',
    context:
      'Samus explora la nave y dispara con un cañón de protones. Cada misil sale de la mochila con un daño y un radio de explosión, y los Metroides se dividen en dos si uno de tamaño grande recibe un golpe fuerte.',
    task:
      'Crea las clases Misil (dano, radioExplosion), Metroide (tipo, vida, tamaño) y Samus (nombre, vida, municion). SIN List ni arrays: guarda un solo Misil como atributo. Implementa disparar(metroide) y Samus no puede disparar sin munición.',
    methodHints: [
      'Misil.explota(): devuelve el daño según el radio de explosión (radio grande = más daño)',
      'Metroide.recibirDanio(danio): si es de tamaño grande y recibe un crítico, se parte en dos',
      'Metroide.sePartio(): indica que el metroide se dividió',
      'Samus.disparar(metroide): usa el misil de la mochila, resta munición y aplica el daño',
      'Samus.tieneMunicion(): false cuando se quedó sin munición',
      'Samus.mostrarEstado(): vida, munición y estado del misil',
    ],
    mainClass: {
      name: 'Samus',
      attrs: ['- nombre: String', '- vida: int', '- municion: int', '- misilActual: Misil', '- metroidesDerrotados: int'],
      methods: [
        '+ disparar(metroide: Metroide): void',
        '+ tieneMunicion(): boolean',
        '+ recogerMisil(misil: Misil): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Misil',
        attrs: ['- dano: int', '- radioExplosion: int', '- usado: boolean'],
        methods: ['+ explota(): int', '+ getDano(): int', '+ estaUsado(): boolean'],
      },
      {
        name: 'Metroide',
        attrs: ['- tipo: String', '- vida: int', '- tamano: String', '- sePartio: boolean'],
        methods: ['+ recibirDanio(danio: int): boolean', '+ sePartio(): boolean'],
      },
    ],
    relations: [
      { from: 'Samus', to: 'Misil', type: 'composition', label: 'carga 1' },
      { from: 'Samus', to: 'Metroide', type: 'aggregation', label: 'dispara a 1' },
    ],
    solutionCodeJava: `class Misil {
    private int dano;
    private int radioExplosion;
    private boolean usado;

    public Misil(int dano, int radioExplosion) {
        this.dano = dano;
        this.radioExplosion = radioExplosion;
        this.usado = false;
    }

    public int explota() {
        this.usado = true;
        return this.dano + (this.radioExplosion * 2);
    }

    public int getDano() {
        return dano;
    }

    public boolean estaUsado() {
        return usado;
    }
}

class Metroide {
    private String tipo;
    private int vida;
    private String tamano;
    private boolean partido;

    public Metroide(String tipo, int vida, String tamano) {
        this.tipo = tipo;
        this.vida = vida;
        this.tamano = tamano;
        this.partido = false;
    }

    public boolean recibirDanio(int danio) {
        this.vida -= danio;
        if (this.vida <= 0) {
            System.out.println("☠️ Metroide " + tipo + " destruido (" + tamano + ")");
            return true;
        }
        if (this.tamano.equals("GRANDE") && danio > 10) {
            this.partido = true;
            System.out.println("🧬 El Metroide " + tipo + " se ha partido en dos!");
        }
        return false;
    }

    public boolean sePartio() {
        return this.partido;
    }

    public int getVida() {
        return vida;
    }
}

class Samus {
    private String nombre;
    private int vida;
    private int municion;
    private Misil misilActual;
    private int metroidesDerrotados;

    public Samus(String nombre, int vida, int municion, Misil misil) {
        this.nombre = nombre;
        this.vida = vida;
        this.municion = municion;
        this.misilActual = misil;
        this.metroidesDerrotados = 0;
    }

    public boolean tieneMunicion() {
        return this.municion > 0 && this.misilActual != null;
    }

    public void recogerMisil(Misil misil) {
        this.misilActual = misil;
        this.municion += 5;
        System.out.println("🧨 " + nombre + " recogió un misil nuevo (daño " + misil.getDano() + ")");
    }

    public void disparar(Metroide metroide) {
        if (!tieneMunicion()) {
            System.out.println("🔫 " + nombre + " no tiene munición disponible.");
            return;
        }
        int danio = this.misilActual.explota();
        this.municion--;
        System.out.println("💥 " + nombre + " dispara un misil de daño " + danio);
        if (metroide.recibirDanio(danio)) {
            this.metroidesDerrotados++;
        }
        this.misilActual = new Misil(4, 1);
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | vida: " + vida + " | munición: " + municion + " | metroides derrotados: " + metroidesDerrotados);
    }
}

public class Main {
    public static void main(String[] args) {
        Misil misilInicial = new Misil(8, 3);
        Samus samus = new Samus("Samus", 99, 2, misilInicial);
        Metroide metroideGrande = new Metroide("Zeta", 30, "GRANDE");
        Metroide metroidePequeno = new Metroide("Rinka", 12, "PEQUEÑO");

        samus.mostrarEstado();
        samus.disparar(metroideGrande);
        samus.disparar(metroideGrande);
        samus.disparar(metroidePequeno);
        samus.recogerMisil(new Misil(15, 4));
        samus.disparar(metroidePequeno);
        samus.mostrarEstado();
    }
}`,
  },
  {
    id: 13,
    slug: 'plants-vs-zombies-jardinero',
    title: 'El jardinero y sus plantas contra los zombis',
    gameTheme: 'Plants vs. Zombies',
    icon: '🌻',
    level: 'intermedio',
    context:
      'El jugador planta defensas y cada planta tiene un coste, una vida y una cadencia de disparo. Los zombis avanzan por el jardín y, si llegan a la casa, el jardinero pierde. Aquí solo hay una planta activa y un zombi: es association simple sin colecciones.',
    task:
      'Crea las clases Planta (tipo, vida, coste, dano), Zombi (nombre, vida, velocidad) y Jardinero (nombre, monedas, plantaActiva). SIN usar List: la planta activa y el zombi se guardan en atributos simples. Implementa plantar(), disparar(zombi) y defender().',
    methodHints: [
      'Planta.disparar(): devuelve el daño y avisa si la planta se queda sin recargas',
      'Planta.recibirDanio(danio): la planta pierde vida y puede morir',
      'Zombi.avanzar(): suma la velocidad a su posición de carril',
      'Zombi.recibirDanio(danio): descuenta vida (el chador zombi aguanta más)',
      'Jardinero.plantar(planta): paga el coste con las monedas disponibles',
      'Jardinero.disparar(zombi): delega en la planta activa y muestra el resultado',
    ],
    mainClass: {
      name: 'Jardinero',
      attrs: ['- nombre: String', '- monedas: int', '- plantaActiva: Planta', '- zombisDerrotados: int'],
      methods: [
        '+ plantar(planta: Planta): boolean',
        '+ disparar(zombi: Zombi): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Planta',
        attrs: ['- tipo: String', '- vida: int', '- coste: int', '- dano: int', '- recarga: int'],
        methods: ['+ disparar(): int', '+ recibirDanio(danio: int): boolean', '+ estaViva(): boolean'],
      },
      {
        name: 'Zombi',
        attrs: ['- nombre: String', '- vida: int', '- velocidad: int', '- posX: int', '- tipo: String'],
        methods: ['+ avanzar(): void', '+ recibirDanio(danio: int): boolean', '+ llegoAlFinal(): boolean'],
      },
    ],
    relations: [
      { from: 'Jardinero', to: 'Planta', type: 'composition', label: 'siembra 1' },
      { from: 'Jardinero', to: 'Zombi', type: 'aggregation', label: 'frena 1' },
    ],
    solutionCodeJava: `class Planta {
    private String tipo;
    private int vida;
    private int coste;
    private int dano;
    private int recarga;

    public Planta(String tipo, int vida, int coste, int dano) {
        this.tipo = tipo;
        this.vida = vida;
        this.coste = coste;
        this.dano = dano;
        this.recarga = 2;
    }

    public int disparar() {
        if (this.recarga <= 0) {
            return 0;
        }
        this.recarga--;
        return this.dano;
    }

    public boolean recibirDanio(int danio) {
        this.vida -= danio;
        return this.vida <= 0;
    }

    public boolean estaViva() {
        return this.vida > 0;
    }

    public String getTipo() {
        return tipo;
    }

    public int getCoste() {
        return coste;
    }
}

class Zombi {
    private String nombre;
    private int vida;
    private int velocidad;
    private int posX;
    private String tipo;

    public Zombi(String nombre, String tipo, int vida, int velocidad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.vida = vida;
        this.velocidad = velocidad;
        this.posX = 0;
    }

    public void avanzar() {
        this.posX += this.velocidad;
    }

    public boolean recibirDanio(int danio) {
        int danoEfectivo = this.tipo.equals("CHADOR") ? danio / 2 : danio;
        this.vida -= danoEfectivo;
        if (this.vida <= 0) {
            System.out.println("🧟 " + nombre + " fue derrotado");
            return true;
        }
        return false;
    }

    public boolean llegoAlFinal() {
        return this.posX >= 50;
    }

    public String getNombre() {
        return nombre;
    }
}

class Jardinero {
    private String nombre;
    private int monedas;
    private Planta plantaActiva;
    private int zombisDerrotados;

    public Jardinero(String nombre, int monedas) {
        this.nombre = nombre;
        this.monedas = monedas;
        this.plantaActiva = null;
        this.zombisDerrotados = 0;
    }

    public boolean plantar(Planta planta) {
        if (this.monedas < planta.getCoste()) {
            System.out.println("🪙 No hay monedas suficientes para plantar " + planta.getTipo());
            return false;
        }
        this.monedas -= planta.getCoste();
        this.plantaActiva = planta;
        System.out.println("🌱 " + nombre + " plantó " + planta.getTipo() + " (-" + planta.getCoste() + " monedas)");
        return true;
    }

    public void disparar(Zombi zombi) {
        if (this.plantaActiva == null || !this.plantaActiva.estaViva()) {
            System.out.println("No hay ninguna planta activa que dispare.");
            return;
        }
        int danio = this.plantaActiva.disparar();
        if (danio == 0) {
            System.out.println("La planta está recargando...");
            return;
        }
        System.out.println("🌻 " + this.plantaActiva.getTipo() + " dispara a " + zombi.getNombre());
        if (zombi.recibirDanio(danio)) {
            this.zombisDerrotados++;
        }
    }

    public void mostrarEstado() {
        String planta = this.plantaActiva == null ? "ninguna" : this.plantaActiva.getTipo();
        System.out.println(nombre + " | monedas: " + monedas + " | planta: " + planta + " | zombis derrotados: " + zombisDerrotados);
    }
}

public class Main {
    public static void main(String[] args) {
        Jardinero jardinero = new Jardinero("Crisp", 75);
        Zombi zombiNormal = new Zombi("Zombi básico", "NORMAL", 20, 5);
        Zombi zombiChador = new Zombi("Zombi con cono", "CHADOR", 40, 3);

        jardinero.plantar(new Planta("Girasol", 30, 50, 6));
        jardinero.disparar(zombiNormal);
        jardinero.disparar(zombiNormal);
        zombiNormal.avanzar();
        zombiChador.avanzar();
        jardinero.disparar(zombiChador);
        jardinero.mostrarEstado();
    }
}`,
  },
  {
    id: 14,
    slug: 'clash-of-clans-aldeano',
    title: 'El aldeano, su cuartel y los muros',
    gameTheme: 'Clash of Clans',
    icon: '🏰',
    level: 'intermedio',
    context:
      'En Clash of Clans el aldeano sube de nivel, improve su cuartel y coloca muros alrededor del pueblo. Cada muro tiene vida y tipo: si un muro cae, los enemigos entran más rápido. Aquí hay un solo aldeano, un cuartel y un muro activo.',
    task:
      'Crea las clases Muro (tipo, vida), Cuartel (nivel, capacidadTropas, tropasFormadas) y Aldeano (nombre, nivel, oro, cuartel). SIN List ni arrays: cada Relationship se resuelve con un atributo. Implementa mejorar(), invocarTropas() y colocarMuro().',
    methodHints: [
      'Muro.recibirDanio(danio): baja la vida del muro y avisa si cayó',
      'Muro.estaEnPie(): true mientras tenga vida',
      'Cuartel.mejorar(nivel): sube el nivel y devuelve la nueva capacidad de tropas',
      'Cuartel.puedeInvocar(): true si quedan plazas libres de tropa',
      'Aldeano.invocarTropas(nombreTropa): pide una tropa al cuartel y gasta oro',
      'Aldeano.colocarMuro(muro): asocia el muro al pueblo y repara el anterior',
    ],
    mainClass: {
      name: 'Aldeano',
      attrs: ['- nombre: String', '- nivel: int', '- oro: int', '- cuartel: Cuartel', '- muroPrincipal: Muro', '- poblacion: int'],
      methods: [
        '+ mejorarCuartel(): void',
        '+ invocarTropas(nombreTropa: String): void',
        '+ colocarMuro(muro: Muro): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Cuartel',
        attrs: ['- nivel: int', '- capacidadTropas: int', '- tropasFormadas: int'],
        methods: ['+ mejorar(): void', '+ invocarTropa(nombre: String): void', '+ getCapacidadTropas(): int'],
      },
      {
        name: 'Muro',
        attrs: ['- tipo: String', '- vida: int', '- nivel: int'],
        methods: ['+ recibirDanio(danio: int): boolean', '+ estaEnPie(): boolean', '+ getTipo(): String'],
      },
    ],
    relations: [
      { from: 'Aldeano', to: 'Cuartel', type: 'composition', label: 'posee 1' },
      { from: 'Aldeano', to: 'Muro', type: 'aggregation', label: 'protege con 1' },
    ],
    solutionCodeJava: `class Muro {
    private String tipo;
    private int vida;
    private int nivel;

    public Muro(String tipo, int vida, int nivel) {
        this.tipo = tipo;
        this.vida = vida;
        this.nivel = nivel;
    }

    public boolean recibirDanio(int danio) {
        this.vida -= danio;
        if (this.vida <= 0) {
            this.vida = 0;
            System.out.println("🧱 El muro de " + tipo + " ha caído.");
            return false;
        }
        return true;
    }

    public boolean estaEnPie() {
        return this.vida > 0;
    }

    public String getTipo() {
        return tipo;
    }

    public int getVida() {
        return vida;
    }
}

class Cuartel {
    private int nivel;
    private int capacidadTropas;
    private int tropasFormadas;

    public Cuartel(int nivel) {
        this.nivel = nivel;
        this.capacidadTropas = nivel * 5;
        this.tropasFormadas = 0;
    }

    public void mejorar() {
        this.nivel++;
        this.capacidadTropas = this.nivel * 5;
        System.out.println("🏰 Cuartel mejorado a nivel " + this.nivel + " (capacidad " + this.capacidadTropas + ")");
    }

    public boolean puedeInvocar() {
        return this.tropasFormadas < this.capacidadTropas;
    }

    public void invocarTropa(String nombre) {
        if (puedeInvocar()) {
            this.tropasFormadas++;
            System.out.println("⚔️ Se invocó " + nombre + " en el cuartel");
        } else {
            System.out.println("El cuartel está al máximo de tropas (" + this.tropasFormadas + "/" + this.capacidadTropas + ")");
        }
    }

    public int getCapacidadTropas() {
        return capacidadTropas;
    }
}

class Aldeano {
    private String nombre;
    private int nivel;
    private int oro;
    private Cuartel cuartel;
    private Muro muroPrincipal;
    private int poblacion;

    public Aldeano(String nombre, int nivel, int oro, Cuartel cuartel) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.oro = oro;
        this.cuartel = cuartel;
        this.muroPrincipal = null;
        this.poblacion = 0;
    }

    public void mejorarCuartel() {
        this.oro -= 500;
        this.cuartel.mejorar();
        System.out.println("💰 " + nombre + " gastó 500 de oro (quedan " + this.oro + ")");
    }

    public void invocarTropas(String nombreTropa) {
        this.cuartel.invocarTropa(nombreTropa);
        this.oro -= 50;
        this.poblacion += 2;
    }

    public void colocarMuro(Muro muro) {
        this.muroPrincipal = muro;
        System.out.println("🧱 " + nombre + " colocó un muro de " + muro.getTipo() + " con " + muro.getVida() + " de vida");
    }

    public void mostrarEstado() {
        String muro = this.muroPrincipal == null ? "sin muros" : this.muroPrincipal.getTipo() + " (" + this.muroPrincipal.getVida() + " HP)";
        System.out.println(nombre + " | nivel: " + nivel + " | oro: " + oro + " | población: " + poblacion + " | muro: " + muro);
    }
}

public class Main {
    public static void main(String[] args) {
        Cuartel cuartelInicial = new Cuartel(3);
        Aldeano aldeano = new Aldeano("Chief", 4, 1000, cuartelInicial);

        aldeano.mostrarEstado();
        aldeano.colocarMuro(new Muro("Piedra", 300, 2));
        aldeano.invocarTropas("Duendes");
        aldeano.mejorarCuartel();
        aldeano.invocarTropas("Gólems");
        aldeano.mostrarEstado();
    }
}`,
  },
  {
    id: 15,
    slug: 'candy-crush-partida',
    title: 'La partida de Candy Crush: ficha y azúcaritas',
    gameTheme: 'Candy Crush Saga',
    icon: '🍬',
    level: 'intermedio',
    context:
      'En Candy Crush mueves fichas de colores en la pantalla. Al formar una línea de tres o más fichas del mismo color se forma una "azucarita" que desaparece y suma puntos. Aquí modelamos una sola ficha activa y una sola azucarita por combo.',
    task:
      'Crea las clases Ficha (color, fila, columna), Azucarita (tipo, puntos) y Partida (jugador, movimientos, fichaSeleccionada). SIN List ni arrays: la ficha seleccionada se guarda en un atributo. Implementa seleccionar(), mover(), formarCombo() y jugadasRestantes().',
    methodHints: [
      'Ficha.mover(fila, columna): cambia la posición de la ficha',
      'Ficha.mismoColor(otra): compara el color con otra ficha',
      'Azucarita.generar(color, cantidad): crea una azucarita con los puntos de la combinación',
      'Partida.seleccionar(ficha): guarda la ficha activa (atributo, no lista)',
      'Partida.mover(ficha, fila, columna): mueve la ficha y consume un movimiento',
      'Partida.formarCombo(cantidad): si hay 3 o más del mismo color, genera la azucarita y suma puntos',
    ],
    mainClass: {
      name: 'Partida',
      attrs: ['- jugador: String', '- movimientos: int', '- puntos: int', '- fichaSeleccionada: Ficha', '- azucaritaCreada: Azucarita'],
      methods: [
        '+ seleccionar(ficha: Ficha): void',
        '+ mover(ficha: Ficha, fila: int, columna: int): boolean',
        '+ formarCombo(cantidad: int): void',
        '+ jugadasRestantes(): int',
      ],
    },
    associatedClasses: [
      {
        name: 'Ficha',
        attrs: ['- color: String', '- fila: int', '- columna: int', '- tipo: String'],
        methods: ['+ mover(fila: int, columna: int): void', '+ mismoColor(otra: Ficha): boolean'],
      },
      {
        name: 'Azucarita',
        attrs: ['- tipo: String', '- puntos: int', '- colorOrigen: String'],
        methods: ['+ generar(color: String, cantidad: int): void', '+ getPuntos(): int'],
      },
    ],
    relations: [
      { from: 'Partida', to: 'Ficha', type: 'composition', label: 'juega 1 activa' },
      { from: 'Partida', to: 'Azucarita', type: 'aggregation', label: 'forma 1' },
    ],
    solutionCodeJava: `class Ficha {
    private String color;
    private int fila;
    private int columna;
    private String tipo;

    public Ficha(String color, String tipo, int fila, int columna) {
        this.color = color;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }

    public void mover(int fila, int columna) {
        this.fila = fila;
        this.columna = columna;
    }

    public boolean mismoColor(Ficha otra) {
        return this.color.equals(otra.getColor());
    }

    public String getColor() {
        return color;
    }

    public String getPosicion() {
        return tipo + " " + color + " en (" + fila + "," + columna + ")";
    }
}

class Azucarita {
    private String tipo;
    private int puntos;
    private String colorOrigen;

    public Azucarita(String tipo) {
        this.tipo = tipo;
        this.puntos = 0;
        this.colorOrigen = "";
    }

    public void generar(String color, int cantidad) {
        this.colorOrigen = color;
        this.puntos = cantidad * cantidad * 10;
        System.out.println("🍬 Azucarita " + tipo + " de color " + color + " (+" + this.puntos + " puntos)");
    }

    public int getPuntos() {
        return puntos;
    }
}

class Partida {
    private String jugador;
    private int movimientos;
    private int puntos;
    private Ficha fichaSeleccionada;
    private Azucarita azucaritaCreada;

    public Partida(String jugador, int movimientos) {
        this.jugador = jugador;
        this.movimientos = movimientos;
        this.puntos = 0;
        this.fichaSeleccionada = null;
        this.azucaritaCreada = new Azucarita("Normal");
    }

    public void seleccionar(Ficha ficha) {
        this.fichaSeleccionada = ficha;
        System.out.println("👆 " + jugador + " seleccionó " + ficha.getPosicion());
    }

    public boolean mover(Ficha ficha, int fila, int columna) {
        if (this.fichaSeleccionada == null) {
            System.out.println("Primero selecciona una ficha.");
            return false;
        }
        ficha.mover(fila, columna);
        this.movimientos--;
        System.out.println("🍭 " + ficha.getPosicion() + " | jugadas restantes: " + this.movimientos);
        return true;
    }

    public void formarCombo(int cantidad) {
        if (cantidad >= 3 && this.fichaSeleccionada != null) {
            this.azucaritaCreada.generar(this.fichaSeleccionada.getColor(), cantidad);
            this.puntos += this.azucaritaCreada.getPuntos();
        } else {
            System.out.println("No hay combo: se necesitan 3 fichas del mismo color.");
        }
    }

    public int jugadasRestantes() {
        return this.movimientos;
    }

    public void mostrarEstado() {
        System.out.println(jugador + " | jugadas: " + movimientos + " | puntos: " + puntos);
    }
}

public class Main {
    public static void main(String[] args) {
        Partida partida = new Partida("Ana", 5);
        Ficha roja = new Ficha("ROJO", "Gomita", 2, 1);
        Ficha roja2 = new Ficha("ROJO", "Gomita", 2, 2);
        Ficha azul = new Ficha("AZUL", "Caramelo", 1, 3);

        partida.seleccionar(roja);
        partida.mover(roja, 2, 2);
        partida.formarCombo(roja.mismoColor(roja2) ? 3 : 1);
        partida.seleccionar(azul);
        partida.mover(azul, 3, 3);
        partida.formarCombo(1);
        partida.mostrarEstado();
    }
}`,
  },
  // ─────────────────────────────────────────────────────────────
  // NIVEL 3 · 4 clases · IDs 16-20
  // ─────────────────────────────────────────────────────────────
  {
    id: 16,
    slug: 'cs2-agente-arma-bala-bomba',
    title: 'Agente, arma, bala y bomba en una ronda',
    gameTheme: 'Counter-Strike 2',
    icon: '🎯',
    level: 'avanzado',
    context:
      'Una ronda de shooter táctico une cuatro piezas: el agente que juega, el arma que usa, la bala que dispara y la bomba que hay que plantar o defender. El arma decide cuántas balas quedan en el cargador y la bala decide el daño.',
    task:
      'Crea las cuatro clases: Bala (dano, velocidad), Arma (nombre, cargador, precision), Bomba (tiempo, plantada) y Agente (nombre, rol, vida). Encadena la asociación completa: el agente tiene un arma, el arma crea la bala y el agente puede plantar una bomba.',
    methodHints: [
      'Bala.recorrer(distancia): suma el alcance y devuelve true si sale del mapa',
      'Arma.disparar(): descuenta una bala del cargador y devuelve una Bala nueva',
      'Arma.estaVacia(): true cuando se acabó el cargador',
      'Bomba.plantar(): arranca la cuenta regresiva',
      'Bomba.explota(): true si el tiempo llegó a cero',
      'Agente.disparar(objetivo): pide el disparo al arma, mueve la bala y aplica el daño',
      'Agente.plantarBomba(bomba): delega en la bomba y avisa si la ronda se gana',
    ],
    mainClass: {
      name: 'Agente',
      attrs: ['- nombre: String', '- rol: String', '- vida: int', '- arma: Arma', '- baja: int', '- bomba: Bomba'],
      methods: [
        '+ disparar(objetivo: Agente): void',
        '+ plantarBomba(posicion: String): void',
        '+ estaVivo(): boolean',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Arma',
        attrs: ['- nombre: String', '- dano: int', '- cargador: int', '- precision: int'],
        methods: ['+ disparar(): Bala', '+ estaVacia(): boolean', '+ recargar(): void'],
      },
      {
        name: 'Bala',
        attrs: ['- dano: int', '- velocidad: int', '- alcance: int'],
        methods: ['+ recorrer(distancia: int): boolean', '+ impacto(): int'],
      },
      {
        name: 'Bomba',
        attrs: ['- tiempo: int', '- plantada: boolean', '- posicion: String'],
        methods: ['+ plantar(posicion: String): void', '+ pasarTiempo(): void', '+ explota(): boolean'],
      },
    ],
    relations: [
      { from: 'Agente', to: 'Arma', type: 'composition', label: 'usa 1' },
      { from: 'Arma', to: 'Bala', type: 'composition', label: 'crea 1' },
      { from: 'Agente', to: 'Bomba', type: 'aggregation', label: 'planta 1' },
    ],
    solutionCodeJava: `class Bala {
    private int dano;
    private int velocidad;
    private int alcance;

    public Bala(int dano, int velocidad) {
        this.dano = dano;
        this.velocidad = velocidad;
        this.alcance = 0;
    }

    public boolean recorrer(int distancia) {
        this.alcance += distancia;
        return this.alcance > 120;
    }

    public int impacto() {
        return this.dano;
    }
}

class Arma {
    private String nombre;
    private int dano;
    private int cargador;
    private int precision;

    public Arma(String nombre, int dano, int cargador, int precision) {
        this.nombre = nombre;
        this.dano = dano;
        this.cargador = cargador;
        this.precision = precision;
    }

    public boolean estaVacia() {
        return this.cargador <= 0;
    }

    public Bala disparar() {
        this.cargador--;
        return new Bala(this.dano, this.precision);
    }

    public void recargar() {
        this.cargador = 30;
        System.out.println("🔄 " + nombre + " recargada");
    }

    public String getNombre() {
        return nombre;
    }
}

class Bomba {
    private int tiempo;
    private boolean plantada;
    private String posicion;

    public Bomba(int tiempo) {
        this.tiempo = tiempo;
        this.plantada = false;
        this.posicion = "A";
    }

    public void plantar(String posicion) {
        this.plantada = true;
        this.posicion = posicion;
        System.out.println("💣 Bomba plantada en " + posicion + " con " + this.tiempo + " s");
    }

    public void pasarTiempo() {
        if (plantada && this.tiempo > 0) {
            this.tiempo--;
        }
    }

    public boolean explota() {
        return plantada && this.tiempo == 0;
    }
}

class Agente {
    private String nombre;
    private String rol;
    private int vida;
    private Arma arma;
    private int baja;
    private Bomba bomba;

    public Agente(String nombre, String rol, int vida, Arma arma) {
        this.nombre = nombre;
        this.rol = rol;
        this.vida = vida;
        this.arma = arma;
        this.baja = 0;
        this.bomba = new Bomba(5);
    }

    public void disparar(Agente objetivo) {
        if (arma.estaVacia()) {
            System.out.println(nombre + " no tiene balas en el cargador.");
            arma.recargar();
            return;
        }
        Bala bala = arma.disparar();
        bala.recorrer(60);
        int dano = bala.impacto();
        objetivo.vida -= dano;
        System.out.println("🎯 " + nombre + " dispara al " + objetivo.nombre + " y le quita " + dano + " de vida (" + objetivo.vida + " restante)");
        if (objetivo.vida <= 0) {
            this.baja++;
        }
    }

    public void plantarBomba(String posicion) {
        bomba.plantar(posicion);
    }

    public boolean estaVivo() {
        return this.vida > 0;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " [" + rol + "] | vida: " + vida + " | arma: " + arma.getNombre() + " | bajas: " + baja);
    }
}

public class Main {
    public static void main(String[] args) {
        Arma ak47 = new Arma("AK-47", 25, 2, 4);
        Arma awp = new Arma("AWP", 90, 1, 2);

        Agente terrorist = new Agente("Agente Alfa", "Terrorista", 100, ak47);
        Agente ct = new Agente("Agente Bravo", "Antiterrorista", 100, awp);

        terrorist.mostrarEstado();
        terrorist.disparar(ct);
        ct.disparar(terrorist);
        ct.mostrarEstado();
        terrorist.plantarBomba("B");
        terrorist.disparar(ct);
        terrorist.mostrarEstado();
    }
}`,
  },
  {
    id: 17,
    slug: 'stardew-granjero',
    title: 'La granja de Stardew Valley',
    gameTheme: 'Stardew Valley',
    icon: '🌾',
    level: 'avanzado',
    context:
      'En Stardew Valley el granjero cultiva, cuida las gallinas y vende su cosecha en el mercado de Pierre. Cada cosecha tarda días en crecer y el mercado paga un precio distinto según el producto y la calidad.',
    task:
      'Crea Cultivo (tipo, diasParaCosechar, precioBase), Gallina (nombre, huevosPorDia), Mercado (nombre, multiplicador) y Granjero (nombre, energia, oro). Encadena la asociación: el granjero riega un cultivo, recoge la gallina y lleva la cosecha al mercado.',
    methodHints: [
      'Cultivo.regar(): suma un día de crecimiento y avisa si ya está listo',
      'Cultivo.estaListo(): true cuando pasaron los días de crecimiento',
      'Cultivo.cosechar(): devuelve el cultivo cosechado y lo deja listo para replantar',
      'Gallina.recolectarHuevos(): suma huevos y consume comida',
      'Mercado.vender(cultivo): multiplica el precio base del cultivo y devuelve el dinero',
      'Granjero.cosechar(cultivo): pide la cosecha al cultivo y la lleva al mercado',
    ],
    mainClass: {
      name: 'Granjero',
      attrs: ['- nombre: String', '- energia: int', '- oro: int', '- huevos: int', '- nivelAgricola: int', '- mercado: Mercado'],
      methods: [
        '+ regar(cultivo: Cultivo): void',
        '+ cosechar(cultivo: Cultivo): void',
        '+ cuidarGallina(gallina: Gallina): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Cultivo',
        attrs: ['- tipo: String', '- diasCrecimiento: int', '- diasRegados: int', '- precioBase: int', '- listo: boolean'],
        methods: ['+ regar(): void', '+ estaListo(): boolean', '+ cosechar(): String'],
      },
      {
        name: 'Gallina',
        attrs: ['- nombre: String', '- huevosPorDia: int', '- alimentada: boolean'],
        methods: ['+ alimentar(): void', '+ recolectarHuevos(): int'],
      },
      {
        name: 'Mercado',
        attrs: ['- nombre: String', '- multiplicador: double', '- ventas: int'],
        methods: ['+ vender(cultivo: String, precioBase: int): int', '+ getNombre(): String'],
      },
    ],
    relations: [
      { from: 'Granjero', to: 'Cultivo', type: 'aggregation', label: 'siembra 1' },
      { from: 'Granjero', to: 'Gallina', type: 'aggregation', label: 'cuida 1' },
      { from: 'Granjero', to: 'Mercado', type: 'composition', label: 'vende en 1' },
    ],
    solutionCodeJava: `class Cultivo {
    private String tipo;
    private int diasCrecimiento;
    private int diasRegados;
    private int precioBase;
    private boolean listo;

    public Cultivo(String tipo, int diasCrecimiento, int precioBase) {
        this.tipo = tipo;
        this.diasCrecimiento = diasCrecimiento;
        this.diasRegados = 0;
        this.precioBase = precioBase;
        this.listo = false;
    }

    public void regar() {
        if (this.listo) {
            System.out.println("El cultivo de " + tipo + " ya está listo para cosechar.");
            return;
        }
        this.diasRegados++;
        if (this.diasRegados >= this.diasCrecimiento) {
            this.listo = true;
            System.out.println("🌾 " + tipo + " ¡listo para cosechar!");
        }
    }

    public boolean estaListo() {
        return listo;
    }

    public String cosechar() {
        if (!listo) {
            return "";
        }
        this.listo = false;
        this.diasRegados = 0;
        return this.tipo;
    }

    public int getPrecioBase() {
        return precioBase;
    }
}

class Gallina {
    private String nombre;
    private int huevosPorDia;
    private boolean alimentada;

    public Gallina(String nombre, int huevosPorDia) {
        this.nombre = nombre;
        this.huevosPorDia = huevosPorDia;
        this.alimentada = false;
    }

    public void alimentar() {
        this.alimentada = true;
        System.out.println("🌽 Se alimentó a " + this.nombre);
    }

    public int recolectarHuevos() {
        if (!alimentada) {
            System.out.println(this.nombre + " no está alimentada: no da huevos.");
            return 0;
        }
        this.alimentada = false;
        return this.huevosPorDia;
    }

    public String getNombre() {
        return nombre;
    }
}

class Mercado {
    private String nombre;
    private double multiplicador;
    private int ventas;

    public Mercado(String nombre, double multiplicador) {
        this.nombre = nombre;
        this.multiplicador = multiplicador;
        this.ventas = 0;
    }

    public int vender(String producto, int precioBase) {
        this.ventas++;
        int total = (int) (precioBase * this.multiplicador);
        System.out.println("💰 " + nombre + " pagó " + total + " por " + producto);
        return total;
    }

    public String getNombre() {
        return nombre;
    }

    public int getVentas() {
        return ventas;
    }
}

class Granjero {
    private String nombre;
    private int energia;
    private int oro;
    private int huevos;
    private int nivelAgricola;
    private Mercado mercado;

    public Granjero(String nombre, int oro, Mercado mercado) {
        this.nombre = nombre;
        this.oro = oro;
        this.mercado = mercado;
        this.energia = 100;
        this.huevos = 0;
        this.nivelAgricola = 1;
    }

    public void regar(Cultivo cultivo) {
        if (energia < 5) {
            System.out.println("😴 " + nombre + " está muy cansado para regar.");
            return;
        }
        energia -= 5;
        cultivo.regar();
    }

    public void cosechar(Cultivo cultivo) {
        String producto = cultivo.cosechar();
        if (producto.isEmpty()) {
            System.out.println("El cultivo de " + "todavía no está listo.");
            return;
        }
        this.oro += this.mercado.vender(producto, cultivo.getPrecioBase() * this.nivelAgricola);
    }

    public void cuidarGallina(Gallina gallina) {
        gallina.alimentar();
        int huevos = gallina.recolectarHuevos();
        this.huevos += huevos;
        System.out.println("🥚 " + gallina.getNombre() + " dejó " + huevos + " huevos");
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | energía: " + energia + " | oro: " + oro + " | huevos: " + huevos + " | mercado: " + mercado.getNombre());
    }
}

public class Main {
    public static void main(String[] args) {
        Mercado pierre = new Mercado("Tienda de Pierre", 1.25);
        Granjero granjero = new Granjero("Avery", 500, pierre);

        Cultivo papa = new Cultivo("Papa", 3, 40);
        Cultivo girasol = new Cultivo("Girasol", 2, 25);
        Gallina gallina = new Gallina("Gallina Clara", 1);

        granjero.mostrarEstado();
        granjero.regar(papa);
        granjero.regar(papa);
        granjero.cosechar(papa);
        granjero.cuidarGallina(gallina);
        granjero.cosechar(girasol);
        granjero.mostrarEstado();
    }
}`,
  },
  {
    id: 18,
    slug: 'the-sims-hogar',
    title: 'La vida de un Sim en su casa',
    gameTheme: 'The Sims',
    icon: '🏡',
    level: 'avanzado',
    context:
      'En The Sims cada personaje vive en una casa, usa muebles para cubrir necesidades y tiene una mascota que también necesita atención. Las necesidades bajan con el tiempo y se recuperan usando el mueble adecuado.',
    task:
      'Crea Mueble (nombre, tipo, confort), Mascota (nombre, hambre, felicidad), Casa (direccion, dimensiones) y Sim (nombre, energia, higiene). Encadena la asociación completa: el Sim usa los muebles de su casa y cuida a su mascota.',
    methodHints: [
      'Mueble.usar(): sube la necesidad que cubre y gasta duración',
      'Casa.buscarMueble(tipo): devuelve el mueble que coincide con la necesidad',
      'Casa.agregarMueble(mueble): coloca el mueble dentro de la casa',
      'Mascota.comer(alimento): baja el hambre de la mascota',
      'Mascota.jugar(): sube la felicidad de la mascota',
      'Sim.usarMueble(mueble): delega en el mueble y recupera energía o higiene',
      'Sim.cuidarMascota(mascota): alimentar y jugar con la mascota de la casa',
    ],
    mainClass: {
      name: 'Sim',
      attrs: ['- nombre: String', '- energia: int', '- higiene: int', '- dinero: int', '- casa: Casa', '- mascota: Mascota'],
      methods: [
        '+ usarMueble(mueble: Mueble): void',
        '+ comprarMueble(mueble: Mueble): void',
        '+ cuidarMascota(): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Mueble',
        attrs: ['- nombre: String', '- tipo: String', '- confort: int', '- precio: int', '- durabilidad: int'],
        methods: ['+ usar(): int', '+ estaRoto(): boolean', '+ getTipo(): String'],
      },
      {
        name: 'Casa',
        attrs: ['- direccion: String', '- dimensiones: int', '- contadorMuebles: int'],
        methods: ['+ agregarMueble(mueble: Mueble): void', '+ getMuebles(): int'],
      },
      {
        name: 'Mascota',
        attrs: ['- nombre: String', '- hambre: int', '- felicidad: int', '- especie: String'],
        methods: ['+ comer(alimento: String): void', '+ jugar(): void'],
      },
    ],
    relations: [
      { from: 'Sim', to: 'Casa', type: 'composition', label: 'vive en 1' },
      { from: 'Casa', to: 'Mueble', type: 'composition', label: 'contiene *' },
      { from: 'Sim', to: 'Mascota', type: 'aggregation', label: 'cuida 1' },
    ],
    solutionCodeJava: `class Mueble {
    private String nombre;
    private String tipo;
    private int confort;
    private int precio;
    private int durabilidad;

    public Mueble(String nombre, String tipo, int confort, int precio) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.confort = confort;
        this.precio = precio;
        this.durabilidad = 100;
    }

    public int usar() {
        if (this.durabilidad <= 0) {
            return 0;
        }
        this.durabilidad -= 10;
        return this.confort;
    }

    public boolean estaRoto() {
        return this.durabilidad <= 0;
    }

    public String getTipo() {
        return tipo;
    }

    public String getNombre() {
        return nombre;
    }
}

class Casa {
    private String direccion;
    private int dimensiones;
    private int contadorMuebles;

    public Casa(String direccion, int dimensiones) {
        this.direccion = direccion;
        this.dimensiones = dimensiones;
        this.contadorMuebles = 0;
    }

    public void agregarMueble(Mueble mueble) {
        this.contadorMuebles++;
        System.out.println("🏠 " + direccion + " ahora tiene " + this.contadorMuebles + " muebles");
    }

    public int getMuebles() {
        return contadorMuebles;
    }
}

class Mascota {
    private String nombre;
    private int hambre;
    private int felicidad;
    private String especie;

    public Mascota(String nombre, String especie) {
        this.nombre = nombre;
        this.especie = especie;
        this.hambre = 50;
        this.felicidad = 50;
    }

    public void comer(String alimento) {
        this.hambre = Math.max(0, this.hambre - 25);
        System.out.println("🥣 " + nombre + " comió " + alimento + " (hambre: " + this.hambre + ")");
    }

    public void jugar() {
        this.felicidad += 10;
        System.out.println("🎾 " + nombre + " jugó con su dueño (felicidad: " + this.felicidad + ")");
    }
}

class Sim {
    private String nombre;
    private int energia;
    private int higiene;
    private int dinero;
    private Casa casa;
    private Mascota mascota;

    public Sim(String nombre, int dinero, Casa casa, Mascota mascota) {
        this.nombre = nombre;
        this.dinero = dinero;
        this.casa = casa;
        this.mascota = mascota;
        this.energia = 60;
        this.higiene = 60;
    }

    public void comprarMueble(Mueble mueble) {
        this.dinero -= 100;
        this.casa.agregarMueble(mueble);
        System.out.println("🛒 " + nombre + " compró " + mueble.getNombre() + " por 100 §");
    }

    public void usarMueble(Mueble mueble) {
        int beneficio = mueble.usar();
        if (mueble.getTipo().equals("ENERGIA")) {
            this.energia = Math.min(100, this.energia + beneficio);
        } else {
            this.higiene = Math.min(100, this.higiene + beneficio);
        }
        System.out.println("🛋️ " + nombre + " usó " + mueble.getNombre() + " (+" + beneficio + ")");
    }

    public void cuidarMascota() {
        this.mascota.comer("croqueta");
        this.mascota.jugar();
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | energía: " + energia + " | higiene: " + higiene + " | dinero: " + dinero + " | muebles: " + casa.getMuebles());
    }
}

public class Main {
    public static void main(String[] args) {
        Casa casa = new Casa("Vía Simulación 12", 60);
        Mascota perrito = new Mascota("Simba", "perro");
        Sim sim = new Sim("Bella", 1000, casa, perrito);

        sim.mostrarEstado();
        sim.usarMueble(new Mueble("Cama acogedora", "ENERGIA", 25, 300));
        sim.comprarMueble(new Mueble("Ducha nueva", "HIGIENE", 20, 200));
        sim.usarMueble(new Mueble("Ducha nueva", "HIGIENE", 20, 200));
        sim.cuidarMascota();
        sim.mostrarEstado();
    }
}`,
  },
  {
    id: 19,
    slug: 'skyrim-arquero',
    title: 'El arquero de Skyrim y su equipo',
    gameTheme: 'The Elder Scrolls: Skyrim',
    icon: '🏹',
    level: 'avanzado',
    context:
      'Un arquero de Skyrim lleva un arco con una tension concreta, dispara flechas con daño y puntería diferentes y practica contra dianas a distintas distancias. Un arco de gran Premio hace más daño pero pesa más y cansa antes.',
    task:
      'Crea Diana (distancia, tipo), Flecha (dano, punteria) y Arco (nombre, tension, peso) y Arquero (nombre, vida, arquitectura, arco, ultimaDiana). Modela la cadena completa: el arquero carga el arco, apunta a una diana y la flecha se clava según la distancia.',
    methodHints: [
      'Diana.getFactorDistancia(): cerca = 1.0, media = 0.8, lejos = 0.6',
      'Flecha.clavar(diana): daño real = dano * punteria * factorDistancia',
      'Arco.disparar(flecha): el arco aplica su tensión como bonus y se desgasta',
      'Arco.puedeDisparar(): false si el peso cansa al arquero',
      'Arquero.apuntar(diana): guarda la diana objetivo y calcula la dificultad',
      'Arquero.disparar(flecha, diana): encadena arco → flecha → diana y muestra el resultado',
    ],
    mainClass: {
      name: 'Arquero',
      attrs: ['- nombre: String', '- vida: int', '- arquitectura: int', '- arco: Arco', '- ultimaDiana: Diana', '- flechasClavadas: int'],
      methods: [
        '+ apuntar(diana: Diana): void',
        '+ disparar(flecha: Flecha): void',
        '+ getPunteria(): int',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Diana',
        attrs: ['- distancia: int', '- tipo: String', '- dificultad: int'],
        methods: ['+ getFactorDistancia(): double', '+ getTipo(): String'],
      },
      {
        name: 'Flecha',
        attrs: ['- dano: int', '- punteria: int', '- clavada: boolean'],
        methods: ['+ clavar(diana: Diana): int', '+ estaClavada(): boolean'],
      },
      {
        name: 'Arco',
        attrs: ['- nombre: String', '- tension: int', '- peso: int', '- desgaste: int'],
        methods: ['+ puedeDisparar(): boolean', '+ aplicarTension(flecha: Flecha): int', '+ getNombre(): String'],
      },
    ],
    relations: [
      { from: 'Arquero', to: 'Arco', type: 'composition', label: 'usa 1' },
      { from: 'Arquero', to: 'Flecha', type: 'aggregation', label: 'dispara 1' },
      { from: 'Flecha', to: 'Diana', type: 'aggregation', label: 'impacta 1' },
    ],
    solutionCodeJava: `class Diana {
    private int distancia;
    private String tipo;
    private int dificultad;

    public Diana(int distancia, String tipo, int dificultad) {
        this.distancia = distancia;
        this.tipo = tipo;
        this.dificultad = dificultad;
    }

    public double getFactorDistancia() {
        if (this.distancia <= 20) {
            return 1.0;
        }
        if (this.distancia <= 50) {
            return 0.8;
        }
        return 0.6;
    }

    public String getTipo() {
        return tipo;
    }
}

class Flecha {
    private int dano;
    private int punteria;
    private boolean clavada;

    public Flecha(int dano, int punteria) {
        this.dano = dano;
        this.punteria = punteria;
        this.clavada = false;
    }

    public int clavar(Diana diana) {
        this.clavada = true;
        return (int) (this.dano * this.punteria * diana.getFactorDistancia());
    }

    public boolean estaClavada() {
        return clavada;
    }
}

class Arco {
    private String nombre;
    private int tension;
    private int peso;
    private int desgaste;

    public Arco(String nombre, int tension, int peso) {
        this.nombre = nombre;
        this.tension = tension;
        this.peso = peso;
        this.desgaste = 0;
    }

    public boolean puedeDisparar() {
        return this.desgaste < 50;
    }

    public int aplicarTension(Flecha flecha) {
        this.desgaste += this.peso / 10;
        return this.tension;
    }

    public String getNombre() {
        return nombre;
    }
}

class Arquero {
    private String nombre;
    private int vida;
    private int arquitectura;
    private Arco arco;
    private Diana ultimaDiana;
    private int flechasClavadas;

    public Arquero(String nombre, int vida, int arquitectura, Arco arco) {
        this.nombre = nombre;
        this.vida = vida;
        this.arquitectura = arquitectura;
        this.arco = arco;
        this.ultimaDiana = null;
        this.flechasClavadas = 0;
    }

    public void apuntar(Diana diana) {
        this.ultimaDiana = diana;
        System.out.println("🎯 " + nombre + " apunta a la diana " + diana.getTipo());
    }

    public void disparar(Flecha flecha) {
        if (this.ultimaDiana == null) {
            System.out.println("Primero hay que apuntar a una diana.");
            return;
        }
        if (!this.arco.puedeDisparar()) {
            System.out.println("El arco " + this.arco.getNombre() + " está demasiado gastado.");
            return;
        }
        int bonus = this.arco.aplicarTension(flecha);
        int danoTotal = flecha.clavar(this.ultimaDiana) + bonus;
        System.out.println("🏹 " + nombre + " clavó la flecha con " + danoTotal + " de daño (arco " + this.arco.getNombre() + ")");
        this.flechasClavadas++;
    }

    public int getPunteria() {
        return 10 + this.arquitectura;
    }

    public void mostrarEstado() {
        System.out.println(nombre + " | vida: " + vida + " | puntería: " + getPunteria() + " | flechas clavadas: " + flechasClavadas);
    }
}

public class Main {
    public static void main(String[] args) {
        Arco arcoLargo = new Arco("Arco Largo de Bosque", 12, 30);
        Arquero arquero = new Arquero("Eorlund", 120, 40, arcoLargo);
        Diana cercana = new Diana(15, "cercana", 10);
        Diana lejana = new Diana(80, "lejana", 40);

        arquero.mostrarEstado();
        arquero.apuntar(cercana);
        arquero.disparar(new Flecha(20, arquero.getPunteria() / 10));
        arquero.apuntar(lejana);
        arquero.disparar(new Flecha(20, 1));
        arquero.mostrarEstado();
    }
}`,
  },
  {
    id: 20,
    slug: 'starfield-astronauta',
    title: 'Aventura espacial: nave, planeta y mineral',
    gameTheme: 'Starfield',
    icon: '🌌',
    level: 'avanzado',
    context:
      'En una aventura espacial el astronauta pilota una nave, aterriza en planetas y recoge minerales para mejorar el combustible. Cada planeta tiene su propio tipo de mineral y su dificultad de extracción, y la nave consume combustible en cada salto.',
    task:
      'Es el reto final: crea Nave (modelo, combustible, velocidad), Mineral (tipo, valor, rareza), Planeta (nombre, dificultad, atmosfera) y Astronauta (nombre, vida, nave, mochilaOro). Encadena la asociación completa y simula un viaje con dos planetas.',
    methodHints: [
      'Mineral.extraer(dificultad): el valor final depende de la rareza y de la dificultad del planeta',
      'Planeta.explorar(): devuelve un mineral propio del planeta',
      'Planeta.esPeligroso(): true si su atmósfera es hostil',
      'Nave.viajar(planeta): consume combustible según la distancia y avisa si no alcanza',
      'Nave.recargar(menaje): suma combustible con la energía del mineral',
      'Astronauta.explorar(planeta): pide el mineral al planeta y lo guarda en la mochila',
      'Astronauta.mostrarEstado(): inventario, combustible y vida',
    ],
    mainClass: {
      name: 'Astronauta',
      attrs: ['- nombre: String', '- vida: int', '- nave: Nave', '- oro: int', '- mineralesRecolectados: int', '- destino: Planeta'],
      methods: [
        '+ viajar(planeta: Planeta): boolean',
        '+ explorar(planeta: Planeta): void',
        '+ recargarNave(): void',
        '+ mostrarEstado(): void',
      ],
    },
    associatedClasses: [
      {
        name: 'Nave',
        attrs: ['- modelo: String', '- combustible: int', '- velocidad: int', '- capacidadTanque: int'],
        methods: ['+ viajar(planeta: Planeta): void', '+ recargar(menaje: Mineral): void', '+ getCombustible(): int'],
      },
      {
        name: 'Mineral',
        attrs: ['- tipo: String', '- valor: int', '- rareza: String', '- energia: int'],
        methods: ['+ extraer(dificultad: int): int', '+ getTipo(): String', '+ getEnergia(): int'],
      },
      {
        name: 'Planeta',
        attrs: ['- nombre: String', '- distancia: int', '- dificultad: int', '- atmosfera: String'],
        methods: ['+ explorar(): Mineral', '+ esPeligroso(): boolean', '+ getNombre(): String'],
      },
    ],
    relations: [
      { from: 'Astronauta', to: 'Nave', type: 'composition', label: 'pilota 1' },
      { from: 'Astronauta', to: 'Planeta', type: 'aggregation', label: 'explora 1' },
      { from: 'Planeta', to: 'Mineral', type: 'composition', label: 'contiene 1' },
    ],
    solutionCodeJava: `class Mineral {
    private String tipo;
    private int valor;
    private String rareza;
    private int energia;

    public Mineral(String tipo, int valor, String rareza, int energia) {
        this.tipo = tipo;
        this.valor = valor;
        this.rareza = rareza;
        this.energia = energia;
    }

    public int extraer(int dificultad) {
        int resultado = this.valor;
        if (this.rareza.equals("RARO")) {
            resultado = resultado * 2;
        }
        if (this.rareza.equals("LEGENDARIO")) {
            resultado = resultado * 3;
        }
        return Math.max(1, resultado - dificultad);
    }

    public String getTipo() {
        return tipo;
    }

    public int getEnergia() {
        return energia;
    }
}

class Planeta {
    private String nombre;
    private int distancia;
    private int dificultad;
    private String atmosfera;

    public Planeta(String nombre, int distancia, int dificultad, String atmosfera) {
        this.nombre = nombre;
        this.distancia = distancia;
        this.dificultad = dificultad;
        this.atmosfera = atmosfera;
    }

    public Mineral explorar() {
        System.out.println("🪐 Explorando " + this.nombre + "...");
        if (this.dificultad > 5) {
            return new Mineral("Uranio", 30, "RARO", 20);
        }
        return new Mineral("Hierro", 10, "COMUN", 8);
    }

    public boolean esPeligroso() {
        return this.atmosfera.equals("HOSTIL");
    }

    public String getNombre() {
        return nombre;
    }

    public int getDistancia() {
        return distancia;
    }

    public int getDificultad() {
        return dificultad;
    }
}

class Nave {
    private String modelo;
    private int combustible;
    private int velocidad;
    private int capacidadTanque;

    public Nave(String modelo, int capacidadTanque, int velocidad) {
        this.modelo = modelo;
        this.capacidadTanque = capacidadTanque;
        this.combustible = capacidadTanque;
        this.velocidad = velocidad;
    }

    public void viajar(Planeta planeta) {
        int costo = planeta.getDistancia() / 10;
        if (costo > this.combustible) {
            System.out.println("⛽ No hay combustible suficiente para llegar a " + planeta.getNombre());
            return;
        }
        this.combustible -= costo;
        System.out.println("🚀 " + this.modelo + " viaja a " + planeta.getNombre() + " (combustible: " + this.combustible + ")");
    }

    public void recargar(Mineral menaje) {
        int limite = this.capacidadTanque - this.combustible;
        int carga = Math.min(limite, menaje.getEnergia());
        this.combustible += carga;
        System.out.println("⛽ Se recargó con " + menaje.getTipo() + ": +" + carga + " de combustible");
    }

    public int getCombustible() {
        return combustible;
    }
}

class Astronauta {
    private String nombre;
    private int vida;
    private Nave nave;
    private int oro;
    private int mineralesRecolectados;
    private Planeta destino;

    public Astronauta(String nombre, int vida, Nave nave) {
        this.nombre = nombre;
        this.vida = vida;
        this.nave = nave;
        this.oro = 0;
        this.mineralesRecolectados = 0;
        this.destino = null;
    }

    public boolean viajar(Planeta planeta) {
        int costo = planeta.getDistancia() / 10;
        if (costo > this.nave.getCombustible()) {
            return false;
        }
        this.nave.viajar(planeta);
        this.destino = planeta;
        return true;
    }

    public void explorar(Planeta planeta) {
        Mineral mineral = planeta.explorar();
        int valor = mineral.extraer(planeta.getDificultad());
        this.oro += valor;
        this.mineralesRecolectados++;
        if (planeta.esPeligroso()) {
            this.vida -= 10;
        }
        System.out.println("⛏️ " + this.nombre + " extrajo " + mineral.getTipo() + " por " + valor + " de oro");
    }

    public void recargarNave() {
        Mineral auxiliar = new Mineral("Batería de protones", 5, "COMUN", 25);
        this.nave.recargar(auxiliar);
    }

    public void mostrarEstado() {
        String lugar = this.destino == null ? "en órbita" : this.destino.getNombre();
        System.out.println(nombre + " | " + lugar + " | vida: " + vida + " | oro: " + oro + " | minerales: " + mineralesRecolectados + " | combustible: " + this.nave.getCombustible());
    }
}

public class Main {
    public static void main(String[] args) {
        Nave nave = new Nave("Explorador MK-II", 100, 60);
        Astronauta astronauta = new Astronauta("Riley", 90, nave);
        Planeta viridia = new Planeta("Viridia", 30, 3, "AMIGABLE");
        Planeta arkon = new Planeta("Arkon", 90, 7, "HOSTIL");

        astronauta.mostrarEstado();
        astronauta.viajar(viridia);
        astronauta.explorar(viridia);
        astronauta.recargarNave();
        astronauta.viajar(arkon);
        astronauta.explorar(arkon);
        astronauta.mostrarEstado();
    }
}`,
  },
];
