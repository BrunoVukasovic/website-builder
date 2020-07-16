import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from 'react-router-dom';

import Flex from '../../components/Flex';
import CreatedMenu from '../NavbarConstructor/partials/CreatedMenu';

import { Navbar } from '../../models';

import styles from './navbar_viewer.module.scss';

export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageSlug: string;
  siteSlug: string;
  navbarData: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ slugsAndNames, siteSlug, navbarData, activePageSlug }) => {
  const [createdMenuOpen, setCreatedMenuOpen] = useState<boolean>(false);

  const toggleCreatedMenuOpen = () => {
    setCreatedMenuOpen(!createdMenuOpen);
  };

  return (
    <Flex style={{ backgroundColor: navbarData.backgroundColor }} className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {slugsAndNames.map((item) => (
          <NavLink key={item.slug} to={`/${siteSlug}/${item.slug}`} className={styles.link}>
            <Button color="primary" className={styles.navbarButton}>
              <Flex
                className={item.slug === activePageSlug ? cx(styles.textWrapper, styles.active) : styles.textWrapper}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            </Button>
          </NavLink>
        ))}
      </Flex>
      <Flex alignItems="center" className={styles.menuIconWrapper} onClick={toggleCreatedMenuOpen}>
        <MenuIcon color="primary" className={styles.menuIcon} />
      </Flex>
      {createdMenuOpen && (
        <CreatedMenu
          pagesData={slugsAndNames}
          navbarData={navbarData}
          activePageSlug={activePageSlug}
          siteSlug={siteSlug}
          onClose={toggleCreatedMenuOpen}
        />
      )}
    </Flex>
  );
};

export default NavbarViewer;