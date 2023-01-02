import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { Provider } from 'react-redux';

import { store } from 'app/routes/store';
import { getBirdsData } from 'widgets/gameSlice';

import 'react-toastify/dist/ReactToastify.css';

import Home from 'pages/home';

import Login from 'pages/login';
import SignUp from 'pages/signup';
import NotFound from 'pages/notfound';
import { availableRoutesList } from './routes/availableRoutesList';

import './app.css';

store.dispatch(getBirdsData());

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path={availableRoutesList.HOME} element={<Home />} />
          <Route path={availableRoutesList.LOGIN} element={<Login />} />
          <Route path={availableRoutesList.SIGN_UP} element={<SignUp />} />
          <Route path={availableRoutesList.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Provider>
      <ToastContainer transition={Zoom} limit={2} />
    </BrowserRouter>
  );
}

export default App;
