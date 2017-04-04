import {Event} from "./event";

export interface FixedGifSpectacle {
    Type: "FixedGif";
    Url: string;
    Event: Event;
}

export type Spectacle = FixedGifSpectacle;

export interface SpectacleCallback {
    (spectacle: Spectacle): void;
}
