import React, { ChangeEvent } from 'react';
import Toggle from './toggle';
import FormInput from './form-input';
import { AiFillEye as OpenedEyeIcon, AiFillEyeInvisible as ClosedEyeIcon } from 'react-icons/ai';
import { RiCloseFill as RemoveIcon } from 'react-icons/ri';
import { IQuizAnswer } from '../common/interfaces';

interface IProps extends IQuizAnswer {
  onChangeCorrect: (checked: boolean) => void;
  onChangeActive: (active: boolean) => void;
  onChangeContent: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const SingleChoiceAnswer: React.FC<IProps> = ({
  id = '',
  correct = false,
  content,
  active,
  onChangeContent,
  onChangeCorrect,
  onChangeActive,
  onRemove,
}) => {
  return (
    <div className={`single-choice__answers__item ${active ? '' : 'inactive'}`}>
      <div className="single-choice__answers__item__toggle">
        <Toggle onChange={onChangeCorrect} value={id} checked={correct} />
        <span>is correct</span>
      </div>
      <div className="single-choice__answers__item__input-wrapper">
        <FormInput
          name="quiz-answer"
          className="single-choice__answers__item__input"
          placeholder="an answer"
          onChange={onChangeContent}
          value={content}
        />
        {active ? (
          <OpenedEyeIcon
            className="single-choice__answers__item__active"
            onClick={() => onChangeActive(false)}
          />
        ) : (
          <ClosedEyeIcon
            className="single-choice__answers__item__active"
            onClick={() => onChangeActive(true)}
          />
        )}
        <RemoveIcon className="single-choice__answers__item__remove" onClick={onRemove} />
      </div>
    </div>
  );
};

export default SingleChoiceAnswer;
