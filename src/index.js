import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuizProvider } from './contexts/QuizContext';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';
// TODO: imports order

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);

reportWebVitals();
