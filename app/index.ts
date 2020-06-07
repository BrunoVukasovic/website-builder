import express, { Application } from 'express';
import passport from 'passport';

import { config } from 'dotenv';

import initializePassport from './config/passport';
import connectDatabase from './config/database';
import SiteRouter from './api/Site/SiteRoutes';
import PageRouter from './api/Page/PageRoutes';
import NavbarRouter from './api/Navbar/NavbarRoutes';
import UserRouter from './api/User/UserRoutes';

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Bodyparser

config();
connectDatabase();
initializePassport(passport);

app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Index');
});
app.use(
  '/site',
  (req, res, next) => {
    console.log('app/index/site');
    next();
  },
  SiteRouter
);
app.use('/user', UserRouter);
app.use('/navbar', NavbarRouter);
app.use('/page', PageRouter);

app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}...`);
});
