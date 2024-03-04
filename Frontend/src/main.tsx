import React from 'react'; // Core React library that provides the fundamental building blocks for creating components
import ReactDOM from 'react-dom'; // Used to render components in DOM
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
