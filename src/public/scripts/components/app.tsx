import * as React from "react";
import {AppState} from "../state/app";
import {Activity} from "./activity";

export interface AppProps {

}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            Events: []
        };

        const es = new EventSource("/outgoing");

        es.onmessage = (event: sse.IOnMessageEvent)  => {
            this.setState(previousState => ({
                Events: previousState.Events.slice().concat([JSON.parse(event.data)])
            }));
        };
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
