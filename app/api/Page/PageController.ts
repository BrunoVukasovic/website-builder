import { Request, Response } from 'express';

import PageModel from './PageModel';
import SiteModel from '../Site';

import { PagesData, Page } from '../../models';
import { Types } from 'mongoose';

const PageController = {
  findAllAndSort: async (siteID: Types.ObjectId) =>
    new Promise<Page[]>((resolve, reject) => {
      const checkDatabase = async () => {
        try {
          const pages: Page[] = await PageModel.find({ siteID }).select('-siteID -__v');
          pages.sort((a, b) => a.position - b.position);

          resolve(pages);
        } catch (error) {
          reject(error);
        }
      };

      checkDatabase();
    }),
  updatePages: async (pagesData: PagesData, siteID: Types.ObjectId) => {
    const { updatedPages, deletedPages, newPages } = pagesData;

    try {
      if (deletedPages) {
        await Promise.all(deletedPages.map((pageID) => PageModel.deleteOne({ _id: pageID })));
      }

      if (updatedPages) {
        await Promise.all(
          updatedPages.map(async (page) => {
            const { name, position, slug, container, _id, backgroundColor, updatedElements } = page;

            if (updatedElements) {
              await PageModel.findByIdAndUpdate(_id, {
                ...(updatedElements.name && { name }),
                ...(updatedElements.name && { slug }),
                ...(updatedElements.position && { position }),
                ...(updatedElements.container && { container }),
                ...(updatedElements.color && { backgroundColor }),
              });
            }
          })
        );
      }

      if (newPages) {
        await Promise.all(
          newPages.map((page) => {
            const { name, position, slug, container, backgroundColor } = page;
            PageModel.create({ name, position, slug, container, backgroundColor, siteID });
          })
        );
      }
    } catch (error) {
      throw error;
    }
  },
};

export default PageController;
