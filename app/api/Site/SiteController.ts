import { Request, Response } from 'express';

import SiteModel, { SiteDocument } from './SiteModel';
import NavbarModel from '../Navbar';
import PageModel from '../Page';
import PageController from '../Page/PageController';
import NavbarController from '../Navbar/NavbarController';

import { GetSiteRes, UpdateSiteReq, Page, SiteTitleAndSlug, CurrentSite, RenameSiteReq } from '../../models';
import { DecodedToken } from '../../middleware/authentication';

const SiteController = {
  createSite: async (req: Request, res: Response) => {
    const { user } = (req as unknown) as { user: DecodedToken };
    const { title } = req.body;
    const { slug } = req.params;

    if (!title || !slug) {
      res.sendStatus(400).send('Title and slug must be provided in the request.');
      return;
    }

    try {
      let site = await SiteModel.findOne({ slug });

      if (site) {
        res.status(409).send('Site with this title already exist. Please, choose another title.');
      } else {
        const navbar = await NavbarModel.create({});
        site = await SiteModel.create({ title, slug, navbarID: navbar._id, userID: user._id });

        res.status(201).send();
      }
    } catch (err) {
      res.status(500).send('Something went wrong, please try again.');
    }
  },
  deleteSite: async (req: Request, res: Response) => {
    const { site } = (req as unknown) as { site: SiteDocument };

    if (site) {
      try {
        const pages = PageModel.find({ siteID: site._id });
        const navbar = NavbarModel.findById(site.navbarID);

        await pages.remove();
        await navbar.remove();
        await site.remove();

        res.status(200).send('Site deleted successfully.');
      } catch (err) {
        res.status(500).send('Something went wrong, please try again.');
      }
    } else {
      res.status(500).send("Couldn't find site attached in the request");
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
    const { user } = req as { user: DecodedToken | undefined };
    const { slug } = req.params;

    try {
      const site = await SiteModel.findOne({ slug });

      if (!site) {
        res.status(400).send("Couldn't find site");
        return;
      }

      const navbar = await NavbarModel.findById(site.navbarID).select('-_id -__v');
      const sortedPages = await PageController.findAllAndSort(site._id);

      if (!navbar || !sortedPages) {
        res.status(500).send("Couldn't find site elements");
        return;
      }

      const payload: GetSiteRes = {
        currentSite: {
          title: site.title,
          slug: site.slug,
          oldSlug: site.slug,
          pages: sortedPages,
          navbar,
          shouldAllowEditing: user && site.userID.equals(user._id),
        },
      };

      res.status(200).send(payload);
    } catch (err) {
      res.status(500).send("Couldn't fetch site");
    }
  },
  renameSite: async (req: Request, res: Response) => {
    const { title, slug } = req.body as RenameSiteReq;
    const { site } = (req as unknown) as { site: SiteDocument };

    if (!title || !slug) {
      res.status(400).send('Title and slug must be provided in the request.');
      return;
    }

    if (!site) {
      res.status(500).send("Couldn't find site in the request object");
      return;
    }

    try {
      let duplicateSlug = await SiteModel.findOne({ slug });

      if (duplicateSlug) {
        res.status(409).send('Site with this title already exist. Please, choose another title.');
      } else {
        await site.update({ title, slug });

        res.status(201).send('Site renamed successfully');
      }
    } catch {
      res.status(500).send("Couldn't rename the site");
    }
  },
  updateSite: async (req: Request, res: Response) => {
    //@TODO siteData is not needed anymore
    const { siteData, pagesData, navbarData } = req.body as UpdateSiteReq;
    const { user, site } = (req as unknown) as { user: DecodedToken | undefined; site: SiteDocument };

    if (!siteData && !pagesData && !navbarData) {
      res.status(400).send('Updated site elements must be provided in the request.');
    }

    if (!site) {
      res.status(500).send("Couldn't find site in the request");
    }

    try {
      if (pagesData) {
        await PageController.updatePages(pagesData, site._id);
      }

      if (navbarData) {
        NavbarController.updateNavbar(navbarData, site.navbarID);
      }

      const navbar = await NavbarModel.findById(site.navbarID).select('-_id -__v');
      const sortedPages = await PageController.findAllAndSort(site._id);

      if (navbar && sortedPages) {
        const payload: CurrentSite = {
          title: site.title,
          slug: site.slug,
          oldSlug: site.slug,
          pages: sortedPages,
          navbar,
          shouldAllowEditing: user && site.userID.equals(user._id),
        };

        res.status(200).send(payload);
      } else {
        res.status(500).send('Something went wrong');
      }
    } catch (error) {
      res.status(500).send("Couldn't update site");
    }
  },
};

export default SiteController;
