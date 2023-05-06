import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Router from './router/router';
import { store } from './store/store';
import './scss/index.scss';
import 'i18n/config';

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
