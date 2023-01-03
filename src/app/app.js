import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/store/store';
import AppRoutes from 'app/routes/routes';

const App = () => {
  return (  
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  )
}

export default App;
