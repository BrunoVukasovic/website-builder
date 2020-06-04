import { Request, Response } from 'express';

import PageModel from './PageModel';
import SiteModel from '../Site';

import { PagesData } from '../../models';
import { Types } from 'mongoose';

const PageController = {
  // addNew: async (req: Request, res: Response) => {
  //   const { newPages } = req.body as AddNewPagesPayload;
  //   const { siteSlug } = req.params;
  //   try {
  //     const site = await SiteModel.findOne({ slug: siteSlug });

  //     if (site) {
  //       await Promise.all(
  //         newPages.map(
  //           async (newPage) =>
  //             await PageModel.create({
  //               name: newPage.name,
  //               position: newPage.position,
  //               container: newPage.container,
  //               slug: newPage.slug,
  //               siteID: site._id,
  //             })
  //         )
  //       );

  //       res.status(200).send('Pages created');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).send('Error while creating pages.');
  //   }
  // },
  updatePages: async (pagesData: PagesData, siteID: Types.ObjectId) => {
    const { updatedPages, deletedPages, newPages } = pagesData;

    try {
      if (deletedPages) {
        await Promise.all(deletedPages.map(async (pageID) => await PageModel.deleteOne({ _id: pageID })));
      }

      if (updatedPages) {
        await Promise.all(
          updatedPages.map(async (page) => {
            const { name, position, slug, container, _id, updatedElements } = page;

            if (updatedElements) {
              await PageModel.findByIdAndUpdate(_id, {
                ...(updatedElements.name && { name }),
                ...(updatedElements.position && { position }),
                ...(updatedElements.slug && { slug }),
                ...(updatedElements.container && { container }),
              });
            }
          })
        );
      }

      if (newPages) {
        await Promise.all(
          newPages.map(async (page) => {
            const { name, position, slug, container } = page;
            await PageModel.create({ name, position, slug, container, siteID });
          })
        );
      }
    } catch (error) {
      throw error;
    }
  },

  // update: async (req: Request, res: Response) => {
  //   const { updatedPages } = req.body as UpdatePagesPayload;

  //   if (updatedPages) {
  //     try {
  //       Promise.all(
  //         updatedPages.map(async (page) => {
  //           const { name, position, slug, container, _id } = page;

  //           await PageModel.findByIdAndUpdate(_id, {
  //             ...(name && { name }),
  //             ...(position && { position }),
  //             ...(slug && { slug }),
  //             ...(container && { container }),
  //           });
  //         })
  //       );

  //       res.status(200).send("Pages updated");
  //     } catch (err) {
  //       console.log(err);
  //       res.status(500).send("Error while updating pages.");
  //     }
  //   } else {
  //     res
  //       .status(400)
  //       .send("Updated page content must be provided in the request.");
  //   }
  // },
};

export default PageController;
