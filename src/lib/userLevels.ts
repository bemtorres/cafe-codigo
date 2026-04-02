/**
 * Niveles de usuario (café) — se desbloquean según puntos de competencia / concursos.
 * Las imágenes viven en `public/badges/` (SVG de ejemplo; podés reemplazar por PNG con el mismo nombre base).
 */

export type UserLevelCode = 'americano' | 'latte' | 'macchiato' | 'espresso' | 'ristretto';

export type UserLevelDefinition = {
  code: UserLevelCode;
  /** Nombre visible (Americano, Latte, …) */
  name: string;
  /** Puntos mínimos para estar en este nivel (inclusive) */
  minPoints: number;
  /** Color principal (borde, acentos UI) */
  colorHex: string;
  /** Ruta pública al badge */
  badgeUrl: string;
  /** Frase corta bajo el nombre del nivel */
  comment: string;
  /** Texto para tooltip / detalle de perfil */
  description: string;
  /** Mensaje al subir de nivel (notificaciones futuras) */
  levelUpMessage: string;
};

export const USER_LEVELS: readonly UserLevelDefinition[] = [
  {
    code: 'americano',
    name: 'Americano',
    minPoints: 0,
    colorHex: '#8B6F47',
    badgeUrl: '/badges/americano.svg',
    comment: 'Café para todos. Estás comenzando tu viaje.',
    description: 'Usuario básico con acceso a funciones esenciales.',
    levelUpMessage: '¡Bienvenido! Tu primera taza te espera.',
  },
  {
    code: 'latte',
    name: 'Latte',
    minPoints: 100,
    colorHex: '#D2691E',
    badgeUrl: '/badges/latte.svg',
    comment: 'Suave pero con cuerpo. Ya tenés experiencia.',
    description: 'Usuario activo con funciones avanzadas desbloqueadas.',
    levelUpMessage: '¡Subiste de nivel! Ahora sos parte del club Latte.',
  },
  {
    code: 'macchiato',
    name: 'Macchiato',
    minPoints: 500,
    colorHex: '#B87333',
    badgeUrl: '/badges/macchiato.svg',
    comment: 'Dejaste tu marca. Sos un experto reconocido.',
    description: 'Usuario destacado con privilegios especiales y mentoría.',
    levelUpMessage: '¡Felicidades! Tu huella está marcada en el sistema.',
  },
  {
    code: 'espresso',
    name: 'Espresso',
    minPoints: 1000,
    colorHex: '#1A1A1A',
    badgeUrl: '/badges/espresso.svg',
    comment: 'Puro y directo. Sin distracciones, solo resultados.',
    description: 'Usuario premium con acceso total y prioridad en soporte.',
    levelUpMessage: 'Bienvenido a la élite. El café más intenso te espera.',
  },
  {
    code: 'ristretto',
    name: 'Ristretto',
    minPoints: 2500,
    colorHex: '#C9A227',
    badgeUrl: '/badges/ristretto.svg',
    comment: 'La esencia pura. Solo los mejores llegan acá.',
    description: 'Usuario legendario con beneficios exclusivos y reconocimiento especial.',
    levelUpMessage: 'Eres una leyenda! La concentración máxima del sistema.',
  },
] as const;

export function getLevelForPoints(points: number): UserLevelDefinition {
  const p = Math.max(0, Math.floor(points));
  let current = USER_LEVELS[0]!;
  for (const lvl of USER_LEVELS) {
    if (p >= lvl.minPoints) current = lvl;
  }
  return current;
}

export type LevelProgress = {
  current: UserLevelDefinition;
  next: UserLevelDefinition | null;
  points: number;
  /** puntos desde el mínimo del nivel actual */
  pointsInCurrentTier: number;
  /** puntos que faltan para el siguiente nivel (null si ya es el máximo) */
  pointsToNext: number | null;
  /** 0–100 hacia el siguiente nivel */
  pctToNext: number;
};

export function getLevelProgress(points: number): LevelProgress {
  const p = Math.max(0, Math.floor(points));
  const current = getLevelForPoints(p);
  const idx = USER_LEVELS.findIndex((l) => l.code === current.code);
  const next = idx >= 0 && idx < USER_LEVELS.length - 1 ? USER_LEVELS[idx + 1]! : null;

  const pointsInCurrentTier = p - current.minPoints;
  if (!next) {
    return {
      current,
      next: null,
      points: p,
      pointsInCurrentTier,
      pointsToNext: null,
      pctToNext: 100,
    };
  }

  const span = next.minPoints - current.minPoints;
  const toNext = Math.max(0, next.minPoints - p);
  const pct = span <= 0 ? 100 : Math.min(100, Math.round((pointsInCurrentTier / span) * 100));

  return {
    current,
    next,
    points: p,
    pointsInCurrentTier,
    pointsToNext: toNext,
    pctToNext: pct,
  };
}
