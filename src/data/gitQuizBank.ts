export interface GitQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface GitQuizDefinition {
  key: string;
  title: string;
  questions: GitQuizQuestion[];
}

export const gitQuizBank: Record<string, GitQuizDefinition> = {
  'intro-git': {
    key: 'intro-git',
    title: 'Quiz: ¿Qué es Git?',
    questions: [
      {
        prompt: "¿Quién creó Git (también creador de Linux)?",
        options: ["Linus Torvalds", "Bill Gates", "Satoshi Nakamoto", "Guido van Rossum"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué es Git técnicamente?",
        options: ["Una base de datos de usuarios", "Un sistema de control de versiones distribuido", "Un servidor web", "Un lenguaje de programación"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa que sea 'distribuido'?",
        options: ["Que solo funciona en internet", "Que cada desarrollador tiene una copia completa del historial del proyecto", "Que se distribuye gratis", "Que usa muchos cables"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué año se lanzó originalmente Git?",
        options: ["1995", "2005", "2015", "1980"],
        correctIndex: 1
      },
      {
        prompt: "¿Para qué sirve el control de versiones?",
        options: ["Para ver películas", "Para viajar al futuro", "Para guardar el historial de cambios y poder volver atrás si algo falla", "Para instalar Windows"],
        correctIndex: 2
      }
    ]
  },
  'flujo-local': {
    key: 'flujo-local',
    title: 'Quiz: El Flujo Local',
    questions: [
      {
        prompt: "¿Qué comando crea un repositorio nuevo?",
        options: ["git start", "git init", "git create", "git new"],
        correctIndex: 1
      },
      {
        prompt: "¿Cuál es el área temporal donde se preparan los cambios antes de guardarlos?",
        options: ["Commit", "Staging Area (Index)", "Workspace", "Server"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando sirve para pasar un archivo al Staging Area?",
        options: ["git add", "git save", "git commit", "git move"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué comando guarda los cambios permanentemente en el historial con un mensaje?",
        options: ["git save", "git upload", "git commit -m 'mensaje'", "git log"],
        correctIndex: 2
      },
      {
        prompt: "¿Cómo verías la lista de cambios realizados (historial)?",
        options: ["git show", "git info", "git log", "git list"],
        correctIndex: 2
      }
    ]
  },
  'ramas-git': {
    key: 'ramas-git',
    title: 'Quiz: Ramas (Branching)',
    questions: [
      {
        prompt: "¿Para qué sirve una rama (branch)?",
        options: ["Para borrar el código", "Para trabajar en una característica nueva sin romper el código principal", "Para unir dos archivos", "Para subir el código a la nube"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama normalmente la rama principal por defecto?",
        options: ["root", "main (o master)", "first", "final"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando crea una rama nueva?",
        options: ["git branch nombre", "git new nombre", "git switch nombre", "git branch -d nombre"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué comando sirve para 'saltar' o cambiar de una rama a otra?",
        options: ["git jump", "git checkout (o git switch)", "git move", "git go"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama el proceso de UNIR los cambios de una rama a otra?",
        options: ["Join", "Merge", "Pull", "Push"],
        correctIndex: 1
      }
    ]
  },
  'github-nube': {
    key: 'github-nube',
    title: 'Quiz: Git vs GitHub',
    questions: [
      {
        prompt: "¿Es lo mismo Git que GitHub?",
        options: ["Sí, son sinónimos", "No, Git es la herramienta local y GitHub es la plataforma en la nube", "GitHub es el lenguaje y Git el servidor", "Solo si eres de Microsoft"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué empresa es la dueña de GitHub actualmente?",
        options: ["Google", "Facebook", "Microsoft", "Amazon"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué comando sirve para 'empujar' tus cambios locales al servidor remoto?",
        options: ["git push", "git pull", "git upload", "git send"],
        correctIndex: 0
      },
      {
        prompt: "¿Cómo se llama la copia de un repositorio ajeno a tu cuenta personal?",
        options: ["Copy", "Fork", "Clone", "Branch"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando descarga por primera vez un repositorio de internet?",
        options: ["git download", "git clone", "git get", "git install"],
        correctIndex: 1
      }
    ]
  },
  'alternativas-git': {
    key: 'alternativas-git',
    title: 'Quiz: Ecosistema Git',
    questions: [
      {
        prompt: "¿Cuál de estas es otra plataforma de alojamiento Git famosa?",
        options: ["GitLab", "Dropbox", "Google Drive", "YouTube"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué plataforma pertenece a Atlassian (creadores de Jira)?",
        options: ["GitLab", "GitHub", "Bitbucket", "Gitea"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué ventaja tiene GitLab sobre GitHub para algunas empresas?",
        options: ["Es más bonito", "Permite mayor facilidad para instalarse en servidores propios (Self-hosted)", "Es gratis para siempre", "Solo funciona con Linux"],
        correctIndex: 1
      },
      {
        prompt: "¿A quién pertenece Bitbucket?",
        options: ["Atlassian", "Microsoft", "Canonical", "Google"],
        correctIndex: 0
      },
      {
        prompt: "¿Existe Git solo para servidores?",
        options: ["Sí", "No, puedes usarlo localmente sin internet", "Solo si pagas", "Solo en Mac"],
        correctIndex: 1
      }
    ]
  },
  'pull-requests': {
    key: 'pull-requests',
    title: 'Quiz: Trabajo en Equipo',
    questions: [
      {
        prompt: "¿Qué es un Pull Request (o Merge Request)?",
        options: ["Una petición para borrar el código", "Una solicitud formal para que revisen tus cambios y los unan al proyecto principal", "Un error del servidor", "Un tipo de rama"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué ocurre cuando dos personas tocan la MISMA línea de código en el mismo archivo?",
        options: ["Se borra todo", "Ocurre un Conflicto (Conflict) que el humano debe resolver manualmente", "Git elige el cambio más largo", "El servidor explota"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué comando actualiza tu repositorio local con lo nuevo que hay en el servidor?",
        options: ["git update", "git pull", "git sync", "git refresh"],
        correctIndex: 1
      },
      {
        prompt: "¿Es posible usar Git para proyectos que no sean de programación?",
        options: ["No, solo archivos .code", "Sí, cualquier archivo de texto plano o binario puede versionarse", "Solo en archivos Word", "Solo si usas Markdown"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué consiste el flujo de 'Open Source'?",
        options: ["En pagar por el código", "En colaborar en proyectos públicos de forma abierta", "En vender secretos", "En usar código cerrado"],
        correctIndex: 1
      }
    ]
  }
};
