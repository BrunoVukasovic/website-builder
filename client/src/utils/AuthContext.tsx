import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import UserService from '../services/UserService';

import { initialState as initialUserReducerState } from '../redux/reducers/user';
import { setUser } from '../redux/actions/user';
import { UserAuthRes } from '../models';

export interface AuthContextValues {
  isAuth: boolean;
  logIn: (payload: UserAuthRes) => void;
  logOut: () => void;
  initUserData: () => void;
}

export const initialValues: AuthContextValues = {
  isAuth: false,
  logIn: () => {},
  logOut: () => {},
  initUserData: () => {},
};

const AuthContext = React.createContext<AuthContextValues>(initialValues);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useDispatch();

  const initUserData = () => {
    const token = localStorage.getItem('token');
    refreshAuthHeader(token);

    if (token) {
      const callApi = async () => {
        try {
          const userData = await UserService.getUserData();

          dispatch(setUser(userData));
          setIsAuth(true);
        } catch (error) {
          //@NOTE provjeri je li negdi uzrokuje error
          localStorage.removeItem('token');
        }
      };

      callApi();
    }
  };

  const logIn = ({ name, email, allSites, token }: UserAuthRes) => {
    refreshAuthHeader(token);
    localStorage.setItem('token', token);
    dispatch(setUser({ name, email, allSites }));
    setIsAuth(true);
  };

  const logOut = () => {
    refreshAuthHeader(null);
    localStorage.removeItem('token');
    dispatch(setUser(initialUserReducerState));
    setIsAuth(false);
  };

  const refreshAuthHeader = (token: string | null) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };
  return <AuthContext.Provider value={{ isAuth, logIn, logOut, initUserData }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
