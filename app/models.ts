import { Types } from "mongoose";

export interface PageItem {
  position: number;
  content: string;
}

export interface CreateSitePayload {
  title: string;
  pages: {
    name: string;
    position: number;
    slug: string;
    container: PageItem[];
  }[];
}

export interface UpdatePagesPayload {
  updatedPages: {
    _id: Types.ObjectId;
    name?: string;
    position?: number;
    slug?: string;
    container?: PageItem[];
  }[];
}

export interface AddNewPagesPayload {
  newPages: {
    name: string;
    position: number;
    slug: string;
    container: PageItem[];
  }[];
}
