import React, { useState } from 'react';

type RouteConfig = {
  id: string;
  project: 'biblioteca' | 'tienda';
  method: 'GET' | 'POST';
  pattern: string;
  viewName: string;
  viewType: 'FBV' | 'CBV (ListView)' | 'CBV (DetailView)' | 'CBV (CreateView)';
  defaultUrl: string;
  simulatedHandler: (url: string, params: Record<string, string>) => {
    status: number;
    extractedKwargs: Record<string, any>;
    queryParams: Record<string, any>;
    contextData: Record<string, any>;
    renderedHtmlSnippet: string;
  };
};

const ROUTES: RouteConfig[] = [
  // PROYECTO 1: BIBLIOTECA
  {
    id: 'bib-catalogo',
    project: 'biblioteca',
    method: 'GET',
    pattern: 'path("catalogo/", CatalogoLibrosView.as_view(), name="catalogo")',
    viewName: 'CatalogoLibrosView',
    viewType: 'CBV (ListView)',
    defaultUrl: '/biblioteca/catalogo/?q=python&categoria=backend',
    simulatedHandler: (url, query) => {
      const q = query.q || '';
      const cat = query.categoria || 'todas';
      const items = [
        { id: 1, titulo: 'Python Fluente 2da Ed.', autor: 'Luciano Ramalho', paginas: 1012, disp: true },
        { id: 2, titulo: 'Django 5 Profesional', autor: 'Antonio Mele', paginas: 740, disp: true },
        { id: 3, titulo: 'Arquitectura Limpia', autor: 'Robert C. Martin', paginas: 350, disp: false },
      ].filter((item) => (!q || item.titulo.toLowerCase().includes(q.toLowerCase())));

      return {
        status: 200,
        extractedKwargs: {},
        queryParams: { q, categoria: cat },
        contextData: {
          object_list: items,
          total_encontrados: items.length,
          filtro_activo: q ? `Búsqueda: "${q}"` : 'Sin filtro',
          pagina_actual: 1
        },
        renderedHtmlSnippet: `<div class="catalogo-grid">\n  <!-- Renderizado por Django Template DTL -->\n  <h2>Resultados (${items.length})</h2>\n  <ul>\n` +
          items.map(i => `    <li><strong>${i.titulo}</strong> - ${i.autor} [${i.disp ? '🟢 Disponible' : '🔴 Prestado'}]</li>`).join('\n') +
          `\n  </ul>\n</div>`
      };
    }
  },
  {
    id: 'bib-detalle-id',
    project: 'biblioteca',
    method: 'GET',
    pattern: 'path("libro/<int:pk>/", views.libro_detalle_id, name="detalle_id")',
    viewName: 'libro_detalle_id(request, pk)',
    viewType: 'FBV',
    defaultUrl: '/biblioteca/libro/42/',
    simulatedHandler: (url) => {
      const match = url.match(/\/libro\/(\d+)/);
      const pk = match ? parseInt(match[1], 10) : 42;
      if (pk <= 0 || pk > 999) {
        return {
          status: 404,
          extractedKwargs: { pk },
          queryParams: {},
          contextData: { error: 'Http404("No se encontró ningún Libro con esa clave primaria")' },
          renderedHtmlSnippet: `<div class="error-404">\n  <h1>404 Not Found</h1>\n  <p>El libro con ID ${pk} no existe en la base de datos de la biblioteca.</p>\n</div>`
        };
      }
      return {
        status: 200,
        extractedKwargs: { pk: `${pk} (tipo: int)` },
        queryParams: {},
        contextData: {
          libro: {
            id: pk,
            titulo: pk === 42 ? 'El Arte de la Programación UNIX' : `Libro Técnico #${pk}`,
            isbn: '9780131429017',
            autor: 'Eric S. Raymond',
            precio_reposicion: 45.50
          }
        },
        renderedHtmlSnippet: `<article class="libro-card">\n  <h1>Detalle de Libro #${pk}</h1>\n  <p>Título: <strong>El Arte de la Programación UNIX</strong></p>\n  <p>ISBN: 9780131429017 | Estado: Disponible</p>\n</article>`
      };
    }
  },
  {
    id: 'bib-isbn-custom',
    project: 'biblioteca',
    method: 'GET',
    pattern: 'path("libro/isbn/<isbn:codigo>/", views.libro_por_isbn, name="por_isbn")',
    viewName: 'libro_por_isbn(request, codigo)',
    viewType: 'FBV',
    defaultUrl: '/biblioteca/libro/isbn/9780132350884/',
    simulatedHandler: (url) => {
      const match = url.match(/\/isbn\/([a-zA-Z0-9_-]+)/);
      const isbn = match ? match[1] : '9780132350884';
      const cleanIsbn = isbn.replace(/-/g, '');
      const isValid = /^(978|979)\d{10}$/.test(cleanIsbn);

      if (!isValid) {
        return {
          status: 404,
          extractedKwargs: { codigo: isbn },
          queryParams: {},
          contextData: { error: 'ISBNConverter.to_python(): Formato ISBN inválido. No coincide con regex ^(978|979)\\d{10}$' },
          renderedHtmlSnippet: `<div class="error-404">\n  <h1>404 Not Found</h1>\n  <p>El convertidor ISBNConverter rechazó el código "${isbn}". Debe contener 13 dígitos y comenzar con 978 o 979.</p>\n</div>`
        };
      }

      return {
        status: 200,
        extractedKwargs: { codigo: `${cleanIsbn} (validado por ISBNConverter)` },
        queryParams: {},
        contextData: {
          libro: {
            titulo: 'Clean Code: Manual de desarrollo ágil',
            autor: 'Robert C. Martin',
            isbn: cleanIsbn,
            ano: 2008
          }
        },
        renderedHtmlSnippet: `<div class="isbn-view">\n  <h2>Consulta por ISBN Oficial</h2>\n  <p>Libro: <strong>Clean Code</strong> (ISBN: ${cleanIsbn})</p>\n  <span class="badge-success">ISBN Válido Registrado</span>\n</div>`
      };
    }
  },

  // PROYECTO 2: TIENDA E-COMMERCE
  {
    id: 'tienda-catalogo',
    project: 'tienda',
    method: 'GET',
    pattern: 'path("catalogo/", CatalogoProductosView.as_view(), name="tienda_catalogo")',
    viewName: 'CatalogoProductosView',
    viewType: 'CBV (ListView)',
    defaultUrl: '/tienda/catalogo/?q=laptop&precio_max=1500&categoria=computacion',
    simulatedHandler: (url, query) => {
      const q = query.q || '';
      const pmax = parseFloat(query.precio_max) || 9999;
      const cat = query.categoria || 'todas';

      const productos = [
        { id: 101, sku: 'LAP-M3', nombre: 'MacBook Pro M3 14"', precio: 1499.00, stock: 8, cat: 'computacion' },
        { id: 102, sku: 'LAP-THINK', nombre: 'ThinkPad T14s Gen 4', precio: 1180.00, stock: 12, cat: 'computacion' },
        { id: 103, sku: 'FON-PIX9', nombre: 'Google Pixel 9 Pro', precio: 999.00, stock: 15, cat: 'smartphones' },
        { id: 104, sku: 'MON-4K27', nombre: 'Monitor Dell UltraSharp 27" 4K', precio: 580.00, stock: 4, cat: 'perifericos' },
      ].filter(p => {
        const matchesQ = !q || p.nombre.toLowerCase().includes(q.toLowerCase());
        const matchesCat = cat === 'todas' || p.cat === cat;
        const matchesPrice = p.precio <= pmax;
        return matchesQ && matchesCat && matchesPrice;
      });

      return {
        status: 200,
        extractedKwargs: {},
        queryParams: { q, precio_max: pmax, categoria: cat },
        contextData: {
          productos_count: productos.length,
          categoria_filtrada: cat,
          precio_tope: `$${pmax.toFixed(2)}`,
          productos_list: productos
        },
        renderedHtmlSnippet: `<div class="ecom-grid">\n  <div class="filtros-banner">Filtros: "${q}" | Max $${pmax}</div>\n` +
          productos.map(p => `  <div class="product-card">\n    <h3>${p.nombre}</h3>\n    <p class="precio">$${p.precio.toFixed(2)} USD</p>\n    <span class="stock">Stock: ${p.stock} unidades</span>\n  </div>`).join('\n') +
          `\n</div>`
      };
    }
  },
  {
    id: 'tienda-detalle-slug',
    project: 'tienda',
    method: 'GET',
    pattern: 'path("producto/<slug:slug>/", DetalleProductoView.as_view(), name="producto_detalle")',
    viewName: 'DetalleProductoView',
    viewType: 'CBV (DetailView)',
    defaultUrl: '/tienda/producto/thinkpad-t14s-gen-4/',
    simulatedHandler: (url) => {
      const match = url.match(/\/producto\/([a-zA-Z0-9_-]+)/);
      const slug = match ? match[1] : 'thinkpad-t14s-gen-4';

      return {
        status: 200,
        extractedKwargs: { slug: `${slug} (capturado por <slug:slug>)` },
        queryParams: {},
        contextData: {
          producto: {
            nombre: 'ThinkPad T14s Gen 4 (AMD Ryzen 7)',
            sku: 'LAP-THINK',
            precio: 1180.00,
            costo: 820.00,
            margen: '$360.00',
            stock: 12,
            categoria: 'Computación Profesional'
          },
          relacionados: [
            'Docking Station USB-C Lenovo ThinkPad ($180)',
            'Mochila Antirrobo Ejecutiva ($45)'
          ]
        },
        renderedHtmlSnippet: `<section class="product-page">\n  <h1>ThinkPad T14s Gen 4</h1>\n  <p class="sku">SKU: LAP-THINK | Slug: ${slug}</p>\n  <p class="price">$1,180.00 USD <span class="badge">En Stock (12)</span></p>\n  <button class="btn-primary">Añadir al Carrito</button>\n  <h3>Productos Relacionados:</h3>\n  <ul>\n    <li>Docking Station USB-C</li>\n    <li>Mochila Antirrobo</li>\n  </ul>\n</section>`
      };
    }
  },
  {
    id: 'tienda-tracking-uuid',
    project: 'tienda',
    method: 'GET',
    pattern: 'path("pedido/seguimiento/<uuid:tracking>/", views.rastreo_pedido, name="rastreo")',
    viewName: 'rastreo_pedido(request, tracking)',
    viewType: 'FBV',
    defaultUrl: '/tienda/pedido/seguimiento/c9b1f7d2-5a33-4f9e-a890-7d341989045b/',
    simulatedHandler: (url) => {
      const match = url.match(/\/seguimiento\/([0-9a-fA-F-]{36})/);
      const tracking = match ? match[1] : 'c9b1f7d2-5a33-4f9e-a890-7d341989045b';

      return {
        status: 200,
        extractedKwargs: { tracking: `${tracking} (tipo: UUID)` },
        queryParams: {},
        contextData: {
          pedido: {
            id: 384,
            tracking_uuid: tracking,
            estado: 'ENVIADO',
            empresa_envio: 'DHL Express',
            guia_aerea: 'DHL-94827104',
            fecha_estimada: 'En 48 horas hábiles'
          }
        },
        renderedHtmlSnippet: `<div class="tracking-card">\n  <h2>Seguimiento de Pedido en Tiempo Real</h2>\n  <p>UUID Rastreo: <code>${tracking}</code></p>\n  <p>Estado Actual: <strong class="badge-shipping">EN CAMINO (DHL)</strong></p>\n  <p>Estimado de Llegada: 48 horas</p>\n</div>`
      };
    }
  }
];

type Challenge = {
  id: number;
  project: 'biblioteca' | 'tienda';
  title: string;
  description: string;
  task: string;
  expectedPattern: string;
  hint: string;
  solutionCode: string;
  explanation: string;
};

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    project: 'biblioteca',
    title: 'Reto 1: Enrutador de Autores por Slug',
    description: 'En la biblioteca queremos una URL amigable para ver la biografía y libros de un autor usando su slug.',
    task: '¿Cómo escribirías la línea path() para que la URL /autor/<slug>/ apunte a la vista AutorDetalleView?',
    expectedPattern: 'slug:slug',
    hint: 'Usa el path converter nativo <slug:slug> o <slug:autor_slug>.',
    solutionCode: `path('autor/<slug:slug>/', AutorDetalleView.as_view(), name='autor_detalle'),`,
    explanation: 'El convertidor <slug:slug> asegura que solo se reciban letras, números, guiones y guiones bajos, pasando el parámetro "slug" como string a la vista.'
  },
  {
    id: 2,
    project: 'biblioteca',
    title: 'Reto 2: Extracción de Filtros GET en FBV',
    description: 'En la vista de búsqueda de libros necesitas obtener el parámetro GET "?ano=2024" y convertirlo de forma segura.',
    task: '¿Cómo capturas el parámetro "ano" desde request.GET con valor por defecto None?',
    expectedPattern: 'request.get.get',
    hint: 'Usa el método .get() de request.GET: request.GET.get("ano")',
    solutionCode: `ano = request.GET.get('ano')\nif ano and ano.isdigit():\n    qs = qs.filter(fecha_publicacion__year=int(ano))`,
    explanation: 'Siempre debes usar request.GET.get("param", default) para evitar que Python lance un KeyError si el parámetro no viene en la URL.'
  },
  {
    id: 3,
    project: 'tienda',
    title: 'Reto 3 (Tienda E-Commerce): Captura de UUID de Pedido',
    description: 'En la tienda, los clientes rastrean su pedido mediante un token UUID v4 público para evitar que adivinen los IDs secuenciales.',
    task: 'Escribe la línea de ruta en tienda/urls.py para capturar un token UUID en el segmento "rastreo/<uuid>/".',
    expectedPattern: 'uuid:token',
    hint: 'Usa el convertidor nativo <uuid:token> o <uuid:codigo>.',
    solutionCode: `path('rastreo/<uuid:token>/', views.rastreo_pedido_view, name='rastreo_pedido'),`,
    explanation: 'Django valida automáticamente que la cadena tenga 32 dígitos hexadecimales con guiones (formato UUID). Si no cumple el formato, devuelve 404 de inmediato sin tocar la base de datos.'
  },
  {
    id: 4,
    project: 'tienda',
    title: 'Reto 4 (Tienda E-Commerce): Inyección de Contexto en DetailView',
    description: 'En DetalleProductoView necesitas inyectar los productos recomendados de la misma categoría en la plantilla.',
    task: '¿Qué método de la CBV DetailView se sobreescribe para añadir variables extra al diccionario de contexto?',
    expectedPattern: 'get_context_data',
    hint: 'Debes sobreescribir def get_context_data(self, **kwargs): y llamar a super().get_context_data(**kwargs).',
    solutionCode: `def get_context_data(self, **kwargs):\n    context = super().get_context_data(**kwargs)\n    context['relacionados'] = Producto.objects.filter(\n        categoria=self.object.categoria\n    ).exclude(id=self.object.id)[:4]\n    return context`,
    explanation: 'get_context_data() es el método canónico en las CBV de Django para enriquecer el diccionario de datos que se entrega al archivo HTML.'
  }
];

export default function DjangoViewsPlayground() {
  const [activeTab, setActiveTab] = useState<'tester' | 'challenges'>('tester');
  const [selectedProjectId, setSelectedProjectId] = useState<'biblioteca' | 'tienda'>('biblioteca');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('bib-catalogo');

  // Interactive URL input
  const currentRoute = ROUTES.find(r => r.id === selectedRouteId) || ROUTES[0];
  const [inputUrl, setInputUrl] = useState<string>(currentRoute.defaultUrl);

  // Execution result
  const [executionResult, setExecutionResult] = useState<ReturnType<RouteConfig['simulatedHandler']> | null>(null);

  // Challenges state
  const [selectedChallengeId, setSelectedChallengeId] = useState<number>(1);
  const [userChallengeAnswer, setUserChallengeAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const activeChallenge = CHALLENGES.find(c => c.id === selectedChallengeId) || CHALLENGES[0];

  const handleRouteChange = (routeId: string) => {
    setSelectedRouteId(routeId);
    const route = ROUTES.find(r => r.id === routeId);
    if (route) {
      setInputUrl(route.defaultUrl);
      setExecutionResult(null);
    }
  };

  const handleSimulateRequest = () => {
    try {
      // Parse URL parameters
      const parsedUrl = new URL(`http://localhost:8000${inputUrl}`);
      const queryParams: Record<string, string> = {};
      parsedUrl.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      const res = currentRoute.simulatedHandler(parsedUrl.pathname, queryParams);
      setExecutionResult(res);
    } catch {
      // Fallback manual query string parsing
      const parts = inputUrl.split('?');
      const queryParams: Record<string, string> = {};
      if (parts[1]) {
        parts[1].split('&').forEach(param => {
          const [k, v] = param.split('=');
          if (k) queryParams[decodeURIComponent(k)] = decodeURIComponent(v || '');
        });
      }
      const res = currentRoute.simulatedHandler(parts[0], queryParams);
      setExecutionResult(res);
    }
  };

  const handleCheckChallenge = () => {
    const cleanAnswer = userChallengeAnswer.toLowerCase().replace(/[\s"']/g, '');
    const cleanExpected = activeChallenge.expectedPattern.toLowerCase().replace(/[\s"']/g, '');

    if (cleanAnswer.includes(cleanExpected)) {
      setChallengeFeedback({
        status: 'success',
        message: '🎉 ¡Correcto! Has implementado el patrón exacto de Django.'
      });
    } else {
      setChallengeFeedback({
        status: 'error',
        message: `❌ Tu respuesta no incluye el elemento clave esperado. Pista: ${activeChallenge.hint}`
      });
    }
  };

  return (
    <div className="my-8 rounded-2xl border-[3px] border-slate-900 bg-white text-slate-800 shadow-[8px_8px_0px_#0f172a] overflow-hidden font-sans">
      {/* Header with Project Badges and Tabs */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 border-b-[3px] border-slate-900 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌐</span>
          <div>
            <h3 className="text-xl font-black text-white m-0 tracking-wide font-mono">
              Django Views & URLs Laboratory
            </h3>
            <p className="text-xs text-emerald-100 m-0 font-medium">
              Prueba rutas, convertidores, parámetros GET y respuestas HTTP en vivo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-900/50 p-1.5 rounded-xl border border-emerald-400/40 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black font-mono transition-all ${
              activeTab === 'tester'
                ? 'bg-amber-400 text-slate-950 border border-slate-900 shadow-sm'
                : 'text-white hover:bg-white/20'
            }`}
          >
            ⚡ Simulador de Rutas
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-black font-mono transition-all ${
              activeTab === 'challenges'
                ? 'bg-amber-400 text-slate-950 border border-slate-900 shadow-sm'
                : 'text-white hover:bg-white/20'
            }`}
          >
            🎯 Retos Didácticos ({CHALLENGES.length})
          </button>
        </div>
      </div>

      {activeTab === 'tester' && (
        <div className="p-6 bg-slate-50/70">
          {/* Project Selector */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider font-mono">
              Proyecto Activo:
            </span>
            <button
              onClick={() => {
                setSelectedProjectId('biblioteca');
                handleRouteChange('bib-catalogo');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
                selectedProjectId === 'biblioteca'
                  ? 'bg-emerald-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-600 border-2 border-slate-300 hover:border-slate-700'
              }`}
            >
              📚 Proyecto 1: Biblioteca Central
            </button>
            <button
              onClick={() => {
                setSelectedProjectId('tienda');
                handleRouteChange('tienda-catalogo');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all ${
                selectedProjectId === 'tienda'
                  ? 'bg-cyan-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-white text-slate-600 border-2 border-slate-300 hover:border-slate-700'
              }`}
            >
              🛒 Proyecto 2: Tienda E-Commerce
            </button>
          </div>

          {/* Route selector buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {ROUTES.filter(r => r.project === selectedProjectId).map(route => (
              <button
                key={route.id}
                onClick={() => handleRouteChange(route.id)}
                className={`p-3 rounded-xl text-left border-2 transition-all ${
                  selectedRouteId === route.id
                    ? 'border-emerald-600 bg-emerald-50/90 text-slate-900 ring-2 ring-emerald-500/50 shadow-sm'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-emerald-600 text-white font-mono">
                    {route.method}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">
                    {route.viewType}
                  </span>
                </div>
                <div className="text-xs font-black text-slate-900 truncate font-mono">
                  {route.viewName}
                </div>
              </button>
            ))}
          </div>

          {/* Route Configuration Box */}
          <div className="bg-emerald-50/90 p-4 rounded-xl border-2 border-emerald-300 mb-5 font-mono text-xs shadow-sm">
            <div className="text-emerald-800 font-black mb-1.5 text-[11px] flex items-center gap-1.5">
              <span>📌</span> Patrón registrado en urls.py:
            </div>
            <div className="bg-white text-emerald-950 font-bold px-3 py-2.5 rounded-lg border border-emerald-200 overflow-x-auto shadow-inner">
              {currentRoute.pattern}
            </div>
          </div>

          {/* Live Request Simulator */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 mb-5 shadow-sm">
            <label className="block text-xs font-black text-slate-800 mb-2 font-mono flex items-center gap-1.5">
              <span>🌐</span> URL de Petición HTTP (HttpRequest):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center bg-slate-100 border-2 border-slate-300 focus-within:border-emerald-600 focus-within:bg-white rounded-xl px-3.5 py-2 text-slate-800 font-mono text-xs transition-colors">
                <span className="text-slate-400 font-bold mr-1 select-none">http://127.0.0.1:8000</span>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="bg-transparent text-emerald-800 font-bold flex-1 outline-none font-mono"
                  placeholder="/ruta/?param=valor"
                />
              </div>
              <button
                onClick={handleSimulateRequest}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black font-mono text-xs border-2 border-slate-900 shadow-[3px_3px_0px_#0f172a] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span>⚡</span> Ejecutar Vista
              </button>
            </div>
            <p className="text-[11px] text-slate-600 mt-2.5 m-0 font-medium">
              💡 Puedes editar los parámetros en la URL (ej: cambiar el ID, slug, o los valores de <code>?q=...</code>) para ver cómo reacciona la vista.
            </p>
          </div>

          {/* Execution Output Panel */}
          {executionResult && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border-2 border-slate-300 shadow-sm">
                <span className="text-xs font-mono font-black text-slate-700">Estado de Respuesta:</span>
                <span
                  className={`text-xs font-mono font-black px-3 py-1 rounded-lg border-2 ${
                    executionResult.status === 200
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-500'
                      : 'bg-rose-100 text-rose-950 border-rose-500'
                  }`}
                >
                  HTTP Status {executionResult.status} {executionResult.status === 200 ? 'OK' : 'NOT FOUND'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Captured Kwargs and Query Params */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm font-mono text-xs">
                  <div className="text-slate-800 font-black mb-2.5 pb-1.5 border-b border-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>🔍</span> 1. Extracción de Parámetros
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold">views.py</span>
                  </div>

                  <div className="mb-3">
                    <span className="text-slate-700 block text-[11px] font-bold mb-1">URL Path Kwargs (Convertidores):</span>
                    {Object.keys(executionResult.extractedKwargs).length === 0 ? (
                      <div className="bg-slate-100 text-slate-600 italic text-[11px] p-2.5 rounded-lg border border-slate-200">
                        Ningún parámetro capturado en ruta
                      </div>
                    ) : (
                      <pre className="text-cyan-950 bg-cyan-50/90 p-3 rounded-lg overflow-x-auto text-[11px] m-0 border border-cyan-300 font-bold shadow-inner">
                        {JSON.stringify(executionResult.extractedKwargs, null, 2)}
                      </pre>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-700 block text-[11px] font-bold mb-1">request.GET (Query Parameters):</span>
                    {Object.keys(executionResult.queryParams).length === 0 ? (
                      <div className="bg-slate-100 text-slate-600 italic text-[11px] p-2.5 rounded-lg border border-slate-200">
                        Sin parámetros GET en query string
                      </div>
                    ) : (
                      <pre className="text-amber-950 bg-amber-50/90 p-3 rounded-lg overflow-x-auto text-[11px] m-0 border border-amber-300 font-bold shadow-inner">
                        {JSON.stringify(executionResult.queryParams, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>

                {/* Context Data Sent to Template */}
                <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm font-mono text-xs">
                  <div className="text-slate-800 font-black mb-2.5 pb-1.5 border-b border-slate-200 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>📦</span> 2. Contexto hacia Plantilla
                    </span>
                    <span className="text-[10px] bg-teal-100 text-teal-800 border border-teal-300 px-2 py-0.5 rounded font-bold">context_data</span>
                  </div>
                  <pre className="text-emerald-950 bg-emerald-50/90 p-3 rounded-lg max-h-52 overflow-y-auto text-[11px] m-0 border border-emerald-300 font-bold shadow-inner">
                    {JSON.stringify(executionResult.contextData, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Rendered HTML Preview */}
              <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm font-mono text-xs">
                <div className="text-slate-800 font-black mb-2.5 pb-1.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>🖥️</span> 3. HTML Renderizado por Django Template Language (DTL)
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 border border-indigo-300 px-2 py-0.5 rounded font-bold">template.html</span>
                </div>
                <pre className="text-slate-900 bg-slate-100 p-3.5 rounded-lg text-[11px] overflow-x-auto whitespace-pre-wrap m-0 border border-slate-300 font-mono shadow-inner font-medium">
                  {executionResult.renderedHtmlSnippet}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="p-6 bg-slate-50/70">
          {/* Challenge Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
            {CHALLENGES.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChallengeId(ch.id);
                  setUserChallengeAnswer('');
                  setChallengeFeedback(null);
                  setShowSolution(false);
                }}
                className={`p-2.5 rounded-xl text-left border-2 transition-all ${
                  selectedChallengeId === ch.id
                    ? 'border-amber-500 bg-amber-50 text-slate-900 font-black ring-2 ring-amber-400 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-700 font-bold uppercase">
                  {ch.project === 'biblioteca' ? '📚 Biblioteca' : '🛒 Tienda'}
                </div>
                <div className="text-xs truncate font-mono font-black">Reto #{ch.id}</div>
              </button>
            ))}
          </div>

          {/* Active Challenge Card */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-200">
              <h4 className="text-base font-black text-slate-900 m-0 font-mono">
                {activeChallenge.title}
              </h4>
              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 uppercase font-mono">
                {activeChallenge.project}
              </span>
            </div>

            <p className="text-xs text-slate-700 mb-3 leading-relaxed">
              {activeChallenge.description}
            </p>

            <div className="bg-amber-50 p-3.5 rounded-xl border-2 border-amber-300 mb-4">
              <p className="text-xs font-black text-amber-950 m-0 font-mono">
                👉 Misión: {activeChallenge.task}
              </p>
            </div>

            {/* Answer Input */}
            <div className="mb-4">
              <label className="block text-xs font-black text-slate-700 mb-1.5 font-mono">
                Escribe tu código o expresión de Django:
              </label>
              <textarea
                rows={3}
                value={userChallengeAnswer}
                onChange={(e) => setUserChallengeAnswer(e.target.value)}
                placeholder="Escribe tu código aquí..."
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <button
                onClick={handleCheckChallenge}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs font-mono border-2 border-slate-900 shadow-[2px_2px_0px_#0f172a] transition-all active:translate-y-0.5"
              >
                ✔ Validar Solución
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs font-mono border-2 border-slate-300 transition-colors"
              >
                {showSolution ? 'Ocultar Solución' : '💡 Revelar Solución'}
              </button>
            </div>

            {/* Feedback Message */}
            {challengeFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-mono mb-3 border-2 font-bold ${
                  challengeFeedback.status === 'success'
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-500'
                    : 'bg-rose-50 text-rose-950 border-rose-500'
                }`}
              >
                {challengeFeedback.message}
              </div>
            )}

            {/* Solution and Explanation Box */}
            {showSolution && (
              <div className="bg-amber-50/80 p-4 rounded-xl border-2 border-amber-300 font-mono text-xs shadow-sm">
                <div className="text-amber-950 font-black mb-1.5 text-[11px] flex items-center gap-1.5">
                  <span>💡</span> Código Canónico:
                </div>
                <pre className="text-emerald-950 bg-white p-3 rounded-lg overflow-x-auto mb-2.5 text-[11px] border border-emerald-300 font-bold shadow-inner">
                  {activeChallenge.solutionCode}
                </pre>
                <div className="text-slate-800 text-[11px] leading-relaxed">
                  <strong className="text-slate-950">Explicación:</strong> {activeChallenge.explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
