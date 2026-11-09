import { useState } from 'react';
import type {
  BrandPreset,
  CourseLession,
  CourseSeccion,
} from '../../../data/courses/courseJsonTypes';

export interface WidgetSidebarIndiceProps {
  sidebarOpen: boolean;
  isEditMode?: boolean;
  brand: BrandPreset;
  institutionName: string;
  moduleTitle: string;
  lessions: CourseLession[];
  activeContentId: string;
  completedContents: string[];
  onSelectContent: (widgetId: string) => void;
  onToggleSectionComplete: (section: CourseSeccion) => void;
}

export function WidgetSidebarIndice({
  sidebarOpen,
  isEditMode = false,
  brand,
  institutionName,
  moduleTitle,
  lessions,
  activeContentId,
  completedContents,
  onSelectContent,
  onToggleSectionComplete,
}: WidgetSidebarIndiceProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedLessions, setCollapsedLessions] = useState<Record<string, boolean>>({});

  const contents = lessions.flatMap((lession) =>
    lession.secciones.flatMap((section) => section.contenidos)
  );
  const completedCount = contents.filter((content) => completedContents.includes(content.id)).length;
  const progressPct = contents.length ? Math.round((completedCount / contents.length) * 100) : 0;
  const query = searchTerm.trim().toLocaleLowerCase('es');

  const toggleLession = (lessionId: string) => {
    setCollapsedLessions((previous) => ({
      ...previous,
      [lessionId]: !previous[lessionId],
    }));
  };

  return (
    <aside
      id="sidebar-index"
      inert={!sidebarOpen}
      style={{
        width: sidebarOpen ? '292px' : '0px',
        minWidth: sidebarOpen ? '292px' : '0px',
        maxWidth: sidebarOpen ? '292px' : '0px',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: sidebarOpen ? '1px solid #E2E8F0' : 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.25s ease, min-width 0.25s ease, max-width 0.25s ease',
        flexShrink: 0,
        zIndex: 30,
        outline: isEditMode && sidebarOpen ? '2px dashed #F59E0B' : 'none',
        outlineOffset: '-2px',
      }}
    >
      {isEditMode && (
        <div
          style={{
            backgroundColor: '#0F172A',
            color: '#FDE047',
            fontSize: '10px',
            fontWeight: 900,
            fontFamily: '"JetBrains Mono", Consolas, monospace',
            padding: '5px 12px',
            borderBottom: '1px dashed #F59E0B',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>✏️ SidebarIndice (Lession › Seccion › Contenidos)</span>
          <span style={{ color: '#38BDF8' }}>#sidebar-index</span>
        </div>
      )}

      {/* CABECERA ROJA / CORPORATIVA DEL SIDEBAR */}
      <div
        style={{
          backgroundColor: brand.primary,
          color: '#FFFFFF',
          padding: '22px 20px 18px 20px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(0,0,0,0.2)',
              padding: '3px 8px',
              borderRadius: '4px',
            }}
          >
            {institutionName}
          </span>
          <button
            type="button"
            onClick={() => {
              if (showSearch) setSearchTerm('');
              setShowSearch(!showSearch);
            }}
            aria-expanded={showSearch}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px',
            }}
            title="Buscar en Lession, Seccion o Contenidos"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
          Módulo
        </p>
        <h1
          style={{
            fontSize: '19px',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 18px 0',
            color: '#FFFFFF',
          }}
        >
          {moduleTitle}
        </h1>

        {showSearch && (
          <div style={{ marginBottom: '14px' }}>
            <input
              type="search"
              aria-label="Buscar en el módulo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar Lession, Sección o Contenido..."
              style={{
                width: '100%',
                padding: '6px 10px',
                borderRadius: '4px',
                border: 'none',
                fontSize: '12px',
                color: '#1E293B',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          <span>{progressPct}% COMPLETADO</span>
          <span>
            {completedCount}/{contents.length}
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPct}%`,
              height: '100%',
              backgroundColor: '#FFFFFF',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* Índice del módulo */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
        }}
      >
        {lessions.map((lessionObj) => {
          const lessionMatches = lessionObj.title.toLocaleLowerCase('es').includes(query);
          const sections = lessionObj.secciones.flatMap((section) => {
            const titleMatches = lessionMatches || section.title.toLocaleLowerCase('es').includes(query);
            const target = titleMatches ? section.contenidos[0] : section.contenidos.find((content) =>
              content.title.toLocaleLowerCase('es').includes(query)
            );
            return titleMatches || target ? [{ section, target }] : [];
          });

          if (query && sections.length === 0 && !lessionMatches) return null;
          const isLessionCollapsed = Boolean(collapsedLessions[lessionObj.id]) && !query;

          return (
            <div key={lessionObj.id}>
              {/* NIVEL 1: LESSION */}
              <button
                type="button"
                onClick={() => toggleLession(lessionObj.id)}
                aria-expanded={!isLessionCollapsed}
                style={{
                  width: '100%',
                  padding: '13px 16px 11px 16px',
                  border: 'none',
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: '#F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                title="Nivel 1: Lession (clic para desplegar/contraer)"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: '8.5px',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      color: brand.primary,
                      textTransform: 'uppercase',
                    }}
                  >
                    LESSION
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      letterSpacing: '0.03em',
                      color: '#0F172A',
                      textTransform: 'uppercase',
                      lineHeight: 1.3,
                    }}
                  >
                    {lessionObj.title.replace(/^LESSION\s+\d+\s*:\s*/i, '')}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#475569',
                    fontWeight: 800,
                    transform: isLessionCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  ⌄
                </span>
              </button>

              {!isLessionCollapsed && sections.map(({ section, target }) => {
                const isActive = section.contenidos.some((content) => content.id === activeContentId);
                const isCompleted = section.contenidos.length > 0 &&
                  section.contenidos.every((content) => completedContents.includes(content.id));

                return (
                  <div
                    key={section.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px 8px 18px',
                      borderBottom: '1px solid #E2E8F0',
                      borderLeft: `3px solid ${isActive ? brand.primary : '#CBD5E1'}`,
                      backgroundColor: isActive ? brand.primaryLight : '#F8FAFC',
                    }}
                  >
                    <button
                      type="button"
                      disabled={!target}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={() => target && onSelectContent(target.widget.id)}
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        padding: '2px 0',
                        cursor: target ? 'pointer' : 'default',
                        color: '#334155',
                        fontSize: '12px',
                        fontWeight: isActive ? 800 : 700,
                      }}
                    >
                      {section.title}
                    </button>
                    {section.contenidos.length > 0 && (
                      <button
                        type="button"
                        aria-label={`Completar sección ${section.title}`}
                        aria-pressed={isCompleted}
                        onClick={() => onToggleSectionComplete(section)}
                        style={{
                          width: '20px',
                          height: '20px',
                          flexShrink: 0,
                          borderRadius: '50%',
                          border: `1px solid ${isCompleted ? brand.primary : '#94A3B8'}`,
                          backgroundColor: isCompleted ? brand.primary : '#FFFFFF',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                        }}
                      >
                        {isCompleted ? '✓' : ''}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
