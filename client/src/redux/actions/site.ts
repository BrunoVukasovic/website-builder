import { Action } from ".";
import { Page } from "../../models";
import { SET_SITE, UPDATE_PAGE } from "../types/site";
import { SiteReducerState } from "../reducers/site";

export const setSite = (site: SiteReducerState): Action<SiteReducerState> => ({
  type: SET_SITE,
  payload: site,
});

export const updatePage = (page: Page): Action<Page> => ({
  type: UPDATE_PAGE,
  payload: page,
});
