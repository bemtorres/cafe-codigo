import type { Slide } from '../../../types/slides';

export const seguridadBanditSonarqubeSlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '18. Seguridad y Calidad de Código 🛡️🔍',
    subtitle: 'Análisis estático con Bandit, reglas SonarQube, linters y PEP 8 en Python',
    badge: 'Python · Lección 18',
    content: 'Escribir código que funcione no es suficiente: debe ser seguro, libre de vulnerabilidades y fácil de mantener por equipos de ingeniería.',
    bulletPoints: [
      '🛡️ **Bandit**: Herramienta de análisis de seguridad para encontrar fallas de ciberseguridad en Python',
      '🔍 **SonarQube / SonarLint**: Análisis de calidad, smells, deuda técnica y complejidad cognitiva',
      '📏 **PEP 8 & Linters**: Formateo estándar con Black, Flake8 y Ruff',
      '🔒 Prevención de `eval()`, contraseñas hardcodeadas y SQL Injections'
    ],
    keyTakeaway: 'El código de calidad industrial es aquél que combina funcionalidad, legibilidad y seguridad.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'Bandit: Escáner de Vulnerabilidades de Seguridad',
    badge: 'Seguridad SAST',
    content: 'Bandit analiza el Árbol de Sintaxis Abstracta (AST) de tu código Python para encontrar agujeros de seguridad comunes.',
    bulletPoints: [
      'Uso peligroso de `eval()` o `exec()` que permite ejecución remota de código (RCE)',
      'Contraseñas, tokens o llaves API escritas directamente en el código (Hardcoded Secrets)',
      'Construcción insegura de consultas SQL (Riesgo de SQL Injection)',
      'Generación de números aleatorios no criptográficos con `random` para tokens de seguridad'
    ],
    codeSnippet: {
      filename: 'vulnerabilidad_demo.py',
      lang: 'python',
      code: `# ❌ INSEGURO (Detectado por Bandit B307 / B105)
password_db = "123456"  # Hardcoded secret!
eval(input("Expresión: ")) # RCE peligroso!

# ✅ SEGURO Y LIMPIO
import os
password_db = os.getenv("DB_PASSWORD") # Carga desde variables de entorno
import ast
resultado = ast.literal_eval("123")  # Evaluación segura de literales`,
      explanation: 'Bandit reportará advertencias señalando exactamente la línea y gravedad del fallo.'
    },
    keyTakeaway: 'Ejecuta `bandit -r .` en tu tubería de CI/CD antes de desplegar a producción.'
  },
  {
    id: 3,
    type: 'code',
    title: 'SonarQube & SonarLint: Calidad y Code Smells',
    badge: 'Calidad de Software',
    content: 'SonarQube evalúa la salud del proyecto identificando chinches (Bugs), Vulnerabilidades y Bad Smells.',
    bulletPoints: [
      '**Complejidad Cognitiva**: Mide qué tan difícil es para un ser humano entender una función',
      '**Duplicación de Código**: Alerta sobre fragmentos repetidos que deberían ser modularizados',
      '**Cobertura de Tests**: Mide el porcentaje de líneas evaluadas mediante pruebas unitarias'
    ],
    codeSnippet: {
      filename: 'Comando Bandit Terminal',
      lang: 'bash',
      code: `# Instalar Bandit via PIP
pip install bandit

# Escanear recursivamente el proyecto actual
bandit -r .

# Generar reporte de seguridad en HTML
bandit -r . -f html -o reporte_seguridad.html`,
      explanation: 'Bandit clasifica las fallas en niveles de confianza y severidad (Low, Medium, High).'
    },
    keyTakeaway: 'Inspeccionar periódicamente tu código previene la acumulación de Deuda Técnica.'
  },
  {
    id: 4,
    type: 'diagram',
    title: 'Herramientas del Ecosistema de Calidad Python',
    badge: 'Tooling Professional',
    content: 'Ecosistema de herramientas utilizadas en empresas para mantener código impecable.',
    visualChart: {
      headers: ['Herramienta', 'Categoría', 'Propósito Principal'],
      rows: [
        ['Bandit', 'Seguridad (SAST)', 'Detecta agujeros de seguridad y vulnerabilidades en código Python'],
        ['Flake8 / Ruff', 'Linter / Estilo', 'Verifica cumplimiento de normas de estilo PEP 8 y sintaxis'],
        ['Black', 'Formateador', 'Formatea automáticamente el código siguiendo reglas estrictas'],
        ['SonarQube', 'Plataforma de Calidad', 'Mide deuda técnica, duplicación, bugs y cobertura global']
      ]
    },
    keyTakeaway: 'Combina Black, Ruff y Bandit para automatizar las revisiones de código en tu equipo.'
  },
  {
    id: 5,
    type: 'summary',
    title: 'Resumen de Seguridad y Calidad 🎯',
    badge: 'Resumen Final del Curso',
    content: '¡Has alcanzado el último módulo teórico del Curso de Python!',
    bulletPoints: [
      '✅ Evita `eval()`, consultas SQL concatenadas y claves hardcodeadas',
      '✅ Usa Bandit (`bandit -r .`) para auditorías automáticas de ciberseguridad',
      '✅ Mantén una baja complejidad cognitiva apoyándote en SonarQube',
      '✅ Aplica estándares PEP 8 para producir código elegante, legible y mantenible'
    ],
    keyTakeaway: '🏆 ¡Felicitaciones! Has completado el camino de novato a desarrollador Pythonista profesional.'
  }
];
