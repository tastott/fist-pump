import superagent = require("superagent");
import { injectable } from "inversify";

interface Jwt {
    Value: string;
    ExpiresAt: Date;
}

interface Auth0TokenResponse {
    access_token: string;
    expires_in: number;
}

@injectable()
export class Auth0TokenRepository {
    private jwt: Jwt;

    constructor(){
        this.jwt = null;
    }
    public GetToken(): Promise<string> {
        if (this.jwt && this.jwt.ExpiresAt > new Date()){
            return Promise.resolve(this.jwt.Value);
        } else {
           return this.GetNewToken()
                .then(jwt => {
                    this.jwt = jwt;
                    return this.jwt.Value;
                });
        }
    }

    private GetNewToken(): Promise<Jwt> {
         return superagent
                .post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`)
                .send({
                    client_id: process.env.AUTH0_API_CLIENT_ID,
                    client_secret: process.env.AUTH0_API_CLIENT_SECRET,
                    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
                    grant_type: "client_credentials"
                })
                .then(response => {
                    if (response.ok){
                        const body : Auth0TokenResponse = response.body;
                        return {
                            Value: body.access_token,
                            ExpiresAt: new Date(new Date().getTime() + (body.expires_in * 1000))
                        };
                    } else {
                        return Promise.reject<Jwt>(response.error);
                    }
                });
    }
}