import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';
import Header from '../components/header';
import VisitorRouting from './visitor-routing';
import UserRouting from './user-routing';

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
      {isAuth ? (
        <>
          <Header />
          <UserRouting />
        </>
      ) : (
        <>
          <Header />
          <VisitorRouting />
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
