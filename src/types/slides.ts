/**
 * 🎨 SISTEMA CANÓNICO DE TIPOS E INTERFACES PARA PRESENTACIONES (SLIDES)
 * Contiene todos los tipos de datos para diapositivas, embeds, quizes y metacognición.
 */

export interface CourseSlideProps {
  courseSlug: string;
  lessonSlug: string;
  courseName?: string;
  lessonTitle?: string;
}

export type BarMode = 'visible' | 'autohide' | 'hidden';

export interface EmbedParams {
  isEmbed: boolean;
  showMetaQuestions: boolean;
  showQuiz: boolean;
  institution: string;
  studentName: string;
  studentEmail: string;
  customLogo: string;
  customIcon: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  timerSeconds: number;
}

export interface CodeSnippet {
  filename: string;
  lang: string;
  code: string;
  explanation: string;
}

export interface VisualChart {
  headers: string[];
  rows: string[][];
}

export type SlideType =
  | 'cover'
  | 'concept'
  | 'diagram'
  | 'code'
  | 'summary'
  | 'project'
  | 'quiz_intro'
  | 'quiz_question'
  | 'quiz_q'
  | 'quiz_result'
  | 'quiz_results'
  | 'metacognition';

export interface Slide {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  bulletPoints?: string[];
  codeSnippet?: CodeSnippet;
  visualChart?: VisualChart;
  keyTakeaway?: string;
}

// 🌐 IDENTIFICADORES ESTÁNDAR EN INGLÉS PARA CADA INTERACCIÓN DE EVALUACIÓN
export type InteractionType =
  | 'TrueFalse'         // Verdadero o Falso (o Sí / No según etiquetas)
  | 'MultipleChoice'    // Selección Múltiple
  | 'ReorderSequence'   // Ordenar secuencia de fichas de código
  | 'MatchPairs'        // Unir lista A con lista B
  | 'FillInTheBlank'    // Completar el espacio en blanco en código
  | 'PredictOutput'     // Predecir la salida (print) de un código
  | 'FindTheBug';       // Identificar el error o causa de fallo

export type QuizQuestion =
  | {
      id: number;
      kind: 'TrueFalse';
      title: string;
      questionText: string;
      code?: string;
      correctAnswer: boolean;
      explanation: string;
      labels?: { trueText: string; falseText: string };
    }
  | {
      id: number;
      kind: 'MultipleChoice';
      title: string;
      questionText: string;
      code?: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  | {
      id: number;
      kind: 'ReorderSequence';
      title: string;
      questionText: string;
      tokens: string[];
      correctOrder: string[];
      explanation: string;
    }
  | {
      id: number;
      kind: 'MatchPairs';
      title: string;
      questionText: string;
      pairs: { id: string; left: string; right: string }[];
      explanation: string;
    }
  | {
      id: number;
      kind: 'FillInTheBlank';
      title: string;
      questionText: string;
      code: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  | {
      id: number;
      kind: 'PredictOutput';
      title: string;
      questionText: string;
      code: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  | {
      id: number;
      kind: 'FindTheBug';
      title: string;
      questionText: string;
      code: string;
      options: string[];
      correctOption: number;
      explanation: string;
    };

// 🧠 PREGUNTAS DE METACOGNICIÓN Y AUTOEVALUACIÓN
export interface MetaReflectionQuestion {
  id: number;
  category: 'Generic' | 'CourseSpecific';
  title: string;
  questionText: string;
  promptHint: string;
  keyTakeaway: string;
}
