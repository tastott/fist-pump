import passport = require("passport");
import {ensureLoggedIn} from "connect-ensure-login";
import { Handler } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user";

export const Authorize: Handler = ensureLoggedIn("/account/login");

function ConfigureAuth(): Handler {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            // User.findOne({ username: username }, function (err, user) {
            //   if (err) { return done(err); }
            //   if (!user) {
            //     return done(null, false, { message: "Incorrect username." });
            //   }
            //   if (!user.validPassword(password)) {
            //     return done(null, false, { message: "Incorrect password." });
            //   }
            //   return done(null, user);
            // });
            const user: User = {
                TeamId: "test",
                Username: username
            };

            done(null, user);
        }
    ));

    passport.serializeUser((user, cb) => {
        cb(null, JSON.stringify(user));
    });

    passport.deserializeUser((input, cb) => {
        cb(null, JSON.parse(input as any));
    });

    return passport.initialize();
}

export default ConfigureAuth;
