import React, { useState } from 'react';

interface ColumnDef {
  name: string;
  type: string;
  badge?: 'PK' | 'FK' | 'UNIQUE' | 'CHECK' | 'CHOICE';
  badgeColor?: string;
  isNullable?: boolean;
  djangoField: string;
  description: string;
}

export default function DjangoFlotaErDiagram() {
  const [selectedField, setSelectedField] = useState<ColumnDef | null>({
    name: 'piloto_asignado_id',
    type: 'bigint NULL',
    badge: 'FK',
    badgeColor: 'bg-amber-400 text-slate-950',
    isNullable: true,
    djangoField: "piloto_asignado = models.ForeignKey(Piloto, on_delete=models.SET_NULL, null=True, blank=True, related_name='vehiculos')",
    description: 'Clave Foránea hacia Piloto. Si el piloto es despedido o eliminado, la BD pone este campo en NULL gracias a ON DELETE SET NULL, preservando el vehículo de la empresa.'
  });

  const [activeView, setActiveView] = useState<'visual' | 'cardinalidad' | 'mermaid'>('visual');

  const pilotoColumns: ColumnDef[] = [
    {
      name: 'id',
      type: 'bigint',
      badge: 'PK',
      badgeColor: 'bg-emerald-400 text-slate-950 font-black',
      djangoField: 'id = models.BigAutoField(primary_key=True)',
      description: 'Clave primaria autoincremental única generada por Django.'
    },
    {
      name: 'rut',
      type: 'varchar(15)',
      badge: 'UNIQUE',
      badgeColor: 'bg-purple-400 text-slate-950 font-bold',
      djangoField: 'rut = models.CharField(max_length=15, unique=True)',
      description: 'Identificador fiscal o cédula del conductor. Índice UNIQUE en la base de datos para impedir duplicados.'
    },
    {
      name: 'nombre',
      type: 'varchar(100)',
      djangoField: 'nombre = models.CharField(max_length=100)',
      description: 'Nombre y apellido del piloto conductor.'
    },
    {
      name: 'licencia',
      type: 'varchar(50)',
      djangoField: 'licencia = models.CharField(max_length=50)',
      description: 'Categoría de licencia de conducir (ej: Clase A1, A2, B, A4).'
    },
    {
      name: 'telefono',
      type: 'varchar(20)',
      isNullable: true,
      djangoField: 'telefono = models.CharField(max_length=20, blank=True)',
      description: 'Número de teléfono de contacto (opcional).'
    },
    {
      name: 'experiencia_anios',
      type: 'integer',
      badge: 'CHECK',
      badgeColor: 'bg-blue-400 text-slate-950 font-bold',
      djangoField: 'experiencia_anios = models.PositiveIntegerField(default=1)',
      description: 'Años de experiencia profesional. Django añade CHECK (experiencia_anios >= 0).'
    },
    {
      name: 'activo',
      type: 'boolean',
      djangoField: 'activo = models.BooleanField(default=True)',
      description: 'Indica si el piloto está habilitado para conducir en la flota activa.'
    },
    {
      name: 'fecha_ingreso',
      type: 'date',
      djangoField: 'fecha_ingreso = models.DateField(auto_now_add=True)',
      description: 'Fecha de ingreso registrada automáticamente al crear el registro.'
    }
  ];

  const vehiculoColumns: ColumnDef[] = [
    {
      name: 'id',
      type: 'bigint',
      badge: 'PK',
      badgeColor: 'bg-emerald-400 text-slate-950 font-black',
      djangoField: 'id = models.BigAutoField(primary_key=True)',
      description: 'Clave primaria autoincremental única del vehículo.'
    },
    {
      name: 'patente',
      type: 'varchar(10)',
      badge: 'UNIQUE',
      badgeColor: 'bg-purple-400 text-slate-950 font-bold',
      djangoField: 'patente = models.CharField(max_length=10, unique=True)',
      description: 'Placa patente única del vehículo (ej: BBDD-42). Impide registros duplicados con índice UNIQUE.'
    },
    {
      name: 'marca',
      type: 'varchar(50)',
      djangoField: 'marca = models.CharField(max_length=50)',
      description: 'Fabricante del vehículo (Toyota, Volvo, Mercedes-Benz, Hyundai, Scania).'
    },
    {
      name: 'modelo',
      type: 'varchar(50)',
      djangoField: 'modelo = models.CharField(max_length=50)',
      description: 'Modelo de la unidad (Hilux, FH16, Sprinter, Actros).'
    },
    {
      name: 'anio',
      type: 'integer',
      badge: 'CHECK',
      badgeColor: 'bg-blue-400 text-slate-950 font-bold',
      djangoField: 'anio = models.PositiveIntegerField() + CheckConstraint(check=Q(anio__gte=1990))',
      description: 'Año de fabricación. Blindado con restricción SQL CHECK (anio >= 1990).'
    },
    {
      name: 'kilometraje',
      type: 'integer',
      badge: 'CHECK',
      badgeColor: 'bg-blue-400 text-slate-950 font-bold',
      djangoField: 'kilometraje = models.PositiveIntegerField(default=0) + CheckConstraint(check=Q(kilometraje__gte=0))',
      description: 'Kilometraje acumulado. Constraint SQL impide valores negativos.'
    },
    {
      name: 'estado',
      type: 'varchar(20)',
      badge: 'CHOICE',
      badgeColor: 'bg-teal-400 text-slate-950 font-bold',
      djangoField: 'estado = models.CharField(choices=Estado.choices, default=Estado.DISPONIBLE)',
      description: 'Estado operativo: DISPONIBLE (en patio), EN_RUTA (conduciendo) o MANTENIMIENTO (en taller).'
    },
    {
      name: 'piloto_asignado_id',
      type: 'bigint NULL',
      badge: 'FK',
      badgeColor: 'bg-amber-400 text-slate-950 font-bold ring-2 ring-amber-300',
      isNullable: true,
      djangoField: "piloto_asignado = models.ForeignKey(Piloto, on_delete=models.SET_NULL, null=True, blank=True, related_name='vehiculos')",
      description: 'Clave Foránea hacia Piloto. Si el piloto es despedido o eliminado, la BD pone este campo en NULL gracias a ON DELETE SET NULL, preservando el vehículo de la empresa.'
    }
  ];

  return (
    <div className="not-prose my-8 rounded-2xl border-2 border-slate-700 bg-[#0f172a] text-slate-100 shadow-2xl overflow-hidden font-sans">
      {/* HEADER DEL DIAGRAMA */}
      <div className="border-b border-slate-700/80 bg-slate-900/90 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 text-2xl">📐</span>
          <div>
            <h3 className="text-lg font-black text-white m-0 flex items-center gap-2">
              Diagrama de Relación Entidad-Relación (ER)
              <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Flota · 1 a N Opcional
              </span>
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Estructura relacional entre Conductores y Vehículos con preservación de activos vía <code>SET_NULL</code>.
            </p>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800 border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveView('visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'visual'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Visual Interactivo
          </button>
          <button
            type="button"
            onClick={() => setActiveView('cardinalidad')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'cardinalidad'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Reglas de Cardinalidad
          </button>
          <button
            type="button"
            onClick={() => setActiveView('mermaid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'mermaid'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Código Mermaid & SQL
          </button>
        </div>
      </div>

      {/* VISTA 1: DIAGRAMA VISUAL INTERACTIVO */}
      {activeView === 'visual' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* TABLA 1: flota_piloto */}
            <div className="lg:col-span-5 rounded-2xl border-2 border-emerald-500/50 bg-slate-950/90 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-900 p-3.5 border-b border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <div>
                    <h4 className="text-sm font-black text-white m-0 font-mono tracking-wide">flota_piloto</h4>
                    <span className="text-[10px] text-emerald-300 font-sans">Modelo: Piloto (Conductor)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  1 (Uno)
                </span>
              </div>

              <div className="divide-y divide-slate-800/80 text-xs font-mono">
                {pilotoColumns.map((col) => {
                  const isSelected = selectedField?.name === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedField(col)}
                      className={`w-full px-3.5 py-2 flex items-center justify-between text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-200'
                          : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {col.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-black tracking-wider ${col.badgeColor}`}>
                            {col.badge}
                          </span>
                        )}
                        <span className={`font-semibold ${isSelected ? 'text-amber-400 font-bold' : ''}`}>
                          {col.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">{col.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONECTOR CENTRAL DE RELACIÓN */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center p-3 text-center self-center my-auto">
              <div className="p-2.5 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-400 mb-2 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <span className="text-2xl font-black block leading-none">⟷</span>
              </div>
              <div className="font-mono text-xs font-black text-amber-400">1 a N</div>
              <div className="text-[10px] text-slate-300 mt-1 font-sans">
                Un piloto puede conducir <strong>0 o varios</strong> vehículos.
              </div>
              <div className="mt-3 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-300">
                ON DELETE SET NULL
              </div>
            </div>

            {/* TABLA 2: flota_vehiculo */}
            <div className="lg:col-span-5 rounded-2xl border-2 border-amber-500/50 bg-slate-950/90 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-slate-900 p-3.5 border-b border-amber-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚛</span>
                  <div>
                    <h4 className="text-sm font-black text-white m-0 font-mono tracking-wide">flota_vehiculo</h4>
                    <span className="text-[10px] text-amber-300 font-sans">Modelo: Vehiculo (Activo)</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  N (Muchos / Opcional)
                </span>
              </div>

              <div className="divide-y divide-slate-800/80 text-xs font-mono">
                {vehiculoColumns.map((col) => {
                  const isSelected = selectedField?.name === col.name;
                  const isFk = col.badge === 'FK';
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedField(col)}
                      className={`w-full px-3.5 py-2 flex items-center justify-between text-left transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-200'
                          : isFk
                          ? 'bg-amber-950/30 hover:bg-amber-900/40 text-amber-200'
                          : 'hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {col.badge && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-black tracking-wider ${col.badgeColor}`}>
                            {col.badge}
                          </span>
                        )}
                        <span className={`font-semibold ${isSelected ? 'text-amber-400 font-bold' : ''}`}>
                          {col.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">{col.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* INSPECTOR DEL CAMPO SELECCIONADO */}
          {selectedField && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-900/90 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    🔍 Inspector de Campo SQL y ORM:
                  </span>
                  <span className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {selectedField.name} ({selectedField.type})
                  </span>
                </div>
                {selectedField.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-black ${selectedField.badgeColor}`}>
                    {selectedField.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                {selectedField.description}
              </p>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <span className="text-slate-500 text-[10px] block mb-1"># Definición en Django ORM (models.py):</span>
                {selectedField.djangoField}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: REGLAS DE CARDINALIDAD Y DECISIONES */}
      {activeView === 'cardinalidad' && (
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xl mb-2 block">1️⃣</span>
              <h4 className="text-sm font-bold text-emerald-400 mb-1">Cardinalidad 1 a N</h4>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                Un <strong>Piloto</strong> puede tener asignado <strong>cero, uno o múltiples vehículos</strong> a lo largo de su turno o historial operativo.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xl mb-2 block">🛡️</span>
              <h4 className="text-sm font-bold text-amber-400 mb-1">Preservación vía SET_NULL</h4>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                Al usar <code>on_delete=models.SET_NULL</code> con <code>null=True</code>, si el piloto renuncia o es eliminado, el vehículo <strong>NO se borra</strong>. Su columna <code>piloto_asignado_id</code> pasa a ser <code>NULL</code> (Vehículo libre en patio).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-2xl mb-2 block">⚖️</span>
              <h4 className="text-sm font-bold text-purple-400 mb-1">Restricciones de Integridad</h4>
              <p className="text-xs text-slate-300 leading-relaxed m-0">
                Tanto <code>rut</code> como <code>patente</code> cuentan con índices <code>UNIQUE</code> para evitar registros duplicados. El kilometraje y año se blindan con <code>CheckConstraint</code> a nivel de motor SQL.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VISTA 3: MERMAID & DDL SQL */}
      {activeView === 'mermaid' && (
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* MERMAID CODE */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono text-slate-400 block mb-2">📊 Diagrama Mermaid (erDiagram):</span>
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed m-0">
{`erDiagram
    PILOTO ||--o{ VEHICULO : "conduce (SET_NULL)"

    PILOTO {
        bigint id PK
        varchar rut UK
        varchar nombre
        varchar licencia
        varchar telefono
        int experiencia_anios
        boolean activo
        date fecha_ingreso
    }

    VEHICULO {
        bigint id PK
        varchar patente UK
        varchar marca
        varchar modelo
        int anio
        int kilometraje
        varchar estado
        bigint piloto_asignado_id FK
    }`}
              </pre>
            </div>

            {/* SQL DDL */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono text-slate-400 block mb-2">🐘 Sentencias SQL DDL:</span>
              <pre className="text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed m-0">
{`CREATE TABLE "flota_piloto" (
    "id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "rut" varchar(15) NOT NULL UNIQUE,
    "nombre" varchar(100) NOT NULL,
    "licencia" varchar(50) NOT NULL,
    "activo" boolean NOT NULL DEFAULT TRUE
);

CREATE TABLE "flota_vehiculo" (
    "id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "patente" varchar(10) NOT NULL UNIQUE,
    "marca" varchar(50) NOT NULL,
    "modelo" varchar(50) NOT NULL,
    "estado" varchar(20) NOT NULL DEFAULT 'DISPONIBLE',
    "piloto_asignado_id" bigint NULL,
    CONSTRAINT "fk_vehiculo_piloto"
        FOREIGN KEY ("piloto_asignado_id")
        REFERENCES "flota_piloto" ("id")
        ON DELETE SET NULL
);`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
