import { Request, Response } from "express";

import SiteModel from "../Site";
import NavbarModel from "../Navbar";
import { NavbarItem } from "./NavbarModel";
import { UpdateNavbarPayload } from "../../models";
import PageController from "../Page/PageController";

const NavbarController = {
  // createAndPopulate: async (navbarComponents) => {
  //   // const { navbarItems }: { navbarItems: FirstNavbarPayload[] } = req.body;
  //   // const { siteSlug } = req.params;

  //   try {
  //     // const site = await SiteModel.findOne({ slug: siteSlug });
  //     const navbar = await NavbarModel.create({});

  //     if (site) {
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createEmpty: async () => {
    try {
      const navbar = await NavbarModel.create({});

      if (navbar) {
        return navbar._id;
      }

      return undefined;
    } catch (err) {
      console.error("Error in Navbar.createEmpty", err);
      throw err;
    }
  },
  updateNavbar: async (req: Request, res: Response) => {
    const { changedItems }: { changedItems: UpdateNavbarPayload[] } = req.body;
    const { siteSlug } = req.params;

    if (changedItems) {
      try {
        const site = await SiteModel.findOne({ slug: siteSlug });

        if (site) {
          const navbar = await NavbarModel.findById(site.navbarID);
          if (navbar) {
            let newNavbar: NavbarItem[] = navbar.navbarItems.map(
              (currentItem) => {
                const changedItem = changedItems.find(
                  (item: any) =>
                    item.oldName === currentItem.name ||
                    item.oldPosition === currentItem.position
                );

                // console.log(currentItem);
                // console.log(changedItem);

                if (changedItem) {
                  return {
                    name: changedItem.name,
                    position: changedItem.position,
                    pageID: currentItem.pageID,
                  };
                }
                return currentItem;
              }
            );

            // console.log(newNavbar);

            let newItems = changedItems
              .filter((item: any) => item.new)
              .map(async (item: any) => {
                const newPageID = await PageController.createEmpty(navbar._id);

                return {
                  name: item.name,
                  position: item.position,
                  pageID: newPageID,
                };
              });
            // console.log(newItems);
            // newNavbar = [...newNavbar, ...newItems];
            console.log(newNavbar);
            await navbar.updateOne({ navbarItems: newNavbar });
            console.log(navbar);
            // navbar.update({ $set: { navbarItems: newNavbar } });
            // ili
            // $set moze i ne mora valda
            // NavbarModel.findByIdAndUpdate(site.navbarID, {
            //   $set: { navbarItems: newNavbar },
            // });
          }

          // const navbar = await NavbarModel.findByIdAndUpdate(site.navbarID, {
          //   navbarItems: newNavbarItems,
          // });
          res.status(200).send(navbar);
        } else {
          res.status(500).send("Couldn't find site with that slug");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Server error while updating navbar");
      }
    } else {
      res.status(400).json({ msg: "Navbar items must be provided in request" });
    }
  },
};

export default NavbarController;
