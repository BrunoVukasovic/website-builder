import React from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import { useTranslation } from 'react-i18next';

import Flex from '../Flex';

import styles from './footer.module.scss';

export interface FooterProps {
  onPrimaryBtnClick: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
  primaryBtnText?: string;
}

const Footer: React.FC<FooterProps> = ({ onPrimaryBtnClick, primaryBtnText, onMenuClick, showMenu }) => {
  const { t } = useTranslation();

  return (
    <Flex justifyContent="space-between" className={styles.footerContainer}>
      {showMenu && (
        <Button
          variant="outlined"
          color="primary"
          size="large"
          className={styles.secondaryButton}
          onClick={onMenuClick}
        >
          <UnfoldMoreIcon className={styles.unfoldMoreIcon} />
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onPrimaryBtnClick}
        className={styles.saveBtn}
        startIcon={primaryBtnText ? <EditIcon /> : <SaveIcon />}
      >
        {primaryBtnText ? `${primaryBtnText}` : `${t('Save changes')}`}
      </Button>
    </Flex>
  );
};

export default Footer;
