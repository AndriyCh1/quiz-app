import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { authActions } from '../store/auth';

import VisitorHeader from '../components/visitor-header';
import UserHeader from '../components/user-header';
import Loading from '../pages/loading';
import { userRoutes } from './routes/user-routes';
import { visitorRoutes } from './routes/visitor-routes';

const Router = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.checkAuth());
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {isAuth ? (
        <>
          <UserHeader />
          <Routes>
            {userRoutes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Routes>
        </>
      ) : (
        <>
          <VisitorHeader />
          <Routes>
            {visitorRoutes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
