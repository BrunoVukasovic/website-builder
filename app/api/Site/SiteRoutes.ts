import express from 'express';

import SiteController from './SiteController';
import checkToken from '../../middleware/checkToken';
import auth from '../../middleware/auth';

const SiteRouter = express.Router();

SiteRouter.get('/get/:slug', checkToken, SiteController.getSite);

SiteRouter.patch('/update/:slug', auth, SiteController.updateSite);

SiteRouter.post('/create/:slug', auth, SiteController.createSite);

export default SiteRouter;
