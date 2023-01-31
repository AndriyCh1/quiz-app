import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';

import Helmet from '../components/helmet';
import Container from '../components/container';
import Wrapper from '../components/wrapper';
import Loading from './loading';

import { profileActions } from '../store/profile';
import ProfileHeader from '../components/profile-header';
import ProfileCharts from '../components/profile-charts';
import QuizSummary from '../components/quiz-summary';

import userAvatarHolder from '../assets/images/user-avatar-holder.png';

const Profile = () => {
  const dispatch = useAppDispatch();
  const profileData = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(profileActions.getUserGeneralData());
    dispatch(profileActions.getUserQuizzesSummary());
  }, []);

  return (
    <Helmet title="Profile">
      <Container className="profile">
        <Wrapper className="profile-info-wrapper">
          {!profileData.isLoadingUserGeneralData ? (
            <ProfileHeader
              avatar={profileData.userGeneralData?.avatar || userAvatarHolder}
              fullName={profileData.userGeneralData?.fullName || ''}
              quizzesPassed={profileData.userGeneralData?.quizzesPassed || 0}
              quizzesCreated={profileData.userGeneralData?.quizzesCreated || 0}
              joinedTime={
                profileData.userGeneralData
                  ? new Date(profileData.userGeneralData.joinedTime)
                  : new Date()
              }
            />
          ) : (
            <Loading />
          )}
        </Wrapper>
        <Wrapper className="profile-charts-wrapper">
          {!profileData.isLoadingUserGeneralData ? (
            <ProfileCharts
              quizzesCreated={profileData.userGeneralData?.quizzesCreated || 0}
              quizzesPublished={profileData.userGeneralData?.quizzesPublished || 0}
              correctNumber={profileData.userGeneralData?.correctNumber || 0}
              incorrectNumber={profileData.userGeneralData?.incorrectNumber || 0}
              notAnswered={profileData.userGeneralData?.notAnswered || 0}
              totalAnswers={profileData.userGeneralData?.totalAnswers || 0}
            />
          ) : (
            <Loading />
          )}
        </Wrapper>
        <Wrapper className="profile-takes-wrapper">
          {!profileData.isLoadingQuizzesSummaryData ? (
            <>
              <div className="profile-takes">
                {profileData.userQuizzesSummaryData.map((quizSummary, index) => (
                  <QuizSummary
                    key={index}
                    quizId={quizSummary?.id}
                    quizTitle={quizSummary?.title || ''}
                    quizTakes={
                      quizSummary?.takes
                        .slice() // Array is frozen, so we need to copy the array
                        .sort(
                          (take, nextTake) =>
                            new Date(take.takeDate).valueOf() -
                            new Date(nextTake.takeDate).valueOf(),
                        ) || []
                    }
                  />
                ))}
                {profileData.userQuizzesSummaryData.length === 0 && 'No quizzes passed'}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default Profile;
