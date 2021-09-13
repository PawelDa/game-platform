import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './redux/store';

import './assets/stylesheets/application.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
