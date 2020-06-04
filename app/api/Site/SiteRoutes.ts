import express from 'express';

import SiteController from './SiteController';

const SiteRouter = express.Router();

SiteRouter.get('/get/:slug', SiteController.getSite);

SiteRouter.patch('/update/:slug', SiteController.updateSite);

SiteRouter.post('/create/:slug', SiteController.createSite);

export default SiteRouter;
