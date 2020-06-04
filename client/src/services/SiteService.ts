import axios from 'axios';

import { GetSiteRes, UpdateSiteReq } from '../models';

class SiteService {
  public create = (title: string, slug: string) =>
    new Promise((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.post(`/site/create/${slug}`, { title });

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });

  public getSite = (slug: string) =>
    new Promise<GetSiteRes>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.get<GetSiteRes>(`/site/get/${slug}`);

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });

  public updateSite = (slug: string, payload: UpdateSiteReq) =>
    new Promise((resolve, reject) => {
      const callApi = async () => {
        try {
          await axios.patch(`/site/update/${slug}`, payload);

          resolve();
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });
}

export default new SiteService();
