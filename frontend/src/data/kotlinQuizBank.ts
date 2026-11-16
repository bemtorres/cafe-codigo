export interface KotlinQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface KotlinQuizDefinition {
  key: string;
  title: string;
  questions: KotlinQuizQuestion[];
}

export const kotlinQuizBank: Record<string, KotlinQuizDefinition> = {
  introduccion: {
    key: 'introduccion',
    title: 'Quiz: El comienzo en Kotlin',
    questions: [
      {
        prompt: '¿Quién desarrolló Kotlin y en qué año se lanzó oficialmente?',
        options: ['Google en 2017', 'JetBrains en 2011', 'Microsoft en 2015', 'Oracle en 2014'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cuál es la función principal para ejecutar código en Kotlin?',
        options: ['void main()', 'public static void main()', 'fun main()', 'def main()'],
        correctIndex: 2,
      },
      {
        prompt: '¿Cómo se imprime un mensaje en Kotlin?',
        options: ['echo("Hola")', 'console.log("Hola")', 'print("Hola")', 'System.out.println("Hola")'],
        correctIndex: 2,
      },
      {
        prompt: 'Kotlin compila principalmente hacia...',
        options: ['Bytecode de Python', 'JavaScript nativo', 'Bytecode de la JVM', 'C nativo'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué IDE oficial ofrece soporte completo para Kotlin?',
        options: ['Visual Studio Code', 'IntelliJ IDEA', 'Eclipse', 'Sublime Text'],
        correctIndex: 1,
      },
    ],
  },
  'variables-y-tipos': {
    key: 'variables-y-tipos',
    title: 'Quiz: Variables y tipos',
    questions: [
      {
        prompt: '¿Cuál keyword declara una variable que NO puede reasignarse?',
        options: ['var', 'val', 'const', 'let'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué tipo de dato infiere Kotlin para val x = 3.14?',
        options: ['Int', 'Double', 'Float', 'Number'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se declara una variable mutable de tipo String?',
        options: ['val nombre: String = "Ana"', 'var nombre: String = "Ana"', 'String nombre = "Ana"', 'mutable nombre = "Ana"'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cuál es la diferencia principal entre val y var?',
        options: ['val es para texto, var para números', 'val es inmutable, var es mutable', 'val es global, var es local', 'No hay diferencia'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué resultado imprime: val x: Int = 10; println(x.toDouble())?',
        options: ['10', '10.0', '"10"', 'Error de compilación'],
        correctIndex: 1,
      },
    ],
  },
  'strings-y-formato': {
    key: 'strings-y-formato',
    title: 'Quiz: Strings y formato',
    questions: [
      {
        prompt: '¿Cómo se inserted una variable dentro de un string en Kotlin?',
        options: ['"Hola {nombre}"', '"Hola $nombre"', '"Hola #nombre"', '"Hola %nombre"'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace la función trim() en un string?',
        options: ['Elimina caracteres especiales', 'Elimina espacios al inicio y final', 'Convierte a mayúsculas', 'Invierte el string'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo accedes a una expresión compleja dentro de un template?',
        options: ['$variable', '${expresion}', '#{expresion}', '@(expresion)'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cuál es la longitud del string "Kotlin"?',
        options: ['5', '6', '7', 'Depende del encoding'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace .replace("a", "o") en el string "kawaii"?',
        options: ['"kowaii"', '"kowaoi"', '"kawaoi"', '"kawaii"'],
        correctIndex: 0,
      },
    ],
  },
  condicionales: {
    key: 'condicionales',
    title: 'Quiz: Condicionales',
    questions: [
      {
        prompt: '¿Qué sustituye al switch/case de Java en Kotlin?',
        options: ['select', 'when', 'match', 'case'],
        correctIndex: 1,
      },
      {
        prompt: 'En Kotlin, ¿el if/else es una expresión?',
        options: ['No, solo es una statements', 'Sí, puede devolver un valor', 'Solo en Kotlin 2.0', 'Depende del tipo de retorno'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se escribe un when que verifique un rango?',
        options: ['when(x) { in 1..10 -> "bajo" }', 'when(x) { 1-10 -> "bajo" }', 'when(x) { between(1,10) }', 'when(x >= 1 && x <= 10)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué resultado produce: val x = if (true) 5 else 0 println(x)?',
        options: ['null', '5', '0', 'Error de compilación'],
        correctIndex: 1,
      },
      {
        prompt: '¿Se puede usar when sin argumento en Kotlin?',
        options: ['No, nunca', 'Sí, evaluando condiciones booleanas', 'Solo con enters', 'Solo en versiones recientes'],
        correctIndex: 1,
      },
    ],
  },
  bucles: {
    key: 'bucles',
    title: 'Quiz: Bucles',
    questions: [
      {
        prompt: '¿Cómo se crea un bucle que vaya del 1 al 10 inclusive?',
        options: ['for (i in 1..10)', 'for (i in 1 until 10)', 'for (i in 0 to 10)', 'for (i = 1; i <= 10; i++)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué hace "downTo" en un rango?',
        options: ['Incluye el límite superior', 'Cuenta de mayor a menor', 'Filtra números pares', 'Crea un bucle infinito'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se salta a la siguiente iteración en un bucle?',
        options: ['skip', 'continue', 'next', 'pass'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué imprime: repeat(3) { print("K") }?',
        options: ['K', 'KK', 'KKK', 'KKKK'],
        correctIndex: 2,
      },
      {
        prompt: '¿Cuál es la diferencia entre "1..10" y "1 until 10"?',
        options: ['No hay diferencia', '1 until 10 excluye el 10', '1..10 es solo pares', '1 until 10 incluye negativos'],
        correctIndex: 1,
      },
    ],
  },
  funciones: {
    key: 'funciones',
    title: 'Quiz: Funciones',
    questions: [
      {
        prompt: '¿Qué keyword define una función en Kotlin?',
        options: ['function', 'func', 'fun', 'def'],
        correctIndex: 2,
      },
      {
        prompt: '¿Cómo se define una función con retorno explícito?',
        options: ['fun sumar(a: Int, b: Int): Int', 'fun sumar(a, b) -> Int', 'Int sumar(a, b)', 'def sumar(a, b): Int'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué es una "expresión de función" en Kotlin?',
        options: ['Una función con return explícito', 'Una función cuyo cuerpo es una sola expresión con =', 'Una función anónima', 'Una función dentro de otra'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se asigna un valor por defecto a un parámetro?',
        options: ['fun saludar(nombre = "Mundo")', 'fun saludar(nombre?: "Mundo")', 'fun saludar(nombre ?? "Mundo")', 'fun saludar(default nombre)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué imprime: fun doble(x: Int) = x * 2; println(doble(5))?',
        options: ['5', '10', '25', 'Error'],
        correctIndex: 1,
      },
    ],
  },
  nulabilidad: {
    key: 'nulabilidad',
    title: 'Quiz: Null Safety',
    questions: [
      {
        prompt: '¿Qué símbolo indica que un tipo puede ser nullable?',
        options: ['*', '&', '?', '!'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué hace el operador Elvis (?:) ?',
        options: ['Lanza una excepción si es null', 'Devuelve un valor por defecto si es null', 'Convierte null a 0', 'Invierte el booleano'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace el operador !! (non-null assertion)?',
        options: ['Convierte a no-nullable', 'Lanza NullPointerException si es null', 'Crea una copia del objeto', 'Verifica el tipo'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cuál es la forma segura de acceder a una propiedad nullable?',
        options: ['variable.property', 'variable!!.property', 'variable?.property', 'variable#property'],
        correctIndex: 2,
      },
      {
        prompt: '¿Qué hace .let { } en un objeto nullable?',
        options: ['Lo convierte a String', 'Ejecuta un bloque solo si no es null', 'Lo hace inmutable', 'Lo copia'],
        correctIndex: 1,
      },
    ],
  },
  colecciones: {
    key: 'colecciones',
    title: 'Quiz: Colecciones',
    questions: [
      {
        prompt: '¿Cómo se crea una lista inmutable en Kotlin?',
        options: ['mutableListOf(1,2,3)', 'listOf(1,2,3)', 'arrayOf(1,2,3)', 'ArrayList(1,2,3)'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué método filtr elementos de una lista según una condición?',
        options: ['select()', 'filter()', 'find()', 'where()'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace .map { it * 2 } en una lista?',
        options: ['Filtra elementos', 'Transforma cada elemento multiplicándolo por 2', 'Ordena la lista', 'Cuenta los elementos'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se crea un Map (diccionario) en Kotlin?',
        options: ['mapOf("a" to 1, "b" to 2)', 'dict("a": 1, "b": 2)', '{"a": 1, "b": 2}', 'HashMap("a" = 1)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué hace .reduce { acc, i -> acc + i } en una lista?',
        options: ['Elimina duplicados', 'Suma todos los elementos en uno solo', 'Ordena la lista', 'Invierte la lista'],
        correctIndex: 1,
      },
    ],
  },
  'clases-y-objetos': {
    key: 'clases-y-objetos',
    title: 'Quiz: Clases y Objetos',
    questions: [
      {
        prompt: '¿Qué es una "data class" en Kotlin?',
        options: ['Una clase con base de datos', 'Una clase que genera equals(), hashCode(), toString() automáticamente', 'Una clase abstracta', 'Una clase singleton'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se crea un singleton en Kotlin?',
        options: ['class Singleton', 'object Singleton', 'single Singleton', 'static Singleton'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué keyword permite que una clase sea heredada?',
        options: ['virtual', 'open', 'abstract', 'extend'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se define un constructor primario?',
        options: ['class Persona constructor(nombre: String)', 'class Persona(nombre: String)', 'class Persona { new(nombre: String) }', 'class Persona(nombre)'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué imprime: data class User(val name: String); println(User("Ana"))?',
        options: ['User@3f2a1b', 'User(name=Ana)', '{name: "Ana"}', 'Error'],
        correctIndex: 1,
      },
    ],
  },
  'interfaces-y-herencia': {
    key: 'interfaces-y-herencia',
    title: 'Quiz: Interfaces y Polimorfismo',
    questions: [
      {
        prompt: '¿Qué diferencia hay entre abstract class e interface en Kotlin?',
        options: ['No hay diferencia', 'Una clase abstracta puede tener constructores, una interface no', 'Las interfaces son más rápidas', 'Las clases abstractas no pueden tener métodos'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué es una "sealed class"?',
        options: ['Una clase privada', 'Una clase con jerarquía restringida al mismo archivo', 'Una clase sellada con PDF', 'Una clase inmutable'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo se verifica el tipo de un objeto?',
        options: ['typeof x', 'x is Tipo', 'x instanceof Tipo', 'x.type()'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace el operador "as" en Kotlin?',
        options: ['Crea un alias', 'Hace un casting (conversión de tipo)', 'Importa un paquete', 'Define una constante'],
        correctIndex: 1,
      },
      {
        prompt: '¿Puede una clase implementar múltiples interfaces?',
        options: ['No, solo una', 'Sí, ilimitadas', 'Solo dos', 'Depende del compilador'],
        correctIndex: 1,
      },
    ],
  },
  'lambdas-y-higher-order': {
    key: 'lambdas-y-higher-order',
    title: 'Quiz: Lambdas y Scope Functions',
    questions: [
      {
        prompt: '¿Cómo se escribe una lambda en Kotlin?',
        options: ['function() {}', '{ parametro -> cuerpo }', 'lambda() => {}', '() -> {}'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué representa "it" dentro de una lambda?',
        options: ['La variable global', 'El parámetro implícito único', 'Un iterador', 'El contexto actual'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace .apply { } en un objeto?',
        options: ['Ejecuta el bloque y retorna el objeto', 'Filtra el objeto', 'Clona el objeto', 'Retorna Unit'],
        correctIndex: 0,
      },
      {
        prompt: '¿Cuál es la diferencia entre let y also?',
        options: ['No hay diferencia', 'let retorna el resultado del bloque, also retorna el objeto original', 'also es más rápido', 'let solo funciona con nullables'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace .run { } en un objeto?',
        options: ['Ejecuta el bloque con el objeto como receptor y retorna el resultado', 'Ejecuta el bloque en un hilo separado', 'Crea una coroutine', 'Lanza una excepción'],
        correctIndex: 0,
      },
    ],
  },
  excepciones: {
    key: 'excepciones',
    title: 'Quiz: Excepciones',
    questions: [
      {
        prompt: '¿Qué bloques componen el manejo de excepciones en Kotlin?',
        options: ['try/catch/finally', 'try/rescue/ensure', 'begin/catch/end', 'handle/except/finally'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué hace throw en Kotlin?',
        options: ['Captura una excepción', 'Lanza una excepción', 'Ignora una excepción', 'Imprime una excepción'],
        correctIndex: 1,
      },
      {
        prompt: '¿Es obligatorio usar finally en Kotlin?',
        options: ['Sí, siempre', 'No, es opcional', 'Solo con checked exceptions', 'Depende del IDE'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué tipo de excepción lanza: throw IllegalArgumentException("msg")?',
        options: ['RuntimeException', 'Unchecked exception', 'Compile-time exception', 'NullPointerException'],
        correctIndex: 1,
      },
      {
        prompt: '¿Puede un try/catch devolver un valor en Kotlin?',
        options: ['No, nunca', 'Sí, como expresión', 'Solo con var', 'Solo si hay finally'],
        correctIndex: 1,
      },
    ],
  },
  'proyecto-agenda': {
    key: 'proyecto-agenda',
    title: 'Quiz: Proyecto Agenda de Contactos',
    questions: [
      {
        prompt: '¿Qué tipo de colección es ideal para almacenar contactos en una agenda?',
        options: ['List<String>', 'MutableList<Contacto>', 'Array<Int>', 'Set<Double>'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué data class representaría mejor un contacto?',
        options: ['class Contacto(nombre, telefono)', 'data class Contacto(val nombre: String, val telefono: String)', 'object Contacto', 'typealias Contacto = String'],
        correctIndex: 1,
      },
      {
        prompt: '¿Cómo eliminarías un contacto de la lista?',
        options: ['lista.remove(contacto)', 'lista.delete(contacto)', 'lista.eliminar(contacto)', 'lista -= contacto'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué función de búsqueda encontraría un contacto por nombre?',
        options: ['lista.find { it.nombre == nombreBuscado }', 'lista.search(nombreBuscado)', 'lista.get(nombreBuscado)', 'lista(nombreBuscado)'],
        correctIndex: 0,
      },
      {
        prompt: '¿Qué patrón de UI usarías para el menú de la agenda?',
        options: ['Un bucle while con println y readLine()', 'Una interfaz gráfica obligatoria', 'Un archivo HTML', 'Una base de datos'],
        correctIndex: 0,
      },
    ],
  },
  'coroutines-intro': {
    key: 'coroutines-intro',
    title: 'Quiz: Introducción a Coroutines',
    questions: [
      {
        prompt: '¿Qué keyword marca una función como suspendible?',
        options: ['async', 'suspend', 'await', 'yield'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace launch { } en una coroutine?',
        options: ['Espera a que termine', 'Lanza una tarea en segundo plano sin bloquear', 'Detiene el programa', 'Crea un hilo nuevo'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué retorna async { }?',
        options: ['Unit', 'Un Deferred<T> (resultado futuro)', 'Un String', 'Un Boolean'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué hace delay(1000) dentro de una coroutine?',
        options: ['Detiene el hilo principal', 'Pausa la coroutine 1 segundo sin bloquear el hilo', 'Espera 1 segundo bloqueando todo', 'Lanza una excepción'],
        correctIndex: 1,
      },
      {
        prompt: '¿Qué función cambia el contexto de ejecución de una coroutine?',
        options: ['switchContext()', 'withContext()', 'changeThread()', 'moveTo()'],
        correctIndex: 1,
      },
    ],
  },
};
