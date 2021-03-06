import React from 'react';

import { Menu, Button } from '@material-ui/core';
import { MenuProps as MUIMenuProps } from '@material-ui/core/Menu';
import { useTranslation } from 'react-i18next';

import Flex from '../../../../../components/Flex';

import styles from './add_segment_menu.module.scss';

export interface AddSegmentMenuProps {
  onClose: () => void;
  onAddTextClick: () => void;
  onImageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  anchorEl?: HTMLElement;
  MenuProps?: Partial<MUIMenuProps>;
}

const AddSegmentMenu: React.FC<AddSegmentMenuProps> = ({
  anchorEl,
  onClose,
  onImageInputChange,
  onAddTextClick,
  MenuProps,
}) => {
  const { t } = useTranslation();

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
            {t('Add text')}
          </Button>
          <input
            id="addImageInput"
            type="file"
            accept="image/*"
            onChange={onImageInputChange}
            className={styles.imageInput}
          />
          <Button color="primary" size="medium" className={styles.imageInputBtn}>
            <label htmlFor="addImageInput" className={styles.addImageLabel}>
              {t('Add image')}
            </label>
          </Button>
        </Flex>
      </li>
    </Menu>
  );
};

export default AddSegmentMenu;
