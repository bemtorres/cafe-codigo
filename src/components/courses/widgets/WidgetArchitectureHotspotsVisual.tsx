import { useState } from 'react';
import type {
  BrandPreset,
  ArchitectureHotspotsVisualBlockData,
} from '../../../data/courses/courseJsonTypes';
import { ZoomableFigure } from './ZoomableFigure';

export interface WidgetArchitectureHotspotsVisualProps {
  data: ArchitectureHotspotsVisualBlockData;
  brand: BrandPreset;
}

export function WidgetArchitectureHotspotsVisual({
  data,
  brand,
}: WidgetArchitectureHotspotsVisualProps) {
  const layers = data.layers || [];
  const [activeHotspot, setActiveHotspot] = useState(layers[0]?.id || '');
  const currentHotspotObj = layers.find((h) => h.id === activeHotspot) || layers[0];

  if (!currentHotspotObj) return null;

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '72px 24px' }}>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '26px',
          alignItems: 'stretch',
        }}
      >
        {/* COLUMNA IZQUIERDA: Tarjetas selectoras con miniatura de imagen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {layers.map((layer) => {
            const isSelected = layer.id === currentHotspotObj.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveHotspot(layer.id)}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: isSelected ? `2.5px solid ${brand.primary}` : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#FFFFFF' : '#F8FAFC',
                  boxShadow: isSelected ? '0 12px 28px rgba(15, 23, 42, 0.08)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '88px',
                    height: '66px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: isSelected ? `2px solid ${brand.primary}` : '1px solid #CBD5E1',
                    backgroundColor: '#0F172A',
                  }}
                >
                  <img
                    src={layer.leftThumbnailUrl}
                    alt={layer.leftThumbnailAlt || layer.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: isSelected ? brand.primary : 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 900,
                      lineHeight: 1.2,
                    }}
                  >
                    {layer.number}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#0F172A',
                      marginBottom: '3px',
                    }}
                  >
                    {layer.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#64748B',
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    {layer.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* COLUMNA DERECHA: Panel de detalle con Imagen ampliable (Lupa + Lightbox + APA) + Controles */}
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '26px',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '10px',
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
                }}
              >
                CAPA {currentHotspotObj.number} SELECCIONADA
              </span>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>
                {currentHotspotObj.subtitle}
              </span>
            </div>

            <h4 style={{ fontSize: '21px', fontWeight: 800, margin: '0 0 14px 0' }}>
              {currentHotspotObj.name}
            </h4>

            <div style={{ marginBottom: '18px' }}>
              <ZoomableFigure
                title={`Capa ${currentHotspotObj.number} · ${currentHotspotObj.name}`}
                caption={currentHotspotObj.rightImageCaption || currentHotspotObj.control}
                apaCitation={currentHotspotObj.apaCitation}
                brandColor={brand.primary}
                maxWidth="100%"
                zoomImage={{ src: currentHotspotObj.rightImageUrl, alt: currentHotspotObj.name }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '185px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #334155',
                    backgroundColor: '#1E293B',
                  }}
                >
                  <img
                    src={currentHotspotObj.rightImageUrl}
                    alt={currentHotspotObj.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {currentHotspotObj.rightImageCaption && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '8px 46px 8px 12px',
                        background:
                          'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.88) 100%)',
                        color: '#F8FAFC',
                        fontSize: '11.5px',
                        fontWeight: 700,
                      }}
                    >
                      {currentHotspotObj.rightImageCaption}
                    </div>
                  )}
                </div>
              </ZoomableFigure>
            </div>

            <div style={{ marginBottom: '14px' }}>
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
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#E2E8F0', margin: 0 }}>
                {currentHotspotObj.threat}
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
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
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#E2E8F0', margin: 0 }}>
                {currentHotspotObj.control}
              </p>
            </div>
          </div>

          <div
            style={{
              padding: '11px 14px',
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

