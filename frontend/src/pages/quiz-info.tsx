import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import NotFound from './not-found';
import Button from '../components/button';
import Loading from './loading';

import { BiTimer as DurationIcon } from 'react-icons/bi';
import { BsPatchQuestion as QuestionIcon } from 'react-icons/bs';
import { MdSportsScore as ScoreIcon } from 'react-icons/md';

import { formatDate } from '../utils/format-date';
import { secondsToMinutes } from '../utils/seconds-to-minutes';
import userAvatarHolder from '../assets/images/user-avatar-holder.png';

const QuizInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  const { chosenQuiz: quiz, isLoadingChosenQuiz: isLoadingQuiz } = useAppSelector(
    (state) => state.quizzes,
  );

  const params = useParams() as { id: string };

  useEffect(() => {
    if (isLoading) return;

    dispatch(quizzesActions.getOneById(params.id));
  }, [isAuth]);

  if (isLoadingQuiz) {
    return <Loading />;
  }

  if (quiz) {
    const { id, title, type, questions, time, score, content, user, updatedAt } = quiz;
    const questionsCount = questions.length;
    const { min, sec } = secondsToMinutes(time);

    return (
      <Helmet title={title}>
        <Container className="quiz-info">
          <Wrapper className="quiz-details">
            <div className="quiz-details-up">
              <div className="quiz-details__text">
                <div className="quiz-details__type">{type}</div>
                <h2 className="quiz-details__title">{title}</h2>
                <p className="quiz-details__content">{content}</p>
                <div className="quiz-details__other">
                  <div className="quiz-details__other__item">
                    <DurationIcon className="quiz-details__other__item__icon" />
                    <p>
                      Duration:
                      <span> {min ? `${min} min` : sec ? `${sec} sec` : '-'}</span>
                    </p>
                  </div>
                  <div className="quiz-details__other__item">
                    <ScoreIcon className="quiz-details__other__item__icon" />
                    <p>
                      Total score: <span>{score}</span>
                    </p>
                  </div>
                  <div className="quiz-details__other__item">
                    <QuestionIcon className="quiz-details__other__item__icon" />
                    <p>
                      Number of questions: <span>{questionsCount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="quiz-details-down">
              <div className="quiz-details__user">
                <div className="quiz-details__user__image">
                  <img src={user?.avatar || userAvatarHolder} alt="" />
                </div>
                <div className="quiz-details__user__info">
                  <p className="quiz-details__user__info__name">
                    {user?.fullName || 'Unknown User'}
                  </p>
                  <p className="quiz-details__user__info__created">
                    Updated: {updatedAt ? formatDate(new Date(updatedAt)) : 'unknown'}
                  </p>
                </div>
              </div>
              <div className="quiz-details__actions">
                <Button
                  className="quiz-details__actions__btn"
                  onClick={() => navigate(`/quiz/${id}/start`)}
                >
                  Start
                </Button>
                {/*<Button className="quiz-details__actions__btn">Print</Button>*/}
              </div>
            </div>
          </Wrapper>
        </Container>
      </Helmet>
    );
  }

  return <NotFound />;
};

export default QuizInfo;
