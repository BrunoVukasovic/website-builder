import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import styles from "./footer.module.scss";

const Footer: React.FC = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Save</Button>
    </Toolbar>
  </AppBar>
);

export default Footer;
