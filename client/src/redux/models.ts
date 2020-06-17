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
  pages: CurrentPage[];
  shouldAllowEditing?: boolean;
  deletedPages?: DeletedPage[];
}

export interface HeightAndPosition {
  height: string;
  position: number;
}

export interface ImageSizeFormValues {
  width: string;
  height: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface NavbarState extends Navbar {
  isUpdated?: boolean;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface SegmentContentAndType {
  content: string;
  type: 'text' | 'image';
}

export interface TitleAndSlug {
  title: string;
  slug: string;
}

export interface UpdatePageNamePayload {
  name: string;
  slug: string;
  oldSlug: string;
}

export interface WidthAndPosition {
  width: string;
  position: number;
}
