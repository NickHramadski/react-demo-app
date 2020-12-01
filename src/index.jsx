import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import { initSentry } from './libs/errorLib';
import authReducer from './store/auth/';
import notesReducer from './store/notes/';
import { notesApi } from './axios.instance'

initSentry();

const reducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});

const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching:', action);
      const result = next(action);
      console.log('[Middleware] State:', store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
