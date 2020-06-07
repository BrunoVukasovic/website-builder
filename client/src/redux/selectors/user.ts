import { AppState } from '../reducers/rootReducer';
import { createDeepEqualitySelector } from './shared';

const getUserValues = (state: AppState) => state.user;

export const selectUserReducerValues = createDeepEqualitySelector(getUserValues, (user) => user);
