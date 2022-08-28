import { IRoute } from '../common/interfaces/IRoute';
import { Navigate } from 'react-router-dom';

import Home from '../../pages/home';
import QuizInfo from '../../pages/quiz-info';
import ActiveQuiz from '../../pages/active-quiz';

const userRoutes: IRoute[] = [
  { path: '/quiz/:slug', element: <QuizInfo /> },
  { path: '/quiz/:slug/start', element: <ActiveQuiz /> },
  { path: '/quizzes', element: <Home /> },
  { path: '*', element: <Navigate to="/home" /> },
];

export { userRoutes };
