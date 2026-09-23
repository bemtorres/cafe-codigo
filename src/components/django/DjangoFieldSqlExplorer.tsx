import React, { useState } from 'react';

type FieldType = 'CharField' | 'TextField' | 'IntegerField' | 'DecimalField' | 'BooleanField' | 'DateTimeField' | 'ForeignKey';
type SqlDialect = 'postgresql' | 'sqlite';

interface FieldConfig {
  fieldName: string;
  fieldType: FieldType;
  maxLength: number;
  isNull: boolean;
  isBlank: boolean;
  isUnique: boolean;
  hasDbIndex: boolean;
  defaultValue: string;
  hasChoices: boolean;
  // Numeric
  isPositive: boolean;
  maxDigits: number;
  decimalPlaces: number;
  // DateTime
  autoNowAdd: boolean;
  autoNow: boolean;
  // ForeignKey
  targetModel: string;
  onDelete: 'CASCADE' | 'PROTECT' | 'SET_NULL' | 'DO_NOTHING';
}

const PRESETS: Record<string, Partial<FieldConfig> & { label: string; desc: string }> = {
  username: {
    label: '👤 Nombre de Usuario',
    desc: 'Texto corto único e indexado para login',
    fieldName: 'username',
    fieldType: 'CharField',
    maxLength: 50,
    isNull: false,
    isBlank: false,
    isUnique: true,
    hasDbIndex: true,
    defaultValue: '',
    hasChoices: false,
  },
  estado: {
    label: '🏷️ Estado con Choices',
    desc: 'Opciones restringidas en Django pero guardadas como VARCHAR',
    fieldName: 'estado',
    fieldType: 'CharField',
    maxLength: 20,
    isNull: false,
    isBlank: false,
    isUnique: false,
    hasDbIndex: true,
    defaultValue: 'PENDIENTE',
    hasChoices: true,
  },
  precio: {
    label: '💰 Precio Monetario',
    desc: 'DecimalField de alta precisión bancaria',
    fieldName: 'precio',
    fieldType: 'DecimalField',
    maxDigits: 10,
    decimalPlaces: 2,
    isNull: false,
    isBlank: false,
    isUnique: false,
    defaultValue: '0.00',
  },
  created_at: {
    label: '⏱️ Timestamp Creación',
    desc: 'Fecha y hora grabada automáticamente al insertar',
    fieldName: 'created_at',
    fieldType: 'DateTimeField',
    autoNowAdd: true,
    autoNow: false,
    isNull: false,
    isBlank: true,
  },
  categoria: {
    label: '🔗 Clave Foránea (1:N)',
    desc: 'Columna con sufijo _id y restricción referencial',
    fieldName: 'categoria',
    fieldType: 'ForeignKey',
    targetModel: 'Categoria',
    onDelete: 'CASCADE',
    isNull: false,
    isBlank: false,
  },
};

export default function DjangoFieldSqlExplorer() {
  const [dialect, setDialect] = useState<SqlDialect>('postgresql');
  const [config, setConfig] = useState<FieldConfig>({
    fieldName: 'nombre',
    fieldType: 'CharField',
    maxLength: 100,
    isNull: false,
    isBlank: false,
    isUnique: false,
    hasDbIndex: false,
    defaultValue: '',
    hasChoices: false,
    isPositive: false,
    maxDigits: 10,
    decimalPlaces: 2,
    autoNowAdd: false,
    autoNow: false,
    targetModel: 'Categoria',
    onDelete: 'CASCADE',
  });

  const update = (patch: Partial<FieldConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const applyPreset = (key: string) => {
    const p = PRESETS[key];
    if (p) {
      setConfig((prev) => ({
        ...prev,
        ...p,
      }));
    }
  };

  // Generate Python Code
  const getPythonCode = (): string => {
    const { fieldName, fieldType } = config;
    const args: string[] = [];

    if (fieldType === 'CharField') {
      args.push(`max_length=${config.maxLength}`);
      if (config.hasChoices) {
        args.push(`choices=Estado.choices`);
      }
      if (config.isUnique) args.push(`unique=True`);
      if (config.hasDbIndex && !config.isUnique) args.push(`db_index=True`);
      if (config.defaultValue) args.push(`default='${config.defaultValue}'`);
      if (config.isNull) args.push(`null=True`);
      if (config.isBlank) args.push(`blank=True`);
      return `${fieldName} = models.CharField(${args.join(', ')})`;
    }

    if (fieldType === 'TextField') {
      if (config.isBlank) args.push(`blank=True`);
      if (config.isNull) args.push(`null=True`);
      if (config.defaultValue) args.push(`default='${config.defaultValue}'`);
      return `${fieldName} = models.TextField(${args.join(', ')})`;
    }

    if (fieldType === 'IntegerField') {
      const cls = config.isPositive ? 'models.PositiveIntegerField' : 'models.IntegerField';
      if (config.defaultValue) args.push(`default=${config.defaultValue}`);
      if (config.isUnique) args.push(`unique=True`);
      if (config.isNull) args.push(`null=True`);
      if (config.isBlank) args.push(`blank=True`);
      return `${fieldName} = ${cls}(${args.join(', ')})`;
    }

    if (fieldType === 'DecimalField') {
      args.push(`max_digits=${config.maxDigits}`);
      args.push(`decimal_places=${config.decimalPlaces}`);
      if (config.defaultValue) args.push(`default=${config.defaultValue}`);
      if (config.isNull) args.push(`null=True`);
      if (config.isBlank) args.push(`blank=True`);
      return `${fieldName} = models.DecimalField(${args.join(', ')})`;
    }

    if (fieldType === 'BooleanField') {
      args.push(`default=${config.defaultValue === 'True' || config.defaultValue === 'true' ? 'True' : 'False'}`);
      return `${fieldName} = models.BooleanField(${args.join(', ')})`;
    }

    if (fieldType === 'DateTimeField') {
      if (config.autoNowAdd) args.push(`auto_now_add=True`);
      else if (config.autoNow) args.push(`auto_now=True`);
      if (config.isNull && !config.autoNowAdd && !config.autoNow) args.push(`null=True`);
      if (config.isBlank && !config.autoNowAdd && !config.autoNow) args.push(`blank=True`);
      return `${fieldName} = models.DateTimeField(${args.join(', ')})`;
    }

    if (fieldType === 'ForeignKey') {
      args.push(config.targetModel);
      args.push(`on_delete=models.${config.onDelete}`);
      args.push(`related_name='${config.fieldName}s'`);
      if (config.isNull) args.push(`null=True`);
      if (config.isBlank) args.push(`blank=True`);
      return `${fieldName} = models.ForeignKey(${args.join(', ')})`;
    }

    return '';
  };

  // Generate SQL Code
  const getSqlOutput = (): { columnSql: string; indexSql: string; fullTableSql: string } => {
    const isPg = dialect === 'postgresql';
    const tableName = 'app_articulo';
    let colName = config.fieldName;
    let colType = '';
    let constraints = '';
    let extraIndex = '';

    if (config.fieldType === 'CharField') {
      colType = `varchar(${config.maxLength})`;
      if (config.defaultValue) {
        constraints += ` DEFAULT '${config.defaultValue}'`;
      }
      if (!config.isNull) {
        constraints += ` NOT NULL`;
      }
      if (config.isUnique) {
        constraints += isPg ? ` CONSTRAINT "${tableName}_${colName}_key" UNIQUE` : ` UNIQUE`;
      } else if (config.hasDbIndex) {
        extraIndex = `CREATE INDEX "${tableName}_${colName}_idx" ON "${tableName}" ("${colName}");`;
      }
    } else if (config.fieldType === 'TextField') {
      colType = 'text';
      if (config.defaultValue) constraints += ` DEFAULT '${config.defaultValue}'`;
      if (!config.isNull) constraints += ` NOT NULL`;
    } else if (config.fieldType === 'IntegerField') {
      colType = config.isPositive ? (isPg ? 'integer CHECK ("' + colName + '" >= 0)' : 'integer unsigned') : 'integer';
      if (config.defaultValue) constraints += ` DEFAULT ${config.defaultValue}`;
      if (!config.isNull) constraints += ` NOT NULL`;
      if (config.isUnique) constraints += ` UNIQUE`;
    } else if (config.fieldType === 'DecimalField') {
      colType = `numeric(${config.maxDigits}, ${config.decimalPlaces})`;
      if (config.defaultValue) constraints += ` DEFAULT ${config.defaultValue}`;
      if (!config.isNull) constraints += ` NOT NULL`;
    } else if (config.fieldType === 'BooleanField') {
      colType = isPg ? 'boolean' : 'bool';
      const defVal = config.defaultValue === 'True' || config.defaultValue === 'true' ? (isPg ? 'true' : '1') : (isPg ? 'false' : '0');
      constraints += ` DEFAULT ${defVal} NOT NULL`;
    } else if (config.fieldType === 'DateTimeField') {
      colType = isPg ? 'timestamp with time zone' : 'datetime';
      if (!config.isNull || config.autoNowAdd || config.autoNow) constraints += ` NOT NULL`;
    } else if (config.fieldType === 'ForeignKey') {
      colName = `${config.fieldName}_id`;
      colType = isPg ? 'bigint' : 'integer';
      if (!config.isNull) constraints += ` NOT NULL`;
      const targetTable = `app_${config.targetModel.toLowerCase()}`;
      let fkAction = 'CASCADE';
      if (config.onDelete === 'PROTECT') fkAction = 'RESTRICT';
      if (config.onDelete === 'SET_NULL') fkAction = 'SET NULL';
      if (config.onDelete === 'DO_NOTHING') fkAction = 'NO ACTION';

      constraints += ` REFERENCES "${targetTable}" ("id") ON DELETE ${fkAction} DEFERRABLE INITIALLY DEFERRED`;
      extraIndex = `CREATE INDEX "${tableName}_${colName}_idx" ON "${tableName}" ("${colName}");`;
    }

    const columnSql = `"${colName}" ${colType}${constraints}`;
    const idCol = isPg ? '"id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY' : '"id" integer NOT NULL PRIMARY KEY AUTOINCREMENT';
    const fullTableSql = `CREATE TABLE "${tableName}" (\n    ${idCol},\n    ${columnSql}\n);${extraIndex ? `\n\n-- Índice creado automáticamente por Django:\n${extraIndex}` : ''}`;

    return { columnSql, indexSql: extraIndex, fullTableSql };
  };

  const { columnSql, indexSql, fullTableSql } = getSqlOutput();
  const pythonCode = getPythonCode();

  // Warnings / Notes
  const isCharFieldNullWarning = config.fieldType === 'CharField' && config.isNull;
  const isDecimalNoDigits = config.fieldType === 'DecimalField' && (!config.maxDigits || !config.decimalPlaces);

  return (
    <div className="not-prose my-8 rounded-2xl border border-emerald-900/30 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-5 border-b border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold tracking-wider border border-emerald-500/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SIMULADOR INTERACTIVO
          </div>
          <h3 className="text-xl font-black text-white m-0 tracking-tight">
            Laboratorio de Campos Django &rarr; Generador SQL
          </h3>
          <p className="text-xs text-slate-400 mt-1 m-0">
            Ajusta los parámetros del modelo en Python y observa en tiempo real la definición SQL exacta generada por las migraciones.
          </p>
        </div>

        {/* Dialect Selector */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/60 self-start md:self-auto">
          <span className="text-[11px] text-slate-400 font-bold px-2 uppercase tracking-wider">Motor SQL:</span>
          <button
            type="button"
            onClick={() => setDialect('postgresql')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              dialect === 'postgresql'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🐘 PostgreSQL
          </button>
          <button
            type="button"
            onClick={() => setDialect('sqlite')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              dialect === 'sqlite'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🪶 SQLite
          </button>
        </div>
      </div>

      {/* Presets Bar */}
      <div className="bg-slate-900/60 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-2">Casos Típicos:</span>
        {Object.entries(PRESETS).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => applyPreset(key)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-950/70 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 transition-all font-medium"
            title={item.desc}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left column: Controls */}
        <div className="lg:col-span-5 p-5 space-y-4 bg-slate-950/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
            ⚙️ Configuración del Campo
          </h4>

          {/* Field Name & Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Atributo:</label>
              <input
                type="text"
                value={config.fieldName}
                onChange={(e) => update({ fieldName: e.target.value.replace(/[^a-zA-Z0-9_]/g, '') })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-emerald-300 font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Campo:</label>
              <select
                value={config.fieldType}
                onChange={(e) => update({ fieldType: e.target.value as FieldType })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
              >
                <option value="CharField">CharField</option>
                <option value="TextField">TextField</option>
                <option value="IntegerField">IntegerField</option>
                <option value="DecimalField">DecimalField</option>
                <option value="BooleanField">BooleanField</option>
                <option value="DateTimeField">DateTimeField</option>
                <option value="ForeignKey">ForeignKey (Relación)</option>
              </select>
            </div>
          </div>

          {/* Conditional parameters based on type */}
          {config.fieldType === 'CharField' && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-300">max_length (Obligatorio en CharField):</span>
                  <span className="font-mono text-emerald-400 font-bold">{config.maxLength}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={config.maxLength}
                  onChange={(e) => update({ maxLength: Number(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 (ej: código)</span>
                  <span>100 (nombre)</span>
                  <span>255 (título)</span>
                  <span>500 (resumen)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">default:</label>
                  <input
                    type="text"
                    value={config.defaultValue}
                    onChange={(e) => update({ defaultValue: e.target.value })}
                    placeholder="ej: 'PENDIENTE'"
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={config.hasChoices}
                      onChange={(e) => update({ hasChoices: e.target.checked })}
                      className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>TextChoices (Enums)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {config.fieldType === 'DecimalField' && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">max_digits (Dígitos totales):</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={config.maxDigits}
                    onChange={(e) => update({ maxDigits: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 font-mono text-emerald-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">decimal_places (Decimales):</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={config.decimalPlaces}
                    onChange={(e) => update({ decimalPlaces: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 font-mono text-emerald-400 text-xs"
                  />
                </div>
              </div>
              <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                💡 Ejemplo de capacidad: <code>NUMERIC({config.maxDigits}, {config.decimalPlaces})</code> puede almacenar hasta{' '}
                <strong className="text-emerald-300 font-mono">
                  {config.maxDigits - config.decimalPlaces > 0
                    ? `${'9'.repeat(Math.min(config.maxDigits - config.decimalPlaces, 10))}.${'9'.repeat(config.decimalPlaces)}`
                    : '0.00'}
                </strong>
              </div>
            </div>
          )}

          {config.fieldType === 'IntegerField' && (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={config.isPositive}
                  onChange={(e) => update({ isPositive: e.target.checked })}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <span>PositiveIntegerField (Check &ge; 0 en BD)</span>
              </label>
            </div>
          )}

          {config.fieldType === 'DateTimeField' && (
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="radio"
                  name="datetime_auto"
                  checked={config.autoNowAdd}
                  onChange={() => update({ autoNowAdd: true, autoNow: false })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span><code>auto_now_add=True</code> (Fecha fija de creación al hacer INSERT)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="radio"
                  name="datetime_auto"
                  checked={config.autoNow}
                  onChange={() => update({ autoNowAdd: false, autoNow: true })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span><code>auto_now=True</code> (Actualiza el timestamp en cada SAVE / UPDATE)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="radio"
                  name="datetime_auto"
                  checked={!config.autoNowAdd && !config.autoNow}
                  onChange={() => update({ autoNowAdd: false, autoNow: false })}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>Entrada manual (editable por formulario)</span>
              </label>
            </div>
          )}

          {config.fieldType === 'ForeignKey' && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Modelo Destino (Relación a):</label>
                <input
                  type="text"
                  value={config.targetModel}
                  onChange={(e) => update({ targetModel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-emerald-300 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Comportamiento on_delete:</label>
                <select
                  value={config.onDelete}
                  onChange={(e) => update({ onDelete: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                >
                  <option value="CASCADE">models.CASCADE (Elimina en cascada los hijos)</option>
                  <option value="PROTECT">models.PROTECT (Impide borrar el padre si tiene hijos)</option>
                  <option value="SET_NULL">models.SET_NULL (Pone NULL en la FK, requiere null=True)</option>
                  <option value="DO_NOTHING">models.DO_NOTHING (No hace nada a nivel Python)</option>
                </select>
              </div>
            </div>
          )}

          {/* Modifiers (Null, Blank, Unique, db_index) */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Modificadores y Restricciones:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-200 select-none">
                <input
                  type="checkbox"
                  checked={config.null}
                  onChange={(e) => update({ isNull: e.target.checked })}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <span><code>null=True</code> (BD acepta NULL)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-200 select-none">
                <input
                  type="checkbox"
                  checked={config.isBlank}
                  onChange={(e) => update({ isBlank: e.target.checked })}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <span><code>blank=True</code> (Formulario permite "")</span>
              </label>

              {config.fieldType !== 'BooleanField' && config.fieldType !== 'DateTimeField' && (
                <label className="flex items-center gap-2 cursor-pointer text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={config.isUnique}
                    onChange={(e) => update({ isUnique: e.target.checked })}
                    className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span><code>unique=True</code> (Constraint UNIQUE)</span>
                </label>
              )}

              {config.fieldType !== 'BooleanField' && !config.isUnique && (
                <label className="flex items-center gap-2 cursor-pointer text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={config.hasDbIndex}
                    onChange={(e) => update({ hasDbIndex: e.target.checked })}
                    className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span><code>db_index=True</code> (Crea INDEX B-Tree)</span>
                </label>
              )}
            </div>
          </div>

          {/* Warnings */}
          {isCharFieldNullWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex gap-2.5 items-start">
              <span className="text-base">⚠️</span>
              <div>
                <strong className="font-bold">Regla de Oro en Django:</strong> Evita <code>null=True</code> en campos basados en texto (<code>CharField</code> / <code>TextField</code>). Si lo activas, la base de datos tendrá <strong>dos maneras distintas</strong> de representar datos vacíos: <code>NULL</code> y string vacío <code>""</code>. La convención oficial de Django es usar únicamente <code>blank=True</code>.
              </div>
            </div>
          )}

          {config.onDelete === 'SET_NULL' && !config.isNull && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex gap-2 items-start">
              <span>🛑</span>
              <div>
                <strong>Error de Integridad:</strong> Si seleccionas <code>on_delete=models.SET_NULL</code>, es obligatorio indicar también <code>null=True</code> en el campo; de lo contrario la base de datos lanzará un error al intentar asignar NULL.
              </div>
            </div>
          )}
        </div>

        {/* Right column: Code and SQL output */}
        <div className="lg:col-span-7 p-5 space-y-4 bg-slate-900/40 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Python View */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="text-blue-400">🐍</span> Código en Django (<code>models.py</code>):
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">Python ORM</span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-300 shadow-inner">
                {config.hasChoices && config.fieldType === 'CharField' && (
                  <div className="text-slate-500 mb-2 pb-2 border-b border-slate-800/80">
                    <span className="text-purple-400">class</span> <span className="text-yellow-300">Estado</span>(models.TextChoices):<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;PENDIENTE = <span className="text-emerald-400">'PENDIENTE'</span>, <span className="text-emerald-400">'Pendiente de Pago'</span><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;PAGADO = <span className="text-emerald-400">'PAGADO'</span>, <span className="text-emerald-400">'Pagado Exitosamente'</span>
                  </div>
                )}
                <div>
                  <span className="text-purple-400">class</span> <span className="text-yellow-300">Articulo</span>(models.Model):
                </div>
                <div className="pl-4 py-1 text-white font-semibold">
                  {pythonCode}
                </div>
              </div>
            </div>

            {/* Generated SQL Column View */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="text-emerald-400">⚡</span> Definición de Columna SQL (<code>sqlmigrate</code>):
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono uppercase">
                  {dialect}
                </span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-amber-300 shadow-inner">
                <code>{columnSql}</code>
                {indexSql && (
                  <div className="mt-2 pt-2 border-t border-slate-800 text-cyan-300 text-[11px]">
                    {indexSql}
                  </div>
                )}
              </div>
            </div>

            {/* Complete CREATE TABLE View */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-slate-400">
                  🏗️ Instrucción Completa <code>CREATE TABLE</code>:
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
                <pre className="m-0 font-mono">{fullTableSql}</pre>
              </div>
            </div>
          </div>

          {/* Educational summary footer */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1 mt-2">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <span>🔍</span> ¿Cómo se interpreta en la Base de Datos?
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
              <li>
                <strong>{config.isNull ? 'NULL permitido' : 'NOT NULL forzado'}:</strong> {config.isNull ? 'La base de datos admite filas donde este dato sea nulo.' : 'La base de datos rechazará cualquier intento de guardar una fila sin este valor.'}
              </li>
              <li>
                <strong>{config.isBlank ? 'blank=True en formularios' : 'blank=False obligatorio en formularios'}:</strong> {config.isBlank ? 'Django no exigirá este campo en el formulario de la interfaz web o admin.' : 'El formulario de Django requerirá obligatoriamente rellenar este campo antes de enviar.'}
              </li>
              {config.fieldType === 'ForeignKey' && (
                <li>
                  <strong>Sufijo automático:</strong> Django crea la columna física llamada <code>{config.fieldName}_id</code> en la base de datos, aunque en Python la invoques como <code>{config.fieldName}</code>.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
