import { combineReducers } from "redux";
import { reducer as formReducer, FormState } from "redux-form";

export interface AppState {
  // form: {
  //   [name: string]: FormState;
  // };
}

export default combineReducers({
  form: formReducer
});
