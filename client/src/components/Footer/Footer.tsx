import React from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import Flex from '../Flex';

import styles from './footer.module.scss';

export interface FooterProps {
  onPrimaryBtnClick: () => void;
  primaryBtnText?: string;
}

const Footer: React.FC<FooterProps> = ({ onPrimaryBtnClick, primaryBtnText }) => {
  return (
    <Flex justifyContent="space-between" className={styles.footerContainer}>
      <Button color="inherit" size="large">
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onPrimaryBtnClick}
        className={styles.saveBtn}
        startIcon={primaryBtnText ? <EditIcon /> : <SaveIcon />}
      >
        {primaryBtnText ? `${primaryBtnText}` : 'Save changes'}
      </Button>
    </Flex>
  );
};

export default Footer;
