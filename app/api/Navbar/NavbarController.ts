import { Request, Response } from 'express';

import SiteModel from '../Site';
import NavbarModel from '../Navbar';
import PageController from '../Page/PageController';
import { Navbar } from '../../models';
import { Types } from 'mongoose';

const NavbarController = {
  updateNavbar: async (data: Navbar, navbarID: Types.ObjectId) => {
    try {
      const { logo, backgroundColor, menuIconColor } = data;

      await NavbarModel.findByIdAndUpdate(navbarID, {
        logo,
        ...(backgroundColor && { backgroundColor }),
        ...(menuIconColor && { menuIconColor }),
      });
    } catch (error) {
      throw error;
    }
  },
};

export default NavbarController;
