import { injectable } from "inversify";

export interface Event {
}

export interface EventCallback {
    (event: Event): void;
}

@injectable()
export class EventService {

    private callbacks: EventCallback[];

    constructor() {
        this.callbacks = [];
    }

    public Emit<T extends Event>(event: T): void {
        this.callbacks.forEach(callback => callback(event));
    }

    public Subscribe(callback: EventCallback): void {
        this.callbacks.push(callback);
    }
}
