import React from 'react';
import ReactDOM from 'react-dom/client';
import { QuestionProvider } from './contexts/questionContext';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </React.StrictMode>
);

reportWebVitals();
