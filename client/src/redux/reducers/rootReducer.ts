import { combineReducers } from 'redux';
import { reducer as formReducer, FormState } from 'redux-form';

import siteReducer, { SiteReducerState } from './site';

export interface AppState {
  site: SiteReducerState;
  form: {
    [name: string]: FormState;
  };
}

export default combineReducers({
  form: formReducer,
  site: siteReducer,
});
