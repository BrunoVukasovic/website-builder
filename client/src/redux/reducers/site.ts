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
  UPDATE_PAGE_NAME,
  UPDATE_CURRENT_PAGE_NAME,
  UPDATE_IMAGE_WIDTH,
  UPDATE_IMAGE_HEIGHT,
  UPDATE_SEGMENT_HORIZONTAL_POSITION,
  DELETE_PAGE_SEGMENT,
  DELETE_PAGE,
  CHANGE_COLOR_NAVBAR,
  UNDO_NAVBAR_COLOR_CHANGE,
  UPDATE_INITIAL_NAVBAR_COLOR,
  CHANGE_COLOR_SINGLE_PAGE,
  UNDO_PAGE_COLOR_CHANGE,
  UPDATE_INITIAL_SINGLE_PAGE_COLOR,
  UPDATE_ALL_PAGES_COLOR,
  CHANGE_COLOR_MENU_ICON,
  UNDO_MENU_ICON_COLOR_CHANGE,
  UPDATE_INITIAL_MENU_ICON_COLOR,
  CHANGE_LOGO,
  DELETE_LOGO,
  MOVE_PAGE_SEGMENT_FORWARD,
  MOVE_PAGE_SEGMENT_BACKWARDS,
  MOVE_NAVBAR_ITEM_BACKWARDS,
  MOVE_NAVBAR_ITEM_FORWARD,
  UPDATE_CURRENT_PAGE_POSITION,
} from '../types/site';

export interface SiteReducerState {
  currentSite: CurrentSiteState;
  currentPage: Omit<CurrentPage, 'position'>;
}

const initialState: SiteReducerState = {
  currentSite: {
    title: '',
    slug: '',
    oldSlug: '',
    navbar: { initialBackgroundColor: '#FFFFFF' },
    pages: [],
    shouldAllowEditing: false,
  },
  currentPage: {
    name: '',
    slug: '',
    backgroundColor: '',
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
            {
              position: payload.position ? payload.position : state.currentPage.container.length + 1,
              content: payload.content,
              type: payload.type,
            },
          ],
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
        },
      };
    case CHANGE_COLOR_NAVBAR:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            backgroundColor: payload,
            isUpdated: true,
          },
        },
      };
    case CHANGE_COLOR_MENU_ICON:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            menuIconColor: payload,
            isUpdated: true,
          },
        },
      };
    case CHANGE_COLOR_SINGLE_PAGE:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          backgroundColor: payload,
          updatedElements: {
            ...state.currentPage.updatedElements,
            color: true,
          },
        },
      };
    case CHANGE_LOGO:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            logo: payload,
            isUpdated: true,
          },
        },
      };
    case DELETE_LOGO:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            logo: undefined,
            isUpdated: true,
          },
        },
      };
    case DELETE_PAGE:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          deletedPages: state.currentSite.deletedPages ? [...state.currentSite.deletedPages, payload.id] : [payload.id],
          pages: state.currentSite.pages.filter((page) => page.slug !== payload.slug),
        },
      };
    case DELETE_PAGE_SEGMENT:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
          container: state.currentPage.container.filter((segment) => segment.position !== payload),
        },
      };
    case MOVE_NAVBAR_ITEM_BACKWARDS:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: state.currentSite.pages.map((page) => {
            if (page.position === payload) {
              return {
                ...page,
                position: payload - 1,
                updatedElements: {
                  ...page.updatedElements,
                  position: true,
                },
              };
            } else if (page.position === payload - 1) {
              return {
                ...page,
                position: page.position + 1,
                updatedElements: {
                  ...page.updatedElements,
                  position: true,
                },
              };
            } else {
              return page;
            }
          }),
        },
      };
    case MOVE_NAVBAR_ITEM_FORWARD:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: state.currentSite.pages.map((page) => {
            if (page.position === payload) {
              return {
                ...page,
                position: payload + 1,
                updatedElements: {
                  ...page.updatedElements,
                  position: true,
                },
              };
            } else if (page.position === payload + 1) {
              return {
                ...page,
                position: page.position - 1,
                updatedElements: {
                  ...page.updatedElements,
                  position: true,
                },
              };
            } else {
              return page;
            }
          }),
        },
      };
    case MOVE_PAGE_SEGMENT_BACKWARDS:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
          container: state.currentPage.container.map((segment) => {
            if (segment.position === payload) {
              return {
                ...segment,
                position: payload - 1,
              };
            } else if (segment.position === payload - 1) {
              return {
                ...segment,
                position: segment.position + 1,
              };
            } else {
              return segment;
            }
          }),
        },
      };
    case MOVE_PAGE_SEGMENT_FORWARD:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
          container: state.currentPage.container.map((segment) => {
            if (segment.position === payload) {
              return {
                ...segment,
                position: payload + 1,
              };
            } else if (segment.position === payload + 1) {
              return {
                ...segment,
                position: segment.position - 1,
              };
            } else {
              return segment;
            }
          }),
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
        currentSite: {
          ...payload.currentSite,
          navbar: {
            ...payload.currentSite.navbar,
            initialBackgroundColor: payload.currentSite.navbar.backgroundColor,
            initialMenuIconColor: payload.currentSite.navbar.menuIconColor,
          },
        },
      };
    case SET_CURRENT_PAGE_TO_CURRENT_SITE:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: state.currentSite.pages.map((page) =>
            page.slug === state.currentPage.slug ? { ...state.currentPage, position: page.position } : page
          ),
        },
      };
    case UNDO_NAVBAR_COLOR_CHANGE:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            backgroundColor: state.currentSite.navbar.initialBackgroundColor,
          },
        },
      };
    case UNDO_MENU_ICON_COLOR_CHANGE:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            menuIconColor: state.currentSite.navbar.initialMenuIconColor,
          },
        },
      };
    case UNDO_PAGE_COLOR_CHANGE:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          backgroundColor: state.currentPage.initialBackgroundColor,
          updatedElements: {
            ...state.currentPage.updatedElements,
            color: false,
          },
        },
      };
    case UPDATE_ALL_PAGES_COLOR:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: state.currentSite.pages.map((page) => ({
            ...page,
            backgroundColor: state.currentPage.backgroundColor,
            updatedElements: {
              ...page.updatedElements,
              color: true,
            },
          })),
        },
      };
    case UPDATE_CURRENT_PAGE_POSITION:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          position: payload,
          updatedElements: {
            ...state.currentPage.updatedElements,
            position: true,
          },
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
    case UPDATE_PAGE_NAME:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          pages: state.currentSite.pages.map((page) =>
            page.slug === payload.oldSlug
              ? {
                  ...page,
                  name: payload.name,
                  slug: payload.slug,
                  updatedElements: { ...page.updatedElements, name: true },
                }
              : page
          ),
        },
      };
    case UPDATE_CURRENT_PAGE_NAME:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          updatedElements: {
            ...state.currentPage.updatedElements,
            name: true,
          },
          name: payload.title,
          slug: payload.slug,
        },
      };
    case UPDATE_INITIAL_NAVBAR_COLOR:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            initialBackgroundColor: state.currentSite.navbar.backgroundColor,
          },
        },
      };
    case UPDATE_INITIAL_MENU_ICON_COLOR:
      return {
        ...state,
        currentSite: {
          ...state.currentSite,
          navbar: {
            ...state.currentSite.navbar,
            initialMenuIconColor: state.currentSite.navbar.menuIconColor,
          },
        },
      };
    case UPDATE_INITIAL_SINGLE_PAGE_COLOR:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          initialBackgroundColor: state.currentPage.backgroundColor,
        },
      };
    case UPDATE_IMAGE_HEIGHT:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          container: state.currentPage.container.map((segment) =>
            segment.position === payload.position
              ? {
                  ...segment,
                  style: { ...segment.style, content: { ...segment.style?.content, height: payload.height } },
                }
              : segment
          ),
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
        },
      };
    case UPDATE_IMAGE_WIDTH:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          container: state.currentPage.container.map((segment) =>
            segment.position === payload.position
              ? {
                  ...segment,
                  style: { ...segment.style, content: { ...segment.style?.content, width: payload.width } },
                }
              : segment
          ),
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
        },
      };
    case UPDATE_SEGMENT_HORIZONTAL_POSITION:
      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          container: state.currentPage.container.map((segment) =>
            segment.position === payload.position
              ? {
                  ...segment,
                  style: { ...segment.style, wrapper: { position: payload.horizontalPosition } },
                }
              : segment
          ),
          updatedElements: {
            ...state.currentPage.updatedElements,
            container: true,
          },
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
