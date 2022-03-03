import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';
import logger from './services/logService';
import ErrorBoundary from './components/common/errorBoundary';

import 'bulma/css/bulma.css';
import '@creativebulma/bulma-tooltip/dist/bulma-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import './layout/styles.css';

logger.init();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
