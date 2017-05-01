import * as React from "react";
import { User } from "../../../../models/user";
import { lazyInject } from "../../ioc/container";
import { AccountService } from "../../services/account-service";

export interface AddTeamProps {
    User: User;
}

export interface AddTeamState {
    Name: string;
}

export class AddTeamPage extends React.Component<AddTeamProps, AddTeamState> {

    @lazyInject(AccountService)
    private accountService: AccountService;

    constructor(props: AddTeamProps) {
        super(props);
        this.state = {
            Name: null
        };
    }

    public render() {
        return (
            <div>
                <input type="text" value={this.state.Name} />
            </div>
        )
    }
}
