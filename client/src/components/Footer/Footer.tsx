import React from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import { useSelector } from 'react-redux';

import Flex from '../Flex';
import SiteService from '../../services/SiteService';

import styles from './footer.module.scss';

export interface FooterProps {
  onPrimaryBtnClick: () => void;
  primaryBtnText?: string;
}

const Footer: React.FC<FooterProps> = ({ onPrimaryBtnClick, primaryBtnText }) => {
  const saveChanges = async () => {
    console.log('clicked save changes');
    const payload = {
      // richTextHTML: pageFormValues.richTextHTML,
      title: 'Site Title',
    };
    try {
      console.log('try');
      const response = await SiteService.create(payload);
      console.log(response);
      console.log('no res');
    } catch (err) {
      console.log('err');
      console.log(err.response);
    }
  };

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
