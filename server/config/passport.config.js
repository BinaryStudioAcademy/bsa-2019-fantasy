import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import userRepository from '../data/repositories/user.repository';
import cryptoHelper from '../helpers/crypto.helper';

import { secret } from './jwt.config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await userRepository.getByEmail(email);
        if (!user) {
          return done({ status: 401, message: 'Incorrect email.' }, false);
        }

        const { password: userPassword, ...userToSend } = user.dataValues;

        if (userPassword === null) {
          return done(
            {
              status: 401,
              message:
                'Seems like you logged in with Facebook account bound to the entered email. ' +
                'To login in a traditional way try to set password in profile.',
            },
            null,
          );
        }

        return (await cryptoHelper.compare(password, userPassword))
          ? done(null, userToSend)
          : done({ status: 401, message: 'Wrong password.' }, null);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  'register',
  new LocalStrategy(
    { usernameField: 'name', passReqToCallback: true },
    async ({ body: { email } }, name, password, done) => {
      try {
        const userByEmail = await userRepository.getByEmail(email);
        if (userByEmail) {
          return done({ status: 401, message: 'Email is already taken.' }, null);
        }

        return (await userRepository.getByUsername(name))
          ? done(
            {
              status: 401,
              message: 'Username is already taken.',
            },
            null,
          )
          : done(null, { email, name, password });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(options, async ({ id }, done) => {
    try {
      const user = await userRepository.getById(id);
      return user
        ? done(null, user)
        : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `/api/auth/fb/callback`,
      profileFields: ['id', 'emails', 'name'],
      authType: 'reauthenticate',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, first_name, last_name, email } = profile._json;
      const name = `${first_name} ${last_name}`;

      if (!email) {
        return done({ status: 401, message: 'Facebook profile email does not exist' }, null);
      }

      try {
        let user = await userRepository.getByEmail(email);

        if (!user) {
          const userWithSuchName = await userRepository.getByUsername(name);

          user = await userRepository.addUser({
            facebook_id: id,
            email,
            name: userWithSuchName ? `${name} ${Math.random()}` : name,
          });
        }

        return done(null, {
          id: user.id,
          email: user.email,
          name: user.name,
        });
      } catch (err) {
        return done({ status: 401, message: 'Could not authorize' }, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));
