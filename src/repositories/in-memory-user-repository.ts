import uuid = require("node-uuid");
import { Team } from "../models/team";
import { User } from "../models/user";
import { IUserRepository } from "./user-repository";
import { injectable } from "inversify";

type StoredUser = Pick<User, "Id" | "Username">;

interface StoredTeam extends Pick<Team, "Id" | "Name"> {
    Users: {
        [userId: string]: StoredUser;
    };
}

@injectable()
export class InMemoryUserRepository implements IUserRepository {
    private teams: {
        [id: string]: StoredTeam;
    }

    private userToTeam: {
        [userId: string]: string;
    }

    constructor() {
        this.teams = {};
        this.userToTeam = {};
    }

    public GetUser(id: string): Promise<User> {
        const teamId = this.userToTeam[id];
        if (!teamId) {
            return Promise.reject(`User not found: ${id}.`);
        } else {
            return this.GetStoredTeam(teamId)
                .then(team => {
                    const storedUser = team.Users[id];
                    return {...storedUser, Team: team};
                });
        }
    }

    public GetTeam(id: string): Promise<Team> {
        return this.GetStoredTeam(id)
            .then(team => ({...team})); // Copy
    }

    public AddUser(teamId: string, user: Pick<User, "Username">): Promise<User> {
        return this.GetStoredTeam(teamId)
            .then(team => {
                const id = this.NewUuid();
                const storedUser = {...user, Id: id};
                team.Users[id] = storedUser; // Mutate
                this.userToTeam[id] = teamId;
                const result: User = {...storedUser, Team: {...team }};
                return result;
            });
    }

    public AddTeam(team: Pick<Team, "Name">): Promise<Team> {
        const id = this.NewUuid();
        const storedTeam = { ...team, Id: id, Users: {}};
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
