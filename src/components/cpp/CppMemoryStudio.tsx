import React, { useState } from 'react';

type StudioTab = 'stack' | 'pointers' | 'vector';

interface StackVar {
  id: string;
  name: string;
  type: 'int' | 'double' | 'char' | 'bool';
  value: string;
  address: string;
  bytes: number;
}

export default function CppMemoryStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>('stack');

  // ================= TAB 1: STACK VARIABLES =================
  const [stackVars, setStackVars] = useState<StackVar[]>([
    { id: '1', name: 'vidas', type: 'int', value: '3', address: '0x7ffee400', bytes: 4 },
    { id: '2', name: 'puntaje', type: 'double', value: '98.5', address: '0x7ffee404', bytes: 8 },
    { id: '3', name: 'rango', type: 'char', value: "'S'", address: '0x7ffee40c', bytes: 1 },
    { id: '4', name: 'activo', type: 'bool', value: 'true', address: '0x7ffee40d', bytes: 1 },
  ]);

  const [newVarName, setNewVarName] = useState('');
  const [newVarType, setNewVarType] = useState<'int' | 'double' | 'char' | 'bool'>('int');
  const [newVarVal, setNewVarVal] = useState('');

  const handleAddVar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVarName.trim() || !newVarVal.trim()) return;

    const baseAddress = 0x7ffee400 + stackVars.length * 4;
    const hexAddr = '0x' + baseAddress.toString(16);
    const bytesMap = { int: 4, double: 8, char: 1, bool: 1 };

    setStackVars([
      ...stackVars,
      {
        id: Date.now().toString(),
        name: newVarName.trim().replace(/\s+/g, '_'),
        type: newVarType,
        value: newVarType === 'char' ? `'${newVarVal.trim().charAt(0)}'` : newVarVal.trim(),
        address: hexAddr,
        bytes: bytesMap[newVarType],
      },
    ]);

    setNewVarName('');
    setNewVarVal('');
  };

  const handleRemoveVar = (id: string) => {
    setStackVars(stackVars.filter((v) => v.id !== id));
  };

  // ================= TAB 2: POINTERS & REFERENCES =================
  const [originalValue, setOriginalValue] = useState(42);
  const [actionLog, setActionLog] = useState<string>('Estado inicial: int valor = 42 en 0x7ffee410');
  const [pulseTarget, setPulseTarget] = useState(false);

  const triggerPulse = (msg: string) => {
    setActionLog(msg);
    setPulseTarget(true);
    setTimeout(() => setPulseTarget(false), 800);
  };

  const mutateDirect = () => {
    const next = originalValue + 10;
    setOriginalValue(next);
    triggerPulse(`Modificación directa: valor = ${next}; (Modifica la casilla original)`);
  };

  const mutateByRef = () => {
    const next = originalValue + 50;
    setOriginalValue(next);
    triggerPulse(`Paso por Referencia: ref = ${next}; (ref es un alias para 0x7ffee410)`);
  };

  const mutateByPtr = () => {
    const next = originalValue + 100;
    setOriginalValue(next);
    triggerPulse(`Desreferenciación: *ptr = ${next}; (Sigue la dirección 0x7ffee410 y altera el casillero)`);
  };

  // ================= TAB 3: VECTOR DYNAMICS =================
  const [vectorItems, setVectorItems] = useState<number[]>([10, 20, 30]);
  const [vectorCapacity, setVectorCapacity] = useState<number>(4);
  const [reallocNotice, setReallocNotice] = useState<string | null>(null);

  const handlePushBack = () => {
    const nextVal = (vectorItems.length + 1) * 10;
    let nextCap = vectorCapacity;

    if (vectorItems.length >= vectorCapacity) {
      nextCap = vectorCapacity === 0 ? 1 : vectorCapacity * 2;
      setVectorCapacity(nextCap);
      setReallocNotice(`⚡ ¡Reallocación! Se superó la capacidad. C++ duplicó la memoria a ${nextCap} casilleros.`);
      setTimeout(() => setReallocNotice(null), 3000);
    }

    setVectorItems([...vectorItems, nextVal]);
  };

  const handlePopBack = () => {
    if (vectorItems.length === 0) return;
    setVectorItems(vectorItems.slice(0, -1));
  };

  const handleClearVector = () => {
    setVectorItems([]);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-md">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Simulador Interactivo de Hardware & Memoria
            </span>
          </div>
          <h3 className="text-xl font-black text-white m-0 flex items-center gap-2">
            <span>CppMemoryStudio</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
              v1.0 RAM Inspector
            </span>
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Inspecciona cómo C++ distribuye variables, punteros y vectores en la memoria física.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('stack')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'stack'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            📦 1. Variables (Stack)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pointers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pointers'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            🎯 2. Punteros & Ref (& vs *)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vector')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'vector'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            🚀 3. std::vector (Size vs Cap)
          </button>
        </div>
      </div>

      {/* TAB 1: STACK MEMORY */}
      {activeTab === 'stack' && (
        <div>
          <div className="mb-4 p-4 rounded-xl bg-blue-950/30 border border-blue-500/20">
            <h4 className="text-sm font-bold text-blue-300 m-0 mb-1 flex items-center gap-2">
              <span>🧠 Modelo Mental de Casilleros de RAM</span>
            </h4>
            <p className="text-xs text-slate-300 m-0 leading-relaxed">
              Cada variable que declaras en C++ ocupa una cantidad fija de <strong>bytes contiguos</strong> en la memoria
              Stack. El <strong>nombre</strong> es tu etiqueta para humanos; la computadora solo reconoce la{' '}
              <strong>dirección hexadecimal</strong> física.
            </p>
          </div>

          {/* MEMORY GRID */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-400">
                  <th className="p-3 font-mono">Dirección RAM</th>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">sizeof</th>
                  <th className="p-3">Valor Almacenado</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {stackVars.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-amber-400">{v.address}</td>
                    <td className="p-3 text-white font-sans font-bold">{v.name}</td>
                    <td className="p-3 text-cyan-400">{v.type}</td>
                    <td className="p-3 text-slate-400">{v.bytes} {v.bytes === 1 ? 'byte' : 'bytes'}</td>
                    <td className="p-3 text-emerald-400 font-bold">{v.value}</td>
                    <td className="p-3 text-right font-sans">
                      <button
                        type="button"
                        onClick={() => handleRemoveVar(v.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        Liberar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FORMULARIO AGREGAR VARIABLE */}
          <form onSubmit={handleAddVar} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              + Declarar nueva variable en tiempo real
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Tipo de dato</label>
                <select
                  value={newVarType}
                  onChange={(e) => setNewVarType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="int">int (4 bytes)</option>
                  <option value="double">double (8 bytes)</option>
                  <option value="char">char (1 byte)</option>
                  <option value="bool">bool (1 byte)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="ej. velocidad"
                  value={newVarName}
                  onChange={(e) => setNewVarName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Valor inicial</label>
                <input
                  type="text"
                  placeholder="ej. 120"
                  value={newVarVal}
                  onChange={(e) => setNewVarVal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded-lg text-xs transition-colors shadow-lg shadow-blue-600/30"
                >
                  Reservar en RAM
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: POINTERS & REFERENCES */}
      {activeTab === 'pointers' && (
        <div>
          <div className="mb-4 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
            <h4 className="text-sm font-bold text-indigo-300 m-0 mb-1 flex items-center gap-2">
              <span>🎯 Desmitificando Referencias (&) y Punteros (*)</span>
            </h4>
            <p className="text-xs text-slate-300 m-0 leading-relaxed">
              <strong>Referencia (&):</strong> Es un segundo nombre o alias que comparte exactamente la misma dirección de memoria.{' '}
              <strong>Puntero (*):</strong> Es un casillero independiente que guarda como valor el número de dirección de otra variable.
            </p>
          </div>

          {/* VISUAL DIAGRAM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* TARGET VARIABLE */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                pulseTarget
                  ? 'border-emerald-400 bg-emerald-500/20 scale-105 shadow-xl shadow-emerald-500/30'
                  : 'border-slate-700 bg-slate-950/80'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-amber-400 font-bold">0x7ffee410</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                  Variable Original
                </span>
              </div>
              <div className="font-mono text-lg text-white font-black mb-1">int valor = {originalValue};</div>
              <p className="text-xs text-slate-400 m-0">Casillero físico en RAM que almacena el entero.</p>
            </div>

            {/* REFERENCE */}
            <div className="p-5 rounded-2xl border border-indigo-500/40 bg-indigo-950/30">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-amber-400 font-bold">0x7ffee410 (mismo)</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                  Alias Referencia (&)
                </span>
              </div>
              <div className="font-mono text-lg text-indigo-300 font-black mb-1">int& ref = valor;</div>
              <p className="text-xs text-slate-400 m-0">
                No ocupa memoria extra. Modificar `ref` modifica directamente `valor`.
              </p>
            </div>

            {/* POINTER */}
            <div className="p-5 rounded-2xl border border-violet-500/40 bg-violet-950/30 relative">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-violet-400 font-bold">0x7ffee418</span>
                <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] font-bold">
                  Puntero (*)
                </span>
              </div>
              <div className="font-mono text-lg text-violet-300 font-black mb-1">int* ptr = &valor;</div>
              <div className="text-xs font-mono text-emerald-400 mt-2 p-1.5 rounded bg-slate-900 border border-slate-800">
                Contenido de ptr: 0x7ffee410 ➔
              </div>
              <p className="text-xs text-slate-400 m-0 mt-2">
                Guarda la dirección de `valor`. Usar `*ptr` desreferencia la flecha.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              ⚡ Prueba las mutaciones en vivo
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={mutateDirect}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all text-left border border-slate-700"
              >
                <span className="block text-blue-400 font-mono text-[11px] mb-1">Directo</span>
                valor = valor + 10;
              </button>
              <button
                type="button"
                onClick={mutateByRef}
                className="p-3 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-white text-xs font-bold transition-all text-left border border-indigo-700"
              >
                <span className="block text-indigo-300 font-mono text-[11px] mb-1">Vía Referencia (&)</span>
                ref = ref + 50;
              </button>
              <button
                type="button"
                onClick={mutateByPtr}
                className="p-3 rounded-xl bg-violet-900/60 hover:bg-violet-800 text-white text-xs font-bold transition-all text-left border border-violet-700"
              >
                <span className="block text-violet-300 font-mono text-[11px] mb-1">Vía Puntero (*)</span>
                *ptr = *ptr + 100;
              </button>
            </div>
          </div>

          {/* LOG CONSOLE */}
          <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">$</span>
            <span>{actionLog}</span>
          </div>
        </div>
      )}

      {/* TAB 3: VECTOR DYNAMICS */}
      {activeTab === 'vector' && (
        <div>
          <div className="mb-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
            <h4 className="text-sm font-bold text-emerald-300 m-0 mb-1 flex items-center gap-2">
              <span>🚀 Tamaño (size) vs Capacidad (capacity) en std::vector</span>
            </h4>
            <p className="text-xs text-slate-300 m-0 leading-relaxed">
              Un vector reserva un bloque de casilleros contiguos en el <strong>Heap</strong>. Cuando el vector se llena
              (<code>size == capacity</code>) y haces otro <code>push_back()</code>, C++ duplica la capacidad
              automáticamente reservando un bloque nuevo en otra parte de la RAM.
            </p>
          </div>

          {/* NOTICE OF REALLOCATION */}
          {reallocNotice && (
            <div className="mb-4 p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-bounce flex items-center gap-2">
              <span>⚠️</span>
              <span>{reallocNotice}</span>
            </div>
          )}

          {/* CAPACITY STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">vec.size()</span>
              <span className="text-xl font-black text-white">{vectorItems.length}</span>
              <span className="text-[10px] text-slate-500 block">elementos reales</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">vec.capacity()</span>
              <span className="text-xl font-black text-emerald-400">{vectorCapacity}</span>
              <span className="text-[10px] text-slate-500 block">casilleros reservados</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">vec.empty()</span>
              <span className="text-xl font-black text-cyan-400">{vectorItems.length === 0 ? 'true' : 'false'}</span>
              <span className="text-[10px] text-slate-500 block">¿está vacío?</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">vec.back()</span>
              <span className="text-xl font-black text-amber-400">
                {vectorItems.length > 0 ? vectorItems[vectorItems.length - 1] : 'N/A'}
              </span>
              <span className="text-[10px] text-slate-500 block">último valor</span>
            </div>
          </div>

          {/* VISUAL SLOTS */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Visualización de Casilleros en el Heap:
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {Array.from({ length: vectorCapacity }).map((_, index) => {
                const hasValue = index < vectorItems.length;
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      hasValue
                        ? 'border-emerald-500/50 bg-emerald-500/20 text-white font-mono font-bold shadow-md shadow-emerald-500/10'
                        : 'border-dashed border-slate-700 bg-slate-900/30 text-slate-600 font-mono'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 mb-1">[{index}]</div>
                    <div className="text-sm">{hasValue ? vectorItems[index] : 'vacío'}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VECTOR ACTIONS */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handlePushBack}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              <span>➕</span>
              <span>vec.push_back()</span>
            </button>
            <button
              type="button"
              onClick={handlePopBack}
              disabled={vectorItems.length === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all disabled:opacity-40 flex items-center gap-2"
            >
              <span>➖</span>
              <span>vec.pop_back()</span>
            </button>
            <button
              type="button"
              onClick={handleClearVector}
              disabled={vectorItems.length === 0}
              className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold text-xs transition-all disabled:opacity-40 border border-rose-800 flex items-center gap-2"
            >
              <span>🗑️</span>
              <span>vec.clear()</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
