export interface DbField {
  name: string;
  type: string;
  pk?: boolean;
  fk?: string;
  unique?: boolean;
  notNull?: boolean;
  defaultValue?: string;
  desc: string;
}

export interface DbTable {
  name: string;
  desc: string;
  fields: DbField[];
}

export interface DbChallenge {
  id: number;
  slug: string;
  block: 1 | 2 | 3 | 4;
  blockTitle: string;
  title: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  badgeColor: string;
  context: string;
  statement: string;
  tables: DbTable[];
  ddlSql: string;
  seedSql: string;
  queriesToSolve: {
    question: string;
    hint: string;
    solutionSql: string;
  }[];
  checkList: string[];
}

export const databaseChallenges: DbChallenge[] = [
  // ==========================================
  // BLOQUE 1: TABLAS SIMPLES (1 a 10)
  // ==========================================
  {
    id: 1,
    slug: 'db-01-empleados',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Gestión de Empleados y Salarios',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Una empresa requiere registrar a su personal para el cálculo de nómina y control de departamentos.',
    statement: 'Crear la tabla `empleados` con llave primaria autoincremental, restricciones NOT NULL, CHECK para salarios positivos y valor por defecto en fecha_ingreso. Luego insertar datos y consultar salarios mayores al promedio.',
    tables: [
      {
        name: 'empleados',
        desc: 'Registro del personal activo de la organización.',
        fields: [
          { name: 'id_empleado', type: 'INT', pk: true, notNull: true, desc: 'Identificador único autoincremental' },
          { name: 'rut', type: 'VARCHAR(12)', unique: true, notNull: true, desc: 'Documento nacional de identidad' },
          { name: 'nombre_completo', type: 'VARCHAR(100)', notNull: true, desc: 'Nombre y apellidos' },
          { name: 'cargo', type: 'VARCHAR(50)', notNull: true, desc: 'Puesto que desempeña' },
          { name: 'salario', type: 'DECIMAL(10,2)', notNull: true, desc: 'Sueldo base mensual (CHECK salario > 0)' },
          { name: 'fecha_ingreso', type: 'DATE', defaultValue: 'CURRENT_DATE', desc: 'Fecha de contratación' },
          { name: 'activo', type: 'BOOLEAN', defaultValue: 'TRUE', desc: 'Estado del contrato laboral' }
        ]
      }
    ],
    ddlSql: `-- 1. Crear tabla de Empleados
CREATE TABLE empleados (
    id_empleado SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL CHECK (salario > 0),
    fecha_ingreso DATE DEFAULT CURRENT_DATE,
    activo BOOLEAN DEFAULT TRUE
);`,
    seedSql: `INSERT INTO empleados (rut, nombre_completo, cargo, salario, fecha_ingreso) VALUES
('11.111.111-1', 'Ana Martínez', 'Desarrolladora Senior', 2200000.00, '2022-03-15'),
('22.222.222-2', 'Carlos Soto', 'Diseñador UI/UX', 1400000.00, '2023-01-10'),
('33.333.333-3', 'Lucía Vega', 'Analista QA', 1350000.00, '2023-06-01'),
('44.444.444-4', 'Martín Silva', 'DevOps Engineer', 2500000.00, '2021-11-20'),
('55.555.555-5', 'Sofía Gómez', 'Product Owner', 2100000.00, '2022-08-01');`,
    queriesToSolve: [
      {
        question: 'Obtener los empleados activos con salario superior a 1.500.000 ordenados descendentemente.',
        hint: 'Usa WHERE con activo = TRUE y salario > 1500000, más ORDER BY salario DESC.',
        solutionSql: `SELECT id_empleado, nombre_completo, cargo, salario 
FROM empleados 
WHERE activo = TRUE AND salario > 1500000.00
ORDER BY salario DESC;`
      },
      {
        question: 'Calcular el salario promedio, salario máximo y total de empleados en la empresa.',
        hint: 'Usa funciones de agregación AVG(), MAX() y COUNT().',
        solutionSql: `SELECT 
    COUNT(*) AS total_empleados,
    ROUND(AVG(salario), 2) AS salario_promedio,
    MAX(salario) AS salario_maximo
FROM empleados;`
      }
    ],
    checkList: [
      'Definí la llave primaria (PRIMARY KEY)',
      'Agregué la restricción CHECK para validar que el salario sea positivo',
      'Configuré el valor DEFAULT para la fecha de ingreso y activo',
      'Ejecuté la inserción de datos de prueba',
      'Escribí las consultas de filtrado y funciones de agregación'
    ]
  },
  {
    id: 2,
    slug: 'db-02-productos',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Catálogo de Productos y Control de Stock',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Un minimarket requiere controlar el inventario de sus artículos en venta, precios unitarios y alertas de stock mínimo.',
    statement: 'Crear la tabla `productos` con código SKU único, precio de venta, costo, stock y stock mínimo de alerta.',
    tables: [
      {
        name: 'productos',
        desc: 'Inventario de artículos y productos disponibles para la venta.',
        fields: [
          { name: 'id_producto', type: 'INT', pk: true, notNull: true, desc: 'Identificador único' },
          { name: 'sku', type: 'VARCHAR(20)', unique: true, notNull: true, desc: 'Código de barra o inventario' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre comercial del producto' },
          { name: 'precio_unitario', type: 'DECIMAL(8,2)', notNull: true, desc: 'Precio al consumidor' },
          { name: 'costo', type: 'DECIMAL(8,2)', notNull: true, desc: 'Costo de adquisición' },
          { name: 'stock_actual', type: 'INT', defaultValue: '0', desc: 'Cantidad física disponible' },
          { name: 'stock_minimo', type: 'INT', defaultValue: '5', desc: 'Umbral para reposición' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    sku VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    precio_unitario DECIMAL(8,2) NOT NULL CHECK (precio_unitario >= 0),
    costo DECIMAL(8,2) NOT NULL CHECK (costo >= 0),
    stock_actual INT DEFAULT 0 CHECK (stock_actual >= 0),
    stock_minimo INT DEFAULT 5 CHECK (stock_minimo >= 0)
);`,
    seedSql: `INSERT INTO productos (sku, nombre, precio_unitario, costo, stock_actual, stock_minimo) VALUES
('BEB-001', 'Café Espresso Grano 500g', 8990.00, 4500.00, 15, 5),
('BEB-002', 'Té Matcha Japonés 100g', 12990.00, 6800.00, 3, 5),
('PAN-001', 'Croissant de Mantequilla', 1800.00, 600.00, 24, 10),
('DUL-001', 'Tarta de Frambuesa', 3500.00, 1200.00, 2, 4),
('SNK-001', 'Barra de Cereal y Avena', 990.00, 350.00, 50, 15);`,
    queriesToSolve: [
      {
        question: 'Identificar productos que necesitan reposición urgente (stock_actual <= stock_minimo).',
        hint: 'Filtra donde stock_actual sea menor o igual a stock_minimo.',
        solutionSql: `SELECT sku, nombre, stock_actual, stock_minimo,
       (stock_minimo - stock_actual) AS unidades_a_pedir
FROM productos
WHERE stock_actual <= stock_minimo;`
      },
      {
        question: 'Calcular el margen de ganancia en dinero y porcentaje de cada producto.',
        hint: 'Resta precio_unitario - costo y divide por el costo.',
        solutionSql: `SELECT nombre, precio_unitario, costo,
       (precio_unitario - costo) AS ganancia_neta,
       ROUND(((precio_unitario - costo) / costo) * 100, 1) AS porcentaje_margen
FROM productos
ORDER BY ganancia_neta DESC;`
      }
    ],
    checkList: [
      'Creé la tabla con columnas SKU única y tipos decimales precisos',
      'Configuré validaciones CHECK contra números negativos',
      'Poblé registros de prueba realistas',
      'Consulté productos con quiebre de stock usando expresiones matemáticas'
    ]
  },
  {
    id: 3,
    slug: 'db-03-pacientes',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Fichas Clínicas de Pacientes',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Un centro médico necesita almacenar los antecedentes clínicos de pacientes, grupos sanguíneos y contactos de emergencia.',
    statement: 'Crear la tabla `pacientes` con validaciones de tipo de sangre (A+, A-, B+, B-, AB+, AB-, O+, O-), email opcional único y fecha de nacimiento.',
    tables: [
      {
        name: 'pacientes',
        desc: 'Ficha personal y médica básica del paciente.',
        fields: [
          { name: 'id_paciente', type: 'INT', pk: true, notNull: true, desc: 'Identificador del paciente' },
          { name: 'rut', type: 'VARCHAR(12)', unique: true, notNull: true, desc: 'RUT o DNI único' },
          { name: 'nombres', type: 'VARCHAR(60)', notNull: true, desc: 'Nombres de pila' },
          { name: 'apellidos', type: 'VARCHAR(60)', notNull: true, desc: 'Apellidos completos' },
          { name: 'fecha_nacimiento', type: 'DATE', notNull: true, desc: 'Fecha de natalicio' },
          { name: 'grupo_sanguineo', type: 'VARCHAR(3)', notNull: true, desc: 'Grupo y factor Rh' },
          { name: 'telefono_emergencia', type: 'VARCHAR(15)', notNull: true, desc: 'Contacto de urgencia' },
          { name: 'alergias', type: 'TEXT', desc: 'Listado de alergias conocidas o NINGUNA' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE pacientes (
    id_paciente SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombres VARCHAR(60) NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    grupo_sanguineo VARCHAR(3) NOT NULL CHECK (grupo_sanguineo IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    telefono_emergencia VARCHAR(15) NOT NULL,
    alergias TEXT DEFAULT 'Ninguna'
);`,
    seedSql: `INSERT INTO pacientes (rut, nombres, apellidos, fecha_nacimiento, grupo_sanguineo, telefono_emergencia, alergias) VALUES
('18.234.567-8', 'Mateo', 'Rojas Castro', '1995-04-12', 'O+', '+56911223344', 'Penicilina'),
('14.876.543-2', 'Valentina', 'Pérez Morales', '1982-11-25', 'A+', '+56988776655', 'Ninguna'),
('20.456.789-0', 'Gabriel', 'Navarro Silva', '2001-07-03', 'B-', '+56955443322', 'Aspirina, Polen'),
('12.345.678-9', 'Camila', 'Torres Lara', '1975-09-18', 'O-', '+56966778899', 'Ninguna');`,
    queriesToSolve: [
      {
        question: 'Obtener pacientes donantes universales (grupo O-) o con alergias registradas.',
        hint: 'Usa WHERE grupo_sanguineo = "O-" OR alergias <> "Ninguna".',
        solutionSql: `SELECT id_paciente, nombres, apellidos, grupo_sanguineo, alergias
FROM pacientes
WHERE grupo_sanguineo = 'O-' OR (alergias IS NOT NULL AND alergias <> 'Ninguna');`
      }
    ],
    checkList: [
      'Implementé la cláusula CHECK con operador IN para grupos sanguíneos',
      'Configuré el tipo TEXT con DEFAULT para notas clínicas',
      'Probé consultas con operadores lógicos AND / OR'
    ]
  },
  {
    id: 4,
    slug: 'db-04-biblioteca-libros',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Inventario de Libros en Biblioteca',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Una biblioteca comunitaria gestiona su catálogo bibliográfico clasificando libros por ISBN, año de edición y número de páginas.',
    statement: 'Diseñar la tabla `libros` asegurando ISBN único de 13 caracteres, año de publicación coherente y páginas > 0.',
    tables: [
      {
        name: 'libros',
        desc: 'Registro bibliográfico de títulos disponibles en estantería.',
        fields: [
          { name: 'id_libro', type: 'INT', pk: true, notNull: true, desc: 'Identificador interno' },
          { name: 'isbn', type: 'VARCHAR(13)', unique: true, notNull: true, desc: 'Código ISBN estándar de 13 dígitos' },
          { name: 'titulo', type: 'VARCHAR(150)', notNull: true, desc: 'Título de la obra' },
          { name: 'autor_principal', type: 'VARCHAR(100)', notNull: true, desc: 'Nombre del autor' },
          { name: 'anio_publicacion', type: 'INT', notNull: true, desc: 'Año de edición' },
          { name: 'num_paginas', type: 'INT', notNull: true, desc: 'Páginas impresas' },
          { name: 'disponible', type: 'BOOLEAN', defaultValue: 'TRUE', desc: 'Indica si no está prestado' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE libros (
    id_libro SERIAL PRIMARY KEY,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    autor_principal VARCHAR(100) NOT NULL,
    anio_publicacion INT NOT NULL CHECK (anio_publicacion BETWEEN 1450 AND 2030),
    num_paginas INT NOT NULL CHECK (num_paginas > 0),
    disponible BOOLEAN DEFAULT TRUE
);`,
    seedSql: `INSERT INTO libros (isbn, titulo, autor_principal, anio_publicacion, num_paginas, disponible) VALUES
('9780132350884', 'Clean Code', 'Robert C. Martin', 2008, 464, TRUE),
('9780201616224', 'The Pragmatic Programmer', 'Andrew Hunt', 1999, 352, FALSE),
('9780134494166', 'Clean Architecture', 'Robert C. Martin', 2017, 432, TRUE),
('9780596517748', 'JavaScript: The Good Parts', 'Douglas Crockford', 2008, 172, TRUE),
('9780321125217', 'Domain-Driven Design', 'Eric Evans', 2003, 560, FALSE);`,
    queriesToSolve: [
      {
        question: 'Buscar libros disponibles publicados a partir del año 2005 con más de 300 páginas.',
        hint: 'Usa WHERE con disponible = TRUE AND anio_publicacion >= 2005 AND num_paginas > 300.',
        solutionSql: `SELECT isbn, titulo, autor_principal, anio_publicacion, num_paginas
FROM libros
WHERE disponible = TRUE 
  AND anio_publicacion >= 2005 
  AND num_paginas > 300
ORDER BY anio_publicacion DESC;`
      }
    ],
    checkList: [
      'Creé la restricción CHECK con rango BETWEEN para años',
      'Garantice unicidad de ISBN',
      'Realicé consultas combinando múltiples filtros booleanos y numéricos'
    ]
  },
  {
    id: 5,
    slug: 'db-05-transacciones',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Bitácora de Transacciones Financieras',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Una fintech registra los movimientos de dinero de sus billeteras virtuales clasificando ingresos, transferencias y retiros.',
    statement: 'Crear la tabla `transacciones` con tipo de movimiento validado por CHECK (INGRESO, RETIRO, TRANSFERENCIA, PAGO) y marca temporal TIMESTAMP.',
    tables: [
      {
        name: 'transacciones',
        desc: 'Log inmutable de movimientos financieros.',
        fields: [
          { name: 'id_transaccion', type: 'BIGINT', pk: true, notNull: true, desc: 'Identificador numérico largo' },
          { name: 'id_cuenta', type: 'INT', notNull: true, desc: 'Cuenta de origen' },
          { name: 'tipo_operacion', type: 'VARCHAR(20)', notNull: true, desc: 'Tipo de flujo' },
          { name: 'monto', type: 'DECIMAL(12,2)', notNull: true, desc: 'Monto de la transacción' },
          { name: 'fecha_hora', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP', desc: 'Timestamp exacto' },
          { name: 'estado', type: 'VARCHAR(15)', defaultValue: "'EXITOSA'", desc: 'EXITOSA, RECHAZADA, PENDIENTE' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE transacciones (
    id_transaccion BIGSERIAL PRIMARY KEY,
    id_cuenta INT NOT NULL,
    tipo_operacion VARCHAR(20) NOT NULL CHECK (tipo_operacion IN ('INGRESO', 'RETIRO', 'TRANSFERENCIA', 'PAGO')),
    monto DECIMAL(12,2) NOT NULL CHECK (monto > 0),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(15) DEFAULT 'EXITOSA' CHECK (estado IN ('EXITOSA', 'RECHAZADA', 'PENDIENTE'))
);`,
    seedSql: `INSERT INTO transacciones (id_cuenta, tipo_operacion, monto, estado) VALUES
(1001, 'INGRESO', 500000.00, 'EXITOSA'),
(1001, 'PAGO', 45990.00, 'EXITOSA'),
(1002, 'RETIRO', 100000.00, 'EXITOSA'),
(1001, 'TRANSFERENCIA', 250000.00, 'EXITOSA'),
(1003, 'RETIRO', 800000.00, 'RECHAZADA'),
(1002, 'INGRESO', 150000.00, 'EXITOSA');`,
    queriesToSolve: [
      {
        question: 'Calcular el monto total operado y la cantidad de transacciones por cada tipo de operación exitosa.',
        hint: 'Usa GROUP BY tipo_operacion con SUM(monto) y COUNT(*).',
        solutionSql: `SELECT tipo_operacion,
       COUNT(*) AS total_operaciones,
       SUM(monto) AS volumen_total
FROM transacciones
WHERE estado = 'EXITOSA'
GROUP BY tipo_operacion
ORDER BY volumen_total DESC;`
      }
    ],
    checkList: [
      'Utilicé BIGSERIAL y TIMESTAMP para logs de alta volumetría',
      'Configuré CHECK de estados y montos estrictamente positivos',
      'Agrupé métricas usando GROUP BY y SUM'
    ]
  },
  {
    id: 6,
    slug: 'db-06-vehiculos',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Parque Automotriz y Vehículos',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Una rent-a-car requiere un registro único de su flota de autos, kilometraje, tipo de combustible y estado de mantención.',
    statement: 'Crear la tabla `vehiculos` con placa patente única, año de fabricación y kilometraje inicial.',
    tables: [
      {
        name: 'vehiculos',
        desc: 'Flota automotriz para arriendo.',
        fields: [
          { name: 'id_vehiculo', type: 'INT', pk: true, notNull: true, desc: 'ID autoincremental' },
          { name: 'patente', type: 'VARCHAR(8)', unique: true, notNull: true, desc: 'Patente / Matrícula' },
          { name: 'marca', type: 'VARCHAR(40)', notNull: true, desc: 'Fabricante' },
          { name: 'modelo', type: 'VARCHAR(40)', notNull: true, desc: 'Modelo comercial' },
          { name: 'anio', type: 'INT', notNull: true, desc: 'Año de fabricación' },
          { name: 'kilometraje', type: 'INT', defaultValue: '0', desc: 'Odómetro en KM' },
          { name: 'combustible', type: 'VARCHAR(15)', notNull: true, desc: 'Bencina, Diesel, Híbrido, Eléctrico' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE vehiculos (
    id_vehiculo SERIAL PRIMARY KEY,
    patente VARCHAR(8) UNIQUE NOT NULL,
    marca VARCHAR(40) NOT NULL,
    modelo VARCHAR(40) NOT NULL,
    anio INT NOT NULL CHECK (anio >= 2000),
    kilometraje INT DEFAULT 0 CHECK (kilometraje >= 0),
    combustible VARCHAR(15) NOT NULL CHECK (combustible IN ('Bencina', 'Diesel', 'Híbrido', 'Eléctrico'))
);`,
    seedSql: `INSERT INTO vehiculos (patente, marca, modelo, anio, kilometraje, combustible) VALUES
('BBCL-12', 'Toyota', 'RAV4', 2022, 34500, 'Híbrido'),
('HGTY-89', 'Hyundai', 'Tucson', 2021, 62000, 'Diesel'),
('KLLP-45', 'Tesla', 'Model 3', 2023, 12000, 'Eléctrico'),
('RRTW-33', 'Chevrolet', 'Sail', 2020, 89000, 'Bencina'),
('PPXZ-77', 'Toyota', 'Corolla', 2023, 18000, 'Híbrido');`,
    queriesToSolve: [
      {
        question: 'Listar los vehículos ecológicos (Híbrido o Eléctrico) con menos de 40.000 KM.',
        hint: 'Usa WHERE combustible IN ("Híbrido", "Eléctrico") AND kilometraje < 40000.',
        solutionSql: `SELECT patente, marca, modelo, anio, kilometraje, combustible
FROM vehiculos
WHERE combustible IN ('Híbrido', 'Eléctrico') AND kilometraje < 40000
ORDER BY kilometraje ASC;`
      }
    ],
    checkList: [
      'Creé la tabla con clave única para la patente',
      'Añadí restricciones para años y kilometraje no negativo',
      'Filtré por listas de valores con el operador IN'
    ]
  },
  {
    id: 7,
    slug: 'db-07-estudiantes',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Matrícula de Estudiantes Universitarios',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Una facultad universitaria almacena los datos de sus alumnos, correos institucionales, carrera asignada y promedio general acumulado (PGA).',
    statement: 'Crear la tabla `estudiantes` con validación de PGA entre 1.0 y 7.0 y email institucional único.',
    tables: [
      {
        name: 'estudiantes',
        desc: 'Ficha del estudiante matriculado.',
        fields: [
          { name: 'id_estudiante', type: 'INT', pk: true, notNull: true, desc: 'Número de matrícula' },
          { name: 'rut', type: 'VARCHAR(12)', unique: true, notNull: true, desc: 'Identificador nacional' },
          { name: 'nombre_completo', type: 'VARCHAR(100)', notNull: true, desc: 'Nombres y apellidos' },
          { name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true, desc: 'Correo universitario' },
          { name: 'carrera', type: 'VARCHAR(80)', notNull: true, desc: 'Plan de estudios' },
          { name: 'pga', type: 'DECIMAL(3,2)', notNull: true, desc: 'Promedio general acumulado (1.00 a 7.00)' },
          { name: 'semestre_actual', type: 'INT', defaultValue: '1', desc: 'Semestre en curso' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    carrera VARCHAR(80) NOT NULL,
    pga DECIMAL(3,2) NOT NULL CHECK (pga BETWEEN 1.00 AND 7.00),
    semestre_actual INT DEFAULT 1 CHECK (semestre_actual BETWEEN 1 AND 12)
);`,
    seedSql: `INSERT INTO estudiantes (rut, nombre_completo, email, carrera, pga, semestre_actual) VALUES
('19.987.654-3', 'Felipe Morales', 'felipe.morales@universidad.cl', 'Ingeniería en Informática', 6.25, 6),
('20.123.456-7', 'Daniela Rivas', 'daniela.rivas@universidad.cl', 'Ingeniería en Informática', 6.70, 8),
('18.654.321-9', 'Gonzalo Bravo', 'gonzalo.bravo@universidad.cl', 'Ingeniería Civil Industrial', 5.40, 4),
('21.345.678-1', 'Isidora Castro', 'isidora.castro@universidad.cl', 'Medicina', 6.55, 2),
('19.234.567-8', 'Tomás Vergara', 'tomas.vergara@universidad.cl', 'Ingeniería en Informática', 4.80, 5);`,
    queriesToSolve: [
      {
        question: 'Calcular el promedio de notas (PGA) y cantidad de estudiantes en la carrera "Ingeniería en Informática".',
        hint: 'Usa WHERE carrera = "Ingeniería en Informática" junto a AVG(pga) y COUNT(*).',
        solutionSql: `SELECT carrera,
       COUNT(*) AS total_alumnos,
       ROUND(AVG(pga), 2) AS promedio_carrera,
       MAX(pga) AS mejor_nota
FROM estudiantes
WHERE carrera = 'Ingeniería en Informática'
GROUP BY carrera;`
      }
    ],
    checkList: [
      'Configuré el tipo DECIMAL(3,2) con CHECK BETWEEN',
      'Establecí restricciones UNIQUE en RUT y Correo Electrónico',
      'Calculé estadísticas académicas con funciones de agregación'
    ]
  },
  {
    id: 8,
    slug: 'db-08-iot-sensores',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Historial de Sensores IoT Climáticos',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Un invernadero inteligente captura lecturas periódicas de temperatura ambiente, porcentaje de humedad y luminosidad.',
    statement: 'Crear la tabla `lecturas_iot` con rangos de temperatura válidos (-20°C a 60°C) y humedad relativa de 0% a 100%.',
    tables: [
      {
        name: 'lecturas_iot',
        desc: 'Lecturas de telemetría de sensores.',
        fields: [
          { name: 'id_lectura', type: 'BIGINT', pk: true, notNull: true, desc: 'ID correlativo' },
          { name: 'codigo_sensor', type: 'VARCHAR(20)', notNull: true, desc: 'Identificador del hardware' },
          { name: 'temperatura_celsius', type: 'DECIMAL(4,2)', notNull: true, desc: 'Temperatura registrada' },
          { name: 'humedad_relativa', type: 'DECIMAL(5,2)', notNull: true, desc: 'Humedad en %' },
          { name: 'luminosidad_lux', type: 'INT', notNull: true, desc: 'Nivel de luz' },
          { name: 'fecha_registro', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP', desc: 'Fecha y hora' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE lecturas_iot (
    id_lectura BIGSERIAL PRIMARY KEY,
    codigo_sensor VARCHAR(20) NOT NULL,
    temperatura_celsius DECIMAL(4,2) NOT NULL CHECK (temperatura_celsius BETWEEN -20.00 AND 60.00),
    humedad_relativa DECIMAL(5,2) NOT NULL CHECK (humedad_relativa BETWEEN 0.00 AND 100.00),
    luminosidad_lux INT NOT NULL CHECK (luminosidad_lux >= 0),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    seedSql: `INSERT INTO lecturas_iot (codigo_sensor, temperatura_celsius, humedad_relativa, luminosidad_lux) VALUES
('SENSOR-NORTE', 24.50, 65.00, 1200),
('SENSOR-NORTE', 26.10, 61.20, 1450),
('SENSOR-SUR', 19.80, 78.40, 950),
('SENSOR-SUR', 21.00, 74.00, 1100),
('SENSOR-ESTE', 28.30, 48.00, 2100);`,
    queriesToSolve: [
      {
        question: 'Obtener la temperatura máxima, mínima y humedad promedio registrada por cada sensor.',
        hint: 'Agrupa por codigo_sensor calculando MAX, MIN y AVG.',
        solutionSql: `SELECT codigo_sensor,
       COUNT(*) AS total_mediciones,
       MIN(temperatura_celsius) AS temp_minima,
       MAX(temperatura_celsius) AS temp_maxima,
       ROUND(AVG(humedad_relativa), 2) AS humedad_promedio
FROM lecturas_iot
GROUP BY codigo_sensor;`
      }
    ],
    checkList: [
      'Diseñé la tabla de telemetría con BIGSERIAL',
      'Restringí la humedad y temperatura a límites físicos reales',
      'Agrupé telemetría por hardware con GROUP BY'
    ]
  },
  {
    id: 9,
    slug: 'db-09-habitaciones',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Disponibilidad de Habitaciones de Hotel',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Un hotel boutique administra sus habitaciones, categorizadas por tipo (Simple, Doble, Suite, Presidencial) y tarifa por noche.',
    statement: 'Crear la tabla `habitaciones` con número de habitación único, piso positivo, tipo validado y precio base.',
    tables: [
      {
        name: 'habitaciones',
        desc: 'Habitaciones disponibles del hotel.',
        fields: [
          { name: 'id_habitacion', type: 'INT', pk: true, notNull: true, desc: 'ID clave' },
          { name: 'numero_habitacion', type: 'VARCHAR(10)', unique: true, notNull: true, desc: 'Número visible (ej. 101, 204)' },
          { name: 'piso', type: 'INT', notNull: true, desc: 'Piso del edificio' },
          { name: 'tipo', type: 'VARCHAR(20)', notNull: true, desc: 'Simple, Doble, Suite, Presidencial' },
          { name: 'tarifa_noche', type: 'DECIMAL(9,2)', notNull: true, desc: 'Precio en USD o CLP' },
          { name: 'estado', type: 'VARCHAR(15)', defaultValue: "'DISPONIBLE'", desc: 'DISPONIBLE, OCUPADA, MANTENCION' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE habitaciones (
    id_habitacion SERIAL PRIMARY KEY,
    numero_habitacion VARCHAR(10) UNIQUE NOT NULL,
    piso INT NOT NULL CHECK (piso >= 1),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('Simple', 'Doble', 'Suite', 'Presidencial')),
    tarifa_noche DECIMAL(9,2) NOT NULL CHECK (tarifa_noche > 0),
    estado VARCHAR(15) DEFAULT 'DISPONIBLE' CHECK (estado IN ('DISPONIBLE', 'OCUPADA', 'MANTENCION'))
);`,
    seedSql: `INSERT INTO habitaciones (numero_habitacion, piso, tipo, tarifa_noche, estado) VALUES
('101', 1, 'Simple', 45000.00, 'DISPONIBLE'),
('102', 1, 'Doble', 65000.00, 'OCUPADA'),
('201', 2, 'Suite', 120000.00, 'DISPONIBLE'),
('202', 2, 'Doble', 65000.00, 'DISPONIBLE'),
('301', 3, 'Presidencial', 250000.00, 'MANTENCION');`,
    queriesToSolve: [
      {
        question: 'Consultar habitaciones DISPONIBLES de tipo Doble o Suite con tarifa menor o igual a 120.000.',
        hint: 'Filtra estado = "DISPONIBLE" AND tipo IN ("Doble", "Suite") AND tarifa_noche <= 120000.',
        solutionSql: `SELECT numero_habitacion, piso, tipo, tarifa_noche
FROM habitaciones
WHERE estado = 'DISPONIBLE'
  AND tipo IN ('Doble', 'Suite')
  AND tarifa_noche <= 120000.00
ORDER BY tarifa_noche ASC;`
      }
    ],
    checkList: [
      'Establecí estados y tipos controlados con restricciones CHECK',
      'Definí número de habitación con clave única',
      'Formulé consultas compuestas para motor de reservas'
    ]
  },
  {
    id: 10,
    slug: 'db-10-cursos',
    block: 1,
    blockTitle: 'Tablas Simples (1 Tabla)',
    title: 'Catálogo de Cursos Online',
    level: 'Básico',
    badgeColor: '#0284c7',
    context: 'Una academia online ofrece cursos de tecnología categorizados por nivel de dificultad, duración en horas y valor comercial.',
    statement: 'Crear la tabla `cursos` con slug único para URLs amigables, horas pedagógicas mínimas de 1 y precio.',
    tables: [
      {
        name: 'cursos',
        desc: 'Catálogo de cursos disponibles.',
        fields: [
          { name: 'id_curso', type: 'INT', pk: true, notNull: true, desc: 'Identificador del curso' },
          { name: 'slug', type: 'VARCHAR(80)', unique: true, notNull: true, desc: 'Identificador semántico para URL' },
          { name: 'titulo', type: 'VARCHAR(120)', notNull: true, desc: 'Nombre del curso' },
          { name: 'nivel', type: 'VARCHAR(15)', notNull: true, desc: 'Principiante, Intermedio, Avanzado' },
          { name: 'duracion_horas', type: 'INT', notNull: true, desc: 'Horas cronológicas de contenido' },
          { name: 'precio', type: 'DECIMAL(8,2)', notNull: true, desc: 'Valor del curso' },
          { name: 'publicado', type: 'BOOLEAN', defaultValue: 'FALSE', desc: 'Visibilidad en la web' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    slug VARCHAR(80) UNIQUE NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    nivel VARCHAR(15) NOT NULL CHECK (nivel IN ('Principiante', 'Intermedio', 'Avanzado')),
    duracion_horas INT NOT NULL CHECK (duracion_horas > 0),
    precio DECIMAL(8,2) NOT NULL CHECK (precio >= 0),
    publicado BOOLEAN DEFAULT FALSE
);`,
    seedSql: `INSERT INTO cursos (slug, titulo, nivel, duracion_horas, precio, publicado) VALUES
('python-desde-cero', 'Python Moderno desde Cero', 'Principiante', 24, 29990.00, TRUE),
('sql-postgresql-avanzado', 'PostgreSQL y Modelamiento Relacional', 'Intermedio', 18, 34990.00, TRUE),
('arquitectura-microservicios', 'Microservicios con Docker y Go', 'Avanzado', 32, 49990.00, TRUE),
('react-typescript-pro', 'React 19 + TypeScript Fullstack', 'Intermedio', 28, 39990.00, TRUE),
('fundamentos-algoritmos', 'Lógica de Programación y Diagramas', 'Principiante', 12, 19990.00, FALSE);`,
    queriesToSolve: [
      {
        question: 'Listar cursos publicados de nivel Intermedio o Avanzado ordenados por precio descendente.',
        hint: 'Filtra publicado = TRUE AND nivel IN ("Intermedio", "Avanzado") ORDER BY precio DESC.',
        solutionSql: `SELECT slug, titulo, nivel, duracion_horas, precio
FROM cursos
WHERE publicado = TRUE AND nivel IN ('Intermedio', 'Avanzado')
ORDER BY precio DESC;`
      }
    ],
    checkList: [
      'Garantice el slug único indexado',
      'Configuré reglas de horas > 0 y precios >= 0',
      'Ejecuté consultas de filtro y ordenamiento'
    ]
  },

  // ==========================================
  // BLOQUE 2: DOS TABLAS RELACIONADAS (11 a 20)
  // ==========================================
  {
    id: 11,
    slug: 'db-11-departamentos-empleados',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Departamentos y Empleados (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Una corporación organiza a sus trabajadores por departamentos (Finanzas, Tecnología, RRHH, etc.). Un departamento tiene muchos empleados, pero un empleado pertenece a un solo departamento.',
    statement: 'Crear las tablas `departamentos` y `empleados` con llave foránea, política ON DELETE RESTRICT y consultas con INNER JOIN y LEFT JOIN para detectar departamentos sin personal.',
    tables: [
      {
        name: 'departamentos',
        desc: 'Áreas organizacionales de la empresa.',
        fields: [
          { name: 'id_depto', type: 'INT', pk: true, notNull: true, desc: 'ID del departamento' },
          { name: 'nombre_depto', type: 'VARCHAR(60)', unique: true, notNull: true, desc: 'Nombre del área' },
          { name: 'presupuesto_anual', type: 'DECIMAL(12,2)', notNull: true, desc: 'Presupuesto asignado' },
          { name: 'ubicacion_piso', type: 'INT', notNull: true, desc: 'Piso del edificio corporativo' }
        ]
      },
      {
        name: 'empleados',
        desc: 'Colaboradores asignados a un departamento.',
        fields: [
          { name: 'id_empleado', type: 'INT', pk: true, notNull: true, desc: 'ID del empleado' },
          { name: 'id_depto', type: 'INT', fk: 'departamentos.id_depto', notNull: true, desc: 'Llave foránea al departamento' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre del colaborador' },
          { name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true, desc: 'Correo corporativo' },
          { name: 'salario', type: 'DECIMAL(10,2)', notNull: true, desc: 'Sueldo mensual' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE departamentos (
    id_depto SERIAL PRIMARY KEY,
    nombre_depto VARCHAR(60) UNIQUE NOT NULL,
    presupuesto_anual DECIMAL(12,2) NOT NULL CHECK (presupuesto_anual > 0),
    ubicacion_piso INT NOT NULL
);

CREATE TABLE empleados (
    id_empleado SERIAL PRIMARY KEY,
    id_depto INT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    salario DECIMAL(10,2) NOT NULL CHECK (salario > 0),
    CONSTRAINT fk_empleado_depto FOREIGN KEY (id_depto)
        REFERENCES departamentos(id_depto)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);`,
    seedSql: `INSERT INTO departamentos (nombre_depto, presupuesto_anual, ubicacion_piso) VALUES
('Tecnología e Innovación', 120000000.00, 4),
('Recursos Humanos', 40000000.00, 2),
('Finanzas y Contabilidad', 60000000.00, 3),
('Marketing y Crecimiento', 50000000.00, 2);

INSERT INTO empleados (id_depto, nombre, email, salario) VALUES
(1, 'Ignacio Valdés', 'ignacio.v@empresa.com', 2400000.00),
(1, 'Constanza Silva', 'constanza.s@empresa.com', 2100000.00),
(2, 'Loreto Bravo', 'loreto.b@empresa.com', 1300000.00),
(3, 'Esteban Morales', 'esteban.m@empresa.com', 1800000.00),
(1, 'Diego Carrasco', 'diego.c@empresa.com', 1950000.00);`,
    queriesToSolve: [
      {
        question: 'Listar a todos los empleados junto con el nombre de su departamento y piso donde trabajan.',
        hint: 'Usa INNER JOIN entre empleados y departamentos uniendo por id_depto.',
        solutionSql: `SELECT e.id_empleado, e.nombre AS empleado, e.salario,
       d.nombre_depto AS departamento, d.ubicacion_piso
FROM empleados e
INNER JOIN departamentos d ON e.id_depto = d.id_depto
ORDER BY d.nombre_depto, e.salario DESC;`
      },
      {
        question: 'Calcular el gasto total en nómina y cantidad de trabajadores por departamento (incluyendo departamentos con 0 empleados).',
        hint: 'Usa LEFT JOIN desde departamentos hacia empleados con COUNT(e.id_empleado) y COALESCE(SUM(e.salario), 0).',
        solutionSql: `SELECT d.nombre_depto,
       COUNT(e.id_empleado) AS total_empleados,
       COALESCE(SUM(e.salario), 0) AS total_gasto_nomina
FROM departamentos d
LEFT JOIN empleados e ON d.id_depto = e.id_depto
GROUP BY d.id_depto, d.nombre_depto
ORDER BY total_gasto_nomina DESC;`
      }
    ],
    checkList: [
      'Creé la clave foránea con restricción ON DELETE RESTRICT',
      'Uní registros con INNER JOIN para reporte detallado',
      'Utilicé LEFT JOIN y agregaciones para capturar departamentos sin empleados',
      'Utilicé COALESCE para evitar valores nulos en sumatorias'
    ]
  },
  {
    id: 12,
    slug: 'db-12-clientes-pedidos',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Clientes y Órdenes de Compra (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Una tienda virtual registra clientes registrados y las órdenes de compra que generan a lo largo del tiempo.',
    statement: 'Crear las tablas `clientes` y `pedidos` con clave foránea `id_cliente`, estado del pedido y cálculo del total gastado por cliente.',
    tables: [
      {
        name: 'clientes',
        desc: 'Compradores registrados en la plataforma.',
        fields: [
          { name: 'id_cliente', type: 'INT', pk: true, notNull: true, desc: 'ID único del cliente' },
          { name: 'nombre', type: 'VARCHAR(60)', notNull: true, desc: 'Nombre del cliente' },
          { name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true, desc: 'Correo electrónico' },
          { name: 'ciudad', type: 'VARCHAR(50)', notNull: true, desc: 'Ciudad de residencia' }
        ]
      },
      {
        name: 'pedidos',
        desc: 'Órdenes de compra generadas por los clientes.',
        fields: [
          { name: 'id_pedido', type: 'INT', pk: true, notNull: true, desc: 'ID correlativo de orden' },
          { name: 'id_cliente', type: 'INT', fk: 'clientes.id_cliente', notNull: true, desc: 'Cliente que compra' },
          { name: 'fecha_pedido', type: 'DATE', defaultValue: 'CURRENT_DATE', desc: 'Fecha de la orden' },
          { name: 'total', type: 'DECIMAL(10,2)', notNull: true, desc: 'Monto total de la compra' },
          { name: 'estado', type: 'VARCHAR(20)', defaultValue: "'PENDIENTE'", desc: 'PENDIENTE, PAGADO, ENVIADO, CANCELADO' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    ciudad VARCHAR(50) NOT NULL
);

CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido DATE DEFAULT CURRENT_DATE,
    total DECIMAL(10,2) NOT NULL CHECK (total > 0),
    estado VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'PAGADO', 'ENVIADO', 'CANCELADO')),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO clientes (nombre, email, ciudad) VALUES
('Camila Fuentes', 'camila.f@gmail.com', 'Santiago'),
('Matías Paredes', 'matias.p@gmail.com', 'Valparaíso'),
('Fernanda Silva', 'fernanda.s@gmail.com', 'Concepción'),
('Rodrigo Araya', 'rodrigo.a@gmail.com', 'Santiago');

INSERT INTO pedidos (id_cliente, fecha_pedido, total, estado) VALUES
(1, '2024-02-10', 45990.00, 'PAGADO'),
(1, '2024-02-18', 120500.00, 'ENVIADO'),
(2, '2024-02-20', 32000.00, 'PAGADO'),
(1, '2024-02-25', 18990.00, 'PAGADO'),
(3, '2024-02-26', 85000.00, 'PENDIENTE');`,
    queriesToSolve: [
      {
        question: 'Encontrar los mejores clientes: mostrar nombre, ciudad y total histórico acumulado en pedidos pagados/enviados, filtrando solo aquellos con compras > $50.000.',
        hint: 'Une clientes y pedidos, filtra estados válidos, agrupa y usa HAVING SUM(p.total) > 50000.',
        solutionSql: `SELECT c.nombre, c.ciudad,
       COUNT(p.id_pedido) AS total_pedidos,
       SUM(p.total) AS total_gastado
FROM clientes c
INNER JOIN pedidos p ON c.id_cliente = p.id_cliente
WHERE p.estado IN ('PAGADO', 'ENVIADO')
GROUP BY c.id_cliente, c.nombre, c.ciudad
HAVING SUM(p.total) > 50000
ORDER BY total_gastado DESC;`
      }
    ],
    checkList: [
      'Creé la relación 1:N con clave foránea en la tabla secundaria',
      'Configuré ON DELETE CASCADE para coherencia relacional',
      'Utilicé GROUP BY y HAVING para filtrar clientes VIP'
    ]
  },
  {
    id: 13,
    slug: 'db-13-categorias-productos',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Categorías y Catálogo de Productos (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Un supermercado clasifica sus miles de productos en categorías (Lácteos, Abarrotes, Limpieza, etc.).',
    statement: 'Crear `categorias` y `productos` con ON DELETE SET NULL para que si se borra una categoría los productos no se eliminen sino que queden sin categoría.',
    tables: [
      {
        name: 'categorias',
        desc: 'Familias de clasificación de artículos.',
        fields: [
          { name: 'id_categoria', type: 'INT', pk: true, notNull: true, desc: 'ID categoría' },
          { name: 'nombre_categoria', type: 'VARCHAR(50)', unique: true, notNull: true, desc: 'Nombre descriptivo' },
          { name: 'descripcion', type: 'TEXT', desc: 'Detalles de la familia' }
        ]
      },
      {
        name: 'productos',
        desc: 'Artículos a la venta vinculados a una categoría.',
        fields: [
          { name: 'id_producto', type: 'INT', pk: true, notNull: true, desc: 'ID producto' },
          { name: 'id_categoria', type: 'INT', fk: 'categorias.id_categoria', desc: 'Categoría a la que pertenece' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre del producto' },
          { name: 'precio', type: 'DECIMAL(8,2)', notNull: true, desc: 'Precio al detalle' },
          { name: 'stock', type: 'INT', defaultValue: '0', desc: 'Unidades en góndola' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_categoria INT,
    nombre VARCHAR(80) NOT NULL,
    precio DECIMAL(8,2) NOT NULL CHECK (precio >= 0),
    stock INT DEFAULT 0 CHECK (stock >= 0),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL
);`,
    seedSql: `INSERT INTO categorias (nombre_categoria, descripcion) VALUES
('Bebidas y Licores', 'Gaseosas, jugos, vinos y cervezas'),
('Panadería y Pastelería', 'Pan fresco del día y tortas'),
('Frutas y Verduras', 'Productos frescos de estación');

INSERT INTO productos (id_categoria, nombre, precio, stock) VALUES
(1, 'Jugo Naranja 1L', 1890.00, 30),
(1, 'Agua Mineral 1.5L', 990.00, 55),
(2, 'Pan Marraqueta 1KG', 2100.00, 40),
(2, 'Queque de Vainilla', 3200.00, 10),
(NULL, 'Bolsa Ecológica Reutilizable', 500.00, 100);`,
    queriesToSolve: [
      {
        question: 'Mostrar todos los productos con el nombre de su categoría, o "Sin Categoría" si el campo es nulo.',
        hint: 'Usa LEFT JOIN y COALESCE(c.nombre_categoria, "Sin Categoría").',
        solutionSql: `SELECT p.id_producto, p.nombre AS producto, p.precio, p.stock,
       COALESCE(c.nombre_categoria, 'Sin Categoría') AS categoria
FROM productos p
LEFT JOIN categorias c ON p.id_categoria = c.id_categoria;`
      }
    ],
    checkList: [
      'Configuré la clave foránea como nulable con ON DELETE SET NULL',
      'Realicé consultas con LEFT JOIN para incluir productos huérfanos',
      'Utilicé la función COALESCE para formatear valores nulos'
    ]
  },
  {
    id: 14,
    slug: 'db-14-autores-libros',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Autores y Obras Literarias (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Una editorial almacena a sus autores con biografía y país de origen, junto a todas las obras que han publicado.',
    statement: 'Crear `autores` y `libros` vinculadas por `id_autor`, con consulta agregada para contar cuántos libros ha escrito cada autor.',
    tables: [
      {
        name: 'autores',
        desc: 'Escritores registrados.',
        fields: [
          { name: 'id_autor', type: 'INT', pk: true, notNull: true, desc: 'ID del autor' },
          { name: 'nombre_autor', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre literario' },
          { name: 'nacionalidad', type: 'VARCHAR(40)', notNull: true, desc: 'País de origen' },
          { name: 'anio_nacimiento', type: 'INT', notNull: true, desc: 'Año de nacimiento' }
        ]
      },
      {
        name: 'libros',
        desc: 'Obras publicadas.',
        fields: [
          { name: 'id_libro', type: 'INT', pk: true, notNull: true, desc: 'ID del libro' },
          { name: 'id_autor', type: 'INT', fk: 'autores.id_autor', notNull: true, desc: 'Autor de la obra' },
          { name: 'titulo', type: 'VARCHAR(120)', notNull: true, desc: 'Título del libro' },
          { name: 'genero', type: 'VARCHAR(30)', notNull: true, desc: 'Género literario' },
          { name: 'anio_publicacion', type: 'INT', notNull: true, desc: 'Año de edición' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE autores (
    id_autor SERIAL PRIMARY KEY,
    nombre_autor VARCHAR(80) NOT NULL,
    nacionalidad VARCHAR(40) NOT NULL,
    anio_nacimiento INT NOT NULL
);

CREATE TABLE libros (
    id_libro SERIAL PRIMARY KEY,
    id_autor INT NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    genero VARCHAR(30) NOT NULL,
    anio_publicacion INT NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO autores (nombre_autor, nacionalidad, anio_nacimiento) VALUES
('Gabriel García Márquez', 'Colombiana', 1927),
('Isabel Allende', 'Chilena', 1942),
('Jorge Luis Borges', 'Argentina', 1899),
('Mario Vargas Llosa', 'Peruana', 1936);

INSERT INTO libros (id_autor, titulo, genero, anio_publicacion) VALUES
(1, 'Cien años de soledad', 'Realismo Mágico', 1967),
(1, 'El amor en los tiempos del cólera', 'Novela', 1985),
(2, 'La casa de los espíritus', 'Novela', 1982),
(2, 'Paula', 'Autobiografía', 1994),
(3, 'Ficciones', 'Cuento', 1944);`,
    queriesToSolve: [
      {
        question: 'Listar todos los autores indicando cuántos libros tienen registrados, ordenados de mayor a menor cantidad.',
        hint: 'Haz LEFT JOIN de autores con libros y agrupa por autor.',
        solutionSql: `SELECT a.nombre_autor, a.nacionalidad,
       COUNT(l.id_libro) AS total_libros_publicados
FROM autores a
LEFT JOIN libros l ON a.id_autor = l.id_autor
GROUP BY a.id_autor, a.nombre_autor, a.nacionalidad
ORDER BY total_libros_publicados DESC;`
      }
    ],
    checkList: [
      'Diseñé el modelo 1:N de autores a libros',
      'Creé la relación relacional con eliminación en cascada',
      'Construí consultas analíticas con GROUP BY'
    ]
  },
  {
    id: 15,
    slug: 'db-15-marcas-modelos',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Fabricantes y Modelos de Vehículos (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Una concesionaria maneja marcas de fabricantes automotrices (Toyota, BMW, Ford) y los diversos modelos producidos.',
    statement: 'Crear `marcas` y `modelos` con clave foránea y consulta para filtrar marcas que tengan modelos tipo SUV o Sedán.',
    tables: [
      {
        name: 'marcas',
        desc: 'Empresas fabricantes de automóviles.',
        fields: [
          { name: 'id_marca', type: 'INT', pk: true, notNull: true, desc: 'ID de la marca' },
          { name: 'nombre_marca', type: 'VARCHAR(40)', unique: true, notNull: true, desc: 'Nombre del fabricante' },
          { name: 'pais_origen', type: 'VARCHAR(40)', notNull: true, desc: 'País central' }
        ]
      },
      {
        name: 'modelos',
        desc: 'Modelos de autos asociados a una marca.',
        fields: [
          { name: 'id_modelo', type: 'INT', pk: true, notNull: true, desc: 'ID del modelo' },
          { name: 'id_marca', type: 'INT', fk: 'marcas.id_marca', notNull: true, desc: 'Marca fabricante' },
          { name: 'nombre_modelo', type: 'VARCHAR(50)', notNull: true, desc: 'Nombre del modelo' },
          { name: 'carroceria', type: 'VARCHAR(20)', notNull: true, desc: 'Sedan, SUV, Hatchback, Pickup' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE marcas (
    id_marca SERIAL PRIMARY KEY,
    nombre_marca VARCHAR(40) UNIQUE NOT NULL,
    pais_origen VARCHAR(40) NOT NULL
);

CREATE TABLE modelos (
    id_modelo SERIAL PRIMARY KEY,
    id_marca INT NOT NULL,
    nombre_modelo VARCHAR(50) NOT NULL,
    carroceria VARCHAR(20) NOT NULL CHECK (carroceria IN ('Sedan', 'SUV', 'Hatchback', 'Pickup', 'Coupe')),
    FOREIGN KEY (id_marca) REFERENCES marcas(id_marca) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO marcas (nombre_marca, pais_origen) VALUES
('Toyota', 'Japón'),
('BMW', 'Alemania'),
('Ford', 'Estados Unidos'),
('Hyundai', 'Corea del Sur');

INSERT INTO modelos (id_marca, nombre_modelo, carroceria) VALUES
(1, 'Corolla', 'Sedan'),
(1, 'RAV4', 'SUV'),
(1, 'Hilux', 'Pickup'),
(2, 'Serie 3', 'Sedan'),
(2, 'X5', 'SUV'),
(3, 'F-150', 'Pickup');`,
    queriesToSolve: [
      {
        question: 'Obtener todos los modelos de tipo "SUV" indicando la marca y país de origen.',
        hint: 'Une modelos y marcas con INNER JOIN filtrando carroceria = "SUV".',
        solutionSql: `SELECT m.nombre_marca, m.pais_origen, mo.nombre_modelo, mo.carroceria
FROM modelos mo
INNER JOIN marcas m ON mo.id_marca = m.id_marca
WHERE mo.carroceria = 'SUV'
ORDER BY m.nombre_marca;`
      }
    ],
    checkList: [
      'Normalicé marcas y modelos en 2 tablas',
      'Configuré el CHECK de carrocerías admitidas',
      'Ejecuté joins con filtros específicos'
    ]
  },
  {
    id: 16,
    slug: 'db-16-medicos-consultas',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Médicos y Consultas Clínicas (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Un policlínico lleva el registro de los médicos especialistas contratados y cada una de las consultas de atención prestadas.',
    statement: 'Crear `medicos` y `consultas` vinculadas por `id_medico`, con cálculo de ingresos totales generados por cada doctor.',
    tables: [
      {
        name: 'medicos',
        desc: 'Profesionales de la salud.',
        fields: [
          { name: 'id_medico', type: 'INT', pk: true, notNull: true, desc: 'ID del médico' },
          { name: 'nombre_medico', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre del doctor' },
          { name: 'especialidad', type: 'VARCHAR(50)', notNull: true, desc: 'Área médica' },
          { name: 'valor_consulta', type: 'DECIMAL(8,2)', notNull: true, desc: 'Tarifa por consulta' }
        ]
      },
      {
        name: 'consultas',
        desc: 'Citas atendidas por los médicos.',
        fields: [
          { name: 'id_consulta', type: 'INT', pk: true, notNull: true, desc: 'ID de la consulta' },
          { name: 'id_medico', type: 'INT', fk: 'medicos.id_medico', notNull: true, desc: 'Médico que atendió' },
          { name: 'rut_paciente', type: 'VARCHAR(12)', notNull: true, desc: 'Paciente atendido' },
          { name: 'fecha_hora', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP', desc: 'Fecha y hora' },
          { name: 'diagnostico_resumen', type: 'TEXT', notNull: true, desc: 'Dictamen clínico' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    nombre_medico VARCHAR(80) NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    valor_consulta DECIMAL(8,2) NOT NULL CHECK (valor_consulta > 0)
);

CREATE TABLE consultas (
    id_consulta SERIAL PRIMARY KEY,
    id_medico INT NOT NULL,
    rut_paciente VARCHAR(12) NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    diagnostico_resumen TEXT NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico) ON DELETE RESTRICT
);`,
    seedSql: `INSERT INTO medicos (nombre_medico, especialidad, valor_consulta) VALUES
('Dra. Paulina Orostica', 'Cardiología', 45000.00),
('Dr. Andrés Sepúlveda', 'Pediatría', 35000.00),
('Dra. Macarena Ríos', 'Dermatología', 40000.00);

INSERT INTO consultas (id_medico, rut_paciente, diagnostico_resumen) VALUES
(1, '11.111.111-1', 'Control de hipertensión arterial'),
(1, '22.222.222-2', 'Evaluación post infarto favorable'),
(2, '33.333.333-3', 'Control de niño sano 2 años'),
(3, '44.444.444-4', 'Tratamiento de dermatitis atópica'),
(1, '55.555.555-5', 'Arritmia sinusal leve');`,
    queriesToSolve: [
      {
        question: 'Calcular cuántas consultas ha realizado cada médico y el total recaudado en honorarios.',
        hint: 'Multiplica COUNT(c.id_consulta) por m.valor_consulta en el SELECT agrupado.',
        solutionSql: `SELECT m.nombre_medico, m.especialidad, m.valor_consulta,
       COUNT(c.id_consulta) AS total_atenciones,
       (COUNT(c.id_consulta) * m.valor_consulta) AS total_recaudado
FROM medicos m
LEFT JOIN consultas c ON m.id_medico = c.id_medico
GROUP BY m.id_medico, m.nombre_medico, m.especialidad, m.valor_consulta
ORDER BY total_recaudado DESC;`
      }
    ],
    checkList: [
      'Creé la relación 1:N entre médicos y atenciones',
      'Configuré ON DELETE RESTRICT para evitar eliminar médicos con historial clínico',
      'Realicé cálculos financieros agrupados por profesional'
    ]
  },
  {
    id: 17,
    slug: 'db-17-docentes-asignaturas',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Docentes y Asignaturas Dictadas (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Un instituto tecnológico gestiona a sus profesores de planta y las asignaturas que tienen asignadas durante el semestre.',
    statement: 'Crear `docentes` y `asignaturas` con control de créditos académicos y búsqueda de docentes con carga académica superior a 10 créditos.',
    tables: [
      {
        name: 'docentes',
        desc: 'Profesores del cuerpo académico.',
        fields: [
          { name: 'id_docente', type: 'INT', pk: true, notNull: true, desc: 'ID del docente' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre del profesor' },
          { name: 'grado_academico', type: 'VARCHAR(30)', notNull: true, desc: 'Licenciado, Magíster, Doctor' }
        ]
      },
      {
        name: 'asignaturas',
        desc: 'Materias o ramos del plan curricular.',
        fields: [
          { name: 'id_asignatura', type: 'INT', pk: true, notNull: true, desc: 'ID de la materia' },
          { name: 'id_docente', type: 'INT', fk: 'docentes.id_docente', notNull: true, desc: 'Profesor responsable' },
          { name: 'codigo_ramo', type: 'VARCHAR(15)', unique: true, notNull: true, desc: 'Código curricular (ej. INF-201)' },
          { name: 'nombre_ramo', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre de la materia' },
          { name: 'creditos', type: 'INT', notNull: true, desc: 'Créditos SCT (1 a 12)' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    grado_academico VARCHAR(30) NOT NULL CHECK (grado_academico IN ('Licenciado', 'Magíster', 'Doctor'))
);

CREATE TABLE asignaturas (
    id_asignatura SERIAL PRIMARY KEY,
    id_docente INT NOT NULL,
    codigo_ramo VARCHAR(15) UNIQUE NOT NULL,
    nombre_ramo VARCHAR(80) NOT NULL,
    creditos INT NOT NULL CHECK (creditos BETWEEN 1 AND 12),
    FOREIGN KEY (id_docente) REFERENCES docentes(id_docente) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO docentes (nombre, grado_academico) VALUES
('Dr. Roberto Henríquez', 'Doctor'),
('Mg. Claudia San Martín', 'Magíster'),
('Lic. Javier Albornoz', 'Licenciado');

INSERT INTO asignaturas (id_docente, codigo_ramo, nombre_ramo, creditos) VALUES
(1, 'INF-101', 'Algoritmos y Estructuras de Datos', 6),
(1, 'INF-202', 'Bases de Datos Relacionales', 6),
(2, 'MAT-105', 'Cálculo Diferencial', 5),
(2, 'MAT-205', 'Álgebra Lineal', 4);`,
    queriesToSolve: [
      {
        question: 'Identificar a los docentes cuya carga total de créditos en ramos asignados sea mayor o igual a 10.',
        hint: 'Agrupa por docente, suma creditos y filtra con HAVING SUM(a.creditos) >= 10.',
        solutionSql: `SELECT d.nombre, d.grado_academico,
       COUNT(a.id_asignatura) AS total_ramos,
       SUM(a.creditos) AS total_creditos_dictados
FROM docentes d
INNER JOIN asignaturas a ON d.id_docente = a.id_docente
GROUP BY d.id_docente, d.nombre, d.grado_academico
HAVING SUM(a.creditos) >= 10;`
      }
    ],
    checkList: [
      'Modelé docentes y asignaturas con clave foránea',
      'Configuré validaciones de grado académico y créditos',
      'Filtré cargas docentes con HAVING'
    ]
  },
  {
    id: 18,
    slug: 'db-18-proveedores-facturas',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Proveedores y Facturas de Compra (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'El área de adquisiciones de una empresa controla a sus proveedores comerciales y las facturas por pagar emitidas.',
    statement: 'Crear `proveedores` y `facturas_compra` con número de factura único por proveedor y estado de pago.',
    tables: [
      {
        name: 'proveedores',
        desc: 'Empresas proveedoras de insumos.',
        fields: [
          { name: 'id_proveedor', type: 'INT', pk: true, notNull: true, desc: 'ID del proveedor' },
          { name: 'rut_empresa', type: 'VARCHAR(12)', unique: true, notNull: true, desc: 'RUT tributario' },
          { name: 'razon_social', type: 'VARCHAR(100)', notNull: true, desc: 'Nombre comercial de la empresa' }
        ]
      },
      {
        name: 'facturas_compra',
        desc: 'Documentos tributarios de compra.',
        fields: [
          { name: 'id_factura', type: 'INT', pk: true, notNull: true, desc: 'ID de factura' },
          { name: 'id_proveedor', type: 'INT', fk: 'proveedores.id_proveedor', notNull: true, desc: 'Proveedor emisor' },
          { name: 'folio_factura', type: 'INT', notNull: true, desc: 'Número de folio' },
          { name: 'monto_neto', type: 'DECIMAL(12,2)', notNull: true, desc: 'Valor antes de IVA' },
          { name: 'iva', type: 'DECIMAL(12,2)', notNull: true, desc: 'Impuesto al valor agregado' },
          { name: 'monto_total', type: 'DECIMAL(12,2)', notNull: true, desc: 'Total a pagar' },
          { name: 'estado_pago', type: 'VARCHAR(15)', defaultValue: "'PENDIENTE'", desc: 'PENDIENTE, PAGADA, ANULADA' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    rut_empresa VARCHAR(12) UNIQUE NOT NULL,
    razon_social VARCHAR(100) NOT NULL
);

CREATE TABLE facturas_compra (
    id_factura SERIAL PRIMARY KEY,
    id_proveedor INT NOT NULL,
    folio_factura INT NOT NULL,
    monto_neto DECIMAL(12,2) NOT NULL CHECK (monto_neto > 0),
    iva DECIMAL(12,2) NOT NULL CHECK (iva >= 0),
    monto_total DECIMAL(12,2) NOT NULL CHECK (monto_total > monto_neto),
    estado_pago VARCHAR(15) DEFAULT 'PENDIENTE' CHECK (estado_pago IN ('PENDIENTE', 'PAGADA', 'ANULADA')),
    UNIQUE (id_proveedor, folio_factura),
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor) ON DELETE RESTRICT
);`,
    seedSql: `INSERT INTO proveedores (rut_empresa, razon_social) VALUES
('76.123.456-K', 'Distribuidora Central S.A.'),
('77.654.321-8', 'Servicios Tecnológicos Global SpA'),
('78.999.888-2', 'Papelería y Útiles del Sur Ltda.');

INSERT INTO facturas_compra (id_proveedor, folio_factura, monto_neto, iva, monto_total, estado_pago) VALUES
(1, 10450, 1000000.00, 190000.00, 1190000.00, 'PAGADA'),
(1, 10520, 450000.00, 85500.00, 535500.00, 'PENDIENTE'),
(2, 890, 2500000.00, 475000.00, 2975000.00, 'PENDIENTE'),
(3, 4410, 120000.00, 22800.00, 142800.00, 'PAGADA');`,
    queriesToSolve: [
      {
        question: 'Obtener el monto total de deuda pendiente de pago agrupado por proveedor.',
        hint: 'Filtra estado_pago = "PENDIENTE", une tablas y suma monto_total por proveedor.',
        solutionSql: `SELECT p.razon_social, p.rut_empresa,
       COUNT(f.id_factura) AS facturas_pendientes,
       SUM(f.monto_total) AS deuda_total_pendiente
FROM proveedores p
INNER JOIN facturas_compra f ON p.id_proveedor = f.id_proveedor
WHERE f.estado_pago = 'PENDIENTE'
GROUP BY p.id_proveedor, p.razon_social, p.rut_empresa
ORDER BY deuda_total_pendiente DESC;`
      }
    ],
    checkList: [
      'Creé la restricción de unicidad compuesta UNIQUE (id_proveedor, folio_factura)',
      'Calculé montos tributarios con restricciones de coherencia matemática',
      'Realicé balances de cuentas por pagar con GROUP BY'
    ]
  },
  {
    id: 19,
    slug: 'db-19-hoteles-habitaciones',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Cadena de Hoteles y Habitaciones (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Una cadena hotelera opera múltiples sucursales en diversas ciudades y administra las habitaciones de cada una.',
    statement: 'Crear `hoteles` y `habitaciones` con clave foránea y consulta para determinar el número de habitaciones disponibles por ciudad.',
    tables: [
      {
        name: 'hoteles',
        desc: 'Sucursales de la cadena.',
        fields: [
          { name: 'id_hotel', type: 'INT', pk: true, notNull: true, desc: 'ID del hotel' },
          { name: 'nombre_hotel', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre de la sucursal' },
          { name: 'ciudad', type: 'VARCHAR(50)', notNull: true, desc: 'Ciudad de ubicación' },
          { name: 'estrellas', type: 'INT', notNull: true, desc: 'Categoría (1 a 5 estrellas)' }
        ]
      },
      {
        name: 'habitaciones',
        desc: 'Habitaciones de cada hotel.',
        fields: [
          { name: 'id_habitacion', type: 'INT', pk: true, notNull: true, desc: 'ID habitación' },
          { name: 'id_hotel', type: 'INT', fk: 'hoteles.id_hotel', notNull: true, desc: 'Hotel perteneciente' },
          { name: 'numero_habitacion', type: 'VARCHAR(10)', notNull: true, desc: 'Número de cuarto' },
          { name: 'tarifa', type: 'DECIMAL(9,2)', notNull: true, desc: 'Precio por noche' },
          { name: 'disponible', type: 'BOOLEAN', defaultValue: 'TRUE', desc: 'Disponibilidad actual' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE hoteles (
    id_hotel SERIAL PRIMARY KEY,
    nombre_hotel VARCHAR(80) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    estrellas INT NOT NULL CHECK (estrellas BETWEEN 1 AND 5)
);

CREATE TABLE habitaciones (
    id_habitacion SERIAL PRIMARY KEY,
    id_hotel INT NOT NULL,
    numero_habitacion VARCHAR(10) NOT NULL,
    tarifa DECIMAL(9,2) NOT NULL CHECK (tarifa > 0),
    disponible BOOLEAN DEFAULT TRUE,
    UNIQUE (id_hotel, numero_habitacion),
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO hoteles (nombre_hotel, ciudad, estrellas) VALUES
('Grand Hotel Costanera', 'Santiago', 5),
('Hotel Bahía Marina', 'Viña del Mar', 4),
('Lodge Patagonia', 'Puerto Varas', 4);

INSERT INTO habitaciones (id_hotel, numero_habitacion, tarifa, disponible) VALUES
(1, '101', 95000.00, TRUE),
(1, '102', 95000.00, FALSE),
(1, '201', 160000.00, TRUE),
(2, '101', 75000.00, TRUE),
(2, '102', 75000.00, TRUE);`,
    queriesToSolve: [
      {
        question: 'Contar cuántas habitaciones disponibles tiene cada hotel y calcular su tarifa promedio.',
        hint: 'Filtra disponible = TRUE y agrupa por hotel.',
        solutionSql: `SELECT h.nombre_hotel, h.ciudad, h.estrellas,
       COUNT(ha.id_habitacion) AS habitaciones_libres,
       ROUND(AVG(ha.tarifa), 2) AS tarifa_promedio
FROM hoteles h
INNER JOIN habitaciones ha ON h.id_hotel = ha.id_hotel
WHERE ha.disponible = TRUE
GROUP BY h.id_hotel, h.nombre_hotel, h.ciudad, h.estrellas;`
      }
    ],
    checkList: [
      'Garantice que el número de habitación sea único por cada sucursal hotelera',
      'Configuré eliminación en cascada',
      'Elaboré consultas de disponibilidad turística'
    ]
  },
  {
    id: 20,
    slug: 'db-20-proyectos-tareas',
    block: 2,
    blockTitle: 'Dos Tablas Relacionadas (1 a N)',
    title: 'Proyectos de Software y Tareas (1:N)',
    level: 'Intermedio',
    badgeColor: '#10b981',
    context: 'Una software factory gestiona proyectos ágiles y el backlog de tareas pendientes o completadas.',
    statement: 'Crear `proyectos` y `tareas` con estado, prioridad (ALTA, MEDIA, BAJA) y consulta para calcular el % de avance de cada proyecto.',
    tables: [
      {
        name: 'proyectos',
        desc: 'Proyectos de desarrollo en curso.',
        fields: [
          { name: 'id_proyecto', type: 'INT', pk: true, notNull: true, desc: 'ID del proyecto' },
          { name: 'nombre_proyecto', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre del software' },
          { name: 'cliente', type: 'VARCHAR(60)', notNull: true, desc: 'Empresa mandante' }
        ]
      },
      {
        name: 'tareas',
        desc: 'Tareas asignadas dentro de un proyecto.',
        fields: [
          { name: 'id_tarea', type: 'INT', pk: true, notNull: true, desc: 'ID de la tarea' },
          { name: 'id_proyecto', type: 'INT', fk: 'proyectos.id_proyecto', notNull: true, desc: 'Proyecto al que pertenece' },
          { name: 'titulo_tarea', type: 'VARCHAR(100)', notNull: true, desc: 'Descripción de la labor' },
          { name: 'prioridad', type: 'VARCHAR(10)', defaultValue: "'MEDIA'", desc: 'ALTA, MEDIA, BAJA' },
          { name: 'completada', type: 'BOOLEAN', defaultValue: 'FALSE', desc: 'Estado de término' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE proyectos (
    id_proyecto SERIAL PRIMARY KEY,
    nombre_proyecto VARCHAR(80) NOT NULL,
    cliente VARCHAR(60) NOT NULL
);

CREATE TABLE tareas (
    id_tarea SERIAL PRIMARY KEY,
    id_proyecto INT NOT NULL,
    titulo_tarea VARCHAR(100) NOT NULL,
    prioridad VARCHAR(10) DEFAULT 'MEDIA' CHECK (prioridad IN ('ALTA', 'MEDIA', 'BAJA')),
    completada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO proyectos (nombre_proyecto, cliente) VALUES
('App Móvil Billetera Digital', 'Banco Andino'),
('Portal de E-Commerce B2B', 'Retail Mayorista S.A.');

INSERT INTO tareas (id_proyecto, titulo_tarea, prioridad, completada) VALUES
(1, 'Diseño de arquitectura y endpoints', 'ALTA', TRUE),
(1, 'Integración con pasarela Webpay', 'ALTA', TRUE),
(1, 'Pruebas unitarias de transferencias', 'MEDIA', FALSE),
(1, 'Despliegue en Kubernetes', 'ALTA', FALSE),
(2, 'Maquetación UI del carrito', 'MEDIA', TRUE),
(2, 'Integración con SAP ERP', 'ALTA', FALSE);`,
    queriesToSolve: [
      {
        question: 'Calcular el total de tareas, tareas terminadas y porcentaje (%) de avance de cada proyecto.',
        hint: 'Usa COUNT(*) y SUM(CASE WHEN t.completada THEN 1 ELSE 0 END).',
        solutionSql: `SELECT p.nombre_proyecto, p.cliente,
       COUNT(t.id_tarea) AS total_tareas,
       SUM(CASE WHEN t.completada THEN 1 ELSE 0 END) AS tareas_listas,
       ROUND((SUM(CASE WHEN t.completada THEN 1.0 ELSE 0.0 END) / COUNT(t.id_tarea)) * 100, 1) AS porcentaje_avance
FROM proyectos p
LEFT JOIN tareas t ON p.id_proyecto = t.id_proyecto
GROUP BY p.id_proyecto, p.nombre_proyecto, p.cliente;`
      }
    ],
    checkList: [
      'Implementé relaciones 1:N para seguimiento de tareas',
      'Utilicé condicionales CASE WHEN dentro de funciones de agregación',
      'Calculé métricas porcentuales en tiempo real'
    ]
  },

  // ==========================================
  // BLOQUE 3: RELACIONES COMPLEJAS (1:1, 1:N, N:M) (21 a 30)
  // ==========================================
  {
    id: 21,
    slug: 'db-21-ecommerce-completo',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'E-Commerce: Clientes, Pedidos, Detalle y Productos (N:M)',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Un comercio electrónico modela clientes, órdenes de compra y productos. La relación entre pedidos y productos es Muchos a Muchos (N:M) y se resuelve mediante la tabla pivote `detalle_pedidos`.',
    statement: 'Crear el esquema de 4 tablas con llaves foráneas, cálculo de subtotales (cantidad * precio_unitario), y consulta analítica de productos más vendidos.',
    tables: [
      {
        name: 'clientes',
        desc: 'Usuarios registrados que compran.',
        fields: [
          { name: 'id_cliente', type: 'INT', pk: true, notNull: true, desc: 'ID cliente' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre completo' },
          { name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true, desc: 'Correo único' }
        ]
      },
      {
        name: 'productos',
        desc: 'Catálogo de artículos.',
        fields: [
          { name: 'id_producto', type: 'INT', pk: true, notNull: true, desc: 'ID producto' },
          { name: 'nombre_producto', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'precio_actual', type: 'DECIMAL(10,2)', notNull: true, desc: 'Precio catálogo' }
        ]
      },
      {
        name: 'pedidos',
        desc: 'Cabecera de la orden de compra.',
        fields: [
          { name: 'id_pedido', type: 'INT', pk: true, notNull: true, desc: 'ID orden' },
          { name: 'id_cliente', type: 'INT', fk: 'clientes.id_cliente', notNull: true, desc: 'Comprador (1:N)' },
          { name: 'fecha_pedido', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP', desc: 'Fecha y hora' },
          { name: 'estado', type: 'VARCHAR(20)', defaultValue: "'PAGADO'", desc: 'Estado del pedido' }
        ]
      },
      {
        name: 'detalle_pedidos',
        desc: 'Tabla intermedia N:M entre pedidos y productos.',
        fields: [
          { name: 'id_detalle', type: 'INT', pk: true, notNull: true, desc: 'ID ítem' },
          { name: 'id_pedido', type: 'INT', fk: 'pedidos.id_pedido', notNull: true, desc: 'Orden asociada' },
          { name: 'id_producto', type: 'INT', fk: 'productos.id_producto', notNull: true, desc: 'Producto comprado' },
          { name: 'cantidad', type: 'INT', notNull: true, desc: 'Unidades compradas (>0)' },
          { name: 'precio_unitario_historico', type: 'DECIMAL(10,2)', notNull: true, desc: 'Precio al momento de comprar' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(80) NOT NULL,
    precio_actual DECIMAL(10,2) NOT NULL CHECK (precio_actual > 0)
);

CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'PAGADO',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
);

CREATE TABLE detalle_pedidos (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario_historico DECIMAL(10,2) NOT NULL CHECK (precio_unitario_historico > 0),
    UNIQUE (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE RESTRICT
);`,
    seedSql: `INSERT INTO clientes (nombre, email) VALUES
('Sofía Morales', 'sofia.m@gmail.com'),
('Joaquín Tapia', 'joaquin.t@gmail.com');

INSERT INTO productos (nombre_producto, precio_actual) VALUES
('Teclado Mecánico RGB', 69990.00),
('Mouse Inalámbrico Pro', 39990.00),
('Monitor 27 Pulgadas 144Hz', 199990.00);

INSERT INTO pedidos (id_cliente) VALUES (1), (2);

INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario_historico) VALUES
(1, 1, 1, 69990.00),
(1, 2, 2, 39990.00),
(2, 2, 1, 39990.00),
(2, 3, 1, 199990.00);`,
    queriesToSolve: [
      {
        question: 'Generar el reporte de ventas por producto: nombre del producto, cantidad total de unidades vendidas y recaudación total generada.',
        hint: 'Une productos y detalle_pedidos con SUM(dp.cantidad) y SUM(dp.cantidad * dp.precio_unitario_historico).',
        solutionSql: `SELECT p.id_producto, p.nombre_producto,
       SUM(dp.cantidad) AS unidades_vendidas,
       SUM(dp.cantidad * dp.precio_unitario_historico) AS total_recaudado
FROM productos p
INNER JOIN detalle_pedidos dp ON p.id_producto = dp.id_producto
GROUP BY p.id_producto, p.nombre_producto
ORDER BY total_recaudado DESC;`
      }
    ],
    checkList: [
      'Creé la tabla intermedia N:M con clave foránea compuesta y UNIQUE',
      'Guardé el precio histórico para evitar inconsistencias contables si el precio cambia',
      'Escribí consultas de reportería uniendo 4 tablas simultáneamente'
    ]
  },
  {
    id: 22,
    slug: 'db-22-universidad-inscripciones',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Universidad: Estudiantes, Cursos, Matrículas y Profesores (N:M + 1:N)',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Un sistema académico modela la inscripción de alumnos en asignaturas. Un profesor dicta cursos (1:N), y los estudiantes se inscriben en múltiples cursos (N:M).',
    statement: 'Crear el esquema de 4 tablas (`profesores`, `cursos`, `estudiantes`, `inscripciones`) con control de nota final.',
    tables: [
      {
        name: 'profesores',
        desc: 'Cuerpo académico.',
        fields: [
          { name: 'id_profesor', type: 'INT', pk: true, notNull: true, desc: 'ID profesor' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'departamento', type: 'VARCHAR(60)', notNull: true, desc: 'Facultad' }
        ]
      },
      {
        name: 'cursos',
        desc: 'Asignaturas abiertas a inscripción.',
        fields: [
          { name: 'id_curso', type: 'INT', pk: true, notNull: true, desc: 'ID curso' },
          { name: 'id_profesor', type: 'INT', fk: 'profesores.id_profesor', notNull: true, desc: 'Profesor titular' },
          { name: 'nombre_curso', type: 'VARCHAR(80)', notNull: true, desc: 'Materia' },
          { name: 'creditos', type: 'INT', notNull: true, desc: 'Créditos' }
        ]
      },
      {
        name: 'estudiantes',
        desc: 'Alumnos matriculados.',
        fields: [
          { name: 'id_estudiante', type: 'INT', pk: true, notNull: true, desc: 'ID alumno' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre completo' },
          { name: 'rut', type: 'VARCHAR(12)', unique: true, notNull: true, desc: 'RUT' }
        ]
      },
      {
        name: 'inscripciones',
        desc: 'Tabla intermedia N:M de matrícula con calificación.',
        fields: [
          { name: 'id_inscripcion', type: 'INT', pk: true, notNull: true, desc: 'ID registro' },
          { name: 'id_estudiante', type: 'INT', fk: 'estudiantes.id_estudiante', notNull: true, desc: 'Estudiante' },
          { name: 'id_curso', type: 'INT', fk: 'cursos.id_curso', notNull: true, desc: 'Curso' },
          { name: 'semestre', type: 'VARCHAR(10)', notNull: true, desc: 'Periodo (ej. 2024-1)' },
          { name: 'nota_final', type: 'DECIMAL(3,2)', desc: 'Calificación obtenida (1.00 a 7.00)' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE profesores (
    id_profesor SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    departamento VARCHAR(60) NOT NULL
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    id_profesor INT NOT NULL,
    nombre_curso VARCHAR(80) NOT NULL,
    creditos INT NOT NULL CHECK (creditos > 0),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
);

CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    rut VARCHAR(12) UNIQUE NOT NULL
);

CREATE TABLE inscripciones (
    id_inscripcion SERIAL PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_curso INT NOT NULL,
    semestre VARCHAR(10) NOT NULL,
    nota_final DECIMAL(3,2) CHECK (nota_final BETWEEN 1.00 AND 7.00),
    UNIQUE (id_estudiante, id_curso, semestre),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante) ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO profesores (nombre, departamento) VALUES
('Dr. Alan Turing', 'Ciencias de la Computación'),
('Dra. Ada Lovelace', 'Matemáticas y Algoritmos');

INSERT INTO cursos (id_profesor, nombre_curso, creditos) VALUES
(1, 'Sistemas Operativos', 6),
(2, 'Estructuras de Datos y Grafos', 6);

INSERT INTO estudiantes (nombre, rut) VALUES
('Benjamín Torres', '18.111.222-3'),
('Ignacia Salazar', '19.333.444-5');

INSERT INTO inscripciones (id_estudiante, id_curso, semestre, nota_final) VALUES
(1, 1, '2024-1', 6.50),
(1, 2, '2024-1', 6.80),
(2, 1, '2024-1', 5.90);`,
    queriesToSolve: [
      {
        question: 'Obtener la lista de estudiantes con el nombre del curso, profesor que lo dicta y la nota final obtenida.',
        hint: 'Une inscripciones con estudiantes, cursos y profesores con INNER JOINs.',
        solutionSql: `SELECT e.nombre AS estudiante, c.nombre_curso, p.nombre AS profesor,
       i.semestre, i.nota_final,
       CASE WHEN i.nota_final >= 4.00 THEN 'APROBADO' ELSE 'REPROBADO' END AS estado_academico
FROM inscripciones i
INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
INNER JOIN cursos c ON i.id_curso = c.id_curso
INNER JOIN profesores p ON c.id_profesor = p.id_profesor
ORDER BY c.nombre_curso, i.nota_final DESC;`
      }
    ],
    checkList: [
      'Combiné relaciones 1:N y N:M en un mismo esquema relacional',
      'Garantice que un alumno no se inscriba dos veces en el mismo curso el mismo semestre',
      'Utilicé JOINs de 4 vías para generar actas de notas'
    ]
  },
  {
    id: 23,
    slug: 'db-23-cine-boletos',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Cine: Películas, Salas, Funciones y Boletos',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Una cadena de cines gestiona salas, catálogo de películas, horarios de funciones y venta de boletos por butaca.',
    statement: 'Crear el esquema relacional para evitar sobreventa de butacas en una misma función mediante restricciones de unicidad.',
    tables: [
      {
        name: 'peliculas',
        desc: 'Títulos en cartelera.',
        fields: [
          { name: 'id_pelicula', type: 'INT', pk: true, notNull: true, desc: 'ID película' },
          { name: 'titulo', type: 'VARCHAR(100)', notNull: true, desc: 'Nombre' },
          { name: 'duracion_min', type: 'INT', notNull: true, desc: 'Minutos' }
        ]
      },
      {
        name: 'salas',
        desc: 'Salas de proyección física.',
        fields: [
          { name: 'id_sala', type: 'INT', pk: true, notNull: true, desc: 'ID sala' },
          { name: 'nombre_sala', type: 'VARCHAR(30)', notNull: true, desc: 'Sala 1 IMAX, Sala 2 3D' },
          { name: 'capacidad_butacas', type: 'INT', notNull: true, desc: 'Aforo' }
        ]
      },
      {
        name: 'funciones',
        desc: 'Horario en que se proyecta una película en una sala.',
        fields: [
          { name: 'id_funcion', type: 'INT', pk: true, notNull: true, desc: 'ID función' },
          { name: 'id_pelicula', type: 'INT', fk: 'peliculas.id_pelicula', notNull: true, desc: 'Película' },
          { name: 'id_sala', type: 'INT', fk: 'salas.id_sala', notNull: true, desc: 'Sala' },
          { name: 'fecha_hora', type: 'TIMESTAMP', notNull: true, desc: 'Inicio' }
        ]
      },
      {
        name: 'boletos',
        desc: 'Entradas vendidas.',
        fields: [
          { name: 'id_boleto', type: 'INT', pk: true, notNull: true, desc: 'ID boleto' },
          { name: 'id_funcion', type: 'INT', fk: 'funciones.id_funcion', notNull: true, desc: 'Función' },
          { name: 'codigo_butaca', type: 'VARCHAR(5)', notNull: true, desc: 'Fila y Asiento (ej. A-12)' },
          { name: 'precio_pagado', type: 'DECIMAL(8,2)', notNull: true, desc: 'Valor entrada' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE peliculas (
    id_pelicula SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    duracion_min INT NOT NULL CHECK (duracion_min > 0)
);

CREATE TABLE salas (
    id_sala SERIAL PRIMARY KEY,
    nombre_sala VARCHAR(30) NOT NULL,
    capacidad_butacas INT NOT NULL CHECK (capacidad_butacas > 0)
);

CREATE TABLE funciones (
    id_funcion SERIAL PRIMARY KEY,
    id_pelicula INT NOT NULL,
    id_sala INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id_pelicula),
    FOREIGN KEY (id_sala) REFERENCES salas(id_sala)
);

CREATE TABLE boletos (
    id_boleto SERIAL PRIMARY KEY,
    id_funcion INT NOT NULL,
    codigo_butaca VARCHAR(5) NOT NULL,
    precio_pagado DECIMAL(8,2) NOT NULL CHECK (precio_pagado > 0),
    UNIQUE (id_funcion, codigo_butaca),
    FOREIGN KEY (id_funcion) REFERENCES funciones(id_funcion) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO peliculas (titulo, duracion_min) VALUES
('Interstellar', 169),
('Oppenheimer', 180);

INSERT INTO salas (nombre_sala, capacidad_butacas) VALUES
('Sala 1 - IMAX Laser', 120),
('Sala 2 - Dolby Atmos', 80);

INSERT INTO funciones (id_pelicula, id_sala, fecha_hora) VALUES
(1, 1, '2024-03-01 19:30:00'),
(2, 2, '2024-03-01 21:00:00');

INSERT INTO boletos (id_funcion, codigo_butaca, precio_pagado) VALUES
(1, 'E-10', 8500.00),
(1, 'E-11', 8500.00),
(1, 'F-05', 8500.00),
(2, 'C-04', 7000.00);`,
    queriesToSolve: [
      {
        question: 'Calcular el aforo ocupado, butacas vendidas y recaudación total por función proyectada.',
        hint: 'Une funciones con peliculas, salas y boletos usando COUNT(b.id_boleto).',
        solutionSql: `SELECT f.id_funcion, p.titulo, s.nombre_sala, f.fecha_hora,
       COUNT(b.id_boleto) AS boletos_vendidos,
       s.capacidad_butacas,
       ROUND((COUNT(b.id_boleto)::DECIMAL / s.capacidad_butacas) * 100, 1) AS porcentaje_ocupacion,
       COALESCE(SUM(b.precio_pagado), 0) AS recaudacion_total
FROM funciones f
INNER JOIN peliculas p ON f.id_pelicula = p.id_pelicula
INNER JOIN salas s ON f.id_sala = s.id_sala
LEFT JOIN boletos b ON f.id_funcion = b.id_funcion
GROUP BY f.id_funcion, p.titulo, s.nombre_sala, f.fecha_hora, s.capacidad_butacas;`
      }
    ],
    checkList: [
      'Garantice que una butaca no se venda dos veces en una misma función con UNIQUE (id_funcion, codigo_butaca)',
      'Calculé porcentajes de ocupación con funciones matemáticas',
      'Normalicé salas y horarios'
    ]
  },
  {
    id: 24,
    slug: 'db-24-rbac-seguridad',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Seguridad RBAC: Usuarios, Perfil (1:1), Roles y Permisos (N:M)',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Un sistema empresarial implementa control de acceso basado en roles (RBAC). El usuario tiene una relación 1:1 estricta con su perfil biométrico/personal, y los roles tienen permisos en relación N:M.',
    statement: 'Modelar la relación 1:1 mediante clave foránea única `id_usuario` en `perfiles` y la relación N:M entre `roles` y `permisos`.',
    tables: [
      {
        name: 'usuarios',
        desc: 'Cuentas de acceso y credenciales.',
        fields: [
          { name: 'id_usuario', type: 'INT', pk: true, notNull: true, desc: 'ID usuario' },
          { name: 'username', type: 'VARCHAR(40)', unique: true, notNull: true, desc: 'Nombre de cuenta' },
          { name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true, desc: 'Email único' },
          { name: 'id_rol', type: 'INT', fk: 'roles.id_rol', notNull: true, desc: 'Rol principal' }
        ]
      },
      {
        name: 'perfiles',
        desc: 'Relación 1:1 estricta con datos personales.',
        fields: [
          { name: 'id_perfil', type: 'INT', pk: true, notNull: true, desc: 'ID perfil' },
          { name: 'id_usuario', type: 'INT', fk: 'usuarios.id_usuario', unique: true, notNull: true, desc: '1 a 1 UNIQUE' },
          { name: 'avatar_url', type: 'VARCHAR(255)', desc: 'URL foto' },
          { name: 'telefono', type: 'VARCHAR(20)', desc: 'Teléfono' }
        ]
      },
      {
        name: 'roles',
        desc: 'Roles del sistema (Admin, Editor, Auditor).',
        fields: [
          { name: 'id_rol', type: 'INT', pk: true, notNull: true, desc: 'ID rol' },
          { name: 'nombre_rol', type: 'VARCHAR(40)', unique: true, notNull: true, desc: 'Nombre rol' }
        ]
      },
      {
        name: 'permisos',
        desc: 'Permisos atómicos (crear_usuario, borrar_post).',
        fields: [
          { name: 'id_permiso', type: 'INT', pk: true, notNull: true, desc: 'ID permiso' },
          { name: 'codigo_permiso', type: 'VARCHAR(50)', unique: true, notNull: true, desc: 'Código' }
        ]
      },
      {
        name: 'rol_permisos',
        desc: 'Tabla intermedia N:M entre roles y permisos.',
        fields: [
          { name: 'id_rol', type: 'INT', pk: true, fk: 'roles.id_rol', notNull: true, desc: 'Rol' },
          { name: 'id_permiso', type: 'INT', pk: true, fk: 'permisos.id_permiso', notNull: true, desc: 'Permiso' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE permisos (
    id_permiso SERIAL PRIMARY KEY,
    codigo_permiso VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE rol_permisos (
    id_rol INT NOT NULL,
    id_permiso INT NOT NULL,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE,
    FOREIGN KEY (id_permiso) REFERENCES permisos(id_permiso) ON DELETE CASCADE
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(40) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE perfiles (
    id_perfil SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    avatar_url VARCHAR(255),
    telefono VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO roles (nombre_rol) VALUES ('SuperAdmin'), ('Editor'), ('Viewer');

INSERT INTO permisos (codigo_permiso) VALUES
('USER_CREATE'), ('USER_DELETE'), ('POST_PUBLISH'), ('REPORT_VIEW');

INSERT INTO rol_permisos (id_rol, id_permiso) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 3), (2, 4),
(3, 4);

INSERT INTO usuarios (username, email, id_rol) VALUES
('btorres', 'admin@empresa.com', 1),
('cgonzalez', 'editor@empresa.com', 2);

INSERT INTO perfiles (id_usuario, avatar_url, telefono) VALUES
(1, 'https://cdn.empresa.com/avatars/1.png', '+56911223344'),
(2, 'https://cdn.empresa.com/avatars/2.png', '+56999887766');`,
    queriesToSolve: [
      {
        question: 'Verificar si el usuario "cgonzalez" tiene el permiso "POST_PUBLISH".',
        hint: 'Une usuarios, roles, rol_permisos y permisos comprobando u.username y p.codigo_permiso.',
        solutionSql: `SELECT u.username, r.nombre_rol, p.codigo_permiso
FROM usuarios u
INNER JOIN roles r ON u.id_rol = r.id_rol
INNER JOIN rol_permisos rp ON r.id_rol = rp.id_rol
INNER JOIN permisos p ON rp.id_permiso = p.id_permiso
WHERE u.username = 'cgonzalez' AND p.codigo_permiso = 'POST_PUBLISH';`
      }
    ],
    checkList: [
      'Implementé la relación 1:1 con restricción UNIQUE en id_usuario de perfiles',
      'Construí la tabla pivote N:M con clave primaria compuesta PRIMARY KEY (id_rol, id_permiso)',
      'Ejecuté validaciones de seguridad de RBAC'
    ]
  },
  {
    id: 25,
    slug: 'db-25-hospital-citas',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Hospital: Pacientes, Especialidades, Médicos, Citas y Recetas',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Un hospital clínico organiza sus consultas médicas: especialidades, médicos asignados, pacientes agendados y las recetas emitidas.',
    statement: 'Crear el esquema de 5 tablas interconectadas con llaves foráneas y consulta de historial clínico completo.',
    tables: [
      {
        name: 'especialidades',
        desc: 'Áreas de la medicina.',
        fields: [
          { name: 'id_especialidad', type: 'INT', pk: true, notNull: true, desc: 'ID especialidad' },
          { name: 'nombre_especialidad', type: 'VARCHAR(50)', unique: true, notNull: true, desc: 'Nombre' }
        ]
      },
      {
        name: 'medicos',
        desc: 'Doctores contratados.',
        fields: [
          { name: 'id_medico', type: 'INT', pk: true, notNull: true, desc: 'ID médico' },
          { name: 'id_especialidad', type: 'INT', fk: 'especialidades.id_especialidad', notNull: true, desc: 'Especialidad' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Doctor' }
        ]
      },
      {
        name: 'pacientes',
        desc: 'Pacientes registrados.',
        fields: [
          { name: 'id_paciente', type: 'INT', pk: true, notNull: true, desc: 'ID paciente' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'rut', type: 'VARCHAR(12)', unique: true, notNull: true, desc: 'RUT' }
        ]
      },
      {
        name: 'citas',
        desc: 'Citas médicas agendadas.',
        fields: [
          { name: 'id_cita', type: 'INT', pk: true, notNull: true, desc: 'ID cita' },
          { name: 'id_paciente', type: 'INT', fk: 'pacientes.id_paciente', notNull: true, desc: 'Paciente' },
          { name: 'id_medico', type: 'INT', fk: 'medicos.id_medico', notNull: true, desc: 'Médico' },
          { name: 'fecha_hora', type: 'TIMESTAMP', notNull: true, desc: 'Horario' }
        ]
      },
      {
        name: 'recetas',
        desc: 'Prescripciones farmacológicas de la cita.',
        fields: [
          { name: 'id_receta', type: 'INT', pk: true, notNull: true, desc: 'ID receta' },
          { name: 'id_cita', type: 'INT', fk: 'citas.id_cita', notNull: true, desc: 'Cita asociada' },
          { name: 'medicamento', type: 'VARCHAR(100)', notNull: true, desc: 'Fármaco' },
          { name: 'posologia', type: 'VARCHAR(150)', notNull: true, desc: 'Dosis e indicaciones' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE especialidades (
    id_especialidad SERIAL PRIMARY KEY,
    nombre_especialidad VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    id_especialidad INT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE pacientes (
    id_paciente SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    rut VARCHAR(12) UNIQUE NOT NULL
);

CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico)
);

CREATE TABLE recetas (
    id_receta SERIAL PRIMARY KEY,
    id_cita INT NOT NULL,
    medicamento VARCHAR(100) NOT NULL,
    posologia VARCHAR(150) NOT NULL,
    FOREIGN KEY (id_cita) REFERENCES citas(id_cita) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO especialidades (nombre_especialidad) VALUES ('Traumatología'), ('Neurología');
INSERT INTO medicos (id_especialidad, nombre) VALUES (1, 'Dr. Sergio Bitar'), (2, 'Dra. Elena Lagos');
INSERT INTO pacientes (nombre, rut) VALUES ('Nicolás Bravo', '15.678.901-2');
INSERT INTO citas (id_paciente, id_medico, fecha_hora) VALUES (1, 1, '2024-03-02 10:00:00');
INSERT INTO recetas (id_cita, medicamento, posologia) VALUES (1, 'Ibuprofeno 600mg', '1 comprimido cada 8 horas por 5 días');`,
    queriesToSolve: [
      {
        question: 'Generar la ficha de atención completa: nombre del paciente, doctor, especialidad médica y medicamentos prescritos.',
        hint: 'Une citas con pacientes, medicos, especialidades y recetas.',
        solutionSql: `SELECT p.nombre AS paciente, p.rut,
       m.nombre AS medico_tratante, e.nombre_especialidad,
       c.fecha_hora, r.medicamento, r.posologia
FROM citas c
INNER JOIN pacientes p ON c.id_paciente = p.id_paciente
INNER JOIN medicos m ON c.id_medico = m.id_medico
INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
LEFT JOIN recetas r ON c.id_cita = r.id_cita;`
      }
    ],
    checkList: [
      'Normalicé el flujo clínico en 5 tablas',
      'Configuré integridad referencial',
      'Realicé consultas diagnósticas integrales'
    ]
  },
  {
    id: 26,
    slug: 'db-26-logistica-envios',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Logística y Envíos: Remitentes, Destinatarios, Transportistas y Paquetes',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Una empresa de courier gestiona encomiendas vinculando al cliente que envía, cliente que recibe, la empresa transportista y el paquete.',
    statement: 'Crear el esquema de logística con tracking de estado (EN_BODEGA, EN_TRANSITO, ENTREGADO).',
    tables: [
      {
        name: 'personas',
        desc: 'Remitentes y destinatarios.',
        fields: [
          { name: 'id_persona', type: 'INT', pk: true, notNull: true, desc: 'ID persona' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'direccion', type: 'VARCHAR(120)', notNull: true, desc: 'Dirección' },
          { name: 'ciudad', type: 'VARCHAR(50)', notNull: true, desc: 'Ciudad' }
        ]
      },
      {
        name: 'transportistas',
        desc: 'Conductores y vehículos.',
        fields: [
          { name: 'id_transportista', type: 'INT', pk: true, notNull: true, desc: 'ID chofer' },
          { name: 'nombre_chofer', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'patente_camion', type: 'VARCHAR(8)', notNull: true, desc: 'Vehículo' }
        ]
      },
      {
        name: 'envios',
        desc: 'Orden de despacho principal.',
        fields: [
          { name: 'id_envio', type: 'INT', pk: true, notNull: true, desc: 'ID envío' },
          { name: 'codigo_seguimiento', type: 'VARCHAR(25)', unique: true, notNull: true, desc: 'Tracking' },
          { name: 'id_remitente', type: 'INT', fk: 'personas.id_persona', notNull: true, desc: 'Emisor' },
          { name: 'id_destinatario', type: 'INT', fk: 'personas.id_persona', notNull: true, desc: 'Receptor' },
          { name: 'id_transportista', type: 'INT', fk: 'transportistas.id_transportista', notNull: true, desc: 'Conductor' },
          { name: 'estado', type: 'VARCHAR(20)', defaultValue: "'EN_BODEGA'", desc: 'Estado' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE personas (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    direccion VARCHAR(120) NOT NULL,
    ciudad VARCHAR(50) NOT NULL
);

CREATE TABLE transportistas (
    id_transportista SERIAL PRIMARY KEY,
    nombre_chofer VARCHAR(80) NOT NULL,
    patente_camion VARCHAR(8) NOT NULL
);

CREATE TABLE envios (
    id_envio SERIAL PRIMARY KEY,
    codigo_seguimiento VARCHAR(25) UNIQUE NOT NULL,
    id_remitente INT NOT NULL,
    id_destinatario INT NOT NULL,
    id_transportista INT NOT NULL,
    estado VARCHAR(20) DEFAULT 'EN_BODEGA' CHECK (estado IN ('EN_BODEGA', 'EN_TRANSITO', 'ENTREGADO', 'DEVUELTO')),
    FOREIGN KEY (id_remitente) REFERENCES personas(id_persona),
    FOREIGN KEY (id_destinatario) REFERENCES personas(id_persona),
    FOREIGN KEY (id_transportista) REFERENCES transportistas(id_transportista)
);`,
    seedSql: `INSERT INTO personas (nombre, direccion, ciudad) VALUES
('Tech Store Chile', 'Av. Providencia 1234', 'Santiago'),
('Gonzalo Mardones', 'Calle Los Álamos 450', 'Temuco');

INSERT INTO transportistas (nombre_chofer, patente_camion) VALUES
('Patricio Ulloa', 'KJHG-44');

INSERT INTO envios (codigo_seguimiento, id_remitente, id_destinatario, id_transportista, estado) VALUES
('TRK-987654321', 1, 2, 1, 'EN_TRANSITO');`,
    queriesToSolve: [
      {
        question: 'Obtener la guía de despacho completa: código de seguimiento, nombre del remitente y origen, nombre del destinatario y destino, chofer y estado actual.',
        hint: 'Une dos veces a la tabla personas usando alias rem y dest.',
        solutionSql: `SELECT e.codigo_seguimiento,
       rem.nombre AS remitente, rem.ciudad AS ciudad_origen,
       dest.nombre AS destinatario, dest.direccion AS direccion_destino, dest.ciudad AS ciudad_destino,
       t.nombre_chofer AS transportista, t.patente_camion,
       e.estado
FROM envios e
INNER JOIN personas rem ON e.id_remitente = rem.id_persona
INNER JOIN personas dest ON e.id_destinatario = dest.id_persona
INNER JOIN transportistas t ON e.id_transportista = t.id_transportista;`
      }
    ],
    checkList: [
      'Manejé dos claves foráneas que apuntan a la misma tabla (remitente y destinatario)',
      'Utilicé alias de tablas independientes para joins múltiples',
      'Configuré el ciclo de estados logísticos'
    ]
  },
  {
    id: 27,
    slug: 'db-27-musica-streaming',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Streaming Musical: Artistas, Álbumes, Canciones y Playlists (N:M)',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Una app como Spotify modela artistas que publican álbumes (1:N), álbumes que contienen canciones (1:N) y usuarios que crean playlists con canciones (N:M).',
    statement: 'Crear el modelo de 5 tablas y escribir la consulta para obtener la duración total de una playlist en minutos.',
    tables: [
      {
        name: 'artistas',
        desc: 'Músicos y bandas.',
        fields: [{ name: 'id_artista', type: 'INT', pk: true, notNull: true, desc: 'ID artista' }, { name: 'nombre_artista', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' }]
      },
      {
        name: 'albumes',
        desc: 'Discos editados.',
        fields: [
          { name: 'id_album', type: 'INT', pk: true, notNull: true, desc: 'ID álbum' },
          { name: 'id_artista', type: 'INT', fk: 'artistas.id_artista', notNull: true, desc: 'Artista' },
          { name: 'titulo_album', type: 'VARCHAR(100)', notNull: true, desc: 'Título' },
          { name: 'anio', type: 'INT', notNull: true, desc: 'Año' }
        ]
      },
      {
        name: 'canciones',
        desc: 'Tracks de audio.',
        fields: [
          { name: 'id_cancion', type: 'INT', pk: true, notNull: true, desc: 'ID track' },
          { name: 'id_album', type: 'INT', fk: 'albumes.id_album', notNull: true, desc: 'Álbum' },
          { name: 'titulo', type: 'VARCHAR(100)', notNull: true, desc: 'Canción' },
          { name: 'duracion_segundos', type: 'INT', notNull: true, desc: 'Segundos' }
        ]
      },
      {
        name: 'playlists',
        desc: 'Listas creadas por usuarios.',
        fields: [{ name: 'id_playlist', type: 'INT', pk: true, notNull: true, desc: 'ID lista' }, { name: 'nombre_lista', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' }]
      },
      {
        name: 'playlist_canciones',
        desc: 'Tabla intermedia N:M entre listas y pistas.',
        fields: [
          { name: 'id_playlist', type: 'INT', pk: true, fk: 'playlists.id_playlist', notNull: true, desc: 'Playlist' },
          { name: 'id_cancion', type: 'INT', pk: true, fk: 'canciones.id_cancion', notNull: true, desc: 'Canción' },
          { name: 'orden', type: 'INT', notNull: true, desc: 'Posición' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE artistas (
    id_artista SERIAL PRIMARY KEY,
    nombre_artista VARCHAR(80) NOT NULL
);

CREATE TABLE albumes (
    id_album SERIAL PRIMARY KEY,
    id_artista INT NOT NULL,
    titulo_album VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    FOREIGN KEY (id_artista) REFERENCES artistas(id_artista) ON DELETE CASCADE
);

CREATE TABLE canciones (
    id_cancion SERIAL PRIMARY KEY,
    id_album INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    duracion_segundos INT NOT NULL CHECK (duracion_segundos > 0),
    FOREIGN KEY (id_album) REFERENCES albumes(id_album) ON DELETE CASCADE
);

CREATE TABLE playlists (
    id_playlist SERIAL PRIMARY KEY,
    nombre_lista VARCHAR(80) NOT NULL
);

CREATE TABLE playlist_canciones (
    id_playlist INT NOT NULL,
    id_cancion INT NOT NULL,
    orden INT NOT NULL,
    PRIMARY KEY (id_playlist, id_cancion),
    FOREIGN KEY (id_playlist) REFERENCES playlists(id_playlist) ON DELETE CASCADE,
    FOREIGN KEY (id_cancion) REFERENCES canciones(id_cancion) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO artistas (nombre_artista) VALUES ('Pink Floyd'), ('Daft Punk');
INSERT INTO albumes (id_artista, titulo_album, anio) VALUES (1, 'The Dark Side of the Moon', 1973), (2, 'Random Access Memories', 2013);
INSERT INTO canciones (id_album, titulo, duracion_segundos) VALUES
(1, 'Time', 413),
(1, 'Money', 382),
(2, 'Get Lucky', 369);
INSERT INTO playlists (nombre_lista) VALUES ('Mis Favoritas del Rock y Electrónica');
INSERT INTO playlist_canciones (id_playlist, id_cancion, orden) VALUES (1, 1, 1), (1, 3, 2);`,
    queriesToSolve: [
      {
        question: 'Calcular la duración total en minutos y el número de canciones de cada playlist.',
        hint: 'Une playlists con playlist_canciones y canciones calculando SUM(c.duracion_segundos) / 60.0.',
        solutionSql: `SELECT pl.nombre_lista,
       COUNT(c.id_cancion) AS total_canciones,
       SUM(c.duracion_segundos) AS duracion_total_segundos,
       ROUND(SUM(c.duracion_segundos) / 60.0, 2) AS duracion_total_minutos
FROM playlists pl
INNER JOIN playlist_canciones pc ON pl.id_playlist = pc.id_playlist
INNER JOIN canciones c ON pc.id_cancion = c.id_cancion
GROUP BY pl.id_playlist, pl.nombre_lista;`
      }
    ],
    checkList: [
      'Estructuré la jerarquía de 3 niveles (Artista → Álbum → Canción)',
      'Añadí la relación N:M con playlists y ordenación de pistas',
      'Calculé métricas temporales compuestas'
    ]
  },
  {
    id: 28,
    slug: 'db-28-biblioteca-prestamos',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Biblioteca Universitaria: Ejemplares, Préstamos y Multas (1:1)',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Una biblioteca maneja títulos de libros, copias físicas (ejemplares 1:N) y préstamos a estudiantes. Si un préstamo se devuelve con atraso, genera una multa asociada en relación 1:1 estricta.',
    statement: 'Crear el esquema relacional con clave foránea 1:1 en `multas` y calcular el monto total adeudado por morosidad.',
    tables: [
      {
        name: 'libros',
        desc: 'Títulos registrados.',
        fields: [{ name: 'id_libro', type: 'INT', pk: true, notNull: true, desc: 'ID libro' }, { name: 'titulo', type: 'VARCHAR(120)', notNull: true, desc: 'Título' }]
      },
      {
        name: 'ejemplares',
        desc: 'Copias físicas disponibles con código de barras.',
        fields: [
          { name: 'id_ejemplar', type: 'INT', pk: true, notNull: true, desc: 'ID ejemplar' },
          { name: 'id_libro', type: 'INT', fk: 'libros.id_libro', notNull: true, desc: 'Libro' },
          { name: 'codigo_barra', type: 'VARCHAR(20)', unique: true, notNull: true, desc: 'Código barra' }
        ]
      },
      {
        name: 'prestamos',
        desc: 'Préstamos realizados a usuarios.',
        fields: [
          { name: 'id_prestamo', type: 'INT', pk: true, notNull: true, desc: 'ID préstamo' },
          { name: 'id_ejemplar', type: 'INT', fk: 'ejemplares.id_ejemplar', notNull: true, desc: 'Ejemplar prestado' },
          { name: 'rut_usuario', type: 'VARCHAR(12)', notNull: true, desc: 'Usuario' },
          { name: 'fecha_prestamo', type: 'DATE', notNull: true, desc: 'Fecha salida' },
          { name: 'fecha_devolucion_pactada', type: 'DATE', notNull: true, desc: 'Fecha límite' }
        ]
      },
      {
        name: 'multas',
        desc: 'Sanción económica 1:1 por retraso en préstamo.',
        fields: [
          { name: 'id_multa', type: 'INT', pk: true, notNull: true, desc: 'ID multa' },
          { name: 'id_prestamo', type: 'INT', fk: 'prestamos.id_prestamo', unique: true, notNull: true, desc: '1 a 1 UNIQUE' },
          { name: 'dias_retraso', type: 'INT', notNull: true, desc: 'Días de atraso' },
          { name: 'monto_multa', type: 'DECIMAL(8,2)', notNull: true, desc: 'Valor sanción' },
          { name: 'pagada', type: 'BOOLEAN', defaultValue: 'FALSE', desc: 'Estado pago' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE libros (
    id_libro SERIAL PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL
);

CREATE TABLE ejemplares (
    id_ejemplar SERIAL PRIMARY KEY,
    id_libro INT NOT NULL,
    codigo_barra VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
);

CREATE TABLE prestamos (
    id_prestamo SERIAL PRIMARY KEY,
    id_ejemplar INT NOT NULL,
    rut_usuario VARCHAR(12) NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion_pactada DATE NOT NULL,
    FOREIGN KEY (id_ejemplar) REFERENCES ejemplares(id_ejemplar)
);

CREATE TABLE multas (
    id_multa SERIAL PRIMARY KEY,
    id_prestamo INT UNIQUE NOT NULL,
    dias_retraso INT NOT NULL CHECK (dias_retraso > 0),
    monto_multa DECIMAL(8,2) NOT NULL CHECK (monto_multa > 0),
    pagada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_prestamo) REFERENCES prestamos(id_prestamo) ON DELETE CASCADE
);`,
    seedSql: `INSERT INTO libros (titulo) VALUES ('Algoritmos de Inteligencia Artificial');
INSERT INTO ejemplares (id_libro, codigo_barra) VALUES (1, 'EJ-001'), (1, 'EJ-002');
INSERT INTO prestamos (id_ejemplar, rut_usuario, fecha_prestamo, fecha_devolucion_pactada) VALUES
(1, '17.888.999-1', '2024-02-01', '2024-02-15');
INSERT INTO multas (id_prestamo, dias_retraso, monto_multa, pagada) VALUES
(1, 4, 8000.00, FALSE);`,
    queriesToSolve: [
      {
        question: 'Identificar a los usuarios con multas impagas, mostrando el título del libro adeudado y el monto a cancelar.',
        hint: 'Une multas con prestamos, ejemplares y libros con WHERE m.pagada = FALSE.',
        solutionSql: `SELECT p.rut_usuario, l.titulo AS libro_adeudado, e.codigo_barra,
       m.dias_retraso, m.monto_multa
FROM multas m
INNER JOIN prestamos p ON m.id_prestamo = p.id_prestamo
INNER JOIN ejemplares e ON p.id_ejemplar = e.id_ejemplar
INNER JOIN libros l ON e.id_libro = l.id_libro
WHERE m.pagada = FALSE;`
      }
    ],
    checkList: [
      'Establecí relación 1:1 estricta mediante UNIQUE en id_prestamo',
      'Distinguí entre título bibliográfico conceptual y copias físicas (ejemplares)',
      'Consulté usuarios morosos cruzando 4 entidades'
    ]
  },
  {
    id: 29,
    slug: 'db-29-torneo-liga',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Liga de Fútbol: Equipos, Jugadores, Partidos y Estadísticas',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Una liga profesional de fútbol gestiona equipos, futbolistas, calendario de partidos entre equipo local y visitante, y el registro de goles.',
    statement: 'Crear el esquema relacional asegurando que un partido enfrente a dos equipos distintos y calcular la tabla de goleadores.',
    tables: [
      {
        name: 'equipos',
        desc: 'Clubes de fútbol.',
        fields: [{ name: 'id_equipo', type: 'INT', pk: true, notNull: true, desc: 'ID club' }, { name: 'nombre_club', type: 'VARCHAR(60)', unique: true, notNull: true, desc: 'Nombre' }]
      },
      {
        name: 'jugadores',
        desc: 'Futbolistas contratados.',
        fields: [
          { name: 'id_jugador', type: 'INT', pk: true, notNull: true, desc: 'ID jugador' },
          { name: 'id_equipo', type: 'INT', fk: 'equipos.id_equipo', notNull: true, desc: 'Club' },
          { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'posicion', type: 'VARCHAR(20)', notNull: true, desc: 'Delantero, Volante, etc.' }
        ]
      },
      {
        name: 'partidos',
        desc: 'Encuentros deportivos.',
        fields: [
          { name: 'id_partido', type: 'INT', pk: true, notNull: true, desc: 'ID partido' },
          { name: 'id_equipo_local', type: 'INT', fk: 'equipos.id_equipo', notNull: true, desc: 'Local' },
          { name: 'id_equipo_visita', type: 'INT', fk: 'equipos.id_equipo', notNull: true, desc: 'Visita' },
          { name: 'fecha_partido', type: 'DATE', notNull: true, desc: 'Fecha' }
        ]
      },
      {
        name: 'goles',
        desc: 'Registro de anotaciones.',
        fields: [
          { name: 'id_gol', type: 'INT', pk: true, notNull: true, desc: 'ID gol' },
          { name: 'id_partido', type: 'INT', fk: 'partidos.id_partido', notNull: true, desc: 'Partido' },
          { name: 'id_jugador', type: 'INT', fk: 'jugadores.id_jugador', notNull: true, desc: 'Goleador' },
          { name: 'minuto', type: 'INT', notNull: true, desc: 'Minuto de juego' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE equipos (
    id_equipo SERIAL PRIMARY KEY,
    nombre_club VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE jugadores (
    id_jugador SERIAL PRIMARY KEY,
    id_equipo INT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    posicion VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

CREATE TABLE partidos (
    id_partido SERIAL PRIMARY KEY,
    id_equipo_local INT NOT NULL,
    id_equipo_visita INT NOT NULL,
    fecha_partido DATE NOT NULL,
    CHECK (id_equipo_local <> id_equipo_visita),
    FOREIGN KEY (id_equipo_local) REFERENCES equipos(id_equipo),
    FOREIGN KEY (id_equipo_visita) REFERENCES equipos(id_equipo)
);

CREATE TABLE goles (
    id_gol SERIAL PRIMARY KEY,
    id_partido INT NOT NULL,
    id_jugador INT NOT NULL,
    minuto INT NOT NULL CHECK (minuto BETWEEN 1 AND 120),
    FOREIGN KEY (id_partido) REFERENCES partidos(id_partido) ON DELETE CASCADE,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id_jugador)
);`,
    seedSql: `INSERT INTO equipos (nombre_club) VALUES ('Colo-Colo'), ('Universidad de Chile');
INSERT INTO jugadores (id_equipo, nombre, posicion) VALUES
(1, 'Arturo Vidal', 'Volante'),
(1, 'Carlos Palacios', 'Delantero'),
(2, 'Leandro Fernández', 'Delantero');
INSERT INTO partidos (id_equipo_local, id_equipo_visita, fecha_partido) VALUES (1, 2, '2024-03-10');
INSERT INTO goles (id_partido, id_jugador, minuto) VALUES (1, 2, 34), (1, 1, 78);`,
    queriesToSolve: [
      {
        question: 'Generar la tabla de goleadores del torneo con nombre del jugador, club y total de goles anotados.',
        hint: 'Une jugadores con equipos y goles, agrupando por jugador.',
        solutionSql: `SELECT j.nombre AS jugador, e.nombre_club AS equipo, j.posicion,
       COUNT(g.id_gol) AS total_goles
FROM jugadores j
INNER JOIN equipos e ON j.id_equipo = e.id_equipo
INNER JOIN goles g ON j.id_jugador = g.id_jugador
GROUP BY j.id_jugador, j.nombre, e.nombre_club, j.posicion
ORDER BY total_goles DESC;`
      }
    ],
    checkList: [
      'Validé que un equipo no juegue contra sí mismo con CHECK (id_equipo_local <> id_equipo_visita)',
      'Relacioné claves foráneas de doble vía a la misma tabla',
      'Calculé tablas de posiciones y estadísticas'
    ]
  },
  {
    id: 30,
    slug: 'db-30-restaurante-comandas',
    block: 3,
    blockTitle: 'Esquemas Multi-Tabla (1:1, 1:N y N:M)',
    title: 'Restaurante: Mesas, Meseros, Comandas y Receta_Plato (N:M)',
    level: 'Avanzado',
    badgeColor: '#8b5cf6',
    context: 'Un restaurante gourmet administra mesas, meseros que atienden comandas, platos pedidos y los ingredientes que componen cada receta (N:M).',
    statement: 'Crear el esquema completo para determinar el consumo por mesa y descontar insumos de inventario.',
    tables: [
      {
        name: 'meseros',
        desc: 'Personal de atención en salón.',
        fields: [{ name: 'id_mesero', type: 'INT', pk: true, notNull: true, desc: 'ID mesero' }, { name: 'nombre', type: 'VARCHAR(60)', notNull: true, desc: 'Nombre' }]
      },
      {
        name: 'comandas',
        desc: 'Orden de consumo de una mesa.',
        fields: [
          { name: 'id_comanda', type: 'INT', pk: true, notNull: true, desc: 'ID comanda' },
          { name: 'numero_mesa', type: 'INT', notNull: true, desc: 'Mesa' },
          { name: 'id_mesero', type: 'INT', fk: 'meseros.id_mesero', notNull: true, desc: 'Mesero a cargo' },
          { name: 'hora_apertura', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP', desc: 'Apertura' }
        ]
      },
      {
        name: 'platos',
        desc: 'Menú disponible.',
        fields: [
          { name: 'id_plato', type: 'INT', pk: true, notNull: true, desc: 'ID plato' },
          { name: 'nombre_plato', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' },
          { name: 'precio', type: 'DECIMAL(8,2)', notNull: true, desc: 'Precio' }
        ]
      },
      {
        name: 'detalle_comanda',
        desc: 'Platos solicitados en la orden (N:M).',
        fields: [
          { name: 'id_comanda', type: 'INT', pk: true, fk: 'comandas.id_comanda', notNull: true, desc: 'Comanda' },
          { name: 'id_plato', type: 'INT', pk: true, fk: 'platos.id_plato', notNull: true, desc: 'Plato' },
          { name: 'cantidad', type: 'INT', notNull: true, desc: 'Cantidad' }
        ]
      }
    ],
    ddlSql: `CREATE TABLE meseros (
    id_mesero SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

CREATE TABLE comandas (
    id_comanda SERIAL PRIMARY KEY,
    numero_mesa INT NOT NULL CHECK (numero_mesa > 0),
    id_mesero INT NOT NULL,
    hora_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_mesero) REFERENCES meseros(id_mesero)
);

CREATE TABLE platos (
    id_plato SERIAL PRIMARY KEY,
    nombre_plato VARCHAR(80) NOT NULL,
    precio DECIMAL(8,2) NOT NULL CHECK (precio > 0)
);

CREATE TABLE detalle_comanda (
    id_comanda INT NOT NULL,
    id_plato INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    PRIMARY KEY (id_comanda, id_plato),
    FOREIGN KEY (id_comanda) REFERENCES comandas(id_comanda) ON DELETE CASCADE,
    FOREIGN KEY (id_plato) REFERENCES platos(id_plato)
);`,
    seedSql: `INSERT INTO meseros (nombre) VALUES ('Matías Correa');
INSERT INTO platos (nombre_plato, precio) VALUES
('Risotto de Champiñones', 13900.00),
('Salmón a la Plancha', 16500.00),
('Copa de Vino Reserva', 4500.00);
INSERT INTO comandas (numero_mesa, id_mesero) VALUES (4, 1);
INSERT INTO detalle_comanda (id_comanda, id_plato, cantidad) VALUES (1, 1, 1), (1, 2, 1), (1, 3, 2);`,
    queriesToSolve: [
      {
        question: 'Calcular la cuenta total a pagar en la mesa 4 (comanda 1) con propina sugerida del 10%.',
        hint: 'Suma dc.cantidad * p.precio y multiplica por 1.10.',
        solutionSql: `SELECT c.id_comanda, c.numero_mesa, m.nombre AS mesero_atendio,
       SUM(dc.cantidad * p.precio) AS subtotal_neto,
       ROUND(SUM(dc.cantidad * p.precio) * 0.10, 2) AS propina_sugerida_10pct,
       ROUND(SUM(dc.cantidad * p.precio) * 1.10, 2) AS total_final_con_propina
FROM comandas c
INNER JOIN meseros m ON c.id_mesero = m.id_mesero
INNER JOIN detalle_comanda dc ON c.id_comanda = dc.id_comanda
INNER JOIN platos p ON dc.id_plato = p.id_plato
WHERE c.id_comanda = 1
GROUP BY c.id_comanda, c.numero_mesa, m.nombre;`
      }
    ],
    checkList: [
      'Modelé comandas gastronómicas con relaciones N:M',
      'Calculé totales de cuentas y propinas con precisión decimal',
      'Gestioné pedidos en tiempo real'
    ]
  },

  // ==========================================
  // BLOQUE 4: CASOS EMPRESARIALES DE 10 TABLAS (31 a 40)
  // ==========================================
  {
    id: 31,
    slug: 'db-31-mega-ecommerce',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Mega E-Commerce Omnicanal Global (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una multinacional de comercio electrónico diseña su arquitectura de base de datos relacional para gestionar usuarios, perfiles, direcciones de despacho, categorías de productos, catálogo, inventario en bodegas múltiples, órdenes de compra, ítems del pedido, métodos de pago y transacciones de pasarela.',
    statement: 'Diseñar e implementar el esquema completo de 10 tablas interconectadas con llaves primarias, foráneas, índices, restricciones de integridad y consultas analíticas de reportería gerencial.',
    tables: [
      { name: 'usuarios', desc: 'Cuentas de usuario', fields: [{ name: 'id_usuario', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'email', type: 'VARCHAR(120)', unique: true, notNull: true, desc: 'Email único' }, { name: 'password_hash', type: 'VARCHAR(255)', notNull: true, desc: 'Hash seguro' }] },
      { name: 'perfiles', desc: 'Datos personales 1:1', fields: [{ name: 'id_perfil', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', unique: true, desc: '1:1' }, { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' }, { name: 'telefono', type: 'VARCHAR(20)', desc: 'Fono' }] },
      { name: 'direcciones', desc: 'Direcciones de envío (1:N)', fields: [{ name: 'id_direccion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Usuario' }, { name: 'calle', type: 'VARCHAR(150)', notNull: true, desc: 'Calle' }, { name: 'ciudad', type: 'VARCHAR(60)', notNull: true, desc: 'Ciudad' }] },
      { name: 'categorias', desc: 'Árbol de categorías', fields: [{ name: 'id_categoria', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_categoria', type: 'VARCHAR(60)', unique: true, notNull: true, desc: 'Nombre' }] },
      { name: 'productos', desc: 'Catálogo comercial', fields: [{ name: 'id_producto', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_categoria', type: 'INT', fk: 'categorias.id_categoria', desc: 'Categoría' }, { name: 'sku', type: 'VARCHAR(30)', unique: true, desc: 'SKU' }, { name: 'precio', type: 'DECIMAL(12,2)', notNull: true, desc: 'Precio' }] },
      { name: 'inventario_bodega', desc: 'Stock físico por bodega', fields: [{ name: 'id_inventario', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_producto', type: 'BIGINT', fk: 'productos.id_producto', desc: 'Producto' }, { name: 'bodega_codigo', type: 'VARCHAR(20)', desc: 'Bodega' }, { name: 'stock_disponible', type: 'INT', notNull: true, desc: 'Stock' }] },
      { name: 'pedidos', desc: 'Órdenes de compra', fields: [{ name: 'id_pedido', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Comprador' }, { name: 'id_direccion_envio', type: 'BIGINT', fk: 'direcciones.id_direccion', desc: 'Destino' }, { name: 'monto_total', type: 'DECIMAL(12,2)', notNull: true, desc: 'Total' }] },
      { name: 'detalle_pedidos', desc: 'Líneas de la orden N:M', fields: [{ name: 'id_detalle', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_pedido', type: 'BIGINT', fk: 'pedidos.id_pedido', desc: 'Pedido' }, { name: 'id_producto', type: 'BIGINT', fk: 'productos.id_producto', desc: 'Producto' }, { name: 'cantidad', type: 'INT', notNull: true, desc: 'Cantidad' }, { name: 'precio_unitario', type: 'DECIMAL(12,2)', notNull: true, desc: 'Precio' }] },
      { name: 'metodos_pago', desc: 'Medios aceptados', fields: [{ name: 'id_metodo', type: 'INT', pk: true, desc: 'PK' }, { name: 'codigo', type: 'VARCHAR(30)', unique: true, notNull: true, desc: 'WEBPAY, STRIPE, PAYPAL' }] },
      { name: 'pagos_transaccion', desc: 'Bitácora de cobros', fields: [{ name: 'id_pago', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_pedido', type: 'BIGINT', fk: 'pedidos.id_pedido', desc: 'Pedido' }, { name: 'id_metodo', type: 'INT', fk: 'metodos_pago.id_metodo', desc: 'Método' }, { name: 'monto_pagado', type: 'DECIMAL(12,2)', notNull: true, desc: 'Monto' }, { name: 'estado_pago', type: 'VARCHAR(20)', desc: 'APROBADO, RECHAZADO' }] }
    ],
    ddlSql: `-- 1. Usuarios y Perfiles (1:1)
CREATE TABLE usuarios (
    id_usuario BIGSERIAL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfiles (
    id_perfil BIGSERIAL PRIMARY KEY,
    id_usuario BIGINT UNIQUE NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    telefono VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- 2. Direcciones
CREATE TABLE direcciones (
    id_direccion BIGSERIAL PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    calle VARCHAR(150) NOT NULL,
    ciudad VARCHAR(60) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE
);

-- 3. Categorías y Productos
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE productos (
    id_producto BIGSERIAL PRIMARY KEY,
    id_categoria INT NOT NULL,
    sku VARCHAR(30) UNIQUE NOT NULL,
    nombre_producto VARCHAR(120) NOT NULL,
    precio DECIMAL(12,2) NOT NULL CHECK (precio > 0),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- 4. Inventario Multibodega
CREATE TABLE inventario_bodega (
    id_inventario BIGSERIAL PRIMARY KEY,
    id_producto BIGINT NOT NULL,
    bodega_codigo VARCHAR(20) NOT NULL,
    stock_disponible INT NOT NULL CHECK (stock_disponible >= 0),
    UNIQUE (id_producto, bodega_codigo),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- 5. Pedidos y Detalle (N:M)
CREATE TABLE pedidos (
    id_pedido BIGSERIAL PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    id_direccion_envio BIGINT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    monto_total DECIMAL(12,2) NOT NULL CHECK (monto_total >= 0),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_direccion_envio) REFERENCES direcciones(id_direccion)
);

CREATE TABLE detalle_pedidos (
    id_detalle BIGSERIAL PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    id_producto BIGINT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(12,2) NOT NULL CHECK (precio_unitario > 0),
    UNIQUE (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- 6. Pasarela y Transacciones
CREATE TABLE metodos_pago (
    id_metodo SERIAL PRIMARY KEY,
    codigo VARCHAR(30) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE pagos_transaccion (
    id_pago BIGSERIAL PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    id_metodo INT NOT NULL,
    monto_pagado DECIMAL(12,2) NOT NULL,
    estado_pago VARCHAR(20) DEFAULT 'APROBADO' CHECK (estado_pago IN ('APROBADO', 'RECHAZADO', 'PENDIENTE')),
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_metodo) REFERENCES metodos_pago(id_metodo)
);`,
    seedSql: `INSERT INTO usuarios (email, password_hash) VALUES ('cliente1@gmail.com', '$2b$12$hash1'), ('cliente2@gmail.com', '$2b$12$hash2');
INSERT INTO perfiles (id_usuario, nombre, telefono) VALUES (1, 'Andrea Riquelme', '+56912345678'), (2, 'Claudio Bravo', '+56987654321');
INSERT INTO direcciones (id_usuario, calle, ciudad) VALUES (1, 'Av. Las Condes 5000', 'Santiago');
INSERT INTO categorias (nombre_categoria) VALUES ('Electrónica y Audio');
INSERT INTO productos (id_categoria, sku, nombre_producto, precio) VALUES (1, 'AUD-SONY-01', 'Audífonos Bluetooth Noise Cancelling', 249990.00);
INSERT INTO inventario_bodega (id_producto, bodega_codigo, stock_disponible) VALUES (1, 'BOD-CENTRAL', 45), (1, 'BOD-NORTE', 15);
INSERT INTO pedidos (id_usuario, id_direccion_envio, monto_total) VALUES (1, 1, 249990.00);
INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (1, 1, 1, 249990.00);
INSERT INTO metodos_pago (codigo, nombre) VALUES ('WEBPAY_PLUS', 'Transbank Webpay Plus');
INSERT INTO pagos_transaccion (id_pedido, id_metodo, monto_pagado, estado_pago) VALUES (1, 1, 249990.00, 'APROBADO');`,
    queriesToSolve: [
      {
        question: 'Generar la vista ejecutiva de auditoría de compras: ID Pedido, Fecha, Nombre y Email del Comprador, Dirección de Entrega, Ciudad, SKU y Nombre de Productos, Cantidad, Método de Pago y Estado.',
        hint: 'Une pedidos con usuarios, perfiles, direcciones, detalle_pedidos, productos, pagos_transaccion y metodos_pago.',
        solutionSql: `SELECT p.id_pedido, p.fecha_pedido,
       perf.nombre AS comprador, u.email,
       d.calle || ', ' || d.ciudad AS direccion_completa,
       prod.sku, prod.nombre_producto, dp.cantidad, dp.precio_unitario,
       mp.nombre AS metodo_de_pago, pt.estado_pago
FROM pedidos p
INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
INNER JOIN perfiles perf ON u.id_usuario = perf.id_usuario
INNER JOIN direcciones d ON p.id_direccion_envio = d.id_direccion
INNER JOIN detalle_pedidos dp ON p.id_pedido = dp.id_pedido
INNER JOIN productos prod ON dp.id_producto = prod.id_producto
INNER JOIN pagos_transaccion pt ON p.id_pedido = pt.id_pedido
INNER JOIN metodos_pago mp ON pt.id_metodo = mp.id_metodo
ORDER BY p.fecha_pedido DESC;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del sistema global de e-commerce',
      'Configuré integridad referencial cruzada (1:1, 1:N y N:M)',
      'Ejecuté joins de auditoría transversal en todo el ecosistema'
    ]
  },
  {
    id: 32,
    slug: 'db-32-sistema-hospitalario',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Sistema Integral Hospitalario y Farmacéutico (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Un complejo hospitalario clínico gestiona pacientes, historiales clínicos 1:1, médicos, especialidades, turnos de guardia, citas médicas, diagnósticos CIE-10, catálogo de medicamentos, recetas médicas y dispensaciones de farmacia.',
    statement: 'Crear el esquema relacional hospitalario de 10 tablas y formular la consulta de trazabilidad de medicamentos dispensados a pacientes.',
    tables: [
      { name: 'pacientes', desc: 'Ficha paciente', fields: [{ name: 'id_paciente', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'rut', type: 'VARCHAR(12)', unique: true, desc: 'RUT' }, { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Nombre' }] },
      { name: 'historiales_clinicos', desc: 'Expediente 1:1', fields: [{ name: 'id_historial', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_paciente', type: 'BIGINT', fk: 'pacientes.id_paciente', unique: true, desc: '1:1' }, { name: 'grupo_sangre', type: 'VARCHAR(3)', desc: 'Sangre' }] },
      { name: 'especialidades', desc: 'Especialidades', fields: [{ name: 'id_especialidad', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_especialidad', type: 'VARCHAR(60)', unique: true, desc: 'Nombre' }] },
      { name: 'medicos', desc: 'Personal médico', fields: [{ name: 'id_medico', type: 'INT', pk: true, desc: 'PK' }, { name: 'id_especialidad', type: 'INT', fk: 'especialidades.id_especialidad', desc: 'Especialidad' }, { name: 'nombre', type: 'VARCHAR(80)', notNull: true, desc: 'Doctor' }] },
      { name: 'turnos_guardia', desc: 'Guardias de médicos', fields: [{ name: 'id_turno', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_medico', type: 'INT', fk: 'medicos.id_medico', desc: 'Médico' }, { name: 'fecha', type: 'DATE', notNull: true, desc: 'Fecha' }] },
      { name: 'citas_medicas', desc: 'Citas y consultas', fields: [{ name: 'id_cita', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_paciente', type: 'BIGINT', fk: 'pacientes.id_paciente', desc: 'Paciente' }, { name: 'id_medico', type: 'INT', fk: 'medicos.id_medico', desc: 'Médico' }, { name: 'fecha_hora', type: 'TIMESTAMP', notNull: true, desc: 'Hora' }] },
      { name: 'diagnosticos', desc: 'Dictámenes CIE-10', fields: [{ name: 'id_diagnostico', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cita', type: 'BIGINT', fk: 'citas_medicas.id_cita', desc: 'Cita' }, { name: 'codigo_cie10', type: 'VARCHAR(10)', notNull: true, desc: 'CIE-10' }] },
      { name: 'medicamentos', desc: 'Stock farmacológico', fields: [{ name: 'id_medicamento', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_generico', type: 'VARCHAR(100)', unique: true, desc: 'Fármaco' }, { name: 'stock', type: 'INT', notNull: true, desc: 'Stock' }] },
      { name: 'recetas', desc: 'Prescripciones', fields: [{ name: 'id_receta', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cita', type: 'BIGINT', fk: 'citas_medicas.id_cita', desc: 'Cita' }, { name: 'id_medicamento', type: 'INT', fk: 'medicamentos.id_medicamento', desc: 'Fármaco' }, { name: 'dosis', type: 'VARCHAR(100)', desc: 'Dosis' }] },
      { name: 'dispensaciones_farmacia', desc: 'Entrega en farmacia', fields: [{ name: 'id_dispensacion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_receta', type: 'BIGINT', fk: 'recetas.id_receta', desc: 'Receta' }, { name: 'cantidad_entregada', type: 'INT', notNull: true, desc: 'Unidades' }, { name: 'fecha_entrega', type: 'TIMESTAMP', desc: 'Timestamp' }] }
    ],
    ddlSql: `CREATE TABLE pacientes (
    id_paciente BIGSERIAL PRIMARY KEY,
    rut VARCHAR(12) UNIQUE NOT NULL,
    nombre VARCHAR(80) NOT NULL
);

CREATE TABLE historiales_clinicos (
    id_historial BIGSERIAL PRIMARY KEY,
    id_paciente BIGINT UNIQUE NOT NULL,
    grupo_sangre VARCHAR(3) NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente) ON DELETE CASCADE
);

CREATE TABLE especialidades (
    id_especialidad SERIAL PRIMARY KEY,
    nombre_especialidad VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE medicos (
    id_medico SERIAL PRIMARY KEY,
    id_especialidad INT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE turnos_guardia (
    id_turno BIGSERIAL PRIMARY KEY,
    id_medico INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico)
);

CREATE TABLE citas_medicas (
    id_cita BIGSERIAL PRIMARY KEY,
    id_paciente BIGINT NOT NULL,
    id_medico INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico)
);

CREATE TABLE diagnosticos (
    id_diagnostico BIGSERIAL PRIMARY KEY,
    id_cita BIGINT NOT NULL,
    codigo_cie10 VARCHAR(10) NOT NULL,
    descripcion TEXT NOT NULL,
    FOREIGN KEY (id_cita) REFERENCES citas_medicas(id_cita)
);

CREATE TABLE medicamentos (
    id_medicamento SERIAL PRIMARY KEY,
    nombre_generico VARCHAR(100) UNIQUE NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE recetas (
    id_receta BIGSERIAL PRIMARY KEY,
    id_cita BIGINT NOT NULL,
    id_medicamento INT NOT NULL,
    dosis VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_cita) REFERENCES citas_medicas(id_cita),
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento)
);

CREATE TABLE dispensaciones_farmacia (
    id_dispensacion BIGSERIAL PRIMARY KEY,
    id_receta BIGINT NOT NULL,
    cantidad_entregada INT NOT NULL CHECK (cantidad_entregada > 0),
    fecha_entrega TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_receta) REFERENCES recetas(id_receta)
);`,
    seedSql: `INSERT INTO pacientes (rut, nombre) VALUES ('12.345.678-9', 'Mario Hugo');
INSERT INTO historiales_clinicos (id_paciente, grupo_sangre) VALUES (1, 'O+');
INSERT INTO especialidades (nombre_especialidad) VALUES ('Medicina Interna');
INSERT INTO medicos (id_especialidad, nombre) VALUES (1, 'Dr. Juan Carlos Bodoque');
INSERT INTO turnos_guardia (id_medico, fecha) VALUES (1, '2024-03-05');
INSERT INTO citas_medicas (id_paciente, id_medico, fecha_hora) VALUES (1, 1, '2024-03-05 11:30:00');
INSERT INTO diagnosticos (id_cita, codigo_cie10, descripcion) VALUES (1, 'J00', 'Rinofaringitis aguda (resfriado común)');
INSERT INTO medicamentos (nombre_generico, stock) VALUES ('Paracetamol 500mg', 1000);
INSERT INTO recetas (id_cita, id_medicamento, dosis) VALUES (1, 1, '1 cada 8 horas por 3 días');
INSERT INTO dispensaciones_farmacia (id_receta, cantidad_entregada) VALUES (1, 16);`,
    queriesToSolve: [
      {
        question: 'Trazabilidad de entrega de fármacos: RUT y Nombre Paciente, Médico Emisor, Especialidad, Diagnóstico CIE-10, Medicamento y Cantidad Entregada en Farmacia.',
        hint: 'Une las 10 tablas para armar la pista de auditoría clínica.',
        solutionSql: `SELECT p.rut, p.nombre AS paciente,
       m.nombre AS medico, e.nombre_especialidad,
       d.codigo_cie10, d.descripcion AS diagnostico,
       med.nombre_generico AS medicamento,
       df.cantidad_entregada, df.fecha_entrega
FROM dispensaciones_farmacia df
INNER JOIN recetas r ON df.id_receta = r.id_receta
INNER JOIN medicamentos med ON r.id_medicamento = med.id_medicamento
INNER JOIN citas_medicas cm ON r.id_cita = cm.id_cita
INNER JOIN pacientes p ON cm.id_paciente = p.id_paciente
INNER JOIN medicos m ON cm.id_medico = m.id_medico
INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
INNER JOIN diagnosticos d ON cm.id_cita = d.id_cita;`
      }
    ],
    checkList: [
      'Modelé el ecosistema de 10 tablas clínicas',
      'Conecté atención médica, prescripción y despacho en bodega de farmacia',
      'Construí consultas de trazabilidad médica'
    ]
  },
  {
    id: 33,
    slug: 'db-33-lms-educativo',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Plataforma Educativa LMS / Universidad Virtual (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una plataforma tipo Platzi/Canvas estructura instituciones, usuarios, roles, carreras, cursos, módulos, lecciones de video, inscripciones, evaluaciones y calificaciones.',
    statement: 'Crear el esquema educativo de 10 tablas y calcular el promedio ponderado de calificaciones de los estudiantes en cada curso.',
    tables: [
      { name: 'instituciones', desc: 'Universidad / Academia', fields: [{ name: 'id_institucion', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_institucion', type: 'VARCHAR(100)', unique: true, desc: 'Nombre' }] },
      { name: 'roles', desc: 'Docente, Alumno, Tutor', fields: [{ name: 'id_rol', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_rol', type: 'VARCHAR(30)', unique: true, desc: 'Rol' }] },
      { name: 'usuarios', desc: 'Usuarios registrados', fields: [{ name: 'id_usuario', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_institucion', type: 'INT', fk: 'instituciones.id_institucion', desc: 'Institución' }, { name: 'id_rol', type: 'INT', fk: 'roles.id_rol', desc: 'Rol' }, { name: 'email', type: 'VARCHAR(100)', unique: true, desc: 'Email' }] },
      { name: 'carreras', desc: 'Programas de estudio', fields: [{ name: 'id_carrera', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_carrera', type: 'VARCHAR(80)', desc: 'Carrera' }] },
      { name: 'cursos', desc: 'Cursos', fields: [{ name: 'id_curso', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_carrera', type: 'INT', fk: 'carreras.id_carrera', desc: 'Carrera' }, { name: 'titulo', type: 'VARCHAR(100)', desc: 'Título' }] },
      { name: 'modulos', desc: 'Unidades temáticas', fields: [{ name: 'id_modulo', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_curso', type: 'BIGINT', fk: 'cursos.id_curso', desc: 'Curso' }, { name: 'titulo_modulo', type: 'VARCHAR(80)', desc: 'Módulo' }] },
      { name: 'lecciones', desc: 'Videos y contenidos', fields: [{ name: 'id_leccion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_modulo', type: 'BIGINT', fk: 'modulos.id_modulo', desc: 'Módulo' }, { name: 'titulo_leccion', type: 'VARCHAR(100)', desc: 'Lección' }] },
      { name: 'inscripciones', desc: 'Matrículas N:M', fields: [{ name: 'id_inscripcion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Alumno' }, { name: 'id_curso', type: 'BIGINT', fk: 'cursos.id_curso', desc: 'Curso' }] },
      { name: 'evaluaciones', desc: 'Pruebas / Exámenes', fields: [{ name: 'id_evaluacion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_curso', type: 'BIGINT', fk: 'cursos.id_curso', desc: 'Curso' }, { name: 'ponderacion', type: 'DECIMAL(4,2)', desc: 'Ponderación (0 a 100%)' }] },
      { name: 'calificaciones', desc: 'Notas obtenidas', fields: [{ name: 'id_calificacion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_inscripcion', type: 'BIGINT', fk: 'inscripciones.id_inscripcion', desc: 'Inscripción' }, { name: 'id_evaluacion', type: 'BIGINT', fk: 'evaluaciones.id_evaluacion', desc: 'Evaluación' }, { name: 'nota', type: 'DECIMAL(3,2)', desc: 'Nota (1 a 7)' }] }
    ],
    ddlSql: `CREATE TABLE instituciones (id_institucion SERIAL PRIMARY KEY, nombre_institucion VARCHAR(100) UNIQUE NOT NULL);
CREATE TABLE roles (id_rol SERIAL PRIMARY KEY, nombre_rol VARCHAR(30) UNIQUE NOT NULL);
CREATE TABLE usuarios (id_usuario BIGSERIAL PRIMARY KEY, id_institucion INT NOT NULL, id_rol INT NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL, FOREIGN KEY (id_institucion) REFERENCES instituciones(id_institucion), FOREIGN KEY (id_rol) REFERENCES roles(id_rol));
CREATE TABLE carreras (id_carrera SERIAL PRIMARY KEY, nombre_carrera VARCHAR(80) NOT NULL);
CREATE TABLE cursos (id_curso BIGSERIAL PRIMARY KEY, id_carrera INT NOT NULL, titulo VARCHAR(100) NOT NULL, FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera));
CREATE TABLE modulos (id_modulo BIGSERIAL PRIMARY KEY, id_curso BIGINT NOT NULL, titulo_modulo VARCHAR(80) NOT NULL, FOREIGN KEY (id_curso) REFERENCES cursos(id_curso) ON DELETE CASCADE);
CREATE TABLE lecciones (id_leccion BIGSERIAL PRIMARY KEY, id_modulo BIGINT NOT NULL, titulo_leccion VARCHAR(100) NOT NULL, duracion_min INT NOT NULL, FOREIGN KEY (id_modulo) REFERENCES modulos(id_modulo) ON DELETE CASCADE);
CREATE TABLE inscripciones (id_inscripcion BIGSERIAL PRIMARY KEY, id_usuario BIGINT NOT NULL, id_curso BIGINT NOT NULL, UNIQUE (id_usuario, id_curso), FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario), FOREIGN KEY (id_curso) REFERENCES cursos(id_curso));
CREATE TABLE evaluaciones (id_evaluacion BIGSERIAL PRIMARY KEY, id_curso BIGINT NOT NULL, nombre_evaluacion VARCHAR(60) NOT NULL, ponderacion DECIMAL(4,2) NOT NULL, FOREIGN KEY (id_curso) REFERENCES cursos(id_curso));
CREATE TABLE calificaciones (id_calificacion BIGSERIAL PRIMARY KEY, id_inscripcion BIGINT NOT NULL, id_evaluacion BIGINT NOT NULL, nota DECIMAL(3,2) NOT NULL CHECK (nota BETWEEN 1.00 AND 7.00), UNIQUE (id_inscripcion, id_evaluacion), FOREIGN KEY (id_inscripcion) REFERENCES inscripciones(id_inscripcion) ON DELETE CASCADE, FOREIGN KEY (id_evaluacion) REFERENCES evaluaciones(id_evaluacion));`,
    seedSql: `INSERT INTO instituciones (nombre_institucion) VALUES ('Tech Academy Global');
INSERT INTO roles (nombre_rol) VALUES ('Estudiante');
INSERT INTO usuarios (id_institucion, id_rol, email, nombre) VALUES (1, 1, 'alumno@tech.com', 'Lucas Prado');
INSERT INTO carreras (nombre_carrera) VALUES ('Ingeniería de Software');
INSERT INTO cursos (id_carrera, titulo) VALUES (1, 'Bases de Datos Relacionales y SQL');
INSERT INTO modulos (id_curso, titulo_modulo) VALUES (1, 'Módulo 1: Modelamiento Entidad-Relación');
INSERT INTO lecciones (id_modulo, titulo_leccion, duracion_min) VALUES (1, 'Normalización hasta 3FN', 45);
INSERT INTO inscripciones (id_usuario, id_curso) VALUES (1, 1);
INSERT INTO evaluaciones (id_curso, nombre_evaluacion, ponderacion) VALUES (1, 'Certamen 1 - DDL y DML', 50.00), (1, 'Proyecto Integrador SQL', 50.00);
INSERT INTO calificaciones (id_inscripcion, id_evaluacion, nota) VALUES (1, 1, 6.50), (1, 2, 7.00);`,
    queriesToSolve: [
      {
        question: 'Calcular la nota final ponderada de cada estudiante en sus cursos inscritos.',
        hint: 'Suma (cal.nota * (ev.ponderacion / 100.0)).',
        solutionSql: `SELECT u.nombre AS estudiante, u.email, c.titulo AS curso,
       ROUND(SUM(cal.nota * (ev.ponderacion / 100.0)), 2) AS nota_final_ponderada
FROM inscripciones i
INNER JOIN usuarios u ON i.id_usuario = u.id_usuario
INNER JOIN cursos c ON i.id_curso = c.id_curso
INNER JOIN calificaciones cal ON i.id_inscripcion = cal.id_inscripcion
INNER JOIN evaluaciones ev ON cal.id_evaluacion = ev.id_evaluacion
GROUP BY i.id_inscripcion, u.nombre, u.email, c.titulo;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del LMS universitario',
      'Configuré jerarquía curricular y evaluaciones ponderadas',
      'Calculé notas finales ponderadas en SQL'
    ]
  },
  {
    id: 34,
    slug: 'db-34-sistema-bancario',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Sistema Bancario y Financiero Multi-Divisa (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una institución bancaria diseña su núcleo transaccional: clientes, sucursales físicas, empleados bancarios, cuentas de ahorro/corriente, tipos de cuenta, tarjetas de débito/crédito, transacciones de saldo, transferencias interbancarias, créditos/préstamos otorgados y cuotas de pago.',
    statement: 'Implementar el esquema bancario de 10 tablas con validaciones ACID y reporte de saldos consolidados.',
    tables: [
      { name: 'sucursales', desc: 'Oficinas', fields: [{ name: 'id_sucursal', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_sucursal', type: 'VARCHAR(60)', desc: 'Nombre' }] },
      { name: 'empleados', desc: 'Ejecutivos', fields: [{ name: 'id_empleado', type: 'INT', pk: true, desc: 'PK' }, { name: 'id_sucursal', type: 'INT', fk: 'sucursales.id_sucursal', desc: 'Sucursal' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }] },
      { name: 'clientes', desc: 'Titulares', fields: [{ name: 'id_cliente', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'rut', type: 'VARCHAR(12)', unique: true, desc: 'RUT' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }] },
      { name: 'tipos_cuenta', desc: 'Corriente, Ahorro', fields: [{ name: 'id_tipo_cuenta', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_tipo', type: 'VARCHAR(40)', unique: true, desc: 'Tipo' }] },
      { name: 'cuentas', desc: 'Cuentas bancarias', fields: [{ name: 'id_cuenta', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cliente', type: 'BIGINT', fk: 'clientes.id_cliente', desc: 'Cliente' }, { name: 'id_tipo_cuenta', type: 'INT', fk: 'tipos_cuenta.id_tipo_cuenta', desc: 'Tipo' }, { name: 'saldo', type: 'DECIMAL(14,2)', notNull: true, desc: 'Saldo' }] },
      { name: 'tarjetas', desc: 'Plásticos emitidos', fields: [{ name: 'id_tarjeta', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cuenta', type: 'BIGINT', fk: 'cuentas.id_cuenta', desc: 'Cuenta' }, { name: 'numero_tarjeta_mask', type: 'VARCHAR(20)', desc: 'Tarjeta' }] },
      { name: 'transacciones', desc: 'Movimientos de saldo', fields: [{ name: 'id_transaccion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cuenta', type: 'BIGINT', fk: 'cuentas.id_cuenta', desc: 'Cuenta' }, { name: 'monto', type: 'DECIMAL(14,2)', desc: 'Monto' }] },
      { name: 'transferencias_interbancarias', desc: 'Transferencias', fields: [{ name: 'id_transferencia', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cuenta_origen', type: 'BIGINT', fk: 'cuentas.id_cuenta', desc: 'Origen' }, { name: 'id_cuenta_destino', type: 'BIGINT', fk: 'cuentas.id_cuenta', desc: 'Destino' }] },
      { name: 'creditos_prestamos', desc: 'Créditos aprobados', fields: [{ name: 'id_credito', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cliente', type: 'BIGINT', fk: 'clientes.id_cliente', desc: 'Deudor' }, { name: 'monto_solicitado', type: 'DECIMAL(14,2)', desc: 'Capital' }] },
      { name: 'cuotas_pago', desc: 'Calendario de amortización', fields: [{ name: 'id_cuota', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_credito', type: 'BIGINT', fk: 'creditos_prestamos.id_credito', desc: 'Crédito' }, { name: 'numero_cuota', type: 'INT', desc: 'N°' }, { name: 'monto_cuota', type: 'DECIMAL(14,2)', desc: 'Valor' }] }
    ],
    ddlSql: `CREATE TABLE sucursales (id_sucursal SERIAL PRIMARY KEY, nombre_sucursal VARCHAR(60) NOT NULL);
CREATE TABLE empleados (id_empleado SERIAL PRIMARY KEY, id_sucursal INT NOT NULL, nombre VARCHAR(80) NOT NULL, FOREIGN KEY (id_sucursal) REFERENCES sucursales(id_sucursal));
CREATE TABLE clientes (id_cliente BIGSERIAL PRIMARY KEY, rut VARCHAR(12) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL);
CREATE TABLE tipos_cuenta (id_tipo_cuenta SERIAL PRIMARY KEY, nombre_tipo VARCHAR(40) UNIQUE NOT NULL);
CREATE TABLE cuentas (id_cuenta BIGSERIAL PRIMARY KEY, id_cliente BIGINT NOT NULL, id_tipo_cuenta INT NOT NULL, numero_cuenta VARCHAR(20) UNIQUE NOT NULL, saldo DECIMAL(14,2) DEFAULT 0.00 CHECK (saldo >= 0), FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente), FOREIGN KEY (id_tipo_cuenta) REFERENCES tipos_cuenta(id_tipo_cuenta));
CREATE TABLE tarjetas (id_tarjeta BIGSERIAL PRIMARY KEY, id_cuenta BIGINT NOT NULL, numero_tarjeta_mask VARCHAR(20) NOT NULL, FOREIGN KEY (id_cuenta) REFERENCES cuentas(id_cuenta));
CREATE TABLE transacciones (id_transaccion BIGSERIAL PRIMARY KEY, id_cuenta BIGINT NOT NULL, tipo VARCHAR(20) NOT NULL, monto DECIMAL(14,2) NOT NULL, fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_cuenta) REFERENCES cuentas(id_cuenta));
CREATE TABLE transferencias_interbancarias (id_transferencia BIGSERIAL PRIMARY KEY, id_cuenta_origen BIGINT NOT NULL, id_cuenta_destino BIGINT NOT NULL, monto DECIMAL(14,2) NOT NULL, CHECK (id_cuenta_origen <> id_cuenta_destino), FOREIGN KEY (id_cuenta_origen) REFERENCES cuentas(id_cuenta), FOREIGN KEY (id_cuenta_destino) REFERENCES cuentas(id_cuenta));
CREATE TABLE creditos_prestamos (id_credito BIGSERIAL PRIMARY KEY, id_cliente BIGINT NOT NULL, monto_solicitado DECIMAL(14,2) NOT NULL, tasa_interes DECIMAL(4,2) NOT NULL, plazo_meses INT NOT NULL, FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente));
CREATE TABLE cuotas_pago (id_cuota BIGSERIAL PRIMARY KEY, id_credito BIGINT NOT NULL, numero_cuota INT NOT NULL, monto_cuota DECIMAL(14,2) NOT NULL, pagada BOOLEAN DEFAULT FALSE, FOREIGN KEY (id_credito) REFERENCES creditos_prestamos(id_credito));`,
    seedSql: `INSERT INTO sucursales (nombre_sucursal) VALUES ('Sucursal Casa Matriz');
INSERT INTO empleados (id_sucursal, nombre) VALUES (1, 'Verónica Castro');
INSERT INTO clientes (rut, nombre) VALUES ('16.555.444-2', 'Sebastián Piñera E.');
INSERT INTO tipos_cuenta (nombre_tipo) VALUES ('Cuenta Corriente');
INSERT INTO cuentas (id_cliente, id_tipo_cuenta, numero_cuenta, saldo) VALUES (1, 1, '00-12345-9', 15000000.00);
INSERT INTO tarjetas (id_cuenta, numero_tarjeta_mask) VALUES (1, '4500-XXXX-XXXX-1234');
INSERT INTO transacciones (id_cuenta, tipo, monto) VALUES (1, 'ABONO_SUELDO', 3500000.00);
INSERT INTO creditos_prestamos (id_cliente, monto_solicitado, tasa_interes, plazo_meses) VALUES (1, 10000000.00, 1.25, 24);
INSERT INTO cuotas_pago (id_credito, numero_cuota, monto_cuota, pagada) VALUES (1, 1, 485000.00, TRUE), (1, 2, 485000.00, FALSE);`,
    queriesToSolve: [
      {
        question: 'Generar la posición consolidada del cliente: RUT, Nombre, Cantidad de Cuentas, Saldo Total en Cuentas y Deuda Total en Créditos.',
        hint: 'Une clientes con cuentas y créditos usando agregaciones.',
        solutionSql: `SELECT c.rut, c.nombre,
       COUNT(DISTINCT cu.id_cuenta) AS total_cuentas,
       COALESCE(SUM(DISTINCT cu.saldo), 0) AS saldo_total_cuentas,
       COALESCE(SUM(DISTINCT cp.monto_solicitado), 0) AS deuda_total_creditos
FROM clientes c
LEFT JOIN cuentas cu ON c.id_cliente = cu.id_cliente
LEFT JOIN creditos_prestamos cp ON c.id_cliente = cp.id_cliente
GROUP BY c.id_cliente, c.rut, c.nombre;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del núcleo bancario',
      'Configuré integridad financiera y restricciones de cuentas distintas',
      'Ejecuté reportes consolidados de activos y pasivos'
    ]
  },
  {
    id: 35,
    slug: 'db-35-cadena-hotelera',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Cadena Hotelera Internacional y Reservas (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una cadena hotelera gestiona sucursales en el mundo, tipos de habitación, inventario de cuartos, amenidades (WiFi, Jacuzzi, Vista al Mar), relación habitación-amenidad (N:M), huéspedes, reservas, desglose de noches, consumos adicionales y facturación al checkout.',
    statement: 'Crear el esquema de 10 tablas hoteleras y calcular la factura de liquidación final al momento del check-out.',
    tables: [
      { name: 'hoteles', desc: 'Sucursales', fields: [{ name: 'id_hotel', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Hotel' }] },
      { name: 'tipos_habitacion', desc: 'Categorías', fields: [{ name: 'id_tipo', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_tipo', type: 'VARCHAR(40)', desc: 'Tipo' }] },
      { name: 'habitaciones', desc: 'Cuartos físicos', fields: [{ name: 'id_habitacion', type: 'INT', pk: true, desc: 'PK' }, { name: 'id_hotel', type: 'INT', fk: 'hoteles.id_hotel', desc: 'Hotel' }, { name: 'id_tipo', type: 'INT', fk: 'tipos_habitacion.id_tipo', desc: 'Tipo' }, { name: 'tarifa_base', type: 'DECIMAL(10,2)', desc: 'Tarifa' }] },
      { name: 'amenidades', desc: 'Servicios de confort', fields: [{ name: 'id_amenidad', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_amenidad', type: 'VARCHAR(50)', desc: 'Amenidad' }] },
      { name: 'habitacion_amenidades', desc: 'Pivote N:M', fields: [{ name: 'id_habitacion', type: 'INT', pk: true, fk: 'habitaciones.id_habitacion', desc: 'Cuarto' }, { name: 'id_amenidad', type: 'INT', pk: true, fk: 'amenidades.id_amenidad', desc: 'Amenidad' }] },
      { name: 'huespedes', desc: 'Viajeros', fields: [{ name: 'id_huesped', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'pasaporte', type: 'VARCHAR(20)', unique: true, desc: 'Pasaporte' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }] },
      { name: 'reservas', desc: 'Estadía pactada', fields: [{ name: 'id_reserva', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_huesped', type: 'BIGINT', fk: 'huespedes.id_huesped', desc: 'Huésped' }, { name: 'id_habitacion', type: 'INT', fk: 'habitaciones.id_habitacion', desc: 'Habitación' }, { name: 'fecha_checkin', type: 'DATE', desc: 'Ingreso' }, { name: 'fecha_checkout', type: 'DATE', desc: 'Salida' }] },
      { name: 'detalle_reserva_noches', desc: 'Noches tarifadas', fields: [{ name: 'id_noche', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_reserva', type: 'BIGINT', fk: 'reservas.id_reserva', desc: 'Reserva' }, { name: 'fecha', type: 'DATE', desc: 'Día' }, { name: 'tarifa_noche', type: 'DECIMAL(10,2)', desc: 'Precio' }] },
      { name: 'servicios_adicionales', desc: 'Room service y Spa', fields: [{ name: 'id_servicio', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_reserva', type: 'BIGINT', fk: 'reservas.id_reserva', desc: 'Reserva' }, { name: 'concepto', type: 'VARCHAR(80)', desc: 'Consumo' }, { name: 'monto', type: 'DECIMAL(10,2)', desc: 'Valor' }] },
      { name: 'facturas_checkout', desc: 'Liquidación final', fields: [{ name: 'id_factura', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_reserva', type: 'BIGINT', fk: 'reservas.id_reserva', unique: true, desc: '1:1' }, { name: 'total_final', type: 'DECIMAL(12,2)', desc: 'Total' }] }
    ],
    ddlSql: `CREATE TABLE hoteles (id_hotel SERIAL PRIMARY KEY, nombre VARCHAR(80) NOT NULL);
CREATE TABLE tipos_habitacion (id_tipo SERIAL PRIMARY KEY, nombre_tipo VARCHAR(40) NOT NULL);
CREATE TABLE habitaciones (id_habitacion SERIAL PRIMARY KEY, id_hotel INT NOT NULL, id_tipo INT NOT NULL, numero_cuarto VARCHAR(10) NOT NULL, tarifa_base DECIMAL(10,2) NOT NULL, UNIQUE(id_hotel, numero_cuarto), FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel), FOREIGN KEY (id_tipo) REFERENCES tipos_habitacion(id_tipo));
CREATE TABLE amenidades (id_amenidad SERIAL PRIMARY KEY, nombre_amenidad VARCHAR(50) UNIQUE NOT NULL);
CREATE TABLE habitacion_amenidades (id_habitacion INT NOT NULL, id_amenidad INT NOT NULL, PRIMARY KEY (id_habitacion, id_amenidad), FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion), FOREIGN KEY (id_amenidad) REFERENCES amenidades(id_amenidad));
CREATE TABLE huespedes (id_huesped BIGSERIAL PRIMARY KEY, pasaporte VARCHAR(20) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL);
CREATE TABLE reservas (id_reserva BIGSERIAL PRIMARY KEY, id_huesped BIGINT NOT NULL, id_habitacion INT NOT NULL, fecha_checkin DATE NOT NULL, fecha_checkout DATE NOT NULL, CHECK (fecha_checkout > fecha_checkin), FOREIGN KEY (id_huesped) REFERENCES huespedes(id_huesped), FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion));
CREATE TABLE detalle_reserva_noches (id_noche BIGSERIAL PRIMARY KEY, id_reserva BIGINT NOT NULL, fecha DATE NOT NULL, tarifa_noche DECIMAL(10,2) NOT NULL, FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva));
CREATE TABLE servicios_adicionales (id_servicio BIGSERIAL PRIMARY KEY, id_reserva BIGINT NOT NULL, concepto VARCHAR(80) NOT NULL, monto DECIMAL(10,2) NOT NULL, FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva));
CREATE TABLE facturas_checkout (id_factura BIGSERIAL PRIMARY KEY, id_reserva BIGINT UNIQUE NOT NULL, total_final DECIMAL(12,2) NOT NULL, fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva));`,
    seedSql: `INSERT INTO hoteles (nombre) VALUES ('Hotel Valle Nevado Resort');
INSERT INTO tipos_habitacion (nombre_tipo) VALUES ('Suite Presidencial');
INSERT INTO habitaciones (id_hotel, id_tipo, numero_cuarto, tarifa_base) VALUES (1, 1, '501', 280000.00);
INSERT INTO amenidades (nombre_amenidad) VALUES ('Jacuzzi Panorámico'), ('Acceso Pistas Ski');
INSERT INTO habitacion_amenidades (id_habitacion, id_amenidad) VALUES (1, 1), (1, 2);
INSERT INTO huespedes (pasaporte, nombre) VALUES ('USA-987654', 'John Doe');
INSERT INTO reservas (id_huesped, id_habitacion, fecha_checkin, fecha_checkout) VALUES (1, 1, '2024-07-10', '2024-07-12');
INSERT INTO detalle_reserva_noches (id_reserva, fecha, tarifa_noche) VALUES (1, '2024-07-10', 280000.00), (1, '2024-07-11', 280000.00);
INSERT INTO servicios_adicionales (id_reserva, concepto, monto) VALUES (1, 'Cena Degustación Vinos', 85000.00), (1, 'Masaje Terapéutico Spa', 60000.00);`,
    queriesToSolve: [
      {
        question: 'Calcular el detalle de la cuenta de check-out: Total por concepto de noches de alojamiento, total consumos extras y monto final a pagar.',
        hint: 'Une reservas con detalle_reserva_noches y servicios_adicionales usando subconsultas o sumas agregadas.',
        solutionSql: `SELECT r.id_reserva, h.nombre AS huesped, h.pasaporte,
       (SELECT COALESCE(SUM(tarifa_noche), 0) FROM detalle_reserva_noches WHERE id_reserva = r.id_reserva) AS total_noches,
       (SELECT COALESCE(SUM(monto), 0) FROM servicios_adicionales WHERE id_reserva = r.id_reserva) AS total_extras,
       ((SELECT COALESCE(SUM(tarifa_noche), 0) FROM detalle_reserva_noches WHERE id_reserva = r.id_reserva) +
        (SELECT COALESCE(SUM(monto), 0) FROM servicios_adicionales WHERE id_reserva = r.id_reserva)) AS total_checkout_final
FROM reservas r
INNER JOIN huespedes h ON r.id_huesped = h.id_huesped
WHERE r.id_reserva = 1;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del sistema hotelero global',
      'Configuré reglas para amenidades N:M y reservas 1:N',
      'Calculé liquidaciones de checkout con subconsultas escalares'
    ]
  },
  {
    id: 36,
    slug: 'db-36-aerolinea-vuelos',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Aerolínea y Control de Vuelos Internacionales (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una aerolínea internacional modela aeropuertos, rutas de vuelo, flota de aviones, asientos configurados, tripulación (pilotos, sobrecargos), vuelos programados, asignación de tripulantes a vuelos, pasajeros, reservas de vuelo y boletos con check-in emitidos.',
    statement: 'Crear el esquema aeronáutico de 10 tablas con validaciones IATA y cálculo de manifiesto de vuelo.',
    tables: [
      { name: 'aeropuertos', desc: 'Códigos IATA', fields: [{ name: 'codigo_iata', type: 'VARCHAR(3)', pk: true, desc: 'IATA' }, { name: 'nombre_aeropuerto', type: 'VARCHAR(80)', desc: 'Nombre' }, { name: 'ciudad', type: 'VARCHAR(50)', desc: 'Ciudad' }] },
      { name: 'rutas', desc: 'Trayectos', fields: [{ name: 'id_ruta', type: 'INT', pk: true, desc: 'PK' }, { name: 'origen_iata', type: 'VARCHAR(3)', fk: 'aeropuertos.codigo_iata', desc: 'Origen' }, { name: 'destino_iata', type: 'VARCHAR(3)', fk: 'aeropuertos.codigo_iata', desc: 'Destino' }] },
      { name: 'aviones', desc: 'Aeronaves', fields: [{ name: 'id_avion', type: 'INT', pk: true, desc: 'PK' }, { name: 'matricula', type: 'VARCHAR(10)', unique: true, desc: 'Matrícula' }, { name: 'modelo', type: 'VARCHAR(40)', desc: 'Modelo' }] },
      { name: 'asientos', desc: 'Configuración de butacas', fields: [{ name: 'id_asiento', type: 'INT', pk: true, desc: 'PK' }, { name: 'id_avion', type: 'INT', fk: 'aviones.id_avion', desc: 'Avión' }, { name: 'codigo_asiento', type: 'VARCHAR(5)', desc: '12A' }] },
      { name: 'tripulacion', desc: 'Pilotos y azafatas', fields: [{ name: 'id_tripulante', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }, { name: 'rol', type: 'VARCHAR(20)', desc: 'Piloto, Copiloto' }] },
      { name: 'vuelos', desc: 'Operaciones', fields: [{ name: 'id_vuelo', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'numero_vuelo', type: 'VARCHAR(10)', desc: 'LA-500' }, { name: 'id_ruta', type: 'INT', fk: 'rutas.id_ruta', desc: 'Ruta' }, { name: 'id_avion', type: 'INT', fk: 'aviones.id_avion', desc: 'Aeronave' }] },
      { name: 'asignacion_tripulacion', fields: [{ name: 'id_vuelo', type: 'BIGINT', pk: true, fk: 'vuelos.id_vuelo', desc: 'Vuelo' }, { name: 'id_tripulante', type: 'INT', pk: true, fk: 'tripulacion.id_tripulante', desc: 'Tripulante' }], desc: 'Tripulación asignada' },
      { name: 'pasajeros', desc: 'Viajeros', fields: [{ name: 'id_pasajero', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'pasaporte', type: 'VARCHAR(20)', unique: true, desc: 'Pasaporte' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }] },
      { name: 'reservas_vuelo', desc: 'PNR de reserva', fields: [{ name: 'id_reserva', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'codigo_pnr', type: 'VARCHAR(6)', unique: true, desc: 'PNR' }, { name: 'id_pasajero', type: 'BIGINT', fk: 'pasajeros.id_pasajero', desc: 'Pasajero' }] },
      { name: 'boletos_checkin', desc: 'Pases de abordar', fields: [{ name: 'id_boleto', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_reserva', type: 'BIGINT', fk: 'reservas_vuelo.id_reserva', desc: 'Reserva' }, { name: 'id_vuelo', type: 'BIGINT', fk: 'vuelos.id_vuelo', desc: 'Vuelo' }, { name: 'id_asiento', type: 'INT', fk: 'asientos.id_asiento', desc: 'Asiento' }] }
    ],
    ddlSql: `CREATE TABLE aeropuertos (codigo_iata VARCHAR(3) PRIMARY KEY, nombre_aeropuerto VARCHAR(80) NOT NULL, ciudad VARCHAR(50) NOT NULL);
CREATE TABLE rutas (id_ruta SERIAL PRIMARY KEY, origen_iata VARCHAR(3) NOT NULL, destino_iata VARCHAR(3) NOT NULL, CHECK (origen_iata <> destino_iata), FOREIGN KEY (origen_iata) REFERENCES aeropuertos(codigo_iata), FOREIGN KEY (destino_iata) REFERENCES aeropuertos(codigo_iata));
CREATE TABLE aviones (id_avion SERIAL PRIMARY KEY, matricula VARCHAR(10) UNIQUE NOT NULL, modelo VARCHAR(40) NOT NULL);
CREATE TABLE asientos (id_asiento SERIAL PRIMARY KEY, id_avion INT NOT NULL, codigo_asiento VARCHAR(5) NOT NULL, clase VARCHAR(20) DEFAULT 'ECONOMY', UNIQUE (id_avion, codigo_asiento), FOREIGN KEY (id_avion) REFERENCES aviones(id_avion));
CREATE TABLE tripulacion (id_tripulante SERIAL PRIMARY KEY, nombre VARCHAR(80) NOT NULL, rol VARCHAR(20) NOT NULL);
CREATE TABLE vuelos (id_vuelo BIGSERIAL PRIMARY KEY, numero_vuelo VARCHAR(10) NOT NULL, id_ruta INT NOT NULL, id_avion INT NOT NULL, fecha_salida TIMESTAMP NOT NULL, FOREIGN KEY (id_ruta) REFERENCES rutas(id_ruta), FOREIGN KEY (id_avion) REFERENCES aviones(id_avion));
CREATE TABLE asignacion_tripulacion (id_vuelo BIGINT NOT NULL, id_tripulante INT NOT NULL, PRIMARY KEY (id_vuelo, id_tripulante), FOREIGN KEY (id_vuelo) REFERENCES vuelos(id_vuelo), FOREIGN KEY (id_tripulante) REFERENCES tripulacion(id_tripulante));
CREATE TABLE pasajeros (id_pasajero BIGSERIAL PRIMARY KEY, pasaporte VARCHAR(20) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL);
CREATE TABLE reservas_vuelo (id_reserva BIGSERIAL PRIMARY KEY, codigo_pnr VARCHAR(6) UNIQUE NOT NULL, id_pasajero BIGINT NOT NULL, FOREIGN KEY (id_pasajero) REFERENCES pasajeros(id_pasajero));
CREATE TABLE boletos_checkin (id_boleto BIGSERIAL PRIMARY KEY, id_reserva BIGINT NOT NULL, id_vuelo BIGINT NOT NULL, id_asiento INT NOT NULL, UNIQUE (id_vuelo, id_asiento), FOREIGN KEY (id_reserva) REFERENCES reservas_vuelo(id_reserva), FOREIGN KEY (id_vuelo) REFERENCES vuelos(id_vuelo), FOREIGN KEY (id_asiento) REFERENCES asientos(id_asiento));`,
    seedSql: `INSERT INTO aeropuertos (codigo_iata, nombre_aeropuerto, ciudad) VALUES ('SCL', 'Arturo Merino Benítez', 'Santiago'), ('MIA', 'Miami International', 'Miami');
INSERT INTO rutas (origen_iata, destino_iata) VALUES ('SCL', 'MIA');
INSERT INTO aviones (matricula, modelo) VALUES ('CC-BBA', 'Boeing 787-9 Dreamliner');
INSERT INTO asientos (id_avion, codigo_asiento, clase) VALUES (1, '1A', 'BUSINESS'), (1, '12F', 'ECONOMY');
INSERT INTO tripulacion (nombre, rol) VALUES ('Capitán Francisco Rivera', 'Piloto al Mando');
INSERT INTO vuelos (numero_vuelo, id_ruta, id_avion, fecha_salida) VALUES ('LA-500', 1, 1, '2024-04-01 22:45:00');
INSERT INTO asignacion_tripulacion (id_vuelo, id_tripulante) VALUES (1, 1);
INSERT INTO pasajeros (pasaporte, nombre) VALUES ('CHL-112233', 'Daniela Baeza');
INSERT INTO reservas_vuelo (codigo_pnr, id_pasajero) VALUES ('X9KLP2', 1);
INSERT INTO boletos_checkin (id_reserva, id_vuelo, id_asiento) VALUES (1, 1, 1);`,
    queriesToSolve: [
      {
        question: 'Generar el Manifiesto de Pasajeros del vuelo LA-500: Número de Vuelo, Origen, Destino, Nombre del Pasajero, Pasaporte, Asiento y Clase de Cabina.',
        hint: 'Une vuelos con rutas, aeropuertos, boletos_checkin, reservas_vuelo, pasajeros y asientos.',
        solutionSql: `SELECT v.numero_vuelo, v.fecha_salida,
       r.origen_iata, r.destino_iata,
       p.nombre AS pasajero, p.pasaporte,
       a.codigo_asiento, a.clase
FROM vuelos v
INNER JOIN rutas r ON v.id_ruta = r.id_ruta
INNER JOIN boletos_checkin bc ON v.id_vuelo = bc.id_vuelo
INNER JOIN reservas_vuelo rv ON bc.id_reserva = rv.id_reserva
INNER JOIN pasajeros p ON rv.id_pasajero = p.id_pasajero
INNER JOIN asientos a ON bc.id_asiento = a.id_asiento
WHERE v.numero_vuelo = 'LA-500';`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del sistema aeroportuario',
      'Evité sobreasignación de asientos con UNIQUE (id_vuelo, id_asiento)',
      'Generé manifiestos de vuelo con múltiples joins'
    ]
  },
  {
    id: 37,
    slug: 'db-37-red-social',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Red Social y Contenidos Multimedia (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una red social tipo Instagram/Twitter estructura usuarios, perfiles 1:1, seguidores (seguidor/seguido), publicaciones, etiquetas/hashtags, post_etiquetas (N:M), comentarios, reacciones con emoji, mensajes directos de chat y notificaciones.',
    statement: 'Diseñar las 10 tablas de la red social y calcular el engagement total (reacciones + comentarios) de cada post.',
    tables: [
      { name: 'usuarios', desc: 'Cuentas', fields: [{ name: 'id_usuario', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'handle', type: 'VARCHAR(30)', unique: true, desc: '@usuario' }] },
      { name: 'perfiles', desc: 'Bio 1:1', fields: [{ name: 'id_perfil', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', unique: true, desc: '1:1' }, { name: 'bio', type: 'TEXT', desc: 'Biografía' }] },
      { name: 'seguidores', desc: 'Grafo social N:M', fields: [{ name: 'id_seguidor', type: 'BIGINT', pk: true, fk: 'usuarios.id_usuario', desc: 'Follower' }, { name: 'id_seguido', type: 'BIGINT', pk: true, fk: 'usuarios.id_usuario', desc: 'Following' }] },
      { name: 'publicaciones', desc: 'Posts multimedia', fields: [{ name: 'id_post', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Autor' }, { name: 'contenido', type: 'TEXT', notNull: true, desc: 'Texto' }] },
      { name: 'etiquetas', desc: 'Hashtags', fields: [{ name: 'id_tag', type: 'INT', pk: true, desc: 'PK' }, { name: 'hashtag', type: 'VARCHAR(50)', unique: true, desc: '#tag' }] },
      { name: 'publicacion_etiquetas', desc: 'Pivote N:M', fields: [{ name: 'id_post', type: 'BIGINT', pk: true, fk: 'publicaciones.id_post', desc: 'Post' }, { name: 'id_tag', type: 'INT', pk: true, fk: 'etiquetas.id_tag', desc: 'Tag' }] },
      { name: 'comentarios', desc: 'Comentarios', fields: [{ name: 'id_comentario', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_post', type: 'BIGINT', fk: 'publicaciones.id_post', desc: 'Post' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Usuario' }] },
      { name: 'reacciones', desc: 'Likes, Love, Fire', fields: [{ name: 'id_post', type: 'BIGINT', pk: true, fk: 'publicaciones.id_post', desc: 'Post' }, { name: 'id_usuario', type: 'BIGINT', pk: true, fk: 'usuarios.id_usuario', desc: 'Usuario' }, { name: 'tipo_reaccion', type: 'VARCHAR(20)', desc: 'LIKE' }] },
      { name: 'mensajes_chat', desc: 'DMs directos', fields: [{ name: 'id_mensaje', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_emisor', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'De' }, { name: 'id_receptor', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Para' }] },
      { name: 'notificaciones', desc: 'Alertas push', fields: [{ name: 'id_notificacion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_usuario', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Destinatario' }, { name: 'mensaje', type: 'VARCHAR(255)', desc: 'Alerta' }] }
    ],
    ddlSql: `CREATE TABLE usuarios (id_usuario BIGSERIAL PRIMARY KEY, handle VARCHAR(30) UNIQUE NOT NULL, email VARCHAR(100) UNIQUE NOT NULL);
CREATE TABLE perfiles (id_perfil BIGSERIAL PRIMARY KEY, id_usuario BIGINT UNIQUE NOT NULL, bio TEXT, foto_url VARCHAR(255), FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE);
CREATE TABLE seguidores (id_seguidor BIGINT NOT NULL, id_seguido BIGINT NOT NULL, PRIMARY KEY (id_seguidor, id_seguido), CHECK (id_seguidor <> id_seguido), FOREIGN KEY (id_seguidor) REFERENCES usuarios(id_usuario), FOREIGN KEY (id_seguido) REFERENCES usuarios(id_usuario));
CREATE TABLE publicaciones (id_post BIGSERIAL PRIMARY KEY, id_usuario BIGINT NOT NULL, contenido TEXT NOT NULL, fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));
CREATE TABLE etiquetas (id_tag SERIAL PRIMARY KEY, hashtag VARCHAR(50) UNIQUE NOT NULL);
CREATE TABLE publicacion_etiquetas (id_post BIGINT NOT NULL, id_tag INT NOT NULL, PRIMARY KEY (id_post, id_tag), FOREIGN KEY (id_post) REFERENCES publicaciones(id_post) ON DELETE CASCADE, FOREIGN KEY (id_tag) REFERENCES etiquetas(id_tag));
CREATE TABLE comentarios (id_comentario BIGSERIAL PRIMARY KEY, id_post BIGINT NOT NULL, id_usuario BIGINT NOT NULL, texto VARCHAR(500) NOT NULL, FOREIGN KEY (id_post) REFERENCES publicaciones(id_post) ON DELETE CASCADE, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));
CREATE TABLE reacciones (id_post BIGINT NOT NULL, id_usuario BIGINT NOT NULL, tipo_reaccion VARCHAR(20) NOT NULL, PRIMARY KEY (id_post, id_usuario), FOREIGN KEY (id_post) REFERENCES publicaciones(id_post) ON DELETE CASCADE, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario));
CREATE TABLE mensajes_chat (id_mensaje BIGSERIAL PRIMARY KEY, id_emisor BIGINT NOT NULL, id_receptor BIGINT NOT NULL, mensaje TEXT NOT NULL, CHECK (id_emisor <> id_receptor), FOREIGN KEY (id_emisor) REFERENCES usuarios(id_usuario), FOREIGN KEY (id_receptor) REFERENCES usuarios(id_usuario));
CREATE TABLE notificaciones (id_notificacion BIGSERIAL PRIMARY KEY, id_usuario BIGINT NOT NULL, mensaje VARCHAR(255) NOT NULL, leida BOOLEAN DEFAULT FALSE, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE);`,
    seedSql: `INSERT INTO usuarios (handle, email) VALUES ('antigravity_dev', 'dev@ai.com'), ('code_master', 'code@ai.com');
INSERT INTO perfiles (id_usuario, bio) VALUES (1, 'Construyendo el futuro del código.');
INSERT INTO seguidores (id_seguidor, id_seguido) VALUES (2, 1);
INSERT INTO publicaciones (id_usuario, contenido) VALUES (1, '¡Lanzamos 40 nuevos desafíos de Bases de Datos y SQL en la plataforma!');
INSERT INTO etiquetas (hashtag) VALUES ('SQL'), ('Programacion');
INSERT INTO publicacion_etiquetas (id_post, id_tag) VALUES (1, 1), (1, 2);
INSERT INTO comentarios (id_post, id_usuario, texto) VALUES (1, 2, '¡Excelente iniciativa para practicar relacional!');
INSERT INTO reacciones (id_post, id_usuario, tipo_reaccion) VALUES (1, 2, 'LIKE');`,
    queriesToSolve: [
      {
        question: 'Calcular el Engagement Rate de las publicaciones: Autor, Contenido del Post, Cantidad de Reacciones y Cantidad de Comentarios recibidos.',
        hint: 'Usa subconsultas escalares o agregaciones agrupadas sobre publicaciones.',
        solutionSql: `SELECT p.id_post, u.handle AS autor, p.contenido,
       (SELECT COUNT(*) FROM reacciones WHERE id_post = p.id_post) AS total_reacciones,
       (SELECT COUNT(*) FROM comentarios WHERE id_post = p.id_post) AS total_comentarios,
       ((SELECT COUNT(*) FROM reacciones WHERE id_post = p.id_post) +
        (SELECT COUNT(*) FROM comentarios WHERE id_post = p.id_post)) AS engagement_total
FROM publicaciones p
INNER JOIN usuarios u ON p.id_usuario = u.id_usuario;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del grafo de red social',
      'Configuré auto-referencias para followers y mensajes directos',
      'Calculé métricas de engagement'
    ]
  },
  {
    id: 38,
    slug: 'db-38-logistica-maritima',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Logística Global, Puertos y Cadena de Suministro (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una multinacional naviera y de supply chain opera proveedores de carga, puertos/aduanas marítimas, buques portacontenedores, contenedores ISO, almacenes de depósito fiscal, órdenes de importación, ítems de carga, guías de despacho, rutas marítimas y eventos de tracking satelital.',
    statement: 'Crear el esquema de 10 tablas marítimas y reportar el estado de contenedores en altamar.',
    tables: [
      { name: 'proveedores', desc: 'Exportadores', fields: [{ name: 'id_proveedor', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'razon_social', type: 'VARCHAR(100)', desc: 'Empresa' }] },
      { name: 'puertos_aduanas', desc: 'Terminales portuarios', fields: [{ name: 'codigo_puerto', type: 'VARCHAR(5)', pk: true, desc: 'UN/LOCODE' }, { name: 'nombre_puerto', type: 'VARCHAR(80)', desc: 'Puerto' }] },
      { name: 'buques_transporte', desc: 'Navíos', fields: [{ name: 'id_buque', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_buque', type: 'VARCHAR(80)', desc: 'Nombre' }, { name: 'imo_number', type: 'VARCHAR(10)', unique: true, desc: 'IMO' }] },
      { name: 'contenedores', desc: 'TEUs ISO', fields: [{ name: 'codigo_contenedor', type: 'VARCHAR(11)', pk: true, desc: 'ISO 6346' }, { name: 'tipo', type: 'VARCHAR(20)', desc: '20ft, 40ft High Cube' }] },
      { name: 'almacenes', desc: 'Patios de acopio', fields: [{ name: 'id_almacen', type: 'INT', pk: true, desc: 'PK' }, { name: 'codigo_puerto', type: 'VARCHAR(5)', fk: 'puertos_aduanas.codigo_puerto', desc: 'Puerto' }] },
      { name: 'ordenes_compra', desc: 'Órdenes de flete', fields: [{ name: 'id_orden', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_proveedor', type: 'BIGINT', fk: 'proveedores.id_proveedor', desc: 'Proveedor' }] },
      { name: 'items_compra', desc: 'Manifiesto de carga', fields: [{ name: 'id_item', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_orden', type: 'BIGINT', fk: 'ordenes_compra.id_orden', desc: 'Orden' }, { name: 'codigo_contenedor', type: 'VARCHAR(11)', fk: 'contenedores.codigo_contenedor', desc: 'Contenedor' }] },
      { name: 'rutas_envio', desc: 'Líneas marítimas', fields: [{ name: 'id_ruta', type: 'INT', pk: true, desc: 'PK' }, { name: 'puerto_origen', type: 'VARCHAR(5)', fk: 'puertos_aduanas.codigo_puerto', desc: 'Origen' }, { name: 'puerto_destino', type: 'VARCHAR(5)', fk: 'puertos_aduanas.codigo_puerto', desc: 'Destino' }] },
      { name: 'guias_despacho', desc: 'Bill of Lading B/L', fields: [{ name: 'id_guia', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'bl_number', type: 'VARCHAR(30)', unique: true, desc: 'Bill of Lading' }, { name: 'id_buque', type: 'INT', fk: 'buques_transporte.id_buque', desc: 'Buque' }] },
      { name: 'tracking_eventos', desc: 'Eventos satelitales AIS', fields: [{ name: 'id_evento', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_guia', type: 'BIGINT', fk: 'guias_despacho.id_guia', desc: 'B/L' }, { name: 'latitud', type: 'DECIMAL(9,6)', desc: 'Lat' }, { name: 'longitud', type: 'DECIMAL(9,6)', desc: 'Lon' }] }
    ],
    ddlSql: `CREATE TABLE proveedores (id_proveedor BIGSERIAL PRIMARY KEY, razon_social VARCHAR(100) NOT NULL);
CREATE TABLE puertos_aduanas (codigo_puerto VARCHAR(5) PRIMARY KEY, nombre_puerto VARCHAR(80) NOT NULL, pais VARCHAR(50) NOT NULL);
CREATE TABLE buques_transporte (id_buque SERIAL PRIMARY KEY, nombre_buque VARCHAR(80) NOT NULL, imo_number VARCHAR(10) UNIQUE NOT NULL);
CREATE TABLE contenedores (codigo_contenedor VARCHAR(11) PRIMARY KEY, tipo VARCHAR(20) NOT NULL, capacidad_toneladas DECIMAL(6,2) NOT NULL);
CREATE TABLE almacenes (id_almacen SERIAL PRIMARY KEY, codigo_puerto VARCHAR(5) NOT NULL, nombre_almacen VARCHAR(80) NOT NULL, FOREIGN KEY (codigo_puerto) REFERENCES puertos_aduanas(codigo_puerto));
CREATE TABLE ordenes_compra (id_orden BIGSERIAL PRIMARY KEY, id_proveedor BIGINT NOT NULL, fecha_orden DATE NOT NULL, FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor));
CREATE TABLE items_compra (id_item BIGSERIAL PRIMARY KEY, id_orden BIGINT NOT NULL, codigo_contenedor VARCHAR(11) NOT NULL, descripcion_mercancia TEXT NOT NULL, FOREIGN KEY (id_orden) REFERENCES ordenes_compra(id_orden), FOREIGN KEY (codigo_contenedor) REFERENCES contenedores(codigo_contenedor));
CREATE TABLE rutas_envio (id_ruta SERIAL PRIMARY KEY, puerto_origen VARCHAR(5) NOT NULL, puerto_destino VARCHAR(5) NOT NULL, FOREIGN KEY (puerto_origen) REFERENCES puertos_aduanas(codigo_puerto), FOREIGN KEY (puerto_destino) REFERENCES puertos_aduanas(codigo_puerto));
CREATE TABLE guias_despacho (id_guia BIGSERIAL PRIMARY KEY, bl_number VARCHAR(30) UNIQUE NOT NULL, id_buque INT NOT NULL, id_ruta INT NOT NULL, FOREIGN KEY (id_buque) REFERENCES buques_transporte(id_buque), FOREIGN KEY (id_ruta) REFERENCES rutas_envio(id_ruta));
CREATE TABLE tracking_eventos (id_evento BIGSERIAL PRIMARY KEY, id_guia BIGINT NOT NULL, estado VARCHAR(30) NOT NULL, latitud DECIMAL(9,6), longitud DECIMAL(9,6), fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_guia) REFERENCES guias_despacho(id_guia));`,
    seedSql: `INSERT INTO proveedores (razon_social) VALUES ('Shanghai Electronics Corp');
INSERT INTO puertos_aduanas (codigo_puerto, nombre_puerto, pais) VALUES ('CNSHA', 'Port of Shanghai', 'China'), ('CLVAP', 'Puerto de Valparaíso', 'Chile');
INSERT INTO buques_transporte (nombre_buque, imo_number) VALUES ('Ever Given', 'IMO9811000');
INSERT INTO contenedores (codigo_contenedor, tipo, capacidad_toneladas) VALUES ('MSKU1234567', '40ft High Cube', 28.50);
INSERT INTO almacenes (codigo_puerto, nombre_almacen) VALUES ('CLVAP', 'Bodega Extraportuaria ZEAL');
INSERT INTO ordenes_compra (id_proveedor, fecha_orden) VALUES (1, '2024-01-15');
INSERT INTO items_compra (id_orden, codigo_contenedor, descripcion_mercancia) VALUES (1, 'MSKU1234567', 'Lote de Pantallas OLED y Microcontroladores');
INSERT INTO rutas_envio (puerto_origen, puerto_destino) VALUES ('CNSHA', 'CLVAP');
INSERT INTO guias_despacho (bl_number, id_buque, id_ruta) VALUES ('MAEU-99887766', 1, 1);
INSERT INTO tracking_eventos (id_guia, estado, latitud, longitud) VALUES (1, 'NAVEGANDO_PACIFICO', -12.450000, -110.300000);`,
    queriesToSolve: [
      {
        question: 'Rastrear el Bill of Lading MAEU-99887766: Buque asignado, Puerto Origen y Destino, Contenedor, Mercancía y Último Evento de Tracking.',
        hint: 'Une guias_despacho con buques, rutas, tracking_eventos y items_compra.',
        solutionSql: `SELECT g.bl_number, b.nombre_buque, b.imo_number,
       po.nombre_puerto AS origen, pd.nombre_puerto AS destino,
       ic.codigo_contenedor, ic.descripcion_mercancia,
       te.estado AS ultimo_estado, te.fecha_hora
FROM guias_despacho g
INNER JOIN buques_transporte b ON g.id_buque = b.id_buque
INNER JOIN rutas_envio r ON g.id_ruta = r.id_ruta
INNER JOIN puertos_aduanas po ON r.puerto_origen = po.codigo_puerto
INNER JOIN puertos_aduanas pd ON r.puerto_destino = pd.codigo_puerto
INNER JOIN tracking_eventos te ON g.id_guia = te.id_guia
INNER JOIN items_compra ic ON ic.id_orden = 1
WHERE g.bl_number = 'MAEU-99887766'
ORDER BY te.fecha_hora DESC
LIMIT 1;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del sistema logístico portuario',
      'Configuré códigos internacionales ISO 6346 y UN/LOCODE',
      'Ejecuté consultas de telemetría naviera'
    ]
  },
  {
    id: 39,
    slug: 'db-39-saas-agil',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'SaaS de Gestión Ágil de Proyectos (Jira / Asana Clone) (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Un software SaaS B2B de gestión de ingeniería administra organizaciones cliente, planes de suscripción, facturación recurrente, usuarios, equipos de trabajo, miembros de equipo, proyectos ágiles, sprints de desarrollo, tareas/issues y bitácora de auditoría de cambios.',
    statement: 'Crear el esquema de 10 tablas para la plataforma SaaS y formular la consulta del burndown de tareas por sprint.',
    tables: [
      { name: 'planes_suscripcion', desc: 'Free, Pro, Enterprise', fields: [{ name: 'id_plan', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_plan', type: 'VARCHAR(40)', desc: 'Plan' }] },
      { name: 'organizaciones', desc: 'Empresas clientes', fields: [{ name: 'id_organizacion', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_plan', type: 'INT', fk: 'planes_suscripcion.id_plan', desc: 'Plan' }, { name: 'nombre_empresa', type: 'VARCHAR(100)', desc: 'Empresa' }] },
      { name: 'facturacion_saas', desc: 'Cobros recurrentes', fields: [{ name: 'id_factura', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_organizacion', type: 'BIGINT', fk: 'organizaciones.id_organizacion', desc: 'Organización' }, { name: 'monto_mensual', type: 'DECIMAL(10,2)', desc: 'Monto' }] },
      { name: 'usuarios', desc: 'Miembros', fields: [{ name: 'id_usuario', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_organizacion', type: 'BIGINT', fk: 'organizaciones.id_organizacion', desc: 'Organización' }, { name: 'email', type: 'VARCHAR(100)', unique: true, desc: 'Email' }] },
      { name: 'equipos', desc: 'Squads', fields: [{ name: 'id_equipo', type: 'INT', pk: true, desc: 'PK' }, { name: 'id_organizacion', type: 'BIGINT', fk: 'organizaciones.id_organizacion', desc: 'Organización' }, { name: 'nombre_squad', type: 'VARCHAR(50)', desc: 'Equipo' }] },
      { name: 'miembros_equipo', desc: 'Pivote N:M', fields: [{ name: 'id_equipo', type: 'INT', pk: true, fk: 'equipos.id_equipo', desc: 'Squad' }, { name: 'id_usuario', type: 'BIGINT', pk: true, fk: 'usuarios.id_usuario', desc: 'Usuario' }] },
      { name: 'proyectos', desc: 'Tableros Kanban/Scrum', fields: [{ name: 'id_proyecto', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_equipo', type: 'INT', fk: 'equipos.id_equipo', desc: 'Squad' }, { name: 'clave_proyecto', type: 'VARCHAR(10)', unique: true, desc: 'KEY (ej. CORE)' }] },
      { name: 'sprints', desc: 'Iteraciones', fields: [{ name: 'id_sprint', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_proyecto', type: 'BIGINT', fk: 'proyectos.id_proyecto', desc: 'Proyecto' }, { name: 'nombre_sprint', type: 'VARCHAR(50)', desc: 'Sprint 1' }] },
      { name: 'tareas_issues', desc: 'Tickets y Bugs', fields: [{ name: 'id_issue', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_sprint', type: 'BIGINT', fk: 'sprints.id_sprint', desc: 'Sprint' }, { name: 'id_asignado', type: 'BIGINT', fk: 'usuarios.id_usuario', desc: 'Dev' }, { name: 'story_points', type: 'INT', desc: 'Puntos' }, { name: 'estado', type: 'VARCHAR(20)', desc: 'DONE, IN_PROGRESS' }] },
      { name: 'historial_cambios', desc: 'Audit Log', fields: [{ name: 'id_log', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_issue', type: 'BIGINT', fk: 'tareas_issues.id_issue', desc: 'Issue' }, { name: 'cambio', type: 'TEXT', desc: 'Acción' }] }
    ],
    ddlSql: `CREATE TABLE planes_suscripcion (id_plan SERIAL PRIMARY KEY, nombre_plan VARCHAR(40) UNIQUE NOT NULL, precio_mensual DECIMAL(10,2) NOT NULL);
CREATE TABLE organizaciones (id_organizacion BIGSERIAL PRIMARY KEY, id_plan INT NOT NULL, nombre_empresa VARCHAR(100) NOT NULL, FOREIGN KEY (id_plan) REFERENCES planes_suscripcion(id_plan));
CREATE TABLE facturacion_saas (id_factura BIGSERIAL PRIMARY KEY, id_organizacion BIGINT NOT NULL, monto_mensual DECIMAL(10,2) NOT NULL, pagada BOOLEAN DEFAULT TRUE, FOREIGN KEY (id_organizacion) REFERENCES organizaciones(id_organizacion));
CREATE TABLE usuarios (id_usuario BIGSERIAL PRIMARY KEY, id_organizacion BIGINT NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL, FOREIGN KEY (id_organizacion) REFERENCES organizaciones(id_organizacion) ON DELETE CASCADE);
CREATE TABLE equipos (id_equipo SERIAL PRIMARY KEY, id_organizacion BIGINT NOT NULL, nombre_squad VARCHAR(50) NOT NULL, FOREIGN KEY (id_organizacion) REFERENCES organizaciones(id_organizacion));
CREATE TABLE miembros_equipo (id_equipo INT NOT NULL, id_usuario BIGINT NOT NULL, PRIMARY KEY (id_equipo, id_usuario), FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo) ON DELETE CASCADE, FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE);
CREATE TABLE proyectos (id_proyecto BIGSERIAL PRIMARY KEY, id_equipo INT NOT NULL, clave_proyecto VARCHAR(10) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL, FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo));
CREATE TABLE sprints (id_sprint BIGSERIAL PRIMARY KEY, id_proyecto BIGINT NOT NULL, nombre_sprint VARCHAR(50) NOT NULL, fecha_inicio DATE NOT NULL, fecha_fin DATE NOT NULL, FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto));
CREATE TABLE tareas_issues (id_issue BIGSERIAL PRIMARY KEY, id_sprint BIGINT NOT NULL, id_asignado BIGINT, titulo VARCHAR(120) NOT NULL, story_points INT DEFAULT 1 CHECK (story_points >= 0), estado VARCHAR(20) DEFAULT 'TODO' CHECK (estado IN ('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE')), FOREIGN KEY (id_sprint) REFERENCES sprints(id_sprint), FOREIGN KEY (id_asignado) REFERENCES usuarios(id_usuario));
CREATE TABLE historial_cambios (id_log BIGSERIAL PRIMARY KEY, id_issue BIGINT NOT NULL, cambio TEXT NOT NULL, fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_issue) REFERENCES tareas_issues(id_issue) ON DELETE CASCADE);`,
    seedSql: `INSERT INTO planes_suscripcion (nombre_plan, precio_mensual) VALUES ('Enterprise Scale', 499.00);
INSERT INTO organizaciones (id_plan, nombre_empresa) VALUES (1, 'Fintech Unicorn Latam');
INSERT INTO facturacion_saas (id_organizacion, monto_mensual) VALUES (1, 499.00);
INSERT INTO usuarios (id_organizacion, email, nombre) VALUES (1, 'devlead@fintech.com', 'Matias Valenzuela');
INSERT INTO equipos (id_organizacion, nombre_squad) VALUES (1, 'Squad Payments');
INSERT INTO miembros_equipo (id_equipo, id_usuario) VALUES (1, 1);
INSERT INTO proyectos (id_equipo, clave_proyecto, nombre) VALUES (1, 'PAY', 'Motor de Pagos y Tarjetas');
INSERT INTO sprints (id_sprint, id_proyecto, nombre_sprint, fecha_inicio, fecha_fin) VALUES (1, 1, 'Sprint 42 - Integración Apple Pay', '2024-03-01', '2024-03-15');
INSERT INTO tareas_issues (id_sprint, id_asignado, titulo, story_points, estado) VALUES
(1, 1, 'Implementar Tokenización de Tarjetas', 5, 'DONE'),
(1, 1, 'Webhook de Confirmación de Pago', 3, 'DONE'),
(1, 1, 'Pruebas de Carga 10k RPS', 8, 'IN_PROGRESS');
INSERT INTO historial_cambios (id_issue, cambio) VALUES (1, 'Estado cambiado a DONE por Matias Valenzuela');`,
    queriesToSolve: [
      {
        question: 'Calcular la velocidad del sprint: Total de Story Points planificados, Story Points terminados (DONE) y porcentaje de cumplimiento.',
        hint: 'Agrupa por sprint y suma los story_points con CASE WHEN estado = "DONE".',
        solutionSql: `SELECT s.nombre_sprint, pr.clave_proyecto,
       COUNT(t.id_issue) AS total_tickets,
       SUM(t.story_points) AS total_story_points,
       SUM(CASE WHEN t.estado = 'DONE' THEN t.story_points ELSE 0 END) AS puntos_completados,
       ROUND((SUM(CASE WHEN t.estado = 'DONE' THEN t.story_points ELSE 0 END)::DECIMAL / NULLIF(SUM(t.story_points), 0)) * 100, 1) AS porcentaje_cumplimiento
FROM sprints s
INNER JOIN proyectos pr ON s.id_proyecto = pr.id_proyecto
INNER JOIN tareas_issues t ON s.id_sprint = t.id_sprint
GROUP BY s.id_sprint, s.nombre_sprint, pr.clave_proyecto;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas del SaaS ágil multitenant',
      'Configuré cascada para organizaciones y equipos',
      'Calculé métricas ágiles de velocidad de sprint'
    ]
  },
  {
    id: 40,
    slug: 'db-40-concesionario-taller',
    block: 4,
    blockTitle: 'Macro-Casos Empresariales (10 Tablas Completas)',
    title: 'Cadena de Concesionarios y Taller Mecánico Especializado (10 Tablas)',
    level: 'Experto',
    badgeColor: '#e11d48',
    context: 'Una red automotriz de concesionarios y servicios técnicos gestiona sucursales de venta, clientes, marcas, catálogo maestro de autos, inventario físico de vehículos, ventas de autos nuevos/usados, mecánicos de taller, órdenes de reparación/mantención, catálogo de servicios de taller y detalle de repuestos utilizados con descuento de bodega.',
    statement: 'Crear el esquema de 10 tablas automotrices y formular el cálculo de la liquidación de una orden de taller (Mano de obra + Repuestos).',
    tables: [
      { name: 'concesionarios', desc: 'Sucursales', fields: [{ name: 'id_concesionario', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_sucursal', type: 'VARCHAR(80)', desc: 'Sucursal' }] },
      { name: 'clientes', desc: 'Compradores y dueños', fields: [{ name: 'id_cliente', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'rut', type: 'VARCHAR(12)', unique: true, desc: 'RUT' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }] },
      { name: 'marcas', desc: 'Fabricantes', fields: [{ name: 'id_marca', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_marca', type: 'VARCHAR(40)', unique: true, desc: 'Marca' }] },
      { name: 'vehiculos_catalogo', desc: 'Ficha técnica', fields: [{ name: 'id_modelo', type: 'INT', pk: true, desc: 'PK' }, { name: 'id_marca', type: 'INT', fk: 'marcas.id_marca', desc: 'Marca' }, { name: 'modelo', type: 'VARCHAR(50)', desc: 'Modelo' }] },
      { name: 'inventario_vehiculos', desc: 'Chasis físicos VIN', fields: [{ name: 'id_vehiculo', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_concesionario', type: 'INT', fk: 'concesionarios.id_concesionario', desc: 'Sucursal' }, { name: 'vin_chasis', type: 'VARCHAR(17)', unique: true, desc: 'VIN' }] },
      { name: 'ventas_autos', desc: 'Contratos de venta', fields: [{ name: 'id_venta', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_vehiculo', type: 'BIGINT', fk: 'inventario_vehiculos.id_vehiculo', unique: true, desc: 'Auto' }, { name: 'id_cliente', type: 'BIGINT', fk: 'clientes.id_cliente', desc: 'Comprador' }, { name: 'monto_venta', type: 'DECIMAL(12,2)', desc: 'Precio' }] },
      { name: 'mecanicos', desc: 'Técnicos de taller', fields: [{ name: 'id_mecanico', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre', type: 'VARCHAR(80)', desc: 'Nombre' }, { name: 'tarifa_hora', type: 'DECIMAL(8,2)', desc: 'Tarifa/Hora' }] },
      { name: 'servicios_catalogo', desc: 'Mantenciones', fields: [{ name: 'id_servicio', type: 'INT', pk: true, desc: 'PK' }, { name: 'nombre_servicio', type: 'VARCHAR(80)', desc: 'Servicio' }, { name: 'precio_mano_obra', type: 'DECIMAL(10,2)', desc: 'Mano de obra' }] },
      { name: 'ordenes_taller', desc: 'Ingresos a servicio', fields: [{ name: 'id_orden', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_cliente', type: 'BIGINT', fk: 'clientes.id_cliente', desc: 'Cliente' }, { name: 'id_mecanico', type: 'INT', fk: 'mecanicos.id_mecanico', desc: 'Mecánico' }, { name: 'patente_auto', type: 'VARCHAR(8)', desc: 'Patente' }] },
      { name: 'detalle_repuestos_utilizados', desc: 'Repuestos N:M', fields: [{ name: 'id_detalle', type: 'BIGINT', pk: true, desc: 'PK' }, { name: 'id_orden', type: 'BIGINT', fk: 'ordenes_taller.id_orden', desc: 'Orden' }, { name: 'nombre_repuesto', type: 'VARCHAR(80)', desc: 'Repuesto' }, { name: 'precio_repuesto', type: 'DECIMAL(10,2)', desc: 'Valor' }] }
    ],
    ddlSql: `CREATE TABLE concesionarios (id_concesionario SERIAL PRIMARY KEY, nombre_sucursal VARCHAR(80) NOT NULL);
CREATE TABLE clientes (id_cliente BIGSERIAL PRIMARY KEY, rut VARCHAR(12) UNIQUE NOT NULL, nombre VARCHAR(80) NOT NULL);
CREATE TABLE marcas (id_marca SERIAL PRIMARY KEY, nombre_marca VARCHAR(40) UNIQUE NOT NULL);
CREATE TABLE vehiculos_catalogo (id_modelo SERIAL PRIMARY KEY, id_marca INT NOT NULL, modelo VARCHAR(50) NOT NULL, FOREIGN KEY (id_marca) REFERENCES marcas(id_marca));
CREATE TABLE inventario_vehiculos (id_vehiculo BIGSERIAL PRIMARY KEY, id_concesionario INT NOT NULL, id_modelo INT NOT NULL, vin_chasis VARCHAR(17) UNIQUE NOT NULL, precio_lista DECIMAL(12,2) NOT NULL, vendido BOOLEAN DEFAULT FALSE, FOREIGN KEY (id_concesionario) REFERENCES concesionarios(id_concesionario), FOREIGN KEY (id_modelo) REFERENCES vehiculos_catalogo(id_modelo));
CREATE TABLE ventas_autos (id_venta BIGSERIAL PRIMARY KEY, id_vehiculo BIGINT UNIQUE NOT NULL, id_cliente BIGINT NOT NULL, monto_venta DECIMAL(12,2) NOT NULL, fecha_venta DATE DEFAULT CURRENT_DATE, FOREIGN KEY (id_vehiculo) REFERENCES inventario_vehiculos(id_vehiculo), FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente));
CREATE TABLE mecanicos (id_mecanico SERIAL PRIMARY KEY, nombre VARCHAR(80) NOT NULL, tarifa_hora DECIMAL(8,2) NOT NULL);
CREATE TABLE servicios_catalogo (id_servicio SERIAL PRIMARY KEY, nombre_servicio VARCHAR(80) NOT NULL, precio_mano_obra DECIMAL(10,2) NOT NULL);
CREATE TABLE ordenes_taller (id_orden BIGSERIAL PRIMARY KEY, id_cliente BIGINT NOT NULL, id_mecanico INT NOT NULL, id_servicio INT NOT NULL, patente_auto VARCHAR(8) NOT NULL, fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente), FOREIGN KEY (id_mecanico) REFERENCES mecanicos(id_mecanico), FOREIGN KEY (id_servicio) REFERENCES servicios_catalogo(id_servicio));
CREATE TABLE detalle_repuestos_utilizados (id_detalle BIGSERIAL PRIMARY KEY, id_orden BIGINT NOT NULL, nombre_repuesto VARCHAR(80) NOT NULL, cantidad INT NOT NULL CHECK (cantidad > 0), precio_repuesto DECIMAL(10,2) NOT NULL, FOREIGN KEY (id_orden) REFERENCES ordenes_taller(id_orden) ON DELETE CASCADE);`,
    seedSql: `INSERT INTO concesionarios (nombre_sucursal) VALUES ('Concesionario Central Las Condes');
INSERT INTO clientes (rut, nombre) VALUES ('15.444.333-1', 'Ignacio Abarca');
INSERT INTO marcas (nombre_marca) VALUES ('Toyota');
INSERT INTO vehiculos_catalogo (id_marca, modelo) VALUES (1, 'Hilux 4x4 Diésel');
INSERT INTO inventario_vehiculos (id_concesionario, id_modelo, vin_chasis, precio_lista, vendido) VALUES (1, 1, '8AJHA8CD001234567', 29990000.00, TRUE);
INSERT INTO ventas_autos (id_vehiculo, id_cliente, monto_venta) VALUES (1, 1, 29990000.00);
INSERT INTO mecanicos (nombre, tarifa_hora) VALUES ('Raúl González', 25000.00);
INSERT INTO servicios_catalogo (nombre_servicio, precio_mano_obra) VALUES ('Mantención 10.000 KM + Alineación y Balanceo', 75000.00);
INSERT INTO ordenes_taller (id_cliente, id_mecanico, id_servicio, patente_auto) VALUES (1, 1, 1, 'PP-XX-99');
INSERT INTO detalle_repuestos_utilizados (id_orden, nombre_repuesto, cantidad, precio_repuesto) VALUES
(1, 'Filtro de Aceite Original Toyota', 1, 14990.00),
(1, 'Aceite Sintético 5W-30 (Bidón 5L)', 1, 42990.00),
(1, 'Filtro de Polen A/C', 1, 18990.00);`,
    queriesToSolve: [
      {
        question: 'Generar la Factura de Taller para la Orden 1: Cliente, Patente del Vehículo, Mecánico, Costo Mano de Obra, Subtotal de Repuestos y Total General de la Reparación.',
        hint: 'Suma sc.precio_mano_obra con la suma de (dru.cantidad * dru.precio_repuesto).',
        solutionSql: `SELECT ot.id_orden, c.nombre AS cliente, ot.patente_auto,
       m.nombre AS mecanico, sc.nombre_servicio,
       sc.precio_mano_obra,
       COALESCE(SUM(dru.cantidad * dru.precio_repuesto), 0) AS subtotal_repuestos,
       (sc.precio_mano_obra + COALESCE(SUM(dru.cantidad * dru.precio_repuesto), 0)) AS total_factura_taller
FROM ordenes_taller ot
INNER JOIN clientes c ON ot.id_cliente = c.id_cliente
INNER JOIN mecanicos m ON ot.id_mecanico = m.id_mecanico
INNER JOIN servicios_catalogo sc ON ot.id_servicio = sc.id_servicio
LEFT JOIN detalle_repuestos_utilizados dru ON ot.id_orden = dru.id_orden
WHERE ot.id_orden = 1
GROUP BY ot.id_orden, c.nombre, ot.patente_auto, m.nombre, sc.nombre_servicio, sc.precio_mano_obra;`
      }
    ],
    checkList: [
      'Modelé las 10 tablas integradas del concesionario y taller mecánico',
      'Configuré el ciclo completo desde la venta del auto hasta sus mantenciones periódicas',
      'Calculé liquidaciones de mano de obra y repuestos en SQL'
    ]
  }
];
