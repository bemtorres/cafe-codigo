import React, { useState } from 'react';

type CrudItem = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  costo: number;
  stock: number;
  activo: boolean;
};

const INITIAL_BIBLIOTECA: CrudItem[] = [
  { id: 1, nombre: 'Clean Code: Manual de desarrollo ágil', categoria: 'Ingeniería', precio: 45.00, costo: 28.00, stock: 4, activo: true },
  { id: 2, nombre: 'Python Fluente 2da Edición', categoria: 'Backend', precio: 65.00, costo: 42.00, stock: 2, activo: true },
  { id: 3, nombre: 'Django 5 Profesional', categoria: 'Backend', precio: 55.00, costo: 34.00, stock: 6, activo: true },
  { id: 4, nombre: 'Patrones de Diseño (GoF)', categoria: 'Arquitectura', precio: 50.00, costo: 30.00, stock: 0, activo: false },
];

const INITIAL_TIENDA: CrudItem[] = [
  { id: 101, nombre: 'MacBook Pro M3 14" (16GB, 512GB)', categoria: 'Laptops', precio: 1499.00, costo: 1080.00, stock: 8, activo: true },
  { id: 102, nombre: 'ThinkPad T14s Gen 4 AMD Ryzen 7', categoria: 'Laptops', precio: 1180.00, costo: 820.00, stock: 12, activo: true },
  { id: 103, nombre: 'Google Pixel 9 Pro 128GB', categoria: 'Smartphones', precio: 999.00, costo: 710.00, stock: 15, activo: true },
  { id: 104, nombre: 'Monitor Dell UltraSharp 27" 4K', categoria: 'Monitores', precio: 580.00, costo: 390.00, stock: 3, activo: true },
  { id: 105, nombre: 'Teclado Mecánico Keychron Q1 Pro', categoria: 'Periféricos', precio: 195.00, costo: 125.00, stock: 0, activo: false },
];

export default function DjangoCrudSimulator() {
  const [activeProject, setActiveProject] = useState<'biblioteca' | 'tienda'>('biblioteca');
  const [activeTab, setActiveTab] = useState<'admin' | 'crud-form'>('admin');

  // Datasets
  const [bibItems, setBibItems] = useState<CrudItem[]>(INITIAL_BIBLIOTECA);
  const [tiendaItems, setTiendaItems] = useState<CrudItem[]>(INITIAL_TIENDA);

  const items = activeProject === 'biblioteca' ? bibItems : tiendaItems;
  const setItems = activeProject === 'biblioteca' ? setBibItems : setTiendaItems;

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Form (Create / Update)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formNombre, setFormNombre] = useState('');
  const [formCategoria, setFormCategoria] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formCosto, setFormCosto] = useState('');
  const [formStock, setFormStock] = useState('1');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const categories = Array.from(new Set(items.map(i => i.categoria)));

  const filteredItems = items.filter(item => {
    const matchesSearch = !searchQuery || item.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormNombre('');
    setFormCategoria(categories[0] || 'General');
    setFormPrecio('');
    setFormCosto('');
    setFormStock('1');
    setFormErrors({});
    setActiveTab('crud-form');
  };

  const handleOpenEdit = (item: CrudItem) => {
    setEditingId(item.id);
    setFormNombre(item.nombre);
    setFormCategoria(item.categoria);
    setFormPrecio(item.precio.toString());
    setFormCosto(item.costo.toString());
    setFormStock(item.stock.toString());
    setFormErrors({});
    setActiveTab('crud-form');
  };

  const handleDelete = (id: number) => {
    const toDelete = items.find(i => i.id === id);
    if (!toDelete) return;
    if (confirm(`¿Estás seguro de que deseas eliminar "${toDelete.nombre}"? En Django esto ejecutaría Model.delete()`)) {
      setItems(items.filter(i => i.id !== id));
      setActionMessage(`Registro "${toDelete.nombre}" eliminado permanentemente.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Validations (simulating Django ModelForm clean methods)
    if (!formNombre.trim()) {
      errors.nombre = 'Este campo es obligatorio (validators.DataRequired).';
    } else if (formNombre.trim().length < 3) {
      errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    }

    const numPrecio = parseFloat(formPrecio);
    const numCosto = parseFloat(formCosto);
    const numStock = parseInt(formStock, 10);

    if (isNaN(numPrecio) || numPrecio <= 0) {
      errors.precio = 'El precio debe ser un número positivo mayor que 0.00.';
    }

    if (isNaN(numCosto) || numCosto < 0) {
      errors.costo = 'El costo debe ser mayor o igual a 0.00.';
    }

    // Cross-field validation: precio >= costo (CheckConstraint & clean())
    if (!isNaN(numPrecio) && !isNaN(numCosto) && numPrecio < numCosto) {
      errors.precio = 'Validación Cruzada clean(): El precio de venta no puede ser inferior al costo de adquisición.';
    }

    if (isNaN(numStock) || numStock < 0) {
      errors.stock = 'El stock no puede ser un número negativo.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Save
    if (editingId) {
      // Update
      setItems(items.map(item => item.id === editingId ? {
        ...item,
        nombre: formNombre.trim(),
        categoria: formCategoria,
        precio: numPrecio,
        costo: numCosto,
        stock: numStock,
        activo: numStock > 0
      } : item));
      setActionMessage(`✔ Registro #${editingId} actualizado con éxito mediante form.save()`);
    } else {
      // Create
      const newId = Math.max(...items.map(i => i.id), 0) + 1;
      const newItem: CrudItem = {
        id: newId,
        nombre: formNombre.trim(),
        categoria: formCategoria,
        precio: numPrecio,
        costo: numCosto,
        stock: numStock,
        activo: numStock > 0
      };
      setItems([newItem, ...items]);
      setActionMessage(`🎉 Nuevo registro #${newId} creado con éxito mediante CreateView / form.save()`);
    }

    setFormErrors({});
    setActiveTab('admin');
  };

  const handleBulkActivate = () => {
    if (selectedIds.length === 0) return;
    setItems(items.map(item => selectedIds.includes(item.id) ? { ...item, activo: true } : item));
    setActionMessage(`Acción Masiva: ${selectedIds.length} elemento(s) marcados como activos.`);
    setSelectedIds([]);
  };

  return (
    <div className="my-8 rounded-2xl border-[3px] border-slate-900 bg-slate-900 text-slate-100 shadow-[8px_8px_0px_#0f172a] overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="bg-slate-950 px-5 py-4 border-b-2 border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <div>
            <h3 className="text-lg font-black text-white m-0 tracking-wide font-mono">
              Django Admin & CRUD Simulator
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Experimenta el panel administrativo, formularios y ciclo Create-Read-Update-Delete
            </p>
          </div>
        </div>

        {/* Project Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setActiveProject('biblioteca');
              setSelectedIds([]);
              setActionMessage(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeProject === 'biblioteca'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            📚 Proyecto Biblioteca
          </button>
          <button
            onClick={() => {
              setActiveProject('tienda');
              setSelectedIds([]);
              setActionMessage(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeProject === 'tienda'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🛒 Proyecto Tienda
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-950/70 px-5 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeTab === 'admin'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📋 Panel Listado (ListView / Admin)
          </button>
          <button
            onClick={handleOpenCreate}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeTab === 'crud-form'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ➕ Formulario CRUD (ModelForm)
          </button>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-lg font-mono transition-transform active:scale-95 flex items-center gap-1"
        >
          <span>+</span> Añadir {activeProject === 'biblioteca' ? 'Libro' : 'Producto'}
        </button>
      </div>

      {/* Notification Banner */}
      {actionMessage && (
        <div className="bg-emerald-950/70 border-b border-emerald-800 text-emerald-300 text-xs px-5 py-2 font-mono flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Content */}
      <div className="p-5">
        {activeTab === 'admin' ? (
          <div>
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="w-full sm:w-72 flex items-center bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200">
                <span className="text-slate-500 mr-2">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar por título o nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-slate-200 w-full outline-none font-mono text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-[11px] font-bold text-slate-400 font-mono">Filtro:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs font-mono outline-none"
                >
                  <option value="ALL">Todas las Categorías</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {selectedIds.length > 0 && (
                  <button
                    onClick={handleBulkActivate}
                    className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg font-mono"
                  >
                    Activar ({selectedIds.length})
                  </button>
                )}
              </div>
            </div>

            {/* Records Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-[11px]">
                    <th className="p-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds(filteredItems.map(i => i.id));
                          else setSelectedIds([]);
                        }}
                      />
                    </th>
                    <th className="p-3">ID</th>
                    <th className="p-3">{activeProject === 'biblioteca' ? 'Título del Libro' : 'Producto'}</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio Venta</th>
                    <th className="p-3">Costo</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-right">Acciones CRUD</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-slate-900/60 hover:bg-slate-900/40 transition-colors">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedIds([...selectedIds, item.id]);
                            else setSelectedIds(selectedIds.filter(id => id !== item.id));
                          }}
                        />
                      </td>
                      <td className="p-3 font-bold text-slate-500">#{item.id}</td>
                      <td className="p-3 font-bold text-slate-200">{item.nombre}</td>
                      <td className="p-3 text-cyan-400">{item.categoria}</td>
                      <td className="p-3 text-emerald-400 font-bold">${item.precio.toFixed(2)}</td>
                      <td className="p-3 text-slate-400">${item.costo.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.stock > 3 ? 'bg-slate-800 text-slate-300' : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {item.stock} u.
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.activo
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {item.activo ? '● Activo' : '○ Inactivo'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-colors"
                            title="UpdateView / Formulario de edición"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-2 py-1 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-[11px] font-bold transition-colors"
                            title="DeleteView / Eliminar registro"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredItems.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-slate-500">
                        No se encontraron registros que coincidan con la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* CRUD Form (Create / Update) */
          <div className="max-w-xl mx-auto bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h4 className="text-sm font-black text-emerald-400 m-0">
                {editingId ? `Editar Registro #${editingId} (UpdateView)` : `Nuevo Registro (CreateView / ModelForm)`}
              </h4>
              <button
                onClick={() => setActiveTab('admin')}
                className="text-slate-500 hover:text-slate-300"
              >
                Volver a la lista
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  {activeProject === 'biblioteca' ? 'Título del Libro' : 'Nombre del Producto'}:
                </label>
                <input
                  type="text"
                  value={formNombre}
                  onChange={(e) => setFormNombre(e.target.value)}
                  placeholder="Ej: Introducción a la Arquitectura..."
                  className={`w-full bg-slate-900 border rounded-lg p-2 text-slate-200 outline-none ${
                    formErrors.nombre ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-400'
                  }`}
                />
                {formErrors.nombre && (
                  <p className="text-rose-400 text-[11px] mt-1 m-0">{formErrors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Categoría:</label>
                <select
                  value={formCategoria}
                  onChange={(e) => setFormCategoria(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 outline-none focus:border-emerald-400"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Precio Venta ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formPrecio}
                    onChange={(e) => setFormPrecio(e.target.value)}
                    placeholder="49.99"
                    className={`w-full bg-slate-900 border rounded-lg p-2 text-slate-200 outline-none ${
                      formErrors.precio ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-400'
                    }`}
                  />
                  {formErrors.precio && (
                    <p className="text-rose-400 text-[11px] mt-1 m-0">{formErrors.precio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Costo ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formCosto}
                    onChange={(e) => setFormCosto(e.target.value)}
                    placeholder="30.00"
                    className={`w-full bg-slate-900 border rounded-lg p-2 text-slate-200 outline-none ${
                      formErrors.costo ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-400'
                    }`}
                  />
                  {formErrors.costo && (
                    <p className="text-rose-400 text-[11px] mt-1 m-0">{formErrors.costo}</p>
                  )}
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Stock Disponible:</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    placeholder="10"
                    className={`w-full bg-slate-900 border rounded-lg p-2 text-slate-200 outline-none ${
                      formErrors.stock ? 'border-rose-500' : 'border-slate-700 focus:border-emerald-400'
                    }`}
                  />
                  {formErrors.stock && (
                    <p className="text-rose-400 text-[11px] mt-1 m-0">{formErrors.stock}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                >
                  {editingId ? '💾 Guardar Cambios (form.save())' : '➕ Crear Registro'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
