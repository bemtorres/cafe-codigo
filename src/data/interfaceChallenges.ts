import type { PooChallenge, UmlClassSpec } from './pooChallenges';

export type InterfaceChallenge = PooChallenge;

// 15 contratos — cada interfaz con 2-3 implementaciones
export const interfaceChallenges: InterfaceChallenge[] = [
  {
    id: 1,
    slug: 'pagable',
    title: 'Pagos — Interfaz Pagable',
    context: 'Checkout con múltiples medios de pago. El contrato es el mismo, la implementación cambia.',
    task: 'Define la interfaz Pagable con pagar(monto) y generarComprobante(). Implementa PagoTarjeta, PagoTransferencia y PagoEfectivo con validaciones propias.',
    base: { name: '«interface» Pagable', attrs: [], methods: ['+ pagar(monto: double): boolean', '+ generarComprobante(): String'] },
    children: [
      { name: 'PagoTarjeta', attrs: ['- numero_tarjeta: String', '- cvv: String', '- fecha_expiracion: String'], methods: ['+ validar_tarjeta(): boolean'] },
      { name: 'PagoTransferencia', attrs: ['- banco: String', '- cuenta_destino: String'], methods: ['+ verificar_transferencia(): boolean'] },
      { name: 'PagoEfectivo', attrs: ['- monto_recibido: double', '- caja_id: String'], methods: ['+ calcular_vuelto(): double'] },
    ],
  },
  {
    id: 2,
    slug: 'notificable',
    title: 'Notificaciones — Interfaz Notificable',
    context: 'Sistema omnichannel: email, SMS y push comparten el envío pero validan distinto.',
    task: 'Implementa Notificable con enviar(mensaje) y validarDestino(). Cada implementación debe validar su destino antes de enviar.',
    base: { name: '«interface» Notificable', attrs: [], methods: ['+ enviar(mensaje: String): boolean', '+ validarDestino(): boolean'] },
    children: [
      { name: 'NotificacionEmail', attrs: ['- email: String', '- asunto: String'], methods: ['+ validar_email(): boolean'] },
      { name: 'NotificacionSMS', attrs: ['- telefono: String', '- operador: String'], methods: [] },
      { name: 'NotificacionPush', attrs: ['- device_token: String', '- plataforma: String'], methods: [] },
    ],
  },
  {
    id: 3,
    slug: 'volador',
    title: 'Vuelo — Interfaz Volador',
    context: 'Torre de control que opera cualquier cosa que vuele con el mismo contrato.',
    task: 'Define Volador con despegar(), aterrizar() y obtenerAltitud(). Avion, Dron y Pajaro implementan distinto.',
    base: { name: '«interface» Volador', attrs: [], methods: ['+ despegar(): void', '+ aterrizar(): void', '+ obtenerAltitud(): double'] },
    children: [
      { name: 'Avion', attrs: ['- aerolinea: String', '- capacidad_pasajeros: int'], methods: [] },
      { name: 'Dron', attrs: ['- bateria_porcentaje: int', '- alcance_metros: double'], methods: ['+ calibrar_gps(): boolean'] },
      { name: 'Pajaro', attrs: ['- especie: String', '- envergadura_alas: double'], methods: [] },
    ],
  },
  {
    id: 4,
    slug: 'reproducible',
    title: 'Media — Interfaz Reproducible',
    context: 'Player que reproduce audio, video o podcast con controles idénticos.',
    task: 'Contrato Reproducible con reproducir(), pausar() y detener(). Cada media maneja buffering distinto.',
    base: { name: '«interface» Reproducible', attrs: [], methods: ['+ reproducir(): void', '+ pausar(): void', '+ detener(): void'] },
    children: [
      { name: 'Audio', attrs: ['- duracion_segundos: int', '- bitrate: int'], methods: [] },
      { name: 'Video', attrs: ['- resolucion: String', '- fps: int'], methods: ['+ cambiar_calidad(res: String): void'] },
      { name: 'Podcast', attrs: ['- episodio: int', '- anfitrion: String'], methods: [] },
    ],
  },
  {
    id: 5,
    slug: 'autenticable',
    title: 'Auth — Interfaz Autenticable',
    context: 'Login con email, biometría y SSO comparten el mismo flujo de autenticación.',
    task: 'Define Autenticable con autenticar(credenciales) y cerrarSesion(). Implementa las 3 variantes con validación propia.',
    base: { name: '«interface» Autenticable', attrs: [], methods: ['+ autenticar(credenciales: String): boolean', '+ cerrarSesion(): void'] },
    children: [
      { name: 'LoginEmail', attrs: ['- email: String', '- password_hash: String'], methods: ['+ validar_formato_email(): boolean'] },
      { name: 'LoginBiometrico', attrs: ['- huella_id: String', '- dispositivo: String'], methods: [] },
      { name: 'LoginSSO', attrs: ['- proveedor: String', '- token_oauth: String'], methods: [] },
    ],
  },
  {
    id: 6,
    slug: 'alquilable',
    title: 'Alquiler — Interfaz Alquilable',
    context: 'Marketplace que alquila autos, deptos y bicis con cálculo de costo distinto.',
    task: 'Contrato Alquilable con calcularCosto(dias) y reservar(fecha). Cada implementación aplica tarifa propia.',
    base: { name: '«interface» Alquilable', attrs: [], methods: ['+ calcularCosto(dias: int): double', '+ reservar(fecha: String): boolean'] },
    children: [
      { name: 'AutoAlquiler', attrs: ['- patente: String', '- categoria: String'], methods: [] },
      { name: 'Departamento', attrs: ['- direccion: String', '- capacidad_personas: int'], methods: [] },
      { name: 'Bicicleta', attrs: ['- rodado: int', '- tipo: String'], methods: [] },
    ],
  },
  {
    id: 7,
    slug: 'exportable',
    title: 'Reportes — Interfaz Exportable',
    context: 'Módulo de reportes que exporta a PDF, Excel o CSV validando datos igual.',
    task: 'Define Exportable con exportar(formato) y validarDatos(). Cada formato serializa distinto.',
    base: { name: '«interface» Exportable', attrs: [], methods: ['+ exportar(formato: String): String', '+ validarDatos(): boolean'] },
    children: [
      { name: 'ReportePDF', attrs: ['- orientacion: String', '- incluye_graficos: boolean'], methods: [] },
      { name: 'ReporteExcel', attrs: ['- hoja: String', '- incluye_formulas: boolean'], methods: [] },
      { name: 'ReporteCSV', attrs: ['- delimitador: String', '- encoding: String'], methods: [] },
    ],
  },
  {
    id: 8,
    slug: 'rastreable',
    title: 'Tracking — Interfaz Rastreable',
    context: 'Mapa en tiempo real de paquetes, vehículos y personas con el mismo contrato de ubicación.',
    task: 'Contrato Rastreable con obtenerUbicacion() y actualizarUbicacion(lat,lng). Simula movimiento de cada tipo.',
    base: { name: '«interface» Rastreable', attrs: [], methods: ['+ obtenerUbicacion(): String', '+ actualizarUbicacion(lat: double, lng: double): void'] },
    children: [
      { name: 'Paquete', attrs: ['- codigo_seguimiento: String', '- estado: String'], methods: [] },
      { name: 'VehiculoFlota', attrs: ['- patente: String', '- chofer: String'], methods: [] },
      { name: 'PersonaRastreable', attrs: ['- rut: String', '- nombre: String'], methods: [] },
    ],
  },
  {
    id: 9,
    slug: 'descontable',
    title: 'E-commerce — Interfaz Descontable',
    context: 'Carrito que aplica descuentos a productos, servicios y suscripciones con reglas distintas.',
    task: 'Define Descontable con aplicarDescuento(porcentaje) y obtenerPrecioFinal(). Cada tipo calcula distinto.',
    base: { name: '«interface» Descontable', attrs: [], methods: ['+ aplicarDescuento(porcentaje: double): void', '+ obtenerPrecioFinal(): double'] },
    children: [
      { name: 'Producto', attrs: ['- sku: String', '- stock: int'], methods: [] },
      { name: 'Servicio', attrs: ['- horas_estimadas: double', '- tarifa_hora: double'], methods: [] },
      { name: 'SuscripcionDescontable', attrs: ['- plan: String', '- meses_restantes: int'], methods: [] },
    ],
  },
  {
    id: 10,
    slug: 'validador',
    title: 'Validación — Interfaz Validador',
    context: 'Formularios que validan email, RUT y teléfono con el mismo contrato pero regex distintas.',
    task: 'Contrato Validador con validar(dato) y obtenerMensajeError(). Implementa ValidadorEmail, ValidadorRut y ValidadorTelefono.',
    base: { name: '«interface» Validador', attrs: [], methods: ['+ validar(dato: String): boolean', '+ obtenerMensajeError(): String'] },
    children: [
      { name: 'ValidadorEmail', attrs: ['- regex_email: String'], methods: [] },
      { name: 'ValidadorRut', attrs: ['- digito_verificador: String'], methods: ['+ calcular_dv(): String'] },
      { name: 'ValidadorTelefono', attrs: ['- codigo_pais: String', '- largo_minimo: int'], methods: [] },
    ],
  },
  {
    id: 11,
    slug: 'conectable',
    title: 'IoT — Interfaz Conectable',
    context: 'Hub IoT que conecta sensores WiFi, Bluetooth y APIs REST con el mismo ciclo de vida.',
    task: 'Define Conectable con conectar(), desconectar() y enviarDatos(payload). Simula conexión de cada dispositivo.',
    base: { name: '«interface» Conectable', attrs: [], methods: ['+ conectar(): boolean', '+ desconectar(): void', '+ enviarDatos(payload: String): boolean'] },
    children: [
      { name: 'SensorWifi', attrs: ['- ssid: String', '- rssi: int'], methods: [] },
      { name: 'BluetoothDevice', attrs: ['- mac_address: String', '- version_bt: String'], methods: [] },
      { name: 'ApiRest', attrs: ['- endpoint: String', '- api_key: String'], methods: [] },
    ],
  },
  {
    id: 12,
    slug: 'imprimible',
    title: 'Impresión — Interfaz Imprimible',
    context: 'Punto de venta que imprime facturas, tickets y etiquetas con vista previa idéntica.',
    task: 'Contrato Imprimible con imprimir() y vistaPrevia(). Cada documento renderiza distinto.',
    base: { name: '«interface» Imprimible', attrs: [], methods: ['+ imprimir(): boolean', '+ vistaPrevia(): String'] },
    children: [
      { name: 'FacturaImprimible', attrs: ['- folio: int', '- iva: double'], methods: [] },
      { name: 'Ticket', attrs: ['- numero: int', '- caja: String'], methods: [] },
      { name: 'Etiqueta', attrs: ['- codigo_barras: String', '- tamano: String'], methods: [] },
    ],
  },
  {
    id: 13,
    slug: 'buscable',
    title: 'Búsqueda — Interfaz Buscable',
    context: 'Buscador universal para catálogo, biblioteca y directorio con filtros propios.',
    task: 'Define Buscable con buscar(query) y filtrar(criterio). Cada implementación filtra distinto.',
    base: { name: '«interface» Buscable', attrs: [], methods: ['+ buscar(query: String): List', '+ filtrar(criterio: String): List'] },
    children: [
      { name: 'CatalogoProductos', attrs: ['- categoria: String', '- precio_min: double'], methods: [] },
      { name: 'Biblioteca', attrs: ['- isbn: String', '- autor: String'], methods: [] },
      { name: 'DirectorioUsuarios', attrs: ['- rol: String', '- activo: boolean'], methods: [] },
    ],
  },
  {
    id: 14,
    slug: 'cacheable',
    title: 'Cache — Interfaz Cacheable',
    context: 'Capa de caché con memoria, Redis y disco compartiendo get/set/expire.',
    task: 'Contrato Cacheable con guardar(clave,valor), obtener(clave) y expirar(clave). Simula TTL distinto por backend.',
    base: { name: '«interface» Cacheable', attrs: [], methods: ['+ guardar(clave: String, valor: String): boolean', '+ obtener(clave: String): String', '+ expirar(clave: String): boolean'] },
    children: [
      { name: 'CacheMemoria', attrs: ['- max_items: int', '- politica_eviction: String'], methods: [] },
      { name: 'CacheRedis', attrs: ['- host: String', '- puerto: int'], methods: [] },
      { name: 'CacheDisco', attrs: ['- ruta: String', '- compresion: boolean'], methods: [] },
    ],
  },
  {
    id: 15,
    slug: 'testeable',
    title: 'Testing — Interfaz Testeable',
    context: 'Runner que ejecuta tests unitarios, de integración y E2E con el mismo ciclo.',
    task: 'Define Testeable con ejecutarTest() y generarReporte(). Cada tipo de test reporta distinto.',
    base: { name: '«interface» Testeable', attrs: [], methods: ['+ ejecutarTest(): boolean', '+ generarReporte(): String'] },
    children: [
      { name: 'TestUnitario', attrs: ['- clase_objetivo: String', '- mocks: int'], methods: [] },
      { name: 'TestIntegracion', attrs: ['- base_datos: String', '- fixtures: String'], methods: [] },
      { name: 'TestE2E', attrs: ['- url: String', '- navegador: String'], methods: [] },
    ],
  },
  // ═══════════════════════════════════════════════════════════════
  // 5 NUEVOS — 3 niveles: Interface → Clase Abstracta → Hijos
  // ═══════════════════════════════════════════════════════════════
  {
    id: 16,
    slug: 'serializable-abstract',
    title: 'Serialización — Interfaz + Clase Abstracta',
    context: 'Sistema que serializa animales a JSON/XML/Binary. La interfaz define el contrato, una clase abstracta comparte lógica común (guardar/cargar), y los hijos especializan.',
    task: 'Crea la interfaz Serializable con serialize() y deserialize(). Crea la clase abstracta AnimalSerializable que implementa Serializable y guarda nombre/edad. Crea PerroSerializable, GatoSerializable y AveSerializable que heredan de AnimalSerializable y añaden atributos propios.',
    base: { name: '«interface» Serializable', attrs: [], methods: ['+ serialize(): String', '+ deserialize(data: String): boolean', '+ getFormat(): String'] },
    abstractParent: { name: 'AnimalSerializable', attrs: ['- nombre: String', '- edad: int'], methods: ['+ serialize(): String', '+ deserialize(data: String): boolean', '+ getFormat(): String'] },
    children: [
      { name: 'PerroSerializable', attrs: ['- raza: String', '- nivelEntrenado: int'], methods: ['+ getFormat(): String'] },
      { name: 'GatoSerializable', attrs: ['- indoor: boolean', '- vidasRestantes: int'], methods: ['+ getFormat(): String'] },
      { name: 'AveSerializable', attrs: ['- especie: String', '- puedeVolar: boolean'], methods: ['+ getFormat(): String'] },
    ],
  },
  {
    id: 17,
    slug: 'cobrable-abstract',
    title: 'Facturación — Interfaz + Clase Abstracta',
    context: 'Portal de facturación con cobros recurrentes, anuales y por uso. La interfaz define cobrar(), la abstracta calcula impuestos, y los hijos aplican tarifa.',
    task: 'Define la interfaz Cobrable con cobrar(monto) y generarBoleta(). Crea la abstracta CuentaCobrable que implementa Cobrable, guarda rut y nombre, y calcula IVA. Implementa CobroMensual, CobroAnual y CobroPorUso.',
    base: { name: '«interface» Cobrable', attrs: [], methods: ['+ cobrar(monto: double): boolean', '+ generarBoleta(): String', '+ getTipoCobro(): String'] },
    abstractParent: { name: 'CuentaCobrable', attrs: ['- rut: String', '- nombre: String', '- montoBase: double'], methods: ['+ cobrar(monto: double): boolean', '+ generarBoleta(): String', '+ calcularIVA(monto: double): double'] },
    children: [
      { name: 'CobroMensual', attrs: ['- mes: int', '- anio: int'], methods: ['+ getTipoCobro(): String'] },
      { name: 'CobroAnual', attrs: ['- anio: int', '- bonificacion: double'], methods: ['+ getTipoCobro(): String'] },
      { name: 'CobroPorUso', attrs: ['- unidadesConsumidas: int', '- tarifaUnidad: double'], methods: ['+ getTipoCobro(): String'] },
    ],
  },
  {
    id: 18,
    slug: 'navegable-abstract',
    title: 'GPS — Interfaz + Clase Abstracta',
    context: 'Flota de transporte con GPS compartido. La interfaz Navegable define movimiento, la abstracta VehiculoNavegable guarda ubicación actual, y los hijos calculan velocidad distinta.',
    task: 'Define la interfaz Navegable con mover(destino) y getPosicionActual(). Crea la abstracta VehiculoNavegable que guarda lat/lng y calcula distancia. Implementa NaveAuto, NaveMoto y NaveBici con velocidades máximas distintas.',
    base: { name: '«interface» Navegable', attrs: [], methods: ['+ mover(destino: String): void', '+ getPosicionActual(): String', '+ getVelocidadMax(): double'] },
    abstractParent: { name: 'VehiculoNavegable', attrs: ['- lat: double', '- lng: double', '- velocidadActual: double'], methods: ['+ mover(destino: String): void', '+ getPosicionActual(): String', '+ calcularDistancia(dest: String): double'] },
    children: [
      { name: 'NaveAuto', attrs: ['- patente: String', '- combustible: int'], methods: ['+ getVelocidadMax(): double'] },
      { name: 'NaveMoto', attrs: ['- cilindrada: int', '- cascoObligatorio: boolean'], methods: ['+ getVelocidadMax(): double'] },
      { name: 'NaveBici', attrs: ['- electrica: boolean', '- nivelBateria: int'], methods: ['+ getVelocidadMax(): double'] },
    ],
  },
  {
    id: 19,
    slug: 'almacenable-abstract',
    title: 'Almacenamiento — Interfaz + Clase Abstracta',
    context: 'Capa de persistencia multi-backend. La interfaz define operaciones CRUD, la abstracta valida claves, y los hijos ejecutan en distinto storage.',
    task: 'Define la interfaz Almacenable con guardar(clave,valor), obtener(clave) y eliminar(clave). Crea la abstracta Almacenamiento que valida formato de clave y registralogs. Implementa AlmacenDisco, AlmacenNube y AlmacenMemoria.',
    base: { name: '«interface» Almacenable', attrs: [], methods: ['+ guardar(clave: String, valor: String): boolean', '+ obtener(clave: String): String', '+ eliminar(clave: String): boolean', '+ listar(): List'] },
    abstractParent: { name: 'Almacenamiento', attrs: ['- nombre: String', '- capacidadMax: long'], methods: ['+ guardar(clave: String, valor: String): boolean', '+ obtener(clave: String): String', '+ eliminar(clave: String): boolean', '+ validarClave(clave: String): boolean'] },
    children: [
      { name: 'AlmacenDisco', attrs: ['- ruta: String', '- usoBytes: long'], methods: ['+ listar(): List'] },
      { name: 'AlmacenNube', attrs: ['- bucket: String', '- region: String'], methods: ['+ listar(): List'] },
      { name: 'AlmacenMemoria', attrs: ['- maxItems: int', '- evictionPolicy: String'], methods: ['+ listar(): List'] },
    ],
  },
  {
    id: 20,
    slug: 'reportable-abstract',
    title: 'Reportes — Interfaz + Clase Abstracta',
    context: 'Sistema de reportes con plantilla compartida. La interfaz define el ciclo, la abstracta genera header/footer, y los hijos renderizan contenido.',
    task: 'Define la interfaz Reportable con generar(), mostrar() y exportar(formato). Crea la abstracta ReporteBase que implementa Reportable, genera header con fecha/título, y calcula duración. Implementa ReporteVentas, ReporteUsuarios y ReporteSistema.',
    base: { name: '«interface» Reportable', attrs: [], methods: ['+ generar(): boolean', '+ mostrar(): String', '+ exportar(formato: String): String'] },
    abstractParent: { name: 'ReporteBase', attrs: ['- titulo: String', '- fechaGeneracion: String', '- duracionMs: long'], methods: ['+ generar(): boolean', '+ mostrar(): String', '+ exportar(formato: String): String', '+ generarHeader(): String'] },
    children: [
      { name: 'ReporteVentas', attrs: ['- totalVentas: double', '- itemsCount: int'], methods: ['+ generar(): boolean'] },
      { name: 'ReporteUsuarios', attrs: ['- totalUsuarios: int', '- nuevosEsteMes: int'], methods: ['+ generar(): boolean'] },
      { name: 'ReporteSistema', attrs: ['- cpuUsage: double', '- memoriaGB: double'], methods: ['+ generar(): boolean'] },
    ],
  },
];

export function toMermaidInterface(challenge: InterfaceChallenge): string {
  const clean = (s: string) => s.trim().replace(/^([+\-#~])\s*/, '$1');
  const fmtMember = (m: string) => {
    const t = clean(m);
    if (!t) return '';
    if (t.startsWith('+') || t.startsWith('-') || t.startsWith('#') || t.startsWith('~')) return t;
    return `+${t}`;
  };

  const block = (cls: UmlClassSpec, stereotype?: string) => {
    const cleanName = cls.name.replace(/«[^»]+»\s*/, '').trim();
    const lines = [
      ...cls.attrs.map((a) => `        ${fmtMember(a)}`),
      ...cls.methods.map((m) => `        ${fmtMember(m)}`),
    ];
    const st = stereotype ? `\n        <<${stereotype}>>` : '';
    return `    class ${cleanName} {${st}\n${lines.join('\n')}\n    }`;
  };

  const lines = ['classDiagram', '    direction TB'];
  const baseName = challenge.base.name.replace(/«[^»]+»\s*/, '').trim();

  lines.push(block({ ...challenge.base, name: baseName }, 'interface'));

  if (challenge.abstractParent) {
    const absName = challenge.abstractParent.name.replace(/«[^»]+»\s*/, '').trim();
    lines.push(block({ ...challenge.abstractParent, name: absName }, 'abstract'));
    lines.push(`    ${baseName} <|.. ${absName} : implements`);
    for (const child of challenge.children) {
      const childName = child.name.replace(/«[^»]+»\s*/, '').trim();
      lines.push(block({ ...child, name: childName }));
      lines.push(`    ${absName} <|-- ${childName}`);
    }
  } else {
    for (const child of challenge.children) {
      const childName = child.name.replace(/«[^»]+»\s*/, '').trim();
      lines.push(block({ ...child, name: childName }));
      lines.push(`    ${baseName} <|.. ${childName} : implements`);
    }
  }
  return lines.join('\n');
}
