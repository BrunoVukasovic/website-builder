import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface DecodedToken {
  _id: string;
  name: string;
  email: string;
  iat: number;
}

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json('No token, authentication denied.');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET as string) as DecodedToken;

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};

export default authentication;
