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
        const site = await SiteModel.findOne({ slug: siteSlug });
        if (site) {
          //@TODO nije dobro, mora trazit sve stranice
          const currentPages = await PageModel.find({ siteID: site._id });

          console.log(site);
          console.log(currentPages);
          if (currentPages) {
            await Promise.all(
              currentPages.map(async (currentPage) => {
                const updatedPage = updatedPages.find(
                  //@TODO vidi moze li === kad napravis frontend
                  (page) => page._id == currentPage._id
                );

                if (updatedPage) {
                  await currentPage.updateOne({
                    name: updatedPage.name
                      ? updatedPage.name
                      : currentPage.name,
                    position: updatedPage.position
                      ? updatedPage.position
                      : currentPage.position,
                    container: updatedPage.container
                      ? updatedPage.container
                      : currentPage.container,
                    siteID: currentPage.siteID,
                  });
                }
              })
            );

            res.status(200).send("Pages updated");
          }
        } else {
          res.status(500).send("Error while finding site.");
        }
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
