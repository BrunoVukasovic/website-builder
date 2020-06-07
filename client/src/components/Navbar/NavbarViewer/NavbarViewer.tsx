import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';

import { NavLink } from 'react-router-dom';

import Flex from '../../Flex';

import { Navbar } from '../../../models';

import styles from './navbar_viewer.module.scss';

export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageName: string;
  siteSlug: string;
  style?: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ slugsAndNames, siteSlug, style, activePageName }) => {
  return (
    <Flex className={styles.navbar}>
      {slugsAndNames.map((item) => (
        <NavLink key={item.slug} to={`/edit/${siteSlug}/${item.slug}`} className={styles.link}>
          <Button
            color="primary"
            className={item.name === activePageName ? cx(styles.navbarButton, styles.active) : styles.navbarButton}
          >
            <Flex className={styles.textWrapper} dangerouslySetInnerHTML={{ __html: item.name }} />
          </Button>
        </NavLink>
      ))}
    </Flex>
  );
};

export default NavbarViewer;
