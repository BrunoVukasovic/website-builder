import { Reducer } from 'redux';

import { CurrentPage } from '../../models';
import { CurrentSiteState } from '../models';
import {
  SET_SITE,
  UPDATE_CURRENT_PAGE_SEGMENT,
  SET_CURRENT_PAGE_TO_CURRENT_SITE,
  SET_CURRENT_PAGE,
  UPDATE_TITLE_AND_SLUG,
  ADD_NEW_PAGE,
  ADD_PAGE_SEGMENT,
  SET_CURRENT_SITE,
} from '../types/site';

export interface SiteReducerState {
  currentSite: CurrentSiteState;
  currentPage: CurrentPage;
  allSites?: string[];
}

const initialState: SiteReducerState = {
  currentSite: {
    title: '',
    slug: '',
    oldSlug: '',
    navbar: {},
    pages: [],
    shouldAllowEditing: false,
  },
  currentPage: {
    name: '',
    position: 0,
    slug: '',
    container: [],
  },
};

const siteReducer: Reducer<SiteReducerState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_NEW_PAGE:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: [
            ...state.currentSite.pages,
            { name: payload.title, slug: payload.slug, position: state.currentSite.pages.length + 1, container: [] },
          ],
        },
      };
    case ADD_PAGE_SEGMENT:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          container: [
            ...state.currentPage.container,
            { position: state.currentPage.container.length + 1, content: payload.content, type: payload.type },
          ],
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
        },
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case SET_CURRENT_SITE:
      return {
        ...state,
        currentSite: payload,
      };
    case SET_SITE:
      return {
        ...state,
        currentSite: payload.currentSite,
        allSites: payload.allSites,
      };
    case SET_CURRENT_PAGE_TO_CURRENT_SITE:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: state.currentSite.pages.map((page) =>
            page.slug === state.currentPage.slug ? { ...state.currentPage } : page
          ),
        },
      };
    case UPDATE_CURRENT_PAGE_SEGMENT:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
          container: state.currentPage.container.map((segment) =>
            segment.position === payload.position
              ? { ...segment, content: payload.content, type: payload.type }
              : segment
          ),
        },
      };
    case UPDATE_TITLE_AND_SLUG:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          title: payload.title,
          slug: payload.slug,
          oldSlug: payload.slug,
        },
      };
    default:
      return state;
  }
};

export default siteReducer;
