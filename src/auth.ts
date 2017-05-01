import passport = require("passport");
import {ensureLoggedIn} from "connect-ensure-login";
import { Handler } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user";
import { IUserRepository } from "./repositories/user-repository";
import Auth0Strategy = require("passport-auth0");
import { Auth0Service } from "./services/auth0-service";

export const Authorize: Handler = ensureLoggedIn("/account/login");

function ConfigureAuth(getAuth0Service: () => Auth0Service): Handler {
    const strategy = new Auth0Strategy({
        domain:       process.env.AUTH0_DOMAIN,
        clientID:     process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:  process.env.AUTH0_CALLBACK_URL
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user

        const auth0Service = getAuth0Service();
        auth0Service.GetAppUser(profile)
            .then(user => done(null, user))
            .catch(error => done(error, null));
    });

    passport.use(strategy);

    // This can be used to keep a smaller payload
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    return passport.initialize();
}

export default ConfigureAuth;
