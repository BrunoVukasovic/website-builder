import React, { useState } from 'react';

import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

export interface AuthProps {
  shouldRegister?: boolean;
  closeModal?: () => void;
}
const Auth: React.FC<AuthProps> = ({ closeModal, shouldRegister }) => {
  const [registerView, setRegisterView] = useState<boolean | undefined>(shouldRegister);

  const toggleRegisterView = () => {
    setRegisterView(!registerView);
  };

  if (registerView) {
    return <RegisterForm onGoBackClick={toggleRegisterView} closeModal={closeModal} />;
  }

  return <LoginForm onRegisterClick={toggleRegisterView} closeModal={closeModal} />;
};

export default Auth;
