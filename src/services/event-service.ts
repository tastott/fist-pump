import { injectable } from "inversify";
import uuid = require("node-uuid");
import { Event, EventCallback, Subscription } from "../models/event";


@injectable()
export class EventService {

    private callbacks: {
        [key: string]: EventCallback;
    }

    constructor() {
        this.callbacks = {};
    }

    public Emit<T extends Event>(event: T): void {
        Object.keys(this.callbacks)
            .forEach(id => {
                this.callbacks[id](event);
            });
    }

    public Subscribe(callback: EventCallback): Subscription {
        const id = uuid.v4();
        this.callbacks[id] = callback;
        return {
            Dispose: () => {
                delete this.callbacks[id];
            }
        };
    }
}
