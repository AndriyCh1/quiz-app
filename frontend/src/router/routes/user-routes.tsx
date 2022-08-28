import { IRoute } from '../common/interfaces/IRoute';
import { Navigate } from 'react-router-dom';

import Home from '../../pages/home';
import QuizInfo from '../../pages/quiz-info';
import ActiveQuiz from '../../pages/active-quiz';
import Created from '../../pages/created';
import CreateQuiz from '../../pages/create-quiz';
import History from '../../pages/history';

import { UserRoutes as Routes } from '../../common/enums/router';

const userRoutes: IRoute[] = [
  { path: Routes.QuizInfo, element: <QuizInfo /> },
  { path: Routes.ActiveQuiz, element: <ActiveQuiz /> },
  { path: Routes.PublicQuizzes, element: <Home /> },
  { path: Routes.CreatedQuizzes, element: <Created /> },
  { path: Routes.CreateQuiz, element: <CreateQuiz /> },
  { path: Routes.History, element: <History /> },
  { path: '*', element: <Navigate to={Routes.PublicQuizzes} /> },
];

export { userRoutes };
