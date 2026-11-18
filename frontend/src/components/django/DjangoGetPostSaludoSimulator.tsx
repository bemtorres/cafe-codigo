import { useState } from 'react';

type MethodType = 'GET' | 'POST';
type PresetId = 'case-a' | 'case-b' | 'case-c-get' | 'case-c-post' | 'invalid-json';

interface Preset {
  id: PresetId;
  label: string;
  badge: string;
  method: MethodType;
  queryValue: string;
  includeQueryParam: boolean;
  bodyText: string;
  description: string;
}

const PRESETS: Preset[] = [
  {
    id: 'case-a',
    label: 'Caso A · GET con ?nombre=Ana',
    badge: 'GET · 200 OK',
    method: 'GET',
    queryValue: 'Ana',
    includeQueryParam: true,
    bodyText: '{\n  "nombre": "Pedro"\n}',
    description: 'El nombre viaja en la URL como parámetro de consulta (?nombre=Ana) y la vista lo lee desde request.query_params.',
  },
  {
    id: 'case-b',
    label: 'Caso B · POST con {"nombre": "Pedro"}',
    badge: 'POST · 200 OK',
    method: 'POST',
    queryValue: 'Ana',
    includeQueryParam: false,
    bodyText: '{\n  "nombre": "Pedro"\n}',
    description: 'La URL va limpia (/api/saludar/) y el nombre viaja en el cuerpo JSON (Body → raw → JSON), leído con request.data.',
  },
  {
    id: 'case-c-get',
    label: 'Paso 6 · GET sin parámetros',
    badge: 'Fallback "estudiante"',
    method: 'GET',
    queryValue: '',
    includeQueryParam: false,
    bodyText: '{}',
    description: 'Al no enviar ?nombre= en la URL, request.query_params.get("nombre", "estudiante") devuelve el valor por defecto "estudiante".',
  },
  {
    id: 'case-c-post',
    label: 'Paso 6 · POST con JSON vacío {}',
    badge: 'Fallback "estudiante"',
    method: 'POST',
    queryValue: '',
    includeQueryParam: false,
    bodyText: '{}',
    description: 'Al enviar un objeto JSON vacío {}, request.data.get("nombre", "estudiante") devuelve el valor por defecto "estudiante".',
  },
  {
    id: 'invalid-json',
    label: 'Error · POST con JSON mal formado',
    badge: '400 Bad Request',
    method: 'POST',
    queryValue: '',
    includeQueryParam: false,
    bodyText: '{\n  "nombre": "Pedro"\n',
    description: 'Si olvidas cerrar una llave o comilla en Postman (raw → JSON), DRF responde automáticamente con 400 Bad Request (JSON parse error).',
  },
];

export default function DjangoGetPostSaludoSimulator() {
  const [activePreset, setActivePreset] = useState<PresetId>('case-a');
  const [method, setMethod] = useState<MethodType>('GET');
  const [includeQueryParam, setIncludeQueryParam] = useState<boolean>(true);
  const [queryValue, setQueryValue] = useState<string>('Ana');
  const [bodyText, setBodyText] = useState<string>('{\n  "nombre": "Pedro"\n}');
  const [viewMode, setViewMode] = useState<'json' | 'browsable'>('json');

  const applyPreset = (preset: Preset) => {
    setActivePreset(preset.id);
    setMethod(preset.method);
    setIncludeQueryParam(preset.includeQueryParam);
    setQueryValue(preset.queryValue);
    setBodyText(preset.bodyText);
  };

  // Compute simulated DRF execution
  let status = 200;
  let statusText = '200 OK';
  let responsePayload: Record<string, unknown> = {};
  let parsedBody: Record<string, unknown> | null = null;
  let parseError = '';
  let activeBranch: 'GET' | 'POST' | 'ERROR' = method;
  let resolvedName = 'estudiante';
  let usedDefault = false;

  if (method === 'GET') {
    if (includeQueryParam) {
      resolvedName = queryValue;
      usedDefault = false;
    } else {
      resolvedName = 'estudiante';
      usedDefault = true;
    }
    responsePayload = {
      mensaje: `Hola, ${resolvedName}`,
      metodo: 'GET',
    };
  } else {
    const trimmed = bodyText.trim();
    try {
      const parsed = trimmed === '' ? {} : JSON.parse(trimmed);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        status = 400;
        statusText = '400 Bad Request';
        activeBranch = 'ERROR';
        parseError = 'Se esperaba un objeto JSON { ... } en el cuerpo de la petición.';
        responsePayload = {
          detail: 'JSON parse error - Expected a JSON object.',
        };
      } else {
        parsedBody = parsed as Record<string, unknown>;
        if (Object.prototype.hasOwnProperty.call(parsedBody, 'nombre') && parsedBody.nombre !== undefined && parsedBody.nombre !== null) {
          resolvedName = String(parsedBody.nombre);
          usedDefault = false;
        } else {
          resolvedName = 'estudiante';
          usedDefault = true;
        }
        responsePayload = {
          mensaje: `Hola, ${resolvedName}`,
          metodo: 'POST',
        };
      }
    } catch (err) {
      status = 400;
      statusText = '400 Bad Request';
      activeBranch = 'ERROR';
      parseError = err instanceof Error ? err.message : 'Error de sintaxis en el JSON';
      responsePayload = {
        detail: `JSON parse error - ${parseError}`,
      };
    }
  }

  return (
    <div className="my-6 rounded-3xl border-2 border-slate-900 bg-white shadow-[6px_6px_0px_#0f172a] overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="bg-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-black tracking-wide text-emerald-400">
            POSTMAN / DRF SIMULATOR · /api/saludar/
          </span>
        </div>
        <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
          Sin modelos ni serializers · Solo @api_view y Response
        </span>
      </div>

      {/* Presets Strip */}
      <div className="p-4 bg-slate-100 border-b-2 border-slate-200">
        <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
          Escenarios rápidos de la Tarea 1 (Haz clic para probar):
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
                }`}
              >
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Request Builder Bar */}
      <div className="p-5 border-b-2 border-slate-200 bg-slate-50/70">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Method Selector */}
          <div className="inline-flex rounded-xl border-2 border-slate-900 overflow-hidden shrink-0 bg-white shadow-[2px_2px_0px_#0f172a]">
            <button
              type="button"
              onClick={() => {
                setMethod('GET');
                setActivePreset('case-a');
              }}
              className={`px-4 py-2.5 font-mono text-xs font-black cursor-pointer transition-colors ${
                method === 'GET'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              GET
            </button>
            <button
              type="button"
              onClick={() => {
                setMethod('POST');
                setIncludeQueryParam(false);
                setActivePreset('case-b');
              }}
              className={`px-4 py-2.5 font-mono text-xs font-black cursor-pointer transition-colors border-l-2 border-slate-900 ${
                method === 'POST'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              POST
            </button>
          </div>

          {/* URL Display */}
          <div className="flex-1 flex items-center bg-white border-2 border-slate-900 rounded-xl px-3.5 py-2 font-mono text-xs sm:text-sm text-slate-900 overflow-x-auto shadow-inner">
            <span className="text-slate-400 select-none">http://127.0.0.1:8000</span>
            <span className="font-bold text-slate-900">/api/saludar/</span>
            {method === 'GET' && includeQueryParam && (
              <span className="text-emerald-700 font-black bg-emerald-100 px-1.5 py-0.5 rounded ml-0.5">
                ?nombre={queryValue}
              </span>
            )}
          </div>

          {/* Status Pill */}
          <div
            className={`px-3.5 py-2 rounded-xl border-2 border-slate-900 font-mono text-xs font-black shrink-0 text-center shadow-[2px_2px_0px_#0f172a] ${
              status === 200
                ? 'bg-emerald-400 text-slate-950'
                : 'bg-rose-500 text-white'
            }`}
          >
            STATUS: {statusText}
          </div>
        </div>

        {/* Dynamic Controls for GET or POST */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left column: Input controls */}
          <div className="lg:col-span-6 bg-white p-4 rounded-2xl border-2 border-slate-300">
            {method === 'GET' ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                    Parámetros de Consulta (Query Params)
                  </span>
                  <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeQueryParam}
                      onChange={(e) => setIncludeQueryParam(e.target.checked)}
                      className="rounded border-slate-400 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    Incluir <code>?nombre=</code> en la URL
                  </label>
                </div>

                {includeQueryParam ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Valor del parámetro <code>nombre</code> en la URL:
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-2 rounded-lg border border-slate-300 text-slate-700">
                        ?nombre=
                      </span>
                      <input
                        type="text"
                        value={queryValue}
                        onChange={(e) => setQueryValue(e.target.value)}
                        placeholder="Escribe un nombre (ej. Ana)"
                        className="flex-1 px-3 py-1.5 rounded-lg border-2 border-slate-900 font-mono text-sm font-bold text-slate-900"
                      />
                    </div>
                    <p className="!text-xs !text-slate-500 !mt-2 !mb-0">
                      💡 En <code>GET</code>, los datos viajan visibles en la dirección URL. No se envía cuerpo JSON.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950">
                    <strong>URL sin parámetros:</strong> estás consultando <code>/api/saludar/</code> sin <code>?nombre=...</code>. La vista usará el valor por defecto <code>"estudiante"</code>.
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    Body → raw → JSON (Cuerpo de la petición)
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBodyText('{\n  "nombre": "Pedro"\n}')}
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
                    >
                      {"{\"nombre\": \"Pedro\"}"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBodyText('{}')}
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
                    >
                      {"{}"}
                    </button>
                  </div>
                </div>
                <textarea
                  rows={4}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs sm:text-sm border-2 border-slate-900 focus:outline-none"
                  spellCheck={false}
                />
                <p className="!text-xs !text-slate-500 !mt-1.5 !mb-0">
                  💡 En <code>POST</code>, la URL va sin parámetros y los datos viajan dentro del cuerpo JSON con encabezado <code>Content-Type: application/json</code>.
                </p>
              </div>
            )}
          </div>

          {/* Right column: Python View Execution Trace */}
          <div className="lg:col-span-6 bg-slate-950 text-slate-200 p-4 rounded-2xl border-2 border-slate-900 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800 text-[11px] text-slate-400">
              <span>⚡ Ejecución en vivo: api/views.py</span>
              <span className="text-emerald-400 font-bold">request.method == "{method}"</span>
            </div>

            <pre className="m-0 leading-relaxed overflow-x-auto text-[11.5px]">
              <div className="text-slate-400">@api_view(["GET", "POST"])</div>
              <div className="text-slate-200">def saludar(request):</div>
              <div
                className={`px-2 py-0.5 rounded ${
                  activeBranch === 'GET' ? 'bg-emerald-950/90 text-emerald-300 border-l-2 border-emerald-400' : 'text-slate-500'
                }`}
              >
                {'    '}if request.method == "GET":
              </div>
              <div
                className={`px-2 py-0.5 rounded ${
                  activeBranch === 'GET' ? 'bg-emerald-900/60 text-white font-bold border-l-2 border-emerald-400' : 'text-slate-500'
                }`}
              >
                {'        '}nombre = request.query_params.get("nombre", "estudiante")
                {activeBranch === 'GET' && (
                  <span className="ml-2 text-emerald-300">
                    # → "{resolvedName}" {usedDefault ? '(por defecto)' : '(de URL)'}
                  </span>
                )}
              </div>
              <div
                className={`px-2 py-0.5 rounded ${
                  activeBranch === 'POST' ? 'bg-amber-950/90 text-amber-300 border-l-2 border-amber-400' : 'text-slate-500'
                }`}
              >
                {'    '}else:
              </div>
              <div
                className={`px-2 py-0.5 rounded ${
                  activeBranch === 'POST' ? 'bg-amber-900/60 text-white font-bold border-l-2 border-amber-400' : 'text-slate-500'
                }`}
              >
                {'        '}nombre = request.data.get("nombre", "estudiante")
                {activeBranch === 'POST' && (
                  <span className="ml-2 text-amber-300">
                    # → "{resolvedName}" {usedDefault ? '(por defecto)' : '(de Body JSON)'}
                  </span>
                )}
              </div>
              <div className="mt-1 text-slate-300">
                {'    '}return Response({'{'} "mensaje": f"Hola, {'{'}nombre{'}'}", "metodo": request.method {'}'})
              </div>
            </pre>
          </div>
        </div>
      </div>

      {/* Response Panel */}
      <div className="p-5 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Respuesta del Servidor (Response):
            </span>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                status === 200 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              HTTP {statusText} · Content-Type: application/json
            </span>
          </div>

          <div className="inline-flex rounded-lg border border-slate-300 overflow-hidden text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('json')}
              className={`px-3 py-1 cursor-pointer ${
                viewMode === 'json' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              JSON Puro (Postman)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('browsable')}
              className={`px-3 py-1 cursor-pointer border-l border-slate-300 ${
                viewMode === 'browsable' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Interfaz DRF (Navegador)
            </button>
          </div>
        </div>

        {viewMode === 'json' ? (
          <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto border-2 border-slate-900 m-0">
            {JSON.stringify(responsePayload, null, 2)}
          </pre>
        ) : (
          <div className="rounded-2xl border-2 border-slate-300 overflow-hidden bg-slate-50">
            <div className="bg-slate-800 text-white px-4 py-2 text-xs font-mono flex items-center justify-between">
              <span>Django REST framework — Browsable API</span>
              <span className="text-emerald-300">GET / POST Soportados</span>
            </div>
            <div className="p-4 font-mono text-xs text-slate-800 space-y-2">
              <div className="p-2.5 rounded bg-slate-200/80 text-slate-900 font-bold">
                {method} /api/saludar/{method === 'GET' && includeQueryParam ? `?nombre=${queryValue}` : ''}
              </div>
              <div className="p-3 rounded bg-white border border-slate-300">
                <div className="text-slate-500 mb-1">HTTP {statusText}</div>
                <div className="text-slate-500 mb-2">Allow: GET, POST, OPTIONS</div>
                <pre className="m-0 text-emerald-800 font-bold">
                  {JSON.stringify(responsePayload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
