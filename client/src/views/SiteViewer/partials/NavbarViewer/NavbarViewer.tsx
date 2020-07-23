import React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';

import { NavLink } from 'react-router-dom';
import { useToggle } from 'react-use';

import Flex from '../../../../components/Flex';
import FlyoutNavbar from '../../../SiteConstructor/partials/NavbarConstructor/FlyoutNavbar';

import { Navbar } from '../../../../models';
import { MenuIcon } from '../../../../components/Icons';

import styles from './navbar_viewer.module.scss';

export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageSlug: string;
  siteSlug: string;
  navbarData: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ slugsAndNames, siteSlug, navbarData, activePageSlug }) => {
  const [flyoutNavbarOpen, toggleFlyoutNavbar] = useToggle(false);
  // const sortedNavbarItems = React.useMemo(() => slugsAndNames.sort((a, b) => a.position - b.position), [pagesData]);

  return (
    <Flex style={{ backgroundColor: navbarData.backgroundColor }} className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {navbarData.logo && <img src={navbarData.logo} alt="logo" className={styles.logo} />}
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
      <Flex alignItems="center" className={styles.menuIconWrapper} onClick={toggleFlyoutNavbar}>
        <MenuIcon
          style={{ fill: navbarData.menuIconColor ? navbarData.menuIconColor : '#000000' }}
          className={styles.menuIcon}
        />
      </Flex>
      {flyoutNavbarOpen && (
        <FlyoutNavbar
          pagesData={slugsAndNames}
          navbarData={navbarData}
          activePageSlug={activePageSlug}
          siteSlug={siteSlug}
          onClose={toggleFlyoutNavbar}
        />
      )}
    </Flex>
  );
};

export default NavbarViewer;
