import * as React from "react";
import {Spectacle} from "../state/spectacle";

export interface ActivityProps {
    Model: Spectacle;
}

export class SpectacleControl extends React.Component<ActivityProps, any> {
    constructor(props: ActivityProps) {
        super(props);
    }
    
    public render() {
        return <img src="http://25.media.tumblr.com/fadd7fc5fc867696a287520bb06b09ae/tumblr_n037nomlwN1r8exu0o1_250.gif" />
    }
}
