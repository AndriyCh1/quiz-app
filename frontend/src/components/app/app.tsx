import LogIn from '../auth/login';
import './styles.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../auth/signup';
import NotFound from '../not-found/not-found';
import Main from '../main/main';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { useEffect } from 'react';
import { authActions } from '../../store/auth';

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.checkAuth());
    }
  }, []);

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path="/home" element={<Main />} />
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

export default App;
