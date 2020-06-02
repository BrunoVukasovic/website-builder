import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import store from './redux/store';
import DefaultRouter from './routes/DefaultRouter';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={2}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          hideIconVariant
        >
          <DefaultRouter />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
