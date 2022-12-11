import React, { ChangeEvent, useEffect, useState } from 'react';

import { AiFillEye as OpenedEyeIcon, AiFillEyeInvisible as ClosedEyeIcon } from 'react-icons/ai';
import { RiCloseFill as RemoveIcon } from 'react-icons/ri';
import { BsPlusLg as AddIcon } from 'react-icons/bs';

import MultilineInput from './multiline-input';
import FormInput from './form-input';
import Button from './button';
import SingleChoiceAnswer from './single-choice-answer';

import { generateUniqueId } from '../utils/generate-unique-id';
import { IQuizAnswer, IQuizQuestion } from '../common/interfaces';
import { IAnswer } from '../common/interfaces/quizzes';

interface IProps extends IQuizQuestion {
  onChange: (content: string, answers: IAnswer[], active: boolean, score: number) => void;
  onRemove: () => void;
  onError: (message: string) => void;
  defaultAnswers: IQuizAnswer[];
}

const SingleChoiceQuestion: React.FC<IProps> = ({
  active,
  content,
  score,
  defaultAnswers,
  onChange,
  onRemove,
  onError,
}) => {
  const [questionValue, setQuestionValue] = useState(content || '');
  const [isActive, setIsActive] = useState(active);
  const [questionScore, setQuestionScore] = useState(score || '');
  const [answers, setAnswers] = useState<IAnswer[]>(
    defaultAnswers.map((item) => ({ ...item, queryConfig: { status: 'fetched' } })),
  );

  const handleChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionValue(e.target.value);
  };
  const handleChangeActive = (active: boolean) => setIsActive(active);

  const propAnswer = {
    active: true,
    correct: false,
    content: '',
    id: generateUniqueId(),
    queryConfig: { status: 'new' },
  } as IAnswer;

  const handleAddAnswer = () => {
    setAnswers((state) => [...state, propAnswer]);
  };

  const handleChangeAnswer = (answer: IAnswer) => {
    setAnswers((state) => {
      return state.map((item) => {
        if (item.queryConfig.status === 'fetched') {
          return item.id === answer.id ? { ...answer, queryConfig: { status: 'edited' } } : item;
        }
        return item.id === answer.id ? answer : item;
      });
    });
  };

  const handleRemoveAnswer = (id: string) => {
    setAnswers((state) => {
      const stateWithStatuses = state.map((item) => {
        if (item.queryConfig.status === 'fetched' && item.id === id) {
          return { ...item, queryConfig: { status: 'deleted' } } as IAnswer;
        }

        return item;
      });

      return stateWithStatuses.filter(
        (item) => item.id !== id || item.queryConfig.status === 'deleted',
      );
    });
  };

  const handleChangeScore = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(Number(e.target.value) <= 0)) {
      setQuestionScore(e.target.value);
    }
  };

  const checkQuestionValidation = (): string => {
    if (!questionValue.trim()) return 'Some question`s text is empty';
    if (!answers.length) return 'Some question does not have answers!';
    if (questionScore === '') return 'Some question`s score isn`t set!';
    const hasEmptyAnswer = answers.find((item) => item.content !== '');
    if (!hasEmptyAnswer) return 'Some answer is empty!';
    return '';
  };

  useEffect(() => {
    onChange(questionValue, answers, isActive, questionScore ? Number(questionScore) : 0);
    onError(checkQuestionValidation());
  }, [questionValue, answers, questionScore, isActive]);

  // TODO: use this also on the creator page
  useEffect(() => {
    return () => {
      onError('');
    };
  }, []);

  return (
    <div className={`single-choice__question-wrapper ${active ? '' : 'inactive'}`}>
      <div className="single-choice__question">
        <MultilineInput
          name="quiz-question"
          className="single-choice__question__input"
          placeholder="Type your question here"
          onChange={handleChangeQuestion}
          value={questionValue}
        />
      </div>
      <div className="single-choice__question-actions">
        <div className="single-choice__question-actions__inputs">
          <FormInput
            name="quiz-answer"
            className="single-choice__question-actions__score"
            placeholder="score"
            onChange={handleChangeScore}
            type="number"
            value={questionScore.toString()}
          />
          <div
            className="single-choice__question-actions__active"
            onClick={() => handleChangeActive(!active)}
          >
            {active ? (
              <>
                <OpenedEyeIcon className="single-choice__question__active" />
                <span>hide</span>
              </>
            ) : (
              <>
                <ClosedEyeIcon className="single-choice__question__active" />
                <span>show</span>
              </>
            )}
          </div>
        </div>
        <div className="single-choice__question-actions__btns">
          <Button className="single-choice__question-action-remove" onClick={onRemove}>
            <RemoveIcon className="single-choice__question-action-remove__icon " /> Remove
          </Button>
          <Button className="single-choice__question-action-add" onClick={handleAddAnswer}>
            <AddIcon className="single-choice__question-action-add__icon" /> Add new answer
          </Button>
        </div>
      </div>
      <div className="single-choice__answers">
        {answers.map((item) => {
          if (item.queryConfig.status !== 'deleted') {
            return (
              <SingleChoiceAnswer
                key={item.id}
                id={item.id}
                content={item.content}
                correct={item.correct}
                active={item.active}
                onChangeContent={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeAnswer({ ...item, content: e.target.value })
                }
                onChangeCorrect={(correct) => handleChangeAnswer({ ...item, correct })}
                onChangeActive={(active) => handleChangeAnswer({ ...item, active })}
                onRemove={() => handleRemoveAnswer(item.id)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
