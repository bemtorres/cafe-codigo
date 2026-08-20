export type UmlClassSpec = {
  name: string;
  attrs: string[];
  methods: string[];
};

export type PooChallenge = {
  id: number;
  slug: string;
  title: string;
  context: string;
  task: string;
  base: UmlClassSpec;
  children: UmlClassSpec[];
};

export const pooCourseLessons: { course: string; title: string; href: string }[] = [
  { course: 'Python', title: '14. Clases y Objetos', href: '/course/python/poo/' },
  { course: 'C++', title: '9. POO básico', href: '/course/cpp/poo-basico/' },
  { course: 'C++', title: '10. Herencia y polimorfismo', href: '/course/cpp/poo-pilares/' },
  { course: 'C#', title: '9. POO Básico', href: '/course/csharp/poo-basico/' },
  { course: 'C#', title: '10. Pilares POO', href: '/course/csharp/poo-pilares/' },
  { course: 'Java', title: '9. POO: Clases, Atributos y Constructores', href: '/course/java/poo-basico/' },
  { course: 'Java', title: '10. Herencia y Polimorfismo', href: '/course/java/herencia-polimorfismo/' },
  { course: 'Java Unit', title: '7. Herencia', href: '/course/javaunit/herencia-test/' },
  { course: 'Kotlin', title: '9. Clases y Objetos', href: '/course/kotlin/clases-y-objetos/' },
  { course: 'Kotlin', title: '10. Interfaces y Polimorfismo', href: '/course/kotlin/interfaces-y-herencia/' },
  { course: 'PHP', title: '4. POO en PHP', href: '/course/php/poo/' },
];

export const pooChallenges: PooChallenge[] = [
  {
    id: 1,
    slug: 'personas-educativo',
    title: 'Personas en un Entorno Educativo',
    context: 'Un campus digital necesita un modelo único de persona, con roles que especializan el acceso.',
    task: 'Implementa la jerarquía. Instancia un estudiante, un docente y un administrativo, y llama al menos un método heredado y uno propio.',
    base: {
      name: 'Persona',
      attrs: ['rut', 'nombre', 'email'],
      methods: ['iniciar_sesion()'],
    },
    children: [
      { name: 'Estudiante', attrs: ['matricula', 'promedio_notas'], methods: ['inscribir_ramo()'] },
      { name: 'Docente', attrs: ['codigo_profesor', 'departamento'], methods: ['subir_nota()'] },
      { name: 'Administrativo', attrs: ['cargo', 'horario_turno'], methods: [] },
    ],
  },
  {
    id: 2,
    slug: 'envios-logistica',
    title: 'Envíos y Logística de Paquetes',
    context: 'Una empresa de courier comparte el ciclo de vida del envío, pero cada modalidad tiene reglas distintas.',
    task: 'Modela la herencia. Crea un arreglo (o lista) de tipo Envio con las tres hijas y recórrelo llamando actualizar_estado().',
    base: {
      name: 'Envio',
      attrs: ['codigo_seguimiento', 'remitente', 'destinatario'],
      methods: ['actualizar_estado()'],
    },
    children: [
      { name: 'EnvioEstandar', attrs: ['dias_habiles_entrega'], methods: [] },
      { name: 'EnvioExpress', attrs: ['garantia_mismo_dia', 'recargo_urgencia'], methods: [] },
      { name: 'EnvioInternacional', attrs: ['pais_destino', 'impuesto_aduanero'], methods: [] },
    ],
  },
  {
    id: 3,
    slug: 'cuentas-usuario',
    title: 'Tipos de Cuentas de Usuario / Roles',
    context: 'El sistema de autenticación comparte credenciales, pero cada rol tiene privilegios distintos.',
    task: 'Implementa las tres cuentas. El administrador debe poder bloquear a un usuario registrado (simúlalo con un método).',
    base: {
      name: 'Usuario',
      attrs: ['username', 'password', 'ultimo_acceso'],
      methods: ['autenticar()'],
    },
    children: [
      { name: 'UsuarioInvitado', attrs: ['tiempo_expiracion_sesion'], methods: [] },
      { name: 'UsuarioRegistrado', attrs: ['historial_actividad', 'avatar_url'], methods: [] },
      { name: 'UsuarioAdministrador', attrs: ['nivel_acceso'], methods: ['bloquear_usuario()'] },
    ],
  },
  {
    id: 4,
    slug: 'bebidas-cafeteria',
    title: 'Bebidas de Cafetería',
    context: 'En la barra todas las bebidas se preparan, pero cada receta tiene insumos y pasos extra.',
    task: 'Sobrescribe preparar() en cada hija (polimorfismo). En Cafe agrega agregar_shot_espresso().',
    base: {
      name: 'Bebida',
      attrs: ['nombre', 'tamano_ml', 'temperatura'],
      methods: ['preparar()'],
    },
    children: [
      { name: 'Cafe', attrs: ['tipo_grano', 'nivel_tueste'], methods: ['agregar_shot_espresso()'] },
      { name: 'Te', attrs: ['variedad_hoja', 'tiempo_infusion'], methods: [] },
      { name: 'JugoNatural', attrs: ['fruta_principal', 'tiene_azucar_anadida'], methods: [] },
    ],
  },
  {
    id: 5,
    slug: 'planes-suscripcion',
    title: 'Planes de Suscripción',
    context: 'Una plataforma de streaming cobra distinto según el plan, pero todos se renuevan.',
    task: 'Implementa renovar() en la base. Cada plan debe imprimir un resumen de beneficios al renovar.',
    base: {
      name: 'Suscripcion',
      attrs: ['id_cliente', 'costo_mensual', 'estado'],
      methods: ['renovar()'],
    },
    children: [
      { name: 'PlanGratuito', attrs: ['limite_anuncios_por_hora'], methods: [] },
      { name: 'PlanIndividual', attrs: ['calidad_streaming_hd'], methods: [] },
      { name: 'PlanFamiliar', attrs: ['max_perfiles_simultaneos', 'control_parental'], methods: [] },
    ],
  },
  {
    id: 6,
    slug: 'herramientas-taller',
    title: 'Herramientas de Taller / Construcción',
    context: 'El inventario del taller comparte nombre y peso, pero el uso cambia si es manual, eléctrica o de medición.',
    task: 'Llama utilizar() de forma polimórfica. Las hijas con métodos extra (aplicar_fuerza, cambiar_velocidad) deben usarlos al menos una vez.',
    base: {
      name: 'Herramienta',
      attrs: ['nombre', 'material', 'peso_gramos'],
      methods: ['utilizar()'],
    },
    children: [
      { name: 'HerramientaManual', attrs: ['tipo_mango'], methods: ['aplicar_fuerza()'] },
      { name: 'HerramientaElectrica', attrs: ['voltaje', 'consumo_watts'], methods: ['cambiar_velocidad()'] },
      { name: 'HerramientaMedicion', attrs: ['unidad_medida', 'margen_error'], methods: [] },
    ],
  },
  {
    id: 7,
    slug: 'animales-zoo',
    title: 'Animales de un Zoológico / Clínica Veterinaria',
    context: 'La ficha clínica es común; la biología (pelo, alas, escamas) especializa el cuidado.',
    task: 'Crea un zoológico (colección de Animal) con un mamífero, un ave y un reptil. Alimenta a todos recorriendo la colección.',
    base: {
      name: 'Animal',
      attrs: ['chip_id', 'especie', 'edad', 'peso'],
      methods: ['alimentar()'],
    },
    children: [
      { name: 'Mamifero', attrs: ['tipo_pelaje', 'periodo_gestacion'], methods: [] },
      { name: 'Ave', attrs: ['envergadura_alas', 'puede_volar'], methods: [] },
      { name: 'Reptil', attrs: ['temperatura_corporal_optima', 'tipo_escama'], methods: [] },
    ],
  },
  {
    id: 8,
    slug: 'canales-soporte',
    title: 'Medios de Comunicación / Canales de Soporte',
    context: 'Todos los tickets se cierran igual, pero el origen del caso cambia los datos que se guardan.',
    task: 'Implementa cerrar_caso() en la base. Instancia un ticket de cada canal y ciérralos.',
    base: {
      name: 'CanalAtencion',
      attrs: ['id_ticket', 'fecha_creacion'],
      methods: ['cerrar_caso()'],
    },
    children: [
      { name: 'TicketWeb', attrs: ['ip_usuario', 'navegador'], methods: [] },
      { name: 'LlamadaTelefonica', attrs: ['numero_origen', 'grabacion_llamada_url'], methods: [] },
      { name: 'ChatBot', attrs: ['intencion_detectada', 'transferido_a_humano'], methods: [] },
    ],
  },
  {
    id: 9,
    slug: 'armas-videojuego',
    title: 'Tipos de Armas en un Videojuego',
    context: 'El combate comparte atacar(), pero cada familia de arma tiene mecánicas extra.',
    task: 'Sobrescribe atacar() en cada hija. Usa bloquear() y recargar() desde el tipo concreto (no solo desde Arma).',
    base: {
      name: 'Arma',
      attrs: ['nombre', 'peso', 'durabilidad'],
      methods: ['atacar()'],
    },
    children: [
      { name: 'ArmaCuerpoACuerpo', attrs: ['filo_ataque'], methods: ['bloquear()'] },
      { name: 'ArmaFuego', attrs: ['calibre', 'capacidad_cargador'], methods: ['recargar()'] },
      { name: 'ArmaMagica', attrs: ['costo_mana', 'tipo_elemento'], methods: [] },
    ],
  },
  {
    id: 10,
    slug: 'sensores-iot',
    title: 'Sensores IoT',
    context: 'Una red de sensores comparte identidad y batería; cada tipo lee un fenómeno distinto.',
    task: 'Implementa leer_dato() (puedes devolver un número simulado). El de movimiento y el de humo deben usar sus métodos de alerta.',
    base: {
      name: 'Sensor',
      attrs: ['id_dispositivo', 'ubicacion', 'bateria_porcentaje'],
      methods: ['leer_dato()'],
    },
    children: [
      { name: 'SensorTemperatura', attrs: ['escala_celsius', 'rango_maximo'], methods: [] },
      { name: 'SensorMovimiento', attrs: ['rango_vision_metros'], methods: ['detectar_presencia()'] },
      { name: 'SensorHumo', attrs: ['umbral_alarma_ppm'], methods: ['activar_sirena()'] },
    ],
  },
  {
    id: 11,
    slug: 'menu-restaurante',
    title: 'Elementos de Menú en un Restaurante',
    context: 'La carta marca disponibilidad de la misma forma; entrada, fondo y postre aportan datos de servicio.',
    task: 'Crea un menú del día con un plato de cada tipo y marca todos como disponibles.',
    base: {
      name: 'Plato',
      attrs: ['nombre', 'precio', 'tiempo_coccion_min'],
      methods: ['marcar_disponible()'],
    },
    children: [
      { name: 'Entrada', attrs: ['es_fria', 'para_compartir'], methods: [] },
      { name: 'PlatoFondo', attrs: ['guarnicion_incluida', 'punto_coccion'], methods: [] },
      { name: 'Postre', attrs: ['calorias', 'es_sin_azucar'], methods: [] },
    ],
  },
  {
    id: 12,
    slug: 'vehiculos-emergencia',
    title: 'Vehículos de Emergencia',
    context: 'Patrullas, ambulancias y carros bomba salen de una misma flota operativa.',
    task: 'Enciende la sirena de los tres vehículos desde una lista de VehiculoEmergencia (polimorfismo).',
    base: {
      name: 'VehiculoEmergencia',
      attrs: ['patente', 'base_operativa'],
      methods: ['encender_sirena()'],
    },
    children: [
      { name: 'Ambulancia', attrs: ['equipamiento_uci', 'personal_medico_a_bordo'], methods: [] },
      { name: 'CarroBomba', attrs: ['capacidad_estanque_agua', 'largo_escala'], methods: [] },
      { name: 'PatrullaPolicial', attrs: ['camara_abordo', 'blindaje_nivel'], methods: [] },
    ],
  },
  {
    id: 13,
    slug: 'tareas-proyectos',
    title: 'Tareas en un Gestor de Proyectos',
    context: 'Un tablero Kanban trata todo como Tarea, pero bugs, features y mantenimiento no se estiman igual.',
    task: 'Completa una tarea de cada tipo. Imprime título, estado y el dato específico de la hija.',
    base: {
      name: 'Tarea',
      attrs: ['titulo', 'fecha_limite', 'estado'],
      methods: ['completar()'],
    },
    children: [
      { name: 'BugReport', attrs: ['severidad', 'pasos_para_reproducir'], methods: [] },
      { name: 'NuevaCaracteristica', attrs: ['criterios_aceptacion', 'puntos_historia'], methods: [] },
      { name: 'TareaMantenimiento', attrs: ['sistema_afectado', 'ventana_horaria'], methods: [] },
    ],
  },
  {
    id: 14,
    slug: 'documentos-comerciales',
    title: 'Documentos Legales y Comerciales',
    context: 'Factura, boleta y guía de despacho comparten folio y emisor, con campos tributarios distintos.',
    task: 'Emite un documento de cada tipo y luego anula la factura (el método vive en la clase base).',
    base: {
      name: 'DocumentoComercial',
      attrs: ['numero_folio', 'fecha_emision', 'rut_emisor'],
      methods: ['anular()'],
    },
    children: [
      { name: 'Factura', attrs: ['monto_neto', 'iva', 'rut_receptor'], methods: [] },
      { name: 'Boleta', attrs: ['monto_total_bruto'], methods: [] },
      { name: 'GuiaDespacho', attrs: ['direccion_entrega', 'patente_transportista'], methods: [] },
    ],
  },
  {
    id: 15,
    slug: 'examenes-medicos',
    title: 'Tipos de Exámenes Médicos',
    context: 'El laboratorio genera informes con el mismo flujo; cada examen tiene preparación y parámetros propios.',
    task: 'Genera el informe de los tres exámenes. En sangre y resonancia considera los flags de ayuno/contraste en el texto del informe.',
    base: {
      name: 'ExamenMedico',
      attrs: ['codigo_fonasa', 'paciente_rut', 'fecha_toma'],
      methods: ['generar_informe()'],
    },
    children: [
      { name: 'ExamenSangre', attrs: ['requiere_ayuno_horas', 'tubos_muestra'], methods: [] },
      { name: 'Radiografia', attrs: ['zona_cuerpo', 'dosis_radiacion'], methods: [] },
      { name: 'ResonanciaMagnetica', attrs: ['duracion_minutos', 'requiere_contraste'], methods: [] },
    ],
  },
  {
    id: 16,
    slug: 'piezas-tablero',
    title: 'Entidades de Tablero en Juegos de Mesa',
    context: 'Las piezas se mueven en una grilla; peón, caballo y dama no se mueven igual.',
    task: 'Implementa mover() (puede ser un print de la nueva posición). El peón debe poder promoverse.',
    base: {
      name: 'PiezaJuego',
      attrs: ['color', 'posicion_fila', 'posicion_columna'],
      methods: ['mover()'],
    },
    children: [
      { name: 'PeonAjedrez', attrs: ['es_primer_movimiento'], methods: ['promover()'] },
      { name: 'CaballoAjedrez', attrs: ['puede_saltar'], methods: [] },
      { name: 'FichaDamas', attrs: ['es_reina'], methods: [] },
    ],
  },
  {
    id: 17,
    slug: 'publicaciones-redes',
    title: 'Publicaciones en Redes Sociales',
    context: 'Todo post recibe likes; el contenido puede ser texto, video o una historia que expira.',
    task: 'Da like a cada publicación. En la historia llama verificar_expiracion() con una fecha/hora simulada.',
    base: {
      name: 'Publicacion',
      attrs: ['id_post', 'autor', 'fecha_hora', 'contador_likes'],
      methods: ['dar_like()'],
    },
    children: [
      { name: 'PostTexto', attrs: ['contenido_caracteres'], methods: [] },
      { name: 'PostVideo', attrs: ['resolucion_video', 'duracion_segundos'], methods: [] },
      { name: 'HistoriaTemporal', attrs: ['duracion_horas_activa'], methods: ['verificar_expiracion()'] },
    ],
  },
  {
    id: 18,
    slug: 'habitaciones-hotel',
    title: 'Habitaciones de un Hotel',
    context: 'El PMS reserva cualquier habitación igual; el tipo cambia camas, vista y amenities.',
    task: 'Reserva las tres habitaciones. Imprime precio_noche y el detalle extra de cada hija.',
    base: {
      name: 'Habitacion',
      attrs: ['numero_habitacion', 'precio_noche', 'estado_limpieza'],
      methods: ['reservar()'],
    },
    children: [
      { name: 'HabitacionSimple', attrs: ['tamano_cama'], methods: [] },
      { name: 'HabitacionDoble', attrs: ['cantidad_camas', 'tiene_vista_al_mar'], methods: [] },
      { name: 'SuitePresidencial', attrs: ['incluye_jacuzzi', 'servicio_habitacion_24h'], methods: [] },
    ],
  },
  {
    id: 19,
    slug: 'motores-bd',
    title: 'Trabajos / Conexiones en Base de Datos',
    context: 'Los drivers hablan distinto, pero conectar y ejecutar consulta es el contrato común.',
    task: 'Implementa conectar() y ejecutar_consulta() en la base (pueden ser prints). Instancia MySQL, PostgreSQL y MongoDB.',
    base: {
      name: 'MotorBaseDatos',
      attrs: ['host', 'puerto', 'usuario'],
      methods: ['conectar()', 'ejecutar_consulta()'],
    },
    children: [
      { name: 'ConexionMySQL', attrs: ['charset', 'autocommit'], methods: [] },
      { name: 'ConexionPostgreSQL', attrs: ['schema_default', 'ssl_mode'], methods: [] },
      { name: 'ConexionMongoDB', attrs: ['nombre_cluster', 'write_concern'], methods: [] },
    ],
  },
  {
    id: 20,
    slug: 'plantas-vegetacion',
    title: 'Plantas y Vegetación',
    context: 'El invernadero riega todas las plantas; cactus, frutales e interiores piden cuidados distintos.',
    task: 'Riega las tres plantas. Ajusta el mensaje de regar() según el tipo (por ejemplo, el cactus avisa la frecuencia).',
    base: {
      name: 'Planta',
      attrs: ['nombre_cientifico', 'altura_cm', 'nivel_humedad'],
      methods: ['regar()'],
    },
    children: [
      { name: 'Cactus', attrs: ['frecuencia_riego_dias', 'tiene_espinas'], methods: [] },
      { name: 'ArbolFrutal', attrs: ['estacion_cosecha', 'kilos_produccion'], methods: [] },
      { name: 'PlantaInterior', attrs: ['requiere_luz_directa', 'toxicidad_mascotas'], methods: [] },
    ],
  },
];

export function toMermaid(challenge: PooChallenge): string {
  const block = (cls: UmlClassSpec) => {
    const lines = [...cls.attrs.map((a) => `    +${a}`), ...cls.methods.map((m) => `    +${m}`)];
    return `  class ${cls.name} {\n${lines.join('\n')}\n  }`;
  };
  return [
    'classDiagram',
    `  direction TB`,
    block(challenge.base),
    ...challenge.children.map(block),
    ...challenge.children.map((child) => `  ${challenge.base.name} <|-- ${child.name}`),
  ].join('\n');
}
