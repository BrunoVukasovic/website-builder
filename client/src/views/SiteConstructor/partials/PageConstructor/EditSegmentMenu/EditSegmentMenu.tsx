import React from 'react';
import cx from 'classnames';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';

import Flex from '../../../../../components/Flex';

import styles from '../AddSegmentMenu/add_segment_menu.module.scss';

export interface EditSegmentMenuProps {
  segmentType: 'text' | 'image';
  onClose: () => void;
  onEditTextClick: () => void;
  onMoveSegmentClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUpClick?: () => void;
  onMoveDownClick?: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onDeleteSegmentClick: () => void;
  onChangeImageSizeClick: () => void;
  onChangeImagePositionClick: () => void;
  onNotSupportedClick: () => void;
  transparent?: boolean;
  anchorEl?: HTMLElement;
  MenuProps?: Partial<MUIMenuProps>;
}

const EditSegmentMenu: React.FC<EditSegmentMenuProps> = ({
  anchorEl,
  transparent,
  segmentType,
  onClose,
  onEditTextClick,
  onMoveSegmentClick,
  onMoveUpClick,
  onMoveDownClick,
  onImageChange,
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
              <input
                id="changeImageInput"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className={styles.imageInput}
              />
              <Button color="primary" size="small" startIcon={<EditIcon />} className={styles.dropdownMenuBtn}>
                <label htmlFor="changeImageInput" className={styles.addImageLabel}>
                  Change image
                </label>
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
            id="pageSegmentBackwards"
            onClick={onMoveSegmentClick}
            color="primary"
            size="small"
            startIcon={<ExpandLessIcon />}
            className={styles.dropdownMenuBtn}
          >
            Move up
          </Button>
          <Button
            id="pageSegmentForward"
            onClick={onMoveSegmentClick}
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

export default EditSegmentMenu;
