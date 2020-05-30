import { getFormValues } from "redux-form";

import { AppState } from "../reducers/rootReducer";
import { createDeepEqualitySelector } from "./shared";

const getCurrentSite = (state: AppState) => state.site;

export const selectCurrentSite = createDeepEqualitySelector(
  getCurrentSite,
  (site) => site
);
