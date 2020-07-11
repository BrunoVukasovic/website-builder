import React, { useState } from 'react';

import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';

export interface AuthProps {
  shouldRegister?: boolean;
}

const Auth: React.FC<AuthProps> = ({ shouldRegister }) => {
  const [registerView, setRegisterView] = useState<boolean | undefined>(shouldRegister);

  const toggleRegisterView = React.useCallback(() => {
    setRegisterView(!registerView);
  }, []);

  if (registerView) {
    return <RegisterForm onGoBackClick={toggleRegisterView} />;
  }

  return <LoginForm onRegisterClick={toggleRegisterView} />;
};

export default Auth;
