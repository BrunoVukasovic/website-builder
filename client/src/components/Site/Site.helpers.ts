import { CurrentPage } from '../../models';
import { SiteReducerState } from '../../redux/reducers/site';

export const emptyPage: CurrentPage = {
  name: '',
  position: 0,
  slug: '',
  container: [],
};

export const defaultSite: SiteReducerState = {
  currentSite: {
    title: 'New website',
    slug: 'new-website',
    oldSlug: 'new-website',
    navbar: {},
    shouldAllowEditing: true,
    pages: [
      {
        name: '<p>First page</p>',
        position: 1,
        slug: 'first-page',
        container: [
          {
            position: 1,
            content: '<p>Feel free to edit anything!</p>',
            type: 'text',
          },
          {
            position: 2,
            content: '<p>Some content</p>',
            type: 'text',
          },
        ],
      },
      {
        name: '<p>Second page</p>',
        position: 2,
        slug: 'second-page',
        container: [
          {
            position: 1,
            content: '<p>First content on the second page</p>',
            type: 'text',
          },
          {
            position: 2,
            content: '<p>Second content on the second page</p>',
            type: 'text',
          },
        ],
      },
    ],
  },
  currentPage: emptyPage,
  allSites: ['new-website'],
};
