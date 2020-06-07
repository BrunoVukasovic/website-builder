import { Action } from '.';
import { SET_USER } from '../types/user';
import { UserReducerState } from '../reducers/user';

export const setUser = (payload: UserReducerState): Action<UserReducerState> => ({
  type: SET_USER,
  payload,
});
