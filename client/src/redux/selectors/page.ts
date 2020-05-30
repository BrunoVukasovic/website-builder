import { AppState } from "../reducers/rootReducer";
import { createDeepEqualitySelector } from "./shared";

const getAllPages = (state: AppState) => state.site.pages;

const getCurrentPage = (state: AppState) => state.currentPage;

const getCurrentPageContainer = (state: AppState) =>
  state.currentPage.container;

export const selectAllPages = createDeepEqualitySelector(
  getAllPages,
  (allPages) => allPages
);

export const selectCurrentPage = createDeepEqualitySelector(
  getCurrentPage,
  (page) => page
);

export const selectCurrentPageContainer = createDeepEqualitySelector(
  getCurrentPageContainer,
  (page) => page
);
