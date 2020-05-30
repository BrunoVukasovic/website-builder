import React from "react";

import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";

import { useSelector } from "react-redux";

import Flex from "../Flex";
import SiteService from "../../services/SiteService";

import styles from "./footer.module.scss";

export interface FooterProps {
  buttonText?: string;
}

const Footer: React.FC<FooterProps> = ({ buttonText }) => {
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
    <Flex justifyContent="space-between" className={styles.footerContainer}>
      <Button color="inherit" size="large">
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={saveChanges}
        className={styles.saveBtn}
        startIcon={buttonText ? <EditIcon /> : <SaveIcon />}
      >
        {buttonText ? `${buttonText}` : "Save changes"}
      </Button>
    </Flex>
  );

  // return (
  //   <AppBar position="sticky">
  //     <Toolbar>
  //       <Button color="inherit">Login</Button>
  //       <Button color="inherit" onClick={saveChanges}>
  //         Save
  //       </Button>
  //     </Toolbar>
  //   </AppBar>
  // );
};

export default Footer;
