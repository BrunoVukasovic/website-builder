export interface PageItem {
  position: number;
  content: string;
}

export interface UpdateNavbarPayload {
  name: string;
  position: number;
  oldName?: string;
  oldPosition?: number;
  isNewItem?: boolean;
}

export interface CreateSitePayload {
  title: string;
  pages: {
    name: string;
    position: number;
    container: PageItem[];
  }[];
}

export interface UpdatePagesPayload {
  updatedPages?: {
    name: string;
    position: number;
    container?: PageItem[];
    oldName?: string;
    oldPosition?: string;
    new?: boolean;
  }[];
}
