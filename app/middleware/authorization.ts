import { Request, Response, NextFunction } from 'express';

import SiteModel from '../api/Site/SiteModel';

import { DecodedToken } from './authentication';

const authorization = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = (req as unknown) as { user: DecodedToken };
  const { slug } = req.params;

  if (!user) {
    return res.status(401).json('Invalid token, authorization failed.');
  }

  try {
    const site = await SiteModel.findOne({ slug });

    if (site) {
      if (site.userID.equals(user._id)) {
        //@ts-ignore
        req.site = site;
        next();
      } else {
        return res.status(401).json('Authorization failed.');
      }
    } else {
      res.status(500).send("Couldn't find site");
    }
  } catch (err) {
    res.status(401).send('Something went wrong during authorization.');
  }
};

export default authorization;
