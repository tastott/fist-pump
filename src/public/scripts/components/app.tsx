import * as React from "react";
import { lazyInject } from "../ioc/container";
import { SpectacleClient } from "../services/spectacle-client";
import {AppState} from "../state/app";
import { WithKey } from "../state/keyed";
import { AddTemporarily} from "../utilities/react";
import { SpectacleControl } from "./spectacle";
import { UserControl } from "./user";


export interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {

    @lazyInject(SpectacleClient)
    private spectacleClient: SpectacleClient;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            Spectacles: []
        };

        this.spectacleClient.Subscribe(event => {
<<<<<<< HEAD
            AddTemporarily(this, "Spectacles", event, 20000);
=======
           AddTemporarily(this.setState2, "Spectacles", WithKey(event), 10000);
>>>>>>> 7c55a4718b13989e38f886b6fe2c4029cf57fe3c
        });
    }

    public render() {
        return (
        <div>
            <h1>Fist pump</h1>
            <UserControl />
            {this.state.Spectacles.map(spectacle =>
                <SpectacleControl Model={spectacle} key={spectacle.Key} />
            )}
        </div>
        );
    }

<<<<<<< HEAD
    private setState2(p) {
        
=======
    private setState2(setter: (previous: AppState) => Partial<AppState>): void {
        this.setState(setter);
>>>>>>> 7c55a4718b13989e38f886b6fe2c4029cf57fe3c
    }
}
