import { Types } from "mongoose";
import { Page } from "./api/Page/PageModel";
import { Navbar } from "./api/Navbar/NavbarModel";

export interface GetSiteRes {
  currentSite: {
    title: string;
    slug: string;
    pages: Page[];
    navbar: Navbar | null;
  };
  allSites: string[];
}
//@TODO rename u PageSegment
export interface PageItem {
  position: number;
  content: string;
  type: "text" | "image";
}
//@TODO rename u CreateSiteReq
export interface CreateSitePayload {
  title: string;
  pages: {
    name: string;
    position: number;
    slug: string;
    container: PageItem[];
  }[];
}
//@TODO rename u UpdatePagesReq
export interface UpdatePagesPayload {
  updatedPages: {
    _id: Types.ObjectId;
    name?: string;
    position?: number;
    slug?: string;
    container?: PageItem[];
  }[];
}
//@TODO rename u AddNewPagesReq
export interface AddNewPagesPayload {
  newPages: {
    name: string;
    position: number;
    slug: string;
    container: PageItem[];
  }[];
}
