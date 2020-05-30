import { Site } from "../../models";

export const defaultSite: Site = {
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
};
