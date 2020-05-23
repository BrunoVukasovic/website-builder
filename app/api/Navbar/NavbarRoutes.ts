import express from "express";

import NavbarController from "./NavbarController";

const NavbarRouter = express.Router();

// PageRouter.get("/", (req, res) => res.send("Get"));

// ovo triba update-at boju, logo i to
NavbarRouter.put("/:siteSlug/", NavbarController.updateNavbar);

export default NavbarRouter;
