import { Navbar, DeletedPage, CurrentPage } from '../models';

export interface CreateSiteFormValues {
  title: string;
  url: string;
}

export interface CurrentSiteState {
  // @TOOD:
  title: string; // odma se update
  slug: string; // odma se update-a skupa sa title
  oldSlug: string;
  navbar: NavbarState; // samo jedan elements isSaved
  pages: CurrentPage[]; // pages.filter(page => page.hasOwnProperty(updatedElements) => switch po onome sta imaju updateano)
  shouldAllowEditing?: boolean;
  deletedPages?: DeletedPage[];
}

export interface NavbarState extends Navbar {
  isUpdated?: boolean;
}

export interface TitleAndSlug {
  title: string;
  slug: string;
}
