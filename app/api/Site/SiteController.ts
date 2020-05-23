import { Request, Response } from "express";

import SiteModel from "./SiteModel";
import NavbarModel from "../Navbar";
import PageModel from "../Page/PageModel";

import { CreateSitePayload } from "../../models";

const SiteController = {
  createNewSite: async (req: Request, res: Response) => {
    console.log("SiteController");
    const { title, pages } = req.body as CreateSitePayload;
    const { slug } = req.params;

    if (title && pages) {
      try {
        let site = await SiteModel.findOne({ slug });

        if (site) {
          res.status(400).send("Site with this slug already exist");
        } else {
          const navbar = await NavbarModel.create({});
          site = await SiteModel.create({ title, slug, navbarID: navbar._id });

          if (navbar && site) {
            await Promise.all(
              pages.map(async ({ name, position, container }) => {
                await PageModel.create({
                  container,
                  position,
                  name,
                  //@ts-ignore
                  siteID: site._id,
                });
              })
            );

            res.status(200).send(site);
          } else {
            res.status(500).send("Error while creating navbar and site");
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
