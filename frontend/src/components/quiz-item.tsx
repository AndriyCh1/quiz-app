import React from 'react';
import Button from './button';

interface IProps {
  title: string;
  type: string;
  content: string;
  questionCount: number;
  onClick?: () => void;
  onButtonClick?: () => void;
}

const QuizItem: React.FC<IProps> = (props) => {
  const { content, type, title, questionCount, onClick, onButtonClick } = props;

  const withoutPropagationClick = <T extends unknown>(callback: () => void) => {
    return (e: React.MouseEvent<T>) => {
      e.stopPropagation();
      return callback();
    };
  };

  return (
    <div
      className="quiz-item"
      onClick={onClick && withoutPropagationClick<HTMLDivElement>(onClick)}
    >
      <div className="quiz-item__top">
        <h2 className="quiz-item__title">{title}</h2>
        <p className="quiz-item__type">
          <span>{type}</span>
        </p>
        <p className="quiz-item__content">{content}</p>
      </div>
      <div className="quiz-item__bottom">
        <div className="quiz-item__info">
          <p className="quiz-item__info__questions">
            <span>{questionCount}</span> questions
          </p>
          <Button
            className="quiz-item__info__button"
            onClick={onButtonClick && withoutPropagationClick<HTMLButtonElement>(onButtonClick)}
          >
            Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
