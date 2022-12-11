import { IRoute } from '../common/interfaces/IRoute';
import { Navigate } from 'react-router-dom';

import QuizInfo from '../../pages/quiz-info';
import ActiveQuiz from '../../pages/active-quiz';
import CreateQuiz from '../../pages/create-quiz';
import History from '../../pages/history';

import { UserRoutes as Routes } from '../../common/enums';
import SingleChoiceCreator from '../../pages/single-choice-creator';
import InDevelopment from '../../pages/in-development';
import UserHome from '../../pages/user-home';
import SingleChoiceEditor from '../../pages/single-choice-editor';

const userRoutes: IRoute[] = [
  { path: Routes.QuizInfo, element: <QuizInfo /> },
  { path: Routes.ActiveQuiz, element: <ActiveQuiz /> },
  { path: Routes.Quizzes, element: <UserHome /> },
  { path: Routes.CreateQuiz, element: <CreateQuiz /> },
  { path: Routes.History, element: <History /> },
  { path: Routes.SingleChoiceCreator, element: <SingleChoiceCreator /> },
  { path: Routes.EditQuiz, element: <SingleChoiceEditor /> },
  { path: Routes.InDevelopment, element: <InDevelopment /> },
  { path: '*', element: <Navigate to={Routes.Quizzes} /> },
];

export { userRoutes };
