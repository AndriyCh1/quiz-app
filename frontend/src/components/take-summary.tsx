import React from 'react';

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
  const questionsNumberForScale = correct + incorrect + notAnswered;

  return (
    <div className="take-summary">
      <div className="take-summary-left">
        <h4 className="take-summary__title">{title}</h4>
        <div className="take-summary__info">
          <p className="take-summary__info__item">
            correct answers: <em>{correct}</em>
          </p>
          <p className="take-summary__info__item">
            incorrect answers: <em>{incorrect}</em>
          </p>
          <p className="take-summary__info__item">
            not answered: <em>{notAnswered}</em>
          </p>
          <p className="take-summary__info__item">
            score: <em>{score}</em>/<em>{totalScore}</em>
          </p>
        </div>
      </div>
      <div className="take-summary-right">
        <div className="take-summary__answers-scale">
          {correct ? (
            <div
              className="take-summary__answers-scale__unit correct"
              style={{ width: `${(correct / questionsNumberForScale) * 100}%` }}
            ></div>
          ) : null}
          {incorrect ? (
            <div
              className="take-summary__answers-scale__unit incorrect"
              style={{ width: `${(incorrect / questionsNumberForScale) * 100}%` }}
            ></div>
          ) : null}
          {notAnswered ? (
            <div
              className="take-summary__answers-scale__unit notAnswered"
              style={{ width: `${(notAnswered / questionsNumberForScale) * 100}%` }}
            ></div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TakeSummary;
