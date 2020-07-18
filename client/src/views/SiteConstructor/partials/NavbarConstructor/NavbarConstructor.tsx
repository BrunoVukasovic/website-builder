import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import PaletteIcon from '@material-ui/icons/Palette';

import { useSnackbar } from 'notistack';
import { NavLink } from 'react-router-dom';
import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import AddItemMenu from './AddItemMenu';
import ChangeColorMenu from './ChangeColorMenu';
import EditItemMenu from './EditItemMenu';
import FlyoutNavbar from './FlyoutNavbar';

import { Modal, Flex, TextEditor, ColorPicker } from '../../../../components';
import { Menu } from '../../../../components/Icons';
import { Navbar } from '../../../../models';
import { deletePage, changeLogo } from '../../../../redux/actions/site';
import { fileToBase64String } from '../../../../utils/shared';

import styles from './navbar_constructor.module.scss';

export type CurrentEditingItem = {
  slug: string;
  name: string;
  id?: string;
};
export interface NavbarConstructorProps {
  pagesData: { slug: string; name: string; id?: string }[];
  activePageSlug: string;
  siteSlug: string;
  navbarData: Navbar;
}

const NavbarConstructor: React.FC<NavbarConstructorProps> = ({ pagesData, siteSlug, navbarData, activePageSlug }) => {
  const [currentEditingItem, setCurrentEditingItem] = useState<CurrentEditingItem | undefined>(undefined);
  const [shouldColorMenuIcon, toggleShouldColorMenuIcon] = useToggle(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  // const [textEditorOpen, setTextEditorOpen] = useState<boolean>(false);
  const [textEditorOpen, toggleTextEditor] = useToggle(false);
  const [flyoutNavbarOpen, toggleFlyoutNavbar] = useToggle(false);
  const [deletePageModalOpen, setDeletePageModalOpen] = useState<boolean>(false);
  // const [colorPickerModalOpen, setColorPickerModalOpen] = useState<boolean>(false);
  const [colorPickerPopoverOpen, toggleColorPickerPopover] = useToggle(false);
  const [changeColorMenuOpen, toggleChangeColorMenu] = useToggle(false);
  const [addItemMenuOpen, toggleAddItemMenu] = useToggle(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  // const closeAll = () => {
  //   removeCurrentEditingItem();
  //   setTextEditorOpen(false);
  // };

  // const handleAddPageBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   const { currentTarget } = e;
  //   setAnchorElement(currentTarget);
  //   toggleTextEditorOpen();
  // };

  const handleAddBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    setAnchorElement(currentTarget);
    toggleAddItemMenu();
  };

  const handleAddPageClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    toggleTextEditor();
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0].size < 500000) {
      try {
        const image = await fileToBase64String(files[0]);
        dispatch(changeLogo(image));
        toggleAddItemMenu();
      } catch {
        enqueueSnackbar('Something went wrong while processing image. Please, try again.', { variant: 'error' });
        toggleAddItemMenu();
      }
    } else {
      enqueueSnackbar(
        `Maximum size per image is 500 KB. This image has ${files && Math.round(files[0].size / 100)} KB`,
        {
          variant: 'error',
        }
      );
    }
  };

  const handleBackgroundColorClick = () => {
    if (shouldColorMenuIcon) {
      toggleShouldColorMenuIcon();
    }
    toggleColorPickerPopover();
  };

  const handleMenuIconColorClick = () => {
    if (!shouldColorMenuIcon) {
      toggleShouldColorMenuIcon();
    }
    toggleColorPickerPopover();
  };

  const handleColorPickerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(e.currentTarget);
    toggleChangeColorMenu();
    // toggleColorPickerPopover();
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

  // const toggleCreatedMenuOpen = () => {
  //   setCreatedMenuOpen(!createdMenuOpen);
  // };

  const toggleDeletePageModalOpen = () => {
    setDeletePageModalOpen(!deletePageModalOpen);
  };

  // const toggleTextEditorOpen = () => {
  //   setTextEditorOpen(!textEditorOpen);
  // };

  return (
    <Flex style={{ backgroundColor: navbarData.backgroundColor }} className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {navbarData.logo && <img src={navbarData.logo} alt="logo" className={styles.logo} />}
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
        <Flex>
          <IconButton aria-label="add-page" onClick={handleAddBtnClick}>
            <AddCircleIcon color="primary" className={styles.addIcon} />
          </IconButton>
        </Flex>
        <Flex>
          <IconButton aria-label="color-picker" onClick={handleColorPickerClick}>
            <PaletteIcon color="primary" className={styles.addIcon} />
          </IconButton>
        </Flex>
      </Flex>
      <Flex alignItems="center" className={styles.menuIconWrapper} onClick={toggleFlyoutNavbar}>
        <Menu
          style={{ fill: navbarData.menuIconColor ? navbarData.menuIconColor : '#000000' }}
          className={styles.menuIcon}
        />
      </Flex>
      {textEditorOpen && anchorElement && (
        <Flex>
          <TextEditor
            headerText="Enter page name"
            onClose={toggleTextEditor}
            objective={currentEditingItem ? 'updatePageName' : 'addPage'}
            anchorElement={anchorElement}
            initialValue={currentEditingItem && currentEditingItem.name}
            oldSlug={currentEditingItem && currentEditingItem.slug}
          />
        </Flex>
      )}
      {flyoutNavbarOpen && (
        <FlyoutNavbar
          navbarData={navbarData}
          pagesData={pagesData}
          activePageSlug={activePageSlug}
          siteSlug={siteSlug}
          onClose={toggleFlyoutNavbar}
          onAddItemClick={handleAddBtnClick}
          allowEditing
        />
      )}
      {currentEditingItem && (
        <EditItemMenu
          isRow
          anchorEl={anchorElement}
          onClose={removeCurrentEditingItem}
          onEditClick={toggleTextEditor}
          onDeletePageClick={toggleDeletePageModalOpen}
        />
      )}
      {addItemMenuOpen && (
        <AddItemMenu
          anchorEl={anchorElement}
          onAddPageClick={handleAddPageClick}
          onLogoInputChange={handleLogoChange}
          onClose={toggleAddItemMenu}
        />
      )}
      {changeColorMenuOpen && (
        <ChangeColorMenu
          anchorEl={anchorElement}
          onClose={toggleChangeColorMenu}
          onBackgroundClick={handleBackgroundColorClick}
          onMenuIconClick={handleMenuIconColorClick}
        />
      )}
      {colorPickerPopoverOpen && anchorElement && (
        <ColorPicker
          onClose={toggleColorPickerPopover}
          coloredArea={shouldColorMenuIcon ? 'menuIcon' : 'navbar'}
          initialValue={shouldColorMenuIcon ? navbarData.menuIconColor : navbarData.backgroundColor}
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
          <p>{`${t('Will be deleted', {
            subject: currentEditingItem.name.replace(/\s?\<[^>]+\>/g, ''),
          })} ${t('This action cannot be undone')}`}</p>
        </Modal>
      )}
    </Flex>
  );
};

export default NavbarConstructor;
