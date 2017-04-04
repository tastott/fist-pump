import { injectable } from "inversify";
import { Spectacle } from "../models/spectacle";
import { Event } from "./../models/event";

@injectable()
export class SpectacleService {
    public GetSpectacle(event: Event): Spectacle {
        return {
            Type: "FixedGif",
            Url: "http://25.media.tumblr.com/fadd7fc5fc867696a287520bb06b09ae/tumblr_n037nomlwN1r8exu0o1_250.gif",
            Event: event
        };
    }
}
