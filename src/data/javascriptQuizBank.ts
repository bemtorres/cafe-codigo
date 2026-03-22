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
  'dom': {
    key: 'dom',
    title: 'Quiz: Manipular el DOM',
    questions: [
      {
        prompt: "¿Qué significa DOM?",
        options: ["Data Object Model", "Document Object Model", "Direct Operation Mode", "Digital Object Main"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué método se usa para seleccionar un elemento por su ID?",
        options: ["getElementByClass", "querySelector", "getElementById", "selectById"],
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
  }
};
