import bcrypt from 'bcrypt';

import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel, { UserDocument } from '../api/User';

const initializePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email: string, password: string, done: (err: any, user: UserDocument | undefined) => void) => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, undefined);
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, undefined);
          }
        } catch (error) {
          return done(error, undefined);
        }
      }
    )
  );
};

export default initializePassport;
