import express from "express";
import SiteController from "./SiteController";

const SiteRouter = express.Router();

console.log("site-routes");

// @ts-ignore
SiteRouter.get("/", (req, res) => res.send("Get"));

SiteRouter.post("/create/:slug", SiteController.createNewSite);

// update site title

export default SiteRouter;
// module.exports = SiteRouter;
