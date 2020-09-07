import express, { Application } from 'express';
import passport from 'passport';
import path from 'path';

import { config } from 'dotenv';

import SiteRouter from './api/Site/SiteRoutes';
import UserRouter from './api/User/UserRoutes';
import initializePassport from './config/passport';
import connectDatabase from './config/database';

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

config();
connectDatabase();
initializePassport(passport);

app.use(passport.initialize());

app.use('/site', SiteRouter);
app.use('/user', UserRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}
// master
app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}...`);
});
