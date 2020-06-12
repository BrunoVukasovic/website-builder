import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { NavLink } from 'react-router-dom';

import Flex from '../../Flex';
import EditText from '../../EditText';

import { Navbar } from '../../../models';

import styles from './navbar_constructor.module.scss';
import CreatedMenu from '../partials/CreatedMenu/CreatedMenu';

export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageName: string;
  siteSlug: string;
  style?: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ slugsAndNames, siteSlug, style, activePageName }) => {
  const [addPageEditorOpen, setAddPageEditorOpen] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [createdMenuOpen, setCreatedMenuOpen] = useState<boolean>(false);

  const handleAddPageBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    setAnchorElement(currentTarget);
    toggleAddPageEditorOpen();
  };

  const toggleCreatedMenuOpen = () => {
    setCreatedMenuOpen(!createdMenuOpen);
  };

  const toggleAddPageEditorOpen = () => {
    setAddPageEditorOpen(!addPageEditorOpen);
  };

  return (
    <Flex className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {slugsAndNames.map((item) => (
          <NavLink key={item.slug} to={`/edit/${siteSlug}/${item.slug}`} className={styles.link}>
            <Button color="primary" className={styles.navbarButton}>
              <Flex
                className={item.name === activePageName ? cx(styles.textWrapper, styles.active) : styles.textWrapper}
                dangerouslySetInnerHTML={{ __html: item.name }}
              />
            </Button>
          </NavLink>
        ))}
        <Flex className={styles.addPageWrapper}>
          <IconButton aria-label="add-page" onClick={handleAddPageBtnClick}>
            <AddCircleIcon color="primary" className={styles.addIcon} />
          </IconButton>
        </Flex>
      </Flex>
      <Flex alignItems="center" className={styles.menuIconWrapper} onClick={toggleCreatedMenuOpen}>
        <MenuIcon color="primary" className={styles.menuIcon} />
      </Flex>
      {addPageEditorOpen && (
        <Flex>
          <EditText
            headerText="Enter page name: "
            onCloseEditor={toggleAddPageEditorOpen}
            action="addPage"
            anchorElement={anchorElement}
          />
        </Flex>
      )}
      {createdMenuOpen && (
        <CreatedMenu
          slugsAndNames={slugsAndNames}
          activePageName={activePageName}
          siteSlug={siteSlug}
          onClose={toggleCreatedMenuOpen}
          onAddPageBtnClick={handleAddPageBtnClick}
          allowEditing
        />
      )}
    </Flex>
  );
};

export default NavbarViewer;
