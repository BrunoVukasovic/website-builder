import express from 'express';
import passport from 'passport';

import UserController from './UserController';
import auth from '../../middleware/auth';

const UserRouter = express.Router();

UserRouter.get('/data', auth, UserController.getUserInfo);

UserRouter.post('/login', passport.authenticate('local', { session: false }), UserController.login);

UserRouter.post('/register', UserController.registerNewUser);

export default UserRouter;
