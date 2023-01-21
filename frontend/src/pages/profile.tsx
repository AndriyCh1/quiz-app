import React from 'react';

import { Pie } from 'react-chartjs-2';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import userImage from '../assets/images/default-quiz-image.png';
import ExpandDown from '../components/expand-down';
import TakeSummary from '../components/take-summary';

import { getPercents } from '../utils/get-percents';
import { formatDate } from '../utils/format-date';

const Profile = () => {
  const userDataResponse = {
    fullName: 'Christofer Westervit',
    quizzesPassed: 10,
    quizzesCreated: 10,
    quizzesPublished: 8,
    joinedTime: '20 weeks',
    correctNumber: 100,
    incorrectNumber: 20,
    notAnswered: 5,
    totalAnswers: 125,
  };

  const quizzesResultDataResponse = [
    {
      id: '123343',
      content: 'Quiz 1',
      takes: [
        {
          id: '3674',
          correctNumber: 10,
          incorrectNumber: 8,
          notAnswered: 2,
          questionsNumber: 20,
          score: 20,
          totalScore: 25,
          spentTime: 3000,
          takeDate: new Date(),
        },
        {
          id: '837473',
          correctNumber: 10,
          incorrectNumber: 8,
          notAnswered: 2,
          questionsNumber: 20,
          score: 20,
          totalScore: 25,
          spentTime: 3000,
          takeDate: new Date(),
        },
      ],
    },
    {
      id: '87374387',
      content: 'Quiz 1',
      takes: [
        {
          id: '283982',
          correctNumber: 10,
          incorrectNumber: 8,
          notAnswered: 2,
          questionsNumber: 20,
          score: 20,
          totalScore: 25,
          spentTime: 3000,
          takeDate: new Date(),
        },
        {
          id: '02388',
          correctNumber: 10,
          incorrectNumber: 8,
          notAnswered: 2,
          questionsNumber: 20,
          score: 20,
          totalScore: 25,
          spentTime: 3000,
          takeDate: new Date(),
        },
      ],
    },
  ];

  const mockSuccessChartData = {
    labels: ['Correct answers', 'Incorrect answers', 'Not answered'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          userDataResponse.correctNumber,
          userDataResponse.incorrectNumber,
          userDataResponse.notAnswered,
        ],
        backgroundColor: ['#00fc22', '#fc0000', '#2a2e35'],
        borderColor: ['#31823BFF', '#7C0707FF', '#474B54FF'],
        borderWidth: 1,
      },
    ],
  };

  const mockActivityChartData = {
    labels: ['Published quizzes', 'Not published quizzes'],
    datasets: [
      {
        label: '#',
        data: [
          userDataResponse.quizzesPublished,
          userDataResponse.quizzesCreated - userDataResponse.quizzesPublished,
        ],
        backgroundColor: ['#00fc22', '#fc0000'],
        borderColor: ['#31823BFF', '#7C0707FF'],
        borderWidth: 1,
      },
    ],
  };

  const mockPassedQuizzesResult = {
    topic: 'Quiz 2',
    topicLink: 'https://www.google.com/',
  };

  return (
    <Helmet title="Profile">
      <Container className="profile">
        <Wrapper className="profile-info-wrapper">
          <div className="profile-info">
            <div className="profile-info__image-wrapper">
              <img src={userImage} alt="user-avatar" className="profile-info__image" />
            </div>
            <div className="profile-info__text">
              <p className="profile-info__text__username">{userDataResponse.fullName}</p>
              <p className="profile-info__text__tests-passed">
                Quizzes passed: {userDataResponse.quizzesPassed}
              </p>
              <p className="profile-info__text__tests-created">
                Quizzes created: {userDataResponse.quizzesCreated}
              </p>
              <p className="profile-info__text__join-time">
                Joined {userDataResponse.joinedTime} ago
              </p>
            </div>
          </div>
        </Wrapper>
        <Wrapper className="profile-charts-wrapper">
          <div className="profile-charts">
            <div className="profile-charts__chart">
              <h3 className="profile-charts__chart__title">Success chart</h3>
              <div className="profile-charts__chart__diagram-wrapper">
                <div>
                  <Pie className="profile-charts__chart__diagram" data={mockSuccessChartData} />
                </div>
                <div className="profile-charts__chart__diagram__legend">
                  <div className="profile-charts__chart__diagram__legend__item">
                    Correct answers:{' '}
                    {getPercents(userDataResponse.correctNumber, userDataResponse.totalAnswers)}%
                  </div>
                  <div className="profile-charts__chart__diagram__legend__item">
                    Incorrect answers:{' '}
                    {getPercents(userDataResponse.incorrectNumber, userDataResponse.totalAnswers)}%
                  </div>
                  <div className="profile-charts__chart__diagram__legend__item">
                    Not answered:{' '}
                    {getPercents(userDataResponse.notAnswered, userDataResponse.totalAnswers)}%
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-charts__chart">
              <h3 className="profile-charts__chart__title">Activity chart</h3>
              <div className="profile-charts__chart__diagram-wrapper">
                <div>
                  <Pie className="profile-charts__chart__diagram" data={mockActivityChartData} />
                </div>
                <div className="profile-charts__chart__diagram__legend">
                  <div className="profile-charts__chart__diagram__legend__item">
                    Published quizzes:{' '}
                    {getPercents(
                      userDataResponse.quizzesPublished,
                      userDataResponse.quizzesCreated,
                    )}
                    %
                  </div>
                  <div className="profile-charts__chart__diagram__legend__item">
                    Not published:{' '}
                    {getPercents(
                      userDataResponse.quizzesCreated - userDataResponse.quizzesPublished,
                      userDataResponse.quizzesCreated,
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
        <Wrapper className="profile-takes-wrapper">
          <div className="profile-takes">
            {quizzesResultDataResponse.map((quizResult) => (
              <ExpandDown
                key={quizResult.id}
                className="profile-takes__take"
                topic={quizResult.content}
                extraInfo={`${quizResult.takes.length} attempts`}
              >
                <div className="profile-takes__summary">
                  {quizResult.takes.map((takeResult, index) => (
                    <TakeSummary
                      key={takeResult.id}
                      title={`Attempt ${index + 1} (${formatDate(takeResult.takeDate)})`}
                      correct={takeResult.correctNumber}
                      incorrect={takeResult.incorrectNumber}
                      notAnswered={takeResult.notAnswered}
                      totalQuestions={takeResult.questionsNumber}
                      score={takeResult.score}
                      totalScore={takeResult.totalScore}
                    />
                  ))}
                </div>
              </ExpandDown>
            ))}
          </div>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default Profile;
