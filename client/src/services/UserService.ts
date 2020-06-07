import axios from 'axios';

import { LoginReq, RegisterUserReq, UserDataRes, UserAuthRes } from '../models';

class UserService {
  public getUserData = () =>
    new Promise<UserDataRes>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.get<UserDataRes>('/user/data');

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });

  public login = (payload: LoginReq) =>
    new Promise<UserAuthRes>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.post<UserAuthRes>('/user/login', payload);

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });

  public register = (payload: RegisterUserReq) =>
    new Promise<UserAuthRes>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.post<UserAuthRes>('/user/register', payload);

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });
}

export default new UserService();
