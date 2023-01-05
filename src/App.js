import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import Navigation from 'components/navigation/navigation.component';
import NotFound from 'pages/notfound/notfound.component';
import Loader from 'components/loader/loader.component';
import { availableRoutesList } from './routes/availableRoutesList';

import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('pages/home/home.component'));
const SignUp = lazy(() => import('pages/signup/signup'));
const Login = lazy(() => import('pages/login/login.component'));

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
