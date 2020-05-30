import { combineReducers } from "redux";
// import { reducer as formReducer, FormState } from "redux-form";

import siteReducer, { SiteReducerState } from "./site";
import pageReducer, { PageReducerState } from "./page";

export interface AppState {
  site: SiteReducerState;
  currentPage: PageReducerState;
  // form: {
  //   [name: string]: FormState;
  // };
}

export default combineReducers({
  // form: formReducer,
  site: siteReducer,
  currentPage: pageReducer,
});
