import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import cx from 'classnames';

import { NavLink } from 'react-router-dom';

import Flex from '../../Flex';

import { Navbar } from '../../../models';

import styles from './navbar_constructor.module.scss';
import IconButton from '@material-ui/core/IconButton';
import EditText from '../../EditText';
import Button from '@material-ui/core/Button';

export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageName: string;
  siteSlug: string;
  style?: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ slugsAndNames, siteSlug, style, activePageName }) => {
  const [addPageEditorOpen, setAddPageEditorOpen] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);

  const toggleAddPageEditorOpen = () => {
    setAddPageEditorOpen(!addPageEditorOpen);
  };

  const onAddPageBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    setAnchorElement(currentTarget);
    toggleAddPageEditorOpen();
  };

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
      <Flex className={styles.addPageWrapper}>
        <IconButton aria-label="add-page" onClick={onAddPageBtnClick}>
          <AddCircleIcon color="primary" className={styles.addIcon} />
        </IconButton>
      </Flex>
      {addPageEditorOpen && (
        <Flex>
          <EditText onCloseEditor={toggleAddPageEditorOpen} action="addPage" anchorElement={anchorElement} />
        </Flex>
      )}
    </Flex>
  );
};

export default NavbarViewer;
