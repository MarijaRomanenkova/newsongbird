import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from 'store/store';
import { IntlProvider } from 'react-intl';
// import English from 'lang/en.json';
import Lithuanian from 'lang/lt.json';
// import Russian from 'lang/ru.json';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// const locale = navigator.language;
// let lang;
// if (locale === 'ru') {
//   lang = Russian;
// } else if (locale === 'lt') {
//   lang = Lithuanian;
// } else {
//   lang = English;
// }

// locale={lt} 

root.render(
  <IntlProvider messages={Lithuanian} locale="lt" defaultLocale="lt">
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </IntlProvider>
);

reportWebVitals();
