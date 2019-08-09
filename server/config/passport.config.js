import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { secret } from "./jwt.config";
import userRepository from "../data/repositories/user.repository";
import cryptoHelper from "../helpers/crypto.helper";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await userRepository.getByEmail(email);
                if (!user) {
                    return done(
                        { status: 401, message: "Incorrect email." },
                        false
                    );
                }

                return (await cryptoHelper.compare(password, user.password))
                    ? done(null, user)
                    : done(
                          { status: 401, message: "Passwords do not match." },
                          null,
                          false
                      );
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true },
        async ({ body: { email } }, username, password, done) => {
            try {
                const userByEmail = await userRepository.getByEmail(email);
                if (userByEmail) {
                    return done(
                        { status: 401, message: "Email is already taken." },
                        null
                    );
                }

                return (await userRepository.getByUsername(username))
                    ? done(
                          {
                              status: 401,
                              message: "Username is already taken."
                          },
                          null
                      )
                    : done(null, { email, username, password });
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new JwtStrategy(options, async ({ id }, done) => {
        try {
            const user = await userRepository.getById(id);
            return user
                ? done(null, user)
                : done({ status: 401, message: "Token is invalid." }, null);
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "http://localhost:5001/api/auth/fb/callback",
            profileFields: ["id", "displayName", "photos", "email"]
        },
        (accessToken, refreshToken, user, done) => {
            return user
                ? done(null, user)
                : done({ status: 401, message: "Could not authorize" }, null);
        }
    )
);
//need for facebook strategy verify-cALLBACK
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
