import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../Flex';

import styles from './edit_item_dropdown_menu.module.scss';

export interface EditItemDropdownMenuProps {
  anchorEl: HTMLElement | null | undefined;
  onClose: () => void;
  onEditClick: () => void;
  isRow?: boolean;
  MenuProps?: Partial<MUIMenuProps>;
  onNotSupportedClick?: () => void;
}

const EditItemDropdownMenu: React.FC<EditItemDropdownMenuProps> = ({
  anchorEl,
  onClose,
  onEditClick,
  MenuProps,
  onNotSupportedClick,
  isRow,
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
            onClick={onNotSupportedClick}
            color="primary"
            size="small"
            startIcon={<ExpandLessIcon />}
            className={styles.dropdownMenuBtn}
          >
            {isRow ? `Move left` : `Move up`}
          </Button>
          <Button
            onClick={onNotSupportedClick}
            color="primary"
            size="small"
            startIcon={<ExpandMoreIcon />}
            className={styles.dropdownMenuBtn}
          >
            {isRow ? `Move right` : `Move down`}
          </Button>
          <Button
            onClick={onNotSupportedClick}
            color="secondary"
            size="small"
            startIcon={<DeleteForeverIcon />}
            className={styles.dropdownMenuBtn}
          >
            Delete
          </Button>
        </Flex>
      </li>
    </Menu>
  );
};

export default EditItemDropdownMenu;
