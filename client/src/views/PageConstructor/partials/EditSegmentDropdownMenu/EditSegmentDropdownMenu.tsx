import React from 'react';
import cx from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../components/Flex';

import styles from '../AddSegmentDropdownMenu/add_segment_dropdown_menu.module.scss';

export interface EditSegmentDropdownMenuProps {
  segmentType: 'text' | 'image';
  onClose: () => void;
  onEditTextClick: () => void;
  transparent?: boolean;
  anchorEl?: HTMLElement;
  MenuProps?: Partial<MUIMenuProps>;
  onDeleteSegmentClick?: () => void;
  onNotSupportedClick?: () => void;
  onChangeImageSizeClick?: () => void;
  onChangeImagePositionClick?: () => void;
}

const EditSegmentDropdownMenu: React.FC<EditSegmentDropdownMenuProps> = ({
  anchorEl,
  transparent,
  segmentType,
  onClose,
  onEditTextClick,
  MenuProps,
  onNotSupportedClick,
  onChangeImageSizeClick,
  onChangeImagePositionClick,
  onDeleteSegmentClick,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      PaperProps={{ className: transparent ? cx(styles.dropdownMenu, styles.transparent) : styles.dropdownMenu }}
      onClose={onClose}
      open
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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
              <Button
                onClick={onChangeImagePositionClick}
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                className={styles.dropdownMenuBtn}
              >
                Change position
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
            onClick={onDeleteSegmentClick}
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
