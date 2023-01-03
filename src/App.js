import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

import Home from 'pages/home/home.component';
import Navigation from 'components/navigation/navigation.component';
import Login from 'pages/login/login.component';
import SignUp from 'pages/signup/signup';
import NotFound from 'pages/notfound/notfound.component';
import { availableRoutesList } from './routes/availableRoutesList';

import 'react-toastify/dist/ReactToastify.css';

function App() {
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

export default App;
