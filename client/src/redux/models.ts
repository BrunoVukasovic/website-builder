import { Navbar, DeletedPage, CurrentPage } from '../models';

export interface SiteTitleFormValues {
  title: string;
  url: string;
}

export interface CurrentSiteState {
  title: string;
  slug: string;
  oldSlug: string;
  navbar: NavbarState;
  pages: CurrentPage[];
  backgroundColor?: string;
  deletedPages?: DeletedPage[];
  shouldAllowEditing?: boolean;
}

export interface HeightAndPosition {
  height: string;
  position: number;
}

export interface HorizontalPosition {
  horizontalPosition: string;
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
  initialBackgroundColor?: string;
  initialMenuIconColor?: string;
  isUpdated?: boolean;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface AddSegmentActionPayload {
  content: string;
  type: 'text' | 'image';
  position?: number;
}

export interface SlugAndId {
  slug: string;
  id?: string;
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
