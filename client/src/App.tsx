import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./redux/store";
import DefaultRouter from "./routes/DefaultRouter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DefaultRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
