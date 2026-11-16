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
  },
  'git-flow': {
    key: 'git-flow',
    title: 'Quiz: Git Flow',
    questions: [
      {
        prompt: "¿Qué es Git Flow en la práctica?",
        options: [
          "Un comando obligatorio de Git llamado git flow",
          "Un modelo de convenciones sobre ramas (main, develop, feature, release, hotfix)",
          "Lo mismo que GitHub Flow",
          "Solo sirve para proyectos en Bitbucket",
        ],
        correctIndex: 1,
      },
      {
        prompt: "En Git Flow, ¿qué rama representa el código en producción?",
        options: ["develop", "feature/main", "main (o master)", "hotfix"],
        correctIndex: 2,
      },
      {
        prompt: "¿Desde qué rama parten las ramas feature/*?",
        options: ["main", "hotfix", "develop", "release"],
        correctIndex: 2,
      },
      {
        prompt: "¿Para qué sirve una rama release/*?",
        options: [
          "Para borrar el historial",
          "Para preparar una versión (ajustes finales antes de etiquetar y fusionar a main)",
          "Para guardar secretos del equipo",
          "Para reemplazar a develop",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Qué es un hotfix en Git Flow?",
        options: [
          "Un merge sin revisión de código",
          "Una rama de corrección urgente que parte de main y se integra en main y develop al terminar",
          "Un commit sin mensaje descriptivo",
          "Una rama exclusiva de GitLab",
        ],
        correctIndex: 1,
      },
      {
        prompt: "En el ejemplo del equipo «Café API», ¿quién aprueba los merges a main?",
        options: [
          "Mateo (desarrollador)",
          "Diego (QA)",
          "Lucía (tech lead)",
          "Valentina (DevOps)",
        ],
        correctIndex: 2,
      },
    ],
  },
  'trunk-based': {
    key: 'trunk-based',
    title: 'Quiz: Trunk-Based Development',
    questions: [
      {
        prompt: "En Trunk-Based Development, ¿qué es el trunk?",
        options: [
          "Una rama de respaldo que nadie modifica",
          "La rama principal (casi siempre main) donde todos integran con alta frecuencia",
          "Lo mismo que develop en Git Flow",
          "Solo la rama de documentación",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Cada cuánto tiempo suelen mergearse los cambios en Trunk-Based?",
        options: [
          "Una vez al mes, en una reunión formal",
          "Una o varias veces al día; ramas muy cortas (horas a pocos días)",
          "Solo al final del sprint de dos semanas",
          "Cada vez que el cliente aprueba",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Qué técnica se usa en TBD para incluir código nuevo en main sin activarlo en producción todavía?",
        options: [
          "Abrir una rama develop larga",
          "Feature flags: el código está presente pero desactivado hasta que se decida encenderlo",
          "Crear un hotfix preventivo",
          "Subir el código solo a staging para siempre",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Qué requisito es fundamental para que Trunk-Based funcione bien?",
        options: [
          "Tener muchos desarrolladores en la oficina",
          "Una suite de tests automáticos sólida y CI que corre en cada cambio",
          "Prohibir los Pull Requests",
          "Usar solo un lenguaje de programación",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Cómo se manejan habitualmente los hotfixes en Trunk-Based?",
        options: [
          "Se abren ramas hotfix largas igual que en Git Flow",
          "El parche va directamente al trunk y se despliega; puede usarse feature flags o pipelines rápidos",
          "Se espera al próximo release mensual",
          "Solo el CEO puede aprobar un hotfix",
        ],
        correctIndex: 1,
      },
    ],
  },
  'flujos-comparacion': {
    key: 'flujos-comparacion',
    title: 'Quiz: Git Flow vs Trunk-Based',
    questions: [
      {
        prompt: "¿Cuál de los dos modelos suele tener más tipos de ramas activas a la vez?",
        options: [
          "Trunk-Based, porque hay una rama por cada desarrollador",
          "Git Flow, por las ramas develop, feature/*, release/* y hotfix/*",
          "Ambos tienen exactamente las mismas ramas",
          "Ninguno usa ramas",
        ],
        correctIndex: 1,
      },
      {
        prompt: "Un equipo publica una aplicación de escritorio instalable con versiones numeradas (v2.4, v3.0). ¿Qué modelo encaja mejor?",
        options: [
          "Trunk-Based puro, porque despliegan muchas veces al día",
          "Git Flow, porque permite congelar una versión en release mientras develop sigue avanzando",
          "Ambos son equivalentes para este caso",
          "Ninguno; ese equipo debería usar SVN",
        ],
        correctIndex: 1,
      },
      {
        prompt: "Una startup de SaaS despliega a producción varias veces al día con CI/CD completo. ¿Qué modelo se adapta mejor?",
        options: [
          "Git Flow, por su estructura formal de ramas",
          "Trunk-Based, porque favorece integración frecuente y despliegue continuo",
          "Ambos son igual de adecuados",
          "Ninguno, deben usar FTP manual",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Qué es GitHub Flow?",
        options: [
          "Exactamente lo mismo que Git Flow clásico con develop y release",
          "Un modelo intermedio: main + ramas de feature cortas, sin develop permanente",
          "Trunk-Based con feature flags obligatorios",
          "Solo sirve para repositorios de GitHub de pago",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Cuál es el mayor coste oculto de Trunk-Based si no hay disciplina?",
        options: [
          "Tener demasiados tags de versión",
          "Que main se vuelva frágil por integraciones sin tests ni revisión adecuada",
          "Tener que pagar por GitHub Actions",
          "Que develop quede desactualizada",
        ],
        correctIndex: 1,
      },
      {
        prompt: "¿Es posible combinar ideas de Git Flow y Trunk-Based en un mismo equipo?",
        options: [
          "No, son modelos incompatibles por definición",
          "Sí, muchos equipos adaptan los modelos (por ejemplo ramas feature cortas + rama release opcional)",
          "Solo si el equipo tiene más de 50 personas",
          "Solo en repositorios privados",
        ],
        correctIndex: 1,
      },
    ],
  },
};
