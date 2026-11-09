import { getModuleContents } from './courseDocument';
import type { CourseModule, CourseWidgetBlock, ScenarioQuestionItem } from './courseJsonTypes';

type QuizBlock = Extract<CourseWidgetBlock, { type: `scenario-quiz-${string}` }>;

type ExamQuestionInfo = {
  id: string;
  title: string;
  points: number;
};

export type ExamQuestion = ExamQuestionInfo & (
  | { kind: 'single'; question: ScenarioQuestionItem }
  | { kind: 'widget'; block: QuizBlock }
);

function isQuizBlock(block: CourseWidgetBlock): block is QuizBlock {
  return block.type.startsWith('scenario-quiz-');
}

export function getExamQuestions(module: CourseModule): ExamQuestion[] {
  return getModuleContents(module).flatMap(({ widget }): ExamQuestion[] => {
    if (widget.type === 'scenario-quiz') {
      return widget.data.questions.map((question) => ({
        kind: 'single',
        id: `${widget.id}:${question.id}`,
        title: question.question,
        points: question.points,
        question,
      }));
    }
    if (!isQuizBlock(widget)) return [];
    return [{
      kind: 'widget',
      id: widget.id,
      title: widget.data.title,
      points: widget.data.points,
      block: widget,
    }];
  });
}
