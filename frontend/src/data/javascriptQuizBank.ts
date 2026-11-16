export interface JSQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface JSQuizDefinition {
  key: string;
  title: string;
  questions: JSQuizQuestion[];
}

export const javascriptQuizBank: Record<string, JSQuizDefinition> = {
  'introduccion': {
    key: 'introduccion',
    title: 'Quiz: Hola Mundo JS',
    questions: [
      {
        prompt: "¿Qué comando se usa para imprimir un mensaje en la consola del navegador?",
        options: ["print()", "console.log()", "document.write()", "alert()"],
        correctIndex: 1
      },
      {
        prompt: "¿Dónde se puede ejecutar código JavaScript?",
        options: ["Solo en el Navegador", "Solo en el Servidor (Node.js)", "En ambos", "Solo en archivos .html"],
        correctIndex: 2
      }
    ]
  },
  'variables': {
    key: 'variables',
    title: 'Quiz: Variables (let/const)',
    questions: [
      {
        prompt: "¿Cuál de estas formas de declarar variables NO permite re-asignar un valor después?",
        options: ["let", "var", "const", "assign"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué tipo de dato devuelve typeof 'Hola' ?",
        options: ["number", "text", "string", "object"],
        correctIndex: 2
      }
    ]
  },
  'operadores': {
    key: 'operadores',
    title: 'Quiz: Operadores en JS',
    questions: [
      {
        prompt: "¿Cuál es el resultado de 10 === '10'?",
        options: ["true", "false", "undefined", "NaN"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué operador se usa para el resto o módulo de una división?",
        options: ["/", "%", "&", "mod"],
        correctIndex: 1
      }
    ]
  },
  'condicionales': {
    key: 'condicionales',
    title: 'Quiz: Decisiones (If/Else)',
    questions: [
      {
        prompt: "¿Cómo se escribe un 'si no' en JavaScript?",
        options: ["otherwise", "else", "elseif", "then"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es la sintaxis correcta de un Switch?",
        options: ["switch(x) { case 1: ... }", "switch x do ...", "if switch(x) ...", "x.switch()"],
        correctIndex: 0
      }
    ]
  },
  'bucles': {
    key: 'bucles',
    title: 'Quiz: Bucles en JS',
    questions: [
      {
        prompt: "¿Cuál es el bucle que siempre se ejecuta al menos una vez?",
        options: ["for", "while", "do...while", "forEach"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo paramos un bucle por completo?",
        options: ["stop", "exit", "break", "return"],
        correctIndex: 2
      }
    ]
  },
  'funciones': {
    key: 'funciones',
    title: 'Quiz: Funciones & Arrow',
    questions: [
      {
        prompt: "¿Cómo se define una Arrow Function correctamente?",
        options: ["function => {}", "() => {}", "arrow func() {}", "def f() => {}"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué palabra reservada sirve para que una función envíe un valor de vuelta?",
        options: ["send", "output", "return", "back"],
        correctIndex: 2
      }
    ]
  },
  'arreglos': {
    key: 'arreglos',
    title: 'Quiz: Arreglos y Métodos',
    questions: [
      {
        prompt: "¿Qué método se usa para añadir un elemento al FINAL de un arreglo?",
        options: ["add()", "push()", "pop()", "shift()"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál de estos métodos crea un NUEVO arreglo basado en el original?",
        options: ["forEach", "map", "index", "find"],
        correctIndex: 1
      }
    ]
  },
  'dom': {
    key: 'dom',
    title: 'Quiz: Manipular el DOM',
    questions: [
      {
        prompt: "¿Qué método se usa para seleccionar múltiples elementos con un selector CSS?",
        options: ["getElementById", "querySelector", "querySelectorAll", "getElements"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo se cambia el contenido de texto de un elemento seleccionado?",
        options: [".text()", ".value", ".textContent", ".setHTML()"],
        correctIndex: 2
      }
    ]
  },
  'eventos': {
    key: 'eventos',
    title: 'Quiz: Eventos y Click',
    questions: [
      {
        prompt: "¿Cómo se llama al método para escuchar un evento como un 'click'?",
        options: ["addListener()", "addEventListener()", "onClick()", "startEvent()"],
        correctIndex: 1
      },
      {
        prompt: "En un evento, ¿qué objeto contiene la información de lo que ocurrió?",
        options: ["info", "event (e)", "context", "data"],
        correctIndex: 1
      }
    ]
  },
  'async': {
    key: 'async',
    title: 'Quiz: Fetch y Promesas',
    questions: [
      {
        prompt: "¿Qué palabra clave hace que una función devuelva automáticamente una Promesa?",
        options: ["await", "async", "promise", "defer"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando se usa para pedir datos a una API externa?",
        options: ["get()", "fetch()", "request()", "api()"],
        correctIndex: 1
      }
    ]
  }
};
