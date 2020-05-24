import { Request, Response } from "express";

import PageModel from "./PageModel";
import SiteModel from "../Site";

import { UpdatePagesPayload, AddNewPagesPayload } from "../../models";

const PageController = {
  addNew: async (req: Request, res: Response) => {
    const { newPages } = req.body as AddNewPagesPayload;
    const { siteSlug } = req.params;
    try {
      const site = await SiteModel.findOne({ slug: siteSlug });

      if (site) {
        await Promise.all(
          newPages.map(
            async (newPage) =>
              await PageModel.create({
                name: newPage.name,
                position: newPage.position,
                container: newPage.container,
                siteID: site._id,
              })
          )
        );

        res.status(200).send("Pages created");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error while creating pages.");
    }
  },
  update: async (req: Request, res: Response) => {
    const { updatedPages } = req.body as UpdatePagesPayload;
    const { siteSlug } = req.params;

    if (updatedPages) {
      try {
        Promise.all(
          updatedPages.map(async (page) => {
            const { name, position, container, _id } = page;

            await PageModel.findByIdAndUpdate(_id, {
              ...(name && { name }),
              ...(position && { position }),
              ...(container && { container }),
            });
          })
        );

        res.status(200).send("Pages updated");
      } catch (err) {
        console.log(err);
        res.status(500).send("Error while updating pages.");
      }
    } else {
      res
        .status(400)
        .send("Updated page content must be provided in the request.");
    }
  },
};

export default PageController;
