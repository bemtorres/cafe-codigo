import type { Slide } from '../../../types/slides';

export const entornosVirtualesSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '16. Entornos Virtuales en Python 📦🧪',
    subtitle: 'Laboratorios aislados con venv para evitar conflictos de librerías',
    badge: 'Python · Lección 16',
    content: 'Un entorno virtual es un directorio aislado que contiene su propia copia independiente de Python y de los paquetes instalados por PIP.',
    bulletPoints: [
      '📦 Aislamiento total por proyecto (evita conflictos de versiones de paquetes)',
      '🛠️ Herramienta nativa `venv` integrada en Python 3',
      '⚡ Activación y desactivación simple desde la consola',
      '🚫 Regla de oro: NUNCA subir la carpeta `.venv` a repositorios Git'
    ],
    keyTakeaway: 'Crear un entorno virtual es el PRIMER paso obligatorio al iniciar cualquier proyecto real en Python.'
  },
  {
    id: 2,
    type: 'concept',
    title: '¿Por qué necesitas un Entorno Virtual?',
    badge: 'Motivación',
    content: 'Instalar paquetes globalmente causa conflictos cuando dos proyectos requieren versiones distintas de la misma librería (ej. Django 3.2 vs Django 5.0).',
    bulletPoints: [
      'Instalación Global: Todas las aplicaciones comparten las mismas librerías del sistema operativo',
      'Entornos Virtuales: Cada proyecto posee su propia carpeta `.venv` con sus versiones exactas',
      'Garantiza que tu aplicación funcione exactamente igual en desarrollo, testing y servidor de producción'
    ],
    keyTakeaway: 'Los entornos virtuales previenen el fenómeno "funciona en mi máquina pero no en el servidor".'
  },
  {
    id: 3,
    type: 'code',
    title: 'Creación y Activación de un Entorno Virtual',
    badge: 'Comandos venv',
    content: 'Comandos paso a paso para crear y activar tu entorno virtual segun tu sistema operativo.',
    codeSnippet: {
      filename: 'Terminal / Consola',
      lang: 'bash',
      code: `# 1. Crear el entorno virtual en la carpeta .venv
python -m venv .venv

# 2. Activar en Windows (PowerShell)
.venv\\Scripts\\Activate.ps1

# 2b. Activar en macOS / Linux
source .venv/bin/activate

# 3. Verificar activación (aparece (.venv) al inicio de la terminal)
# (.venv) PS C:\\mi_proyecto> pip install requests

# 4. Desactivar el entorno al finalizar
deactivate`,
      explanation: 'Una vez activado, cualquier pip install afectará únicamente al proyecto actual.'
    },
    keyTakeaway: 'Verifica que la terminal muestre `(.venv)` antes de ejecutar cualquier `pip install`.'
  },
  {
    id: 4,
    type: 'diagram',
    title: 'Buenas Prácticas con Git (.gitignore)',
    badge: 'Control de Versiones',
    content: 'La carpeta `.venv` suele pesar cientos de megabytes y contiene binarios específicos de tu equipo.',
    visualChart: {
      headers: ['Elemento', '¿Se sube a Git / GitHub?', 'Motivo'],
      rows: [
        ['Carpeta `.venv/`', '❌ NUNCA (Agregar a `.gitignore`)', 'Pesa demasiado y es específica de tu sistema operativo'],
        ['Archivo `requirements.txt`', '✅ SÍ (Obligatorio)', 'Texto ligero que permite reinstalar las librerías con un comando']
      ]
    },
    keyTakeaway: 'Incluye siempre `.venv/` en tu archivo `.gitignore`.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Entornos Virtuales 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en este módulo:',
    bulletPoints: [
      '✅ `python -m venv .venv` crea el entorno virtual en tu proyecto',
      '✅ Activa con `source .venv/bin/activate` o `.venv\\Scripts\\activate`',
      '✅ Mantiene tus proyectos libres de conflictos entre librerías',
      '✅ Usa `pip freeze > requirements.txt` para compartir dependencias',
      '✅ Agrega `.venv` a `.gitignore`'
    ],
    keyTakeaway: '¡Excelente! Ahora trabajas con estándares profesionales de la industria del software.'
  }
];
