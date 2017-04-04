import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { Controller, Post } from "inversify-express-utils";
import { EventService } from "../services/event-service";

@injectable()
@Controller("/incoming")
export class IncomingController {

    constructor( @inject(EventService) private eventService: EventService) { }

    // @Get('/')
    // public getUsers(): IUser[] {
    //     return this.userService.getUsers();
    // }

    // @Get('/:id')
    // public getUser(request: Request): IUser {
    //     return this.userService.getUser(request.params.id);
    // }

    @Post("/github/:teamId")
    public github(request: Request, response: Response): void {
        // TODO verify team id?
        this.eventService.Emit(request.body, request.params.teamId);
        response.sendStatus(200);
    }
}

export default IncomingController;
