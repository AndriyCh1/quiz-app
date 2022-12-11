import React from 'react';
import Button from './button';

interface IProps {
  title: string;
  type: string;
  content: string;
  questionCount: number;
  onClick?: () => void;
  onStart?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const QuizItem: React.FC<IProps> = (props) => {
  const { content, type, title, questionCount, onClick, onStart, onDelete, onEdit } = props;

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
          <div className="quiz-item__actions">
            <Button
              className="quiz-item__actions__button"
              onClick={onStart && withoutPropagationClick<HTMLButtonElement>(onStart)}
            >
              Start
            </Button>
            {onDelete ? (
              <>
                <Button
                  className="quiz-item__actions__button"
                  onClick={onDelete && withoutPropagationClick<HTMLButtonElement>(onDelete)}
                >
                  Delete
                </Button>
                <Button
                  className="quiz-item__actions__button"
                  onClick={onEdit && withoutPropagationClick<HTMLButtonElement>(onEdit)}
                >
                  Edit
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizItem;
