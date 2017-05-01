import { Team } from "./team";

export interface User {
    Id: string;
    Username: string;
    Teams: Team[];
}