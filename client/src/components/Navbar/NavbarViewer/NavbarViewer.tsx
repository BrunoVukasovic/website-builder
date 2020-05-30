import React from "react";

import { Link } from "react-router-dom";

import Flex from "../../Flex";

import { Navbar } from "../../../models";

import styles from "./navbar_constructor.module.scss";

export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageName: string;
  siteSlug: string;
  style?: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({
  slugsAndNames,
  siteSlug,
  style,
  activePageName,
}) => {
  return (
    <Flex>
      {slugsAndNames.map((item) => (
        <Link to={`/${siteSlug}/${item.slug}`}>
          <p>{item.name}</p>
        </Link>
      ))}
    </Flex>
  );
};

export default NavbarViewer;
