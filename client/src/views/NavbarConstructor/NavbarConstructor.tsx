import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import PaletteIcon from '@material-ui/icons/Palette';

import { NavLink } from 'react-router-dom';
import { useToggle } from 'react-use';

import Modal from '../../components/Modal';
import Flex from '../../components/Flex';
import TextEditor from '../../components/TextEditor';
import CreatedMenu from './partials/CreatedMenu/CreatedMenu';
import EditItemDropdownMenu from './partials/EditItemDropdownMenu';
import ColorPicker from '../../components/ColorPicker/ColorPicker';

import { Navbar } from '../../models';
import { useDispatch } from 'react-redux';
import { deletePage } from '../../redux/actions/site';

import styles from './navbar_constructor.module.scss';

export type CurrentEditingItem = {
  slug: string;
  name: string;
  id?: string;
};
export interface NavbarViewerProps {
  pagesData: { slug: string; name: string; id?: string }[];
  activePageSlug: string;
  siteSlug: string;
  navbarData: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ pagesData, siteSlug, navbarData, activePageSlug }) => {
  const [textEditorOpen, setTextEditorOpen] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [createdMenuOpen, setCreatedMenuOpen] = useState<boolean>(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<CurrentEditingItem | undefined>(undefined);
  const [deletePageModalOpen, setDeletePageModalOpen] = useState<boolean>(false);
  // const [colorPickerModalOpen, setColorPickerModalOpen] = useState<boolean>(false);
  const [colorPickerPopoverOpen, toggleColorPickerPopover] = useToggle(false);
  const dispatch = useDispatch();

  const closeAll = () => {
    removeCurrentEditingItem();
    setTextEditorOpen(false);
  };

  const handleAddPageBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    setAnchorElement(currentTarget);
    toggleTextEditorOpen();
  };

  const handleColorPickerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(e.currentTarget);
    toggleColorPickerPopover();
  };

  const handleDeletePage = () => {
    if (currentEditingItem) {
      dispatch(deletePage({ slug: currentEditingItem.slug, id: currentEditingItem.id }));
      setCurrentEditingItem(undefined);
    }
  };

  const handleEditItemMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    const clickedItem = pagesData.find((item) => item.slug === currentTarget.id);
    setAnchorElement(currentTarget);
    setCurrentEditingItem(clickedItem);
  };

  const removeCurrentEditingItem = () => {
    setCurrentEditingItem(undefined);
  };

  const toggleCreatedMenuOpen = () => {
    setCreatedMenuOpen(!createdMenuOpen);
  };

  const toggleDeletePageModalOpen = () => {
    setDeletePageModalOpen(!deletePageModalOpen);
  };

  const toggleTextEditorOpen = () => {
    setTextEditorOpen(!textEditorOpen);
  };

  return (
    <Flex style={{ backgroundColor: navbarData.backgroundColor }} className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {pagesData.map((item) => (
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
        <Flex className={styles.addPageWrapper}>
          <IconButton aria-label="color-picker" onClick={handleColorPickerClick}>
            <PaletteIcon color="primary" className={styles.addIcon} />
          </IconButton>
        </Flex>
      </Flex>
      <Flex alignItems="center" className={styles.menuIconWrapper} onClick={toggleCreatedMenuOpen}>
        <MenuIcon color="primary" className={styles.menuIcon} />
      </Flex>
      {textEditorOpen && (
        <Flex>
          <TextEditor
            headerText="Enter page name: "
            onClose={closeAll}
            action={currentEditingItem ? 'updatePageName' : 'addPage'}
            anchorElement={anchorElement}
            initialValue={currentEditingItem && currentEditingItem.name}
            oldSlug={currentEditingItem && currentEditingItem.slug}
          />
        </Flex>
      )}
      {createdMenuOpen && (
        <CreatedMenu
          navbarData={navbarData}
          pagesData={pagesData}
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
          onDeletePageClick={toggleDeletePageModalOpen}
        />
      )}
      {colorPickerPopoverOpen && (
        <ColorPicker
          onClose={toggleColorPickerPopover}
          coloredArea="navbar"
          initialValue={navbarData.backgroundColor}
          anchorElement={anchorElement}
        />
      )}
      {deletePageModalOpen && currentEditingItem && (
        <Modal
          onClose={toggleDeletePageModalOpen}
          headerText="Delete whole page?"
          showFooter
          primaryButtonText="Delete"
          secondaryButtonText="Close"
          onSecondaryButtonClick={toggleDeletePageModalOpen}
          onPrimaryButtonClick={handleDeletePage}
        >
          <p>This action cannot be undone.</p>
        </Modal>
      )}
    </Flex>
  );
};

export default NavbarViewer;
