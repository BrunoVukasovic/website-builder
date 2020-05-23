import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { useSelector } from "react-redux";

import SiteService from "../../services/SiteService";

import { selectPageFormValues } from "../../redux/selectors/pages";

import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  const pageFormValues = useSelector(selectPageFormValues);

  const saveChanges = async () => {
    console.log("clicked save changes");
    const payload = {
      // richTextHTML: pageFormValues.richTextHTML,
      title: "Site Title",
    };
    try {
      console.log("try");
      const response = await SiteService.create(payload);
      console.log(response);
      console.log("no res");
    } catch (err) {
      console.log("err");
      console.log(err.response);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit">Login</Button>
        <Button color="inherit" onClick={saveChanges}>
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
