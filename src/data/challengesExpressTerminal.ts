import type { ExpressChallengeExercise } from './challengesExpressTypes';

export const expressTerminalExercises: ExpressChallengeExercise[] = [
  // ═══════════════════════════════════════════════════════
  // 🟢 NIVEL FÁCIL (EASY) - IDs 1001 al 1010 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 1001,
    title: 'Imprimir Directorio de Trabajo Actual (pwd)',
    statement: 'Completa el comando Unix para mostrar la ruta absoluta del directorio en el que te encuentras (print working directory).',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El comando de 3 letras es pwd.',
    explanation: 'pwd (print working directory) imprime la ruta completa del directorio donde está ubicada la sesión de terminal.',
    languages: {
      unix: {
        starterCode: `# Imprime el directorio de trabajo actual:\n___`,
        solutionCode: `# Imprime el directorio de trabajo actual:\npwd`,
        acceptedKeywords: ['pwd']
      },
      python: {
        starterCode: `# Imprime el directorio de trabajo actual:\n___`,
        solutionCode: `# Imprime el directorio de trabajo actual:\npwd`,
        acceptedKeywords: ['pwd']
      },
      cpp: {
        starterCode: `# Imprime el directorio de trabajo actual:\n___`,
        solutionCode: `# Imprime el directorio de trabajo actual:\npwd`,
        acceptedKeywords: ['pwd']
      },
      javascript: {
        starterCode: `# Imprime el directorio de trabajo actual:\n___`,
        solutionCode: `# Imprime el directorio de trabajo actual:\npwd`,
        acceptedKeywords: ['pwd']
      },
      java: {
        starterCode: `# Imprime el directorio de trabajo actual:\n___`,
        solutionCode: `# Imprime el directorio de trabajo actual:\npwd`,
        acceptedKeywords: ['pwd']
      }
    }
  },
  {
    id: 1002,
    title: 'Listar Archivos y Carpetas (ls)',
    statement: 'Corrige el comando de terminal para listar los archivos contenidos en el directorio actual.',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa el comando ls.',
    explanation: 'ls (list) muestra la lista de nombres de archivos y subcarpetas en el directorio especificado.',
    languages: {
      unix: {
        starterCode: `# Comando para listar archivos:\nls`,
        solutionCode: `# Comando para listar archivos:\nls`
      },
      python: {
        starterCode: `# Comando para listar archivos:\nls`,
        solutionCode: `# Comando para listar archivos:\nls`
      },
      cpp: {
        starterCode: `# Comando para listar archivos:\nls`,
        solutionCode: `# Comando para listar archivos:\nls`
      },
      javascript: {
        starterCode: `# Comando para listar archivos:\nls`,
        solutionCode: `# Comando para listar archivos:\nls`
      },
      java: {
        starterCode: `# Comando para listar archivos:\nls`,
        solutionCode: `# Comando para listar archivos:\nls`
      }
    }
  },
  {
    id: 1003,
    title: 'Listado Detallado con Archivos Ocultos (ls -la)',
    statement: 'Completa los flags para mostrar permisos, tamaños y archivos ocultos (que empiezan con punto): ls ___.',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa los flags -la (o -l -a).',
    explanation: '-l activa el formato largo detallado y -a incluye los archivos ocultos (como .env o .gitignore).',
    languages: {
      unix: {
        starterCode: `# Listar en formato largo y con ocultos:\nls ___`,
        solutionCode: `# Listar en formato largo y con ocultos:\nls -la`,
        acceptedKeywords: ['-la', '-al', '-l -a', '-a -l']
      },
      python: {
        starterCode: `# Listar en formato largo y con ocultos:\nls ___`,
        solutionCode: `# Listar en formato largo y con ocultos:\nls -la`,
        acceptedKeywords: ['-la', '-al', '-l -a']
      },
      cpp: {
        starterCode: `# Listar en formato largo y con ocultos:\nls ___`,
        solutionCode: `# Listar en formato largo y con ocultos:\nls -la`,
        acceptedKeywords: ['-la', '-al', '-l -a']
      },
      javascript: {
        starterCode: `# Listar en formato largo y con ocultos:\nls ___`,
        solutionCode: `# Listar en formato largo y con ocultos:\nls -la`,
        acceptedKeywords: ['-la', '-al', '-l -a']
      },
      java: {
        starterCode: `# Listar en formato largo y con ocultos:\nls ___`,
        solutionCode: `# Listar en formato largo y con ocultos:\nls -la`,
        acceptedKeywords: ['-la', '-al', '-l -a']
      }
    }
  },
  {
    id: 1004,
    title: 'Navegar al Directorio Superior / Padre (cd ..)',
    statement: 'Corrige el comando para subir un nivel en la jerarquía de carpetas (cd ..).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa cd .. (dos puntos representan el directorio padre).',
    explanation: '.. representa el directorio superior padre, mientras que . representa el directorio actual.',
    languages: {
      unix: {
        starterCode: `# Subir un nivel al directorio padre:\ncd ..`,
        solutionCode: `# Subir un nivel al directorio padre:\ncd ..`
      },
      python: {
        starterCode: `# Subir un nivel al directorio padre:\ncd ..`,
        solutionCode: `# Subir un nivel al directorio padre:\ncd ..`
      },
      cpp: {
        starterCode: `# Subir un nivel al directorio padre:\ncd ..`,
        solutionCode: `# Subir un nivel al directorio padre:\ncd ..`
      },
      javascript: {
        starterCode: `# Subir un nivel al directorio padre:\ncd ..`,
        solutionCode: `# Subir un nivel al directorio padre:\ncd ..`
      },
      java: {
        starterCode: `# Subir un nivel al directorio padre:\ncd ..`,
        solutionCode: `# Subir un nivel al directorio padre:\ncd ..`
      }
    }
  },
  {
    id: 1005,
    title: 'Creación de Nueva Carpeta (mkdir)',
    statement: 'Completa el comando para crear una carpeta llamada "proyectos".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El comando es mkdir proyectos.',
    explanation: 'mkdir (make directory) crea una o varias carpetas nuevas en el sistema de archivos.',
    languages: {
      unix: {
        starterCode: `# Crear una nueva carpeta:\n___ proyectos`,
        solutionCode: `# Crear una nueva carpeta:\nmkdir proyectos`,
        acceptedKeywords: ['mkdir']
      },
      python: {
        starterCode: `# Crear una nueva carpeta:\n___ proyectos`,
        solutionCode: `# Crear una nueva carpeta:\nmkdir proyectos`,
        acceptedKeywords: ['mkdir']
      },
      cpp: {
        starterCode: `# Crear una nueva carpeta:\n___ proyectos`,
        solutionCode: `# Crear una nueva carpeta:\nmkdir proyectos`,
        acceptedKeywords: ['mkdir']
      },
      javascript: {
        starterCode: `# Crear una nueva carpeta:\n___ proyectos`,
        solutionCode: `# Crear una nueva carpeta:\nmkdir proyectos`,
        acceptedKeywords: ['mkdir']
      },
      java: {
        starterCode: `# Crear una nueva carpeta:\n___ proyectos`,
        solutionCode: `# Crear una nueva carpeta:\nmkdir proyectos`,
        acceptedKeywords: ['mkdir']
      }
    }
  },
  {
    id: 1006,
    title: 'Crear Rutas Anidadas de Carpetas (mkdir -p)',
    statement: 'Corrige el comando para crear la ruta profunda "src/components/ui" creando los padres si no existen (-p).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa mkdir -p src/components/ui.',
    explanation: 'El modificador -p (parents) crea todas las carpetas intermedias que falten sin dar error si ya existen.',
    languages: {
      unix: {
        starterCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`,
        solutionCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`
      },
      python: {
        starterCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`,
        solutionCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`
      },
      cpp: {
        starterCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`,
        solutionCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`
      },
      javascript: {
        starterCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`,
        solutionCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`
      },
      java: {
        starterCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`,
        solutionCode: `# Crear ruta anidada completa con carpetas padre:\nmkdir -p src/components/ui`
      }
    }
  },
  {
    id: 1007,
    title: 'Crear un Archivo Vacío con touch',
    statement: 'Completa el comando para crear un archivo vacío llamado "index.html".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'Usa touch index.html.',
    explanation: 'touch crea un archivo en blanco si no existe o actualiza su marca de tiempo de modificación.',
    languages: {
      unix: {
        starterCode: `# Crear archivo vacío:\n___ index.html`,
        solutionCode: `# Crear archivo vacío:\ntouch index.html`,
        acceptedKeywords: ['touch']
      },
      python: {
        starterCode: `# Crear archivo vacío:\n___ index.html`,
        solutionCode: `# Crear archivo vacío:\ntouch index.html`,
        acceptedKeywords: ['touch']
      },
      cpp: {
        starterCode: `# Crear archivo vacío:\n___ index.html`,
        solutionCode: `# Crear archivo vacío:\ntouch index.html`,
        acceptedKeywords: ['touch']
      },
      javascript: {
        starterCode: `# Crear archivo vacío:\n___ index.html`,
        solutionCode: `# Crear archivo vacío:\ntouch index.html`,
        acceptedKeywords: ['touch']
      },
      java: {
        starterCode: `# Crear archivo vacío:\n___ index.html`,
        solutionCode: `# Crear archivo vacío:\ntouch index.html`,
        acceptedKeywords: ['touch']
      }
    }
  },
  {
    id: 1008,
    title: 'Copiar Archivos con cp',
    statement: 'Corrige el comando para copiar "config.env.example" como nuevo archivo ".env".',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa cp config.env.example .env.',
    explanation: 'cp (copy) duplica el archivo de origen en la ruta o nombre de destino indicado.',
    languages: {
      unix: {
        starterCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`,
        solutionCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`
      },
      python: {
        starterCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`,
        solutionCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`
      },
      cpp: {
        starterCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`,
        solutionCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`
      },
      javascript: {
        starterCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`,
        solutionCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`
      },
      java: {
        starterCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`,
        solutionCode: `# Copiar archivo plantilla a nuevo archivo de configuración:\ncp config.env.example .env`
      }
    }
  },
  {
    id: 1009,
    title: 'Mover o Renombrar Archivo con mv',
    statement: 'Completa el comando para renombrar "viejo.txt" a "nuevo.txt".',
    type: 'complete',
    difficulty: 'facil',
    hint: 'El comando es mv viejo.txt nuevo.txt.',
    explanation: 'mv (move) se usa tanto para mover archivos entre carpetas como para cambiarles el nombre.',
    languages: {
      unix: {
        starterCode: `# Renombrar archivo existente:\n___ viejo.txt nuevo.txt`,
        solutionCode: `# Renombrar archivo existente:\nmv viejo.txt nuevo.txt`,
        acceptedKeywords: ['mv']
      },
      python: {
        starterCode: `# Renombrar archivo existente:\n___ viejo.txt nuevo.txt`,
        solutionCode: `# Renombrar archivo existente:\nmv viejo.txt nuevo.txt`,
        acceptedKeywords: ['mv']
      },
      cpp: {
        starterCode: `# Renombrar archivo existente:\n___ viejo.txt nuevo.txt`,
        solutionCode: `# Renombrar archivo existente:\nmv viejo.txt nuevo.txt`,
        acceptedKeywords: ['mv']
      },
      javascript: {
        starterCode: `# Renombrar archivo existente:\n___ viejo.txt nuevo.txt`,
        solutionCode: `# Renombrar archivo existente:\nmv viejo.txt nuevo.txt`,
        acceptedKeywords: ['mv']
      },
      java: {
        starterCode: `# Renombrar archivo existente:\n___ viejo.txt nuevo.txt`,
        solutionCode: `# Renombrar archivo existente:\nmv viejo.txt nuevo.txt`,
        acceptedKeywords: ['mv']
      }
    }
  },
  {
    id: 1010,
    title: 'Eliminar Archivos y Carpetas de Forma Recursiva (rm -rf)',
    statement: 'Corrige los flags para borrar de forma recursiva y forzada la carpeta temporal "dist" (rm -rf dist).',
    type: 'fix',
    difficulty: 'facil',
    hint: 'Usa rm -rf dist (-r recursivo, -f sin confirmación).',
    explanation: 'rm -rf elimina un directorio y todo su contenido sin solicitar confirmaciones por archivo.',
    languages: {
      unix: {
        starterCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`,
        solutionCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`
      },
      python: {
        starterCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`,
        solutionCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`
      },
      cpp: {
        starterCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`,
        solutionCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`
      },
      javascript: {
        starterCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`,
        solutionCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`
      },
      java: {
        starterCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`,
        solutionCode: `# Borrado forzado y recursivo de directorio:\nrm -rf dist`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🟡 NIVEL MEDIO (MEDIUM) - IDs 1011 al 1020 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 1011,
    title: 'Asignar Permisos de Ejecución (chmod +x)',
    statement: 'Completa el flag de permisos para otorgar permisos de ejecución a "deploy.sh".',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa chmod +x deploy.sh.',
    explanation: '+x agrega permisos de ejecución (eXecute) permitiendo lanzar el archivo como script ejecutable.',
    languages: {
      unix: {
        starterCode: `# Dar permiso de ejecución al script:\nchmod ___ deploy.sh`,
        solutionCode: `# Dar permiso de ejecución al script:\nchmod +x deploy.sh`,
        acceptedKeywords: ['+x', '755', 'u+x']
      },
      python: {
        starterCode: `# Dar permiso de ejecución al script:\nchmod ___ deploy.sh`,
        solutionCode: `# Dar permiso de ejecución al script:\nchmod +x deploy.sh`,
        acceptedKeywords: ['+x', '755', 'u+x']
      },
      cpp: {
        starterCode: `# Dar permiso de ejecución al script:\nchmod ___ deploy.sh`,
        solutionCode: `# Dar permiso de ejecución al script:\nchmod +x deploy.sh`,
        acceptedKeywords: ['+x', '755']
      },
      javascript: {
        starterCode: `# Dar permiso de ejecución al script:\nchmod ___ deploy.sh`,
        solutionCode: `# Dar permiso de ejecución al script:\nchmod +x deploy.sh`,
        acceptedKeywords: ['+x', '755']
      },
      java: {
        starterCode: `# Dar permiso de ejecución al script:\nchmod ___ deploy.sh`,
        solutionCode: `# Dar permiso de ejecución al script:\nchmod +x deploy.sh`,
        acceptedKeywords: ['+x', '755']
      }
    }
  },
  {
    id: 1012,
    title: 'Permisos Octales Estándar para Archivos (chmod 644)',
    statement: 'Corrige los permisos octales para que el dueño pueda leer/escribir (6) y los demás solo leer (4 4).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa chmod 644 archivo.txt.',
    explanation: '644 equivale a rw-r--r-- (Lectura/Escritura para el dueño, sólo Lectura para Grupo y Otros).',
    languages: {
      unix: {
        starterCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`,
        solutionCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`
      },
      python: {
        starterCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`,
        solutionCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`
      },
      cpp: {
        starterCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`,
        solutionCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`
      },
      javascript: {
        starterCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`,
        solutionCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`
      },
      java: {
        starterCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`,
        solutionCode: `# Permisos lectura/escritura dueño y solo lectura otros:\nchmod 644 archivo.txt`
      }
    }
  },
  {
    id: 1013,
    title: 'Cambiar Propietario y Grupo con chown',
    statement: 'Completa el comando para asignar el usuario "www-data" y grupo "www-data" a la carpeta "public/".',
    type: 'complete',
    difficulty: 'medio',
    hint: 'El comando es chown www-data:www-data public/.',
    explanation: 'chown (change owner) modifica el usuario y grupo propietarios de los ficheros del sistema.',
    languages: {
      unix: {
        starterCode: `# Cambiar propietario y grupo:\n___ www-data:www-data public/`,
        solutionCode: `# Cambiar propietario y grupo:\nchown www-data:www-data public/`,
        acceptedKeywords: ['chown']
      },
      python: {
        starterCode: `# Cambiar propietario y grupo:\n___ www-data:www-data public/`,
        solutionCode: `# Cambiar propietario y grupo:\nchown www-data:www-data public/`,
        acceptedKeywords: ['chown']
      },
      cpp: {
        starterCode: `# Cambiar propietario y grupo:\n___ www-data:www-data public/`,
        solutionCode: `# Cambiar propietario y grupo:\nchown www-data:www-data public/`,
        acceptedKeywords: ['chown']
      },
      javascript: {
        starterCode: `# Cambiar propietario y grupo:\n___ www-data:www-data public/`,
        solutionCode: `# Cambiar propietario y grupo:\nchown www-data:www-data public/`,
        acceptedKeywords: ['chown']
      },
      java: {
        starterCode: `# Cambiar propietario y grupo:\n___ www-data:www-data public/`,
        solutionCode: `# Cambiar propietario y grupo:\nchown www-data:www-data public/`,
        acceptedKeywords: ['chown']
      }
    }
  },
  {
    id: 1014,
    title: 'Ver Contenido Completo con cat',
    statement: 'Corrige el comando para concatenar e imprimir en consola el contenido de "package.json".',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa cat package.json.',
    explanation: 'cat (concatenate) muestra el contenido completo de archivos de texto en la salida estándar.',
    languages: {
      unix: {
        starterCode: `# Ver contenido completo del archivo:\ncat package.json`,
        solutionCode: `# Ver contenido completo del archivo:\ncat package.json`
      },
      python: {
        starterCode: `# Ver contenido completo del archivo:\ncat package.json`,
        solutionCode: `# Ver contenido completo del archivo:\ncat package.json`
      },
      cpp: {
        starterCode: `# Ver contenido completo del archivo:\ncat package.json`,
        solutionCode: `# Ver contenido completo del archivo:\ncat package.json`
      },
      javascript: {
        starterCode: `# Ver contenido completo del archivo:\ncat package.json`,
        solutionCode: `# Ver contenido completo del archivo:\ncat package.json`
      },
      java: {
        starterCode: `# Ver contenido completo del archivo:\ncat package.json`,
        solutionCode: `# Ver contenido completo del archivo:\ncat package.json`
      }
    }
  },
  {
    id: 1015,
    title: 'Ver Primeras Líneas con head',
    statement: 'Completa el flag para mostrar exactamente las primeras 5 líneas de "datos.csv" (head -n ___ datos.csv).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa el parámetro 5: head -n 5 datos.csv.',
    explanation: 'head imprime por defecto las primeras 10 líneas, ajustable mediante la opción -n <cantidad>.',
    languages: {
      unix: {
        starterCode: `# Imprimir las primeras 5 líneas:\nhead -n ___ datos.csv`,
        solutionCode: `# Imprimir las primeras 5 líneas:\nhead -n 5 datos.csv`,
        acceptedKeywords: ['5']
      },
      python: {
        starterCode: `# Imprimir las primeras 5 líneas:\nhead -n ___ datos.csv`,
        solutionCode: `# Imprimir las primeras 5 líneas:\nhead -n 5 datos.csv`,
        acceptedKeywords: ['5']
      },
      cpp: {
        starterCode: `# Imprimir las primeras 5 líneas:\nhead -n ___ datos.csv`,
        solutionCode: `# Imprimir las primeras 5 líneas:\nhead -n 5 datos.csv`,
        acceptedKeywords: ['5']
      },
      javascript: {
        starterCode: `# Imprimir las primeras 5 líneas:\nhead -n ___ datos.csv`,
        solutionCode: `# Imprimir las primeras 5 líneas:\nhead -n 5 datos.csv`,
        acceptedKeywords: ['5']
      },
      java: {
        starterCode: `# Imprimir las primeras 5 líneas:\nhead -n ___ datos.csv`,
        solutionCode: `# Imprimir las primeras 5 líneas:\nhead -n 5 datos.csv`,
        acceptedKeywords: ['5']
      }
    }
  },
  {
    id: 1016,
    title: 'Seguir Log en Tiempo Real con tail -f',
    statement: 'Corrige el comando para monitorear las últimas líneas en vivo a medida que se escriben (tail -f app.log).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa tail -f app.log.',
    explanation: 'tail -f (follow) mantiene abierto el archivo mostrando nuevas líneas conforme son emitidas por el servidor.',
    languages: {
      unix: {
        starterCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`,
        solutionCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`
      },
      python: {
        starterCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`,
        solutionCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`
      },
      cpp: {
        starterCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`,
        solutionCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`
      },
      javascript: {
        starterCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`,
        solutionCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`
      },
      java: {
        starterCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`,
        solutionCode: `# Monitoreo de log en tiempo real:\ntail -f app.log`
      }
    }
  },
  {
    id: 1017,
    title: 'Búsqueda de Texto con grep',
    statement: 'Completa el comando para buscar la palabra "ERROR" dentro de "server.log".',
    type: 'complete',
    difficulty: 'medio',
    hint: 'El comando es grep "ERROR" server.log.',
    explanation: 'grep busca patrones o expresiones regulares e imprime únicamente las líneas coincidentes.',
    languages: {
      unix: {
        starterCode: `# Filtrar líneas con la palabra ERROR:\n___ "ERROR" server.log`,
        solutionCode: `# Filtrar líneas con la palabra ERROR:\ngrep "ERROR" server.log`,
        acceptedKeywords: ['grep']
      },
      python: {
        starterCode: `# Filtrar líneas con la palabra ERROR:\n___ "ERROR" server.log`,
        solutionCode: `# Filtrar líneas con la palabra ERROR:\ngrep "ERROR" server.log`,
        acceptedKeywords: ['grep']
      },
      cpp: {
        starterCode: `# Filtrar líneas con la palabra ERROR:\n___ "ERROR" server.log`,
        solutionCode: `# Filtrar líneas con la palabra ERROR:\ngrep "ERROR" server.log`,
        acceptedKeywords: ['grep']
      },
      javascript: {
        starterCode: `# Filtrar líneas con la palabra ERROR:\n___ "ERROR" server.log`,
        solutionCode: `# Filtrar líneas con la palabra ERROR:\ngrep "ERROR" server.log`,
        acceptedKeywords: ['grep']
      },
      java: {
        starterCode: `# Filtrar líneas con la palabra ERROR:\n___ "ERROR" server.log`,
        solutionCode: `# Filtrar líneas con la palabra ERROR:\ngrep "ERROR" server.log`,
        acceptedKeywords: ['grep']
      }
    }
  },
  {
    id: 1018,
    title: 'Redirección y Sobreescritura con Mayor que ( > )',
    statement: 'Corrige el operador para redirigir la salida y sobreescribir el archivo "saludo.txt".',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa echo "Hola Mundo" > saludo.txt.',
    explanation: '> redirige la salida estándar (stdout) creando el archivo o reemplazando todo su contenido anterior.',
    languages: {
      unix: {
        starterCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`,
        solutionCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`
      },
      python: {
        starterCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`,
        solutionCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`
      },
      cpp: {
        starterCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`,
        solutionCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`
      },
      javascript: {
        starterCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`,
        solutionCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`
      },
      java: {
        starterCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`,
        solutionCode: `# Redirigir y sobreescribir:\necho "Hola Mundo" > saludo.txt`
      }
    }
  },
  {
    id: 1019,
    title: 'Redirección Acumulativa con Doble Mayor ( >> )',
    statement: 'Completa el operador para agregar una nueva línea al final del archivo sin borrar lo existente (>>).',
    type: 'complete',
    difficulty: 'medio',
    hint: 'Usa el operador >>.',
    explanation: '>> abre el archivo en modo append (añadir) preservando el contenido previo.',
    languages: {
      unix: {
        starterCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" ___ log.txt`,
        solutionCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" >> log.txt`,
        acceptedKeywords: ['>>']
      },
      python: {
        starterCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" ___ log.txt`,
        solutionCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" >> log.txt`,
        acceptedKeywords: ['>>']
      },
      cpp: {
        starterCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" ___ log.txt`,
        solutionCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" >> log.txt`,
        acceptedKeywords: ['>>']
      },
      javascript: {
        starterCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" ___ log.txt`,
        solutionCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" >> log.txt`,
        acceptedKeywords: ['>>']
      },
      java: {
        starterCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" ___ log.txt`,
        solutionCode: `# Añadir línea al final sin sobreescribir:\necho "Nueva linea de registro" >> log.txt`,
        acceptedKeywords: ['>>']
      }
    }
  },
  {
    id: 1020,
    title: 'Descargar Archivos con curl -O',
    statement: 'Corrige el comando curl para descargar el archivo remoto guardándolo con su nombre original (-O).',
    type: 'fix',
    difficulty: 'medio',
    hint: 'Usa curl -O https://ejemplo.com/datos.json.',
    explanation: 'curl -O (mayúscula) extrae el nombre del archivo de la URL y lo guarda localmente en el disco.',
    languages: {
      unix: {
        starterCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`,
        solutionCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`
      },
      python: {
        starterCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`,
        solutionCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`
      },
      cpp: {
        starterCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`,
        solutionCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`
      },
      javascript: {
        starterCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`,
        solutionCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`
      },
      java: {
        starterCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`,
        solutionCode: `# Descargar guardando con el nombre original del servidor:\ncurl -O https://ejemplo.com/datos.json`
      }
    }
  },

  // ═══════════════════════════════════════════════════════
  // 🔴 NIVEL AVANZADO (ADVANCED) - IDs 1021 al 1030 (10 Ejercicios)
  // ═══════════════════════════════════════════════════════
  {
    id: 1021,
    title: 'Tuberías / Pipes y Conteo de Líneas ( | wc -l)',
    statement: 'Completa el operador de tubería pipe para enviar la salida de cat hacia el contador de líneas wc -l.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa la barra vertical |.',
    explanation: 'El pipe (|) conecta la salida estándar del comando izquierdo con la entrada estándar del derecho.',
    languages: {
      unix: {
        starterCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt ___ wc -l`,
        solutionCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt | wc -l`,
        acceptedKeywords: ['|']
      },
      python: {
        starterCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt ___ wc -l`,
        solutionCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt | wc -l`,
        acceptedKeywords: ['|']
      },
      cpp: {
        starterCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt ___ wc -l`,
        solutionCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt | wc -l`,
        acceptedKeywords: ['|']
      },
      javascript: {
        starterCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt ___ wc -l`,
        solutionCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt | wc -l`,
        acceptedKeywords: ['|']
      },
      java: {
        starterCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt ___ wc -l`,
        solutionCode: `# Enlazar salida de archivo con contador de líneas:\ncat usuarios.txt | wc -l`,
        acceptedKeywords: ['|']
      }
    }
  },
  {
    id: 1022,
    title: 'Búsqueda Recursiva con grep -rn',
    statement: 'Corrige los flags para buscar la constante "SECRET_KEY" en todas las subcarpetas mostrando el número de línea (-rn).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa grep -rn "SECRET_KEY" src/.',
    explanation: '-r busca recursivamente en subdirectorios y -n añade el número de línea de cada coincidencia encontrada.',
    languages: {
      unix: {
        starterCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`,
        solutionCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`
      },
      python: {
        starterCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`,
        solutionCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`
      },
      cpp: {
        starterCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`,
        solutionCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`
      },
      javascript: {
        starterCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`,
        solutionCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`
      },
      java: {
        starterCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`,
        solutionCode: `# Búsqueda recursiva con número de línea:\ngrep -rn "SECRET_KEY" src/`
      }
    }
  },
  {
    id: 1023,
    title: 'Búsqueda de Archivos por Nombre con find',
    statement: 'Completa el parámetro para buscar por nombre de archivo: find . -___ "*.py".',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa -name "*.py".',
    explanation: 'find recorre el árbol de directorios evaluando criterios como -name, -type f, -size.',
    languages: {
      unix: {
        starterCode: `# Buscar archivos Python en toda la estructura:\nfind . -___ "*.py"`,
        solutionCode: `# Buscar archivos Python en toda la estructura:\nfind . -name "*.py"`,
        acceptedKeywords: ['name']
      },
      python: {
        starterCode: `# Buscar archivos Python en toda la estructura:\nfind . -___ "*.py"`,
        solutionCode: `# Buscar archivos Python en toda la estructura:\nfind . -name "*.py"`,
        acceptedKeywords: ['name']
      },
      cpp: {
        starterCode: `# Buscar archivos Python en toda la estructura:\nfind . -___ "*.py"`,
        solutionCode: `# Buscar archivos Python en toda la estructura:\nfind . -name "*.py"`,
        acceptedKeywords: ['name']
      },
      javascript: {
        starterCode: `# Buscar archivos Python en toda la estructura:\nfind . -___ "*.py"`,
        solutionCode: `# Buscar archivos Python en toda la estructura:\nfind . -name "*.py"`,
        acceptedKeywords: ['name']
      },
      java: {
        starterCode: `# Buscar archivos Python en toda la estructura:\nfind . -___ "*.py"`,
        solutionCode: `# Buscar archivos Python en toda la estructura:\nfind . -name "*.py"`,
        acceptedKeywords: ['name']
      }
    }
  },
  {
    id: 1024,
    title: 'Visualización de Procesos Activos (ps aux)',
    statement: 'Corrige el comando ps para mostrar todos los procesos del sistema con usuarios y terminales (ps aux).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa ps aux.',
    explanation: 'ps aux muestra todos los procesos en ejecución incluyendo usuario (a), procesos sin terminal (x) y formato orientado a usuario (u).',
    languages: {
      unix: {
        starterCode: `# Listar todos los procesos activos con detalles:\nps aux`,
        solutionCode: `# Listar todos los procesos activos con detalles:\nps aux`
      },
      python: {
        starterCode: `# Listar todos los procesos activos con detalles:\nps aux`,
        solutionCode: `# Listar todos los procesos activos con detalles:\nps aux`
      },
      cpp: {
        starterCode: `# Listar todos los procesos activos con detalles:\nps aux`,
        solutionCode: `# Listar todos los procesos activos con detalles:\nps aux`
      },
      javascript: {
        starterCode: `# Listar todos los procesos activos con detalles:\nps aux`,
        solutionCode: `# Listar todos los procesos activos con detalles:\nps aux`
      },
      java: {
        starterCode: `# Listar todos los procesos activos con detalles:\nps aux`,
        solutionCode: `# Listar todos los procesos activos con detalles:\nps aux`
      }
    }
  },
  {
    id: 1025,
    title: 'Terminación Forzada de Proceso con kill -9',
    statement: 'Completa la señal SIGKILL (-9) para terminar inmediatamente el proceso con PID 5432.',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa kill -9 5432.',
    explanation: 'kill -9 envía la señal SIGKILL forzando al kernel a destruir el proceso de inmediato sin esperar limpieza.',
    languages: {
      unix: {
        starterCode: `# Matar forzosamente el proceso PID 5432:\nkill -___ 5432`,
        solutionCode: `# Matar forzosamente el proceso PID 5432:\nkill -9 5432`,
        acceptedKeywords: ['9', 'KILL', 'SIGKILL']
      },
      python: {
        starterCode: `# Matar forzosamente el proceso PID 5432:\nkill -___ 5432`,
        solutionCode: `# Matar forzosamente el proceso PID 5432:\nkill -9 5432`,
        acceptedKeywords: ['9']
      },
      cpp: {
        starterCode: `# Matar forzosamente el proceso PID 5432:\nkill -___ 5432`,
        solutionCode: `# Matar forzosamente el proceso PID 5432:\nkill -9 5432`,
        acceptedKeywords: ['9']
      },
      javascript: {
        starterCode: `# Matar forzosamente el proceso PID 5432:\nkill -___ 5432`,
        solutionCode: `# Matar forzosamente el proceso PID 5432:\nkill -9 5432`,
        acceptedKeywords: ['9']
      },
      java: {
        starterCode: `# Matar forzosamente el proceso PID 5432:\nkill -___ 5432`,
        solutionCode: `# Matar forzosamente el proceso PID 5432:\nkill -9 5432`,
        acceptedKeywords: ['9']
      }
    }
  },
  {
    id: 1026,
    title: 'Comprimir Archivos con tar.gz (tar -czvf)',
    statement: 'Corrige los flags de tar para Crear archivo comprimido con gzip y modo detallado (tar -czvf backup.tar.gz ./app).',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa tar -czvf backup.tar.gz ./app.',
    explanation: '-c (create), -z (gzip compresión), -v (verbose), -f (file destino).',
    languages: {
      unix: {
        starterCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`,
        solutionCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`
      },
      python: {
        starterCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`,
        solutionCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`
      },
      cpp: {
        starterCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`,
        solutionCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`
      },
      javascript: {
        starterCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`,
        solutionCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`
      },
      java: {
        starterCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`,
        solutionCode: `# Crear archivo comprimido con gzip:\ntar -czvf backup.tar.gz ./app`
      }
    }
  },
  {
    id: 1027,
    title: 'Descomprimir Archivo tar.gz (tar -xzvf)',
    statement: 'Completa la opción de extracción en tar (tar -___vf backup.tar.gz).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa xz (eXtract + gZip) -> tar -xzvf.',
    explanation: '-x extrae los archivos contenidos dentro del paquete empaquetado.',
    languages: {
      unix: {
        starterCode: `# Extraer archivo comprimido gzip:\ntar -___vf backup.tar.gz`,
        solutionCode: `# Extraer archivo comprimido gzip:\ntar -xzvf backup.tar.gz`,
        acceptedKeywords: ['xz', 'x']
      },
      python: {
        starterCode: `# Extraer archivo comprimido gzip:\ntar -___vf backup.tar.gz`,
        solutionCode: `# Extraer archivo comprimido gzip:\ntar -xzvf backup.tar.gz`,
        acceptedKeywords: ['xz']
      },
      cpp: {
        starterCode: `# Extraer archivo comprimido gzip:\ntar -___vf backup.tar.gz`,
        solutionCode: `# Extraer archivo comprimido gzip:\ntar -xzvf backup.tar.gz`,
        acceptedKeywords: ['xz']
      },
      javascript: {
        starterCode: `# Extraer archivo comprimido gzip:\ntar -___vf backup.tar.gz`,
        solutionCode: `# Extraer archivo comprimido gzip:\ntar -xzvf backup.tar.gz`,
        acceptedKeywords: ['xz']
      },
      java: {
        starterCode: `# Extraer archivo comprimido gzip:\ntar -___vf backup.tar.gz`,
        solutionCode: `# Extraer archivo comprimido gzip:\ntar -xzvf backup.tar.gz`,
        acceptedKeywords: ['xz']
      }
    }
  },
  {
    id: 1028,
    title: 'Variables de Entorno con export',
    statement: 'Corrige la exportación de la variable de entorno PORT asignándole 8080 sin espacios.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'En Bash no debe haber espacios alrededor del signo igual: export PORT=8080.',
    explanation: 'export hace que la variable esté disponible para todos los subprocesos hijos lanzados desde la terminal.',
    languages: {
      unix: {
        starterCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`,
        solutionCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`
      },
      python: {
        starterCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`,
        solutionCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`
      },
      cpp: {
        starterCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`,
        solutionCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`
      },
      javascript: {
        starterCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`,
        solutionCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`
      },
      java: {
        starterCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`,
        solutionCode: `# Definir y exportar variable de entorno:\nexport PORT=8080`
      }
    }
  },
  {
    id: 1029,
    title: 'Scripting Bash: Comprobar Existencia de Archivo',
    statement: 'Completa el operador de prueba condicional para verificar si un archivo regular existe (if [ -___ "$ARCHIVO" ]).',
    type: 'complete',
    difficulty: 'avanzado',
    hint: 'Usa el test -f para comprobar si es un fichero regular.',
    explanation: '-f valida que la ruta exista y sea un archivo regular, mientras que -d valida si es un directorio.',
    languages: {
      unix: {
        starterCode: `#!/bin/bash\nif [ -___ "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        solutionCode: `#!/bin/bash\nif [ -f "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        acceptedKeywords: ['f']
      },
      python: {
        starterCode: `#!/bin/bash\nif [ -___ "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        solutionCode: `#!/bin/bash\nif [ -f "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        acceptedKeywords: ['f']
      },
      cpp: {
        starterCode: `#!/bin/bash\nif [ -___ "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        solutionCode: `#!/bin/bash\nif [ -f "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        acceptedKeywords: ['f']
      },
      javascript: {
        starterCode: `#!/bin/bash\nif [ -___ "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        solutionCode: `#!/bin/bash\nif [ -f "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        acceptedKeywords: ['f']
      },
      java: {
        starterCode: `#!/bin/bash\nif [ -___ "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        solutionCode: `#!/bin/bash\nif [ -f "config.json" ]; then\n    echo "El archivo existe"\nfi`,
        acceptedKeywords: ['f']
      }
    }
  },
  {
    id: 1030,
    title: 'Conexión Remota Segura con SSH',
    statement: 'Corrige la sintaxis del comando SSH para conectarse como usuario "ubuntu" al host "servidor.com" por el puerto 2222.',
    type: 'fix',
    difficulty: 'avanzado',
    hint: 'Usa ssh -p 2222 ubuntu@servidor.com.',
    explanation: 'ssh (Secure Shell) cifra todo el tráfico de la terminal remota; -p especifica un puerto personalizado.',
    languages: {
      unix: {
        starterCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`,
        solutionCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`
      },
      python: {
        starterCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`,
        solutionCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`
      },
      cpp: {
        starterCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`,
        solutionCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`
      },
      javascript: {
        starterCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`,
        solutionCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`
      },
      java: {
        starterCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`,
        solutionCode: `# Conexión SSH remota con puerto:\nssh -p 2222 ubuntu@servidor.com`
      }
    }
  }
];
