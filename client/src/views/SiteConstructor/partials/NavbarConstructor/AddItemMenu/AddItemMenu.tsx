import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../../components/Flex';

import styles from './add_item_menu.module.scss';

export interface AddItemMenuProps {
  anchorEl: HTMLElement | null | undefined;
  onClose: () => void;
  onAddPageClick: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onLogoInputChange: (_: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  MenuProps?: Partial<MUIMenuProps>;
}

const AddItemMenu: React.FC<AddItemMenuProps> = ({
  anchorEl,
  onClose,
  onAddPageClick,
  onLogoInputChange,
  MenuProps,
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
          <Button onClick={onAddPageClick} color="primary" size="small" className={styles.dropdownMenuBtn}>
            Add page
          </Button>
          <input
            id="addLogoInput"
            type="file"
            accept="image/*"
            onChange={onLogoInputChange}
            className={styles.imageInput}
          />
          <Button color="primary" size="small" className={styles.dropdownMenuBtn}>
            <label htmlFor="addLogoInput" className={styles.addImageLabel}>
              Add logo
            </label>
          </Button>
        </Flex>
      </li>
    </Menu>
  );
};

export default AddItemMenu;
