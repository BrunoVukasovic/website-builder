import React, { useState } from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
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
import {
  deletePage,
  changeLogo,
  deleteLogo,
  moveNavbarItemForward,
  moveNavbarItemBackwards,
  updateCurrentPagePosition,
} from '../../../../redux/actions/site';
import { fileToBase64String } from '../../../../utils/shared';

import styles from './navbar_constructor.module.scss';

export type CurrentEditingItem = {
  slug: string;
  name: string;
  position: number;
  id?: string;
};
export interface NavbarConstructorProps {
  pagesData: CurrentEditingItem[];
  activePageSlug: string;
  acitvePagePosition: number;
  siteSlug: string;
  navbarData: Navbar;
}

const NavbarConstructor: React.FC<NavbarConstructorProps> = ({
  pagesData,
  siteSlug,
  navbarData,
  activePageSlug,
  acitvePagePosition,
}) => {
  const [currentEditingItem, setCurrentEditingItem] = useState<CurrentEditingItem | undefined>(undefined);
  const [shouldColorMenuIcon, toggleShouldColorMenuIcon] = useToggle(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(undefined);
  const [textEditorOpen, toggleTextEditor] = useToggle(false);
  const [flyoutNavbarOpen, toggleFlyoutNavbar] = useToggle(false);
  const [deletePageModalOpen, toggleDeletePageModal] = useToggle(false);
  const [colorPickerPopoverOpen, toggleColorPickerPopover] = useToggle(false);
  const [changeColorMenuOpen, toggleChangeColorMenu] = useToggle(false);
  const [addItemMenuOpen, toggleAddItemMenu] = useToggle(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const sortedNavbarItems = React.useMemo(() => pagesData.sort((a, b) => a.position - b.position), [pagesData]);

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
      } catch {
        enqueueSnackbar('Something went wrong while processing image. Please, try again.', { variant: 'error' });
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
  };

  const handleDeleteLogoClick = () => {
    dispatch(deleteLogo());
    setCurrentEditingItem(undefined);
  };

  const handleDeletePage = () => {
    if (currentEditingItem) {
      dispatch(deletePage({ slug: currentEditingItem.slug, id: currentEditingItem.id }));
      setCurrentEditingItem(undefined);
    }
  };

  const handleEditItemMenuClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;
    if (currentTarget.id === 'editLogoButton') {
      setCurrentEditingItem({ name: 'changeLogoImage', slug: '', position: 0 });
    } else {
      const clickedItem = pagesData.find((item) => item.slug === currentTarget.id);
      setCurrentEditingItem(clickedItem);
    }
    setAnchorElement(currentTarget);
  };

  const handleMoveNavbarItemClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { currentTarget } = e;

    if (currentEditingItem) {
      if (currentTarget.id === 'navbarItemForward' && currentEditingItem.position < sortedNavbarItems.length) {
        dispatch(moveNavbarItemForward(currentEditingItem.position));

        if (currentEditingItem.position === acitvePagePosition) {
          dispatch(updateCurrentPagePosition(currentEditingItem.position + 1));
        }
      } else if (currentTarget.id === 'navbarItemBackwards' && currentEditingItem.position > 1) {
        dispatch(moveNavbarItemBackwards(currentEditingItem.position));

        if (currentEditingItem.position === acitvePagePosition) {
          dispatch(updateCurrentPagePosition(currentEditingItem.position - 1));
        }
      }
    }

    removeCurrentEditingItem();
  };

  const removeCurrentEditingItem = () => {
    setCurrentEditingItem(undefined);
  };

  return (
    <Flex style={{ backgroundColor: navbarData.backgroundColor }} className={styles.navbar}>
      <Flex className={styles.navbarItemsWrapper}>
        {navbarData.logo && (
          <>
            <IconButton id="editLogoButton" onClick={handleEditItemMenuClick} color="primary" aria-label="edit">
              <EditIcon />
            </IconButton>
            <img src={navbarData.logo} alt="logo" className={styles.logo} />{' '}
          </>
        )}
        {sortedNavbarItems.map((item) => (
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
          onColorPaletteButtonClick={handleColorPickerClick}
          allowEditing
        />
      )}
      {currentEditingItem && (
        <EditItemMenu
          isRow
          anchorEl={anchorElement}
          onClose={removeCurrentEditingItem}
          onEditClick={toggleTextEditor}
          onMoveNavbarItemClick={handleMoveNavbarItemClick}
          onDeletePageClick={toggleDeletePageModal}
          isLogo={currentEditingItem.name === 'changeLogoImage'}
          onLogoChange={handleLogoChange}
          onDeleteLogoClick={handleDeleteLogoClick}
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
          onClose={toggleDeletePageModal}
          headerText="Delete whole page?"
          showFooter
          primaryButtonText="Delete"
          secondaryButtonText="Close"
          onSecondaryButtonClick={toggleDeletePageModal}
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
