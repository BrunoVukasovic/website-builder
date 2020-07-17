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
  isOutlined?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onPrimaryBtnClick, primaryBtnText, onMenuClick, showMenu, isOutlined }) => {
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
        variant={isOutlined ? 'outlined' : 'contained'}
        color="primary"
        size="large"
        onClick={onPrimaryBtnClick}
        className={isOutlined ? styles.outlined : ''}
        startIcon={primaryBtnText ? <EditIcon /> : <SaveIcon />}
      >
        {primaryBtnText ? `${primaryBtnText}` : `${t('Save changes')}`}
      </Button>
    </Flex>
  );
};

export default Footer;
