import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';

import VisitorRouting from './visitor-routing';
import UserRouting from './user-routing';
import VisitorHeader from '../components/visitor-header';
import UserHeader from '../components/user-header';
import Loading from '../pages/loading';

const Router = () => {
  const dispatch = useAppDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.checkAuth());
    }
    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {isAuth ? (
        <>
          <UserHeader />
          <UserRouting />
        </>
      ) : (
        <>
          <VisitorHeader />
          <VisitorRouting />
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
