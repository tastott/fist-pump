import superagent = require("superagent");
import { injectable } from "inversify";

export interface IHttpService {
    Get<T>(url: string): Promise<T>;
}

@injectable()
export class SuperAgentHttpService implements IHttpService {
    public Get<T>(url: string): Promise<T> {
        return superagent(url)
            .then(response => response.body);
    }
}