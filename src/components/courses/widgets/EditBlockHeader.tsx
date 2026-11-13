import { useState } from 'react';
import type { WidgetBgMode } from '../../../data/courses/courseJsonTypes';

export interface EditBlockHeaderProps {
  show: boolean;
  componentName: string;
  blockId: string;
  blockType: string;
  summary: string;
  index: number;
  totalBlocks: number;
  bgMode?: WidgetBgMode;
  bgColor?: string;
  resolvedBgColor?: string;
  brandBgColor?: string;
  onChangeBg?: (bgMode: WidgetBgMode, bgColor?: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEditJson?: () => void;
  onEditProperties?: () => void;
}

const PRESET_COLOR_SWATCHES = [
  { hex: '#F4F5F7', label: 'Gris #F4F5F7' },
  { hex: '#FFFFFF', label: 'Blanco #FFFFFF' },
  { hex: '#EFF6FF', label: 'Azul hielo #EFF6FF' },
  { hex: '#F0FDF4', label: 'Verde menta #F0FDF4' },
  { hex: '#FFFBEB', label: 'Ámbar suave #FFFBEB' },
  { hex: '#FDF2F8', label: 'Rosa pastel #FDF2F8' },
  { hex: '#1E293B', label: 'Pizarra #1E293B' },
];

export function EditBlockHeader({
  show,
  componentName,
  blockId,
  blockType,
  summary,
  index,
  totalBlocks,
  bgMode = 'default',
  bgColor,
  resolvedBgColor = '#F4F5F7',
  brandBgColor = '#0D47A1',
  onChangeBg,
  onMoveUp,
  onMoveDown,
  onEditJson,
  onEditProperties,
}: EditBlockHeaderProps) {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${componentName} (#${blockId}) [type: "${blockType}"]`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        borderBottom: '2px dashed #F59E0B',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
        fontFamily: '"JetBrains Mono", Consolas, monospace',
        fontSize: '11.5px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span
          style={{
            backgroundColor: '#F59E0B',
            color: '#0F172A',
            fontWeight: 900,
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            letterSpacing: '0.05em',
          }}
        >
          ✏️ WIDGET #{index + 1}
        </span>

        <strong style={{ color: '#FDE047', fontSize: '12.5px' }}>{componentName}</strong>

        <span
          style={{
            backgroundColor: '#1E293B',
            color: '#38BDF8',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid #334155',
          }}
        >
          #{blockId}
        </span>

        <span
          style={{
            backgroundColor: '#1E293B',
            color: '#A7F3D0',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid #334155',
            fontSize: '10.5px',
          }}
        >
          type: &quot;{blockType}&quot;
        </span>

        <span style={{ color: '#94A3B8', fontFamily: 'system-ui, sans-serif' }}>{summary}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {/* Selector de Fondo del Widget (Por defecto #F4F5F7 / Color del Curso / Personalizado) */}
        {onChangeBg && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '3px 8px',
              marginRight: '4px',
            }}
          >
            <span style={{ fontSize: '10px', color: '#CBD5E1', fontWeight: 800 }}>🎨 Fondo:</span>

            {/* Opción 1: Por defecto (#F4F5F7 o Color Curso en ScenarioQuiz) */}
            <button
              type="button"
              onClick={() => onChangeBg('default', undefined)}
              title="Usar fondo por defecto (#F4F5F7 o Color del Curso en WidgetScenarioQuiz)"
              style={{
                backgroundColor: bgMode === 'default' ? '#38BDF8' : '#0F172A',
                color: bgMode === 'default' ? '#0F172A' : '#CBD5E1',
                border: '1px solid #475569',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Auto
            </button>

            {/* Opción 2: #F4F5F7 (Gris corporativo por defecto) */}
            <button
              type="button"
              onClick={() => onChangeBg('soft', '#F4F5F7')}
              title="Fondo gris suave (#F4F5F7)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: bgMode === 'soft' ? '#38BDF8' : '#0F172A',
                color: bgMode === 'soft' ? '#0F172A' : '#CBD5E1',
                border: '1px solid #475569',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '2px',
                  backgroundColor: '#F4F5F7',
                  border: '1px solid #64748B',
                  display: 'inline-block',
                }}
              />
              #F4F5F7
            </button>

            {/* Opción 3: Color del Curso (como WidgetScenarioQuiz) */}
            <button
              type="button"
              onClick={() => onChangeBg('brand', undefined)}
              title="Usar el color institucional del curso (como WidgetScenarioQuiz)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: bgMode === 'brand' ? '#38BDF8' : '#0F172A',
                color: bgMode === 'brand' ? '#0F172A' : '#CBD5E1',
                border: '1px solid #475569',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '2px',
                  backgroundColor: brandBgColor,
                  border: '1px solid rgba(255,255,255,0.6)',
                  display: 'inline-block',
                }}
              />
              Color Curso
            </button>

            {/* Opción 4: Blanco (#FFFFFF) */}
            <button
              type="button"
              onClick={() => onChangeBg('white', '#FFFFFF')}
              title="Fondo blanco puro (#FFFFFF)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: bgMode === 'white' ? '#38BDF8' : '#0F172A',
                color: bgMode === 'white' ? '#0F172A' : '#CBD5E1',
                border: '1px solid #475569',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '10px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '2px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #64748B',
                  display: 'inline-block',
                }}
              />
              Blanco
            </button>

            {/* Opción 5: Paleta rápida de muestras + Selector HEX libre */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginLeft: '2px' }}>
              {PRESET_COLOR_SWATCHES.slice(2).map((swatch) => {
                const isSelectedCustom =
                  bgMode === 'custom' &&
                  (bgColor || '').toUpperCase() === swatch.hex.toUpperCase();
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => onChangeBg('custom', swatch.hex)}
                    title={`Cambiar fondo a ${swatch.label}`}
                    style={{
                      width: '15px',
                      height: '15px',
                      borderRadius: '4px',
                      backgroundColor: swatch.hex,
                      border: isSelectedCustom ? '2px solid #FDE047' : '1px solid #64748B',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                );
              })}

              <label
                title="Elegir cualquier color personalizado para este widget"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: bgMode === 'custom' ? '#FDE047' : '#0F172A',
                  color: bgMode === 'custom' ? '#0F172A' : '#E2E8F0',
                  border: '1px solid #475569',
                  borderRadius: '4px',
                  padding: '1px 5px',
                  fontSize: '10px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="color"
                  value={
                    /^#[0-9A-Fa-f]{6}$/.test(bgColor || resolvedBgColor)
                      ? bgColor || resolvedBgColor
                      : '#F4F5F7'
                  }
                  onChange={(e) => onChangeBg('custom', e.target.value.toUpperCase())}
                  style={{
                    width: '13px',
                    height: '13px',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                />
                <span>{bgMode === 'custom' && bgColor ? bgColor : 'Color...'}</span>
              </label>
            </div>
          </div>
        )}

        {onMoveUp && (
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            title="Subir este bloque en el JSON del curso"
            style={{
              backgroundColor: '#1E293B',
              color: index === 0 ? '#475569' : '#E2E8F0',
              border: '1px solid #475569',
              borderRadius: '4px',
              padding: '3px 8px',
              fontSize: '10.5px',
              fontWeight: 800,
              cursor: index === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ↑
          </button>
        )}

        {onMoveDown && (
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalBlocks - 1}
            title="Bajar este bloque en el JSON del curso"
            style={{
              backgroundColor: '#1E293B',
              color: index === totalBlocks - 1 ? '#475569' : '#E2E8F0',
              border: '1px solid #475569',
              borderRadius: '4px',
              padding: '3px 8px',
              fontSize: '10.5px',
              fontWeight: 800,
              cursor: index === totalBlocks - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ↓
          </button>
        )}

        {onEditProperties && (
          <button type="button" onClick={onEditProperties}
            className="rounded border border-sky-300 px-2 py-1 font-bold text-sky-200 hover:bg-slate-700">
            Editar propiedades
          </button>
        )}
        {onEditJson && (
          <button
            type="button"
            onClick={onEditJson}
            style={{
              backgroundColor: '#F59E0B',
              color: '#0F172A',
              border: 'none',
              borderRadius: '4px',
              padding: '3px 10px',
              fontSize: '10.5px',
              fontWeight: 900,
              cursor: 'pointer',
            }}
          >
            {'{ }'} Editar JSON
          </button>
        )}

        <button
          type="button"
          onClick={handleCopy}
          style={{
            backgroundColor: copied ? '#10B981' : '#1E293B',
            color: '#FFFFFF',
            border: '1px solid #475569',
            borderRadius: '4px',
            padding: '3px 10px',
            fontSize: '10.5px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          {copied ? '✓ Copiado' : 'Copiar ID'}
        </button>
      </div>
    </div>
  );
}
