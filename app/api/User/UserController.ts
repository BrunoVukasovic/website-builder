import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

import UserModel from '.';
import SiteController from '../Site/SiteController';

import { RegisterUserReq, UserDataRes, UserAuthRes } from '../../models';
import { UserDocument } from './UserModel';
import { DecodedToken } from '../../middleware/authentication';

const UserController = {
  getUserInfo: async (req: Request, res: Response) => {
    const { user } = (req as unknown) as { user: DecodedToken };

    if (!user) {
      res.status(400).send('Bad token.');
    }

    try {
      const allSites = await SiteController.findUsersSites(user._id);

      const payload: UserDataRes = {
        name: user.name,
        email: user.email,
        allSites,
      };
      res.status(200).send(payload);
    } catch (error) {
      res.status(500).send('Something went wrong, please try again.');
    }
  },
  login: async (req: Request, res: Response) => {
    const { user } = req as { user: UserDocument | undefined };

    if (user) {
      try {
        const tokenPayload = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = jwt.sign(tokenPayload, process.env.SECRET as string, { expiresIn: 259200 });

        const allSites = await SiteController.findUsersSites(user._id);

        const responsePayload: UserAuthRes = {
          name: user.name,
          email: user.email,
          allSites,
          token,
        };
        res.status(200).send(responsePayload);
      } catch (error) {
        res.status(500).send('Something went wrong, please try again.');
      }
    } else {
      res.status(400).send('Wrong email or password.');
    }
  },
  registerUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body as RegisterUserReq;

    if (!name || !email || !password) {
      res.status(400).json('Name, email and password must be provided in the request.');
      return;
    }

    try {
      let user = await UserModel.findOne({ email });

      if (user) {
        res.status(409).send('User with this email address already exist.');
        return;
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      user = await UserModel.create({ name, email, password: hash });

      const tokenPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(tokenPayload, process.env.SECRET as string, { expiresIn: 259200 });

      const responsePayload: UserAuthRes = {
        name: user.name,
        email: user.email,
        allSites: [],
        token,
      };

      res.status(201).send(responsePayload);
    } catch (err) {
      res.status(500).send('Something went wrong, please try again.');
    }

    // if (name && email && password) {
    //   try {
    //     let user = await UserModel.findOne({ email });

    //     if (user) {
    //       res.status(409).send('User with this email address already exist.');
    //     } else {
    //       const salt = await bcrypt.genSalt(saltRounds);
    //       const hash = await bcrypt.hash(password, salt);
    //       const user = await UserModel.create({ name, email, password: hash });

    //       const payload = {
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //       };
    //       const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: 259200 });

    //       const response: UserAuthRes = {
    //         name: user.name,
    //         email: user.email,
    //         allSites: [],
    //         token,
    //       };

    //       res.status(201).send(response);
    //     }
    //   } catch (err) {
    //     res.status(500).send('Something went wrong, please try again.');
    //   }
    // } else {
    //   res.status(400).json('Name, email and password must be provided in the request.');
    // }
  },
};

export default UserController;
