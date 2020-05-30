export interface CreateSite {
  title: string;
}

export interface Navbar {
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface Page {
  name: string;
  position: number;
  slug: string;
  container: PageSegment[];
  id?: string;
}

//@TODO vise ne posotji PageItem nego PageSegment
export interface PageItem {
  position: number;
  content: string;
}

export interface PageSegment {
  position: number;
  content: string;
  type: "text" | "image";
}

export interface PageItemState extends PageItem {
  isEditMenuOpen: boolean;
}

export interface Site {
  title: string;
  slug: string;
  pages: Page[];
  navbar: Navbar;
  shouldAllowEditing?: boolean;
}
