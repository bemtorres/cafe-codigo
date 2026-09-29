export interface CppQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface CppQuizDefinition {
  key: string;
  title: string;
  questions: CppQuizQuestion[];
}

export const cppQuizBank: Record<string, CppQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: Introducción a C++',
    questions: [
      {
        prompt: '¿Cuál es la función obligatoria que actúa como punto de entrada de todo programa en C++?',
        options: ['start()', 'int main()', 'init()', 'run()'],
        correctIndex: 1,
      },
      {
        prompt: '¿Por qué C++ es considerado un lenguaje compilado?',
        options: [
          'Porque se traduce directamente a código máquina nativo antes de ejecutarse',
          'Porque necesita un navegador web para funcionar',
          'Porque requiere un software intérprete línea por línea',
          'Porque solo funciona en teléfonos móviles'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué objeto de la librería <iostream> se utiliza para imprimir en la consola?',
        options: ['std::cin', 'std::cout', 'std::cerr', 'std::print'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué símbolo es obligatorio al final de cada sentencia en C++?',
        options: [':', ';', '.', '->'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué indica "return 0;" al finalizar la función main()?',
        options: [
          'Que hubo un error fatal',
          'Que el programa finalizó con éxito',
          'Que el programa debe reiniciarse',
          'Que la memoria RAM se borró'
        ],
        correctIndex: 1,
      },
    ],
  },
  'variables': {
    key: 'variables',
    title: 'Quiz: Variables y Memoria en C++',
    questions: [
      {
        prompt: '¿Qué tipo de dato se usa para almacenar números decimales con alta precisión (8 bytes)?',
        options: ['int', 'double', 'char', 'bool'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué contiene una variable local de tipo int si no la inicializas al declararla?',
        options: ['El número 0', 'Un valor nulo (null)', 'Basura de memoria residual', 'El número 1'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué palabra reservada se utiliza para declarar una variable inmutable que no puede modificarse?',
        options: ['const', 'static', 'final', 'immutable'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué operador te permite consultar cuántos bytes ocupa un tipo o variable en memoria?',
        options: ['bytesof()', 'length()', 'sizeof()', 'count()'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué hace la palabra reservada "auto" introducida en C++11?',
        options: [
          'Deduce automáticamente el tipo de la variable según su inicialización',
          'Crea un hilo en segundo plano',
          'Convierte la variable en puntero',
          'Optimiza la velocidad en bucles'
        ],
        correctIndex: 0,
      },
    ],
  },
  'io': {
    key: 'io',
    title: 'Quiz: Entrada y Salida (I/O)',
    questions: [
      {
        prompt: '¿Qué operador se utiliza junto a std::cin para leer datos desde el teclado?',
        options: ['<<', '>>', '==', '::'],
        correctIndex: 1,
      },
      {
        prompt: '¿Por qué std::cin >> texto; no puede leer nombres completos con espacios?',
        options: [
          'Porque se detiene en el primer espacio en blanco o tabulador',
          'Porque cin solo lee números',
          'Porque la consola bloquea los espacios',
          'Porque faltó incluir <math.h>'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué función debe usarse para leer una línea completa con espacios?',
        options: ['std::cin.read()', 'std::getline(std::cin, var)', 'std::cin.getall()', 'scanf()'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué problema resuelve std::cin.ignore() antes de un std::getline()?',
        options: [
          'Descarta el salto de línea residual (\\n) que quedó atrapado en el buffer',
          'Borra la pantalla de la consola',
          'Aumenta la velocidad del procesador',
          'Cierra la sesión del usuario'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es la diferencia entre "\\n" y std::endl?',
        options: [
          '\\n solo salta de línea; std::endl además fuerza el vaciado del buffer (flush)',
          '\\n es más lento que std::endl',
          'std::endl no funciona en Windows',
          'Son 100% idénticos en todo sentido'
        ],
        correctIndex: 0,
      },
    ],
  },
  'operadores': {
    key: 'operadores',
    title: 'Quiz: Operadores y Aritmética',
    questions: [
      {
        prompt: '¿Cuál es el resultado de la expresión entera 9 / 2 en C++?',
        options: ['4.5', '4', '5', 'Error'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo logras que una división de 9 entre 2 devuelva 4.5 en C++?',
        options: ['9.0 / 2', 'double(9 / 2)', '9 // 2', '9 div 2'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué devuelve el operador módulo (14 % 3)?',
        options: ['4', '2', '0', '4.66'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué diferencia hay entre ++i y i++?',
        options: [
          '++i incrementa antes de entregar el valor; i++ entrega el valor y luego incrementa',
          'i++ suma 2 en lugar de 1',
          '++i solo funciona con números negativos',
          'No hay ninguna diferencia técnica'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué operador lógico representa el "O" (OR) en C++?',
        options: ['&&', '||', '!', 'xor'],
        correctIndex: 1,
      },
    ],
  },
  'condicionales': {
    key: 'condicionales',
    title: 'Quiz: Toma de Decisiones y Condicionales',
    questions: [
      {
        prompt: '¿Qué instrucción es obligatoria dentro de cada case en un switch para evitar el fall-through?',
        options: ['break;', 'exit;', 'return;', 'stop;'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo evalúa C++ una condición if (numero) cuando numero es igual a -5?',
        options: [
          'Como verdadero (true), porque cualquier número distinto de cero es true',
          'Como falso, porque es negativo',
          'Provoca error de compilación',
          'Como nulo'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué estructura es ideal para crear menús con opciones numéricas fijas?',
        options: ['switch-case', 'while', 'for', 'struct'],
        correctIndex: 0,
      },
      {
        prompt: 'En el operador ternario `cond ? A : B`, ¿qué valor se escoge si cond es falso?',
        options: ['A', 'B', 'Ambos', 'Ninguno'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué ocurre si olvidas la cláusula break en un case que coincide?',
        options: [
          'Se ejecutan también las instrucciones de los cases siguientes hasta encontrar un break',
          'El programa se apaga de golpe',
          'El compilador detiene la ejecución',
          'Se borran las variables'
        ],
        correctIndex: 0,
      },
    ],
  },
  'ciclos': {
    key: 'ciclos',
    title: 'Quiz: Bucles y Repetición',
    questions: [
      {
        prompt: '¿Cuál es la característica principal del bucle do-while?',
        options: [
          'Garantiza que el bloque se ejecutará al menos una vez',
          'No necesita condición de parada',
          'Es más rápido que el for',
          'Solo funciona con números impares'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué instrucción salta la iteración actual y continúa con la siguiente del bucle?',
        options: ['continue', 'break', 'skip', 'pass'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué instrucción termina y sale inmediatamente del bucle?',
        options: ['break', 'continue', 'exit', 'goto'],
        correctIndex: 0,
      },
      {
        prompt: 'En `for (int i = 0; i < 5; ++i)`, ¿cuántas iteraciones se realizan en total?',
        options: ['4', '5', '6', 'Infinitas'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué causa habitualmente un bucle infinito?',
        options: [
          'Olvidar actualizar la variable de control que hace falsa la condición',
          'Usar variables de tipo int',
          'Imprimir demasiado texto en pantalla',
          'Usar llaves { }'
        ],
        correctIndex: 0,
      },
    ],
  },
  'colecciones': {
    key: 'colecciones',
    title: 'Quiz: Colecciones y Arreglos',
    questions: [
      {
        prompt: '¿Por qué el primer elemento de un arreglo en C++ tiene el índice 0?',
        options: [
          'Porque representa un desplazamiento (offset) de 0 bytes desde el inicio en memoria',
          'Porque PSeInt lo inventó así',
          'Para que no se pueda usar el número 1',
          'Por compatibilidad con el teclado'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué significa que los elementos de un arreglo vivan de forma "contigua" en memoria?',
        options: [
          'Que están pegados uno al lado del otro en casilleros consecutivos de la RAM',
          'Que cambian de lugar constantemente',
          'Que se guardan en el disco duro',
          'Que no comparten el mismo tipo de dato'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué ventaja tiene std::vector sobre los arreglos nativos tradicionales?',
        options: [
          'Puede crecer o encoger su tamaño dinámicamente en tiempo de ejecución',
          'Ocupa cero bytes en memoria',
          'No necesita compilarse',
          'Solo almacena texto'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo se lee la sintaxis range-based `for (int x : lista)`?',
        options: [
          '"Para cada elemento x en lista"',
          '"Multiplica x por lista"',
          '"Divide la lista entre x"',
          '"Borra x de la lista"'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué complejidad temporal tiene acceder al elemento `arr[i]` en un arreglo contiguo?',
        options: ['O(1) - Acceso instantáneo', 'O(N) - Búsqueda lenta', 'O(N^2)', 'O(log N)'],
        correctIndex: 0,
      },
    ],
  },
  'array': {
    key: 'array',
    title: 'Quiz: Arreglos Fijos Tradicionales',
    questions: [
      {
        prompt: 'Si declaras `int notas[5];`, ¿cuáles son los índices válidos para acceder?',
        options: ['De 0 a 4', 'De 1 a 5', 'De 0 a 5', 'De 1 a 4'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué sucede si intentas escribir en `notas[10]` en un arreglo de tamaño 5 en C++?',
        options: [
          'Ocurre un Buffer Overflow y comportamiento indefinido (puede corromper memoria o colapsar)',
          'El compilador lo agranda a 11 casilleros automáticamente',
          'C++ lanza un mensaje emergente de advertencia',
          'Se borra la variable'
        ],
        correctIndex: 0,
      },
      {
        prompt: 'Si inicializas `int arr[4] = {10, 20};`, ¿qué valor tienen los elementos restantes arr[2] y arr[3]?',
        options: ['0', 'Basura de memoria', '10', 'null'],
        correctIndex: 0,
      },
      {
        prompt: '¿Dónde se almacenan típicamente los arreglos fijos locales declarados en una función?',
        options: ['En el Stack (pila de memoria rápida)', 'En el disco duro', 'En la tarjeta de video', 'En la nube'],
        correctIndex: 0,
      },
      {
        prompt: '¿Se puede cambiar el tamaño de un arreglo fijo tradicional después de compilar?',
        options: ['No, su tamaño es estático e inmutable', 'Sí, con el comando resize()', 'Sí, con append()', 'Solo si es de texto'],
        correctIndex: 0,
      },
    ],
  },
  'vector': {
    key: 'vector',
    title: 'Quiz: std::vector Dinámico',
    questions: [
      {
        prompt: '¿Qué método se usa para añadir un elemento al final de un std::vector?',
        options: ['push_back()', 'append()', 'add()', 'insert()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué devuelve el método `vector.size()`?',
        options: [
          'La cantidad actual de elementos que residen en el vector',
          'La capacidad máxima de la memoria RAM',
          'El peso en kilobytes del archivo',
          'El primer elemento del vector'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué diferencia hay entre `vec[i]` y `vec.at(i)`?',
        options: [
          'vec.at(i) valida los límites y lanza una excepción si el índice no existe',
          'vec[i] solo funciona con cadenas de texto',
          'vec.at(i) borra el elemento al leerlo',
          'Son exactamente iguales'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué método elimina el último elemento de un vector?',
        options: ['pop_back()', 'remove_last()', 'delete()', 'erase_end()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué ocurre internamente cuando `size == capacity` y haces un nuevo `push_back()`?',
        options: [
          'C++ reserva un bloque nuevo del doble de capacidad en la RAM y migra los elementos',
          'El programa arroja un error y se detiene',
          'Se sobreescribe el primer elemento',
          'El vector se convierte en un arreglo fijo'
        ],
        correctIndex: 0,
      },
    ],
  },
  'array-game': {
    key: 'array-game',
    title: 'Quiz: Arreglos 2D y Pac-Man',
    questions: [
      {
        prompt: '¿Cómo se declara una matriz de caracteres de 5 filas y 10 columnas en C++?',
        options: ['char mapa[5][10];', 'char mapa[10, 5];', 'matrix<char> mapa(5, 10);', 'char[5, 10] mapa;'],
        correctIndex: 0,
      },
      {
        prompt: 'En la coordenada `mapa[y][x]`, ¿qué representa `y` y qué representa `x`?',
        options: [
          '`y` es el número de fila (vertical) y `x` el de columna (horizontal)',
          '`y` es la columna y `x` es la fila',
          'Ambos representan columnas',
          '`y` es el puntaje y `x` la vida'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo se detecta que Pac-Man intenta chocar contra una pared de ladrillo representada por "#"?',
        options: [
          'Validando if (mapa[nuevaY][nuevaX] == \'#\') antes de mover',
          'Usando un sensor de hardware',
          'Llamando a la función colision() de Windows',
          'Reiniciando la computadora'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuántos bucles for anidados se necesitan para dibujar un mapa 2D en la consola?',
        options: ['2 bucles (uno para filas y otro para columnas)', '1 bucle', '4 bucles', 'Ninguno'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué carácter se imprime habitualmente al final de cada fila para pasar a la siguiente línea?',
        options: ['\'\\n\'', '\'\\t\'', '\'#\'', '\'0\''],
        correctIndex: 0,
      },
    ],
  },
  'array-examen': {
    key: 'array-examen',
    title: 'Quiz: Vector CRUD y Gestión de Inventarios',
    questions: [
      {
        prompt: '¿Qué significan las siglas CRUD en desarrollo de software?',
        options: [
          'Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar)',
          'Compile, Run, Undo, Debug',
          'Code, Reset, Use, Drop',
          'Check, Read, Upload, Download'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Cómo se elimina un elemento en el índice `i` de un vector usando iteradores?',
        options: [
          'vector.erase(vector.begin() + i);',
          'vector.delete(i);',
          'vector.remove_at(i);',
          'delete vector[i];'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué método devuelve un iterador apuntando al primer elemento del vector?',
        options: ['vector.begin()', 'vector.front()', 'vector.start()', 'vector.head()'],
        correctIndex: 0,
      },
      {
        prompt: '¿Por qué se debe buscar un elemento antes de intentar actualizarlo o borrarlo?',
        options: [
          'Para verificar que realmente existe y no operar sobre un índice inválido fuera de rango',
          'Porque C++ lo prohíbe en tiempo de compilación',
          'Para cambiar el nombre del archivo',
          'Para ahorrar energía'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué método elimina absolutamente todos los elementos de un vector?',
        options: ['vector.clear()', 'vector.destroy()', 'vector.reset()', 'vector.empty()'],
        correctIndex: 0,
      },
    ],
  },
  'funciones': {
    key: 'funciones',
    title: 'Quiz: Funciones, Memoria y Referencias (&)',
    questions: [
      {
        prompt: '¿Qué ocurre cuando pasas una variable a una función por Valor (`void fn(int x)`)?',
        options: [
          'Se crea una copia independiente; las modificaciones dentro de la función no afectan a la variable original',
          'Se modifica directamente la variable original',
          'El programa colapsa por falta de memoria',
          'Se borra la variable de main'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué símbolo se usa en el parámetro para indicar paso por Referencia (`void fn(int& x)`)?',
        options: ['&', '*', '%', '#'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué ventaja tiene pasar un vector enorme con `const std::vector<int>& v`?',
        options: [
          'Evita duplicar megabytes de memoria (cero copias) y protege los datos contra modificaciones accidentales',
          'Convierte los números en cadenas de texto',
          'Permite cambiar el tamaño del vector dentro de la función',
          'Hace que el programa sea multihilo'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué operador devuelve la dirección física de memoria donde vive una variable en la RAM?',
        options: ['El operador de dirección & (&x)', 'El operador asterisco *', 'sizeof()', 'typeid()'],
        correctIndex: 0,
      },
      {
        prompt: 'Si `int* p = &x;`, ¿cómo accedes o modificas el valor dentro de la casilla a la que apunta p?',
        options: ['Usando el operador de desreferenciación: *p = 50;', 'Haciendo p = 50;', 'Con p.value = 50;', 'Con &p = 50;'],
        correctIndex: 0,
      },
    ],
  },
  'poo-basico': {
    key: 'poo-basico',
    title: 'Quiz: POO Básico, Clases y Encapsulamiento',
    questions: [
      {
        prompt: '¿Qué modificador de acceso protege los atributos para que solo puedan modificarse a través de métodos de la propia clase?',
        options: ['private', 'public', 'protected', 'global'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es la función especial que se ejecuta automáticamente cuando se crea un objeto para inicializar sus datos?',
        options: ['El Constructor', 'El Destructor', 'El Getter', 'El Setter'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué carácter debe colocarse obligatoriamente al final de la definición de una clase en C++ tras la llave de cierre (`}`) ?',
        options: ['; (punto y coma)', ':', '.', 'No se coloca nada'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es la diferencia conceptual entre una Clase y un Objeto?',
        options: [
          'La clase es el plano arquitectónico; el objeto es la casa real construida en memoria RAM',
          'La clase vive en el disco; el objeto es una función matemática',
          'Son exactamente sinónimos',
          'El objeto solo puede almacenar un solo número'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué puntero implícito hace referencia a la propia instancia actual dentro de un método de clase?',
        options: ['this', 'self', 'me', 'current'],
        correctIndex: 0,
      },
    ],
  },
  'poo-pilares': {
    key: 'poo-pilares',
    title: 'Quiz: Herencia y Polimorfismo',
    questions: [
      {
        prompt: '¿Cómo se indica en C++ que la clase `Guerrero` hereda públicamente de `Personaje`?',
        options: [
          'class Guerrero : public Personaje { ... };',
          'class Guerrero extends Personaje { ... };',
          'class Guerrero implements Personaje { ... };',
          'class Guerrero inherits Personaje { ... };'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué palabra clave se debe colocar en un método de la clase base para permitir el polimorfismo dinámico?',
        options: ['virtual', 'override', 'abstract', 'dynamic'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué palabra clave de C++11 valida que un método realmente esté sobreescribiendo una función virtual de la clase base?',
        options: ['override', 'overload', 'virtual', 'replace'],
        correctIndex: 0,
      },
      {
        prompt: '¿Por qué es fundamental que una clase base polimórfica tenga un destructor virtual (`virtual ~Base() {}`)?',
        options: [
          'Para que al borrar un objeto a través de un puntero a la base se ejecute también el destructor de la clase hija',
          'Para evitar que el programa se cierre al compilar',
          'Para inicializar variables en cero',
          'Para que los métodos sean más rápidos'
        ],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué es una función virtual pura (ej. `virtual void atacar() = 0;`)?',
        options: [
          'Una función sin implementación en la clase base que convierte a la clase en abstracta y obliga a las hijas a implementarla',
          'Una función que corre en el procesador gráfico',
          'Una función que no consume memoria RAM',
          'Una función que solo puede llamarse una vez'
        ],
        correctIndex: 0,
      },
    ],
  },
};
