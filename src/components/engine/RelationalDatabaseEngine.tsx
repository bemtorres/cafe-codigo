import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  EdgeLabelRenderer,
  getBezierPath,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  useViewport,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
  type IsValidConnection,
  type CoordinateExtent,
} from '@xyflow/react';

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
    headerText: '#ecfef5',
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

// ==========================================
// NOTAS Y ANOTACIONES DE TEXTO EN EL LIENZO
// ==========================================

export type NoteFontFamily = 'sans' | 'mono' | 'serif' | 'handwriting';
export type NoteFontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

export interface NoteTheme {
  id: string;
  name: string;
  bg: string;
  border: string;
  textColor: string;
  accent: string;
}

export const NOTE_THEMES: Record<string, NoteTheme> = {
  yellow: {
    id: 'yellow',
    name: 'Post-it Amarillo',
    bg: '#fef9c3',
    border: '#ca8a04',
    textColor: '#713f12',
    accent: '#eab308',
  },
  blue: {
    id: 'blue',
    name: 'Cielo Pastel',
    bg: '#e0f2fe',
    border: '#0284c7',
    textColor: '#0c4a6e',
    accent: '#38bdf8',
  },
  green: {
    id: 'green',
    name: 'Menta Fresca',
    bg: '#dcfce7',
    border: '#16a34a',
    textColor: '#14532d',
    accent: '#4ade80',
  },
  pink: {
    id: 'pink',
    name: 'Rosa Coral',
    bg: '#ffe4e6',
    border: '#e11d48',
    textColor: '#881337',
    accent: '#fb7185',
  },
  purple: {
    id: 'purple',
    name: 'Lavanda',
    bg: '#f3e8ff',
    border: '#9333ea',
    textColor: '#581c87',
    accent: '#c084fc',
  },
  amber: {
    id: 'amber',
    name: 'Ámbar Cálido',
    bg: '#fef3c7',
    border: '#d97706',
    textColor: '#78350f',
    accent: '#f59e0b',
  },
  dark: {
    id: 'dark',
    name: 'Pizarra Oscura',
    bg: '#1e293b',
    border: '#475569',
    textColor: '#f8fafc',
    accent: '#38bdf8',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimalista Blanco',
    bg: '#ffffff',
    border: '#94a3b8',
    textColor: '#1e293b',
    accent: '#64748b',
  },
};

export interface NoteNode {
  id: string;
  title?: string;
  text: string;
  theme: string;
  fontFamily?: NoteFontFamily;
  fontSize?: NoteFontSize;
  width?: number;
  x: number;
  y: number;
  locked?: boolean;
}

export interface TableNode {
  id: string;
  name: string;
  comment?: string;
  theme: string;
  x: number;
  y: number;
  locked?: boolean;
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
    panX?: number;
    panY?: number;
  };
  tables: TableNode[];
  relationships: RelationshipEdge[];
  notes?: NoteNode[];
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
      notes: [
        {
          id: 'note-eco-1',
          title: '📌 Arquitectura E-Commerce',
          text: '• La tabla detalle_pedidos resuelve la relación N:M entre Pedidos y Productos.\n• id_usuario en pedidos mantiene integridad referencial (ON DELETE CASCADE).\n• Las notas de texto no interfieren con las tablas ni el SQL generado.',
          theme: 'yellow',
          fontFamily: 'sans',
          fontSize: 'sm',
          width: 320,
          x: 40,
          y: 560,
          locked: false,
        },
      ],
    },
  },
  rbac: {
    name: '🔐 Seguridad RBAC (Usuarios, Perfil 1:1, Roles y Permisos)',
    desc: 'Modelo de autenticación con perfil extendido 1:1, roles y permisos granulares N:M.',
    data: {
      version: '1.0',
      generator: 'CafeYCodigo Relational DB Engine',
      metadata: {
        name: 'Modelo de Autorización RBAC',
        description: 'Control de acceso basado en roles con relación 1:1 de perfiles.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: 'Cafe & Codigo',
      },
      canvas: { bgPattern: 'blueprint', zoom: 0.95 },
      tables: [
        {
          id: 'tbl-usuarios',
          name: 'usuarios',
          comment: 'Credenciales de acceso',
          theme: 'indigo',
          x: 40,
          y: 40,
          columns: [
            { id: 'u-1', name: 'id_usuario', type: 'SERIAL', pk: true, notNull: true },
            { id: 'u-2', name: 'username', type: 'VARCHAR(50)', unique: true, notNull: true },
            { id: 'u-3', name: 'password_hash', type: 'VARCHAR(255)', notNull: true },
            { id: 'u-4', name: 'activo', type: 'BOOLEAN', defaultValue: 'TRUE' },
            { id: 'u-5', name: 'id_rol', type: 'INT', fk: true, notNull: true },
          ],
        },
        {
          id: 'tbl-perfiles',
          name: 'perfiles_usuario',
          comment: 'Información adicional 1:1',
          theme: 'rose',
          x: 40,
          y: 280,
          columns: [
            { id: 'pf-1', name: 'id_perfil', type: 'SERIAL', pk: true, notNull: true },
            { id: 'pf-2', name: 'id_usuario', type: 'INT', unique: true, fk: true, notNull: true },
            { id: 'pf-3', name: 'bio', type: 'TEXT' },
            { id: 'pf-4', name: 'avatar_url', type: 'VARCHAR(255)' },
          ],
        },
        {
          id: 'tbl-roles',
          name: 'roles',
          comment: 'Roles del sistema (ADMIN, EDITOR, ETC)',
          theme: 'amber',
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
      notes: [
        {
          id: 'note-rbac-1',
          title: '🔐 Regla de Seguridad 1:1',
          text: 'La clave id_usuario en perfiles_usuario posee constraint UNIQUE para forzar relación 1:1 exacta.',
          theme: 'blue',
          fontFamily: 'handwriting',
          fontSize: 'sm',
          width: 260,
          x: 40,
          y: 460,
          locked: false,
        },
      ],
    },
  },
};

const STORAGE_KEY_V1 = 'aprende_db_engine_draft_v1';
const STORAGE_KEY_V2 = 'aprende_db_engine_draft_v2';

function loadDraft(): CycSchemaFile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_V2) ?? localStorage.getItem(STORAGE_KEY_V1);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.tables)) return parsed as CycSchemaFile;
  } catch {
    // Ignorar errores de parseo
  }
  return null;
}

function persistDraft(data: CycSchemaFile) {
  try {
    const raw = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY_V2, raw);
    localStorage.setItem(STORAGE_KEY_V1, raw);
  } catch (err) {
    console.error(err);
  }
}

// ==========================================
// TIPOS DE NODOS / ARISTAS REACT FLOW
// ==========================================

type TableFlowData = {
  tbl: TableNode;
  theme: TableTheme;
  locked: boolean;
  onEdit: (tbl: TableNode) => void;
  onDelete: (id: string) => void;
  onToggleLock: (id: string) => void;
  onOpenMenu: (id: string, x: number, y: number) => void;
};

type TableFlowNode = Node<TableFlowData, 'table'>;

type NoteFlowData = {
  note: NoteNode;
  theme: NoteTheme;
  locked: boolean;
  onEdit: (note: NoteNode) => void;
  onDelete: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDuplicate: (id: string) => void;
  onOpenMenu: (id: string, x: number, y: number) => void;
};

type NoteFlowNode = Node<NoteFlowData, 'note'>;

type CardinalityFlowData = { rel: RelationshipEdge };
type CardinalityFlowEdge = Edge<CardinalityFlowData, 'cardinality'>;

// ==========================================
// NODO DE TABLA (custom node)
// ==========================================

const TableNodeCard = React.memo(function TableNodeCard({
  data,
  selected,
}: NodeProps<TableFlowNode>) {
  const { tbl, theme, locked, onEdit, onDelete, onToggleLock, onOpenMenu } = data;
  const pkCols = tbl.columns.filter((c) => c.pk);

  return (
    <div
      className={`table-schema-node w-[270px] rounded-xl border-2 transition-shadow overflow-hidden ${
        selected
          ? 'ring-4 ring-blue-500 ring-offset-2 shadow-[6px_6px_0px_#1E1210]'
          : 'shadow-[4px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.35)]'
      } ${locked ? 'opacity-95' : ''}`}
      style={{
        backgroundColor: theme.bodyBg,
        borderColor: theme.border,
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onEdit(tbl);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpenMenu(tbl.id, e.clientX, e.clientY);
      }}
    >
      {/* CABECERA DE TABLA */}
      <div
        className="table-node-header px-3 py-2 flex items-center justify-between cursor-move border-b-2 touch-none select-none"
        style={{
          backgroundColor: theme.headerBg,
          color: theme.headerText,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs">🗄️</span>
          <span className="font-mono font-bold text-xs truncate" title={tbl.name}>
            {tbl.name}
          </span>
          {locked && (
            <span className="text-[0.7rem]" title="Tabla bloqueada (no se puede editar ni borrar)">
              🔒
            </span>
          )}
        </div>

        {!locked && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(tbl);
              }}
              className="w-5 h-5 flex items-center justify-center rounded bg-white/20 hover:bg-white/40 text-white text-[0.65rem] cursor-pointer"
              title="Editar Tabla y Columnas (o doble click)"
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(tbl.id);
              }}
              className="w-5 h-5 flex items-center justify-center rounded bg-red-500/80 hover:bg-red-600 text-white text-[0.65rem] cursor-pointer"
              title="Eliminar Tabla"
            >
              ✕
            </button>
          </div>
        )}
        {locked && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(tbl.id);
            }}
            className="w-5 h-5 flex items-center justify-center rounded bg-white/20 hover:bg-white/40 text-white text-[0.65rem] cursor-pointer shrink-0"
            title="Desbloquear Tabla"
          >
            🔓
          </button>
        )}
      </div>

      {/* LISTADO DE COLUMNAS CON HANDLES */}
      <div className="table-node-body py-1 flex flex-col font-mono text-xs">
        {tbl.columns.map((col) => {
          const isPk = col.pk;
          const isFk = col.fk;
          const isNotNull = col.notNull || isPk;
          const prefix = isPk && isFk ? 'PF' : isPk ? 'PK' : isFk ? 'FK' : '';

          return (
            <div
              key={col.id}
              className={`column-row relative flex items-center justify-between px-3 py-1.5 text-[0.72rem] leading-tight border-b border-black/5 hover:bg-black/5 transition-colors ${
                isPk ? 'bg-amber-100/50 font-bold' : isFk ? 'bg-blue-100/40 font-semibold' : ''
              }`}
            >
              <Handle
                type="target"
                position={Position.Left}
                id={col.id}
                isConnectable={!locked}
                className={`!w-3.5 !h-3.5 !border-2 !border-white !shadow-sm ${
                  isFk ? '!bg-blue-600' : isPk ? '!bg-amber-500' : '!bg-slate-400'
                } hover:!scale-125 transition-transform`}
                title="Soltar conexión aquí"
              />

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
                  className={`text-[0.65rem] font-black ${isNotNull ? 'text-red-600' : 'text-slate-400'}`}
                >
                  {isNotNull ? '*' : 'o'}
                </span>
                <span className="truncate text-slate-900" title={col.name}>
                  {col.name}
                </span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[0.68rem] font-bold" style={{ color: theme.typeColor }}>
                  {col.type}
                </span>
              </div>

              <Handle
                type="source"
                position={Position.Right}
                id={col.id}
                isConnectable={!locked}
                className={`!w-3.5 !h-3.5 !border-2 !border-white !shadow-sm cursor-crosshair ${
                  isPk ? '!bg-amber-500' : isFk ? '!bg-blue-600' : '!bg-slate-400'
                } hover:!scale-125 transition-transform`}
                title="Arrastrar para conectar con otra tabla"
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
            <span>
              {tbl.name}_PK ({pkCols.map((c) => c.name).join(', ')})
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

// ==========================================
// NODO DE NOTA / ANOTACIÓN DE TEXTO
// ==========================================

const NoteNodeCard = React.memo(function NoteNodeCard({
  data,
  selected,
}: NodeProps<NoteFlowNode>) {
  const { note, theme, locked, onEdit, onDelete, onToggleLock, onOpenMenu } = data;

  const fontClass = useMemo(() => {
    switch (note.fontFamily) {
      case 'handwriting':
        return 'font-["Caveat",_cursive]';
      case 'mono':
        return 'font-mono';
      case 'serif':
        return 'font-serif';
      case 'sans':
      default:
        return 'font-sans';
    }
  }, [note.fontFamily]);

  const sizeClass = useMemo(() => {
    switch (note.fontSize) {
      case 'xs':
        return 'text-[0.7rem] leading-snug';
      case 'base':
        return note.fontFamily === 'handwriting' ? 'text-lg leading-snug' : 'text-[0.88rem] leading-relaxed';
      case 'lg':
        return note.fontFamily === 'handwriting' ? 'text-xl leading-snug' : 'text-base leading-snug';
      case 'xl':
        return note.fontFamily === 'handwriting' ? 'text-2xl leading-snug' : 'text-lg leading-snug';
      case 'sm':
      default:
        return note.fontFamily === 'handwriting' ? 'text-base leading-snug' : 'text-xs leading-relaxed';
    }
  }, [note.fontSize, note.fontFamily]);

  const widthStyle = note.width ? `${note.width}px` : '260px';

  return (
    <div
      className={`note-schema-node rounded-xl border-2 transition-shadow overflow-hidden group ${
        selected
          ? 'ring-4 ring-amber-500 ring-offset-2 shadow-[6px_6px_0px_#1E1210]'
          : 'shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)]'
      } ${locked ? 'opacity-95' : ''}`}
      style={{
        backgroundColor: theme.bg,
        borderColor: theme.border,
        color: theme.textColor,
        width: widthStyle,
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onEdit(note);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpenMenu(note.id, e.clientX, e.clientY);
      }}
    >
      {/* HEADER DE NOTA */}
      <div
        className="px-2.5 py-1.5 flex items-center justify-between border-b border-black/10 cursor-move touch-none select-none"
        style={{
          backgroundColor: theme.accent + '25',
        }}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-1">
          <span className="text-xs shrink-0">📝</span>
          {note.title ? (
            <span className="font-bold text-xs truncate" title={note.title}>
              {note.title}
            </span>
          ) : (
            <span className="text-[0.68rem] opacity-70 font-semibold italic truncate">
              Nota / Detalle
            </span>
          )}
          {locked && (
            <span className="text-[0.68rem]" title="Nota bloqueada">
              🔒
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          {!locked && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note);
                }}
                className="w-5 h-5 flex items-center justify-center rounded bg-black/10 hover:bg-black/20 text-current text-[0.65rem] cursor-pointer"
                title="Editar Nota"
              >
                ✏️
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                className="w-5 h-5 flex items-center justify-center rounded bg-red-500/80 hover:bg-red-600 text-white text-[0.65rem] cursor-pointer"
                title="Eliminar Nota"
              >
                ✕
              </button>
            </>
          )}
          {locked && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLock(note.id);
              }}
              className="w-5 h-5 flex items-center justify-center rounded bg-black/10 hover:bg-black/20 text-current text-[0.65rem] cursor-pointer"
              title="Desbloquear Nota"
            >
              🔓
            </button>
          )}
        </div>
      </div>

      {/* CUERPO DEL TEXTO */}
      <div className={`p-3 whitespace-pre-wrap break-words ${fontClass} ${sizeClass}`}>
        {note.text || (
          <span className="opacity-50 italic">
            Haz doble clic para escribir una nota o descripción...
          </span>
        )}
      </div>
    </div>
  );
});

// ==========================================
// ARISTA CON BADGE DE CARDINALIDAD
// ==========================================

const CardinalityEdge = React.memo(function CardinalityEdge({
  id,
  data,
  selected,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps<CardinalityFlowEdge>) {
  if (!data) return null;
  const rel = data.rel;
  const emphasized = !!selected;

  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature: 0.55,
  });

  return (
    <>
      <path
        id={id}
        d={path}
        fill="none"
        stroke={emphasized ? '#10b981' : '#2563eb'}
        strokeWidth={emphasized ? 3.5 : 2.5}
        strokeDasharray={rel.cardinality === '1:1' ? '6 4' : undefined}
        markerEnd={markerEnd || `url(#${emphasized ? 'engine-arrow-head-hover' : 'engine-arrow-head'})`}
        className="transition-all duration-150"
      />
      <path d={path} fill="none" stroke="transparent" strokeWidth={20} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className={`text-[0.62rem] font-mono font-black px-1.5 py-0.5 rounded-md border text-center shadow-sm flex items-center justify-center cursor-pointer ${
            emphasized
              ? 'bg-emerald-500 text-white border-emerald-600 scale-110'
              : 'bg-white text-blue-900 border-blue-400'
          } transition-all duration-150`}
          title={rel.businessRule || 'Relación FK'}
        >
          {rel.cardinality}
        </div>
      </EdgeLabelRenderer>
    </>
  );
});

const nodeTypes = {
  table: TableNodeCard,
  note: NoteNodeCard,
};
const edgeTypes = { cardinality: CardinalityEdge };

// ==========================================
// MENÚS CONTEXTUALES FLOTANTES
// ==========================================

type TableCtxMenuState = { tableId: string; x: number; y: number } | null;
type NoteCtxMenuState = { noteId: string; x: number; y: number } | null;
type PaneCtxMenuState = { x: number; y: number; canvasX: number; canvasY: number } | null;

type DeleteTarget =
  | { type: 'table'; id: string; name: string; relCount: number }
  | { type: 'note'; id: string; title: string }
  | { type: 'relationship'; id: string; desc: string }
  | null;

function TableContextMenu({
  menu,
  locked,
  onEdit,
  onDuplicate,
  onToggleLock,
  onDelete,
  onClose,
}: {
  menu: NonNullable<TableCtxMenuState>;
  locked: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const left = Math.min(menu.x, window.innerWidth - 190);
  const top = Math.min(menu.y, window.innerHeight - 170);

  const itemCls =
    'w-full text-left px-3 py-2 text-xs font-bold flex items-center gap-2 hover:bg-slate-100 cursor-pointer rounded-md transition-colors';
  const disabledCls = 'opacity-40 cursor-not-allowed hover:bg-transparent';

  return (
    <div
      className="fixed z-[70] min-w-[170px] bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5"
      style={{ left, top }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        type="button"
        className={`${itemCls} ${locked ? disabledCls : ''}`}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onEdit();
          onClose();
        }}
      >
        ✏️ Editar Tabla
      </button>
      <button
        type="button"
        className={`${itemCls} ${locked ? disabledCls : ''}`}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onDuplicate();
          onClose();
        }}
      >
        📋 Duplicar
      </button>
      <button
        type="button"
        className={itemCls}
        onClick={() => {
          onToggleLock();
          onClose();
        }}
      >
        {locked ? '🔓 Desbloquear' : '🔒 Bloquear'}
      </button>
      <div className="h-px bg-slate-200 my-1" />
      <button
        type="button"
        className={`${itemCls} text-red-600 hover:bg-red-50 ${locked ? disabledCls : ''}`}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onDelete();
          onClose();
        }}
      >
        🗑️ Eliminar
      </button>
    </div>
  );
}

function NoteContextMenu({
  menu,
  locked,
  onEdit,
  onDuplicate,
  onToggleLock,
  onDelete,
  onClose,
}: {
  menu: NonNullable<NoteCtxMenuState>;
  locked: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const left = Math.min(menu.x, window.innerWidth - 180);
  const top = Math.min(menu.y, window.innerHeight - 170);

  const itemCls =
    'w-full text-left px-3 py-2 text-xs font-bold flex items-center gap-2 hover:bg-slate-100 cursor-pointer rounded-md transition-colors';
  const disabledCls = 'opacity-40 cursor-not-allowed hover:bg-transparent';

  return (
    <div
      className="fixed z-[70] min-w-[170px] bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5"
      style={{ left, top }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        type="button"
        className={`${itemCls} ${locked ? disabledCls : ''}`}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onEdit();
          onClose();
        }}
      >
        ✏️ Editar Nota
      </button>
      <button
        type="button"
        className={`${itemCls} ${locked ? disabledCls : ''}`}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onDuplicate();
          onClose();
        }}
      >
        📋 Duplicar
      </button>
      <button
        type="button"
        className={itemCls}
        onClick={() => {
          onToggleLock();
          onClose();
        }}
      >
        {locked ? '🔓 Desbloquear' : '🔒 Bloquear'}
      </button>
      <div className="h-px bg-slate-200 my-1" />
      <button
        type="button"
        className={`${itemCls} text-red-600 hover:bg-red-50 ${locked ? disabledCls : ''}`}
        disabled={locked}
        onClick={() => {
          if (locked) return;
          onDelete();
          onClose();
        }}
      >
        🗑️ Eliminar
      </button>
    </div>
  );
}

function PaneContextMenu({
  menu,
  onAddNote,
  onAddTable,
  onCenter,
  onClose,
}: {
  menu: NonNullable<PaneCtxMenuState>;
  onAddNote: (x: number, y: number) => void;
  onAddTable: (x: number, y: number) => void;
  onCenter: () => void;
  onClose: () => void;
}) {
  const left = Math.min(menu.x, window.innerWidth - 210);
  const top = Math.min(menu.y, window.innerHeight - 200);

  const itemCls =
    'w-full text-left px-3 py-2 text-xs font-bold flex items-center gap-2 hover:bg-slate-100 cursor-pointer rounded-md transition-colors text-slate-800';

  return (
    <div
      className="fixed z-[70] min-w-[190px] bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5"
      style={{ left, top }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-3 py-1 text-[0.65rem] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
        <span>Lienzo</span>
        <span className="font-mono text-[0.6rem] text-slate-400">
          ({menu.canvasX}, {menu.canvasY})
        </span>
      </div>
      <button
        type="button"
        className={`${itemCls} text-amber-900 hover:bg-amber-50`}
        onClick={() => {
          onAddNote(menu.canvasX, menu.canvasY);
          onClose();
        }}
      >
        <span>📝</span>
        <span>Nueva Nota / Texto</span>
      </button>
      <button
        type="button"
        className={`${itemCls} text-blue-900 hover:bg-blue-50`}
        onClick={() => {
          onAddTable(menu.canvasX, menu.canvasY);
          onClose();
        }}
      >
        <span>🗄️</span>
        <span>Nueva Tabla</span>
      </button>
      <div className="h-px bg-slate-200 my-1" />
      <button
        type="button"
        className={itemCls}
        onClick={() => {
          onCenter();
          onClose();
        }}
      >
        <span>⟲</span>
        <span>Centrar Lienzo</span>
      </button>
    </div>
  );
}

// ==========================================
// MOTOR PRINCIPAL (dentro del provider)
// ==========================================

function RelationalDatabaseEngineInner() {
  const initialDraft = useMemo(() => loadDraft(), []);
  const [schema, setSchema] = useState<CycSchemaFile>(() => initialDraft ?? TEMPLATES.ecommerce.data);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState<string | null>(null);

  const [activeModal, setActiveModal] = useState<
    'table' | 'relation' | 'json' | 'sql' | 'templates' | 'guide' | 'note' | null
  >(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [editingTable, setEditingTable] = useState<TableNode | null>(null);
  const [editingNote, setEditingNote] = useState<NoteNode | null>(null);
  const [jsonText, setJsonText] = useState<string>('');
  const [sqlDialect, setSqlDialect] = useState<'postgresql' | 'mysql' | 'sqlite' | 'oracle'>(
    'postgresql'
  );
  const [bgPattern, setBgPattern] = useState<'grid' | 'dots' | 'blueprint' | 'dark'>(
    initialDraft?.canvas?.bgPattern ?? TEMPLATES.ecommerce.data.canvas.bgPattern
  );

  // Estado para la barra de menú superior de la aplicación
  const [activeTopMenu, setActiveTopMenu] = useState<'archivo' | 'editar' | 'ver' | 'sql' | 'ayuda' | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const menuBarRef = useRef<HTMLDivElement>(null);

  const [tableCtxMenu, setTableCtxMenu] = useState<TableCtxMenuState>(null);
  const [noteCtxMenu, setNoteCtxMenu] = useState<NoteCtxMenuState>(null);
  const [paneCtxMenu, setPaneCtxMenu] = useState<PaneCtxMenuState>(null);

  const [toast, setToast] = useState<{ msg: string; kind: 'ok' | 'err' } | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const notify = useCallback((msg: string, kind: 'ok' | 'err' = 'ok') => {
    setToast({ msg, kind });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const schemaRef = useRef(schema);
  schemaRef.current = schema;

  const { zoomIn, zoomOut, setViewport, screenToFlowPosition, fitView } = useReactFlow();
  const { zoom } = useViewport();

  // Cerrar menús contextuales y menús de barra al hacer clic fuera o presionar Escape
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setActiveTopMenu(null);
      }
      setTableCtxMenu(null);
      setNoteCtxMenu(null);
      setPaneCtxMenu(null);
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTopMenu(null);
        setTableCtxMenu(null);
        setNoteCtxMenu(null);
        setPaneCtxMenu(null);
        setIsEditingTitle(false);
      }
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  // Persistencia: doble clave v2/v1
  const saveToLocalStorage = useCallback((updated: CycSchemaFile) => {
    persistDraft(updated);
  }, []);

  const updateSchema = useCallback((updater: (prev: CycSchemaFile) => CycSchemaFile) => {
    setSchema((prev) => updater(prev));
  }, []);

  // Autoguardado debounced
  useEffect(() => {
    const t = window.setTimeout(() => {
      const toSave: CycSchemaFile = {
        ...schema,
        metadata: { ...schema.metadata, updatedAt: new Date().toISOString() },
      };
      persistDraft(toSave);
    }, 400);
    return () => window.clearTimeout(t);
  }, [schema]);

  // ==========================================
  // MANEJADORES DE TABLAS Y SOLICITUD DE ELIMINACIÓN
  // ==========================================
  const handleOpenEditTable = useCallback(
    (tbl: TableNode) => {
      if (tbl.locked) {
        notify('La tabla está bloqueada. Desbloquéala para editar.', 'err');
        return;
      }
      setEditingTable(JSON.parse(JSON.stringify(tbl)));
      setActiveModal('table');
    },
    [notify]
  );

  const requestDeleteTable = useCallback(
    (tableId: string) => {
      const tbl = schemaRef.current.tables.find((t) => t.id === tableId);
      if (!tbl) return;
      if (tbl.locked) {
        notify('La tabla está bloqueada. Desbloquéala para eliminar.', 'err');
        return;
      }
      const relCount = schemaRef.current.relationships.filter(
        (r) => r.sourceTableId === tableId || r.targetTableId === tableId
      ).length;
      setDeleteTarget({
        type: 'table',
        id: tableId,
        name: tbl.name,
        relCount,
      });
      setTableCtxMenu(null);
    },
    [notify]
  );

  const handleToggleLock = useCallback(
    (tableId: string) => {
      updateSchema((prev) => ({
        ...prev,
        tables: prev.tables.map((t) =>
          t.id === tableId ? { ...t, locked: !t.locked } : t
        ),
      }));
      setTableCtxMenu(null);
    },
    [updateSchema]
  );

  const handleDuplicateTable = useCallback(
    (tableId: string) => {
      const src = schemaRef.current.tables.find((t) => t.id === tableId);
      if (!src || src.locked) return;
      const stamp = Date.now();
      const copy: TableNode = {
        ...JSON.parse(JSON.stringify(src)),
        id: `tbl-${stamp}`,
        name: `${src.name}_copy`,
        x: src.x + 40,
        y: src.y + 40,
        locked: false,
        columns: src.columns.map((c, i) => ({ ...c, id: `c-${stamp}-${i}` })),
      };
      updateSchema((prev) => ({ ...prev, tables: [...prev.tables, copy] }));
      setSelectedTableId(copy.id);
      setSelectedNoteId(null);
      setSelectedRelationshipId(null);
      notify('Tabla duplicada (sin relaciones).');
    },
    [notify, updateSchema]
  );

  const openTableMenu = useCallback((tableId: string, x: number, y: number) => {
    setSelectedTableId(tableId);
    setSelectedNoteId(null);
    setSelectedRelationshipId(null);
    setTableCtxMenu({ tableId, x, y });
    setNoteCtxMenu(null);
    setPaneCtxMenu(null);
  }, []);

  // ==========================================
  // MANEJADORES DE NOTAS Y SOLICITUD DE ELIMINACIÓN
  // ==========================================
  const handleAddNewNote = useCallback(
    (x?: number, y?: number) => {
      const stamp = Date.now();
      const notesCount = (schemaRef.current.notes || []).length + 1;
      const newNote: NoteNode = {
        id: `note-${stamp}`,
        title: `Nota ${notesCount}`,
        text: 'Escribe aquí anotaciones, reglas de negocio o comentarios de la arquitectura...',
        theme: 'yellow',
        fontFamily: 'sans',
        fontSize: 'sm',
        width: 260,
        x: x ?? (60 + (notesCount % 3) * 260),
        y: y ?? (120 + Math.floor(notesCount / 3) * 200),
        locked: false,
      };

      updateSchema((prev) => ({
        ...prev,
        notes: [...(prev.notes || []), newNote],
      }));
      setSelectedNoteId(newNote.id);
      setSelectedTableId(null);
      setSelectedRelationshipId(null);
      notify('Nota de texto añadida.');
    },
    [notify, updateSchema]
  );

  const handleOpenEditNote = useCallback(
    (note: NoteNode) => {
      if (note.locked) {
        notify('La nota está bloqueada. Desbloquéala para editar.', 'err');
        return;
      }
      setEditingNote(JSON.parse(JSON.stringify(note)));
      setActiveModal('note');
    },
    [notify]
  );

  const handleSaveEditedNote = useCallback(() => {
    if (!editingNote) return;
    updateSchema((prev) => ({
      ...prev,
      notes: (prev.notes || []).map((n) => (n.id === editingNote.id ? editingNote : n)),
    }));
    setActiveModal(null);
    setEditingNote(null);
    notify('Nota actualizada.');
  }, [editingNote, notify, updateSchema]);

  const requestDeleteNote = useCallback(
    (noteId: string) => {
      const note = (schemaRef.current.notes || []).find((n) => n.id === noteId);
      if (!note) return;
      if (note.locked) {
        notify('La nota está bloqueada. Desbloquéala para eliminar.', 'err');
        return;
      }
      setDeleteTarget({
        type: 'note',
        id: noteId,
        title: note.title || note.text.slice(0, 35) || 'Nota de texto',
      });
      setNoteCtxMenu(null);
    },
    [notify]
  );

  const handleToggleLockNote = useCallback(
    (noteId: string) => {
      updateSchema((prev) => ({
        ...prev,
        notes: (prev.notes || []).map((n) =>
          n.id === noteId ? { ...n, locked: !n.locked } : n
        ),
      }));
      setNoteCtxMenu(null);
    },
    [updateSchema]
  );

  const handleDuplicateNote = useCallback(
    (noteId: string) => {
      const src = (schemaRef.current.notes || []).find((n) => n.id === noteId);
      if (!src || src.locked) return;
      const stamp = Date.now();
      const copy: NoteNode = {
        ...JSON.parse(JSON.stringify(src)),
        id: `note-${stamp}`,
        title: src.title ? `${src.title} (Copia)` : 'Nota Copia',
        x: src.x + 30,
        y: src.y + 30,
        locked: false,
      };
      updateSchema((prev) => ({
        ...prev,
        notes: [...(prev.notes || []), copy],
      }));
      setSelectedNoteId(copy.id);
      setSelectedTableId(null);
      setSelectedRelationshipId(null);
      notify('Nota duplicada.');
    },
    [notify, updateSchema]
  );

  const openNoteMenu = useCallback((noteId: string, x: number, y: number) => {
    setSelectedNoteId(noteId);
    setSelectedTableId(null);
    setSelectedRelationshipId(null);
    setNoteCtxMenu({ noteId, x, y });
    setTableCtxMenu(null);
    setPaneCtxMenu(null);
  }, []);

  const requestDeleteRelationship = useCallback(
    (relId: string) => {
      const rel = schemaRef.current.relationships.find((r) => r.id === relId);
      if (!rel) return;
      const src = schemaRef.current.tables.find((t) => t.id === rel.sourceTableId);
      const tgt = schemaRef.current.tables.find((t) => t.id === rel.targetTableId);
      if (src?.locked || tgt?.locked) {
        notify('Una de las tablas involucradas está bloqueada.', 'err');
        return;
      }
      setDeleteTarget({
        type: 'relationship',
        id: relId,
        desc: `${src?.name || 'Tabla Origen'} → ${tgt?.name || 'Tabla Destino'}`,
      });
    },
    [notify]
  );

  // Ejecución definitiva de eliminación al confirmar en el modal
  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'table') {
      const tableId = deleteTarget.id;
      updateSchema((prev) => ({
        ...prev,
        tables: prev.tables.filter((t) => t.id !== tableId),
        relationships: prev.relationships.filter(
          (r) => r.sourceTableId !== tableId && r.targetTableId !== tableId
        ),
      }));
      setSelectedTableId((cur) => (cur === tableId ? null : cur));
      notify(`Tabla "${deleteTarget.name}" eliminada.`);
    } else if (deleteTarget.type === 'note') {
      const noteId = deleteTarget.id;
      updateSchema((prev) => ({
        ...prev,
        notes: (prev.notes || []).filter((n) => n.id !== noteId),
      }));
      setSelectedNoteId((cur) => (cur === noteId ? null : cur));
      notify('Nota eliminada.');
    } else if (deleteTarget.type === 'relationship') {
      const relId = deleteTarget.id;
      updateSchema((prev) => ({
        ...prev,
        relationships: prev.relationships.filter((r) => r.id !== relId),
      }));
      setSelectedRelationshipId(null);
      notify('Relación eliminada.');
    }

    setDeleteTarget(null);
  }, [deleteTarget, notify, updateSchema]);

  // Manejo de clic derecho en el lienzo (Pane)
  const handlePaneContextMenu = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      event.preventDefault();
      let canvasX = 80;
      let canvasY = 80;
      try {
        if (screenToFlowPosition) {
          const pos = screenToFlowPosition({ x: event.clientX, y: event.clientY });
          canvasX = Math.round(pos.x);
          canvasY = Math.round(pos.y);
        }
      } catch {
        // Fallback
      }
      setPaneCtxMenu({
        x: event.clientX,
        y: event.clientY,
        canvasX: Math.max(10, canvasX),
        canvasY: Math.max(10, canvasY),
      });
      setTableCtxMenu(null);
      setNoteCtxMenu(null);
    },
    [screenToFlowPosition]
  );

  // ==========================================
  // CONSTRUCCIÓN DE NODOS Y ARISTAS REACT FLOW
  // ==========================================
  const buildNodes = useCallback((): Node[] => {
    const tableNodes: Node[] = schema.tables.map((tbl) => {
      const locked = !!tbl.locked;
      return {
        id: tbl.id,
        type: 'table',
        position: { x: tbl.x, y: tbl.y },
        selected: selectedTableId === tbl.id,
        draggable: !locked,
        connectable: !locked,
        deletable: false,
        extent: [
          [10, 10],
          [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        ] satisfies CoordinateExtent,
        data: {
          tbl,
          theme: TABLE_THEMES[tbl.theme] || TABLE_THEMES.datamodeler,
          locked,
          onEdit: handleOpenEditTable,
          onDelete: requestDeleteTable,
          onToggleLock: handleToggleLock,
          onOpenMenu: openTableMenu,
        },
      };
    });

    const noteNodes: Node[] = (schema.notes || []).map((note) => {
      const locked = !!note.locked;
      return {
        id: note.id,
        type: 'note',
        position: { x: note.x, y: note.y },
        selected: selectedNoteId === note.id,
        draggable: !locked,
        connectable: false,
        deletable: false,
        extent: [
          [10, 10],
          [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
        ] satisfies CoordinateExtent,
        data: {
          note,
          theme: NOTE_THEMES[note.theme] || NOTE_THEMES.yellow,
          locked,
          onEdit: handleOpenEditNote,
          onDelete: requestDeleteNote,
          onToggleLock: handleToggleLockNote,
          onDuplicate: handleDuplicateNote,
          onOpenMenu: openNoteMenu,
        },
      };
    });

    return [...tableNodes, ...noteNodes];
  }, [
    schema.tables,
    schema.notes,
    selectedTableId,
    selectedNoteId,
    handleOpenEditTable,
    requestDeleteTable,
    handleToggleLock,
    openTableMenu,
    handleOpenEditNote,
    requestDeleteNote,
    handleToggleLockNote,
    handleDuplicateNote,
    openNoteMenu,
  ]);

  const buildEdges = useCallback((): CardinalityFlowEdge[] => {
    return schema.relationships.map((rel) => ({
      id: rel.id,
      source: rel.sourceTableId,
      target: rel.targetTableId,
      sourceHandle: rel.sourceColumnId,
      targetHandle: rel.targetColumnId,
      type: 'cardinality' as const,
      selected: selectedRelationshipId === rel.id,
      data: { rel },
    }));
  }, [schema.relationships, selectedRelationshipId]);

  const [rfNodes, setRfNodes] = useNodesState<Node>(buildNodes());
  const [rfEdges, setRfEdges] = useEdgesState<CardinalityFlowEdge>(buildEdges());

  // Re-sincronizar solo cuando cambia el modelo (no durante el drag)
  useEffect(() => {
    setRfNodes(buildNodes());
  }, [buildNodes, setRfNodes]);

  useEffect(() => {
    setRfEdges(buildEdges());
  }, [buildEdges, setRfEdges]);

  const handleNodesChangeStable: OnNodesChange<Node> = useCallback(
    (changes) => {
      setRfNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setRfNodes]
  );

  const handleEdgesChangeStable: OnEdgesChange<CardinalityFlowEdge> = useCallback(
    (changes) => {
      setRfEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setRfEdges]
  );

  // Posición definitiva → schema (una sola escritura al soltar)
  const handleNodeDragStop = useCallback(
    (_event: unknown, node: Node) => {
      const x = Math.max(10, Math.round(node.position.x));
      const y = Math.max(10, Math.round(node.position.y));

      if (node.type === 'table') {
        setSchema((prev) => {
          const current = prev.tables.find((t) => t.id === node.id);
          if (!current || (current.x === x && current.y === y)) return prev;
          return {
            ...prev,
            tables: prev.tables.map((t) => (t.id === node.id ? { ...t, x, y } : t)),
          };
        });
      } else if (node.type === 'note') {
        setSchema((prev) => {
          const notes = prev.notes || [];
          const current = notes.find((n) => n.id === node.id);
          if (!current || (current.x === x && current.y === y)) return prev;
          return {
            ...prev,
            notes: notes.map((n) => (n.id === node.id ? { ...n, x, y } : n)),
          };
        });
      }
    },
    []
  );

  const isValidConnection = useCallback<IsValidConnection>(
    (connection) => {
      const c = connection as Connection;
      if (!c.source || !c.target || !c.sourceHandle || !c.targetHandle) return false;
      if (c.source === c.target) return false;
      const src = schema.tables.find((t) => t.id === c.source);
      const tgt = schema.tables.find((t) => t.id === c.target);
      if (!src || !tgt || src.locked || tgt.locked) return false;
      const exists = schema.relationships.some(
        (r) =>
          r.sourceTableId === c.source &&
          r.sourceColumnId === c.sourceHandle &&
          r.targetTableId === c.target &&
          r.targetColumnId === c.targetHandle
      );
      return !exists;
    },
    [schema.tables, schema.relationships]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      const { source, sourceHandle, target, targetHandle } = connection;
      if (!source || !sourceHandle || !target || !targetHandle) return;
      if (source === target) {
        notify('Una clave foránea normalmente apunta a otra tabla.', 'err');
        return;
      }

      const newRel: RelationshipEdge = {
        id: `rel-${Date.now()}`,
        sourceTableId: source,
        sourceColumnId: sourceHandle,
        targetTableId: target,
        targetColumnId: targetHandle,
        cardinality: '1:N',
        onDelete: 'CASCADE',
        businessRule: 'Relación de Integridad Referencial FK',
      };

      updateSchema((prev) => ({
        ...prev,
        tables: prev.tables.map((t) => {
          if (t.id === source) {
            return {
              ...t,
              columns: t.columns.map((c) => (c.id === sourceHandle ? { ...c, fk: true } : c)),
            };
          }
          return t;
        }),
        relationships: [...prev.relationships, newRel],
      }));
      notify('Relación creada.');
    },
    [notify, updateSchema]
  );

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
          if (parsed.canvas?.bgPattern) setBgPattern(parsed.canvas.bgPattern);
          saveToLocalStorage(parsed);
          notify(`¡Modelo "${parsed.metadata?.name || file.name}" cargado exitosamente!`);
        } else {
          notify('El archivo no tiene el formato .cyc / JSON de base de datos válido.', 'err');
        }
      } catch {
        notify('Error al leer el archivo .cyc. Verifica que sea un JSON válido.', 'err');
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
        if (parsed.canvas?.bgPattern) setBgPattern(parsed.canvas.bgPattern);
        saveToLocalStorage(parsed);
        setActiveModal(null);
        notify('¡Diseño actualizado desde JSON!');
      } else {
        notify('El JSON debe contener al menos un arreglo de "tables".', 'err');
      }
    } catch {
      notify('Error de sintaxis en el JSON. Por favor verifica las comas y comillas.', 'err');
    }
  };

  const handleExportImagePng = () => {
    const root = canvasRef.current?.querySelector('.react-flow') as HTMLElement | null;
    if (!root) return;

    const canvasWidth = 2400;
    const canvasHeight = 1600;

    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('width', canvasWidth.toString());
    svgEl.setAttribute('height', canvasHeight.toString());
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', '100%');
    bgRect.setAttribute('height', '100%');
    bgRect.setAttribute('fill', bgPattern === 'dark' ? '#0f172a' : '#f8fafc');
    svgEl.appendChild(bgRect);

    const clone = root.cloneNode(true) as HTMLElement;
    clone
      .querySelectorAll('.react-flow__controls, .react-flow__minimap, .react-flow__attribution')
      .forEach((el) => el.remove());
    clone.style.width = `${canvasWidth}px`;
    clone.style.height = `${canvasHeight}px`;
    clone.style.background = 'transparent';

    const foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreign.setAttribute('width', '100%');
    foreign.setAttribute('height', '100%');
    foreign.appendChild(clone);
    svgEl.appendChild(foreign);

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
    img.onerror = () => {
      URL.revokeObjectURL(url);
      notify('No se pudo exportar el PNG.', 'err');
    };
    img.src = url;
  };

  const generatedSql = useMemo(() => {
    if (activeModal !== 'sql') return '';
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

    // Anotar notas al final del SQL como comentarios
    if (schema.notes && schema.notes.length > 0) {
      lines.push(`-- =================================================`);
      lines.push(`-- NOTAS Y COMENTARIOS DEL DIAGRAMA`);
      lines.push(`-- =================================================`);
      schema.notes.forEach((note, idx) => {
        lines.push(`-- [Nota ${idx + 1}${note.title ? `: ${note.title}` : ''}]`);
        note.text.split('\n').forEach((tl) => {
          lines.push(`-- ${tl}`);
        });
        lines.push(`--`);
      });
      lines.push(`\n`);
    }

    return lines.join('\n');
  }, [schema, sqlDialect, activeModal]);

  // ==========================================
  // CRUD CREACIÓN DE TABLAS
  // ==========================================
  const handleAddNewTable = useCallback(
    (x?: number, y?: number) => {
      const count = schemaRef.current.tables.length + 1;
      const posX = x ?? (60 + (count % 3) * 280);
      const posY = y ?? (60 + Math.floor(count / 3) * 240);
      const newTbl: TableNode = {
        id: `tbl-${Date.now()}`,
        name: `tabla_${count}`,
        theme: 'datamodeler',
        x: posX,
        y: posY,
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
      setSelectedNoteId(null);
      setSelectedRelationshipId(null);
      notify('Nueva tabla creada.');
    },
    [notify, updateSchema]
  );

  const handleSaveEditedTable = () => {
    if (!editingTable) return;
    updateSchema((prev) => ({
      ...prev,
      tables: prev.tables.map((t) => (t.id === editingTable.id ? editingTable : t)),
    }));
    setActiveModal(null);
    setEditingTable(null);
    notify('Tabla actualizada.');
  };

  const handleResetViewport = () => {
    setViewport({ x: 0, y: 0, zoom: 1 });
  };

  const handleClearCanvas = useCallback(() => {
    if (confirm('¿Estás seguro de que deseas limpiar el lienzo? Se borrarán todas las tablas y notas del modelo actual.')) {
      const emptySchema: CycSchemaFile = {
        format: 'CYC_RELATIONAL_SCHEMA_V1',
        metadata: {
          id: `schema-${Date.now()}`,
          name: 'Nuevo Modelo Relacional',
          version: '1.0.0',
          author: 'Usuario',
          createdAt: new Date().toISOString(),
        },
        tables: [],
        relationships: [],
        notes: [],
        canvas: { bgPattern: 'grid', zoom: 1, panX: 0, panY: 0 },
      };
      setSchema(emptySchema);
      saveToLocalStorage(emptySchema);
      setSelectedTableId(null);
      setSelectedNoteId(null);
      setSelectedRelationshipId(null);
      notify('Lienzo limpiado. Modelo en blanco listo.');
    }
  }, [notify, saveToLocalStorage]);

  const handleToggleLockAll = useCallback((lock: boolean) => {
    updateSchema((prev) => ({
      ...prev,
      tables: prev.tables.map((t) => ({ ...t, locked: lock })),
      notes: (prev.notes || []).map((n) => ({ ...n, locked: lock })),
    }));
    notify(lock ? '🔒 Todas las tablas y notas bloqueadas.' : '🔓 Todas las tablas y notas desbloqueadas.');
  }, [notify, updateSchema]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedTableId) {
      requestDeleteTable(selectedTableId);
    } else if (selectedNoteId) {
      requestDeleteNote(selectedNoteId);
    } else if (selectedRelationshipId) {
      requestDeleteRelationship(selectedRelationshipId);
    } else {
      notify('Selecciona primero una tabla, nota o relación para eliminar.', 'err');
    }
  }, [selectedTableId, selectedNoteId, selectedRelationshipId, requestDeleteTable, requestDeleteNote, requestDeleteRelationship, notify]);

  const bgConf = useMemo(() => {
    switch (bgPattern) {
      case 'dots':
        return { variant: BackgroundVariant.Dots as const, gap: 24, color: '#94a3b8', size: 1.5 };
      case 'blueprint':
        return { variant: BackgroundVariant.Lines as const, gap: 24, color: 'rgba(255,255,255,0.10)' };
      case 'dark':
        return {
          variant: BackgroundVariant.Dots as const,
          gap: 24,
          color: 'rgba(255,255,255,0.18)',
          size: 1.5,
        };
      default:
        return { variant: BackgroundVariant.Lines as const, gap: 24, color: 'rgba(0,0,0,0.07)' };
    }
  }, [bgPattern]);

  const defaultViewport = useMemo(
    () => ({
      x: initialDraft?.canvas?.panX ?? 0,
      y: initialDraft?.canvas?.panY ?? 0,
      zoom: initialDraft?.canvas?.zoom ?? 1,
    }),
    [initialDraft]
  );

  const tableCtxLocked = tableCtxMenu
    ? !!schema.tables.find((t) => t.id === tableCtxMenu.tableId)?.locked
    : false;

  const noteCtxLocked = noteCtxMenu
    ? !!(schema.notes || []).find((n) => n.id === noteCtxMenu.noteId)?.locked
    : false;

  return (
    <div className="relational-engine-root w-full h-full flex flex-col flex-1 overflow-hidden font-sans select-none bg-slate-100">
      <input
        type="file"
        ref={fileInputRef}
        accept=".cyc,.json"
        className="hidden"
        onChange={handleOpenCycFile}
      />

      {/* =======================================================
          BARRA DE MENÚ ESTILO APLICACIÓN (MENU BAR)
          ======================================================= */}
      <header className="engine-header bg-white border-b-2 border-slate-300 px-3 py-1 flex items-center justify-between gap-3 shrink-0 shadow-sm z-40 relative">
        <div className="flex items-center gap-1">
          {/* BARRA DE MENÚS (DROPDOWNS) */}
          <nav ref={menuBarRef} className="flex items-center gap-0.5 relative text-xs font-bold text-slate-700">
            {/* MENÚ: ARCHIVO */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveTopMenu(activeTopMenu === 'archivo' ? null : 'archivo')}
                onMouseEnter={() => activeTopMenu && setActiveTopMenu('archivo')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeTopMenu === 'archivo' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Archivo</span>
                <span className="text-[0.6rem] opacity-60">▾</span>
              </button>

              {activeTopMenu === 'archivo' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5 z-50 flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddNewTable();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>➕</span> Nueva Tabla</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Alt+T</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddNewNote();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>📝</span> Nueva Nota de Texto</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Alt+N</span>
                  </button>

                  <div className="h-px bg-slate-200 my-1 mx-2" />

                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>📂</span> Abrir Archivo .cyc / JSON...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleDownloadCyc();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-blue-900 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>💾</span> Guardar como .cyc</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">.CYC</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setJsonText(JSON.stringify(schema, null, 2));
                      setActiveModal('json');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>📋</span> Ver / Editar Esquema JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleExportImagePng();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🖼️</span> Exportar como Imagen PNG</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">PNG</span>
                  </button>

                  <div className="h-px bg-slate-200 my-1 mx-2" />

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal('templates');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>📦</span> Cargar Plantilla Predefinida...</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleClearCanvas();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-red-50 text-left text-xs font-bold text-red-700 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🗑️</span> Limpiar Lienzo (Nuevo Modelo)</span>
                  </button>
                </div>
              )}
            </div>

            {/* MENÚ: EDITAR */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveTopMenu(activeTopMenu === 'editar' ? null : 'editar')}
                onMouseEnter={() => activeTopMenu && setActiveTopMenu('editar')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeTopMenu === 'editar' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Editar</span>
                <span className="text-[0.6rem] opacity-60">▾</span>
              </button>

              {activeTopMenu === 'editar' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5 z-50 flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      handleToggleLockAll(true);
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🔒</span> Bloquear Todas las Tablas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleToggleLockAll(false);
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🔓</span> Desbloquear Todas</span>
                  </button>

                  <div className="h-px bg-slate-200 my-1 mx-2" />

                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteSelected();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-red-50 text-left text-xs font-bold text-red-700 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🗑️</span> Eliminar Elemento Seleccionado</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Supr</span>
                  </button>
                </div>
              )}
            </div>

            {/* MENÚ: VER */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveTopMenu(activeTopMenu === 'ver' ? null : 'ver')}
                onMouseEnter={() => activeTopMenu && setActiveTopMenu('ver')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeTopMenu === 'ver' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Ver</span>
                <span className="text-[0.6rem] opacity-60">▾</span>
              </button>

              {activeTopMenu === 'ver' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5 z-50 flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSidebarOpen(!isSidebarOpen);
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>⚙️</span> Panel Inspector</span>
                    <span className="text-xs">{isSidebarOpen ? '✓' : ''}</span>
                  </button>

                  <div className="h-px bg-slate-200 my-1 mx-2" />
                  <div className="px-3 py-1 text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">Fondo del Lienzo</div>

                  <button
                    type="button"
                    onClick={() => {
                      setBgPattern('grid');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>📐</span> Cuadrícula Clásica</span>
                    <span className="text-xs">{bgPattern === 'grid' ? '✓' : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBgPattern('dots');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>⚪</span> Puntos Modernos</span>
                    <span className="text-xs">{bgPattern === 'dots' ? '✓' : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBgPattern('blueprint');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🟦</span> Blueprint Técnico</span>
                    <span className="text-xs">{bgPattern === 'blueprint' ? '✓' : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setBgPattern('dark');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🌙</span> Modo Oscuro Slate</span>
                    <span className="text-xs">{bgPattern === 'dark' ? '✓' : ''}</span>
                  </button>

                  <div className="h-px bg-slate-200 my-1 mx-2" />

                  <button
                    type="button"
                    onClick={() => {
                      handleResetViewport();
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🎯</span> Centrar Lienzo</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Reset</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      zoomIn({ duration: 150 });
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🔍</span> Acercar (Zoom In)</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">+</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      zoomOut({ duration: 150 });
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🔍</span> Alejar (Zoom Out)</span>
                    <span className="text-[0.65rem] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">−</span>
                  </button>
                </div>
              )}
            </div>

            {/* MENÚ: SQL DDL */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveTopMenu(activeTopMenu === 'sql' ? null : 'sql')}
                onMouseEnter={() => activeTopMenu && setActiveTopMenu('sql')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeTopMenu === 'sql' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>SQL DDL</span>
                <span className="text-[0.6rem] opacity-60">▾</span>
              </button>

              {activeTopMenu === 'sql' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5 z-50 flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal('sql');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-emerald-50 text-left text-xs font-bold text-emerald-900 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>⚡</span> Ver Script SQL DDL Completo...</span>
                  </button>

                  <div className="h-px bg-slate-200 my-1 mx-2" />
                  <div className="px-3 py-1 text-[0.65rem] font-black text-slate-400 uppercase tracking-wider">Dialecto de Exportación</div>

                  <button
                    type="button"
                    onClick={() => {
                      setSqlDialect('postgresql');
                      setActiveModal('sql');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🐘</span> PostgreSQL</span>
                    <span className="text-xs">{sqlDialect === 'postgresql' ? '✓' : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSqlDialect('mysql');
                      setActiveModal('sql');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🐬</span> MySQL / MariaDB</span>
                    <span className="text-xs">{sqlDialect === 'mysql' ? '✓' : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSqlDialect('sqlite');
                      setActiveModal('sql');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🪶</span> SQLite</span>
                    <span className="text-xs">{sqlDialect === 'sqlite' ? '✓' : ''}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSqlDialect('oracle');
                      setActiveModal('sql');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>🏛️</span> Oracle SQL</span>
                    <span className="text-xs">{sqlDialect === 'oracle' ? '✓' : ''}</span>
                  </button>
                </div>
              )}
            </div>

            {/* MENÚ: AYUDA */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveTopMenu(activeTopMenu === 'ayuda' ? null : 'ayuda')}
                onMouseEnter={() => activeTopMenu && setActiveTopMenu('ayuda')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  activeTopMenu === 'ayuda' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>Ayuda</span>
                <span className="text-[0.6rem] opacity-60">▾</span>
              </button>

              {activeTopMenu === 'ayuda' && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border-2 border-[#1E1210] rounded-xl shadow-[4px_4px_0px_#1E1210] py-1.5 z-50 flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal('guide');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>📖</span> Guía de Uso y Formato .CYC</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal('guide');
                      setActiveTopMenu(null);
                    }}
                    className="px-3 py-1.5 hover:bg-slate-100 text-left text-xs font-bold text-slate-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2"><span>⌨️</span> Atajos de Teclado</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* =======================================================
          ÁREA PRINCIPAL: CANVAS REACT FLOW + INSPECTOR
          ======================================================= */}
      <div className="engine-workspace flex-1 w-full h-full min-h-0 flex flex-row overflow-hidden relative">
        <div className="engine-canvas-container flex-1 h-full min-h-0 flex flex-col overflow-hidden relative bg-white">
          <div className="canvas-toolbar bg-slate-100 px-4 py-2 border-b-2 border-[#1E1210] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black text-slate-700">
                Lienzo: {schema.tables.length} Tablas · {schema.relationships.length} Relaciones · {(schema.notes || []).length} Notas
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBgPattern('grid')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'grid'
                      ? 'bg-[#1E1210] text-white border-[#1E1210]'
                      : 'bg-white text-slate-700'
                  }`}
                >
                  Cuadrícula
                </button>
                <button
                  type="button"
                  onClick={() => setBgPattern('dots')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'dots'
                      ? 'bg-[#1E1210] text-white border-[#1E1210]'
                      : 'bg-white text-slate-700'
                  }`}
                >
                  Puntos
                </button>
                <button
                  type="button"
                  onClick={() => setBgPattern('blueprint')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'blueprint'
                      ? 'bg-[#1E1210] text-white border-[#1E1210]'
                      : 'bg-white text-slate-700'
                  }`}
                >
                  Blueprint
                </button>
                <button
                  type="button"
                  onClick={() => setBgPattern('dark')}
                  className={`px-2 py-0.5 text-[0.68rem] font-bold rounded-md border ${
                    bgPattern === 'dark'
                      ? 'bg-[#1E1210] text-white border-[#1E1210]'
                      : 'bg-white text-slate-700'
                  }`}
                >
                  Oscuro
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-300 shadow-sm">
              <button
                type="button"
                onClick={() => zoomIn({ duration: 150 })}
                className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-[#1E1210] font-black text-xs cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <span className="text-[0.7rem] font-mono font-bold px-1">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => zoomOut({ duration: 150 })}
                className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-[#1E1210] font-black text-xs cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
              <button
                type="button"
                onClick={handleResetViewport}
                className="px-2 h-6 flex items-center justify-center rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                title="Centrar y Resetear"
              >
                ⟲ Centrar
              </button>
            </div>
          </div>

          <div
            ref={canvasRef}
            className={`engine-canvas-viewport relative w-full h-full flex-1 min-h-0 ${
              bgPattern === 'dark'
                ? 'bg-[#0b0f19]'
                : bgPattern === 'blueprint'
                ? 'bg-[#0f284e]'
                : 'bg-[#fafcff]'
            }`}
          >
            <ReactFlow
              nodes={rfNodes}
              edges={rfEdges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={handleNodesChangeStable}
              onEdgesChange={handleEdgesChangeStable}
              onNodeDragStop={handleNodeDragStop}
              onConnect={onConnect}
              isValidConnection={isValidConnection}
              onNodeClick={(_e, node) => {
                if (node.type === 'table') {
                  setSelectedTableId(node.id);
                  setSelectedNoteId(null);
                  setSelectedRelationshipId(null);
                } else if (node.type === 'note') {
                  setSelectedNoteId(node.id);
                  setSelectedTableId(null);
                  setSelectedRelationshipId(null);
                }
                setTableCtxMenu(null);
                setNoteCtxMenu(null);
                setPaneCtxMenu(null);
              }}
              onEdgeClick={(_e, edge) => {
                setSelectedRelationshipId(edge.id);
                setSelectedTableId(null);
                setSelectedNoteId(null);
                setTableCtxMenu(null);
                setNoteCtxMenu(null);
                setPaneCtxMenu(null);
              }}
              onPaneClick={() => {
                setSelectedTableId(null);
                setSelectedNoteId(null);
                setSelectedRelationshipId(null);
                setTableCtxMenu(null);
                setNoteCtxMenu(null);
                setPaneCtxMenu(null);
              }}
              onPaneContextMenu={handlePaneContextMenu}
              onMoveEnd={(_e, viewport) => {
                setSchema((prev) => ({
                  ...prev,
                  canvas: {
                    ...prev.canvas,
                    zoom: viewport.zoom,
                    panX: viewport.x,
                    panY: viewport.y,
                  },
                }));
              }}
              defaultViewport={defaultViewport}
              minZoom={0.5}
              maxZoom={1.8}
              zoomOnDoubleClick={false}
              deleteKeyCode={null}
              selectionKeyCode="Shift"
              panOnScroll
              panOnDrag
              zoomOnPinch
              connectOnClick={false}
              connectionRadius={28}
              nodesConnectable
              elementsSelectable
              proOptions={{ hideAttribution: false }}
              className="engine-react-flow"
            >
              <Background {...bgConf} />
              <svg className="absolute w-0 h-0" aria-hidden="true">
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
              </svg>
            </ReactFlow>
          </div>
        </div>

        {/* =======================================================
            PANEL LATERAL: INSPECTOR
            ======================================================= */}
        {isSidebarOpen && (
          <aside className="engine-sidebar w-80 lg:w-88 h-full bg-white border-l-2 border-slate-300 flex flex-col shrink-0 shadow-lg z-20 overflow-y-auto p-4 gap-4">
            <div className="border-b-2 border-slate-200 pb-2 flex items-center justify-between">
              <h2 className="text-sm font-black text-[#1E1210] m-0 flex items-center gap-1.5">
                <span>⚙️</span> Inspector
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="text-[0.65rem] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                  {selectedTableId ? 'Tabla' : selectedNoteId ? 'Nota' : selectedRelationshipId ? 'Relación' : 'Modelo'}
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

            {/* INSPECTOR DE TABLA */}
            {selectedTableId &&
              (() => {
                const tbl = schema.tables.find((t) => t.id === selectedTableId);
                if (!tbl) return null;
                const locked = !!tbl.locked;
                return (
                  <div className="flex flex-col gap-3 text-xs">
                    {locked && (
                      <div className="bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-1.5 rounded-xl font-bold text-[0.7rem]">
                        🔒 Tabla bloqueada: no se puede editar, mover ni eliminar.
                      </div>
                    )}
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nombre de la Tabla:</label>
                      <input
                        type="text"
                        value={tbl.name}
                        disabled={locked}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSchema((prev) => ({
                            ...prev,
                            tables: prev.tables.map((t) => (t.id === tbl.id ? { ...t, name: val } : t)),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-mono font-bold text-xs bg-slate-50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tema Visual de Color:</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {Object.values(TABLE_THEMES).map((th) => (
                          <button
                            key={th.id}
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              updateSchema((prev) => ({
                                ...prev,
                                tables: prev.tables.map((t) =>
                                  t.id === tbl.id ? { ...t, theme: th.id } : t
                                ),
                              }));
                            }}
                            className={`px-2 py-1 rounded-lg text-[0.68rem] font-bold border flex items-center gap-1.5 disabled:opacity-50 cursor-pointer ${
                              tbl.theme === th.id
                                ? 'border-2 border-black ring-2 ring-blue-500'
                                : 'border-slate-300'
                            }`}
                            style={{ backgroundColor: th.bodyBg }}
                          >
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: th.headerBg }}
                            />
                            <span className="truncate">{th.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => handleOpenEditTable(tbl)}
                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        ✏️ Editar Columnas ({tbl.columns.length})
                      </button>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => requestDeleteTable(tbl.id)}
                        className="py-1.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl border-2 border-red-300 text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="Eliminar tabla"
                      >
                        🗑️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleLock(tbl.id)}
                        className="py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-xl border-2 border-amber-300 text-xs cursor-pointer"
                        title={locked ? 'Desbloquear tabla' : 'Bloquear tabla'}
                      >
                        {locked ? '🔓' : '🔒'}
                      </button>
                    </div>
                  </div>
                );
              })()}

            {/* INSPECTOR DE NOTA / TEXTO */}
            {selectedNoteId &&
              (() => {
                const note = (schema.notes || []).find((n) => n.id === selectedNoteId);
                if (!note) return null;
                const locked = !!note.locked;

                return (
                  <div className="flex flex-col gap-3 text-xs">
                    {locked && (
                      <div className="bg-amber-50 border border-amber-300 text-amber-900 px-2.5 py-1.5 rounded-xl font-bold text-[0.7rem]">
                        🔒 Nota bloqueada: no se puede editar, mover ni eliminar.
                      </div>
                    )}

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Título de la Nota (opcional):</label>
                      <input
                        type="text"
                        value={note.title || ''}
                        disabled={locked}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSchema((prev) => ({
                            ...prev,
                            notes: (prev.notes || []).map((n) => (n.id === note.id ? { ...n, title: val } : n)),
                          }));
                        }}
                        placeholder="Ej. Regla de negocio / Requisitos"
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-bold text-xs bg-slate-50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Contenido del Texto:</label>
                      <textarea
                        value={note.text}
                        disabled={locked}
                        rows={4}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSchema((prev) => ({
                            ...prev,
                            notes: (prev.notes || []).map((n) => (n.id === note.id ? { ...n, text: val } : n)),
                          }));
                        }}
                        placeholder="Escribe aquí notas, comentarios de arquitectura o detalles..."
                        className="w-full px-3 py-2 rounded-xl border-2 border-[#1E1210] text-xs bg-slate-50 disabled:opacity-50 resize-y"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Color de Fondo / Tema:</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {Object.values(NOTE_THEMES).map((th) => (
                          <button
                            key={th.id}
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              updateSchema((prev) => ({
                                ...prev,
                                notes: (prev.notes || []).map((n) =>
                                  n.id === note.id ? { ...n, theme: th.id } : n
                                ),
                              }));
                            }}
                            className={`px-2 py-1 rounded-lg text-[0.68rem] font-bold border flex items-center gap-1.5 disabled:opacity-50 cursor-pointer ${
                              note.theme === th.id
                                ? 'border-2 border-black ring-2 ring-amber-500'
                                : 'border-slate-300'
                            }`}
                            style={{ backgroundColor: th.bg, color: th.textColor }}
                          >
                            <span
                              className="w-3 h-3 rounded-full border border-black/20"
                              style={{ backgroundColor: th.border }}
                            />
                            <span className="truncate">{th.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tipografía / Estilo de Fuente:</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'sans', label: '🔤 Sans', fontCls: 'font-sans' },
                          { id: 'handwriting', label: '✍️ Manuscrita', fontCls: 'font-["Caveat",_cursive] font-bold' },
                          { id: 'mono', label: '💻 Mono', fontCls: 'font-mono' },
                          { id: 'serif', label: '📖 Serif', fontCls: 'font-serif' },
                        ].map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              updateSchema((prev) => ({
                                ...prev,
                                notes: (prev.notes || []).map((n) =>
                                  n.id === note.id ? { ...n, fontFamily: f.id as NoteFontFamily } : n
                                ),
                              }));
                            }}
                            className={`px-2 py-1.5 rounded-lg text-[0.68rem] font-bold border text-left truncate disabled:opacity-50 cursor-pointer ${
                              (note.fontFamily || 'sans') === f.id
                                ? 'bg-amber-100 border-2 border-amber-600 text-amber-950 font-black'
                                : 'bg-white border-slate-300 text-slate-700'
                            } ${f.fontCls}`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tamaño de Letra:</label>
                      <div className="grid grid-cols-5 gap-1">
                        {(['xs', 'sm', 'base', 'lg', 'xl'] as NoteFontSize[]).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              updateSchema((prev) => ({
                                ...prev,
                                notes: (prev.notes || []).map((n) =>
                                  n.id === note.id ? { ...n, fontSize: sz } : n
                                ),
                              }));
                            }}
                            className={`py-1 rounded-lg text-[0.65rem] font-bold border text-center uppercase disabled:opacity-50 cursor-pointer ${
                              (note.fontSize || 'sm') === sz
                                ? 'bg-[#1E1210] text-white border-[#1E1210]'
                                : 'bg-white border-slate-300 text-slate-700'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Ancho de Tarjeta:</label>
                      <div className="grid grid-cols-4 gap-1">
                        {[200, 260, 320, 380].map((w) => (
                          <button
                            key={w}
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              updateSchema((prev) => ({
                                ...prev,
                                notes: (prev.notes || []).map((n) =>
                                  n.id === note.id ? { ...n, width: w } : n
                                ),
                              }));
                            }}
                            className={`py-1 rounded-lg text-[0.65rem] font-bold border text-center disabled:opacity-50 cursor-pointer ${
                              (note.width || 260) === w
                                ? 'bg-[#1E1210] text-white border-[#1E1210]'
                                : 'bg-white border-slate-300 text-slate-700'
                            }`}
                          >
                            {w}px
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => handleOpenEditNote(note)}
                        className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        ✏️ Modal Edición
                      </button>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => handleDuplicateNote(note.id)}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border-2 border-slate-300 text-xs disabled:opacity-40 cursor-pointer"
                        title="Duplicar nota"
                      >
                        📋
                      </button>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => requestDeleteNote(note.id)}
                        className="py-1.5 px-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl border-2 border-red-300 text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        title="Eliminar nota"
                      >
                        🗑️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleLockNote(note.id)}
                        className="py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-xl border-2 border-amber-300 text-xs cursor-pointer"
                        title={locked ? 'Desbloquear nota' : 'Bloquear nota'}
                      >
                        {locked ? '🔓' : '🔒'}
                      </button>
                    </div>
                  </div>
                );
              })()}

            {/* INSPECTOR DE RELACIÓN */}
            {selectedRelationshipId &&
              (() => {
                const rel = schema.relationships.find((r) => r.id === selectedRelationshipId);
                if (!rel) return null;
                const srcTbl = schema.tables.find((t) => t.id === rel.sourceTableId);
                const tgtTbl = schema.tables.find((t) => t.id === rel.targetTableId);
                const relLocked = !!srcTbl?.locked || !!tgtTbl?.locked;

                return (
                  <div className="flex flex-col gap-3 text-xs">
                    <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                      <span className="text-[0.65rem] uppercase font-bold text-blue-800 block">
                        Conexión FK:
                      </span>
                      <p className="font-mono font-bold text-slate-800 m-0">
                        {srcTbl?.name} → {tgtTbl?.name}
                      </p>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Cardinalidad:</label>
                      <select
                        value={rel.cardinality}
                        disabled={relLocked}
                        onChange={(e) => {
                          const val = e.target.value as RelationshipEdge['cardinality'];
                          updateSchema((prev) => ({
                            ...prev,
                            relationships: prev.relationships.map((r) =>
                              r.id === rel.id ? { ...r, cardinality: val } : r
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-bold text-xs bg-slate-50 disabled:opacity-50"
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
                        disabled={relLocked}
                        onChange={(e) => {
                          const val = e.target.value as RelationshipEdge['onDelete'];
                          updateSchema((prev) => ({
                            ...prev,
                            relationships: prev.relationships.map((r) =>
                              r.id === rel.id ? { ...r, onDelete: val } : r
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] font-bold text-xs bg-slate-50 disabled:opacity-50"
                      >
                        <option value="CASCADE">CASCADE (Eliminar en Cascada)</option>
                        <option value="SET NULL">SET NULL (Nulificar)</option>
                        <option value="RESTRICT">RESTRICT (Restringir)</option>
                        <option value="NO ACTION">NO ACTION</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Regla de Negocio / Comentario:
                      </label>
                      <input
                        type="text"
                        value={rel.businessRule || ''}
                        disabled={relLocked}
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
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-[#1E1210] text-xs bg-slate-50 disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={relLocked}
                      onClick={() => requestDeleteRelationship(rel.id)}
                      className="w-full py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl border-2 border-[#1E1210] text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      🗑️ Eliminar Relación
                    </button>
                  </div>
                );
              })()}

            {!selectedTableId && !selectedNoteId && !selectedRelationshipId && (
              <div className="flex flex-col gap-3 text-xs text-slate-600">
                <p className="m-0 leading-relaxed">
                  Selecciona una tabla, nota o línea de relación para ver y editar sus propiedades.
                </p>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-black text-slate-800 block mb-1">💡 Consejos Rápidos:</span>
                  <ul className="list-disc pl-4 space-y-1.5 text-[0.72rem]">
                    <li>
                      <strong>Clic derecho en el lienzo:</strong> crea una <strong>Nota</strong> o <strong>Tabla</strong> donde apuntes con el cursor.
                    </li>
                    <li>
                      <strong>Notas de Texto:</strong> personaliza fondo (post-it, menta, lavanda...), tipografía manuscrita, mono o sans, sin afectar la BD.
                    </li>
                    <li>
                      Arrastra desde los círculos de la derecha para <strong>conectar tablas</strong>.
                    </li>
                    <li>
                      <strong>Doble click</strong> en una tabla o nota para editarla.
                    </li>
                    <li>Guarda en formato <code>.cyc</code> para continuar tu diseño cuando quieras.</li>
                  </ul>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* =======================================================
          MODALES
          ======================================================= */}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border-[3px] border-[#1E1210] rounded-2xl p-6 max-w-md w-full shadow-[8px_8px_0px_#1E1210] flex flex-col gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-100 border-2 border-red-500 text-red-600 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                🗑️
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="m-0 text-base font-black text-[#1E1210]">
                  {deleteTarget.type === 'table'
                    ? '¿Eliminar Tabla?'
                    : deleteTarget.type === 'note'
                    ? '¿Eliminar Nota de Texto?'
                    : '¿Eliminar Relación?'}
                </h3>
                <div className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {deleteTarget.type === 'table' && (
                    <>
                      Estás a punto de eliminar la tabla{' '}
                      <span className="font-mono font-black text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 inline-block">
                        {deleteTarget.name}
                      </span>
                      {deleteTarget.relCount > 0 ? (
                        <>
                          {' '}
                          y sus{' '}
                          <strong className="text-red-700 font-black">
                            {deleteTarget.relCount} relación(es)
                          </strong>{' '}
                          asociadas.
                        </>
                      ) : (
                        '.'
                      )}
                    </>
                  )}

                  {deleteTarget.type === 'note' && (
                    <>
                      Se eliminará la nota{' '}
                      <span className="font-bold text-slate-900 italic">
                        "{deleteTarget.title}"
                      </span>{' '}
                      del lienzo.
                    </>
                  )}

                  {deleteTarget.type === 'relationship' && (
                    <>
                      Se eliminará la conexión de clave foránea entre{' '}
                      <span className="font-mono font-bold text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 inline-block">
                        {deleteTarget.desc}
                      </span>
                      .
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-[0.72rem] text-red-900 flex items-center gap-2">
              <span className="text-sm shrink-0">⚠️</span>
              <span className="font-semibold">
                Esta acción es permanente y no se puede deshacer.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs cursor-pointer flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <span>🗑️</span>
                <span>Sí, Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN DE TABLA */}
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
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Comentario / Propósito:
                  </label>
                  <input
                    type="text"
                    value={editingTable.comment || ''}
                    onChange={(e) => setEditingTable({ ...editingTable, comment: e.target.value })}
                    placeholder="Descripción del propósito de la entidad"
                    className="w-full px-3 py-2 rounded-xl border-2 border-[#1E1210] text-xs"
                  />
                </div>
              </div>

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
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg border border-[#1E1210] cursor-pointer"
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

                      <label className="flex items-center gap-1 text-[0.7rem] font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!col.pk}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setEditingTable({
                              ...editingTable,
                              columns: editingTable.columns.map((c) =>
                                c.id === col.id
                                  ? { ...c, pk: val, notNull: val ? true : c.notNull }
                                  : c
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
                            notify('La tabla debe tener al menos una columna.', 'err');
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
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveEditedTable}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN DE NOTA */}
      {activeModal === 'note' && editingNote && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-xl w-full shadow-[8px_8px_0px_#1E1210] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4">
              <h3 className="m-0 text-base font-black text-[#1E1210] flex items-center gap-2">
                <span>📝</span> Editar Nota / Detalle de Texto
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
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Título de la Nota (opcional):</label>
                <input
                  type="text"
                  value={editingNote.title || ''}
                  onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  placeholder="Ej. Regla de Negocio / Módulo de Pagos"
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#1E1210] font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contenido de la Nota:</label>
                <textarea
                  value={editingNote.text}
                  onChange={(e) => setEditingNote({ ...editingNote, text: e.target.value })}
                  rows={5}
                  placeholder="Escribe aquí los detalles, notas de arquitectura o requerimientos..."
                  className="w-full px-3 py-2 rounded-xl border-2 border-[#1E1210] text-xs resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Color de Fondo / Tema:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.values(NOTE_THEMES).map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setEditingNote({ ...editingNote, theme: th.id })}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                        editingNote.theme === th.id
                          ? 'border-2 border-black ring-2 ring-amber-500 shadow-sm scale-[1.02]'
                          : 'border-slate-300 hover:scale-[1.01]'
                      }`}
                      style={{ backgroundColor: th.bg, color: th.textColor }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: th.border }}
                      />
                      <span className="truncate">{th.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Tipografía / Estilo de Fuente:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'sans', label: '🔤 Sans', fontCls: 'font-sans' },
                      { id: 'handwriting', label: '✍️ Manuscrita', fontCls: 'font-["Caveat",_cursive] font-bold text-sm' },
                      { id: 'mono', label: '💻 Mono', fontCls: 'font-mono' },
                      { id: 'serif', label: '📖 Serif', fontCls: 'font-serif' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setEditingNote({ ...editingNote, fontFamily: f.id as NoteFontFamily })}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${
                          (editingNote.fontFamily || 'sans') === f.id
                            ? 'bg-amber-100 border-2 border-amber-600 text-amber-950 font-black'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        } ${f.fontCls}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Tamaño de Letra:</label>
                  <div className="grid grid-cols-5 gap-1">
                    {(['xs', 'sm', 'base', 'lg', 'xl'] as NoteFontSize[]).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setEditingNote({ ...editingNote, fontSize: sz })}
                        className={`py-1.5 rounded-lg text-xs font-bold border text-center uppercase transition-all cursor-pointer ${
                          (editingNote.fontSize || 'sm') === sz
                            ? 'bg-[#1E1210] text-white border-[#1E1210]'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vista previa en tiempo real */}
              <div>
                <label className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Vista Previa de la Nota:
                </label>
                <div
                  className="p-3.5 rounded-xl border-2 shadow-sm transition-all whitespace-pre-wrap break-words"
                  style={{
                    backgroundColor: (NOTE_THEMES[editingNote.theme] || NOTE_THEMES.yellow).bg,
                    borderColor: (NOTE_THEMES[editingNote.theme] || NOTE_THEMES.yellow).border,
                    color: (NOTE_THEMES[editingNote.theme] || NOTE_THEMES.yellow).textColor,
                    fontFamily:
                      editingNote.fontFamily === 'handwriting'
                        ? '"Caveat", cursive'
                        : editingNote.fontFamily === 'mono'
                        ? 'monospace'
                        : editingNote.fontFamily === 'serif'
                        ? 'Merriweather, serif'
                        : 'inherit',
                  }}
                >
                  {editingNote.title && (
                    <div className="font-bold text-xs mb-1 opacity-90 border-b border-black/10 pb-1 flex items-center gap-1">
                      <span>📝</span>
                      <span>{editingNote.title}</span>
                    </div>
                  )}
                  <div
                    className={
                      editingNote.fontSize === 'xs'
                        ? 'text-[0.75rem]'
                        : editingNote.fontSize === 'base'
                        ? 'text-[0.92rem]'
                        : editingNote.fontSize === 'lg'
                        ? 'text-base'
                        : editingNote.fontSize === 'xl'
                        ? 'text-lg'
                        : 'text-xs'
                    }
                  >
                    {editingNote.text || 'Vista previa del texto de la nota...'}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-3 mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveEditedNote}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs cursor-pointer"
              >
                Guardar Nota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE SQL DDL */}
      {activeModal === 'sql' && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f172a] text-slate-100 border-[3px] border-[#1E1210] rounded-2xl p-5 max-w-3xl w-full shadow-[8px_8px_0px_#1E1210] max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h3 className="m-0 text-base font-black text-white">Script SQL DDL Autogenerado</h3>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sqlDialect}
                  onChange={(e) => setSqlDialect(e.target.value as typeof sqlDialect)}
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
                    notify('¡Script SQL copiado al portapapeles!');
                  }}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer"
                >
                  📋 Copiar SQL
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre">
              {generatedSql}
            </div>

            <div className="border-t border-slate-800 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>
                Válido para ejecutar directamente en DBeaver, pgAdmin, MySQL Workbench o DataGrip.
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE JSON */}
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
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-2">
              Puedes copiar este JSON para compartirlo, o pegar un JSON / contenido .cyc para cargar
              tu modelo:
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
                  notify('¡JSON copiado!');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
              >
                📋 Copiar al Portapapeles
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApplyJson}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl border-2 border-[#1E1210] shadow-[2px_2px_0px_#1E1210] text-xs cursor-pointer"
                >
                  Aplicar y Cargar JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE PLANTILLAS */}
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
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm cursor-pointer"
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
                      const next = {
                        ...tpl.data,
                        metadata: { ...tpl.data.metadata, createdAt: new Date().toISOString() },
                      };
                      setSchema(next);
                      if (next.canvas?.bgPattern) setBgPattern(next.canvas.bgPattern);
                      saveToLocalStorage(next);
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
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE GUÍA */}
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
                    Los archivos <code>.cyc</code> son esquemas JSON estructurados que guardan
                    metadatos, tablas, columnas, claves primarias (PK), claves foráneas (FK), notas de texto y coordenadas <code>(x, y)</code> en el lienzo.
                  </p>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 flex flex-col gap-1.5">
                  <h4 className="font-black text-amber-950 text-xs uppercase tracking-wider m-0 flex items-center gap-1">
                    <span>📝</span> Notas y Documentación
                  </h4>
                  <p className="m-0 leading-relaxed font-medium">
                    Haz <strong>clic derecho en cualquier parte libre del lienzo</strong> o usa el botón <code>📝 Nota</code> para colocar notas con colores personalizables (post-it, menta, lavanda...) y tipografías (manuscrita, mono, serif, sans).
                  </p>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 flex flex-col gap-1.5">
                  <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider m-0 flex items-center gap-1">
                    <span>⚡</span> SQL DDL e Imágenes
                  </h4>
                  <p className="m-0 leading-relaxed font-medium">
                    Genera el código SQL DDL en tiempo real con sintaxis compatible con <strong>PostgreSQL, MySQL, SQLite y Oracle SQL Developer</strong>, o exporta como imagen PNG de alta resolución.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
                <h4 className="font-black text-slate-800 text-xs uppercase tracking-wider m-0">
                  ⌨️ Atajos y Controles de Interacción
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.75rem]">
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">
                      Clic derecho en lienzo
                    </kbd>
                    <span>Crea una Nota de Texto o Tabla en ese punto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">
                      Doble click
                    </kbd>
                    <span>Edita la tabla o nota bajo el cursor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">
                      Zoom
                    </kbd>
                    <span>Botones <code>+</code> y <code>−</code> o rueda del ratón</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">
                      Arrastrar lienzo
                    </kbd>
                    <span>Haz clic y arrastra sobre el fondo del lienzo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">
                      Personalizar Nota
                    </kbd>
                    <span>Elige colores de fondo, fuente manuscrita y tamaño</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[0.7rem] shadow-sm">
                      Inspector
                    </kbd>
                    <span>Panel lateral para ajustar propiedades avanzadas</span>
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

      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-[60] px-4 py-2.5 rounded-xl border-2 border-[#1E1210] shadow-[3px_3px_0px_#1E1210] text-xs font-black max-w-sm pointer-events-none ${
            toast.kind === 'ok' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* MENÚ CONTEXTUAL DE TABLA */}
      {tableCtxMenu && (
        <TableContextMenu
          menu={tableCtxMenu}
          locked={tableCtxLocked}
          onEdit={() => {
            const tbl = schemaRef.current.tables.find((t) => t.id === tableCtxMenu.tableId);
            if (tbl) handleOpenEditTable(tbl);
          }}
          onDuplicate={() => handleDuplicateTable(tableCtxMenu.tableId)}
          onToggleLock={() => handleToggleLock(tableCtxMenu.tableId)}
          onDelete={() => requestDeleteTable(tableCtxMenu.tableId)}
          onClose={() => setTableCtxMenu(null)}
        />
      )}

      {/* MENÚ CONTEXTUAL DE NOTA */}
      {noteCtxMenu && (
        <NoteContextMenu
          menu={noteCtxMenu}
          locked={noteCtxLocked}
          onEdit={() => {
            const note = (schemaRef.current.notes || []).find((n) => n.id === noteCtxMenu.noteId);
            if (note) handleOpenEditNote(note);
          }}
          onDuplicate={() => handleDuplicateNote(noteCtxMenu.noteId)}
          onToggleLock={() => handleToggleLockNote(noteCtxMenu.noteId)}
          onDelete={() => requestDeleteNote(noteCtxMenu.noteId)}
          onClose={() => setNoteCtxMenu(null)}
        />
      )}

      {/* MENÚ CONTEXTUAL DEL LIENZO (PANE / CLIC DERECHO AFUERA) */}
      {paneCtxMenu && (
        <PaneContextMenu
          menu={paneCtxMenu}
          onAddNote={(x, y) => handleAddNewNote(x, y)}
          onAddTable={(x, y) => handleAddNewTable(x, y)}
          onCenter={handleResetViewport}
          onClose={() => setPaneCtxMenu(null)}
        />
      )}
    </div>
  );
}

export default function RelationalDatabaseEngine() {
  return (
    <ReactFlowProvider>
      <RelationalDatabaseEngineInner />
    </ReactFlowProvider>
  );
}
