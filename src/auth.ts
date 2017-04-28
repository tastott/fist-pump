import passport = require("passport");
import {ensureLoggedIn} from "connect-ensure-login";
import { Handler } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user";
import { IUserRepository } from "./repositories/user-repository";

export const Authorize: Handler = ensureLoggedIn("/account/login");

function ConfigureAuth(getUserRepo: () => IUserRepository): Handler {
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
            const userRepo = getUserRepo();
            userRepo.AddTeam({ Name: "My Team"})
                .then(team => userRepo.AddUser(team.Id, { Username: username }))
                .then(user => done(null, user))
                .catch(error => done(error));
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
