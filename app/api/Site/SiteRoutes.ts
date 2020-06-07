import express from 'express';

import SiteController from './SiteController';
import decodeToken from '../../middleware/decodeToken';
import auth from '../../middleware/auth';

const SiteRouter = express.Router();

SiteRouter.get('/get/:slug', decodeToken, SiteController.getSite);

SiteRouter.patch('/update/:slug', SiteController.updateSite);

SiteRouter.post('/create/:slug', auth, SiteController.createSite);

export default SiteRouter;
