export interface LinuxQuizQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface LinuxQuizDefinition {
  key: string;
  title: string;
  questions: LinuxQuizQuestion[];
}

export const linuxDistrosQuizBank: Record<string, LinuxQuizDefinition> = {
  'que-es-linux': {
    key: 'que-es-linux',
    title: 'Quiz: El Núcleo Linux',
    questions: [
      {
        prompt: "¿Quién es el creador original del Kernel de Linux?",
        options: ["Bill Gates", "Linus Torvalds", "Steve Jobs", "Richard Stallman"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es técnicamente 'Linux'?",
        options: ["Un sistema operativo completo", "Un kernel (núcleo) que gestiona el hardware", "Un navegador web", "Una marca de computadoras"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué licencia de software usa Linux (permite ver y modificar el código)?",
        options: ["Propia de Microsoft", "GPL (Software Libre)", "Licencia Creative Commons", "No tiene licencia"],
        correctIndex: 1
      },
      {
        prompt: "¿En qué lenguaje está escrito principalmente el núcleo Linux?",
        options: ["Java", "Python", "C", "JavaScript"],
        correctIndex: 2
      },
      {
        prompt: "¿La mayoría de los servidores de internet usan Linux?",
        options: ["No, usan Windows", "Sí, es el estándar por su estabilidad y seguridad", "Solo los servidores de Google", "Solo si no tienen ratón"],
        correctIndex: 1
      }
    ]
  },
  'debian-ubuntu': {
    key: 'debian-ubuntu',
    title: 'Quiz: La Familia Debian',
    questions: [
      {
        prompt: "¿Qué gestor de paquetes usan las distros basadas en Debian?",
        options: ["pacman", "rpm", "apt (Advanced Package Tool)", "dnf"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es la distribución más famos del mundo, basada en Debian y enfocada al escritorio?",
        options: ["Red Hat", "Ubuntu", "Arch Linux", "Slackware"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama la versión de Ubuntu enfocada a la elegancia y similar a Windows?",
        options: ["Debian Stable", "Linux Mint", "CentOS", "Alpine"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué significa que Debian sea 'estable'?",
        options: ["Que no tiene virus", "Que sus paquetes están muy probados y casi no fallan", "Que es muy rápida", "Que solo tiene software nuevo"],
        correctIndex: 1
      },
      {
        prompt: "¿Ubuntu es gratis?",
        options: ["Sí, para siempre", "Solo el primer mes", "Solo si eres estudiante", "No, cuesta 10 dólares"],
        correctIndex: 0
      }
    ]
  },
  'redhat-fedora': {
    key: 'redhat-fedora',
    title: 'Quiz: El Mundo Enterprise',
    questions: [
      {
        prompt: "¿Qué empresa lidera la rama de Red Hat?",
        options: ["IBM (Red Hat)", "Canonical", "Microsoft", "Oracle"],
        correctIndex: 0
      },
      {
        prompt: "¿Qué gestor de paquetes usan Fedora y Red Hat hoy?",
        options: ["apt", "pacman", "dnf", "brew"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué distro es 'el campo de juegos' donde Red Hat prueba sus novedades?",
        options: ["Ubuntu", "Debian", "Fedora", "OpenSUSE"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál es el enfoque principal de RHEL (Red Hat Enterprise Linux)?",
        options: ["Juegos de PC", "Servidores corporativos con soporte profesional", "Edición de video", "Robótica educacional"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué extensión usan los instaladores de esta rama?",
        options: [".deb", ".rpm", ".exe", ".sh"],
        correctIndex: 1
      }
    ]
  },
  'arch-linux': {
    key: 'arch-linux',
    title: 'Quiz: Arch y Rolling Release',
    questions: [
      {
        prompt: "¿Cuál es la filosofía principal de Arch Linux?",
        options: ["Ser muy pesado", "Simplicidad (KISS) y que el usuario lo instale todo de cero", "Parecerse a Mac", "Ser para principiantes"],
        correctIndex: 1
      },
      {
        prompt: "¿Cómo se llama el gestor de paquetes de Arch?",
        options: ["apt", "dnf", "pacman", "yay"],
        correctIndex: 2
      },
      {
        prompt: "¿Qué es una distro 'Rolling Release'?",
        options: ["Una que se actualiza por versiones fijas anualmente", "Una que se actualiza constantemente sin reinstalar el sistema", "Una que solo funciona en laptops", "Una que da vueltas"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué es el AUR en Arch Linux?",
        options: ["Una marca de monitores", "Arch User Repository (Repositorio mantenido por la comunidad)", "Un error del sistema", "El firewall"],
        correctIndex: 1
      },
      {
        prompt: "¿Es Arch Linux recomendado para alguien que hoy empieza en la terminal?",
        options: ["Sí, es lo más fácil", "No, requiere conocimientos medios/avanzados para configurarlo", "Sí, si tiene un modem rápido", "Solo si sabe C++"],
        correctIndex: 1
      }
    ]
  },
  'kali-seguridad': {
    key: 'kali-seguridad',
    title: 'Quiz: Especializadas',
    questions: [
      {
        prompt: "¿Cuál es el enfoque principal de Kali Linux?",
        options: ["Edición de fotos", "Auditoría de seguridad y Pentesting (Hacking Ético)", "Ofimática para oficinas", "Streaming de juegos"],
        correctIndex: 1
      },
      {
        prompt: "¿Kali Linux debe usarse como sistema personal diario?",
        options: ["Sí, es muy seguro", "No, muchas capas de seguridad están desactivadas por defecto para facilitar el testeo", "Sí, si instalas Steam", "No, porque es muy pesado"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué distro es famosa por su extrema privacidad e ir dentro de un pendrive (Live)?",
        options: ["Ubuntu", "Windows Lite", "Tails", "Pop!_OS"],
        correctIndex: 2
      },
      {
        prompt: "¿Cuál de estas es una distro muy ligera para computadoras viejas?",
        options: ["Ubuntu Full", "Lubuntu (o Puppy Linux)", "Kali Linux", "Garuda Linux"],
        correctIndex: 1
      },
      {
        prompt: "¿Qué entorno de escritorio usa 'SteamOS' (de Valve para la Steam Deck)?",
        options: ["GNOME", "KDE Plasma", "XFCE", "Windows"],
        correctIndex: 1
      }
    ]
  }
};
