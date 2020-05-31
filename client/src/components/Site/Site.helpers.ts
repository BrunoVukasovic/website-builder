import { Site, CurrentPage } from "../../models";
import { SiteReducerState } from "../../redux/reducers/site";

export const emptyPage: CurrentPage = {
  name: "",
  position: 0,
  slug: "",
  container: [],
};

export const defaultSite: SiteReducerState = {
  currentSite: {
    title: "New webiste",
    slug: "new-webiste",
    navbar: {},
    shouldAllowEditing: true,
    pages: [
      {
        name: "First page",
        position: 1,
        slug: "prvi",
        container: [
          {
            position: 1,
            content: "<p>Prvi content</p>",
            type: "text",
          },
          {
            position: 2,
            content: "<p>Drugi content</p>",
            type: "text",
          },
        ],
      },
      {
        name: "Second page",
        position: 2,
        slug: "drugi",
        container: [
          {
            position: 1,
            content: "<p>Prvi content na drugoj stranici</p>",
            type: "text",
          },
          {
            position: 2,
            content: "<p>Drugi content na drugoj stranici</p>",
            type: "text",
          },
        ],
      },
    ],
  },
  currentPage: emptyPage,
  allSites: ["new-website"],
};
