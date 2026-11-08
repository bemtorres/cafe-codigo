import { useState } from 'react';
import type {
  BrandPreset,
  HeroBannerBlockData,
  ImageCoverBannerBlockData,
  VideoEditorialBlockData,
  CodeWalkthroughBlockData,
  SlideCardsBlockData,
  AccordionBlockData,
  CodeComparisonBlockData,
  ArchitectureHotspotsBlockData,
  ArchitectureHotspotsVisualBlockData,
  FlipCards3DBlockData,
  StepToStepBlockData,
  ChecklistBlockData,
  PipelineChecklistBlockData,
  ScenarioQuizBlockData,
  FinalReportBlockData,
  ScenarioQuestionItem,
} from '../../../data/courses/courseJsonTypes';
import { ZoomableFigure, ApaReferenceFooter } from './ZoomableFigure';

/* =========================================================
   ILUSTRACIÓN VECTORIAL PARA EL WIDGET DE SLIDES (PASO 1..4)
   ========================================================= */
export function SlideIllustration({
  type,
  brandColor,
}: {
  type: 'analyst' | 'shield' | 'server' | 'team';
  brandColor: string;
}) {
  if (type === 'analyst') {
    return (
      <svg
        viewBox="0 0 640 340"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          display: 'block',
          border: '2px solid #3b4262',
        }}
        role="img"
        aria-label="Ilustración de análisis del caso"
      >
        <defs>
          <linearGradient id="bgGradAnalyst" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8e2ef" />
            <stop offset="65%" stopColor="#b8c7dc" />
            <stop offset="100%" stopColor="#7589a8" />
          </linearGradient>
        </defs>
        <rect width="640" height="340" fill="url(#bgGradAnalyst)" />
        <polygon points="360,0 640,0 640,340 490,340" fill="#5e7294" opacity="0.45" />
        <path
          d="M200 340 L235 235 L415 245 L445 340 Z"
          fill="#626986"
          stroke="#2d3142"
          strokeWidth="3"
        />
        <path
          d="M275 235 L320 315 L365 238 Z"
          fill="#eef2f7"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
        <path
          d="M285 155 C285 105, 365 105, 365 155 C365 205, 345 235, 322 235 C298 235, 285 205, 285 155 Z"
          fill="#eab8b1"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
        <path
          d="M278 148 C272 105, 305 78, 348 86 C378 92, 386 122, 372 152 C366 126, 345 115, 315 118 C295 120, 286 132, 278 148 Z"
          fill="#f6e076"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
        <line x1="298" y1="145" x2="316" y2="143" stroke="#2d3142" strokeWidth="3" />
        <line x1="335" y1="142" x2="352" y2="146" stroke="#2d3142" strokeWidth="3" />
        <circle cx="308" cy="154" r="3" fill="#2d3142" />
        <circle cx="343" cy="154" r="3" fill="#2d3142" />
        <path d="M324 154 L319 176 L328 178" fill="none" stroke="#2d3142" strokeWidth="2.5" />
        <path
          d="M312 220 C315 198, 342 195, 348 212 C354 228, 345 262, 330 272 L298 255 Z"
          fill="#eab8b1"
          stroke="#2d3142"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  if (type === 'shield') {
    return (
      <svg
        viewBox="0 0 640 340"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          display: 'block',
          border: '2px solid #3b4262',
        }}
        role="img"
        aria-label="Ilustración de escudo de seguridad"
      >
        <rect width="640" height="340" fill="#dbe4f0" />
        <polygon points="0,340 640,120 640,340" fill="#9fb2cc" opacity="0.45" />
        <path
          d="M320 55 L430 98 L430 185 C430 250 320 295 320 295 C320 295 210 250 210 185 L210 98 Z"
          fill="#4a5578"
          stroke="#23293d"
          strokeWidth="4"
        />
        <path
          d="M320 78 L405 112 L405 180 C405 232 320 268 320 268 C320 268 235 232 235 180 L235 112 Z"
          fill={brandColor}
          opacity="0.9"
        />
        <path
          d="M285 172 L310 198 L362 145"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'team') {
    return (
      <svg
        viewBox="0 0 640 340"
        style={{
          width: '100%',
          maxWidth: '540px',
          height: 'auto',
          display: 'block',
          border: '2px solid #3b4262',
        }}
        role="img"
        aria-label="Ilustración de documentación en equipo"
      >
        <rect width="640" height="340" fill="#e2e8f0" />
        <rect
          x="110"
          y="50"
          width="420"
          height="240"
          rx="12"
          fill="#ffffff"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect x="145" y="82" width="160" height="20" rx="5" fill={brandColor} />
        <rect x="145" y="118" width="350" height="12" rx="4" fill="#cbd5e1" />
        <rect x="145" y="142" width="300" height="12" rx="4" fill="#cbd5e1" />
        <rect
          x="145"
          y="185"
          width="105"
          height="65"
          rx="8"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
        />
        <rect
          x="268"
          y="185"
          width="105"
          height="65"
          rx="8"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
        />
        <rect
          x="390"
          y="185"
          width="105"
          height="65"
          rx="8"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 640 340"
      style={{
        width: '100%',
        maxWidth: '540px',
        height: 'auto',
        display: 'block',
        border: '2px solid #3b4262',
      }}
      role="img"
      aria-label="Ilustración de revisión de código"
    >
      <rect width="640" height="340" fill="#d5dfed" />
      <rect
        x="120"
        y="50"
        width="400"
        height="240"
        rx="12"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="4"
      />
      <circle cx="148" cy="74" r="6" fill="#ef4444" />
      <circle cx="168" cy="74" r="6" fill="#f59e0b" />
      <circle cx="188" cy="74" r="6" fill="#10b981" />
      <rect x="150" y="110" width="180" height="14" rx="4" fill={brandColor} />
      <rect x="150" y="138" width="290" height="12" rx="4" fill="#64748b" />
      <rect x="150" y="162" width="240" height="12" rx="4" fill="#94a3b8" />
      <rect x="150" y="186" width="310" height="12" rx="4" fill="#64748b" />
      <rect x="150" y="220" width="130" height="32" rx="6" fill="#10b981" />
    </svg>
  );
}

/* =========================================================
   WIDGET 1: WidgetHeroBanner
   ========================================================= */
export function WidgetHeroBanner({
  data,
  brand,
  institutionName,
  totalLessons,
}: {
  data: HeroBannerBlockData;
  brand: BrandPreset;
  institutionName: string;
  totalLessons: number;
}) {
  return (
    <div>
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '36px 32px 0 32px' }}>
        <h2
          style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#2B3238',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          {data.title}
        </h2>
        <p
          style={{
            fontSize: '10.5px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: '#475569',
            textTransform: 'uppercase',
            margin: '0 0 36px 0',
          }}
        >
          {data.lessonSubtitle || `LECCIÓN 3 DE ${totalLessons} · CURSO INTERACTIVO COMPLETO`}
        </p>
      </div>

      <div
        style={{
          width: '100%',
          minHeight: '320px',
          backgroundImage: `linear-gradient(90deg, rgba(14,18,24,0.88) 0%, rgba(14,18,24,0.74) 55%, rgba(14,18,24,0.45) 100%), url("${data.bannerImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', padding: '48px 32px' }}>
          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#FFFFFF',
              marginBottom: '22px',
            }}
          />
          <h3
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              maxWidth: '540px',
              margin: '0 0 14px 0',
            }}
          >
            {data.bannerTitlePrefix} {institutionName}
          </h3>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#E2E8F0',
              maxWidth: '520px',
              margin: 0,
            }}
          >
            {data.bannerDescription}
          </p>
        </div>
      </div>

      {data.apaCitation && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8px 24px 0 24px' }}>
          <ApaReferenceFooter citation={data.apaCitation} />
        </div>
      )}

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px 12px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {data.kpis.map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderTop: `3px solid ${brand.primary}`,
                borderRadius: '4px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 900,
                  color: brand.primary,
                  marginBottom: '4px',
                }}
              >
                {item.stat}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#0F172A',
                  marginBottom: '6px',
                }}
              >
                {item.label}
              </div>
              <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#475569', margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 1.B: WidgetImageCoverBanner (Solo Banner de Imagen con Texto Superpuesto, sin zoom)
   ========================================================= */
export function WidgetImageCoverBanner({
  data,
  institutionName,
}: {
  data: ImageCoverBannerBlockData;
  brand?: BrandPreset;
  institutionName: string;
}) {
  const showInst = data.includeInstitutionName !== false;
  const fullHeading = showInst
    ? `${data.bannerTitlePrefix} ${institutionName}`.trim()
    : data.bannerTitlePrefix;

  return (
    <div>
      <div
        style={{
          width: '100%',
          minHeight: data.minHeight || '320px',
          backgroundImage: `linear-gradient(90deg, rgba(14,18,24,0.88) 0%, rgba(14,18,24,0.74) 55%, rgba(14,18,24,0.45) 100%), url("${data.bannerImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', padding: '48px 32px' }}>
          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#FFFFFF',
              marginBottom: '22px',
            }}
          />
          <h3
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              maxWidth: '540px',
              margin: '0 0 14px 0',
            }}
          >
            {fullHeading}
          </h3>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#E2E8F0',
              maxWidth: '520px',
              margin: 0,
            }}
          >
            {data.bannerDescription}
          </p>
        </div>
      </div>

      {data.apaCitation && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8px 24px 12px 24px' }}>
          <ApaReferenceFooter citation={data.apaCitation} />
        </div>
      )}
    </div>
  );
}

/* =========================================================
   WIDGET 2: WidgetVideoEditorial
   ========================================================= */
export function WidgetVideoEditorial({
  data,
  brand,
  institutionName,
}: {
  data: VideoEditorialBlockData;
  brand: BrandPreset;
  institutionName: string;
}) {
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 64px 24px' }}>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          padding: '22px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              width: '130px',
              height: '4px',
              backgroundColor: '#334155',
              marginBottom: '6px',
            }}
          >
            <div
              style={{
                width: '55%',
                marginLeft: 'auto',
                backgroundColor: brand.primary,
              }}
            />
          </div>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#262C30',
              color: '#FFFFFF',
              fontSize: '9px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '3px',
              letterSpacing: '0.05em',
            }}
          >
            {institutionName.toUpperCase()}
          </span>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#0F172A',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <iframe
            style={{ width: '100%', height: '100%', border: 0 }}
            src={data.videoUrl}
            title="Video del Curso"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <ApaReferenceFooter citation={data.apaCitation} />
      </div>

      <div style={{ textAlign: 'center', maxWidth: '620px', margin: '48px auto 0 auto' }}>
        <div
          style={{
            width: '52px',
            height: '2px',
            backgroundColor: brand.primary,
            margin: '0 auto 24px auto',
          }}
        />
        <p
          style={{
            fontSize: '23px',
            lineHeight: 1.5,
            color: '#374151',
            fontWeight: 400,
            margin: 0,
          }}
        >
          <strong style={{ color: brand.primary, fontWeight: 700 }}>{data.highlightLead}</strong>{' '}
          {data.statementRest} {institutionName}.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 3: WidgetCodeWalkthrough
   ========================================================= */
export function WidgetCodeWalkthrough({
  data,
  brand,
}: {
  data: CodeWalkthroughBlockData;
  brand: BrandPreset;
}) {
  const [activeCodeStep, setActiveCodeStep] = useState(0);
  const steps = data.steps || [];
  const currentCodeObj = steps[activeCodeStep] || steps[0];

  if (!currentCodeObj) return null;

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            backgroundColor: brand.primaryLight,
            color: brand.primary,
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          {data.sectionBadge}
        </span>
        <h3
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#1E293B',
            margin: 0,
          }}
        >
          {data.sectionTitle}
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {steps.map((st, idx) => {
                const isCurr = idx === activeCodeStep;
                return (
                  <button
                    key={st.stepNumber}
                    type="button"
                    onClick={() => setActiveCodeStep(idx)}
                    style={{
                      flex: 1,
                      padding: '8px 6px',
                      borderRadius: '6px',
                      border: isCurr ? `2px solid ${brand.primary}` : '1px solid #E2E8F0',
                      backgroundColor: isCurr ? brand.primary : '#F8FAFC',
                      color: isCurr ? '#FFFFFF' : '#475569',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    Paso {st.stepNumber}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: brand.primary,
                letterSpacing: '0.05em',
                marginBottom: '6px',
              }}
            >
              {currentCodeObj.badge}
            </div>

            <h4
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#0F172A',
                margin: '0 0 12px 0',
              }}
            >
              {currentCodeObj.title}
            </h4>

            <p
              style={{
                fontSize: '14.5px',
                lineHeight: 1.65,
                color: '#334155',
                margin: '0 0 18px 0',
              }}
            >
              {currentCodeObj.explanation}
            </p>

            <div
              style={{
                padding: '12px 14px',
                borderLeft: `4px solid ${brand.primary}`,
                backgroundColor: '#F8FAFC',
                borderRadius: '0 6px 6px 0',
                fontSize: '13px',
                color: '#1E293B',
                fontWeight: 600,
              }}
            >
              💡 <strong>Regla de oro:</strong> {currentCodeObj.keyTakeaway}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <button
              type="button"
              onClick={() =>
                setActiveCodeStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
              }
              style={{
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ← Paso anterior
            </button>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
              Líneas: {currentCodeObj.highlightLines.join(', ')}
            </span>
            <button
              type="button"
              onClick={() =>
                setActiveCodeStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
              }
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: brand.primary,
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Siguiente paso →
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#0F172A',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #1E293B',
            boxShadow: '0 14px 32px rgba(15, 23, 42, 0.22)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              backgroundColor: '#1E293B',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #334155',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#EF4444',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#F59E0B',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: '#10B981',
                }}
              />
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#E2E8F0',
                  fontFamily: 'monospace',
                }}
              >
                {currentCodeObj.fileName}
              </span>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                backgroundColor: brand.primary,
                color: '#FFFFFF',
              }}
            >
              PASO {currentCodeObj.stepNumber} ACTIVO
            </span>
          </div>

          <div
            style={{
              padding: '16px 0',
              fontFamily: '"JetBrains Mono", Consolas, monospace',
              fontSize: '12.5px',
              lineHeight: 1.7,
              overflowX: 'auto',
              flex: 1,
            }}
          >
            {currentCodeObj.codeLines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = currentCodeObj.highlightLines.includes(lineNumber);
              return (
                <div
                  key={lineNumber}
                  style={{
                    display: 'flex',
                    padding: '1px 16px',
                    backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.11)' : 'transparent',
                    borderLeft: isHighlighted
                      ? `4px solid ${brand.primary}`
                      : '4px solid transparent',
                    opacity: isHighlighted ? 1 : 0.45,
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      width: '28px',
                      userSelect: 'none',
                      color: isHighlighted ? '#FFFFFF' : '#64748B',
                      fontWeight: isHighlighted ? 800 : 400,
                      flexShrink: 0,
                    }}
                  >
                    {lineNumber}
                  </span>
                  <span
                    style={{
                      color: line.trim().startsWith('#')
                        ? '#38BDF8'
                        : isHighlighted
                          ? '#F8FAFC'
                          : '#CBD5E1',
                      whiteSpace: 'pre',
                    }}
                  >
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 4: WidgetSlideCards
   ========================================================= */
export function WidgetSlideCards({
  data,
  brand,
}: {
  data: SlideCardsBlockData;
  brand: BrandPreset;
}) {
  const cards = data.cards || [];
  const [currentSlide, setCurrentSlide] = useState(
    typeof data.initialSlideIndex === 'number' && data.initialSlideIndex < cards.length
      ? data.initialSlideIndex
      : 0
  );

  const activeCard = cards[currentSlide] || cards[0];
  if (!activeCard) return null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1))}
          aria-label="Anterior"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '999px',
            backgroundColor: '#0F1115',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '650px',
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            boxShadow: '0 14px 36px rgba(0, 0, 0, 0.08)',
            padding: '44px 48px 40px 48px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: brand.primary,
              color: '#FFFFFF',
              padding: '7px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            }}
          >
            {activeCard.step}
          </div>

          <h3
            style={{
              fontSize: '25px',
              fontWeight: 800,
              color: '#111827',
              margin: '0 0 24px 0',
            }}
          >
            {activeCard.title}
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '26px',
            }}
          >
            {activeCard.videoUrl ? (
              <div
                style={{
                  width: '100%',
                  maxWidth: '540px',
                  backgroundColor: '#0F172A',
                  borderRadius: '8px',
                  padding: '10px',
                  border: `2px solid ${brand.primary}`,
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.14)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    color: '#FFFFFF',
                    fontSize: '10.5px',
                    fontWeight: 800,
                  }}
                >
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: brand.primary,
                    }}
                  >
                    ▶ VIDEO EN SLIDE · {activeCard.step}
                  </span>
                  <span style={{ color: '#94A3B8' }}>Cápsula audiovisual del paso</span>
                </div>

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                  }}
                >
                  <iframe
                    style={{ width: '100%', height: '100%', border: 0 }}
                    src={activeCard.videoUrl}
                    title={`Video de ${activeCard.step}: ${activeCard.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {activeCard.videoCaption && (
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '11.5px',
                      color: '#CBD5E1',
                      textAlign: 'center',
                    }}
                  >
                    {activeCard.videoCaption}
                  </div>
                )}

                <ApaReferenceFooter citation={activeCard.apaCitation} dark />
              </div>
            ) : (
              <ZoomableFigure
                title={`${activeCard.step} · ${activeCard.title}`}
                caption={`${activeCard.bodyBefore}${activeCard.highlight} ${activeCard.bodyAfter}`}
                apaCitation={activeCard.apaCitation}
                brandColor={brand.primary}
                maxWidth="460px"
              >
                <SlideIllustration type={activeCard.illustration} brandColor={brand.primary} />
              </ZoomableFigure>
            )}
          </div>

          <p
            style={{
              textAlign: 'center',
              fontSize: '15.5px',
              lineHeight: 1.6,
              color: '#1F2937',
              margin: '0 auto',
              maxWidth: '520px',
            }}
          >
            {activeCard.bodyBefore}
            <strong style={{ color: brand.primary, fontWeight: 700 }}>{activeCard.highlight}</strong>{' '}
            {activeCard.bodyAfter}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1))}
          aria-label="Siguiente"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '999px',
            backgroundColor: '#0F1115',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
          }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          marginTop: '28px',
        }}
      >
        <span style={{ fontSize: '13px', color: '#4B5563', fontWeight: 700 }}>›</span>
        {cards.map((s, idx) => {
          const active = idx === currentSlide;
          const hasVideo = Boolean(s.videoUrl);
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              title={hasVideo ? `${s.step}: ${s.title} (Incluye Video)` : `${s.step}: ${s.title}`}
              style={{
                minWidth: hasVideo ? '46px' : '28px',
                height: '28px',
                padding: hasVideo ? '0 8px' : '0',
                borderRadius: '999px',
                border: active
                  ? `1.8px solid ${hasVideo ? brand.primary : '#1F2937'}`
                  : hasVideo
                    ? `1px dashed ${brand.primary}`
                    : 'none',
                backgroundColor: active ? '#FFFFFF' : 'transparent',
                color: hasVideo ? brand.primary : '#1F2937',
                fontSize: '12.5px',
                fontWeight: active || hasVideo ? 800 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <span>{idx + 1}</span>
              {hasVideo && <span style={{ fontSize: '9px' }}>▶</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 5: WidgetAccordionDetails
   ========================================================= */
export function WidgetAccordionDetails({
  data,
  brand,
  onNavigateNext,
}: {
  data: AccordionBlockData;
  brand: BrandPreset;
  onNavigateNext: (targetId: string, lessonId?: string) => void;
}) {
  const [openAccordions, setOpenAccordions] = useState<string[]>(
    data.items[0] ? [data.items[0].id] : []
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '72px 24px' }}>
      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.65,
          color: '#1F2937',
          marginBottom: '36px',
        }}
      >
        {data.introBeforeHighlight1}
        <strong style={{ color: brand.primary, fontWeight: 700 }}>{data.introHighlight1}</strong>
        {data.introMiddle}
        <strong style={{ color: brand.primary, fontWeight: 700 }}>{data.introHighlight2}</strong>
        {data.introAfter}
      </p>

      <h3
        style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#111827',
          marginBottom: '26px',
        }}
      >
        {data.heading}
      </h3>

      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '3px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        {data.items.map((item, idx) => {
          const isOpen = openAccordions.includes(item.id);
          return (
            <div
              key={item.id}
              style={{
                borderTop: idx === 0 ? 'none' : '1px solid #E5E7EB',
                borderLeft: isOpen ? `4px solid ${brand.primary}` : '4px solid transparent',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '22px 28px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: '15.5px',
                    fontWeight: 800,
                    color: '#111827',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    color: '#6B7280',
                    fontWeight: 400,
                    flexShrink: 0,
                  }}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0 28px 26px 28px',
                    fontSize: '14.5px',
                    lineHeight: 1.65,
                    color: '#4B5563',
                  }}
                >
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onNavigateNext(data.nextTargetId, data.nextLessonId)}
        style={{
          marginTop: '36px',
          width: '100%',
          height: '44px',
          backgroundColor: brand.primary,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        title="Avanzar al siguiente bloque"
      >
        ▼
      </button>
    </div>
  );
}

/* =========================================================
   WIDGET 6: WidgetCodeComparison
   ========================================================= */
export function WidgetCodeComparison({
  data,
  brand,
}: {
  data: CodeComparisonBlockData;
  brand: BrandPreset;
}) {
  const tabs = data.tabs || [];
  const [activeCompTab, setActiveCompTab] = useState(tabs[0]?.id || '');
  const currentCompObj = tabs.find((t) => t.id === activeCompTab) || tabs[0];

  if (!currentCompObj) return null;

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        {tabs.map((tab) => {
          const active = tab.id === currentCompObj.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCompTab(tab.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                border: active ? `2px solid ${brand.primary}` : '1px solid #CBD5E1',
                backgroundColor: active ? brand.primary : '#FFFFFF',
                color: active ? '#FFFFFF' : '#334155',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #FECACA',
            borderTop: '4px solid #EF4444',
            borderRadius: '6px',
            padding: '22px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#B91C1C',
              marginBottom: '14px',
            }}
          >
            {currentCompObj.badTitle}
          </div>
          <pre
            style={{
              backgroundColor: '#1E293B',
              color: '#FCA5A5',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              lineHeight: 1.6,
              overflowX: 'auto',
              margin: '0 0 14px 0',
            }}
          >
            <code>{currentCompObj.badCode}</code>
          </pre>
          <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#475569', margin: 0 }}>
            <strong style={{ color: '#B91C1C' }}>Riesgo:</strong> {currentCompObj.badReason}
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #A7F3D0',
            borderTop: '4px solid #10B981',
            borderRadius: '6px',
            padding: '22px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#047857',
              marginBottom: '14px',
            }}
          >
            {currentCompObj.goodTitle}
          </div>
          <pre
            style={{
              backgroundColor: '#0F172A',
              color: '#A7F3D0',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '12px',
              lineHeight: 1.6,
              overflowX: 'auto',
              margin: '0 0 14px 0',
            }}
          >
            <code>{currentCompObj.goodCode}</code>
          </pre>
          <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#475569', margin: 0 }}>
            <strong style={{ color: '#047857' }}>Solución:</strong> {currentCompObj.goodReason}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 7: WidgetArchitectureHotspots
   ========================================================= */
export function WidgetArchitectureHotspots({
  data,
  brand,
}: {
  data: ArchitectureHotspotsBlockData;
  brand: BrandPreset;
}) {
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

/* =========================================================
   WIDGET 7.B: WidgetArchitectureHotspotsVisual (Alternativa con Imagen en las tarjetas del lado izquierdo y también Imagen en el panel derecho)
   ========================================================= */
export function WidgetArchitectureHotspotsVisual({
  data,
  brand,
}: {
  data: ArchitectureHotspotsVisualBlockData;
  brand: BrandPreset;
}) {
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
                {/* Imagen del lado izquierdo (miniatura con insignia de número) */}
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

            {/* Imagen destacada en el lado derecho (con lupa al pasar el mouse y clic para agrandar) */}
            <div style={{ marginBottom: '18px' }}>
              <ZoomableFigure
                title={`Capa ${currentHotspotObj.number} · ${currentHotspotObj.name}`}
                caption={currentHotspotObj.rightImageCaption || currentHotspotObj.control}
                apaCitation={currentHotspotObj.apaCitation}
                brandColor={brand.primary}
                maxWidth="100%"
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

/* =========================================================
   WIDGET 8: WidgetFlipCards3D
   ========================================================= */
export function WidgetFlipCards3D({
  data,
  brand,
}: {
  data: FlipCards3DBlockData;
  brand: BrandPreset;
}) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '22px',
        }}
      >
        {data.cards.map((card, i) => {
          const flipped = Boolean(flippedCards[i]);
          return (
            <div
              key={card.title}
              onClick={() => setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlippedCards((prev) => ({ ...prev, [i]: !prev[i] }));
                }
              }}
              style={{
                perspective: '1200px',
                height: '265px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderTop: `4px solid ${brand.primary}`,
                    borderRadius: '10px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
                  }}
                >
                  <div>
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
                          letterSpacing: '0.06em',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: brand.primaryLight,
                          color: brand.primary,
                        }}
                      >
                        {card.badge}
                      </span>
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '999px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          color: brand.primary,
                          fontWeight: 800,
                        }}
                      >
                        ↻
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: '18px',
                        fontWeight: 800,
                        color: '#0F172A',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {card.title}
                    </h4>

                    <p
                      style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#1E293B',
                        lineHeight: 1.45,
                        margin: '0 0 8px 0',
                      }}
                    >
                      {card.frontQuestion}
                    </p>

                    <p
                      style={{
                        fontSize: '12.5px',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {card.frontContext}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(145deg, ${brand.primary} 0%, ${brand.primaryDark} 100%)`,
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 16px 32px rgba(15, 23, 42, 0.18)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 900,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          backgroundColor: 'rgba(0,0,0,0.22)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        ✓ SOLUCIÓN RECOMENDADA
                      </span>
                      <span style={{ fontSize: '12px', opacity: 0.9 }}>↺</span>
                    </div>

                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: 1.45,
                        margin: '0 0 10px 0',
                        fontWeight: 600,
                        color: '#FFFFFF',
                      }}
                    >
                      {card.backRule}
                    </p>

                    <pre
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.88)',
                        color: '#E2E8F0',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        lineHeight: 1.5,
                        fontFamily: '"JetBrains Mono", Consolas, monospace',
                        overflowX: 'auto',
                        margin: 0,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <code>{card.backCode}</code>
                    </pre>
                  </div>

                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.92)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* <span>← Volver al concepto</span> */}
                    <span>{card.title}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 9.A: WidgetStepToStep (Línea de Tiempo Paso a Paso / Etapas CI/CD)
   ========================================================= */
export function WidgetStepToStep({
  data,
  brand,
}: {
  data: StepToStepBlockData;
  brand: BrandPreset;
}) {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '72px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
          borderLeft: `3px solid ${brand.primary}`,
          marginLeft: '14px',
          paddingLeft: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {data.stages.map((item) => (
          <div
            key={item.stage}
            style={{
              position: 'relative',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-37px',
                top: '22px',
                width: '14px',
                height: '14px',
                borderRadius: '999px',
                backgroundColor: brand.primary,
                border: '3px solid #FFFFFF',
                boxShadow: '0 0 0 1px #CBD5E1',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '6px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: brand.primary,
                  letterSpacing: '0.05em',
                }}
              >
                {item.stage} · {item.time}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#E2E8F0',
                  color: '#1E293B',
                }}
              >
                {item.badge}
              </span>
            </div>
            <h4
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#0F172A',
                margin: '0 0 6px 0',
              }}
            >
              {item.title}
            </h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 9.B: WidgetChecklist (Lista de Verificación Interactiva Independiente)
   ========================================================= */
export function WidgetChecklist({
  data,
  brand,
  checkedItems,
  onToggleChecklistItem,
}: {
  data: ChecklistBlockData;
  brand: BrandPreset;
  checkedItems: string[];
  onToggleChecklistItem: (id: string) => void;
}) {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '72px 24px' }}>
      {data.badge && (
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
        </div>
      )}

      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {data.checklistTitle}
            </h4>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
              {data.checklistSubtitle}
            </p>
          </div>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: brand.primaryLight,
              color: brand.primary,
              fontSize: '12px',
              fontWeight: 800,
            }}
          >
            {checkedItems.length} de {data.checklist.length} verificados
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.checklist.map((item) => {
            const checked = checkedItems.includes(item.id);
            return (
              <label
                key={item.id}
                onClick={() => onToggleChecklistItem(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '6px',
                  border: checked ? `1.5px solid ${brand.primary}` : '1px solid #E2E8F0',
                  backgroundColor: checked ? '#F8FAFC' : '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      backgroundColor: checked ? brand.primary : '#FFFFFF',
                      border: checked ? 'none' : '1.5px solid #94A3B8',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {checked ? '✓' : ''}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: checked ? 700 : 500,
                      color: '#1E293B',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#64748B',
                    backgroundColor: '#F1F5F9',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                >
                  {item.category}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 9.C (Compatibilidad): WidgetPipelineChecklist
   ========================================================= */
export function WidgetPipelineChecklist({
  data,
  brand,
  checkedItems,
  onToggleChecklistItem,
}: {
  data: PipelineChecklistBlockData;
  brand: BrandPreset;
  checkedItems: string[];
  onToggleChecklistItem: (id: string) => void;
}) {
  return (
    <div>
      <WidgetStepToStep
        data={{ badge: data.badge, title: data.title, stages: data.stages }}
        brand={brand}
      />
      <WidgetChecklist
        data={{
          checklistTitle: data.checklistTitle,
          checklistSubtitle: data.checklistSubtitle,
          checklist: data.checklist,
        }}
        brand={brand}
        checkedItems={checkedItems}
        onToggleChecklistItem={onToggleChecklistItem}
      />
    </div>
  );
}

/* =========================================================
   WIDGET 10: WidgetScenarioQuiz
   ========================================================= */
export function WidgetScenarioQuiz({
  data,
  brand,
  activeScenarioIdx,
  onSelectScenarioIdx,
  selectedOptions,
  submittedQuestions,
  onSelectOption,
  onSubmitQuestion,
  earnedQuizScore,
  maxQuizScore,
  onViewReport,
}: {
  data: ScenarioQuizBlockData;
  brand: BrandPreset;
  activeScenarioIdx: number;
  onSelectScenarioIdx: (idx: number) => void;
  selectedOptions: Record<string, string>;
  submittedQuestions: Record<string, boolean>;
  onSelectOption: (questionId: string, optionId: string) => void;
  onSubmitQuestion: (questionId: string) => void;
  earnedQuizScore: number;
  maxQuizScore: number;
  onViewReport: (targetId: string) => void;
}) {
  const questions = data.questions || [];
  const currentQuestion = questions[activeScenarioIdx] || questions[0];
  if (!currentQuestion) return null;

  const chosenOptionId = selectedOptions[currentQuestion.id];
  const isQuestionSubmitted = Boolean(submittedQuestions[currentQuestion.id]);
  const chosenOptionObj = currentQuestion.options.find((o) => o.id === chosenOptionId);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '64px 24px 72px 24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {questions.map((q, idx) => {
            const isCurr = idx === activeScenarioIdx;
            const isDone = Boolean(submittedQuestions[q.id]);
            const pickedId = selectedOptions[q.id];
            const isRight = isDone && q.options.find((o) => o.id === pickedId)?.isCorrect;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectScenarioIdx(idx)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: isCurr ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.4)',
                  backgroundColor: isCurr ? '#FFFFFF' : 'rgba(0,0,0,0.2)',
                  color: isCurr ? '#0F172A' : '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{q.videoUrl ? `▶ Caso ${idx + 1} (Con Video)` : `Caso ${idx + 1}`}</span>
                {isDone && (
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '999px',
                      backgroundColor: isRight ? '#10B981' : '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isRight ? '✓' : '✕'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: 800,
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          Puntaje Casos: {earnedQuizScore} / {maxQuizScore} pts
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
          padding: '44px 48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: brand.primary,
              letterSpacing: '0.06em',
            }}
          >
            {currentQuestion.badge}
          </span>
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              backgroundColor: '#F1F5F9',
              color: '#334155',
            }}
          >
            +{currentQuestion.points} PTS
          </span>
        </div>

        <h3
          style={{
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 800,
            color: '#111827',
            margin: '0 0 12px 0',
          }}
        >
          {currentQuestion.question}
        </h3>

        <p
          style={{
            textAlign: 'center',
            fontSize: '13.5px',
            lineHeight: 1.6,
            color: '#4B5563',
            margin: '0 0 22px 0',
            paddingBottom: '18px',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          {currentQuestion.context}
        </p>

        {currentQuestion.videoUrl && (
          <div
            style={{
              marginBottom: '24px',
              backgroundColor: '#0F172A',
              borderRadius: '8px',
              padding: '12px',
              border: `2px solid ${brand.primary}`,
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: brand.primary,
                  }}
                >
                  ▶ VIDEO DEL CASO
                </span>
                <span>Evidencia de Auditoría en Producción</span>
              </span>
              <span style={{ color: '#94A3B8' }}>Observa antes de responder</span>
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: '#000000',
              }}
            >
              <iframe
                style={{ width: '100%', height: '100%', border: 0 }}
                src={currentQuestion.videoUrl}
                title={`Video de ${currentQuestion.badge}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {currentQuestion.videoCaption && (
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '11.5px',
                  color: '#CBD5E1',
                  textAlign: 'center',
                }}
              >
                {currentQuestion.videoCaption}
              </div>
            )}

            <ApaReferenceFooter citation={currentQuestion.apaCitation} dark />
          </div>
        )}

        <div>
          {currentQuestion.options.map((opt) => {
            const isSelected = chosenOptionId === opt.id;
            return (
              <label
                key={opt.id}
                onClick={() => onSelectOption(currentQuestion.id, opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '18px 20px',
                  backgroundColor: isSelected ? '#F4F5F7' : 'transparent',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    marginTop: '3px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '999px',
                    border: isSelected ? `2px solid ${brand.primary}` : '1.5px solid #9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  {isSelected && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '999px',
                        backgroundColor: brand.primary,
                      }}
                    />
                  )}
                </span>
                <span
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.6,
                    color: '#374151',
                  }}
                >
                  {opt.text}
                </span>
              </label>
            );
          })}
        </div>

        {isQuestionSubmitted && chosenOptionObj && (
          <div
            style={{
              marginTop: '20px',
              padding: '14px 18px',
              borderRadius: '6px',
              backgroundColor: chosenOptionObj.isCorrect ? '#ECFDF5' : '#FEF2F2',
              border: chosenOptionObj.isCorrect ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
              color: chosenOptionObj.isCorrect ? '#065F46' : '#991B1B',
              fontSize: '13px',
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            {chosenOptionObj.feedback}
          </div>
        )}

        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => onSubmitQuestion(currentQuestion.id)}
            disabled={!chosenOptionId}
            style={{
              backgroundColor: brand.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '11px 40px',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: chosenOptionId ? 'pointer' : 'not-allowed',
              opacity: chosenOptionId ? 1 : 0.5,
            }}
          >
            ENVIAR RESPUESTA
          </button>

          {activeScenarioIdx < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => onSelectScenarioIdx(activeScenarioIdx + 1)}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '11px 24px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Siguiente Caso →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onViewReport(data.reportTargetId || 'widget-report')}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '999px',
                padding: '11px 26px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              📊 VER REPORTE FINAL ↓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WIDGET 11: WidgetFinalReport
   ========================================================= */
export function WidgetFinalReport({
  data,
  brand,
  institutionName,
  courseTitle,
  globalScore,
  earnedQuizScore,
  maxQuizScore,
  answeredScenariosCount,
  scenarioQuestions,
  submittedQuestions,
  selectedOptions,
  checklistScorePct,
  checkedItemsCount,
  totalChecklistCount,
  progressPct,
  completedLessonsCount,
  totalLessonsCount,
  onJumpToScenario,
  onResetEvaluation,
  onCompleteAllLessons,
}: {
  data: FinalReportBlockData;
  brand: BrandPreset;
  institutionName: string;
  courseTitle: string;
  globalScore: number;
  earnedQuizScore: number;
  maxQuizScore: number;
  answeredScenariosCount: number;
  scenarioQuestions: ScenarioQuestionItem[];
  submittedQuestions: Record<string, boolean>;
  selectedOptions: Record<string, string>;
  checklistScorePct: number;
  checkedItemsCount: number;
  totalChecklistCount: number;
  progressPct: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onJumpToScenario: (idx: number) => void;
  onResetEvaluation: () => void;
  onCompleteAllLessons: () => void;
}) {
  const isApproved = globalScore >= (data.passingScore || 70);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '80px 24px 96px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 14px',
            borderRadius: '999px',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          {data.badge}
        </span>
        <h3
          style={{
            fontSize: '30px',
            fontWeight: 900,
            color: '#FFFFFF',
            margin: '0 0 8px 0',
          }}
        >
          {data.title}
        </h3>
        <p style={{ fontSize: '14.5px', color: '#94A3B8', margin: 0 }}>{data.subtitle}</p>
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          borderRadius: '12px',
          padding: '36px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            paddingBottom: '28px',
            borderBottom: '1px solid #E2E8F0',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#64748B',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '4px',
              }}
            >
              INSTITUCIÓN: {institutionName}
            </div>
            <h4 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 8px 0' }}>{courseTitle}</h4>
            <span
              style={{
                display: 'inline-block',
                padding: '5px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 800,
                backgroundColor: isApproved ? '#DCFCE7' : '#FEF3C7',
                color: isApproved ? '#166534' : '#92400E',
              }}
            >
              {isApproved
                ? `✓ APROBADO CON ESTÁNDAR DE PRODUCCIÓN (≥ ${data.passingScore || 70} PTS)`
                : '⏳ EN PROGRESO — COMPLETA LOS CASOS Y EL CHECKLIST PARA APROBAR'}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              backgroundColor: '#F8FAFC',
              border: `2px solid ${brand.primary}`,
              borderRadius: '12px',
              padding: '18px 26px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#64748B',
                  textTransform: 'uppercase',
                }}
              >
                SCORE GLOBAL
              </div>
              <div
                style={{
                  fontSize: '38px',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: brand.primary,
                }}
              >
                {globalScore}
                <span style={{ fontSize: '18px', color: '#64748B' }}>/100</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
            marginTop: '28px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '18px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B' }}>
              CASOS DE DECISIÓN (70%)
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
              {earnedQuizScore} / {maxQuizScore} pts
            </div>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              {answeredScenariosCount} de {scenarioQuestions.length} escenarios enviados
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '18px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B' }}>
              CHECKLIST DE PRODUCCIÓN (30%)
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
              {checklistScorePct}%
            </div>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              {checkedItemsCount} de {totalChecklistCount} controles verificados
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '18px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B' }}>
              AVANCE GENERAL DEL CURSO
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: '4px 0' }}>
              {progressPct}%
            </div>
            <div style={{ fontSize: '12px', color: '#475569' }}>
              {completedLessonsCount} de {totalLessonsCount} lecciones completadas
            </div>
          </div>
        </div>

        <h5
          style={{
            fontSize: '15px',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 14px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Desglose por Actividad Evaluada:
        </h5>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {scenarioQuestions.map((q, idx) => {
            const isSub = Boolean(submittedQuestions[q.id]);
            const pickedId = selectedOptions[q.id];
            const pickedOpt = q.options.find((o) => o.id === pickedId);
            const isCorrect = Boolean(isSub && pickedOpt?.isCorrect);

            return (
              <div
                key={q.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: isCorrect ? '#F0FDF4' : isSub ? '#FEF2F2' : '#F8FAFC',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: brand.primary,
                    }}
                  >
                    {q.badge} {q.videoUrl ? '· [CON VIDEO DE EVIDENCIA]' : ''}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                    {q.question}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      backgroundColor: isCorrect ? '#16A34A' : isSub ? '#DC2626' : '#CBD5E1',
                      color: isSub ? '#FFFFFF' : '#334155',
                    }}
                  >
                    {isCorrect
                      ? `✓ Correcto (+${q.points} pts)`
                      : isSub
                        ? `✕ Incorrecto (0/${q.points} pts)`
                        : `Pendiente (0/${q.points} pts)`}
                  </span>

                  {!isCorrect && (
                    <button
                      type="button"
                      onClick={() => onJumpToScenario(idx)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#0F172A',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      Ir al Caso {idx + 1} ↑
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={onResetEvaluation}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            ↺ Reiniciar Evaluación
          </button>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onCompleteAllLessons}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              ✓ Marcar Todo el Curso 100%
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: brand.primary,
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🖨️ Imprimir / Guardar Reporte PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
