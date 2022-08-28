import { Navigate } from 'react-router-dom';
import { IRoute } from '../common/interfaces/IRoute';

import LogIn from '../../pages/login';
import SignUp from '../../pages/signup';
import Home from '../../pages/home';
import QuizInfo from '../../pages/quiz-info';
import ActiveQuiz from '../../pages/active-quiz';

import { VisitorRoutes as Routes } from '../../common/enums';

const visitorRoutes: IRoute[] = [
  { path: Routes.Login, element: <LogIn /> },
  { path: Routes.Signup, element: <SignUp /> },
  { path: Routes.QuizInfo, element: <QuizInfo /> },
  { path: Routes.ActiveQuiz, element: <ActiveQuiz /> },
  { path: Routes.PublicQuizzes, element: <Home /> },
  { path: '*', element: <Navigate to={Routes.PublicQuizzes} /> },
];

export { visitorRoutes };
