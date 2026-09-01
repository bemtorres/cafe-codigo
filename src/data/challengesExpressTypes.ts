export interface ExpressChallengeExercise {
  id: number;
  title: string;
  statement: string;
  type: 'complete' | 'fix'; // 'complete' = rellenar faltante, 'fix' = corregir bug
  difficulty: 'facil' | 'medio' | 'avanzado' | 'fácil' | 'intermedio';
  hint: string;
  explanation: string;
  languages: {
    [key: string]: {
      starterCode: string; // Código con blancos '___' o con el bug
      solutionCode: string; // Código correcto resuelto
      acceptedKeywords?: string[]; // Palabras o expresiones válidas para rellenar
      blankCount?: number;
    };
  };
}
