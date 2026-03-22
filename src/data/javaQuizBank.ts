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
  'poo-pilares': {
    key: 'poo-pilares',
    title: 'Quiz: Herencia y Polimorfismo',
    questions: [
      {
        prompt: "¿Qué palabra reservada se usa en Java para heredar de una clase (ej. Guerrero hereda de Personaje)?",
        options: ["inherits", ":", "implements", "extends"],
        correctIndex: 3
      },
      {
        prompt: "¿Para qué sirve la anotación @Override?",
        options: ["Para sobrecargar un método", "Para indicar al compilador que se desea sobrescribir un método heredado del padre", "Para destruir la clase anterior", "Para detener la ejecución de errores silenciosos"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se invoca un método o el constructor de la clase padre directamente desde la clase hija?",
        options: ["Con la palabra 'super'", "Con 'this'", "Llamando directo clase.Padre()", "No es posible en Java"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué palabra clave se usa para crear un contrato donde solo hay declaración de comportamiento vacío y obligatorio?",
        options: ["abstract", "interface", "virtual", "contract"],
        correctIndex: 1
      },
      {
        prompt: "¿Soporta Java la herencia múltiple de CLASES (extender de dos o más clases al mismo tiempo)?",
        options: ["No, solo soporta heredar de una clase padre", "Sí, extendiendo separadas por coma", "Solo en JDK 17 o superior", "Sí, pero es mala práctica"],
        correctIndex: 0
      }
    ]
  }
};
