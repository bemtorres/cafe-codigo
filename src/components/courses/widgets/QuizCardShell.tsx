import { useContext, useEffect } from 'react';
import type { BrandPreset } from '../../../data/courses/courseJsonTypes';
import { QuizAttemptContext } from './QuizAttemptContext';

export interface QuizCardShellProps {
  badge: string;
  points: number;
  title: string;
  context: string;
  brand: BrandPreset;
  earnedPoints: number;
  submitted: boolean;
  variant?: 'board';
  children: React.ReactNode;
}

export function QuizCardShell({
  badge,
  points,
  title,
  context,
  brand,
  earnedPoints,
  submitted,
  variant,
  children,
}: QuizCardShellProps) {
  const isBoard = variant === 'board';
  const attempt = useContext(QuizAttemptContext);
  const reportScore = attempt?.reportScore;
  const reviewScore = attempt?.answer === undefined ? 0 : earnedPoints;

  useEffect(() => {
    if (attempt?.mode === 'review') reportScore?.(reviewScore);
  }, [attempt?.mode, reportScore, reviewScore]);

  return (
    <div style={{
      maxWidth: isBoard ? '1080px' : '820px',
      margin: '0 auto',
      padding: isBoard ? '32px clamp(8px, 3%, 32px)' : '56px 24px',
    }}>
      <div
        className="exam-quiz-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: isBoard ? undefined : '0 20px 50px rgba(15, 23, 42, 0.14)',
          border: '1px solid #E2E8F0',
          borderTop: `${isBoard ? 2 : 5}px solid ${brand.primary}`,
          padding: isBoard ? 'clamp(12px, 3%, 28px)' : '40px 44px',
          overflowWrap: isBoard ? 'anywhere' : undefined,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 900,
              color: isBoard ? brand.primaryDark : brand.primary,
              backgroundColor: isBoard ? 'transparent' : brand.primaryLight,
              padding: isBoard ? 0 : '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '999px',
                backgroundColor: submitted
                  ? earnedPoints === points
                    ? '#DCFCE7'
                    : earnedPoints > 0
                      ? '#FEF3C7'
                      : '#FEE2E2'
                  : '#F1F5F9',
                color: submitted
                  ? earnedPoints === points
                    ? '#166534'
                    : earnedPoints > 0
                      ? '#92400E'
                      : '#991B1B'
                  : '#334155',
              }}
            >
              {submitted ? `Puntaje obtenido: ${attempt ? reviewScore : earnedPoints} / ${points} PTS` : `Valor: +${points} PTS`}
            </span>
          </div>
        </div>

        <h3
          style={{
            fontSize: '23px',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 10px 0',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        <p
          className="exam-quiz-context"
          style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#475569',
            margin: isBoard ? '0 0 16px' : '0 0 24px 0',
            paddingBottom: isBoard ? 0 : '18px',
            borderBottom: isBoard ? undefined : '1px solid #E2E8F0',
          }}
        >
          {context}
        </p>

        {children}
      </div>
    </div>
  );
}

