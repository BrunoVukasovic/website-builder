import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../../components/Flex';

import styles from './change_color_menu.module.scss';

export interface ChangeColorMenuProps {
  anchorEl: HTMLElement | null | undefined;
  onClose: () => void;
  onBackgroundClick: () => void;
  onMenuIconClick: () => void;
  MenuProps?: Partial<MUIMenuProps>;
}

const ChangeColorMenu: React.FC<ChangeColorMenuProps> = ({
  anchorEl,
  onClose,
  onBackgroundClick,
  onMenuIconClick,
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
          <Button onClick={onBackgroundClick} color="primary" size="small" className={styles.dropdownMenuBtn}>
            Background
          </Button>
          <Button onClick={onMenuIconClick} color="primary" size="small" className={styles.dropdownMenuBtn}>
            Menu Icon
          </Button>
        </Flex>
      </li>
    </Menu>
  );
};

export default ChangeColorMenu;
