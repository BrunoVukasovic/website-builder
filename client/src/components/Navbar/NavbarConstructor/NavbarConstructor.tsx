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
import { useDispatch } from 'react-redux';
import { deletePage } from '../../../redux/actions/site';
import Modal from '../../Modal';

export type CurrentEditingItem = {
  slug: string;
  name: string;
  id?: string;
};
export interface NavbarViewerProps {
  pagesData: { slug: string; name: string; id?: string }[];
  activePageSlug: string;
  siteSlug: string;
  style?: Navbar;
}

const NavbarViewer: React.FC<NavbarViewerProps> = ({ pagesData, siteSlug, style, activePageSlug }) => {
  const [textEditorOpen, setTextEditorOpen] = useState<boolean>(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [createdMenuOpen, setCreatedMenuOpen] = useState<boolean>(false);
  const [currentEditingItem, setCurrentEditingItem] = useState<CurrentEditingItem | undefined>(undefined);
  const [deletePageModalOpen, setDeletePageModalOpen] = useState<boolean>(false);
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
    <Flex className={styles.navbar}>
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
