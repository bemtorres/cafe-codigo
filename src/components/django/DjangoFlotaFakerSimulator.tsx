import React, { useState } from 'react';

interface PilotoData {
  id: number;
  nombre: string;
  rut: string;
  licencia: string;
  telefono: string;
  experiencia_anios: number;
  activo: boolean;
}

interface VehiculoData {
  id: number;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  kilometraje: number;
  tipo: 'AUTO' | 'CAMIONETA' | 'CAMION' | 'VAN';
  estado: 'DISPONIBLE' | 'EN_RUTA' | 'MANTENIMIENTO';
  piloto_id: number | null;
  piloto_nombre?: string;
}

const NOMBRES_MOCK = [
  'Carlos Mendoza', 'Valentina Rojas', 'Matías Silva', 'Camila Soto',
  'Javier Morales', 'Daniela Castillo', 'Ignacio Araya', 'Fernanda Sepúlveda',
  'Rodrigo Fuentes', 'Catalina Espinoza', 'Gonzalo Valenzuela', 'Bárbara Miranda'
];

const MODELOS_POR_MARCA: Record<string, { tipo: 'AUTO' | 'CAMIONETA' | 'CAMION' | 'VAN'; modelos: string[] }> = {
  Toyota: { tipo: 'CAMIONETA', modelos: ['Hilux 4x4', 'RAV4', 'Corolla'] },
  Hyundai: { tipo: 'AUTO', modelos: ['Tucson', 'Accent Prime', 'H-1 Van'] },
  Volvo: { tipo: 'CAMION', modelos: ['FH16 750', 'FM Electric', 'VM 330'] },
  Mercedes: { tipo: 'VAN', modelos: ['Sprinter 516', 'Actros 2645', 'Vito Tourer'] },
  Chevrolet: { tipo: 'CAMIONETA', modelos: ['D-Max 3.0', 'Silverado Trail', 'Onix Sedan'] },
  Scania: { tipo: 'CAMION', modelos: ['R500 Super', 'P320 XT', 'G410'] }
};

export default function DjangoFlotaFakerSimulator() {
  const [activeTab, setActiveTab] = useState<'migraciones' | 'controlador' | 'consultas'>('migraciones');
  const [activeMigrationStep, setActiveMigrationStep] = useState<number>(1);
  const [cantRegistros, setCantRegistros] = useState<number>(6);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPilotos, setGeneratedPilotos] = useState<PilotoData[]>([]);
  const [generatedVehiculos, setGeneratedVehiculos] = useState<VehiculoData[]>([]);
  const [hasExecutedFaker, setHasExecutedFaker] = useState<boolean>(false);
  const [activeQuery, setActiveQuery] = useState<'todos_con_piloto' | 'disponibles' | 'en_mantenimiento' | 'promedio_km'>('todos_con_piloto');

  // Generador de datos estilo Faker en el cliente
  const handleRunFakerController = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const pilotos: PilotoData[] = [];
      const vehiculos: VehiculoData[] = [];
      const marcas = Object.keys(MODELOS_POR_MARCA);

      // 1. Generar Pilotos con Faker
      for (let i = 1; i <= cantRegistros; i++) {
        const nombre = NOMBRES_MOCK[(i - 1) % NOMBRES_MOCK.length] + (i > NOMBRES_MOCK.length ? ` ${i}` : '');
        const rutNum = 12000000 + i * 3421;
        const licencias = ['Profesional A1', 'Profesional A2', 'Clase B', 'Especial A4'];
        pilotos.push({
          id: i,
          nombre,
          rut: `${rutNum.toLocaleString('es-CL')}-${(i % 9) + 1}`,
          licencia: licencias[i % licencias.length],
          telefono: `+56 9 ${Math.floor(60000000 + Math.random() * 39999999)}`,
          experiencia_anios: 2 + (i * 3) % 15,
          activo: true
        });
      }

      // 2. Generar Vehículos con Faker y asignación de Piloto
      const letras = 'BCDFGHJKLMNPRSTVWXYZ';
      for (let i = 1; i <= cantRegistros; i++) {
        const marca = marcas[i % marcas.length];
        const dataMarca = MODELOS_POR_MARCA[marca];
        const modelo = dataMarca.modelos[i % dataMarca.modelos.length];
        const l1 = letras[Math.floor(Math.random() * letras.length)];
        const l2 = letras[Math.floor(Math.random() * letras.length)];
        const l3 = letras[Math.floor(Math.random() * letras.length)];
        const l4 = letras[Math.floor(Math.random() * letras.length)];
        const num = Math.floor(10 + Math.random() * 89);
        const patente = `${l1}${l2}·${l3}${l4}-${num}`;

        // Asignación de piloto (algunos quedan sin asignar para simular la realidad)
        const asignaPiloto = i % 4 !== 0; // 75% tienen piloto
        const piloto = asignaPiloto ? pilotos[i - 1] : null;

        const estados: Array<'DISPONIBLE' | 'EN_RUTA' | 'MANTENIMIENTO'> = ['EN_RUTA', 'DISPONIBLE', 'DISPONIBLE', 'MANTENIMIENTO'];
        const estado = piloto ? estados[i % 3] : 'DISPONIBLE';

        vehiculos.push({
          id: i,
          patente,
          marca,
          modelo,
          anio: 2018 + (i % 7),
          kilometraje: Math.floor(12000 + (i * 24350) % 250000),
          tipo: dataMarca.tipo,
          estado,
          piloto_id: piloto ? piloto.id : null,
          piloto_nombre: piloto ? piloto.nombre : undefined
        });
      }

      setGeneratedPilotos(pilotos);
      setGeneratedVehiculos(vehiculos);
      setIsGenerating(false);
      setHasExecutedFaker(true);
    }, 400);
  };

  return (
    <div className="my-8 rounded-2xl border-2 border-slate-700 bg-[#0f172a] text-slate-100 shadow-2xl overflow-hidden font-sans">
      {/* HEADER DE LA HERRAMIENTA */}
      <div className="border-b border-slate-700/80 bg-slate-900/90 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 text-2xl">🚛</span>
          <div>
            <h3 className="text-lg font-black text-white m-0 flex items-center gap-2">
              Laboratorio Interactivo: Flota, Migraciones y Controlador Faker
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                En Vivo
              </span>
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Explora las 3 fases de migraciones en SQL y genera datos realistas con el controlador de Faker.
            </p>
          </div>
        </div>

        {/* SELECTOR DE PESTAÑAS */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800 border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('migraciones')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'migraciones'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            1. Migraciones Paso a Paso
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('controlador')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'controlador'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            2. Controlador Web con Faker
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('consultas')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'consultas'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            3. Consultas ORM Flota
          </button>
        </div>
      </div>

      {/* CONTENIDO PESTAÑA 1: MIGRACIONES PASO A PASO */}
      {activeTab === 'migraciones' && (
        <div className="p-6 space-y-6">
          {/* STEPPER DE FASES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                step: 1,
                name: 'Fase 1: Modelo Piloto',
                file: '0001_initial.py',
                desc: 'Entidad individual con RUT, Licencia y Teléfono'
              },
              {
                step: 2,
                name: 'Fase 2: Modelo Vehículo + FK',
                file: '0002_vehiculo_fk.py',
                desc: 'Relación con Piloto (on_delete=models.SET_NULL)'
              },
              {
                step: 3,
                name: 'Fase 3: Constraints & Choices',
                file: '0003_estado_constraints.py',
                desc: 'Reglas SQL: kilometraje >= 0 y estado de flota'
              }
            ].map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveMigrationStep(s.step)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  activeMigrationStep === s.step
                    ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-400'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    {s.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {s.file}
                  </span>
                </div>
                <p className="text-xs text-slate-300 m-0">{s.desc}</p>
              </button>
            ))}
          </div>

          {/* DETALLE DEL PASO SELECCIONADO */}
          {activeMigrationStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* CÓDIGO PYTHON */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>📄 flota/models.py (Fase 1)</span>
                    <span className="text-emerald-400">Python 3.12</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed m-0">
{`from django.db import models

class Piloto(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=15, unique=True)
    licencia = models.CharField(max_length=50) # ej: Clase A1, A2, B
    telefono = models.CharField(max_length=20, blank=True)
    experiencia_anios = models.PositiveIntegerField(default=1)
    activo = models.BooleanField(default=True)
    fecha_ingreso = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Piloto"
        verbose_name_plural = "Pilotos"

    def __str__(self):
        return f"{self.nombre} ({self.licencia})"`}
                  </pre>
                </div>

                {/* SQL REAL GENERADO */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>🔍 python manage.py sqlmigrate flota 0001</span>
                    <span className="text-amber-400">SQL PostgreSQL</span>
                  </div>
                  <pre className="text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed m-0">
{`-- Generado automáticamente por Django
CREATE TABLE "flota_piloto" (
    "id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "nombre" varchar(100) NOT NULL,
    "rut" varchar(15) NOT NULL UNIQUE,
    "licencia" varchar(50) NOT NULL,
    "telefono" varchar(20) NOT NULL,
    "experiencia_anios" integer NOT NULL CHECK ("experiencia_anios" >= 0),
    "activo" boolean NOT NULL,
    "fecha_ingreso" date NOT NULL
);`}
                  </pre>
                </div>
              </div>

              {/* TERMINAL INTERACTIVA */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs">
                <span className="text-slate-500"># Comandos ejecutados en la terminal:</span>
                <p className="text-emerald-400 m-1 font-bold">
                  (env) $ python manage.py makemigrations flota --name initial_piloto
                </p>
                <p className="text-slate-400 m-1">
                  Migrations for 'flota':<br />
                  &nbsp;&nbsp;flota/migrations/0001_initial_piloto.py<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;- Create model Piloto
                </p>
                <p className="text-emerald-400 m-1 font-bold">
                  (env) $ python manage.py migrate flota
                </p>
                <p className="text-slate-400 m-1">
                  Applying flota.0001_initial_piloto... <span className="text-emerald-400 font-bold">OK</span>
                </p>
              </div>
            </div>
          )}

          {activeMigrationStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* CÓDIGO PYTHON */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>📄 flota/models.py (Fase 2)</span>
                    <span className="text-emerald-400">Foreign Key</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed m-0">
{`class Vehiculo(models.Model):
    patente = models.CharField(max_length=10, unique=True)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    anio = models.PositiveIntegerField()
    kilometraje = models.PositiveIntegerField(default=0)

    # RELACIÓN CLAVE: Si despiden al piloto, el vehículo queda sin asignar
    piloto_asignado = models.ForeignKey(
        'Piloto',
        on_delete=models.SET_NULL, # 💡 ¡Evita borrar el camión si borran al piloto!
        null=True,
        blank=True,
        related_name='vehiculos'
    )

    def __str__(self):
        return f"{self.patente} - {self.marca} {self.modelo}"`}
                  </pre>
                </div>

                {/* SQL REAL GENERADO */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>🔍 python manage.py sqlmigrate flota 0002</span>
                    <span className="text-amber-400">SQL Foreign Key</span>
                  </div>
                  <pre className="text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed m-0">
{`CREATE TABLE "flota_vehiculo" (
    "id" bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    "patente" varchar(10) NOT NULL UNIQUE,
    "marca" varchar(50) NOT NULL,
    "modelo" varchar(50) NOT NULL,
    "anio" integer NOT NULL,
    "kilometraje" integer NOT NULL,
    "piloto_asignado_id" bigint NULL -- 💡 NULLABLE por SET_NULL
);

ALTER TABLE "flota_vehiculo"
    ADD CONSTRAINT "flota_vehiculo_piloto_asignado_id_fk"
    FOREIGN KEY ("piloto_asignado_id")
    REFERENCES "flota_piloto" ("id")
    ON DELETE SET NULL; -- 🛡️ Cascada segura en base de datos`}
                  </pre>
                </div>
              </div>

              {/* NOTA DE ARQUITECTURA */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200">
                <strong>💡 Decisión de Diseño: ¿Por qué models.SET_NULL?</strong>
                <p className="mt-1 mb-0 text-slate-300">
                  Si usáramos <code>models.CASCADE</code>, al borrar un piloto de la empresa se borraría automáticamente el camión de $80.000 USD de la base de datos. Con <code>SET_NULL</code> y <code>null=True</code>, el camión permanece registrado y su campo <code>piloto_asignado</code> pasa a ser <code>NULL</code> (Vehículo disponible).
                </p>
              </div>
            </div>
          )}

          {activeMigrationStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* CÓDIGO PYTHON */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>📄 flota/models.py (Fase 3: Choices & Constraints)</span>
                    <span className="text-emerald-400">CheckConstraint</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed m-0">
{`from django.db.models import Q, CheckConstraint

class Vehiculo(models.Model):
    # ... campos anteriores ...
    
    class Estado(models.TextChoices):
        DISPONIBLE = 'DISPONIBLE', 'Disponible en patio'
        EN_RUTA = 'EN_RUTA', 'En ruta de transporte'
        MANTENIMIENTO = 'MANTENIMIENTO', 'En taller mecánico'

    # Campo nuevo con default seguro para filas ya creadas
    estado = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.DISPONIBLE
    )

    class Meta:
        constraints = [
            CheckConstraint(
                check=Q(kilometraje__gte=0),
                name='vehiculo_kilometraje_no_negativo'
            ),
            CheckConstraint(
                check=Q(anio__gte=1990),
                name='vehiculo_anio_minimo_valido'
            )
        ]`}
                  </pre>
                </div>

                {/* SQL REAL GENERADO */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>🔍 python manage.py sqlmigrate flota 0003</span>
                    <span className="text-amber-400">ALTER TABLE</span>
                  </div>
                  <pre className="text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed m-0">
{`-- Modificación segura en caliente:
ALTER TABLE "flota_vehiculo"
    ADD COLUMN "estado" varchar(20) DEFAULT 'DISPONIBLE' NOT NULL;

-- Restricciones de integridad a nivel de motor SQL:
ALTER TABLE "flota_vehiculo"
    ADD CONSTRAINT "vehiculo_kilometraje_no_negativo"
    CHECK ("kilometraje" >= 0);

ALTER TABLE "flota_vehiculo"
    ADD CONSTRAINT "vehiculo_anio_minimo_valido"
    CHECK ("anio" >= 1990);`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO PESTAÑA 2: CONTROLADOR WEB CON FAKER */}
      {activeTab === 'controlador' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LADO IZQUIERDO: EXPLICACIÓN Y CÓDIGO DEL CONTROLADOR */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h4 className="text-sm font-black text-amber-400 mb-1 flex items-center gap-2">
                  <span>⚡</span> ¿Cómo funciona el Controlador en Django?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  En Django, la capa <strong>View</strong> actúa como el <em>Controller</em> de la arquitectura MVC. 
                  Este controlador responde a la petición HTTP, inicializa <code>Faker('es_ES')</code>, utiliza una transacción atómica <code>with transaction.atomic():</code> y genera vehículos y pilotos correlacionados.
                </p>

                {/* CÓDIGO DEL CONTROLADOR */}
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-1 mb-2">
                    <span>flota/views.py</span>
                    <span className="text-amber-400">@staff_member_required</span>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed m-0">
{`from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import transaction
from django.conf import settings
from django.core.exceptions import PermissionDenied
from faker import Faker
import random
from .models import Piloto, Vehiculo

def generar_datos_flota_view(request):
    """Controlador que puebla la flota usando Faker."""
    if not settings.DEBUG:
        raise PermissionDenied("Solo disponible en modo DEBUG")

    if request.method == "POST":
        cantidad = int(request.POST.get("cantidad", 10))
        fake = Faker(['es_ES'])

        with transaction.atomic():
            # 1. Crear Pilotos
            pilotos_creados = []
            for _ in range(cantidad):
                p = Piloto.objects.create(
                    nombre=fake.name(),
                    rut=f"{fake.unique.random_number(digits=8)}-{random.randint(0,9)}",
                    licencia=random.choice(['Clase A1', 'Clase A2', 'Clase B']),
                    telefono=fake.phone_number()[:20],
                    experiencia_anios=random.randint(1, 20)
                )
                pilotos_creados.append(p)

            # 2. Crear Vehículos y vincular
            marcas = ['Toyota', 'Hyundai', 'Volvo', 'Mercedes', 'Scania']
            for i in range(cantidad):
                marca = random.choice(marcas)
                Vehiculo.objects.create(
                    patente=f"{fake.unique.lexify('????').upper()}-{random.randint(10,99)}",
                    marca=marca,
                    modelo=f"Modelo {fake.word().capitalize()}",
                    anio=random.randint(2018, 2025),
                    kilometraje=random.randint(1000, 150000),
                    estado=random.choice(['DISPONIBLE', 'EN_RUTA', 'MANTENIMIENTO']),
                    piloto_asignado=random.choice(pilotos_creados) if random.random() > 0.2 else None
                )

        messages.success(request, f"Se crearon {cantidad} pilotos y vehículos exitosamente.")
        return redirect('flota:listar_vehiculos')

    return render(request, 'flota/generar_fake.html')`}
                  </pre>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: CONSOLA INTERACTIVA DE EJECUCIÓN */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-xl bg-slate-900 border-2 border-amber-400/40 shadow-lg">
                <h4 className="text-sm font-black text-white mb-2 flex items-center justify-between">
                  <span>🕹️ Consola de Prueba del Controlador</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                    POST /flota/fake-data/
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mb-4">
                  Selecciona cuántos registros quieres enviar al controlador y simula la ejecución en vivo:
                </p>

                {/* SELECTOR DE CANTIDAD */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-slate-300">Cantidad (N):</span>
                  {[4, 6, 10, 15].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setCantRegistros(qty)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        cantRegistros === qty
                          ? 'bg-amber-500 text-slate-950 font-black scale-105'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {qty} registros
                    </button>
                  ))}
                </div>

                {/* BOTÓN DISPARADOR */}
                <button
                  type="button"
                  onClick={handleRunFakerController}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-nunito font-black text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <span className="inline-block animate-spin">⚙️</span>
                      <span>Generando datos con Faker en Python...</span>
                    </>
                  ) : (
                    <>
                      <span>⚡ Ejecutar Controlador Faker (Generar Flota)</span>
                    </>
                  )}
                </button>

                {/* RESULTADOS EN VIVO */}
                {hasExecutedFaker && (
                  <div className="mt-5 space-y-3">
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span>✅</span>
                        <strong>¡Respuesta 200 OK!</strong> {generatedVehiculos.length} vehículos y {generatedPilotos.length} pilotos generados.
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">
                        transaction.atomic: COMMIT
                      </span>
                    </div>

                    {/* TABLA DE RESULTADOS */}
                    <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950">
                      <table className="w-full text-left text-xs text-slate-300 font-mono">
                        <thead className="bg-slate-900 text-slate-400 sticky top-0 border-b border-slate-800">
                          <tr>
                            <th className="p-2">Patente</th>
                            <th className="p-2">Vehículo</th>
                            <th className="p-2">Piloto Asignado</th>
                            <th className="p-2">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {generatedVehiculos.map((v) => (
                            <tr key={v.id} className="hover:bg-slate-900/50">
                              <td className="p-2 font-bold text-amber-400">{v.patente}</td>
                              <td className="p-2 text-slate-200">
                                {v.marca} {v.modelo} <span className="text-[10px] text-slate-500">({v.anio})</span>
                              </td>
                              <td className="p-2">
                                {v.piloto_nombre ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <span>👤</span> {v.piloto_nombre}
                                  </span>
                                ) : (
                                  <span className="text-slate-500 italic">Sin Asignar (NULL)</span>
                                )}
                              </td>
                              <td className="p-2">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    v.estado === 'DISPONIBLE'
                                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                      : v.estado === 'EN_RUTA'
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  }`}
                                >
                                  {v.estado}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA 3: CONSULTAS ORM SOBRE LA FLOTA */}
      {activeTab === 'consultas' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos_con_piloto', label: '1. select_related("piloto_asignado")' },
              { id: 'disponibles', label: '2. filter(estado="DISPONIBLE")' },
              { id: 'en_mantenimiento', label: '3. Vehículos sin Piloto (isnull=True)' },
              { id: 'promedio_km', label: '4. Estadísticas (Avg y Max Kilometraje)' }
            ].map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setActiveQuery(q.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeQuery === q.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* CÓDIGO ORM PYTHON */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono text-slate-400 block mb-2">🐍 Consulta en Django ORM:</span>
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed m-0">
{activeQuery === 'todos_con_piloto' && `# Traer todos los vehículos y sus pilotos en 1 solo query SQL (INNER/LEFT JOIN):
vehiculos = Vehiculo.objects.select_related('piloto_asignado').all()

for v in vehiculos:
    piloto = v.piloto_asignado.nombre if v.piloto_asignado else "Sin asignar"
    print(f"{v.patente} conducido por {piloto}")`}

{activeQuery === 'disponibles' && `# Filtrar solo unidades operativas listas en patio:
disponibles = Vehiculo.objects.filter(
    estado=Vehiculo.Estado.DISPONIBLE
).order_by('-anio')`}

{activeQuery === 'en_mantenimiento' && `# Encontrar camiones sin chofer asignado:
sin_chofer = Vehiculo.objects.filter(
    piloto_asignado__isnull=True
)`}

{activeQuery === 'promedio_km' && `from django.db.models import Avg, Max, Min

# Métricas agregadas de toda la flota generada por Faker:
stats = Vehiculo.objects.aggregate(
    km_promedio=Avg('kilometraje'),
    km_maximo=Max('kilometraje'),
    flota_antigua=Min('anio')
)`}
              </pre>
            </div>

            {/* TRADUCCIÓN A SQL */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <span className="text-xs font-mono text-slate-400 block mb-2">🐘 SQL Equivalente que ejecuta PostgreSQL:</span>
              <pre className="text-xs font-mono text-amber-200/90 overflow-x-auto leading-relaxed m-0">
{activeQuery === 'todos_con_piloto' && `SELECT "flota_vehiculo"."id",
       "flota_vehiculo"."patente",
       "flota_vehiculo"."marca",
       "flota_piloto"."nombre",
       "flota_piloto"."licencia"
FROM "flota_vehiculo"
LEFT OUTER JOIN "flota_piloto"
  ON ("flota_vehiculo"."piloto_asignado_id" = "flota_piloto"."id");`}

{activeQuery === 'disponibles' && `SELECT * FROM "flota_vehiculo"
WHERE "flota_vehiculo"."estado" = 'DISPONIBLE'
ORDER BY "flota_vehiculo"."anio" DESC;`}

{activeQuery === 'en_mantenimiento' && `SELECT * FROM "flota_vehiculo"
WHERE "flota_vehiculo"."piloto_asignado_id" IS NULL;`}

{activeQuery === 'promedio_km' && `SELECT AVG("flota_vehiculo"."kilometraje") AS "km_promedio",
       MAX("flota_vehiculo"."kilometraje") AS "km_maximo",
       MIN("flota_vehiculo"."anio") AS "flota_antigua"
FROM "flota_vehiculo";`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
