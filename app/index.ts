import express, { Application } from "express";
import connectDatabase from "./config/database";
// const SiteRouter = require("./api/Site/SiteRoutes";
import SiteRouter from "./api/Site/SiteRoutes";
import PageRouter from "./api/Page/PageRoutes";
import NavbarRouter from "./api/Navbar/NavbarRoutes";

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Bodyparser

connectDatabase();

app.get("/", (req, res) => {
  res.send("Index");
});
app.use(
  "/site",
  (req, res, next) => {
    console.log("app/index");
    next();
  },
  SiteRouter
);
app.use("/navbar", NavbarRouter);
app.use("/page", PageRouter);

app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}...`);
});
