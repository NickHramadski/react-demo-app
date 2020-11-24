import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { initSentry } from './libs/errorLib';
import authReducer from './store/auth/';
import notesReducer from './store/notes/';

initSentry();

const reducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
