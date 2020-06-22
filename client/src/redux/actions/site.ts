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
  SET_CURRENT_SITE,
  UPDATE_PAGE_NAME,
  UPDATE_CURRENT_PAGE_NAME,
  UPDATE_IMAGE_WIDTH,
  UPDATE_IMAGE_HEIGHT,
  UPDATE_SEGMENT_HORIZONTAL_POSITION,
} from '../types/site';
import { SiteReducerState } from '../reducers/site';
import {
  TitleAndSlug,
  SegmentContentAndType,
  CurrentSiteState,
  UpdatePageNamePayload,
  WidthAndPosition,
  HeightAndPosition,
  HorizontalPosition,
} from '../models';

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

export const setCurrentSite = (site: CurrentSiteState): Action<CurrentSiteState> => ({
  type: SET_CURRENT_SITE,
  payload: site,
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

export const updatePageName = (payload: UpdatePageNamePayload): Action<UpdatePageNamePayload> => ({
  type: UPDATE_PAGE_NAME,
  payload,
});

export const updateCurrentPageName = (payload: TitleAndSlug): Action<TitleAndSlug> => ({
  type: UPDATE_CURRENT_PAGE_NAME,
  payload,
});

export const updateImageHeight = (payload: HeightAndPosition): Action<HeightAndPosition> => ({
  type: UPDATE_IMAGE_HEIGHT,
  payload,
});

export const updateImageWidth = (payload: WidthAndPosition): Action<WidthAndPosition> => ({
  type: UPDATE_IMAGE_WIDTH,
  payload,
});

export const updateSegmentHorizontalPosition = (payload: HorizontalPosition): Action<HorizontalPosition> => ({
  type: UPDATE_SEGMENT_HORIZONTAL_POSITION,
  payload,
});

export const updateTitleAndSlug = (payload: TitleAndSlug): Action<TitleAndSlug> => ({
  type: UPDATE_TITLE_AND_SLUG,
  payload,
});
