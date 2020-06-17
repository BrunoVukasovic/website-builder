import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../Flex';

import styles from '../AddSegmentDropdownMenu/add_segment_dropdown_menu.module.scss';

export interface EditSegmentDropdownMenuProps {
  segmentType: 'text' | 'image';
  onClose: () => void;
  onEditTextClick: () => void;
  anchorEl?: HTMLElement;
  MenuProps?: Partial<MUIMenuProps>;
  onNotSupportedClick?: () => void;
  onChangeImageSizeClick?: () => void;
}

const EditSegmentDropdownMenu: React.FC<EditSegmentDropdownMenuProps> = ({
  anchorEl,
  segmentType,
  onClose,
  onEditTextClick,
  MenuProps,
  onNotSupportedClick,
  onChangeImageSizeClick,
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
          {segmentType === 'text' ? (
            <Button
              onClick={onEditTextClick}
              color="primary"
              size="small"
              startIcon={<EditIcon />}
              className={styles.dropdownMenuBtn}
            >
              Edit content
            </Button>
          ) : (
            <>
              <Button
                // onClick={onEditClick}
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                className={styles.dropdownMenuBtn}
              >
                Change image
              </Button>
              <Button
                onClick={onChangeImageSizeClick}
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                className={styles.dropdownMenuBtn}
              >
                Change size
              </Button>
            </>
          )}

          <Button
            onClick={onNotSupportedClick}
            color="primary"
            size="small"
            startIcon={<ExpandLessIcon />}
            className={styles.dropdownMenuBtn}
          >
            Move up
          </Button>
          <Button
            onClick={onNotSupportedClick}
            color="primary"
            size="small"
            startIcon={<ExpandMoreIcon />}
            className={styles.dropdownMenuBtn}
          >
            Move down
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

export default EditSegmentDropdownMenu;
