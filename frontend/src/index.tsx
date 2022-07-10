import React from 'react';
import './index.css';
import { render } from 'react-dom';
import './assets/scss/styles.scss';
import App from './components/app/app';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);