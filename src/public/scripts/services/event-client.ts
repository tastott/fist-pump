import {injectable} from "inversify";
import {EventCallback, Subscription} from "../../../Models/event";

@injectable()
export class EventClient {

    private callbacks: EventCallback[];

    constructor() {
        this.callbacks = [];
        const es = new EventSource("/outgoing");

        es.onmessage = (event: sse.IOnMessageEvent)  => {
            this.callbacks.forEach(callback => callback(JSON.parse(event.data)));
        };
    }

    public Subscribe(callback: EventCallback): Subscription {
        this.callbacks.push(callback);
        return {
            Dispose: () => {
                this.callbacks = this.callbacks.filter(storedCallback => storedCallback !== callback);
            }
        };
    }
}