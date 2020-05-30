import { Reducer } from "redux";

import { Page, Navbar } from "../../models";
import { SET_SITE, UPDATE_PAGE } from "../types/site";
import { DialogTitle } from "@material-ui/core";

export interface SiteReducerState {
  //@TOOD:
  title: string; // odma se update
  slug: string; // odma se update-a skupa sa title
  navbar: Navbar; // samo jedan elements isSaved
  pages: Page[]; // pages.filter(page => page.hasOwnProperty(updatedElements) => switch po onome sta imaju updateano)
  // isSaved: boolean; // ne triba
}

const initialState: SiteReducerState = {
  title: "",
  slug: "",
  navbar: {},
  pages: [],
  // isSaved: false,
};

const siteReducer: Reducer<SiteReducerState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_SITE:
      return {
        ...state,
        title: payload.title,
        slug: payload.slug,
        navbar: payload.navbar,
        pages: payload.pages,
      };
    case UPDATE_PAGE:
      return {
        ...state,
        pages: state.pages.map((page) =>
          page.slug === payload.slug ? { page: payload } : page
        ),
      };
    default:
      return state;
  }
};

export default siteReducer;
