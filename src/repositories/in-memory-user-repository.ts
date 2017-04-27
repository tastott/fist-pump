import uuid = require("node-uuid");
import { Team } from "../models/team";
import { User } from "../models/user";
import { IUserRepository } from "./user-repository";

type StoredUser = Pick<User, "Id" | "Username">;

interface StoredTeam extends Pick<Team, "Id" | "Name"> {
    Users: StoredUser[];
}

export class InMemoryUserRepository implements IUserRepository {
    private teams: {
        [id: string]: StoredTeam;
    }

    constructor() {
        this.teams = {};
    }

    public GetUser(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public GetTeam(id: string): Promise<Team> {
        return this.GetStoredTeam(id);
    }

    public AddUser(teamId: string, user: Pick<User, "Username">): Promise<User> {
        return this.GetStoredTeam(teamId)
            .then(team => {
                const id = this.NewUuid();
                const storedUser = {...user, Id: id};
                team.Users.push(storedUser);
                return user;
            });
    }

    public AddTeam(team: Pick<Team, "Name">): Promise<Team> {
        const id = this.NewUuid();
        const storedTeam = { ...team, Id: id, Users: []};
        this.teams[id] = storedTeam;
        return Promise.resolve(storedTeam);
    }

    private NewUuid(): string {
        return uuid.v4();
    }

    private GetStoredTeam(id: string): Promise<StoredTeam> {
        const team = this.teams[id];
        if (team) {
            return Promise.resolve(team);
        } else {
            return Promise.reject<Team>(`Team not found: ${id}.`);
        }
    }
}
