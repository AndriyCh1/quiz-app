import React from 'react';

import { BiLoader as LoadingIcon } from 'react-icons/bi';

const NotFound = () => {
  return (
    <div className="loading">
      <h2 className="loading__text">Loading...</h2>
      <LoadingIcon className="loading__icon" />
    </div>
  );
};

export default NotFound;
