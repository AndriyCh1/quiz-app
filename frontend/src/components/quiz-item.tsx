import React from 'react';
import Button from './button';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('', { keyPrefix: 'quizItem' });

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
            <span>{questionCount}</span> {t('questions')}
          </p>
          <div className="quiz-item__actions">
            <Button
              className="quiz-item__actions__button"
              onClick={onStart && withoutPropagationClick<HTMLButtonElement>(onStart)}
            >
              {t('start')}
            </Button>
            {onDelete ? (
              <>
                <Button
                  className="quiz-item__actions__button"
                  onClick={onDelete && withoutPropagationClick<HTMLButtonElement>(onDelete)}
                >
                  {t('delete')}
                </Button>
                <Button
                  className="quiz-item__actions__button"
                  onClick={onEdit && withoutPropagationClick<HTMLButtonElement>(onEdit)}
                >
                  {t('edit')}
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
