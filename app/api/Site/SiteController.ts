import { Request, Response, NextFunction } from 'express';

import SiteModel, { SiteDocument } from './SiteModel';
import NavbarModel from '../Navbar';
import PageModel from '../Page';
import PageController from '../Page/PageController';

import { GetSiteRes, UpdateSiteReq, Page, SiteTitleAndSlug, CurrentSite, RenameSiteReq } from '../../models';
import { DecodedToken } from '../../middleware/authentication';

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
      res.sendStatus(400).json('Title and slug must be provided in the request.');
    }
  },
  deleteSite: async (req: Request, res: Response) => {
    const { site } = (req as unknown) as { site: SiteDocument };

    if (site) {
      const pages = PageModel.find({ siteID: site._id });
      const navbar = NavbarModel.findById(site.navbarID);

      await pages.remove();
      await navbar.remove();
      await site.remove();

      res.status(200).send('Site deleted successfully.');
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

      if (site) {
        const navbar = await NavbarModel.findById(site.navbarID).select('-_id -__v');
        // @TODO extract to PageController.findAllBySiteIDAndSort
        const pages: Page[] = await PageModel.find({ siteID: site._id }).select('-siteID -__v');
        pages.sort((a, b) => a.position - b.position);

        if (navbar && pages) {
          const payload: GetSiteRes = {
            currentSite: {
              title: site.title,
              slug: site.slug,
              oldSlug: site.slug,
              pages: pages,
              navbar,
              shouldAllowEditing: user && site.userID.equals(user._id),
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
  renameSite: async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(400).send('Site with this title already exist. Please, choose another title.');
      } else {
        await site.update({ title, slug });

        res.status(201).send('Site renamed successfully');
      }
    } catch {
      res.status(500).send("Couldn't rename the site");
    }
  },
  updateSite: async (req: Request, res: Response) => {
    const { siteData, pagesData, navbarData } = req.body as UpdateSiteReq;
    // const { slug } = req.params;
    const { user, site } = (req as unknown) as { user: DecodedToken | undefined; site: SiteDocument };

    if (siteData || pagesData || navbarData) {
      try {
        // const site = await SiteModel.findOne({ slug });

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

          // @TODO extract to PageController.findAllBySiteIDAndSort
          const pages: Page[] = await PageModel.find({ siteID: site._id }).select('-siteID -__v');
          pages.sort((a, b) => a.position - b.position);

          const navbar = await NavbarModel.findById(site.navbarID).select('-_id -__v');

          console.log(user);
          user && console.log(site.userID.equals(user._id));

          if (navbar) {
            const payload: CurrentSite = {
              title: site.title,
              slug: site.slug,
              oldSlug: site.slug,
              pages: pages,
              navbar,
              shouldAllowEditing: user && site.userID.equals(user._id),
            };

            res.status(200).send(payload);
          } else {
            res.status(500).send('Something went wrong');
          }
        } else {
          res.status(500).send("Couldn't find site in the request");
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
