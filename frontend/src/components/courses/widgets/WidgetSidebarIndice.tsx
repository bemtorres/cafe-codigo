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
  activePageId?: string;
  onSelectPage?: (pageId: string) => void;
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
  activePageId,
  onSelectPage,
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
          padding: '20px 18px 16px 18px',
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
              backgroundColor: 'rgba(0,0,0,0.22)',
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Buscar en Lession, Seccion o Contenidos"
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <h1
          style={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 16px 0',
            color: '#FFFFFF',
          }}
        >
          {moduleTitle}
        </h1>

        {showSearch && (
          <div style={{ marginBottom: '12px' }}>
            <input
              type="search"
              aria-label="Buscar en el módulo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar Sección o Contenido..."
              style={{
                width: '100%',
                padding: '7px 10px',
                borderRadius: '5px',
                border: 'none',
                fontSize: '12px',
                color: '#1E293B',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
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
            marginBottom: '7px',
          }}
        >
          <span>{progressPct}% COMPLETA</span>
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

      {/* Índice del módulo (Lession -> Seccion -> Contenidos) */}
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

          if (sections.length === 0) return null;
          const isLessionCollapsed = Boolean(collapsedLessions[lessionObj.id]) && !query;

          return (
            <div key={lessionObj.id}>
              {/* NIVEL 1: LESSION (Acordeón de grupo) */}
              <button
                type="button"
                onClick={() => toggleLession(lessionObj.id)}
                aria-expanded={!isLessionCollapsed}
                style={{
                  width: '100%',
                  padding: '13px 18px 12px 18px',
                  border: 'none',
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                title="Lession (clic para desplegar/contraer)"
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    color: '#0F172A',
                    textTransform: 'uppercase',
                    lineHeight: 1.3,
                  }}
                >
                  {lessionObj.title}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#64748B',
                    fontWeight: 800,
                    transform: isLessionCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  ⌄
                </span>
              </button>

              {/* NIVEL 2: SECCIONES */}
              {!isLessionCollapsed && sections.map(({ section, target }) => {
                const isPage = Boolean(section.pageBreak && onSelectPage);
                const isActive = (isPage && activePageId === section.id) ||
                  section.contenidos.some((content) => content.id === activeContentId);
                const isCompleted = section.contenidos.length > 0 &&
                  section.contenidos.every((content) => completedContents.includes(content.id));
                const select = isPage && (!query || !target) ? () => onSelectPage?.(section.id)
                  : target ? () => onSelectContent(target.widget.id) : undefined;

                return (
                  <div
                    key={section.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px 12px 16px',
                      borderBottom: '1px solid #F1F5F9',
                      borderLeft: isActive ? `4px solid ${brand.primary}` : '4px solid transparent',
                      backgroundColor: '#FFFFFF',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    {/* Ícono de 3 líneas horizontales (≡) */}
                    <svg
                      width="13"
                      height="11"
                      viewBox="0 0 16 12"
                      fill="none"
                      style={{ flexShrink: 0, marginTop: '1px' }}
                      aria-hidden="true"
                    >
                      <line x1="0" y1="2" x2="16" y2="2" stroke="#64748B" strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="0" y1="6" x2="16" y2="6" stroke="#64748B" strokeWidth="1.75" strokeLinecap="round" />
                      <line x1="0" y1="10" x2="16" y2="10" stroke="#64748B" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>

                    {/* Título de la Sección */}
                    <button type="button" disabled={!select} onClick={select}
                      aria-current={isActive ? 'location' : undefined}
                      style={{
                        flex: 1,
                        textAlign: 'left',
                        color: '#0F172A',
                        fontSize: '13px',
                        lineHeight: 1.35,
                        fontWeight: isActive ? 800 : 600,
                        overflowWrap: 'anywhere',
                        cursor: select ? 'pointer' : 'default',
                      }}
                    >
                      {section.title}
                    </button>

                    {/* Indicador de Completado: Círculo Rojo con Check si está listo, o Círculo vacío si falta */}
                    {section.contenidos.length > 0 && (
                      <button
                        type="button"
                        aria-label={`Completar sección ${section.title}`}
                        aria-pressed={isCompleted}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSectionComplete(section);
                        }}
                        style={{
                          width: '20px',
                          height: '20px',
                          flexShrink: 0,
                          borderRadius: '50%',
                          border: isCompleted ? 'none' : '1.75px solid #CBD5E1',
                          backgroundColor: isCompleted ? brand.primary : '#FFFFFF',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isCompleted && (
                          <svg width="11" height="9" viewBox="0 0 12 10" fill="none">
                            <path
                              d="M1.5 5.2L4.5 8.2L10.5 1.8"
                              stroke="#FFFFFF"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
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
