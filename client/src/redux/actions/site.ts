import { Action } from ".";
import { CurrentPage, PageSegment } from "../../models";
import {
  SET_SITE,
  UPDATE_CURRENT_PAGE_SEGMENT,
  UPDATE_PAGE_ON_CURRENT_SITE,
  SET_CURRENT_PAGE,
} from "../types/site";
import { SiteReducerState } from "../reducers/site";

export const setCurrentPage = (page: CurrentPage): Action<CurrentPage> => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setSite = (site: SiteReducerState): Action<SiteReducerState> => ({
  type: SET_SITE,
  payload: site,
});

export const updatePageOnCurrentSite = (
  page: CurrentPage
): Action<CurrentPage> => ({
  type: UPDATE_PAGE_ON_CURRENT_SITE,
  payload: page,
});

export const updateCurrentPageSegment = (
  segment: PageSegment
): Action<PageSegment> => ({
  type: UPDATE_CURRENT_PAGE_SEGMENT,
  payload: segment,
});
