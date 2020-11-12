import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { initSentry } from './libs/errorLib';

initSentry();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
