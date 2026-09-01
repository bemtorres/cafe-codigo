import type { ExpressChallengeExercise } from './challengesExpressTypes';
import { expressExercisesEasy } from './challengesExpressEasy';
import { expressExercisesMedium } from './challengesExpressMedium';
import { expressExercisesAdvanced } from './challengesExpressAdvanced';

export type { ExpressChallengeExercise } from './challengesExpressTypes';
export { expressExercisesEasy } from './challengesExpressEasy';
export { expressExercisesMedium } from './challengesExpressMedium';
export { expressExercisesAdvanced } from './challengesExpressAdvanced';

// Banco maestro de 90 ejercicios de funciones
export const expressFunctionExercises: ExpressChallengeExercise[] = [
  ...expressExercisesEasy,
  ...expressExercisesMedium,
  ...expressExercisesAdvanced,
];
