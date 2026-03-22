export interface TerminalQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface TerminalQuizDefinition {
  key: string;
  title: string;
  questions: TerminalQuizQuestion[];
}

export const terminalQuizBank: Record<string, TerminalQuizDefinition> = {
  'intro-terminal': {
    key: 'intro-terminal',
    title: 'Quiz: Introducción a la Terminal',
    questions: [
      {
        prompt: "¿Qué significa las siglas CLI?",
        options: ["Common List Interface", "Command Line Interface", "Code Logic Integration", "Central Link Item"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el intérprete de comandos más común en Linux?",
        options: ["PowerShell", "Bash", "CMD", "Internet Explorer"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama el 'superusuario' en un sistema Unix?",
        options: ["admin", "root", "boss", "supervisor"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando muestra quién eres en el sistema?",
        options: ["whoami", "id", "iamout", "user"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué hace el comando 'clear'?",
        options: ["Borra todos los archivos", "Limpia la pantalla de la terminal", "Cierra la sesión", "Apaga el monitor"],
        correctIndex: 1
      }
    ]
  },
  'navegacion': {
    key: 'navegacion',
    title: 'Quiz: Navegación del Sistema',
    questions: [
      {
        prompt: "¿Qué comando sirve para listar los archivos de una carpeta?",
        options: ["cd", "ls", "dir", "show"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando usamos para entrar en un directorio?",
        options: ["mv", "cd", "goto", "open"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa 'cd ..'?",
        options: ["Ir al inicio", "Subir un nivel (ir a la carpeta padre)", "Borrar la carpeta", "Reiniciar la terminal"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el comando para ver la ruta actual en la que estamos?",
        options: ["where", "pwd", "path", "locate"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué símbolo representa el directorio personal del usuario (Home)?",
        options: ["/", ".", "~", ".."],
        correctIndex: 2
      }
    ]
  },
  'manipulacion': {
    key: 'manipulacion',
    title: 'Quiz: Manipulación de Archivos',
    questions: [
      {
        prompt: "¿Qué comando crea una carpeta nueva?",
        options: ["touch", "mkdir", "create", "new-dir"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando se usa para crear un archivo vacío rápidamente?",
        options: ["mkdir", "touch", "add", "txt"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando elimina un archivo definitivamente?",
        options: ["del", "rm", "erase", "trash"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se copian archivos?",
        options: ["cp", "mv", "copy", "clone"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué comando sirve tanto para mover un archivo como para renombrarlo?",
        options: ["cp", "mv", "rename", "change"],
        correctIndex: 1
      }
    ]
  },
  'permisos': {
    key: 'permisos',
    title: 'Quiz: Permisos de Archivo',
    questions: [
      {
        prompt: "¿Qué comando cambia los permisos de un archivo?",
        options: ["chown", "chmod", "permit", "access"],
        correctIndex: 1
      },
      {
        prompt: "En permisos (775), ¿qué significa el primer 7?",
        options: ["Permisos para el Dueño", "Permisos para el Grupo", "Permisos para Otros", "Número de línea"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué permiso representa el número 4?",
        options: ["Escritura", "Lectura", "Ejecución", "Nada"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué permiso representa la letra 'x'?",
        options: ["Ecxtendido", "Execution (Ejecución)", "X-Ray", "Delete"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando cambia el DUEÑO de un archivo?",
        options: ["chmod", "chown", "sudo", "user-change"],
        correctIndex: 1
      }
    ]
  },
  'filtros-grep': {
    key: 'filtros-grep',
    title: 'Quiz: Grep y Filtros de Contenido',
    questions: [
      {
        prompt: "¿Qué comando muestra el contenido de un archivo en pantalla?",
        options: ["cat", "view", "show", "open"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué herramienta se usa para buscar patrones de texto dentro de archivos?",
        options: ["find", "grep", "search", "lookup"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo verías solo las primeras 10 líneas de un archivo?",
        options: ["start", "head", "top", "begin"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo verías las últimas líneas (ideal para logs)?",
        options: ["end", "tail", "bottom", "last"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando cuenta las palabras o líneas de un archivo?",
        options: ["count", "wc", "size", "len"],
        correctIndex: 1
      }
    ]
  },
  'redireccion': {
    key: 'redireccion',
    title: 'Quiz: Pipes y Redirecciones',
    questions: [
      {
        prompt: "¿Qué símbolo se usa para el 'Piping' (mandar la salida de un comando a otro)?",
        options: [">", "| (Tuberia)", ">>", "<"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué hace el símbolo '>'?",
        options: ["Suma números", "Sobrescribe la salida de un comando en un archivo", "Añade texto al final de un archivo", "Busca archivos"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué hace el símbolo '>>'?",
        options: ["Borra el archivo", "Añade (append) la salida al final de un archivo sin borrar lo anterior", "Redirige errores", "Es un comentario"],
        correctIndex: 1
      },
      {
        prompt: "¿Es posible encadenar múltiples comandos usando | ?",
        options: ["No, solo uno", "Sí, ilimitados (ls | grep | wc)", "Solo en servidores", "Solo en sistemas de 64 bits"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando ordena la salida de texto?",
        options: ["order", "sort", "organize", "rank"],
        correctIndex: 1
      }
    ]
  },
  'procesos': {
    key: 'procesos',
    title: 'Quiz: Gestión de Procesos',
    questions: [
      {
        prompt: "¿Qué comando muestra los procesos en tiempo real (monitor de sistema)?",
        options: ["ps", "top (o htop)", "show-cpu", "taskmgr"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando sirve para detener/matar un proceso?",
        options: ["stop", "kill", "die", "exit"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa el PID en un proceso?",
        options: ["Process Identifier (Identificador de Proceso)", "Personal Intro Data", "Program In Disk", "Priority Item Detail"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo verías todos los procesos que están corriendo en este momento?",
        options: ["ls", "ps aux", "cat /proc", "history"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando muestra el uso de memoria RAM?",
        options: ["ram", "free", "mem", "df"],
        correctIndex: 1
      }
    ]
  }
};
