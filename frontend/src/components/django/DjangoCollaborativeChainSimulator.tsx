import { useState } from 'react';

type ActivityMode = 'act1' | 'act2' | 'act3';
type Operation = 'suma' | 'resta' | 'multiplicacion' | 'division' | 'potencia_invalida';

export default function DjangoCollaborativeChainSimulator() {
  const [mode, setMode] = useState<ActivityMode>('act3');

  // State for Act 1 & Act 2 (Calculadora)
  const [val1Input, setVal1Input] = useState<string>('12');
  const [val2Input, setVal2Input] = useState<string>('4');
  const [sendTextAsVal1, setSendTextAsVal1] = useState<boolean>(false);
  const [operation, setOperation] = useState<Operation>('division');

  // State for Act 3 (Vino)
  const [kgInput, setKgInput] = useState<string>('100');
  const [sendTextAsKg, setSendTextAsKg] = useState<boolean>(false);

  // Common state for Act 2 & Act 3: Server C status
  const [serverCOnline, setServerCOnline] = useState<boolean>(true);

  // =========================================================================
  // SIMULACIÓN ACTIVIDAD 1 Y 2
  // =========================================================================
  const parsedVal1 = sendTextAsVal1 ? 'hola' : Number(val1Input);
  const parsedVal2 = Number(val2Input);

  let calcStatus = 200;
  let calcStoppedAt: 'B' | 'C' = mode === 'act1' ? 'B' : 'C';
  let calcCalledC = false;
  let calcResponse: Record<string, unknown> = {};

  if (mode === 'act1' || mode === 'act2') {
    if (sendTextAsVal1 || Number.isNaN(Number(val1Input))) {
      calcStatus = 400;
      calcStoppedAt = 'B';
      calcCalledC = false;
      calcResponse = { error: 'valor1 debe ser un número JSON' };
    } else if (Number.isNaN(parsedVal2)) {
      calcStatus = 400;
      calcStoppedAt = 'B';
      calcCalledC = false;
      calcResponse = { error: 'valor2 debe ser un número JSON' };
    } else if (!['suma', 'resta', 'multiplicacion', 'division'].includes(operation)) {
      calcStatus = 400;
      calcStoppedAt = 'B';
      calcCalledC = false;
      calcResponse = { error: 'Operación no permitida' };
    } else if (operation === 'division' && parsedVal2 === 0) {
      calcStatus = 400;
      calcStoppedAt = 'B';
      calcCalledC = false;
      calcResponse = { error: 'No se puede dividir entre cero' };
    } else if (mode === 'act2' && !serverCOnline) {
      calcStatus = 502;
      calcStoppedAt = 'B';
      calcCalledC = true;
      calcResponse = { error: 'No se pudo contactar con C' };
    } else {
      calcStatus = 200;
      calcCalledC = mode === 'act2';
      const a = Number(val1Input);
      const b = parsedVal2;
      let res = 0;
      if (operation === 'suma') res = a + b;
      else if (operation === 'resta') res = a - b;
      else if (operation === 'multiplicacion') res = a * b;
      else if (operation === 'division') res = a / b;

      calcResponse = {
        operacion: operation,
        valor1: a,
        valor2: b,
        resultado: Number(res.toFixed(6)),
      };
    }
  }

  // =========================================================================
  // SIMULACIÓN ACTIVIDAD 3 (DISTRIBUIDORA DE VINO)
  // =========================================================================
  const kgNum = Number(kgInput);
  let wineStatus = 200;
  let wineCalledC = false;
  let winePayloadToC: Record<string, unknown> | null = null;
  let wineResponseFromC: Record<string, unknown> | null = null;
  let wineFinalReport: Record<string, unknown> = {};

  if (sendTextAsKg || Number.isNaN(kgNum)) {
    wineStatus = 400;
    wineCalledC = false;
    wineFinalReport = { error: 'kg_uva debe ser un número JSON' };
  } else if (!(kgNum > 0 && kgNum <= 10000)) {
    wineStatus = 400;
    wineCalledC = false;
    wineFinalReport = { error: 'kg_uva debe ser mayor que 0 y hasta 10000' };
  } else {
    const kgJugo = kgNum * 0.7;
    const kgResiduo = kgNum * 0.3;
    const litrosJugo = kgJugo / 1.0;
    wineCalledC = true;
    winePayloadToC = { litros_jugo: Number(litrosJugo.toFixed(3)) };

    if (!serverCOnline) {
      wineStatus = 502;
      wineFinalReport = { error: 'C no respondió con un resultado válido' };
    } else {
      const vino = litrosJugo * 0.8;
      const vinagre = litrosJugo * 0.1;
      const merma = litrosJugo * 0.1;
      wineResponseFromC = {
        litros_vino: Number(vino.toFixed(3)),
        litros_vinagre: Number(vinagre.toFixed(3)),
        litros_merma_proceso: Number(merma.toFixed(3)),
      };

      const copas = Math.floor(Number((vino / 0.15).toFixed(9)));
      const sobrante = Math.max(0.0, vino - copas * 0.15);

      wineStatus = 200;
      wineFinalReport = {
        kg_uva: kgNum,
        kg_jugo_extraido: Number(kgJugo.toFixed(3)),
        kg_residuo_extraccion: Number(kgResiduo.toFixed(3)),
        litros_jugo: Number(litrosJugo.toFixed(3)),
        litros_vino: Number(vino.toFixed(3)),
        litros_vinagre: Number(vinagre.toFixed(3)),
        litros_merma_proceso: Number(merma.toFixed(3)),
        ml_por_copa: 150,
        copas_completas: copas,
        litros_vino_sobrante: Number(sobrante.toFixed(3)),
      };
    }
  }

  return (
    <div className="my-6 rounded-3xl border-2 border-slate-900 bg-white shadow-[6px_6px_0px_#0f172a] overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-black tracking-wide text-emerald-400">
            SIMULADOR DE RED COLABORATIVA · NODOS A → B → C
          </span>
        </div>

        {(mode === 'act2' || mode === 'act3') && (
          <label className="inline-flex items-center gap-2 text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={!serverCOnline}
              onChange={(e) => setServerCOnline(!e.target.checked)}
              className="rounded border-slate-600 text-rose-500"
            />
            <span className={serverCOnline ? 'text-emerald-300 font-bold' : 'text-rose-400 font-black'}>
              {serverCOnline ? '🟢 Servidor C Encendido (Click para apagar y probar 502)' : '🔴 Servidor C Detenido (Simulando Error 502 en B)'}
            </span>
          </label>
        )}
      </div>

      {/* Selector de Actividad */}
      <div className="p-3.5 bg-slate-100 border-b-2 border-slate-200 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode('act1')}
          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer border-2 transition-all ${
            mode === 'act1'
              ? 'bg-emerald-600 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
          }`}
        >
          🖩 Actividad 1: Calculadora (2 Compañeros: A → B)
        </button>

        <button
          type="button"
          onClick={() => setMode('act2')}
          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer border-2 transition-all ${
            mode === 'act2'
              ? 'bg-cyan-600 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
          }`}
        >
          🛡️ Actividad 2: Validador + Calculadora (3 Compañeros: A → B → C)
        </button>

        <button
          type="button"
          onClick={() => setMode('act3')}
          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer border-2 transition-all ${
            mode === 'act3'
              ? 'bg-[#881337] text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
          }`}
        >
          🍷 Actividad 3: Distribuidora de Vino en Cadena (A → B → C → B → A)
        </button>
      </div>

      {/* CONTENIDO SEGÚN ACTIVIDAD */}
      {mode === 'act3' ? (
        <div className="p-5 space-y-5">
          {/* Controles rápidos de lotes de uva */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-rose-950 mr-1">
                Pruebas obligatorias de lote:
              </span>
              <button
                type="button"
                onClick={() => { setSendTextAsKg(false); setKgInput('100'); setServerCOnline(true); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-100 text-rose-950 border border-rose-300 text-xs font-black cursor-pointer"
              >
                🍇 100 kg (373 copas)
              </button>
              <button
                type="button"
                onClick={() => { setSendTextAsKg(false); setKgInput('50'); setServerCOnline(true); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-100 text-rose-950 border border-rose-300 text-xs font-black cursor-pointer"
              >
                🍇 50 kg (186 copas)
              </button>
              <button
                type="button"
                onClick={() => { setSendTextAsKg(false); setKgInput('0'); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
              >
                ⚠️ 0 kg (Error 400)
              </button>
              <button
                type="button"
                onClick={() => { setSendTextAsKg(false); setKgInput('15000'); }}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
              >
                ⚠️ 15 000 kg (&gt;10 000 → 400)
              </button>
              <button
                type="button"
                onClick={() => setSendTextAsKg(true)}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold cursor-pointer"
              >
                ⚠️ Texto "cien" (Error 400)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-black text-slate-700">kg_uva:</label>
              <input
                type="number"
                value={kgInput}
                onChange={(e) => { setSendTextAsKg(false); setKgInput(e.target.value); }}
                className="w-28 px-3 py-1.5 rounded-lg border-2 border-slate-900 font-mono text-sm font-black bg-white"
              />
            </div>
          </div>

          {/* Diagrama de 3 compañeros en cadena */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Compañero A */}
            <div className="p-4 rounded-2xl border-2 border-slate-900 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white font-mono text-xs font-black">
                  COMPAÑERO A · RECEPCIÓN
                </span>
                <span className="text-[11px] font-mono text-slate-500">cliente_vino.py</span>
              </div>
              <p className="!text-xs text-slate-600 !mb-2">
                Envía <code>POST /api/procesar-lote/</code> al servidor de B:
              </p>
              <pre className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs m-0">
                {JSON.stringify({ kg_uva: sendTextAsKg ? 'cien' : kgNum }, null, 2)}
              </pre>
            </div>

            {/* Compañero B */}
            <div className="p-4 rounded-2xl border-2 border-amber-600 bg-amber-50/50">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-600 text-white font-mono text-xs font-black">
                  COMPAÑERO B · EXTRACCIÓN &amp; COPAS
                </span>
                <span className="text-[11px] font-mono text-amber-900">192.168.1.20:8000</span>
              </div>
              {wineStatus === 400 ? (
                <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs text-rose-900 font-bold">
                  🛑 B rechaza con 400 Bad Request y NO llama a C: {String(wineFinalReport.error)}
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-white border border-amber-300">
                    <div><strong>1ª Intervención (Extracción):</strong></div>
                    <div>• Jugo (70%): <strong>{Number((kgNum * 0.7).toFixed(3))} kg = {Number((kgNum * 0.7).toFixed(3))} L</strong></div>
                    <div>• Residuo sólido (30%): <strong>{Number((kgNum * 0.3).toFixed(3))} kg</strong></div>
                  </div>
                  <div className="p-2 rounded bg-white border border-amber-300">
                    <div><strong>2ª Intervención (Envasado en copas de 0.150 L):</strong></div>
                    {serverCOnline ? (
                      <div>
                        • Copas completas: <strong>{String(wineFinalReport.copas_completas)} copas</strong><br />
                        • Vino sobrante: <strong>{String(wineFinalReport.litros_vino_sobrante)} L</strong>
                      </div>
                    ) : (
                      <div className="text-rose-700 font-bold">
                        ⚠️ B no pudo recibir datos de C → Devuelve 502 Bad Gateway a A.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Compañero C */}
            <div className={`p-4 rounded-2xl border-2 ${serverCOnline ? 'border-emerald-600 bg-emerald-50/50' : 'border-rose-500 bg-rose-50/60'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded text-white font-mono text-xs font-black ${serverCOnline ? 'bg-emerald-700' : 'bg-rose-600'}`}>
                  COMPAÑERO C · TRANSFORMACIÓN
                </span>
                <span className="text-[11px] font-mono text-slate-600">192.168.1.30:8000</span>
              </div>
              {!wineCalledC ? (
                <div className="p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-500 italic">
                  C no recibió ninguna petición porque B detuvo el lote inválido.
                </div>
              ) : !serverCOnline ? (
                <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs text-rose-900 font-bold">
                  🔌 Servidor C apagado. La llamada POST de B hacia /api/transformar/ falló con RequestException.
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="text-slate-600">
                    Recibe de B: <code>{JSON.stringify(winePayloadToC)}</code>
                  </div>
                  <pre className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs m-0">
                    {JSON.stringify(wineResponseFromC, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Informe JSON Final entregado a A */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase text-slate-700">
                Informe JSON Final recibido por el Compañero A:
              </span>
              <span
                className={`font-mono text-xs font-black px-2.5 py-0.5 rounded ${
                  wineStatus === 200
                    ? 'bg-emerald-100 text-emerald-900'
                    : wineStatus === 400
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                HTTP {wineStatus}
              </span>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto border-2 border-slate-900 m-0">
              {JSON.stringify(wineFinalReport, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="p-5 space-y-5">
          {/* Controles de Calculadora (Actividad 1 y 2) */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500">valor1</label>
                <input
                  type="number"
                  value={val1Input}
                  disabled={sendTextAsVal1}
                  onChange={(e) => setVal1Input(e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-lg border-2 border-slate-900 font-mono text-sm font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500">operacion</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as Operation)}
                  className="px-3 py-1.5 rounded-lg border-2 border-slate-900 font-mono text-sm font-bold bg-white"
                >
                  <option value="suma">suma (+)</option>
                  <option value="resta">resta (−)</option>
                  <option value="multiplicacion">multiplicacion (×)</option>
                  <option value="division">division (÷)</option>
                  <option value="potencia_invalida">potencia (no permitida → 400)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-500">valor2</label>
                <input
                  type="number"
                  value={val2Input}
                  onChange={(e) => setVal2Input(e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-lg border-2 border-slate-900 font-mono text-sm font-bold bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setSendTextAsVal1(false); setVal1Input('12'); setVal2Input('4'); setOperation('division'); setServerCOnline(true); }}
                className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-950 text-xs font-black border border-emerald-400 cursor-pointer"
              >
                ✓ 12 y 4 (division → 3.0)
              </button>
              <button
                type="button"
                onClick={() => { setSendTextAsVal1(false); setVal2Input('0'); setOperation('division'); }}
                className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-950 text-xs font-bold border border-amber-400 cursor-pointer"
              >
                ⚠️ División entre 0 (400)
              </button>
              <button
                type="button"
                onClick={() => setSendTextAsVal1(!sendTextAsVal1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                  sendTextAsVal1 ? 'bg-rose-600 text-white border-slate-900' : 'bg-amber-100 text-amber-950 border-amber-400'
                }`}
              >
                ⚠️ valor1: "hola" (400)
              </button>
            </div>
          </div>

          {/* Flujo de Nodos para Act 1 o Act 2 */}
          <div className={`grid grid-cols-1 ${mode === 'act2' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4`}>
            <div className="p-4 rounded-2xl border-2 border-slate-900 bg-slate-50">
              <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white font-mono text-xs font-black inline-block mb-2">
                COMPAÑERO A · CLIENTE (cliente.py)
              </span>
              <p className="!text-xs text-slate-600 !mb-2">
                Envía <code>POST {mode === 'act1' ? '/api/calcular/' : '/api/validar/'}</code> con JSON:
              </p>
              <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs m-0">
                {JSON.stringify({ valor1: parsedVal1, valor2: parsedVal2, operacion: operation }, null, 2)}
              </pre>
            </div>

            {mode === 'act2' && (
              <div className="p-4 rounded-2xl border-2 border-cyan-600 bg-cyan-50/50">
                <span className="px-2.5 py-0.5 rounded bg-cyan-700 text-white font-mono text-xs font-black inline-block mb-2">
                  COMPAÑERO B · VALIDADOR (/api/validar/)
                </span>
                {calcStatus === 400 && calcStoppedAt === 'B' ? (
                  <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs text-rose-900 font-bold">
                    🛑 B detecta datos inválidos y responde 400 inmediatamente SIN llamar a C.
                  </div>
                ) : !serverCOnline ? (
                  <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs text-rose-900 font-bold">
                    ⚠️ B validó bien los datos, pero al llamar a C falló la conexión → B responde 502 Bad Gateway.
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-cyan-300 text-xs text-slate-800">
                    ✅ B valida tipos y reglas con <code>leer_numero()</code> y reenvía la petición mediante <code>requests.post()</code> a C.
                  </div>
                )}
              </div>
            )}

            <div className="p-4 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50">
              <span className="px-2.5 py-0.5 rounded bg-emerald-700 text-white font-mono text-xs font-black inline-block mb-2">
                {mode === 'act1' ? 'COMPAÑERO B · CALCULADORA (/api/calcular/)' : 'COMPAÑERO C · CALCULADORA (/api/calcular/)'}
              </span>
              {mode === 'act2' && !calcCalledC ? (
                <div className="p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-500 italic">
                  El servidor C no recibió ninguna solicitud porque B detuvo el error en la validación.
                </div>
              ) : mode === 'act2' && !serverCOnline ? (
                <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs text-rose-900 font-bold">
                  🔌 Servidor C apagado.
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-700">Respuesta JSON:</span>
                    <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-emerald-200 text-emerald-950">
                      HTTP {calcStatus}
                    </span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs m-0">
                    {JSON.stringify(calcResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
