import * as React from "react";
import { lazyInject } from "../ioc/container";
import { SpectacleClient } from "../services/spectacle-client";
import {AppState} from "../state/app";
import { SpectacleControl } from "./spectacle";
import { UserControl } from "./user";
import { AddTemporarily } from "../utilities/react";
import { FixedGifSpectacle } from "../../../models/spectacle";

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
            AddTemporarily<AppState, "Spectacles", FixedGifSpectacle>(prev => this.setState(prev), "Spectacles", event, 10000);
            // this.setState(previousState => ({
            //     Spectacles: previousState.Spectacles.concat([event])
            // }));
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
