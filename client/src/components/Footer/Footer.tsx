import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import Flex from '../Flex';
import Modal from '../Modal';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';

import { useAuth } from '../../utils/AuthContext';

import styles from './footer.module.scss';

export interface FooterProps {
  onPrimaryBtnClick: () => void;
  primaryBtnText?: string;
}

const Footer: React.FC<FooterProps> = ({ onPrimaryBtnClick, primaryBtnText }) => {
  const [authModal, setAuthModal] = useState<'Login' | 'Register' | undefined>(undefined);
  const { isAuth, logOut } = useAuth();

  const closeAuthModal = () => {
    setAuthModal(undefined);
  };

  const openLoginForm = () => {
    setAuthModal('Login');
  };

  const openRegisterForm = () => {
    setAuthModal('Register');
  };

  return (
    <Flex justifyContent="space-between" className={styles.footerContainer}>
      <Button color="inherit" size="large" onClick={isAuth ? logOut : openLoginForm}>
        {isAuth ? 'Logout' : 'Login'}
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
      {authModal && (
        <Modal onClose={closeAuthModal} headerText={`${authModal}:`}>
          {authModal === 'Login' && <Login onRegisterClick={openRegisterForm} closeModal={closeAuthModal} />}
          {authModal === 'Register' && <Register onGoBackClick={openLoginForm} closeModal={closeAuthModal} />}
        </Modal>
      )}
    </Flex>
  );
};

export default Footer;
