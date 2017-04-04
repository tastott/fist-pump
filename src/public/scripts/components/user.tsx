import * as React from "react";
import { User } from "../../../models/user";
import { lazyInject } from "../ioc/container";
import { AccountService } from "../services/account-service";

export interface UserState {
    User: User;
}

export class UserControl extends React.Component<any, UserState> {

    @lazyInject(AccountService)
    private accountService: AccountService;

    constructor(props: any) {
        super(props);
        this.state = {
            User: null
        };

        this.accountService.Me()
            .then(user => this.setState({
                User: user
            }));
    }

    public render() {
        if (this.state.User) {
            return (
                <div>
                    <label>{this.state.User.Username}</label>
                    <a href="/account/logout">Logout</a>
                </div>
            );
        }
        else {
            return (
                <label>Loading user...</label>
            );
        }
    }
}
