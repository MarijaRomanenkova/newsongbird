import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from 'pages/home/home';
import Navigation from 'components/navigation/navigation.component';
import LoginForm from 'pages/loginform/loginform.component';
import SignUp from 'pages/signup/signup';
import NotFound from 'pages/notfound/notfound.component';
import { availableRoutesList } from './routes/availableRoutesList';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={availableRoutesList.HOME} element={<Home />} />
        <Route path={availableRoutesList.LOGIN} element={<LoginForm />} />
        <Route path={availableRoutesList.SIGN_UP} element={<SignUp />} />
        <Route path={availableRoutesList.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <ToastContainer transition={Zoom} limit={2} />
    </>
  );
}

export default App;
