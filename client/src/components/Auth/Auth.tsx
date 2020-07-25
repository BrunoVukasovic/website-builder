import React, { useState } from 'react';

import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from '../../utils/AuthContext';

export interface AuthProps {
  shouldRegister?: boolean;
  shouldRedirect?: boolean;
  className?: string;
}

const Auth: React.FC<AuthProps> = ({ shouldRegister, className }) => {
  const [registerView, setRegisterView] = useState<boolean | undefined>(shouldRegister);

  const toggleRegisterView = React.useCallback(() => {
    setRegisterView(!registerView);
  }, [registerView]);

  if (registerView) {
    return <RegisterForm onGoBackClick={toggleRegisterView} shouldRedirect className={className} />;
  }

  return <LoginForm onRegisterClick={toggleRegisterView} shouldRedirect className={className} />;
};

export default Auth;
