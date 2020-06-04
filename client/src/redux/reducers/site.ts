import { Reducer } from 'redux';

import { CurrentPage } from '../../models';
import { CurrentSiteState } from '../models';
import {
  SET_SITE,
  UPDATE_CURRENT_PAGE_SEGMENT,
  SET_CURRENT_PAGE_TO_CURRENT_SITE,
  SET_CURRENT_PAGE,
  UPDATE_TITLE_AND_SLUG,
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
        // name: payload.name,
        // slug: payload.slug,
        // position: payload.position,
        // container: payload.container,
        // id: payload.id,
      };
    case SET_SITE:
      return {
        ...state,
        currentSite: payload.currentSite,
        allSites: payload.allSites,
        // title: payload.title,
        // slug: payload.slug,
        // navbar: payload.navbar,
        // pages: payload.pages,
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
            segment.position === payload.position ? { ...segment, content: payload.content } : segment
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
