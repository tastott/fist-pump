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
        const spectacle = this.props.Model;
        switch (spectacle.Type) {
            case "FixedGif":
                return (<img src={spectacle.Url} title={spectacle.Name} />);

            default:
                return null;
        }

    }
}
