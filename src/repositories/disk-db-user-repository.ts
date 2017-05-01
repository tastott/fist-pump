const diskDb = require("diskdb");
import immutable = require("immutable");
import mkdirp = require("mkdirp");
import { Team } from "../models/team";
import { User } from "../models/user";
import { IUserRepository } from "./user-repository";

interface StoredUser extends Pick<User, "Username"> {
    TeamId: string;
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
            return this.GetTeam(storedUser.TeamId)
                .then(team => {
                    const user: User = {
                        ...storedUser,
                        Id: id,
                        Team: team
                    };
                    return user;
                });
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

    public AddUser(teamId: string, user: Pick<User, "Username">): Promise<User> {
        return this.GetStoredTeam(teamId)
            .then(team => {
                const storedUser = this.users.save({...user, TeamId: teamId});
                const newUserIds = immutable.Map(team.UserIds)
                    .set(storedUser._id, true)
                    .toObject();
                this.teams.update({_id: teamId}, {UserIds: newUserIds});
                const result: User = {
                    ...storedUser,
                    Id: storedUser._id,
                    Team: this.ToTeam({...team, UserIds: newUserIds})
                };
                return result;
            });
    }

    public AddTeam(team: Pick<Team, "Name">): Promise<Team> {
        const storedTeam = this.teams.save({...team, UserIds: {}});
        return Promise.resolve(this.ToTeam(storedTeam));
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
