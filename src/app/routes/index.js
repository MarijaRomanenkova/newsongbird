import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import Home from 'pages/home';
import Navigation from 'features/navigation';
import Login from 'pages/login';
import SignUp from 'pages/signup';
import NotFound from 'pages/notfound';
import { availableRoutesList } from 'app/routes/available-routes-list';

import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={availableRoutesList.HOME} element={<Home />} />
        <Route path={availableRoutesList.LOGIN} element={<Login />} />
        <Route path={availableRoutesList.SIGN_UP} element={<SignUp />} />
        <Route path={availableRoutesList.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <ToastContainer transition={Zoom} limit={2} />
    </>
  );
}

export default AppRoutes;
