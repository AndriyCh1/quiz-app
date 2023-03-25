import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';

import Loading from './loading';
import PassingCore from './passing-core';
import NotFound from './not-found';
import Helmet from '../components/helmet';
import Container from '../components/container';
import Result from '../components/result';

import { takeActions } from '../store/take';
import { ITakeStartResponse } from '../common/interfaces';
import { UserRoutes } from '../common/enums';

// TODO: remove temporary constants
const TEMP_TIME = 500;

const UserQuizPassing: React.FC = () => {
  const params = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoadingTake, take, isFinished, isLoadingResults, results } = useAppSelector(
    (state) => state.take,
  );

  const handleCloseQuiz = () => {
    navigate(`${UserRoutes.QuizInfo.replace(':id', params.id)}`);
  };

  const handleAnswerQuestion = (res: { questionId: string; answerId: string }) => {
    const { answerId, questionId } = res;

    if (take) {
      // TODO: handle error
      dispatch(takeActions.sendAnswer({ takeId: take.id, questionId, answerId }));
    }
  };

  const handleFinishQuiz = ({ time }: { time: number }) => {
    if (take) {
      dispatch(takeActions.finish({ takeId: take.id, spentTime: time }));
    }
  };

  useEffect(() => {
    dispatch(takeActions.start(params.id));
  }, []);

  if (isLoadingTake) {
    return <Loading />;
  }

  const mapTakeForPassing = (take: ITakeStartResponse) => {
    return {
      title: take.title,
      time: TEMP_TIME,
      questions: take.questions.map((question) => ({
        id: question.id,
        content: question.content,
        answers: question.answers.map((answer) => ({ id: answer.id, content: answer.content })),
      })),
    };
  };

  if (!isFinished && take) {
    return (
      <Helmet title={`${take.title} started`}>
        <Container className="active-quiz">
          <PassingCore
            quiz={mapTakeForPassing(take)}
            onClose={handleCloseQuiz}
            onFinish={handleFinishQuiz}
            onAnswer={handleAnswerQuestion}
          />
        </Container>
      </Helmet>
    );
  }

  if (isFinished && isLoadingResults) {
    return <Loading />;
  }

  if (isFinished && results) {
    const { spentTime, score, totalScore, questionsNumber, correctNumber } = results;

    return (
      <Helmet title="Results">
        <Container className="active-quiz">
          <Result
            totalQuestions={questionsNumber}
            correctAnswers={correctNumber}
            score={score}
            totalScore={totalScore}
            time={spentTime}
            onClose={handleCloseQuiz}
          />
        </Container>
      </Helmet>
    );
  }

  return <NotFound />;
};

export default UserQuizPassing;
