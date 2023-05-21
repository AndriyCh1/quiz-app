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
  onClose: () => void;
  onAnswer: (res: { questionId: string; answerId: string }) => void;
  onFinish: (res: { time: number }) => void;
}

const PassingCore: React.FC<IProps> = ({ quiz, onClose, onAnswer, onFinish }) => {
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
            <div
              key={item.id}
              className={`active-quiz__content__answers__item ${
                item.id === selectedAnswer?.id ? 'active' : ''
              }`}
              onClick={() => handleSelectAnswer(item)}
            >
              <div className="active-quiz__content__answers__item__sequence">
                {generateAlphabet.next().value}
              </div>
              <div className="active-quiz__content__answers__item__answer">{item.content}</div>
            </div>
          ))}
        </div>
      </div>
    </QuizPassingWrapper>
  );
};

export default PassingCore;
