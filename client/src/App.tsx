import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import DefaultRouter from './routes/DefaultRouter';
import store from './redux/store';

import { AuthProvider } from './utils/AuthContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
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
      </AuthProvider>
    </Provider>
  );
};

export default App;
