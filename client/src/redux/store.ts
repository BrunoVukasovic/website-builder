import logger from "redux-logger";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, Middleware } from "redux";

import rootReducer from "./reducers/rootReducer";

let middleware: Middleware[] = [];

if (process.env.NODE_ENV === "development") {
  // middleware = [logger];
}

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
