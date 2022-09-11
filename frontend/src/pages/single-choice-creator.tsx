import React, { ChangeEvent, useEffect, useState } from 'react';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import SetQuizMeta from '../components/set-quiz-meta';
import Toggle from '../components/toggle';
import MultilineInput from '../components/multiline-input';
import Button from '../components/button';
import FormInput from '../components/form-input';

import { BsPlusLg as AddIcon } from 'react-icons/bs';
import { RiCloseFill as RemoveIcon } from 'react-icons/ri';
import { generateUniqueId } from '../utils/generate-unique-id';
import { IoMdSave as SaveIcon } from 'react-icons/io';
import { AiFillEye as OpenedEyeIcon } from 'react-icons/ai';
import { AiFillEyeInvisible as ClosedEyeIcon } from 'react-icons/ai';

interface IMetaData {
  title: string;
  description: string;
}

interface IAnswer {
  id: string;
  text: string;
  correct: boolean;
  active: boolean;
}

interface IQuestion {
  id: string;
  content: string;
  score: number;
  active: boolean;
  answers: IAnswer[];
}

const SingleChoiceCreator = () => {
  // TODO: use SET for questions and answers arrays
  const [quizInfo, setQuizInfo] = useState<IMetaData>({ description: '', title: '' });
  const defaultQuestion = {
    active: true,
    content: '',
    answers: [],
    score: 0,
    id: generateUniqueId(),
  };

  const [notValidFieldError, setNotValidFieldError] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const handleChangeMeta = (data: IMetaData) => setQuizInfo(data);

  const handleAddQuestion = () => {
    setQuestions((state) => [...state, defaultQuestion]);
  };

  const handleChangeQuestion = (question: IQuestion) => {
    setQuestions((state) => {
      return state.map((item) => (item.id == question.id ? question : item));
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((state) => {
      return state.filter((item) => item.id !== id);
    });
  };

  const handleSaveQuiz = () => {
    // ToDo: add logic
  };

  const handleSaveAndPublishQuiz = () => {
    // ToDo: add logic
  };

  const checkQuizValidation = (): string => {
    if (!quizInfo.title.trim()) return 'Add a title!';
    if (!quizInfo.description.trim()) return 'Add a description!';
    // TODO: check questions and answers on empty fields as well
    // if (!questionValue.trim()) return 'Add a question!';
    // if (!answers.length) return 'Add an answer!';
    return '';
  };

  useEffect(() => {
    const validationMessage = checkQuizValidation();
    setNotValidFieldError(validationMessage || '');
  }, [quizInfo.title, quizInfo.description]);
  // }, [quizInfo.title, quizInfo.description, questionValue, answers]);

  useEffect(() => {
    setQuestions([defaultQuestion]);
  }, []);

  console.log('render');
  console.log(questions, 'questions');
  return (
    <Helmet title="Single-choice quiz creator">
      <Container className="single-choice-creator">
        <SetQuizMeta className="single-choice-creator__meta-input" onChange={handleChangeMeta} />
        <Wrapper className="single-choice-creator-wrapper">
          {questions.map((item) => (
            <QuestionItem
              key={item.id}
              id={item.id}
              content={item.content}
              score={item.score}
              active={item.active}
              answers={item.answers}
              onChange={(content, answers) => handleChangeQuestion({ ...item, content, answers })}
              onRemove={() => handleRemoveQuestion(item.id)}
              onChangeActive={(active) => handleChangeQuestion({ ...item, active })}
            />
          ))}
          <div className="single-choice-creator__add-question-wrapper">
            <Button className="single-choice-creator__add-question-btn" onClick={handleAddQuestion}>
              <AddIcon className="single-choice-creator__add-question-btn__icon" /> Add new question
            </Button>
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

interface IQuestionItemProps extends IQuestion {
  onChangeActive: (active: boolean) => void;
  onChange: (content: string, answers: IAnswer[]) => void;
  onRemove: () => void;
}

const QuestionItem: React.FC<IQuestionItemProps> = ({
  active,
  onChangeActive,
  onChange,
  onRemove,
}) => {
  const [questionValue, setQuestionValue] = useState('');
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const handleChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionValue(e.target.value);
  };

  const handleAddAnswer = () => {
    setAnswers((state) => [
      ...state,
      { active: true, correct: false, text: '', id: generateUniqueId() },
    ]);
  };

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

  useEffect(() => {
    onChange(questionValue, answers);
  }, [questionValue, answers]);

  return (
    <div className="single-choice-creator__question-wrapper">
      <div className="single-choice-creator__question">
        <MultilineInput
          name="quiz-question"
          className="single-choice-creator__question__input"
          placeholder="Type your question here"
          onChange={handleChangeQuestion}
          value={questionValue}
        />
      </div>
      <div className="single-choice-creator__question-actions-wrapper">
        <span
          className="single-choice-creator__active-question__btn"
          onClick={() => onChangeActive(!active)}
        >
          {active ? (
            <>
              <OpenedEyeIcon className="single-choice-creator__answers__item__active" />
              <span>Hide</span>
            </>
          ) : (
            <>
              <ClosedEyeIcon className="single-choice-creator__answers__item__active" />
              <span>Show</span>
            </>
          )}
        </span>

        <Button className="single-choice-creator__question-action-remove" onClick={onRemove}>
          <RemoveIcon className="single-choice-creator__question-action-remove__icon " /> Remove
        </Button>
        <Button className="single-choice-creator__question-action-add" onClick={handleAddAnswer}>
          <AddIcon className="single-choice-creator__question-action-add__icon" /> Add new answer
        </Button>
      </div>
      <div className="single-choice-creator__answers">
        {answers.map((item) => (
          <AnswerItem
            key={item.id}
            id={item.id}
            text={item.text}
            correct={item.correct}
            active={item.active}
            onChangeContent={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeAnswer({ ...item, text: e.target.value })
            }
            onChangeCorrect={(checked) => handleChangeAnswer({ ...item, correct: checked })}
            onChangeActive={(active) => handleChangeAnswer({ ...item, active })}
            onRemove={() => handleRemoveAnswer(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface IAnswerItemProps extends IAnswer {
  onChangeCorrect: (checked: boolean) => void;
  onChangeActive: (active: boolean) => void;
  onChangeContent: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

const AnswerItem: React.FC<IAnswerItemProps> = ({
  id = '',
  correct = false,
  text,
  active,
  onChangeContent,
  onChangeCorrect,
  onChangeActive,
  onRemove,
}) => {
  return (
    <div className="single-choice-creator__answers__item">
      <div className="single-choice-creator__answers__item__toggle">
        <Toggle onChange={onChangeCorrect} value={id} checked={correct} />
        <span>is correct</span>
      </div>
      <div className="single-choice-creator__answers__item__input-wrapper">
        <FormInput
          name="quiz-answer"
          className="single-choice-creator__answers__item__input"
          placeholder="an answer"
          onChange={onChangeContent}
          value={text}
        />
        {active ? (
          <OpenedEyeIcon
            className="single-choice-creator__answers__item__active"
            onClick={() => onChangeActive(false)}
          />
        ) : (
          <ClosedEyeIcon
            className="single-choice-creator__answers__item__active"
            onClick={() => onChangeActive(true)}
          />
        )}
        <RemoveIcon className="single-choice-creator__answers__item__remove" onClick={onRemove} />
      </div>
    </div>
  );
};

export default SingleChoiceCreator;
