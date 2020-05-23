import { Request, Response } from "express";
import { Types } from "mongoose";

import PageModel from "./PageModel";
import SiteModel from "../Site";

import NavbarModel, { Navbar } from "../Navbar";

const PageController = {
  addNewPage: async (req: Request, res: Response) => {
    console.log("SiteController");
    const { container } = req.body;
    const { siteSlug, pageSlug } = req.params;

    if (container) {
      try {
        const site = await SiteModel.findOne({ siteSlug });
        if (site) {
          const navbar = await NavbarModel.findById(site.navbarID);

          if (
            navbar &&
            navbar.navbarItems.find((item) => item.name === pageSlug)
          ) {
            // updatePage(container, ...sta jos triba)
          } else {
            // kreiraj praznu starnicu
            // dodaj navbarItem
            // updatePage(container, ...sta jos triba)
          }
        } else {
          res.status(500).send("Couldn't find site with that slug");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Server error while creating page");
      }
    } else {
      res
        .status(400)
        .json({ msg: "Title and slug must be provided in request" });
    }
  },
  createEmpty: async (navbarID: Types.ObjectId) => {
    try {
      const page = await PageModel.create({ navbarID, container: [] });
      if (page) {
        return page._id;
      }
    } catch (err) {
      console.log(err);
    }

    return undefined;
  },
  update: async (req: Request, res: Response) => {
    const {} = req.body;
  },
};

export default PageController;
