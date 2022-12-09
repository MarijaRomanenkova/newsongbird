import React from 'react';
import ReactDOM from 'react-dom/client';

import { QuizProvider } from './contexts/quizContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);

reportWebVitals();
