import { combineReducers } from 'redux';
import { reducer as formReducer, FormState } from 'redux-form';

import siteReducer, { SiteReducerState } from './site';
import userReducer, { UserReducerState } from './user';

export interface AppState {
  site: SiteReducerState;
  user: UserReducerState;
  form: {
    [name: string]: FormState;
  };
}

export default combineReducers({
  form: formReducer,
  site: siteReducer,
  user: userReducer,
});
