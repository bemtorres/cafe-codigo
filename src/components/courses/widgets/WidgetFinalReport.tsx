import type {
  BrandPreset,
  FinalReportBlockData,
  ScenarioQuestionItem,
} from '../../../data/courses/courseJsonTypes';

export interface WidgetFinalReportProps {
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
}

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
}: WidgetFinalReportProps) {
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

