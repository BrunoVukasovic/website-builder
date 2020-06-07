import bcrypt from 'bcrypt';

import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel, { UserDocument } from '../api/User';

const initializePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email: string, password: string, done: (err: any, user: UserDocument | boolean) => void) => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false);
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};

export default initializePassport;
