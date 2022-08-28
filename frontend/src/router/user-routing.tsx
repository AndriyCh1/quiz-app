import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { userRoutes } from './routes/user-routes';

const UserRouting = () => {
  return (
    <Routes>
      {userRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default UserRouting;
