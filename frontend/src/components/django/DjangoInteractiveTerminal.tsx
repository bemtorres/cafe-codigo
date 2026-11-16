import React, { useState, useRef, useEffect } from 'react';

type Step = {
  id: number;
  title: string;
  instruction: string;
  expectedCommands: string[];
  hint: string;
  simulatedOutput: string[];
};

const STEPS: Step[] = [
  {
    id: 1,
    title: 'Paso 1: Crear el Entorno Virtual (venv)',
    instruction: 'Crea un entorno virtual aislado llamado "venv" dentro de C:\\proyectos\\django.',
    expectedCommands: ['python -m venv venv', 'py -m venv venv', 'python3 -m venv venv', 'python -m venv env'],
    hint: 'Escribe: python -m venv venv',
    simulatedOutput: [
      'Creando el entorno virtual en C:\\proyectos\\django\\venv ...',
      'Configurando directorio: venv/Scripts (o venv/bin)',
      'Configurando directorio: venv/Lib/site-packages',
      '✔ Entorno virtual "venv" creado correctamente.',
      'Nota: Aún NO está activo. Observa que el prompt todavía no tiene el prefijo (venv).'
    ]
  },
  {
    id: 2,
    title: 'Paso 2: Activar el Entorno (Ver el prefijo (venv))',
    instruction: 'Activa el entorno virtual. Puedes usar la sintaxis de Windows (.\\venv\\Scripts\\activate) o Linux/Mac (source venv/bin/activate).',
    expectedCommands: [
      '.\\venv\\scripts\\activate',
      './venv/scripts/activate',
      'venv\\scripts\\activate',
      'venv/scripts/activate',
      'source venv/bin/activate',
      '. venv/bin/activate',
      '.\\env\\scripts\\activate',
      'source env/bin/activate'
    ],
    hint: 'Escribe: .\\venv\\Scripts\\activate  (o  source venv/bin/activate)',
    simulatedOutput: [
      'Activando entorno virtual...',
      '✔ ¡ÉXITO! Observa tu prompt a la izquierda: ha aparecido el prefijo (venv).',
      'A partir de ahora, cualquier paquete que instales quedará encerrado de forma segura en la carpeta venv/.'
    ]
  },
  {
    id: 3,
    title: 'Paso 3: Instalar Django dentro de (venv)',
    instruction: 'Instala el framework Django usando pip con el entorno (venv) activo.',
    expectedCommands: ['pip install django', 'pip install django==5.1', 'pip3 install django'],
    hint: 'Escribe: pip install django',
    simulatedOutput: [
      'Collecting django',
      '  Downloading Django-5.1.1-py3-none-any.whl (8.2 MB)',
      '     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.2/8.2 MB 12.4 MB/s',
      'Collecting asgiref>=3.8.1 (from django)',
      '  Downloading asgiref-3.8.1-py3-none-any.whl (23 kB)',
      'Collecting sqlparse>=0.3.1 (from django)',
      '  Downloading sqlparse-0.5.1-py3-none-any.whl (44 kB)',
      'Installing collected packages: sqlparse, asgiref, django',
      'Successfully installed asgiref-3.8.1 django-5.1.1 sqlparse-0.5.1',
      '✔ Django instalado en venv/Lib/site-packages (no en el sistema global).'
    ]
  },
  {
    id: 4,
    title: 'Paso 4: Crear el Proyecto (django-admin startproject biblioteca)',
    instruction: 'Crea el proyecto general llamado "biblioteca" usando django-admin startproject biblioteca.',
    expectedCommands: [
      'django-admin startproject biblioteca',
      'django-admin.exe startproject biblioteca'
    ],
    hint: 'Escribe: django-admin startproject biblioteca',
    simulatedOutput: [
      '✔ Proyecto "biblioteca" creado en C:\\proyectos\\django\\biblioteca',
      'Estructura generada:',
      '  └── biblioteca/',
      '      ├── manage.py',
      '      └── biblioteca/',
      '          ├── __init__.py',
      '          ├── settings.py',
      '          ├── urls.py',
      '          ├── asgi.py',
      '          └── wsgi.py',
      'Nota: A continuación debes entrar en la carpeta del proyecto para poder gestionar sus comandos.'
    ]
  },
  {
    id: 5,
    title: 'Paso 5: Entrar a la Carpeta del Proyecto (cd biblioteca)',
    instruction: 'Navega hacia la carpeta del proyecto recién creada donde se encuentra el archivo manage.py.',
    expectedCommands: [
      'cd biblioteca',
      'cd .\\biblioteca',
      'cd ./biblioteca'
    ],
    hint: 'Escribe: cd biblioteca',
    simulatedOutput: [
      '✔ Has entrado a C:\\proyectos\\django\\biblioteca.',
      'Observa cómo el prompt de tu terminal ahora refleja la nueva ruta de trabajo donde reside manage.py.'
    ]
  },
  {
    id: 6,
    title: 'Paso 6: Crear una Aplicación Modular (startapp libros)',
    instruction: 'Crea la aplicación modular "libros" dentro del proyecto biblioteca.',
    expectedCommands: [
      'python manage.py startapp libros',
      'py manage.py startapp libros',
      'python3 manage.py startapp libros'
    ],
    hint: 'Escribe: python manage.py startapp libros',
    simulatedOutput: [
      '✔ Aplicación "libros" creada con éxito en C:\\proyectos\\django\\biblioteca\\libros/.',
      'Archivos generados:',
      '  └── libros/',
      '      ├── __init__.py',
      '      ├── admin.py',
      '      ├── apps.py',
      '      ├── migrations/',
      '      ├── models.py',
      '      ├── tests.py',
      '      └── views.py',
      '¡Excelente! Ahora ve a la pestaña "Editor de Código" para registrarla en biblioteca/settings.py.'
    ]
  }
];

export default function DjangoInteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'editor'>('terminal');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isEnvActive, setIsEnvActive] = useState(false);
  const [isDjangoInstalled, setIsDjangoInstalled] = useState(false);
  const [isInProjectDir, setIsInProjectDir] = useState(false);
  const [history, setHistory] = useState<Array<{
    type: 'input' | 'output' | 'error' | 'success';
    text: string;
    hasEnv?: boolean;
    inProject?: boolean;
  }>>([
    {
      type: 'output',
      text: '🖥️ Simulador de Terminal Django (C:\\proyectos\\django)\nEscribe los comandos tal como lo harías en tu terminal real para completar la misión.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Editor State para biblioteca/settings.py
  const initialSettingsCode = `# biblioteca/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Registra aquí tu nueva aplicación 'libros':
    
]
`;
  const [editorCode, setEditorCode] = useState(initialSettingsCode);
  const [editorStatus, setEditorStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [editorMessage, setEditorMessage] = useState('');

  const currentStep = STEPS[currentStepIndex];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputValue.trim();
    if (!rawCmd) return;

    // Normalizar para comparación
    const normalized = rawCmd.toLowerCase().replace(/\\/g, '/');

    // Registrar comando ejecutado con el estado actual
    setHistory(prev => [
      ...prev,
      {
        type: 'input',
        text: rawCmd,
        hasEnv: isEnvActive,
        inProject: isInProjectDir
      }
    ]);
    setInputValue('');

    // Comandos de utilidad
    if (normalized === 'clear' || normalized === 'cls') {
      setHistory([]);
      return;
    }

    if (normalized === 'deactivate') {
      if (isEnvActive) {
        setIsEnvActive(false);
        setHistory(prev => [
          ...prev,
          {
            type: 'output',
            text: 'Entorno virtual desactivado. El prefijo (venv) ha desaparecido del prompt.'
          }
        ]);
      } else {
        setHistory(prev => [
          ...prev,
          { type: 'error', text: 'No hay ningún entorno virtual activo actualmente.' }
        ]);
      }
      return;
    }

    if (normalized === 'help') {
      setHistory(prev => [
        ...prev,
        {
          type: 'output',
          text: `Misión actual: ${currentStep?.title}\n${currentStep?.instruction}\nPista: ${currentStep?.hint}`
        }
      ]);
      return;
    }

    // Verificar si cumple el paso actual
    if (currentStep) {
      const isMatch = currentStep.expectedCommands.some(cmd => {
        const normExpected = cmd.toLowerCase().replace(/\\/g, '/');
        return normalized === normExpected;
      });

      if (isMatch) {
        // Efectos del paso
        if (currentStep.id === 2) {
          setIsEnvActive(true);
        }
        if (currentStep.id === 3) {
          setIsDjangoInstalled(true);
        }
        if (currentStep.id === 5) {
          setIsInProjectDir(true);
        }

        const newEntries: Array<{ type: 'output' | 'success'; text: string }> = currentStep.simulatedOutput.map(line => ({
          type: line.startsWith('✔') ? 'success' : 'output',
          text: line
        }));

        setHistory(prev => [...prev, ...newEntries]);

        if (currentStepIndex < STEPS.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setHistory(prev => [
            ...prev,
            {
              type: 'success',
              text: '🎉 ¡FELICITACIONES! Has completado todos los pasos de la terminal. Cambia a la pestaña "Editor de Código" para registrar tu aplicación \'libros\'.'
            }
          ]);
        }
      } else {
        // Advertencia si intenta instalar sin (venv)
        if (normalized.includes('pip install') && !isEnvActive) {
          setHistory(prev => [
            ...prev,
            {
              type: 'error',
              text: '⚠️ PELIGRO: Intentas instalar paquetes sin el entorno virtual activo. ¡Instalarías Django en el sistema global! Primero activa el entorno con: .\\venv\\Scripts\\activate'
            }
          ]);
          return;
        }

        // Advertencia si intenta usar manage.py antes de cd biblioteca
        if (normalized.includes('manage.py') && !isInProjectDir) {
          setHistory(prev => [
            ...prev,
            {
              type: 'error',
              text: '⚠️ ERROR: No se encuentra manage.py en el directorio actual. Primero debes entrar a la carpeta del proyecto con: cd biblioteca'
            }
          ]);
          return;
        }

        setHistory(prev => [
          ...prev,
          {
            type: 'error',
            text: `Comando no esperado para el paso actual. ${currentStep.hint}`
          }
        ]);
      }
    }
  };

  const handleValidateSettings = () => {
    // Verificar si contiene 'libros' o "libros" dentro de INSTALLED_APPS
    const hasApp = /['"]libros['"]/.test(editorCode);
    if (hasApp) {
      setEditorStatus('success');
      setEditorMessage('¡Perfecto! Has registrado la aplicación \'libros\' en INSTALLED_APPS de biblioteca/settings.py correctamente.');
    } else {
      setEditorStatus('error');
      setEditorMessage('No se detectó la aplicación \'libros\'. Asegúrate de añadir \'libros\', dentro de la lista INSTALLED_APPS.');
    }
  };

  const handleCopyHint = () => {
    if (currentStep) {
      const cmd = currentStep.expectedCommands[0].replace(/\//g, '\\');
      setInputValue(cmd);
    }
  };

  const renderPromptPath = (inProject: boolean = isInProjectDir) => {
    return inProject ? 'C:\\proyectos\\django\\biblioteca>' : 'C:\\proyectos\\django>';
  };

  return (
    <div className="rounded-2xl border-[3px] border-slate-900 bg-slate-950 text-slate-100 shadow-[8px_8px_0px_#0f172a] overflow-hidden my-8 font-sans">
      {/* Barra de Encabezado */}
      <div className="bg-slate-900 px-4 py-3 border-b-2 border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 ml-2 tracking-wide">
            laboratorio-django ~ C:\proyectos\django
          </span>
        </div>

        {/* Indicadores de Estado */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
            isEnvActive 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isEnvActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
            {isEnvActive ? '(venv) ACTIVO' : 'SIN ENTORNO (SISTEMA)'}
          </span>

          <span className={`px-2.5 py-1 rounded-full font-bold hidden sm:inline-block ${
            isDjangoInstalled 
              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            {isDjangoInstalled ? 'Django 5.1.1' : 'Django: No instalado'}
          </span>
        </div>
      </div>

      {/* Selector de Pestañas */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 text-sm font-bold">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex-1 py-3 px-4 text-center transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'terminal'
              ? 'bg-slate-950 text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <span>💻 1. Terminal Interactiva (venv)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            Paso {Math.min(currentStepIndex + 1, STEPS.length)} de {STEPS.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-3 px-4 text-center transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'editor'
              ? 'bg-slate-950 text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <span>📝 2. Editor de Código (biblioteca/settings.py)</span>
          {editorStatus === 'success' && <span className="text-emerald-400">✔</span>}
        </button>
      </div>

      {/* CONTENIDO PESTAÑA 1: TERMINAL */}
      {activeTab === 'terminal' && (
        <div className="p-4 sm:p-5">
          {/* Misión actual */}
          {currentStep && (
            <div className="mb-4 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                    MISIÓN
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white m-0">
                    {currentStep.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 m-0">
                  {currentStep.instruction}
                </p>
              </div>

              <button
                onClick={handleCopyHint}
                className="self-start sm:self-center text-xs font-mono px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors shrink-0 flex items-center gap-1.5"
                title="Autocompletar comando sugerido"
              >
                <span>💡 Pegar pista</span>
              </button>
            </div>
          )}

          {/* Ventana de salida de la terminal */}
          <div className="h-64 sm:h-72 overflow-y-auto bg-black/70 border border-slate-800/80 rounded-xl p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2 leading-relaxed">
            {history.map((item, index) => {
              if (item.type === 'input') {
                return (
                  <div key={index} className="flex flex-wrap items-center gap-1.5 text-slate-200">
                    {item.hasEnv ? (
                      <span className="text-emerald-400 font-bold font-mono tracking-tight">
                        (venv) PS {renderPromptPath(item.inProject)}
                      </span>
                    ) : (
                      <span className="text-indigo-400 font-mono">
                        PS {renderPromptPath(item.inProject)}
                      </span>
                    )}
                    <span className="text-white font-semibold">{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={index} className="text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-900/50 whitespace-pre-wrap">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'success') {
                return (
                  <div key={index} className="text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-900/50 whitespace-pre-wrap font-semibold">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={index} className="text-slate-400 whitespace-pre-wrap">
                  {item.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Input de comandos */}
          <form onSubmit={handleCommandSubmit} className="mt-3 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-2 focus-within:border-emerald-500 transition-colors">
            {isEnvActive ? (
              <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm pl-2 shrink-0 select-none">
                (venv) PS {renderPromptPath(isInProjectDir)}
              </span>
            ) : (
              <span className="text-indigo-400 font-mono text-xs sm:text-sm pl-2 shrink-0 select-none">
                PS {renderPromptPath(isInProjectDir)}
              </span>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentStep ? currentStep.hint.replace('Escribe: ', '') : 'Escribe un comando...'}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm px-1 placeholder-slate-600"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shrink-0"
            >
              Ejecutar ↵
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
            <span>Comandos rápidos: <code>help</code>, <code>clear</code>, <code>deactivate</code></span>
            <span>Presiona Enter para enviar</span>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 2: EDITOR */}
      {activeTab === 'editor' && (
        <div className="p-4 sm:p-5">
          <div className="mb-4 p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
            <h4 className="text-sm font-bold text-white mb-1">
              Misión: Registrar la aplicación <code className="text-emerald-400 font-mono">'libros'</code> en <code className="text-emerald-400 font-mono">INSTALLED_APPS</code>
            </h4>
            <p className="text-xs text-slate-300 m-0">
              Django no reconocerá los modelos ni vistas de la aplicación <strong>libros</strong> hasta que la agregues a la lista <code>INSTALLED_APPS</code> dentro de <code>biblioteca/settings.py</code>.
            </p>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
            <div className="bg-slate-850 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex justify-between">
              <span>biblioteca/settings.py</span>
              <span>Python 3.12</span>
            </div>
            <textarea
              value={editorCode}
              onChange={(e) => {
                setEditorCode(e.target.value);
                setEditorStatus('idle');
              }}
              rows={13}
              className="w-full bg-[#0B0F19] text-emerald-300 font-mono text-xs sm:text-sm p-4 outline-none resize-y"
              spellCheck={false}
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleValidateSettings}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-102"
            >
              Comprobar Configuración 🚀
            </button>

            <button
              onClick={() => {
                setEditorCode(initialSettingsCode);
                setEditorStatus('idle');
                setEditorMessage('');
              }}
              className="text-xs text-slate-400 hover:text-slate-200 underline font-mono"
            >
              Restablecer archivo original
            </button>
          </div>

          {/* Feedback de validación */}
          {editorStatus === 'success' && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <span className="text-lg">🎉</span>
              <span>{editorMessage}</span>
            </div>
          )}

          {editorStatus === 'error' && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-sm font-semibold flex items-center gap-2">
              <span className="text-lg">❌</span>
              <span>{editorMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
