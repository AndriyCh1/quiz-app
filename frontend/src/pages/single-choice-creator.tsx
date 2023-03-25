import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUniqueId } from '../utils/generate-unique-id';
import { IoMdSave as SaveIcon } from 'react-icons/io';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import SetQuizMeta from '../components/set-quiz-meta';
import Button from '../components/button';

import { UserRoutes } from '../common/enums';
import { IDeepQuiz, IQuiz, IQuestion } from '../common/interfaces';
import { quizzesActions } from '../store/quizzes';
import { useAppDispatch } from '../hooks/useAppDispatch';
import SingleChoice from '../components/single-choice';

interface IMetaData {
  title: string;
  description: string;
}

const QUIZ_TYPE = 'single-choice';
const TEMP_QUIZ_TIME = 100; // TODO: get rid of this

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
    queryConfig: {
      status: 'new',
    },
  } as IQuestion;

  const [notValidFieldError, setNotValidFieldError] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([defaultQuestion]);
  const [questionErrorMessage, setQuestionErrorMessage] = useState('');

  const handleChangeMeta = (data: IMetaData) => setQuizInfo(data);

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
          content: answer.content,
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

  const handleError = (error: string) => setQuestionErrorMessage(error);
  const handleChange = (data: IQuestion[]) => setQuestions(data);

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
        <SetQuizMeta
          className="single-choice-creator__meta-input"
          onChange={handleChangeMeta}
          defaultTitle={quizInfo.title}
          defaultDescription={quizInfo.description}
        />
        <Wrapper className="single-choice-creator-wrapper">
          <SingleChoice data={questions} onError={handleError} onChange={handleChange} />
        </Wrapper>
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
      </Container>
    </Helmet>
  );
};

export default SingleChoiceCreator;
