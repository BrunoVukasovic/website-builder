import { Reducer } from 'redux';
import { SiteTitleAndSlug } from '../../models';
import { SET_USER } from '../types/user';

export interface UserReducerState {
  name: string;
  email: string;
  allSites: SiteTitleAndSlug[];
}

export const initialState: UserReducerState = {
  name: '',
  email: '',
  allSites: [],
};

const userReducer: Reducer<UserReducerState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        allSites: payload.allSites,
      };
    default:
      return state;
  }
};

export default userReducer;
