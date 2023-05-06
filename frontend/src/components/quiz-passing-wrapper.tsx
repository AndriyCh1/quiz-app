import React from 'react';
import Wrapper from './wrapper';
import { useTranslation } from 'react-i18next';
import { GrClose as CloseIcon } from 'react-icons/gr';
import { AiOutlineLeft as BackIcon } from 'react-icons/ai';

import Button from './button';

interface IProps {
  title: string;
  isSelectedAnswer: boolean;
  letChangeAnswer?: boolean;
  currentQuestionNumber: number;
  totalQuestionsNumber: number;
  onBack: () => void;
  onClose: () => void;
  onAnswer?: () => void;
  onFinish: () => void;
}

const QuizPassingWrapper: React.FC<IProps> = (props) => {
  const { t } = useTranslation('', { keyPrefix: 'quizPassingWrapper' });

  const {
    children,
    title,
    isSelectedAnswer,
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
            disabled={!isSelectedAnswer}
          >
            {t('continue')}
          </Button>
        ) : (
          <Button
            className="active-quiz-wrapper__bottom__btn"
            onClick={onFinish}
            disabled={!isSelectedAnswer}
          >
            {t('finish')}
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default QuizPassingWrapper;
