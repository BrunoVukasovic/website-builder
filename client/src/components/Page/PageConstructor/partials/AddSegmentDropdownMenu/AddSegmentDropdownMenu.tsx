import React, { useState } from 'react';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../Flex';

import styles from './add_segment_dropdown_menu.module.scss';

export interface AddSegmentDropdownMenuProps {
  onClose: () => void;
  onAddTextClick: () => void;
  onNotSupportedClick?: () => void;
  anchorEl?: HTMLElement;
  MenuProps?: Partial<MUIMenuProps>;
}

const AddSegmentDropdownMenu: React.FC<AddSegmentDropdownMenuProps> = ({
  anchorEl,
  onClose,
  onNotSupportedClick,
  onAddTextClick,
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
          <Button onClick={onAddTextClick} className={styles.dropdownMenuBtn} color="primary" size="medium">
            Add text
          </Button>
          <Button color="primary" size="medium" onClick={onNotSupportedClick} className={styles.dropdownMenuBtn}>
            Add image
          </Button>
          <Button color="primary" size="medium" onClick={onNotSupportedClick} className={styles.dropdownMenuBtn}>
            Add form
          </Button>
        </Flex>
      </li>
    </Menu>
  );
};

export default AddSegmentDropdownMenu;
