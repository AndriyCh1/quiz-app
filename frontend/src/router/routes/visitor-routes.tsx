import { Navigate } from 'react-router-dom';
import { IRoute } from '../common/interfaces/IRoute';
import LogIn from '../../pages/login';
import SignUp from '../../pages/signup';
import Home from '../../pages/home';
import QuizInfo from '../../pages/quiz-info';
import ActiveQuiz from '../../pages/active-quiz';

const visitorRoutes: IRoute[] = [
  { path: '/login', element: <LogIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/quiz/:slug', element: <QuizInfo /> },
  { path: '/quiz/:slug/start', element: <ActiveQuiz /> },
  { path: '/', element: <Home /> },
  { path: '*', element: <Navigate to="/" /> },
];

export { visitorRoutes };
