import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';

import { ICheckAnswerResponse, IQuiz } from '../common/interfaces';

import NotFound from './not-found';
import Container from '../components/container';
import Helmet from '../components/helmet';
import Result from '../components/result';
import Loading from './loading';
import PassingCore from './passing-core';

import { quizzesActions } from '../store/quizzes';
import { VisitorRoutes } from '../common/enums';

const TEMP_TIME = 500;

interface IAnsweredQuestion {
  id: string;
  correct: boolean;
  score: number;
}

const VisitorQuizPassing = () => {
  const params = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isFinished, setIsFinished] = useState(false);
  const [spentTime, setSpentTime] = useState(0);

  const { chosenQuiz: quiz, isLoadingChosenQuiz: isLoadingQuiz } = useAppSelector(
    (state) => state.quizzes,
  );

  const [answeredQuestions, setAnsweredQuestions] = useState<IAnsweredQuestion[]>([]);

  const handleOnBack = (res: { questionId: string }) => {};

  const handleOnClose = () => {
    navigate(`${VisitorRoutes.QuizInfo.replace(':id', params.id)}`);
  };

  const handleOnAnswer = (res: { questionId: string; answerId: string }) => {
    if (quiz) {
      dispatch(quizzesActions.checkAnswer({ answerId: res.answerId, quizId: quiz.id }))
        .unwrap()
        .then((payload: ICheckAnswerResponse) => {
          const currentQuestion = quiz.questions.find((question) => question.id === res.questionId);

          if (currentQuestion) {
            updateAnsweredQuestion(currentQuestion.id, {
              correct: payload.correct,
              score: currentQuestion.score,
            });
          }
        });
    }
  };

  const handleOnFinish = ({ time }: { time: number }) => {
    setSpentTime(time);
    setIsFinished(true);
  };

  const updateAnsweredQuestion = (
    questionId: string,
    data: { correct: boolean; score: number },
  ) => {
    if (quiz) {
      setAnsweredQuestions((state) => {
        const isQuestionAlreadyAnswered = Boolean(
          state.find((question) => question.id === questionId),
        );

        if (isQuestionAlreadyAnswered) {
          return state.map((question) =>
            question.id !== questionId ? question : { ...question, ...data },
          );
        }

        return [...state, { id: questionId, ...data }];
      });
    }
  };

  useEffect(() => {
    dispatch(quizzesActions.getOneById(params.id));
  }, []);

  if (isLoadingQuiz) {
    return <Loading />;
  }

  const mapQuizForPassing = (quiz: IQuiz) => {
    return {
      title: quiz.title,
      time: TEMP_TIME,
      questions: quiz.questions.map((question) => ({
        id: question.id,
        content: question.content,
        answers: question.answers.map((answer) => ({ id: answer.id, content: answer.content })),
      })),
    };
  };

  if (!isFinished && quiz) {
    return (
      <Helmet title={`${quiz.title} started`}>
        <Container className="active-quiz">
          <PassingCore
            quiz={mapQuizForPassing(quiz)}
            onClose={handleOnClose}
            onFinish={handleOnFinish}
            onBack={handleOnBack}
            onAnswer={handleOnAnswer}
          />
          <div>
            score: {answeredQuestions.reduce((ac, cu) => (cu.correct ? ac + cu.score : ac), 0)}
          </div>
        </Container>
      </Helmet>
    );
  }

  if (isFinished && quiz) {
    return (
      <Helmet title="Results">
        <Container className="active-quiz">
          <Result
            title={`title`}
            totalQuestions={quiz.questions.length}
            correctAnswers={answeredQuestions.reduce((ac, cu) => (cu.correct ? ac + 1 : ac), 0)}
            score={answeredQuestions.reduce((ac, cu) => (cu.correct ? ac + cu.score : ac), 0)}
            totalScore={quiz.score}
            time={spentTime}
            onClose={handleOnClose}
          />
        </Container>
      </Helmet>
    );
  }

  return <NotFound />;
};

export default VisitorQuizPassing;
