import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ToastContainer, Zoom } from 'react-toastify';
import { useSelector } from 'react-redux';

import Navigation from 'components/navigation/navigation.component';
import NotFound from 'pages/notfound/notfound.component';
import Loader from 'components/loader/loader.component';
import { selectLocale } from 'store/gameSlice';
import English from 'lang/en.json';
import Lithuanian from 'lang/lt.json';
import Russian from 'lang/ru.json';
import { availableRoutesList } from './routes/availableRoutesList';

import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('pages/home/home.component'));
const SignUp = lazy(() => import('pages/signup/signup'));
const Login = lazy(() => import('pages/login/login.component'));

function App() {
  let messagesLanguage;
  const locale = useSelector(selectLocale);
  if (locale === 'lt-LT') {
    messagesLanguage = Lithuanian;
  } else if (locale === 'ru-RU') {
    messagesLanguage = Russian;
  } else {
    messagesLanguage = English;
  }

  return (
    <IntlProvider locale={locale} messages={messagesLanguage}>
      <Navigation />
      <Routes>
        <Route
          path={availableRoutesList.HOME}
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={availableRoutesList.LOGIN}
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path={availableRoutesList.SIGN_UP}
          element={
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route path={availableRoutesList.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <ToastContainer transition={Zoom} limit={2} />
    </IntlProvider>
  );
}

export default App;
