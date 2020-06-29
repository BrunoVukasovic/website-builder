import express from 'express';

import SiteController from './SiteController';
import checkToken from '../../middleware/checkToken';
import authentication from '../../middleware/authentication';
import authorization from '../../middleware/authorization';

const SiteRouter = express.Router();

SiteRouter.delete('/delete/:slug', authentication, authorization, SiteController.deleteSite);

SiteRouter.get('/get/:slug', checkToken, SiteController.getSite);

SiteRouter.patch('/update/:slug', authentication, authorization, SiteController.updateSite);

SiteRouter.post('/create/:slug', authentication, SiteController.createSite);

SiteRouter.put('/rename/:slug', authentication, authorization, SiteController.renameSite);

export default SiteRouter;
