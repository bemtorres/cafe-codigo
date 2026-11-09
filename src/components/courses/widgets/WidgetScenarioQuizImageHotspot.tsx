import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import type {
  BrandPreset,
  ScenarioQuizImageHotspotBlockData,
  ScenarioQuizImageHotspotZone,
} from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';
import { QuizCardShell } from './QuizCardShell';
import { useQuizAnswer, useQuizSubmission } from './QuizAttemptContext';
import './scenario-image-hotspot.css';

export interface WidgetScenarioQuizImageHotspotProps {
  blockId: string;
  data: ScenarioQuizImageHotspotBlockData;
  brand: BrandPreset;
  isEditMode?: boolean;
  onUpdateData?: (data: ScenarioQuizImageHotspotBlockData) => void;
  onScoreChange?: (blockId: string, earned: number, max: number) => void;
}

type Point = { x: number; y: number };
type Rectangle = Pick<ScenarioQuizImageHotspotZone, 'xPercent' | 'yPercent' | 'widthPercent' | 'heightPercent'>;

const clamp = (value: number) => Math.max(0, Math.min(100, value));
const center = { x: 50, y: 50 };

function pointAt(element: HTMLElement, x: number, y: number): Point {
  const bounds = element.getBoundingClientRect();
  return {
    x: clamp((x - bounds.left) / bounds.width * 100),
    y: clamp((y - bounds.top) / bounds.height * 100),
  };
}

function rectangleBetween(start: Point, end: Point): Rectangle {
  return {
    xPercent: Math.min(start.x, end.x),
    yPercent: Math.min(start.y, end.y),
    widthPercent: Math.abs(end.x - start.x),
    heightPercent: Math.abs(end.y - start.y),
  };
}

function contains(zone: Rectangle, point: Point): boolean {
  return point.x >= zone.xPercent && point.x <= zone.xPercent + zone.widthPercent &&
    point.y >= zone.yPercent && point.y <= zone.yPercent + zone.heightPercent;
}

function rectangleStyle(zone: Rectangle) {
  return {
    left: `${zone.xPercent}%`,
    top: `${zone.yPercent}%`,
    width: `${zone.widthPercent}%`,
    height: `${zone.heightPercent}%`,
  };
}

export function WidgetScenarioQuizImageHotspot({
  blockId,
  data,
  brand,
  isEditMode = false,
  onUpdateData,
  onScoreChange,
}: WidgetScenarioQuizImageHotspotProps) {
  const hintId = useId();
  const [points, setPoints] = useQuizAnswer<Point[]>([]);
  const [cursor, setCursor] = useState<Point | null>(null);
  const { submitted, setSubmitted } = useQuizSubmission();
  const [selectedTargetId, setSelectedTargetId] = useState<string>();
  const [draft, setDraft] = useState<Rectangle | null>(null);
  const [keyboardStart, setKeyboardStart] = useState<Point | null>(null);
  const [editorMessage, setEditorMessage] = useState('');
  const drag = useRef<{ pointerId: number; start: Point } | null>(null);

  const editing = isEditMode && Boolean(onUpdateData);
  const targets = data.zones.filter((zone) => zone.isRiskTarget);
  const selectedTarget = targets.find((zone) => zone.id === selectedTargetId) ??
    (selectedTargetId === undefined ? targets[0] : undefined);
  const requiredCount = data.targetRiskCount || 1;
  const selectedTargets = points.map((point) => targets.find((zone) => contains(zone, point)));
  const selectedDistractor = points.map((point) =>
    data.zones.find((zone) => !zone.isRiskTarget && contains(zone, point))
  ).find(Boolean);
  const isCorrect = points.length === requiredCount &&
    selectedTargets.every(Boolean) &&
    new Set(selectedTargets.map((zone) => zone?.id)).size === requiredCount;

  const clearResult = () => {
    if (submitted) onScoreChange?.(blockId, 0, data.points);
    setSubmitted(false);
  };

  const markPoint = (point: Point) => {
    clearResult();
    const zone = data.zones.find((entry) => contains(entry, point));
    setPoints((previous) => {
      if (requiredCount === 1) return [point];
      const existing = zone ? previous.findIndex((entry) => contains(zone, entry)) : -1;
      if (existing >= 0) return previous.filter((_, index) => index !== existing);
      return [...previous.slice(0, requiredCount - 1), point];
    });
  };

  const saveRectangle = (start: Point, end: Point) => {
    setDraft(null);
    setKeyboardStart(null);
    const bounds = rectangleBetween(start, end);
    if (bounds.widthPercent < 1 || bounds.heightPercent < 1) {
      setEditorMessage('Dibuja un rectángulo de al menos 1 % de ancho y alto.');
      return;
    }
    const newTarget: ScenarioQuizImageHotspotZone = {
      id: selectedTarget?.id ?? `zona-${crypto.randomUUID()}`,
      label: selectedTarget?.label ?? `Objetivo ${targets.length + 1}`,
      feedback: selectedTarget?.feedback ?? 'Marcaste el objetivo correcto.',
      isRiskTarget: true,
      ...bounds,
    };
    const zones = selectedTarget
      ? data.zones.map((zone) => zone.id === newTarget.id ? newTarget : zone)
      : [...data.zones, newTarget];
    clearResult();
    setPoints([]);
    setSelectedTargetId(newTarget.id);
    setEditorMessage('Rectángulo guardado en el borrador.');
    onUpdateData?.({
      ...data,
      zones,
      targetRiskCount: selectedTarget ? data.targetRiskCount : targets.length + 1,
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!editing || !event.isPrimary || event.button !== 0) return;
    const point = pointAt(event.currentTarget, event.clientX, event.clientY);
    drag.current = { pointerId: event.pointerId, start: point };
    event.currentTarget.setPointerCapture(event.pointerId);
    setCursor(null);
    setKeyboardStart(null);
    setDraft(rectangleBetween(point, point));
    setEditorMessage('');
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!editing || drag.current?.pointerId !== event.pointerId) return;
    setDraft(rectangleBetween(drag.current.start, pointAt(event.currentTarget, event.clientX, event.clientY)));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!editing || drag.current?.pointerId !== event.pointerId) return;
    const { start } = drag.current;
    drag.current = null;
    saveRectangle(start, pointAt(event.currentTarget, event.clientX, event.clientY));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const position = cursor ?? center;
    if (event.key === 'Escape') {
      setDraft(null);
      setKeyboardStart(null);
      setCursor(null);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (event.repeat) return;
      if (!editing) markPoint(position);
      else if (keyboardStart) saveRectangle(keyboardStart, position);
      else {
        setCursor(position);
        setKeyboardStart(position);
        setEditorMessage('Primera esquina marcada. Mueve el cursor y confirma la segunda.');
      }
      return;
    }
    const step = event.shiftKey ? 0.5 : 2;
    const movement = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    }[event.key];
    if (!movement) return;
    event.preventDefault();
    const next = { x: clamp(position.x + movement.x), y: clamp(position.y + movement.y) };
    setCursor(next);
    if (editing && keyboardStart) setDraft(rectangleBetween(keyboardStart, next));
  };

  return (
    <QuizCardShell
      variant="board"
      badge={data.badge}
      points={data.points}
      title={data.title}
      context={data.context}
      brand={brand}
      earnedPoints={!editing && submitted && isCorrect ? data.points : 0}
      submitted={!editing && submitted}
    >
      <div className="image-hotspot">
        {editing && (
          <label className="image-hotspot-control">
            Zona correcta
            <select value={selectedTarget?.id ?? ''} onChange={(event) => {
              setSelectedTargetId(event.target.value);
              setDraft(null);
              setKeyboardStart(null);
              setEditorMessage('');
            }}>
              {targets.map((zone) => <option key={zone.id} value={zone.id}>{zone.label}</option>)}
              <option value="">Nueva zona</option>
            </select>
          </label>
        )}

        <p id={hintId} className="image-hotspot-hint">
          {editing
            ? 'Arrastra sobre la imagen de una esquina a otra. Con teclado, mueve el cursor con las flechas y confirma cada esquina con Enter.'
            : 'Haz clic o toca la imagen para marcar. Con teclado, mueve el cursor con las flechas y marca con Enter.'}
        </p>

        <div
          className="image-hotspot-canvas"
          data-editing={editing}
          tabIndex={0}
          role="group"
          aria-label={data.imageAlt ?? 'Imagen de la actividad'}
          aria-describedby={hintId}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setCursor(null);
            if (keyboardStart) {
              setDraft(null);
              setKeyboardStart(null);
            }
          }}
          onClick={(event) => {
            if (editing) return;
            setCursor(null);
            markPoint(pointAt(event.currentTarget, event.clientX, event.clientY));
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setDraft(null);
          }}
        >
          {data.imageUrl ? (
            <img src={data.imageUrl} alt={data.imageAlt ?? data.title} draggable={false} />
          ) : (
            <HotspotIllustration sceneType={data.sceneType} />
          )}

          {editing && targets.map((zone) => (
            <span
              key={zone.id}
              className="image-hotspot-rectangle"
              data-active={zone.id === selectedTarget?.id}
              style={rectangleStyle(zone)}
              aria-hidden="true"
            />
          ))}
          {editing && draft && (
            <span className="image-hotspot-rectangle" data-active="true" style={rectangleStyle(draft)} aria-hidden="true" />
          )}
          {!editing && points.map((point, index) => (
            <span
              key={index}
              className="image-hotspot-pin"
              data-result={submitted ? (selectedTargets[index] ? 'correct' : 'incorrect') : undefined}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              aria-hidden="true"
            >
              {submitted ? (selectedTargets[index] ? '✓' : '×') : '•'}
            </span>
          ))}
          {cursor && (
            <span className="image-hotspot-cursor" style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }} aria-hidden="true" />
          )}
        </div>
        <ApaReferenceFooter citation={data.apaCitation} />

        {editing ? (
          <p role="status" className="image-hotspot-hint">{editorMessage}</p>
        ) : (
          <div className="image-hotspot-footer">
            <div role="status" className="image-hotspot-status">
              {submitted ? (
                <>
                  <strong>{isCorrect ? 'Correcto.' : 'Incorrecto.'}</strong>{' '}
                  {isCorrect
                    ? selectedTargets.map((zone) => zone?.feedback).join(' ')
                    : selectedDistractor?.feedback || 'Revisa la imagen y marca lo que pide la consigna.'}
                </>
              ) : (
                `${points.length} de ${requiredCount} ${requiredCount === 1 ? 'punto marcado' : 'puntos marcados'}`
              )}
            </div>
            <div className="image-hotspot-actions">
              <button type="button" disabled={points.length === 0} onClick={() => {
                clearResult();
                setPoints([]);
                setCursor(null);
              }}>Reiniciar</button>
              <button data-quiz-check type="button" disabled={points.length !== requiredCount} onClick={() => {
                setSubmitted(true);
                onScoreChange?.(blockId, isCorrect ? data.points : 0, data.points);
              }}>Comprobar</button>
            </div>
          </div>
        )}
      </div>
    </QuizCardShell>
  );
}


function HotspotIllustration({ sceneType }: { sceneType: ScenarioQuizImageHotspotBlockData['sceneType'] }) {
  return sceneType === 'phishing-email' ? (
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
        );
}
