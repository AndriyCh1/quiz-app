import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import NotFound from './not-found';

import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Helmet from '../components/helmet';

import quizList, { IQuizAnswer } from '../assets/data/quiz-list';
import { alphabetGenerator } from '../utils/alphabet-generator';

import { GrClose as CloseIcon } from 'react-icons/gr';
import { MdSportsScore as ScoreIcon } from 'react-icons/md';
import Button from '../components/button';

const QuizStart = () => {
  const params = useParams() as { slug: string };
  const quiz = quizList.findBySlug(params.slug);
  const generateAlphabet = alphabetGenerator();

  const [selectedAnswer, setSelectedAnswer] = useState<IQuizAnswer | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestionIndex((state) => state + 1);
  };

  const increaseScore = (value: number) => setUserScore((state) => (state += value));

  const handleContinueButtonClick = () => {
    nextQuestion();

    if (quiz && selectedAnswer) {
      const isAnswerCorrect = selectedAnswer.correct;

      if (isAnswerCorrect) {
        increaseScore(quiz.questions[currentQuestionIndex].score);
      }
    }
  };

  const handleSelectAnswerClick = (answer: IQuizAnswer) => setSelectedAnswer(answer);

  if (quiz && currentQuestionIndex === quiz.questions.length) {
    return (
      <Helmet title={`${quiz.title} started`}>
        <Container className="quiz-start">
          <Wrapper className="quiz-start-wrapper">
            Your score is {userScore} / {quiz.score}
          </Wrapper>
        </Container>
      </Helmet>
    );
  }

  if (quiz) {
    const { title, questions } = quiz;

    const totalQuestionsCount = questions.length;
    const passedPercent = ((currentQuestionIndex + 1) / totalQuestionsCount) * 100;

    return (
      <Helmet title={`${title} started`}>
        <Container className="quiz-start">
          <Wrapper className="quiz-start-wrapper">
            <div className="quiz-start__top">
              <div className="quiz-start__top__score">
                <ScoreIcon className="quiz-start__top__score__icon" />
                <span>
                  Score: {userScore}/{quiz.score}
                </span>
                {/*<span>Question score: {questions[currentQuestionIndex].score}</span>*/}
              </div>
              <div className="quiz-start__top__title">
                <h1>{title}</h1>
              </div>
              <div className="quiz-start__top__close-wrapper">
                <div className="quiz-start__top__close">
                  <CloseIcon className="quiz-start__top__close__icon" />
                </div>
              </div>
            </div>
            <div className="quiz-start__content">
              <h3 className="quiz-start__content__question">
                {questions[currentQuestionIndex].content}
              </h3>
              <div className="quiz-start__content__answers">
                {questions[currentQuestionIndex].quizAnswers.map((item, index) => (
                  <QuizStartAnswer
                    key={index}
                    content={item.content}
                    sequenceMark={generateAlphabet.next().value}
                    isSelected={item.id === selectedAnswer?.id}
                    onClick={() => handleSelectAnswerClick(item)}
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
                    {currentQuestionIndex + 1}/{totalQuestionsCount}
                  </span>
                </div>
              </div>
              <Button
                className="quiz-start__bottom__btn"
                onClick={handleContinueButtonClick}
                disabled={!selectedAnswer}
              >
                Continue
              </Button>
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
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  isSelected?: boolean;
}

const QuizStartAnswer: React.FC<IQuizStartAnswerProps> = (props) => {
  const { sequenceMark, content, onClick, isSelected = false } = props;

  return (
    <div
      className={`quiz-start__content__answers__item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="quiz-start__content__answers__item__sequence">{sequenceMark}</div>
      <div className="quiz-start__content__answers__item__answer">{content}</div>
    </div>
  );
};

export default QuizStart;
