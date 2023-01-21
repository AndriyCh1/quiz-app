import { IRoute } from '../common/interfaces/IRoute';
import { Navigate } from 'react-router-dom';

import QuizInfo from '../../pages/quiz-info';
import UserQuizPassing from '../../pages/user-quiz-passing';
import CreateQuiz from '../../pages/create-quiz';
import Profile from '../../pages/profile';

import { UserRoutes as Routes } from '../../common/enums';
import SingleChoiceCreator from '../../pages/single-choice-creator';
import InDevelopment from '../../pages/in-development';
import UserHome from '../../pages/user-home';
import SingleChoiceEditor from '../../pages/single-choice-editor';

const userRoutes: IRoute[] = [
  { path: Routes.QuizInfo, element: <QuizInfo /> },
  { path: Routes.ActiveQuiz, element: <UserQuizPassing /> },
  { path: Routes.Quizzes, element: <UserHome /> },
  { path: Routes.CreateQuiz, element: <CreateQuiz /> },
  { path: Routes.Profile, element: <Profile /> },
  { path: Routes.SingleChoiceCreator, element: <SingleChoiceCreator /> },
  { path: Routes.EditQuiz, element: <SingleChoiceEditor /> },
  { path: Routes.InDevelopment, element: <InDevelopment /> },
  { path: '*', element: <Navigate to={Routes.Quizzes} /> },
];

export { userRoutes };
