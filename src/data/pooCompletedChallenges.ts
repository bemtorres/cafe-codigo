export type UmlClassSpec = {
  name: string;
  attrs: string[];
  methods: string[];
};

export type PooCompletedChallenge = {
  id: number;
  slug: string;
  title: string;
  context: string;
  task: string;
  parent: UmlClassSpec;
  children: UmlClassSpec[];
  interfaceSpec: UmlClassSpec;
  externalClass: UmlClassSpec;
  ownClassSpec: UmlClassSpec;
};

export const pooCompletedChallenges: PooCompletedChallenge[] = [
  {
    id: 1,
    slug: 'biblioteca-digital',
    title: '1. Sistema de Gestión de Recursos de Biblioteca Digital',
    context: 'Una biblioteca universitaria gestiona libros físicos, audiolibros digitales y revistas de acceso libre.',
    task: 'Crea RecursoBiblioteca (padre), LibroImpreso, AudioLibro (con SoporteTecnico) y RevistaAcademica (Descargable).',
    parent: {
      name: 'RecursoBiblioteca',
      attrs: ['- id: String', '- titulo: String', '- disponible: boolean'],
      methods: ['+ prestar(): void', '+ devolver(): void', '+ isDisponible(): boolean']
    },
    interfaceSpec: {
      name: 'Descargable',
      attrs: [],
      methods: ['+ descargar(): void']
    },
    externalClass: {
      name: 'SoporteTecnico',
      attrs: ['- nombreFormato: String', '- activo: boolean'],
      methods: ['+ getNombreFormato(): String']
    },
    ownClassSpec: {
      name: 'LibroImpreso',
      attrs: ['- numPaginas: int', '- tipoEmpastado: String'],
      methods: ['+ hojearPaginas(): void']
    },
    children: [
      { name: 'LibroImpreso', attrs: ['- numPaginas: int', '- tipoEmpastado: String'], methods: ['+ hojearPaginas(): void'] },
      { name: 'AudioLibro', attrs: ['- duracionMinutos: double', '- soporte: SoporteTecnico'], methods: ['+ reproducirMuestra(): void'] },
      { name: 'RevistaAcademica', attrs: ['- numeroEdicion: int', '- doiLicencia: String'], methods: ['+ descargar(): void'] }
    ]
  },
  {
    id: 2,
    slug: 'atencion-hospitalaria',
    title: '2. Sistema de Atención Médica Hospitalaria',
    context: 'Un hospital privado administra consultas médicas clasificadas por especialidad, cirugía y telemedicina.',
    task: 'Modelar AtencionMedica (padre), ConsultaGeneral (propia), CirugiaUrgencia (con Quirofano) y Telemedicina (FacturableDigital).',
    parent: {
      name: 'AtencionMedica',
      attrs: ['- codigoAtencion: String', '- costoBase: double'],
      methods: ['+ calcularCostoTotal()*: double', '+ registrarDiagnostico(diag: String): void']
    },
    interfaceSpec: {
      name: 'FacturableDigital',
      attrs: [],
      methods: ['+ generarFacturaXML(): String', '+ enviarPorCorreo(email: String): void']
    },
    externalClass: {
      name: 'Quirofano',
      attrs: ['- codigoSala: String', '- esterilizado: boolean'],
      methods: ['+ isEsterilizado(): boolean']
    },
    ownClassSpec: {
      name: 'ConsultaGeneral',
      attrs: ['- esRevisionRutina: boolean'],
      methods: ['+ emitirRecetaMedica(): void']
    },
    children: [
      { name: 'ConsultaGeneral', attrs: ['- esRevisionRutina: boolean'], methods: ['+ emitirRecetaMedica(): void'] },
      { name: 'CirugiaUrgencia', attrs: ['- horasDuracion: double', '- quirofanoAsignado: Quirofano'], methods: ['+ prepararEquipo(): void'] },
      { name: 'Telemedicina', attrs: ['- plataformaVideo: String'], methods: ['+ generarFacturaXML(): String', '+ enviarPorCorreo(email: String): void'] }
    ]
  },
  {
    id: 3,
    slug: 'reserva-hotel-lujo',
    title: '3. Sistema de Reserva y Operaciones en Hotel 5 Estrellas',
    context: 'Un resort de lujo opera suites temáticas, penthouses VIP con mayordomo y habitaciones estándar.',
    task: 'Modelar HabitacionHotel (padre), HabitacionEstandar (propia), SuitePenthouse (con ServicioMayordomo) y SuiteTematica (SanitizableAutomatico).',
    parent: {
      name: 'HabitacionHotel',
      attrs: ['- numeroHabitacion: int', '- precioNocheBase: double', '- ocupada: boolean'],
      methods: ['+ calcularCostoEstadia(noches: int)*: double', '+ realizarCheckIn(): void']
    },
    interfaceSpec: {
      name: 'SanitizableAutomatico',
      attrs: [],
      methods: ['+ iniciarCicloDesinfeccion(): boolean', '+ obtenerReporteSeguridad(): String']
    },
    externalClass: {
      name: 'ServicioMayordomo',
      attrs: ['- nombreMayordomo: String', '- turnosDisponibles: int'],
      methods: ['+ atenderLlamadaVIP(): void']
    },
    ownClassSpec: {
      name: 'HabitacionEstandar',
      attrs: ['- camasSupletorias: int'],
      methods: ['+ solicitarToallasExtra(): void']
    },
    children: [
      { name: 'HabitacionEstandar', attrs: ['- camasSupletorias: int'], methods: ['+ solicitarToallasExtra(): void'] },
      { name: 'SuitePenthouse', attrs: ['- jacuzziPrivado: boolean', '- mayordomoVIP: ServicioMayordomo'], methods: ['+ solicitarCenaGourmet(): void'] },
      { name: 'SuiteTematica', attrs: ['- tematicaDecoracion: String'], methods: ['+ iniciarCicloDesinfeccion(): boolean', '+ obtenerReporteSeguridad(): String'] }
    ]
  },
  {
    id: 4,
    slug: 'vehiculos-autonomos',
    title: '4. Flota de Vehículos Autónomos Urbanos',
    context: 'Una plataforma de transporte inteligente coordina taxis autónomos, drones de entrega y buses expresos.',
    task: 'Crear VehiculoAutonomo (padre), BusExpreso (propio), TaxiAutonomo (con BateriaLitio) y DronEntrega (RastreableGPS).',
    parent: {
      name: 'VehiculoAutonomo',
      attrs: ['- vin: String', '- velocidadMax: double', '- enRuta: boolean'],
      methods: ['+ iniciarRuta(destino: String): void', '+ frenarEmergencia(): void']
    },
    interfaceSpec: {
      name: 'RastreableGPS',
      attrs: [],
      methods: ['+ obtenerCoordenadas(): String', '+ transmitirTelemetria(): void']
    },
    externalClass: {
      name: 'BateriaLitio',
      attrs: ['- capacidadKWh: double', '- porcentajeCarga: int'],
      methods: ['+ getPorcentajeCarga(): int']
    },
    ownClassSpec: {
      name: 'BusExpreso',
      attrs: ['- capacidadPasajeros: int', '- paradasRuta: List~String~'],
      methods: ['+ anunciarSiguienteParada(): void']
    },
    children: [
      { name: 'BusExpreso', attrs: ['- capacidadPasajeros: int'], methods: ['+ anunciarSiguienteParada(): void'] },
      { name: 'TaxiAutonomo', attrs: ['- tarifaPorKm: double', '- packBaterias: BateriaLitio'], methods: ['+ solicitarRecargaRapida(): void'] },
      { name: 'DronEntrega', attrs: ['- pesoMaxPaquete: double'], methods: ['+ obtenerCoordenadas(): String', '+ transmitirTelemetria(): void'] }
    ]
  },
  {
    id: 5,
    slug: 'restaurante-gourmet',
    title: '5. Sistema de Pedidos de Cocina y Restaurante',
    context: 'Un grupo gastronómico procesa platillos de carta, menús degustación con maridaje y pedidos para delivery.',
    task: 'Modelar PlatilloMenu (padre), EntradaGourmet (propia), PlatoPrincipal (con Sommelier) y PedidoDelivery (EmpacableTermico).',
    parent: {
      name: 'PlatilloMenu',
      attrs: ['- idPlato: String', '- nombre: String', '- precioBase: double'],
      methods: ['+ calcularPrecioFinal()*: double', '+ prepararPlato(): void']
    },
    interfaceSpec: {
      name: 'EmpacableTermico',
      attrs: [],
      methods: ['+ sellarEmpaque(): boolean', '+ tiempoConservacionMin(): int']
    },
    externalClass: {
      name: 'Sommelier',
      attrs: ['- nombreExperto: String', '- certificacionNivel: int'],
      methods: ['+ recomendarVino(plato: String): String']
    },
    ownClassSpec: {
      name: 'EntradaGourmet',
      attrs: ['- esFrio: boolean', '- ingredientesAlergenos: List~String~'],
      methods: ['+ verificarAlergenos(): boolean']
    },
    children: [
      { name: 'EntradaGourmet', attrs: ['- esFrio: boolean'], methods: ['+ verificarAlergenos(): boolean'] },
      { name: 'PlatoPrincipal', attrs: ['- tipoProteina: String', '- sommelierAsignado: Sommelier'], methods: ['+ sugerirMaridaje(): void'] },
      { name: 'PedidoDelivery', attrs: ['- direccionEntrega: String'], methods: ['+ sellarEmpaque(): boolean', '+ tiempoConservacionMin(): int'] }
    ]
  },
  {
    id: 6,
    slug: 'plataforma-streaming',
    title: '6. Plataforma de Contenido Multimedia Streaming',
    context: 'Un servicio de video bajo demanda transmite películas 4K, emisiones en vivo de deportes y podcast de audio.',
    task: 'Modelar ContenidoMedia (padre), PeliculaCinema (propia), EventoEnVivo (con ServidorCDN) y PodcastEpisodio (DescargableOffline).',
    parent: {
      name: 'ContenidoMedia',
      attrs: ['- idMedia: String', '- titulo: String', '- duracionSeg: int'],
      methods: ['+ reproducir(): void', '+ pausar(): void']
    },
    interfaceSpec: {
      name: 'DescargableOffline',
      attrs: [],
      methods: ['+ guardarEnCache(): boolean', '+ verificarEspacioDisk(): boolean']
    },
    externalClass: {
      name: 'ServidorCDN',
      attrs: ['- ipNodo: String', '- anchoBandaGbps: double'],
      methods: ['+ balancearCarga(): void']
    },
    ownClassSpec: {
      name: 'PeliculaCinema',
      attrs: ['- director: String', '- resolucion4K: boolean'],
      methods: ['+ mostrarTrailer(): void']
    },
    children: [
      { name: 'PeliculaCinema', attrs: ['- director: String'], methods: ['+ mostrarTrailer(): void'] },
      { name: 'EventoEnVivo', attrs: ['- latenciaMs: int', '- nodoCDN: ServidorCDN'], methods: ['+ ajustarCalidadDynamic(): void'] },
      { name: 'PodcastEpisodio', attrs: ['- numEpisodio: int'], methods: ['+ guardarEnCache(): boolean', '+ verificarEspacioDisk(): boolean'] }
    ]
  },
  {
    id: 7,
    slug: 'aerolinea-vuelos',
    title: '7. Sistema de Pasajes y Asientos de Aerolínea',
    context: 'Una aerolínea internacional gestiona asientos de clase Turista, Business con cabina VIP y Charter privado.',
    task: 'Modelar AsientoVuelo (padre), AsientoTurista (propio), AsientoBusiness (con CabinaPrivada) and BoardingDigital (CheckInOnLine).',
    parent: {
      name: 'AsientoVuelo',
      attrs: ['- codigoAsiento: String', '- precioTarifa: double', '- reservado: boolean'],
      methods: ['+ reservarAsiento(): void', '+ calcularEquipajePermitido()*: double']
    },
    interfaceSpec: {
      name: 'CheckInOnLine',
      attrs: [],
      methods: ['+ emitirBoardingPass(): String', '+ validarPasaporte(num: String): boolean']
    },
    externalClass: {
      name: 'CabinaPrivada',
      attrs: ['- numPantallaHD: int', '- asientoReclinable180: boolean'],
      methods: ['+ activarMasaje(): void']
    },
    ownClassSpec: {
      name: 'AsientoTurista',
      attrs: ['- incluyeSnack: boolean'],
      methods: ['+ elegirMenuEstandar(): void']
    },
    children: [
      { name: 'AsientoTurista', attrs: ['- incluyeSnack: boolean'], methods: ['+ elegirMenuEstandar(): void'] },
      { name: 'AsientoBusiness', attrs: ['- accesoLounge: boolean', '- suiteCabina: CabinaPrivada'], methods: ['+ solicitarChampagne(): void'] },
      { name: 'BoardingDigital', attrs: ['- codigoQR: String'], methods: ['+ emitirBoardingPass(): String', '+ validarPasaporte(num: String): boolean'] }
    ]
  },
  {
    id: 8,
    slug: 'e-commerce-pagos',
    title: '8. Pasarela de Pagos y Facturación E-Commerce',
    context: 'Una tienda online procesa transacciones con tarjeta de crédito, transferencias y pagos en criptomonedas.',
    task: 'Modelar TransaccionPago (padre), PagoTransferencia (propio), PagoTarjeta (con EncriptadorRSA) y PagoCripto (VerificableBlockchain).',
    parent: {
      name: 'TransaccionPago',
      attrs: ['- idTransaccion: String', '- montoUSD: double', '- completado: boolean'],
      methods: ['+ procesarPago()*: boolean', '+ generarComprobante(): String']
    },
    interfaceSpec: {
      name: 'VerificableBlockchain',
      attrs: [],
      methods: ['+ obtenerHashConfirmacion(): String', '+ numeroConfirmaciones(): int']
    },
    externalClass: {
      name: 'EncriptadorRSA',
      attrs: ['- longitudLlave: int', '- tokenSeguridad: String'],
      methods: ['+ encriptarDatos(datos: String): String']
    },
    ownClassSpec: {
      name: 'PagoTransferencia',
      attrs: ['- bancoOrigen: String', '- numeroComprobanteBank: String'],
      methods: ['+ adjuntarComprobante(): void']
    },
    children: [
      { name: 'PagoTransferencia', attrs: ['- bancoOrigen: String'], methods: ['+ adjuntarComprobante(): void'] },
      { name: 'PagoTarjeta', attrs: ['- ultimos4Digitos: String', '- moduloRSA: EncriptadorRSA'], methods: ['+ tokenizarTarjeta(): void'] },
      { name: 'PagoCripto', attrs: ['- walletDestino: String', '- redBlockchain: String'], methods: ['+ obtenerHashConfirmacion(): String', '+ numeroConfirmaciones(): int'] }
    ]
  },
  {
    id: 9,
    slug: 'videojuego-rpg',
    title: '9. Motor de Personajes de Videojuego RPG',
    context: 'Un videojuego de rol enfrenta a Guerreros, Magos oscuros y Arqueros en batallas tácticas por turnos.',
    task: 'Modelar PersonajeRPG (padre), GuerreroEscudero (propio), MagoElemental (con LibroHechizos) y ArqueroElfo (LanzadorHabilidades).',
    parent: {
      name: 'PersonajeRPG',
      attrs: ['- nombre: String', '- puntosVida: int', '- nivel: int'],
      methods: ['+ atacar(objetivo: PersonajeRPG)*: void', '+ recibirDanio(puntos: int): void']
    },
    interfaceSpec: {
      name: 'LanzadorHabilidades',
      attrs: [],
      methods: ['+ ejecutarHabilidadEspecial(): void', '+ tiempoEnfriamientoTurnos(): int']
    },
    externalClass: {
      name: 'LibroHechizos',
      attrs: ['- totalGrimorios: int', '- elementoDominante: String'],
      methods: ['+ buscarRunaPoderosa(): String']
    },
    ownClassSpec: {
      name: 'GuerreroEscudero',
      attrs: ['- armaduraPesada: int'],
      methods: ['+ bloquearConEscudo(): void']
    },
    children: [
      { name: 'GuerreroEscudero', attrs: ['- armaduraPesada: int'], methods: ['+ bloquearConEscudo(): void'] },
      { name: 'MagoElemental', attrs: ['- manaPool: int', '- grimorio: LibroHechizos'], methods: ['+ invocarTormenta(): void'] },
      { name: 'ArqueroElfo', attrs: ['- precisionPorcentaje: double'], methods: ['+ ejecutarHabilidadEspecial(): void', '+ tiempoEnfriamientoTurnos(): int'] }
    ]
  },
  {
    id: 10,
    slug: 'red-sensores-iot',
    title: '10. Red de Sensores Industriales IoT',
    context: 'Una planta petroquímica monitorea temperatura, presión de tubos y humedad ambiental mediante sensores inteligentes.',
    task: 'Modelar SensorIndustrial (padre), SensorHumedad (propio), SensorPresion (con CalibradorDigital) y SensorTemperatura (NotificableAlarma).',
    parent: {
      name: 'SensorIndustrial',
      attrs: ['- idSensor: String', '- ubicacionArea: String', '- activo: boolean'],
      methods: ['+ tomarLectura()*: double', '+ recalibrar(): void']
    },
    interfaceSpec: {
      name: 'NotificableAlarma',
      attrs: [],
      methods: ['+ dispararSirenaEmergencia(): void', '+ enviarNotificacionMQTT(): void']
    },
    externalClass: {
      name: 'CalibradorDigital',
      attrs: ['- fechaUltimaCalibracion: String', '- margenError: double'],
      methods: ['+ ajustarCeroAbsoluto(): void']
    },
    ownClassSpec: {
      name: 'SensorHumedad',
      attrs: ['- nivelPuntualPorcentaje: double'],
      methods: ['+ calcularPuntoRocio(): double']
    },
    children: [
      { name: 'SensorHumedad', attrs: ['- nivelPuntualPorcentaje: double'], methods: ['+ calcularPuntoRocio(): double'] },
      { name: 'SensorPresion', attrs: ['- presionPSI: double', '- dispositivoCalibrador: CalibradorDigital'], methods: ['+ medirDeltaPresion(): void'] },
      { name: 'SensorTemperatura', attrs: ['- gradosCelsius: double'], methods: ['+ dispararSirenaEmergencia(): void', '+ enviarNotificacionMQTT(): void'] }
    ]
  },
  {
    id: 11,
    slug: 'banco-cuentas-credito',
    title: '11. Sistema Bancario de Cuentas y Tarjetas',
    context: 'Un banco nacional opera cuentas de ahorro, cuentas corrientes para empresas y tarjetas de crédito platinum.',
    task: 'Modelar CuentaBancaria (padre), CuentaAhorro (propia), CuentaCorrienteEmpresa (con OficialCredito) y TarjetaPlatinum (OperableCajero).',
    parent: {
      name: 'CuentaBancaria',
      attrs: ['- numeroCuenta: String', '- saldoActual: double', '- titular: String'],
      methods: ['+ depositar(monto: double): void', '+ retirar(monto: double)*: boolean']
    },
    interfaceSpec: {
      name: 'OperableCajero',
      attrs: [],
      methods: ['+ validarPIN(pin: String): boolean', '+ retirarEfectivoATM(monto: double): boolean']
    },
    externalClass: {
      name: 'OficialCredito',
      attrs: ['- nombreOficial: String', '- limiteAprobacionUSD: double'],
      methods: ['+ autorizarSobregiro(monto: double): boolean']
    },
    ownClassSpec: {
      name: 'CuentaAhorro',
      attrs: ['- tasaInteresAnual: double'],
      methods: ['+ abonarInteresesMensuales(): void']
    },
    children: [
      { name: 'CuentaAhorro', attrs: ['- tasaInteresAnual: double'], methods: ['+ abonarInteresesMensuales(): void'] },
      { name: 'CuentaCorrienteEmpresa', attrs: ['- cupoSobregiro: double', '- ejecutivo: OficialCredito'], methods: ['+ solicitarGiroEspecial(): void'] },
      { name: 'TarjetaPlatinum', attrs: ['- cupoDolares: double'], methods: ['+ validarPIN(pin: String): boolean', '+ retirarEfectivoATM(monto: double): boolean'] }
    ]
  },
  {
    id: 12,
    slug: 'logistica-envios-paquetes',
    title: '12. Operaciones Logísticas de Envíos Nacionales',
    context: 'Una empresa postal distribuye sobres estándar, paquetes pesados en camión y envíos frágiles por avión.',
    task: 'Modelar PaqueteEnvio (padre), SobreDocumento (propio), PaquetePesado (con BasculaIndustrial) and EnvioAereoFragil (AsegurableRiesgo).',
    parent: {
      name: 'PaqueteEnvio',
      attrs: ['- numeroGuia: String', '- pesoKg: double', '- destino: String'],
      methods: ['+ calcularCostoEnvio()*: double', '+ rastrearEstado(): String']
    },
    interfaceSpec: {
      name: 'AsegurableRiesgo',
      attrs: [],
      methods: ['+ cotizarPolizaSeguro(): double', '+ emitirCertificadoProteccion(): String']
    },
    externalClass: {
      name: 'BasculaIndustrial',
      attrs: ['- precisionGramos: double', '- fechaCertificado: String'],
      methods: ['+ obtenerPesajePrecision(): double']
    },
    ownClassSpec: {
      name: 'SobreDocumento',
      attrs: ['- esDocumentoLegal: boolean'],
      methods: ['+ marcarComoConfidencial(): void']
    },
    children: [
      { name: 'SobreDocumento', attrs: ['- esDocumentoLegal: boolean'], methods: ['+ marcarComoConfidencial(): void'] },
      { name: 'PaquetePesado', attrs: ['- esCargaPaletizada: boolean', '- basculaOficial: BasculaIndustrial'], methods: ['+ pesajeOficial(): void'] },
      { name: 'EnvioAereoFragil', attrs: ['- valorDeclarado: double'], methods: ['+ cotizarPolizaSeguro(): double', '+ emitirCertificadoProteccion(): String'] }
    ]
  },
  {
    id: 13,
    slug: 'gimnasio-suscripciones',
    title: '13. Membresías y Accesos de Cadena de Gimnasios',
    context: 'Un club deportivo gestiona miembros de pase básico, pases VIP con entrenador y pases corporativos flexibles.',
    task: 'Modelar MembresiaGym (padre), PaseBasico (propio), PaseVIPEntrenador (con PersonalTrainer) y PaseCorporativo (AccesoBiometrico).',
    parent: {
      name: 'MembresiaGym',
      attrs: ['- idSocio: String', '- nombreSocio: String', '- cuotaMensualBase: double'],
      methods: ['+ registrarIngreso(): void', '+ calcularCuotaFinal()*: double']
    },
    interfaceSpec: {
      name: 'AccesoBiometrico',
      attrs: [],
      methods: ['+ verificarHuella(): boolean', '+ registrarFichajeFacial(): boolean']
    },
    externalClass: {
      name: 'PersonalTrainer',
      attrs: ['- nombreTrainer: String', '- especialidad: String'],
      methods: ['+ disenarRutinaSemanal(): void']
    },
    ownClassSpec: {
      name: 'PaseBasico',
      attrs: ['- horarioAccesoRestringido: boolean'],
      methods: ['+ consultarHorarioPermitido(): String']
    },
    children: [
      { name: 'PaseBasico', attrs: ['- horarioAccesoRestringido: boolean'], methods: ['+ consultarHorarioPermitido(): String'] },
      { name: 'PaseVIPEntrenador', attrs: ['- accesoSpa: boolean', '- coachPersonal: PersonalTrainer'], methods: ['+ agendarSesionCoach(): void'] },
      { name: 'PaseCorporativo', attrs: ['- nombreEmpresaConvenio: String'], methods: ['+ verificarHuella(): boolean', '+ registrarFichajeFacial(): boolean'] }
    ]
  },
  {
    id: 14,
    slug: 'gestion-universitaria-personas',
    title: '14. Portal Académico Universitario',
    context: 'Una facultad registra estudiantes regulares, profesores titulares con departamento y egresados distinguidos.',
    task: 'Modelar MiembroFacultad (padre), EstudianteRegular (propio), ProfesorTitular (con DepartamentoAcademico) y EgresadoInvestigador (ExportableCV).',
    parent: {
      name: 'MiembroFacultad',
      attrs: ['- rutId: String', '- nombreCompleto: String', '- emailInstitucional: String'],
      methods: ['+ obtenerPerfilCompleto(): String', '+ ingresarPortal(): boolean']
    },
    interfaceSpec: {
      name: 'ExportableCV',
      attrs: [],
      methods: ['+ generarFormatoORCID(): String', '+ exportarPDFResumido(): String']
    },
    externalClass: {
      name: 'DepartamentoAcademico',
      attrs: ['- nombreDepto: String', '- presupuestoInvestigacion: double'],
      methods: ['+ aprobarProyecto(): boolean']
    },
    ownClassSpec: {
      name: 'EstudianteRegular',
      attrs: ['- promedioAcumulado: double', '- creditosAprobados: int'],
      methods: ['+ inscribirAsignatura(codigo: String): void']
    },
    children: [
      { name: 'EstudianteRegular', attrs: ['- promedioAcumulado: double'], methods: ['+ inscribirAsignatura(codigo: String): void'] },
      { name: 'ProfesorTitular', attrs: ['- horasDocencia: int', '- deptoPertenece: DepartamentoAcademico'], methods: ['+ postularFondoInvestigacion(): void'] },
      { name: 'EgresadoInvestigador', attrs: ['- anioGraduacion: int'], methods: ['+ generarFormatoORCID(): String', '+ exportarPDFResumido(): String'] }
    ]
  },
  {
    id: 15,
    slug: 'inmobiliaria-propiedades',
    title: '15. Corredora e Inmobiliaria de Bienes Raíces',
    context: 'Una firma inmobiliaria administra departamentos urbanos, oficinas comerciales con tasador y terrenos agrícolas.',
    task: 'Modelar Inmueble (padre), DepartamentoUrbano (propio), OficinaComercial (con TasadorOficial) y TerrenoAgricola (FirmableDigital).',
    parent: {
      name: 'Inmueble',
      attrs: ['- rolMatriz: String', '- direccion: String', '- metrosCuadrados: double'],
      methods: ['+ calcularContribuciones()*: double', '+ publicarEnCatalogo(): void']
    },
    interfaceSpec: {
      name: 'FirmableDigital',
      attrs: [],
      methods: ['+ firmarPromesaNotarial(): boolean', '+ verificarFirmaToken(): String']
    },
    externalClass: {
      name: 'TasadorOficial',
      attrs: ['- nombreTasador: String', '- numRegistroNacional: String'],
      methods: ['+ calcularValorComercialUF(): double']
    },
    ownClassSpec: {
      name: 'DepartamentoUrbano',
      attrs: ['- pisoNumero: int', '- gastosComunesPromedio: double'],
      methods: ['+ solicitarEstacionamientoVisitantes(): void']
    },
    children: [
      { name: 'DepartamentoUrbano', attrs: ['- pisoNumero: int'], methods: ['+ solicitarEstacionamientoVisitantes(): void'] },
      { name: 'OficinaComercial', attrs: ['- banosPrivados: int', '- expertoTasador: TasadorOficial'], methods: ['+ solicitarInformeTasacion(): void'] },
      { name: 'TerrenoAgricola', attrs: ['- tipoSuelo: String'], methods: ['+ firmarPromesaNotarial(): boolean', '+ verificarFirmaToken(): String'] }
    ]
  },
  {
    id: 16,
    slug: 'cine-boleteria-entradas',
    title: '16. Taquilla y Entradas de Cadena de Cines',
    context: 'Un complejo de cine emite tickets de función estándar, entradas VIP con servicio de bar y pases de festival.',
    task: 'Modelar TicketCine (padre), EntradaEstandar (propia), EntradaVIP (con ServicioBar) y PaseFestival (EscaneableNFC).',
    parent: {
      name: 'TicketCine',
      attrs: ['- idTicket: String', '- nombrePelicula: String', '- precioBase: double'],
      methods: ['+ calcularPrecioTotal()*: double', '+ imprimirTicket(): void']
    },
    interfaceSpec: {
      name: 'EscaneableNFC',
      attrs: [],
      methods: ['+ validarChipNFC(): boolean', '+ registrarIngresoTorniquete(): void']
    },
    externalClass: {
      name: 'ServicioBar',
      attrs: ['- numButaca: String', '- incluyeBebidaRefill: boolean'],
      methods: ['+ enviarComboAButaca(): void']
    },
    ownClassSpec: {
      name: 'EntradaEstandar',
      attrs: ['- filaLetra: char', '- numeroAsiento: int'],
      methods: ['+ canjearPuntosCine(): void']
    },
    children: [
      { name: 'EntradaEstandar', attrs: ['- filaLetra: char'], methods: ['+ canjearPuntosCine(): void'] },
      { name: 'EntradaVIP', attrs: ['- menuGourmet: boolean', '- atencionBar: ServicioBar'], methods: ['+ pedirPopcornTrufa(): void'] },
      { name: 'PaseFestival', attrs: ['- diasValidez: int'], methods: ['+ validarChipNFC(): boolean', '+ registrarIngresoTorniquete(): void'] }
    ]
  },
  {
    id: 17,
    slug: 'energia-paneles-solares',
    title: '17. Parque Fotovoltaico y Generación Eléctrica',
    context: 'Una central de energía renovable monitorea paneles solares fijos, inversores con transformador y turbinas eólicas.',
    task: 'Modelar GeneradorRenovable (padre), PanelSolarFijo (propio), InversorCentral (con TransformadorHV) y TurbinaEolica (ConectableGrid).',
    parent: {
      name: 'GeneradorRenovable',
      attrs: ['- codigoGenerador: String', '- capacidadKWhMax: double', '- enOperacion: boolean'],
      methods: ['+ calcularGeneracionDiaria()*: double', '+ apagarPorMantenimiento(): void']
    },
    interfaceSpec: {
      name: 'ConectableGrid',
      attrs: [],
      methods: ['+ sincronizarFaseFrecuencia(): boolean', '+ inyectarMWaLaRed(): double']
    },
    externalClass: {
      name: 'TransformadorHV',
      attrs: ['- relacionVoltaje: String', '- aceiteRefrigeranteOk: boolean'],
      methods: ['+ elevaVoltaje(): void']
    },
    ownClassSpec: {
      name: 'PanelSolarFijo',
      attrs: ['- anguloInclinacion: int'],
      methods: ['+ limpiarPolvoSuperficie(): void']
    },
    children: [
      { name: 'PanelSolarFijo', attrs: ['- anguloInclinacion: int'], methods: ['+ limpiarPolvoSuperficie(): void'] },
      { name: 'InversorCentral', attrs: ['- eficienciaPorcentaje: double', '- transformadorCentral: TransformadorHV'], methods: ['+ regularVoltajeEntrada(): void'] },
      { name: 'TurbinaEolica', attrs: ['- diametroRotorMetros: double'], methods: ['+ sincronizarFaseFrecuencia(): boolean', '+ inyectarMWaLaRed(): double'] }
    ]
  },
  {
    id: 18,
    slug: 'taller-mecanico-reparaciones',
    title: '18. Taller Automotriz y Servicio Técnico',
    context: 'Un taller mecánico administra mantenciones preventivas, reparaciones de motor con escaner y afinaciones electrónicas.',
    task: 'Modelar ServicioMecanico (padre), MantencionPreventiva (propia), ReparacionMotor (con EscanerDiagnostico) y AfinacionElectrica (GarantizableTaller).',
    parent: {
      name: 'ServicioMecanico',
      attrs: ['- idOrden: String', '- patenteVehiculo: String', '- manoObraBase: double'],
      methods: ['+ calcularCostoTotal()*: double', '+ finalizarServicio(): void']
    },
    interfaceSpec: {
      name: 'GarantizableTaller',
      attrs: [],
      methods: ['+ emitirCertificadoGarantia(meses: int): String', '+ validarEstadoPiezasOriginales(): boolean']
    },
    externalClass: {
      name: 'EscanerDiagnostico',
      attrs: ['- marcaEscaner: String', '- versionSoftware: String'],
      methods: ['+ leerCodigosFallaOBD2(): List~String~']
    },
    ownClassSpec: {
      name: 'MantencionPreventiva',
      attrs: ['- cambioFiltrosIncluido: boolean'],
      methods: ['+ rellenarFluidoFrenos(): void']
    },
    children: [
      { name: 'MantencionPreventiva', attrs: ['- cambioFiltrosIncluido: boolean'], methods: ['+ rellenarFluidoFrenos(): void'] },
      { name: 'ReparacionMotor', attrs: ['- horasTrabajoMecanico: double', '- escanerOBD: EscanerDiagnostico'], methods: ['+ escanearComputadorVehiculo(): void'] },
      { name: 'AfinacionElectrica', attrs: ['- repuestosCambiados: int'], methods: ['+ emitirCertificadoGarantia(meses: int): String', '+ validarEstadoPiezasOriginales(): boolean'] }
    ]
  },
  {
    id: 19,
    slug: 'seguros-polizas-vida',
    title: '19. Compañía de Seguros de Vida y Salud',
    context: 'Una aseguradora cotiza pólizas de seguro de auto, seguros de vida con médico evaluador y seguros de viaje.',
    task: 'Modelar PolizaSeguro (padre), SeguroAutoEstandar (propio), SeguroVidaVIP (con MedicoEvaluador) y SeguroViajeInternacional (Asistencia24H).',
    parent: {
      name: 'PolizaSeguro',
      attrs: ['- numPoliza: String', '- primaMensual: double', '- montoCoberturaMax: double'],
      methods: ['+ calcularPrimaFinal()*: double', '+ procesarSiniestro(monto: double): boolean']
    },
    interfaceSpec: {
      name: 'Asistencia24H',
      attrs: [],
      methods: ['+ solicitarGruaEmergencia(): void', '+ activarTelemedicinaInternacional(): boolean']
    },
    externalClass: {
      name: 'MedicoEvaluador',
      attrs: ['- nombreMedico: String', '- numColegiado: String'],
      methods: ['+ emiteInformeExamenes(): boolean']
    },
    ownClassSpec: {
      name: 'SeguroAutoEstandar',
      attrs: ['- deducibleUF: int'],
      methods: ['+ inspeccionarCarroceria(): void']
    },
    children: [
      { name: 'SeguroAutoEstandar', attrs: ['- deducibleUF: int'], methods: ['+ inspeccionarCarroceria(): void'] },
      { name: 'SeguroVidaVIP', attrs: ['- incluyeSeguroAccidentes: boolean', '- evaluadorSalud: MedicoEvaluador'], methods: ['+ realizarExamenPrevision(): void'] },
      { name: 'SeguroViajeInternacional', attrs: ['- paisesCobertura: String'], methods: ['+ solicitarGruaEmergencia(): void', '+ activarTelemedicinaInternacional(): boolean'] }
    ]
  },
  {
    id: 20,
    slug: 'astronomia-observatorio-telescopios',
    title: '20. Observatorio Astronómico y Telescopios',
    context: 'Un observatorio científico coordina telescopios ópticos, telescopios espaciales con espectrómetro y radiotelescopios.',
    task: 'Modelar TelescopioAstronomico (padre), TelescopioOptico (propio), TelescopioEspacial (con EspectrometroLaser) and RadioTelescopio (Procesablefits).',
    parent: {
      name: 'TelescopioAstronomico',
      attrs: ['- idTelescopio: String', '- diametroEspejoMetros: double', '- enOrientacion: boolean'],
      methods: ['+ apuntarACoordenadas(ra: double, dec: double): void', '+ capturarImagenData()*: void']
    },
    interfaceSpec: {
      name: 'Procesablefits',
      attrs: [],
      methods: ['+ generarArchivoFITS(): String', '+ aplicarFiltroReduccionRuido(): void']
    },
    externalClass: {
      name: 'EspectrometroLaser',
      attrs: ['- rangoLongitudOnda: String', '- temperaturaKelvin: double'],
      methods: ['+ analizarComposicionQuimica(): String']
    },
    ownClassSpec: {
      name: 'TelescopioOptico',
      attrs: ['- tipoFiltroColor: String'],
      methods: ['+ cambiarFiltro(nuevoFiltro: String): void']
    },
    children: [
      { name: 'TelescopioOptico', attrs: ['- tipoFiltroColor: String'], methods: ['+ cambiarFiltro(nuevoFiltro: String): void'] },
      { name: 'TelescopioEspacial', attrs: ['- orbitaAltitudKm: double', '- espectrometro: EspectrometroLaser'], methods: ['+ realizarEspectroscopiaEstelar(): void'] },
      { name: 'RadioTelescopio', attrs: ['- frecuenciaGHz: double'], methods: ['+ generarArchivoFITS(): String', '+ aplicarFiltroReduccionRuido(): void'] }
    ]
  }
];

export function toMermaidCompleted(ch: PooCompletedChallenge): string {
  const lines: string[] = ['classDiagram', '    direction TB'];

  // Clase Padre
  lines.push(`    class ${ch.parent.name} {`);
  lines.push('        <<abstract>>');
  ch.parent.attrs.forEach((a) => lines.push(`        ${a}`));
  ch.parent.methods.forEach((m) => lines.push(`        ${m}`));
  lines.push('    }');

  // Interfaz
  lines.push(`    class ${ch.interfaceSpec.name} {`);
  lines.push('        <<interface>>');
  ch.interfaceSpec.methods.forEach((m) => lines.push(`        ${m}`));
  lines.push('    }');

  // Clase Externa
  lines.push(`    class ${ch.externalClass.name} {`);
  ch.externalClass.attrs.forEach((a) => lines.push(`        ${a}`));
  ch.externalClass.methods.forEach((m) => lines.push(`        ${m}`));
  lines.push('    }');

  // Clases Hijas
  ch.children.forEach((child) => {
    lines.push(`    class ${child.name} {`);
    child.attrs.forEach((a) => lines.push(`        ${a}`));
    child.methods.forEach((m) => lines.push(`        ${m}`));
    lines.push('    }');

    // Herencia Padre -> Hija
    lines.push(`    ${ch.parent.name} <|-- ${child.name}`);
  });

  // Relación Interfaz -> Hija 3 (última clase hija)
  const lastChild = ch.children[ch.children.length - 1];
  lines.push(`    ${ch.interfaceSpec.name} <|.. ${lastChild.name} : implements`);

  // Relación Composición Hija 2 -> Clase Externa
  const middleChild = ch.children[1];
  lines.push(`    ${middleChild.name} *-- ${ch.externalClass.name} : tiene`);

  return lines.join('\n');
}
