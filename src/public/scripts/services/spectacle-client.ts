import {injectable} from "inversify";
import { EventCallback, Subscription } from "../../../Models/event";
import { SpectacleCallback } from "../../../models/spectacle";

@injectable()
export class SpectacleClient {

    private callbacks: SpectacleCallback[];

    constructor() {
        this.callbacks = [];
        const es = new EventSource("/outgoing");

        es.onmessage = (event: sse.IOnMessageEvent)  => {
            this.callbacks.forEach(callback => callback(JSON.parse(event.data)));
        };
    }

    public Subscribe(callback: SpectacleCallback): Subscription {
        this.callbacks.push(callback);
        return {
            Dispose: () => {
                this.callbacks = this.callbacks.filter(storedCallback => storedCallback !== callback);
            }
        };
    }
}