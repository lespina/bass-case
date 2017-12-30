import React from 'react';
import ReactDOM from 'react-dom';
// import * as SessionApiUtil from './util/session_api_util';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  //TODO: take these off the window after development is over.
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to BassCase</h1>, root);
});

// window.SessionApiUtil = SessionApiUtil;
