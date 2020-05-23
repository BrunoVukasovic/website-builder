import express from "express";
import SiteController from "./SiteController";

const SiteRouter = express.Router();

SiteRouter.get("/:slug", SiteController.getSite);

SiteRouter.post("/create/:slug", SiteController.createNewSite);

// update site title

export default SiteRouter;
// module.exports = SiteRouter;
