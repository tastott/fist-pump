import { EventEmitter } from "events";
import { Request, Response } from "express";
const SSE: { new(): ExpressSseEmitter} = require("express-sse");
import { inject, injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";
import { Authorize } from "../auth";
import { TYPES } from "../constants";
import { User } from "../models/user";
import { EventService } from "../services/event-service";
import { ISpectacleService } from "../services/spectacle/spectacle-service";

interface ExpressSseEmitter extends EventEmitter {
    init(request: Request, response: Response): void;
    send(data: any): void;
}

@injectable()
@Controller("/outgoing", Authorize)
export class OutgoingController {

    constructor(
        @inject(EventService) private eventService: EventService,
        @inject(TYPES.ISpectacleService) private spectacleService: ISpectacleService
    ) {

     }

    @Get("/")
    public get(request: Request, response: Response): void {
        const user: User = request.user;
        const sse = new SSE();
        sse.init(request, response);

        const subscription = this.eventService.Subscribe(event => {
            this.spectacleService.GetSpectacle(event)
                .then(spectacle =>  sse.send(spectacle))
                .catch(error => { /* TODO: Log error */ });
        }, user.TeamId);

        sse.on("removeListener", () => {
            if (sse.listenerCount("send") < 1) {
                subscription.Dispose();
            }
        });
    }
}

export default OutgoingController;
