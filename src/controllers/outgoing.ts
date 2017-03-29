import { Request, Response } from "express";
const SSE = require("express-sse");
import { inject, injectable } from "inversify";
import { Controller, Get } from "inversify-express-utils";
import { EventService } from "../services/event-service";

@injectable()
@Controller("/outgoing")
export class OutgoingController {

    constructor(
        @inject(EventService) private eventService: EventService
    ) {

     }

    @Get("/")
    public get(request: Request, response: Response): void {
        const sse = new SSE();
        sse.init(request, response);
        this.eventService.Subscribe(event => sse.send(event));
    }
}

export default OutgoingController;
