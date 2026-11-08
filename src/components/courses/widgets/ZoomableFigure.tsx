import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface ZoomableFigureProps {
  title?: string;
  caption?: string;
  apaCitation?: string;
  brandColor?: string;
  maxWidth?: string;
  clickIconOnly?: boolean;
  children: ReactNode;
}

export function ApaReferenceFooter({
  citation,
  dark = false,
}: {
  citation?: string;
  dark?: boolean;
}) {
  if (!citation) return null;
  return (
    <div
      style={{
        marginTop: '6px',
        padding: '6px 10px',
        borderRadius: '4px',
        backgroundColor: dark ? 'rgba(15, 23, 42, 0.7)' : '#F8FAFC',
        borderLeft: `3px solid ${dark ? '#94A3B8' : '#CBD5E1'}`,
        fontSize: '11px',
        lineHeight: 1.45,
        color: dark ? '#CBD5E1' : '#64748B',
        fontStyle: 'italic',
        textAlign: 'left',
      }}
    >
      <strong style={{ fontStyle: 'normal', fontWeight: 700, color: dark ? '#E2E8F0' : '#475569' }}>
        Fuente:{' '}
      </strong>
      {citation}
    </div>
  );
}

export function ZoomableFigure({
  title,
  caption,
  apaCitation,
  brandColor = '#E31B23',
  maxWidth = '540px',
  clickIconOnly = false,
  children,
}: ZoomableFigureProps) {
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth,
        margin: '0 auto',
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          if (clickIconOnly) return;
          e.stopPropagation();
          setIsOpen(true);
        }}
        role={clickIconOnly ? undefined : 'button'}
        tabIndex={clickIconOnly ? undefined : 0}
        onKeyDown={(e) => {
          if (clickIconOnly) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }
        }}
        title={clickIconOnly ? undefined : 'Haz clic para ampliar la imagen'}
        style={{
          position: 'relative',
          width: '100%',
          cursor: clickIconOnly ? 'pointer' : 'zoom-in',
          borderRadius: '6px',
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: hovered ? 'scale(1.01)' : 'scale(1)',
          boxShadow: hovered ? '0 12px 28px rgba(15, 23, 42, 0.14)' : 'none',
        }}
      >
        {children}

        {/* Capa sutil + Icono de Lupa al pasar el mouse encima */}
        {/* {!clickIconOnly && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: hovered ? 'rgba(15, 23, 42, 0.22)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(15, 23, 42, 0.88)',
                color: '#FFFFFF',
                border: `1.5px solid ${brandColor}`,
                fontSize: '12px',
                fontWeight: 800,
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1)' : 'scale(0.85)',
                transition: 'opacity 0.18s ease, transform 0.18s ease',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.4}
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0zM11 8v6m-3-3h6"
                />
              </svg>
              <span>Ampliar imagen</span>
            </div>
          </div>
        )} */}

        {/* Botón de lupa en la esquina inferior derecha */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          title="Ampliar imagen (Zoom)"
          style={{
            position: 'absolute',
            right: '10px',
            bottom: '10px',
            width: hovered ? 'auto' : '32px',
            height: '32px',
            padding: hovered ? '0 10px' : '0',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.35)',
            backgroundColor: hovered ? brandColor : 'rgba(15, 23, 42, 0.78)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.28)',
            transition: 'all 0.2s ease',
            cursor: 'zoom-in',
            fontSize: '11px',
            fontWeight: 800,
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0zM11 8v6m-3-3h6"
            />
          </svg>
          {hovered && <span>Zoom</span>}
        </button>
      </div>

      {apaCitation && (
        <div style={{ width: '100%' }}>
          <ApaReferenceFooter citation={apaCitation} />
        </div>
      )}

      {/* Modal Lightbox al hacer clic */}
      {isOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: 'rgba(15, 23, 42, 0.86)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '940px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.5)',
              border: '1px solid #334155',
              cursor: 'default',
            }}
          >
            {/* Barra superior del visor de imagen ampliada */}
            <div
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    backgroundColor: brandColor,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  🔍
                </span>
                <span style={{ fontSize: '14px', fontWeight: 800 }}>
                  {title || 'Vista Ampliada de Imagen'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid #475569',
                  backgroundColor: '#1E293B',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Lienzo ampliado */}
            <div
              style={{
                padding: '28px',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '100%', maxWidth: '860px' }}>{children}</div>
            </div>

            {(caption || apaCitation) && (
              <div
                style={{
                  padding: '14px 24px',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #E2E8F0',
                  fontSize: '13.5px',
                  color: '#334155',
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                {caption && <div>{caption}</div>}
                {apaCitation && (
                  <div style={{ marginTop: caption ? '8px' : '0' }}>
                    <ApaReferenceFooter citation={apaCitation} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
