
import { injectable } from "inversify";
import { User } from "../../../models/user";
import request = require("superagent");

@injectable()
export class AccountService {
    Me(): Promise<User> {
        return request("/api/users/me")
            .then(response => response.body);
    }
}