import React from 'react';
import { Pie } from 'react-chartjs-2';
import { getPercents } from '../utils/get-percents';

interface IProps {
  quizzesPublished: number;
  correctNumber: number;
  incorrectNumber: number;
  notAnswered: number;
  totalAnswers: number;
  quizzesCreated: number;
}

const getPieChartConfig = (labels: string[], data: number[]) => {
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#84d990', '#f26060', '#9ae2f1'],
        borderWidth: 1,
      },
    ],
  };
};

const getPieChartNoDataConfig = () => {
  return {
    labels: ['No data'],
    datasets: [
      {
        data: [100],
        backgroundColor: ['#b7b7b4'],
        borderWidth: 1,
      },
    ],
  };
};

const ProfileCharts: React.FC<IProps> = (props) => {
  const {
    notAnswered,
    totalAnswers,
    incorrectNumber,
    correctNumber,
    quizzesPublished,
    quizzesCreated,
  } = props;

  return (
    <div className="profile-charts">
      <div className="profile-charts__chart">
        <h3 className="profile-charts__chart__title">Success chart</h3>
        <div className="profile-charts__chart__diagram-wrapper">
          <div>
            {!(correctNumber === 0 && incorrectNumber === 0 && notAnswered === 0) ? (
              <Pie
                className="profile-charts__chart__diagram"
                data={getPieChartConfig(
                  ['Correct answers', 'Incorrect answers', 'Not answered'],
                  [correctNumber, incorrectNumber, notAnswered],
                )}
              />
            ) : (
              <Pie className="profile-charts__chart__diagram" data={getPieChartNoDataConfig()} />
            )}
          </div>
          <div className="profile-charts__chart__diagram__legend">
            <div className="profile-charts__chart__diagram__legend__item">
              Correct answers: {totalAnswers !== 0 ? getPercents(correctNumber, totalAnswers) : 0}%
            </div>
            <div className="profile-charts__chart__diagram__legend__item">
              Incorrect answers{' '}
              {totalAnswers !== 0 ? getPercents(incorrectNumber, totalAnswers) : 0}%
            </div>
            <div className="profile-charts__chart__diagram__legend__item">
              Not answered: {totalAnswers !== 0 ? getPercents(notAnswered, totalAnswers) : 0}%
            </div>
          </div>
        </div>
      </div>
      <div className="profile-charts__chart">
        <h3 className="profile-charts__chart__title">Activity chart</h3>
        <div className="profile-charts__chart__diagram-wrapper">
          <div>
            {!(quizzesPublished === 0 && quizzesCreated === 0) ? (
              <Pie
                className="profile-charts__chart__diagram"
                data={getPieChartConfig(
                  ['Published quizzes', 'Not published quizzes'],
                  [quizzesPublished, quizzesCreated - quizzesPublished],
                )}
              />
            ) : (
              <Pie className="profile-charts__chart__diagram" data={getPieChartNoDataConfig()} />
            )}
          </div>
          <div className="profile-charts__chart__diagram__legend">
            <div className="profile-charts__chart__diagram__legend__item">
              Published quizzes: {quizzesPublished}
            </div>
            <div className="profile-charts__chart__diagram__legend__item">
              Not published: {quizzesCreated - quizzesPublished}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCharts;
