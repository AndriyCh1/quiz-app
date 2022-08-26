import React from 'react';
import Wrapper from './wrapper';
import { MdSportsScore as ScoreIcon } from 'react-icons/md';
import { GrClose as CloseIcon } from 'react-icons/gr';
import { AiOutlineLeft as BackIcon } from 'react-icons/ai';

import Button from './button';

interface IProps {
  title: string;
  selectedAnswer: boolean;
  currentScore: number;
  totalScore: number;
  showScore?: boolean;
  letChangeAnswer?: boolean;
  currentQuestionNumber: number;
  totalQuestionsNumber: number;
  onBack: () => void;
  onClose: () => void;
  onAnswer: () => void;
  onFinish: () => void;
}

const ActiveQuizWrapper: React.FC<IProps> = (props) => {
  const {
    children,
    title,
    selectedAnswer,
    currentScore,
    totalScore,
    showScore = false,
    letChangeAnswer = false,
    currentQuestionNumber,
    totalQuestionsNumber,
    onBack,
    onClose,
    onAnswer,
    onFinish,
  } = props;

  const passedPercent = (currentQuestionNumber / totalQuestionsNumber) * 100;

  return (
    <Wrapper className="active-quiz-wrapper">
      <div className="active-quiz-wrapper__top">
        {letChangeAnswer && (
          <div className="active-quiz-wrapper__top__back-wrapper">
            <div className="active-quiz-wrapper__top__back" onClick={onBack}>
              <BackIcon className="active-quiz-wrapper__top__back__icon" />
            </div>
          </div>
        )}
        <div className="active-quiz-wrapper__top__info">
          <h1>{title}</h1>
          {showScore && (
            <div className="active-quiz-wrapper__top__score">
              <ScoreIcon className="active-quiz-wrapper__top__score__icon" />
              <span>
                score: {currentScore}/{totalScore}
              </span>
            </div>
          )}
        </div>
        <div className="active-quiz-wrapper__top__close-wrapper">
          <div className="active-quiz-wrapper__top__close" onClick={onClose}>
            <CloseIcon className="active-quiz-wrapper__top__close__icon" />
          </div>
        </div>
      </div>
      {children}
      <div className="active-quiz-wrapper__bottom">
        <div className="active-quiz-wrapper__bottom__chart">
          <div className="active-quiz-wrapper__bottom__chart__line-wrapper">
            <div
              className="active-quiz-wrapper__bottom__chart__line"
              style={{ width: `${passedPercent}%` }}
            />
          </div>
          <div className="active-quiz-wrapper__bottom__chart__info">
            <span>
              {currentQuestionNumber}/{totalQuestionsNumber}
            </span>
          </div>
        </div>
        {currentQuestionNumber !== totalQuestionsNumber ? (
          <Button
            className="active-quiz-wrapper__bottom__btn"
            onClick={onAnswer}
            disabled={!selectedAnswer}
          >
            Continue
          </Button>
        ) : (
          <Button
            className="active-quiz-wrapper__bottom__btn"
            onClick={onFinish}
            disabled={!selectedAnswer}
          >
            Finish
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default ActiveQuizWrapper;
