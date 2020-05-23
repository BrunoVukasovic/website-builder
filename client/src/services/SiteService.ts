import axios from "axios";

import { CreateSite } from "../models";

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
}

export default new SiteService();
