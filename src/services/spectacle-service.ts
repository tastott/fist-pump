import { injectable } from "inversify";
import { Spectacle } from "../models/spectacle";
import { ThrowUnrecognizedError } from "../utilities/errors";
import { Event } from "./../models/event";

interface Gif {
    Name: string;
    Url: string;
}

interface Gifs {
    success: Gif[];
}

export interface ISpectacleService {
    GetSpectacle(event: Event): Promise<Spectacle>;
}

export enum GifSelectionStrategy {
    Cyclic,
    Random
}

@injectable()
export class GifStoreSpectacleService {
    private gifs: Gifs;
    private previousGifIndex: {
        [type in keyof Gifs]: number;
    };

    constructor(private strategy: GifSelectionStrategy) {
        this.gifs = require("../data/gifs.json");
        this.previousGifIndex = {
            success: -1
        };
    }

    public GetSpectacle(event: Event): Promise<Spectacle> {
        const nextGif = this.GetNextGif("success");
        const spectacle: Spectacle = {
            Type: "FixedGif",
            Url: nextGif.Url,
            Event: event,
            Name: nextGif.Name
        };
        return Promise.resolve(spectacle);
    }

    private GetNextGif(type: keyof Gifs): Gif {
        const gifs = this.gifs[type];
        this.previousGifIndex[type] = this.GetNextGifIndex(type, gifs.length);
        return gifs[this.previousGifIndex[type]];
    }

    private GetNextGifIndex(type: keyof Gifs, totalGifCount: number): number {
        switch (this.strategy) {
            case GifSelectionStrategy.Cyclic:
                return this.previousGifIndex[type] === (totalGifCount - 1)
                    ? 0
                    : this.previousGifIndex[type] + 1;

            case GifSelectionStrategy.Random:
                return Math.floor(Math.random() * totalGifCount);

            default:
                ThrowUnrecognizedError(this.strategy, "GifSelectionStrategy");
        }
    }
}
