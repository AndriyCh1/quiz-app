import React, { ChangeEvent, useEffect, useState } from 'react';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import SetTitle from '../components/set-title';
import Toggle from '../components/toggle';
import MultilineInput from '../components/multiline-input';
import Button from '../components/button';
import FormInput from '../components/form-input';

import { BsPlusLg as AddIcon } from 'react-icons/bs';
import { RiCloseFill as RemoveIcon } from 'react-icons/ri';
import { generateUniqueId } from '../utils/generate-unique-id';
import { IoMdSave as SaveIcon } from 'react-icons/io';

interface IProps {}

interface IAnswer {
  id: string;
  text: string;
  correct: boolean;
}

const SingleChoiceCreator: React.FC<IProps> = ({}) => {
  const [titleValue, setTitleValue] = useState('');
  const [questionValue, setQuestionValue] = useState('');
  const [notValidFieldError, setNotValidFieldError] = useState('');

  const initAnswer: IAnswer = { id: '', correct: false, text: '' };

  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitleValue(e.target.value);
  const handleClearTitle = () => setTitleValue('');

  const handleChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestionValue(e.target.value);

  const handleAddAnswer = () =>
    setAnswers((state) => [...state, { ...initAnswer, id: generateUniqueId() }]);

  const handleChangeAnswer = (answer: IAnswer) => {
    setAnswers((state) => {
      return state.map((item) => (item.id == answer.id ? answer : item));
    });
  };

  const handleRemoveAnswer = (id: string) => {
    setAnswers((state) => {
      return state.filter((item) => item.id !== id);
    });
  };

  const handleSaveQuiz = () => {
    console.log(answers);
  };

  const handleSaveAndPublishQuiz = () => {
    console.log(answers);
  };

  const checkQuizValidation = (): string => {
    if (!titleValue.trim()) return 'Add a title!';
    if (!questionValue.trim()) return 'Add a question!';
    if (!answers.length) return 'Add an answer!';
    return '';
  };

  useEffect(() => {
    const validationMessage = checkQuizValidation();
    setNotValidFieldError(!validationMessage ? '' : validationMessage);
  }, [titleValue, questionValue, answers]);

  return (
    <Helmet title="Single-choice quiz creator">
      <Container className="single-choice-creator">
        <SetTitle
          className="single-choice-creator__title-input"
          placeholder="Enter a title for this quiz"
          onChange={handleChangeTitle}
          onClear={handleClearTitle}
          value={titleValue}
        />
        <Wrapper className="single-choice-creator-wrapper">
          <div className="single-choice-creator__question">
            <MultilineInput
              name="quiz-question"
              className="single-choice-creator__question__input"
              placeholder="Type your question here"
              onChange={handleChangeQuestion}
              value={questionValue}
            />
          </div>
          <div className="single-choice-creator__add-answer-wrapper">
            <Button className="single-choice-creator__add-answer-btn" onClick={handleAddAnswer}>
              <AddIcon className="single-choice-creator__add-answer-btn__icon" /> Add new answer
            </Button>
          </div>
          <div className="single-choice-creator__answers">
            {answers.map((item) => (
              <AnswerItem
                key={item.id}
                id={item.id}
                text={item.text}
                correct={item.correct}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeAnswer({ ...item, text: e.target.value })
                }
                onCheck={(checked) => handleChangeAnswer({ ...item, correct: checked })}
                onRemove={() => handleRemoveAnswer(item.id)}
              />
            ))}
          </div>
          <div className="single-choice-creator__save-quiz-wrapper">
            <Button
              className="single-choice-creator__save-quiz-btn"
              onClick={handleSaveQuiz}
              disabled={!!notValidFieldError}
              tooltip={notValidFieldError || ''}
            >
              <SaveIcon className="single-choice-creator__save-quiz-btn__icon" /> Create
            </Button>
            <Button
              className="single-choice-creator__save-quiz-btn"
              onClick={handleSaveAndPublishQuiz}
              disabled={!!notValidFieldError}
              tooltip={notValidFieldError || ''}
            >
              <SaveIcon className="single-choice-creator__save-quiz-btn__icon" /> Create and publish
            </Button>
          </div>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

interface IAnswerItemProps extends IAnswer {
  onCheck: (checked: boolean) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const AnswerItem: React.FC<IAnswerItemProps> = ({
  id = '',
  correct = false,
  text,
  onChange,
  onCheck,
  onRemove,
}) => {
  return (
    <div className="single-choice-creator__answers__item">
      <div className="single-choice-creator__answers__item__toggle">
        <Toggle onChange={onCheck} value={id} checked={correct} />
        <span>is correct</span>
      </div>
      <div className="single-choice-creator__answers__item__input-wrapper">
        <FormInput
          name="quiz-answer"
          className="single-choice-creator__answers__item__input"
          placeholder="an answer"
          onChange={onChange}
          value={text}
        />
        <RemoveIcon className="single-choice-creator__answers__item__remove" onClick={onRemove} />
      </div>
    </div>
  );
};

export default SingleChoiceCreator;
