const diskDb = require("diskdb");
import immutable = require("immutable");
import mkdirp = require("mkdirp");
import { Team } from "../models/team";
import { User } from "../models/user";
import { IUserRepository } from "./user-repository";

interface StoredUser extends Pick<User, "Username"> {
    TeamIds: {
        [key: string]: boolean;
    };
}

interface StoredTeam extends Pick<Team, "Name"> {
    UserIds: {
        [key: string]: boolean;
    };
}

interface DiskDbItem {
    _id: string;
}

interface DiskDbCollection<T> {
    findOne(query: Partial<T & DiskDbItem>): T & DiskDbItem;
    save(item: T): T & DiskDbItem;
    update(query: Partial<T & DiskDbItem>, data: Partial<T>, options?: any): void;
}

export class DiskDbUserRepository implements IUserRepository {

    private static readonly UserCollection = "User";
    private static readonly TeamCollection = "Team";

    private readonly users: DiskDbCollection<StoredUser>;
    private readonly teams: DiskDbCollection<StoredTeam>;

    constructor(directory: string) {
        mkdirp.sync(directory);
        const db = diskDb.connect(directory, [
            DiskDbUserRepository.UserCollection,
            DiskDbUserRepository.TeamCollection
        ]);
        this.users = db[DiskDbUserRepository.UserCollection];
        this.teams = db[DiskDbUserRepository.TeamCollection];
    }

    public GetUser(id: string): Promise<User> {
        const storedUser = this.users.findOne({_id: id});
        if (storedUser) {
            const user: User = {
                ...storedUser,
                Id: id,
                Teams: []
            };
            return Promise.resolve(user);
        } else {
            return Promise.reject(`User not found: ${id}.`);
        }
    }

    public GetTeam(id: string): Promise<Team> {
        return this.GetStoredTeam(id)
            .then(storedTeam => {
                const team = this.ToTeam(storedTeam);
                return team;
            });
    }

    public AddUser(user: Pick<User, "Username">): Promise<User> {
        const storedUser = this.users.save({...user, TeamIds: {}});
        const result: User = {
            ...user,
            Id: storedUser._id,
            Teams: []
        };
        return Promise.resolve(result);
    }

    public AddTeam(team: Pick<Team, "Name">): Promise<Team> {
        const storedTeam = this.teams.save({...team, UserIds: {}});
        return Promise.resolve(this.ToTeam(storedTeam));
    }

    public SetUserTeam(userId: string, teamId: string): Promise<User> {
        throw new Error("Not implemented");
    }

    private GetStoredTeam(id: string): Promise<StoredTeam & DiskDbItem> {
        const storedTeam = this.teams.findOne({_id: id});
        return storedTeam
            ? Promise.resolve(storedTeam)
            : Promise.reject(`Team not found: ${id}.`);
    }

    private ToTeam(storedTeam: StoredTeam & DiskDbItem): Team {
        return {
            ...storedTeam,
            Id: storedTeam._id
        }
    }
}
