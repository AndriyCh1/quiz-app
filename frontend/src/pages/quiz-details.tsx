import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NotFound from './not-found';

import { secondsToMinutes } from '../utils/seconds-to-minutes';

import { BiTimer as DurationIcon } from 'react-icons/bi';
import { BsPatchQuestion as QuestionIcon } from 'react-icons/bs';
import { MdSportsScore as ScoreIcon } from 'react-icons/md';

import userAvatarHolder from '../assets/images/user-avatar-holder.png';
import Button from '../components/button';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';
import { formatDate } from '../utils/format-date';
import Loading from './loading';

interface IProps {
  quizId: string;
}

const QuizDetails: React.FC<IProps> = React.memo(({ quizId }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAuth, isLoading } = useAppSelector((state) => state.auth);
  const { chosenQuiz: quiz, isLoadingChosenQuiz: isLoadingQuiz } = useAppSelector(
    (state) => state.quizzes,
  );

  useEffect(() => {
    if (isLoading) return;

    dispatch(quizzesActions.getOneById(quizId));
  }, [isAuth, quizId]);

  if (isLoadingQuiz) {
    return <Loading />;
  }

  if (quiz) {
    const { id, title, type, questions, time, score, content, user, updatedAt } = quiz;
    const questionsCount = questions.length;
    const { min, sec } = secondsToMinutes(time);

    return (
      <div className="quiz-details-wrapper">
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
              <img src={user?.avatar || userAvatarHolder} alt="avatar" />
            </div>
            <div className="quiz-details__user__info">
              <p className="quiz-details__user__info__name">{user?.fullName || 'Unknown User'}</p>
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
      </div>
    );
  }

  return <NotFound />;
});

export default QuizDetails;
