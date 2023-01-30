import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import Navigation from 'features/navigation';
import NotFound from 'pages/notfound';
import Loader from 'shared/ui/loader';
import { availableRoutesList } from 'app/routes/available-routes-list';

import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('pages/home'));
const SignUp = lazy(() => import('pages/signup'));
const Login = lazy(() => import('pages/login'));

const AppRoute: React.FC = () => {
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
};

export default AppRoute;
