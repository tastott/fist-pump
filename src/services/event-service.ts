import { injectable } from "inversify";
import uuid = require("node-uuid");
import { Event, EventCallback, Subscription } from "../models/event";


@injectable()
export class EventService {

    private callbacks: {
        [teamId: string]: {
            [key: string]: EventCallback;
        }
    };

    constructor() {
        this.callbacks = {};
    }

    public Emit<T extends Event>(event: T, teamId: string): void {
        const teamCallbacks = this.callbacks[teamId] || {};
        Object.keys(teamCallbacks)
            .forEach(id => {
                teamCallbacks[id](event);
            });
    }

    public Subscribe(callback: EventCallback, teamId: string): Subscription {
        const id = uuid.v4();
        if (!this.callbacks[teamId]){
            this.callbacks[teamId] = {};
        }
        
        this.callbacks[teamId][id] = callback;
    
        return {
            Dispose: () => {
                if (this.callbacks[teamId]){
                    delete this.callbacks[teamId][id];
                }
            }
        };
    }
}
