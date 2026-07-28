import type { Slide } from '../../../types/slides';

export const modulosSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '15. Módulos y Paquetes PIP 📦',
    subtitle: 'Reutilizando bibliotecas estándar e instalando paquetes de la comunidad',
    badge: 'Python · Lección 15',
    content: 'Python incluye el concepto de "baterías incluidas": una extensa librería estándar acompañada de PIP, el gestor oficial de paquetes.',
    bulletPoints: [
      '📦 Librería estándar integrada (`math`, `random`, `datetime`, `os`, `json`)',
      '📄 Importación de módulos propios con `import mi_modulo`',
      '🌐 PIP (Package Installer for Python) y el repositorio PyPI',
      '📋 Gestión de dependencias con `requirements.txt`'
    ],
    keyTakeaway: 'No reinventes la rueda: aprovecha miles de librerías creadas por la comunidad.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'La Librería Estándar de Python',
    badge: 'Baterías Incluidas',
    content: 'Python incluye decenas de módulos listos para usar sin necesidad de descargar nada adicional.',
    bulletPoints: [
      '`math`: Operaciones matemáticas avanzadas (`sqrt`, `ceil`, `pi`)',
      '`random`: Generación de números aleatorios y elecciones',
      '`datetime`: Manipulación de fechas, horas y deltas de tiempo',
      '`json`: Serialización y conversión de JSON a diccionarios'
    ],
    codeSnippet: {
      filename: 'libreria_estandar.py',
      lang: 'python',
      code: `import math
import random
from datetime import date

# Uso de math
print(f"Raíz de 16: {math.sqrt(16)}")  # 4.0

# Uso de random
dado = random.randint(1, 6)
print(f"Resultado del dado: {dado}")

# Uso de datetime
hoy = date.today()
print(f"Fecha actual: {hoy.strftime('%d/%m/%Y')}")`,
      explanation: 'Las librerías integradas cubren la mayoría de necesidades básicas de desarrollo.'
    },
    keyTakeaway: 'Consulta siempre la documentación oficial antes de buscar paquetes externos.'
  },
  {
    id: 3,
    type: 'code',
    title: 'Creación de Módulos Propios',
    badge: 'Código Modular',
    content: 'Cualquier archivo `.py` en tu proyecto es un módulo que puedes importar en otros archivos.',
    codeSnippet: {
      filename: 'calculos.py / app.py',
      lang: 'python',
      code: `# --- Archivo: calculos.py ---
def sumar(a, b):
    return a + b

# --- Archivo: app.py ---
from calculos import sumar

resultado = sumar(10, 5)
print(f"Resultado importado: {resultado}")  # 15`,
      explanation: 'from modulo import funcion permite importar únicamente la herramienta que necesitas.'
    },
    keyTakeaway: 'Dividir tu proyecto en archivos pequeños mejora exponencialmente su mantenibilidad.'
  },
  {
    id: 4,
    type: 'concept',
    title: 'Gestor de Paquetes PIP y PyPI',
    badge: 'Comunidad PyPI',
    content: 'PyPI (Python Package Index) alberga más de 400.000 paquetes creados por desarrolladores de todo el mundo.',
    bulletPoints: [
      'Instalar paquete: `pip install nombre_paquete`',
      'Desinstalar paquete: `pip uninstall nombre_paquete`',
      'Exportar dependencias: `pip freeze > requirements.txt`',
      'Instalar desde archivo: `pip install -r requirements.txt`'
    ],
    codeSnippet: {
      filename: 'Comandos PIP Terminal',
      lang: 'bash',
      code: `# Instalar la librería requests para hacer peticiones HTTP
pip install requests

# Exportar dependencias a requirements.txt
pip freeze > requirements.txt

# Replicar dependencias en otro equipo
pip install -r requirements.txt`,
      explanation: 'requirements.txt garantiza que cualquier desarrollador pueda instalar las mismas versiones.'
    },
    keyTakeaway: '`requirements.txt` es indispensable para compartir proyectos y desplegarlos en producción.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Módulos y PIP 🎯',
    badge: 'Resumen',
    content: 'Puntos clave repasados en este módulo:',
    bulletPoints: [
      '✅ `import modulo` incluye librerías estándar o locales',
      '✅ `from modulo import item` importa elementos específicos',
      '✅ `pip` gestiona la instalación de paquetes desde PyPI',
      '✅ `requirements.txt` registra las dependencias del proyecto'
    ],
    keyTakeaway: '¡Excelente! En la siguiente lección aprenderemos a aislar estas dependencias con Entornos Virtuales.'
  }
];
