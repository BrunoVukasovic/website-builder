import axios from 'axios';

import { Site } from '../models';

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
    new Promise<Site>((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.get<Site>(`/site/get/${slug}`);

          resolve(data);
        } catch (error) {
          reject(error);
        }
      };

      callApi();
    });
}

export default new SiteService();
