import React, { useState } from 'react';

type OrmQuery = {
  id: string;
  project: 'biblioteca' | 'tienda';
  title: string;
  level: 'Nivel 1: Básico' | 'Nivel 2: Relaciones' | 'Nivel 3: Agregaciones' | 'Nivel 4: Q & F' | 'Nivel 5: Subconsultas';
  pythonQuery: string;
  generatedSql: string;
  datasetResult: Record<string, any>[];
  explanation: string;
};

const ORM_QUERIES: OrmQuery[] = [
  // PROYECTO 1: BIBLIOTECA
  {
    id: 'bib-1-filter',
    project: 'biblioteca',
    title: 'Filtro Simple de Libros Disponibles',
    level: 'Nivel 1: Básico',
    pythonQuery: `Libro.objects.filter(disponible_para_prestamo=True).values('titulo', 'precio_reposicion')`,
    generatedSql: `SELECT "libros_libro"."titulo", "libros_libro"."precio_reposicion"
FROM "libros_libro"
WHERE "libros_libro"."disponible_para_prestamo" = TRUE
ORDER BY "libros_libro"."fecha_publicacion" DESC;`,
    datasetResult: [
      { titulo: 'Clean Code', precio_reposicion: '$42.00', disp: true },
      { titulo: 'Python Fluente 2da Ed.', precio_reposicion: '$65.00', disp: true },
      { titulo: 'Django 5 Profesional', precio_reposicion: '$55.00', disp: true },
    ],
    explanation: 'Genera una cláusula WHERE directa indexada sobre el campo booleano.'
  },
  {
    id: 'bib-2-select-related',
    project: 'biblioteca',
    title: 'Anti-N+1: select_related con Autor y Categoría',
    level: 'Nivel 2: Relaciones',
    pythonQuery: `Libro.objects.select_related('autor', 'categoria').filter(precio_reposicion__gte=40.00)`,
    generatedSql: `SELECT "libros_libro"."id", "libros_libro"."titulo",
       "libros_autor"."nombre_completo", "libros_categoria"."nombre"
FROM "libros_libro"
INNER JOIN "libros_autor" ON ("libros_libro"."autor_id" = "libros_autor"."id")
INNER JOIN "libros_categoria" ON ("libros_libro"."categoria_id" = "libros_categoria"."id")
WHERE "libros_libro"."precio_reposicion" >= 40.00;`,
    datasetResult: [
      { id: 1, libro: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Ingeniería de Software' },
      { id: 2, libro: 'Python Fluente 2da Ed.', autor: 'Luciano Ramalho', categoria: 'Python Backend' },
    ],
    explanation: 'Realiza un único INNER JOIN en la base de datos, trayendo los datos de autor y categoría en 1 solo viaje a la BD.'
  },
  {
    id: 'bib-3-annotate-sum',
    project: 'biblioteca',
    title: 'Agrupación: Multas Acumuladas por Usuario',
    level: 'Nivel 3: Agregaciones',
    pythonQuery: `User.objects.annotate(
    total_multa=Sum('solicitudes_prestamo__multa_acumulada')
).filter(total_multa__gt=0).order_by('-total_multa')[:5]`,
    generatedSql: `SELECT "auth_user"."id", "auth_user"."username",
       SUM("libros_solicitudprestamo"."multa_acumulada") AS "total_multa"
FROM "auth_user"
LEFT OUTER JOIN "libros_solicitudprestamo"
  ON ("auth_user"."id" = "libros_solicitudprestamo"."usuario_id")
GROUP BY "auth_user"."id", "auth_user"."username"
HAVING SUM("libros_solicitudprestamo"."multa_acumulada") > 0
ORDER BY "total_multa" DESC
LIMIT 5;`,
    datasetResult: [
      { usuario: 'carlos_dev', total_multa: '$35.00' },
      { usuario: 'maria_coder', total_multa: '$12.50' },
    ],
    explanation: 'Genera un GROUP BY con HAVING para filtrar sumatorias agregadas sin traer los préstamos individuales a memoria.'
  },

  // PROYECTO 2: TIENDA E-COMMERCE
  {
    id: 'tienda-1-stock-bajo',
    project: 'tienda',
    title: 'Inventario Crítico: Stock <= 5',
    level: 'Nivel 1: Básico',
    pythonQuery: `Producto.objects.filter(stock__lte=5, disponible=True).values('sku', 'nombre', 'stock', 'precio')`,
    generatedSql: `SELECT "catalogo_producto"."sku", "catalogo_producto"."nombre",
       "catalogo_producto"."stock", "catalogo_producto"."precio"
FROM "catalogo_producto"
WHERE ("catalogo_producto"."stock" <= 5 AND "catalogo_producto"."disponible" = TRUE)
ORDER BY "catalogo_producto"."stock" ASC;`,
    datasetResult: [
      { sku: 'MON-4K27', nombre: 'Monitor Dell UltraSharp 27"', stock: 4, precio: '$580.00' },
      { sku: 'TEC-MEC', nombre: 'Teclado Mecánico Keychron Q1', stock: 2, precio: '$195.00' },
      { sku: 'MOU-MX3S', nombre: 'Mouse Logitech MX Master 3S', stock: 5, precio: '$99.00' },
    ],
    explanation: 'Permite generar alertas automáticas de reabastecimiento en el dashboard administrativo.'
  },
  {
    id: 'tienda-2-vip-sales',
    project: 'tienda',
    title: 'Clientes VIP con Compras > $1,000 USD',
    level: 'Nivel 3: Agregaciones',
    pythonQuery: `Cliente.objects.annotate(
    gasto_total=Sum('pedidos__total')
).filter(gasto_total__gt=1000).select_related('user').order_by('-gasto_total')`,
    generatedSql: `SELECT "pedidos_cliente"."id", "auth_user"."username",
       SUM("pedidos_pedido"."total") AS "gasto_total"
FROM "pedidos_cliente"
INNER JOIN "auth_user" ON ("pedidos_cliente"."user_id" = "auth_user"."id")
LEFT OUTER JOIN "pedidos_pedido" ON ("pedidos_cliente"."id" = "pedidos_pedido"."cliente_id")
GROUP BY "pedidos_cliente"."id", "auth_user"."username"
HAVING SUM("pedidos_pedido"."total") > 1000.00
ORDER BY "gasto_total" DESC;`,
    datasetResult: [
      { cliente: 'ana_tech', email: 'ana@enterprise.io', gasto_total: '$4,280.00', pedidos_completados: 6 },
      { cliente: 'david_it', email: 'david@startup.co', gasto_total: '$1,850.50', pedidos_completados: 3 },
    ],
    explanation: 'Cruza clientes con pedidos en un GROUP BY con HAVING para identificar la cartera de clientes de alto valor.'
  },
  {
    id: 'tienda-3-f-expression',
    project: 'tienda',
    title: 'Margen de Ganancia Dinámico con F()',
    level: 'Nivel 4: Q & F',
    pythonQuery: `Producto.objects.annotate(
    margen_unitario=F('precio') - F('costo')
).filter(margen_unitario__gte=200.00).order_by('-margen_unitario')`,
    generatedSql: `SELECT "catalogo_producto"."nombre", "catalogo_producto"."precio",
       "catalogo_producto"."costo",
       ("catalogo_producto"."precio" - "catalogo_producto"."costo") AS "margen_unitario"
FROM "catalogo_producto"
WHERE ("catalogo_producto"."precio" - "catalogo_producto"."costo") >= 200.00
ORDER BY "margen_unitario" DESC;`,
    datasetResult: [
      { producto: 'MacBook Pro M3 14"', precio: '$1,499.00', costo: '$1,080.00', margen: '$419.00' },
      { producto: 'ThinkPad T14s Gen 4', precio: '$1,180.00', costo: '$820.00', margen: '$360.00' },
    ],
    explanation: 'F() delega la resta aritmética directamente al motor de base de datos SQL sin traer todos los registros a Python.'
  },
  {
    id: 'tienda-4-top-productos',
    project: 'tienda',
    title: 'Top 3 Productos Más Vendidos Físicamente',
    level: 'Nivel 3: Agregaciones',
    pythonQuery: `Producto.objects.annotate(
    total_vendido=Sum('items_pedido__cantidad')
).filter(total_vendido__gt=0).order_by('-total_vendido')[:3]`,
    generatedSql: `SELECT "catalogo_producto"."id", "catalogo_producto"."nombre",
       SUM("pedidos_itempedido"."cantidad") AS "total_vendido"
FROM "catalogo_producto"
LEFT OUTER JOIN "pedidos_itempedido"
  ON ("catalogo_producto"."id" = "pedidos_itempedido"."producto_id")
GROUP BY "catalogo_producto"."id", "catalogo_producto"."nombre"
HAVING SUM("pedidos_itempedido"."cantidad") > 0
ORDER BY "total_vendido" DESC
LIMIT 3;`,
    datasetResult: [
      { id: 101, producto: 'MacBook Pro M3 14"', total_vendido: 48, facturacion: '$71,952.00' },
      { id: 103, producto: 'Google Pixel 9 Pro', total_vendido: 34, facturacion: '$33,966.00' },
      { id: 104, producto: 'Monitor Dell UltraSharp 27"', total_vendido: 29, facturacion: '$16,820.00' },
    ],
    explanation: 'Une la tabla de catálogo con el detalle de pedidos para saber qué ítems tienen mayor rotación de stock.'
  }
];

export default function DjangoOrmPlayground() {
  const [selectedProject, setSelectedProject] = useState<'biblioteca' | 'tienda'>('biblioteca');
  const [selectedQueryId, setSelectedQueryId] = useState<string>('bib-1-filter');

  const availableQueries = ORM_QUERIES.filter(q => q.project === selectedProject);
  const currentQuery = availableQueries.find(q => q.id === selectedQueryId) || availableQueries[0];

  return (
    <div className="my-8 rounded-2xl border-[3px] border-slate-900 bg-slate-900 text-slate-100 shadow-[8px_8px_0px_#0f172a] overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-slate-950 px-5 py-4 border-b-2 border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗄️</span>
          <div>
            <h3 className="text-lg font-black text-white m-0 tracking-wide font-mono">
              Django ORM & SQL Inspector
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Observa cómo Django traduce Python a SQL nativo optimizado
            </p>
          </div>
        </div>

        {/* Project switch */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setSelectedProject('biblioteca');
              setSelectedQueryId('bib-1-filter');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
              selectedProject === 'biblioteca'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            📚 Biblioteca
          </button>
          <button
            onClick={() => {
              setSelectedProject('tienda');
              setSelectedQueryId('tienda-1-stock-bajo');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
              selectedProject === 'tienda'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🛒 Tienda E-Commerce
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Query selection tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          {availableQueries.map(q => (
            <button
              key={q.id}
              onClick={() => setSelectedQueryId(q.id)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                selectedQueryId === q.id
                  ? 'border-emerald-400 bg-slate-800 text-white ring-1 ring-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-slate-950 text-emerald-400 font-mono">
                  {q.level.split(':')[0]}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200 truncate font-mono">
                {q.title}
              </div>
            </button>
          ))}
        </div>

        {/* Python Query Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
              <span>🐍</span> Consulta Python (Django ORM):
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              QuerySet Lazy Evaluation
            </span>
          </div>
          <pre className="text-emerald-300 font-mono text-xs m-0 bg-slate-900 p-3 rounded-lg overflow-x-auto">
            {currentQuery.pythonQuery}
          </pre>
        </div>

        {/* SQL Translation and Result Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          {/* SQL Generated */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <span>⚡</span> SQL Nativo Generado (PostgreSQL / SQLite):
              </span>
              <span className="text-[10px] text-slate-500">str(query.query)</span>
            </div>
            <pre className="text-amber-200 text-[11px] leading-relaxed m-0 bg-slate-900 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {currentQuery.generatedSql}
            </pre>
          </div>

          {/* Dataset Result */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                <span>📊</span> Resultados Retornados (Tuplas de Base de Datos):
              </span>
              <span className="text-[10px] text-slate-500">{currentQuery.datasetResult.length} filas</span>
            </div>
            <div className="bg-slate-900 rounded-lg p-2 overflow-x-auto">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    {Object.keys(currentQuery.datasetResult[0] || {}).map(k => (
                      <th key={k} className="p-1.5 uppercase font-bold">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentQuery.datasetResult.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/40">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="p-1.5 text-slate-200">
                          {typeof val === 'boolean' ? (val ? '✔ Sí' : '✖ No') : String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pedagogical explanation note */}
        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-200">
          <strong>💡 Clave Didáctica:</strong> {currentQuery.explanation}
        </div>
      </div>
    </div>
  );
}
