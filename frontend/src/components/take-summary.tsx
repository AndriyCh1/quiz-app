import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  correct: number;
  incorrect: number;
  notAnswered: number;
  totalQuestions: number;
  score: number;
  totalScore: number;
}

const TakeSummary: React.FC<IProps> = ({
  title,
  correct,
  incorrect,
  notAnswered,
  totalQuestions,
  totalScore,
  score,
}) => {
  const { t } = useTranslation('', { keyPrefix: 'takeSummary' });

  return (
    <div className="take-summary">
      <div className="take-summary-left">
        <h4 className="take-summary__title">{title}</h4>
        <div className="take-summary__info">
          <p className="take-summary__info__item">
            {t('correctAnswers')}: <em>{correct}</em>
          </p>
          <p className="take-summary__info__item">
            {t('incorrectAnswers')}: <em>{incorrect}</em>
          </p>
          <p className="take-summary__info__item">
            {t('notAnswered')}: <em>{notAnswered}</em>
          </p>
          <p className="take-summary__info__item">
            {t('score')}: <em>{score}</em>/<em>{totalScore}</em>
          </p>
        </div>
      </div>
      <div className="take-summary-right">
        {/* TODO: create a separate component for this*/}
        <div className="take-summary__answers-scale">
          {correct ? (
            <div
              className="take-summary__answers-scale__unit correct"
              style={{ width: `${(correct / totalQuestions) * 100}%` }}
            />
          ) : null}
          {incorrect ? (
            <div
              className="take-summary__answers-scale__unit incorrect"
              style={{ width: `${(incorrect / totalQuestions) * 100}%` }}
            />
          ) : null}
          {notAnswered ? (
            <div
              className="take-summary__answers-scale__unit notAnswered"
              style={{ width: `${(notAnswered / totalQuestions) * 100}%` }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TakeSummary;
