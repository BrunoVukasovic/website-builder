import { Request, Response } from 'express';

import SiteModel from './SiteModel';
import NavbarModel from '../Navbar';
import PageModel from '../Page';
import PageController from '../Page/PageController';

import { GetSiteRes, UpdateSiteReq, Page } from '../../models';

const SiteController = {
  createSite: async (req: Request, res: Response) => {
    const { title } = req.body;
    const { slug } = req.params;

    if (title && slug) {
      try {
        let site = await SiteModel.findOne({ slug });

        if (site) {
          res.status(400).send('Site with this title already exist. Please, choose another title.');
        } else {
          const navbar = await NavbarModel.create({});
          site = await SiteModel.create({ title, slug, navbarID: navbar._id });

          res.status(201).send();
        }
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong, please try again.');
      }
    } else {
      res.status(400).json('Title and slug must be provided in the request.');
    }
  },
  //@TODO ne ovako, nego po uputama iz saveChanges, prvo saljes title i slug i kreiras prazan site, pa pozivas update
  // createNewSite: async (req: Request, res: Response) => {
  //   const { title, pages } = req.body as CreateSiteReq;
  //   const { slug } = req.params;

  //   if (title && pages) {
  //     try {
  //       let site = await SiteModel.findOne({ slug });

  //       if (site) {
  //         res.status(400).send("Site with this slug already exist");
  //       } else {
  //         const navbar = await NavbarModel.create({});
  //         site = await SiteModel.create({ title, slug, navbarID: navbar._id });

  //         if (navbar && site) {
  //           await Promise.all(
  //             pages.map(async ({ name, position, slug, container }) => {
  //               await PageModel.create({
  //                 name,
  //                 position,
  //                 slug,
  //                 container,
  //                 //@ts-ignore
  //                 siteID: site._id,
  //               });
  //             })
  //           );

  //           res.status(200).send(site);
  //         } else {
  //           res.status(500).send("Error while creating navbar and site");
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       res.status(500).send("Server error while creating site");
  //     }
  //   } else {
  //     res.status(400).json({
  //       msg: "Title, navbar and page data must be provided in the request.",
  //     });
  //   }
  // },
  getSite: async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const site = await SiteModel.findOne({ slug });
      if (site) {
        const pages: Page[] = await PageModel.find({ siteID: site._id }).select('-siteID -__v');
        const navbar = await NavbarModel.findById(site.navbarID).select('-_id -__v');

        if (navbar && pages) {
          const payload: GetSiteRes = {
            currentSite: {
              title: site.title,
              slug: site.slug,
              oldSlug: site.slug,
              pages: pages,
              navbar,
              shouldAllowEditing: true,
            },
            allSites: [site.slug], //@TODO ako ima pravo edita zakaci sve slugove i imena
          };

          res.status(200).send(payload);
        } else {
          res.status(500).send("Couldn't find site elements");
        }
      } else {
        res.status(500).send("Couldn't find site");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Couldn't fetch site");
    }
  },
  // updateSite
  // dohvati Site
  // PageController: za svaki updatePage provjeri ima li _id, ako nema kreiraj je, ako ima updateaj
  updateSite: async (req: Request, res: Response) => {
    const { siteData, pagesData, navbarData } = req.body as UpdateSiteReq;
    const { slug } = req.params;

    if (siteData || pagesData || navbarData) {
      try {
        const site = await SiteModel.findOne({ slug });

        if (site) {
          if (siteData) {
            const { title, slug } = siteData;
            await site.update({ title, slug });
          }

          if (pagesData) {
            await PageController.updatePages(pagesData, site._id);
          }

          if (navbarData) {
            // @TODO update Navbar
          }

          res.status(200).send('Website updated successfully');
        } else {
          res.status(500).send("Couldn't find site");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't update site");
      }
    } else {
      res.status(400).send('Updated site elements must be provided in the request.');
    }
  },
};

export default SiteController;
