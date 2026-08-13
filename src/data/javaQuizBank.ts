export interface JavaQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface JavaQuizDefinition {
  key: string;
  title: string;
  questions: JavaQuizQuestion[];
}

export const javaQuizBank: Record<string, JavaQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: Introducción a Java',
    questions: [
      {
        prompt: "¿Cuál es el método principal que Java busca para ejecutar un programa?",
        options: ["public static void main(String[] args)", "void start()", "function Main()", "public void Main()"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué significa que Java sea WORA?",
        options: ["Write Once, Read Anything", "World Of Robust Applications", "Write Once, Run Anywhere", "Window Object Reference API"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué instrucción usamos para imprimir un mensaje con salto de línea en consola?",
        options: ["console.log();", "System.print();", "Console.WriteLine();", "System.out.println();"],
        correctIndex: 3
      },
      {
        prompt: "¿Qué es la JVM?",
        options: ["Java Visual Machine", "Java Virtual Machine", "Java Version Manager", "Java Variable Memory"],
        correctIndex: 1
      },
      {
        prompt: "Toda clase pública en Java debe estar en un archivo llamado...",
        options: ["App.java", "Igual que el nombre de la clase pública más .java", "main.java", "Igual que el paquete"],
        correctIndex: 1
      }
    ]
  },
  'variables': {
    key: 'variables',
    title: 'Quiz: Variables y Primitivos',
    questions: [
      {
        prompt: "¿Cuál es el tipo de dato primitivo para números enteros en Java?",
        options: ["integer", "int", "number", "Int"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama la clase utilizada para guardar texto en Java?",
        options: ["string", "String", "Text", "char[]"],
        correctIndex: 1
      },
      {
        prompt: "Si declaramos 'boolean activo = false;', ¿qué tipo de variable es?",
        options: ["Primitivo", "Objeto", "Clase Envoltorio (Wrapper)", "String"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es el sufijo requerido al declarar un float (ej: float pi = 3.14...) ?",
        options: ["f o F", "d o D", "No lleva", "l o L"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo formatea el nombre de sus variables Java por convención?",
        options: ["PascalCase", "snake_case", "camelCase", "kebab-case"],
        correctIndex: 2
      }
    ]
  },
  'io': {
    key: 'io',
    title: 'Quiz: Interacción (Scanner)',
    questions: [
      {
        prompt: "¿Qué clase se utiliza habitualmente en Java para leer datos del teclado?",
        options: ["System.in", "Teclado", "Input", "Scanner"],
        correctIndex: 3
      },
      {
        prompt: "¿Qué método de Scanner lee toda una línea de texto introducida?",
        options: ["next()", "nextLine()", "readString()", "getLine()"],
        correctIndex: 1
      },
      {
        prompt: "Si tenemos 'Scanner sc = new Scanner(System.in);', ¿cómo leemos un entero?",
        options: ["sc.nextInt()", "sc.nextInteger()", "sc.readInt()", "int.parse(sc)"],
        correctIndex: 0
      },
      {
        prompt: "¿A qué paquete pertenece la clase Scanner?",
        options: ["java.io", "java.scanner", "java.util", "java.lang"],
        correctIndex: 2
      },
      {
        prompt: "¿Es buena práctica cerrar el Scanner cuando terminemos de usarlo?",
        options: ["Sí, usando sc.close()", "No, se cierra solo al finalizar el if", "Es obligatorio o no compila", "Sí, con sc.delete()"],
        correctIndex: 0
      }
    ]
  },
  'operadores': {
    key: 'operadores',
    title: 'Quiz: Operadores y Lógica',
    questions: [
      {
        prompt: "¿Qué hace el operador módulo (%)?",
        options: ["Divide dos números", "Devuelve el resto de una división entera", "Calcula un porcentaje", "Convierte a decimal"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el operador AND lógico estricto en Java?",
        options: ["&", "and", "&&", "||"],
        correctIndex: 2
      },
      {
        prompt: "Si int x = 5; y ejecuto x++; ¿qué valor toma x?",
        options: ["6", "5", "4", "10"],
        correctIndex: 0
      },
      {
        prompt: "¿Cuál es el operador relacional para preguntar '¿Es distinto de?'",
        options: ["<>", "!==", "not=", "!="],
        correctIndex: 3
      },
      {
        prompt: "Si tienes (5 > 3 || 10 < 5), ¿cuál es el resultado?",
        options: ["false", "Error", "true", "null"],
        correctIndex: 2
      }
    ]
  },
  'condicionales': {
    key: 'condicionales',
    title: 'Quiz: Condicionales',
    questions: [
      {
        prompt: "¿Cómo se escribe un if en Java?",
        options: ["if x > 5 then", "if (x > 5)", "si (x > 5)", "if x > 5:"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué palabra utilizamos si la condición principal es falsa pero queremos evaluar una segunda?",
        options: ["elseif", "else if", "elif", "otherwise if"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo comparamos si dos Strings son exactamente iguales en Java?",
        options: ["cadena1 == cadena2", "cadena1.equals(cadena2)", "cadena1 = cadena2", "cadena1.isSame(cadena2)"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la función del 'break' dentro de un switch?",
        options: ["Rompe la aplicación", "Termina la ejecución exclusiva del switch para no saltar al siguiente 'case'", "Salta al 'default'", "Reinicia el switch"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama el caso por defecto de un switch si nadie más cumple la condición?",
        options: ["else", "default", "case null", "otherwise"],
        correctIndex: 1
      }
    ]
  },
  'ciclos': {
    key: 'ciclos',
    title: 'Quiz: Bucles y Repeticiones',
    questions: [
      {
        prompt: "¿Cuál es la característica principal del ciclo 'do-while'?",
        options: ["Itera infinitamente", "Comprueba la condición y luego ejecuta", "Se ejecuta al menos UNA vez antes de evaluar la condición", "Es exclusivo para recorrer arreglos"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuáles son las tres partes de la declaración de un ciclo for tradicional?",
        options: ["(condicion; incremento)", "(inicio; incremento; final)", "(inicio; fin)", "(inicialización; condición; incremento)"],
        correctIndex: 3
      },
      {
        prompt: "¿Qué instrucción usarías para saltar la iteración actual y pasar directamente a la siguiente en un loop?",
        options: ["continue", "skip", "break", "next"],
        correctIndex: 0
      },
      {
        prompt: "Si escribes 'while(true) { }', ¿qué ocurre?",
        options: ["No compila", "Error de sintaxis", "Ciclo infinito", "Se ejecuta una sola vez"],
        correctIndex: 2
      },
      {
        prompt: "¿Se puede declarar la variable contador dentro del for (ej: for(int i = 0...))?",
        options: ["No, debe ser global", "Sí, y su alcance existirá solo dentro del for", "Sí, y existirá en todo el método", "Solo a partir de Java 10"],
        correctIndex: 1
      }
    ]
  },
  'colecciones': {
    key: 'colecciones',
    title: 'Quiz: Arrays y ArrayList',
    questions: [
      {
        prompt: "¿Qué diferencia un Array tradicional de un ArrayList en Java?",
        options: ["El Array puede guardar Strings, el ArrayList no", "El Array es de tamaño fijo. ArrayList es una lista dinámica e infinita (memoria permitiendo)", "Son la misma cosa internamente", "ArrayList no se usa más"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo sé cuántos elementos tiene un array tradicional estático de nombre 'numeros'?",
        options: ["numeros.length", "numeros.size()", "numeros.count", "numeros.length()"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo se añade un elemento a un ArrayList llamado 'lista'?",
        options: ["lista.push()", "lista = new Item()", "lista.add()", "lista.insert()"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué tipo de datos guarda obligatoriamente un ArrayList?",
        options: ["Tipos primitivos exclusivamente (int, char)", "Cualquier cosa, sin tipo", "Objetos y Clases Wrapper (Integer, Double, String...)", "Solo Strings"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la sintaxis correcta del bucle for-each en Java?",
        options: ["for (int x in arreglo)", "for (int x = arreglo)", "foreach (x => arreglo)", "for (int x : arreglo)"],
        correctIndex: 3
      }
    ]
  },
  'funciones': {
    key: 'funciones',
    title: 'Quiz: Métodos y Funciones',
    questions: [
      {
        prompt: "¿Qué palabra clave indica que un método no devolverá ningún valor?",
        options: ["null", "void", "empty", "static"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué sirve el comando 'return' en un método no-void?",
        options: ["Cierra la aplicación", "Termina el método y devuelve un valor de respuesta a quien lo haya llamado", "Limpia la memoria del proceso", "Se usa en el if para regresar"],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué el método Main debe de ser static?",
        options: ["Porque no se modifica", "Para que JVM pueda llamarlo sin tener que instanciar la clase Main", "Para que sea rápido", "Es decoración"],
        correctIndex: 1
      },
      {
        prompt: "Un método puede recibir variables en sus paréntesis. ¿Cómo se denominan?",
        options: ["Retornos", "Argumentos / Parámetros", "Atributos", "Instancias"],
        correctIndex: 1
      },
      {
        prompt: "¿Puede haber dos métodos con el mismo nombre en la misma clase?",
        options: ["Jamás, da error", "Sí, mientras tengan distinta firma (sobrecarga)", "Sí, pero uno debe ser privado", "Solo en interfaces"],
        correctIndex: 1
      }
    ]
  },
  'poo-basico': {
    key: 'poo-basico',
    title: 'Quiz: Clases y Objetos',
    questions: [
      {
        prompt: "¿Qué es una instancia?",
        options: ["El método destructor de la clase", "El diseño y atributos de una clase vacía", "Un objeto concreto creado a partir de la clase utilizando 'new'", "Un proyecto Java"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo se llama el método especial encargado de inicializar un objeto al hacer 'new'?",
        options: ["Constructor", "Iniciador", "Instanciador", "Main()"],
        correctIndex: 0
      },
      {
        prompt: "Si un atributo es marcado como 'private', ¿quién puede acceder a él?",
        options: ["Cualquier clase en el proyecto", "Solo las clases del mismo paquete", "Solo métodos dentro de su MISMA clase", "Cualquier clase hija excluisvamente"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuáles son los métodos estandarizados en Java para acceder a atributos privados?",
        options: ["Reads y Writes", "Inputs y Outputs", "Getters y Setters", "Pushers y Pullers"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué significa la palabra reservada 'this'?",
        options: ["Llama al constructor padre", "Se refiere al objeto (la instancia) actual en el que nos encontramos ejecutando el código", "Detiene la creación de un objeto local", "Hace referencia a la clase estática"],
        correctIndex: 1
      }
    ]
  },
  'herencia-polimorfismo': {
    key: 'herencia-polimorfismo',
    title: 'Quiz: Herencia y Polimorfismo',
    questions: [
      {
        prompt: "¿Qué palabra reservada se utiliza en Java para heredar de una clase padre?",
        options: ["inherits", ":", "implements", "extends"],
        correctIndex: 3
      },
      {
        prompt: "Si la clase Auto hereda de Vehiculo, ¿cómo llama Auto al constructor de Vehiculo?",
        options: ["super()", "this()", "parent()", "Vehiculo()"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué permite el polimorfismo en Java?",
        options: ["Guardar instancias de subclases (Auto, Moto, Bici) en una referencia de superclase (Vehiculo)", "Crear clases sin atributos", "Convertir Java a C++", "Ejecutar código sin JVM"],
        correctIndex: 0
      },
      {
        prompt: "¿Para qué sirve la anotación @Override?",
        options: ["Sobrecargar métodos", "Indicar al compilador que se reescribe un método heredado de la clase padre", "Borrar un atributo", "Crear una constante"],
        correctIndex: 1
      },
      {
        prompt: "¿Java permite la herencia múltiple directa de clases con 'extends'?",
        options: ["No, en Java una clase solo puede heredar de una única clase padre", "Sí, separadas por coma", "Solo en interfaces públicas", "Sí, usando public class"],
        correctIndex: 0
      }
    ]
  },
  'interfaces-contratos': {
    key: 'interfaces-contratos',
    title: 'Quiz: Interfaces y Contratos',
    questions: [
      {
        prompt: "¿Qué palabra reservada se usa para definir una interfaz en Java?",
        options: ["contract", "interface", "abstract class", "implements"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué palabra reservada usa una clase para implementar los métodos de una interfaz?",
        options: ["extends", "uses", "implements", "requires"],
        correctIndex: 2
      },
      {
        prompt: "¿Puede una clase en Java implementar MÚLTIPLES interfaces a la vez?",
        options: ["Sí, separadas por comas (ej: implements Conducible, Mantenible)", "No, máximo una interfaz", "Solo si es abstracta", "Solo con arreglos"],
        correctIndex: 0
      },
      {
        prompt: "Por defecto, los métodos declarados en una interfaz (sin body) son...",
        options: ["private final", "public abstract", "protected static", "void default"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué palabra clave permite agregar una implementación por defecto a un método dentro de una interfaz en Java 8+?",
        options: ["default", "static", "final", "virtual"],
        correctIndex: 0
      }
    ]
  },
  'composicion-agregacion': {
    key: 'composicion-agregacion',
    title: 'Quiz: Composición y Relaciones entre Objetos',
    questions: [
      {
        prompt: "¿Qué es la composición/asociación entre clases en POO?",
        options: ["Cuando una clase tiene como atributo una instancia de otra clase (relación Tiene-Un)", "Cuando una clase hereda de otra", "Cuando una función no retorna valor", "Cuando un arreglo tiene números"],
        correctIndex: 0
      },
      {
        prompt: "Si la clase Usuario tiene 'private Perrito mascota;', ¿cómo llamamos a un método de Perrito desde Usuario?",
        options: ["mascota.ladrar()", "Perrito.ladrar()", "this.ladrar()", "Usuario.mascota.ladrar()"],
        correctIndex: 0
      },
      {
        prompt: "Si un Usuario puede tener MÚLTIPLES perritos, ¿qué estructura de datos se utiliza?",
        options: ["Un arreglo 'Perrito[]' o una lista 'ArrayList<Perrito>'", "Un entero int", "Un String simple", "Un boolean"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo recorremos un arreglo 'Perrito[] mascotas' para hacerlos ladrar a todos?",
        options: ["for (Perrito p : mascotas) { p.ladrar(); }", "mascotas.ladrarAll()", "while(mascotas) { ladrar(); }", "if(mascotas) { p.ladrar(); }"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué ocurre si intentamos acceder a 'usuario.getMascota().ladrar()' cuando 'mascota' es null?",
        options: ["Ocurre una excepción NullPointerException", "Imprime vacio", "No compila", "Retorna false"],
        correctIndex: 0
      }
    ]
  },
  'proyecto-carrito-memoria': {
    key: 'proyecto-carrito-memoria',
    title: 'Quiz: Proyecto Carrito CRUD en Memoria',
    questions: [
      {
        prompt: "En un CRUD en memoria, ¿dónde residen los datos durante la ejecución?",
        options: ["En la memoria RAM mediante colecciones/arreglos de Java", "En un disco SSD externo", "En una base de datos MySQL", "En un archivo TXT remoto"],
        correctIndex: 0
      },
      {
        prompt: "Si deseamos agregar un ítem al carrito y el producto ya existe en él, ¿qué operación de CRUD realizamos sobre el ítem?",
        options: ["Update (Actualizamos sumando la cantidad)", "Create (Duplicamos la entrada)", "Delete (Eliminamos el carrito)", "Read (Imprimimos solo el total)"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo eliminamos un producto específico de un ArrayList de ítems en Java?",
        options: ["items.removeIf(item -> item.getProducto().getId() == targetId)", "items.deleteAll()", "items.clearMemory()", "items.popAll()"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo se calcula el monto total de un CarritoCompra que tiene 'ArrayList<ItemCarrito> items'?",
        options: ["Sumando el subtotal (precio * cantidad) de cada item mediante un bucle for/for-each", "Multiplicando la cantidad de carritos", "Ejecutando SELECT SUM()", "Llamando a System.total()"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo gestionamos la creación de múltiples carritos independientes?",
        options: ["Almacenando cada instancia de CarritoCompra dentro de una lista global de carritos (ArrayList<CarritoCompra>)", "Sobrescribiendo la misma variable siempre", "No es posible en Java", "Reiniciando la JVM"],
        correctIndex: 0
      }
    ]
  },
  'proyecto-tienda-mysql-dao': {
    key: 'proyecto-tienda-mysql-dao',
    title: 'Quiz: Proyecto Tienda MySQL & Patrón DAO',
    questions: [
      {
        prompt: "¿Cuál es el propósito del Patrón DAO (Data Access Object) en Java?",
        options: ["Separar la lógica de negocio de la lógica de acceso y persistencia a la base de datos", "Crear las interfaces gráficas de usuario", "Compilar el código a lenguaje ensamblador", "Reemplazar el uso de la memoria RAM"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué dependencia de Maven se requiere para conectar Java con MySQL?",
        options: ["mysql-connector-java", "postgres-driver", "spring-boot-starter", "sqlite-jdbc"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué clase de Java JDBC se utiliza para ejecutar consultas parametrizadas seguras contra inyección SQL?",
        options: ["PreparedStatement", "SimpleStatement", "QueryExecutor", "SqlBuffer"],
        correctIndex: 0
      },
      {
        prompt: "En la clase Conn/Conexion.java, ¿qué método de JDBC establece la conexión física con MySQL?",
        options: ["DriverManager.getConnection(url, user, password)", "Connection.open()", "MySQL.connect()", "System.getDatabase()"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué interfaz se utiliza para almacenar los resultados de una consulta SELECT en JDBC?",
        options: ["ResultSet", "DataRows", "SqlList", "QueryResult"],
        correctIndex: 0
      }
    ]
  }
};
