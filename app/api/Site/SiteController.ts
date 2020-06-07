import { Request, Response } from 'express';

import SiteModel from './SiteModel';
import NavbarModel from '../Navbar';
import PageModel from '../Page';
import PageController from '../Page/PageController';

import { GetSiteRes, UpdateSiteReq, Page, SiteTitleAndSlug } from '../../models';
import { DecodedToken } from '../../middleware/decodeToken';

const SiteController = {
  createSite: async (req: Request, res: Response) => {
    const { user } = (req as unknown) as { user: DecodedToken };
    const { title } = req.body;
    const { slug } = req.params;

    if (title && slug) {
      try {
        let site = await SiteModel.findOne({ slug });

        if (site) {
          res.status(400).send('Site with this title already exist. Please, choose another title.');
        } else {
          const navbar = await NavbarModel.create({});
          site = await SiteModel.create({ title, slug, navbarID: navbar._id, userID: user._id });

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
  findUsersSites: async (userID: string) =>
    new Promise<SiteTitleAndSlug[]>((resolve, reject) => {
      const checkDatabase = async () => {
        try {
          const sites: SiteTitleAndSlug[] = await SiteModel.find({ userID }).select(
            '-siteID -__v -_id -navbarID -userID'
          );

          resolve(sites);
        } catch (error) {
          reject(error);
        }
      };

      checkDatabase();
    }),
  getSite: async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const site = await SiteModel.findOne({ slug });
      if (site) {
        const pages: Page[] = await PageModel.find({ siteID: site._id }).select('-siteID -__v');
        const navbar = await NavbarModel.findById(site.navbarID).select('-_id -__v');

        // @TODO
        // const {user} = req;
        // shouldAllowEditing: user && user._id === site.userID
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
            allSites: [site.slug], //@TODO izbaci iz ovoga tu
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
