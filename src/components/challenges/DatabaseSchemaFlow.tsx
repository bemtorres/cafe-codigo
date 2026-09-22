import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { DbTable } from '../../data/databaseChallenges';

interface DatabaseSchemaFlowProps {
  tables: DbTable[];
  title?: string;
  challengeId?: string | number;
}

interface NodePosition {
  x: number;
  y: number;
}

interface EdgeConnection {
  id: string;
  sourceTable: string;
  sourceField: string;
  targetTable: string;
  targetField: string;
  type: '1:1' | '1:N' | 'N:M';
}

export default function DatabaseSchemaFlow({ tables, title, challengeId = '1' }: DatabaseSchemaFlowProps) {
  // Extraer relaciones analizando campos FK
  const edges: EdgeConnection[] = useMemo(() => {
    const list: EdgeConnection[] = [];
    tables.forEach((tbl) => {
      tbl.fields.forEach((fld) => {
        if (fld.fk) {
          const parts = fld.fk.split('.');
          const targetTable = parts[0];
          const targetField = parts[1] || 'id';
          const isUnique = fld.unique;
          const isCompositePk = fld.pk && tbl.fields.filter((f) => f.pk).length > 1;

          list.push({
            id: `edge-${tbl.name}-${fld.name}-${targetTable}`,
            sourceTable: tbl.name,
            sourceField: fld.name,
            targetTable: targetTable,
            targetField: targetField,
            type: isUnique ? '1:1' : isCompositePk ? 'N:M' : '1:N',
          });
        }
      });
    });
    return list;
  }, [tables]);

  // Posicionamiento inteligente inicial de los nodos (Auto-Layout)
  const initialPositions = useMemo(() => {
    const pos: Record<string, NodePosition> = {};
    const count = tables.length;

    if (count === 1) {
      pos[tables[0].name] = { x: 260, y: 40 };
    } else if (count === 2) {
      pos[tables[0].name] = { x: 60, y: 50 };
      pos[tables[1].name] = { x: 440, y: 50 };
    } else if (count <= 5) {
      // Distribución en 2 filas
      const topCount = Math.ceil(count / 2);
      tables.forEach((tbl, idx) => {
        if (idx < topCount) {
          pos[tbl.name] = { x: 40 + idx * 300, y: 40 };
        } else {
          pos[tbl.name] = { x: 60 + (idx - topCount) * 320, y: 320 };
        }
      });
    } else {
      // 10 tablas (Macro casos empresariales): Distribución en cuadrícula 3x4
      tables.forEach((tbl, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        pos[tbl.name] = {
          x: 40 + col * 320,
          y: 40 + row * 260,
        };
      });
    }
    return pos;
  }, [tables]);

  const [positions, setPositions] = useState<Record<string, NodePosition>>(initialPositions);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reiniciar posiciones al cambiar de desafío
  useEffect(() => {
    setPositions(initialPositions);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [initialPositions]);

  // Manejo de Drag & Drop de Nodos y Pan del Canvas
  const handleMouseDownNode = (e: React.MouseEvent, tableName: string) => {
    e.stopPropagation();
    setDraggingNode(tableName);
    setDragStart({
      x: e.clientX - (positions[tableName]?.x || 0) * zoom,
      y: e.clientY - (positions[tableName]?.y || 0) * zoom,
    });
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingNode) {
        const newX = Math.round((e.clientX - dragStart.x) / zoom);
        const newY = Math.round((e.clientY - dragStart.y) / zoom);
        setPositions((prev) => ({
          ...prev,
          [draggingNode]: { x: Math.max(10, newX), y: Math.max(10, newY) },
        }));
      } else if (isPanning) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [draggingNode, isPanning, dragStart, zoom]
  );

  const handleMouseUp = () => {
    setDraggingNode(null);
    setIsPanning(false);
  };

  // Controles de Zoom
  const zoomIn = () => setZoom((z) => Math.min(Number((z + 0.15).toFixed(2)), 1.8));
  const zoomOut = () => setZoom((z) => Math.max(Number((z - 0.15).toFixed(2)), 0.5));
  const resetView = () => {
    setPositions(initialPositions);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Calcular las coordenadas exactas de los handles para trazar las curvas bezier
  const calculateHandleCoords = (tableName: string, fieldName: string, isSource: boolean) => {
    const pos = positions[tableName] || { x: 0, y: 0 };
    const tbl = tables.find((t) => t.name === tableName);
    if (!tbl) return { x: pos.x, y: pos.y };

    const fieldIndex = tbl.fields.findIndex((f) => f.name === fieldName);
    const HEADER_HEIGHT = 42;
    const ROW_HEIGHT = 28;
    const NODE_WIDTH = 260;

    const yOffset = HEADER_HEIGHT + (fieldIndex >= 0 ? fieldIndex : 0) * ROW_HEIGHT + ROW_HEIGHT / 2;
    const xOffset = isSource ? 0 : NODE_WIDTH; // Origen (izquierda) / Destino (derecha)

    return {
      x: pos.x + xOffset,
      y: pos.y + yOffset,
    };
  };

  return (
    <div
      className="react-flow-db-wrapper border-[3px] border-[#003366] rounded-2xl overflow-hidden shadow-[5px_5px_0px_#003366] bg-white my-3 select-none"
      ref={containerRef}
    >
      {/* BARRA SUPERIOR REACT FLOW / DATA MODELER */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#002b59] to-[#004080] text-white px-4 py-2.5 border-b-2 border-[#003366] flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/30 text-xs">
            ⚡
          </span>
          <span className="font-sans font-black text-xs sm:text-sm tracking-wide">
            {title ? `${title} · Esquema Relacional` : `React Flow — Schema Canvas (${tables.length} Tablas)`}
          </span>
          <span className="text-[0.65rem] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full">
            ● Interactivo (Arrastra las tablas)
          </span>
        </div>

        {/* CONTROLES FLOTANTES DE NAVEGACIÓN Y ZOOM */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/15">
          <button
            type="button"
            onClick={zoomIn}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
            title="Aumentar Zoom"
          >
            +
          </button>
          <span className="text-[0.7rem] font-mono px-1 font-bold">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={zoomOut}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
            title="Disminuir Zoom"
          >
            −
          </button>
          <button
            type="button"
            onClick={resetView}
            className="px-2 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer transition-colors"
            title="Restablecer Posición"
          >
            ⟲ Reset
          </button>
        </div>
      </div>

      {/* CANVAS INTERACTIVO */}
      <div
        className="flow-canvas relative w-full h-[520px] overflow-hidden cursor-grab active:cursor-grabbing bg-[#fafcff]"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        onMouseDown={handleMouseDownCanvas}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flow-viewport absolute top-0 left-0 w-full h-full origin-top-left transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* SVG LAYER: EDGES Y CURVAS BEZIER DE RELACIÓN */}
          <svg className="absolute top-0 left-0 w-[4000px] h-[4000px] pointer-events-none z-10">
            <defs>
              <marker
                id={`arrow-head-${challengeId}`}
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
                id={`arrow-head-hover-${challengeId}`}
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

            {edges.map((edge) => {
              const src = calculateHandleCoords(edge.sourceTable, edge.sourceField, true);
              const tgt = calculateHandleCoords(edge.targetTable, edge.targetField, false);

              // Curva Bezier Suave estilo React Flow
              const dx = Math.abs(tgt.x - src.x) * 0.55;
              const pathData = `M ${src.x} ${src.y} C ${src.x - dx} ${src.y}, ${tgt.x + dx} ${tgt.y}, ${tgt.x} ${tgt.y}`;

              const midX = (src.x + tgt.x) / 2;
              const midY = (src.y + tgt.y) / 2;
              const isHovered = hoveredEdge === edge.id;

              return (
                <g
                  key={edge.id}
                  className="edge-group cursor-pointer pointer-events-auto"
                  onMouseEnter={() => setHoveredEdge(edge.id)}
                  onMouseLeave={() => setHoveredEdge(null)}
                >
                  {/* Línea gruesa invisible para facilitar el hover */}
                  <path d={pathData} fill="none" stroke="transparent" strokeWidth="18" />

                  {/* Línea visible con curva Bezier */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isHovered ? '#10b981' : '#2563eb'}
                    strokeWidth={isHovered ? '3.5' : '2.5'}
                    strokeDasharray={edge.type === '1:1' ? '6 4' : undefined}
                    markerEnd={`url(#${isHovered ? `arrow-head-hover-${challengeId}` : `arrow-head-${challengeId}`})`}
                    className="transition-all duration-150"
                  />

                  {/* Badge de Cardinalidad en el centro de la relación */}
                  <foreignObject
                    x={midX - 26}
                    y={midY - 12}
                    width="52"
                    height="24"
                    className="overflow-visible"
                  >
                    <div
                      className={`text-[0.62rem] font-mono font-black px-1.5 py-0.5 rounded-md border text-center shadow-sm flex items-center justify-center ${
                        isHovered
                          ? 'bg-emerald-500 text-white border-emerald-600 scale-110'
                          : 'bg-white text-blue-900 border-blue-400'
                      } transition-all duration-150`}
                    >
                      {edge.type}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* DATABASE SCHEMA NODES (TABLAS) */}
          {tables.map((tbl) => {
            const pos = positions[tbl.name] || { x: 40, y: 40 };
            const pkCount = tbl.fields.filter((f) => f.pk).length;
            const isJunction = pkCount > 1;

            return (
              <div
                key={tbl.name}
                id={`node-${tbl.name}`}
                className="database-schema-node absolute w-[260px] bg-[#ffffd8] rounded-xl border-2 border-[#003366] shadow-[4px_4px_0px_rgba(0,51,102,0.35)] transition-shadow hover:shadow-[6px_6px_0px_#003366] z-20 overflow-hidden"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                }}
              >
                {/* HEADER DEL NODO */}
                <div
                  className={`node-header px-3 py-2 flex items-center justify-between cursor-move border-b-2 ${
                    isJunction
                      ? 'bg-[#ea580c] text-white border-[#9a3412]'
                      : 'bg-[#003366] text-white border-[#002244]'
                  }`}
                  onMouseDown={(e) => handleMouseDownNode(e, tbl.name)}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-xs">🗄️</span>
                    <span className="font-mono font-bold text-xs truncate" title={tbl.name}>
                      {tbl.name}
                    </span>
                  </div>
                  <span className="text-[0.65rem] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">
                    {tbl.fields.length} cols
                  </span>
                </div>

                {/* FILAS DE CAMPOS Y HANDLES REACT FLOW */}
                <div className="node-body py-1 flex flex-col font-mono text-xs">
                  {tbl.fields.map((fld) => {
                    const isPk = fld.pk;
                    const isFk = !!fld.fk;
                    const isNotNull = fld.notNull || isPk;

                    let prefix = isPk && isFk ? 'PF' : isPk ? 'PK' : isFk ? 'FK' : '';

                    return (
                      <div
                        key={fld.name}
                        className={`field-row relative flex items-center justify-between px-3 py-1 text-[0.72rem] leading-tight border-b border-black/5 hover:bg-blue-100/60 transition-colors ${
                          isPk ? 'bg-amber-100/60 font-bold' : isFk ? 'bg-blue-50/70 font-semibold' : ''
                        }`}
                      >
                        {/* HANDLE IZQUIERDO (Incoming Connection Port) */}
                        <div
                          className={`handle-left absolute -left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#003366] ${
                            isFk ? 'bg-blue-500' : isPk ? 'bg-amber-400' : 'bg-slate-300'
                          }`}
                          title={`Conexión ${fld.name}`}
                        />

                        {/* NOMBRE Y TAG DE CLAVE */}
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
                          <span className="truncate text-[#0f172a]" title={fld.name}>
                            {fld.name}
                          </span>
                        </div>

                        {/* TIPO DE DATO (VERDE REACT FLOW DATABASE SCHEMA) */}
                        <div className="text-right shrink-0">
                          <span className="text-[0.68rem] font-bold text-[#15803d]">
                            {fld.type}
                          </span>
                        </div>

                        {/* HANDLE DERECHO (Outgoing Connection Port) */}
                        <div
                          className={`handle-right absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#003366] ${
                            isPk ? 'bg-amber-400' : isFk ? 'bg-blue-500' : 'bg-slate-300'
                          }`}
                          title={`Conexión ${fld.name}`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* PIE DE TABLA (Constraints) */}
                <div className="node-footer bg-black/5 px-2.5 py-1 border-t border-[#003366]/20 flex flex-col gap-0.5 text-[0.62rem] font-mono text-slate-700">
                  {pkCount > 0 && (
                    <div className="flex items-center gap-1 text-amber-900 font-bold truncate">
                      <span>🗝️</span>
                      <span>{tbl.name}_PK</span>
                    </div>
                  )}
                  {tbl.fields
                    .filter((f) => f.fk)
                    .map((f) => (
                      <div
                        key={f.name}
                        className="flex items-center gap-1 text-blue-900 font-bold truncate"
                      >
                        <span>🔗</span>
                        <span>{tbl.name}_{f.fk?.split('.')[0]}_FK</span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER INFORMATIVO */}
      <div className="bg-[#f1f5f9] px-4 py-2 border-t-2 border-[#003366] flex items-center justify-between text-xs font-sans text-slate-600 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-black/20" /> <strong>PK:</strong> Primary Key
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-black/20" /> <strong>FK:</strong> Foreign Key
          </span>
          <span className="flex items-center gap-1">
            <span className="text-red-600 font-black">*</span> <strong>NOT NULL</strong>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#15803d] font-bold">Tipo:</span> Verde DataModeler
          </span>
        </div>
        <span className="text-[0.7rem] font-mono text-slate-500">
          💡 Puedes arrastrar las tablas libremente o hacer zoom en el canvas.
        </span>
      </div>
    </div>
  );
}
