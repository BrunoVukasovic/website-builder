import { Action } from '.';
import { CurrentPage, PageSegment } from '../../models';
import {
  SET_SITE,
  UPDATE_CURRENT_PAGE_SEGMENT,
  SET_CURRENT_PAGE_TO_CURRENT_SITE,
  SET_CURRENT_PAGE,
  UPDATE_TITLE_AND_SLUG,
  ADD_NEW_PAGE,
  ADD_PAGE_SEGMENT,
} from '../types/site';
import { SiteReducerState } from '../reducers/site';
import { TitleAndSlug, SegmentContentAndType } from '../models';

export const addNewPage = (payload: TitleAndSlug): Action<TitleAndSlug> => ({
  type: ADD_NEW_PAGE,
  payload,
});

export const addPageSegment = (payload: SegmentContentAndType): Action<SegmentContentAndType> => ({
  type: ADD_PAGE_SEGMENT,
  payload,
});

export const setCurrentPage = (page: CurrentPage): Action<CurrentPage> => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setSite = (site: SiteReducerState): Action<SiteReducerState> => ({
  type: SET_SITE,
  payload: site,
});

export const setCurrentPageToCurrentSite = (): Action => ({
  type: SET_CURRENT_PAGE_TO_CURRENT_SITE,
});

export const updateCurrentPageSegment = (segment: PageSegment): Action<PageSegment> => ({
  type: UPDATE_CURRENT_PAGE_SEGMENT,
  payload: segment,
});

export const updateTitleAndSlug = (payload: TitleAndSlug): Action<TitleAndSlug> => ({
  type: UPDATE_TITLE_AND_SLUG,
  payload,
});
