import React from 'react';
import { render } from 'react-dom';

import Router from './routes/router';

import { Provider } from 'react-redux';
import { store } from './store/store';

import './scss/index.scss';

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
