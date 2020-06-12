import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';

import { NavLink } from 'react-router-dom';

import Flex from '../../Flex';
import EditText from '../../EditText';

import { Navbar } from '../../../models';

import styles from './navbar_constructor.module.scss';
import CreatedMenu from '../partials/CreatedMenu/CreatedMenu';
import EditItemDropdownMenu from '../partials/EditItemDropdownMenu';

export type CurrentEditingItem = {
  slug: string;
  name: string;
};
export interface NavbarViewerProps {
  slugsAndNames: { slug: string; name: string }[];
  activePageSlug: string;
  siteSlug: string;
  style?: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ slugsAndNames, siteSlug, style, activePageSlug }) => {
  const [textEditorOpen, setTextEditorOpen] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [createdMenuOpen, setCreatedMenuOpen] = useState<boolean>(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<CurrentEditingItem | undefined>(undefined);

  const closeAll = () => {
    removeCurrentEditingItem();
    setTextEditorOpen(false);
  };

  const handleAddPageBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    setAnchorElement(currentTarget);
    toggleTextEditorOpen();
  };

  const handleEditItemMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    const clickedItem = slugsAndNames.find((item) => item.slug === currentTarget.id);
    setAnchorElement(currentTarget);
    setCurrentEditingItem(clickedItem);
  };

  const removeCurrentEditingItem = () => {
    setCurrentEditingItem(undefined);
  };

  const toggleCreatedMenuOpen = () => {
    setCreatedMenuOpen(!createdMenuOpen);
  };

  const toggleTextEditorOpen = () => {
    setTextEditorOpen(!textEditorOpen);
  };

  return (
    <Flex className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {slugsAndNames.map((item) => (
          <>
            <IconButton id={`${item.slug}`} onClick={handleEditItemMenuClick} color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <NavLink key={item.slug} to={`/edit/${siteSlug}/${item.slug}`} className={styles.link}>
              <Button color="primary" className={styles.navbarButton}>
                <Flex
                  className={item.slug === activePageSlug ? cx(styles.textWrapper, styles.active) : styles.textWrapper}
                  dangerouslySetInnerHTML={{ __html: item.name }}
                />
              </Button>
            </NavLink>
          </>
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
      {textEditorOpen && (
        <Flex>
          <EditText
            headerText="Enter page name: "
            onCloseEditor={closeAll}
            action={currentEditingItem ? 'updatePageName' : 'addPage'}
            anchorElement={anchorElement}
            initialValue={currentEditingItem && currentEditingItem.name}
            oldSlug={currentEditingItem && currentEditingItem.slug}
            activePageSlug={activePageSlug}
          />
        </Flex>
      )}
      {createdMenuOpen && (
        <CreatedMenu
          slugsAndNames={slugsAndNames}
          activePageSlug={activePageSlug}
          siteSlug={siteSlug}
          onClose={toggleCreatedMenuOpen}
          onAddPageBtnClick={handleAddPageBtnClick}
          allowEditing
        />
      )}
      {currentEditingItem && (
        <EditItemDropdownMenu
          isRow
          anchorEl={anchorElement}
          onClose={removeCurrentEditingItem}
          onEditClick={toggleTextEditorOpen}
        />
      )}
    </Flex>
  );
};

export default NavbarViewer;
