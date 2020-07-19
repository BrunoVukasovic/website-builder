import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../../components/Flex';

import styles from './edit_item_menu.module.scss';

export interface EditItemMenuProps {
  anchorEl: HTMLElement | null | undefined;
  onClose: () => void;
  onEditClick: () => void;
  onMoveNavbarItemClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDeletePageClick: () => void;
  onLogoChange: (_: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDeleteLogoClick?: () => void;
  isRow?: boolean;
  isLogo?: boolean;
  MenuProps?: Partial<MUIMenuProps>;
  onNotSupportedClick?: () => void;
}

const EditItemMenu: React.FC<EditItemMenuProps> = ({
  anchorEl,
  onClose,
  onEditClick,
  onMoveNavbarItemClick,
  onDeletePageClick,
  onNotSupportedClick,
  onLogoChange,
  onDeleteLogoClick,
  MenuProps,
  isRow,
  isLogo,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      PaperProps={{ className: styles.dropdownMenu }}
      onClose={onClose}
      open
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      {...MenuProps}
    >
      <li>
        <Flex fluid direction="column" className={styles.buttonWrapper}>
          {isLogo ? (
            <>
              <input
                id="changeLogoInput"
                type="file"
                accept="image/*"
                onChange={onLogoChange}
                className={styles.imageInput}
              />
              <Button color="primary" size="small" className={styles.dropdownMenuBtn}>
                <label htmlFor="changeLogoInput" className={styles.addImageLabel}>
                  Change logo
                </label>
              </Button>
              <Button
                onClick={onDeleteLogoClick}
                color="secondary"
                size="small"
                startIcon={<DeleteForeverIcon />}
                className={styles.dropdownMenuBtn}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onEditClick}
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                className={styles.dropdownMenuBtn}
              >
                Edit
              </Button>
              <Button
                id="navbarItemBackwards"
                onClick={onMoveNavbarItemClick}
                color="primary"
                size="small"
                startIcon={isRow ? <ArrowBackIosIcon /> : <ExpandLessIcon />}
                className={styles.dropdownMenuBtn}
              >
                {isRow ? `Move left` : `Move up`}
              </Button>
              <Button
                id="navbarItemForward"
                onClick={onMoveNavbarItemClick}
                color="primary"
                size="small"
                startIcon={isRow ? <ArrowForwardIosIcon /> : <ExpandMoreIcon />}
                className={styles.dropdownMenuBtn}
              >
                {isRow ? `Move right` : `Move down`}
              </Button>
              <Button
                onClick={onDeletePageClick}
                color="secondary"
                size="small"
                startIcon={<DeleteForeverIcon />}
                className={styles.dropdownMenuBtn}
              >
                Delete
              </Button>
            </>
          )}
        </Flex>
      </li>
    </Menu>
  );
};

export default EditItemMenu;
