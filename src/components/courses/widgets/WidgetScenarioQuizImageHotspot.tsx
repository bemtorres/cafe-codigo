import { useState } from 'react';
import type {
  BrandPreset,
  ScenarioQuizImageHotspotBlockData,
} from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';
import { QuizCardShell } from './QuizCardShell';

export interface WidgetScenarioQuizImageHotspotProps {
  blockId: string;
  data: ScenarioQuizImageHotspotBlockData;
  brand: BrandPreset;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

export function WidgetScenarioQuizImageHotspot({
  blockId,
  data,
  brand,
  onScoreChange,
}: WidgetScenarioQuizImageHotspotProps) {
  const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>([]);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [clickCoords, setClickCoords] = useState<{ x: number; y: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const requiredCount = data.targetRiskCount || 1;
  const isSingleChoiceMode = requiredCount === 1;

  const handleSelectZone = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSubmitted(false);
    const parent = e.currentTarget.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      const xPct = Math.max(4, Math.min(96, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(6, Math.min(94, ((e.clientY - rect.top) / rect.height) * 100));
      setClickCoords({ x: xPct, y: yPct });
    }

    if (isSingleChoiceMode) {
      setSelectedZoneIds([id]);
    } else {
      setSelectedZoneIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const targetIds = data.zones.filter((z) => z.isRiskTarget).map((z) => z.id);
  const isPerfect =
    selectedZoneIds.length === targetIds.length &&
    targetIds.every((id) => selectedZoneIds.includes(id));

  const earnedPoints = submitted ? (isPerfect ? data.points : 0) : 0;

  const handleVerify = () => {
    setSubmitted(true);
    const perfect =
      selectedZoneIds.length === targetIds.length &&
      targetIds.every((id) => selectedZoneIds.includes(id));
    onScoreChange?.(blockId, perfect ? data.points : 0, data.points);
  };

  const selectedSingleZone = data.zones.find((z) => z.id === selectedZoneIds[0]);

  return (
    <QuizCardShell
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={earnedPoints}
      submitted={submitted}
    >
      <div
        style={{
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12.5px',
          fontWeight: 800,
          color: '#334155',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span>
          {isSingleChoiceMode
            ? '👆 Haz clic directamente sobre la parte o lado correcto de la imagen:'
            : `👆 Toca sobre la imagen las ${requiredCount} zonas correctas:`}
        </span>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: '999px',
            backgroundColor: selectedZoneIds.length > 0 ? '#EFF6FF' : '#F1F5F9',
            color: selectedZoneIds.length > 0 ? brand.primary : '#64748B',
            fontSize: '11.5px',
          }}
        >
          {isSingleChoiceMode
            ? selectedSingleZone
              ? `🎯 Seleccionado: ${selectedSingleZone.label}`
              : 'Ninguna parte seleccionada aún'
            : `${selectedZoneIds.length} / ${requiredCount} zonas marcadas`}
        </span>
      </div>

      {/* Contenedor relativo con la imagen de fondo y las regiones clicables */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '2px solid #CBD5E1',
          backgroundColor: '#0F172A',
          userSelect: 'none',
          boxShadow: '0 12px 28px rgba(15, 23, 42, 0.14)',
        }}
      >
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ) : data.sceneType === 'phishing-email' ? (
          /* Escena opcional de Correo Corporativo */
          <svg
            viewBox="0 0 800 440"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            role="img"
            aria-label="Captura de pantalla de correo electrónico para inspección"
          >
            <rect width="800" height="440" fill="#F1F5F9" />
            <rect x="20" y="18" width="760" height="404" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="20" y="18" width="760" height="42" rx="10" fill="#0F172A" />
            <circle cx="44" cy="39" r="6" fill="#EF4444" />
            <circle cx="64" cy="39" r="6" fill="#F59E0B" />
            <circle cx="84" cy="39" r="6" fill="#10B981" />
            <text x="115" y="44" fill="#E2E8F0" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              Bandeja de Entrada Corporativa — Revisión de Seguridad
            </text>
            <rect x="44" y="76" width="712" height="48" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
            <text x="58" y="96" fill="#64748B" fontSize="11" fontWeight="700" fontFamily="sans-serif">DE:</text>
            <text x="90" y="96" fill="#0F172A" fontSize="13" fontWeight="800" fontFamily="monospace">
              Soporte TI Urgente &lt;admin-seguridad@inacap-verificacion-cuenta.ru&gt;
            </text>
            <rect x="44" y="136" width="712" height="42" rx="6" fill="#FFFFFF" stroke="#E2E8F0" />
            <text x="58" y="162" fill="#1E293B" fontSize="14" fontWeight="800" fontFamily="sans-serif">
              Asunto: Notificación de vencimiento de token de acceso VPN
            </text>
            <rect x="44" y="222" width="712" height="62" rx="6" fill="#FFFBEB" stroke="#FDE68A" />
            <text x="58" y="246" fill="#92400E" fontSize="13" fontWeight="700" fontFamily="sans-serif">
              ⚠ Adjunto obligatorio: Parche_Seguridad_VPN_2026.exe
            </text>
            <rect x="230" y="304" width="340" height="52" rx="8" fill="#DC2626" />
            <text x="275" y="328" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">
              INGRESAR CONTRASEÑA MAESTRA AQUÍ
            </text>
          </svg>
        ) : (
          /* Escena Ilustrada de una Banda de Música en Escenario (4 sectores: Guitarrista, Vocalista, Batería y Tecladista) */
          <svg
            viewBox="0 0 840 440"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            role="img"
            aria-label="Escenario de una banda de música en vivo con guitarrista, vocalista, batería y tecladista"
          >
            <defs>
              <linearGradient id="stageBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#090D16" />
                <stop offset="68%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <radialGradient id="spotLeft" cx="0.15" cy="0" r="0.65">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotCenter" cx="0.5" cy="0" r="0.65">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotDrums" cx="0.64" cy="0.1" r="0.55">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="spotRight" cx="0.88" cy="0" r="0.6">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="840" height="440" fill="url(#stageBg)" />
            <rect width="840" height="440" fill="url(#spotLeft)" />
            <rect width="840" height="440" fill="url(#spotCenter)" />
            <rect width="840" height="440" fill="url(#spotDrums)" />
            <rect width="840" height="440" fill="url(#spotRight)" />

            <rect x="0" y="14" width="840" height="10" fill="#334155" />
            {[95, 250, 420, 565, 740].map((lx) => (
              <g key={lx}>
                <rect x={lx - 14} y="22" width="28" height="14" rx="3" fill="#1E293B" stroke="#64748B" />
                <circle cx={lx} cy="36" r="7" fill="#FDE047" />
              </g>
            ))}

            <polygon points="0,335 840,335 840,440 0,440" fill="#1E293B" />
            <line x1="0" y1="335" x2="840" y2="335" stroke="#475569" strokeWidth="3" />
            <line x1="0" y1="365" x2="840" y2="365" stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="400" x2="840" y2="400" stroke="#334155" strokeWidth="1" />

            {/* SECTOR 1 (IZQUIERDA): GUITARRISTA ELÉCTRICO + AMPLIFICADOR */}
            <g transform="translate(38, 125)">
              <rect x="0" y="95" width="76" height="110" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="3" />
              <rect x="8" y="105" width="60" height="20" rx="2" fill="#334155" />
              <circle cx="24" cy="152" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="52" cy="152" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="24" cy="184" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="52" cy="184" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <circle cx="118" cy="48" r="22" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M96 42 Q118 16 142 42" fill="#0F172A" />
              <rect x="92" y="72" width="52" height="82" rx="12" fill="#2563EB" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="104" y1="154" x2="96" y2="215" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <line x1="132" y1="154" x2="140" y2="215" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <ellipse cx="112" cy="128" rx="28" ry="20" transform="rotate(-18 112 128)" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
              <line x1="126" y1="122" x2="182" y2="92" stroke="#FDE047" strokeWidth="6" strokeLinecap="round" />
              <circle cx="185" cy="90" r="5" fill="#EF4444" />
            </g>

            {/* SECTOR 2 (CENTRO-IZQUIERDA): VOCALISTA PRINCIPAL + MICRÓFONO */}
            <g transform="translate(245, 130)">
              <polygon points="15,205 115,205 102,178 28,178" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
              <circle cx="65" cy="42" r="23" fill="#FED7AA" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M42 36 Q65 8 88 36" fill="#7C2D12" />
              <rect x="38" y="68" width="54" height="84" rx="14" fill="#E11D48" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="52" y1="152" x2="46" y2="205" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <line x1="78" y1="152" x2="84" y2="205" stroke="#0F172A" strokeWidth="12" strokeLinecap="round" />
              <path d="M86 88 L112 66" stroke="#FED7AA" strokeWidth="9" strokeLinecap="round" />
              <line x1="115" y1="62" x2="115" y2="205" stroke="#E2E8F0" strokeWidth="3.5" />
              <line x1="92" y1="205" x2="138" y2="205" stroke="#E2E8F0" strokeWidth="4" />
              <circle cx="112" cy="58" r="7" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
            </g>

            {/* SECTOR 3 (CENTRO-DERECHA): BATERÍA ACÚSTICA COMPLETA + BATERISTA */}
            <g transform="translate(425, 95)">
              <rect x="0" y="210" width="215" height="32" rx="6" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="108" cy="48" r="20" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
              <rect x="84" y="70" width="48" height="65" rx="10" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="84" y1="88" x2="48" y2="62" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="132" y1="88" x2="168" y2="62" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="38" y1="78" x2="38" y2="210" stroke="#CBD5E1" strokeWidth="3" />
              <ellipse cx="38" cy="78" rx="28" ry="6" transform="rotate(-10 38 78)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
              <line x1="178" y1="74" x2="178" y2="210" stroke="#CBD5E1" strokeWidth="3" />
              <ellipse cx="178" cy="74" rx="30" ry="6" transform="rotate(10 178 74)" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
              <line x1="16" y1="112" x2="16" y2="210" stroke="#CBD5E1" strokeWidth="2.5" />
              <ellipse cx="16" cy="112" rx="18" ry="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
              <rect x="64" y="102" width="38" height="30" rx="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
              <rect x="114" y="102" width="40" height="32" rx="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
              <rect x="34" y="138" width="42" height="22" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="2.5" />
              <rect x="144" y="136" width="46" height="58" rx="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="108" cy="168" r="44" fill="#FEF2F2" stroke="#DC2626" strokeWidth="8" />
              <circle cx="108" cy="168" r="32" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="108" y="173" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                ROCK
              </text>
            </g>

            {/* SECTOR 4 (DERECHA): TECLADISTA / SINTETIZADOR */}
            <g transform="translate(665, 130)">
              <circle cx="80" cy="44" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
              <rect x="56" y="68" width="48" height="76" rx="12" fill="#9333EA" stroke="#1E293B" strokeWidth="2.5" />
              <line x1="68" y1="144" x2="64" y2="205" stroke="#0F172A" strokeWidth="11" strokeLinecap="round" />
              <line x1="92" y1="144" x2="96" y2="205" stroke="#0F172A" strokeWidth="11" strokeLinecap="round" />
              <rect x="18" y="118" width="124" height="24" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
              {[26, 38, 50, 62, 74, 86, 98, 110, 122].map((kx) => (
                <rect key={kx} x={kx} y="123" width="9" height="14" rx="1" fill="#F8FAFC" />
              ))}
              <line x1="36" y1="142" x2="118" y2="205" stroke="#94A3B8" strokeWidth="4" />
              <line x1="118" y1="142" x2="36" y2="205" stroke="#94A3B8" strokeWidth="4" />
            </g>
          </svg>
        )}

        {/* Regiones clicables invisibles sobre la imagen */}
        {data.zones.map((zone) => {
          const isSelected = selectedZoneIds.includes(zone.id);
          const isHovered = hoveredZoneId === zone.id;

          const showOutline = isSelected || isHovered || submitted;
          const borderCol = submitted
            ? zone.isRiskTarget
              ? '#10B981'
              : isSelected
                ? '#EF4444'
                : 'transparent'
            : isSelected
              ? '#FDE047'
              : isHovered
                ? 'rgba(255, 255, 255, 0.65)'
                : 'transparent';

          const bgCol = submitted
            ? zone.isRiskTarget
              ? 'rgba(16, 185, 129, 0.24)'
              : isSelected
                ? 'rgba(239, 68, 68, 0.28)'
                : 'transparent'
            : isSelected
              ? 'rgba(250, 204, 21, 0.18)'
              : isHovered
                ? 'rgba(255, 255, 255, 0.08)'
                : 'transparent';

          return (
            <button
              key={zone.id}
              type="button"
              onMouseEnter={() => setHoveredZoneId(zone.id)}
              onMouseLeave={() => setHoveredZoneId(null)}
              onClick={(e) => handleSelectZone(zone.id, e)}
              aria-label={zone.label}
              style={{
                position: 'absolute',
                left: `${zone.xPercent}%`,
                top: `${zone.yPercent}%`,
                width: `${zone.widthPercent}%`,
                height: `${zone.heightPercent}%`,
                border: showOutline ? `3px solid ${borderCol}` : '2px solid transparent',
                backgroundColor: bgCol,
                borderRadius: '12px',
                cursor: 'crosshair',
                padding: '8px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                transition: 'all 0.18s ease',
              }}
            >
              {(isSelected || (submitted && zone.isRiskTarget)) && (
                <span
                  style={{
                    backgroundColor: submitted
                      ? zone.isRiskTarget
                        ? '#10B981'
                        : '#EF4444'
                      : '#0F172A',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    fontSize: '11px',
                    fontWeight: 900,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  {submitted
                    ? zone.isRiskTarget
                      ? `✓ ${zone.label}`
                      : `✕ ${zone.label}`
                    : `🎯 ${zone.label}`}
                </span>
              )}
            </button>
          );
        })}

        {/* Pin / Mira visual exacta donde el usuario hizo clic */}
        {isSingleChoiceMode && clickCoords && selectedZoneIds.length > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${clickCoords.x}%`,
              top: `${clickCoords.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              borderRadius: '999px',
              backgroundColor: submitted
                ? isPerfect
                  ? '#10B981'
                  : '#EF4444'
                : brand.primary,
              border: '3px solid #FFFFFF',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 900,
              boxShadow: '0 0 0 6px rgba(255,255,255,0.28), 0 8px 20px rgba(0,0,0,0.45)',
              pointerEvents: 'none',
            }}
          >
            {submitted ? (isPerfect ? '✓' : '✕') : '🎯'}
          </div>
        )}
      </div>

      <ApaReferenceFooter citation={data.apaCitation} />

      {submitted && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.zones
            .filter((z) => selectedZoneIds.includes(z.id) || z.isRiskTarget)
            .map((z) => {
              const wasPicked = selectedZoneIds.includes(z.id);
              return (
                <div
                  key={z.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: z.isRiskTarget ? '#ECFDF5' : '#FEF2F2',
                    border: z.isRiskTarget ? '1px solid #6EE7B7' : '1px solid #FCA5A5',
                    color: z.isRiskTarget ? '#065F46' : '#991B1B',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <strong>{z.label}:</strong> {z.feedback}{' '}
                  {!wasPicked && z.isRiskTarget ? '(Esta era la parte correcta de la imagen)' : ''}
                </div>
              );
            })}
        </div>
      )}

      <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={() => {
            setSelectedZoneIds([]);
            setClickCoords(null);
            setSubmitted(false);
            onScoreChange?.(blockId, 0, data.points);
          }}
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          Reiniciar Selección
        </button>
        <button
          type="button"
          onClick={handleVerify}
          disabled={selectedZoneIds.length === 0}
          style={{
            padding: '10px 28px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: brand.primary,
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textTransform: 'uppercase',
            cursor: selectedZoneIds.length > 0 ? 'pointer' : 'not-allowed',
            opacity: selectedZoneIds.length > 0 ? 1 : 0.5,
          }}
        >
          Comprobar Selección
        </button>
      </div>
    </QuizCardShell>
  );
}

