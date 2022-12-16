import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from 'pages/home/home';
import Navigation from 'components/navigation/navigation.component';
import LoginForm from 'pages/loginform/loginform.component';
import SignUp from 'pages/signup/signup';
import NotFound from 'pages/notfound/notfound.component';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
