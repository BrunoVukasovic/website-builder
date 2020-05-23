import express from "express";

import PageController from "./PageController";

const PageRouter = express.Router();

// PageRouter.get("/", (req, res) => res.send("Get"));

// ne triba PageRouter.post("/:siteSlug/:pageSlug/add", PageController.addNewPage);

// PageRouter.patch("/:siteSlug/updatePages", PageController.update);

export default PageRouter;
