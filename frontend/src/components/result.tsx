import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { secondsToMinutes } from '../utils/seconds-to-minutes';
import { BsBarChartFill as ScoreIcon } from 'react-icons/bs';
import { BiTime as TimeIcon } from 'react-icons/bi';
import { RiCloseFill as IncorrectIcon } from 'react-icons/ri';
import Wrapper from './wrapper';
import { GrClose as CloseIcon } from 'react-icons/gr';

interface IProps {
  title: string;
  description?: string;
  totalAnswers: number;
  correctAnswers: number;
  score: number;
  totalScore: number;
  time: number;
  onClose: () => void;
}

ChartJS.register(ArcElement, Tooltip);

const Result: React.FC<IProps> = (props) => {
  const { correctAnswers, totalAnswers, score, totalScore, onClose, time } = props;

  const data = {
    labels: ['Wrong', 'Correct'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalAnswers - correctAnswers, correctAnswers],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const { min, sec } = secondsToMinutes(time);

  return (
    <Wrapper className="quiz-finish-wrapper">
      <div className="quiz-finish-wrapper__top__close-wrapper">
        <div className="quiz-finish-wrapper__top__close" onClick={onClose}>
          <CloseIcon className="quiz-finish-wrapper__top__close__icon" />
        </div>
      </div>
      <div className="quiz-finish-wrapper__chart">
        <Pie data={data} />
      </div>
      <div className="quiz-finish-wrapper__details">
        <div className="quiz-finish-wrapper__details__item quiz-finish-wrapper__details__score">
          <ScoreIcon className="quiz-finish-wrapper__details__score__icon" />
          <span>
            {score} out of {totalScore} points
          </span>
        </div>
        <div className="quiz-finish-wrapper__details__item quiz-finish-wrapper__details__incorrect">
          <IncorrectIcon className="quiz-finish-wrapper__details__incorrect__icon" />
          <span>{totalAnswers - correctAnswers} incorrect answers</span>
        </div>
        <div className="quiz-finish-wrapper__details__item quiz-result__details__time">
          <TimeIcon className="quiz-finish-wrapper__details__time__icon" />
          <span>
            {min ? `${min} min` : ''} {sec ? `${sec} sec` : ''}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Result;
