import { useState } from 'react';
import type {
  BrandPreset,
  ArchitectureHotspotsBlockData,
} from '../../../data/courses/courseJsonTypes';

export interface WidgetArchitectureHotspotsProps {
  data: ArchitectureHotspotsBlockData;
  brand: BrandPreset;
}

export function WidgetArchitectureHotspots({
  data,
  brand,
}: WidgetArchitectureHotspotsProps) {
  const layers = data.layers || [];
  const [activeHotspot, setActiveHotspot] = useState(layers[0]?.id || '');
  const currentHotspotObj = layers.find((h) => h.id === activeHotspot) || layers[0];

  if (!currentHotspotObj) return null;

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: brand.primary,
            textTransform: 'uppercase',
          }}
        >
          {data.badge}
        </span>
        <h3
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#0F172A',
            margin: '6px 0 0 0',
          }}
        >
          {data.title}
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {layers.map((layer) => {
            const isSelected = layer.id === currentHotspotObj.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveHotspot(layer.id)}
                style={{
                  textAlign: 'left',
                  padding: '18px 20px',
                  borderRadius: '8px',
                  border: isSelected ? `2px solid ${brand.primary}` : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#FFFFFF' : '#F8FAFC',
                  boxShadow: isSelected ? '0 10px 25px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? brand.primary : '#E2E8F0',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {layer.number}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '2px',
                    }}
                  >
                    {layer.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                    {layer.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '32px',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.18)',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: brand.primary,
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            CAPA {currentHotspotObj.number} SELECCIONADA
          </span>
          <h4 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 18px 0' }}>
            {currentHotspotObj.name}
          </h4>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#FCA5A5',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Amenaza Principal
            </div>
            <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#E2E8F0', margin: 0 }}>
              {currentHotspotObj.threat}
            </p>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#6EE7B7',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Control Técnico Aplicado
            </div>
            <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#E2E8F0', margin: 0 }}>
              {currentHotspotObj.control}
            </p>
          </div>

          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '6px',
              fontSize: '12.5px',
              fontWeight: 700,
              color: '#F8FAFC',
            }}
          >
            📊 Indicador: {currentHotspotObj.metric}
          </div>
        </div>
      </div>
    </div>
  );
}

