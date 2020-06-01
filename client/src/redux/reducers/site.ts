import { Reducer } from 'redux';

import { Page, Navbar, CurrentPage, Site } from '../../models';
import {
  SET_SITE,
  UPDATE_CURRENT_PAGE_SEGMENT,
  SET_CURRENT_PAGE_TO_CURRENT_SITE,
  SET_CURRENT_PAGE,
} from '../types/site';
import { DialogTitle } from '@material-ui/core';

export interface SiteReducerState extends Site {
  currentSite: {
    //@TOOD:
    title: string; // odma se update
    slug: string; // odma se update-a skupa sa title
    navbar: Navbar; // samo jedan elements isSaved
    pages: (Page | CurrentPage)[]; // pages.filter(page => page.hasOwnProperty(updatedElements) => switch po onome sta imaju updateano)
    shouldAllowEditing?: boolean;
    // isSaved: boolean; // ne triba
  };
  currentPage: CurrentPage;
  allSites?: string[];
}

const initialState: SiteReducerState = {
  currentSite: {
    title: '',
    slug: '',
    navbar: {},
    pages: [],
    shouldAllowEditing: false,
    // isSaved: false,
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
    default:
      return state;
  }
};

export default siteReducer;
