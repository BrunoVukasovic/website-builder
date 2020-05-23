import { Request, Response } from "express";

import SiteModel from "./SiteModel";
import NavbarModel from "../Navbar";
import PageModel from "../Page/PageModel";
import { CreateSitePayload } from "../../models";
import { Types } from "mongoose";

const SiteController = {
  createNewSite: async (req: Request, res: Response) => {
    console.log("SiteController");
    const { title, pages } = req.body as CreateSitePayload;
    // : { title: string; partialNavbarItems: CreateNavbarPayload[], pageData: CreatePagePayload[] } =
    const { slug } = req.params;

    if (title && pages) {
      try {
        let site = await SiteModel.findOne({ slug });

        if (site) {
          res.status(400).send("Site with this slug already exist");
        } else {
          const navbar = await NavbarModel.create({});
          //@TODO extract this in NavbarController.createAndPopulate
          if (navbar) {
            const { _id: navbarID }: { _id: Types.ObjectId } = navbar;

            const navbarItems = await Promise.all(
              pages.map(async ({ name, position, container }) => {
                const page = await PageModel.create({
                  navbarID,
                  container,
                });

                if (page) {
                  return { name, position, pageID: page._id };
                } else {
                  throw new Error("Error while creating pages");
                }
              })
            );

            await navbar.updateOne({ navbarItems });
            site = await SiteModel.create({ title, slug, navbarID });
            res.status(200).send(site);
          } else {
            res.status(500).send("Error while creating navbar");
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Server error while creating site");
      }
    } else {
      res.status(400).json({
        msg: "Title, navbar and page data must be provided in the request.",
      });
    }
  },
};

export default SiteController;
