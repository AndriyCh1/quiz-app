import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NotFound from './not-found';

import Container from '../components/container';
import Helmet from '../components/helmet';

import { alphabetGenerator } from '../utils/alphabet-generator';

import ActiveQuizWrapper from '../components/active-quiz-wrapper';
import Result from '../components/result';
import useStopwatch from '../hooks/useStopwatch';

import { IQuizAnswer } from '../common/interfaces';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { quizzesActions } from '../store/quizzes';
import Loading from './loading';

interface IAnsweredQuestion {
  index: number;
  correct: boolean;
}

const ActiveQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const { chosenQuiz: quiz, isLoadingChosenQuiz: isLoadingQuiz } = useAppSelector(
    (state) => state.quizzes,
  );

  const params = useParams() as { id: string };
  const stopwatch = useStopwatch();

  const generateAlphabet = alphabetGenerator();

  const [totalTimeValue, setTotalTimeValue] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  const [answeredQuestions, setAnsweredQuestions] = useState<IAnsweredQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<IQuizAnswer | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const nextQuestion = () => setCurrentQuestionIndex((state) => state + 1);

  const increaseScore = (value: number) => setUserScore((state) => state + value);

  const decreaseScore = (value: number) => setUserScore((state) => state - value);

  const returnPreviousData = () => {
    if (quiz) {
      const previousQuestionInfo = answeredQuestions.find(
        (item) => item.index === currentQuestionIndex - 1,
      );

      if (previousQuestionInfo && previousQuestionInfo.correct) {
        const questionInfo = quiz.questions[previousQuestionInfo.index];
        decreaseScore(questionInfo.score);
      }

      setAnsweredQuestions(
        answeredQuestions.filter((item) => item.index !== currentQuestionIndex - 1),
      );

      setCurrentQuestionIndex((state) => state - 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex) {
      returnPreviousData();
    } else {
      navigate(`/quiz/${params.id}`);
    }
  };

  const handleClose = () => {
    navigate(`/quiz/${params.id}`);
  };

  const updateData = () => {
    if (quiz && selectedAnswer) {
      const isAnswerCorrect = selectedAnswer.correct;

      if (isAnswerCorrect) {
        increaseScore(quiz.questions[currentQuestionIndex].score);
      }

      setAnsweredQuestions((state) => [
        ...state,
        { index: currentQuestionIndex, correct: isAnswerCorrect },
      ]);
    }
  };

  const handleSubmitAnswer = () => {
    nextQuestion();
    updateData();
  };

  const handleSelectAnswer = (answer: IQuizAnswer) => setSelectedAnswer(answer);

  const handleFinish = () => {
    setIsFinished(true);
    updateData();
    setTotalTimeValue(stopwatch.seconds);
    stopwatch.stop();
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    stopwatch.start();
    if (user?.fullName) {
      dispatch(quizzesActions.getOneForUserById(params.id));
    } else {
      dispatch(quizzesActions.getOnePublicById(params.id));
    }
  }, []);

  if (isLoadingQuiz) {
    return <Loading />;
  }

  if (quiz && isFinished) {
    return (
      <Helmet title={`${quiz.title} started`}>
        <Container className="active-quiz">
          <Result
            title={`title`}
            totalAnswers={quiz.questions.length}
            correctAnswers={answeredQuestions.reduce((ac, cu) => (cu.correct ? ac + 1 : ac), 0)}
            score={userScore}
            totalScore={quiz.score}
            time={totalTimeValue}
            onClose={handleClose}
          />
        </Container>
      </Helmet>
    );
  }

  if (quiz && !isFinished) {
    const { title, questions, score } = quiz;

    const totalQuestionsNumber = questions.length;

    return (
      <Helmet title={`${title} started`}>
        <Container className="active-quiz">
          <ActiveQuizWrapper
            title={title}
            letChangeAnswer={true}
            showScore={false}
            selectedAnswer={!!selectedAnswer}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestionsNumber={totalQuestionsNumber}
            currentScore={userScore}
            totalScore={score}
            onAnswer={handleSubmitAnswer}
            onClose={handleClose}
            onBack={handleBack}
            onFinish={handleFinish}
          >
            <div className="active-quiz__content">
              <h3 className="active-quiz__content__question">
                {questions[currentQuestionIndex].content}
              </h3>
              <div className="active-quiz__content__answers">
                {questions[currentQuestionIndex].answers.map((item, index) => (
                  <QuizStartAnswer
                    key={index}
                    content={item.content}
                    sequenceMark={generateAlphabet.next().value}
                    isSelected={item.id === selectedAnswer?.id}
                    onClick={() => handleSelectAnswer(item)}
                  />
                ))}
              </div>
            </div>
          </ActiveQuizWrapper>
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
      className={`active-quiz__content__answers__item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="active-quiz__content__answers__item__sequence">{sequenceMark}</div>
      <div className="active-quiz__content__answers__item__answer">{content}</div>
    </div>
  );
};

export default ActiveQuiz;
