import { useCallback, useEffect } from 'react';
import type { BrandPreset } from '../../data/courses/courseJsonTypes';
import type { ExamQuestion } from '../../data/courses/examQuestions';
import { QuizAttemptContext } from './widgets/QuizAttemptContext';
import { WidgetScenarioQuiz } from './widgets/WidgetScenarioQuiz';
import {
  WidgetScenarioQuizBranching,
  WidgetScenarioQuizDragAndDrop,
  WidgetScenarioQuizFillBlank,
  WidgetScenarioQuizHotspotSpotter,
  WidgetScenarioQuizImageChoice,
  WidgetScenarioQuizImageHotspot,
  WidgetScenarioQuizMatching,
  WidgetScenarioQuizMultiple,
  WidgetScenarioQuizOrdering,
  WidgetScenarioQuizRiskSlider,
  WidgetScenarioQuizTrueFalseMatrix,
} from './widgets/ScenarioQuizSuiteWidgets';

const ignore = () => {};

export function ExamQuestionView({ question, brand, answer, mode, saveAnswer = ignore, reportScore }: {
  question: ExamQuestion;
  brand: BrandPreset;
  answer: unknown;
  mode: 'exam' | 'review';
  saveAnswer?: (answer: unknown) => void;
  reportScore?: (questionId: string, earned: number) => void;
}) {
  const recordScore = useCallback((earned: number) => {
    reportScore?.(question.id, earned);
  }, [question.id, reportScore]);
  const selected = typeof answer === 'string' ? answer : '';
  const singleScore = question.kind === 'single' &&
    question.question.options.some((option) => option.id === selected && option.isCorrect) ? question.points : 0;

  useEffect(() => {
    if (mode === 'review' && question.kind === 'single') recordScore(singleScore);
  }, [mode, question.kind, recordScore, singleScore]);

  function renderQuestion() {
    if (question.kind === 'single') {
      const item = question.question;
      return (
        <WidgetScenarioQuiz
          data={{ questions: [item], reportTargetId: '' }}
          brand={brand}
          activeScenarioIdx={0}
          onSelectScenarioIdx={ignore}
          selectedOptions={{ [item.id]: selected }}
          submittedQuestions={{ [item.id]: mode === 'review' }}
          onSelectOption={(_, optionId) => { if (mode === 'exam') saveAnswer(optionId); }}
          onSubmitQuestion={ignore}
          earnedQuizScore={mode === 'review' ? singleScore : 0}
          maxQuizScore={question.points}
          onViewReport={ignore}
        />
      );
    }

    const block = question.block;
    const props = { blockId: block.id, brand };
    switch (block.type) {
      case 'scenario-quiz-multiple':
        return <WidgetScenarioQuizMultiple {...props} data={block.data} />;
      case 'scenario-quiz-drag-drop':
        return <WidgetScenarioQuizDragAndDrop {...props} data={block.data} />;
      case 'scenario-quiz-ordering':
        return <WidgetScenarioQuizOrdering {...props} data={block.data} />;
      case 'scenario-quiz-matching':
        return <WidgetScenarioQuizMatching {...props} data={block.data} />;
      case 'scenario-quiz-fill-blank':
        return <WidgetScenarioQuizFillBlank {...props} data={block.data} />;
      case 'scenario-quiz-branching':
        return <WidgetScenarioQuizBranching {...props} data={block.data} />;
      case 'scenario-quiz-matrix':
        return <WidgetScenarioQuizTrueFalseMatrix {...props} data={block.data} />;
      case 'scenario-quiz-spotter':
        return <WidgetScenarioQuizHotspotSpotter {...props} data={block.data} />;
      case 'scenario-quiz-image-hotspot':
        return <WidgetScenarioQuizImageHotspot {...props} data={block.data} />;
      case 'scenario-quiz-image-choice':
        return <WidgetScenarioQuizImageChoice {...props} data={block.data} />;
      case 'scenario-quiz-risk-slider':
        return <WidgetScenarioQuizRiskSlider {...props} data={block.data} />;
    }
  }

  return (
    <QuizAttemptContext.Provider value={{ mode, answer, saveAnswer, reportScore: recordScore }}>
      <fieldset className="exam-quiz" disabled={mode === 'review'} data-exam-mode={mode}>
        <legend className="sr-only">{question.title}</legend>
        {renderQuestion()}
      </fieldset>
    </QuizAttemptContext.Provider>
  );
}
