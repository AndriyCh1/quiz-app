import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IoMdSave as SaveIcon } from 'react-icons/io';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Button from '../components/button';
import SingleChoice from '../components/single-choice';
import SetQuizMeta from '../components/set-quiz-meta';
import Loading from './loading';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';

import { UserRoutes } from '../common/enums';
import { IQuestion } from '../common/interfaces';

interface IMetaData {
  title: string;
  description: string;
}

const QUIZ_TYPE = 'single-choice';
const TEMP_QUIZ_TIME = 100;

const SingleChoiceEditor = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { quiz, isLoadingQuiz } = useAppSelector((state) => state.quizzes);

  const { id } = useParams();

  const [quizErrorMessage, setQuizErrorMessage] = useState('');

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [quizInfo, setQuizInfo] = useState<IMetaData>({ description: '', title: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeMeta = (data: IMetaData) => setQuizInfo(data);

  const handleUpdateQuiz = () => {
    if (!quiz) {
      setQuizErrorMessage('No quiz to update');
      return;
    }

    const totalScore = questions.reduce((acc: number, cur: IQuestion) => acc + cur.score, 0);

    const quizToUpdate: any = {
      id: quiz.id,
      title: quizInfo.title,
      published: quiz.published,
      score: totalScore,
      content: quizInfo.description,
      time: TEMP_QUIZ_TIME,
      questions: questions.map((question) => ({
        id: question.id,
        active: question.active,
        type: QUIZ_TYPE,
        score: question.score,
        content: question.content,
        queryConfig: question.queryConfig,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          active: answer.active,
          correct: answer.correct,
          content: answer.content,
          queryConfig: answer.queryConfig,
        })),
      })),
    };

    dispatch(quizzesActions.update(quizToUpdate))
      .unwrap()
      .then(() => {
        navigate(`${UserRoutes.QuizInfo.replace(':id', quiz.id)}`);
      })
      .catch(() => setQuizErrorMessage('Oops, something went wrong, your quiz wasn`t created'));

    console.log('update');
    console.log(quizToUpdate, 'questions');
  };

  const handleError = (error: string) => setErrorMessage(error);
  const handleChange = (data: IQuestion[]) => setQuestions(data);

  useEffect(() => {
    if (id) {
      dispatch(quizzesActions.getOneByIdUser(id))
        .unwrap()
        .catch(() => {
          setQuizErrorMessage('Quiz has not been found');
        });
    }
  }, []);

  if (isLoadingQuiz) {
    return <Loading />;
  }

  if (quizErrorMessage) {
    return (
      <Helmet title="Single-choice quiz creator">
        <Container className="single-choice-creator">
          <Wrapper>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <span>{quizErrorMessage}. Try one more time.</span>
            </div>
          </Wrapper>
        </Container>
      </Helmet>
    );
  }

  return (
    <Helmet title="Editing">
      <Container className="single-choice-editor">
        {quiz?.questions ? (
          <>
            <SetQuizMeta
              className="single-choice-editor__meta-input"
              onChange={handleChangeMeta}
              defaultTitle={quiz.title}
              defaultDescription={quiz.content}
            />
            <Wrapper className="single-choice-editor-wrapper">
              <SingleChoice
                data={
                  quiz?.questions.map(
                    (item) =>
                      ({ ...item, queryConfig: { status: 'fetched' } } as unknown as IQuestion),
                  ) || []
                }
                onError={handleError}
                onChange={handleChange}
              />
            </Wrapper>
          </>
        ) : null}

        <div className="single-choice-editor__save-quiz-wrapper">
          <Button
            className="single-choice-editor__save-quiz-btn"
            onClick={() => handleUpdateQuiz()}
            disabled={!!errorMessage}
            tooltip={errorMessage || ''}
          >
            <SaveIcon className="single-choice-editor__save-quiz-btn__icon" /> Update
          </Button>
        </div>
      </Container>
    </Helmet>
  );
};

export default SingleChoiceEditor;
