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
        slug: 'prvi',
        container: [
          {
            position: 1,
            content: '<p>Prvi content</p>',
            type: 'text',
          },
          {
            position: 2,
            content: '<p>Drugi content</p>',
            type: 'text',
          },
        ],
      },
      {
        name: '<p>Second page</p>',
        position: 2,
        slug: 'drugi',
        container: [
          {
            position: 1,
            content: '<p>Prvi content na drugoj stranici</p>',
            type: 'text',
          },
          {
            position: 2,
            content: '<p>Drugi content na drugoj stranici</p>',
            type: 'text',
          },
        ],
      },
    ],
  },
  currentPage: emptyPage,
  allSites: ['new-website'],
};
