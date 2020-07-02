import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { DecodedToken } from './authentication';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    req.user = undefined;

    next();
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET as string) as DecodedToken;
      req.user = decoded;

      next();
    } catch (error) {
      req.user = undefined;

      next();
    }
  }
};

export default checkToken;
