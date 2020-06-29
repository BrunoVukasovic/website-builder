import axios from 'axios';

import { GetSiteRes, UpdateSiteReq, CurrentSite, RenameSiteReq } from '../models';

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

  public deleteSite = (slug: string) =>
    new Promise((resolve, reject) => {
      const callApi = async () => {
        try {
          await axios.delete(`/site/delete/${slug}`);

          resolve();
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

  public renameSite = (oldSlug: string, payload: RenameSiteReq) =>
    new Promise<string>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.put<string>(`/site/rename/${oldSlug}`, payload);

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });

  public updateSite = (slug: string, payload: UpdateSiteReq) =>
    new Promise<CurrentSite>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.patch<CurrentSite>(`/site/update/${slug}`, payload);

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });
}

export default new SiteService();
