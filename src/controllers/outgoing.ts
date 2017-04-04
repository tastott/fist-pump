import { EventEmitter } from "events";
import { Request, Response } from "express";
const SSE: { new(): ExpressSseEmitter} = require("express-sse");
import { inject, injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";
import { EventService } from "../services/event-service";
import { Authorize } from "../auth";
import { User } from "../models/user";

interface ExpressSseEmitter extends EventEmitter {
    init(request: Request, response: Response): void;
    send(data: any): void;
}

@injectable()
@Controller("/outgoing", Authorize)
export class OutgoingController {

    constructor(
        @inject(EventService) private eventService: EventService
    ) {

     }

    @Get("/")
    public get(request: Request, response: Response): void {
        const user: User = request.user;
        const sse = new SSE();
        sse.init(request, response);
        const subscription = this.eventService.Subscribe(event => sse.send(event), user.TeamId);
        sse.on("removeListener", () => {
            if (sse.listenerCount("send") < 1) {
                subscription.Dispose();
            }
        });
    }
}

export default OutgoingController;
