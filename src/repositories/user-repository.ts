import { Team } from "../models/team";
import { User } from "../models/user";

export interface IUserRepository {
    GetUser(id: string): Promise<User>;
    GetTeam(id: string): Promise<Team>;
    AddUser(teamId: string, user: Pick<User, "Username">): Promise<User>;
    AddTeam(team: Pick<Team, "Name">): Promise<Team>;
}
