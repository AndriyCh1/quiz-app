import React from 'react';
import { useParams } from 'react-router-dom';

import NotFound from './not-found';

import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Helmet from '../components/helmet';

import quizList from '../assets/data/quiz-list';
import { alphabetGenerator } from '../utils/alphabet-generator';

import { GrClose as CloseIcon } from 'react-icons/gr';
import { MdSportsScore as ScoreIcon } from 'react-icons/md';
import Button from '../components/button';

const QuizStart = () => {
  const params = useParams() as { slug: string };
  const quiz = quizList.findBySlug(params.slug);
  const generateAlphabet = alphabetGenerator();

  if (quiz) {
    const { title, quizType, questions, time, score, content } = quiz;
    const currentQuestion = 1;
    const totalQuestions = questions.length;
    const passedPercent = (currentQuestion / totalQuestions) * 100;

    return (
      <Helmet title={`${title} started`}>
        <Container className="quiz-start">
          <Wrapper className="quiz-start-wrapper">
            <div className="quiz-start__top">
              <div className="quiz-start__top__score">
                <ScoreIcon className="quiz-start__top__score__icon" />
                <span>--30--</span>
              </div>
              <div className="quiz-start__top__title">
                <h1>{title}</h1>
              </div>
              <div className="quiz-start__top__close">
                <CloseIcon className="quiz-start__top__close__icon" />
              </div>
            </div>
            <div className="quiz-start__content">
              <h3 className="quiz-start__content__question">{questions[0].content}</h3>
              <div className="quiz-start__content__answers">
                {questions[0].quizAnswers.map((item, index) => (
                  <QuizStartAnswer
                    key={index}
                    content={item.content}
                    sequenceMark={generateAlphabet.next().value}
                  />
                ))}
              </div>
            </div>
            <div className="quiz-start__bottom">
              <div className="quiz-start__bottom__chart">
                <div className="quiz-start__bottom__chart__line-wrapper">
                  <div
                    className="quiz-start__bottom__chart__line"
                    style={{ width: `${passedPercent}%` }}
                  ></div>
                </div>
                <div className="quiz-start__bottom__chart__info">
                  <span>
                    {currentQuestion}/{totalQuestions}
                  </span>
                </div>
              </div>
              <Button className="quiz-start__bottom__btn">Continue</Button>
            </div>
          </Wrapper>
        </Container>
      </Helmet>
    );
  }

  return <NotFound />;
};

interface IQuizStartAnswerProps {
  sequenceMark: string;
  content: string;
}

const QuizStartAnswer: React.FC<IQuizStartAnswerProps> = ({ sequenceMark, content }) => {
  return (
    <div className="quiz-start__content__answers__item">
      <div className="quiz-start__content__answers__item__sequence">{sequenceMark}</div>
      <div className="quiz-start__content__answers__item__answer">{content}</div>
    </div>
  );
};

export default QuizStart;
