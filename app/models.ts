//@TODO rename u AddNewPagesReq
// export interface AddNewPagesPayload {
//   newPages: {
//     name: string;
//     position: number;
//     slug: string;
//     container: PageSegment[];
//   }[];
// }

export interface CurrentPage extends Page {
  updatedElements?: {
    name?: boolean;
    position?: boolean;
    slug?: boolean;
    container?: boolean;
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
  allSites?: string[];
}

export interface Navbar {
  logo?: string;
  backgroundColor?: string;
}

export interface Page {
  name: string;
  position: number;
  slug: string;
  container: PageSegment[];
  _id: string;
}

export interface PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
}

export interface PagesData {
  updatedPages?: CurrentPage[];
  deletedPages?: DeletedPage[];
  newPages?: CurrentPage[];
}

//@TODO deprecated
// export interface UpdatePagesPayload {
//   updatedPages: {
//     _id: string;
//     name?: string;
//     position?: number;
//     slug?: string;
//     container?: PageSegment[];
//   }[];
// }

//@TODO deprecated
// export interface UpdatePageReq {
//   name: string;
//   position: number;
//   slug: string;
//   container: PageSegment[];
//   _id?: string;
//   updatedElements: {
//     name?: boolean;
//     position?: boolean;
//     slug?: boolean;
//     container?: boolean;
//   };
// }

// export interface UpdatedPage extends Page {
//   updatedElements: {
//     name?: boolean;
//     position?: boolean;
//     slug?: boolean;
//     container?: boolean;
//   };
// }

export interface UpdateSiteReq {
  siteData?: {
    title: string;
    slug: string;
  };
  navbarData?: Navbar;
  pagesData?: PagesData;
}
