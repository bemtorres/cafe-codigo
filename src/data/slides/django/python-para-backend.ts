import type { Slide } from '../../../types/slides';

export const pythonParaBackendSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '2. Python para Backend: Cimientos Esenciales 🐍',
    subtitle: 'Entornos virtuales, decoradores, POO, herencia y control de dependencias para Django',
    badge: 'Django · Lección 2',
    content: 'Antes de escribir código Django, dominaremos los patrones de Python que el framework utiliza a diario: entornos aislados, clases con herencia y decoradores funcionales.',
    bulletPoints: [
      '📦 Entornos virtuales (venv): Aislamiento total de paquetes',
      '🧱 POO avanzada: Clases, atributos, herencia y métodos mágicos (__str__)',
      '⚡ Decoradores: Cómo envolver y proteger funciones (@login_required)',
      '📑 requirements.txt: Congelar versiones para despliegues reproducibles'
    ],
    keyTakeaway: 'Django es 100% Python idiomático. Dominar estos conceptos te permitirá entender el framework sin memorizar nada.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'El Peligro de Instalar Paquetes Globalmente (Sin venv)',
    badge: 'Buenas Prácticas',
    content: 'Si instalas librerías con "pip install" en el Python global de tu sistema operativo, creas una bomba de tiempo:',
    visualChart: {
      headers: ['Escenario', 'Sin Entorno Virtual (Peligroso)', 'Con Entorno Virtual (venv)'],
      rows: [
        ['Proyecto A (Legacy)', 'Usa Django 3.2', 'Carpeta .venv_a con Django 3.2'],
        ['Proyecto B (Nuevo)', 'Usa Django 5.1 (¡Rompe Proyecto A!)', 'Carpeta .venv_b con Django 5.1'],
        ['Permisos de Sistema', 'Puede requerir sudo/administrador', 'No requiere permisos de administrador'],
        ['Despliegue a Producción', 'Imposible saber qué paquetes se usan', 'pip freeze genera requirements.txt limpio']
      ]
    },
    keyTakeaway: 'Regla de oro profesional: NUNCA inicies un proyecto de Django sin crear y activar primero su entorno virtual.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Flujo Completo de un Entorno Virtual en Terminal',
    badge: 'Comandos Esenciales',
    content: 'Aprende los 4 comandos que ejecutarás en cada proyecto de tu carrera como desarrollador backend:',
    codeSnippet: {
      filename: 'terminal_setup.sh',
      lang: 'bash',
      code: `# 1. Crear el entorno virtual en una carpeta local (.venv)
$ python -m venv .venv

# 2. Activar el entorno virtual
# En Windows (PowerShell):
$ .\\.venv\\Scripts\\Activate.ps1
# En Linux / macOS:
$ source .venv/bin/activate

# 3. Verificar que el prompt muestre (.venv) e instalar Django
(.venv) $ pip install django~=5.1

# 4. Congelar dependencias para compartir el proyecto
(.venv) $ pip freeze > requirements.txt`,
      explanation: 'El prefijo (.venv) en tu terminal confirma que cualquier paquete instalado solo afectará a este proyecto específico.'
    },
    keyTakeaway: 'Con "pip freeze > requirements.txt" cualquier colega puede replicar tu entorno con "pip install -r requirements.txt".'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Programación Orientada a Objetos: La Columna de Django',
    badge: 'POO en Acción',
    content: 'En Django, casi todo hereda de clases base provistas por el framework: Modelos, Formularios, Vistas y Middleware.',
    bulletPoints: [
      'Clase Base (models.Model): Aporta los métodos para comunicarse con la base de datos (.save(), .delete(), .objects.all()).',
      'Herencia: Tu modelo hereda esos superpoderes con solo declarar "class Producto(models.Model):".',
      'Método Especial __str__: Define cómo se representa el objeto como texto en el panel de administración y en la consola.',
      'Super(): Permite sobreescribir métodos nativos agregando lógica personalizada antes o después de guardar.'
    ],
    keyTakeaway: 'No necesitas inventar métodos para guardar o borrar datos; la herencia de Django ya los tiene resueltos.'
  },
  {
    id: 5,
    type: 'code',
    title: 'El Método Especial __str__ y la Herencia Práctica',
    badge: 'Código POO',
    content: 'Observa cómo una clase de Python se convierte en un modelo con representación legible:',
    codeSnippet: {
      filename: 'ejemplo_poo.py',
      lang: 'python',
      code: `class Producto:
    def __init__(self, nombre: str, precio: float):
        self.nombre = nombre
        self.precio = precio

    # Sin __str__, Python imprime: <Producto object at 0x7fa28> (ilegible)
    # Con __str__, Python imprime la representación humana:
    def __str__(self) -> str:
        return f"{self.nombre} - \${self.precio:.2f}"

p = Producto("Café Espresso", 2.50)
print(p)  # Salida: "Café Espresso - \$2.50"`,
      explanation: 'En Django, el método __str__ es lo que hace que los registros aparezcan con nombres claros en el panel administrativo en vez de "Objeto (1)".'
    },
    keyTakeaway: 'Implementar siempre __str__ en tus clases es el hábito que más agradecerás al administrar datos.'
  },
  {
    id: 6,
    type: 'code',
    title: '¿Qué es un Decorador? La magia de @ en Python',
    badge: 'Decoradores',
    content: 'Un decorador es una función que envuelve a otra función para agregarle superpoderes sin modificar su código interno.',
    codeSnippet: {
      filename: 'decorador_auth.py',
      lang: 'python',
      code: `from functools import wraps

def requiere_autenticacion(vista_original):
    @wraps(vista_original)
    def envoltura(request, *args, **kwargs):
        # 1. Chequea si el usuario inició sesión
        if not request.get('usuario_activo'):
            return "Redirigiendo a /login... Acceso denegado."
        # 2. Si está autenticado, ejecuta la vista normal
        return vista_original(request, *args, **kwargs)
    return envoltura

# Aplicación con sintaxis limpia de arroba:
@requiere_autenticacion
def ver_panel_privado(request):
    return "Bienvenido a tu panel confidencial."`,
      explanation: 'Django provee decoradores de fábrica como @login_required, @require_POST y @permission_required.'
    },
    keyTakeaway: 'Los decoradores mantienen tus vistas limpias: la seguridad se aplica con una sola línea (@).'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Tu Caja de Herramientas Backend',
    badge: 'Checklist de Preparación',
    content: 'Has dominado los prerrequisitos fundamentales de Python que te permitirán avanzar en Django con total confianza:',
    bulletPoints: [
      '✅ Creas y gestionas entornos virtuales con "python -m venv .venv".',
      '✅ Controlas versiones de librerías mediante "requirements.txt".',
      '✅ Comprendes cómo la herencia de clases da superpoderes a los modelos y vistas.',
      '✅ Conoces el propósito de __str__ y la función de los decoradores (@).'
    ],
    keyTakeaway: '¡Tu entorno y tus bases de Python están listos! En la siguiente lección iniciaremos tu primer proyecto Django.'
  }
];
