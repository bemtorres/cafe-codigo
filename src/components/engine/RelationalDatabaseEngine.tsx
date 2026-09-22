import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';

// ==========================================
// TIPOS Y FORMATO DE ARCHIVO .CYC
// ==========================================

export type DataType =
  | 'INT'
  | 'BIGINT'
  | 'SERIAL'
  | 'BIGSERIAL'
  | 'VARCHAR(50)'
  | 'VARCHAR(100)'
  | 'VARCHAR(255)'
  | 'TEXT'
  | 'DECIMAL(10,2)'
  | 'DECIMAL(12,2)'
  | 'BOOLEAN'
  | 'DATE'
  | 'TIMESTAMP'
  | 'UUID'
  | 'JSONB';

export interface ColumnDef {
  id: string;
  name: string;
  type: DataType;
  pk?: boolean;
  fk?: boolean;
  notNull?: boolean;
  unique?: boolean;
  defaultValue?: string;
  comment?: string;
}

export interface TableTheme {
  id: string;
  name: string;
  headerBg: string;
  headerText: string;
  bodyBg: string;
  border: string;
  badgeBg: string;
  typeColor: string;
}

export const TABLE_THEMES: Record<string, TableTheme> = {
  datamodeler: {
    id: 'datamodeler',
    name: 'Oracle Data Modeler (Clásico)',
    headerBg: '#003366',
    headerText: '#ffffff',
    bodyBg: '#ffffd8',
    border: '#003366',
    badgeBg: '#e0f2fe',
    typeColor: '#15803d',
  },
  slate: {
    id: 'slate',
    name: 'Dark Slate Moderno',
    headerBg: '#0f172a',
    headerText: '#f8fafc',
    bodyBg: '#1e293b',
    border: '#334155',
    badgeBg: '#334155',
    typeColor: '#38bdf8',
  },
  emerald: {
    id: 'emerald',
    name: 'Verde Esmeralda Studio',
    headerBg: '#064e3b',
    headerText: '#ecfdf5',
    bodyBg: '#f0fdf4',
    border: '#059669',
    badgeBg: '#d1fae5',
    typeColor: '#047857',
  },
  indigo: {
    id: 'indigo',
    name: 'Azul Índigo Tech',
    headerBg: '#1e1b4b',
    headerText: '#e0e7ff',
    bodyBg: '#eef2ff',
    border: '#4338ca',
    badgeBg: '#c7d2fe',
    typeColor: '#4f46e5',
  },
  rose: {
    id: 'rose',
    name: 'Rosa Carmesí',
    headerBg: '#881337',
    headerText: '#ffe4e6',
    bodyBg: '#fff1f2',
    border: '#e11d48',
    badgeBg: '#fecdd3',
    typeColor: '#be123c',
  },
  amber: {
    id: 'amber',
    name: 'Ámbar Cálido',
    headerBg: '#78350f',
    headerText: '#fef3c7',
    bodyBg: '#fffbeb',
    border: '#d97706',
    badgeBg: '#fde68a',
    typeColor: '#b45309',
  },
  junction: {
    id: 'junction',
    name: 'Naranja Tabla Pivote N:M',
    headerBg: '#9a3412',
    headerText: '#ffffff',
    bodyBg: '#fff7ed',
    border: '#ea580c',
    badgeBg: '#ffedd5',
    typeColor: '#c2410c',
  },
};

export interface TableNode {
  id: string;
  name: string;
  comment?: string;
  theme: string;
  x: number;
  y: number;
  columns: ColumnDef[];
}

export interface RelationshipEdge {
  id: string;
  sourceTableId: string;
  sourceColumnId: string;
  targetTableId: string;
  targetColumnId: string;
  cardinality: '1:1' | '1:N' | 'N:M';
  onDelete: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
  businessRule?: string;
}

export interface CycSchemaFile {
  version: '1.0';
  generator: 'CafeYCodigo Relational DB Engine';
  metadata: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    author?: string;
  };
  canvas: {
    bgPattern: 'grid' | 'dots' | 'blueprint' | 'dark';
    zoom: number;
  };
  tables: TableNode[];
  relationships: RelationshipEdge[];
}

// ==========================================
// PLANTILLAS PRECARGADAS (STARTER TEMPLATES)
// ==========================================
const TEMPLATES: Record<string, { name: string; desc: string; data: CycSchemaFile }> = {
  ecommerce: {
    name: '🛒 E-Commerce con Pedidos y Productos (N:M)',
    desc: 'Clientes, Pedidos, Detalle de Pedido (Pivote) y Catálogo de Productos con inventario.',
    data: {
      version: '1.0',
      generator: 'CafeYCodigo Relational DB Engine',
      metadata: {
        name: 'Sistema de E-Commerce Global',
        description: 'Modelo relacional para transacciones de compras, inventario y usuarios.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: 'Cafe & Codigo',
      },
      canvas: { bgPattern: 'grid', zoom: 1 },
      tables: [
        {
          id: 'tbl-usuarios',
          name: 'usuarios',
          comment: 'Cuentas de usuario registradas',
          theme: 'datamodeler',
          x: 40,
          y: 40,
          columns: [
            { id: 'u-1', name: 'id_usuario', type: 'SERIAL', pk: true, notNull: true },
            { id: 'u-2', name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true },
            { id: 'u-3', name: 'nombre_completo', type: 'VARCHAR(100)', notNull: true },
            { id: 'u-4', name: 'fecha_registro', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' },
          ],
        },
        {
          id: 'tbl-pedidos',
          name: 'pedidos',
          comment: 'Órdenes de compra emitidas',
          theme: 'indigo',
          x: 380,
          y: 40,
          columns: [
            { id: 'p-1', name: 'id_pedido', type: 'BIGSERIAL', pk: true, notNull: true },
            { id: 'p-2', name: 'id_usuario', type: 'INT', fk: true, notNull: true },
            { id: 'p-3', name: 'fecha_pedido', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' },
            { id: 'p-4', name: 'total_monto', type: 'DECIMAL(12,2)', notNull: true },
            { id: 'p-5', name: 'estado', type: 'VARCHAR(50)', defaultValue: "'PENDIENTE'" },
          ],
        },
        {
          id: 'tbl-detalle',
          name: 'detalle_pedidos',
          comment: 'Tabla intermedia N:M entre Pedidos y Productos',
          theme: 'junction',
          x: 380,
          y: 310,
          columns: [
            { id: 'dp-1', name: 'id_pedido', type: 'BIGINT', pk: true, fk: true, notNull: true },
            { id: 'dp-2', name: 'id_producto', type: 'INT', pk: true, fk: true, notNull: true },
            { id: 'dp-3', name: 'cantidad', type: 'INT', notNull: true },
            { id: 'dp-4', name: 'precio_unitario', type: 'DECIMAL(10,2)', notNull: true },
          ],
        },
        {
          id: 'tbl-productos',
          name: 'productos',
          comment: 'Catálogo de artículos en stock',
          theme: 'emerald',
          x: 40,
          y: 310,
          columns: [
            { id: 'pr-1', name: 'id_producto', type: 'SERIAL', pk: true, notNull: true },
            { id: 'pr-2', name: 'sku', type: 'VARCHAR(50)', unique: true, notNull: true },
            { id: 'pr-3', name: 'nombre_producto', type: 'VARCHAR(100)', notNull: true },
            { id: 'pr-4', name: 'precio_catalogo', type: 'DECIMAL(10,2)', notNull: true },
            { id: 'pr-5', name: 'stock_disponible', type: 'INT', notNull: true },
          ],
        },
      ],
      relationships: [
        {
          id: 'rel-1',
          sourceTableId: 'tbl-pedidos',
          sourceColumnId: 'p-2',
          targetTableId: 'tbl-usuarios',
          targetColumnId: 'u-1',
          cardinality: '1:N',
          onDelete: 'CASCADE',
          businessRule: 'Un usuario puede generar múltiples pedidos (1:N)',
        },
        {
          id: 'rel-2',
          sourceTableId: 'tbl-detalle',
          sourceColumnId: 'dp-1',
          targetTableId: 'tbl-pedidos',
          targetColumnId: 'p-1',
          cardinality: '1:N',
          onDelete: 'CASCADE',
          businessRule: 'Un pedido contiene múltiples líneas de detalle (1:N)',
        },
        {
          id: 'rel-3',
          sourceTableId: 'tbl-detalle',
          sourceColumnId: 'dp-2',
          targetTableId: 'tbl-productos',
          targetColumnId: 'pr-1',
          cardinality: '1:N',
          onDelete: 'RESTRICT',
          businessRule: 'Un producto puede estar en múltiples órdenes de compra (1:N)',
        },
      ],
    },
  },
  rbac: {
    name: '🔐 Seguridad RBAC (Usuarios, Perfil 1:1, Roles y Permisos)',
    desc: 'Esquema de autenticación con Perfil 1:1, Roles y Permisos en relación N:M.',
    data: {
      version: '1.0',
      generator: 'CafeYCodigo Relational DB Engine',
      metadata: {
        name: 'Sistema de Autenticación RBAC',
        description: 'Control de acceso basado en roles y permisos atómicos.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: 'Cafe & Codigo',
      },
      canvas: { bgPattern: 'blueprint', zoom: 1 },
      tables: [
        {
          id: 'tbl-usuarios',
          name: 'usuarios',
          comment: 'Credenciales de acceso',
          theme: 'slate',
          x: 40,
          y: 40,
          columns: [
            { id: 'u-1', name: 'id_usuario', type: 'SERIAL', pk: true, notNull: true },
            { id: 'u-2', name: 'username', type: 'VARCHAR(50)', unique: true, notNull: true },
            { id: 'u-3', name: 'email', type: 'VARCHAR(100)', unique: true, notNull: true },
            { id: 'u-4', name: 'password_hash', type: 'VARCHAR(255)', notNull: true },
            { id: 'u-5', name: 'id_rol', type: 'INT', fk: true, notNull: true },
          ],
        },
        {
          id: 'tbl-perfiles',
          name: 'perfiles',
          comment: 'Datos personales 1:1',
          theme: 'amber',
          x: 40,
          y: 310,
          columns: [
            { id: 'pf-1', name: 'id_perfil', type: 'SERIAL', pk: true, notNull: true },
            { id: 'pf-2', name: 'id_usuario', type: 'INT', fk: true, unique: true, notNull: true },
            { id: 'pf-3', name: 'avatar_url', type: 'VARCHAR(255)' },
            { id: 'pf-4', name: 'telefono', type: 'VARCHAR(50)' },
          ],
        },
        {
          id: 'tbl-roles',
          name: 'roles',
          comment: 'Grupos de roles',
          theme: 'indigo',
          x: 380,
          y: 40,
          columns: [
            { id: 'r-1', name: 'id_rol', type: 'SERIAL', pk: true, notNull: true },
            { id: 'r-2', name: 'nombre_rol', type: 'VARCHAR(50)', unique: true, notNull: true },
            { id: 'r-3', name: 'descripcion', type: 'TEXT' },
          ],
        },
        {
          id: 'tbl-rol-permisos',
          name: 'rol_permisos',
          comment: 'Tabla intermedia N:M',
          theme: 'junction',
          x: 380,
          y: 280,
          columns: [
            { id: 'rp-1', name: 'id_rol', type: 'INT', pk: true, fk: true, notNull: true },
            { id: 'rp-2', name: 'id_permiso', type: 'INT', pk: true, fk: true, notNull: true },
          ],
        },
        {
          id: 'tbl-permisos',
          name: 'permisos',
          comment: 'Permisos granulares',
          theme: 'emerald',
          x: 720,
          y: 280,
          columns: [
            { id: 'pm-1', name: 'id_permiso', type: 'SERIAL', pk: true, notNull: true },
            { id: 'pm-2', name: 'codigo_permiso', type: 'VARCHAR(50)', unique: true, notNull: true },
          ],
        },
      ],
      relationships: [
        {
          id: 'rel-u-pf',
          sourceTableId: 'tbl-perfiles',
          sourceColumnId: 'pf-2',
          targetTableId: 'tbl-usuarios',
          targetColumnId: 'u-1',
          cardinality: '1:1',
          onDelete: 'CASCADE',
          businessRule: 'Cada usuario tiene exactamente un único perfil (1:1 UNIQUE)',
        },
        {
          id: 'rel-u-r',
          sourceTableId: 'tbl-usuarios',
          sourceColumnId: 'u-5',
          targetTableId: 'tbl-roles',
          targetColumnId: 'r-1',
          cardinality: '1:N',
          onDelete: 'RESTRICT',
          businessRule: 'Un rol agrupa múltiples usuarios (1:N)',
        },
        {
          id: 'rel-rp-r',
          sourceTableId: 'tbl-rol-permisos',
          sourceColumnId: 'rp-1',
          targetTableId: 'tbl-roles',
          targetColumnId: 'r-1',
          cardinality: '1:N',
          onDelete: 'CASCADE',
          businessRule: 'Un rol tiene múltiples permisos (1:N)',
        },
        {
          id: 'rel-rp-pm',
          sourceTableId: 'tbl-rol-permisos',
          sourceColumnId: 'rp-2',
          targetTableId: 'tbl-permisos',
          targetColumnId: 'pm-1',
          cardinality: '1:N',
          onDelete: 'CASCADE',
          businessRule: 'Un permiso puede pertenecer a múltiples roles (1:N)',
        },
      ],
    },
  },
};

export default function RelationalDatabaseEngine() {
  // Estado del esquema
  const [schema, setSchema] = useState<CycSchemaFile>(TEMPLATES.ecommerce.data);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<string | null>(null);

  // Estados de interfaz / modales
  const [activeModal, setActiveModal] = useState<'table' | 'relation' | 'json' | 'sql' | 'templates' | 'guide' | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [editingTable, setEditingTable] = useState<TableNode | null>(null);
  const [jsonText, setJsonText] = useState<string>('');
  const [sqlDialect, setSqlDialect] = useState<'postgresql' | 'mysql' | 'sqlite' | 'oracle'>('postgresql');
  const [bgPattern, setBgPattern] = useState<'grid' | 'dots' | 'blueprint' | 'dark'>('grid');

  // Canvas y navegación
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggingTableId, setDraggingTableId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  // Creación interactiva de relaciones por arrastre de handle
  const [connectingSource, setConnectingSource] = useState<{ tableId: string; columnId: string } | null>(null);
  const [mouseCanvasPos, setMouseCanvasPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Autoguardado local en navegador
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aprende_db_engine_draft_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.tables) {
          setSchema(parsed);
          if (parsed.canvas?.bgPattern) setBgPattern(parsed.canvas.bgPattern);
        }
      }
    } catch {
      // Ignorar errores de parseo
    }
  }, []);

  const saveToLocalStorage = useCallback((updated: CycSchemaFile) => {
    try {
      localStorage.setItem('aprende_db_engine_draft_v1', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateSchema = (updater: (prev: CycSchemaFile) => CycSchemaFile) => {
    setSchema((prev) => {
      const next = updater(prev);
      next.metadata.updatedAt = new Date().toISOString();
      saveToLocalStorage(next);
      return next;
    });
  };

  // ==========================================
  // MANEJO DE DRAG & DROP Y PAN DEL CANVAS
  // ==========================================
  const handleMouseDownTable = (e: React.MouseEvent, tableId: string) => {
    e.stopPropagation();
    setSelectedTableId(tableId);
    setSelectedRelationshipId(null);
    setDraggingTableId(tableId);

    const tbl = schema.tables.find((t) => t.id === tableId);
    if (!tbl) return;

    setDragOffset({
      x: e.clientX - tbl.x * zoom,
      y: e.clientY - tbl.y * zoom,
    });
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setSelectedTableId(null);
      setSelectedRelationshipId(null);
      setIsPanning(true);
      setDragOffset({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Actualizar posición de mouse en el canvas para línea elástica de conexión
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMouseCanvasPos({
        x: (e.clientX - rect.left - pan.x) / zoom,
        y: (e.clientY - rect.top - pan.y) / zoom,
      });
    }

    if (draggingTableId) {
      const newX = Math.round((e.clientX - dragOffset.x) / zoom);
      const newY = Math.round((e.clientY - dragOffset.y) / zoom);

      updateSchema((prev) => ({
        ...prev,
        tables: prev.tables.map((tbl) =>
          tbl.id === draggingTableId
            ? { ...tbl, x: Math.max(10, newX), y: Math.max(10, newY) }
            : tbl
        ),
      }));
    } else if (isPanning) {
      setPan({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingTableId(null);
    setIsPanning(false);
    if (connectingSource) {
      setConnectingSource(null);
    }
  };

  // ==========================================
  // CONEXIÓN DE CAMPOS MEDIANTE HANDLES
  // ==========================================
  const handleStartConnection = (e: React.MouseEvent, tableId: string, columnId: string) => {
    e.stopPropagation();
    setConnectingSource({ tableId, columnId });
  };

  const handleEndConnection = (e: React.MouseEvent, targetTableId: string, targetColumnId: string) => {
    e.stopPropagation();
    if (!connectingSource) return;

    if (connectingSource.tableId === targetTableId) {
      alert('Una clave foránea normalmente apunta a otra tabla.');
      setConnectingSource(null);
      return;
    }

    // Crear la relación
    const newRel: RelationshipEdge = {
      id: `rel-${Date.now()}`,
      sourceTableId: connectingSource.tableId,
      sourceColumnId: connectingSource.columnId,
      targetTableId: targetTableId,
      targetColumnId: targetColumnId,
      cardinality: '1:N',
      onDelete: 'CASCADE',
      businessRule: 'Relación de Integridad Referencial FK',
    };

    // Marcar el campo de origen como FK
    updateSchema((prev) => ({
      ...prev,
      tables: prev.tables.map((t) => {
        if (t.id === connectingSource.tableId) {
          return {
            ...t,
            columns: t.columns.map((c) =>
              c.id === connectingSource.columnId ? { ...c, fk: true } : c
            ),
          };
        }
        return t;
      }),
      relationships: [...prev.relationships, newRel],
    }));

    setConnectingSource(null);
  };

  // ==========================================
  // COORDENADAS DE HANDLES PARA LÍNEAS BEZIER
  // ==========================================
  const getHandleCoords = (tableId: string, columnId: string, isSourceSide: boolean) => {
    const tbl = schema.tables.find((t) => t.id === tableId);
    if (!tbl) return { x: 0, y: 0 };

    const colIndex = tbl.columns.findIndex((c) => c.id === columnId);
    const HEADER_HEIGHT = 44;
    const ROW_HEIGHT = 30;
    const NODE_WIDTH = 270;

    const y = tbl.y + HEADER_HEIGHT + (colIndex >= 0 ? colIndex : 0) * ROW_HEIGHT + ROW_HEIGHT / 2;
    const x = tbl.x + (isSourceSide ? 0 : NODE_WIDTH);

    return { x, y };
  };

  // ==========================================
  // IMPORT / EXPORT: .CYC, JSON, IMAGEN, SQL
  // ==========================================
  const handleDownloadCyc = () => {
    const dataStr = JSON.stringify(schema, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (schema.metadata.name || 'modelo_relacional')
      .toLowerCase()
      .replace(/\s+/g, '_');
    link.href = url;
    link.download = `${safeName}.cyc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenCycFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content) as CycSchemaFile;
        if (parsed && Array.isArray(parsed.tables)) {
          setSchema(parsed);
          saveToLocalStorage(parsed);
          alert(`¡Modelo "${parsed.metadata?.name || file.name}" cargado exitosamente!`);
        } else {
          alert('El archivo no tiene el formato .cyc / JSON de base de datos válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo .cyc. Verifica que sea un JSON válido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed && Array.isArray(parsed.tables)) {
        setSchema(parsed);
        saveToLocalStorage(parsed);
        setActiveModal(null);
        alert('¡Diseño actualizado desde JSON!');
      } else {
        alert('El JSON debe contener al menos un arreglo de "tables".');
      }
    } catch {
      alert('Error de sintaxis en el JSON. Por favor verifica las comas y comillas.');
    }
  };

  const handleExportImagePng = () => {
    if (!canvasRef.current) return;

    // Crear un SVG completo con las tablas y conexiones
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const canvasWidth = 2400;
    const canvasHeight = 1600;

    svgEl.setAttribute('width', canvasWidth.toString());
    svgEl.setAttribute('height', canvasHeight.toString());
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Fondo
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', '100%');
    bgRect.setAttribute('height', '100%');
    bgRect.setAttribute('fill', bgPattern === 'dark' ? '#0f172a' : '#f8fafc');
    svgEl.appendChild(bgRect);

    // Contenido clonado
    const clone = canvasRef.current.querySelector('.engine-stage')?.cloneNode(true) as HTMLElement;
    if (clone) {
      const foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
      foreign.setAttribute('width', '100%');
      foreign.setAttribute('height', '100%');
      foreign.appendChild(clone);
      svgEl.appendChild(foreign);
    }

    const xml = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgPattern === 'dark' ? '#0f172a' : '#f8fafc';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${schema.metadata.name || 'diagrama_relacional'}.png`;
        a.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // ==========================================
  // GENERADOR SQL DDL MULTI-DIALECTO
  // ==========================================
  const generatedSql = useMemo(() => {
    const lines: string[] = [];
    lines.push(`-- =================================================`);
    lines.push(`-- MODELO RELACIONAL: ${schema.metadata.name}`);
    lines.push(`-- Generado con CafeYCodigo Relational DB Engine`);
    lines.push(`-- Fecha: ${new Date().toLocaleString()}`);
    lines.push(`-- Dialecto: ${sqlDialect.toUpperCase()}`);
    lines.push(`-- =================================================\n`);

    schema.tables.forEach((tbl) => {
      lines.push(`-- Tabla: ${tbl.name}`);
      lines.push(`CREATE TABLE ${tbl.name} (`);

      const colLines: string[] = [];
      const pkCols: string[] = [];

      tbl.columns.forEach((col) => {
        let colDef = `    ${col.name} ${col.type}`;

        if (col.notNull && !col.pk) colDef += ' NOT NULL';
        if (col.unique && !col.pk) colDef += ' UNIQUE';
        if (col.defaultValue) colDef += ` DEFAULT ${col.defaultValue}`;

        colLines.push(colDef);

        if (col.pk) pkCols.push(col.name);
      });

      if (pkCols.length > 0) {
        colLines.push(`    CONSTRAINT pk_${tbl.name} PRIMARY KEY (${pkCols.join(', ')})`);
      }

      // Llaves Foráneas de la tabla
      const tableRels = schema.relationships.filter((r) => r.sourceTableId === tbl.id);
      tableRels.forEach((rel) => {
        const srcCol = tbl.columns.find((c) => c.id === rel.sourceColumnId)?.name;
        const tgtTbl = schema.tables.find((t) => t.id === rel.targetTableId);
        const tgtCol = tgtTbl?.columns.find((c) => c.id === rel.targetColumnId)?.name;

        if (srcCol && tgtTbl && tgtCol) {
          colLines.push(
            `    CONSTRAINT fk_${tbl.name}_${tgtTbl.name} FOREIGN KEY (${srcCol}) REFERENCES ${tgtTbl.name}(${tgtCol}) ON DELETE ${rel.onDelete}`
          );
        }
      });

      lines.push(colLines.join(',\n'));
      lines.push(`);\n`);
    });

    return lines.join('\n');
  }, [schema, sqlDialect]);

  // ==========================================
  // OPERACIONES CRUD DE TABLAS Y CAMPOS
  // ==========================================
  const handleAddNewTable = () => {
    const count = schema.tables.length + 1;
    const newTbl: TableNode = {
      id: `tbl-${Date.now()}`,
      name: `tabla_${count}`,
      theme: 'datamodeler',
      x: 60 + (count % 3) * 280,
      y: 60 + Math.floor(count / 3) * 240,
      columns: [
        { id: `c-${Date.now()}-1`, name: `id_${count}`, type: 'SERIAL', pk: true, notNull: true },
        { id: `c-${Date.now()}-2`, name: 'nombre', type: 'VARCHAR(100)', notNull: true },
        { id: `c-${Date.now()}-3`, name: 'creado_el', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' },
      ],
    };

    updateSchema((prev) => ({
      ...prev,
      tables: [...prev.tables, newTbl],
    }));
    setSelectedTableId(newTbl.id);
  };

  const handleOpenEditTable = (tbl: TableNode) => {
    setEditingTable(JSON.parse(JSON.stringify(tbl)));
    setActiveModal('table');
  };

  const handleSaveEditedTable = () => {
    if (!editingTable) return;
    updateSchema((prev) => ({
      ...prev,
      tables: prev.tables.map((t) => (t.id === editingTable.id ? editingTable : t)),
    }));
    setActiveModal(null);
    setEditingTable(null);
  };

  const handleDeleteTable = (tableId: string) => {
    if (!confirm('¿Seguro que deseas eliminar esta tabla y sus relaciones?')) return;
    updateSchema((prev) => ({
      ...prev,
      tables: prev.tables.filter((t) => t.id !== tableId),
      relationships: prev.relationships.filter(
        (r) => r.sourceTableId !== tableId && r.targetTableId !== tableId
      ),
    }));
    setSelectedTableId(null);
  };

  const handleDeleteRelationship = (relId: string) => {
    updateSchema((prev) => ({
      ...prev,
      relationships: prev.relationships.filter((r) => r.id !== relId),
    }));
    setSelectedRelationshipId(null);
  };

  return (
    <div className="relational-engine-root w-full h-full flex flex-col flex-1 overflow-hidden font-sans select-none bg-slate-100">
      
      {/* INPUT OCULTO PARA ABRIR ARCHIVOS .CYC */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".cyc,.json"
        className="hidden"
        onChange={handleOpenCycFile}
      />

      {/* =======================================================
          BARRA DE HERRAMIENTAS PRINCIPAL (STUDIO TOOLBAR)
          ======================================================= */}
      <header className="engine-header bg-white border-b-2 border-slate-300 px-3 sm:px-4 py-2 flex items-center justify-between gap-3 shrink-0 shadow-sm z-20 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#003366] to-[#0284c7] text-white flex items-center justify-center text-base border border-[#1E1210] shadow-sm shrink-0">
            🗄️
          </span>
          <div className="flex items-center gap-2">
            <h1 className="m-0 text-sm sm:text-base font-black text-[#1E1210] tracking-tight">
              {schema.metadata.name || 'Diseñador Relacional'}
            </h1>
            <span className="text-[0.62rem] font-mono font-black bg-blue-100 text-blue-900 border border-blue-300 px-1.5 py-0.5 rounded">
              .CYC
            </span>
            <span className="hidden xl:inline text-[0.7rem] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {schema.tables.length} Tablas · {schema.relationships.length} Relaciones
            </span>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN RÁPIDA */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={handleAddNewTable}
            className="px-2.5 py-1.5 bg-[#003366] hover:bg-[#002244] text-white text-xs font-black rounded-lg border-2 border-[#1E1210] shadow-[1.5px_1.5px_0px_#1E1210] flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02]"
            title="Crear nueva tabla en el canvas"
          >
            <span>➕</span>
            <span>Tabla</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('templates')}
            className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black rounded-lg border-2 border-[#1E1210] shadow-[1.5px_1.5px_0px_#1E1210] flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02]"
            title="Cargar plantillas predefinidas (Ecommerce, Escuelas, Redes)"
          >
            <span>📦</span>
            <span className="hidden sm:inline">Plantillas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('sql')}
            className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-black rounded-lg border-2 border-[#1E1210] shadow-[1.5px_1.5px_0px_#1E1210] flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02]"
            title="Generar SQL DDL para PostgreSQL, MySQL, SQLite, Oracle"
          >
            <span>⚡</span>
            <span>SQL DDL</span>
          </button>

          <div className="h-5 w-[1px] bg-slate-300 mx-1 hidden sm:block" />

          {/* MENÚ DE GUARDAR Y CARGAR */}
          <button
            type="button"
            onClick={handleDownloadCyc}
            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-lg border-2 border-[#1E1210] shadow-[1.5px_1.5px_0px_#1E1210] flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02]"
            title="Guardar archivo .cyc en tu computadora"
          >
            <span>💾</span>
            <span className="hidden md:inline">Guardar .cyc</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-[#1E1210] text-xs font-black rounded-lg border-2 border-[#1E1210] shadow-[1.5px_1.5px_0px_#1E1210] flex items-center gap-1 cursor-pointer transition-all hover:scale-[1.02]"
            title="Abrir archivo .cyc o JSON existente"
          >
            <span>📂</span>
            <span className="hidden md:inline">Abrir .cyc</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setJsonText(JSON.stringify(schema, null, 2));
              setActiveModal('json');
            }}
            className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-lg border border-slate-300 cursor-pointer"
            title="Ver / Pegar código JSON directo"
          >
            📋 JSON
          </button>

          <button
            type="button"
            onClick={handleExportImagePng}
            className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-lg border border-slate-300 cursor-pointer"
            title="Exportar como Imagen PNG"
          >
            🖼️ PNG
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('guide')}
            className="px-2 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-black rounded-lg border border-sky-300 cursor-pointer flex items-center gap-1"
            title="Ver documentación del formato .cyc y reglas de diseño"
          >
            <span>📖</span>
            <span className="hidden lg:inline">Guía</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`px-2.5 py-1.5 text-xs font-black rounded-lg border-2 border-[#1E1210] transition-all flex items-center gap-1 cursor-pointer ${
              isSidebarOpen ? 'bg-indigo-600 text-white shadow-[1.5px_1.5px_0px_#1E1210]' : 'bg-white text-slate-700 shadow-sm'
            }`}
            title="Mostrar / Ocultar panel inspector de propiedades"
          >
            <span>⚙️</span>
            <span className="hidden sm:inline">Inspector</span>
          </button>
        </div>
      </header>

      {/* =======================================================
          ÁREA PRINCIPAL DE DISEÑO: CANVAS + PANEL LATERAL (FULL VIEWPORT)
          ======================================================= */}
      <div className="engine-workspace flex-1 w-full h-full min-h-0 flex flex-row overflow-hidden relative">
        
        {/* CANVAS STUDIO INTERACTIVO */}
        <div className="engine-canvas-container flex-1 h-full min-h-0 flex flex-col overflow-hidden relative bg-white">
          
          {/* BARRA SUPERIOR DEL CANVAS */}
          <div className="canvas-toolbar bg-slate-100 px-4 py-2 border-b-2 border-[#1E1210] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black text-slate-700">
                Lienzo: {schema.tables.length} Tablas · {schema.relationships.length} Relaciones
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBgPattern('grid')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'grid' ? 'bg-[#1E1210] text-white border-[#1E1210]' : 'bg-white text-slate-700'
                  }`}
                >
                  Cuadrícula
                </button>
                <button
                  type="button"
                  onClick={() => setBgPattern('dots')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'dots' ? 'bg-[#1E1210] text-white border-[#1E1210]' : 'bg-white text-slate-700'
                  }`}
                >
                  Puntos
                </button>
                <button
                  type="button"
                  onClick={() => setBgPattern('blueprint')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'blueprint' ? 'bg-[#1E1210] text-white border-[#1E1210]' : 'bg-white text-slate-700'
                  }`}
                >
                  Blueprint
                </button>
                <button
                  type="button"
                  onClick={() => setBgPattern('dark')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'dark' ? 'bg-[#1E1210] text-white border-[#1E1210]' : 'bg-white text-slate-700'
                  }`}
                >
                  Oscuro
                </button>
              </div>
            </div>

            {/* CONTROLES DE ZOOM Y RESET */}
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-300 shadow-sm">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(Number((z + 0.15).toFixed(2)), 1.8))}
                className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-[#1E1210] font-black text-xs cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <span className="text-[0.7rem] font-mono font-bold px-1">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(Number((z - 0.15).toFixed(2)), 0.5))}
                className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-[#1E1210] font-black text-xs cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="px-2 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                title="Centrar y Resetear"
              >
                ⟲ Centrar
              </button>
            </div>
          </div>

          {/* LIENZO DE ARRASTRE */}
          <div
            ref={canvasRef}
            className={`engine-canvas-viewport relative w-full h-full flex-1 min-h-0 overflow-hidden cursor-grab active:cursor-grabbing ${
              bgPattern === 'dark' ? 'bg-[#0b0f19]' : bgPattern === 'blueprint' ? 'bg-[#0f284e]' : 'bg-[#fafcff]'
            }`}
            style={{
              backgroundImage:
                bgPattern === 'dots'
                  ? 'radial-gradient(circle, #94a3b8 1.2px, transparent 1.2px)'
                  : bgPattern === 'blueprint'
                  ? 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)'
                  : bgPattern === 'dark'
                  ? 'radial-gradient(circle, rgba(255,255,255,0.15) 1.2px, transparent 1.2px)'
                  : 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            onMouseDown={handleMouseDownCanvas}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="engine-stage absolute top-0 left-0 w-full h-full origin-top-left transition-transform duration-75"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {/* CAPA SVG: EDGES, CURVAS BEZIER Y FLECHAS DE CONEXIÓN */}
              <svg className="absolute top-0 left-0 w-[5000px] h-[5000px] pointer-events-none z-10">
                <defs>
                  <marker
                    id="engine-arrow-head"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
                  </marker>
                  <marker
                    id="engine-arrow-head-hover"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Relaciones Existentes */}
                {schema.relationships.map((rel) => {
                  const src = getHandleCoords(rel.sourceTableId, rel.sourceColumnId, true);
                  const tgt = getHandleCoords(rel.targetTableId, rel.targetColumnId, false);

                  const dx = Math.abs(tgt.x - src.x) * 0.55;
                  const pathData = `M ${src.x} ${src.y} C ${src.x - dx} ${src.y}, ${tgt.x + dx} ${tgt.y}, ${tgt.x} ${tgt.y}`;

                  const midX = (src.x + tgt.x) / 2;
                  const midY = (src.y + tgt.y) / 2;
                  const isHovered = hoveredEdgeId === rel.id || selectedRelationshipId === rel.id;

                  return (
                    <g
                      key={rel.id}
                      className="edge-group cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHoveredEdgeId(rel.id)}
                      onMouseLeave={() => setHoveredEdgeId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRelationshipId(rel.id);
                        setSelectedTableId(null);
                      }}
                    >
                      {/* Área de clic ancha */}
                      <path d={pathData} fill="none" stroke="transparent" strokeWidth="20" />

                      {/* Línea visible de relación */}
                      <path
                        d={pathData}
                        fill="none"
                        stroke={isHovered ? '#10b981' : '#2563eb'}
                        strokeWidth={isHovered ? '3.5' : '2.5'}
                        strokeDasharray={rel.cardinality === '1:1' ? '6 4' : undefined}
                        markerEnd={`url(#${isHovered ? 'engine-arrow-head-hover' : 'engine-arrow-head'})`}
                        className="transition-all duration-150"
                      />

                      {/* Badge Central de Cardinalidad */}
                      <foreignObject
                        x={midX - 30}
                        y={midY - 14}
                        width="60"
                        height="28"
                        className="overflow-visible"
                      >
                        <div
                          className={`text-[0.62rem] font-mono font-black px-1.5 py-0.5 rounded-md border text-center shadow-sm flex items-center justify-center ${
                            isHovered
                              ? 'bg-emerald-500 text-white border-emerald-600 scale-110'
                              : 'bg-white text-blue-900 border-blue-400'
                          } transition-all duration-150`}
                          title={rel.businessRule || 'Relación FK'}
                        >
                          {rel.cardinality}
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}

                {/* Línea elástica interactiva al arrastrar desde un handle */}
                {connectingSource && (
                  <path
                    d={`M ${getHandleCoords(connectingSource.tableId, connectingSource.columnId, true).x} ${
                      getHandleCoords(connectingSource.tableId, connectingSource.columnId, true).y
                    } L ${mouseCanvasPos.x} ${mouseCanvasPos.y}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                )}
              </svg>

              {/* NODOS DE TABLAS (REACT FLOW SCHEMA NODES) */}
              {schema.tables.map((tbl) => {
                const theme = TABLE_THEMES[tbl.theme] || TABLE_THEMES.datamodeler;
                const isSelected = selectedTableId === tbl.id;
                const pkCols = tbl.columns.filter((c) => c.pk);

                return (
                  <div
                    key={tbl.id}
                    id={`table-node-${tbl.id}`}
                    className={`table-schema-node absolute w-[270px] rounded-xl border-2 transition-shadow overflow-hidden z-20 ${
                      isSelected
                        ? 'ring-4 ring-blue-500 ring-offset-2 shadow-[6px_6px_0px_#1E1210]'
                        : 'shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.35)]'
                    }`}
                    style={{
                      left: `${tbl.x}px`,
                      top: `${tbl.y}px`,
                      backgroundColor: theme.bodyBg,
                      borderColor: theme.border,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTableId(tbl.id);
                      setSelectedRelationshipId(null);
                    }}
                  >
                    {/* CABECERA DE TABLA */}
                    <div
                      className="table-node-header px-3 py-2 flex items-center justify-between cursor-move border-b-2"
                      style={{
                        backgroundColor: theme.headerBg,
                        color: theme.headerText,
                        borderColor: theme.border,
                      }}
                      onMouseDown={(e) => handleMouseDownTable(e, tbl.id)}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs">🗄️</span>
                        <span className="font-mono font-bold text-xs truncate" title={tbl.name}>
                          {tbl.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditTable(tbl);
                          }}
                          className="w-5 h-5 flex items-center justify-center rounded bg-white/20 hover:bg-white/40 text-white text-[0.65rem] cursor-pointer"
                          title="Editar Tabla y Columnas"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTable(tbl.id);
                          }}
                          className="w-5 h-5 flex items-center justify-center rounded bg-red-500/80 hover:bg-red-600 text-white text-[0.65rem] cursor-pointer"
                          title="Eliminar Tabla"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* LISTADO DE COLUMNAS CON HANDLES */}
                    <div className="table-node-body py-1 flex flex-col font-mono text-xs">
                      {tbl.columns.map((col) => {
                        const isPk = col.pk;
                        const isFk = col.fk;
                        const isNotNull = col.notNull || isPk;

                        let prefix = isPk && isFk ? 'PF' : isPk ? 'PK' : isFk ? 'FK' : '';

                        return (
                          <div
                            key={col.id}
                            className={`column-row relative flex items-center justify-between px-3 py-1.5 text-[0.72rem] leading-tight border-b border-black/5 hover:bg-black/5 transition-colors ${
                              isPk ? 'bg-amber-100/50 font-bold' : isFk ? 'bg-blue-100/40 font-semibold' : ''
                            }`}
                          >
                            {/* HANDLE IZQUIERDO (Target / Incoming) */}
                            <button
                              type="button"
                              className={`handle-port absolute -left-[7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm cursor-crosshair transition-transform hover:scale-125 ${
                                isFk ? 'bg-blue-600' : isPk ? 'bg-amber-500' : 'bg-slate-400'
                              }`}
                              title="Soltar conexión aquí"
                              onMouseUp={(e) => handleEndConnection(e, tbl.id, col.id)}
                            />

                            {/* PREFIJO, RESTRICCIONES Y NOMBRE */}
                            <div className="flex items-center gap-1 min-w-0 flex-1 pr-2">
                              {prefix && (
                                <span
                                  className={`text-[0.6rem] font-black px-1 rounded uppercase ${
                                    prefix === 'PK'
                                      ? 'bg-amber-400 text-amber-950'
                                      : prefix === 'FK'
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-orange-600 text-white'
                                  }`}
                                >
                                  {prefix}
                                </span>
                              )}
                              <span
                                className={`text-[0.65rem] font-black ${
                                  isNotNull ? 'text-red-600' : 'text-slate-400'
                                }`}
                              >
                                {isNotNull ? '*' : 'o'}
                              </span>
                              <span className="truncate text-slate-900" title={col.name}>
                                {col.name}
                              </span>
                            </div>

                            {/* TIPO DE DATO */}
                            <div className="text-right shrink-0">
                              <span
                                className="text-[0.68rem] font-bold"
                                style={{ color: theme.typeColor }}
                              >
                                {col.type}
                              </span>
                            </div>

                            {/* HANDLE DERECHO (Source / Outgoing) */}
                            <button
                              type="button"
                              className={`handle-port absolute -right-[7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm cursor-crosshair transition-transform hover:scale-125 ${
                                isPk ? 'bg-amber-500' : isFk ? 'bg-blue-600' : 'bg-slate-400'
                              }`}
                              title="Arrastrar para conectar con otra tabla"
                              onMouseDown={(e) => handleStartConnection(e, tbl.id, col.id)}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* PIE DE TABLA (Constraints) */}
                    <div className="table-node-footer bg-black/5 px-3 py-1.5 border-t border-black/10 flex flex-col gap-0.5 text-[0.65rem] font-mono text-slate-700">
                      {pkCols.length > 0 && (
                        <div className="flex items-center gap-1 text-amber-900 font-bold truncate">
                          <span>🗝️</span>
                          <span>{tbl.name}_PK ({pkCols.map((c) => c.name).join(', ')})</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================================================
            PANEL LATERAL: INSPECTOR DE TABLAS / RELACIONES
            ======================================================= */}
        {isSidebarOpen && (
          <aside className="engine-sidebar w-80 lg:w-88 h-full bg-white border-l-2 border-slate-300 flex flex-col shrink-0 shadow-lg z-20 overflow-y-auto p-4 gap-4">
            
            <div className="border-b-2 border-slate-200 pb-2 flex items-center justify-between">
              <h2 className="text-sm font-black text-[#1E1210] m-0 flex items-center gap-1.5">
                <span>⚙️</span> Inspector
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.65rem] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {selectedTableId ? 'Tabla' : selectedRelationshipId ? 'Relación' : 'Modelo'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-6 h-6 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer"
                  title="Ocultar inspector (Maximizar Canvas)"
                >
                  ✕
                </button>
              </div>
            </div>

          {/* INSPECTOR DE TABLA SELECCIONADA */}
          {selectedTableId && (() => {
            const tbl = schema.tables.find((t) => t.id === selectedTableId);
            if (!tbl) return null;
            return (
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre de la Tabla:</label>
                  <input
                    type="text"
                    value={tbl.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSchema((prev) => ({
                        ...prev,
                        tables: prev.tables.map((t) => (t.id === tbl.id ? { ...t, name: val } : t)),
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-mono font-bold text-xs bg-slate-50"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tema Visual de Color:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.values(TABLE_THEMES).map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => {
                          updateSchema((prev) => ({
                            ...prev,
                            tables: prev.tables.map((t) =>
                              t.id === tbl.id ? { ...t, theme: th.id } : t
                            ),
                          }));
                        }}
                        className={`px-2 py-1 rounded-lg text-[0.68rem] font-bold border flex items-center gap-1.5 ${
                          tbl.theme === th.id ? 'border-2 border-black ring-2 ring-blue-500' : 'border-slate-300'
                        }`}
                        style={{ backgroundColor: th.bodyBg }}
                      >
                        <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: th.headerBg }} />
                        <span className="truncate">{th.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => handleOpenEditTable(tbl)}
                    className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs"
                  >
                    ✏️ Editar Columnas ({tbl.columns.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTable(tbl.id)}
                    className="py-1.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl border-2 border-red-300 text-xs"
                    title="Eliminar tabla"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })()}

          {/* INSPECTOR DE RELACIÓN SELECCIONADA */}
          {selectedRelationshipId && (() => {
            const rel = schema.relationships.find((r) => r.id === selectedRelationshipId);
            if (!rel) return null;
            const srcTbl = schema.tables.find((t) => t.id === rel.sourceTableId);
            const tgtTbl = schema.tables.find((t) => t.id === rel.targetTableId);

            return (
              <div className="flex flex-col gap-3 text-xs">
                <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                  <span className="text-[0.65rem] uppercase font-bold text-blue-800 block">Conexión FK:</span>
                  <p className="font-mono font-bold text-slate-800 m-0">
                    {srcTbl?.name} → {tgtTbl?.name}
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cardinalidad:</label>
                  <select
                    value={rel.cardinality}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      updateSchema((prev) => ({
                        ...prev,
                        relationships: prev.relationships.map((r) =>
                          r.id === rel.id ? { ...r, cardinality: val } : r
                        ),
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-bold text-xs bg-slate-50"
                  >
                    <option value="1:N">Uno a Muchos (1:N)</option>
                    <option value="1:1">Uno a Uno (1:1)</option>
                    <option value="N:M">Muchos a Muchos (N:M)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Acción ON DELETE:</label>
                  <select
                    value={rel.onDelete}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      updateSchema((prev) => ({
                        ...prev,
                        relationships: prev.relationships.map((r) =>
                          r.id === rel.id ? { ...r, onDelete: val } : r
                        ),
                      }));
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-bold text-xs bg-slate-50"
                  >
                    <option value="CASCADE">CASCADE (Eliminar en Cascada)</option>
                    <option value="SET NULL">SET NULL (Nulificar)</option>
                    <option value="RESTRICT">RESTRICT (Restringir)</option>
                    <option value="NO ACTION">NO ACTION</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Regla de Negocio / Comentario:</label>
                  <input
                    type="text"
                    value={rel.businessRule || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSchema((prev) => ({
                        ...prev,
                        relationships: prev.relationships.map((r) =>
                          r.id === rel.id ? { ...r, businessRule: val } : r
                        ),
                      }));
                    }}
                    placeholder="Ej. Un cliente puede tener N pedidos"
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] text-xs bg-slate-50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteRelationship(rel.id)}
                  className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl border-2 border-[#1E1210] text-xs"
                >
                  🗑️ Eliminar Relación
                </button>
              </div>
            );
          })()}

          {/* VISTA GENERAL CUANDO NO HAY NADA SELECCIONADO */}
          {!selectedTableId && !selectedRelationshipId && (
            <div className="flex flex-col gap-3 text-xs text-slate-600">
              <p className="m-0 leading-relaxed">
                Selecciona una tabla o haz clic en una línea de relación para ver y editar sus atributos.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-black text-slate-800 block mb-1">💡 Consejos Rápidos:</span>
                <ul className="list-disc pl-4 space-y-1 text-[0.72rem]">
                  <li>Arrastra desde los círculos de la derecha para <strong>conectar tablas</strong>.</li>
                  <li>Mueve las tablas libremente en el canvas.</li>
                  <li>Guarda en formato <code>.cyc</code> para continuar tu diseño cuando quieras.</li>
                </ul>
              </div>
            </div>
          )}
        </aside>
      )}
      </div>

      {/* =======================================================
          MODALES: EDITAR TABLA, SQL DDL, JSON Y PLANTILLAS
          ======================================================= */}

      {/* MODAL 1: EDITOR DE TABLA Y COLUMNAS */}
      {activeModal === 'table' && editingTable && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-2xl w-full shadow-[8px_8px_0px_#1E1210] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4">
              <h3 className="m-0 text-base font-black text-[#1E1210] flex items-center gap-2">
                <span>✏️</span> Editar Tabla: <code>{editingTable.name}</code>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre de la Tabla:</label>
                  <input
                    type="text"
                    value={editingTable.name}
                    onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border-2 border-[#1E1210] font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Comentario / Propósito:</label>
                  <input
                    type="text"
                    value={editingTable.comment || ''}
                    onChange={(e) => setEditingTable({ ...editingTable, comment: e.target.value })}
                    placeholder="Descripción del propósito de la entidad"
                    className="w-full px-3 py-2 rounded-xl border-2 border-[#1E1210] text-xs"
                  />
                </div>
              </div>

              {/* LISTA DE COLUMNAS */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 m-0">
                    Definición de Columnas ({editingTable.columns.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const count = editingTable.columns.length + 1;
                      setEditingTable({
                        ...editingTable,
                        columns: [
                          ...editingTable.columns,
                          {
                            id: `col-${Date.now()}`,
                            name: `campo_${count}`,
                            type: 'VARCHAR(100)',
                            notNull: false,
                          },
                        ],
                      });
                    }}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg border border-[#1E1210]"
                  >
                    ➕ Añadir Columna
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {editingTable.columns.map((col, idx) => (
                    <div
                      key={col.id}
                      className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center gap-2 flex-wrap"
                    >
                      <span className="text-[0.65rem] font-mono font-bold text-slate-400 w-4">
                        {idx + 1}.
                      </span>

                      {/* Nombre */}
                      <input
                        type="text"
                        value={col.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingTable({
                            ...editingTable,
                            columns: editingTable.columns.map((c) =>
                              c.id === col.id ? { ...c, name: val } : c
                            ),
                          });
                        }}
                        className="flex-1 min-w-[120px] px-2 py-1 rounded-lg border border-slate-300 font-mono text-xs font-bold"
                        placeholder="nombre_columna"
                      />

                      {/* Tipo */}
                      <select
                        value={col.type}
                        onChange={(e) => {
                          const val = e.target.value as DataType;
                          setEditingTable({
                            ...editingTable,
                            columns: editingTable.columns.map((c) =>
                              c.id === col.id ? { ...c, type: val } : c
                            ),
                          });
                        }}
                        className="px-2 py-1 rounded-lg border border-slate-300 font-mono text-xs font-bold text-emerald-700 bg-white"
                      >
                        <option value="INT">INT</option>
                        <option value="BIGINT">BIGINT</option>
                        <option value="SERIAL">SERIAL (PK)</option>
                        <option value="BIGSERIAL">BIGSERIAL (PK)</option>
                        <option value="VARCHAR(50)">VARCHAR(50)</option>
                        <option value="VARCHAR(100)">VARCHAR(100)</option>
                        <option value="VARCHAR(255)">VARCHAR(255)</option>
                        <option value="TEXT">TEXT</option>
                        <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                        <option value="DECIMAL(12,2)">DECIMAL(12,2)</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                        <option value="DATE">DATE</option>
                        <option value="TIMESTAMP">TIMESTAMP</option>
                        <option value="UUID">UUID</option>
                        <option value="JSONB">JSONB</option>
                      </select>

                      {/* Flags PK, NN, UQ */}
                      <label className="flex items-center gap-1 text-[0.7rem] font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!col.pk}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setEditingTable({
                              ...editingTable,
                              columns: editingTable.columns.map((c) =>
                                c.id === col.id ? { ...c, pk: val, notNull: val ? true : c.notNull } : c
                              ),
                            });
                          }}
                          className="w-3.5 h-3.5 accent-amber-500"
                        />
                        <span>PK</span>
                      </label>

                      <label className="flex items-center gap-1 text-[0.7rem] font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!col.notNull}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setEditingTable({
                              ...editingTable,
                              columns: editingTable.columns.map((c) =>
                                c.id === col.id ? { ...c, notNull: val } : c
                              ),
                            });
                          }}
                          className="w-3.5 h-3.5 accent-red-600"
                        />
                        <span>NOT NULL</span>
                      </label>

                      <label className="flex items-center gap-1 text-[0.7rem] font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!col.unique}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setEditingTable({
                              ...editingTable,
                              columns: editingTable.columns.map((c) =>
                                c.id === col.id ? { ...c, unique: val } : c
                              ),
                            });
                          }}
                          className="w-3.5 h-3.5 accent-purple-600"
                        />
                        <span>UNIQUE</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          if (editingTable.columns.length <= 1) {
                            alert('La tabla debe tener al menos una columna.');
                            return;
                          }
                          setEditingTable({
                            ...editingTable,
                            columns: editingTable.columns.filter((c) => c.id !== col.id),
                          });
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded bg-red-100 hover:bg-red-200 text-red-600 text-xs cursor-pointer ml-auto"
                        title="Eliminar Columna"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-3 mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveEditedTable}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GENERADOR SQL DDL */}
      {activeModal === 'sql' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f172a] text-slate-100 border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-3xl w-full shadow-[8px_8px_0px_#1E1210] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h3 className="m-0 text-base font-black text-white">
                  Script SQL DDL Autogenerado
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sqlDialect}
                  onChange={(e) => setSqlDialect(e.target.value as any)}
                  className="px-3 py-1 bg-slate-800 text-white border border-slate-600 rounded-lg text-xs font-mono font-bold"
                >
                  <option value="postgresql">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="sqlite">SQLite</option>
                  <option value="oracle">Oracle SQL</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedSql);
                    alert('¡Script SQL copiado al portapapeles!');
                  }}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                >
                  📋 Copiar SQL
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre">
              {generatedSql}
            </div>

            <div className="border-t border-slate-800 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Válido para ejecutar directamente en DBeaver, pgAdmin, MySQL Workbench o DataGrip.</span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: VER / PEGAR JSON Y .CYC */}
      {activeModal === 'json' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-3xl w-full shadow-[8px_8px_0px_#1E1210] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4">
              <h3 className="m-0 text-base font-black text-[#1E1210] flex items-center gap-2">
                <span>📋</span> Esquema en Formato JSON / .CYC
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-2">
              Puedes copiar este JSON para compartirlo, o pegar un JSON / contenido .cyc para cargar tu modelo:
            </p>

            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="flex-1 min-h-[350px] p-3 font-mono text-xs bg-slate-900 text-emerald-300 rounded-xl border-2 border-[#1E1210] resize-none"
            />

            <div className="border-t-2 border-slate-200 pt-3 mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  alert('¡JSON copiado!');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
              >
                📋 Copiar al Portapapeles
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApplyJson}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs"
                >
                  Aplicar y Cargar JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PLANTILLAS PREDEFINIDAS */}
      {activeModal === 'templates' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-xl w-full shadow-[8px_8px_0px_#1E1210]">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4">
              <h3 className="m-0 text-base font-black text-[#1E1210] flex items-center gap-2">
                <span>📦</span> Cargar Plantilla de Base de Datos
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {Object.entries(TEMPLATES).map(([key, tpl]) => (
                <div
                  key={key}
                  className="p-3.5 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3"
                  onClick={() => {
                    if (confirm(`¿Cargar la plantilla "${tpl.name}"? Se reemplazará el lienzo actual.`)) {
                      setSchema(tpl.data);
                      saveToLocalStorage(tpl.data);
                      setActiveModal(null);
                    }
                  }}
                >
                  <div>
                    <h4 className="font-bold text-xs text-[#1E1210] m-0">{tpl.name}</h4>
                    <p className="text-[0.72rem] text-slate-600 m-0 mt-0.5">{tpl.desc}</p>
                  </div>
                  <span className="text-xs font-black text-blue-600 shrink-0">Cargar →</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-slate-200 pt-3 mt-4 text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: GUÍA DE USO Y ESPECIFICACIÓN .CYC */}
      {activeModal === 'guide' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-3xl w-full shadow-[8px_8px_0px_#1E1210] max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4 shrink-0">
              <h3 className="m-0 text-base font-black text-[#1E1210] flex items-center gap-2">
                <span>📖</span> Guía de Uso y Especificación del Formato <code>.cyc</code>
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 text-xs font-nunito text-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 flex flex-col gap-1.5">
                  <h4 className="font-black text-blue-950 text-xs uppercase tracking-wider m-0 flex items-center gap-1">
                    <span>💾</span> Formato <code>.cyc</code>
                  </h4>
                  <p className="m-0 leading-relaxed font-medium">
                    Los archivos <code>.cyc</code> son esquemas JSON estructurados que guardan metadatos, tablas, columnas, claves primarias (PK), claves foráneas (FK), reglas de negocio y coordenadas <code>(x, y)</code> en el lienzo.
                  </p>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 flex flex-col gap-1.5">
                  <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider m-0 flex items-center gap-1">
                    <span>🔀</span> Relaciones y Reglas
                  </h4>
                  <p className="m-0 leading-relaxed font-medium">
                    Conecta tablas arrastrando desde el puerto circular derecho de una columna origen hacia el puerto izquierdo de la columna destino. Configura cardinalidad <code>1:1</code>, <code>1:N</code>, <code>N:M</code> y cláusulas <code>ON DELETE CASCADE / SET NULL / RESTRICT</code>.
                  </p>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 flex flex-col gap-1.5">
                  <h4 className="font-black text-amber-950 text-xs uppercase tracking-wider m-0 flex items-center gap-1">
                    <span>⚡</span> SQL DDL e Imágenes
                  </h4>
                  <p className="m-0 leading-relaxed font-medium">
                    Genera el código SQL DDL correspondiente en tiempo real con sintaxis compatible con <strong>PostgreSQL, MySQL, SQLite y Oracle SQL Developer</strong>, o exporta como imagen PNG de alta resolución.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider m-0">
                  ⌨️ Atajos y Controles de Interacción
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.75rem]">
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">Arrastrar lienzo</kbd>
                    <span>Haz clic y arrastra sobre el fondo del lienzo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">Zoom</kbd>
                    <span>Botones <code>+</code> y <code>−</code> en la barra de lienzo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">Personalizar Color</kbd>
                    <span>Selecciona una tabla y elige entre 8 temas visuales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">Maximizar Pantalla</kbd>
                    <span>Oculta el inspector o activa el botón de pantalla completa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-3 mt-4 text-right shrink-0">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
