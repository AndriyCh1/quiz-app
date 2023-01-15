import React, { useEffect, useState } from 'react';

import QuizPassingWrapper from '../components/quiz-passing-wrapper';

import useStopwatch from '../hooks/useStopwatch';
import { alphabetGenerator } from '../utils/alphabet-generator';

interface IPassingQuiz {
  title: string;
  time: number;
  questions: IPassingQuizQuestion[];
}

interface IPassingQuizQuestion {
  id: string;
  content: string;
  answers: IPassingQuizAnswer[];
}

interface IPassingQuizAnswer {
  id: string;
  content: string;
}

interface IProps {
  quiz: IPassingQuiz;
  onBack: (res: { questionId: string }) => void;
  onClose: () => void;
  onAnswer: (res: { questionId: string; answerId: string }) => void;
  onFinish: (res: { time: number }) => void;
}

const PassingCore: React.FC<IProps> = ({ quiz, onBack, onClose, onAnswer, onFinish }) => {
  const stopwatch = useStopwatch();
  const generateAlphabet = alphabetGenerator();

  const [selectedAnswer, setSelectedAnswer] = useState<IPassingQuizAnswer | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => setCurrentQuestionIndex((state) => state + 1);

  const handleSelectAnswer = (answer: IPassingQuizAnswer) => setSelectedAnswer(answer);

  const handleOnBack = () => {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex((state) => state - 1);
    }

    onBack({ questionId: quiz.questions[currentQuestionIndex].id });
  };

  const handleOnAnswer = () => {
    if (selectedAnswer) {
      onAnswer({
        questionId: quiz.questions[currentQuestionIndex].id,
        answerId: selectedAnswer.id,
      });
    }

    setSelectedAnswer(null);
    nextQuestion();
  };

  const handleOnFinish = () => {
    if (selectedAnswer) {
      onAnswer({
        questionId: quiz.questions[currentQuestionIndex].id,
        answerId: selectedAnswer.id,
      });
    }
    setSelectedAnswer(null);
    onFinish({ time: stopwatch.seconds });
    stopwatch.stop();
  };

  useEffect(() => {
    stopwatch.start();
  }, []);

  return (
    <QuizPassingWrapper
      title={quiz.title}
      letChangeAnswer={true}
      isSelectedAnswer={!!selectedAnswer}
      currentQuestionNumber={currentQuestionIndex + 1}
      totalQuestionsNumber={quiz.questions.length}
      onAnswer={handleOnAnswer}
      onClose={onClose}
      onBack={handleOnBack}
      onFinish={handleOnFinish}
    >
      <div className="active-quiz__content">
        <h3 className="active-quiz__content__question">
          {quiz.questions[currentQuestionIndex].content}
        </h3>
        <div className="active-quiz__content__answers">
          {quiz.questions[currentQuestionIndex].answers.map((item, index) => (
            <QuizStartAnswer
              key={index}
              content={item.content}
              sequenceMark={generateAlphabet.next().value}
              isSelected={item.id === selectedAnswer?.id}
              onClick={() => handleSelectAnswer(item)}
            />
          ))}
        </div>
      </div>
    </QuizPassingWrapper>
  );
};

export default PassingCore;

interface IQuizStartAnswerProps {
  sequenceMark: string;
  content: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  isSelected?: boolean;
}

const QuizStartAnswer: React.FC<IQuizStartAnswerProps> = (props) => {
  const { sequenceMark, content, onClick, isSelected = false } = props;

  return (
    <div
      className={`active-quiz__content__answers__item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="active-quiz__content__answers__item__sequence">{sequenceMark}</div>
      <div className="active-quiz__content__answers__item__answer">{content}</div>
    </div>
  );
};
