import express from 'express';
import passport from 'passport';

import UserController from './UserController';
import authentication from '../../middleware/authentication';

const UserRouter = express.Router();

UserRouter.get('/data', authentication, UserController.getUserInfo);

UserRouter.post('/login', passport.authenticate('local', { session: false }), UserController.login);

UserRouter.post('/register', UserController.registerUser);

export default UserRouter;
