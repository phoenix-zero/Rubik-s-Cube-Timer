import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Heading from './Heading';

ReactDOM.render(
  <div style={{ backgroundColor: 'grey', height: '100vh', color: 'white' }}>
    <Heading />
    <App />
  </div>,
  document.getElementById('root'),
);
