import axios from "axios";

import { CreateSite, Site } from "../models";

class SiteService {
  public create = (payload: CreateSite) =>
    new Promise((resolve, reject) => {
      const callApi = async () => {
        try {
          const { data } = await axios.post("site/create/treci", payload);

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
          const { data } = await axios.get<Site>(`/site/${slug}`);

          resolve(data);
        } catch (err) {
          reject(err);
        }
      };

      callApi();
    });
}

export default new SiteService();
