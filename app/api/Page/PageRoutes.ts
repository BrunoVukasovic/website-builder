import express from "express";

import PageController from "./PageController";

const PageRouter = express.Router();

PageRouter.post("/:siteSlug/addPages", PageController.addNew);

PageRouter.patch("/:siteSlug/updatePages", PageController.update);

export default PageRouter;
