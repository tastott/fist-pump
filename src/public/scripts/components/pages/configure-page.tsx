import * as React from "react";
import { User } from "../../../../models/user";
import { lazyInject } from "../../ioc/container";
import { AccountService } from "../../services/account-service";
import {Link} from "react-router-dom";

export interface AppProps {

}

export interface ConfigurePageState {
    User: User;
}

export class ConfigurePage extends React.Component<AppProps, ConfigurePageState> {

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
        if (this.state.User){
            return (
                <div>
                    <ul>
                        {this.state.User.Teams.map(team =>
                            <li>{team.Name}</li>
                        )}
                    </ul>
                    <Link to="/add-team">Add team</Link>
                </div>
            );
        }
        else {
            return (
                <label>Loading...</label>
            );
        }
    }
}
