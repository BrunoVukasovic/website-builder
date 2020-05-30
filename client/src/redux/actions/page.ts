import { Action } from ".";
import { Page, PageItemState, PageItem } from "../../models";
import { SET_PAGE, SET_ITEM_CONTENT } from "../types/page";

export const setCurrentPage = (page: Page): Action<Page> => ({
  type: SET_PAGE,
  payload: page,
});

// export const setEditMenuOpen = (position: Number): Action<Number> => ({
//   type: EDIT_ITEM,
//   payload: position,
// });

export const setItemContent = (item: PageItem): Action<PageItem> => ({
  type: SET_ITEM_CONTENT,
  payload: item,
});
