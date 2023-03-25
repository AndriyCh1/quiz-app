import { Navigate } from 'react-router-dom';
import { IRoute } from '../common/interfaces/IRoute';

import Login from '../../pages/login';
import SignUp from '../../pages/signup';
import VisitorHome from '../../pages/visitor-home';
import QuizInfo from '../../pages/quiz-info';
import VisitorQuizPassing from '../../pages/visitor-quiz-passing';

import { VisitorRoutes as Routes } from '../../common/enums';

const visitorRoutes: IRoute[] = [
  { path: Routes.Login, element: <Login /> },
  { path: Routes.Signup, element: <SignUp /> },
  { path: Routes.QuizInfo, element: <QuizInfo /> },
  { path: Routes.ActiveQuiz, element: <VisitorQuizPassing /> },
  { path: Routes.PublicQuizzes, element: <VisitorHome /> },
  { path: '*', element: <Navigate to={Routes.PublicQuizzes} /> },
];

export { visitorRoutes };
