import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

import { selectCurrentSite } from '../../redux/selectors/site';

export interface AuthProps {
  shouldRegister?: boolean;
  shouldRedirect?: boolean;
  className?: string;
}

const Auth: React.FC<AuthProps> = ({ shouldRegister, className }) => {
  const [registerView, setRegisterView] = useState<boolean | undefined>(shouldRegister);
  const currentSite = useSelector(selectCurrentSite);

  const toggleRegisterView = React.useCallback(() => {
    setRegisterView(!registerView);
  }, [registerView]);

  if (registerView) {
    return (
      <RegisterForm onGoBackClick={toggleRegisterView} shouldRedirect currentSite={currentSite} className={className} />
    );
  }

  return (
    <LoginForm onRegisterClick={toggleRegisterView} shouldRedirect currentSite={currentSite} className={className} />
  );
};

export default Auth;
