import { useMemo } from 'react';
import { getLevelProgress, type UserLevelDefinition } from '../../lib/userLevels';

type Props = {
  /** Puntos de competencia / concursos (columna `competition_points` del perfil). */
  competitionPoints: number;
};

function BadgeImage({ level }: { level: UserLevelDefinition }) {
  return (
    <img
      src={level.badgeUrl}
      alt=""
      width={72}
      height={72}
      className="h-18 w-18 shrink-0 rounded-2xl border-[3px] border-border bg-white object-contain p-1 shadow-[3px_3px_0px_#1E1210] md:h-20 md:w-20"
      loading="lazy"
      decoding="async"
    />
  );
}

export default function UserLevelCard({ competitionPoints }: Props) {
  const progress = useMemo(() => getLevelProgress(competitionPoints), [competitionPoints]);

  return (
    <section
      className="rounded-3xl border-[3px] border-border bg-white p-5 shadow-[5px_5px_0px_#1E1210] md:p-6"
      aria-labelledby="user-level-heading"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        <BadgeImage level={progress.current} />
        <div className="min-w-0 flex-1">
          <p className="m-0 font-nunito text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-textMuted">Nivel cafetero</p>
          <h3 id="user-level-heading" className="mt-1 m-0 font-nunito text-xl font-black text-textPrimary md:text-2xl">
            {progress.current.name}
          </h3>
          <p className="mt-2 m-0 font-nunito text-sm font-[650] text-textSecondary">{progress.current.comment}</p>
          <p className="mt-2 m-0 max-w-prose font-nunito text-xs font-semibold leading-relaxed text-textMuted">
            {progress.current.description}
          </p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-nunito text-sm font-black text-textPrimary">
              {progress.points} pts
            </span>
            {progress.next ? (
              <span className="font-nunito text-xs font-bold text-textMuted">
                Siguiente: <strong className="text-textPrimary">{progress.next.name}</strong> — faltan{' '}
                <strong className="text-textPrimary">{progress.pointsToNext}</strong> pts
              </span>
            ) : (
              <span className="font-nunito text-xs font-black uppercase tracking-wide text-[#C9A227]">Nivel máximo</span>
            )}
          </div>

          {progress.next ? (
            <div className="mt-3">
              <div
                className="h-3 w-full overflow-hidden rounded-full border-2 border-border bg-tertiary/60"
                role="progressbar"
                aria-valuenow={progress.pctToNext}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progreso hacia ${progress.next.name}`}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-500 ease-out"
                  style={{
                    width: `${progress.pctToNext}%`,
                    backgroundColor: progress.current.colorHex,
                  }}
                />
              </div>
              <p className="mt-1.5 m-0 font-nunito text-[0.65rem] font-bold text-textMuted">
                Progreso hacia {progress.next.name}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <p className="mt-4 border-t-2 border-dashed border-border pt-4 m-0 font-nunito text-[0.7rem] font-semibold text-textMuted">
        Los puntos se suman por participación en concursos y desafíos. Pronto vas a ver acá cada actualización.
      </p>
    </section>
  );
}
