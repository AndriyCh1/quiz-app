import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import NotFound from './not-found';

import { secondsToMinutes } from '../utils/seconds-to-minutes';

import { BiTimer as DurationIcon } from 'react-icons/bi';
import {
  BsPatchQuestion as QuestionIcon,
  BsFillCheckCircleFill as CorrectIcon,
  BsFillXCircleFill as WrongIcon,
} from 'react-icons/bs';
import { MdSportsScore as ScoreIcon } from 'react-icons/md';
import { AiOutlineInfoCircle as InfoIcon, AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';

import userImage from '../assets/images/default-user-image.png';
import quizImage from '../assets/images/default-quiz-image.png';
import Button from '../components/button';

import { IQuizAnswer, IQuizQuestion } from '../common/interfaces';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';

const QuizInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const quiz = useAppSelector((state) => state.quizzes.quiz);

  const params = useParams() as { id: string };

  useEffect(() => {
    dispatch(quizzesActions.getOneById(params.id));
  }, []);

  if (quiz) {
    const { id, title, type, questions, time, score, content } = quiz;
    const questionsCount = questions.length;
    const { min, sec } = secondsToMinutes(time);

    return (
      <Helmet title={title}>
        <Container className="quiz-info">
          <Wrapper className="quiz-details">
            <div className="quiz-details-up">
              <div className="quiz-details__image">
                <img src={quizImage} alt="" />
              </div>
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
                  <img src={userImage} alt="" />
                </div>
                <div className="quiz-details__user__info">
                  <p className="quiz-details__user__info__name">Quizzer2000</p>
                  <p className="quiz-details__user__info__created">a year ago</p>
                </div>
              </div>
              <div className="quiz-details__actions">
                <Button
                  className="quiz-details__actions__btn"
                  onClick={() => navigate(`/quiz/${id}/start`)}
                >
                  Start
                </Button>
                <Button className="quiz-details__actions__btn">Print</Button>
              </div>
            </div>
          </Wrapper>
          {quiz.questions.map((item, index) => (
            <QuizQuestion
              index={index + 1}
              key={index}
              content={item.content}
              active={item.active}
              type={item.type}
              score={item.score}
              time={item.time}
              quizAnswers={item.answers}
            />
          ))}
          {/*<QuizQuestion />*/}
        </Container>
      </Helmet>
    );
  }

  return <NotFound />;
};

// TODO: implement logic for "active" property
type IQuizQuestionAnswer = Pick<IQuizAnswer, 'active' | 'correct' | 'content'>;

type IQuizQuestionProps = {
  index: number;
  quizAnswers: IQuizQuestionAnswer[];
} & Pick<IQuizQuestion, 'active' | 'type' | 'score' | 'content' | 'time'>;

const QuizQuestion: React.FC<IQuizQuestionProps> = (props) => {
  const { index, type, score, time, content, quizAnswers } = props;

  return (
    <Wrapper className="quiz-question">
      <div className="quiz-question__top">
        <div className="quiz-question__meta">
          <InfoIcon className="quiz-question__meta__icon" />
          <span>
            {index}. {type}
          </span>
        </div>
        <div className="quiz-question__top__right">
          <div className="quiz-question__meta">
            <DurationIcon className="quiz-question__meta__icon" />
            <span>{time} seconds</span>
          </div>
          <div className="quiz-question__meta">
            <CheckIcon className="quiz-question__meta__icon" />
            <span>{score} points</span>
          </div>
        </div>
      </div>
      <div className="quiz-question__main">
        <p className="quiz-question__question">{content}</p>
        {/*<div className='quiz-question__hide-asnwers'></div>*/}
        <div className="quiz-question__answers">
          {quizAnswers.map((item, index) => (
            <QuizAnswer
              key={index}
              index={index}
              content={item.content}
              active={item.active}
              correct={item.correct}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

interface IQuizAnswerProps extends IQuizQuestionAnswer {
  index: number;
}

const QuizAnswer: React.FC<IQuizAnswerProps> = (props) => {
  const { content, correct } = props;
  return (
    <div className="quiz-question__answers__item">
      {correct ? (
        <CorrectIcon className="quiz-question__answers__item__icon correct-answer" />
      ) : (
        <WrongIcon className="quiz-question__answers__item__icon wrong-answer" />
      )}
      <span>{content}</span>
    </div>
  );
};

export default QuizInfo;
