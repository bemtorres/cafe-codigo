import React, { useState, useMemo } from 'react';

// Tipos de datos para el dominio de Flota
export interface VehiculoAdminItem {
  id: number;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: 'CAMIONETA' | 'AUTO' | 'CAMION' | 'VAN';
  kilometraje: number;
  estado: 'DISPONIBLE' | 'EN_RUTA' | 'MANTENIMIENTO';
  piloto_nombre: string;
  piloto_foto: string;
  mantenimientos: {
    id: number;
    fecha: string;
    tipo_servicio: string;
    costo: number;
    completado: boolean;
  }[];
}

const INITIAL_VEHICULOS: VehiculoAdminItem[] = [
  {
    id: 1,
    patente: 'FL-204-CL',
    marca: 'Toyota',
    modelo: 'Hilux 4x4 D-Cab',
    anio: 2023,
    tipo: 'CAMIONETA',
    kilometraje: 42500,
    estado: 'DISPONIBLE',
    piloto_nombre: 'Carlos Mendoza',
    piloto_foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    mantenimientos: [
      { id: 101, fecha: '2024-01-15', tipo_servicio: 'Cambio de Aceite 10W-40', costo: 85, completado: true },
      { id: 102, fecha: '2024-04-10', tipo_servicio: 'Frenos y Alineación', costo: 160, completado: true },
    ]
  },
  {
    id: 2,
    patente: 'VK-881-TX',
    marca: 'Volvo',
    modelo: 'FH16 750 Tracto',
    anio: 2022,
    tipo: 'CAMION',
    kilometraje: 118000,
    estado: 'EN_RUTA',
    piloto_nombre: 'Valentina Rojas',
    piloto_foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    mantenimientos: [
      { id: 103, fecha: '2024-02-20', tipo_servicio: 'Revisión Filtros Diésel', costo: 320, completado: true },
      { id: 104, fecha: '2024-05-18', tipo_servicio: 'Calibración Neumáticos', costo: 95, completado: true }
    ]
  },
  {
    id: 3,
    patente: 'MB-550-SP',
    marca: 'Mercedes-Benz',
    modelo: 'Sprinter 516 Maxi',
    anio: 2024,
    tipo: 'VAN',
    kilometraje: 18400,
    estado: 'MANTENIMIENTO',
    piloto_nombre: 'Matías Silva',
    piloto_foto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
    mantenimientos: [
      { id: 105, fecha: '2024-06-01', tipo_servicio: 'Ajuste Inyectores Common-Rail', costo: 450, completado: false },
      { id: 106, fecha: '2024-06-03', tipo_servicio: 'Escaneo Sensor ABS', costo: 110, completado: false }
    ]
  },
  {
    id: 4,
    patente: 'HY-309-AC',
    marca: 'Hyundai',
    modelo: 'Accent Prime 1.6',
    anio: 2021,
    tipo: 'AUTO',
    kilometraje: 68900,
    estado: 'DISPONIBLE',
    piloto_nombre: 'Camila Soto',
    piloto_foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
    mantenimientos: [
      { id: 107, fecha: '2023-11-12', tipo_servicio: 'Pastillas de Freno', costo: 120, completado: true }
    ]
  },
  {
    id: 5,
    patente: 'SC-910-XT',
    marca: 'Scania',
    modelo: 'R500 Super V8',
    anio: 2023,
    tipo: 'CAMION',
    kilometraje: 89300,
    estado: 'EN_RUTA',
    piloto_nombre: 'Javier Morales',
    piloto_foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    mantenimientos: [
      { id: 108, fecha: '2024-03-05', tipo_servicio: 'Cambio Fluido Transmisión', costo: 280, completado: true }
    ]
  },
  {
    id: 6,
    patente: 'CH-774-DM',
    marca: 'Chevrolet',
    modelo: 'D-Max 3.0 4x4',
    anio: 2022,
    tipo: 'CAMIONETA',
    kilometraje: 54100,
    estado: 'MANTENIMIENTO',
    piloto_nombre: 'Daniela Castillo',
    piloto_foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    mantenimientos: [
      { id: 109, fecha: '2024-06-02', tipo_servicio: 'Sustitución Amortiguadores', costo: 390, completado: false }
    ]
  }
];

export default function DjangoAdminStudio() {
  // Tema visual: Clásico (2005) vs Django Unfold (Tailwind 2026)
  const [themeMode, setThemeMode] = useState<'classic' | 'unfold'>('unfold');

  // Nivel pedagógico de configuración ModelAdmin (0 al 5)
  // 0: Admin Ciego (admin.site.register)
  // 1: + list_display con columnas legibles
  // 2: + format_html / Badges visuales de estado
  // 3: + search_fields relacional
  // 4: + list_filter facetado
  // 5: + list_editable (edición rápida en tabla)
  // 6: + Inlines (TabularInline Maestro-Detalle)
  // 7: + Acciones Masivas (@admin.action)
  const [stepLevel, setStepLevel] = useState<number>(2);

  // Estados de datos interactivos en la tabla
  const [vehiculos, setVehiculos] = useState<VehiculoAdminItem[]>(INITIAL_VEHICULOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<'TODOS' | 'DISPONIBLE' | 'EN_RUTA' | 'MANTENIMIENTO'>('TODOS');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [flashMessage, setFlashMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Modal para ver Detalle con Inlines
  const [activeInlineDetail, setActiveInlineDetail] = useState<VehiculoAdminItem | null>(null);

  // Pestaña de visualizador de código
  const [codeTab, setCodeTab] = useState<'admin_py' | 'settings_py' | 'pedagogia'>('admin_py');
  const [copiedCode, setCopiedCode] = useState(false);

  // Helpers para filtros
  const filteredVehiculos = useMemo(() => {
    return vehiculos.filter(v => {
      // Si el stepLevel < 3, no hay buscador activo
      if (stepLevel >= 3 && searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesPatente = v.patente.toLowerCase().includes(q);
        const matchesMarca = v.marca.toLowerCase().includes(q);
        const matchesModelo = v.modelo.toLowerCase().includes(q);
        const matchesPiloto = v.piloto_nombre.toLowerCase().includes(q);
        if (!matchesPatente && !matchesMarca && !matchesModelo && !matchesPiloto) return false;
      }
      // Si el stepLevel >= 4, aplica filtro lateral
      if (stepLevel >= 4 && estadoFilter !== 'TODOS') {
        if (v.estado !== estadoFilter) return false;
      }
      return true;
    });
  }, [vehiculos, searchQuery, estadoFilter, stepLevel]);

  // Manejo de Acciones Masivas
  const handleExecuteBulkAction = () => {
    if (selectedIds.length === 0) {
      setFlashMessage({ text: 'Por favor selecciona al menos un registro en la tabla.', type: 'warning' });
      return;
    }

    if (bulkAction === 'marcar_disponible') {
      setVehiculos(prev =>
        prev.map(v => (selectedIds.includes(v.id) ? { ...v, estado: 'DISPONIBLE' } : v))
      );
      setFlashMessage({
        text: `Acción ejecutada: ${selectedIds.length} vehículo(s) marcados como DISPONIBLES.`,
        type: 'success'
      });
      setSelectedIds([]);
      setBulkAction('');
    } else if (bulkAction === 'enviar_taller') {
      setVehiculos(prev =>
        prev.map(v => (selectedIds.includes(v.id) ? { ...v, estado: 'MANTENIMIENTO' } : v))
      );
      setFlashMessage({
        text: `Alerta: ${selectedIds.length} vehículo(s) enviados a MANTENIMIENTO TÉCNICO.`,
        type: 'warning'
      });
      setSelectedIds([]);
      setBulkAction('');
    } else {
      setFlashMessage({ text: 'Selecciona una acción válida en el desplegable.', type: 'info' });
    }
  };

  // Manejo de edición rápida en tabla (list_editable)
  const handleInlineKmChange = (id: number, newKm: number) => {
    setVehiculos(prev => prev.map(v => (v.id === id ? { ...v, kilometraje: newKm } : v)));
  };

  const handleInlineEstadoChange = (id: number, newEstado: 'DISPONIBLE' | 'EN_RUTA' | 'MANTENIMIENTO') => {
    setVehiculos(prev => prev.map(v => (v.id === id ? { ...v, estado: newEstado } : v)));
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Generador de código python reactivo
  const generatedAdminCode = useMemo(() => {
    if (themeMode === 'unfold') {
      if (stepLevel === 0) {
        return `# flota/admin.py (Unfold - Nivel 0: Registro plano)
from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Vehiculo

# ❌ El "Admin Ciego": Sin columnas, sin filtros, objetos crudos
admin.site.register(Vehiculo, ModelAdmin)`;
      }

      return `# flota/admin.py (Django Unfold - Nivel ${stepLevel}: ModelAdmin Avanzado)
from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, TabularInline
from unfold.decorators import action, display
from .models import Vehiculo, Mantenimiento, Piloto

${stepLevel >= 6 ? `class MantenimientoInline(TabularInline):
    """Sub-tabla editable dentro de la misma ficha del Vehículo (Maestro-Detalle)"""
    model = Mantenimiento
    extra = 0
    fields = ["fecha", "tipo_servicio", "costo", "completado"]
    readonly_fields = ["fecha"]
` : ''}
${stepLevel >= 7 ? `@action(description="🛠️ Enviar vehículos seleccionados a Mantenimiento", permissions=["change"])
def enviar_a_taller(modeladmin, request, queryset):
    actualizados = queryset.update(estado="MANTENIMIENTO")
    modeladmin.message_user(request, f"{actualizados} vehículo(s) enviados al taller técnico.")

@action(description="✅ Liberar vehículos seleccionados como Disponibles", permissions=["change"])
def liberar_disponible(modeladmin, request, queryset):
    actualizados = queryset.update(estado="DISPONIBLE")
    modeladmin.message_user(request, f"{actualizados} vehículo(s) listos para despacho.")
` : ''}
@admin.register(Vehiculo)
class VehiculoAdmin(ModelAdmin):
    # 1. Configuración de Unfold
    warn_unsaved_form = True
    list_filter_submit = True
    list_per_page = 15

    # 2. Columnas en la tabla principal
    list_display = [
        "patente",
        "marca_modelo",
        "piloto_card",
        ${stepLevel >= 2 ? '"estado_badge",\n        ' : ''}"kilometraje_fmt",
    ]
${stepLevel >= 5 ? '    # 3. Edición directa sin abrir la ficha (list_editable)\n    list_editable = ["estado", "kilometraje"]\n' : ''}
${stepLevel >= 3 ? '    # 4. Buscador relacional directo y por clave foránea\n    search_fields = ["patente", "marca", "modelo", "piloto__nombre"]\n' : ''}
${stepLevel >= 4 ? '    # 5. Filtros facetados laterales\n    list_filter = ["estado", "tipo", "anio"]\n' : ''}
${stepLevel >= 6 ? '    # 6. Maestro-Detalle con Inlines\n    inlines = [MantenimientoInline]\n' : ''}
${stepLevel >= 7 ? '    # 7. Acciones masivas de negocio\n    actions = [enviar_a_taller, liberar_disponible]\n' : ''}
    @display(description="Vehículo")
    def marca_modelo(self, obj):
        return f"{obj.marca} {obj.modelo} ({obj.anio})"

    @display(description="Piloto Asignado")
    def piloto_card(self, obj):
        if not obj.piloto:
            return "Sin Asignar"
        return format_html(
            '<div class="flex items-center gap-2">'
            '<img src="{}" class="w-6 h-6 rounded-full"/>'
            '<span>{}</span></div>',
            obj.piloto.avatar.url, obj.piloto.nombre
        )
${stepLevel >= 2 ? `
    @display(description="Estado Operativo", label=True)
    def estado_badge(self, obj):
        # Unfold renderiza automáticamente estilos modernos con labels
        colores = {
            "DISPONIBLE": "emerald",
            "EN_RUTA": "blue",
            "MANTENIMIENTO": "rose",
        }
        color = colores.get(obj.estado, "gray")
        return obj.estado, color
` : ''}`;
    } else {
      // Tema Clásico Django
      if (stepLevel === 0) {
        return `# flota/admin.py (Django Clásico - Nivel 0)
from django.contrib import admin
from .models import Vehiculo

# ❌ El registro básico que enseñan la mayoría de tutoriales:
# Muestra "Vehiculo object (1)", "Vehiculo object (2)" sin control alguno.
admin.site.register(Vehiculo)`;
      }

      return `# flota/admin.py (Django Clásico - Nivel ${stepLevel})
from django.contrib import admin
from django.utils.html import format_html
from .models import Vehiculo, Mantenimiento

${stepLevel >= 6 ? `class MantenimientoInline(admin.TabularInline):
    model = Mantenimiento
    extra = 0
` : ''}
${stepLevel >= 7 ? `@admin.action(description="Marcar seleccionados como Disponibles")
def marcar_disponible(modeladmin, request, queryset):
    updated = queryset.update(estado='DISPONIBLE')
    modeladmin.message_user(request, f"{updated} vehículos actualizados a Disponible.")
` : ''}
@admin.register(Vehiculo)
class VehiculoAdmin(admin.ModelAdmin):
    list_display = ['patente', 'marca', 'modelo', 'piloto', ${stepLevel >= 2 ? "'estado_coloreado', " : ''}'kilometraje']
${stepLevel >= 3 ? "    search_fields = ['patente', 'marca', 'modelo', 'piloto__nombre']\n" : ''}
${stepLevel >= 4 ? "    list_filter = ['estado', 'tipo']\n" : ''}
${stepLevel >= 5 ? "    list_editable = ['kilometraje']\n" : ''}
${stepLevel >= 6 ? "    inlines = [MantenimientoInline]\n" : ''}
${stepLevel >= 7 ? "    actions = [marcar_disponible]\n" : ''}
${stepLevel >= 2 ? `    def estado_coloreado(self, obj):
        colores = {'DISPONIBLE': '#10b981', 'EN_RUTA': '#3b82f6', 'MANTENIMIENTO': '#ef4444'}
        color = colores.get(obj.estado, '#6b7280')
        return format_html('<span style="color: {}; font-weight: bold;">● {}</span>', color, obj.get_estado_display())
    estado_coloreado.short_description = "Estado"` : ''}`;
    }
  }, [themeMode, stepLevel]);

  const settingsCode = `# config/settings.py
# ⚠️ REGLA DE ORO DE UNFOLD: Debe colocarse ANTES de 'django.contrib.admin'

INSTALLED_APPS = [
    # 1. El tema moderno Unfold primero
    "unfold",
    "unfold.contrib.filters",  # Filtros visuales opcionales
    "unfold.contrib.forms",    # Formset y widgets Tailwind
    "unfold.contrib.inlines",  # Inlines colapsables

    # 2. Las apps del núcleo de Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # 3. Tus aplicaciones de negocio
    "flota.apps.FlotaConfig",
]

# Personalización del Tema Unfold (Tailwind CSS)
UNFOLD = {
    "SITE_TITLE": "Flota Express Control",
    "SITE_HEADER": "Flota Express SaaS",
    "SITE_URL": "/admin/",
    "THEME": "dark", # 'light', 'dark', o 'auto' según el SO del usuario
    "DASHBOARD_CALLBACK": "flota.views.dashboard_callback", # Gráficos y KPIs
    "COLORS": {
        "primary": {
            "50": "240 253 250",
            "100": "204 251 241",
            "500": "20 184 166", # Teal moderno
            "600": "13 148 136",
            "700": "15 118 110",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
    }
}`;

  return (
    <div className="my-8 rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden text-slate-100 font-sans">
      {/* 1. BARRA SUPERIOR DE CONTROL: TEMA & NIVELES DIDÁCTICOS */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Laboratorio Interactivo
            </span>
            <span className="text-xs text-slate-400">Paso a Paso Didáctico</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white m-0 flex items-center gap-2">
            <span>⚙️ Django Admin Studio:</span>
            <span className="text-amber-400">De "Admin Ciego" a Panel SaaS 2026</span>
          </h3>
        </div>

        {/* SWITCH DE TEMA VISUAL: CLÁSICO VS UNFOLD */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-700/70">
          <button
            type="button"
            onClick={() => setThemeMode('classic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              themeMode === 'classic'
                ? 'bg-[#417690] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏛️</span>
            <span>Django Clásico (2005)</span>
          </button>
          <button
            type="button"
            onClick={() => setThemeMode('unfold')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              themeMode === 'unfold'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🚀</span>
            <span>Django Unfold (Tailwind 2026)</span>
          </button>
        </div>
      </div>

      {/* 2. SELECTOR DE LA ESCALERA PEDAGÓGICA (6 NIVELES DE PODER) */}
      <div className="bg-slate-900/50 border-b border-slate-800 p-3 sm:p-4 overflow-x-auto">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>🎯 Activa los Superpoderes de ModelAdmin en Vivo:</span>
          <span className="text-slate-500 font-normal">(Haz clic en cada paso para ver la transformación)</span>
        </div>
        <div className="flex items-center gap-2 min-w-max">
          {[
            { level: 0, label: '0. Admin Ciego', badge: 'Default', desc: 'admin.site.register(X)' },
            { level: 1, label: '1. list_display', badge: 'Columnas', desc: 'Tabla estructurada' },
            { level: 2, label: '2. format_html', badge: 'Badges', desc: 'Estados de color' },
            { level: 3, label: '3. search_fields', badge: 'Buscador', desc: 'Búsqueda instantánea' },
            { level: 4, label: '4. list_filter', badge: 'Filtros', desc: 'Facetas laterales' },
            { level: 5, label: '5. list_editable', badge: 'Excel-like', desc: 'Edición en tabla' },
            { level: 6, label: '6. Inlines', badge: 'Maestro-Detalle', desc: 'Ficha + Mantenimientos' },
            { level: 7, label: '7. Actions', badge: 'Masivas', desc: 'Acciones en lote' },
          ].map(s => {
            const isActive = stepLevel === s.level;
            const isPassed = stepLevel > s.level;
            return (
              <button
                key={s.level}
                type="button"
                onClick={() => setStepLevel(s.level)}
                className={`px-3 py-2 rounded-xl text-left border transition-all text-xs ${
                  isActive
                    ? 'border-amber-400 bg-amber-500/15 text-white ring-1 ring-amber-400 shadow-sm'
                    : isPassed
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>{s.label}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{s.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SIMULACIÓN DE LA INTERFAZ DEL ADMIN (VISUALIZACIÓN EN VIVO) */}
      <div className="p-4 sm:p-6 bg-slate-950/70">
        {/* MENSAJES FLASH DE DJANGO */}
        {flashMessage && (
          <div
            className={`mb-4 p-3 rounded-xl border flex items-center justify-between text-xs animate-in fade-in slide-in-from-top-1 ${
              flashMessage.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : flashMessage.type === 'warning'
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{flashMessage.type === 'success' ? '✅' : flashMessage.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
              <span className="font-medium">{flashMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setFlashMessage(null)}
              className="text-slate-400 hover:text-white px-2 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
        )}

        {/* CONTENEDOR CON APARIENCIA NATIVA O UNFOLD */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all shadow-xl ${
            themeMode === 'unfold'
              ? 'border-slate-800 bg-slate-900/90'
              : 'border-[#79aec8] bg-white text-slate-800'
          }`}
        >
          {/* HEADER DEL ADMIN */}
          {themeMode === 'classic' ? (
            <div className="bg-[#417690] text-white px-5 py-3 flex items-center justify-between">
              <div>
                <span className="text-base font-serif font-bold tracking-wide">
                  Administración de Django
                </span>
                <span className="ml-3 text-xs opacity-80 font-mono">sitio: Flota Express</span>
              </div>
              <div className="text-xs flex items-center gap-3">
                <span>Bienvenido, <strong>admin_flota</strong>.</span>
                <a href="#viewsite" onClick={e => e.preventDefault()} className="underline hover:text-amber-200">Ver el sitio</a>
                <a href="#logout" onClick={e => e.preventDefault()} className="underline hover:text-amber-200">Cerrar sesión</a>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border-b border-slate-800 px-5 py-3.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-teal-500/20">
                  FE
                </div>
                <div>
                  <div className="text-sm font-black tracking-tight text-white flex items-center gap-2">
                    <span>Flota Express Control</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Unfold v0.42
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">Panel Operativo Inteligente (Tailwind)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Modo Oscuro Activo</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Avatar"
                    className="w-7 h-7 rounded-full border border-teal-400/50"
                  />
                  <span className="font-semibold text-slate-200 hidden md:inline">admin_flota</span>
                </div>
              </div>
            </div>
          )}

          {/* BREADCRUMB */}
          <div
            className={`px-5 py-2 text-xs flex items-center justify-between border-b ${
              themeMode === 'classic'
                ? 'bg-[#79aec8] text-white'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>Inicio</span>
              <span>›</span>
              <span>Flota</span>
              <span>›</span>
              <strong className={themeMode === 'classic' ? 'text-white' : 'text-slate-200'}>
                Vehículos
              </strong>
            </div>
            {stepLevel >= 6 && (
              <span className="text-[11px] font-mono opacity-80">
                Ficha Maestro-Detalle disponible (clic en "Ver Ficha")
              </span>
            )}
          </div>

          {/* KPIS DE DASHBOARD (SOLO EN UNFOLD) */}
          {themeMode === 'unfold' && (
            <div className="p-5 border-b border-slate-800/80 bg-slate-900/40">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
                  <span className="text-[11px] font-medium text-slate-400 block mb-1">Total Flota</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-white">{vehiculos.length}</span>
                    <span className="text-[10px] text-teal-400 font-mono">100% inventario</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <span className="text-[11px] font-medium text-emerald-400 block mb-1">Disponibles</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-emerald-300">
                      {vehiculos.filter(v => v.estado === 'DISPONIBLE').length}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Para despacho</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <span className="text-[11px] font-medium text-blue-400 block mb-1">En Ruta</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-blue-300">
                      {vehiculos.filter(v => v.estado === 'EN_RUTA').length}
                    </span>
                    <span className="text-[10px] text-blue-400 font-mono">En tránsito</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                  <span className="text-[11px] font-medium text-rose-400 block mb-1">En Taller</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-rose-300">
                      {vehiculos.filter(v => v.estado === 'MANTENIMIENTO').length}
                    </span>
                    <span className="text-[10px] text-rose-400 font-mono">Revisión req.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÁREA DE TRABAJO: BARRA DE BÚSQUEDA + ACCIONES + TABLA + FILTROS LATERALES */}
          <div className="p-5">
            {/* 1. BARRA SUPERIOR DE BÚSQUEDA Y ACCIONES */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
              {/* BUSCADOR (SI STEP >= 3) */}
              {stepLevel >= 3 ? (
                <div className="flex-1 max-w-md relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar patente, marca, modelo o piloto..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs border outline-none transition-all ${
                      themeMode === 'unfold'
                        ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-teal-400'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#417690]'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-xs text-amber-500/90 font-mono italic">
                  ⚠️ search_fields deshabilitado (Nivel 0 a 2: el admin no tiene buscador).
                </div>
              )}

              {/* ACCIONES MASIVAS (SI STEP >= 7) */}
              {stepLevel >= 7 ? (
                <div className="flex items-center gap-2">
                  <select
                    value={bulkAction}
                    onChange={e => setBulkAction(e.target.value)}
                    className={`px-3 py-2 rounded-xl text-xs border outline-none ${
                      themeMode === 'unfold'
                        ? 'bg-slate-950 border-slate-700 text-slate-200'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="">--- Seleccionar Acción Masiva ---</option>
                    <option value="marcar_disponible">✅ Marcar como DISPONIBLE</option>
                    <option value="enviar_taller">🛠️ Enviar a MANTENIMIENTO TÉCNICO</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleExecuteBulkAction}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      themeMode === 'unfold'
                        ? 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                        : 'bg-[#417690] hover:bg-[#346077] text-white'
                    }`}
                  >
                    Ejecutar
                  </button>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400 font-mono">
                  {stepLevel < 7 && 'Activa Paso 7 para habilitar @admin.action'}
                </div>
              )}
            </div>

            {/* 2. LAYOUT CON TABLA Y FILTROS LATERALES */}
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              {/* TABLA PRINCIPAL DE REGISTROS */}
              <div className="flex-1 w-full overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs border-collapse">
                  {/* CABECERA DE LA TABLA */}
                  <thead>
                    <tr
                      className={
                        themeMode === 'classic'
                          ? 'bg-[#f8f8f8] text-slate-700 border-b border-slate-200'
                          : 'bg-slate-950 text-slate-300 border-b border-slate-800'
                      }
                    >
                      {stepLevel >= 7 && (
                        <th className="p-3 w-8 text-center">
                          <input
                            type="checkbox"
                            checked={
                              selectedIds.length === filteredVehiculos.length &&
                              filteredVehiculos.length > 0
                            }
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedIds(filteredVehiculos.map(v => v.id));
                              } else {
                                setSelectedIds([]);
                              }
                            }}
                          />
                        </th>
                      )}

                      {/* SI STEP === 0: ADMIN CIEGO */}
                      {stepLevel === 0 ? (
                        <th className="p-3 font-bold uppercase tracking-wider">
                          Vehículo (Representación Cruda __str__)
                        </th>
                      ) : (
                        <>
                          <th className="p-3 font-bold uppercase tracking-wider">Patente</th>
                          <th className="p-3 font-bold uppercase tracking-wider">Vehículo</th>
                          <th className="p-3 font-bold uppercase tracking-wider">Piloto Asignado</th>
                          {stepLevel >= 2 && (
                            <th className="p-3 font-bold uppercase tracking-wider">Estado</th>
                          )}
                          <th className="p-3 font-bold uppercase tracking-wider">Kilometraje</th>
                          {stepLevel >= 6 && (
                            <th className="p-3 font-bold uppercase tracking-wider text-right">
                              Maestro-Detalle
                            </th>
                          )}
                        </>
                      )}
                    </tr>
                  </thead>

                  {/* CUERPO DE LA TABLA */}
                  <tbody className="divide-y divide-slate-800/50">
                    {filteredVehiculos.length === 0 ? (
                      <tr>
                        <td
                          colSpan={stepLevel === 0 ? 1 : 6}
                          className="p-8 text-center text-slate-400 font-mono text-xs"
                        >
                          No se encontraron vehículos que coincidan con los filtros aplicados.
                        </td>
                      </tr>
                    ) : (
                      filteredVehiculos.map(v => {
                        const isSelected = selectedIds.includes(v.id);

                        // CASO 1: STEP 0 (EL ADMIN CIEGO)
                        if (stepLevel === 0) {
                          return (
                            <tr
                              key={v.id}
                              className={`transition-colors ${
                                themeMode === 'classic'
                                  ? 'hover:bg-slate-50 text-slate-800'
                                  : 'hover:bg-slate-900/60 text-slate-200'
                              }`}
                            >
                              <td className="p-3 font-mono">
                                <a
                                  href="#detail"
                                  onClick={e => e.preventDefault()}
                                  className={
                                    themeMode === 'classic'
                                      ? 'text-[#417690] underline font-bold'
                                      : 'text-teal-400 underline font-semibold'
                                  }
                                >
                                  Vehiculo object ({v.id})
                                </a>
                                <span className="ml-2 text-[10px] text-rose-400 font-sans italic">
                                  ← Sin list_display, el operador no sabe qué vehículo es este.
                                </span>
                              </td>
                            </tr>
                          );
                        }

                        // CASO 2: STEPS >= 1 (CON COLUMNAS FORMATEADAS)
                        return (
                          <tr
                            key={v.id}
                            className={`transition-colors ${
                              isSelected
                                ? themeMode === 'unfold'
                                  ? 'bg-teal-500/10'
                                  : 'bg-cyan-50'
                                : themeMode === 'classic'
                                ? 'hover:bg-slate-50 text-slate-800'
                                : 'hover:bg-slate-800/40 text-slate-200'
                            }`}
                          >
                            {stepLevel >= 7 && (
                              <td className="p-3 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setSelectedIds(prev => [...prev, v.id]);
                                    } else {
                                      setSelectedIds(prev => prev.filter(id => id !== v.id));
                                    }
                                  }}
                                />
                              </td>
                            )}

                            {/* PATENTE */}
                            <td className="p-3 font-mono font-bold">
                              <span
                                className={
                                  themeMode === 'unfold'
                                    ? 'text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20'
                                    : 'text-[#417690]'
                                }
                              >
                                {v.patente}
                              </span>
                            </td>

                            {/* MARCA Y MODELO */}
                            <td className="p-3">
                              <div className="font-semibold">{v.marca} {v.modelo}</div>
                              <div className="text-[10px] text-slate-400">{v.tipo} • {v.anio}</div>
                            </td>

                            {/* PILOTO ASIGNADO */}
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={v.piloto_foto}
                                  alt={v.piloto_nombre}
                                  className="w-6 h-6 rounded-full object-cover border border-slate-700"
                                />
                                <span className="font-medium">{v.piloto_nombre}</span>
                              </div>
                            </td>

                            {/* ESTADO CON FORMAT_HTML O BADGES */}
                            {stepLevel >= 2 && (
                              <td className="p-3">
                                {stepLevel >= 5 ? (
                                  // LIST_EDITABLE ACTIVO: SELECT INTERACTIVO EN TABLA
                                  <select
                                    value={v.estado}
                                    onChange={e =>
                                      handleInlineEstadoChange(
                                        v.id,
                                        e.target.value as 'DISPONIBLE' | 'EN_RUTA' | 'MANTENIMIENTO'
                                      )
                                    }
                                    className={`px-2 py-1 rounded text-xs font-bold border outline-none cursor-pointer ${
                                      v.estado === 'DISPONIBLE'
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                        : v.estado === 'EN_RUTA'
                                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    }`}
                                  >
                                    <option value="DISPONIBLE">● DISPONIBLE</option>
                                    <option value="EN_RUTA">● EN RUTA</option>
                                    <option value="MANTENIMIENTO">● MANTENIMIENTO</option>
                                  </select>
                                ) : themeMode === 'unfold' ? (
                                  // BADGE MODERNO UNFOLD
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${
                                      v.estado === 'DISPONIBLE'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                        : v.estado === 'EN_RUTA'
                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                    }`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        v.estado === 'DISPONIBLE'
                                          ? 'bg-emerald-400'
                                          : v.estado === 'EN_RUTA'
                                          ? 'bg-blue-400'
                                          : 'bg-rose-400'
                                      }`}
                                    ></span>
                                    {v.estado}
                                  </span>
                                ) : (
                                  // BADGE CLÁSICO DJANGO CON FORMAT_HTML
                                  <span
                                    style={{
                                      color:
                                        v.estado === 'DISPONIBLE'
                                          ? '#10b981'
                                          : v.estado === 'EN_RUTA'
                                          ? '#3b82f6'
                                          : '#ef4444',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    ● {v.estado}
                                  </span>
                                )}
                              </td>
                            )}

                            {/* KILOMETRAJE */}
                            <td className="p-3 font-mono">
                              {stepLevel >= 5 ? (
                                // LIST_EDITABLE ACTIVO: INPUT NUMÉRICO EN TABLA
                                <input
                                  type="number"
                                  value={v.kilometraje}
                                  onChange={e =>
                                    handleInlineKmChange(v.id, parseInt(e.target.value) || 0)
                                  }
                                  className={`w-24 px-2 py-1 rounded text-xs font-mono border outline-none ${
                                    themeMode === 'unfold'
                                      ? 'bg-slate-950 border-slate-700 text-teal-300'
                                      : 'bg-white border-slate-300 text-slate-800'
                                  }`}
                                />
                              ) : (
                                <span>{v.kilometraje.toLocaleString()} km</span>
                              )}
                            </td>

                            {/* INLINES BOTÓN DE FICHA DETALLE */}
                            {stepLevel >= 6 && (
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => setActiveInlineDetail(v)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                                    themeMode === 'unfold'
                                      ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700'
                                      : 'bg-slate-100 hover:bg-slate-200 text-[#417690] border border-slate-300'
                                  }`}
                                >
                                  Ver Ficha + Inlines ({v.mantenimientos.length})
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* 3. PANEL LATERAL DE FILTROS FACETADOS (LIST_FILTER) */}
              {stepLevel >= 4 && (
                <div
                  className={`w-full lg:w-56 p-4 rounded-xl border shrink-0 text-xs ${
                    themeMode === 'unfold'
                      ? 'border-slate-800 bg-slate-950/80 text-slate-300'
                      : 'border-slate-300 bg-[#fbfbfb] text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs uppercase tracking-wider mb-3 flex items-center justify-between pb-2 border-b border-slate-800">
                    <span>Filtros Laterales</span>
                    <span className="text-[10px] font-mono text-teal-400">list_filter</span>
                  </div>

                  {/* FILTRO POR ESTADO */}
                  <div className="mb-4">
                    <strong className="block text-[11px] text-slate-400 uppercase tracking-wider mb-1.5">
                      Por Estado Operativo:
                    </strong>
                    <div className="space-y-1">
                      {[
                        { key: 'TODOS', label: 'Todos los Estados', count: vehiculos.length },
                        { key: 'DISPONIBLE', label: 'Disponibles', count: vehiculos.filter(v => v.estado === 'DISPONIBLE').length },
                        { key: 'EN_RUTA', label: 'En Ruta', count: vehiculos.filter(v => v.estado === 'EN_RUTA').length },
                        { key: 'MANTENIMIENTO', label: 'En Mantenimiento', count: vehiculos.filter(v => v.estado === 'MANTENIMIENTO').length }
                      ].map(f => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => setEstadoFilter(f.key as any)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-all ${
                            estadoFilter === f.key
                              ? themeMode === 'unfold'
                                ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                                : 'bg-[#417690] text-white font-bold'
                              : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{f.label}</span>
                          <span className="text-[10px] font-mono opacity-80">({f.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
                    💡 En Django, <code>list_filter</code> consulta directamente índices SQL para no saturar memoria.
                  </div>
                </div>
              )}
            </div>

            {/* BARRA INFERIOR DE TOTALES */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <div>
                Mostrando <strong>{filteredVehiculos.length}</strong> de <strong>{vehiculos.length}</strong> vehículos registrados.
              </div>
              {stepLevel >= 5 && (
                <div className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>list_editable activo: guarda cambios en lote instantáneos</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MODAL / SUB-PANEL DE MAESTRO-DETALLE (INLINES) */}
        {activeInlineDetail && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-xs font-mono text-teal-400">admin.TabularInline (Maestro-Detalle)</span>
                  <h4 className="text-lg font-black text-white m-0">
                    Ficha Vehículo: {activeInlineDetail.patente} — {activeInlineDetail.marca} {activeInlineDetail.modelo}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveInlineDetail(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Piloto Responsable</span>
                  <strong className="text-white text-sm">{activeInlineDetail.piloto_nombre}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Kilometraje Registrado</span>
                  <strong className="text-teal-300 text-sm">{activeInlineDetail.kilometraje.toLocaleString()} km</strong>
                </div>
              </div>

              {/* SUBTABLA TABULAR INLINE */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 m-0">
                    Historial de Mantenimientos Técnicos (Inline Embebido)
                  </h5>
                  <span className="text-[10px] text-slate-500 font-mono">Editable en la misma vista</span>
                </div>

                <div className="rounded-xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Fecha</th>
                        <th className="p-2.5">Tipo de Servicio</th>
                        <th className="p-2.5">Costo (USD)</th>
                        <th className="p-2.5">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      {activeInlineDetail.mantenimientos.map(m => (
                        <tr key={m.id}>
                          <td className="p-2.5 font-mono text-slate-400">{m.fecha}</td>
                          <td className="p-2.5 text-white font-medium">{m.tipo_servicio}</td>
                          <td className="p-2.5 font-mono text-teal-300">${m.costo}</td>
                          <td className="p-2.5">
                            {m.completado ? (
                              <span className="text-emerald-400 font-bold">✓ Completado</span>
                            ) : (
                              <span className="text-amber-400 font-bold">⌛ En Taller</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFlashMessage({
                      text: `Ficha de ${activeInlineDetail.patente} y sus mantenimientos guardados con éxito.`,
                      type: 'success'
                    });
                    setActiveInlineDetail(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950"
                >
                  Guardar Ficha Completa (Save)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. VISUALIZADOR DE CÓDIGO PYTHON REACTIVO Y PEDAGOGÍA */}
      <div className="border-t border-slate-800 bg-slate-950 p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          {/* PESTAÑAS DE CÓDIGO */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCodeTab('admin_py')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                codeTab === 'admin_py'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              📄 flota/admin.py
            </button>
            <button
              type="button"
              onClick={() => setCodeTab('settings_py')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                codeTab === 'settings_py'
                  ? 'bg-teal-400 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚙️ config/settings.py (Unfold Setup)
            </button>
            <button
              type="button"
              onClick={() => setCodeTab('pedagogia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                codeTab === 'pedagogia'
                  ? 'bg-emerald-400 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              🧠 Explicación Pedagógica
            </button>
          </div>

          {/* BOTÓN COPIAR */}
          {codeTab !== 'pedagogia' && (
            <button
              type="button"
              onClick={() => handleCopyCode(codeTab === 'admin_py' ? generatedAdminCode : settingsCode)}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {copiedCode ? '✓ ¡Copiado!' : '📋 Copiar Código'}
            </button>
          )}
        </div>

        {/* CONTENIDO DE LA PESTAÑA */}
        {codeTab === 'admin_py' && (
          <div className="relative">
            <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 m-0">
              {generatedAdminCode}
            </pre>
          </div>
        )}

        {codeTab === 'settings_py' && (
          <div className="relative">
            <pre className="text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 m-0">
              {settingsCode}
            </pre>
          </div>
        )}

        {codeTab === 'pedagogia' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <strong className="text-amber-400 font-bold block mb-1">
                1. El Dolor del "Admin Ciego"
              </strong>
              <p className="text-slate-300 leading-relaxed m-0">
                Al usar solo <code>admin.site.register()</code>, el admin muestra instancias opacas como <code>Vehiculo object (1)</code>. No hay búsqueda, ni filtros, ni edición en lote. Es la razón por la que muchos estudiantes subestiman el admin de Django y piensan que es obsoleto.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5">
              <strong className="text-teal-400 font-bold block mb-1">
                2. Los 6 Superpoderes de ModelAdmin
              </strong>
              <p className="text-slate-300 leading-relaxed m-0">
                Con <code>list_display</code>, <code>search_fields</code> (con lookup en claves foráneas), <code>list_filter</code>, <code>list_editable</code> y <code>TabularInline</code>, transformas un panel estático en una herramienta empresarial con la que un operador puede gestionar 50,000 registros al instante.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <strong className="text-emerald-400 font-bold block mb-1">
                3. La Metamorfosis con Django Unfold
              </strong>
              <p className="text-slate-300 leading-relaxed m-0">
                <strong>`django-unfold`</strong> no requiere reescribir tus modelos. Con solo instalarlo con <code>pip</code> y colocarlo antes de <code>django.contrib.admin</code>, inyecta Tailwind CSS, Dark Mode, gráficos Chart.js y componentes SaaS de última generación.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
