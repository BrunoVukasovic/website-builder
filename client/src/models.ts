export interface CurrentPage extends Page {
  initialBackgroundColor?: string;
  updatedElements?: {
    name?: boolean;
    position?: boolean;
    container?: boolean;
    color?: boolean;
  };
}

export interface CurrentSite {
  title: string;
  slug: string;
  oldSlug: string;
  pages: Page[];
  navbar: Navbar;
  shouldAllowEditing?: boolean;
}

export interface DeletedPage {
  id: string;
}

export interface GetSiteRes {
  currentSite: CurrentSite;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface Navbar {
  logo?: string;
  backgroundColor?: string;
  menuIconColor?: string;
}

export interface Page {
  name: string;
  position: number;
  slug: string;
  container: PageSegment[];
  backgroundColor?: string;
  _id?: string;
}

export interface PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
  style?: {
    wrapper?: {
      position?: 'flex-start' | 'center' | 'flex-end';
    };
    content?: {
      width?: string;
      height?: string;
    };
  };
}

export interface PagesData {
  updatedPages?: CurrentPage[];
  deletedPages?: DeletedPage[];
  newPages?: CurrentPage[];
}

export interface RegisterUserReq {
  name: string;
  email: string;
  password: string;
}

export interface RenameSiteReq {
  title: string;
  slug: string;
}

export interface SiteTitleAndSlug {
  title: string;
  slug: string;
}

export interface UpdateSiteReq {
  siteData?: {
    title: string;
    slug: string;
  };
  navbarData?: Navbar;
  pagesData?: PagesData;
}

export interface UserAuthRes {
  name: string;
  email: string;
  allSites: SiteTitleAndSlug[];
  token: string;
}

export interface UserDataRes {
  name: string;
  email: string;
  allSites: SiteTitleAndSlug[];
}
