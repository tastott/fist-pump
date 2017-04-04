import * as React from "react";
import { lazyInject } from "../ioc/container";
import { SpectacleClient } from "../services/spectacle-client";
import {AppState} from "../state/app";
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
            this.setState(previousState => ({
                Events: previousState.Spectacles.slice().concat([event])
            }));
        });
    }

    public render() {
        return (
        <div>
            <h1>Fist pump</h1>
            <UserControl />
            {this.state.Spectacles.map(spectacle =>
                <SpectacleControl Model={spectacle} />
            )}
        </div>
        );
    }
}
