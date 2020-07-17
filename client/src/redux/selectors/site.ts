import { AppState } from '../reducers/rootReducer';
import { createDeepEqualitySelector } from './shared';

const getCurrentPage = (state: AppState) => state.site.currentPage;

const getCurrentSite = (state: AppState) => state.site.currentSite;

export const selectCurrentPage = createDeepEqualitySelector(getCurrentPage, (page) => page);

export const selectCurrentSite = createDeepEqualitySelector(getCurrentSite, (currentSite) => currentSite);
