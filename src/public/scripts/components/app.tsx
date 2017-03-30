import * as React from "react";
import { lazyInject } from "../ioc/container";
import { EventClient } from "../services/event-client";
import {AppState} from "../state/app";
import { Activity } from "./activity";

export interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {

    @lazyInject(EventClient)
    private eventClient: EventClient;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            Events: []
        };

        this.eventClient.Subscribe(event => {
            this.setState(previousState => ({
                Events: previousState.Events.slice().concat([event])
            }));
        });
    }

    public render() {
        return (
        <div>
            <h1>Fist pump</h1>
            {this.state.Events.map(event =>
                <Activity Event={event} />
            )}
        </div>
        );
    }
}
