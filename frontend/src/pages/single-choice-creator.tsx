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
import { useAppDispatch } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';
import { IDeepQuiz, IQuiz } from '../common/interfaces';
import { useNavigate } from 'react-router-dom';
import { UserRoutes } from '../common/enums';

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

const QUIZ_TYPE = 'single-choice';
const TEMP_QUIZ_TIME = 100;

const SingleChoiceCreator = () => {
  // TODO: use SET for questions and answers arrays
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quizCreateErrorMessage, setQuizCreateErrorMessage] = useState('');

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
  const [questionErrorMessage, setQuestionErrorMessage] = useState('');

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

  const handleSaveQuiz = (options: { publish: boolean }) => {
    const totalScore = questions.reduce((acc: number, cur: IQuestion) => acc + cur.score, 0);

    const quiz: IDeepQuiz = {
      title: quizInfo.title,
      type: QUIZ_TYPE,
      published: options.publish,
      score: totalScore,
      content: quizInfo.description,
      time: TEMP_QUIZ_TIME,
      questions: questions.map((question) => ({
        active: question.active,
        type: QUIZ_TYPE,
        score: question.score,
        content: question.content,
        answers: question.answers.map((answer) => ({
          active: answer.active,
          correct: answer.correct,
          content: answer.text,
        })),
      })),
    };

    dispatch(quizzesActions.create(quiz))
      .unwrap()
      .then((res: IQuiz) => {
        navigate(`${UserRoutes.QuizInfo.replace(':id', res.id)}`);
      })
      .catch(() =>
        setQuizCreateErrorMessage('Oops, something went wrong, your quiz wasn`t created'),
      );
  };

  const checkQuizValidation = (): string => {
    if (!quizInfo.title.trim()) return 'Add a title!';
    if (!quizInfo.description.trim()) return 'Add a description!';
    if (questionErrorMessage) return questionErrorMessage;
    return '';
  };

  useEffect(() => {
    const validationMessage = checkQuizValidation();
    setNotValidFieldError(validationMessage || '');
  }, [quizInfo.title, quizInfo.description, questionErrorMessage]);

  useEffect(() => {
    setQuestions([defaultQuestion]);
  }, []);

  if (quizCreateErrorMessage) {
    return (
      <Helmet title="Single-choice quiz creator">
        <Container className="single-choice-creator">
          <Wrapper>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <span>{quizCreateErrorMessage}. Try one more time.</span>
            </div>
          </Wrapper>
        </Container>
      </Helmet>
    );
  }
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
              onChange={(content, answers, active, score) =>
                handleChangeQuestion({ ...item, content, answers, active, score })
              }
              onRemove={() => handleRemoveQuestion(item.id)}
              onError={(message) => setQuestionErrorMessage(message)}
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
              onClick={() => handleSaveQuiz({ publish: false })}
              disabled={!!notValidFieldError}
              tooltip={notValidFieldError || ''}
            >
              <SaveIcon className="single-choice-creator__save-quiz-btn__icon" /> Create
            </Button>
            <Button
              className="single-choice-creator__save-quiz-btn"
              onClick={() => handleSaveQuiz({ publish: true })}
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
  // onChangeActive: (active: boolean) => void;
  onChange: (content: string, answers: IAnswer[], active: boolean, score: number) => void;
  onRemove: () => void;
  onError: (message: string) => void;
}

const QuestionItem: React.FC<IQuestionItemProps> = ({ active, onChange, onRemove, onError }) => {
  const [questionValue, setQuestionValue] = useState('');
  const [isActive, setIsActive] = useState(active);
  const [score, setScore] = useState('');
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const handleChangeQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionValue(e.target.value);
  };
  const handleChangeActive = (active: boolean) => setIsActive(active);

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

  const handleChangeScore = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(Number(e.target.value) <= 0)) {
      setScore(e.target.value);
    }
  };

  const checkQuestionValidation = (): string => {
    if (!questionValue.trim()) return 'Some question text is empty';
    if (!answers.length) return 'Some question does not have answers!';
    if (score === '') return 'Some question score isn`t set!';
    const hasEmptyAnswer = answers.find((item) => item.text !== '');
    if (!hasEmptyAnswer) return 'Some answer is empty!';
    return '';
  };

  useEffect(() => {
    onChange(questionValue, answers, isActive, score ? Number(score) : 0);
    onError(checkQuestionValidation());
  }, [questionValue, answers, score, isActive]);

  return (
    <div className={`single-choice-creator__question-wrapper ${active ? '' : 'inactive'}`}>
      <div className="single-choice-creator__question">
        <MultilineInput
          name="quiz-question"
          className="single-choice-creator__question__input"
          placeholder="Type your question here"
          onChange={handleChangeQuestion}
          value={questionValue}
        />
      </div>
      <div className="single-choice-creator__question-actions">
        <div className="single-choice-creator__question-actions__inputs">
          <FormInput
            name="quiz-answer"
            className="single-choice-creator__question-actions__score"
            placeholder="score"
            onChange={handleChangeScore}
            type="number"
            value={score}
          />
          <div
            className="single-choice-creator__question-actions__active"
            onClick={() => handleChangeActive(!active)}
          >
            {active ? (
              <>
                <OpenedEyeIcon className="single-choice-creator__question__active" />
                <span>hide</span>
              </>
            ) : (
              <>
                <ClosedEyeIcon className="single-choice-creator__question__active" />
                <span>show</span>
              </>
            )}
          </div>
        </div>
        <div className="single-choice-creator__question-actions__btns">
          <Button className="single-choice-creator__question-action-remove" onClick={onRemove}>
            <RemoveIcon className="single-choice-creator__question-action-remove__icon " /> Remove
          </Button>
          <Button className="single-choice-creator__question-action-add" onClick={handleAddAnswer}>
            <AddIcon className="single-choice-creator__question-action-add__icon" /> Add new answer
          </Button>
        </div>
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
    <div className={`single-choice-creator__answers__item ${active ? '' : 'inactive'}`}>
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
