import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
// import * as SessionApiUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  // TESTING START
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING END

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});

// window.SessionApiUtil = SessionApiUtil;
