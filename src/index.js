import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
// eslint-disable-next-line no-console

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
