import { Auth0User } from "../models/auth0-user";
import { injectable, inject } from "inversify";
import { TYPES } from "../constants";
import { IUserRepository } from "../repositories/user-repository";
import { User } from "../models/user";
import { Auth0TokenRepository } from "../repositories/auth0-token-repository";
import auth0 = require("auth0");

@injectable()
export class Auth0Service {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(Auth0TokenRepository) private tokenRepository: Auth0TokenRepository
    ) {
    }

    public GetAppUser(auth0User: Auth0User): Promise<User> {
        // If Auth0User already has associated app user, get it from repository
        if (auth0User.app_metadata && auth0User.app_metadata.fistPumpUserId) {
            return this.userRepository.GetUser(auth0User.app_metadata.fistPumpUserId);
        } else {
            // Otherwise, create new app user and associate it via Auth0 API
            if (!auth0User.emails || !auth0User.emails.length) {
                return Promise.reject<User>("Cannot create new user without email address.");
            }
            return this.tokenRepository.GetToken()
                .then(token =>
                    this.userRepository.AddUser({Username: auth0User.emails[0].value})
                        .then(newUser => {
                            const auth0Client = new auth0.ManagementClient({
                                domain: process.env.AUTH0_DOMAIN,
                                token
                            });
                            return auth0Client.updateAppMetadata({
                                id: auth0User.id
                            }, {
                                fistPumpUserId: newUser.Id
                            })
                            .then(() => newUser);
                        })
                );
        }
    }
}