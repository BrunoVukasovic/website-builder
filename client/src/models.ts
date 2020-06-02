export interface Navbar {
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface CurrentPage extends Page {
  updatedElements?: {
    name?: boolean;
    position?: boolean;
    slug?: boolean;
    container?: boolean;
  };
}

export interface Page {
  name: string;
  position: number;
  slug: string;
  container: PageSegment[];
  id?: string;
}

// @TODO vise ne posotji PageItem nego PageSegment
export interface PageItem {
  position: number;
  content: string;
}

export interface PageSegment {
  position: number;
  content: string;
  type: 'text' | 'image';
}

export interface PageItemState extends PageItem {
  isEditMenuOpen: boolean;
}

export interface currentSite {
  title: string;
  slug: string;
  pages: Page[];
  navbar: Navbar;
  shouldAllowEditing?: boolean;
}

export interface Site {
  currentSite: currentSite;
  allSites?: string[];
}
