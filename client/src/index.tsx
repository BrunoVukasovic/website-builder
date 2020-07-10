import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './utils/i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import NotFound from './views/NotFound'; //@TODO should be Loading

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={() => <div>Loading Load Load ...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
