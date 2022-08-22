import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '../pages/home';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';
import LogIn from '../pages/login';
import SignUp from '../pages/signup';
import QuizInfo from '../pages/quiz-info';
import QuizStart from '../pages/quiz-start';

const Router = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.checkAuth());
    }
  }, []);

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path="/quiz/:slug" element={<QuizInfo />} />
          <Route path="/quiz/:slug/start" element={<QuizStart />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
