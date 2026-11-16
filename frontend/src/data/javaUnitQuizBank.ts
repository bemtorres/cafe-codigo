export interface JavaUnitQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface JavaUnitQuizDefinition {
  key: string;
  title: string;
  questions: JavaUnitQuizQuestion[];
}

export const javaUnitQuizBank: Record<string, JavaUnitQuizDefinition> = {
  'intro-junit': {
    key: 'intro-junit',
    title: 'Quiz: Introducción a JUnit 5',
    questions: [
      {
        prompt: "¿Cuál es la anotación de JUnit 5 que marca un método como una prueba?",
        options: ["@Main", "@Test", "@Trial", "@Execute"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa que un test sea unitario?",
        options: ["Que prueba todo el software a la vez", "Que prueba una sola unidad lógica de código de forma aislada", "Que solo funciona en una computadora", "Que solo tiene una línea de código"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál anotación se usa para código que debe ejecutarse ANTES de cada test?",
        options: ["@Start", "@Initial", "@BeforeEach", "@Prepare"],
        correctIndex: 2
      },
      {
        prompt: "¿Es JUnit una librería o un lenguaje de programación?",
        options: ["Es un lenguaje hijo de Java", "Es una librería/framework para automatizar pruebas", "Es un compilador especial", "Es el motor de Java"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el objetivo principal del testing unitario?",
        options: ["Hacer que el código sea más largo", "Asegurar que cada pieza pequeña de lógica se comporte como se espera", "Eliminar la necesidad de programadores", "Probar la conexión a Internet"],
        correctIndex: 1
      }
    ]
  },
  'patron-aaa': {
    key: 'patron-aaa',
    title: 'Quiz: El Patrón AAA',
    questions: [
      {
        prompt: "¿Qué significan las siglas del patrón AAA?",
        options: ["Always Ask Anything", "Arrange, Act, Assert", "Apply, Add, Active", "Access, Assign, All"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué consiste la etapa de 'Arrange'?",
        options: ["En ejecutar la función a probar", "En preparar los datos y los objetos necesarios para el test", "En comprobar el resultado final", "En borrar los archivos"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué etapa se realiza la comprobación final de si el test pasó o no?",
        options: ["Act", "Arrange", "Execute", "Assert"],
        correctIndex: 3
      },
      {
        prompt: "Si estamos sumando 2+2, ¿en qué etapa guardamos el resultado que arroja nuestro código?",
        options: ["Act", "Arrange", "Assign", "Initialize"],
        correctIndex: 0
      },
      {
        prompt: "Un test bien estructurado bajo AAA suele tener...",
        options: ["Solo la etapa Act", "Todas las etapas mezcladas desordenadamente", "Tres bloques visuales claros e independientes", "Cientos de líneas sin comentarios"],
        correctIndex: 2
      }
    ]
  },
  'assertions': {
    key: 'assertions',
    title: 'Quiz: Assertions (Aseveraciones)',
    questions: [
      {
        prompt: "¿Qué método usarías para verificar que dos números son iguales?",
        options: ["assertTrue", "assertEquals", "assertSame", "assertNotNull"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué hace 'assertTrue(condicion)'?",
        options: ["Compara si la condición es igual a 2", "Pasa el test si la condición dentro de los paréntesis es verdadera", "Pasa el test si el programa no explota", "Detiene el test para depurar"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué ocurre si una aseveración falla en JUnit 5?",
        options: ["El programa se detiene y el test se marca como fallido (Rojo)", "El test continúa normalmente ignorando el error", "Se borra la carpeta del proyecto", "Se reinicia la computadora"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué método verifica que un objeto NO sea nulo?",
        options: ["assertNull", "assertEmpty", "assertNotNull", "assertExists"],
        correctIndex: 2
      },
      {
        prompt: "En assertEquals(esperado, actual), ¿qué va en el primer parámetro por convención?",
        options: ["El valor real que devolvió el código", "El valor que nosotros esperamos obtener", "El nombre del test", "Cualquier cosa"],
        correctIndex: 1
      }
    ]
  },
  'encapsulamiento-test': {
    key: 'encapsulamiento-test',
    title: 'Quiz: Testing Encapsulamiento',
    questions: [
      {
        prompt: "¿Qué se busca validar al testear Getters y Setters?",
        options: ["Que el código sea más lento", "Que la asignación y recuperación de estados privados del objeto sea correcta", "Que el atributo sea público", "Que el objeto use mucha RAM"],
        correctIndex: 1
      },
      {
        prompt: "Si un atributo solo debe aceptar números positivos, ¿dónde debería estar esa validación en POO?",
        options: ["En el Test", "En el Setter de la Clase", "En el método Main", "En una interfaz"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo verificamos en un test que un Setter funcionó?",
        options: ["Llamando al Getter del mismo atributo en el Assert", "Revisando el código visualmente", "No es posible verificarlo", "Imprimiéndolo en consola"],
        correctIndex: 0
      },
      {
        prompt: "Un test de 'estado inicial' verifica que...",
        options: ["El constructor asigne valores por defecto correctos", "Las variables tengan nombres bonitos", "La clase tenga muchos métodos", "El programa sea gratuito"],
        correctIndex: 0
      },
      {
        prompt: "¿Es correcto hacer un test que verifique un atributo privado directamente (sin getter)?",
        options: ["Sí, siempre", "No, el test debe interactuar con el objeto como lo haría el sistema externo (vía métodos públicos)", "Solo si eres el administrador", "Solo en Java 8"],
        correctIndex: 1
      }
    ]
  },
  'excepciones-test': {
    key: 'excepciones-test',
    title: 'Quiz: Pruebas de Excepciones',
    questions: [
      {
        prompt: "¿Qué método de JUnit 5 captura y valida que se lanzó una excepción específica?",
        options: ["assertCatch", "assertFail", "assertThrows", "try-catch"],
        correctIndex: 2
      },
      {
        prompt: "¿Por qué querríamos que un código 'explote' en un test?",
        options: ["Para ver bugs", "Para validar que el sistema se protege correctamente ante datos basura (Caminos negativos)", "Para que el test sea más difícil", "Por error"],
        correctIndex: 1
      },
      {
        prompt: "En assertThrows(TipoDeExcepcion.class, () -> { logic }), el segundo parámetro es:",
        options: ["Una variable", "Un número", "Una expresión Lambda que ejecuta el código que debería fallar", "Un comentario"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué sucede si el código dentro de un assertThrows NO lanza ninguna excepción?",
        options: ["El test falla", "El test pasa", "No sucede nada", "Se detiene el IDE"],
        correctIndex: 0
      },
      {
        prompt: "¿Podemos validar el mensaje de error de una excepción en un test?",
        options: ["No, solo el tipo", "Sí, capturando la excepción en una variable y verificando su mensaje con assertEquals", "Solo si usamos try-catch", "Es automático"],
        correctIndex: 1
      }
    ]
  },
  'logica-negocio-test': {
    key: 'logica-negocio-test',
    title: 'Quiz: Lógica de Negocio',
    questions: [
      {
        prompt: "¿Qué se entiende por 'Caminos de Ejecución'?",
        options: ["Las carpetas del proyecto", "Las diferentes rutas lógicas (IFs, Loops) que puede tomar un método", "Los cables de la PC", "Las descargas de Java"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es un buen enfoque para probar lógica compleja?",
        options: ["Hacer un solo test gigante", "Crear múltiples tests pequeños cubriendo cada caso límite (Boundary cases)", "No probar nada y esperar a producción", "Borrar los IFs"],
        correctIndex: 1
      },
      {
        prompt: "Si probamos un método 'calcularDescuento()', ¿cuántos tests mínimos deberíamos hacer?",
        options: ["Cero", "Uno", "Varios (sin descuento, descuento máximo, descuento inválido...)", "Solo el positivo"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué es un 'Boundary Case'?",
        options: ["Un caso en los límites (ej: probar con edad 0 o edad 100)", "Un error de compilación", "Una función vacía", "Un test infinito"],
        correctIndex: 0
      },
      {
        prompt: "¿Deben los test unitarios depender de una Base de Datos real?",
        options: ["Sí, siempre", "No, deberían usar datos estables en memoria para ser rápidos y consistentes", "Solo si es un test de integración", "Es indistinto"],
        correctIndex: 1
      }
    ]
  },
  'herencia-test': {
    key: 'herencia-test',
    title: 'Quiz: Herencia bajo Test',
    questions: [
      {
        prompt: "En un test de herencia, ¿qué debemos verificar principalmente?",
        options: ["Que el hijo tenga el mismo nombre que el padre", "Que el hijo posea el comportamiento básico heredado y sus variaciones polimórficas", "Que el padre sea privado", "Que no haya herencia"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué palabra clave de Java nos permite instanciar una subclase como si fuera de su tipo padre en un test?",
        options: ["instanceof", "new", "Es el concepto de Polimorfismo (Padre p = new Hijo())", "extends"],
        correctIndex: 2
      },
      {
        prompt: "Si el hijo sobrescribe un método (@Override), ¿qué Assertions debería pasar?",
        options: ["Las del padre obligatoriamente", "Las específicas que definimos para su nuevo comportamiento", "Ninguna", "Solo las que devuelven null"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo verificamos que un objeto es de una clase determinada?",
        options: ["assertTrue(objeto instanceof MiClase)", "assertEquals(objeto, MiClase)", "No se puede", "Usando el color"],
        correctIndex: 0
      },
      {
        prompt: "¿Podemos crear tests en una clase Padre que se ejecuten automáticamente para todos sus hijos?",
        options: ["No", "Sí, mediante tests en clases abstractas genéricas", "Solo en JUnit 4", "Usando @Override en el test"],
        correctIndex: 1
      }
    ]
  },
  'interfaces-test': {
    key: 'interfaces-test',
    title: 'Quiz: Interfaces y Contratos',
    questions: [
      {
        prompt: "¿Qué ventaja tiene testear una interfaz?",
        options: ["Ninguna", "Asegura que cualquier implementación futura cumpla obligatoriamente con los requerimientos del contrato", "Hace el código más corto", "Java corre más rápido"],
        correctIndex: 1
      },
      {
        prompt: "Si tenemos la interfaz 'IConexion', ¿qué deberíamos testear?",
        options: ["El código interno de la interfaz", "Las firmas de los métodos", "Que diferentes implementaciones (WiFi, Ethernet) devuelvan los resultados esperados ante los mismos métodos", "Nada"],
        correctIndex: 2
      },
      {
        prompt: "¿Se puede instanciar una interfaz con 'new' en un test?",
        options: ["Sí", "No, solo clases que la implementen", "Solo en Java 21", "Solo si es pública"],
        correctIndex: 1
      },
      {
        prompt: "Un 'Contrato' en programación significa:",
        options: ["Un documento legal", "Una promesa de que la clase tendrá ciertos métodos funcionales", "Un test infinito", "Una variable global"],
        correctIndex: 1
      },
      {
        prompt: "En un test de interfaz, verificamos el...",
        options: ["Cómo lo hace", "Qué hace (el comportamiento prometido)", "Quién lo hizo", "Dónde está"],
        correctIndex: 1
      }
    ]
  },
  'intro-mocks': {
    key: 'intro-mocks',
    title: 'Quiz: Intro a Mocks (Mockito)',
    questions: [
      {
        prompt: "¿Qué es un 'Mock'?",
        options: ["Un bug", "Un objeto simulado que imita el comportamiento de uno real de forma controlada", "Un virus", "Una variable estática"],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué usaríamos un Mock en lugar del objeto real?",
        options: ["Para que el test tarde más", "Para aislar el test de dependencias externas (bases de datos, APIs, archivos)", "Porque no sabemos programar", "Para ahorrar RAM"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué librería es el estándar de facto para Mocks en Java?",
        options: ["JUnit", "Mockito", "Selenium", "Spring"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa 'Stubbing' en Mockito?",
        options: ["Borrar el test", "Definir qué debe responder el mock cuando se llame a determinado método (Cuando pase X, responde Y)", "Crear un error", "Ejecutar la PC"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué hace 'verify(myMock).metodo()'?",
        options: ["Borra el método", "Comprueba que efectivamente se mandó a llamar a ese método durante la ejecución del test", "Lo cambia a público", "Lo ignora"],
        correctIndex: 1
      }
    ]
  },
  'proyecto-final': {
    key: 'proyecto-final',
    title: 'Quiz: Final',
    questions: [
      {
        prompt: "¿Qué indica una barra de color Verde en tu reporte de tests?",
        options: ["Éxito absoluto", "Que todos los tests pasaron satisfactoriamente", "Ambas son correctas", "Error leve"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el flujo ideal al desarrollar con calidad?",
        options: ["Programar todo y nunca probar", "Escribir el código, y luego asegurar su lógica con tests unitarios", "Testear solo lo que falle en producción", "Borrar los tests al terminar"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es TDD (Test Driven Development)?",
        options: ["Desarrollo de bases de datos", "Escribir el test ANTES que el código real", "Un tipo de monitor", "Una clase de Java"],
        correctIndex: 1
      },
      {
        prompt: "¿Los tests unitarios deben ser lentos o rápidos?",
        options: ["Lentos para ser profundos", "Muy rápidos (milisegundos) para poder ejecutarlos miles de veces al día", "Depende del clima", "Solo deben correr en servidores"],
        correctIndex: 1
      },
      {
        prompt: "¿Un test unitario garantiza que no hay bugs en todo el sistema?",
        options: ["Sí, detecta todo", "No, solo garantiza que la unidad probada funciona; se requieren otros tests para el sistema completo", "Solo si pasas de 100 tests", "Sí, si usas Mockito"],
        correctIndex: 1
      }
    ]
  }
};
