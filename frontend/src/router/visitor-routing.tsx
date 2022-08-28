import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { visitorRoutes } from './routes/visitor-routes';

const VisitorRouting = () => {
  return (
    <Routes>
      {visitorRoutes.map((item, index) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default VisitorRouting;
