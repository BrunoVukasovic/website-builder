import { Reducer } from "redux";

import { Page, PageItemState, PageItem } from "../../models";
import { SET_PAGE, SET_ITEM_CONTENT } from "../types/page";

// export type UpdatedPageElements = "name" | "position" | "slug" | "container";

export interface PageReducerState {
  name: string;
  position: number;
  slug: string;
  container: PageItem[];
  id?: string;
  // updatedElements?: UpdatedPageElements[];
  updatedElements?: {
    name?: boolean;
    position?: boolean;
    slug?: boolean;
    container?: boolean;
  };
}

const initialState: PageReducerState = {
  name: "",
  position: 0,
  slug: "",
  container: [],
  id: "",
  // updatedElements: [],
  // isUpdated: {
  //   name: false,
  //   position: false,
  //   slug: false,
  //   container: false,
  // },
};

const pageReducer: Reducer<PageReducerState> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_PAGE:
      return {
        ...state,
        name: payload.name,
        slug: payload.slug,
        position: payload.position,
        container: payload.container,
        id: payload.id,
      };
    // case EDIT_ITEM:
    //   return {
    //     ...state,
    //     container: state.container.map((item) =>
    //       item.position === payload
    //         ? { ...item, isEditMenuOpen: !item.isEditMenuOpen }
    //         : item
    //     ),
    //   };
    case SET_ITEM_CONTENT:
      return {
        ...state,
        updatedElements: { ...state.updatedElements, container: true },
        container: state.container.map((item) =>
          item.position === payload.position
            ? { ...item, content: payload.content }
            : item
        ),
      };
    default:
      return state;
  }
};

export default pageReducer;
