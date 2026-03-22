export interface EcoQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface EcoQuizDefinition {
  key: string;
  title: string;
  questions: EcoQuizQuestion[];
}

export const ecosystemsQuizBank: Record<string, EcoQuizDefinition> = {
  'que-es-lenguaje': {
    key: 'que-es-lenguaje',
    title: 'Quiz: ¿Qué es un Lenguaje?',
    questions: [
      {
        prompt: "¿Cuál es el propósito real de un lenguaje de programación?",
        options: ["Hacer que los humanos se sientan listos", "Traducir lógica humana a instrucciones que la CPU pueda ejecutar", "Cerrar pestañas de Chrome", "Instalar virus"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué lenguaje se considera de 'bajo nivel'?",
        options: ["Swift", "Ensamblador (Assembly)", "Java", "Python"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama el proceso de transformar código fuente en un archivo ejecutable (0s y 1s) de una vez?",
        options: ["Interpretación", "Compilación", "Depuración", "Instalación"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es un lenguaje interpretado?",
        options: ["Uno que se ejecuta línea a línea por otro programa", "Uno que no usa letras", "Uno que solo sirve para juegos", "Uno que habla por voz"],
        correctIndex: 0
      },
      {
        prompt: "¿Es HTML un lenguaje de programación real?",
        options: ["Sí, para lógica", "No, es un lenguaje de marcado para estructura", "Solo si lleva CSS", "Solo en servidores"],
        correctIndex: 1
      }
    ]
  },
  'compilados-java-csharp': {
    key: 'compilados-java-csharp',
    title: 'Quiz: Java y C# (Ecosistemas)',
    questions: [
      {
        prompt: "¿A qué lenguaje pertenece el framework Spring Boot?",
        options: ["C#", "Java", "Python", "JavaScript"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el motor de videojuegos más famoso que usa C#?",
        options: ["Unreal Engine", "Unity", "Godot (solo GDScript)", "Roblox"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama el entorno de ejecución de Java?",
        options: [".NET Runtime", "JVM (Java Virtual Machine)", "Node.js", "Python REPL"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué se suelen usar Java y C# principalmente en la industria?",
        options: ["Backend empresarial, banca y juegos", "Solo para páginas personales", "Solo para inteligencia artificial", "Para hackear la NASA"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué gigante tecnológico impulsa el lenguaje C#?",
        options: ["Google", "Microsoft", "Oracle", "Meta"],
        correctIndex: 1
      }
    ]
  },
  'web-javascript': {
    key: 'web-javascript',
    title: 'Quiz: JavaScript y la Web',
    questions: [
      {
        prompt: "¿Cuál es el único lenguaje que los navegadores web pueden ejecutar nativamente?",
        options: ["Python", "JavaScript", "C++", "Ruby"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué entorno permite ejecutar JavaScript en un SERVIDOR?",
        options: ["Vercel", "Node.js (o Deno/Bun)", "Chrome", "Safari"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál de estos es un framework FRONTEND famoso de JavaScript?",
        options: ["Laravel", "React", "Django", "Entity Framework"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué sirve el gestor de paquetes NPM?",
        options: ["Para instalar juegos", "Para instalar librerías y dependencias de JavaScript", "Para limpiar la RAM", "Para subir archivos al FTP"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es TypeScript?",
        options: ["Un lenguaje nuevo que no usa JS", "JavaScript con tipos (ayuda a evitar errores)", "Un editor de texto", "Un virus"],
        correctIndex: 1
      }
    ]
  },
  'python-ia': {
    key: 'python-ia',
    title: 'Quiz: Python e Inteligencia Artificial',
    questions: [
      {
        prompt: "¿Por qué Python es el favorito para IA y Ciencia de Datos?",
        options: ["Porque es el más rápido de ejecutar", "Por su sintaxis simple y gran cantidad de librerías científicas", "Porque lo inventó ChatGPT", "Porque no usa memoria"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué framework de Python es muy común para DESARROLLO WEB?",
        options: ["React", "Django (o Flask)", "Spring", "Angular"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál de estas librerías es para Inteligencia Artificial (Deep Learning)?",
        options: ["PyTorch", "Excel.py", "Wordpress", "Query.js"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué significa que Python sea un lenguaje 'pegamento'?",
        options: ["Que se pega a los servidores", "Que puede unir fácilmente diferentes componentes escritos en otros lenguajes", "Que es lento", "Que usa muchos archivos"],
        correctIndex: 1
      },
      {
        prompt: "¿Python es compilado o interpretado?",
        options: ["Siempre puro compilado", "Interpretado (aunque usa bytecode)", "No es ninguna de las dos", "Es binario puro"],
        correctIndex: 1
      }
    ]
  },
  'mobile-nativos': {
    key: 'mobile-nativos',
    title: 'Quiz: El Mundo Mobile',
    questions: [
      {
        prompt: "¿Cuál es el lenguaje moderno para desarrollo NATIVO en Android?",
        options: ["Swift", "Kotlin", "C++", "PHP"],
        correctIndex: 1
      },
      {
        prompt: "¿Y para el caso de iPhone (iOS)?",
        options: ["Java", "Swift", "Dart", "Python"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué framework de Meta permite crear apps para iOS y Android con UN SOLO código (Híbrido)?",
        options: ["Unity", "React Native", "Flutter", "Ionic"],
        correctIndex: 1
      },
      {
        prompt: "¿De quién es Flutter (framework que usa el lenguaje Dart)?",
        options: ["Meta", "Google", "Microsoft", "Apple"],
        correctIndex: 1
      },
      {
        prompt: "¿Por qué alguien elegiría desarrollo NATIVO sobre híbrido?",
        options: ["Porque es más barato", "Por mayor rendimiento y acceso total a funciones del hardware (cámara, sensores)", "Para trabajar menos", "Porque Apple lo prohíbe"],
        correctIndex: 1
      }
    ]
  }
};
